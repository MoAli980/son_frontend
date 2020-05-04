export default class AdminRecipesListCtrl {

    constructor($rootScope, $translate) {
        this.$rootScope = $rootScope;
        this.$translate = $translate;
    }

    $onInit() {
        $.Pages.init(); // eslint-disable-line
        const ctrl = this;

        this.recipesAreLoaded = true;
    }


    openReceiptFormPoup() {
        this.formData = {};
        this.mode = 'new';
        $('#receiptModal').modal('show');
        $.Pages.init();
    }

}

AdminRecipesListCtrl.$inject = ['$rootScope', '$translate'];
