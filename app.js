
class ScrollBar{
    constructor({scrollHeight,pageHeight,scrollPos=0}){
        this.scrollHeight=scrollHeight
        this.pageHeight=pageHeight
        this.scrollPos=scrollPos
        this.content = document.querySelector('.content')
        this.downArrow = document.querySelector('.scroll-down')
        this.upArrow = document.querySelector('.scroll-up')
        this.scrollThumb = document.querySelector('.scroll-thumb')
    }

    setContentScrollTop(change){
    this.content.scrollTop+=change
    this.scrollPos=(this.content.scrollTop /  this.scrollHeight)*this.pageHeight
    console.log('scrollPos',this.scrollPos)
    this.setThumbPosition(this.scrollPos)
    }

    setThumbPosition(pos){
        this.scrollThumb.style.marginTop =`${pos}px`
    }
    setScrollThumbSize(){
        this.scrollThumb.style.height =String(parseInt((this.content.clientHeight/this.content.scrollHeight )* this.content.clientHeight))+'px'
    }
    init(){
        this.downArrow.addEventListener('click',()=>this.setContentScrollTop(+200))

        this.upArrow.addEventListener('click',()=>this.setContentScrollTop(-200))

        this.setScrollThumbSize()
    }

}

const content = document.querySelector('.content')
const initValues ={
    scrollHeight: content.scrollHeight,
    pageHeight: content.clientHeight,
    scrollPos:content.scrollTop+10
}

const scrollBar = new ScrollBar(initValues)
scrollBar.init()




// console.log('scrollHeight ',content.scrollHeight)
// console.log('pageHeight ',content.clientHeight)

// const scrollThumb = document.querySelector('.scroll-thumb')
// console.log(scrollThumb.clientHeight)

// scrollThumb.style.height = `${parseInt((content.clientHeight/content.scrollHeight )* content.clientHeight)}px`
// console.log(scrollThumb.clientHeight)

