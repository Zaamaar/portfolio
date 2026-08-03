/**
 * PROJECT DATA — this is the only file you need to edit to add a new project.
 *
 * To add a project: copy an existing object below, change every field, and
 * add a comma after it. The site will pick it up automatically — no other
 * file needs to change.
 *
 * Field guide:
 *   id          - short unique slug, no spaces (e.g. "cinetrack")
 *   build       - a number for the "BUILD #" tag. Use the next number up.
 *   title       - project name as it should display
 *   blurb       - 1-2 sentences, what it is and why it exists
 *   status      - "live" | "building" | "archived"
 *                 live      = deployed and reachable right now
 *                 building  = in progress / not yet fully deployed
 *                 archived  = finished, but not currently running
 *   date        - e.g. "Jul 2026" - roughly when you shipped it
 *   stack       - array of short strings, the tech involved
 *   links       - any of: github, live, medium, linkedin
 *                 omit a key entirely if you don't have that link yet
 */

const PROJECTS = [
  {
    id: "cinetrack",
    build: 8,
    title: "CineTrack",
    blurb: "Movie watchlist and rating API with a full AWS deployment — ECS Fargate, an ALB, RDS, and a custom ACM-secured domain.",
    status: "live",
    date: "Jul 2026",
    stack: ["Node.js", "Express", "PostgreSQL", "ECS Fargate", "RDS", "ALB", "ECR"],
    links: {
      github: "https://github.com/Zaamaar/cinetrack-api",
      live: "https://cinetrack.hngayotomiwa.online",
      medium: ""
    }
  },
  {
    id: "swiftdeploy",
    build: 7,
    title: "SwiftDeploy",
    blurb: "A self-service DevOps sandbox platform — spins up isolated Docker environments on demand behind a dynamic Nginx reverse proxy, controlled through a FastAPI control plane.",
    status: "live",
    date: "May 2026",
    stack: ["Docker", "FastAPI", "Nginx", "EC2", "Python"],
    links: {
      github: "https://github.com/Zaamaar",
      medium: "https://medium.com/@ayotomiwavictor1/i-built-a-miniature-heroku-from-scratch-heres-everything-i-learned-831c4292c1a3"
    }
  },
  {
    id: "ddos-detection",
    build: 6,
    title: "Real-Time DDoS Detection Engine",
    blurb: "A sliding-window traffic monitor with z-score anomaly detection that automatically blocks attacking IPs via iptables and alerts the team over Slack.",
    status: "live",
    date: "Jun 2026",
    stack: ["Python", "Docker Compose", "Nginx", "iptables", "Slack API"],
    links: {
      github: "https://github.com/Zaamaar",
      live: "https://monitor.hngayotomiwa.online",
      medium: "https://medium.com/@ayotomiwavictor1/i-built-a-real-time-ddos-detection-engine-from-scratch-heres-how-it-works-0b1bf5e165b0"
    }
  },
  {
    id: "find-app",
    build: 5,
    title: "Find",
    blurb: "A safety-focused mobile app for the Nigerian market — real-time location sharing, SOS alerts, and SMS fallback for when data drops out.",
    status: "building",
    date: "Jul 2026",
    stack: ["Node.js", "Express", "PostgreSQL", "Socket.io", "React Native", "Twilio"],
    links: {
      github: "https://github.com/Zaamaar"
    }
  },
  {
    id: "microservices-cicd",
    build: 4,
    title: "Broken-to-Production Microservices Fix",
    blurb: "Diagnosed and repaired a deliberately broken multi-service app, then containerized it and shipped a 6-stage GitHub Actions CI/CD pipeline around it.",
    status: "archived",
    date: "May 2026",
    stack: ["Docker", "GitHub Actions", "Node.js", "FastAPI", "Redis"],
    links: {
      github: "https://github.com/Zaamaar",
      medium: "https://medium.com/@ayotomiwavictor1/from-broken-code-to-production-ready-how-i-containerized-a-microservices-app-and-built-a-ci-cd-a6b5cfb225b4"
    }
  },
  {
    id: "serverless-api",
    build: 3,
    title: "Serverless API on AWS",
    blurb: "A production-pattern serverless API — Lambda behind API Gateway, DynamoDB for storage, Cognito for auth — designed as a diagram before a line of code was written.",
    status: "archived",
    date: "Mar 2026",
    stack: ["Lambda", "API Gateway", "DynamoDB", "Cognito"],
    links: {
      github: "https://github.com/Zaamaar/Serverless-API-Lambda-API-Gateway-DynamoDB-Cognito",
      medium: "https://medium.com/@ayotomiwavictor1/designing-a-production-grade-serverless-api-on-aws-lambda-api-gateway-dynamodb-and-cognito-938205052a24"
    }
  },
  {
    id: "stage1-api",
    build: 2,
    title: "Stage 1: Zero to Deployed",
    blurb: "A hand-provisioned Linux server hardened from scratch, serving a live HTTPS API — no Docker, no automation tooling, just a terminal and AWS.",
    status: "archived",
    date: "Apr 2026",
    stack: ["EC2", "Nginx", "PM2", "systemd"],
    links: {
      github: "https://github.com/Zaamaar/stage1-api",
      medium: "https://medium.com/@ayotomiwavictor1/from-zero-to-deployed-building-and-shipping-a-personal-api-on-aws-hng-stage-1-7508e2e54fb4"
    }
  },
  {
    id: "zamweather",
    build: 1,
    title: "ZamWeather",
    blurb: "A weather app deployed on a 3-tier AWS architecture, provisioned entirely with Terraform.",
    status: "archived",
    date: "2026",
    stack: ["Terraform", "AWS", "3-tier architecture"],
    links: {
      github: "https://github.com/Zaamaar/zamweather"
    }
  }
];
