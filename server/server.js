/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview server - Server to start service.
 * @author T V Deekshith, venkatadeekshith@elear.solutions
 * @copyright Copyright (c) 2021 Elear Solutions Tech Private Limited. All rights
 * reserved.
 * @license To any person (the "Recipient") obtaining a copy of this software and
 * associated documentation files (the "Software"):
 *
 * All information contained in or disclosed by this software is confidential
 * and proprietary information of Elear Solutions Tech Private Limited and all
 * rights therein are expressly reserved. By accepting this material the
 * recipient agrees that this material and the information contained therein is
 * held in confidence and in trust and will NOT be used, copied, modified,
 * merged, published, distributed, sublicensed, reproduced in whole or in part,
 * nor its contents revealed in any manner to others without the express
 * written permission of Elear Solutions Tech Private Limited.
 */
/*********************************************************************************/
/*===============================================================================*/

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import http from 'http';
import shrinkRay from 'shrink-ray-current';
import { Environment } from './config/environment';
import { COCOConfig } from './config/coco';

// Get our API routes
import router from './routes';

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse cookie header and populate req.cookies
app.use(cookieParser());

// compression middleware
app.use(shrinkRay());

// Set our api routes
router(app);

// error-handler to be used last and in dev only
if (process.env.NODE_ENV === 'dev') {
  app.use(errorHandler());
}

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// Store access token
COCOConfig.initialize()
  .then(() => {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(Environment.PORT, () => {
      console.log(`SampleTokenServer is up and running on`
        + ` localhost:${Environment.PORT}`);
    });
  }).catch((error) => {
    console.log('Error occured while initializing the server', error);
    process.exit(0);
  });
