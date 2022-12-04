<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
				<!-- <div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<button  class="btn btn-outline-primary" @click="ocultar('1')">
							Curso <i class="fa fa-plus"></i>
							</button>
							<button  class="btn btn-outline-primary" @click="ocultar('2')">
								<i class="fa fa-minus"></i>
							</button>
						</div>
					</div>
				</div> -->
	            <div class="card card-info"  id="objetivo">
	                <div class="card-header bg-azul text-center">
	                    <h4 class="title">Cursos</h4>  
	                </div>
                    <div class="card-body">
                        <fieldset class="border p-2">
                            <legend class="w-auto t16 text-primary"><b>Datos</b></legend>
                            <div class="form-group row">  
                                <div class="col-md-2">
                                <label>Nivel (*)</label>  
                                </div>                             
                                <div class="col-md-3">
                                   <select v-model="area.nivel" class="form-control form-control-sm" @change="getCursos(area.nivel)">
                                        <option v-for="n in niveles" :key="n.ID" :value="n.ID">{{n.Nivel}}</option>
                                    </select>
                                </div>
                            </div>    
                            <div class="form-group row">      
                                 <div class="col-md-2 text-left">
                                    <label>Area (*)</label>
                                 </div>
                                <div class="col-md-5">
                                    <select v-model="area.curso" class="form-control form-control-sm">
                                        <option v-for="c in cursos" :key="c.ID" :value="c.ID">{{c.Curso}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Curso (*)</label>
                                </div>
                                <div class="col-md-5">
                                     <input type="text" onkeypress='return soloLetras(event)' v-model="area.area" class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="form-group row">
                                
                                <label class="col-md-2 col-form-label">Posicion (*)</label>
                                <div class="col-md-1">
                                     <input type="text" v-model="area.posicion" onkeypress='return solonumeros(event)' maxlength="2" class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-2">
                                    <button @click="editArea()" id="editar" class="btn bg-indigo">Editar <i class="fa fa-edit"></i></button>
                                    <button @click="addArea()" id="add" class="btn bg-indigo">Agregar <i class="fa fa-save"></i></button>
                                </div>
                                <div class="col-md-2">
                                    <button @click="ocultar(2)" class="btn bg-olive">Volver <i class="fa fa-undo"></i></button>
                                </div>
                            </div>
                        </fieldset>
                        <div class="clearfix"></div>
	                </div>
				</div>
			</div>
	    	</div>
            <div class="row" id="areas">
                <div class="col-md-12">
                    <div class="card card-info">
                            <div class="card-header bg-azul text-center">
                                <h4 class="title">Cursos 
                                <button  class="btn bg-navy btn-sm" @click="ocultar('1')">
							        <i class="fa fa-plus"></i>
							        </button>
                                </h4>  
                            </div>
                        <div class="card-body t11">
                            <div class="content table-responsive table-full-width">
                                <v-client-table :data="areas" :columns="columns" :options="options">
                                    <div slot="Acciones" slot-scope="props">
                                        <button class="btn bg-indigo altoBoton" data-toggle="tooltip" v-on:click="edit(props.row.IDArea,props.row.IDCurso,props.row.IDNivel,props.row.Descripcion,props.row.Posicion)" data-placement="left" title="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                        <button class="btn btn-danger altoBoton" data-toggle="tooltip" v-on:click="deleteArea(props.row.IDArea)" data-placement="left" title="Eliminar"><i v-on:click="deleteArea(props.row.IDArea)" title="Eliminar" class="fa fa-trash" aria-hidden="true"></i></button>
                                    </div>
                                </v-client-table>
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
			area:{
                id:null,
                nivel:null,
                curso:null,
                area:null,
                posicion:null
			},
            niveles:[],
            cursos:[],
			areas	:[{
				IDArea:null,
                IDNivel:null,
                Nivel:null,
                IDCurso:null,
                curso:null,
                Descripcion:null,
                Posicion:null
            }],
            columns: ["Nivel","curso","Descripcion","Posicion","Acciones"],
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
                // skin : "table table-hover",
				headings:
				{
                    Nivel:"Nivel",
                    curso:"Area",
                    Descripcion:"Curso",
                    Posicion:"Posición",
					Acciones: "Acciones",
					
				},
				sortable    : ["Nivel","curso","Descripcion","Posicion"],
				filterable  : ["Nivel","curso","Descripcion","Posicion"]
            },
            tipo:null,
        }
	},
	created(){
        this.getDatos();
        this.getAreas();
	},
	mounted(){
        $('#objetivo').hide();
        $('#editar').hide();
        $('#grado').hide();
	},
    methods: {
        load()
        {
            this.area.id        = null;
            this.area.nivel     = null;
            this.area.curso     = null;
            this.area.area      = null;
            this.area.posicion  = null;     
            this.cursos         = [];   
        },
        getCursos(id)
        {
            this.$Progress.start();
            axios.get('getCursos/'+id)
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
        getAreas()
        {
            this.$Progress.start();
            axios.get("getAreas")
            .then(data=>
            {
                this.areas = data.data.areas;
                this.$Progress.finish();
                console.log(data.data);
            }
            ).catch(error=>{
                console.log(error);
            })
		},
		addArea()
		{
            if(this.area.curso == null || this.area.nivel == null || this.area.area == null)
            {
                swal({
					type: 'error',
					title: 'Llenar los datos obligatorios',
					showConfirmButton: false,
					timer: 2000
				});
            }else{
                this.$Progress.start();
                axios.post("addArea",{
                    area:this.area
                }).then(data=>{
                    swal({
                        // position: 'top-end',
                        type: 'success',
                        title: 'Datos ingresados correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.$Progress.finish();
                    // setTimeout(() => {
                    //     location.reload();
                    // }, 1500);
                    this.load();
                    this.getAreas();
                    this.ocultar(2);
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
                this.load();
                $('#objetivo').show();
                $('#nivel').show();
                $('#add').show();
                $('#curso').show();
                $('#editar').hide();
                $('#areas').hide();
			}
			else if(id == '2')
			{
				$('#objetivo').hide();	
				$('#areas').show();	
			}
			
		},
        deleteArea(id)
        {
			this.$Progress.start();
            swal({
                title: '¿Deseas eliminar este Curso?',
                text: "No será posible revertir esta acción!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'cancelar',
            }).then((result) => {
                if (result.value) {
                    axios.get(`/deleteArea/${id}`)
                        .then(data => {
                        if(data.data=="OK"){
                            swal(
                            'Eliminado!',
                             'el curso ha sido eliminado.',
                             'success'
								);
						this.$Progress.finish();
						this.getAreas();
                        }
                        }).catch(error => {
                            console.log('Ocurrio un error ' + error);
                            this.$Progress.fail();
                        });
                     }
                });
		},
		edit(id,curso,nivel,area,posicion)
		{
            this.getCursos(nivel);
			$('#objetivo').show();
            $('#nivel').show();
            $('#add').hide();
            $('#curso').show();
            $('#editar').show();
            $('#areas').hide();
            this.area.id = id;
            this.area.curso = curso;
            this.area.nivel = nivel;
            this.area.area = area;
            this.area.posicion = posicion;
		},
		editArea()
		{
			axios.post("editArea",{
				area:this.area
			}).then(data=>{
				console.log(data);
				swal({
					// position: 'top-end',
					type: 'success',
					title: 'Curso editado correctamente',
					showConfirmButton: false,
					timer: 2000
                });
                this.load();
                this.ocultar(2);
                this.area.id = null;
                this.area.area = null;
				this.getAreas();
			}).catch(error=>{
				console.log(error);	
				swal({
					type: 'error',
					title: 'Error',
					text: 'Comuniquese con el administrador del sistema',
					showConfirmButton: true,
				});
			})
        },
    }
}
</script>
