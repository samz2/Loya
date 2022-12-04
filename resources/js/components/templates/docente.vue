<template>
    <div class="content">
	    <div class="container-fluid">
	    	<div class="row">
                <div class="col-md-12">
                    <div class="card card-info" id="objetivo">
                        <div class="card-header bg-azul text-center">
                            <h4 class="title">Docente</h4>  
                        </div>
                        <div class="card-body">
                            <fieldset class="border p-2">
                                <legend class="w-auto t16 text-primary"><b>Datos Docente</b></legend>
                                <div class="form-group row">  
                                    <div class="col-md-2">
                                    <label>DNI (*)</label>
                                    </div>                             
                                    <div class="col-md-2">
                                        <input type="text" v-if="!editar" @blur="consultaDNI(docente.dni)" onkeypress='return numeros(event)' v-model="docente.dni" class="form-control form-control-sm"  maxlength="8">
                                        <input type="text" v-if="editar"  v-model="docente.dni" class="form-control form-control-sm" readonly>
                                    </div>
                                </div>    
                                <div class="form-group row">      
                                    <div class="col-md-2 text-left">
                                        <label>Nombre (*)</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" onkeypress='return soloLetras(event)' v-model="docente.nombre" class="form-control form-control-sm"  maxlength="60">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-2 text-left">
                                        <label>A. Paterno (*)</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" v-model="docente.paterno" onkeypress='return soloLetras(event)' class="form-control form-control-sm"  maxlength="60">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-2 text-left">
                                        <label>A. Materno (*)</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" v-model="docente.materno" onkeypress='return soloLetras(event)' class="form-control form-control-sm"  maxlength="60">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-2 text-left">
                                        <label>Género (*)</label>
                                    </div>
                                    <div class="col-md-2">
                                        <select v-model="docente.genero" class="form-control form-control-sm">
                                            <option value="M">M</option>
                                            <option value="F">F</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-2 text-left">
                                        <label>Direccion (*)</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" v-model="docente.dir" onkeypress='return alfa(event)' class="form-control form-control-sm"  maxlength="60">
                                    </div>
                                </div>
                                
                                <div class="form-group row">
                                    <div class="col-md-2 text-left">
                                        <label class="t12">Fecha de Nacimiento (*)</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="date" v-model="docente.fecha" class="form-control form-control-sm"  maxlength="60">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-2 text-left">
                                        <label>Celular (*)</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" v-model="docente.cel" onkeypress='return solonumeros(event)' class="form-control form-control-sm"  maxlength="9">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-2 text-left">
                                        <label>E-Mail (*)</label>
                                            
                                    </div>
                                    <div class="col-md-4">
                                        <input v-model="docente.correo" onkeypress='return alfa(event)' type="email" class="form-control form-control-sm">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-2" v-if="!editar">
                                        <button class="btn bg-indigo" @click="registrar(1)">Guardar <i class="fa fa-save"></i></button>
                                    </div>
                                    <div class="col-md-2" v-if="editar">
                                        <button class="btn bg-indigo" @click="registrar(2)">Editar <i class="fa fa-edit"></i></button>
                                    </div>
                                    <div class="col-md-2">
                                        <button class="btn bg-olive" @click="volver()">volver <i class="fa fa-undo"></i></button>
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                    
                    <div class="card card-info" id="cursos">
                        <div class="card-header bg-azul text-center">
                            <h4 class="title">Asignar Cursos</h4>  
                        </div>
                        <div class="card-body">
                            <fieldset class="border p-2">
                                <legend class="w-auto t16 text-primary"><b>Datos Docente</b></legend>
                                <div class="form-group row" id="dni">  
                                    <div class="col-md-2">
                                        <label>Docente (*)</label>
                                    </div>                             
                                    <div class="col-md-5">
                                        <input type="text" v-model="docentearea.nombre" class="form-control form-control-sm" readonly>
                                    </div>
                                </div>    
                                <div class="form-group row">      
                                    <div class="col-md-2 text-left">
                                        <label>Nivel (*)</label>
                                    </div>
                                    <div class="col-md-3">
                                        <select v-model="docentearea.nivel" @change="getCursos(docentearea.nivel)" class="form-control form-control-sm">
                                            <option v-for="n in niveles" :key="n.ID" :value="n.ID">{{n.Nivel}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-2 text-left">
                                        <label>Area (*)</label>
                                    </div>
                                    <div class="col-md-6">
                                        <select v-model="docentearea.curso" @change="getAreas(docentearea.curso)" class="form-control form-control-sm">
                                            <option v-for="n in cursos" :key="n.ID" :value="n.ID">{{n.Curso}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-2 text-left">
                                        <label>Curso (*)</label>
                                    </div>
                                    <div class="col-md-6">
                                        <select v-model="docentearea.area" @change="getGrados(docentearea.nivel)" class="form-control form-control-sm">
                                            <option v-for="a in areas" :key="a.IDArea" :value="a.IDArea">{{a.Descripcion}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-2 text-left">
                                        <label>Lectivo (*)</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" v-model="docentearea.lectivo" class="form-control form-control-sm" onkeypress='return solonumeros(event)' maxlength="4">
                                    </div>
                                </div>
                                
                                <div class="form-group row" id="grados">
                                    <div class="col-md-2 text-left">
                                        <label>Seleccione grados (*)</label>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row" v-for="g in grados" :key="g.id">
                                            <div class="col-md-2">{{g.grado}}<input type="checkbox" @click="gradosArray(g.id)"> </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group row">
                                    <div class="col-md-2">
                                       <button class="btn bg-indigo" @click="addCursos()">Agregar <i class="fa fa-save"></i></button>
                                    </div>
                                    <div class="col-md-2">
                                        <button class="btn bg-olive" @click="volver()">volver <i class="fa fa-undo"></i></button>
                                    </div>
                                </div>
                            </fieldset>
                            <!--aquitermina el fieldset-->
                            <div class="clearfix"></div>
                        </div>
                    </div>

                    <div class="card card-info" id="tutoria">
                        <div class="card-header bg-azul text-center">
                            <h4 class="title">Asignar Tutor</h4>  
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Docente (*)</label>
                                        <input type="text" v-model="tutor.nombre" class="form-control form-control-sm" readonly>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label>Nivel (*)</label>
                                        <select v-model="tutor.nivel" @change="getGrados(tutor.nivel)" class="form-control form-control-sm">
                                            <option v-for="n in niveles" :key="n.ID" :value="n.ID">{{n.Nivel}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label>Grados (*)</label>
                                        <select v-model="tutor.grado" class="form-control form-control-sm">
                                            <option v-for="g in grados" :key="g.id" :value="g.id">{{g.grado}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label>Lectivo (*)</label>
                                        <input type="text" v-model="tutor.lectivo" class="form-control form-control-sm" onkeypress='return solonumeros(event)' maxlength="4">
                                    </div>
                                </div>
                            </div>
                            <div class="row text-left">
                                <div class="col-md-2">
                                    <button class="btn bg-indigo" @click="addTutor()">Agregar <i class="fa fa-save"></i></button>
                                </div>
                                <div class="col-md-2">
                                    <button class="btn bg-olive" @click="volver()">volver <i class="fa fa-undo"></i></button>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>

                </div>
	    	</div>

            <div class="row" id="lista">
                <div class="col-md-12">
                    <div class="card card-info">
	                <div class="card-header bg-azul text-center">
	                    <h4 class="title">Docentes 
                            <button  class="btn bg-navy altoBoton" @click="ocultar('1')">
                            <i class="fa fa-plus"></i>
                            </button>
                            </h4>  
	                </div>
	                <div class="card-body">
                        <div class="content table-responsive table-full-width">
                            <v-client-table class="t12" :data="docentes" :columns="columns" :options="options">
								<div slot="Acciones" slot-scope="props">
									<button class="btn btn-success altoBoton" data-toggle="tooltip" v-on:click="AgregarCursos(props.row)" data-placement="left" title="Agregar Cursos"><i class="fa fa-list" aria-hidden="true"></i></button>
									<button class="btn btn-primary altoBoton" data-toggle="tooltip" v-on:click="AgregarTutoria(props.row)" data-placement="left" title="Agregar Tutoría"><i class="fa fa-address-book" aria-hidden="true"></i></button>
									<button class="btn bg-indigo altoBoton" data-toggle="tooltip" v-on:click="edit(props.row)" data-placement="left" title="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></button>
									<button class="btn bg-navy altoBoton" data-toggle="modal" v-on:click="verDatos(props.row.DNI)" data-target="#modalDocente" title="Ver Ficha"><i class="fa fa-eye" aria-hidden="true"></i></button>
									<button v-if="props.row.Estado == 1" class="btn btn-danger altoBoton" data-toggle="tooltip" v-on:click="estado(props.row.DNI,0)" title="Desactivar">
                                    	<i class="fa fa-toggle-off" aria-hidden="true"></i>
                                    </button>
                                    <button v-if="props.row.Estado == 0" class="btn btn-success altoBoton" data-toggle="tooltip" v-on:click="estado(props.row.DNI,1)" title="Activar">
                                    	<i class="fa fa-toggle-on" aria-hidden="true"></i>
                                    </button>
								</div>
					        </v-client-table>
                        </div>
	                </div>
                    </div>
                </div>
            </div>
            <!-- modal begin -->
            <div class="modal fade " id="modalDocente" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                    <div class="modal-content">
                    <div class="modal-header bg-azul text-white text-center">
                        <h5 class=" text-center" id="ModalLabel">FICHA DOCENTE</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center">
                            <div v-if="!cargando" class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        
                        <div class="row" v-if="cargando">
                            <div class="col-md-9">
                                <div class="row">
                                    <div class="col-md-4 text-left"><b>DNI: </b></div>
                                    <div class="col-md-8 text-left">{{datos.DNI}}</div>
                                    <div class="col-md-4 text-left"><b>Nombre: </b></div>
                                    <div class="col-md-8 text-left">{{datos.Nombre}}</div>
                                    <div class="col-md-4 text-left"><b>Apellidos: </b></div>
                                    <div class="col-md-8 text-left">{{datos.Paterno+" "+datos.Materno}}</div>
                                    <div class="col-md-4 text-left"><b>Correo: </b></div>
                                    <div class="col-md-8 text-left">{{datos.Correo}}</div>
                                    <div class="col-md-4 text-left"><b>Dirección: </b></div>
                                    <div class="col-md-8 text-left">{{datos.Direccion}}</div>
                                    <div class="col-md-4 text-left"><b>Celular: </b></div>
                                    <div class="col-md-8 text-left">{{datos.Celular}}</div>
                                    <div class="col-md-4 text-left"><b>Cumpleaños: </b></div>
                                    <div class="col-md-8 text-left">{{datos.Cumple}}</div>
                                </div>
                                
                            </div>
                            
                            <div class="col-md-12"><hr></div>
                            <div class="col-md-12 text-center"><b>Lista de Cursos </b></div>
                           
                            <div class="col-md-12"><hr></div>
                        </div>
                       
                        <div v-if="cargando">
                            <table class="text-center table table-sm">
                                <tr class="bg-indigo">
                                    <td>Nivel</td>
                                    <td>Curso</td>
                                    <td>Grado - Sección</td>
                                    <td>Acciones</td>
                                </tr>
                                <tr v-for="c in cursosDesignados" :key="c.ID">
                                    <td>{{c.Nivel}}</td>
                                    <td>{{c.Curso}}</td>
                                    <td>{{c.grado}}</td>
                                    <td><button @click="eliminarRelacion(c.ID,datos.DNI)" title="eliminar curso" class="altoBoton btn btn-danger"><i class="fa fa-trash"></i></button></td>
                                </tr>
                            </table>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                </div>
            </div>
            <!-- modal end -->
	    </div>
	</div>
</template>

<script>
    export default {
    data() {
        return {
            docente: {
				dni:null,
				nombre:null,
				paterno:null,
				materno:null,
				fecha:null,
				dir:null,
                cel:null,
                correo:null,
                estado:null,
                genero:null,
            },
            docentearea: {
                nombre:null,
				docente:null,
				nivel:null,
				curso:null,
                area:null,
                lectivo:null
            },
            tutor:{
                docente:null,
                nombre:null,
                nivel:null,
                grado:null,
                lectivo:null,
            },
            docentes: [{
				DNI:null,
                Nombre:null,
                Paterno:null,
                Materno:null,
				Direccion:null,
                Celular:null,
                Correo:null,
                Fecha:null,
            }],
            columns: ["DNI","Nombre","Paterno","Materno","Direccion","Celular","Correo","Acciones"],
            options: {
                perPageValues : [5,10,15,20,25],
                perPage : 5,
                texts: {
                    filter: "Buscar:",
                    count: "Mostando {from} a {to} de {count} registros|{count} registros|Un registro",
                    first: 'Primero',
                    last: 'Último',
                    filterPlaceholder: "Buscar",
                    limit: "Registros:",
                    page: "Pagina:",
                    noResults: "No se encontraron registros",
                    filterBy: "Filtrar por {column}",
                    loading: 'Cargando...',
                    defaultOption: 'Seleccionar {column}',
                    columns: 'Columnas'
                },
				headings:
				{
				// CodDocente:"Código",
				DNI:"DNI",
				Nombre:"Nombre",
                Materno:"A. Materno",
                Paterno:"A. Paterno",
                Direccion:"Dirección",
                Celular:"Telefono",
                Correo:"E-Mail",
				},
				sortable: ["DNI","Nombre","Paterno","Materno","Direccion","Celular","Correo"],
				filterable: ["DNI","Nombre","Paterno","Materno","Direccion","Celular","Correo"]
            },
            gradosAsignados:[],
            niveles:[],
            cursos:[],
            areas:[],
            grados:[],
            editar:false,
            cargando:false,
            datos:[],
            cursosDesignados:[]
        }
	},
	mounted()
	{
		$('#cod').hide();
        $('#objetivo').hide();
		$('#cursos').hide();
		$('#grados').hide();
		$('#editar').hide();
		$('#tutoria').hide();
    },
    created()
    {
		this.getData();
        this.getNiveles();
    },
    methods: {
        eliminarRelacion(id,dni)
        {
            this.$Progress.start();
            axios.get("deleteCursoDocente/"+id)
            .then(data=>
            {
                swal(
                    {
                        type: data.data.type,
                        text: data.data.text,
                    });
                this.verDatos(dni);
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        verDatos(dni)
        {
            this.cargando = false;
            this.$Progress.start();
            axios.get("datosDocente/"+dni)
            .then(data=>
            {
                this.datos = data.data.datosDocente;
                this.cursosDesignados = data.data.docenteCursos;
                this.cargando = true;
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        load()
        {
            this.docente.dni        = null;
            this.docente.nombre     = null;
            this.docente.paterno    = null;
            this.docente.materno    = null;
            this.docente.fecha      = null;
            this.docente.dir        = null;
            this.docente.cel        = null;
            this.docente.correo     = null;
            this.docente.estado     = null;
            this.docente.genero     = null;
            this.docentearea.nombre = null;
            this.docentearea.docente= null;
            this.docentearea.nivel  = null;
            this.docentearea.curso  = null;
            this.docentearea.area   = null;
            this.docentearea.lectivo= null;            
            this.tutor.docente      = null;
            this.tutor.nombre       = null;
            this.tutor.nivel        = null;
            this.tutor.grado        = null;
            this.tutor.lectivo      = null;
            this.gradosAsignados=[];
            this.editar = false;
        },
        AgregarCursos(docente)
        {
            this.gradosAsignados=[];
            $("#cursos").show();
            $("#objetivo").hide();
            $("#tutoria").hide();
            $("#lista").hide();
            var fecha = new Date();
			var year = fecha.getFullYear();
			this.docentearea.lectivo = year;
            this.docentearea.docente = docente.DNI;
            this.docentearea.nombre  = docente.Nombre + " " + docente.Paterno + " " + docente.Materno;
        },
        AgregarTutoria(docente)
        {
            $("#cursos").hide();
            $("#objetivo").hide();
            $("#tutoria").show();
            $("#lista").hide();
            var fecha = new Date();
			var year = fecha.getFullYear();
			this.tutor.lectivo = year;
            this.tutor.docente = docente.DNI;
            this.tutor.nombre  = docente.Nombre + " " + docente.Paterno + " " + docente.Materno;
        },
        getCursos(nivel)
        {
            this.$Progress.start();
            axios.get("getCursos/"+nivel)
            .then(data=>
            {
                this.cursos = data.data.cursos;
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        consultaDNI(dni)
        {
            this.$Progress.start();
            axios.get("consultaDNI/"+dni)
            .then(data=>
            {
                this.docente.nombre     = data.data.nombres;
                this.docente.paterno    = data.data.paterno;
                this.docente.materno    = data.data.materno;
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        getGrados(nivel)
        {
    		$('#grados').show();
            this.$Progress.start();
            axios.get("Grados/"+nivel)
            .then(data=>
            {
                this.grados = data.data.grados;
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        getAreas(curso)
        {
            this.$Progress.start();
            axios.get("getAreas/"+curso)
            .then(data=>
            {
                this.areas = data.data.areas;
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        getNiveles()
        {
            this.$Progress.start();
            axios.get("getNiveles")
            .then(data=>
            {
                this.niveles = data.data.niveles;
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        getData()
        {
            axios.get("getDocentes")
            .then(data=>
            {
                this.docentes = data.data.docentes;
                console.log(data);
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        registrar(id)
		{
            if(id == 1)
            {
                axios.post("addDocente",{
                    docente:this.docente
                }).then(data=>{
                    console.log(data);
                    swal({
                        type: data.data.val,
                        title: data.data.msj,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    // setTimeout(() => {
                    //     location.reload();
                    // }, 1500);
                    this.load();
                    this.ocultar(2);
                    this.getData();
                }).catch(error=>{
                    console.log(error);	
                })
            }else if(id == 2)
            {
                axios.post("updateDocente",{
                    docente:this.docente
                }).then(data=>{
                    console.log(data);
                    swal({
                        type: "success",
                        title: "Datos actualizados correctamente",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    // setTimeout(() => {
                    //     location.reload();
                    // }, 1500);
                    this.load();
                    this.ocultar(2);
                    this.getData();
                }).catch(error=>{
                    console.log(error);	
                })
            }
			
        },
        addCursos()
		{
			axios.post("addDocenteArea",{
                docentearea:this.docentearea,
                gradosAsignados:this.gradosAsignados                
			}).then(data=>{
				console.log(data);
				swal({
                    type: 'success',
                    title: 'Cursos Asignados Corretamente',
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(() => {
                    location.reload();
                }, 1500);
			}).catch(error=>{
				console.log(error);	
			})
        },
        addTutor()
		{
			axios.post("addTutor",{
                tutor:this.tutor                
			}).then(data=>{
                console.log(data);
                    swal({
                    type: data.data.val,
                    title: data.data.msj,
                    showConfirmButton: false,
                    timer: 2000
                    });
                    // setTimeout(() => {
                    //     location.reload();
                    // }, 1500);
                    this.load();
                    this.ocultar(2);
                    this.getData();
				
			}).catch(error=>{
                swal({
                    type: 'error',
                    title: 'Consulte con un administrador',
                    showConfirmButton: false,
                    timer: 2000
                });
				console.log(error);	
			})
		},
		ocultar(id){
			if(id == '1')
			{
                this.load();
                $('#objetivo').show();	
                $('#agregar').show();	
                $('#cursos').hide();	
                $('#cod').hide();
                $('#grados').hide();
                $('#editar').hide();
                $('#tutoria').hide();
                $('#lista').hide();
                $("#dni").show();
			}
			else if(id == '2')
			{
				$('#objetivo').hide();	
                $('#cursos').hide();	
                $('#cod').hide();
                $('#grados').hide();
                $('#editar').hide();
                $('#tutoria').hide();
                $('#lista').show();
			}
        },
        gradosArray(id)
        {
            var n = this.gradosAsignados.indexOf(id);
			if(n == -1)
			{
				this.gradosAsignados.push(id);
			}else{
				this.gradosAsignados.splice(n,1);
			}
			console.log(this.gradosAsignados);
        },
        volver()
        {
            this.load();
            this.ocultar(2);
            // location.reload();
        },
        edit(docente)
        {
            $("#cursos").hide();
            $("#objetivo").show();
            $("#agregar").hide();
            $("#editar").show();
            $("#tutoria").hide();
            $("#dni").hide();
            $("#lista").hide();
            this.editar             = true;
            this.docente.dni        = docente.DNI;
            this.docente.nombre     = docente.Nombre;
            this.docente.paterno    = docente.Paterno;
            this.docente.materno    = docente.Materno;
            this.docente.dir        = docente.Direccion;
            this.docente.cel        = docente.Celular;
            this.docente.correo     = docente.Correo;
            this.docente.fecha      = docente.Fecha;
            this.docente.genero     = docente.Genero;
        },
        estado(dni,estado)
        {
            this.docente.dni = dni;
            this.docente.estado = estado;
            axios.post("estadoDocente",{
                    docente:this.docente
                }).then(data=>{
                    console.log(data);
                    swal({
                        type: "success",
                        title: "Datos actualizados correctamente",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.load();
                    this.ocultar(2);
                    this.getData();
                }).catch(error=>{
                    console.log(error);	
                })
        }
    }
}

</script>
