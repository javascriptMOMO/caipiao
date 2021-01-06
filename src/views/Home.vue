<template>
  <div class="home">
    <div>
        <home-page />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  name: "Home",
  components: {
    homePage: defineAsyncComponent(() => import("coms/HomePage/HomePage.vue")),
  },
};
</script>
<style scoped lang="scss">
</style>
