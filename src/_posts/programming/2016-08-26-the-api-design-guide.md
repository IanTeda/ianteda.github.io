---
title: The API Design Guide
description: One piece of software talking to another piece of software
date: 2016-08-26
tags: [API]
layout: post
category: programming
navigation: true
main-header: true
cover: /assets/images/cover-old-typewriter.jpg
logo: /assets/images/logo-light.png
---

> An API allows one piece of software talking to another piece of software

### Definitions

Some terms used in this guide and there definitions:

- __API__ - Application Programming Interface, an interface for one piece of software to talk to another;
- __Collection__ - A collection of resources found at an endpoint;
- __Consumer (Client)__ - A client computer application making requests of the API;
- __cURL__ - A command line tool for getting and sending files using URL syntax;
- __Endpoint__ - An API URL on a Server which represents either a Resource or a Collection;
- __Granularity__ - The level of detailed returned in the request response;
- __HTTP__ - A protocol for communicating over networks, aka the internet;
- __Idempotent (Stateless)__ - Side-effect free, can happen multiple times without affecting the data state;
- __Resource__ - A single instance of an object in an endpoint request response;
- __REST (RESTful)__ - Representational State Transfer, an architectural style for the design of network-based software;
- __SSL__ - Secure Socket Layer, the standard security technology for establishing an encrypted link between a web server and a browser
- __URL__ - Uniform Resource Locator and is a reference (an address) to a resource on the Internet.
- __URL Segment__ - A slash-separated piece of information in the URL;

### AIM

The aim of this design guide is to assist in the planing and development of a REST API.

### Overview

An API is an: Application Programming Interface. An interface for one piece of software to talk to another[^concepts] and data to be shared. It is a set of endpoints for serving up data.

### REST API

REST API is an architectural design style that follows a defined set of objectives. It was first defined by Roy [Thomas Fielding](https://en.wikipedia.org/wiki/Roy_Fielding){:target="_blank"} in his 2000 PhD dissertation “Architectural Styles and the Design of Network-based Software Architectures”. 

The REST architectural style aims to be:

- __Stateless:__ each request contains all the information needed to complete the request;
- __Independent:__ client-server model allows for different client environments and implementations to use the API;
- __Cacheable:__ responses define themselves as cacheable or not, improving latency, scalability and responsiveness;
- __Granularity:__ use the lowest possible level of deatil to satisfy as many difference requirements and use cases as possible;
- __Secure:__ use of HTTP authorisation headers to securely send data;
- __Encapsulation:__ expose only the date data you want to, in a controlled way;

### Success

A successful REST API, is one that:

- Has good documentation that is easy to find;
- Uses web standards where they make sense;
- Is friendly to the developer and can be explored via a browser address bar;
- Is simple, intuitive and consistent to make adoption not only easy but pleasant;
- Provides enough flexibility to power the majority of development environments;
- Is efficient, while maintaining a balance with other requirements;
- Has been developed using Test Driven Development (TDD) principles

### Documentation

The API should be well documented with cURL examples with JSON responses. A cURL examples can be cut-and-pasted, removing any ambiguity regarding endpoint calls and applicable JSON responses.

### API BASE/ROOT URL

The root or entry point into the API should be as simple as possible. Long complex URLs appear daunting. Two common API roots are:

1. `https://api.example.com/*`
2. `https://example.com/api/*`

The single root entry point should contain some basic information about the API, such as:

- Information on the API version;
- Supported features;
- A list of top-level collections;
- A list of singleton resources;
- A small summary of operating status;
- Some statistics;
- A link to the documentation

### Versioning

The version number should refer to major releases of the API. An API is never going to be stable, change is inevitable in fact needed. What is important is how that change is managed. When third-party software applications (clients) integrate with your API, they become dependent on the availability of the API. Versioning allows for backwards compatibility and continued development.

There are two common methods for managing API versions: 

1) in the request HTTP header;

~~~
Accept: application/com.ianteda.app-v3+json
Content-Type: application/com.ianteda.app-v3+json 
~~~

2) in the URL;

~~~
GET https://api.example.com/v1/endpoint
~~~

This guide recommends option 2. Having the API version in the endpoint URL, it is obvious and human readable.

### Security

All API requests and responses should be over SSL (HTTPS). Do not redirect non-SSL requests to the SSL endpoint, as this can leak information. Instead throw an API error response when the request comes over non-SSL.

