<!-- src/components/RelevantBackgroundInfo.vue -->
<template>
  <div class="relevant-info">
    <h3>Relevant Background Info</h3>
    <p v-if="!info.length">No info retrieved yet.</p>
    <ul v-else>
      <li v-for="(item, index) in info" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RelevantBackgroundInfo',
  props: {
    info: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.relevant-info {
  margin-top: 1rem;
  border: 1px solid var(--border-color);
  background-color: #fff; /* White for contrast against var(--bg-color) */
  color: var(--text-color);
  padding: 0.5rem;
  border-radius: 4px;
  transition: box-shadow 0.2s ease-in-out;
}
.relevant-info:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
