const directoryData = [
    {
        name: "Projects",
        type: "directory",

        children: [
            {
                name: "NASA Hunch Internship",
                type: "directory",
                isExpanded: false,

                children: [
                    {
                        name: "HELIOS - Medical Inventory System",
                        type: "blowup",
                        isExpanded: false
                    },
                    {
                        name: "SISMO - Cybersecurity for the Lunar Base",
                        type: "blowup",
                        isExpanded: false
                    }
                ]
            },
            {
                name: "Soule Mail - C++ Email Client",
                type: "blowup",
                isExpanded: false
            }
        ]
    },
    {
        name: "Work Experience",
        type: "directory",
        isExpanded: false,

        children: [
            {
                name: "Movement Summer Camp Instructor",
                type: "blowup",
                isExpanded: false
            },
            {
                name: "NASA Internship",
                type: "blowup",
                isExpanded: false
            }
        ]
    },
    {
        name: "Resume",
        type: "download"
    }
];


function makeTreeNode(item) {
    
    const list = Document.createElement('li')

    const row = Document.createElement('div')
}