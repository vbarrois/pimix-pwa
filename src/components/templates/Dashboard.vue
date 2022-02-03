<script setup lang="ts">
import DashboardLastAdded from '../cards/DashboardLastAdded.vue'
import DashboardMostPlayed from '../cards/DashboardMostPlayed.vue'
import DashboardMostSwipped from '../cards/DashboardMostSwipped.vue'
import DashboardLastPlayed from '../cards/DashboardLastPlayed.vue'
import DashboardLibraryStatistics from '../cards/DashboardLibraryStatistics.vue'
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-2 px-2">
    <DashboardLastAdded />
    <DashboardMostPlayed />
    <DashboardMostSwipped />
    <DashboardLastPlayed />
    <DashboardLibraryStatistics />
  </div>
</template>