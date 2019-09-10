<template>
  <div>
    <schools />
  </div>
</template>

<script>
import Schools from "../components/Schools";
export default {
  components: {
    Schools
  },
  head() {
    return {
      title: "Vuex Pathify - Nuxt Demo / Schools Example"
    };
  },
  // fetch(context) is called by the server-side and nuxt before instantiating the component
  fetch({ store }) {
    store.commit("counter/INCREMENT");
  }
};
</script>