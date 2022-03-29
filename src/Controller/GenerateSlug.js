import {categories} from '../Model/data/Categories';

// ========= Normal List to Object with name and slug ===================

function NormalList(list) {
    let newList = [];
    for (var i = 0; i < list.length; i++) {
        let slugName = list[i].trim().toLowerCase();
        slugName = slugName.replace(/\s+/g, '-');
        let tempObject = {
            name: list[i],
            slug: slugName
        }
        newList.push(tempObject);
    }
    return newList;
}

const links = [
    "Deals and Promotions",
    "Fresh Products",
    "Trending",
    "Photos",
    "Cape Town",
    "Videos",
    "NFTs Art"
];

var array = NormalList(links)

for (var i = 0; i < array.length; i++) {
    console.log(`name: ${array[i].name} slug: ${array[i].slug}`)
}

