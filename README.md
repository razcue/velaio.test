# Velaio Frontend Developer Test

This project was created as part of a technical assessment for the **Frontend Developer** position at [VELAIO](https://velaio.com/). The project follows **Clean Architecture** with a n-layered approach, ensuring scalability, testability, and maintainability.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
   1. [Domain Layer](#domain-layer)
   2. [Infrastructure Layer](#infrastructure-layer)
   3. [Presentation Layer](#presentation-layer)
3. [Installation](#installation)
   1. [Install dependencies](#install-dependencies)
   2. [Environment setup](#environment-setup)
   3. [Go Diego Go](#go-diego-go)
6. [Contact Me](#contact-me)

## Project Overview

This project demonstrates frontend development skills using **Angular 16**. It includes a solution for the technical test provided by VELAIO, located in the file `src/assets/Examen tecnico Angular V1.pdf`.

The project implements the **Clean Architecture** design pattern, structured into three layers:
- **Domain**
- **Infrastructure**
- **Presentation**

## Architecture

### Domain Layer
The **Domain** layer contains the core business logic and entities, independent of any framework or external dependencies. It includes:
- **Models**: Objects representing the main business rules.
- **Services**: Business logic, use cases, and rules processing.

### Infrastructure Layer
The **Infrastructure** layer interacts with external systems such as APIs or databases. It includes:
- **Repositories**: Abstraction layer for data storage and retrieval.

### Presentation Layer
The **Presentation** layer is responsible for handling the user interface and user interactions using Angular components. It includes:
- **UI**: Angular components for UI rendering.
- **Services**: Manage the communication between the Presentation and Infrastructure layers.

## Installation

### Install dependencies
First, clone the repository and install the necessary dependencies:

```
npm install
```

### Environment setup
Ensure you have **Angular CLI** installed globally. If not, you can install it with:

```
npm install -g @angular/cli@16
```

### Go Diego Go

*Go for the money.* -says Diego-

To run the development server, execute the following command:

```
ng serve
```

And access to the URL provided (Example: http://localhost:4200/)

## Contact Me
To get in touch go check out my [GitHub Page](https://razcue.github.io/).
