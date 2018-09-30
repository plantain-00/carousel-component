import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as common from 'carousel-component'
export * from 'carousel-component'

/**
 * @public
 */
export type Props<T> = {
  data: common.CarouselData<T>[];
  timeout: number;
  interval: number;
  count: number;
  width: number;
  height: number;
}

/**
 * @public
 */
export class Carousel<T> extends React.Component<Props<T>, {}> {
  private timer?: NodeJS.Timer
  private currentIndex = 0
  private hoveringLeft = false
  private hoveringRight = false
  private lastWidth = 0
  private lastNum = 0
  private actualCount = 0
  private container?: HTMLElement
  private touchStartPageX = 0
  private touchOffset = 0

  constructor(props: Props<T>) {
    super(props)
    this.actualCount = this.props.data.length < +this.props.count ? this.props.data.length : +this.props.count
    this.currentIndex = this.actualCount
    common.appendLeftAndRightData(this.props.data, this.actualCount)
    this.start()
  }

  componentDidMount() {
    this.container = ((ReactDOM.findDOMNode(this as any) as HTMLElement).childNodes[0] as HTMLElement).childNodes[0] as HTMLElement
  }

  render() {
    const list = this.props.data.filter((item, i) => i >= this.currentIndex - this.actualCount && i < this.currentIndex + this.actualCount * 2)
      .map((item, i) => {
        const conponent = React.createElement(item.component as React.ComponentClass<{ data: any }>, { data: item.data })
        return (
          <li style={this.liStyle} key={i}>
            {conponent}
          </li >
        )
      })
    return (
      <div className='carousel' style={this.containerStyle}>
        <div className='main' style={this.mainStyle}>
          <ul style={this.ulStyle}
            onTouchStart={(e) => this.touchstart(e)}
            onTouchMove={e => this.touchmove(e)}
            onTouchEnd={e => this.touchend(e)}
            onMouseEnter={() => this.pause()}
            onMouseLeave={() => this.start()}>
            {list}
          </ul >
        </div >
        <div className='left'
          style={this.leftStyle}
          onClick={() => this.moveLeft(this.actualCount)}
          onMouseEnter={() => this.mouseenterLeft()}
          onMouseLeave={() => this.mouseleaveLeft()} >
        </div >
        <div className='right'
          style={this.rightStyle}
          onClick={() => this.moveRight(this.actualCount)}
          onMouseEnter={() => this.mouseenterRight()}
          onMouseLeave={() => this.mouseleaveRight()} >
        </div >
      </div >
    )
  }

  private get leftStyle() {
    return {
      opacity: this.hoveringLeft ? 100 : 0
    }
  }

  private get rightStyle() {
    return {
      opacity: this.hoveringRight ? 100 : 0
    }
  }

  private get containerStyle() {
    return {
      width: `${this.props.width * this.actualCount}px`,
      height: `${this.props.height}px`
    }
  }
  private get mainStyle() {
    return {
      width: `${this.props.width * this.actualCount}px`
    }
  }
  private get ulStyle() {
    return {
      width: `${this.props.width * this.actualCount * 3}px`,
      left: this.touchOffset ? `${this.touchOffset - this.props.width * this.actualCount}px` : `-${this.props.width * this.actualCount}px`
    }
  }
  private get liStyle() {
    return {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`
    }
  }

  private setStyle(num: number, width: number) {
    if (this.lastNum === num && this.lastWidth === width) {
      return
    }
    this.lastNum = num
    this.lastWidth = width
    common.setStyle(num, width, this.actualCount)
  }
  private moveLeft(num: number) {
    this.setStyle(num, this.props.width)
    common.runAnimation(this.container!, this.props.timeout, 'move-left', num, () => {
      this.moveLeftNow(num)
    })
  }
  private moveRight(num: number) {
    this.setStyle(num, this.props.width)
    common.runAnimation(this.container!, this.props.timeout, 'move-right', num, () => {
      this.moveRightNow(num)
    })
  }
  private pause() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  private start() {
    this.timer = setInterval(() => {
      this.moveRight(1)
    }, this.props.interval)
  }
  private mouseenterLeft() {
    this.hoveringLeft = true
    this.setState({ hoveringLeft: this.hoveringLeft })
    this.pause()
  }
  private mouseleaveLeft() {
    this.hoveringLeft = false
    this.setState({ hoveringLeft: this.hoveringLeft })
    this.start()
  }
  private mouseenterRight() {
    this.hoveringRight = true
    this.setState({ hoveringRight: this.hoveringRight })
    this.pause()
  }
  private mouseleaveRight() {
    this.hoveringRight = false
    this.setState({ hoveringRight: this.hoveringRight })
    this.start()
  }
  private touchstart(e: React.TouchEvent<HTMLUListElement>) {
    this.pause()
    if (e.changedTouches && e.changedTouches.length > 0) {
      this.touchStartPageX = e.changedTouches[0].pageX
      this.setState({ touchStartPageX: this.touchStartPageX })
    }
  }
  private touchmove(e: React.TouchEvent<HTMLUListElement>) {
    if (e.changedTouches && e.changedTouches.length > 0) {
      this.touchOffset = e.changedTouches[0].pageX - this.touchStartPageX
      this.setState({ touchStartPageX: this.touchStartPageX })
    }
  }
  private touchend(e: React.TouchEvent<HTMLUListElement>) {
    this.start()
    if (e.changedTouches && e.changedTouches.length > 0) {
      let offset = e.changedTouches[0].pageX - this.touchStartPageX

      const count = Math.round(offset / this.props.width)
      if (count !== 0) {
        offset -= count * this.props.width
        this.touchOffset = offset
        this.setState({ touchOffset: this.touchOffset })
        if (count > 0) {
          this.moveLeftNow(count)
        } else {
          this.moveRightNow(-count)
        }
      }

      let start: number | null = null
      const step = (timestamp: number) => {
        if (start === null) {
          start = timestamp
        }
        const progress = timestamp - start
        this.touchOffset = offset - offset * progress / this.props.timeout
        this.setState({ touchOffset: this.touchOffset })
        if (progress < this.props.timeout) {
          window.requestAnimationFrame(step)
        } else {
          this.touchOffset = 0
          this.setState({ touchOffset: this.touchOffset })
        }
      }
      window.requestAnimationFrame(step)
    }
  }

  private moveLeftNow(num: number) {
    this.currentIndex -= num
    if (this.currentIndex < this.actualCount) {
      this.currentIndex += this.props.data.length - this.actualCount * 2
    }
    this.setState({ currentIndex: this.currentIndex })
  }
  private moveRightNow(num: number) {
    this.currentIndex += num
    if (this.currentIndex >= this.props.data.length - this.actualCount) {
      this.currentIndex -= this.props.data.length - this.actualCount * 2
    }
    this.setState({ currentIndex: this.currentIndex })
  }
}
