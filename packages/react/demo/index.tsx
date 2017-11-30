import * as React from "react";
import * as ReactDOM from "react-dom";

import { Carousel, CarouselData } from "../dist/";

const CarouselItem: React.StatelessComponent<{ data: number }> = props => <span>{props.data}</span>;

class Main extends React.Component<{}, {}> {
    private data: CarouselData<number>[] = [
        { data: 1, component: CarouselItem },
        { data: 2, component: CarouselItem },
        { data: 3, component: CarouselItem },
        { data: 4, component: CarouselItem },
        { data: 5, component: CarouselItem },
        { data: 6, component: CarouselItem },
        { data: 7, component: CarouselItem },
        { data: 8, component: CarouselItem },
        { data: 9, component: CarouselItem },
    ];

    render() {
        return (
            <div>
                <a href="https://github.com/plantain-00/carousel-component/tree/master/packages/react/demo" target="_blank">the source code of the demo</a>
                <Carousel data={this.data}
                    timeout={500}
                    interval={3000}
                    count={5}
                    width={200}
                    height={150}>
                </Carousel>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("container"));
