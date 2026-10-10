# POC #02 - Express & Shadcn Setup
Production Grade - Proof of Concept - Express & Shacn Setup

Visit Agile Management Baord
- Link: [https://github.com/users/OfficialApurvChatur/projects/8](https://github.com/users/OfficialApurvChatur/projects/8)

## System Architecture

### 01. High Level Design (HLD)
```mermaid
  sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant Database

    User -->> Frontend : ui req
    Frontend -->> Backend : api req
    Backend -->> Database : data req
    Database -->> Backend : data res
    Backend -->> Frontend : api res
    Frontend -->> User : ui res
```

### 02. Low Level Design (LLD)

#### 02.01. Git Branching & PR Strategies Setup LLD
```mermaid
  sequenceDiagram
    actor Developer
    participant feature/*
    participant develop
    participant test
    participant stage
    participant prod

    Developer -->> develop : switch
    develop -->> feature/* : create
    feature/* -->> feature/* : push
    feature/* -->> develop : merge
    develop -->> test : merge
    test -->> stage : merge
    stage -->> prod : merge
    prod -->> develop : merge
    develop -->> Developer : pull
```

#### 02.02. Project Overview Setup LLD
```mermaid
  flowchart LR
    User(("User"))
    subgraph Testing["Testing"]
      subgraph Frontend["Frontend"]
        React["React"]
      end

      subgraph Backend["Backend"]
        Node["Node"]
      end
    end

    User --> Frontend
    Frontend --> Backend
```

#### 02.03. Environment Setup LLD
```mermaid
  flowchart
    User(("User"))
    subgraph Environment["Environment"]
      develop["develop"]
      test["test"]
      stage["stage"]
      prod["prod"]
    end
    subgraph Project["Project"]
      direction TB
      Backend["Backend"]
      Frontend["Frontend"]
    end

    User --> develop
      develop --> Project
    User --> test
      test --> Project
    User --> stage
      stage --> Project
    User --> prod
      prod --> Project
```

#### 02.04. Playwright Setup LLD

#### 02.05. Servers & DNS Setup LLD

#### 02.06. CI/CD Deployment Setup LLD

## Servers & DNS

### Backend
- Development
  - Local: [http://localhost:8001](http://localhost:8001)
  - Live: []()

- Testing
  - Local: [http://localhost:8002](http://localhost:8002)
  - Live: []()

- Staging
  - Local: [http://localhost:8003](http://localhost:8003)
  - Live: []()

- Production
  - Local: [http://localhost:8004](http://localhost:8004)
  - Live: []()

### Frontend
- Development
  - Local: [http://localhost:3001](http://localhost:3001)
  - Live: []()

- Testing
  - Local: [http://localhost:3002](http://localhost:3002)
  - Live: []()

- Staging
  - Local: [http://localhost:3003](http://localhost:3003)
  - Live: []()

- Production
  - Local: [http://localhost:3004](http://localhost:3004)
  - Live: []()
