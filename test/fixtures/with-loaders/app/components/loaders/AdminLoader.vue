<template>
  <div class="admin-loader">
    <div class="admin-spinner"></div>
    <p>Loading Admin Panel...</p>
  </div>
</template>

<style scoped>
.admin-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #2c3e50;
  color: white;
}

.admin-spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #34495e;
  border-top: 5px solid #e74c3c;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
