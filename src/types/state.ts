import {User, Stats} from "@/types";


export interface RootState {
  stats?: Stats;
  user?: User | null;
}
