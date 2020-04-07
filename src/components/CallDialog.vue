<template>
  <!-- <div class="modal fade call-modal" id="voice_call" v-if="callUser">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          
          <div class="call-box incoming-box">
            <div class="call-wrapper">
              <div class="call-inner">
                <div class="call-user">
                  <img alt="User Image" :src="getAvatarUrl(callUser.avatarUrl)" class="call-avatar" />
                  <h4>{{callUser.name}}</h4>
                  <span>Connecting...</span>
                </div>
                <div class="call-items">
                  <a
                    href="javascript:void(0);"
                    class="btn call-item call-end"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i class="material-icons">call_end</i>
                  </a>
                  <a
                    href="voice-call.html"
                    class="btn call-item call-start"
                    v-if="callUser._id == user._id"
                  >
                    <i class="material-icons">call</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>-->

  <div>
    <div class="modal fade call-modal show" id="voice_call" style="display: block">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="call-box incoming-box">
              <div class="call-wrapper">
                <div class="call-inner">
                  <div class="call-user">
                    <img
                      alt="User Image"
                      :src="getAvatarUrl(callUser.avatarUrl)"
                      class="call-avatar"
                    />
                    <h4>{{callUser.name}}</h4>
                    <span v-if="callUser._id == user._id">Incomming...</span>
                    <span v-else>Connecting...</span>
                  </div>
                  <div class="call-items">
                    <a
                      href="javascript:void(0);"
                      class="btn call-item call-end"
                      @click.prevent="cancelCall"
                    >
                      <i class="material-icons">call_end</i>
                    </a>
                    <a
                      href="javascript:void(0)"
                      class="btn call-item call-start"
                      v-if="callUser._id == user._id"
                      @click="acceptCall"
                    >
                      <i class="material-icons">call</i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
export default {
  computed: {
    callUser() {
      return this.$store.state.callUser;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    getAvatarUrl(url) {
      if (url && url.length > 0) {
        return url;
      }
      var images = require.context("../assets/img", false, /\.jpg$/);
      return images("./default-avatar.jpg");
    },
    cancelCall() {
      if (this.callUser._id == this.user._id) {
        this.$socket.emit("REQUEST_CANCEL_CALL", {
          userId: this.callUser.senderId
        });
      } else {
        this.$socket.emit("REQUEST_CANCEL_CALL", {
          userId: this.callUser._id
        });
      }
      this.$store.commit("updateCallDialogVisibility", false);
    },
    acceptCall() {
      this.$store.commit("updateCallDialogVisibility", false);
      this.$socket.emit("REQ_ACCEPT_CALL", {
        userId: this.callUser.senderId
      });
      this.$router.push("/voice-call");
    }
  },
  mounted() {
    // console.log(this.callUser);
  }
};
</script>

<style lang="scss" scoped>
</style>