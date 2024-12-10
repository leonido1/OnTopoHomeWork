<template>
  <div class="login">
    <div class="login-card">
      <h1>Welcome Back to Ontopo</h1>
      <p>Please log in to continue exploring and booking restaurants.</p>
      <button class="login-button" @click="loginAnonymously">Login Anonymously</button>
    </div>
  </div>
</template>

  
 
<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '../store/auth'; // Import the Pinia store
import axios from 'axios';

export default defineComponent({
  name: 'LoginView',
  methods: {
    async loginAnonymously() {
      try {
        const response = await axios.post('https://site.ontopo.work/api/loginAnonymously');
        const { jwt_token, refresh_token } = response.data;

        const authStore = useAuthStore();
        authStore.setTokens(jwt_token, refresh_token);

        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
});
</script>


<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  background: linear-gradient(to bottom right, #007bff, #4facfe);
  font-family: 'Arial', sans-serif;
  color: white;
}

.login-card {
  text-align: center;
  padding: 30px;
  background: rgba(255, 255, 255, 0.15); /* Transparent background for the card */
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #fff;
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #f8f9fa;
}

.login-button {
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
  background: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: #f8f9fa;
  color: #0056b3;
  transform: scale(1.05); /* Slight zoom effect */
}
</style>
