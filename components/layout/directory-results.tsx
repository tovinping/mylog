import Link from 'next/link';
import { UserProps } from '@/lib/api/user';

export default function DirectoryResults({ users }: { users: UserProps[] }) {
  return (
    <ul role="list" className="relative z-0 directory-divide-y">
      {users.map((user) => (
        <li key={user.username}>
          <Link href={`/${user.username}`}>
            <p className="px-6 text-sm font-medium text-white truncate">
              {user.name}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
