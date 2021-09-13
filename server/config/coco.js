/*===============================================================================*/
/*********************************************************************************/
/**
  * @fileOverview COCO configuration file to fetch access and refresh tokens
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
import { Environment } from './environment';
import { AUTH_TOKEN_TIMEOUT_BUFFER, OAuthGrantTypes, HttpStatus
} from '../utils/constants';

// COCO auth tokens
let COCOTokenInfo = {
  accessToken: null,
  refreshToken: null,
  expiryTime: null
};

/**
 * Requests and stores authentication token for COCO service
 */
const initialize = () => {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      url: `${Environment.COCO_API_URL}/oauth/token`,
      body: {
        grant_type: OAuthGrantTypes.CLIENT_CREDENTIALS,
        client_id: Environment.COCO_CLIENT_ID,
        client_secret: Environment.COCO_CLIENT_SECRET
      },
      json: true,
    }, (err, response, body) => {
      if (err || response.statusCode !== HttpStatus.OK) {
        console.log('initialize: Error occurred while'
          + ' fetching access token', err);
        return reject(err);
      }

      // Store access tokens of coco
      COCOTokenInfo.accessToken = body.access_token;
      COCOTokenInfo.refreshToken = body.refresh_token;

      // Store expiry time in millsec
      COCOTokenInfo.expiryTime = new Date().getTime() + body.expires_in * 1000;

      console.log('initialize: access token fetched and stored'
        + JSON.stringify(COCOTokenInfo));
      return resolve();
    });
  });
};

/**
 * Requests and re stores updated authentication token for COCO service
 */
const refreshTokens = () => {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      url: `${Environment.COCO_API_URL}/oauth/token`,
      body: {
        grant_type: OAuthGrantTypes.REFRESH_TOKEN,
        client_id: Environment.COCO_CLIENT_ID,
        client_secret: Environment.COCO_CLIENT_SECRET,
        refresh_token: COCOTokenInfo.refreshToken
      },
      json: true
    }, (err, response, body) => {
      if (err) {
        console.log('refreshTokens: Error occurred while'
          + ' fetching access token', err);
        return reject(HttpStatus.INTERNAL_SERVER_ERROR);
      }

      // Fetch new access token using grant type when refresh token is invalid
      if (response.statusCode !== HttpStatus.OK) {
        console.log('refreshTokens: refresh token is invalid fetching new');
        return initialize();
      }

      // Store access tokens of coco
      COCOTokenInfo.accessToken = body.access_token;
      COCOTokenInfo.refreshToken = body.refresh_token;

      // Store expiry time
      COCOTokenInfo.expiryTime = new Date().getTime() + body.expires_in * 1000;

      console.log('refreshTokens: access token fetched and stored');
      return resolve();
    });
  });
};

/**
 * Provides access token which will be used in COCO API's
 * @param {String} access_token - COCO access token
 */
const getCOCOAcessToken = () => {
  // Time stamp to validate access token
  let timestamp = new Date().getTime();

  return Promise.resolve()
    .then(() => {
      // Check if access token is expired,
      // if true refresh access token
      if (COCOTokenInfo.expiryTime - timestamp <= AUTH_TOKEN_TIMEOUT_BUFFER) {
        return refreshTokens();
      }

      return Promise.resolve();
    }).then(() => {
      return Promise.resolve(COCOTokenInfo.accessToken);
    }).catch((error) => {
      console.log('getCOCOAcessToken: error occured while fetching accesstoken', error);
      return Promise.reject(HttpStatus.INTERNAL_SERVER_ERROR);
    });
};

export const COCOConfig = {
  initialize,
  getCOCOAcessToken
};
