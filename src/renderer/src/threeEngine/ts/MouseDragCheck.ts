//废弃

type props = {
  dom: HTMLElement
  downCb: (e: any) => void
  upCb: (e: any) => void
  moveCb: (e: any) => void
}

export class MouseDragCheck {
  dom: HTMLElement
  downCb: (e: any) => void
  upCb: (e: any) => void
  moveCb: (e: any) => void
  startClickDown: number
  dragInterval: number
  constructor(props: props) {
    this.dom = props.dom
    this.downCb = props.downCb // 几个事件触发时的回调函数
    this.upCb = props.upCb
    this.moveCb = props.moveCb

    this.startClickDown = -1 // 鼠标按下的时间戳
    this.dragInterval = 100 // 鼠标拖动的毫秒间隔，大于 100ms 认为它在拖动
  }

  addEventListeners = () => {
    const dom = this.dom

    dom.addEventListener('pointerdown', this.mouseDown, false)
    dom.addEventListener('pointermove', this.mouseMove, false)
    dom.addEventListener('pointerup', this.mouseUp, false)
  }

  removeEventListeners = () => {
    const dom = this.dom

    dom.removeEventListener('pointerdown', this.mouseDown, false)
    dom.removeEventListener('pointermove', this.mouseMove, false)
    dom.removeEventListener('pointerup', this.mouseUp, false)
  }

  mouseDown = (e: any) => {
    this.startClickDown = new Date().getTime()
    if (this.downCb) {
      this.downCb(e)
    }
  }

  mouseMove = (e: any) => {
    const cur = new Date().getTime()
    if (
      this.startClickDown !== -1 &&
      cur - this.startClickDown > this.dragInterval
    ) {
      if (this.moveCb) {
        this.moveCb(e)
      }
    }
  }

  mouseUp = (e: any) => {
    this.startClickDown = -1
    if (this.upCb) {
      this.upCb(e)
    }
  }
}
