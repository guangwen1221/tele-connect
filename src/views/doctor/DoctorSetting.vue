<template>
  <div>
    <!-- Basic Information -->
    <div class="card" v-if="user">
      <div class="card-body">
        <h4 class="card-title">Basic Information</h4>
        <div class="row form-row">
          <div class="col-md-12">
            <div class="form-group">
              <div class="change-avatar">
                <div class="profile-img">
                  <img :src="avatarUrl" alt="Doctor Image" />
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
          <div class="col-md-6">
            <div class="form-group">
              <label>
                Email
                <span class="text-danger">*</span>
              </label>
              <input type="email" class="form-control" readonly v-model="user.email" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-0">
              <label>Date of Birth</label>
              <datepicker class="datepicker" v-model="user.birthday"></datepicker>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>
                First Name
                <span class="text-danger">*</span>
              </label>
              <input type="text" class="form-control" v-model="firstName" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>
                Last Name
                <span class="text-danger">*</span>
              </label>
              <input type="text" class="form-control" v-model="lastName" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Phone Number</label>
              <input type="text" class="form-control" v-model="user.mobile" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Gender</label>
              <select class="form-control select" v-model="user.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Basic Information -->

    <!-- About Me -->
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">About Me</h4>
        <div class="form-group mb-0">
          <div class="form-group">
            <label>Speciality</label>
            <select class="form-control select" v-model="user.speciality">
              <option value="dentist">Dentist</option>
            </select>
          </div>
          <label>Biography</label>
          <textarea class="form-control" rows="5" v-model="user.bio"></textarea>
        </div>
      </div>
    </div>
    <!-- /About Me -->

    <!-- Clinic Info -->
    <!-- <div class="card">
      <div class="card-body">
        <h4 class="card-title">Clinic Info</h4>
        <div class="row form-row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Clinic Name</label>
              <input type="text" class="form-control" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Clinic Address</label>
              <input type="text" class="form-control" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label>Clinic Images</label>
              <form action="#" class="dropzone"></form>
            </div>
            <div class="upload-wrap">
              <div class="upload-images">
                <img src="assets/img/features/feature-01.jpg" alt="Upload Image" />
                <a href="javascript:void(0);" class="btn btn-icon btn-danger btn-sm">
                  <i class="far fa-trash-alt"></i>
                </a>
              </div>
              <div class="upload-images">
                <img src="assets/img/features/feature-02.jpg" alt="Upload Image" />
                <a href="javascript:void(0);" class="btn btn-icon btn-danger btn-sm">
                  <i class="far fa-trash-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <!-- /Clinic Info -->

    <!-- Contact Details -->
    <div class="card contact-card">
      <div class="card-body">
        <h4 class="card-title">Contact Details</h4>
        <div class="row form-row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Address Line 1</label>
              <input type="text" class="form-control" v-model="user.address1" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Address Line 2</label>
              <input type="text" class="form-control" v-model="user.address2" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">City</label>
              <input type="text" class="form-control" v-model="user.city" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">State / Province</label>
              <input type="text" class="form-control" v-model="user.state" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Country</label>
              <input type="text" class="form-control" v-model="user.country" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Postal Code</label>
              <input type="text" class="form-control" v-model="user.postalCode" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Contact Details -->

    <!-- Pricing -->
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Pricing</h4>

        <div class="form-group mb-0">
          <div id="pricing_select">
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="price_free"
                name="rating_option"
                class="custom-control-input"
                value="price_free"
                :checked="user.price==0"
                @click="showCustomPrice=false"
              />
              <label class="custom-control-label" for="price_free">Free</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="price_custom"
                name="rating_option"
                value="custom_price"
                class="custom-control-input"
                :checked="user.price>0"
                @click="showCustomPrice=true"
              />
              <label class="custom-control-label" for="price_custom">Custom Price (per hour)</label>
            </div>
          </div>
        </div>

        <div class="row custom_price_cont" id="custom_price_cont" v-if="showCustomPrice">
          <div class="col-md-4">
            <input
              type="number"
              class="form-control"
              id="custom_rating_input"
              name="custom_rating_count"
              v-model="user.price"
              placeholder="20"
            />
            <small class="form-text text-muted">Custom price you can add</small>
          </div>
        </div>
      </div>
    </div>
    <!-- /Pricing -->

    <!-- Services and Specialization -->
    <div class="card services-card">
      <div class="card-body">
        <h4 class="card-title">Services and Specialization</h4>
        <div class="form-group">
          <label>Services</label>
          <input-tag v-model="user.services"></input-tag>
          <small class="form-text text-muted">Note : Type & Press enter to add new services</small>
        </div>
        <div class="form-group mb-0">
          <label>Specialization</label>
          <input-tag v-model="user.specializations"></input-tag>
          <small class="form-text text-muted">Note : Type & Press enter to add new specialization</small>
        </div>
      </div>
    </div>
    <!-- /Services and Specialization -->

    <!-- Education -->
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Education</h4>
        <div class="education-info">
          <div
            class="row form-row education-cont"
            v-for="(education, index) in educations"
            :key="`education-${index}`"
          >
            <div class="col-12 col-md-10 col-lg-11">
              <div class="row form-row">
                <div class="col-12 col-md-6 col-lg-4">
                  <div class="form-group">
                    <label>Degree</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Ex. BDS"
                      v-model="education.degree"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                  <div class="form-group">
                    <label>College/Institute</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Ex. Medical University"
                      v-model="education.college"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                  <div class="form-group">
                    <label>Year of Completion</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Ex. 1998-2003"
                      v-model="education.year"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 col-lg-1">
              <label class="d-md-block d-sm-none d-none" v-html="'&nbsp;'"></label>
              <a
                href="javascript:void(0);"
                class="btn btn-danger trash"
                @click="removeEducation(index)"
              >
                <i class="far fa-trash-alt"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="add-more">
          <a href="javascript:void(0);" class="add-education" @click="addEmptyEducation">
            <i class="fa fa-plus-circle"></i> Add More
          </a>
        </div>
      </div>
    </div>
    <!-- /Education -->

    <!-- Experience -->
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Experience</h4>
        <div class="experience-info">
          <div
            class="row form-row experience-cont"
            v-for="(experience, index) in experiences"
            :key="`experience-${index}`"
          >
            <div class="col-12 col-md-10 col-lg-11">
              <div class="row form-row">
                <div class="col-12 col-md-6 col-lg-4">
                  <div class="form-group">
                    <label>Hospital Name</label>
                    <input type="text" class="form-control" v-model="experience.hospital" />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                  <div class="form-group">
                    <label>From</label>
                    <input type="number" class="form-control" v-model="experience.from" />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                  <div class="form-group">
                    <label>To</label>
                    <input type="number" class="form-control" v-model="experience.to" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 col-lg-1">
              <label class="d-md-block d-sm-none d-none" v-html="'&nbsp;'"></label>
              <a
                href="javascript:void(0);"
                class="btn btn-danger trash"
                @click="removeExperience(index)"
              >
                <i class="far fa-trash-alt"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="add-more">
          <a href="javascript:void(0);" class="add-experience" @click="addEmptyExperience">
            <i class="fa fa-plus-circle"></i> Add More
          </a>
        </div>
      </div>
    </div>
    <!-- /Experience -->

    <!-- Awards -->
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Awards</h4>
        <div class="awards-info">
          <div
            class="row form-row awards-cont"
            v-for="(award, index) in awards"
            :key="`award-${index}`"
          >
            <div class="col-12 col-md-5">
              <div class="form-group">
                <label>Awards</label>
                <input type="text" class="form-control" v-model="award.name" />
              </div>
            </div>
            <div class="col-12 col-md-5">
              <div class="form-group">
                <label>Year</label>
                <input type="number" class="form-control" v-model="award.year" />
              </div>
            </div>
            <div class="col-12 col-md-2 col-lg-1">
              <label class="d-md-block d-sm-none d-none" v-html="'&nbsp;'"></label>
              <a
                href="javascript:void(0);"
                class="btn btn-danger trash"
                @click="removeAward(index)"
              >
                <i class="far fa-trash-alt"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="add-more">
          <a href="javascript:void(0);" class="add-award" @click="addEmptyAward">
            <i class="fa fa-plus-circle"></i> Add More
          </a>
        </div>
      </div>
    </div>
    <!-- /Awards -->

    <!-- Memberships -->
    <!-- <div class="card">
      <div class="card-body">
        <h4 class="card-title">Memberships</h4>
        <div class="membership-info">
          <div class="row form-row membership-cont">
            <div class="col-12 col-md-10 col-lg-5">
              <div class="form-group">
                <label>Memberships</label>
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div class="add-more">
          <a href="javascript:void(0);" class="add-membership">
            <i class="fa fa-plus-circle"></i> Add More
          </a>
        </div>
      </div>
    </div>-->
    <!-- /Memberships -->

    <!-- Registrations -->
    <!-- <div class="card">
      <div class="card-body">
        <h4 class="card-title">Registrations</h4>
        <div class="registrations-info">
          <div class="row form-row reg-cont">
            <div class="col-12 col-md-5">
              <div class="form-group">
                <label>Registrations</label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-12 col-md-5">
              <div class="form-group">
                <label>Year</label>
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div class="add-more">
          <a href="javascript:void(0);" class="add-reg">
            <i class="fa fa-plus-circle"></i> Add More
          </a>
        </div>
      </div>
    </div>-->
    <!-- /Registrations -->

    <div class="submit-section submit-btn-bottom">
      <button
        type="submit"
        class="btn btn-primary submit-btn"
        @click.prevent="saveProfile"
      >Save Changes</button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Datepicker from "vuejs-datepicker";
