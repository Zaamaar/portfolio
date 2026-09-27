/**
 * PROJECT DATA — the only file you need to edit to add a new project or article.
 *
 * PROJECTS fields:
 *   id, build     - slug + display order number
 *   title, blurb  - what it is / what it taught you, not a feature list
 *   tier          - "live" | "operated" | "design"  (which folder it lives in)
 *   status        - "live" | "building" | "archived" (the pill on the card)
 *   date, stack   - as before
 *   links         - github / live / medium / medium2 — omit any you don't have
 *
 * WRITING fields (the "Medium" folder):
 *   title, blurb  - article title + one-line teaser
 *   url           - the Medium link
 *   related       - (optional) id of a PROJECTS entry this article is about,
 *                   used to show a "→ ProjectName" tag on the write-up card
 */

const FOLDERS = [
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
    desc: "How I study and stress-test an idea before committing to it — research, comparisons, and diagrams, some of which turned straight into the builds above, some of which stayed exploration."
  },
  {
    key: "writing",
    label: "Medium / writing",
    desc: "Build breakdowns, post-mortems, and the occasional detour into whatever tech story is stuck in my head — Netflix outages included."
  }
];

const PROJECTS = [
  {
    id: "cinetrack-api",
    build: 14,
    title: "CineTrack API",
    blurb: "Node/Express on ECS Fargate with a push-to-main pipeline — CodePipeline → CodeBuild → ECR → ECS → ALB — built around immutable task-definition revisions, so a bad deploy gets fixed by pointing the service back at the last one, not by debugging live. Traced a dead AWS CLI down to a laptop's own DNS resolver, not AWS.",
    tier: "live",
    status: "live",
    date: "Jul 2026",
    stack: ["Node.js", "Express", "PostgreSQL", "ECS Fargate", "RDS", "ALB", "ECR", "CodePipeline"],
    links: {
      github: "https://github.com/Zaamaar/cinetrack-api",
      live: "https://cinetrack.hngayotomiwa.online",
      medium: "https://medium.com/@ayotomiwavictor1/building-a-zero-touch-ci-cd-pipeline-on-aws-from-iam-headaches-to-a-live-self-deploying-api-5b6c57fbc700"
    }
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
    links: {
      github: "https://github.com/Zaamaar/zamweather",
      live: "https://zamweather-live.netlify.app/",
      medium: "https://medium.com/@ayotomiwavictor1/i-built-my-3-tier-aws-architecture-then-reality-hit-2e404e50b49a"
    }
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
    links: {
      github: "https://github.com/Zaamaar/Serverless-API-Lambda-API-Gateway-DynamoDB-Cognito",
      medium: "https://medium.com/@ayotomiwavictor1/designing-a-production-grade-serverless-api-on-aws-lambda-api-gateway-dynamodb-and-cognito-938205052a24",
      medium2: "https://medium.com/@ayotomiwavictor1/the-one-thing-missing-from-most-serverless-api-diagrams-ff3bf43dd0ea"
    }
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
    links: {
      github: "https://github.com/Zaamaar/stage1-api",
      medium: "https://medium.com/@ayotomiwavictor1/from-zero-to-deployed-building-and-shipping-a-personal-api-on-aws-hng-stage-1-7508e2e54fb4",
      medium2: "https://medium.com/@ayotomiwavictor1/i-provisioned-a-linux-server-from-scratch-hardened-it-and-served-a-live-https-api-heres-d352598d8ba4"
    }
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
    links: {
      github: "https://github.com/Zaamaar/three-tier-vpc",
      medium: "https://medium.com/@ayotomiwavictor1/i-built-a-production-grade-three-tier-vpc-on-aws-from-scratch-using-only-the-cli-6b6cbad54b14"
    }
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
    links: {
      github: "https://github.com/Zaamaar/devops-sandbox",
      medium: "https://medium.com/@ayotomiwavictor1/i-built-a-production-grade-deployment-tool-from-scratch-heres-exactly-how-it-works-ca2a039386cb"
    }
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
    links: {
      github: "https://github.com/Zaamaar/hng14-stage2-devops",
      medium: "https://medium.com/@ayotomiwavictor1/from-broken-code-to-production-ready-how-i-containerized-a-microservices-app-and-built-a-ci-cd-a6b5cfb225b4"
    }
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
    links: {
      github: "https://github.com/Zaamaar/swiftdeploy-project",
      medium: "https://medium.com/@ayotomiwavictor1/i-built-a-miniature-heroku-from-scratch-heres-everything-i-learned-831c4292c1a3"
    }
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
    links: {
      github: "https://github.com/Zaamaar/anomaly_detection_engine",
      live: "https://monitor.hngayotomiwa.online",
      medium: "https://medium.com/@ayotomiwavictor1/i-built-a-real-time-ddos-detection-engine-from-scratch-heres-how-it-works-0b1bf5e165b0"
    }
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
    links: {
      github: "https://github.com/Zaamaar/pdf-tools",
      medium: "https://medium.com/@ayotomiwavictor1/how-i-built-pdfire-a-serverless-pdf-tool-with-aws-lambda-sam-and-zero-servers-38703478e345"
    }
  },
  {
    id: "serverless-contact-form",
    build: 18,
    title: "Serverless Contact Form",
    blurb: "A lead-capture form with no server to patch or pay for: Lambda validates and forwards submissions, API Gateway fronts it, SES sends the notification, DynamoDB keeps a durable copy — the small, boring building block every marketing site eventually needs.",
    tier: "operated",
    status: "archived",
    date: "Jun 2026",
    stack: ["Lambda", "API Gateway", "SES", "DynamoDB"],
    links: {
      github: "https://github.com/Zaamaar/serverless-contact-form",
      medium: "https://medium.com/@ayotomiwavictor1/building-a-serverless-contact-form-with-aws-lambda-api-gateway-ses-dynamodb-0e7fe68b34e2"
    }
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
    links: {
      github: "https://github.com/Zaamaar/3-Tier-ALB-HTTPS-WAF-CloudFront",
      medium: "https://medium.com/@ayotomiwavictor1/building-a-secure-globally-accelerated-3-tier-web-architecture-on-aws-49b23c180173"
    }
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
    links: {
      github: "https://github.com/Zaamaar/CI-CD-Pipeline-Architecture",
      medium: "https://medium.com/@ayotomiwavictor1/i-diagrammed-a-ci-cd-pipeline-then-i-decided-to-actually-build-what-it-protects-cd3a74857d08"
    }
  },
  {
    id: "monitor-cinetrack",
    build: 13,
    title: "Monitoring for CineTrack",
    blurb: "CloudWatch / X-Ray / SNS observability diagrammed specifically for CineTrack — logs, metrics, and traces, and how an alarm decides something's wrong before a customer says so. Repo itself is diagram-only; the linked write-ups walk through actually wiring it in.",
    tier: "design",
    status: "archived",
    date: "Jul 2026",
    stack: ["CloudWatch", "X-Ray", "SNS"],
    links: {
      github: "https://github.com/Zaamaar/monitor-cinetrack",
      medium: "https://medium.com/@ayotomiwavictor1/why-im-building-monitoring-on-top-of-my-ci-cd-pipeline-not-a-new-project-2bf80c6f510f",
      medium2: "https://medium.com/@ayotomiwavictor1/building-production-grade-observability-on-aws-ecs-cloudwatch-x-ray-and-a-real-codepipeline-1282f94bfc1d"
    }
  }
];

