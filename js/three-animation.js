(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var container = document.getElementById('three-container');
  if (!container) return;

  var commands = [
    '$ ls -la', '$ git commit -m "update"', '$ npm run dev', '$ ./configure',
    '$ make install', '$ sudo apt-get update', '$ curl https://', '$ ssh user@host',
    '$ grep -r "TODO" .', '$ find . -name "*.js"', '$ chmod +x script.sh',
    '$ docker compose up', '$ cat /var/log/syslog', '$ ping google.com',
    '$ traceroute 8.8.8.8', '$ netstat -tulpn', '$ htop',
    '$ vim main.go', '$ python3 server.py', '$ cargo build',
    '$ systemctl start nginx', '$ tail -f access.log',
    '$ tar -xzf archive.tar.gz', '$ git push origin main',
    '$ npx create-next-app', '$ npm install', '$ docker ps -a',
    '$ kubectl get pods', '$ alias ll="ls -la"', '$ echo "hello world"',
    '$ touch README.md', '$ mv file.txt ./backup/', '$ cp -r ../dist ./',
    '$ screen -S session', '$ tmux new -s work', '$ watch -n 1 date',
    '$ pip install flask', '$ go mod init', '$ zig build',
    '$ systemctl status', '$ journalctl -xe',
  ];

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 1, 18);

  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  var sprites = [];

  function makeTextCanvas(text) {
    var canvas = document.createElement('canvas');
    var size = 16 + Math.random() * 10;
    var ctx = canvas.getContext('2d');
    ctx.font = size + 'px "JetBrains Mono", "Fira Code", monospace';
    var w = ctx.measureText(text).width + 24;
    var h = size * 2;
    canvas.width = w;
    canvas.height = h;
    ctx.font = size + 'px "JetBrains Mono", "Fira Code", monospace';
    ctx.fillStyle = 'rgba(110, 231, 183, 0.9)';
    ctx.fillText(text, 12, size * 1.3);
    return canvas;
  }

  var poolSize = 40;
  for (var i = 0; i < poolSize; i++) {
    var cmd = commands[Math.floor(Math.random() * commands.length)];
    var canvas = makeTextCanvas(cmd);
    var texture = new THREE.CanvasTexture(canvas);
    var mat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.1 + Math.random() * 0.2,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    var sprite = new THREE.Sprite(mat);
    sprite.scale.set(canvas.width / 50, canvas.height / 50, 1);
    sprite.position.x = (Math.random() - 0.5) * 14;
    sprite.position.y = (Math.random() - 0.5) * 16;
    sprite.position.z = (Math.random() - 0.5) * 6 - 2;
    sprite.userData = {
      speedY: 0.006 + Math.random() * 0.02,
      speedX: (Math.random() - 0.5) * 0.004,
      startY: -9 - Math.random() * 3,
      endY: 9 + Math.random() * 3,
      floatPhase: Math.random() * Math.PI * 2,
      text: cmd,
      baseOpacity: 0.1 + Math.random() * 0.2,
    };
    scene.add(sprite);
    sprites.push(sprite);
  }

  var mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

  container.addEventListener('mousemove', function (e) {
    var rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  });

  function resize() {
    var w = container.clientWidth;
    var h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', resize);

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    var t = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.02;
    targetY += (mouseY - targetY) * 0.02;

    for (var i = 0; i < sprites.length; i++) {
      var s = sprites[i];
      var d = s.userData;
      s.position.y += d.speedY;
      s.position.x += d.speedX + Math.sin(t * 0.5 + d.floatPhase) * 0.003;
      s.position.x += targetX * 0.015;
      s.material.opacity = d.baseOpacity * (1 + Math.sin(t * 0.8 + d.floatPhase) * 0.5);

      if (s.position.y > d.endY) {
        s.position.y = d.startY;
        s.position.x = (Math.random() - 0.5) * 14;
        d.text = commands[Math.floor(Math.random() * commands.length)];
        var canvas = makeTextCanvas(d.text);
        s.material.map = new THREE.CanvasTexture(canvas);
        s.material.map.needsUpdate = true;
        s.scale.set(canvas.width / 50, canvas.height / 50, 1);
      }
    }

    renderer.render(scene, camera);
  }
  animate();
})();
