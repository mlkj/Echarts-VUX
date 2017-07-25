<template>
    <div>
        <div>
            <flexbox>
                <flexbox-item :span="5">
                    <x-switch title="报表:" v-model="switchType" @on-change="_onConfirm"></x-switch>
                </flexbox-item>
                <flexbox-item>
                    <top-calendar v-model="startTime" @on-change="change"></top-calendar>
                </flexbox-item>
            </flexbox>
            <div v-show="show">
                <x-table :cell-bordered="false" style="background-color:#fff;">
                    <thead>
                        <tr>
                            <th>班组</th>
                            <th>材料名称</th>
                            <th>规格型号</th>
                            <th>开累数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list,index) in detail" :key="index">
                            <td v-text="list.RebarGName"></td>
                            <td v-text="list.InfoName"></td>
                            <td v-text="list.InfoModel"></td>
                            <td v-text="list.Quantity"></td>
                        </tr>
                    </tbody>
                </x-table>
                <load-more v-show="detail.length <= 0" :show-loading="false" tip="暂无数据..." background-color="#fbf9fe"></load-more>
            </div>
            <div v-if="!show">
                <x-button mini type="default" plain @click.native="changeType">切换图表类型</x-button>
                <ve-chart :data="chartData" :settings="chartSettings" tooltip-visible legend-visible></ve-chart>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import api from '../../../fetch/api'
import { XButton, Flexbox, FlexboxItem, XSwitch, XTable, LoadMore } from 'vux'
import TopCalendar from '../../../components/top-calendar/monthCalendar.vue'
import { mapGetters } from 'vuex'
import { splitValue } from '../../../tools/getDaysInMonth/index'




export default {
    components: {
        XButton, Flexbox, FlexboxItem, XSwitch, XTable, TopCalendar, LoadMore
    },
    data() {
        return {
            typeArr: ['pie', 'histogram', 'line'],
            index: 0,
            switchType: false,
            detail: [],
            begtime: '',
            endtime: '',
            show: true,
            startTime: 'TODAY',
            chartData: {
                columns: ['类型', '净重'],
                rows: []
            },
            chartSettings: {
                dimension: ['类型'],
                metrics: ['净重'],
                yAxisType: ['KMB'],
                yAxisName: ['净重'],
                area: true,
            }
        }

    },
    computed: {
        ...mapGetters({
            getUserData: 'getUserData',
        }),
    },
    methods: {
        changeType: function () {
            this.index++
            if (this.index >= this.typeArr.length) { this.index = 0 }
            this.chartSettings = { type: this.typeArr[this.index], area: true }
        },
        _onConfirm() {
            if (this.switchType) {
                this.show = false
            } else {
                this.show = true
            }
        },
        _initEchart() {
            let _this = this
            _this.detail = []
            _this.chartData.rows = []
            let params = { 'ProjectID': _this.getUserData.DeptNodebh, 'BeginDate': _this.begtime, 'EndDate': _this.endtime }
            api.RebarGeHZ(params).then(response => {
                let data = response.data.ds
                for (var i = 0; i < data.length; i++) {
                    var obj = {
                        '类型': data[i].InfoName,
                        '净重': data[i].Quantity
                    }
                    _this.chartData.rows.push(obj)
                    _this.detail.push({
                        RebarGName: data[i].RebarGName,
                        InfoName: data[i].InfoName,
                        InfoModel: data[i].InfoModel,
                        Quantity: data[i].Quantity + data[i].InfoUnit
                    })
                }
                this.chartSettings = { type: this.typeArr[this.index] }
            }, erro => {
                console.log('数据加载失败!', erro)
            })

        },
        change(val) { //改变查询日期
            let _this = this
            _this.startTime = val
            let temp = splitValue(val).days
            _this.begtime = _this.startTime + '-' + '01'
            _this.endtime = _this.startTime + '-' + temp
            _this._initEchart()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>

</style>