<template>
  <div class="lcu_login">
    <h1>LowCodeUI</h1>
    <!-- <h1>{{ msg }}</h1>
    <h1>Prop 声明:{{ visible }}</h1>
    <h1>{{ count }}</h1>
    <h1>{{ hellocount }}</h1>
    <h1>{{ dataMsg.msagehello }}</h1>
    <button v-on:click="greet">公共状态get</button>
    <button @click="handleClickOutside">私有组件状态get</button> -->
    <div class="lcu_email">
      邮箱：<input type="text" v-model="email" />
    </div>
    <div class="lcu_password">
      密码：<input type="password" v-model="password" />
    </div>
    <div class="lcu_ok">
      <button @click="ok">确定</button>
    </div>
    <span>以内部系统账号为准</span>
  </div>
  <div class="lcu_login_footer">
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
.lcu_login {
  width: 450px;
  margin: 0 auto;
  position: relative;
  top: 20%;
  transform: translateY(-20%);
}
.lcu_login div {
  margin: 15px;
}
.lcu_email,
.lcu_password {
  text-align: left;
}
.lcu_password input,.lcu_email input {
  width: 76%;
}
.lcu_ok {
  text-align: center;
}
.lcu_ok button {
  width: 76%;
}
.lcu_login_footer {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>
