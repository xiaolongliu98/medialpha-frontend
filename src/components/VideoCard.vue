<template>
   <div class="card">
      <div @click="handleClick">
         <el-image :src="coverURL" class="image"/>
      </div>

      <el-popover
         placement="bottom"
         :offset="-35"
         title=""
         :width="256"
         trigger="hover"
         :content="video.Name"
         :show-arrow="false"
         popper-style="background-color: #21252b; border: 0px; color: white"
      >
         <template #reference>
            <div class="title" ref="title">
               {{ video.Name }}
            </div>
         </template>
      </el-popover>

      <div style="position: absolute; bottom: 8px">
         <div class="info" style="margin-top: 10px">
            时长：{{ formatDuration.hour }}:{{ formatDuration.minute }}:{{ formatDuration.second }}
         </div>
         <div class="info">
            尺寸：{{ video.Width }}×{{ video.Height }}
         </div>
         <div class="info">
            大小：{{ formatSize }}
         </div>
         <div class="info">
            观看：{{ formatTime }}
         </div>
      </div>

   </div>

</template>

<script>

import {baseURL} from "@/api/request";
// eslint-disable-next-line no-unused-vars
import {formatSize, parseSeconds} from "@/utils";
// eslint-disable-next-line no-unused-vars
import {Base64} from "js-base64";

export default {
   name: "VideoCard",
   props: {
      video: {
         default: () => {
            return {
               BitRate: 0,
               CodeType: "undefined",
               Duration: 0,
               FrameRate: 0,
               Height: 0,
               ID: "",
               LastViewTime: 0,
               Location: "",
               Name: "undefined",
               Size: 0,
               UpdateTime: 0,
               VideoSuffix: "undefined",
               Width: 0,
            }
         },
      },
   },
   data() {
      return {}
   },
   mounted() {
   },
   methods: {
      handleClick() {
         let newPage = this.$router.resolve({
            path: "/video/" + this.video.ID,
            query:{
            }
         })
         window.open(newPage.href, '_blank');

         // this.$router.push()
      },
   },
   computed: {
      coverURL() {
         if (!this.video.ID || !this.video.ID.length) {
            return ""
         }
         let name = Base64.encode(this.video.Name)
         let loc = Base64.encode(this.video.Location)
         // let name = this.video.Name
         // let loc = this.video.Location
         return `${baseURL}/common/cover?name=${name}&location=${loc}`
      },
      formatSize() {
         return formatSize(this.video.Size)
      },
      formatDuration() {
         return parseSeconds(this.video.Duration)
      },
      formatTime() {
         let res = ""
         let timeLast = new Date(this.video.LastViewTime)
         let timeNow = new Date(Date.now())

         if (this.video.LastViewTime === 0) {
            return " - "
         }

         if (timeNow.getTime() - this.video.LastViewTime <= 1000*60) {
            return "刚刚"
         }

         if (timeLast.getDay() === timeNow.getDay()) {
            res = "今天 "
         } else if (timeLast.getDay() + 1 === timeNow.getDay()) {
            res = "昨天 "
         } else {
            res = timeLast.toLocaleDateString() + " "
         }
         res += timeLast.toLocaleTimeString()
         return res.substring(0, res.length-3)
      },
   }
}
</script>

<style scoped>
.card {
   /*outline: 1px grey solid;*/
   height: 268px;
   width: 256px;
   border: 0px;
   background-color: #373c44;
   padding: 8px;
   border-radius: 5px;

   position: relative;
}

.image {
   width: 256px;
   height: 144px;
   background-color: #333333;
   cursor: pointer;
}

.title {
   width: 100%;
   height: 36px;
   font-size: 14px;
   overflow: hidden;
   margin-top: 4px;
   font-weight: normal;
   color: #c9c9c9;
   /*outline: solid 1px #42b983;*/
}

.info {
   color: #ababab;
   font-size: 12px;
   margin-top: 3px;
   text-align: left;
}
</style>