import { Router } from 'express';
import { getUserById, updateUser, deleteUser } from '../controller/user.controller';
import CommonResponse from '../data-contracts/response/common.response';
import ReturnResponse from '../model/return-response';

const router = Router();

// Get user by ID
router.get('/', async (req, res) => {
  try {
    if (!req.user?.id) {
      res.status(401).json(CommonResponse.error(400, "Unauthorized: No user ID found"));
    }
    const result:ReturnResponse = await getUserById(req.user!.id);
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
router.put('/', async (req, res) =>{
  try {
    if (!req.user?.id) {
      res.status(401).json(CommonResponse.error(400, "Unauthorized: No user ID found"));
    }
    const result:ReturnResponse = await updateUser(req.user!.id, req.body);
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
router.delete('/', async(req, res) => {
  try {
    if (!req.user?.id) {
      res.status(401).json(CommonResponse.error(400, "Unauthorized: No user ID found"));
    }
    const result:ReturnResponse = await deleteUser(req.user!.id);
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
