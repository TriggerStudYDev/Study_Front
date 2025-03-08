// stores/useEditingStore.js
import { defineStore } from "pinia";
import AdminDataService from "@/services/AdminDataService";
import EditingDataService from "@/services/EditingDataService";
import { computed } from "vue";

export const useEditingStore = defineStore("editing", {
  state: () => ({
    profile: {},
    universities: {},
    faculties: {},
    departments: {},
    edicationForms: {},
  }),
  actions: {
    async getEducational() {
      if (this.profile) {
        try {
          const response1 = await EditingDataService.getUniversities(
            this.profile.profile.university
          );
          this.universities = response1.data.name || [];
          const response2 = await EditingDataService.getFaculties(
            this.profile.profile.faculty
          );
          this.faculties = response2.data.name || [];
          const response3 = await EditingDataService.getDepartments(
            this.profile.profile.department
          );
          this.departments = response3.data.name || [];
          const response4 = await EditingDataService.getEducationForms(
            this.profile.profile.form_of_study
          );
          this.edicationForms = response4.data.name || [];
          console.log(
            "Данные университетов:",
            this.universities,
            this.faculties,
            this.departments
          );
        } catch (error) {
          console.error("Ошибка загрузки университетов", error);
        }
      }
    },

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

        // Сравниваем поле about_self
        if (updatedData.about_self !== this.profile.about_self) {
          changes.about_self = updatedData.about_self;
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
              about_self: changes.about_self || this.profile.about_self,
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
