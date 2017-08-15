[![Dependency Status](https://david-dm.org/plantain-00/carousel-component.svg)](https://david-dm.org/plantain-00/carousel-component)
[![devDependency Status](https://david-dm.org/plantain-00/carousel-component/dev-status.svg)](https://david-dm.org/plantain-00/carousel-component#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/carousel-component.svg?branch=master)](https://travis-ci.org/plantain-00/carousel-component)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/carousel-component?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/carousel-component/branch/master)
[![npm version](https://badge.fury.io/js/carousel-component.svg)](https://badge.fury.io/js/carousel-component)
[![Downloads](https://img.shields.io/npm/dm/carousel-component.svg)](https://www.npmjs.com/package/carousel-component)

# carousel-component
A vuejs and reactjs carousel component.

#### features

+ vuejs component
+ reactjs component
+ custom component

#### install

`npm i carousel-component`

#### link css

```html
<link rel="stylesheet" href="./node_modules/carousel-component/carousel.min.css" />
```

#### vuejs component demo

`npm i vue vue-class-component`

```ts
import "carousel-component/vue";
```

```html
<carousel :data="data"
    timeout="500"
    interval="3000"
    count="5"
    width="200"
    height="150">
</carousel>
```

the online demo: https://plantain-00.github.io/carousel-component/demo/vue/index.html

#### reactjs component demo

```ts
import { Carousel } from "carousel-component/react";
```

```jsx
<Carousel data={this.data}
    timeout={500}
    interval={3000}
    count={5}
    width={200}
    height={150}>
</Carousel>
```

the online demo: https://plantain-00.github.io/carousel-component/demo/react/index.html

#### properties and events of the component

name | type | description
--- | --- | ---
data | [CarouselData](#carousel-data-structure)[] | the data of the carousel
timeout | number | the animation time in milliseconds
interval | number | the movement time in milliseconds
count | number | the item count at most
width | number | width of an item
height | number | height of items

#### carousel data structure

```ts
type CarouselData<T = any> = {
    component: string | Function; // the item component, for vuejs, it is the component name, for reactjs, it is the class object
    data: T; // the data will be passed to the component as `data` props
};
```

#### change logs

```ts
// v2
import "carousel-component/vue";

// v1
import "carousel-component/dist/vue";
```
