import { defineStore } from "pinia";
import AdminDataService from "@/services/AdminDataService";
import EditingDataService from "@/services/EditingDataService";

export const useEditingStore = defineStore("editing", {
  state: () => ({
    profile: {
      first_name: "",
      last_name: "",
      vk_profile: "",
      telegram_username: "",
      course: null,
      form_of_study: null,
      photo: null,
      about_self: "",
      customer_feedback: [],
      portfolio: [],
    },
    university: null,
    faculty: null, // Было faculties
    department: null,
    educationForms: null,
    discipline: null,
    email: "",
    user: {},
    changes: {}, // Объект для накопления изменений
  }),
  actions: {
    async getProfile() {
      try {
        const response = await AdminDataService.getProfile();
        this.user = response.data.results[0] || {};
        this.profile.first_name = this.user.user.first_name;
        this.profile.last_name = this.user.user.last_name;
        this.email = this.user.user.email;
        this.profile.vk_profile = this.user.profile.vk_profile;
        this.profile.telegram_username = this.user.profile.telegram_username;
        this.profile.form_of_study = this.user.profile.form_of_study;
        this.profile.photo = this.user.photo;
        this.profile.about_self = this.user.about_self;
        this.profile.customer_feedback = this.user.customer_feedback;
        this.profile.portfolio = this.user.portfolio;
        console.log("Получен профиль:", this.user);
      } catch (error) {
        console.error("Ошибка загрузки профиля", error);
      }
    },

    async getEducational() {
      try {
        // Добавляем проверки
        if (this.user.profile?.university) {
          const universityResponse = await EditingDataService.getUniversities(
            this.user.profile.university
          );
          this.university = universityResponse.data;
        }

        if (this.user.profile?.faculty) {
          const facultyResponse = await EditingDataService.getFaculties(
            this.user.profile.faculty
          );
          this.faculty = facultyResponse.data; // Исправлено с faculties на faculty
        }

        if (this.user.profile?.department) {
          const departmentResponse = await EditingDataService.getDepartments(
            this.user.profile.department
          );
          this.department = departmentResponse.data;
        }

        if (this.user.profile?.form_of_study) {
          const formOfStudyResponse = await EditingDataService.getFormOfStudies(
            this.user.profile.form_of_study
          );
          this.formOfStudy = formOfStudyResponse.data;
        }
      } catch (error) {
        console.error("Ошибка при загрузке учебных данных:", error);
      }
    },
    // Метод для накопления изменений
    setChanges(newChanges) {
      this.changes = { ...this.changes, ...newChanges };
    },

    // Метод для отправки всех изменений
    async saveChanges() {
      try {
        if (Object.keys(this.changes).length > 0) {
          await EditingDataService.putUpdateProfile(this.changes);
          console.log("Изменения успешно сохранены:", this.changes);
          this.changes = {}; // Очищаем изменения после успешного сохранения
        } else {
          console.log("Нет изменений для сохранения");
        }
      } catch (error) {
        console.error("Ошибка при сохранении изменений:", error);
      }
    },
  },
});
