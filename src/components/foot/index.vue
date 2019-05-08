<template>
    <div class="music-footer" ref="footer" :id="theme">
        <audio :src="url"
               v-show="false"
               ref="audio"
               @ended="next(false)"
               @timeupdate="timeupdate"></audio>
        <div class="footer-left">
            <span class="back" @click="prev">
              <i class="v-icon-fontshangyishou"></i>
            </span>
                <span class="play-pause" @click="playOrPause">
              <i :class="isPlaying ? 'v-icon-fontbofang' : 'v-icon-fontbofang2'"></i>
            </span>
                <span class="next" @click="next(true)">
              <i class="v-icon-fontxiayishou"></i>
            </span>
        </div>
        <span class="time" style="float:left;margin-top:0.2rem;">{{curTime}}</span>
        <vfooter :value="curTimeNum"
                 :totalVal="tolTimeNum"
                 :width="width"
                 @skip="skip"
                 @move="move"></vfooter>
        <span class="time" style="margin-top:0.2rem;">{{tolTime}}</span>
        <span class="value" @click="volumeOff" style="margin-left:1.4rem;margin-top:0.2rem;"><i class="v-icon-fontweibiaoti1"
                                                  :class="{'v-icon-fontlaba': !isVolumeOff, 'v-icon-fontweibiaoti1': isVolumeOff}"></i></span>
        <vfooter
                :value="volume"
                :totalVal="1"
                :width="100"
                :style="{'margin-left': '5px'}"
                @skip="skipVolume"
                @move="moveVolume"></vfooter>
        <span class="play-state"
              @click="playStateIndex = playStateIndex === 3 ? 0 : ++playStateIndex"
        >
        <i class="el-icon-loading" :class="playState"></i>
      </span>
    </div>
</template>

<script>
    import storage from '@/utils/storage.js'
    import { mapGetters } from 'vuex';
    import vfooter from "@/components/footer"
    /**
     * A module define public footer component
     * @exports vFooter
     * @author oyh(Reusjs)
     */
    export default {
        name: 'vFooter',
        components: {
            vfooter
        },
        data() {
            return {
                url:'',
                curTime: '00:00',
                tolTime: '00:00',
                curTimeNum: 0,
                tolTimeNum: 0,
                width: 850,
                isVolumeOff: false,
                volume: 1,
            }
        },
        created() {

        },
        mounted() {

        },
        computed: {
            ...mapGetters([
                'theme',
                'isPlaying',
            ]),
            playState() {

            },
        },
        methods: {
            next(flag) {
                console.log(flag)
            },
            timeupdate() {

            },
            prev(){

            },
            playOrPause(){

            },
            skip(skipWidth) {

            },
            move(value){

            },
            volumeOff(){

            },
            moveVolume(){

            },
            skipVolume(){

            }

        },
        watch: {

        }
    }
</script>

<style lang="scss" scoped>
    .music-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        height: 4rem;
        line-height: 3.6rem;
        background-color: #f6f6f8;
        border-top: 1px solid #e4e4e4;
        .footer-left {
            display: inline-block;
            float:left;
            > span {
                display: inline-block;
                border-radius: 50%;
                background-color: #e83c3c;
                cursor: pointer;
                &:hover {
                    background-color: #d33030;
                }
                i {
                    color: #fff;
                }
            }
            .back,
            .next {
                height: 3rem;
                width: 3rem;
                margin: {
                    left: 2rem;
                    right: 2rem;
                }
                line-height: 3rem;
                text-align: center;
            }
            .back {
                margin-left: 3rem;
            }
            .next {
                margin-right: 3rem;
            }
            .play-pause {
                height: 3.5rem;
                width: 3.5rem;
                line-height: 3.5rem;
                text-align: center;
                .fa-play {
                    margin-left: 2px;
                    font-size: 1.8rem;
                    vertical-align: middle;
                }
            }
        }
    }
</style>