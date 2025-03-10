import http from "../http-common";

export default {
  getProfile() {
    return http.get("api/auth/student-card/");
  },

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

  postQuestionnaireAccepted(id, student_card_number, status) {
    return http.post(`api/auth/student-card-verification/${id}/`, {
      student_card_number: student_card_number,
      status: status,
    });
  },

  postQuestionnaireRefusal(id, comment, status) {
    return http.post(`api/auth/student-card-verification/${id}/`, {
      comment: comment,
      status: status,
    });
  },
};
