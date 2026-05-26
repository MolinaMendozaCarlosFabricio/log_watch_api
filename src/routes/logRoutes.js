import { Router } from 'express';

import {
    getLogs,
    createLog,
    updateLog,
    deleteLog
} from '../controllers/logController.js';

import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', verifyToken, getLogs);

router.post('/', verifyToken, createLog);

router.put('/:id', verifyToken, updateLog);

router.delete('/:id', verifyToken, deleteLog);

export default router;