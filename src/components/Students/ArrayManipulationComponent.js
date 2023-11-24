import React, { useState } from 'react';
import './ArrayManipulationComponent.css'; // Import your CSS file

function ArrayManipulationComponent() {
  const [elements, setElements] = useState([]);

  const handleButtonClick = (id) => {
    if (elements.includes(id)) {
      const updatedElements = elements.filter(element => element !== id);
      setElements(updatedElements);
    } else {
      setElements([...elements, id]);
    }
    };
    
    console.log(elements)

  return (
    <div>
      <button className={elements.includes(1) ? 'active-button' : 'action-button'} onClick={() => handleButtonClick(1)}>
        Button 1
      </button>
      <button className={elements.includes(2) ? 'active-button' : 'action-button'} onClick={() => handleButtonClick(2)}>
        Button 2
      </button>
      <button className={elements.includes(3) ? 'active-button' : 'action-button'} onClick={() => handleButtonClick(3)}>
        Button 3
      </button>
      <button className={elements.includes(4) ? 'active-button' : 'action-button'} onClick={() => handleButtonClick(4)}>
        Button 4
      </button>
      <button className={elements.includes(5) ? 'active-button' : 'action-button'} onClick={() => handleButtonClick(5)}>
        Button 5
      </button>
      {/* <ul>
        {elements.map((element, index) => (
          <li key={index}>Element {element}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default ArrayManipulationComponent;
