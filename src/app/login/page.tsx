'use client';
import { useState } from 'react';
import { account } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { checkAuth } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      await checkAuth();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <a href="/signup" className="text-blue-600">Sign up</a>
        </p>
      </div>
    </div>
  );
}
