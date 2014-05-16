/// <reference path="../Events/Event.ts" />
/// <reference path="../Routing/History.ts" />
/// <reference path="../lib/knockout.d.ts" />
/// <reference path="../lib/jquery.d.ts" />

module CakeTS.UI {
    import Events = CakeTS.Events;
    import HistoryItem = CakeTS.Routing.HistoryItem;

    export class ViewModel {
        private _rootElement: JQuery;

        public Navigate: Events.Event<HistoryItem>;

        constructor(scope?: string);
        constructor(scope?: JQuery);
        constructor(scope?: any) {
            this.Navigate = new Events.Event(this);

            if(typeof scope == 'undefined') {
                return;
            }

            switch(typeof scope) {
                case "string":
                    scope = jQuery(scope);
                    break;
                case "undefined":
                    scope = jQuery("<div>");
                    break;
            }

            this._rootElement = scope;

            ko.applyBindings(this, this._rootElement[0]);
        }

        public GetElement(): JQuery {
            return this._rootElement;
        }

        public SetElement(element: JQuery): void {
            this._rootElement = element;
        }

        public NavigatePage(page: string, args: { [index:string]: string }): void {
            this.Navigate.Fire(new HistoryItem(page, args));

        }

        public Destroy():void {
            ko.cleanNode(this._rootElement[0]);
        }
    }
}