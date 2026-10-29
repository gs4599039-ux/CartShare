// Scroll Button

let topBtn = document.getElementById("topBtn");

if(topBtn){

    window.onscroll = function(){

        if(document.documentElement.scrollTop > 200){
            topBtn.style.display = "block";
        }else{
            topBtn.style.display = "none";
        }

    }

    topBtn.onclick = function(){

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }

}
//

const products = [

{
    id:2,
    name:"Headphone",
    price:"₹999",
    image:"images/products/product2.jpg",
    description:"High quality wireless headphone with bass and long battery backup.",
    stock:"In Stock"
},

{
    id:1,
    name:"Smart Watch",
    price:"₹1999",
    image:"images/products/product1.jpg",
    description:"Premium smart watch with fitness tracking and heart rate monitor.",
    stock:"In Stock"
},

{
    id:3,
    name:"Shoes",
    price:"₹1499",
    image:"images/products/product3.jpg",
    description:"Comfortable running shoes for daily use.",
    stock:"Only 5 Left"
},

{
    id:4,
    name:"Bag",
    price:"₹899",
    image:"images/products/product4.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:5,
    name:"Smart Phone",
    price:"₹100999",
    image:"images/products/product5.jpg",
    description:"Stylish design and long battery backup.",
    stock:"In Stock"
},

{
    id:6,
    name:"Smart Refrigerator",
    price:"₹22999",
    image:"images/products/product6.jpg",
    description:"Stylish design with spacious storage.",
    stock:"In Stock"
},

{
    id:7,
    name:"Men T-shirt",
    price:"₹499",
    image:"images/products/product7.jpg",
    description:"high quality t-shirt.",
    stock:"In Stock"
},

{
    id:8,
    name:"Fancy Dress",
    price:"₹1999",
    image:"images/products/product8.jpg",
    description:"Stylish modern dress.",
    stock:"In Stock"
},

{
    id:9,
    name:"Chili Powder",
    price:"₹199",
    image:"images/products/product9.jpg",
    description:"made with pure chili's.",
    stock:"In Stock"
},

{
    id:10,
    name:"Java Programming",
    price:"₹599",
    image:"images/products/product10.jpg",
    description:"basic to high level java programming.",
    stock:"In Stock"
},

{
    id:11,
    name:"Gunaho Ka Devta",
    price:"₹299",
    image:"images/products/product11.jpg",
    description:"very interesting book.",
    stock:"In Stock"
},

{
    id:12,
    name:"Poem Book",
    price:"₹199",
    image:"images/products/product12.jpg",
    description:"Sweet poem story with 14+ lesson.",
    stock:"In Stock"
},

{
    id:13,
    name:"Children's Book MockUp",
    price:"₹599",
    image:"images/products/product13.jpg",
    description:"increase children's mind power.",
    stock:"In Stock"
},

{
    id:14,
    name:"Cooking Oil",
    price:"₹199",
    image:"images/products/product14.jpg",
    description:"pure musturd oil.",
    stock:"In Stock"
},

{
    id:15,
    name:"Rice",
    price:"₹399",
    image:"images/products/product15.jpg",
    description:"high quality rice.",
    stock:"In Stock"
},

{
    id:16,
    name:"Cheese Sauce",
    price:"₹299",
    image:"images/products/product16.jpg",
    description:"yummy and creamy.",
    stock:"In Stock"
},

{
    id:17,
    name:"Furniture",
    price:"₹50099",
    image:"images/products/product17.jpg",
    description:"very comfertable sofa.",
    stock:"In Stock"
},

{
    id:18,
    name:"Racket",
    price:"₹1999",
    image:"images/products/product18.jpg",
    description:"High quality Racket.",
    stock:"In Stock"
}
];

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

if(productId){

    const product = products.find(item => item.id === productId);

    if(product){

        document.getElementById("product-image").src = product.image;

        document.getElementById("product-name").innerText = product.name;

        document.getElementById("product-price").innerText = product.price;

        document.getElementById("product-description").innerText = product.description;

        document.getElementById("product-stock").innerText = product.stock;

        let cartBtn = document.querySelector(".add-cart");
        let wishBtn = document.querySelector(".wishlist-btn");

        cartBtn.dataset.name = product.name;
        cartBtn.dataset.price = product.price.replace("₹","");
        cartBtn.dataset.image = product.image;

        wishBtn.dataset.name = product.name;
        wishBtn.dataset.price = product.price.replace("₹","");
        wishBtn.dataset.image = product.image;

    }

}

