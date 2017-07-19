<template>
    <div class="content">
        <span class="right-menu" v-on:click="clickMenu"></span>
        <search v-show="showScrollBox" placeholder="名称或批次号" v-model="serchstr" ref="search" @on-cancel="onCancel"></search>
        <selector direction="rtl" title="供应商:" :options="list" v-model="supplierNM" @on-change="_onChange"></selector>
        <datepicker v-model="datetime" :range="range" @input="_changeDate" title="日期:"></datepicker>
        <div class="wrapper" ref="wrapper">
            <x-table :cell-bordered="false" style="background-color:#fff;">
                <thead>
                    <tr>
                        <th>批次号</th>
                        <th>材料名称</th>
                        <th>开累</th>
                    </tr>
                </thead>
                <tbody v-if="seachlist.length > 0">
                    <tr v-for="(list,index) in seachlist" :key="index">
                        <td v-text="list.BatchNo"></td> 
                        <td v-text="list.InfoName"></td>
                        <td v-text="list.NetWeight"></td>
                    </tr>
                </tbody>
            </x-table>
        </div>
        <load-more v-show="seachlist.length === 0" :show-loading="false" tip="暂无数据..." background-color="#fbf9fe" style="position:absolute;top:280px;margin-left:70px;"></load-more>
    </div>
</template>  
<script>  
import api from '../../../fetch/api'
import { XTable, Selector, Search, LoadMore } from 'vux'
import BScroll from 'better-scroll'
import datepicker from '../../../components/CalendarRange.vue'
import { mapGetters } from 'vuex'




export default {
    components: {
        XTable, Selector, Search, datepicker, LoadMore
    },
    data() {
        return {
            begtime: '',
            endtime: '',
            range: true,
            datetime: [],
            showScrollBox: false,
            supplierNM: '',
            list: [],
            detail: [],
            showSerch: true,
            serchstr: '',
        }
    },
    computed: {
        seachlist() {  //实现过滤器
            let that = this
            if (that.serchstr === '') {
                return that.detail
            } else {
                return that.detail.filter(function (items) {
                    if (items.InfoName.toLowerCase().indexOf(that.serchstr.toLowerCase()) != -1) {
                        return items
                    } else if (items.BatchNo.toLowerCase().indexOf(that.serchstr.toLowerCase()) != -1) {
                        return items
                    }
                })
            }
        },
        ...mapGetters([
            'getUserData'
        ])
    },
    methods: {
        onCancel() {
            this.showScrollBox = false
        },
        _changeDate(val) {
            this.begtime = val[0]
            this.endtime = val[1]
            this.fetchData()
        },
        _initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.wrapper, {})
            } else {
                this.scroll.refresh();
            }
        },
        clickMenu() {
            this.showScrollBox = !this.showScrollBox
            this.$nextTick(() => {
                this.$refs.search.setFocus()
            })

        },
        _onChange(val) { //key值，改变供应商
            this.supplierNM = val
            this.fetchData()
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
        fetchData() {
            let that = this
            that.detail = []
            let params = { 'ProjectID': that.getUserData.DeptNodebh, 'SupplierNM': that.supplierNM, 'begtime': that.begtime, 'endtime': that.endtime }
            api.GetWeightInfo(params).then(response => {
                let data = response.data.ds
                if (data.length) {
                    for (var i = 0; i < data.length; i++) {
                        that.detail.push({
                            BatchNo: data[i].BatchNo,
                            InfoName: data[i].InfoName,
                            NetWeight: data[i].NetWeight + data[i].InfoUnit,
                            InfoModel: data[i].InfoModel
                        })
                    }
                    that.$nextTick(() => {
                        that._initScroll();
                    })
                }
            }, erro => {
                console.log('数据加载失败!', erro)
            })
        }

    },
    created() {
        this.GetSupplier()
    },
    mounted() {
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth()
        var temp = new Date(year, month + 1, 0).getDate()
        this.begtime = `${year}-${('0' + (month + 1)).slice(-2)}-${'01'}`
        this.endtime = `${year}-${('0' + (month + 1)).slice(-2)}-${temp}`
        this.datetime = [this.begtime, this.endtime]
    }
}  
</script> 

<style scoped>
@import '../../../tools/styles/leftmenu.less'
</style>   