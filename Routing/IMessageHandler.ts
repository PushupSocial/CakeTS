/// <reference path="Messenger.ts" />
/// <reference path="Message.ts" />
/// <reference path="../Events/IEventHandler.ts" />

module PushUp.Framework.Routing {
    import IEventHandler = PushUp.Framework.Events.IEventHandler;

    export interface IMessageHandler extends IEventHandler<Message> {
    }
}