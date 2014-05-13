/// <reference path="ViewModel.ts" />

module CakeTS.UI {
    export class Widget {
        private _viewModel: ViewModel;

        constructor(viewModel: ViewModel) {
            this._viewModel = viewModel;
        }

        public GetViewModel(): ViewModel {
            return this._viewModel;
        }
    }
}