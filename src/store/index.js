import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
    discountFood: 0,
    discountType: 0,
    seller: {},
    foods: [],
    cartInfo: '',
    toolInfo: '',
    discountDesc: '',
    discountFoodArr: [],
    fullReducePrice: 0
};

export default new Vuex.Store({
    state,
    mutations,
    actions
});
