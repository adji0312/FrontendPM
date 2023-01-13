import { Application } from "../application/application";

export class Project{
    id!: number;
    created_by!: string;
    created_date!: Date;
    modify_by!: string;
    modify_date! : Date;
    application!: string;
    // application: Application = new Application;
    project_type!: string;
    project_code!: string;
    project_bpro!: string;
    project_desc!: string;
    project_kickoff!: Date;
    project_status!: string;
}

export class SearchModelProject{
    application!: string;
    project_type!: string;
    project_code!: string;
    project_bpro!: string;
    project_status!: string;
}