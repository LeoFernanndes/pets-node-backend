import express, {Express} from 'express';
import petsRoutes from "./routes/PetsRoutes";
import cors from 'cors'


const app: Express = express();
const port = Number(process.env.WEBSERVICE_PORT) || 3001;

const globalRouter = express.Router();
globalRouter.use('/pets', petsRoutes)

app.use(cors())
app.use(express.json())
app.use('/pets', globalRouter)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;