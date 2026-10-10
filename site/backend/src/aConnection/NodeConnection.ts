import http from "http";
import fs from "fs/promises";
import path from "path";


const ENV = process.env.NODE_ENV || "default";
const MACHINE = process.env.NODE_MACHINE || "default";
const PORT = process.env.NODE_PORT || 8000;
const APP_NAME = process.env.NODE_APP_NAME || "POC02-ExpressShadcnSetup";

class NodeConnection {
  private connection!: http.Server;

  constructor() {
    this.createConnection();
  }

  private createConnection() {
    this.connection = http.createServer((request, response) => {
      this.handleRoute(request, response);
    });
  }

  public listenConnection() {
    this.connection.listen(PORT, () => {
      console.log(`Node connection listening on http://localhost:${PORT}`);
      console.log(`
        Environment: ${ENV}
        Machine: ${MACHINE}
        Port: ${PORT}
        App Name: ${APP_NAME}
      `);
    })
  }

  protected handleRoute(
    _request: http.IncomingMessage,
    _response: http.ServerResponse,
  ) {}
}

class NodeRouter extends NodeConnection {
  protected override handleRoute(
    request: http.IncomingMessage,
    response: http.ServerResponse,
  ) {
    const url = request.url;

    switch (url) {
      case "/":
        this.indexHTMLRoute(request, response);
        return;
        
      case "/backend.png":
        this.backendPNGRoute(request, response);
        return;
        
      case "/health":
        this.healthRoute(request, response);
        return;
        
      default:
        this.defaultRoute(request, response);
        return;
    }
  }

  private async indexHTMLRoute(
    request: http.IncomingMessage,
    response: http.ServerResponse,
  ) {
    // read index.html
    const indexHTML = await fs.readFile(
      path.join(process.cwd(), "public", "index.html"),
      "utf-8",
    );

    const updatedHTML = indexHTML
      .replace("{{ NODE_ENV }}", ENV)
      .replace("{{ NODE_MACHINE }}", MACHINE)
      .replace("{{ NODE_PORT }}", String(PORT))
      .replace("{{ NODE_APP_NAME }}", APP_NAME);

    // response - write head
    response.writeHead(200, {
      "content-type": "text/html",
    });

    // response - end
    response.end(updatedHTML);
  }

  private async backendPNGRoute(
    request: http.IncomingMessage,
    response: http.ServerResponse,
  ) {
    // read backend.png
    const backendPNG = await fs.readFile(
      path.join(process.cwd(), "public", "backend.png"),
    )

    // response - write head
    response.writeHead(200, {
      "content-type": "image/png",
    });

    // response - end
    response.end(backendPNG);
  }

  private async healthRoute(
    request: http.IncomingMessage,
    response: http.ServerResponse,
  ) {
    // response - write head
    response.writeHead(200);

    // response - end
    response.end();
  }

  private async defaultRoute(
    request: http.IncomingMessage,
    response: http.ServerResponse,
  ) {
    // response - write head
    response.writeHead(404, {
      "content-type": "text/plain",
    });

    // response - end
    response.end("Page Not Found");
  }
}

const nodeConnection = new NodeRouter();
export default nodeConnection;
