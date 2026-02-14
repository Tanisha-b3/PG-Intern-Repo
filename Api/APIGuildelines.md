# API Guidelines

This document defines the standard API conventions for status codes,
error handling, and pagination for production-ready backend systems
(MERN, Node.js, or microservices).

------------------------------------------------------------------------

## 1️⃣ HTTP Status Codes (Standardized Usage)

### 2xx --- Success

  Code             Meaning                When to Use
  ---------------- ---------------------- ---------------------------------
  200 OK           Successful request     GET, PUT, PATCH
  201 Created      Resource created       POST (create user, video, etc.)
  204 No Content   Success with no body   DELETE operations

Example:

``` json
{
  "success": true,
  "data": { "id": "123", "name": "Tanisha" }
}
```

------------------------------------------------------------------------

### 4xx --- Client Errors

  Code                       Meaning              When to Use
  -------------------------- -------------------- -------------------------
  400 Bad Request            Invalid input        Validation errors
  401 Unauthorized           No auth token        Missing/invalid JWT
  403 Forbidden              Access denied        Role-based restrictions
  404 Not Found              Resource not found   Missing user/video
  409 Conflict               Duplicate resource   Email already exists
  422 Unprocessable Entity   Validation failed    DTO/schema errors

------------------------------------------------------------------------

### 5xx --- Server Errors

  -----------------------------------------------------------------------
  Code            Meaning                When to Use
  --------------- ---------------------- --------------------------------
  500 Internal    Unexpected failure     Unhandled exceptions
  Server Error                           

  502 Bad Gateway Upstream service error Microservices/API gateway

  503 Service     Server overloaded/down Maintenance or scaling
  Unavailable                            
  -----------------------------------------------------------------------

Never expose internal stack traces in production.

------------------------------------------------------------------------

## 2️⃣ Standard Error Response Format

All APIs must return a consistent error structure.

### Recommended Error Format

``` json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      {
        "field": "email",
        "issue": "Email cannot be empty"
      }
    ]
  }
}
```

### Minimal Error (Simple APIs)

``` json
{
  "success": false,
  "message": "User not found"
}
```

### Best Practices

-   Do not leak database errors
-   Use meaningful error codes
-   Keep messages user-friendly
-   Log detailed errors internally only

------------------------------------------------------------------------

## 3️⃣ Success Response Format (Recommended)

Standard success structure:

``` json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Example:

``` json
{
  "success": true,
  "data": {
    "id": "u1",
    "name": "Tanisha",
    "email": "tanisha@example.com"
  }
}
```

------------------------------------------------------------------------

## 4️⃣ Pagination Guidelines (Production Standard)

Pagination prevents large payloads and improves performance.

### Query Parameters (Recommended)

  Param   Description      Example
  ------- ---------------- -----------------
  page    Page number      ?page=1
  limit   Items per page   ?limit=10
  sort    Sorting field    ?sort=createdAt
  order   asc / desc       ?order=desc

Example Request:

    GET /api/videos?page=1&limit=10

------------------------------------------------------------------------

### Paginated Response Format

``` json
{
  "success": true,
  "data": [
    { "id": "v1", "title": "Video 1" },
    { "id": "v2", "title": "Video 2" }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

------------------------------------------------------------------------

## 5️⃣ Cursor-Based Pagination (Advanced -- High Scale)

Better for large datasets (like feeds, streaming platforms).

Example Request:

    GET /api/videos?cursor=abc123&limit=10

Response:

``` json
{
  "success": true,
  "data": [...],
  "meta": {
    "nextCursor": "xyz789",
    "hasMore": true
  }
}
```

Use cursor pagination when: - Infinite scroll - Large tables (millions
of rows) - Real-time feeds

------------------------------------------------------------------------

## 6️⃣ API Design Best Practices

-   Use RESTful routes (`/users`, `/videos`, `/orders`)
-   Use nouns, not verbs
-   Version APIs (`/api/v1/users`)
-   Validate input using DTO/schema
-   Always return consistent response structure
-   Implement rate limiting for public APIs
-   Use proper HTTP methods (GET, POST, PUT, DELETE)

------------------------------------------------------------------------

## 7️⃣ Example Endpoint (Production-Ready)

### GET /api/v1/users?page=1&limit=10

Response:

``` json
{
  "success": true,
  "data": [
    { "id": "1", "name": "Tanisha" }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

------------------------------------------------------------------------

## 8️⃣ Enterprise Mindset

-   Consistency \> creativity
-   Predictable error format
-   Strict status code usage
-   Scalable pagination strategy
-   Secure responses (no sensitive data)

These guidelines are ideal for MERN, NestJS, and microservice-based
production backends.
