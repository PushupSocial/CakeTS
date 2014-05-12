/// <reference path="../lib/knockout.d.ts" />
/// <reference path="../Utils/StringExtensions.ts" />

module PushUp.Framework.Data {
    import StringExtensions = PushUp.Framework.Utils.StringExtensions;

    export class Model {
        private CreateObservable(data: any, defaultData: any): any {
            if(["string", "number", "boolean"].indexOf(typeof data)) {
                return ko.observable(data);
            }
        }

        public ToObject(): any {
            return ko.toJS(this);
        }

        public Serialize(): any {
            return ko.toJSON(this);
        }

        public Update(data: any) {
            if(data == null) {
                return;
            }

            var self: any = this,
                mappedData: any = {};

            for(var prop in self) {
                if(!ko.isObservable(self[prop])) {
                    return;
                }

                var unwrappedProperty = ko.utils.unwrapObservable(self[prop]);
                var nameVariants: string[] = StringExtensions.GetNameVariants(prop);

                for(var i = 0; i < nameVariants.length; i++) {
                    if(data.hasOwnProperty(nameVariants[i])) {
                        if(["string", "number", "boolean"].indexOf(typeof unwrappedProperty) >= 0) {
                            self[prop](data[nameVariants[i]]);
                            break;
                        }

                        if(unwrappedProperty instanceof Array) {
                            var modelReference = unwrappedProperty[0];
                            var newArray = [];
                            for(var a = 0; a < data[nameVariants[i]].length; a++) {
                                var newModel = new modelReference.constructor;
                                newModel.Update(data[nameVariants[i]][a]);
                                newArray.push(newModel);
                            }

                            self[prop](newArray);
                            break;
                        }

                        if(typeof unwrappedProperty == "object" && unwrappedProperty != null && (<any>unwrappedProperty).constructor) {
                            var model = new (<any>unwrappedProperty).constructor;
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