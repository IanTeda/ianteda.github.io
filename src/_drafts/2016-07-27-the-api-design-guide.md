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

### AIM

The aim of this design guide is to assist in the planing and development of my REST API boilerplate project.

### Overview

An API is an: Application Programming Interface. An interface for one piece of software to talk to another[^concepts]. For data to be shared. It is a set of routines — in case of the web, url endpoints — for building software to utilise those routines.

### History

REST Representational State Transfer[^beautiful], was defined by Roy Thomas Fielding in his 2000 PhD dissertation “Architectural Styles and the Design of Network-based Software Architectures”. Fielding developed the REST architectural style in parallel with HTTP 1.1 of 1996-1999, based on the existing design of HTTP 1.0[9] of 1996[^wikipedia].


REST:

- Scalability (change and different internet, not performance, internet scale)
- Generality (satisfy difference requirements and use cases)
- Independence (different languages, implementation)
- Latency (Caching)
- Security (HTTP authorisation header)
- Encapsulation (exposes data in a particular data, but not the working or resources)

### Definition

Here’s a few of the important terms I will use throughout the course of this document:

- Resource: A single instance of an object. For example, an animal.
- Collection: A collection of homogeneous objects. For example, animals.
- HTTP: A protocol for communicating over a network.
- Consumer: A client computer application capable of making HTTP requests.
- Third Party Developer: A developer not a part of your project but who wishes to consume your data.
- Server: An HTTP server/application accessible from a Consumer over a network.
- Endpoint: An API URL on a Server which represents either a Resource or an entire Collection.
- Idempotent: Side-effect free, can happen multiple times without penalty.
- URL Segment: A slash-separated piece of information in the URL.

## Goals
The big picture goals or how success will be defined, is if the project

- It should use web standards where they make sense
- It should be friendly to the developer and be explorable via a browser address bar
- It should be simple, intuitive and consistent to make adoption not only easy but pleasant
- It should provide enough flexibility to power majority of the Enchant UI
- It should be efficient, while maintaining balance with the other requirements[^best]
- It should be properly documented
- It should use Test Driven Development

### API ROOT URL
The root location of your API is important, believe it or not. When a developer (read as code archaeologist) inherits an old project using your API and needs to build new features, they may not know about your service at all. Perhaps all they know is a list of URLs which the Consumer calls out to. It’s important that the root entry point into your API is as simple as possible, as a long complex URL will appear daunting and can turn developers away.

Here are two common URL Roots:

https://example.org/api/v1/*
https://api.example.com/v1/*

## Endpoints

An Endpoint is a URL within your API which points to a specific Resource or a Collection of Resources.

End points are resources. That should be nouns, not verbs that make sense from the perspective of the API consumer aka developer. Although internal models may map neatly to resources, it isn't necessarily a one-to-one mapping. The key here is to not leak irrelevant implementation details out to your API. Some nouns would be ticket, user and group.

Once you have your resources defined, you need to identify what actions verbs apply to them and how those would map to your API.

End points should always be plural, be consistent. It avoids of pluralisation such as person/people.

Down case Uri and actions

Accept ids and names

Limit path nesting

Updates & creation should return a resource representation

Pretty print by default & ensure gzip is supported

Use snake_case

When posting return the representation

use Media Type: Content-Type: application/json

| Method | URI end point | Notes |
|--------|---------------|-------|
| GET    | /nouns        | This returns a list of the noun items. By default items in the list are a minimal representation of a noun entity |
| GET    | /nouns/{key}  | This returns the full content of the nouns identified by the given key |
| POST   | /nouns        | This creates a new ticket |
| PUT    | /nouns/{key}  | This updates noun identified by the given key |
| PATCH  | /nouns/{key}  | Partially update noun identified by the given key |
| DELTE  | /nouns/{key}  | Delete noun identified by the given key |

Response should provide href to the api path full qualified canonical reference

Reference Expansion (or materialised)
Expand to include additional information form a single requests
Use parameters to "expand"
Limit through "fields"



#### Versioning

The version number refers to a major release of the API as to a resource.

Versioning should be included in the url. An API is never going to be completely stable. Change is inevitable. What's important is how that change is managed.

`GET /v1/orders`

#### Endpoint stability

When a third-party software application integrates a government API, then it may become dependent on the continued availability of that API for the software to function correctly. The software package must also depend on the stability of the API so that changes can be planned to fit within a normal software product release cycle. 

#### Average Granularity

A common misconception is that there is a one-to-one mapping between a service in the paper world and a corresponding API. In reality, this is almost never the case. APIs should be designed at the lowest practical level of granularity because this makes each service simpler and allows them to be combined in ways that suit the consumer. The key principle is to design services that can be re-used and combined in different ways.

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

## Security

SSL everywhere, even corporate networks
Do not redirected non-SSL to the SSL endpoint, provide an error.

- Allows the use of web tokens, simplifying request. Else you would need to authenticate each request

Avoid sessions if possible. REST is stateless
Authenticate every request
Authorize based on resource content, not url
Use an existing protocol > Oauth 1.0a
Always use SSL
Never use custom Autho protocol
Use API Keys instead of Username/Passwords

401 "Unauthorized" really means unauthenticated. You need valid credentials for me to respond to this request
403 "Forbidden" really means Unauthorized. I understood your credentials, but sorry, you are not allowed

## Document

Curl examples with expected JSON output

We recommend always illustrating your API call documentation by cURL examples. Readers can simply cut-and-paste them, and they remove any ambiguity regarding call details.

Publish API documentation, and provide a link to the documentation from the API endpont.

## Entry Point
Provide a singleton entry point at the root of the API
Information on API version, supported features, etc.

- A list of top-level collections, the web is about links
- A list of singleton resources
- Any other information that the API designer deemed useful
    - small summary of operating status
    - statistics, etc.

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

## HTTP status codes

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

STATUS CODE RANGES
The 1xx range is reserved for low-level HTTP stuff, and you’ll very likely go your entire career without manually sending one of these status codes.

The 2xx range is reserved for successful messages where all goes as planned. Do your best to ensure your Server sends as many of these to the Consumer as possible.

The 3xx range is reserved for traffic redirection. Most APIs do not use these requests much (not nearly as often as the SEO folks use them ;), however, the newer Hypermedia style APIs will make more use of these.

The 4xx range is reserved for responding to errors made by the Consumer, e.g. they’re providing bad data or asking for things which don’t exist. These requests should be be idempotent, and not change the state of the server.

The 5xx range is reserved as a response when the Server makes a mistake. Often times, these errors are thrown by low-level functions even outside of the developers hands, to ensure a Consumer gets some sort of response. The Consumer can’t possibly know the state of the server when a 5xx response is received, and so these should be avoidable.

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

da

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