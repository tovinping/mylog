import { GetServerSideProps } from 'next';

export default function Profile() {
  return <div>Profile</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // const session = await getSession({ req });
  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/'
  //     }
  //   };
  // }
  return {
    redirect: {
      permanent: false,
      destination: `/`
    }
  };
};
