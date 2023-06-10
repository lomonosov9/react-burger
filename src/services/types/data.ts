export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  price: number;
  image: string;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  image_mobile?: string;
  image_large?: string;
  __v?: number
};

export type TComponent = TIngredient & {dragId: string};

export type TOrder = {
  name: string;
  order: { number: number };
}

export type TOrderInfo = {
  ingredients: string[];
  _id: string;
  owner?: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name?: string;
  __v?: number;
}

export type TOrders = {
  orders: TOrderInfo[];
}

export type TFeed = TOrders & {
  total: number;
  totalToday: number;
}

export type TUser = {
  user: {
    email: string;
    name: string
  };
}

export type TUserForm = {
  email?: string, 
  password?: string,
  name?: string,
  token?: string
}

export type RequestDB = {
  success: boolean;
}
export type RequestDataToken = RequestDB & {
  accessToken: string;
  refreshToken: string;
}

export type RequestIngredients = RequestDB & {
  data: TIngredient[];
}

export type RequestOrder = RequestDB & TOrder;

export type RequestOrderInfo = RequestDB & TOrders;

export type RequestUser = RequestDB & TUser;

export type RequestUserAuth = RequestDataToken & RequestUser;

export type RequestCredentialsUpdate = RequestDB & {
  message: string
}

export type RequestLogout = RequestDB & {
  message: string
}

export type RequestFeed = RequestDB & TFeed;

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}