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
<<<<<<< HEAD
=======
        this.dateMethod = 'Hijri';
>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
        moment.locale('en');
        this.isRecurring = false;
        this.recurringBody = {
            startDate: moment().format('YYYY-MM-DD'),
            orderIntervalType: 'Week',
<<<<<<< HEAD
            orderFrequency: 1
        };
=======
            orderFrequency: 1,
            deliveryDate: null,
            deliveryDateIslamic: null
        };

>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
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
<<<<<<< HEAD
           // this.$log.info('State params have been updated', this.$scope.stateParams);
=======
            // this.$log.info('State params have been updated', this.$scope.stateParams);
>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
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
<<<<<<< HEAD
=======

        angular.element('#deliveryDateIslamic').calendarsPicker({
            calendar: $.calendars.instance('islamic'),
            monthsToShow: [1, 1],
            maxDate: '+5Y',
            showOtherMonths: false,
            dateFormat: 'yyyy-mmm-dd',
            onSelect(date) {
                document.getElementById('deliveryDateIslamic').value = date;
            }
        });

        angular.element('#deliveryDate').calendarsPicker({
            calendar: $.calendars.instance('gregorian'),
            monthsToShow: [1, 1],
            maxDate: '+5Y',
            showOtherMonths: false,
            onSelect(date) {
                document.getElementById('deliveryDate').value = date;
            }
        });

        document.getElementById('deliveryDateIslamic').setAttribute('max', this.writeHijri());
        document.getElementById('deliveryDate').setAttribute('max', this.writeGregorian());
    }

    writeHijri() {
        const date = new Date();
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric'
        };
        return new moment(date.toLocaleString('en' + '-u-ca-islamic', options)).add('Year', 5).format('YYYY-MM-DD').replace(/[\u0660-\u0669\u06f0-\u06f9]/g, c => c.charCodeAt(0) & 0xf);
    }

    writeGregorian() {
        const dateString = new moment().add('Year', 5).format('YYYY-MM-DD');
        return dateString.trim().replace(/[\u0660-\u0669\u06f0-\u06f9]/g, c => c.charCodeAt(0) & 0xf);
>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
    }

    $onChanges(changes) {
        if (changes.supplierId) {
            if (changes.supplierId.currentValue) {
                this.customer.getCartBySupplier(changes.supplierId.currentValue);
            }
        }
    }
<<<<<<< HEAD
=======

>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
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
<<<<<<< HEAD
               // this.customer.cart.products = [];
=======
                // this.customer.cart.products = [];
>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
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
<<<<<<< HEAD
=======

>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
    confirmDelete() {
        $('#deleteModal').modal('hide');
        this.deleteProductFromCart(this.itemToBeDelete, this.supplierId);
    }
<<<<<<< HEAD
=======

>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
    openConfirmMessage(id) {
        this.itemToBeDelete = id;
        $('#deleteModal').modal('show');
    }
<<<<<<< HEAD
=======

>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
    updateProductQuantity(productId, newQuantity) {
        if (newQuantity > 10000) {
            this.notify('customer.product.message.maxQuantity', 'danger', 5000);
            this.customer.getCartBySupplier(this.supplierId);
            return;
        }
        this.customer.updateProductQuantity(productId, newQuantity, this.supplierId);
    }
<<<<<<< HEAD
=======

>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
    changeSupplier() {
        this.success = false;
        this.customer.getCartBySupplier(this.supplierId);
    }
<<<<<<< HEAD
=======

>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
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
<<<<<<< HEAD
=======

>>>>>>> 2bbd929f75a183f6e899e74b0b6bc39c9e021ce1
CartCtrl.$inject = ['SupplierService', 'CartService', '$stateParams', '$rootScope', '$scope', '$state', '$translate'];

const CartComponent = {
    controller: CartCtrl,
    templateUrl: 'app/customer/cart/cart.component.html',
    controllerAs: '$ctrl'
};
export default CartComponent;
