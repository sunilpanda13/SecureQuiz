import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-seestudents',
  templateUrl: './seestudents.component.html',
  styleUrls: ['./seestudents.component.css']
})
export class SeestudentsComponent implements OnInit {
  msg: any = [];
  public users: any[];
  avail: boolean;
  empty: boolean;
  constructor(private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {
    this.empty=false;
    this.getdata();
  }

  getdata()
  {
    this.teacherService.seestudent()
      .subscribe(
        data => {

          this.users = data['user']
          if(!this.users.length)
          {
            this.empty = true;

          }
          else
          {
            this.empty = false;
          }
          // console.log(data);
          // this.router.navigate(['/teacher/teacherhome']);
        },
        error => {
          console.error(error);
        }


      )

  }

  block(user) {
    var userid = user._id;
    this.teacherService.blockuser(userid).subscribe(
      data => {
        // console.log(data);
        // this.adminService.avail = true;
        // this.adminService.msg = "Successfully Blocked User!!!";
        // this.router.navigate(['/admin']);
        this.router.navigate(['/teacher/teacherhome']);
      },
      (error) => {


        console.log(error);
      }
    )
  }

  unblock(user) {
    var userid = user._id;
    this.teacherService.unblockuser(userid).subscribe(
      data => {
        this.router.navigate(['/teacher/teacherhome']);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
