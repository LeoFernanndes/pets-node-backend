import express, {Express} from 'express';
import petsRoutes from "./routes/PetsRoutes";


const app: Express = express();
const port = Number(process.env.WEBSERVICE_PORT) || 3000;

const globalRouter = express.Router();
globalRouter.use('/pets', petsRoutes)

app.use(express.json())
app.use('/pets', globalRouter)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;