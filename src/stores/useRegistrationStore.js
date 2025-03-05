import { defineStore } from "pinia";

export const useRegistrationStore = defineStore("registration", {
  state: () => ({
    selectedUniversity: null,
    selectedFaculuty: null,
    selectedDepartment: null,
    selectedEducationForm: null,
    selectedCourse: null,
    vkProfile: null,
    telegramUsername: null,
  }),
  actions: {
    setSelectedUniversity(id) {
      this.selectedUniversity = id;
    },
    setSelectedFaculuty(id) {
      this.selectedFaculuty = id;
    },
    setSelectedDepartment(id) {
      this.selectedDepartment = id;
    },
    setSelectedEducationForm(id) {
      this.selectedEducationForm = id;
    },
    setSelectedCourse(id) {
      this.selectedCourse = id;
    },
    setVkProfile(id) {
      this.vkProfile = id;
    },
    setTelegramUsername(id) {
      this.telegramUsername = id;
    },
  },
});
