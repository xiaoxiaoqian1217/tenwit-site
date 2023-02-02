<template>
  <div>
    <Header :siteHeader="siteHeader"></Header>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { twGlobalQurey } from "../graphql/twGlobal";
import { getSlugSeoQuery } from "../graphql/slugSeo";
const {
  public: { strapiURL },
} = useRuntimeConfig();
const route = useRoute();
const slug = route.name;

const { data: globalData } = await useAsyncQuery(twGlobalQurey);
// 获取SEO数据
const { data: SeoData } = await useAsyncQuery(getSlugSeoQuery, {
  slug: slug || "index",
});
const data = removeAttrsAndId(removeTime(unref(globalData)));
const {
  twGlobal: {
    data: { siteHeader, footer },
  },
} = data;
const { Seo = {} } =
  (SeoData?.value &&
    removeAttrsAndId(removeTime(SeoData.value))?.pages?.data[0]) ||
  {};
useHead({
  title: Seo?.metaTitle,
  meta: [
    {
      name: "description",
      content: Seo?.metaDescription || "",
    },
    {
      name: "keywords",
      content: Seo?.keywords || "",
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
