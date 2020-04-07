<template>
  <div class="card" v-if="user">
    <div class="card-body">
      <!-- Profile Settings Form -->
      <form>
        <div class="row form-row">
          <div class="col-12 col-md-12">
            <div class="form-group">
              <div class="change-avatar">
                <div class="profile-img">
                  <img :src="avatarUrl" alt="User Image" />
                </div>
                <div class="upload-img">
                  <div class="change-photo-btn">
                    <span>
                      <i class="fa fa-upload"></i> Upload Photo
                    </span>
                    <input type="file" class="upload" @change="uploadAvatar" />
                  </div>
                  <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" class="form-control" v-model="firstName" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" class="form-control" v-model="lastName" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Date of Birth</label>
              <div class="cal-icon">
                <!-- <input type="text" class="form-control datetimepicker" value="24-07-1983" /> -->
                <datepicker class="datepicker" v-model="user.birthday"></datepicker>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Blood Group</label>
              <select class="form-control select" v-model="user.bloodGroup">
                <option value="a-">A-</option>
                <option value="a+">A+</option>
                <option value="b-">B-</option>
                <option value="b+">B+</option>
                <option value="ab-">AB-</option>
                <option value="ab+">AB+</option>
                <option value="o-">O-</option>
                <option value="o+">O+</option>
              </select>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Email ID</label>
              <input type="email" class="form-control" v-model="user.email" readonly />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Mobile</label>
              <input type="text" v-model="user.mobile" class="form-control" />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Address</label>
              <input type="text" class="form-control" v-model="user.address1" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>City</label>
              <input type="text" class="form-control" v-model="user.city" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>State</label>
              <input type="text" class="form-control" v-model="user.state" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Zip Code</label>
              <input type="text" class="form-control" v-model="user.zipCode" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Country</label>
              <input type="text" class="form-control" v-model="user.country" />
            </div>
          </div>
        </div>
        <div class="submit-section">
          <button
            type="submit"
            class="btn btn-primary submit-btn"
            @click.prevent="saveProfile"
          >Save Changes</button>
        </div>
      </form>
      <!-- /Profile Settings Form -->
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import $ from "jquery";
import axios from "axios";
import { API_URL } from "@/config";
import { storage } from "@/firebase";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    firstName: {
      get() {
        return this.user.name.split(" ")[0];
      },
      set(value) {
        this.user.name = value + " " + this.lastName;
        this.$store.commit("setUserInfo", this.user);
      }
    },
    lastName: {
      get() {
        return this.user.name.split(" ")[1];
      },
      set(value) {
        this.user.name = this.firstName + " " + value;
        this.$store.commit("setUserInfo", this.user);
      }
    }
  },
  components: {
    Datepicker
  },
  data() {
    return {
      avatarUrl: ""
    };
  },
  mounted() {
    setTimeout(() => {
      $(".datepicker input").addClass("form-control");
    }, 100);
    this.$store.commit("setSidebarItem", "profile-settings");

    if (this.user && this.user.avatarUrl) {
      this.avatarUrl = this.user.avatarUrl;
    } else {
      var images = require.context("../../assets/img", false, /\.jpg$/);
      this.avatarUrl = images("./default-avatar.jpg");
    }
  },
  methods: {
    async saveProfile() {
      localStorage.setItem("user", JSON.stringify(this.user));
      this.$store.commit("setUserInfo", this.user);

      this.$vs.loading();
      await axios.post(API_URL + "users/update", this.user);
      this.$vs.loading.close();
    },
    uploadAvatar(e) {
      const fileList = e.target.files || e.dataTransfer.files;
      const file = fileList[0];
      const today = new Date();
      const fileName =
        file.name +
        "-" +
        today.getHours() +
        today.getMinutes() +
        today.getSeconds();
      this.$vs.loading();
      const taskUploadFile = storage.ref(`images/${fileName}`).put(file);

      const vm = this;
      taskUploadFile.on(
        "state_changed",
        function() {},
        null,
        function() {
          taskUploadFile.snapshot.ref
            .getDownloadURL()
            .then(function(downloadURL) {
              vm.avatarUrl = downloadURL;
              vm.user.avatarUrl = downloadURL;
              vm.$store.commit("setUserInfo", vm.user);
              vm.$vs.loading.close();
            });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>