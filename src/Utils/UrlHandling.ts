module CakeTS.Utils {
    export class UrlHandling {
        public static parseUrl(url: string): { protocol: string; domain: string; port: number } {
            var a: HTMLAnchorElement = document.createElement("a");
            a.href = url;
            return {
                protocol: a.protocol,
                domain: a.hostname,
                port: parseInt(a.port, 10)
            };
        }
    }
}