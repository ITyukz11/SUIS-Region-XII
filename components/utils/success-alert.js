import React from 'react'
import Swal from 'sweetalert2';

export default function UtilsSuccessAlert(title, text) {
    Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#053B50',
      });
}