import { storage } from "@/firebase";
import axios from "axios";
import { API_URL } from "@/config";
import InputTag from "vue-input-tag";
export default {
  data() {
    return {
      avatarUrl: "",
      showCustomPrice: false,
      educations: [],
      experiences: [],
      awards: []
    };
  },
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
    Datepicker,
    InputTag
  },
  mounted() {
    setTimeout(() => {
      $(".datepicker input").addClass("form-control");
    }, 100);
    this.$store.commit("setSidebarItem", "doctor-settings");

    if (this.user && this.user.avatarUrl) {
      this.avatarUrl = this.user.avatarUrl;
    } else {
      var images = require.context("../../assets/img", false, /\.jpg$/);
      this.avatarUrl = images("./default-avatar.jpg");
    }

    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "/assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js"
    );
    document.head.appendChild(recaptchaScript);

    if (this.user.price > 0) {
      this.showCustomPrice = true;
    } else {
      this.showCustomPrice = false;
    }

    if (this.user.educations) {
      this.educations = this.user.educations;
    }
    if (this.user.experiences) {
      this.experiences = this.user.experiences;
    }
    if (this.user.awards) {
      this.awards = this.user.awards;
    }
  },
  methods: {
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
    },
    async saveProfile() {
      this.user.educations = this.educations;
      this.user.experiences = this.experiences;
      this.user.awards = this.awards;

      localStorage.setItem("user", JSON.stringify(this.user));
      this.$store.commit("setUserInfo", this.user);
      this.$vs.loading();
      await axios.post(API_URL + "users/update", this.user);
      this.$vs.loading.close();
    },
    addEmptyEducation() {
      this.educations.push({
        degree: "",
        college: "",
        year: ""
      });
    },
    removeEducation(index) {
      let newList = [];
      for (var i = 0; i < this.educations.length; i++) {
        if (i != index) {
          newList.push(this.educations[i]);
        }
      }
      this.educations = newList;
    },
    removeExperience(index) {
      let newList = [];
      for (var i = 0; i < this.experiences.length; i++) {
        if (i != index) {
          newList.push(this.experiences[i]);
        }
      }
      this.experiences = newList;
    },
    addEmptyExperience() {
      this.experiences.push({
        hospital: "",
        from: "",
        to: ""
      });
    },
    addEmptyAward() {
      this.awards.push({
        name: "",
        year: ""
      });
    },
    removeAward(index) {
      let newList = [];
      for (var i = 0; i < this.awards.length; i++) {
        if (i != index) {
          newList.push(this.awards[i]);
        }
      }
      this.awards = newList;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>