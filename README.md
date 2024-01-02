# server_psy_diary

Публичный адрес сайта: [https://artgroupwhitebox.github.io/server_psy_diary/](https://artgroupwhitebox.github.io/server_psy_diary/)

![title](public/images/icon.png)

## Start for dev
```
npm run dev
```

## Start for prod
```
npm run start
```

## Технологии

- Node.js 
- Express
- Typescript

## Функционал

#### HTTP Api Server for psychological diary

## Deploy to Kubernetes
```
SERVICE_NAME=psy-server
IMAGE=docker.io/******/psy-server
DOMAIN=psy-api.venera.app
KUBE_NAMESPACE=apps-ex***
HELM_TEMPLATE_URL=https://****.github.io/infrastructure/helm-charts

helm upgrade $SERVICE_NAME arenum-app --repo $HELM_TEMPLATE_URL \
  --set image.tag=$IMAGE \
  --set domain=$DOMAIN \
  --set probe.enabled=false \
  --namespace $KUBE_NAMESPACE \
  --install --wait --debug
```