// Hero Slider

let slides = document.querySelectorAll(".slide");

if(slides.length > 0){

    let currentSlide = 0;

    setInterval(function(){

        slides[currentSlide].classList.remove("active");

        currentSlide++;

        if(currentSlide >= slides.length){

            currentSlide = 0;

        }

        slides[currentSlide].classList.add("active");

    },3000);

}







// ADD TO SHARED CART


let cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        let product = {

            name: button.dataset.name,
            price: Number(button.dataset.price),
            image: button.dataset.image,
            quantity: 1

        };

        let sharedCart = JSON.parse(localStorage.getItem("sharedCart")) || [];

        let existing = sharedCart.find(item => item.name === product.name);

        if (existing) {

            existing.quantity++;

        } else {

            sharedCart.push(product);

        }

        localStorage.setItem("sharedCart", JSON.stringify(sharedCart));

        // Activity Log
        let activities = JSON.parse(localStorage.getItem("activities")) || [];

        activities.push(product.name + " added to shared cart");

        localStorage.setItem("activities", JSON.stringify(activities));

        updateSharedCartCount();

        alert("Product added to Shared Cart!");

    });

});



// DYNAMIC SHARED CART


let cartContainer = document.getElementById("cart-items");

if (cartContainer) {

    displayCart();

    function displayCart() {

        let sharedCart = JSON.parse(localStorage.getItem("sharedCart")) || [];

        cartContainer.innerHTML = "";

        let total = 0;

        if (sharedCart.length === 0) {

            cartContainer.innerHTML = "<h3>Shared Cart is Empty</h3>";

            document.getElementById("total-price").innerText = "0";

            return;

        }

        sharedCart.forEach((product, index) => {

            total += product.price * product.quantity;

            cartContainer.innerHTML += `

            <div class="cart-item">

                <img src="${product.image}" alt="${product.name}">

                <div class="cart-info">

                    <h3>${product.name}</h3>

                    <p>₹${product.price}</p>

                </div>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">-</button>

                    <span>${product.quantity}</span>

                    <button onclick="increaseQuantity(${index})">+</button>

                </div>

                <h3>₹${product.price * product.quantity}</h3>

                <button class="remove-btn"
                    onclick="removeProduct(${index})">

                    Remove

                </button>

            </div>

            `;

        });

        document.getElementById("total-price").innerText = total;

        updateSharedCartCount();

    }


    window.increaseQuantity = function(index) {

        let sharedCart = JSON.parse(localStorage.getItem("sharedCart")) || [];

        sharedCart[index].quantity++;

        localStorage.setItem("sharedCart", JSON.stringify(sharedCart));

        displayCart();

    }


    window.decreaseQuantity = function(index) {

        let sharedCart = JSON.parse(localStorage.getItem("sharedCart")) || [];

        if (sharedCart[index].quantity > 1) {

            sharedCart[index].quantity--;

        }

        localStorage.setItem("sharedCart", JSON.stringify(sharedCart));

        displayCart();

    }


    window.removeProduct = function(index) {

        let sharedCart = JSON.parse(localStorage.getItem("sharedCart")) || [];

        sharedCart.splice(index, 1);

        localStorage.setItem("sharedCart", JSON.stringify(sharedCart));

        displayCart();

    }

}



// SHARED CART COUNT


function updateSharedCartCount() {

    let sharedCart = JSON.parse(localStorage.getItem("sharedCart")) || [];

    let count = 0;

    sharedCart.forEach(product => {

        count += product.quantity;

    });

    let cartCount = document.getElementById("cart-count");

    if (cartCount) {

        cartCount.innerText = count;

    }

}

updateSharedCartCount();

// Search Product


let searchInput=document.getElementById("search-input");

if(searchInput){

    searchInput.addEventListener("keyup",function(){

        let value=searchInput.value.toLowerCase();

        let products=document.querySelectorAll(".search-product-card");

        products.forEach(function(product){

            let name=product.querySelector("h3").innerText.toLowerCase();

            if(name.includes(value)){

            product.style.removeProperty("display");

            }else{

            product.style.display = "none";

            }

        });

    });

}


// Category Filter

let filterButtons = document.querySelectorAll(".filter-btn");

