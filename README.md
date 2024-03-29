| ENVIRONMENT | CI BUILD | CI SONARQUBE | CD BUILD | CD DEPLOYMENT |
| --- | --- | --- | --- | --- |
|<p align="left"> **DEV** </p>|<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/develop/ci-build.svg) </p>| <p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/develop/ci-sonarqube.svg) </p> |<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/develop/cd-build.svg) </p>|<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/develop/cd-deploy.svg) </p>|
|<p align="left"> **STAGING** </p>|<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/release/ci-build.svg) </p>|<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/release/ci-sonarqube.svg) </p>|<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/release/cd-build.svg) </p>|<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/release/cd-deploy.svg) </p>| 
|<p align="left"> **PROD** </p>|<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/master/ci-build.svg) </p>|<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/master/ci-sonarqube.svg) </p>|<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/master/cd-build.svg) </p>|<p align="center"> ![Generic badge](https://eleargithubbadge.s3.ap-south-1.amazonaws.com/sampletokenserver/master/cd-deploy.svg) </p>|


# nodesampletokenserver

This is sample service application of COCO to allow non coco users to access the COCONet functionality
## Integration workflow for third-party systems
![image info](./thirdPartyUserAuthFlow.png) 

## Prerequisite
1. Create an oauth application at https://manage.getcoco.buzz with application type as `service` and get client Id and client Secret
2. Install docker and curl in your machine - `sudo apt-get install -y docker.io curl`.
3. Make sure you are using node 14.17.6

## Steps to use this application
1. Build source code - `npm ci && npm run-script build`.
2. Build docker image - `sudo docker build . -t sampletokenserver:latest`
3. Run application - `sudo docker run -d -e COCO_API_URL="https://api.getcoco.buzz" -e COCO_CLIENT_ID="client Id of your oauth application" -e COCO_CLIENT_SECRET="client Secret of your oauth application" -p 8080:8080 sampletokenserver:latest`
4. Get external user coco access token - run `curl -X POST http://localhost:8080/v1.0/token/fetch-user-token -H 'Content-Type: application/json' -d '{"userId":"123456789"}'`

