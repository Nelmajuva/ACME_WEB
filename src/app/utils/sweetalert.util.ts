import * as sweetalert2 from 'sweetalert2';

export class SweetAlertUtil {
  /**
   * Display an error if the server does not respond correctly.
   *
   * @returns - Void
   */
  public static showServerErrorAlert = () => {
    sweetalert2.default.fire({
      text: 'Lamentablemente, no se pudo proceder con la solicitud en este momento. Si el problema persiste después de unas horas, ponte en contacto con nuestro equipo de soporte para reci',
      title: '¡Error!',
      icon: 'error',
    });
  };

  /**
   * Display an error if the form is invalid.
   * 
   * @returns - Void
   */
  public static showFormInvalidAlert = () => {
    sweetalert2.default.fire({
      text: 'Lo sentimos, ha ocurrido un error al procesar tu solicitud. Revisa la información proporcionada e inténtalo de nuevo.',
      title: '¡Errores con el formulario!',
      icon: 'error',
    });
  }
}
