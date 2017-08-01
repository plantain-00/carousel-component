import Vue from "vue";
import Component from "vue-class-component";
import * as common from "./common";
export * from "./common";
import { vueTemplateHtml } from "./variables";

@Component({
    template: vueTemplateHtml,
    props: ["data", "timeout", "interval", "count", "width", "height"],
})
class Carousel extends Vue {
    data: common.CarouselData[];
    timeout: number;
    interval: number;
    count: number;
    width: number;
    height: number;

    timer: NodeJS.Timer;
    currentIndex = 0;
    hoveringLeft = false;
    hoveringRight = false;
    lastWidth: number;
    lastNum: number;
    actualCount = 0;

    beforeMount() {
        this.actualCount = this.data.length < +this.count ? this.data.length : +this.count;
        this.currentIndex = this.actualCount;
        common.appendLeftAndRightData(this.data, this.actualCount);
        this.start();
    }

    get leftStyle() {
        return {
            opacity: this.hoveringLeft ? 100 : 0,
        };
    }

    get rightStyle() {
        return {
            opacity: this.hoveringRight ? 100 : 0,
        };
    }

    get containerStyle() {
        return {
            width: `${this.width * this.actualCount}px`,
            height: `${this.height}px`,
        };
    }
    get mainStyle() {
        return {
            width: `${this.width * this.actualCount}px`,
        };
    }
    get ulStyle() {
        return {
            width: `${this.width * this.actualCount * 3}px`,
            left: `-${this.width * this.actualCount}px`,
        };
    }
    get liStyle() {
        return {
            width: `${this.width}px`,
            height: `${this.height}px`,
        };
    }

    setStyle(num: number, width: number) {
        if (this.lastNum === num && this.lastWidth === width) {
            return;
        }
        this.lastNum = num;
        this.lastWidth = width;
        common.setStyle(num, width, this.actualCount);
    }
    moveLeft(num: number) {
        this.setStyle(num, this.width);
        common.runAnimation(this.$refs.ul as HTMLElement, this.timeout, "move-left", num, () => {
            this.currentIndex -= num;
            if (this.currentIndex < this.actualCount) {
                this.currentIndex += this.data.length - this.actualCount * 2;
            }
        });
    }
    moveRight(num: number) {
        this.setStyle(num, this.width);
        common.runAnimation(this.$refs.ul as HTMLElement, this.timeout, "move-right", num, () => {
            this.currentIndex += num;
            if (this.currentIndex >= this.data.length - this.actualCount) {
                this.currentIndex -= this.data.length - this.actualCount * 2;
            }
        });
    }
    pause() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    start() {
        this.timer = setInterval(() => {
            this.moveRight(1);
        }, this.interval);
    }
    mouseenterLeft() {
        this.hoveringLeft = true;
        this.pause();
    }
    mouseleaveLeft() {
        this.hoveringLeft = false;
        this.start();
    }
    mouseenterRight() {
        this.hoveringRight = true;
        this.pause();
    }
    mouseleaveRight() {
        this.hoveringRight = false;
        this.start();
    }
}

Vue.component("carousel", Carousel);
