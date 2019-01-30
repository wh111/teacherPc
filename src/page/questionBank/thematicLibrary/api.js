const file = 'special/library'
const api = {
  list: {// 列表
    path: file + '/list',
    method: 'get'
  },
  get: {// 根据ID获取详情
    path: file + '/get',
    method: 'get'
  },
  edit: {// 修改
    path: file + '/modify',
    method: 'put'
  },
  add: {// 添加
    path: file + '/add',
    method: 'post'
  },
  publish: {// 专题发布
    path: file + '/publish',
    method: 'put'
  },
  remove: {// 删除
    path: file + '/remove',
    method: 'delete'
  },

  // 根据教材信息查询知识点
  queryKnowledgeList: {
    path: '/textbookContent/queryKnowledgeList',
    method: 'get'
  },
  // 根据教材信息查询知识点
  queryChapterList: {
    path: '/textbookContent/queryChapterList',
    method: 'get'
  },
  // 所有题型
  questionsType: {
    path: '/questionsType/query-all',
    method: 'get'
  },
  // 所有试题
  questionsList: {
    path: 'papers/questions/query',
    method: 'get'
  },
  queryGroups: { // 查询全部班组
    path: 'groups/query',
    method: 'get'
  }
}
export default api
