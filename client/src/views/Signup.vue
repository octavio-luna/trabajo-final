<template>
    <div class="signup">
      <h2>Signup</h2>
      <form @submit.prevent="signup">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit_signup_button">Signup</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async signup() {
        try {
          const response = await axios.post('/signup', {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          console.log('User signed up:', response.data);
          // Redirigir a la página de login después del registro exitoso
          this.$router.push('/login');
        } catch (error) {
          console.error('Error signing up:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos básicos para el formulario de registro */
  .signup {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .signup h2 {
    text-align: center;
  }
  .signup form div {
    margin-bottom: 1em;
  }
  .signup form div label {
    margin-bottom: .5em;
    color: #333333;
    display: block;
  }
  .signup form div input {
    border: 1px solid #CCCCCC;
    padding: .5em;
    font-size: 1em;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }
  .signup button {
    padding: 0.7em;
    color: #fff;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  .signup button:hover {
    background-color: #0056b3;
  }
  </style>
  