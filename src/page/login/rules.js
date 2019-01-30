import baseRules from '../../formRules/base' // 公共规则
let createGroup = {
  title: [baseRules.inputLen(0, 20), baseRules.requiredNoEvent],
  remark: [baseRules.inputLen(0, 100)],
}
let identification = {
  idcard: [baseRules.idNumber, baseRules.requiredNoEvent],
  teachCertNo: [ baseRules.numbers,baseRules.inputLen(17, 17), baseRules.requiredNoEvent],
  name: [baseRules.inputLen(0, 20), baseRules.requiredNoEvent],
  types: [baseRules.requiredNoEvent],
  subject: [baseRules.requiredNoEvent],
  textbookVersionId: [baseRules.requiredNoEvent],
}

export {
    createGroup, identification
}