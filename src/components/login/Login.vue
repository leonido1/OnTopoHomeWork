<template>
    <div>
      <h2>Login</h2>
      <button @click="loginAnonymously">Login Anonymously</button>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/auth';
  import { ref } from 'vue';
  import axios from 'axios';
  
  const authStore = useAuthStore();
  
  // Function to handle anonymous login
  const loginAnonymously = async () => {
    try {
      const response = await axios.post('https://site.ontopo.work/api/loginAnonymously');
      const { jwt_token, refresh_token } = response.data;
  
      // Save the tokens in Pinia store
      authStore.setTokens(jwt_token, refresh_token);
  
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  </script>
  
  <style scoped>
  button {
    padding: 10px;
    font-size: 16px;
  }
  </style>
  