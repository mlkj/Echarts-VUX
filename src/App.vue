<template>
  <div id="app" style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="loading"></loading>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" @on-click-menu-menu3="_click"></actionsheet>
    </div>
  
    <drawer width="200px;" :show.sync="drawerVisibility" :show-mode="showModeValue" :placement="showPlacementValue" :drawer-style="{'background-color':'#35495e', width: '200px'}">
      <!-- drawer content -->
      <div slot="drawer">
        <div class="y_nav_h">
          <img src="./assets/user.png" alt="" @click="_click">易龙物资管理系统
        </div>
        <group title="菜单" style="margin-top:20px;">
          <cell title="系统设置" link="/systemConfig" value="" @click.native="drawerVisibility = false">
          </cell>
          <cell title="客服" value="029-88227793" @click.native="drawerVisibility = false">
          </cell>
          <cell title="关于易龙" link="http://www.yearrow.com" @click.native="drawerVisibility = false">
          </cell>
          <cell title="二维码">
            <qrcode value="http://192.168.20.18:8080" :size="num" type="img" class="qcode" fg-color="#000000" @click.native="onClick"></qrcode>
          </cell>
        </group>
      </div>
      <!-- main content -->
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
        <x-header slot="header" :transition="headerTransition" style="width:100%;position:absolute;left:0;top:0;" :right-options="rightOptions" :left-options="leftOptions" @on-click-more="onClickMore" :title="title">
          <span v-if="showDrawer" slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
        </x-header>
        <keep-alive>
          <transition name="fade">
            <router-view transition-mode="out-in" class="router-view"></router-view>
          </transition>
        </keep-alive>
      </view-box>
    </drawer>
  </div>
</template>
  
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { Qrcode, Drawer, ViewBox, Loading, TransferDom, Group, Cell, XHeader, Actionsheet } from 'vux'


export default {
  directives: {
    TransferDom
  },
  name: 'app',
  components: {
    Qrcode, Drawer, ViewBox, Loading, TransferDom, Group, Cell, XHeader, Actionsheet
  },
  data() {
    return {
      num: 15,
      drawerVisibility: false,//侧边栏
      showModeValue: 'push',
      showPlacementValue: 'left',
      menus: {
        menu3: '注销登录'
      },
      showMenus: false,
      show: true //header右菜单
    }
  },
  methods: {
    onClick() {
      if (this.num === 15) {
        this.num = 70
      } else {
        this.num = 15
      }
    },
    onClickMore() {
      this.showMenus = true
    },
    _click() {
      let that = this
      that.$vux.confirm.show({
        title: '注销登录',
        content: '您确认退出程序吗?',
        onConfirm() {
          that.$store.dispatch('setSignOut')
          setTimeout(() => {
            that.$router.replace('/login')
          }, 200)
          that.$vux.toast.show({
            text: '退出登录成功',
            type: 'text',
            position: 'top',
            width: "15em"
          })
        }
      },
        that.drawerVisibility = false
      )
    }
  },
  computed: {
    showDrawer() {
      if (this.$route.meta.requireMenue) return true
    },
    ...mapGetters([
      'loading'
    ]),
    headerTransition() {
      return 'vux-header-fade-in-left'
    },
    title() {
      if (this.$route.meta.requireMenue) {
        this.show = true;
      } else {
        this.show = false;
      }
      return this.$route.name
    },
    leftOptions() {
      return {
        showBack: !this.$route.meta.requireMenue
      }
    },
    rightOptions() {
      return {
        showMore: this.show
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';

body {
  background-color: #fbf9fe;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.fade-transition {
  transition: opacity .2s ease;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.fade-enter,
.fade-leave {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.y_nav_h {
  width: 200px;
  margin: 0 auto;
  text-align: center;
  padding-top: 25px;
  position: relative;
  padding-bottom: 3px;
  border-bottom: 1px solid #000;
  img {
    width: 60px;
    height: 60px;
    margin-left: -5px;
    vertical-align: middle;
  }
}

.router-view {
  width: 100%;
  top: 46px;
}
</style>
