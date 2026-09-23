const screen = document.getElementById("screen"),
  toastEl = document.getElementById("toast");

const state = {
  name: "",
  gender: "",
  destiny: "",
  answers: []
};

const challenges = [
  ["click", "CLICK THIS BUTTON EXACTLY 10 TIMES.", "Not 9. Not 11. Exactly 10.", 10],
  ["hold", "HOLD THE BUTTON FOR 5 SECONDS.", "Your future depends on your finger.", 5],
  ["wait", "DON’T CLICK ANYTHING FOR 5 SECONDS.", "Seriously. Do nothing.", 5],
  ["timed", "CLICK THE BUTTON 7 TIMES BEFORE TIME RUNS OUT.", "You have 5 seconds.", 7],
  ["thirteen", "PRESS THE BUTTON WHEN THE COUNTER REACHES 13.", "Timing is apparently a life skill.", 13]
];

const questions = [
  [
    "You suddenly receive ৳100,000. What do you do?",
    ["Save it", "Buy something", "Invest it", "Bro... first let me receive it."]
  ],
  [
    "Your friend says: “Let’s start a business.”",
    ["LET’S GO 🔥", "After exams", "After I get a job", "Send me the plan first."]
  ],
  [
    "Your alarm rings at 7:00 AM.",
    ["Wake up", "Snooze", "Snooze again", "Turn off alarm and question my life"]
  ],
  [
    "You have one free weekend. What’s the plan?",
    ["Learn something", "Go somewhere", "Sleep", "Whatever happens, happens."]
  ],
  [
    "Your dream job offers you an interview tomorrow.",
    ["Prepare immediately", "Watch a few videos first", "Panic, then prepare", "Tomorrow is future me’s problem."]
  ]
];

function esc(s) {
  return s.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

function shell(x) {
  screen.className = "screen " + (state.gender === "female" ? "magic" : "roast");
  screen.innerHTML = x;
}

function toast(m) {
  toastEl.textContent = m;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 1700);
}

function sparkle(n = 30) {
  const w = document.createElement("div");
  w.className = "sparkles";
  document.body.appendChild(w);
  for (let i = 0; i < n; i++) {
    let s = document.createElement("span");
    s.className = "spark";
    s.textContent = state.gender === "female" ? "✦" : "⚡";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 85 + "%";
    s.style.setProperty("--x", Math.random() * 220 - 110 + "px");
    s.style.setProperty("--y", Math.random() * 220 - 110 + "px");
    w.appendChild(s);
  }
  setTimeout(() => w.remove(), 1600);
}

function start() {
  shell(`
    <div class="card hero">
      <span class="emoji">🔮</span>
      <div class="logo">PREDICT ME</div>
      <p class="tag">Because apparently, you need to know.</p>
      <label>Enter your name</label>
      <input id="name" maxlength="30" placeholder="Your name..." autocomplete="off">
      <label>How should we address you?</label>
      <div class="gender-grid">
        <button class="choice" data-g="male">
          <b>👨 Male</b>
         
        </button>
        <button class="choice" data-g="female">
          <b>👩 Female</b>
          
        </button>
      </div>
      <button id="go" class="primary" disabled>REVEAL MY FUTURE →</button>
    </div>
  `);

  let g = "";
  document.querySelectorAll("[data-g]").forEach(
    (b) =>
      (b.onclick = () => {
        g = b.dataset.g;
        state.gender = g;
        document.querySelectorAll("[data-g]").forEach((x) => x.classList.remove("selected"));
        b.classList.add("selected");
        check();
      })
  );

  document.getElementById("name").oninput = check;

  function check() {
    document.getElementById("go").disabled = !(g && document.getElementById("name").value.trim());
  }

  document.getElementById("go").onclick = () => {
    state.name = document.getElementById("name").value.trim();
    analysis();
  };
}

function analysis() {
  const lines = [
    "Analyzing your personality...",
    "Scanning your life choices...",
    "Checking your career trajectory...",
    "Consulting the universe...",
    "Analyzing your questionable decisions...",
    "Checking your luck..."
  ];

  shell(`
    <div class="card center">
      <span class="emoji">${state.gender === "female" ? "✨" : "🔥"}</span>
      <h1 class="title">Analyzing ${esc(state.name)}...</h1>
      <div class="progress">
        <div id="bar" class="bar"></div>
      </div>
      <div id="logs" class="analysis-log"></div>
    </div>
  `);

  let i = 0,
    t = setInterval(() => {
      document.getElementById("bar").style.width = Math.min(100, (i + 1) * 17) + "%";
      document.getElementById("logs").innerHTML += `<div>${lines[i]}</div>`;
      i++;
      if (i === lines.length) {
        clearInterval(t);
        setTimeout(() => {
          document.getElementById("logs").innerHTML += "<div><b>Hmm...</b></div><div><b>We found something.</b></div>";
          setTimeout(upgrade, 900);
        }, 500);
      }
    }, 600);
}

