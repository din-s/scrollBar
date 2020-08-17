
class ScrollBar{
    constructor({scrollHeight,pageHeight}){
        this.scrollHeight=scrollHeight
        this.pageHeight=pageHeight
        this.maxContentScrollTop=this.scrollHeight-this.pageHeight
        this.content = document.querySelector('.content')
        this.downArrow = document.querySelector('.scroll-down')
        this.upArrow = document.querySelector('.scroll-up')
        this.scrollThumb = document.querySelector('.scroll-thumb')
        this.scrollTrack = document.querySelector('.scroll-track')
        this.message = document.querySelector('.message')
        this.scrollPos = 0
        this.isMouseDown = false
    }

    calcPercentage(){
        // console.log(Math.round((this.content.scrollTop/ this.scrollHeight) * 100 ))
        return Math.round((this.content.scrollTop/ this.scrollHeight) * 100 )
    }
    handleButtonAction(change){
        this.setContentScrollTop(change)
        this.setThumbPosition()
        this.setMessage()
    }
    setContentScrollTop(change){
    this.content.scrollTop+=change
    this.setThumbPosition()
    this.setMessage()
    }

    setThumbPosition(parameter){
        // console.log(this.scrollThumb.style.top)
        let top;
        if(!parameter){
            const scrollTrackHeight = this.scrollTrack.clientHeight
            top = Math.round(this.calcPercentage() * scrollTrackHeight / 100)
        }else{
            top =parameter
        }
        this.scrollThumb.style.top =`${top}px`
    }

setMessage(){
        const percentage = this.calcPercentage()
        this.message.textContent=`${percentage}% of content`
    }
    setScrollThumbSize(){
        this.scrollThumb.style.height =String(parseInt((this.content.clientHeight/this.content.scrollHeight )* this.content.clientHeight))+'px'
    }

    listenScrollTrack(){

        let y1,y2;
        this.scrollTrack.addEventListener('mousedown',(e)=>{
            e.preventDefault()
            this.isMouseDown=true
            y1 = e.pageY-this.scrollTrack.offsetTop
        })

        this.scrollTrack.addEventListener('mouseleave',()=>{
            this.isMouseDown = false 
        })
        this.scrollTrack.addEventListener('mouseup',()=>{
            this.isMouseDown = false 
        })
       
        this.scrollTrack.addEventListener('mousemove', (e)=>{
                e.preventDefault()
                if(this.isMouseDown){
                    y2 = e.pageY - this.scrollTrack.offsetTop
                    console.log({y2,y1})
                    const delta = y2-y1
                    this.scrollThumb.style.top =`${y2}px`
                    this.setContentScrollTop(delta*3)
                }
            })
    }

    init(){
        
        console.log('height',this.scrollTrack.clientHeight)
        this.downArrow.addEventListener('click',()=>this.handleButtonAction(+200))

        this.upArrow.addEventListener('click',()=>this.handleButtonAction(-200))

        this.setThumbPosition(this.scrollPos)

        this.setScrollThumbSize()

        this.listenScrollTrack()

        this.content.addEventListener('wheel',(e)=>{
            this.setContentScrollTop(e.deltaY)
        })

        this.setMessage()

      
    }

}

const content = document.querySelector('.content')
const initValues ={
    scrollHeight: content.scrollHeight,
    pageHeight: content.clientHeight
}

const scrollBar = new ScrollBar(initValues)
scrollBar.init()

const ratio= (content.scrollHeight / content.clientHeight)