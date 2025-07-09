import { Router } from 'express';
import { createUser, getUserById, updateUser, deleteUser, login } from '../controller/user.controller';
import CommonResponse from '../data-contracts/response/common.response';
import { getUser } from '../data-contracts/response/getuser.response';
import ReturnResponse from '../model/return-response';

const router = Router();

// Create user
router.post('/register', async (req, res) => {
  try {
    const result:ReturnResponse = await createUser(req.body);
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

//POST Lgoin
router.post("/login", async (req, res) =>{
  try {
    const result:ReturnResponse = await login(req.body);
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

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const result:ReturnResponse = await getUserById(req.params.id);
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

// PUT user by ID
router.put('/:id', async (req, res) =>{
  try {
    const result:ReturnResponse = await updateUser(req.params.id, req.body);
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

// DELETE user by ID
router.delete('/:id', async(req, res) => {
  try {
    const result:ReturnResponse = await deleteUser(req.params.id);
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
