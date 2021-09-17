import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-edges-manifest',
  templateUrl: './edges-manifest.component.html',
  styleUrls: ['./edges-manifest.component.scss']
})
export class EdgesManifestComponent implements OnInit {

  fileContent;

  // @Input('manifestList') manifestList;

  @Input('manifestList') set manifestList(data) {
    if (data !== undefined && data !== null) {
      this.fileContent = JSON.stringify(data,null,2);
    }
  }


  constructor() { }


  get isMFAvailable() {
    if(this.manifestList !== null){
      return true;
    }
    else {
      return false;
    }
    // return (Object.keys(this.manifestList).length > 0)?(true):(false);
  }

  get manifestList(){
    return this.fileContent;
  }

  ngOnInit(): void {
  }


}
