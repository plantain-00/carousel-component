[![Dependency Status](https://david-dm.org/plantain-00/carousel-component.svg)](https://david-dm.org/plantain-00/carousel-component)
[![devDependency Status](https://david-dm.org/plantain-00/carousel-component/dev-status.svg)](https://david-dm.org/plantain-00/carousel-component#info=devDependencies)
[![Build Status](https://travis-ci.org/plantain-00/carousel-component.svg?branch=master)](https://travis-ci.org/plantain-00/carousel-component)
[![npm version](https://badge.fury.io/js/carousel-component.svg)](https://badge.fury.io/js/carousel-component)
[![Downloads](https://img.shields.io/npm/dm/carousel-component.svg)](https://www.npmjs.com/package/carousel-component)

# carousel-component
A vuejs and reactjs carousel component.

#### install

`npm i carousel-component`

#### link css

```html
<link rel="stylesheet" href="./node_modules/carousel-component/dist/carousel.min.css" />
```

#### vuejs component demo

`npm i vue vue-class-component`

```ts
import "carousel-component/dist/vue";
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

the source code of the demo: https://github.com/plantain-00/carousel-component/tree/master/demo/vue

#### reactjs component demo

```ts
import { Carousel } from "carousel-component/dist/react";
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

the source code of the demo: https://github.com/plantain-00/carousel-component/tree/master/demo/react

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
type CarouselData = {
    component: string | Function; // the item component, for vuejs, it is the component name, for reactjs, it is the class object
    data: any; // the data will be passed to the component as `data` props
};
```

#### features

+ vuejs component
+ reactjs component
+ commonjs module
+ custom component
