angular.module('usPhone', []);
angular.module('usPhone').filter('phonenumber', function() {
    return function (number) {
        if (!number) { return ''; }
        number = String(number);
        var formattedNumber = number;
        var c = (number[0] == '+7') ? '+7 ' : '';
        number = number[0] == '+7' ? number.slice(2) : number;
        var area = number.substring(0,3);
        var front = number.substring(3, 6);
        var middle = number.substring(6, 8);
        var end = number.substring(8, 10);
        if (front) {
            formattedNumber = (c + "(" + area + ") " + front);
        }
        if (middle) {
            formattedNumber += ("-" + middle);
        }

        if (end) {
            formattedNumber += ("-" + end);
        }
        return formattedNumber;
    };
});

angular.module('usPhone').directive('usPhoneDirective', ['$filter', function($filter){
    return {
        restrict: 'A',
        scope: {
            ngModel: '='
        },
        link: function($scope, iElm, iAttrs, controller) {
            $scope.$watch('ngModel', function(value, oldValue) {
                var number = String(value).replace(/[^0-9]+/g, '');
                $scope.ngModel = $filter('phonenumber')(number);
            });
        }
    };
}]);
