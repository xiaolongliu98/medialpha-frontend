<template>
   <div class="card">
      <div class="btn"
           :class="{active: actives[`${i}`]}"
           v-for="(e, i) in pathElems"
           :key="i"
           @mouseenter="handleMouseEnter($event, i)"
           @mouseleave="handleMouseLeave($event, i)"
           :ref="`btn${i}`"
           @click="handleBreadClick(i)"
           :style="btnUniqueStyle(i)"
      >
         <span style="padding: 30px; font-size: 16px; color: #ffffff;">
            {{ e }}
         </span>
      </div>
      <!--   ========================================================   -->
      <div :class="{active: actives[`-1`]}"
           class="btn operator"
           v-if="pathElems.length > 1"
           @mouseenter="handleMouseEnter($event, -1)"
           @mouseleave="handleMouseLeave($event, -1)"
           @click="handleBreadClick(-1)"
           :ref="`btn-1`"
           style="margin-left: 10px; border-radius: 3px 0px 0px 3px;"
      >
         <span style="padding: 20px; font-size: 16px; color: #ffffff;">
            <el-icon><Back /></el-icon>
         </span>
      </div>
      <div class="btn operator"
           :class="{active: actives[`-2`]}"
           v-if="pathElems.length > 1"
           @mouseenter="handleMouseEnter($event, -2)"
           @mouseleave="handleMouseLeave($event, -2)"
           @click="handleBreadClick(-2)"
           :ref="`btn-2`"
           style="margin-left: 1px; border-radius: 0px 3px 3px 0px;"
      >
         <span style="padding: 20px; font-size: 16px; color: #ffffff;">
            <el-icon><House /></el-icon>
         </span>
      </div>
   </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import {ArrowRight, Back, House} from '@element-plus/icons-vue'
</script>
<script>
export default {
   name: "LocationBreadcrumb",
   props: {
      pathElems: {default: ["Root"]}
   },
   data() {
      return {
         label: this.pathElems[this.pathElems.length-1],

         borderRadius: 3,
         actives: {},
      }
   },
   methods: {
      handleBreadClick(i) {
         if (i === -1) {
            i = this.pathElems.length-2
         } else if (i === -2) {
            i = 0
         }
         if (this.pathElems.length-1 <= i) {
            return
         }
         this.$emit("switch", i)
      },
      handleMouseEnter(e, i) {
         // console.log(this.pathElems.length-1, e, i)
         if (this.pathElems.length-1 <= i) {
            return
         }
         this.actives["" + i] = true
      },
      // eslint-disable-next-line no-unused-vars
      handleMouseLeave(e, i) {
         this.actives["" + i] = false
      },

      // eslint-disable-next-line no-unused-vars
      btnUniqueStyle(i) {
         let style = {
            borderRadius: "0px",
            cursor: "pointer",
         }

         if (this.pathElems.length === 1) {
            style.borderRadius = `${this.borderRadius}px`
            style.cursor = "default"
            style.backgroundColor = "#4690f7"
         } else if (i === 0) {
            //
            style.borderRadius = `?px 0px 0px ?px`.replaceAll("?", this.borderRadius)
         } else if (i === this.pathElems.length-1) {
            style.cursor = "default"
            style.borderRadius = `0px ?px ?px 0px`.replaceAll("?", this.borderRadius)
            style.backgroundColor = "#4690f7"
         }
         return style
      },
   },
   watch: {
      "pathElems.length": {
         handler() {
            this.actives["-1"] = false
            this.actives["-2"] = false
         },
         immediate: true,
      },
   }
}
</script>

<style scoped>
.card {
   width: fit-content;
   height: 50px;

   display: flex;
   justify-content: left;
   align-items: center;

   /*outline: 1px violet solid;*/
}
.btn {
   background-color: #4b576e;

   height: 36px;
   width: fit-content;
   margin-left: 1px;

   cursor: default;
   display: flex;
   justify-content: center;
   justify-items: center;
   align-items: center;
   align-content: center;

   /*outline: 1px skyblue solid;*/
}
.operator {
   cursor: pointer;
   /*border-radius: 5px;*/
   background-color: #282c34;
   /*background-color: #2e353d;*/
}

.active {
   /*outline: 1px solid #4690f7;*/
   background-color: #546581;
}

</style>