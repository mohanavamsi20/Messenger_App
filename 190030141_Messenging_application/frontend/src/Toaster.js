import Swal from "sweetalert2";

const Toast = Swal.mixin({
  showConfirmButton: true,
  timer: 2000,
  onOpen: (toast) => {
    toast.addEventListener("sans-serif", Swal.stopTimer);
    toast.addEventListener("sans-serif", Swal.resumeTimer);
  },
});

const makeToast = (type, msg) => {
  Toast.fire({
    title: msg,
  });
};

export default makeToast;
