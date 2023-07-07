app.component('recipe-details',{
    emits:['recipelike', 'recipeunlike', 'showdetails'], //emision de eventos
    props:{
        featuredrecipes:{
            type: Array
        },
        id:{
            type: Number
        },
        name:{
            type: String,
            default: "default name"
        },
        image:{
            type: String
        },
        category:{
            type: String,
            default: "default category"
        },
        difficulty:{
            type: String,
            default: "default difficulty"
        },
        likes:{
            type: Number,
            default: 0
        },
        totalt:{
            type: Number,
            default: 0
        },
        cookt:{
            type: Number,
            default: 0
        },
        prept:{
            type: Number,
            default: 0
        },
        servings:{
            type: Number,
            default: 0
        },
        occasion:{
            type: String,
            default: "default occasion"
        },
        description:{
            type: String,
            default: "default description"
        },
        ingredients:{
            type: String,
            default: "default ingredients"
        },
        instructions:{
            type: String,
            default: "default instructions"
        },
        online:{
            type:Boolean,
            default:false
        }
    },
    computed: {
        showIngredients() {
            let formatted = this.ingredients.split("*"); //divide los ingredientes por los asteriscos
            return formatted;
        },
        showInstructions() {
            let formatted = this.instructions.split("*"); //divide las instrucciones por los asteriscos
            return formatted;
        },
        showRelated(){
            return this.featuredrecipes.slice(0, 3); //muestra unicamente 3 recetas del array
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
    template:
    /*html*/
    `<div class="container-details">
            <section>
                <section class="d-flex justify-content-center align-items-center">
                    <div class="circle-top justify-content-center align-items-center">
                        <p class="pt-3">10</p>
                    </div>
                </section>
                <div class="details-name d-flex align-items-center justify-content-center">
                    <p class="name-dt">{{ name }}</p>
                </div>
                <img v-bind:src="image" class="img-details" alt="name">
            </section>

            <div class="m-details">
                <section class="d-fbd justify-content-center dt-gap">
                    <p class="details-text">Difficulty: <span class="txt-black"> {{ difficulty }}</span></p>
                    <p class="details-text">Category: <span class="txt-black"> {{ category }}</span></p>
                    <p class="details-text">Total time: <span class="txt-black"> {{ totalt }} min</span></p>
                    <p class="details-text">Servings: <span class="txt-black">{{ servings }}</span></p>
                </section>
                <section class="d-fbd justify-content-center dt-gap">
                    <p class="details-text">Prep time: <span class="txt-black">{{ prept }} min</span></p>
                    <p class="details-text">Cook time: <span class="txt-black">{{ cookt }} min</span></p>
                    <p class="details-text">Occasion: <span class="txt-black">{{ occasion }}</span></p>
                    <p class="details-text m-dtk"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart-fill heart-dt" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg><span class="txt-black">{{ likes }}</span></p>
                </section>
            </div>

            <section>
                <h4>Description</h4>
                <p class="txt-recipes mb-5">{{ description }}</p>
                <h4>Ingredients</h4>
                <div class="mb-ins">
                <p v-for="ingredient in showIngredients" class="txt-recipes">• {{ ingredient }}</p>
                </div>
                <h4>Instructions</h4>
                <section class="mb-ins">
                <p v-for="(instruction, index) in showInstructions" class="txt-recipes"><!--{{index + 1}}.--> {{ instruction }}</p>
                </section>
                <p class="txt-recipes"></p>

                <h4>Related recipes</h4>

                <div class="d-flex cards-recipes mb-5">
                    <div class="size-card" v-for="(element, index) in showRelated">
                        <button v-on:click="onClickShowDetails(element.id)" type="button" class="conf-cards">
                            <div class="card-top">

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
                                        <p class="category-card text-center categories-txt">{{ element.category }}</p>
                                        <p class="category-card text-center categories-txt">{{ element.difficulty }}</p>
                                        <p class="txt-likes text-center"><span><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart-fill card-heart" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                            </svg></span> {{ element.likes }}</p>
                                    </div>
                                </section>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </div>`
})