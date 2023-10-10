<script>
import Auth from "../../layouts/register";
import appConfig from "../../../../app.config";

/**
 * Register-2 component
 */
export default {
  page: {
    title: "Registro",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {};
  },
  components: {
    Auth,
  },
};
</script>

<template>
  <Auth>
    <!-- Logo -->
    <div class="auth-brand text-center text-lg-left">
      <div class="auth-logo">
        <router-link to="/" class="logo logo-dark text-center">
          <span class="logo-lg">
            <img src="@/assets/images/logo_interland.png" alt="Logo Interland" height="50" />
          </span>
        </router-link>

        <router-link to="/" class="logo logo-light text-center">
          <span class="logo-lg">
            <img src="@/assets/images/logo_interland.png" alt="Logo Interland" height="50" />
          </span>
        </router-link>
      </div>
    </div>

    <!-- title-->
    <h4 class="mt-0">Registro</h4>
    <p class="text-muted mb-4">
      ¿No tiene cuenta? Creea tu cuenta, podras generar cotizaciones que nuestros agentes pueden atender al momento.
    </p>

    <form action="#">
      <div class="form-group">
        <label for="fullname">Nombre</label>
        <input
          class="form-control"
          type="text"
          id="fullname"
          placeholder="Ingresa tu nombre"
          required
        />
      </div>
      <div class="form-group">
        <label for="emailaddress">Correo Electrónico</label>
        <input
          class="form-control"
          type="email"
          id="emailaddress"
          required
          placeholder="Ingresa tu Correo"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <div class="input-group input-group-merge">
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Ingresa tu Contraseña"
          />
          <div class="input-group-append" data-password="false">
            <div class="input-group-text">
              <span class="password-eye"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="checkbox-signup"
          />
          <label class="custom-control-label" for="checkbox-signup">
            Acepto los
            <a href="javascript: void(0);" class="text-dark"
              >Terminos y Condiciones</a
            >
          </label>
        </div>
      </div>
      <div class="form-group mb-0 text-center">
        <button class="btn btn-success btn-block" style="background-color: #2aab5c !important;" type="submit">Registrar</button>
      </div>

      <!--div class="text-center mt-4">
        <h5 class="mt-0 text-muted">Sign Up using</h5>
        <ul class="social-list list-inline mt-3 mb-0">
          <li class="list-inline-item">
            <a
              href="javascript: void(0);"
              class="social-list-item border-purple text-purple"
            >
              <i class="mdi mdi-facebook"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a
              href="javascript: void(0);"
              class="social-list-item border-danger text-danger"
            >
              <i class="mdi mdi-google"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a
              href="javascript: void(0);"
              class="social-list-item border-info text-info"
            >
              <i class="mdi mdi-twitter"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a
              href="javascript: void(0);"
              class="social-list-item border-secondary text-secondary"
            >
              <i class="mdi mdi-github"></i>
            </a>
          </li>
        </ul>
      </div-->
    </form>

    <!-- Footer-->
    <footer class="footer footer-alt">
      <p class="text-muted">
        ¿Ya tienes una cuenta?
        <router-link
          to="/auth/login-2"
          class="text-primary font-weight-medium ml-1"
          style=" color: #2aab5c !important;"
          >Iniciar Sesión</router-link
        >
      </p>
    </footer>
  </Auth>
</template>
