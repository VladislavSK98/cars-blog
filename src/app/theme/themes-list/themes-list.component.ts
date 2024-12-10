import { Component, OnInit } from '@angular/core';
import { FirebasePostService} from '../../services/firebase-post.service';
import { Theme } from '../../types/theme';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink, RouterModule } from '@angular/router';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-themes-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink, SlicePipe, DatePipe, RouterModule],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.css',
})
export class ThemesListComponent implements OnInit {
  themes: Theme[] = [];
  isLoading = true;

  constructor(private firebasePostService: FirebasePostService) {}

  ngOnInit() {
    this.firebasePostService.getThemes().subscribe((themes) => {
      this.themes = themes;
      this.isLoading = false;
    });
  }
}
