<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div class="signup-link">
        <button @click="goToSignup">Registrarse</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/login', {
            email: this.email,
            password: this.password,
          });
          const token = response.data.token;
          localStorage.setItem('token', token); // Store token in local storage
          console.log('User logged in:', response.data);
          // Redirigir a la página principal después de un inicio de sesión exitoso
          this.$router.push('/dashboard');
        } catch (error) {
          console.error('Error logging in:', error);
        }
      },
      goToSignup() {
        this.$router.push('/signup');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos básicos para el formulario de login */
  .login {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .login h2 {
    text-align: center;
  }
  .login form div {
    margin-bottom: 1em;
  }
  .login form div label {
    margin-bottom: .5em;
    color: #333333;
    display: block;
  }
  .login form div input {
    border: 1px solid #CCCCCC;
    padding: .5em;
    font-size: 1em;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }
  .login button {
    padding: 0.7em;
    color: #fff;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  .login button:hover {
    background-color: #0056b3;
  }
  .signup-link {
    margin-top: 1em;
    text-align: center;
  }
  .signup-link button {
    background: none;
    border: none;
    color: #007BFF;
    cursor: pointer;
    text-decoration: underline;
  }
  .signup-link button:hover {
    color: #0056b3;
  }
  </style>
  