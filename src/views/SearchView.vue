<template>
  <div class="search-view">
    <h1>Search for a Table</h1>

    <!-- Search Form -->
    <form @submit.prevent="onSearch" class="search-form">
      <div class="form-group">
        <label for="size">Number of Guests:</label>
        <input type="number" v-model="size" id="size" class="form-input" required />
      </div>

      <div class="form-group">
        <label for="date">Reservation Date:</label>
        <input type="date" v-model="date" id="date" class="form-input" required />
      </div>

      <div class="form-group">
        <label for="time">Reservation Time:</label>
        <input type="time" v-model="time" id="time" class="form-input" required />
      </div>

      <button type="submit" class="btn-primary">Search</button>
    </form>

    <!-- Search Results -->
    <div class="results">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <div v-if="restaurants.length === 0" class="no-results">No results found.</div>
        <div
          v-for="restaurant in restaurants"
          :key="restaurant.post.slug"
          class="restaurant-card"
        >
          <h2 class="restaurant-name">{{ restaurant.post.venue_name }}</h2>
          <p class="restaurant-score">Score: {{ restaurant.post.score }}</p>
          <p class="restaurant-description">{{ restaurant.availability.page.title }}</p>
          <button @click="bookTable(restaurant)" class="btn-secondary">Book Now</button>
        </div>

        <!-- Load More Button -->
        <button v-if="hasMore" @click="loadMore" class="btn-primary">Load More</button>
      </div>
    </div>
  </div>
</template>

  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import  {useAuthStore}  from '../store/auth'; // Assuming the Pinia store for auth is already defined
  
  interface Restaurant {
    post:{
      slug: string;
      venue_name: string;
      score: number;
    },
    availability: {
      page: {
        title: string;
      };
    };
  }
  const defaultCustomerNumber:string = "2"

  export default defineComponent({
    name: 'SearchView',
    setup() {
      // State variables
      const size = ref<String>(defaultCustomerNumber); // Default to 2 guests
      const date = ref<string>('');
      const time = ref<string>('');
      const loading = ref<boolean>(false);
      const restaurants = ref<Restaurant[]>([]);
      const hasMore = ref<boolean>(false);
      const searchId = ref<string | null>(null);
  
      // Pinia store for auth token
      const store = useAuthStore();
      const token = store.jwtToken;
      // Search Function
      const onSearch = async () => {
        if (!token) {
          console.error('User is not authenticated');
          return;
        }
  
        loading.value = true;
        const criteria = {
          date: date.value.split("-").join(""),//.replace('-',''),
          time: time.value.replace(':',''),
          size: size.value,
        };
        try {
          // Create Search Token dynamically
          const response = await fetch('https://site.ontopo.work/api/search_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': token,
            },
            body: JSON.stringify({
              criteria,
              marketplace_id: '15380287', // You can update this based on your needs
              locale: 'en', // Make it dynamic if needed
              geocodes: ['belgrade'], // You can update this to be dynamic based on location
            }),
          });
          if (response.ok) {
            const data = await response.json();
            searchId.value = data.search_id;
            loadResults();
          } else {
            console.error('Failed to create search token');
          }
        } catch (error) {
          console.error('Error during search token request', error);
        }
      };
  
      // Load Results dynamically based on Search ID
      const loadResults = async () => {
        if (!searchId.value || !token) {
          loading.value = false;
          return;
        }
  
        try {
          const response = await fetch('https://site.ontopo.work/api/search_request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': token,
            },
            body: JSON.stringify({
              search_id: searchId.value,
            }),
          });
  
          if (response.ok) {
            const data = await response.json();
            restaurants.value = data.posts.map((post: any) => post);
            hasMore.value = data.total > restaurants.value.length;
          } else {
            console.error('Failed to load search results');
          }
        } catch (error) {
          console.error('Error fetching search results', error);
        } finally {
          loading.value = false;
        }
      };
  
      // Load More Results
      const loadMore = async () => {
        if (!searchId.value || !token) return;
  
        try {
          loading.value = true;
          const response = await fetch('https://site.ontopo.work/api/search_request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': token,
            },
            body: JSON.stringify({
              search_id: searchId.value,
            }),
          });
  
          if (response.ok) {
            const data = await response.json();
            const newRestaurants = data.posts.map((post: any) => post);
            console.log(newRestaurants);
            restaurants.value.push(...newRestaurants);
            hasMore.value = data.total > restaurants.value.length;
          } else {
            console.error('Failed to load more search results');
          }
        } catch (error) {
          console.error('Error fetching more search results', error);
        } finally {
          loading.value = false;
        }
      };
  
      // Book a Table (dummy function for now)
      const bookTable = (restaurant: Restaurant) => {
        alert(`Booking a table at ${restaurant.post.venue_name}`);
      };
  
      return {
        size,
        date,
        time,
        loading,
        restaurants,
        hasMore,
        onSearch,
        loadMore,
        bookTable,
      };
    },
  });
  </script>
  <style scoped>
  .search-view {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .search-form {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-input {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    font-size: 1rem;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .btn-secondary {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-secondary:hover {
    background-color: #218838;
  }
  
  .results {
    margin-top: 20px;
  }
  
  .loading {
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: #007bff;
  }
  
  .no-results {
    text-align: center;
    font-size: 1.2rem;
    color: #555;
  }
  
  .restaurant-card {
    padding: 20px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .restaurant-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  
  .restaurant-score,
  .restaurant-description {
    font-size: 1rem;
    margin: 5px 0;
  }
  </style>
  