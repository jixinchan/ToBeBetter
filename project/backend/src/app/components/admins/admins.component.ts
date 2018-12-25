import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  modalRef: BsModalRef;
  mid;
  constructor(public http:HttpClient,private modalService: BsModalService) {
    this.mid=localStorage.getItem('mid');
    console.log(this.mid);
  }
  manager;
  addmid;
  addname;
  addpwd;
  addrole;
  editmid;
  editname;
  editpwd;
  editrole;
  deletemid;
  //增加管理员
  openModal2(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2);
  }
  ngOnInit() {
    this.http.get('/api/admins').subscribe(data=>{
      this.manager = data;
      console.log(this.manager);
    })
  }
  selectOnchang(i){
    this.addrole=i;
  }

  goAddadmin(){
    this.http.post('/api/add/admin',{
      "mid":this.addmid,
      "username":this.addname,
      "password":this.addpwd,
      "role":this.addrole
    }).subscribe(data=>{
      console.log(data);
    })
    this.modalRef.hide();
    window.location.reload();
  }
  decline(){
    this.modalRef.hide();
  }
  //编辑管理员信息
  editSelect(i){
    this.editrole=i;
  }
  openModal(template1: TemplateRef<any>,j) {
    if(this.mid==1){
      this.modalRef = this.modalService.show(template1);
      this.editmid=j;
    }else{
      alert('对不起！您没有此权限');
    }
  }
  editAdmin(){
    console.log(this.editmid);
    console.log(this.editrole);
    this.http.post('/api/edit/admin',{
      "mid":this.editmid,
      "username":this.editname,
      "password":this.editpwd,
      "role":this.editrole, 
    }).subscribe(data=>{
        console.log(data);
       
    });
    window.location.reload();
    this.modalRef.hide();
  }
  // 删除管理员
  goDelete(template3: TemplateRef<any>,i){
    // console.log(i);
    if(this.mid==1&&this.mid!=i){
      this.modalRef = this.modalService.show(template3);
      this.deletemid=i;
    }else{
      alert("对不起，您没有此权限");
    }
  }
  goYesdelete(){
    this.http.post('/api/delete/admin',{
      "qid":this.deletemid
    }).subscribe(data=>{
        // console.log("删除");
    });
    window.location.reload();
  }

}
