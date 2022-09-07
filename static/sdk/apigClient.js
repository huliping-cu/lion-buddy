/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.respemailPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['recipientname', 'recipientemail', 'sourcename', 'sourceemail'], ['body']);
        
        var respemailPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/respemail').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['recipientname', 'recipientemail', 'sourcename', 'sourceemail']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(respemailPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.respemailOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['recipientname', 'recipientemail', 'sourcename', 'sourceemail'], ['body']);
        
        var respemailOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/respemail').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['recipientname', 'recipientemail', 'sourcename', 'sourceemail']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(respemailOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.restaurantOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var restaurantOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/restaurant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(restaurantOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.restaurantCuisineGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['cuisine'], ['body']);
        
        var restaurantCuisineGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/restaurant/{cuisine}').expand(apiGateway.core.utils.parseParametersToObject(params, ['cuisine'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(restaurantCuisineGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.restaurantCuisineOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var restaurantCuisineOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/restaurant/{cuisine}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(restaurantCuisineOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['cuisine', 'firstName'], ['body']);
        
        var usersPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cuisine', 'firstName']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersGetuserGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersGetuserGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/users/getuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersGetuserGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersGetuserPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersGetuserPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/getuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersGetuserPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersGetuserOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersGetuserOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/getuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersGetuserOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersImguserOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersImguserOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/imguser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersImguserOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersImguserBucketOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersImguserBucketOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/imguser/{bucket}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersImguserBucketOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersImguserBucketFilenamePut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['filename', 'Content-Type', 'bucket', 'x-amz-meta-userEmail'], ['body']);
        
        var usersImguserBucketFilenamePutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/users/imguser/{bucket}/{filename}').expand(apiGateway.core.utils.parseParametersToObject(params, ['filename', 'bucket', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Content-Type', 'x-amz-meta-userEmail']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersImguserBucketFilenamePutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersImguserBucketFilenameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersImguserBucketFilenameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/imguser/{bucket}/{filename}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersImguserBucketFilenameOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersMatchuserGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersMatchuserGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/users/matchuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersMatchuserGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersMatchuserOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersMatchuserOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/matchuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersMatchuserOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersUpdateuserPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersUpdateuserPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/updateuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersUpdateuserPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersUpdateuserOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersUpdateuserOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/updateuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersUpdateuserOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
