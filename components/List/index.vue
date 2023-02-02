<template>
  <div>
    <div @click="addData">添加 li</div>

    <ul class="demo-list">
      <template v-for="(item, idx) in dataRef" :key="idx">
        <TrackerWrapper
          class="ccc"
          type="block"
          :data="{
            event_type: 'block',
            block_desc: 'product_list_block',
            button_desc: '',
            parameters: {
              objId: 'module-block',
              idx: idx,
            },
          }"
        >
          <li class="demo-list-item">
            {{ item + idx }}
          </li>
        </TrackerWrapper>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const bigData = new Array(1000).fill("xx");
const dataRef = ref(data);
let count = 20;

const addData = () => {
  while (count > 0) {
    count--;
    const idx = 20 - count;
    dataRef.value.push(idx);
  }
};
</script>

<style>
.demo-list {
  padding: 50px;
  margin: 0 auto;
}
.demo-list-item {
  height: 200px;
}
[data-jt-block-exposure] {
  outline: solid 2px blue;
}

[data-jt-block-exposure][data-exposure-tracker-exposed] {
  outline: solid 2px green;
}
</style>
