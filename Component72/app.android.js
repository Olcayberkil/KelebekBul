
const self = {
  obj: document.querySelector(".component72"),
  rootPath: "",
  params: {
    ServerIp: "",
    RootPath: "",
    PlayerID: "",
    InstanceID: ""
  },
  url: window.location.href,
  baseUrl: "http://",

  butterflyProduct: null, 
  found: false,           

  getRealInstanceID() {
    const arr = (self.params.InstanceID || "").split("-");
    return arr[arr.length - 1] || "";
  },

  getServerIp() {
    return self.params.ServerIp;
  },

  getMediaListUrl(mediaListId) {
    return `${self.baseUrl}${self.params.ServerIp}/rest/getMediaListItems/${mediaListId}`;
  },

  restGetPlayerInfoUrl() {
    return (
      self.baseUrl +
      self.params.ServerIp +
      "/rest/getPlayerInfo/" +
      self.params.PlayerID +
      "/" +
      self.getRealInstanceID()
    );
  },

  getParams(url) {
    const out = {};
    const q = url.split("?")[1] || "";
    if (!q) return out;
    q.split("&").forEach((pair) => {
      const [k, v = ""] = pair.split("=");
      out[decodeURIComponent(k)] = decodeURIComponent(v);
    });
    return out;
  },

  selectWeightedRandom(products) {
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const r = Math.random() * totalStock;
    let acc = 0;
    for (const p of products) {
      acc += (p.stock || 0);
      if (r < acc) return p;
    }
    return products[0];
  },

  start() {
    const products = [
      { name: "adidas",      image: "image/adidas.png",     stock: 10 },
      { name: "çanta",       image: "image/canta.png",      stock: 0 },
      { name: "tişört",      image: "image/tisort.png",     stock: 0 },
      { name: "matara",      image: "image/matara.png",     stock: 0 },
      { name: "beyaz çanta", image: "image/beyazcanta.png", stock: 0 },
      { name: "gözlük",      image: "image/gozluk.png",     stock: 0 },
      { name: "parfüm",      image: "image/parfum.png",     stock: 0 },
      { name: "ruj",         image: "image/ruj.png",        stock: 0 },
      { name: "nike",        image: "image/nike.png",       stock: 0 }
    ];

    self.butterflyProduct = self.selectWeightedRandom(products);

    // Grid HTML
    let gridHTML = `<div class="product-grid">`;
    products.forEach((product) => {
      const hasButterfly = product === self.butterflyProduct;
      gridHTML += `
        <div class="product-box" onclick="self.checkButterfly(this, ${hasButterfly})" role="button" tabindex="0" aria-label="${product.name}">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='image/default.png'">
          ${hasButterfly ? '<img src="image/kelebek.png" class="butterfly" alt="Kelebek">' : ""}
        </div>`;
    });
    gridHTML += `</div>`;

    const html = `
      <div class="header">
        <div class="title-container">
          <h1 class="main-title">ÇILGIN KELEBEK'İ BUL,</h1>
          <h1 class="main-title">SÜRPRİZLERİ YAKALA!</h1>
        </div>
        <img src="image/icon.png" alt="icon" class="icon">
      </div>
      <div class="wrap">${gridHTML}</div>
      <div class="footer">
        <img src="image/logo.png" class="logo" alt="BOYNER">
      </div>
    `;

    if (self.obj) self.obj.innerHTML = html;

    self.obj.querySelectorAll(".product-box").forEach((box) => {
      box.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          box.click();
        }
      });
    });
  },

  checkButterfly(el, hasButterfly) {
    if (self.found) return;

    if (hasButterfly) {
      self.found = true;
      el.classList.add("found");

      const butterfly = el.querySelector(".butterfly");
      if (butterfly) {
        butterfly.style.display = "block";

        // 1) Kelebek kutudan çıksın
        setTimeout(() => {
          butterfly.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
          butterfly.style.transform = "translate(-50%, -30px) scale(2.8)";
          butterfly.style.left = "50%";
          butterfly.style.top = "50%";
          butterfly.style.transformOrigin = "center center";

          // 2) Konfeti + sürü
          setTimeout(() => {
            self.showConfetti(butterfly);

            // 3) Kazan ekranı
            setTimeout(() => {
              if (self.obj) self.obj.classList.add("blurred");
              self.showWinMessage();
            }, 3000);
          }, 1000);
        }, 300);
      }
    } else {
      el.classList.add("wrong");
      setTimeout(() => el.classList.remove("wrong"), 1000);

      setTimeout(() => {
        if (self.obj) self.obj.classList.add("blurred");
        self.showLoseMessage();
      }, 1200);
    }
  },

  showConfetti(sourceButterfly) {
    const rect = sourceButterfly.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // 1) Konfeti parçacıkları
    for (let i = 0; i < 250; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti-particle";
        const types = ["circle", "rect", "triangle"];
        const colors = ["#ff3b30", "#00B9F1", "#ffcc00", "#34c759", "#5856d6"];
        confetti.classList.add(types[Math.floor(Math.random() * types.length)]);
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 20 + 5; 
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${startX}px`;
        confetti.style.top = `${startY}px`;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 12 + 3;
        const rotation = Math.random() * 1080 - 540;
        const duration = Math.random() * 3 + 2;

        confetti.style.setProperty("--angle", `${angle}rad`);
        confetti.style.setProperty("--velocity", `${velocity}`);
        confetti.style.setProperty("--rotation", `${rotation}deg`);
        confetti.style.animationDuration = `${duration}s`;

        document.body.appendChild(confetti);
        confetti.addEventListener("animationend", () => confetti.remove());
      }, i * 20);
    }

    // 2) Uçan kelebek sürüsü
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const b = document.createElement("img");
        b.src = "image/kelebek.png";
        b.className = "flying-butterfly";
        const size = 50 + Math.random() * 30;
        b.style.width = `${size}px`;
        b.style.height = `${size}px`;
        b.style.left = `${startX}px`;
        b.style.top = `${startY}px`;

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 300;
        const randomFactor = Math.random() * 2 - 1;
        const targetX = startX + Math.cos(angle + randomFactor) * distance;
        const targetY = startY + Math.sin(angle - randomFactor) * distance;
        const rotation = Math.random() * 1080 - 540;
        const duration = 2 + Math.random() * 2;

        b.style.setProperty("--target-x", `${targetX}px`);
        b.style.setProperty("--target-y", `${targetY}px`);
        b.style.setProperty("--rotation", `${rotation}deg`);
        b.style.animationDuration = `${duration}s`;

        document.body.appendChild(b);
        b.addEventListener("animationend", () => b.remove());
      }, i * 80);
    }
  },

  showWinMessage() {
    const product = self.butterflyProduct || { name: "sürpriz ürün", image: "", color: "#ccc" };
    const message = document.createElement("div");
    message.className = "win-message";
    message.innerHTML = `
      <div class="butterfly-main"></div>
      <h2>TEBRİKLER!</h2>
      <p><span class="prize-name">${product.name.toUpperCase()}</span> Ürününü Kazandınız!</p>
      <div class="prize-image">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='image/default.png'">
      </div>
      <button type="button" onclick="self.resetGame()">KAPAT</button>
    `;
    document.body.appendChild(message);
    requestAnimationFrame(() => message.classList.add("active"));
  },

  showLoseMessage() {
    const message = document.createElement("div");
    message.className = "lose-message";
    message.innerHTML = `
      <div class="lose-message-content" role="dialog" aria-live="assertive">
        <h2>ÜZGÜNÜZ!</h2>
        <p>Kelebeği Bulamadınız</p>
        <button type="button" onclick="self.resetGame()">TEKRAR DENE</button>
      </div>
    `;
    document.body.appendChild(message);
    requestAnimationFrame(() => message.classList.add("active"));
  },

  resetGame() {
    if (self.obj) self.obj.classList.remove("blurred");
    document.querySelectorAll(".win-message, .lose-message").forEach((el) => el.remove());
    document.querySelectorAll(".confetti-particle, .flying-butterfly").forEach((el) => el.remove());
    self.found = false;
    self.start();
  },

  init() {
    self.params = self.getParams(self.url);
    self.rootPath = self.params.RootPath || "";
    self.start();
  }
};

window.onload = self.init;
