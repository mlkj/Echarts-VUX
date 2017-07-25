<template>
  <div>
    <swiper :list="list" :min-moving-distance="20" style="width:100%;margin:0 auto;" :aspect-ratio="300/800" loop auto dots-position="center"></swiper>
    <group>
      <cell title="公告">
        <marquee>
          <marquee-item v-for="item in report" :key="item.id" @click.native="onClick(item)" v-text="item.name"></marquee-item>
        </marquee>
      </cell>
    </group>
    <grid :rows="3">
      <grid-item link="/homepage" label="地磅称重管理">
        <img slot="icon" src="../assets/number.png">
      </grid-item>
      <grid-item link="/homeConcreteHZ" label="混凝土统计管理">
        <img slot="icon" src="../assets/concrete.png">
      </grid-item>
      <grid-item link="/homeRebarMaterial" label="钢筋加工中心">
        <img slot="icon" src="../assets/prepared.png">
      </grid-item>
      <grid-item link="" label="PDA信息管理" @on-item-click="onItemClick">
        <img slot="icon" src="../assets/PDA.png">
      </grid-item>
    </grid>
  </div>
</template>

<script type="text/babel">
import { Cell, Group, Grid, GridItem, GroupTitle, SwiperItem, Swiper, Marquee, MarqueeItem } from 'vux'

export default {
  components: {
    Cell, Group, Grid, GridItem, GroupTitle, SwiperItem, Swiper, Marquee, MarqueeItem
  },
  data() {
    return {
      report: [{ name: '关于规范物资管理业务流程的通知。' }, { name: '关于手机版报表统计简易操作手册' }, { name: '研发物资管理系统，主要解决的问题' }],
      list: [{
        url: 'javascript:',
        img: require('../assets/logo_left.jpg'),
        title: '地磅称重管理系统'
      }, {
        url: 'javascript:',
        img: require('../assets/logo_center.jpg'),
        title: '报表统计'
      }, {
        url: 'javascript:',
        img: require('../assets/logo_right.jpg'),
        title: '混凝土统计管理'
      }]
    }
  },
  methods: {
    onItemClick() {
      this.$vux.alert.show({
        title: '提示!',
        content: '该功能待开发。',
      })
    },
    onClick(i) {
      console.log(i)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
