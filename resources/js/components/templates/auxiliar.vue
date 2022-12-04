<template>
    <div class="content">
	    <div class="container-fluid">
	    	<div class="row">
			 <div class="col-md-12">
				<div class="row">
				
				</div>
	            <div class="card card-info" id="objetivo">
	                <div class="card-header bg-azul text-center">
	                    <h4 class="title">Auxiliar</h4>  
	                </div>
					<div class="card-body">
						<fieldset class="border p-2">
                            <legend class="w-auto t16 text-primary"><b>Datos</b></legend>
                            <div class="form-group row">  
                                <div class="col-md-2 text-left">
                                <label>DNI (*)</label>
                                </div>                             
                                <div class="col-md-3">
                                   <input type="text" v-if="!editar" v-model="aux.dni" class="form-control form-control-sm" onkeypress="return solonumeros(event)" maxlength="8">
                                   <input type="text" v-if="editar" v-model="aux.dni" class="form-control form-control-sm" readonly>
                                </div>
                            </div>    
                            <div class="form-group row">      
                                 <div class="col-md-2 text-left">
                                    <label>Nombre (*)</label>
								</div>
                                <div class="col-md-3">
                                    <input type="text" v-model="aux.nombre" class="form-control form-control-sm" onkeypress="return soloLetras(event)" maxlength="50">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Apellido Paterno (*)</label>
								</div>
                                <div class="col-md-3">
                                <input type="text" v-model="aux.paterno" class="form-control form-control-sm" onkeypress="return soloLetras(event)" maxlength="100">
                                </div>
                            </div>
							<div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Apellido Materno (*)</label>
								</div>
                                <div class="col-md-3">
                                <input type="text" v-model="aux.materno" class="form-control form-control-sm" onkeypress="return soloLetras(event)" maxlength="100">
                                </div>
                            </div>
							<div class="form-group row">
								<div class="col-md-2 text-left">
                                    <label>Género (*)</label>
								</div>
                                <div class="col-md-2">
                                    <select v-model="aux.genero" class="form-control form-control-sm">
										<option value="M">M</option>
										<option value="F">F</option>
									</select>
                                </div>
                            </div>
                            <div class="form-group row">
								<div class="col-md-2 text-left">
                                    <label>Fecha Nacimiento (*)</label>
								</div>
                                <div class="col-md-3">
                                     <input type="date" v-model="aux.fecha" class="form-control form-control-sm" maxlength="100">
                                </div>
                            </div>
							<div class="form-group row">
								<div class="col-md-2 text-left">
                                    <label>Celular (*)</label>
								</div>
                                <div class="col-md-2">
                                    <input type="text" v-model="aux.celular" class="form-control form-control-sm" onkeypress="return solonumeros(event)" maxlength="9">
                                </div>
                            </div>
							<div class="form-group row">      
                                    <div class="col-md-2 text-left">
                                        <label>Nivel (*)</label>
                                    </div>
                                    <div class="col-md-3">
                                        <select v-model="aux.nivel" class="form-control form-control-sm">
                                            <option v-for="n in niveles" :key="n.ID" :value="n.ID">{{n.Nivel}}</option>
                                        </select>
                                    </div>
                                </div>
                            <div class="form-group row">
                                <div class="col-md-2" v-if="!editar">
                                    <button @click="addAuxiliar()" class="btn bg-indigo">Agregar <i class="fa fa-save"></i></button>
                                </div>
                                <div class="col-md-2" v-if="editar">
                                   <button @click="editAuxiliar()" class="btn bg-indigo">Editar <i class="fa fa-edit"></i></button>
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
			<div class="row" id="tabla">
			 <div class="col-md-12">
				<div class="card card-info">
	                <div class="card-header bg-azul text-center">
	                    <h4 class="title">AUXILIARES 
							<button  class="btn bg-navy altoBoton" @click="ocultar('1')">
							<i class="fa fa-plus"></i>
							</button>
						</h4>  
	                </div>
	                <div class="card-body t12">
						<div class="content table-responsive table-full-width">
                            <v-client-table :data="auxiliares" :columns="columns" :options="options">
								<div slot="Acciones" slot-scope="props">
								<!-- <button class="btn btn-danger altoBoton" data-toggle="tooltip" v-on:click="deleteGrado(props.row.DNIAuxiliar)" data-placement="left" title="Eliminar"><i class="fa fa-trash" aria-hidden="true"></i></button> -->
								<button class="btn btn-info altoBoton" data-toggle="tooltip" v-on:click="edit(props.row)" data-placement="left" title="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></button>
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
			aux:{
                dni:null,
				nombre:null,
				paterno:null,
				materno:null,
				fecha:null,
				celular:null,
				nivel:null,
				genero:null
			},
			auxiliares	:[{
				IDAuxiliar:null,
				DNIAuxiliar:null,
				Nombre:null,
				Paterno:null,
				Materno:null,
				Genero:null,
				FechaAux:null,
				Fecha:null,
				Celular:null,
				Nivel:null,
            }],
            columns: ["DNIAuxiliar","Nombre","Paterno","Materno","FechaAux","Celular","Genero","Nivel","Acciones"],
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
					DNIAuxiliar:"DNI",
                    Nombre:"Nombres",
                    Paterno:"A. Paterno",
                    Materno:"A. Materno",
                    FechaAux:"Fecha de Nacimiento",
                    Celular:"Celular",
					Acciones: "Acciones",
				},
				sortable    : ["DNIAuxiliar","Nombre","Paterno","FechaAux","Celular"],
				filterable  : ["DNIAuxiliar","Nombre","Paterno","FechaAux","Celular"]
			},
			niveles:[],
			editar: false
            
        }
	},
	created(){
        this.getNiveles();
		this.getAuxiliares();
	},
	mounted(){
        $('#objetivo').hide();
        $('#edit').hide();
	},
    methods: {
        load()
        {
            this.aux.fecha 		= null;
            this.aux.celular 	= null;
            this.aux.nombre 	= null;
            this.aux.paterno 	= null;
            this.aux.materno 	= null;
            this.aux.nivel 		= null;
            this.aux.genero 	= null;
            this.aux.dni 		= null;
            this.editar 		= false;
        },
		getAuxiliares()
        {
            this.$Progress.start();
            axios.get("getAuxiliares")
            .then(data=>
            {
                this.auxiliares = data.data.auxiliares;
                this.$Progress.finish();
                console.log(data.data);
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
		addAuxiliar()
		{
			this.$Progress.start();
			axios.post("addAuxiliar",{
				aux:this.aux
			}).then(data=>{
				console.log(data);
				swal({
					type: data.data.type,
					title: data.data.title,
					text: data.data.msj,
					showConfirmButton: false,
					timer: 2000
				});
				this.$Progress.finish();
				$('#tabla').show();
				$('#objetivo').hide();	
				this.load();
				this.getAuxiliares();
			}).catch(error=>{
				console.log(error);	
				swal({
					type: 'error',
					title: 'Error',
					text: 'comuniquese con un administrador',
					showConfirmButton: true,
				});
			})
            
			
		},
		editAuxiliar()
		{
			this.$Progress.start();
			axios.post("editAuxiliar",{
				aux:this.aux
			}).then(data=>{
				console.log(data);
				swal({
					type: data.data.type,
					title: data.data.title,
					text: data.data.msj,
					showConfirmButton: false,
					timer: 2000
				});
				this.$Progress.finish();
				$('#tabla').show();
				$('#objetivo').hide();	
				this.load();
				this.getAuxiliares();
			}).catch(error=>{
				console.log(error);	
				swal({
					type: 'error',
					title: 'Error',
					text: 'comuniquese con un administrador',
					showConfirmButton: true,
				});
			})
            
			
		},
		ocultar(id){
			if(id == '1')
			{
				$('#objetivo').show();
				$('#tabla').hide();
				$('#add').show();
				$('#edit').hide();
				this.load();
			}
			else if(id == '2')
			{
				$('#tabla').show();
				$('#objetivo').hide();	
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
		edit(auxiliar)
		{
			$('#objetivo').show();
            $('#edit').show();
            $('#add').hide();
			$('#tabla').hide();
			this.editar 		= true;
            this.aux.fecha 		= auxiliar.Fecha;
            this.aux.celular 	= auxiliar.Celular;
            this.aux.nombre 	= auxiliar.Nombre;
            this.aux.paterno 	= auxiliar.Paterno;
            this.aux.materno 	= auxiliar.Materno;
            this.aux.nivel 		= auxiliar.idnivel;
            this.aux.genero 	= auxiliar.Genero;
            this.aux.dni 		= auxiliar.DNIAuxiliar;
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
		}
    }
}
</script>