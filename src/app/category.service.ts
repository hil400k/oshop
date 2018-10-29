import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getAll() {
    return this.db.list('/categories')
      .snapshotChanges()
      .pipe(
        map(categories => {
          return categories.map(cat => ({
            key: cat.key,
            name: (<any>cat.payload.val()).name
          }));
        })
      );
  }
}
