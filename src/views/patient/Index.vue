<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
          <patient-sidebar></patient-sidebar>
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
import PatientSidebar from "./PatientSidebar";
export default {
  directives: { Sticky },
  components: {
    PatientSidebar
  },
  mounted() {
    this.$store.commit("setHeaderItem", "patient-dashboard");
  }
};
</script>

<style lang="scss" scoped>
</style>