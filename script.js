const NUMERO_WHATSAPP = "595985325687";
const ALIAS_PAGO = "6.806.534";
let productosGlobal = [];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Enlace Header WhatsApp
    const btnHeaderWS = document.getElementById("btn-whatsapp-header");
    if (btnHeaderWS) {
        btnHeaderWS.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Hola! Vengo desde el catálogo web del gimnasio y quisiera más información.")}`;
    }

    // 2. Cargar Productos JSON
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

    // 3. Asistente IA Coach CBUM
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

            if (m.includes("creatina")) {
                return "⚡ Creatina Monohidratada:\nLa creatina ayuda a aumentar la fuerza explosiva, hidratación muscular y recuperación entre series.\nDosis recomendada: 3g a 5g diarios todos los días (incluso días de descanso).\nTenemos disponible Creatina Monohidratada 300g por Gs. 180.000.";
            }
            if (m.includes("proteina") || m.includes("proteína") || m.includes("whey")) {
                return "🥤 Whey Protein (Proteína de Suero):\nIdeal para consumir post-entrenamiento o completar tus requerimientos diarios de proteína.\nAyuda a reparar las fibras musculares y ganar masa limpia.\nTenemos disponible Whey Protein 100% Pure por Gs. 220.000.";
            }
            if (m.includes("suplemento") || m.includes("suplementos") || m.includes("tomar") || m.includes("conviene")) {
                return "🔥 Recomendación de Suplementos:\nPara fuerza y volumen: Creatina Monohidratada (Gs. 180.000).\nPara recuperación y ganar músculo: Whey Protein (Gs. 220.000).\nPodés combinar ambos para mejores resultados. ¿Cuál es tu objetivo actual?";
            }

            // Dietas y Nutrición mejoradas
            if (m.includes("dieta") || m.includes("dietas") || m.includes("alimentacion") || m.includes("comer") || m.includes("nutricion")) {
                return "🥗 Asesoría Nutricional y Dieta:\n• Para un plan nutricional a medida, te recomendamos usar nuestra Calculadora Macros en la barra superior.\n• Regla básica: Priorizá proteínas magras (pollo, huevo, pescado), carbohidratos complejos (arroz, avena, batata) y grasas saludables (palta, frutos secos).";
            }

            if (m.includes("volumen") || m.includes("masa") || m.includes("aumentar")) {
                return "💪 Para Aumentar Masa Muscular (Volumen):\n1️⃣ Mantené un superávit calórico ligero (consumí más calorías de las que gastás).\n2️⃣ Entrená pesado cerca del fallo en rangos de 6 a 12 repeticiones.\n3️⃣ Consumí suficiente proteína (1.8g a 2.2g por kg de peso).\nProbá nuestra Calculadora de Macros en el menú principal.";
            }
            if (m.includes("definir") || m.includes("definicion") || m.includes("bajar") || m.includes("grasa") || m.includes("peso")) {
                return "🔥 Para Definición y Pérdida de Grasa:\n1️⃣ Mantené un déficit calórico controlado.\n2️⃣ No reduzcas el peso en los entrenamientos para preservar masa muscular.\n3️⃣ Consumí al menos 2g de proteína por kg para evitar perder músculo.";
            }

            // Entrenamientos y Rutinas mejoradas
            if (m.includes("rutina") || m.includes("rutinas") || m.includes("entreno") || m.includes("entrenamiento") || m.includes("entrenamientos") || m.includes("ejercicio")) {
                return "💪 Rutinas y Entrenamiento:\nTodos nuestros planes incluyen evaluación física inicial y rutina personalizada adaptada a tu objetivo (Hipertrofia, Pérdida de grasa o Fuerza).\nTambién contamos con servicio de Personal Trainer 1 a 1 (Gs. 350.000/mes).";
            }

            if (m.includes("ver planes") || m.includes("plan") || m.includes("planes") || m.includes("precio") || m.includes("cuanto cuesta") || m.includes("costo")) {
                return "🔥 Nuestros Planes Disponibles:\n1️⃣ Membresía Mensual — Gs. 150.000\n2️⃣ Plan Quincenal — Gs. 90.000\n3️⃣ Pase Diario — Gs. 20.000\n\nEscribí un número del 1 al 3 para ver los detalles completos de cada opción.";
            }

            if (m === "1" || m.includes("opcion 1")) return "🔥 Membresía Mensual Gym:\nInversión: Gs. 150.000\nAcceso ilimitado a musculación y cardio de Lunes a Sábados.";
            if (m === "2" || m.includes("opcion 2")) return "🏋️‍♂️ Plan Quincenal:\nInversión: Gs. 90.000\n15 días continuos con rutina personalizada de adaptación.";
            if (m === "3" || m.includes("opcion 3")) return "🎟️ Pase Diario / Day Pass:\nInversión: Gs. 20.000\nAcceso total por un día completo sin compromisos.";

            if (m.includes("pago") || m.includes("pagos") || m.includes("transferencia") || m.includes("giro") || m.includes("alias") || m.includes("cedula")) {
                return `💳 Medios de Pago Aceptados:\nAceptamos Transferencias Bancarias, Giros y Efectivo.\n\n📌 Alias / Cédula para Transferencias:\n👉 <strong class="text-yellow-400 font-bold">${ALIAS_PAGO}</strong>\n\n<button onclick="copiarAlias('${ALIAS_PAGO}', this)" class="mt-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow">📋 Copiar Alias ${ALIAS_PAGO}</button>`;
            }

            if (m.includes("horario") || m.includes("horarios") || m.includes("hora") || m.includes("abren") || m.includes("domingo") || m.includes("domingos")) {
                return "🕒 Horarios de Atención:\nLunes a Viernes: 06:00 a 21:00 hs (Horario corrido)\nSábados: 08:00 a 18:00 hs\nDomingos: Cerrado (Día de descanso muscular 😴)";
            }
            if (m.includes("donde") || m.includes("ubicacion") || m.includes("direccion")) {
                return "📍 Ubicación: Estamos ubicados en el centro de la ciudad. Tocá el botón de WhatsApp para enviarte la ubicación exacta por GPS.";
            }

            if (m.includes("hola") || m.includes("buenas") || m.includes("saludos") || m.includes("que tal")) {
                return "¡Hola fiera! Soy Coach CBUM IA. Preguntame sobre entrenamientos, suplementos (Creatina/Whey), dietas, horarios o métodos de pago.";
            }

            return `¡Excelente consulta! Como tu Coach CBUM IA, te sugiero revisar las opciones de suplementación y planes en el catálogo o escribirnos directo a WhatsApp para asesoría personalizada. 🚀`;
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

            const typingId = "typing-" + Date.now();
            chatBox.innerHTML += `
                <div id="${typingId}" class="bg-slate-800 border border-slate-700 text-yellow-400 p-3 rounded-2xl rounded-tl-none max-w-[50%] text-xs flex items-center gap-1.5">
                    <span class="animate-pulse">Coach CBUM escribiendo</span>
                    <span class="animate-bounce">...</span>
                </div>
            `;
            chatBox.scrollTop = chatBox.scrollHeight;

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

