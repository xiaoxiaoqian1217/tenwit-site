<template>
  <div>
    <!-- 动态获取SEO数据 -->
    <Head>
      <Title>{{ Seo.metaTitle }}</Title>
      <Meta name="description" :content="Seo.metaDescription" />
      <Meta name="keywords" :content="Seo.keywords" />
    </Head>
    <Header :siteHeader="siteHeader"></Header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import { twGlobalQurey } from "../graphql/twGlobal";
import { getSlugSeoQuery } from "../graphql/slugSeo";
import { Card, CardMeta } from "ant-design-vue";

const {
  public: { strapiURL },
} = useRuntimeConfig();
const { data: globalData } = await useAsyncQuery(twGlobalQurey);
const route = useRoute();
const slug = route.params.slug;
const data = removeAttrsAndId(removeTime(unref(globalData)));
const {
  twGlobal: {
    data: { siteHeader, footer },
  },
} = data;
// 获取SEO数据
const { data: SeoData } = await useAsyncQuery(getSlugSeoQuery, {
  slug: slug ? slug : "home",
});
const { Seo } = removeAttrsAndId(removeTime(unref(SeoData)))?.pages.data[0];

console.log(
  "%c [ SeoData ]-28",
  "font-size:13px; background:pink; color:#bf2c9f;",
  Seo,
  SeoData
);

// const {
//   global: {
//     data: {
//       attributes: { siteHeader, footer, icpNumber },
//     },
//   },
// } = unRefGlobalData;

// console.log(
//   "%c [ footer ]-22",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   siteHeader,
//   footer,
//   icpNumber
// );
</script>

<style scoped></style>
