export const terraformModule = `module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.5.1"

  name = "platformbox-\${var.environment}"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = false
  enable_vpn_gateway = false

  tags = {
    Environment = var.environment
    ManagedBy   = "platformbox"
  }
}`;

export const gitlabCI = `stages:
  - test
  - build
  - deploy-preview
  - deploy-prod

sast:
  stage: test
  image: registry.gitlab.com/security-products/sast:latest
  script: /analyzer run
  artifacts:
    reports:
      sast: gl-sast-report.json

build:
  stage: build
  script:
    - docker build -t \${CI_REGISTRY_IMAGE}:\${CI_COMMIT_SHA} .
    - docker push \${CI_REGISTRY_IMAGE}:\${CI_COMMIT_SHA}

deploy-preview:
  stage: deploy-preview
  script:
    - terraform apply -auto-approve environments/preview/
  environment:
    name: preview/pr-\${CI_MERGE_REQUEST_IID}
    on_stop: destroy-preview
  rules:
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"

deploy-prod:
  stage: deploy-prod
  script:
    - terraform apply -auto-approve environments/prod/
  environment: production
  rules:
    - if: \$CI_COMMIT_BRANCH == "main"
  when: manual`;

export const k8sManifest = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
  labels:
    app: api-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
    spec:
      serviceAccountName: api-gateway
      containers:
        - name: api-gateway
          image: \${ECR_REPO}:\${IMAGE_TAG}
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: 250m
              memory: 256Mi
            limits:
              cpu: 500m
              memory: 512Mi
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-gateway
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70`;

export const beforeAfter = [
  { before: "3 weeks to ship a new service", after: "1 click — under 5 minutes" },
  { before: "€120K+ for a Platform Engineer hire", after: "€20K fixed, delivered in 14 days" },
  { before: "Idle staging environments burning cloud budget", after: "Auto-destroy on merge — €0 waste" },
];
