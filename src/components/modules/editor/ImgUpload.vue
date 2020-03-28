<template>
  <div class="img-upload">
    <div class="model" v-show="isShow">
      <div class="title">
        <span>插入图片</span>
      </div>
      <div class="upload-method">
        <ul>
          <li>
            <label class="url">URL</label>
            <div class="img-input">
              <input type="text" id="fileInput" placeholder="粘贴图片地址或者点击上传" v-model="pic" />
            </div>
            <button type="button" class="upload-button">
              <label>
                <i></i>上传图片
                <input type="file" name="file" id="uploadImg" @change="upload" />
              </label>
            </button>
          </li>
          <li>
            <button class="confirm-button" type="button" @click="submit()">确认</button>
          </li>
        </ul>
      </div>
      <span class="close-button" @click.stop="close()">
        <a href="javascript:void(0)">X</a>
      </span>
    </div>
  </div>
</template>
<script>
import config from '@/config'
import { uploadImg } from '@/api/content'
export default {
  name: 'ImgUpload',
  props: ['isShow', 'ctrl'],
  data () {
    return {
      pic: '',
      formData: ''
    }
  },
  methods: {
    close () {
      this.$emit('closeEvent')
      this.pic = ''
      this.formData = ''
    },
    upload (e) {
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      uploadImg(this.formData).then(res => {
        if (res.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === 'production'
              ? config.baseurl.pro
              : config.baseUrl.dev
          this.pic = baseUrl + res.data
        }
      })
      document.getElementById('uploadImg').value = ''
    },
    submit () {
      if (this.pic === '') {
        document.getElementById('fileInput').focus()
        this.$pop('shake', '请上传图片或者复制图片链接')
        return
      }
      this.$emit('addEvent', this.pic)
      setTimeout(() => {
        this.pic = ''
        this.formData = ''
        this.$emit('closeEvent')
      }, 0)
    }
  }
}
</script>
<style scoped>
.model {
  position: absolute;
  top: 230px;
  left: 55px;
  background-color: white;
  box-shadow: 10px 10px 5px #e6e6e6;
  border: 1px solid #e6e6e6;
  width: 450px;
  height: 200px;
}
.title {
  position: absolute;
  background-color: #fbfbfb;
  width: 450px;
  height: 40px;
}
.title span {
  font-size: 15px;
  position: relative;
  top: 10px;
  left: 10px;
}
.upload-method {
  position: absolute;
  top: 40px;
}
.upload-method ul {
  list-style-type: none;
}
.url {
  float: left;
  position: relative;
  top: 13px;
  border: 1px solid #e6e6e6;
  padding: 9px 20px;
  background-color: #fbfbfb;
}
.img-input {
  float: left;
}
.upload-button {
  float: left;
  position: relative;
  top: 13px;
  padding: 10px 14px;
  background-color: white;
  border: 1px solid #e6e6e6;
}
#uploadImg {
  display: none;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 18px;
}
.confirm-button {
  position: absolute;
  top: 100px;
  right: 140px;
  padding: 7px 20px;
  background-color: #009688;
  color: white;
}
</style>
