import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
import { Chart } from 'chart.js/auto';
import { StaticsService } from 'src/app/Services/statics/statics.service';

// Initialize the exporting modules
Exporting(Highcharts);
ExportData(Highcharts);

@Component({
  selector: 'app-count-total-stat',
  templateUrl: './count-total-stat.component.html',
  styleUrls: ['./count-total-stat.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class CountTotalStatComponent implements OnInit {
  totalCallsForTenders!: number;
  totalEmployees!: number;
  totalProjects!: number;
  totalClients!: number;
  totalAppelsOffres!: number;

  constructor(private statistiquesService: StaticsService) { }
  chart!: Chart; // Declare chart property

  ngOnInit(): void {
    this.loadEmploye();
    this.loadProjects();
    this.loadClients();
    this.loadAppelsOffres();
    this.statistiquesService.getParticipationParPays().subscribe(data => {
      this.createChart('container', 'Participation Appel d\'offre par pays', data);
    });
    this.statistiquesService.getParticipationParLieux().subscribe(data => {
      this.createChartLieu('container1', 'Participation projet par lieu', data);
    });
    this.statistiquesService.getHistogram().subscribe(data => {
      this.createHisto(data);
    });
  }

  loadEmploye(): void {
    this.statistiquesService.getEmployeesStatistics().subscribe(data => {
      this.totalEmployees = data.totalEmployees;
    });
  }

  loadProjects(): void {
    this.statistiquesService.getProjectsStatistics().subscribe(data => {
      this.totalProjects = data.totalProjects;
    });
  }

  loadClients(): void {
    this.statistiquesService.getClientsStatistics().subscribe(data => {
      this.totalClients = data.totalClients;
    });
  }

  loadAppelsOffres(): void {
    this.statistiquesService.getAppelsOffresStatistics().subscribe(data => {
      this.totalAppelsOffres = data.totalAppeslOffres; // Assurez-vous que le nom de la propriété correspond à celle renvoyée par l'API
    }, error => {
      console.error('Error loading Appels Offres statistics', error);
    });
  }

  createChart(containerId: string, titleText: string, data: any) {
    Highcharts.chart(containerId, {
      chart: {
        type: 'pie'
      },
      title: {
        text: titleText,
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          borderWidth: 2,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.percentage}%',
            distance: 20
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        colorByPoint: true,
        data: Object.keys(data).map(key => ({
          name: key,
          y: data[key]
        }))
      } as any],
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
          }
        }
      }
    } as Highcharts.Options);
  }

  createChartLieu(containerId: string, titleText: string, data: any) {
    Highcharts.chart(containerId, {
      chart: {
        type: 'pie'
      },
      title: {
        text: titleText,
        align: 'left'
      },
      tooltip: {
        valueSuffix: '%'
      },
      subtitle: {
        text: 'Source: <a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            distance: 20,
            format: '{point.name}: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        data: Object.keys(data).map(key => ({
          name: key,
          y: data[key]
        }))
      } as Highcharts.SeriesPieOptions],
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
          }
        }
      }
    } as Highcharts.Options);
  }
  createHisto(data: any): void {
    const labels = ['Participation'];
    const ouiData = [data.oui];
    const nonData = [data.non];
    const totalData = [data.total];
  
    const ctx = document.getElementById('Myhisto') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: "Oui",
              data: ouiData,
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              barThickness: 50 // Ajustez la largeur des barres ici
            },
            {
              label: "Non",
              data: nonData,
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              barThickness: 50 // Ajustez la largeur des barres ici
            },
            {
              label: "Total",
              data: totalData,
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              barThickness: 50 // Ajustez la largeur des barres ici
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                boxWidth: 20,
                padding: 20,
              }
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
              }
            },
            y: {
              beginAtZero: true,
              display: true,
              title: {
                display: true,
                text: 'Total'
              }
            }
          },
          aspectRatio: 2.5
        }
      });
    } else {
      console.error('Canvas element with ID "Myhisto" not found.');
    }
  }
  
}
