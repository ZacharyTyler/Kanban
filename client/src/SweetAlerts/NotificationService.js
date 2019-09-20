import Swal from "sweetalert2"


export default class NotificationService {
  static toastAdded(text = "", title = "Item Created", timer = 5500) {
    Swal.fire({
      title,
      text,
      type: "success",
      timer,
      showConfirmButton: false,
      position: "top-right",
      toast: true
    });
  }

  static toast(text = "", title = "Logged Out", timer = 5500) {
    Swal.fire({
      title,
      text,
      type: "success",
      timer,
      showConfirmButton: false,
      position: "top-right",
      toast: true
    });
  }

  static toastError(error) {
    if (error.isAxiosError) {
      error.message = error.response.data
    }

    Swal.fire({
      title: "A Notification",
      text: error.message,
      type: "error",
      timer: 8500,
      showConfirmButton: false,
      position: "top-right",
      toast: true
    });
  }



  static delete() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-dark',
        cancelButton: 'btn btn-dark'
      },
      buttonsStyling: false

    })
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: 'black',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Delete!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled!',
          'Delete Cancelled',
          'error'
        )
      }
    })
  }


}
