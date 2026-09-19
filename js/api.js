import { elements } from "./elements.js";
import { Mainlogic, UsernameSearchHistory } from "./logic.js";

export class Api {
  static #errorOccurred = false;
  static async fetchGithubUser(username) {
    const controller = new AbortController(); // to control if network speed is slow
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      //note function inside the class doesn't include function keyword, they are methods
      Mainlogic.showLoading();
      const response = await fetch(`https://api.github.com/users/${username}`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId); //in case fetch works in less than 4 seconds

      if (response.status === 404) {
        Mainlogic.showErrorMessage("User is not found");
        this.#errorOccurred = true;
        return;
      }
      if (!response.ok) {
        // throw new Error("Error: " + response); //by E capital not small
        // Mainlogic.showErrorMessage(`Error: ${response.message}`);
        Mainlogic.showErrorMessage(
          `Error: ${response.statusText || "Failed to fetch"}`,
        );
        this.#errorOccurred = true;
        return;
      }

      const data = await response.json(); //should be await there,instaed of then
      console.log("User Data", data);
      this.#errorOccurred = false;
      UsernameSearchHistory.saveUsernametoLocalStorage(username);

      // Mainlogic.getReposList(this.fetchGithubUserRepos(username));
      // returns a promise even before the function is done
      // const repos = await Mainlogic.getReposList(this.fetchGithubUserRepos(username));
      // const repos = await this.fetchGithubUserRepos(username);
      // Mainlogic.getReposListFiltered(repos);

      return data;
    } catch (e) {
      if (e.name === "AbortError") {
        Mainlogic.showErrorMessage(
          "Connection timed out. Please check your internet.",
        );
      } else {
        Mainlogic.showErrorMessage(`Network Error: ${e.message}`);
      }
      this.#errorOccurred = true;
    } finally {
      Mainlogic.hideLoading();
    }
  }

  static async fetchGithubUserRepos(username) {
    if (this.#errorOccurred) return;
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`,
      );
      if (!response.ok) {
        throw new Error("Error: " + response); //by E capital not small
      }
      const data = await response.json(); //should be await there,instaed of then
      // console.log("User Repos", data);
      return data;
    } catch (e) {
      console.error("Error: " + e.message);
    }
  }
}
