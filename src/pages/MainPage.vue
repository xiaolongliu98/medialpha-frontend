<template>
   <div v-if="taskInfo.name.length">
      <el-affix :offset="0">
         <div class="background" style="padding-top: 15px; padding-bottom: 15px">
            <StatusCard :name="taskInfo.name" @stop="handleStatusStop" v-if="taskInfo.name.length"/>
         </div>
      </el-affix>
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
               :disabled="loadingInfo.dir"
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
         @refresh="handleBreadRefresh"
         @reload="handleBreadReload"
         style="margin-left: 20px; font-size: 18px; margin-top: -15px"
         :disabled="loadingInfo.dir"
      />

      <div v-if="dirListStateArgs.code === 1" class="search-data-show" style="margin-bottom: 2px">
         为您搜索到
         <span class="highlight">{{ dirListPageInfo.total }}</span>
         个"
         <span class="highlight">{{ dirListStateArgs.searchContent }}</span>
         "相关库
      </div>

      <div style="width: 100%; height: 25px"/>

      <div class="dir-outer" v-loading="loadingInfo.dir" element-loading-background="rgba(122, 122, 122, 0.8)">
         <div class="dir-inner" @mouseenter="handleDirMouseEnter" @mouseleave="handleDirMouseLeave">
            <div v-for="d in dirInfo.dirs" :key="d.ID" class="dir-item">
               <DirCard :dir="d" style="" @enter="handleDirClick"/>
            </div>
         </div>

         <div class="dir-empty" v-if="!dirListPageInfo.total">
            <el-image src="defaults/no-dirs.svg" style="height: 120px; "/>
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
               :disabled="loadingInfo.video"
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
      <el-row class="video-cards-outer" v-loading="loadingInfo.video" element-loading-background="rgba(122, 122, 122, 0.8)">
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

      <div class="video-empty" v-if="showVideoListEmpty">
         <el-image src="defaults/no-videos.svg" style="height: 180px; "/>
      </div>

   </div>

   <el-affix position="bottom" :offset="400">
      <div class="aside-btns">
         <DarkButton
            tip="编辑媒体库"
            @click="handleEditDir"
            style="margin-top: 3px"
            :font-size="20"
         >
            <el-icon><FolderAdd /></el-icon>
         </DarkButton>

         <DarkButton
            tip="重载媒体库"
            style="margin-top: 8px"
            @click="handleReloadAll"
         >
            <el-image src="恢复_重置.svg" style="width: 18px; height: 18px"></el-image>
         </DarkButton>

         <DarkButton
            @click="handleToTop"
            style="margin-top: 8px; margin-bottom: 3px"
            tip="回到顶部"
            :font-size="16"
         >
            <el-icon><ArrowUpBold /></el-icon>
         </DarkButton>

      </div>
   </el-affix>


   <el-dialog v-model="dialogInfo.dialogTableVisible" title="编辑媒体库" width="650"  >
      <el-table :data="dialogInfo.baseDirs" border>
         <el-table-column property="name" label="名称" width="150" />
         <el-table-column property="path" label="路径" width="300" />

         <el-table-column label="" fixed="right" align="center">
            <template #default="scope">
               <el-button
                  size="small"
                  type="danger"
                  @click="handleDelBaseDir(scope.$index, scope.row)"
               >
                  删除
               </el-button>
            </template>
         </el-table-column>

         <el-table-column label="" fixed="right" align="center">
            <template #default="scope">
               <el-button
                  size="small"
                  type="primary"
                  @click="handleSyncBaseDir(scope.$index, scope.row)"
               >
                  同步
               </el-button>
            </template>
         </el-table-column>
      </el-table>

      <el-row style="margin-top: 30px">
         <el-col :span="20" style="">
            输入路径&nbsp; <el-input style="width: 400px" v-model="dialogInfo.dialogTableAddContent"></el-input>
         </el-col>
         <el-col :span="4" style="display: flex; justify-content: center; margin-left: -5px">
            <el-button @click="handleAddBaseDir">添加</el-button>
         </el-col>
      </el-row>

   </el-dialog>
</template>


