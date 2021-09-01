/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Provides basic error framework for backend services with basic
 *               error codes, which can be extended to define custom error codes.
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

import { error } from '../config/common-config';

// Export CustomApiError and HttpStatus
export const CustomApiError = error.CustomApiError;
export const HttpStatus = error.HttpStatus;

/** List of Custom API ErrorCodes */
export const CustomErrorCodes  = {
};

// Export Error Codes
export const ErrorCodes = error.ErrorCodes(CustomErrorCodes);
