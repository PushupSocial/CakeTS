/// <reference path="Messenger.ts" />
/// <reference path="Message.ts" />
/// <reference path="../Events/IEventHandler.ts" />

module CakeTS.Routing {
    import IEventHandler = CakeTS.Events.IEventHandler;

    export interface IMessageHandler extends IEventHandler<Message> {
    }
}