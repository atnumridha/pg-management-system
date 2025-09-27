import { Component, OnInit } from '@angular/core';
import { MetricsService, MetricsSummary } from '../metrics.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  metrics?: MetricsSummary;
  loading = true;
  error = '';

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.metricsService.getSummary().subscribe({
      next: result => {
        this.metrics = result;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not fetch dashboard metrics';
        this.loading = false;
      }
    });
  }
}
