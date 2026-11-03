/* =========================================================
   SHOPPINGS RIDE
   JavaScript principal (sin frameworks)
   ========================================================= */


/* =========================================================
   1. DATOS DE LOS SHOPPINGS
   ========================================================= */

const SHOPS = [
    {
        n: 1,
        id: "alto-avellaneda",
        file: "alto-avellaneda.html",
        name: "Alto Avellaneda",
        addr: "Av. General Güemes 897, Avellaneda",
        lat: -34.6717,
        lng: -58.3689,
        hours: "Locales de lunes a domingo de 10:00 a 22:00 hs. La gastronomía puede extender su horario."
    },
    {
        n: 2,
        id: "boulevard-adrogue",
        file: "boulevard-adrogue.html",
        name: "Boulevard Adrogué",
        addr: "Brown 700, Adrogué",
        lat: -34.8003,
        lng: -58.3963,
        hours: "Lunes a sábado de 10:00 a 21:00 hs y domingos de 12:00 a 20:00 hs."
    },
    {
        n: 3,
        id: "unicenter",
        file: "unicenter.html",
        name: "Unicenter",
        addr: "Paraná 3745, Martínez",
        lat: -34.5097,
        lng: -58.5254,
        hours: "Lunes a domingo de 10:00 a 22:00 hs."
    },
    {
        n: 4,
        id: "shopping-caballito",
        file: "shopping-caballito.html",
        name: "Shopping Caballito",
        addr: "Av. Rivadavia 5108, Caballito, CABA",
        lat: -34.6177,
        lng: -58.4344,
        hours: "Lunes a domingo de 10:00 a 22:00 hs."
    }
];


/* =========================================================
   2. FUNCIONES AUXILIARES
   ========================================================= */

// Seleccionar un elemento del DOM
const $ = (s, r = document) => r.querySelector(s);

// Seleccionar varios elementos del DOM
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Escapar caracteres especiales para HTML
const esc = t =>
    String(t).replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));


/* =========================================================
   3. MENÚ MÓVIL
   ========================================================= */

const mb = $('#menu-btn');
const menu = $('#menu');

if (mb) {
    mb.addEventListener('click', () => {

        const open = menu.classList.toggle('hidden') === false;

        mb.setAttribute('aria-expanded', open);

    });
}


/* =========================================================
   4. MAPA INTERACTIVO (LEAFLET + OPENSTREETMAP)
   ========================================================= */

function initMapa() {

    const el = $('#mapa');

    // Verificar si existe el contenedor del mapa
    if (!el) return;

    // Verificar si Leaflet se cargó correctamente
    if (typeof L === 'undefined') {

        el.innerHTML =
            '<p class="p-4 text-sm">No se pudo cargar el mapa. Direcciones: ' +
            SHOPS.map(s => esc(s.name) + ' (' + esc(s.addr) + ')').join('; ') +
            '.</p>';

        return;
    }

    // Mostrar todos los shoppings o solamente uno
    const only = el.dataset.shop
        ? SHOPS.filter(s => s.id === el.dataset.shop)
        : SHOPS;

    // Crear el mapa
    const map = L.map(el, {
        scrollWheelZoom: false
    });

// Cargar las imágenes del mapa desde CARTO
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap, Tiles style by Humanitarian OpenStreetMap Team'
}).addTo(map);

    // Array para guardar las coordenadas
    const pts = [];

    // Crear los marcadores de cada shopping
    only.forEach(s => {

        const icon = L.divIcon({
            className: '',
            html: '<div class="pin">' + s.n + '</div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        // Agregar marcador al mapa
        L.marker([s.lat, s.lng], {
            icon,
            title: s.name,
            alt: s.name
        })
            .addTo(map)

            // Información que aparece al hacer clic
            .bindPopup(
                '<strong>' + esc(s.name) + '</strong><br>' +
                esc(s.addr) +
                '<br><a href="' + s.file + '">Ver página</a>'
            );

        // Guardar coordenadas
        pts.push([s.lat, s.lng]);

    });

    // Si hay más de un shopping, mostrar el recorrido completo
    if (only.length > 1) {

        // Dibujar línea entre los shoppings
        L.polyline(pts, {
            color: '#776005',
            weight: 3,
            dashArray: '6 6'
        }).addTo(map);

        // Ajustar el zoom para mostrar todos los puntos
        map.fitBounds(pts, {
            padding: [30, 30]
        });

    } else {

        // Si hay un solo shopping, centrar el mapa en ese punto
        map.setView(pts[0], 15);

    }

}

// Inicializar el mapa cuando termina de cargar la página
window.addEventListener('load', initMapa);


/* =========================================================
   5. VALIDACIÓN DE FORMULARIOS
   ========================================================= */

// Verificar que el formato del correo electrónico sea válido
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);


