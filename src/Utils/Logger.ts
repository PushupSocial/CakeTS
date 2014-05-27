/// <reference path="LogLevel.ts" />
/// <reference path="LogCategory.ts" />

/**
 * @namespace   CakeTS.Utils
 * @module      Utilities
 */
module CakeTS.Utils {
    /**
     * The PushUp.Core.Logger class is the centralized class for handling
     * all application logging and debugging messages. You can set variable
     * states to restrict the output of the logger. PushUp.Core.Logger wraps
     * standard console.log calls with backwards compatibility with older browsers.
     *
     * Internally the PushUp.Core.Logger saves a set of logs in a private
     * object with each log referenced by a timestamp. The logger will also
     * take key logs, such as error information, and push them back to a logging
     * server to help the debugging of live application issues.
     *
     * The constructor of the Logger handles setting up the core logging functions. It checks to see if
     * console or console.log is defined, and if not implements them as noOp functions.
     *
     * It then binds the native console functions and stores them internally to be called.
     *
     * @class       Logger
     * @constructor
     * @private
     *
     * @uses        CakeTS.Utils.LogLevel
     * @uses        CakeTS.Utils.LogCategory
     *
     * @author      Sean Templeton <sean@pushup.com>,
     *              Kegan Myers <kegan@pushup.com>
     * @version     0.5.1
     */
    export class Logger {
        /**
         * Internally store the current logging level
         *
         * @property    logLevel
         * @private
         * @type        {LogLevel}
         */
        private logLevel: LogLevel;

        /**
         * Singleton pattern instance
         *
         * @property    instance
         * @private
         * @static
         * @type        {Logger}
         * @default     null
         */
        private static instance: Logger = null;

        /**
         * @property    log
         * @private
         * @type        {Function}
         */
        private log: Function;

        /**
         * @property    trace
         * @private
         * @type        {Function}
         */
        private trace: Function;

        /**
         * @property    dumpObject
         * @private
         * @type        {Function}
         */
        private dumpObject: Function;

        /**
         * @property    info
         * @private
         * @type        {Function}
         */
        private info: Function;

        /**
         * @property    warn
         * @private
         * @type        {Function}
         */
        private warn: Function;

        /**
         * @property    error
         * @private
         * @type        {Function}
         */
        private error: Function;

        constructor() {

            // Ensure that singleton pattern is enforced
            if (Logger.instance != null) {
                return;
            }

            // Default logging level is Silent
            this.logLevel = LogLevel.Slient;

            var console: Console = window["console"] || <Console>{log: (): void => null};

            //Bind either the native functions or a noOp
            this.log = (input: any): void => console.log(input);

            this.trace = (typeof console.trace === "undefined"
                ? (): void => {/*this.log("TRACE: " + universalStackTrace());*/
            }
                : (): void => console.trace.call(console));

            this.dumpObject = (typeof console.dir === "undefined"
                ? (input: any): void => console.log(input)
                : (input: any): void => console.dir(input));

            this.info = (typeof console.info === "undefined"
                ? (input: any): void => console.log(input)
                : (input: any): void => console.info.call(console, input));

            this.warn = (typeof console.warn === "undefined"
                ? (input: any): void => console.log(input)
                : (input: any): void => console.warn(input));

            this.error = (typeof console.error === "undefined"
                ? (input: any): void => console.log(input)
                : (input: any): void => console.error(input));

            //Set us up as the singleton
            Logger.instance = this;
        }

        /**
         * Basic singleton GetInstance method that creates a new instance
         * if a previous one does not already exist.
         *
         * @method  GetInstance
         * @private
         * @static
         * @returns {Logger}
         */
        private static GetInstance(): Logger {
            if (Logger.instance == null) {
                Logger.instance = new Logger();
            }

            return Logger.instance;
        }

        /**
         * Changes the current LogLevel to restrict log output
         *
         * @method  SetLogLevel
         * @static
         * @param   {LogLevel}  level   The log level to restrict to
         */
        public static SetLogLevel(level: LogLevel): void {
            Logger.GetInstance().logLevel = level;
        }

        /**
         * Sets the LogLevel to the most lenient level to
         * allow all output to the console
         *
         * @method  EnableAll
         * @static
         */
        public static EnableAll(): void {
            Logger.GetInstance().logLevel = LogLevel.Trace;
        }

        /**
         * Sets the LogLevel to the most restrictive level to
         * prevent all output to the console
         *
         * @method  DisableAll
         * @static
         */
        public static DisableAll(): void {
            Logger.GetInstance().logLevel = LogLevel.Slient;
        }

        /**
         * Outputs a stack trace at the current source line
         *
         * @method  Trace
         * @static
         * @param   {LogCategory}   category    TODO: Store the log specific to a category
         */
        public static Trace(category: LogCategory): void {
            var log: Logger = Logger.GetInstance();

            if (log.logLevel > LogLevel.Trace) {
                return;
            }

            log.trace();
        }

        /**
         * Outputs a variable to the console for inspection
         *
         * @method  Debug
         * @static
         * @param   {any}           input       Any JavaScript object or primitive
         * @param   {LogCategory}   category    TODO: Store the log specific to a category
         */
        public static Debug(input: any, category: LogCategory): void {
            var log: Logger = Logger.GetInstance();

            if (log.logLevel > LogLevel.Debug) {
                return;
            }

            log.dumpObject(input);
        }

        /**
         * Outputs an informative message to the console
         *
         * @method  Info
         * @static
         * @param   {string}        input       A message to output
         * @param   {LogCategory}   category    TODO: Store the log specific to a category
         */
        public static Info(input: string, category: LogCategory): void {
            var log: Logger = Logger.GetInstance();

            if (log.logLevel > LogLevel.Info) {
                return;
            }

            log.info(input);
        }

        /**
         * Outputs an warning message to the console
         *
         * @method  Warn
         * @static
         * @param   {string}        input       A message to output
         * @param   {LogCategory}   category    TODO: Store the log specific to a category
         */
        public static Warn(input: string, category: LogCategory): void {
            var log: Logger = Logger.GetInstance();

            if (log.logLevel > LogLevel.Warn) {
                return;
            }

            log.warn(input);
        }

        /**
         * Outputs an error message to the console
         *
         * @method  Error
         * @static
         * @param   {string}        input       A message to output
         * @param   {LogCategory}   category    TODO: Store the log specific to a category
         */
        public static Error(input: string, category: LogCategory): void {
            var log: Logger = Logger.GetInstance();

            if (log.logLevel > LogLevel.Error) {
                return;
            }

            log.error(input);
        }
    }
}