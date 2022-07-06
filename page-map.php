<?php /* Template Name: Template Mapa */ ?>

<?php get_header(); ?>
<style type="text/css">
	.marker {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		cursor: pointer;
	}
	.mapboxgl-popup {
		max-width: 300px;
	}
	.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
		border-top-color: rgba(0,0,0,0.75);
	}
	.mapboxgl-popup-content {
		text-align: center;
		color:#FFF;
		font-size: 12px;
		background-color:rgba(0,0,0,0.75);
		border-radius: 8px;
		border:0;
		padding: 20px;
	}
	.mapboxgl-popup-content h3 {
		color:#FFF;
		font-size: 14px;
		font-weight: bold;
		margin: 0;
		margin-bottom: 15px;
		margin-top: 15px;
	}
	button.mapboxgl-popup-close-button {
    color: #FFF;
    border: 0;
    outline: none;
	}
	.filter-gbox {
		background-color:#dedede;
		color:#000;
		font-size: 11px;
		border-radius: 8px;
		padding: 5px 10px;
		display: inline-block;
		margin-right: 5px;
	}
</style>
<script type="text/javascript">
var gapp = {
	products: [
		{
			"id": "omo",
			"name": "Omo",
			"desc": "Detergente liquido, matic multiacción. Con agentes biodegradables",
			"image": "<?php echo get_theme_file_uri(); ?>/images/products/omo.png",
			"qty": "3 Lt",
			"zones": ["azul","morado"],
			"places": ["lider-santa-amalia","lider-el-rodeo","walmart-departamental","sodimac-la-florida","sodimac-limpio-la-reina"],
			"brand":true
		},
		{
			"id": "quix",
			"name": "Quix",
			"desc": "Lavalozas líquido concentrado. Pureza esencial. Biodegradable",
			"image": "<?php echo get_theme_file_uri(); ?>/images/products/quix.png",
			"qty": "1.5 Lt",
			"zones": ["azul","morado"],
			"places": ["lider-santa-amalia","lider-el-rodeo","walmart-departamental","sodimac-la-florida","sodimac-limpio-la-reina"],
			"brand":true
		},
		{
			"id": "soft",
			"name": "Soft",
			"desc": "Suavizante de ropa líquido. Diluido clásico. Biodegradable",
			"image": "<?php echo get_theme_file_uri(); ?>/images/products/soft.png",
			"qty": "1.5 Lt",
			"zones": ["azul","morado"],
			"places": ["lider-santa-amalia","walmart-departamental","sodimac-la-florida"],
			"brand":true
		},
		{
			"id": "cif",
			"name": "Cif",
			"desc": "Limpiador desengrasante líquido. Antograsa ultra rápido. Biodegradable.",
			"image": "<?php echo get_theme_file_uri(); ?>/images/products/cif.png",
			"qty": "1.5 Lt",
			"zones": ["azul","morado"],
			"places": ["lider-santa-amalia","walmart-departamental","sodimac-la-florida"],
			"brand":true
		},
		{
			"id": "detergente-lider",
			"name": "Detergente Lider",
			"desc": "Lavalozas líquido Máximo poder desengrasante. Biodegradable.",
			"image": "<?php echo get_theme_file_uri(); ?>/images/products/lider-detergente.png",
			"qty": "3 Lt",
			"zones": [],
			"places": ["lider-santa-amalia","lider-el-rodeo","lider-pie-andino","acuenta-maipu"],
			"brand":false
		},
		{
			"id": "lavaloza-lider",
			"name": "Lavaloza Lider",
			"desc": "Lavalozas líquido Máximo poder desengrasante. Biodegradable.",
			"image": "<?php echo get_theme_file_uri(); ?>/images/products/lider-lavaloza.png",
			"qty": "1.5 Lt",
			"zones": [],
			"places": ["lider-santa-amalia","lider-el-rodeo","lider-pie-andino","acuenta-maipu"],
			"brand":false
		},
		{
			"id": "suavizante-lider",
			"name": "Suavizante Lider",
			"desc": "Suavizante de ropa clásico. Con agentes biodegradables.",
			"image": "<?php echo get_theme_file_uri(); ?>/images/products/lider-suavizante.png",
			"qty": "1.5 Lt",
			"zones": [],
			"places": ["lider-santa-amalia","lider-el-rodeo","lider-pie-andino","acuenta-maipu"],
			"brand":false
		},
		{
			"id": "limpiapisos-lider",
			"name": "Limpiapisos Lider",
			"desc": "Limpiador multiespacios lavanda. Con agentes biodegradables.",
			"image": "<?php echo get_theme_file_uri(); ?>/images/products/lider-limpiapisos.png",
			"qty": "1.5 Lt",
			"zones": [],
			"places": ["lider-santa-amalia","lider-el-rodeo","lider-pie-andino","acuenta-maipu"],
			"brand":false
		},
		{
			"id": "purina-raza-grande",
			"name": "Purina raza grande",
			"desc": "Alimento de mascotas Seco/sólido para perros medianos y grandes.",
			"image": "<?php echo get_theme_file_uri(); ?>/images/products/purina-raza-grande.png",
			"qty": "3 a 15 kilos",
			"zones": ["azul"],
			"places": [],
			"brand":false
		},
		{
			"id": "purina-raza-chica",
			"name": "Purina raza chica",
			"desc": "Alimento de mascotas Seco/sólido para perros minis y pequeños.",
			"image": "<?php echo get_theme_file_uri(); ?>/images/products/purina-raza-chica.png",
			"qty": "3 a 15 kilos",
			"zones": ["azul"],
			"places": [],
			"brand":false
		}
	],
	places: [
		{
			"id": "lider-santa-amalia",
			"name": "Hiper Lider Santa Amalia",
			"address": "Av, Sta. Amalia 1763, La Florida, Región Metropolitana",
			"time": "09:00 a 19:00 hrs",
			"color": "#007DC3",
			"latlng": [-33.544849,-70.5709128]
		},
		{
			"id": "lider-el-rodeo",
			"name": "Lider Express El Rodeo",
			"address": "El Rodeo 12850, Lo Barnechea, Región Metropolitana",
			"time": "09:00 a 19:00 hrs",
			"color": "#007DC3",
			"latlng": [-33.3523407,-70.5229559]
		},
		{
			"id": "lider-pie-andino",
			"name": "Lider Express Pie Andino",
			"address": "Avenida Pie Andino 5885, Los Trapenses, Lo Barnechea, Región Metropolitana",
			"time": "09:00 a 19:00 hrs",
			"color": "#007DC3",
			"latlng": [-33.3241795,-70.5422958]
		},
		{
			"id": "walmart-departamental",
			"name": "Walmart Departamental",
			"address": "Av. Américo Vespucio 6325, La Florida, Región Metropolitana",
			"time": "09:00 a 19:00 hrs",
			"color": "#007DC3",
			"latlng": [-33.5119906,-70.5939385]
		},
		{
			"id": "acuenta-maipu",
			"name": "Superbodega Acuenta",
			"address": "Av. Sur 411, Maipú",
			"time": "09:00 a 19:00 hrs",
			"color": "#C22026",
			"latlng": [-33.5207115,-70.7669928]
		},
		{
			"id": "sodimac-la-florida",
			"name": "Sodimac La Florida",
			"address": "Av. Macul 6402, La Florida, Región Metropolitana",
			"time": "AM 10:00 a 14:00 hrs y PM 16:00 a 20:00",
			"color": "#0072CE",
			"latlng": [-33.5129174,-70.5313586]
		},
		{
			"id": "sodimac-limpio-la-reina",
			"name": "Punto Limpio Sodimac La Reina",
			"address": "Jorge Alessandri 1347, Santiago, La Reina",
			"time": "AM 10:00 a 14:00 hrs y PM 16:00 a 20:00",
			"color": "#0072CE",
			"latlng": [-33.4626199,-70.5493846]
		},
	],
	stores: [
		{
			"id": "lider",
			"name": "Lider"
		},
		{
			"id": "acuenta",
			"name": "Acuenta"
		},
		{
			"id": "sodimac",
			"name": "Sodimac"
		},
	],

	renderProducts: function(zone) {
		var html = "";
		for (var i = 0; i < this.products.length; i++) {
			if (!zone || this.products[i].zones.indexOf(zone)) {
				html += '<div class="item change-places">'+
	              '      <label class="wrapper-checkbox">'+
	              '        <input id="product-'+this.products[i].id+'" name="products" checked type="checkbox" value="'+this.products[i].id+'">'+
	              '        <span class="checkmark"></span>'+
	              '        <div class="overlay"></div>'+
	              '      </label>'+
	              '      <div class="thumb">'+
	              '        <img src="'+this.products[i].image+'" class="" alt="product">'+
	              '      </div>'+
	              '      <div class="info">'+
	              '        <div class="name">'+this.products[i].name+'</div>'+
	              '        <div class="desc">'+this.products[i].desc+'</div>'+
	              '        <div class="qty">'+this.products[i].qty+'</div>'+
	              '      </div>'+
	              '</div>';
      }
		}

		return html;
	},
	renderPlaces: function(second) {
		// Get mark products
		var okPlaces = [];
		var that = this;
		jQuery.each(jQuery(".wrapper-checkbox").find(":checked"), function(i,v) {
			var id = jQuery(this).attr("id").replace("product-","");
			for (var j = 0; j < that.products.length; j++) {
				if (that.products[j].id == id) {
					for (var k = 0; k < that.products[j].places.length; k++) {
						if (okPlaces.indexOf(that.products[j].places[k]) == -1) {
							okPlaces.push(that.products[j].places[k]);
						}
					}
				}
			}
		}); 

		for (var i = 0; i < this.places.length; i++) {
			if (okPlaces.indexOf(this.places[i].id)>-1) {
				var f = 0;
				for (var j = 0; j < markers.length; j++) {
					if (markers[j].id == this.places[i].id) {
						f = 1;
						break;
					}
				}
				if (f==0) {
					const el = document.createElement('div');
					el.className = 'marker';
					el.style = 'background-color:'+this.places[i].color;
					 
					var oneMarker = new mapboxgl.Marker(el).setLngLat(this.places[i].latlng.reverse()).setPopup(
						new mapboxgl.Popup({ offset: 25 }).setHTML(
							`<h3>${this.places[i].name}</h3><p>${this.places[i].address}</p>`
						)
					).addTo(map);

					markers.push({
						id: this.places[i].id,
						marker: oneMarker
					});
				}
			}
			else {
				//try remove
				for (var j = 0; j < markers.length; j++) {
					if (markers[j].id == this.places[i].id) {
						markers[j].marker.remove();
						markers.splice(j,1);
					}
				}
			}
		}
	},
	renderStoresListing: function() {
		var html = "";
		for (var i = 0; i < this.stores.length; i++) {
      html += '<li>'+
              '<label class="item-checkbox" for="shop-'+this.stores[i].id+'">' + this.stores[i].name + '' + 
              '<input id="shop-'+this.stores[i].id+'" class="filter-store-class" name="shopFilter" type="checkbox" value="shop'+this.stores[i].id+'">'+
              '<span class="checkmark"></span>'+
              '</label>'+
              '</li>';
		}
		return html;
	},
	renderProductsListing: function() {
		var html = "";
		for (var i = 0; i < this.products.length; i++) {
			if (this.products[i].brand) {
          html += '<li>'+
          '<label class="item-checkbox" for="filter-'+this.products[i].id+'">'+ this.products[i].name + '' + 
          '<input id="filter-'+this.products[i].id+'" class="filter-products-class" name="shopBrand" type="checkbox" value="'+this.products[i].id+'">'+
          '<span class="checkmark"></span>'+
          '</label>'+
          '</li>';
			} 
		}
		return html;
	},
	applyFilters: function() {
		if (tags.length > 0) {
			var that = this;
			jQuery(".change-places").find("input").prop("checked", false);
			jQuery(".change-places").hide();
			jQuery.each(jQuery(".change-places"), function(i,v) {
				for (var x = 0; x < tags.length; x++) {
					if (tags[x].indexOf("filter")==0) { // Is product
						var t = tags[x].replace("filter","product");
						var p = jQuery(this).find("input").attr('id');
						if (t == p) {
							jQuery(this).show();
							jQuery(this).find("input").prop("checked",true);
						}
					}
					else { // is shop
						var fo = tags[x].replace("shop-","");
						var p = jQuery(this).find("input").attr('id');

						// buscar el tag del producto
						var f = 0;
						var r = that.products.filter(function(item) { return item.id == p.replace('product-','') });
						if (r.length > 0) {
							for (var k = 0; k < r[0].places.length; k++) {
								console.log(r[0].places[k],' => ', fo, " == ", r[0].places[k].indexOf(fo));
								if (r[0].places[k].indexOf(fo)>=0) {
									f = 1; 
									break;
								}
							}
							if (f==1) {
								jQuery(this).show();
								jQuery(this).find("input").prop("checked",true);
							} 
						}
					}

				}

			});
		}
		else {
			jQuery(".change-places").find("input").prop("checked", true);
			jQuery(".change-places").show();
		}
	},
	makeSwiper: function(color) {
		var html = "";
		html += ''+
    '<div class="swiper-container">'+
    '  <div class="swiper-delivery">'+
    '    <div class="swiper-wrapper" id="swiper-slide-'+color+'"> ';

    for (var i = 0; i < this.products.length; i++) {
    	if (this.products[i].zones.indexOf(color)) {
				html += '<div class="swiper-slide"><img src="'+this.products[i].image+'" class="" alt="product"></div>';
    	}
    }

    html+='</div>'+
    '  </div>'+
    '  <div class="swiper-button swiper-button-prev prev-green"></div>'+
    '  <div class="swiper-button swiper-button-next next-green"></div>'+
    '</div>';
    return html;
	}
}


