<template>
<div class="room">
<div class="system">
    <img src="../assets/404.png"/>
    <div class="title">
        <h2>页面走丢了...</h2>
        <h4>你好！非常抱歉，您所请求的页面不存在！</h4>
        <h4>请仔细检查您输入的网址是否正确。</h4>
    </div>	
</div>
</div>
</template>

<style>
/* body {
    line-height: 1.6;
    background: #7395ff;
} */
.cl:after,
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
}

.cl,
.clearfix {
    zoom: 1
}

.fl {
    float: left;
}

.fr {
    float: right;
}
.room{
    width: 100%;
    height: 100vh;
    background: #7395ff;
}
.system {
    width: 1100px;
    margin: 0 auto;
    text-align: center;
    padding-top: 140px;
}

.system img {
    text-align: center;
    width: 500px;
}

.title {}

.title h2 {
    color: #fff;
    font-size: 36px;
    letter-spacing: 4px;
    text-align: center;
    line-height: 120px;
}

.title h4 {
    color: #fff;
    font-size: 18px;
    /* font-weight: bold; */
    line-height: 38px;
    text-align: center;
}
</style>