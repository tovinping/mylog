import { GetStaticProps } from 'next';
import Profile from '@/components/profile';
import {
  getAllUsers,
  UserProps,
  getUserCount,
  getFirstUser,
  ResultProps
} from '@/lib/api/user';
import { defaultMetaProps } from '@/components/layout/meta';
import style from './index.module.scss'
import { Logs } from '@/components/logs';

export default function Home({ user, results }: { user: UserProps, results: ResultProps[] }) {
  return <div className={style.home}>
    <div className={style.title}>
      <span>菜单</span>
      <div>
        <span>搜索</span>
        <span>更多</span>
      </div>
    </div>
    <p>全部日志</p>
    <Logs users={results.map(item => item.users).flat(1)} />
  </div>
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
