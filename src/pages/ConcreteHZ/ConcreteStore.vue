<template>
    <div>
        <flexbox>
            <flexbox-item :span="5">
                <x-switch title="报表:" v-model="switchType" @on-change="onItemClick"></x-switch>
            </flexbox-item>
            <flexbox-item>
                <calendar :weeks-list="weeksList" @on-change="change" v-model="startTime" title="日期:" disable-future></calendar>
            </flexbox-item>
        </flexbox>
            <div class="wrappers" ref="wrapper" v-show="show">
                <x-table :cell-bordered="false" style="background-color:#fff;table-layout:fixed;">
                    <thead>
                        <tr>
                            <th width="15%">序号</th>
                            <th>材料名称</th>
                            <th>开累数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list,index) in detail" :key="index">
                            <td v-text="index+1"></td>
                            <td v-text="list.InfoName"></td>
                            <td v-text="list.CurrStoreQuantity"></td>
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
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import api from '../../fetch/api'
import BScroll from 'better-scroll'
import { XSwitch, Flexbox, FlexboxItem, Calendar, XTable, XDialog, XButton, LoadMore } from 'vux'


export default {
    components: {
        XSwitch, Flexbox, FlexboxItem, Calendar, XTable, XDialog, XButton, LoadMore
    },
    data() {
        return {
            switchType: false,
            typeArr: ['pie', 'histogram', 'line'],
            index: 0,
            weeksList: ['日', '一', '二', '三', '四', '五', '六 '],
            detail: [],
            show: true,
            startTime: 'TODAY',
            chartSettings: {
                dimension: ['类型'], //默认columns第一项为维度
                metrics: ['净重'], //默认columns第二项为指标
                yAxisType: ['KMB'],
                yAxisName: ['净重'],
                area: true,
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
        _initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.wrapper, {})
            } else {
                this.scroll.refresh();
            }
        },
        changeType: function () {
            this.index++
            if (this.index >= this.typeArr.length) { this.index = 0 }
            this.chartSettings = { type: this.typeArr[this.index], area: true }
        },
        onItemClick() {
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
            let params = { 'ProjectID': _this.getUserData.DeptNodebh, 'BeginDate': _this.startTime }
            api.ConcreteMaterialStore(params).then(response => {
                let data = response.data.table
                for (var i = 0; i < data.length; i++) {
                    var obj = {
                        '类型': data[i].InfoName,
                        '净重': data[i].CurrStoreQuantity
                    }
                    _this.chartData.rows.push(obj)
                    _this.detail.push({
                        InfoName: data[i].InfoName,
                        CurrStoreQuantity: data[i].CurrStoreQuantity
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
            if (val !== 'TODAY') {
                _this._initEchart()
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.wrappers {
    position: fixed;
    z-index: 1;
    top: 90px;
    bottom: 50px;
    left: 0;
    width: 100%;
    overflow: hidden;
}
</style>