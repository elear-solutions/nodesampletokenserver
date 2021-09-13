/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains API calls to communicate with coco.
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

import request from "request";
import { Environment } from "../config/environment";
import { COCOConfig } from '../config/coco';
import { HttpStatus } from '../utils/constants';

/**
 * Get user access token by Id
 * @param {String} userId - unique identification Id of coco or other user
 */
const getUserAccessTokenById = (userId) => {
  return COCOConfig.getCOCOAcessToken()
    .then((token) => {
      return new Promise((resolve, reject) => {
        request({
          method: 'post',
          url: `${Environment.COCO_API_URL}/oauth/external-user-token`,
          body: { userId },
          headers: {
            "Authorization": `Bearer ${token}`
          },
          json: true,
        }, (err, response) => {
          if (err || !(response.statusCode === HttpStatus.OK ||
             response.statusCode === HttpStatus.UNAUTHORIZED)) {
            console.log('getUserAccessTokenById: Error occurred in coco' +
               ' server while retrieving user access token ', err);
            return reject(HttpStatus.INTERNAL_SERVER_ERROR);
          }

          if (response.statusCode === HttpStatus.UNAUTHORIZED) {
            console.log('getUserAccessTokenById: Access token expired fetching'
              + 'new access token' + err);
            return resolve(getUserAccessTokenById(userId));
          }
          return resolve(response.body);
        });
      });
    });
};

// contains function for different api requests on coco
export const COCOService = {
  getUserAccessTokenById
};