if (filterButtons.length > 0) {

    let products = document.querySelectorAll(".category-product-card");

    filterButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            let category = this.dataset.category;

            products.forEach(function(product) {

                if (category === "all" || product.dataset.category === category) {

                    product.style.display = "block";

                } else {

                    product.style.display = "none";

                }

            });

        });

    });

}

// Checkout Order Summary

let checkoutItems=document.getElementById("checkout-items");

if(checkoutItems){

    let cart=JSON.parse(localStorage.getItem("sharedCart")) || [];

    let total=0;

    cart.forEach(product=>{

        total+=product.price*product.quantity;

        checkoutItems.innerHTML+=`

        <div class="order-item">

            <span>${product.name} x ${product.quantity}</span>

            <span>₹${product.price*product.quantity}</span>

        </div>

        `;

    });

    document.getElementById("checkout-total").innerText=total;

}


// Checkout Validation

let checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();

        if (name == "" || email == "" || phone == "" || address == "") {
            alert("Please Fill All Fields");
            return;
        }

        if (phone.length != 10) {
            alert("Enter Valid Mobile Number");
            return;
        }

        alert("Order Placed Successfully!");

        let number = "ORD" + Math.floor(100000 + Math.random() * 900000);

        localStorage.setItem("orderNumber", number);

        // Save Order History
        let orders = JSON.parse(localStorage.getItem("orders")) || [];

        orders.push({
            orderNumber: number,
            name: name,
            total: document.getElementById("checkout-total").innerText
        });

        localStorage.setItem("orders", JSON.stringify(orders));

        // Clear Cart
        localStorage.removeItem("sharedCart");
        localStorage.removeItem("cart");

        // Go To Confirmation Page
        window.location.href = "order-confirmation.html";

    });

}




// Contact Form Validation 

let contactForm = document.getElementById("contact-form");

if(contactForm){

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        let name = document.getElementById("contact-name").value.trim();
        let email = document.getElementById("contact-email").value.trim();
        let subject = document.getElementById("contact-subject").value.trim();
        let message = document.getElementById("contact-message").value.trim();

        if(name === ""){
            alert("Please Enter Name");
            document.getElementById("contact-name").focus();
            return;
        }

        if(email === ""){
            alert("Please Enter Email");
            document.getElementById("contact-email").focus();
            return;
        }

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){
            alert("Enter Valid Email");
            document.getElementById("contact-email").focus();
            return;
        }

        if(subject === ""){
            alert("Please Enter Subject");
            document.getElementById("contact-subject").focus();
            return;
        }

        if(message === ""){
            alert("Please Enter Message");
            document.getElementById("contact-message").focus();
            return;
        }

        alert("Thank you! Your message has been sent to CartShare.");

        contactForm.reset();

    });

}


       
// Product Sorting


let sortSelect = document.getElementById("sort-products");

if(sortSelect){

    sortSelect.addEventListener("change",function(){

        let container=document.querySelector(".products-list");

        let products = Array.from(document.querySelectorAll(".products-card"));

        if(this.value === "low"){

            products.sort((a,b)=>{

                return Number(a.dataset.price) -  Number(b.dataset.price);

            });

        }

        else if(this.value==="high"){

            products.sort((a,b)=>{

                return Number(b.dataset.price) - Number(a.dataset.price);

            });

        }
          // re-appending sorted products to the container
        products.forEach(product=>{

            container.appendChild(product);

        });

    });

}

// price range filter

let priceRange = document.getElementById("price-range");

if(priceRange){

    let priceValue = document.getElementById("price-value");

    priceRange.addEventListener("input",function(){

        priceValue.innerText=this.value;

        let products=document.querySelectorAll(".products-card");
           let maxPrice = Number(this.value);

        products.forEach(function(product){

            let price= Number(product.dataset.price);

            if(price<= maxPrice){

                product.style.display="";// show product

            }else{

                product.style.display="none"; // hide product

            }

        });

    });

}


// responsive navbar


const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

}

// Dark Mode

let themeBtn = document.getElementById("theme-toggle");

if(themeBtn){

    if(localStorage.getItem("theme") === "dark"){

        document.body.classList.add("dark");

        themeBtn.innerHTML = "☀️";

    }

    themeBtn.addEventListener("click",function(){

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

            themeBtn.innerHTML = "☀️";

        }

        else{

            localStorage.setItem("theme","light");

            themeBtn.innerHTML = "🌙";

        }

    });

}

 // Wishlist

