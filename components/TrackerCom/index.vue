<template>
  <div class="tracker-component">
    <div>tracker-component1111</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  test: any;
}>();
console.log(
  "%c [ props ]-9",
  "font-size:13px; background:pink; color:#bf2c9f;",
  props,
  props.test
);
</script>

<style scoped></style>
