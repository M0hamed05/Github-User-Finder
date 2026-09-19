import { elements } from "./elements.js";
import { Mainlogic } from "./logic.js";

export class Ui {
  static displayUserData(userObject, userRepos) {
    if (!userObject) {
      elements.containers.userProfileContainer.style.display = "none";
      elements.repos.reposList.style.display = "none";
      return;
    }
    elements.containers.userProfileContainer.style.display = "grid";
    elements.userProfile.avatar.src = "";
    elements.userProfile.avatar.src = userObject.avatar_url;
    elements.userProfile.bio.textContent = userObject.bio || "No bio available";
    elements.userProfile.totalRepos.textContent = userObject.public_repos;
    elements.userProfile.following.textContent = userObject.following;
    elements.userProfile.followers.textContent = userObject.followers;
    elements.userProfile.username.textContent = userObject.login;
    elements.userProfile.name.textContent = userObject.name;
    elements.userProfile.createdAt.textContent = userObject.created_at;

    elements.contactInfo.company.textContent =
      userObject.company || "Not available";
    elements.contactInfo.email.textContent =
      userObject.email || "Not available";
    if (userObject.blog) {
      elements.contactInfo.blog.setAttribute("href", userObject.blog);
      elements.contactInfo.blog.textContent = userObject.blog;
    } else {
      elements.contactInfo.blog.textContent = "Not available";
      elements.contactInfo.blog.removeAttribute("href");
    }
    elements.contactInfo.location.textContent =
      userObject.location || "Not available";
    elements.contactInfo.githubLink.textContent = userObject.html_url;
    elements.contactInfo.githubLink.href = userObject.html_url;

    elements.inputs.username.value = "";
    this.#displayUserRepos(userRepos);
  }
  static #displayUserRepos(userRepos) {
    let userReposFiltered = Mainlogic.getReposListFiltered(userRepos);
    // console.log(userReposFiltered);
    elements.userProfile.topLanguage.textContent =
      Mainlogic.getMostUsedLanguage(userReposFiltered) || "N/A";

    if (userReposFiltered.length === 0) return;

    console.log(userReposFiltered.length);

    elements.repos.reposList.innerHTML = "<div><h3>Latest Repos</h3></div>";
    elements.repos.reposList.style.display = "flex";

    if (userReposFiltered.length > 3) userReposFiltered.length = 3;
    // for (repoRow in userReposFiltered) {
    for (const repoRow of userReposFiltered) {
      this.#addRepoRow(repoRow);
    }
    this.#applyThemeRepos();
  }
  static #addRepoRow(repoObject) {
    const repoContainer = document.createElement("div");
    repoContainer.classList.add("repo-row");

    const repoHeaeder = document.createElement("a");
    repoHeaeder.classList.add("repo-link");
    repoHeaeder.href = repoObject.link; //note name of map created after fliter not api
    repoHeaeder.textContent = repoObject.name || "";
    repoHeaeder.target = "_blank";
    repoContainer.appendChild(repoHeaeder);

    const repoDescription = document.createElement("p");
    repoDescription.classList.add("description");
    repoDescription.textContent =
      repoObject.description || "No description available";
    repoContainer.appendChild(repoDescription);

    const repoLanguage = document.createElement("p");
    repoLanguage.classList.add("language");
    repoLanguage.textContent = repoObject.language || "Not available";
    //there is a difference between innerText and textcontent
    repoContainer.appendChild(repoLanguage);

    elements.repos.reposList.appendChild(repoContainer);
  }

  static #applyThemeRepos() {
    if (window.localStorage.theme === "dark") {
      this.#applyDarkThemeRepos(); //should include this keyword before the function call<=!!!
    } else {
      this.#applyLightThemeRepos();
    }
  }
  static applyTheme() {
    if (window.localStorage.theme === "dark") {
      this.#applyDarkTheme(); //should include this keyword before the function call<=!!!
    } else {
      this.#applyLightTheme();
    }
    this.#applyThemeRepos();
  }
  static changeTheme() {
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
  }
  static #applyDarkTheme() {
    elements.buttons.themeIcon.innerHTML = `<i class="fa-regular fa-sun"></i>`;

    elements.containers.body.style.backgroundColor = "var(--main-dark-color)";
    elements.containers.mainContainer.style.color = "var(--white-color)";

    elements.containers.searchBar.style.backgroundColor =
      "var(--blue-dark-color)";
    elements.containers.searchBar.style.boxShadow = "none";

    elements.containers.userProfileContainer.style.boxShadow = "none";
    elements.containers.userProfileContainer.style.backgroundColor = `var(--blue-dark-color)`;

    elements.containers.followersContainer.style.backgroundColor =
      "var(--main-dark-color)";
  }
  static #applyLightTheme() {
    elements.buttons.themeIcon.innerHTML = `<i class="fa-regular fa-moon"></i>`;

    elements.containers.body.style.backgroundColor = "var(--main-light-color)";
    elements.containers.mainContainer.style.color = "var(--main-dark-color)";

    elements.containers.searchBar.style.backgroundColor = "white";
    elements.containers.searchBar.style.boxShadow =
      "0px 0px 10px 0.2px #bdbcbc";

    elements.containers.userProfileContainer.style.boxShadow =
      "0px 0px 10px 0.2px #bdbcbc";
    elements.containers.userProfileContainer.style.backgroundColor = `white`;

    elements.containers.followersContainer.style.backgroundColor =
      "var(--white-color)";
  }

  static #applyDarkThemeRepos() {
    elements.repos.reposList.style.boxShadow = "none";
    elements.repos.reposList.style.backgroundColor = "var(--blue-dark-color)";
    elements.repos.repoRows.forEach((repoRow) => {
      repoRow.style.backgroundColor = "var(--main-dark-color)";
    });
    elements.repos.repoRowsDescription.forEach((repoRowsDescription) => {
      repoRowsDescription.style.backgroundColor = "var(--blue-dark-color)";
    });
  }
  static #applyLightThemeRepos() {
    elements.repos.reposList.style.boxShadow = "0px 0px 10px 0.2px #bdbcbc";
    elements.repos.reposList.style.backgroundColor = "white";
    // for (const repoRow of elements.repos.repoDescription) {
    //   repoRow.style.backgroundColor = "white";
    // }
    elements.repos.repoRows.forEach((repoRow) => {
      repoRow.style.backgroundColor = "var(--white-color)";
    });
    elements.repos.repoRowsDescription.forEach((repoRowsDescription) => {
      repoRowsDescription.style.backgroundColor = "white";
    });
  }
}
