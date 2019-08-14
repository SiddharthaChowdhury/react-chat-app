import express, {Request, Response} from 'express';
import { signup } from '../feature/signup/signup';
import { login } from '../feature/auth/login';
import { verifyToken } from '../feature/auth/verify';
import {addUser} from "../feature/user/addUser";
import {isValidToken} from "../middlewares/isValidToken";
import {isValidClient} from "../middlewares/isValidClient";
import { getCompanyUsers } from '../feature/user/getUser';
export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('ping');
});

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-token', verifyToken);

router.post('/add-user', isValidToken, isValidClient, addUser);
router.post('/get-company-users', isValidToken, isValidClient, getCompanyUsers);

// Experiment
// router.post('/test', isValidToken, (req: any, res: any) => {
//     return res.json(req.body)
// });