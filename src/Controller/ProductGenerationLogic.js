export function generateSlug(text) {
    let slugName = text.trim().toLowerCase();
    slugName = slugName.replaceAll(',', ''); 
    slugName = slugName.replace(/\s+/g, '-');
    return slugName;
}
export function generateProductId(type, category) {
    let id = "P";

    switch(type) {
        case "single":
            id = id + "S";
          break;
        case "bulk":
            id = id + "B";
          break;
        case "combo":
            id = id + "C";
          break;
        default:
      }
    switch(category) {
        case "ebooks":
            id = id + "E";
          break;
        case "software":
            id = id + "S";
          break;
        case "video":
            id = id + "V";
          break;
        case "photography":
            id = id + "P";
          break;
        case "graphics-and-digital-arts":
            id = id + "G";
          break;
        case "documents":
            id = id + "D";
          break;
        case "web-based-applications":
            id = id + "W";
          break;
        case "fonts":
            id = id + "F";
          break;
        case "mobile":
            id = id + "M";
          break;
        default:
      }

        var min = 10000;
        var max = 99999;
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        
        id = id + num.toString()
      
      console.log(id);
      return id;
}