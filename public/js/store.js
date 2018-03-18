import { smoke } from './js/model/smoke';
import { Setting } from './js/model/setting';
import { User } from './js/model/user';


export const store = new Vuex.Store({
  state: {
    user:{};
    last_smoked:{};
  },
  mutations: {
    last_smoker:state.last_smoked=Smoke.smokedAt
  },
  getter: {
     return state.users.filter(){

     }
  }
});
