import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  
  // Dummy data for exams and results
  useEffect(() => {
    setExams([
      { id: 1, subject: 'Math', time: '2024-11-25 10:00 AM', duration: 120, status: 'available' },
      { id: 2, subject: 'History', time: '2024-11-27 01:00 PM', duration: 90, status: 'not available' },
    ]);
    
    setResults([
      { examId: 1, score: 85 },
      { examId: 2, score: 92 },
    ]);
  }, []);

  const handleStartExam = (examId) => {
    // Redirect to Exam Interface (you could create a separate exam page if needed)
    navigate(`/exam/${examId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Student Dashboard</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Upcoming Exams</h3>
          <ul className="space-y-4">
            {exams.map((exam) => (
              <li key={exam.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold">{exam.subject}</h4>
                    <p className="text-sm text-gray-600">Time: {exam.time}</p>
                    <p className="text-sm text-gray-600">Duration: {exam.duration} mins</p>
                  </div>
                  <div>
                    {exam.status === 'available' ? (
                      <button
                        onClick={() => handleStartExam(exam.id)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                      >
                        Start Exam
                      </button>
                    ) : (
                      <button
                        className="bg-gray-300 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                        disabled
                      >
                        Not Available
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Results</h3>
          <ul className="space-y-4">
            {results.length > 0 ? (
              results.map((result) => (
                <li key={result.examId} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold">Exam {result.examId}</h4>
                      <p className="text-sm text-gray-600">Score: {result.score}%</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No results available yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
