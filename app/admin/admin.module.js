import angular from "angular";
import adminConfig from "./admin.route";
import AdminCtrl from "./admin.controller";
import AdminProductCategoryCtrl from "./product/adminProductCategory.controller";
import AdminProductInventoryCtrl from "./inventory/adminProductInventory.controller";
import AdminSupplierCtrl from "./supplier/adminSupplier.controller";
import AdminReportOrdersCtrl from "./reports/orders/adminReportOrders.controller";
import AdminReportTransactionsCtrl from "./reports/transactions/adminReportTransaction.controller";
import AdminAccountProfileCtrl from "./account/profile/adminAccountProfile.controller";
import AdminAccountRolesCtrl from "./account/role/adminAccountRoles.controller";
import AdminAccountUserCtrl from "./account/user/adminAccountUser.controller";
import AdminAccountOthersCtrl from "./account/others/adminAccountOthers.controller";
import adminSupplierListCtrl from "./supplier/supplier-list/adminSupplierList.controller";
import adminSupplierDetailCtrl from "./supplier/supplier-detail/adminSupplierDetail.controller";
import supplierFormComponent from "./supplier/supplier-form/supplier-form.component";
import AdminReportOrderDetailsCtrl from "./reports/orders/details/AdminReportOrderDetails.controller";
import AdminSupplierPaymentDetailCtrl from "./supplier/payment/payment-detail/adminSupplierPaymentDetail.controller";
import AdminSupplierPaymentListCtrl from "./supplier/payment/payment-list/adminSupplierPaymentList.controller";
import InboxCtrl from "./messages/inbox.controller";
import EmailTemplatesCtrl from "./settings/system.email.templates.controller";
import SystemUnitsCtrl from "./settings/system.units.controller";
import SystemCMSCtrl from "./settings/system.cms.controller";
import SystemConfigCtrl from "./settings/system.config.controller";
/* 'ui.router', 'ipCookie', 'ngResource', 'oc.lazyLoad', 'ui.select'*/

const adminModule = angular.module("app.adminModule", []);
adminModule.config(adminConfig);
adminModule.controller("AdminCtrl", AdminCtrl);
adminModule.controller("AdminProductCategoryCtrl", AdminProductCategoryCtrl);
adminModule.controller("AdminProductInventoryCtrl", AdminProductInventoryCtrl);

adminModule.controller("AdminSupplierCtrl", AdminSupplierCtrl);
adminModule.controller("adminSupplierListCtrl", adminSupplierListCtrl);
adminModule.controller("adminSupplierDetailCtrl", adminSupplierDetailCtrl);
adminModule.controller(
  "AdminSupplierPaymentListCtrl",
  AdminSupplierPaymentListCtrl
);
adminModule.controller("AdminReportOrdersCtrl", AdminReportOrdersCtrl);
adminModule.controller(
  "AdminReportTransactionsCtrl",
  AdminReportTransactionsCtrl
);
adminModule.controller("AdminAccountProfileCtrl", AdminAccountProfileCtrl);
adminModule.controller("AdminAccountRolesCtrl", AdminAccountRolesCtrl);
adminModule.controller("AdminAccountUserCtrl", AdminAccountUserCtrl);
adminModule.controller("AdminAccountOthersCtrl", AdminAccountOthersCtrl);
adminModule.controller(
  "AdminReportOrderDetailsCtrl",
  AdminReportOrderDetailsCtrl
);
adminModule.controller(
  "AdminSupplierPaymentDetailCtrl",
  AdminSupplierPaymentDetailCtrl
);
adminModule.component("supplierForm", supplierFormComponent);
adminModule.controller("InboxCtrl", InboxCtrl);

adminModule.controller("EmailTemplatesCtrl", EmailTemplatesCtrl);
adminModule.controller("SystemUnitsCtrl", SystemUnitsCtrl);
adminModule.controller("SystemCMSCtrl", SystemCMSCtrl);
adminModule.controller("SystemConfigCtrl", SystemConfigCtrl);

export default adminModule;
