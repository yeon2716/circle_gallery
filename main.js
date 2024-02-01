gsap.registerPlugin(ScrollTrigger,Draggable);

//


const images = document.querySelectorAll(".item");
const imageSize = images.length;
const degree = 360 / imageSize;

const cursor = document.querySelector('#custom-cursor');
const main = document.querySelector('.main');

const init = ()=>{
    const timeline = gsap.timeline();
    images.forEach((image,index)=>{
        const sign = Math.floor((index / 2) % 2) ? 1 : -1;
        // (0 / 2) % 2   ==>0(false)
        // (1 / 2) % 2   ==>0.5(true)
        // (2 / 2) % 2   ==>1(true)
        // (3 / 2) % 2   ==>1.5(true)
        // 음수도 true
        const value = Math.floor((index + 4) / 4) * 4;
        //((0 + 4) / 4) * 4 ==>4
        //((1 + 4) / 4) * 4 ==>5
        //((2 + 4) / 4) * 4 ==>6
        const rotation = index > imageSize - 3 ? 0 : sign * value;

        gsap.set(image,{
            rotation: rotation,
            scale: 0.5,
        })

        timeline.to(image,{autoAlpha:1},0)
        timeline.from(image,{
            x: ()=>(index % 2 ? window.innerWidth + image.clientWidth * 4 
            : -window.innerWidth - image.clientWidth * 4),
            y: () => window.innerHeight - image.clientHeight * 4, 
            //index가 0이면 false값을 가진다.
            //index 홀수 --> false,
            //index 짝수 --> true
            rotation: index % 2 ? 200 : -200,
            scale: 4,
            duration: 1,
            delay: 0.15 * (index / 2),
            opacity: 1,
        },0
        );

        let rotationAngle = index * degree;
        timeline.to(image,{
            scale: 1,
            duration: 0,
            autoAlpha:1

        },0.17 * (imageSize / 2 - 1) + 1)

        timeline.to(image,{
            transformOrigin: "center 200vh",
            rotation: index > imageSize / 2 ? -degree * (imageSize - index)
            : rotationAngle,
            duration: 1,
            ease: "power1.out",
        },0.15 * (imageSize / 2 - 1) + 1)
    })
};

Draggable.create(".items", {
    type: "rotation",
});

ScrollTrigger.create({
    trigger: ".main",
    start: "top 30%",
    onEnter: ()=>{
        init();
        cusorM();
        ScrollTrigger.getById("mainTrigger").kill(); //scrolltriiger 제거
    },
    id: "mainTrigger", //scrolltrigger에 id 부여
    once:true //애니메이션을 한번만 작동하도록 만든다
})

//커서
function cusorM(){
    function updateCursorPosition(cursor, event){
        const top = event.pageY - main.offsetTop - cursor.offsetHeight /2;
        const left = event.pageX - cursor.offsetWidth/2;
        gsap.to(cursor,{top:top, left:left ,duration:0.3,ease: "power1.out",})
    }
    main.addEventListener('mousemove',function(e){
        updateCursorPosition(cursor,e)
    })
    main.addEventListener('mouseleave',function(e){
        gsap.to(cursor,{opacity:0,duration:0.3,ease: "power1.out",})
    })
}
