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


  // Define o número de partículas na grade da animação como o produto de ROWS e COLS
var NUM_PARTICLES = ((ROWS = 30) * (COLS = 250)),
// Define a espessura das linhas
THICKNESS = Math.pow(10, 2),
// Define o espaçamento entre as partículas
SPACING = 3,
// Define a margem ao redor da grade
MARGIN = 50,
// Define a cor das partículas
COLOR = 220,
// Define o coeficiente de arrasto para controlar o movimento das partículas
DRAG = 0.95,
// Define o coeficiente de suavização para controlar o movimento das partículas
EASE = 0.25,
// Declara várias variáveis que serão usadas posteriormente no código
container,
particle,
canvas,
mouse,
stats,
list,
ctx,
tog,
man,
dx,
dy,
mx,
my,
d,
t,
f,
a,
b,
i,
n,
w,
h,
p,
s,
r,
c;

// Inicializa o objeto de partícula com propriedades de velocidade e posição
particle = {
vx: 0,
vy: 0,
x: 0,
y: 0
};

// Função para inicializar o canvas de animação e as posições das partículas
function init() {
// Obtém o elemento HTML com o ID 'particle-container'
container = document.getElementById('particle-container');
// Cria um novo elemento de canvas
canvas = document.createElement('canvas');

// Obtém o contexto de renderização 2D do canvas
ctx = canvas.getContext('2d');
// Define a variável 'man' como false (o propósito dessa variável não está claro sem mais contexto)
man = false;
// Define a variável 'tog' como true (o propósito dessa variável não está claro sem mais contexto)
tog = true;

// Cria um array vazio para armazenar as partículas
list = [];

// Calcula a largura e altura do canvas com base no número de colunas e linhas, espaçamento e margens
w = canvas.width = COLS * SPACING + MARGIN * 2;
h = canvas.height = ROWS * SPACING + MARGIN * 2;

// Loop para criar as partículas e definir suas posições iniciais
for (i = 0; i < NUM_PARTICLES; i++) {
  p = Object.create(particle);
  p.x = p.ox = MARGIN + SPACING * (i % COLS);
  p.y = p.oy = MARGIN + SPACING * Math.floor(i / COLS);

  // Adiciona a partícula ao array 'list'
  list[i] = p;
}

// Adiciona um ouvinte de evento 'mousemove' ao elemento container para rastrear a posição do mouse
container.addEventListener('mousemove', function (e) {
  bounds = container.getBoundingClientRect();
  mx = e.clientX - bounds.left;
  my = e.clientY - bounds.top;
  man = true;
});

// Verifica se a função 'Stats' existe e, se sim, cria e anexa um novo elemento de estatísticas ao corpo do documento
if (typeof Stats === 'function') {
  document.body.appendChild((stats = new Stats()).domElement);
}

// Anexa o canvas ao elemento container
container.appendChild(canvas);
}

// Função para atualizar as posições das partículas e renderizar a animação
function step() {
// Se o objeto 'stats' estiver disponível, inicia a gravação de estatísticas de desempenho
if (stats) stats.begin();

// Alterna entre dois modos de renderização ('tog' é usado para alternar os modos)
if (tog = !tog) {
  // Se não estiver no modo de controle manual do mouse, define a posição inicial do mouse como o centro do canvas
  if (!man) {
    mx = w * 0.5; // Defina a posição X inicial do mouse aqui
    my = h * 0.5; // Defina a posição Y inicial do mouse aqui
  }

  // Loop para todas as partículas e atualiza suas posições com base na interação com o mouse
  for (i = 0; i < NUM_PARTICLES; i++) {
    p = list[i];

    // Calcula a distância ao quadrado entre a partícula e o mouse
    d = (dx = mx - p.x) * dx + (dy = my - p.y) * dy;
    // Calcula a força aplicada à partícula com base na distância e na variável THICKNESS
    f = -THICKNESS / d;

    // Se a partícula estiver próxima o suficiente do mouse (dentro da faixa de THICKNESS), atualiza sua velocidade
    if (d < THICKNESS) {
      t = Math.atan2(dy, dx);
      p.vx += f * Math.cos(t);
      p.vy += f * Math.sin(t);
    }

    // Atualiza a posição da partícula com o uso de suavização (EASE) e arrasto (DRAG) aplicados à velocidade
    p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
    p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
  }
} else {
  // Se estiver no modo de renderização, cria um novo objeto ImageData e define os valores dos pixels para representar as partículas
  b = (a = ctx.createImageData(w, h)).data;

  // Loop para todas as partículas e define os valores de pixel correspondentes na ImageData
  for (i = 0; i < NUM_PARTICLES; i++) {
    p = list[i];
    b[(n = (~~p.x + (~~p.y * w)) * 4)] = b[n + 1] = b[n + 2] = COLOR;
    b[n + 3] = 255;
  }

  // Coloca a ImageData no canvas
  ctx.putImageData(a, 0, 0);
}

// Se o objeto 'stats' estiver disponível, encerra a gravação de estatísticas de desempenho
if (stats) stats.end();

// Solicita o próximo quadro de animação para continuar o loop da animação
requestAnimationFrame(step);
}

// Chama a função init() para configurar o canvas e as partículas
init();
// Chama a função step() para iniciar o loop da animação
step();

document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('modal1');
  var openButton = document.getElementById('open-modal-button');
  
  
  // Inicializa o modal e adiciona um callback para o evento 'open'
  var modalInstance = M.Modal.init(modal, {
    onOpenStart: function() {
      console.log('Modal aberto');
      modal.style.borderRadius = '10px';
    },
    onCloseStart: function() {
      console.log('Modal fechado');
      // Adicione aqui qualquer ação que desejar quando o modal é fechado
    }
  });

  // Abrir o modal quando o botão "Abrir Modal" é clicado
  openButton.addEventListener('click', function() {
    modalInstance.open();
  });
});




