import { config } from "dotenv";
import Server from "./server/Server";
config();




const expressServer = new Server();


expressServer.start(process.env.PORT as string);