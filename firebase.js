"use strict";

window.addEventListener("load", start);

const endpoint =
  "https://luma0001-c50c8-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  // const users = await getUsers(`${endpoint}/users.json`);

  updatePostsGrid();

  // createPost(
  //   "My First Post",
  //   "My body text",
  //   "https://images.unsplash.com/photo-1641876749963-550554c7258d"
  // );
}

async function updatePostsGrid() {
  console.log("updating!");
  const posts = await getPosts(`${endpoint}/posts.json`);
  showPosts(posts);
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
  document.querySelector("#jsonPosts").innerHTML = "";
  for (const postObject of objectArray) {
    // console.log(postObject);
    showPost(postObject);
  }
}

function showPost(postObject) {
  console.log(postObject);
  const elementHTML = /*html*/ `
  <article id= "POSTID-${postObject.uid}" class = "grid-element">
  <p>title: ${postObject.title}</p> 
  <img src= ${postObject.image}/>
  <p>uid: ${postObject.uid}</p>
  <P>Body: ${postObject.body}</P>
  <button class="btn-update">Update</button>
  <button class="btn-delete">Delete</button>
  <article/>
  `;

  //Tilføj click event til delete knappen

  document
    .querySelector("#jsonPosts")
    .insertAdjacentHTML("beforeend", elementHTML);

  document
    .querySelector("#jsonPosts article:last-child .btn-delete")
    .addEventListener("click", deleteClicked);

  document
    .querySelector("#jsonPosts article:last-child .btn-update")
    .addEventListener("click", updateClicked);

  // document
  //   .querySelector("#jsonPosts article:last-child")
  //   .addEventListener("click", showDialog);

  function showDialog() {
    document.querySelector("dialog").showModal();
    //DOM manipulation i modal
    document.querySelector("#dialogTitle").textContent = postObject.title;
    document.querySelector("#dialogImage").src = postObject.image;

    document.querySelector("dialog").showModal();
  }

  function updateClicked() {
    console.log("Clicked!");
    //what is .this
    const title = `${postObject.title} Updated`;
    const body = `Jeg orker ikke at skrive volapyk`;
    const image =
      "https://images.unsplash.com/photo-1642049888276-9c9f0a1a8758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTA4MTB8MHwxfGFsbHwyfHx8fHx8Mnx8MTY0MjA3NTAwMQ&ixlib=rb-1.2.1&q=80&w=400";

    updatePost(postObject.id, title, body, image);
  }

  function deleteClicked() {
    console.log("delete cliked");
    deletePost(postObject.id);
  }
}

async function deletePost(id) {
  const url = `${endpoint}/posts/${id}.json`;
  const res = await fetch(url, { method: "DELETE" });

  if (res.ok) {
    console.log("This post is deleted");
    updatePostsGrid();
  }
}

async function updatePost(id, title, body, image) {
  // få postID med, split den og få -uid!
  const postToUpdate = { title, body, image };
  const postAsJson = JSON.stringify(postToUpdate);
  const url = `${endpoint}/posts/${id}/.json`;

  const res = await fetch(url, { method: "PUT", body: postAsJson });
  const data = await res.json();
  updatePostsGrid();
}

function showUsers(usersArray) {
  for (const userObject of usersArray) {
    // console.log(userObject);
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
