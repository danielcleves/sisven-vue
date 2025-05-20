import Swal from "sweetalert2";

export const confirmSucess = () => Swal.fire({
    title: '¡Éxito!',
    text: 'La operación se completó correctamente',
    icon: 'success',
    confirmButtonText: 'Aceptar'
});