---
title: The API Design Guide
description: One piece of software talking to another piece of software
date: 2016-07-27
tags: [API]
layout: post
category: programming
navigation: true
main-header: true
cover: /assets/images/cover-old-typewriter.jpg
logo: /assets/images/logo-light.png
---

> One piece of software talking to another piece of software

### Definitions

Some terms that are used in this guide and there definitions:

- Application Programming Interface;
- REST: Representational State Transfer;
- Resource: A single instance of an object;
- Collection: A collection of homogeneous objects (resources);
- HTTP: A protocol for communicating over networks;
- Consumer: A client computer application capable of making HTTP requests;
- Third Party Developer: A developer not a part of your project but who wishes to consume your data;
- Server: An HTTP server/application accessible from a Consumer over a network;
- Endpoint: An API URL on a Server which represents either a Resource or a Collection of Resources;
- Idempotent: Side-effect free, can happen multiple times without penalty;
- URL: ???
- URL Segment: a slash-separated piece of information in the URL;
- Granularity: level of detailed;
- cURL: A command line tool for getting and sending files using URL syntax;
- SSL

### AIM

The aim of this design guide is to assist in the planing and development of a REST API.

### Overview

An API is an: Application Programming Interface. An interface for one piece of software to talk to another[^concepts]. For data to be shared. It is a set of Endpoints for building software to utilise those Endpoints.

### REST API

REST API is a design paradigm that follows a defined set of objectives. It was first defined by Roy Thomas Fielding in his 2000 PhD dissertation “Architectural Styles and the Design of Network-based Software Architectures”. 

RESTful architectural style aims to be:

- Stateless: each request from a client contains all the information needed to complete the request. With any session state being held in the client;
- Independent: client-server model allows for different client development environments and implementations to use the API;
- Cacheable: responses need to define themselves as cacheable or not. Improving latency, scalability and responsiveness;
- Granularity: general or average granularity should be used to satisfy as many difference requirements and use cases as possible;
- Secure: use of HTTP authorisation headers to securely send data;
- Encapsulation: expose data in a controlled way;

### Success

A successful RESTful API, is one that:

- Uses web standards where they make sense;
- Is friendly to the developer and can be explored via a browser address bar;
- Is simple, intuitive and consistent to make adoption not only easy but pleasant;
- Provides enough flexibility to power majority of development environments;
- Is efficient, while maintaining a balance with the other requirements;
- Is well documented
- Has been developed using Test Driven Development (TDD) principles

### Documentation

The API should be well documented with cURL examples and expected JSON responses. cURL examples can be cut-and-pasted, removing any ambiguity regarding endpoint calls and applicable JSON responses.

### API ROOT URL

The root or entry point into the API should be as simple as possible, as long complex URL appear daunting. Two common ULR roots are:

1. `https://api.example.com/*`
2. `https://example.com/api/*`

Provide a singleton entry point at the root of the API with:

- Information on the API version;
- Supported features;
- A list of top-level collections;
- A list of singleton resources;
- Small summary of operating status;
- Statistics;
- Link to documentation

### Versioning

The version number should refer to major releases of the API and should be included in the URL. An API is never going to be completely stable, change is inevitable in fact needed. What is important is how that change is managed. When third-party software applications (clients) integrate with your API, it becomes dependent on the availability of the API. Versioning allows for backwards compatibility and continued development.

There are two common methods for managing API versions: 

1) in the POST header ??;
2) in the URL;

This guide recommends using a URL prefix:

* `GET https://api.example.com/v1/endpoint`

### Security

Avoid sessions if possible because a RESTful server is stateless and authenticating every request. 

The authentication is simplified with Webtokens and SSL. When authentication use Oauth 1.0a, never use custom authentication protocols.

Do not use non-SSL redirects to the equivalent SSL endpoint, as this could leak information. Instead provide a error response.

Authentication should be based on the resource not the URL.

Use API Keys instead of Username and Passwords.

401 "Unauthorized" really means unauthenticated. You need valid credentials for me to respond to this request
403 "Forbidden" really means Unauthorized. I understood your credentials, but sorry, you are not allowed

## HTTP status codes

If we are sticking with Web standards we need to know what status codes mean:

