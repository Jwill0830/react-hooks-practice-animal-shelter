import React, { useState } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const [error, setError] = useState(null);

  const onChangeType = (type) => {
    setFilters({ type: type });
  };

  const onFindPetsClick = async () => {
    try {
      let endpoint = "/pets";
      if (filters.type !== "all") {
        endpoint += `?type=${filters.type}`;
      }

      const response = await fetch(`http://localhost:3001${endpoint}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPets(data);
    } catch (err) {
      setError("Failed to fetch pets. Please try again.");
      console.error("Fetch error: ", err);
    }
  };
  const handleAdoptPet = (petId) => {
    const updatedPets = pets.map(pet => 
      pet.id === petId ? { ...pet, isAdopted: true } : pet
    );
    setPets(updatedPets);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      {error && <div className="ui red message">{error}</div>}
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
          <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
