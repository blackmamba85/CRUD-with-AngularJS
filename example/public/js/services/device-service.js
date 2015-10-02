angular.module('device-service', []).factory('DeviceService', ['$http', '$q',
    function($http, $q) {


        var device = this;
        device.deviceList = {};

        device.getDevices = function() {
            var defer = $q.defer();

            $http.get('json/devices.json')
                .success(function(res) {
                    device.deviceList = res;
                    defer.resolve(res);
                })
                .error(function(err, status) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        device.addDevice = function(device) {
            var defer = $q.defer();

            $http.post('/newDevice', device)
                .success(function(res) {
                    defer.resolve(res);
                })
                .error(function(err, status) {
                    defer.reject(err);
                });
            return defer.promise;

        };

         device.updateDevice = function(id) {
            var defer = $q.defer;

            $http.put('/updateDevice?id=' + id)
                .success(function(res) {
                    defer.resolve(res);
                })
                .error(function(err, status) {
                    defer.reject(err);
                });

            return defer.promise;

        };


        device.deleteDevice = function(id) {
            var defer = $q.defer;

            $http.delete('/deleteDevice?id=' + id)
                .success(function(res) {
                    defer.resolve(res);
                })
                .error(function(err, status) {
                    defer.reject(err);
                });

            return defer.promise;

        };

    



        return device;

    }
]);