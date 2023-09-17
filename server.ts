import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine, NgSetupOptions } from '@nguniversal/express-engine';
import express, { NextFunction, Request, Response } from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppServerModule } from './src/main.server';
import compression from 'compression';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

function shouldCompress(req: Request, res: Response): boolean {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  server.use(compression({ filter: shouldCompress }));

  const distFolder = join(process.cwd(), 'dist/angular-starter/browser'); //TODO replace with app name
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
      inlineCriticalCss: false,
    } as NgSetupOptions),
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  );

  server.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Frame-Options', 'DENY');
    next();
  });

  // All regular routes use the Universal engine
  server.get('*', (req: Request, res: Response) => {
    const filePath: string = join(distFolder, req.path, 'index.html');
    // For prerender, use exists file
    if (existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.render(indexHtml, {
        req,
        providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
          {
            provide: REQUEST,
            useValue: req,
          },
          {
            provide: RESPONSE,
            useValue: res,
          },
        ],
      });
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
