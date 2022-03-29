export const reviewTable = {
    productId: "",
    rating: "",
    reviewNote: "",
    userId: "",
}
export const statusTable = {
    productId: "",
    status: ""
}
export const productThumbnailTable = {
    productId: "",
    thumbnail: [{
        url: "",
        alt: ""
    }],
    
}
export const productDownloadTable = {
    productId: "",
    download: [{
        url: "",
        alt: ""
    }],
}

export const productIdTable = {
    productId: "",
    slug: ""
}
export const purchasesTable = {
    productId: "",
    userId: "",
    date: ""
}
export const cartTable = {
    userId: "",
    products: [{productId: ""}]
}
export const accountTable = {
    userId: "",
    personalDetails: {
        fullName: "",
        email: "",
        phoneNumber: "",
        address: {
            line1: "",
            line2: "",
            suburb: "",
            city: "",
            postalCode: "",
        }
    }
}

export const wishListTable = {
    userId: "",
    products: [{productId: ""}]

}
export const quickLinksTable = {
    name: "",
    dateEnd: "",
    links: [{slug: ""}]

}
export const comboDealsTable = {
    comboId: "",
    dateEnd: "",
    links: [{slug: ""}]
}
export const categoriesTable = {
    categories: [{categoryId: ""}],
}
export const newsletterTable = {
    name: "",
    email: "",
}
export const messagesTable = {
    name: "",
    email: "",
    message: "",
    date: "",
}
export const productSuggestionTable = {
    name: "",
    email: "",
    suggestion: "",
    date: "",
}
export const careersTable = {
    name: "",
    email: "",
    suggestion: "",
    date: "",
}
export const opportunitiesTable = {
    name: "",
    email: "",
    suggestion: "",
    date: "",
}
export const competitionTable = {
    name: "",
    email: "",
    suggestion: "",
    date: "",
}