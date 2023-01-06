<template>
  <div>
    <!-- 客户案例 -->
    <div class="case-wrap relative">
      <div class="case-item">
        <img
          class="case-poster object-center"
          :src="`${
            strapiURL +
            data.page.data.attributes.blocks[0].graphic_intro.data.attributes
              .image.data.attributes.url
          }`"
          alt="..."
        />
      </div>

      <div class="case-intros pt-24 absolute top-0 left-0 lg:pl-24 md:pl-16">
        <h3 class="lg:text-6xl text-5xl mb-4 text-zinc-900">
          {{
            data.page.data.attributes.blocks[0].graphic_intro.data.attributes
              .title
          }}
        </h3>
        <div class="mb-8 px-2 leading-relaxed text-zinc-500">
          {{
            data.page.data.attributes.blocks[0].graphic_intro.data.attributes
              .subTitle
          }}
        </div>
      </div>
    </div>
    <!-- 案例详情 -->
    <div class="case-detail pt-12">
      <div
        class="lmt-2 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
      >
        {{ caseDetail.title }}
      </div>
      <div class="case-cards flex justify-center gap-8 pt-12 pb-40">
        <template v-for="card in caseDetail.cards" :key="card.text">
          <Card class="card-item" hoverable style="width: 300px">
            <template #cover>
              <img
                alt="example"
                :src="`${
                  strapiURL +
                  data.page.data.attributes.blocks[0].graphic_intro.data
                    .attributes.image.data.attributes.url
                }`"
              />
            </template>
            <CardMeta title="Europe Street beat">
              <template #description>{{ card.text }}</template>
            </CardMeta>
          </Card>
        </template>
      </div>
    </div>
    <!-- 我们的合作伙伴 -->
    <div class="partner">
      <div
        class="lmt-2 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
      >
        {{ partner.title }}
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-24">
          <template
            v-for="graphic_intro in partner.graphic_intros.data"
            :key="graphic_intro.id"
          >
            <div class="p-8 flex-col flex justify-center items-center">
              <img
                class="mx-auto object-cover w-80"
                alt="partner"
                :src="`${
                  strapiURL + graphic_intro.attributes.image.data.attributes.url
                }`"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { casePageData } from "../graphql/casePage";
import { Card, CardMeta } from "ant-design-vue";
import { removeAttrsAndId, removeTime } from "@/utils";
import { getSlugSeoQuery } from "../graphql/slugSeo";

const {
  public: { strapiURL },
} = useRuntimeConfig();
const { data } = await useAsyncQuery(casePageData);
console.log(
  "%c [ data ]-95",
  "font-size:13px; background:pink; color:#bf2c9f;",
  data
);

const unRefPageData = unref(data);
const {
  page: {
    data: {
      attributes: { blocks },
    },
  },
} = unRefPageData;
// const [, caseDetail, partner] = blocks;
const caseDetail = blocks[1];
const partner = blocks[2];
const route = useRoute();
const slug = route.name;

const { data: SeoData } = await useAsyncQuery(getSlugSeoQuery, {
  slug: slug || "index",
});
console.log(
  "%c [ SeoData ]-37",
  "font-size:13px; background:pink; color:#bf2c9f;",
  SeoData.value
);
const SS = removeAttrsAndId(removeTime(SeoData.value || {}))?.pages?.data[0];
const Seo = SS?.SEO || {};

console.log(
  "%c [ SeoData.value ]-49",
  "font-size:13px; background:pink; color:#bf2c9f;",
  SeoData.value?.pages?.data[0]?.attributes?.Seo?.metaTitle,
  SeoData.value?.pages?.data[0]?.attributes?.Seo?.metaDescription
);
useHead({
  title: SeoData?.value?.pages?.data[0]?.attributes?.Seo?.metaTitle || "",

  meta: [
    {
      name: "description",
      content:
        SeoData?.value?.pages?.data[0]?.attributes.Seo?.metaDescription || "",
    },
  ],
  bodyAttrs: {
    class: "test",
  },
});
</script>

<style scoped>
.case-item {
  width: 100vw;
  background: no-repeat center center scroll;
  min-height: 300px;
  max-height: 100vh;
  overflow: hidden;
}
.case-item img {
  width: 100%;
}
.case-intros {
  padding-top: 1.44rem;
  margin: 0 auto;
}
/* 案例详情 */
.case-detail {
  margin: 0 auto;
}
</style>
