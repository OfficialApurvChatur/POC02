import express, { type Express, type Request, type Response } from "express";
import fs from "fs/promises";
import path from "path";
import { getEnv } from "./EnvironmentConnection.js";


const ENV = getEnv.ENV;
const MACHINE = getEnv.MACHINE;
const PORT = getEnv.PORT;
const APP_NAME = getEnv.APP_NAME;

class ExpressConnection {
  protected connection!: Express;

  constructor() {
    this.createConnection();
  }

  private createConnection() {
    this.connection = express();
  }

  public listenConnection() {
    this.connection.listen(PORT, () => {
      console.log(`Node + Express connection listening on http://localhost:${PORT}`);
      console.log(`
        URL: http://localhost:${PORT}
        Environment: ${ENV}
        Machine: ${MACHINE}
        Port: ${PORT}
        App Name: ${APP_NAME}
      `);
    });
  }
}

class ExpressMiddleware extends ExpressConnection {
  constructor() {
    super();
    this.connectStatic();
  }

  private connectStatic() {
    this.connection.use(
      express.static(
        path.join(process.cwd(), "public"),
        { index: false },
      )
    );
  }
}

class ExpressRouter extends ExpressMiddleware {
  constructor() {
    super();
    this.indexHTMLRoute();
    this.healthRoute();
    this.defaultRoute();
  }

  private indexHTMLRoute() {
    this.connection.get("/", async (
      request: Request,
      response: Response,
    ) => {
      // read index.html
      let indexHTML = await fs.readFile(
        path.join(process.cwd(), "public", "index.html"),
        "utf-8",
      );

      indexHTML = indexHTML
        .replace("{{ NODE_ENV }}", ENV)
        .replace("{{ NODE_MACHINE }}", MACHINE)
        .replace("{{ NODE_PORT }}", String(PORT))
        .replace("{{ NODE_APP_NAME }}", APP_NAME);

      // response
      response.status(200).type("html").send(indexHTML);
    });
  }

  private healthRoute() {
    this.connection.get("/health", async (
      request: Request,
      response: Response,
    ) => {
      // response
      response.status(200).json({
        success: true,
        message: "healthy",
      });
    });
  }

  private defaultRoute() {
    this.connection.use((
      request: Request,
      response: Response,
    ) => {
      // response
      response.status(404).send("Page Not Found");
    });
  }
}

const expressConnection = new ExpressRouter();
export default expressConnection;
