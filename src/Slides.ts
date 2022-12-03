
/**
 * This class represents a slide show
 */
export class Slides {
    slideUrls: string[];
    entity: Entity;
    currentSlide: number = 0;

    /**
     * Constructs a new slide show
     * @param entity The entity the slides will be shown on
     * @param slideUrls The urls of the slides. These are the urls of the images that will be shown on the slides. They can be in the scene or in the internet.
     */
    constructor(entity: Entity, slideUrls?: string[] | null) {
        this.slideUrls = slideUrls ?? [];
        this.entity = entity;

        this.updateSlideVisuals();
    }

    /**
     * Adds a slide to the slide show
     * @param slideUrl The url of the slide to add. This is the url of the image that will be shown on the slide. It can be in the scene or in the internet.
     * @param jumpToSlide If true, the slide will be shown immediately. If false, the slide will be added to the end of the slide show.
     */
    public addSlide(slideUrl: string, jumpToSlide: boolean = false) {
        this.slideUrls.push(slideUrl);

        if (jumpToSlide) {
            this.currentSlide = this.slideUrls.length - 1;
        }

        this.updateSlideVisuals();
    }

    /**
     * Removes a slide from the slide show
     * @param slideIndexOrUrl The index of the slide to remove or the url of the slide to remove.
     */
    public removeSlide(slideIndexOrUrl: number | string) {
        let index: number
        if (typeof slideIndexOrUrl === 'number') {
            index = slideIndexOrUrl
        } else {
            index = this.slideUrls.indexOf(slideIndexOrUrl)
        }

        if (index > -1) {
            this.slideUrls.splice(index, 1);
        }

        // check if the removed slide was the current slide
        if (this.currentSlide == index) {
            this.currentSlide = 0;
        }

        this.updateSlideVisuals();
    }

    /**
     * Shows the next slide
     */
    public nextSlide() {
        if (this.currentSlide < this.slideUrls.length - 1) {
            this.currentSlide++;
        } else {
            this.currentSlide = 0;
        }

        this.updateSlideVisuals();
    }

    /**
     * Shows the previous slide
     */
    public previousSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
        } else {
            this.currentSlide = this.slideUrls.length - 1;
        }

        this.updateSlideVisuals();
    }

    /**
     * Updates the visuals of the slide show
     */
    private updateSlideVisuals() {
        if(!this.entity.hasComponent(PlaneShape)){
            this.entity.addComponentOrReplace(new PlaneShape());
        }
        
        let mat = this.entity.getComponentOrCreate(Material)

        log("Updating slide visuals. Slide " + this.currentSlide + " of " + this.slideUrls.length + " slides.")

        // Check if there are any slides
        if (this.slideUrls.length <= 0) {
            mat.albedoTexture = null;
            mat.albedoColor = Color4.Red();
            return;
        } else {
            mat.albedoColor = Color4.White();
        }

        let slideUrl = this.slideUrls[this.currentSlide];

        mat.albedoTexture = new Texture(slideUrl);
    }
}