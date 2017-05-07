<template>
  <div>
    <div class="shopcart">
      <div class="content"
           @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo"
                 :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart"
                 :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num"
                 v-show="totalCount>0">{{totalCount}}</div>
<<<<<<< HEAD
          </div>
          <div class="price"
               :class="{'highlight':totalPrice>0}">
            <div class="pr">¥ {{totalPrice}}</div>
            <div class="desc">配送费¥{{deliveryPrice}}</div>
          </div>
=======
          </div>
          <div class="price"
               :class="{'highlight':totalPrice>0}">
            <div class="pr">¥ {{totalPrice}}</div>
            <div class="desc">配送费¥{{deliveryPrice}}</div>
          </div>
          <!--<div class="desc">配送费¥{{deliveryPrice}}</div>-->
>>>>>>> 4da85daa52ea1136d11e9a3d4d7d5f755bfd3176
        </div>
        <div class="content-right"
             @click.stop.prevent="pay">
          <div class="pay"
               :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <transition name="fold">
        <div class="shopcart-list"
             v-show="listShow">
          <div class="discount-list">
            {{this.discountDesc}}
          </div>   
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <p class="info">{{getInfo}}</p>
=======
      <div class="ball-container">
        <transition v-for="ball in balls"
                    name="drop"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter">
          <div v-show="ball.show"
               class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <transition name="discount">
        <div class="discount-list">
          {{this.discountDesc}}
        </div>
      </transition>
      <transition name="fold">
        <div class="shopcart-list"
             v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
>>>>>>> 4da85daa52ea1136d11e9a3d4d7d5f755bfd3176
            <span class="empty"
                  @click="empty">清空</span>
          </div>
          <div class="list-content"
               ref="listContent">
            <ul>
              <li class="food"
<<<<<<< HEAD
                  v-for="food in currentFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span class="oldprice" v-show="oldpriceShow(food)">¥{{food.count * food.oldPrice}}</span>
                  <span>¥{{computePrice(food)}}</span>
                  <!--<span>¥{{food.count > food.limit ? (food.limit * food.price + (food.count - food.limit) * food.oldPrice) : food.price * food.count}}</span>-->
=======
                  v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>¥{{food.count > food.limit ? (food.limit * food.price + (food.count - food.limit) * food.oldPrice) : food.price * food.count}}</span>
>>>>>>> 4da85daa52ea1136d11e9a3d4d7d5f755bfd3176
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask"
           @click="hideList"
           v-show="listShow"></div>
<<<<<<< HEAD
    </transition>
    <transition name="tool">
      <div v-if="toolShow" class="tooltip">
        {{toolInfo}}
      </div>
=======
>>>>>>> 4da85daa52ea1136d11e9a3d4d7d5f755bfd3176
    </transition>
  </div>
</template>

<script>
import Cartcontrol from '../cartcontrol/cartcontrol.vue';
import BScroll from 'better-scroll';

<<<<<<< HEAD
import eventHub from '../../eventhub';

