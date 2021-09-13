/*===============================================================================*/
/*********************************************************************************/
/**
  * @fileOverview constants - File for defining constants
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

// service name to be used in logs
export const SERVICE_NAME = "SAMPLETOKENSERVER";

// COCO oauth grant types
export const OAuthGrantTypes = {
  CLIENT_CREDENTIALS: "client_credentials",
  REFRESH_TOKEN: "refresh_token"
};

export const HttpStatus = {
  OK: 200,
  INVALID_INPUT: 400,
  INTERNAL_SERVER_ERROR: 500,
  MISSING_PARAM: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
};

// COCO auth token time out buffer
export const AUTH_TOKEN_TIMEOUT_BUFFER = 2000;
