const phone = "212772720087";
let allProducts = [];
let cart = [];
let currentLang = 'ar';

const cats = [
    { id: 'clothes', ar: 'ملابس', en: 'Clothes' },
    { id: 'shoes', ar: 'أحذية', en: 'Shoes' },
    { id: 'bags', ar: 'حقائب', en: 'Bags' },
    { id: 'jewelry', ar: 'مجوهرات', en: 'Jewelry' },
    { id: 'accessories', ar: 'إكسسوارات', en: 'Accessories' }
];

function init() {
    cats.forEach(c => {
        for (let i = 1; i <= 30; i++) {
            allProducts.push({
                id: `${c.id}-${i}`,
                cat: c.id,
                nameAr: `${c.ar} فاخر #${i}`,
                nameEn: `Luxury ${c.en} #${i}`,
                price: 150 + (i * 10),
                img: `https://picsum.photos/400/600?random=${c.id}${i}`
            });
        }
    });
    renderTabs();
    renderProducts(allProducts);
}

function renderTabs() {
    const container = document.getElementById('tabs-container');
    container.innerHTML = `<button class="tab-btn active" onclick="filterCategory('all', this)">${currentLang === 'ar' ? 'الكل' : 'All'}</button>` +
        cats.map(c => `<button class="tab-btn" onclick="filterCategory('${c.id}', this)">${currentLang === 'ar' ? c.ar : c.en}</button>`).join('');
}

function renderProducts(data) {
    const container = document.getElementById('products-container');
    container.innerHTML = data.map(p => `
        <div class="product-card">
            <img src="${p.img}">
            <div class="discount">${currentLang === 'ar' ? 'تخفيض محدود' : 'Limited Offer'}</div>
            <h3>${currentLang === 'ar' ? p.nameAr : p.nameEn}</h3>
            <p><b>${p.price} MAD</b></p>
            <button onclick="addToCart('${p.id}')" style="width:100%; padding:8px; background:black; color:white; border:none; border-radius:5px; cursor:pointer; margin-top:10px;">${currentLang === 'ar' ? 'إضافة' : 'Add'}</button>
        </div>
    `).join('');
}

function filterCategory(id, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if(id === 'all') renderProducts(allProducts);
    else renderProducts(allProducts.filter(p => p.cat === id));
}

function searchProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    renderProducts(allProducts.filter(p => p.nameAr.includes(term) || p.nameEn.toLowerCase().includes(term)));
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.getElementById('html-tag').dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    renderTabs();
    renderProducts(allProducts);
}

function addToCart(id) {
    cart.push(allProducts.find(p => p.id === id));
    document.getElementById('cart-count').innerText = cart.length;
    updateCart();
}

function updateCart() {
    document.getElementById('cart-items-list').innerHTML = cart.map(i => `<div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding:5px;"><span>${currentLang === 'ar' ? i.nameAr : i.nameEn}</span><span>${i.price} MAD</span></div>`).join('');
    document.getElementById('cart-total').innerText = cart.reduce((s, i) => s + i.price, 0);
}

function toggleCart() {
    const m = document.getElementById('cart-modal');
    m.style.display = (m.style.display === 'block') ? 'none' : 'block';
}

function sendOrder() {
    const n = document.getElementById('c-name').value;
    const t = document.getElementById('c-tel').value;
    if(!n || !t) return alert("المرجو ملء البيانات");
    const msg = `طلب جديد\nالاسم: ${n}\nالهاتف: ${t}\nالمنتجات:\n` + cart.map(i => `- ${i.nameAr}`).join('\n');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}

init();