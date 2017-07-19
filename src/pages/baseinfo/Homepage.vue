<template>
  <div>
    <group-title>磅单统计管理</group-title>
    <grid :rows="3">
      <grid-item link="/getWeightTopYear" label="开累统计">
        <img slot="icon" src="../../assets/totalcount.png" alt="">
      </grid-item>
      <grid-item link="/getWeightPlanHZ" label="汇总统计">
        <img slot="icon" src="../../assets/count.png" alt="">
      </grid-item>
      <grid-item link="/supplierWeightMonth" label="月收料统计">
        <img slot="icon" src="../../assets/monthcount.png" alt="">
      </grid-item>
      <grid-item link="/supplierWeightInfo" label="日收料统计">
        <img slot="icon" src="../../assets/daycount.png" alt="">
      </grid-item>
      <grid-item link="/weightDetialSeach" label="入库明细">
        <img slot="icon" src="../../assets/detail.png" alt="">
      </grid-item>
    </grid>
  
    <group-title>生产管理</group-title>
    <grid :rows="3">
      <grid-item link="" label="生产统计" @on-item-click="onItemClick">
        <img slot="icon" src="../../assets/product.png" alt="">
      </grid-item>
    </grid>
  
  </div>
</template>

<script type="text/babel">
import { Grid, GridItem, GroupTitle } from 'vux'

export default {
  components: {
    Grid, GridItem, GroupTitle
  },
  data() {
    return {

    }
  },
  methods: {
    onItemClick() {
      this.$vux.alert.show({
        title: '提示!',
        content: '该功能待开发。',
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