- __1xx Range:__ is reserved for low-level HTTP, so you will more than likely not need to send one of these;
- __2xx Range:__ is reserved for successful messages, the more of these returned the better the API documentation;
- __3xx Range"__ is reserved for traffic redirection. Most APIs do not use these requests much (not nearly as often as the SEO folks use them ;), however, the newer Hypermedia style APIs will make more use of these.
- __4xx Range:__ is reserved for responding to errors made by the Consumer, e.g. they’re providing bad data or asking for things which don’t exist. These requests should be be idempotent, and not change the state of the server.
- __5xx Range:__ is reserved as a response when the Server makes a mistake. Often times, these errors are thrown by low-level functions even outside of the developers hands, to ensure a Consumer gets some sort of response. The Consumer can’t possibly know the state of the server when a 5xx response is received, and so these should be avoidable.



HTTP defines a bunch of meaningful status codes that can be returned from your API. These can be leveraged to help the API consumers route their responses accordingly. I've curated a short list of the ones that you definitely should be using:

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


### Endpoints

Endpoint Rules:

- Be represented by nouns, not verbs;
- Always use the plural of the noun. It avoids confusing pluralisation such as person and people;
- Endpoints should make sense from the perspective of the API consumer. Aka developer, not the data model;
- Endpoints don't necessarily need to or make sense to map one-to-one to the data (database) model;
- Actions on the nouns should be verbs
- Down case endpoints and actions
- Use snake_case ???
- Responses should provide href to the API path full qualified canonical reference
- When posting (creation and update) to an endpoint return the representation of the resource
- Accept Ids and names in endpoint requests
- Limit endpoint nesting
- Pretty print by default. i.e. Make it human readable by not removing white space
- Gzip responses, since we are going pretty print response
- Use Media Type `Content-Type: application/json`
- Reference Expansion (or materialised)
- Expand to include additional information form a single requests
- Use parameters to "expand"
- Limit through "fields"
- Each endpoint should provide a link to its documentation

### Resource Granularity

A common misconception is that there is a one-to-one mapping between a service in the paper world and a corresponding API. In reality, this is almost never the case. APIs should be designed at the lowest practical level of granularity because this makes each service simpler and allows them to be combined in ways that suit the consumer. The key principle is to design services that can be re-used and combined in different ways.

| Method | URI end point | Notes |
|--------|---------------|-------|
| GET    | /nouns        | This returns a list of the noun items. By default items in the list are a minimal representation of a noun entity |
| GET    | /nouns/{key}  | This returns the full content of the nouns identified by the given key |
| POST   | /nouns        | This creates a new ticket |
| PUT    | /nouns/{key}  | This updates noun identified by the given key |
| PATCH  | /nouns/{key}  | Partially update noun identified by the given key |
| DELTE  | /nouns/{key}  | Delete noun identified by the given key |


## Relationships

### One to many relationships
If Relationships exist within the resource, extend the endpoint.

| Method | URI end point                   | Notes |
|--------|---------------------------------|-------|
| GET    | /nouns/{key}/relationship       | Retrieves list of relationships for ticket {key} |
| GET    | /nouns/{key}/relationship/{key} | Retrieves message {key} for ticket {key} |
| POST   | /nouns/{key}/relationship       | Creates a new message in ticket {key} |
| PUT    | /nouns/{key}/relationship/{key} | Updates message {key} for ticket {key} |
| PATCH  | /nouns/{key}/relationship/{key} | Partially updates message {key} for ticket {key} |
| DELETE | /nouns/{key}/relationship/{key} | Deletes message {key} for ticket {key} |

### Many to many relationships
A user can belong to many groups and groups can have many users.

If the relationship exists external to the resource. Provide an end point for the relationship, provide a href link with the initial response to the relationship endpoint.

A relationship can be deleted without deleting the resource

## Boolean Actions

Treat it as a sub resource

`PUT /users/765/activate`

`DELETE /user/765/activate`

## Multiple Resource

Usually a query such as search
Make a new end point

## Cache

Save bandwidth, cache data with ETags

## Provide Request-Ids for Introspection

Include a Request-Id header in each API response, populated with a UUID value. By logging these values on the client, server and any backing services, it provides a mechanism to trace, diagnose and debug requests.

## Pagination
Divid large responses across requests
Offset

Pagination of collections
Use Offset and Limit
../applications?offset=50&limit=25
Offset from 0
limit per return
Could provide link property through links

- first
- previous
- next
- last
- items array for index

### Error Messages
Error messages should provide a human-readable error message that is designed to be read and understood by the user.

Error messages should include a diagnostic message that contains technical details for use by the developers/maintainers of the application that consumes the API.

Diagnostic messages may include links to documentation and other ‘hints’ that might assist developers resolve issues that may have resulted in the error condition.

