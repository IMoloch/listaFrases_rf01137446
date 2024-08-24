const { ref, createApp, computed } = Vue;

createApp({
    setup() {
        const listaFrases = ref([
            {
                frase: "El código es poesía",
                autor: "Automattic"
            },
            {
                frase: "Un error es una oportunidad para aprender",
                autor: "Robert C. Martin"
            },
            {
                frase: "La programación es como la cocina: sigue la receta, pero también improvisa",
                autor: "John Romero"
            },
            {
                frase: "El código limpio es el código que se mantiene limpio",
                autor: "Martin Fowler"
            },
            {
                frase: "No reinventes la rueda; reutiliza el código",
                autor: "Solomon Hykes"
            },
        ])

        const nuevaFrase = ref('');
        const nuevoAutor = ref('');

        const agregarFrase = () => {
            if (!nuevaFrase.value.trim() || !nuevoAutor.value.trim()) {
                return null
            }
            listaFrases.value.unshift(
                {
                    frase: nuevaFrase.value,
                    autor: nuevoAutor.value,
                }
            );
            nuevaFrase.value = '';
            nuevoAutor.value = '';
            return;
        }

        const eliminarFrase = (index) => {
            const confirmarEliminar = confirm("Eliminar frase?")
            confirmarEliminar ? listaFrases.value.splice(index, 1) : null
        }

        return ({
            listaFrases,
            nuevaFrase,
            nuevoAutor,
            agregarFrase,
            eliminarFrase,
        })
    }
}).mount("#app")