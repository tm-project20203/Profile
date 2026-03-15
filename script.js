const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalContent = document.getElementById('modalContent');
const modalActions = document.getElementById('modalActions');
const closeModalBtn = document.getElementById('closeModal');
const helpBtn = document.getElementById('helpBtn');
const langBtn = document.getElementById('langBtn');
const interactionHint = document.getElementById('interactionHint');
const hudLocation = document.getElementById('hudLocation');
const hudPrompt = document.getElementById('hudPrompt');
const compassLabel = document.getElementById('compassLabel');
const sideTitle = document.getElementById('sideTitle');
const sideBody = document.getElementById('sideBody');
const miniList = document.getElementById('miniList');
const legendTitle = document.getElementById('legendTitle');
const legendBody = document.getElementById('legendBody');
const legendGrid = document.getElementById('legendGrid');
const skillsTitle = document.getElementById('skillsTitle');
const skillsList = document.getElementById('skillsList');

let lang = 'en';
let isModalOpen = true;
let activeBuilding = null;
const keys = {};

const translations = {
  en: {
    ui: {
      howToPlay: 'How to Play',
      close: 'Close',
      switchLang: '日本語',
      location: 'Location',
      moveHint: 'Move: WASD / Arrows ・ Interact: E',
      interact: 'Press E to enter',
      overviewTitle: 'Portfolio Overview',
      overviewBody: 'This version adds illustrated landmarks, icon signage, and a guide panel so each section is easier to understand at a glance.',
      legendTitle: 'Landmark Guide',
      legendBody: 'Each building has a visual icon and color theme. Explore in any order.',
      skillsTitle: 'Core Skills',
      compass: 'N ↑',
      townSquare: 'Town Square',
      mini: [
        { title: 'Design goal', text: 'Make the portfolio memorable without losing technical clarity.' },
        { title: 'New visuals', text: 'Buildings now use icons, roofs, windows, trees, a pond, paths, and signposts.' },
        { title: 'Best use', text: 'Use this as a GitHub Pages homepage and link it from your README.' }
      ],
      welcomeTitle: 'Welcome to the portfolio town',
      welcomeSubtitle: 'A game-style portfolio for engineering roles',
      welcomeContent: '<p>Use <strong>WASD</strong> or the <strong>arrow keys</strong> to move. Walk near a building and press <strong>E</strong> to open that section.</p><div class="grid-2"><div class="card"><h3>What changed</h3><ul><li>Illustrated scenery for easier navigation</li><li>Icon-based building identities</li><li>Side legend for first-time visitors</li><li>Clearer section hierarchy</li></ul></div><div class="card"><h3>Next upgrade options</h3><ul><li>Replace shapes with custom pixel art</li><li>Add your real GitHub / LinkedIn / resume links</li><li>Use your brand colors</li><li>Convert this into a multi-file Pages project</li></ul></div></div>',
      welcomeActions: [{ label: 'Start Exploring', type: 'close' }]
    },
    skills: ['Python', 'Linux (CLI/Operations)', 'Go', 'MATLAB/Simulink', 'ROS', 'CANalyzer', 'ETAS INCA', 'HIL/SIL', 'Raspberry Pi', 'IoT', 'Computer Vision'],
    buildings: {
      about: {
        name: 'About Me',
        subtitle: 'Background and positioning',
        summary: 'Embedded / controls / IoT engineer based in Toronto',
        content: '<p>I am an engineer with a background in <strong>powertrain software, system validation, embedded development, and IoT prototyping</strong>.</p><div class="grid-2"><div class="card"><h3>What I do</h3><ul><li>Control logic development and validation</li><li>Automation and tooling in Python and Go</li><li>IoT system prototyping with Raspberry Pi and Wi-SUN</li><li>Cross-functional engineering with practical test data</li></ul></div><div class="card"><h3>Current positioning</h3><ul><li>Target roles: embedded, controls, validation, IoT</li><li>Based in Toronto, building an international engineering career</li><li>Interested in collaborative and technically strong teams</li></ul></div></div>',
        actions: [{ label: 'Close', type: 'close' }]
      },
      experience: {
        name: 'Experience Hall',
        subtitle: 'Professional experience',
        summary: 'Nissan powertrain software and validation experience',
        content: '<div class="card"><h3>Nissan Motor Co. | Powertrain Software Engineer</h3><p>Worked on <strong>torque management and software engineering</strong> for vehicle control systems. Experience included model-based development, validation, and coordination across teams.</p></div><div class="grid-2"><div class="card"><h3>Core responsibilities</h3><ul><li>Torque control software development</li><li>MATLAB / Simulink model-based workflows</li><li>HIL and vehicle-level validation</li><li>Log analysis and root-cause investigation</li></ul></div><div class="card"><h3>Tools used</h3><ul><li>dSpace ControlDesk</li><li>ETAS INCA</li><li>CANalyzer</li><li>Python automation</li></ul></div></div>',
        actions: [{ label: 'Close', type: 'close' }]
      },
      projects: {
        name: 'Project Lab',
        subtitle: 'Selected projects',
        summary: 'IoT, automation, and applied software projects',
        content: '<div class="grid-2"><div class="card"><h3>IoT Energy Monitoring</h3><p>Built an SME-focused energy monitoring prototype using <strong>Wi-SUN, Echonet Lite, ESP32, and Raspberry Pi</strong>, with dashboard and backend integration.</p></div><div class="card"><h3>Automated Trading Bot</h3><p>Developing a <strong>Go-based Bitcoin trading bot</strong> for data processing, logic development, and automated execution experiments.</p></div><div class="card"><h3>Robot Vision</h3><p>Worked on <strong>robot control and image recognition</strong> using ROS, Python, data augmentation, and learning workflows during research.</p></div><div class="card"><h3>Process Automation</h3><p>Created Python tools to automate information extraction and reduce repetitive engineering/admin work.</p></div></div>',
        actions: [{ label: 'Close', type: 'close' }]
      },
      skills: {
        name: 'Skill Forge',
        subtitle: 'Technical stack',
        summary: 'Software, validation, IoT, and analysis',
        content: '<div class="grid-2"><div class="card"><h3>Embedded / Controls</h3><ul><li>MATLAB / Simulink</li><li>Control logic validation</li><li>HIL / SIL concepts</li><li>CAN-based measurement workflows</li></ul></div><div class="card"><h3>Programming</h3><ul><li>Python</li><li>Linux command-line operations</li><li>Go</li><li>C</li><li>JavaScript basics for web presentation</li></ul></div><div class="card"><h3>IoT / Systems</h3><ul><li>Raspberry Pi</li><li>Wi-SUN / Echonet Lite</li><li>Sensor integration</li><li>Dashboard prototyping</li></ul></div><div class="card"><h3>ML / Vision</h3><ul><li>ROS</li><li>OpenCV</li><li>Dataset creation</li><li>Model training workflows</li></ul></div></div>',
        actions: [{ label: 'Close', type: 'close' }]
      },
      contact: {
        name: 'Contact Station',
        subtitle: 'Links and next steps',
        summary: 'Add your real links before publishing',
        content: '<div class="grid-2"><div class="card"><h3>Suggested links</h3><ul><li><a href="https://github.com/tm-project20203">GitHub</a> - https://github.com/tm-project20203</li><li><a href="https://www.linkedin.com/in/kaito-tamura-7202002aa/">LinkedIn</a> - https://www.linkedin.com/in/kaito-tamura-7202002aa/</li></ul></div><div class="card"><h3>Publishing checklist</h3><ul><li>Replace placeholder links</li><li>Add your email or contact form</li><li>Customize colors and copy</li><li>Deploy on GitHub Pages</li></ul></div></div>',
        actions: [{ label: 'Close', type: 'close' }]
      }
    }
  },
  ja: {
    ui: {
      howToPlay: '遊び方',
      close: '閉じる',
      switchLang: 'English',
      location: '現在地',
      moveHint: '移動: WASD / 矢印キー ・ 調べる: E',
      interact: 'Eキーで入る',
      overviewTitle: 'ポートフォリオ概要',
      overviewBody: '今回は建物イラスト、アイコン看板、ガイドパネルを追加し、どの建物が何を表すかを一目で分かりやすくしました。',
      legendTitle: 'ランドマークガイド',
      legendBody: '各建物にアイコンと色を持たせています。好きな順番で探索できます。',
      skillsTitle: 'コアスキル',
      compass: '北 ↑',
      townSquare: 'タウンスクエア',
      mini: [
        { title: '設計意図', text: '面白さを出しつつ、技術内容は読みやすく保つこと。' },
        { title: '今回の追加', text: '建物アイコン、屋根、窓、木、池、道、看板を入れて理解しやすくしました。' },
        { title: '使い方', text: 'GitHub Pages のホームに置き、README からリンクする使い方が向いています。' }
      ],
      welcomeTitle: 'ポートフォリオタウンへようこそ',
      welcomeSubtitle: 'エンジニア向けのゲーム型ポートフォリオ',
      welcomeContent: '<p><strong>WASD</strong> または <strong>矢印キー</strong> で移動します。建物の近くで <strong>E</strong> を押すと、そのセクションが開きます。</p><div class="grid-2"><div class="card"><h3>今回の改善点</h3><ul><li>風景イラストで迷いにくい</li><li>建物ごとのアイコンで役割が明確</li><li>初見向けのガイドを追加</li><li>セクション構成を整理</li></ul></div><div class="card"><h3>次の強化案</h3><ul><li>独自ピクセルアートに置き換え</li><li>GitHub / LinkedIn / 履歴書の実リンク追加</li><li>ブランドカラーへ変更</li><li>GitHub Pages 用の複数ファイル構成へ移行</li></ul></div></div>',
      welcomeActions: [{ label: '探索を始める', type: 'close' }]
    },
    skills: ['Python', 'Linux操作 (CLI)', 'Go', 'MATLAB/Simulink', 'ROS', 'CANalyzer', 'ETAS INCA', 'HIL/SIL', 'Raspberry Pi', 'IoT', '画像認識'],
    buildings: {
      about: {
        name: 'About Me',
        subtitle: 'バックグラウンドと現在の方向性',
        summary: 'トロント拠点の組み込み・制御・IoTエンジニア',
        content: '<p><strong>パワートレイン制御、システム検証、組み込み開発、IoT試作</strong> を軸に経験を積んできたエンジニアです。</p><div class="grid-2"><div class="card"><h3>できること</h3><ul><li>制御ロジックの開発と検証</li><li>Python / Go による自動化とツール開発</li><li>Raspberry Pi と Wi-SUN を使った IoT 試作</li><li>実測データに基づく課題分析</li></ul></div><div class="card"><h3>現在のポジショニング</h3><ul><li>志望領域: 組み込み、制御、検証、IoT</li><li>トロント拠点で国際的なエンジニアキャリアを構築中</li><li>協調的で技術力の高いチームに関心</li></ul></div></div>',
        actions: [{ label: '閉じる', type: 'close' }]
      },
      experience: {
        name: 'Experience Hall',
        subtitle: '職務経験',
        summary: '日産でのパワートレイン制御・検証経験',
        content: '<div class="card"><h3>日産自動車 | パワートレインソフトウェアエンジニア</h3><p><strong>トルクマネジメントおよびソフトウェア開発</strong> を担当。モデルベース開発、検証、関連部署との調整まで経験しました。</p></div><div class="grid-2"><div class="card"><h3>主な担当</h3><ul><li>トルク制御ソフトの開発</li><li>MATLAB / Simulink による MBD</li><li>HIL と実車での検証</li><li>ログ解析と原因調査</li></ul></div><div class="card"><h3>使用ツール</h3><ul><li>dSpace ControlDesk</li><li>ETAS INCA</li><li>CANalyzer</li><li>Python 自動化</li></ul></div></div>',
        actions: [{ label: '閉じる', type: 'close' }]
      },
      projects: {
        name: 'Project Lab',
        subtitle: '主なプロジェクト',
        summary: 'IoT、自動化、応用ソフトウェア',
        content: '<div class="grid-2"><div class="card"><h3>IoT エネルギー監視</h3><p><strong>Wi-SUN、Echonet Lite、ESP32、Raspberry Pi</strong> を用いた中小企業向けエネルギー監視試作機を開発し、ダッシュボード連携まで実装しました。</p></div><div class="card"><h3>自動売買ボット</h3><p>データ処理と売買ロジック実験のために、<strong>Go ベースの Bitcoin 自動売買ボット</strong> を開発中です。</p></div><div class="card"><h3>ロボットビジョン</h3><p>研究では <strong>ROS、Python、データ拡張、学習ワークフロー</strong> を用いてロボット制御と画像認識に取り組みました。</p></div><div class="card"><h3>業務自動化</h3><p>Python ツールを作成し、情報抽出や定型作業の時間を削減しました。</p></div></div>',
        actions: [{ label: '閉じる', type: 'close' }]
      },
      skills: {
        name: 'Skill Forge',
        subtitle: '技術スタック',
        summary: 'ソフトウェア、検証、IoT、分析',
        content: '<div class="grid-2"><div class="card"><h3>組み込み / 制御</h3><ul><li>MATLAB / Simulink</li><li>制御ロジック検証</li><li>HIL / SIL の基礎</li><li>CAN 計測ワークフロー</li></ul></div><div class="card"><h3>プログラミング</h3><ul><li>Python</li><li>Linux操作（コマンドライン）</li><li>Go</li><li>C</li><li>Web 表示用の JavaScript</li></ul></div><div class="card"><h3>IoT / システム</h3><ul><li>Raspberry Pi</li><li>Wi-SUN / Echonet Lite</li><li>センサー統合</li><li>ダッシュボード試作</li></ul></div><div class="card"><h3>ML / 画像認識</h3><ul><li>ROS</li><li>OpenCV</li><li>データセット作成</li><li>学習ワークフロー</li></ul></div></div>',
        actions: [{ label: '閉じる', type: 'close' }]
      },
      contact: {
        name: 'Contact Station',
        subtitle: 'リンクと公開準備',
        summary: '公開前に本物のリンクへ置き換えてください',
        content: '<div class="grid-2"><div class="card"><h3>推奨リンク</h3><ul><li><a href="#">GitHub</a> - 実際のプロフィール URL に置き換え</li><li><a href="#">LinkedIn</a> - 実際のプロフィール URL に置き換え</li><li><a href="#">Resume PDF</a> - 最終版 CV をアップロードしてリンク</li></ul></div><div class="card"><h3>公開チェックリスト</h3><ul><li>プレースホルダーを置換</li><li>メールまたはフォームを追加</li><li>色や文面を調整</li><li>GitHub Pages へデプロイ</li></ul></div></div>',
        actions: [{ label: '閉じる', type: 'close' }]
      }
    }
  }
};

