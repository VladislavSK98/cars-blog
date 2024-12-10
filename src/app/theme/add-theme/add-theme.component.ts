import { Component } from '@angular/core';
import { FirebasePostService} from '../../services/firebase-post.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-theme',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './add-theme.component.html',
  styleUrl: './add-theme.component.css',
})
export class AddThemeComponent {
  constructor(private firebasePostService: FirebasePostService, private router: Router) {}

  addTheme(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { themeName, postText } = form.value;

    this.firebasePostService.createTheme(themeName, postText).subscribe(() => {
      this.router.navigate(['/themes']);
    });
  }
}
