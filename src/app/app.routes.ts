import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddThemeComponent } from './theme/add-theme/add-theme.component';
import { MainComponent } from './main/main.component';
import { CurrentThemeComponent } from './theme/current-theme/current-theme.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { MyGarageComponent } from './my-garage/my-garage.component'; 
import { BlogComponent } from './blog/blog.component';
import { NewPostComponent } from './new-post/new-post.component';
import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { PostDetailsComponent } from './post-details/post-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // Start - User routing
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  // End - User routing

  // Start - Theme routing
  {
    path: 'themes',
    children: [
      { path: '', component: MainComponent },
      {
        path: ':themeId',
        component: CurrentThemeComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'add-theme',
    loadComponent: () =>
      import('./theme/add-theme/add-theme.component').then(
        (c) => c.AddThemeComponent
      ),
    canActivate: [AuthGuard],
  },
  // End - Theme routing

  { path: 'my-garage', component: MyGarageComponent, canActivate: [AuthGuard]},
  { path: 'blog', component: BlogComponent, },
  { path: 'add-post', component: NewPostComponent, canActivate: [AuthGuard] },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/:carId/edit', component: EditCarComponent, canActivate: [AuthGuard]},
  { path: 'cars/:carId/details', component: CarDetailsComponent },
  { path: 'cars/:id', component: CarDetailsComponent},
  { path: 'blog/:id', component: PostDetailsComponent },
  { path: '404', component: PageNotFoundComponent },  
  { path: '**', redirectTo: '/404' },
];
