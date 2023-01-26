<template>
   <div class="container">
      <el-row>
         <el-col :span="14">
            <el-image :src="coverURL" class="image" @click="handleClick"/>
         </el-col>
         <el-col :span="10">

            <el-popover
               placement="bottom"
               :offset="-35"
               title=""
               :width="360"
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

            <div class="info" style="margin-top: 10px">
               时长：{{ formatTime.hour }}:{{ formatTime.minute }}:{{ formatTime.second }}
            </div>
            <div class="info">
               尺寸：{{ video.Width }}×{{ video.Height }}
            </div>
            <div class="info">
               大小：{{ formatSize }}
            </div>
            <div class="info">
               码率：{{ formatBitRate }}
            </div>
            <div class="info">
               帧率：{{ video.FrameRate }}
            </div>
            <div class="info">
               类型：{{ video.VideoSuffix.substring(1).toUpperCase() }}
            </div>
            <div class="info">
               编码：{{ video.CodeType }}
            </div>
            <div class="info">
               位置：{{ video.Location }}
            </div>

         </el-col>
      </el-row>

   </div>

</template>

<script>

import {baseURL} from "@/api/request";
// eslint-disable-next-line no-unused-vars
import {formatBitRate, formatSize, parseSeconds} from "@/utils";

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
         this.$router.push("/video/" + this.video.ID)
      },
   },
   computed: {
      coverURL() {
         return `${baseURL}/cover?id=${this.video.ID}`
      },
      formatSize() {
         return formatSize(this.video.Size)
      },
      formatTime() {
         return parseSeconds(this.video.Duration)
      },
      formatBitRate() {
         return formatBitRate(this.video.BitRate)
      },
   }
}
</script>

<style scoped>
.container {
   width: 820px;
   height: 260px;
   /*outline: 1px skyblue solid;*/
}


.image {
   /*width: 100%;*/
   height: 260px;
   background-color: #333333;
   /*cursor: pointer;*/
   outline: 2px solid #000000;
}

.title {
   width: 100%;
   height: 48px;
   font-size: 18px;
   overflow: hidden;
   margin-top: 4px;
   font-weight: normal;
   color: #c9c9c9;
   /*outline: solid 1px #42b983;*/
}

.info {
   color: #ababab;
   font-size: 14px;
   margin-top: 3px;
   text-align: left;
}
</style>