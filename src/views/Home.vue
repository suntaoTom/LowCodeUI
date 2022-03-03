<template>
  <div class="lcu_home">
    <div class="lcu_home_header">
      <!-- <input placeholder="请输入搜索内容" /><button>ok</button> -->
    </div>
    <div class="lcu_home_content">
      <div
        class="lcu_project"
        @click="lcu_router(item.id)"
        v-for="(item, index) in projectList"
        :key="index"
      >
        <div class="lcu_project_logo">
          <img :src="item.logo_url" />
        </div>
        <div class="lcu_project_info">
          <div>
            <span>名称：{{ item.name }}</span>
          </div>
          <div>
            <span
              >责任人：{{
                item.person_liabler !== ""
                  ? item.person_liabler
                  : personInfo.username
              }}</span
            >
          </div>
          <div>
            <span>创建时间：{{ item.create_time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginStore from "@/store/modules/login";
import HomeStore from "@/store/modules/home";

@Options({
  name: "home",
  components: {},
  props: {}
})
export default class Home extends Vue {
  private projectList: any = [];
  private personInfo = {};
  // data 对象
  // methods
  lcu_router(id: number) {
    console.log(66, id);
    this.$router.push({ name: "Application", query: { id: id } });
  }
  async getproject() {
    let a: any = LoginStore.personInfo;
    await HomeStore.getProjects({ user_id: a.id });
    console.log(12, LoginStore.personInfo);
    this.projectList = HomeStore.projectsInfo;
  }

  mounted() {
    this.personInfo = LoginStore.personInfo;
    this.getproject();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.lcu_home {
  width: 100%;
  text-align: left;
  padding: 20px;
  height: 100%;
}
.lcu_home_header {
  margin: 10px;
  button {
    margin: 10px;
  }
}
.lcu_home_content {
  width: 100%;
  height: 83%;
  overflow-y: scroll;
  .lcu_project {
    width: 265px;
    height: 170px;
    padding: 10px;
    border: 1px solid #59c7f9;
    margin: 10px;
    float: left;
    cursor: pointer;
    .lcu_project_logo {
      width: 100%;
      height: 100px;
      text-align: center;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .lcu_project_info {
      height: 50px;
      width: 100%;
      font-size: 0.5rem;
      padding: 5px;
      p span {
        margin: 5px;
      }
    }
  }
  .lcu_project:hover {
    border: 1px solid #3bc23b;
  }
}
</style>
