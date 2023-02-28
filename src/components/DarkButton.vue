<template>


   <div class="card"
        :class="{actives: mouseOver, 'mouse-down': mouseDown}"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
      <el-tooltip :content="tip" placement="left" :disabled="tip === ''">
         <span class="font-span" :style="`font-size: ${fontSize}px`">
            <slot></slot>
         </span>
      </el-tooltip>
   </div>
</template>

<script>
export default {
   name: "DarkButton",
   props: {
      name: {default: "按钮", type: String},
      disabled: {type: Boolean, default: false},
      tip: {type: String, default: ""},
      fontSize: {type: Number, default: 14}
   },
   data() {
      return {
         mouseOver: false,
         mouseDown: false,
      }
   },
   methods: {
      handleMouseEnter() {
         this.mouseOver = true
      },
      handleMouseLeave() {
         this.mouseOver = false
         this.mouseDown = false
      },
      handleMouseDown() {
         this.mouseDown = true
      },
      handleMouseUp() {
         this.mouseDown = false
      },
   }
}
</script>

<style scoped>
.card {
   background-color: #373c44;
   width: 50px;
   height: 50px;

   display: flex;
   justify-items: center;
   justify-content: center;
   align-content: center;
   align-items: center;

   border-radius: 10px;

   cursor: pointer;
}
.font-span {
   margin-top: -2px;
   color: white;
   font-size: 14px;
}

.actives {
   /*outline: 1px solid #4690f7;*/
   background-color: #546581;
}
.mouse-down {
   background-color: #6c80a9;
}
</style>