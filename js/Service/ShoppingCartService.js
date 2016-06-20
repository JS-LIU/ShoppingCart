/**
 * Created by 殿麒 on 2016/6/12.
 */
(function(){
    angular.module('ShoppingCartModule',['ngResource'])
        .factory('ShoppingCartService',ShoppingCartService);

    function ShoppingCartService($resource){

        var ShoppingCartList = $resource('/shoppingCart/data/:op',{op:'@op'});

        var shoppingCart = {

            addProp:{},

            getCartList:{},

            findWhere:{},

            calcTotleMoney:{},

            changeNumber:{},

            increment:{}

        };
        //  添加属性方法
        shoppingCart.addProp = function(list,propObj){

            var self = arguments.callee;

            angular.forEach(list,function(data){

                for(var prop in propObj){

                    if(!data[prop]){

                        data[prop] = propObj[prop];

                    }

                }

                self(data.itemList,propObj);

            });
            console.log(list);
            return list;

        };

        shoppingCart.getCartList = function(){

            return ShoppingCartList.get({op:'shoppingCart.json'}).$promise;

        };


        shoppingCart.findWhere = function(list,obj){

            for(var i = 0,len = list.length;i < len ;i++){

                for(var prop in obj){

                    if(list[i][prop] != obj[prop]){

                        return list[i];

                    }

                }

            };

        };


        shoppingCart.calcTotleMoney = function(item,list,obj){

            item.price = 0;

            for(var i = 0,len = list.length; i < len;i++){

                var flag = true;

                for(var prop in obj){

                    if(list[i][prop] != obj[prop]){

                        flag = false;

                        break;

                    }

                }

                if(flag){

                    item.price += list[i].price * list[i].num;

                }

            };

            return item.price;

        }

        shoppingCart.changeNumber = function(){



        }

        return shoppingCart;

    };
}());