import baseRules from '../../formRules/base.js'

let mixQuestionEdit = {
  basicType: [baseRules.selectText],
  score: [baseRules.requiredNoEvent, baseRules.numberSection(0.1, 100), /*baseRules.floats(2)*/],
  diffLevelCode: [baseRules.selectText],
  knowledgeList: [baseRules.requiredNoEvent]
}
export {
  mixQuestionEdit
}
