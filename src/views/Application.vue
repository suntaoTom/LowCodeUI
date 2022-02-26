<template>
  <div class="lz_application">
    <div class="lz_app_utils">
      <button @click="lz_router">设置</button>
    </div>
    <div class="lz_app">
      <div class="lz_app_left">
        <div class="lz_app_add">
          <div class="lz_app_left_input">
            <input v-model="name" /> <button @click="create">add</button>
          </div>
          <h4>应用中心</h4>
        </div>
        <div class="lz_app_lication">
          <div
            v-for="(item, index) in appInfo"
            class="lz_app_lication_btn"
            :key="index"
          >
            <div
              @click="appClick($event, item, index)"
              :index="index"
              class="lz_app_lication_name"
              :class="{ lz_select: select === index, lz_select_false: false }"
            >
              {{ item.name }}
              <input
                :value="item.name"
                class="lz_edit"
                @keyup.enter="keyupen($event, item)"
                v-if="reNameIndex === index"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="lz_app_right">
        <div class="lz_app_right_header" v-if="select !== -1">
          名称：<input v-model="pageName" /> 备注：<input v-model="remarks" />
          <button @click="addPage">add</button>
        </div>
        <div class="lz_app_right_content" v-if="select !== -1">
          <div
            class="lz_app_right_content_page"
            v-for="(item, index) in pageArray"
            :key="index"
          >
            <div
              class="lz_app_right_content_cur"
              :index="index"
              @click="clickRouter($event, item)"
            ></div>
            <div class="lz_app_right_content_page_body">
              <div class="lz_app_right_content_page_header">
                <span>{{ item.name }}</span>
                <input
                  :value="item.name"
                  class="lz_edit"
                  @keyup.enter="keyupenElement($event, item)"
                  v-if="reNameElementIndex === index"
                />
              </div>
              <div class="lz_app_right_content_page_content">
                <div>
                  UUID：<span>{{ item.uuid }}</span>
                </div>
                <div>
                  创建者：<span>{{ item.founder }}</span>
                </div>
                <div>
                  备注：<span>{{ item.remarks }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <comment-copy-tool></comment-copy-tool>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginStore from "@/store/modules/login";
import ApplicationStore from "@/store/modules/application";
import CommentCopyTool from "@/views/tool/comment-copy-tool.vue";
@Options({
  name: "application",
  components: { CommentCopyTool },
  props: {}
})
export default class Application extends Vue {
  private id: any = "";
  private app_id: any = "";
  private name = "";
  private appInfo: any = [];
  private select: number = -1;
  private pageName = "";
  private remarks = "";
  private pageArray: any = [];
  private reNameIndex = "";
  private reNameElementIndex = "";
  // data 对象
  async keyupen(e: any, item: any) {
    console.log(e.target.value);
    let b: any = LoginStore.personInfo;
    await ApplicationStore.appRename({
      name: e.target.value,
      app_id: item.id,
      user_id: b.id,
      project_id: this.$route.query.id
    });
    this.getAppInfo(this.$route.query.id);
    this.reNameIndex = "";
  }
  async keyupenElement(e: any, item: any) {
    console.log(e.target.value);
    let b: any = LoginStore.personInfo;
    await ApplicationStore.pageRename({
      name: e.target.value,
      id: item.id,
      project_id: this.$route.query.id,
      user_id: b.id
    });
    this.reNameElementIndex = "";
    this.getPageInfo(this.app_id);
  }
  lz_router() {
    console.log(66, this.id);
    this.$router.push({ name: "ProjectMembers", query: { id: this.id } });
  }

  clickRouter(e: any, item: any) {
    if (e.target.tagName !== "INPUT") {
      // this.$router.push({ name: "Design", params: { uuid: item.uuid } });
      let b: any = LoginStore.personInfo;
      // this.$router.push({
      //   path: "/design",
      //   query: { uuid: item.uuid, user_id: b.id }
      // });
      let a = this.$router.resolve({
        path: "/design",
        query: {
          project_id: this.$route.query.id,
          uuid: item.uuid
        }
      });
      window.open(a.href, "_blank");
    }
  }
  async appDelete(item: any) {
    if (confirm(`是否删除${item.name} App？`) == true) {
      let b: any = LoginStore.personInfo;
      await ApplicationStore.appDelete({
        id: item.id,
        project_id: this.$route.query.id,
        user_id: b.id
      });
      this.getAppInfo(this.id);
    }
  }

  async pageDelete(item: any) {
    if (confirm(`是否删除${item.name} 页面？`) == true) {
      let b: any = LoginStore.personInfo;
      await ApplicationStore.pageDelete({
        uuid: item.uuid,
        id: item.id,
        project_id: this.$route.query.id,
        user_id: b.id
      });
      this.getPageInfo(this.app_id);
    }
  }
  // methods
  async create() {
    if (this.name !== "") {
      let a: any = LoginStore.personInfo;
      await ApplicationStore.appCreate({
        project_id: this.id,
        name: this.name,
        founder: a.username
      });
      this.getAppInfo(this.id);
    } else {
      alert("内容不能为空");
    }
  }
  appClick(e: any, item: any, index: number) {
    if (e.target.tagName !== "INPUT") {
      this.reNameIndex = "";
      this.reNameElementIndex = "";
      this.select = index;
      this.app_id = item.id;
      this.getPageInfo(item.id);
    }
  }
  async addPage() {
    if (this.pageName !== "") {
      let a: any = LoginStore.personInfo;
      if (a.id !== undefined) {
        await ApplicationStore.pageCreate({
          app_id: this.app_id,
          name: this.pageName,
          uuid:
            this.id +
            this.app_id +
            (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
          founder: a.username,
          remarks: this.remarks,
          user_id: a.id,
          project_id: this.$route.query.id
        });
        this.getPageInfo(this.app_id);
      } else {
        if (confirm("登录信息有误，请重新登陆") == true) {
          if (window.location.hash.indexOf("#/design") != -1) {
            window.open((window as any).location.origin);
          } else {
            (window as any).location.href = (window as any).location.origin;
          }
        }
      }
    } else {
      alert("内容不能为空");
    }
    console.log(this.pageName, this.remarks);
  }
  async getPageInfo(id: any) {
    let b: any = LoginStore.personInfo;
    await ApplicationStore.getPageInfo({
      app_id: id,
      project_id: this.id,
      user_id: b.id
    });
    this.pageArray = ApplicationStore.pageInfo;
  }
  async getAppInfo(id: any) {
    let b: any = LoginStore.personInfo;
    await ApplicationStore.getAppInfo({ project_id: id, user_id: b.id });
    this.appInfo = ApplicationStore.appInfo;
  }
  mounted() {
    let _self = this;
    this.id = this.$route.query.id;
    this.getAppInfo(this.$route.query.id);
    console.log(23, this.$route.query);
    // document.addEventListener(
    //   "click",
    //   function(e: any) {
    //     if (e.target.className !== "lz_edit") {
    //       _self.reNameIndex = "";
    //       _self.reNameElementIndex = "";
    //     }
    //     //解除第一个按钮的onclick事件(方法二)
    //     console.log(333, e.target);
    //   },
    //   true
    // );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.lz_application {
  width: 100%;
  height: 100%;
  position: relative;
  top: 45px;
}
.lz_app_utils {
  text-align: left;
  padding: 5px;
}

.lz_app {
  display: flex;
  height: 88%;
  padding: 5px;
  width: 100%;
}
.lz_app_left {
  width: 20%;
  height: 100%;
  border: 1px solid #9f9494;
  .lz_app_add {
    div {
      margin: 10px;
    }
  }
}
.lz_app_left_input {
  text-align: left;
  input {
    width: 80%;
  }
  button {
    margin-left: 5px;
  }
}
.lz_app_lication {
  height: 83%;
  width: 100%;
  overflow-y: scroll;
  .lz_app_lication_btn {
    position: relative;
    padding: 5px;
    display: flex;
    min-height: 27px;
    width: 94%;
    .lz_app_lication_name {
      position: relative;
      width: 95%;
      text-overflow: ellipsis; /* ellipsis:显示省略符号来代表被修剪的文本  string:使用给定的字符串来代表被修剪的文本*/
      white-space: nowrap; /* nowrap:规定段落中的文本不进行换行   */
      overflow: hidden;
      border: 1px solid #9f9494;
      input {
        position: absolute;
        left: 0px;
        width: 100%;
        height: 100%;
      }
    }
    span {
      color: blueviolet;
      font-size: 10px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .lz_app_lication_btn .lz_app_lication_name:hover {
    background-color: aqua;
  }
  .lz_select {
    background-color: aqua;
  }
}
.lz_app_right {
  width: 80%;
  height: 100%;
  border: 1px solid #9f9494;
  .lz_app_right_header {
    text-align: left;
    padding: 10px;
    button {
      margin-left: 7px;
    }
  }
  .lz_app_right_content {
    width: 98%;
    height: 88%;
    overflow-y: scroll;
    padding: 10px;
    position: relative;
    .lz_app_right_content_page {
      position: relative;
      cursor: pointer;
      float: left;
      width: 145px;
      height: 130px;
      border: 1px solid #9f9494;
      margin: 10px;
      .lz_app_right_content_cur {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 99;
      }
      .lz_app_right_content_page_body {
        width: 100%;
        height: 100%;
      }
      .lz_app_right_content_page_header {
        height: 20%;
        padding: 5px;
        text-overflow: ellipsis; /* ellipsis:显示省略符号来代表被修剪的文本  string:使用给定的字符串来代表被修剪的文本*/
        white-space: nowrap; /* nowrap:规定段落中的文本不进行换行   */
        overflow: hidden;
        position: relative;
        input {
          position: absolute;
          left: 0px;
          width: 100%;
          z-index: 999;
        }
      }
      .lz_app_right_content_page_content {
        padding: 5px;
        height: 60%;
        font-size: 10px;
        text-align: left;
        width: fit-content;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        word-wrap: break-word;
        overflow-y: scroll;
        div {
          font-weight: 600;
          span {
            font-weight: 400;
          }
        }
      }
    }
    .lz_app_right_content_page:hover {
      background-color: rgb(230, 235, 193);
    }
  }
}
</style>
