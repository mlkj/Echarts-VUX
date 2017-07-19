
<template>
  <div id="app" style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
        <loading v-model="loading"></loading> 
		    <keep-alive>
								<transition name="fade">
									<router-view transition-mode="out-in"></router-view>
								</transition>
        </keep-alive>
        </view-box>
  </div>
</template>
  
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { ViewBox,Loading } from 'vux'


export default {
  name: 'app',
    components: {
     ViewBox,Loading
	},
    computed: {
      ...mapGetters([
          'loading'  
      ])
},
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';


body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.fade-transition {
  transition: opacity .2s ease;
} 

.fade-enter, .fade-leave {
  opacity: 0;
}
.fade-enter, .fade-leave-to{
  opacity: 0
}		
</style>
