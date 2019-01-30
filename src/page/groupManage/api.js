const api = {
  getGroups: {// 查询全部班组
    path: '/groups/query',
    method: 'get'
  },
  changeGroups: {// 调整班组
    path: '/groups/studentModifyGroups',
    method: 'post'
  },
  request: {// 获取班组成员列表
    path: '/groups/queryStudentList',
    method: 'get'
  },
  createGroups: {// 创建班组
    path: '/groups/add',
    method: 'post'
  },
  requestDetail: {//
    path: '/groups/queryStudentInfo',
    method: 'get'
  },
  studentEditRemark: {// 编辑备注（给学生编辑备注）
    path: '/groups/studentEditRemark',
    method: 'post'
  },
  getDetail: {// 班组详情
    path: '/groups/get',
    method: 'get'
  }, // 班组通知
  message: {
    path: '/groupsNotice/query',
    method: 'get'
  }, // 解散群
  disbanded: {
    path: '/groups/disbanded',
    method: 'delete'
  }, // 新建小组群通知
  groupsNotice: {
    path: '/groupsNotice/add',
    method: 'post'
  }, // 添加群通知
  groupsClassNotice: {
    path: '/groupsNews/add',
    method: 'post'
  },
  addStudent: {
    path: '/groups/addStudent',
    method: 'post'
  },
  addStudents: {
    path: '/groups/addStudents',
    method: 'post'
  },
  getGradeStudent:{
    path: '/groups/students',
    method: 'get'
  },
  removeStudent: {
    path: '/groups/removeStudent',
    method: 'delete'
  },
  modifyGroup: {
    path: '/groups/modify',
    method: 'put'
  },
  trueName:{//实名
    path:'/groups/trueName',
    method:'post'
  },
  papersTemplateList: { // 查询组卷模板
    path: '/papersTemplate/list',
    method: 'get'
  },
  likeList:{//模糊搜索成员
    path: '/groups/studentsLike',
    method: 'get'
  },
}
export default api
