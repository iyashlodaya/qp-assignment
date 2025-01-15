import { Router } from 'express';

const router: Router = Router();

// Admin routes
router.get('/', () => {
    console.log('Admin Test API.')
});

export default router;
