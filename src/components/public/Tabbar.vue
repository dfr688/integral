<template>
  <div class="tabbar">
    <ul>
        <li class="home" @click="goHome">
            <div :class="{selected:isSelected === 0}"></div>
            <span :class="{active:isSelected === 0}"></span>
        </li>
        <li class="calendar" @click="goCalendar">
            <div :class="{selected:isSelected === 1}"></div>
            <span :class="{active:isSelected === 1}"></span>
        </li>
        <li class="my" @click="goMy">
            <div :class="{selected:isSelected === 2}"></div>
            <span :class="{active:isSelected === 2}"></span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
 name: "",
  data () {
    return {
        isSelected: 0
    }
  },
  components: {},
  computed: {},
  watch: {
		$route(to,from) {
			if(to.name === 'home'){
				this.isSelected = 0;
			}else if(to.name === 'calendar'){
				this.isSelected = 1;
			}else if(to.name === 'my'){
				this.isSelected = 2;
			}
		}
	},
  methods: {
    //   首页
    goHome() {
        this.$router.push("/home");
        this.isSelected = 0;
    },
    // 日历
    goCalendar() {
        this.$router.push("/calendar");
        this.isSelected = 1;
    },
    // 我的
    goMy() {
        this.$router.push("/my");
        this.isSelected = 2;
    }
  },
  created () {
      if(this.$route.name === "home") {
			this.isSelected = 0;
		}else if(this.$route.name === "calendar") {
			this.isSelected = 1;
		}else if(this.$route.name === "my") {
			this.isSelected = 2;
		}
  },
  mounted () {},
}
</script>
<style scoped>
    .tabbar{
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        font-size: .3rem;
        z-index: 1;
        background: #30375b;
    }
    .tabbar ul{
        display: flex;
    }
    .tabbar ul li{
        flex: 1;
        text-align: center;
    }
    .tabbar ul li div{
        margin: 0 auto;
    }
    .tabbar ul .home div{
        width: .62rem;
        height: .54rem;
        background: url(../../assets/images/tabbar/home.png) no-repeat left top;
        background-size: 100%;
    }
    .tabbar ul .home div.selected{
        background: url(../../assets/images/tabbar/home_selected.png) no-repeat left top;
        background-size: 100%;
    }
    .tabbar ul .calendar div{
        width: .57rem;
        height: .52rem;
        background: url(../../assets/images/tabbar/calendar.png) no-repeat left top;
        background-size: 100%;
    }
    .tabbar ul .calendar div.selected{
        background: url(../../assets/images/tabbar/calendar_selected.png) no-repeat left top;
        background-size: 100%;
    }
    .tabbar ul .my div{
        width: .53rem;
        height: .49rem;
        background: url(../../assets/images/tabbar/my.png) no-repeat left top;
        background-size: 100%;
    }
    .tabbar ul .my div.selected{
        background: url(../../assets/images/tabbar/my_selected.png) no-repeat left top;
        background-size: 100%;
    }
    .tabbar ul li span{
        display: inline-block;
        margin-top: .2rem;
        width: .5rem;
        height: .04rem;
    }
    .tabbar ul li span.active{
        background: #fff;
        border-radius: .02rem;
    }
</style>