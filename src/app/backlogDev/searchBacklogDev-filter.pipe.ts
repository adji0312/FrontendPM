import { Pipe, PipeTransform } from '@angular/core';
import { BacklogDevelopment, SearchModelBacklogDev } from './backlogDevelopment';
// import { Project, SearchModelProject } from './project';

@Pipe({
  name: 'searchBacklogDevFilter',
  pure: false
})
export class SearchBacklogDevFilterPipe implements PipeTransform {

  transform(backlogDevs: BacklogDevelopment[], baclogDevSearch: SearchModelBacklogDev): any {
    // console.log(users);
    //tidak ada data

    if(!backlogDevs || backlogDevs.length === 0) return backlogDevs;

    // blank search
    if(!baclogDevSearch || !baclogDevSearch.application && !baclogDevSearch.backlog_type && !baclogDevSearch.backlog_code && !baclogDevSearch.backlog_bpro && !baclogDevSearch.backlog_status){
      // console.log(projectSearch);
      return backlogDevs;
    }

    // debugger;
    // console.log(projectSearch);

    return backlogDevs.filter((backlog) => {
      // console.log(user.user_name);
        return (!baclogDevSearch.application || backlog.application.toLowerCase().includes(baclogDevSearch.application) || backlog.application.includes(baclogDevSearch.application)) &&
            (!baclogDevSearch.backlog_type || backlog.backlog_type.toLowerCase().includes(baclogDevSearch.backlog_type) || backlog.backlog_type.includes(baclogDevSearch.backlog_type)) && 
            (!baclogDevSearch.backlog_code || backlog.backlog_code.toLowerCase().includes(baclogDevSearch.backlog_code) || backlog.backlog_code.includes(baclogDevSearch.backlog_code)) &&
            (!baclogDevSearch.backlog_bpro || backlog.backlog_bpro.toLowerCase().includes(baclogDevSearch.backlog_bpro) || backlog.backlog_bpro.includes(baclogDevSearch.backlog_bpro)) &&
            (!baclogDevSearch.backlog_status || backlog.backlog_status.toLowerCase().includes(baclogDevSearch.backlog_status) || backlog.backlog_status.includes(baclogDevSearch.backlog_status));
    })
  }
}
