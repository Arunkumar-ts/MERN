import { Card, CardContent, Typography, Button, Grid, Chip, Checkbox, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { deleteTodo, updateTodo } from '../../controller/todos.controller';


const TodoCard = ({ data, onDelete }) => {
    const [date, setDate] = useState(new Date(data.dueDate));
    const [isCompleted, setIsCompleted] = useState(data.isCompleted);
    const today = new Date();
    const [pending, setPending] = useState("warning");
    const id = data._id;

    useEffect(() => {
        if (date < today && !isCompleted) {
            setPending("error");
        }
    }, []);

    async function handleChangeCheck(e) {
        if (!isCompleted) {
            setIsCompleted(e.target.checked);
            await updateTodo(id);
        }
    }
    async function handleDelete() {
        const respose = await deleteTodo(id);
        if (respose) {
            onDelete();
        }
    }

    return (
        <Grid>
            <Card>
                <CardContent>
                    <Grid container sx={{ justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant="h6" component="div">
                            {date.toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </Typography>
                        {isCompleted ?
                            <Chip label="Completed" color="success" size="small" ></Chip> :
                            <Chip label="Pending" color={pending} size="small" ></Chip>
                        }
                    </Grid>
                    <Grid>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.title}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body2" sx={{ color: 'text.secondary', height: 35 }} >
                            {data.description ? data.description : "Description not available:)"}
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Tooltip title="Delete" arrow>
                            <IconButton color="error" onClick={handleDelete}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Tooltip>
                        <Grid>
                            <Tooltip title="Completed" arrow>
                                <IconButton>
                                    <Checkbox
                                        checked={isCompleted}
                                        onChange={handleChangeCheck}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default TodoCard;