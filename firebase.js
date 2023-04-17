"use strict";

window.addEventListener("load", start);

function start() {
  const endpoint = getPosts(
    "https://luma0001-c50c8-default-rtdb.europe-west1.firebasedatabase.app"
  );
  getPosts();
}

async function getPosts() {
  const postFetcher = await fetch(
    `https://luma0001-c50c8-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
  );
  const data = await postFetcher.json();
  console.log(data);
  const posts = preparePostData(data);
  console.log(posts);
}

function preparePostData(metaObject) {
  const localArray = [];
  for (const object in metaObject) {
    const post = metaObject[object];
    post.id = object;
    localArray.push(post);
  }
  return localArray;
}
