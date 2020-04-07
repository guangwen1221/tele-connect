<template>
  <div>
    <div class="main-wrapper">
      <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      </div>-->
      <my-header></my-header>
      <router-view />
      <my-footer></my-footer>
    </div>
    <call-dialog v-if="showCallDialog"></call-dialog>
  </div>
</template>

<script>
import MyHeader from "./components/Header";
import MyFooter from "./components/Footer";
import CallDialog from "./components/CallDialog";
import $ from "jquery";
import { AgoraRtmClient } from "@/agora";
import axios from "axios";
import { API_URL } from "./config";

export default {
  components: {
    MyHeader,
    MyFooter,
    CallDialog
  },
  computed: {
    showCallDialog() {
      return this.$store.state.showCallDialog;
    }
  },
  async mounted() {
    this.resizeContent();
    let user = JSON.parse(localStorage.getItem("user"));

    if (user != null) {
      this.$store.commit("setUserInfo", user);
    }

    if (user && AgoraRtmClient.connectionState != "CONNECTED") {
      await AgoraRtmClient.login({ uid: user._id });
    }

    AgoraRtmClient.on("MessageFromPeer", ({ text }, peerId) => {
      console.log("Message arrived");
      console.log(text);
      console.log(peerId);
      const today = new Date();

      console.log(user);
      this.$store.commit("addChatHistory", {
        senderId: peerId,
        receiverId: user._id,
        content: text,
        time: today.getHours() + ":" + today.getMinutes()
      });
    });

    this.$socket.on("RES_VOICE_CALL", data => {
      console.log("RES_VOICE_CALL");
      console.log(data);
      this.$store.commit("setCallUser", {
        _id: data.receiverId,
        name: data.senderName,
        avatarUrl: data.avatarUrl,
        senderId: data.senderId,
        channel: data.channel
      });

      this.$store.commit("updateCallDialogVisibility", true);
    });

    this.$socket.on("RES_CANCEL_CALL", () => {
      console.log("RES_CANCEL_CALL");
      this.$store.commit("updateCallDialogVisibility", false);
    });

    this.$socket.on("RES_ACCEPT_CALL", () => {
      console.log("RES_ACCEPT_CALL");
      this.$store.commit("updateCallDialogVisibility", false);
      this.$router.push("/voice-call");
    });
  },
  updated() {
    this.resizeContent();
  },
  methods: {
    resizeContent() {
      var height = $(window).height();
      var header_height = $(".header").height();
      var footer_height = $(".footer").height();
      var setheight = height - header_height;
      var trueheight = setheight - footer_height;

      $(".content").css("min-height", trueheight);
    }
  },
  socket: {
    events: {
      async connect() {
        this.$store.commit("setSocketId", this.$socket.id);
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && this.$socket) {
          await axios.post(API_URL + "users/updateSocketId", {
            userId: user._id,
            socketId: this.$socket.id
          });
          console.log("Socket Connected:", this.$socket.id);
        }
      }
    }
  }
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
