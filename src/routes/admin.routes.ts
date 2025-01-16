import { Router } from 'express';

import { addItem } from '../controllers/admin/add.item';
import { getAllItems } from '../controllers/admin/get.all.items';

const router: Router = Router();

// Admin routes
router.get('/test', () => {
    console.log('Admin Test API.')
});

router.post('/groceries', addItem)
router.get('/groceries', getAllItems)

export default router;
