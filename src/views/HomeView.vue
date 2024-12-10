<template>
  <div class="home">
    <div class="hero">
      <h1>Discover Your Next Culinary Experience</h1>
      <p>Search, explore, and book tables at the best restaurants near you.</p>
      <router-link to="/search" class="cta-button">Find Restaurants</router-link>
    </div>
  </div>
</template>

  
<script lang="ts">
export default {
  name: 'HomeView',
};

  </script>
  <style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height for a centered layout */
  background: linear-gradient(to bottom right, #007bff, #4facfe);
  color: white;
  font-family: 'Arial', sans-serif;
}

.hero {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1); /* Subtle overlay effect */
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: bold;
  color: #fff;
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #f8f9fa;
}

.cta-button {
  display: inline-block;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
  background: white;
  text-decoration: none;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #f8f9fa;
  color: #0056b3;
  transform: scale(1.05); /* Slight zoom effect */
}
</style>
