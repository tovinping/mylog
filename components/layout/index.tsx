import { ReactNode } from 'react';
import Meta, { MetaProps } from '@/components/layout/meta';
import style from './index.module.scss'

export default function Layout({
  meta,
  children
}: {
  meta: MetaProps;
  children: ReactNode;
}) {

  return (
    <div className={style.body}>
      <Meta props={meta} />
      {children}
    </div>
  );
}
