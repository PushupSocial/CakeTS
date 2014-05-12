module PushUp.Framework.Utils {
    export class UrlHandling {
        public static parseUrl(url:string) {
            var a = document.createElement("a");
            a.href = url;
            return {
                protocol: a.protocol,
                domain: a.hostname,
                port: parseInt(a.port)
            }
        }
    }
}