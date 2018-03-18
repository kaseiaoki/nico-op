Vue.component('login-section', {
  methods: {
    login() {
      this.$store.dispatch('auth')
        .catch(err => console.error(err));
    }
  },
  template: `
<div class="login-section">
  <section class="hero is-fullheight is-dark">
    <div class="hero-body is-dark">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">nico-op</p>
          <div class="box">
            <a class="button is-block is-dark is-large" @click="login">Login with google</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
`
});