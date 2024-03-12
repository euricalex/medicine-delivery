// Main.js
import React from "react";
import axios from "axios";
import PharmacySelector from "../PharmacySelector";
import { CartContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Main() {
  const { addToCart } = React.useContext(CartContext);
  const [medicines, setMedicines] = React.useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = React.useState(
    localStorage.getItem("selectedPharmacy") || "Drugs24"
  );

  React.useEffect(() => {
    fetchData(selectedPharmacy); // Выполняем запрос с текущей аптекой
  }, [selectedPharmacy]); // Запускаем useEffect при изменении selectedPharmacy

  const fetchData = (pharmacy) => {
    axios
      .get(`http://localhost:3000/medicinies`, {
        params: { pharmacy, sortOrder: "asc" },
      })
      .then((res) => {
        setMedicines(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  };

  const handleSelectPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy); // Обновляем выбранную аптеку
    localStorage.setItem("selectedPharmacy", pharmacy); // Сохраняем в локальное хранилище
  };
  const handleOrderNow = (item) => {
    addToCart(item);
    toast.success("Medicine was added successfully!");
  };

  return (
    <div className="main-container">
      <div className="sidebar">
        <h1 className="sidebar-header">Shops</h1>
        <PharmacySelector
          onSelectPharmacy={handleSelectPharmacy}
          selectedPharmacy={selectedPharmacy}
        />{" "}
        {/* Передаем функцию обратного вызова */}
      </div>

      <div className="main-content">
        <ul className="medicine-list">
          {medicines.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.pharmacy}</p>
              <p>Manufacturer: {item.manufacturer}</p>
              <p>Dosage form: {item.dosage_form}</p>
              <p>Active substance: {item.active_substance}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <div className="order-block">
                <button
                  onClick={() => handleOrderNow(item)}
                  className="btn-order"
                >
                  Order now
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Main;
