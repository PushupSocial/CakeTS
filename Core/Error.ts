/**
 * PushUp.Core.Error defines a basic JavaScript error with
 * various properties and methods to help developers better
 * understand what happened and thus more quickly debug and
 * fix issues in the PDC. Included in this error should be a
 * basic error message, stack trace, sending function, and
 * current route hash.
 *
 * Error handling should be utilized anytime interaction with
 * a source outside of the PDC is used. This includes, but is
 * not limited to, server interaction and user input. In every
 * Catch statement there should be a PushUp.Core.Logger call
 * with the details of the error.
 *
 * @author Sean Templeton <sean@pushup.com>
 * @version 0.1
 */

module PushUp.Framework.Core {
    export class Error {
        public Name: string = "Error";
        // The error message
        public Message: string = "";
        // The function that threw the error
        public Target: Function;
        // The current page we are on
        public Page: string;

        constructor(message: string) {
            this.Message = message;
            this.Target = arguments.callee.caller;
            // TODO: Get Router page
            // this.page = Router.getCurrentPage();
        }
    }
}