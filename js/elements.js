// export const elements = {
//   searchButton: document.querySelector(".search-button"),
//   githubUsernameText: document.querySelector(".username-text-field"),
// };//not the best as it might be null if the elment is not loaded yet, so use getters as they better
//you call it when needed

export const elements = {
  buttons: {
    get search() {
      return document.querySelector(".search-button");
    },
    get themeIcon() {
      return document.querySelector(".theme-icon");
    },
  },

  inputs: {
    get username() {
      return document.querySelector(".username-text-field");
    },
  },

  links: {
    get github() {
      return document.querySelector(".github-link");
    },
  },

  userProfile: {
    get container() {
      return document.querySelector(".user-data-box");
    },
    get avatar() {
      return document.querySelector(".user-image img");
    },
    get username() {
      return document.querySelector(".user-content .username");
    },
    get createdAt() {
      return document.querySelector(".user-content .created-at");
    },
    get bio() {
      return document.querySelector(".user-content .bio");
    },
    get topLanguage() {
      return document.querySelector(".top-language-used-span");
    },
    get totalRepos() {
      return document.querySelector(".repos-count");
    },
    get followers() {
      return document.querySelector(".followers-count");
    },
    get following() {
      return document.querySelector(".following-count");
    },
    get name() {
      return document.querySelector(".name");
    },
  },
  contactInfo: {
    get location() {
      return document.querySelector(".user-contact-info .location");
    },
    get blog() {
      return document.querySelector(".user-contact-info .blog");
    },
    get githubLink() {
      return document.querySelector(".user-contact-info .github-link");
    },
    get company() {
      return document.querySelector(".user-contact-info .company");
    },
    get email() {
      return document.querySelector(".user-contact-info .email");
    },
  },

  repos: {
    get reposList() {
      return document.querySelector(".repos-list");
    },
    get repoRows() {
      return document.querySelectorAll(".repos-list .repo-row");
      //note there is a difference between querySelectorAll and Classname in loops,more
      //and so on but now querySelector is used
    },
    get repoRowsDescription() {
      return document.querySelectorAll(".repos-list .repo-row .description");
    },
  },

  containers: {
    get userProfileContainer() {
      //rules to put ()
      return document.querySelector(".user-data-box");
    },
    get body() {
      return document.querySelector("body");
    },
    get mainContainer() {
      return document.querySelector(".container");
    },
    get searchBar() {
      return document.querySelector(".search-bar");
    },
    get followersContainer() {
      return document.querySelector(".main-inner-banner");
    },
  },
  utilities: {
    get errorMessage() {
      return document.querySelector(".error-message");
    },
    get searchHistoryList() {
      return document.getElementById("search-history");
    },
  },
};
