import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson';

@Injectable()

export class UserService {
  private lessonChosen: Lesson[];// set of lessons chosen by the user for revision
  private option: number;
  private modeOfResponse: number;// 0: 1 out of 4        1: Type it yourself
  private modeWords: number;// 0: all words from chosen lessons    1: only non-guessed words fron chosen lessons
  private allLessons: Lesson[];// all lessons of the user


  setAllLessons(lessons: Lesson[]) {
    this.allLessons = lessons;
    this.sortLessons();
  }
  getAllLessons() {
    return this.allLessons;
  }
  sortLessons() {
    this.allLessons.sort(function(lesson1, lesson2) {
      if (lesson1.date < lesson2.date) {
        return -1;
      } else if (lesson1.date > lesson2.date) {
        return 1;
      } else {
        return 0;
      }
    });

  }
  chooseLesson(lesson: Lesson[]) {
    this.lessonChosen=[];
    for(var i=0;i<lesson.length;i++){
        this.lessonChosen.push(Object.assign({}, lesson[i]));
    }
  }
  chooseLessonByNr(nrs: number[]){
    this.lessonChosen=[];
    for(var i=0;i<nrs.length;i++){
      this.lessonChosen.push(Object.assign({},this.allLessons[nrs[i]]));
    }
  }
  chooseAllLessons(){
    this.lessonChosen=[];
    for(var i=0;i<this.allLessons.length;i++){
        this.lessonChosen.push(Object.assign({}, this.allLessons[i]));
    }
  }
  chooseOption(option: number) {
    this.option = option;
  }
  getOption() {
    return this.option;
  }
  getLesson() {
    return this.lessonChosen;
  }
  getModeOfResponse() {
    return this.modeOfResponse;
  }
  getModeWords() {
    return this.modeWords;
  }

  setModeOfResponse(mode: number) {
    this.modeOfResponse = mode;
  }
  setModeWords(mode: number) {
    this.modeWords = mode;
  }
}
