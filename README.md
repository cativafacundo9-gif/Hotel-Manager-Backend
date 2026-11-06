# Hotel Manager - Backend

Sistema backend desarrollado con **NestJS** y **PostgreSQL (Neon)** para la gestión y digitalización de las tareas diarias de un hotel (habitaciones, reservas, huéspedes y mantenimiento).

---

## Tecnologías Utilizadas

- **Framework:** NestJS (Node.js / TypeScript)
- **Base de Datos Relacional:** PostgreSQL (Cloud hosted via Neon)
- **Gestión de Versiones:** Git & GitHub (Estrategia de ramas: `main`, `dev`, `feature/*`, `docs/*`)
- **Documentación de API:** Postman

---

## Arquitectura del Proyecto (`modules/`)

El proyecto sigue una estructura modular estricta, organizada dentro de la carpeta `src/modules/`:

```text
src/
├── main.ts
└── modules/
    ├── app/
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   └── app.service.ts
    ├── habitaciones/
    ├── reservas/
    ├── huespedes/
    └── mantenimiento/
```
