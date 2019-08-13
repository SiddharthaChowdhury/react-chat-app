import express, {Request, Response} from 'express';
import { signup } from '../feature/signup/signup';
import { login } from '../feature/auth/login';
import { verifyToken, verifyTokenMiddleware } from '../feature/auth/verify';
export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('ping');
});

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-token', verifyToken);

// Experiment
router.post('/test', verifyTokenMiddleware, (req: any, res: any) => {
    return res.json(req.body)
})