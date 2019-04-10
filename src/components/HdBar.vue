<template>
  <div class="HdBar">
    <div class="lf">
        浙江ETC客户发行管理系统
    </div>
    <div class="rg">
        <el-menu class="el-menu-demo" mode="horizontal">
            <el-submenu index="2" popper-class="loginInfo">
                <template slot="title">
                  <span class="avatar">
                      <img src="../assets/b1.jpg" alt="头像" />
                      <i class="on bottom b-white"></i>
                  </span>

                </template>
                <el-menu-item-group>
                  <template slot="title">用户中心</template>
                  <el-menu-item index="1-1">你好 - {{this.operatorInfo.op_name}}</el-menu-item>
                  <el-menu-item index="1-2">
                    <span @click="handleOnLogOut">退出登录</span>
                  </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
  </div>
</template>

<script>
  import { mapGetters,mapActions } from 'vuex'
  export default {
    name:'HdBar',
    props: {},
    computed:{
      ...mapGetters([
        'operatorInfo'
      ])
    },
    created(){

    },
    methods:{
      ...mapActions([
          'FedLogOut'
      ]),
      handleOnLogOut(){
        this.FedLogOut().then(res => {
            this.$router.push({ name: 'login'});
        });
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  @import "../styles/mixin";
  .el-menu--horizontal{
    &.loginInfo{
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
  }
  .HdBar{
    @include clearfix;
    width: 100%;
    height: $header-height;
    line-height:$header-height;
    background-color: $main-color;
    .lf{
      @include f_left;
      height: $header-height;
      line-height: $header-height;
      padding-left: 16px;
      color: $second-color;
      font-size: 24px;

    }
    .rg{
      @include f_right;
      .el-submenu {
        background-color:$main-color;

        .el-submenu__title{
          height: $header-height;
          line-height: $header-height;
          &:hover{
            background-color: $main-color;
          }
        }
      }
      .avatar{
        position: relative;
        display: inline-block;
        width: 40px;
        line-height: 1;
        border-radius: 500px;
        white-space: nowrap;
        font-weight: bold;
        img{
          border-radius: 500px;
          width: 100%;
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
