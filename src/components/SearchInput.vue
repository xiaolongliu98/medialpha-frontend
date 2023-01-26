<template>

   <div class="outer" ref="outer">

      <div class="search">
         <el-icon><Search /></el-icon>
      </div>

      <input type="text"
             ref="input"
             @focus="inputFocusIn"
             @focusout="inputFocusOut"
             @input="handleInput"
             :value="modelValue"
      />

      <div class="clear" v-if="modelValue" @click="handleClear">
         <el-icon style=""><Close /></el-icon>
      </div>
   </div>

</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { Close, Search } from '@element-plus/icons-vue'
</script>
<script>
export default {
   name: "SearchInput",
   props: {
      modelValue: {type: String}
   },
   data() {
      return {
      }
   },
   methods: {
      handleInput(e) {
         this.$emit('update:modelValue', e.target.value)
      },
      inputFocusIn() {
         this.$refs.outer.style.outline = '2px solid #00aeec'
      },
      inputFocusOut() {
         this.$refs.outer.style.outline = ''
      },
      handleClear() {
         this.$emit('update:modelValue', "")
         this.$refs.input.focus()
      },
   },
}
</script>

<style scoped>
.outer {
   width:295px;
   height:40px;
   border-radius: 20px;
   background-color: #373c44;
   display: grid;
   justify-content: center;

   position: relative;
}
input {
   width:92%;
   height:35px;
   background-color: #373c44;
   color: white;
   border: 0px;
   outline: none;
   margin-left: 5px;
}
.clear {
   position: absolute;
   right: 9px;
   top: 7px;
   color: white;
   background-color: #616167;
   /*outline: 1px red solid;*/
   width: 26px;
   height: 26px;
   border-radius: 13px;

   display: flex;
   justify-content: center;
   align-items: center;

   cursor: pointer;
}

.search {
   position: absolute;
   left: 9px;
   top: 7px;
   color: white;
   background-color: #373c44;
   /*outline: 1px red solid;*/
   width: 26px;
   height: 26px;
   border-radius: 13px;

   display: flex;
   justify-content: center;
   align-items: center;
}
</style>