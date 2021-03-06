
class ScrollBar {
    constructor({ scrollHeight, pageHeight }) {
        this.scrollHeight = scrollHeight
        this.pageHeight = pageHeight
        this.maxContentScrollTop = this.scrollHeight - this.pageHeight
        this.content = document.querySelector('.content')
        this.downArrow = document.querySelector('.scroll-down')
        this.upArrow = document.querySelector('.scroll-up')
        this.scrollThumb = document.querySelector('.scroll-thumb')
        this.scrollTrack = document.querySelector('.scroll-track')
        this.message = document.querySelector('.message')
        this.scrollPos = 0
        this.isMouseDown = false
    }

    calcPercentage() {
        // console.log(Math.round((this.content.scrollTop/ this.scrollHeight) * 100 ))
        return Math.round((this.content.scrollTop / this.scrollHeight) * 100)
    }
    handleButtonAction(change) {
        this.setContentScrollTop(change)
    }
    setContentScrollTop(change) {
        this.content.scrollTop += change
        this.setThumbPosition()
        this.setMessage()
    }

    setThumbPosition(parameter) {
        // console.log(this.scrollThumb.style.top)
        let top;
        if (!parameter) {
            const scrollTrackHeight = this.scrollTrack.clientHeight
            top = Math.round(this.calcPercentage() * scrollTrackHeight / 100)
        } else {
            top = parameter
        }
        this.scrollThumb.style.top = `${top}px`
    }

    setMessage() {
        const percentage = this.calcPercentage()
        this.message.textContent = `${percentage}% of content`
    }
    setScrollThumbSize() {
        this.scrollThumb.style.height = String(parseInt((this.content.clientHeight / this.content.scrollHeight) * this.content.clientHeight)) + 'px'
    }

    listenScrollTrack() {

        let y1, y2; 
        const handleMouseDown = (e) => {
            e.preventDefault()
            this.isMouseDown = true
            y1 = e.pageY - this.scrollTrack.offsetTop
            console.log('down')
        }

        const handleMouseMove = (e) => {
            console.log('move')
            e.preventDefault()
            if (this.isMouseDown) {
                y2 = e.pageY - this.scrollTrack.offsetTop
                console.log({ y2, y1 })
                const delta = y2 - y1
                this.scrollThumb.style.top = `${y2}px`
                this.setContentScrollTop(delta)
            }
        }
        //for mouse Events
        this.scrollTrack.addEventListener('mousedown',handleMouseDown)

        this.scrollTrack.addEventListener('mouseleave' , () => {
            // console.log('leave')
            this.isMouseDown = false
        })
        
        this.scrollTrack.addEventListener('mouseup', () => {
            // console.log('up')
            this.isMouseDown = false
        })

        this.scrollTrack.addEventListener('mousemove' , handleMouseMove)

        //for pointer Events
        this.scrollTrack.addEventListener('pointerdown', handleMouseDown)

        this.scrollTrack.addEventListener( 'pointerleave', () => {
            this.isMouseDown = false
        })
        this.scrollTrack.addEventListener('pointerup', () => {
            this.isMouseDown = false
        })

        this.scrollTrack.addEventListener( 'pointermove', handleMouseMove)
    }

    init() {

        this.downArrow.addEventListener('click', () => this.handleButtonAction(+(0.8*this.content.clientHeight)))

        this.upArrow.addEventListener('click', () => this.handleButtonAction(-(0.8*this.content.clientHeight)))

        this.setThumbPosition(this.scrollPos)

        this.setScrollThumbSize()

        this.listenScrollTrack()

        this.content.addEventListener('wheel', (e) => {
            this.setContentScrollTop(e.deltaY)
        })

        this.setMessage()


    }

}

const content = document.querySelector('.content')
const initValues = {
    scrollHeight: content.scrollHeight,
    pageHeight: content.clientHeight
}

const scrollBar = new ScrollBar(initValues)
scrollBar.init()

const ratio = (content.scrollHeight / content.clientHeight)