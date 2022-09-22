import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _, { Dictionary, NumericDictionary } from 'lodash';
import { ClassificationBuilderComponent, classificationItem } from '../classification-builder/classification-builder.component';
import { TrackService } from '../services/track.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-classification-player',
  templateUrl: './classification-player.component.html',
  styleUrls: ['./classification-player.component.css']
})
export class ClassificationPlayerComponent implements OnInit {

  classificationItems: classificationItem[] = [];
  selected: string = '';
  classifyName: string = '';
  filename: string = '';
  userId: string = '';

  constructor(private http: HttpClient,
    private route: ActivatedRoute, private track: TrackService) { }

  ngOnInit(): void {
    this.classifyName = this.route.snapshot.paramMap.get('classifyName') ?? '';
    this.filename = this.route.snapshot.paramMap.get('filename') ?? '';
    this.loadData();
    this.userId = v4()
  }

  loadData(): void {
    this.http.get(`http://localhost:2020/play/${this.classifyName}`).subscribe(res => {
      this.classificationItems = JSON.parse(res as string);
      this.classificationItems = this.classificationItems.map(item => {
        if (this.isCheckboxType(item.type)) {
          return { ...item, value: _.fill(Array(item.options.length), false) }
        }
        return item;
      })
    });
  }

  isInputType(itemType: string): any {
    return _.includes(["Text", "Number", "Date"], itemType);
  }
  isListType(itemType: string): any {
    return itemType === "List Picker";
  }
  isCheckboxType(itemType: string): any {
    return itemType === "Checkbox Picker";
  }


  done() {
    this.classificationItems.map((item) => {
      this.track.track(`{ "payload": "${this.userId},${item.value}" }`, "classification");
      return item;
    })

    window.open(`http://localhost:4200/play/${this.filename}/userId/${this.userId}`, "_blank");
  }

}
