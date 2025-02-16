import { defineStore } from "pinia";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    data: {
      user: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "заказчик",
        referral_code: "Afdsfsdf23",
      },
      profile: {
        university: null,
        faculty: null,
        department: null,
        disciplines: [null],
        form_of_study: null,
        vk_profile: "@test",
        telegram_username: "@test",
      },
      student_card: {
        photo: "",
      },
    },
  }),
  actions: {
    async register() {
      // Добавляем файл
      const data = {
        user: this.data.user,
        profile: this.data.profile,
        student_card: this.data.student_card.photo,
      };

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/auth/registration/general-info/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.data.user),
          }
        );
        console.log("Данные отправлены:", response);
      } catch (error) {
        console.error("Ошибка отправки:", error);
      }
    },
  },
});
