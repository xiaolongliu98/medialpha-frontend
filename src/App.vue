<template>
      <div id="app-outer">
         <div id="app-inner">

            <router-view/>
         </div>
      </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app-outer {
   margin: -8px;
   display: grid;
   place-items: center;
}

#app-inner {
   width: 1280px;
   /*width: 100%;*/
   /*outline: 1px skyblue solid;*/
}
body {
   background-color: #21252b;
   /*overflow: hidden;*/

}

::-webkit-scrollbar{ /*滚动条整体样式*/
   width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
   height: 0px;
}
::-webkit-scrollbar-thumb{ /*滚动条里面小方块*/
   /*border-radius: 4px;*/
   background: #4692ff;
}
::-webkit-scrollbar-track{ /*滚动条里面轨道*/
   /*border-radius: 10px;*/
   background: #21252b;
}

</style>
