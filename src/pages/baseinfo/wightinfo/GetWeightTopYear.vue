<template>
    <div>
        <div v-show="!showDetial">
            <flexbox>
                <flexbox-item>
                    <x-switch title="报表:" v-model="show"></x-switch>
                </flexbox-item>
                <flexbox-item>
                    <top-calendar v-model="startTime" @on-change="change"></top-calendar>
                </flexbox-item>
            </flexbox>
            <div v-show="!show">
                <x-table :cell-bordered="false" style="background-color:#fff;margin-bottom:58px;">
                    <thead>
                        <tr>
                            <th>材料名称</th>
                            <th>规格型号</th>
                            <th>开累数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list,index) in detail" :key="index" @click="clickTabel(list)">
                            <td v-text="list.InfoName"></td>
                            <td v-text="list.InfoModel"></td>
                            <td v-text="list.NetWeight"></td>
                        </tr>
                    </tbody>
                </x-table>
                <load-more v-show="detail.length <= 0" :show-loading="false" tip="暂无数据..." background-color="#fbf9fe"></load-more>
            </div>
            <div v-if="show">
                <x-button mini type="default" plain @click.native="changeType">切换图表类型</x-button>
                <ve-chart :data="chartData" :settings="chartSettings" :events="chartEvents" tooltip-visible legend-visible></ve-chart>
            </div>
        </div>
        <weightinfotoptendetails v-if="showDetial" :supplier-info="SupplierInfo" @listenTochildEvent="showMsgFromchild"></weightinfotoptendetails>
    </div>
</template>

<script type="text/ecmascript-6">
import api from '../../../fetch/api'
import { Flexbox, FlexboxItem, XSwitch, XTable, XDialog, XButton, XInput, Group, Selector, InlineCalendar, LoadMore } from 'vux'
import weightinfotoptendetails from './GetWeightTopDetails'
import TopCalendar from '../../../components/top-calendar/yearCalendar'
import { mapGetters } from 'vuex'



export default {
    components: {
        Flexbox, FlexboxItem, XTable, XDialog, XButton, XInput, Group, Selector, InlineCalendar, XSwitch, TopCalendar, LoadMore, weightinfotoptendetails
    },
    data() {
        return {
            typeArr: ['pie', 'histogram', 'line'],
            index: 0,
            SupplierInfo: [],
            showDetial: false,
            showScrollBox: false,
            detail: [],
            begtime: '',
            endtime: '',
            supplierNM: '',
            infoName: '',
            list: [],
            show: false,
            startTime: 'TODAY',
            chartData: {
                columns: ['类型', '重量'],
                rows: []
            },
            chartSettings: {
                dimension: ['类型'],
                metrics: ['重量'],
                yAxisType: ['KMB'],
                yAxisName: ['重量'],
                area: true,
            }

        }

    },
    computed: {
        ...mapGetters({
            getUserData: 'getUserData',
        })
    },
    methods: {
        changeType: function () {
            this.index++
            if (this.index >= this.typeArr.length) { this.index = 0 }
            this.chartSettings = { type: this.typeArr[this.index], area: true }
        },
        showMsgFromchild(val) {
            this.showDetial = val
        },
        clickTabel(val) {
            this.SupplierInfo = val
            this.showDetial = true
        },
        _initEchart() {
            let _this = this
            _this.detail = []
            _this.chartData.rows = []
            let params = { 'ProjectID': _this.getUserData.DeptNodebh, 'begtime': _this.begtime, 'endtime': _this.endtime }
            api.GetWeightInfoTopTen(params).then(response => {
                let data = response.data.ds
                for (var i = 0; i < data.length; i++) {
                    var obj = {
                        '类型': data[i].InfoName,
                        '重量': data[i].NetWeight
                    }
                    _this.chartData.rows.push(obj)
                    _this.detail.push({
                        InfoName: data[i].InfoName,
                        NetWeight: data[i].NetWeight + data[i].InfoUnit,
                        supplierNM: _this.supplierNM,
                        ProjectID: _this.getUserData.DeptNodebh,
                        begtime: _this.begtime,
                        endtime: _this.endtime,
                        InfoCode: data[i].InfoCode,
                        InfoModel: data[i].InfoModel,
                        InfoUnit: data[i].InfoUnit
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
            let split = val.split('-')
            let year = parseInt(split[0], 10)
            let years = year.toString()
            _this.begtime = years + '-' + '01'
            _this.endtime = years + '-' + '12'
            _this._initEchart()
        }
    },
    created() {
        let _this = this
        this.chartEvents = {
            click: function (e) {
                for (var i = 0; i < _this.detail.length; i++) {
                    if (i === e.dataIndex) {
                        _this.SupplierInfo = _this.detail[i]
                        _this.showDetial = true
                    }
                }
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>

</style>