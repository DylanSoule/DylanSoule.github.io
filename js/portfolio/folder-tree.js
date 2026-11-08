import {
  createIcons,
  Download,
  FileText,
  FolderClosed,
  FolderOpen,
  BookOpenText,
  ChevronRight,
} from "lucide";

const blowupTemplatePaths = {
  "helios-medical-inventory": "assets/blowups/helios-medical-inventory.html",
};

const blowupContentCache = new Map();
let lastFocusedRow = null;


const directoryData = [
  {
    id: "projects",
    name: "Projects",
    type: "directory",
    children: [
      {
        id: "hunch-projects",
        name: "NASA Hunch Internship",
        type: "directory",
        children: [
          {
            id: "helios-medical-inventory",
            name: "HELIOS - Medical Inventory System",
            type: "blowup",
          },
          {
            id: "sismo-cybersecurity",
            name: "SISMO - Cybersecurity for the Lunar Base",
            type: "blowup",
          },
        ],
      },
      {
        id: "soule-mail",
        name: "Soule Mail - C++ Email Client",
        type: "blowup",
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    type: "directory",
    children: [
        {
          id: "green-mountain-high-school",
          name: "High School",
          type: "blowup",
        },
        {
          id: "warren-tech",
          name: "Warren Tech",
          type: "blowup",
        }
    ]
  },
  {
    id: "work-experience",
    name: "Work Experience",
    type: "directory",
    children: [
      {
        id: "movement-summer-camp",
        name: "Movement Summer Camp Instructor",
        type: "blowup",
      },
      {
        id: "nasa-hunch-internship",
        name: "NASA Internship",
        type: "blowup",
      },
    ],
  },
  {
    id: "resume-download",
    name: "Resume",
    type: "blowup",
  },
];


function getPanelElements() {
  const panel = document.getElementById("blowup-panel");
  const title = document.getElementById("blowup-title");
  const content = document.getElementById("blowup-content");
  const header = document.getElementById("blowup-panel-header")

  if (!panel || !title || !content || !header) {
    return null;
  }

  return { panel, title, content, header };
}


async function loadBlowupHtml(itemId) {
  if (blowupContentCache.has(itemId)) {
    return blowupContentCache.get(itemId);
  }

  const filePath = blowupTemplatePaths[itemId];
  if (!filePath) {
    return "<p>This detail panel has not been written yet.</p>";
  }

  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error(`Failed to load ${filePath}`);
  }

  const html = await response.text();
  blowupContentCache.set(itemId, html);
  return html;
}


async function openPanel(item, row) {
  const panelElements = getPanelElements();
  if (!panelElements) {
    return;
  }

  lastFocusedRow = row;
  panelElements.title.innerHTML = `
    <i data-lucide="chevron-right" class="chevron"></i> 
    <i data-lucide="book-open-text"></i> ` + item.name;
  createIcons({ icons: { ChevronRight, BookOpenText } });
  panelElements.content.innerHTML = "<p>Loading details...</p>";

  panelElements.panel.hidden = false;
  panelElements.panel.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");

  try {
    const html = await loadBlowupHtml(item.id);
    panelElements.content.innerHTML = html;
  } catch (error) {
    panelElements.content.innerHTML =
      '<p class="blowup-error">Could not load this detail view. Please try again.</p>';
    console.error(error);
  }

}


function closePanel() {
  const panelElements = getPanelElements();
  if (!panelElements) {
    return;
  }

  panelElements.panel.hidden = true;
  panelElements.panel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("panel-open");

  if (lastFocusedRow) {
    lastFocusedRow.focus();
  }
}


function setupPanelEvents() {
  const panelElements = getPanelElements();
  if (!panelElements || panelElements.panel.dataset.eventsBound === "true") {
    return;
  }

  panelElements.header.addEventListener("click", closePanel);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panelElements.panel.hidden) {
      closePanel();
    }
  });

  panelElements.panel.dataset.eventsBound = "true";
}


function setIcon(iconEl, item, isOpen = false) {
  if (item.type === "directory") {
    iconEl.setAttribute("data-lucide", isOpen ? "folder-open" : "folder-closed");
    return;
  }

  if (item.type === "download") {
    iconEl.setAttribute("data-lucide", "download");
    return;
  }

  iconEl.setAttribute("data-lucide", "file-text");
}


function makeTreeNode(item) {
  const li = document.createElement("li");
  const row = document.createElement("div");
  row.classList.add("tree-row");
  row.setAttribute("aria-expanded", "false");

  const chevron = document.createElement("i");
  chevron.setAttribute("data-lucide","chevron-right");
  chevron.classList.add("chevron");

  const icon = document.createElement("i");
  setIcon(icon, item, false);
  icon.classList.add("folder")

  const label = document.createElement("span");
  label.textContent = item.name;

  row.tabIndex = 0;
  row.appendChild(chevron);
  row.appendChild(icon);
  row.appendChild(label);
  li.appendChild(row);

  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      row.click();
    }
  });

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

      row.setAttribute("aria-expanded", shouldOpen ? "true" : "false");

      const liveIcon = row.querySelector(".folder");
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
    row.addEventListener("click", async () => {
      row.classList.toggle("is-open");
      await openPanel(item, row);
    });
  }

  return li;
}

export function initializeTree() {
  setupPanelEvents();

  const treeContainer = document.getElementById("folder-tree");
  if (!treeContainer) return;

  treeContainer.innerHTML = "";
  directoryData.forEach((child) => {
    treeContainer.appendChild(makeTreeNode(child));
  });

  createIcons({
    icons: { 
      FolderClosed, 
      FolderOpen,
      FileText, 
      Download,
      ChevronRight
    },
  });
}