<template>
  <div class="headerTop">
      <i @click="goBack"></i>{{ title }}
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
      "title"
  ],
  components: {},
  computed: {},
  watch: {},
  methods: {
    // 返回
    goBack() {
      this.$router.go(-1);
    }
  },
  created () {},
  mounted () {},
}
</script>
<style scoped>
    .headerTop{
        text-align: center;
        font-size: .42rem;
        padding-top: .6rem;
        position: relative;
        margin-bottom: .4rem;
    }
    .headerTop i{
        position: absolute;
        top: .67rem;
        left: .4rem;
        width: .5rem;
        height: .5rem;
        background: url(../../assets/images/public/back.png) no-repeat left top;
        background-size: 100%;
    }
</style>