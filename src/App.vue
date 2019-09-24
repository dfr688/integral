<template>
  <div id="app">
    <router-view/>
    <Tabbar v-if="isShow"/>
  </div>
</template>

<script>
import Tabbar from './components/public/Tabbar'
export default {
  name: 'App',
  data() {
    return {
      isShow: true
    }
  },
  components: {
    Tabbar
  },
  watch: {
    $route(to,from) {
      if(to.name === "home" || to.name === "calendar" || to.name === "my"){
			  this.isShow = true;
      }else{
        this.isShow = false;
      };
    }
  },
  created() {
		if(this.$route.name === "home" || this.$route.name === "calendar" || this.$route.name === "my"){
			this.isShow = true;
		}else{
			this.isShow = false;
		};
	}
}
</script>

<style>

</style>
