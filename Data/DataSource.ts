/// <reference path="Proxies/IProxy.ts" />
/// <reference path="Proxies/ProxyResponse.ts" />
/// <reference path="Model.ts" />
/// <reference path="DataItem.ts" />


/**
 * @namespace   CakeTS.Data
 * @module      Data
 */
module CakeTS.Data {
    import Model = CakeTS.Data.Model;
    import IProxy = CakeTS.Data.Proxies.IProxy;
    import ProxyResponse = CakeTS.Data.Proxies.ProxyResponse;

    export class DataSource {
        private data:DataItem[];
        private model:Model;
        private proxy:IProxy;

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
         * @param       {DataItem[]}  prepopulatedData
         *
         * @uses        CakeTS.Data.Stores.IStorage
         * @uses        CakeTS.Data.Model
         * @uses        CakeTS.Data.DataItem
         * @uses        CakeTS.Data.Proxies.IProxy
         * @uses        CakeTS.Data.Proxies.ProxyResponse
         *
         * @author      Kegan Myers <kegan@pushup.com>
         * @version     0.2.1
         */
        constructor(proxyInstance:IProxy, prepopulatedData:DataItem[]=[]) {
            this.proxy = proxyInstance;
            this.data = prepopulatedData;
        }

        /**
         * This method is used to talk to whatever server was specified as the proxy
         *
         * @method  PerformRequest
         * @param   {Object}        requestData
         * @param   {Function}      callback
         */
        public PerformRequest(requestData: {}, callback:(data:any)=>void):void {
            var action = ()=>{
                callback(this.data);
            };

            //Skip the request if we already have the response
            if (this.data != null) {
                action();
                return;
            }

            //Or perform the request otherwise
            this.proxy.RawRequest(requestData, (response:ProxyResponse)=>{
                this.data = response.GetData();
                action();
            });
        }
    }
}
