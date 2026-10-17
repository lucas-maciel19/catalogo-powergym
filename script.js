const NUMERO_WHATSAPP = "595985325687";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Configurar enlace del Header de WhatsApp
    const btnHeaderWS = document.getElementById("btn-whatsapp-header");
    if (btnHeaderWS) {
        btnHeaderWS.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Hola! Vengo desde el catálogo web del gimnasio y quisiera más información.")}`;
    }

    // 2. Cargar y renderizar los productos desde productos.json
    fetch('productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar productos.json");
            }
            return response.json();
        })
        .then(productos => {
            const contenedor = document.getElementById("contenedor-productos");
            if (!contenedor) return;

            contenedor.innerHTML = productos.map(prod => {
                const mensajeWS = encodeURIComponent(`Hola PowerGym! Quisiera consultar sobre el producto/plan: ${prod.nombre} (${prod.precio})`);
                const urlWS = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeWS}`;

                return `
                    <div class="gym-card rounded-2xl overflow-hidden flex flex-col justify-between">
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
        })
        .catch(err => {
            console.error("Error cargando productos.json:", err);
            const contenedor = document.getElementById("contenedor-productos");
            if (contenedor) {
                contenedor.innerHTML = `<p class="text-red-400 text-center col-span-3 font-semibold py-8">⚠️ Error al cargar los productos. Asegurate de abrir la página desde Live Server.</p>`;
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

            // 1. Detección por Número de Opción (del 1 al 6)
            if (m === "1" || m.includes("opcion 1") || m.includes("opción 1")) {
                return "🔥 **Membresía Mensual Gym:**\n• **Inversión:** Gs. 150.000\n• **Beneficios:** Acceso ilimitado a musculación y cardio de Lunes a Sábados.\n\n¡Hacé clic en 'Consultar' en su tarjeta para activar tu pase por WhatsApp!";
            }
            if (m === "2" || m.includes("opcion 2") || m.includes("opción 2")) {
                return "🏋️‍♂️ **Plan Quincenal:**\n• **Inversión:** Gs. 90.000\n• **Beneficios:** 15 días continuos con rutina personalizada de adaptación.\n\n¿Empezamos esta semana?";
            }
            if (m === "3" || m.includes("opcion 3") || m.includes("opción 3")) {
                return "🎟️ **Pase Diario / Day Pass:**\n• **Inversión:** Gs. 20.000\n• **Beneficios:** Acceso total por un día completo sin compromisos mensuales.\n\nIdeal para entrenar de paso o probar las instalaciones.";
            }
            if (m === "4" || m.includes("opcion 4") || m.includes("opción 4")) {
                return "🥤 **Suplemento Proteico Whey:**\n• **Inversión:** Gs. 220.000\n• **Uso:** Recuperación muscular acelerada post-entreno.\n\nConsultanos disponibilidad de sabores directo al WhatsApp.";
            }
            if (m === "5" || m.includes("opcion 5") || m.includes("opción 5")) {
                return "⚡ **Creatina Monohidratada 300g:**\n• **Inversión:** Gs. 180.000\n• **Beneficios:** Aumento directo de fuerza, potencia y rendimiento pesados.\n\nProducto 100% puro y con garantía de calidad.";
            }
            if (m === "6" || m.includes("opcion 6") || m.includes("opción 6")) {
                return "👤 **Personal Trainer (Mes):**\n• **Inversión:** Gs. 350.000\n• **Beneficios:** Acompañamiento 1 a 1 enfocado 100% en tus metas personales.\n\nIncluye plan de entrenamiento y seguimiento constante.";
            }

            // 2. Detección por Palabras Clave
            if (m.includes("quincenal") || m.includes("15 dias") || m.includes("quince")) {
                return "🏋️‍♂️ **Plan Quincenal:**\n• **Precio:** Gs. 90.000\n• **Incluye:** 15 días continuos de entrenamiento + rutina inicial adaptada.\n\n¡Hacé clic en 'Consultar' en la tarjeta para mandarnos WhatsApp!";
            }
            else if (m.includes("diario") || m.includes("dia") || m.includes("day pass") || m.includes("pase")) {
                return "🎟️ **Pase Diario:** Cuesta solo Gs. 20.000 por el día completo. Podés venir en cualquier horario dentro de nuestra apertura.";
            }
            else if (m.includes("creatina") || m.includes("fuerza")) {
                return "⚡ **Creatina Monohidratada (300g):** Cuesta Gs. 180.000. Te ayuda a rendir más en tus series pesadas y acelerar la recuperación.";
            }
            else if (m.includes("personal") || m.includes("trainer") || m.includes("entrenador personal") || m.includes("1 a 1")) {
                return "👤 **Personal Trainer:** Cuesta Gs. 350.000 al mes. Tendrás un entrenador exclusivo guiando cada una de tus repeticiones y técnica.";
            }
            else if (m.includes("mensual") || m.includes("mes") || m.includes("membresia") || m.includes("membresía") || m.includes("menbresia")) {
                return "🔥 **Membresía Mensual:**\n• **Precio:** Gs. 150.000\n• **Incluye:** Acceso libre e ilimitado de lunes a sábado a todas las máquinas y pesas.\n\n¿Te gustaría inscribirte hoy?";
            }
            else if (m.includes("plan") || m.includes("planes") || m.includes("precio") || m.includes("precios") || m.includes("costo") || m.includes("cuanto") || m.includes("cuánto")) {
                return "💪 **Catálogo Completo de Servicios:**\n1. Membresía Mensual (Gs. 150.000)\n2. Plan Quincenal (Gs. 90.000)\n3. Pase Diario (Gs. 20.000)\n4. Proteína Whey (Gs. 220.000)\n5. Creatina 300g (Gs. 180.000)\n6. Personal Trainer (Gs. 350.000)\n\nRespondé con el número del **1 al 6** para darte los detalles del que prefieras.";
            }
            else if (m.includes("horario") || m.includes("hora") || m.includes("abren") || m.includes("cierran")) {
                return "🕒 **Horarios de Atención:**\n• **Lunes a Viernes:** 06:00 a 21:00 hs (Horario corrido)\n• **Sábados:** 08:00 a 18:00 hs\n• **Domingos:** Cerrado";
            }
            else if (m.includes("rutina") || m.includes("entrenar") || m.includes("ejercicio") || m.includes("instructor") || m.includes("entrenador")) {
                return "📋 **Evaluación e Instructores:**\n¡Todos los planes incluyen asesoramiento continuo por nuestros instructores en sala sin costo extra!";
            }
            else if (m.includes("pago") || m.includes("tarjeta") || m.includes("transferencia") || m.includes("giro") || m.includes("efectivo")) {
                return "💳 **Medios de Pago Aceptados:**\nAceptamos Transferencias Bancarias, Giros Tigo/Personal, Tarjetas de Débito/Crédito y Efectivo.";
            }
            else if (m.includes("donde") || m.includes("dónde") || m.includes("ubicacion") || m.includes("ubicación") || m.includes("direccion")) {
                return "📍 **Ubicación:** Estamos ubicados en el centro de la ciudad. Hacé clic en el botón verde de WhatsApp para enviarte la ubicación exacta.";
            }
            else if (m.includes("hola") || m.includes("buenas") || m.includes("que tal") || m.includes("saludos")) {
                return "¡Hola fiera! 🔥 Soy el Coach Bot IA. Escribime qué plan o producto buscás o enviá un número del **1 al 6** para mostrarte las opciones.";
            }
            else {
                return "¡Excelente consulta! Para darte una respuesta exacta sobre ese tema, escribinos directo por WhatsApp tocando el botón de arriba. 🚀";
            }
        }

        function enviarMensaje(textoPersonalizado = null) {
            const texto = textoPersonalizado || iaInput.value.trim();
            if (!texto) return;

            chatBox.innerHTML += `
                <div class="bg-yellow-400 text-slate-950 font-semibold p-3 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-xs shadow">
                    ${texto}
                </div>
            `;
            if (!textoPersonalizado) iaInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;

            setTimeout(() => {
                const respuestaText = responderIA(texto).replace(/\n/g, '<br>');
                chatBox.innerHTML += `
                    <div class="bg-slate-800 border border-slate-700 text-slate-200 p-3 rounded-2xl rounded-tl-none max-w-[88%] leading-relaxed shadow-sm">
                        ${respuestaText}
                    </div>
                `;
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 400);
        }

        if (iaSend) iaSend.addEventListener("click", () => enviarMensaje());
        if (iaInput) {
            iaInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") enviarMensaje();
            });
        }

        document.querySelectorAll(".chip-pregunta").forEach(chip => {
            chip.addEventListener("click", () => {
                const pregunta = chip.textContent.replace(/^[^\wáéíóúÁÉÍÓÚ]+/, '').trim();
                enviarMensaje(pregunta);
            });
        });
    }
});