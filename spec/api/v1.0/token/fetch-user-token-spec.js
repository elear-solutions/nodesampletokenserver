/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains test cases for fetch user token API
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

import nock from 'nock';
import request from 'request';
import { baseUrl } from '../../../utils/utils';
import { Environment } from '../../../../config/environment';

const reqfetchUserAccessToken = (body) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      url: `${baseUrl}/fetch-user-token`,
      body,
      json: true,
    }, (err, response) => {
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  });
};

describe('post /v1.0/coco-api/fetch-user-token', () => {

  beforeAll(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    nock.cleanAll();
  });

  it('Negative Scenario: userId is not sent in requset body', (done) => {
    return reqfetchUserAccessToken({})
      .then((res)  => {
        expect(res.statusCode).toBe(400);
        done();
      }).catch(done.fail);
  });

  it('Negative Scenario: userId is not string in requset body', (done) => {
    return reqfetchUserAccessToken({ userId: 2 })
      .then((res)  => {
        expect(res.statusCode).toBe(400);
        done();
      }).catch(done.fail);
  });

  it('Positive Scenario: fetched user access token', (done) => {
    nock(Environment.COCO_API_URL)
      .post('/oauth/external-user-token')
      .reply(200, { firstName: "venkata", lastName: "Deekshith" });
    return reqfetchUserAccessToken({ userId: "5e71e87bf6a95e0016e7901e" })
      .then((res)  => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        done();
      }).catch(done.fail);
  });

  it('Positive Scenario: fetched user access token, when coco token expired', (done) => {
    nock(Environment.COCO_API_URL)
      .post('/oauth/external-user-token')
      .reply(401);
    nock(Environment.COCO_API_URL)
      .post('/oauth/external-user-token')
      .reply(200, { firstName: "venkata", lastName: "Deekshith" });
    return reqfetchUserAccessToken({ userId: "5e71e87bf6a95e0016e7901e" })
      .then((res)  => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        done();
      }).catch(done.fail);
  });

  it('Negitive Scenario: fetch user token error when coco api throwing error', (done) => {
    nock(Environment.COCO_API_URL)
      .post('/oauth/external-user-token')
      .reply(400);
    return reqfetchUserAccessToken({ userId: "5e71e87bf6a95e0016e7901e" })
      .then((res)  => {
        expect(res.statusCode).toBe(500);
        done();
      }).catch(done.fail);
  });
});
