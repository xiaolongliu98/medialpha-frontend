<template>
   <div class="background">
      <div class="top">
         {{videoInfo.Name}}
      </div>
      <div class="return_btn" @click="handleReturn">
         <el-icon><DArrowLeft /></el-icon>
      </div>

      <div class="player">
         <vue3-video-play
            width="1280px"
            height="800px"
            :title="videoInfo.Name"
            :src="videoURL"
            :type="videoType"
            :autoPlay="false"
         />
      </div>

      <el-row style="margin-top: 20px">
         <el-col>

            <VideoCardHorizontal :video="videoInfo" style="margin-left: 20px"/>

         </el-col>
      </el-row>
   </div>

</template>


<script setup>
import VideoCardHorizontal from '@/components/VideoCardHorizontal'
import { DArrowLeft } from '@element-plus/icons-vue'
// import vueMiniPlayer from 'vue-mini-player'
</script>

<script>

import {baseURL} from "@/api/request";
import api from "@/api";
import {ElMessage} from "element-plus";

export default {
   name: "VideoPage",
   data() {
      return {
         videoInfo: {
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
            VideoSuffix: ".mp4",
            Width: 0,
         },

      }
   },
   methods: {
      async getVideo() {
         let resp = await api.video.get({id: this.id})
         try {
            if (resp.status !== 200) {
               throw new Error(resp.data.message)
            }
            this.videoInfo = resp.data.data
         } catch (e) {
            ElMessage.error(e.message)
         }
      },

      handleReturn() {
         this.$router.go(-1)
      },

   },
   beforeMount() {
      this.getVideo()
   },
   mounted() {
      console.log("@@", this.videoType)
   },
   computed: {
      id() {
         return this.$route.params.id
      },
      videoURL() {
         return `${baseURL}/video/stream?id=${this.id}`
      },
      videoType() {
         return `video/${this.videoInfo.VideoSuffix.substring(1)}`
      },
      coverURL() {
         return `${baseURL}/cover?id=${this.id}`
      },
   }

}
</script>

<style scoped>
.player {
   display: flex;
   justify-content: center;
}

.background {
   position: relative;
   width: 100%;
   min-height: 1440px;
   margin-top: 10px;
   background-color: #282c34;
   border-radius: 0px 0px 5px 5px;
}
.top {
   width: 100%;
   height: 36px;
   background-color: #000000;
   font-size: 20px;
   font-weight: bold;
   color: #bdbdbd;

   display: flex;
   justify-content: center;
   align-items: center;

   /*outline: 1px skyblue solid;*/
}
.return_btn {
   position: absolute;
   left: 15px;
   top: 0px;
   color: #bdbdbd;
   height: 36px;
   font-size: 20px;
   font-weight: bolder;

   display: flex;
   justify-content: center;
   align-items: center;

   cursor: pointer;

   /*outline: 1px skyblue solid;*/
}
</style>