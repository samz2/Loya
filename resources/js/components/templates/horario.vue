<template>
	<div class="container-fluid">
		<br><br>
			<div v-if="!cargando2" class="row justify-content-center">
				<div  class="spinner-border text-primary" role="status">
				</div>
				<br>
				<b class="text-primary">Cargando Contenido ...</b>
			</div>
            <div class="row justify-content-center" v-else>
                <div class="col-lg-3 col-xs-6">
                    <div class="small-box bg-indigo">
                        <div class="inner">
                        <h3>Mi Horario</h3>

                        <p>{{"grado"}}</p>
                        </div>
                        <div class="icon">
                        <i class="fa fa-calendar x3"></i>
                        </div>
                        <a href="#" data-toggle="modal" data-target="#exampleModal" class="small-box-footer">Mas Información<i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
            <!-- modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                <div class="modal-content">
                <div class="modal-header bg-azul text-white text-center">
                    <h5 class=" text-center" id="exampleModalLabel">Mi Horario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
					<div class="text-center">
						<div v-if="!cargando1" class="spinner-border text-primary" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
					
                    <div class="row justify-content-center" v-if="cargando1 && url != ''">
                        <a title="click para descargar" :href="url" download="horario"><img :src="url" alt="descargar pdf" height="360" width="600" style="border: 2px"></a>
                    </div>
                    <div class="row justify-content-center" v-if="cargando1 && url == ''">
                        <h3 class="text-primary">No se ha registrado el horario aún </h3>
                    </div>	
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
            </div>
            <!-- fin -->
	</div>    
</template>

<script>
    export default {
    data() {
        return {

			url:null,
			pagadas:null,
			nopagadas:null,
			ingresos:null,
            cargando1:false,
            cargando2:false,
            cargando3:false,
        }
	},
	mounted()
	{
		$('#cod').hide();
		$('#objetivo').hide();
		$('#matricula').hide();
	},
	created()
    {
		this.getHorario();
    },
    methods: {
  		getHorario()
		{
			this.cargando1 = false;
			this.cargando2 = false;
			this.$Progress.start();
			axios.get("getHorario")
			.then(data=>
			{
				this.cargando1 = true;
				this.cargando2 = true;
				this.url = data.data.url;
				this.$Progress.finish();
				console.log(data.data);
			}
			).catch(error=>
			{
				console.log(error);
			})
		},
				
    }
}
</script>
