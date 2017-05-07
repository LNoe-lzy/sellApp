<template>
  <div>
    <sellheader :seller="seller"></sellheader>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import sellheader from './components/header/sellheader';

  const ERR_OK = 0;

  export default {
    data () {
      return {
        seller: {}
      };
    },
    created () {
        // 获取伪数据
        this.$http.get('/api/seller').then((response) => {
            response = response.body;
            if (response.errno === ERR_OK) {
                this.seller = response.data;
                this.$store.dispatch('getSeller', response.data);
                this.$store.dispatch('getLocalstore');
            }
        });
    },
    components: {
      sellheader
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    heigth: 40px
    line-height: 40px
  // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.router-link-active
          color: #3190e8
</style>
