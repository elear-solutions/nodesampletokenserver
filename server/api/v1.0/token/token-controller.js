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

import { COCOService } from '../../../service/coco-service';
import { HttpStatus } from '../../../utils/constants';

/**
 * Executes to provide user access token for non coco users
 * @param {String} userId - uniqueIdentification of user
 */

export const fetchUserToken = (req, res) => {
  const { userId } = req.body;

  // Check if userId is sent
  if (userId === undefined) {
    console.log('fetchUserToken: user id not sent');
    return res.status(HttpStatus.MISSING_PARAM).send();
  }

  // Check if userId is a string
  if (typeof(userId) !== 'string') {
    console.log('fetchUserToken: userId is not valid.' + ' userId ' + userId);
    return res.status(HttpStatus.INVALID_INPUT).send();
  }

  return COCOService.getUserAccessTokenById(userId)
    .then((userToken) => {
      console.log('fetchUserToken: fetched coco access token for user' + userId);
      return res.send(userToken);

    }).catch((err) => {
      console.log('fetchUserToken: error occurred while fetching user access token',
        err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    });
};
