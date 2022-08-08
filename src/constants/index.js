import {useHeaderHeight} from '@react-navigation/elements';
import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');
export const headerHeight = useHeaderHeight();
