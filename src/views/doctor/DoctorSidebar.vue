<template>
  <div class="profile-sidebar" v-if="user">
    <div class="widget-profile pro-widget-content">
      <div class="profile-info-widget">
        <a href="#" class="booking-doc-img">
          <img :src="avatarUrl" alt="User Image" />
        </a>
        <div class="profile-det-info">
          <h3>{{user.name}}</h3>
          <div class="patient-details">
            <h5>
              <i class="fas fa-birthday-cake"></i>
              {{birthday}}
            </h5>
            <h5 class="mb-0">
              <i class="fas fa-map-marker-alt"></i>
              {{user.state}}, {{user.country}}
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard-widget">
      <nav class="dashboard-menu">
        <ul>
          <li :class="{'active': sidebarItem == 'doctor-settings'}">
            <router-link to="/profile-settings">
              <i class="fas fa-user-cog"></i>
              <span>Profile Settings</span>
            </router-link>
          </li>
          <li>
            <router-link to="/chat">
              <i class="fas fa-comments"></i>
              <span>Message</span>
              <!-- <small class="unread-msg">23</small> -->
            </router-link>
          </li>
          <!-- <li>
            <a href="change-password.html">
              <i class="fas fa-lock"></i>
              <span>Change Password</span>
            </a>
          </li>-->
          <li>
            <a href="javascript:void(0);" @click.prevent="logout">
              <i class="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
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
    birthday() {
      if (this.user.birthday) {
        const birthday = new Date(this.user.birthday);
        const year = birthday.getFullYear();
        const stringMonth = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        const month = birthday.getMonth();
        const date = birthday.getDate();
        const today = new Date();
        const thisYear = today.getFullYear();
        const age = thisYear - year;
        return `${date} ${stringMonth[month]} ${year}, ${age}years`;
      }
      return "";
    },
    sidebarItem() {
      return this.$store.state.sidebarItem;
    }
  },
  mounted() {
    if (this.user && this.user.avatarUrl) {
      this.avatarUrl = this.user.avatarUrl;
    } else {
      var images = require.context("../../assets/img", false, /\.jpg$/);
      this.avatarUrl = images("./default-avatar.jpg");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$store.commit("setUserInfo", null);
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>