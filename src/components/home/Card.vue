<template>
  <div class="mid-center">
    <div class="stack-wrapper">
      <stack ref="stack" :pages="someList" :stackinit="stackinit"></stack>
    </div>
  </div>
</template>
<script>
import stack from './stack'
import { Indicator } from 'mint-ui';
export default {
//   el: '#stack',
  data () {
    return {
      someList: [],
      stackinit: {
        visible: 3
      }
    }
  },
  components: {
    stack
  },
  created() {
    Indicator.open({
          text: '加载中...',
          spinnerType: 'triple-bounce'
        });
    this.baseJs.ajaxReq("/integral/api/article",{},"get","")
    .then(res => {
      if (res.code === 200) {
        // console.log(res.data);
        this.someList = res.data
        Indicator.close();
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
}
</script>
<style>
  .stack-wrapper{
    margin: 0 auto;
    margin-top: .5rem;
    position: relative;
    z-index: 1000;
    width: 6.7rem;
    height: 9rem;
    border-radius: .28rem;
    padding: 0;
    list-style: none;
    pointer-events: none;
    box-shadow: 0px 6px 33px 2px rgba(50, 60, 95, 0.19);
  }
  .controls{
    position: relative;
    width: 200px;
    text-align: center;
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    justify-content:space-around;
    margin: 0 auto;
    margin-top: 50px
  }
  .controls .button {
    border: none;
    background: none;
    position: relative;
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    width: 50px;
    height: 50px;
    z-index: 100;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    border-radius: 50%;
    background: #fff;
  }
  .button .next{
    display: inline-block;
    width: 10px;
    height:5px;
    background: rgb(129,212,125);
    line-height: 0;
    font-size:0;
    vertical-align: middle;
    -webkit-transform: rotate(45deg);
    left: -5px;
    top: 2px;
    position: relative;
  }
  .button .next:after{
    content:'/';
    display:block;
    width: 20px;
    height:5px;
    background: rgb(129,212,125);
    -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
  }
  .button .prev{
    display: inline-block;
    width: 20px;
    height:5px;
    background: rgb(230,104,104);
    line-height: 0;
    font-size:0;
    vertical-align: middle;
    -webkit-transform: rotate(45deg);
  }
  .button .prev:after{
    content:'/';
    display:block;
    width: 20px;
    height:5px;
    background: rgb(230,104,104);
    -webkit-transform: rotate(-90deg);
  }
  .controls .text-hidden {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
    color: transparent;
    display: block;
}
</style>