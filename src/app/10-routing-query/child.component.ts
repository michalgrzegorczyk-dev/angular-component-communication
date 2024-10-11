import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-10-child-routing-query',
  standalone: true,
  template: `
    <h2>User Details</h2>
    <p>ID: {{ id }}</p>
    <p>Name: {{ name }}</p>
    <p>Role: {{ role }}</p>
  `,
})
export class ChildComponent implements OnInit {
  id!: string;
  name!: string;
  role!: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.name = params['name'];
      this.role = params['role'];
    });
  }
}