// Copiar Alias
function copiarAlias(texto, btnElement) {
    navigator.clipboard.writeText(texto).then(() => {
        const originalText = btnElement.innerHTML;
        btnElement.innerHTML = "✅ ¡Alias Copiado!";
        btnElement.classList.replace("bg-yellow-400", "bg-emerald-400");
        setTimeout(() => {
            btnElement.innerHTML = originalText;
            btnElement.classList.replace("bg-emerald-400", "bg-yellow-400");
        }, 2000);
    });
}

// Renderizar Productos
function renderizarProductos(lista) {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.innerHTML = lista.map((prod, index) => {
        const mensajeWS = encodeURIComponent(`Hola PowerGym! Quisiera consultar sobre el producto/plan: ${prod.nombre} (${prod.precio})`);
        const urlWS = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeWS}`;
        const tagTexto = prod.tag || "POPULAR";
        const ratingTexto = prod.rating || "5.0 ★";

        return `
            <div class="gym-card rounded-2xl overflow-hidden flex flex-col justify-between transition duration-300 fade-in-up" style="animation-delay: ${index * 0.1}s">
                <div>
                    <div class="relative h-48 overflow-hidden">
                        <img src="${prod.imagen}" alt="${prod.nombre}" class="w-full h-full object-cover transition duration-500 hover:scale-105">
                        
                        <span class="absolute top-3 right-3 bg-yellow-400 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                            ${tagTexto}
                        </span>

                        <span class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-yellow-400 font-bold text-[10px] px-2.5 py-1 rounded-full shadow border border-slate-700">
                            ${ratingTexto}
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

// Filtrar Productos
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

// Modal Calculadora de Macronutrientes Avanzada
function toggleModalCalculadora() {
    const modal = document.getElementById("modal-calculadora");
    if (modal) modal.classList.toggle("hidden");
}

function calcularProteina() {
    const edad = parseFloat(document.getElementById("calc-edad").value);
    const sexo = document.getElementById("calc-sexo").value;
    const peso = parseFloat(document.getElementById("calc-peso").value);
    const altura = parseFloat(document.getElementById("calc-altura").value);
    const grasa = parseFloat(document.getElementById("calc-grasa").value);
    const objetivo = document.getElementById("calc-objetivo").value;
    const resultadoDiv = document.getElementById("calc-resultado");

    if (!peso || peso <= 0 || !altura || altura <= 0 || !edad || edad <= 0) {
        resultadoDiv.classList.remove("hidden");
        resultadoDiv.innerHTML = `<p class="text-red-400 font-bold">Por favor, completá los campos de Peso, Altura y Edad correctamente.</p>`;
        return;
    }

    let bmr = 0;

    if (grasa && grasa > 0 && grasa < 60) {
        const masaMagra = peso * (1 - (grasa / 100));
        bmr = 370 + (21.6 * masaMagra);
    } else {
        if (sexo === "hombre") {
            bmr = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
        } else {
            bmr = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
        }
    }

    let tdee = bmr * 1.45;
    let factorProteina = 2.0;

    if (objetivo === "hipertrofia") {
        tdee += 350;
        factorProteina = 2.0;
    } else if (objetivo === "definicion") {
        tdee -= 450;
        factorProteina = 2.2;
    } else {
        factorProteina = 1.8;
    }

    const caloriasFinales = Math.round(tdee);
    const proteinaGramos = Math.round(peso * factorProteina);
    const grasasGramos = Math.round(peso * 0.9);
    
    const caloriasProteinaGrasa = (proteinaGramos * 4) + (grasasGramos * 9);
    const carbohidratosGramos = Math.max(50, Math.round((caloriasFinales - caloriasProteinaGrasa) / 4));

    resultadoDiv.classList.remove("hidden");
    resultadoDiv.innerHTML = `
        <div class="space-y-1 border-b border-slate-800 pb-2 mb-2">
            <span class="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Meta Diaria Personalizada</span>
            <p class="text-2xl font-black text-yellow-400">${caloriasFinales} <span class="text-xs font-normal text-slate-300">kcal / día</span></p>
            <p class="text-[10px] text-slate-500">Tasa Metabólica Basal (BMR): ${Math.round(bmr)} kcal</p>
        </div>
        <div class="grid grid-cols-3 gap-2 text-center">
            <div class="bg-slate-900 border border-slate-800 p-2 rounded-lg">
                <span class="block text-[10px] text-slate-400 font-bold">Proteínas</span>
                <span class="text-sm font-black text-emerald-400">${proteinaGramos}g</span>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-2 rounded-lg">
                <span class="block text-[10px] text-slate-400 font-bold">Carbos</span>
                <span class="text-sm font-black text-yellow-400">${carbohidratosGramos}g</span>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-2 rounded-lg">
                <span class="block text-[10px] text-slate-400 font-bold">Grasas</span>
                <span class="text-sm font-black text-amber-500">${grasasGramos}g</span>
            </div>
        </div>
        <p class="text-[11px] text-slate-400 mt-2">💡 Podés cubrir tu cuota de proteína diaria con Whey Protein de nuestro catálogo o consultar a Coach CBUM IA.</p>
    `;
}

// Compartir Enlace Público (Actualizado con la nueva URL de GitHub sin tesis)
function compartirCatalogo() {
    const urlPublica = "https://lucas-maciel19.github.io/catalogo-powergym/";
    const texto = "¡Mirá el catálogo oficial de PowerGym con planes, suplementos y Coach IA en vivo! 🔥";
    
    if (navigator.share) {
        navigator.share({ title: 'PowerGym', text: texto, url: urlPublica });
    } else {
        navigator.clipboard.writeText(urlPublica).then(() => {
            alert("¡Enlace público copiado al portapapeles! 🚀\n" + urlPublica);
        });
    }
}