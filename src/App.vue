<template>
  <div>
    <transition name="fade">
      <app-error v-if="error" />
    </transition>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { getLocalStorageData } from '@/helpers/localStorage.helper';

export default {
  name: 'App',
  components: {
    AppError: () => import(/* webpackChunkName: "error" */ '@/components/AppError.vue'),
  },
  computed: {
    ...mapState('Error', ['error']),
  },
  async created() {
    try {
      const { user, email } = getLocalStorageData();

      if (user && email && user.expDate > Date.now()) {
        this.setUser(user);
        this.setEmail(email);
        await this.receiveSettings();
        await this.receiveStatistic();
      }
    } catch (error) {
      this.setError(error.message);
    }
  },
  methods: {
    ...mapMutations('Auth', ['setUser', 'setEmail']),
    ...mapActions('Settings', ['receiveSettings']),
    ...mapActions('Statistic', ['receiveStatistic']),
    ...mapActions('Error', ['setError']),
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
