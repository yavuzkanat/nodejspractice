// models for products


const products = [
    {id:123123, name:"Iphone Air",price:'12000',imageUrl:"1.jpg",description:"New İphone",categoryid: "1"},
    {id:123124, name:"Iphone 17 Pro",price:'22000',imageUrl:"2.jpg",description:"New İphone",categoryid: "2"},
    {id:123125, name:"Iphone 17",price:'12000',imageUrl:"3.jpg",description:"New İphone",categoryid: "1"}

];

module.exports = class Products {
    

    //cons
    constructor(name,price,imageUrl,description,catid){
        this.id = Math.floor(Math.random() * 9999) + 1;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categoryid = catid;
        
    }

    saveProduct() {
        products.push(this);
    }
    
    static getAll(){
        return products;
    }

    static getByID(id){
        const product = products.find(i => i.id == id);
        return product
    
    }static updateProduct(id,newName,newPrice,newImageUrl,newDescription,catid){
        const product = products.find(i => i.id == id);
        product.name = newName;
        product.price = newPrice;
        product.imageUrl = newImageUrl;
        product.description = newDescription;
        product.categoryid = catid;
        
    }static delete(id){
        const index = products.find(i => i.id === id);
        products.splice(index,1);
    }static getByCategoryID(catID){
        return products.filter(i => i.categoryid == catID)
    }
    
}