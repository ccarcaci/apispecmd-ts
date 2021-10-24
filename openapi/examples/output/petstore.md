# Swagger Petstore (1.0.0)

This is a sample server Petstore server.
You can find out more about Swagger at
[http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).
For this sample, you can use the api key `special-key` to test the authorization filters.

# Introduction

This API is documented in **OpenAPI format** and is based on
[Petstore sample](http://petstore.swagger.io/) provided by [swagger.io](http://swagger.io) team.
It was **extended** to illustrate features of [generator-openapi-repo](https://github.com/Rebilly/generator-openapi-repo)
tool and [ReDoc](https://github.com/Redocly/redoc) documentation. In addition to standard
OpenAPI syntax we use a few [vendor extensions](https://github.com/Redocly/redoc/blob/master/docs/redoc-vendor-extensions.md).

# OpenAPI Specification

This API is documented in **OpenAPI format** and is based on
[Petstore sample](http://petstore.swagger.io/) provided by [swagger.io](http://swagger.io) team.
It was **extended** to illustrate features of [generator-openapi-repo](https://github.com/Rebilly/generator-openapi-repo)
tool and [ReDoc](https://github.com/Redocly/redoc) documentation. In addition to standard
OpenAPI syntax we use a few [vendor extensions](https://github.com/Redocly/redoc/blob/master/docs/redoc-vendor-extensions.md).

# Cross-Origin Resource Sharing

This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).
And that allows cross-domain communication from the browser.
All responses have a wildcard same-origin which makes them completely public and accessible to everyone, including any code on any site.

# Authentication

Petstore offers two forms of authentication:
 - API Key
 - OAuth2
OAuth2 - an open protocol to allow secure authorization in a simple
and standard method from web, mobile and desktop applications.

<SecurityDefinitions />

# Servers

- Default server | [//petstore.swagger.io/v2](//petstore.swagger.io/v2)

- Sandbox server | [//petstore.swagger.io/sandbox](//petstore.swagger.io/sandbox)

API Support: API Support [apiteam@swagger.io](apiteam@swagger.io) [https://github.com/Redocly/redoc](https://github.com/Redocly/redoc) | 

License: [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

[Terms of Service](https://smartbear.com/terms-of-use/)

# [PUT] /pet (updatePet)

Pet call summary

Your pets will be happy

## Tags

- pet: Everything about your Pets

## petstore_auth security (oauth2)

### Implicit Flow

* authorization: [http://petstore.swagger.io/api/oauth/dialog](http://petstore.swagger.io/api/oauth/dialog)

Scopes:

* write:pets: modify pets in your account
* read:pets: read your pets

## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|Accept-Language|string|header|no|no|no|no|
|cookieParam|integer|cookie|yes|no|no|no|

**Parameters Descriptions**

* Accept-Language: The language you prefer for messages. Supported values are en-AU, en-CA, en-GB, en-US
* cookieParam: Some cookie


## Request Body (required)
Pet object that needs to be added to the store

### all of the tables below (application/json)

#### aggregate all of

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|category|false||||||||||||||||
|name|true|string|||||||||||||||
|photoUrls|true|array of strings||||||||20|||||||
|friend|false||||||||||||||||
|tags|false|array of objects (See related table)|||||||1||||||||
|status|false|string|||||||||||||||
|petType|false|string|||||||||||||||

**Enums**

* status: ["available","pending","sold"]

#### aggregate all of -> tags array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|name|false|string|||||||1||||||||

### (application/xml)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|name|false|string|||||||||||||||
## Responses

### 400 (Invalid ID supplied)

### 404 (Pet not found)

### 405 (Validation exception)


# [POST] /pet (addPet)

Pet call summary

Your pets will be happy

## Tags

- pet: Everything about your Pets

## petstore_auth security (oauth2)

### Implicit Flow

* authorization: [http://petstore.swagger.io/api/oauth/dialog](http://petstore.swagger.io/api/oauth/dialog)

Scopes:

* write:pets: modify pets in your account
* read:pets: read your pets

## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|Accept-Language|string|header|no|no|no|no|
|cookieParam|integer|cookie|yes|no|no|no|

**Parameters Descriptions**

* Accept-Language: The language you prefer for messages. Supported values are en-AU, en-CA, en-GB, en-US
* cookieParam: Some cookie


## Request Body (required)
Pet object that needs to be added to the store

### all of the tables below (application/json)

#### aggregate all of

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|category|false||||||||||||||||
|name|true|string|||||||||||||||
|photoUrls|true|array of strings||||||||20|||||||
|friend|false||||||||||||||||
|tags|false|array of objects (See related table)|||||||1||||||||
|status|false|string|||||||||||||||
|petType|false|string|||||||||||||||

**Enums**

* status: ["available","pending","sold"]

#### aggregate all of -> tags array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|name|false|string|||||||1||||||||

### (application/xml)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|name|false|string|||||||||||||||
## Responses

### 405 (Invalid input)


# [GET] /pet/{petId} (getPetById)

## Tags

- pet: Everything about your Pets

## api_key security (apiKey)

For this sample, you can use the api key `special-key` to test the authorization filters.

header param: api_key

## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|petId|integer|path|yes|yes|no|no|

**Parameters Descriptions**

* petId: ID of pet to return


## Responses

### 200 (successful operation)

### (application/json)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|category|false||||||||||||||||
|name|true|string|||||||||||||||
|photoUrls|true|array of strings||||||||20|||||||
|friend|false||||||||||||||||
|tags|false|array of objects (See related table)|||||||1||||||||
|status|false|string|||||||||||||||
|petType|false|string|||||||||||||||

**Enums**

* status: ["available","pending","sold"]

#### Properties -> tags array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|name|false|string|||||||1||||||||

### (application/xml)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|category|false||||||||||||||||
|name|true|string|||||||||||||||
|photoUrls|true|array of strings||||||||20|||||||
|friend|false||||||||||||||||
|tags|false|array of objects (See related table)|||||||1||||||||
|status|false|string|||||||||||||||
|petType|false|string|||||||||||||||

**Enums**

* status: ["available","pending","sold"]

#### Properties -> tags array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|name|false|string|||||||1||||||||

### 400 (Invalid ID supplied)

### 404 (Pet not found)


# [POST] /pet/{petId} (updatePetWithForm)

## Tags

- pet: Everything about your Pets

## petstore_auth security (oauth2)

### Implicit Flow

* authorization: [http://petstore.swagger.io/api/oauth/dialog](http://petstore.swagger.io/api/oauth/dialog)

Scopes:

* write:pets: modify pets in your account
* read:pets: read your pets

## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|petId|integer|path|yes|no|no|no|

**Parameters Descriptions**

* petId: ID of pet that needs to be updated


## Request Body (not required)

### (application/x-www-form-urlencoded)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|name|false|string|||||||||||||||
|status|false|string|||||||||||||||
## Responses

### 405 (Invalid input)


# [DELETE] /pet/{petId} (deletePet)

## Tags

- pet: Everything about your Pets

## petstore_auth security (oauth2)

### Implicit Flow

* authorization: [http://petstore.swagger.io/api/oauth/dialog](http://petstore.swagger.io/api/oauth/dialog)

Scopes:

* write:pets: modify pets in your account
* read:pets: read your pets

## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|api_key|string|header|no|no|no|no|
|petId|integer|path|yes|no|no|no|

**Parameters Descriptions**

* api_key: No description provided
* petId: Pet id to delete


## Responses

### 400 (Invalid pet value)


# [POST] /pet/{petId}/uploadImage (uploadFile)

## Tags

- pet: Everything about your Pets

## petstore_auth security (oauth2)

### Implicit Flow

* authorization: [http://petstore.swagger.io/api/oauth/dialog](http://petstore.swagger.io/api/oauth/dialog)

Scopes:

* write:pets: modify pets in your account
* read:pets: read your pets

## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|petId|integer|path|yes|no|no|no|

**Parameters Descriptions**

* petId: ID of pet to update


## Request Body (not required)

### (application/octet-stream)

#### Content

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|content|false|string|binary||||||||||||||
## Responses

### 200 (successful operation)

### (application/json)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|code|false|integer|int32||||||||||||||
|type|false|string|||||||||||||||
|message|false|string|||||||||||||||


# [GET] /pet/findByStatus (findPetsByStatus)

## Tags

- pet: Everything about your Pets

## petstore_auth security (oauth2)

### Implicit Flow

* authorization: [http://petstore.swagger.io/api/oauth/dialog](http://petstore.swagger.io/api/oauth/dialog)

Scopes:

* write:pets: modify pets in your account
* read:pets: read your pets

## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|status|array|query|yes|no|no|no|

**Parameters Descriptions**

* status: Status values that need to be considered for filter


## Responses

### 200 (successful operation)

### (application/json)

#### Content

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|content|false|array of objects (See related table)|||||||||||||||

#### Content -> content array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|category|false||||||||||||||||
|name|true|string|||||||||||||||
|photoUrls|true|array of strings||||||||20|||||||
|friend|false||||||||||||||||
|tags|false|array of objects (See related table)|||||||1||||||||
|status|false|string|||||||||||||||
|petType|false|string|||||||||||||||

**Enums**

* status: ["available","pending","sold"]

#### Content -> content array -> tags array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|name|false|string|||||||1||||||||

### (application/xml)

#### Content

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|content|false|array of objects (See related table)|||||||||||||||

#### Content -> content array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|category|false||||||||||||||||
|name|true|string|||||||||||||||
|photoUrls|true|array of strings||||||||20|||||||
|friend|false||||||||||||||||
|tags|false|array of objects (See related table)|||||||1||||||||
|status|false|string|||||||||||||||
|petType|false|string|||||||||||||||

**Enums**

* status: ["available","pending","sold"]

#### Content -> content array -> tags array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|name|false|string|||||||1||||||||

### 400 (Invalid status value)


# [GET] /pet/findByTags (findPetsByTags)

## Tags

- pet: Everything about your Pets

## petstore_auth security (oauth2)

### Implicit Flow

* authorization: [http://petstore.swagger.io/api/oauth/dialog](http://petstore.swagger.io/api/oauth/dialog)

Scopes:

* write:pets: modify pets in your account
* read:pets: read your pets

## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|tags|array|query|yes|no|no|no|

**Parameters Descriptions**

* tags: Tags to filter by


## Responses

### 200 (successful operation)

### (application/json)

#### Content

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|content|false|array of objects (See related table)|||||||||||||||

#### Content -> content array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|category|false||||||||||||||||
|name|true|string|||||||||||||||
|photoUrls|true|array of strings||||||||20|||||||
|friend|false||||||||||||||||
|tags|false|array of objects (See related table)|||||||1||||||||
|status|false|string|||||||||||||||
|petType|false|string|||||||||||||||

**Enums**

* status: ["available","pending","sold"]

#### Content -> content array -> tags array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|name|false|string|||||||1||||||||

### (application/xml)

#### Content

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|content|false|array of objects (See related table)|||||||||||||||

#### Content -> content array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|category|false||||||||||||||||
|name|true|string|||||||||||||||
|photoUrls|true|array of strings||||||||20|||||||
|friend|false||||||||||||||||
|tags|false|array of objects (See related table)|||||||1||||||||
|status|false|string|||||||||||||||
|petType|false|string|||||||||||||||

**Enums**

* status: ["available","pending","sold"]

#### Content -> content array -> tags array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|name|false|string|||||||1||||||||

### 400 (Invalid tag value)


# [GET] /store/inventory (getInventory)

## Tags

- store: Access to Petstore orders

## api_key security (apiKey)

For this sample, you can use the api key `special-key` to test the authorization filters.

header param: api_key



## Responses

### 200 (successful operation)

### (application/json)

#### Content

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|content|false|object (See related table)|||||||||||||||


# [POST] /store/order (placeOrder)

## Tags

- store: Access to Petstore orders





## Request Body (required)
order placed for purchasing the pet

### (application/json)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|petId|false||||||||||||||||
|quantity|false|integer|int32|1|1||||||||||||
|shipDate|false|string|date-time||||||||||||||
|status|false|string|||||||||||||||
|complete|false|boolean||false||||||||||true|||
|requestId|false|string|||||||||||||true||

**Enums**

* status: ["placed","approved","delivered"]
## Responses

### 200 (successful operation)

### (application/json)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|petId|false||||||||||||||||
|quantity|false|integer|int32|1|1||||||||||||
|shipDate|false|string|date-time||||||||||||||
|status|false|string|||||||||||||||
|complete|false|boolean||false||||||||||true|||
|requestId|false|string|||||||||||||true||

**Enums**

* status: ["placed","approved","delivered"]

### (application/xml)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|petId|false||||||||||||||||
|quantity|false|integer|int32|1|1||||||||||||
|shipDate|false|string|date-time||||||||||||||
|status|false|string|||||||||||||||
|complete|false|boolean||false||||||||||true|||
|requestId|false|string|||||||||||||true||

**Enums**

* status: ["placed","approved","delivered"]

### 400 (Invalid Order)


# [GET] /store/order/{orderId} (getOrderById)

## Tags

- store: Access to Petstore orders



## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|orderId|integer|path|yes|no|no|no|

**Parameters Descriptions**

* orderId: ID of pet that needs to be fetched


## Responses

### 200 (successful operation)

### (application/json)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|petId|false||||||||||||||||
|quantity|false|integer|int32|1|1||||||||||||
|shipDate|false|string|date-time||||||||||||||
|status|false|string|||||||||||||||
|complete|false|boolean||false||||||||||true|||
|requestId|false|string|||||||||||||true||

**Enums**

* status: ["placed","approved","delivered"]

### (application/xml)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false||||||||||||||||
|petId|false||||||||||||||||
|quantity|false|integer|int32|1|1||||||||||||
|shipDate|false|string|date-time||||||||||||||
|status|false|string|||||||||||||||
|complete|false|boolean||false||||||||||true|||
|requestId|false|string|||||||||||||true||

**Enums**

* status: ["placed","approved","delivered"]

### 400 (Invalid ID supplied)

### 404 (Order not found)


# [DELETE] /store/order/{orderId} (deleteOrder)

## Tags

- store: Access to Petstore orders



## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|orderId|string|path|yes|no|no|no|

**Parameters Descriptions**

* orderId: ID of the order that needs to be deleted


## Responses

### 400 (Invalid ID supplied)

### 404 (Order not found)


# [POST] /user (createUser)

## Tags

- user: Operations about user





## Request Body (required)
Created user object

### (application/json)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false|integer|int64|||||||||||true|||
|pet|false||||||||||||||||
|username|false|string|||||||4||||||||
|firstName|false|string|||||||1||||||||
|lastName|false|string|||||||1||||||||
|email|false|string|email||||||||||||||
|password|false|string|password||||||8|||/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/|||||
|phone|false|string||||||||||/^\+(?:[0-9]-?){6,14}[0-9]$/|||||
|userStatus|false|integer|int32||||||||||||||
## Responses

### default (successful operation)


# [GET] /user/{username} (getUserByName)

## Tags

- user: Operations about user



## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|username|string|path|yes|no|no|no|

**Parameters Descriptions**

* username: The name that needs to be fetched. Use user1 for testing. 


## Responses

### 200 (successful operation)

### (application/json)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false|integer|int64|||||||||||true|||
|pet|false||||||||||||||||
|username|false|string|||||||4||||||||
|firstName|false|string|||||||1||||||||
|lastName|false|string|||||||1||||||||
|email|false|string|email||||||||||||||
|password|false|string|password||||||8|||/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/|||||
|phone|false|string||||||||||/^\+(?:[0-9]-?){6,14}[0-9]$/|||||
|userStatus|false|integer|int32||||||||||||||

### (application/xml)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false|integer|int64|||||||||||true|||
|pet|false||||||||||||||||
|username|false|string|||||||4||||||||
|firstName|false|string|||||||1||||||||
|lastName|false|string|||||||1||||||||
|email|false|string|email||||||||||||||
|password|false|string|password||||||8|||/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/|||||
|phone|false|string||||||||||/^\+(?:[0-9]-?){6,14}[0-9]$/|||||
|userStatus|false|integer|int32||||||||||||||

### 400 (Invalid username supplied)

### 404 (User not found)


# [PUT] /user/{username} (updateUser)

## Tags

- user: Operations about user



## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|username|string|path|yes|no|no|no|

**Parameters Descriptions**

* username: name that need to be deleted


## Request Body (required)
Updated user object

### (application/json)

#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false|integer|int64|||||||||||true|||
|pet|false||||||||||||||||
|username|false|string|||||||4||||||||
|firstName|false|string|||||||1||||||||
|lastName|false|string|||||||1||||||||
|email|false|string|email||||||||||||||
|password|false|string|password||||||8|||/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/|||||
|phone|false|string||||||||||/^\+(?:[0-9]-?){6,14}[0-9]$/|||||
|userStatus|false|integer|int32||||||||||||||
## Responses

### 400 (Invalid user supplied)

### 404 (User not found)


# [DELETE] /user/{username} (deleteUser)

## Tags

- user: Operations about user



## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|username|string|path|yes|no|no|no|

**Parameters Descriptions**

* username: The name that needs to be deleted


## Responses

### 400 (Invalid username supplied)

### 404 (User not found)


# [POST] /user/createWithArray (createUsersWithArrayInput)

## Tags

- user: Operations about user





## Request Body (required)
List of user object

### (application/json)

#### Content

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|content|false|array of objects (See related table)|||||||||||||||

#### Content -> content array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false|integer|int64|||||||||||true|||
|pet|false||||||||||||||||
|username|false|string|||||||4||||||||
|firstName|false|string|||||||1||||||||
|lastName|false|string|||||||1||||||||
|email|false|string|email||||||||||||||
|password|false|string|password||||||8|||/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/|||||
|phone|false|string||||||||||/^\+(?:[0-9]-?){6,14}[0-9]$/|||||
|userStatus|false|integer|int32||||||||||||||
## Responses

### default (successful operation)


# [POST] /user/createWithList (createUsersWithListInput)

## Tags

- user: Operations about user





## Request Body (required)
List of user object

### (application/json)

#### Content

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|content|false|array of objects (See related table)|||||||||||||||

#### Content -> content array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|id|false|integer|int64|||||||||||true|||
|pet|false||||||||||||||||
|username|false|string|||||||4||||||||
|firstName|false|string|||||||1||||||||
|lastName|false|string|||||||1||||||||
|email|false|string|email||||||||||||||
|password|false|string|password||||||8|||/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/|||||
|phone|false|string||||||||||/^\+(?:[0-9]-?){6,14}[0-9]$/|||||
|userStatus|false|integer|int32||||||||||||||
## Responses

### default (successful operation)


# [GET] /user/login (loginUser)

## Tags

- user: Operations about user



## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|username|string|query|yes|no|no|no|
|password|string|query|yes|no|no|no|

**Parameters Descriptions**

* username: The user name for login
* password: The password for login in clear text


## Responses

### 200 (successful operation)

### (application/json)

#### Content

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|content|false|string|||||||||||||||

### (application/xml)

#### Content

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|content|false|string|||||||||||||||

### 400 (Invalid username/password supplied)


# [GET] /user/logout (logoutUser)

## Tags

- user: Operations about user





## Responses

### default (successful operation)


