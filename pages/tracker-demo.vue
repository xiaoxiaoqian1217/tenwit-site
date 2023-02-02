<template>
  <div>
    <TrackerWrapper
      class="click-test"
      type="clickAndSpm"
      :data="{
        event_type: 'click',
        block_desc: 'product_list_block',
        button_desc: '',
        parameters: {
          objId: '111',
        },
      }"
    >
      <div>这是埋点组件</div>
    </TrackerWrapper>
    <TrackerCom
      :data-jt-sender="
        JSON.stringify({
          type: 'clickAndSpm',
          event_type: 'click',
          button_desc: 'enter_btn',
          parameters: {},
        })
      "
      :test="test"
    >
    </TrackerCom>
    <!-- 模块曝光组件 -->
    <!-- <List></List> -->
    <!-- 隐藏元素曝光 -->
    <TrackerHide> </TrackerHide>
  </div>
</template>

<script setup lang="ts">
const test = ref("refProps");
</script>

<style></style>
