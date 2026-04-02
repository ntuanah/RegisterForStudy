import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import ProtectedRoute from "./utils/ProtectedRoute"; 
import MasterLayout from "./pages/users/theme/masterLayout";
import MasterLayoutLecturer from "./pages/lecturer/theme/masterLayoutLecturer";
import MasterLayoutDean from "./pages/dean/theme/masterLayoutDean";
import MasterLayoutDepartmentHead from "./pages/departmentHead/theme/masterLayoutDepartmentHead";
import MasterLayoutAdmin from "./pages/admin/theme/masterLayoutAdmin";
import HomePage from "./pages/users/homePage";
import LoginPage from "./pages/users/loginPage";
import ProfilePage from "./pages/users/profilePage";
import RegisterStudyPage from "./pages/users/registerStudyPage";
import TimetablePage from "./pages/users/timetablePage";
import TrainingProgramPage from "./pages/users/trainingProgram";
import AnnouncementPage from "./pages/users/AnnouncementPage";
import PayTuitionPage from "./pages/users/payTuitionPage";
import ScorePage from "./pages/users/scorePage";
import MyClassPage from "./pages/lecturer/myClassPage";
import TimetableLecturerPage from "./pages/lecturer/timetableLecturerPage";
import ProfileLecturerPage from "./pages/lecturer/profileLecturerPage";
import ProfileDeanPage from "./pages/dean/profileDeanPage";
import ArrangeClassSchedulePage from "./pages/dean/ArrangeClassSchedulePage";
import ProfileDepartmentHeadPage from "./pages/departmentHead/profileDepartmentHeadPage";
import AssignInstructorsPage from "./pages/departmentHead/ assignInstructorsPage";
import ProfileAdminPage from "./pages/admin/profileAdminPage";
import SubjectManagementPage from "./pages/admin/subjectManagementPage";
import SemesterConfigurationPage from "./pages/admin/semesterConfigurationPage";
import UserManagementPage from "./pages/admin/userManagementPage";
import TrainingProgramManagement from "./pages/admin/trainingProgramManagement";
import ScoreManagementPage from "./pages/admin/ScoreManagementPage";
import MajorManagementPage from "./pages/admin/majorManagementPage";
import CohortManagementPage from "./pages/admin/cohortManagementPage";

const RouterCustom = () => {
  const userRouter = [
    { path: ROUTERS.USER.HOME, component: <HomePage /> },
    { path: ROUTERS.USER.PROFILE, component: <ProfilePage /> },
    { path: ROUTERS.USER.REGISTER, component: <RegisterStudyPage /> },
    { path: ROUTERS.USER.TIMETABLE, component: <TimetablePage /> },
    { path: ROUTERS.USER.ANNOUNCEMENT, component: <AnnouncementPage /> },
    { path: ROUTERS.USER.TRAINING_PROGRAM, component: <TrainingProgramPage /> },
    { path: ROUTERS.USER.PAY_TUITION, component: <PayTuitionPage /> },
    { path: ROUTERS.USER.SCORE, component: <ScorePage /> },
  ];

  const lecturerRouter = [
    { path: ROUTERS.LECTURER.TIMETABLE, component: <TimetableLecturerPage /> },
    { path: ROUTERS.LECTURER.MY_CLASS, component: <MyClassPage /> },
    { path: ROUTERS.LECTURER.PROFILE, component: <ProfileLecturerPage />},
  ];

  const deanRouter = [
    {path: ROUTERS.DEAN.PROFILE, component: <ProfileDeanPage />},
    {path: ROUTERS.DEAN.ARRANGECLASSSCHEDULE, component: <ArrangeClassSchedulePage />},
  ];

  const departmentHeadRouter = [
    {path: ROUTERS.DEPARTMENTHEAD.PROFILE, component: <ProfileDepartmentHeadPage />},
    {path: ROUTERS.DEPARTMENTHEAD.ASSIGNINSTRUCTORS, component: <AssignInstructorsPage />},
  ];

  const adminRouter = [
    {path: ROUTERS.ADMIN.PROFILE, component: <ProfileAdminPage />},
    {path: ROUTERS.ADMIN.SUBJECTMANAGEMENT, component: <SubjectManagementPage />},
    {path: ROUTERS.ADMIN.SEMESTERCONFIGURATION, component: <SemesterConfigurationPage />},
    {path: ROUTERS.ADMIN.USERMANAGEMENT, component: <UserManagementPage />},
    {path: ROUTERS.ADMIN.TRAININGPROGRAMMANAGEMENT, component: <TrainingProgramManagement/>},
    {path: ROUTERS.ADMIN.SCOREMANAGEMENT, component: <ScoreManagementPage/>},
    {path: ROUTERS.ADMIN.MAJORMANAGEMENT, component: <MajorManagementPage />},
    {path: ROUTERS.ADMIN.COHORTMANAGEMENT, component: <CohortManagementPage />},
  ];

  return (
    <Routes>
      <Route path={ROUTERS.USER.LOGIN} element={<LoginPage />} />

      <Route element={<ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_STUDENT"]} />}>
        <Route element={<MasterLayout />}>
          {userRouter.map((item, key) => (
            <Route key={key} path={item.path} element={item.component} />
          ))}
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ROLE_LECTURER"]} />}>
        <Route element={<MasterLayoutLecturer />}>
          {lecturerRouter.map((item, key) => (
            <Route key={key} path={item.path} element={item.component} />
          ))}
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ROLE_DEAN"]} />}>
        <Route element={<MasterLayoutDean />}>
          {deanRouter.map((item, key) => (
            <Route key={key} path={item.path} element={item.component} />
          ))}
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ROLE_DEPARTMENTHEAD", "ROLE_DEPARTMENT_HEAD"]} />}>
        <Route element={<MasterLayoutDepartmentHead />}>
          {departmentHeadRouter.map((item, key) => (
            <Route key={key} path={item.path} element={item.component} />
          ))}
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
        <Route element={<MasterLayoutAdmin />}>
          {adminRouter.map((item, key) => (
            <Route key={key} path={item.path} element={item.component} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterCustom;