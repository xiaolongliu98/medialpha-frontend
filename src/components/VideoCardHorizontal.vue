<template>
   <div class="container">
      <el-row>
         <el-col :span="14">
            <el-image :src="coverURL" class="image" @click="handleClick" @error="handleImgError"/>
            <div class="reload" @click="handleReloadImg" v-if="showImgReloadBtn">
               <el-icon><Refresh /></el-icon>
            </div>
         </el-col>
         <el-col :span="10">

            <el-popover
               placement="bottom"
               :offset="-56"
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
               时长：{{ formatDuration.hour }}:{{ formatDuration.minute }}:{{ formatDuration.second }}
            </div>
            <div class="info">
               尺寸：{{ video.Width }}×{{ video.Height }}
            </div>
            <div class="info">
               大小：{{ formatSizeX }}
            </div>
            <div class="info">
               码率：{{ formatBitRateX }}
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
            <div class="info">
               修改时间：{{ formatTime }}
            </div>

         </el-col>
      </el-row>

   </div>

</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import {Refresh} from '@element-plus/icons-vue'
</script>

<script>

import {baseURL} from "@/api/request";
// eslint-disable-next-line no-unused-vars
import {formatBitRate, formatSize, parseSeconds} from "@/utils";
import {Base64} from "js-base64";
import api from "@/api";
import {ElMessage} from "element-plus";
import {RESP_OK} from "@/consts";

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
      return {
         showImgReloadBtn: false,
      }
   },
   mounted() {
   },
   methods: {
      handleImgError() {
         this.showImgReloadBtn = true
         // console.log("加载失败")
      },
      handleClick() {
         this.$router.push("/video/" + this.video.ID)
      },
      handleReloadImg() {
         this.showImgReloadBtn = false
         api.common.reloadCover({
            id: this.video.ID
         }).then(resp => {
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }
            this.$router.go(0)
         }).catch(e => {
           ElMessage.error(e.message)
         })
         this.showImgReloadBtn = true
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
      formatSizeX() {
         return formatSize(this.video.Size)
      },
      formatDuration() {
         return parseSeconds(this.video.Duration)
      },
      formatBitRateX() {
         return formatBitRate(this.video.BitRate)
      },
      formatTime() {
         let res = ""
         let timeLast = new Date(this.video.UpdateTime)
         let timeNow = new Date(Date.now())

         if (this.video.UpdateTime === 0) {
            return " - "
         }

         if (timeNow.getTime() - this.video.UpdateTime <= 1000*60) {
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
.container {
   width: 820px;
   height: 260px;
   /*outline: 1px skyblue solid;*/
}


.image {
   width: 462px;
   height: 260px;
   background-color: #333333;
   /*cursor: pointer;*/
   /*outline: 2px solid #ff0000;*/
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
.reload {
   position: absolute;
   left: 211px;
   top: 80px;
   width: 40px;
   height: 40px;
   /*outline: 1px violet solid;*/

   display: flex;
   justify-content: center;
   justify-items: center;
   align-items: center;

   color: #6c6c6c;
   cursor: pointer;
}
</style>