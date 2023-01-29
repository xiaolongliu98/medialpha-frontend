<template>

   <div class="card" ref="outer" @click="handleOuterClick">

      <div class="search-icon">
         <el-icon><Search /></el-icon>
      </div>

      <input type="text"
             ref="input"
             @focus="inputFocusIn"
             @focusout="inputFocusOut"
             @input="handleInput"
             :value="modelValue"
             :placeholder="placeholder"
             :maxlength="maxlength"
             @keydown="handleInputKeyDown"
      />

      <div class="search-button" v-if="modelValue" @click="handleSearch">
         搜索
      </div>
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
      modelValue: {type: String},
      placeholder: {type: String},
      maxlength: {type: Number, default: () => 100}
   },
   data() {
      return {
      }
   },
   methods: {
      handleOuterClick() {
         this.$refs.input.focus()
      },
      handleInputKeyDown(e) {
         if (e.key !== 'Enter') {
            return true
         }
         this.handleSearch()
         return true
      },
      handleSearch() {
         this.$emit('search')
      },
      handleInput(e) {
         let val = e.target.value
         this.$emit('update:modelValue', val)
         if (!val) {
            this.$emit('clear')
         }
      },
      inputFocusIn() {
         this.$refs.outer.style.outline = '2px solid #00aeec'
      },
      inputFocusOut() {
         try {
            this.$refs.outer.style.outline = ''
         } catch {
            // none
         }


      },
      handleClear() {
         this.$emit('update:modelValue', "")
         this.$emit('clear')
         this.$refs.input.focus()
      },
   },
}
</script>

<style scoped>
.card {
   width:295px;
   height:40px;
   border-radius: 20px;
   background-color: #373c44;
   display: grid;
   justify-content: center;

   cursor: text;
   position: relative;
}
input {
   width:75%;
   height:35px;
   background-color: #373c44;
   color: white;
   border: 0px;
   outline: none;
   margin-left: -5px;
   margin-top: 1px;

   font-size: 16px;
}
.clear {
   position: absolute;
   right: 9px;
   top: 7px;
   background-color: #616167;
   color: #d0d0d0;
   /*outline: 1px red solid;*/
   width: 26px;
   height: 26px;
   border-radius: 13px;

   display: flex;
   justify-content: center;
   align-items: center;

   cursor: pointer;
}

.search-icon {
   position: absolute;
   left: 9px;
   top: 7px;
   background-color: #373c44;
   color: #d0d0d0;
   /*outline: 1px red solid;*/
   width: 26px;
   height: 26px;
   border-radius: 13px;

   display: flex;
   justify-content: center;
   align-items: center;
}
.search-button {
   position: absolute;
   right: 40px;
   top: 7px;

   width: 52px;
   height: 26px;
   border-radius: 13px;

   color: #d0d0d0;
   font-size: 14px;
   background-color: #616167;
   /*outline: 1px red solid;*/


   display: flex;
   justify-content: center;
   align-items: center;

   cursor: pointer;
}
</style>