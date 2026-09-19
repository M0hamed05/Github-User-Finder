import { elements } from "./elements.js"; //don't forget the .js
import { Api } from "./api.js";
import { Ui } from "./ui.js";
import { UsernameSearchHistory, Validators } from "./logic.js";

elements.inputs.username?.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    // if (Validators.validUsername()) {
    //   const userObject = Api.fetchGithubUser(
    //     elements.inputs.username.value.trim(), //don't forget to add trim
    //   ).then(Ui.displayUserData);
    //   // displayUserData(userObject);
    // }
    if (Validators.validUsername()) {
      elements.inputs.username.value.trim();
      const userObject = await Api.fetchGithubUser(
        elements.inputs.username.value.trim(),
      );
      const userRepos = await Api.fetchGithubUserRepos(
        elements.inputs.username.value.trim(),
      );
      Ui.displayUserData(userObject, userRepos);
    }
  }
});
/*
note the function without async doesn't what for the api and does the displayUserData function instantly<=!!!
or use then
and i think then is clearer for me and good for single api call, but many api cause problems in reading and
editing
not function called without () the value is returned automatically<=!!!!!!!!!
modern way
*/
elements.buttons.search.addEventListener("click", async () => {
  if (Validators.validUsername()) {
    elements.inputs.username.value.trim();
    const userObject = await Api.fetchGithubUser(
      elements.inputs.username.value.trim(),
    );
    const userRepos = await Api.fetchGithubUserRepos(
      elements.inputs.username.value.trim(),
    );
    Ui.displayUserData(userObject, userRepos);
  }
});

elements.buttons.themeIcon?.addEventListener("click", () => {
  Ui.changeTheme();
  Ui.applyTheme();
});
// window.onload(() => {
//   Ui.applyTheme;
// });//wrong way
// window.onload = () => {
//   Ui.applyTheme();
// };//right
// document.addEventListener("DOMContentLoaded", () => {
//   Ui.applyTheme();
// });//better
Ui.applyTheme(); //best, becuase of module type that allows this and more with ES6 module
UsernameSearchHistory.updateUsernameSearchHistory();
