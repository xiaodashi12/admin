<template>
    <div class="layout">
        <etc-hdBar></etc-hdBar>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import EtcHdBar from '@/components/HdBar';

    export default{
        components:{EtcHdBar},
        data () {
            return {

            }
        }
    }
</script>
<style type="text/scss" lang="scss">
    .layout{
        position:absolute;
        top:0px;
        bottom: 0px;
        width: 100%;
    }
</style>
