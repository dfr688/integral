<template>
  <div class="swiper">
    <swiper :options="swiperOption" class="swiper" ref="swiper">
			<swiper-slide class="text">
					<slot></slot>
			</swiper-slide>
    </swiper>
  </div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import 'swiper/dist/css/swiper.css'
	
export default {
  name: '',
  data () {
    return {
      swiperOption: {
					direction: 'vertical',
					slidesPerView: 'auto',
					freeMode: true,
					setWrapperSize: true,
					// mousewheel:true,
			}
    }
		},
	
	components: {
			swiper,
			swiperSlide
	},
	methods: {
		update() {
			// console.log(this.$refs.swiper);
			this.$refs.swiper.swiper.update();
		}
	}
}
</script>


<style scoped>
	.swiper{
		height: 100%;
	}
	.text{
		height: auto;
	}
</style>
