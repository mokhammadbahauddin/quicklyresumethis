'use client';
import { useEffect, useState } from 'react';
import { databases, APPWRITE_DB_ID, APPWRITE_COLLECTION_RESUMES } from '@/lib/appwrite';
import { useAuth } from '@/context/AuthContext';
import { Query, Models } from 'appwrite';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const [resumes, setResumes] = useState<Models.Document[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) return;
      try {
        const response = await databases.listDocuments(
          APPWRITE_DB_ID,
          APPWRITE_COLLECTION_RESUMES,
          [Query.equal('user_id', user.$id)]
        );
        setResumes(response.documents);
      } catch (error) {
        console.error(error);
      }
    };

    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchResumes();
    }
  }, [user, loading, router]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <div className="flex gap-4">
            <button onClick={() => router.push('/')} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              New Resume
            </button>
            <button onClick={logout} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {resumes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 mb-4 text-lg">No resumes found yet.</p>
              <button 
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Get Started
              </button>
            </div>
          ) : (
            resumes.map((resume) => (
              <div key={resume.$id} className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{resume.title || 'Untitled Resume'}</h3>
                  <p className="text-sm text-gray-500">Last updated: {new Date(resume.last_updated).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => {
                    sessionStorage.setItem('resumeData', resume.content);
                    router.push('/edit');
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
