let fetchedPhotos = fetch('https://api.unsplash.com/search/photos?query=all&per_page=100&client_id=XkT3rz4ZJsoEzxi2p29n6Nhwg_aLdR9TKFDfSbxK95Q')

fetchedPhotos.then(res =>
    res.json()).then(d => {
        buildPhotos(d)
    })
let imgLikes;
let user;
let shareCode;
let imageCode;
let createdDate;
let profilePic;
const buildPhotos = (data) => {
    const imgArr = data.results
    console.log(imgArr)
    const imgDiv = document.querySelector('.mas')
    var i = 0;
    imgArr.forEach(img => {
        let imgId = i
        let imgUrl = img.urls.regular
        let imgDes = img.alt_description
        profilePic = img.user.profile_image.small
        imgLikes =img.likes
        user = img.user.instagram_username
        shareCode = img.links.html
        imageCode = img.id
        createdDate = new Date(img.created_at).toLocaleDateString()
        let wrap = document.createElement('div')
        wrap.setAttribute('class', 'wrap')
        let imgTag = document.createElement('img')
        imgTag.setAttribute('src', imgUrl)
        imgTag.setAttribute('id', imgId)
        imgTag.setAttribute('class', 'mas-img')
        imgTag.setAttribute('alt', imgDes)
        imgTag.setAttribute('data-likes', imgLikes)
        imgTag.setAttribute('data-user', user)
        imgTag.setAttribute('data-share', shareCode)
        imgTag.setAttribute('data-code', imageCode)
        imgTag.setAttribute('data-created', createdDate)
        imgTag.setAttribute('data-profile', profilePic)
        var description = document.createElement('p');
        description.textContent = imgDes
        wrap.appendChild(imgTag)
        wrap.appendChild(description)        
        wrap.appendChild(description);        
        imgDiv.appendChild(wrap);
        i++
    })    
}
function resizeGridItem(item){
    grid = document.getElementsByClassName("mas")[0];
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    rowSpan = Math.ceil((item.querySelector('.mas-img').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
}

function resizeAllGridItems(){
    console.log('Resize ')
    allItems = document.getElementsByClassName("wrap");
    for(x=0;x<allItems.length;x++){
        resizeGridItem(allItems[x]);
    }
}

function resizeInstance(instance){
    item = instance.elements[0];
    resizeGridItem(item);
}

allItems = document.getElementsByClassName("wrap");
for(x=0;x<allItems.length;x++){
    imagesLoaded( allItems[x], resizeInstance);
}

let image = 0;
var description;
window.onload = (event) => {
    setTimeout(function() { 
        resizeAllGridItems();
        $('.mas .wrap img').on("click", function() {            
            $(".popup img.selected-image").attr('src', $(this).attr('src'));
            $(".popup img.selected-image").attr('data-share', $(this).attr('data-share'));
            $(".popup img.selected-image").attr('data-code', $(this).attr('data-code'));
            $(".popup img.selected-image").attr('data-created', $(this).attr('data-created'));
            image = parseInt($(this).attr('id'));
            description = $(this).next('p').text();
            $('.popup p.image-title').text(description);
            $('.popup p.image-user').text('@'+$(this).attr('data-user'));
            $('.popup ul .likes-cont p').text($(this).attr('data-likes'));
            $('.popup ul .code-cont p').text($(this).attr('data-code'));
            $('.popup ul .info-cont p').text("Published on"+$(this).attr('data-created'));
            $('.popup .prof-cont .prof-pic img').attr('src',$(this).attr('data-profile'));
            $('.popup').css("display", "block");
            $('.overlay').css("display", "block");
            let imageCount = $('.mas .wrap img').length;            
            $('.popup .right-arrow-container').on("click", function(){
                console.log("right clicked")
                let nextImage;
                if(image >= imageCount) {
                    image = 0;
                } 
                nextImage = $('.mas .wrap').find(`img#${image}`).attr('src');
                nextDecs = $('.mas .wrap').find(`img#${image} ~ p`).text();  
                nextUser = $('.mas .wrap').find(`img#${image}`).attr('data-user');
                nextLike = $('.mas .wrap').find(`img#${image}`).attr('data-likes');
                nextShare = $('.mas .wrap').find(`img#${image}`).attr('data-share');
                nextCode = $('.mas .wrap').find(`img#${image}`).attr('data-code');
                nextCreated = $('.mas .wrap').find(`img#${image}`).attr('data-created');
                nextProfile = $('.mas .wrap').find(`img#${image}`).attr('data-profile');                
                setTimeout(function() {
                    $(".popup p.image-title").text(nextDecs);
                    $(".popup .likes-cont p").text(nextLike);
                    $(".popup p.image-user").text('@'+nextUser);
                    $(".popup img.selected-image").removeAttr('src').attr('src', nextImage);
                    $(".popup img.selected-image").removeAttr('data-share').attr('data-share', nextShare); 
                    $(".popup ul .code-cont p").text(nextCode);
                    $(".popup ul .info-cont p").text("Published on "+nextCreated);
                    $(".popup .prof-cont .prof-pic img").removeAttr('src').attr('src', nextProfile);
                    image++;
                }, 200);
            });
            $('.popup .left-arrow-container').on("click", function(){
                let prevImage;
                if(image <= 0) {
                    image = imageCount - 1;
                }
                    prevImage = $('.mas .wrap').find(`img#${image}`).attr('src'); 
                    prevDecs = $('.mas .wrap').find(`img#${image} ~ p`).text();  
                    prevUser = $('.mas .wrap').find(`img#${image}`).attr('data-user');
                    prevLike = $('.mas .wrap').find(`img#${image}`).attr('data-likes');
                    prevShare = $('.mas .wrap').find(`img#${image}`).attr('data-share');
                    prevCode = $('.mas .wrap').find(`img#${image}`).attr('data-code');
                    prevCreated = $('.mas .wrap').find(`img#${image}`).attr('data-created');
                    prevProfile = $('.mas .wrap').find(`img#${image}`).attr('data-profile');  
                setTimeout(function() {
                    $(".popup p.image-title").text(prevDecs);
                    $(".popup .likes-cont p").text(prevLike);
                    $(".popup p.image-user").text('@'+prevUser);
                    $(".popup img.selected-image").removeAttr('src').attr('src', prevImage);
                    $(".popup img.selected-image").removeAttr('data-share').attr('data-share', prevShare);
                    $(".popup ul .code-cont p").text(prevCode);
                    $(".popup ul .info-cont p").text("Published on "+prevCreated);
                    $(".popup .prof-cont .prof-pic img").removeAttr('src').attr('src', prevProfile);
                    image--;               
                }, 200);
            }); 
            $('.popup .info-cont').on("click", function(){
                $('.popup .info-cont p').addClass('animate');
                setTimeout(function(){
                    $('.popup .info-cont p').removeClass('animate');    
                }, 3000);
            });
            $('.popup .share-cont').on("click", function(){                                
                var value = $('.popup img.selected-image').attr('data-share');
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val(value).select();
                document.execCommand("copy");
                $temp.remove();
                $('.popup .share-cont span').addClass('animate');
                setTimeout(function(){
                    $('.popup .share-cont span').removeClass('animate');    
                }, 3000);
            });            
            $('.overlay .close-icon').on("click", function(){
                $('.popup').css("display", "none");
                $('.overlay').css("display", "none");
            });           
        });        
    }, 100);      
};
