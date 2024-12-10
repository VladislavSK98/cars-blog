import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { ProfileDetails } from '../../types/user';
import { UserService } from '../user.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isEditMode: boolean = false;
  isLoading: boolean = true;
  error: string | null = null;

  profileDetails: ProfileDetails = {
    username: '',
    email: '',
    tel: '',
  };

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl(''),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const user = this.userService.user;

    if (!user) {
      this.error = 'No user is currently logged in.';
      this.isLoading = false;

      // Пренасочване към страница за вход
      this.router.navigate(['/login']);
      return;
    }

    const { username, email, tel } = user;
    this.profileDetails = { username, email, tel: tel! };

    this.form.setValue({
      username,
      email,
      tel: tel!,
    });

    this.isLoading = false;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  handleSaveProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;

    const { username, email, tel } = this.profileDetails;

    this.userService.updateProfile(username, email, tel).subscribe({
      next: () => this.toggleEditMode(),
      error: (err) => {
        this.error = 'Failed to update profile: ' + err.message;
      },
    });
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }
}
