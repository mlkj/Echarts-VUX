<template>
  <div>
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
import { Selector, XDialog, Group, Tabbar, TabbarItem } from 'vux'
import { mapGetters } from 'vuex'


export default {
  components: {
    Group, XDialog, Selector,
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      value3: '',
      lists: [],
      showScrollBox: false,
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
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vux-demo-tabbar {
  position: fixed;
}
</style>
