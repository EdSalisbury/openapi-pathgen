import pathsJson from "./templates/paths.json" assert { type: "json" };
import getAllJson from "./templates/getAll.json" assert { type: "json" };
import postJson from "./templates/post.json" assert { type: "json" };
import getJson from "./templates/get.json" assert { type: "json" };
import putJson from "./templates/put.json" assert { type: "json" };
import patchJson from "./templates/patch.json" assert { type: "json" };
import deleteJson from "./templates/delete.json" assert { type: "json" };

const sname = "owner";
const lname = "owner";

const getAllPath = replaceStrings(getAllJson, sname, lname);
const postPath = replaceStrings(postJson, sname, lname);
const getPath = replaceStrings(getJson, sname, lname);
const putPath = replaceStrings(putJson, sname, lname);
const patchPath = replaceStrings(patchJson, sname, lname);
const deletePath = replaceStrings(deleteJson, sname, lname);

const pathsObj = replaceStrings(pathsJson, sname, lname);
let pathsStr = JSON.stringify(pathsObj);

pathsStr = pathsStr.replace('"${getAll}"', JSON.stringify(getAllPath));
pathsStr = pathsStr.replace('"${post}"', JSON.stringify(postPath));
pathsStr = pathsStr.replace('"${get}"', JSON.stringify(getPath));
pathsStr = pathsStr.replace('"${put}"', JSON.stringify(putPath));
pathsStr = pathsStr.replace('"${patch}"', JSON.stringify(patchPath));
pathsStr = pathsStr.replace('"${delete}"', JSON.stringify(deletePath));

const paths = JSON.parse(pathsStr);

console.log(JSON.stringify(paths, null, 2));

function replaceStrings(jsonObj, sname, lname) {
  let template = JSON.stringify(jsonObj);
  template = template.replaceAll("${sname}", sname);
  template = template.replaceAll("${lname}", lname);
  return JSON.parse(template);
}
