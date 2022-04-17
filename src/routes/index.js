import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const FacultyTables = lazy(() => import('../pages/Faculty/FacultyTables'))
const AcademicTables = lazy(() => import('../pages/Academic/AcademicTables'))
const JobTables = lazy(() => import('../pages/Job/JobTables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/faculty',
    component: FacultyTables,
  },
  {
    path: '/department',
    component: Forms,
  },
  {
    path: '/employees',
    component: Cards,
  },
  {
    path: '/job',
    component: JobTables,
  },
  {
    path: '/academic',
    component: AcademicTables,
  },
  {
    path: '/major',
    component: Charts,
  },
  {
    path: '/subject',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/students',
    component: Tables,
  },
  {
    path: '/marks',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
