import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';

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
    {data: this.barChartData1, label: 'Attended'},
    {data: this.barChartData2, label: 'Not attended'},
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


  constructor(private studentService: StudentsService) { }

  ngOnInit() {
    this.countPerWard();
    this.attendancePerWard();
  }

  countPerWard() {
    this.studentService.countPerWard().subscribe(
      res => {
        this.students = res;
        this.filteredStudents = this.students;
        this.count = this.filteredStudents.length;

        this.filteredStudents.forEach(element => {
          this.pieChartData.push(element.Total);
          this.pieChartLabels.push(element.ward);
        });
      },
      err => console.log(err)
    );
  }

  attendancePerWard() {
    this.studentService.attendancePerWard().subscribe(
      res => {
        this.students = res;
        this.filteredStudents = this.students;
        this.count = this.filteredStudents.length;

        this.filteredStudents.forEach(element => {
          this.barChartData1.push(element.Yes);
          this.barChartData2.push(element.No);
          this.barChartLabels.push(element.ward);
        });
      },
      err => console.log(err)
    );
  }
}
