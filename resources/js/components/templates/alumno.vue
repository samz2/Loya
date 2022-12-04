<template>
    <div class="content">
	    <!-- <div class="container-fluid"> -->
	    	<div class="row">
			 <div class="col-md-12">
				
				<!-- agregar usuario -->
	            <div class="card card-info" id="objetivo">
	                <div class="card-header bg-azul text-center">
	                    <h4 class="title">Agregar Alumno</h4>  
	                </div>
	                <div class="card-body">
						<fieldset class="border p-2">
                            <legend class="w-auto t16 text-primary"><b>Datos</b></legend>
                            <div class="form-group row">  
                                <div class="col-md-2">
                                <label>DNI (*)</label>
                                </div>                             
                                <div class="col-md-2">
                                   <input type="text" v-if="!zEditar" onkeypress='return solonumeros(event)'  v-model="alumno.dni" class="form-control form-control-sm"  maxlength="8">
                                   <input type="text" v-if="zEditar" readonly  v-model="alumno.dni" class="form-control form-control-sm">
                                </div>
                            </div>    
                            <div class="form-group row">      
                                 <div class="col-md-2 text-left">
                                    <label>Nombres (*)</label>
                                 </div>
                                <div class="col-md-5">
                                    <input type="text" onkeypress='return soloLetras(event)' v-model="alumno.nombre" class="form-control form-control-sm"  maxlength="60">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Apellido Paterno (*)</label>
                                 </div>
                                <div class="col-md-5">
                                <input type="text" onkeypress='return soloLetras(event)' v-model="alumno.pater" class="form-control form-control-sm"  maxlength="60">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Apellido Materno (*)</label>
                                 </div>
                                <div class="col-md-5">
                                <input type="text" onkeypress='return soloLetras(event)' v-model="alumno.mater" class="form-control form-control-sm"  maxlength="60">
                                </div>
                            </div>
							<div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Género (*)</label>
                                 </div>
                                <div class="col-md-2">
                                	<select v-model="alumno.genero" class="form-control form-control-sm">
										<option value="M">M</option>
										<option value="F">F</option>
									</select>
                                </div>
                            </div>
							<div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label class="t12">Fecha de Nacimiento (*)</label>
                                 </div>
                                <div class="col-md-3">
                                <input type="date" v-model="alumno.fecha" class="form-control form-control-sm">
                                </div>
                            </div>
							<div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Direccion</label>
                                 </div>
                                <div class="col-md-6">
                                <input type="text" onkeypress='return alfa(event)' v-model="alumno.dir" class="form-control form-control-sm" maxlength="100">
                                </div>
                            </div>
							<div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Foto</label>
                                 </div>
                                <div class="col-md-2" v-if="alumno.foto == null">
									<div  class="btn btn-default btn-file">
										<i class="fa fa-image"></i> imagen
										<input @change="arc" type="file">
									</div>
                                </div>
								<div class="col-md-4">
									<img v-if="alumno.foto != null" :src="'data:'+alumno.foto" @click="reset()" alt="" width="120" height="175">
								</div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-2" v-if="!zEditar">
                                   <button @click="registrar()" class="btn btn-outline-success">Agregar <i class="fa fa-save"></i></button>
                                </div>
                                <div class="col-md-2" v-if="zEditar">
                                   <button @click="editar()" class="btn btn-outline-info">Editar <i class="fa fa-edit"></i></button>
                                </div>
								<div class="col-md-2">
									<button class="btn btn-outline-primary"  @click="matricular(2)">Volver <i class="fa fa-undo"></i></button>
								</div>
                            </div>
                        </fieldset>
						<div class="clearfix"></div>
	                </div>
				</div>
			</div>
	    	</div>
			<div class="card card-info" id="matricula">
				<div class="card-header bg-azul text-center">
					<h4 class="title">Matricular Alumno</h4>  
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-md-4">
							<div class="form-group">
								<label>Alumno (*)</label>
								<!-- <select v-model="matricula.alumno" class="form-control form-control-sm" readonly>
									<option :value="matricula.alumno">{{zAlumno}}</option>
								</select> -->
								<input type="text" v-model="zAlumno" class="form-control form-control-sm" readonly>
							</div>
						</div>
						<div class="col-md-2">
							<div class="form-group">
								<label>Nivel (*)</label>
								<select v-model="matricula.nivel" class="form-control form-control-sm" @change="zgrado()">
									<option v-for="n in niveles" :key="n.ID" :value="n.ID">{{n.Nivel}}</option>
								</select>
							</div>
						</div>
						<div class="col-md-2">
							<div class="form-group">
								<label>Grado (*)</label>
								<select v-model="matricula.grado" class="form-control form-control-sm" @change="getSecciones()">
									<option v-for="g in grados" :key="g.grado" :value="g.grado">{{g.grado}}</option>
								</select>
							</div>
						</div>
						<div class="col-md-2">
							<div class="form-group">
								<label>Sección (*)</label>
								<select v-model="matricula.seccion" class="form-control form-control-sm">
									<option v-for="s in secciones" :key="s.id" :value="s.id">{{s.seccion}}</option>
								</select>
							</div>
						</div>
						<div class="col-md-2" >
							<div class="form-group">
								<label>Año lectivo (*)</label>
								<input type="text" id="lectivo" maxlength="4" v-model="matricula.lectivo" onkeypress='return event.charCode >= 48 && event.charCode <= 57' @blur="lectivo()" class="form-control form-control-sm">
							</div>
						</div>
						<div class="col-md-2">
							<div class="form-group">
								<label>Matricula (*)</label>
								<input type="text" v-model="matricula.precio" onkeypress="return filterFloat(event,this);" class="form-control form-control-sm"  maxlength="60">
							</div>
						</div>
						<div class="col-md-2">
							<div class="form-group">
								<label>Pensión (*)</label>
								<input type="text" v-model="matricula.pension" onkeypress="return filterFloat(event,this);" class="form-control form-control-sm"  maxlength="60">
							</div>
						</div>
						<div class="col-md-3">
							<div class="form-group">
								<label>Fecha (*)</label>
								<input type="date" v-model="matricula.fecha" class="form-control form-control-sm">
							</div>
						</div>
						<div class="col-md-2">
							<div class="form-group">
								<label>Recibo N° (*)</label>
								<input type="text" maxlength="6" v-model="matricula.recibo" onkeypress='return event.charCode >= 48 && event.charCode <= 57' class="form-control form-control-sm">
							</div>
						</div>
					</div>
					<div class="row text-left">
						<div class="col-md-2">
							<button class="btn btn-success" @click="matricular(1)">Matricular</button>
						</div>
						<div class="col-md-2">
							<button class="btn btn-outline-primary"  @click="matricular(2)">Volver <i class="fa fa-undo"></i></button>

						</div>
					</div>
				</div>
			</div>

			<div class="card card-info" id="apoderado">
				<div class="card-header bg-azul text-center">
					<h4 class="title">Apoderado Alumno</h4>  
				</div>
				<div class="card-body">
					<fieldset class="border p-2">
						<legend class="w-auto t16 text-primary"><b>Datos Apoderado</b></legend>
						<div class="form-group row">  
							<div class="col-md-2">
								<label>Alumno (*)</label>
							</div>                             
							<div class="col-md-6">
								<input type="text" v-model="zAlumno" class="form-control form-control-sm" readonly>
							</div>
						</div>    
						<div class="form-group row">      
								<div class="col-md-2 text-left">
								<label>Parentesco (*)</label>
								</div>
							<div class="col-md-3">
								<select v-model="apoderado.parentesco" class="form-control form-control-sm">
									<option v-for="p in parentesco" :key="p.val" :value="p.val">{{p.val}}</option>
								</select>
							</div>
						</div>
						<div class="form-group row">
							<div class="col-md-2 text-left">
								<label>DNI (*)</label>
							</div>
							<div class="col-md-2">
								<input type="text" v-model="apoderado.dni" onkeypress="return solonumeros(event)" class="form-control form-control-sm"  maxlength="8">
							</div>
						</div>
						<div class="form-group row">
							<div class="col-md-2 text-left">
								<label>Celular (*)</label>
								</div>
							<div class="col-md-2">
								<input type="text" v-model="apoderado.celular" onkeypress="return solonumeros(event)" class="form-control form-control-sm"  maxlength="9">
							</div>
						</div>
						<div class="form-group row">
							<div class="col-md-2 text-left">
								<label>Nombre (*)</label>
								</div>
							<div class="col-md-6">
								<input type="text" maxlength="100" v-model="apoderado.nombre" class="form-control form-control-sm">

							</div>
						</div>
						<div class="form-group row">
							<div class="col-md-2" id="agregar">
								<button class="btn btn-outline-success" @click="Apoderado()">Agregar <i class="fa fa-save"></i></button>
							</div>
							<div class="col-md-2">
								<button class="btn btn-outline-primary"  @click="matricular(2)">Volver <i class="fa fa-undo"></i></button>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
			<div class="row" id="lista">
                <div class="col-md-12">
                    <div class="card card-info">
	                <div class="card-header bg-azul text-center">
	                    <h4 class="title">Lista de Alumnos 
							<button  class="btn bg-navy" @click="ocultar('1')" title="Agregar Alumno">
								<i class="fa fa-plus"></i>
							</button></h4>  
	                </div>
	                <div class="card-body">
                        <div class="content table-responsive table-full-width">
                            <v-client-table class="t12" :data="alumnos" :columns="columns" :options="options">
								<div slot="Matriculado" slot-scope="props">
									<label class="text-primary" v-if="props.row.Estado == 1">Matriculado</label>
									<label class="text-danger" v-else-if="props.row.Estado == 0">No Matriculado</label>
								</div>
								<div slot="Acciones" slot-scope="props">
									<button class="altoBoton btn btn-success" data-toggle="tooltip" v-on:click="matricularAlumno(props.row.DNI,props.row.Nombre,props.row.ApePaterno,props.row.ApeMaterno)" data-placement="left" title="Matricular"><i class="fa fa-address-card" aria-hidden="true"></i></button>
									<button class="altoBoton btn btn-primary" data-toggle="tooltip" v-on:click="addApoderado(props.row.DNI,props.row.Nombre,props.row.ApePaterno,props.row.ApeMaterno)" data-placement="left" title="Agregar Apoderado"><i class="fa fa-user" aria-hidden="true"></i></button>
									<button class="altoBoton btn btn-info" data-toggle="tooltip" v-on:click="edit(props.row.DNI,props.row.Nombre,props.row.ApePaterno,props.row.ApeMaterno,props.row.Genero,props.row.Direccion,props.row.fechaNac)" data-placement="left" title="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></button>
									<button class="altoBoton btn bg-indigo" data-toggle="modal" v-on:click="verRegistro(props.row.DNI)" title="Ver Registro" data-target="#exampleModal">
                                    	<i class="fa fa-eye" aria-hidden="true"></i>
                                    </button>
									<button class="altoBoton btn btn-danger" data-toggle="tooltip" v-on:click="deleteAlumno(props.row.DNI)" data-placement="left" title="Eliminar"><i class="fa fa-trash" aria-hidden="true"></i></button>
								</div>
					        </v-client-table>
                        </div>
	                </div>
                    </div>
                </div>
            </div>
	    <!-- </div> -->
		<!-- Modal !-->
		<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                <div class="modal-content">
                <div class="modal-header bg-azul text-white text-center">
                    <h5 class=" text-center" id="exampleModalLabel">FICHA ALUMNO</h5>
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
						<div class="col-md-3">
							<img :src="registro.Foto" alt="" height="185" width="130" style="border: 2px">
						</div>
						<div class="col-md-9">
							<div class="row">
								<div class="col-md-4 text-left"><b>DNI: </b></div>
								<div class="col-md-8 text-left">{{registro.DNI}}</div>
								<div class="col-md-4 text-left"><b>Nombre: </b></div>
								<div class="col-md-8 text-left">{{registro.Nombre}}</div>
								<div class="col-md-4 text-left"><b>Ap. Paterno: </b></div>
								<div class="col-md-8 text-left">{{registro.ApePaterno}}</div>
								<div class="col-md-4 text-left"><b>Ap. Materno: </b></div>
								<div class="col-md-8 text-left">{{registro.ApeMaterno}}</div>
								<div class="col-md-4 text-left"><b>Dirección: </b></div>
								<div class="col-md-8 text-left">{{registro.Direccion}}</div>
								<div class="col-md-4 text-left"><b>Cumpleaños: </b></div>
								<div class="col-md-8 text-left">{{registro.cumple}}</div>
								<div class="col-md-4 text-left"><b>Edad: </b></div>
								<div class="col-md-8 text-left">{{registro.Edad}}</div>
								<div v-if="gradoalumno.Nivel == null" class="col-md-12 text-danger text-center">
									{{"Alumno aun no matriculado"}}
								</div>
								<div class="col-md-12" v-else>
									<div class="row" >
										<div class="col-md-4 text-left"><b>Nivel: </b></div>
										<div class="col-md-8 text-left">{{gradoalumno.Nivel}}</div>
										<div class="col-md-4 text-left"><b>Grado: </b></div>
										<div class="col-md-8 text-left">{{gradoalumno.grado}}</div>
										<div class="col-md-4 text-left"><b>Sección: </b></div>
										<div class="col-md-8 text-left">{{gradoalumno.seccion}}</div>
									</div>
								</div>
							</div>
							
						</div>
						
						<div class="col-md-12"><hr></div>
						<div class="col-md-12 text-center"><b>Apoderados </b></div>
						<div class="col-md-12 text-center text-danger" v-if="apoderados.length == 0">
							No se encontraron registros
						</div>
						<div class="col-md-12"><hr></div>
                    </div>
					<div class="row" v-if="cargando && apoderados.length > 0">
						<table class="table table-sm text-center">
							<tr class="bg-indigo">
								<td><b>Parentesco</b></td>
								<td><b>Nombre</b></td>
								<td><b>Celular</b></td>
								<td><b>Acciones</b></td>
							</tr>
							<tr v-for="a in apoderados" :key="a.DNI" >
								<td>{{a.Parentesco}}</td>
								<td>{{a.Nombre}}</td>
								<td>{{a.Celular}}</td>
								<td><button class="btn btn-danger altoBoton" @click="eliminarApoderado(a.ID,registro.DNI)" title="eliminar apoderado de alumno"><i class="fa fa-trash"></i></button></td>
							</tr>
						</table>
						
					</div>
					
					<div class="row">
						<div class="col-md-12"><hr></div>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
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
			apoderado:{
				alumno:null,
				parentesco:null,
				nombre:null,
				celular:null,
				dni:null
			},
            alumno: {
				dni:null,
				nombre:null,
				pater:null,
				mater:null,
				dir:null,
				fecha:null,
				cel:null,
				genero:null,
				foto:null,
				ext:null,
			},
			matricula:{
				alumno:null,
				grado: null,
				lectivo:null,
				nivel:null,
				precio:null,
				seccion:null,
				fecha:null,
				recibo:null,
				pension:null
			},
			alumnos: [{
				DNI:null,
				Nombre:null,
				ApePaterno:null,
                ApeMaterno:null,
                Apellidos:null,
                Genero:null,
                Edad:null,
                Direccion:null,
				fechaNac:null,
				
            }],
            columns: ["DNI","Nombre","Apellidos","Genero","Edad","Direccion","Matriculado","Acciones"],
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
				DNI:"DNI",
				Nombre:"Nombres",
				ApePaterno:"Apellido Paterno",
                ApeMaterno:"Apellido Materno",
                Edad:"Edad",
                Direccion:"Direccion",
                Genero:"Género",
				},
				sortable: ["DNI","Nombre","ApePaterno","ApeMaterno","Genero","Edad","Direccion"],
				filterable: ["DNI","Nombre","ApePaterno","ApeMaterno","Genero","Edad","Direccion"],
				
			},
			dni:null,
			zAlumno:null,
			niveles:[],
			grados:[],
			secciones:[],
			parentesco:[
				{val:"PADRE"},{val:"MADRE"},{val:"APODERADO"}
				],
			apoderados:[],
			cargando : false,
			registro : {},
			gradoalumno : {
				Nivel:null,
				grado:null,
				seccion:null
				},
			zEditar :false,	
        }
	},
	mounted()
	{
		$('#cod').hide();
		$('#objetivo').hide();
		$('#matricula').hide();
		$('#editar').hide();
		$('#apoderado').hide();
	},
	created()
    {
		this.getDatos();
		this.getNiveles();
    },
    methods: {
		eliminarApoderado(apoderado,alumno)
		{
			this.$Progress.start();
            axios.get("deleteApoderado/"+apoderado)
            .then(data=>
            {
				swal(
					{
						type: data.data.type,
						text:data.data.text,
						showConfirmButton: false,
						timer: 2000
					});
				this.verRegistro(alumno);	
				this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
		},
		reset()
		{
			this.alumno.foto = null;
		},
		arc(e)
        {
            var size = e.target.files[0].size;
			var name = e.target.files[0].name;
			var type = e.target.files[0].type;
			this.alumno.ext = name.split('.').pop();
			if(!type.includes("image"))
			{
				swal({
					type : "warning",
					text : "debe seleccionar una imagen",
				});
				return;
			}
			if(size > 1000000)
            {
				swal({
					type : "warning",
					text : "tamaño max. 1mb",
				});
				return;
			}
            var files = new FileReader();
            files.readAsDataURL(e.target.files[0]);
            files.onload = (e) =>
            {
			   this.alumno.foto    = e.target.result;
			//    console.log(e.target.result);
            //    this.chat.name       = name;   
            }
            console.log("look"+this.alumno.foto);
            // console.log(this.types);
            
        },
		load()
		{
			this.alumno.dni				= null;
			this.alumno.nombre			= null;
			this.alumno.pater			= null;
			this.alumno.mater			= null;
			this.alumno.dir				= null;
			this.alumno.fecha			= null;
			this.alumno.cel				= null;
			this.alumno.genero			= null;
			this.alumno.foto			= null;
			this.alumno.ext				= null;
			this.apoderado.dni 			= null;
			this.apoderado.nombre 		= null;
			this.apoderado.celular 		= null;
			this.apoderado.parentesco 	= null;
			this.matricula.grado		= null;
			this.matricula.lectivo		= null;
			this.matricula.nivel		= null;
			this.matricula.precio		= null;
			this.matricula.seccion		= null;
			this.matricula.fecha		= null;
			this.matricula.recibo		= null;
			this.matricula.pension		= null;		
			this.zEditar				= false;
		},
        registrar()
		{
			axios.post("addAlumno",{
				alumno:this.alumno
			}).then(data=>{

				swal({
					type: data.data.type,
					title: data.data.title,
					text: data.data.text,
					showConfirmButton: false,
					timer: 2000
				});
				// setTimeout(() => {
				// 	location.reload();
				// }, 1500);
				this.load();
				this.ocultar(2);
				this.getDatos();
			}).catch(error=>{
				swal({
					type: 'error',
					title: 'Error',
					text: "Consulte con un administrador",
					showConfirmButton: true,
				});
				console.log(error);
			})
		},
		editar()
		{
			axios.post("editAlumno",{
				alumno:this.alumno
			}).then(data=>{
  				swal({
					// position: 'top-end',
					type: 'success',
					title: 'OK',
					text: 'Alumno Editado Correctamente',
					showConfirmButton: false,
					timer: 2000
				});
				this.getDatos();
				this.load();
				this.ocultar(2);
			}).catch(error=>{
				swal({
					type: 'error',
					title: 'Error',
					text: "Consulte con un administrador",
					showConfirmButton: true,
				});
			})
		},
		Apoderado()
		{
			axios.post("addApoderado",{
				apoderado:this.apoderado
			}).then(data=>{
				swal({
				type: data.data.type,
				title: data.data.title,
				text: data.data.text,
				showConfirmButton: false,
				timer: 2000
				});
				this.load();
				this.ocultar(2);
			}).catch(error=>{
				swal({
					type: 'error',
					title: 'Error',
					text: "Consulte con un administrador",
					showConfirmButton: true,
				});
			})
		},
		matricular(id)
		{
			if(id == 1)
			{
				if(this.matricula.alumno != null || this.matricula.grado != null || this.matricula.lectivo != null 
				|| this.matricula.nivel != null || this.matricula.fecha != null || this.matricula.recibo != null 
				|| this.matricula.seccion != null || this.matricula.precio != null)
				{
					axios.post("matricular",{
						matricula:this.matricula
					}).then(data=>{
						// console.log(data);
						swal({
							type: data.data.type,
							text: data.data.text,
							showConfirmButton: false,
							timer: 3000
						});
						this.load();
						this.ocultar(2);
						this.getDatos();
					}).catch(error=>{
						console.log(error);	
						swal({
							type: 'error',
							title: 'Error',
							text: "Error consulte con el administrador del sistema",
							showConfirmButton: true,
						});
					})
				}else
				{
					swal({
							type: 'error',
							title: 'Error',
							text: "Llenar los datos obligatorios",
							showConfirmButton: true,
						});
				}
				
			}else{
				$('#matricula').hide();
				$('#apoderado').hide();
				$('#objetivo').hide();
				$('#lista').show();
				this.load();
			}
			
		},
		lectivo()
		{
			var lectivo = parseInt(this.matricula.lectivo);
			if(lectivo<=2000 || lectivo >=2100)
			{
				$("#lectivo").css( "background-color", "red" );
			}else
			{
				$("#lectivo").css( "background-color", "white" );
			}
			console.log(this.matricula.lectivo);
		},
		matricularAlumno(dni,nombre,paterno,materno)
		{
			this.load();
			$('#matricula').show();
			$('#apoderado').hide();
			$('#objetivo').hide();
			$('#lista').hide();
			this.$Progress.start();
			axios.get("getCosto")
            .then(data=>
            {
				this.matricula.precio 	= data.data.matricula;
				this.matricula.pension 	= data.data.pension; 
                this.$Progress.finish();
                // console.log(data.data);
            }
            ).catch(error=>{
                console.log(error);
            })
			var fecha = new Date();
			var anio = fecha.getFullYear();
			this.matricula.lectivo = anio;
			this.matricula.alumno  = dni;
			this.zAlumno = nombre + " " + paterno + " " + materno;
		},
		addApoderado(dni,nombre,paterno,materno)
		{
			$('#matricula').hide();
			$('#lista').hide();
			$('#agregar').show();
			
			$('#apoderado').show();
			this.apoderado.alumno  = dni;
			this.zAlumno = nombre + " " + paterno + " " + materno;
		},
		zgrado()
		{
			var nivel = this.matricula.nivel;
			this.$Progress.start();
            axios.get("getGrados/"+nivel)
            .then(data=>
            {
                this.grados = data.data.grados;
                this.$Progress.finish();
                // console.log(data.data);
            }
            ).catch(error=>{
                console.log(error);
            })
		},
		getSecciones()
		{
			var nivel = this.matricula.nivel;
			var grado = this.matricula.grado;
			this.$Progress.start();
            axios.get("getSecciones/"+nivel+"/"+grado)
            .then(data=>
            {
                this.secciones = data.data.secciones;
                this.$Progress.finish();
                // console.log(data.data);
            }
            ).catch(error=>{
                console.log(error);
            })
		},
		getDatos()
        {
            this.$Progress.start();
            axios.get("getAlumnos")
            .then(data=>
            {
                this.alumnos = data.data.alumnos;
                this.$Progress.finish();
                // console.log(data.data);
            }
            ).catch(error=>{
                console.log(error);
            })
		},
		deleteAlumno(id)
        {
			this.$Progress.start();
            swal({
                title: '¿Deseas eliminar este Alumno?',
                text: "No será posible revertir esta acción!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'cancelar',
            }).then((result) => {
                if (result.value) {
                    axios.get(`/deleteAlumno/${id}`)
                        .then(data => {
                        if(data.data=="OK"){
                            swal(
                            'Eliminado!',
                             'El Alumno ha sido eliminado.',
                             'success'
								);
						this.$Progress.finish();
						this.getDatos();
                        }
                        }).catch(error => {
                            console.log('Ocurrio un error ' + error);
                            this.$Progress.fail();
                        });
                     }
                });
		},
		ocultar(id){
			if(id == '1')
			{
				this.load();
				$('#objetivo').show();
				$('#matricula').hide();
				$('#editar').hide();
				$('#agregar').show();
				$('#lista').hide();
				$('#apoderado').hide();
			}
			else if(id == '2')
			{
				$('#lista').show();
				$('#objetivo').hide();
				$('#matricula').hide();
				$('#apoderado').hide();	
			}
			
		},
		getNiveles()
        {
            this.$Progress.start();
            axios.get("getNiveles")
            .then(data=>
            {
                this.niveles = data.data.niveles;
                this.$Progress.finish();
                // console.log(data.data);
            }
            ).catch(error=>{
                console.log(error);
            })
		},
		edit(dni,nombre,paterno,materno,genero,dir,fecha)
		{
			$('#objetivo').show();
			$('#agregar').hide();
			$('#editar').show();
			$('#lista').hide();
			this.zEditar		= true;
			this.alumno.dni 	= dni;
			this.alumno.nombre 	= nombre;
			this.alumno.pater  	= paterno;
			this.alumno.mater  	= materno;
			this.alumno.dir    	= dir;
			this.alumno.fecha  	= fecha;
			this.alumno.genero 	= genero;
		},
		verRegistro(id)
        {
			this.cargando = false;
            this.$Progress.start();
            axios.get("/getAlumno/"+id)
            .then(data=>
            {
				this.cargando = true;
				this.registro = data.data.registro;
				this.apoderados = data.data.apoderados;
				this.gradoalumno = data.data.gradoalumno;
                this.$Progress.finish();
                // console.log(data);
            }
            ).catch(error=>{
                console.log(error);
            })
        },
    }
}

</script>
