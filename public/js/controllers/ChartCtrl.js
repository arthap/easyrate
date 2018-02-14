
/* Chart Controller */
easyrateApp.controller('ChartCtrl', [
    '$scope', '$http', '$location', '$cookieStore', '$routeParams', 'UserService',
    function ($scope, $http, $location, $cookieStore, $routeParams, UserService) {
        $scope.productId = $routeParams.productId;
        var vm = this;

        vm.getproductReviewRaiting = function () {
            UserService.GetproductReviewRaiting($scope.productId)
                .then(function (productReviewRaitingArray) {
                    $scope.productReviewRaitingArray = [];
                    if (productReviewRaitingArray.data.length > 0) {
                        productReviewRaitingArray.data.forEach(function (d) {

                            $scope.productReviewRaitingArray.push([new Date(d.CREATED_AT).getTime(), d.CURRENT_RATE]);


                        }, this);
                        ;
                        $scope.data = [
                            {
                                "key": "Product statictics",
                                "values": $scope.productReviewRaitingArray
                            }
                        ]
                        console.log("Array");
                        console.log($scope.productReviewRaitingArray);

                    } else {
                        $scope.productReviewRaitingArray.push([new Date().getTime(), 0]);
                        $scope.data = [
                            {
                                "key": "Product statictics",
                                "values": $scope.productReviewRaitingArray
                            }
                        ]
                    }
                })

        }
        vm.getproductReviewRaiting();
        vm.timeInMilisec = new Date('2016-08-03 12:24:51.0').getTime();
        // $scope.t=2016-08-03 12:24:51.0
        var date = new Date(vm.timeInMilisec);


        $scope.options = {
            chart: {
                type: 'stackedAreaChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                x: function (d) {
                    return d[0];
                },
                y: function (d) {
                    return d[1];
                },
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    showMaxMin: false,
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: function (d) {
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        // $scope.data = [
        // 	{
        // 		"key" : "dur" ,
        // 		"values" : [ [ 1025409600000 , 5] , [ 1028088000000 , 2.854291255832] , [ 1030766400000 , 3.02286281168] , [ 1470212691000 , 4.093608385173] ]
        // 	}
        // ,
        //
        // {
        // 	"key" : "ak" ,
        // 	"values" : [ [ 1025409600000 , 1] , [ 1028088000000 , 2.4514668527298] , [ 1030766400000 , 4.9085410566608] , [ 1033358400000 , 3.8996782364764]]
        // },
        //
        // {
        // 	"key" : "sidelnik" ,
        // 	"values" : [ [ 1025409600000 , 2] , [ 1028088000000 , 1.0899888751059] , [ 1030766400000 , 4.5996132380614] , [ 1033358400000 , 3.2741174301034] ]
        // }


        // ]

    }

]);
