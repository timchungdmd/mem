import React from 'react';
import { DownloadCloud, Users, DollarSign, Calendar } from 'lucide-react';

const AdminExportPage: React.FC = () => {
  // Placeholder state and handlers
  const [exporting, setExporting] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<string[]>(['members']); // Default selection

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedData(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const handleExport = () => {
    if (selectedData.length === 0) {
      alert("Please select data types to export.");
      return;
    }
    setExporting(true);
    console.log("Starting export for data types:", selectedData);
    // Simulate export process (e.g., generate a dummy CSV link)
    setTimeout(() => {
      setExporting(false);
      alert(`Export finished for ${selectedData.join(', ')} (placeholder). Download should start.`);
      // In a real app, trigger file download here
    }, 1500);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Export Data</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
        <p className="text-gray-600 mb-4">
          Select the data types you want to export. The data will be generated in CSV format.
        </p>

        <fieldset className="mb-6">
          <legend className="text-lg font-medium text-gray-900 mb-2">Data to Export:</legend>
          <div className="space-y-2">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input id="export-members" name="export-data" type="checkbox" value="members" checked={selectedData.includes('members')} onChange={handleCheckboxChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="export-members" className="font-medium text-gray-700 flex items-center"><Users size={16} className="mr-1 text-blue-500"/> Member Profiles</label>
              </div>
            </div>
             <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input id="export-payments" name="export-data" type="checkbox" value="payments" checked={selectedData.includes('payments')} onChange={handleCheckboxChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="export-payments" className="font-medium text-gray-700 flex items-center"><DollarSign size={16} className="mr-1 text-green-500"/> Payment History (Placeholder)</label>
              </div>
            </div>
             <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input id="export-events" name="export-data" type="checkbox" value="events" checked={selectedData.includes('events')} onChange={handleCheckboxChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="export-events" className="font-medium text-gray-700 flex items-center"><Calendar size={16} className="mr-1 text-purple-500"/> Event Attendance (Placeholder)</label>
              </div>
            </div>
            {/* Add more data types as needed */}
          </div>
        </fieldset>

        <div className="text-right">
          <button
            onClick={handleExport}
            disabled={selectedData.length === 0 || exporting}
            className="btn-primary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {exporting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <DownloadCloud size={18} className="mr-2" />
                Generate Export File
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

export default AdminExportPage;
