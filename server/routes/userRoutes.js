import express from 'express';
import { logout, signup, login, getUserById, updateUserProfile } from '../controllers/usercontrollers.js';

const userRoutes = express.Router();

userRoutes.post('/signup', signup);
userRoutes.post('/login', login);
userRoutes.get('/id/:userId', getUserById); // 🔄 Change `id` to `userId`
userRoutes.get('/logout', logout);
userRoutes.put('/:id', updateUserProfile);
export default userRoutes;



