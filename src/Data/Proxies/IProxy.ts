/// <reference path="IProxyResponseHandler.ts" />
module CakeTS.Data.Proxies {
    export interface IProxy {
        RawRequest(request: any, callback: IProxyResponseHandler): void;
    }
}