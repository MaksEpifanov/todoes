import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';

export type RootStackParamsList = {
  Root: NativeStackScreenProps<RootTabParamList>;
  UpdateTodo: {todoId: string};
};

export type RootStackScreenProps<Screen extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  AddTodo: undefined;
  Shredder: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >;
