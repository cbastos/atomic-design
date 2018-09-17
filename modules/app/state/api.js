import request from 'superagent';

/* eslint space-unary-ops:0 */
/* eslint no-trailing-spaces:0 */
/* eslint camelcase:0 */
/* eslint eol-last:0 */

/**
 * 
 * @class WebApi
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class WebApi {
    constructor(domain = '', logger) {
        this.errorHandlers = [];
        this.domain = domain;
        this.logger = logger;
    }

    addErrorHandler(handler) {
        if (typeof handler !== 'function') throw new Error('You should register a function as error handler');
        this.errorHandlers.push(handler);
    }

    request(method, url, body, headers, queryParameters, form, reject, resolve) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        const req = request(method, url).query(queryParameters);

        Object.keys(headers).forEach(key => req.set(key, headers[key]));

        if (body) {
            req.send(body);
        }

        if (typeof(body) === 'object' && !(body.constructor.name === 'Buffer')) {
            req.set('Content-Type', 'application/json');
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        req.end((error, response) => {
            if (error || !response.ok) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    /**
     * 
     * @method
     * @name WebApi#Users_GetUserList
     */
    Users_GetUserList(parameters = {}) {
        const {
            domain
        } = this;
        let path = '/api/users';
        let body;
        let queryParameters = {};
        const headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }
    /**
     * 
     * @method
     * @name WebApi#Users_CreateUser
     * @param {} request - 
     */
    Users_CreateUser(parameters = {}) {
        const {
            domain
        } = this;
        let path = '/api/users';
        let body;
        let queryParameters = {};
        const headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['request'] !== undefined) {
                body = parameters['request'];
            }

            if (parameters['request'] === undefined) {
                reject(new Error('Missing required  parameter: request'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }
    /**
     * 
     * @method
     * @name WebApi#Users_GetUser
     * @param {integer} id - 
     */
    Users_GetUser(parameters = {}) {
        const {
            domain
        } = this;
        let path = '/api/users/{id}';
        let body;
        let queryParameters = {};
        const headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }
    /**
     * 
     * @method
     * @name WebApi#Users_UpdateUser
     * @param {integer} id - 
     * @param {} request - 
     */
    Users_UpdateUser(parameters = {}) {
        const {
            domain
        } = this;
        let path = '/api/users/{id}';
        let body;
        let queryParameters = {};
        const headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['request'] !== undefined) {
                body = parameters['request'];
            }

            if (parameters['request'] === undefined) {
                reject(new Error('Missing required  parameter: request'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }
    /**
     * 
     * @method
     * @name WebApi#Users_DeleteUser
     * @param {integer} id - 
     */
    Users_DeleteUser(parameters = {}) {
        const {
            domain
        } = this;
        let path = '/api/users/{id}';
        let body;
        let queryParameters = {};
        const headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach((parameterName) => {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }
}