### Razonamiento y proceso seguido

Este código implementa un generador de combinaciones de letras a partir de dígitos (similar al funcionamiento de los antiguos teclados de teléfonos móviles).

1. **Definición del diccionario**  
   Se creó un objeto `diccionario` que mapea cada número (2–9) a su conjunto de letras correspondiente.

2. **Función principal: `letterCombinations`**  
   - Primero se validan los casos base (entrada vacía).  
   - Luego, se transforma la cadena de dígitos en un arreglo de arreglos de letras.  
   - Se implementaron **dos métodos para generar combinaciones**:
     - **Método con `reduce` + `flatMap`**: más compacto y declarativo, pero menos intuitivo.  
     - **Método con bucles anidados**: más fácil de entender, depurar y explicar paso a paso.  
   - Finalmente, se retorna el listado completo de combinaciones.

3. **Explicación didáctica en comentarios**  
   Se añadieron explicaciones detalladas con el ejemplo `"23"`, mostrando cómo se construyen las combinaciones en cada iteración.  
   Esto sirve tanto para comprender el algoritmo como para comparar ambas aproximaciones (funcional vs. imperativa).

4. **Interfaz de usuario (`generateCombinations`)**  
   - Validaciones de entrada (solo números del 2 al 9).  
   - Generación de resultados con la función principal.  
   - Visualización dinámica: número total de combinaciones y lista completa.

5. **Extras**  
   - Se añadió un *listener* para ejecutar con Enter.  
   - Función `clearInput` para limpiar y reiniciar la interfaz.
