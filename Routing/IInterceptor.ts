
module PushUp.Framework.Routing {

    export interface IInterceptor {
        (item:HistoryItem):HistoryItem
    }
}