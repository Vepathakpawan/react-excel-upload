import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";
import "../src/Assets/style.css";
function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div>
      <div className="input-wrapper">   
          <input
        type="file" className="choose-input" id="btn"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      </div>
 

      <table class="table container">
        <thead>
          <tr>
            <th scope="col">ChildPartNumber</th>
            <th scope="col">ChildPartDescription</th>
            <th scope="col">itemReferenceNumber</th>
            <th scope="col">QuantityProduction</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.ChildPartNumber}>
              <td>{d.ChildPartNumber}</td>
              <td>{d.ChildPartDescription}</td>
              <td className="text-right" >{d.itemReferenceNumber}</td>
              <td className="text-right">{d.QuantityProduction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;