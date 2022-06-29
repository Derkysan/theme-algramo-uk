(function ($) {


  $('#selectShop').on('click', ()=> {
    $('.dropbtn-shop').toggleClass("opened");
  });
  $('#selectBrand').on('click', ()=> {
    $('.dropbtn-brand').toggleClass("opened");
  });

  $(document).on("click", function(event){
    var $triggerShop = $("#selectShop");
    var $triggerBrand = $("#selectBrand");
    if($triggerShop !== event.target && !$triggerShop.has(event.target).length){
      $('.dropbtn-shop').removeClass("opened");
    }   
    if($triggerBrand !== event.target && !$triggerBrand.has(event.target).length){
      $('.dropbtn-brand').removeClass("opened");
    }   
  });

  $(window).scroll(function() {    
    $('.dropbtn-shop').removeClass("opened");
    $('.dropbtn-brand').removeClass("opened");
  }); 
  
  // var console = window.console;
  // console.log('dropdow-checkbox-multiselect');
  const selectShop = document.querySelector(".dropbtn-shop");
  const selectBrand = document.querySelector(".dropbtn-brand");
  
  // if (selectShop || selectBrand) {

  //   selectShop.addEventListener("click", () => {
  //     if (selectBrand.classList.contains("opened")) {
  //       selectBrand.classList.remove("opened");
  //     }
  //     document.querySelector(".dropbtn-shop").classList.toggle("opened");
  //   })
  //   selectBrand.addEventListener("click", () => {
  //     if (selectShop.classList.contains("opened")) {
  //       selectShop.classList.remove("opened");
  //     }
  //     document.querySelector(".dropbtn-brand").classList.toggle("opened");
  //   })

  //   window.onclick = function(event) {
  //     if (
  //         event.target.matches("#labelPOS") || 
  //         event.target.matches("#labelDLVR")
  //         ) {
  //       var dropdowns = document.getElementsByClassName("dropbtn");
  //       var i;
  //       for (i = 0; i < dropdowns.length; i++) {
  //         var openDropdown = dropdowns[i];
  //         if (openDropdown.classList.contains('opened')) {
  //           openDropdown.classList.remove('opened');
  //         }
  //       }
  //     }
  //   }
    
  // } else return

})(jQuery);