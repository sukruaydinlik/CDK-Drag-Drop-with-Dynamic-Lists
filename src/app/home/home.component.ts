import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  droppableLists: List[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initData();
  }

  addList(): void {
    let list: List = { elements: [] };
    this.droppableLists.push(list);
  }

  addElement(selectedList: List): void {
    const element: Element = { content: 'content' };
    selectedList.elements.push(element);
  }

  drop(event: CdkDragDrop<List[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  initData(){
    for (let index = 0; index < 5; index++) {
      this.addList();
      for (let j = 0; j < 5; j++) {
        const element: Element = { content: `element #${j} of list #${index}` };
        this.droppableLists[index].elements.push(element);
      }
    }
  }
}

interface List {
  elements: Element[];
}

interface Element {
  content: string;
}
