let totalLikes=JSON.parse(localStorage.getItem('likes'));
let totalCards=JSON.parse(localStorage.getItem('cards'));

    let cardsArr=totalCards;
    let likesArr=totalLikes;
    
    console.log(likesArr);
let component =document.querySelectorAll('.case--content');
    if (likesArr) {
        document.querySelector('#totalLikes').innerHTML=likesArr.length;
        $('#totalLikes').css('display','block');
        component.forEach(element => {
            let elemntType=element.querySelector('.case--content--data--type').textContent;
            likesArr.forEach(likeOpject => {
                if (likeOpject.type==elemntType) {
                    console.log(elemntType);
                    element.querySelector('.like').classList.add('redlike');
                }
          });
           

            
        });
    }

  
    if (totalCards) {
        
        document.querySelector('#totalCards').innerHTML=cardsArr.length;
        $('#totalCards').css('display','block');
        
    
    }
    // when scroll side nav visible and top Button
document.addEventListener('scroll',function(){
    $('.likeAndCard').css('transform',' translateX(0%)');
   checkWindow();
    });
let totopBtn=document.querySelector('#toTopbtn');
totopBtn.addEventListener('click',function(){
    $(window).scrollTop(0);
   checkWindow();


});

function checkWindow(){
    if ($(window).scrollTop()==0) {
      
        totopBtn.classList.remove('opacity-100');
    }else{
        totopBtn.classList.add('opacity-100')
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


let create=document.querySelector('body');

create.onload=function(){
$('#createHeader').fadeIn();

};





let collection =document.querySelector('.myCollection');
let xMarkArr=[];
let collectionArr=[];
let carouselComponent= document.querySelectorAll('.carouselcomponent');
let total =document.querySelector('.total');
// console.log(carouselComponent);



carouselComponent.forEach(carousel => {
    let AddBtn =carousel.querySelectorAll('.createBtn');
 
    let nextNote =carousel.nextElementSibling;//Note section visible after any add
    AddBtn.forEach(addBtn => {
    
        addBtn.addEventListener('click',function(){

            addAndDisable(addBtn);
            
            $(nextNote).show(1000);
           addBtn.classList.toggle('added');
           
        });

      
    
    });

});

// $('.like').click(function () { 

//     $(this).toggleClass('redlike');
// });

// like action

let likes=document.querySelectorAll('.like');
likes.forEach(likeBtn => {
    likeBtn.addEventListener('click',function(){
        likeBtn.classList.toggle('redlike');
        // document.querySelector('#audio').play();
          let type=likeBtn.parentElement.querySelector('.case--content--data--type').textContent;
            let price=likeBtn.parentElement.querySelector('.cases--content--data--price').textContent;
            let image=likeBtn.parentElement.querySelector('img').getAttribute('img-src');
            let likeComponent={
                'type':type,
                'price':price,
                'img':image
            };

    if (likeBtn.classList.contains('redlike')) {
                // add to local storage


                likesArr.push(likeComponent);
                document.querySelector('#totalLikes').innerHTML=likesArr.length;
                console.log(likesArr);

        localStorage.setItem('likes',JSON.stringify(likesArr));
             
                
        }else{
            likesArr.splice(likesArr.indexOf(likeComponent),1);
            console.log(likesArr);
            document.querySelector('#totalLikes').innerHTML=likesArr.length;
            localStorage.setItem('likes',JSON.stringify(likesArr));
            // remove

        }
    })
});






function addAndDisable(btn){
    // btn.disabled=false;
    let data=btn.nextElementSibling;
           let type=data.querySelector('.case--content--data--type').textContent;
           let price =Number(data.querySelector('.price-num').textContent);
    if ( btn.innerHTML=='add') {
        
        btn.innerHTML='added';
        
           
            addToCollection(type,price);

           
       

       return
        
    }if ( btn.innerHTML=='added') {
        
        btn.innerHTML='add';
        removeFromCollection(type,price);
        return
    }
   
    
}

// Append to My Collection to calculate Total price

function addToCollection(type,price){
// collection
$(collection).append(`
<li class="text-light rounded-3 d-flex justify-content-between my-3 ">
        <span class="p-2 w-50 type">${type}</span>
        <p class="p-2 m-0">
        <span class="py-2">price : $</span>
        <span class="py-2 text-start price">${price}</span>
        </p>
       
        <span class="p-2 close">X</span>    
      </li>
`);
collectionArr.push(type);
xMarkArr.push(price);
console.log(xMarkArr);
total.innerHTML=addArrElement(xMarkArr);
}
// remove from my collection
function removeFromCollection(type,price){

let li=collection.querySelectorAll('li');
// $(li).remove();
li.forEach((element , i)=> {
    if (element.textContent.includes(type)) {
        $(element).remove();
        xMarkArr.splice(xMarkArr.indexOf(price),1);
        collectionArr.splice(collectionArr.indexOf(type),1);
        console.log(xMarkArr);
        total.innerHTML=addArrElement(xMarkArr);
    } 
});
}




    
       // whhen click on close mark:
       collection.addEventListener('click',function(e){
    

        if (collection.children.length > 0) {
            
            let xMark =collection.querySelectorAll('.close');
            
            xMark.forEach(close => {
                if (e.target==close) {
                    close.parentElement.remove();
                    let currenttype=close.parentElement.querySelector('.type').textContent;
                    let currentPrice=close.parentElement.querySelector('.price').textContent;
                    xMarkArr.splice(xMarkArr.indexOf(currentPrice),1);
                    collectionArr.splice(collectionArr.indexOf(currenttype),1);
                    console.log(xMarkArr);
                    
                    total.innerHTML=addArrElement(xMarkArr);
                    // console.log('1',currenttype);
                    // console.log(typeof(currenttype));  String
                    checkDom(currenttype);
                                 
                }
                
            });
        }
        
    
    });

    // function to check in Dom and remove all addded buttons

    function checkDom(type){
        let allTypes=document.querySelectorAll('.case--content--data--type');
        allTypes.forEach(domType => {
        //    console.log(typeof(type.textContent)); String
           if (domType.textContent==type) {
            // console.log(type.textContent);

            addAndDisable(domType.parentElement.previousElementSibling);
            domType.parentElement.previousElementSibling.classList.remove('added')
           }
           
        });
    };



function addArrElement(arr){
    let sum=0 ;
arr.forEach(element => {
sum +=Number(element);
    
});
return sum.toFixed(2);
};


// add to card action

let addToCard =document.querySelector('.addtotal');
addToCard.addEventListener('click',function(){
    total.textContent
   if (Number(total.textContent)>0) {
   console.log(total.textContent);
    // swal("Empty", "you not choose any component yet", "error");
    let endMessage = document.querySelector('#endMessage');
    endMessage.innerHTML='Your Collection Added...Thank You For Using PC MAKER ';
    endMessage.classList.add('text-light');
    endMessage.classList.add('fw-semibold');
    console.log(collectionArr);

    // localStorage.setItem('cards',collectionArr);
    let li =document.querySelectorAll('li');
    li.forEach(element => {
       if (element.textContent.includes('X')) {
       let liType= element.querySelector('.type').textContent;
       checkDom(liType);
        element.remove();

       } 

    });

   }else{
    let endMessage = document.querySelector('#endMessage');
    endMessage.innerHTML='you not choose any components';
    endMessage.classList.remove('text-light');
    endMessage.classList.remove('fw-semibold');
   }

});

