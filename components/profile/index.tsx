import { UserProps } from '@/lib/api/user';
import { getGradient } from '@/lib/gradients';
import {
  CheckInCircleIcon,
  UploadIcon,
} from '@/components/icons';
import BlurImage from '../blur-image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';

export default function Profile({
  settings,
  user
}: {
  settings?: boolean;
  user: UserProps;
}) {
  const router = useRouter();
  const [data, setData] = useState({
    username: user.username,
    image: user.image,
    bio: user.bio || '',
    bioMdx: user.bioMdx
  });

  if (data.username !== user.username) {
    setData(user);
  }

  const settingsPage =
    settings ||
    (router.query.settings === 'true' && router.asPath === '/settings');


  return (
    <div className="min-h-screen pb-20">
      <div>
        <div
          className={`h-48 w-full lg:h-64 
          ${getGradient(user.username)}`}
        />
        <div
          className={`${profileWidth} -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5`}
        >
          <div className="relative group h-24 w-24 rounded-full overflow-hidden sm:h-32 sm:w-32">
            {settingsPage && (
              <button
                className="absolute bg-gray-800 bg-opacity-50 hover:bg-opacity-70 w-full h-full z-10 transition-all flex items-center justify-center"
                onClick={() =>
                  alert('Image upload has been disabled for demo purposes.')
                }
              >
                <UploadIcon className="h-6 w-6 text-white" />
              </button>
            )}
            <BlurImage
              src={user.image}
              alt={user.name}
              width={300}
              height={300}
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex min-w-0 flex-1 items-center space-x-2">
              <h1 className="text-2xl font-semibold text-white truncate">
                {user.name}
              </h1>
              {user.verified && (
                <CheckInCircleIcon className="w-6 h-6 text-[#0070F3]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
