import * as adminControll from './controllers/admin.controller';
import * as userControll from './controllers/user.controller';
import * as passwordController from './controllers/password.controller';
import * as authMiddleware from './middlewares/auth.middleware';
import { Router } from 'express';
import { authenticate, authorize } from './middlewares/auth.middleware';

const router = Router();
// User routes
router.post('/signup', userControll.signup); // POST /api/v1/auth/signup
router.post('/login', userControll.login);   // POST /api/v1/auth/login
// Admin routes
router.post('/admin/login', authenticate, authorize(['admin']), adminControll.adminLogin); // POST /api/v1/auth/admin/login
// admin controlling/manipulating users routes
router.get('/users', authenticate, authorize(['admin']), userControll.listUsers); // GET /api/v1/auth/users
router.patch('/users/:id/role', authenticate, authorize(['admin']), userControll.updateUserRole); // PATCH /api/v1/auth/users/:id/role
router.delete('/users/:id', authenticate, authorize(['admin']), userControll.deleteUser); // DELETE /api/v1/auth/users/:id
// Password reset routes
router.post('/password/update', authenticate, passwordController.updatePassword); // POST /api/v1/auth/password/update
// check api health
router.get('/health', (req, res) => {
    res.status(200).send({ status: 'ok', message: 'API is healthy' });
});
router.get('/all-possible-routes', (req, res) => {
    // List all possible routes
    res.status(200).send({
        routes: [
            { method: 'POST', path: '/auth/signup', description: 'Register a new user' },
            { method: 'POST', path: '/auth/login', description: 'Login for a normal user' },
            { method: 'POST', path: '/auth/admin/login', description: 'Admin login' },
            { method: 'GET', path: '/auth/users', description: 'List all users (admin only)' },
            { method: 'PATCH', path: '/auth/users/:id/role', description: 'Update user role (admin only)' },
            { method: 'DELETE', path: '/auth/users/:id', description: 'Delete user account (admin only)' },
            { method: 'POST', path: '/auth/password/update', description: 'Update password' },
            { method: 'GET', path: '/auth/health', description: 'Check API health' }
        ]
    });
});

// setting up the router
export default router;
// src/v1/app.ts