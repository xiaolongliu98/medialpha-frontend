<template>
   <div class="card">
      <el-progress
         :text-inside="true"
         :stroke-width="28"
         :percentage="percent"
         :color="customColorMethod"
         class="progress"
      >
         <span style="font-size: 16px">

            {{status.Message}}
            {{` (${status.CurrentStep}/${status.TotalSteps})`}}
            &nbsp;&nbsp;

         </span>
      </el-progress>

<!--      <div class="info">-->
<!--         <span class="highlight" >-->
<!--            {{name}}-->
<!--         </span>-->
<!--         {{title}}-->
<!--      </div>-->
   </div>
</template>

<script>

import api from "@/api";
import {RESP_OK} from "@/consts";

export default {
   name: "StatusCard",
   props: {
      name: {type: String, default: "undefined"},
   },
   data() {
      return {
         status: {
            // Name:        t.Name,
            // Message:     t.Message,
            // Duration:    int(t.Duration.Milliseconds()),
            // TotalSteps:  t.TotalSteps,
            // CurrentStep: t.CurrentStep,
            // StartTime:   int(t.StartTime.UnixMilli()),
            // Returns:     t.Returns,
            // Running:     !t.Stopped(),
            // ErrorStr: ""
         },
         defaultStatus: {
            Name: "undefined",
            Message: "undefined",
            Duration: 0,
            TotalSteps: 0,
            CurrentStep: 0,
            StartTime: 0,
            Returns: undefined,
            Running: false,
            ErrorStr: "",
         },
         title: "正在执行",
      }
   },
   mounted() {
      this.polling()
   },
   methods: {
      customColorMethod(percentage) {
         if (percentage < 30) {
            return '#909399'
         }
         if (percentage < 60) {
            return '#e6a23c'
         }
         if (percentage < 60) {
            return '#67c23a'
         }
         return '#4690f7'
      },
      async polling() {
         let running = await this.GetStatus()
         if (!running) {
            this.$emit("stop", this.status)
            return
         }
         setTimeout(this.polling, 500)
      },

      async GetStatus() {
         if (!this.name.length) return

         try {
            let resp = await api.common.getCurrentTask({clear: "yes"})
            if (resp.data.code !== RESP_OK) {
               throw new Error(resp.data.message)
            }
            this.status = resp.data.data
            if (this.status.Running) {
               return true
            } else {

               this.title = "执行结束"
               return false
            }

         } catch (e) {
            this.status = this.defaultStatus
            this.status.Message = e.message
         }
         return false
      },
   },
   computed: {
      percent() {
         if (!this.status.TotalSteps) {
            return 15
         }
         let total = this.status.TotalSteps
         let current = this.status.CurrentStep
         return Math.round(current / total * 0.85 * 100) + 15
      },
   },
}
</script>

<style scoped>
.card {
   position: relative;
   display: grid;
   justify-content: center;
   justify-items: center;
   width: 100%;
   height: 100%;

   /*outline: 1px violet solid;*/
}
.highlight {
   color: #ffffff;
}

.info {
   position: absolute;
   top: 1px;
   color: #eaeaea;
   font-size: 14px;
   margin-top: 3px;
   text-align: left;
}
.progress {
   width: 1280px;
}
</style>