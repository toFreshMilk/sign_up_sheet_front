import { useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  useEffect(() => {
    console.log(process.env.hi);
  }, []);
  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
      </p>
    </Main>
  );
};

export default Index;
