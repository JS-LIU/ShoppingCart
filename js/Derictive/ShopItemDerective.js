/**
 * Created by 殿麒 on 2016/6/13.
 */
(function(){
    angular.module('ShoppingCartModule')
        .directive('shopItem',function(){


            var shopitem = {
                restrict:'EA',
                priority:1000,
                templateUrl:'appTemplate/shopItem.html',
                replace:'true',
                link:ShopItemLink,
                controller:ShopItemCtrl,
                scope:'true'
            }
            function ShopItemLink(scope){
                scope.$watch()
            };
            function ShopItemCtrl($scope){
                console.log($scope);
            };
            return shopitem;
        });
}());