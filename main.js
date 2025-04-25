const prices = {
  RTX_5090: 154000, RTX_5080: 138600, RTX_4090: 92400, RTX_4080: 108150,
  RTX_4070: 61600, RTX_4060: 67760, RTX_3090: 492800, RTX_3080: 369600,
  RTX_3060: 246400, Z700: 231000, ZX750: 200200, Helios: 92400, X500: 86240,
  CX470: 67760, AS370: 61600, A600: 55440, ZX900K: 77000, ZYP909: 24640,
  T1200Z: 22880, Ultra_9: 43200, Ultra_7: 46200, Intel_i9: 30400,
  Intel_i7: 15200, Intel_i5: 18400, Intel_i3: 30400, Ryzen_9: 66600,
  Ryzen_7: 72800, Ryzen_5: 75000, Ryzen_3: 44500, corsair_Ven3200: 400,
  G_skill_Z5: 580, G_Skill_Z6: 550, corsair_Ven5200: 500, G_Skill_Z7: 350,
  Samsung_4800: 625, T_Force_X: 965, Viper_Steel: 758, Viper_RGB: 600,
  Viper4: 698, Seagate_530: 400, Crucial_T700: 580, Nextorage_NEM: 550,
  WD_SN850X: 500, Samsung_990: 350, WD_Red: 625, Ironwolf: 965,
  WD_Black: 600, WD_Blue: 758, BarraCuda: 758
};


const order = JSON.parse(localStorage.getItem("currentOrder"));
const summaryList = document.getElementById("order-summary");
if (order && summaryList) {
  let total = 0;
  for (const id in order) {
    const qty = order[id];
    const price = (prices[id] || 0) * qty;
    total += price;
    const li = document.createElement("li");
    li.textContent = `${id.replace(/_/g, " ")} - Qty: ${qty} - Rs.${price}`;
    summaryList.appendChild(li);
  }
  summaryList.innerHTML += `<li><strong>Total: Rs.${total}</strong></li>`;
}


const checkoutForm = document.getElementById("checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const card = document.getElementById("card").value.trim();

    if (name && email && address && /^\d{10}$/.test(card)) {
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 5); // Add 5 days
      alert(`Thank you for your purchase, ${name}! Your order will be delivered by ${deliveryDate.toDateString()}.`);
    } else {
      alert("Please fill in all fields correctly.");
    }
  });
}


function addToCart() {
  const tbody = document.querySelector("#cart-table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  let total = 0;

  for (const id in prices) {
    const input = document.getElementById(id);
    if (!input) continue;

    const qty = parseInt(input.value || "0");
    if (qty > 0) {
      const price = prices[id] * qty;
      total += price;
      const row = `<tr><td>${id.replace(/_/g, " ")}</td><td>${qty}</td><td>Rs.${price}</td></tr>`;
      tbody.innerHTML += row;
    }
  }

  const totalElem = document.getElementById("total-price");
  if (totalElem) {
    totalElem.textContent = "$." + total;
  }
}

// 🛍 BUY NOW
function buyNow() {
  localStorage.setItem("currentOrder", JSON.stringify(getOrderData()));
  window.location.href = "checkout.html";
}


function saveFavourite() {
  localStorage.setItem("favouriteOrder", JSON.stringify(getOrderData()));
  alert("Order saved as favourite.");
}

function applyFavourite() {
  const fav = JSON.parse(localStorage.getItem("favouriteOrder"));
  if (!fav) return alert("No favourite order saved.");
  for (const id in fav) {
    const input = document.getElementById(id);
    if (input) input.value = fav[id];
  }
  addToCart();
}


function getOrderData() {
  const data = {};
  for (const id in prices) {
    const input = document.getElementById(id);
    if (!input) continue;

    const qty = parseInt(input.value || "0");
    if (qty > 0) {
      data[id] = qty;
    }
  }
  return data;
}

const orderBody = document.getElementById("orderBody");
const totalPriceCell = document.getElementById("totalPrice");

if (order && orderBody && totalPriceCell) {
  let total = 0;
  for (const id in order) {
    const qty = order[id];
    const price = prices[id] || 0;
    const subtotal = price * qty;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${id.replace(/_/g, " ")}</td>
      <td>${qty}</td>
      <td>Rs.${price}</td>
      <td>Rs.${subtotal}</td>
    `;
    orderBody.appendChild(row);
  }

  totalPriceCell.textContent = "Rs." + total;
}

// ✅ CHECKOUT FORM SUBMIT FUNCTION
function submitOrder() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const card = document.getElementById("card").value.trim();
  const thankYou = document.getElementById("thankYouMessage");

  if (
    name && email && phone && address && city &&
    /^\d{10}$/.test(card)
  ) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    thankYou.innerHTML = `
      <h3>Thank you, ${name}!</h3>
      <p>Your order has been placed successfully.</p>
      <p>Expected delivery by <strong>${deliveryDate.toDateString()}</strong>.</p>
    `;

    window.scrollTo({ top: thankYou.offsetTop, behavior: 'smooth' });
  } else {
    alert("Please fill in all fields correctly. Card number should be 10 digits.");
  }
}
