import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TeacherDashboard = () => {
  const [examTitle, setExamTitle] = useState('');
  const [examSubject, setExamSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('');
  const [examDuration, setExamDuration] = useState('');
  const [exams, setExams] = useState([]);
  const [activeTab, setActiveTab] = useState('manage');

  const handleCreateExam = () => {
    const newExam = {
      title: examTitle,
      subject: examSubject,
      date: examDate,
      time: examTime,
      duration: examDuration,
    };
    setExams([...exams, newExam]);
    setExamTitle('');
    setExamSubject('');
    setExamDate('');
    setExamTime('');
    setExamDuration('');
  };

  const handleDeleteExam = (index) => {
    const updatedExams = exams.filter((_, i) => i !== index);
    setExams(updatedExams);
  };

  const performanceData = {
    labels: ['Math', 'History', 'Science', 'English'],
    datasets: [
      {
        label: 'Student Performance',
        data: [85, 90, 78, 88],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Teacher Dashboard</h2>

        <div className="mb-4 flex justify-around">
          <button onClick={() => setActiveTab('manage')} className="text-lg font-semibold p-2 rounded bg-indigo-600 text-white">Manage Exams</button>
          <button onClick={() => setActiveTab('submissions')} className="text-lg font-semibold p-2 rounded bg-indigo-600 text-white">View Submissions</button>
        </div>

        {activeTab === 'manage' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Create New Exam</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Exam Title"
                className="w-full px-4 py-2 border rounded-md"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-2 border rounded-md"
                value={examSubject}
                onChange={(e) => setExamSubject(e.target.value)}
              />
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-md"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-md"
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                className="w-full px-4 py-2 border rounded-md"
                value={examDuration}
                onChange={(e) => setExamDuration(e.target.value)}
              />
              <button
                onClick={handleCreateExam}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Create Exam
              </button>
            </div>

            <h3 className="text-xl font-semibold mt-6">Manage Existing Exams</h3>
            <ul className="space-y-4 mt-4">
              {exams.map((exam, index) => (
                <li key={index} className="p-4 border rounded-md bg-gray-50 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{exam.title}</h4>
                    <p>{exam.subject}</p>
                    <p>{exam.date} at {exam.time}</p>
                    <p>Duration: {exam.duration} mins</p>
                  </div>
                  <button
                    onClick={() => handleDeleteExam(index)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Student Performance</h3>
            <div className="mb-4">
              <Bar data={performanceData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
