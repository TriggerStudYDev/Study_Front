import { defineStore } from "pinia";
import AdminDataService from "@/services/AdminDataService";

export const useUserProfileStore = defineStore("userProfile", {
  state: () => ({
    profile: null,
  }),
  actions: {
    async getProfile() {
      try {
        await AdminDataService.getProfile().then((response) => {
          this.profile = response.data.results;
        });
      } catch (error) {
        console.error("Ошибка загрузки профиля", error);
      }
    },
  },
});
