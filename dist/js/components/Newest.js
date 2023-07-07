app.component('newest-recipes',{
    emits: ['showdetails', 'recipelike', 'recipeunlike'],//emision de eventos
    props:{
        recipes:{
            type: Array
        },
        online:{
            type:Boolean,
            default:false
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
        showNewest(){ //muestra las ultimas 5 recetas del array
            return this.recipes.slice(-5);
        }
    },
    template:
    /*html*/
    `<!-- Modales -->
    <div class="modal fade" id="newestModal" tabindex="-1" role="dialog" aria-labelledby="newestModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered custom-modal modal-dialog-scrollable">
            <div class="modal-content modal-design">
            <div class="modal-header header-mc">
                <h5 class="modal-title" id="newestModalLabel">Our newest recipes</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="d-fb cards-modal justify-content-between">
                    <div class="size-card" v-for="element in showNewest">
                        <button type="button" class="conf-cards" v-on:click="onClickShowDetails(element.id)">
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
                                        <p class="description-card txt-description">{{ element.description }}...</p>
                                        <p class="category-card text-center categories-txt">{{ element.category }}</p>
                                        <p class="category-card text-center categories-txt">{{ element.difficulty }}</p>
                                    </div>
                                </section>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn-cmodal" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`
})