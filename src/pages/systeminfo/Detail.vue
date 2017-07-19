<template>
    <div>
        <h3>{{ list.title }}</h3>
        <div v-html="list.content"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import InfiniteLoading from 'vue-infinite-loading'


export default {
    components: {
    InfiniteLoading
  },
    data() {
        return {
            list: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            let params=this.$route.params.id
            this.$http.get('https://cnodejs.org/api/v1/topic/' + params).then((response) => {
                let res = response.data
                if (res.success) {
                    this.list = res.data
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

