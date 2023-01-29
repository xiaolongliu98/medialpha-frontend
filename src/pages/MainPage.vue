<template>
   <div class="background top-background">
      <el-button @click="handleReloadAll">ReloadAll</el-button>
      <el-button @click="handleGetReloadAllStatus">ReloadAllStatus</el-button>
   </div>

   <div style="width: 100%; height: 15px;"/>

   <div class="background top-background ">
      <el-row>
         <el-col :span="18">
            <div class="title">
               媒体库
            </div>
         </el-col>
         <el-col :span="6">
            <SearchInput
               style="margin-left: 10px"
               v-model="inputInfo.dirListContent"
               placeholder="搜索库"
               @search="handleDirListSearch"
               @clear="handleDirListInputClear"
            />
         </el-col>
      </el-row>

      <div style="width: 100%; height: 15px;"/>
      <hr style="margin-left: 15px;margin-right: 15px;" size="1" color="#656c71">
      <div style="width: 100%; height: 30px;"/>


      <LocationBreadcrumb
         v-if="dirListStateArgs.code === 0"
         :path-elems="pathElems"
         @switch="handleBreadClick"
         style="margin-left: 20px; font-size: 18px; margin-top: -15px"
      />

      <div v-if="dirListStateArgs.code === 1" class="search-data-show" style="margin-bottom: 2px">
         为您搜索到
         <span class="highlight">{{ dirListPageInfo.total }}</span>
         个"
         <span class="highlight">{{ dirListStateArgs.searchContent }}</span>
         "相关库
      </div>

      <div style="width: 100%; height: 25px"/>

      <div class="location-outer" v-if="dirListPageInfo.total">
         <div class="location-inner" @mouseenter="handleDirMouseEnter" @mouseleave="handleDirMouseLeave">
            <div v-for="loc in dirInfo.dirs" :key="loc.ID" class="location-elem">
               <LocationCard :location="loc" style="" @enter="handleDirClick"/>
            </div>
         </div>
      </div>

      <div style="width: 100%; height: 20px"/>

      <el-row v-show="showDirListPagi">
         <el-col style="display: flex;justify-content: center">
            <el-pagination
               background
               small
               layout="prev, pager, next, jumper"
               v-model:total="dirListPageInfo.total"
               :page-size="dirListPageInfo.pageSize"
               v-model:current-page="dirListPageInfo.curPage"
               @current-change="handleDirListPageChange"
            />
         </el-col>
      </el-row>
   </div>

   <div style="width: 100%; height: 15px;"/>

   <div class="background other-background">

      <el-row>
         <el-col :span="18">
            <div class="title">
               视频列表
            </div>
         </el-col>
         <el-col :span="6">
            <SearchInput
               style="margin-left: 10px"
               v-model="inputInfo.videoListContent"
               placeholder="搜索视频"
               @search="handleVideoListSearch"
               @clear="handleVideoListInputClear"
            />
         </el-col>
      </el-row>

      <div style="width: 100%; height: 15px;"/>
      <hr style="margin-left: 15px;margin-right: 15px;" size="1" color="#656c71">
      <div style="width: 100%; height: 30px;"/>

      <div class="search-data-show" v-if="videoListStateArgs.code === 1">
         以下为您找到
         <span class="highlight">
            {{ videoListPageInfo.total }}
         </span>
         条"
         <span class="highlight">
            {{ videoListStateArgs.searchContent }}
         </span>
         "的相关视频
      </div>
      <div class="search-data-show" v-if="videoListStateArgs.code === 0">
         在磁盘上找到
         <span class="highlight">
            {{ videoListPageInfo.total }}
         </span>
         条的视频
      </div>
      <div class="search-data-show" v-if="videoListStateArgs.code === 2">
         在"
         <span class="highlight">
            {{ dirInfo.path }}
         </span>
         "中有
         <span class="highlight">
            {{ videoListPageInfo.total }}
         </span>
         条视频

      </div>
      <el-row class="video-cards-outer">
         <el-col :span="6" v-for="v in videos" :key="v.ID"
                 style="margin-bottom: 40px ;display: grid;justify-content: center">
            <VideoCard :video="v"/>
         </el-col>
      </el-row>

      <div style="width: 100%; height: 40px;"/>

      <div style="display: flex;justify-content: center" v-if="showVideoListPagi">
         <el-pagination
            background
            small
            layout="prev, pager, next, jumper"
            v-model:total="videoListPageInfo.total"
            :page-size="videoListPageInfo.pageSize"
            v-model:current-page="videoListPageInfo.curPage"
            @current-change="handleVideoListPageChange"
         />
      </div>

      <div class="empty" v-if="showVideoListEmpty">
         <el-image src="defaults/no-videos.svg" style="height: 180px; "/>
      </div>

   </div>

