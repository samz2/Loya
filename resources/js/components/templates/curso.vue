<template>
    <div class="content">
	    <div class="container-fluid"  id="cabecera" >
	    	<div class="row">
			 <div class="col-md-12">
				<!-- <div class="row">
					<div class="col-md-3">
						<div class="form-group">
							<button  class="btn btn-outline-primary" @click="ocultar('1')">
							Area <i class="fa fa-plus"></i>
							</button>
							<button  class="btn btn-outline-primary" @click="ocultar('2')">
								<i class="fa fa-minus"></i>
							</button>
						</div>
					</div>
				</div> -->
	            <div class="card card-info"  id="objetivo">
	                <div class="card-header bg-azul text-center">
	                    <h4 class="title">AREA</h4>  
	                </div>
					<div class="card-body">
                        <div class="row">
                            <div class="col-md-4" id="nivel">
                                <div class="form-group">
                                    <label>Nivel (*)</label>
                                    <select v-model="curso.nivel" class="form-control form-control-sm">
                                        <option v-for="n in niveles" :key="n.ID" :value="n.ID">{{n.Nivel}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <label>Area (*)</label>
                                    <input type="text" class="form-control form-control-sm" v-model="curso.curso">
                                </div>
                            </div>
                        </div>
                        <div class="row" id="grados">
                            <label>Seleccione grados (*)</label>
                            <div class="col-md-1" v-for="g in grados" :key="g.id">
                                {{g.grado}}{{g.seccion}} <input type="checkbox" @click="gradosArray(g.id)"> 
                            </div>
                        </div>
                        <div class="row text-left">
                            <div class="col-md-2">
                                <button @click="addCurso()" id="add" class="btn bg-indigo">Agregar <i class="fa fa-save"></i></button>
                                <button @click="editCurso()" id="edit" class="btn bg-indigo">Editar <i class="fa fa-edit"></i></button>
                            </div>
                            <div class="col-md-2">
                                <button @click="ocultar(2)"  class="btn bg-olive">volver <i class="fa fa-undo"></i></button>
                            </div>
                        </div>
                        <div class="clearfix"></div>
	                </div>
				</div>
			</div>
	    	</div>
			<div class="row" id="tabla">
			 <div class="col-md-12">
				<div class="card card-info">
	                <div class="card-header bg-azul text-center">
	                    <h4 class="title">AREAS <button  class="btn bg-navy" @click="ocultar('1')">
							<i class="fa fa-plus"></i>
							</button></h4>  
	                </div>
	                <div class="card-body">
						<div class="content table-responsive table-full-width">
                            <v-client-table :data="cursos" :columns="columns" :options="options">
								<div slot="Acciones" slot-scope="props">
								<button class="btn altoBoton bg-indigo" data-toggle="tooltip" v-on:click="edit(props.row.ID,props.row.Curso)" data-placement="left" title="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></button>
								<button class="btn btn-danger altoBoton" data-toggle="tooltip" v-on:click="deleteCurso(props.row.ID)" data-placement="left" title="Eliminar"><i class="fa fa-trash" aria-hidden="true"></i></button>
								<!-- <button class="btn btn-success btn-sm" style="padding: 2px 8px; font-size: 12px;" data-toggle="tooltip" v-on:click="getGrados(props.row.ID,props.row.Curso,props.row.IDNivel)" data-placement="left" title="Asignar"><i class="fa fa-list" aria-hidden="true"></i></button> -->
                                </div>
						    </v-client-table>
                        </div>
					</div>
	    		</div>
			 </div>
			</div>	
	</div>
    </div>	
</template>

<script>
    export default {
    data() {
        return {
			curso:{
                id:null,
                nivel:null,
				curso:null,
			},
			niveles:[],
			cursos	:[{
				ID:null,
                Nivel:null,
                Curso:null,
                IDNivel:null
            }],
            columns: ["Nivel","Curso","Acciones"],
            options: {
                perPageValues : [5,10,15,20,25],
                perPage : 5,
                texts: {
                    filter: "Buscar:",
                    count: "Mostando {from} a {to} de {count} registros|{count} registros|Un registro",
                    first: 'Primero',
                    last: '??ltimo',
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
					ID: "ID",
					Curso:"Area",
					Nivel: "Nivel",
					Acciones: "Acciones",
					
				},
				sortable    : ["Nivel","Curso"],
				filterable  : ["Nivel","Curso"]
            },
            grados:[],
            tipo:null,
            gradosAsignados:[]
        }
	},
	created(){
        this.getDatos();
		this.getAutenticacion();
		this.getCursos();
	},
	mounted(){
        $('#objetivo').hide();
        $('#edit').hide();
        $('#grado').hide();
        $('#grados').hide();
	},
    methods: {
        load()
        {
            this.curso.id      = null;
            this.curso.nivel   = null;
            this.curso.curso   = null;
        },
        getAutenticacion()
        {
            this.$Progress.start();
            axios.get("autenticacion")
            .then(data=>
            {
                this.id = data.data.id;
                if(this.id == 1)
                {
                    $('#cabecera').show();
                    $('#error').hide();
                }else{
                    $('#cabecera').hide();
                    $('#error').show();
                }
                this.$Progress.finish();
                console.log(this.primaria);
            }
            ).catch(error=>{
                console.log(error);
            });
            
        },
        getGrados(id,curso,nivel)
        {
            $('#objetivo').show();
            $('#grado').show();
            $('#grados').show();
            $('#edit').hide();
            $('#add').hide();
            $('#nivel').hide();
            $('#tabla').hide();
            this.curso.id = id;
            this.curso.curso = curso;
            this.$Progress.start();
            axios.get("Grados/"+nivel)
            .then(data=>
            {
                this.grados = data.data.grados;
                this.$Progress.finish();
                console.log(data.data);
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        getCursos()
        {
            this.$Progress.start();
            this.curso.nivel = null;
            this.curso.curso = null;
            $("#objetivo").hide();
            axios.get("getCursos")
            .then(data=>
            {
                this.cursos = data.data.cursos;
                this.$Progress.finish();
                console.log(data.data);
            }
            ).catch(error=>{
                console.log(error);
            })
		},
		getDatos()
        {
            this.$Progress.start();
            axios.get("getNiveles")
            .then(data=>
            {
                this.niveles = data.data.niveles;
                this.$Progress.finish();
                console.log(data.data);
            }
            ).catch(error=>{
                console.log(error);
            })
		},
		addCurso()
		{
            if(this.curso.curso == null || this.curso.nivel == null)
            {
                swal({
					type: 'error',
					title: 'Llenar los datos obligatorios',
					showConfirmButton: false,
					timer: 2000
				});
            }else{
                this.$Progress.start();
                axios.post("addCurso",{
                    curso:this.curso
                }).then(data=>{
                    swal({
                        // position: 'top-end',
                        type: 'success',
                        title: 'Datos ingresados correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.$Progress.finish();
                    this.load();
                    this.ocultar(2);
                    this.getCursos();
                }).catch(error=>{
                    console.log(error);	
                    swal({
                        type: 'error',
                        title: 'Error',
                        text: 'Verifique los campos los campos obligatorios',
                        showConfirmButton: true,
                    });
                })
            }
			
		},
		ocultar(id){
			if(id == '1')
			{
                $('#objetivo').show();
                $('#nivel').show();
                $('#grados').hide();
                $('#grado').hide();
                $('#tabla').hide();
                $('#add').show();
                this.load();
			}
			else if(id == '2')
			{
                $('#tabla').show();
				$('#objetivo').hide();	
				$('#edit').hide();	
			}
			
		},
        deleteCurso(id)
        {
			this.$Progress.start();
            swal({
                title: '??Deseas eliminar este Curso?',
                text: "No ser?? posible revertir esta acci??n!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'cancelar',
            }).then((result) => {
                if (result.value) {
                    axios.get(`/deleteCurso/${id}`)
                        .then(data => {
                        if(data.data=="OK"){
                            swal(
                            'Eliminado!',
                             'El Curso ha sido eliminado.',
                             'success'
								);
						this.$Progress.finish();
						this.getCursos();
                        }
                        }).catch(error => {
                            console.log('Ocurrio un error ' + error);
                            this.$Progress.fail();
                        });
                     }
                });
		},
		edit(id,curso)
		{
			$('#objetivo').show();
            $('#edit').show();
            $('#add').hide();
            $('#nivel').hide();
            $('#grado').hide();
            $('#grados').hide();
            $('#tabla').hide();
            this.curso.id = id;
            this.curso.curso = curso;
		},
		editCurso()
		{
			axios.post("editCurso",{
				curso:this.curso
			}).then(data=>{
				console.log(data);
				swal({
					// position: 'top-end',
					type: 'success',
					title: 'Area editada correctamente',
					showConfirmButton: false,
					timer: 2000
                });
                $('#objetivo').hide();
                $('#edit').hide();
                $('#add').show();
                $('#tabla').show();
                this.load();
                this.ocultar(2);
				this.getCursos();
			}).catch(error=>{
				console.log(error);	
				swal({
					type: 'error',
					title: 'Error',
					text: 'Verifique los campos los campos obligatorios',
					showConfirmButton: true,
				});
			})
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
        gradoscursos()
        {
             this.$Progress.start();
                axios.post("asignGradoCurso",{
                    curso:this.curso,
                    gradosAsignados:this.gradosAsignados,
                }).then(data=>{
                    swal({
                        // position: 'top-end',
                        type: 'success',
                        title: 'Datos ingresados correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.$Progress.finish();
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                    // this.getCursos();
                }).catch(error=>{
                    console.log(error);	
                    swal({
                        type: 'error',
                        title: 'Error',
                        text: 'Comuniquese con el administrador del sistema',
                        showConfirmButton: true,
                    });
                })
        }
    }
}
</script>
