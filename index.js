import { menuArray } from './data.js'

// const emoji = document.getElementById("emoji")
// const title = document.getElementById("title")
// const ingredients = document.getElementById("ingre")
// const price = document.getElementById("price")

let orderArray = []


document.addEventListener('click', (e) =>{
    if (e.target.dataset.item){
        addToOrder(e.target.dataset.item)
       
    }
    if (e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
    }
})

function removeOrder(order){
    const targetObj =  menuArray.filter((item)=> item.id == order)[0]
    console.log(targetObj)
    

    const orderId = document.getElementById(targetObj.id)
    orderId.innerHTML = ''
        
    // const orderItems = document.getElementById('order-item')
    // orderItems.innerHTML = targetObj.name
    
}


function addToOrder(order){
    
  const targetObj =  menuArray.filter((item)=> item.id == order)[0]
     
    let renderOrders = ''

    renderOrders = `<div class="content-container" id=${targetObj.id}>
                    
                        <h3 id="title">${targetObj.name}</h3>
                        <button id="remove-btn" data-remove=${targetObj.id}>remove</button>
                        <h4 id="order-price">$ ${targetObj.price} </h4>
                    
                    </div>`
        
    const orderItems = document.getElementById('order-item')
    orderItems.innerHTML += renderOrders
}


function getItemsFromData (){
    let renderHtml = ''
    menuArray.forEach((item) =>{
      renderHtml +=   `<section class="menu-container">
                            <div class="content-container">
                                <div id="emoji">${item.emoji}</div>
                                <div class="text-container">
                                    <h3 id="title">${item.name}</h3>
                                    <p id="ingre">${item.ingredients}</p>
                                    <h4 id="price">$ ${item.price}</h4>
                                </div>
                                <button id="plus-btn" data-item=${item.id}>+</button>
                            </div>
                            <hr> 
                        </section>`
    })
              return renderHtml          
    
}

function renderItems (){
    
    const mainSection = document.getElementById('main-section')
    
    
    mainSection.innerHTML = getItemsFromData()
    
}

renderItems()