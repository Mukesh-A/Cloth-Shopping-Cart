let label = document.getElementById("label");

let shoppingCart =document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

//to calculate all the item quantity

let calculate = ()=>{
    let cartIcon = document.getElementById("cartAmount"); 

    //reduce function sum up all the data
     cartIcon.innerHTML = basket.reduce((totalprice, currentprice)=>{
        return totalprice + currentprice.item;
    },0)

}
calculate();

let generateCartItems = ()=>{
    if(basket.length!==0){
        return (shoppingCart.innerHTML = basket.map((x)=>{
            // console.log(x);
            let {id, item} = x;
            let search = shopItemsData.find((y)=> y.id == id) || [];
            return `
            <div class="cart-item">
             <img width="100" src=${search.img} alt=""/>
             <div class="details">
             <div class="title-price-x">
             <h4 class="title-price">
             <p>${search.name}</p>
             <p class="cart-item-price">$${search.price}</p>
             </h4>
             <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
             </div>
             <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id="${id}"class="quantity">${item}
                    </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
             </div>
             <h3>$ ${item*search.price}</h3>
             </div>
            
            </div>
            `
        }).join(""));
    }
    else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `<h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>`
    }
}
generateCartItems()

let increment = (id)=>{

    // finding the id in the basket array if it donesnt exist then it return undefines and that is checked in the if LOOP
    let search = basket.find((y)=>y.id === id);

    if(search === undefined)
    {
        basket.push({
            id: id,
            item:1,
        });
    }
    else{
        search.item += 1;
    }
    generateCartItems();
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
    console.log(basket);

}
let decrement = (id)=>{
    let search = basket.find((y)=>y.id === id);

    if(search === undefined)
    {
        return;
    }else if(search.item === 0 ) 
    {
        return ;
    }
    
    else{
        search.item -= 1;
    }
    update(id);
    basket = basket.filter((x)=> x.item !== 0);
    generateCartItems();
    
    localStorage.setItem("data", JSON.stringify(basket));

    
}

//to update the quantity
let update = (id)=>{

    let search = basket.find((y)=>y.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculate();
    TotalAmount()
}

let removeItem = (id)=>{
    
    
    basket = basket.filter((x)=> x.id !== id);
    console.log(basket);
    generateCartItems();
    TotalAmount();
    calculate();
    localStorage.setItem("data", JSON.stringify(basket));
    
    
}

//clear cart

let clearCart = ()=> {basket = []
    generateCartItems()
    calculate();
    localStorage.setItem("data", JSON.stringify(basket));
}

//TOTAL AMOUNT

let TotalAmount = ()=>{
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
                let {id, item} = x;
                let search = shopItemsData.find((y)=> y.id == id) || [];
                return item*search.price;
        }).reduce((x,y)=> x + y,0);
        label.innerHTML = `<h2>Total Bill: $ ${amount} </h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()"class="removeAll">Clear Cart</button>`
       
    }
    else{
        return
    }
}
TotalAmount()