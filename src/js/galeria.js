document.addEventListener('DOMContentLoaded', function(){
   crearGaleria(); 
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i<=12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

//añadir la funcion de mostrarImagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    const id = parseInt ( e.target.dataset.imagenId);

    //Gemerar imgen
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;
    
    const overLay = document.createElement('DIV');
    overLay.appendChild(imagen);
    overLay.classList.add('overlay');

    //cuando se da click cerrar la imagen
    overLay.onclick = function(){
        overLay.remove();
    }

    // boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    //cuando se presiona se cierra la imagen
    cerrarImagen.onclick = function(){
        overLay.remove();
    }

    overLay.appendChild(cerrarImagen);

    //Mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overLay);
    body.classList.add('fijar-body');
}