import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";

export const cookieslog = new Cookies();
export const email = cookieslog.get("user");
export function CommonScripts() {
  return <div></div>;
}

export function genRand(nums_set) {
  while (nums_set.size < 15) {
    let num = Math.floor(Math.random() * 71) * 3;
    nums_set.add(num);
  }
  nums_set = Array.from(nums_set).sort((a, b) => a - b);
  return nums_set;
}
