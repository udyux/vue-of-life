<template>
  <main class="layout">
    <TopBar />
    <GameGrid />
  </main>

  <div id="modals" />
</template>

<script setup lang="ts">
import { TopBar } from '@/components/layout';
import { GameGrid } from '@/components/grids';
</script>
