<template>
   <div class="card" ref="outer"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"

   >

      <el-image src="dir7.svg" class="dir" @click="handleClick"/>
      <div class="dot-info-file" v-show="location.NumFiles!==0 || location.NumSubLocations!==0">
         {{location.NumFiles > 99 ? "99+" : location.NumFiles}}
      </div>
      <div class="dot-info-loc" v-show="location.NumSubLocations!==0">
         {{location.NumSubLocations > 99 ? "99+" : location.NumSubLocations}}
      </div>

      <el-popover
         placement="bottom"
         :offset="0"
         title=""
         :width="128"
         trigger="hover"
         :content="location.Name"
         :show-arrow="false"
         popper-style="background-color: #202124; border: 0px; color: white; text-align: center"
      >
         <template #reference>
            <div class="title">
               {{location.Name}}
            </div>
         </template>
      </el-popover>

   </div>
</template>

<script>
export default {
   name: "LocationCard",
   props: {
      location: {
         default: {
            ID: "0",
            Name: "undefined",
            NumFiles: 0,
            NumSubLocations: 0,
            ParentID: "0",
            Location: "undefined"
         }
      },
   },
   methods: {
      handleMouseEnter() {
         this.$refs.outer.style.backgroundColor = "#373c44"
      },
      handleMouseLeave() {
         this.$refs.outer.style.backgroundColor = ""
      },
      handleClick() {
         this.$emit("enter", this.location.Location)
      },

      dotInfoTopLoc() {
         if (this.location.NumFiles===0) {
            return "20px"
         }
         return "50px"
      }
   },
}
</script>

<style scoped>
.card {
   width: 130px;
   height: 130px;
   border: 0px;
   /*outline: 1px skyblue solid;*/
   /*background-color: #616370;*/
   /*padding: 10px;*/
   /*border-radius: 20px;*/

   display: grid;
   justify-content: center;
   justify-items: center;


   position: relative;
}

.dir {
   margin-top: 20px;
   width: 60px;
   height: 60px;
   cursor: pointer;
   /*outline: 1px skyblue solid;*/
}

.title {
   width: 110px;
   height: 36px;
   font-size: 14px;
   overflow: hidden;
   margin-top: 0px;
   font-weight: normal;
   color: #dadada;
   text-align: center;

   /*outline: solid 1px #42b983;*/
}
.info {
   color: #ababab;
   font-size: 12px;
   margin-top: 3px;
   text-align: center;

}
.dot-info-file {
   right: 20px;
   top: 20px;

   position: absolute;
   width: 34px;
   height: 24px;
   border-radius: 12px;

   display: flex;
   justify-items: center;
   justify-content: center;
   align-content: center;
   align-items: center;
   vertical-align: middle;

   font-size: 12px;
   font-weight: normal;
   color: #eaeaea;

   
   background-color: #3a4af6;
}
.dot-info-loc {
   position: absolute;
   width: 34px;
   height: 24px;
   border-radius: 12px;

   right: 20px;
   top: 46px;

   display: flex;
   justify-items: center;
   justify-content: center;
   align-content: center;
   align-items: center;
   vertical-align: middle;

   font-size: 12px;
   font-weight: normal;
   color: #eaeaea;


   background-color: #5c6777;
}

</style>