A JSON error body should provide a few things for the developer - a useful error message, a unique error code (that can be looked up for more details in the docs) and possibly a detailed description. JSON output representation for something like this would look like:

```
{
  "code" : 1234,
  "message" : "Something bad happened :(",
  "description" : "More details about the error here"
}
```
Want to be as descriptive as possible
Internal error code. provide ip path to the code
status 409
code (internal code) -> application specific
property: what caused the problem
message: Your customers application end user
developerMessage: extra information and fix
moreInfo: application specific error link

### Result

It's best to keep the base resource URLs as lean as possible. Complex result filters, sorting requirements and advanced searching (when restricted to a single type of resource) can all be easily implemented as query parameters on top of the base URL

#### Filtering: 

Use a unique query parameter for each field that implements filtering. For example, when requesting a list of tickets from the /tickets endpoint, you may want to limit these to only those in the open state. This could be accomplished with a request like GET /tickets?state=open. Here, state is a query parameter that implements a filter.

#### Sorting: 

Similar to filtering, a generic parameter sort can be used to describe sorting rules. Accommodate complex sorting requirements by letting the sort parameter take in list of comma separated fields, each with a possible unary negative to imply descending sort order. Let's look at some examples:

GET /tickets?sort=-priority - Retrieves a list of tickets in descending order of priority
GET /tickets?sort=-priority,created_at - Retrieves a list of tickets in descending order of priority. Within a specific priority, older tickets are ordered first

#### Searching: 

Sometimes basic filters aren't enough and you need the power of full text search. Perhaps you're already using ElasticSearch or another Lucene based search technology. When full text search is used as a mechanism of retrieving resource instances for a specific type of resource, it can be exposed on the API as a query parameter on the resource's endpoint. Let's say q. Search queries should be passed straight to the search engine and API output should be in the same format as a normal list result.

Aliases for common queries

To make the API experience more pleasant for the average consumer, consider packaging up sets of conditions into easily accessible RESTful paths.

#### Rate Limiting
When your users begin to use your API initially, you probably don’t have to worry about performance or resource limitation.

However, if your application is a success and thousands of users begin to integrate your API into their infrastructure and workflows, things can and will go wrong: Unexperienced developers will call your endpoint in endless loops, with incredibly high concurrency and badly configured cron jobs will request the same URL over and over again, thousands of times per hour.

This is why you should consider implementing a rate-limit early on.

### ANALYTICS

Keep track of the version/endpoints of your API being used by Consumers. This can be as simple as incrementing an integer in a database each time a request is made. There are many reasons that keeping track of API Analytics is a good idea, for example, the most commonly used API calls should be made efficient.

### Output

Use JSON

### Analytics
Keep track of the version/endpoints of your API being used by Consumers. This can be as simple as incrementing an integer in a database each time a request is made. There are many reasons that keeping track of API Analytics is a good idea, for example, the most commonly used API calls should be made efficient.

For the purposes of building an API which Third Party Developers will love, the most important thing is that when you do deprecate a version of your API, you can actually contact developers using deprecated API features. This is the perfect way to remind them to upgrade before you kill the old API version.

The process of Third Party Developer notification can be automated, e.g. mail the developer every time 10,000 requests to a deprecated feature are made.

Once you have your resources defined, you need to identify what actions verbs apply to them and how those map to your API.


#### Footnotes
[^best]: [best-practices-for-a-pragmatic-restful-api](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
[^]: [REST API Design - Resource Modeling](https://www.thoughtworks.com/insights/blog/rest-api-design-resource-modeling)
[^beautiful]: [Beautiful REST & JSON APIs](https://www.youtube.com/watch?v=mZ8_QgJ5mbs)
[^concepts]: [REST API concepts and examples](https://www.youtube.com/watch?v=7YcW25PHnAA)
[^wikipedia]: [Representational state transfer](https://en.wikipedia.org/wiki/Representational_state_transfer)
[^thoughts]: [Thoughts on RESTful API Design](https://restful-api-design.readthedocs.io/en/latest/)
[^wiki-api]: [Application programming interface](https://en.wikipedia.org/wiki/Application_programming_interface)
[^how-to]: [How to design a REST API](http://blog.octo.com/en/design-a-rest-api/)
[]: [](https://phraseapp.com/blog/posts/best-practice-10-design-tips-for-apis/)
[]: [](http://stackoverflow.com/questions/671118/what-exactly-is-restful-programming)