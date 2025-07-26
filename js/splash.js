document.addEventListener('DOMContentLoaded', () => {
  const splashes = [
    '強くなれる理由を知った',
    '自由の翼',
    '壊れる壊れない狂う狂わない',
    '幾千の夜を越え, 遠い宇宙を超え',
    '願いは誰にも壊せない',
    '幸せになりたい',
    '描いた夢を忘れない',
    'この夜空を掴みとろう',
    '蒼い風がいま胸のドアを叩いても',
    '僕ら生きる世界はもう夢と違う',
    'それでも信じたい',
    '希望を抱いて 旅に出よう',
    '風よ、波よ、踊りなさい',
    '自分に嘘をついたまま',
    '誰かの笑顔が見たい',
    '君の声が聞こえる',
    '傷も痛みも嘘じゃない',
    '毎日がスペシャル',
    '傷跡の向こうに未来がある',
    '限りある未来へ, 限りある世界へ',
    'この声が届くなら',
    '捧げよ、捧げよ、心臓を捧げよ',
    '忘れないでいて, 過去も未来も',
    'さよならを言わずに旅立とう',
    '何度も何度も立ち上がって',
    '消えそうな光を追いかけて',
    '僕は神様じゃないのに',
    '涙を隠して生きるの',
    '巡り会えた奇跡を信じたい',
    'Let me hear what you say'
  ];

  let currentSplash = 0;

  const splashElement = document.getElementById('splashText');
  const headerElement = document.getElementById('centerText');
  const footerElement = document.getElementById('footerNote');

  function isMobileByAspectRatio() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    return aspectRatio < 3 / 4;
  }

  function updateSplashFontSize() {
    if (!headerElement || !footerElement) return;

    if (!isMobileByAspectRatio()) {
      splashElement.style.fontSize = '';
      return;
    }

    const headerRect = headerElement.getBoundingClientRect();
    const footerRect = footerElement.getBoundingClientRect();

    const topLimit = headerRect.bottom + 30;
    const bottomLimit = footerRect.top - 16;
    const availableHeight = bottomLimit - topLimit;

    if (availableHeight <= 0) return;

    const textLength = splashElement.textContent.length || 1;
    let fontSize = availableHeight / textLength;

    const minFontSize = 16;
    const maxFontSize = 64;

    fontSize = Math.min(Math.max(fontSize, minFontSize), maxFontSize);
    splashElement.style.fontSize = fontSize + 'px';
  }

  function setSplashText(text) {
    splashElement.style.opacity = 0;
  
    setTimeout(() => {
      splashElement.innerHTML = '';
  
      if (isMobileByAspectRatio()) {
        splashElement.style.writingMode = 'vertical-rl';
        splashElement.style.textOrientation = 'upright';
  
        for (const char of text) {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'block';
          splashElement.appendChild(span);
        }
      } else {
        splashElement.style.writingMode = 'horizontal-tb';
        splashElement.style.textOrientation = 'initial';
        splashElement.textContent = text;
      }
  
      updateSplashFontSize();
  
      setTimeout(() => {
        splashElement.style.opacity = 1;
      }, 50);
  
    }, 500);
  }
  
  function showNextSplash() {
    currentSplash = (currentSplash + 1) % splashes.length;
    setSplashText(splashes[currentSplash]);
  }

  window.addEventListener('resize', updateSplashFontSize);

  setSplashText(splashes[currentSplash]);

  setTimeout(() => {
    splashElement.style.opacity = 1;
  }, 500);

  setInterval(showNextSplash, 5000);
});