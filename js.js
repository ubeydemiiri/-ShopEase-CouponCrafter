let cartItems = [];
let totalPrice = 0;
let isCouponUsed = false; 
let usedCouponCode = ''; 

function toggleCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.style.display = cartSidebar.style.display === 'none' ? 'block' : 'none';
}

function addToCart(price, name) {
  cartItems.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  totalPrice = 0;

  cartItems.forEach((item, index) => {
    totalPrice += item.price;
    const cartItem = document.createElement('div');
    cartItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');
    cartItem.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">حذف</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  document.getElementById('total').textContent = `المجموع: $${totalPrice}.00`;
}

function removeItem(index) {
  cartItems.splice(index, 1);
  updateCart();
}

function clearCart() {
  cartItems = [];
  updateCart();
}

function applyCoupon() {
  const couponCode = document.getElementById('coupon-code').value.trim(); 
  const couponMessage = document.getElementById('coupon-message');

  if (isCouponUsed) {
    if (couponCode === usedCouponCode) {
      couponMessage.textContent = 'تم استخدام الكوبون بالفعل!';
      couponMessage.classList.remove('text-success');
      couponMessage.classList.add('text-danger');
    } else {
      couponMessage.textContent = 'كوبون خاطئ!';
      couponMessage.classList.remove('text-success');
      couponMessage.classList.add('text-danger');
    }
    return;
  }

  if (couponCode === 'DISCOUNT30') {
    const discount = totalPrice * 0.3;
    totalPrice -= discount;
    document.getElementById('total').textContent = `المجموع: $${totalPrice.toFixed(2)}`;

    couponMessage.textContent = 'تم قبول الكوبون! تم تطبيق خصم 30%.';
    couponMessage.classList.remove('text-danger');
    couponMessage.classList.add('text-success');
    isCouponUsed = true; 
    usedCouponCode = couponCode; 
  } else {
    couponMessage.textContent = 'كوبون خاطئ!';
    couponMessage.classList.remove('text-success');
    couponMessage.classList.add('text-danger');
  }
}