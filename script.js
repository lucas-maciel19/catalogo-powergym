const NUMERO_WHATSAPP = "595985325687";
const ALIAS_PAGO = "6.806.534";
let productosGlobal = [];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Configurar enlace del Header de WhatsApp
    const btnHeaderWS = document.getElementById("btn-whatsapp-header");
    if (btnHeaderWS) {
        btnHeaderWS.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Hola! Vengo desde el catálogo web del gimnasio y quisiera más información.")}`;
    }

    // 2. Cargar y renderizar los productos desde productos.json
    fetch('productos.json')
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar productos.json");
            return response.json();
        })
        .then(productos => {
            productosGlobal = productos;
            renderizarProductos(productosGlobal);
        })
        .catch(err => {
            console.error("Error cargando productos.json:", err);
            const contenedor = document.getElementById("contenedor-productos");
            if (contenedor) {
                contenedor.innerHTML = `<p class="text-red-400 text-center col-span-3 font-semibold py-8">⚠️ Error al cargar los productos.</p>`;
            }
        });

    // 3. Asistente IA Fitness Completo
    const btnIaToggle = document.getElementById("btn-ia-toggle");
    const btnIaClose = document.getElementById("btn-ia-close");
    const modalIa = document.getElementById("modal-ia");
    const iaInput = document.getElementById("ia-input");
    const iaSend = document.getElementById("ia-send");
    const chatBox = document.getElementById("chat-box");

    if (btnIaToggle && modalIa) {
        btnIaToggle.addEventListener("click", () => modalIa.classList.toggle("hidden"));
        btnIaClose.addEventListener("click", () => modalIa.classList.add("hidden"));

        function responderIA(mensajeUsuario) {
            const m = mensajeUsuario.toLowerCase().trim();

            // Detección de Rutinas y Entrenamiento
            if (m.includes("rutina") || m.includes("rutinas") || m.includes("entreno") || m.includes("ejercicio")) {
                return "💪 Rutinas & Entrenamiento:\n• Todos nuestros planes incluyen evaluación física inicial y rutina personalizada adaptada a tu objetivo (Hipertrofia, Pérdida de grasa o Fuerza).\n• También contamos con servicio de Personal Trainer 1 a 1.";
            }

            // Detección de Ver Planes / Precios
            if (m.includes("ver planes") || m.includes("plan") || m.includes("planes") || m.includes("precio") || m.includes("cuanto cuesta") || m.includes("costo")) {
                return "🔥 Nuestros Planes Disponibles:\n1️⃣ Membresía Mensual — Gs. 150.000\n2️⃣ Plan Quincenal — Gs. 90.000\n3️⃣ Pase Diario — Gs. 20.000\n\nEscribí un número del 1 al 3 para ver los detalles completos de cada opción.";
            }

            // Detección por Opciones 1-6
            if (m === "1" || m.includes("opcion 1") || m.includes("opción 1")) {
                return "🔥 Membresía Mensual Gym:\n• Inversión: Gs. 150.000\n• Beneficios: Acceso ilimitado a musculación y cardio de Lunes a Sábados.\n\n¡Hacé clic en 'Consultar' para activar tu pase por WhatsApp!";
            }
            if (m === "2" || m.includes("opcion 2") || m.includes("opción 2")) {
                return "🏋️‍♂️ Plan Quincenal:\n• Inversión: Gs. 90.000\n• Beneficios: 15 días continuos con rutina personalizada de adaptación.";
            }
            if (m === "3" || m.includes("opcion 3") || m.includes("opción 3")) {
                return "🎟️ Pase Diario / Day Pass:\n• Inversión: Gs. 20.000\n• Beneficios: Acceso total por un día completo sin compromisos.";
            }
            if (m === "4" || m.includes("opcion 4") || m.includes("opción 4")) {
                return "🥤 Suplemento Proteico Whey:\n• Inversión: Gs. 220.000\n• Uso: Recuperación muscular acelerada post-entreno.";
            }
            if (m === "5" || m.includes("opcion 5") || m.includes("opción 5")) {
                return "⚡ Creatina Monohidratada 300g:\n• Inversión: Gs. 180.000\n• Beneficios: Aumento directo de fuerza y potencia.";
            }
            if (m === "6" || m.includes("opcion 6") || m.includes("opción 6")) {
                return "👤 Personal Trainer (Mes):\n• Inversión: Gs. 350.000\n• Beneficios: Acompañamiento 1 a 1 enfocado 100% en tus metas.";
            }

            // Detección de Pagos con Alias y Botón Interactivo para Copiar
            if (m.includes("pago") || m.includes("pagos") || m.includes("tarjeta") || m.includes("transferencia") || m.includes("giro") || m.includes("alias") || m.includes("cedula")) {
                return `💳 Medios de Pago Aceptados:\nAceptamos Transferencias Bancarias, Giros y Efectivo.\n\n📌 Alias / Cédula para Transferencias:\n👉 <strong class="text-yellow-400 font-bold">${ALIAS_PAGO}</strong>\n\n<button onclick="copiarAlias('${ALIAS_PAGO}', this)" class="mt-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow">📋 Copiar Alias ${ALIAS_PAGO}</button>`;
            }

            // Respuestas generales
            if (m.includes("horario") || m.includes("horarios") || m.includes("hora") || m.includes("abren")) {
                return "🕒 Horarios de Atención:\n• Lunes a Viernes: 06:00 a 21:00 hs (Horario corrido)\n• Sábados: 08:00 a 18:00 hs\n• Domingo: Cerrado.";
            }
            if (m.includes("donde") || m.includes("ubicacion") || m.includes("direccion")) {
                return "📍 Ubicación: Estamos ubicados en el centro de la ciudad. Tocá el botón de WhatsApp para enviarte la ubicación exacta.";
            }
            if (m.includes("hola") || m.includes("buenas") || m.includes("saludos")) {
                return "¡Hola fiera!  Soy Coach CBUM IA. Escribime qué plan o producto buscás o enviá un número del 1 al 6.";
            }

            return "¡Excelente consulta! Para más detalles o confirmación de cupos, escribinos directo por WhatsApp con el botón superior. 🚀";
        }

        function enviarMensaje(textoPersonalizado = null) {
            const texto = textoPersonalizado || iaInput.value.trim();
            if (!texto) return;

            // Mensaje del Usuario
            chatBox.innerHTML += `
                <div class="bg-yellow-400 text-slate-950 font-semibold p-3 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-xs shadow">
                    ${texto}
                </div>
            `;
            if (!textoPersonalizado) iaInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;

            // Indicador "Escribiendo..."
            const typingId = "typing-" + Date.now();
            chatBox.innerHTML += `
                <div id="${typingId}" class="bg-slate-800 border border-slate-700 text-yellow-400 p-3 rounded-2xl rounded-tl-none max-w-[48%] text-xs flex items-center gap-1.5">
                    <span class="animate-pulse">Coach CBUM escribiendo</span>
                    <span class="animate-bounce">...</span>
                </div>
            `;
            chatBox.scrollTop = chatBox.scrollHeight;

            // Respuesta con Delay simulado
            setTimeout(() => {
                const typingElem = document.getElementById(typingId);
                if (typingElem) typingElem.remove();

                const respuestaText = responderIA(texto).replace(/\n/g, '<br>');
                chatBox.innerHTML += `
                    <div class="bg-slate-800 border border-slate-700 text-slate-200 p-3 rounded-2xl rounded-tl-none max-w-[88%] leading-relaxed shadow-sm">
                        ${respuestaText}
                    </div>
                `;
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 600);
        }

        if (iaSend) iaSend.addEventListener("click", () => enviarMensaje());
        if (iaInput) {
            iaInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") enviarMensaje();
            });
        }

        document.querySelectorAll(".chip-pregunta").forEach(chip => {
            chip.addEventListener("click", () => {
                const pregunta = chip.textContent.trim();
                enviarMensaje(pregunta);
            });
        });
    }
});

