import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./pages/users/theme/masterLayout";
import HomePage from "./pages/users/homePage";
import LoginPage from "./pages/users/loginPage";
import ProfilePage from "./pages/users/profilePage";
import RegisterStudyPage from "./pages/users/registerStudyPage";
import TimetablePage from "./pages/users/timetablePage";
import TrainingProgramPage from "./pages/users/trainingProgram";
import AnnouncementPage from "./pages/users/AnnouncementPage";
import PayTuitionPage from "./pages/users/payTuitionPage";
import MasterLayoutLecturer from "./pages/lecturer/theme/masterLayoutLecturer";
import MyClassPage from "./pages/lecturer/myClassPage";
import TimetableLecturerPage from "./pages/lecturer/timetableLecturerPage";
import ProfileLecturerPage from "./pages/lecturer/profileLecturerPage";
import ProfileDeanPage from "./pages/dean/profileDeanPage";
import ProfileDepartmentHeadPage from "./pages/departmentHead/profileDepartmentHeadPage";
import ProfileAdminPage from "./pages/admin/profileAdminPage";
import MasterLayoutDean from "./pages/dean/theme/masterLayoutDean";
import MasterLayoutDepartmentHead from "./pages/departmentHead/theme/masterLayoutDepartmentHead";
import MasterLayoutAdmin from "./pages/admin/theme/masterLayoutAdmin";
import SubjectManagementPage from "./pages/admin/subjectManagementPage";
import SemesterConfigurationPage from "./pages/admin/semesterConfigurationPage";
import UserManagementPage from "./pages/admin/userManagementPage";
import TrainingProgramManagement from "./pages/admin/trainingProgramManagement";

// const renderRouterUser = () => {
//   const userRouter = [
//     {
//       path: ROUTERS.USER.HOME,
//       component: <HomePage />,
//     },
//     {
//       path: ROUTERS.USER.LOGIN,
//       component: <LoginPage />,
//     },
//     {
//       path: ROUTERS.USER.PROFILE,
//       component: <ProfilePage />,
//     },
//     {
//       path: ROUTERS.USER.REGISTER,
//       component: <RegisterStudyPage />,
//     },
//     {
//       path: ROUTERS.USER.TIMETABLE,
//       component: <TimetablePage />,
//     },
//     {
//       path: ROUTERS.USER.ANNOUNCEMENT,
//       component: <AnnouncementPage />,
//     },
//     {
//       path: ROUTERS.USER.TRAINING_PROGRAM,
//       component: <TrainingProgramPage />,
//     },
//     {
//       path: ROUTERS.USER.PAY_TUITION,
//       component: <PayTuitionPage />,
//     },
//   ];
//   return (
//     <MasterLayout>
//       <Routes>
//         {userRouter.map((item, key) => {
//           return <Route key={key} path={item.path} element={item.component} />;
//         })}
//       </Routes>
//     </MasterLayout>
//   );
// };

// const renderRouterLecturer = () => {
//   const lecturerRouter = [
//     {
//       path: ROUTERS.LECTURER.TIMETABLE,
//       component: <TimetableLecturerPage />,
//     },
//     {
//       path: ROUTERS.LECTURER.MY_CLASS,
//       component: <MyClassPage />,
//     },
//   ];

//   return (
//     <MasterLayoutLecturer>
//       <Routes>
//         {lecturerRouter.map((item, key) => (
//           <Route key={key} path={item.path} element={item.component} />
//         ))}
//       </Routes>
//     </MasterLayoutLecturer>
//   );
// };

// const RouterCustom = () => {
//   return (
//     <>
//       {renderRouterUser()}
//       {renderRouterLecturer()}
//     </>
//   );
// };

// export default RouterCustom;

const RouterCustom = () => {
  const userRouter = [
    { path: ROUTERS.USER.HOME, component: <HomePage /> },
    { path: ROUTERS.USER.LOGIN, component: <LoginPage /> },
    { path: ROUTERS.USER.PROFILE, component: <ProfilePage /> },
    { path: ROUTERS.USER.REGISTER, component: <RegisterStudyPage /> },
    { path: ROUTERS.USER.TIMETABLE, component: <TimetablePage /> },
    { path: ROUTERS.USER.ANNOUNCEMENT, component: <AnnouncementPage /> },
    { path: ROUTERS.USER.TRAINING_PROGRAM, component: <TrainingProgramPage /> },
    { path: ROUTERS.USER.PAY_TUITION, component: <PayTuitionPage /> },
  ];

  const lecturerRouter = [
    { path: ROUTERS.LECTURER.TIMETABLE, component: <TimetableLecturerPage /> },
    { path: ROUTERS.LECTURER.MY_CLASS, component: <MyClassPage /> },
    { path: ROUTERS.LECTURER.PROFILE, component: <ProfileLecturerPage />},
  ];

  const deanRouter = [
    {path: ROUTERS.DEAN.PROFILE, component: <ProfileDeanPage />},
  ];

  const departmentHeadRouter = [
    {path: ROUTERS.DEPARTMENTHEAD.PROFILE, component: <ProfileDepartmentHeadPage />},
  ];

  const adminRouter = [
    {path: ROUTERS.ADMIN.PROFILE, component: <ProfileAdminPage />},
    {path: ROUTERS.ADMIN.SUBJECTMANAGEMENT, component: <SubjectManagementPage />},
    {path: ROUTERS.ADMIN.SEMESTERCONFIGURATION, component: <SemesterConfigurationPage />},
    {path: ROUTERS.ADMIN.USERMANAGEMENT, component: <UserManagementPage />},
    {path: ROUTERS.ADMIN.TRAININGPROGRAMMANAGEMENT, component: <TrainingProgramManagement/>},

  ];

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {userRouter.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Route>

      <Route element={<MasterLayoutLecturer />}>
        {lecturerRouter.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Route>

      <Route element={<MasterLayoutDean />}>
        {deanRouter.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Route>

      <Route element={<MasterLayoutDepartmentHead />}>
        {departmentHeadRouter.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Route>

      <Route element={<MasterLayoutAdmin />}>
        {adminRouter.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Route>
    </Routes>
  );
};

export default RouterCustom;
