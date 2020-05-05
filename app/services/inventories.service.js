export default class InventoryService {

    constructor(AppConstants, JwtService, RetryRequest) {
        this._AppConstants = AppConstants;
        this.current = null;
        this._JwtService = JwtService;
        this.retryRequest = RetryRequest;
        this._request = {};
        this._request.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this._JwtService.get()}`
        };
    }

    getInventories(searchCriteria) {
        const request = {};
        request.url = `${this._AppConstants.api}/inventory/recipes/items?`;
        request.method = 'GET';
        request.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this._JwtService.get()}`
        };

        if (searchCriteria) {
            if (searchCriteria.skip || searchCriteria.skip === 0) {
                request.url = request.url.concat(`skip=${searchCriteria.skip}&`);
            }
            if (searchCriteria.limit) {
                request.url = request.url.concat(`limit=${searchCriteria.limit}&`);
            }
            if (searchCriteria.inventoryName) {
                request.url = request.url.concat(`inventoryName=${searchCriteria.inventoryName}&`);
            }
        }
        return this.retryRequest(request);
    }

}
