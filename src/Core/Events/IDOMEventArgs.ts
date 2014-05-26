/// <reference path="../../../typings/jquery/jquery.d.ts" />

module CakeTS.Core.Events {
    export interface IDOMEventArgs {
        event: any;
        element: JQuery;
    }
}