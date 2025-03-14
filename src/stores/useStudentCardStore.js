import { defineStore } from "pinia";
import AdminDataService from "@/services/AdminDataService";

export const useStudentCardStore = defineStore("studentCard", {
  state: () => ({
    studentCard: {},
  }),
  actions: {
    async getStudentCard() {
      try {
        await AdminDataService.getProfile().then((response) => {
          this.studentCard = response.data;
        });
      } catch (error) {
        console.error("Ошибка при получении карточки студента:", error);
      }
    },
  },
});
