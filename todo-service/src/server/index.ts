import express, { Application, Request, Response, NextFunction } from "express";
import http, { Server as HTTPServer } from "http";
import cors from "cors";
import morgan from "morgan";
import router from "../routes/taskRoutes"; // Make sure the path is correct

class Server {
  public app: Application;
  private server?: HTTPServer;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.setupRoutes();
    this.initialize();
  }

  // Initialize middleware
  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }

  // Initialize server (logging or other setup)
  private initialize(): void {
    try {
      console.log("Server initialized");
    } catch (error) {
      console.error("Error during server initialization:", error);
    }
  }

  // Start the server
  public start(PORT: string | number): void {
    this.server = this.app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });

    // Graceful shutdown on SIGINT and SIGTERM
    process.on("SIGINT", this.stop);
    process.on("SIGTERM", this.stop);
  }

  // Stop the server gracefully
  public stop = (): void => {
    if (this.server) {
      this.server.close(() => {
        console.log("Server stopped");
        // Optionally perform cleanup tasks before server stops
      });
    }
  };

  // Setup routes and middleware
  private async setupRoutes(): Promise<void> {
    // Example of custom middleware for logging requests or processing
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`Request received: ${req.method} ${req.url}`);
      next();
    });
    this.app.use("/api/todo", router);
  }
}

export default Server;