function upgrade() {
  if (state.gender === "female") {
    shell(`
      <div class="card center">
        <span class="emoji">✨</span>
        <span class="badge">MAGICAL FUTURE™</span>
        <h1 class="title">Your future has been analyzed...</h1>
        <p class="subtitle">Wait...<br><b>We found something beautiful. ✨</b></p>
        <div class="payment-option">
          <strong>🌸 Premium predictions</strong>
          <span class="small">Career, love, money, luck and extremely unnecessary information.</span>
        </div>
        <button class="primary" id="u">✨ CHECK MY ACCESS</button>
      </div>
    `);
  } else {
    shell(`
      <div class="card center">
        <span class="emoji">🔥</span>
        <span class="badge">ROAST FUTURE™</span>
        <h1 class="title">Your future has been analyzed.</h1>
        <p class="subtitle">Unfortunately...<br><b>we have some concerns. 💀</b></p>
        <div class="payment-option">
          <strong>Career prediction</strong>
          <span class="small">Possibly successful.</span>
        </div>
        <div class="payment-option">
          <strong>Money + Love + Luck</strong>
          <span class="small">Highly classified. Also questionable.</span>
        </div>
        <button class="primary" id="u">UPGRADE MY FUTURE →</button>
      </div>
    `);
  }
  document.getElementById("u").onclick = state.gender === "female" ? femalePay : malePay;
}

function malePay() {
  shell(`
    <div class="card center">
      <span class="emoji">💳</span>
      <span class="badge">PAYMENT REQUIRED</span>
      <h1 class="title">Access fee required.</h1>
      <div class="payment-option">
        <strong>Real Money</strong>
        <span class="small">❌ Currently unavailable.</span>
      </div>
      <div class="payment-option">
        <strong>Credit Card</strong>
        <span class="small">❌ The Universe doesn’t trust banks.</span>
      </div>
      <div class="payment-option">
        <strong>Do Something Stupid</strong>
        <span class="small">✅ Recommended.</span>
      </div>
      <button class="primary" id="s">🤡 DO SOMETHING STUPID</button>
    </div>
  `);
  document.getElementById("s").onclick = challenge;
}

function challenge() {
  let c = challenges[Math.floor(Math.random() * challenges.length)],
    type = c[0];

  shell(`
    <div class="card center">
      <span class="emoji">🤡</span>
      <span class="badge">PAYMENT MINI-GAME</span>
      <h1 class="title">${c[1]}</h1>
      <p class="subtitle">${c[2]}</p>
      <div class="challenge">
        <div id="counter" class="counter">${type === "click" ? "0 / 10" : type === "thirteen" ? "0" : "5"}</div>
        <button id="cb" class="challenge-btn">PAY WITH YOUR DIGNITY</button>
      </div>
      <p class="small">No money required. Your dignity, however, is non-refundable.</p>
    </div>
  `);

  let b = document.getElementById("cb"),
    co = document.getElementById("counter"),
    n = 0,
    left = 5,
    start = 0,
    timer,
    done = false,
    finish = () => {
      if (done) return;
      done = true;
      clearInterval(timer);
      accepted();
    };

  if (type === "click") {
    b.onclick = () => {
      n++;
      co.textContent = n + " / 10";
      if (n === 10) finish();
    };
  } else if (type === "hold") {
    b.onpointerdown = () => {
      start = Date.now();
      clearInterval(timer);
      timer = setInterval(() => {
        let x = Math.max(0, 5 - (Date.now() - start) / 1000);
        co.textContent = x.toFixed(1);
        if (x <= 0) finish();
      }, 40);
    };
    ["pointerup", "pointerleave", "pointercancel"].forEach((e) =>
      b.addEventListener(e, () => {
        if (!done) {
          clearInterval(timer);
          co.textContent = "Try again.";
        }
      })
    );
  } else if (type === "wait") {
    b.disabled = true;
    timer = setInterval(() => {
      left--;
      co.textContent = left;
      if (left <= 0) finish();
    }, 1000);
    b.onclick = () => {
      clearInterval(timer);
      toast("YOU CLICKED. Challenge failed. 💀");
      challenge();
    };
  } else if (type === "timed") {
    timer = setInterval(() => {
      left--;
      co.textContent = n + " / 7 • " + left + "s";
      if (left <= 0) {
        clearInterval(timer);
        toast("Too slow. The universe has moved on.");
        challenge();
      }
    }, 1000);
    b.onclick = () => {
      n++;
      co.textContent = n + " / 7 • " + left + "s";
      if (n === 7) finish();
    };
  } else {
    b.onclick = () => {
      n++;
      co.textContent = n;
      if (n === 13) finish();
      else if (n > 13) {
        toast("You missed 13. Incredible.");
        challenge();
      }
    };
  }
}

