module CakeTS.Data.Proxies {
    export interface IProxyResponseHandler {
        (data: ProxyResponse): void
    }
}