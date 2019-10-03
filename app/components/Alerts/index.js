import React from 'react';
import _Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Swal = withReactContent(_Swal);

export function ServerError() {
  Swal.fire({
    title: 'Algo salió mal',
    text: 'Algo se rompió allá adentro. Inténtelo de nuevo.',
    type: 'error',
    showConfirmButton: true,
  });
  return <div />;
}

export function WaitingLogin() {
  Swal.fire({
    title: 'Creando sesión... ',
    text: 'Esto puede tardar un momento',
    allowEscapeKey: false,
    allowOutsideClick: false,
    onOpen: () => {
      Swal.showLoading();
    },
  });
  return <div />;
}
