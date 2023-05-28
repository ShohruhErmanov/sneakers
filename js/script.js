let cardBigImg = document.querySelector('.card_big-img')
let cardImg = [...document.querySelectorAll('.card-img')]
let mainLink = document.querySelectorAll('.main_box-link')
let mainSpan = document.querySelector('.main_box-span')
let mainPriceSpan = document.querySelector('.main_price-span')

let x = mainPriceSpan.textContent


 
mainLink[0].addEventListener('click', function(){
    if (mainSpan.textContent == 0) {
        
    }else{
        mainSpan.textContent--;
    }
  
})
mainLink[1].addEventListener('click', function(){
    mainSpan.textContent++;
    mainPriceSpan.innerHTML = x
})




// function imgget() {
//     let img = cardBigImg.getAttribute('src')
//     for (let i = 0; i < cardImg.length; i++) {
//         let cardimg = cardImg[i].setAttribute('src')
//    }
//    let imgremove = cardBigImg.removeAttribute(img)
// }
// imgget()

// for (let i = 0; i < cardImg.length; i++) {
//     cardImg[i].addEventListener('click', function(){
//         cardBigImg.removeAttribute('src')
//         cardBigImg.setAttribute('src', cardimg)
     
//     })
    
// }

