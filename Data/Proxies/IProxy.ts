/// <reference path="ProxyResponseHandler.ts" />
/// <reference path="../DataSource.ts" />
module CakeTS.Data.Proxies {
    export interface IProxy {
        RawRequest(request:any, callback:ProxyResponseHandler);
    }
}