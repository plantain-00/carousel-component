import * as React from "react";
import * as ReactDOM from "react-dom";
import * as common from "./common";

export type Props = {
    data: common.CarouselData[];
    timeout: number;
    interval: number;
    count: number;
    width: number;
    height: number;
};

export class Carousel extends React.Component<Props, {}> {
    timer: number;
    currentIndex = 0;
    hoveringLeft = false;
    hoveringRight = false;
    lastWidth: number;
    lastNum: number;
    actualCount = 0;
    container: HTMLElement;

    constructor(props: Props) {
        super(props);
        this.actualCount = this.props.data.length < +this.props.count ? this.props.data.length : +this.props.count;
        this.currentIndex = this.actualCount;
        common.appendLeftAndRightData(this.props.data, this.actualCount);
        this.start();
    }

    componentDidMount() {
        this.container = (ReactDOM.findDOMNode(this).childNodes[0] as HTMLElement).childNodes[0] as HTMLElement;
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
            width: `${this.props.width * this.actualCount}px`,
            height: `${this.props.height}px`,
        };
    }
    get mainStyle() {
        return {
            width: `${this.props.width * this.actualCount}px`,
        };
    }
    get ulStyle() {
        return {
            width: `${this.props.width * this.actualCount * 3}px`,
            left: `-${this.props.width * this.actualCount}px`,
        };
    }
    get liStyle() {
        return {
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
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
        this.setStyle(num, this.props.width);
        common.runAnimation(this.container, this.props.timeout, "move-left", num, () => {
            this.currentIndex -= num;
            if (this.currentIndex < this.actualCount) {
                this.currentIndex += this.props.data.length - this.actualCount * 2;
            }
            this.setState({ currentIndex: this.currentIndex });
        });
    }
    moveRight(num: number) {
        this.setStyle(num, this.props.width);
        common.runAnimation(this.container, this.props.timeout, "move-right", num, () => {
            this.currentIndex += num;
            if (this.currentIndex >= this.props.data.length - this.actualCount) {
                this.currentIndex -= this.props.data.length - this.actualCount * 2;
            }
            this.setState({ currentIndex: this.currentIndex });
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
        }, this.props.interval);
    }
    mouseenterLeft() {
        this.hoveringLeft = true;
        this.setState({ hoveringLeft: this.hoveringLeft });
        this.pause();
    }
    mouseleaveLeft() {
        this.hoveringLeft = false;
        this.setState({ hoveringLeft: this.hoveringLeft });
        this.start();
    }
    mouseenterRight() {
        this.hoveringRight = true;
        this.setState({ hoveringRight: this.hoveringRight });
        this.pause();
    }
    mouseleaveRight() {
        this.hoveringRight = false;
        this.setState({ hoveringRight: this.hoveringRight });
        this.start();
    }

    render() {
        const list = this.props.data.filter((item, i) => i >= this.currentIndex - this.actualCount && i < this.currentIndex + this.actualCount * 2)
            .map(item => {
                const conponent = React.createElement(item.component as React.ComponentClass<{ data: any }>, { data: item.data });
                return (
                    <li style={this.liStyle}>
                        {conponent}
                    </li >
                );
            });
        return (
            <div className="carousel" style={this.containerStyle}>
                <div className="main" style={this.mainStyle}>
                    <ul style={this.ulStyle}
                        onMouseEnter={() => this.pause()}
                        onMouseLeave={() => this.start()}>
                        {list}
                    </ul >
                </div >
                <div className="left"
                    style={this.leftStyle}
                    onClick={() => this.moveLeft(this.actualCount)}
                    onMouseEnter={() => this.mouseenterLeft()}
                    onMouseLeave={() => this.mouseleaveLeft()} >
                </div >
                <div className="right"
                    style={this.rightStyle}
                    onClick={() => this.moveRight(this.actualCount)}
                    onMouseEnter={() => this.mouseenterRight()}
                    onMouseLeave={() => this.mouseleaveRight()} >
                </div >
            </div >
        );
    }
}
