
class ScrollBar{
    constructor({scrollHeight,pageHeight,scrollPos=0}){
        this.scrollHeight=scrollHeight
        this.pageHeight=pageHeight
        this.scrollPos=scrollPos
        this.maxContentScrollTop=this.scrollHeight-this.pageHeight
        this.content = document.querySelector('.content')
        this.downArrow = document.querySelector('.scroll-down')
        this.upArrow = document.querySelector('.scroll-up')
        this.scrollThumb = document.querySelector('.scroll-thumb')
        this.scrollTrack = document.querySelector('.scroll-track')
        this.mouseMove = false
        this.message = document.querySelector('.message')
    }

    setContentScrollTop(change){

    this.content.scrollTop+=change
    this.scrollPos=(this.content.scrollTop /  this.scrollHeight)*this.pageHeight
    this.setThumbPosition(this.scrollPos)
    this.setMessage()
    // console.log('contentScrollTop',this.content.scrollTop,'max scroll pos: ', this.maxContentScrollTop)
    }

    setMessage(){
        const percentage = Math.round((this.content.scrollTop / this.maxContentScrollTop)*100) || 20
        this.message.textContent=`${percentage}% of content`
    }
    setThumbPosition(pos){
        this.scrollThumb.style.marginTop =`${pos}px`
    }

    setScrollThumbSize(){
        this.scrollThumb.style.height =String(parseInt((this.content.clientHeight/this.content.scrollHeight )* this.content.clientHeight))+'px'
    }

    listenScrollTrack(){
        let [x1,y1,x2,y2]=[undefined,undefined,undefined,undefined]
        this.scrollTrack.addEventListener('mousedown',(e)=>{
            this.mouseMove=true
            x1,y1 = e.clientX,e.clientY
            console.log('mouseDown',e.clientX,e.clientY)
        })

        // this.scrollTrack.addEventListener('mouseout',(e)=>{
        //     console.log('bhar ho gya..hehe')
        // })
        this.scrollTrack.addEventListener('mouseup',(e)=>{
            console.log('mouseUp',e.clientX,e.clientY)
            if(this.mouseMove){ 
                x2,y2 = e.clientX,e.clientY
                const dist = y2 - y1
                this.setContentScrollTop(dist*this.pageHeight)
                // console.log('Ha isi par mouse up and down hua')
            }else{
                // console.log('Nahi is parr nhi hua..')
            }
            this.mouseMove=false            
        })


    }

    init(){
        this.downArrow.addEventListener('click',()=>this.setContentScrollTop(+200))

        this.upArrow.addEventListener('click',()=>this.setContentScrollTop(-200))

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
    pageHeight: content.clientHeight,
    scrollPos:content.scrollTop
}

const scrollBar = new ScrollBar(initValues)
scrollBar.init()

const ratio= (content.scrollHeight / content.clientHeight)