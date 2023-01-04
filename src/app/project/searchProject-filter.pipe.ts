import { Pipe, PipeTransform } from '@angular/core';
import { Project, SearchModelProject } from './project';

@Pipe({
  name: 'searchProjectFilter',
  pure: false
})
export class SearchProjectFilterPipe implements PipeTransform {

  transform(projects: Project[], projectSearch: SearchModelProject): any {
    // console.log(users);
    //tidak ada data

    if(!projects || projects.length === 0) return projects;

    // blank search
    if(!projectSearch || !projectSearch.application && !projectSearch.project_type && !projectSearch.project_code && !projectSearch.project_bpro && !projectSearch.project_status){
      // console.log(projectSearch);
      return projects;
    }

    // debugger;
    // console.log(projectSearch);

    return projects.filter((project) => {
      // console.log(user.user_name);
        return (!projectSearch.application || project.application.toLowerCase().includes(projectSearch.application) || project.application.includes(projectSearch.application)) &&
            (!projectSearch.project_type || project.project_type.toLowerCase().includes(projectSearch.project_type) || project.project_type.includes(projectSearch.project_type)) && 
            (!projectSearch.project_code || project.project_code.toLowerCase().includes(projectSearch.project_code) || project.project_code.includes(projectSearch.project_code)) && 
            (!projectSearch.project_bpro || project.project_bpro.toLowerCase().includes(projectSearch.project_bpro) || project.project_bpro.includes(projectSearch.project_bpro)) &&
            (!projectSearch.project_status || project.project_status.toLowerCase().includes(projectSearch.project_status) || project.project_status.includes(projectSearch.project_status)) ;
    })
  }
}
