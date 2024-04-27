import { GetStaticProps } from 'next';
import Profile from '@/components/profile';
import {
  getAllUsers,
  UserProps,
  getUserCount,
  getFirstUser
} from '@/lib/api/user';
import { defaultMetaProps } from '@/components/layout/meta';

export default function Home({ user }: { user: UserProps }) {
  return <Profile user={user} />;
}

export const getStaticProps: GetStaticProps = async () => {

  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const firstUser = await getFirstUser();

  return {
    props: {
      meta: defaultMetaProps,
      results,
      totalUsers,
      user: firstUser
    },
    revalidate: 10
  };
};
