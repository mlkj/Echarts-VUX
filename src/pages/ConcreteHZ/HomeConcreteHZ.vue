<template>
  <div>
    <group-title>原材料统计管理</group-title>
    <grid :rows="3">
      <grid-item link="/concreteMaterial" label="开累统计">
        <img slot="icon" src="../../assets/totalcount.png" alt="">
      </grid-item>
      <grid-item link="/concreteMaterialMonth" label="月收料统计">
        <img slot="icon" src="../../assets/monthcount.png" alt="">
      </grid-item>
      <grid-item link="/concreteMaterialDay" label="日收料统计">
        <img slot="icon" src="../../assets/daycount.png" alt="">
      </grid-item>
    </grid>
    <group-title>混凝土统计管理</group-title>
    <grid :rows="3">
      <grid-item link="/concreteYear" label="开累统计">
        <img slot="icon" src="../../assets/totalcount.png" alt="">
      </grid-item>
      <grid-item link="/concreteMonth" label="月收料统计">
        <img slot="icon" src="../../assets/monthcount.png" alt="">
      </grid-item>
      <grid-item link="/concreteDay" label="日收料统计">
        <img slot="icon" src="../../assets/daycount.png" alt="">
      </grid-item>
      <grid-item link="/concreteStore" label="实时库存">
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
