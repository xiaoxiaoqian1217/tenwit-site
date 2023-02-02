<template>
  <div>
    <!-- 动态获取SEO数据 -->

    <!-- <NuxtLink to="/">首页</NuxtLink>
    <NuxtLink to="/customer-case">Testimonials</NuxtLink>
    <NuxtLink to="/solutio/customer">Pricing</NuxtLink> -->
    <Header :siteHeader="siteHeader"></Header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import { twGlobalQurey } from "../graphql/twGlobal";
import { getSlugSeoQuery } from "../graphql/slugSeo";
import { Card, CardMeta } from "ant-design-vue";
import { onMounted, reactive } from "vue";

const {
  public: { strapiURL },
} = useRuntimeConfig();
const { data: globalData } = await useAsyncQuery(twGlobalQurey);
const route = useRoute();
const slug = route.name;
const { $sendTracker } = useNuxtApp();
onMounted(() => {
  $sendTracker({ data: 1 });
});
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

const SS = removeAttrsAndId(removeTime(SeoData.value))?.pages?.data[0];
const Seo = SS?.Seo || {};

useHead({
  title: Seo?.metaTitle || "",

  meta: [
    {
      name: "description",
      content: Seo?.metaDescription || "",
    },
    {
      name: "google-site-verification",
      content: "mi260azTbYkG4bYWtOljAiuXpJjFQ9NMP3LBu_zISsw",
    },
  ],
  bodyAttrs: {
    class: "test",
  },
});
</script>

<style scoped></style>
