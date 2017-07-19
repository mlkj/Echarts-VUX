<template>
  <div>
    <group-title>成品收料汇总管理</group-title>
    <grid :rows="3">
      <grid-item link="/rebarGeHZYear" label="开累统计">
        <img slot="icon" src="../../assets/totalcount.png" alt="">
      </grid-item>
      <grid-item link="/rebarGeHZMonth" label="月收料统计">
        <img slot="icon" src="../../assets/monthcount.png" alt="">
      </grid-item>
      <grid-item link="/rebarGeHZDay" label="日收料统计">
        <img slot="icon" src="../../assets/daycount.png" alt="">
      </grid-item>
    </grid>
    <group-title>成品发料汇总管理</group-title>
    <grid :rows="3">
      <grid-item link="/rebarGeOutHZYear" label="开累统计">
        <img slot="icon" src="../../assets/totalcount.png" alt="">
      </grid-item>
      <grid-item link="/rebarGeOutHZMonth" label="月收料统计">
        <img slot="icon" src="../../assets/monthcount.png" alt="">
      </grid-item>
      <grid-item link="/rebarGeOutHZDay" label="日收料统计">
        <img slot="icon" src="../../assets/daycount.png" alt="">
      </grid-item>
    </grid>
     <group-title>原材料汇总管理</group-title>
    <grid :rows="3">
      <grid-item link="/rebarMaterialHZYear" label="开累统计">
        <img slot="icon" src="../../assets/totalcount.png" alt="">
      </grid-item>
      <grid-item link="/rebarMaterialHZMonth" label="月收料统计">
        <img slot="icon" src="../../assets/monthcount.png" alt="">
      </grid-item>
      <grid-item link="/rebarMaterialHZDay" label="日收料统计">
        <img slot="icon" src="../../assets/daycount.png" alt="">
      </grid-item>
      <grid-item link="/rebarMaterialStore" label="实时库存">
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
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
