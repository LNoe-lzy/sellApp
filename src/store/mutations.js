import * as type from './type';

import util from '../util';

export default {
  [type.GET_SELLER] (state, seller) {
    state.seller = seller;
  },
  [type.ADD_CART] (state, food) {
    let foods = state.foods;
    let flag = false;
    // 是否优惠
    if (food.oldPrice) {
      state.discountFood ++;
      // 为food添加decrease属性
      Object.assign(food, {decrease: food.oldPrice - food.price});
    } else {
      Object.assign(food, {decrease: -1});
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
      state.foods.push(food);
      // 如果是折扣商品且新加入的discountType +1
      if (food.oldPrice) {
        state.discountType ++;
      }
    }
  },
  [type.DECREASE_CART] (state, food) {
    let foods = state.foods;
    // 替换或者删除
    if (food.count === 0) {
      for (let i = 0; i < foods.length; i++) {
        if (foods[i].name === food.name) {
          if (foods[i].oldPrice) {
            state.discountType--;
          }
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
      state.discountFood --;
    }
  },
  [type.COMPUTE_CART] (state) {
    let seller = state.seller;
    let foods = state.foods;
    if (state.discountFood > seller.maxLimit) {
      state.cartInfo = `每单限${seller.maxLimit}份优惠美食, 已为您选择最大优惠`;
      state.toolInfo = `每单限${seller.maxLimit}份优惠美食, 已为您选择最大优惠`;
    } else {
      state.cartInfo = '';
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
      if (food.selectDiscountCount > 0 && !util.array.isInArr(state.discountFoodArr, food)) {
        state.discountFoodArr.push(food);
      }
      curMax -= count;
    }
    // console.log(foods);
  },
  // 清除选中缓存
  [type.EMPTY_CART] (state) {
    state.discountFood = 0;
    state.foods = [];
    state.discountType = 0;
    state.cartInfo = '';
    state.toolInfo = '';
    state.discountDesc = '';
    state.discountFoodArr = [];
    state.fullReducePrice = 0;
  },
  [type.SET_TOOLINFO] (state, info) {
    state.toolInfo = info;
  },
  [type.EMPTY_TOOLINFO] (state) {
    state.toolInfo = '';
  },
  [type.GET_DISCOUNTDESC] (state) {
    let reducePrice = 0;
    let discount = state.seller.discount;
    if (!discount) {
      return;
    }
    // 计算选中的非折扣商品的总价
    state.foods.forEach((food) => {
        if (!food.discount) {
          reducePrice += food.price * food.count;
        }
    });
    state.discountDesc = '';
    // 判断是否含有折扣商品
    if (state.discountFood > 0) {
      state.discountDesc = '满减活动与折扣商品不能同享';
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
        state.discountDesc += `已满${reducePrice}, 结算减${discount[idx - 1].reduce}`;
      } else {
        for (let i = 0; i < discount.length; i++) {
          let dis = discount[i];
          state.discountDesc += `满${dis.full}减${dis.reduce} `;
        }
      }
    }
  },
  // 计算满减
  [type.COMPUTE_FULLREDUCE] (state) {
    let reducePrice = 0;
    let discount = state.seller.discount;
    // 判断是否含有折扣商品
    state.foods.forEach((food) => {
      reducePrice += food.price * food.count;
    });
    if (state.discountFood > 0) {
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
        state.fullReducePrice += discount[idx - 1].reduce;
      }
    }
  }
};
