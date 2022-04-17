const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Thống kê", // name that appear in Sidebar
  },
  {
    path: "/app/faculty",
    icon: "CardsIcon",
    name: "Khoa",
  },
  {
    path: "/app/department",
    icon: "ChartsIcon",
    name: "Phòng ban",
  },
  {
    icon: "PeopleIcon",
    name: "Nhân viên",
    routes: [
      {
        path: "/app/employees",
        name: "Nhân viên",
      },
      {
        path: "/app/academic",
        name: "Học thuật",
      },
      {
        path: "/app/job",
        name: "Công việc",
      }
    ],
  },
  {
    path: "/app/major",
    icon: "MajorIcon",
    name: "Chuyên ngành",
  },
  {
    path: "/app/subject",
    icon: "SubjectIcon",
    name: "Môn học",
  },
  {
    path: "/app/class",
    icon: "ClassIcon",
    name: "Lớp học",
  },
  {
    path: "/app/students",
    icon: "PeopleIcon",
    name: "Sinh viên",
  },
  {
    path: "/app/marks",
    icon: "TablesIcon",
    name: "Điểm",
  },
  {
    icon: "PagesIcon",
    name: "Pages",
    routes: [
      // submenu
      {
        path: "/login",
        name: "Login",
      },
      {
        path: "/create-account",
        name: "Create account",
      },
      {
        path: "/forgot-password",
        name: "Forgot password",
      },
      {
        path: "/app/404",
        name: "404",
      },
      {
        path: "/app/blank",
        name: "Blank",
      },
    ],
  },
];

export default routes;
