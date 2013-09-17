#meteor-typescript
TypeScript definitions for Meteor


##Overview and usage notes
This is a smart package for using TypeScript with Meteor.  It is a compilation of the type definitions and tests from 4 components.  Each is maintained separately and can be downloaded on [Definitely Typed](https://github.com/borisyankov/DefinitelyTyped/):
- [Meteor core](https://github.com/borisyankov/DefinitelyTyped/tree/master/meteor)
- [Handlebars](https://github.com/borisyankov/DefinitelyTyped/tree/master/handlebars)
- [Underscore](https://github.com/borisyankov/DefinitelyTyped/tree/master/underscore)
- [JQuery](https://github.com/borisyankov/DefinitelyTyped/tree/master/jquery)

These definitions should be enough to get started using TypeScript with any Meteor project.  Included are type definitions for the iron-router, errors, and paginated-subscription smart packages.  You will need to create type definitions for any other smart packages yourself.

In order to effectively write a Meteor app with TypeScript, you will probably need to:

- Reference the type definitions file (meteor_plus.d.ts)
- Create a Template definition file
- Create Collections within a module or modules


##Referencing Meteor type definitions in your app
- Add a reference to meteor.d.ts file to the top of any TypeScript file:

	`/// <reference path='../../packages/typescript/meteor_plus.d.ts'/>`


This will make these typed Meteor variables/objects available:

- Meteor
- Session
- Deps
- Accounts
- Match
- Computation
- Dependency
- EJSON
- HTTO
- Email
- Assets
- DPP
- Meteor.Router
- Meteor.Errors

*Please note that the Template variable will not yet be available.  You need to follow the instructions below to use the Template variable.*


##Defining Templates
In order to call `Template.yourTemplateName.method` in TypeScript, you will need to create a simple TypeScript definition file that declares a Template variable containing a list of template view-models/managers of type IMeteorViewModel (or IMeteorManager, which is the same as IMeteorViewModel).  A good place for this definition could be `<app root dir>/client/views/view-model-types.d.ts`.  Here is an example of that file:

	/// <reference path='../../packages/typescript/meteor_plus.d.ts'/>

	declare var Template: {
	  newPosts: IMeteorViewModel;
	  bestPosts: IMeteorViewModel;
	  postsList: IMeteorViewModel;
	  comment: IMeteorViewModel;
	  commentSubmit: IMeteorViewModel;
	  notifications: IMeteorViewModel;
	  postPage: IMeteorViewModel;
	  postEdit: IMeteorViewModel;
	  postItem: IMeteorViewModel;
	  postNew: IMeteorViewModel;
	  header: IMeteorViewModel;
	}

After you create this file, you may access the Template variable by declaring something similar to `/// <reference path='../view-model-types.d.ts'/>` at the top of any TypeScript file containing references to Template.  Something like `Template.postsList.helpers()` would then transpile successfully (and also have the benefits of typing).


##Defining Collections
In TypeScript, global variables are not allowed, and in a Meteor app, creating a local variable (using `var <varName>`) limits a variable's scope to the file.  However, you will probably want to define variables, such as collections, that can be used across multiple files.  In the case of collections, one way to work around these limitations is to wrap the definitions of all collections within a module, and then make the module globally accessible.  Here is an example (collections/models.ts):

	module Models {
	  export var Posts = new Meteor.Collection('posts');
	  export var Comments = new Meteor.Collection('comments');
	  export var Notifications = new Meteor.Collection('notifications');
	}

	this.Models = Models;

You can then access the Posts collection by placing something similar to `/// <reference path='../../../collections/models.ts'/>` at the top of a TypeScript file.  The code within the file would look something like this:

	Models.Posts.findOne(Session.get('currentPostId'));

For organizational purposes, any additional code related to each Collection can be placed in a separate file per each collection.  Alternatively, you could wrap each collection in its own module (e.g. PostsModel for posts, CommentsModel for comments).


##Reference app
Listed below is a simple Meteor reference application created with TypeScript is listed below.  It is based on the Microscope reference app in [Discover Meteor](http://www.discovermeteor.com/ "http://www.discovermeteor.com/").

- Sample Site:  <http://microscopic-typescript.meteor.com/>
- Code (TypeScript and transpiled JS):  <https://github.com/fullflavedave/MicroscopicTypeScript>

##Testing the smart package
You can test the type definitions by transpiling meteor_plus_tests.ts from the command line:

	$ tsc meteor_plus_tests.ts

If the file `meteor_plus_tests.js` is successfully created without errors, then the test is successful.