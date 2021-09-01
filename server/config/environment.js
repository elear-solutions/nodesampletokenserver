/*===============================================================================*/
/*********************************************************************************/
/**
  * @fileOverview envionment - File for configuring environment variables
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

/** for adding configuraable fields */
export const Environment = {
  // Port on which the server will be listening to
  "PORT": process.env.PORT || 8080,

  // COCO service info
  // COCO API url
  "COCO_API_URL": process.env.COCO_API_URL || "https://api.getcoco.buzz",
  // COCO Service application client id
  "COCO_CLIENT_ID": process.env.COCO_CLIENT_ID || "7d29ba284d8d367ff499",
  // COCO service application secret
  "COCO_CLIENT_SECRET": process.env.COCO_CLIENT_SECRET
    || "3dd6728b37d8497553c974afea27429369bbadfe",
};
