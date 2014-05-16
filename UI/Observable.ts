/// <reference path="../lib/knockout.d.ts" />

module CakeTS.UI {

    export class Observable {
        constructor(data: any) {
            if(data instanceof Array)
                return ko.observableArray(data);

            if(typeof data == "function")
                return ko.computed(data);

            return ko.observable(data);
        }
    }
}