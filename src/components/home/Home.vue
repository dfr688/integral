<template>
  <div class="home">
    <div class="wrap">
      <p>任务推荐</p>
      <Card/>
    </div>
  </div>
</template>

<script>
  import Card from './Card'
export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  components: {
    Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{
    height: 100%;
    width: 100%;
  }
  .home .wrap{
    height: 100%;
    width: 100%;
    background: #30375b;
  }
  .home .wrap p{
    text-align: center;
    font-size: .48rem;
    color: #fff;
    padding-top: .8rem;
  }
</style>
