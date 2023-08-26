import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'uuid'

let totalPrice = 0
const customerInfo = document.getElementById('modal__customer-info')

customerInfo.addEventListener('submit', function(e){
    e.preventDefault()
})

document.addEventListener('click', (e) =>{
    if (e.target.dataset.item){
        addToOrder(e.target.dataset.item)
        
    }
    if (e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
    }
    if (e.target.dataset.completeBtn){
        alert("Order Complete")
    }
})

renderItems()




function renderItems (){
    
    const mainSection = document.getElementById('main-section')
    
    
    mainSection.innerHTML = getItemsFromData()
    
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
                                <button id="plus-btn" data-item=${item.id}>Add to order</button>
                            </div>
                            <hr> 
                        </section>`
    })
              return renderHtml          
    
}

function addToOrder(order){

 
    const targetObj =  menuArray.filter((item)=> item.id == order)[0]
    let renderOrders = ''
    const uuId = uuidv4()

    document.getElementById("order-item-container").style.display = "block";

    renderOrders = `<div class="content-container" id=${uuId}>
                    
                        <h3 id="title">${targetObj.name}</h3>
                        <button id="remove-btn" data-remove=${uuId}>remove</button>
                        <h4 id="order-price">$ ${targetObj.price}</h4>
                    
                    </div>`
        
    const orderItems = document.getElementById('order-item')
    orderItems.innerHTML += renderOrders
    addPrice(targetObj.price)
}

function removeOrder(order){
    
    const orderId = document.getElementById(order)
    const orderPrice = orderId.lastElementChild.textContent.substr(2)

    orderId.remove()
    removePrice(orderPrice)     

}

function addPrice(price){
    totalPrice += price
    
    document.getElementById('total-price').textContent = `$ ${totalPrice}`
}

function removePrice(price){
    
    totalPrice = totalPrice - price
    
    document.getElementById('total-price').textContent = `$ ${totalPrice}` 
    
    if (totalPrice == 0){
        document.getElementById("order-item-container").style.display = "none";
    }
}


