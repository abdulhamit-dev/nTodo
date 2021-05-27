import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  uid: string;
  constructor(private fireStore: AngularFirestore) {
    this.uid=JSON.parse(localStorage.getItem('user')).uid;
  }

  getProducts() {
     return this.fireStore.collection('notes',ref=>ref.where('userId','==',this.uid)).snapshotChanges();
  }

  addNotes(not: any) {
    return new Promise<any>((resolve, reject) => {
      this.fireStore
        .collection('notes')
        .add(not)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }
}
