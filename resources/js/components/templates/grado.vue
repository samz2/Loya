<template>
    <div class="content">
	    <div class="container-fluid">
	    	<div class="row">
			 <div class="col-md-12">
	            <div class="card card-info"  id="objetivo">
	                <div class="card-header bg-azul text-center">
	                    <h4 class="title">Grados</h4>  
	                </div>
					<div class="card-body">
	                        <div class="row">
                                <div class="col-md-4">
	                                <div class="form-group">
	                                    <label>Nivel</label>
										<select v-model="grado.nivel" class="form-control" @change="zgrado(grado.nivel)">
											<option v-for="n in niveles" :key="n.ID" :value="n.ID">{{n.Nivel}}</option>
										</select>
	                                </div>
	                            </div>
                                <div class="col-md-3">
	                                <div class="form-group">
	                                    <label>Grado</label>
	                                	<select v-model="grado.grado" class="form-control" >
											<option v-for="d in dataGrados" :key="d.val" :value="d.val">{{d.grado}}</option>
										</select>
									</div>
	                            </div>
								<div class="col-md-3">
	                                <div class="form-group">
	                                    <label>Sección</label>
	                                	<select v-model="grado.seccion" class="form-control" >
											<option v-for="s in secciones" :key="s.val" :value="s.val">{{s.seccion}}</option>
										</select>
									</div>
	                            </div>
							</div>
							<div class="row text-left">
								<div class="col-md-2">
									<button @click="addGrado()" id="add" class="btn bg-indigo">Agregar <i class="fa fa-save"></i></button>
								</div>
								<div class="col-md-2">
									<button  class="btn bg-olive" @click="ocultar('2')">
									volver <i class="fa fa-undo"></i>
									</button>
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
	                    <h4 class="title">GRADOS <button  class="btn bg-navy altoBoton" @click="ocultar('1')">
							 <i class="fa fa-plus"></i>
							</button></h4>  
	                </div>
	                <div class="card-body">
						<div class="content table-responsive table-full-width">
                            <v-client-table :data="grados" :columns="columns" :options="options">
								<div slot="Acciones" slot-scope="props">
								<button class="btn btn-danger btn-sm altoBoton" data-toggle="tooltip" v-on:click="deleteGrado(props.row.id)" data-placement="left" title="Eliminar"><i class="fa fa-trash" aria-hidden="true"></i></button>
								<button class="btn btn-info btn-sm altoBoton" data-toggle="tooltip" v-on:click="edit(props.row.id,props.row.Nivel)" data-placement="left" title="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></button>
								<button class="btn bg-indigo btn-sm altoBoton" data-toggle="modal" v-on:click="addHorario(props.row)" data-target="#horario" title="Agregar Horario"><i class="fa fa-calendar" aria-hidden="true"></i></button>
                                </div>
						    </v-client-table>
                        </div>
					</div>
	    		</div>
			 </div>
			</div>	
	</div>
    <!-- modal -->
	<div class="modal fade" id="horario" tabindex="-1" role="dialog" aria-labelledby="horarioLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                <div class="modal-header bg-azul text-white text-center">
                    <h5 class=" text-center" id="horarioLabel">Agregar Horario</h5>
                    <button type="button" class="close" @click="cancelHorario()" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
					<div class="row">
						<div class="col-md-12"><hr></div>
					</div>	
					<div class="row justify-content-center">
						<div class="col-md-4 text-left"><b>Nivel: </b></div>
						<div class="col-md-8 text-left">{{horario.nivel}}</div>
						<div class="col-md-4 text-left"><b>Grado: </b></div>
						<div class="col-md-8 text-left">{{horario.grado}}</div>
						<div class="col-md-4 text-left"><b>Sección: </b></div>
						<div class="col-md-8 text-left">{{horario.seccion}}</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-md-12"><hr></div>
					</div>
					<div class="row" v-if="horario.url == ''">
						<div class="col-md-12">
							<h5 class="text-success">Seleccione un archivo</h5>
						</div>
						<div class="col-md-2">
							<input @change="arc" type="file" id="archivo">
						</div>
					</div>
					<div class="row" v-else-if="horario.url != '' && cargando">
						<table class="table table-sm table-bordered table-striped">
							<tr>
								<th>Archivo</th>
								<th>Eliminar</th>
							</tr>
							<tr>
								<td><a :href="horario.url" download="horario" >{{"Horario"}}</a></td>
								<td><button class="btn btn-danger altoBoton" @click="deleteHorario(horario.idgrado)"> <i class="fa fa-trash"></i></button></td>
							</tr>
						</table>
					</div>
					
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="insHorario()">Agregar</button>
                    <button type="button" class="btn btn-danger" @click="cancelHorario()" data-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
        </div>
	<!-- end -->
    </div>	
</template>

