
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
				<!-- <div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<button  class="btn btn-success" id="mas" @click="ocultar('1')">
							Agregar relación <i class="fa fa-plus"></i>
							</button>
						</div>
					</div>
				</div> -->
	            <div class="card card-info"  id="objetivo">
	                <div class="card-header text-center bg-azul">
	                    <h4 class="title">Agregar Cursos</h4>  
	                </div>
                    <div class="col-md-5"><label>* Campos obligatorios</label></div>
                    
					<div class="card-body">
                        <fieldset class="border p-2">
                            <legend class="w-auto">Datos del grado:</legend>
                            <div class="form-group row">
                                <label for="tomo" class="col-md-1 col-form-label">Nivel* :</label>
                                <div class="col-md-3">
                                    <select class="form-control form-control-sm" id="nivel" v-model="gc.nivel" @blur="validar('nivel')" @change="getCursos(gc.nivel)">
                                        <option v-for="n in niveles" :key="n.ID" :value="n.ID">{{n.Nivel}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-1 col-form-label">Area* :</label>
                                <div class="col-md-5">
                                    <select v-model="gc.area" id="area"  @blur="validar('area')" @change="getAreas(gc.area)" class="form-control form-control-sm">
                                        <option v-for="n in cursos" :key="n.ID" :value="n.ID">{{n.Curso}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-1 col-form-label" >Curso* :</label>
                                <div class="col-md-5">
                                    <select v-model="gc.curso" id="curso" @blur="validar('curso')" @change="getGrados(gc.nivel)" class="form-control form-control-sm">
                                        <option v-for="a in areas" :key="a.IDArea" :value="a.IDArea">{{a.Descripcion}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row" id="grados">
                                <label class="col-md-1 col-form-label t12">Grados* :</label>
                                <div class="col-md-4">
                                    <table border="1" class="table table-bordered table-hover table-striped">
                                        <tr class="bg-primary">
                                            <td>Curso</td>
                                            <td>Seleccionar</td>
                                        </tr>
                                        <tr v-for="g in grados" :key="g.id" class="text-center">
                                            <td>{{g.grado}}</td>
                                            <td><input type="checkbox" @click="addGrados(g.id)" class="icheck-primary"></td>
                                        </tr>
                                        
                                    </table>
                                </div>
                            </div>
                            
                        </fieldset>
                        <br>
                        <div class="row">
                            <div class="col-md-2" id="guardar" >
                                <button class="btn bg-indigo"  @click="gradoscursos(1)">Guardar <i class="fa fa-save"></i></button>
                            </div>
                          
                            <div class="col-md-2">
                                <button class="btn bg-olive" @click="cancelar()">Cancelar <i class="fa fa-undo"></i></button>
                            </div>
                        </div>
	                </div>
				</div>
			</div>
	    	</div>
 
            <div class="row" id="tabla">
                <div class="col-md-12">
                    <div class="card card-info" >
                            <div class="card-header text-center bg-azul">
                                <h4 class="title">GRADOS CURSOS 
                                <button  class="btn btn-sm bg-navy" @click="ocultar('1')">
							        <i class="fa fa-plus"></i>
							    </button>
                            </h4>  
                            </div>
                        <div class="card-body">
                            <div class="content table-responsive table-full-width t12">
                                <v-client-table :data="gradosCursos" :columns="columns" :options="options">
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
            alumnoz:null,
            lineas:[],
			gc:{
                nivel:null,
                curso:null,
                area:null,
            },
            niveles:[],
            grados:[],
            areas:[],
            cursos:[],
            secciones:[],
            gradosAsignados:[],
            gradosCursos	:[{
				curso: null,
                Nivel: null,
                grados: null,
            }],
            columns: ["curso","Nivel","grados"],
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
                    curso: "Curso",
                    Nivel: "Nivel",
                    grados: "Grados",
				},
				sortable    : ["curso","Nivel","grados"],
				filterable  : ["curso","Nivel","grados"]
            },
            IsConsistent:false,
        }
	},
	created(){
        this.getNiveles();
        this.getData();
	},
	mounted(){
        $('#objetivo').hide();
        $('#menos').hide();
        $('#grados').hide();
	},
    methods: {
        getData(){
            this.$Progress.start();
            axios.get("getgradosCurso")
            .then(data=>
            {
                this.gradosCursos = data.data.gradoscursos;
                this.$Progress.finish();
                console.log(data.data);
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        validar(name)
        {
            if($("#"+name).val() == null)
            {
                $("#"+name).removeClass("is-valid").addClass("is-invalid");
                this.IsConsistent = false;
            }
            else
            { 
               $("#"+name).removeClass("is-invalid").addClass("is-valid");
               this.IsConsistent = true;
            }
        },
        gradoscursos()
        {
            if(!this.IsConsistent)
            {
                swal({
                    type: "error",
                    text : "Llenar datos obligatorios",
                });
                return;
            }
          
           
            this.$Progress.start();
                axios.post("asignGradoCurso",{
                    gc:this.gc,
                    gradosAsignados:this.gradosAsignados,
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
                        text: 'Comuniquese con el administrador del sistema',
                        showConfirmButton: true,
                    });
                })
        },
    
        addGrados(id)
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
        getNiveles()
        {
            var fecha = new Date();
            this.gc.lectivo = fecha.getFullYear();
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
        cancelar()
        {
            this.gc.nivel=null;
            this.gc.curso=null;
            this.gc.area=null;
            
            $('#objetivo').hide();
            $('#tabla').show();	
            $('#menos').hide();
            $('#mas').show();
        },
       
        ocultar(id)
        {
			if(id == '1')
			{
                $('#objetivo').show();
                $('#guardar').show();
                $('#tabla').hide();
                $('#editar').hide();
                $('#menos').show();
                $('#mas').hide();
			}
			else if(id == '2')
			{
				$('#objetivo').hide();
				$('#editar').hide();
				$('#guardar').hide();
                $('#tabla').show();	
                $('#menos').hide();
                $('#mas').show();
			}
			
        },
        
    }
}
</script>
