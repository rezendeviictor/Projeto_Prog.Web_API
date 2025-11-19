import express, { Request, Response } from "express"
import logger from "./middlewares/logger.middleware";
import swagger from "swagger-ui-express"
import swaggerConfig from "./docs/swagger.json";
import routers from "./routes/index";

const app = express();
app.use(express.json());

app.use(logger.consoleLoggerMiddleware);

app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
        message: "API is running and ready to use!",
        timestamp: new Date().toISOString(),
    });
});


app.use("/api", routers); 
app.use("/docs", swagger.serve, swagger.setup(swaggerConfig));


app.get("/",(req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to Petshop API!" });
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found", message: `Route '${req.path}' not found.` });
});

export default app;