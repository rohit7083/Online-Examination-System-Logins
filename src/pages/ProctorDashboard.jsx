import React, { useState, useEffect } from 'react';

// Loading Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center py-6">
    <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
  </div>
);

// Success Alert Component
const SuccessAlert = ({ message }) => (
  <div className="bg-green-500 text-white p-4 rounded-md mb-4">
    <strong>Success!</strong> {message}
  </div>
);

// Error Alert Component
const ErrorAlert = ({ message }) => (
  <div className="bg-red-500 text-white p-4 rounded-md mb-4">
    <strong>Error!</strong> {message}
  </div>
);

const ProctorDashboard = () => {
  const [activeStudents, setActiveStudents] = useState([]);
  const [logs, setLogs] = useState([]);
  const [suspiciousFlags, setSuspiciousFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Simulate fetching data from backend (this would be an API call in a real-world app)
  useEffect(() => {
    setTimeout(() => {
      setActiveStudents([
        { id: 1, name: 'John Doe', role: 'student', webcamUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Jane Smith', role: 'teacher', webcamUrl: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Mark Lee', role: 'proctor', webcamUrl: 'https://via.placeholder.com/150' },
      ]);
      setIsLoading(false);
    }, 2000); // Simulating a 2-second data fetch delay
  }, []);

  const handleFlagSuspicious = (studentId) => {
    setSuspiciousFlags([...suspiciousFlags, studentId]);
    setSuccessMessage(`Student ${studentId} flagged as suspicious.`);
    const newLog = `Student ${studentId} flagged as suspicious.`;
    setLogs([...logs, newLog]);
  };

  const handleEndMonitoring = (studentId) => {
    setActiveStudents(activeStudents.filter(student => student.id !== studentId));
    setSuccessMessage(`Monitoring ended for student ${studentId}.`);
    const newLog = `Monitoring ended for student ${studentId}.`;
    setLogs([...logs, newLog]);
  };

  // If there's an error
  const handleError = (message) => {
    setError(message);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">Proctor Dashboard</h2>

        {error && <ErrorAlert message={error} />}
        {successMessage && <SuccessAlert message={successMessage} />}
        
        {/* Show loading spinner if still fetching */}
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            {/* Student Webcam Feed Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
              {activeStudents.map((student) => (
                <div key={student.id} className={`relative border p-4 rounded-md ${student.role === 'student' ? 'bg-primary' : student.role === 'teacher' ? 'bg-secondary' : 'bg-yellow-400'}`}>
                  <img
                    src={student.webcamUrl}
                    alt={`Webcam feed of ${student.name}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <div className="absolute top-2 left-2 bg-black text-white px-3 py-1 rounded-full">
                    {student.name}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded-full">
                    {suspiciousFlags.includes(student.id) ? 'Flagged' : 'Active'}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleFlagSuspicious(student.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Flag Suspicious
                    </button>
                    <button
                      onClick={() => handleEndMonitoring(student.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                      End Monitoring
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Logs */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Real-Time Activity Logs</h3>
              <div className="overflow-x-auto bg-gray-100 p-4 rounded-md">
                <ul className="space-y-2">
                  {logs.map((log, index) => (
                    <li key={index} className="bg-gray-200 p-2 rounded-md">
                      {log}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProctorDashboard;
