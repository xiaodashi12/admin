<template>
    <div class="layout">
        <v-head></v-head>
        <a-side></a-side>
        <a-foot></a-foot>
    </div>
</template>
<script>
    import vHead from "@/components/head"
    import aSide from "@/components/aside"
    import aFoot from "@/components/foot"
    export default {
        components: {vHead,aSide,aFoot},
        name:"dashBoard",
        data(){
            return{

            }
        },
        methods:{

        },
        created(){

        },
        mounted(){

        }
    }
</script>
<style lang="scss">

</style>
