export default class AdminRecipesListCtrl {


    constructor($rootScope, $translate, InventoryService) {
        this._InventoryService = InventoryService;
        this.$rootScope = $rootScope;
        this.$translate = $translate;
    }

    $onInit() {
        $.Pages.init(); // eslint-disable-line
        const ctrl = this;

        this.searchCriteria = {
            skip: 0,
            limit: 10,
            name: ''
        };
        this.currentPage = 1;
        this.getInventories(this.searchCriteria);
        this.$rootScope.$on('getInventories', () => {
            ctrl.getInventories(ctrl.searchCriteria);
        });
    }

    getInventories(searchCriteria) {
        const _onSuccess = (res) => {
            this.recipesItems = res.data.data.recipes;

            this.totalPages = Math.ceil(res.data.data.count / this.searchCriteria.limit);
        };
        const _onError = (err) => {
            this.errors = err.data.data;
        };
        const _onFinal = () => {
            this.recipesAreLoaded = true;
        };
        this._InventoryService.getInventories(searchCriteria).then(_onSuccess, _onError).finally(_onFinal);
    }

    openReceiptFormPoup() {
        this.formData = {};
        this.mode = 'new';
        $('#receiptModal').modal('show');
        $.Pages.init();
    }

    getRecipes(searchCriteria) {
        const _onSuccess = (res) => {
            this.recipes = res.data.data.recipes;

            this.totalPages = Math.ceil(
                res.data.data.count / this.searchCriteria.limit
            );
        };
        const _onError = (err) => {
            this.errors = err.data.data;
        };
        const _onFinal = () => {
            this.recipesAreLoaded = true;
        };
        this._RecipesService
            .getRecipes(searchCriteria)
            .then(_onSuccess, _onError)
            .finally(_onFinal);
    }
}

AdminRecipesListCtrl.$inject = ['$rootScope', '$translate', 'InventoryService'];

