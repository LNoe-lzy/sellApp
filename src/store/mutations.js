import * as type from './type';

import util from '../util';

export default {
  [type.SET_SELLERID] (state, id) {
    state.sellerId = id;
    if (state.sellerMap[id]) {
      return;
    } else {
      state.sellerMap[id] = {
        discountFood: 0,
        foods: [],
        cartInfo: '',
        toolInfo: '',
        discountDesc: '',
        discountFoodArr: [],
        fullReducePrice: 0
      };
    }
  },
  [type.GET_SELLER] (state, seller) {
    state.seller = seller;
  },
  [type.SET_SELLERS] (state, sellers) {
    state.sellers = sellers;
  },
  [type.ADD_CART] (state, food) {
    let currentSellerId = state.sellerId;
    let currentState = state.sellerMap[currentSellerId];
    let foods = currentState.foods;
    let flag = false;
    // 是否优惠
    if (food.oldPrice) {
      currentState.discountFood++;
      // 为food添加decrease属性
      Object.assign(food, {
        decrease: food.oldPrice - food.price
      });
    } else {
      Object.assign(food, {
        decrease: -1
      });
    }
    // 替换已存在的项
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].name === food.name) {
        flag = true;
        foods.splice(i, 1, food);
        break;
      }
    }
    // 不存在则直接加入数组
    if (!flag) {
      currentState.foods.push(food);
    }
  },
  [type.DECREASE_CART] (state, food) {
    let currentSellerId = state.sellerId;
    let currentState = state.sellerMap[currentSellerId];
    let foods = currentState.foods;
    // 替换或者删除
    if (food.count === 0) {
      for (let i = 0; i < foods.length; i++) {
        if (foods[i].name === food.name) {
          foods.splice(i, 1);
          break;
        }
      }
    } else {
      for (let i = 0; i < foods.length; i++) {
        if (foods[i].name === food.name) {
          foods.splice(i, 1, food);
          break;
        }
      }
    }
    // 是否优惠
    if (food.oldPrice) {
      currentState.discountFood--;
    }
  },
  [type.COMPUTE_CART] (state) {
    let currentSellerId = state.sellerId;
    let currentState = state.sellerMap[currentSellerId];
    let seller = state.seller;
    let foods = currentState.foods;
    if (currentState.discountFood > seller.maxLimit) {
      currentState.cartInfo = `每单限${seller.maxLimit}份优惠美食, 已为您选择最大优惠`;
      currentState.toolInfo = `每单限${seller.maxLimit}份优惠美食, 已为您选择最大优惠`;
    } else {
      currentState.cartInfo = '';
    }

    let curMax = seller.maxLimit;

    // 根据decrease对state中的对象进行排序
    foods.sort(util.array.compare('decrease'));
    for (let i = 0; i < foods.length; i++) {
      if (curMax < 0) {
        break;
      }
      let food = foods[i];
      // 跳过非打折商品
      if (!food.oldPrice) {
        continue;
      }
      let count;
      if ((food.count >= curMax && food.count <= food.limit) || !food.limit || (food.count > food.limit && food.limit > curMax)) {
        count = curMax;
      } else {
        count = food.count > food.limit ? food.limit : food.count;
      }
      food.selectDiscountCount = count;
      // 将折扣现实的food push 到数组
      //  console.log(currentState.discountFoodArr);
      if (food.selectDiscountCount > 0 && !util.array.isInArr(currentState.discountFoodArr, food)) {
        currentState.discountFoodArr.push(food);
      }
      curMax -= count;
    }
    // console.log(state.sellerMap[sellerId].cartInfo);
  },
  // 清除选中缓存
  [type.EMPTY_CART] (state) {
    let currentSellerId = state.sellerId;
    let currentState = state.sellerMap[currentSellerId];
    currentState.discountFood = 0;
    currentState.foods = [];
    currentState.cartInfo = '';
    currentState.toolInfo = '';
    currentState.discountDesc = '';
    currentState.discountFoodArr = [];
    currentState.fullReducePrice = 0;
  },
  [type.EMPTY_BYID] (state, id) {
    let currentSellerId = id;
    let currentState = state.sellerMap[currentSellerId];
    currentState.discountFood = 0;
    currentState.foods = [];
    currentState.cartInfo = '';
    currentState.toolInfo = '';
    currentState.discountDesc = '';
    currentState.discountFoodArr = [];
    currentState.fullReducePrice = 0;
    console.log(currentState);
  },
  [type.SET_TOOLINFO] (state, info) {
    let currentSellerId = state.sellerId;
    let currentState = state.sellerMap[currentSellerId];
    currentState.toolInfo = info;
  },
  [type.EMPTY_TOOLINFO] (state) {
    let currentSellerId = state.sellerId;
    let currentState = state.sellerMap[currentSellerId];
    currentState.toolInfo = '';
  },
  [type.GET_DISCOUNTDESC] (state) {
    let currentSellerId = state.sellerId;
    let currentState = state.sellerMap[currentSellerId];
    let reducePrice = 0;
    let discount = state.seller.discount;
    if (!discount) {
      return;
    }
    // 计算选中的非折扣商品的总价
    currentState.foods.forEach((food) => {
      if (!food.discount) {
        reducePrice += food.price * food.count;
      }
    });
    currentState.discountDesc = '';
    // 判断是否含有折扣商品
    if (currentState.discountFood > 0) {
      currentState.discountDesc = '满减活动与折扣商品不能同享';
    } else {
      // 判断满减结果
      let idx; // 满足当前满减值的数组索引
      for (let i = 0; i < discount.length; i++) {
        let dis = discount[i];
        if (reducePrice > dis.full) {
          idx = i + 1;
        }
      }
      if (idx) {
        currentState.discountDesc += `已满${reducePrice}, 结算减${discount[idx - 1].reduce}`;
      } else {
        for (let i = 0; i < discount.length; i++) {
          let dis = discount[i];
          currentState.discountDesc += `满${dis.full}减${dis.reduce} `;
        }
      }
    }
  },
  // 计算满减
  [type.COMPUTE_FULLREDUCE] (state) {
    let currentSellerId = state.sellerId;
    let currentState = state.sellerMap[currentSellerId];
    let reducePrice = 0;
    let discount = state.seller.discount;
    // 判断是否含有折扣商品
    currentState.foods.forEach((food) => {
      reducePrice += food.price * food.count;
    });
    if (currentState.discountFood > 0) {
      return;
    } else {
      // 判断满减结果
      let idx; // 满足当前满减值的数组索引
      discount.forEach((dis, i) => {
        if (reducePrice > dis.full) {
          idx = i + 1;
        }
      });
      if (idx) {
        currentState.fullReducePrice += discount[idx - 1].reduce;
      }
    }
  },
  // 本地存储
  [type.SET_LOCALSTORE] (state, data) {
    let sellerId = state.sellerId;
    // if (!sellerId) return;
    let seller = state.seller;
    let sellerData = state.sellerMap[sellerId];
    sellerData.foods = data;
    let store = window.localStorage;
    let sellData = store.getItem('sellData');
    if (!sellData) {
      let obj = {};
      obj[sellerId] = {
        sellerData,
        seller
      };
      store.setItem('sellData', JSON.stringify(obj));
    } else {
      sellData = JSON.parse(sellData);
      if (!sellData[sellerId]) {
        sellData[sellerId] = {};
      }
      sellData[sellerId] = {
        sellerData,
        seller
      };
      store.setItem('sellData', JSON.stringify(sellData));
    }
  },
  // 本地存储
  [type.SET_LOCALSTOREBYID] (state, {data, seller}) {
    let sellerId = seller.id;
    // if (!sellerId) return;
    let sellerData = state.sellerMap[sellerId];
    sellerData.foods = data;
    let store = window.localStorage;
    let sellData = store.getItem('sellData');
    if (!sellData) {
      let obj = {};
      obj[sellerId] = {
        sellerData,
        seller
      };
      store.setItem('sellData', JSON.stringify(obj));
    } else {
      sellData = JSON.parse(sellData);
      if (!sellData[sellerId]) {
        sellData[sellerId] = {};
      }
      sellData[sellerId] = {
        sellerData,
        seller
      };
      console.log(sellData);
      console.log(data);
      store.setItem('sellData', JSON.stringify(sellData));
    }
  },
  [type.GET_LOCALSTORE] (state) {
    // let sellerId = state.sellerId;
    let store = window.localStorage;
    let sellData = store.getItem('sellData');
    if (!sellData) {
      console.log('没有本地存储');
      return;
    } else {
      sellData = JSON.parse(sellData);
      // 刚访问页面的时候是没有sellerMap的，需要创建它
      Object.keys(sellData).forEach((key) => {
        state.sellerMap[key] = sellData[key].sellerData;
        if (!util.array.isInArr(state.sellers, sellData[key].seller)) {
          state.sellers.push(sellData[key].seller);
        }
      });
    }
  }
};
