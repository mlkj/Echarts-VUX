<template>
  <div>
    <x-header :transition="headerTransition" style="width:100%;position:absolute;left:0;top:0;background-color: RGB(0, 122, 204);" :right-options="rightOptions" :left-options="leftOptions" @on-click-more="onClickMore" :title="title">
      <!-- <span v-if="true" slot="overwrite-left" @click="onClickMore">
        <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      </span> -->
    </x-header>
    <div>
      <actionsheet :menus="menus" v-model="showMenus" @on-click-menu-menu3="_click" @on-click-menu-menu2="_clickSystem"></actionsheet>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <x-dialog v-model="showScrollBox" class="dialog-demo">
      <group title="转化角色">
        <selector :options="lists" title="角色:" v-model="value3" @on-change="_onChange"></selector>
      </group>
      <div class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="showScrollBox=false">取消</a>
      </div>
    </x-dialog>
    <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
      <tabbar-item link="/newsList">
        <img slot="icon" src="../assets/applay.png">
        <span slot="label">微应用</span>
      </tabbar-item>
      <tabbar-item link="/home" selected>
        <img slot="icon" src="../assets/home.png">
        <span slot="label">工作台</span>
      </tabbar-item>
      </tabbar-item>
      <tabbar-item @on-item-click="showScrollBox =!showScrollBox">
        <img slot="icon" src="../assets/user.png">
        <span slot="label">转化角色</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Selector, XDialog, Group, XHeader, Actionsheet, Tabbar, TabbarItem, Grid, GridItem } from 'vux'
import { mapGetters, mapActions } from 'vuex'


export default {
  components: {
    XHeader, Group, Grid, GridItem, XDialog, Selector,
    Actionsheet,
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      menuList: {},
      value3: '',
      lists: [],
      showScrollBox: false,
      objectListValue: [],
      objectList: [],
      show1: false,
      show: true,
      menus: {
        menu2: '系统设置',
        menu3: '注销登录'
      },
      showMenus: false
    }
  },
  methods: {
    //转化角色
    _onChange(val) {
      let data = this.userInfo
      for (var i = 0; i < data.length; i++) {
        if (data[i].RoleName + '|' + data[i].DeptName == val) {
          let params = data[i]
          this.$store.dispatch('getUserData', params)
          this.showScrollBox = false
        }
      }
    },
    _clickSystem() {
      this.$router.push('/systemConfig')
    },
    onClickMore() {
      this.showMenus = true
    },
    _click() {
      let that = this
      that.$vux.confirm.show({
        title: '提示',
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
      })
    }
  },
  mounted() {
    var data = this.userInfo
    for (var i = 0; i < data.length; i++) {
      this.lists.push(data[i].RoleName + '|' + data[i].DeptName)
    }
    this.value3 = this.lists[0]
  },
  computed: {
    ...mapGetters([
      'userInfo', 'getUserData'
    ]),
    headerTransition() {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vux-demo-tabbar {
  position: fixed;
}
</style>
