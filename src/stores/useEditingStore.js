// stores/useEditingStore.js
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
      email: "",
      university: null,
      faculty: null,
      department: null,
      form_of_study: null,
      discipline: null,
    },
    initialProfile: {},
    university: null,
    faculty: null,
    department: null,
    educationForms: null,
    discipline: null,

    user: {},
    changes: {},
  }),
  actions: {
    async getProfile() {
      try {
        const response = await AdminDataService.getProfile();
        this.user = response.data.results[0] || {};

        // Инициализация профиля
        this.profile = {
          first_name: this.user.user?.first_name || "",
          last_name: this.user.user?.last_name || "",
          vk_profile: this.user.profile?.vk_profile || "",
          telegram_username: this.user.profile?.telegram_username || "",
          email: this.user.user?.email || "",
          course: this.user.profile?.course || null,
          form_of_study: this.user.profile?.form_of_study || null,
          photo: this.user?.photo || null,
          about_self: this.user?.about_self || "",
          customer_feedback: this.user?.customer_feedback || [],
          portfolio: this.user?.portfolio || [],
          university: this.user.profile?.university || null,
          faculty: this.user.profile?.faculty || null,
          department: this.user.profile?.department || null,
          form_of_study: this.user.profile?.form_of_study || null,
          discipline: this.user.profile?.discipline || null,
        };
        // Сохраняем исходные данные
        this.initialProfile = { ...this.profile };
        console.log("Получен профиль:", this.user);
      } catch (error) {
        console.error("Ошибка загрузки профиля", error);
      }
    },

    async getEducational() {
      try {
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
          this.faculty = facultyResponse.data;
        }

        if (this.user.profile?.department) {
          const departmentResponse = await EditingDataService.getDepartments(
            this.user.profile.department
          );
          this.department = departmentResponse.data;
        }

        if (this.user.profile?.disciplines) {
          const disciplinesResponse = await EditingDataService.getDisciplines(
            this.user.profile.disciplines
          );
          this.discipline = disciplinesResponse.data;
        }
      } catch (error) {
        console.error("Ошибка при загрузке учебных данных:", error);
      }
    },

    // Метод для получения измененных полей
    getChangedFields() {
      const changes = {};
      for (const key in this.profile) {
        if (this.profile[key] !== this.initialProfile[key]) {
          changes[key] = this.profile[key];
          console.log(
            "Изменено поле:",
            key,
            "Новое значение:",
            this.profile[key]
          );
        }
      }
      return changes;
    },

    setChanges(newChanges) {
      this.profile = { ...this.profile, ...newChanges };
    },

    async saveChanges() {
      const changes = this.getChangedFields();
      if (Object.keys(changes).length > 0) {
        try {
          await EditingDataService.putUpdateProfile(changes);
          console.log("Изменения успешно сохранены:", changes);
          this.initialProfile = { ...this.profile };
        } catch (error) {
          console.error("Ошибка при сохранении изменений:", error);
        }
      } else {
        console.log("Нет изменений для сохранения");
      }
    },
  },
});
