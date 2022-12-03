# DCL Slides

A simple library to show images as slides in Decentraland



## Install

To install this library, run the following command:

```
npm install dcl-slides
```


## Usage
### Setting up a basic Slide Show

```ts
// Import Slides
import { Slides } from "dcl-slides";

// Create an entity to show the slides on
let slideEntity = new Entity("Slide View");
engine.addEntity(slideEntity);

// Place the entity in the scene
slideEntity.addComponent(
    new Transform({
        position: new Vector3(8, 2, 8),
        // invert the y-scale to fix the flipped uv issue in decentraland
        scale: new Vector3(3, -3, 3)
    }))

// Setup the slides by providing the entity 
// and an initial list of slides
let slides = new Slides(
   // The slides will be shown on a PlaneShape. 
   // You can provide an entity with an already
   // existing PlaneShape and even modify its uvs
   // if needed. If the entity has no PlaneShape,
   // one will be created automatically and other
   // shapes will be replaced
   slideEntity,
   // These slides are urls to images
   // They can be in your project or on the web
   [
      "https://picsum.photos/id/10/4000",
      "https://picsum.photos/id/20/4000",
      "https://picsum.photos/id/30/4000",
      "https://picsum.photos/id/40/4000",
      "https://picsum.photos/id/50/4000"
   ]);
```

To advance the slides use
```ts
slides.nextSlide(); // Shows the next slide
```

To go to the previous slide
```ts
slides.previousSlide(); // Shows the previous slide
```

### Controllers
This library also provides some controllers, that can help with simple functionality.


Adding a button to go to the next slide

```ts
// Add NextSlideComponent to import list
import { NextSlideComponent, Slides } from "dcl-slides";

...

// Create a new entity that acts as the next button
let nextEntity = new Entity("Next Button");
engine.addEntity(nextEntity);
// Place it on the right side of the screen
nextEntity.addComponent(new Transform({ position: new Vector3(5, 1, 8) }));
// Add a box shape to it so we can see and click it
nextEntity.addComponent(new BoxShape());

// Add a NextSlideComponent to the entity
nextEntity.addComponentOrReplace(new NextSlideComponent(
    // The entity to press to go to the next slide
    nextEntity,
    // The slides to control
    slides));
```
You can also add a button to go to the previous slide
```ts
// Add PreviousSlideComponent to import list
import { PreviousSlideComponent, Slides } from "dcl-slides";

...

// Create a new entity that acts as the next button
let prevEntity = new Entity("Prev Button");
engine.addEntity(prevEntity);
// Place it on the left side of the screen
prevEntity.addComponent(new Transform({ position: new Vector3(11, 1, 8) }));
// Add a box shape to it so we can see and click it
prevEntity.addComponent(new BoxShape());

// Add a PreviousSlideComponent to the entity
prevEntity.addComponentOrReplace(new PreviousSlideComponent(
    // The entity to press to go to the previous slide
    prevEntity,
    // The slides to control
    slides));
```

You can also add a slide controller to automatically advance the slides based on a timer

```ts
// Add TimedSlideController to import list
import { TimedSlideController, Slides } from "dcl-slides";

...

// Create a new TimedSlideController
// The first parameter is the slides to control
// The second parameter is the time in milliseconds between each slide
new TimedSlideController(slides, 2000);
```

## Copyright info

Library is distributed under the MIT License. See the terms and conditions in the [LICENSE](/LICENSE) file.
