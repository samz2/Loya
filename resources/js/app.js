
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment';
import Vue from 'vue';
import swal from 'sweetalert2';
import VeeValidate, { Validator } from 'vee-validate';
import VueProgressBar from 'vue-progressbar';
import VueRouter from 'vue-router';
import { ServerTable, ClientTable, Event } from 'vue-tables-2';
import * as VueGoogleMaps from 'vue2-google-maps';
import vSelect from 'vue-select';
import curso from './components/templates/tarea_n.vue';

// Window require
window.swal = swal;

// Vue use
Vue.use(VueRouter);
// Vue.use(VeeValidate);
Vue.use(VeeValidate, {
    classes: true
});
Vue.use(ClientTable);
Vue.use(VueProgressBar, {
    // color: 'white',
    color: 'rgb(143, 255,199)',
    failedColor: 'red',
    thickness: '6px',
});

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBoC50c195wjGs2gxBzz5jInz2yFtizUG4',
        libraries: 'places', // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //// If you want to set the version, you can do so:
        // v: '3.26',
    },

    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
})

// Validation messages
const messages = {
    alpha_spaces: (field) => `El campo ${field} solo debe contener letras y espacios.`,
    between: (field, [min, max]) => `Este campo debe estar entre ${min} y ${max}.`,
    email: (field) => `El campo ${field} debe ser un correo electr??nico v??lido.`,
    date_format: (field, [format]) => format == 'YYYY' ? `Este campo debe tener formato de a??o` : `Este campo debe tener formato ${format}.`,
    max: (field, [length]) => `El campo de ${field} no debe ser mayor a ${length} caracteres.`,
    min: (field, [length]) => `El campo de ${field} debe tener al menos ${length} caracteres.`,
    numeric: (field) => `Este campo debe contener solo caracteres num??ricos.`,
    required: (field) => `El campo ${field} es obligatorio.`,
    url: (field) => `Este campo no es una URL v??lida.`
};

const locale = {
    name: 'en',
    messages
};

Validator.localize({ [locale.name]: locale });

// Define some routes

const routes = [
    // Main Routes
    { path: '/', component: require('./components/perfil.vue') },
    { path: '/home', component: require('./components/perfil.vue')},
    // { path: '*', component: require('./components/perfil.vue') },
    //rutas admin
    { path: '/alumnos', component: require('./components/admin/addUser.vue') },
    { path: '/docentes', component: require('./components/admin/docentes.vue') },
    { path: '/nivel', component: require('./components/admin/nivel.vue') },
    { path: '/grados', component: require('./components/admin/grados.vue') },
    { path: '/cursosdocentes', component: require('./components/admin/DocenteCurso.vue') },
    { path: '/costos', component: require('./components/admin/costos.vue') },
    { path: '/cursos', component: require('./components/admin/areas.vue') },
    { path: '/matriculados', component: require('./components/admin/matriculados.vue') },
    { path: '/pensiones', component: require('./components/admin/pensiones.vue') },
    { path: '/registrosimulacros', component: require('./components/admin/simulacros.vue') },
    { path: '/notasimulacro', component: require('./components/admin/notasimulacro.vue') },
    { path: '/resultados', component: require('./components/admin/resultados.vue') },
    { path: '/capacidades', component: require('./components/admin/capacidades.vue') },
    { path: '/areas', component: require('./components/admin/cursos.vue') },
    { path: '/asistencia', component: require('./components/auxiliar/asistencia.vue') },
    { path: '/ventas', component: require('./components/admin/ventas.vue') },
    { path: '/auxiliares', component: require('./components/admin/auxiliares.vue') },
    { path: '/grado-cursos', component: require('./components/admin/gradoscursos.vue') },
    { path: '/miscursos', component: require('./components/alumno/miscursos.vue') },
    { path: '/instancias', component: require('./components/admin/instancias.vue') },
    { path: '/mensajes', component: require('./components/admin/mensajes.vue') },
    { path: '/usuarios', component: require('./components/admin/usuarios.vue') },
    //Rutas docente
    { path: '/registro', component: require('./components/docentes/notas.vue') },
    { path: '/tareas', component: require('./components/docentes/tareas.vue') },
    { path: '/tareasview', component: require('./components/docentes/tareasview.vue') },
    { path: '/revisar', component: require('./components/docentes/revisar.vue') },
    { path: '/notas', component: require('./components/docentes/viznotas.vue') },
    // { path: '/registro', component: require('./components/docentes/registro.vue') },

    //Rutas alumno
    { path: '/individual', component: require('./components/alumno/individual.vue') },
    { path: '/mihorario', component: require('./components/alumno/horarios.vue') },
    { path: '/curso', component: require('./components/perfil.vue') },
    // { path: '/curso/:id', components: {"content-viewport" : curso} },

    // { path: '/alumnos', component: require('./components/admin/alumnos.vue') },    
];

