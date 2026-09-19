import { elements } from "./elements.js";

export class Validators {
  static validUsername() {
    const username = elements.inputs.username.value.trim();
    // console.log(username);

    const regex = /^\S+$/;

    if (username === "") {
      Mainlogic.showErrorMessage("Username can't be empty");
      return false;
    }

    if (!regex.test(username)) {
      Mainlogic.showErrorMessage("Username cannot contain spaces");
      return false;
    }

    //elements.containers.userProfileContainer.style.display = "grid";
    //will not be done here as it done in applytheme
    Mainlogic.hideErrorMessage();
    return true;
  }
}

export class Mainlogic {
  static showErrorMessage(messsage) {
    elements.utilities.errorMessage.style.display = "block";
    elements.utilities.errorMessage.textContent = messsage;
  }
  static hideErrorMessage() {
    // elements.inputs.username.value = ""; //needs to be cleared
    //this was the error
    elements.utilities.errorMessage.style.display = "none";
  }
  static showLoading() {
    if (elements.buttons.search) {
      //for safety and don't block the js code
      elements.buttons.search.disabled = true;
      elements.buttons.search.textContent = "Loading...";
    }
  }
  static hideLoading() {
    if (elements.buttons.search) {
      elements.buttons.search.disabled = false;
      elements.buttons.search.textContent = "Search";
    }
  }

  static getReposListFiltered(reposObject) {
    if (!reposObject) return;
    if (reposObject.length < 1) return reposObject;
    let reposFiltered = reposObject
      .map((repoObject) => {
        return {
          name: repoObject.name,
          description: repoObject.description,
          created_at: repoObject.created_at,
          language: repoObject.language,
          link: repoObject.html_url,
        };
      })
      .sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at); //note a and b is an elements next to each others
        //don't forget return in hight order functions
        //b-a means sort from the newer date
        //z in date means UTC, and without new Date it will return nan
      });
    // console.log(reposFiltered);
    return reposFiltered;
  }

  static getMostUsedLanguage(reposObjectFiltered) {
    let maxCount = 0;
    let mostUsedLanguage = "";
    const languageCounts = reposObjectFiltered.reduce((acc, current) => {
      // if (!acc) return acc;
      if (!current.language) return acc;

      acc[current.language] = (acc[current.language] || 0) + 1;
      //note accumulator is an usual object as defined in reduce function the take what you give it
      /*
      - acc["JavaScript"] = (undefined || 0) + 1  =>  acc = { "JavaScript": 1 }
      - acc["JavaScript"] = (1 || 0) + 1  =>  acc = { "JavaScript": 2 }
      - acc["C#"] = (undefined || 0) + 1  =>  acc = { "JavaScript": 2, "C#": 1 }
      */
      if (acc[current.language] > maxCount) {
        maxCount = acc[current.language];
        mostUsedLanguage = current.language;
      }

      // return mostUsedLanguage;
      return acc; //you must return the acc
    }, {}); //where is the begin of accumulator
    return mostUsedLanguage;
  }
}

export class UsernameSearchHistory {
  static #storageKey = "github_username_search_history";

  static getUsernames() {
    const usernames = localStorage.getItem(this.#storageKey) || "";
    return usernames.trim() ? usernames.trim().split(" ") : [];
  }

  static saveUsernametoLocalStorage(username) {
    if (!username) return;

    let history = this.getUsernames(); //don't forget ()

    history = history.filter(
      (historyUsername) =>
        historyUsername.toLocaleLowerCase() !== username.toLocaleLowerCase(),
      //if true save the value, false nothing happend
    );

    history.unshift(username);

    //  history.length = 5;
    if (history.length > 5) history.pop();

    localStorage.setItem(this.#storageKey, history.join(" "));

    this.updateUsernameSearchHistory();
  }
  static updateUsernameSearchHistory() {
    const usernames = this.getUsernames();

    elements.utilities.searchHistoryList.innerHTML = usernames
      .map((username) => `<option value="${username}"></option>`)
      .join("");
  }
}
