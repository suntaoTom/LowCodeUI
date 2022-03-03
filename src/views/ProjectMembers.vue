<template>
  <div class="lcu_project_members">
    <div class="lcu_setup">
      <div class="lcu_group">
        <label>Select members to invite</label>
        <div class="lcu_group_from">
          <el-select
            style="width: 90%;"
            v-model="value"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.user_id"
            >
              <span style="float: left">{{ item.chinese_name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.name
              }}</span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lcu_group">
        <label>Choose a role permission</label>
        <div class="lcu_group_from">
          <el-select
            v-model="permission_value"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in permission"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.value === '4'"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lcu_group">
        <div class="lcu_group_from">
          <el-button
            @click="add"
            :disabled="!(value.length > 0 && permission_value !== '')"
            >Add to project</el-button
          >
        </div>
      </div>
    </div>
    <div class="lcu_members_groups">
      <ul>
        <li v-for="item in userRole" :key="item">
          <div class="lcu_members_groups_user">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <h4>{{ item.chinese_name }}</h4>
            <h6>@{{ item.name }}</h6>
          </div>
          <div class="lcu_members_groups_util">
            <el-select
              v-model="item.permission"
              placeholder="请选择"
              size="mini"
              :disabled="item.permission === '4'"
              @change="setPermis($event, item.role_id)"
            >
              <el-option
                v-for="item in permission"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.value === '4'"
              >
              </el-option>
            </el-select>
            <el-button
              v-if="item.permission !== '4'"
              @click="delRole(item)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProjectMembersStore from "@/store/modules/projectmembers";
import packageInfo from "../../package.json";
import LoginStore from "@/store/modules/login";
@Options({
  name: "ProjectMembers",
  components: {},
  props: {}
})
export default class ProjectMembers extends Vue {
  // data 对象
  private permission: any = [
    {
      value: "1",
      label: "Reporter"
    },
    {
      value: "2",
      label: "Developer"
    },
    {
      value: "3",
      label: "Maintainer"
    },
    {
      value: "4",
      label: "Owner"
    }
  ];
  private permission_value = "";
  private options: any = [];
  private value = [];
  private loading = false;

  private userRole: any = [];

  async setPermis(data: any, id: any) {
    console.log(25, data, id);
    let a: any = LoginStore.personInfo;
    await ProjectMembersStore.setPermise({
      permission: data,
      id: id,
      user_id: a.id,
      project_id: this.$route.query.id
    });
    this.getRole();
  }
  async delRole(item: any) {
    console.log(1212, item);
    if (confirm(`确定删除  ${item.chinese_name}  成员？`) == true) {
      let a: any = LoginStore.personInfo;
      await ProjectMembersStore.delRole({
        id: item.role_id,
        user_id: a.id,
        project_id: this.$route.query.id
      });
      this.getRole();
    }
  }

  async getRole() {
    await ProjectMembersStore.getRole({
      project_id: this.$route.query.id
    });
    this.userRole = ProjectMembersStore.userRole;
  }

  async add() {
    if (this.$route.query.id !== undefined) {
      await ProjectMembersStore.addRole({
        project_id: this.$route.query.id,
        permission_value: this.permission_value,
        user_id: this.value
      });
      this.getRole();
    }
    console.log(3434, this.$route.query.id, this.permission_value, this.value);
  }
  async remoteMethod(query: any) {
    console.log(12, query, this.$route.query.id);
    if (query !== "" && this.$route.query.id !== undefined) {
      this.loading = true;
      await ProjectMembersStore.Search({ content: query });
      setTimeout(() => {
        this.loading = false;
        this.options = ProjectMembersStore.userInfo;
      }, 200);
    } else {
      this.options = [];
    }
  }
  // methods
  mounted() {
    // this.list = this.states.map(item => {
    //   return { value: `value:${item}`, label: `label:${item}` };
    // });
    this.getRole();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.lcu_project_members {
  width: 100%;
  height: 100%;
  text-align: left;
}
.lcu_setup {
  width: 100%;
  padding-left: 50px;
  .lcu_group_from {
    margin: 10px;
  }
}
.lcu_members_groups {
  width: 100%;
  height: 60%;
  overflow: auto;
  .lcu_members_groups_user {
    width: 50%;
    display: inline-flex;
    .el-avatar--large {
      margin: 10px;
    }
    h6 {
      margin-left: 5px;
    }
  }
  .lcu_members_groups_util {
    width: 50%;
    .el-button.is-circle {
      margin-left: 10px;
    }
  }
  li {
    display: flex;
  }
}
</style>
