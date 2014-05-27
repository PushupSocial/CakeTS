/// <reference path="Message.ts" />
/// <reference path="../../Core/Events/IEventHandler.ts" />

module CakeTS.Routing.IFrame {
    import IEventHandler = CakeTS.Core.Events.IEventHandler;

    export interface IMessageHandler extends IEventHandler<Message> {
    }
}