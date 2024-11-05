import store from '@/state/store'

export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/account/login'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/pages/auth/register-2'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/forgot-password',
        name: 'Forgot-password',
        component: () => import('../views/pages/account/forgot-password'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
                    store.dispatch('auth/logOut')
                } else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
                    store.dispatch('authfack/logout')
                }
                const authRequiredOnPreviousRoute = routeFrom.matched.some(
                    (route) => route.push('/login')
                )
                // Navigate back to previous page, or home as a fallback
                next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
            },
        },
    },
    /*{
        path: '/',
        name: 'home',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/sales/index')
    },*/
    {
        path: '/',
        name: 'home',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/inicio/index')
    },
    /*{
        path: '/',
        name: 'home',
        meta: {
            authRequired: true,
            
        },
        component: () => import('../views/pages/cotizaciones/cotizacion')
    },*/
    {
        path: '/administracion/zonas_select',
        name: 'Seleccion de Zonas',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/zonas_select')
    },
    {
        path: '/cotizaciones/',
        name: 'cotizacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/cotizacion')
    },
    {
        path: '/dashboard/crm',
        name: 'crm-dashboard',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/crm/index')
    },
    {
        path: '/dashboard/analytics',
        name: 'analytics-dashboard',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/analytics/index')
    },
    {
        path: '/apps/calendar',
        name: 'calendar',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/apps/calendar/index')
    },
    {
        path: '/apps/chat',
        name: 'chat',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/apps/chat')
    },
    {
        path: '/apps/companies',
        name: 'companies',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/apps/companies')
    },
    {
        path: '/apps/tickets',
        name: 'tickets',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/apps/tickets')
    },
    {
        path: '/apps/file-manager',
        name: 'file-manager',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/apps/file-manager')
    },
    {
        path: '/ecommerce/customers',
        name: 'customers',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ecommerce/customers/index')
    },
    {
        path: '/ecommerce/orders',
        name: 'orders',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ecommerce/orders/index')
    },
    {
        path: '/ecommerce/product-detail/:id',
        name: 'product-detail',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ecommerce/product-detail')
    },
    {
        path: '/ecommerce/products',
        name: 'products',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ecommerce/products/index')
    },
    {
        path: '/ecommerce/cart',
        name: 'cart',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ecommerce/cart')
    },
    {
        path: '/ecommerce/checkout',
        name: 'checkout',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ecommerce/checkout')
    },
    {
        path: '/ecommerce/order-detail',
        name: 'order-detail',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ecommerce/order-detail')
    },
    {
        path: '/ecommerce/product-create',
        name: 'product-create',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ecommerce/product-create')
    },
    {
        path: '/ecommerce/products-grid',
        name: 'products-grid',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ecommerce/products-grid')
    },
    {
        path: '/ecommerce/sellers',
        name: 'sellers',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ecommerce/sellers')
    },
    {
        path: '/email/inbox',
        name: 'email-inbox',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/email/inbox')
    },
    {
        path: '/email/reademail/:id',
        name: 'reademail',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/email/reademail')
    },
    {
        path: '/email/templates',
        name: 'email-templates',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/email/templates')
    },
    {
        path: '/task/list',
        name: 'task-list',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/task/list')
    },
    {
        path: '/task/detail',
        name: 'task-detail',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/task/detail')
    },
    {
        path: '/task/kanban',
        name: 'kanban-board',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/task/kanban/index')
    },
    {
        path: '/contacts/list',
        name: 'contacts-list',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/contacts/list')
    },
    {
        path: '/contacts/profile',
        name: 'contacts-profile',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/contacts/profile')
    },
    {
        path: '/auth/login-1',
        name: 'auth-login-1',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/login-1')
    },
    {
        path: '/auth/register-1',
        name: 'auth-register-1',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/register-1')
    },
    {
        path: '/auth/recoverpwd',
        name: 'auth-recoverpwd',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/recoverpwd')
    },
    {
        path: '/auth/lock-screen',
        name: 'auth-lock-screen',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/lock-screen')
    },
    {
        path: '/auth/signin-signup',
        name: 'auth-signin-signup',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/signin-signup')
    },
    {
        path: '/auth/logout-1',
        name: 'auth-logout-1',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/logout-1')
    },
    {
        path: '/auth/login-2',
        name: 'auth-login-2',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/login-2')
    },
    {
        path: '/auth/register-2',
        name: 'auth-register-2',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/register-2')
    },
    {
        path: '/auth/recoverpwd-2',
        name: 'auth-recoverpwd-2',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/recoverpwd-2')
    },
    {
        path: '/auth/lock-screen-2',
        name: 'auth-lock-screen-2',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/lock-screen-2')
    },
    {
        path: '/auth/signin-signup-2',
        name: 'auth-signin-signup-2',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/signin-signup-2')
    },
    {
        path: '/auth/logout-2',
        name: 'auth-logout-2',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/auth/logout-2')
    },
    {
        path: '/extras/starter',
        name: 'extras-starter',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/starter')
    },
    {
        path: '/extras/timeline',
        name: 'extras-timeline',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/timeline')
    },
    {
        path: '/extras/sitemap',
        name: 'extras-sitemap',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/sitemap')
    },
    {
        path: '/extras/invoice',
        name: 'extras-invoice',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/invoice')
    },
    {
        path: '/extras/faqs',
        name: 'extras-faqs',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/faqs')
    },
    {
        path: '/extras/search-results',
        name: 'extras-search-results',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/search-results')
    },
    {
        path: '/extras/pricing',
        name: 'extras-pricing',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/pricing')
    },
    {
        path: '/extras/maintenance',
        name: 'extras-maintenance',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/maintenance')
    },
    {
        path: '/extras/coming-soon',
        name: 'extras-coming-soon',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/coming-soon')
    },
    {
        path: '/extras/lightbox',
        name: 'extras-lightbox',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/lightbox')
    },
    {
        path: '/error/404',
        name: 'error-404',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/error/404')
    },
    {
        path: '/error/500',
        name: 'error-500',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/error/500')
    },
    {
        path: '/error/404-alt',
        name: 'error-404-alt',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/error/404-alt')
    },
    {
        path: '/ui/avatars',
        name: 'ui-avatars',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/avatars')
    },
    {
        path: '/ui/buttons',
        name: 'ui-buttons',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/buttons')
    },
    {
        path: '/ui/cards',
        name: 'ui-cards',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/cards')
    },
    {
        path: '/ui/carousel',
        name: 'ui-carousel',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/carousel')
    },
    {
        path: '/ui/dropdowns',
        name: 'ui-dropdowns',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/dropdowns')
    },
    {
        path: '/ui/general',
        name: 'ui-general',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/general')
    },
    {
        path: '/ui/grid',
        name: 'ui-grid',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/grid')
    },
    {
        path: '/ui/images',
        name: 'ui-images',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/images')
    },
    {
        path: '/ui/list-group',
        name: 'ui-list-group',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/list-group')
    },
    {
        path: '/ui/modals',
        name: 'ui-modals',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/modals')
    },
    {
        path: '/ui/notifications',
        name: 'ui-notifications',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/notifications')
    },
    {
        path: '/ui/portlets',
        name: 'ui-portlets',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/portlets')
    },
    {
        path: '/ui/progress',
        name: 'ui-progress',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/progress')
    },
    {
        path: '/ui/ribbons',
        name: 'ui-ribbons',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/ribbons')
    },
    {
        path: '/ui/spinners',
        name: 'ui-spinners',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/spinners')
    },
    {
        path: '/ui/tabs-accordions',
        name: 'ui-tabs-accordions',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/tabs-accordions')
    },
    {
        path: '/ui/tooltips-popovers',
        name: 'ui-tooltips-popovers',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/tooltips-popovers')
    },
    {
        path: '/ui/typography',
        name: 'ui-typography',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/typography')
    },
    {
        path: '/ui/video',
        name: 'ui-video',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/video')
    },
    {
        path: '/extended/rangeslider',
        name: 'rangeslider',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extended/rangeslider')
    },
    {
        path: '/extended/sweet-alert',
        name: 'sweet-alert',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extended/sweet-alert')
    },
    {
        path: '/extended/tour',
        name: 'tour',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extended/tour')
    },
    {
        path: '/extended/scrollspy',
        name: 'scrollspy',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extended/scrollspy')
    },
    {
        path: '/widgets',
        name: 'widgets',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/widgets')
    },
    {
        path: '/icons/feather',
        name: 'feather',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/icons/feather')
    },
    {
        path: '/icons/remix',
        name: 'remix',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/icons/remix')
    }, {
        path: '/icons/boxicons',
        name: 'boxicons',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/icons/boxicons')
    },
    {
        path: '/icons/mdi',
        name: 'mdi',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/icons/mdi')
    },
    {
        path: '/icons/font-awesome',
        name: 'font-awesome',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/icons/font-awesome')
    },
    {
        path: '/icons/weather',
        name: 'weather',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/icons/weather')
    },
    {
        path: '/forms/elements',
        name: 'elements',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/forms/elements')
    },
    {
        path: '/forms/advanced',
        name: 'advanced-form',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/forms/advanced')
    },
    {
        path: '/forms/validation',
        name: 'validation',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/forms/validation')
    },
    {
        path: '/forms/wizard',
        name: 'wizard',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/forms/wizard')
    },
    {
        path: '/forms/mask',
        name: 'mask',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/forms/mask')
    },
    {
        path: '/forms/quill',
        name: 'quill',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/forms/quill')
    },
    {
        path: '/forms/file-uploads',
        name: 'file-uploads',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/forms/file-uploads')
    },
    {
        path: '/tables/basic',
        name: 'basic',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/tables/basic')
    },
    {
        path: '/tables/advanced',
        name: 'advanced',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/tables/advanced')
    },
    {
        path: '/charts/apex',
        name: 'charts-apex',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/charts/apex')
    },
    {
        path: '/charts/chartjs',
        name: 'charts-chartjs',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/charts/chartjs')
    },
    {
        path: '/charts/c3',
        name: 'charts-c3',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/charts/c3')
    },
    {
        path: '/charts/chartist',
        name: 'charts-chartist',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/charts/chartist')
    },
    {
        path: '/charts/knob',
        name: 'charts-knob',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/charts/knob')
    },
    {
        path: '/maps/google',
        name: 'maps-google',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/maps/google')
    },

    //Inicio Cliente
    {
        path: '/customers',
        name: 'list-customer',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/customers')
    },
    {
        path: '/new-customer',
        name: 'newCustomer',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/customers/newCustomer')
    },
    {
        path: '/edit-customer/:pkCustomer/',
        name: 'editCustomer',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/customers/editCustomer')
    },
    //Fin Cliente

    //Inicio Cotizacion
    {
        path: '/cotizaciones/listCotizacion',
        name: 'list-cotizacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/listCotizacion')
    },

    {
        path: '/validate-cotizacion/:pkCotizacion/',
        name: 'validateCotizacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/validateCotizacion')
    },
    {
        path: '/new-cotizacion',
        name: 'newCotizacionN',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/generateCotizacion')
    },
    {
        path: '/cotizaciones/new-cotizacion',
        name: 'newCotizacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/newCotizacion')
    },

    /*{
        path: '/new-cotizacion-advanced',
        name: 'newCotizacion-advanced',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/newCotizacionAdvanced')
    },

    {
        path: '/new-cotizacion-advanced-colores',
        name: 'newCotizacion-advanced-colores',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/newCotizacionAdvancedColores')
    },*/

    {
        path: '/cotizaciones/listVentas',
        name: 'list-ventas',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/listVentas')
    },
    //Fin Cotizacion

    //Inicio Servicio Venta
    // #ismael
    {
        path: '/new-sale-service',
        name: 'newServiceSale',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/newServiceSale')
    },

    //ismael 
    {
        path: '/edit-service/:pkService/',
        name: 'editServiceSale',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/editServiceSale')
    },

    {
        path: '/show-sale/:pkService',
        name: 'showServiceSale',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/showListServices')
    },
    //Fin Servicio Venta

    //Inicio Proveedor
    {
        path: '/provider',
        name: 'list-providers',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/provider')
    },
    {
        path: '/new-provider',
        name: 'newProvider',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/provider/newProvider')
    },
    {
        path: '/edit-provider/:pkProvider/',
        name: 'editProvider',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/provider/editProvider')
    },
    //Fin Proveedor

    //Inicio AjustesRutas
    {
        path: '/ajustesrutas',
        name: 'list-ruta',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ajustesrutas')
    },
    {
        path: '/new-ruta',
        name: 'newRuta',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ajustesrutas/newAjusteRuta')
    },
    {
        path: '/edit-ruta/:pkRuta/',
        name: 'editRuta',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ajustesrutas/editAjusteRuta')
    },
    //Fin AjustesRutas

    //Inicio Catalogo

    // Inicio Productos/Servicios
    {
        path: '/catalogo/listClaveProSer',
        name: 'list-clave-proser',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listClaveProSer')
    },
    {
        path: '/new-clave-proser',
        name: 'newClaveProSer',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newClaveProSer')
    },
    {
        path: '/edit-clave/:pkClaveProSer/',
        name: 'editClaveProSer',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editClaveProSer')
    },
    //Fin Productos/Servicios

    // Inicio Clave Unidad
    {
        path: '/catalogo/listClaveUnidad',
        name: 'list-clave-unidad',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listClaveUnidad')
    },
    {
        path: '/new-clave-unidad',
        name: 'newClaveUnidad',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newClaveUnidad')
    },
    {
        path: '/edit-clave-unidad/:pkClaveUnidad/',
        name: 'editClaveUnidad',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editClaveUnidad')
    },
    //Fin Clave Unidad

    // Inicio Productos
    {
        path: '/catalogo/listProducto',
        name: 'list-producto',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listProducto')
    },
    {
        path: '/new-producto',
        name: 'newProducto',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newProducto')
    },
    {
        path: '/edit-producto/:pkProducto/',
        name: 'editProducto',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editProducto')
    },
    //Fin Productos

    //Inicio Servicios
    {
        path: '/catalogo/listServicio',
        name: 'list-servicios',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listServicio')
    },
    {
        path: '/new-servicio',
        name: 'newServicio',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newServicio')
    },
    {
        path: '/edit-servicio/:pkServicio/',
        name: 'editServicio',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editServicio')
    },
    //Fin Servicios

    //Inicio Puesto
    {
        path: '/catalogo/listPuesto',
        name: 'list-puesto',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listPuesto')
    },
    {
        path: '/new-puesto',
        name: 'newPuesto',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newPuesto')
    },
    {
        path: '/edit-puesto/:pkPuesto/',
        name: 'editPuesto',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editPuesto')
    },
    //Fin Puesto

    //Inicio Responsable
    {
        path: '/catalogo/listResponsable',
        name: 'list-responsable',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listResponsable')
    },
    {
        path: '/new-responsable',
        name: 'newResponsable',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newResponsable')
    },
    {
        path: '/edit-responsable/:pkResponsable/',
        name: 'editResponsable',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editResponsable')
    },
    //Fin Responsable

    //Inicio Envio
    {
        path: '/catalogo/listEnvio',
        name: 'list-envio',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listEnvio')
    },
    {
        path: '/new-envio',
        name: 'newEnvio',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newEnvio')
    },
    {
        path: '/edit-envio/:pkEnvio/',
        name: 'editEnvio',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editEnvio')
    },
    //Fin Envio

    //Fin Catalogo

    //Inicio Usuarios
    {
        path: '/users',
        name: 'list-users',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/users')
    },
    {
        path: '/new-user',
        name: 'newUser',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/users/newUser')
    },
    {
        path: '/edit-user/:pkUser/',
        name: 'editUser',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/users/editUser')
    },
    //Fin Usuarios

    //Para operaciones 
    {
        path: '/operaciones',
        name: 'list-operaciones',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/operaciones')
    },
    {
        path: '/new-operacion',
        name: 'newOperacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/operaciones/newOperacion')
    },
    {
        path: '/edit-operacion/:pkOperacion/',
        name: 'editOperacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/operaciones/editOperacion')
    },

    /* PARA SERVICIOS DE COTIZACIONES */

    {
        path: '/catalogo/listServicioCotizacion',
        name: 'list-serviciosCotizacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listServicioCotizacion')
    },
    {
        path: '/new-servicioCotizacion',
        name: 'newServicioCotizacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newServicioCotizacion')
    },
    {
        path: '/edit-servicioCotizacion/:pkServicio/',
        name: 'editServicioCotizacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editServicioCotizacion')
    },

    /* FIN SERVICIOS DE COTIZACIONES */

    /* PARA SERVICIOS DE COTIZACIONES */

    {
        path: '/catalogo/listUnidad',
        name: 'list-unidad',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listUnidad')
    },
    {
        path: '/new-unidad',
        name: 'newUnidad',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newUnidad')
    },
    {
        path: '/edit-unidad/:pkUnidad/',
        name: 'editUnidad',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editunidad')
    },

    /* FIN SERVICIOS DE COTIZACIONES */

    /* PARA CATALOGO DE ZONAS */

    {
        path: '/catalogo/listZonas',
        name: 'list-zonas',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listZonas')
    },
    {
        path: '/new-zona',
        name: 'newZona',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newZona')
    },
    {
        path: '/edit-zona/:pkZona/',
        name: 'editZona',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editZona')
    },

    /* FIN CATALOGO DE ZONAS */

    /* PARA CATALOGO DE MÓDULOS */
    {
        path: '/administracion/listModulos',
        name: 'list-modulos',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/listModulos')
    },
    {
        path: '/edit-modulo/:pkModulo/',
        name: 'editModulo',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/editModulo')
    },
    {
        path: '/new-modulo',
        name: 'newModulo',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/newModulo')
    },

    /* FIN CATALOGO DE MÓDULOS */

    /* PARA CATALOGO DE ENVIO DE CORREOS */
    {
        path: '/administracion/email',
        name: 'email',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/email')
    },

    /* FIN CATALOGO DE ENVIO DE CORREOS */

    /* PARA CATALOGO DE EMBALAJE */
    {
        path: '/catalogo/listEmbalaje',
        name: 'list-embalaje',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listEmbalaje')
    },
    {
        path: '/edit-embalaje/:pkEmbalaje/',
        name: 'editEmbalaje',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/editEmbalaje')
    },
    {
        path: '/new-embalaje',
        name: 'newEmbalaje',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newEmbalaje')
    },

    /* FIN CATALOGO DE EMBALAJE */

    //INICIO TARIFARIO
    {
        path: '/cotizaciones/listTarifarios',
        name: 'list-tarifarios',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/newTarifa')
    },
    {
        path: '/cotizaciones/newTarifarioLTL',
        name: 'new-tarifa-ltl',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/newTarifaLTL')
    },
    {
        path: '/cotizaciones/new-tarifa',
        name: 'newTarifa',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/newTarifa')
    },
    {
        path: '/edit-tarifa/:pkTarifa/',
        name: 'editTarifa',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/cotizaciones/editTarifa')
    },
    
    //TERMINA TARIFARIO

    //INICIO OFERTAS
    {
        path: '/administracion/listOfertas',
        name: 'list-ofertas',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/listOfertas')
    },

    {
        path: '/new-oferta',
        name: 'newOferta',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/newOferta')
    },
    {
        path: '/edit-oferta/:pkOferta/',
        name: 'editOferta',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/editOferta')
    },
    //TERMINA OFERTAS
    
    {
        path: '/miCuenta',
        name: 'miCuenta',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/users/miCuenta')
    },

    {
        path: '/users/listCotizacion',
        name: 'listCotizacionU',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/users/listCotizacion')
    },

    {
        path: '/users/editarCotizacion/:pkCotizacion/',
        name: 'editarCotizacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/users/editarCotizacion')
    },

    {
        path: '/catalogo/listTerminos',
        name: 'listCotizacion',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listTerminos')
    },

    {
        path: '/catalogo/newTermino',
        name: 'newTermino',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newTermino')
    },

    {
        path: '/administracion/geocercas',
        name: 'geocercas',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/geocercas-km')
    },
    {
        path: '/administracion/geocercas-new',
        name: 'Nuevas Geocercas',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/geocercas-new-km')
    },

    {
        path: '/boot/:data/',
        name: 'boot',
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
        component: () => import('../views/pages/account/login-boot'),
    },
    {
        path: '/administracion/listRangoKilometrajes',
        name: 'list-rango-kilometrajes',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/listRangoKilometrajes')
    },
    {
        path: '/administracion/new-rango',
        name: 'Nuevo Rango',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/newRango')
    },
    {
        path: '/administracion/list-incrementos',
        name: 'Lista Incrementos',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/listIncrementos')
    },
    {
        path: '/administracion/new-incremento',
        name: 'Nuevo Incremento',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/newIncremento')
    },
    {
        path: '/edit-incremento/:pkIncremento/',
        name: 'Editar Incremento',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/editIncremento')
    },
    {
        path: '/catalogo/listZonasTarifas',
        name: 'Lista de Zonas para Tarifarios',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/listZonasTarifas')
    },
    {
        path: '/newZonasTarifas',
        name: 'Nueva Zonas para Tarifarios',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/catalogo/newZonasTarifas')
    },
    {
        path: '/administracion/listRangoMercancias',
        name: 'list-rango-mercancias',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/listRangoMercancias')
    },
    {
        path: '/administracion/new-rango-mercancia',
        name: 'Nuevo Rango Mercancia',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/administracion/newRangoMercancia')
    },
    {
        path: '/chatboot/reporte',
        name: 'Chatboot Información',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/chatbot/listChatbot')
    },

    {
        path: '/chatboot/numeros-agentes',
        name: 'Chatboot Información',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/chatbot/listNumerosChatbot')
    },

    {
        path: '/chatboot/new-lead',
        name: 'Nuevo Lead',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/chatbot/newLead')
    },

    {
        path: '/chatboot/new-ejecutivo',
        name: 'Nuevo Ejecutivo',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/chatbot/newEjecutivo')
    },

    {
        path: '/chatboot/edit-lead',
        name: 'Edita Lead',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/chatbot/editLead')
    },

    {
        path: '/chatboot/edit-ejecutivo',
        name: 'Editar Ejecutivo',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/chatbot/editNumeroEjecutivo')
    },
    // {
    //     path: '/apps/chat',
    //     name: 'chat',
    //     meta: {
    //         authRequired: true,
    //     },
    //     component: () => import('../views/pages/apps/chat')
    // },
]