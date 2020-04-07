import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/search',
    component: () => import('../views/SearchDoctor.vue')
  },
  {
    path: "/login",
    component: () => import('../views/Login.vue')
  },
  {
    path: "/forgot-password",
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: "/register-patient",
    component: () => import("../views/RegisterPatient.vue")
  },
  {
    path: "/register-doctor",
    component: () => import('../views/RegisterDoctor.vue')
  },
  {
    path: "/doctor_profile/:id",
    component: () => import('../views/DoctorProfile.vue')
  },
  {
    path: "/chat",
    component: () => import('../views/Chat.vue')
  },
  {
    path: "/patient",
    component: () => import("../views/patient/Index.vue"),
    children: [
      {
        path: '/patient-settings',
        component: () => import('../views/patient/PatientSetting.vue')
      }
    ]
  },
  {
    path: "/doctor",
    component: () => import("../views/doctor/Index.vue"),
    children: [
      {
        path: "/doctor-settings",
        component: () => import('../views/doctor/DoctorSetting.vue')
      }
    ]
  },
  {
    path: "/voice-call",
    component: () => import("../views/VoiceCall.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
