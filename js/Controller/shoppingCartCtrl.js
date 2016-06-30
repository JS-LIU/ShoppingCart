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

                check:false,

                undelete:true
            };

            ShoppingCartService.addProp($scope.shoppingCart.shopList,{check:false,price:0,num:1,undelete:true});

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
            shoppingCart.check = HB.arrObj.isEmpty(HB.arrObj.findObjs(shoppingCart.shopList,{check:false}));

            //  整个购物车价格
            shoppingCart.price = ShoppingCartService.calcTotleMoney(shoppingCart,shoppingCart.shopList);

        };

        //  选择商品
        $scope.productChange = function(productItem,shopItem,shoppingCart){

            //  商店选择
            shopItem.check = HB.arrObj.isEmpty(HB.arrObj.findObjs(shopItem.itemList,{check:false}));

            //  商店价格
            shopItem.price = ShoppingCartService.calcTotleMoney(shopItem,shopItem.itemList,{check:true});

            //  整个购物车选择
            shoppingCart.check = HB.arrObj.isEmpty(HB.arrObj.findObjs(shoppingCart.shopList,{check:false}));

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

        $scope.deleteShopItem = function(shopItem,shoppingCart){

            shopItem.undelete = false;

            shoppingCart.shopList = HB.arrObj.deleteObjs(shoppingCart.shopList,{undelete:false});

            shoppingCart.price = ShoppingCartService.calcTotleMoney(shoppingCart,shoppingCart.shopList);
        };

        $scope.deleteProductItem = function(productItem,shopItem,shoppingCart){

            productItem.undelete = false;

            shopItem.itemList = HB.arrObj.deleteObjs(shopItem.itemList,{undelete:false});

            shopItem.price = ShoppingCartService.calcTotleMoney(shopItem,shopItem.itemList,{check:true});

            shoppingCart.price = ShoppingCartService.calcTotleMoney(shoppingCart,shoppingCart.shopList);

        };

        $scope.deleteSelect = function(shoppingCart){

            shoppingCart.shopList = HB.arrObj.deleteObjs(shoppingCart.shopList,{check:true});

            angular.forEach(shoppingCart.shopList,function(shopItem){

                shopItem.itemList = HB.arrObj.deleteObjs(shopItem.itemList,{check:true});

                shopItem.price = ShoppingCartService.calcTotleMoney(shopItem,shopItem.itemList,{check:true});

            });

            shoppingCart.price = ShoppingCartService.calcTotleMoney(shoppingCart,shoppingCart.shopList);

        };

    };
}());