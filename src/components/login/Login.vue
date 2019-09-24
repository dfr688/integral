<template>
  <div class="login">
    <Swiper>
    <Com title="登录" english="Login"/>
    <div class="login_info">
      <ul>
        <li>
          <p><i class="phone_icon"></i>手机号码</p>
          <input type="text" placeholder="请输入您的手机号" v-model="phone"/>
        </li>
        <li>
          <p><i class="psw_icon"></i>密码</p>
          <input type="password" placeholder="请输入登录密码" v-model="psw"/>
        </li>
      </ul>
      <div class="btn">
        <mt-button type="primary" size="large" @click.native="handleClick">登录</mt-button>
      </div>
      <div class="tip">
        <span @click="goRegister">还没有账号？立即注册</span>
      </div>
    </div>
    </Swiper>
  </div>
</template>

<script>
  import Com from './Com'
  import Swiper from '../public/Swiper'
  import { Toast } from 'mint-ui';
export default {
 name: "",
  data () {
    return {
      phone: "",
      psw: ""
    }
  },
  components: {
    Com,
    Swiper
  },
  computed: {},
  watch: {},
  methods: {
    // 注册
    goRegister() {
      this.$router.push("/register");
    },
    // 登录按钮
    handleClick() {
      if(this.phone == ""){
        Toast({
          message: '手机号不能为空',
          duration: 1000
        });
      }else if(this.psw == ""){
        Toast({
          message: '密码不能为空',
          duration: 1000
        });
      }else{
        this.baseJs.ajaxReq("/integral/api/signIn",{phone:this.phone,password:this.psw},'post',"")
        .then(res => {
          // console.log(res);
          if(res.code != 200){
          Toast({
            message: res.sms,
            duration: 1000
          });
          }else{
          // 缓存token
          localStorage.setItem("token",res.data);
          // 缓存手机号
          localStorage.setItem("phone",this.phone);
          Toast({
            message: res.sms,
            duration: 1000
          });
            let fromRoute = localStorage.getItem("fromRoute");
            if(fromRoute === "detail"){
              let id = localStorage.getItem("detailId");
              this.$router.push({name:fromRoute,params:{id:id}});
            }else{
              this.$router.push({name:fromRoute});
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  },
  created () {},
  mounted () {},
  beforeRouteEnter(to, from, next) {
    localStorage.setItem("fromRoute",from.name);
    if(from.name === "detail"){
      localStorage.setItem("detailId",from.params.id)
    }
    next();
  }
}
</script>
<style scoped>
  .login{
    height: 100%;
  }
  .login .login_info ul{
    margin: 0 .4rem;
    margin-top: 1.2rem;
  }
  .login .login_info ul li{
    font-size: .36rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: .6rem;
  }
  .login .login_info ul li p i{
    display: inline-block;
    margin-right: .16rem;
    margin-bottom: -.04rem;
  }
  .login .login_info ul li p .phone_icon{
    width: .28rem;
    height: .46rem;
    background: url(../../assets/images/login/phone.png) no-repeat left top;
    background-size: 100%;
  }
  .login .login_info ul li p .psw_icon{
    width: .33rem;
    height: .41rem;
    background: url(../../assets/images/login/psw.png) no-repeat left top;
    background-size: 100%;
  }
  .login .login_info ul li input{
    font-size: .28rem;
    margin-top: .3rem;
  }
  .login .login_info .btn{
    width: 6.7rem;
    height: .8rem;
    margin: 0 auto;
    margin-top: .8rem;
  }
  .login .login_info .tip{
    font-size: .28rem;
    color: #999;
    text-align: center;
    margin-top: 1.2rem;
  }
</style>