<template>
  <div class="content">
    <div class="container" v-if="doctor">
      <!-- Doctor Widget -->
      <div class="card">
        <div class="card-body">
          <div class="doctor-widget">
            <div class="doc-info-left">
              <div class="doctor-img">
                <img :src="getDoctorAvatarUrl(doctor.avatarUrl)" class="img-fluid" alt="User Image" />
              </div>
              <div class="doc-info-cont">
                <h4 class="doc-name">Dr. {{doctor.name}}</h4>
                <p class="doc-speciality">{{getEducation(doctor.educations)}}</p>
                <p class="doc-department">
                  <img
                    :src="getSpecialityImage(doctor.speciality)"
                    class="img-fluid"
                    alt="Speciality"
                  />
                  {{capitalizeFLetter(doctor.speciality)}}
                </p>
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
                    v-for="(service, index) in doctor.services"
                    :key="`service-${index}`"
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
                    ${{doctor.price}} per hour
                  </li>
                </ul>
              </div>
              <div class="doctor-action" v-if="isLogin">
                <!-- <a href="javascript:void(0)" class="btn btn-white fav-btn">
                  <i class="far fa-bookmark"></i>
                </a>-->
                <a href="#" @click.prevent="gotoChatRoom" class="btn btn-white msg-btn">
                  <i class="far fa-comment-alt"></i>
                </a>
                <a
                  href="javascript:void(0)"
                  class="btn btn-white call-btn"
                  data-toggle="modal"
                  data-target="#voice_call"
                >
                  <i class="fas fa-phone"></i>
                </a>
                <a
                  href="javascript:void(0)"
                  class="btn btn-white call-btn"
                  data-toggle="modal"
                  data-target="#video_call"
                >
                  <i class="fas fa-video"></i>
                </a>
              </div>
              <div class="clinic-booking">
                <!-- <a class="apt-btn" href="booking.html">Book Appointment</a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Doctor Widget -->

      <!-- Doctor Details Tab -->
      <div class="card">
        <div class="card-body pt-0">
          <!-- Tab Menu -->
          <nav class="user-tabs mb-4">
            <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
              <li class="nav-item">
                <a class="nav-link active" href="#doc_overview" data-toggle="tab">Overview</a>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link" href="#doc_locations" data-toggle="tab">Locations</a>
              </li>-->
              <li class="nav-item">
                <a class="nav-link" href="#doc_reviews" data-toggle="tab">Reviews</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#doc_business_hours" data-toggle="tab">Business Hours</a>
              </li>
            </ul>
          </nav>
          <!-- /Tab Menu -->

          <!-- Tab Content -->
          <div class="tab-content pt-0">
            <!-- Overview Content -->
            <div role="tabpanel" id="doc_overview" class="tab-pane fade show active">
              <div class="row">
                <div class="col-md-12 col-lg-9">
                  <!-- About Details -->
                  <div class="widget about-widget">
                    <h4 class="widget-title">About Me</h4>
                    <p>{{doctor.bio}}</p>
                  </div>
                  <!-- /About Details -->

                  <!-- Education Details -->
                  <div class="widget education-widget">
                    <h4 class="widget-title">Education</h4>
                    <div class="experience-box">
                      <ul class="experience-list">
                        <li
                          v-for="(education, index) in doctor.educations"
                          :key="`education-${index}`"
                        >
                          <div class="experience-user">
                            <div class="before-circle"></div>
                          </div>
                          <div class="experience-content">
                            <div class="timeline-content">
                              <a href="#/" class="name">{{education.college}}</a>
                              <div>{{education.degree}}</div>
                              <span class="time">{{education.year}}</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- /Education Details -->

                  <!-- Experience Details -->
                  <div class="widget experience-widget">
                    <h4 class="widget-title">Work & Experience</h4>
                    <div class="experience-box">
                      <ul class="experience-list">
                        <li
                          v-for="(experience, index) in doctor.experiences"
                          :key="`experience-${index}`"
                        >
                          <div class="experience-user">
                            <div class="before-circle"></div>
                          </div>
                          <div class="experience-content">
                            <div class="timeline-content">
                              <a href="#/" class="name">{{experience.hospital}}</a>
                              <span
                                class="time"
                              >{{experience.from}} - {{experience.to}} ({{experience.to - experience.from}} years)</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- /Experience Details -->

                  <!-- Awards Details -->
                  <div class="widget awards-widget">
                    <h4 class="widget-title">Awards</h4>
                    <div class="experience-box">
                      <ul class="experience-list">
                        <li v-for="(award, index) in doctor.awards" :key="`award-${index}`">
                          <div class="experience-user">
                            <div class="before-circle"></div>
                          </div>
                          <div class="experience-content">
                            <div class="timeline-content">
                              <p class="exp-year">{{award.year}}</p>
                              <h4 class="exp-title">{{award.name}}</h4>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- /Awards Details -->

                  <!-- Services List -->
                  <div class="service-list">
                    <h4>Services</h4>
                    <ul class="clearfix">
                      <li
                        v-for="(service, index) in doctor.services"
                        :key="`service-${index}`"
                      >{{service}}</li>
                    </ul>
                  </div>
                  <!-- /Services List -->

                  <!-- Specializations List -->
                  <div class="service-list">
                    <h4>Specializations</h4>
                    <ul class="clearfix">
                      <li
                        v-for="(specialization, index) in doctor.specializations"
                        :key="`specialization-${index}`"
                      >{{specialization}}</li>
                    </ul>
                  </div>
                  <!-- /Specializations List -->
                </div>
              </div>
            </div>
            <!-- /Overview Content -->

            <!-- Locations Content -->
            <div role="tabpanel" id="doc_locations" class="tab-pane fade">
              <div class="location-list">
                <div class="row">
                  <div class="col-md-6">
                    <div class="clinic-content">
                      <h4 class="clinic-name">
                        <a href="#">Smile Cute Dental Care Center</a>
                      </h4>
                      <p class="doc-speciality">MDS - Periodontology and Oral Implantology, BDS</p>
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">(4)</span>
                      </div>
                      <div class="clinic-details mb-0">
                        <h5 class="clinic-direction">
                          <i class="fas fa-map-marker-alt"></i> 2286 Sundown Lane, Austin, Texas 78749, USA
                          <br />
                          <a href="javascript:void(0);">Get Directions</a>
                        </h5>
                        <ul>
                          <li>
                            <a href="assets/img/features/feature-01.jpg" data-fancybox="gallery2">
                              <img src="assets/img/features/feature-01.jpg" alt="Feature Image" />
                            </a>
                          </li>
                          <li>
                            <a href="assets/img/features/feature-02.jpg" data-fancybox="gallery2">
                              <img src="assets/img/features/feature-02.jpg" alt="Feature Image" />
                            </a>
                          </li>
                          <li>
                            <a href="assets/img/features/feature-03.jpg" data-fancybox="gallery2">
                              <img src="assets/img/features/feature-03.jpg" alt="Feature Image" />
                            </a>
                          </li>
                          <li>
                            <a href="assets/img/features/feature-04.jpg" data-fancybox="gallery2">
                              <img src="assets/img/features/feature-04.jpg" alt="Feature Image" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="clinic-timing">
                      <div>
                        <p class="timings-days">
                          <span>Mon - Sat</span>
                        </p>
                        <p class="timings-times">
                          <span>10:00 AM - 2:00 PM</span>
                          <span>4:00 PM - 9:00 PM</span>
                        </p>
                      </div>
                      <div>
                        <p class="timings-days">
                          <span>Sun</span>
                        </p>
                        <p class="timings-times">
                          <span>10:00 AM - 2:00 PM</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-2">
                    <div class="consult-price">$250</div>
                  </div>
                </div>
              </div>

              <div class="location-list">
                <div class="row">
                  <div class="col-md-6">
                    <div class="clinic-content">
                      <h4 class="clinic-name">
                        <a href="#">The Family Dentistry Clinic</a>
                      </h4>
                      <p class="doc-speciality">MDS - Periodontology and Oral Implantology, BDS</p>
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">(4)</span>
                      </div>
                      <div class="clinic-details mb-0">
                        <p class="clinic-direction">
                          <i class="fas fa-map-marker-alt"></i> 2883 University Street, Seattle, Texas Washington, 98155
                          <br />
                          <a href="javascript:void(0);">Get Directions</a>
                        </p>
                        <ul>
                          <li>
                            <a href="assets/img/features/feature-01.jpg" data-fancybox="gallery2">
                              <img src="assets/img/features/feature-01.jpg" alt="Feature Image" />
                            </a>
                          </li>
                          <li>
                            <a href="assets/img/features/feature-02.jpg" data-fancybox="gallery2">
                              <img src="assets/img/features/feature-02.jpg" alt="Feature Image" />
                            </a>
                          </li>
                          <li>
                            <a href="assets/img/features/feature-03.jpg" data-fancybox="gallery2">
                              <img src="assets/img/features/feature-03.jpg" alt="Feature Image" />
                            </a>
                          </li>
                          <li>
                            <a href="assets/img/features/feature-04.jpg" data-fancybox="gallery2">
                              <img src="assets/img/features/feature-04.jpg" alt="Feature Image" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="clinic-timing">
                      <div>
                        <p class="timings-days">
                          <span>Tue - Fri</span>
                        </p>
                        <p class="timings-times">
                          <span>11:00 AM - 1:00 PM</span>
                          <span>6:00 PM - 11:00 PM</span>
                        </p>
                      </div>
                      <div>
                        <p class="timings-days">
                          <span>Sat - Sun</span>
                        </p>
                        <p class="timings-times">
                          <span>8:00 AM - 10:00 AM</span>
                          <span>3:00 PM - 7:00 PM</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-2">
                    <div class="consult-price">$350</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Locations Content -->

            <!-- Reviews Content -->
            <div role="tabpanel" id="doc_reviews" class="tab-pane fade">
              <!-- Write Review -->
              <div class="write-review">
                <h4>
                  Write a review for
                  <strong>Dr. {{doctor.name}}</strong>
                </h4>

                <!-- Write Review Form -->
                <form>
                  <div class="form-group">
                    <label>Review</label>
                    <div class="star-rating">
                      <input id="star-5" type="radio" name="rating" value="star-5" />
                      <label for="star-5" title="5 stars">
                        <i class="active fa fa-star"></i>
                      </label>
                      <input id="star-4" type="radio" name="rating" value="star-4" />
                      <label for="star-4" title="4 stars">
                        <i class="active fa fa-star"></i>
                      </label>
                      <input id="star-3" type="radio" name="rating" value="star-3" />
                      <label for="star-3" title="3 stars">
                        <i class="active fa fa-star"></i>
                      </label>
                      <input id="star-2" type="radio" name="rating" value="star-2" />
                      <label for="star-2" title="2 stars">
                        <i class="active fa fa-star"></i>
                      </label>
                      <input id="star-1" type="radio" name="rating" value="star-1" />
                      <label for="star-1" title="1 star">
                        <i class="active fa fa-star"></i>
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Title of your review</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="If you could say it in one sentence, what would you say?"
                    />
                  </div>
                  <div class="form-group">
                    <label>Your review</label>
                    <textarea id="review_desc" maxlength="100" class="form-control"></textarea>

                    <div class="d-flex justify-content-between mt-3">
                      <small class="text-muted">
                        <span id="chars">100</span> characters remaining
                      </small>
                    </div>
                  </div>
                  <hr />
                  <div class="form-group">
                    <div class="terms-accept">
                      <div class="custom-checkbox">
                        <input type="checkbox" id="terms_accept" />
                        <label for="terms_accept">
                          I have read and accept
                          <a href="#">Terms &amp; Conditions</a>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="submit-section">
                    <button type="submit" class="btn btn-primary submit-btn">Add Review</button>
                  </div>
                </form>
                <!-- /Write Review Form -->
              </div>
              <!-- /Write Review -->
            </div>
            <!-- /Reviews Content -->

            <!-- Business Hours Content -->
            <div role="tabpanel" id="doc_business_hours" class="tab-pane fade">
              <div class="row">
                <div class="col-md-6 offset-md-3">
                  <!-- Business Hours Widget -->
                  <div class="widget business-widget">
                    <div class="widget-content">
                      <div class="listing-hours">
                        <div class="listing-day current">
                          <div class="day">
                            Today
                            <span>5 Nov 2019</span>
                          </div>
                          <div class="time-items">
                            <span class="open-status">
                              <span class="badge bg-success-light">Open Now</span>
                            </span>
                            <span class="time">07:00 AM - 09:00 PM</span>
                          </div>
                        </div>
                        <div class="listing-day">
                          <div class="day">Monday</div>
                          <div class="time-items">
                            <span class="time">07:00 AM - 09:00 PM</span>
                          </div>
                        </div>
                        <div class="listing-day">
                          <div class="day">Tuesday</div>
                          <div class="time-items">
                            <span class="time">07:00 AM - 09:00 PM</span>
                          </div>
                        </div>
                        <div class="listing-day">
                          <div class="day">Wednesday</div>
                          <div class="time-items">
                            <span class="time">07:00 AM - 09:00 PM</span>
                          </div>
                        </div>
                        <div class="listing-day">
                          <div class="day">Thursday</div>
                          <div class="time-items">
                            <span class="time">07:00 AM - 09:00 PM</span>
                          </div>
                        </div>
                        <div class="listing-day">
                          <div class="day">Friday</div>
                          <div class="time-items">
                            <span class="time">07:00 AM - 09:00 PM</span>
                          </div>
                        </div>
                        <div class="listing-day">
                          <div class="day">Saturday</div>
                          <div class="time-items">
                            <span class="time">07:00 AM - 09:00 PM</span>
                          </div>
                        </div>
                        <div class="listing-day closed">
                          <div class="day">Sunday</div>
                          <div class="time-items">
                            <span class="time">
                              <span class="badge bg-danger-light">Closed</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Business Hours Widget -->
                </div>
              </div>
            </div>
            <!-- /Business Hours Content -->
          </div>
        </div>
      </div>
      <!-- /Doctor Details Tab -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "@/config";
export default {
  data() {
    return {
      id: this.$route.params.id,
      doctor: null,
      isLogin: false
    };
  },
  computed: {},
  mounted() {
    this.loadDoctorProfile();
    const user = localStorage.getItem("user");

    if (user) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    async loadDoctorProfile() {
      this.$vs.loading();
      const response = await axios.get(API_URL + "users/" + this.id);
      this.doctor = response.data;
      this.$vs.loading.close();
    },
    getDoctorAvatarUrl(url) {
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
    },
    async gotoChatRoom() {
      let user = this.$store.state.user;
      if (user.contacts && user.contacts.indexOf(this.id) > -1) {
        // this.$router.push("/chat/" + this.id);
        this.$router.push({
          path: "/chat",
          query: { friendId: this.id }
        });
      } else {
        this.$vs.loading();
        await axios.post(API_URL + "users/addContact", {
          userId: user._id,
          contactId: this.id
        });
        this.$vs.loading.close();
        this.$router.push("/chat/" + this.id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>