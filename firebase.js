"use strict";

window.addEventListener("load", start);

function start() {
  const endpoint = getPosts(
    "https://luma0001-c50c8-default-rtdb.europe-west1.firebasedatabase.app"
  );
  console.log(endpoint);
  showPosts(endpoint);
}

async function getPosts(endpoint) {
  const postFetcher = await fetch(`${endpoint}/posts.json`);
  const data = await postFetcher.json();
  console.log(data);
  const posts = preparePostData(data);

  return posts;
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

function showPosts(objectArray) {
  for (const object in objectArray) {
    showPost(object);
  }
}

