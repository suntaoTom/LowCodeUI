<template>
  <!-- v-if="router !== '/login'" -->
  <div
    class="lz_app_header"
    v-if="
      router !== '/login' &&
        router !== '/' &&
        router !== '/design' &&
        router !== '/about' &&
        router !== '/develop'
    "
  >
    <div class="lz_app_header_left">
      <h2>ServerUI</h2>
    </div>
    <div class="lz_app_header_right">
      <span
        ><a target="_blank" href="http://192.168.200.16:7002/">帮助</a></span
      >
      <span>{{ info.username }}</span>

      <span><router-link to="/" exact>退出</router-link></span>
    </div>
  </div>
  <router-view :class="router !== '/about' ? ' lz_content' : ''" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginStore from "@/store/modules/login";
@Options({
  name: "app",
  components: {},
  props: {},
  watch: {
    $route: [{ handler: "getPath", immediate: false, deep: false }]
  }
})
export default class App extends Vue {
  // data 对象
  public router = "";
  public info = "";
  getPath() {
    let a: any = LoginStore.personInfo;
    this.router = this.$route.path;
    if (a !== null && a.status) {
      this.info = a;
    }
    console.log(44, a, this.info);
  }
  // methods
  mounted() {}
}
</script>

<style lang="scss">
html {
  width: 100%;
  height: 100%;
  min-width: 1349px;
  min-height: 640px;
  margin: 0;
  padding: 0;
}
body {
  width: 98%;
  height: 98%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
input,
textarea {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.lz_app_header {
  height: 35px;
  width: 100%;
  position: fixed;
  background-color: #d5dada;
  display: flex;
}
.lz_app_header_left {
  padding-left: 25px;
  width: 50%;
  text-align: left;
  h2 {
    top: -17px;
    position: relative;
  }
}
.lz_app_header_right {
  width: 50%;
  right: 30px;
  position: relative;
  text-align: right;
  span {
    top: 5px;
    position: relative;
    font-weight: 500;
    margin-left: 8px;
  }
}
.lz_content {
  top: 70px;
  position: relative;
}
</style>
