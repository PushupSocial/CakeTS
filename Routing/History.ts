/**
 */
/// <reference path="../lib/jquery.d.ts" />
/// <reference path="HistoryItem.ts" />

module PushUp.Framework.Routing {
    export class History {
        private static _pastStates:HistoryItem[] = [];
        private static _maxPastStates:number = 20;

        static PushState(state:HistoryItem):void {
            History._pastStates.push(state);
            if (History._pastStates.length > this._maxPastStates) {
                History._pastStates.unshift();
            }
        }

        static GetPastStates():HistoryItem[] {
            return History._pastStates;
        }
    }
}