<script setup>
// eslint-disable-next-line no-unused-vars
import {Search, ArrowRight, ArrowUpBold, FolderAdd} from '@element-plus/icons-vue'
import VideoCard from "@/components/VideoCard";
import SearchInput from "@/components/SearchInput";
import DirCard from "@/components/DirCard";
import LocationBreadcrumb from "@/components/LocationBreadcrumb";
import StatusCard from "@/components/StatusCard";
import DarkButton from "@/components/DarkButton";
</script>
<script>
// eslint-disable-next-line no-unused-vars
import api from "@/api";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {PAGE_SIZE_VIDEO_LIST, PAGE_SIZE_LOCATION_LIST, RESP_OK} from "@/consts";
import {parsePath, toTop} from "@/utils";

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
               //    NumSubDirs: 0,
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

         loadingInfo: {
            dir: true,
            video: true,
         },

         taskInfo: {
            name: "",
         },

         dialogInfo: {
            dialogTableVisible: false,
            dialogTableAddContent: "",
            baseDirs: [
               {name: "Videos", path: "D:/Videos"},
            ],
         }
      }
   },
   beforeMount() {
      // this.loadingInfo.location = false
      // this.loadingInfo.video = false
      // 获取视频列表
      this.switchVideoListState(0)
      // 获取根目录文件夹
      this.switchDirListState(0)
   },
   mounted() {
      // console.log(this.pathElems)
      // 获取当前后端任务
      this.getCurrentTask()
   },
   methods: {
      handleSyncBaseDir(idx, row) {
         ElMessageBox.confirm(
            '在变更的文件量较大的情况下同步磁盘信息需要消耗一定时间，确认继续吗？',
            'Warning',
            {
               confirmButtonText: '继续',
               cancelButtonText: '取消',
               type: 'warning',
            }
         ).then(()=>{
            this.syncDirRecursively("/" + row.name)
            this.dialogInfo.dialogTableVisible = false
         })
      },
      handleAddBaseDir() {
         if (!this.dialogInfo.dialogTableAddContent || this.dialogInfo.dialogTableAddContent.length <= 0) {
            ElMessage.warning("路径不能为空！")
            return
         }
         api.common.addBaseDir({
            localPath: this.dialogInfo.dialogTableAddContent
         }).then((resp)=>{
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }
            this.dialogInfo.baseDirs = resp.data.data
            ElMessage.success("添加成功，请手动进行同步")
         }).catch(e=>{
            ElMessage.error(e.message)
         })
      },
      handleDelBaseDir(idx, row) {
         console.log(idx, row)
         let path = row.path
         ElMessageBox.confirm(
            `确认删除'${path}'媒体库吗？`,
            'Warning',
            {
               confirmButtonText: '确认',
               cancelButtonText: '取消',
               type: 'warning',
            }
         ).then(()=>{
            api.common.delBaseDir({
               localPath: path
            }).then((resp)=>{
               if (resp.data.code !== RESP_OK) {
                  throw new Error(resp.data.message)
               }
               this.dialogInfo.baseDirs = resp.data.data
               ElMessage.success("删除成功")
               this.handleBreadClick(0, true)
            }).catch(e=>{
               ElMessage.error(e.message)
            })
         })
      },
      handleEditDir() {
         api.common.getBaseDir(
         ).then((resp)=>{
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }
            this.dialogInfo.baseDirs = resp.data.data
         }).catch(e=>{
            ElMessage.error(e.message)
         })
         this.dialogInfo.dialogTableVisible = true
      },
      handleToTop() {
         toTop()
      },
      handleStatusStop(info) {
         console.log(info)
         if (info.ErrorStr.length) {
            //
            ElNotification({
               type: "error",
               title: `执行${info.Name}失败`,
               message: info.ErrorStr,
               duration: 1000*10,
            })
         } else if (info.Returns) {
            // numDirAdded: 0
            // numDirRemoved: 0
            // numVideoAdded: 0
            // numVideoRemoved
            let infoStr =
               ` 新增库：${info.Returns.numDirAdded}<br/>
                 删除库：${info.Returns.numDirRemoved}<br/>
                 新增视频：${info.Returns.numVideoAdded}<br/>
                 删除视频：${info.Returns.numVideoRemoved}<br/>
                 耗时：${(info.Duration / 1000).toFixed(2)}s
               `
            ElNotification({
               type: "success",
               title: `执行${info.Name}成功`,
               message: infoStr,
               duration: 1000*10,
               dangerouslyUseHTMLString: true,
            })
         }
         if (this.taskInfo.name.startsWith("SyncDir")) {
            this.handleBreadRefresh()
         }
         setTimeout(()=>{
            this.taskInfo.name = ""
         }, 3000)
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
                if (resp.data.code !== RESP_OK) {
                   throw new Error(resp.data.message)
                }
                ElMessage.success("程序启动成功...")
                this.taskInfo.name = "ReloadAll"
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
      handleBreadRefresh() {
         this.listDirs(0, this.dirInfo.path)
         // 回到Root，转换状态0
         if (this.pathElems.length <= 1) {
            this.switchVideoListState(0, true)
         } else {
            this.switchVideoListState(2, true)
         }
      },
      handleBreadReload() {
         ElMessageBox.confirm(
            '在变更的文件量较大的情况下同步磁盘信息需要消耗一定时间，确认继续吗？',
            'Warning',
            {
               confirmButtonText: '继续',
               cancelButtonText: '取消',
               type: 'warning',
            }
         ).then(()=>{
            this.syncDirRecursively(this.dirInfo.path)
         })
      },
      handleBreadClick(idx, force) {
         if (this.pathElems.length - 1 === idx && !force) {
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
         // console.log(this.videoListStateArgs)
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
         this.loadingInfo.video = true
         try {
            let resp = await api.video.getPage({page: page})
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }
            this.videos = resp.data.data.videos
            this.videoListPageInfo.total = resp.data.data.count
            this.loadingInfo.video = true
         } catch (e) {
            ElMessage.error(e.message)
         }
         this.loadingInfo.video = false
      },
      async getVideoListSearch(key, page) {
         this.loadingInfo.video = true
         if (page === undefined) {
            page = 0
         }
         try {
            let resp = await api.video.searchByName({key, page})
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }

            this.videos = resp.data.data.videos
            this.videoListPageInfo.total = resp.data.data.count
         } catch (e) {
            ElMessage.error(e.message)
         }
         this.loadingInfo.video = false
      },
      async listDirs(page, path) {
         this.loadingInfo.dir = true
         try {
            let resp = await api.dir.listDirs({page, path})
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }
            this.dirInfo.dirs = resp.data.data.dirs
            this.dirListPageInfo.total = resp.data.data.count
            this.loadingInfo.dir = true
         } catch (e) {
            ElMessage.error(e.message)
         }
         this.loadingInfo.dir = false
      },
      async getVideoListByPathPage(path, page) {
         this.loadingInfo.video = true
         try {
            let resp = await api.video.getByVirtualPath({page, path})
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }
            this.videos = resp.data.data.videos
            this.videoListPageInfo.total = resp.data.data.count
         } catch (e) {
            ElMessage.error(e.message)
         }
         this.loadingInfo.video = false
      },
      async getDirListSearch(key, page) {
         this.loadingInfo.dir = true
         try {
            let resp = await api.dir.searchDirs({key, page})
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }

            this.dirInfo.dirs = resp.data.data.dirs
            this.dirListPageInfo.total = resp.data.data.count
         } catch (e) {
            ElMessage.error(e.message)
         }
         this.loadingInfo.dir = false
      },
      async getCurrentTask() {
         try {
            let resp = await api.common.getCurrentTask({clear: "no"})
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }
            this.taskInfo.name = resp.data.data.Name
         } catch (e) {
            ElMessage.error(e.message)
         }
      },
      async syncDirRecursively(path) {
         try {
            if (!path) {
               throw new Error("path 未指定")
            }
            let resp = await api.common.syncDirRecursively({path})
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }
            this.taskInfo.name = "SyncDirRecursively"
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
               this.videoListPageInfo.curPage = 1
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
      },
   }
}
</script>

<style scoped>

.top-background {
   border-radius: 5px 5px 5px 5px;
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
   height: 620px;
   /*outline: 1px skyblue solid;*/
}

.video-empty {
   position: absolute;
   top: 175px;
   left: 440px;

   display: flex;
   justify-items: center;
   justify-content: center;
   align-items: center;
   height: 600px;
}

.dir-outer {
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

.dir-inner {
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

.aside-btns {
   background-color: #4b576e;
   border-radius: 12px;
   padding: 5px;
   width: 60px;
   height: fit-content;
   /*outline: 1px solid violet;*/
   position: absolute;
   right: -120px;

   display: flex;
   flex-direction: column;

   justify-content: left;
   align-items: center;
}

</style>