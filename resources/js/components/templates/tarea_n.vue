<template>
    <div class="container">
        <div class="row justify-content-center" v-for="t in tareas" :key="t.id">
            <div class="col-md-12">
                <div class="card card-primary">
                    <div class="card-header">{{t.tema}}</div>
                    <div class="card-body">

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
                id:this.$route.params.id,
                datos:{},
                props:["ztareas"],
            }
        },
        created()
        {
            // this.$http.get('../getTareas/'+this.id).then(function (data) {
                // this.datos = data.body; 
                // console.log(this.id);   
            // });
            // this.getDatos();
        },
        mounted() {
            console.log(this.ztareas)
        },
        methods: {
            
            getDatos()
            {
                this.$Progress.start();
                axios.get("../getTareas/"+this.id)
                .then(data=>
                {
                    // this.cursos = data.data.cursos;
                    this.$Progress.finish();
                    console.log(data.data);
                }
                ).catch(error=>{
                    console.log(error);
                })
            },
        }
    }
</script>
