/// <reference path="Message.ts" />
/// <reference path="../../Events/IEventHandler.ts" />

module CakeTS.Routing.IFrame {
    import IEventHandler = CakeTS.Events.IEventHandler;

    export interface IMessageHandler extends IEventHandler<Message> {
    }
}