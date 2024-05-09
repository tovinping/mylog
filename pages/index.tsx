import { GetStaticProps } from 'next';
import {
  getAllUsers,
  UserProps,
  getUserCount,
  ResultProps,
  UserResponse,
  ILogProps
} from '@/lib/api/user';
import { defaultMetaProps } from '@/components/layout/meta';
import style from './index.module.scss'
import { LogList } from '@/components/logList';
import { LoadingDots } from '@/components/icons';
import { useRouter } from 'next/router';

export default function Home({ results }: { user: UserProps, results: ILogProps[] }) {
  const router = useRouter()
  return <div className={style.home}>
    <div className={style.title}>
      <span>菜单</span>
      <LoadingDots color='#ff0000' />
      <div>
        <span>搜索</span>
        <span onClick={() => router.push('/editor')}>添加</span>
      </div>
    </div>
    <p>全部日志</p>
    <LogList users={results} />
  </div>
}

export const getStaticProps: GetStaticProps = async () => {

  const results = await getAllUsers();
  console.log(results)
  const totalUsers = await getUserCount();

  return {
    props: {
      meta: defaultMetaProps,
      results,
      totalUsers,
    },
    revalidate: 10
  };
};
