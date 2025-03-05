import { defineStore } from "pinia";
import UserDataService from "@/services/UserDataService";

export const useCheckStore = defineStore("check", {
  state: () => ({}),
  actions: {
    async checkVerificationStatus() {
      try {
        const user_id = localStorage.getItem("user_id");
        await UserDataService.chechStatusVerification(user_id).then(
          (response) => {
            this.handleStatusResponse(response);
            return response.data;
          }
        );
      } catch (error) {
        console.log(error);
        if (!user_id) {
          console.error("User ID not found in localStorage");
          throw new Error("Требуется повторная авторизация");
        }
      }
    },

    async handleStatusResponse(response) {
      const statusMap = {
        "На проверке": "sending-questionnaire",
        "Повторная проверка": "sending-questionnaire",
        "Отклонена верификация по СБ": "unshaked-questionnaire",
        "Отклонена анкета исполнителя": "unshaked-questionnaire",
        "Отправлен на доработку": "questionnaire",
      };

      return statusMap[response.status] || "404";
    },
  },
});
