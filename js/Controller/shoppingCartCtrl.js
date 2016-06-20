/**
 * Created by 殿麒 on 2016/6/12.
 */
(function(){
    angular.module('myApp',['ngResource','ShoppingCartModule'])
        .controller('shoppingCartCtrl',shoppingCartCtrl);
    function shoppingCartCtrl($scope,ShoppingCartService){

        //  购物车列表
        ShoppingCartService.getCartList().then(function(data){

            $scope.shoppingCart = {

                shopList:data.cartInfos,

                price:0,

                num:1,

                check:false
            };

            ShoppingCartService.addProp($scope.shoppingCart.shopList,{check:false,price:0,num:1});

        });

        //  选择购物车
        $scope.cartChange = function(shoppingCart){

            //  选择购物车下所有商店
            angular.forEach(shoppingCart.shopList,function(shopItem){

                shopItem.check = shoppingCart.check;

                //  选择该商店下所有商品
                angular.forEach(shopItem.itemList,function(pruductItem){

                    pruductItem.check = shopItem.check;

                });

                //  商店价格
                shopItem.price = ShoppingCartService.calcTotleMoney(shopItem,shopItem.itemList,{check:true});
            });

            //  整个购物车价格
            shoppingCart.price = ShoppingCartService.calcTotleMoney(shoppingCart,shoppingCart.shopList);
        };

        //  选择店铺
        $scope.shopItemChange = function(shopItem,shoppingCart){

            //  选择该商店下所有商品
            angular.forEach(shopItem.itemList,function(pruductItem){

                pruductItem.check = shopItem.check;

            });

            //  商店价格
            shopItem.price = ShoppingCartService.calcTotleMoney(shopItem,shopItem.itemList,{check:true});

            //  整个购物车选择
            shoppingCart.check = !ShoppingCartService.findWhere(shoppingCart.shopList,{check:true});

            //  整个购物车价格
            shoppingCart.price = ShoppingCartService.calcTotleMoney(shoppingCart,shoppingCart.shopList);

        };

        //  选择商品
        $scope.productChange = function(productItem,shopItem,shoppingCart){

            //  商店选择
            shopItem.check = !ShoppingCartService.findWhere(shopItem.itemList,{check:true});

            //  商店价格
            shopItem.price = ShoppingCartService.calcTotleMoney(shopItem,shopItem.itemList,{check:true});

            //  整个购物车选择
            shoppingCart.check = !ShoppingCartService.findWhere(shoppingCart.shopList,{check:true});

            //  整个购物车价格
            shoppingCart.price = ShoppingCartService.calcTotleMoney(shoppingCart,shoppingCart.shopList);

        };

        //  商品数量变化
        $scope.incrementQuantity = function(productItem,shopItem,shoppingCart){

            productItem.num ++;

            $scope.productItemNumChange(productItem,shopItem,shoppingCart);
        };

        //  商品数量变化
        $scope.decrementQuantity = function(productItem,shopItem,shoppingCart){

            productItem.num --;

            $scope.productItemNumChange(productItem,shopItem,shoppingCart);
        };

        $scope.productItemNumChange = function(productItem,shopItem,shoppingCart){

            if(productItem.check){

                //  商店价格
                shopItem.price = ShoppingCartService.calcTotleMoney(shopItem,shopItem.itemList,{check:true});

                //  整个购物车价格
                shoppingCart.price = ShoppingCartService.calcTotleMoney(shoppingCart,shoppingCart.shopList);

            }
        }
    };
}());