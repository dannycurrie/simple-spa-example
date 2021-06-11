const createElement = (type, options = {}) => {
  const element = document.createElement(type);

  for (let key of Object.keys(options)) {
    if (key == "parent") options.parent.appendChild(element);
    else element[key] = options[key];
  }

  return element;
};

const clearElementChildren = (element) => (element.textContent = "");

const setupLinks = (app, content) => {
  const linkContainer = createElement("div", {
    parent: app,
    id: "link-container",
  });

  const changeRoute = (event) => {
    const page = event.currentTarget["data-page"] || "NA";
    window.history.pushState({ page }, `page: ${page}`, `/${page}`);
    clearElementChildren(content);
    createElement("h1", {
      parent: content,
      textContent: `Content for page ${page}`,
    });
  };

  const linkOne = createElement("a", {
    parent: linkContainer,
    textContent: "one",
    "data-page": "one",
  });

  linkOne.addEventListener("click", changeRoute);

  const linkTwo = createElement("a", {
    parent: linkContainer,
    textContent: "two",
    "data-page": "two",
  });

  linkTwo.addEventListener("click", changeRoute);

  const linkThree = createElement("a", {
    parent: linkContainer,
    textContent: "three",
    "data-page": "three",
  });

  linkThree.addEventListener("click", changeRoute);
};

// SET UP APP

const app = document.querySelector("#app");

const contentContainer = createElement("div", {
  parent: app,
  id: "content",
});

setupLinks(app, contentContainer);
