/// <reference path="IProxy.ts" />
/// <reference path="ProxyResponse.ts" />
/// <reference path="IProxyResponseHandler.ts" />
/// <reference path="ProxyStatus.ts" />
/// <reference path="ProxyEndpoint.ts" />
/// <reference path="../../../bower_components/Typertext/build/typertext.d.ts" />
/// <reference path="../../Events/Event.ts" />
/// <reference path="../../Core/Errors/UnauthenticatedAccessError.ts" />
/// <reference path="../../Core/Errors/AuthenticationError.ts" />

/**
 * @namespace   CakeTS.Data.Proxies
 * @module      Data
 * @submodule   Proxies
 */

/* tslint:disable:forin */
module CakeTS.Data.Proxies {
    import IProxy = CakeTS.Data.Proxies.IProxy;
    import ProxyResponse = CakeTS.Data.Proxies.ProxyResponse;
    import ProxyStatus = CakeTS.Data.Proxies.ProxyStatus;

    import JsonRequest = Typertext.Json.JsonRequest;
    import HttpUrl = Typertext.Http.HttpUrl;

    import Events = CakeTS.Events;

    import UnauthenticatedAccessError = CakeTS.Core.Errors.UnauthenticatedAccessError;

    export class PushUpAPI implements IProxy {
        /**
         * TODO: DOCUMENT THIS KEGAN
         *
         * @property    PageChange
         * @type        {Event<HistoryItem>}
         */
        public AuthenticationUpdate: Events.Event<PushUpAPI>;

        /**
         *
         * @property    _Endpoint
         * @private
         * @type        {ProxyEndpoint}
         */
        private _Endpoint: HttpUrl;

        /**
         *
         * @property    _AccessToken
         * @private
         * @type        {string}
         */
        private _AccessToken: string = "";

        /**
         *
         * @property    _AccessTokenExpiration
         * @private
         * @type        {number}
         */
        private _AccessTokenExpiration: number = 0;

        /**
         * A class through which interaction with the PushUp Social API is acomplished. Most
         * requests must occur after Authenticate() has been called
         *
         *
         * TODO Correct  private names
         *
         * @class
         * @constructor
         * @param       {string}    endpoint
         * @param       {string}    accessToken
         * @param       {number}    accessTokenExpiration
         *
         * @uses        CakeTS.Data.Proxies.IProxy
         * @uses        CakeTS.Data.Proxies.ProxyResponse
         * @uses        CakeTS.Data.Proxies.ProxyStatus
         * @uses        Typertext.Json.JsonRequest
         * @uses        Typertext.Http.HttpUrl
         * @uses        Tyeprtext.Http.HttpProtocol
         * @uses        Tyeprtext.Http.HttpResponseStatus
         *
         * @author      Kegan Myers <kegan@pushup.com>
         * @version     0.2.1
         */
            constructor(endpoint: HttpUrl, accessToken?: string, accessTokenExpiration?: number) {
            this._Endpoint = endpoint;
            this._AccessToken = accessToken;
            this._AccessTokenExpiration = accessTokenExpiration;

            //Create the event object
            this.AuthenticationUpdate = new Events.Event<PushUpAPI>(this);
        }

        public RawResponse(response: Typertext.Json.JsonResponse): ProxyResponse {
            //This indicates that the access token is no longer valid
            var statusCode: number = response.GetHttpStatus();
            if (statusCode === 401) {
                if (this.Authenticated()) {
                    this._AccessToken = null;
                    this._AccessTokenExpiration = 0;
                    this.AuthenticationUpdate.Fire(this);
                }
            }

            var requestStatus: ProxyStatus;
            if (response.GetStatus() === Typertext.Http.HttpResponseStatus.success) {
                requestStatus = ProxyStatus.Success;
            } else if (statusCode >= 500 && statusCode < 600) {
                requestStatus = ProxyStatus.ServerError;
            } else if (statusCode >= 400 && statusCode < 500) {
                requestStatus = ProxyStatus.ClientError;
            } else {
                requestStatus = ProxyStatus.UnknownError;
            }

            return new ProxyResponse(requestStatus, response.GetContent());
        }

