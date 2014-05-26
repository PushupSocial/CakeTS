/// <reference path="../Core/Events/TSEvent.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

module CakeTS.UI {
    import TSEvent = CakeTS.Core.Events.TSEvent;
    import HistoryItem = CakeTS.Routing.HistoryItem;

    export class ViewModel {
        private _rootElement: JQuery;

        public Navigate: TSEvent<HistoryItem>;

        constructor(scope?: string);
        constructor(scope?: JQuery);
        constructor(scope?: any) {
            this.Navigate = new TSEvent(this);

            if (typeof scope === "undefined") {
                return;
            }

            switch (typeof scope) {
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

        public NavigatePage(page: string, args: { [index: string]: string
        }): void {
            this.Navigate.Fire(new HistoryItem(page, args));
        }

        public Destroy(): void {
            ko.cleanNode(this._rootElement[0]);
        }
    }
}