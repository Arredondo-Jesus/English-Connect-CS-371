import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { DecryptService } from '../../services/decrypt.service';

@Component({
  selector: 'app-graphs-list',
  templateUrl: './graphs-list.component.html',
  styleUrls: ['./graphs-list.component.css']
})
export class GraphsListComponent implements OnInit {

  students: any = [];
  filteredStudents: any = [];
  count = 0;
  barChartData1: any = [];
  barChartData2: any = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: this.barChartData1, label: 'Attended', stack: 'a'},
    {data: this.barChartData2, label: 'Not attended', stack: 'a'}
  ];
  public barChartColor: any = [
    {backgroundColor: 'rgba(30, 169, 224, 0.8)'},
    {backgroundColor: 'rgba(255, 161, 181, 0.9)'}
  ];

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartColor: any = [
    {
        backgroundColor: [
        'rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
        ]
    }
];
  public pieChartType = 'pie';


  constructor(private studentService: StudentsService, private decryptService: DecryptService) { }

  ngOnInit() {
    this.countPerWard();
    this.attendancePerWard();
  }

  countPerWard() {
    this.studentService.countPerWard().subscribe(
      res => {
        this.students = res;
        //this.filteredStudents = this.students;
        this.count = this.filteredStudents.length;

        this.students.forEach(element => {
          this.pieChartData.push(element.Total);
          this.pieChartLabels.push(element.stake);
        });
      },
      err => console.log(err)
    );
  }

  attendancePerWard() {
    this.filteredStudents = [];
    this.studentService.attendancePerWard().subscribe(
      res => {
        this.students = res;
        //this.filteredStudents = this.students;
        this.students.forEach(element => {
          this.filteredStudents.push(this.decryptData(element))
        });
        this.count = this.filteredStudents.length;

        this.filteredStudents.forEach(element => {
          this.barChartData1.push(element.Yes);
          this.barChartData2.push(element.No);
          this.barChartLabels.push(element.instructor_name + ' ' + element.instructor_last_name);
        });
      },
      err => console.log(err)
    );
  }

  decryptData(element: any) {
    element.instructor_name = this.decryptService.decryptData(element.instructor_name);
    element.instructor_last_name = this.decryptService.decryptData(element.instructor_last_name);

    return element;
  }
}
