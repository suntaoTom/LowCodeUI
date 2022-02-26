<template>
  <div class="lz_login">
    <h1>ServerUI</h1>
    <!-- <h1>{{ msg }}</h1>
    <h1>Prop 声明:{{ visible }}</h1>
    <h1>{{ count }}</h1>
    <h1>{{ hellocount }}</h1>
    <h1>{{ dataMsg.msagehello }}</h1>
    <button v-on:click="greet">公共状态get</button>
    <button @click="handleClickOutside">私有组件状态get</button> -->
    <div class="lz_email">
      邮箱：<input type="text" v-model="email" />
    </div>
    <div class="lz_password">
      密码：<input type="password" v-model="password" />
    </div>
    <div class="lz_ok">
      <button @click="ok">确定</button>
    </div>
    <span>以内部系统账号为准</span>
  </div>
  <div class="lz_login_footer">
    <h3>V{{ packageInfo.version }}</h3>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginStore from "@/store/modules/login";
import packageInfo from "../../package.json";
import storage from "@/utils/storage";

@Options({
  name: "login",
  components: {},
  props: {}
})
export default class Login extends Vue {
  private packageInfo = packageInfo;
  // data 对象
  private email = "";
  private password = "";

  // methods
  private async ok() {
    let a = { username: this.email, password: this.password };
    await LoginStore.Login(a);
    let b: any = LoginStore.personInfo;
    console.log(99, b);
    if (b.status) {
      this.$router.push("/home");
    } else {
      alert(b.message.msg);
    }
  }
  mounted() {
    storage.set("PERSON_INFO", "");
    storage.set("ACCESS_TOKEN", "");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lz_login {
  width: 450px;
  margin: 0 auto;
  position: relative;
  top: 20%;
  transform: translateY(-20%);
}
.lz_login div {
  margin: 15px;
}
.lz_email,
.lz_password {
  text-align: left;
}
.lz_password input,.lz_email input {
  width: 76%;
}
.lz_ok {
  text-align: center;
}
.lz_ok button {
  width: 76%;
}
.lz_login_footer {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>
