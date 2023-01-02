<template>
  <div class="home">
    <!-- 轮播图 -->
    <Carousel arrows autoplay :after-change="onChange">
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
          <LeftCircleOutlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <RightCircleOutlined />
        </div>
      </template>
      <template v-for="item in data.page.data.blocks" :key="item.id">
        <div class="carousel-inner relative">
          <div class="carousel-item">
            <img
              class="max-w-screen object-cover max-h-500px"
              :src="`${strapiURL + item.image.data.url}`"
              alt="..."
            />
          </div>

          <div class="carousel-intros absolute pl-24">
            <div class="lg:text-6xl text-5xl mb-4 text-zinc-900">
              {{ item.title }}
            </div>
            <div class="mb-8 px-2 leading-relaxed text-zinc-500">
              {{ item.subTitle }}
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import { pageData as pageDataQuery } from "../graphql/page";
import { Carousel } from "ant-design-vue";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
import { removeAttrsAndId, removeTime } from "@/utils";
const {
  public: { strapiURL },
} = useRuntimeConfig();

// type CharactersResults = {
//   characters: {
//     results: {
//       id: string;
//       name: string;
//       image: string;
//       status: string;
//       species: string;
//       location: {
//         name: string;
//       };
//     }[];
//   };
// };

const { data: pageData } = await useAsyncQuery(pageDataQuery);
const data = removeAttrsAndId(removeTime(pageData.value));

const onChange = (current: number) => {
  console.log(current);
};
</script>

<style scoped>
.carousel-item {
  width: 100vw;
  background: no-repeat center center scroll;
  min-height: 300px;
  max-height: 100vh;
  overflow: hidden;
}
.carousel-item img {
  width: 100%;
}
.carousel-intros {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
