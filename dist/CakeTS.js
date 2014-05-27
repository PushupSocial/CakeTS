var CakeTS;
(function (CakeTS) {
    (function (Core) {
        var Error = (function () {
            function Error(message) {
                this.Name = "Error";
                this.Message = "";
                this.Message = message;
                this.Target = arguments.callee.caller;
            }
            return Error;
        })();
        Core.Error = Error;
    })(CakeTS.Core || (CakeTS.Core = {}));
    var Core = CakeTS.Core;
})(CakeTS || (CakeTS = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CakeTS;
(function (CakeTS) {
    (function (Core) {
        (function (Errors) {
            var AuthenticationError = (function (_super) {
                __extends(AuthenticationError, _super);
                function AuthenticationError() {
                    _super.apply(this, arguments);
                }
                return AuthenticationError;
            })(Core.Error);
            Errors.AuthenticationError = AuthenticationError;
        })(Core.Errors || (Core.Errors = {}));
        var Errors = Core.Errors;
    })(CakeTS.Core || (CakeTS.Core = {}));
    var Core = CakeTS.Core;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Core) {
        (function (Errors) {
            var InvalidPathError = (function (_super) {
                __extends(InvalidPathError, _super);
                function InvalidPathError() {
                    _super.apply(this, arguments);
                }
                return InvalidPathError;
            })(Core.Error);
            Errors.InvalidPathError = InvalidPathError;
        })(Core.Errors || (Core.Errors = {}));
        var Errors = Core.Errors;
    })(CakeTS.Core || (CakeTS.Core = {}));
    var Core = CakeTS.Core;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Core) {
        (function (Errors) {
            var UnauthenticatedAccessError = (function (_super) {
                __extends(UnauthenticatedAccessError, _super);
                function UnauthenticatedAccessError() {
                    _super.apply(this, arguments);
                }
                return UnauthenticatedAccessError;
            })(Core.Error);
            Errors.UnauthenticatedAccessError = UnauthenticatedAccessError;
        })(Core.Errors || (Core.Errors = {}));
        var Errors = Core.Errors;
    })(CakeTS.Core || (CakeTS.Core = {}));
    var Core = CakeTS.Core;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Core) {
        (function (Errors) {
            var UninitializedAccessError = (function (_super) {
                __extends(UninitializedAccessError, _super);
                function UninitializedAccessError() {
                    _super.apply(this, arguments);
                }
                return UninitializedAccessError;
            })(Core.Error);
            Errors.UninitializedAccessError = UninitializedAccessError;
        })(Core.Errors || (Core.Errors = {}));
        var Errors = Core.Errors;
    })(CakeTS.Core || (CakeTS.Core = {}));
    var Core = CakeTS.Core;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Core) {
        (function (Events) {
            var TSEvent = (function () {
                function TSEvent(sender) {
                    this.eventHandlers = [];
                    this.sender = sender;
                }
                TSEvent.prototype.Fire = function (eventData) {
                    for (var i = 0; i < this.eventHandlers.length; i++) {
                        this.eventHandlers[i](this.sender, eventData);
                    }
                };

                TSEvent.prototype.Attach = function (handler, context) {
                    for (var i = 0; i < this.eventHandlers.length; i++) {
                        if (this.eventHandlers[i] === handler) {
                            return;
                        }
                    }

                    if (context) {
                        var originalHandler = handler;
                        handler = function (sender, eventArgs) {
                            originalHandler.call(context, sender, eventArgs);
                        };
                    }

                    this.eventHandlers.push(handler);
                };

                TSEvent.prototype.Remove = function (handler) {
                    for (var i = 0; i < this.eventHandlers.length; i++) {
                        if (this.eventHandlers[i] !== handler) {
                            continue;
                        }

                        this.eventHandlers.splice(i, 1);

                        break;
                    }
                };

                TSEvent.prototype.NumHandlers = function () {
                    return this.eventHandlers.length;
                };
                return TSEvent;
            })();
            Events.TSEvent = TSEvent;
        })(Core.Events || (Core.Events = {}));
        var Events = Core.Events;
    })(CakeTS.Core || (CakeTS.Core = {}));
    var Core = CakeTS.Core;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Core) {
        (function (Events) {
            var DOMEvent = (function (_super) {
                __extends(DOMEvent, _super);
                function DOMEvent(sender, event, selector) {
                    var _this = this;
                    _super.call(this, sender);

                    sender.GetElement().on(event, selector || "", function (event) {
                        _this.Fire({
                            event: event,
                            element: jQuery(_this)
                        });
                    });
                }
                return DOMEvent;
            })(Events.TSEvent);
            Events.DOMEvent = DOMEvent;
        })(Core.Events || (Core.Events = {}));
        var Events = Core.Events;
    })(CakeTS.Core || (CakeTS.Core = {}));
    var Core = CakeTS.Core;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Utils) {
        var StringExtensions = (function () {
            function StringExtensions() {
            }
            StringExtensions.IsUpperCase = function (text) {
                return text.match(/^[A-Z]+$/) != null;
            };

            StringExtensions.MakeInitialLowerCase = function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1);
            };

            StringExtensions.ToPascalCase = function (text, removeUnderscores) {
                if (text == null || text === "") {
                    return text;
                }

                text = text.replace("_", "");
                var words = text.split(" ");

                if (words.length > 1 || StringExtensions.IsUpperCase(words[0])) {
                    for (var i = 0; i < words.length; i++) {
                        if (words[i].length > 0) {
                            var word = words[i];
                            var restOfWord = word.substring(1);

                            if (StringExtensions.IsUpperCase(restOfWord)) {
                                restOfWord = restOfWord.toLowerCase();
                            }

                            words[i] = word.substring(0, 1).toUpperCase() + restOfWord;
                        }
                    }

                    return words.join(removeUnderscores ? "" : "_");
                }

                return words[0].substring(0, 1).toUpperCase() + words[0].substring(1);
            };

            StringExtensions.ToCamelCase = function (value) {
                return StringExtensions.MakeInitialLowerCase(StringExtensions.ToPascalCase(value, true));
            };

            StringExtensions.AddUnderscores = function (pascalCasedWord) {
                return pascalCasedWord.replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/[-\s]/g, "_");
            };

            StringExtensions.AddDashes = function (pascalCasedWord) {
                return pascalCasedWord.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").replace(/([a-z\d])([A-Z])/g, "$1-$2").replace(/[\s]/g, "-");
            };

            StringExtensions.AddUnderscorePrefix = function (pascalCasedWord) {
                return "_" + pascalCasedWord;
            };

            StringExtensions.GetNameVariants = function (name) {
                return [
                    name,
                    StringExtensions.ToCamelCase(name),
                    name.toLowerCase(),
                    StringExtensions.AddUnderscores(name),
                    StringExtensions.AddUnderscores(name).toLowerCase(),
                    StringExtensions.AddDashes(name),
                    StringExtensions.AddDashes(name).toLowerCase(),
                    StringExtensions.AddUnderscorePrefix(name),
                    StringExtensions.AddUnderscorePrefix(StringExtensions.ToCamelCase(name))
                ];
            };
            return StringExtensions;
        })();
        Utils.StringExtensions = StringExtensions;
    })(CakeTS.Utils || (CakeTS.Utils = {}));
    var Utils = CakeTS.Utils;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Data) {
        var StringExtensions = CakeTS.Utils.StringExtensions;

        var Model = (function () {
            function Model() {
            }
            Model.prototype.ToObject = function () {
                return ko.toJS(this);
            };

            Model.prototype.Serialize = function () {
                return ko.toJSON(this);
            };

            Model.prototype.Update = function (data) {
                if (data == null) {
                    return;
                }

                var self = this, prop;

                for (prop in self) {
                    if (!ko.isObservable(self[prop])) {
                        return;
                    }

                    var unwrappedProperty = ko.utils.unwrapObservable(self[prop]);
                    var nameVariants = StringExtensions.GetNameVariants(prop);

                    for (var i = 0; i < nameVariants.length; i++) {
                        if (data.hasOwnProperty(nameVariants[i])) {
                            if (["string", "number", "boolean"].indexOf(typeof unwrappedProperty) >= 0) {
                                self[prop](data[nameVariants[i]]);
                                break;
                            }

                            if (unwrappedProperty instanceof Array) {
                                var modelReference = unwrappedProperty[0];
                                var newArray = [];
                                for (var a = 0; a < data[nameVariants[i]].length; a++) {
                                    var newModel = new modelReference.constructor;
                                    newModel.Update(data[nameVariants[i]][a]);
                                    newArray.push(newModel);
                                }

                                self[prop](newArray);
                                break;
                            }

                            if (typeof unwrappedProperty === "object" && unwrappedProperty != null && unwrappedProperty.constructor) {
                                var model = new unwrappedProperty.constructor;
                                model.Update(data[nameVariants[i]]);
                                self[prop](model);
                                break;
                            }
                        }
                    }
                }
            };
            return Model;
        })();
        Data.Model = Model;
    })(CakeTS.Data || (CakeTS.Data = {}));
    var Data = CakeTS.Data;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Data) {
        (function (Proxies) {
            var HttpProtocol = Typertext.Http.HttpProtocol;
            var ProxyEndpoint = (function () {
                function ProxyEndpoint(domain, protocol, path, port) {
                    if (typeof protocol === "undefined") { protocol = 1 /* https */; }
                    if (typeof path === "undefined") { path = ""; }
                    if (typeof port === "undefined") { port = 0; }
                    this.domain = domain;
                    this.protocol = protocol;
                    this.path = path;
                    this.port = port;
                }
                ProxyEndpoint.prototype.GetDomain = function () {
                    return this.domain;
                };

                ProxyEndpoint.prototype.GetProtocol = function () {
                    return this.protocol;
                };

                ProxyEndpoint.prototype.GetPath = function () {
                    return this.path;
                };

                ProxyEndpoint.prototype.GetPort = function () {
                    return this.port;
                };
                return ProxyEndpoint;
            })();
            Proxies.ProxyEndpoint = ProxyEndpoint;
        })(Data.Proxies || (Data.Proxies = {}));
        var Proxies = Data.Proxies;
    })(CakeTS.Data || (CakeTS.Data = {}));
    var Data = CakeTS.Data;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Data) {
        (function (Proxies) {
            (function (ProxyStatus) {
                ProxyStatus[ProxyStatus["Success"] = 0] = "Success";
                ProxyStatus[ProxyStatus["ServerError"] = 1] = "ServerError";
                ProxyStatus[ProxyStatus["ClientError"] = 2] = "ClientError";
                ProxyStatus[ProxyStatus["UnknownError"] = 3] = "UnknownError";
            })(Proxies.ProxyStatus || (Proxies.ProxyStatus = {}));
            var ProxyStatus = Proxies.ProxyStatus;
        })(Data.Proxies || (Data.Proxies = {}));
        var Proxies = Data.Proxies;
    })(CakeTS.Data || (CakeTS.Data = {}));
    var Data = CakeTS.Data;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Data) {
        (function (Proxies) {
            var ProxyResponse = (function () {
                function ProxyResponse(status, data) {
                    if (typeof data === "undefined") { data = {}; }
                    this.status = status;
                    this.data = data;
                }
                ProxyResponse.prototype.GetStatus = function () {
                    return this.status;
                };

                ProxyResponse.prototype.GetData = function () {
                    return this.data;
                };
                return ProxyResponse;
            })();
            Proxies.ProxyResponse = ProxyResponse;
        })(Data.Proxies || (Data.Proxies = {}));
        var Proxies = Data.Proxies;
    })(CakeTS.Data || (CakeTS.Data = {}));
    var Data = CakeTS.Data;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Data) {
        (function (Proxies) {
            (function (Pushup) {
                var ProxyResponse = CakeTS.Data.Proxies.ProxyResponse;
                var ProxyStatus = CakeTS.Data.Proxies.ProxyStatus;

                var JsonRequest = Typertext.Json.JsonRequest;
                var HttpUrl = Typertext.Http.HttpUrl;

                var TSEvent = CakeTS.Core.Events.TSEvent;

                var UnauthenticatedAccessError = CakeTS.Core.Errors.UnauthenticatedAccessError;

                var PushUpAPI = (function () {
                    function PushUpAPI(endpoint, accessToken, accessTokenExpiration) {
                        this._AccessToken = "";
                        this._AccessTokenExpiration = 0;
                        this._Endpoint = endpoint;
                        this._AccessToken = accessToken;
                        this._AccessTokenExpiration = accessTokenExpiration;

                        this.AuthenticationUpdate = new TSEvent(this);
                    }
                    PushUpAPI.prototype.RawResponse = function (response) {
                        var statusCode = response.GetHttpStatus();
                        if (statusCode === 401) {
                            if (this.Authenticated()) {
                                this._AccessToken = null;
                                this._AccessTokenExpiration = 0;
                                this.AuthenticationUpdate.Fire(this);
                            }
                        }

                        var requestStatus;
                        if (response.GetStatus() === 0 /* success */) {
                            requestStatus = 0 /* Success */;
                        } else if (statusCode >= 500 && statusCode < 600) {
                            requestStatus = 1 /* ServerError */;
                        } else if (statusCode >= 400 && statusCode < 500) {
                            requestStatus = 2 /* ClientError */;
                        } else {
                            requestStatus = 3 /* UnknownError */;
                        }

                        return new ProxyResponse(requestStatus, response.GetContent());
                    };

                    PushUpAPI.prototype.RawRequest = function (request, callback) {
                        var _this = this;
                        var cb = function (response) {
                            callback(_this.RawResponse(response));
                        };

                        if (typeof request !== "object") {
                            request = {};
                        }

                        if (!("queryString" in request)) {
                            request["queryString"] = {};
                        } else if (typeof request["queryString"] !== "object") {
                            throw {};
                        }

                        if (typeof request["queryString"]["access_token"] === "undefined" || request["queryString"]["access_token"] !== false) {
                            if (!this.Authenticated()) {
                                throw new UnauthenticatedAccessError(request);
                            }

                            request["queryString"]["access_token"] = this.GetAccessToken();
                        } else {
                            delete request["queryString"]["access_token"];
                        }

                        if (!("postData" in request)) {
                            request["postData"] = {};
                        } else if (typeof request["postData"] !== "object") {
                            throw {};
                        }

                        if (request["method"] === "GET") {
                            var newRequest = request["postData"], item;

                            delete request["postData"];

                            for (item in request["queryString"]) {
                                newRequest[item] = request["queryString"][item];
                            }
                            request["queryString"] = newRequest;
                        }

                        if (!("path" in request) || typeof request["path"] !== "string") {
                            request["path"] = "/";
                        } else if (request["path"].indexOf("/") !== 0) {
                            request["path"] = "/" + request["path"];
                        }

                        if (request["path"].lastIndexOf("/") !== request["path"].length - 1) {
                            request["path"] = request["path"] + "/";
                        }

                        try  {
                            var serverRequest = new JsonRequest();

                            var url = HttpUrl.FromUrl(this._Endpoint.ToString() + request["path"] + Typertext.Http.HttpUrl.EncodeQueryString(request["queryString"]));
                            switch (request["method"]) {
                                case "DELETE":
                                    serverRequest.Delete(url, cb);
                                    break;
                                case "POST":
                                    serverRequest.Post(url, request["postData"], cb);
                                    break;
                                case "PUT":
                                    serverRequest.Put(url, request["postData"], cb);
                                    break;
                                case "GET":
                                default:
                                    serverRequest.Get(url, cb);
                            }
                        } catch (e) {
                            callback(new ProxyResponse(1 /* ServerError */));
                        }
                    };

                    PushUpAPI.prototype.Authenticate = function (accessToken, expiresAt) {
                        this._AccessToken = accessToken;
                        this._AccessTokenExpiration = expiresAt;
                        this.AuthenticationUpdate.Fire(this);
                    };

                    PushUpAPI.prototype.Authenticated = function () {
                        return this._AccessToken !== "" && this._AccessTokenExpiration > (new Date().getTime() / 1000);
                    };

                    PushUpAPI.prototype.Deauthenticate = function () {
                        this._AccessToken = "";
                        this._AccessTokenExpiration = 0;
                        this.AuthenticationUpdate.Fire(this);
                    };

                    PushUpAPI.prototype.GetAccessToken = function () {
                        if (!this.Authenticated()) {
                            throw {};
                        }

                        return this._AccessToken;
                    };

                    PushUpAPI.prototype.GetAccessTokenExpiration = function () {
                        if (!this.Authenticated()) {
                            throw {};
                        }

                        return this._AccessTokenExpiration;
                    };

                    PushUpAPI.prototype.GetEndpoint = function () {
                        return this._Endpoint;
                    };
                    return PushUpAPI;
                })();
                Pushup.PushUpAPI = PushUpAPI;
            })(Proxies.Pushup || (Proxies.Pushup = {}));
            var Pushup = Proxies.Pushup;
        })(Data.Proxies || (Data.Proxies = {}));
        var Proxies = Data.Proxies;
    })(CakeTS.Data || (CakeTS.Data = {}));
    var Data = CakeTS.Data;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Routing) {
        var HistoryItem = (function () {
            function HistoryItem(pageName, params) {
                this.pageName = pageName;
                this.pageParams = params;
            }
            HistoryItem.FromString = function (path) {
                var pieces = path.split("/"), arguments = {};

                var page = pieces.shift();

                var piece;
                while ((piece = pieces.shift()) !== undefined) {
                    var arg = piece.split(":");
                    if (arg.length > 1) {
                        arguments[arg.shift()] = arg.join(":");
                    }
                }

                return new HistoryItem(page, arguments);
            };

            HistoryItem.CompareHistoryItems = function (item1, item2) {
                if (item1.GetPageName() !== item2.GetPageName()) {
                    return false;
                }

                var key;
                var item1Params = item1.GetPageParams();
                var item2Params = item2.GetPageParams();
                for (key in item1Params) {
                    if (item1Params.hasOwnProperty(key) && (!item2Params.hasOwnProperty(key) || item2Params[key] !== item1Params[key])) {
                        return false;
                    }
                }

                for (key in item2) {
                    if (item2.hasOwnProperty(key) && !item1.hasOwnProperty(key)) {
                        return false;
                    }
                }

                return true;
            };

            HistoryItem.prototype.GetPageName = function () {
                return this.pageName;
            };

            HistoryItem.prototype.GetPageParams = function () {
                return this.pageParams;
            };

            HistoryItem.prototype.ToString = function () {
                var returnValue = this.pageName, name;
                for (name in this.pageParams) {
                    returnValue += "/" + name + ":" + this.pageParams[name];
                }

                return returnValue;
            };

            HistoryItem.prototype.CompareTo = function (input) {
                return HistoryItem.CompareHistoryItems(this, input);
            };
            return HistoryItem;
        })();
        Routing.HistoryItem = HistoryItem;
    })(CakeTS.Routing || (CakeTS.Routing = {}));
    var Routing = CakeTS.Routing;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Routing) {
        (function (IFrame) {
            var MessageException = (function () {
                function MessageException() {
                }
                return MessageException;
            })();
            IFrame.MessageException = MessageException;

            var Message = (function () {
                function Message(type, data) {
                    this.type = type;
                    this.data = data;
                    if (this.data === undefined) {
                        throw new MessageException();
                    }
                }
                Message.prototype.GetData = function () {
                    return this.data;
                };

                Message.prototype.GetType = function () {
                    return this.type;
                };
                return Message;
            })();
            IFrame.Message = Message;
        })(Routing.IFrame || (Routing.IFrame = {}));
        var IFrame = Routing.IFrame;
    })(CakeTS.Routing || (CakeTS.Routing = {}));
    var Routing = CakeTS.Routing;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Routing) {
        (function (IFrame) {
        })(Routing.IFrame || (Routing.IFrame = {}));
        var IFrame = Routing.IFrame;
    })(CakeTS.Routing || (CakeTS.Routing = {}));
    var Routing = CakeTS.Routing;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Utils) {
        (function (LogLevel) {
            LogLevel[LogLevel["Trace"] = 0] = "Trace";
            LogLevel[LogLevel["Debug"] = 1] = "Debug";
            LogLevel[LogLevel["Info"] = 2] = "Info";
            LogLevel[LogLevel["Warn"] = 3] = "Warn";
            LogLevel[LogLevel["Error"] = 4] = "Error";
            LogLevel[LogLevel["Slient"] = 5] = "Slient";
        })(Utils.LogLevel || (Utils.LogLevel = {}));
        var LogLevel = Utils.LogLevel;
    })(CakeTS.Utils || (CakeTS.Utils = {}));
    var Utils = CakeTS.Utils;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Utils) {
        (function (LogCategory) {
            LogCategory[LogCategory["Loader"] = 0] = "Loader";
            LogCategory[LogCategory["Component"] = 1] = "Component";
            LogCategory[LogCategory["Router"] = 2] = "Router";
            LogCategory[LogCategory["Messenger"] = 3] = "Messenger";
            LogCategory[LogCategory["ViewModel"] = 4] = "ViewModel";
            LogCategory[LogCategory["Model"] = 5] = "Model";
            LogCategory[LogCategory["Widget"] = 6] = "Widget";
        })(Utils.LogCategory || (Utils.LogCategory = {}));
        var LogCategory = Utils.LogCategory;
    })(CakeTS.Utils || (CakeTS.Utils = {}));
    var Utils = CakeTS.Utils;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Utils) {
        var Logger = (function () {
            function Logger() {
                if (Logger.instance != null) {
                    return;
                }

                this.logLevel = 5 /* Slient */;

                var console = window["console"] || { log: function () {
                        return null;
                    } };

                this.log = function (input) {
                    return console.log(input);
                };

                this.trace = (typeof console.trace === "undefined" ? function () {
                } : function () {
                    return console.trace.call(console);
                });

                this.dumpObject = (typeof console.dir === "undefined" ? function (input) {
                    return console.log(input);
                } : function (input) {
                    return console.dir(input);
                });

                this.info = (typeof console.info === "undefined" ? function (input) {
                    return console.log(input);
                } : function (input) {
                    return console.info.call(console, input);
                });

                this.warn = (typeof console.warn === "undefined" ? function (input) {
                    return console.log(input);
                } : function (input) {
                    return console.warn(input);
                });

                this.error = (typeof console.error === "undefined" ? function (input) {
                    return console.log(input);
                } : function (input) {
                    return console.error(input);
                });

                Logger.instance = this;
            }
            Logger.GetInstance = function () {
                if (Logger.instance == null) {
                    Logger.instance = new Logger();
                }

                return Logger.instance;
            };

            Logger.SetLogLevel = function (level) {
                Logger.GetInstance().logLevel = level;
            };

            Logger.EnableAll = function () {
                Logger.GetInstance().logLevel = 0 /* Trace */;
            };

            Logger.DisableAll = function () {
                Logger.GetInstance().logLevel = 5 /* Slient */;
            };

            Logger.Trace = function (category) {
                var log = Logger.GetInstance();

                if (log.logLevel > 0 /* Trace */) {
                    return;
                }

                log.trace();
            };

            Logger.Debug = function (input, category) {
                var log = Logger.GetInstance();

                if (log.logLevel > 1 /* Debug */) {
                    return;
                }

                log.dumpObject(input);
            };

            Logger.Info = function (input, category) {
                var log = Logger.GetInstance();

                if (log.logLevel > 2 /* Info */) {
                    return;
                }

                log.info(input);
            };

            Logger.Warn = function (input, category) {
                var log = Logger.GetInstance();

                if (log.logLevel > 3 /* Warn */) {
                    return;
                }

                log.warn(input);
            };

            Logger.Error = function (input, category) {
                var log = Logger.GetInstance();

                if (log.logLevel > 4 /* Error */) {
                    return;
                }

                log.error(input);
            };
            Logger.instance = null;
            return Logger;
        })();
        Utils.Logger = Logger;
    })(CakeTS.Utils || (CakeTS.Utils = {}));
    var Utils = CakeTS.Utils;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Routing) {
        (function (IFrame) {
            var TSEvent = CakeTS.Core.Events.TSEvent;
            var Logger = CakeTS.Utils.Logger;
            var LogCategory = CakeTS.Utils.LogCategory;

            var IFrameMessenger = (function () {
                function IFrameMessenger(origin) {
                    var _this = this;
                    this.handlers = {};
                    this.ready = false;
                    this.targetOrigin = origin;

                    var handleMessage = function (data) {
                        Logger.Info("Got raw message in PushupMessenger:", 3 /* Messenger */);
                        Logger.Debug(data, 3 /* Messenger */);
                        _this.HandleMessage(data);
                    };

                    if (window.addEventListener) {
                        window.addEventListener("message", handleMessage, false);
                    } else if (window.attachEvent) {
                        window.attachEvent("onmessage", handleMessage);
                    }

                    this.uniqueId = "Messenger" + Math.floor(Math.random() * 100000000);
                    var handler = function (messenger, message) {
                        Logger.Info("Testing parent cap", 0 /* Loader */);
                        if (message.GetData()["uniqueId"] === _this.uniqueId) {
                            var capabilities = message.GetData()["capabilities"];
                            for (var i = capabilities.length - 1; i >= 0; i--) {
                                _this.parentCapabilities[capabilities[i]] = "";
                            }
                            _this.ready = true;
                        }
                    };
                    this.Register("ParentCapabilities", handler, this);

                    this.parentCapabilities = {
                        "MessengerAdded": ""
                    };
                    this.SendMessage(new IFrame.Message("MessengerAdded", { "uniqueId": this.uniqueId }));
                }
                IFrameMessenger.prototype.IsReady = function () {
                    return this.ready;
                };

                IFrameMessenger.prototype.SendMessage = function (message) {
                    if (!(message.GetType() in this.parentCapabilities)) {
                        return;
                    }

                    parent.postMessage(JSON.stringify({
                        "ident": "PushupEvent",
                        "type": message.GetType(),
                        "data": message.GetData()
                    }), this.targetOrigin);
                };

                IFrameMessenger.prototype.Register = function (type, callback, scope) {
                    if (typeof scope === "undefined") { scope = null; }
                    if (!this.handlers.hasOwnProperty(type)) {
                        this.handlers[type] = new TSEvent(this);
                    }
                    if (scope == null) {
                        scope = {};
                    }

                    this.handlers[type].Attach(callback);
                };

                IFrameMessenger.prototype.HandleMessage = function (message) {
                    try  {
                        var data = JSON.parse(message["data"]);
                        if (message.origin !== this.targetOrigin || typeof data !== "object" || data["ident"] !== "PushupEvent" || typeof data["data"] === "undefined" || typeof data["type"] !== "string") {
                            return;
                        }

                        if (this.handlers.hasOwnProperty(data["type"])) {
                            var parsed = new IFrame.Message(data["type"], data["data"]);
                            this.handlers[data["type"]].Fire(parsed);
                        }
                    } catch (e) {
                    }
                };
                return IFrameMessenger;
            })();
            IFrame.IFrameMessenger = IFrameMessenger;
        })(Routing.IFrame || (Routing.IFrame = {}));
        var IFrame = Routing.IFrame;
    })(CakeTS.Routing || (CakeTS.Routing = {}));
    var Routing = CakeTS.Routing;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Routing) {
        (function (IFrame) {
            var TSEvent = CakeTS.Core.Events.TSEvent;

            var MessageEvent = (function (_super) {
                __extends(MessageEvent, _super);
                function MessageEvent() {
                    _super.apply(this, arguments);
                }
                return MessageEvent;
            })(TSEvent);
            IFrame.MessageEvent = MessageEvent;
        })(Routing.IFrame || (Routing.IFrame = {}));
        var IFrame = Routing.IFrame;
    })(CakeTS.Routing || (CakeTS.Routing = {}));
    var Routing = CakeTS.Routing;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (UI) {
        var Manager = (function () {
            function Manager(router) {
                this._router = router;
            }
            Manager.prototype.GetRouter = function () {
                return this._router;
            };

            Manager.prototype.GetElement = function () {
                return this._element;
            };

            Manager.prototype.SetElement = function (selector) {
                this._element = jQuery(selector);
            };

            Manager.prototype.HasPage = function (pages, page) {
                var item;
                for (item in pages) {
                    if (pages.hasOwnProperty(item)) {
                        if (pages[item] === page) {
                            return true;
                        }
                    }
                }

                return false;
            };

            Manager.prototype.AuthenticationCheck = function (pageName) {
                return false;
            };

            Manager.prototype.InterceptChange = function (item) {
                return item;
            };
            return Manager;
        })();
        UI.Manager = Manager;
    })(CakeTS.UI || (CakeTS.UI = {}));
    var UI = CakeTS.UI;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (UI) {
        var TSEvent = CakeTS.Core.Events.TSEvent;

        var ScrollWatcher = (function () {
            function ScrollWatcher(elementToWatch, padding) {
                var _this = this;
                if (typeof padding === "undefined") {
                    padding = 0;
                }

                this.element = elementToWatch;
                this.padding = padding;

                this.ScrollLimitReached = new TSEvent(this);

                this.element.onscroll = function (event) {
                    _this.OnElementScroll(event);
                };

                this.Enable();
            }
            ScrollWatcher.prototype.OnElementScroll = function (eventArgs) {
                var pageHeight;
                var scrollPosition;
                var clientHeight;

                pageHeight = this.element.scrollHeight;
                scrollPosition = this.element.scrollTop;
                clientHeight = this.element.clientHeight;

                if (pageHeight - (scrollPosition + clientHeight) < this.padding && this.isEnabled === true) {
                    this.ScrollLimitReached.Fire();
                }
            };

            ScrollWatcher.prototype.Enable = function () {
                this.isEnabled = true;
                this.OnElementScroll(null);
            };

            ScrollWatcher.prototype.Disable = function () {
                this.isEnabled = false;
            };

            ScrollWatcher.prototype.Destroy = function () {
                this.element.onscroll = null;
            };
            return ScrollWatcher;
        })();
        UI.ScrollWatcher = ScrollWatcher;
    })(CakeTS.UI || (CakeTS.UI = {}));
    var UI = CakeTS.UI;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (UI) {
        var TSEvent = CakeTS.Core.Events.TSEvent;
        var HistoryItem = CakeTS.Routing.HistoryItem;

        var ViewModel = (function () {
            function ViewModel(scope) {
                this.Navigate = new TSEvent(this);

                if (typeof scope === "undefined") {
                    return;
                }

                switch (typeof scope) {
                    case "string":
                        scope = jQuery(scope);
                        break;
                    case "undefined":
                        scope = jQuery("<div>");
                        break;
                }

                this._rootElement = scope;

                ko.applyBindings(this, this._rootElement[0]);
            }
            ViewModel.prototype.GetElement = function () {
                return this._rootElement;
            };

            ViewModel.prototype.SetElement = function (element) {
                this._rootElement = element;
            };

            ViewModel.prototype.NavigatePage = function (page, args) {
                this.Navigate.Fire(new HistoryItem(page, args));
            };

            ViewModel.prototype.Destroy = function () {
                ko.cleanNode(this._rootElement[0]);
            };
            return ViewModel;
        })();
        UI.ViewModel = ViewModel;
    })(CakeTS.UI || (CakeTS.UI = {}));
    var UI = CakeTS.UI;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (UI) {
        var Widget = (function () {
            function Widget(viewModel) {
                this._viewModel = viewModel;
            }
            Widget.prototype.GetViewModel = function () {
                return this._viewModel;
            };
            return Widget;
        })();
        UI.Widget = Widget;
    })(CakeTS.UI || (CakeTS.UI = {}));
    var UI = CakeTS.UI;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Utils) {
        var Storage = (function () {
            function Storage() {
            }
            Storage.CheckLocalStorage = function (storage) {
                try  {
                    var test = "test";
                    storage.setItem(test, test);
                    storage.getItem(test);
                    storage.removeItem(test);
                    return true;
                } catch (e) {
                    return false;
                }
            };

            Storage.Get = function (key) {
                if (Storage.localStorageEnabled) {
                    try  {
                        return JSON.parse(window.localStorage.getItem(key));
                    } catch (e) {
                    }
                }
                return Storage.fallback[key];
            };

            Storage.Set = function (key, value) {
                if (Storage.localStorageEnabled) {
                    try  {
                        window.localStorage.setItem(key, JSON.stringify(value));
                    } catch (e) {
                    }
                }
                Storage.fallback[key] = value;
            };

            Storage.Iterate = function (worker) {
                var result;
                if (Storage.localStorageEnabled) {
                    for (var i = 0; i < window.localStorage.length; i++) {
                        var key = window.localStorage.key(i);

                        result = worker(window.localStorage.getItem(key));
                        if (!result) {
                            window.localStorage.removeItem(key);
                            i--;
                        } else {
                            window.localStorage.setItem(key, result);
                        }
                    }
                } else {
                    result = worker(Storage.fallback);
                    if (!result) {
                        Storage.fallback = {};
                    } else {
                        Storage.fallback = result;
                    }
                }
            };

            Storage.NativeEnabled = function () {
                return Storage.localStorageEnabled;
            };
            Storage.localStorageEnabled = Storage.CheckLocalStorage(window.localStorage);

            Storage.fallback = {};
            return Storage;
        })();
        Utils.Storage = Storage;
    })(CakeTS.Utils || (CakeTS.Utils = {}));
    var Utils = CakeTS.Utils;
})(CakeTS || (CakeTS = {}));
var CakeTS;
(function (CakeTS) {
    (function (Utils) {
        var UrlHandling = (function () {
            function UrlHandling() {
            }
            UrlHandling.ParseUrl = function (url) {
                var a = document.createElement("a");
                a.href = url;
                return {
                    protocol: a.protocol,
                    domain: a.hostname,
                    port: parseInt(a.port, 10)
                };
            };
            return UrlHandling;
        })();
        Utils.UrlHandling = UrlHandling;
    })(CakeTS.Utils || (CakeTS.Utils = {}));
    var Utils = CakeTS.Utils;
})(CakeTS || (CakeTS = {}));
//# sourceMappingURL=CakeTS.js.map
