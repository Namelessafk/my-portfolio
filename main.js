function createSpark() {
    const spark = document.createElement('div');
    spark.classList.add('spark');
    const titleRect = document.querySelector('.nav-wrapper').getBoundingClientRect();
    const x = titleRect.left + Math.random() * titleRect.width;
    const y = titleRect.top + Math.random() * titleRect.height;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    document.querySelector('.sparks-container').appendChild(spark);
  
    setTimeout(() => {
      spark.remove();
    }, 1000);
  }
  
  function createLight() {
    const light = document.createElement('div');
    light.classList.add('light');
    const titleRect = document.querySelector('.nav-wrapper').getBoundingClientRect();
    const x = titleRect.left + Math.random() * titleRect.width;
    const y = titleRect.top + Math.random() * titleRect.height;
    light.style.left = `${x}px`;
    light.style.top = `${y}px`;
    document.querySelector('.sparks-container').appendChild(light);
  
    setTimeout(() => {
      light.remove();
    }, 1500);
  }
  
  window.addEventListener('load', () => {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.opacity = '1';
      }, 200 * (index + 1));
    });
  
    setInterval(createSpark, 200);
    setInterval(createLight, 400);
  });