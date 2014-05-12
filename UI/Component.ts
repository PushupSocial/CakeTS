/// <reference path="../lib/jquery.d.ts" />
/// <reference path="../Events/DOMEvent.ts" />
/// <reference path="../Routing/IRouter.ts" />
/// <reference path="../Routing/HistoryItem.ts" />

module PushUp.Framework.UI {
    import IDOMSender = PushUp.Framework.Events.IDOMSender;
    import IRouter = PushUp.Framework.Routing.IRouter;
    import HistoryItem = PushUp.Framework.Routing.HistoryItem;

    export class Component implements IDOMSender {
        private _element: JQuery;
        private _router: IRouter;

        constructor(router: IRouter) {
            this._router = router;
        }

        public GetRouter(): IRouter {
            return this._router;
        }

        public GetElement(): JQuery { return this._element; }

        public SetElement(selector: string): void { this._element = jQuery(selector); }

        public HasPage(pages: any, page: string): boolean {
            var item:string;
            for (item in pages) {
                if (pages.hasOwnProperty(item))
                //We need reverse lookup if anything, so prepare that
                    if(pages[item] == page)
                        return true
            }

            return false;
        }

        public AuthenticationCheck(pageName:string):boolean {
            return false;
        }

        public InterceptChange(item:HistoryItem):HistoryItem {
            return item;
        }
    }
}