let wishlistBtns=document.querySelectorAll(".wishlist-btn");

wishlistBtns.forEach(button=>{

    button.addEventListener("click",()=>{

        let product={

            name:button.dataset.name,

            price:button.dataset.price,

            image:button.dataset.image

        };

        let wishlist=JSON.parse(localStorage.getItem("wishlist")) || [];

        let exists = wishlist.find(item => item.name === product.name);

        if(exists){

        alert("Product Already In Wishlist");

         return;

}

wishlist.push(product);

        localStorage.setItem("wishlist",JSON.stringify(wishlist));

        alert("Added To Wishlist");

    });

});




// Wishlist Page

let wishlistContainer=document.getElementById("wishlist-items");

if(wishlistContainer){

    let wishlist=JSON.parse(localStorage.getItem("wishlist")) || [];

    if(wishlist.length==0){

        wishlistContainer.innerHTML="<h3>Your Wishlist is Empty</h3>";

    }

    else{

        wishlist.forEach((product,index)=>{

            wishlistContainer.innerHTML+=`

            <div class="wishlist-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <button onclick="removeWishlist(${index})">

                    Remove

                </button>

            </div>

            `;

        });

    }

    window.removeWishlist=function(index){

        wishlist.splice(index,1);

        localStorage.setItem("wishlist",JSON.stringify(wishlist));

        location.reload();

    }

}

// rating

let ratings = document.querySelectorAll(".rating");

ratings.forEach(function(rating){

    let stars = rating.querySelectorAll(".star");
    let text = rating.querySelector(".rating-text");

    stars.forEach(function(star){
        star.addEventListener("click",function(){

            let value = Number(this.dataset.value);

            stars.forEach(function(s){

                if(Number(s.dataset.value) <= value){

                    s.classList.add("active");
                }else{
                    s.classList.remove("active");
                }
            });
            text.innerHTML = value + "/ 5 Rating";
        });
    });
});



// Order Number


let orderNumber = document.getElementById("order-number");

if(orderNumber){

    let number = localStorage.getItem("orderNumber");

    if(!number){

        number = "ORD" + Math.floor(100000 + Math.random() * 900000);

        localStorage.setItem("orderNumber", number);

    }

    orderNumber.innerText = number;
}
let roomCodeDisplay = document.getElementById("room-code-display");

if(roomCodeDisplay){

roomCodeDisplay.innerText = localStorage.getItem("roomCode") || "Not Available";

}

let orderDate = document.getElementById("order-date");

if(orderDate){

let today = new Date();

orderDate.innerText = today.toLocaleString();

}


// Product Reviews

let reviewForm = document.getElementById("review-form");

if(reviewForm){

    let reviewList = document.getElementById("review-list");

    // Product id
    let params = new URLSearchParams(window.location.search);
    let productId = params.get("id");

    // Reviews load
    function loadReviews(){

        let reviews = JSON.parse(localStorage.getItem("reviews")) || {};

        let productReviews = reviews[productId] || [];

        reviewList.innerHTML = "";

        productReviews.forEach(function(review){

            reviewList.innerHTML += `

            <div class="review-card">

                <h4>${review.name}</h4>

                <p>${review.message}</p>

            </div>

            `;

        });

    }

    loadReviews();

    // Review submit
    reviewForm.addEventListener("submit",function(e){

        e.preventDefault();

        let name = document.getElementById("review-name").value.trim();

        let message = document.getElementById("review-message").value.trim();

        if(name=="" || message==""){

            alert("Please Fill All Fields");

            return;

        }

        let reviews = JSON.parse(localStorage.getItem("reviews")) || {};

        if(!reviews[productId]){

            reviews[productId] = [];

        }

        reviews[productId].push({

            name:name,
            message:message

        });

        localStorage.setItem("reviews",JSON.stringify(reviews));

        reviewForm.reset();

        loadReviews();

        alert("Review Submitted Successfully!");

    });

}

// PRINT RECEIPT

let printBtn = document.getElementById("print-receipt");

if(printBtn){

    printBtn.addEventListener("click", function(){

        window.print();

    });

}
// Create Room


const createRoom=document.getElementById("create-room");
const roomCode=document.getElementById("room-code");

