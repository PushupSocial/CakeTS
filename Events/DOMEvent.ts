/// <reference path="Event.ts" />
/// <reference path="IDOMSender.ts" />
/// <reference path="IDOMEventArgs.ts" />
/// <reference path="../../../lib/jquery.d.ts" />

/**
 * @namespace   PushUp.Framework.Events
 * @module      Events
 */
module PushUp.Framework.Events {
    export class DOMEvent extends Event<IDOMEventArgs> {
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

            var self = this;

            // Attach the event directly to the element providing a callback
            // that fires our DOMEvent handlers
            sender.GetElement().on(event, selector || "", function(event: any) {
                // Fire our handlers
                self.Fire({
                    event: event, // The DOM event arguments
                    element: jQuery(this) // A jQuery instance of the element
                });
            });
        }
    }
}