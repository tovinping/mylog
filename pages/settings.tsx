import { GetServerSideProps } from 'next';
import Profile from '@/components/profile';
import { defaultMetaProps } from '@/components/layout/meta';
import { getUser, getAllUsers, UserProps, getUserCount } from '@/lib/api/user';

export default function Settings({ user }: { user: UserProps }) {
  // return <Profile settings={true} user={user} />;
  return <div></div>
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const results = await getAllUsers();
  const totalUsers = await getUserCount();

  const user = await getUser(session.username as string);

  const meta = {
    ...defaultMetaProps,
    title: `Settings | MongoDB Starter Kit`
  };

  return {
    props: {
      meta,
      results,
      totalUsers,
      user
    }
  };
};