With the use of Webtokens, SSL simplifies the authentication model. Never use a custom authentication protocol, stick to the standards like [Oauth 2](https://oauth.net/2/). Webtokens means the users state (authentication) is kept on the user end, sot that every request can be authenticated against the webtokens. This avoids server session states, sticking to the REST stateless server principle.

Access within the API should be based on the resource not the endpoint URL.

Use request rate limiting to the endpoints, to avoid performance issues.

Keep in mind when providing authentication responses that:

- __401 "Unauthorized"__ - Really means unauthenticated. You need valid credentials for me to respond to this request;
- __403 "Forbidden"__ - Really means unauthorized. I understood your credentials, but sorry, you are not allowed to access that resource;

### Error Messages

When responding with an error the JSON body should return a useful error message, a unique internal error code with reference to documentation, a detailed description and a 400 http status. Error messages should be human-readable from the browser, include a diagnostic message to help the consumer resolve the error condition and be as descriptive as possible.

~~~
Status: 400 BAD REQUEST
{
  "code" : unique_project_code,
  "property" : "What caused the error",
  "message" : "Something bad has happened :(",
  "description" : "More details about the error here",
  "developer_message : "Extra information to help resolve the error response",
  "documentation_url": "https://ianteda.com/api/documentation"
}
~~~

### Endpoints

#### Rules

Some Endpoint rules to keep in mind:

- __Nouns__ - Always represent endpoints with nouns, not verbs;
- __Plurals__ - Always use the plural of the noun. It avoids confusing pluralisation such as person and people;
- __Logical__ - Endpoints should make sense from the perspective of the API consumer. Aka developer, not the data model;
- __Not one-to-one__ - Endpoints don't necessarily need to or make sense to map one-to-one to the data (database) model;
- __Actions__ - Endpoint actions should be verbs;
- __down case__ - Down case end points and actions;
- __Snake Case__ - Use snake_case;
- __Full Path__ - In your responses provide a link to the fully qualified canoncial API path;
- __Resource Created__ - When posting (creation and update) to an endpoint the response should return the resource created;
- __Names and IDs__ - Accept Ids and names in endpoint requests;
- __Limit Nesting__ - Limit endpoint nesting;
- __Human Readable__ - The API response should  be human readable, pretty print by default. i.e. Do not remove white space;
- __GZip__ - Compress responses, since we are going pretty print response with whitespaces;
- __Cache__ - Cache responses with ETag and `Cache-Control: max-age=0, private, must-revalidate`;
- __Media Type__ - Use Media Type `Content-Type: application/json; charset=utf-8`;
- __Expansion__ - Keep response as small as possible with links to expansion (or materialisation);
- __Documentation__ - Each endpoint should provide a link to its documentation;
- __Boolean__ - Treat boolean actions on a resource as a sub resource. `PUT /resource/{key}/activate`;
- __Granularity:__ Keep resource detail to the lowest practical level with links to expansion;
- __Multiple Endpoing Query:__ Create an endpoint for multiple resource queries, such as search;
- __Analytics__ - Keep track of the version/endpoints of your API being used by Consumers;
- __Response Output__ - Use JSON;

#### Actions

Typical actions on an endpoint

| Method | URI end point | Notes |
|--------|---------------|-------|
| GET    | /resource        | Returns a list of all the resources in the collection. By default items in the list are a minimal representation of themselves |
| GET    | /resource/{key}  | Returns the full content of the resource identified by the given key (name or id) |
| POST   | /resource        | Create a new resource |
| PUT    | /resource/{key}  | Update a resource identified by the given key (name or id) |
| PATCH  | /resource/{key}  | Partially update a resource identified by the given key (name or id) |
| DELTE  | /resource/{key}  | Delete a resource identified by the given key (name or id) |


#### Relationships

##### One to many relationships

If Relationships exist within a resource, extend the endpoint.

| Method | URI end point                   | Notes |
|--------|---------------------------------|-------|
| GET    | /resource/{key}/relationship       | Retrieve a list of relationships for the resource {key (name or id)} |
| GET    | /resource/{key}/relationship/{key} | Retrieve relationship {key} (name or id) for a given resource {key (name or id)} |
| POST   | /resource/{key}/relationship       | Create a new relationship for a given resource {key (name or id)} |
| PUT    | /resource/{key}/relationship/{key} | Update relationship {key} (name or ide) for ticket {key (name or id)} |
| PATCH  | /resource/{key}/relationship/{key} | Partially update relationship {key (name or id)} for resource {key (name or id)} |
| DELETE | /resource/{key}/relationship/{key} | Delete relationship {key (name or id)} for resource {key (name or id)} |

##### Many to many relationships

If the relationship exists external to a resource, provide an end point for the relationship. With a href link within the resource response to the relationship. By creating an endpoint for the relationship it can be deleted without deleting the resource.

#### Provide Request-Ids for Introspection

Include a Request-Id header in each API response, populated with a UUID value. By logging these values on the client, server and any backing services, it provides a mechanism to trace, diagnose and debug requests.

#### Pagination

Divide large responses across multiple requests with pagination. Using offset and limit parameters 

- `../resource?offset=50&limit=25` - Will return a response starting from 50 of the next 25 resource items.

Provide links within the paged response to other pages.

~~~
{
  "first" : "/resource/00001",
  "previous" : "/resource/34523",
  "next" : "/resource/34525",
  "last" : "/resource/8764534",
  "index : {
    00001: "/resource?offset=0&limit=25",
    00002: "/resource?offset=25&limit=25",
    00003: "/resource?offset=50&limit=25"
  }
}
~~~

