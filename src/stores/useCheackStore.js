import { defineStore } from "pinia";
import UserDataService from "@/services/UserDataService";

export const useCheckStore = defineStore("check", {
  state: () => ({}),
  actions: {
    async checkVerificationStatus() {
      try {
        const user_id = localStorage.getItem("user_id");

        if (!user_id) {
          throw new Error("User ID not found in localStorage");
        }

        const response = await UserDataService.postChechStatusVerification(
          user_id
        );

        return response.data;
      } catch (error) {
        console.error("Ошибка проверки статуса:", error);
        throw error;
      }
    },

    handleStatusResponse(status) {
      const statusMap = {
        "На проверке": "expectation-questionnaire",
        "Повторная проверка": "expectation-questionnaire",
        "Отклонена верификация по СБ": "unshaked-questionnaire",
        "Отклонена анкета исполнителя": "unshaked-questionnaire",
        "Отправлен на доработку": "questionnaire",
        Принят: "home",
      };

      const route = statusMap[status];

      if (!route) {
        console.warn("Неизвестный статус:", status);
        return "404";
      }

      return route;
    },
  },
});
