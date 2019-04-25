<template>
    <div>
        <div class="music-head" :id="theme">
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
                        <el-row>
                            <el-col :span="6">
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
                            </el-col>
                            <el-col :span="3" class="showIi">
                                <div class="pifu">
                                    <i class="v-icon-fontpifu owncloth" v-popover:popoverIndex></i>
                                    <el-popover
                                            ref="popoverIndex"
                                            placement="bottom"
                                            width="320"
                                            trigger="click" class="theme-option">
                                        <p class="theme-head">
                                            主题
                                        </p>
                                        <ul class="line-one">
                                            <li @click="$store.commit('setTheme', 'black')"><span>酷炫黑</span></li>
                                            <li @click="$store.commit('setTheme', 'red')"><span>官方红</span></li>
                                            <li @click="$store.commit('setTheme', 'pink')"><span>可爱粉</span></li>
                                        </ul>
                                        <ul class="line-two">
                                            <li @click="$store.commit('setTheme', 'blue')"><span>天际蓝</span></li>
                                            <li @click="$store.commit('setTheme', 'green')"><span>清新绿</span></li>
                                            <li @click="$store.commit('setTheme', 'gold')"><span>土豪金</span></li>
                                        </ul>
                                    </el-popover>
                                </div>
                            </el-col>
                            <el-col :span="3" class="showIi">
                                <i class="v-icon-fontyouxiang" ></i>
                            </el-col>
                            <el-col :span="3" class="showIi">
                                <i class="v-icon-fontsuoxiao" ></i>
                            </el-col>
                            <el-col :span="3" class="showIi">
                                <i class="v-icon-fontshezhi" ></i>
                            </el-col>
                            <el-col :span="2" class="showIi">
                                <i class="el-icon-minus" ></i>
                            </el-col>
                            <el-col :span="2" class="showIi">
                                <i class="v-icon-fontzuidahua" ></i>
                            </el-col>
                            <el-col :span="2" class="showIi">
                                <i class="el-icon-close" ></i>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>

        </div>
    </div>
</template>
<script>
    import storage from '@/utils/storage.js'
    import { mapGetters } from 'vuex';
    export default {
        name:"vhead",
        data(){
            return{
                popoverIndex:"popover1",
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
        watch:{
            theme(val, oldVal){
                console.log("b.c: "+val, oldVal);
                switch(val) {
                    case 'black':
                        for (var i = 0; i < 4; i++) {
                            document.getElementsByClassName("el-menu-item")[i].style.backgroundColor = "#212124"
                        }
                        break;
                    case 'red':
                        for (var j = 0; j < 4; j++) {
                            document.getElementsByClassName("el-menu-item")[j].style.backgroundColor = "#c62f2f"
                        }
                        break;
                    case 'pink':
                        for (var k = 0; k < 4; k++) {
                            document.getElementsByClassName("el-menu-item")[k].style.backgroundColor = "#f9a0c3"
                        }
                        break;
                    case 'blue':
                        for (var a = 0; a < 4; a++) {
                            document.getElementsByClassName("el-menu-item")[a].style.backgroundColor = "#40aaf8"
                        }
                        break;
                    case 'green':
                        for (var b = 0; b < 4; b++) {
                            document.getElementsByClassName("el-menu-item")[b].style.backgroundColor = "#3bba7d"
                        }
                        break;
                    case 'gold':
                        for (var c = 0; c < 4; c++) {
                            document.getElementsByClassName("el-menu-item")[c].style.backgroundColor = "#d89f55"
                        }
                        break;
                }
            }

        },
        computed: {
            ...mapGetters([
                'theme',
            ]),
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
    $netRed: #c62f2f;
    .el-menu--popup{
        min-width: 140px !important;
        padding:0px;
    }
    .el-menu--horizontal .el-menu .el-menu-item,
    .el-menu--horizontal .el-menu .el-submenu__title{
        background-color: $netRed;
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
    .el-popover{
        padding:0px;
        .theme-head {
            position: relative;
            padding-bottom: 5px;
            margin: 10px 10px 2px 15px;
            line-height: normal;
            font-size: 1.3rem;
            border-bottom: 1px solid #ccc;
            &:after {
                position: absolute;
                left: 0;
                bottom: 0;
                content: '';
                width: 2.6rem;
                height: 2px;
                background-color: #ccc;
            }
        }
        ul {
            height: 8rem;
            list-style: none;
            text-align: center;
            line-height: 8rem;
            li {
                position: relative;
                display: inline-block;
                width: 7rem;
                height: 7rem;
                vertical-align: middle;
                cursor: pointer;
                span {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    box-sizing: border-box;
                    width: 100%;
                    height: 2.5rem;
                    padding-left: 1rem;
                    font-size: 1.3rem;
                    color: #fafafa;
                    line-height: 2.5rem;
                    text-align: left;
                    background: rgba(130, 130, 130, .1);
                }
            }
        }
        .line-one {
            /*margin-top: 1rem;*/
            li:nth-of-type(1) {
                background-color: #16181c;
                &:hover {
                    box-shadow: 0 0 5px #333;
                }
            }
            li:nth-of-type(2) {
                background-color: $netRed;
                margin: {
                    left: .5rem;
                    right: .5rem;
                }
                &:hover {
                    box-shadow: 0 0 5px $netRed;
                }
            }
            li:nth-of-type(3) {
                background-color: #f9a0c3;
                &:hover {
                    box-shadow: 0 0 5px #f9a0c3;
                }
            }
        }
        .line-two {
            /*margin-bottom: 1rem;*/
            li:nth-of-type(1) {
                background-color: #40aaf8;
                &:hover {
                    box-shadow: 0 0 5px #40aaf8;
                }
            }
            li:nth-of-type(2) {
                background-color: #3bba7d;
                margin: {
                    left: .5rem;
                    right: .5rem;
                }
                &:hover {
                    box-shadow: 0 0 5px #3bba7d;
                }
            }
            li:nth-of-type(3) {
                background-color: #d89f55;
                &:hover {
                    box-shadow: 0 0 5px #d89f55;
                }
            }
        }
    }
    .music-head{
        background-color: $netRed;
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
            margin-left:-25rem;
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
            .el-menu--horizontal {
                border-bottom: none;
                &> .el-submenu{
                    float:right;
                    .el-submenu__title{
                        border-bottom: none;
                        height:5rem;
                        line-height:5rem;
                        &:hover{
                            background-color: transparent;
                        }
                    }
                }

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
        .showIi{
            i{
                &:hover{
                    color:#fff;
                    cursor: pointer;
                }
            }
            .pifu{
                .theme-option {
                    width: 32rem;

                }
            }
        }

    }

</style>