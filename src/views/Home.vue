<template>
  <div class="home">
    <!-- Home Banner -->
    <section class="section section-search">
      <div class="container-fluid">
        <div class="banner-wrapper">
          <div class="banner-header text-center">
            <h1>Search Doctor, Make an Appointment</h1>
            <p>Discover the best doctors, clinic & hospital the city nearest to you.</p>
          </div>

          <!-- Search -->
          <div class="search-box">
            <form action="search.html">
              <!-- <div class="form-group search-location">
                <input type="text" class="form-control" placeholder="Search Location" />
              </div>-->

              <div class="form-group search-location">
                <select class="form-control" id="select-speciality">
                  <option value>All</option>
                  <option
                    v-for="(speciality, index) in specialityList"
                    :key="`speciality - ${index}`"
                    :value="speciality"
                  >{{ speciality }}</option>
                </select>
                <span class="form-text">Ex : Type of services you look for</span>
              </div>

              <div class="form-group search-info">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc"
                />
                <span class="form-text">Ex : Dental or Sugar Check up etc</span>
              </div>
              <button
                type="submit"
                class="btn btn-primary search-btn"
                @click.prevent="searchDoctor"
              >
                <i class="fas fa-search"></i>
                <span>Search</span>
              </button>
            </form>
          </div>
          <!-- /Search -->
        </div>
      </div>
    </section>
    <!-- /Home Banner -->

    <section class="section section-features" id="features">
      <div class="container-fluid">
        <div class="section-header text-center">
          <h2>Services and Specialities</h2>

          <p class="sub-title"></p>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-9">
            <!-- Slider -->
            <slick
              class="specialities-slider slider"
              :options="slickOptions"
              v-if="specialityList.length > 0"
            >
              <!-- Slider Item -->
              <div
                class="speicality-item text-center"
                v-for="(speciality, index) in specialityList"
                :key="`speciality-${index}`"
              >
                <div class="speicality-img">
                  <img :src="getImagePath(speciality)" class="img-fluid" alt="Speciality" />
                  <span>
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>{{ speciality }}</p>
              </div>
              <!-- /Slider Item -->
            </slick>
            <!-- /Slider -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
require("select2/dist/js/select2.full.js");
import $ from "jquery";
import Slick from "vue-slick";
export default {
  name: "Home",
  components: { Slick },
  data() {
    return {
      specialityList: [
        "Biochemistry",
        "Cardiology",
        "Dermatology",
        "Diabetes",
        "Gastroenterology",
        "General Surgery",
        "Geriatrics"
      ],
      slickOptions: {
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        variableWidth: true,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              dots: false,
              arrows: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    };
  },
  mounted() {
    $("#select-speciality").select2({
      placeholder: "Select Speciality",
      width: "100%",
      containerCssClass: "form-control"
    });
    this.$store.commit("setHeaderItem", "home");
  },
  methods: {
    getImagePath(name) {
      var images = require.context(
        "../assets/img/specialities/",
        false,
        /\.png$/
      );
      return images("./" + name.toLowerCase() + ".png");
    },
    searchDoctor() {
      this.$router.push("/search");
    }
  }
};
</script>
