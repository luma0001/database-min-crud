"use strict";

window.addEventListener("load", start);

const endpoint =
  "https://luma0001-c50c8-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  const posts = await getPosts(`${endpoint}/posts.json`);

  showPosts(posts);
}

async function getPosts(endpoint) {
  const postFetcher = await fetch(endpoint);
  const data = await postFetcher.json();
  const posts = preparePostData(data);

  console.log("Array");
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
  return localArray;
}

function showPosts(objectArray) {
  // console.log(objectArray);
  // objectArray.forEarch(showPost);
  for (const object of objectArray) {
    showPost(object);
  }
}

function showPost(postObject) {
  // console.log("hurra");
  const elementHTML = /*html*/ `
  <section class = "grid-element">
  <p>${postObject.title}</p> 
  <img src= ${postObject.image}/>
  </section> `;

  document
    .querySelector("#jsonObjects")
    .insertAdjacentHTML("beforeend", elementHTML);

  document
    .querySelector("#jsonObjects section:last-child")
    .addEventListener("click", showDialog);

  function showDialog() {
    document.querySelector("dialog").showModal();
    //DOM manipulation i modal
    document.querySelector("#dialogTitle").textContent = postObject.title;
    document.querySelector("#dialogImage").src = postObject.image;

    document.querySelector("dialog").showModal();
  }
}

//
// -- parse/ stringify
