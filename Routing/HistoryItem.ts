module PushUp.Framework.Routing {

    export class HistoryItem {

        /**
         * Indicates the page the state is for
         *
         * @property    _pageName
         * @private
         * @type        {string}
         */
        private pageName:string;

        /**
         * Indicates that arguments to the page
         *
         * @property    _pageParams
         * @private
         * @type        {Object}
         */
        private pageParams:{
            [key: string]: string;
        };

        /**
         * This class is used to provide a common interface for describing a page's state and being able to persist it
         *
         * @class   HistoryItem
         *
         * @param pageName
         * @param params
         * @constructor
         *
         * @author  Kegan Myers <kegan@pushup.com>
         * @version 0.2.0
         */
            constructor(pageName:string, params:{
            [key: string]: string;
        }) {
            this.pageName = pageName;
            this.pageParams = params;
        }

        /**
         * Create a HistoryItem from a string representation of one
         * Foo/bar:baz/any:argument/you:want/goes:here
         *
         * @param path
         * @returns {PushUp.Framework.Routing.HistoryItem}
         */
        public static FromString(path:string):HistoryItem {
            var pieces:string[] = path.split("/"), arguments:{
                [key: string]: string;
            } = {};

            var page:string = pieces.shift();

            //Process anything after the first / as an argument
            var piece:string;
            while ((piece = pieces.shift()) != undefined) {
                var arg:string[] = piece.split(":");
                if (arg.length > 1) {
                    arguments[arg.shift()] = arg.join(":");
                }
            }

            return new HistoryItem(page, arguments);
        }

        public static CompareHistoryItems(item1:HistoryItem, item2:HistoryItem):boolean {
            if (item1.GetPageName() != item2.GetPageName()) {
                return false;
            }

            var key:string;
            var item1Params = item1.GetPageParams();
            var item2Params = item2.GetPageParams();
            for (key in item1Params) {
                if (item1Params.hasOwnProperty(key) && (!item2Params.hasOwnProperty(key) || item2Params[key] != item1Params[key])) {
                    return false;
                }
            }

            for (key in item2) {
                if (item2.hasOwnProperty(key) && !item1.hasOwnProperty(key)) {
                    return false;
                }
            }

            return true;
        }

        /**
         * Return the name of the current page
         *
         * @returns {string}
         */
        public GetPageName():string {
            return this.pageName;
        }

        /**
         * Return the arguments to the current page
         *
         * @returns {{}}
         */
        public GetPageParams():{
            [key: string]: string;
        } {
            return this.pageParams;
        }

        /**
         * Creates a string representation of a page, returns an empty string for transient pages
         *
         * @returns {string}
         */
        public ToString():string {
            var returnValue:string = this.pageName, name:string;
            for (name in this.pageParams) {
                //noinspection JSUnfilteredForInLoop
                returnValue += "/" + name + ":" + this.pageParams[name];
            }

            return returnValue;
        }

        /**
         * Determines if the current HistoryItem is the same as another
         *
         * @param input
         * @returns {boolean}
         */
        public CompareTo(input:HistoryItem):boolean {
            return HistoryItem.CompareHistoryItems(this, input);
        }
    }
}