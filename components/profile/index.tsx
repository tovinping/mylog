import { UserProps } from '@/lib/api/user';
import { getGradient } from '@/lib/gradients';
export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';

export default function Profile({ user }: { user: UserProps }) {
  return (
    <div className="min-h-screen pb-20">
      <div
        className={`h-48 w-full lg:h-64 
          ${getGradient(user.content)}`}
      />
      <h1 className="text-2xl font-semibold text-white truncate">我是标题</h1>
      <section>
        <p  className="text-2xl font-semibold text-white truncate">我是内容</p>
      </section>
    </div>
  );
}
