/**
 * @namespace   PushUp.Framework.Events
 * @module      Events
 */
module PushUp.Framework.Events {
    /**
     * IEventHandler is the delegate signature for event
     * handlers. All event handlers being attached must
     * follow this signature.
     *
     * @class   IEventHandler<T>
     */
    export interface IEventHandler<T> {
        (sender: any, eventData: T): void
    }
}