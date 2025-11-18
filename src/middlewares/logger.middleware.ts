import { Request, Response, NextFunction } from "express";

function consoleLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next();
}

export default {
    consoleLoggerMiddleware
}