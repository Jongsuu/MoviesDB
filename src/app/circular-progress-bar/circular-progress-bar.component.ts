import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.css']
})
export class CircularProgressBarComponent implements OnInit {
  @Input() maxValue = 0;
  currentValue = 0;
  time = 5;
  progressIndicator = "none";
  @Input() color: "red" | "blue" = "red";
  private colors = {
    red: { completed: "#e3142d", incompleted: "#d6a7ad" },
    blue: { completed: "#4d5bf9", incompleted: "#cadcff" }
  };

  ngOnInit(): void {
    this.maxValue = Number((this.maxValue * 10).toFixed());
    let selectedColors = this.colors[this.color];

    let progress = setInterval(() => {
      this.currentValue++;
      this.progressIndicator = `conic-gradient(${selectedColors.completed} ${this.currentValue * 3.6}deg, ${selectedColors.incompleted} ${this.currentValue * 3.6}deg)`;
      if (this.currentValue === this.maxValue)
        clearInterval(progress);
    }, this.time);
  }
}
