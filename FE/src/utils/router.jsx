export const ROUTERS = {
  USER: {
    HOME: "/",
    LOGIN: "/login",
    OAUTH2_REDIRECT: "/oauth2/redirect",
    PROFILE: "/profile",
    REGISTER: "/registerstudy",
    TIMETABLE: "/timetable",
    ANNOUNCEMENT: "/announcement",
    TRAINING_PROGRAM: "/training-program",
    PAY_TUITION: "/pay-tuition",
    SCORE: "/score",
    EXPECTEDSUBJECT: "expected-subject",
    SUCCESSFULPAYMENT: "/payment-success",
    PAYMENTFAILED: "/payment-failed",
  },

  LECTURER: {
    TIMETABLE: "/lecturer/timetable",
    MY_CLASS: "/lecturer/my-class",
    PROFILE: "/lecturer/profile",
  },

  DEAN: {
    PROFILE: "/dean/profile",
    ARRANGECLASSSCHEDULE: "/dean/arrange-class-schedule",
  },

  DEPARTMENTHEAD: {
    PROFILE: "/department-head/profile",
    ASSIGNINSTRUCTORS: "/department-head/assign-instructors",
  },

  ADMIN: {
    PROFILE: "/admin/profile",
    SUBJECTMANAGEMENT: "/admin/subject-management",
    SEMESTERCONFIGURATION: "/admin/semester-configuration",
    USERMANAGEMENT: "/admin/user-management",
    TRAININGPROGRAMMANAGEMENT: "/admin/training-program-management",
    PROGRAMDEFAULTMANAGEMENT: "/admin/program-default-management",
    SCOREMANAGEMENT: "/admin/score-management",
    MAJORMANAGEMENT: "/admin/major-management",
    COHORTMANAGEMENT: "/admin/cohort-management",
    EXPECTEDSEMESTER: "/admin/expected-semester",
    PAYTUITIONMANAGEMENT: "/admin/pay-tuition-management",
    
  }
};
