import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import userDataService from "@/services/UserDataService";
import { useCheckStore } from "./useCheackStore";
import router from "@/app/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    userRole: null,
    userId: null,
    profileId: null,
    isRegistered: false,
    selectedDepartment: null,
    verificationStatus: null,
    data: {
      user: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "исполнитель",
      },
      referrer_code: "",
      profile: {
        university: null,
        faculty: null,
        department: null,
        disciplines: [],
        form_of_study: null,
        vk_profile: "",
        telegram_username: "",
      },
      student_card: {
        photo: null,
        about_self: "",
      },
      reviews: [],
      portfolio: [],
    },
  }),
  actions: {
    async referralCode() {
      const route = useRoute();
      const referralCode = route.query.referral_code;
      if (referralCode) {
        await userDataService
          .getReferral_code(referralCode)
          .then((response) => {
            if (response.status === 200) {
              this.data.referrer_code = referralCode;
            }
          });
      }
    },

    async register() {
      try {
        await userDataService.postRegister(this.data).then((response) => {
          this.isRegistered = true;
          this.userId = response.data.user_id;
          this.profileId = response.data.profile_id;
          localStorage.setItem("user_id", this.userId);
          router.push({ name: "sending-questionnaire" });
          console.log(response);
        });
      } catch (error) {
        console.error("Ошибка регистрации:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    },

    async initializeMockData() {
      const savedData = sessionStorage.getItem("mockVerification");
      if (savedData) {
        const { userId, status, count } = JSON.parse(savedData);
        this.userId = userId;
        this.verificationStatus = status;
        this.verificationCheckCount = count;
      }
    },

    async postPhoto() {
      if (!this.userId || !this.profileId) {
        throw new Error("User ID или Profile ID отсутствуют");
      }

      const formData = new FormData();
      formData.append("user", this.userId);
      formData.append("profile", this.profileId);
      formData.append("photo", this.data.student_card.photo);
      formData.append("about_self", this.data.student_card.about_self);

      try {
        await userDataService.postPhoto(formData);
      } catch (error) {
        console.error("Ошибка загрузки фото:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    },

    async uploadUpdate() {
      try {
        // Для отзывов
        const reviewsFormData = new FormData();
        reviewsFormData.append("user", this.userId);
        reviewsFormData.append("profile", this.profileId);
        this.data.reviews.forEach((file, index) => {
          reviewsFormData.append(`reviews`, file); // Ключ должен соответствовать ожиданиям сервера
        });

        // Для портфолио
        const portfolioFormData = new FormData();
        portfolioFormData.append("user", this.userId);
        portfolioFormData.append("profile", this.profileId);
        this.data.portfolio.forEach((file, index) => {
          portfolioFormData.append(`portfolio`, file); // Ключ должен соответствовать ожиданиям сервера
        });

        // Отправляем отдельные запросы для отзывов и портфолио
        await userDataService.uploadFile(reviewsFormData);
        await userDataService.uploadFile(portfolioFormData);

        console.log("Все файлы успешно отправлены");
      } catch (error) {
        console.error("Ошибка загрузки файлов:", error);
        throw error;
      }
    },
    async login() {
      const data = {
        username: this.data.user.username,
        password: this.data.user.password,
      };

      try {
        const response = await userDataService.postLogin(data);

        sessionStorage.setItem("access_token", response.data.access_token);
        sessionStorage.setItem("user", response.data.user.role);
        localStorage.setItem("user_id", response.data.user.id);

        this.isAuth = true;
        this.userRole = response.data.user.role;

        if (response.data.user.is_start_auth) {
          await router.push({ name: "success-questionnaire" });
          return { success: true };
        }
        const checkStore = useCheckStore();
        const statusData = await checkStore.checkVerificationStatus();
        const routeName = checkStore.handleStatusResponse(statusData.status);
        await router.push({ name: routeName });
        return { success: true };
      } catch (error) {
        console.error("Ошибка авторизации:", error);
        this.resetAuthState();
        sessionStorage.clear();
        throw error;
      }
    },

    checkAuth() {
      const token = sessionStorage.getItem("access_token");
      const role = sessionStorage.getItem("user");
      this.userRole = role;
      this.isAuth = !!token;
      return this.isAuth;
    },

    logout() {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("user");
      localStorage.removeItem("user_id");
      this.userRole = null;
      this.isAuth = false;
      router.push({ name: "login" });
    },

    resetRegistration() {
      this.isRegistered = false;
      this.userId = null;
      this.profileId = null;
    },

    resetAuthState() {
      this.isAuth = false;
      this.userRole = null;
      this.verificationStatus = null;
    },

    setStudentCardPhoto(file) {
      this.data.student_card.photo = file;
    },

    setSelectedDepartment(department) {
      this.selectedDepartment = department;
    },
  },
});
