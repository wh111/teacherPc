const api = {
  workAdd: {// 布置作业
    path: 'work/add',
    method: 'post'
  },
  calculationScore: { // 人工组卷计算分数
    path: 'papers/calculationScore',
    method: 'post'
  },
  releaseAdd: {// 发布测评
    path: 'papers/release',
    method: 'post'
  },
  papersTemplateAdd: {// 添加组卷模板
    path: 'papersTemplate/add',
    method: 'post'
  },
  preview: {// 试卷预览(智能组卷)
    path: 'papers/preview',
    method: 'post'
  },
  // 所有试题
  questionsList: {
    path: 'papers/questions/query',
    method: 'get'
  },
  // 获取组卷模板
  getPapersTemplate: {
    path: 'papersTemplate/get',
    method: 'get'
  },
  // 查看试卷名称是否存在
  findPaperByName: {
    path: 'papers/findPaperByName',
    method: 'post'
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
  questionsType: '/questionsType/query-all',
  chapter: 'textbookContent/queryChapterList',
  knowledge: 'textbookContent/queryKnowledgeListByChapter',
  questions: 'papers/questions/group' // 查询试题数量（智能组卷）
}
export default api