// Mostrar o quitar un mensaje de error
function setErr(input, msg) {

    const p = $('#e-' + input.id);

    if (p) {
        p.textContent = msg || '';
    }

    if (msg) {
        input.setAttribute('aria-invalid', 'true');
    } else {
        input.removeAttribute('aria-invalid');
    }

    return !msg;
}


// Validar los campos de un formulario
function validar(form, reglas) {

    let primero = null;
    let ok = true;

    Object.entries(reglas).forEach(([id, fn]) => {

        const inp = $('#' + id);
        const msg = fn(inp.value.trim());

        if (!setErr(inp, msg)) {

            ok = false;
            primero = primero || inp;

        }

    });

    // Llevar el foco al primer campo con error
    if (primero) {
        primero.focus();
    }

    return ok;
}


// Mostrar un mensaje de confirmación
function mostrar(el, html) {

    el.innerHTML = html;
    el.classList.remove('hidden');
    el.focus();

}


/* =========================================================
   6. FORMULARIO DE CONTACTO (SIMULACIÓN)
   ========================================================= */

const fc = $('#form-contacto');

if (fc) {

    // Reglas de validación de cada campo
    const rc = {

        'c-nombre': v =>
            v.length < 3
                ? 'Ingresá tu nombre (mínimo 3 letras).'
                : '',

        'c-email': v =>
            !v
                ? 'Ingresá tu correo electrónico.'
                : (!emailOk(v)
                    ? 'El correo no es válido. Ejemplo: nombre@correo.com'
                    : ''),

        'c-motivo': v =>
            !v
                ? 'Elegí el motivo de tu consulta.'
                : '',

        'c-mensaje': v =>
            v.length < 10
                ? 'El mensaje debe tener al menos 10 caracteres.'
                : ''

    };


    // Validar cada campo cuando pierde el foco
    Object.keys(rc).forEach(id => {

        $('#' + id).addEventListener('blur', e => {

            setErr(
                e.target,
                rc[id](e.target.value.trim())
            );

        });

    });


    // Procesar el envío del formulario
    fc.addEventListener('submit', e => {

        e.preventDefault();

        // Si hay errores, no continuar
        if (!validar(fc, rc)) return;

        // Mostrar confirmación simulada
        mostrar(
            $('#c-ok'),
            '✔ <strong>Consulta enviada (simulación).</strong> Gracias, ' +
            esc($('#c-nombre').value.trim()) +
            ': registramos tu consulta sobre «' +
            esc($('#c-motivo').value) +
            '». No se envió ningún mensaje real.'
        );

        // Limpiar formulario
        fc.reset();

    });

}


/* =========================================================
   7. RESERVA Y PLANIFICACIÓN DE VISITA
   ========================================================= */


/* ---------------------------------------------------------
   7.1. Shoppings disponibles
   --------------------------------------------------------- */

const SHOPPINGS = {
    'alto-avellaneda': 'Alto Avellaneda',
    'boulevard-adrogue': 'Boulevard Adrogué',
    'unicenter': 'Unicenter',
    'shopping-caballito': 'Shopping Caballito'
};


/* ---------------------------------------------------------
   7.2. Adicionales disponibles
   --------------------------------------------------------- */

const EXTRAS = {

    cine: {
        t: 'Cine (por persona)',
        precio: 13000,
        moneda: 'ARS',
        porPersona: true
    },

    merienda: {
        t: 'Merienda (por persona)',
        precio: 15000,
        moneda: 'ARS',
        porPersona: true
    },

    estacionamiento: {
        t: 'Estacionamiento (por visita)',
        precio: 4,
        moneda: 'USD',
        porPersona: false
    }

};


/* ---------------------------------------------------------
   7.3. Tipo de cambio
   --------------------------------------------------------- */

// Valor de referencia por defecto
let TC = {
    valor: 1400,
    fuente: 'Valor de referencia estático (no se pudo consultar la API)',
    fecha: 'sin actualizar',
    real: false
};


// Formatear importes en pesos argentinos
const fmtARS = n =>
    n.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    });


