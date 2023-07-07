const app = Vue.createApp({
    data() {
        return {
            searchTerm: "",
            idRecipe: "",
            optionName: "All Recipes",
            prepValue: 0,
            cookValue: 0,
            servingsValue: 0,

            //users
            uemail: "",
            upassword: "",
            name: "",
            username: "",
            country: "Costa Rica",
            online: false,
            newpassword: "",
            //users

            //sesion iniciada
            logid: "",
            logusername: "",
            logemail:"",
            logname:"",
            //sesion iniciada

            principal: true,
            allRecipes: false,
            searchResults: false,
            footer: false,
            detailsView: false,

            fstatus: false,
            rstatus: false,

            recipes:[],
            trendings:[],
            levels:[],
            categories:[],
            occasions:[],
            optionsRecipes:[],
            searchData:[],
            featuredRecipes:[],
            savedRecipes:[],

            recipe:{}
        }
    },
    mounted(){

        this.dataPage();

        //agregar complejidad
        axios({
            method: 'get',
            url:'http://proyectobloom.test/api/recipes/levels'
           })
        .then(
            (response) => {
                let items = response.data;
                //console.log(items);

                items.forEach(element => {
                    this.levels.push({ 
                            id: element.id,
                            difficulty: element.level
                        })
                });
            }
        )
        .catch(
            error => console.log(error)
        );

        //agregar categorías
        axios({
            method: 'get',
            url:'http://proyectobloom.test/api/recipes/categories'
           })
        .then(
            (response) => {
                let items = response.data;
                //console.log(items);

                items.forEach(element => {
                    this.categories.push({ 
                            id: element.id,
                            category: element.category,
                        })
                });
            }
        )
        .catch(
            error => console.log(error)
        );

        //agregar ocasiones
        axios({
            method: 'get',
            url:'http://proyectobloom.test/api/recipes/occasions'
           })
        .then(
            (response) => {
                let items = response.data;
                //console.log(items);

                items.forEach(element => {
                    this.occasions.push({ 
                            id: element.id,
                            occasion: element.occasion,
                        })
                });
            }
        )
        .catch(
            error => console.log(error)
        );
        
    },
    methods: {
        dataPage(){ //actualiza todos los datos de la pagina principal 
            //revisa si hay sesion iniciada y envio de datos del usuario
        let token = localStorage.getItem('token');
        console.log(token);

        if (token) {
            this.online = true;
            this.logid = localStorage.getItem('id');
            this.logname = localStorage.getItem('name');
            this.logemail = localStorage.getItem('email');
            this.logusername = localStorage.getItem('username');
            
            console.log(localStorage.getItem('name'));

            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/users/savedrecipes/'+this.logid
                })
            .then(
                (response) => {
                    let items = response.data;
                    console.log(items);
                    this.savedRecipes = [];

                    if(items.length > 0){
                        //console.log(items);
                        items.forEach(element => {
                            this.savedRecipes.push({ 
                                    id: element.id,
                                    image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                    name: element.name,
                                    likes: element.likes,
                                    category: element.category,
                                    difficulty: element.level,
                                    onLike: false,
                                    onUnlike: true
                                })
    
                        });

                        //agregar trendings
                        axios({
                            method: 'get',
                            url:'http://proyectobloom.test/api/recipes/top10'
                           })
                        .then(
                            (response) => {
                                let items = response.data;
                                //console.log(items);
                                this.trendings = [];
                
                                items.forEach(element => {
                                    
                                    let isLiked = false;
                                    let isUnliked = false;
                                    let foundMatch = false;
                
                                    if (this.savedRecipes) {
                                        this.savedRecipes.forEach((savedRecipe) => {
                                            if (savedRecipe.id === element.id) {
                                                foundMatch = true;
                                            }
                                        });
                
                                        if (foundMatch) {
                                            isLiked = false;
                                            isUnliked = true;
                                        } else {
                                            isLiked = true;
                                            isUnliked = false;
                                        }
                                    } else {
                                        isLiked = true;
                                        isUnliked = false;
                                    }
                
                                    //console.log("like? " + isLiked + "// no like? " +isUnliked);
                
                                    this.trendings.push({ 
                                            id: element.id,
                                            image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                            name: element.name,
                                            likes: element.likes,
                                            category: element.category,
                                            difficulty: element.level,
                                            onLike: isLiked,
                                            onUnlike: isUnliked
                                    })
                                    
                                });
                                
                            }
                        )
                        .catch(
                            error => console.log(error)
                        );

                        //agregar recetas desde el api
                        axios({
                            method: 'get',
                            url:'http://proyectobloom.test/api/recipes/all'
                        })
                        .then(
                            (response) => {
                                let items = response.data;
                                //console.log(items);
                                this.recipes = [];

                                items.forEach(element => {

                                    let isLiked = false;
                                    let isUnliked = false;
                                    let foundMatch = false;

                                    if (this.savedRecipes) {
                                        this.savedRecipes.forEach((savedRecipe) => {
                                            if (savedRecipe.id === element.id) {
                                                foundMatch = true;
                                            }
                                        });

                                        if (foundMatch) {
                                            isLiked = false;
                                            isUnliked = true;
                                        } else {
                                            isLiked = true;
                                            isUnliked = false;
                                        }
                                    } else {
                                        isLiked = true;
                                        isUnliked = false;
                                    }

                                    this.recipes.push({ 
                                            id: element.id,
                                            image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                            name: element.name,
                                            likes: element.likes,
                                            category: element.category,
                                            description: element.description,
                                            difficulty: element.level,
                                            onLike: isLiked,
                                            onUnlike: isUnliked
                                        })
                                });
                            }
                        )
                        .catch(
                            error => console.log(error)
                        );
                    }else{

                        //agregar trendings
                        axios({
                            method: 'get',
                            url:'http://proyectobloom.test/api/recipes/top10'
                           })
                        .then(
                            (response) => {
                                let items = response.data;
                                //console.log(items);
                                this.trendings = [];
                
                                items.forEach(element => {
                                    
                                    let isLiked = false;
                                    let isUnliked = false;
                                    let foundMatch = false;
                
                                    if (this.savedRecipes) {
                                        this.savedRecipes.forEach((savedRecipe) => {
                                            if (savedRecipe.id === element.id) {
                                                foundMatch = true;
                                            }
                                        });
                
                                        if (foundMatch) {
                                            isLiked = false;
                                            isUnliked = true;
                                        } else {
                                            isLiked = true;
                                            isUnliked = false;
                                        }
                                    } else {
                                        isLiked = true;
                                        isUnliked = false;
                                    }
                
                                    //console.log("like? " + isLiked + "// no like? " +isUnliked);
                
                                    this.trendings.push({ 
                                            id: element.id,
                                            image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                            name: element.name,
                                            likes: element.likes,
                                            category: element.category,
                                            difficulty: element.level,
                                            onLike: isLiked,
                                            onUnlike: isUnliked
                                    })
                                    
                                });
                                
                            }
                        )
                        .catch(
                            error => console.log(error)
                        );

                        //agregar recetas desde el api
                        axios({
                            method: 'get',
                            url:'http://proyectobloom.test/api/recipes/all'
                        })
                        .then(
                            (response) => {
                                let items = response.data;
                                //console.log(items);
                                this.recipes = [];

                                items.forEach(element => {

                                    let isLiked = false;
                                    let isUnliked = false;
                                    let foundMatch = false;

                                    if (this.savedRecipes) {
                                        this.savedRecipes.forEach((savedRecipe) => {
                                            if (savedRecipe.id === element.id) {
                                                foundMatch = true;
                                            }
                                        });

                                        if (foundMatch) {
                                            isLiked = false;
                                            isUnliked = true;
                                        } else {
                                            isLiked = true;
                                            isUnliked = false;
                                        }
                                    } else {
                                        isLiked = true;
                                        isUnliked = false;
                                    }

                                    this.recipes.push({ 
                                            id: element.id,
                                            image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                            name: element.name,
                                            likes: element.likes,
                                            category: element.category,
                                            description: element.description,
                                            difficulty: element.level,
                                            onLike: isLiked,
                                            onUnlike: isUnliked
                                        })
                                });
                            }
                        )
                        .catch(
                            error => console.log(error)
                        );
                    }

                }
            )
            .catch(
                error => console.log(error)
            );
        } else {
            this.online = false;

            //agregar trendings
            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/recipes/top10'
               })
            .then(
                (response) => {
                    let items = response.data;
                    //console.log(items);
                    this.trendings = [];
    
                    items.forEach(element => {
                        
                        let isLiked = false;
                        let isUnliked = false;
                        let foundMatch = false;
    
                        if (this.savedRecipes) {
                            this.savedRecipes.forEach((savedRecipe) => {
                                if (savedRecipe.id === element.id) {
                                    foundMatch = true;
                                }
                            });
    
                            if (foundMatch) {
                                isLiked = false;
                                isUnliked = true;
                            } else {
                                isLiked = true;
                                isUnliked = false;
                            }
                        } else {
                            isLiked = true;
                            isUnliked = false;
                        }
    
                        //console.log("like? " + isLiked + "// no like? " +isUnliked);
    
                        this.trendings.push({ 
                                id: element.id,
                                image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                name: element.name,
                                likes: element.likes,
                                category: element.category,
                                difficulty: element.level,
                                onLike: isLiked,
                                onUnlike: isUnliked
                        })
                        
                    });
                    
                }
            )
            .catch(
                error => console.log(error)
            );
    
            //agregar recetas desde el api
            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/recipes/all'
            })
            .then(
                (response) => {
                    let items = response.data;
                    //console.log(items);
                    this.recipes = [];
    
                    items.forEach(element => {
    
                        let isLiked = false;
                        let isUnliked = false;
                        let foundMatch = false;
    
                        if (this.savedRecipes) {
                            this.savedRecipes.forEach((savedRecipe) => {
                                if (savedRecipe.id === element.id) {
                                    foundMatch = true;
                                }
                            });
    
                            if (foundMatch) {
                                isLiked = false;
                                isUnliked = true;
                            } else {
                                isLiked = true;
                                isUnliked = false;
                            }
                        } else {
                            isLiked = true;
                            isUnliked = false;
                        }
    
                        this.recipes.push({ 
                                id: element.id,
                                image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                name: element.name,
                                likes: element.likes,
                                category: element.category,
                                description: element.description,
                                difficulty: element.level,
                                onLike: isLiked,
                                onUnlike: isUnliked
                            })
                    });
                }
            )
            .catch(
                error => console.log(error)
            );
        }
        
        },

        searchRecipes(){ //realiza la busqueda de las recetas y las añade al array de resultados
            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/recipes/searchbyname/'+this.searchTerm
               })
            .then(
                (response) => {
                    let items = response.data;
                    this.searchData = [];

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                    if(this.searchTerm != ""){
                        this.$root.principal = false;
                        this.$root.searchResults = true;
                        this.$root.footer = true;
                        this.$root.allRecipes = false;
                        this.$root.detailsView = false;
                    }

                    //console.log("palabra " +this.searchTerm);
                    if(items != null){
                        items.forEach(element => {
                            let isLiked = false;
                            let isUnliked = false;
                            let foundMatch = false;

                            if (this.savedRecipes) {
                                this.savedRecipes.forEach((savedRecipe) => {
                                    if (savedRecipe.id === element.id) {
                                        foundMatch = true;
                                    }
                                });

                                if (foundMatch) {
                                    isLiked = false;
                                    isUnliked = true;
                                } else {
                                    isLiked = true;
                                    isUnliked = false;
                                }
                            } else {
                                isLiked = true;
                                isUnliked = false;
                            }

                            this.searchData.push({ 
                                    id: element.id,
                                    image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                    name: element.name,
                                    likes: element.likes,
                                    category: element.category,
                                    description: element.description,
                                    difficulty: element.level,
                                    onLike: isLiked,
                                    onUnlike: isUnliked
                                })
                        });
                    }

                    if (this.searchData.length > 0) {
                        this.fstatus = false;
                    }else{
                        this.fstatus = true;
                    }

                }
            )
            .catch(
                error => console.log(error)
            );
        },

        onClickSearchRecipe(searchTerm){ //recibe el termino y ejecuta el buscar 
            this.searchTerm=searchTerm;
            //console.log(searchTerm);
            this.searchRecipes();
        },

        showRecipes(){ //mostrar pagina de recetas y footer
            this.$root.principal = false;
            this.$root.detailsView = false;
            this.$root.searchResults = false;
            this.$root.allRecipes = true;
            this.$root.footer = true;

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            this.fstatus = false;
            this.rstatus = true;
        },

        showLevels(level){ //mostrar pagina de recetas y footer

            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/recipes/levels'
               })
            .then(
                (response) => {
                    let item = response.data;
                    //console.log(item);
                    item.forEach(element => {
                        if(element.id == level){
                            this.optionName = element.level;
                        }
                    });
                }
            )
            .catch(
                error => console.log(error)
            );

            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/recipes/filterby/level/'+level
               })
            .then(
                (response) => {
                    let items = response.data;
                    //console.log(items);
                    this.optionsRecipes = [];
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                                
                    this.$root.principal = false;
                    this.$root.detailsView = false;
                    this.$root.searchResults = false;
                    this.$root.allRecipes = true;
                    this.$root.footer = true;

                    this.fstatus = false;
                    this.rstatus = false;
    
                    items.forEach(element => {

                        let isLiked = false;
                        let isUnliked = false;
                        let foundMatch = false;

                        if (this.savedRecipes) {
                            this.savedRecipes.forEach((savedRecipe) => {
                                if (savedRecipe.id === element.id) {
                                    foundMatch = true;
                                }
                            });

                            if (foundMatch) {
                                isLiked = false;
                                isUnliked = true;
                            } else {
                                isLiked = true;
                                isUnliked = false;
                            }
                        } else {
                            isLiked = true;
                            isUnliked = false;
                        }

                        this.optionsRecipes.push({ 
                                id: element.id,
                                image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                name: element.name,
                                likes: element.likes,
                                category: element.category,
                                description: element.description,
                                difficulty: element.level,
                                onLike: isLiked,
                                onUnlike: isUnliked
                            })
                    });
                }
            )
            .catch(
                error => console.log(error)
            );
        },

        showOccasions(occasion){ //mostrar pagina de recetas y footer

            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/recipes/occasions'
               })
            .then(
                (response) => {
                    let item = response.data;
                    //console.log(item);
                    item.forEach(element => {
                        if(element.id == occasion){
                            this.optionName = element.occasion;
                        }
                    });
                }
            )
            .catch(
                error => console.log(error)
            );

            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/recipes/filterby/occasion/'+occasion
               })
            .then(
                (response) => {
                    let items = response.data;
                    //console.log(items);
                    this.optionsRecipes = [];

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                                
                    this.$root.principal = false;
                    this.$root.detailsView = false;
                    this.$root.searchResults = false;
                    this.$root.allRecipes = true;
                    this.$root.footer = true;

                    this.fstatus = false;
                    this.rstatus = false;
    
                    items.forEach(element => {

                        let isLiked = false;
                        let isUnliked = false;
                        let foundMatch = false;

                        if (this.savedRecipes) {
                            this.savedRecipes.forEach((savedRecipe) => {
                                if (savedRecipe.id === element.id) {
                                    foundMatch = true;
                                }
                            });

                            if (foundMatch) {
                                isLiked = false;
                                isUnliked = true;
                            } else {
                                isLiked = true;
                                isUnliked = false;
                            }
                        } else {
                            isLiked = true;
                            isUnliked = false;
                        }

                        this.optionsRecipes.push({ 
                                id: element.id,
                                image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                name: element.name,
                                likes: element.likes,
                                category: element.category,
                                description: element.description,
                                difficulty: element.level,
                                onLike: isLiked,
                                onUnlike: isUnliked
                            })
                    });
                }
            )
            .catch(
                error => console.log(error)
            );
        },

        showCategories(category){ //mostrar pagina de recetas y footer

            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/recipes/categories'
               })
            .then(
                (response) => {
                    let item = response.data;
                    //console.log(item);
                    item.forEach(element => {
                        if(element.id == category){
                            this.optionName = element.category;
                        }
                    });
                }
            )
            .catch(
                error => console.log(error)
            );

            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/recipes/filterby/category/'+category
               })
            .then(
                (response) => {
                    let items = response.data;
                    //console.log(items);
                    this.optionsRecipes = [];

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                                
                    this.$root.principal = false;
                    this.$root.detailsView = false;
                    this.$root.searchResults = false;
                    this.$root.allRecipes = true;
                    this.$root.footer = true;

                    this.fstatus = false;
                    this.rstatus = false;
    
                    items.forEach(element => {

                        let isLiked = false;
                        let isUnliked = false;
                        let foundMatch = false;

                        if (this.savedRecipes) {
                            this.savedRecipes.forEach((savedRecipe) => {
                                if (savedRecipe.id === element.id) {
                                    foundMatch = true;
                                }
                            });

                            if (foundMatch) {
                                isLiked = false;
                                isUnliked = true;
                            } else {
                                isLiked = true;
                                isUnliked = false;
                            }
                        } else {
                            isLiked = true;
                            isUnliked = false;
                        }

                        this.optionsRecipes.push({ 
                                id: element.id,
                                image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                name: element.name,
                                likes: element.likes,
                                category: element.category,
                                description: element.description,
                                difficulty: element.level,
                                onLike: isLiked,
                                onUnlike: isUnliked
                            })
                    });
                }
            )
            .catch(
                error => console.log(error)
            );
        },

        showHome(){ //mostrar pagina principal
            this.$root.principal = true;
            this.$root.allRecipes = false;
            this.$root.searchResults = false;
            this.$root.detailsView = false;
            this.$root.footer = false;

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            this.fstatus = false;
        },
        
        onClickShowDetails(id){ //mostrar detalles de la receta seleccionada
            //mostrar una receta
            //console.log("muestra el id" +id);
            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/recipes/recipe/'+id
                })
            .then(
                (response) => {
                    let item = response.data[0];
                    let ingredient = response.data[1];
                    let featured = response.data[2];
                    this.featuredRecipes = [];
                    //console.log(item);
                    //console.log(id);

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                    this.fstatus = false;

                    this.$root.principal = false;
                    this.$root.allRecipes = false;
                    this.$root.searchResults = false;
                    this.$root.detailsView = true;
                    this.$root.footer = true;

                    let ingredientsList = "";
                    let ingredientsA = [];
                    ingredient.forEach(element => {
                        ingredientsA.push(`${element.amount} ${element.measurement_unit} ${element.description}`);
                    });
                    
                    ingredientsList = ingredientsA.join('*');

                    let instructions = "";
                    item.forEach(element => {
                        instructions = element.preparation_instructions.replace(/([.,]\s)(Step)/g, "$1*$2");
                    });


                    item.forEach(element => {
                        this.recipe.id = id,
                        this.recipe.image =  "http://proyectobloom.test/storage/imgs/"+ element.image,
                        this.recipe.name = element.name,
                        this.recipe.likes = element.likes,
                        this.recipe.category = element.category,
                        this.recipe.description = element.description,
                        this.recipe.difficulty = element.level,
                        this.recipe.totalTime = element.total_time,
                        this.recipe.cookTime = element.cooking_time,
                        this.recipe.prepTime = element.preparation_time,
                        this.recipe.servings = element.portions,
                        this.recipe.occasion = element.occasion,
                        this.recipe.ingredients = ingredientsList,
                        this.recipe.instructions = instructions
                    });

                    featured.forEach(element => {

                        let isLiked = false;
                        let isUnliked = false;
                        let foundMatch = false;

                        if (this.savedRecipes) {
                            this.savedRecipes.forEach((savedRecipe) => {
                                if (savedRecipe.id === element.id) {
                                    foundMatch = true;
                                }
                            });

                            if (foundMatch) {
                                isLiked = false;
                                isUnliked = true;
                            } else {
                                isLiked = true;
                                isUnliked = false;
                            }
                        } else {
                            isLiked = true;
                            isUnliked = false;
                        }

                        this.featuredRecipes.push({ 
                                id: element.id,
                                image: "http://proyectobloom.test/storage/imgs/"+ element.image,
                                name: element.name,
                                likes: element.likes,
                                category: element.category,
                                description: element.description,
                                difficulty: element.level,
                                onLike: isLiked,
                                onUnlike: isUnliked
                            })
                    });
                }
            )
            .catch(
                error => console.log(error)
            );
        },

        onClickRecipeLike(idrecipe){ //aumentar likes idrecipe
            let logid = localStorage.getItem('id');

            //console.log("valor de logid "+logid);
            //console.log("valor de idrecipe "+idrecipe);
            
            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/users/likes/' + logid + '/' + idrecipe
               })
            .then(
                (response) => {
                    //let session = response.data;
                    //console.log(session);
                    this.dataPage();
                }
            )

            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/users/saverecipe/' + logid + '/' + idrecipe
               })
            .then(
                (response) => {
                    //let sessiontwo = response.data;
                    //console.log(sessiontwo);
                    this.dataPage();
                }
            )
        },

        onClickRecipeUnlike(idrecipe){ //disminuir likes

            let logid = localStorage.getItem('id');

            console.log("valor de logid "+logid);
            console.log("valor de idrecipe "+idrecipe);
            
            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/users/dislikes/' + logid + '/' + idrecipe
               })
            .then(
                (response) => {
                    let session = response.data;
                    //console.log(session);
                    this.dataPage();
                }
            )

            axios({
                method: 'get',
                url:'http://proyectobloom.test/api/users/removesavedrecipe/' + logid + '/' + idrecipe
               })
            .then(
                (response) => {
                    let sessiontwo = response.data;
                    //console.log(sessiontwo);
                    this.dataPage();
                }
            )
            /*axios({
                method: 'get',
                url:'http://proyectobloom.test/api/users/saverecipe/' + logid + '/' + idrecipe
               })
            .then(
                (response) => {
                    let sessiontwo = response.data;
                    console.log(sessiontwo);
                    this.dataPage();
                }
            )*/
            console.log(idrecipe + "unlikeeeeeeee")
            /*let recipe = this.recipes.find(r => r.id === id);
            if (recipe) {
                recipe.likes--;
                recipe.onlike=true;
                recipe.onUnlike=false;
            }*/
        },

        onClickLogin(){ //iniciar sesion //username3@gmail.com //pwd12345

            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('username');

            axios({
                method: 'post',
                url:'http://proyectobloom.test/api/users/login',
                data: {
                  email: this.uemail,
                  password: this.upassword
                }
               })
            .then(
                (response) => {
                    let session = response.data;
                    //console.log(session);

                    localStorage.setItem('token', session.accessToken);
                    localStorage.setItem('id', session.user.id);
                    localStorage.setItem('name', session.user.name);
                    localStorage.setItem('email', session.user.email);
                    localStorage.setItem('username', session.user.last_name);

                    window.location.href = 'http://bloomrecipes.test/dist/';
                }
            )
        },

        onClickLogout(){ //cerrar la sesion
            let token = localStorage.getItem('token');
            console.log(token);

            axios({
                method: 'get',
                url: 'http://proyectobloom.test/api/users/logout',
                headers: {
                    Authorization: `Bearer ${token}`
                }
               })
            .then(
                (response) => {
                    let session = response.data;
                    console.log(session);

                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    localStorage.removeItem('name');
                    localStorage.removeItem('email');
                    localStorage.removeItem('username');

                    window.location.href = 'http://bloomrecipes.test/dist/';
                }
            )
        },

        onClickRegister(){ //Registrar un usuario nuevo

            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('username');

            axios({
                method: 'post',
                url: 'http://proyectobloom.test/api/users/register',
                data: {
                    name: this.name,
                    last_name: this.username,
                    country: this.country,
                    email: this.uemail,
                    password: this.upassword
                }
               })
            .then(
                (response) => {
                    let session = response.data;
                    console.log(session);

                    localStorage.setItem('token', session.access_token);
                    localStorage.setItem('id', session.data.id);
                    localStorage.setItem('name', session.data.name);
                    localStorage.setItem('email', session.data.email);
                    localStorage.setItem('username', session.data.last_name);

                    window.location.href = 'http://bloomrecipes.test/dist/';
                }
            )
        },

        onClickRecoverPassword(){ //Registrar un usuario nuevo

            //console.log(this.uemail);
            axios({
                method: 'post',
                url: 'http://proyectobloom.test/api/users/recoverpassword',
                data: {
                    email: this.uemail
                }
               })
            .then(
                (response) => {
                    let session = response.data;
                    //console.log(session);
                    this.newpassword = session.password;
                    //console.log(this.newpassword);
                }
            )

        },

        redirectToLogin(){ //Redirecciona a la pagina de login
            window.location.href = 'http://bloomrecipes.test/dist/login.html';
        }
            
    }
})