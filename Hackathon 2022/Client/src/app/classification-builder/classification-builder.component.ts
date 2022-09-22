import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash'
import { firstValueFrom } from 'rxjs';
import { ComposerService } from '../services/composer.service';


export interface classificationItem {
  id: number;
  prompt: string;
  type: string;
  options: string[];
  addOtherOption: boolean;
  value: any;
}

@Component({
  selector: 'app-classification-builder',
  templateUrl: './classification-builder.component.html',
  styleUrls: ['./classification-builder.component.css']
})
export class ClassificationBuilderComponent implements OnInit {
  experimentName: string = '';
  experimentDescription: string = '';
  counter: number = 0;
  shouldShowNarrativeBuilder: boolean = false;
  state: number = 0;

  classificationItems: classificationItem[] = [];
  classificationTypes: string[] = [
    "Text",
    "Number",
    "Date",
    "List Picker",
    "Checkbox Picker"
  ]

  public static classificationLink: string = 'http://localhost:2020/upload';

  constructor(private http: HttpClient, private router: Router, private composer: ComposerService) { }

  addClassificationItem() {
    this.classificationItems.push({
      id: this.counter++,
      prompt: '',
      type: this.classificationTypes[0],
      options: [],
      addOtherOption: false,
      value: null
    })
  }

  removeClassification(id: number) {
    _.remove(this.classificationItems, item => item.id == id);
  }

  needsList(item: classificationItem): boolean {
    return item.type.includes("Picker");
  }

  addToOptionsList(item: classificationItem, newOption: string) {
    item.options = _.union(item.options, [newOption]);
  }

  removeOption(list: string[], option: string) {
    _.remove(list, s => s == option);
  }

  async save() {
    const json = JSON.stringify(this.classificationItems);
    let upload$ = this.http.post(ClassificationBuilderComponent.classificationLink, json, { headers: { "Content-Type": "application/json" } });
    let result = await firstValueFrom(upload$) as { location: string };
    this.shouldShowNarrativeBuilder = true;
    this.composer.setClassification(result.location);
    this.state = 2;
    //window.open(`http://localhost:4200/nar/${result.location}`, "_blank");
  }

  ngOnInit(): void {
    this.http.get(ClassificationBuilderComponent.classificationLink).subscribe(res => {
      this.classificationItems = res as classificationItem[];
      if (!_.isEmpty(this.classificationItems))
        this.counter = _.maxBy(this.classificationItems, item => item.id)!.id + 1;
    }
    )
  }

  next() {
    this.state = 1;
    this.composer.setNameAndDescription(this.experimentName, this.experimentDescription);
  }
}
