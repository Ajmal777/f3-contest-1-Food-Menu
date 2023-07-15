const doc = document;
const menu = doc.querySelector('.item-list');

const URL = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';
let ListOfItems;

async function getMenu(){
    const rawData = await fetch(URL);
    const parsedData = await rawData.json();
    ListOfItems = parsedData;
    renderItems(parsedData);
}

function renderItems(data){
    data.forEach(item => {
        createItem(item);
    });
}

function createItem(itemData){
    menu.innerHTML += 
            `<div class="item">
                <div class="pic">
                    <img src="${itemData.imgSrc}" alt="${itemData.name}" srcset="">
                </div>
                <div class="footer">
                    <div class="details">
                        <h4 class="item-name">${itemData.name}</h4>
                        <p class="price">$${itemData.price}/-</p>
                    </div>
                    <div class="add-item">
                        <button type="button">
                            <img src="resources/add-icon.svg" alt="" srcset="">
                        </button>
                    </div>
                </div>
            </div>` 
}

function TakeOrder(){
    return new Promise((res, rej) => {
        setTimeout(()=>{
            let i = 3;
            const items = [];

            while(i-- > 0){
                const randomIndex = Math.floor(Math.random() * ListOfItems.length);
                items.push(ListOfItems[randomIndex]);
            }

            res(items);
        }, 2500);
    })
}

function orderPrep(){
    return new Promise(res =>{
        setTimeout(()=> {
            const obj = {
                order_status : true,
                paid : false
            }
            
            res(obj);
        }, 1500);
    })
}

function payOrder(obj){
    return new Promise(res => {
        setTimeout(()=>{
            obj.paid = true;
            res(obj);
        }, 1000);
    })
}

function thankYou(){
    alert('Thank You for eating with us today!!')
}

async function calls(){
    await getMenu();
    TakeOrder()
        .then(val => {
            console.log(val);
            return orderPrep();
        })
        .then(val => {
            console.log(val);
            return payOrder(val);
        })
        .then(val => {
            console.log('bill paid', val);
            thankYou();
        })
        .catch(err => console.log(err));
}

calls();