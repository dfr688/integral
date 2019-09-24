<template>
  <div class="register">
      <Swiper>
        <Com title="注册" english="Register"/>
        <div class="register_info">
            <ul>
                <li>
                    <p><i class="phone_icon"></i>手机号码</p>
                    <input type="text" placeholder="请输入您的手机号" v-model="phone"/>
                </li>
                <li>
                    <p><i class="psw_icon"></i>密码</p>
                    <input type="password" placeholder="请输入登录密码" v-model="psw"/>
                </li>
                <li>
                    <p><i class="code_icon"></i>验证码</p>
                    <div class="code_item">
                        <input type="text" placeholder="请输入短信验证码" v-model="code"/>
                        <div>
                            <Vcode :phone="phone"/>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="btn">
                <mt-button type="primary" size="large" @click.native="handleClick">注册</mt-button>
            </div>
            <div class="register_tip">注册即表示同意<span @click="goPrivacy">《隐私政策》</span></div>
        </div>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import Com from './Com'
import Vcode from './Vcode'
import { Toast } from 'mint-ui';
export default {
 name: "",
  data () {
    return {
        phone: "",
        psw: "",
        code: ""
    }
  },
  components: {
      Swiper,
      Com,
      Vcode
  },
  computed: {},
  watch: {},
  methods: {
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
			}else if(!/^[0-9]{6,18}$/.test(this.psw)){
				Toast({
					message: '请输入6到18位数字！',
					duration: 1000
				});
			}else if(this.code == ""){
				Toast({
					message: '验证码不能为空',
					duration: 1000
				});
			}else{
				this.baseJs.ajaxReq("/integral/api/signUp",{phone:this.phone,smsCode:this.code,password:this.psw},'post',"")
				.then(res => {
					// console.log(res);
					if(res.code != 200){
						Toast({
							message: res.sms,
							duration: 1000
						});
					}else{
						Toast({
							message: res.sms,
							duration: 1000
						});
						this.$router.push("/login");
					}
				})
				.catch(err => {
					console.log(err);
				})
			}
        },
        // 隐私政策
        goPrivacy() {
            this.$router.push("/privacy");
        }
  },
  created () {},
  mounted () {},
}
</script>
<style scoped>
    .register{
        height: 100%;
    }
    .register .register_info ul{
        margin: 0 .4rem;
        margin-top: 1.2rem;
    }
    .register .register_info ul li{
        font-size: .36rem;
        padding-bottom: .2rem;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: .6rem;
    }
    .register .register_info ul li p i{
        display: inline-block;
        margin-right: .16rem;
        margin-bottom: -.04rem;
    }
    .register .register_info ul li p .phone_icon{
        width: .28rem;
        height: .46rem;
        background: url(../../assets/images/login/phone.png) no-repeat left top;
        background-size: 100%;
    }
    .register .register_info ul li p .psw_icon{
        width: .33rem;
        height: .41rem;
        background: url(../../assets/images/login/psw.png) no-repeat left top;
        background-size: 100%;
    }
    .register .register_info ul li p .code_icon{
        width: .36rem;
        height: .42rem;
        background: url(../../assets/images/login/code.png) no-repeat left top;
        background-size: 100%;
    }
    .register .register_info ul li .code_item{
        display: flex;
    }
    .register .register_info ul li .code_item input{
        flex: 1;
    }
    .register .register_info ul li .code_item div{
        flex: 1;
        text-align: right;
    }
    .register .register_info ul li input{
        font-size: .28rem;
        margin-top: .3rem;
    }
    .register .register_info .btn{
        width: 6.7rem;
        height: .8rem;
        margin: 0 auto;
        margin-top: .8rem;
    }
    .register .register_info .register_tip{
        font-size: .24rem;
        text-align: center;
        margin-top: .2rem;
    }
    .register .register_info .register_tip span{
        color: #5761b2;
    }
</style>