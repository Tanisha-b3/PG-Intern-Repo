# API Guidelines

This document defines standard conventions for designing, implementing, and consuming RESTful HTTP APIs.  
The goal is consistency, correctness, scalability, and ease of client integration.

---

## 1. HTTP Method Semantics

### GET
- Retrieves resource representation
- Must not modify server state
- Safe and idempotent
- Cacheable

GET /api/v1/users/42


---

### POST
- Creates a new resource or triggers a non-idempotent action
- Server generates the resource identifier
- Not idempotent

POST /api/v1/orders


---

### PUT
- Replaces the entire resource
- Client must send full representation
- Idempotent

PUT /api/v1/users/42


---

### PATCH
- Partially updates a resource
- Only modified fields are sent
- Idempotency depends on implementation

PATCH /api/v1/users/42


---

### DELETE
- Removes a resource
- Idempotent
- Returns no response body

DELETE /api/v1/users/42


---

## 2. HTTP Status Codes

### Success Responses
- `200 OK` – Request succeeded
- `201 Created` – Resource successfully created
- `202 Accepted` – Request accepted for asynchronous processing
- `204 No Content` – Resource deleted or updated with no response body

---

### Client Error Responses
- `400 Bad Request` – Malformed request
- `401 Unauthorized` – Authentication required or failed
- `403 Forbidden` – Authenticated but not permitted
- `404 Not Found` – Resource does not exist
- `409 Conflict` – Duplicate or conflicting request
- `422 Unprocessable Entity` – Validation or semantic error

---

### Server Error Responses
- `500 Internal Server Error` – Unhandled server error
- `502 Bad Gateway` – Invalid upstream response
- `503 Service Unavailable` – Temporary server unavailability
- `504 Gateway Timeout` – Upstream timeout

---

## 3. Request Headers

### Required Headers
- `Content-Type: application/json`
- `Accept: application/json`

### Authorization
Authorization: Bearer <JWT_TOKEN>


### Idempotency
Idempotency-Key: <unique-uuid>


Used to prevent duplicate execution of POST requests.

---

## 4. URL Design Standards

- Use nouns, not verbs
- Use plural resource names
- Represent relationships hierarchically
```json
/api/v1/users
/api/v1/users/{id}
/api/v1/users/{id}/orders
```

---

## 5. Query Parameters

Used for filtering, sorting, searching, and pagination.

GET /api/v1/products?category=books&sort=price&page=1&limit=20


---

## 6. Request Body Format

All request bodies must be JSON.

```json
{
  "name": "Product A",
  "price": 500
}
```
## 7. Response Format Standards
Success Response
```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```
Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "issue": "Invalid format"
      }
    ],
    "requestId": "req_123abc"
  }
}
```
## 8. Pagination
Offset-Based Pagination
GET /api/v1/users?page=1&limit=10
Response:
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 95,
    "totalPages": 10
  }
}
```
Cursor-Based Pagination
GET /api/v1/users?cursor=eyJpZCI6MTIzfQ==&limit=10
Response:
```bash
{
  "data": [],
  "pagination": {
    "nextCursor": "eyJpZCI6MTMzfQ==",
    "hasMore": true
  }
}
```
## 9. Versioning Strategy
APIs must be versioned

Version included in URL

/api/v1
Breaking changes require a new version.

## 10. Security Guidelines
HTTPS only

JWT-based authentication

Validate all inputs

Rate limiting required

Never expose stack traces or internal errors

## 11. Consistency Rules
JSON-only communication

Consistent casing (camelCase or snake_case)

ISO 8601 timestamps

Consistent error codes

## 12. Logging & Monitoring
Log all errors with requestId

Track response times

Monitor 4xx and 5xx error rates