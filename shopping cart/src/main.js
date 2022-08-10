let shop = document.getElementById("shop");



// ||[] is used if no data in local storage it give error so we have to pass empty []
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = ()=>{
    return (shop.innerHTML = shopItemsData.map((props)=>{

        //ARRAY DESTRUCTURE
        let {id,name,price,desc,img} = props;

        let search =basket.find((x)=>x.id == id) || [];
        return `<div id="pId${id}" class="item">
        <img width="200" src="${img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons"><i onclick="decrement(${id})" class="bi bi-dash-lg"></i><div id="${id}"class="quantity">${search.item === undefined?0: search.item}</div><i onclick="increment(${id})" class="bi bi-plus-lg"></i></div>
            </div>
        </div>
    </div>`;
    }).join(""));
    //without this join("") ,it will display , in the website as the objects are in ARRAY when displaying each item it addes , so to replace that add empty ""
}
generateShop();

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
    localStorage.setItem("data", JSON.stringify(basket));
    console.log(basket);
    update(id);

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
    console.log(basket);
    
    localStorage.setItem("data", JSON.stringify(basket));

    
}

//to update the quantity
let update = (id)=>{

    let search = basket.find((y)=>y.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculate();
}

//to calculate all the item quantity

let calculate = ()=>{
    let cartIcon = document.getElementById("cartAmount"); 

    //reduce function sum up all the data
     cartIcon.innerHTML = basket.reduce((totalprice, currentprice)=>{
        return totalprice + currentprice.item;
    },0)

}
calculate();