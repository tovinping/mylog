import { ResultProps, UserProps } from '@/lib/api/user';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { useState } from 'react';
import DirectoryResults from './directory-results';
import style from './directory.module.scss'

export default function Directory({
  results,
  totalUsers
}: {
  results: ResultProps[];
  totalUsers: number;
}) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const { data: searchedUsers } = useSWR<UserProps[] | null>(
    debouncedQuery.length > 0 && `api/user?query=${debouncedQuery}`,
    fetcher,
    {
      keepPreviousData: true
    }
  );
  return(<div>aaa</div>)
  // return (
  //   <aside className="flex-shrink-0 w-full bg-black sm:w-96 h-full overflow-scroll border-r border-gray-800">
  //     <div className="px-6 pt-6 pb-0 sticky top-0 bg-black z-20">
  //       <div className={style.container}>
  //       <p>
  //         共有{totalUsers}条数据
  //       </p>
  //       </div>
  //       <form className="py-8 flex space-x-4" action="#">
  //         <div className="flex-1 min-w-0">
  //           <div className="relative shadow-sm border-0 border-b-dark-accent-2 rounded-none border-b-[1px] ">
  //             <div className="absolute bg-black inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
  //             </div>
  //             <input
  //               type="search"
  //               name="search"
  //               id="search"
  //               className="text-white placeholder:text-dark-accent-3 focus:ring-transparent border-none bg-black focus:border-transparent block w-full pl-10 sm:text-sm rounded-md"
  //               placeholder="搜索"
  //               value={query}
  //               onChange={(e) => setQuery(e.target.value)}
  //             />
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //     {/* Directory list */}
  //     <nav
  //       className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
  //     >
  //       {debouncedQuery.length === 0 ? (
  //         results.map(({ _id: letter, users }) => (
  //           <div key={letter} className="relative">
  //             <div className="bg-dark-accent-1 px-6 py-1 text-sm font-bold text-white uppercase">
  //               <h3>{letter}</h3>
  //             </div>
  //             <DirectoryResults users={users} />
  //           </div>
  //         ))
  //       ) : searchedUsers && searchedUsers.length > 0 ? (
  //         <DirectoryResults users={searchedUsers} />
  //       ) : (
  //         <div className="px-6 py-6">
  //           <p className="text-center text-gray-500">No results found</p>
  //         </div>
  //       )}
  //     </nav>
  //   </aside>
  // );
}
