import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const DashboardMain = lazy(() => import("../pages/Dashboard/DashboardMain"));
const Forms = lazy(() => import("../pages/Forms"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const FacultyTables = lazy(() => import("../pages/Faculty/FacultyTables"));
const MemUniversityTables = lazy(() => import("../pages/MemberUniversity/MemberUniversityTables"));
const DepartmentTables = lazy(() =>
  import("../pages/Department/DepartmentTables")
);
const AcademicTables = lazy(() => import("../pages/Academic/AcademicTables"));
const JobTables = lazy(() => import("../pages/Job/JobTables"));
const EmployeeTables = lazy(() => import("../pages/Employee/EmployeeTables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const isFlag = localStorage.getItem("flag").trim();
let routes;
if (isFlag === "UDN") {
  routes = [
    {
      path: "/dashboard-main",
      component: DashboardMain,
    },
    {
      path: "/employees",
      component: EmployeeTables,
    },
    {
      path: "/member-university",
      component: MemUniversityTables,
    },
    {
      path: "/job",
      component: JobTables,
    },
    {
      path: "/academic",
      component: AcademicTables,
    },
    {
      path: "/major",
      component: Charts,
    },
    {
      path: "/subject",
      component: Buttons,
    },
    {
      path: "/modals",
      component: Modals,
    },
    {
      path: "/marks",
      component: Tables,
    },
    {
      path: "/404",
      component: Page404,
    },
    {
      path: "/blank",
      component: Blank,
    },
  ];
} else {
  routes = [
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/faculty",
      component: FacultyTables,
    },
    {
      path: "/department",
      component: DepartmentTables,
    },
    {
      path: "/employees",
      component: EmployeeTables,
    },
    {
      path: "/job",
      component: JobTables,
    },
    {
      path: "/academic",
      component: AcademicTables,
    },
    {
      path: "/major",
      component: Page404,
    },
    {
      path: "/subject",
      component: Page404,
    },
    {
      path: "/modals",
      component: Modals,
    },
    {
      path: "/students",
      component: Page404,
    },
    {
      path: "/marks",
      component: Page404,
    },
    {
      path: "/404",
      component: Page404,
    },
    {
      path: "/blank",
      component: Blank,
    },
  ];
}

export default routes;
