import React from 'react'
import Swal from 'sweetalert2';

export default function UtilsErrorAlert(title,text) {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'OK',
    confirmButtonColor: '#053B50',
  });
}
