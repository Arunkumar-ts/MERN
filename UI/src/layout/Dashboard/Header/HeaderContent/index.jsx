import Box from '@mui/material/Box';

// project imports
// import Search from './Search';
import Profile from './Profile';
// import Notification from './Notification';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {

  return (
    <>
      <Box sx={{ width: '100%', ml: 1 }} />
      {/* <Notification /> */}
      <Profile />
    </>
  );
}
