<template>
  <header class="py-10">
    <Container>
      <nav class="relative z-50 flex justify-between">
        <div class="flex items-center md:gap-x-12">
          <NuxtLink to="/" aria-label="Home">
            <Logo class="h-10 w-auto" />
          </NuxtLink>
          <div class="hidden md:flex md:gap-x-6">
            <div
              v-for="navigation in siteHeader.navigations.data"
              :key="navigation.href"
            >
              <NuxtLink :to="navigation.href" :target="navigation.target"
                >{{ navigation.label }}
              </NuxtLink>
            </div>
            <!-- <NuxtLink to="/">首页</NuxtLink>
            <NuxtLink to="/customer-case">Testimonials</NuxtLink>
            <NuxtLink to="/solutio/customer">Pricing</NuxtLink>
            -->
          </div>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8">
          <div class="hidden md:block">
            <NuxtLink to="/login">Sign in</NuxtLink>
          </div>
          <Button href="/register" color="blue">
            <span>
              Get started <span class="hidden lg:inline">today</span>
            </span>
          </Button>
          <div class="-mr-1 md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </nav>
    </Container>
  </header>
</template>

<script setup lang="ts">
import Container from "../Container";
import Button from "../Button";
import Logo from "../Logo";
import MobileNavigation from "./MobileNavigation";
import { defineProps } from "#imports";

const props = defineProps({
  siteHeader: Array[Object],
});
</script>

<style scoped></style>
