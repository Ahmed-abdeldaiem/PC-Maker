






// div that we will add in it 
let collection=document.querySelector('.AutoLikeAdded');

// likes stored at Local Storage
let totalLikes=JSON.parse(localStorage.getItem('likes'));
let totalCards=JSON.parse(localStorage.getItem('cards'));
$('#totalCards').css('display','block');
$('#totalLikes').css('display','block');

  
    let likesArr=totalLikes;
    let cardsArr=totalCards;

    document.querySelector('#totalLikes').innerHTML=likesArr.length;
    document.querySelector('#totalCards').innerHTML=cardsArr.length; 


    // get laptop data from json file
    let show = new XMLHttpRequest();
    show.open('GET','content/js/laptops.json');
    show.onload=function(){
        let jsonData =JSON.parse(this.responseText);
        console.log(jsonData);
        console.log(likesArr);

        likesArr.forEach((likeElement,i) => {
            jsonData.forEach(jsonElement => {
            if (likeElement==jsonElement.brand) {
                let brand=jsonElement.brand;
                let price=jsonElement.price;
                let image=jsonElement.img2;
                
                $(collection).append(`
                <div class="col-lg-4 col-md-6 col-12 father">
                <div class="card1 text-center  overflow-hidden rounded-2 position-relative p-0">
                <img src="${image}" alt="">
                <span class="like text-center"><i class="fa-solid fa-heart"></i></span>
                <p class="rounded-2 bg3">${brand}</p>
                <p class="priceShow rounded-2 bg3">${price}</p>
                </div>
                </div>
                
                
                `);
                console.log(i);
                
            }
            showdata();
            
            // likesArr.splice(i,1);

           });

           if (likeElement.type) {
            $(collection).append(`
            <div class="col-lg-4 col-md-6 col-12 father">
            <div class="card1 text-center  overflow-hidden rounded-2 position-relative p-0">
            <img src="${likeElement.img}" alt="">
            <span class="like text-center"><i class="fa-solid fa-heart"></i></span>
            <p class="rounded-2 bg3">${likeElement.type}</p>
            <p class="priceShow rounded-2 bg3">${likeElement.price}</p>
            </div>
            </div>
            
            
            `);
            showdata();
           }
         
           

        
            
        });


        let likes=collection.querySelectorAll('.like');
        console.log(likes);
        likes.forEach(likeBtn => {
            likeBtn.addEventListener('click',function(){
            //    remove from dom
                likeBtn.parentElement.parentElement.remove();
                // remove from local storage
                let domType=likeBtn.nextElementSibling.textContent
                likesArr.forEach(element => {
                    if (element==domType||element.type==domType) {
                        // console.log(element);
                       
                        likesArr.splice(likesArr.indexOf(element),1);
                        localStorage.setItem('likes',JSON.stringify(likesArr));
                        document.querySelector('#totalLikes').innerHTML=likesArr.length;
                    }
                });
                

            });
        });
    }
    show.send();



function showdata(){
    $('.likeAndCard').css('transform',' translateX(50%)');
    $('.like').css('transform',' translatey(0%)');
    $('.like').addClass('redlike');
    
};






    // Lazly loading for al images(because most of images with high quality)
    // images =document.querySelectorAll('img');

    // let options = {
    //     // root: document.querySelector('#scrollArea'),
    //     rootMargin: '0px',
    //     threshold: .05
    //   }
      
    //   let observer = new IntersectionObserver((entries , imgobserv)=>{
    //     entries.forEach(element => {
    //         if (!element.isIntersecting) {
    //             return;
    //         }
    //         else{
    //             let url=element.target.getAttribute('img-src');
    //             element.target.src=url ;
    //         }

    //     });

    //   }, options);

    // images.forEach(img => {

    //     observer.observe(img);
        
    // });



    // like action

