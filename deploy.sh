#!/bin/bash

echo "Executando OneClickDeploy"

ssh root@app.geracertidao.com << EOF
  export PATH="/root/.nvm/versions/node/v10.13.0/bin/:$PATH"
  echo "==================================================================================="
  echo "1) ATUALIZANDO O CODIGO FONTE"
  echo "==================================================================================="
  cd /root/gera-certidao
  git reset --hard
  git pull
  echo "==================================================================================="
  echo "2) INSTALANDO AS DEPENDENCIAS"
  echo "==================================================================================="
  cd api
  npm install
  cd ..
  cd scrapper
  npm install
  cd ..
  cd app
  npm install
  echo "==================================================================================="
  echo "3) MINIFICANDO FRONTEND"
  echo "==================================================================================="
  npm run build
  cd ..
  echo "==================================================================================="
  echo "4) REINICIANDO SERVICOS NODE"
  echo "==================================================================================="
  systemctl restart pm2-root
  echo "==================================================================================="
  echo "5) ATUALIZANDO BANCO DE DADOS (CARGA INICIAL)"
  echo "==================================================================================="
  mongo localhost:27017/gera-certidao preloader-db.js
EOF

