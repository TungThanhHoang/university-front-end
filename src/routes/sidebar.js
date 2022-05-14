const isFlag = localStorage.getItem("flag").trim();
let routes;
if (isFlag === "UDN") {
  routes = [
    {
      path: "/app/dashboard-main",
      icon: "HomeIcon",
      name: "Thống kê",
    },
    {
      path: "/app/member-university",
      icon: "CardsIcon",
      name: "Đơn vị thành viên",
    },
    {
      icon: "PeopleIcon",
      name: "Cán bộ viên chức",
      routes: [
        {
          path: "/app/employees",
          name: "Cán bộ viên chức",
        },
        {
          path: "/app/academic",
          name: "Bằng cấp",
        },
        {
          path: "/app/job",
          name: "Công việc",
        },
      ],
    }
  ];
} else {
  routes = [
    {
      path: "/app/dashboard",
      icon: "HomeIcon",
      name: "Thống kê",
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
      name: "Cán bộ viên chức",
      routes: [
        {
          path: "/app/employees",
          name: "Cán bộ viên chức",
        },
        {
          path: "/app/academic",
          name: "Bằng cấp",
        },
        {
          path: "/app/job",
          name: "Công việc",
        },
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
  ];
}

export default routes;
