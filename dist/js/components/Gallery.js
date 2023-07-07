app.component('gallery-section',{
    props:{
        recipes:{
            type: Array
        }
    },
    template:
    /*html*/
    `<!-- Modales -->
    <div class="modal fade" id="imagesModal" tabindex="-1" role="dialog" aria-labelledby="imagesModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered custom-modal modal-dialog-scrollable">
        <div class="modal-content modal-design">
            <div class="modal-header header-mc hd-gallery">
            <h5 class="modal-title ms-3 txt-wb" id="imagesModalLabel">Gallery</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            <div class="d-flex justify-content-center flex-wrap align-items-center mt-4 mb-4 pd-gallery">
                <section v-for="(element, index) in recipes">
                    <section v-if="index % 7 === 0 || index % 7 === 1 || index % 7 === 2">
                        <div class="one-box">
                            <img v-bind:src="element.image" alt="element.name" class="image-one">
                        </div>
                    </section>
                    <section v-else>
                        <div class="two-box">
                            <img v-bind:src="element.image" alt="element.name" class="image-two">
                        </div>
                    </section>
                </section>
            </div>

            </div>
            <div class="modal-footer">
            <button type="button" class="btn-cmodal btnc-gallery" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
    </div>`
})