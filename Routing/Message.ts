module CakeTS.Routing {

    export class MessageException {

    }

    export class Message {
        public type: string;
        public data: any;

        constructor(type: string, data: any) {
            this.type = type;
            this.data = data;
            if (this.data === undefined) {
                throw new MessageException();
            }
        }

        public GetData(): any {
            return this.data;
        }

        public GetType(): string {
            return this.type;
        }
    }
}