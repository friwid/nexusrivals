import { useAuthStore } from "../stores/authStore.js";

export const useRegisterController = {
  setup() {
    const { register, isRegistered } = useRegisterStore("register");

    const username = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      await register({ username: username.value, email: email.value, password: password.value });

      if (isRegistered.value) {
        router.push("/");
      }
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
};