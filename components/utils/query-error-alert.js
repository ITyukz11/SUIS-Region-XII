import React from 'react';
import Swal from 'sweetalert2';

export default function UtilsQueryErrorAlert(errorMessage) {
  Swal.fire({
    icon: 'error',
    title: 'Query Execution Error',
    text: errorMessage,
  });
}
