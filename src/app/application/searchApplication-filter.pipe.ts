import { Pipe, PipeTransform } from '@angular/core';
import { Application, SearchModelApplication } from './application';
// import { Project, SearchModelProject } from './project';

@Pipe({
  name: 'searchApplicationFilter',
  pure: false
})
export class SearchApplicationFilterPipe implements PipeTransform {

  transform(applications: Application[], applicationSearch: SearchModelApplication): any {
    // console.log(users);
    //tidak ada data

    if(!applications || applications.length === 0) return applications;

    // blank search
    if(!applicationSearch || !applicationSearch.application_name && !applicationSearch.application_type && !applicationSearch.application_server){
      // console.log(projectSearch);
      return applications;
    }

    // debugger;
    // console.log(projectSearch);

    return applications.filter((application) => {
      // console.log(user.user_name);
        return (!applicationSearch.application_name || application.application_name.toLowerCase().includes(applicationSearch.application_name) || application.application_name.includes(applicationSearch.application_name)) &&
            (!applicationSearch.application_type || application.application_type.toLowerCase().includes(applicationSearch.application_type) || application.application_type.includes(applicationSearch.application_type)) && 
            (!applicationSearch.application_server || application.application_server.toLowerCase().includes(applicationSearch.application_server) || application.application_server.includes(applicationSearch.application_server));
    })
  }
}
