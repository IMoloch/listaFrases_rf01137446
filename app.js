const { ref, createApp, computed, watch, onMounted } = Vue;

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
        frase: "La programación es como la cocina; sigue la receta, pero también improvisa",
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
    // Declaracion de variables reactivas a utilizar
    const nuevaFrase = ref('');
    const nuevoAutor = ref('');
    const mostrarMensajeError = ref(false);

    //Observador que espera cambios en el formulario de nueva frase
    watch([nuevaFrase, nuevoAutor], () => {
      if (mostrarMensajeError) {
        if (nuevaFrase.value || nuevoAutor.value) {
          mostrarMensajeError.value = false;
        }
      }
    });

    // FUNCION QUE VALIDA QUE NO ESTEN LOS CAMPOS VACIOS
    function isEmpty(stringValidar) {
      if (!stringValidar.trim()) {
        return true
      }
      return false
    }

    // FUNCION AGREGAR UNA FRASE AL ARRAY
    const agregarFrase = () => {
      if (isEmpty(nuevaFrase.value) || isEmpty(nuevoAutor.value)) {
        mostrarMensajeError.value = true;
        return;
      }
      listaFrases.value.unshift({ frase: nuevaFrase.value, autor: nuevoAutor.value });
      nuevaFrase.value = '';
      nuevoAutor.value = '';
      return;
    }

    // FUNCION ELIMINAR UNA FRASE DEL ARRAY
    const eliminarFrase = (index) => {
      return listaFrases.value.splice(index, 1)
    }

    // VARIABLES REACTIVAS Y FUNCIONES DE LA MODAL
    const fraseEditada = ref('');
    const autorEditado = ref('');
    const indexEditar = ref()
    const mensajeErrorModal = ref(false);

    // FUNCION QUE ABRE EL MODAL Y LE ASIGNA LOS VALORES CORRECTOS
    const abrirModal = (frase, index) => {
      fraseEditada.value = frase.frase
      autorEditado.value = frase.autor
      indexEditar.value = index
      const editModal = new bootstrap.Modal(document.getElementById('editModal'));
      editModal.show();
    };

    // FUNCION QUE EDITA LOS DATOS DEL ARRAY
    const editarFrase = () => {
      if (isEmpty(fraseEditada.value) || isEmpty(autorEditado.value)) {
        mensajeErrorModal.value = true
        return
      }
      listaFrases.value.splice(indexEditar.value, 1, { frase: fraseEditada.value, autor: autorEditado.value })
      mensajeErrorModal.value = false
      const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
      editModal.hide();
    };

    return ({
      listaFrases,
      nuevaFrase,
      nuevoAutor,
      mostrarMensajeError,
      agregarFrase,
      eliminarFrase,
      fraseEditada,
      autorEditado,
      mensajeErrorModal,
      abrirModal,
      editarFrase,
    })
  },

}).mount("#app")