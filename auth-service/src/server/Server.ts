import express, { Application,Request,Response } from "express";
import http, { Server as HTTPServer } from "http";
import cors from "cors";
import morgan from "morgan";

class Server {
  public app: Application;
  private server?: HTTPServer;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.setupRoutes();
    this.initialize();
  
  }

  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }

  private initialize(): void {
    try {
      console.log("Server initialized");
    } catch (error) {
      console.error("Error during server initialization:", error);
    }
  }

  public start(PORT: string | number): void {
    this.server = this.app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });

  
    process.on("SIGINT", this.stop);
    process.on("SIGTERM", this.stop);
  }

  public stop = (): void => {
    if (this.server) {
      this.server.close(() => {
        console.log("Server stopped");
      });
    }
  };

  private setupRoutes() {

    this.app.get("/",(req:Request,res:Response)=>{

      res.status(200).json({message:"auth API is working fine"})

    })
    
  }
}

export default Server;