var map = null;
var markers = [];
var tags = [];

jQuery(document).ready(function() {
	
	jQuery(".result-list").html(gapp.renderProducts());
	jQuery("#results-stores").html(gapp.renderStoresListing());
	jQuery("#results-products").html(gapp.renderProductsListing());
	jQuery("#clearFilters").click(function() {
		tags = [];
		jQuery(".filter-gbox").remove();
		jQuery(this).hide();
		jQuery(".change-places").show();
		jQuery(".filter-store-class,.filter-products-class").prop("checked",false);
		gapp.applyFilters();
	});
	jQuery(".change-places").click(function() {
		gapp.renderPlaces();
	});

	jQuery(".filter-store-class,.filter-products-class").click(function() {
		if (tags.indexOf(jQuery(this).attr('id')) > -1) {
			jQuery("[data-id='box-"+jQuery(this).attr('id')+"']").remove();
			var ii = tags.indexOf(jQuery(this).attr('id'));
			tags.splice(ii,1);
		}
		else {
			jQuery("#tags-area").append('<span class="filter-gbox" data-id="box-'+jQuery(this).attr('id')+'">'+jQuery(this).parent().text()+'</span>');
			tags.push(jQuery(this).attr('id'));
		}

		if (tags.length > 0) {
			jQuery("#clearFilters").show();
			jQuery("#showingAll").hide();	
		}
		else {
			jQuery("#clearFilters").hide();	
			jQuery("#showingAll").show();
			jQuery(".change-places").show();
		}
		gapp.applyFilters();
	});
	
	mapboxgl.accessToken = 'pk.eyJ1IjoiYWxncmFtbyIsImEiOiJjbDNrN3dnMHUwN3lrM2NxYXd1N3BzcnRzIn0.mDAq3_Hkv0OuUo6S6edoNA';

	map = new mapboxgl.Map({
	  container: 'mapboxgl',
	  style: 'mapbox://styles/algramo/cl4f5mzdy000d14miprq08p54',
	  center: [-70.604,-33.417],
	  zoom: 10
	});

	gapp.renderPlaces();
	jQuery("#swiper-azul").html(gapp.makeSwiper('azul'));
	jQuery("#swiper-morado").html(gapp.makeSwiper('morado'));

});

