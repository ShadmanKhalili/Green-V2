import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';

export const AdminDashboard: React.FC = () => {
  const { userProfile, logout } = useAuth();
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      if (userProfile?.role !== 'admin') return;
      try {
        const querySnapshot = await getDocs(collection(db, 'assessments'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAssessments(data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, [userProfile]);

  const handleDownload = () => {
    if (assessments.length === 0) return;
    
    // Create CSV content from assessments. The structure is complex, so we will flatten it or dump JSON.
    const csvContent = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(assessments, null, 2));
    const link = document.createElement("a");
    link.href = csvContent;
    link.download = "assessments_export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (userProfile?.role !== 'admin') return <div className="p-8">Access Denied. Admin only.</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <div className="space-x-4">
          <button onClick={handleDownload} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Download All JSON</button>
          <button onClick={logout} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Logout</button>
        </div>
      </div>
      
      {loading ? (
        <p>Loading assessments...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Enumerator ID</th>
                <th className="p-4">Total Score</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map(a => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{a.createdAt ? new Date(a.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</td>
                  <td className="p-4">{a.enumeratorId}</td>
                  <td className="p-4 text-green-700 font-bold">{a.totalScore}%</td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:underline" onClick={() => alert(JSON.stringify(a.probingAnswers, null, 2))}>View Answers</button>
                  </td>
                </tr>
              ))}
              {assessments.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">No assessments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
