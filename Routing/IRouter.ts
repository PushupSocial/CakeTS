module CakeTS.Routing {
    export interface IRouter {
        PageChange: Events.Event<HistoryItem>;
        RegisterPages: (pages: any) => void;
        AddInterceptor: (handler: IInterceptor, context: any) => void;
        ChangePage: (page: HistoryItem) => void;
    }
}
