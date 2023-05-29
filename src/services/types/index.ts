import { ThunkAction } from 'redux-thunk';
import { TConstructorActions, TCurrentActions, TIngredientsActions, TOrderActions, TUserActions, TOrderInfoActions } from '../action-creators';
import { TFeedActions } from '../feed/actions';
import { TProfileFeedActions } from '../profile-feed/actions';
import rootReducer from '../reducers';

export type RootState = ReturnType<typeof rootReducer>

// Типизация всех экшенов приложения
export type TApplicationActions = 
| TConstructorActions
| TCurrentActions
| TIngredientsActions
| TOrderActions
| TUserActions
| TFeedActions
| TProfileFeedActions
| TOrderInfoActions; 

// Типизация thunk'ов
export type AppThunk<TReturn = void> = ThunkAction<
  TReturn,
  RootState,
  unknown,
  TApplicationActions
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch<TReturnType = void> = (
  action: TApplicationActions | AppThunk<TReturnType>
) => TReturnType;