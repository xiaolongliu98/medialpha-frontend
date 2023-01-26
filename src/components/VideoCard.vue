<template>
   <el-card class="card">
      <el-image :src="coverURL" class="image"/>
      <div class="title" ref="title">
         {{video.Name}}
      </div>
      <div class="info" style="margin-top: 10px">
         时长：{{formatTime.hour}}:{{formatTime.minute}}:{{formatTime.second}}
      </div>
      <div class="info">
         尺寸：{{video.Width}}×{{video.Height}}
      </div>
      <div class="info">
         大小：{{formatSize}}
      </div>
      <div class="info" v-if="video.LastViewTime !== 0">
         观看：{{new Date(video.LastViewTime).toLocaleDateString()}}
      </div>
   </el-card>

</template>

<script>

import {baseURL} from "@/api/request";
// eslint-disable-next-line no-unused-vars
import {formatSize, parseSeconds} from "@/utils";

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

         formatTime: parseSeconds(this.video.Duration),
         formatSize: formatSize(this.video.Size),
      }
   },
   mounted() {
   },
   methods: {
   },
   computed: {
      coverURL() {
         return `${baseURL}/cover?id=${this.video.ID}`
      },
   }
}
</script>

<style scoped>
.card {
   /*outline: 1px grey solid;*/
   width: 280px;
   border: 0px;
   background-color: #373c44;
   cursor: pointer;
}
.image {
   width: 100%;
   background-color: #333333;
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