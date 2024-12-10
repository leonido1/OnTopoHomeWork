<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-title">Ontopo</h1>
      <p v-if="authStore.jwtToken" class="status-message">Welcome back! You're logged in.</p>
      <p v-else class="status-message">You're not logged in. Please login to continue.</p>
    </header>
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>


<script setup>
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
</script>
<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.app-header {
  text-align: center;
  padding: 20px;
  background: linear-gradient(to right, #007bff, #4facfe);
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.status-message {
  font-size: 1.2rem;
  margin-top: 10px;
  color: #f8f9fa;
}

.app-content {
  flex: 1;
  padding: 20px;
  background: #f9f9f9;
}
</style>
