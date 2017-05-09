<template>
    <div class="cart">
        <div class="cart-header">
            <router-link to="/"
                         class="icon-close icon"></router-link>
            <span>购物车</span>
        </div>
        <div class="cart-main">
            <div class="item"
                 v-for="sell in sells"
                 v-show="sell.foods.foods.length > 0">
                <div class="item-header">
                    <router-link :to="`/seller/${sell.seller.id}`"
                                 class="name">{{sell.seller.name}}</router-link>
                    <span class="icon-close icon"
                          @click="remove(sell)"></span>
                </div>
                <div class="item-food"
                     v-for="food in sell.foods.foods">
                    <div class="food-icon">
                        <img :src="food.icon" />
                    </div>
                    <div class="food-center">
                        <span class="food-name">{{food.name}}</span>
                        <span class="count">x {{food.count}}</span>
                    </div>
                    <div class="food-right">
                        <span class="oldprice"
                              v-show="oldpriceShow(food)">¥{{food.count * food.oldPrice}}</span>
                        <span>¥{{computePrice(food)}}</span>
                    </div>
                </div>
                <div class="deliver"
                     v-show="sell.seller.deliveryPrice">
                    <span class="deliver-name">运费</span>
                    <span class="deliver-price">¥{{sell.seller.deliveryPrice}}</span>
                </div>
                <div class="item-footer">
                    <span class="discoutDesc">{{discountDesc(sell.foods.discountDesc)}}</span>
                    <span>合计</span><span class="total-price">¥{{totalPrice(sell.foods.foods, sell.seller.deliveryPrice, sell.foods.discountDesc)}}</span>
                    <span class="pay">去结算</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import util from '../../util';
export default {
    data () {
        return {
            sells: []
        };
    },
    created () {
        this.$store.dispatch('getLocalstore');
        let sellerMap = this.$store.state.sellerMap;
        let sellers = this.$store.state.sellers;
        let sells = [];
        Object.keys(sellerMap).forEach((key) => {
            let o = {
                seller: util.array.findInArr(sellers, key),
                foods: sellerMap[key]
            };
            sells.push(o);
        });
        this.sells = sells;
    },
    methods: {
        computePrice (food) {
            let price;
            if (food.selectDiscountCount) {
                let disPrice = food.selectDiscountCount * food.price; // 优惠的价格
                let othPrice = (food.count - food.selectDiscountCount) * food.oldPrice; // 剩余的价格
                price = disPrice + othPrice;
            } else if (!food.oldPrice) {
                price = food.price * food.count;
            } else {
                price = food.oldPrice * food.count;
            }
            return price;
        },
        oldpriceShow (food) {
            if (!food.oldPrice) return false;
            let currentPrice = this.computePrice(food);
            if (currentPrice === food.oldPrice * food.count) {
                return false;
            }
            return true;
        },
        totalPrice (foods, deliver, desc) {
            let total = 0;
            let fullReduce = this.fullReduce(desc) || 0;
            foods.forEach((food) => {
                let currentPrice;
                if (food.selectDiscountCount > 0) {
                    currentPrice = food.selectDiscountCount * food.price + (food.count - food.selectDiscountCount) * food.oldPrice;
                } else if (food.selectDiscountCount === 0 && food.oldPrice) {
                    currentPrice = food.oldPrice * food.count;
                } else {
                    currentPrice = food.price * food.count;
                }
                total += currentPrice;
            });
            return total + deliver - fullReduce;
        },
        fullReduce (desc) {
            let arr = desc.split(',');
            if (arr.length <= 1) {
                return false;
            }
            let str = arr[1];
            let pattern = /(\d+)/g;
            let s = pattern.exec(str);
            return s[0];
        },
        discountDesc (desc) {
            let arr = desc.split(',');
            if (arr.length <= 1) {
                return ' ';
            }
            let str = arr[1];
            let pattern = /(\d+)/g;
            let s = pattern.exec(str);
            return `已享受满减, 优惠${s[0]}元`;
        },
        remove (sell) {
            let id = sell.seller.id;
            sell.foods.foods.forEach((food) => {
                food.count = 0;
                food.selectDiscountCount = 0;
            });
            this.$store.dispatch('emptyById', id);
            // console.log(sell);
            sell.foods.foods = [];
            // console.log(sell.foods);
            console.log(sell.seller);
            this.$store.dispatch('setLocalstore', {data: sell.foods.foods, seller: sell.seller});
        }
    },
    updated () {
            // this.$store.dispatch('setLocalstore', sell.foods.foods);
    }
};
</script>
<style lang="stylus">
.cart
  width: 100%
  .cart-header
    height: 50px
    width: 100%
    background: #3190e8
    color: #fff
    display: flex
    align-items: center
    box-sizing: border-box
    padding: 0 20px
    position: fixed
    top: 0
    left: 0
    .icon
      margin-right: 20px
      color: #fff
  .cart-main
    width: 100%
    display: flex
    flex-direction: column
    margin-top: 50px
    .item
      width: 100%
      display: flex
      flex-direction: column
      background: #fff
      .item-header
        width: 100%
        display: flex
        align-items: center
        border-bottom: 1px solid #f0f0f0
        box-sizing: border-box
        padding: 15px
        .name
          color: #000
          flex: 1
          font-size: 14px
      .item-food
        width: 100%
        display: flex
        align-items: center
        box-sizing: border-box
        border-bottom: 1px solid #f0f0f0
        padding: 15px
        .food-icon
          width: 40px
          height: 40px
          overflow: hidden
          margin-right: 15px
          img
            width: 100%
            height: 100% 
        .food-center
          flex: 1
          display: flex
          flex-direction: column
          .food-name
            font-size: 14px
            display: inline-block
            margin-bottom: 5px
          .count
            font-size: 12px
            color: #999
        .food-right
          color: #f01414
          .oldprice
            font-size: 14px
            font-weight: 100;
            color: #999;
            text-decoration: line-through;
      .deliver
        padding: 15px
        font-size: 14px
        display: flex
        border-bottom: 1px solid #f0f0f0
        .deliver-name
          flex: 1
        .deliver-price
          color: #f01414
          font-size: 16px  
      .item-footer
        padding: 15px     
        border-bottom: 1px solid #f0f0f0
        display: flex
        align-items: center
        justify-content: flex-end
        .pay
          display: inline-block
          padding: 10px 15px
          border-radius: 3px
          color: #fff
          background: #00b43c
          font-size: 12px
          margin-left: 10px
        .total-price
          color: #f01414
          display: inline-block
          margin-left: 5px
        .discoutDesc
          font-size: 12px
          flex: 1  
</style>