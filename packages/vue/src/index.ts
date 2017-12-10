import Vue from "vue";
import Component from "vue-class-component";
import * as common from "carousel-component";
export * from "carousel-component";
import { indexTemplateHtml } from "./variables";

@Component({
    template: indexTemplateHtml,
    props: ["data", "timeout", "interval", "count", "width", "height"],
})
class Carousel<T> extends Vue {
    data: common.CarouselData<T>[];
    timeout: number;
    interval: number;
    count: number;
    width: number;
    height: number;

    currentIndex = 0;
    actualCount = 0;
    private timer: NodeJS.Timer;
    private hoveringLeft = false;
    private hoveringRight = false;
    private lastWidth: number;
    private lastNum: number;
    private touchStartPageX: number;
    private touchOffset = 0;

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
            left: this.touchOffset ? `${this.touchOffset - this.width * this.actualCount}px` : `-${this.width * this.actualCount}px`,
        };
    }
    get liStyle() {
        return {
            width: `${this.width}px`,
            height: `${this.height}px`,
        };
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
    moveLeft(num: number) {
        this.setStyle(num, this.width);
        common.runAnimation(this.$refs.ul as HTMLElement, this.timeout, "move-left", num, () => {
            this.moveLeftNow(num);
        });
    }
    moveRight(num: number) {
        this.setStyle(num, this.width);
        common.runAnimation(this.$refs.ul as HTMLElement, this.timeout, "move-right", num, () => {
            this.moveRightNow(num);
        });
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
    touchstart(e: TouchEvent) {
        this.pause();
        if (e.changedTouches && e.changedTouches.length > 0) {
            this.touchStartPageX = e.changedTouches[0].pageX;
        }
    }
    touchmove(e: TouchEvent) {
        if (e.changedTouches && e.changedTouches.length > 0) {
            this.touchOffset = e.changedTouches[0].pageX - this.touchStartPageX;
        }
    }
    touchend(e: TouchEvent) {
        this.start();
        if (e.changedTouches && e.changedTouches.length > 0) {
            let offset = e.changedTouches[0].pageX - this.touchStartPageX;

            const count = Math.round(offset / this.width);
            if (count !== 0) {
                offset -= count * this.width;
                this.touchOffset = offset;
                if (count > 0) {
                    this.moveLeftNow(count);
                } else {
                    this.moveRightNow(-count);
                }
            }

            let start: number | null = null;
            const step = (timestamp: number) => {
                if (start === null) {
                    start = timestamp;
                }
                const progress = timestamp - start;
                this.touchOffset = offset - offset * progress / this.timeout;
                if (progress < this.timeout) {
                    window.requestAnimationFrame(step);
                } else {
                    this.touchOffset = 0;
                }
            };
            window.requestAnimationFrame(step);
        }
    }

    private moveLeftNow(num: number) {
        this.currentIndex -= num;
        if (this.currentIndex < this.actualCount) {
            this.currentIndex += this.data.length - this.actualCount * 2;
        }
    }
    private moveRightNow(num: number) {
        this.currentIndex += num;
        if (this.currentIndex >= this.data.length - this.actualCount) {
            this.currentIndex -= this.data.length - this.actualCount * 2;
        }
    }
    private setStyle(num: number, width: number) {
        if (this.lastNum === num && this.lastWidth === width) {
            return;
        }
        this.lastNum = num;
        this.lastWidth = width;
        common.setStyle(num, width, this.actualCount);
    }
}

Vue.component("carousel", Carousel);
