import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  public path = [];
  public forword = [];
  public createMode = false;
  public folderName = '';
  public errorMsg = '';
  public directory = {}
  public root = {};
  constructor(){
    this.root = this.directory;
  }
  onFolderClick(key){
    console.log('sdjchgschj',this.forword,this.forword.length && (this.forword[0]==key));
    this.path.push(key);
    if(this.forword.length && (this.forword[this.forword.length-1]==key)){
      this.forword.pop();
    }else{
      this.forword = [];
    }
    this.root = this.root[key];
  }
  setRootFromPath(){
    let tempRoot = this.directory;
    this.path.forEach((key)=>{
      tempRoot = tempRoot[key];
    });
    this.root = tempRoot;
  }
  backFolder(){
    this.forword.push(this.path.pop());
    this.setRootFromPath();
  }
  upFolder(){
    this.path.push(this.forword.pop());
    this.setRootFromPath();
  }
  createFolder(){
    this.createMode = true;
    this.folderName = '';
  }
  cancelCreate(){
    this.createMode = false;
  }
  onSubmit(heroForm){
    console.log('heroForm',heroForm)
    if(!this.folderName.trim()){
      this.setErrorMsg('Please Enter Folder Name');
      return;
    }else if(this.root[this.folderName]){
      this.setErrorMsg('Folder Name Already Exists.');
      return;
    }
    this.root[this.folderName] = {};
    this.createMode = false;
  }
  setErrorMsg(msg){
    this.errorMsg = msg;
    setTimeout(()=>{
      this.errorMsg = '';
    },2000)
  }
}
