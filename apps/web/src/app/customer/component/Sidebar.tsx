'use client';
import { UserCog, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Sidebar() {
  const items = [
    { title: 'Profile', icon: <UserCog className="h-6 w-6 mr-2" /> },
    { title: 'Change password', icon: <Key className="h-6 w-6 mr-2" /> },
  ];

  const logout = () => {
    localStorage.removeItem('jwtToken');
    router.push('/');
    alert('Logout success');
  };

  const goHome = () => {
    router.push('/');
  };

  const router = useRouter();

  return (
    <>
      <div className="bg-[#007bff] h-screen p-4 text-neutral-100 flex flex-col justify-between">
        <div className="transition ease-in-out duration-[0.3s]">
          <h2 className="font-semibold text-2xl mb-6 mt-2 cursor-pointer hover:text-neutral-200">
            {' '}
            User Profile
          </h2>
        </div>
        <div>
          <h2
            className="font-semibold text-xl mb-6 mt-2 cursor-pointer hover:text-neutral-200"
            onClick={goHome}
          >
            {' '}
            Back to Home
          </h2>
          <h2 className="font-semibold text-xl mb-6 mt-2 cursor-pointer hover:text-neutral-200">
            {' '}
            Change Password
          </h2>
          <h2
            className="font-semibold text-xl mb-6 mt-2 cursor-pointer hover:text-neutral-200"
            onClick={logout}
          >
            {' '}
            Logout
          </h2>
        </div>
      </div>
    </>
  );
}
