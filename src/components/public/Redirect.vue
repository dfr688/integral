<template>
  <div class="redirect"></div>
</template>

<script>
	import Axios from 'axios'
	
export default {
  name: '',
  data () {
    return {
      
    }
  },
	beforeRouteEnter(to,from,next) {
		let getParams = window.location.href.split("?")[1];
		if(getParams ===undefined||getParams ===""){
			next("/home");
			return;
		}
		let pkgV = getParams.split("&")[0];
		if(pkgV ===undefined||pkgV ===""){
			next("/home");
			return;
		}

		
	  Axios.get('/api/CheckLogin?'+pkgV).then(res=>{
			return res
		  }).catch(err=>{
			// console.log(err);
			return {}
		  }).then(data=>{
			if (data.data && data.data ==='http://www.51jikeyou.com:81') {
			  window.location.href=data.data + "?" + getParams;
			}else{
				next('/home');
			}
		  });
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
