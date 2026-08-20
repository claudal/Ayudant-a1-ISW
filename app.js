// Actividad: Generador de Consejos con JavaScript

// PASO 1: Seleccionar los elementos del DOM
// Utiliza 'const' para declarar las variables, ya que estos elementos no cambiarán.
// Pista: usa document.getElementById('id-del-elemento')

/**@type {HTMLButtonElement} */
const BOTON = document.getElementById('fetch-btn');

/**@type {HTMLParagraphElement} */
const TEXTO_DEL_DIA = document.getElementById('quote-text');




// PASO 2: Crear la función para consumir la API
// Utilizaremos una Arrow Function y la sintaxis async/await
// URL de la API: 'https://api.adviceslip.com/advice'

const obtenerConsejo = async () => {
    try {
        // Deshabilitamos el botón mientras carga para evitar múltiples clics
        BOTON.disabled = true;
        // Mostramos un texto de carga
        BOTON.textContent = "Cargando frase...";

        // 2.1 Utiliza 'fetch' para llamar a la API. Recuerda usar 'await' ya que fetch devuelve una promesa.
        const respuesta = await fetch("https://api.adviceslip.com/advice");
        
        // 2.2 Convierte la respuesta a formato JSON. También requiere 'await' ya que es una promesa.
        
        // 2.3 Extrae el consejo. (La API devuelve el texto dentro de data.slip.advice)
        const data = (await respuesta.json()).slip;

        // 2.4 Muestra el consejo en el HTML usando Template Literals (``)
        TEXTO_DEL_DIA.textContent = `Consejo N°${data.slip_id}: ${data.advice}`;
        
    } catch (error) {
        // Qué pasa si hay un error (ej. el usuario se queda sin internet)
        console.error(error);
        TEXTO_DEL_DIA.textContent = "Hubo un error al cargar el consejo, vuelve a intentarlo más tarde...";
    } finally {
        // El bloque finally se ejecuta SIEMPRE, haya error o no.
        // Aquí volvemos a habilitar el botón para que puedan pedir otro consejo.
        BOTON.disabled = false;
        // Mostramos un texto de carga
        BOTON.textContent = "Obtener Conejo";

    }
};

// Conectamos el botón con la función
// Utilizamos addEventListener para escuchar el evento de 'clic' en el botón

BOTON.addEventListener("click",obtenerConsejo);
