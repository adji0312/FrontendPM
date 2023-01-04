export class BacklogDevelopment{

  id!: number;
  created_by!: string;
  created_date!: Date;
  modify_by!: string;
  modify_date! : Date;
  application!: string;
  backlog_type!: string;
  backlog_code!: string;
  backlog_bpro!: string;
  backlog_desc!: string;
  backlog_kickoff!: string;
  backlog_status!: string;
  backlog_start!: Date;
  backlog_end!: Date;
  pic_PM!: string;
}

export class SearchModelBacklogDev{
  application!: string;
  backlog_type!: string;
  backlog_code!: string;
  backlog_bpro!: string;
  backlog_status!: string;
}