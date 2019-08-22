import {get,post} from './api.js'
export const server = {
	register:(data)=>{return post('/user/register.do',data)} ,//注册
  login:(data)=>{return post('/login.do',data)},//登陆
  logout:(data)=>{return post('/logout.do',data)},//退出登陆
  idAuth:(data)=>{return post('/user/idAuth.do',data)},//实名认证
  getBindcardList:(data)=>{return post('/bankcard/getBindcardList.do',data)},//查询银行卡列表
  getBindcardSm:(data)=>{return post('/bankcard/getBindcardSm.do',data)},//申请银行卡绑卡
  querySettleCard:(data)=>{return post('/insettle/querySettleCard.do',data)},//查询结算卡信息
  applyWithdraw:(data)=>{return post('/insettle/applyWithdraw.do',data)},//申请提现
  bindSettleCard:(data)=>{return post('/insettle/bindSettleCard.do',data)},//绑定结算卡
  queryBankcardInfo:(data)=>{return post('/bankcard/queryBankcardInfo.do',data)},//查询银行卡信息
  verifyBindcardSm:(data)=>{return post('/bankcard/verifyBindcardSm.do',data)},//验证银行卡绑卡
  repayChannels:(data)=>{return post('/repayChannels.do',data)},//查询代还通道列表
  queryProvinces:(data)=>{return post('/plan/queryProvinces.do',data)},//查询省列表
  queryCities:(data)=>{return post('/plan/queryCities.do',data)},//查询市列表
  preCreatePlan:(data)=>{return post('/plan/preCreatePlan.do',data)},//预览计划
  comfirmRepayPlan:(data)=>{return post('/plan/comfirmRepayPlan.do',data)},//确认计划
  queryPlanBillDetail:(data)=>{return post('/plan/queryPlanBillDetail.do',data)},//查询信用卡计划明细
  queryPlanBillList:(data)=>{return post('/plan/queryPlanBillList.do',data)},//查询信用卡计划明细
  vcodeMobile:(data)=>{return post('/vcodeMobile.do',data)},//获取短信验证码
  register:(data)=>{return post('/user/register.do',data)},//用户注册
  querySettleInfo:(data)=>{return post('/insettle/querySettleInfo.do',data)},//查询总收益信息
  queryIncomeDetail:(data)=>{return post('/insettle/queryIncomeDetail.do',data)},//查询收益明细列表
  queryWithdrawList:(data)=>{return post('/insettle/queryWithdrawList.do',data)},//查询提现记录列表
  stopRepayPlan:(data)=>{return post('/plan/stopRepayPlan.do',data)},//终止计划
}
