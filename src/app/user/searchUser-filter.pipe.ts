import { Pipe, PipeTransform } from '@angular/core';
import { SearchModelUser, User } from './user';

@Pipe({
  name: 'searchUserFilter',
  pure: false
})
export class SearchUserFilterPipe implements PipeTransform {

  transform(users: User[], userSearch: SearchModelUser): any {
    // console.log(users);
    //tidak ada data

    if(!users || users.length === 0) return users;

    // blank search
    if(!userSearch || !userSearch.user_id && !userSearch.user_name && !userSearch.role){
      // console.log(userSearch);
      return users;
    }

    // debugger;
    // console.log(userSearch);

    return users.filter((user) => {
      // console.log(user.user_name);
        return (!userSearch.user_id || user.user_id.toLowerCase().includes(userSearch.user_id) || user.user_id.includes(userSearch.user_id)) &&
            (!userSearch.user_name || user.user_name.toLowerCase().includes(userSearch.user_name) || user.user_name.includes(userSearch.user_name)) && 
            (!userSearch.role || user.role.role_name.toLowerCase().includes(userSearch.role) || user.role.role_name.includes(userSearch.role));
    })
  }
}
