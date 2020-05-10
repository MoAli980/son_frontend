class EditReceiptFormCtrl {
    constructor(InventoryService, $translate, $rootScope) {
        this._InventoryService = InventoryService;
        this._$translate = $translate;
        this.$rootScope = $rootScope;
    }

    $onInit() {
        $.Pages.init(); // eslint-disable-line
        const ctrl = this;

        this.$rootScope.$on('loadRecipeItem', (evt, data) => {
            this.recipeData = data;
            this.renderCode(this.recipeData);
            this.ingredientsAreLoaded = true;
        });
    }

    renderCode(dataRecipe) {
        setTimeout(() => {
            dataRecipe.ingredients.forEach((item) => {
                JsBarcode(`#barcodes${item.barcode}`, item.barcode, {
                    lineColor: '#00000',
                    width: 3,
                    height: 50,
                    displayValue: true,
                    margin: 10
                });
            });
        }, 100);
    }

    openAddIngredientForm() {
        $('#editReceiptModal').modal('hide');
        $('#ingredientModal').modal('show');
        this.$rootScope.$broadcast('cameFromEdit', this.recipeData);
    }

    deleteIngredientItem(item) {
        const _onSuccess = (res) => {
            this.$rootScope.$broadcast('getInventories');
            $('#editReceiptModal').modal('hide');
        };
        const _onError = (err) => {
            this.errors = err.data.data;
        };
        const _onFinal = () => {
            this.recipesAreLoaded = true;
        };
        this._InventoryService.deleteIngredient(item._id)
            .then(_onSuccess, _onError)
            .finally(_onFinal);
    }
}

EditReceiptFormCtrl.$inject = [
    'InventoryService',
    '$translate',
    '$rootScope'
];

const editReceiptFormComponent = {
    bindings: {},
    templateUrl:
        'app/admin/inventories/receipt-form/edit-receipt-form.component.html',
    controller: EditReceiptFormCtrl,
};
export default editReceiptFormComponent;
