<style scoped>
    /* .content-select select::-ms-expand {
        display: none;
    }
    select
    {
        background: transparent; 
        border:none; 
        font-size:9
    } */
</style>
<template>
    <div class="content">
        <div class="container-fluid">
	    	<div class="row">
			 <div class="col-md-12">
	            <div class="card card-info">
	                <div class="card-header bg-blue text-center">
	                    <h4 class="title">REGISTRO DE NOTAS</h4>  
	                </div>
					<div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Grado</label>
                                        <select v-model="registro.grado" @change="getAreas(registro.grado)" id="grado" class="form-control form-control-sm">
                                        <option v-for="g in grados" :key="g.id" :value="g.id">
                                            {{g.grado}} - {{g.seccion}} - {{g.Nivel}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <label>Curso</label>
                                    <div class="text-center" v-if="cargando1">
                                        <div  class="spinner-border text-success" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    <select v-else v-model="registro.area" id="area" @change="getCapacidades(registro.area)" class="form-control form-control-sm">
                                        <option v-for="a in areas" :key="a.IDArea" :value="a.IDArea">
                                            {{a.Descripcion}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Bimestre</label>
                                        <select v-model="registro.bimestre" @change="getAlumnos(registro.grado,registro.bimestre)" id="bimestre" class="form-control form-control-sm">
                                        <option value="1">{{"1"}}</option>
                                        <option value="2">{{"2"}}</option>
                                        <option value="3">{{"3"}}</option>
                                        <option value="4">{{"4"}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <table border="1" cellpadding="0" cellspacing="0" id="table" v-if="numerico">
                            <tr class="text-center">
                                <td colspan="15" width=1000 class="bg-indigo"><b>REGISTRO OFICIAL DE EVALUACION</b></td>
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center fondo"><b>NIVEL:</b></td>
                                <td colspan="4" class="text-center">{{nivel}}</td>
                                <td colspan="3" class="text-center fondo"><b>DOCENTE:</b></td>
                                <td colspan="6" class="text-center">{{nombre}}</td>                                
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center fondo"><b>AREA:</b></td>
                                <td colspan="4" class="text-center">{{area}}</td>
                                <td colspan="2" class="text-center fondo"><b>AULA:</b></td>
                                <td colspan="2" class="text-center">{{grado}}</td>
                                <td colspan="3" class="text-center fondo"><b>BIMESTRE:</b></td>
                                <td colspan="2" class="text-center">{{registro.bimestre}}</td>                                
                            </tr>
                            <tr class="bg-info">
                                <td colspan="2"  width=400 class="text-center"><b>COMPETENCIAS DE AREAS</b></td>
                                <td colspan="12" width=570 class="text-center">CALIFICACI??N BIMESTRAL</td>
                                <td rowspan="3"  width=30 class="verticalText text-center"><b>PB</b></td>
                            </tr>
                            <tr class="bg-info">
                                <td colspan="2" width=400 class="text-center"><b>UNIDADES</b></td>
                                <td colspan="5" width=250 class="text-center">{{"I"}} UNIDAD</td>
                                <td rowspan="2" width=35 class="verticalText text-center"><p ><b>????PU</b></p></td>
                                <td colspan="5" width=250 class="text-center">{{"II"}} UNIDAD</td>
                                <td rowspan="2" width=35 class="verticalText text-center"><p ><b>????PU</b></p></td>
                            </tr>
                            <tr style="font-size: 11px;vertical-align:middle;">
                                <td width=30><b>N??</b></td>
                                <td width=370 class="text-center"><b>APELLIDOS Y NOMBRES / CAPACIDADES</b></td>
                                <td width=50><b>C1</b></td>
                                <td width=50><b>C2</b></td>
                                <td width=50><b>C3</b></td>
                                <td width=50><b>C4</b></td>
                                <td width=50><b>C5</b></td>
                                
                                <td width=50><b>C1</b></td>
                                <td width=50><b>C2</b></td>
                                <td width=50><b>C3</b></td>
                                <td width=50><b>C4</b></td>
                                <td width=50><b>C5</b></td>
                            </tr>
                            <tr v-if="!cargando">
                                <td colspan="17" class="text-center">
                                    <div  class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                            <tr style="font-size: 11px"  v-for="(a,index) in alumnos" :key="a.DNI">
                                <td width=30><b>{{index+1}}</b></td>
                                <td width=370><b>{{a.alumno}}</b></td>
                                <td width=50><input v-if="capacidades.length >= 1" v-model="a.C11" readonly class="form-control form-control-sm"></td>
                                <td width=50><input v-if="capacidades.length >= 2" v-model="a.C21" readonly class="form-control form-control-sm"></td>
                                <td width=50><input v-if="capacidades.length >= 3" v-model="a.C31" readonly class="form-control form-control-sm"></td>
                                <td width=50><input v-if="capacidades.length >= 4" v-model="a.C41" readonly class="form-control form-control-sm"></td>
                                <td width=50><input v-if="capacidades.length >= 5" v-model="a.C51" readonly class="form-control form-control-sm"></td>
                                <td width=50 >{{a.PromUnid1}}</td>
                                <td width=50><input v-if="capacidades.length >= 1" v-model="a.c12" readonly class="form-control form-control-sm"></td>
                                <td width=50><input v-if="capacidades.length >= 2" v-model="a.c22" readonly class="form-control form-control-sm"></td>
                                <td width=50><input v-if="capacidades.length >= 3" v-model="a.c32" readonly class="form-control form-control-sm"></td>
                                <td width=50><input v-if="capacidades.length >= 4" v-model="a.c42" readonly class="form-control form-control-sm"></td>
                                <td width=50><input v-if="capacidades.length >= 5" v-model="a.c52" readonly class="form-control form-control-sm"></td>
                                <td width=50 >{{a.PromUnid2}}</td>
                                <td width=50 class="bg-info text-center">{{a.PromBimestral}}</td>
                            </tr>
                        </table>
                        <table border="1" cellpadding="0" cellspacing="0" id="table" v-if="!numerico">
                            <tr class="text-center">
                                <td colspan="15" width=1000 class="bg-indigo"><b>REGISTRO OFICIAL DE EVALUACION</b></td>
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center fondo"><b>NIVEL:</b></td>
                                <td colspan="4" class="text-center">{{nivel}}</td>
                                <td colspan="3" class="text-center fondo"><b>DOCENTE:</b></td>
                                <td colspan="6" class="text-center">{{nombre}}</td>                                
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center fondo"><b>AREA:</b></td>
                                <td colspan="4" class="text-center">{{area}}</td>
                                <td colspan="2" class="text-center fondo"><b>AULA:</b></td>
                                <td colspan="2" class="text-center">{{grado}}</td>
                                <td colspan="3" class="text-center fondo"><b>BIMESTRE:</b></td>
                                <td colspan="2" class="text-center">{{registro.bimestre}}</td>                                
                            </tr>
                            <tr class="bg-info">
                                <td colspan="2"  width=400 class="text-center"><b>COMPETENCIAS DE AREAS</b></td>
                                <td colspan="12" width=570 class="text-center">CALIFICACI??N BIMESTRAL</td>
                                <td rowspan="3"  width=30 class="verticalText text-center"><b>PB</b></td>
                            </tr>
                            <tr class="bg-info">
                                <td colspan="2" width=400 class="text-center"><b>UNIDADES</b></td>
                                <td colspan="5" width=250 class="text-center">{{"I"}} UNIDAD</td>
                                <td rowspan="2" width=35 class="verticalText text-center"><p ><b>????PU</b></p></td>
                                <td colspan="5" width=250 class="text-center">{{"II"}} UNIDAD</td>
                                <td rowspan="2" width=35 class="verticalText text-center"><p ><b>????PU</b></p></td>
                            </tr>
                            <tr style="font-size: 11px;vertical-align:middle;">
                                <td width=30><b>N??</b></td>
                                <td width=370 class="text-center"><b>APELLIDOS Y NOMBRES / CAPACIDADES</b></td>
                                <td width=50><b>C1</b></td>
                                <td width=50><b>C2</b></td>
                                <td width=50><b>C3</b></td>
                                <td width=50><b>C4</b></td>
                                <td width=50><b>C5</b></td>
                                
                                <td width=50><b>C1</b></td>
                                <td width=50><b>C2</b></td>
                                <td width=50><b>C3</b></td>
                                <td width=50><b>C4</b></td>
                                <td width=50><b>C5</b></td>
                            </tr>
                            <tr v-if="!cargando">
                                <td colspan="17" class="text-center">
                                    <div  class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                            <tr style="font-size: 11px"  v-for="(a,index) in alumnos" :key="a.DNI">
                                <td width=30><b>{{index+1}}</b></td>
                                <td width=370><b>{{a.alumno}}</b></td>
                                <td width=50 align="center">
                                    <!-- <input v-if="capacidades.length >= 1" @blur="validate(index,a.c1,'c1')" v-model="a.c1" type="text" onkeypress='return letrasNotas(event)' maxlength="2" class="form-control form-control-sm"> -->
                                    <select size="1" v-if="capacidades.length >= 1" v-model="a.C11">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50  align="center">
                                    <select size="1" v-if="capacidades.length >= 2" v-model="a.C21">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50  align="center">
                                    <select size="1" v-if="capacidades.length >= 3" v-model="a.C31">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50  align="center">
                                    <select size="1" v-if="capacidades.length >= 4" v-model="a.C41">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50  align="center">
                                    <select size="1" v-if="capacidades.length >= 5" v-model="a.C51">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50 align="center" class="text-center">
                                    <select size="1" v-model="a.PromUnid1">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50  align="center">
                                    <select size="1"  v-if="capacidades.length >= 1" v-model="a.c12">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50 align="center">
                                    <select size="1" v-if="capacidades.length >= 2" v-model="a.c22">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50 align="center">
                                    <select size="1" v-if="capacidades.length >= 3" v-model="a.c32">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50 align="center">
                                    <select size="1" v-if="capacidades.length >= 4" v-model="a.c42">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50 align="center">
                                    <select size="1" v-if="capacidades.length >= 5" v-model="a.c52">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50 align="center" class="text-center">
                                    <select size="1" v-model="a.PromUnid2">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                                <td width=50 align="center" class="text-center">
                                    <select size="1" v-model="a.PromBimestral">
                                        <option value="20">AD</option>
                                        <option value="17">A</option>
                                        <option value="13">B</option>
                                        <option value="10">C</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <br><br>
                        <div class="row text-left">
                            <div class="col-md-2">
                                <button class="btn btn-danger" @click="cancelar()">
                                cancelar
                                </button>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
        </div>
	</div>
</div>	
</template>

<script>
import { isNullOrUndefined } from 'util';
    export default {
    data() {
        return {
            cargando:false,
            numerico:false,
            nombre:null,
            registro: {
                grado:null,
                area:null,
                // unidad:null,
                bimestre:null,
                posicion:null,
            },
            alumnos:[],
            meses: [
                    {val:1,mes:"I"},
                    {val:2,mes:"II"},
                    {val:3,mes:"III"},
                    {val:4,mes:"IV"},
                    ],
            grados:[],
            capacidades:[],
            areas:[],
            mes:null,
            curso:null,
            tipo:null,
            grado:null,
            capacidad:null,
            area:null,
            bimestre:null,
            notas:[],
            nivel:null,
            IsConsistent: false,
            cargando1: false,
        }
	},
	created(){
        this.getGrados();
        this.getAutenticacion();
        this.getDatos();
		// this.getGrados();
	},
	mounted(){
        $('#objetivo').hide();
        $('#edit').hide();
        $('#table').hide();
	},
    methods: {
        validate(i,val,nv)
        {
            if(val == null) val= '';
            
            val = val.toUpperCase();
            
            if(val == '')
            {
                swal(
                    {
                        type: 'warning',
                        text: 'Ingrese una nota: AD,A,B,C',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                this.IsConsistent = false;
                return;
            }
            if(!(val == 'AD' || val == 'A' || val == 'B' || val == 'C'))
            {
                swal(
                    {
                        type: 'warning',
                        text: 'Ingrese una nota v??lida',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                this.IsConsistent = false;
                return;
            }else
            {
                this.IsConsistent = true;
            }
        },
        valnum()
        {
            this.numerico = $("#check").is(":checked") ? true: false;
        },
        cancelar()
        {
            setTimeout(() => {
					location.reload();
				}, 2000);
        },
        promediobimestral(index)
        {
            return (this.promedio(index)+this.promediob(index))/2;
        },
        promediob(index)
        {
            var prom    = 0;
            var n       = 0;
            if(this.alumnos[index].b1 != null)
            {
                prom += parseInt(this.alumnos[index].b1);
                n++;
            }
            if(this.alumnos[index].b2 != null)
            {
                prom += parseInt(this.alumnos[index].b2);
                n++;
            }
            if(this.alumnos[index].b3 != null)
            {
                prom += parseInt(this.alumnos[index].b3);
                n++;
            }
            if(this.alumnos[index].b4 != null)
            {
                prom += parseInt(this.alumnos[index].b4);
                n++;
            }
            if(this.alumnos[index].b5 != null)
            {
                prom += parseInt(this.alumnos[index].b5);
                n++;
            }
            if(n != 0)
            {
                prom = parseFloat(prom/n);     
                           
            }
            return prom;
        },
        promedio(index)
        {
            var prom    = 0;
            var n       = 0;
            if(this.alumnos[index].c1 != null)
            {
                prom += parseInt(this.alumnos[index].c1);
                n++;
            }
            if(this.alumnos[index].c2 != null)
            {
                prom += parseInt(this.alumnos[index].c2);
                n++;
            }
            if(this.alumnos[index].c3 != null)
            {
                prom += parseInt(this.alumnos[index].c3);
                n++;
            }
            if(this.alumnos[index].c4 != null)
            {
                prom += parseInt(this.alumnos[index].c4);
                n++;
            }
            if(this.alumnos[index].c5 != null)
            {
                prom += parseInt(this.alumnos[index].c5);
                n++;
            }
            if(n != 0)
            {
                prom = parseFloat(prom/n);     
                           
            }
            return prom;
        },
        getAutenticacion()
        {
            this.$Progress.start();
            axios.get("autenticacion")
            .then(data=>
            {
                this.tipo = data.data.id;
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            });
        },
        getGrados()
        {
            
            this.$Progress.start();
            axios.get("getAreasasignadas")
            .then(data=>
            {
                this.grados     = data.data.grados; 
                // this.cargando1 = false;
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        getAreas(grado)
        {
            this.cargando1 = true;
            this.$Progress.start();
            this.getNivel(grado);
            axios.get("/showareas/"+grado)
            .then(data=>
            {
                this.cargando1 = false;
                this.areas     = data.data.areas; 
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
            
        },
        getNivel(grado)
        {
            this.$Progress.start();
            axios.get("/getNivel/"+grado)
            .then(data=>
            {
                this.nivel     = data.data.nivel; 
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            })
            
        },
        getCapacidades(area)
        {
            this.$Progress.start();
            axios.get("/showcapacities/"+area)
            .then(data=>
            {
                this.capacidades     = data.data.capacities; 
                this.$Progress.finish();
                var select = document.getElementById('area');
                this.area = this.areas[select.selectedIndex].Descripcion;
                
            }
            ).catch(error=>{
                console.log(error);
            })
        },
        getDatos()
        {
            this.$Progress.start();
            axios.get("getDocente")
            .then(data=>
            {
                this.nombre = data.data.docente;
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            });
        },
        getAlumnos(grado)
        {
            this.cargando = false;
            this.$Progress.start();
            $('#table').show();
            var select = document.getElementById('area');
            this.registro.posicion = this.areas[select.selectedIndex].Posicion;
            var pos = this.registro.posicion;
            var bimestre = this.registro.bimestre;
            axios.get("/notas/"+grado+"/"+pos+"/"+bimestre)
            .then(data=>
            {
                this.cargando   = true;
                this.alumnos    = data.data.alumnos;
                this.numerico   = data.data.numerico;
                var select = document.getElementById('grado');
                this.grado = this.grados[select.selectedIndex].grado + " - " +this.grados[select.selectedIndex].seccion;
                
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            });
            console.log(this.alumnos);
        },
        guardar()
        {
            if(this.alumnos.length == 0)
            {
                swal({
                    type: "warning",
                    text: "No existen registros que guardar",
                    showConfirmButton : false,
                    timer : 2000
                });
                return;
            }
            swal({
                imageUrl    : "img/loading.gif",
                text        : "los notas se est??n registrando, por favor no cierre esta ventana",
                showConfirmButton: false
            })
            var n = 0;
            this.alumnos.forEach(element=>
            {
                
                element.promunid1 =  Math.round(this.promedio(n));
                element.promunid2 =  Math.round(this.promediob(n));
                element.prombimestral =  Math.round((element.promunid1+element.promunid2)/2);
                n++;
            });
            axios.post("registrarNotas",{
                registro:this.registro,
                alumnos: this.alumnos,
			}).then(data=>{
                
                swal({
                    type: data.data.type,
                    title: data.data.title,
                    text: data.data.text,
                    showConfirmButton: false,
                    timer : 2000
                });
				setTimeout(() => {
					location.reload();
				}, 2000);
			}).catch(error=>{
				console.log(error);	
			})
        },
        
        
    }
}
</script>