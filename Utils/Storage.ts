module CakeTS.Utils {
    export class Storage {
        private static localStorageEnabled:boolean = (()=> {
            try {
                var test = 'test';
                window.localStorage.setItem(test, test);
                window.localStorage.getItem(test);
                window.localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        })();

        private static fallback:{[index:string]:any
        } = {};

        /**
         *
         * @param {string} key
         * @returns {*} The stored object, or null on failure
         * @constructor
         */
        public static Get(key:string):{
        } {
            if (Storage.localStorageEnabled) {
                try {
                    return JSON.parse(window.localStorage.getItem(key));
                } catch (e) {
                }
            }
            return Storage.fallback[key];
        }

        /**
         *
         * @param {string} key
         * @param {Object} value
         * @constructor
         */
        public static Set(key:string, value:Object):void {
            if (Storage.localStorageEnabled) {
                try {
                    window.localStorage.setItem(key, JSON.stringify(value));
                } catch (e) {
                }
            }
            Storage.fallback[key] = value;
        }

        public static Iterate(worker:(any)=>any):void {
            var result;
            if (Storage.localStorageEnabled) {
                for (var i = 0; i < window.localStorage.length; i++) {
                    var key = window.localStorage.key(i);
                    result = worker(window.localStorage.getItem(key));
                    if (!result) {
                        window.localStorage.removeItem(key);
                    } else {
                        window.localStorage.setItem(key, result);
                    }
                }
            }
            result = worker(Storage.fallback);
            if (!result) {
                Storage.fallback = {};
            } else {
                Storage.fallback = result;
            }
        }

        public static NativeEnabled():boolean {
            return Storage.localStorageEnabled;
        }
    }
}