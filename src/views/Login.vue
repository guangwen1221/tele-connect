<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Login Tab Content -->
          <div class="account-content">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7 col-lg-6 login-left">
                <img src="assets/img/login-banner.png" class="img-fluid" alt="Doccure Login" />
              </div>
              <div class="col-md-12 col-lg-6 login-right">
                <div class="login-header">
                  <h3>
                    Login
                    <span>TeleConnect</span>
                  </h3>
                </div>
                <form action="/">
                  <div class="form-group form-focus">
                    <input type="email" class="form-control floating" v-model="email" />
                    <label class="focus-label">Email</label>
                  </div>
                  <div class="form-group form-focus">
                    <input type="password" class="form-control floating" v-model="password" />
                    <label class="focus-label">Password</label>
                  </div>
                  <div class="text-right">
                    <router-link class="forgot-link" to="/forgot-password">Forgot Password ?</router-link>
                  </div>
                  <button
                    class="btn btn-primary btn-block btn-lg login-btn"
                    @click.prevent="loginWithEmail"
                    :disabled="validateForm"
                  >Login</button>
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
                  <div class="text-center dont-have">
                    Don’t have an account?
                    <router-link to="/register-patient">Register</router-link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- /Login Tab Content -->
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
import { AgoraRtmClient } from "@/agora";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    validateForm() {
      if (this.email.length > 0 && this.password.length > 0) {
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
    async loginWithEmail() {
      this.$vs.loading();
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        this.$vs.loading.close();

        const response = await axios.post(API_URL + "auth/login", {
          email: this.email,
          socketId: this.$socket.id
        });

        const user = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        this.$store.commit("setUserInfo", user);

        // login to Agora
        AgoraRtmClient.login({ uid: user._id })
          .then(() => {
            console.log("AgoraRTM client login success");
          })
          .catch(err => {
            console.log("AgoraRTM client login failure", err);
          });

        if (user.type == "patient") {
          this.$router.push("/patient-settings");
        } else if (user.type == "doctor") {
          this.$router.push("/doctor-settings");
        }
        this.email = "";
        this.password = "";
      } catch (error) {
        this.$vs.loading.close();
        this.email = "";
        this.password = "";
        this.$vs.notify({
          title: error.code,
          text: error.message,
          color: "danger"
        });
      }
    }
  },
  destroyed() {
    $("body").removeClass("account-page");
  }
};
</script>

<style lang="scss" scoped>
</style>