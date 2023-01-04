import { Pipe, PipeTransform } from '@angular/core';
import { Role, SearchModelRole } from './role';

@Pipe({
  name: 'searchRoleFilter',
  pure: false
})
export class SearchRoleFilterPipe implements PipeTransform {

  transform(roles: Role[], roleSearch: SearchModelRole): any {
    // console.log(search);
    //tidak ada data
    if(!roles || roles.length === 0) return roles;

    // // blank search
    if(!roleSearch || !roleSearch.role_id && !roleSearch.role_name && !roleSearch.role_desc) return roles;

    // // debugger;
    // // console.log(roleSearch);

    return roles.filter((role) => {
      // console.log(user.user_name);
        return (!roleSearch.role_id || role.role_id.toLowerCase().includes(roleSearch.role_id)) &&
            (!roleSearch.role_name || role.role_name.toLowerCase().includes(roleSearch.role_name)) && 
            (!roleSearch.role_desc || role.role_desc.toLowerCase().includes(roleSearch.role_desc));
    })
  }
}
