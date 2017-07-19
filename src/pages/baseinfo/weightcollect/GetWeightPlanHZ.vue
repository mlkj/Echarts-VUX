<template>
    <div class="content">
        <x-button mini type="primary" plain @click.native="changeType">切换图表类型</x-button>
        <ve-chart :data="chartData" :settings="chartSettings" tooltip-visible legend-visible></ve-chart>
    </div>
</template>  
<script>  
import { XButton } from 'vux'
import api from '../../../fetch/api'
import { mapGetters } from 'vuex'


export default {
    components: {
        XButton
    },
    data() {
        return {
            typeArr: ['pie', 'histogram', 'line'],
            index: 0,
            chartSettings: {
                dimension: '类型',
                metrics: '重量',
                dataType: 'KMB',
                selectedMode: 'single',
                hoverAnimation: false,
                area: true,
                radius: 100,
                offsetY: 200,
            },
            chartData: {
                columns: ['类型', '重量'],
                rows: []
            }
        }
    },
    computed: {
        ...mapGetters({
            getUserData: 'getUserData',
        })
    },
    created() {
        var that = this
        // ajax 请求数据  
        that.chartData.rows = []
        let pars = { 'ProjectID': that.getUserData.DeptNodebh }
        api.GetWeightPlanHZ(pars).then(response => {
            let data = response.data.table
            for (var i = 0; i < data.length; i++) {
                var obj = {
                    '类型': data[i].InfoName + ',' + data[i].InfoModel,
                    '重量': data[i].InWeightQuantity
                }
                that.chartData.rows.push(obj)
            }
            that.chartSettings = { type: that.typeArr[that.index] }
        }, (err) => {
            console.log(err)
        })
    },
    methods: {
        changeType: function () {
            this.index++
            if (this.index >= this.typeArr.length) { this.index = 0 }
            this.chartSettings = { type: this.typeArr[this.index] }
        }
    }
}  
</script> 

<style scoped>

</style>   