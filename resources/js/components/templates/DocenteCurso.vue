<template>
    <div class="content">
	    <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-info">
                        <div class="card-header bg-azul text-center">
                            <h4 class="title">Cursos Asignados Docentes</h4>  
                        </div>
                        <div class="card-body">
                            <div class="content table-responsive table-full-width">
                                <v-client-table :data="docenteAreas" :columns="columns" :options="options">
                                    <!-- <div slot="Acciones" slot-scope="props">
                                        <button class="btn btn-info altoBoton" data-toggle="tooltip" v-on:click="ver(props.row.ID,props.row.Curso)" data-placement="left" title="Ver Cursos"><i class="fa fa-eye" aria-hidden="true"></i></button>
                                    </div> -->
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
            docenteAreas: [{
				ids:null,
				Nombre:null,
				Apellidos:null,
                area:null,
                Nivel:null,
                grados:null,
            }],
            columns: ["Nombre","Apellidos","Nivel","area","grados"],
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
                    Nombre:"Nombre",
                    Apellidos:"Apellidos",
                    area:"Curso",
                    grados:"Grados",
				},
				sortable: ["Nombre","Apellidos","Nivel","area","grados"],
				filterable: ["Nombre","Apellidos","Nivel","area","grados"]
            },
        }
	},
	mounted()
	{

    },
    created()
    {
        this.getData();
    },
    methods: {
        getData()
        {
            axios.get("DocenteArea")
            .then(data=>
            {
                this.docenteAreas = data.data.docenteAreas;
                console.log(data);
            }
            ).catch(error=>{
                console.log(error);
            })
        },
    }
}

</script>
