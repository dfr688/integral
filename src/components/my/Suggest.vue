<template>
  <div class="suggest">
      <Swiper>
          <HeaderTop title="意见反馈"/>
          <div class="text">
              <textarea name="" id="" placeholder="请输入您的意见和建议，工作人员将在第一时间评估处理，感谢您的反馈。" v-model="text"></textarea>
          </div>
          <div class="btn">
              <mt-button type="primary" size="large" @click.native="handleClick">提交</mt-button>
          </div>
      </Swiper>    
  </div>
</template>

<script>
import HeaderTop from '../public/HeaderTop'
import Swiper from '../public/Swiper'
import { Toast } from 'mint-ui';
export default {
 name: "",
  data () {
    return {
        text: ""
    }
  },
  components: {
      HeaderTop,
      Swiper
  },
  computed: {},
  watch: {},
  methods: {
      handleClick() {
          if(this.text === ""){
              Toast({
                message: '请输入您的宝贵意见！',
                duration: 1000
            });
          }else{
              Toast({
                message: '感谢您的宝贵意见！',
                duration: 1000
            });
            this.$router.push("/my");
          }
      }
  },
  created () {},
  mounted () {},
}
</script>
<style scoped>
    .suggest{
        height: 100%;
    }
    .suggest .text{
        width: 6.7rem;
        height: 3.86rem;
        background: #fff;
        box-shadow: 0px 3px 12px 1px rgba(43, 50, 84, 0.09);
        border-radius: .1rem;
        margin: 0 auto;
        padding: .2rem;
        box-sizing: border-box;
    }
    .suggest .text textarea{
        width: 100%;
        height: 100%;
    }
    .suggest .btn{
        margin: 0 .4rem;
        margin-top: .8rem;
    }
</style>