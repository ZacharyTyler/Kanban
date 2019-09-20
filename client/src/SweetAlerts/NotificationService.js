import swal from "sweetalert"

export default class NotificationService {

  static toast(text = "", title = "Logged Out", timer = 5500) {
    swal.fire({
      title,
      text,
      type: "success",
      timer,
      showConfirmButton: false,
      position: "bottom-right",
      toast: true
    });
  }

  static toastError(error) {
    if (error.isAxiosError) {
      error.message = error.response.data
    }

    swal.fire({
      title: "A Notification",
      text: error.message,
      type: "error",
      timer: 8500,
      showConfirmButton: false,
      position: "top-right",
      toast: true
    });
  }

}
