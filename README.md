# carousel-component

[![Dependency Status](https://david-dm.org/plantain-00/carousel-component.svg)](https://david-dm.org/plantain-00/carousel-component)
[![devDependency Status](https://david-dm.org/plantain-00/carousel-component/dev-status.svg)](https://david-dm.org/plantain-00/carousel-component#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/carousel-component.svg?branch=master)](https://travis-ci.org/plantain-00/carousel-component)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/carousel-component?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/carousel-component/branch/master)
[![npm version](https://badge.fury.io/js/carousel-component.svg)](https://badge.fury.io/js/carousel-component)
[![Downloads](https://img.shields.io/npm/dm/carousel-component.svg)](https://www.npmjs.com/package/carousel-component)

A vuejs and reactjs carousel component.

## features

+ vuejs component
+ reactjs component
+ custom component

## link css

```html
<link rel="stylesheet" href="./node_modules/carousel-component/dist/carousel.min.css" />
```

## vuejs component

`npm i carousel-vue-component`

```ts
import "carousel-vue-component";
```

or

```html
<script src="./node_modules/vue/dist/vue.min.js"></script>
<script src="./node_modules/vue-class-component/dist/vue-class-component.min.js"></script>
<script src="./node_modules/carousel-vue-component/dist/carousel-vue-component.min.js"></script>
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

the online demo: <https://plantain-00.github.io/carousel-component/packages/vue/demo>

## reactjs component

`npm i carousel-react-component`

```ts
import { Carousel } from "carousel-react-component";
```

or

```html
<script src="./node_modules/react/umd/react.production.min.js"></script>
<script src="./node_modules/react-dom/umd/react-dom.production.min.js"></script>
<script src="./node_modules/carousel-react-component/dist/carousel-react-component.min.js"></script>
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

the online demo: <https://plantain-00.github.io/carousel-component/packages/react/demo>

## properties and events of the component

name | type | description
--- | --- | ---
data | [CarouselData](#carousel-data-structure)[] | the data of the carousel
timeout | number | the animation time in milliseconds
interval | number | the movement time in milliseconds
count | number | the item count at most
width | number | width of an item
height | number | height of items

## carousel data structure

```ts
type CarouselData<T = any> = {
    component: string | Function; // the item component, for vuejs, it is the component name, for reactjs, it is the class object
    data: T; // the data will be passed to the component as `data` props
};
```

## change logs

```bash
# v2
npm i carousel-component

# v3
npm i carousel-vue-component
npm i carousel-react-component
```

```ts
// v2
import "carousel-component/vue";
import { Carousel } from "carousel-component/react";

// v3
import "carousel-vue-component";
import { Carousel } from "carousel-react-component";
```

```html
// v2
<link rel="stylesheet" href="./node_modules/carousel-component/carousel.min.css" />

// v3
<link rel="stylesheet" href="./node_modules/carousel-component/dist/carousel.min.css" />
```

```ts
// v2
import "carousel-component/vue";

// v1
import "carousel-component/dist/vue";
```
