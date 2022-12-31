<template>
  <div>
    <Drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      v-model:visible="visible"
      :after-visible-change="afterVisibleChange"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
const visible = ref<boolean>(false);

const afterVisibleChange = (bool: boolean) => {
  console.log("visible", bool);
};

const showDrawer = () => {
  visible.value = true;
};
</script>

<style scoped></style>
