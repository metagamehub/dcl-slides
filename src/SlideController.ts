import { Slides } from "./Slides";

/**
 * This Component can be added to an entity. When the entity is clicked, the next slide will be shown.
 */
@Component("SlideController")
export class NextSlideComponent {
    private slides: Slides;
    /**
     * Constructs a new NextSlideComponent. This Component can be added to an entity. When the entity is clicked, the next slide will be shown.
     * @param entity The entity that will be clicked to show the next slide
     * @param slides The slide show that will be shown
     */
    constructor(entity: Entity, slides: Slides) {
        this.slides = slides;
        entity.addComponentOrReplace(new OnPointerDown(
            (e) => {
                this.slides.nextSlide();
            }
        ));
    }
}

/**
 * This Component can be added to an entity. When the entity is clicked, the previous slide will be shown.
 */
@Component("SlideController")
export class PreviousSlideComponent {
    private slides: Slides;
    /**
     * Constructs a new PreviousSlideComponent. This Component can be added to an entity. When the entity is clicked, the previous slide will be shown.
     * @param entity The entity that will be clicked to show the previous slide
     * @param slides The slide show that will be shown
     */
    constructor(entity: Entity, slides: Slides) {
        this.slides = slides;
        entity.addComponentOrReplace(new OnPointerDown(
            (e) => {
                this.slides.previousSlide();
            }
        ));
    }
}

// Timed slide change
class TimerSystem implements ISystem {
    private timers: { totalTime: number, timeLeftInSeconds: number, callback: () => void, interval: boolean }[] = [];

    public addTimer(milliseconds: number, callback: () => void, isInterval: boolean = false) {
        this.timers.push({ totalTime: milliseconds / 1000, timeLeftInSeconds: milliseconds / 1000, callback: callback, interval: isInterval });
    }

    update(dt: number) {
        for (const timer of this.timers) {
            timer.timeLeftInSeconds -= dt;
            if (timer.timeLeftInSeconds <= 0) {
                timer.callback();
                if (timer.interval) {
                    timer.timeLeftInSeconds = timer.totalTime;
                } else {
                    this.timers = this.timers.filter(t => t !== timer);
                }
            }
        }
    }
}

let timerSystem = null;

/**
 * This class represents a Timed Controller for a slide show. It will automatically change the slide after a certain amount of time.
 */
export class TimedSlideController {
    private slides: Slides;

    /**
     * Constructs a new TimedSlideController. This class represents a Timed Controller for a slide show. It will automatically change the slide after a certain amount of time.
     * @param slides The slide show that is controlled
     * @param time The time in milliseconds between each slide change
     */
    constructor(slides: Slides, time: number) {
        this.slides = slides;

        if (timerSystem == null) {
            timerSystem = new TimerSystem();
            engine.addSystem(timerSystem);
        }

        timerSystem.addTimer(time, () => {
            this.slides.nextSlide();
        }, true);
    }
}