const buildings = [
  { id: 'about', x: 90, y: 110, w: 180, h: 122, color: '#1d4ed8', roof: '#1e3a8a', icon: '👤' },
  { id: 'experience', x: 388, y: 82, w: 192, h: 145, color: '#7c3aed', roof: '#581c87', icon: '🏢' },
  { id: 'projects', x: 684, y: 112, w: 182, h: 126, color: '#0f766e', roof: '#115e59', icon: '🧪' },
  { id: 'skills', x: 144, y: 362, w: 198, h: 136, color: '#b45309', roof: '#92400e', icon: '🛠️' },
  { id: 'contact', x: 606, y: 362, w: 214, h: 124, color: '#be123c', roof: '#881337', icon: '✉️' }
];

const roads = [
  { x: 0, y: 270, w: 960, h: 72 },
  { x: 445, y: 0, w: 72, h: 600 },
  { x: 230, y: 232, w: 70, h: 110 },
  { x: 724, y: 236, w: 70, h: 106 },
  { x: 238, y: 342, w: 70, h: 82 },
  { x: 680, y: 342, w: 70, h: 82 }
];

const trees = [
  [50, 92], [300, 78], [620, 72], [890, 86], [62, 230], [900, 224], [66, 400], [350, 540], [553, 532], [894, 436], [880, 544], [38, 538]
];
const flowers = [
  [312, 172], [338, 176], [604, 166], [625, 170], [390, 522], [412, 528], [720, 520], [748, 526], [432, 392], [450, 398], [468, 394], [486, 398], [504, 394], [522, 398], [540, 394], [558, 398]
];
const clouds = [
  [120, 64, 28], [520, 52, 32], [808, 68, 26]
];

