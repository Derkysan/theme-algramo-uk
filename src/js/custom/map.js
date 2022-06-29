(function ($) {
  
  var console = window.console;
  
  if (document.querySelector('#switchView')) {
    
    const switchView = document.querySelector('#switchView');
    const labelPOS = document.querySelector("#labelPOS");
    const labelDLVR = document.querySelector("#labelDLVR");
  
    const selectShop = document.querySelector("#selectShop");
    const selectBrand = document.querySelector("#selectBrand");
    const clearFilters = document.querySelector("#clearFilters");
  
    
    const posResult = document.querySelector("#resPOS");
    const dlvrResult = document.querySelector("#resDLVR");
    
    let pointOfSaleActive = !switchView.checked;
  
  
  
    // Label's Action
    labelPOS.onclick = () => {
      selectShop.classList.remove('inactive');
      selectBrand.classList.remove('inactive');
      clearFilters.classList.remove('inactive');
      
      posResult.classList.remove('inactive');
      dlvrResult.classList.add('inactive');
  
      if (pointOfSaleActive) {
        return
      } else {
        pointOfSaleActive = !pointOfSaleActive;
        switchView.checked = !pointOfSaleActive;
  
  
        labelPOS.classList.add('text-primary');
        labelDLVR.classList.remove('text-primary');
  
      }
    }
    labelDLVR.onclick = () => {
      selectShop.classList.add('inactive');
      selectBrand.classList.add('inactive');
      clearFilters.classList.add('inactive');
  
      posResult.classList.add('inactive');
      dlvrResult.classList.remove('inactive');
  
      if (!pointOfSaleActive) {
        return
      } else {
        pointOfSaleActive = !pointOfSaleActive;
        switchView.checked = !pointOfSaleActive;
  
  
        labelDLVR.classList.add('text-primary');
        labelPOS.classList.remove('text-primary');
      }
    }
  
    // Switch's Action
    switchView.onclick = () => {
      pointOfSaleActive = !pointOfSaleActive;
      posResult.classList.remove('inactive');
      dlvrResult.classList.add('inactive');
      
      
      if (pointOfSaleActive) {
        labelPOS.classList.add('text-primary');
        labelDLVR.classList.remove('text-primary');
  
        selectShop.classList.add('inactive');
        selectBrand.classList.add('inactive');
        clearFilters.classList.add('inactive');
        // 
        selectShop.classList.remove('inactive');
        selectBrand.classList.remove('inactive');
        clearFilters.classList.remove('inactive');
        // 
        posResult.classList.remove('inactive');
        dlvrResult.classList.add('inactive');
  
      } else {
        labelPOS.classList.remove('text-primary');
        labelDLVR.classList.add('text-primary');
  
        selectShop.classList.remove('inactive');
        selectBrand.classList.remove('inactive');
        clearFilters.classList.remove('inactive');
        // 
        selectShop.classList.add('inactive');
        selectBrand.classList.add('inactive');
        clearFilters.classList.add('inactive');
        // 
        dlvrResult.classList.remove('inactive');
        posResult.classList.add('inactive');
        
      }
    }
  
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxncmFtbyIsImEiOiJjbDNrN3dnMHUwN3lrM2NxYXd1N3BzcnRzIn0.mDAq3_Hkv0OuUo6S6edoNA';
    var map = new mapboxgl.Map({
      container: 'mapboxgl',
      style: 'mapbox://styles/algramo/cl4f5mzdy000d14miprq08p54',
      center: [-70.604,-33.417],
      zoom: 12
    });

  } else return
  
})(jQuery);
