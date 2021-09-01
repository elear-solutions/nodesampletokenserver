/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Exports the common code functionalities after performing
 * required initialisations with the common code library
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

import common from 'elear-node-libs/coco-store-common';
import { SERVICE_NAME } from '../utils/constants';

// Initialise the common code with the service name and store the handler
const cocoStoreCommon = common(SERVICE_NAME).getInstance();

// Initialise the custom api error with the error codes specific to this microservice
export const error = cocoStoreCommon.error();

// Export CustomApiError, HttpStatus and ErrorCodes
export const CustomApiError = error.CustomApiError;
export const HttpStatus = error.HttpStatus;
export const ErrorCodes = error.ErrorCodes;

// Export the security configurations
export const security = cocoStoreCommon.security;

// Export logger
export const logger = cocoStoreCommon.logger;

// Export the utility functionalities
export const commonUtils = cocoStoreCommon.utils;

