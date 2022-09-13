import type {RootTabScreenProps} from '../../navigation/types';

import ListWithPagination from './ListWithPagination';
import {EmptyBox, EmptyText} from './Home.styles';
import Filters from '../../components/Filters';
import {useAppSelector} from '../../store/store.hooks';

const Home = ({navigation}: RootTabScreenProps<'Home'>) => {
  const {data} = useAppSelector(state => state.todos);
  if (!data.length) {
    return (
      <EmptyBox>
        <EmptyText>Нет никаких задач</EmptyText>
      </EmptyBox>
    );
  }
  return (
    <ListWithPagination
      FiltersComponent={<Filters />}
      navigation={navigation}
    />
  );
};

export default Home;
