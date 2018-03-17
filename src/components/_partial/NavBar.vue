<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" fixed="top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">{{ brand_name }}</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/pages/about">关于</b-nav-item>
          <b-nav-item to="#">RSS</b-nav-item>
          <b-nav-item to="#">工具</b-nav-item>
          <b-nav-item to="/manager">Admin</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      brand_name: 'Butterfly'
    }
  }
}
</script>