if(createRoom){

createRoom.onclick=function(){

let code="ROOM"+Math.floor(Math.random()*10000);

roomCode.innerText=code;

localStorage.setItem("roomCode",code);
localStorage.setItem("memberCount",1);

alert("Room Created Successfully");

window.location.href="room.html";

alert("Room Created Successfully");

}

}

// join room 

const joinBtn=document.getElementById("join-btn");

if(joinBtn){

joinBtn.onclick=function(){

let enteredCode=document.getElementById("join-code").value;

let savedCode=localStorage.getItem("roomCode");

if(enteredCode===savedCode){

alert("Successfully Joined Room");

window.location.href="products.html";

}
else{

alert("Invalid Room Code");

}

}

}


// ACTIVITY LIST


let activityList = document.getElementById("activity-list");

if (activityList) {

    let activities = JSON.parse(localStorage.getItem("activities")) || [];

    if (activities.length === 0) {

        activityList.innerHTML = "<li>No Activity Yet</li>";

    } else {

        activities.reverse().forEach(activity => {

            activityList.innerHTML += `<li>${activity}</li>`;

        });

    }

}


// ROOM PAGE


let currentRoomCode = document.getElementById("current-room-code");
let roomMembers = document.getElementById("room-members");
let membersList = document.getElementById("members-list");
let sharedCartItems = document.getElementById("shared-cart-items");
let sharedTotal = document.getElementById("shared-total");
let checkoutBtn = document.getElementById("shared-checkout");
let chatBox = document.getElementById("chat-box");
let chatInput = document.getElementById("chat-message");
let sendBtn = document.getElementById("send-message");
let paymentList = document.getElementById("payment-list");
let leaveRoomBtn = document.getElementById("leave-room");

if(currentRoomCode){

    // Room Code
    let roomCode = localStorage.getItem("roomCode") || "CS000000";
    currentRoomCode.innerText = roomCode;

    // Members
    let members = parseInt(localStorage.getItem("memberCount")) || 1;
    roomMembers.innerText = members;

    membersList.innerHTML = "";

    for(let i=1;i<=members;i++){

        if(i==1){
            membersList.innerHTML += "<li>👤 You</li>";
        }else{
            membersList.innerHTML += "<li>👤 Member " + i + "</li>";
        }

    }

    // Shared Cart
    let cart = JSON.parse(localStorage.getItem("sharedCart")) || [];

console.log("Cart Data:", cart);

let sharedCartItems = document.getElementById("shared-cart-items");

sharedCartItems.innerHTML = "";

let total = 0;

cart.forEach(product => {

    let subtotal = Number(product.price) * Number(product.quantity);

    total += subtotal;

    sharedCartItems.innerHTML += `
        <div class="order-item">
            <span>${product.name} x ${product.quantity}</span>
            <span>₹${subtotal}</span>
        </div>
    `;

});

document.getElementById("shared-total").innerText = total;

if(cart.length === 0){
    sharedCartItems.innerHTML = "<p>No products added yet.</p>";
}

    // Split Payment
    let each = members > 0 ? Math.ceil(total / members) : total;

    paymentList.innerHTML = "";

    for(let i=1;i<=members;i++){

        if(i==1){
            paymentList.innerHTML += `<p>You : ₹${each}</p>`;
        }else{
            paymentList.innerHTML += `<p>Member ${i} : ₹${each}</p>`;
        }

    }

}

// Chat
if(sendBtn){

    sendBtn.addEventListener("click",function(){

        let message = chatInput.value.trim();

        if(message=="") return;

        chatBox.innerHTML += `
            <p><strong>You:</strong> ${message}</p>
        `;

        chatInput.value="";

        chatBox.scrollTop = chatBox.scrollHeight;

    });

}

// Checkout
if(checkoutBtn){

    checkoutBtn.addEventListener("click",function(){

        window.location.href="checkout.html";

    });

}

// Leave Room
if(leaveRoomBtn){

    leaveRoomBtn.addEventListener("click",function(){

        if(confirm("Are you sure you want to leave the room?")){

            localStorage.removeItem("roomCode");
            localStorage.removeItem("memberCount");

            window.location.href="dashboard.html";

        }

    });

}

// ADMIN DASHBOARD

let totalProducts = document.getElementById("total-products");
let totalOrders = document.getElementById("total-orders");
let totalWishlist = document.getElementById("total-wishlist");
let totalRooms = document.getElementById("total-rooms");
let totalRevenue = document.getElementById("total-revenue");
let ordersList = document.getElementById("orders-list");

