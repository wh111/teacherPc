import baseRules from '../../formRules/base' // 公共规则

let groupMessage = {
  title: [baseRules.requiredNoEvent, baseRules.inputLen(1, 20)],
  remark: [baseRules.requiredNoEvent, baseRules.inputLen(1, 100)]
    // nickname: [baseRules.requiredNoEvent, baseRules.inputLen(1, 15)],
    // name: [baseRules.inputLen(1, 20)],
    // sex: [baseRules.requiredNoEvent],
    // studyType: [baseRules.selectText],
    // textbookVersionNewList: [baseRules.mustHasOne],
    // length: [baseRules.mustHasOne],
    // school: [baseRules.inputLen(0, 30)]
}
let makeWork = {
  title: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)]
}
export {
    groupMessage,
}