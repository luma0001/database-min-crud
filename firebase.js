"use strict";

window.addEventListener("load", start);

const endpoint =
  "https://luma0001-c50c8-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  const posts = await getPosts(`${endpoint}/posts.json`);
  const users = await getUsers(`${endpoint}/users.json`);

  showPosts(posts);
  console.log(posts);
  showUsers(users);
  console.log(users);
}

async function getPosts(endpoint) {
  const postFetcher = await fetch(endpoint);

  const data = await postFetcher.json();
  const users = prepareData(data);

  return users;
}

async function getUsers(endpoint) {
  const userFetcher = await fetch(endpoint);
  const data = await userFetcher.json();
  const users = prepareData(data);

  return users;
}

function prepareData(metaObject) {
  const localArray = [];
  for (const object in metaObject) {
    const post = metaObject[object];
    post.id = object;
    localArray.push(post);
  }
  return localArray;
}

function showPosts(objectArray) {
  for (const postObject of objectArray) {
    console.log(postObject);
    showPost(postObject);
  }
}

function showPost(postObject) {
  // console.log("hurra");
  const elementHTML = /*html*/ `
  <section class = "grid-element">
  <p>title: ${postObject.title}</p> 
  <img src= ${postObject.image}/>
  <p>uid: ${postObject.uid}</p>
  <P>Body: ${postObject.body}</P>
  </section> `;

  // <p>Name: ${postObject.name}</p>
  // <p>Mail: ${postObject.mail}</p>
  // <p>phone: $${postObject.phone}</p>

  document
    .querySelector("#jsonPosts")
    .insertAdjacentHTML("beforeend", elementHTML);

  document
    .querySelector("#jsonPosts section:last-child")
    .addEventListener("click", showDialog);

  function showDialog() {
    document.querySelector("dialog").showModal();
    //DOM manipulation i modal
    document.querySelector("#dialogTitle").textContent = postObject.title;
    document.querySelector("#dialogImage").src = postObject.image;

    document.querySelector("dialog").showModal();
  }
}

function showUsers(usersArray) {
  for (const userObject of usersArray) {
    console.log(userObject);
    showUser(userObject);
  }
}

function showUser(userObject) {
  const elementHTML = /*html*/ `
  <section class = "grid-element">
  <p>name: ${userObject.name}</p>
  <img src= ${userObject.image}/>
  <p>title: ${userObject.title}</p> 
  <P>phone: ${userObject.phone}</P>
  <p>mail: ${userObject.mail}</p>
  <P>phone: ${userObject.phone}</P>
  </section> `;

  // <p>Name: ${postObject.name}</p>
  // <p>Mail: ${postObject.mail}</p>
  // <p>phone: $${postObject.phone}</p>

  document
    .querySelector("#jsonUsers")
    .insertAdjacentHTML("beforeend", elementHTML);

  document
    .querySelector("#jsonUsers section:last-child")
    .addEventListener("click", showDialog);

  function showDialog() {
    document.querySelector("dialog").showModal();
    //DOM manipulation i modal
    document.querySelector("#dialogTitle").textContent = userObject.title;
    document.querySelector("#dialogImage").src = userObject.image;

    document.querySelector("dialog").showModal();
  }
}

function createPost(title, image, body) {
  const newPost = {
    title,
    image,
    body,
  };
}

//
// -- parse/ stringify
