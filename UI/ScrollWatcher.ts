/// <reference path="../Events/Event.ts" />

module CakeTS.UI {
    import Events = CakeTS.Events;

    export class ScrollWatcher  {
        private element: HTMLElement;
        private padding: number;
        private isEnabled: boolean;

        public ScrollLimitReached: Events.Event<void>;

        constructor(elementToWatch: HTMLElement, padding?: number) {
            if(typeof padding == 'undefined')
                padding = 0;

            this.element = elementToWatch;
            this.padding = padding;

            this.ScrollLimitReached = new Events.Event<void>(this);

            this.element.onscroll = (event) => {
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

            if(pageHeight - (scrollPosition + clientHeight) < this.padding && this.isEnabled === true) {
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

        public Destroy():void {
            this.element.onscroll = null;
        }
    }
}