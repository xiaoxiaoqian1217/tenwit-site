<template>
  <Container class="pt-20 pb-16 text-center lg:pt-32">
    <h1
      class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl"
    >
      Accounting
      <span class="relative whitespace-nowrap text-blue-600">
        <span class="relative">made simple</span>
      </span>
      for small businesses.
    </h1>
    <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
      Most bookkeeping software is accurate, but hard to use. We make the
      opposite trade-off, and hope you don’t get audited.
    </p>
    <div class="mt-10 flex justify-center gap-x-6">
      <Button href="/register">Get 6 months free</Button>
      <Button
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        variant="outline"
      >
        <span class="ml-3">Watch video</span>
      </Button>
    </div>
    <!-- 列表 -->
    <div class="mt-36 lg:mt-44">
      <p class="font-display text-base text-slate-900">
        Trusted by these six companies so far
      </p>
      <ul
        role="list"
        class="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
      >
        <li v-for="group in list" :key="item.id">
          <ul
            role="list"
            class="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
          >
            <li v-for="company in group" :key="groupItem.id" class="flex">
              <!-- 这里是否可以用nuxt 中的image 标签 -->
              <img :src="company.logo" unoptimized />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from "./Container";
import logoLaravel from "@/images/logos/laravel.svg";
import logoMirage from "@/images/logos/mirage.svg";
import logoStatamic from "@/images/logos/statamic.svg";
import logoStaticKit from "@/images/logos/statickit.svg";
import logoTransistor from "@/images/logos/transistor.svg";
import logoTuple from "@/images/logos/tuple.svg";

const list = [
  [
    { name: "Transistor", logo: logoTransistor },
    { name: "Tuple", logo: logoTuple },
    { name: "StaticKit", logo: logoStaticKit },
  ],
  [
    { name: "Mirage", logo: logoMirage },
    { name: "Laravel", logo: logoLaravel },
    { name: "Statamic", logo: logoStatamic },
  ],
];
</script>

<style scoped></style>
