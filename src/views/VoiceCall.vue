<template>
  <div class="content">
    <div class="container">
      <!-- Call Wrapper -->
      <div class="call-wrapper">
        <div class="call-main-row">
          <div class="call-main-wrapper">
            <div class="call-view">
              <div class="call-window">
                <!-- Call Header -->
                <div class="fixed-header">
                  <div class="navbar">
                    <div class="user-details mr-auto">
                      <div class="float-left user-img">
                        <a class="avatar avatar-sm mr-2" href="javascript:void(0);">
                          <img
                            :src="getAvatarUrl(user.avatarUrl)"
                            alt="User Image"
                            class="rounded-circle"
                          />
                          <span class="status online"></span>
                        </a>
                      </div>
                      <div class="user-info float-left">
                        <a href="javascript:void(0);">
                          <span>{{user.name}}</span>
                        </a>
                        <span class="last-seen">Online</span>
                      </div>
                    </div>
                    <ul class="nav float-right custom-menu">
                      <li class="nav-item dropdown dropdown-action">
                        <a
                          href="#"
                          class="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="fa fa-cog"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a href="javascript:void(0)" class="dropdown-item">Settings</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- /Call Header -->

                <!-- Call Contents -->
                <div class="call-contents">
                  <div class="call-content-wrap" v-if="!videoEnable">
                    <div class="voice-call-avatar">
                      <img
                        :src="getAvatarUrl(callUser.avatarUrl)"
                        alt="User Image"
                        class="call-avatar"
                      />
                      <span class="username">{{callUser.name}}</span>
                      <!-- <span class="call-timing-count">00:00</span> -->
                    </div>
                    <div id="local_stream"></div>
                    <div class="call-users">
                      <ul>
                        <li>
                          <a href="#" id="remote_stream">
                            <img
                              src="/assets/img/patients/patient1.jpg"
                              class="img-fluid"
                              alt="User Image"
                            />
                            <span class="call-mute">
                              <i class="fa fa-microphone-slash"></i>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="call-content-wrap" v-if="videoEnable">
                    <div class="user-video" id="remote_stream">
                      <!-- <img src="assets/img/video-call.jpg" alt="User Image" /> -->
                    </div>
                    <div class="my-video" id="local_stream">
                      <!-- <ul>
                        <li id="local_stream">
                          <img
                            src="assets/img/patients/patient1.jpg"
                            class="img-fluid"
                            alt="User Image"
                          />
                        </li>
                      </ul>-->
                    </div>
                  </div>
                </div>
                <!-- /Call Contents -->

                <!-- Call Footer -->
                <div class="call-footer">
                  <div class="call-icons">
                    <ul class="call-items">
                      <li class="call-item">
                        <a
                          href="#"
                          title="Enable Video"
                          data-placement="top"
                          data-toggle="tooltip"
                          @click.prevent="setVideoVisibile"
                        >
                          <i class="fas fa-video camera"></i>
                        </a>
                      </li>
                      <li class="call-item">
                        <a href="#" title="Mute" data-placement="top" data-toggle="tooltip">
                          <i class="fa fa-microphone microphone"></i>
                        </a>
                      </li>
                      <!-- <li class="call-item">
                        <a href="#" title="Add User" data-placement="top" data-toggle="tooltip">
                          <i class="fa fa-user-plus"></i>
                        </a>
                      </li>-->
                    </ul>
                    <div class="end-call">
                      <a href="javascript:void(0);" @click="endCall">
                        <i class="material-icons">call_end</i>
                      </a>
                    </div>
                  </div>
                </div>
                <!-- /Call Footer -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Call Wrapper -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import AgoraRTC from "agora-rtc-sdk";
import { AGORA_APP_ID } from "@/config";
// rtc object
var rtc = {
  client: null,
  joined: false,
  published: false,
  localStream: null,
  remoteStreams: [],
  params: {}
};
export default {
  computed: {
    callUser() {
      return this.$store.state.callUser;
    },
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      videoEnable: true
    };
  },
  mounted() {
    $("body").addClass("call-page");

    this.initRTC();

    this.$socket.on("RES_END_CALL", () => {
      this.endCall();
    });
  },
  methods: {
    getAvatarUrl(url) {
      if (url && url.length > 0) {
        return url;
      }
      var images = require.context("../assets/img", false, /\.jpg$/);
      return images("./default-avatar.jpg");
    },
    async initRTC() {
      // Options for joining a channel

      var option = {
        appID: AGORA_APP_ID,
        channel: this.callUser.channel,
        uid: this.user._id
      };

      rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

      rtc.client.init(
        option.appID,
        function() {
          console.log("init success");
        },
        err => {
          console.error(err);
        }
      );

      rtc.client.join(
        option.token,
        option.channel,
        option.uid,
        function(uid) {
          console.log(
            "join channel: " + option.channel + " success, uid: " + uid
          );
          rtc.params.uid = uid;

          rtc.localStream = AgoraRTC.createStream({
            streamID: rtc.params.uid,
            audio: true,
            video: true,
            screen: false
          });

          rtc.localStream.init(
            function() {
              console.log("init local stream success");
              // play stream with html element id "local_stream"
              rtc.localStream.play("local_stream");

              // Publish the local stream
              rtc.client.publish(rtc.localStream, function(err) {
                console.log("publish failed");
                console.error(err);
              });
            },
            function(err) {
              console.error("init local stream failed ", err);
            }
          );
        },
        function(err) {
          console.error("client join failed", err);
        }
      );

      rtc.client.on("stream-added", function(evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        if (id !== rtc.params.uid) {
          rtc.client.subscribe(remoteStream, function(err) {
            console.log("stream subscribe failed", err);
          });
        }
        console.log("stream-added remote-uid: ", id);
      });

      rtc.client.on("stream-subscribed", function(evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        // Add a view for the remote stream.
        // addView(id);
        // Play the remote stream.
        // remoteStream.play("remote_stream_" + id);
        remoteStream.play("remote_stream");
        console.log("stream-subscribed remote-uid: ", id);
      });

      rtc.client.on("stream-removed", function(evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        // Stop playing the remote stream.
        // remoteStream.stop("remote_stream_" + id);
        remoteStream.stop("remote_stream");
        // Remove the view of the remote stream.
        // removeView(id);
        console.log("stream-removed remote-uid: ", id);
      });
    },
    endCall() {
      rtc.client.leave(
        function() {
          // Stop playing the local stream
          rtc.localStream.stop();
          // Close the local stream
          rtc.localStream.close();
          // Stop playing the remote streams and remove the views
          while (rtc.remoteStreams.length > 0) {
            var stream = rtc.remoteStreams.shift();
            // var id = stream.getId();
            stream.stop();
            // removeView(id);
          }
          console.log("client leaves channel success");
        },
        function(err) {
          console.log("channel leave failed");
          console.error(err);
        }
      );
      this.$router.push("/");
      this.$socket.emit("REQ_END_CALL", { userId: this.callUser._id });
    },
    setVideoVisibile() {
      rtc.localStream.video = false;
    }
  },
  destroyed() {
    $("body").removeClass("call-page");
  }
};
</script>

<style lang="scss" scoped>
</style>