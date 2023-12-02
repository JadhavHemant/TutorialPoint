// import React from 'react'

// const StudentTutorial = () => {
//   return (
//     <div>
//       StudentTutorial
//     </div>
//   )
// }

// export default StudentTutorial

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const StudentTutorial = () => {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/static/csvfiles/selected-services-june-2023-quarter-csv.csv`)
      .then(response => {
        Papa.parse(response.data, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setCsvData(result.data);
          },
          error: (error) => console.error('Error parsing CSV:', error),
        });
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, []);

  return (
    <div>
      <h1>CSV Data</h1>
      <pre>{JSON.stringify(csvData, null, 2)}</pre>
      {/* Render your data in your React component as needed */}
    </div>
  );
};

export default StudentTutorial;