function accepted() {
  shell(`
    <div class="card center">
      <span class="emoji">✅</span>
      <h1 class="title">PAYMENT ACCEPTED</h1>
      <div class="result">
        <b>Payment method:</b> Your Dignity™<br>
        <b>Amount paid:</b> ৳0.00<br>
        <b>Refund:</b> Absolutely not.
      </div>
      <div class="progress">
        <div id="bar" class="bar"></div>
      </div>
      <p id="p" class="subtitle">PROCESSING PAYMENT...</p>
    </div>
  `);

  let p = 0,
    t = setInterval(() => {
      p += 10;
      document.getElementById("bar").style.width = p + "%";
      document.getElementById("p").textContent = "PROCESSING PAYMENT... " + p + "%";
      if (p >= 100) {
        clearInterval(t);
        setTimeout(() => {
          sparkle(35);
          unlock();
        }, 450);
      }
    }, 130);
}

function femalePay() {
  shell(`
    <div class="card center">
      <span class="emoji">🔮</span>
      <span class="badge">PREMIUM FUTURE™</span>
      <h1 class="title">Calculating access fee...</h1>
      <p id="m" class="subtitle">Checking eligibility...</p>
    </div>
  `);

  let m = document.getElementById("m");
  setTimeout(() => (m.textContent = "Checking again... ✨"), 850);
  setTimeout(() => (m.innerHTML = "Wait...<br><b>✨ SPECIAL NOTICE ✨</b>"), 1700);
  setTimeout(
    () =>
      (m.innerHTML =
        "Apparently...<br><b>your future is too lovely to charge for. 💜</b><br><br><b>ACCESS FEE: ৳0.00</b><br><br>Everything is FREE for you. 🌸"),
    2700
  );
  setTimeout(() => {
    screen.querySelector(".card").innerHTML += `<button class="primary" id="free">✨ UNLOCK MY FUTURE — FREE</button>`;
    sparkle(25);
    document.getElementById("free").onclick = () => {
      sparkle(55);
      unlock();
    };
  }, 3500);
}

function unlock() {
  shell(`
    <div class="card center">
      <span class="emoji">${state.gender === "female" ? "💫" : "🔓"}</span>
      <h1 class="title">${state.gender === "female" ? "✨ MAGIC ACCESS GRANTED ✨" : "🔓 PREMIUM FUTURE™ UNLOCKED"}</h1>
      <p class="subtitle">${
        state.gender === "female"
          ? "Welcome to your Premium Future. 💫<br><em>The Universe likes you.</em>"
          : "Congratulations. You have successfully paid with your dignity. 💀"
      }</p>
      <button class="primary" id="c">CONTINUE →</button>
    </div>
  `);
  document.getElementById("c").onclick = destiny;
}

function destiny() {
  shell(`
    <div class="card">
      <div class="center">
        <span class="emoji">🔮</span>
        <h1 class="title">CHOOSE YOUR DESTINY</h1>
        <p class="subtitle">The universe offers three suspiciously accurate possibilities.</p>
      </div>
      <div class="destiny-grid">
        <button class="destiny" data-d="ambitious">
          <b>🚀 THE AMBITIOUS ONE</b>
          <span class="small">You want success. Probably.</span>
        </button>
        <button class="destiny" data-d="lucky">
          <b>🍀 THE LUCKY ONE</b>
          <span class="small">Things somehow work out for you.</span>
        </button>
        <button class="destiny" data-d="chaotic">
          <b>🌪️ THE CHAOTIC ONE</b>
          <span class="small">Nobody knows what’s going to happen. Including you.</span>
        </button>
      </div>
      <button class="primary" id="db" disabled>ACCEPT MY DESTINY →</button>
    </div>
  `);

  document.querySelectorAll("[data-d]").forEach(
    (b) =>
      (b.onclick = () => {
        state.destiny = b.dataset.d;
        document.querySelectorAll("[data-d]").forEach((x) => x.classList.remove("selected"));
        b.classList.add("selected");
        document.getElementById("db").disabled = false;
      })
  );

  document.getElementById("db").onclick = () => question(0);
}

