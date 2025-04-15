import express, { Application, Request, Response, NextFunction } from "express";
import http, { Server as HTTPServer } from "http";
import cors from "cors";
import morgan from "morgan";
import router from "../routes/taskRoutes";

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

  
  private async setupRoutes(): Promise<void> {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`Request received: ${req.method} ${req.url}`);
      next();
    });
    this.app.use("/api/auth", router);
  }
}

export default Server;
