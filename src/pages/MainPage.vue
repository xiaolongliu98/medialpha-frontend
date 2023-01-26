<template>
   <el-card class="card-video_list" shadow="never">

      <el-row>
         <el-col :span="18">
            <div class="title">
               视频列表
            </div>
         </el-col>
         <el-col :span="6">
            <SearchInput v-model="search.content" placeholder="搜索视频"/>
         </el-col>
      </el-row>


      <hr style="margin-left: 15px;margin-right: 15px; margin-top: 30px; margin-bottom: 40px" size="1" color="#656c71">
      <el-row>
         <el-col :span="6" v-for="v in videos" :key="v.id"
                 style="margin-bottom: 25px ;display: grid;justify-content: center">
            <VideoCard :video="v" />
         </el-col>
      </el-row>

      <el-row style="margin-top: 30px">
         <el-col style="display: flex;justify-content: center">
            <el-pagination
               background
               small
               layout="total, prev, pager, next, jumper"
               v-model:total="total"
               :page-size="pageSize"
               v-model:current-page="curPage"
               @current-change="pageChange"
            />
         </el-col>
      </el-row>

   </el-card>
</template>


<script setup>
// eslint-disable-next-line no-unused-vars
import { Search } from '@element-plus/icons-vue'
import VideoCard from "@/components/VideoCard";
import SearchInput from "@/components/SearchInput";
</script>
<script>
// eslint-disable-next-line no-unused-vars
import api from "@/api";
import {ElMessage} from "element-plus";
export default {
   name: "MainPage",
   data() {
      return {
         videos: [
            {
               BitRate: 586686,
               CodeType: "h264",
               Duration: 4703,
               FrameRate: 25,
               Height: 600,
               ID: "218833168705257472",
               LastViewTime: 0,
               Location: "D:/Videos/宋浩-线性代数",
               Name: "34.mp4",
               Size: 348504328,
               UpdateTime: 1626976634579,
               VideoSuffix: ".mp4",
               Width: 960,
            }
         ],
         total: 0,
         pageSize: 8,
         curPage: 1,

         search: {
            content: "",
         }
      }
   },
   beforeMount() {
      this.getPage()
   },
   methods: {
      pageChange(curPage) {
         this.getPage(curPage-1)
      },

      // 获取某一页, page从0开始
      async getPage(page) {
         if (page === undefined) {
            page = 0
         }
         try {
            let resp = await api.video.getVideosPage({page: page})
            if (resp.status !== 200) {
               throw new Error(resp.data.message)
            }
            this.videos = resp.data.data.videos
            this.total = resp.data.data.count
         } catch (e) {
            ElMessage.error(e.message)
         }
      },



   }
}
</script>

<style scoped>
.container-body {
   text-align: center;
   font: 24px bold;
}

.card-video_list {
   width: 100%;
   min-height: 400px;
   margin-top: 10px;
   border: 0px;
   background-color: #282c34;
}
.title {
   color: #ececec;
   font-size: 32px;
   font-weight: bold;
   margin-left: 15px;
}
</style>