import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) { }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.initSnackBar('Copied!');
  }

  initSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}