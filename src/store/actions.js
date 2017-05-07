import * as type from './type';

export default {
    getSeller ({commit}, seller) {
        commit(type.GET_SELLER, seller);
    },
    addCart ({commit}, food) {
        commit(type.ADD_CART, food);
    },
    decreaseCart ({commit}, food) {
        commit(type.DECREASE_CART, food);
    },
    computeCart ({commit}) {
        commit(type.COMPUTE_CART);
    },
    emptyCart ({commit}) {
        commit(type.EMPTY_CART);
    },
    setToolinfo ({commit}, info) {
        commit(type.SET_CARTINFO, info);
    },
    emptyToolinfo ({commit}) {
        commit(type.EMPTY_TOOLINFO);
    },
    getDiscountDesc ({commit}) {
        commit(type.GET_DISCOUNTDESC);
    },
    computeFullReduce ({commit}) {
        commit(type.COMPUTE_FULLREDUCE);
    },
    setLocalstore ({commit}, data) {
        commit(type.SET_LOCALSTORE, data);
    },
    getLocalstore ({commit}) {
        commit(type.GET_LOCALSTORE);
    }
};
