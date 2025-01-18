import { Router } from 'express';
import verifyJWT from '../middleware/verify.token';
import { getGroceryItemList } from '../controllers/user/get.grocery.item.list';
import { createOrder } from '../controllers/user/create.order';
import { viewUserOrders } from '../controllers/user/view.order';

const router: Router = Router();

// User routes
router.get('/test', () => {
    console.log('User Test API.')
});

router.post('/grocery-list', verifyJWT, getGroceryItemList)

//order routes
router.post('/orders', verifyJWT, createOrder)
router.get('/orders', verifyJWT, viewUserOrders)

export default router;
