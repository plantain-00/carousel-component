import Vue from 'vue'
import Component from 'vue-class-component'
// tslint:disable:no-duplicate-imports
import '../dist/'
import { CarouselData } from '../dist/'

const itemComponentName = 'carousel-item'

@Component({
  template: `<span>{{data}}</span>`,
  props: ['data']
})
class CarouselItem extends Vue {
  data!: number
}
Vue.component(itemComponentName, CarouselItem)

@Component({
  template: `
    <div>
        <a href="https://github.com/plantain-00/carousel-component/tree/master/packages/vue/demo" target="_blank">the source code of the demo</a>
        <carousel :data="data"
            timeout="500"
            interval="3000"
            count="5"
            width="200"
            height="150">
        </carousel>
    </div>
    `
})
class App extends Vue {
  data: CarouselData<number>[] = [
        { data: 1, component: itemComponentName },
        { data: 2, component: itemComponentName },
        { data: 3, component: itemComponentName },
        { data: 4, component: itemComponentName },
        { data: 5, component: itemComponentName },
        { data: 6, component: itemComponentName },
        { data: 7, component: itemComponentName },
        { data: 8, component: itemComponentName },
        { data: 9, component: itemComponentName }
  ]
}

// tslint:disable-next-line:no-unused-expression
new App({ el: '#container' })
