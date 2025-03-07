// stores/useEditingStore.js
import { defineStore } from "pinia";
import AdminDataService from "@/services/AdminDataService";

export const useEditingStore = defineStore("editing", {
  state: () => ({
    profile: {}, // Исходные данные профиля
  }),
  actions: {
    async getEding() {
      try {
        const response = await AdminDataService.getProfile();
        this.profile = response.data.results[0];
        console.log("Данные профиля:", this.profile);
      } catch (error) {
        console.error("Ошибка загрузки профиля", error);
      }
    },

    async updateProfile(updatedData) {
      try {
        // Сравниваем исходные данные с измененными
        const changes = {};

        // Сравниваем поля из user
        if (updatedData.first_name !== this.profile.user.first_name) {
          changes.first_name = updatedData.first_name;
        }
        if (updatedData.last_name !== this.profile.user.last_name) {
          changes.last_name = updatedData.last_name;
        }
        if (updatedData.email !== this.profile.user.email) {
          changes.email = updatedData.email;
        }

        // Сравниваем поля из profile
        if (updatedData.vk_profile !== this.profile.profile.vk_profile) {
          changes.vk_profile = updatedData.vk_profile;
        }
        if (
          updatedData.telegram_username !==
          this.profile.profile.telegram_username
        ) {
          changes.telegram_username = updatedData.telegram_username;
        }

        if (Object.keys(changes).length > 0) {
          const response = await AdminDataService.putUpdateProfile(changes);
          this.profile = {
            ...this.profile,
            user: {
              ...this.profile.user,
              first_name: changes.first_name || this.profile.user.first_name,
              last_name: changes.last_name || this.profile.user.last_name,
              email: changes.email || this.profile.user.email,
            },
            profile: {
              ...this.profile.profile,
              vk_profile: changes.vk_profile || this.profile.profile.vk_profile,
              telegram_username:
                changes.telegram_username ||
                this.profile.profile.telegram_username,
            },
          };
          console.log("Изменения сохранены:", response.data);
        } else {
          console.log("Нет изменений для сохранения");
        }
      } catch (error) {
        console.error("Ошибка при обновлении профиля:", error);
        throw error;
      }
    },
  },
});
