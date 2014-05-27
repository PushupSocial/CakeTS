/// <reference path="ProxyStatus.ts" />

/**
 * @namespace   CakeTS.Data.Proxies
 * @module      Data
 * @submodule   Proxies
 */
module CakeTS.Data.Proxies {
    import ProxyStatus = CakeTS.Data.Proxies.ProxyStatus;

    export class ProxyResponse {
        /**
         * Whether the request that this response corresponds to was successful or not,
         * and the mode of failure
         *
         * @property    status
         * @private
         * @type        {ProxyStatus}
         *
         */
        private status: ProxyStatus;

        /**
         * Whatever data was received from the server
         *
         * @property    data
         * @private
         * @type        {any}
         */
        private data: any;

        /**
         * A class to simplify passing both the status and data of a completed proxy request
         *
         * @class       ProxyResponse
         * @constructor
         * @param       {ProxyStatus}   status
         * @param       {any}           data
         *
         * @uses        CakeTS.Data.Proxies.ProxyStatus
         *
         * @author      Kegan Myers <kegan@pushup.com>
         * @version     0.1.1
         */
        constructor(status: ProxyStatus, data: any = {}) {
            this.status = status;
            this.data = data;
        }

        /**
         * Accessor method
         *
         * @method  GetStatus
         * @returns {ProxyStatus}
         */
        public GetStatus(): ProxyStatus {
            return this.status;
        }

        /**
         * Accessor method
         *
         * @method  GetStatus
         * @returns {any}
         */
        public GetData(): any {
            return this.data;
        }
    }
}