import axios from "axios";
import { defineStore } from "pinia";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useStudentCardStore = defineStore("studentCard", {
  state: () => ({
    studentCard: {},
  }),
  actions: {
    async getStudentCard() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/auth/student-card/`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        );
        this.studentCard = response.data;
      } catch (error) {
        console.error("Ошибка при получении карточки студента:", error);
      }
    },
  },
});
