<template>
    <div>
        <div v-show="!showDetial">
            <flexbox>
                <flexbox-item :span="5">
                    <x-switch title="报表:" v-model="switchType" @on-change="_onConfirm"></x-switch>
                </flexbox-item>
                <flexbox-item>
                    <selector :options="list" v-model="supplierNM" @on-change="_onChange"></selector>
                </flexbox-item>
            </flexbox>
            <top-calendar v-model="startTime" @on-change="change"></top-calendar>
            <div v-show="show">
                <x-table :cell-bordered="false" style="background-color:#fff;">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>材料名称</th>
                            <th>开累</th>
                        </tr>
                    </thead>
                    <tbody v-if="detail.length > 0">
                        <tr v-for="(list,index) in detail" :key="index" @click="clickTabel(list)">
                            <td v-text="index+1"></td>
                            <td v-text="list.InfoName"></td>
                            <td v-text="list.NetWeight"></td>
                        </tr>
                    </tbody>
                </x-table>
                <load-more v-show="detail.length <= 0" :show-loading="false" tip="暂无数据..." background-color="#fbf9fe"></load-more>
            </div>
            <div v-if="!show">
                <x-button mini type="default" plain @click.native="changeType">切换图表类型</x-button>
                <ve-chart :data="chartData" :settings="chartSettings" :events="chartEvents" tooltip-visible legend-visible></ve-chart>
            </div>
        </div>
        <supplierinfodetail v-if="showDetial" :supplier-info="SupplierInfo" @listenTochildEvent="showMsgFromchild"></supplierinfodetail>
    </div>
</template>

<script type="text/ecmascript-6">
import api from '../../fetch/api'
import { XButton, Selector, Flexbox, FlexboxItem, XSwitch, XTable, LoadMore } from 'vux'
import Supplierinfodetail from './Supplierinfodetail'
import TopCalendar from '../../components/top-calendar/monthCalendar.vue'
import { mapGetters } from 'vuex'
import { splitValue } from '../../tools/getDaysInMonth/index'



export default {
    components: {
        XButton, Selector, Supplierinfodetail, Flexbox, FlexboxItem, XSwitch, XTable, TopCalendar, LoadMore
    },
    data() {
        return {
            typeArr: ['pie', 'histogram', 'line'],
            index: 0,
            SupplierInfo: [],
            showDetial: false,
            switchType: false,
            detail: [],
            begtime: '',
            endtime: '',
            supplierNM: '',
            infoName: '',
            list: [],
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
        showMsgFromchild(val) {
            this.showDetial = val
        },
        _onConfirm() {
            if (this.switchType) {
                this.show = false
            } else {
                this.show = true
            }
        },
        clickTabel(val) {
            this.SupplierInfo = val
            this.showDetial = true
        },
        _initEchart() {
            let _this = this
            _this.detail = []
            _this.chartData.rows = []
            let params = { 'ProjectID': _this.getUserData.DeptNodebh, 'SupplierNM': _this.supplierNM, 'begtime': _this.begtime, 'endtime': _this.endtime }
            api.GetSuppWeightInfoTopTen(params).then(response => {
                let data = response.data.ds
                for (var i = 0; i < data.length; i++) {
                    var obj = {
                        '类型': data[i].InfoName,
                        '净重': data[i].NetWeight
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
        _onChange(val) { //key值
            this.supplierNM = val
            this._initEchart()
        },
        GetSupplier() {
            let that = this
            let params = { 'ProjectID': that.getUserData.DeptNodebh, 'SupplierName': '' }
            api.GetSupplierInfo(params).then(response => {
                let data = response.data.ds
                that.supplierNM = data[0].SupplierNM
                for (var i = 0; i < data.length; i++) {
                    that.list.push({
                        key: data[i].SupplierNM,
                        value: data[i].SupplierName
                    })
                }
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
    },
    mounted() {
        this.GetSupplier()
    },
    created() {
        var _this = this
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