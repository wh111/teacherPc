import baseRules from '../../formRules/base' // 公共规则

let makeQuestion = {
  name: [baseRules.inputLen(1, 20)],
  sex: [baseRules.requiredNoEvent],
  studyType: [baseRules.selectText],
  school: [baseRules.inputLen(0, 30)],
  birth: [baseRules.requiredNoEvent],
  subject: [baseRules.requiredNoEvent],
  teachCertNo: [ baseRules.numbers,baseRules.inputLen(17, 17), baseRules.requiredNoEvent],
  types: [baseRules.requiredNoEvent],
  degree: [baseRules.requiredNoEvent],
}
export {
  makeQuestion,
}
// ruleForm: {
// 	Number: '1234567',
// 		name: '',
// 		sex: '',
// 		realName: '',
// 		year: '',
// 		month: '',
// 		day: '',
// 		grade: '',
// 		studyType: '',
// 		school: '',
// 		email: '',
//
// },
/**
 * 规则名称       规则描述[触发事件]{后面跟上+号的表示可选规则，使用时在原规则加后缀“Must”}
 * ---------------------- 普通规则 -----------------------------
 * required       非空验证[blur]
 * mustHasOne     至少选择一个[change]
 * idNumber       身份证[default]
 * selectId       下拉框选择[change]
 * selectText     下拉框选择文本[change]
 * array          数组非空验证
 * ---------------------- 可选规则 ------------------------------
 * mobile         手机号[default]+
 * email          邮箱[blur]+
 * number         数字[change]+
 * ---------------------- 规则函数 -----------------------------
 * asyncVal       异步服务器验证
 * isDate         date检测
 * illegalChar    特殊字符检测
 * serchPhone     搜索项手机号
 * sectionVal     字符串区间
 * inputLen       字符区间
 * numberSection  数字区间
 * numbers        必须为数字
 * ip             IP地址 0.0.0.0 - 255.255.255.255
 * postCode       邮编
 */