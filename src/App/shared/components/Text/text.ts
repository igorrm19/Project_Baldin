import template from "./text.html?raw"
import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"

export class TextHTML extends BaseModel{
  containerText: HTMLElement

  constructor(){
    super("div", template)
    this.containerText = document.createElement("div")
  }

}