// Create the route instance
const router = new VueRouter({
    mode: 'history',
    routes
});

// Vue filters
Vue.filter('formatDate', function (data) {
    return moment(data).format("DD/MM/YYYY");
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('uploads', require('./components/uploads.vue'));
Vue.component('moon-loader', require('vue-spinner/src/MoonLoader.vue'));
Vue.component('table1', require('./components/templates/table1.vue'));
Vue.component('table2', require('./components/templates/table2.vue'));
Vue.component('table3', require('./components/templates/table3.vue'));
Vue.component('table4', require('./components/templates/table4.vue'));
Vue.component('capacidades', require('./components/templates/capacidad.vue'));
Vue.component('error', require('./components/templates/error.vue'));
Vue.component('areaT', require('./components/templates/area.vue'));
Vue.component('perfil1', require('./components/templates/perfil1.vue'));
Vue.component('perfil2', require('./components/templates/perfil2.vue'));
Vue.component('perfil3', require('./components/templates/perfil3.vue'));
Vue.component('miscursosT', require('./components/templates/miscursosT.vue'));
Vue.component('grado', require('./components/templates/grado.vue'));
Vue.component('alumno', require('./components/templates/alumno.vue'));
Vue.component('matriculados', require('./components/templates/matriculados.vue'));
Vue.component('docenteCurso', require('./components/templates/DocenteCurso.vue'));
Vue.component('docente', require('./components/templates/docente.vue'));
Vue.component('asistenciaT', require('./components/templates/asistenciaT.vue'));
Vue.component('venta', require('./components/templates/venta.vue'));
Vue.component('auxiliar', require('./components/templates/auxiliar.vue'));
Vue.component('curso', require('./components/templates/curso.vue'));
Vue.component('costo', require('./components/templates/costo.vue'));
Vue.component('pension', require('./components/templates/pension.vue'));
Vue.component('gradocursos', require('./components/templates/gradocursos.vue'));
Vue.component('nota', require('./components/templates/nota.vue'));
Vue.component('nivelT', require('./components/templates/nivelT.vue'));
Vue.component('revisa', require('./components/templates/revisa.vue'));
Vue.component('tarea', require('./components/templates/tarea.vue'));
Vue.component('zcurso', require('./components/templates/tarea_n.vue'));
Vue.component('instancia', require('./components/templates/instancia.vue'));
Vue.component('mensaje', require('./components/templates/mensaje.vue'));
Vue.component('usuario', require('./components/templates/usuario.vue'));
Vue.component('tareaview', require('./components/templates/tareaview.vue'));
Vue.component('horario', require('./components/templates/horario.vue'));
Vue.component('vernota', require('./components/templates/vernota.vue'));
Vue.component('v-select', vSelect);



// const files = require.context('./', true, /\.vue$/i)

// files.keys().map(key => {
//     return Vue.component(_.last(key.split('/')).split('.')[0], files(key))
// })

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    router
}).$mount('#app');