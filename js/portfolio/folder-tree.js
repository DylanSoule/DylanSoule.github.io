import "../../css/portfolio.css";

import {
  createIcons,
  Download,
  FileText,
  FolderClosed,
  FolderOpen,
} from "lucide";

// createIcons({
//   icons: {
//     Download,
//     FileText,
//     FolderClosed,
//     FolderOpen
//   }
// });

const directoryData = [
  {
    name: "Projects",
    type: "directory",
    children: [
      {
        name: "NASA Hunch Internship",
        type: "directory",
        children: [
          {
            name: "HELIOS - Medical Inventory System",
            type: "blowup",
          },
          {
            name: "SISMO - Cybersecurity for the Lunar Base",
            type: "blowup",
          },
        ],
      },
      {
        name: "Soule Mail - C++ Email Client",
        type: "blowup",
      },
    ],
  },
  {
    name: "Education",
    type: "directory",
    children: [
        {
            name: "High School",
            type: "blowup",
        },
        {
            name: "Warren Tech",
            type: "blowup",
        }
    ]
  },
  {
    name: "Work Experience",
    type: "directory",
    children: [
      {
        name: "Movement Summer Camp Instructor",
        type: "blowup",
      },
      {
        name: "NASA Internship",
        type: "blowup",
      },
    ],
  },
  {
    name: "Resume",
    type: "blowup",
  },
];


function setIcon(iconEl, item, isOpen = false) {
  if (item.type === "directory") {
    iconEl.setAttribute("data-lucide", isOpen ? "folder-open" : "folder-closed");
    return;
  }

  if (item.type === "download") {
    iconEl.setAttribute("data-lucide", "Download");
    return;
  }

  iconEl.setAttribute("data-lucide", "FileText");
}



function makeTreeNode(item) {
  const li = document.createElement("li");
  const row = document.createElement("div");
  row.classList.add("tree-row");

  const icon = document.createElement("i");
  setIcon(icon, item, false);

  const label = document.createElement("span");
  label.textContent = item.name;

  row.appendChild(icon);
  row.appendChild(label);
  li.appendChild(row);

  if (item.children && item.children.length) {
    const childList = document.createElement("ul");
    childList.hidden = true;

    item.children.forEach((child) => {
      childList.appendChild(makeTreeNode(child));
    });

    row.addEventListener("click", () => {
      const shouldOpen = childList.hidden;
      childList.hidden = !shouldOpen;
      row.classList.toggle("is-open", shouldOpen);

      const liveIcon = row.querySelector("[data-lucide]");
      if (liveIcon) {
        liveIcon.setAttribute(
          "data-lucide",
          shouldOpen ? "folder-open" : "folder-closed"
        );
        createIcons({ icons: { FolderClosed, FolderOpen, FileText, Download } });
      }
    });

    li.appendChild(childList);
  } else {
    row.addEventListener("click", () => {
      row.classList.toggle("is-open");
      console.log("Opened:", item.name);
    });
  }

  return li;
}

export function initializeTree() {
  const treeContainer = document.getElementById("folder-tree");
  if (!treeContainer) return;

  treeContainer.innerHTML = "";
  directoryData.forEach((child) => {
    treeContainer.appendChild(makeTreeNode(child));
  });

  createIcons({
    icons: { FolderClosed, FolderOpen, FileText, Download },
  });
}