</script>
<div id="mapPage" class="animate__animated animate__fadeIn">

  <section id="mapPage" class="no-header-page">

    <div class="filter-wrapper">
      <div class="container-fluid h-100">
        <div class="row h-100 align-items-center">
          <div class="col h-100">
            <div class="map-filter">

              <div class="filter-item sep pe-3 d-flex align-items-center">
                <button id="labelPOS" type="button" class="btn btn-link text-decoration-none switch-label text-primary">Ver puntos de venta</button>
                <label class="switch mx-2">
                  <input id="switchView" type="checkbox" role="switch">
                  <span class="slider round"></span>
                </label>
                <button id="labelDLVR" type="button" class="btn btn-link text-decoration-none switch-label">Ver comunas de despacho</button>
              </div>
              <div class="filter-item sep px-3">
                <div id="selectShop" class="dropdow-checkbox-multiselect">
                  <div class="dropbtn dropbtn-shop">Selecciona tienda</div>
                  <ul class="options" id="results-stores">
                  </ul>
                </div>
              </div>
              <div class="filter-item sep px-3">
               <div id="selectBrand" class="dropdow-checkbox-multiselect">
                  <div class="dropbtn dropbtn-brand">Selecciona Marca</div>
                  <ul class="options" id="results-products"> 
                  </ul>
                </div>
              </div>
              <div class="filter-item">
                <button style="display:none;" id="clearFilters" type="button" class="btn btn-link text-decoration-none"><i class="fa-solid fa-xmark fa-xl me-2"></i> Borrar filtros</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="map-result">

      <div class="result-items-wrapper py-4">

        <div id="resPOS">
          <div class="container-fluid">
            <div class="row align-items-center mb-4">
              <div class="col">
                <p class="fw-bold mb-0">¿Que productos estas buscando?</p>
              </div>
              <div class="col">
                <small class="d-block text-end text-muted" id="tags-area">
                	<span id="showingAll">Mostrando todos los productos</span>
                </small>
              </div>
            </div>
            <div class="row">
              <div class="col">

                <div class="result-list">

                </div>

              </div>
            </div>
          </div>
        </div>

        <div id="resDLVR" class="inactive">
          <div class="container-fluid">
            <div class="row align-items-center mb-4">
              <div class="col">
                <p class="fw-bold mb-0">Productos disponibles en la <span class="text-primary">zona azul</span></p>
              </div>
              <div class="col">
                <small class="d-block text-end text-muted">Mostrando todos los productos</small>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col px-4 overflow-hidden" id="swiper-azul">



              </div>
            </div>
            
            <div class="row align-items-center mb-4">
              <div class="col">
                <p class="fw-bold mb-0">Productos disponibles en la <span style="color: #8A25F5;">zona morada</span></p>
              </div>
            </div>

            <div class="row">
              <div class="col px-4 overflow-hidden" id="swiper-morado">
 
              </div>
            </div>
          </div>
        </div>

      </div>

      <div id="mapboxgl" class="map-wrapper sticky-top">map-wrapper</div>
    </div>

  </section>

</div>

<?php get_footer(); ?>