<template>
    <div class="content">
	    <div class="container-fluid" v-if="tipo != null && tipo == 1">
            <instancia></instancia>
        </div>
        <div class="container-fluid" v-if="tipo != null && tipo != 1">
            <error></error>
        </div>
    </div>	
</template>

<script>
    export default {
    data() {
        return {
            tipo:null,
        }
	},
	created(){
		this.getAutenticacion();
     
	},
	mounted(){
     
	},
    methods: {
        getAutenticacion()
        {
            this.$Progress.start();
            axios.get("autenticacion")
            .then(data=>
            {
                this.tipo = data.data.id;
                console.log(data.data);
                this.$Progress.finish();
            }
            ).catch(error=>{
                console.log(error);
            });
        },
       
       
    }
}
</script>