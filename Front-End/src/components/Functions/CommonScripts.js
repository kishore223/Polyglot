import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";

export const cookieslog = new Cookies();
export const email = cookieslog.get("user");
export function CommonScripts() {
  return <div></div>;
}

export function genRand(nums_set) {
  while (nums_set.size < 10) {
    let num = Math.floor(Math.random() * 69) * 3;
    nums_set.add(num);
  }
  nums_set = Array.from(nums_set).sort((a, b) => a - b);
  return nums_set;
}

export function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
