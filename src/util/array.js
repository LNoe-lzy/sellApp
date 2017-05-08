// 数组的工具函数
export default {
    isInArr (arr, target) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === target.name) {
                return true;
            }
        }
        return false;
    },
    compare (property) {
      return function (a, b) {
        let v1 = a[property];
        let v2 = b[property];
        return v2 - v1;
      };
    },
    findInArr (arr, id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === parseInt(id)) {
                return arr[i];
            }
        }
        return false;
    }
};
