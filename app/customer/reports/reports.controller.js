import moment from 'moment';

export default class CustomerReportsCtrl {
    constructor(CustomerService, $state, $rootScope, suppliersResolve) {
        this._CustomerService = CustomerService;
        this.suppliersResolve = suppliersResolve;
        this._$state = $state;
        this._$rootScope = $rootScope;
    }

    $onInit() {
        $.Pages.init(); // eslint-disable-line
        moment.locale('en');

        this.currentPage = 1;
        this.searchCriteria = {
            skip: 0,
            limit: 15,
            type: 'All',
            supplierId: null,
            startDate: moment()
                .subtract(1, 'months')
                .format('YYYY-MM-DD'),
            endDate: moment()
                .add(1, 'day')
                .format('YYYY-MM-DD')
        };
        this.date = moment().format('dddd, MMM DD');
        $('#daterangepicker')
            .daterangepicker({
                timePicker: true,
                timePickerIncrement: 30,
                format: 'YYYY-MM-DD',
                startDate: moment()
                    .subtract(1, 'months')
                    .format('YYYY-MM-DD'),
                endDate: moment()
                    .add(1, 'day')
                    .format('YYYY-MM-DD')
            }, (start, end, label) => {
            });
        $('#daterangepicker')
            .on('apply.daterangepicker', (ev, picker) => {
                this.searchCriteria.startDate = picker.startDate.format('YYYY-MM-DD');
                this.searchCriteria.endDate = picker.endDate.format('YYYY-MM-DD');
               // this.listTransactions(this.searchCriteria);
            });
        this.customers = this.suppliersResolve.data.data.suppliers;
    }


    exportFile(type) {
        this._CustomerService.exportFile(type, 'transactions', this.searchCriteria);
    }

}

CustomerReportsCtrl.$inject = ['CustomerService', '$state', '$rootScope', 'suppliersResolve'];
