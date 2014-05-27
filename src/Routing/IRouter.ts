/// <reference path="../Core/Events/TSEvent.ts" />
/// <reference path="HistoryItem.ts" />
/// <reference path="IInterceptor.ts" />

module CakeTS.Routing {

    export interface IRouter {
        PageChange: CakeTS.Core.Events.TSEvent<HistoryItem>;
        RegisterPages: (pages: any) => void;
        AddInterceptor: (handler: IInterceptor, context: any) => void;
        ChangePage: (page: HistoryItem) => void;
    }
}
