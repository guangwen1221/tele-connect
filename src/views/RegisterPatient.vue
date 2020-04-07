<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Register Content -->
          <div class="account-content">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7 col-lg-6 login-left">
                <img src="assets/img/login-banner.png" class="img-fluid" alt="Doccure Register" />
              </div>
              <div class="col-md-12 col-lg-6 login-right">
                <div class="login-header">
                  <h3>
                    Patient Register
                    <router-link to="/register-doctor">Are you a Doctor?</router-link>
                  </h3>
                </div>

                <!-- Register Form -->
                <form action="doctor-dashboard.html">
                  <div class="form-group form-focus">
                    <input type="text" class="form-control floating" v-model="user.name" />
                    <label class="focus-label">Name</label>
                  </div>
                  <div class="form-group form-focus">
                    <input type="email" class="form-control floating" v-model="user.email" />
                    <label class="focus-label">Email</label>
                  </div>
                  <div class="form-group form-focus">
                    <input type="text" class="form-control floating" v-model="user.mobile" />
                    <label class="focus-label">Mobile Number</label>
                  </div>
                  <div class="form-group form-focus">
                    <input type="password" class="form-control floating" v-model="user.password" />
                    <label class="focus-label">Password</label>
                  </div>
                  <div class="text-right">
                    <router-link class="forgot-link" to="/login">Already have an account?</router-link>
                  </div>
                  <button
                    class="btn btn-primary btn-block btn-lg login-btn"
                    @click.prevent="signupWithEmail"
                    :disabled="validateForm"
                  >Signup</button>
                  <div class="login-or">
                    <span class="or-line"></span>
                    <span class="span-or">or</span>
                  </div>
                  <div class="row form-row social-login">
                    <div class="col-6">
                      <a href="#" class="btn btn-facebook btn-block">
                        <i class="fab fa-facebook-f mr-1"></i> Login
                      </a>
                    </div>
                    <div class="col-6">
                      <a href="#" class="btn btn-google btn-block">
                        <i class="fab fa-google mr-1"></i> Login
                      </a>
                    </div>
                  </div>
                </form>
                <!-- /Register Form -->
              </div>
            </div>
          </div>
          <!-- /Register Content -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import { API_URL } from "@/config";
export default {
  data() {
    return {
      user: {}
    };
  },
  computed: {
    validateForm() {
      if (
        this.user.name &&
        this.user.name.length > 0 &&
        this.user.email &&
        this.user.email.length > 0 &&
        this.user.mobile &&
        this.user.mobile.length > 0 &&
        this.user.password &&
        this.user.password.length > 0
      ) {
        return false;
      }
      return true;
    }
  },
  mounted() {
    $("body").addClass("account-page");

    if ($(".floating").length > 0) {
      $(".floating")
        .on("focus blur", function(e) {
          $(this)
            .parents(".form-focus")
            .toggleClass(
              "focused",
              e.type === "focus" || this.value.length > 0
            );
        })
        .trigger("blur");
    }
  },
  methods: {
    async signupWithEmail() {
      this.$vs.loading();
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password);
        this.user["type"] = "patient";

        const newUser = await axios.post(API_URL + "auth/signup", this.user);
        this.$vs.loading.close();

        localStorage.setItem("user", JSON.stringify(newUser.data));
        this.$store.commit("setUserInfo", newUser.data);
        this.$router.push("/patient-settings");
        this.user = {};
      } catch (error) {
        this.$vs.loading.close();
        this.user = {};
        this.$vs.notify({
          title: error.code,
          text: error.message,
          color: "danger"
        });
      }
      this.$vs.loading.close();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>