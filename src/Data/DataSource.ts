/// <reference path="Proxies/IProxy.ts" />
/// <reference path="Proxies/ProxyResponse.ts" />
/// <reference path="Model.ts" />
/// <reference path="IDataItem.ts" />


/**
 * @namespace   CakeTS.Data
 * @module      Data
 */
module CakeTS.Data {
    import IProxy = CakeTS.Data.Proxies.IProxy;
    import ProxyResponse = CakeTS.Data.Proxies.ProxyResponse;

    export class DataSource {
        private data: IDataItem[];
        private proxy: IProxy;

        /**
         * Data source is the class used by the PushUp application to interact with
         * external data sources such as APIs, including the primary PushUpAPI
         *
         * TODO document privates
         *
         * @class       DataSource
         * @constructor
         * @param       {IProxy}    proxyInstance
         * @param       {Model}     modelInstance
         * @param       {IDataItem[]}  prepopulatedData
         *
         * @uses        CakeTS.Data.Stores.IStorage
         * @uses        CakeTS.Data.Model
         * @uses        CakeTS.Data.IDataItem
         * @uses        CakeTS.Data.Proxies.IProxy
         * @uses        CakeTS.Data.Proxies.ProxyResponse
         *
         * @author      Kegan Myers <kegan@pushup.com>
         * @version     0.2.1
         */
            constructor(proxyInstance: IProxy, prepopulatedData: IDataItem[] = []) {
            this.proxy = proxyInstance;
            this.data = prepopulatedData;
        }

        /**
         * TODO: This method is used to perform validation on data and callback.
         *
         * @method  ExecuteCallback
         * @param   {Function}    callback
         */
        private ExecuteCallback(callback: (data: any) => void): void {
            callback(this.data);
        }

        /**
         * This method is used to talk to whatever server was specified as the proxy
         *
         * @method  PerformRequest
         * @param   {Object}        requestData
         * @param   {Function}      callback
         */
        public PerformRequest(requestData: {
        }, callback: (data: any) => void): void {

            //Skip the request if we already have the response
            if (this.data != null) {
                this.ExecuteCallback(callback);
                return;
            }

            //Or perform the request otherwise
            this.proxy.RawRequest(requestData, (response: ProxyResponse): void => {
                this.data = response.GetData();
                this.ExecuteCallback(callback);
            });
        }
    }
}
