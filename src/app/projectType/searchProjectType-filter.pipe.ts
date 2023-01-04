import { Pipe, PipeTransform } from '@angular/core';
import { ProjectType, SearchModelProjectType } from './projectType';

@Pipe({
  name: 'searchProjectTypeFilter',
  pure: false
})
export class SearchProjectTypeFilterPipe implements PipeTransform {

  transform(projectTypes: ProjectType[], projectSearch: SearchModelProjectType): any {
    // console.log(users);
    //tidak ada data

    if(!projectTypes || projectTypes.length === 0) return projectTypes;

    // blank search
    if(!projectSearch || !projectSearch.project_type && !projectSearch.project_desc){
      // console.log(projectSearch);
      return projectTypes;
    }

    // debugger;
    // console.log(projectSearch);

    return projectTypes.filter((projectType) => {
      // console.log(user.user_name);
        return (!projectSearch.project_type || projectType.project_type.toLowerCase().includes(projectSearch.project_type) || projectType.project_type.includes(projectSearch.project_type)) &&
            (!projectSearch.project_desc || projectType.project_desc.toLowerCase().includes(projectSearch.project_desc) || projectType.project_desc.includes(projectSearch.project_desc)) ;
    })
  }
}
