export type CarouselData = {
    /* tslint:disable:ban-types */
    component: string | Function;
    /* tslint:enable:ban-types */
    data: any;
};

const animationKeyframesIdName = "carousel-animation-keyframes";

export function setStyle(num: number, width: number, count: number) {
    let style = document.getElementById(animationKeyframesIdName) as HTMLStyleElement;
    if (!style) {
        style = document.createElement("style");
        style.type = "text/css";
        style.id = animationKeyframesIdName;
        document.getElementsByTagName("head")[0].appendChild(style);
    }
    style.innerHTML = `@keyframes move-left {
    0% { left: ${-width * count}px; }
    100% { left: ${width * num - width * count}px; }
}
@keyframes move-right {
    0% { left: ${-width * count}; }
    100% { left: ${-width * num - width * count}px; }
}`;
}

export function runAnimation(ul: HTMLElement, timeout: number, keyframes: string, num: number, next: () => void) {
    ul.style.animation = "";
    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
            ul.style.animation = `${timeout / 1000}s linear 0s normal ${keyframes}`;
            setTimeout(() => {
                next();
            }, timeout);
        });
    });
}

export function appendLeftAndRightData(data: CarouselData[], actualCount: number) {
    const leftItems = data.slice(data.length - actualCount);
    const rightItems = data.slice(0, actualCount);
    data.unshift(...leftItems);
    data.push(...rightItems);
}
