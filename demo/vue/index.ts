import * as Vue from "vue";
import Component from "vue-class-component";
import "../../dist/vue";

@Component({
    template: `<span>{{data}}</span>`,
    props: ["data"],
})
class CarouselItem extends Vue {
    data: number;
}
Vue.component("carousel-item", CarouselItem);

import { CarouselData } from "../../dist/common";

@Component({
    template: `
    <carousel :data="data"
        timeout="500"
        interval="3000"
        count="5"
        width="200"
        height="150"></carousel>
    `,
})
class App extends Vue {
    data: CarouselData[] = [
        { data: 1, component: "carousel-item" },
        { data: 2, component: "carousel-item" },
        { data: 3, component: "carousel-item" },
        { data: 4, component: "carousel-item" },
        { data: 5, component: "carousel-item" },
        { data: 6, component: "carousel-item" },
        { data: 7, component: "carousel-item" },
        { data: 8, component: "carousel-item" },
        { data: 9, component: "carousel-item" },
    ];
}

// tslint:disable-next-line:no-unused-expression
new App({ el: "#container" });
