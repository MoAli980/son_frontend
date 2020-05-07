class EditReceiptFormCtrl {
    constructor(RecipeService, $translate, $rootScope, Upload, AppConstants) {
        this._RecipeService = RecipeService;
        this._$translate = $translate;
        this.$rootScope = $rootScope;
        this.Upload = Upload;
        this.UPLOAD_URL = AppConstants.UPLOAD_URL;
    }

    $onInit() {
        $.Pages.init(); // eslint-disable-line
        const ctrl = this;

        this.$rootScope.$on('loadRecipeItem', (evt, data) => {
            this.recipeData = data;
            this.ingredientsAreLoaded = true;
        });
    }

}

EditReceiptFormCtrl.$inject = [
    'RecipeService',
    '$translate',
    '$rootScope',
    'Upload',
    'AppConstants',
];

const editReceiptFormComponent = {
    bindings: {},
    templateUrl:
        'app/admin/inventories/receipt-form/edit-receipt-form.component.html',
    controller: EditReceiptFormCtrl,
};
export default editReceiptFormComponent;
