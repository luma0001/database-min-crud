"use strict";

window.addEventListener("load", start);

const endpoint =
  "https://luma0001-c50c8-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  const posts = await getPosts(`${endpoint}/posts.json`);
  const users = await getUsers(`${endpoint}/users.json`);

  showPosts(posts);
  showUsers(users);

  createPost(
    "My First Post",
    "My body text",
    "https://images.unsplash.com/photo-1641876749963-550554c7258d"
  );
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
  <article class = "grid-element">
  <p>title: ${postObject.title}</p> 
  <img src= ${postObject.image}/>
  <p>uid: ${postObject.uid}</p>
  <P>Body: ${postObject.body}</P>
  <button class="btn-update">Update</button>
  <button class="btn-delete">Delete</button>
  </article> `;

  //Tilføj click event til delete knappen

  document
    .querySelector("#jsonPosts")
    .insertAdjacentHTML("beforeend", elementHTML);

  document
    .querySelector("#jsonPosts")
    .addEventListener("click", deleteSelected);

  // document
  //   .querySelector("#jsonPosts section:last-child .btn-update")
  //   .addEventListener("click", updateClicked);

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

// function updateClicked() {
//   const title = `${postObject.title} Updated`;
//   const body = `Jeg orker ikke at skrive volapyk`;
//   const image =
//     "https://images.unsplash.com/photo-1642049888276-9c9f0a1a8758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTA4MTB8MHwxfGFsbHwyfHx8fHx8Mnx8MTY0MjA3NTAwMQ&ixlib=rb-1.2.1&q=80&w=400";

//   updatePost(title, body, image);
// }

function deleteSelected() {}

function updatePost(title, body, image) {
  console.log("UPDATE!!!");
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

async function createPost(title, image, body) {
  const newPost = {
    title: title,
    image: image,
    body: body,
  };
  const postAsJson = JSON.stringify(newPost);
  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: postAsJson,
  });
  const data = await response.json();
  console.log(data);

  getPosts();
}

//
// -- parse/ stringify
