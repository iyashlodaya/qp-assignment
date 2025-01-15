import { Router } from 'express';

const router: Router = Router();

// Admin routes
router.get('/', () => {
    console.log('User Test API.')
});

export default router;
