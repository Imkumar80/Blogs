const postGrid = document.querySelector("#post-grid");
const postCount = document.querySelector("#post-count");
const searchInput = document.querySelector("#post-search");
const categoryFilters = document.querySelector("#category-filters");
let posts = [];
let activeCategory = "All";

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function renderFilters() {
  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  categoryFilters.replaceChildren();

  for (const category of categories) {
    const button = createElement("button", "filter-button", category);
    button.type = "button";
    button.setAttribute("aria-pressed", String(category === activeCategory));
    button.addEventListener("click", () => {
      activeCategory = category;
      renderFilters();
      renderPosts();
    });
    categoryFilters.append(button);
  }
}

function renderPosts() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const visiblePosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const searchableText = [post.title, post.excerpt, post.category, ...post.tags]
      .join(" ")
      .toLocaleLowerCase();
    return matchesCategory && searchableText.includes(query);
  });

  postCount.textContent = `${visiblePosts.length} ${visiblePosts.length === 1 ? "post" : "posts"}`;
  postGrid.replaceChildren();

  if (visiblePosts.length === 0) {
    postGrid.append(createElement("p", "empty-state", "No posts match that search. Try another topic or category."));
    return;
  }

  for (const post of visiblePosts) {
    const card = createElement("article", "post-card");
    const topline = createElement("div", "post-topline");
    topline.append(
      createElement("span", "post-category", post.category),
      createElement("time", "", formatDate(post.date)),
    );
    topline.lastElementChild.dateTime = post.date;

    const title = createElement("h3", "", post.title);
    const excerpt = createElement("p", "", post.excerpt);
    const tags = createElement("div", "tag-list");
    tags.setAttribute("aria-label", "Tags");
    for (const tag of post.tags) tags.append(createElement("span", "tag", `#${tag}`));

    const link = createElement("a", "text-link", "Read article →");
    link.href = post.url;
    card.append(topline, title, excerpt, tags, link);
    postGrid.append(card);
  }
}

async function loadPosts() {
  try {
    const response = await fetch("posts/posts.json");
    if (!response.ok) throw new Error(`Could not load posts (${response.status}).`);

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("The post index must contain a JSON array.");

    posts = data
      .map((post) => {
        if (
          !post ||
          typeof post.title !== "string" ||
          typeof post.excerpt !== "string" ||
          typeof post.category !== "string" ||
          typeof post.date !== "string" ||
          typeof post.url !== "string" ||
          !Array.isArray(post.tags) ||
          !post.tags.every((tag) => typeof tag === "string")
        ) {
          throw new Error("A post entry is missing a required field.");
        }
        return post;
      })
      .sort((first, second) => second.date.localeCompare(first.date));

    renderFilters();
    renderPosts();
  } catch (error) {
    postGrid.replaceChildren(
      createElement("p", "empty-state", "Posts could not be loaded. Check posts/posts.json and refresh the page."),
    );
    postCount.textContent = "Post index unavailable";
    console.error("Blog post index failed to load:", error);
  }
}

searchInput.addEventListener("input", renderPosts);
loadPosts();
