import { Router } from 'express';
import { createUser, login } from '../controller/login.controller';
import CommonResponse from '../data-contracts/response/common.response';
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

export default router;
