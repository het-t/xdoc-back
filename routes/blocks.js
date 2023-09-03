import { Router } from 'express';
import getBlockById from '../controllers/blocks/getById.js';
import createBlock from '../controllers/blocks/create.js';

const router = Router()

router.get('/:blockId', getBlockById);

router.post('/', createBlock);

export default router