// Formatear importes en dólares
const fmtUSD = n =>
    n.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'USD'
});


/* ---------------------------------------------------------
   7.4. Obtener cotización del dólar
   --------------------------------------------------------- */

async function cargarCambio() {

    try {

        // Consultar API del dólar oficial
        const r = await fetch('https://dolarapi.com/v1/dolares/oficial');

        if (!r.ok) {
            throw new Error(r.status);
        }

        const d = await r.json();

        if (!d.venta) {
            throw new Error('sin dato');
        }

        // Actualizar tipo de cambio
        TC = {
            valor: Number(d.venta),
            fuente: 'DolarAPI.com (dólar oficial, precio de venta)',
            fecha: new Date(d.fechaActualizacion).toLocaleString('es-AR'),
            real: true
        };

    } catch (err) {

        // Si falla la API, se mantiene el valor de referencia.

    }

    // Recalcular importes
    calcular();

}


/* ---------------------------------------------------------
   7.5. Calcular el precio de la visita
   --------------------------------------------------------- */

function calcular() {

    const personas = parseInt($('#r-personas').value, 10);

    const shoppingsElegidos = $$('input[name="shoppings"]:checked');

    const extrasElegidos = $$('input[name="extra"]:checked');

    const dl = $('#r-resumen');

    if (!dl) return null;

    // Limpiar resumen anterior
    dl.innerHTML = '';


    // Crear una fila dentro del resumen
    const fila = (a, b) => {

        dl.insertAdjacentHTML(
            'beforeend',
            '<dt>' + a + '</dt>' +
            '<dd class="text-right">' + b + '</dd>'
        );

    };


    // Mostrar información del tipo de cambio
    $('#r-cambio').innerHTML =
        '<strong>Tipo de cambio:</strong> 1 USD = ' +
        fmtARS(TC.valor) +
        ' · Fuente: ' +
        esc(TC.fuente) +
        ' · Fecha de referencia: ' +
        esc(TC.fecha) +
        '.' +
        (TC.real ? '' : ' <em>Importe estimativo.</em>');


    /* -----------------------------------------------------
       Mostrar shoppings seleccionados
       ----------------------------------------------------- */

    if (shoppingsElegidos.length > 0) {

        const nombres = shoppingsElegidos.map(s =>
            SHOPPINGS[s.value]
        );

        fila(
            'Shoppings elegidos',
            nombres.map(esc).join(', ')
        );

    } else {

        fila(
            'Shoppings elegidos',
            'Todavía no seleccionaste ninguno'
        );

    }


    /* -----------------------------------------------------
       Validar cantidad de personas
       ----------------------------------------------------- */

    if (!(personas >= 1 && personas <= 10)) {

        fila(
            'Cantidad de personas',
            'Ingresá un número entre 1 y 10'
        );

        return null;

    }


    /* -----------------------------------------------------
       Calcular adicionales seleccionados
       ----------------------------------------------------- */

    let totalUSD = 0;

    let totalARS = 0;


    extrasElegidos.forEach(c => {

        const x = EXTRAS[c.value];

        if (!x) return;

        // Cine y merienda se multiplican por persona.
        // Estacionamiento se cobra una sola vez.
        const cantidad = x.porPersona ? personas : 1;

        const subtotal = x.precio * cantidad;


        if (x.moneda === 'USD') {

            totalUSD += subtotal;

            fila(
                x.t,
                fmtUSD(subtotal)
            );

        } else {

            totalARS += subtotal;

            fila(
                x.t,
                fmtARS(subtotal)
            );

        }

    });


    /* -----------------------------------------------------
       Calcular total combinado
       ----------------------------------------------------- */

    // Convertir el subtotal en dólares a pesos argentinos
    const totalFinalARS =
        Math.round((totalARS + totalUSD * TC.valor) * 100) / 100;


    // Calcular el equivalente total en dólares
    const totalFinalUSD =
        Math.round((totalUSD + totalARS / TC.valor) * 100) / 100;


    // Mostrar total en dólares
    fila(
        '<strong>Total aproximado en USD</strong>',
        '<strong>' + fmtUSD(totalFinalUSD) + '</strong>'
    );


    // Mostrar total en pesos argentinos
    fila(
        '<strong>Total en pesos argentinos (ARS)</strong>',
        '<strong>' + fmtARS(totalFinalARS) + '</strong>'
    );


    return {
        total: totalFinalUSD,
        ars: totalFinalARS
    };

}


