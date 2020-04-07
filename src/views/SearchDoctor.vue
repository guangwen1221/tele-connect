d<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar" sticky-container>
          <div v-sticky="true" sticky-offset="stickyOffset">
            <!-- Search Filter -->
            <div class="card search-filter">
              <div class="card-header">
                <h4 class="card-title mb-0">Search Filter</h4>
              </div>
              <div class="card-body">
                <div class="filter-widget">
                  <input type="text" class="form-control" placeholder="Doctor's name" />
                </div>
                <div class="filter-widget">
                  <h4>Gender</h4>
                  <div>
                    <label class="custom_check">
                      <input type="checkbox" name="gender_type" checked />
                      <span class="checkmark"></span> Male Doctor
                    </label>
                  </div>
                  <div>
                    <label class="custom_check">
                      <input type="checkbox" name="gender_type" />
                      <span class="checkmark"></span> Female Doctor
                    </label>
                  </div>
                </div>
                <div class="filter-widget">
                  <h4>Select Service</h4>
                  <div>
                    <label class="custom_check">
                      <input type="checkbox" name="select_specialist" checked />
                      <span class="checkmark"></span> Urology
                    </label>
                  </div>
                  <div>
                    <label class="custom_check">
                      <input type="checkbox" name="select_specialist" checked />
                      <span class="checkmark"></span> Neurology
                    </label>
                  </div>
                  <div>
                    <label class="custom_check">
                      <input type="checkbox" name="select_specialist" />
                      <span class="checkmark"></span> Dentist
                    </label>
                  </div>
                  <div>
                    <label class="custom_check">
                      <input type="checkbox" name="select_specialist" />
                      <span class="checkmark"></span> Orthopedic
                    </label>
                  </div>
                  <div>
                    <label class="custom_check">
                      <input type="checkbox" name="select_specialist" />
                      <span class="checkmark"></span> Cardiologist
                    </label>
                  </div>
                  <div>
                    <label class="custom_check">
                      <input type="checkbox" name="select_specialist" />
                      <span class="checkmark"></span> Cardiologist
                    </label>
                  </div>
                </div>
                <div class="btn-search">
                  <button type="button" class="btn btn-block">Search</button>
                </div>
              </div>
            </div>
            <!-- /Search Filter -->
          </div>
        </div>

        <div class="col-md-12 col-lg-8 col-xl-9">
          <!-- Doctor Widget -->
          <div class="card" v-for="(doctor, index) in doctors" :key="`doctor-${index}`">
            <div class="card-body">
              <div class="doctor-widget">
                <div class="doc-info-left">
                  <div class="doctor-img">
                    <router-link to="/doctor-profile">
                      <img
                        :src="doctorAvatarUrl(doctor.avatarUrl)"
                        class="img-fluid"
                        alt="Doctor Image"
                      />
                    </router-link>
                  </div>
                  <div class="doc-info-cont">
                    <h4 class="doc-name">
                      <router-link to="/doctor-profile">Dr. {{doctor.name}}</router-link>
                    </h4>
                    <p class="doc-speciality">{{getEducation(doctor.educations)}}</p>
                    <h5 class="doc-department">
                      <img
                        :src="getSpecialityImage(doctor.speciality)"
                        class="img-fluid"
                        alt="Speciality"
                      />
                      {{capitalizeFLetter(doctor.speciality)}}
                    </h5>
                    <div class="rating">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <span class="d-inline-block average-rating">(0)</span>
                    </div>
                    <div class="clinic-details">
                      <p class="doc-location">
                        <i class="fas fa-map-marker-alt"></i>
                        {{doctor.state}}, {{doctor.country}}
                      </p>
                      <ul class="clinic-gallery"></ul>
                    </div>
                    <div class="clinic-services">
                      <span
                        v-for="(service, index1) in doctor.services"
                        :key="`doctor${index}-service-${index1}`"
                      >{{service}}</span>
                    </div>
                  </div>
                </div>
                <div class="doc-info-right">
                  <div class="clini-infos">
                    <ul>
                      <li>
                        <i class="far fa-thumbs-up"></i> 100%
                      </li>
                      <li>
                        <i class="far fa-comment"></i> 0 Feedback
                      </li>
                      <li>
                        <i class="fas fa-map-marker-alt"></i>
                        {{doctor.state}}, {{doctor.country}}
                      </li>
                      <li>
                        <i class="far fa-money-bill-alt"></i>
                        ${{doctor.price}}
                        <i
                          class="fas fa-info-circle"
                          data-toggle="tooltip"
                          title="Per hour"
                        ></i>
                      </li>
                    </ul>
                  </div>
                  <div class="clinic-booking">
                    <router-link :to="`/doctor_profile/${doctor._id}`">View Profile</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Doctor Widget -->
          <div class="load-more text-center">
            <!-- <a class="btn btn-primary btn-sm" href="javascript:void(0);">Load More</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
import Sticky from "vue-sticky-directive";
import axios from "axios";
import { API_URL } from "@/config";
export default {
  data() {
    return {
      stickyOffset: {
        top: 30
      },
      doctors: []
    };
  },
  directives: { Sticky },
  mounted() {
    this.findDoctor();
  },
  methods: {
    async findDoctor() {
      this.$vs.loading();
      const response = await axios.post(API_URL + "users/search-doctor", {});
      this.doctors = response.data;
      console.log(this.doctors);
      this.$vs.loading.close();
    },
    doctorAvatarUrl(url) {
      if (url && url.length > 0) {
        return url;
      }
      var images = require.context("../assets/img", false, /\.jpg$/);
      return images("./default-avatar.jpg");
    },
    getEducation(educations) {
      if (educations && educations.length > 0) {
        const education = educations[0];
        return `${education.degree} - ${education.college}`;
      }
      return "";
    },
    capitalizeFLetter(speciality) {
      if (speciality && speciality.length > 0) {
        return speciality[0].toUpperCase() + speciality.slice(1);
      }
      return "";
    },
    getSpecialityImage(speciality) {
      if (speciality && speciality.length > 0) {
        var images = require.context(
          "../assets/img/specialities",
          false,
          /\.png$/
        );
        return images(`./${speciality}.png`);
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>