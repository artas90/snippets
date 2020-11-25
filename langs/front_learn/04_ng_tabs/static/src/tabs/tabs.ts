/// <reference path='../../vendor/_typings/jquery/jquery.d.ts' />
/// <reference path='../../vendor/_typings/angularjs/angular.d.ts' />

import {Controller} from "decorators";

@Controller('TabsCtrl') 
export class TabsCtrl {

    public static $inject = [
        '$scope'
    ];

    constructor(
        private $scope  // : ITodoScope
    ) {
        $scope.currentTab = 'one.tpl.html';

        $scope.tabs = [{
                title: 'One',
                url: 'one.tpl.html'
            }, {
                title: 'Two',
                url: 'two.tpl.html'
            }, {
                title: 'Three',
                url: 'three.tpl.html'
        }];

        $scope.onClickTab = function(tab) {
            $scope.currentTab = tab.url;
        }

        $scope.isActiveTab = function(tabUrl) {
            return tabUrl == $scope.currentTab;
        }
    }
}


// angular.module('TabsApp', [])
// .controller('TabsCtrl', ['$scope', function ($scope) {
//     $scope.tabs = [{
//             title: 'One',
//             url: 'one.tpl.html'
//         }, {
//             title: 'Two',
//             url: 'two.tpl.html'
//         }, {
//             title: 'Three',
//             url: 'three.tpl.html'
//     }];
//
//     $scope.currentTab = 'one.tpl.html';
//
//     $scope.onClickTab = function (tab) {
//         $scope.currentTab = tab.url;
//     }
//    
//     $scope.isActiveTab = function(tabUrl) {
//         return tabUrl == $scope.currentTab;
//     }
// }]);
