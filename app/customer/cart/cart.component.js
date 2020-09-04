import moment from 'moment';

import { Customer } from '../customer.class';

class CartCtrl {
    constructor(SupplierService,
                CartService,
                $stateParams,
                $rootScope,
                $scope,
                $state,
                $translate) {
        this.customer = new Customer(SupplierService, $stateParams,
            CartService, $rootScope, $translate);
        this._$stateParams = $stateParams;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$state = $state;
        this._CartService = CartService;
        this.$translate = $translate;
    }

    $onInit() {
        $.Pages.init(); // eslint-disable-line
        this.customer.getBranches({});
        const ctrl = this;
        moment.locale('en');
        this.isRecurring = false;
        this.recurringBody = {
            startDate: moment().format('YYYY-MM-DD'),
            orderIntervalType: 'Week',
            orderFrequency: 1
        };
        this.customer.getSuppliers({});
        this.$rootScope.supplierId = this.$rootScope.supplierId || this._$stateParams.supplierId;
        this.supplierId = this.$rootScope.supplierId;
        if (this.supplierId) {
            this.customer.getCartBySupplier(this.supplierId);
        }
        this.$scope.$watchCollection(() => this.$state.params, () => {
            if (this.$state.params.supplierId) {
                this.$rootScope.supplierId = this.$state.params.supplierId || this.$rootScope.supplierId;
                this.supplierId = this.$state.params.supplierId;
                this.customer.getCartBySupplier(this.$state.params.supplierId);
            }
           // this.$log.info('State params have been updated', this.$scope.stateParams);
        });
        this.$scope.$watchCollection(() => this.$rootScope.supplierId, () => {
            this.supplierId = this.$rootScope.supplierId;
            this.customer.getCartBySupplier(this.supplierId);
        });
        this.$scope.$on('addToCart', (event, data) => {
            this.customer.getCartBySupplier(this.$rootScope.supplierId);
        });
        this.$scope.$on('addBranch', (event, data) => {
            this.customer.getBranches({});
        });


        $('#cartModal').on('hide.bs.modal', () => {
            ctrl.success = false;
            this.$scope.$apply();
        });
    }

    $onChanges(changes) {
        if (changes.supplierId) {
            if (changes.supplierId.currentValue) {
                this.customer.getCartBySupplier(changes.supplierId.currentValue);
            }
        }
    }
    checkoutCart(id) {
        this.success = false;
        const _onSuccess = (res) => {
            if (res.status === 200) {
                this.cartIsCheck = true;
                this.success = true;
                this.$rootScope.cartItems = 0;
                // this.customer.cart = res.data.data;
                this.customer.cart = res.data.data.cart;
                this.customer.cart.total = res.data.data.total;
                this.customer.cart.vat = res.data.data.vat;
                this.customer.balanceDetails = res.data.data.balanceDetails;
                this.$rootScope.cart = this.cart;
                this.customer.getCartBySupplier(this.supplierId);
                this.$rootScope.$broadcast('checkoutCartUpdated');
                // this._$rootScope.cartItems = res.data.data.items;
               // this.customer.cart.products = [];
            }
        };
        const _onError = (err) => {
            if (err.code === 500) {
                this.hasError = true;
            } else if (err.code === 501) {
                this.noInternetConnection = true;
            } else if (err.data.errorCode === 7) {
                this.notify('customer.product.message.exceedLimit', 'info', 5000);
            } else {
                this.notify('customer.cart.message.checkoutCartFailure', 'danger', 5000);
            }
        };
        const _onFinal = () => {
            this.checkoutCartFinal = true;
        };

        if (this.isRecurring) {
            this._CartService.checkoutCart(id, this.customer.branchId, this.recurringBody).then(_onSuccess, _onError)
                .finally(_onFinal);
        } else {
            this._CartService.checkoutCart(id, this.customer.branchId, null).then(_onSuccess, _onError)
                .finally(_onFinal);
        }
    }


    deleteProductFromCart(productId, supplierId) {
        this.customer.deleteProductFromCart(productId, supplierId);
    }
    confirmDelete() {
        $('#deleteModal').modal('hide');
        this.deleteProductFromCart(this.itemToBeDelete, this.supplierId);
    }
    openConfirmMessage(id) {
        this.itemToBeDelete = id;
        $('#deleteModal').modal('show');
    }
    updateProductQuantity(productId, newQuantity) {
        if (newQuantity > 10000) {
            this.notify('customer.product.message.maxQuantity', 'danger', 5000);
            this.customer.getCartBySupplier(this.supplierId);
            return;
        }
        this.customer.updateProductQuantity(productId, newQuantity, this.supplierId);
    }
    changeSupplier() {
        this.success = false;
        this.customer.getCartBySupplier(this.supplierId);
    }
    notify(message, type, timeout) {
        this.$translate(message).then((translation) => {
            $('body')
                .pgNotification({
                    style: 'bar',
                    message: translation,
                    position: 'top',
                    timeout,
                    type
                })
                .show();
        });
    }
}
CartCtrl.$inject = ['SupplierService', 'CartService', '$stateParams', '$rootScope', '$scope', '$state', '$translate'];

const CartComponent = {
    controller: CartCtrl,
    templateUrl: 'app/customer/cart/cart.component.html',
    controllerAs: '$ctrl'
};
export default CartComponent;
