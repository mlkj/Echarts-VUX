<template>
  <div>
    <group-title>地磅称重统计管理</group-title>
    <grid :rows="3">
      <grid-item link="/getWeightTopYear" label="开累统计报表">
        <img slot="icon" src="../../assets/report.png" alt="">
      </grid-item>
      <!-- <grid-item link="/getWeightPlanHZ" label="汇总统计">
        <img slot="icon" src="../../assets/count.png" alt="">
      </grid-item> -->
      <grid-item link="/supplierWeightMonth" label="月收料统计报表">
        <img slot="icon" src="../../assets/Monthpie.png" alt="">
      </grid-item>
      <grid-item link="/supplierWeightInfo" label="日收料统计报表">
        <img slot="icon" src="../../assets/chartbar.png" alt="">
      </grid-item>
      <grid-item link="/weightDetialSeach" label="入库明细报表">
        <img slot="icon" src="../../assets/detail.png" alt="">
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