const WRITING = [
  {
    title: "Before the Algorithm",
    blurb: "A shorter, more personal piece — off the AWS-build format of the rest of the feed.",
    url: "https://medium.com/@ayotomiwavictor1/before-the-algorithm-9dc93ca904e2"
  },
  {
    title: "Netflix's Three-Day Near-Death Experience",
    blurb: "A look at a real production incident at Netflix's scale, and what it says about resilience under load.",
    url: "https://medium.com/@ayotomiwavictor1/netflixs-three-day-near-death-experience-6e4f511a1c59"
  },
  {
    title: "Pods, Nodes, and etcd: A Practical Breakdown of Kubernetes Architecture",
    blurb: "The core Kubernetes building blocks explained the way I wish someone had explained them to me first.",
    url: "https://medium.com/@ayotomiwavictor1/pods-nodes-and-etcd-a-practical-breakdown-of-kubernetes-architecture-7a7b10710cce"
  },
  {
    title: "Building a Zero-Touch CI/CD Pipeline on AWS: From IAM Headaches to a Live Self-Deploying API",
    blurb: "The IAM permission boundary problems that come up wiring CodePipeline to ECS, and how each one got resolved.",
    url: "https://medium.com/@ayotomiwavictor1/building-a-zero-touch-ci-cd-pipeline-on-aws-from-iam-headaches-to-a-live-self-deploying-api-5b6c57fbc700",
    related: "cinetrack-api"
  },
  {
    title: "I Diagrammed a CI/CD Pipeline — Then Decided to Actually Build What It Protects",
    blurb: "Why a design doc stopped being enough, and what changed going from diagram to a running pipeline.",
    url: "https://medium.com/@ayotomiwavictor1/i-diagrammed-a-ci-cd-pipeline-then-i-decided-to-actually-build-what-it-protects-cd3a74857d08",
    related: "cicd-pipeline-design"
  },
  {
    title: "Why I'm Building Monitoring on Top of My CI/CD Pipeline (Not a New Project)",
    blurb: "The case for treating observability as a continuation of the pipeline work, not a separate build.",
    url: "https://medium.com/@ayotomiwavictor1/why-im-building-monitoring-on-top-of-my-ci-cd-pipeline-not-a-new-project-2bf80c6f510f",
    related: "monitor-cinetrack"
  },
  {
    title: "Building Production-Grade Observability on AWS: ECS, CloudWatch, X-Ray & a Real CodePipeline",
    blurb: "Wiring traces, metrics, and alarms into a real ECS service instead of leaving it at the diagram stage.",
    url: "https://medium.com/@ayotomiwavictor1/building-production-grade-observability-on-aws-ecs-cloudwatch-x-ray-and-a-real-codepipeline-1282f94bfc1d",
    related: "monitor-cinetrack"
  },
  {
    title: "I Built My 3-Tier AWS Architecture — Then Reality Hit",
    blurb: "What actually broke the CloudFront/WAF/Multi-AZ plan once it met real AWS account limits and a real bill.",
    url: "https://medium.com/@ayotomiwavictor1/i-built-my-3-tier-aws-architecture-then-reality-hit-2e404e50b49a",
    related: "zamweather"
  },
  {
    title: "Building a Secure, Globally-Accelerated 3-Tier Web Architecture on AWS",
    blurb: "Adding CloudFront, WAF, and ACM in front of an internal ALB — the edge layer on top of the base design.",
    url: "https://medium.com/@ayotomiwavictor1/building-a-secure-globally-accelerated-3-tier-web-architecture-on-aws-49b23c180173",
    related: "3tier-edge"
  },
  {
    title: "I Built a Production-Grade Three-Tier VPC on AWS From Scratch Using Only the CLI",
    blurb: "No Terraform, no CDK — public/private subnets, a bastion host, and two firewall layers, all via AWS CLI and bash.",
    url: "https://medium.com/@ayotomiwavictor1/i-built-a-production-grade-three-tier-vpc-on-aws-from-scratch-using-only-the-cli-6b6cbad54b14",
    related: "three-tier-vpc"
  },
  {
    title: "Designing a Production-Grade Serverless API on AWS",
    blurb: "Lambda, API Gateway, DynamoDB, and Cognito — settling the IAM boundaries before writing a line of handler code.",
    url: "https://medium.com/@ayotomiwavictor1/designing-a-production-grade-serverless-api-on-aws-lambda-api-gateway-dynamodb-and-cognito-938205052a24",
    related: "serverless-api"
  },
  {
    title: "The One Thing Missing From Most Serverless API Diagrams",
    blurb: "A gap that shows up in almost every serverless architecture diagram, and why it matters once real traffic hits.",
    url: "https://medium.com/@ayotomiwavictor1/the-one-thing-missing-from-most-serverless-api-diagrams-ff3bf43dd0ea",
    related: "serverless-api"
  },
  {
    title: "How I Built PDFFire: a Serverless PDF Tool With Lambda, SAM & Zero Servers",
    blurb: "Compress, convert, and rotate PDFs through individual Lambda functions — and why the running cost is close to nothing.",
    url: "https://medium.com/@ayotomiwavictor1/how-i-built-pdfire-a-serverless-pdf-tool-with-aws-lambda-sam-and-zero-servers-38703478e345",
    related: "pdffire"
  },
  {
    title: "Building a Serverless Contact Form with Lambda, API Gateway, SES & DynamoDB",
    blurb: "The small, boring backend every marketing site needs, built with nothing that has to be patched.",
    url: "https://medium.com/@ayotomiwavictor1/building-a-serverless-contact-form-with-aws-lambda-api-gateway-ses-dynamodb-0e7fe68b34e2",
    related: "serverless-contact-form"
  },
  {
    title: "I Built a Real-Time DDoS Detection Engine From Scratch, Here's How It Works",
    blurb: "Sliding-window traffic tracking, z-score anomaly scoring, and automated iptables blocking, walked through end to end.",
    url: "https://medium.com/@ayotomiwavictor1/i-built-a-real-time-ddos-detection-engine-from-scratch-heres-how-it-works-0b1bf5e165b0",
    related: "ddos-detection"
  },
  {
    title: "From Broken Code to Production-Ready: Containerizing a Microservices App + CI/CD",
    blurb: "Fixing a deliberately-broken Node/FastAPI/Redis app, then wrapping it in a 6-stage GitHub Actions pipeline.",
    url: "https://medium.com/@ayotomiwavictor1/from-broken-code-to-production-ready-how-i-containerized-a-microservices-app-and-built-a-ci-cd-a6b5cfb225b4",
    related: "microservices-cicd"
  },
  {
    title: "I Built a Production-Grade Deployment Tool From Scratch, Here's Exactly How It Works",
    blurb: "TTL-limited sandboxes, dynamic Nginx routing, and a chaos toggle for testing whether the health checks actually work.",
    url: "https://medium.com/@ayotomiwavictor1/i-built-a-production-grade-deployment-tool-from-scratch-heres-exactly-how-it-works-ca2a039386cb",
    related: "devops-sandbox"
  },
  {
    title: "I Built a Miniature Heroku From Scratch",
    blurb: "SwiftDeploy's manifest-driven deploys, stable/canary switching, and everything that went wrong building it.",
    url: "https://medium.com/@ayotomiwavictor1/i-built-a-miniature-heroku-from-scratch-heres-everything-i-learned-831c4292c1a3",
    related: "swiftdeploy"
  },
  {
    title: "I Provisioned a Linux Server From Scratch, Hardened It, and Served a Live HTTPS API",
    blurb: "No Docker, no orchestration — just a terminal, AWS, and everything that normally gets automated away.",
    url: "https://medium.com/@ayotomiwavictor1/i-provisioned-a-linux-server-from-scratch-hardened-it-and-served-a-live-https-api-heres-d352598d8ba4",
    related: "stage1-api"
  },
  {
    title: "From Zero to Deployed: Shipping a Personal API on AWS (HNG Stage 1)",
    blurb: "The full walkthrough of the first HNG stage build — hand-provisioned EC2, hardened, and live.",
    url: "https://medium.com/@ayotomiwavictor1/from-zero-to-deployed-building-and-shipping-a-personal-api-on-aws-hng-stage-1-7508e2e54fb4",
    related: "stage1-api"
  },
  {
    title: "From Zero to Load-Balanced: My AWS EC2 + Ansible Deployment Adventure",
    blurb: "Standardising infrastructure config with Ansible to kill configuration drift across parallel EC2 deployments.",
    url: "https://medium.com/@ayotomiwavictor1/from-zero-to-load-balanced-my-aws-ec2-ansible-deployment-adventure-3d422474d9e3"
  },
  {
    title: "How I Secretly Built & Deployed a Romantic Valentine Surprise Website on AWS in Under an Hour",
    blurb: "A static S3 site built and shipped fast, for an audience of exactly one.",
    url: "https://medium.com/@ayotomiwavictor1/how-i-secretly-built-deployed-a-romantic-valentine-surprise-website-on-aws-in-under-an-hour-s3-8a28a44cfc5b"
  },
  {
    title: "Proactive Cost Monitoring for a Personal AWS Project",
    blurb: "Getting ahead of a surprise AWS bill on a project with no revenue to absorb one.",
    url: "https://medium.com/@ayotomiwavictor1/challenge-proactive-cost-monitoring-for-a-personal-aws-project-404238cc0174"
  }
];