/* ---------------------------------------------------------
   7.6. Configuración del formulario de reserva
   --------------------------------------------------------- */

const fr = $('#form-reserva');

if (fr) {


    /* -----------------------------------------------------
       Generar adicionales en el formulario
       ----------------------------------------------------- */

    $('#r-extras').innerHTML =

        Object.entries(EXTRAS).map(([k, x]) => {

            const precio = x.moneda === 'USD'
                ? fmtUSD(x.precio)
                : fmtARS(x.precio);

            return (

                '<label class="flex items-center gap-2 text-sm">' +
                '<input type="checkbox" name="extra" value="' +
                k +
                '" class="h-4 w-4"> ' +
                x.t +
                ' · ' +
                precio +
                '</label>'

            );

        }).join('');


    /* -----------------------------------------------------
       Establecer fecha mínima: hoy
       ----------------------------------------------------- */

    const hoy = new Date().toISOString().slice(0, 10);

    $('#r-fecha').min = hoy;


    /* -----------------------------------------------------
       Recalcular cuando cambian los campos
       ----------------------------------------------------- */

    fr.addEventListener('input', calcular);

    fr.addEventListener('change', calcular);


    /* -----------------------------------------------------
       Limpiar errores al reiniciar el formulario
       ----------------------------------------------------- */

    fr.addEventListener('reset', () => {

        setTimeout(() => {

            $$('.campo', fr).forEach(i => setErr(i, ''));

            $('#e-r-shoppings').textContent = '';

            $('#r-ok').classList.add('hidden');

            calcular();

        });

    });


    /* -----------------------------------------------------
       7.7. Reglas de validación de la reserva
       ----------------------------------------------------- */

    const rr = {

        'r-nombre': v =>
            v.length < 3
                ? 'Ingresá tu nombre y apellido.'
                : '',


        'r-email': v =>
            !v
                ? 'Ingresá tu correo electrónico.'
                : (!emailOk(v)
                    ? 'El correo no es válido. Ejemplo: nombre@correo.com'
                    : ''),


        'r-fecha': v =>
            !v
                ? 'Elegí una fecha.'
                : (v < hoy
                    ? 'La fecha no puede ser anterior a hoy.'
                    : ''),


        'r-personas': v =>
            (!/^\d+$/.test(v) || +v < 1 || +v > 10)
                ? 'Ingresá un número entero entre 1 y 10.'
                : ''

    };


    /* -----------------------------------------------------
       Validar campos al perder el foco
       ----------------------------------------------------- */

    Object.keys(rr).forEach(id => {

        $('#' + id).addEventListener('blur', e => {

            setErr(
                e.target,
                rr[id](e.target.value.trim())
            );

        });

    });


    /* -----------------------------------------------------
       Validar selección de shoppings
       ----------------------------------------------------- */

    function validarShoppings() {

        const elegidos = $$('input[name="shoppings"]:checked');

        const error = $('#e-r-shoppings');

        if (elegidos.length === 0) {

            error.textContent = 'Elegí al menos un shopping.';

            return false;

        }

        error.textContent = '';

        return true;

    }


    /* -----------------------------------------------------
       7.8. Confirmar solicitud de reserva
       ----------------------------------------------------- */

    fr.addEventListener('submit', e => {

        e.preventDefault();


        // Validar formulario
        if (!validar(fr, rr)) return;


        // Validar que haya al menos un shopping seleccionado
        if (!validarShoppings()) {
            return;
        }


        // Calcular importe final
        const t = calcular();

        if (!t) return;


        // Obtener nombres de shoppings elegidos
        const nombresShoppings = $$('input[name="shoppings"]:checked')
            .map(s => SHOPPINGS[s.value]);


        // Generar código de solicitud
        const cod =
            'SR-' +
            Math.random().toString(36).slice(2, 8).toUpperCase();


        // Mostrar confirmación
        mostrar(
            $('#r-ok'),

            '✔ <strong>Solicitud registrada (simulación).</strong> Código ' +
            cod +
            '. ' +
            esc($('#r-nombre').value.trim()) +
            ', elegiste visitar ' +
            nombresShoppings.map(esc).join(', ') +
            ', para ' +
            esc($('#r-personas').value) +
            ' persona(s) el ' +
            esc($('#r-fecha').value.split('-').reverse().join('/')) +
            '. El total es ' +
            fmtUSD(t.total) +
            ' (' +
            fmtARS(t.ars) +
            '). No se realizó ningún cobro.'

        );

    });


    /* -----------------------------------------------------
       Calcular importe inicial y consultar cotización
       ----------------------------------------------------- */

    calcular();

    cargarCambio();

}