        /**
         * This method interacts with the API Endpoint to send and recieve data. If the
         * client is authenticated, that data is automatically added to the request as
         * a query string parameter
         *
         * @method  RawRequest
         * @param   {any}                   request
         * @param   {ProxyResponseHandler}  callback
         *
         * @reutrn  {void}
         */
        public RawRequest(request: any, callback: IProxyResponseHandler): void {
            var cb: (response: Typertext.Json.JsonResponse) => void = (response: Typertext.Json.JsonResponse): void => {
                callback(this.RawResponse(response));
            };

            if (typeof request !== "object") {
                request = {};
            }

            if (!("queryString" in request)) {
                request["queryString"] = {};
            } else if (typeof request["queryString"] !== "object") {
                throw {};
            }

            if (typeof request["queryString"]["access_token"] === "undefined" || request["queryString"]["access_token"] !== false) {
                if (!this.Authenticated()) {
                    throw new UnauthenticatedAccessError(request);
                }

                request["queryString"]["access_token"] = this.GetAccessToken();
            } else {
                delete request["queryString"]["access_token"];
            }


            if (!("postData" in request)) {
                request["postData"] = {};
            } else if (typeof request["postData"] !== "object") {
                throw{};
            }

            if (request["method"] === "GET") {
                var newRequest: any = request["postData"],
                    item: any;

                delete request["postData"];

                for (item in request["queryString"]) {
                    newRequest[item] = request["queryString"][item];
                }
                request["queryString"] = newRequest;
            }

            if (!("path" in request) || typeof request["path"] !== "string") {
                request["path"] = "/";
            } else if (request["path"].indexOf("/") !== 0) {
                request["path"] = "/" + request["path"];
            }

            if (request["path"].lastIndexOf("/") !== request["path"].length - 1) {
                request["path"] = request["path"] + "/";
            }

            try {
                var serverRequest: JsonRequest = new JsonRequest();
                //serverRequest.Get();
                var url: HttpUrl = HttpUrl.FromUrl(
                    this._Endpoint.ToString() +
                    request["path"] +
                    Typertext.Http.HttpUrl.EncodeQueryString(request["queryString"])
                );
                switch (request["method"]) {
                    case "DELETE":
                        serverRequest.Delete(url, cb);
                        break;
                    case "POST":
                        serverRequest.Post(url, request["postData"], cb);
                        break;
                    case "PUT":
                        serverRequest.Put(url, request["postData"], cb);
                        break;
                    case "GET":
                    default:
                        serverRequest.Get(url, cb);
                }
            } catch (e) {
                //Server errors should be caught here, and the client informed of them
                callback(new ProxyResponse(ProxyStatus.ServerError));
            }
        }

        /**
         *
         * @param   {string}    accessToekn
         * @param   {number}    expiresIn
         *
         * @return  {void}
         */
        public Authenticate(accessToken: string, expiresAt: number): void {
            this._AccessToken = accessToken;
            this._AccessTokenExpiration = expiresAt;
            this.AuthenticationUpdate.Fire(this);
        }

        /**
         * A convenience method to see if the client is currently authenticated against the
         * PushUp Social API
         *
         * @returns {boolean}
         */
        public Authenticated(): boolean {
            return this._AccessToken !== "" && this._AccessTokenExpiration > (new Date().getTime() / 1000);
        }

        /**
         *
         * This method is used to remote the access token and fire an update
         */
        public Deauthenticate(): void {
            this._AccessToken = "";
            this._AccessTokenExpiration = 0;
            this.AuthenticationUpdate.Fire(this);
        }

        public GetAccessToken(): string {
            if (!this.Authenticated()) {
                //TODO throw a proper exception
                throw {};
            }

            return this._AccessToken;
        }

        public GetAccessTokenExpiration(): number {
            if (!this.Authenticated()) {
                //TODO throw a proper exception
                throw {};
            }

            return this._AccessTokenExpiration;
        }

        public GetEndpoint(): HttpUrl {
            return this._Endpoint;
        }
    }
}