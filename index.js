import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'uuid'

let totalPrice = 0
let counter = 0
const customerInfo = document.getElementById('modal__customer-info')

const modal = document.getElementById('modal')
const cart = document.getElementById('cart')
const orderItemContainer = document.getElementById("order-item-container")


cart.addEventListener('click', function(){
    orderItemContainer.style.display = "flex";
})

customerInfo.addEventListener('submit', function(e){
    

    e.preventDefault()
    
    const customerInfoData = new FormData(customerInfo)

    const name = customerInfoData.get('customerName')
    alert("Thanks you, "+ name + "! your Order was Successful")
    modal.style.display = "none";
    
})

document.addEventListener('click', (e) =>{
    if (e.target.dataset.item){
        addToOrder(e.target.dataset.item)
        
    }
    if (e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
    }
    if (e.target.dataset.completeBtn){
        modal.style.display = "flex";
    }
    if(e.target.dataset.orderBackBtn){
        orderItemContainer.style.display = "none";
    }
    if(e.target.dataset.payBackBtn){
        modal.style.display = "none";
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
      renderHtml +=   `
                            <div class="content-container">
                                <img id="emoji" src="${item.emoji}" alt="coffe image ${item.id}"/>
                                
                                <div class="text-container">
                                    <h3 id="title">${item.name}</h3>
                                    <p id="ingre">${item.ingredients}</p>
                                    <h4 id="price">$ ${item.price}</h4>
                                </div>
                                <button class="secondary-btn" id="plus-btn" data-item=${item.id}>Add to order</button>
                            </div>
                            
                        `
    })
              return renderHtml          
    
}

function orderCounter(){

        cart.innerHTML =  `<i class="fa-solid fa-cart-shopping fa-2x"> <span class="counter">${counter}</span><i>`
}

function addToOrder(order){

    counter++
    const targetObj =  menuArray.filter((item)=> item.id == order)[0]
    let renderOrders = ''
    const uuId = uuidv4()

    

    renderOrders = `<div class="order-content-container" id=${uuId}>
                    
                        <h4 id="title">${targetObj.name}</h4>
                        <button class="secondary-btn" id="remove-btn" data-remove=${uuId}>remove</button>
                        <h4 id="order-price">$ ${targetObj.price}</h4>
                    
                    </div>`
        
    const orderItems = document.getElementById('order-item')
    orderItems.innerHTML += renderOrders
    addPrice(targetObj.price)
    orderCounter()
}

function removeOrder(order){
    counter--
    const orderId = document.getElementById(order)
    const orderPrice = orderId.lastElementChild.textContent.substr(2)

    orderId.remove()
    removePrice(orderPrice) 
    orderCounter()   

}

function addPrice(price){
    totalPrice += price
    
    document.getElementById('total-price').textContent = `$ ${Math.round(totalPrice * 100)/100}`
}

function removePrice(price){
    
    totalPrice = totalPrice - price
    
    document.getElementById('total-price').textContent = `$ ${Math.round(totalPrice* 100)/100}` 
    
    if (totalPrice == 0){
        orderItemContainer.style.display = "none";
    }
}




