angular.module('MainCtrl', ['ngMaterial'])
    .controller('MainController', ['$scope', '$mdDialog', 'DeviceService', function($scope, $mdDialog, DeviceService) {

        $scope.devices = [];
        $scope.addNew = showAddNewDialog;
        $scope.deviceDetails = showDetailswDialog;
        $scope.deviceEdit = showEditDialog;
        $scope.deleteDevice = showDeleteDialog;

        $scope.init = function() {
            $scope.getAll();
        };

        //Gets all devices alresdy stored
        $scope.getAll = function() {
            DeviceService.getDevices()
                .then(function(res) {
                    //suceess
                    $scope.devices = res;
                }, function(err) {
                    console.log(err);
                });
        };

        //remove a stored device
        /* $scope.deleteDevice = function(id) {
            DeviceService.deleteDevice()
                .then(function(res) {
                    $scope.getAll();
                }, function(err) {
                    console.log(err);
                });
        };
*/
        //hanldes details dialog window
        function showDetailswDialog($event, device) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'views/details-view.html',
                controller: DialogController,
                locals: {
                    device: device
                },
            });

            function DialogController(scope, $mdDialog, device) {
                scope.device = device;
                scope.back = function() {
                    $mdDialog.hide();
                };
            }
        }

        //hanldes delete dialog window
        function showDeleteDialog($event, device) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'views/delete-view.html',
                controller: DialogController,
                locals: {
                    device: device
                },
            });

            function DialogController(scope, $mdDialog, device) {
                scope.device = device;
                scope.cancel = function() {
                    $mdDialog.hide();
                };
                scope.delete = function() {

                    //Post code if end point would be available
                    /*  DeviceService.deleteDevice(device.id)
                          .then(function(res) {
                              $scope.getAll();
                          }, function(err) {
                              console.log(err);
                          });          */



                    $mdDialog.hide();
                };
            }
        }




        //handles edit dialog window
        function showEditDialog($event, device) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'views/edit-view.html',
                controller: DialogController,
                locals: {
                    device: device
                },

            });

            function DialogController(scope, $mdDialog, device) {
                scope.device = device;

                scope.cancel = function() {
                    $scope.getAll();
                    $mdDialog.hide();
                };

                scope.save = function(device) {
                    $scope.devices.push(device);
                    $mdDialog.hide();

                    //Post code if end point would be available
                    DeviceService.updateDevice(device.id)
                        .then(function(res) {
                            $scope.getAll();
                        }, function(err) {
                            console.log(err);
                        });

                };
            }
        }

        //handles new device dialog window
        function showAddNewDialog($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'views/addNew-view.html',
                controller: DialogController,

            });

            function DialogController(scope, $mdDialog) {

                scope.cancel = function() {
                    $scope.getAll();
                    $mdDialog.hide();
                };

                scope.save = function(device) {
                    $scope.devices.push(device);
                    $mdDialog.hide();

                    //Post code if end point would be available
                    /*DeviceService.addDevice()
                        .then(function(res) {
                            $scope.getAll();
                        }, function(err) {
                            console.log(err);
                        });          */

                };
            }
        }


    }]);