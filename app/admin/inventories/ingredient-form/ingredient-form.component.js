import moment from "moment";

class ingredientFormCtrl {
  constructor(RecipeService, $translate, $rootScope, Upload, AppConstants) {
    this._RecipeService = RecipeService;
    this._$translate = $translate;
    this.$rootScope = $rootScope;
    this.Upload = Upload;
    this.UPLOAD_URL = AppConstants.UPLOAD_URL;
  }

  $onInit() {
    const ctrl = this;
    // this.dateMethod = "Hijri";
    moment.locale("en");
    this.formData = {};
    this.imageValitation = false;
    this.registerLoading = false;
    $.Pages.init();
    this.formData.commercialRegisterExpireDate = null;
    this.formData.commercialRegisterExpireDateIslamic = null;

    // angular.element('#commercialRegisterExpireDateIslamic').calendarsPicker({
    //     calendar: $.calendars.instance('islamic'),
    //     monthsToShow: [1, 1],
    //     maxDate: '+5Y',
    //     showOtherMonths: false,
    //     dateFormat: 'yyyy-mmm-dd',
    //     onSelect(date) {
    //         document.getElementById(
    //             'commercialRegisterExpireDateIslamic'
    //         ).value = date;
    //     },
    // });
    //
    // angular.element('#commercialRegisterExpireDate').calendarsPicker({
    //     calendar: $.calendars.instance('gregorian'),
    //     monthsToShow: [1, 1],
    //     maxDate: '+5Y',
    //     showOtherMonths: false,
    //     onSelect(date) {
    //         document.getElementById('commercialRegisterExpireDate').value = date;
    //     },
    // });

    // document
    //     .getElementById('commercialRegisterExpireDateIslamic')
    //     .setAttribute('max', this.writeHijri());
    // document
    //     .getElementById('commercialRegisterExpireDate')
    //     .setAttribute('max', this.writeGregorian());
  }

  createIngredient(ingredientForm) {
    if (ingredientForm.$invalid) return;
    this.isFailure = false;
    this.isSuccess = false;
    this.registerLoading = true;
    this.loading = true;
    this.formData.language = this.$rootScope.currentLanguage.language;
    // this.formData.commercialRegisterExpireDate = moment(this.formData.commercialRegisterExpireDate).format('YYYY-MM-DD');
    this._RecipeService
      .createIngredient(this.formData, true)
      .then(
        (res) => {
          this.isSuccess = true;
          this.message = "admin.recipes.create-recipe.message.success_creation";
          this.notify(this.message, "success", 3000);
          this.$rootScope.$broadcast("getRecipes");
          $("#ingredientFormModal").modal("hide");
          this.resetForm(ingredientForm);
        },
        (err) => {
          if (err.code === 500) {
            this.hasError = true;
            $("#ingredientFormModal").modal("hide");
          } else if (err.code === 501) {
            this.noInternetConnection = true;
            $("#ingredientFormModal").modal("hide");
          }
          if (err.data) {
            if (err.data.errorCode === 20) {
              this.isFailure = true;
              this.message =
                "admin.recipes.create-recipe.message.expireDate_exceed";
              this.notify(this.message, "danger", 7000);
            } else if (err.data.errorCode === 21) {
              this.isFailure = true;
              this.message =
                "admin.recipes.create-recipe.message.expireDate_todayOrLess";
              this.notify(this.message, "danger", 7000);
            } else if (err.data.errorCode === 22) {
              this.isFailure = true;
              this.message =
                "admin.recipes.create-recipe.message.expireDateHijri_exceed";
              this.notify(this.message, "danger", 7000);
            } else if (err.data.errorCode === 23) {
              this.isFailure = true;
              this.message =
                "admin.recipes.create-recipe.message.expireDateHijri_todayOrLess";
              this.notify(this.message, "danger", 7000);
            } else if (err.data.errorCode === 3) {
              // alert('already have account');
              this.isFailure = true;
              this.message =
                "admin.recipes.create-recipe.message.already_have_account";
              this.notify(this.message, "danger", 5000);
              $("#ingredientFormModal").modal("hide");
            } else if (err.data.errorCode === 14) {
              // Only images are allowed (Formats supported: png, jpg, jpeg).
              this.message = "admin.recipes.create-recipe.message.invalidFile";
              this.isFailure = true;
              this.notify(this.message, "danger", 5000);
            } else if (err.data.errorCode === 32) {
              // "errorCode":32,"data":"Commercial Register is duplicate"
              this.message =
                "admin.recipes.create-recipe.message.commercialRegisterIsDuplicate";
              this.isFailure = true;
              this.notify(this.message, "danger", 5000);
              $("#ingredientFormModal").modal("hide");
            } else if (err.data.errorCode === 31) {
              // "errorCode":31,"data":"Email or MobilePhone is duplicate"
              this.message =
                "admin.recipes.create-recipe.message.emailOrMobilePhoneIsDuplicate";
              this.isFailure = true;
              this.notify(this.message, "danger", 5000);
              $("#ingredientFormModal").modal("hide");
            } else {
              this.message =
                "admin.recipes.create-recipe.message.failed_creation";
              this.isFailure = true;
              this.notify(this.message, "danger", 5000);
              $("#ingredientFormModal").modal("hide");
            }
          }

          this.isError = true;
          this.errors = err.data.data;
        }
      )
      .catch(() => {
        this.isFailure = true;
        this.message = "admin.recipes.create-recipe.message.failed_creation";
        this.notify(this.message, "danger", 5000);
      })
      .finally(() => {
        // this.resetForm(ingredientForm);
        this.loading = false;
        this.registerLoading = false;
      });
  }

  notify(message, type, timeout) {
    this._$translate(message).then((translation) => {
      $("body")
        .pgNotification({
          style: "bar",
          message: translation,
          position: "top",
          timeout,
          type,
        })
        .show();
    });
  }

  resetForm(ingredientForm) {
    this.formData = {};
    this.formData.commercialRegisterExpireDate = new Date(
      moment().format("YYYY-MM-DD")
    );
    // userForm.$setValidity();
    this.commercialPhoto = null;
    this.VATPhoto = null;
    this.formData.commercialRegisterPhoto = null;
    this.commercialRegisterPhoto = null;
    this.formData.VATRegisterPhoto = null;
    this.VATRegisterPhoto = null;
    if (ingredientForm) {
      ingredientForm.$setPristine();
      ingredientForm.$setUntouched();
    }
  }
}

ingredientFormCtrl.$inject = [
  "RecipeService",
  "$translate",
  "$rootScope",
  "Upload",
  "AppConstants",
];

const ingredientFormComponent = {
  bindings: {},
  templateUrl:
    "app/admin/inventories/ingredient-form/ingredient-form.component.html",
  controller: ingredientFormCtrl,
};
export default ingredientFormComponent;
