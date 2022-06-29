<?php /* Template Name: Template Mapa */ ?>

<?php get_header(); ?>

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
                  <ul class="options">
                    <li>
                      <label class="item-checkbox" for="shopLider" data-id="lider">Lider
                        <input id="shopLider" name="shopFilter" type="checkbox" value="shopLider">
                        <span class="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label class="item-checkbox" for="shopAcuenta" data-id="acuenta">Acuenta
                        <input id="shopAcuenta" name="shopFilter" type="checkbox" value="shopAcuenta">
                        <span class="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label class="item-checkbox" for="shopSodimac" data-id="sodimac">Sodimac
                        <input id="shopSodimac" name="shopFilter" type="checkbox" value="shopSodimac">
                        <span class="checkmark"></span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="filter-item sep px-3">
               <div id="selectBrand" class="dropdow-checkbox-multiselect">
                  <div class="dropbtn dropbtn-brand">Selecciona Marca</div>
                  <ul class="options">
                    <li>
                      <label class="item-checkbox" data-id="omo">Omo	
                        <input id="filter-omo" name="shopBrand" type="checkbox" value="omo">
                        <span class="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label class="item-checkbox" data-id="quix">Quix	
                        <input id="filter-quix" name="shopBrand" type="checkbox" value="quix">
                        <span class="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label class="item-checkbox" data-id="soft">Soft	
                        <input id="filter-soft" name="shopBrand" type="checkbox" value="soft">
                        <span class="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label class="item-checkbox" data-id="cif">Cif
                        <input id="filter-cif" name="shopFilter" type="checkbox" value="cif">
                        <span class="checkmark"></span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="filter-item">
                <button id="clearFilters" type="button" class="btn btn-link text-decoration-none"><i class="fa-solid fa-xmark fa-xl me-2"></i> Borrar filtros</button>
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
                <small class="d-block text-end text-muted">Mostrando todos los productos</small>
              </div>
            </div>
            <div class="row">
              <div class="col">

                <div id="productsWrapper" class="result-list">
                  <!-- <div class="item">
                    <label class="wrapper-checkbox">
                      <input id="product-omo" name="products" type="checkbox" value="omo">
                      <span class="checkmark"></span>
                      <div class="overlay"></div>
                    </label>
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/products/omo.png" class="" alt="product">
                    </div>
                    <div class="info">
                      <div class="name">Omo</div>
                      <div class="desc">Detergente liquido, matic multiacción. Con agentes biodegradables</div>
                      <div class="qty">3 Lt</div>
                    </div>
                  </div>
                  <div class="item">
                    <label class="wrapper-checkbox">
                      <input id="product-quix" name="products" type="checkbox" value="quix">
                      <span class="checkmark"></span>
                      <div class="overlay"></div>
                    </label>
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/products/quix.png" class="" alt="product">
                    </div>
                    <div class="info">
                      <div class="name">Quix</div>
                      <div class="desc">Lavalozas líquido concentrado. Pureza esencial. Biodegradable</div>
                      <div class="qty">1.5 Lt</div>
                    </div>
                  </div>
                  <div class="item">
                    <label class="wrapper-checkbox">
                      <input id="product-soft" name="products" type="checkbox" value="soft">
                      <span class="checkmark"></span>
                      <div class="overlay"></div>
                    </label>
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/products/soft.png" class="" alt="product">
                    </div>
                    <div class="info">
                      <div class="name">Soft</div>
                      <div class="desc">Suavizante de ropa líquido. Diluido clásico. Biodegradable</div>
                      <div class="qty">1.5 Lt</div>
                    </div>
                  </div>
                  <div class="item">
                    <label class="wrapper-checkbox">
                      <input id="product-cif" name="products" type="checkbox" value="cif">
                      <span class="checkmark"></span>
                      <div class="overlay"></div>
                    </label>
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/products/cif.png" class="" alt="product">
                    </div>
                    <div class="info">
                      <div class="name">Cif</div>
                      <div class="desc">Limpiador desengrasante líquido. Antograsa ultra rápido. Biodegradable.</div>
                      <div class="qty">1.5 Lt</div>
                    </div>
                  </div>
                  <div class="item">
                    <label class="wrapper-checkbox">
                      <input id="product-detergente" name="products" type="checkbox" value="detergente">
                      <span class="checkmark"></span>
                      <div class="overlay"></div>
                    </label>
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/products/lider-detergente.png" class="" alt="product">
                    </div>
                    <div class="info">
                      <div class="name">Detergente Lider</div>
                      <div class="desc">Detergente líquido Floral Matic, Biodegradable.</div>
                      <div class="qty">3 Lt</div>
                    </div>
                  </div>
                  <div class="item">
                    <label class="wrapper-checkbox">
                      <input id="product-lavaloza" name="products" type="checkbox" value="lavaloza">
                      <span class="checkmark"></span>
                      <div class="overlay"></div>
                    </label>
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/products/lider-lavaloza.png" class="" alt="product">
                    </div>
                    <div class="info">
                      <div class="name">Lavaloza Lider</div>
                      <div class="desc">Lavalozas líquido Máximo poder desengrasante. Biodegradable.</div>
                      <div class="qty">1.5 Lt</div>
                    </div>
                  </div>
                  <div class="item">
                    <label class="wrapper-checkbox">
                      <input id="product-suavizante" name="products" type="checkbox" value="suavizante">
                      <span class="checkmark"></span>
                      <div class="overlay"></div>
                    </label>
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/products/lider-suavizante.png" class="" alt="product">
                    </div>
                    <div class="info">
                      <div class="name">Suavizante Lider</div>
                      <div class="desc">Suavizante de ropa clásico. Con agentes biodegradables.</div>
                      <div class="qty">1.5 Lt</div>
                    </div>
                  </div>
                  <div class="item">
                    <label class="wrapper-checkbox">
                      <input id="product-limpiapiso" name="products" type="checkbox" value="limpiapiso">
                      <span class="checkmark"></span>
                      <div class="overlay"></div>
                    </label>
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/products/lider-limpiapisos.png" class="" alt="product">
                    </div>
                    <div class="info">
                      <div class="name">Limpiapisos Lider</div>
                      <div class="desc">Limpiador multiespacios lavanda. Con agentes biodegradables.</div>
                      <div class="qty">1.5 Lt</div>
                    </div>
                  </div>
                  <div class="item">
                    <label class="wrapper-checkbox">
                      <input id="product-purina-raza-grande" name="products" type="checkbox" value="purina-raza-grande">
                      <span class="checkmark"></span>
                      <div class="overlay"></div>
                    </label>
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/products/purina-raza-grande.png" class="" alt="product">
                    </div>
                    <div class="info">
                      <div class="name">Purina raza grande</div>
                      <div class="desc">Alimento de mascotas Seco/sólido para perros medianos y grandes.</div>
                      <div class="qty">3 a 15 kilos</div>
                    </div>
                  </div>
                  <div class="item">
                    <label class="wrapper-checkbox">
                      <input id="product-purina-raza-chica" name="products" type="checkbox" value="purina-raza-chica">
                      <span class="checkmark"></span>
                      <div class="overlay"></div>
                    </label>
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/products/purina-raza-chica.png" class="" alt="product">
                    </div>
                    <div class="info">
                      <div class="name">Purina raza chica</div>
                      <div class="desc">Alimento de mascotas Seco/sólido para perros minis y pequeños.</div>
                      <div class="qty">1.5 Lt</div>
                    </div>
                  </div> -->
                </div>

              </div>
            </div>
          </div>
        </div>

        <div id="resDLVR" class="inactive">
          <div class="container-fluid">
            <div class="row align-items-center mb-4">
              <div class="col">
                <p class="fw-bold mb-0">Productos disponibles en la <span class="text-primary">zona verde</span></p>
              </div>
              <div class="col">
                <small class="d-block text-end text-muted">Mostrando todos los productos</small>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col px-4 overflow-hidden">

                <div class="swiper-container">
                  <div class="swiper-delivery">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <img src="<?php echo get_theme_file_uri(); ?>/images/products/omo.png" class="" alt="product">
                      </div>
                      <div class="swiper-slide">
                        <img src="<?php echo get_theme_file_uri(); ?>/images/products/quix.png" class="" alt="product">
                      </div>
                      <div class="swiper-slide">
                        <img src="<?php echo get_theme_file_uri(); ?>/images/products/soft.png" class="" alt="product">
                      </div>
                      <div class="swiper-slide">
                        <img src="<?php echo get_theme_file_uri(); ?>/images/products/cif.png" class="" alt="product">
                      </div>
                      <div class="swiper-slide">
                        <img src="<?php echo get_theme_file_uri(); ?>/images/products/purina-raza-grande.png" class="" alt="product">
                      </div>
                      <div class="swiper-slide">
                        <img src="<?php echo get_theme_file_uri(); ?>/images/products/purina-raza-chica.png" class="" alt="product">
                      </div>
                    </div>
  
                  </div>
                  <div class="swiper-button swiper-button-prev prev-green"></div>
                  <div class="swiper-button swiper-button-next next-green"></div>
                </div>

              </div>
            </div>
            
            <div class="row align-items-center mb-4">
              <div class="col">
                <p class="fw-bold mb-0">Productos disponibles en la <span style="color: #8A25F5;">zona morada</span></p>
              </div>
            </div>

            <div class="row">
              <div class="col px-4 overflow-hidden">

                <div class="swiper-container">
                  <div class="swiper-delivery-purple">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <img src="<?php echo get_theme_file_uri(); ?>/images/products/omo.png" class="" alt="product">
                      </div>
                      <div class="swiper-slide">
                        <img src="<?php echo get_theme_file_uri(); ?>/images/products/quix.png" class="" alt="product">
                      </div>
                      <div class="swiper-slide">
                        <img src="<?php echo get_theme_file_uri(); ?>/images/products/soft.png" class="" alt="product">
                      </div>
                      <div class="swiper-slide">
                        <img src="<?php echo get_theme_file_uri(); ?>/images/products/cif.png" class="" alt="product">
                      </div>
                    </div>
  
                  </div>
                  <div class="swiper-button swiper-button-prev prev-purple"></div>
                  <div class="swiper-button swiper-button-next next-purple"></div>
                </div>

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