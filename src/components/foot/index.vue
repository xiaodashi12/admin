<template>
    <div class="music-footer" ref="footer" :id="theme">
        <audio autoplay controls
               :src="url"
               v-show="false"
               ref="audio"
               @ended="next(false)"
               @timeupdate="timeupdate"></audio>
        <div class="footer-left">
        <span class="back" @click="prev">
          <i class="fa fa-step-backward"></i>
        </span>
            <span class="play-pause" @click="playOrPause">
          <i class="fa" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
        </span>
            <span class="next" @click="next(true)">
          <i class="fa fa-step-forward"></i>
        </span>
        </div>
        <span class="time">{{curTime}}</span>
        <v-slider
                :value="curTimeNum"
                :totalVal="tolTimeNum"
                :width="width"
                @skip="skip"
                @move="move"></v-slider>
        <span class="time">{{tolTime}}</span>
        <span class="value" @click="volumeOff"><i class="fa fa-fw"
                                                  :class="{'fa-volume-up': !isVolumeOff, 'fa-volume-off': isVolumeOff}"></i></span>
        <v-slider
                :value="volume"
                :totalVal="1"
                :width="100"
                :style="{'margin-left': '5px'}"
                @skip="skipVolume"
                @move="moveVolume"></v-slider>
        <span class="play-state"
              @click="playStateIndex = playStateIndex === 3 ? 0 : ++playStateIndex"
        >
        <i class="fa fa-fw" :class="playState"></i>
      </span>
        <span class="list-num" @click="showDialog = !showDialog">
        <span class="list-icon"><i class="fa fa-file-text-o fa-fw"></i></span>
        {{musicList && musicList.length}}
      </span>
        <div class="list-dialog" v-if="showDialog">
            <div class="list-head">
                <span>播放列表</span>
                <span @click="showDialog = false"><i class="fa fa-close"></i></span>
            </div>
            <div class="info">
                <span>总{{musicList && musicList.length}}首</span>
                <span
                        @click="$store.commit('clear');
                    url = '';
                    $store.commit('pause');
                    $store.commit('setShowPlay', false)
                ">
            <i class="fa fa-trash-o"></i>清空
          </span>
            </div>
            <ul v-if="musicList && musicList.length !== 0">
                <li v-for="(item, index) in musicList" @dblclick="changeMusic(index)">
                    <span class="name">{{item.name}}</span>
                    <span class="singer"
                          @click="$router.push({name: 'singer', params:{id: item.singerId}});
              $store.commit('setShowPlay', false)"
                    >{{item.singer}}</span>
                    <span class="duration">{{formatDuration(~~ item.duration)}}</span>
                </li>
            </ul>
            <div class="no-song" v-else>
                <p>你还没有添加任何歌曲!</p>
                <p>去首页<span @click="$router.push({path:'/'})">发现音乐</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    import vSlider from '../slider.vue'
    import storage from '../../storage.js'
    /**
     * A module define public footer component
     * @exports vFooter
     * @author oyh(Reusjs)
     */
    export default {
        name: 'vFooter',
        components: {
            vSlider
        },
        data() {
            return {
                url: '',
                curTime: '00:00',
                tolTime: '00:00',
                curTimeNum: 0,
                tolTimeNum: 0,
                volume: 1,
                width: 950,
                //timer: {},
                isVolumeOff: false,
                saveVolume: 1,
                playStateAll: ['loop', 'loopOne', 'random', 'order'],
                playStateIndex: 0,
                showDialog: false
            }
        },
        created() {
            if (storage.getMusic() != null) {
                this.$store.commit('setMusicList', storage.getMusic())
                if (this.musicList.length < 1) return
                this.axios.get(`http://localhost:3000/music/url?id=${this.musicList[0].id}`)
                    .then(response => {
                        this.url = response.data.data[0].url
                        this.$store.commit('setPlayIndex', 0)
                    })
            } else {
                this.$store.dispatch('getInitData')
                    .then(data => this.$store.commit('setMusicList', data))
                    .then(() => {
                        this.axios.get(`http://localhost:3000/music/url?id=${this.musicList[0].id}`)
                            .then(response => {
                                this.url = response.data.data[0].url
                                this.$store.commit('setPlayIndex', 0)
                            })
                    })
            }
        },
        mounted() {
            this.$refs.audio.addEventListener('play', () => {
                this.$store.commit('play')
                this.tolTimeNum = this.$refs.audio && this.$refs.audio.duration
                this.tolTime = this.$refs.audio && this.formatTime(this.$refs.audio.duration)

                /*this.timer = setInterval(() => {
                  this.curTimeNum = this.$refs.audio && this.$refs.audio.currentTime
                  this.curTime = this.$refs.audio && this.formatTime(this.$refs.audio.currentTime)
                }, 990)*/
            }, false)

            this.$refs.audio.addEventListener('pause', () => {
                this.$store.commit('pause')
                //clearInterval(this.timer)
            })

            document.addEventListener('click', e => {
                let eles = this.$refs.footer && this.$refs.footer.getElementsByTagName('*')
                for (let i = 0, length = eles && eles.length; i < length; i++) {
                    if (e.target === eles[i] || e.target === this.$refs.footer) {
                        return
                    }
                }
                this.showDialog = false
            }, false)
            this.width = document.body.clientWidth < 1450 ? 750 : 950
        },
        computed: {
            playState() {
                let obj = {
                    loop:    'fa-rotate-right',
                    loopOne: 'fa-refresh',
                    random:  'fa-random',
                    order:   'fa-reorder'
                }
                let {[this.playStateAll[this.playStateIndex]]: bg} = obj
                return bg
            },
            musicList() {
                return this.$store.state.musicList.musicData
            },
            isPlaying() {
                return this.$store.state.isPlaying
            },
            nowPlayIndex() {
                return this.$store.state.nowPlayIndex
            },
            showMiniAudio() {
                return this.musicList.length > 0
            },
            id() {
                return this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex] && this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex].id
            },
            theme() {
                return this.$store.state.theme
            }
        },
        methods: {
            formatTime(time) {
                let second = time.toFixed() % 60
                let min = (time.toFixed() - second) / 60
                second = second > 9 ? second : `0${second}`
                min = min > 9 ? min : `0${min}`
                return `${min}:${second}`
            },
            formatDuration(time) {
                time = Math.floor(time / 1000)
                let second = time % 60
                let min = (time - second) / 60
                second = second > 9 ? second : `0${second}`
                min = min > 9 ? min : `0${min}`
                return `${min}:${second}`
            },
            timeupdate() {
                this.curTimeNum = this.$refs.audio && this.$refs.audio.currentTime
                this.curTime = this.$refs.audio && this.formatTime(this.$refs.audio.currentTime)
            },
            skip(skipWidth) {
                if (skipWidth === 0) {
                    this.$refs.audio.currentTime = 0
                    this.curTimeNum = 0
                    return
                }
                this.$refs.audio.currentTime = skipWidth / this.width * this.tolTimeNum
                this.curTimeNum = this.$refs.audio.currentTime
            },
            skipVolume(skipWidth) {
                if (skipWidth === 0) {
                    this.$refs.audio.volume = 0
                    this.volume = 0
                    this.saveVolume = 0
                    this.isVolumeOff = true
                    return
                }
                this.$refs.audio.volume = skipWidth / 100 * 1 > 0 ? skipWidth / 100 * 1 : 0
                this.volume = this.$refs.audio.volume
                this.saveVolume = this.volume
                this.isVolumeOff = false
            },
            volumeOff() {
                this.isVolumeOff = !this.isVolumeOff
                if (this.isVolumeOff) {
                    this.$refs.audio.volume = 0
                    this.volume = 0
                } else {
                    this.$refs.audio.volume = this.saveVolume
                    this.volume = this.$refs.audio.volume
                }
            },
            move(value) {
                if (value === 0) {
                    this.$refs.audio.currentTime = 0
                    this.curTimeNum = 0
                    return
                }
                this.$refs.audio.currentTime = value / this.width * this.tolTimeNum
                this.curTimeNum = this.$refs.audio.currentTime
            },
            moveVolume(value) {
                if (value === 0) {
                    this.$refs.audio.volume = 0
                    this.volume = 0
                    this.saveVolume = this.volume
                    this.isVolumeOff = true
                    return
                }
                this.$refs.audio.volume = value / 100 * 1 > 0 ? value / 100 * 1 : 0
                this.volume = this.$refs.audio.volume
                this.saveVolume = this.volume
                this.isVolumeOff = false
            },
            next(flag) {
                if (this.musicList.length === 0) return
                if (this.playStateIndex === 0) {
                    this.nowPlayIndex === this.musicList.length - 1 ? this.$store.commit('setPlayIndex', 0) : this.$store.commit('setPlayIndex', ++this.nowPlayIndex)
                    this.getURL(this.musicList[this.nowPlayIndex].id)
                    return
                }
                if (this.playStateIndex === 1) {
                    if (!flag) return this.$refs.audio.load()
                    this.nowPlayIndex === this.musicList.length - 1 ? this.$store.commit('setPlayIndex', 0) : this.$store.commit('setPlayIndex', ++this.nowPlayIndex)
                    this.getURL(this.musicList[this.nowPlayIndex].id)
                }
                if (this.playStateIndex === 2) {
                    this.$store.commit('setPlayIndex', Math.floor(Math.random() * this.musicList.length))
                    this.getURL(this.musicList[this.nowPlayIndex].id)
                    return
                }
                if (this.playStateIndex === 3) {
                    if (this.nowPlayIndex === this.musicList.length - 1 && !flag) {
                        return
                    }
                    this.nowPlayIndex === this.musicList.length - 1 ? this.$store.commit('setPlayIndex', 0) : this.$store.commit('setPlayIndex', ++this.nowPlayIndex)
                    this.getURL(this.musicList[this.nowPlayIndex].id)
                    return
                }
            },
            prev() {
                if (this.musicList.length === 0) return
                this.nowPlayIndex === 0 ? this.$store.commit('setPlayIndex', this.musicList.length - 1) : this.$store.commit('setPlayIndex', --this.nowPlayIndex)
                this.getURL(this.musicList[this.nowPlayIndex].id)
            },
            getURL(id) {
                this.axios.get(`http://localhost:3000/music/url?id=${id}`)
                    .then(res => this.url = res.data.data[0].url)
            },
            playOrPause() {
                if (this.isPlaying === true) {
                    this.$store.commit('pause')
                    this.$refs.audio.pause()
                    return
                }
                this.$store.commit('play')
                this.$refs.audio.play()
            },
            changeMusic(index) {
                this.$store.commit('setPlayIndex', index)
                this.getURL(this.musicList[this.nowPlayIndex].id)
            }
        },
        watch: {
            showMiniAudio: {
                handler(newVal) {
                    this.$store.commit('setShowMiniAudio', newVal)
                }
            },
            curTimeNum: {
                handler(newVal) {
                    this.$store.commit('setCurTimeNum', newVal)
                }
            },
            id: {
                handler(newVal) {
                    if(!newVal) return
                    this.getURL(newVal)
                }
            }
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
        height: 4.6rem;
        line-height: 4.6rem;
        background-color: #f6f6f8;
        border-top: 1px solid #e4e4e4;
        .footer-left {
            display: inline-block;
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
        .time {
            font-size: 1.2rem;
            color: #555;
        }
        .value {
            margin-left: 1.8rem;
            color: #666;
            font-size: 18px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            &:hover {
                color: #444;
            }
        }
        .play-state {
            .fa {
                font-size: 1.8rem;
                color: #666;
                vertical-align: middle;
                cursor: pointer;
                &:hover {
                    color: #444;
                }
            }
        }
        .list-icon {
            position: absolute;
            left: -1.7rem;
            top: 0;
            vertical-align: middle;
        }
        .fa-file-text-o {
            font-size: 1.8rem;
            vertical-align: middle;
            color: #686868;
        }
        .list-num {
            position: absolute;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            width: 4rem;
            height: 2rem;
            margin-left: 2rem;
            line-height: 2rem;
            text-align: center;
            font-size: 1.2rem;
            color: #686868;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: #e1e1e2;
            cursor: pointer;
            &:hover .fa-file-text-o {
                color: #4f4f4f;
            }
        }
        .list-dialog {
            position: absolute;
            right: 0;
            top: 0;
            transform: translateY(-100%);
            width: 55rem;
            height: 60rem;
            background-color: #fff;
            border: 2px solid #cac8ca;
            box-shadow: 0 0 5px #aaa;
            overflow-y: auto;
            z-index: 5;
            &::-webkit-scrollbar {
                width: 8px;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background-color: #e1e1e2;
                &:hover {
                    background-color: #cfcfd1;
                }
            }
            .list-head {
                position: relative;
                height: 4rem;
                text-align: center;
                line-height: 4rem;
                background-color: #f5f5f7;
                > span:first-child {
                    display: inline-block;
                    height: 2.5rem;
                    width: 10rem;
                    font-family: "SimSun";
                    text-align: center;
                    line-height: 2.5rem;
                    vertical-align: middle;
                    color: #fff;
                    border-radius: 4px;
                    background-color: #7c7d85;
                }
                > span:last-child {
                    position: absolute;
                    right: 2rem;
                    color: #6d6d6d;
                    cursor: pointer;
                }
            }
            .info {
                height: 2.8rem;
                font-size: 1.3rem;
                color: #7c7c7c;
                line-height: 2.8rem;
                background-color: #f9f9f9;
                .fa {
                    font-size: 1.6rem;
                }
                > span:first-child {
                    display: inline-block;
                    box-sizing: border-box;
                    width: 47rem;
                    padding-left: 5rem;
                    text-align: left;
                }
                > span:last-child {
                    display: inline-block;
                    width: 5rem;
                    text-align: left;
                }
                > span:last-child:hover {
                    cursor: pointer;
                    color: #565656;
                }
            }
            ul {
                li {
                    height: 2.8rem;
                    font-size: 1.3rem;
                    line-height: 2.8rem;
                    background-color: #fafafa;
                    cursor: pointer;
                    &:hover {
                        background-color: #ecedee;
                    }
                    .name,
                    .singer {
                        display: inline-block;
                        width: 10rem;
                        overflow-x: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        vertical-align: top;
                    }
                    .name {
                        display: inline-block;
                        box-sizing: border-box;
                        width: 35rem;
                        padding-left: 5rem;
                        text-align: left;
                    }
                    .singer {
                        display: inline-block;
                        width: 12rem;
                        text-align: left;
                    }
                    .singer,
                    .duration {
                        color: #888;
                    }
                }
                li:nth-child(even) {
                    background-color: #f5f5f7;
                    &:hover {
                        background-color: #ecedee;
                    }
                }
            }
            .no-song {
                margin-top: 20rem;
                text-align: center;
                line-height: normal;
                color: #b0b0b0;
                span {
                    cursor: pointer;
                    color: #000;
                    text-decoration: underline;
                }
            }
        }
    }
    #black {
        background-color: #222225;
        border-top: 1px solid #232327;
        .footer-left {
            >span {
                background-color: #3c3c3f;
            }
        }
        .value,
        .fa {
            &:hover {
                color: #fff;
            }
        }
        .list-num {
            color: #cacbd2;
            background-color: #2c2c2f;
        }
        .list-dialog {
            background-color: #282a2f;
            border: 2px solid #282a2f;
        }
        .list-head {
            background-color: #282a2f;
        }
        .info {
            color: #7a7a7d;
            background-color: #2d2f33;
            > span:last-child:hover {
                color: #fff;
            }
        }
        li {
            .name{
                color: #d7d8df;
            }
            background-color: #2d2f33;
            &:hover {
                .name,
                .singer,
                .duration {
                    color: #d7d8df;
                }
                background-color: #333539;
            }
        }
        li:nth-child(even) {
            background-color: #313337;
            &:hover{
                color: #d7d8df;
                background-color: #333539;
            }
        }
        .no-song {
            span {
                color: #cccdd4;
            }
        }
    }
</style>