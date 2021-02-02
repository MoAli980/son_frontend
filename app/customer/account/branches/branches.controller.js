export default class CustomerListBranchesCtrl {
    constructor(UserService, CustomerService, RoleService, $translate, BranchService) {
        this._UserService = UserService;
        this._CustomerService = CustomerService;
        this._BranchService = BranchService;
        this._$translate = $translate;
        this.customerUsers = [];
        this.errors = [];
        this.totalPages = 0;
    }

    $onInit() {
        $.Pages.init(); // eslint-disable-line
        this.searchCriteria = {
            skip: 0,
            limit: 5,
            staffQuery: '',
            status: 'All'
        };
        this.status = {
            placeholder: { ar: 'اختر الحاله', en: 'Select Status' },
            data: [
                { key: 'All', ar: 'الكل', en: 'All' },
                { key: 'Active', ar: 'نشط', en: 'Active' },
                { key: 'Blocked', ar: 'محظور', en: 'Blocked' }
            ]
        };
        this.selectedStatus = this.status.data[0];
        this.getBranches(this.searchCriteria);
    }

    createBranch(branch) {
        const _onSuccess = (res) => {
            // if (res.status === 200) {
            this.notify('customer.account.branches.branch_added', 'success', 2000);
            this.searchCriteria.skip = 0;
            this.searchCriteria.limit = 5;
            this.getBranches(this.searchCriteria);
        };
        const _onError = (err) => {
            this.errors = err.data.data;
            this.notify('customer.account.branches.branch_failure', 'danger', 5000);
        };
        const _onFinal = () => {

        };
        this._BranchService.createBranch(branch)
            .then(_onSuccess, _onError)
            .finally(_onFinal);
    }

    getBranches(searchCriteria) {
        const _onSuccess = (res) => {
            this.branches = res.data.data.branches;
            this.totalPages = Math.ceil(res.data.data.count / this.searchCriteria.limit);
            this.location = this.branches[0].location;
        };
        const _onError = (err) => {
            this.errors = err.data.data;
        };
        const _onFinal = () => {
        };

        this._BranchService.getBranchesList(searchCriteria)
            .then(_onSuccess, _onError)
            .finally(_onFinal);
    }

    updateBranch(branch) {
        const _onSuccess = (res) => {
            this.notify('customer.account.branches.branch_updated', 'success', 2000);
            this.searchCriteria.skip = 0;
            this.searchCriteria.limit = 5;
            this.getBranches(this.searchCriteria);
        };
        const _onError = (err) => {
            this.errors = err.data.data;
            this.notify('customer.account.branches.branch_failure', 'danger', 5000);
        };
        const _onFinal = () => {

        };
        this._BranchService.updateBranch(branch._id, branch)
            .then(_onSuccess, _onError)
            .finally(_onFinal);
    }

    onFilterChange() {
        this.searchCriteria.status = this.selectedStatus.key;
        this.currentPage = 1;
        this.searchCriteria.skip = 0;
        this.getBranches(this.searchCriteria);
    }

    setPage(pageNumber) {
        this.currentPage = pageNumber;
        this.searchCriteria.skip = (pageNumber - 1) * this.searchCriteria.limit;
        this.searchCriteria.limit = pageNumber;
        this.getBranches(this.searchCriteria);
    }

    translateStatus(key) {
        const item = this.status.data.find(obj => obj.key === key);
        return this._$translate.use() === 'ar' ? item.ar : item.en;
    }

    openNewUserPopup() {
        this.mode = 'Save';
        $('#branchModal').modal('show');
    }

    openEditUserPopup(branch) {
        this.branch = branch;
        this.mode = 'Update';
        $('#branchModal').modal('show');
    }

    notify(message, type, timeout) {
        this._$translate(message).then((translation) => {
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

CustomerListBranchesCtrl.$inject = ['UserService', 'CustomerService', 'RoleService', '$translate', 'BranchService'];
