<template>
  <div>
    <sellheader :seller="seller"></sellheader>
    <div class="tab border-1px">
      <div class="tab-item">
        <span>商品</span>
      </div>
      <div class="tab-item">
        <span>评论</span>
      </div>
    </div>
    <goods :seller="seller"></goods>
  </div>
</template>

<script>
import sellheader from '../header/sellheader';
import goods from '../goods/goods';

const ERR_OK = 0;

export default {
  data () {
    return {
      seller: {}
    };
  },
  created () {
    let id = this.$route.params.sellerid;
    this.$store.dispatch('setSellerId', id);
    // 获取伪数据
    this.$http.get(`/api/sellers/${id}`).then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
        this.$store.dispatch('getSeller', this.seller);
        // this.$store.dispatch('getLocalstore');
      }
    });
  },
  components: {
    sellheader,
    goods
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
