<template>
  <div>
    <!-- 顶部标题栏 -->
    <div class="title-bar">
      <top-title :titleName="titleName" :pageType='pageType'></top-title>
    </div>
    <div class="message-list flx-cas medium">
      <div class="message-li flx-cas" v-for="(item,index) in messageList" :key='index' @click="viewDetails">
        <div class="message-title">可以制定还款计划了</div>
        <div class="message-content">尊敬的用户，您尾号为****的**银行信用卡账单日已到，可以制定新的还款计划了</div>
        <div class="message-time">2019-04-18 10:28:51</div>
      </div>
    </div>
  </div>
</template>
<script>
  import topTitle from '@/components/common/topTitle.vue';
  import { Dialog } from 'vant';
  export default {
    components: {
      topTitle
    },
    data() {
      return {
        titleName: '我的消息',
		pageType:'app',
        messageList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19],
        detailMessage: false,
      };
    },
	created() {
		let me = this;
		window['getAppData'] = (url) => {
			me.getAppData(url)
		}
		// let b = this.$store.state;
		// console.log(b)
	},
    methods: {
		getAppData(e){
			this.$toast({
				message:e,
				duration:0
			})
		},
      // 查看信息详情
      viewDetails() {
        Dialog.alert({
          title: '可以制定还款计划了',
          message: '尊敬的用户，您尾号为****的**银行信用卡账单日已到，可以制定新的还款计划了尊敬的用户，您尾号为****的**银行信用卡账单日已到，可以制定新的还款计划了'
        }).then(() => {
          // on close
        });
      }
    },
  };
</script>
<style scoped="scoped" lang="less">
  .message-list {
    margin-top: 88px;
    box-sizing: border-box;
    width: 100%;
    padding: 0px 30px 30px;

    .message-li {
      margin-top: 20px;
      width: 690px;
      height: 240px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 12px 0px rgba(212, 212, 212, 0.5);
      border-radius: 10px;
      padding: 30px;
      box-sizing: border-box;
      align-items: flex-start;

      .message-title {
        font-size: 30px;
        color: #212121;
      }

      .message-content {
        margin-top: 20px;
        line-height: 38px;
        height: 76px;
        text-align: left;
        font-size: 24px;
        color: #888888;
      }

      .message-time {
        width: 100%;
        font-size: 22px;
        text-align: right;
        color: #ADADAD;
      }
    }
  }
  .van-dialog{
    border-radius: 50px;
  }
</style>
