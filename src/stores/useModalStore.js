import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    activeSocial: null,
    socialData: {},
  }),
  actions: {
    openModal(socialType) {
      this.activeSocial = socialType;
    },
    closeModal() {
      this.activeSocial = null;
    },
    setSocialData(data) {
      this.socialData = { ...this.socialData, ...data };
    },
  },
});
