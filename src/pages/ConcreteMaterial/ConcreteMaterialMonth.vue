<template>
    <div>
        <div>
            <flexbox>
<<<<<<< HEAD
                <flexbox-item :span="5">
=======
                <flexbox-item :span="4">
>>>>>>> bfcd8fc5cc749a6a74ff6e3d98f103323082c68b
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
                            <th>序号</th>
                            <th>材料名称</th>
                            <th>开累</th>
                        </tr>
                    </thead>
                    <tbody v-if="detail.length > 0">
                        <tr v-for="(list,index) in detail" :key="index">
                            <td v-text="index+1"></td>
                            <td v-text="list.InfoName"></td>
                            <td v-text="list.FactAmnt"></td>
                        </tr>
                    </tbody>
                </x-table>
            </div>
            <load-more v-show="detail.length <= 0" :show-loading="false" tip="暂无数据..." background-color="#fbf9fe" style="position:absolute;margin:150px 0 auto 59px;"></load-more>
            <ve-histogram v-if="!show" :data="chartData" :settings="chartSettings" tooltip-visible legend-visible></ve-histogram>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import api from '../../fetch/api'
import { Flexbox, FlexboxItem, XSwitch, XTable, LoadMore } from 'vux'
import TopCalendar from '../../components/top-calendar/monthCalendar.vue'
import { mapGetters } from 'vuex'
import { splitValue } from '../../tools/getDaysInMonth/index'




export default {
    components: {
        Flexbox, FlexboxItem, XSwitch, XTable, TopCalendar, LoadMore
    },
    data() {
        return {
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
            }
        }

    },
    computed: {
        ...mapGetters({
            getUserData: 'getUserData',
        }),
    },
    methods: {
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
            api.GetConcreteMaterialHZ(params).then(response => {
                let data = response.data.ds
                for (var i = 0; i < data.length; i++) {
                    var obj = {
                        '类型': data[i].InfoName,
                        '净重': data[i].FactAmnt
                    }
                    _this.chartData.rows.push(obj)
                    _this.detail.push({
                        InfoName: data[i].InfoName,
                        FactAmnt: data[i].FactAmnt
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>

</style>