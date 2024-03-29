import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ToastNotif() {

  library.add(faCircleExclamation);

  const showToast = (message) => {
    toast.style.display = "flex"
    toast.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>Invalid input, check again`;
    // successBtn.disabled = true;
    // errorBtn.disabled = true;
    // invalidBtn.disabled = true;
    
    setTimeout(() => {
      // successBtn.disabled = false;
      // errorBtn.disabled = false;
      // invalidBtn.disabled = false;
      toast.style.display = "none"
      // toast.classList.remove('error');
      // toast.classList.remove('invalid');
    },3000)
  }

  return (
    <div id="toastBox">
      <div class="toast invalid"><FontAwesomeIcon icon={faCircleExclamation} size="2x" color="orange" className='mx-6'  />Invalid input, check again</div>
    </div>  
    
  )
}