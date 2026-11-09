# Actividad 3 - Seguridad en Cloud, Contenedores y APIs

Este repositorio contiene la implementación práctica de un entorno seguro utilizando Infraestructura como Código (IaC), análisis de vulnerabilidades en contenedores y autenticación basada en JWT.

##  Componentes del Proyecto

1. **Infraestructura como Código (IaC):**
   - Simulación de AWS S3 mediante **LocalStack**.
   - Despliegue automatizado con **Terraform**: Bucket `actividad3-seguro-local`.
   - Cifrado en reposo **SSE-S3 (AES-256)** y 4 controles de **Public Access Block**.

2. **Seguridad de Contenedores:**
   - Análisis de imagen vulnerable (`node:14`) vs imagen mitigada (`node:20-alpine`) usando **Trivy**.

3. **Desarrollo Seguro & Autenticación:**
   - API REST en Node.js/Express con middleware de validación **JWT**.
   - Validación automatizada de endpoints mediante **OWASP ZAP**.

4. **Políticas de IAM:**
   - Declaración JSON con el principio de menor privilegio (`s3:GetObject` restringido a rol de backend).

##  Requisitos Previos

- Docker Desktop & Docker Compose
- Terraform v1.5+
- AWS CLI v2
- Node.js v18+
- Trivy Vulnerability Scanner

##  Instrucciones de Ejecución

### 1. Iniciar LocalStack
```bash
docker compose up -d

```
### 2. Desplegar Infraestructura con Terraform

```bash
terraform init
terraform plan
terraform apply -auto-approve
```

### 3. Verificar en LocalStack mediante AWS CLI

```bash
aws --endpoint-url=http://localhost:4566 s3api get-bucket-encryption --bucket actividad3-seguro-local
aws --endpoint-url=http://localhost:4566 s3api get-public-access-block --bucket actividad3-seguro-local
```

### 4. Iniciar la API Segura

```bash
cd api-segura
npm install
node app.js

```

