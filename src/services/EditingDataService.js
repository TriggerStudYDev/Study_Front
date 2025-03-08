import http from "../http-common";

export default {
  getUniversities(id) {
    return http.get(`api/auth/universities/${id}/`);
  },

  getFaculties(id) {
    return http.get(`api/auth/faculties/${id}/`);
  },

  getDepartments(id) {
    return http.get(`api/auth/departments/${id}/`);
  },

  getDisciplines(id) {
    return http.get(`api/auth/discipline/${id}/`);
  },

  getEducationForms(id) {
    return http.get(`api/auth/education-forms/${id}/`);
  },
};
