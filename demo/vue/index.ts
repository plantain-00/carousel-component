import Vue from "vue";
import Component from "vue-class-component";
// tslint:disable-next-line:no-duplicate-imports
import "../../dist/vue";
import { CarouselData } from "../../dist/vue";

@Component({
    template: `<span>{{data}}</span>`,
    props: ["data"],
})
class CarouselItem extends Vue {
    data: number;
}
Vue.component("carousel-item", CarouselItem);

@Component({
    template: `
    <div>
        <a href="https://github.com/plantain-00/carousel-component/tree/master/demo/vue/index.ts" target="_blank">the source code of the demo</a>
        <carousel :data="data"
            timeout="500"
            interval="3000"
            count="5"
            width="200"
            height="150">
        </carousel>
    </div>
    `,
})
class App extends Vue {
    data: CarouselData<number>[] = [
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

new App({ el: "#container" });
