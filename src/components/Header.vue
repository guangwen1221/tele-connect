<template>
  <div>
    <header class="header">
      <nav class="navbar navbar-expand-lg header-nav">
        <div class="navbar-header">
          <a id="mobile_btn" href="javascript:void(0);">
            <span class="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <router-link to="/" class="navbar-brand logo">
            <img src="../assets/img/logo.png" class="img-fluid" alt="Logo" />
          </router-link>
        </div>
        <div class="main-menu-wrapper">
          <div class="menu-header">
            <router-link to="/" class="menu-logo">
              <img src="/assets/img/logo.png" class="img-fluid" alt="Logo" />
            </router-link>
            <a id="menu_close" class="menu-close" href="javascript:void(0);">
              <i class="fas fa-times"></i>
            </a>
          </div>
          <ul class="main-nav">
            <li :class="{'active': headerItem == 'home'}">
              <router-link to="/">Home</router-link>
            </li>

            <li v-if="isPatient" :class="{'active': headerItem == 'patient-dashboard'}">
              <router-link to="/patient-settings">Dashboard</router-link>
            </li>

            <li v-if="isDoctor" :class="{'active': headerItem == 'doctor-dashboard'}">
              <router-link to="/doctor-settings">Dashboard</router-link>
            </li>

            <li class="login-link">
              <a href="login.html">Login / Signup</a>
            </li>
          </ul>
        </div>
        <ul class="nav header-navbar-rht">
          <li class="nav-item contact-item">
            <div class="header-contact-img">
              <i class="far fa-hospital"></i>
            </div>
            <div class="header-contact-detail">
              <p class="contact-header">Contact</p>
              <p class="contact-info-header">+1 646 847 6185</p>
            </div>
          </li>
          <li class="nav-item" v-if="!isLogin">
            <router-link class="nav-link header-login" to="/login">login / Signup</router-link>
          </li>

          <li class="nav-item dropdown has-arrow logged-item" v-if="isLogin && user">
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <span class="user-img">
                <img class="rounded-circle" :src="avatarUrl" width="31" />
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <div class="user-header">
                <div class="avatar avatar-sm">
                  <img :src="avatarUrl" alt="User Image" class="avatar-img rounded-circle" />
                </div>
                <div class="user-text">
                  <h6>{{user.name}}</h6>
                  <p class="text-muted mb-0">{{user.type}}</p>
                </div>
              </div>
              <router-link
                class="dropdown-item"
                v-if="isPatient"
                to="/patient-settings"
              >Profile Settings</router-link>
              <router-link
                class="dropdown-item"
                v-if="isDoctor"
                to="/doctor-settings"
              >Profile Settings</router-link>
              <a class="dropdown-item" href="javascript:void(0);" @click.prevent="logout">Logout</a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import AgoraRtmClient from "@/agora";
export default {
  data() {
    return {
      avatarUrl: ""
    };
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user;
    },
    isPatient() {
      if (this.user && this.user.type == "patient") {
        return true;
      }
      return false;
    },
    isLogin() {
      if (this.user != null) {
        return true;
      }
      return false;
    },
    headerItem() {
      return this.$store.state.headerItem;
    },
    isDoctor() {
      if (this.user && this.user.type == "doctor") {
        return true;
      }
      return false;
    }
  },
  watch: {
    user() {
      if (this.user && this.user.avatarUrl) {
        this.avatarUrl = this.user.avatarUrl;
      } else {
        var images = require.context("../assets/img", false, /\.jpg$/);
        this.avatarUrl = images("./default-avatar.jpg");
      }
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.user && this.user.avatarUrl) {
        this.avatarUrl = this.user.avatarUrl;
      } else {
        var images = require.context("../assets/img", false, /\.jpg$/);
        this.avatarUrl = images("./default-avatar.jpg");
      }
    }, 100);
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$store.commit("setUserInfo", null);
      this.$router.push("/");
      if (AgoraRtmClient) {
        AgoraRtmClient.logout();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>