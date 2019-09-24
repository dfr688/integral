<template>
  <div class="detail">
      <Swiper ref="swiper">
        <div class="top">
            <div class="back" @click="goBack"></div>
            <div class="integral_tip">
                阅读+2，分享+5
            </div>
        </div>
        <div class="content">
            <p class="title">{{ articleDetail.title }}</p>
            <div class="text" v-html="articleDetail.content"></div>
        </div>
        <!-- 分享 -->
        <div class="share">
            <p class="title">分享这篇文章</p>
            <ul>
                <li @click="shareWeibo">
                    <span class="weibo"></span>
                    <p>新浪微博</p>
                </li>
                <li @click="shareQQ">
                    <span class="qq"></span>
                    <p>QQ</p>
                </li>
                <li @click="shareWechat">
                    <span class="wechat"></span>
                    <p>微信</p>
                </li>
            </ul>
        </div>
      </Swiper>
      <!-- 分享弹框 -->
      <mt-popup
        v-model="popupVisible"
        position="bottom">
        <div class="shareDetail">
            <p>分享以下链接</p>
            <div>http://192.168.90.12:8080/#/home</div>
            <ul>
                <li @click="goCancel">取消</li>
                <li @click="goSure">确定</li>
            </ul>
        </div>
      </mt-popup>
      <!-- 阅读积分弹框 -->
      <mt-popup
        v-model="popupVisibleDiff"
        popup-transition="popup-fade">
        <div class="signIn">
          <div class="signIn_detail">
              <p><span>+2</span>积分</p>
              <div class="success">恭喜完成阅读任务！</div>
              <div class="more" @click="goMore">更多积分任务</div>
              <span>当前积分{{ myIntegral }}</span>
          </div>
          <div class="delete" @click="goDelete"></div>
        </div>
      </mt-popup>
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import { Toast } from 'mint-ui';
export default {
 name: "",
  data () {
    return {
        articleId: "",
        articleDetail: "",
        popupVisible: false,
        popupVisibleDiff: false,
        myIntegral: ""
    }
  },
  components: {
      Swiper
  },
  computed: {},
  watch: {},
  methods: {
    //返回
    goBack() {
        this.$router.push("/home");
    },
    // 微博
    shareWeibo() {
        this.popupVisible = true;
    },
    // QQ
    shareQQ() {
        this.popupVisible = true;
    },
    // 微信
    shareWechat() {
        this.popupVisible = true;
    },
    // 取消
    goCancel() {
        this.popupVisible = false;
    },
    // 确定
    goSure() {
        let token = localStorage.getItem("token");
        if(token === null){
            Toast({
                message: "请先登录！",
                duration: 1000
            });
            this.$router.push("/login");
        }else{
            this.baseJs.ajaxReq("/integral/api/user/share",{},"put",token)
            .then(res => {
                // console.log(res);
                if(res.code === 200){
                    Toast({
                        message: res.data,
                        duration: 1000
                    });
                    this.popupVisible = false;
                }
            })
            .catch(err => {
                console.log(err);
            })
        }   
    },
    // 更多任务
    goMore() {
        this.$router.push("/home");
    },
    // 关闭
    goDelete() {
        this.popupVisibleDiff = false;
    }
  },
  created () {
     this.articleId = this.$route.params.id;
     let token = localStorage.getItem("token");
     this.baseJs.httpReq("/integral/api/article",this.articleId,{},"get",token)
     .then(res => {
        // console.log(res);
        if(res.sms === "今天已经阅读过这篇文章，明天再来吧～"){
            Toast({
                message: res.sms,
                duration: 2000
            });
        }else if(res.sms === "登录后才可以获取积分呦～"){
            Toast({
                message: res.sms,
                duration: 2000
            });
        }else{
            this.popupVisibleDiff = true;
        }
         this.articleDetail = res.data;
         setTimeout(() => {
				this.$refs.swiper.update();
			},500)
     })
     .catch(err => {
         console.log(err);
     });
     this.baseJs.ajaxReq("/integral/api/user",{},"get",token)
    .then(res => {
      // console.log(res);
      this.myIntegral = res.data.integral + 2;
    })
    .catch(err => {
      console.log(err);
    })
  },
  mounted () {},
}
</script>
<style scoped>
    @import '../../assets/css/detail.css';
</style>