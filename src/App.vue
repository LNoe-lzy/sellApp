<template>
  <div>
    <div v-if="$route.path === '/'">
      <div class="search">
        <input type="text"
               placeholder="搜索商家、商店名称" />
      </div>
      <div class="main">
        <router-link :to="{name: 'seller', params: {sellerid: seller.id}}"
                     class="seller-item"
                     v-for="seller in sellers">
          <div class="seller-avater">
            <img :src="seller.avatar" />
          </div>
          <div class="seller-name">
            <span>{{seller.name}}</span>
          </div>
        </router-link>
        <router-link to="/cart" class="localcart">本地购物车</router-link>
      </div>
    </div>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import sellerPage from './components/seller/seller';

const ERR_OK = 0;

export default {
  data () {
    return {
      sellers: []
    };
  },
  created () {
    // 获取伪数据
    this.$http.get('/api/sellers').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.sellers = response.data;
        // this.$store.dispatch('getSeller', response.data);
        this.$store.dispatch('getLocalstore');
        // this.$store.dispatch('setSellers', this.sellers);
      }
    });
  },
  methods: {
  },
  components: {
    sellerPage
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.search
  background: #3190e8
  width: 100%
  height: 50px;
  box-sizing: border-box
  padding: 10px 15px
  display: flex
  justify-content: center
  align-items: center
  input
    height: 30px
    width: 100%
    border-radius: 50px
    overflow: hidden
    font-size: 14px
    text-align: center
    outline: none
.main
  width: 100%
  display: flex
  flex-direction: column
  .seller-item
    width: 100%
    display: flex
    align-items: center
    padding: 10px 20px
    box-sizing: border-box
    border-bottom: solid 1px #f0f0f0
    .seller-avater
      height: 60px
      width: 60px
      box-sizing: border-box
      margin-right: 20px
      border: solid 1px #d3d3d3
      img 
        width: 100%
        height: 100%
  .localcart
    position: fixed
    bottom: 10px
    left: 50%
    margin-left: -50px
    width: 100px 
    height: 30px
    line-height: 30px
    text-align: center
    color: #fff
    background: #00b43c  
    font-size: 14px
    border-radius: 5px
</style>
