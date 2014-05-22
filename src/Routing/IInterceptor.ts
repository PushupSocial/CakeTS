module CakeTS.Routing {
    export interface IInterceptor {
        (item: HistoryItem): HistoryItem
    }
}