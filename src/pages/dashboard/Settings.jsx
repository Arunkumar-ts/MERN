import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button, Grid, Stack, Typography, InputLabel, TextField, Box
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser as getUserApi, updateUser, deleteUser} from '../../controller/user.controller';
import { toast } from 'react-toastify';

const Settings = () => {
  const navigate = useNavigate();
  const [showPW, setShowPW] = useState(false);
  const [initialData, setInitialData] = useState({
    name: '',
    email: '',
    password: '12345678',
    confirmPW: '',
  });

  async function getUser() {
    const response = await getUserApi();
    setInitialData((prev) => ({
      ...prev,
      name: response?.name || '',
      email: response?.email || '',
    }));
  }

  useEffect(()=>{
    getUser();
  },[]);

  const handleSubmit = async (values) => {
    const response = await updateUser(values);
    if(response?.data){
      setShowPW(false);
      formik.resetForm();
      toast.success("User updated successfully!");
    }
  }

  const handledelete = async () =>{
    const response = await deleteUser();
    if(response?.data){
      toast.success("User deleted successfully!");
      navigate('/login');
    }
  }

  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPW: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className='d-flex justify-content-end'>
        <Box>
          <Button onClick={() => navigate("/dashboard")}>Back</Button>
        </Box>
      </div>
      <Box sx={{
        width: {
          xs: '100%',
          md: '40%',
        },
        paddingX: 4,
        paddingY: 2,
        boxShadow: 2,
        borderRadius: 3,
        marginTop: {
          xs: 2,
          md: 0,
        }
      }}>
        <Typography variant="h4" gutterBottom marginBottom={3}> 
          Profile Settings
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <Stack sx={{
              width: {
                xs: '100%',
                md: '60%',
              },
            }}
              spacing={2}
            >

              <Grid>
                <InputLabel htmlFor="name">Enter name</InputLabel>
                <TextField
                  id="name"
                  type="text"
                  {...formik.getFieldProps('name')}
                  placeholder='Enter name'
                  fullWidth
                 disabled={!showPW}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className='text-danger'>{formik.errors.name}</div>
                ) : null}
              </Grid>

              <Grid>
                <InputLabel htmlFor="email">Enter email</InputLabel>
                <TextField id="email" type="email" 
                {...formik.getFieldProps('email')}
                fullWidth
                placeholder='Enter email'
                disabled={!showPW}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='text-danger' >{formik.errors.email}</div>
                ) : null}
              </Grid>

              <Grid>
                <InputLabel htmlFor="password">Enter pssword</InputLabel>
                <TextField
                  id="password"
                  type="password"
                  {...formik.getFieldProps('password')}
                  placeholder='Enter password'
                  fullWidth
                  disabled={!showPW}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className='text-danger'>{formik.errors.password}</div>
                ) : null}
              </Grid>

              { showPW && <Grid>
                <InputLabel htmlFor="confirmPW">Enter confirm password</InputLabel>
                <TextField
                  id="confirmPW"
                  type="text"
                  {...formik.getFieldProps('confirmPW')}
                  placeholder='Enter confirm password'
                  fullWidth
                />
                {formik.touched.confirmPW && formik.errors.confirmPW ? (
                  <div className='text-danger'>{formik.errors.confirmPW}</div>
                ) : null}
              </Grid>}

            </Stack>
            <Grid sx={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <div>
                { showPW && <Button variant="contained" onClick={handledelete} className='me-3'     color='error'> Delete</Button>}
              </div>
              <div>
                { !showPW && <Button variant="contained" type="submit" onClick={()=>setShowPW(true)} > Edit</Button>}
                { showPW && <Button variant="outlined" onClick={()=>setShowPW(false)} className='me-3' color='secondary'> Cancel</Button>}
                { showPW && <Button variant="contained" type="submit"> Submit</Button>}
              </div>
            </Grid>
          </Stack>
        </form>
      </Box>
    </>
  )
}

export default Settings;