    let currentFrame = 4; // Frame inicial
    const totalFrames = 30; // Total de frames
    let isDragging = false; // Bandera para saber si se está arrastrando
    let startX = 0; // Posición inicial del mouse
    let accumulatedMovement = 0; // Movimiento acumulado para mayor precisión
    const frameChangeThreshold = 20; // Ajustamos el umbral para hacer el touch más suave
    const productImage = document.getElementById('productImage');
    let currentColor = 'red'; // Color inicial
    let currentProduct = 'XS'; // Producto inicial
    let imagesLoaded = false; // Bandera para saber si las imágenes se han cargado
    const colorName = document.getElementById('colorName'); // Elemento para mostrar el nombre del color

    // Preload de todas las imágenes
    let imageCache = {};
    let imagesToLoad = [];

    function preloadImages() {
      imagesToLoad = []; // Reiniciamos las imágenes a cargar
      for (let i = 1; i <= totalFrames; i++) {
        const imgSrc = `/images/${currentProduct}/${currentColor}/${i}.png`;
        imagesToLoad.push(imgSrc);
      }

      loadNextImage(); // Iniciar la precarga
    }

    function loadNextImage() {
      if (imagesToLoad.length === 0) {
        // Todas las imágenes se han cargado
        document.getElementById('spinner').style.display = 'none';
        productImage.style.display = 'block';
        imagesLoaded = true;
        return;
      }

      const nextImageSrc = imagesToLoad.shift();
      const img = new Image();
      img.src = nextImageSrc;

      img.onload = function() {
        imageCache[nextImageSrc] = img;
        loadNextImage(); // Recursivamente cargar la siguiente imagen
      };

      img.onerror = function() {
        console.error('Error cargando la imagen:', nextImageSrc);
        loadNextImage(); // Continuar cargando las siguientes aunque falle una
      };
    }

    // Ejecutar la precarga de imágenes cuando se carga la página
    window.onload = function() {
      preloadImages();
    };

    productImage.addEventListener('dragstart', (event) => {
      event.preventDefault(); 
    });

    const viewer = document.getElementById('productViewer');

    // --- Controladores para el mouse ---
    viewer.addEventListener('mousedown', (event) => {
      if (!imagesLoaded) return; // No permitir interacción hasta que las imágenes se carguen
      isDragging = true;
      startX = event.pageX;
      viewer.style.cursor = "grabbing";
      productImage.style.transition = 'transform 0s'; //  Desactivar la transición para un arrastre más suave
    });

    viewer.addEventListener('mouseup', () => {
      isDragging = false;
      viewer.style.cursor = "grab";
    });

    viewer.addEventListener('mouseleave', () => {
      isDragging = false;
      viewer.style.cursor = "grab";
    });

    viewer.addEventListener('mousemove', (event) => {
      if (isDragging) {
        const diff = event.pageX - startX;
        handleMouseDrag(diff);
        startX = event.pageX;
      }
    });

    function handleMouseDrag(diff) {
      accumulatedMovement += diff;

      if (Math.abs(accumulatedMovement) > frameChangeThreshold) {
        const framesToMove = Math.floor(Math.abs(accumulatedMovement) / frameChangeThreshold);
        currentFrame += (diff > 0) ? -framesToMove : framesToMove;

        if (currentFrame > totalFrames) currentFrame = 1;
        if (currentFrame < 1) currentFrame = totalFrames;

        updateImage();
        accumulatedMovement = accumulatedMovement % frameChangeThreshold;
      }
    }

    // --- Controladores para dispositivos táctiles (touch) ---
    viewer.addEventListener('touchstart', (event) => {
      if (!imagesLoaded || event.touches.length !== 1) return; // No permitir interacción hasta que las imágenes se carguen
      isDragging = true;
      startX = event.touches[0].pageX; // Capturamos la posición inicial del primer toque
      accumulatedMovement = 0; // Reiniciamos el acumulador de movimiento
    });

    viewer.addEventListener('touchend', () => {
      isDragging = false; // El usuario ha dejado de arrastrar, reseteamos el arrastre
    });

    viewer.addEventListener('touchmove', (event) => {
      if (isDragging && event.touches.length === 1) {
        const diff = event.touches[0].pageX - startX; // Calculamos la diferencia entre la posición inicial y la actual
        handleTouchDrag(diff);
        startX = event.touches[0].pageX; // Actualizamos la posición inicial al nuevo punto de arrastre
      }
    });

    function handleTouchDrag(diff) {
      accumulatedMovement += diff;

      if (Math.abs(accumulatedMovement) > frameChangeThreshold) {
        const framesToMove = Math.floor(Math.abs(accumulatedMovement) / frameChangeThreshold);
        currentFrame += (diff > 0) ? -framesToMove : framesToMove;

        if (currentFrame > totalFrames) currentFrame = 1;
        if (currentFrame < 1) currentFrame = totalFrames;

        updateImage();
        accumulatedMovement = accumulatedMovement % frameChangeThreshold;
      }
    }

    function updateImage() {
      productImage.src = `/images/${currentProduct}/${currentColor}/${currentFrame}.png`;
    }

    // Cambiar de Versión cuando se hace clic en una tab
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active')); // Remover la clase "active" de todas las tabs
        tab.classList.add('active'); // Activar la tab seleccionada

        currentProduct = tab.getAttribute('data-product'); // Cambiar al producto seleccionado // Reiniciar el color
        currentColor = 'red'; // Reiniciar el color
        imagesLoaded = false; // Marcar las imágenes como no cargadas
        document.getElementById('spinner').style.display = 'block'; // Mostrar el spinner
        productImage.style.display = 'none'; // Ocultar la imagen actual
        currentFrame = 4; //Reiniciar el frame
        updateCarInfo(); // Actualizar la información del auto
        preloadImages(); // Cargar las imágenes del nuevo producto
        updateImage(); // Actualizar la imagen
      });
    });

    
    // Función para cambiar el color seleccionado
    function colorSelected(color) {
      if (color === 'red') {
        colorName.innerText = 'Color seleccionado: Rojo Metalizado';
      } else if (color === 'black') {
        colorName.innerText = 'Color seleccionado: Negro Mica';
      } else if(color === 'white'){
        colorName.innerText = 'Color seleccionado: Super Blanco';
      } else if(color === 'gray'){
        colorName.innerText = 'Color seleccionado: Gris Oscuro';
      } else if(color === 'silver'){
        colorName.innerText = 'Color seleccionado: Gris Plata';
      } else if(color === 'blue'){
        colorName.innerText = 'Color seleccionado: Gris Azulado';
      } else if(color === 'white-perl'){
        colorName.innerText = 'Color seleccionado: Blanco Perlado';
      }

    }

    // Cambiar color y recargar imágenes
    const colorButtons = document.querySelectorAll('button[data-color]');
    colorButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentColor = button.getAttribute('data-color');
        colorSelected(currentColor);
        preloadImages(); // Cargar las imágenes del nuevo color
        updateImage(); // Actualizar la imagen
      });
    });


        //Tabs de las especificaciones
        function openTab(tabName) {
            let i,tabcontent, tablinks;
      
            // Ocultar todo el contenido de las tabs
            tabcontent = document.getElementsByClassName("tab-content");
            for (i = 0; i < tabcontent.length; i++) {
              if (tabcontent[i].id !== tabName) {
                tabcontent[i].classList.remove("show");
                tabcontent[i].classList.remove("active");
              } else if (tabcontent[i].id === tabName) {
                tabcontent[i].classList.add("show");
                tabcontent[i].classList.add("active");
              }
            }
            // Remover la clase 'active' de todos los botones de tabs
            tablinks = document.querySelectorAll("button");
            tablinks.forEach(function (tablink) {
              tablink.classList.remove("text-red-600", "border-red-500");
              tablink.classList.add("text-gray-500", "border-transparent");
            });
      
            // Mostrar la tab actual y agregar clase 'active'
            const element = document.getElementById(tabName);
            if (element) {
              element.classList.add("show", "active");
            }
            
            // Aplicar la clase 'active' al botón de la tab actual
            if (tabName === 'automatico') {
              const automaticoXsTab = document.getElementById("automatico-xs-tab");
              if (automaticoXsTab) {
                automaticoXsTab.classList.add("text-red-600", "border-red-500");
                automaticoXsTab.classList.remove("text-gray-500", "border-transparent");   
              }
            } else if (tabName === 'manual') {
              const manualXsTab = document.getElementById("manual-xs-tab");
              if (manualXsTab) {
                manualXsTab.classList.add("text-red-600", "border-red-500");
                manualXsTab.classList.remove("text-gray-500", "border-transparent");
              }
            } else if (tabName === 'automatico-xls') {
              const automaticoXlsTab = document.getElementById("automatico-xls-tab");
              if (automaticoXlsTab) {
                automaticoXlsTab.classList.add("text-red-600", "border-red-500");
                automaticoXlsTab.classList.remove("text-gray-500", "border-transparent");
              }
            } else if (tabName === 'manual-xls') {
              const manualXlsTab = document.getElementById("manual-xls-tab");
              if (manualXlsTab) {
                manualXlsTab.classList.add("text-red-600", "border-red-500");
                manualXlsTab.classList.remove("text-gray-500", "border-transparent");
              }
            } else if (tabName === 'automatico-xls-pack') {
              const automaticoXlsPackTab = document.getElementById("automatico-xls-pack-tab");
              if (automaticoXlsPackTab) {
                automaticoXlsPackTab.classList.add("text-red-600", "border-red-500");
                automaticoXlsPackTab.classList.remove("text-gray-500", "border-transparent");
              }
            } else if (tabName === 'automatico-s') {
              const automaticoS = document.getElementById("automatico-s-tab");
              if (automaticoS) {
                automaticoS.classList.add("text-red-600", "border-red-500");
                automaticoS.classList.remove("text-gray-500", "border-transparent");
              }
            }
          }
      
          // Asociar eventos a los botones al cargar la página
          document.addEventListener("DOMContentLoaded", function () {
      
            const automaticoXsTab = document.getElementById("automatico-xs-tab");
            if (automaticoXsTab) {
              automaticoXsTab.addEventListener("click", function () {
                openTab('automatico');
              });
            }
             
            
            const manualXsTab = document.getElementById("manual-xs-tab");
            if (manualXsTab) {
              manualXsTab.addEventListener("click", function () {
                openTab('manual');
              });
            }
      
            const automaticoXlsTab = document.getElementById("automatico-xls-tab");
            if (automaticoXlsTab) {
              automaticoXlsTab.addEventListener("click", function () {
                openTab('automatico-xls');
              });
            }
      
            const manualXlsTab = document.getElementById("manual-xls-tab");
            if (manualXlsTab) {
              manualXlsTab.addEventListener("click", function () {
                openTab('manual-xls');
              });
            }
      
            const automaticoXlsPackTab = document.getElementById("automatico-xls-pack-tab");
            if (automaticoXlsPackTab) {
              automaticoXlsPackTab.addEventListener("click", function () {
                openTab('automatico-xls-pack');
              });
            }
      
            const automaticoS = document.getElementById("automatico-s-tab");
            if (automaticoS) {
              automaticoS.addEventListener("click", function () {
                openTab('automatico-s');
              });
            }
          });
          
      
          // Actualizar la información del auto
          let manualXsTab = document.getElementById('manual-xs-tab');
          let automaticoXsTab = document.getElementById('automatico-xs-tab');
      
          let manualXlsTab = document.getElementById('manual-xls-tab');
          let automaticoXlsTab = document.getElementById('automatico-xls-tab');
          let automaticoXlsPackTab = document.getElementById('automatico-xls-pack-tab');
      
          let automaticoS = document.getElementById('automatico-s-tab');
      
          // Actualizar la información del auto
          if (manualXsTab && automaticoXsTab && manualXlsTab && automaticoXlsTab && automaticoXlsPackTab && automaticoS) {
            manualXsTab.click();
            manualXsTab.style.display = 'block';
            automaticoXsTab.style.display = 'block';
            manualXlsTab.style.display = 'none';
            automaticoXlsTab.style.display = 'none';
            automaticoXlsPackTab.style.display = 'none';
            automaticoS.style.display = 'none';
          }
          
           // Actualizar la información del auto
          function updateCarInfo(){
            if(currentProduct === 'XS'){
              if (manualXsTab && automaticoXsTab && manualXlsTab && automaticoXlsTab && automaticoXlsPackTab && automaticoS) { // Si los elementos existen en el DOM (no son null) entonces se ejecuta el código dentro de las llaves {}
                manualXsTab.click();
                manualXsTab.style.display = 'block';
                automaticoXsTab.style.display = 'block';
                manualXlsTab.style.display = 'none';
                automaticoXlsTab.style.display = 'none';
                automaticoXlsPackTab.style.display = 'none';
                automaticoS.style.display = 'none';
              }
            } else if(currentProduct === 'XLS'){
              if (manualXlsTab && automaticoXlsTab && automaticoXlsPackTab && automaticoS && manualXsTab && automaticoXsTab) { // Si los elementos existen en el DOM (no son null) entonces se ejecuta el código dentro de las llaves {}
                manualXlsTab.click();
                manualXlsTab.style.display = 'block';
                automaticoXlsTab.style.display = 'block';
                automaticoXlsPackTab.style.display = 'block';
                manualXsTab.style.display = 'none';
                automaticoXsTab.style.display = 'none';
                automaticoS.style.display = 'none';
              }
            } else if(currentProduct === 'S'){
              if (automaticoS && manualXsTab && automaticoXsTab && manualXlsTab && automaticoXlsTab && automaticoXlsPackTab) { // Si los elementos existen en el DOM (no son null) entonces se ejecuta el código dentro de las llaves {}
                automaticoS.click();
                automaticoS.style.display = 'block';
                manualXsTab.style.display = 'none';
                automaticoXsTab.style.display = 'none';
                manualXlsTab.style.display = 'none';
                automaticoXlsTab.style.display = 'none';
                automaticoXlsPackTab.style.display = 'none';
              }
            }
          }
      