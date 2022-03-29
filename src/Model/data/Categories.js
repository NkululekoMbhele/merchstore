const categories = [
  {
    name: "Graphics and Digital Arts",
    slug: "graphics-and-digital-arts",
    subcategory: [
      "Certificate templates",
      "Digital art pieces",
      "Email signatures",
      "ePublishing",
      "Fonts",
      "Game assets",
      "Google Slides themes",
      "Graphic objects",
      "Icons",
      "Illustrations",
      "Logo templates",
      "Patterns",
      "Canva Templates",
      "Adobe Photoshop actions",
      "Adobe illustrator templates",
      "Posters",
      "Signs",
      "Social Media graphics",
      "Presentation templates",
      "Print templates",
      "Product mockups",
      "Resume or CV templates",
      "T-shirt designs",
      "Text effects and letters",
      "Textures ",
      "UI elements",
      "Vectors",
      "Web elements",
    ],
  },
  {
    name: "Software",
    slug: "software",
    subcategory: [
      "Wordpress themes",
      "Wordpress plugins",
      "Website themes",
      "Bootstrap templates",
      "Desktop software",
      "Digital course themes",
      "eCommerce themes",
      "Email and newsletter templates",
      "HTML5 templates",
      "Web apps ",
      "Mobile apps",
      "Shopify themes",
      "Skins",
      "JavaScripts ",
      "Mobile Design templates",
      "PHP Script",
      "Python Scripts",
      "Adobe Scripts",
      "Code snippets",
      "CSS templates",
    ],
  },
  {
    name: "Photography",
    slug: "photography",
    subcategory: ["Backgrounds",
"Digital prints",
"Drone images",
"Editorial images",
"Event photos",
"Portraits",
"Stock photos "],
  },
  {
    name: "Video",
    slug: "video",
    subcategory: ["Animations",
"Drone footage",
"Educational videos",
"Event coverage",
"How-to videos",
"Presentations",
"Product demonstrations",
"Stock footage",
"Tutorials",
"Webinars",
"Adobe After Effects project files",
"Logo reveals",
"Lower thirds",
"Motion Graphics",
"Overlay Tectures",
"Adobe Premiere Pro Templates",
"Text presets",
"Titles",
"Video effects and transitions"],
  },
  {
    name: "Documents",
    slug: "documents",
    subcategory: ["Case Studies",
    "Informational pieces",
    "Google docs",
    "Google Sheets",
    "Blueprints",
    "How -to guides",
    "Manuals",
    "Manuscripts",
    "Printable documents",
    "Planners",
    "Checklists",
    "Activities",
    "Guides",
    "Lists",
    "Signage",
    "Stationery",
    "Reports",
    "Quick-start or 101 guides",
    "white papers",
    "workbooks",
    "Presentations",
    "Powerpoint",
    "keynote",
    "Google Slides",
    "SlideShare",
    "Speadsheets ",
    "Budgeting worksheets",
    "Contact lists",
    "Data sets",
    "Formula worksheets",
    "Templates",
    "Business and legal documents",
    "Contracts",
    "Company policies",
    "License agreements",
    "Privacy policies",
    "Terms and conditions",
    "Content or web copy",
    "Professional templates",
    "Resumes or CV templates"],
  },
  {
    name: "eBooks",
    slug: "ebooks",
    subcategory: ["Travel guides",
    "Self Help",
    "Reports",
    "Manuals"],
  },
  {
    name: "Web-based applications",
    slug: "web-based-applications",
    subcategory: ["Automation",
    "Bookkeeping, budgeting, and finances",
    "Cloud storage",
    "Contact management",
    "Creative tools",
    "Dating",
    "eLearning",
    "Recipe and cooking",
    "Email marketing",
    "Health and fitness",
    "Help desk and support",
    "Project management",
    "Site builders",
    "Site monitoring",
    "Social media management and publishing",
    "Productivity",
    "Travel"],
  },
  {
    name: "Fonts",
    slug: "fonts",
    subcategory: ["Blackletter fonts",
    "Decorative fonts",
    "Display and heading fonts",
    "Font collections",
    "Glyphs, symbols, and ornaments",
    "Layered type systems",
    "Non-western fonts",
    "Paragraph and body fonts",
    "Retro and niche style fonts",
    "Sans serif fonts",
    "Script fonts",
    "Serif fonts",
    "Slab serif fonts",
    "Wedding fonts"],
  },
];

function NormalList(list) {
  let newList = [];
  for (var i = 0; i < list.length; i++) {
      let slugName = list[i].trim().toLowerCase();
      slugName = slugName.replaceAll(',', ''); 
      slugName = slugName.replace(/\s+/g, '-');
      let tempObject = {
          name: list[i],
          slug: slugName
      }
      newList.push(tempObject);
  }
  return newList;
}

for (var i = 0; i < categories.length; i++) {
  categories[i].subcategory = NormalList(categories[i].subcategory)
}



export {categories}







