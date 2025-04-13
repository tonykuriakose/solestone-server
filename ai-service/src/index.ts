import { config } from "dotenv";
import Server from "./server";
config();



const expressServer = new Server();

const PORT=process.env.PORT || 3003;

expressServer.start(process.env.PORT as string);






