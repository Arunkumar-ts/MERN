import { Router } from 'express';
import CommonResponse from '../data-contracts/response/common.response';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controller/todo.controller';
import { getTodo } from "../data-contracts/response/gettodo.response";
import { getTodosType } from '../types/gettodos.types';
import ReturnResponse from '../model/return-response';

const router = Router();

// GET todos by userId
router.post("/list", async (req, res) =>{
  try {
    const result:ReturnResponse = await getTodos(req.body);
    if (result.success) {
      res.status(201).json(CommonResponse.success(201, result.message, result.data));
    } else {
      res.status(400).json(CommonResponse.error(400, result.message, result.data));
    }
  } catch (error: any) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      res.status(500).json(CommonResponse.error(500, err.message, { stack: err.stack }));
  }
});

// POST todo
router.post("/", async (req, res) =>{
  try {
    const result:ReturnResponse = await createTodo(req.body);
    if (result.success) {
      res.status(201).json(CommonResponse.success(201, result.message, result.data));
    } else {
      res.status(400).json(CommonResponse.error(400, result.message, result.data));
    }
  } catch (error: any) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      res.status(500).json(CommonResponse.error(500, err.message, { stack: err.stack }));
  }
});

// PUT todo by todoId
router.get("/:id", async (req, res) =>{
  try {
    const result:ReturnResponse = await updateTodo(req.params.id);
    if (result.success) {
      res.status(201).json(CommonResponse.success(201, result.message, result.data));
    } else {
      res.status(400).json(CommonResponse.error(400, result.message, result.data));
    }
  } catch (error: any) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      res.status(500).json(CommonResponse.error(500, err.message, { stack: err.stack }));
  }
});

// DELETE todo
router.delete("/:id", async (req, res) =>{
  try {
    const result:ReturnResponse = await deleteTodo(req.params.id);
    if (result.success) {
      res.status(201).json(CommonResponse.success(201, result.message, result.data));
    } else {
      res.status(400).json(CommonResponse.error(400, result.message, result.data));
    }
  } catch (error: any) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      res.status(500).json(CommonResponse.error(500, err.message, { stack: err.stack }));
  }
})

export default router;
