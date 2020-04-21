<template>
  <div class="upload_image">
    <label class="large ui teal button">
      <i class="colud upload icon"></i>上传头像
      <input
        id="pic"
        type="file"
        name="file"
        accept="image/png, image/gif, image/jpg"
        @change="upload"
      />
    </label>

    <p class="advise">建议尺寸168*168，支持jpg,png,gif,最大不能超过50KB</p>
    <img :src="pic" class="ui small circular image head_photo" />
  </div>
</template>
<script>
import { uploadImg } from '@/api/content'
import config from '../../../config/index'
import { updateUserInfo } from '@/api/user'
export default {
  name: 'image-upload',
  data () {
    return {
      pic:
        this.$store.state.userInfo && this.$store.state.userInfo.pic
          ? this.$store.state.userInfo.pic
          : 'img/bear-200-200.jpg',
      formData: '',
      publicPath: process.env.BASE_URL
    }
  },
  methods: {
    upload (e) {
      console.log('upload -> e', e)
      var file = e.target.files
      var formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      uploadImg(formData).then(res => {
        if (res.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === 'production'
              ? config.baseUrl.pro
              : config.baseUrl.dev
          this.pic = baseUrl + res.data
          console.log('upload -> pic', this.pic)
          updateUserInfo({ pic: res.data }).then(res => {
            // 存储图片的相对路径
            console.log('upload -> res', res)
            if (res.code === 200) {
              const user = this.$store.state.userInfo
              user.pic = this.pic
              this.$store.commit('setUserInfo', user)
              this.$alert('图片上传成功')
            }
          })
          document.getElementById('pic').value = ''
        }
      })
    }
  }
}
</script>
<style scoped>
.upload_image {
  width: 373px;
  height: 373px;
  background-color: #e6ebe7;
  padding: 3%;
}
.large.ui.teal.button {
  position: absolute;
  left: 20%;
  padding: 15px;
}
#pic {
  display: none; /*隐藏input，只显示上传按钮 */
}
.advise {
  position: relative;
  top: 18%;
  font-size: 13px;
  font-weight: 100;
}
.ui.small.rounded.image {
  position: relative;
  top: 30%;
  left: 25%;
}
.head_photo {
  position: relative;
  top: 90px;
  left: 90px;
}
</style>