/* =========================================================
   8. PREGUNTAS FRECUENTES (FAQ)
   ========================================================= */


/* ---------------------------------------------------------
   8.1. Base de preguntas y respuestas
   --------------------------------------------------------- */

const FAQ = [

    {
        q: '¿Qué shoppings incluye el recorrido?',
        k: ['shopping', 'incluye', 'recorrido', 'paradas', 'cuales'],
        a: 'Cuatro paradas: Alto Avellaneda, Boulevard Adrogué, Unicenter y Shopping Caballito. Podés visitarlos en cualquier orden.'
    },

    {
        q: '¿Cuáles son los horarios?',
        k: ['horario', 'hora', 'abre', 'cierra', 'abierto', 'domingo'],
        a: SHOPS.map(s => s.name + ': ' + s.hours).join(' ')
    },

    {
        q: '¿Dónde queda cada shopping?',
        k: ['donde', 'dirección', 'direccion', 'ubicacion', 'ubicación', 'queda', 'calle'],
        a: SHOPS.map(s => s.name + ': ' + s.addr).join('. ') + '.'
    },

    {
        q: '¿Cuál es el más accesible en transporte público?',
        k: ['subte', 'colectivo', 'transporte', 'tren', 'publico', 'público', 'llegar'],
        a: 'Shopping Caballito: tiene la línea A de subte y varios colectivos. Los otros también cuentan con transporte público.'
    },

    {
        q: '¿Cómo llego en auto?',
        k: ['auto', 'estacionamiento', 'cochera', 'panamericana', 'estacionar'],
        a: 'Unicenter tiene acceso directo desde la Panamericana y estacionamiento con espacios para movilidad reducida. En Shopping Caballito el estacionamiento es limitado.'
    },

    {
        q: '¿Hay accesibilidad para personas con movilidad reducida?',
        k: ['accesib', 'movilidad', 'silla', 'rampa', 'ascensor', 'discapacidad'],
        a: 'Shopping Caballito tiene rampas, ascensores y baños adaptados. Unicenter ofrece estacionamiento para movilidad reducida y Alto Avellaneda cuenta con espacios adaptados.'
    },

    {
        q: '¿Hay cine?',
        k: ['cine', 'pelicula', 'película', 'cartelera', 'funcion', 'función'],
        a: 'Sí: Alto Avellaneda, Unicenter y Shopping Caballito tienen cine. Conviene consultar la cartelera antes, sobre todo los fines de semana.'
    },

    {
        q: '¿Hay descuentos?',
        k: ['descuento', 'jubilado', 'estudiante', 'promocion', 'promoción', 'oferta'],
        a: 'Shopping Caballito ofrece descuentos para jubilados y estudiantes durante determinados días de la semana. Consultá los días en el shopping.'
    },

    {
        q: '¿Cuál conviene para una tarde tranquila?',
        k: ['tranquil', 'cafe', 'café', 'arte', 'cultura', 'merienda'],
        a: 'Boulevard Adrogué: cafeterías, gastronomía artesanal y espacios de arte y cultura.'
    },

    {
        q: '¿Cómo se calculan los precios de la visita?',
        k: ['precio', 'costo', 'dolar', 'dólar', 'pesos', 'cambio', 'cuanto', 'cuánto', 'reserva', 'paquete'],
        a: 'Los paquetes están en USD y se convierten a pesos con el dólar oficial (DolarAPI.com). Es una simulación: no se cobra nada. Probala en la sección «Armá tu visita» del inicio.'
    }

];


/* ---------------------------------------------------------
   8.2. Mostrar preguntas frecuentes en la página
   --------------------------------------------------------- */

const faq = $('#faq');

if (faq) {

    faq.innerHTML = FAQ.map(f =>

        '<details class="rounded-2xl bg-white border border-activo p-4">' +

        '<summary class="cursor-pointer font-bold">' +
        f.q +
        '</summary>' +

        '<p class="mt-2 text-sm">' +
        esc(f.a) +
        '</p>' +

        '</details>'

    ).join('');

}


/* =========================================================
   9. ASISTENTE DE PREGUNTAS FRECUENTES
   ========================================================= */


