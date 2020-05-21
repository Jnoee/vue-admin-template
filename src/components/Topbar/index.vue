<template>
  <div class="topbar">
    <el-row>
      <el-col :span="18">
        <el-menu
          :default-active="activeIndex"
          class="left-menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#2b2f3a"
          text-color="#f4f4f5"
          active-text-color="#409EFF"
        >
          <el-menu-item index="system">
            <i class="el-icon-setting"></i>
            <span slot="title">系统</span>
          </el-menu-item>
          <el-menu-item index="operate">
            <i class="el-icon-goods"></i>
            <span slot="title">运营</span>
          </el-menu-item>
          <el-menu-item index="resource">
            <i class="el-icon-s-order"></i>
            <span slot="title">资源</span>
          </el-menu-item>
          <el-menu-item index="other">
            <i class="el-icon-help"></i>
            <span slot="title">其他</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6">
        <div class="right-menu">
          <el-dropdown
            class="avatar-container"
            trigger="click"
          >
            <div class="avatar-wrapper">
              <img
                :src="avatar+'?imageView2/1/w/80/h/80'"
                class="user-avatar"
              >
              <i class="el-icon-caret-bottom"/>
            </div>
            <el-dropdown-menu
              slot="dropdown"
              class="user-dropdown"
            >
              <router-link to="/">
                <el-dropdown-item>
                  首页
                </el-dropdown-item>
              </router-link>
              <a
                target="_blank"
                href="https://github.com/PanJiaChen/vue-admin-template/"
              >
                <el-dropdown-item>修改密码</el-dropdown-item>
              </a>
              <el-dropdown-item
                divided
                @click.native="logout"
              >
                <span style="display:block;">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Topbar',
    data() {
      return {
        activeIndex: this.$store.state.app.module
      }
    },
    computed: {
      ...mapGetters(['avatar'])
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
        console.log(this.$route)
        this.$store.commit('app/changeModule', key)
        this.$router.push(`${this.$route.fullPath}`)
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topbar {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .left-menu {
      height: 100%;
      background: #fff;

      .el-menu-item {
        font-weight: bold;
        height: 50px;
        line-height: 47px;
      }
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
