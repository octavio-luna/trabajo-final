<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:9000/api';
// Agregar el token de autorización a las solicitudes de axios
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error(error)
  return Promise.reject(error);
});

export default {
  name: 'App',
};
</script>

<style>
/* Estilos globales */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}
</style>
