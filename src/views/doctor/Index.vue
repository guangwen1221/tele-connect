<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
          <doctor-sidebar></doctor-sidebar>
        </div>

        <div class="col-md-7 col-lg-8 col-xl-9">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sticky from "vue-sticky-directive";
import DoctorSidebar from "./DoctorSidebar";
export default {
  directives: { Sticky },
  components: {
    DoctorSidebar
  },
  mounted() {
    this.$store.commit("setHeaderItem", "doctor-dashboard");
  }
};
</script>

<style lang="scss" scoped>
</style>