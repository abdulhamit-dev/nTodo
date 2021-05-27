import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  allNotes: any;
  notAd: string;
  constructor(private noteService: NotesService,public authService: AuthService,private router: Router) {}

  ngOnInit() {
    this.notGetir();
  }

  notGetir() {
    this.noteService.getProducts().subscribe((rv) => {
      this.allNotes = rv;
    });
  }

  kaydet($event) {
    this.noteService.addNotes({note: this.notAd,userId:this.noteService.uid});
    this.notAd='';
  }
}
