// import axios from "axios";
import http from "../http-common";

export default {
  postLogin(user) {
    return http.post("api/auth/login/", user);
  },

  postRegister(user) {
    return http.post("api/auth/register/", user);
  },

  getReferral_code(user) {
    return http.get(`api/auth/referral-check/?referral_code=${user}`);
  },

  postPhoto(user) {
    return http.post("api/auth/registration/education-info/", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  postReviews(user) {
    return http.post("api/auth/registration/customer-feedback-info/", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  postPortfolio(user) {
    return http.post("api/auth/registration/portfolio-info/", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getUniversities() {
    return http.get("api/auth/universities/");
  },

  getFaculties(universityId) {
    return http.get(`api/auth/faculties/?university_id=${universityId}`);
  },

  getDepartments(facultyId) {
    return http.get(`api/auth/departments/?faculty_id=${facultyId}`);
  },

  getEducationForms(departmentId) {
    return http.get(`api/auth/education-forms/?department_id=${departmentId}`);
  },

  getDisciplines(educationFormId) {
    return http.get(`api/auth/discipline/?department_id=${educationFormId}`);
  },

  postChechStatusVerification(userId) {
    return http.post("/api/auth/status-verification-check/", {
      user_id: userId,
    });
  },
};
