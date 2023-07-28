<template>
  <div class="container">
  <el-timeline class="timeline">
    <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
    >
      {{ activity.content }}
      <el-button type="primary" size="large">抄送</el-button>
    </el-timeline-item>
  </el-timeline>
  </div>
</template>

<script lang="ts" setup>
import { MoreFilled } from '@element-plus/icons-vue'

const activities = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: MoreFilled,
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true,
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46',
  },
]
</script>

<style scoped>
el-timeline-item__wrapper {
  position: relative;
  padding-left: 28px;
  top: -3px;
  font-size: 24px;
}
.el-timeline {
  --el-timeline-node-size-normal: 16px;
  --el-timeline-node-size-large: 24px;
  --el-timeline-node-color: var(--el-border-color-light);
}
.el-timeline-item {
  position: relative;
  padding-bottom: 100px;
}
.timeline{
  margin-left: 5%;
  margin-top: 30px;
}
</style>
