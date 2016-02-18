/// <reference path="../../../typings/tsd.d.ts" />
angular
    .module("app.deliveryrecord", [])

    .controller("DeliveryRecordController", ['commonService', DeliveryRecordController])

function DeliveryRecordController(commonService) {
    let _self = this;
     _self.loader = false;
    commonService.getCompany().then(function(response) {
        var companyId = response.data[0].adminId;
           _self.loader = true;

        commonService.getDeliveryOrder(companyId).then(function(response) {
            commonService.showMsg("Delivery record loaded")
            _self.deliverRecord = response.data.success;
            _self.loader = false;
        }, function(err) {
            commonService.showMsg("Failed to get delivery record")
           _self.loader = false;   
     })
    }, function(err) {
        //  console.log(err);
    });
}