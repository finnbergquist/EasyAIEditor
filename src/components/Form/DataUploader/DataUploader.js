import { Upload } from "lucide-react";
import React, { useState } from "react";
import Papa from 'papaparse';

function DataUploader({form, setForm}) {
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data.slice(0, 10));
        },
      });
    } else {
      setFileName("");
      setData([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <label
        htmlFor="csv-upload"
        className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Upload your CSV file" >
        <Upload className="mr-2" />
        Upload CSV
      </label>
      <input
        id="csv-upload"
        type="file"
        className="hidden"
        accept=".csv"
        onChange={handleFileChange}
        aria-label="File upload input" />
      {fileName && (
        <div className="mt-2 text-sm text-gray-600">
          Selected file: {fileName}
        </div>
      )}
      {data.length > 0 && (
        <table className="table-auto rounded-lg mt-4">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, index) => (
                <th key={index} className="px-4 py-2 font-bold">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.entries(row).map(([key, cell], cellIndex) => (
                  <td key={cellIndex} className={`border px-4 py-2 ${form.customerDataValues.includes(key) ? 'bg-yellow-200' : ''}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default DataUploader;