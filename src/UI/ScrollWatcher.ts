/// <reference path="../Core/Events/TSEvent.ts" />

module CakeTS.UI {
    import TSEvent = CakeTS.Core.Events.TSEvent;

    export class ScrollWatcher  {
        private element: HTMLElement;
        private padding: number;
        private isEnabled: boolean;

        public ScrollLimitReached: TSEvent<void>;

        constructor(elementToWatch: HTMLElement, padding?: number) {
            if (typeof padding === "undefined") {
                padding = 0;
            }

            this.element = elementToWatch;
            this.padding = padding;

            this.ScrollLimitReached = new TSEvent<void>(this);

            this.element.onscroll = (event: UIEvent): void => {
                this.OnElementScroll(event);
            };

            this.Enable();
        }

        private OnElementScroll(eventArgs: UIEvent): void {
            var pageHeight: number;
            var scrollPosition: number;
            var clientHeight: number;

            pageHeight = this.element.scrollHeight;
            scrollPosition = this.element.scrollTop;
            clientHeight = this.element.clientHeight;

            if (pageHeight - (scrollPosition + clientHeight) < this.padding && this.isEnabled === true) {
                this.ScrollLimitReached.Fire();
            }
        }

        public Enable(): void {
            this.isEnabled = true;
            this.OnElementScroll(null);
        }

        public Disable(): void {
            this.isEnabled = false;
        }

        public Destroy(): void {
            this.element.onscroll = null;
        }
    }
}