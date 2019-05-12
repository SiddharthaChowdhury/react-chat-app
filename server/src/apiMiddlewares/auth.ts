export const auth = (req: any, res: any, next: any) => {
    if (!req.get('token')) {
        res.status(403);
        return res.json({err: 'Authentication error'})
    }

    next()
};