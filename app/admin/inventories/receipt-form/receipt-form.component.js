class ReceiptFormCtrl {

    constructor($translate, $rootScope) {
        this._$translate = $translate;
        this.$rootScope = $rootScope;
    }

    $onInit() {
        const ctrl = this;

    }
}


ReceiptFormCtrl.$inject = ['$translate', '$rootScope'];


const ReceiptFormComponent = {
    bindings: {},
    templateUrl: 'app/admin/inventories/receipt-form/receipt-form.component.html',
    controller: ReceiptFormCtrl
};
export default ReceiptFormComponent;
