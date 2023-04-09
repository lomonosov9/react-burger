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

export type RequestOrder = RequestDB & {
  name: string;
  order: { number: number };
}

export type RequestUser = RequestDB & {
  user: {
    email: string;
    name: string
  };
}

export type RequestUserAuth = RequestDataToken & RequestUser;

export type RequestCredentialsUpdate = RequestDB & {
  message: string
}

export type RequestLogout = RequestDB & {
  message: string
}