<template>
    <div>
        <div v-show="!showDetial">
            <flexbox>
                <flexbox-item>
                    <selector :options="list" v-model="supplierNM" @on-change="_onChange"></selector>
                </flexbox-item>
                <flexbox-item>
                    <calendar :weeks-list="weeksList" @on-change="change" v-model="startTime" title="日期:" disable-future></calendar>
                </flexbox-item>
            </flexbox>
            <tab>
                <tab-item selected @on-item-click="onItemClick">表单</tab-item>
                <tab-item @on-item-click="onClick">报表</tab-item>
            </tab>
            <div v-show="show">
                <x-table :cell-bordered="false" style="background-color:#fff;">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>材料名称</th>
                            <th>开累</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list,index) in detail" :key="index" @click="clickTabel(list)">
                            <td v-text="index+1"></td>
                            <td v-text="list.InfoName"></td>
                            <td v-text="list.NetWeight"></td>
                        </tr>
                    </tbody>
                </x-table>
            </div>
            <load-more v-show="detail.length <= 0" :show-loading="false" tip="暂无数据..." background-color="#fbf9fe"></load-more>
            <div v-if="!show">
                <x-button mini type="default" plain @click.native="changeType">切换图表类型</x-button>
                <ve-chart :data="chartData" :settings="chartSettings" :events="chartEvents" tooltip-visible legend-visible></ve-chart>
            </div>
        </div>
        <supplierinfodetail v-if="showDetial" :supplier-info="SupplierInfo" @listenTochildEvent="showMsgFromchild"></supplierinfodetail>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import api from '../../fetch/api'
import { Flexbox, FlexboxItem, Calendar, Tab, TabItem, XTable, XDialog, XButton, Group, Selector, LoadMore } from 'vux'
import Supplierinfodetail from './Supplierinfodetail'


export default {
    components: {
        Flexbox, FlexboxItem, Calendar, Tab, TabItem, XTable, XDialog, XButton, Group, Selector, Supplierinfodetail, LoadMore
    },
    data() {
        return {
            typeArr: ['histogram', 'line'],
            index: 0,
            weeksList: ['日', '一', '二', '三', '四', '五', '六 '],
            SupplierInfo: [],
            showDetial: false,
            myChart: null,
            detail: [],
            begtime: '',
            endtime: '',
            supplierNM: '',
            infoName: '',
            list: [],
            show: true,
            startTime: 'TODAY',
            chartSettings: {
                dimension: ['类型'], //默认columns第一项为维度
                metrics: ['净重'], //默认columns第二项为指标
                yAxisType: ['KMB'],
                yAxisName: ['净重'],
            },
            chartData: {
                columns: ['类型', '净重'], //代表指标和维度名称
                rows: [] //数据内容
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
            this.chartSettings = { type: this.typeArr[this.index] }
        },
        onItemClick() {
            this.show = true
        },
        onClick() {
            this.show = false
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
                        ProjectID: _this.ProjectID,
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
        _onChange(val) { //key值，改变供应商
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
            _this.begtime = _this.startTime + ' ' + '00:00'
            _this.endtime = _this.startTime + ' ' + '23:59'
            if (this.supplierNM) {
                _this._initEchart()
            }
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