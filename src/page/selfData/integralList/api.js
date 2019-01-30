const file = '/integral';//当前模块api前缀
const api = {
    list: {//获取积分明细/历史记录
        path: file + '/historyRecord',
        method: 'get'
    },
    productList: {//商品列表
        path: '/product/list',
        method: 'get'
    }
}
export default api 
