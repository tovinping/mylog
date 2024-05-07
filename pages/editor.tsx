import { GetStaticProps } from 'next'
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { defaultMetaProps } from '@/components/layout/meta';

import style from './editor.module.scss'
import fetcher from '@/lib/fetcher';
const temp = `测试数据`
export default function Editor() {
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.value = temp
  }, [])
  // const { data: searchedUsers } = useSWR<UserProps[] | null>(
  //   `api/user`,
  //   fetcher,
  // );
  const handPublish = useCallback(() => {
    if (!inputRef.current) return;
    const content = inputRef.current.value
    fetcher('/api/user', { method: "PUT", body: JSON.stringify({ content}), headers: { 'Content-Type': 'application/json' }})
    router.back()
  }, [router])
  return (<div className={classnames(style.editor)}>
    <div className={style.title}>
      <span onClick={handPublish}>返回</span>
      <span onClick={handPublish}>完成</span>
    </div>
    <textarea ref={inputRef} className={style.textarea} />
  </div>)
}

export const getStaticProps: GetStaticProps = async () => {

  const meta = {
    ...defaultMetaProps,
    title: "编辑日志"
  };
  return {
    props: {
      meta
    },
    revalidate: 10
  };
};