</template>


<script setup>
// eslint-disable-next-line no-unused-vars
import {Search, ArrowRight} from '@element-plus/icons-vue'
import VideoCard from "@/components/VideoCard";
import SearchInput from "@/components/SearchInput";
import LocationCard from "@/components/LocationCard";
import LocationBreadcrumb from "@/components/LocationBreadcrumb";
</script>
<script>
// eslint-disable-next-line no-unused-vars
import deb from 'lodash'
// eslint-disable-next-line no-unused-vars
import api from "@/api";
import {ElMessage, ElMessageBox} from "element-plus";
import {PAGE_SIZE_VIDEO_LIST, PAGE_SIZE_LOCATION_LIST} from "@/consts";
import {parsePath} from "@/utils";

export default {
   name: "MainPage",
   data() {
      return {
         videos: [
            // {
            //    BitRate: 586686,
            //    CodeType: "h264",
            //    Duration: 4703,
            //    FrameRate: 25,
            //    Height: 600,
            //    ID: "218833168705257472",
            //    LastViewTime: 0,
            //    Location: "D:/Videos/宋浩-线性代数",
            //    Name: "34.mp4",
            //    Size: 348504328,
            //    UpdateTime: 1626976634579,
            //    VideoSuffix: ".mp4",
            //    Width: 960,
            // }
         ],
         videoListPageInfo: {
            total: 0,
            pageSize: PAGE_SIZE_VIDEO_LIST,
            curPage: 1,
         },
         inputInfo: {
            videoListContent: "",
            dirListContent: "",
         },
         dirInfo: {
            path: "/",
            dirs: [
               // {
               //    ID: "219531338682728448",
               //    Name: "Captures",
               //    NumFiles: 0,
               //    NumSubLocations: 0,
               //    ParentID: "219531338670145536",
               //    Location: "/Videos/Captures"
               // },
            ],
         },
         dirListPageInfo: {
            total: 0,
            pageSize: PAGE_SIZE_LOCATION_LIST,
            curPage: 1,
         },
         /**
          * video-list区域显示状态机
          * 0 - 初始页面/所有视频页面
          * 1 - 搜索结果页面
          * 2 - 媒体视频页面
          */
         videoListStateArgs: {
            code: -1,
            searchContent: "",
            prevCode: -1,
         },

         /**
          * location-list区域显示状态机
          * 0 - 初始页面/Root区域
          * 1 - 搜索结果页面
          */
         dirListStateArgs: {
            code: -1,
            searchContent: "",
            prevCode: -1,
            prevPath: "/",
         },

         wheelInCD: false,
      }
   },
   beforeMount() {
      // 获取视频列表
      this.switchVideoListState(0)
      // 获取根目录文件夹
      this.switchDirListState(0)

   },
   mounted() {
      // console.log(this.pathElems)
   },
   methods: {
      handleGetReloadAllStatus() {
         api.common.getReloadAllStatus(
         ).then((resp) => {
            if (resp.status !== 200) {
               if (resp.status !== 200) {
                  throw new Error(resp.data.message)
               }
            }
            ElMessage.success(resp.data.data.status)
         }).catch(e => {
            ElMessage.error(e.message)
         })
      },
      handleReloadAll() {
          ElMessageBox.confirm(
            '重新加载所有磁盘数据需要消耗一定时间，确认继续吗？',
            'Warning',
            {
               confirmButtonText: '继续',
               cancelButtonText: '取消',
               type: 'warning',
            }
          ).then(()=>{
             api.common.reloadAll(
             ).then((resp) => {
                if (resp.status !== 200) {
                   if (resp.status !== 200) {
                      throw new Error(resp.data.message)
                   }
                }
                ElMessage.success("正在执行中")
             }).catch(e => {
                ElMessage.error(e.message)
             })
          })

      },

      manualNextDirListPage() {
         let maxPage = Math.floor(this.dirListPageInfo.total / (this.dirListPageInfo.pageSize + 1)) + 1
         if (this.dirListPageInfo.curPage >= maxPage) {
            return
         }
         this.dirListPageInfo.curPage++
         this.handleDirListPageChange(this.dirListPageInfo.curPage)
      },
      manualPrevDirListPage() {
         if (this.dirListPageInfo.curPage <= 1) {
            return
         }
         this.dirListPageInfo.curPage--
         this.handleDirListPageChange(this.dirListPageInfo.curPage)
      },
      handleDirMouseEnter() {
         if (!this.showDirListPagi) {
            return
         }
         this.wheelInCD = false
         window.onmousewheel = document.onmousewheel = (e) => {
            if (this.wheelInCD) {
               return
            }
            this.wheelInCD = true

            if (e.wheelDelta < 0) {
               // console.log("鼠标滚轮后滚")
               this.manualNextDirListPage()
            } else if (e.wheelDelta > 0) {
               // console.log("鼠标滚轮前滚")
               this.manualPrevDirListPage()
            }
            setTimeout(() => {
               this.wheelInCD = false
            }, 200)
         }
         // pc 端直接删掉滚动条
         document.body.style.overflow = "hidden"
         // 移动端禁止 touchmove 默认事件，上下滑
         document.addEventListener("touchmove", (e) => {
            e.preventDefault()
         })
      },
      handleDirMouseLeave() {
         window.onmousewheel = document.onmousewheel = null
         document.body.style.overflow = ""
         document.removeEventListener("touchmove", (e) => {
            e.preventDefault()
         })
      },

      handleDirClick(path) {
         this.dirListPageInfo.curPage = 1
         this.dirInfo.path = path
         // this.listLocations(0, path)
         // this.switchVideoListState(2, true)
         if (this.dirListStateArgs.code === 1) {
            this.dirListStateArgs.prevPath = path
         }

         this.switchDirListState(0, true)
      },
      handleBreadClick(idx) {
         if (this.pathElems.length - 1 === idx) {
            return
         }
         let pathElemsCopy = this.pathElems.slice(1, idx + 1)
         let path = "/" + pathElemsCopy.join("/")
         this.dirInfo.path = path
         this.listDirs(0, path)

         // 回到Root，转换状态0
         if (idx === 0) {
            this.switchVideoListState(0)
         } else {
            this.switchVideoListState(2, true)
         }
      },
      handleDirListPageChange(curPage) {
         switch (this.dirListStateArgs.code) {
            case 0:
               this.listDirs(curPage - 1, this.dirInfo.path)
               break
            case 1:
               this.getDirListSearch(this.dirListStateArgs.searchContent, curPage - 1)
               break
            case 2:
               break
         }
      },

      handleVideoListInputClear() {
         console.log(this.videoListStateArgs)
         switch (this.videoListStateArgs.code) {
            case 0:
               break
            case 1:
               this.switchVideoListState(this.videoListStateArgs.prevCode)
               break
            case 2:
               break
         }
      },
      handleVideoListSearch() {
         if (this.videoListStateArgs.code === 1 && this.videoListStateArgs.searchContent === this.inputInfo.videoListContent) {
            return
         }
         if (!this.inputInfo.videoListContent) {
            return
         }
         this.switchVideoListState(1, true)
      },
      handleVideoListPageChange(curPage) {
         switch (this.videoListStateArgs.code) {
            case 0:
               this.getVideoListPage(curPage - 1)
               break
            case 1:
               this.getVideoListSearch(this.videoListStateArgs.searchContent, curPage - 1)
               break
            case 2:
               this.getVideoListByPathPage(this.dirInfo.path, curPage - 1)
               break
         }
      },

      handleDirListSearch() {
         if (this.dirListStateArgs.code === 1
            && this.dirListStateArgs.searchContent === this.inputInfo.dirListContent) {
            return
         }
         if (!this.inputInfo.dirListContent) {
            return
         }
         this.switchDirListState(1, true)
      },
      handleDirListInputClear() {
         switch (this.dirListStateArgs.code) {
            case 0:
               break
            case 1:
               // this.handleLocationMouseLeave()
               this.switchDirListState(this.dirListStateArgs.prevCode)

               break
         }

      },

      // 获取某一页, page从0开始
      async getVideoListPage(page) {
         try {
            let resp = await api.video.getPage({page: page})
            if (resp.status !== 200) {
               throw new Error(resp.data.message)
            }
            this.videos = resp.data.data.videos
            this.videoListPageInfo.total = resp.data.data.count
         } catch (e) {
            ElMessage.error(e.message)
         }
      },
      async getVideoListSearch(key, page) {
         if (page === undefined) {
            page = 0
         }
         try {
            let resp = await api.video.searchByName({key, page})
            if (resp.status !== 200) {
               throw new Error(resp.data.message)
            }

            this.videos = resp.data.data.videos
            this.videoListPageInfo.total = resp.data.data.count
         } catch (e) {
            ElMessage.error(e.message)
         }
      },
      async listDirs(page, path) {
         try {
            let resp = await api.dir.listDirs({page, path})
            if (resp.status !== 200) {
               throw new Error(resp.data.message)
            }
            this.dirInfo.dirs = resp.data.data.dirs
            this.dirListPageInfo.total = resp.data.data.count
         } catch (e) {
            ElMessage.error(e.message)
         }
      },
      async getVideoListByPathPage(path, page) {
         try {
            let resp = await api.video.getByVirtualPath({page, path})
            if (resp.status !== 200) {
               throw new Error(resp.data.message)
            }
            this.videos = resp.data.data.videos
            this.videoListPageInfo.total = resp.data.data.count
         } catch (e) {
            ElMessage.error(e.message)
         }
      },
      async getDirListSearch(key, page) {
         try {
            let resp = await api.dir.searchDirs({key, page})
            if (resp.status !== 200) {
               throw new Error(resp.data.message)
            }

            this.dirInfo.dirs = resp.data.data.dirs
            this.dirListPageInfo.total = resp.data.data.count
         } catch (e) {
            ElMessage.error(e.message)
         }
      },

      switchVideoListState(code, repeat) {
         if (code === this.videoListStateArgs.code && !repeat) {
            return false
         }

         if (code !== this.videoListStateArgs.code) {
            // 说明是第一次切换新，需要更新prevCode
            this.videoListStateArgs.prevCode = this.videoListStateArgs.code
            repeat = false
         }

         this.videoListStateArgs.code = code
         switch (code) {
            case 0: {
               this.getVideoListPage()
               break
            }
            case 1: {
               this.videoListStateArgs.searchContent = this.inputInfo.videoListContent
               this.getVideoListSearch(this.videoListStateArgs.searchContent)
               break
            }
            case 2: {
               this.getVideoListByPathPage(this.dirInfo.path, 0)
               break
            }
            default:
               return false
         }
         return true
      },
      switchDirListState(code, repeat) {
         if (code === this.dirListStateArgs.code && !repeat) {
            return false
         }

         if (code !== this.dirListStateArgs.code) {
            // 说明是第一次切换新，需要更新prevCode
            this.dirListStateArgs.prevCode = this.dirListStateArgs.code
            repeat = false
         }

         this.dirListStateArgs.code = code
         switch (code) {
            case 0: {
               if (!repeat) {
                  this.dirInfo.path = this.dirListStateArgs.prevPath
               }
               this.listDirs(0, this.dirInfo.path)
               if (this.dirInfo.path !== "/") {
                  this.switchVideoListState(2, true)
               }
               break
            }
            case 1: {
               this.dirListStateArgs.searchContent = this.inputInfo.dirListContent
               if (!repeat) {
                  this.dirListStateArgs.prevPath = this.dirInfo.path
               }
               this.getDirListSearch(this.dirListStateArgs.searchContent)
               break
            }
            default:
               return false
         }
         return true
      }

   },
   computed: {
      showVideoListPagi() {
         return this.videoListPageInfo.total > this.videoListPageInfo.pageSize
      },
      showVideoListEmpty() {
         return !this.videos || !this.videos.length
      },
      pathElems() {
         return parsePath(this.dirInfo.path)
      },
      showDirListPagi() {
         return this.dirListPageInfo.total > this.dirListPageInfo.pageSize
      },
      showDirListEmpty() {
         return !this.dirInfo.dirs || !this.dirInfo.dirs.length
      },

      DirInnerHeight() {
         if (this.dirListPageInfo.total <= this.dirListPageInfo.pageSize / 2) {
            return "190" + "px"
         }
         return "326" + "px"
      }
   },
   watch: {
      "dirListPageInfo.total": {
         // eslint-disable-next-line no-unused-vars
         handler(newVal, oldVal) {
            // console.log(newVal, oldVal)
            if (newVal === 0) {
               this.handleDirMouseLeave()
            }
         },
         immediate: true
      }
   }
}
</script>