const signposts = [
  { x: 360, y: 258, labelEn: 'Career', labelJa: '経歴' },
  { x: 565, y: 258, labelEn: 'Projects', labelJa: 'PJ' },
  { x: 360, y: 355, labelEn: 'Skills', labelJa: 'スキル' },
  { x: 565, y: 355, labelEn: 'Contact', labelJa: '連絡先' }
];

const player = {
  x: 470,
  y: 300,
  w: 24,
  h: 30,
  speed: 2.4,
  color: '#22c55e'
};

function setSidePanel() {
  const t = translations[lang];
  sideTitle.textContent = t.ui.overviewTitle;
  sideBody.textContent = t.ui.overviewBody;
  legendTitle.textContent = t.ui.legendTitle;
  legendBody.textContent = t.ui.legendBody;
  skillsTitle.textContent = t.ui.skillsTitle;
  hudPrompt.textContent = t.ui.moveHint;
  langBtn.textContent = t.ui.switchLang;
  helpBtn.textContent = t.ui.howToPlay;
  closeModalBtn.textContent = t.ui.close;
  compassLabel.textContent = t.ui.compass;

  miniList.innerHTML = '';
  t.ui.mini.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'mini-item';
    div.innerHTML = `<strong>${item.title}</strong><span class="muted">${item.text}</span>`;
    miniList.appendChild(div);
  });

  legendGrid.innerHTML = '';
  buildings.forEach((building) => {
    const data = t.buildings[building.id];
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <div class="legend-icon">${building.icon}</div>
      <div class="legend-main">
        <strong>${data.name}</strong>
        <span class="muted">${data.summary}</span>
      </div>
    `;
    legendGrid.appendChild(item);
  });

  skillsList.innerHTML = '';
  t.skills.forEach((skill) => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = skill;
    skillsList.appendChild(span);
  });
}

function openWelcome() {
  const t = translations[lang].ui;
  modalTitle.textContent = t.welcomeTitle;
  modalSubtitle.textContent = t.welcomeSubtitle;
  modalContent.innerHTML = t.welcomeContent;
  modalActions.innerHTML = '';
  t.welcomeActions.forEach((action) => {
    const btn = document.createElement('button');
    btn.textContent = action.label;
    btn.className = 'primary-btn';
    btn.addEventListener('click', closeModal);
    modalActions.appendChild(btn);
  });
  showModal();
}

function openBuilding(id) {
  const data = translations[lang].buildings[id];
  modalTitle.textContent = data.name;
  modalSubtitle.textContent = data.subtitle;
  modalContent.innerHTML = data.content;
  modalActions.innerHTML = '';
  data.actions.forEach((action) => {
    const btn = document.createElement('button');
    btn.textContent = action.label;
    btn.addEventListener('click', closeModal);
    modalActions.appendChild(btn);
  });
  showModal();
}

function showModal() {
  modalOverlay.style.display = 'flex';
  isModalOpen = true;
}

function closeModal() {
  modalOverlay.style.display = 'none';
  isModalOpen = false;
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function wouldCollide(nextX, nextY) {
  const next = { x: nextX, y: nextY, w: player.w, h: player.h };
  return buildings.some((b) => rectsOverlap(next, b));
}

function clampPlayer() {
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.h, player.y));
}

function updatePlayer() {
  if (isModalOpen) {
    return;
  }
  let dx = 0;
  let dy = 0;
  if (keys['ArrowUp'] || keys.w || keys.W) dy -= player.speed;
  if (keys['ArrowDown'] || keys.s || keys.S) dy += player.speed;
  if (keys['ArrowLeft'] || keys.a || keys.A) dx -= player.speed;
  if (keys['ArrowRight'] || keys.d || keys.D) dx += player.speed;

  if (dx !== 0 && dy !== 0) {
    dx *= 0.7071;
    dy *= 0.7071;
  }

  const nextX = player.x + dx;
  const nextY = player.y + dy;
  if (!wouldCollide(nextX, player.y)) {
    player.x = nextX;
  }
  if (!wouldCollide(player.x, nextY)) {
    player.y = nextY;
  }
  clampPlayer();
}

function nearestBuilding() {
  const playerCenterX = player.x + player.w / 2;
  const playerCenterY = player.y + player.h / 2;
  let found = null;
  let minDistance = Infinity;
  buildings.forEach((b) => {
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;
    const distance = Math.hypot(playerCenterX - cx, playerCenterY - cy);
    if (distance < 128 && distance < minDistance) {
      found = b;
      minDistance = distance;
    }
  });
  return found;
}

function updateInteraction() {
  const t = translations[lang];
  activeBuilding = nearestBuilding();
  const locationText = activeBuilding ? t.buildings[activeBuilding.id].name : t.ui.townSquare;
  hudLocation.textContent = `${t.ui.location}: ${locationText}`;
  if (activeBuilding && !isModalOpen) {
    interactionHint.style.display = 'block';
    interactionHint.textContent = `${activeBuilding.icon} ${t.ui.interact} - ${t.buildings[activeBuilding.id].name}`;
  } else {
    interactionHint.style.display = 'none';
  }
}

function drawCloud(x, y, scale) {
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.beginPath();
  ctx.arc(x, y, scale, 0, Math.PI * 2);
  ctx.arc(x + scale, y - 6, scale * 0.9, 0, Math.PI * 2);
  ctx.arc(x + scale * 2, y, scale * 0.8, 0, Math.PI * 2);
  ctx.fill();
}

function drawTree(x, y) {
  ctx.fillStyle = '#7c4a21';
  ctx.fillRect(x - 4, y + 18, 8, 24);
  ctx.fillStyle = '#166534';
  ctx.beginPath();
  ctx.arc(x, y + 12, 18, 0, Math.PI * 2);
  ctx.arc(x - 12, y + 20, 14, 0, Math.PI * 2);
  ctx.arc(x + 12, y + 20, 14, 0, Math.PI * 2);
  ctx.fill();
}

function drawFlower(x, y) {
  ctx.fillStyle = '#15803d';
  ctx.fillRect(x, y + 6, 2, 8);
  ctx.fillStyle = '#f472b6';
  ctx.beginPath();
  ctx.arc(x + 1, y, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(x + 1, y, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawPond() {
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(492, 432, 78, 46, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(492, 428, 72, 40, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(480, 424, 12, 0, Math.PI * 1.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(514, 436, 16, 0, Math.PI * 1.5);
  ctx.stroke();
}

function drawTownFountain() {
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(480, 305, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(474, 286, 12, 22);
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.arc(480, 279, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#7dd3fc';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(480, 275);
  ctx.lineTo(480, 258);
  ctx.stroke();
}

function drawSignpost(sign) {
  ctx.fillStyle = '#7c4a21';
  ctx.fillRect(sign.x, sign.y, 6, 28);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(sign.x - 18, sign.y - 4, 42, 16);
  ctx.strokeStyle = '#cbd5e1';
  ctx.strokeRect(sign.x - 18, sign.y - 4, 42, 16);
  ctx.fillStyle = '#0f172a';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';
  const text = lang === 'en' ? sign.labelEn : sign.labelJa;
  ctx.fillText(text, sign.x + 3, sign.y + 7);
}

function drawRoads() {
  ctx.fillStyle = '#475569';
  roads.forEach((r) => ctx.fillRect(r.x, r.y, r.w, r.h));
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 3;
  roads.forEach((r) => {
    if (r.w > r.h) {
      for (let i = r.x + 18; i < r.x + r.w; i += 34) {
        ctx.beginPath();
        ctx.moveTo(i, r.y + r.h / 2);
        ctx.lineTo(i + 18, r.y + r.h / 2);
        ctx.stroke();
      }
    } else {
      for (let i = r.y + 18; i < r.y + r.h; i += 34) {
        ctx.beginPath();
        ctx.moveTo(r.x + r.w / 2, i);
        ctx.lineTo(r.x + r.w / 2, i + 18);
        ctx.stroke();
      }
    }
  });
}

function drawBuilding(building) {
  const data = translations[lang].buildings[building.id];
  const highlighted = activeBuilding && activeBuilding.id === building.id && !isModalOpen;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.28)';
  ctx.fillRect(building.x + 10, building.y + building.h - 4, building.w, 12);

  ctx.fillStyle = building.color;
  ctx.fillRect(building.x, building.y + 14, building.w, building.h - 14);
  ctx.fillStyle = building.roof;
  ctx.beginPath();
  ctx.moveTo(building.x - 6, building.y + 16);
  ctx.lineTo(building.x + building.w / 2, building.y - 10);
  ctx.lineTo(building.x + building.w + 6, building.y + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.fillRect(building.x + 16, building.y + 28, building.w - 32, 22);

  const windowRows = 2;
  const windowCols = Math.max(2, Math.floor(building.w / 58));
  for (let row = 0; row < windowRows; row += 1) {
    for (let col = 0; col < windowCols; col += 1) {
      ctx.fillStyle = '#dbeafe';
      ctx.fillRect(building.x + 22 + col * 46, building.y + 62 + row * 30, 18, 14);
    }
  }

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(building.x + building.w / 2 - 16, building.y + building.h - 40, 32, 40);
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(building.x + building.w / 2 + 9, building.y + building.h - 20, 2.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(building.x + building.w / 2, building.y + 6, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(building.icon, building.x + building.w / 2, building.y + 12);

  ctx.fillStyle = '#eff6ff';
  ctx.fillRect(building.x + 16, building.y + building.h + 8, building.w - 32, 18);
  ctx.strokeStyle = 'rgba(15,23,42,0.2)';
  ctx.strokeRect(building.x + 16, building.y + building.h + 8, building.w - 32, 18);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 12px Arial';
  ctx.fillText(data.name, building.x + building.w / 2, building.y + building.h + 21);

  if (highlighted) {
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 4;
    ctx.strokeRect(building.x - 5, building.y - 16, building.w + 10, building.h + 46);
  }
}

function drawPlayer() {
  ctx.fillStyle = '#052e16';
  ctx.beginPath();
  ctx.arc(player.x + 12, player.y + 7, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x + 3, player.y + 14, 18, 12);
  ctx.fillStyle = '#166534';
  ctx.fillRect(player.x + 1, player.y + 13, 5, 14);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(player.x + 6, player.y + 26, 4, 8);
  ctx.fillRect(player.x + 14, player.y + 26, 4, 8);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(player.x + 8, player.y + 16, 3, 3);
  ctx.fillRect(player.x + 14, player.y + 16, 3, 3);
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, '#93c5fd');
  sky.addColorStop(0.4, '#bfdbfe');
  sky.addColorStop(1, '#86efac');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  clouds.forEach((cloud) => drawCloud(cloud[0], cloud[1], cloud[2]));

  ctx.fillStyle = '#65a30d';
  ctx.fillRect(0, 140, canvas.width, canvas.height - 140);
  ctx.fillStyle = '#84cc16';
  ctx.fillRect(0, 170, canvas.width, canvas.height - 170);

  drawRoads();
  drawPond();
  drawTownFountain();
  trees.forEach((tree) => drawTree(tree[0], tree[1]));
  flowers.forEach((flower) => drawFlower(flower[0], flower[1]));
  signposts.forEach(drawSignpost);
}

function render() {
  drawBackground();
  buildings.forEach(drawBuilding);
  drawPlayer();
}

function gameLoop() {
  updatePlayer();
  updateInteraction();
  render();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
  if ((event.key === 'e' || event.key === 'E') && activeBuilding && !isModalOpen) {
    openBuilding(activeBuilding.id);
  }
  if (event.key === 'Escape' && isModalOpen) {
    closeModal();
  }
});

window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

closeModalBtn.addEventListener('click', closeModal);
helpBtn.addEventListener('click', openWelcome);
langBtn.addEventListener('click', () => {
  lang = lang === 'en' ? 'ja' : 'en';
  setSidePanel();
  if (isModalOpen) {
    openWelcome();
  }
});

setSidePanel();
openWelcome();
gameLoop();
