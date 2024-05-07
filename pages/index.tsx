import { GetStaticProps } from 'next';
import {
  getAllUsers,
  UserProps,
  getUserCount,
  ResultProps
} from '@/lib/api/user';
import { defaultMetaProps } from '@/components/layout/meta';
import style from './index.module.scss'
import { Logs } from '@/components/logs';
import { EditIcon } from '@/components/icons';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home({ results }: { user: UserProps, results: ResultProps[] }) {
  const router = useRouter()
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
    <div className={style.edit} onClick={() => router.push('/editor')}>
      <EditIcon />
    </div>
  </div>
}

export const getStaticProps: GetStaticProps = async () => {

  const results = await getAllUsers();
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
