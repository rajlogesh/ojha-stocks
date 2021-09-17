import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EdgesFacadeService } from 'src/app/Facades/edges-facade/edges-facade.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edges',
  templateUrl: './create-edges.component.html',
  styleUrls: ['./create-edges.component.scss']
})
export class CreateEdgesComponent implements OnInit {

  create_edge_form;
  userFeedback = 'none';

  constructor(
    private fb: FormBuilder,
    private edgeFacade: EdgesFacadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerFormControl();
  }

  registerFormControl() {
    this.create_edge_form = this.fb.group({
      edgename: ['', [Validators.required, Validators.minLength(2)]],
      edgelocation: ['', Validators.required],
      edgedescription: ['', Validators.required]
    });
  }

  get edgeFormControls() {
    return this.create_edge_form.controls;
  }

  createEdges() {
    const formContent = this.create_edge_form.value;
    const payload = {
      name: formContent['edgename'],
      location: formContent['edgelocation'],
      description: formContent['edgedescription']
    };
    this.edgeFacade.createEdges(payload)
      .subscribe(
        (response)=>{
          this.userFeedback = 'success';
          setTimeout(()=>{ 
            this.userFeedback = 'none'; 
            this.router.navigate(['/edges']);
          }, environment.errorMsgDly);
        },
        (error)=>{
          this.userFeedback = 'failure';
          setTimeout(()=>{ this.userFeedback = 'none'; }, environment.errorMsgDly);
        }
      );
  }

}
