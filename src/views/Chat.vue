<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="chat-window">
            <!-- Chat Left -->
            <div class="chat-cont-left">
              <div class="chat-header">
                <span>Chats</span>
                <a href="javascript:void(0)" class="chat-compose">
                  <i class="material-icons">control_point</i>
                </a>
              </div>
              <form class="chat-search">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <i class="fas fa-search"></i>
                  </div>
                  <input type="text" class="form-control" placeholder="Search" />
                </div>
              </form>
              <div class="chat-users-list">
                <div class="chat-scroll">
                  <a
                    href="javascript:void(0);"
                    class="media read-chat"
                    v-for="(contact, index) in contacts"
                    :key="`contact-${index}`"
                    :class="{'active': contact._id == friendId}"
                    @click="joinRoom(contact._id)"
                  >
                    <div class="media-img-wrap">
                      <div class="avatar avatar-online">
                        <img
                          :src="getAvatarUrl(contact.avatarUrl)"
                          alt="User Image"
                          class="avatar-img rounded-circle"
                        />
                      </div>
                    </div>
                    <div class="media-body">
                      <div>
                        <div class="user-name">{{contact.name}}</div>
                        <!-- <div class="user-last-chat">Hey, How are you?</div> -->
                      </div>
                      <div>
                        <!-- <div class="last-chat-time block">2 min</div>
                        <div class="badge badge-success badge-pill">15</div>-->
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <!-- /Chat Left -->

            <!-- Chat Right -->
            <div class="chat-cont-right" v-if="friendId">
              <div class="chat-header">
                <a id="back_user_list" href="javascript:void(0)" class="back-user-list">
                  <i class="material-icons">chevron_left</i>
                </a>
                <div class="media">
                  <div class="media-img-wrap">
                    <div class="avatar avatar-online">
                      <img
                        :src="getAvatarUrl(friendInfo.avatarUrl)"
                        alt="User Image"
                        class="avatar-img rounded-circle"
                      />
                    </div>
                  </div>
                  <div class="media-body">
                    <div class="user-name">{{friendInfo.name}}</div>
                    <div class="user-status">online</div>
                  </div>
                </div>
                <div class="chat-options">
                  <a href="javascript:void(0)" @click.prevent="openVoiceCall">
                    <i class="material-icons">local_phone</i>
                  </a>
                  <a href="javascript:void(0)" data-toggle="modal" data-target="#video_call">
                    <i class="material-icons">videocam</i>
                  </a>
                  <a href="javascript:void(0)">
                    <i class="material-icons">more_vert</i>
                  </a>
                </div>
              </div>
              <div class="chat-body">
                <div class="chat-scroll">
                  <ul class="list-unstyled">
                    <li
                      class="media"
                      v-for="(history, index) in histories"
                      :key="`history-${index}`"
                      :class="[{'sent': user._id == history.senderId}, {'received': history.senderId == friendId}]"
                    >
                      <div class="avatar" v-if="history.senderId == friendId">
                        <img
                          :src="getAvatarUrl(friendInfo.avatarUrl)"
                          alt="User Image"
                          class="avatar-img rounded-circle"
                        />
                      </div>
                      <div class="media-body">
                        <div class="msg-box">
                          <div>
                            <p>{{history.content}}</p>
                            <ul class="chat-msg-info">
                              <li>
                                <div class="chat-time">
                                  <span>{{history.time}}</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="chat-footer">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="btn-file btn">
                      <i class="fa fa-paperclip"></i>
                      <input type="file" />
                    </div>
                  </div>
                  <input
                    type="text"
                    class="input-msg-send form-control"
                    placeholder="Type something"
                    v-model="message"
                    v-on:keyup.13="sendMessage"
                  />
                  <div class="input-group-append">
                    <button type="button" class="btn msg-send-btn" @click="sendMessage">
                      <i class="fab fa-telegram-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Chat Right -->
          </div>
        </div>
      </div>
      <!-- /Row -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import { API_URL } from "@/config";
import { AgoraRtmClient } from "@/agora";

export default {
  data() {
    return {
      contacts: [],
      friendId: this.$route.query.friendId,
      friendInfo: {},
      message: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    histories() {
      return this.$store.state.chatHistories;
    }
  },
  mounted() {
    $("body").addClass("chat-page");
    this.loadContacts();
    // this.loadChatHistory();
  },
  destroyed() {
    $("body").removeClass("chat-page");
  },
  methods: {
    async loadContacts() {
      this.$vs.loading();
      const response = await axios.post(API_URL + "users/loadContacts", {
        userId: this.user._id
      });
      this.contacts = response.data.contacts;
      this.$vs.loading.close();
      if (this.friendId != null) {
        this.friendInfo = this.contacts.find(contact => {
          return contact._id == this.friendId;
        });
      }
    },
    getAvatarUrl(url) {
      if (url && url.length > 0) {
        return url;
      }
      var images = require.context("../assets/img", false, /\.jpg$/);
      return images("./default-avatar.jpg");
    },
    async loadChatHistory() {
      const response = await axios.post(API_URL + "chats/getHistory", {
        senderId: this.user._id,
        receiverId: this.friendId
      });
      this.histories = response.data;
      // this.histories = [
      //   {
      //     senderId: "5e8af353e5fdd01a505eb43d",
      //     receiverId: "5e8b11ac32fc534970f4cde5",
      //     content: "Hello. What can I do for you?",
      //     time: "8:30 AM"
      //   },
      //   {
      //     senderId: "5e8b11ac32fc534970f4cde5",
      //     receiverId: "5e8af353e5fdd01a505eb43d",
      //     content:
      //       "I'm just looking around. \n Will you tell me something about your self?",
      //     time: "8:35 AM"
      //   }
      // ];
    },
    async sendMessage() {
      const sendResult = await AgoraRtmClient.sendMessageToPeer(
        {
          text: this.message
        },
        this.friendId
      );
      console.log(sendResult);
      const today = new Date();
      this.$store.commit("addChatHistory", {
        senderId: this.user._id,
        receiverId: this.friendId,
        content: this.message,
        time: today.getHours() + ":" + today.getMinutes()
      });
      this.message = "";
    },
    joinRoom(userId) {
      this.friendId = userId;
      this.friendInfo = this.contacts.find(contact => {
        return contact._id == this.friendId;
      });
    },
    openVoiceCall() {
      const now = new Date();
      const channel = `channel-${now.getTime()}`;
      this.friendInfo["channel"] = channel;

      this.$store.commit("setCallUser", this.friendInfo);
      this.$store.commit("updateCallDialogVisibility", true);

      this.$socket.emit("REQEST_VOICE_CALL", {
        receiverId: this.friendId,
        senderId: this.user._id,
        senderName: this.user.name,
        avatarUrl: this.user.avatarUrl,
        channel: channel
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>