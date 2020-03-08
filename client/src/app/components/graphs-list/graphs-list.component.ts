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

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartColor: any = [
    {
        backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
        ]
    }
];
  public pieChartType = 'pie';


  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  constructor(private studentService: StudentsService) { }

  ngOnInit() {
    this.countPerWard();
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
}
