import React from 'react';
import { UploadCloud, FileText } from 'lucide-react';

const AdminImportPage: React.FC = () => {
  // Placeholder state and handlers
  const [file, setFile] = React.useState<File | null>(null);
  const [importing, setImporting] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleImport = () => {
    if (!file) {
      alert("Please select a file to import.");
      return;
    }
    setImporting(true);
    console.log("Starting import for file:", file.name);
    // Simulate import process
    setTimeout(() => {
      setImporting(false);
      alert(`Import finished for ${file.name} (placeholder). Check logs for details.`);
      setFile(null); // Reset file input visually (actual input needs reset too)
      // Reset the file input element if possible
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    }, 2000);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Import Member Data</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
        <p className="text-gray-600 mb-4">
          Upload a CSV file containing member data. Ensure the file follows the required format (provide link to template/docs later).
        </p>

        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center"
          >
             <UploadCloud size={48} className="text-gray-400 mb-2" />
            <span>{file ? file.name : 'Upload a file'}</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv" />
          </label>
           {file && <p className="text-xs text-gray-500 mt-1">Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)</p>}
        </div>

        <div className="text-right">
          <button
            onClick={handleImport}
            disabled={!file || importing}
            className="btn-primary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {importing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Importing...
              </>
            ) : (
              <>
                <FileText size={18} className="mr-2" />
                Start Import
              </>
            )}
          </button>
        </div>
      </div>
       {/* Helper styles */}
       <style>{`
        .btn-primary {
          padding: 0.5rem 1rem; border: 1px solid transparent; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); font-size: 0.875rem; font-weight: 500; color: white; background-color: #4f46e5; /* bg-indigo-600 */
        }
        .btn-primary:hover:not(:disabled) { background-color: #4338ca; }
       `}</style>
    </div>
  );
};

export default AdminImportPage;
