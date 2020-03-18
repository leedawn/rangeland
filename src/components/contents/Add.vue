<template>
  <div class="add_post">
    <div class="container">
      <div class="add_tab">发表新帖</div>
      <hr />
      <div class="ui form">
        <label class="special_column">所在专栏</label>
        <select class="ui dropdown">
          <option value>请选择</option>
          <option value="1">提问</option>
          <option value="0">分享</option>
          <option value="0">讨论</option>
          <option value="0">建议</option>
        </select>
        <div class="inline field title">
          <label>标题</label>
          <input type="text" placeholder="请输入标题" />
        </div>
        <div class="editor">
          <div class="editor_icon">
            <i class="meh outline icon"></i>
          </div>
          <textarea></textarea>
        </div>

        <!-- <div class="kiss">
          <label class="special_column two">悬赏飞吻</label>
          <select class="ui dropdown two">
            <option value>20</option>
            <option value>30</option>
            <option value>50</option>
            <option value>60</option>
            <option value>80</option>
          </select>
        </div>
        <div class="code"></div>
        <button class="ui green button">立即发布</button> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.add_post {
  width: 2560px;
  height: 3000px;
  background-color: #f0f5f5;
}
.container {
  position: absolute;
  left: 5%;
  top: 25%;
  width: 90%;
  height: 100%;

  background-color: white;

  text-align: left;
}

.add_tab {
  position: relative;
  top: 5%;
  left: 4%;
  color: green;
  font-size: 16px;
}

hr {
  position: relative;
  top: 7%;
  left: -1%;
  width: 90%;
}

.ui.form {
  position: relative;
  top: 10%;
  left: 4%;
}
.special_column {
  position: relative;
  font-weight: bold;
  font-size: 13px;
  float: left;
  padding: 9px 0; /*垂直居中*/
}
.ui.dropdown {
  position: relative;
  left: 2%;
  width: 18%;
  background-color: white;
  float:left;
}
.inline.field.title {
  position: absolute;
  left: 40%;

}
.editor {
  position: relative;
}
 .editor_icon {
  position:relative;
  top:40%;
  padding: 3px;
  border: 0.5px solid #f2f2f2;
}
/*
.special_column.two {
  position: relative;
  top: 100%;
}
.ui.dropdown.two {
}
.ui.green.button {
  /* position: absolute;
  top: 70%;
} */

</style>
