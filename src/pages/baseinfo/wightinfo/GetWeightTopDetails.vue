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
                    <th>入库量</th>
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
import api from '../../../fetch/api'
import { XTable, XButton } from 'vux'


export default {
    components: {
        XButton, XTable
    },
    props: ['supplierInfo'],
    data() {
        return {
            detail: []
        }
    },
    methods: {
        toBack() { //返回
            this.$emit('listenTochildEvent', false)
        },
        getdetail() {
            let _this = this
            let pars = _this.supplierInfo
            api.GetWeightInfoTopTenDetails(pars).then(response => {
                let data = response.data.ds
                for (var i = 0; i < data.length; i++) {
                    _this.detail.push({
                        BatchNo: data[i].BatchNo,
                        InfoName: data[i].InfoName,
                        NetWeight: data[i].NetWeight + data[i].InfoUnit
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
.supplierdetail {
    margin-bottom: 53px;
}

.left-menu {
    position: absolute;
    width: 5rem;
    height: 2rem;
    margin-top: 0.25rem;
    top: 0.25rem;
    left: 0.25rem;
    font-size: 15px;
    color: #00DD77;
    background-size: 2rem;
    background-color: RGB(0, 122, 204);
}

.center-menu {
    position: absolute;
    width: 100%;
    float: right;
    text-align: center;
    height: 30px;
    line-height: 25px;
    top: 0.6rem;
    font-size: 18px;
    color: #fff;
    background-color: RGB(0, 122, 204);
}
</style>