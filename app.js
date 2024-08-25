const { ref, createApp, computed, watch } = Vue;

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
    const mostrarMensajeError = ref(false);
    const mensajeError = computed(() => {
      if (!nuevoAutor.value && !nuevaFrase.value) return "Complete todos los campos";
      if (!nuevaFrase.value) return "Ingrese una frase";
      if (!nuevoAutor.value) return "Ingrese el autor";
    })

    const watcher = watch([nuevaFrase, nuevoAutor], () => {
      if (mostrarMensajeError) {
        if (nuevaFrase.value || nuevoAutor.value) {
          mostrarMensajeError.value = false;
        }
      }
    });

    const agregarFrase = () => {
      if (!nuevaFrase.value.trim() || !nuevoAutor.value.trim()) {
        mostrarMensajeError.value = true;
        return;
      }
      listaFrases.value.unshift({ frase: nuevaFrase.value, autor: nuevoAutor.value });
      nuevaFrase.value = '';
      nuevoAutor.value = '';
      return;
    }

    const eliminarFrase = (index) => {
      return listaFrases.value.splice(index, 1)
    }

    const editarFrase = () => {

    }

    return ({
      listaFrases,
      nuevaFrase,
      nuevoAutor,
      mostrarMensajeError,
      mensajeError,
      watcher,
      agregarFrase,
      eliminarFrase,
      editarFrase,
    })
  },
}).mount("#app")