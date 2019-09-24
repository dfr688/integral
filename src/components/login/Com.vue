<template>
  <div class="com">
      <div class="top"> 
          <i class="back" @click="goBack"></i>
          <p>{{ title }}</p>
          <div>{{ english }}</div>
      </div>
  </div>
</template>

<script>
export default {
 name: "",
  data () {
    return {
    }
  },
  props: [
      "title",
      "english"
  ],
  components: {},
  computed: {},
  watch: {},
  methods: {
    //   返回
    goBack() {
        this.$router.go(-1);
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped>
    .com .top{
        width: 100%;
        height: 4.41rem;
        background: url(../../assets/images/login/background.png) no-repeat left top;
        background-size: 100%;
        color: #fff;
        font-size: .5rem;
        padding-left: .4rem;
        padding-top: 1.6rem;
        box-sizing: border-box;
        position: relative;
    }
    .com .top .back{
        position: absolute;
        top: .7rem;
        left: .4rem;
        width: .5rem;
        height: .5rem;
        background: url(../../assets/images/public/back.png) no-repeat left top;
        background-size: 100%;
    }
    .com .top p{
        font-size: .6rem;
    }
</style>