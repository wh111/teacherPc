const file = '/'//当前模块api前缀
const api = {
  correcting:{//批改作业
    path: '/historyWork/correcting',
    method: 'put'
  },
  // finished:{
  //   path: '/historyWork/correcting',
  //   method: 'put'
  // },
  finished:{//批改作业结束
    path: '/historyWork/finished',
    method: 'put'
  },
  finishedTest:{//批改测评结束
    path: '/evaluation/finished',
    method: 'put'
  },
  historyWorkList: {//
    path: '/historyWork/list',
    method: 'get'
  },
  queryHistoryList: {//查询历史测评
    path: '/evaluation/queryHistoryList',
    method: 'get'
  },
  getWorkInfo:{//批改作业（查看）
    path: '/historyWork/getWorkInfo',
    method: 'get'
  },
  list: {//作答分析列表
    path: '/evaluation/getAnswerAnalysisList',
    method: 'get'
  },
  get: {//作答成绩
    path: '/evaluation/answerMarkAnalysis',
    method: 'get'
  },
  getAnalysis: {//测评试卷分析
    path: '/evaluation/getAnalysis',
    method: 'get'
  },
  queryMarkList: {//查看已批改/未批改作业
    path: '/historyWork/queryMarkList',
    method: 'get'
  },
  accessTo:{//催交
    path: '/evaluation/urgeEvaluation',
    method: 'get'
  },
  queryNoSubmit: {//查询未提交作业人员
    path: '/historyWork/queryNoSubmit',
    method: 'get'
  },
  urgeWork: {//催交作业
    path: '/historyWork/urgeWork',
    method: 'get'
  },
  urgeAllWork: {//催交所有人作业
    path: '/historyWork/urgeAllWork',
    method: 'get'
  },
  getAnswerAnalysisInfo: {//作答分析详情
    path: '/evaluation/getAnswerAnalysisInfo',
    method: 'get'
  },
  getCorrect: {//作答分析详情
    path: '/evaluation/getCorrect',
    method: 'get'
  },
  //老师批改测评(主观题批改)
  correctEvaluation:{
    path: '/evaluation/correct',
    method: 'put'
  },//添加 添加 易错/难题库
  add:{
    path: '/questions/library/add',
    method: 'post'
  },
  outofQuestion:{//试题纠错(错题反馈)
    path: '/outofQuestion/add',
    method: 'post'
  },
}
export default api 
