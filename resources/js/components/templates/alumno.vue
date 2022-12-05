<template>
    <div class="content">
		<div class="row">
			 <div class="col-md-12">
				
				<!-- agregar usuario -->
	            <div class="card card-info" id="objetivo">
	                <div class="card-header bg-azul text-center">
	                    <h4 class="title">Agregar Empleado</h4>  
	                </div>
	                <div class="card-body">
						<fieldset class="border p-2">
                            <legend class="w-auto t16 text-primary"><b>Datos</b></legend>
                            <div class="form-group row">  
                                <div class="col-md-2">
                                <label>Documento (*)</label>
                                </div>                             
                                <div class="col-md-2">
                                   <input type="text" v-if="!zEditar" onkeypress='return solonumeros(event)'  v-model="empleado.dni" class="form-control form-control-sm"  maxlength="8">
                                   <input type="text" v-if="zEditar" readonly  v-model="empleado.documento" class="form-control form-control-sm">
                                </div>
                            </div>    
                            <div class="form-group row">      
                                 <div class="col-md-2 text-left">
                                    <label>Nombres (*)</label>
                                 </div>
                                <div class="col-md-5">
                                    <input type="text" onkeypress='return soloLetras(event)' v-model="empleado.nombre" class="form-control form-control-sm"  maxlength="60">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Apellidos (*)</label>
                                 </div>
                                <div class="col-md-5">
                                <input type="text" onkeypress='return soloLetras(event)' v-model="empleado.apellidos" class="form-control form-control-sm"  maxlength="60">
                                </div>
                            </div>
							<div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Género (*)</label>
                                 </div>
                                <div class="col-md-2">
                                	<select v-model="empleado.genero" class="form-control form-control-sm">
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
                                <input type="date" v-model="empleado.fecha" class="form-control form-control-sm">
                                </div>
                            </div>
							<div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Celular</label>
                                 </div>
                                <div class="col-md-6">
                                <input type="text" onkeypress='return alfa(event)' v-model="empleado.celular" class="form-control form-control-sm" maxlength="100">
                                </div>
                            </div>
							<div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Direccion</label>
                                 </div>
                                <div class="col-md-6">
                                <input type="text" onkeypress='return alfa(event)' v-model="empleado.direccion" class="form-control form-control-sm" maxlength="100">
                                </div>
                            </div>
							<div class="form-group row">
                                <div class="col-md-2 text-left">
                                    <label>Foto</label>
                                 </div>
                                <div class="col-md-2" v-if="empleado.foto == null">
									<div  class="btn btn-default btn-file">
										<i class="fa fa-image"></i> imagen
										<input @change="arc" type="file">
									</div>
                                </div>
								<div class="col-md-4">
									<img v-if="empleado.foto != null" :src="'data:'+empleado.foto" @click="reset()" alt="" width="120" height="175">
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
			<div class="row" id="areas">
                <div class="col-md-12">
                    <div class="card card-info">
                            <div class="card-header bg-azul text-center">
                                <h4 class="title">Empleados 
                                <button  class="btn bg-navy btn-sm" @click="ocultar('1')">
							        <i class="fa fa-plus"></i>
							        </button>
                                </h4>  
                            </div>
                        <div class="card-body t11">
                            <div class="content table-responsive table-full-width">
                                <v-client-table :data="empleados" :columns="columns" :options="options">
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
			empleado: {
				dni:null,
				nombre:null,
				apellidos:null,
				celular:null,
				direccion:null,
				fecha:null,
				genero:null,
				foto:null,
				sueldo:null,
			},
			
			empleados: [{
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
