<template>
    <div class="todo-item">
      <span :class="{ completed: todo.completed, pending: !todo.completed }">{{ todo.title }}</span>
      <button @click="toggleComplete">{{ todo.completed ? 'Unmark' : 'Complete' }}</button>
      <button @click="deleteTodo">Delete</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todo: Object,
    },
    methods: {
      toggleComplete() {
        this.$emit('toggle-complete', this.todo._id, !this.todo.completed);
      },
      deleteTodo() {
        this.$emit('delete-todo', this.todo._id);
      }
    }
  };
  </script>
  
  <style scoped>
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
    border-bottom: 1px solid #ccc;
  }
  
  .todo-item span.completed {
    color: green;
  }
  
  .todo-item span.pending {
    color: red;
  }
  
  button {
    margin-left: 1em;
  }
  </style>
  