/* ---------------------------------------------------------
   9.1. Normalizar texto
   --------------------------------------------------------- */

// Convertir texto a minúsculas y eliminar tildes
const norm = t =>
    t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');


/* ---------------------------------------------------------
   9.2. Buscar respuesta
   --------------------------------------------------------- */

function responder(txt) {

    const t = norm(txt);

    // Buscar si el usuario menciona un shopping
    const shop = SHOPS.find(s =>
        t.includes(norm(s.name).split(' ').pop()) ||
        t.includes(norm(s.name))
    );

    // Buscar la pregunta que coincide mejor
    let mejor = null;
    let max = 0;

    FAQ.forEach(f => {

        const sc = f.k.filter(k => t.includes(norm(k))).length;

        if (sc > max) {

            max = sc;
            mejor = f;

        }

    });


    // Responder horarios específicos
    if (shop && max && /horario|hora|abre|cierra/.test(t)) {

        return shop.name + ': ' + shop.hours;

    }


    // Responder ubicaciones específicas
    if (shop && max && /donde|direccion|queda|ubicacion/.test(t)) {

        return shop.name + ': ' + shop.addr + '.';

    }


    // Responder pregunta frecuente
    if (mejor) {

        return mejor.a;

    }


    // Si solamente menciona un shopping
    if (shop) {

        return shop.name +
            ' queda en ' +
            shop.addr +
            '. ' +
            shop.hours +
            ' Más detalles en su página.';

    }


    // Respuesta por defecto
    return 'No tengo esa información todavía. Probá con horarios, ubicación, transporte, cine, descuentos o precios, o escribinos desde el formulario de contacto.';

}


/* ---------------------------------------------------------
   9.3. Configuración del chat
   --------------------------------------------------------- */

const cb = $('#chat-btn');

if (cb) {

    const log = $('#chat-log');
    const inp = $('#chat-in');
    const box = $('#chat');


    // Agregar mensaje al chat
    const add = (t, me) => {

        log.insertAdjacentHTML(

            'beforeend',

            '<p class="' +
            (me ? 'ml-8 bg-activo' : 'mr-8 bg-beige') +
            ' rounded-xl px-3 py-2">' +
            esc(t) +
            '</p>'

        );

        // Desplazar chat hacia el último mensaje
        log.scrollTop = log.scrollHeight;

    };


    // Enviar mensaje del usuario
    const enviar = t => {

        t = t.trim();

        // No enviar mensajes vacíos
        if (!t) return;

        // Mostrar mensaje del usuario
        add(t, true);

        // Mostrar respuesta del asistente
        setTimeout(() => add(responder(t), false), 250);

        // Limpiar campo de texto
        inp.value = '';

    };


    // Mensaje inicial del asistente
    add(
        '¡Hola! Soy el asistente de Shoppings Ride. Preguntame por horarios, ubicación, transporte, cine o descuentos.',
        false
    );


    /* -----------------------------------------------------
       9.4. Preguntas sugeridas
       ----------------------------------------------------- */

    $('#chat-sug').innerHTML =

        ['¿Horarios?', '¿Cómo llego en subte?', '¿Hay descuentos?'].map(s =>

            '<button type="button" class="rounded-full border border-btn px-3 py-1 text-xs">' +
            s +
            '</button>'

        ).join('');


    // Detectar clic en preguntas sugeridas
    $$('#chat-sug button').forEach(b => {

        b.addEventListener('click', () => {

            enviar(b.textContent);

        });

    });


    /* -----------------------------------------------------
       9.5. Abrir y cerrar chat
       ----------------------------------------------------- */

    cb.addEventListener('click', () => {

        const o = box.classList.toggle('hidden') === false;

        cb.setAttribute('aria-expanded', o);

        // Llevar el foco al campo cuando se abre
        if (o) {
            inp.focus();
        }

    });


    /* -----------------------------------------------------
       9.6. Botón de enviar
       ----------------------------------------------------- */

    $('#chat-send').addEventListener('click', () => {

        enviar(inp.value);

    });


    /* -----------------------------------------------------
       9.7. Eventos del teclado
       ----------------------------------------------------- */

    inp.addEventListener('keydown', e => {

        // Enviar con Enter
        if (e.key === 'Enter') {

            enviar(inp.value);

        }

        // Cerrar con Escape
        if (e.key === 'Escape') {

            box.classList.add('hidden');

            cb.setAttribute('aria-expanded', false);

            cb.focus();

        }

    });

}


