export default class AdminInventoriesCtrl {
    constructor() {
        // this._PaymentService = PaymentService;
    }

    $onInit() {
        $.Pages.init(); // eslint-disable-line
        // this.getPendingPaymentsCount();
    }

    getPendingPaymentsCount() {
        this.inventoriesIsLoaded = false;
        const _onSuccess = (res) => {
            this.inventoriesCount = res.data.data.count;
        };
        const _onError = (err) => {
            if (err.code === 500) {
                this.hasError = true;
            } else if (err.code === 501) {
                this.noInternetConnection = true;
            }
        };
        const _onFinal = () => {
            this.inventoriesIsLoadedd = true;
        };
        // return this._PaymentService.getPendingPaymentsCount()
        //     .then(_onSuccess, _onError)
        //     .finally(_onFinal);
    }
}
AdminInventoriesCtrl.$inject = ['$translate'];