function question(i) {
  if (i >= questions.length) return report();
  let q = questions[i];

  shell(`
    <div class="card">
      <span class="badge">FUTURE TEST ${i + 1} / ${questions.length}</span>
      <h1 class="title">${q[0]}</h1>
      <div class="choices">
        ${q[1].map((a, j) => `<button class="choice" data-a="${j}"><b>${String.fromCharCode(65 + j)}.</b>${a}</button>`).join("")}
      </div>
      <div class="progress">
        <div class="bar" style="width:${(i / questions.length) * 100}%"></div>
      </div>
    </div>
  `);

  document.querySelectorAll("[data-a]").forEach(
    (b) =>
      (b.onclick = () => {
        state.answers[i] = +b.dataset.a;
        document.querySelectorAll("[data-a]").forEach((x) => (x.disabled = true));
        b.classList.add("selected");
        setTimeout(() => question(i + 1), 300);
      })
  );
}

function report() {
  let base = state.gender === "female" ? [91, 78, 88, 72, 94, 97] : [87, 64, 23, 96, 52, 42];
  let nums = base.map((v, i) =>
    Math.max(
      5,
      Math.min(99, v + Math.floor(Math.random() * 15) - 7 + (state.answers[i % state.answers.length] === 0 ? 4 : 0))
    )
  );

  if (state.destiny === "ambitious") {
    nums[0] += 5;
    nums[4] += 6;
  }
  if (state.destiny === "lucky") {
    nums[5] += 8;
    nums[1] += 5;
  }
  if (state.destiny === "chaotic") {
    nums[3] += 8;
    nums[2] += 5;
  }

  let labels =
    state.gender === "female"
      ? ["🌸 Career", "💰 Money", "❤️ Love", "🧠 Overthinking", "✨ Happiness", "🍀 Luck"]
      : ["👨‍💻 Career", "💰 Money", "❤️ Love Life", "🧠 Overthinking", "🔥 Ambition", "🍀 Luck"];

  let msgs =
    state.gender === "female"
      ? ["Something exciting is coming. ✨", "Suspiciously good.", "The universe is keeping that one secret. 💜"]
      : ["Connection failed.", "Currently unavailable.", "Loading... 37%"];

  shell(`
    <div class="card">
      <div class="center">
        <span class="emoji">${state.gender === "female" ? "✨" : "🔥"}</span>
        <h1 class="title">${state.gender === "female" ? "YOUR MAGICAL FUTURE" : "YOUR FUTURE REPORT"}</h1>
        <p class="subtitle">${esc(state.name)}, destiny: <b>${state.destiny}</b></p>
      </div>
      ${labels
        .map(
          (l, i) => `
        <div class="stat">
          <div class="stat-head">
            <span>${l}</span>
            <span>${nums[i]}%</span>
          </div>
          <div class="statbar">
            <span data-v="${nums[i]}"></span>
          </div>
        </div>
      `
        )
        .join("")}
      <div class="choice-note">
        <b>${labels[0]}:</b> ${msgs[0]}<br>
        <b>${labels[5]}:</b> ${msgs[1]}<br>
        <b>${labels[2]}:</b> ${msgs[2]}
      </div>
      <button class="primary" id="tw">WAIT... THERE’S MORE →</button>
    </div>
  `);

  setTimeout(() => document.querySelectorAll(".statbar span").forEach((x) => (x.style.width = x.dataset.v + "%")), 150);
  document.getElementById("tw").onclick = twist;
}

function twist() {
  shell(`
    <div class="card center">
      <span class="emoji">👀</span>
      <h1 class="title">WAIT...</h1>
      <p class="subtitle">We just checked your future one more time...</p>
      <div class="progress">
        <div id="bar" class="bar"></div>
      </div>
      <p id="t" class="subtitle">Consulting the universe...</p>
    </div>
  `);

  let p = 0,
    t = setInterval(() => {
      p += 20;
      document.getElementById("bar").style.width = p + "%";
      if (p === 40) document.getElementById("t").textContent = "Cross-checking your decisions...";
      if (p === 80) document.getElementById("t").textContent = "This is getting suspicious...";
      if (p >= 100) {
        clearInterval(t);
        setTimeout(() => {
          shell(`
            <div class="card center">
              <span class="emoji">${state.gender === "female" ? "🌸" : "💀"}</span>
              <h1 class="title">We found one more thing.</h1>
              <p class="subtitle"><b>You are definitely going to play this again.</b> ${state.gender === "female" ? "✨" : "💀"}</p>
              <button class="primary" id="r">🔄 REPLAY FUTURE™</button>
            </div>
          `);
          document.getElementById("r").onclick = () => {
            state.name = "";
            state.gender = "";
            state.destiny = "";
            state.answers = [];
            start();
          };
        }, 650);
      }
    }, 160);
}

start();