import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from 'angular-highcharts';


//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

// Component Material Design
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';


//
import { MatToolbarModule, 
  MatInputModule,
  MatButtonModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatListModule,
  MatTabsModule,
  MatCardModule } from '@angular/material';

// My Components
import { NavComponent } from './nav/nav.component';
import { InfoStudentsComponent } from './info-students/info-students.component'

const appRoutes: Routes = [
{ path: 'students', component: InfoStudentsComponent },

  
];
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
   InfoStudentsComponent,
   
  
  
 
  ],
  imports: [

    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    AngularFireDatabaseModule,
     BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
  
    
    //
    MatInputModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
