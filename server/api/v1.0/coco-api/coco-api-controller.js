/*===============================================================================*/
/*********************************************************************************/
/**
  * @fileOverview routes - function definitions for various routes of token server
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

import { logger } from '../../../config/common-config';
import { COCOService } from '../../../service/coco-service';
import { CustomApiError, ErrorCodes } from '../../../utils/custom-api-errors';
import { ReadableNames } from '../../../utils/readable-names';

/**
 * Executes to provide user access token for non coco users
 * @param {String} userId - uniqueIdentification of user
 */

export const fetchUserToken = (req, res) => {
  const { userId } = req.body;

  // Check if userId is sent
  if (userId === undefined) {
    logger.error('fetchUserToken: usser id not sent');
    const error = new CustomApiError(ErrorCodes.MISSING_PARAM, 'userId',
      ReadableNames.USER);
    return res.status(error.getHttpStatus()).send(error.getErrorInfo());
  }

  // Check if userId is a string
  if (typeof(userId) !== 'string') {
    logger.error('fetchUserToken: userId is not valid.' + ' userId ' + userId);
    const error = new CustomApiError(ErrorCodes.INVALID_INPUT, 'userId',
      ReadableNames.USER);
    return res.status(error.getHttpStatus()).send(error.getErrorInfo());
  }

  return COCOService.getUserAccessTokenById(userId)
    .then((userToken) => {
      logger.info('fetchUserToken: fetched coco access token for user' + userId);
      return res.send(userToken);

    }).catch((err) => {
      logger.error('fetchUserToken: error occurred while fetching user access token',
        err);
      const error =  new CustomApiError(ErrorCodes.INTERNAL_SERVER_ERROR);
      return res.status(error.getHttpStatus()).send(error.getErrorInfo());
    });
};
