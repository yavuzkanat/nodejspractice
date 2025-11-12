const Products = require("./product");

//category model




const categories = [
    {CategoryID : 1, name: "New Phones" , description : "Phones"},
    {CategoryID : 2, name: "Pro Phones" , description : "Phones"}
]

module.exports = class Category {

    constructor(CategoryName, desc) {
        this.CategoryID = (categories.length + 1).toString();
        this.name = CategoryName;
        this.description = desc;


    }
    static saveCategory() {

        categories.push(this);

    } static getAllCategories() {
        return categories;


    } static getByID(id) { 
        return categories.find( i => i.id === id );
    }static update(category){
        const index = categories.findIndex(i=>i.id === category.id);
        categories[index].name = category.name;
        categories[index].description = category.description; 
    
    
    }static deleteByID(id){
            const index = categories.findIndex(i=>i.id === id);
            categories.splice(index,1);

    }

}