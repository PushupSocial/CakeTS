/// <reference path="Message.ts" />
/// <reference path="IMessageHandler.ts" />
/// <reference path="../../Events/TSEvent.ts" />
/// <reference path="../../Utils/Logger.ts" />
/// <reference path="../../Utils/LogCategory.ts" />

module CakeTS.Routing.IFrame {
    import TSEvent = CakeTS.Events.TSEvent;
    import Logger = CakeTS.Utils.Logger;
    import LogCategory = CakeTS.Utils.LogCategory;

    export class IFrameMessenger {
        private handlers: {
            [key: string]: MessageEvent;
        } = {};
        private parentCapabilities: {
            [key: string]: string
        };
        private ready: boolean = false;
        private targetOrigin: string;
        private uniqueId: string;

        constructor(origin: string) {
            this.targetOrigin = origin;
            //TODO pull this out into another class when can actually bind raw events
            var handleMessage: EventListener = (data: Event): void => {
                Logger.Info("Got raw message in PushupMessenger:", LogCategory.Messenger);
                Logger.Debug(data, LogCategory.Messenger);
                this.HandleMessage(data);
            };

            if (window.addEventListener) {
                window.addEventListener("message", handleMessage, false);
            } else if (window.attachEvent) {
                //noinspection JSValidateTypes
                window.attachEvent("onmessage", handleMessage);
            }
            //--/Raw javascript

            this.uniqueId = "Messenger" + Math.floor(Math.random() * 100000000);
            var handler: IMessageHandler = (messenger: IFrameMessenger, message: Message): void => {
                Logger.Info("Testing parent cap", LogCategory.Loader);
                if (message.GetData()["uniqueId"] === this.uniqueId) {
                    var capabilities: string[] = message.GetData()["capabilities"];
                    for (var i: number = capabilities.length - 1; i >= 0; i--) {
                        this.parentCapabilities[capabilities[i]] = "";
                    }
                    this.ready = true;
                }
            };
            this.Register("ParentCapabilities", handler, this);
            //Assume that the parent can handle
            this.parentCapabilities = {
                "MessengerAdded": ""
            };
            this.SendMessage(new Message("MessengerAdded", {"uniqueId": this.uniqueId}));
        }

        /**
         * Determine if the Messenger is ready
         *
         * @returns {boolean}
         * @constructor
         */
        public IsReady(): boolean {
            return this.ready;
        }

        /**
         * Sends a message to the parent window
         *
         * @param   {Message}   message
         */
        public SendMessage(message: Message): void {
            //Refuse to send if the parent hasn't told us it can handle something
            if (!(message.GetType() in this.parentCapabilities)) {
                return;
            }

            //TODO handle a failure in some way, silently?
            parent.postMessage(JSON.stringify({
                "ident": "PushupEvent",
                "type": message.GetType(),
                "data": message.GetData()
            }), this.targetOrigin);
        }

        /**
         * Allows arbitrary callbacks to be bound to message event types, please be sure the callback is properly bound
         * @param   {string}            type
         * @param   {IMessageHandler}   callback
         * @param   {any}               scope
         */
        public Register(type: string, callback: IMessageHandler, scope: any = null): void {
            if (!this.handlers.hasOwnProperty(type)) {
                this.handlers[type] = new TSEvent(this);
            }
            if (scope == null) {
                scope = {};
            }
            // This is perfectly valid, the IDE does not like it though. Using
            // <any> type to hide error
            this.handlers[type].Attach(<any>callback);
        }

        /**
         * This figures out where to route a received message to
         *
         * @param   {any}   message
         */
        private HandleMessage(message: any): void {
            try {
                var data: {} = JSON.parse(message["data"]);
                if (
                    message.origin !== this.targetOrigin ||
                    typeof data !== "object" ||
                    data["ident"] !== "PushupEvent" ||
                    typeof data["data"] === "undefined" ||
                    typeof data["type"] !== "string"
                ) {
                    return;
                }

                if (this.handlers.hasOwnProperty(data["type"])) {
                    var parsed: Message = new Message(data["type"], data["data"]);
                    this.handlers[data["type"]].Fire(parsed);
                }
            } catch (e) {
                // Do nothing
            }
        }
    }
}