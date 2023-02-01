

// local storage
let likes=[];
let cards=[];

let totalLikes=JSON.parse(localStorage.getItem('likes'));
let totalCards=JSON.parse(localStorage.getItem('cards'));


if (totalLikes) {
    likes=totalLikes;
    // console.log(document.querySelector('#totalLikes'));
    document.querySelector('#totalLikes').innerHTML=likes.length;
    $('#totalLikes').css('display','block');

    // let prand=$('.like').siblings('.mainlaptop--content').find(".mainlaptop--content--brand");
    let laptop=document.querySelectorAll('.mainLaptop');
    // console.log(prand);
   
    likes.forEach(like => {
        laptop.forEach(element => {
            
        if (like==element.querySelector('.mainlaptop--content--brand').innerHTML) {
        element.querySelector('.like').classList.add('redlike');
       
        }
       });
        
       
    });
    
}



if (totalCards) {
    cards=totalCards;
    document.querySelector('#totalCards').innerHTML=cards.length;
    $('#totalCards').css('display','block');
    
    let laptop=document.querySelectorAll('.mainLaptop');
    cards.forEach(card => {
        laptop.forEach(element => {
            
        if (card==element.querySelector('.mainlaptop--content--brand').innerHTML) {
        element.querySelector('.cardIcon').classList.add('redlike');
        
        }
       });
        
       
    });

}
// display function for third section after select specialization

function display(laptopImageArr,laptopBrandArr,laptopPriceArr){

    let laptopImage = document.querySelectorAll('.laptopImg');
    let laptopBrand = document.querySelectorAll('.mainlaptop--content--brand');
    let laptopPrice = document.querySelectorAll('.mainlaptop--content--price');
    

  
    for (let i = 0; i < 3; i++) {
        
        // check if this laptop in local storage
       
   

        laptopImage[i].removeAttribute('src');
        laptopImage[i].setAttribute('src',laptopImageArr[i]);

        laptopBrand[i].innerHTML=laptopBrandArr[i];

        laptopPrice[i].innerHTML=laptopPriceArr[i];

        
    }

}




    // Lazly loading for al images(because most of images with high quality)
images =document.querySelectorAll('img');

    let options = {
        // root: document.querySelector('#scrollArea'),
        rootMargin: '0px',
        threshold: .05
      }
      
      let observer = new IntersectionObserver((entries , imgobserv)=>{
        entries.forEach(element => {
            if (!element.isIntersecting) {
                return;
            }
            else{
                let url=element.target.getAttribute('img-src');
                element.target.src=url ;
            }

        });

      }, options);

    images.forEach(img => {

        observer.observe(img);
        
    });
 
// looder time and animation 
let page =document.querySelector('#mainPage');
let loader =document.querySelector('.looder');
let progressBar =document.querySelector('.progress-bar');

page.onload=function(){
    // console.log('start');
  
    $(window).scrollTop(0);
    // $(window).on('beforeunload', function(){
    //     $(window).scrollTop(0);
    //   });


    $('.progress-bar').animate({width:'100%'},3000);
    // $('body').css('overflow','hidden');

  

    setTimeout(function(){
        
        loader.style.display='none';
        // $('body').css('overflow','auto');
        // console.log('end');
         //animate slider content 
    $('#sliderItem1--content').animate({
        height: '55%',
        opacity:'1',
        top:'0'
    },1500);
    },4500);

    

};





  
 

    // *********ight and dark mode
   
$('#light').click(function () { 
   
    $('#mainPage').css('background-color', '#fff');
    // $('#createDevice').css('background-color', '#fff');
    
});
$('#dark').click(function () { 
   
    $('#mainPage').css('background-color', '#333');
    // $('#createDevice').css('background-color', '#333');
    
});

// add to Local Storage
function addToLocalStoragr(arr,item,storageName,totalshow){
    if (!arr.includes(item)) {
        arr.push(item);
        localStorage.setItem(`${storageName}`,JSON.stringify(arr));
        $(`#${totalshow}`).css('display','block');
        document.querySelector(`#${totalshow}`).innerHTML=arr.length;
    }
}


// remove from Local STorage

function removeFromLocalStorage(arr,item,storageName,totalshow){
    if (arr.includes(item)) {
        arr.splice(arr.indexOf(item),1);
        localStorage.setItem(`${storageName}`,JSON.stringify(arr));
        $(`#${totalshow}`).css('display','block');
        document.querySelector(`#${totalshow}`).innerHTML=arr.length;
    }
}

// like button

$('.like').click(function () { 
    $(this).toggleClass('redlike');

   let prand= $(this).siblings('.mainlaptop--content').find(".mainlaptop--content--brand").text();
   if ($(this).hasClass('redlike')) {
    addToLocalStoragr(likes,prand,'likes','totalLikes');

}
   else{
    removeFromLocalStorage(likes,prand,'likes','totalLikes');
   }
});

// card btn
$('.cardIcon').click(function () { 
    $(this).toggleClass('redlike');
    let prand=$(this).parents('.mainlaptop--content').find(".mainlaptop--content--brand").text();
    if ($(this).hasClass('redlike')) {

        addToLocalStoragr(cards,prand,'cards','totalCards');
    }
       else{
        removeFromLocalStorage(cards,prand,'cards','totalCards');
       }
    
});

// intialize tooltip bootstrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
//******************************************************************************************* */


