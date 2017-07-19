<template>
    <div class="supplierdetail">
        <div>
            <span class="center-menu">统计明细</span>
            <x-button class="left-menu" type="primary" @click.native="toBack" text="<返回" mini></x-button>
        </div>
        <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
                <tr>
                    <th>批次号</th>
                    <th>材料名称</th>
                    <th>重量</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(list,index) in detail" :key="index">
                    <td v-text="list.BatchNo"></td>
                    <td v-text="list.InfoName"></td>
                    <td v-text="list.NetWeight"></td>
                </tr>
            </tbody>
        </x-table>
        <x-button v-if="detail.length > 0" type="primary" @click.native="toBack" text="返回"></x-button>
    </div>
</template>

<script>
import api from '../../fetch/api'
import { XTable, XButton } from 'vux'


export default {
    components: {
        XButton, XTable
    },
    data() {
        return {
            detail: []
        }
    },
    props: ['supplierInfo'],
    methods: {
        toBack() { //返回
            this.$emit('listenTochildEvent', false)
        },
        getdetail() {
            let _this = this
            let pars = { 'ProjectID': _this.supplierInfo.ProjectID, 'InfoCode': _this.supplierInfo.InfoCode, 'InfoName': _this.supplierInfo.infoName, 'InfoModel': _this.supplierInfo.InfoModel, 'InfoUnit': _this.supplierInfo.InfoUnit, 'begtime': _this.supplierInfo.begtime, 'endtime': _this.supplierInfo.endtime }
            api.GetSupplierInfoDetails(pars).then(response => {
                let data = response.data.ds
                for (var i = 0; i < data.length; i++) {
                    _this.detail.push({
                        BatchNo: data[i].BatchNo,
                        InfoName: data[i].InfoName,
                        NetWeight: data[i].NetWeight + data[i].InfoUnit,
                    })
                }
            }, erro => {
                console.log(erro)
            })
        }
    },
    mounted() {
        this.getdetail()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
@import '../../tools/styles/leftmenu.less'
</style>