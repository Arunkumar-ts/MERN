import {
  Button, Grid, Pagination, TextField, InputAdornment, Box
} from '@mui/material';
import { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoCard from '../../components/cards/todoCard';
import { getData } from '../../controller/todos.controller';
import { useNavigate } from 'react-router-dom';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [searchString, setSearchString] = useState("");
  const [todoData, setTodoData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  async function getTodo(){
    const response = await getData(searchString, page);
    setTodoData(response.todos);
    setTotalRows(response.totalRows);
  }
 
  useEffect(()=>{
    getTodo();
  },[searchString, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
    <ToastContainer autoClose={1000} />
      <div>
        <Grid className="d-flex justify-content-between">
          <Box>
            <TextField id="outlined-size-normal" placeholder='Search... '
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <SearchOutlinedIcon fontSize="small" className="text-gray-400" />
                </InputAdornment>
              )
            }} 
            className='rounded-full'
            value={searchString}
            onChange={(e)=> setSearchString(e.target.value)}
            />
          </Box>
          <Box>
            <Button variant="contained" onClick={()=>navigate("/createtodo")}> + Add</Button>
          </Box>
        </Grid>
        <Grid container spacing={3} sx={{ py: 3 }}>
          {todoData.length>0 ? todoData.map((todo, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} >
              <TodoCard data={todo} onDelete={getTodo}/>
            </Grid>
          )) : 
            <div className="py-4 text-center text-secondary">
                No todos found :)
            </div>
          }
        </Grid>
        <Grid>
            {totalRows>10 && <Pagination 
            color="primary"
            page={page}
            count={Math.ceil(totalRows / 10)} 
            onChange={handlePageChange}
            />}
        </Grid>
      </div>
    </>
  )
}
