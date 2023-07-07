app.component('search-section',{
    emits: ['showdetails', 'recipelike', 'recipeunlike'], //emision de eventos
    props:{
        results:{
            type: Array
        },
        term:{
            type: String,
            default: "default term"
        },
        online:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            message: "",
            showicon: false
        }
    },
    methods: {
        onClickShowDetails(id){
            this.$emit('showdetails', id); //Emite el evento y envia el id para mostrar los detalles de la receta
        },
        onClickRecipeLike(id){
            this.$emit('recipelike', id); //Emite el evento y envia el id para aumentar los likes
        },
        onClickRecipeUnlike(id){
            this.$emit('recipeunlike', id); //Emite el evento y envia el id para disminuir los likes
        }
    },
    computed:{
        showResults(){ //define la muestra de el icono de alerta y del mensaje que aparece con el resultado de busqueda
            if (this.results.length > 0) {
                this.showicon=false;
                this.message= "Search results for";
                return this.results;
            } else {
                this.showicon=true;
                this.message= "Sorry, we couldn't find any recipes that match";
            }
        }
    },
    template:
    /*html*/
    `<div class="container-principal">
        <div v-if="showicon" class="d-flex justify-content-center align-items-center mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-exclamation-circle icon-msg text-primary" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
        </div>
        <section class="d-flex justify-content-center">
            <p class="txt-option">{{ message }} '<span class="txt-value">{{ term }}</span>'.</p>
        </section>

        <div class="d-flex cards-recipes">
            <div class="size-card" v-for="element in showResults">
                <button v-on:click="onClickShowDetails(element.id)" type="button" class="conf-cards mb-4">
                    <div class="card-pp">

                        <button v-if="online" v-show="element.onLike" v-on:click.stop="onClickRecipeLike(element.id)" class="btn-heart"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart-fill like-icon" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg></button>

                        <button v-if="online" v-show="element.onUnlike" v-on:click.stop="onClickRecipeUnlike(element.id)" class="btn-heart"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart-fill unlike-icon" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg></button>

                        <section class="img-csz">
                            <img v-bind:src="element.image" class="img-card" alt="{{element.name}}">
                        </section>

                        <div class="degraded"></div>
                        <section class="d-flex justify-content-center">
                            <div class="info-top">
                                <p class="title-card text-center">{{ element.name }}</p>
                                <p class="description-card txt-description">{{ element.description }}</p>
                                <p class="category-card text-center categories-txt">{{ element.category }}</p>
                                <p class="category-card text-center categories-txt">{{ element.difficulty }}</p>
                            </div>
                        </section>
                    </div>
                </button>
            </div>
        </div>
    </div>`
})