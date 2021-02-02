function CreateBranchCtrl($rootScope, $translate, NgMap, $scope) {
    const ctrl = this;
    ctrl.$translate = $translate;
    ctrl.$onInit = () => {
        $.Pages.init();

        settingCoordinates(ctrl);

        ctrl.branchForm = {};
    };

    ctrl.placeChanged = function () {
        NgMap.getMap('map').then((map) => {
            this.map = map;
            ctrl.place = this.getPlace();
            ctrl.branch.location
                .coordinates = [ctrl.place.geometry.location.lat(),
                ctrl.place.geometry.location.lng()];
            // this.map.setCenter(this.place.geometry.location);
        });
    };
    ctrl.markerDragEnd = function (event) {
        ctrl.geocodeLatLng(event.latLng.lat(), event.latLng.lng());
        ctrl.branch.location.coordinates = [event.latLng.lat(), event.latLng.lng()];
    };

    ctrl.onSubmit = (branchForm) => {
        if (branchForm.$invalid) return;

        if (ctrl.mode === 'Save') {
            ctrl.onSave({branch: ctrl.branch});
        } else if (ctrl.mode === 'Update') {
            ctrl.onUpdate({branch: ctrl.branch});
        }
        $('#branchModal').modal('hide');
        if (ctrl.mode === 'Save') {
            setTimeout(() => {
                ctrl.resetForm(branchForm);
            }, 2000);
        }
    };

    ctrl.resetForm = (branchForm) => {
        if (ctrl.mode === 'Save') {
            ctrl.branch.location.city = '';
            ctrl.branch.branchName = '';
            branchForm.$setPristine();
            branchForm.$setUntouched();
        }
    };
    ctrl.translateStatus = (key) => {
        const item = ctrl.status.data.find(obj => obj.key === key);
        return $translate.use() === 'ar' ? item.ar : item.en;
    };

    ctrl.geocodeLatLng = (lat, lng) => {
        const geocoder = new google.maps.Geocoder();
        const latlng = {lat, lng};
        geocoder.geocode({location: latlng}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    ctrl.branch.location.address = results[0].formatted_address;

                    if (results[0] && results[0].address_components) {
                        results[0].address_components.forEach((address) => {
                            if (address.types.includes('locality')) {
                                ctrl.branch.location.city = address.long_name;
                            }
                        });
                    }

                    $rootScope.$digest();
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert(`Geocoder failed due to: ${status}`);
            }
        });
    };

    function settingCoordinates(data) {
        setTimeout(() => {
            if (data.mode === 'Update') {
                ctrl.branch = data;
            } else {
                if (data && data.location && data.location.coordinates && data.location.coordinates[0] === 0 && data.location.coordinates[1] === 0) {
                    data.location.coordinates = [46.5423373, 24.7255553];
                } else {
                    ctrl.branch = {
                        location: data.location
                    };
                }
            }
        }, 10);
    }
}

CreateBranchCtrl.$inject = ['$rootScope', '$translate', 'NgMap', '$scope'];

const CreateBranch = {
    bindings: {
        onSave: '&',
        onUpdate: '&',
        branch: '=',
        mode: '<',
        location: '='
    },
    controller: CreateBranchCtrl,
    controllerAs: '$ctrl',
    templateUrl: 'app/components/create-branch/create-branch.component.html',
};

export default CreateBranch;