=======
>>>>>>> 4da85daa52ea1136d11e9a3d4d7d5f755bfd3176
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [];
<<<<<<< HEAD
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      fold: true,
      currentFoods: [],
      toolShow: false,
      toolInfo: ''
    };
  },
  created () {
    eventHub.$on('set-toolinfo', this.showTooltip);
  },
  computed: {
    // 从state获取当前的购物车状态信息
    getInfo () {
      let info = this.$store.state.cartInfo;
      // let seller = this.$store.state.seller;
      if (info) {
        // eventHub.$emit('set-toolinfo', `每单限${seller.maxLimit}份优惠美食, 已为您选择最大优惠`);
        return info;
      } else {
        return '';
      }
    },
    // 计算总价
    totalPrice () {
      this.currentFoods = this.$store.state.foods;
      this.$store.dispatch('computeCart');
      let total = 0;
      this.currentFoods.forEach((food) => {
        let currentPrice = 0;
        if (food.count >= food.limit) {
          currentPrice += food.limit * food.price + (food.count - food.limit) * food.oldPrice;
        } else {
          currentPrice += food.price * food.count;
        }
        total += currentPrice;
      });
      return total;
    },
    totalCount () {
      let count = 0;
      this.currentFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `还差¥${this.minPrice - this.totalPrice}元起送`;
      } else {
        return '去结算';
=======
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    seller: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true,
      selectDiscount: 0
    };
  },
  computed: {
    totalPrice () {
      let total = 0;
      this.selectFoods.forEach((food) => {
        let currentPrice = 0;
        if (food.count > food.limit) {
          currentPrice += food.limit * food.price + (food.count - food.limit) * food.oldPrice;
        } else {
          currentPrice += food.price * food.count;
        }
        total += currentPrice;
      });
      return total;
    },
    totalCount () {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `还差¥${this.minPrice - this.totalPrice}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    },
    discountDesc () {
      let desc = '';
      let reducePrice = 0;
      let flag = false;
      let discount = this.seller.discount;
      // 判断是否含有折扣商品
      this.selectFoods.forEach((food) => {
        if (food.discount) {
          flag = true;
        } else {
          reducePrice += food.price * food.count;
        }
      });
      if (flag) {
        desc = '满减活动与折扣商品不能同享';
      } else {
        // 判断满减结果
        let idx; // 满足当前满减值的数组索引
        discount.forEach((dis, i) => {
          if (reducePrice > dis.full) {
            idx = i + 1;
          }
        });
        if (idx) {
          desc += `已满${reducePrice}, 结算减${discount[idx - 1].reduce}`;
        } else {
          discount.forEach((dis) => {
            desc += `满${dis.full}减${dis.reduce} `;
          });
        }
>>>>>>> 4da85daa52ea1136d11e9a3d4d7d5f755bfd3176
      }
      return desc;
    },
<<<<<<< HEAD
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
=======
    fullReduce () {
      let price = 0;
      let reducePrice = 0;
      let flag = false;
      let discount = this.seller.discount;
      // 判断是否含有折扣商品
      this.selectFoods.forEach((food) => {
        if (food.discount) {
          flag = true;
        } else {
          reducePrice += food.price * food.count;
        }
      });
      if (flag) {
        return 0;
      } else {
        // 判断满减结果
        let idx; // 满足当前满减值的数组索引
        discount.forEach((dis, i) => {
          if (reducePrice > dis.full) {
            idx = i + 1;
          }
        });

        if (idx) {
          price += discount[idx - 1].reduce;
        }
      }
      return price;
    }
  },
  methods: {
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    hideList () {
      this.fold = true;
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      let info = `支付 ¥ ${this.totalPrice + this.seller.deliveryPrice - this.fullReduce} \n其中: \n商品总价: ¥${this.totalPrice}\n运费:¥${this.seller.deliveryPrice}\n满减:¥${this.fullReduce}`;
      window.alert(info);
    },
    beforeEnter (el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
>>>>>>> 4da85daa52ea1136d11e9a3d4d7d5f755bfd3176
      }
      return show;
    },
    discountDesc () {
      this.$store.dispatch('getDiscountDesc');
      return this.$store.state.discountDesc;
    },
    // 获取满减的价格
    fullReduce () {
      this.$store.dispatch('computeFullReduce');
      return this.$store.state.fullReducePrice;
    }
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
    toggleList () {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty () {
      this.$store.dispatch('emptyCart');
      // console.log(this.currentFoods);
      this.selectFoods.forEach((food) => {
        food.count = 0;
        food.selectDiscountCount = 0;
      });
      // this.currentFoods = [];
    },
    hideList () {
      this.fold = true;
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      let total = this.totalPrice + this.$store.state.seller.deliveryPrice - this.fullReduce;
      let info = `支付 ¥ ${total} \n其中: \n商品总价: ¥${this.totalPrice}\n运费:¥${this.$store.state.seller.deliveryPrice}\n满减:¥${this.fullReduce}`;
      window.alert(info);
    },
<<<<<<< HEAD
    // 显示tooltip
    showTooltip (info) {
      this.toolInfo = info;
      this.toolShow = true;
      setTimeout(() => {
        this.toolShow = false;
      }, 2000);
=======
    enter (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      });
      done();
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
>>>>>>> 4da85daa52ea1136d11e9a3d4d7d5f755bfd3176
    }
  },
  components: {
    Cartcontrol
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .tooltip
    box-sizing: border-box
    position: fixed
    bottom: 70px
    left: 50%
    margin-left: -80px
    background: rgba(0, 0, 0, 0.8);
    width: 160px
    border-radius: 10px
    z-index: 1000 
    padding: 10px
    color: #fff
    text-align: center
    font-size: 12px
    line-height: 1.5
    font-weight: 100
  .tool-enter-active, .tool-leave-active
    transition: opacity .5s
  .tool-enter, .tool-leave-active
    opacity: 0  
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      z-index: 1000
      .content-left
        z-index: 1000
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            text-align: center
            border-radius: 50%
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 8px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          &.highlight
            color: #fff
          .desc
            display: inline-block
            vertical-align: top
            line-height: 24px
            color: rgba(255, 255, 255, 0.4)
            font-size: 11px
            font-weight: 100
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          color: rgba(255, 255, 255, 0.4)
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
<<<<<<< HEAD
=======
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-transition
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
>>>>>>> 4da85daa52ea1136d11e9a3d4d7d5f755bfd3176
    .discount-list
      height: 28px
      background: rgba(255, 252, 153, .8)
      width: 100%
<<<<<<< HEAD
=======
      position absolute
      left: 0
      bottom: 48px
>>>>>>> 4da85daa52ea1136d11e9a3d4d7d5f755bfd3176
      z-index: 999
      font-size: 12px
      line-height: 28px
      text-align: center      
    .shopcart-list
      position: absolute
      left: 0
      bottom: 48px
      z-index: -1
      width: 100%
      transition: all .5s
      &.fold-transition
        transform: translate3d(0, 0, 0)
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 100%, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        display: flex
        align-items: center
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .info
          font-size: 12px
          flex: 1
          text-align: center
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-weight: 700
            color: rgb(240, 20, 20)
          .oldprice
            font-weight: 100
            color: #999
            text-decoration: line-through  
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-active
    opacity: 0
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    background: rgba(7, 17, 27, 0.6)
</style>
