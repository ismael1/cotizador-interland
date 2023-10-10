<script>
/**
 * Auth-2 component
 */
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div class="auth-fluid-vid">
    <div class="auth-fluid-right">

        <div style="width: 100%; height: 100%;">
            <video autoplay loop muted style="width: 100%; height: 100%;" src="../../assets/images/interland1.mp4"></video>
        </div>
      <!--div class="auth-user-testimonial">
        <h3 class="mb-3 text-white">Very elegant & impressive!</h3>
        <p class="lead font-weight-normal">
          <i class="mdi mdi-format-quote-open"></i> I've been using this theme
          for a while and I must say that whenever I am looking for a design - I
          refer to this theme for specifics & implementation. With wide arrays
          of components, designs, charts - I would highly recommend this theme
          for anyone using it for dashboard or project management usage..
          <i class="mdi mdi-format-quote-close"></i>
        </p>
        <h5 class="text-white">- Admin User</h5>
      </div-->
    </div>
    <!-- end Auth fluid right content -->

    <!--Auth fluid left content -->
    <div class="auth-fluid-form-box">
      <div class="align-items-center d-flex h-100">
        <div class="card-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.auth-fluid-vid {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 100vh;
    flex-direction: row;
    align-items: stretch;
    background-size: cover;

    .auth-fluid-form-box {
        max-width: 480px;
        border-radius: 0;
        z-index: 2;
        padding: 3rem 2rem;
        background-color: #ffffff;
        position: relative;
        width: 100%;
    }

    .auth-fluid-right {
        
        flex: 1;
        position: relative;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
    }
}
</style>
