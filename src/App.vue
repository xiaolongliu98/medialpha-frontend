<template>
   <div id="div-outer">
      <div id="div-inner">
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
#div-outer {
   margin: -8px;
   display: grid;
   place-items: center;
}

#div-inner {
   width: 1280px;
   /*width: 100%;*/
   /*outline: 1px skyblue solid;*/
}
body {
   background-color: #21252b;
}
</style>
