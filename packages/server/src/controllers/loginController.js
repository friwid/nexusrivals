import { useAuthStore } from "../stores/authStore.js";

export const useLoginController = {
  setup() {
    const { authStore } = useAuthStore();

    const username = authStore.actions.login.username;
    const password = authStore.actions.login.password;
    const isRememberMe = authStore.actions.login.isRememberMe;

    const handleLogin = () => {
      const username = this.username;
      const password = this.password;
      const isRememberMe = this.isRememberMe;

      login({ username, password, isRememberMe });
    };

    return {
      handleLogin,
    };
  },
};
