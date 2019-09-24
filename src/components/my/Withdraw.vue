<template>
  <div class="withdraw">
      <Swiper>
          <HeaderTop title="提现"/>
          <div class="current_integral">
              <p>当前积分</p>
              <div>
                  {{ this.currentIntegral }}<span>约{{ convertcurrentIntegral.toFixed(2) }}元</span>  
              </div>
          </div>
          <div class="option">
              <p>提现到</p>
              <ul>
                  <li class="alipay" :class="{active:sign===0}" @click="chooseAlipay(0)">
                      <i></i>支付宝
                  </li>
                  <li class="wechat_payment" :class="{active:sign===1}" @click="chooseWechat(1)">
                      <i></i>微信支付
                  </li>
              </ul>
              <div class="account" v-if="sign===0">
                  支付宝账号: <input type="text" placeholder="请输入支付宝账号" v-model="accountNum"/>
              </div>
              <div class="account" v-if="sign===1">
                  微信账号: <input type="text" placeholder="请输入微信账号" v-model="accountNum"/>
              </div>
          </div>
          <div class="option how_many">
              <p>快捷提现</p>
              <ul>
                  <li :class="{active:index === 0}" @click="chooseOne(0)">
                      <p>¥ 10.00</p>
                      <span>消耗100000个积分</span>
                  </li>
                  <li :class="{active:index === 1}" @click="chooseTwo(1)">
                      <p>¥ 30.00</p>
                      <span>消耗300000个积分</span>
                  </li>
                  <li :class="{active:index === 2}" @click="chooseThree(2)">
                      <p>¥ 50.00</p>
                      <span>消耗500000个积分</span>
                  </li>
              </ul>
          </div>
          <div class="btn">
              <mt-button type="primary" size="large" @click.native="handleClick">提现</mt-button>
          </div>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import HeaderTop from '../public/HeaderTop'
import { MessageBox } from 'mint-ui';
export default {
 name: "",
  data () {
    return {
        sign: 0,
        index: 0,
        currentIntegral: "",
        accountNum: ""
    }
  },
  components: {
      Swiper,
      HeaderTop
  },
  computed: {
      convertcurrentIntegral() {
          return this.currentIntegral / 10000;
      }
  },
  watch: {},
  methods: {
      chooseAlipay(val) {
          this.sign = val;
      },
      chooseWechat(val) {
          this.sign = val;
      },
      chooseOne(val){
          this.index = val;
      },
      chooseTwo(val) {
          this.index = val;
      },
      chooseThree(val) {
          this.index = val;
      },
    //   提现
    handleClick() {
        if(this.accountNum === ""){
            MessageBox('提示', '请输入提现账号');
        }else if(this.currentIntegral >= 100000){
           MessageBox.confirm('确认提现?').then(action => {
                  MessageBox('提现成功', '请等待客服审核').then(action => {
                    this.$router.push("/my");
                });
            });
        }else{
            MessageBox('提示', '积分不足，请多完成积分任务');
        }
    }
  },
  created () {
      this.currentIntegral = this.$route.params.integral;
  },
  mounted () {},
}
</script>
<style scoped>
    @import '../../assets/css/withdraw.css'
</style>