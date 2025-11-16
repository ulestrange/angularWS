import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-user-component',
  imports: [RouterModule],
  templateUrl: './single-user-component.html',
  styleUrl: './single-user-component.scss'
})
export class SingleUserComponent {

  private route = inject(ActivatedRoute)

  id: string = "";

  // ngOnInit() : void {
  //   this.id = this.route.snapshot.paramMap.get('id') ?? "";
  // }

    ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =  params.get('id') || '';
    })
  }

}