// Función Global para Copiar Alias
function copiarAlias(texto, btnElement) {
    navigator.clipboard.writeText(texto).then(() => {
        const originalText = btnElement.innerHTML;
        btnElement.innerHTML = "✅ ¡Alias Copiado!";
        btnElement.classList.replace("bg-yellow-400", "bg-emerald-400");
        setTimeout(() => {
            btnElement.innerHTML = originalText;
            btnElement.classList.replace("bg-emerald-400", "bg-yellow-400");
        }, 2000);
    }).catch(err => {
        console.error("Error al copiar:", err);
    });
}

// Función de Renderizado de Productos
function renderizarProductos(lista) {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.innerHTML = lista.map(prod => {
        const mensajeWS = encodeURIComponent(`Hola PowerGym! Quisiera consultar sobre el producto/plan: ${prod.nombre} (${prod.precio})`);
        const urlWS = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeWS}`;

        return `
            <div class="gym-card rounded-2xl overflow-hidden flex flex-col justify-between transition duration-300">
                <div>
                    <div class="relative h-48 overflow-hidden">
                        <img src="${prod.imagen}" alt="${prod.nombre}" class="w-full h-full object-cover transition duration-500 hover:scale-105">
                        <span class="absolute top-3 right-3 bg-yellow-400 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
                            Popular
                        </span>
                    </div>
                    <div class="p-5">
                        <h3 class="text-xl font-bold text-white mb-2 uppercase tracking-wide">${prod.nombre}</h3>
                        <p class="text-slate-400 text-xs leading-relaxed mb-4">${prod.descripcion}</p>
                    </div>
                </div>
                <div class="p-5 pt-0 border-t border-slate-800/80 mt-auto">
                    <div class="flex items-center justify-between pt-4">
                        <div>
                            <span class="text-[10px] text-slate-500 uppercase tracking-widest block">Inversión</span>
                            <span class="text-xl font-black text-yellow-400">${prod.precio}</span>
                        </div>
                        <a href="${urlWS}" target="_blank" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-500/10">
                            <span>Consultar</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Función para Filtrar Productos en Pestañas
function filtrarProductos(categoria) {
    document.querySelectorAll(".btn-filtro").forEach(btn => {
        btn.classList.remove("bg-yellow-400", "text-slate-950");
        btn.classList.add("text-slate-400");
    });
    event.target.classList.add("bg-yellow-400", "text-slate-950");
    event.target.classList.remove("text-slate-400");

    if (categoria === 'todos') {
        renderizarProductos(productosGlobal);
    } else if (categoria === 'planes') {
        renderizarProductos(productosGlobal.slice(0, 3));
    } else if (categoria === 'suplementos') {
        renderizarProductos(productosGlobal.slice(3, 6));
    }
}