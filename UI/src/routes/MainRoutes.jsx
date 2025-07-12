import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import ProtectedRoute from '../middleware/ProductedRoute';
// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const Settings = Loadable(lazy(() => import('pages/dashboard/settings')));
const CreateTodo = Loadable(lazy(() => import('pages/dashboard/createTodo')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <ProtectedRoute/>,
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '',
          element: <DashboardDefault />
        },
        {
          path: '/dashboard',
          element: <DashboardDefault />
        },
        {
          path: '/createtodo',
          element: <CreateTodo />
        },
        {
          path: '/settings',
          element: <Settings />
        },
      ]
    }
  ]
};

export default MainRoutes;
