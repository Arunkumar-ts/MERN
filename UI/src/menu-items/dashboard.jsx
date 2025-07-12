// assets
import { DashboardOutlined } from '@ant-design/icons';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// icons
const icons = {
  DashboardOutlined,
  SettingOutlined,
  AddCircleOutlineIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'addtodo',
      title: 'Create Todo',
      type: 'item',
      url: '/createtodo',
      icon: icons.AddCircleOutlineIcon,
      breadcrumbs: false
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.SettingOutlined,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
