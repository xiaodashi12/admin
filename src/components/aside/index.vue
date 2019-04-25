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
                    <el-collapse-item title="创建的歌单" name="1">
                        <ul>
                            <li>
                                <i class="v-icon-fontxin" >我最喜欢的音乐</i>
                            </li>
                        </ul>
                    </el-collapse-item>
                </el-collapse>
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
                activeNames:""

            }
        },
        computed:{
            ...mapGetters([
                'theme',
            ])
        },
        created(){

        },
        mounted(){

        },
        methods:{
            handleChange(){

            }
        }
    }
</script>
<style lang="scss">
    .sidebar {
        position: absolute;
        top: 5rem;
        bottom: 4.6rem;
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
            height: 3.2rem;
            line-height: 3.2rem;
            font-size: 1.3rem;
            text-align: left;
            color: #898989;
            cursor: pointer;
            li {
                margin-left: 10rem;
                font-size: 1.8rem;
                &:hover {
                    color: #000;
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
                font-size: 1.3rem;
                line-height: 3rem;
                color: #5e5e5e;
                vertical-align: middle;
                cursor: pointer;
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
    }
</style>