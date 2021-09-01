/*===============================================================================*/
/*********************************************************************************/
/**
  * @fileOverview routes - file for all the routes
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

import { logger } from './config/common-config';
import { HttpStatus } from './utils/custom-api-errors';
import { cocoAPIRouter } from './api/v1.0/coco-api';

// Routes function to load apis on specific routes
export default (app) => {
  app.use('/v1.0/coco-api', cocoAPIRouter);

  app.get('*', (req, res) => {
    logger.error('Requested API route does '
      + 'not match any available endpoints: ' + req.method, req.url);
    res.status(HttpStatus.NOT_FOUND).send('Page not found');
  });
};