if (totalProducts) {

    // Total Products
    totalProducts.innerText = products.length;

    // Wishlist
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    totalWishlist.innerText = wishlist.length;

    // Shopping Rooms
    let roomCode = localStorage.getItem("roomCode");
    totalRooms.innerText = roomCode ? 1 : 0;

    // Orders
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    totalOrders.innerText = orders.length;

    // Total Revenue
    let revenue = 0;

    orders.forEach(order => {

        let amount = String(order.total).replace("₹", "").trim();

        revenue += Number(amount);

    });

    if (totalRevenue) {
        totalRevenue.innerText = "₹" + revenue;
    }

    // Recent Orders
    if (orders.length === 0) {

        ordersList.innerHTML = "<p>No Orders Yet.</p>";

    } else {

        ordersList.innerHTML = "";

        orders.slice().reverse().forEach(order => {

            ordersList.innerHTML += `
                <div class="order-item">
                    <p>
                        <strong>${order.orderNumber}</strong><br>
                        ${order.name}<br>
                        ₹${order.total}
                    </p>
                </div>
            `;

        });

    }

}
// ADMIN PROTECTION

if (document.querySelector(".admin-page")) {

    let isAdmin = localStorage.getItem("adminLogin");

    if (isAdmin !== "true") {

        alert("Please Login First");

        window.location.href = "admin-login.html";

    }

}

// ADMIN LOGIN

let adminLoginForm = document.getElementById("admin-login-form");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let username = document.getElementById("admin-username").value.trim();
        let password = document.getElementById("admin-password").value.trim();

        if (username === "admin" && password === "admin123") {

            localStorage.setItem("adminLogin", "true");

            alert("Login Successful");

            window.location.href = "admin.html";

        } else {

            alert("Invalid Username or Password");

        }

    });

}


// ORDER HISTORY


let historyList = document.getElementById("history-list");

if(historyList){

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if(orders.length === 0){

        historyList.innerHTML = "<p>No Orders Found.</p>";

    }else{

        historyList.innerHTML = "";

        orders.slice().reverse().forEach(order=>{

            historyList.innerHTML += `

            <div class="history-card">

                <h3>Order : ${order.orderNumber}</h3>

                <p><strong>Name :</strong> ${order.name}</p>

                <p><strong>Total :</strong> ₹${order.total}</p>

            </div>

            `;

        });

    }

}

// PROFILE PAGE

let saveProfile = document.getElementById("save-profile");

if(saveProfile){

    // Load Saved Data
    document.getElementById("profile-name").value =
        localStorage.getItem("profileName") || "";

    document.getElementById("profile-email").value =
        localStorage.getItem("profileEmail") || "";

    document.getElementById("profile-phone").value =
        localStorage.getItem("profilePhone") || "";

    saveProfile.addEventListener("click",function(){

        localStorage.setItem(
            "profileName",
            document.getElementById("profile-name").value
        );

        localStorage.setItem(
            "profileEmail",
            document.getElementById("profile-email").value
        );

        localStorage.setItem(
            "profilePhone",
            document.getElementById("profile-phone").value
        );

        alert("Profile Saved Successfully!");

    });

}

// DOWNLOAD RECEIPT PDF

let pdfBtn = document.getElementById("download-pdf");

if(pdfBtn){

    pdfBtn.addEventListener("click", function(){

        const { jsPDF } = window.jspdf;

        let doc = new jsPDF();

        let orderNo = localStorage.getItem("orderNumber") || "N/A";

        let orders = JSON.parse(localStorage.getItem("orders")) || [];

        let lastOrder = orders[orders.length - 1];

        doc.setFontSize(20);
        doc.text("CartShare Receipt", 20, 20);

        doc.setFontSize(14);
        doc.text("Order Number : " + orderNo, 20, 40);

        if(lastOrder){

            doc.text("Customer : " + lastOrder.name, 20, 55);
            doc.text("Total : ₹" + lastOrder.total, 20, 70);

        }

        doc.text("Thank You For Shopping!", 20, 95);

        doc.save("CartShare_Receipt.pdf");

    });

}

// LOGOUT

let logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        localStorage.removeItem("adminLogin");

        alert("Logged Out Successfully");

        window.location.href = "index.html";

    });

}

// PRELOADER

window.addEventListener("load", function () {

    let loader = document.getElementById("loader");

    if(loader){

        loader.style.display = "none";

    }

});