/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/knockout/knockout.d.ts" />
/// <reference path="../bower_components/Typertext/build/typertext.d.ts" />
declare module CakeTS.Core {
    class Error {
        public Name: string;
        public Message: string;
        public Target: Function;
        public Page: string;
        constructor(message: string);
    }
}
declare module CakeTS.Core.Errors {
    class AuthenticationError extends Error {
    }
}
declare module CakeTS.Core.Errors {
    class InvalidPathError extends Error {
    }
}
declare module CakeTS.Core.Errors {
    class UnauthenticatedAccessError extends Error {
    }
}
declare module CakeTS.Core.Errors {
    class UninitializedAccessError extends Error {
    }
}
declare module CakeTS.Core.Events {
    interface IEventHandler<T> {
        (sender: any, eventData: T): void;
    }
}
declare module CakeTS.Core.Events {
    class TSEvent<T> {
        private eventHandlers;
        private sender;
        constructor(sender: any);
        public Fire(eventData?: T): void;
        public Attach(handler: IEventHandler<T>, context?: any): void;
        public Remove(handler: IEventHandler<T>): void;
        public NumHandlers(): number;
    }
}
declare module CakeTS.Core.Events {
    interface IDOMSender {
        GetElement(): JQuery;
    }
}
declare module CakeTS.Core.Events {
    interface IDOMEventArgs {
        event: any;
        element: JQuery;
    }
}
declare module CakeTS.Core.Events {
    class DOMEvent extends TSEvent<IDOMEventArgs> {
        constructor(sender: IDOMSender, event: string, selector?: string);
    }
}
declare module CakeTS.Utils {
    class StringExtensions {
        private static IsUpperCase(text);
        private static MakeInitialLowerCase(word);
        private static ToPascalCase(text, removeUnderscores);
        private static ToCamelCase(value);
        private static AddUnderscores(pascalCasedWord);
        private static AddDashes(pascalCasedWord);
        private static AddUnderscorePrefix(pascalCasedWord);
        static GetNameVariants(name: string): string[];
    }
}
declare module CakeTS.Data {
    class Model {
        public ToObject(): any;
        public Serialize(): any;
        public Update(data: any): void;
    }
}
declare module CakeTS.Data.Proxies {
    interface IProxyResponseHandler {
        (data: ProxyResponse): void;
    }
}
declare module CakeTS.Data.Proxies {
    interface IProxy {
        RawRequest(request: any, callback: IProxyResponseHandler): void;
    }
}
declare module CakeTS.Data.Proxies {
    class ProxyEndpoint {
        private domain;
        private protocol;
        private path;
        private port;
        constructor(domain: string, protocol?: Typertext.Http.HttpProtocol, path?: string, port?: number);
        public GetDomain(): string;
        public GetProtocol(): Typertext.Http.HttpProtocol;
        public GetPath(): string;
        public GetPort(): number;
    }
}
declare module CakeTS.Data.Proxies {
    enum ProxyStatus {
        Success = 0,
        ServerError = 1,
        ClientError = 2,
        UnknownError = 3,
    }
}
declare module CakeTS.Data.Proxies {
    class ProxyResponse {
        private status;
        private data;
        constructor(status: Proxies.ProxyStatus, data?: any);
        public GetStatus(): Proxies.ProxyStatus;
        public GetData(): any;
    }
}
declare module CakeTS.Data.Proxies.Pushup {
    class PushUpAPI implements IProxy {
        public AuthenticationUpdate: Core.Events.TSEvent<PushUpAPI>;
        private _Endpoint;
        private _AccessToken;
        private _AccessTokenExpiration;
        constructor(endpoint: Typertext.Http.HttpUrl, accessToken?: string, accessTokenExpiration?: number);
        public RawResponse(response: Typertext.Json.JsonResponse): ProxyResponse;
        public RawRequest(request: any, callback: IProxyResponseHandler): void;
        public Authenticate(accessToken: string, expiresAt: number): void;
        public Authenticated(): boolean;
        public Deauthenticate(): void;
        public GetAccessToken(): string;
        public GetAccessTokenExpiration(): number;
        public GetEndpoint(): Typertext.Http.HttpUrl;
    }
}
declare module CakeTS.Routing {
    class HistoryItem {
        private pageName;
        private pageParams;
        constructor(pageName: string, params: {
            [key: string]: any;
        });
        static FromString(path: string): HistoryItem;
        static CompareHistoryItems(item1: HistoryItem, item2: HistoryItem): boolean;
        public GetPageName(): string;
        public GetPageParams(): {
            [key: string]: string;
        };
        public ToString(): string;
        public CompareTo(input: HistoryItem): boolean;
    }
}
declare module CakeTS.Routing.IFrame {
    class MessageException {
    }
    class Message {
        public type: string;
        public data: any;
        constructor(type: string, data: any);
        public GetData(): any;
        public GetType(): string;
    }
}
declare module CakeTS.Routing.IFrame {
    interface IMessageHandler extends Core.Events.IEventHandler<Message> {
    }
}
declare module CakeTS.Utils {
    enum LogLevel {
        Trace = 0,
        Debug = 1,
        Info = 2,
        Warn = 3,
        Error = 4,
        Slient = 5,
    }
}
declare module CakeTS.Utils {
    enum LogCategory {
        Loader = 0,
        Component = 1,
        Router = 2,
        Messenger = 3,
        ViewModel = 4,
        Model = 5,
        Widget = 6,
    }
}
declare module CakeTS.Utils {
    class Logger {
        private logLevel;
        private static instance;
        private log;
        private trace;
        private dumpObject;
        private info;
        private warn;
        private error;
        constructor();
        private static GetInstance();
        static SetLogLevel(level: LogLevel): void;
        static EnableAll(): void;
        static DisableAll(): void;
        static Trace(category: LogCategory): void;
        static Debug(input: any, category: LogCategory): void;
        static Info(input: string, category: LogCategory): void;
        static Warn(input: string, category: LogCategory): void;
        static Error(input: string, category: LogCategory): void;
    }
}
declare module CakeTS.Routing.IFrame {
    class IFrameMessenger {
        private handlers;
        private parentCapabilities;
        private ready;
        private targetOrigin;
        private uniqueId;
        constructor(origin: string);
        public IsReady(): boolean;
        public SendMessage(message: Message): void;
        public Register(type: string, callback: IMessageHandler, scope?: any): void;
        private HandleMessage(message);
    }
}
declare module CakeTS.Routing.IFrame {
    class MessageEvent extends Core.Events.TSEvent<Message> {
    }
}
declare module CakeTS.Routing {
    interface IInterceptor {
        (item: HistoryItem): HistoryItem;
    }
}
declare module CakeTS.Routing {
    interface IRouter {
        PageChange: Core.Events.TSEvent<HistoryItem>;
        RegisterPages: (pages: any) => void;
        AddInterceptor: (handler: IInterceptor, context: any) => void;
        ChangePage: (page: HistoryItem) => void;
    }
}
declare module CakeTS.UI {
    class Manager implements Core.Events.IDOMSender {
        private _element;
        private _router;
        constructor(router: Routing.IRouter);
        public GetRouter(): Routing.IRouter;
        public GetElement(): JQuery;
        public SetElement(selector: string): void;
        public HasPage(pages: any, page: string): boolean;
        public AuthenticationCheck(pageName: string): boolean;
        public InterceptChange(item: Routing.HistoryItem): Routing.HistoryItem;
    }
}
declare module CakeTS.UI {
    class ScrollWatcher {
        private element;
        private padding;
        private isEnabled;
        public ScrollLimitReached: Core.Events.TSEvent<void>;
        constructor(elementToWatch: HTMLElement, padding?: number);
        private OnElementScroll(eventArgs);
        public Enable(): void;
        public Disable(): void;
        public Destroy(): void;
    }
}
declare module CakeTS.UI {
    class ViewModel {
        private _rootElement;
        public Navigate: Core.Events.TSEvent<Routing.HistoryItem>;
        constructor(scope?: string);
        constructor(scope?: JQuery);
        public GetElement(): JQuery;
        public SetElement(element: JQuery): void;
        public NavigatePage(page: string, args: {
            [index: string]: string;
        }): void;
        public Destroy(): void;
    }
}
declare module CakeTS.UI {
    class Widget {
        private _viewModel;
        constructor(viewModel: ViewModel);
        public GetViewModel(): ViewModel;
    }
}
declare module CakeTS.Utils {
    class Storage {
        private static localStorageEnabled;
        static CheckLocalStorage(storage: any): boolean;
        private static fallback;
        static Get(key: string): {};
        static Set(key: string, value: Object): void;
        static Iterate(worker: (arg: any) => any): void;
        static NativeEnabled(): boolean;
    }
}
declare module CakeTS.Utils {
    class UrlHandling {
        static ParseUrl(url: string): {
            protocol: string;
            domain: string;
            port: number;
        };
    }
}
