import baseRules from '../../formRules/base.js'

let testPaperManagementZn0 = {
  questionType: [baseRules.requiredNoEvent, baseRules.mustHasOne],
  title: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
  startTime: [baseRules.requiredNoEvent, baseRules.isDate],
  submitTime: [baseRules.requiredNoEvent, baseRules.isDate],
  publishAnswerTime: [baseRules.requiredNoEvent, baseRules.isDate],
  times: [baseRules.requiredNoEvent, baseRules.numbers, baseRules.inputLen(1, 3)]
  // remark: [baseRules.inputLen(0, 250)]
}

let testPaperManagementZn1 = {
  // grade: [baseRules.requiredNoEvent, baseRules.selectId],
  // term: [baseRules.requiredNoEvent, baseRules.selectId],
  // diffLevel: [baseRules.requiredNoEvent, baseRules.selectId],
  selectChapter: [baseRules.requiredNoEvent, baseRules.mustHasOne],
  selectknowledge: [baseRules.requiredNoEvent, baseRules.mustHasOne]
}

let testPaperManagementZn2 = {
  times: [baseRules.requiredNoEvent, baseRules.numbers, baseRules.inputLen(1, 3)]
}

let testPaperManagementRg0 = {
  name: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
  remark: [baseRules.inputLen(0, 250)]
}

let testPaperManagementEdit = {
  name: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
  startTime: [baseRules.requiredNoEvent, baseRules.isDate],
  submitTime: [baseRules.requiredNoEvent, baseRules.isDate],
  publishAnswerTime: [baseRules.requiredNoEvent, baseRules.isDate],
  times: [baseRules.requiredNoEvent, baseRules.numbers, baseRules.inputLen(1, 3)]
}

export {
  testPaperManagementZn0,
  testPaperManagementZn1,
  testPaperManagementZn2,
  testPaperManagementRg0,
  testPaperManagementEdit
}
