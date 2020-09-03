<template>
  <section class="container">
    <div>
      <h1 class="title">SJob - CMS</h1>
      <h2 class="subtitle">Backend CMS</h2>
    </div>
  </section>
</template>

<script>
export default {
  beforeCreate() {
    const permission = this.$getPermission()
    this.$routingByPermission(permission)
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
