import moment from "moment";
import axios from "axios";
import { useState } from "react";
import ToastNotif from "./toastNotif";

export default function AddPayment({ inputValue, id, setdisabled }) {
  const [errorMessage, setErrorMessage] = useState("");
  const inputThing = document.getElementById(id);
  
  const handleAddPayMe = async (e) => {
    const toastBox = document.querySelector('.toast');
    e.preventDefault();
    if (inputValue === "" || inputValue <= 0) {
      setErrorMessage("Invalid input, check again");
      toastBox.style.display = "flex"
      inputThing.value = ''
      setTimeout(() => {
        setErrorMessage("");
        toastBox.style.display = "none"
      }, 3000);
      return;
    }
    try {
      const newData = {
        cost: Number(inputValue),
        date: moment().format("DD-MM-YYYY"),
      };
      const response = await axios.put(`/api/members/${id}`, newData, {
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response) {
        throw new Error("Failed to update topic");
      }

      // Reload the page after successful addition
      window.location.reload();

      console.log("Payment added successfully:", response.data);
    } catch (error) {
      console.error("Failed to add data to array:", error);
    }
  };

  return (
    <>
      {errorMessage && (
        // <div className="toast">
        //   <i className="fa-solid fa-circle-exclamation"></i>
        //   {errorMessage}
        // </div>
        <ToastNotif />
      )}
      <button
        className="bg-white hover:bg-gray-300 font-semibold md:text-base text-sm py-2 px-4 border border-gray-400 rounded-lg shadow"
        onClick={(e) => handleAddPayMe(e)}
        disabled={setdisabled} // Set disabled attribute based on the prop
      >
        Add
      </button>
    </>
  );
}
