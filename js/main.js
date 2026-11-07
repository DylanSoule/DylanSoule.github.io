import "../css/main.css";
import "../css/navigation.css";
// General JS for whole site

const portfolioPage = document.querySelector("#portfolio-page");
if (portfolioPage) {

    // Load js file when the portfolio page exists
    const { initializeTree } = await import("./portfolio/folder-tree.js");
    initializeTree();
}