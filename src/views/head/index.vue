<template>
    <div>
        <div class="music-head">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content">
                        <div class="yun">
                            <li class="v-icon-fontwangyiyunyinle yunTubiao"></li>
                            <span class="yunTubiaoText">网易云音乐</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content" style="position: relative">
                        <div class="inputAll">
                            <input type="text"
                                   :placeholder = "placeholder"
                                   @focus = "searchFocus"
                                   @blur = "searchBlur"
                                   @keyup.enter = "searchHandler(searchText)"
                                   v-model = "searchText">
                            <i class="el-icon-search iconseach" :class="{active: isActive}" @click="searchHandler(searchText)"></i>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8" style="">
                    <div class="grid-content">
                        <div class="login">
                            <el-menu class="el-menu-demo" mode="horizontal">
                                <el-submenu index="2" popper-class="loginInfo" >
                                    <template slot="title">
                                      <span class="avatar">
                                          <img class="b1jpg" src="@/assets/b1.jpg" alt="头像" />
                                          <i class="on bottom b-white"></i>
                                      </span>
                                        <span @click="login">登录</span>
                                    </template>
                                    <el-menu-item-group style="with:140px;">
                                        <el-menu-item index="1-1">
                                            <i class="v-icon-fontqq"></i>
                                            <span @click="handleOnLogOut('qq')">QQ登录</span>
                                        </el-menu-item>
                                        <el-menu-item index="1-2">
                                            <i class="v-icon-fontweixin"></i>
                                            <span @click="handleOnLogOut('weiXin')">微信登录</span>
                                        </el-menu-item>
                                        <el-menu-item index="1-3">
                                            <i class="v-icon-fontshouji"></i>
                                            <span @click="handleOnLogOut('phone')">手机号登录</span>
                                        </el-menu-item>
                                        <el-menu-item index="1-4">
                                            <i class="v-icon-fontweibo"></i>
                                            <span @click="handleOnLogOut('weibo')">微博登录</span>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu>
                        </div>
                    </div>
                </el-col>
            </el-row>

        </div>
    </div>
</template>
<script>
    import storage from '@/utils/storage.js'
    export default {
        name:"vhead",
        data(){
            return{
                placeholder:"搜索音乐，歌手，歌词，用户",
                searchText:"",
                isActive: false,
                user: {},
            }
        },
        methods:{
            searchFocus() {

            },
            searchBlur(){

            },
            searchHandler(searchText){

            },
            handleOnLogOut(type){

            },
            usernameHandler(num) {
                return this.user.nickname.length >= num ? `${this.user.nickname.slice(0, num - 1)}...` : this.user.nickname
            },
            login(){

            },

        },
        created(){

        },
        mounted(){
            if (storage.getUser() !== null) {
                this.user = storage.getUser()
            } else {
                storage.saveUser({
                    isLogin: false,
                    nickname: '未登录',
                    avatarUrl: ''
                })
                this.user = storage.getUser()
            }

        },
    }
</script>
<style type="text/scss" lang="scss">
    .el-menu--popup{
        min-width: 140px !important;
        padding:0px;
    }
    .el-menu--horizontal .el-menu .el-menu-item,
    .el-menu--horizontal .el-menu .el-submenu__title{
        background-color: #c62f2f;
    }
    .el-menu-item-group{
        .el-menu-item-group__title{
            padding:0px;
        }
        .el-menu-item{
            border-bottom: 1px solid #999;
            color: #bababa;
        }
    }

    .el-menu--popup-bottom-start{
        margin-top:0px;
    }
    .music-head{
        background-color: #c62f2f;
        height:5rem;
        position: relative;
        line-height: 5rem;
        width:100%;
        .yun{
            .yunTubiao{
                display: inline-block;
                color:#fff;
            }
            .yunTubiaoText{
                color:#fff;
                font-size:18px;
                font-weight: 600;
            }
        }
        .inputAll{
            height: 2rem;
            line-height: 2rem;
            width: 22rem;
            padding: {
                left: .6rem;
                right: .4rem;
            }
            display: inline-block;
            vertical-align: middle;
            background-color: #a82828;
            border-radius: 1rem;
            input{
                height: 1.5rem;
                width:17em;
                color: #fff;
                font-size:1.2rem;
                outline: none;
                border: none;
                background-color: #a82828;
                &::placeholder {
                    color: #c87676;
                }
            }
            .iconseach{
                color: #c87676;
                cursor: pointer;
                &:hover {
                    color: #fff;
                }
            }
        }
        .login{
            .el-menu{
                background-color: transparent;
                border-bottom:none;
            }
            .el-menu--horizontal>.el-submenu .el-submenu__title{
                height:5rem;
                line-height:5rem;
                &:hover{
                    background-color: transparent;
                }
            }
            .el-menu--horizontal > .el-submenu .el-submenu__title{
                border-bottom: none;
            }
            .el-menu--horizontal {
                border-bottom: none;
            }
            .loginInfo{
                .el-menu-item-group__title{
                    text-align: left;
                    color:#ccc;
                    padding:0
                }
                .el-menu-item{
                    font-size: 12px;
                    color:#666;
                    span{
                        display: inline-block;
                        color:#666;
                    }
                }

            }
            .avatar{
                position: relative;
                display: inline-block;
                width: 40px;
                white-space: nowrap;
                font-weight: bold;
                img{
                    border-radius: 50%;
                    width: 2.5rem;
                    height:2.5rem;
                }
                i{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 10px;
                    height: 10px;
                    margin: 1px;
                    border-width: 2px;
                    border-style: solid;
                    border-radius: 100%;
                    &.on{
                        background-color: #6cc788
                    }
                    &.bottom{
                        left: auto;
                        top: auto;
                        bottom: 0;
                        right: 0;
                    }
                    &.b-white{
                        border-color: #ffffff;
                    }
                }


            }

        }
    }

</style>