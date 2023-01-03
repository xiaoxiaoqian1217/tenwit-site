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
const slug = route.name;

const data = removeAttrsAndId(removeTime(unref(globalData)));
const {
  twGlobal: {
    data: { siteHeader, footer },
  },
} = data;
// 获取SEO数据
const { data: SeoData } = await useAsyncQuery(getSlugSeoQuery, {
  slug: slug || "index",
});
const { Seo } = removeAttrsAndId(removeTime(unref(SeoData)))?.pages.data[0];
</script>

<style scoped></style>
