# sell

> 逻辑参考饿了么安卓版v7.7, 样式参考版本较早。

## 功能实现
- [x] 商家页购物车
- [x] 本地购物车
- [x] 本地存储

## 主要逻辑
### 关于商家页购物车逻辑
- 点击商品添加(减少)按钮，监听addCart事件，将选中商品信息添加到state中，并将选中优惠商品数量添加到state中。(减少同理)
- 购物车组件监听computeCart事件，用于商品优惠以及商品优惠信息的判定和筛选。
- 要注意事件触发的时机，优惠信息的提示需要考虑到组件的更新，如果不挂在到更新的数据上，那么数据动态更新后属性值不会做修改

### 关于本地购物车逻辑
- 商家购物车相当于一个孩子，而本地购物车相当与双亲，每一个孩子都是相互独立的，这里我的实现是将state中设置一个对象，将原来挂在vuex上的单个商家的数据信息作为该对象的键值，这样在访问每一个商家的时候只需要取到其对应的键的值即可。
- 考虑到我们不能在主页渲染的时候拿到所有的商家的id为其在state上添加键值，我们可以在用户访问某一商家的时候来动态监听事件为其设置键值。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
