/// <reference path="TSEvent.ts" />
/// <reference path="IDOMSender.ts" />
/// <reference path="IDOMEventArgs.ts" />
/// <reference path="../../../typings/jquery/jquery.d.ts" />

/**
 * @namespace   CakeTS.Events
 * @module      Events
 */
module CakeTS.Core.Events {
    export class DOMEvent extends TSEvent<IDOMEventArgs> {
        /**
         * DOM Event handler provides an interface to easily providing and listening
         * to DOM element events.
         *
         * @class       DOMEvent
         * @extends     Event<IDOMEventArgs>
         * @constructor
         * @param       {IDOMSender}            sender      A class that provides an interface to
         *                                                  accessing the element that sent the event.
         * @param       {string}                event       The name of the DOM event to listen on
         * @param       {string}                [selector]  An optional CSS3 selector to limit what element
         *                                                  to attach the event to.
         *
         * @uses        Event
         * @uses        IDOMEventARgs
         * @uses        IDOMSender
         * @uses        JQuery
         *
         * @author  Sean Templeton <sean@pushup.com>
         * @version 0.1
         */
        constructor(sender: IDOMSender, event: string, selector?: string) {
            super(sender);

            // Attach the event directly to the element providing a callback
            // that fires our DOMEvent handlers
            sender.GetElement().on(event, selector || "", (event: any): void => {
                // Fire our handlers
                this.Fire({
                    event: event, // The DOM event arguments
                    element: jQuery(this) // A jQuery instance of the element
                });
            });
        }
    }
}