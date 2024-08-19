<template>
    <div class="todos">
      <nav class="navbar">
        <h2>To-Do List</h2>
        <button @click="logout" class="logout-button">Logout</button>
      </nav>
      <div class="new-todo">
        <input v-model="newTodoTitle" placeholder="Enter new to-do" />
        <button @click="addTodo">Add</button>
      </div>
      <div class="todo-list">
        <TodoItem
          v-for="todo in todos"
          :key="todo._id"
          :todo="todo"
          @toggle-complete="toggleComplete"
          @delete-todo="deleteTodo"
        />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import TodoItem from '../components/ToDoItem.vue';
  
  export default {
    components: {
      TodoItem,
    },
    data() {
      return {
        todos: [],
        newTodoTitle: '',
      };
    },
    created() {
      this.fetchTodos();
    },
    methods: {
      async fetchTodos() {
        try {
          const response = await axios.get('/todos');
          this.todos = response.data;
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      },
      async addTodo() {
        if (!this.newTodoTitle) return;
  
        try {
          const response = await axios.post('/todos', {
            title: this.newTodoTitle,
          });
          this.todos.push(response.data);
          this.newTodoTitle = '';
        } catch (error) {
          console.error('Error adding todo:', error);
        }
      },
      async toggleComplete(id, completed) {
        try {
          await axios.put(`/todos/${id}`, {
            completed,
          });
          const index = this.todos.findIndex(todo => todo._id === id);
          this.todos[index].completed = completed; // Actualiza el estado local
        } catch (error) {
          console.error('Error toggling complete:', error);
        }
      },
      async deleteTodo(id) {
        try {
          await axios.delete(`/todos/${id}`);
          this.todos = this.todos.filter(todo => todo._id !== id);
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      },
      logout() {
        localStorage.removeItem('token'); // Borrar el token del almacenamiento local
        this.$router.push('/login'); // Redirigir a la página de login
      },
    },
  };
  </script>
  
  <style scoped>
  .todos {
    max-width: 600px;
    margin: 0 auto;
    padding: 1em;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #343a40; /* Gris oscuro */
    color: #fff;
    padding: 0.5em 1em;
    border-radius: 4px;
    margin-bottom: 1em;
  }
  
  .navbar h2 {
    margin: 0;
  }
  
  .logout-button {
    padding: 0.5em 1em;
    border: none;
    background-color: #dc3545; /* Rojo */
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
  }
  
  .logout-button:hover {
    background-color: #c82333; /* Rojo oscuro */
  }
  
  .new-todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
  }
  
  .new-todo input {
    flex-grow: 1;
    padding: 0.5em;
    margin-right: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .new-todo button {
    padding: 0.5em 1em;
    border: none;
    background-color: #007BFF;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .new-todo button:hover {
    background-color: #0056b3;
  }
  
  .todo-list {
    border-top: 1px solid #ccc;
  }
  </style>
  