import React from 'react';

const MyComponent = () => {
    // Votre tableau de données
    let countByJuice =2
    const DATA = [
        {
            "id": "1",
            "date": "2024-04-17T17:24:00",
            "category": "Juice"
        },
        {
            "id": "2",
            "date": "2024-04-17T18:24:00",
            "category": "Juice"
        },
        {
            "id": "1",
            "date": "2024-04-17T17:24:00",
            "category": "Milk"
        },
        {
            "id": "2",
            "date": "2024-04-17T18:24:00",
            "category": "Milk"
        },
        {
            "id": "1",
            "date": "2024-04-17T17:24:00",
            "category": "Coffee"
        },
        {
            "id": "1",
            "date": "2024-04-17T17:24:00",
            "category": "MilkCoffee"
        },
        {
            "id": "2",
            "date": "2024-04-17T17:24:00",
            "category": "MilkCoffee"
        },
        {
            "id": "1",
            "date": "2024-04-17T17:24:00",
            "category": "Tai"
        }
    ];

    // Fonction pour regrouper les IDs par catégorie
    const groupIdsByCategory = () => {
        const groupedData = {};
        DATA.forEach(item => {
            if (!groupedData[item.category]) {
                groupedData[item.category] = [];
            }
            groupedData[item.category].push(item.id);
        });
        return groupedData;
    };

    // Appel de la fonction de regroupement
    const groupedIds = groupIdsByCategory();

    // Rendu des IDs par catégorie
    return (
        <div>
            {Object.keys(groupedIds).map(category => (
                <div key={category}>
                    <h3>{category}</h3>
                    <ul>
                        {groupedIds[category].map(id => (
                            <li key={id}>{id}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MyComponent;
