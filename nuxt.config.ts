// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
const env = require("dotenv").config();

export default defineNuxtConfig({
  modules: ["nuxt-windicss", "@nuxtjs/apollo"],
  vite: {
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: "less",
            resolveIcons: true,
          }),
        ],
      }),
    ],

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // https://www.antdv.com/docs/vue/customize-theme/#Ant-Design-Vue-Less-variables
        },
      },
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint:
          "http://danyanpi.site:1337/graphql" ||
          "http://127.0.0.1:1337/graphql",
      },
    },
  },
  runtimeConfig: {
    public: {
      strapiURL: "http://danyanpi.site:1337" || "http://127.0.0.1:1337",
    },
  },
  css: [
    // windi preflight
    // "virtual:windi-base.css",
    // your stylesheets which overrides the preflight
    "~/assets/global.less",
    // windi extras
    // "virtual:windi-components.css",
    // "virtual:windi-utilities.css",
  ],
});
