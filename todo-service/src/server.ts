import { config } from "dotenv";
import Server from "./server/index";
config();



const expressServer = new Server();

const PORT=process.env.PORT || 3002;

expressServer.start(process.env.PORT as string);






