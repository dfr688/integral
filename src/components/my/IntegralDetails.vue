<template>
  <div class="integralDetail">
    <!-- <Swiper> -->
        <HeaderTop title="积分明细"/>
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
            <div class="details">
                <ul>
                    <li v-for="(item,index) in integralList" :key="item.id">
                        <div class="left">
                            <p>{{ item.description }}</p>
                            <span>{{ item.createTime }}</span>
                        </div>
                        <div class="right">
                            +{{ item.integral }}
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="allLoaded" class="data-none">没有更多数据了</div>
			<div slot="top" class="mint-loadmore-top" style="text-align:center">
				<span class="release" v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">释放加载</span>
				<span class="release" v-show="topStatus === 'loading'">加载中...</span>
			</div>
        </mt-loadmore>
    <!-- </Swiper> -->
  </div>
</template>

<script>
import HeaderTop from '../public/HeaderTop'
import Swiper from '../public/Swiper'
export default {
 name: "integralDetail",
  data () {
    return {
        integralList: "",
        page: 1,
		allLoaded: false,
		topStatus: "",
    }
  },
  components: {
      HeaderTop,
      Swiper
  },
  computed: {},
  watch: {},
  methods: {
      getList(page) {
        let token = localStorage.getItem("token");
        this.baseJs.ajaxReq("/integral/api/user/integral/log",{pageNum:page,pageSize:20},"get",token)
        .then(res => {
            // console.log(res);
            this.integralList = res.data.list;
        })
        .catch(err => {
            console.log(err);
        })
    },
    loadBottom() {
        this.page = this.page + 1;
        // 发送请求
        let token = localStorage.getItem("token");
        this.baseJs.ajaxReq("/integral/api/user/integral/log",{pageNum:this.page,pageSize: 20},"get",token)
        .then(res => {
            // console.log(res);
            if(this.page > res.data.pages){
                this.allLoaded = true;
            }else{
                 this.integralList = this.integralList.concat(res.data.list);
            }
            this.$refs.loadmore.onBottomLoaded();
            // console.log(this.typeLists);
        })
        .catch(err => {
            console.log(err);
        });
    },
    loadTop() {
        this.handleTopChange("loading");//下拉时 改变状态码
        this.getList(1);
        this.allLoaded = false;
        this.page = 1;
        setTimeout(() => {
                this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
                this.$refs.loadmore.onTopLoaded();
            }, 800);
        // console.log(this.topStatus);
	},
	handleTopChange(status) {
		this.topStatus = status;
	}
  },
  created () {
      this.getList(1);
  },
  mounted () {},
}
</script>
<style scoped>
    .integralDetail{
        height: 100%;
        overflow: auto;
		-webkit-overflow-scrolling: touch;
    }
    .integralDetail .details ul{
        margin: 0 .4rem;
    }
    .integralDetail .details ul li{
        display: flex;
        font-size: .3rem;
        padding-bottom: .2rem;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: .2rem;
    }
    .integralDetail .details ul li .left{
        flex: 1;
    }
    .integralDetail .details ul li .left span{
        font-size: .24rem;
        color: #999;
    }
    .integralDetail .details ul li .right{
        flex: 1;
        text-align: right;
        font-size: .46rem;
        height: .8rem;
        line-height: .8rem;
    }
    /* 加载 */
    .release{
        font-size: .3rem;
    }
    .data-none{
        font-size: .3rem;
        text-align: center;
        padding-bottom: .3rem;
    }
</style>