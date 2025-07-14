import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button, Grid, Stack, Typography, InputLabel, TextField, Box
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createTodo } from '../../controller/todos.controller';
import { useNavigate } from 'react-router-dom';

const Createtodo = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) =>{
    const response = await createTodo(values.title, values.dueDate, values.description);
    if(response){
      formik.resetForm();
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      dueDate: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      dueDate: Yup.date()
        .required('Date is required')
        .min(new Date().toISOString().split('T')[0], 'Date must be today or later'),
      description: Yup.string(),
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
          <Button onClick={()=>navigate("/dashboard")}>Back</Button>
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
        marginTop:{
          xs: 2,
          md: 0,
        }
      }}>
        <Typography variant="h4" gutterBottom>
          Create Todo
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <Stack sx={{
              width: {
                xs: '100%',
                md: '50%',
              },
            }}
              spacing={2}
            >
              <Grid>
                <InputLabel htmlFor="title">Enter Title</InputLabel>
                <TextField
                  id="title"
                  type="text"
                  {...formik.getFieldProps('title')}
                  placeholder='Enter title'
                  fullWidth
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className='text-danger'>{formik.errors.title}</div>
                ) : null}
              </Grid>
              <Grid>
                <InputLabel htmlFor="date">Date</InputLabel>
                <TextField id="date" type="date" {...formik.getFieldProps('dueDate')} fullWidth />
                {formik.touched.dueDate && formik.errors.dueDate ? (
                  <div className='text-danger' >{formik.errors.dueDate}</div>
                ) : null}
              </Grid>
            </Stack>
            <Grid>
              <InputLabel htmlFor="description">Email Description</InputLabel>
              <TextField
                id="description" type="text"
                {...formik.getFieldProps('description')}
                placeholder='Enter description'
                multiline
                minRows={3}
                fullWidth
              />
              {formik.touched.description && formik.errors.description ? (
                <div className='text-danger'>{formik.errors.description}</div>
              ) : null}
            </Grid>
            <Grid>
              <Button variant="contained" type="submit"> + Add</Button>
            </Grid>
          </Stack>
        </form>
      </Box>
    </>
  )
}

export default Createtodo;