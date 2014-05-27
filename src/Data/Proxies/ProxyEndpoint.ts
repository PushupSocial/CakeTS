/**
 * @namespace   CakeTS.Data.Proxies
 * @module      Data
 * @submodule   ProxyEndPoint
 */
module CakeTS.Data.Proxies {
    import HttpProtocol = Typertext.Http.HttpProtocol;
    export class ProxyEndpoint {
        /**
         */
        private domain: string;

        /**
         */
        private protocol: HttpProtocol;

        /**
         */
        private path: string;

        /**
         */
        private port: number;

        /**
         * This class serves to provide a common interface for passing around the important
         * identifying bits of an api endpoint, all other data such as path, query, POST data,
         * etc. is specific to each query and is not stored here.
         *
         * TODO Document privates
         *
         * @class       ProxyEndpoint
         * @constructor
         * @param       {string}          domain
         * @param       {HttpProtocol}    protocol
         * @param       {string}          path
         * @param       {number}          port
         *
         * @uses        Typertext.Http.HttpProtocol
         *
         * @author      Kegan Myers <kegan@pushup.com>
         * @version     0.2.1
         */
        constructor(domain: string, protocol: HttpProtocol = HttpProtocol.https, path: string = "", port: number = 0) {
            this.domain = domain;
            this.protocol = protocol;
            this.path = path;
            this.port = port;
        }

        /**
         * Accessor method
         *
         * @returns {string}
         */
        public GetDomain(): string {
            return this.domain;
        }

        /**
         * Accessor method
         *
         * @returns {HttpProtocol}
         */
        public GetProtocol(): HttpProtocol {
            return this.protocol;
        }

        /**
         * Accessor method
         *
         * @returns {string}
         */
        public GetPath(): string {
            return this.path;
        }

        /**
         * Accessor method
         *
         * @returns {number}
         */
        public GetPort(): number {
            return this.port;
        }
    }
}