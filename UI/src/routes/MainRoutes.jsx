import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import ProtectedRoute from '../middleware/ProductedRoute';
// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

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
      ]
    }
  ]
};

export default MainRoutes;
