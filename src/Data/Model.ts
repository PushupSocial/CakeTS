/// <reference path="../Utils/StringExtensions.ts" />

/* tslint:disable:forin */
module CakeTS.Data {
    import StringExtensions = CakeTS.Utils.StringExtensions;

    export class Model {

        public ToObject(): any {
            return ko.toJS(this);
        }

        public Serialize(): any {
            return ko.toJSON(this);
        }

        public Update(data: any): void {
            if (data == null) {
                return;
            }

            var self: any = this,
                prop: any;

            for (prop in self) {
                if (!ko.isObservable(self[prop])) {
                    return;
                }

                var unwrappedProperty: any = ko.utils.unwrapObservable(self[prop]);
                var nameVariants: string[] = StringExtensions.GetNameVariants(prop);

                for (var i: number = 0; i < nameVariants.length; i++) {
                    if (data.hasOwnProperty(nameVariants[i])) {
                        if (["string", "number", "boolean"].indexOf(typeof unwrappedProperty) >= 0) {
                            self[prop](data[nameVariants[i]]);
                            break;
                        }

                        if (unwrappedProperty instanceof Array) {
                            var modelReference: any = unwrappedProperty[0];
                            var newArray: any[] = [];
                            for (var a: number = 0; a < data[nameVariants[i]].length; a++) {
                                var newModel: Model = new modelReference.constructor;
                                newModel.Update(data[nameVariants[i]][a]);
                                newArray.push(newModel);
                            }

                            self[prop](newArray);
                            break;
                        }

                        if (typeof unwrappedProperty === "object" && unwrappedProperty != null && (<any>unwrappedProperty).constructor) {
                            var model: Model = new (<any>unwrappedProperty).constructor;
                            model.Update(data[nameVariants[i]]);
                            self[prop](model);
                            break;
                        }
                    }
                }
            }
        }
    }
}