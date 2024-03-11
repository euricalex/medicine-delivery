// Main.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PharmacySelector from './PharmacySelector';

function Main() {
    const [medicines, setMedicines] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState(localStorage.getItem('selectedPharmacy') || 'Drugs24');
    

    useEffect(() => {
        fetchData(selectedPharmacy); // Выполняем запрос с текущей аптекой
    }, [selectedPharmacy]); // Запускаем useEffect при изменении selectedPharmacy

    const fetchData = (pharmacy) => {
        axios.get(`mongodb-api-two.vercel.app/medicinies`, { params: { pharmacy,  sortOrder: 'asc'  } })
            .then((res) => {
                setMedicines(res.data);
            }).catch((err) => {
                console.error('Error fetching data', err);
            });
    };

    const handleSelectPharmacy = (pharmacy) => {
        setSelectedPharmacy(pharmacy); // Обновляем выбранную аптеку
        localStorage.setItem('selectedPharmacy', pharmacy); // Сохраняем в локальное хранилище
    
    };
  
    return (
        <div className='main-container'>
            <div className="sidebar">
                <h1 className='sidebar-header'>Shops</h1>
                <PharmacySelector onSelectPharmacy={handleSelectPharmacy} selectedPharmacy={selectedPharmacy}/> {/* Передаем функцию обратного вызова */}
            </div>

            <div className='main-content'>
                <ul className="medicine-list">
                    {medicines.map(item => (
                        <li key={item.id}>
                            <h2>{item.name}</h2>
                            <p>{item.pharmacy}</p>
                            <p>Manufacturer: {item.manufacturer}</p>
                            <p>Dosage form: {item.dosage_form}</p>
                            <p>Active substance: {item.active_substance}</p>
                            <p>Price: {item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <div className='order-block'>
                                <button className='btn-order'>Order now</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Main;
