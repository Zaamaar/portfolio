/**
 * PROJECT DATA — the only file you need to edit to add a new project.
 *
 * Field guide:
 *   id       - short unique slug
 *   build    - number for the "BUILD #" tag — use the next number up
 *   title    - project name as displayed
 *   blurb    - what I actually learned/decided building it, not what it is
 *   tier     - "live" | "operated" | "design"
 *              live     = deployed and reachable right now
 *              operated = real code that ran (or still runs), even if torn down after
 *              design   = diagrammed/planned, never deployed
 *   status   - "live" | "building" | "archived"  (shown as the pill on the card)
 *   date     - roughly when it shipped
 *   stack    - array of short strings
 *   links    - any of: github, live, medium
 */

const TIERS = [
  {
    key: "live",
    label: "Live in production",
    desc: "Deployed, reachable, and still standing. If something here breaks, someone besides me notices."
  },
  {
    key: "operated",
    label: "Built & operated",
    desc: "Real infrastructure I stood up, configured, and — in most cases — tore back down. The gap between reading about a service and actually paying for one, even briefly."
  },
  {
    key: "design",
    label: "Design studies",
    desc: "Architecture I diagrammed but didn't deploy — how I think through tradeoffs before committing infrastructure spend."
  }
];

const PROJECTS = [
  {
    id: "cinetrack-api",
    build: 13,
    title: "CineTrack API",
    blurb: "Node/Express on ECS Fargate with a push-to-main pipeline — CodePipeline → CodeBuild → ECR → ECS → ALB — built around immutable task-definition revisions, so a bad deploy gets fixed by pointing the service back at the last one, not by debugging live. Traced a dead AWS CLI down to a laptop's own DNS resolver, not AWS.",
    tier: "live",
    status: "live",
    date: "Jul 2026",
    stack: ["Node.js", "Express", "PostgreSQL", "ECS Fargate", "RDS", "ALB", "ECR", "CodePipeline"],
    links: { github: "https://github.com/Zaamaar/cinetrack-api", live: "https://cinetrack.hngayotomiwa.online" }
  },
  {
    id: "zamweather",
    build: 6,
    title: "ZamWeather",
    blurb: "Designed a CloudFront + WAF + Multi-AZ target in Terraform, then hit real account limits — CloudFront needing manual verification, a 1-vCPU quota that blocks zero-downtime rolling updates, $65/mo NAT Gateways for a project with no revenue. Documented every trade-off down to the deployed version, with the upgrade path left in the code, not deleted from it.",
    tier: "live",
    status: "live",
    date: "May 2026",
    stack: ["Terraform", "AWS (VPC/ALB/EC2/RDS)", "Flask", "Netlify"],
    links: { github: "https://github.com/Zaamaar/zamweather", live: "https://zamweather-live.netlify.app/" }
  },
  {
    id: "serverless-api",
    build: 1,
    title: "Serverless API on AWS",
    blurb: "Lambda behind API Gateway, DynamoDB for storage, Cognito for auth — the pattern behind most serverless product APIs, diagrammed first so the IAM boundaries were settled before any code existed.",
    tier: "operated",
    status: "archived",
    date: "Mar 2026",
    stack: ["Lambda", "API Gateway", "DynamoDB", "Cognito"],
    links: { github: "https://github.com/Zaamaar/Serverless-API-Lambda-API-Gateway-DynamoDB-Cognito", medium: "https://medium.com/@ayotomiwavictor1/designing-a-production-grade-serverless-api-on-aws-lambda-api-gateway-dynamodb-and-cognito-938205052a24" }
  },
  {
    id: "stage1-api",
    build: 2,
    title: "Stage 1: Zero to Deployed",
    blurb: "A hand-provisioned Linux server hardened from scratch, serving live HTTPS — no Docker, no automation tooling, just a terminal and AWS, to force actually understanding what the tooling normally hides.",
    tier: "operated",
    status: "archived",
    date: "Apr 2026",
    stack: ["EC2", "Nginx", "PM2", "systemd"],
    links: { github: "https://github.com/Zaamaar/stage1-api", medium: "https://medium.com/@ayotomiwavictor1/from-zero-to-deployed-building-and-shipping-a-personal-api-on-aws-hng-stage-1-7508e2e54fb4" }
  },
  {
    id: "three-tier-vpc",
    build: 3,
    title: "Three-Tier VPC (CLI-built)",
    blurb: "A bastion-host network built with nothing but AWS CLI and bash — public web tier, an app tier with no public IP at all, and two independent firewall layers (stateful security groups plus stateless NACLs, which need explicit ephemeral-port rules since they don't track connections). Ships its own teardown script, because the NAT Gateway is the one line item that actually bills.",
    tier: "operated",
    status: "archived",
    date: "Apr 2026",
    stack: ["AWS CLI", "EC2", "VPC", "Bash", "IAM"],
    links: { github: "https://github.com/Zaamaar/three-tier-vpc" }
  },
  {
    id: "devops-sandbox",
    build: 7,
    title: "DevOps Sandbox Platform",
    blurb: "A self-service platform for spinning up isolated, TTL-limited Docker environments behind dynamically-generated Nginx routes — plus a chaos toggle that can crash, pause, or network-partition any environment on command, to verify the health poller actually catches it within 90 seconds.",
    tier: "operated",
    status: "archived",
    date: "May 2026",
    stack: ["Python", "FastAPI", "Docker", "Nginx", "Shell"],
    links: { github: "https://github.com/Zaamaar/devops-sandbox" }
  },
  {
    id: "microservices-cicd",
    build: 8,
    title: "Broken-to-Production Microservices Fix",
    blurb: "Diagnosed and repaired a deliberately-broken multi-service app (Node/FastAPI/Redis), then wrapped it in a 6-stage GitHub Actions pipeline — ESLint config, a Trivy scan workaround, and a Redis import-time patch along the way.",
    tier: "operated",
    status: "archived",
    date: "May 2026",
    stack: ["Docker", "GitHub Actions", "Node.js", "FastAPI", "Redis"],
    links: { github: "https://github.com/Zaamaar/hng14-stage2-devops", medium: "https://medium.com/@ayotomiwavictor1/from-broken-code-to-production-ready-how-i-containerized-a-microservices-app-and-built-a-ci-cd-a6b5cfb225b4" }
  },
  {
    id: "swiftdeploy",
    build: 9,
    title: "SwiftDeploy",
    blurb: "A CLI that automates the full Dockerised deploy lifecycle from a single manifest.yaml — templated Nginx/Compose generation, zero-downtime stable/canary release switching, and a built-in chaos-testing engine to check the whole thing actually recovers, not just deploys.",
    tier: "operated",
    status: "archived",
    date: "May 2026",
    stack: ["Docker", "FastAPI", "Nginx", "EC2", "Python"],
    links: { github: "https://github.com/Zaamaar/swiftdeploy-project", medium: "https://medium.com/@ayotomiwavictor1/i-built-a-miniature-heroku-from-scratch-heres-everything-i-learned-831c4292c1a3" }
  },
  {
    id: "ddos-detection",
    build: 10,
    title: "Real-Time DDoS Detection Engine",
    blurb: "Sliding-window traffic monitoring with z-score anomaly scoring, live iptables blocking, and Slack alerting — the repo that reacts to actual traffic instead of just describing how it would.",
    tier: "operated",
    status: "archived",
    date: "Jun 2026",
    stack: ["Python", "Docker Compose", "Nginx", "iptables", "Slack API"],
    links: { github: "https://github.com/Zaamaar/anomaly_detection_engine", live: "https://monitor.hngayotomiwa.online", medium: "https://medium.com/@ayotomiwavictor1/i-built-a-real-time-ddos-detection-engine-from-scratch-heres-how-it-works-0b1bf5e165b0" }
  },
  {
    id: "cinetrack-frontend",
    build: 12,
    title: "CineTrack Frontend",
    blurb: "Vanilla HTML/CSS/JS talking to the API over fetch, deployed to Netlify completely independently from the backend — the same separation of concerns a real product would use, CORS lock-down instructions included.",
    tier: "operated",
    status: "building",
    date: "Jul 2026",
    stack: ["HTML", "CSS", "JavaScript", "Netlify"],
    links: { github: "https://github.com/Zaamaar/cinetrack-frontend" }
  },
  {
    id: "pdffire",
    build: 15,
    title: "PDFFire",
    blurb: "Serverless document tool — compress, convert to Word, rotate, and otherwise manipulate PDFs, each operation its own Lambda function behind API Gateway. Running cost sits near zero: every operation fits inside Lambda's free tier, so the only real spend is S3 storage for the files themselves.",
    tier: "operated",
    status: "archived",
    date: "Jul 2026",
    stack: ["AWS SAM", "Lambda", "Node.js", "API Gateway", "S3"],
    links: { github: "https://github.com/Zaamaar/pdf-tools" }
  },
  {
    id: "find-app",
    build: 16,
    title: "Find",
    blurb: "A safety-focused mobile app for the Nigerian market — real-time location sharing, SOS alerts, and SMS fallback for when data drops out.",
    tier: "operated",
    status: "building",
    date: "Jul 2026",
    stack: ["Node.js", "Express", "PostgreSQL", "Socket.io", "React Native", "Twilio"],
    links: { github: "https://github.com/Zaamaar" }
  },
  {
    id: "eks-diagram-10",
    build: 17,
    title: "EKS Architecture",
    blurb: "Diagram #10 of a 30-part architecture series, paired with real Terraform: a provisioned EKS cluster, managed node group, ECR, and a Helm-installed ALB ingress — proof the diagram runs, not just a picture of how it should.",
    tier: "operated",
    status: "archived",
    date: "Aug 2026",
    stack: ["Terraform", "EKS", "ECR", "ALB", "Helm"],
    links: { github: "https://github.com/Zaamaar/eks-diagram-10-terraform" }
  },
  {
    id: "three-tier-design",
    build: 4,
    title: "Three-Tier Architecture (Design)",
    blurb: "Full design writeup for a Multi-AZ ALB → ASG → RDS setup, including the production checklist — ACM, WAF, RDS Proxy, S3+CloudFront offload — never built out here. The plan that three-tier-vpc and ZamWeather each later executed a piece of.",
    tier: "design",
    status: "archived",
    date: "Apr 2026",
    stack: ["draw.io", "AWS (design)"],
    links: { github: "https://github.com/Zaamaar/three-tier-architecture-design" }
  },
  {
    id: "3tier-edge",
    build: 5,
    title: "3-Tier + ALB, HTTPS, WAF, CloudFront",
    blurb: "Adds the edge layer on top of the base design — CloudFront, WAF, and ACM in front of an internal ALB — the exact layer ZamWeather's README documents having to cut for cost and account-verification reasons.",
    tier: "design",
    status: "archived",
    date: "Apr 2026",
    stack: ["CloudFront", "WAF", "ACM", "ALB"],
    links: { github: "https://github.com/Zaamaar/3-Tier-ALB-HTTPS-WAF-CloudFront" }
  },
  {
    id: "cicd-pipeline-design",
    build: 11,
    title: "CI/CD Pipeline Architecture",
    blurb: "The design behind CineTrack API's actual pipeline — GitHub → CodePipeline → CodeBuild → ECR → ECS → ALB — bundled with a monitoring-observability diagram in the same repo (the standalone Monitoring-Observability-architecture repo is currently an empty stub, superseded by this one).",
    tier: "design",
    status: "archived",
    date: "Jul 2026",
    stack: ["CodePipeline", "CodeBuild", "ECR", "ECS", "ALB"],
    links: { github: "https://github.com/Zaamaar/CI-CD-Pipeline-Architecture" }
  },
  {
    id: "monitor-cinetrack",
    build: 14,
    title: "Monitoring for CineTrack",
    blurb: "CloudWatch / X-Ray / SNS observability diagrammed specifically for CineTrack — logs, metrics, and traces, and how an alarm decides something's wrong before a customer says so. Diagram only — not yet wired into the live service.",
    tier: "design",
    status: "archived",
    date: "Jul 2026",
    stack: ["CloudWatch", "X-Ray", "SNS"],
    links: { github: "https://github.com/Zaamaar/monitor-cinetrack" }
  }
];
