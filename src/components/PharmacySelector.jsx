import React from 'react';

function PharmacySelector({ onSelectPharmacy, selectedPharmacy }) {
    const handleSelectPharmacy = (pharmacy) => {
        onSelectPharmacy(pharmacy);
    };

    return (
        <ul className='shops-list'>
            <li className={`shop-item ${selectedPharmacy === 'Drugs24' ? 'selected' : ''}`} onClick={() => handleSelectPharmacy('Drugs24')}>Drugs24</li>
            <li className={`shop-item ${selectedPharmacy === 'MediCare' ? 'selected' : ''}`} onClick={() => handleSelectPharmacy('MediCare')}>MediCare</li>
            <li className={`shop-item ${selectedPharmacy === 'HealthLink' ? 'selected' : ''}`} onClick={() => handleSelectPharmacy('HealthLink')}>HealthLink</li>
            <li className={`shop-item ${selectedPharmacy === 'WellCare' ? 'selected' : ''}`} onClick={() => handleSelectPharmacy('WellCare')}>WellCare</li>
            <li className={`shop-item ${selectedPharmacy === 'Apex' ? 'selected' : ''}`} onClick={() => handleSelectPharmacy('Apex')}>Apex</li>
        </ul>
    );
}

export default PharmacySelector;
