/// <reference path="ProxyResponseHandler.ts" />
/// <reference path="../DataSource.ts" />
module PushUp.Framework.Data.Proxies {
    export interface IProxy {
        RawRequest(request:any, callback:ProxyResponseHandler);
    }
}