<style scoped>

.top-background {
   border-radius: 0px 0px 5px 5px;
   max-height: 530px;
}

.background {
   width: 100%;

   border: 0px;
   background-color: #282c34;

   padding: 15px;
   padding-top: 40px;
   padding-bottom: 30px;

   position: relative;
}

.other-background {
   border-radius: 5px;
   min-height: 780px;
}

.title {
   color: #ececec;
   font-size: 32px;
   font-weight: bold;
   margin-left: 15px;
}

.search-data-show {
   margin-left: 24px;
   color: #c4c4c4;
   font-size: 16px;
   margin-top: -20px;
   margin-bottom: 20px;

   /*display: flex;*/
   /*justify-content: center;*/
}

.highlight {
   color: skyblue;
}

.video-cards-outer {
   width: 100%;
   height: 600px;
   /*outline: 1px skyblue solid;*/
}

.empty {
   position: absolute;
   top: 175px;
   left: 440px;

   display: flex;
   justify-items: center;
   justify-content: center;
   align-items: center;
   height: 600px;
}

.location-outer {
   display: flex;
   justify-content: center;
   align-items: center;

   width: 1250px;
   margin-left: 15px;
   height: v-bind(DirInnerHeight);
   position: relative;
   background-color: #21252b;

   /*outline: 1px violet solid;*/
}

.location-inner {
   /*width: 100%;*/
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: left;
   align-content: space-between;

   position: absolute;
   left: 30px;
   right: 30px;
   bottom: 30px;
   top: 30px;

   background-color: #21252b;
   /*margin-left: 15px;*/
   /*margin-right: 15px;*/

   /*outline: 1px skyblue solid;*/
}

/*.location-elem {*/
/*   flex: 1;*/
/*}*/


</style>