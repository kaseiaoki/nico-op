Vue.component('main-section', {
  computed: {
    ...Vuex.mapState(['smokes', 'setting'])
  },
  methods: {
    ...Vuex.mapMutations(['addSmoke', 'openSettingModal'])
  },
  watch: {
    smokes: values => {
      console.debug('updated smokes', values);
    },
    setting: value => {
      console.debug('updated setting', value);
    }
  },
  template: `
<div class="main-section">
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div id="navbarMenuHeroB" class="navbar-menu is-quater is-offset-quauter">
          <a class="button is-white is-inverted" @click="openSettingModal">
            <span class="icon">
            <i class="fa fa-cog"></i>
            </span>
            <span>setting</span>
          </a>
          <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">
              <p>setting</p>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
          </div>
        </div>
        <div class="column is-quater is-herf">
          <p class="title has-text-white is-bold">Nico-op</p><span class="navbar-item"></span>
        </div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="columns">
      <div class="column is-12 is-offset-5">
        <div >
          <p><button id="smoke_button" class="button is-danger is-large is-rounded" @click="addSmoke">　Smoke</button></p>
        </div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="column is-12 is-offset-5">
      <p id="debt" class="title is-bold">debit</p>
    </div>
  </section>
  <section class="section">
    <div class="column is-12 is-offset-5">
      <p id="graph" class="title is-bold">garph</p>
    </div>
  </section>
</div>
`
});