<script>
    export default {
    data() {
        return {
			grado:{
                id:null,
                nivel:null,
				grado:null,
				seccion:null
			},
			niveles:[],
			grados	:[{
				id:null,
				grado:null,
				seccion:null,
				Nivel:null,
            }],
            columns: ["Nivel","grado","seccion","Acciones"],
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
					id: "ID",
					grado:"Grado",
					seccion:"Seccion",
					Nivel: "Nivel",
					Acciones: "Acciones",
					
				},
				sortable    : ["grado","seccion","Nivel"],
				filterable  : ["grado","seccion","Nivel"]
            },
            tipo:null,
			dataGrados:[],
			primaria:[
				{ 
				val:1,
				grado:"Primero"
				},
				{
				val:2,grado:"Segundo"
				},
				{
				val:3,grado:"Tercero"
				},
				{
				val:4,grado:"Cuarto"
				},
				{
				val:5,grado:"Quinto"
				},
				{
				val:6,grado:"Sexto"
				}
				],
			secundaria:[
				{ 
				val:1,
				grado:"Primero"
				},
				{
				val:2,grado:"Segundo"
				},
				{
				val:3,grado:"Tercero"
				},
				{
				val:4,grado:"Cuarto"
				},
				{
				val:5,grado:"Quinto"
				}
			],
			secciones:[
				{ 
				val:"A",
				seccion:"A"
				},
				{
				val:"B",seccion:"B"
				},
				{
				val:"C",seccion:"C"
				},
				{
				val:"D",seccion:"D"
				},
			],
			horario:
			{
				idgrado : null,
				archivo : null,
				nivel : null,
				grado : null,
				seccion : null,
				ext : null,
				url : null,
			},
			cargando: false
        }
	},
	created(){
        this.getDatos();
		this.getGrados();
	},
	mounted(){
        $('#objetivo').hide();
        $('#edit').hide();
        $('#error').hide();
	},
    methods: {
		deleteHorario(grado)
	   	{
			this.$Progress.start();
			axios.get("delHorario/"+grado)
			.then(data=>
			{
				swal({
					type: "success",
					text: "Horario eliminado con éxito",
					showConfirmButton: false,
					timer: 2000
				});
				this.$Progress.finish();
				setTimeout(() => {
                        location.reload();
                    }, 1500);
			}
			).catch(error=>{
				console.log(error);
			})
	   	},	
	   addHorario(grado)
	   {
		   	this.horario.idgrado = grado.id; 
		   	this.horario.nivel 	= grado.Nivel; 
		   	this.horario.grado 	= grado.grado; 
		   	this.horario.seccion = grado.seccion; 
			
			this.$Progress.start();
			this.cargando = false;
			axios.get("getHorario/"+grado.id)
			.then(data=>
			{
				this.cargando = true;
				this.horario.url = data.data.url;
				this.$Progress.finish();
			}
			).catch(error=>{
				console.log(error);
			})
	   },
	   cancelHorario()
	   {
		   this.horario.idgrado = null; 
		   this.horario.nivel 	= null; 
		   this.horario.grado 	= null; 
		   this.horario.seccion = null;
		   $("#archivo").val(""); 
	   },
	   insHorario()
	   {
		   this.$Progress.start();
			axios.post("addHorario",{
				horario:this.horario
			}).then(data=>{
				swal({
					type: data.data.type,
					text: data.data.text,
					showConfirmButton: false,
					timer: 2000
				});
				this.$Progress.finish();
				setTimeout(() => {
                        location.reload();
                    }, 1500);
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
	   arc(e)
        {
			
            var size = e.target.files[0].size;
			var name = e.target.files[0].name;
			var type = e.target.files[0].type;
			this.horario.ext = name.split('.').pop();
			console.log(type.includes("image"));
			console.log(type);
			if(!type.includes("image") && !type.includes("pdf"))
			{
				swal({
					type : "warning",
					text : "debe seleccionar una imagen o un documento PDF",
					showConfirmButton : false,
					timer : 2000,
				});
				$("#archivo").val("");
				return;
			}
			if(size > 1000000)
            {
				swal({
					type : "warning",
					text : "tamaño max. 1mb",
					showConfirmButton : false,
					timer : 2000,
				});
				$("#archivo").val("");
				return;
			}
            var files = new FileReader();
            files.readAsDataURL(e.target.files[0]);
            files.onload = (e) =>
            {
			   this.horario.archivo    = e.target.result;
            }
            
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
		getGrados()
        {
            this.$Progress.start();
            axios.get("getGrados")
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
		addGrado()
		{
			this.$Progress.start();
			axios.post("addGrado",{
				grado:this.grado
			}).then(data=>{
				console.log(data);
				swal({
					type: 'success',
					title: 'Datos ingresados correctamente',
					showConfirmButton: false,
					timer: 2000
				});
				this.$Progress.finish();
				setTimeout(() => {
                        location.reload();
                    }, 1500);
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
		ocultar(id){
			if(id == '1')
			{
				$('#objetivo').show();
				$('#add').show();
				$('#tabla').hide();	
			}
			else if(id == '2')
			{
				$('#objetivo').hide();	
				$('#tabla').show();	
				this.load();
			}
			
		},
        deleteGrado(id)
        {
			this.$Progress.start();
            swal({
                title: '¿Deseas eliminar este Grado?',
                text: "No será posible revertir esta acción!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'cancelar',
            }).then((result) => {
                if (result.value) {
                    axios.get(`/deleteGrado/${id}`)
                        .then(data => {
                        if(data.data=="OK"){
                            swal(
                            'Eliminado!',
                             'El Grado ha sido eliminado.',
                             'success'
								);
                        this.$Progress.finish();
                        setTimeout(() => {
                            location.reload();
                        }, 1500);
                        }
                        }).catch(error => {
                            console.log('Ocurrio un error ' + error);
                            this.$Progress.fail();
                        });
                     }
                });
		},
		edit(id,nivel)
		{
			$('#objetivo').show();
            $('#edit').show();
            $('#add').hide();
            $('#tabla').hide();
            this.nivel.id = id;
            this.nivel.nivel = nivel;
            console.log(id,nivel);
		},
		
		zgrado(e)
		{
			if(e == 1)
			{
				this.dataGrados = this.primaria;
			}else if(e == 2)
			{
				this.dataGrados = this.secundaria;
			}
		},
		load()
		{
			this.grado.grado 	= null;
			this.grado.seccion 	= null;
			this.grado.id 		= null;
			this.grado.nivel 	= null;
		}
    }
}
</script>