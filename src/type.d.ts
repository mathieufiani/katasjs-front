declare module "type";
import * as webrtc from "webrtc";

// type for the redux store
interface BeerState {
  loading: boolean;
  beers: BeerDetail[];
  error: string;
  cart: CartItem[];
}

// Type for an item stored in the cart
type CartItem = {
  id: number;
  quantity: number;
  beer?: BeerDetail;
};

// type for a beer object
type BeerDetail = {
  id?: number;
  name?: string;
  image_url?: string;
  volume?: Volume;
  description?: string;
  ingredients?: BeerIngredients;
  brewers_tips?: string;
};

// type for the ingredients of a beer
type BeerIngredients = {
  malt?: Ingredient[];
  hops?: Ingredient[];
  yeast?: string;
};

// type for a single ingredient
type Ingredient = {
  name?: string;
  amount?: Amount;
};

// type for the volume of an ingredient
type Amount = {
  value?: number;
  unit?: string;
};

// type for the volume of a beer
type Volume = {
  value: number;
  unit: string;
};

// type for an action creator
type ActionCreator = {
  type: string;
  payload?: any;
};

type DispatchType = (args: ActionCreator) => ActionCreator;
