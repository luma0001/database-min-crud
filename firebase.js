"use strict";

window.addEventListener("load", start);

const endpoint =
  "https://luma0001-c50c8-default-rtdb.europe-west1.firebasedatabase.app";

function start() {
  const posts = getPosts(`${endpoint}/posts.json`);
  console.log(posts);
  showPosts(posts);
}

async function getPosts(endpoint) {
  const postFetcher = await fetch(endpoint);
  const data = await postFetcher.json();
  const posts = preparePostData(data);

  console.log(posts);
  return posts;
}

function preparePostData(metaObject) {
  const localArray = [];
  for (const object in metaObject) {
    const post = metaObject[object];
    post.id = object;
    localArray.push(post);
  }
  console.log(localArray);
  return localArray;
}

function showPosts(objectArray) {
  // console.log(objectArray);
  // objectArray.forEarch(showPost);
  for (const i = 0; i < objectArray.length; i++) {
    const object = objectArray[i];
    showPost(object);
  }
}

function showPost(postObject) {
  console.log("hurra");
  const elementHTML = /*html*/ `
  <p>${postObject.title}</p> 
  <img scr= ${postObject.image}/> `;
  document
    .querySelector("#jsonObjects")
    .insertAdjacentHTML("beforeend", elementHTML);
}

//
// -- parse/ stringify
