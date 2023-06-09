import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TabsComponent } from './components/ui/tabs/tabs.component';
import { PanelComponent } from './components/ui/panel.component';
import { TabComponent } from './components/ui/tabs/tab.component';
import { TodayComponent } from './components/feature/today/today.component';
import { AboutComponent } from './components/feature/about/about.component';
import { NgOptimizedImage } from '@angular/common';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TabsComponent,
    PanelComponent,
    TabComponent,
    TodayComponent,
    AboutComponent,
    NgOptimizedImage,
    SpinnerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
