<template>
    <div class="sidebar" :id="theme">
        <div class="sidebar-list">
            <div class="sidebar-head">推荐</div>
            <ul>
                <li>
                    <i class="v-icon-fontyinyue" >发现音乐</i>
                </li>
                <li>
                    <i class="v-icon-fontFM1" >私人FM</i>
                </li>
                <li>
                    <i class="v-icon-fontshipin" >视频</i>
                </li>
                <li>
                    <i class="v-icon-fontpengyou" >朋友</i>
                </li>
            </ul>
            <div class="sidebar-head">我的音乐</div>
            <ul>
                <li>
                    <i class="v-icon-fontyinle" >本地音乐</i>
                </li>
                <li>
                    <i class="v-icon-fontxiazai" >下载管理</i>
                </li>
                <li>
                    <i class="v-icon-fontyunpan" >我的音乐云盘</i>
                </li>
                <li>
                    <i class="v-icon-fontFM" >我的电台</i>
                </li>
                <li>
                    <i class="v-icon-fontshoucang" >我的收藏</i>
                </li>
            </ul>
            <div class="sidebar-head">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item>
                        <template slot="title">
                            创建的歌单
                            <i class="el-icon-circle-plus" @click="addMenu"></i>
                        </template>
                        <ul>
                            <li>
                                <i class="v-icon-fontxin" >我最喜欢的音乐</i>
                            </li>
                        </ul>
                    </el-collapse-item>
                    <el-collapse-item>
                        <template slot="title">
                            收藏的歌单
                        </template>
                        <ul>
                            <li>

                            </li>
                        </ul>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <div class="preview" v-if="showMiniAudio">
            <img :src="imgUrl" class="musicImg">
            <div class="shadow" @click="$store.commit('setShowPlay', true)">
                <i class="fa fa-expand"></i>
            </div>
            <div class="info">
                <div>
                    <span class="song-name"></span>
                    <i class="v-icon-fontxin" @click=""></i>
                </div>
                <div>
                    <span class="singer"></span><i class="v-icon-fontqunzhuanfamingpian"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import storage from '@/utils/storage.js'
    import { mapGetters } from 'vuex';
    export default {
        data(){
            return{
                isToggleCreateList:false,
                activeNames:"",
                imgUrl:""
            }
        },
        computed:{
            ...mapGetters([
                'theme',
                'showMiniAudio',
            ])
        },
        created(){

        },
        mounted(){

        },
        methods:{
            handleChange(){

            },
            addMenu(){

            }
        }
    }
</script>
<style lang="scss">
    .sidebar {
        position: absolute;
        top: 4rem;
        bottom: 4rem;
        width: 20rem;
        border-right: 1px solid #e1e1e2;
        background-color: #f5f5f7;
        .sidebar-list {
            height: 90%;
            overflow: auto;
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
        }
        .sidebar-head {
            position: relative;
            padding-left: 1rem;
            height: 2.2rem;
            line-height: 2.2rem;
            font-size: 1.0rem;
            text-align: left;
            color: #898989;
            cursor: pointer;

            li {
                /*margin-left: 10rem;*/
                font-size: 1.8rem;
                &:hover {
                    color: #000;
                }
            }
            .el-collapse{
                border-top:none;
                border-bottom:none;
                .el-collapse-item__header{
                    background-color: transparent;
                    border-bottom:none;
                    position: relative;
                    .el-icon-circle-plus{
                        position: absolute;
                        right: 2rem;
                        &:hover{
                            color:#fff;
                        }
                    }
                }
                .el-collapse-item__content{
                    padding-bottom:0px;
                }
                .el-collapse-item__wrap{
                    background-color: transparent;
                    border-bottom:none;
                }
            }
        }
        ul {
            li {
                box-sizing: border-box;
                overflow-x: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                /*height: 3rem;*/
                padding-left: 2rem;
                font-size: 1.0rem;
                line-height: 3rem;
                color: #5e5e5e;
                vertical-align: middle;
                cursor: pointer;
                [class^="v-icon-font"], [class*=" v-icon-font"]{
                    font-size:16px;
                }
                i{
                    float:left;
                }
                &:hover {
                    color: #000;
                }
                .fa {
                    font-size: 1.8rem;
                    margin-right: 1rem;
                }
            }
        }
        .preview {
            position: relative;
            height: 10%;
            border-top: 1px solid #e1e1e2;
            &:hover .shadow {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .musicImg,
            .shadow {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 6.5rem;
                cursor: pointer;
            }
            .shadow {
                display: none;
                text-align: center;
                font-size: 3rem;
                color: #ddd;
                background: rgba(0, 0, 0, .3);
            }
            .info {
                display: flex;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                height: 100%;
                width: 12rem;
                flex-direction: column;
                justify-content: center;
                color: #474747;
                > div {
                    display: flex;
                    box-sizing: border-box;
                    width: 12rem;
                    padding-right: 1rem;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: space-between;
                    > span {
                        display: inline-block;
                        width: 10rem;
                        overflow-x: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        vertical-align: middle;
                        cursor: pointer;
                    }
                    .singer {
                        font-size: 1.2rem;
                    }
                    .fa {
                        color: #a8a8a8;
                        cursor: pointer;
                    }
                    .fa-heart {
                        color: #e83c3c;
                    }
                }
            }
        }
    }
</style>