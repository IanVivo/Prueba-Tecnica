// Diccionario que mapea cada número del teclado telefónico a sus letras correspondientes
// Similar a los antiguos teléfonos móviles para escribir mensajes de texto
const diccionario = {
  2: ["a", "b", "c"], // Número 2 = letras a, b, c
  3: ["d", "e", "f"], // Número 3 = letras d, e, f
  4: ["g", "h", "i"], // Número 4 = letras g, h, i
  5: ["j", "k", "l"], // Número 5 = letras j, k, l
  6: ["m", "n", "o"], // Número 6 = letras m, n, o
  7: ["p", "q", "r", "s"], // Número 7 = letras p, q, r, s
  8: ["t", "u", "v"], // Número 8 = letras t, u, v
  9: ["w", "x", "y", "z"], // Número 9 = letras w, x, y, z
};

// FUNCIÓN PRINCIPAL: Genera todas las combinaciones posibles de letras
function letterCombinations(digits) {
  // Si no hay dígitos, retorna un array vacío
  if (digits.length === 0) {
    return [];
  }

  // PASO 1: Convertir cada dígito a su array de letras correspondiente
  // Ejemplo: "23" -> [["a","b","c"], ["d","e","f"]]
  const letrasArray = digits.split("").map((d) => diccionario[d]);

  // PASO 2: ALGORITMO DE COMBINACIÓN - Usar reduce para construir progresivamente
  // Empezamos con un array que contiene un string vacío: [""]
  // Para cada grupo de letras, combinamos cada prefijo existente con cada nueva letra
  const combinacion = letrasArray.reduce(
    (acumulador, letras) =>
      // flatMap aplana el resultado de map en un solo array
      acumulador.flatMap((prefix) =>
        // Para cada letra del grupo actual, la combinamos con cada prefijo existente
        letras.map((letra) => prefix + letra)
      ),
    [""] // Valor inicial: array con string vacío
  );

  /* EXPLICACIÓN DEL ALGORITMO CON EJEMPLO "23":
   * Iteración 0: acumulador = [""]
   * Iteración 1: letras = ["a","b","c"]
   *   - "" + "a" = "a", "" + "b" = "b", "" + "c" = "c"
   *   - acumulador = ["a", "b", "c"]
   * Iteración 2: letras = ["d","e","f"]
   *   - "a" + "d" = "ad", "a" + "e" = "ae", "a" + "f" = "af"
   *   - "b" + "d" = "bd", "b" + "e" = "be", "b" + "f" = "bf"
   *   - "c" + "d" = "cd", "c" + "e" = "ce", "c" + "f" = "cf"
   *   - Resultado final: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
   */

  /* ALTERNATIVA MÁS SIMPLE CON BUCLES ANIDADOS:
   * Esta implementación es más fácil de entender y debuggear
   *
   * let combinacion = [""];
   *
   * // Para cada grupo de letras del diccionario
   * for (let letras of letrasArray) {
   *     let nuevasCombinaciones = [];
   *
   *     // Para cada combinación que ya tenemos
   *     for (let combinacionActual of combinacion) {
   *         // Para cada letra del grupo actual
   *         for (let letra of letras) {
   *             // Crear nueva combinación añadiendo la letra
   *             nuevasCombinaciones.push(combinacionActual + letra);
   *         }
   *     }
   *
   *     // Actualizar nuestras combinaciones
   *     combinacion = nuevasCombinaciones;
   * }
   *
   * EXPLICACIÓN CON EJEMPLO "23":
   * Inicio: combinacion = [""]
   *
   * Grupo 1: letras = ["a","b","c"]
   *   - "" + "a" = "a", "" + "b" = "b", "" + "c" = "c"
   *   - combinacion = ["a", "b", "c"]
   *
   * Grupo 2: letras = ["d","e","f"]
   *   - "a" + "d" = "ad", "a" + "e" = "ae", "a" + "f" = "af"
   *   - "b" + "d" = "bd", "b" + "e" = "be", "b" + "f" = "bf"
   *   - "c" + "d" = "cd", "c" + "e" = "ce", "c" + "f" = "cf"
   *   - Resultado final: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
   */

  return combinacion;
}

// FUNCIÓN DE INTERFAZ: Maneja la generación y visualización de combinaciones
function generateCombinations() {
  // Obtener referencias a los elementos HTML
  const input = document.getElementById("numbersInput").value.trim();
  const errorDiv = document.getElementById("error");
  const resultsDiv = document.getElementById("results");
  const combinationsDiv = document.getElementById("combinations");
  const countDiv = document.getElementById("count");

  // Limpiar mensajes de error previos
  errorDiv.textContent = "";

  // VALIDACIÓN 1: Verificar que hay entrada
  if (!input) {
    errorDiv.textContent = "Por favor, introduce algunos números.";
    resultsDiv.style.display = "none";
    return;
  }

  // VALIDACIÓN 2: Verificar que solo contiene números válidos (2-9)
  // Usa expresión regular para validar formato
  if (!/^[2-9]+$/.test(input)) {
    errorDiv.textContent = "Solo se permiten números del 2 al 9.";
    resultsDiv.style.display = "none";
    return;
  }

  // LLAMAR A LA FUNCIÓN PRINCIPAL para generar combinaciones
  const combinations = letterCombinations(input);

  // Verificar si se generaron combinaciones
  if (combinations.length === 0) {
    errorDiv.textContent = "No se pudieron generar combinaciones.";
    resultsDiv.style.display = "none";
    return;
  }

  // MOSTRAR RESULTADOS EN LA INTERFAZ
  // Mostrar el total de combinaciones generadas
  countDiv.textContent = `Total de combinaciones: ${combinations.length}`;
  combinationsDiv.innerHTML = "";

  // Crear un elemento HTML para cada combinación
  combinations.forEach((combination) => {
    const item = document.createElement("div");
    item.className = "combination-item";
    item.textContent = combination;
    combinationsDiv.appendChild(item);
  });

  // Hacer visible la sección de resultados
  resultsDiv.style.display = "block";
}

// EVENT LISTENER: Permitir generar combinaciones presionando Enter
document
  .getElementById("numbersInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      generateCombinations();
    }
  });

// FUNCIÓN DE LIMPIEZA: Resetear toda la interfaz
function clearInput() {
  // Limpiar el campo de entrada
  document.getElementById("numbersInput").value = "";
  // Limpiar mensajes de error
  document.getElementById("error").textContent = "";
  // Ocultar resultados
  document.getElementById("results").style.display = "none";
  // Enfocar el campo de entrada para facilitar uso
  document.getElementById("numbersInput").focus();
}