// specializaion menue select and filter ******************
let specializations =['gaming','programing','writing','marketing'];
let specializationArea =document.querySelector('#list-tab');
let specialization=document.querySelector('#specialization');

let selectspec ;





specialization.addEventListener("keyup",function(){
let specfilter=specialization.value;
let specarr=specializations ;
specializationArea.innerHTML='';

specarr.forEach(element => {
    if (element.includes(specfilter)) {
        
        specializationArea.innerHTML+=`<a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" role="tab" aria-controls="list-profile">${element}</a>
        `
        selectspec = specializationArea.querySelectorAll('a');
    }
      
    
  
    });

    if (specialization.value.trim()=='') {
        specializationArea.innerHTML='';
        selectspec = specializationArea.querySelectorAll('a');
    }
    
    if (selectspec) {
        selectspec= specializationArea.querySelectorAll('a');
        // console.log(selectspec);
        selectspec.forEach(selement=>{
            selement.addEventListener('click',function(){
                let newspec =selement.innerText;
                specialization.value=newspec;
              
               

                let laptopImageArr = [];
                let laptopBrandArr = [];
                let laptopPriceArr = [];

                let show = new XMLHttpRequest();
                show.open('GET','content/js/laptops.json');
                show.onload=function(){
                    let data =JSON.parse(this.responseText);
                  
                   data.forEach(element => {
                    
                    // console.log(data);
                   
                    if (newspec=='gaming'||newspec=='programing') {
                            if (element.level=='high') {
                                laptopImageArr.push(element.img);
                                laptopBrandArr.push(element.brand);
                                laptopPriceArr.push(element.price);
                              
                            }
                           
                        
                        }
                        if (newspec=='marketing') {
                            if (element.level=='mid') {
                                laptopImageArr.push(element.img);
                                laptopBrandArr.push(element.brand);
                                laptopPriceArr.push(element.price);
                            }
                            
                        }
                        if (newspec=='writing') {
                            if (element.level=='low') {
                                laptopImageArr.push(element.img);
                                laptopBrandArr.push(element.brand);
                                laptopPriceArr.push(element.price);

                                
                                // let objectarr =Object.keys(element);
                                // let valuearr =Object.values(element);
                                // console.log(objectarr);
                                // console.log(valuearr);
                            }
                            
                        }
                        
                   });
                //    console.log(laptopImageArr);
                
                display(laptopImageArr,laptopBrandArr,laptopPriceArr);
                let laptops=document.querySelectorAll('.mainLaptop');
                let prandArr =[];
                prandArr=laptopBrandArr;
                let totalLikesArr=JSON.parse(localStorage.getItem('likes'));
                let totalCardArr=JSON.parse(localStorage.getItem('cards'));
                let cardArr=totalCardArr;
                let likearr =totalLikesArr ;
               console.log('prands',prandArr);
               console.log('likes',likearr);
                   
                   prandArr.forEach((prand,i) => {
                    if (likearr.includes(prand)) {
                        laptops[i].querySelector('.like').classList.add('redlike');                        
                    }else{
                        laptops[i].querySelector('.like').classList.remove('redlike');
                    }
                    if (cardArr.includes(prand)) {
                        laptops[i].querySelector('.cardIcon').classList.add('redlike');
                    }else{
                        laptops[i].querySelector('.cardIcon').classList.remove('redlike');
                    }

                   });
                };
                
                show.send();
                
               
               
                
               
                // console.log($('.laptopImg'));

                specializationArea.innerHTML='';
                //  laptopImageArr = [];
                //  laptopBrandArr = [];
                //  laptopPriceArr = [];
                })
             }) 
            
    }
});







// when scroll side nav visible
document.addEventListener('scroll',function(){
$('.likeAndCard').css('transform',' translateX(0%)');
});





// copr right year

let copyRight=document.querySelector('.copyRight');
let year = new Date().getFullYear();
copyRight.innerHTML=`${year}`;





// form validation

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

//   validation on phone input 


let phone=document.querySelectorAll('.phoneRgx');
let submit =document.querySelector('#sendRequestBtn');
let validateMobile=document.querySelectorAll('.invalidPhone');


submit.onclick=function(){
    phone.forEach((element ,i )=> {

        checkMobile(element.value);




        if (!checkMobile(element.value)) {
            validateMobile[i].style.display='block';
            validateMobile[i].innerHTML='please enter valid number';
           
            let validateMobileBG=document.querySelectorAll('.form-control:valid');
            validateMobileBG[i].classList.add('noBg');
           
            
            // console.log('ssad');
        }else{
            validateMobile[i].style.display='none';
            // validateMobile[i].innerHTML='please enter valid number';
           
            let validateMobileBG=document.querySelectorAll('.form-control:valid');
            validateMobileBG[i].classList.remove('noBg');
            // validateMobileBG[i].style.background=`url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e)`;
        }
    });
    
}





function checkMobile(mobile) {
    let regex =/^01(0|1|2|5)\d{8}(?!.)/ig;
    
    return regex.test(mobile);
   
  

}


// document.querySelector('.createBtn').addEventListener('click',function(){
//     document.querySelector('body').removeAttribute('class');
//     document.querySelector('body').removeAttribute('style');
// });



// create page 

// createBtn1
// let createBtn1=document.querySelector('#createBtn1');


// createBtn1.addEventListener('click',function(){
//     let create=document.querySelector('#createDevice');

//     create.onload=function(){
    
//     $('#createHeader').fadeIn('1500');
  
//     };
    
// });

