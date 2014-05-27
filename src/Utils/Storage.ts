module CakeTS.Utils {
    export class Storage {
        private static localStorageEnabled: boolean = Storage.CheckLocalStorage(window.localStorage);

        /**
         * This is here for testing. Used to be inline but needed the ability
         * to override the location of the storage for testing.
         *
         * @param   {Storage}   storage
         * @returns {boolean}
         */
        public static CheckLocalStorage(storage: any): boolean {
            try {
                var test: string = "test";
                storage.setItem(test, test);
                storage.getItem(test);
                storage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        }

        private static fallback: {[index: string]: any
        } = {};

        /**
         *
         * @param {string} key
         * @returns {*} The stored object, or null on failure
         * @constructor
         */
        public static Get(key: string): {
        } {
            if (Storage.localStorageEnabled) {
                try {
                    return JSON.parse(window.localStorage.getItem(key));
                } catch (e) {
                    // Do nothing
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
        public static Set(key: string, value: Object): void {
            if (Storage.localStorageEnabled) {
                try {
                    window.localStorage.setItem(key, JSON.stringify(value));
                } catch (e) {
                    // Do nothing
                }
            }
            Storage.fallback[key] = value;
        }

        public static Iterate(worker: (arg: any) => any): void {
            var result: any;
            if (Storage.localStorageEnabled) {
                for (var i: number = 0; i < window.localStorage.length; i++) {
                    var key: string = window.localStorage.key(i);
                    // Call the worker
                    result = worker(window.localStorage.getItem(key));
                    if (!result) {
                        window.localStorage.removeItem(key);
                        i--;
                    } else {
                        window.localStorage.setItem(key, result);
                    }
                }
            } else {
                result = worker(Storage.fallback);
                if (!result) {
                    Storage.fallback = {};
                } else {
                    Storage.fallback = result;
                }
            }
        }

        public static NativeEnabled(): boolean {
            return Storage.localStorageEnabled;
        }
    }
}