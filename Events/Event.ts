/// <reference path="IEventHandler.ts" />

/**
 * @namespace   PushUp.Framework.Events
 * @module      Events
 */
module PushUp.Framework.Events {
    export class Event<T> {
        /**
         * Private array of events to fire
         * 
         * @property    eventHandlers
         * @private
         * @type        {IEventHandler<T>[]}
         * @default     []
         */
        private eventHandlers: IEventHandler<T>[] = [];

        /**
         * The owner of the event
         * 
         * @property    sender
         * @private
         * @type        {any}
         */
        private sender: any;

        /**
         * Event is the framework for the entire Event model of the PDC.
         * Events are now handled internally to each class. For a class to provide
         * events, each event must be declared as a PushUp.Core.Event property. To
         * attach a handler you would just push the handler onto the Event property
         * array. The containing class and only the containing class will trigger
         * that event passing itself as the sender and a parameters argument.
         *
         * Global events should at all costs be avoided. If there are globally
         * necessary events, then a class specific to the scope of those events should
         * be created and be made globally available. This helps developers easily
         * find the source of events.
         *
         * @class       Event<T>
         * @constructor
         * @param       {any}   sender
         *
         * @author      Sean Templeton <sean@pushup.com>, Kegan Myers <kegan@pushup.com>
         * @version     0.4
         */
        constructor(sender: any) {
            // Store the owner of the event
            this.sender = sender;
        }

        /**
         * Loops through the private array of handlers and
         * calls them passing in the owner as the sender
         *
         * @method  Fire
         * @param   {T}     [eventData] Data to pass to handlers
         */
        public Fire(eventData?: T): void {
            for(var i = 0; i < this.eventHandlers.length; i++)
                this.eventHandlers[i](this.sender, eventData);
        }

        /**
         * Pushes a handler onto the event stack if it
         * is not already there.
         *
         * @method  Attach
         * @param   {IEventHandler<T>}  handler     Callback to push
         * @param   {any}               [context]
         */
        public Attach(handler: IEventHandler<T>, context?: any): void {
            for(var i = 0; i < this.eventHandlers.length; i++)
                if(this.eventHandlers[i] == handler)
                    return; // Handler already here, break out

            if(context) {
                var originalHandler = handler;
                handler = function(sender: any, eventArgs: any) { originalHandler.call(context, sender, eventArgs); }
            }

            this.eventHandlers.push(handler);
        }

        /**
         * Loops through the handlers and removes the passed
         * in handler if it exists in the array.
         *
         * @method  Remove
         * @param   {IEventHandler<T>}  handler Callback to remove
         */
        public Remove(handler: IEventHandler<T>): void {
            for(var i = 0; i < this.eventHandlers.length; i++) {
                if(this.eventHandlers[i] != handler)
                    continue; // Not in this index, skip to the next

                // Remove from the array
                this.eventHandlers.splice(i, 1);
                // Exit out of the loop
                break;
            }
        }

        /**
         * Returns the number of handlers listening to the event
         *
         * @method  NumHandlers
         * @return  {number}
         */
        public NumHandlers(): number {
            return this.eventHandlers.length;
        }
    }
}