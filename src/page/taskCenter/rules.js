import baseRules from '../../formRules/base' // 公共规则
//
// let rules = {
//   nickname: [baseRules.requiredNoEvent, baseRules.inputLen(1, 15)],
// }

let questionsManageAdd = {
  subject: [baseRules.requiredNoEvent],
  term: [baseRules.requiredNoEvent],
  grade: [baseRules.requiredNoEvent],
  diffLevel: [baseRules.requiredNoEvent],
  diffLevelCode: [baseRules.requiredNoEvent],
  openType: [baseRules.requiredNoEvent],
  questionsTypeId: [baseRules.requiredNoEvent],
  // knowledgeList: [baseRules.required, baseRules.array],
  score: [baseRules.requiredNoEvent, baseRules.numberSection(0.1, 100)],
  title: [baseRules.requiredNoEvent, baseRules.inputLen(1, 500)],
  answerExplain: [baseRules.requiredNoEvent, baseRules.inputLen(1, 500)]
}

let CongregationAdd = {
  name: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],// 任务名称
  beginTime: [baseRules.requiredNoEvent],
  endTime: [baseRules.requiredNoEvent],
  remark: [baseRules.requiredNoEvent, baseRules.inputLen(1, 250)],
  textbookVersionId: [baseRules.requiredNoEvent],
  // grade: [baseRules.requiredNoEvent],
  // subject: [baseRules.requiredNoEvent],
  seasonId: [baseRules.requiredNoEvent],
  integral: [baseRules.requiredNoEvent, baseRules.float(2)],
  term: [baseRules.requiredNoEvent]
}

export {
  questionsManageAdd,
  CongregationAdd
}
