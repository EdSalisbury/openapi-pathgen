import pathsJson from "./templates/paths.json" assert { type: "json" };
import getAllJson from "./templates/getAll.json" assert { type: "json" };
import postJson from "./templates/post.json" assert { type: "json" };
import getJson from "./templates/get.json" assert { type: "json" };
import putJson from "./templates/put.json" assert { type: "json" };
import patchJson from "./templates/patch.json" assert { type: "json" };
import deleteJson from "./templates/delete.json" assert { type: "json" };

if (process.argv.length < 4) {
  console.error("Usage: openapi-pathgen <shortname> <longname>");
  process.exit(1);
}

const names = process.argv.slice(2);

let allPaths = {
  paths: {},
};

names.forEach((name) => {
  const getAllPath = replaceStrings(getAllJson, name);
  const postPath = replaceStrings(postJson, name);
  const getPath = replaceStrings(getJson, name);
  const putPath = replaceStrings(putJson, name);
  const patchPath = replaceStrings(patchJson, name);
  const deletePath = replaceStrings(deleteJson, name);
  const pathsObj = replaceStrings(pathsJson, name);

  let pathsStr = JSON.stringify(pathsObj);

  pathsStr = pathsStr.replace('"${getAll}"', JSON.stringify(getAllPath));
  pathsStr = pathsStr.replace('"${post}"', JSON.stringify(postPath));
  pathsStr = pathsStr.replace('"${get}"', JSON.stringify(getPath));
  pathsStr = pathsStr.replace('"${put}"', JSON.stringify(putPath));
  pathsStr = pathsStr.replace('"${patch}"', JSON.stringify(patchPath));
  pathsStr = pathsStr.replace('"${delete}"', JSON.stringify(deletePath));

  const newPaths = JSON.parse(pathsStr);
  allPaths.paths = { ...allPaths.paths, ...newPaths };
});

console.log(JSON.stringify(allPaths, null, 2));

function replaceStrings(jsonObj, name) {
  let template = JSON.stringify(jsonObj);
  template = template.replaceAll("${name}", name);
  return JSON.parse(template);
}
