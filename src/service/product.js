const http =  require('../http/index')

const baseUrl = 'https://www.easy-mock.com/mock/5ddf6ef05478351c23bee40b/mall'

module.exports = {
    /**
     * 获取优惠商品列表
     * @returns {*}
     */
    getOnSaleGoods() {
        return http.get(`${baseUrl}/getOnSaleGoods`);
    },
}
