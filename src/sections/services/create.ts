export class Create {

  plan_templates: Array<{name: string, connections: number, spool_size: number}>;

  constructor(){
    this.plan_templates=[{name:'Basic',connections:10,spool_size:100},
                    {name:'Intermediate', connections: 100, spool_size:500},
                   {name:'Advanced',connections:1000, spool_size:1000}];
  }

}   