#### Parameters

Complex result filters, sorting and searching can all be easily implemented as query parameters on top of the resource URL

##### Filtering

Use a unique query parameter for each field that implements filtering. When requesting a list of resources from the /resources endpoint the default should be the smallest practical, say those in the open state. Provide a mechanism to return all `GET /resources?state=all` or those closed `GET /resources?state=closed`

##### Sorting

Use the a generic parameter such as `?sort=` to describe sorting rules for a resource endpoint. Accommodate complex sorting requirements with a list of comma separated fields, each with a possible unary negative for descending order or positive.

- `GET /resources?sort=-priority` - Responds with a list of resources in descending order of priority field
- `GET /resources?sort=-priority,created_at` - Responds with a list of resources in descending order of priority.  With older resources within the priority being first.

##### Searching

Sometimes basic filters is not enough and you need the power of full text search. Use a query parameter on the resources endpoint `?query=search term`. Search queries should be passed straight to the search engine and API output should be in the same format as a normal list result.

To make the API experience more pleasant for the average consumer, consider packaging up sets of query conditions into easily accessible endpoints.

### HTTP status codes

HTTP status codes can help your consumers navigate your API. Providing context to the API responses.

Useful list of API HTTP status codes

| Code | Status                 | Notes |
|:----:|------------------------|-------|
| 200  | OK                     | Response to a successful GET, PUT, PATCH or DELETE. Can also be used for a POST that doesn't result in a creation |
| 201  | Created                | Response to a POST that results in a creation. Should be combined with a Location header pointing to the location of the new resource |
| 204  | No Content             | Response to a successful request that won't be returning a body (like a DELETE request)  |
| 304  | Not Modified           | Used when HTTP caching headers are in play |
| 400  | Bad Request            | The request is malformed, such as if the body does not parse |
| 401  | Unauthorized           | When no or invalid authentication details are provided. Also useful to trigger an auth popup if the API is used from a browser |
| 403  | Forbidden              | When authentication succeeded but authenticated user doesn't have access to the resource |
| 404  | Not Found              | When a non-existent resource is requested |
| 405  | Method Not Allowed     | When an HTTP method is being requested that isn't allowed for the authenticated user |
| 410  | Gone                   | Indicates that the resource at this end point is no longer available. Useful as a blanket response for old API versions |
| 415  | Unsupported Media Type | If incorrect content type was provided as part of the request |
| 422  | Unprocessable Entity   | Used for validation errors |
| 429  | Too Many Requests      | When a request is rejected due to rate limiting |

##### References
- [10 Design Tips For APIs](https://phraseapp.com/blog/posts/best-practice-10-design-tips-for-apis/){:target="_blank"}
- [Application programming interface](https://en.wikipedia.org/wiki/Application_programming_interface){:target="_blank"}
- [Best Practices for a Pragmatic RESTful API](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api){:target="_blank"}
- [Beautiful REST & JSON APIs](https://www.youtube.com/watch?v=mZ8_QgJ5mbs){:target="_blank"}
- [How to design a REST API](http://blog.octo.com/en/design-a-rest-api/){:target="_blank"}
- [Representational state transfer](https://en.wikipedia.org/wiki/Representational_state_transfer){:target="_blank"}
- [REST API Design - Resource Modeling](https://www.thoughtworks.com/insights/blog/rest-api-design-resource-modeling){:target="_blank"}
- [REST API concepts and examples](https://www.youtube.com/watch?v=7YcW25PHnAA){:target="_blank"}
- [Thoughts on RESTful API Design](https://restful-api-design.readthedocs.io/en/latest/){:target="_blank"}
- [What Exactly is RESTful Programming](http://stackoverflow.com/questions/671118/what-exactly-is-restful-programming){:target="_blank"}