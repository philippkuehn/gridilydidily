/*

$win.on('resize', debounce(function() {
	console.log('debounce');
}, 100));

*/

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
/*

try {
  // stuff
} catch (err) {
  dumpError(err);
}

*/

function dumpError(err) {
	if (typeof err === 'object') {
		if (err.message) {
			console.log('\nMessage: ' + err.message)
		}
		if (err.stack) {
			console.log('\nStacktrace:')
			console.log('====================')
			console.log(err.stack);
		}
	} else {
		console.log('dumpError :: argument is not an object');
	}
}
/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */

(function( global, factory ) {

  if ( typeof module === "object" && typeof module.exports === "object" ) {
    // For CommonJS and CommonJS-like environments where a proper window is present,
    // execute the factory and get jQuery
    // For environments that do not inherently posses a window with a document
    // (such as Node.js), expose a jQuery-making factory as module.exports
    // This accentuates the need for the creation of a real window
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info
    module.exports = global.document ?
      factory( global, true ) :
      function( w ) {
        if ( !w.document ) {
          throw new Error( "jQuery requires a window with a document" );
        }
        return factory( w );
      };
  } else {
    factory( global );
  }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
  version = "1.11.3",

  // Define a local copy of jQuery
  jQuery = function( selector, context ) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init( selector, context );
  },

  // Support: Android<4.1, IE<9
  // Make sure we trim BOM and NBSP
  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

  // Matches dashed string for camelizing
  rmsPrefix = /^-ms-/,
  rdashAlpha = /-([\da-z])/gi,

  // Used by jQuery.camelCase as callback to replace()
  fcamelCase = function( all, letter ) {
    return letter.toUpperCase();
  };

jQuery.fn = jQuery.prototype = {
  // The current version of jQuery being used
  jquery: version,

  constructor: jQuery,

  // Start with an empty selector
  selector: "",

  // The default length of a jQuery object is 0
  length: 0,

  toArray: function() {
    return slice.call( this );
  },

  // Get the Nth element in the matched element set OR
  // Get the whole matched element set as a clean array
  get: function( num ) {
    return num != null ?

      // Return just the one element from the set
      ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

      // Return all the elements in a clean array
      slice.call( this );
  },

  // Take an array of elements and push it onto the stack
  // (returning the new matched element set)
  pushStack: function( elems ) {

    // Build a new jQuery matched element set
    var ret = jQuery.merge( this.constructor(), elems );

    // Add the old object onto the stack (as a reference)
    ret.prevObject = this;
    ret.context = this.context;

    // Return the newly-formed element set
    return ret;
  },

  // Execute a callback for every element in the matched set.
  // (You can seed the arguments with an array of args, but this is
  // only used internally.)
  each: function( callback, args ) {
    return jQuery.each( this, callback, args );
  },

  map: function( callback ) {
    return this.pushStack( jQuery.map(this, function( elem, i ) {
      return callback.call( elem, i, elem );
    }));
  },

  slice: function() {
    return this.pushStack( slice.apply( this, arguments ) );
  },

  first: function() {
    return this.eq( 0 );
  },

  last: function() {
    return this.eq( -1 );
  },

  eq: function( i ) {
    var len = this.length,
      j = +i + ( i < 0 ? len : 0 );
    return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
  },

  end: function() {
    return this.prevObject || this.constructor(null);
  },

  // For internal use only.
  // Behaves like an Array's method, not like a jQuery method.
  push: push,
  sort: deletedIds.sort,
  splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
  var src, copyIsArray, copy, name, options, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;

    // skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
    target = {};
  }

  // extend jQuery itself if only one argument is passed
  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && jQuery.isArray(src) ? src : [];

          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy );

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

jQuery.extend({
  // Unique for each copy of jQuery on the page
  expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

  // Assume jQuery is ready without the ready module
  isReady: true,

  error: function( msg ) {
    throw new Error( msg );
  },

  noop: function() {},

  // See test/unit/core.js for details concerning isFunction.
  // Since version 1.3, DOM methods and functions like alert
  // aren't supported. They return false on IE (#2968).
  isFunction: function( obj ) {
    return jQuery.type(obj) === "function";
  },

  isArray: Array.isArray || function( obj ) {
    return jQuery.type(obj) === "array";
  },

  isWindow: function( obj ) {
    /* jshint eqeqeq: false */
    return obj != null && obj == obj.window;
  },

  isNumeric: function( obj ) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
  },

  isEmptyObject: function( obj ) {
    var name;
    for ( name in obj ) {
      return false;
    }
    return true;
  },

  isPlainObject: function( obj ) {
    var key;

    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
      return false;
    }

    try {
      // Not own constructor property must be Object
      if ( obj.constructor &&
        !hasOwn.call(obj, "constructor") &&
        !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
        return false;
      }
    } catch ( e ) {
      // IE8,9 Will throw exceptions on certain host objects #9897
      return false;
    }

    // Support: IE<9
    // Handle iteration over inherited properties before own properties.
    if ( support.ownLast ) {
      for ( key in obj ) {
        return hasOwn.call( obj, key );
      }
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    for ( key in obj ) {}

    return key === undefined || hasOwn.call( obj, key );
  },

  type: function( obj ) {
    if ( obj == null ) {
      return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[ toString.call(obj) ] || "object" :
      typeof obj;
  },

  // Evaluates a script in a global context
  // Workarounds based on findings by Jim Driscoll
  // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
  globalEval: function( data ) {
    if ( data && jQuery.trim( data ) ) {
      // We use execScript on Internet Explorer
      // We use an anonymous function so that context is window
      // rather than jQuery in Firefox
      ( window.execScript || function( data ) {
        window[ "eval" ].call( window, data );
      } )( data );
    }
  },

  // Convert dashed to camelCase; used by the css and data modules
  // Microsoft forgot to hump their vendor prefix (#9572)
  camelCase: function( string ) {
    return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
  },

  nodeName: function( elem, name ) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  },

  // args is for internal usage only
  each: function( obj, callback, args ) {
    var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike( obj );

    if ( args ) {
      if ( isArray ) {
        for ( ; i < length; i++ ) {
          value = callback.apply( obj[ i ], args );

          if ( value === false ) {
            break;
          }
        }
      } else {
        for ( i in obj ) {
          value = callback.apply( obj[ i ], args );

          if ( value === false ) {
            break;
          }
        }
      }

    // A special, fast, case for the most common use of each
    } else {
      if ( isArray ) {
        for ( ; i < length; i++ ) {
          value = callback.call( obj[ i ], i, obj[ i ] );

          if ( value === false ) {
            break;
          }
        }
      } else {
        for ( i in obj ) {
          value = callback.call( obj[ i ], i, obj[ i ] );

          if ( value === false ) {
            break;
          }
        }
      }
    }

    return obj;
  },

  // Support: Android<4.1, IE<9
  trim: function( text ) {
    return text == null ?
      "" :
      ( text + "" ).replace( rtrim, "" );
  },

  // results is for internal usage only
  makeArray: function( arr, results ) {
    var ret = results || [];

    if ( arr != null ) {
      if ( isArraylike( Object(arr) ) ) {
        jQuery.merge( ret,
          typeof arr === "string" ?
          [ arr ] : arr
        );
      } else {
        push.call( ret, arr );
      }
    }

    return ret;
  },

  inArray: function( elem, arr, i ) {
    var len;

    if ( arr ) {
      if ( indexOf ) {
        return indexOf.call( arr, elem, i );
      }

      len = arr.length;
      i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

      for ( ; i < len; i++ ) {
        // Skip accessing in sparse arrays
        if ( i in arr && arr[ i ] === elem ) {
          return i;
        }
      }
    }

    return -1;
  },

  merge: function( first, second ) {
    var len = +second.length,
      j = 0,
      i = first.length;

    while ( j < len ) {
      first[ i++ ] = second[ j++ ];
    }

    // Support: IE<9
    // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
    if ( len !== len ) {
      while ( second[j] !== undefined ) {
        first[ i++ ] = second[ j++ ];
      }
    }

    first.length = i;

    return first;
  },

  grep: function( elems, callback, invert ) {
    var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert;

    // Go through the array, only saving the items
    // that pass the validator function
    for ( ; i < length; i++ ) {
      callbackInverse = !callback( elems[ i ], i );
      if ( callbackInverse !== callbackExpect ) {
        matches.push( elems[ i ] );
      }
    }

    return matches;
  },

  // arg is for internal usage only
  map: function( elems, callback, arg ) {
    var value,
      i = 0,
      length = elems.length,
      isArray = isArraylike( elems ),
      ret = [];

    // Go through the array, translating each of the items to their new values
    if ( isArray ) {
      for ( ; i < length; i++ ) {
        value = callback( elems[ i ], i, arg );

        if ( value != null ) {
          ret.push( value );
        }
      }

    // Go through every key on the object,
    } else {
      for ( i in elems ) {
        value = callback( elems[ i ], i, arg );

        if ( value != null ) {
          ret.push( value );
        }
      }
    }

    // Flatten any nested arrays
    return concat.apply( [], ret );
  },

  // A global GUID counter for objects
  guid: 1,

  // Bind a function to a context, optionally partially applying any
  // arguments.
  proxy: function( fn, context ) {
    var args, proxy, tmp;

    if ( typeof context === "string" ) {
      tmp = fn[ context ];
      context = fn;
      fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if ( !jQuery.isFunction( fn ) ) {
      return undefined;
    }

    // Simulated bind
    args = slice.call( arguments, 2 );
    proxy = function() {
      return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
    };

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    return proxy;
  },

  now: function() {
    return +( new Date() );
  },

  // jQuery.support is not used in Core but other projects attach their
  // properties to it so it needs to exist.
  support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
  class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

  // Support: iOS 8.2 (not reproducible in simulator)
  // `in` check used to prevent JIT error (gh-2145)
  // hasOwn isn't used here due to false negatives
  // regarding Nodelist length in IE
  var length = "length" in obj && obj.length,
    type = jQuery.type( obj );

  if ( type === "function" || jQuery.isWindow( obj ) ) {
    return false;
  }

  if ( obj.nodeType === 1 && length ) {
    return true;
  }

  return type === "array" || length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
  support,
  Expr,
  getText,
  isXML,
  tokenize,
  compile,
  select,
  outermostContext,
  sortInput,
  hasDuplicate,

  // Local document vars
  setDocument,
  document,
  docElem,
  documentIsHTML,
  rbuggyQSA,
  rbuggyMatches,
  matches,
  contains,

  // Instance-specific data
  expando = "sizzle" + 1 * new Date(),
  preferredDoc = window.document,
  dirruns = 0,
  done = 0,
  classCache = createCache(),
  tokenCache = createCache(),
  compilerCache = createCache(),
  sortOrder = function( a, b ) {
    if ( a === b ) {
      hasDuplicate = true;
    }
    return 0;
  },

  // General-purpose constants
  MAX_NEGATIVE = 1 << 31,

  // Instance methods
  hasOwn = ({}).hasOwnProperty,
  arr = [],
  pop = arr.pop,
  push_native = arr.push,
  push = arr.push,
  slice = arr.slice,
  // Use a stripped-down indexOf as it's faster than native
  // http://jsperf.com/thor-indexof-vs-for/5
  indexOf = function( list, elem ) {
    var i = 0,
      len = list.length;
    for ( ; i < len; i++ ) {
      if ( list[i] === elem ) {
        return i;
      }
    }
    return -1;
  },

  booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

  // Regular expressions

  // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
  whitespace = "[\\x20\\t\\r\\n\\f]",
  // http://www.w3.org/TR/css3-syntax/#characters
  characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

  // Loosely modeled on CSS identifier characters
  // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
  // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
  identifier = characterEncoding.replace( "w", "w#" ),

  // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
  attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
    // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace +
    // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
    "*\\]",

  pseudos = ":(" + characterEncoding + ")(?:\\((" +
    // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
    // 1. quoted (capture 3; capture 4 or capture 5)
    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
    // 2. simple (capture 6)
    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
    // 3. anything else (capture 2)
    ".*" +
    ")\\)|)",

  // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
  rwhitespace = new RegExp( whitespace + "+", "g" ),
  rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

  rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
  rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

  rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

  rpseudo = new RegExp( pseudos ),
  ridentifier = new RegExp( "^" + identifier + "$" ),

  matchExpr = {
    "ID": new RegExp( "^#(" + characterEncoding + ")" ),
    "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
    "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
    "ATTR": new RegExp( "^" + attributes ),
    "PSEUDO": new RegExp( "^" + pseudos ),
    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
      "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
      "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
    // For use in libraries implementing .is()
    // We use this for POS matching in `select`
    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
      whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
  },

  rinputs = /^(?:input|select|textarea|button)$/i,
  rheader = /^h\d$/i,

  rnative = /^[^{]+\{\s*\[native \w/,

  // Easily-parseable/retrievable ID or TAG or CLASS selectors
  rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

  rsibling = /[+~]/,
  rescape = /'|\\/g,

  // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
  runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
  funescape = function( _, escaped, escapedWhitespace ) {
    var high = "0x" + escaped - 0x10000;
    // NaN means non-codepoint
    // Support: Firefox<24
    // Workaround erroneous numeric interpretation of +"0x"
    return high !== high || escapedWhitespace ?
      escaped :
      high < 0 ?
        // BMP codepoint
        String.fromCharCode( high + 0x10000 ) :
        // Supplemental Plane codepoint (surrogate pair)
        String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
  },

  // Used for iframes
  // See setDocument()
  // Removing the function wrapper causes a "Permission Denied"
  // error in IE
  unloadHandler = function() {
    setDocument();
  };

// Optimize for push.apply( _, NodeList )
try {
  push.apply(
    (arr = slice.call( preferredDoc.childNodes )),
    preferredDoc.childNodes
  );
  // Support: Android<4.0
  // Detect silently failing push.apply
  arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
  push = { apply: arr.length ?

    // Leverage slice if possible
    function( target, els ) {
      push_native.apply( target, slice.call(els) );
    } :

    // Support: IE<9
    // Otherwise append directly
    function( target, els ) {
      var j = target.length,
        i = 0;
      // Can't trust NodeList.length
      while ( (target[j++] = els[i++]) ) {}
      target.length = j - 1;
    }
  };
}

function Sizzle( selector, context, results, seed ) {
  var match, elem, m, nodeType,
    // QSA vars
    i, groups, old, nid, newContext, newSelector;

  if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
    setDocument( context );
  }

  context = context || document;
  results = results || [];
  nodeType = context.nodeType;

  if ( typeof selector !== "string" || !selector ||
    nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

    return results;
  }

  if ( !seed && documentIsHTML ) {

    // Try to shortcut find operations when possible (e.g., not under DocumentFragment)
    if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
      // Speed-up: Sizzle("#ID")
      if ( (m = match[1]) ) {
        if ( nodeType === 9 ) {
          elem = context.getElementById( m );
          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document (jQuery #6963)
          if ( elem && elem.parentNode ) {
            // Handle the case where IE, Opera, and Webkit return items
            // by name instead of ID
            if ( elem.id === m ) {
              results.push( elem );
              return results;
            }
          } else {
            return results;
          }
        } else {
          // Context is not a document
          if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
            contains( context, elem ) && elem.id === m ) {
            results.push( elem );
            return results;
          }
        }

      // Speed-up: Sizzle("TAG")
      } else if ( match[2] ) {
        push.apply( results, context.getElementsByTagName( selector ) );
        return results;

      // Speed-up: Sizzle(".CLASS")
      } else if ( (m = match[3]) && support.getElementsByClassName ) {
        push.apply( results, context.getElementsByClassName( m ) );
        return results;
      }
    }

    // QSA path
    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
      nid = old = expando;
      newContext = context;
      newSelector = nodeType !== 1 && selector;

      // qSA works strangely on Element-rooted queries
      // We can work around this by specifying an extra ID on the root
      // and working up from there (Thanks to Andrew Dupont for the technique)
      // IE 8 doesn't work on object elements
      if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
        groups = tokenize( selector );

        if ( (old = context.getAttribute("id")) ) {
          nid = old.replace( rescape, "\\$&" );
        } else {
          context.setAttribute( "id", nid );
        }
        nid = "[id='" + nid + "'] ";

        i = groups.length;
        while ( i-- ) {
          groups[i] = nid + toSelector( groups[i] );
        }
        newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
        newSelector = groups.join(",");
      }

      if ( newSelector ) {
        try {
          push.apply( results,
            newContext.querySelectorAll( newSelector )
          );
          return results;
        } catch(qsaError) {
        } finally {
          if ( !old ) {
            context.removeAttribute("id");
          }
        }
      }
    }
  }

  // All others
  return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *  deleting the oldest entry
 */
function createCache() {
  var keys = [];

  function cache( key, value ) {
    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
    if ( keys.push( key + " " ) > Expr.cacheLength ) {
      // Only keep the most recent entries
      delete cache[ keys.shift() ];
    }
    return (cache[ key + " " ] = value);
  }
  return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
  fn[ expando ] = true;
  return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
  var div = document.createElement("div");

  try {
    return !!fn( div );
  } catch (e) {
    return false;
  } finally {
    // Remove from its parent by default
    if ( div.parentNode ) {
      div.parentNode.removeChild( div );
    }
    // release memory in IE
    div = null;
  }
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
  var arr = attrs.split("|"),
    i = attrs.length;

  while ( i-- ) {
    Expr.attrHandle[ arr[i] ] = handler;
  }
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
  var cur = b && a,
    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
      ( ~b.sourceIndex || MAX_NEGATIVE ) -
      ( ~a.sourceIndex || MAX_NEGATIVE );

  // Use IE sourceIndex if available on both nodes
  if ( diff ) {
    return diff;
  }

  // Check if b follows a
  if ( cur ) {
    while ( (cur = cur.nextSibling) ) {
      if ( cur === b ) {
        return -1;
      }
    }
  }

  return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
  return function( elem ) {
    var name = elem.nodeName.toLowerCase();
    return name === "input" && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
  return function( elem ) {
    var name = elem.nodeName.toLowerCase();
    return (name === "input" || name === "button") && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
  return markFunction(function( argument ) {
    argument = +argument;
    return markFunction(function( seed, matches ) {
      var j,
        matchIndexes = fn( [], seed.length, argument ),
        i = matchIndexes.length;

      // Match elements found at the specified indexes
      while ( i-- ) {
        if ( seed[ (j = matchIndexes[i]) ] ) {
          seed[j] = !(matches[j] = seed[j]);
        }
      }
    });
  });
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
  return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
  // documentElement is verified for cases where it doesn't yet exist
  // (such as loading iframes in IE - #4833)
  var documentElement = elem && (elem.ownerDocument || elem).documentElement;
  return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
  var hasCompare, parent,
    doc = node ? node.ownerDocument || node : preferredDoc;

  // If no document and documentElement is available, return
  if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
    return document;
  }

  // Set our document
  document = doc;
  docElem = doc.documentElement;
  parent = doc.defaultView;

  // Support: IE>8
  // If iframe document is assigned to "document" variable and if iframe has been reloaded,
  // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
  // IE6-8 do not support the defaultView property so parent will be undefined
  if ( parent && parent !== parent.top ) {
    // IE11 does not have attachEvent, so all must suffer
    if ( parent.addEventListener ) {
      parent.addEventListener( "unload", unloadHandler, false );
    } else if ( parent.attachEvent ) {
      parent.attachEvent( "onunload", unloadHandler );
    }
  }

  /* Support tests
  ---------------------------------------------------------------------- */
  documentIsHTML = !isXML( doc );

  /* Attributes
  ---------------------------------------------------------------------- */

  // Support: IE<8
  // Verify that getAttribute really returns attributes and not properties
  // (excepting IE8 booleans)
  support.attributes = assert(function( div ) {
    div.className = "i";
    return !div.getAttribute("className");
  });

  /* getElement(s)By*
  ---------------------------------------------------------------------- */

  // Check if getElementsByTagName("*") returns only elements
  support.getElementsByTagName = assert(function( div ) {
    div.appendChild( doc.createComment("") );
    return !div.getElementsByTagName("*").length;
  });

  // Support: IE<9
  support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

  // Support: IE<10
  // Check if getElementById returns elements by name
  // The broken getElementById methods don't pick up programatically-set names,
  // so use a roundabout getElementsByName test
  support.getById = assert(function( div ) {
    docElem.appendChild( div ).id = expando;
    return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
  });

  // ID find and filter
  if ( support.getById ) {
    Expr.find["ID"] = function( id, context ) {
      if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
        var m = context.getElementById( id );
        // Check parentNode to catch when Blackberry 4.6 returns
        // nodes that are no longer in the document #6963
        return m && m.parentNode ? [ m ] : [];
      }
    };
    Expr.filter["ID"] = function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        return elem.getAttribute("id") === attrId;
      };
    };
  } else {
    // Support: IE6/7
    // getElementById is not reliable as a find shortcut
    delete Expr.find["ID"];

    Expr.filter["ID"] =  function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
        return node && node.value === attrId;
      };
    };
  }

  // Tag
  Expr.find["TAG"] = support.getElementsByTagName ?
    function( tag, context ) {
      if ( typeof context.getElementsByTagName !== "undefined" ) {
        return context.getElementsByTagName( tag );

      // DocumentFragment nodes don't have gEBTN
      } else if ( support.qsa ) {
        return context.querySelectorAll( tag );
      }
    } :

    function( tag, context ) {
      var elem,
        tmp = [],
        i = 0,
        // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
        results = context.getElementsByTagName( tag );

      // Filter out possible comments
      if ( tag === "*" ) {
        while ( (elem = results[i++]) ) {
          if ( elem.nodeType === 1 ) {
            tmp.push( elem );
          }
        }

        return tmp;
      }
      return results;
    };

  // Class
  Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
    if ( documentIsHTML ) {
      return context.getElementsByClassName( className );
    }
  };

  /* QSA/matchesSelector
  ---------------------------------------------------------------------- */

  // QSA and matchesSelector support

  // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
  rbuggyMatches = [];

  // qSa(:focus) reports false when true (Chrome 21)
  // We allow this because of a bug in IE8/9 that throws an error
  // whenever `document.activeElement` is accessed on an iframe
  // So, we allow :focus to pass through QSA all the time to avoid the IE error
  // See http://bugs.jquery.com/ticket/13378
  rbuggyQSA = [];

  if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
    // Build QSA regex
    // Regex strategy adopted from Diego Perini
    assert(function( div ) {
      // Select is set to empty string on purpose
      // This is to test IE's treatment of not explicitly
      // setting a boolean content attribute,
      // since its presence should be enough
      // http://bugs.jquery.com/ticket/12359
      docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
        "<select id='" + expando + "-\f]' msallowcapture=''>" +
        "<option selected=''></option></select>";

      // Support: IE8, Opera 11-12.16
      // Nothing should be selected when empty strings follow ^= or $= or *=
      // The test attribute must be unknown in Opera but "safe" for WinRT
      // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
      if ( div.querySelectorAll("[msallowcapture^='']").length ) {
        rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
      }

      // Support: IE8
      // Boolean attributes and "value" are not treated correctly
      if ( !div.querySelectorAll("[selected]").length ) {
        rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
      }

      // Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
      if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
        rbuggyQSA.push("~=");
      }

      // Webkit/Opera - :checked should return selected option elements
      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
      // IE8 throws error here and will not see later tests
      if ( !div.querySelectorAll(":checked").length ) {
        rbuggyQSA.push(":checked");
      }

      // Support: Safari 8+, iOS 8+
      // https://bugs.webkit.org/show_bug.cgi?id=136851
      // In-page `selector#id sibing-combinator selector` fails
      if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
        rbuggyQSA.push(".#.+[+~]");
      }
    });

    assert(function( div ) {
      // Support: Windows 8 Native Apps
      // The type and name attributes are restricted during .innerHTML assignment
      var input = doc.createElement("input");
      input.setAttribute( "type", "hidden" );
      div.appendChild( input ).setAttribute( "name", "D" );

      // Support: IE8
      // Enforce case-sensitivity of name attribute
      if ( div.querySelectorAll("[name=d]").length ) {
        rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
      }

      // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
      // IE8 throws error here and will not see later tests
      if ( !div.querySelectorAll(":enabled").length ) {
        rbuggyQSA.push( ":enabled", ":disabled" );
      }

      // Opera 10-11 does not throw on post-comma invalid pseudos
      div.querySelectorAll("*,:x");
      rbuggyQSA.push(",.*:");
    });
  }

  if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
    docElem.webkitMatchesSelector ||
    docElem.mozMatchesSelector ||
    docElem.oMatchesSelector ||
    docElem.msMatchesSelector) )) ) {

    assert(function( div ) {
      // Check to see if it's possible to do matchesSelector
      // on a disconnected node (IE 9)
      support.disconnectedMatch = matches.call( div, "div" );

      // This should fail with an exception
      // Gecko does not error, returns false instead
      matches.call( div, "[s!='']:x" );
      rbuggyMatches.push( "!=", pseudos );
    });
  }

  rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
  rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

  /* Contains
  ---------------------------------------------------------------------- */
  hasCompare = rnative.test( docElem.compareDocumentPosition );

  // Element contains another
  // Purposefully does not implement inclusive descendent
  // As in, an element does not contain itself
  contains = hasCompare || rnative.test( docElem.contains ) ?
    function( a, b ) {
      var adown = a.nodeType === 9 ? a.documentElement : a,
        bup = b && b.parentNode;
      return a === bup || !!( bup && bup.nodeType === 1 && (
        adown.contains ?
          adown.contains( bup ) :
          a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
      ));
    } :
    function( a, b ) {
      if ( b ) {
        while ( (b = b.parentNode) ) {
          if ( b === a ) {
            return true;
          }
        }
      }
      return false;
    };

  /* Sorting
  ---------------------------------------------------------------------- */

  // Document order sorting
  sortOrder = hasCompare ?
  function( a, b ) {

    // Flag for duplicate removal
    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    // Sort on method existence if only one input has compareDocumentPosition
    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
    if ( compare ) {
      return compare;
    }

    // Calculate position if both inputs belong to the same document
    compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
      a.compareDocumentPosition( b ) :

      // Otherwise we know they are disconnected
      1;

    // Disconnected nodes
    if ( compare & 1 ||
      (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

      // Choose the first element that is related to our preferred document
      if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
        return -1;
      }
      if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
        return 1;
      }

      // Maintain original order
      return sortInput ?
        ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
        0;
    }

    return compare & 4 ? -1 : 1;
  } :
  function( a, b ) {
    // Exit early if the nodes are identical
    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    var cur,
      i = 0,
      aup = a.parentNode,
      bup = b.parentNode,
      ap = [ a ],
      bp = [ b ];

    // Parentless nodes are either documents or disconnected
    if ( !aup || !bup ) {
      return a === doc ? -1 :
        b === doc ? 1 :
        aup ? -1 :
        bup ? 1 :
        sortInput ?
        ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
        0;

    // If the nodes are siblings, we can do a quick check
    } else if ( aup === bup ) {
      return siblingCheck( a, b );
    }

    // Otherwise we need full lists of their ancestors for comparison
    cur = a;
    while ( (cur = cur.parentNode) ) {
      ap.unshift( cur );
    }
    cur = b;
    while ( (cur = cur.parentNode) ) {
      bp.unshift( cur );
    }

    // Walk down the tree looking for a discrepancy
    while ( ap[i] === bp[i] ) {
      i++;
    }

    return i ?
      // Do a sibling check if the nodes have a common ancestor
      siblingCheck( ap[i], bp[i] ) :

      // Otherwise nodes in our document sort first
      ap[i] === preferredDoc ? -1 :
      bp[i] === preferredDoc ? 1 :
      0;
  };

  return doc;
};

Sizzle.matches = function( expr, elements ) {
  return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
  // Set document vars if needed
  if ( ( elem.ownerDocument || elem ) !== document ) {
    setDocument( elem );
  }

  // Make sure that attribute selectors are quoted
  expr = expr.replace( rattributeQuotes, "='$1']" );

  if ( support.matchesSelector && documentIsHTML &&
    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

    try {
      var ret = matches.call( elem, expr );

      // IE 9's matchesSelector returns false on disconnected nodes
      if ( ret || support.disconnectedMatch ||
          // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11 ) {
        return ret;
      }
    } catch (e) {}
  }

  return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
  // Set document vars if needed
  if ( ( context.ownerDocument || context ) !== document ) {
    setDocument( context );
  }
  return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
  // Set document vars if needed
  if ( ( elem.ownerDocument || elem ) !== document ) {
    setDocument( elem );
  }

  var fn = Expr.attrHandle[ name.toLowerCase() ],
    // Don't get fooled by Object.prototype properties (jQuery #13807)
    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
      fn( elem, name, !documentIsHTML ) :
      undefined;

  return val !== undefined ?
    val :
    support.attributes || !documentIsHTML ?
      elem.getAttribute( name ) :
      (val = elem.getAttributeNode(name)) && val.specified ?
        val.value :
        null;
};

Sizzle.error = function( msg ) {
  throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
  var elem,
    duplicates = [],
    j = 0,
    i = 0;

  // Unless we *know* we can detect duplicates, assume their presence
  hasDuplicate = !support.detectDuplicates;
  sortInput = !support.sortStable && results.slice( 0 );
  results.sort( sortOrder );

  if ( hasDuplicate ) {
    while ( (elem = results[i++]) ) {
      if ( elem === results[ i ] ) {
        j = duplicates.push( i );
      }
    }
    while ( j-- ) {
      results.splice( duplicates[ j ], 1 );
    }
  }

  // Clear input after sorting to release objects
  // See https://github.com/jquery/sizzle/pull/225
  sortInput = null;

  return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
  var node,
    ret = "",
    i = 0,
    nodeType = elem.nodeType;

  if ( !nodeType ) {
    // If no nodeType, this is expected to be an array
    while ( (node = elem[i++]) ) {
      // Do not traverse comment nodes
      ret += getText( node );
    }
  } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
    // Use textContent for elements
    // innerText usage removed for consistency of new lines (jQuery #11153)
    if ( typeof elem.textContent === "string" ) {
      return elem.textContent;
    } else {
      // Traverse its children
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        ret += getText( elem );
      }
    }
  } else if ( nodeType === 3 || nodeType === 4 ) {
    return elem.nodeValue;
  }
  // Do not include comment or processing instruction nodes

  return ret;
};

Expr = Sizzle.selectors = {

  // Can be adjusted by the user
  cacheLength: 50,

  createPseudo: markFunction,

  match: matchExpr,

  attrHandle: {},

  find: {},

  relative: {
    ">": { dir: "parentNode", first: true },
    " ": { dir: "parentNode" },
    "+": { dir: "previousSibling", first: true },
    "~": { dir: "previousSibling" }
  },

  preFilter: {
    "ATTR": function( match ) {
      match[1] = match[1].replace( runescape, funescape );

      // Move the given value to match[3] whether quoted or unquoted
      match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

      if ( match[2] === "~=" ) {
        match[3] = " " + match[3] + " ";
      }

      return match.slice( 0, 4 );
    },

    "CHILD": function( match ) {
      /* matches from matchExpr["CHILD"]
        1 type (only|nth|...)
        2 what (child|of-type)
        3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
        4 xn-component of xn+y argument ([+-]?\d*n|)
        5 sign of xn-component
        6 x of xn-component
        7 sign of y-component
        8 y of y-component
      */
      match[1] = match[1].toLowerCase();

      if ( match[1].slice( 0, 3 ) === "nth" ) {
        // nth-* requires argument
        if ( !match[3] ) {
          Sizzle.error( match[0] );
        }

        // numeric x and y parameters for Expr.filter.CHILD
        // remember that false/true cast respectively to 0/1
        match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
        match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

      // other types prohibit arguments
      } else if ( match[3] ) {
        Sizzle.error( match[0] );
      }

      return match;
    },

    "PSEUDO": function( match ) {
      var excess,
        unquoted = !match[6] && match[2];

      if ( matchExpr["CHILD"].test( match[0] ) ) {
        return null;
      }

      // Accept quoted arguments as-is
      if ( match[3] ) {
        match[2] = match[4] || match[5] || "";

      // Strip excess characters from unquoted arguments
      } else if ( unquoted && rpseudo.test( unquoted ) &&
        // Get excess from tokenize (recursively)
        (excess = tokenize( unquoted, true )) &&
        // advance to the next closing parenthesis
        (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

        // excess is a negative index
        match[0] = match[0].slice( 0, excess );
        match[2] = unquoted.slice( 0, excess );
      }

      // Return only captures needed by the pseudo filter method (type and argument)
      return match.slice( 0, 3 );
    }
  },

  filter: {

    "TAG": function( nodeNameSelector ) {
      var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
      return nodeNameSelector === "*" ?
        function() { return true; } :
        function( elem ) {
          return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
        };
    },

    "CLASS": function( className ) {
      var pattern = classCache[ className + " " ];

      return pattern ||
        (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
        classCache( className, function( elem ) {
          return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
        });
    },

    "ATTR": function( name, operator, check ) {
      return function( elem ) {
        var result = Sizzle.attr( elem, name );

        if ( result == null ) {
          return operator === "!=";
        }
        if ( !operator ) {
          return true;
        }

        result += "";

        return operator === "=" ? result === check :
          operator === "!=" ? result !== check :
          operator === "^=" ? check && result.indexOf( check ) === 0 :
          operator === "*=" ? check && result.indexOf( check ) > -1 :
          operator === "$=" ? check && result.slice( -check.length ) === check :
          operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
          operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
          false;
      };
    },

    "CHILD": function( type, what, argument, first, last ) {
      var simple = type.slice( 0, 3 ) !== "nth",
        forward = type.slice( -4 ) !== "last",
        ofType = what === "of-type";

      return first === 1 && last === 0 ?

        // Shortcut for :nth-*(n)
        function( elem ) {
          return !!elem.parentNode;
        } :

        function( elem, context, xml ) {
          var cache, outerCache, node, diff, nodeIndex, start,
            dir = simple !== forward ? "nextSibling" : "previousSibling",
            parent = elem.parentNode,
            name = ofType && elem.nodeName.toLowerCase(),
            useCache = !xml && !ofType;

          if ( parent ) {

            // :(first|last|only)-(child|of-type)
            if ( simple ) {
              while ( dir ) {
                node = elem;
                while ( (node = node[ dir ]) ) {
                  if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                    return false;
                  }
                }
                // Reverse direction for :only-* (if we haven't yet done so)
                start = dir = type === "only" && !start && "nextSibling";
              }
              return true;
            }

            start = [ forward ? parent.firstChild : parent.lastChild ];

            // non-xml :nth-child(...) stores cache data on `parent`
            if ( forward && useCache ) {
              // Seek `elem` from a previously-cached index
              outerCache = parent[ expando ] || (parent[ expando ] = {});
              cache = outerCache[ type ] || [];
              nodeIndex = cache[0] === dirruns && cache[1];
              diff = cache[0] === dirruns && cache[2];
              node = nodeIndex && parent.childNodes[ nodeIndex ];

              while ( (node = ++nodeIndex && node && node[ dir ] ||

                // Fallback to seeking `elem` from the start
                (diff = nodeIndex = 0) || start.pop()) ) {

                // When found, cache indexes on `parent` and break
                if ( node.nodeType === 1 && ++diff && node === elem ) {
                  outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                  break;
                }
              }

            // Use previously-cached element index if available
            } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
              diff = cache[1];

            // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
            } else {
              // Use the same loop as above to seek `elem` from the start
              while ( (node = ++nodeIndex && node && node[ dir ] ||
                (diff = nodeIndex = 0) || start.pop()) ) {

                if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                  // Cache the index of each encountered element
                  if ( useCache ) {
                    (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                  }

                  if ( node === elem ) {
                    break;
                  }
                }
              }
            }

            // Incorporate the offset, then check against cycle size
            diff -= last;
            return diff === first || ( diff % first === 0 && diff / first >= 0 );
          }
        };
    },

    "PSEUDO": function( pseudo, argument ) {
      // pseudo-class names are case-insensitive
      // http://www.w3.org/TR/selectors/#pseudo-classes
      // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
      // Remember that setFilters inherits from pseudos
      var args,
        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
          Sizzle.error( "unsupported pseudo: " + pseudo );

      // The user may use createPseudo to indicate that
      // arguments are needed to create the filter function
      // just as Sizzle does
      if ( fn[ expando ] ) {
        return fn( argument );
      }

      // But maintain support for old signatures
      if ( fn.length > 1 ) {
        args = [ pseudo, pseudo, "", argument ];
        return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
          markFunction(function( seed, matches ) {
            var idx,
              matched = fn( seed, argument ),
              i = matched.length;
            while ( i-- ) {
              idx = indexOf( seed, matched[i] );
              seed[ idx ] = !( matches[ idx ] = matched[i] );
            }
          }) :
          function( elem ) {
            return fn( elem, 0, args );
          };
      }

      return fn;
    }
  },

  pseudos: {
    // Potentially complex pseudos
    "not": markFunction(function( selector ) {
      // Trim the selector passed to compile
      // to avoid treating leading and trailing
      // spaces as combinators
      var input = [],
        results = [],
        matcher = compile( selector.replace( rtrim, "$1" ) );

      return matcher[ expando ] ?
        markFunction(function( seed, matches, context, xml ) {
          var elem,
            unmatched = matcher( seed, null, xml, [] ),
            i = seed.length;

          // Match elements unmatched by `matcher`
          while ( i-- ) {
            if ( (elem = unmatched[i]) ) {
              seed[i] = !(matches[i] = elem);
            }
          }
        }) :
        function( elem, context, xml ) {
          input[0] = elem;
          matcher( input, null, xml, results );
          // Don't keep the element (issue #299)
          input[0] = null;
          return !results.pop();
        };
    }),

    "has": markFunction(function( selector ) {
      return function( elem ) {
        return Sizzle( selector, elem ).length > 0;
      };
    }),

    "contains": markFunction(function( text ) {
      text = text.replace( runescape, funescape );
      return function( elem ) {
        return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
      };
    }),

    // "Whether an element is represented by a :lang() selector
    // is based solely on the element's language value
    // being equal to the identifier C,
    // or beginning with the identifier C immediately followed by "-".
    // The matching of C against the element's language value is performed case-insensitively.
    // The identifier C does not have to be a valid language name."
    // http://www.w3.org/TR/selectors/#lang-pseudo
    "lang": markFunction( function( lang ) {
      // lang value must be a valid identifier
      if ( !ridentifier.test(lang || "") ) {
        Sizzle.error( "unsupported lang: " + lang );
      }
      lang = lang.replace( runescape, funescape ).toLowerCase();
      return function( elem ) {
        var elemLang;
        do {
          if ( (elemLang = documentIsHTML ?
            elem.lang :
            elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

            elemLang = elemLang.toLowerCase();
            return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
          }
        } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
        return false;
      };
    }),

    // Miscellaneous
    "target": function( elem ) {
      var hash = window.location && window.location.hash;
      return hash && hash.slice( 1 ) === elem.id;
    },

    "root": function( elem ) {
      return elem === docElem;
    },

    "focus": function( elem ) {
      return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
    },

    // Boolean properties
    "enabled": function( elem ) {
      return elem.disabled === false;
    },

    "disabled": function( elem ) {
      return elem.disabled === true;
    },

    "checked": function( elem ) {
      // In CSS3, :checked should return both checked and selected elements
      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
      var nodeName = elem.nodeName.toLowerCase();
      return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
    },

    "selected": function( elem ) {
      // Accessing this property makes selected-by-default
      // options in Safari work properly
      if ( elem.parentNode ) {
        elem.parentNode.selectedIndex;
      }

      return elem.selected === true;
    },

    // Contents
    "empty": function( elem ) {
      // http://www.w3.org/TR/selectors/#empty-pseudo
      // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
      //   but not by others (comment: 8; processing instruction: 7; etc.)
      // nodeType < 6 works because attributes (2) do not appear as children
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        if ( elem.nodeType < 6 ) {
          return false;
        }
      }
      return true;
    },

    "parent": function( elem ) {
      return !Expr.pseudos["empty"]( elem );
    },

    // Element/input types
    "header": function( elem ) {
      return rheader.test( elem.nodeName );
    },

    "input": function( elem ) {
      return rinputs.test( elem.nodeName );
    },

    "button": function( elem ) {
      var name = elem.nodeName.toLowerCase();
      return name === "input" && elem.type === "button" || name === "button";
    },

    "text": function( elem ) {
      var attr;
      return elem.nodeName.toLowerCase() === "input" &&
        elem.type === "text" &&

        // Support: IE<8
        // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
        ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
    },

    // Position-in-collection
    "first": createPositionalPseudo(function() {
      return [ 0 ];
    }),

    "last": createPositionalPseudo(function( matchIndexes, length ) {
      return [ length - 1 ];
    }),

    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
      return [ argument < 0 ? argument + length : argument ];
    }),

    "even": createPositionalPseudo(function( matchIndexes, length ) {
      var i = 0;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "odd": createPositionalPseudo(function( matchIndexes, length ) {
      var i = 1;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; --i >= 0; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; ++i < length; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    })
  }
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
  Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
  Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
  var matched, match, tokens, type,
    soFar, groups, preFilters,
    cached = tokenCache[ selector + " " ];

  if ( cached ) {
    return parseOnly ? 0 : cached.slice( 0 );
  }

  soFar = selector;
  groups = [];
  preFilters = Expr.preFilter;

  while ( soFar ) {

    // Comma and first run
    if ( !matched || (match = rcomma.exec( soFar )) ) {
      if ( match ) {
        // Don't consume trailing commas as valid
        soFar = soFar.slice( match[0].length ) || soFar;
      }
      groups.push( (tokens = []) );
    }

    matched = false;

    // Combinators
    if ( (match = rcombinators.exec( soFar )) ) {
      matched = match.shift();
      tokens.push({
        value: matched,
        // Cast descendant combinators to space
        type: match[0].replace( rtrim, " " )
      });
      soFar = soFar.slice( matched.length );
    }

    // Filters
    for ( type in Expr.filter ) {
      if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
        (match = preFilters[ type ]( match ))) ) {
        matched = match.shift();
        tokens.push({
          value: matched,
          type: type,
          matches: match
        });
        soFar = soFar.slice( matched.length );
      }
    }

    if ( !matched ) {
      break;
    }
  }

  // Return the length of the invalid excess
  // if we're just parsing
  // Otherwise, throw an error or return tokens
  return parseOnly ?
    soFar.length :
    soFar ?
      Sizzle.error( selector ) :
      // Cache the tokens
      tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
  var i = 0,
    len = tokens.length,
    selector = "";
  for ( ; i < len; i++ ) {
    selector += tokens[i].value;
  }
  return selector;
}

function addCombinator( matcher, combinator, base ) {
  var dir = combinator.dir,
    checkNonElements = base && dir === "parentNode",
    doneName = done++;

  return combinator.first ?
    // Check against closest ancestor/preceding element
    function( elem, context, xml ) {
      while ( (elem = elem[ dir ]) ) {
        if ( elem.nodeType === 1 || checkNonElements ) {
          return matcher( elem, context, xml );
        }
      }
    } :

    // Check against all ancestor/preceding elements
    function( elem, context, xml ) {
      var oldCache, outerCache,
        newCache = [ dirruns, doneName ];

      // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
      if ( xml ) {
        while ( (elem = elem[ dir ]) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            if ( matcher( elem, context, xml ) ) {
              return true;
            }
          }
        }
      } else {
        while ( (elem = elem[ dir ]) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            outerCache = elem[ expando ] || (elem[ expando ] = {});
            if ( (oldCache = outerCache[ dir ]) &&
              oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

              // Assign to newCache so results back-propagate to previous elements
              return (newCache[ 2 ] = oldCache[ 2 ]);
            } else {
              // Reuse newcache so results back-propagate to previous elements
              outerCache[ dir ] = newCache;

              // A match means we're done; a fail means we have to keep checking
              if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                return true;
              }
            }
          }
        }
      }
    };
}

function elementMatcher( matchers ) {
  return matchers.length > 1 ?
    function( elem, context, xml ) {
      var i = matchers.length;
      while ( i-- ) {
        if ( !matchers[i]( elem, context, xml ) ) {
          return false;
        }
      }
      return true;
    } :
    matchers[0];
}

function multipleContexts( selector, contexts, results ) {
  var i = 0,
    len = contexts.length;
  for ( ; i < len; i++ ) {
    Sizzle( selector, contexts[i], results );
  }
  return results;
}

function condense( unmatched, map, filter, context, xml ) {
  var elem,
    newUnmatched = [],
    i = 0,
    len = unmatched.length,
    mapped = map != null;

  for ( ; i < len; i++ ) {
    if ( (elem = unmatched[i]) ) {
      if ( !filter || filter( elem, context, xml ) ) {
        newUnmatched.push( elem );
        if ( mapped ) {
          map.push( i );
        }
      }
    }
  }

  return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
  if ( postFilter && !postFilter[ expando ] ) {
    postFilter = setMatcher( postFilter );
  }
  if ( postFinder && !postFinder[ expando ] ) {
    postFinder = setMatcher( postFinder, postSelector );
  }
  return markFunction(function( seed, results, context, xml ) {
    var temp, i, elem,
      preMap = [],
      postMap = [],
      preexisting = results.length,

      // Get initial elements from seed or context
      elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

      // Prefilter to get matcher input, preserving a map for seed-results synchronization
      matcherIn = preFilter && ( seed || !selector ) ?
        condense( elems, preMap, preFilter, context, xml ) :
        elems,

      matcherOut = matcher ?
        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
        postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

          // ...intermediate processing is necessary
          [] :

          // ...otherwise use results directly
          results :
        matcherIn;

    // Find primary matches
    if ( matcher ) {
      matcher( matcherIn, matcherOut, context, xml );
    }

    // Apply postFilter
    if ( postFilter ) {
      temp = condense( matcherOut, postMap );
      postFilter( temp, [], context, xml );

      // Un-match failing elements by moving them back to matcherIn
      i = temp.length;
      while ( i-- ) {
        if ( (elem = temp[i]) ) {
          matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
        }
      }
    }

    if ( seed ) {
      if ( postFinder || preFilter ) {
        if ( postFinder ) {
          // Get the final matcherOut by condensing this intermediate into postFinder contexts
          temp = [];
          i = matcherOut.length;
          while ( i-- ) {
            if ( (elem = matcherOut[i]) ) {
              // Restore matcherIn since elem is not yet a final match
              temp.push( (matcherIn[i] = elem) );
            }
          }
          postFinder( null, (matcherOut = []), temp, xml );
        }

        // Move matched elements from seed to results to keep them synchronized
        i = matcherOut.length;
        while ( i-- ) {
          if ( (elem = matcherOut[i]) &&
            (temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

            seed[temp] = !(results[temp] = elem);
          }
        }
      }

    // Add elements to results, through postFinder if defined
    } else {
      matcherOut = condense(
        matcherOut === results ?
          matcherOut.splice( preexisting, matcherOut.length ) :
          matcherOut
      );
      if ( postFinder ) {
        postFinder( null, results, matcherOut, xml );
      } else {
        push.apply( results, matcherOut );
      }
    }
  });
}

function matcherFromTokens( tokens ) {
  var checkContext, matcher, j,
    len = tokens.length,
    leadingRelative = Expr.relative[ tokens[0].type ],
    implicitRelative = leadingRelative || Expr.relative[" "],
    i = leadingRelative ? 1 : 0,

    // The foundational matcher ensures that elements are reachable from top-level context(s)
    matchContext = addCombinator( function( elem ) {
      return elem === checkContext;
    }, implicitRelative, true ),
    matchAnyContext = addCombinator( function( elem ) {
      return indexOf( checkContext, elem ) > -1;
    }, implicitRelative, true ),
    matchers = [ function( elem, context, xml ) {
      var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
        (checkContext = context).nodeType ?
          matchContext( elem, context, xml ) :
          matchAnyContext( elem, context, xml ) );
      // Avoid hanging onto element (issue #299)
      checkContext = null;
      return ret;
    } ];

  for ( ; i < len; i++ ) {
    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
      matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
    } else {
      matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

      // Return special upon seeing a positional matcher
      if ( matcher[ expando ] ) {
        // Find the next relative operator (if any) for proper handling
        j = ++i;
        for ( ; j < len; j++ ) {
          if ( Expr.relative[ tokens[j].type ] ) {
            break;
          }
        }
        return setMatcher(
          i > 1 && elementMatcher( matchers ),
          i > 1 && toSelector(
            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
          ).replace( rtrim, "$1" ),
          matcher,
          i < j && matcherFromTokens( tokens.slice( i, j ) ),
          j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
          j < len && toSelector( tokens )
        );
      }
      matchers.push( matcher );
    }
  }

  return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
  var bySet = setMatchers.length > 0,
    byElement = elementMatchers.length > 0,
    superMatcher = function( seed, context, xml, results, outermost ) {
      var elem, j, matcher,
        matchedCount = 0,
        i = "0",
        unmatched = seed && [],
        setMatched = [],
        contextBackup = outermostContext,
        // We must always have either seed elements or outermost context
        elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
        // Use integer dirruns iff this is the outermost matcher
        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
        len = elems.length;

      if ( outermost ) {
        outermostContext = context !== document && context;
      }

      // Add elements passing elementMatchers directly to results
      // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
      // Support: IE<9, Safari
      // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
      for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
        if ( byElement && elem ) {
          j = 0;
          while ( (matcher = elementMatchers[j++]) ) {
            if ( matcher( elem, context, xml ) ) {
              results.push( elem );
              break;
            }
          }
          if ( outermost ) {
            dirruns = dirrunsUnique;
          }
        }

        // Track unmatched elements for set filters
        if ( bySet ) {
          // They will have gone through all possible matchers
          if ( (elem = !matcher && elem) ) {
            matchedCount--;
          }

          // Lengthen the array for every element, matched or not
          if ( seed ) {
            unmatched.push( elem );
          }
        }
      }

      // Apply set filters to unmatched elements
      matchedCount += i;
      if ( bySet && i !== matchedCount ) {
        j = 0;
        while ( (matcher = setMatchers[j++]) ) {
          matcher( unmatched, setMatched, context, xml );
        }

        if ( seed ) {
          // Reintegrate element matches to eliminate the need for sorting
          if ( matchedCount > 0 ) {
            while ( i-- ) {
              if ( !(unmatched[i] || setMatched[i]) ) {
                setMatched[i] = pop.call( results );
              }
            }
          }

          // Discard index placeholder values to get only actual matches
          setMatched = condense( setMatched );
        }

        // Add matches to results
        push.apply( results, setMatched );

        // Seedless set matches succeeding multiple successful matchers stipulate sorting
        if ( outermost && !seed && setMatched.length > 0 &&
          ( matchedCount + setMatchers.length ) > 1 ) {

          Sizzle.uniqueSort( results );
        }
      }

      // Override manipulation of globals by nested matchers
      if ( outermost ) {
        dirruns = dirrunsUnique;
        outermostContext = contextBackup;
      }

      return unmatched;
    };

  return bySet ?
    markFunction( superMatcher ) :
    superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
  var i,
    setMatchers = [],
    elementMatchers = [],
    cached = compilerCache[ selector + " " ];

  if ( !cached ) {
    // Generate a function of recursive functions that can be used to check each element
    if ( !match ) {
      match = tokenize( selector );
    }
    i = match.length;
    while ( i-- ) {
      cached = matcherFromTokens( match[i] );
      if ( cached[ expando ] ) {
        setMatchers.push( cached );
      } else {
        elementMatchers.push( cached );
      }
    }

    // Cache the compiled function
    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

    // Save selector and tokenization
    cached.selector = selector;
  }
  return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
  var i, tokens, token, type, find,
    compiled = typeof selector === "function" && selector,
    match = !seed && tokenize( (selector = compiled.selector || selector) );

  results = results || [];

  // Try to minimize operations if there is no seed and only one group
  if ( match.length === 1 ) {

    // Take a shortcut and set the context if the root selector is an ID
    tokens = match[0] = match[0].slice( 0 );
    if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
        support.getById && context.nodeType === 9 && documentIsHTML &&
        Expr.relative[ tokens[1].type ] ) {

      context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
      if ( !context ) {
        return results;

      // Precompiled matchers will still verify ancestry, so step up a level
      } else if ( compiled ) {
        context = context.parentNode;
      }

      selector = selector.slice( tokens.shift().value.length );
    }

    // Fetch a seed set for right-to-left matching
    i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
    while ( i-- ) {
      token = tokens[i];

      // Abort if we hit a combinator
      if ( Expr.relative[ (type = token.type) ] ) {
        break;
      }
      if ( (find = Expr.find[ type ]) ) {
        // Search, expanding context for leading sibling combinators
        if ( (seed = find(
          token.matches[0].replace( runescape, funescape ),
          rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
        )) ) {

          // If seed is empty or no tokens remain, we can return early
          tokens.splice( i, 1 );
          selector = seed.length && toSelector( tokens );
          if ( !selector ) {
            push.apply( results, seed );
            return results;
          }

          break;
        }
      }
    }
  }

  // Compile and execute a filtering function if one is not provided
  // Provide `match` to avoid retokenization if we modified the selector above
  ( compiled || compile( selector, match ) )(
    seed,
    context,
    !documentIsHTML,
    results,
    rsibling.test( selector ) && testContext( context.parentNode ) || context
  );
  return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
  // Should return 1, but returns 4 (following)
  return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
  div.innerHTML = "<a href='#'></a>";
  return div.firstChild.getAttribute("href") === "#" ;
}) ) {
  addHandle( "type|href|height|width", function( elem, name, isXML ) {
    if ( !isXML ) {
      return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
    }
  });
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
  div.innerHTML = "<input/>";
  div.firstChild.setAttribute( "value", "" );
  return div.firstChild.getAttribute( "value" ) === "";
}) ) {
  addHandle( "value", function( elem, name, isXML ) {
    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
      return elem.defaultValue;
    }
  });
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
  return div.getAttribute("disabled") == null;
}) ) {
  addHandle( booleans, function( elem, name, isXML ) {
    var val;
    if ( !isXML ) {
      return elem[ name ] === true ? name.toLowerCase() :
          (val = elem.getAttributeNode( name )) && val.specified ?
          val.value :
        null;
    }
  });
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
  if ( jQuery.isFunction( qualifier ) ) {
    return jQuery.grep( elements, function( elem, i ) {
      /* jshint -W018 */
      return !!qualifier.call( elem, i, elem ) !== not;
    });

  }

  if ( qualifier.nodeType ) {
    return jQuery.grep( elements, function( elem ) {
      return ( elem === qualifier ) !== not;
    });

  }

  if ( typeof qualifier === "string" ) {
    if ( risSimple.test( qualifier ) ) {
      return jQuery.filter( qualifier, elements, not );
    }

    qualifier = jQuery.filter( qualifier, elements );
  }

  return jQuery.grep( elements, function( elem ) {
    return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
  });
}

jQuery.filter = function( expr, elems, not ) {
  var elem = elems[ 0 ];

  if ( not ) {
    expr = ":not(" + expr + ")";
  }

  return elems.length === 1 && elem.nodeType === 1 ?
    jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
    jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
      return elem.nodeType === 1;
    }));
};

jQuery.fn.extend({
  find: function( selector ) {
    var i,
      ret = [],
      self = this,
      len = self.length;

    if ( typeof selector !== "string" ) {
      return this.pushStack( jQuery( selector ).filter(function() {
        for ( i = 0; i < len; i++ ) {
          if ( jQuery.contains( self[ i ], this ) ) {
            return true;
          }
        }
      }) );
    }

    for ( i = 0; i < len; i++ ) {
      jQuery.find( selector, self[ i ], ret );
    }

    // Needed because $( selector, context ) becomes $( context ).find( selector )
    ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
    ret.selector = this.selector ? this.selector + " " + selector : selector;
    return ret;
  },
  filter: function( selector ) {
    return this.pushStack( winnow(this, selector || [], false) );
  },
  not: function( selector ) {
    return this.pushStack( winnow(this, selector || [], true) );
  },
  is: function( selector ) {
    return !!winnow(
      this,

      // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test( selector ) ?
        jQuery( selector ) :
        selector || [],
      false
    ).length;
  }
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

  // Use the correct document accordingly with window argument (sandbox)
  document = window.document,

  // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
  // Strict HTML recognition (#11290: must start with <)
  rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

  init = jQuery.fn.init = function( selector, context ) {
    var match, elem;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if ( !selector ) {
      return this;
    }

    // Handle HTML strings
    if ( typeof selector === "string" ) {
      if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [ null, selector, null ];

      } else {
        match = rquickExpr.exec( selector );
      }

      // Match html or make sure no context is specified for #id
      if ( match && (match[1] || !context) ) {

        // HANDLE: $(html) -> $(array)
        if ( match[1] ) {
          context = context instanceof jQuery ? context[0] : context;

          // scripts is true for back-compat
          // Intentionally let the error be thrown if parseHTML is not present
          jQuery.merge( this, jQuery.parseHTML(
            match[1],
            context && context.nodeType ? context.ownerDocument || context : document,
            true
          ) );

          // HANDLE: $(html, props)
          if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
            for ( match in context ) {
              // Properties of context are called as methods if possible
              if ( jQuery.isFunction( this[ match ] ) ) {
                this[ match ]( context[ match ] );

              // ...and otherwise set as attributes
              } else {
                this.attr( match, context[ match ] );
              }
            }
          }

          return this;

        // HANDLE: $(#id)
        } else {
          elem = document.getElementById( match[2] );

          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document #6963
          if ( elem && elem.parentNode ) {
            // Handle the case where IE and Opera return items
            // by name instead of ID
            if ( elem.id !== match[2] ) {
              return rootjQuery.find( selector );
            }

            // Otherwise, we inject the element directly into the jQuery object
            this.length = 1;
            this[0] = elem;
          }

          this.context = document;
          this.selector = selector;
          return this;
        }

      // HANDLE: $(expr, $(...))
      } else if ( !context || context.jquery ) {
        return ( context || rootjQuery ).find( selector );

      // HANDLE: $(expr, context)
      // (which is just equivalent to: $(context).find(expr)
      } else {
        return this.constructor( context ).find( selector );
      }

    // HANDLE: $(DOMElement)
    } else if ( selector.nodeType ) {
      this.context = this[0] = selector;
      this.length = 1;
      return this;

    // HANDLE: $(function)
    // Shortcut for document ready
    } else if ( jQuery.isFunction( selector ) ) {
      return typeof rootjQuery.ready !== "undefined" ?
        rootjQuery.ready( selector ) :
        // Execute immediately if ready is not present
        selector( jQuery );
    }

    if ( selector.selector !== undefined ) {
      this.selector = selector.selector;
      this.context = selector.context;
    }

    return jQuery.makeArray( selector, this );
  };

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
  // methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };

jQuery.extend({
  dir: function( elem, dir, until ) {
    var matched = [],
      cur = elem[ dir ];

    while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
      if ( cur.nodeType === 1 ) {
        matched.push( cur );
      }
      cur = cur[dir];
    }
    return matched;
  },

  sibling: function( n, elem ) {
    var r = [];

    for ( ; n; n = n.nextSibling ) {
      if ( n.nodeType === 1 && n !== elem ) {
        r.push( n );
      }
    }

    return r;
  }
});

jQuery.fn.extend({
  has: function( target ) {
    var i,
      targets = jQuery( target, this ),
      len = targets.length;

    return this.filter(function() {
      for ( i = 0; i < len; i++ ) {
        if ( jQuery.contains( this, targets[i] ) ) {
          return true;
        }
      }
    });
  },

  closest: function( selectors, context ) {
    var cur,
      i = 0,
      l = this.length,
      matched = [],
      pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
        jQuery( selectors, context || this.context ) :
        0;

    for ( ; i < l; i++ ) {
      for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
        // Always skip document fragments
        if ( cur.nodeType < 11 && (pos ?
          pos.index(cur) > -1 :

          // Don't pass non-elements to Sizzle
          cur.nodeType === 1 &&
            jQuery.find.matchesSelector(cur, selectors)) ) {

          matched.push( cur );
          break;
        }
      }
    }

    return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
  },

  // Determine the position of an element within
  // the matched set of elements
  index: function( elem ) {

    // No argument, return index in parent
    if ( !elem ) {
      return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
    }

    // index in selector
    if ( typeof elem === "string" ) {
      return jQuery.inArray( this[0], jQuery( elem ) );
    }

    // Locate the position of the desired element
    return jQuery.inArray(
      // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[0] : elem, this );
  },

  add: function( selector, context ) {
    return this.pushStack(
      jQuery.unique(
        jQuery.merge( this.get(), jQuery( selector, context ) )
      )
    );
  },

  addBack: function( selector ) {
    return this.add( selector == null ?
      this.prevObject : this.prevObject.filter(selector)
    );
  }
});

function sibling( cur, dir ) {
  do {
    cur = cur[ dir ];
  } while ( cur && cur.nodeType !== 1 );

  return cur;
}

jQuery.each({
  parent: function( elem ) {
    var parent = elem.parentNode;
    return parent && parent.nodeType !== 11 ? parent : null;
  },
  parents: function( elem ) {
    return jQuery.dir( elem, "parentNode" );
  },
  parentsUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "parentNode", until );
  },
  next: function( elem ) {
    return sibling( elem, "nextSibling" );
  },
  prev: function( elem ) {
    return sibling( elem, "previousSibling" );
  },
  nextAll: function( elem ) {
    return jQuery.dir( elem, "nextSibling" );
  },
  prevAll: function( elem ) {
    return jQuery.dir( elem, "previousSibling" );
  },
  nextUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "nextSibling", until );
  },
  prevUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "previousSibling", until );
  },
  siblings: function( elem ) {
    return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
  },
  children: function( elem ) {
    return jQuery.sibling( elem.firstChild );
  },
  contents: function( elem ) {
    return jQuery.nodeName( elem, "iframe" ) ?
      elem.contentDocument || elem.contentWindow.document :
      jQuery.merge( [], elem.childNodes );
  }
}, function( name, fn ) {
  jQuery.fn[ name ] = function( until, selector ) {
    var ret = jQuery.map( this, fn, until );

    if ( name.slice( -5 ) !== "Until" ) {
      selector = until;
    }

    if ( selector && typeof selector === "string" ) {
      ret = jQuery.filter( selector, ret );
    }

    if ( this.length > 1 ) {
      // Remove duplicates
      if ( !guaranteedUnique[ name ] ) {
        ret = jQuery.unique( ret );
      }

      // Reverse order for parents* and prev-derivatives
      if ( rparentsprev.test( name ) ) {
        ret = ret.reverse();
      }
    }

    return this.pushStack( ret );
  };
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
  var object = optionsCache[ options ] = {};
  jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
    object[ flag ] = true;
  });
  return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *  options: an optional list of space-separated options that will change how
 *      the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *  once:     will ensure the callback list can only be fired once (like a Deferred)
 *
 *  memory:     will keep track of previous values and will call any callback added
 *          after the list has been fired right away with the latest "memorized"
 *          values (like a Deferred)
 *
 *  unique:     will ensure a callback can only be added once (no duplicate in the list)
 *
 *  stopOnFalse:  interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

  // Convert options from String-formatted to Object-formatted if needed
  // (we check in cache first)
  options = typeof options === "string" ?
    ( optionsCache[ options ] || createOptions( options ) ) :
    jQuery.extend( {}, options );

  var // Flag to know if list is currently firing
    firing,
    // Last fire value (for non-forgettable lists)
    memory,
    // Flag to know if list was already fired
    fired,
    // End of the loop when firing
    firingLength,
    // Index of currently firing callback (modified by remove if needed)
    firingIndex,
    // First callback to fire (used internally by add and fireWith)
    firingStart,
    // Actual callback list
    list = [],
    // Stack of fire calls for repeatable lists
    stack = !options.once && [],
    // Fire callbacks
    fire = function( data ) {
      memory = options.memory && data;
      fired = true;
      firingIndex = firingStart || 0;
      firingStart = 0;
      firingLength = list.length;
      firing = true;
      for ( ; list && firingIndex < firingLength; firingIndex++ ) {
        if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
          memory = false; // To prevent further calls using add
          break;
        }
      }
      firing = false;
      if ( list ) {
        if ( stack ) {
          if ( stack.length ) {
            fire( stack.shift() );
          }
        } else if ( memory ) {
          list = [];
        } else {
          self.disable();
        }
      }
    },
    // Actual Callbacks object
    self = {
      // Add a callback or a collection of callbacks to the list
      add: function() {
        if ( list ) {
          // First, we save the current length
          var start = list.length;
          (function add( args ) {
            jQuery.each( args, function( _, arg ) {
              var type = jQuery.type( arg );
              if ( type === "function" ) {
                if ( !options.unique || !self.has( arg ) ) {
                  list.push( arg );
                }
              } else if ( arg && arg.length && type !== "string" ) {
                // Inspect recursively
                add( arg );
              }
            });
          })( arguments );
          // Do we need to add the callbacks to the
          // current firing batch?
          if ( firing ) {
            firingLength = list.length;
          // With memory, if we're not firing then
          // we should call right away
          } else if ( memory ) {
            firingStart = start;
            fire( memory );
          }
        }
        return this;
      },
      // Remove a callback from the list
      remove: function() {
        if ( list ) {
          jQuery.each( arguments, function( _, arg ) {
            var index;
            while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
              list.splice( index, 1 );
              // Handle firing indexes
              if ( firing ) {
                if ( index <= firingLength ) {
                  firingLength--;
                }
                if ( index <= firingIndex ) {
                  firingIndex--;
                }
              }
            }
          });
        }
        return this;
      },
      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function( fn ) {
        return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
      },
      // Remove all callbacks from the list
      empty: function() {
        list = [];
        firingLength = 0;
        return this;
      },
      // Have the list do nothing anymore
      disable: function() {
        list = stack = memory = undefined;
        return this;
      },
      // Is it disabled?
      disabled: function() {
        return !list;
      },
      // Lock the list in its current state
      lock: function() {
        stack = undefined;
        if ( !memory ) {
          self.disable();
        }
        return this;
      },
      // Is it locked?
      locked: function() {
        return !stack;
      },
      // Call all callbacks with the given context and arguments
      fireWith: function( context, args ) {
        if ( list && ( !fired || stack ) ) {
          args = args || [];
          args = [ context, args.slice ? args.slice() : args ];
          if ( firing ) {
            stack.push( args );
          } else {
            fire( args );
          }
        }
        return this;
      },
      // Call all the callbacks with the given arguments
      fire: function() {
        self.fireWith( this, arguments );
        return this;
      },
      // To know if the callbacks have already been called at least once
      fired: function() {
        return !!fired;
      }
    };

  return self;
};


jQuery.extend({

  Deferred: function( func ) {
    var tuples = [
        // action, add listener, listener list, final state
        [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
        [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
        [ "notify", "progress", jQuery.Callbacks("memory") ]
      ],
      state = "pending",
      promise = {
        state: function() {
          return state;
        },
        always: function() {
          deferred.done( arguments ).fail( arguments );
          return this;
        },
        then: function( /* fnDone, fnFail, fnProgress */ ) {
          var fns = arguments;
          return jQuery.Deferred(function( newDefer ) {
            jQuery.each( tuples, function( i, tuple ) {
              var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
              // deferred[ done | fail | progress ] for forwarding actions to newDefer
              deferred[ tuple[1] ](function() {
                var returned = fn && fn.apply( this, arguments );
                if ( returned && jQuery.isFunction( returned.promise ) ) {
                  returned.promise()
                    .done( newDefer.resolve )
                    .fail( newDefer.reject )
                    .progress( newDefer.notify );
                } else {
                  newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
                }
              });
            });
            fns = null;
          }).promise();
        },
        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function( obj ) {
          return obj != null ? jQuery.extend( obj, promise ) : promise;
        }
      },
      deferred = {};

    // Keep pipe for back-compat
    promise.pipe = promise.then;

    // Add list-specific methods
    jQuery.each( tuples, function( i, tuple ) {
      var list = tuple[ 2 ],
        stateString = tuple[ 3 ];

      // promise[ done | fail | progress ] = list.add
      promise[ tuple[1] ] = list.add;

      // Handle state
      if ( stateString ) {
        list.add(function() {
          // state = [ resolved | rejected ]
          state = stateString;

        // [ reject_list | resolve_list ].disable; progress_list.lock
        }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
      }

      // deferred[ resolve | reject | notify ]
      deferred[ tuple[0] ] = function() {
        deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
        return this;
      };
      deferred[ tuple[0] + "With" ] = list.fireWith;
    });

    // Make the deferred a promise
    promise.promise( deferred );

    // Call given func if any
    if ( func ) {
      func.call( deferred, deferred );
    }

    // All done!
    return deferred;
  },

  // Deferred helper
  when: function( subordinate /* , ..., subordinateN */ ) {
    var i = 0,
      resolveValues = slice.call( arguments ),
      length = resolveValues.length,

      // the count of uncompleted subordinates
      remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

      // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
      deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

      // Update function for both resolve and progress values
      updateFunc = function( i, contexts, values ) {
        return function( value ) {
          contexts[ i ] = this;
          values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
          if ( values === progressValues ) {
            deferred.notifyWith( contexts, values );

          } else if ( !(--remaining) ) {
            deferred.resolveWith( contexts, values );
          }
        };
      },

      progressValues, progressContexts, resolveContexts;

    // add listeners to Deferred subordinates; treat others as resolved
    if ( length > 1 ) {
      progressValues = new Array( length );
      progressContexts = new Array( length );
      resolveContexts = new Array( length );
      for ( ; i < length; i++ ) {
        if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
          resolveValues[ i ].promise()
            .done( updateFunc( i, resolveContexts, resolveValues ) )
            .fail( deferred.reject )
            .progress( updateFunc( i, progressContexts, progressValues ) );
        } else {
          --remaining;
        }
      }
    }

    // if we're not waiting on anything, resolve the master
    if ( !remaining ) {
      deferred.resolveWith( resolveContexts, resolveValues );
    }

    return deferred.promise();
  }
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
  // Add the callback
  jQuery.ready.promise().done( fn );

  return this;
};

jQuery.extend({
  // Is the DOM ready to be used? Set to true once it occurs.
  isReady: false,

  // A counter to track how many items to wait for before
  // the ready event fires. See #6781
  readyWait: 1,

  // Hold (or release) the ready event
  holdReady: function( hold ) {
    if ( hold ) {
      jQuery.readyWait++;
    } else {
      jQuery.ready( true );
    }
  },

  // Handle when the DOM is ready
  ready: function( wait ) {

    // Abort if there are pending holds or we're already ready
    if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
      return;
    }

    // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
    if ( !document.body ) {
      return setTimeout( jQuery.ready );
    }

    // Remember that the DOM is ready
    jQuery.isReady = true;

    // If a normal DOM Ready event fired, decrement, and wait if need be
    if ( wait !== true && --jQuery.readyWait > 0 ) {
      return;
    }

    // If there are functions bound, to execute
    readyList.resolveWith( document, [ jQuery ] );

    // Trigger any bound ready events
    if ( jQuery.fn.triggerHandler ) {
      jQuery( document ).triggerHandler( "ready" );
      jQuery( document ).off( "ready" );
    }
  }
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
  if ( document.addEventListener ) {
    document.removeEventListener( "DOMContentLoaded", completed, false );
    window.removeEventListener( "load", completed, false );

  } else {
    document.detachEvent( "onreadystatechange", completed );
    window.detachEvent( "onload", completed );
  }
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
  // readyState === "complete" is good enough for us to call the dom ready in oldIE
  if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
    detach();
    jQuery.ready();
  }
}

jQuery.ready.promise = function( obj ) {
  if ( !readyList ) {

    readyList = jQuery.Deferred();

    // Catch cases where $(document).ready() is called after the browser event has already occurred.
    // we once tried to use readyState "interactive" here, but it caused issues like the one
    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if ( document.readyState === "complete" ) {
      // Handle it asynchronously to allow scripts the opportunity to delay ready
      setTimeout( jQuery.ready );

    // Standards-based browsers support DOMContentLoaded
    } else if ( document.addEventListener ) {
      // Use the handy event callback
      document.addEventListener( "DOMContentLoaded", completed, false );

      // A fallback to window.onload, that will always work
      window.addEventListener( "load", completed, false );

    // If IE event model is used
    } else {
      // Ensure firing before onload, maybe late but safe also for iframes
      document.attachEvent( "onreadystatechange", completed );

      // A fallback to window.onload, that will always work
      window.attachEvent( "onload", completed );

      // If IE and not a frame
      // continually check to see if the document is ready
      var top = false;

      try {
        top = window.frameElement == null && document.documentElement;
      } catch(e) {}

      if ( top && top.doScroll ) {
        (function doScrollCheck() {
          if ( !jQuery.isReady ) {

            try {
              // Use the trick by Diego Perini
              // http://javascript.nwbox.com/IEContentLoaded/
              top.doScroll("left");
            } catch(e) {
              return setTimeout( doScrollCheck, 50 );
            }

            // detach all dom ready events
            detach();

            // and execute any waiting functions
            jQuery.ready();
          }
        })();
      }
    }
  }
  return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
  break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
  // Minified: var a,b,c,d
  var val, div, body, container;

  body = document.getElementsByTagName( "body" )[ 0 ];
  if ( !body || !body.style ) {
    // Return for frameset docs that don't have a body
    return;
  }

  // Setup
  div = document.createElement( "div" );
  container = document.createElement( "div" );
  container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
  body.appendChild( container ).appendChild( div );

  if ( typeof div.style.zoom !== strundefined ) {
    // Support: IE<8
    // Check if natively block-level elements act like inline-block
    // elements when setting their display to 'inline' and giving
    // them layout
    div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

    support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
    if ( val ) {
      // Prevent IE 6 from affecting layout for positioned elements #11048
      // Prevent IE from shrinking the body in IE 7 mode #12869
      // Support: IE<8
      body.style.zoom = 1;
    }
  }

  body.removeChild( container );
});




(function() {
  var div = document.createElement( "div" );

  // Execute the test only if not already executed in another module.
  if (support.deleteExpando == null) {
    // Support: IE<9
    support.deleteExpando = true;
    try {
      delete div.test;
    } catch( e ) {
      support.deleteExpando = false;
    }
  }

  // Null elements to avoid leaks in IE.
  div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
  var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
    nodeType = +elem.nodeType || 1;

  // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
  return nodeType !== 1 && nodeType !== 9 ?
    false :

    // Nodes accept data unless otherwise specified; rejection can be conditional
    !noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
  rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
  // If nothing was found internally, try to fetch any
  // data from the HTML5 data-* attribute
  if ( data === undefined && elem.nodeType === 1 ) {

    var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

    data = elem.getAttribute( name );

    if ( typeof data === "string" ) {
      try {
        data = data === "true" ? true :
          data === "false" ? false :
          data === "null" ? null :
          // Only convert to a number if it doesn't change the string
          +data + "" === data ? +data :
          rbrace.test( data ) ? jQuery.parseJSON( data ) :
          data;
      } catch( e ) {}

      // Make sure we set the data so it isn't changed later
      jQuery.data( elem, key, data );

    } else {
      data = undefined;
    }
  }

  return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
  var name;
  for ( name in obj ) {

    // if the public data object is empty, the private is still empty
    if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
      continue;
    }
    if ( name !== "toJSON" ) {
      return false;
    }
  }

  return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
  if ( !jQuery.acceptData( elem ) ) {
    return;
  }

  var ret, thisCache,
    internalKey = jQuery.expando,

    // We have to handle DOM nodes and JS objects differently because IE6-7
    // can't GC object references properly across the DOM-JS boundary
    isNode = elem.nodeType,

    // Only DOM nodes need the global jQuery cache; JS object data is
    // attached directly to the object so GC can occur automatically
    cache = isNode ? jQuery.cache : elem,

    // Only defining an ID for JS objects if its cache already exists allows
    // the code to shortcut on the same path as a DOM node with no cache
    id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

  // Avoid doing any more work than we need to when trying to get data on an
  // object that has no data at all
  if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
    return;
  }

  if ( !id ) {
    // Only DOM nodes need a new unique ID for each element since their data
    // ends up in the global cache
    if ( isNode ) {
      id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
    } else {
      id = internalKey;
    }
  }

  if ( !cache[ id ] ) {
    // Avoid exposing jQuery metadata on plain JS objects when the object
    // is serialized using JSON.stringify
    cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
  }

  // An object can be passed to jQuery.data instead of a key/value pair; this gets
  // shallow copied over onto the existing cache
  if ( typeof name === "object" || typeof name === "function" ) {
    if ( pvt ) {
      cache[ id ] = jQuery.extend( cache[ id ], name );
    } else {
      cache[ id ].data = jQuery.extend( cache[ id ].data, name );
    }
  }

  thisCache = cache[ id ];

  // jQuery data() is stored in a separate object inside the object's internal data
  // cache in order to avoid key collisions between internal data and user-defined
  // data.
  if ( !pvt ) {
    if ( !thisCache.data ) {
      thisCache.data = {};
    }

    thisCache = thisCache.data;
  }

  if ( data !== undefined ) {
    thisCache[ jQuery.camelCase( name ) ] = data;
  }

  // Check for both converted-to-camel and non-converted data property names
  // If a data property was specified
  if ( typeof name === "string" ) {

    // First Try to find as-is property data
    ret = thisCache[ name ];

    // Test for null|undefined property data
    if ( ret == null ) {

      // Try to find the camelCased property
      ret = thisCache[ jQuery.camelCase( name ) ];
    }
  } else {
    ret = thisCache;
  }

  return ret;
}

function internalRemoveData( elem, name, pvt ) {
  if ( !jQuery.acceptData( elem ) ) {
    return;
  }

  var thisCache, i,
    isNode = elem.nodeType,

    // See jQuery.data for more information
    cache = isNode ? jQuery.cache : elem,
    id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

  // If there is already no cache entry for this object, there is no
  // purpose in continuing
  if ( !cache[ id ] ) {
    return;
  }

  if ( name ) {

    thisCache = pvt ? cache[ id ] : cache[ id ].data;

    if ( thisCache ) {

      // Support array or space separated string names for data keys
      if ( !jQuery.isArray( name ) ) {

        // try the string as a key before any manipulation
        if ( name in thisCache ) {
          name = [ name ];
        } else {

          // split the camel cased version by spaces unless a key with the spaces exists
          name = jQuery.camelCase( name );
          if ( name in thisCache ) {
            name = [ name ];
          } else {
            name = name.split(" ");
          }
        }
      } else {
        // If "name" is an array of keys...
        // When data is initially created, via ("key", "val") signature,
        // keys will be converted to camelCase.
        // Since there is no way to tell _how_ a key was added, remove
        // both plain key and camelCase key. #12786
        // This will only penalize the array argument path.
        name = name.concat( jQuery.map( name, jQuery.camelCase ) );
      }

      i = name.length;
      while ( i-- ) {
        delete thisCache[ name[i] ];
      }

      // If there is no data left in the cache, we want to continue
      // and let the cache object itself get destroyed
      if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
        return;
      }
    }
  }

  // See jQuery.data for more information
  if ( !pvt ) {
    delete cache[ id ].data;

    // Don't destroy the parent cache unless the internal data object
    // had been the only thing left in it
    if ( !isEmptyDataObject( cache[ id ] ) ) {
      return;
    }
  }

  // Destroy the cache
  if ( isNode ) {
    jQuery.cleanData( [ elem ], true );

  // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
  /* jshint eqeqeq: false */
  } else if ( support.deleteExpando || cache != cache.window ) {
    /* jshint eqeqeq: true */
    delete cache[ id ];

  // When all else fails, null
  } else {
    cache[ id ] = null;
  }
}

jQuery.extend({
  cache: {},

  // The following elements (space-suffixed to avoid Object.prototype collisions)
  // throw uncatchable exceptions if you attempt to set expando properties
  noData: {
    "applet ": true,
    "embed ": true,
    // ...but Flash objects (which have this classid) *can* handle expandos
    "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
  },

  hasData: function( elem ) {
    elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
    return !!elem && !isEmptyDataObject( elem );
  },

  data: function( elem, name, data ) {
    return internalData( elem, name, data );
  },

  removeData: function( elem, name ) {
    return internalRemoveData( elem, name );
  },

  // For internal use only.
  _data: function( elem, name, data ) {
    return internalData( elem, name, data, true );
  },

  _removeData: function( elem, name ) {
    return internalRemoveData( elem, name, true );
  }
});

jQuery.fn.extend({
  data: function( key, value ) {
    var i, name, data,
      elem = this[0],
      attrs = elem && elem.attributes;

    // Special expections of .data basically thwart jQuery.access,
    // so implement the relevant behavior ourselves

    // Gets all values
    if ( key === undefined ) {
      if ( this.length ) {
        data = jQuery.data( elem );

        if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
          i = attrs.length;
          while ( i-- ) {

            // Support: IE11+
            // The attrs elements can be null (#14894)
            if ( attrs[ i ] ) {
              name = attrs[ i ].name;
              if ( name.indexOf( "data-" ) === 0 ) {
                name = jQuery.camelCase( name.slice(5) );
                dataAttr( elem, name, data[ name ] );
              }
            }
          }
          jQuery._data( elem, "parsedAttrs", true );
        }
      }

      return data;
    }

    // Sets multiple values
    if ( typeof key === "object" ) {
      return this.each(function() {
        jQuery.data( this, key );
      });
    }

    return arguments.length > 1 ?

      // Sets one value
      this.each(function() {
        jQuery.data( this, key, value );
      }) :

      // Gets one value
      // Try to fetch any internally stored data first
      elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
  },

  removeData: function( key ) {
    return this.each(function() {
      jQuery.removeData( this, key );
    });
  }
});


jQuery.extend({
  queue: function( elem, type, data ) {
    var queue;

    if ( elem ) {
      type = ( type || "fx" ) + "queue";
      queue = jQuery._data( elem, type );

      // Speed up dequeue by getting out quickly if this is just a lookup
      if ( data ) {
        if ( !queue || jQuery.isArray(data) ) {
          queue = jQuery._data( elem, type, jQuery.makeArray(data) );
        } else {
          queue.push( data );
        }
      }
      return queue || [];
    }
  },

  dequeue: function( elem, type ) {
    type = type || "fx";

    var queue = jQuery.queue( elem, type ),
      startLength = queue.length,
      fn = queue.shift(),
      hooks = jQuery._queueHooks( elem, type ),
      next = function() {
        jQuery.dequeue( elem, type );
      };

    // If the fx queue is dequeued, always remove the progress sentinel
    if ( fn === "inprogress" ) {
      fn = queue.shift();
      startLength--;
    }

    if ( fn ) {

      // Add a progress sentinel to prevent the fx queue from being
      // automatically dequeued
      if ( type === "fx" ) {
        queue.unshift( "inprogress" );
      }

      // clear up the last queue stop function
      delete hooks.stop;
      fn.call( elem, next, hooks );
    }

    if ( !startLength && hooks ) {
      hooks.empty.fire();
    }
  },

  // not intended for public consumption - generates a queueHooks object, or returns the current one
  _queueHooks: function( elem, type ) {
    var key = type + "queueHooks";
    return jQuery._data( elem, key ) || jQuery._data( elem, key, {
      empty: jQuery.Callbacks("once memory").add(function() {
        jQuery._removeData( elem, type + "queue" );
        jQuery._removeData( elem, key );
      })
    });
  }
});

jQuery.fn.extend({
  queue: function( type, data ) {
    var setter = 2;

    if ( typeof type !== "string" ) {
      data = type;
      type = "fx";
      setter--;
    }

    if ( arguments.length < setter ) {
      return jQuery.queue( this[0], type );
    }

    return data === undefined ?
      this :
      this.each(function() {
        var queue = jQuery.queue( this, type, data );

        // ensure a hooks for this queue
        jQuery._queueHooks( this, type );

        if ( type === "fx" && queue[0] !== "inprogress" ) {
          jQuery.dequeue( this, type );
        }
      });
  },
  dequeue: function( type ) {
    return this.each(function() {
      jQuery.dequeue( this, type );
    });
  },
  clearQueue: function( type ) {
    return this.queue( type || "fx", [] );
  },
  // Get a promise resolved when queues of a certain type
  // are emptied (fx is the type by default)
  promise: function( type, obj ) {
    var tmp,
      count = 1,
      defer = jQuery.Deferred(),
      elements = this,
      i = this.length,
      resolve = function() {
        if ( !( --count ) ) {
          defer.resolveWith( elements, [ elements ] );
        }
      };

    if ( typeof type !== "string" ) {
      obj = type;
      type = undefined;
    }
    type = type || "fx";

    while ( i-- ) {
      tmp = jQuery._data( elements[ i ], type + "queueHooks" );
      if ( tmp && tmp.empty ) {
        count++;
        tmp.empty.add( resolve );
      }
    }
    resolve();
    return defer.promise( obj );
  }
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
    // isHidden might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;
    return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
  };



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
  var i = 0,
    length = elems.length,
    bulk = key == null;

  // Sets many values
  if ( jQuery.type( key ) === "object" ) {
    chainable = true;
    for ( i in key ) {
      jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
    }

  // Sets one value
  } else if ( value !== undefined ) {
    chainable = true;

    if ( !jQuery.isFunction( value ) ) {
      raw = true;
    }

    if ( bulk ) {
      // Bulk operations run against the entire set
      if ( raw ) {
        fn.call( elems, value );
        fn = null;

      // ...except when executing function values
      } else {
        bulk = fn;
        fn = function( elem, key, value ) {
          return bulk.call( jQuery( elem ), value );
        };
      }
    }

    if ( fn ) {
      for ( ; i < length; i++ ) {
        fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
      }
    }
  }

  return chainable ?
    elems :

    // Gets
    bulk ?
      fn.call( elems ) :
      length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
  // Minified: var a,b,c
  var input = document.createElement( "input" ),
    div = document.createElement( "div" ),
    fragment = document.createDocumentFragment();

  // Setup
  div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

  // IE strips leading whitespace when .innerHTML is used
  support.leadingWhitespace = div.firstChild.nodeType === 3;

  // Make sure that tbody elements aren't automatically inserted
  // IE will insert them into empty tables
  support.tbody = !div.getElementsByTagName( "tbody" ).length;

  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

  // Makes sure cloning an html5 element does not cause problems
  // Where outerHTML is undefined, this still works
  support.html5Clone =
    document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

  // Check if a disconnected checkbox will retain its checked
  // value of true after appended to the DOM (IE6/7)
  input.type = "checkbox";
  input.checked = true;
  fragment.appendChild( input );
  support.appendChecked = input.checked;

  // Make sure textarea (and checkbox) defaultValue is properly cloned
  // Support: IE6-IE11+
  div.innerHTML = "<textarea>x</textarea>";
  support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

  // #11217 - WebKit loses check when the name is after the checked attribute
  fragment.appendChild( div );
  div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

  // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
  // old WebKit doesn't clone checked state correctly in fragments
  support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

  // Support: IE<9
  // Opera does not clone events (and typeof div.attachEvent === undefined).
  // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
  support.noCloneEvent = true;
  if ( div.attachEvent ) {
    div.attachEvent( "onclick", function() {
      support.noCloneEvent = false;
    });

    div.cloneNode( true ).click();
  }

  // Execute the test only if not already executed in another module.
  if (support.deleteExpando == null) {
    // Support: IE<9
    support.deleteExpando = true;
    try {
      delete div.test;
    } catch( e ) {
      support.deleteExpando = false;
    }
  }
})();


(function() {
  var i, eventName,
    div = document.createElement( "div" );

  // Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
  for ( i in { submit: true, change: true, focusin: true }) {
    eventName = "on" + i;

    if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
      // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
      div.setAttribute( eventName, "t" );
      support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
    }
  }

  // Null elements to avoid leaks in IE.
  div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
  rkeyEvent = /^key/,
  rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
  rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
  rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
  return true;
}

function returnFalse() {
  return false;
}

function safeActiveElement() {
  try {
    return document.activeElement;
  } catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

  global: {},

  add: function( elem, types, handler, data, selector ) {
    var tmp, events, t, handleObjIn,
      special, eventHandle, handleObj,
      handlers, type, namespaces, origType,
      elemData = jQuery._data( elem );

    // Don't attach events to noData or text/comment nodes (but allow plain objects)
    if ( !elemData ) {
      return;
    }

    // Caller can pass in an object of custom data in lieu of the handler
    if ( handler.handler ) {
      handleObjIn = handler;
      handler = handleObjIn.handler;
      selector = handleObjIn.selector;
    }

    // Make sure that the handler has a unique ID, used to find/remove it later
    if ( !handler.guid ) {
      handler.guid = jQuery.guid++;
    }

    // Init the element's event structure and main handler, if this is the first
    if ( !(events = elemData.events) ) {
      events = elemData.events = {};
    }
    if ( !(eventHandle = elemData.handle) ) {
      eventHandle = elemData.handle = function( e ) {
        // Discard the second event of a jQuery.event.trigger() and
        // when an event is called after a page has unloaded
        return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
          jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
          undefined;
      };
      // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
      eventHandle.elem = elem;
    }

    // Handle multiple events separated by a space
    types = ( types || "" ).match( rnotwhite ) || [ "" ];
    t = types.length;
    while ( t-- ) {
      tmp = rtypenamespace.exec( types[t] ) || [];
      type = origType = tmp[1];
      namespaces = ( tmp[2] || "" ).split( "." ).sort();

      // There *must* be a type, no attaching namespace-only handlers
      if ( !type ) {
        continue;
      }

      // If event changes its type, use the special event handlers for the changed type
      special = jQuery.event.special[ type ] || {};

      // If selector defined, determine special event api type, otherwise given type
      type = ( selector ? special.delegateType : special.bindType ) || type;

      // Update special based on newly reset type
      special = jQuery.event.special[ type ] || {};

      // handleObj is passed to all event handlers
      handleObj = jQuery.extend({
        type: type,
        origType: origType,
        data: data,
        handler: handler,
        guid: handler.guid,
        selector: selector,
        needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
        namespace: namespaces.join(".")
      }, handleObjIn );

      // Init the event handler queue if we're the first
      if ( !(handlers = events[ type ]) ) {
        handlers = events[ type ] = [];
        handlers.delegateCount = 0;

        // Only use addEventListener/attachEvent if the special events handler returns false
        if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
          // Bind the global event handler to the element
          if ( elem.addEventListener ) {
            elem.addEventListener( type, eventHandle, false );

          } else if ( elem.attachEvent ) {
            elem.attachEvent( "on" + type, eventHandle );
          }
        }
      }

      if ( special.add ) {
        special.add.call( elem, handleObj );

        if ( !handleObj.handler.guid ) {
          handleObj.handler.guid = handler.guid;
        }
      }

      // Add to the element's handler list, delegates in front
      if ( selector ) {
        handlers.splice( handlers.delegateCount++, 0, handleObj );
      } else {
        handlers.push( handleObj );
      }

      // Keep track of which events have ever been used, for event optimization
      jQuery.event.global[ type ] = true;
    }

    // Nullify elem to prevent memory leaks in IE
    elem = null;
  },

  // Detach an event or set of events from an element
  remove: function( elem, types, handler, selector, mappedTypes ) {
    var j, handleObj, tmp,
      origCount, t, events,
      special, handlers, type,
      namespaces, origType,
      elemData = jQuery.hasData( elem ) && jQuery._data( elem );

    if ( !elemData || !(events = elemData.events) ) {
      return;
    }

    // Once for each type.namespace in types; type may be omitted
    types = ( types || "" ).match( rnotwhite ) || [ "" ];
    t = types.length;
    while ( t-- ) {
      tmp = rtypenamespace.exec( types[t] ) || [];
      type = origType = tmp[1];
      namespaces = ( tmp[2] || "" ).split( "." ).sort();

      // Unbind all events (on this namespace, if provided) for the element
      if ( !type ) {
        for ( type in events ) {
          jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
        }
        continue;
      }

      special = jQuery.event.special[ type ] || {};
      type = ( selector ? special.delegateType : special.bindType ) || type;
      handlers = events[ type ] || [];
      tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

      // Remove matching events
      origCount = j = handlers.length;
      while ( j-- ) {
        handleObj = handlers[ j ];

        if ( ( mappedTypes || origType === handleObj.origType ) &&
          ( !handler || handler.guid === handleObj.guid ) &&
          ( !tmp || tmp.test( handleObj.namespace ) ) &&
          ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
          handlers.splice( j, 1 );

          if ( handleObj.selector ) {
            handlers.delegateCount--;
          }
          if ( special.remove ) {
            special.remove.call( elem, handleObj );
          }
        }
      }

      // Remove generic event handler if we removed something and no more handlers exist
      // (avoids potential for endless recursion during removal of special event handlers)
      if ( origCount && !handlers.length ) {
        if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
          jQuery.removeEvent( elem, type, elemData.handle );
        }

        delete events[ type ];
      }
    }

    // Remove the expando if it's no longer used
    if ( jQuery.isEmptyObject( events ) ) {
      delete elemData.handle;

      // removeData also checks for emptiness and clears the expando if empty
      // so use it instead of delete
      jQuery._removeData( elem, "events" );
    }
  },

  trigger: function( event, data, elem, onlyHandlers ) {
    var handle, ontype, cur,
      bubbleType, special, tmp, i,
      eventPath = [ elem || document ],
      type = hasOwn.call( event, "type" ) ? event.type : event,
      namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

    cur = tmp = elem = elem || document;

    // Don't do events on text and comment nodes
    if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
      return;
    }

    // focus/blur morphs to focusin/out; ensure we're not firing them right now
    if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
      return;
    }

    if ( type.indexOf(".") >= 0 ) {
      // Namespaced trigger; create a regexp to match event type in handle()
      namespaces = type.split(".");
      type = namespaces.shift();
      namespaces.sort();
    }
    ontype = type.indexOf(":") < 0 && "on" + type;

    // Caller can pass in a jQuery.Event object, Object, or just an event type string
    event = event[ jQuery.expando ] ?
      event :
      new jQuery.Event( type, typeof event === "object" && event );

    // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
    event.isTrigger = onlyHandlers ? 2 : 3;
    event.namespace = namespaces.join(".");
    event.namespace_re = event.namespace ?
      new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
      null;

    // Clean up the event in case it is being reused
    event.result = undefined;
    if ( !event.target ) {
      event.target = elem;
    }

    // Clone any incoming data and prepend the event, creating the handler arg list
    data = data == null ?
      [ event ] :
      jQuery.makeArray( data, [ event ] );

    // Allow special events to draw outside the lines
    special = jQuery.event.special[ type ] || {};
    if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
      return;
    }

    // Determine event propagation path in advance, per W3C events spec (#9951)
    // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
    if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

      bubbleType = special.delegateType || type;
      if ( !rfocusMorph.test( bubbleType + type ) ) {
        cur = cur.parentNode;
      }
      for ( ; cur; cur = cur.parentNode ) {
        eventPath.push( cur );
        tmp = cur;
      }

      // Only add window if we got to document (e.g., not plain obj or detached DOM)
      if ( tmp === (elem.ownerDocument || document) ) {
        eventPath.push( tmp.defaultView || tmp.parentWindow || window );
      }
    }

    // Fire handlers on the event path
    i = 0;
    while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

      event.type = i > 1 ?
        bubbleType :
        special.bindType || type;

      // jQuery handler
      handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
      if ( handle ) {
        handle.apply( cur, data );
      }

      // Native handler
      handle = ontype && cur[ ontype ];
      if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
        event.result = handle.apply( cur, data );
        if ( event.result === false ) {
          event.preventDefault();
        }
      }
    }
    event.type = type;

    // If nobody prevented the default action, do it now
    if ( !onlyHandlers && !event.isDefaultPrevented() ) {

      if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
        jQuery.acceptData( elem ) ) {

        // Call a native DOM method on the target with the same name name as the event.
        // Can't use an .isFunction() check here because IE6/7 fails that test.
        // Don't do default actions on window, that's where global variables be (#6170)
        if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

          // Don't re-trigger an onFOO event when we call its FOO() method
          tmp = elem[ ontype ];

          if ( tmp ) {
            elem[ ontype ] = null;
          }

          // Prevent re-triggering of the same event, since we already bubbled it above
          jQuery.event.triggered = type;
          try {
            elem[ type ]();
          } catch ( e ) {
            // IE<9 dies on focus/blur to hidden element (#1486,#12518)
            // only reproducible on winXP IE8 native, not IE9 in IE8 mode
          }
          jQuery.event.triggered = undefined;

          if ( tmp ) {
            elem[ ontype ] = tmp;
          }
        }
      }
    }

    return event.result;
  },

  dispatch: function( event ) {

    // Make a writable jQuery.Event from the native event object
    event = jQuery.event.fix( event );

    var i, ret, handleObj, matched, j,
      handlerQueue = [],
      args = slice.call( arguments ),
      handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
      special = jQuery.event.special[ event.type ] || {};

    // Use the fix-ed jQuery.Event rather than the (read-only) native event
    args[0] = event;
    event.delegateTarget = this;

    // Call the preDispatch hook for the mapped type, and let it bail if desired
    if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
      return;
    }

    // Determine handlers
    handlerQueue = jQuery.event.handlers.call( this, event, handlers );

    // Run delegates first; they may want to stop propagation beneath us
    i = 0;
    while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
      event.currentTarget = matched.elem;

      j = 0;
      while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

        // Triggered event must either 1) have no namespace, or
        // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
        if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

          event.handleObj = handleObj;
          event.data = handleObj.data;

          ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
              .apply( matched.elem, args );

          if ( ret !== undefined ) {
            if ( (event.result = ret) === false ) {
              event.preventDefault();
              event.stopPropagation();
            }
          }
        }
      }
    }

    // Call the postDispatch hook for the mapped type
    if ( special.postDispatch ) {
      special.postDispatch.call( this, event );
    }

    return event.result;
  },

  handlers: function( event, handlers ) {
    var sel, handleObj, matches, i,
      handlerQueue = [],
      delegateCount = handlers.delegateCount,
      cur = event.target;

    // Find delegate handlers
    // Black-hole SVG <use> instance trees (#13180)
    // Avoid non-left-click bubbling in Firefox (#3861)
    if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

      /* jshint eqeqeq: false */
      for ( ; cur != this; cur = cur.parentNode || this ) {
        /* jshint eqeqeq: true */

        // Don't check non-elements (#13208)
        // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
        if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
          matches = [];
          for ( i = 0; i < delegateCount; i++ ) {
            handleObj = handlers[ i ];

            // Don't conflict with Object.prototype properties (#13203)
            sel = handleObj.selector + " ";

            if ( matches[ sel ] === undefined ) {
              matches[ sel ] = handleObj.needsContext ?
                jQuery( sel, this ).index( cur ) >= 0 :
                jQuery.find( sel, this, null, [ cur ] ).length;
            }
            if ( matches[ sel ] ) {
              matches.push( handleObj );
            }
          }
          if ( matches.length ) {
            handlerQueue.push({ elem: cur, handlers: matches });
          }
        }
      }
    }

    // Add the remaining (directly-bound) handlers
    if ( delegateCount < handlers.length ) {
      handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
    }

    return handlerQueue;
  },

  fix: function( event ) {
    if ( event[ jQuery.expando ] ) {
      return event;
    }

    // Create a writable copy of the event object and normalize some properties
    var i, prop, copy,
      type = event.type,
      originalEvent = event,
      fixHook = this.fixHooks[ type ];

    if ( !fixHook ) {
      this.fixHooks[ type ] = fixHook =
        rmouseEvent.test( type ) ? this.mouseHooks :
        rkeyEvent.test( type ) ? this.keyHooks :
        {};
    }
    copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

    event = new jQuery.Event( originalEvent );

    i = copy.length;
    while ( i-- ) {
      prop = copy[ i ];
      event[ prop ] = originalEvent[ prop ];
    }

    // Support: IE<9
    // Fix target property (#1925)
    if ( !event.target ) {
      event.target = originalEvent.srcElement || document;
    }

    // Support: Chrome 23+, Safari?
    // Target should not be a text node (#504, #13143)
    if ( event.target.nodeType === 3 ) {
      event.target = event.target.parentNode;
    }

    // Support: IE<9
    // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
    event.metaKey = !!event.metaKey;

    return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
  },

  // Includes some event props shared by KeyEvent and MouseEvent
  props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

  fixHooks: {},

  keyHooks: {
    props: "char charCode key keyCode".split(" "),
    filter: function( event, original ) {

      // Add which for key events
      if ( event.which == null ) {
        event.which = original.charCode != null ? original.charCode : original.keyCode;
      }

      return event;
    }
  },

  mouseHooks: {
    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
    filter: function( event, original ) {
      var body, eventDoc, doc,
        button = original.button,
        fromElement = original.fromElement;

      // Calculate pageX/Y if missing and clientX/Y available
      if ( event.pageX == null && original.clientX != null ) {
        eventDoc = event.target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
        event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
      }

      // Add relatedTarget, if necessary
      if ( !event.relatedTarget && fromElement ) {
        event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
      }

      // Add which for click: 1 === left; 2 === middle; 3 === right
      // Note: button is not normalized, so don't use it
      if ( !event.which && button !== undefined ) {
        event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
      }

      return event;
    }
  },

  special: {
    load: {
      // Prevent triggered image.load events from bubbling to window.load
      noBubble: true
    },
    focus: {
      // Fire native event if possible so blur/focus sequence is correct
      trigger: function() {
        if ( this !== safeActiveElement() && this.focus ) {
          try {
            this.focus();
            return false;
          } catch ( e ) {
            // Support: IE<9
            // If we error on focus to hidden element (#1486, #12518),
            // let .trigger() run the handlers
          }
        }
      },
      delegateType: "focusin"
    },
    blur: {
      trigger: function() {
        if ( this === safeActiveElement() && this.blur ) {
          this.blur();
          return false;
        }
      },
      delegateType: "focusout"
    },
    click: {
      // For checkbox, fire native event so checked state will be right
      trigger: function() {
        if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
          this.click();
          return false;
        }
      },

      // For cross-browser consistency, don't fire native .click() on links
      _default: function( event ) {
        return jQuery.nodeName( event.target, "a" );
      }
    },

    beforeunload: {
      postDispatch: function( event ) {

        // Support: Firefox 20+
        // Firefox doesn't alert if the returnValue field is not set.
        if ( event.result !== undefined && event.originalEvent ) {
          event.originalEvent.returnValue = event.result;
        }
      }
    }
  },

  simulate: function( type, elem, event, bubble ) {
    // Piggyback on a donor event to simulate a different one.
    // Fake originalEvent to avoid donor's stopPropagation, but if the
    // simulated event prevents default then we do the same on the donor.
    var e = jQuery.extend(
      new jQuery.Event(),
      event,
      {
        type: type,
        isSimulated: true,
        originalEvent: {}
      }
    );
    if ( bubble ) {
      jQuery.event.trigger( e, null, elem );
    } else {
      jQuery.event.dispatch.call( elem, e );
    }
    if ( e.isDefaultPrevented() ) {
      event.preventDefault();
    }
  }
};

jQuery.removeEvent = document.removeEventListener ?
  function( elem, type, handle ) {
    if ( elem.removeEventListener ) {
      elem.removeEventListener( type, handle, false );
    }
  } :
  function( elem, type, handle ) {
    var name = "on" + type;

    if ( elem.detachEvent ) {

      // #8545, #7054, preventing memory leaks for custom events in IE6-8
      // detachEvent needed property on element, by name of that event, to properly expose it to GC
      if ( typeof elem[ name ] === strundefined ) {
        elem[ name ] = null;
      }

      elem.detachEvent( name, handle );
    }
  };

jQuery.Event = function( src, props ) {
  // Allow instantiation without the 'new' keyword
  if ( !(this instanceof jQuery.Event) ) {
    return new jQuery.Event( src, props );
  }

  // Event object
  if ( src && src.type ) {
    this.originalEvent = src;
    this.type = src.type;

    // Events bubbling up the document may have been marked as prevented
    // by a handler lower down the tree; reflect the correct value.
    this.isDefaultPrevented = src.defaultPrevented ||
        src.defaultPrevented === undefined &&
        // Support: IE < 9, Android < 4.0
        src.returnValue === false ?
      returnTrue :
      returnFalse;

  // Event type
  } else {
    this.type = src;
  }

  // Put explicitly provided properties onto the event object
  if ( props ) {
    jQuery.extend( this, props );
  }

  // Create a timestamp if incoming event doesn't have one
  this.timeStamp = src && src.timeStamp || jQuery.now();

  // Mark it as fixed
  this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
  isDefaultPrevented: returnFalse,
  isPropagationStopped: returnFalse,
  isImmediatePropagationStopped: returnFalse,

  preventDefault: function() {
    var e = this.originalEvent;

    this.isDefaultPrevented = returnTrue;
    if ( !e ) {
      return;
    }

    // If preventDefault exists, run it on the original event
    if ( e.preventDefault ) {
      e.preventDefault();

    // Support: IE
    // Otherwise set the returnValue property of the original event to false
    } else {
      e.returnValue = false;
    }
  },
  stopPropagation: function() {
    var e = this.originalEvent;

    this.isPropagationStopped = returnTrue;
    if ( !e ) {
      return;
    }
    // If stopPropagation exists, run it on the original event
    if ( e.stopPropagation ) {
      e.stopPropagation();
    }

    // Support: IE
    // Set the cancelBubble property of the original event to true
    e.cancelBubble = true;
  },
  stopImmediatePropagation: function() {
    var e = this.originalEvent;

    this.isImmediatePropagationStopped = returnTrue;

    if ( e && e.stopImmediatePropagation ) {
      e.stopImmediatePropagation();
    }

    this.stopPropagation();
  }
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  pointerenter: "pointerover",
  pointerleave: "pointerout"
}, function( orig, fix ) {
  jQuery.event.special[ orig ] = {
    delegateType: fix,
    bindType: fix,

    handle: function( event ) {
      var ret,
        target = this,
        related = event.relatedTarget,
        handleObj = event.handleObj;

      // For mousenter/leave call the handler if related is outside the target.
      // NB: No relatedTarget if the mouse left/entered the browser window
      if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
        event.type = handleObj.origType;
        ret = handleObj.handler.apply( this, arguments );
        event.type = fix;
      }
      return ret;
    }
  };
});

// IE submit delegation
if ( !support.submitBubbles ) {

  jQuery.event.special.submit = {
    setup: function() {
      // Only need this for delegated form submit events
      if ( jQuery.nodeName( this, "form" ) ) {
        return false;
      }

      // Lazy-add a submit handler when a descendant form may potentially be submitted
      jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
        // Node name check avoids a VML-related crash in IE (#9807)
        var elem = e.target,
          form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
        if ( form && !jQuery._data( form, "submitBubbles" ) ) {
          jQuery.event.add( form, "submit._submit", function( event ) {
            event._submit_bubble = true;
          });
          jQuery._data( form, "submitBubbles", true );
        }
      });
      // return undefined since we don't need an event listener
    },

    postDispatch: function( event ) {
      // If form was submitted by the user, bubble the event up the tree
      if ( event._submit_bubble ) {
        delete event._submit_bubble;
        if ( this.parentNode && !event.isTrigger ) {
          jQuery.event.simulate( "submit", this.parentNode, event, true );
        }
      }
    },

    teardown: function() {
      // Only need this for delegated form submit events
      if ( jQuery.nodeName( this, "form" ) ) {
        return false;
      }

      // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
      jQuery.event.remove( this, "._submit" );
    }
  };
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

  jQuery.event.special.change = {

    setup: function() {

      if ( rformElems.test( this.nodeName ) ) {
        // IE doesn't fire change on a check/radio until blur; trigger it on click
        // after a propertychange. Eat the blur-change in special.change.handle.
        // This still fires onchange a second time for check/radio after blur.
        if ( this.type === "checkbox" || this.type === "radio" ) {
          jQuery.event.add( this, "propertychange._change", function( event ) {
            if ( event.originalEvent.propertyName === "checked" ) {
              this._just_changed = true;
            }
          });
          jQuery.event.add( this, "click._change", function( event ) {
            if ( this._just_changed && !event.isTrigger ) {
              this._just_changed = false;
            }
            // Allow triggered, simulated change events (#11500)
            jQuery.event.simulate( "change", this, event, true );
          });
        }
        return false;
      }
      // Delegated event; lazy-add a change handler on descendant inputs
      jQuery.event.add( this, "beforeactivate._change", function( e ) {
        var elem = e.target;

        if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
          jQuery.event.add( elem, "change._change", function( event ) {
            if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
              jQuery.event.simulate( "change", this.parentNode, event, true );
            }
          });
          jQuery._data( elem, "changeBubbles", true );
        }
      });
    },

    handle: function( event ) {
      var elem = event.target;

      // Swallow native change events from checkbox/radio, we already triggered them above
      if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
        return event.handleObj.handler.apply( this, arguments );
      }
    },

    teardown: function() {
      jQuery.event.remove( this, "._change" );

      return !rformElems.test( this.nodeName );
    }
  };
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
  jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

    // Attach a single capturing handler on the document while someone wants focusin/focusout
    var handler = function( event ) {
        jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
      };

    jQuery.event.special[ fix ] = {
      setup: function() {
        var doc = this.ownerDocument || this,
          attaches = jQuery._data( doc, fix );

        if ( !attaches ) {
          doc.addEventListener( orig, handler, true );
        }
        jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
      },
      teardown: function() {
        var doc = this.ownerDocument || this,
          attaches = jQuery._data( doc, fix ) - 1;

        if ( !attaches ) {
          doc.removeEventListener( orig, handler, true );
          jQuery._removeData( doc, fix );
        } else {
          jQuery._data( doc, fix, attaches );
        }
      }
    };
  });
}

jQuery.fn.extend({

  on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
    var type, origFn;

    // Types can be a map of types/handlers
    if ( typeof types === "object" ) {
      // ( types-Object, selector, data )
      if ( typeof selector !== "string" ) {
        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }
      for ( type in types ) {
        this.on( type, selector, data, types[ type ], one );
      }
      return this;
    }

    if ( data == null && fn == null ) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if ( fn == null ) {
      if ( typeof selector === "string" ) {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if ( fn === false ) {
      fn = returnFalse;
    } else if ( !fn ) {
      return this;
    }

    if ( one === 1 ) {
      origFn = fn;
      fn = function( event ) {
        // Can use an empty set, since event contains the info
        jQuery().off( event );
        return origFn.apply( this, arguments );
      };
      // Use same guid so caller can remove using origFn
      fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
    }
    return this.each( function() {
      jQuery.event.add( this, types, fn, data, selector );
    });
  },
  one: function( types, selector, data, fn ) {
    return this.on( types, selector, data, fn, 1 );
  },
  off: function( types, selector, fn ) {
    var handleObj, type;
    if ( types && types.preventDefault && types.handleObj ) {
      // ( event )  dispatched jQuery.Event
      handleObj = types.handleObj;
      jQuery( types.delegateTarget ).off(
        handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
        handleObj.selector,
        handleObj.handler
      );
      return this;
    }
    if ( typeof types === "object" ) {
      // ( types-object [, selector] )
      for ( type in types ) {
        this.off( type, selector, types[ type ] );
      }
      return this;
    }
    if ( selector === false || typeof selector === "function" ) {
      // ( types [, fn] )
      fn = selector;
      selector = undefined;
    }
    if ( fn === false ) {
      fn = returnFalse;
    }
    return this.each(function() {
      jQuery.event.remove( this, types, fn, selector );
    });
  },

  trigger: function( type, data ) {
    return this.each(function() {
      jQuery.event.trigger( type, data, this );
    });
  },
  triggerHandler: function( type, data ) {
    var elem = this[0];
    if ( elem ) {
      return jQuery.event.trigger( type, data, elem, true );
    }
  }
});


function createSafeFragment( document ) {
  var list = nodeNames.split( "|" ),
    safeFrag = document.createDocumentFragment();

  if ( safeFrag.createElement ) {
    while ( list.length ) {
      safeFrag.createElement(
        list.pop()
      );
    }
  }
  return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
    "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
  rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
  rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
  rleadingWhitespace = /^\s+/,
  rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
  rtagName = /<([\w:]+)/,
  rtbody = /<tbody/i,
  rhtml = /<|&#?\w+;/,
  rnoInnerhtml = /<(?:script|style|link)/i,
  // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
  rscriptType = /^$|\/(?:java|ecma)script/i,
  rscriptTypeMasked = /^true\/(.*)/,
  rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

  // We have to close these tags to support XHTML (#13200)
  wrapMap = {
    option: [ 1, "<select multiple='multiple'>", "</select>" ],
    legend: [ 1, "<fieldset>", "</fieldset>" ],
    area: [ 1, "<map>", "</map>" ],
    param: [ 1, "<object>", "</object>" ],
    thead: [ 1, "<table>", "</table>" ],
    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
    col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
    td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

    // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
    // unless wrapped in a div with non-breaking characters in front of it.
    _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
  },
  safeFragment = createSafeFragment( document ),
  fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
  var elems, elem,
    i = 0,
    found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
      typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
      undefined;

  if ( !found ) {
    for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
      if ( !tag || jQuery.nodeName( elem, tag ) ) {
        found.push( elem );
      } else {
        jQuery.merge( found, getAll( elem, tag ) );
      }
    }
  }

  return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
    jQuery.merge( [ context ], found ) :
    found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
  if ( rcheckableType.test( elem.type ) ) {
    elem.defaultChecked = elem.checked;
  }
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
  return jQuery.nodeName( elem, "table" ) &&
    jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

    elem.getElementsByTagName("tbody")[0] ||
      elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
    elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
  elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
  return elem;
}
function restoreScript( elem ) {
  var match = rscriptTypeMasked.exec( elem.type );
  if ( match ) {
    elem.type = match[1];
  } else {
    elem.removeAttribute("type");
  }
  return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
  var elem,
    i = 0;
  for ( ; (elem = elems[i]) != null; i++ ) {
    jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
  }
}

function cloneCopyEvent( src, dest ) {

  if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
    return;
  }

  var type, i, l,
    oldData = jQuery._data( src ),
    curData = jQuery._data( dest, oldData ),
    events = oldData.events;

  if ( events ) {
    delete curData.handle;
    curData.events = {};

    for ( type in events ) {
      for ( i = 0, l = events[ type ].length; i < l; i++ ) {
        jQuery.event.add( dest, type, events[ type ][ i ] );
      }
    }
  }

  // make the cloned public data object a copy from the original
  if ( curData.data ) {
    curData.data = jQuery.extend( {}, curData.data );
  }
}

function fixCloneNodeIssues( src, dest ) {
  var nodeName, e, data;

  // We do not need to do anything for non-Elements
  if ( dest.nodeType !== 1 ) {
    return;
  }

  nodeName = dest.nodeName.toLowerCase();

  // IE6-8 copies events bound via attachEvent when using cloneNode.
  if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
    data = jQuery._data( dest );

    for ( e in data.events ) {
      jQuery.removeEvent( dest, e, data.handle );
    }

    // Event data gets referenced instead of copied if the expando gets copied too
    dest.removeAttribute( jQuery.expando );
  }

  // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
  if ( nodeName === "script" && dest.text !== src.text ) {
    disableScript( dest ).text = src.text;
    restoreScript( dest );

  // IE6-10 improperly clones children of object elements using classid.
  // IE10 throws NoModificationAllowedError if parent is null, #12132.
  } else if ( nodeName === "object" ) {
    if ( dest.parentNode ) {
      dest.outerHTML = src.outerHTML;
    }

    // This path appears unavoidable for IE9. When cloning an object
    // element in IE9, the outerHTML strategy above is not sufficient.
    // If the src has innerHTML and the destination does not,
    // copy the src.innerHTML into the dest.innerHTML. #10324
    if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
      dest.innerHTML = src.innerHTML;
    }

  } else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
    // IE6-8 fails to persist the checked state of a cloned checkbox
    // or radio button. Worse, IE6-7 fail to give the cloned element
    // a checked appearance if the defaultChecked value isn't also set

    dest.defaultChecked = dest.checked = src.checked;

    // IE6-7 get confused and end up setting the value of a cloned
    // checkbox/radio button to an empty string instead of "on"
    if ( dest.value !== src.value ) {
      dest.value = src.value;
    }

  // IE6-8 fails to return the selected option to the default selected
  // state when cloning options
  } else if ( nodeName === "option" ) {
    dest.defaultSelected = dest.selected = src.defaultSelected;

  // IE6-8 fails to set the defaultValue to the correct value when
  // cloning other types of input fields
  } else if ( nodeName === "input" || nodeName === "textarea" ) {
    dest.defaultValue = src.defaultValue;
  }
}

jQuery.extend({
  clone: function( elem, dataAndEvents, deepDataAndEvents ) {
    var destElements, node, clone, i, srcElements,
      inPage = jQuery.contains( elem.ownerDocument, elem );

    if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
      clone = elem.cloneNode( true );

    // IE<=8 does not properly clone detached, unknown element nodes
    } else {
      fragmentDiv.innerHTML = elem.outerHTML;
      fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
    }

    if ( (!support.noCloneEvent || !support.noCloneChecked) &&
        (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

      // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
      destElements = getAll( clone );
      srcElements = getAll( elem );

      // Fix all IE cloning issues
      for ( i = 0; (node = srcElements[i]) != null; ++i ) {
        // Ensure that the destination node is not null; Fixes #9587
        if ( destElements[i] ) {
          fixCloneNodeIssues( node, destElements[i] );
        }
      }
    }

    // Copy the events from the original to the clone
    if ( dataAndEvents ) {
      if ( deepDataAndEvents ) {
        srcElements = srcElements || getAll( elem );
        destElements = destElements || getAll( clone );

        for ( i = 0; (node = srcElements[i]) != null; i++ ) {
          cloneCopyEvent( node, destElements[i] );
        }
      } else {
        cloneCopyEvent( elem, clone );
      }
    }

    // Preserve script evaluation history
    destElements = getAll( clone, "script" );
    if ( destElements.length > 0 ) {
      setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
    }

    destElements = srcElements = node = null;

    // Return the cloned set
    return clone;
  },

  buildFragment: function( elems, context, scripts, selection ) {
    var j, elem, contains,
      tmp, tag, tbody, wrap,
      l = elems.length,

      // Ensure a safe fragment
      safe = createSafeFragment( context ),

      nodes = [],
      i = 0;

    for ( ; i < l; i++ ) {
      elem = elems[ i ];

      if ( elem || elem === 0 ) {

        // Add nodes directly
        if ( jQuery.type( elem ) === "object" ) {
          jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

        // Convert non-html into a text node
        } else if ( !rhtml.test( elem ) ) {
          nodes.push( context.createTextNode( elem ) );

        // Convert html into DOM nodes
        } else {
          tmp = tmp || safe.appendChild( context.createElement("div") );

          // Deserialize a standard representation
          tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
          wrap = wrapMap[ tag ] || wrapMap._default;

          tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

          // Descend through wrappers to the right content
          j = wrap[0];
          while ( j-- ) {
            tmp = tmp.lastChild;
          }

          // Manually add leading whitespace removed by IE
          if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
            nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
          }

          // Remove IE's autoinserted <tbody> from table fragments
          if ( !support.tbody ) {

            // String was a <table>, *may* have spurious <tbody>
            elem = tag === "table" && !rtbody.test( elem ) ?
              tmp.firstChild :

              // String was a bare <thead> or <tfoot>
              wrap[1] === "<table>" && !rtbody.test( elem ) ?
                tmp :
                0;

            j = elem && elem.childNodes.length;
            while ( j-- ) {
              if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
                elem.removeChild( tbody );
              }
            }
          }

          jQuery.merge( nodes, tmp.childNodes );

          // Fix #12392 for WebKit and IE > 9
          tmp.textContent = "";

          // Fix #12392 for oldIE
          while ( tmp.firstChild ) {
            tmp.removeChild( tmp.firstChild );
          }

          // Remember the top-level container for proper cleanup
          tmp = safe.lastChild;
        }
      }
    }

    // Fix #11356: Clear elements from fragment
    if ( tmp ) {
      safe.removeChild( tmp );
    }

    // Reset defaultChecked for any radios and checkboxes
    // about to be appended to the DOM in IE 6/7 (#8060)
    if ( !support.appendChecked ) {
      jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
    }

    i = 0;
    while ( (elem = nodes[ i++ ]) ) {

      // #4087 - If origin and destination elements are the same, and this is
      // that element, do not do anything
      if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
        continue;
      }

      contains = jQuery.contains( elem.ownerDocument, elem );

      // Append to fragment
      tmp = getAll( safe.appendChild( elem ), "script" );

      // Preserve script evaluation history
      if ( contains ) {
        setGlobalEval( tmp );
      }

      // Capture executables
      if ( scripts ) {
        j = 0;
        while ( (elem = tmp[ j++ ]) ) {
          if ( rscriptType.test( elem.type || "" ) ) {
            scripts.push( elem );
          }
        }
      }
    }

    tmp = null;

    return safe;
  },

  cleanData: function( elems, /* internal */ acceptData ) {
    var elem, type, id, data,
      i = 0,
      internalKey = jQuery.expando,
      cache = jQuery.cache,
      deleteExpando = support.deleteExpando,
      special = jQuery.event.special;

    for ( ; (elem = elems[i]) != null; i++ ) {
      if ( acceptData || jQuery.acceptData( elem ) ) {

        id = elem[ internalKey ];
        data = id && cache[ id ];

        if ( data ) {
          if ( data.events ) {
            for ( type in data.events ) {
              if ( special[ type ] ) {
                jQuery.event.remove( elem, type );

              // This is a shortcut to avoid jQuery.event.remove's overhead
              } else {
                jQuery.removeEvent( elem, type, data.handle );
              }
            }
          }

          // Remove cache only if it was not already removed by jQuery.event.remove
          if ( cache[ id ] ) {

            delete cache[ id ];

            // IE does not allow us to delete expando properties from nodes,
            // nor does it have a removeAttribute function on Document nodes;
            // we must handle all of these cases
            if ( deleteExpando ) {
              delete elem[ internalKey ];

            } else if ( typeof elem.removeAttribute !== strundefined ) {
              elem.removeAttribute( internalKey );

            } else {
              elem[ internalKey ] = null;
            }

            deletedIds.push( id );
          }
        }
      }
    }
  }
});

jQuery.fn.extend({
  text: function( value ) {
    return access( this, function( value ) {
      return value === undefined ?
        jQuery.text( this ) :
        this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
    }, null, value, arguments.length );
  },

  append: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
        var target = manipulationTarget( this, elem );
        target.appendChild( elem );
      }
    });
  },

  prepend: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
        var target = manipulationTarget( this, elem );
        target.insertBefore( elem, target.firstChild );
      }
    });
  },

  before: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.parentNode ) {
        this.parentNode.insertBefore( elem, this );
      }
    });
  },

  after: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.parentNode ) {
        this.parentNode.insertBefore( elem, this.nextSibling );
      }
    });
  },

  remove: function( selector, keepData /* Internal Use Only */ ) {
    var elem,
      elems = selector ? jQuery.filter( selector, this ) : this,
      i = 0;

    for ( ; (elem = elems[i]) != null; i++ ) {

      if ( !keepData && elem.nodeType === 1 ) {
        jQuery.cleanData( getAll( elem ) );
      }

      if ( elem.parentNode ) {
        if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
          setGlobalEval( getAll( elem, "script" ) );
        }
        elem.parentNode.removeChild( elem );
      }
    }

    return this;
  },

  empty: function() {
    var elem,
      i = 0;

    for ( ; (elem = this[i]) != null; i++ ) {
      // Remove element nodes and prevent memory leaks
      if ( elem.nodeType === 1 ) {
        jQuery.cleanData( getAll( elem, false ) );
      }

      // Remove any remaining nodes
      while ( elem.firstChild ) {
        elem.removeChild( elem.firstChild );
      }

      // If this is a select, ensure that it displays empty (#12336)
      // Support: IE<9
      if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
        elem.options.length = 0;
      }
    }

    return this;
  },

  clone: function( dataAndEvents, deepDataAndEvents ) {
    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

    return this.map(function() {
      return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
    });
  },

  html: function( value ) {
    return access( this, function( value ) {
      var elem = this[ 0 ] || {},
        i = 0,
        l = this.length;

      if ( value === undefined ) {
        return elem.nodeType === 1 ?
          elem.innerHTML.replace( rinlinejQuery, "" ) :
          undefined;
      }

      // See if we can take a shortcut and just use innerHTML
      if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
        ( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
        ( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
        !wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

        value = value.replace( rxhtmlTag, "<$1></$2>" );

        try {
          for (; i < l; i++ ) {
            // Remove element nodes and prevent memory leaks
            elem = this[i] || {};
            if ( elem.nodeType === 1 ) {
              jQuery.cleanData( getAll( elem, false ) );
              elem.innerHTML = value;
            }
          }

          elem = 0;

        // If using innerHTML throws an exception, use the fallback method
        } catch(e) {}
      }

      if ( elem ) {
        this.empty().append( value );
      }
    }, null, value, arguments.length );
  },

  replaceWith: function() {
    var arg = arguments[ 0 ];

    // Make the changes, replacing each context element with the new content
    this.domManip( arguments, function( elem ) {
      arg = this.parentNode;

      jQuery.cleanData( getAll( this ) );

      if ( arg ) {
        arg.replaceChild( elem, this );
      }
    });

    // Force removal if there was no new content (e.g., from empty arguments)
    return arg && (arg.length || arg.nodeType) ? this : this.remove();
  },

  detach: function( selector ) {
    return this.remove( selector, true );
  },

  domManip: function( args, callback ) {

    // Flatten any nested arrays
    args = concat.apply( [], args );

    var first, node, hasScripts,
      scripts, doc, fragment,
      i = 0,
      l = this.length,
      set = this,
      iNoClone = l - 1,
      value = args[0],
      isFunction = jQuery.isFunction( value );

    // We can't cloneNode fragments that contain checked, in WebKit
    if ( isFunction ||
        ( l > 1 && typeof value === "string" &&
          !support.checkClone && rchecked.test( value ) ) ) {
      return this.each(function( index ) {
        var self = set.eq( index );
        if ( isFunction ) {
          args[0] = value.call( this, index, self.html() );
        }
        self.domManip( args, callback );
      });
    }

    if ( l ) {
      fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
      first = fragment.firstChild;

      if ( fragment.childNodes.length === 1 ) {
        fragment = first;
      }

      if ( first ) {
        scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
        hasScripts = scripts.length;

        // Use the original fragment for the last item instead of the first because it can end up
        // being emptied incorrectly in certain situations (#8070).
        for ( ; i < l; i++ ) {
          node = fragment;

          if ( i !== iNoClone ) {
            node = jQuery.clone( node, true, true );

            // Keep references to cloned scripts for later restoration
            if ( hasScripts ) {
              jQuery.merge( scripts, getAll( node, "script" ) );
            }
          }

          callback.call( this[i], node, i );
        }

        if ( hasScripts ) {
          doc = scripts[ scripts.length - 1 ].ownerDocument;

          // Reenable scripts
          jQuery.map( scripts, restoreScript );

          // Evaluate executable scripts on first document insertion
          for ( i = 0; i < hasScripts; i++ ) {
            node = scripts[ i ];
            if ( rscriptType.test( node.type || "" ) &&
              !jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

              if ( node.src ) {
                // Optional AJAX dependency, but won't run scripts if not present
                if ( jQuery._evalUrl ) {
                  jQuery._evalUrl( node.src );
                }
              } else {
                jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
              }
            }
          }
        }

        // Fix #11809: Avoid leaking memory
        fragment = first = null;
      }
    }

    return this;
  }
});

jQuery.each({
  appendTo: "append",
  prependTo: "prepend",
  insertBefore: "before",
  insertAfter: "after",
  replaceAll: "replaceWith"
}, function( name, original ) {
  jQuery.fn[ name ] = function( selector ) {
    var elems,
      i = 0,
      ret = [],
      insert = jQuery( selector ),
      last = insert.length - 1;

    for ( ; i <= last; i++ ) {
      elems = i === last ? this : this.clone(true);
      jQuery( insert[i] )[ original ]( elems );

      // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
      push.apply( ret, elems.get() );
    }

    return this.pushStack( ret );
  };
});


var iframe,
  elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
  var style,
    elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

    // getDefaultComputedStyle might be reliably used only on attached element
    display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

      // Use of this method is a temporary fix (more like optmization) until something better comes along,
      // since it was removed from specification and supported only in FF
      style.display : jQuery.css( elem[ 0 ], "display" );

  // We don't have any data stored on the element,
  // so use "detach" method as fast way to get rid of the element
  elem.detach();

  return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
  var doc = document,
    display = elemdisplay[ nodeName ];

  if ( !display ) {
    display = actualDisplay( nodeName, doc );

    // If the simple way fails, read from inside an iframe
    if ( display === "none" || !display ) {

      // Use the already-created iframe if possible
      iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

      // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
      doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

      // Support: IE
      doc.write();
      doc.close();

      display = actualDisplay( nodeName, doc );
      iframe.detach();
    }

    // Store the correct default display
    elemdisplay[ nodeName ] = display;
  }

  return display;
}


(function() {
  var shrinkWrapBlocksVal;

  support.shrinkWrapBlocks = function() {
    if ( shrinkWrapBlocksVal != null ) {
      return shrinkWrapBlocksVal;
    }

    // Will be changed later if needed.
    shrinkWrapBlocksVal = false;

    // Minified: var b,c,d
    var div, body, container;

    body = document.getElementsByTagName( "body" )[ 0 ];
    if ( !body || !body.style ) {
      // Test fired too early or in an unsupported environment, exit.
      return;
    }

    // Setup
    div = document.createElement( "div" );
    container = document.createElement( "div" );
    container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
    body.appendChild( container ).appendChild( div );

    // Support: IE6
    // Check if elements with layout shrink-wrap their children
    if ( typeof div.style.zoom !== strundefined ) {
      // Reset CSS: box-sizing; display; margin; border
      div.style.cssText =
        // Support: Firefox<29, Android 2.3
        // Vendor-prefix box-sizing
        "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
        "box-sizing:content-box;display:block;margin:0;border:0;" +
        "padding:1px;width:1px;zoom:1";
      div.appendChild( document.createElement( "div" ) ).style.width = "5px";
      shrinkWrapBlocksVal = div.offsetWidth !== 3;
    }

    body.removeChild( container );

    return shrinkWrapBlocksVal;
  };

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
  rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
  getStyles = function( elem ) {
    // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    if ( elem.ownerDocument.defaultView.opener ) {
      return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
    }

    return window.getComputedStyle( elem, null );
  };

  curCSS = function( elem, name, computed ) {
    var width, minWidth, maxWidth, ret,
      style = elem.style;

    computed = computed || getStyles( elem );

    // getPropertyValue is only needed for .css('filter') in IE9, see #12537
    ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

    if ( computed ) {

      if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
        ret = jQuery.style( elem, name );
      }

      // A tribute to the "awesome hack by Dean Edwards"
      // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
      // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
      // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
      if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

        // Remember the original values
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;

        // Put in the new values to get a computed value out
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;

        // Revert the changed values
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }

    // Support: IE
    // IE returns zIndex value as an integer.
    return ret === undefined ?
      ret :
      ret + "";
  };
} else if ( document.documentElement.currentStyle ) {
  getStyles = function( elem ) {
    return elem.currentStyle;
  };

  curCSS = function( elem, name, computed ) {
    var left, rs, rsLeft, ret,
      style = elem.style;

    computed = computed || getStyles( elem );
    ret = computed ? computed[ name ] : undefined;

    // Avoid setting ret to empty string here
    // so we don't default to auto
    if ( ret == null && style && style[ name ] ) {
      ret = style[ name ];
    }

    // From the awesome hack by Dean Edwards
    // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

    // If we're not dealing with a regular pixel number
    // but a number that has a weird ending, we need to convert it to pixels
    // but not position css attributes, as those are proportional to the parent element instead
    // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
    if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

      // Remember the original values
      left = style.left;
      rs = elem.runtimeStyle;
      rsLeft = rs && rs.left;

      // Put in the new values to get a computed value out
      if ( rsLeft ) {
        rs.left = elem.currentStyle.left;
      }
      style.left = name === "fontSize" ? "1em" : ret;
      ret = style.pixelLeft + "px";

      // Revert the changed values
      style.left = left;
      if ( rsLeft ) {
        rs.left = rsLeft;
      }
    }

    // Support: IE
    // IE returns zIndex value as an integer.
    return ret === undefined ?
      ret :
      ret + "" || "auto";
  };
}




function addGetHookIf( conditionFn, hookFn ) {
  // Define the hook, we'll check on the first run if it's really needed.
  return {
    get: function() {
      var condition = conditionFn();

      if ( condition == null ) {
        // The test was not ready at this point; screw the hook this time
        // but check again when needed next time.
        return;
      }

      if ( condition ) {
        // Hook not needed (or it's not possible to use it due to missing dependency),
        // remove it.
        // Since there are no other hooks for marginRight, remove the whole object.
        delete this.get;
        return;
      }

      // Hook needed; redefine it so that the support test is not executed again.

      return (this.get = hookFn).apply( this, arguments );
    }
  };
}


(function() {
  // Minified: var b,c,d,e,f,g, h,i
  var div, style, a, pixelPositionVal, boxSizingReliableVal,
    reliableHiddenOffsetsVal, reliableMarginRightVal;

  // Setup
  div = document.createElement( "div" );
  div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
  a = div.getElementsByTagName( "a" )[ 0 ];
  style = a && a.style;

  // Finish early in limited (non-browser) environments
  if ( !style ) {
    return;
  }

  style.cssText = "float:left;opacity:.5";

  // Support: IE<9
  // Make sure that element opacity exists (as opposed to filter)
  support.opacity = style.opacity === "0.5";

  // Verify style float existence
  // (IE uses styleFloat instead of cssFloat)
  support.cssFloat = !!style.cssFloat;

  div.style.backgroundClip = "content-box";
  div.cloneNode( true ).style.backgroundClip = "";
  support.clearCloneStyle = div.style.backgroundClip === "content-box";

  // Support: Firefox<29, Android 2.3
  // Vendor-prefix box-sizing
  support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
    style.WebkitBoxSizing === "";

  jQuery.extend(support, {
    reliableHiddenOffsets: function() {
      if ( reliableHiddenOffsetsVal == null ) {
        computeStyleTests();
      }
      return reliableHiddenOffsetsVal;
    },

    boxSizingReliable: function() {
      if ( boxSizingReliableVal == null ) {
        computeStyleTests();
      }
      return boxSizingReliableVal;
    },

    pixelPosition: function() {
      if ( pixelPositionVal == null ) {
        computeStyleTests();
      }
      return pixelPositionVal;
    },

    // Support: Android 2.3
    reliableMarginRight: function() {
      if ( reliableMarginRightVal == null ) {
        computeStyleTests();
      }
      return reliableMarginRightVal;
    }
  });

  function computeStyleTests() {
    // Minified: var b,c,d,j
    var div, body, container, contents;

    body = document.getElementsByTagName( "body" )[ 0 ];
    if ( !body || !body.style ) {
      // Test fired too early or in an unsupported environment, exit.
      return;
    }

    // Setup
    div = document.createElement( "div" );
    container = document.createElement( "div" );
    container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
    body.appendChild( container ).appendChild( div );

    div.style.cssText =
      // Support: Firefox<29, Android 2.3
      // Vendor-prefix box-sizing
      "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
      "box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
      "border:1px;padding:1px;width:4px;position:absolute";

    // Support: IE<9
    // Assume reasonable values in the absence of getComputedStyle
    pixelPositionVal = boxSizingReliableVal = false;
    reliableMarginRightVal = true;

    // Check for getComputedStyle so that this code is not run in IE<9.
    if ( window.getComputedStyle ) {
      pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
      boxSizingReliableVal =
        ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

      // Support: Android 2.3
      // Div with explicit width and no margin-right incorrectly
      // gets computed margin-right based on width of container (#3333)
      // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
      contents = div.appendChild( document.createElement( "div" ) );

      // Reset CSS: box-sizing; display; margin; border; padding
      contents.style.cssText = div.style.cssText =
        // Support: Firefox<29, Android 2.3
        // Vendor-prefix box-sizing
        "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
        "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
      contents.style.marginRight = contents.style.width = "0";
      div.style.width = "1px";

      reliableMarginRightVal =
        !parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

      div.removeChild( contents );
    }

    // Support: IE8
    // Check if table cells still have offsetWidth/Height when they are set
    // to display:none and there are still other visible table cells in a
    // table row; if so, offsetWidth/Height are not reliable for use when
    // determining if an element has been hidden directly using
    // display:none (it is still safe to use offsets if a parent element is
    // hidden; don safety goggles and see bug #4512 for more information).
    div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
    contents = div.getElementsByTagName( "td" );
    contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
    reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
    if ( reliableHiddenOffsetsVal ) {
      contents[ 0 ].style.display = "";
      contents[ 1 ].style.display = "none";
      reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
    }

    body.removeChild( container );
  }

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
  var ret, name,
    old = {};

  // Remember the old values, and insert the new ones
  for ( name in options ) {
    old[ name ] = elem.style[ name ];
    elem.style[ name ] = options[ name ];
  }

  ret = callback.apply( elem, args || [] );

  // Revert the old values
  for ( name in options ) {
    elem.style[ name ] = old[ name ];
  }

  return ret;
};


var
    ralpha = /alpha\([^)]*\)/i,
  ropacity = /opacity\s*=\s*([^)]*)/,

  // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
  // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  rdisplayswap = /^(none|table(?!-c[ea]).+)/,
  rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
  rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

  cssShow = { position: "absolute", visibility: "hidden", display: "block" },
  cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
  },

  cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

  // shortcut for names that are not vendor prefixed
  if ( name in style ) {
    return name;
  }

  // check for vendor prefixed names
  var capName = name.charAt(0).toUpperCase() + name.slice(1),
    origName = name,
    i = cssPrefixes.length;

  while ( i-- ) {
    name = cssPrefixes[ i ] + capName;
    if ( name in style ) {
      return name;
    }
  }

  return origName;
}

function showHide( elements, show ) {
  var display, elem, hidden,
    values = [],
    index = 0,
    length = elements.length;

  for ( ; index < length; index++ ) {
    elem = elements[ index ];
    if ( !elem.style ) {
      continue;
    }

    values[ index ] = jQuery._data( elem, "olddisplay" );
    display = elem.style.display;
    if ( show ) {
      // Reset the inline display of this element to learn if it is
      // being hidden by cascaded rules or not
      if ( !values[ index ] && display === "none" ) {
        elem.style.display = "";
      }

      // Set elements which have been overridden with display: none
      // in a stylesheet to whatever the default browser style is
      // for such an element
      if ( elem.style.display === "" && isHidden( elem ) ) {
        values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
      }
    } else {
      hidden = isHidden( elem );

      if ( display && display !== "none" || !hidden ) {
        jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
      }
    }
  }

  // Set the display of most of the elements in a second loop
  // to avoid the constant reflow
  for ( index = 0; index < length; index++ ) {
    elem = elements[ index ];
    if ( !elem.style ) {
      continue;
    }
    if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
      elem.style.display = show ? values[ index ] || "" : "none";
    }
  }

  return elements;
}

function setPositiveNumber( elem, value, subtract ) {
  var matches = rnumsplit.exec( value );
  return matches ?
    // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
    value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
  var i = extra === ( isBorderBox ? "border" : "content" ) ?
    // If we already have the right measurement, avoid augmentation
    4 :
    // Otherwise initialize for horizontal or vertical properties
    name === "width" ? 1 : 0,

    val = 0;

  for ( ; i < 4; i += 2 ) {
    // both box models exclude margin, so add it if we want it
    if ( extra === "margin" ) {
      val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
    }

    if ( isBorderBox ) {
      // border-box includes padding, so remove it if we want content
      if ( extra === "content" ) {
        val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
      }

      // at this point, extra isn't border nor margin, so remove border
      if ( extra !== "margin" ) {
        val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
      }
    } else {
      // at this point, extra isn't content, so add padding
      val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

      // at this point, extra isn't content nor padding, so add border
      if ( extra !== "padding" ) {
        val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
      }
    }
  }

  return val;
}

function getWidthOrHeight( elem, name, extra ) {

  // Start with offset property, which is equivalent to the border-box value
  var valueIsBorderBox = true,
    val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
    styles = getStyles( elem ),
    isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

  // some non-html elements return undefined for offsetWidth, so check for null/undefined
  // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
  // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
  if ( val <= 0 || val == null ) {
    // Fall back to computed then uncomputed css if necessary
    val = curCSS( elem, name, styles );
    if ( val < 0 || val == null ) {
      val = elem.style[ name ];
    }

    // Computed unit is not pixels. Stop here and return.
    if ( rnumnonpx.test(val) ) {
      return val;
    }

    // we need the check for style in case a browser which returns unreliable values
    // for getComputedStyle silently falls back to the reliable elem.style
    valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

    // Normalize "", auto, and prepare for extra
    val = parseFloat( val ) || 0;
  }

  // use the active box-sizing model to add/subtract irrelevant styles
  return ( val +
    augmentWidthOrHeight(
      elem,
      name,
      extra || ( isBorderBox ? "border" : "content" ),
      valueIsBorderBox,
      styles
    )
  ) + "px";
}

jQuery.extend({
  // Add in style property hooks for overriding the default
  // behavior of getting and setting a style property
  cssHooks: {
    opacity: {
      get: function( elem, computed ) {
        if ( computed ) {
          // We should always get a number back from opacity
          var ret = curCSS( elem, "opacity" );
          return ret === "" ? "1" : ret;
        }
      }
    }
  },

  // Don't automatically add "px" to these possibly-unitless properties
  cssNumber: {
    "columnCount": true,
    "fillOpacity": true,
    "flexGrow": true,
    "flexShrink": true,
    "fontWeight": true,
    "lineHeight": true,
    "opacity": true,
    "order": true,
    "orphans": true,
    "widows": true,
    "zIndex": true,
    "zoom": true
  },

  // Add in properties whose names you wish to fix before
  // setting or getting the value
  cssProps: {
    // normalize float css property
    "float": support.cssFloat ? "cssFloat" : "styleFloat"
  },

  // Get and set the style property on a DOM Node
  style: function( elem, name, value, extra ) {
    // Don't set styles on text and comment nodes
    if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
      return;
    }

    // Make sure that we're working with the right name
    var ret, type, hooks,
      origName = jQuery.camelCase( name ),
      style = elem.style;

    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

    // gets hook for the prefixed version
    // followed by the unprefixed version
    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    // Check if we're setting a value
    if ( value !== undefined ) {
      type = typeof value;

      // convert relative number strings (+= or -=) to relative numbers. #7345
      if ( type === "string" && (ret = rrelNum.exec( value )) ) {
        value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
        // Fixes bug #9237
        type = "number";
      }

      // Make sure that null and NaN values aren't set. See: #7116
      if ( value == null || value !== value ) {
        return;
      }

      // If a number was passed in, add 'px' to the (except for certain CSS properties)
      if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
        value += "px";
      }

      // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
      // but it would mean to define eight (for every problematic property) identical functions
      if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
        style[ name ] = "inherit";
      }

      // If a hook was provided, use that value, otherwise just set the specified value
      if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

        // Support: IE
        // Swallow errors from 'invalid' CSS values (#5509)
        try {
          style[ name ] = value;
        } catch(e) {}
      }

    } else {
      // If a hook was provided get the non-computed value from there
      if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
        return ret;
      }

      // Otherwise just get the value from the style object
      return style[ name ];
    }
  },

  css: function( elem, name, extra, styles ) {
    var num, val, hooks,
      origName = jQuery.camelCase( name );

    // Make sure that we're working with the right name
    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

    // gets hook for the prefixed version
    // followed by the unprefixed version
    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    // If a hook was provided get the computed value from there
    if ( hooks && "get" in hooks ) {
      val = hooks.get( elem, true, extra );
    }

    // Otherwise, if a way to get the computed value exists, use that
    if ( val === undefined ) {
      val = curCSS( elem, name, styles );
    }

    //convert "normal" to computed value
    if ( val === "normal" && name in cssNormalTransform ) {
      val = cssNormalTransform[ name ];
    }

    // Return, converting to number if forced or a qualifier was provided and val looks numeric
    if ( extra === "" || extra ) {
      num = parseFloat( val );
      return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
    }
    return val;
  }
});

jQuery.each([ "height", "width" ], function( i, name ) {
  jQuery.cssHooks[ name ] = {
    get: function( elem, computed, extra ) {
      if ( computed ) {
        // certain elements can have dimension info if we invisibly show them
        // however, it must have a current display style that would benefit from this
        return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
          jQuery.swap( elem, cssShow, function() {
            return getWidthOrHeight( elem, name, extra );
          }) :
          getWidthOrHeight( elem, name, extra );
      }
    },

    set: function( elem, value, extra ) {
      var styles = extra && getStyles( elem );
      return setPositiveNumber( elem, value, extra ?
        augmentWidthOrHeight(
          elem,
          name,
          extra,
          support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
          styles
        ) : 0
      );
    }
  };
});

if ( !support.opacity ) {
  jQuery.cssHooks.opacity = {
    get: function( elem, computed ) {
      // IE uses filters for opacity
      return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
        ( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
        computed ? "1" : "";
    },

    set: function( elem, value ) {
      var style = elem.style,
        currentStyle = elem.currentStyle,
        opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
        filter = currentStyle && currentStyle.filter || style.filter || "";

      // IE has trouble with opacity if it does not have layout
      // Force it by setting the zoom level
      style.zoom = 1;

      // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
      // if value === "", then remove inline opacity #12685
      if ( ( value >= 1 || value === "" ) &&
          jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
          style.removeAttribute ) {

        // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
        // if "filter:" is present at all, clearType is disabled, we want to avoid this
        // style.removeAttribute is IE Only, but so apparently is this code path...
        style.removeAttribute( "filter" );

        // if there is no filter style applied in a css rule or unset inline opacity, we are done
        if ( value === "" || currentStyle && !currentStyle.filter ) {
          return;
        }
      }

      // otherwise, set new filter values
      style.filter = ralpha.test( filter ) ?
        filter.replace( ralpha, opacity ) :
        filter + " " + opacity;
    }
  };
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
  function( elem, computed ) {
    if ( computed ) {
      // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
      // Work around by temporarily setting element display to inline-block
      return jQuery.swap( elem, { "display": "inline-block" },
        curCSS, [ elem, "marginRight" ] );
    }
  }
);

// These hooks are used by animate to expand properties
jQuery.each({
  margin: "",
  padding: "",
  border: "Width"
}, function( prefix, suffix ) {
  jQuery.cssHooks[ prefix + suffix ] = {
    expand: function( value ) {
      var i = 0,
        expanded = {},

        // assumes a single number if not a string
        parts = typeof value === "string" ? value.split(" ") : [ value ];

      for ( ; i < 4; i++ ) {
        expanded[ prefix + cssExpand[ i ] + suffix ] =
          parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
      }

      return expanded;
    }
  };

  if ( !rmargin.test( prefix ) ) {
    jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
  }
});

jQuery.fn.extend({
  css: function( name, value ) {
    return access( this, function( elem, name, value ) {
      var styles, len,
        map = {},
        i = 0;

      if ( jQuery.isArray( name ) ) {
        styles = getStyles( elem );
        len = name.length;

        for ( ; i < len; i++ ) {
          map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
        }

        return map;
      }

      return value !== undefined ?
        jQuery.style( elem, name, value ) :
        jQuery.css( elem, name );
    }, name, value, arguments.length > 1 );
  },
  show: function() {
    return showHide( this, true );
  },
  hide: function() {
    return showHide( this );
  },
  toggle: function( state ) {
    if ( typeof state === "boolean" ) {
      return state ? this.show() : this.hide();
    }

    return this.each(function() {
      if ( isHidden( this ) ) {
        jQuery( this ).show();
      } else {
        jQuery( this ).hide();
      }
    });
  }
});


function Tween( elem, options, prop, end, easing ) {
  return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
  constructor: Tween,
  init: function( elem, options, prop, end, easing, unit ) {
    this.elem = elem;
    this.prop = prop;
    this.easing = easing || "swing";
    this.options = options;
    this.start = this.now = this.cur();
    this.end = end;
    this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
  },
  cur: function() {
    var hooks = Tween.propHooks[ this.prop ];

    return hooks && hooks.get ?
      hooks.get( this ) :
      Tween.propHooks._default.get( this );
  },
  run: function( percent ) {
    var eased,
      hooks = Tween.propHooks[ this.prop ];

    if ( this.options.duration ) {
      this.pos = eased = jQuery.easing[ this.easing ](
        percent, this.options.duration * percent, 0, 1, this.options.duration
      );
    } else {
      this.pos = eased = percent;
    }
    this.now = ( this.end - this.start ) * eased + this.start;

    if ( this.options.step ) {
      this.options.step.call( this.elem, this.now, this );
    }

    if ( hooks && hooks.set ) {
      hooks.set( this );
    } else {
      Tween.propHooks._default.set( this );
    }
    return this;
  }
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
  _default: {
    get: function( tween ) {
      var result;

      if ( tween.elem[ tween.prop ] != null &&
        (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
        return tween.elem[ tween.prop ];
      }

      // passing an empty string as a 3rd parameter to .css will automatically
      // attempt a parseFloat and fallback to a string if the parse fails
      // so, simple values such as "10px" are parsed to Float.
      // complex values such as "rotate(1rad)" are returned as is.
      result = jQuery.css( tween.elem, tween.prop, "" );
      // Empty strings, null, undefined and "auto" are converted to 0.
      return !result || result === "auto" ? 0 : result;
    },
    set: function( tween ) {
      // use step hook for back compat - use cssHook if its there - use .style if its
      // available and use plain properties where available
      if ( jQuery.fx.step[ tween.prop ] ) {
        jQuery.fx.step[ tween.prop ]( tween );
      } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
        jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
      } else {
        tween.elem[ tween.prop ] = tween.now;
      }
    }
  }
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
  set: function( tween ) {
    if ( tween.elem.nodeType && tween.elem.parentNode ) {
      tween.elem[ tween.prop ] = tween.now;
    }
  }
};

jQuery.easing = {
  linear: function( p ) {
    return p;
  },
  swing: function( p ) {
    return 0.5 - Math.cos( p * Math.PI ) / 2;
  }
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
  fxNow, timerId,
  rfxtypes = /^(?:toggle|show|hide)$/,
  rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
  rrun = /queueHooks$/,
  animationPrefilters = [ defaultPrefilter ],
  tweeners = {
    "*": [ function( prop, value ) {
      var tween = this.createTween( prop, value ),
        target = tween.cur(),
        parts = rfxnum.exec( value ),
        unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

        // Starting value computation is required for potential unit mismatches
        start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
          rfxnum.exec( jQuery.css( tween.elem, prop ) ),
        scale = 1,
        maxIterations = 20;

      if ( start && start[ 3 ] !== unit ) {
        // Trust units reported by jQuery.css
        unit = unit || start[ 3 ];

        // Make sure we update the tween properties later on
        parts = parts || [];

        // Iteratively approximate from a nonzero starting point
        start = +target || 1;

        do {
          // If previous iteration zeroed out, double until we get *something*
          // Use a string for doubling factor so we don't accidentally see scale as unchanged below
          scale = scale || ".5";

          // Adjust and apply
          start = start / scale;
          jQuery.style( tween.elem, prop, start + unit );

        // Update scale, tolerating zero or NaN from tween.cur()
        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
        } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
      }

      // Update tween properties
      if ( parts ) {
        start = tween.start = +start || +target || 0;
        tween.unit = unit;
        // If a +=/-= token was provided, we're doing a relative animation
        tween.end = parts[ 1 ] ?
          start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
          +parts[ 2 ];
      }

      return tween;
    } ]
  };

// Animations created synchronously will run synchronously
function createFxNow() {
  setTimeout(function() {
    fxNow = undefined;
  });
  return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
  var which,
    attrs = { height: type },
    i = 0;

  // if we include width, step value is 1 to do all cssExpand values,
  // if we don't include width, step value is 2 to skip over Left and Right
  includeWidth = includeWidth ? 1 : 0;
  for ( ; i < 4 ; i += 2 - includeWidth ) {
    which = cssExpand[ i ];
    attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
  }

  if ( includeWidth ) {
    attrs.opacity = attrs.width = type;
  }

  return attrs;
}

function createTween( value, prop, animation ) {
  var tween,
    collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
    index = 0,
    length = collection.length;
  for ( ; index < length; index++ ) {
    if ( (tween = collection[ index ].call( animation, prop, value )) ) {

      // we're done with this property
      return tween;
    }
  }
}

function defaultPrefilter( elem, props, opts ) {
  /* jshint validthis: true */
  var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
    anim = this,
    orig = {},
    style = elem.style,
    hidden = elem.nodeType && isHidden( elem ),
    dataShow = jQuery._data( elem, "fxshow" );

  // handle queue: false promises
  if ( !opts.queue ) {
    hooks = jQuery._queueHooks( elem, "fx" );
    if ( hooks.unqueued == null ) {
      hooks.unqueued = 0;
      oldfire = hooks.empty.fire;
      hooks.empty.fire = function() {
        if ( !hooks.unqueued ) {
          oldfire();
        }
      };
    }
    hooks.unqueued++;

    anim.always(function() {
      // doing this makes sure that the complete handler will be called
      // before this completes
      anim.always(function() {
        hooks.unqueued--;
        if ( !jQuery.queue( elem, "fx" ).length ) {
          hooks.empty.fire();
        }
      });
    });
  }

  // height/width overflow pass
  if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
    // Make sure that nothing sneaks out
    // Record all 3 overflow attributes because IE does not
    // change the overflow attribute when overflowX and
    // overflowY are set to the same value
    opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

    // Set display property to inline-block for height/width
    // animations on inline elements that are having width/height animated
    display = jQuery.css( elem, "display" );

    // Test default display if display is currently "none"
    checkDisplay = display === "none" ?
      jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

    if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

      // inline-level elements accept inline-block;
      // block-level elements need to be inline with layout
      if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
        style.display = "inline-block";
      } else {
        style.zoom = 1;
      }
    }
  }

  if ( opts.overflow ) {
    style.overflow = "hidden";
    if ( !support.shrinkWrapBlocks() ) {
      anim.always(function() {
        style.overflow = opts.overflow[ 0 ];
        style.overflowX = opts.overflow[ 1 ];
        style.overflowY = opts.overflow[ 2 ];
      });
    }
  }

  // show/hide pass
  for ( prop in props ) {
    value = props[ prop ];
    if ( rfxtypes.exec( value ) ) {
      delete props[ prop ];
      toggle = toggle || value === "toggle";
      if ( value === ( hidden ? "hide" : "show" ) ) {

        // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
        if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
          hidden = true;
        } else {
          continue;
        }
      }
      orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

    // Any non-fx value stops us from restoring the original display value
    } else {
      display = undefined;
    }
  }

  if ( !jQuery.isEmptyObject( orig ) ) {
    if ( dataShow ) {
      if ( "hidden" in dataShow ) {
        hidden = dataShow.hidden;
      }
    } else {
      dataShow = jQuery._data( elem, "fxshow", {} );
    }

    // store state if its toggle - enables .stop().toggle() to "reverse"
    if ( toggle ) {
      dataShow.hidden = !hidden;
    }
    if ( hidden ) {
      jQuery( elem ).show();
    } else {
      anim.done(function() {
        jQuery( elem ).hide();
      });
    }
    anim.done(function() {
      var prop;
      jQuery._removeData( elem, "fxshow" );
      for ( prop in orig ) {
        jQuery.style( elem, prop, orig[ prop ] );
      }
    });
    for ( prop in orig ) {
      tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

      if ( !( prop in dataShow ) ) {
        dataShow[ prop ] = tween.start;
        if ( hidden ) {
          tween.end = tween.start;
          tween.start = prop === "width" || prop === "height" ? 1 : 0;
        }
      }
    }

  // If this is a noop like .hide().hide(), restore an overwritten display value
  } else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
    style.display = display;
  }
}

function propFilter( props, specialEasing ) {
  var index, name, easing, value, hooks;

  // camelCase, specialEasing and expand cssHook pass
  for ( index in props ) {
    name = jQuery.camelCase( index );
    easing = specialEasing[ name ];
    value = props[ index ];
    if ( jQuery.isArray( value ) ) {
      easing = value[ 1 ];
      value = props[ index ] = value[ 0 ];
    }

    if ( index !== name ) {
      props[ name ] = value;
      delete props[ index ];
    }

    hooks = jQuery.cssHooks[ name ];
    if ( hooks && "expand" in hooks ) {
      value = hooks.expand( value );
      delete props[ name ];

      // not quite $.extend, this wont overwrite keys already present.
      // also - reusing 'index' from above because we have the correct "name"
      for ( index in value ) {
        if ( !( index in props ) ) {
          props[ index ] = value[ index ];
          specialEasing[ index ] = easing;
        }
      }
    } else {
      specialEasing[ name ] = easing;
    }
  }
}

function Animation( elem, properties, options ) {
  var result,
    stopped,
    index = 0,
    length = animationPrefilters.length,
    deferred = jQuery.Deferred().always( function() {
      // don't match elem in the :animated selector
      delete tick.elem;
    }),
    tick = function() {
      if ( stopped ) {
        return false;
      }
      var currentTime = fxNow || createFxNow(),
        remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
        // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
        temp = remaining / animation.duration || 0,
        percent = 1 - temp,
        index = 0,
        length = animation.tweens.length;

      for ( ; index < length ; index++ ) {
        animation.tweens[ index ].run( percent );
      }

      deferred.notifyWith( elem, [ animation, percent, remaining ]);

      if ( percent < 1 && length ) {
        return remaining;
      } else {
        deferred.resolveWith( elem, [ animation ] );
        return false;
      }
    },
    animation = deferred.promise({
      elem: elem,
      props: jQuery.extend( {}, properties ),
      opts: jQuery.extend( true, { specialEasing: {} }, options ),
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(),
      duration: options.duration,
      tweens: [],
      createTween: function( prop, end ) {
        var tween = jQuery.Tween( elem, animation.opts, prop, end,
            animation.opts.specialEasing[ prop ] || animation.opts.easing );
        animation.tweens.push( tween );
        return tween;
      },
      stop: function( gotoEnd ) {
        var index = 0,
          // if we are going to the end, we want to run all the tweens
          // otherwise we skip this part
          length = gotoEnd ? animation.tweens.length : 0;
        if ( stopped ) {
          return this;
        }
        stopped = true;
        for ( ; index < length ; index++ ) {
          animation.tweens[ index ].run( 1 );
        }

        // resolve when we played the last frame
        // otherwise, reject
        if ( gotoEnd ) {
          deferred.resolveWith( elem, [ animation, gotoEnd ] );
        } else {
          deferred.rejectWith( elem, [ animation, gotoEnd ] );
        }
        return this;
      }
    }),
    props = animation.props;

  propFilter( props, animation.opts.specialEasing );

  for ( ; index < length ; index++ ) {
    result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
    if ( result ) {
      return result;
    }
  }

  jQuery.map( props, createTween, animation );

  if ( jQuery.isFunction( animation.opts.start ) ) {
    animation.opts.start.call( elem, animation );
  }

  jQuery.fx.timer(
    jQuery.extend( tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    })
  );

  // attach callbacks from options
  return animation.progress( animation.opts.progress )
    .done( animation.opts.done, animation.opts.complete )
    .fail( animation.opts.fail )
    .always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
  tweener: function( props, callback ) {
    if ( jQuery.isFunction( props ) ) {
      callback = props;
      props = [ "*" ];
    } else {
      props = props.split(" ");
    }

    var prop,
      index = 0,
      length = props.length;

    for ( ; index < length ; index++ ) {
      prop = props[ index ];
      tweeners[ prop ] = tweeners[ prop ] || [];
      tweeners[ prop ].unshift( callback );
    }
  },

  prefilter: function( callback, prepend ) {
    if ( prepend ) {
      animationPrefilters.unshift( callback );
    } else {
      animationPrefilters.push( callback );
    }
  }
});

jQuery.speed = function( speed, easing, fn ) {
  var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
    complete: fn || !fn && easing ||
      jQuery.isFunction( speed ) && speed,
    duration: speed,
    easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
  };

  opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
    opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

  // normalize opt.queue - true/undefined/null -> "fx"
  if ( opt.queue == null || opt.queue === true ) {
    opt.queue = "fx";
  }

  // Queueing
  opt.old = opt.complete;

  opt.complete = function() {
    if ( jQuery.isFunction( opt.old ) ) {
      opt.old.call( this );
    }

    if ( opt.queue ) {
      jQuery.dequeue( this, opt.queue );
    }
  };

  return opt;
};

jQuery.fn.extend({
  fadeTo: function( speed, to, easing, callback ) {

    // show any hidden elements after setting opacity to 0
    return this.filter( isHidden ).css( "opacity", 0 ).show()

      // animate to the value specified
      .end().animate({ opacity: to }, speed, easing, callback );
  },
  animate: function( prop, speed, easing, callback ) {
    var empty = jQuery.isEmptyObject( prop ),
      optall = jQuery.speed( speed, easing, callback ),
      doAnimation = function() {
        // Operate on a copy of prop so per-property easing won't be lost
        var anim = Animation( this, jQuery.extend( {}, prop ), optall );

        // Empty animations, or finishing resolves immediately
        if ( empty || jQuery._data( this, "finish" ) ) {
          anim.stop( true );
        }
      };
      doAnimation.finish = doAnimation;

    return empty || optall.queue === false ?
      this.each( doAnimation ) :
      this.queue( optall.queue, doAnimation );
  },
  stop: function( type, clearQueue, gotoEnd ) {
    var stopQueue = function( hooks ) {
      var stop = hooks.stop;
      delete hooks.stop;
      stop( gotoEnd );
    };

    if ( typeof type !== "string" ) {
      gotoEnd = clearQueue;
      clearQueue = type;
      type = undefined;
    }
    if ( clearQueue && type !== false ) {
      this.queue( type || "fx", [] );
    }

    return this.each(function() {
      var dequeue = true,
        index = type != null && type + "queueHooks",
        timers = jQuery.timers,
        data = jQuery._data( this );

      if ( index ) {
        if ( data[ index ] && data[ index ].stop ) {
          stopQueue( data[ index ] );
        }
      } else {
        for ( index in data ) {
          if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
            stopQueue( data[ index ] );
          }
        }
      }

      for ( index = timers.length; index--; ) {
        if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
          timers[ index ].anim.stop( gotoEnd );
          dequeue = false;
          timers.splice( index, 1 );
        }
      }

      // start the next in the queue if the last step wasn't forced
      // timers currently will call their complete callbacks, which will dequeue
      // but only if they were gotoEnd
      if ( dequeue || !gotoEnd ) {
        jQuery.dequeue( this, type );
      }
    });
  },
  finish: function( type ) {
    if ( type !== false ) {
      type = type || "fx";
    }
    return this.each(function() {
      var index,
        data = jQuery._data( this ),
        queue = data[ type + "queue" ],
        hooks = data[ type + "queueHooks" ],
        timers = jQuery.timers,
        length = queue ? queue.length : 0;

      // enable finishing flag on private data
      data.finish = true;

      // empty the queue first
      jQuery.queue( this, type, [] );

      if ( hooks && hooks.stop ) {
        hooks.stop.call( this, true );
      }

      // look for any active animations, and finish them
      for ( index = timers.length; index--; ) {
        if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
          timers[ index ].anim.stop( true );
          timers.splice( index, 1 );
        }
      }

      // look for any animations in the old queue and finish them
      for ( index = 0; index < length; index++ ) {
        if ( queue[ index ] && queue[ index ].finish ) {
          queue[ index ].finish.call( this );
        }
      }

      // turn off finishing flag
      delete data.finish;
    });
  }
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
  var cssFn = jQuery.fn[ name ];
  jQuery.fn[ name ] = function( speed, easing, callback ) {
    return speed == null || typeof speed === "boolean" ?
      cssFn.apply( this, arguments ) :
      this.animate( genFx( name, true ), speed, easing, callback );
  };
});

// Generate shortcuts for custom animations
jQuery.each({
  slideDown: genFx("show"),
  slideUp: genFx("hide"),
  slideToggle: genFx("toggle"),
  fadeIn: { opacity: "show" },
  fadeOut: { opacity: "hide" },
  fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
  jQuery.fn[ name ] = function( speed, easing, callback ) {
    return this.animate( props, speed, easing, callback );
  };
});

jQuery.timers = [];
jQuery.fx.tick = function() {
  var timer,
    timers = jQuery.timers,
    i = 0;

  fxNow = jQuery.now();

  for ( ; i < timers.length; i++ ) {
    timer = timers[ i ];
    // Checks the timer has not already been removed
    if ( !timer() && timers[ i ] === timer ) {
      timers.splice( i--, 1 );
    }
  }

  if ( !timers.length ) {
    jQuery.fx.stop();
  }
  fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
  jQuery.timers.push( timer );
  if ( timer() ) {
    jQuery.fx.start();
  } else {
    jQuery.timers.pop();
  }
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
  if ( !timerId ) {
    timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
  }
};

jQuery.fx.stop = function() {
  clearInterval( timerId );
  timerId = null;
};

jQuery.fx.speeds = {
  slow: 600,
  fast: 200,
  // Default speed
  _default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
  time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
  type = type || "fx";

  return this.queue( type, function( next, hooks ) {
    var timeout = setTimeout( next, time );
    hooks.stop = function() {
      clearTimeout( timeout );
    };
  });
};


(function() {
  // Minified: var a,b,c,d,e
  var input, div, select, a, opt;

  // Setup
  div = document.createElement( "div" );
  div.setAttribute( "className", "t" );
  div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
  a = div.getElementsByTagName("a")[ 0 ];

  // First batch of tests.
  select = document.createElement("select");
  opt = select.appendChild( document.createElement("option") );
  input = div.getElementsByTagName("input")[ 0 ];

  a.style.cssText = "top:1px";

  // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
  support.getSetAttribute = div.className !== "t";

  // Get the style information from getAttribute
  // (IE uses .cssText instead)
  support.style = /top/.test( a.getAttribute("style") );

  // Make sure that URLs aren't manipulated
  // (IE normalizes it by default)
  support.hrefNormalized = a.getAttribute("href") === "/a";

  // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
  support.checkOn = !!input.value;

  // Make sure that a selected-by-default option has a working selected property.
  // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
  support.optSelected = opt.selected;

  // Tests for enctype support on a form (#6743)
  support.enctype = !!document.createElement("form").enctype;

  // Make sure that the options inside disabled selects aren't marked as disabled
  // (WebKit marks them as disabled)
  select.disabled = true;
  support.optDisabled = !opt.disabled;

  // Support: IE8 only
  // Check if we can trust getAttribute("value")
  input = document.createElement( "input" );
  input.setAttribute( "value", "" );
  support.input = input.getAttribute( "value" ) === "";

  // Check if an input maintains its value after becoming a radio
  input.value = "t";
  input.setAttribute( "type", "radio" );
  support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
  val: function( value ) {
    var hooks, ret, isFunction,
      elem = this[0];

    if ( !arguments.length ) {
      if ( elem ) {
        hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

        if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
          return ret;
        }

        ret = elem.value;

        return typeof ret === "string" ?
          // handle most common string cases
          ret.replace(rreturn, "") :
          // handle cases where value is null/undef or number
          ret == null ? "" : ret;
      }

      return;
    }

    isFunction = jQuery.isFunction( value );

    return this.each(function( i ) {
      var val;

      if ( this.nodeType !== 1 ) {
        return;
      }

      if ( isFunction ) {
        val = value.call( this, i, jQuery( this ).val() );
      } else {
        val = value;
      }

      // Treat null/undefined as ""; convert numbers to string
      if ( val == null ) {
        val = "";
      } else if ( typeof val === "number" ) {
        val += "";
      } else if ( jQuery.isArray( val ) ) {
        val = jQuery.map( val, function( value ) {
          return value == null ? "" : value + "";
        });
      }

      hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

      // If set returns undefined, fall back to normal setting
      if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
        this.value = val;
      }
    });
  }
});

jQuery.extend({
  valHooks: {
    option: {
      get: function( elem ) {
        var val = jQuery.find.attr( elem, "value" );
        return val != null ?
          val :
          // Support: IE10-11+
          // option.text throws exceptions (#14686, #14858)
          jQuery.trim( jQuery.text( elem ) );
      }
    },
    select: {
      get: function( elem ) {
        var value, option,
          options = elem.options,
          index = elem.selectedIndex,
          one = elem.type === "select-one" || index < 0,
          values = one ? null : [],
          max = one ? index + 1 : options.length,
          i = index < 0 ?
            max :
            one ? index : 0;

        // Loop through all the selected options
        for ( ; i < max; i++ ) {
          option = options[ i ];

          // oldIE doesn't update selected after form reset (#2551)
          if ( ( option.selected || i === index ) &&
              // Don't return options that are disabled or in a disabled optgroup
              ( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
              ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

            // Get the specific value for the option
            value = jQuery( option ).val();

            // We don't need an array for one selects
            if ( one ) {
              return value;
            }

            // Multi-Selects return an array
            values.push( value );
          }
        }

        return values;
      },

      set: function( elem, value ) {
        var optionSet, option,
          options = elem.options,
          values = jQuery.makeArray( value ),
          i = options.length;

        while ( i-- ) {
          option = options[ i ];

          if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

            // Support: IE6
            // When new option element is added to select box we need to
            // force reflow of newly added node in order to workaround delay
            // of initialization properties
            try {
              option.selected = optionSet = true;

            } catch ( _ ) {

              // Will be executed only in IE6
              option.scrollHeight;
            }

          } else {
            option.selected = false;
          }
        }

        // Force browsers to behave consistently when non-matching value is set
        if ( !optionSet ) {
          elem.selectedIndex = -1;
        }

        return options;
      }
    }
  }
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
  jQuery.valHooks[ this ] = {
    set: function( elem, value ) {
      if ( jQuery.isArray( value ) ) {
        return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
      }
    }
  };
  if ( !support.checkOn ) {
    jQuery.valHooks[ this ].get = function( elem ) {
      // Support: Webkit
      // "" is returned instead of "on" if a value isn't specified
      return elem.getAttribute("value") === null ? "on" : elem.value;
    };
  }
});




var nodeHook, boolHook,
  attrHandle = jQuery.expr.attrHandle,
  ruseDefault = /^(?:checked|selected)$/i,
  getSetAttribute = support.getSetAttribute,
  getSetInput = support.input;

jQuery.fn.extend({
  attr: function( name, value ) {
    return access( this, jQuery.attr, name, value, arguments.length > 1 );
  },

  removeAttr: function( name ) {
    return this.each(function() {
      jQuery.removeAttr( this, name );
    });
  }
});

jQuery.extend({
  attr: function( elem, name, value ) {
    var hooks, ret,
      nType = elem.nodeType;

    // don't get/set attributes on text, comment and attribute nodes
    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
      return;
    }

    // Fallback to prop when attributes are not supported
    if ( typeof elem.getAttribute === strundefined ) {
      return jQuery.prop( elem, name, value );
    }

    // All attributes are lowercase
    // Grab necessary hook if one is defined
    if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
      name = name.toLowerCase();
      hooks = jQuery.attrHooks[ name ] ||
        ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
    }

    if ( value !== undefined ) {

      if ( value === null ) {
        jQuery.removeAttr( elem, name );

      } else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
        return ret;

      } else {
        elem.setAttribute( name, value + "" );
        return value;
      }

    } else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
      return ret;

    } else {
      ret = jQuery.find.attr( elem, name );

      // Non-existent attributes return null, we normalize to undefined
      return ret == null ?
        undefined :
        ret;
    }
  },

  removeAttr: function( elem, value ) {
    var name, propName,
      i = 0,
      attrNames = value && value.match( rnotwhite );

    if ( attrNames && elem.nodeType === 1 ) {
      while ( (name = attrNames[i++]) ) {
        propName = jQuery.propFix[ name ] || name;

        // Boolean attributes get special treatment (#10870)
        if ( jQuery.expr.match.bool.test( name ) ) {
          // Set corresponding property to false
          if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
            elem[ propName ] = false;
          // Support: IE<9
          // Also clear defaultChecked/defaultSelected (if appropriate)
          } else {
            elem[ jQuery.camelCase( "default-" + name ) ] =
              elem[ propName ] = false;
          }

        // See #9699 for explanation of this approach (setting first, then removal)
        } else {
          jQuery.attr( elem, name, "" );
        }

        elem.removeAttribute( getSetAttribute ? name : propName );
      }
    }
  },

  attrHooks: {
    type: {
      set: function( elem, value ) {
        if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
          // Setting the type on a radio button after the value resets the value in IE6-9
          // Reset value to default in case type is set after value during creation
          var val = elem.value;
          elem.setAttribute( "type", value );
          if ( val ) {
            elem.value = val;
          }
          return value;
        }
      }
    }
  }
});

// Hook for boolean attributes
boolHook = {
  set: function( elem, value, name ) {
    if ( value === false ) {
      // Remove boolean attributes when set to false
      jQuery.removeAttr( elem, name );
    } else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
      // IE<8 needs the *property* name
      elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

    // Use defaultChecked and defaultSelected for oldIE
    } else {
      elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
    }

    return name;
  }
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

  var getter = attrHandle[ name ] || jQuery.find.attr;

  attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
    function( elem, name, isXML ) {
      var ret, handle;
      if ( !isXML ) {
        // Avoid an infinite loop by temporarily removing this function from the getter
        handle = attrHandle[ name ];
        attrHandle[ name ] = ret;
        ret = getter( elem, name, isXML ) != null ?
          name.toLowerCase() :
          null;
        attrHandle[ name ] = handle;
      }
      return ret;
    } :
    function( elem, name, isXML ) {
      if ( !isXML ) {
        return elem[ jQuery.camelCase( "default-" + name ) ] ?
          name.toLowerCase() :
          null;
      }
    };
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
  jQuery.attrHooks.value = {
    set: function( elem, value, name ) {
      if ( jQuery.nodeName( elem, "input" ) ) {
        // Does not return so that setAttribute is also used
        elem.defaultValue = value;
      } else {
        // Use nodeHook if defined (#1954); otherwise setAttribute is fine
        return nodeHook && nodeHook.set( elem, value, name );
      }
    }
  };
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

  // Use this for any attribute in IE6/7
  // This fixes almost every IE6/7 issue
  nodeHook = {
    set: function( elem, value, name ) {
      // Set the existing or create a new attribute node
      var ret = elem.getAttributeNode( name );
      if ( !ret ) {
        elem.setAttributeNode(
          (ret = elem.ownerDocument.createAttribute( name ))
        );
      }

      ret.value = value += "";

      // Break association with cloned elements by also using setAttribute (#9646)
      if ( name === "value" || value === elem.getAttribute( name ) ) {
        return value;
      }
    }
  };

  // Some attributes are constructed with empty-string values when not defined
  attrHandle.id = attrHandle.name = attrHandle.coords =
    function( elem, name, isXML ) {
      var ret;
      if ( !isXML ) {
        return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
          ret.value :
          null;
      }
    };

  // Fixing value retrieval on a button requires this module
  jQuery.valHooks.button = {
    get: function( elem, name ) {
      var ret = elem.getAttributeNode( name );
      if ( ret && ret.specified ) {
        return ret.value;
      }
    },
    set: nodeHook.set
  };

  // Set contenteditable to false on removals(#10429)
  // Setting to empty string throws an error as an invalid value
  jQuery.attrHooks.contenteditable = {
    set: function( elem, value, name ) {
      nodeHook.set( elem, value === "" ? false : value, name );
    }
  };

  // Set width and height to auto instead of 0 on empty string( Bug #8150 )
  // This is for removals
  jQuery.each([ "width", "height" ], function( i, name ) {
    jQuery.attrHooks[ name ] = {
      set: function( elem, value ) {
        if ( value === "" ) {
          elem.setAttribute( name, "auto" );
          return value;
        }
      }
    };
  });
}

if ( !support.style ) {
  jQuery.attrHooks.style = {
    get: function( elem ) {
      // Return undefined in the case of empty string
      // Note: IE uppercases css property names, but if we were to .toLowerCase()
      // .cssText, that would destroy case senstitivity in URL's, like in "background"
      return elem.style.cssText || undefined;
    },
    set: function( elem, value ) {
      return ( elem.style.cssText = value + "" );
    }
  };
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
  rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
  prop: function( name, value ) {
    return access( this, jQuery.prop, name, value, arguments.length > 1 );
  },

  removeProp: function( name ) {
    name = jQuery.propFix[ name ] || name;
    return this.each(function() {
      // try/catch handles cases where IE balks (such as removing a property on window)
      try {
        this[ name ] = undefined;
        delete this[ name ];
      } catch( e ) {}
    });
  }
});

jQuery.extend({
  propFix: {
    "for": "htmlFor",
    "class": "className"
  },

  prop: function( elem, name, value ) {
    var ret, hooks, notxml,
      nType = elem.nodeType;

    // don't get/set properties on text, comment and attribute nodes
    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
      return;
    }

    notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

    if ( notxml ) {
      // Fix name and attach hooks
      name = jQuery.propFix[ name ] || name;
      hooks = jQuery.propHooks[ name ];
    }

    if ( value !== undefined ) {
      return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
        ret :
        ( elem[ name ] = value );

    } else {
      return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
        ret :
        elem[ name ];
    }
  },

  propHooks: {
    tabIndex: {
      get: function( elem ) {
        // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
        // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
        // Use proper attribute retrieval(#12072)
        var tabindex = jQuery.find.attr( elem, "tabindex" );

        return tabindex ?
          parseInt( tabindex, 10 ) :
          rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
            0 :
            -1;
      }
    }
  }
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
  // href/src property should get the full normalized URL (#10299/#12915)
  jQuery.each([ "href", "src" ], function( i, name ) {
    jQuery.propHooks[ name ] = {
      get: function( elem ) {
        return elem.getAttribute( name, 4 );
      }
    };
  });
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
  jQuery.propHooks.selected = {
    get: function( elem ) {
      var parent = elem.parentNode;

      if ( parent ) {
        parent.selectedIndex;

        // Make sure that it also works with optgroups, see #5701
        if ( parent.parentNode ) {
          parent.parentNode.selectedIndex;
        }
      }
      return null;
    }
  };
}

jQuery.each([
  "tabIndex",
  "readOnly",
  "maxLength",
  "cellSpacing",
  "cellPadding",
  "rowSpan",
  "colSpan",
  "useMap",
  "frameBorder",
  "contentEditable"
], function() {
  jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
  jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
  addClass: function( value ) {
    var classes, elem, cur, clazz, j, finalValue,
      i = 0,
      len = this.length,
      proceed = typeof value === "string" && value;

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( j ) {
        jQuery( this ).addClass( value.call( this, j, this.className ) );
      });
    }

    if ( proceed ) {
      // The disjunction here is for better compressibility (see removeClass)
      classes = ( value || "" ).match( rnotwhite ) || [];

      for ( ; i < len; i++ ) {
        elem = this[ i ];
        cur = elem.nodeType === 1 && ( elem.className ?
          ( " " + elem.className + " " ).replace( rclass, " " ) :
          " "
        );

        if ( cur ) {
          j = 0;
          while ( (clazz = classes[j++]) ) {
            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
              cur += clazz + " ";
            }
          }

          // only assign if different to avoid unneeded rendering.
          finalValue = jQuery.trim( cur );
          if ( elem.className !== finalValue ) {
            elem.className = finalValue;
          }
        }
      }
    }

    return this;
  },

  removeClass: function( value ) {
    var classes, elem, cur, clazz, j, finalValue,
      i = 0,
      len = this.length,
      proceed = arguments.length === 0 || typeof value === "string" && value;

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( j ) {
        jQuery( this ).removeClass( value.call( this, j, this.className ) );
      });
    }
    if ( proceed ) {
      classes = ( value || "" ).match( rnotwhite ) || [];

      for ( ; i < len; i++ ) {
        elem = this[ i ];
        // This expression is here for better compressibility (see addClass)
        cur = elem.nodeType === 1 && ( elem.className ?
          ( " " + elem.className + " " ).replace( rclass, " " ) :
          ""
        );

        if ( cur ) {
          j = 0;
          while ( (clazz = classes[j++]) ) {
            // Remove *all* instances
            while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
              cur = cur.replace( " " + clazz + " ", " " );
            }
          }

          // only assign if different to avoid unneeded rendering.
          finalValue = value ? jQuery.trim( cur ) : "";
          if ( elem.className !== finalValue ) {
            elem.className = finalValue;
          }
        }
      }
    }

    return this;
  },

  toggleClass: function( value, stateVal ) {
    var type = typeof value;

    if ( typeof stateVal === "boolean" && type === "string" ) {
      return stateVal ? this.addClass( value ) : this.removeClass( value );
    }

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( i ) {
        jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
      });
    }

    return this.each(function() {
      if ( type === "string" ) {
        // toggle individual class names
        var className,
          i = 0,
          self = jQuery( this ),
          classNames = value.match( rnotwhite ) || [];

        while ( (className = classNames[ i++ ]) ) {
          // check each className given, space separated list
          if ( self.hasClass( className ) ) {
            self.removeClass( className );
          } else {
            self.addClass( className );
          }
        }

      // Toggle whole class name
      } else if ( type === strundefined || type === "boolean" ) {
        if ( this.className ) {
          // store className if set
          jQuery._data( this, "__className__", this.className );
        }

        // If the element has a class name or if we're passed "false",
        // then remove the whole classname (if there was one, the above saved it).
        // Otherwise bring back whatever was previously saved (if anything),
        // falling back to the empty string if nothing was stored.
        this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
      }
    });
  },

  hasClass: function( selector ) {
    var className = " " + selector + " ",
      i = 0,
      l = this.length;
    for ( ; i < l; i++ ) {
      if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
        return true;
      }
    }

    return false;
  }
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

  // Handle event binding
  jQuery.fn[ name ] = function( data, fn ) {
    return arguments.length > 0 ?
      this.on( name, null, data, fn ) :
      this.trigger( name );
  };
});

jQuery.fn.extend({
  hover: function( fnOver, fnOut ) {
    return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
  },

  bind: function( types, data, fn ) {
    return this.on( types, null, data, fn );
  },
  unbind: function( types, fn ) {
    return this.off( types, null, fn );
  },

  delegate: function( selector, types, data, fn ) {
    return this.on( types, selector, data, fn );
  },
  undelegate: function( selector, types, fn ) {
    // ( namespace ) or ( selector, types [, fn] )
    return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
  }
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
  // Attempt to parse using the native JSON parser first
  if ( window.JSON && window.JSON.parse ) {
    // Support: Android 2.3
    // Workaround failure to string-cast null input
    return window.JSON.parse( data + "" );
  }

  var requireNonComma,
    depth = null,
    str = jQuery.trim( data + "" );

  // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
  // after removing valid tokens
  return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

    // Force termination if we see a misplaced comma
    if ( requireNonComma && comma ) {
      depth = 0;
    }

    // Perform no more replacements after returning to outermost depth
    if ( depth === 0 ) {
      return token;
    }

    // Commas must not follow "[", "{", or ","
    requireNonComma = open || comma;

    // Determine new depth
    // array/object open ("[" or "{"): depth += true - false (increment)
    // array/object close ("]" or "}"): depth += false - true (decrement)
    // other cases ("," or primitive): depth += true - true (numeric cast)
    depth += !close - !open;

    // Remove this token
    return "";
  }) ) ?
    ( Function( "return " + str ) )() :
    jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
  var xml, tmp;
  if ( !data || typeof data !== "string" ) {
    return null;
  }
  try {
    if ( window.DOMParser ) { // Standard
      tmp = new DOMParser();
      xml = tmp.parseFromString( data, "text/xml" );
    } else { // IE
      xml = new ActiveXObject( "Microsoft.XMLDOM" );
      xml.async = "false";
      xml.loadXML( data );
    }
  } catch( e ) {
    xml = undefined;
  }
  if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
    jQuery.error( "Invalid XML: " + data );
  }
  return xml;
};


var
  // Document location
  ajaxLocParts,
  ajaxLocation,

  rhash = /#.*$/,
  rts = /([?&])_=[^&]*/,
  rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
  // #7653, #8125, #8152: local protocol detection
  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
  rnoContent = /^(?:GET|HEAD)$/,
  rprotocol = /^\/\//,
  rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

  /* Prefilters
   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
   * 2) These are called:
   *    - BEFORE asking for a transport
   *    - AFTER param serialization (s.data is a string if s.processData is true)
   * 3) key is the dataType
   * 4) the catchall symbol "*" can be used
   * 5) execution will start with transport dataType and THEN continue down to "*" if needed
   */
  prefilters = {},

  /* Transports bindings
   * 1) key is the dataType
   * 2) the catchall symbol "*" can be used
   * 3) selection will start with transport dataType and THEN go to "*" if needed
   */
  transports = {},

  // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
  allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
  ajaxLocation = location.href;
} catch( e ) {
  // Use the href attribute of an A element
  // since IE will modify it given document.location
  ajaxLocation = document.createElement( "a" );
  ajaxLocation.href = "";
  ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

  // dataTypeExpression is optional and defaults to "*"
  return function( dataTypeExpression, func ) {

    if ( typeof dataTypeExpression !== "string" ) {
      func = dataTypeExpression;
      dataTypeExpression = "*";
    }

    var dataType,
      i = 0,
      dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

    if ( jQuery.isFunction( func ) ) {
      // For each dataType in the dataTypeExpression
      while ( (dataType = dataTypes[i++]) ) {
        // Prepend if requested
        if ( dataType.charAt( 0 ) === "+" ) {
          dataType = dataType.slice( 1 ) || "*";
          (structure[ dataType ] = structure[ dataType ] || []).unshift( func );

        // Otherwise append
        } else {
          (structure[ dataType ] = structure[ dataType ] || []).push( func );
        }
      }
    }
  };
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

  var inspected = {},
    seekingTransport = ( structure === transports );

  function inspect( dataType ) {
    var selected;
    inspected[ dataType ] = true;
    jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
      var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
      if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
        options.dataTypes.unshift( dataTypeOrTransport );
        inspect( dataTypeOrTransport );
        return false;
      } else if ( seekingTransport ) {
        return !( selected = dataTypeOrTransport );
      }
    });
    return selected;
  }

  return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
  var deep, key,
    flatOptions = jQuery.ajaxSettings.flatOptions || {};

  for ( key in src ) {
    if ( src[ key ] !== undefined ) {
      ( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
    }
  }
  if ( deep ) {
    jQuery.extend( true, target, deep );
  }

  return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
  var firstDataType, ct, finalDataType, type,
    contents = s.contents,
    dataTypes = s.dataTypes;

  // Remove auto dataType and get content-type in the process
  while ( dataTypes[ 0 ] === "*" ) {
    dataTypes.shift();
    if ( ct === undefined ) {
      ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
    }
  }

  // Check if we're dealing with a known content-type
  if ( ct ) {
    for ( type in contents ) {
      if ( contents[ type ] && contents[ type ].test( ct ) ) {
        dataTypes.unshift( type );
        break;
      }
    }
  }

  // Check to see if we have a response for the expected dataType
  if ( dataTypes[ 0 ] in responses ) {
    finalDataType = dataTypes[ 0 ];
  } else {
    // Try convertible dataTypes
    for ( type in responses ) {
      if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
        finalDataType = type;
        break;
      }
      if ( !firstDataType ) {
        firstDataType = type;
      }
    }
    // Or just use first one
    finalDataType = finalDataType || firstDataType;
  }

  // If we found a dataType
  // We add the dataType to the list if needed
  // and return the corresponding response
  if ( finalDataType ) {
    if ( finalDataType !== dataTypes[ 0 ] ) {
      dataTypes.unshift( finalDataType );
    }
    return responses[ finalDataType ];
  }
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
  var conv2, current, conv, tmp, prev,
    converters = {},
    // Work with a copy of dataTypes in case we need to modify it for conversion
    dataTypes = s.dataTypes.slice();

  // Create converters map with lowercased keys
  if ( dataTypes[ 1 ] ) {
    for ( conv in s.converters ) {
      converters[ conv.toLowerCase() ] = s.converters[ conv ];
    }
  }

  current = dataTypes.shift();

  // Convert to each sequential dataType
  while ( current ) {

    if ( s.responseFields[ current ] ) {
      jqXHR[ s.responseFields[ current ] ] = response;
    }

    // Apply the dataFilter if provided
    if ( !prev && isSuccess && s.dataFilter ) {
      response = s.dataFilter( response, s.dataType );
    }

    prev = current;
    current = dataTypes.shift();

    if ( current ) {

      // There's only work to do if current dataType is non-auto
      if ( current === "*" ) {

        current = prev;

      // Convert response if prev dataType is non-auto and differs from current
      } else if ( prev !== "*" && prev !== current ) {

        // Seek a direct converter
        conv = converters[ prev + " " + current ] || converters[ "* " + current ];

        // If none found, seek a pair
        if ( !conv ) {
          for ( conv2 in converters ) {

            // If conv2 outputs current
            tmp = conv2.split( " " );
            if ( tmp[ 1 ] === current ) {

              // If prev can be converted to accepted input
              conv = converters[ prev + " " + tmp[ 0 ] ] ||
                converters[ "* " + tmp[ 0 ] ];
              if ( conv ) {
                // Condense equivalence converters
                if ( conv === true ) {
                  conv = converters[ conv2 ];

                // Otherwise, insert the intermediate dataType
                } else if ( converters[ conv2 ] !== true ) {
                  current = tmp[ 0 ];
                  dataTypes.unshift( tmp[ 1 ] );
                }
                break;
              }
            }
          }
        }

        // Apply converter (if not an equivalence)
        if ( conv !== true ) {

          // Unless errors are allowed to bubble, catch and return them
          if ( conv && s[ "throws" ] ) {
            response = conv( response );
          } else {
            try {
              response = conv( response );
            } catch ( e ) {
              return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
            }
          }
        }
      }
    }
  }

  return { state: "success", data: response };
}

jQuery.extend({

  // Counter for holding the number of active queries
  active: 0,

  // Last-Modified header cache for next request
  lastModified: {},
  etag: {},

  ajaxSettings: {
    url: ajaxLocation,
    type: "GET",
    isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
    global: true,
    processData: true,
    async: true,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    /*
    timeout: 0,
    data: null,
    dataType: null,
    username: null,
    password: null,
    cache: null,
    throws: false,
    traditional: false,
    headers: {},
    */

    accepts: {
      "*": allTypes,
      text: "text/plain",
      html: "text/html",
      xml: "application/xml, text/xml",
      json: "application/json, text/javascript"
    },

    contents: {
      xml: /xml/,
      html: /html/,
      json: /json/
    },

    responseFields: {
      xml: "responseXML",
      text: "responseText",
      json: "responseJSON"
    },

    // Data converters
    // Keys separate source (or catchall "*") and destination types with a single space
    converters: {

      // Convert anything to text
      "* text": String,

      // Text to html (true = no transformation)
      "text html": true,

      // Evaluate text as a json expression
      "text json": jQuery.parseJSON,

      // Parse text as xml
      "text xml": jQuery.parseXML
    },

    // For options that shouldn't be deep extended:
    // you can add your own custom options here if
    // and when you create one that shouldn't be
    // deep extended (see ajaxExtend)
    flatOptions: {
      url: true,
      context: true
    }
  },

  // Creates a full fledged settings object into target
  // with both ajaxSettings and settings fields.
  // If target is omitted, writes into ajaxSettings.
  ajaxSetup: function( target, settings ) {
    return settings ?

      // Building a settings object
      ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

      // Extending ajaxSettings
      ajaxExtend( jQuery.ajaxSettings, target );
  },

  ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
  ajaxTransport: addToPrefiltersOrTransports( transports ),

  // Main method
  ajax: function( url, options ) {

    // If url is an object, simulate pre-1.5 signature
    if ( typeof url === "object" ) {
      options = url;
      url = undefined;
    }

    // Force options to be an object
    options = options || {};

    var // Cross-domain detection vars
      parts,
      // Loop variable
      i,
      // URL without anti-cache param
      cacheURL,
      // Response headers as string
      responseHeadersString,
      // timeout handle
      timeoutTimer,

      // To know if global events are to be dispatched
      fireGlobals,

      transport,
      // Response headers
      responseHeaders,
      // Create the final options object
      s = jQuery.ajaxSetup( {}, options ),
      // Callbacks context
      callbackContext = s.context || s,
      // Context for global events is callbackContext if it is a DOM node or jQuery collection
      globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
        jQuery( callbackContext ) :
        jQuery.event,
      // Deferreds
      deferred = jQuery.Deferred(),
      completeDeferred = jQuery.Callbacks("once memory"),
      // Status-dependent callbacks
      statusCode = s.statusCode || {},
      // Headers (they are sent all at once)
      requestHeaders = {},
      requestHeadersNames = {},
      // The jqXHR state
      state = 0,
      // Default abort message
      strAbort = "canceled",
      // Fake xhr
      jqXHR = {
        readyState: 0,

        // Builds headers hashtable if needed
        getResponseHeader: function( key ) {
          var match;
          if ( state === 2 ) {
            if ( !responseHeaders ) {
              responseHeaders = {};
              while ( (match = rheaders.exec( responseHeadersString )) ) {
                responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
              }
            }
            match = responseHeaders[ key.toLowerCase() ];
          }
          return match == null ? null : match;
        },

        // Raw string
        getAllResponseHeaders: function() {
          return state === 2 ? responseHeadersString : null;
        },

        // Caches the header
        setRequestHeader: function( name, value ) {
          var lname = name.toLowerCase();
          if ( !state ) {
            name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
            requestHeaders[ name ] = value;
          }
          return this;
        },

        // Overrides response content-type header
        overrideMimeType: function( type ) {
          if ( !state ) {
            s.mimeType = type;
          }
          return this;
        },

        // Status-dependent callbacks
        statusCode: function( map ) {
          var code;
          if ( map ) {
            if ( state < 2 ) {
              for ( code in map ) {
                // Lazy-add the new callback in a way that preserves old ones
                statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
              }
            } else {
              // Execute the appropriate callbacks
              jqXHR.always( map[ jqXHR.status ] );
            }
          }
          return this;
        },

        // Cancel the request
        abort: function( statusText ) {
          var finalText = statusText || strAbort;
          if ( transport ) {
            transport.abort( finalText );
          }
          done( 0, finalText );
          return this;
        }
      };

    // Attach deferreds
    deferred.promise( jqXHR ).complete = completeDeferred.add;
    jqXHR.success = jqXHR.done;
    jqXHR.error = jqXHR.fail;

    // Remove hash character (#7531: and string promotion)
    // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
    // Handle falsy url in the settings object (#10093: consistency with old signature)
    // We also use the url parameter if available
    s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

    // Alias method option to type as per ticket #12004
    s.type = options.method || options.type || s.method || s.type;

    // Extract dataTypes list
    s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

    // A cross-domain request is in order when we have a protocol:host:port mismatch
    if ( s.crossDomain == null ) {
      parts = rurl.exec( s.url.toLowerCase() );
      s.crossDomain = !!( parts &&
        ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
          ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
            ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
      );
    }

    // Convert data if not already a string
    if ( s.data && s.processData && typeof s.data !== "string" ) {
      s.data = jQuery.param( s.data, s.traditional );
    }

    // Apply prefilters
    inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

    // If request was aborted inside a prefilter, stop there
    if ( state === 2 ) {
      return jqXHR;
    }

    // We can fire global events as of now if asked to
    // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
    fireGlobals = jQuery.event && s.global;

    // Watch for a new set of requests
    if ( fireGlobals && jQuery.active++ === 0 ) {
      jQuery.event.trigger("ajaxStart");
    }

    // Uppercase the type
    s.type = s.type.toUpperCase();

    // Determine if request has content
    s.hasContent = !rnoContent.test( s.type );

    // Save the URL in case we're toying with the If-Modified-Since
    // and/or If-None-Match header later on
    cacheURL = s.url;

    // More options handling for requests with no content
    if ( !s.hasContent ) {

      // If data is available, append data to url
      if ( s.data ) {
        cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
        // #9682: remove data so that it's not used in an eventual retry
        delete s.data;
      }

      // Add anti-cache in url if needed
      if ( s.cache === false ) {
        s.url = rts.test( cacheURL ) ?

          // If there is already a '_' parameter, set its value
          cacheURL.replace( rts, "$1_=" + nonce++ ) :

          // Otherwise add one to the end
          cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
      }
    }

    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    if ( s.ifModified ) {
      if ( jQuery.lastModified[ cacheURL ] ) {
        jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
      }
      if ( jQuery.etag[ cacheURL ] ) {
        jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
      }
    }

    // Set the correct header, if data is being sent
    if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
      jqXHR.setRequestHeader( "Content-Type", s.contentType );
    }

    // Set the Accepts header for the server, depending on the dataType
    jqXHR.setRequestHeader(
      "Accept",
      s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
        s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
        s.accepts[ "*" ]
    );

    // Check for headers option
    for ( i in s.headers ) {
      jqXHR.setRequestHeader( i, s.headers[ i ] );
    }

    // Allow custom headers/mimetypes and early abort
    if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
      // Abort if not done already and return
      return jqXHR.abort();
    }

    // aborting is no longer a cancellation
    strAbort = "abort";

    // Install callbacks on deferreds
    for ( i in { success: 1, error: 1, complete: 1 } ) {
      jqXHR[ i ]( s[ i ] );
    }

    // Get transport
    transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

    // If no transport, we auto-abort
    if ( !transport ) {
      done( -1, "No Transport" );
    } else {
      jqXHR.readyState = 1;

      // Send global event
      if ( fireGlobals ) {
        globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
      }
      // Timeout
      if ( s.async && s.timeout > 0 ) {
        timeoutTimer = setTimeout(function() {
          jqXHR.abort("timeout");
        }, s.timeout );
      }

      try {
        state = 1;
        transport.send( requestHeaders, done );
      } catch ( e ) {
        // Propagate exception as error if not done
        if ( state < 2 ) {
          done( -1, e );
        // Simply rethrow otherwise
        } else {
          throw e;
        }
      }
    }

    // Callback for when everything is done
    function done( status, nativeStatusText, responses, headers ) {
      var isSuccess, success, error, response, modified,
        statusText = nativeStatusText;

      // Called once
      if ( state === 2 ) {
        return;
      }

      // State is "done" now
      state = 2;

      // Clear timeout if it exists
      if ( timeoutTimer ) {
        clearTimeout( timeoutTimer );
      }

      // Dereference transport for early garbage collection
      // (no matter how long the jqXHR object will be used)
      transport = undefined;

      // Cache response headers
      responseHeadersString = headers || "";

      // Set readyState
      jqXHR.readyState = status > 0 ? 4 : 0;

      // Determine if successful
      isSuccess = status >= 200 && status < 300 || status === 304;

      // Get response data
      if ( responses ) {
        response = ajaxHandleResponses( s, jqXHR, responses );
      }

      // Convert no matter what (that way responseXXX fields are always set)
      response = ajaxConvert( s, response, jqXHR, isSuccess );

      // If successful, handle type chaining
      if ( isSuccess ) {

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if ( s.ifModified ) {
          modified = jqXHR.getResponseHeader("Last-Modified");
          if ( modified ) {
            jQuery.lastModified[ cacheURL ] = modified;
          }
          modified = jqXHR.getResponseHeader("etag");
          if ( modified ) {
            jQuery.etag[ cacheURL ] = modified;
          }
        }

        // if no content
        if ( status === 204 || s.type === "HEAD" ) {
          statusText = "nocontent";

        // if not modified
        } else if ( status === 304 ) {
          statusText = "notmodified";

        // If we have data, let's convert it
        } else {
          statusText = response.state;
          success = response.data;
          error = response.error;
          isSuccess = !error;
        }
      } else {
        // We extract error from statusText
        // then normalize statusText and status for non-aborts
        error = statusText;
        if ( status || !statusText ) {
          statusText = "error";
          if ( status < 0 ) {
            status = 0;
          }
        }
      }

      // Set data for the fake xhr object
      jqXHR.status = status;
      jqXHR.statusText = ( nativeStatusText || statusText ) + "";

      // Success/Error
      if ( isSuccess ) {
        deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
      } else {
        deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
      }

      // Status-dependent callbacks
      jqXHR.statusCode( statusCode );
      statusCode = undefined;

      if ( fireGlobals ) {
        globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
          [ jqXHR, s, isSuccess ? success : error ] );
      }

      // Complete
      completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

      if ( fireGlobals ) {
        globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
        // Handle the global AJAX counter
        if ( !( --jQuery.active ) ) {
          jQuery.event.trigger("ajaxStop");
        }
      }
    }

    return jqXHR;
  },

  getJSON: function( url, data, callback ) {
    return jQuery.get( url, data, callback, "json" );
  },

  getScript: function( url, callback ) {
    return jQuery.get( url, undefined, callback, "script" );
  }
});

jQuery.each( [ "get", "post" ], function( i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {
    // shift arguments if data argument was omitted
    if ( jQuery.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});


jQuery._evalUrl = function( url ) {
  return jQuery.ajax({
    url: url,
    type: "GET",
    dataType: "script",
    async: false,
    global: false,
    "throws": true
  });
};


jQuery.fn.extend({
  wrapAll: function( html ) {
    if ( jQuery.isFunction( html ) ) {
      return this.each(function(i) {
        jQuery(this).wrapAll( html.call(this, i) );
      });
    }

    if ( this[0] ) {
      // The elements to wrap the target around
      var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

      if ( this[0].parentNode ) {
        wrap.insertBefore( this[0] );
      }

      wrap.map(function() {
        var elem = this;

        while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
          elem = elem.firstChild;
        }

        return elem;
      }).append( this );
    }

    return this;
  },

  wrapInner: function( html ) {
    if ( jQuery.isFunction( html ) ) {
      return this.each(function(i) {
        jQuery(this).wrapInner( html.call(this, i) );
      });
    }

    return this.each(function() {
      var self = jQuery( this ),
        contents = self.contents();

      if ( contents.length ) {
        contents.wrapAll( html );

      } else {
        self.append( html );
      }
    });
  },

  wrap: function( html ) {
    var isFunction = jQuery.isFunction( html );

    return this.each(function(i) {
      jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
    });
  },

  unwrap: function() {
    return this.parent().each(function() {
      if ( !jQuery.nodeName( this, "body" ) ) {
        jQuery( this ).replaceWith( this.childNodes );
      }
    }).end();
  }
});


jQuery.expr.filters.hidden = function( elem ) {
  // Support: Opera <= 12.12
  // Opera reports offsetWidths and offsetHeights less than zero on some elements
  return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
    (!support.reliableHiddenOffsets() &&
      ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
  return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
  rbracket = /\[\]$/,
  rCRLF = /\r?\n/g,
  rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
  rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
  var name;

  if ( jQuery.isArray( obj ) ) {
    // Serialize array item.
    jQuery.each( obj, function( i, v ) {
      if ( traditional || rbracket.test( prefix ) ) {
        // Treat each array item as a scalar.
        add( prefix, v );

      } else {
        // Item is non-scalar (array or object), encode its numeric index.
        buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
      }
    });

  } else if ( !traditional && jQuery.type( obj ) === "object" ) {
    // Serialize object item.
    for ( name in obj ) {
      buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
    }

  } else {
    // Serialize scalar item.
    add( prefix, obj );
  }
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
  var prefix,
    s = [],
    add = function( key, value ) {
      // If value is a function, invoke it and return its value
      value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
      s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
    };

  // Set traditional to true for jQuery <= 1.3.2 behavior.
  if ( traditional === undefined ) {
    traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
  }

  // If an array was passed in, assume that it is an array of form elements.
  if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
    // Serialize the form elements
    jQuery.each( a, function() {
      add( this.name, this.value );
    });

  } else {
    // If traditional, encode the "old" way (the way 1.3.2 or older
    // did it), otherwise encode params recursively.
    for ( prefix in a ) {
      buildParams( prefix, a[ prefix ], traditional, add );
    }
  }

  // Return the resulting serialization
  return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
  serialize: function() {
    return jQuery.param( this.serializeArray() );
  },
  serializeArray: function() {
    return this.map(function() {
      // Can add propHook for "elements" to filter or add form elements
      var elements = jQuery.prop( this, "elements" );
      return elements ? jQuery.makeArray( elements ) : this;
    })
    .filter(function() {
      var type = this.type;
      // Use .is(":disabled") so that fieldset[disabled] works
      return this.name && !jQuery( this ).is( ":disabled" ) &&
        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
        ( this.checked || !rcheckableType.test( type ) );
    })
    .map(function( i, elem ) {
      var val = jQuery( this ).val();

      return val == null ?
        null :
        jQuery.isArray( val ) ?
          jQuery.map( val, function( val ) {
            return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
          }) :
          { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
    }).get();
  }
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
  // Support: IE6+
  function() {

    // XHR cannot access local files, always use ActiveX for that case
    return !this.isLocal &&

      // Support: IE7-8
      // oldIE XHR does not support non-RFC2616 methods (#13240)
      // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
      // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
      // Although this check for six methods instead of eight
      // since IE also does not support "trace" and "connect"
      /^(get|post|head|put|delete|options)$/i.test( this.type ) &&

      createStandardXHR() || createActiveXHR();
  } :
  // For all other browsers, use the standard XMLHttpRequest object
  createStandardXHR;

var xhrId = 0,
  xhrCallbacks = {},
  xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
  window.attachEvent( "onunload", function() {
    for ( var key in xhrCallbacks ) {
      xhrCallbacks[ key ]( undefined, true );
    }
  });
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

  jQuery.ajaxTransport(function( options ) {
    // Cross domain only allowed if supported through XMLHttpRequest
    if ( !options.crossDomain || support.cors ) {

      var callback;

      return {
        send: function( headers, complete ) {
          var i,
            xhr = options.xhr(),
            id = ++xhrId;

          // Open the socket
          xhr.open( options.type, options.url, options.async, options.username, options.password );

          // Apply custom fields if provided
          if ( options.xhrFields ) {
            for ( i in options.xhrFields ) {
              xhr[ i ] = options.xhrFields[ i ];
            }
          }

          // Override mime type if needed
          if ( options.mimeType && xhr.overrideMimeType ) {
            xhr.overrideMimeType( options.mimeType );
          }

          // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.
          if ( !options.crossDomain && !headers["X-Requested-With"] ) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }

          // Set headers
          for ( i in headers ) {
            // Support: IE<9
            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
            // request header to a null-value.
            //
            // To keep consistent with other XHR implementations, cast the value
            // to string and ignore `undefined`.
            if ( headers[ i ] !== undefined ) {
              xhr.setRequestHeader( i, headers[ i ] + "" );
            }
          }

          // Do send the request
          // This may raise an exception which is actually
          // handled in jQuery.ajax (so no try/catch here)
          xhr.send( ( options.hasContent && options.data ) || null );

          // Listener
          callback = function( _, isAbort ) {
            var status, statusText, responses;

            // Was never called and is aborted or complete
            if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
              // Clean up
              delete xhrCallbacks[ id ];
              callback = undefined;
              xhr.onreadystatechange = jQuery.noop;

              // Abort manually if needed
              if ( isAbort ) {
                if ( xhr.readyState !== 4 ) {
                  xhr.abort();
                }
              } else {
                responses = {};
                status = xhr.status;

                // Support: IE<10
                // Accessing binary-data responseText throws an exception
                // (#11426)
                if ( typeof xhr.responseText === "string" ) {
                  responses.text = xhr.responseText;
                }

                // Firefox throws an exception when accessing
                // statusText for faulty cross-domain requests
                try {
                  statusText = xhr.statusText;
                } catch( e ) {
                  // We normalize with Webkit giving an empty statusText
                  statusText = "";
                }

                // Filter status for non standard behaviors

                // If the request is local and we have data: assume a success
                // (success with no data won't get notified, that's the best we
                // can do given current implementations)
                if ( !status && options.isLocal && !options.crossDomain ) {
                  status = responses.text ? 200 : 404;
                // IE - #1450: sometimes returns 1223 when it should be 204
                } else if ( status === 1223 ) {
                  status = 204;
                }
              }
            }

            // Call complete if needed
            if ( responses ) {
              complete( status, statusText, responses, xhr.getAllResponseHeaders() );
            }
          };

          if ( !options.async ) {
            // if we're in sync mode we fire the callback
            callback();
          } else if ( xhr.readyState === 4 ) {
            // (IE6 & IE7) if it's in cache and has been
            // retrieved directly we need to fire the callback
            setTimeout( callback );
          } else {
            // Add to the list of active xhr callbacks
            xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
          }
        },

        abort: function() {
          if ( callback ) {
            callback( undefined, true );
          }
        }
      };
    }
  });
}

// Functions to create xhrs
function createStandardXHR() {
  try {
    return new window.XMLHttpRequest();
  } catch( e ) {}
}

function createActiveXHR() {
  try {
    return new window.ActiveXObject( "Microsoft.XMLHTTP" );
  } catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
  accepts: {
    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
  },
  contents: {
    script: /(?:java|ecma)script/
  },
  converters: {
    "text script": function( text ) {
      jQuery.globalEval( text );
      return text;
    }
  }
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
  if ( s.cache === undefined ) {
    s.cache = false;
  }
  if ( s.crossDomain ) {
    s.type = "GET";
    s.global = false;
  }
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

  // This transport only deals with cross domain requests
  if ( s.crossDomain ) {

    var script,
      head = document.head || jQuery("head")[0] || document.documentElement;

    return {

      send: function( _, callback ) {

        script = document.createElement("script");

        script.async = true;

        if ( s.scriptCharset ) {
          script.charset = s.scriptCharset;
        }

        script.src = s.url;

        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function( _, isAbort ) {

          if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;

            // Remove the script
            if ( script.parentNode ) {
              script.parentNode.removeChild( script );
            }

            // Dereference the script
            script = null;

            // Callback if not abort
            if ( !isAbort ) {
              callback( 200, "success" );
            }
          }
        };

        // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
        // Use native DOM manipulation to avoid our domManip AJAX trickery
        head.insertBefore( script, head.firstChild );
      },

      abort: function() {
        if ( script ) {
          script.onload( undefined, true );
        }
      }
    };
  }
});




var oldCallbacks = [],
  rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
  jsonp: "callback",
  jsonpCallback: function() {
    var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
    this[ callback ] = true;
    return callback;
  }
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

  var callbackName, overwritten, responseContainer,
    jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
      "url" :
      typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
    );

  // Handle iff the expected data type is "jsonp" or we have a parameter to set
  if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

    // Get callback name, remembering preexisting value associated with it
    callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
      s.jsonpCallback() :
      s.jsonpCallback;

    // Insert callback into url or form data
    if ( jsonProp ) {
      s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
    } else if ( s.jsonp !== false ) {
      s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
    }

    // Use data converter to retrieve json after script execution
    s.converters["script json"] = function() {
      if ( !responseContainer ) {
        jQuery.error( callbackName + " was not called" );
      }
      return responseContainer[ 0 ];
    };

    // force json dataType
    s.dataTypes[ 0 ] = "json";

    // Install callback
    overwritten = window[ callbackName ];
    window[ callbackName ] = function() {
      responseContainer = arguments;
    };

    // Clean-up function (fires after converters)
    jqXHR.always(function() {
      // Restore preexisting value
      window[ callbackName ] = overwritten;

      // Save back as free
      if ( s[ callbackName ] ) {
        // make sure that re-using the options doesn't screw things around
        s.jsonpCallback = originalSettings.jsonpCallback;

        // save the callback name for future use
        oldCallbacks.push( callbackName );
      }

      // Call if it was a function and we have a response
      if ( responseContainer && jQuery.isFunction( overwritten ) ) {
        overwritten( responseContainer[ 0 ] );
      }

      responseContainer = overwritten = undefined;
    });

    // Delegate to script
    return "script";
  }
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
  if ( !data || typeof data !== "string" ) {
    return null;
  }
  if ( typeof context === "boolean" ) {
    keepScripts = context;
    context = false;
  }
  context = context || document;

  var parsed = rsingleTag.exec( data ),
    scripts = !keepScripts && [];

  // Single tag
  if ( parsed ) {
    return [ context.createElement( parsed[1] ) ];
  }

  parsed = jQuery.buildFragment( [ data ], context, scripts );

  if ( scripts && scripts.length ) {
    jQuery( scripts ).remove();
  }

  return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
  if ( typeof url !== "string" && _load ) {
    return _load.apply( this, arguments );
  }

  var selector, response, type,
    self = this,
    off = url.indexOf(" ");

  if ( off >= 0 ) {
    selector = jQuery.trim( url.slice( off, url.length ) );
    url = url.slice( 0, off );
  }

  // If it's a function
  if ( jQuery.isFunction( params ) ) {

    // We assume that it's the callback
    callback = params;
    params = undefined;

  // Otherwise, build a param string
  } else if ( params && typeof params === "object" ) {
    type = "POST";
  }

  // If we have elements to modify, make the request
  if ( self.length > 0 ) {
    jQuery.ajax({
      url: url,

      // if "type" variable is undefined, then "GET" method will be used
      type: type,
      dataType: "html",
      data: params
    }).done(function( responseText ) {

      // Save response for use in complete callback
      response = arguments;

      self.html( selector ?

        // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

        // Otherwise use the full result
        responseText );

    }).complete( callback && function( jqXHR, status ) {
      self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
    });
  }

  return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
  jQuery.fn[ type ] = function( fn ) {
    return this.on( type, fn );
  };
});




jQuery.expr.filters.animated = function( elem ) {
  return jQuery.grep(jQuery.timers, function( fn ) {
    return elem === fn.elem;
  }).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
  return jQuery.isWindow( elem ) ?
    elem :
    elem.nodeType === 9 ?
      elem.defaultView || elem.parentWindow :
      false;
}

jQuery.offset = {
  setOffset: function( elem, options, i ) {
    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
      position = jQuery.css( elem, "position" ),
      curElem = jQuery( elem ),
      props = {};

    // set position first, in-case top/left are set even on static elem
    if ( position === "static" ) {
      elem.style.position = "relative";
    }

    curOffset = curElem.offset();
    curCSSTop = jQuery.css( elem, "top" );
    curCSSLeft = jQuery.css( elem, "left" );
    calculatePosition = ( position === "absolute" || position === "fixed" ) &&
      jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

    // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
    if ( calculatePosition ) {
      curPosition = curElem.position();
      curTop = curPosition.top;
      curLeft = curPosition.left;
    } else {
      curTop = parseFloat( curCSSTop ) || 0;
      curLeft = parseFloat( curCSSLeft ) || 0;
    }

    if ( jQuery.isFunction( options ) ) {
      options = options.call( elem, i, curOffset );
    }

    if ( options.top != null ) {
      props.top = ( options.top - curOffset.top ) + curTop;
    }
    if ( options.left != null ) {
      props.left = ( options.left - curOffset.left ) + curLeft;
    }

    if ( "using" in options ) {
      options.using.call( elem, props );
    } else {
      curElem.css( props );
    }
  }
};

jQuery.fn.extend({
  offset: function( options ) {
    if ( arguments.length ) {
      return options === undefined ?
        this :
        this.each(function( i ) {
          jQuery.offset.setOffset( this, options, i );
        });
    }

    var docElem, win,
      box = { top: 0, left: 0 },
      elem = this[ 0 ],
      doc = elem && elem.ownerDocument;

    if ( !doc ) {
      return;
    }

    docElem = doc.documentElement;

    // Make sure it's not a disconnected DOM node
    if ( !jQuery.contains( docElem, elem ) ) {
      return box;
    }

    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if ( typeof elem.getBoundingClientRect !== strundefined ) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow( doc );
    return {
      top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
      left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
    };
  },

  position: function() {
    if ( !this[ 0 ] ) {
      return;
    }

    var offsetParent, offset,
      parentOffset = { top: 0, left: 0 },
      elem = this[ 0 ];

    // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
    if ( jQuery.css( elem, "position" ) === "fixed" ) {
      // we assume that getBoundingClientRect is available when computed position is fixed
      offset = elem.getBoundingClientRect();
    } else {
      // Get *real* offsetParent
      offsetParent = this.offsetParent();

      // Get correct offsets
      offset = this.offset();
      if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
        parentOffset = offsetParent.offset();
      }

      // Add offsetParent borders
      parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
      parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
    }

    // Subtract parent offsets and element margins
    // note: when an element has margin: auto the offsetLeft and marginLeft
    // are the same in Safari causing offset.left to incorrectly be 0
    return {
      top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
      left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
    };
  },

  offsetParent: function() {
    return this.map(function() {
      var offsetParent = this.offsetParent || docElem;

      while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docElem;
    });
  }
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
  var top = /Y/.test( prop );

  jQuery.fn[ method ] = function( val ) {
    return access( this, function( elem, method, val ) {
      var win = getWindow( elem );

      if ( val === undefined ) {
        return win ? (prop in win) ? win[ prop ] :
          win.document.documentElement[ method ] :
          elem[ method ];
      }

      if ( win ) {
        win.scrollTo(
          !top ? val : jQuery( win ).scrollLeft(),
          top ? val : jQuery( win ).scrollTop()
        );

      } else {
        elem[ method ] = val;
      }
    }, method, val, arguments.length, null );
  };
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
  jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
    function( elem, computed ) {
      if ( computed ) {
        computed = curCSS( elem, prop );
        // if curCSS returns percentage, fallback to offset
        return rnumnonpx.test( computed ) ?
          jQuery( elem ).position()[ prop ] + "px" :
          computed;
      }
    }
  );
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
  jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
    // margin is only for outerHeight, outerWidth
    jQuery.fn[ funcName ] = function( margin, value ) {
      var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
        extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

      return access( this, function( elem, type, value ) {
        var doc;

        if ( jQuery.isWindow( elem ) ) {
          // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
          // isn't a whole lot we can do. See pull request at this URL for discussion:
          // https://github.com/jquery/jquery/pull/764
          return elem.document.documentElement[ "client" + name ];
        }

        // Get document width or height
        if ( elem.nodeType === 9 ) {
          doc = elem.documentElement;

          // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
          // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
          return Math.max(
            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
            elem.body[ "offset" + name ], doc[ "offset" + name ],
            doc[ "client" + name ]
          );
        }

        return value === undefined ?
          // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css( elem, type, extra ) :

          // Set width or height on the element
          jQuery.style( elem, type, value, extra );
      }, type, chainable ? margin : undefined, chainable, null );
    };
  });
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
  return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
  define( "jquery", [], function() {
    return jQuery;
  });
}




var
  // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,

  // Map over the $ in case of overwrite
  _$ = window.$;

jQuery.noConflict = function( deep ) {
  if ( window.$ === jQuery ) {
    window.$ = _$;
  }

  if ( deep && window.jQuery === jQuery ) {
    window.jQuery = _jQuery;
  }

  return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
  window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+scss */
var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;

var _ = _self.Prism = {
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o) {
			var type = _.util.type(o);

			switch (type) {
				case 'Object':
					var clone = {};

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key]);
						}
					}

					return clone;

				case 'Array':
					// Check for existence for IE8
					return o.map && o.map(function(v) { return _.util.clone(v); });
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];

			if (arguments.length == 2) {
				insert = arguments[1];

				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}

				return grammar;
			}

			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === root[inside] && key != inside) {
					this[key] = ret;
				}
			});

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback, type) {
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object') {
						_.languages.DFS(o[i], callback);
					}
					else if (_.util.type(o[i]) === 'Array') {
						_.languages.DFS(o[i], callback, i);
					}
				}
			}
		}
	},
	plugins: {},

	highlightAll: function(async, callback) {
		var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1];
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		// Set language on the parent, for styling
		parent = element.parentNode;

		if (/pre/i.test(parent.nodeName)) {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		if (!code || !grammar) {
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = evt.data;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var tokens = _.tokenize(text, grammar);
		return Token.stringify(_.util.encode(tokens), language);
	},

	tokenize: function(text, grammar, language) {
		var Token = _.Token;

		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		tokenloop: for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					lookbehindLength = 0,
					alias = pattern.alias;

				pattern = pattern.pattern || pattern;

				for (var i=0; i<strarr.length; i++) { // Don’t cache length as it changes during the loop

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						break tokenloop;
					}

					if (str instanceof Token) {
						continue;
					}

					pattern.lastIndex = 0;

					var match = pattern.exec(str);

					if (match) {
						if(lookbehind) {
							lookbehindLength = match[1].length;
						}

						var from = match.index - 1 + lookbehindLength,
							match = match[0].slice(lookbehindLength),
							len = match.length,
							to = from + len,
							before = str.slice(0, from + 1),
							after = str.slice(to + 1);

						var args = [i, 1];

						if (before) {
							args.push(before);
						}

						var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias);

						args.push(wrapped);

						if (after) {
							args.push(after);
						}

						Array.prototype.splice.apply(strarr, args);
					}
				}
			}
		}

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content, alias) {
	this.type = type;
	this.content = content;
	this.alias = alias;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (_.util.type(o) === 'Array') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (env.type == 'comment') {
		env.attributes['spellcheck'] = 'true';
	}

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = '';

	for (var name in env.attributes) {
		attributes += (attributes ? ' ' : '') + name + '="' + (env.attributes[name] || '') + '"';
	}

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _self.Prism;
	}
 	// In worker
	_self.addEventListener('message', function(evt) {
		var message = JSON.parse(evt.data),
		    lang = message.language,
		    code = message.code,
		    immediateClose = message.immediateClose;

		_self.postMessage(_.highlight(code, _.languages[lang], lang));
		if (immediateClose) {
			_self.close();
		}
	}, false);

	return _self.Prism;
}

// Get current script and highlight
var script = document.getElementsByTagName('script');

script = script[script.length - 1];

if (script) {
	_.filename = script.src;

	if (document.addEventListener && !script.hasAttribute('data-manual')) {
		document.addEventListener('DOMContentLoaded', _.highlightAll);
	}
}

return _self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}
;
Prism.languages.markup = {
	'comment': /<!--[\w\W]*?-->/,
	'prolog': /<\?[\w\W]+?\?>/,
	'doctype': /<!DOCTYPE[\w\W]+?>/,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.css = {
	'comment': /\/\*[\w\W]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	'string': /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
	'property': /(\b|\B)[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css'
		}
	});

	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|').*?\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
};
Prism.languages.scss = Prism.languages.extend('css', {
	'comment': {
		pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
		lookbehind: true
	},
	'atrule': {
		pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	// url, compassified
	'url': /(?:[-a-z]+-)*url(?=\()/i,
	// CSS selector regex is not appropriate for Sass
	// since there can be lot more things (var, @ directive, nesting..)
	// a selector must start at the end of a property or after a brace (end of other rules or nesting)
	// it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
	// the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
	// can "pass" as a selector- e.g: proper#{$erty})
	// this one was hard to do, so please be careful if you edit this one :)
	'selector': {
		// Initial look-ahead is used to prevent matching of blank selectors
		pattern: /(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,
		inside: {
			'placeholder': /%[-_\w]+/
		}
	}
});

Prism.languages.insertBefore('scss', 'atrule', {
	'keyword': [
		/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
		{
			pattern: /( +)(?:from|through)(?= )/,
			lookbehind: true
		}
	]
});

Prism.languages.insertBefore('scss', 'property', {
	// var and interpolated vars
	'variable': /\$[-_\w]+|#\{\$[-_\w]+\}/
});

Prism.languages.insertBefore('scss', 'function', {
	'placeholder': {
		pattern: /%[-_\w]+/,
		alias: 'selector'
	},
	'statement': /\B!(?:default|optional)\b/i,
	'boolean': /\b(?:true|false)\b/,
	'null': /\bnull\b/,
	'operator': {
		pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
		lookbehind: true
	}
});

Prism.languages.scss['atrule'].inside.rest = Prism.util.clone(Prism.languages.scss);

/*

$win.on('resize', throttle(function() {
	console.log('throttle');
}, 100));

*/

function throttle(fn, threshhold, scope) {
	threshhold || (threshhold = 250);
	var last,
			deferTimer;
	return function () {
		var context = scope || this,
		    now = +new Date,
		    args = arguments;
		if (last && now < last + threshhold) {
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function () {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}
/*! http://mths.be/placeholder v2.1.1 by @mathias */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
    var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
    var valHooks = $.valHooks;
    var propHooks = $.propHooks;
    var hooks;
    var placeholder;

    if (isInputSupported && isTextareaSupported) {

        placeholder = $.fn.placeholder = function() {
            return this;
        };

        placeholder.input = placeholder.textarea = true;

    } else {

        var settings = {};

        placeholder = $.fn.placeholder = function(options) {

            var defaults = {customClass: 'placeholder'};
            settings = $.extend({}, defaults, options);

            var $this = this;
            $this
                .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .not('.'+settings.customClass)
                .bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                })
                .data('placeholder-enabled', true)
                .trigger('blur.placeholder');
            return $this;
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function(element) {
                var $element = $(element);

                var $passwordInput = $element.data('placeholder-password');
                if ($passwordInput) {
                    return $passwordInput[0].value;
                }

                return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
            },
            'set': function(element, value) {
                var $element = $(element);

                var $passwordInput = $element.data('placeholder-password');
                if ($passwordInput) {
                    return $passwordInput[0].value = value;
                }

                if (!$element.data('placeholder-enabled')) {
                    return element.value = value;
                }
                if (value === '') {
                    element.value = value;
                    // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
                    if (element != safeActiveElement()) {
                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }
                } else if ($element.hasClass(settings.customClass)) {
                    clearPlaceholder.call(element, true, value) || (element.value = value);
                } else {
                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return $element;
            }
        };

        if (!isInputSupported) {
            valHooks.input = hooks;
            propHooks.value = hooks;
        }
        if (!isTextareaSupported) {
            valHooks.textarea = hooks;
            propHooks.value = hooks;
        }

        $(function() {
            // Look for forms
            $(document).delegate('form', 'submit.placeholder', function() {
                // Clear the placeholder values so they don't get submitted
                var $inputs = $('.'+settings.customClass, this).each(clearPlaceholder);
                setTimeout(function() {
                    $inputs.each(setPlaceholder);
                }, 10);
            });
        });

        // Clear placeholder values upon page reload
        $(window).bind('beforeunload.placeholder', function() {
            $('.'+settings.customClass).each(function() {
                this.value = '';
            });
        });

    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {};
        var rinlinejQuery = /^jQuery\d+$/;
        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });
        return newAttrs;
    }

    function clearPlaceholder(event, value) {
        var input = this;
        var $input = $(input);
        if (input.value == $input.attr('placeholder') && $input.hasClass(settings.customClass)) {
            if ($input.data('placeholder-password')) {
                $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                if (event === true) {
                    return $input[0].value = value;
                }
                $input.focus();
            } else {
                input.value = '';
                $input.removeClass(settings.customClass);
                input == safeActiveElement() && input.select();
            }
        }
    }

    function setPlaceholder() {
        var $replacement;
        var input = this;
        var $input = $(input);
        var id = this.id;
        if (input.value === '') {
            if (input.type === 'password') {
                if (!$input.data('placeholder-textinput')) {
                    try {
                        $replacement = $input.clone().attr({ 'type': 'text' });
                    } catch(e) {
                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                    }
                    $replacement
                        .removeAttr('name')
                        .data({
                            'placeholder-password': $input,
                            'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);
                    $input
                        .data({
                            'placeholder-textinput': $replacement,
                            'placeholder-id': id
                        })
                        .before($replacement);
                }
                $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', id).show();
                // Note: `$input[0] != input` now!
            }
            $input.addClass(settings.customClass);
            $input[0].value = $input.attr('placeholder');
        } else {
            $input.removeClass(settings.customClass);
        }
    }

    function safeActiveElement() {
        // Avoid IE9 `document.activeElement` of death
        // https://github.com/mathiasbynens/jquery-placeholder/pull/99
        try {
            return document.activeElement;
        } catch (exception) {}
    }

}));

jQuery(document).ready(function($) {

	// global vars
	$doc = $(document),
	$win = $(window),
	$html = $('html'),
	$body = $('body'),
	$htmlBody = $('html, body'),
	breakpoint = {
		'x-small':   350,
		'small':     600,
		'medium':    800,
		'large':     1000,
		'x-large':   1400,
		'xx-large':  1800
	},
	isMobile = false;

	// simple mobile detection
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$html.addClass('is-mobile');
		isMobile = true;
	} else {
		$html.addClass('is-desktop');
		isMobile = false;
	}

});
/* ==========================================================================
	 Demo
	 ========================================================================== */

var Demo = (function() {

	var element = {};

	var init = function() {

		$('[data-demo]').each(function() {

			$(this).on('click', '[data-demo-button]', function() {

				var $button = $(this),
						$demo = $button.closest('[data-demo]'),
						value = $button.attr('data-demo-button');

				$demo
					.find('[data-demo-button]')
					.removeClass('is-active');

				$button
					.addClass('is-active');

				$demo
					.find('[data-grid-modifier]')
					.removeClass('is-active');

				$demo
					.find('[data-grid-modifier="' + value + '"]')
					.addClass('is-active');

			});

		});

	};

	return {
		init: init
	};

})();

$(document).ready(Demo.init);
/* ==========================================================================
	 Tabs
	 ========================================================================== */

var Tabs = (function() {

	var element = {};

	var init = function() {

		$('[data-tabs]').each(function() {

			var $container = $(this);

			$container.on('click', '[data-tabs-button]', function() {

				var $this = $(this),
						id = $this.attr('data-tabs-button');

				$container.find('[data-tabs-button]')
					.removeClass('is-active');

				$container.find('[data-tabs-button="' + id + '"]')
					.addClass('is-active');

				$container.find('[data-tabs-content]')
					.removeClass('is-active');

				$container.find('[data-tabs-content="' + id + '"]')
					.addClass('is-active');

				return false;

			});

		});

	};

	return {
		init: init
	};

})();

$(document).ready(Tabs.init);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlYm91bmNlLmpzIiwiZHVtcC1lcnJvci5qcyIsImpxdWVyeS5qcyIsInByaXNtLmpzIiwidGhyb3R0bGUuanMiLCJqcXVlcnkucGxhY2Vob2xkZXIuanMiLCJtYWluLmpzIiwiZGVtby5qcyIsInRhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvbVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL2tCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblxuJHdpbi5vbigncmVzaXplJywgZGVib3VuY2UoZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKCdkZWJvdW5jZScpO1xufSwgMTAwKSk7XG5cbiovXG5cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuXHR2YXIgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcblx0XHR2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0aWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0fTtcblx0XHR2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHRcdGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHR9O1xufSIsIi8qXG5cbnRyeSB7XG4gIC8vIHN0dWZmXG59IGNhdGNoIChlcnIpIHtcbiAgZHVtcEVycm9yKGVycik7XG59XG5cbiovXG5cbmZ1bmN0aW9uIGR1bXBFcnJvcihlcnIpIHtcblx0aWYgKHR5cGVvZiBlcnIgPT09ICdvYmplY3QnKSB7XG5cdFx0aWYgKGVyci5tZXNzYWdlKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnXFxuTWVzc2FnZTogJyArIGVyci5tZXNzYWdlKVxuXHRcdH1cblx0XHRpZiAoZXJyLnN0YWNrKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnXFxuU3RhY2t0cmFjZTonKVxuXHRcdFx0Y29uc29sZS5sb2coJz09PT09PT09PT09PT09PT09PT09Jylcblx0XHRcdGNvbnNvbGUubG9nKGVyci5zdGFjayk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUubG9nKCdkdW1wRXJyb3IgOjogYXJndW1lbnQgaXMgbm90IGFuIG9iamVjdCcpO1xuXHR9XG59IiwiLyohXG4gKiBqUXVlcnkgSmF2YVNjcmlwdCBMaWJyYXJ5IHYxLjExLjNcbiAqIGh0dHA6Ly9qcXVlcnkuY29tL1xuICpcbiAqIEluY2x1ZGVzIFNpenpsZS5qc1xuICogaHR0cDovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgMjAwNSwgMjAxNCBqUXVlcnkgRm91bmRhdGlvbiwgSW5jLiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE1LTA0LTI4VDE2OjE5WlxuICovXG5cbihmdW5jdGlvbiggZ2xvYmFsLCBmYWN0b3J5ICkge1xuXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgLy8gRm9yIENvbW1vbkpTIGFuZCBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB3aGVyZSBhIHByb3BlciB3aW5kb3cgaXMgcHJlc2VudCxcbiAgICAvLyBleGVjdXRlIHRoZSBmYWN0b3J5IGFuZCBnZXQgalF1ZXJ5XG4gICAgLy8gRm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBpbmhlcmVudGx5IHBvc3NlcyBhIHdpbmRvdyB3aXRoIGEgZG9jdW1lbnRcbiAgICAvLyAoc3VjaCBhcyBOb2RlLmpzKSwgZXhwb3NlIGEgalF1ZXJ5LW1ha2luZyBmYWN0b3J5IGFzIG1vZHVsZS5leHBvcnRzXG4gICAgLy8gVGhpcyBhY2NlbnR1YXRlcyB0aGUgbmVlZCBmb3IgdGhlIGNyZWF0aW9uIG9mIGEgcmVhbCB3aW5kb3dcbiAgICAvLyBlLmcuIHZhciBqUXVlcnkgPSByZXF1aXJlKFwianF1ZXJ5XCIpKHdpbmRvdyk7XG4gICAgLy8gU2VlIHRpY2tldCAjMTQ1NDkgZm9yIG1vcmUgaW5mb1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLmRvY3VtZW50ID9cbiAgICAgIGZhY3RvcnkoIGdsb2JhbCwgdHJ1ZSApIDpcbiAgICAgIGZ1bmN0aW9uKCB3ICkge1xuICAgICAgICBpZiAoICF3LmRvY3VtZW50ICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvciggXCJqUXVlcnkgcmVxdWlyZXMgYSB3aW5kb3cgd2l0aCBhIGRvY3VtZW50XCIgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFjdG9yeSggdyApO1xuICAgICAgfTtcbiAgfSBlbHNlIHtcbiAgICBmYWN0b3J5KCBnbG9iYWwgKTtcbiAgfVxuXG4vLyBQYXNzIHRoaXMgaWYgd2luZG93IGlzIG5vdCBkZWZpbmVkIHlldFxufSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oIHdpbmRvdywgbm9HbG9iYWwgKSB7XG5cbi8vIENhbid0IGRvIHRoaXMgYmVjYXVzZSBzZXZlcmFsIGFwcHMgaW5jbHVkaW5nIEFTUC5ORVQgdHJhY2Vcbi8vIHRoZSBzdGFjayB2aWEgYXJndW1lbnRzLmNhbGxlci5jYWxsZWUgYW5kIEZpcmVmb3ggZGllcyBpZlxuLy8geW91IHRyeSB0byB0cmFjZSB0aHJvdWdoIFwidXNlIHN0cmljdFwiIGNhbGwgY2hhaW5zLiAoIzEzMzM1KVxuLy8gU3VwcG9ydDogRmlyZWZveCAxOCtcbi8vXG5cbnZhciBkZWxldGVkSWRzID0gW107XG5cbnZhciBzbGljZSA9IGRlbGV0ZWRJZHMuc2xpY2U7XG5cbnZhciBjb25jYXQgPSBkZWxldGVkSWRzLmNvbmNhdDtcblxudmFyIHB1c2ggPSBkZWxldGVkSWRzLnB1c2g7XG5cbnZhciBpbmRleE9mID0gZGVsZXRlZElkcy5pbmRleE9mO1xuXG52YXIgY2xhc3MydHlwZSA9IHt9O1xuXG52YXIgdG9TdHJpbmcgPSBjbGFzczJ0eXBlLnRvU3RyaW5nO1xuXG52YXIgaGFzT3duID0gY2xhc3MydHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIHN1cHBvcnQgPSB7fTtcblxuXG5cbnZhclxuICB2ZXJzaW9uID0gXCIxLjExLjNcIixcblxuICAvLyBEZWZpbmUgYSBsb2NhbCBjb3B5IG9mIGpRdWVyeVxuICBqUXVlcnkgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG4gICAgLy8gVGhlIGpRdWVyeSBvYmplY3QgaXMgYWN0dWFsbHkganVzdCB0aGUgaW5pdCBjb25zdHJ1Y3RvciAnZW5oYW5jZWQnXG4gICAgLy8gTmVlZCBpbml0IGlmIGpRdWVyeSBpcyBjYWxsZWQgKGp1c3QgYWxsb3cgZXJyb3IgdG8gYmUgdGhyb3duIGlmIG5vdCBpbmNsdWRlZClcbiAgICByZXR1cm4gbmV3IGpRdWVyeS5mbi5pbml0KCBzZWxlY3RvciwgY29udGV4dCApO1xuICB9LFxuXG4gIC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4xLCBJRTw5XG4gIC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUFxuICBydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcblxuICAvLyBNYXRjaGVzIGRhc2hlZCBzdHJpbmcgZm9yIGNhbWVsaXppbmdcbiAgcm1zUHJlZml4ID0gL14tbXMtLyxcbiAgcmRhc2hBbHBoYSA9IC8tKFtcXGRhLXpdKS9naSxcblxuICAvLyBVc2VkIGJ5IGpRdWVyeS5jYW1lbENhc2UgYXMgY2FsbGJhY2sgdG8gcmVwbGFjZSgpXG4gIGZjYW1lbENhc2UgPSBmdW5jdGlvbiggYWxsLCBsZXR0ZXIgKSB7XG4gICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuICB9O1xuXG5qUXVlcnkuZm4gPSBqUXVlcnkucHJvdG90eXBlID0ge1xuICAvLyBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIGpRdWVyeSBiZWluZyB1c2VkXG4gIGpxdWVyeTogdmVyc2lvbixcblxuICBjb25zdHJ1Y3RvcjogalF1ZXJ5LFxuXG4gIC8vIFN0YXJ0IHdpdGggYW4gZW1wdHkgc2VsZWN0b3JcbiAgc2VsZWN0b3I6IFwiXCIsXG5cbiAgLy8gVGhlIGRlZmF1bHQgbGVuZ3RoIG9mIGEgalF1ZXJ5IG9iamVjdCBpcyAwXG4gIGxlbmd0aDogMCxcblxuICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbCggdGhpcyApO1xuICB9LFxuXG4gIC8vIEdldCB0aGUgTnRoIGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgZWxlbWVudCBzZXQgT1JcbiAgLy8gR2V0IHRoZSB3aG9sZSBtYXRjaGVkIGVsZW1lbnQgc2V0IGFzIGEgY2xlYW4gYXJyYXlcbiAgZ2V0OiBmdW5jdGlvbiggbnVtICkge1xuICAgIHJldHVybiBudW0gIT0gbnVsbCA/XG5cbiAgICAgIC8vIFJldHVybiBqdXN0IHRoZSBvbmUgZWxlbWVudCBmcm9tIHRoZSBzZXRcbiAgICAgICggbnVtIDwgMCA/IHRoaXNbIG51bSArIHRoaXMubGVuZ3RoIF0gOiB0aGlzWyBudW0gXSApIDpcblxuICAgICAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgaW4gYSBjbGVhbiBhcnJheVxuICAgICAgc2xpY2UuY2FsbCggdGhpcyApO1xuICB9LFxuXG4gIC8vIFRha2UgYW4gYXJyYXkgb2YgZWxlbWVudHMgYW5kIHB1c2ggaXQgb250byB0aGUgc3RhY2tcbiAgLy8gKHJldHVybmluZyB0aGUgbmV3IG1hdGNoZWQgZWxlbWVudCBzZXQpXG4gIHB1c2hTdGFjazogZnVuY3Rpb24oIGVsZW1zICkge1xuXG4gICAgLy8gQnVpbGQgYSBuZXcgalF1ZXJ5IG1hdGNoZWQgZWxlbWVudCBzZXRcbiAgICB2YXIgcmV0ID0galF1ZXJ5Lm1lcmdlKCB0aGlzLmNvbnN0cnVjdG9yKCksIGVsZW1zICk7XG5cbiAgICAvLyBBZGQgdGhlIG9sZCBvYmplY3Qgb250byB0aGUgc3RhY2sgKGFzIGEgcmVmZXJlbmNlKVxuICAgIHJldC5wcmV2T2JqZWN0ID0gdGhpcztcbiAgICByZXQuY29udGV4dCA9IHRoaXMuY29udGV4dDtcblxuICAgIC8vIFJldHVybiB0aGUgbmV3bHktZm9ybWVkIGVsZW1lbnQgc2V0XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICAvLyBFeGVjdXRlIGEgY2FsbGJhY2sgZm9yIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0LlxuICAvLyAoWW91IGNhbiBzZWVkIHRoZSBhcmd1bWVudHMgd2l0aCBhbiBhcnJheSBvZiBhcmdzLCBidXQgdGhpcyBpc1xuICAvLyBvbmx5IHVzZWQgaW50ZXJuYWxseS4pXG4gIGVhY2g6IGZ1bmN0aW9uKCBjYWxsYmFjaywgYXJncyApIHtcbiAgICByZXR1cm4galF1ZXJ5LmVhY2goIHRoaXMsIGNhbGxiYWNrLCBhcmdzICk7XG4gIH0sXG5cbiAgbWFwOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG4gICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWFwKHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBpICkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwoIGVsZW0sIGksIGVsZW0gKTtcbiAgICB9KSk7XG4gIH0sXG5cbiAgc2xpY2U6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggc2xpY2UuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApICk7XG4gIH0sXG5cbiAgZmlyc3Q6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVxKCAwICk7XG4gIH0sXG5cbiAgbGFzdDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXEoIC0xICk7XG4gIH0sXG5cbiAgZXE6IGZ1bmN0aW9uKCBpICkge1xuICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aCxcbiAgICAgIGogPSAraSArICggaSA8IDAgPyBsZW4gOiAwICk7XG4gICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqID49IDAgJiYgaiA8IGxlbiA/IFsgdGhpc1tqXSBdIDogW10gKTtcbiAgfSxcblxuICBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByZXZPYmplY3QgfHwgdGhpcy5jb25zdHJ1Y3RvcihudWxsKTtcbiAgfSxcblxuICAvLyBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gIC8vIEJlaGF2ZXMgbGlrZSBhbiBBcnJheSdzIG1ldGhvZCwgbm90IGxpa2UgYSBqUXVlcnkgbWV0aG9kLlxuICBwdXNoOiBwdXNoLFxuICBzb3J0OiBkZWxldGVkSWRzLnNvcnQsXG4gIHNwbGljZTogZGVsZXRlZElkcy5zcGxpY2Vcbn07XG5cbmpRdWVyeS5leHRlbmQgPSBqUXVlcnkuZm4uZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzcmMsIGNvcHlJc0FycmF5LCBjb3B5LCBuYW1lLCBvcHRpb25zLCBjbG9uZSxcbiAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXG4gICAgaSA9IDEsXG4gICAgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICBkZWVwID0gZmFsc2U7XG5cbiAgLy8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuICBpZiAoIHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiICkge1xuICAgIGRlZXAgPSB0YXJnZXQ7XG5cbiAgICAvLyBza2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG4gICAgdGFyZ2V0ID0gYXJndW1lbnRzWyBpIF0gfHwge307XG4gICAgaSsrO1xuICB9XG5cbiAgLy8gSGFuZGxlIGNhc2Ugd2hlbiB0YXJnZXQgaXMgYSBzdHJpbmcgb3Igc29tZXRoaW5nIChwb3NzaWJsZSBpbiBkZWVwIGNvcHkpXG4gIGlmICggdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIiAmJiAhalF1ZXJ5LmlzRnVuY3Rpb24odGFyZ2V0KSApIHtcbiAgICB0YXJnZXQgPSB7fTtcbiAgfVxuXG4gIC8vIGV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuICBpZiAoIGkgPT09IGxlbmd0aCApIHtcbiAgICB0YXJnZXQgPSB0aGlzO1xuICAgIGktLTtcbiAgfVxuXG4gIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgIC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcbiAgICBpZiAoIChvcHRpb25zID0gYXJndW1lbnRzWyBpIF0pICE9IG51bGwgKSB7XG4gICAgICAvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG4gICAgICBmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG4gICAgICAgIHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuICAgICAgICBjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG4gICAgICAgIC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3BcbiAgICAgICAgaWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcbiAgICAgICAgaWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBqUXVlcnkuaXNBcnJheShjb3B5KSkgKSApIHtcbiAgICAgICAgICBpZiAoIGNvcHlJc0FycmF5ICkge1xuICAgICAgICAgICAgY29weUlzQXJyYXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGNsb25lID0gc3JjICYmIGpRdWVyeS5pc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG4gICAgICAgICAgdGFyZ2V0WyBuYW1lIF0gPSBqUXVlcnkuZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG4gICAgICAgIC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcbiAgICAgICAgfSBlbHNlIGlmICggY29weSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgIHRhcmdldFsgbmFtZSBdID0gY29weTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgLy8gVW5pcXVlIGZvciBlYWNoIGNvcHkgb2YgalF1ZXJ5IG9uIHRoZSBwYWdlXG4gIGV4cGFuZG86IFwialF1ZXJ5XCIgKyAoIHZlcnNpb24gKyBNYXRoLnJhbmRvbSgpICkucmVwbGFjZSggL1xcRC9nLCBcIlwiICksXG5cbiAgLy8gQXNzdW1lIGpRdWVyeSBpcyByZWFkeSB3aXRob3V0IHRoZSByZWFkeSBtb2R1bGVcbiAgaXNSZWFkeTogdHJ1ZSxcblxuICBlcnJvcjogZnVuY3Rpb24oIG1zZyApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoIG1zZyApO1xuICB9LFxuXG4gIG5vb3A6IGZ1bmN0aW9uKCkge30sXG5cbiAgLy8gU2VlIHRlc3QvdW5pdC9jb3JlLmpzIGZvciBkZXRhaWxzIGNvbmNlcm5pbmcgaXNGdW5jdGlvbi5cbiAgLy8gU2luY2UgdmVyc2lvbiAxLjMsIERPTSBtZXRob2RzIGFuZCBmdW5jdGlvbnMgbGlrZSBhbGVydFxuICAvLyBhcmVuJ3Qgc3VwcG9ydGVkLiBUaGV5IHJldHVybiBmYWxzZSBvbiBJRSAoIzI5NjgpLlxuICBpc0Z1bmN0aW9uOiBmdW5jdGlvbiggb2JqICkge1xuICAgIHJldHVybiBqUXVlcnkudHlwZShvYmopID09PSBcImZ1bmN0aW9uXCI7XG4gIH0sXG5cbiAgaXNBcnJheTogQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiggb2JqICkge1xuICAgIHJldHVybiBqUXVlcnkudHlwZShvYmopID09PSBcImFycmF5XCI7XG4gIH0sXG5cbiAgaXNXaW5kb3c6IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09IG9iai53aW5kb3c7XG4gIH0sXG5cbiAgaXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xuICAgIC8vIHBhcnNlRmxvYXQgTmFOcyBudW1lcmljLWNhc3QgZmFsc2UgcG9zaXRpdmVzIChudWxsfHRydWV8ZmFsc2V8XCJcIilcbiAgICAvLyAuLi5idXQgbWlzaW50ZXJwcmV0cyBsZWFkaW5nLW51bWJlciBzdHJpbmdzLCBwYXJ0aWN1bGFybHkgaGV4IGxpdGVyYWxzIChcIjB4Li4uXCIpXG4gICAgLy8gc3VidHJhY3Rpb24gZm9yY2VzIGluZmluaXRpZXMgdG8gTmFOXG4gICAgLy8gYWRkaW5nIDEgY29ycmVjdHMgbG9zcyBvZiBwcmVjaXNpb24gZnJvbSBwYXJzZUZsb2F0ICgjMTUxMDApXG4gICAgcmV0dXJuICFqUXVlcnkuaXNBcnJheSggb2JqICkgJiYgKG9iaiAtIHBhcnNlRmxvYXQoIG9iaiApICsgMSkgPj0gMDtcbiAgfSxcblxuICBpc0VtcHR5T2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuICAgIHZhciBuYW1lO1xuICAgIGZvciAoIG5hbWUgaW4gb2JqICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICBpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuICAgIHZhciBrZXk7XG5cbiAgICAvLyBNdXN0IGJlIGFuIE9iamVjdC5cbiAgICAvLyBCZWNhdXNlIG9mIElFLCB3ZSBhbHNvIGhhdmUgdG8gY2hlY2sgdGhlIHByZXNlbmNlIG9mIHRoZSBjb25zdHJ1Y3RvciBwcm9wZXJ0eS5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCBET00gbm9kZXMgYW5kIHdpbmRvdyBvYmplY3RzIGRvbid0IHBhc3MgdGhyb3VnaCwgYXMgd2VsbFxuICAgIGlmICggIW9iaiB8fCBqUXVlcnkudHlwZShvYmopICE9PSBcIm9iamVjdFwiIHx8IG9iai5ub2RlVHlwZSB8fCBqUXVlcnkuaXNXaW5kb3coIG9iaiApICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBOb3Qgb3duIGNvbnN0cnVjdG9yIHByb3BlcnR5IG11c3QgYmUgT2JqZWN0XG4gICAgICBpZiAoIG9iai5jb25zdHJ1Y3RvciAmJlxuICAgICAgICAhaGFzT3duLmNhbGwob2JqLCBcImNvbnN0cnVjdG9yXCIpICYmXG4gICAgICAgICFoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCBcImlzUHJvdG90eXBlT2ZcIikgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIC8vIElFOCw5IFdpbGwgdGhyb3cgZXhjZXB0aW9ucyBvbiBjZXJ0YWluIGhvc3Qgb2JqZWN0cyAjOTg5N1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAvLyBIYW5kbGUgaXRlcmF0aW9uIG92ZXIgaW5oZXJpdGVkIHByb3BlcnRpZXMgYmVmb3JlIG93biBwcm9wZXJ0aWVzLlxuICAgIGlmICggc3VwcG9ydC5vd25MYXN0ICkge1xuICAgICAgZm9yICgga2V5IGluIG9iaiApIHtcbiAgICAgICAgcmV0dXJuIGhhc093bi5jYWxsKCBvYmosIGtleSApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuICAgIC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duLlxuICAgIGZvciAoIGtleSBpbiBvYmogKSB7fVxuXG4gICAgcmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkIHx8IGhhc093bi5jYWxsKCBvYmosIGtleSApO1xuICB9LFxuXG4gIHR5cGU6IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgaWYgKCBvYmogPT0gbnVsbCApIHtcbiAgICAgIHJldHVybiBvYmogKyBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgP1xuICAgICAgY2xhc3MydHlwZVsgdG9TdHJpbmcuY2FsbChvYmopIF0gfHwgXCJvYmplY3RcIiA6XG4gICAgICB0eXBlb2Ygb2JqO1xuICB9LFxuXG4gIC8vIEV2YWx1YXRlcyBhIHNjcmlwdCBpbiBhIGdsb2JhbCBjb250ZXh0XG4gIC8vIFdvcmthcm91bmRzIGJhc2VkIG9uIGZpbmRpbmdzIGJ5IEppbSBEcmlzY29sbFxuICAvLyBodHRwOi8vd2VibG9ncy5qYXZhLm5ldC9ibG9nL2RyaXNjb2xsL2FyY2hpdmUvMjAwOS8wOS8wOC9ldmFsLWphdmFzY3JpcHQtZ2xvYmFsLWNvbnRleHRcbiAgZ2xvYmFsRXZhbDogZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgaWYgKCBkYXRhICYmIGpRdWVyeS50cmltKCBkYXRhICkgKSB7XG4gICAgICAvLyBXZSB1c2UgZXhlY1NjcmlwdCBvbiBJbnRlcm5ldCBFeHBsb3JlclxuICAgICAgLy8gV2UgdXNlIGFuIGFub255bW91cyBmdW5jdGlvbiBzbyB0aGF0IGNvbnRleHQgaXMgd2luZG93XG4gICAgICAvLyByYXRoZXIgdGhhbiBqUXVlcnkgaW4gRmlyZWZveFxuICAgICAgKCB3aW5kb3cuZXhlY1NjcmlwdCB8fCBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgd2luZG93WyBcImV2YWxcIiBdLmNhbGwoIHdpbmRvdywgZGF0YSApO1xuICAgICAgfSApKCBkYXRhICk7XG4gICAgfVxuICB9LFxuXG4gIC8vIENvbnZlcnQgZGFzaGVkIHRvIGNhbWVsQ2FzZTsgdXNlZCBieSB0aGUgY3NzIGFuZCBkYXRhIG1vZHVsZXNcbiAgLy8gTWljcm9zb2Z0IGZvcmdvdCB0byBodW1wIHRoZWlyIHZlbmRvciBwcmVmaXggKCM5NTcyKVxuICBjYW1lbENhc2U6IGZ1bmN0aW9uKCBzdHJpbmcgKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCBybXNQcmVmaXgsIFwibXMtXCIgKS5yZXBsYWNlKCByZGFzaEFscGhhLCBmY2FtZWxDYXNlICk7XG4gIH0sXG5cbiAgbm9kZU5hbWU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuICAgIHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICB9LFxuXG4gIC8vIGFyZ3MgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcbiAgZWFjaDogZnVuY3Rpb24oIG9iaiwgY2FsbGJhY2ssIGFyZ3MgKSB7XG4gICAgdmFyIHZhbHVlLFxuICAgICAgaSA9IDAsXG4gICAgICBsZW5ndGggPSBvYmoubGVuZ3RoLFxuICAgICAgaXNBcnJheSA9IGlzQXJyYXlsaWtlKCBvYmogKTtcblxuICAgIGlmICggYXJncyApIHtcbiAgICAgIGlmICggaXNBcnJheSApIHtcbiAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFsdWUgPSBjYWxsYmFjay5hcHBseSggb2JqWyBpIF0sIGFyZ3MgKTtcblxuICAgICAgICAgIGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKCBpIGluIG9iaiApIHtcbiAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmFwcGx5KCBvYmpbIGkgXSwgYXJncyApO1xuXG4gICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIC8vIEEgc3BlY2lhbCwgZmFzdCwgY2FzZSBmb3IgdGhlIG1vc3QgY29tbW9uIHVzZSBvZiBlYWNoXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICggaXNBcnJheSApIHtcbiAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFsdWUgPSBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKTtcblxuICAgICAgICAgIGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKCBpIGluIG9iaiApIHtcbiAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApO1xuXG4gICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xuICB9LFxuXG4gIC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4xLCBJRTw5XG4gIHRyaW06IGZ1bmN0aW9uKCB0ZXh0ICkge1xuICAgIHJldHVybiB0ZXh0ID09IG51bGwgP1xuICAgICAgXCJcIiA6XG4gICAgICAoIHRleHQgKyBcIlwiICkucmVwbGFjZSggcnRyaW0sIFwiXCIgKTtcbiAgfSxcblxuICAvLyByZXN1bHRzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG4gIG1ha2VBcnJheTogZnVuY3Rpb24oIGFyciwgcmVzdWx0cyApIHtcbiAgICB2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcblxuICAgIGlmICggYXJyICE9IG51bGwgKSB7XG4gICAgICBpZiAoIGlzQXJyYXlsaWtlKCBPYmplY3QoYXJyKSApICkge1xuICAgICAgICBqUXVlcnkubWVyZ2UoIHJldCxcbiAgICAgICAgICB0eXBlb2YgYXJyID09PSBcInN0cmluZ1wiID9cbiAgICAgICAgICBbIGFyciBdIDogYXJyXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwdXNoLmNhbGwoIHJldCwgYXJyICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICBpbkFycmF5OiBmdW5jdGlvbiggZWxlbSwgYXJyLCBpICkge1xuICAgIHZhciBsZW47XG5cbiAgICBpZiAoIGFyciApIHtcbiAgICAgIGlmICggaW5kZXhPZiApIHtcbiAgICAgICAgcmV0dXJuIGluZGV4T2YuY2FsbCggYXJyLCBlbGVtLCBpICk7XG4gICAgICB9XG5cbiAgICAgIGxlbiA9IGFyci5sZW5ndGg7XG4gICAgICBpID0gaSA/IGkgPCAwID8gTWF0aC5tYXgoIDAsIGxlbiArIGkgKSA6IGkgOiAwO1xuXG4gICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgLy8gU2tpcCBhY2Nlc3NpbmcgaW4gc3BhcnNlIGFycmF5c1xuICAgICAgICBpZiAoIGkgaW4gYXJyICYmIGFyclsgaSBdID09PSBlbGVtICkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIC0xO1xuICB9LFxuXG4gIG1lcmdlOiBmdW5jdGlvbiggZmlyc3QsIHNlY29uZCApIHtcbiAgICB2YXIgbGVuID0gK3NlY29uZC5sZW5ndGgsXG4gICAgICBqID0gMCxcbiAgICAgIGkgPSBmaXJzdC5sZW5ndGg7XG5cbiAgICB3aGlsZSAoIGogPCBsZW4gKSB7XG4gICAgICBmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGorKyBdO1xuICAgIH1cblxuICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAvLyBXb3JrYXJvdW5kIGNhc3Rpbmcgb2YgLmxlbmd0aCB0byBOYU4gb24gb3RoZXJ3aXNlIGFycmF5bGlrZSBvYmplY3RzIChlLmcuLCBOb2RlTGlzdHMpXG4gICAgaWYgKCBsZW4gIT09IGxlbiApIHtcbiAgICAgIHdoaWxlICggc2Vjb25kW2pdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGZpcnN0WyBpKysgXSA9IHNlY29uZFsgaisrIF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZmlyc3QubGVuZ3RoID0gaTtcblxuICAgIHJldHVybiBmaXJzdDtcbiAgfSxcblxuICBncmVwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBpbnZlcnQgKSB7XG4gICAgdmFyIGNhbGxiYWNrSW52ZXJzZSxcbiAgICAgIG1hdGNoZXMgPSBbXSxcbiAgICAgIGkgPSAwLFxuICAgICAgbGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxuICAgICAgY2FsbGJhY2tFeHBlY3QgPSAhaW52ZXJ0O1xuXG4gICAgLy8gR28gdGhyb3VnaCB0aGUgYXJyYXksIG9ubHkgc2F2aW5nIHRoZSBpdGVtc1xuICAgIC8vIHRoYXQgcGFzcyB0aGUgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICBjYWxsYmFja0ludmVyc2UgPSAhY2FsbGJhY2soIGVsZW1zWyBpIF0sIGkgKTtcbiAgICAgIGlmICggY2FsbGJhY2tJbnZlcnNlICE9PSBjYWxsYmFja0V4cGVjdCApIHtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKCBlbGVtc1sgaSBdICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH0sXG5cbiAgLy8gYXJnIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG4gIG1hcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgYXJnICkge1xuICAgIHZhciB2YWx1ZSxcbiAgICAgIGkgPSAwLFxuICAgICAgbGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxuICAgICAgaXNBcnJheSA9IGlzQXJyYXlsaWtlKCBlbGVtcyApLFxuICAgICAgcmV0ID0gW107XG5cbiAgICAvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgdHJhbnNsYXRpbmcgZWFjaCBvZiB0aGUgaXRlbXMgdG8gdGhlaXIgbmV3IHZhbHVlc1xuICAgIGlmICggaXNBcnJheSApIHtcbiAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuICAgICAgICBpZiAoIHZhbHVlICE9IG51bGwgKSB7XG4gICAgICAgICAgcmV0LnB1c2goIHZhbHVlICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIC8vIEdvIHRocm91Z2ggZXZlcnkga2V5IG9uIHRoZSBvYmplY3QsXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoIGkgaW4gZWxlbXMgKSB7XG4gICAgICAgIHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG4gICAgICAgIGlmICggdmFsdWUgIT0gbnVsbCApIHtcbiAgICAgICAgICByZXQucHVzaCggdmFsdWUgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcbiAgICByZXR1cm4gY29uY2F0LmFwcGx5KCBbXSwgcmV0ICk7XG4gIH0sXG5cbiAgLy8gQSBnbG9iYWwgR1VJRCBjb3VudGVyIGZvciBvYmplY3RzXG4gIGd1aWQ6IDEsXG5cbiAgLy8gQmluZCBhIGZ1bmN0aW9uIHRvIGEgY29udGV4dCwgb3B0aW9uYWxseSBwYXJ0aWFsbHkgYXBwbHlpbmcgYW55XG4gIC8vIGFyZ3VtZW50cy5cbiAgcHJveHk6IGZ1bmN0aW9uKCBmbiwgY29udGV4dCApIHtcbiAgICB2YXIgYXJncywgcHJveHksIHRtcDtcblxuICAgIGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICB0bXAgPSBmblsgY29udGV4dCBdO1xuICAgICAgY29udGV4dCA9IGZuO1xuICAgICAgZm4gPSB0bXA7XG4gICAgfVxuXG4gICAgLy8gUXVpY2sgY2hlY2sgdG8gZGV0ZXJtaW5lIGlmIHRhcmdldCBpcyBjYWxsYWJsZSwgaW4gdGhlIHNwZWNcbiAgICAvLyB0aGlzIHRocm93cyBhIFR5cGVFcnJvciwgYnV0IHdlIHdpbGwganVzdCByZXR1cm4gdW5kZWZpbmVkLlxuICAgIGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCBmbiApICkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBTaW11bGF0ZWQgYmluZFxuICAgIGFyZ3MgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMsIDIgKTtcbiAgICBwcm94eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KCBjb250ZXh0IHx8IHRoaXMsIGFyZ3MuY29uY2F0KCBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSApICk7XG4gICAgfTtcblxuICAgIC8vIFNldCB0aGUgZ3VpZCBvZiB1bmlxdWUgaGFuZGxlciB0byB0aGUgc2FtZSBvZiBvcmlnaW5hbCBoYW5kbGVyLCBzbyBpdCBjYW4gYmUgcmVtb3ZlZFxuICAgIHByb3h5Lmd1aWQgPSBmbi5ndWlkID0gZm4uZ3VpZCB8fCBqUXVlcnkuZ3VpZCsrO1xuXG4gICAgcmV0dXJuIHByb3h5O1xuICB9LFxuXG4gIG5vdzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICsoIG5ldyBEYXRlKCkgKTtcbiAgfSxcblxuICAvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcbiAgLy8gcHJvcGVydGllcyB0byBpdCBzbyBpdCBuZWVkcyB0byBleGlzdC5cbiAgc3VwcG9ydDogc3VwcG9ydFxufSk7XG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxualF1ZXJ5LmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbihpLCBuYW1lKSB7XG4gIGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbmZ1bmN0aW9uIGlzQXJyYXlsaWtlKCBvYmogKSB7XG5cbiAgLy8gU3VwcG9ydDogaU9TIDguMiAobm90IHJlcHJvZHVjaWJsZSBpbiBzaW11bGF0b3IpXG4gIC8vIGBpbmAgY2hlY2sgdXNlZCB0byBwcmV2ZW50IEpJVCBlcnJvciAoZ2gtMjE0NSlcbiAgLy8gaGFzT3duIGlzbid0IHVzZWQgaGVyZSBkdWUgdG8gZmFsc2UgbmVnYXRpdmVzXG4gIC8vIHJlZ2FyZGluZyBOb2RlbGlzdCBsZW5ndGggaW4gSUVcbiAgdmFyIGxlbmd0aCA9IFwibGVuZ3RoXCIgaW4gb2JqICYmIG9iai5sZW5ndGgsXG4gICAgdHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblxuICBpZiAoIHR5cGUgPT09IFwiZnVuY3Rpb25cIiB8fCBqUXVlcnkuaXNXaW5kb3coIG9iaiApICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICggb2JqLm5vZGVUeXBlID09PSAxICYmIGxlbmd0aCApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlID09PSBcImFycmF5XCIgfHwgbGVuZ3RoID09PSAwIHx8XG4gICAgdHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIiAmJiBsZW5ndGggPiAwICYmICggbGVuZ3RoIC0gMSApIGluIG9iajtcbn1cbnZhciBTaXp6bGUgPVxuLyohXG4gKiBTaXp6bGUgQ1NTIFNlbGVjdG9yIEVuZ2luZSB2Mi4yLjAtcHJlXG4gKiBodHRwOi8vc2l6emxlanMuY29tL1xuICpcbiAqIENvcHlyaWdodCAyMDA4LCAyMDE0IGpRdWVyeSBGb3VuZGF0aW9uLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTQtMTItMTZcbiAqL1xuKGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG5cbnZhciBpLFxuICBzdXBwb3J0LFxuICBFeHByLFxuICBnZXRUZXh0LFxuICBpc1hNTCxcbiAgdG9rZW5pemUsXG4gIGNvbXBpbGUsXG4gIHNlbGVjdCxcbiAgb3V0ZXJtb3N0Q29udGV4dCxcbiAgc29ydElucHV0LFxuICBoYXNEdXBsaWNhdGUsXG5cbiAgLy8gTG9jYWwgZG9jdW1lbnQgdmFyc1xuICBzZXREb2N1bWVudCxcbiAgZG9jdW1lbnQsXG4gIGRvY0VsZW0sXG4gIGRvY3VtZW50SXNIVE1MLFxuICByYnVnZ3lRU0EsXG4gIHJidWdneU1hdGNoZXMsXG4gIG1hdGNoZXMsXG4gIGNvbnRhaW5zLFxuXG4gIC8vIEluc3RhbmNlLXNwZWNpZmljIGRhdGFcbiAgZXhwYW5kbyA9IFwic2l6emxlXCIgKyAxICogbmV3IERhdGUoKSxcbiAgcHJlZmVycmVkRG9jID0gd2luZG93LmRvY3VtZW50LFxuICBkaXJydW5zID0gMCxcbiAgZG9uZSA9IDAsXG4gIGNsYXNzQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuICB0b2tlbkNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcbiAgY29tcGlsZXJDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG4gIHNvcnRPcmRlciA9IGZ1bmN0aW9uKCBhLCBiICkge1xuICAgIGlmICggYSA9PT0gYiApIHtcbiAgICAgIGhhc0R1cGxpY2F0ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9LFxuXG4gIC8vIEdlbmVyYWwtcHVycG9zZSBjb25zdGFudHNcbiAgTUFYX05FR0FUSVZFID0gMSA8PCAzMSxcblxuICAvLyBJbnN0YW5jZSBtZXRob2RzXG4gIGhhc093biA9ICh7fSkuaGFzT3duUHJvcGVydHksXG4gIGFyciA9IFtdLFxuICBwb3AgPSBhcnIucG9wLFxuICBwdXNoX25hdGl2ZSA9IGFyci5wdXNoLFxuICBwdXNoID0gYXJyLnB1c2gsXG4gIHNsaWNlID0gYXJyLnNsaWNlLFxuICAvLyBVc2UgYSBzdHJpcHBlZC1kb3duIGluZGV4T2YgYXMgaXQncyBmYXN0ZXIgdGhhbiBuYXRpdmVcbiAgLy8gaHR0cDovL2pzcGVyZi5jb20vdGhvci1pbmRleG9mLXZzLWZvci81XG4gIGluZGV4T2YgPSBmdW5jdGlvbiggbGlzdCwgZWxlbSApIHtcbiAgICB2YXIgaSA9IDAsXG4gICAgICBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgIGlmICggbGlzdFtpXSA9PT0gZWxlbSApIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfSxcblxuICBib29sZWFucyA9IFwiY2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufGlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWRcIixcblxuICAvLyBSZWd1bGFyIGV4cHJlc3Npb25zXG5cbiAgLy8gV2hpdGVzcGFjZSBjaGFyYWN0ZXJzIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyN3aGl0ZXNwYWNlXG4gIHdoaXRlc3BhY2UgPSBcIltcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGZdXCIsXG4gIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc3ludGF4LyNjaGFyYWN0ZXJzXG4gIGNoYXJhY3RlckVuY29kaW5nID0gXCIoPzpcXFxcXFxcXC58W1xcXFx3LV18W15cXFxceDAwLVxcXFx4YTBdKStcIixcblxuICAvLyBMb29zZWx5IG1vZGVsZWQgb24gQ1NTIGlkZW50aWZpZXIgY2hhcmFjdGVyc1xuICAvLyBBbiB1bnF1b3RlZCB2YWx1ZSBzaG91bGQgYmUgYSBDU1MgaWRlbnRpZmllciBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXNlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuICAvLyBQcm9wZXIgc3ludGF4OiBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjdmFsdWUtZGVmLWlkZW50aWZpZXJcbiAgaWRlbnRpZmllciA9IGNoYXJhY3RlckVuY29kaW5nLnJlcGxhY2UoIFwid1wiLCBcIncjXCIgKSxcblxuICAvLyBBdHRyaWJ1dGUgc2VsZWN0b3JzOiBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2F0dHJpYnV0ZS1zZWxlY3RvcnNcbiAgYXR0cmlidXRlcyA9IFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooXCIgKyBjaGFyYWN0ZXJFbmNvZGluZyArIFwiKSg/OlwiICsgd2hpdGVzcGFjZSArXG4gICAgLy8gT3BlcmF0b3IgKGNhcHR1cmUgMilcbiAgICBcIiooWypeJHwhfl0/PSlcIiArIHdoaXRlc3BhY2UgK1xuICAgIC8vIFwiQXR0cmlidXRlIHZhbHVlcyBtdXN0IGJlIENTUyBpZGVudGlmaWVycyBbY2FwdHVyZSA1XSBvciBzdHJpbmdzIFtjYXB0dXJlIDMgb3IgY2FwdHVyZSA0XVwiXG4gICAgXCIqKD86JygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwifChcIiArIGlkZW50aWZpZXIgKyBcIikpfClcIiArIHdoaXRlc3BhY2UgK1xuICAgIFwiKlxcXFxdXCIsXG5cbiAgcHNldWRvcyA9IFwiOihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpKD86XFxcXCgoXCIgK1xuICAgIC8vIFRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHNlbGVjdG9ycyBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBwcmVGaWx0ZXIsIHByZWZlciBhcmd1bWVudHM6XG4gICAgLy8gMS4gcXVvdGVkIChjYXB0dXJlIDM7IGNhcHR1cmUgNCBvciBjYXB0dXJlIDUpXG4gICAgXCIoJygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwiKXxcIiArXG4gICAgLy8gMi4gc2ltcGxlIChjYXB0dXJlIDYpXG4gICAgXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKVtcXFxcXV18XCIgKyBhdHRyaWJ1dGVzICsgXCIpKil8XCIgK1xuICAgIC8vIDMuIGFueXRoaW5nIGVsc2UgKGNhcHR1cmUgMilcbiAgICBcIi4qXCIgK1xuICAgIFwiKVxcXFwpfClcIixcblxuICAvLyBMZWFkaW5nIGFuZCBub24tZXNjYXBlZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBjYXB0dXJpbmcgc29tZSBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHByZWNlZGluZyB0aGUgbGF0dGVyXG4gIHJ3aGl0ZXNwYWNlID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwiK1wiLCBcImdcIiApLFxuICBydHJpbSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIiArIHdoaXRlc3BhY2UgKyBcIiskXCIsIFwiZ1wiICksXG5cbiAgcmNvbW1hID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqLFwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG4gIHJjb21iaW5hdG9ycyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXG4gIHJhdHRyaWJ1dGVRdW90ZXMgPSBuZXcgUmVnRXhwKCBcIj1cIiArIHdoaXRlc3BhY2UgKyBcIiooW15cXFxcXSdcXFwiXSo/KVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFxdXCIsIFwiZ1wiICksXG5cbiAgcnBzZXVkbyA9IG5ldyBSZWdFeHAoIHBzZXVkb3MgKSxcbiAgcmlkZW50aWZpZXIgPSBuZXcgUmVnRXhwKCBcIl5cIiArIGlkZW50aWZpZXIgKyBcIiRcIiApLFxuXG4gIG1hdGNoRXhwciA9IHtcbiAgICBcIklEXCI6IG5ldyBSZWdFeHAoIFwiXiMoXCIgKyBjaGFyYWN0ZXJFbmNvZGluZyArIFwiKVwiICksXG4gICAgXCJDTEFTU1wiOiBuZXcgUmVnRXhwKCBcIl5cXFxcLihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIgKSxcbiAgICBcIlRBR1wiOiBuZXcgUmVnRXhwKCBcIl4oXCIgKyBjaGFyYWN0ZXJFbmNvZGluZy5yZXBsYWNlKCBcIndcIiwgXCJ3KlwiICkgKyBcIilcIiApLFxuICAgIFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcbiAgICBcIlBTRVVET1wiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHBzZXVkb3MgKSxcbiAgICBcIkNISUxEXCI6IG5ldyBSZWdFeHAoIFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIiArIHdoaXRlc3BhY2UgK1xuICAgICAgXCIqKGV2ZW58b2RkfCgoWystXXwpKFxcXFxkKilufClcIiArIHdoaXRlc3BhY2UgKyBcIiooPzooWystXXwpXCIgKyB3aGl0ZXNwYWNlICtcbiAgICAgIFwiKihcXFxcZCspfCkpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KVwiLCBcImlcIiApLFxuICAgIFwiYm9vbFwiOiBuZXcgUmVnRXhwKCBcIl4oPzpcIiArIGJvb2xlYW5zICsgXCIpJFwiLCBcImlcIiApLFxuICAgIC8vIEZvciB1c2UgaW4gbGlicmFyaWVzIGltcGxlbWVudGluZyAuaXMoKVxuICAgIC8vIFdlIHVzZSB0aGlzIGZvciBQT1MgbWF0Y2hpbmcgaW4gYHNlbGVjdGBcbiAgICBcIm5lZWRzQ29udGV4dFwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIipbPit+XXw6KGV2ZW58b2RkfGVxfGd0fGx0fG50aHxmaXJzdHxsYXN0KSg/OlxcXFwoXCIgK1xuICAgICAgd2hpdGVzcGFjZSArIFwiKigoPzotXFxcXGQpP1xcXFxkKilcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpKD89W14tXXwkKVwiLCBcImlcIiApXG4gIH0sXG5cbiAgcmlucHV0cyA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG4gIHJoZWFkZXIgPSAvXmhcXGQkL2ksXG5cbiAgcm5hdGl2ZSA9IC9eW157XStcXHtcXHMqXFxbbmF0aXZlIFxcdy8sXG5cbiAgLy8gRWFzaWx5LXBhcnNlYWJsZS9yZXRyaWV2YWJsZSBJRCBvciBUQUcgb3IgQ0xBU1Mgc2VsZWN0b3JzXG4gIHJxdWlja0V4cHIgPSAvXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxcblxuICByc2libGluZyA9IC9bK35dLyxcbiAgcmVzY2FwZSA9IC8nfFxcXFwvZyxcblxuICAvLyBDU1MgZXNjYXBlcyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjZXNjYXBlZC1jaGFyYWN0ZXJzXG4gIHJ1bmVzY2FwZSA9IG5ldyBSZWdFeHAoIFwiXFxcXFxcXFwoW1xcXFxkYS1mXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICsgXCI/fChcIiArIHdoaXRlc3BhY2UgKyBcIil8LilcIiwgXCJpZ1wiICksXG4gIGZ1bmVzY2FwZSA9IGZ1bmN0aW9uKCBfLCBlc2NhcGVkLCBlc2NhcGVkV2hpdGVzcGFjZSApIHtcbiAgICB2YXIgaGlnaCA9IFwiMHhcIiArIGVzY2FwZWQgLSAweDEwMDAwO1xuICAgIC8vIE5hTiBtZWFucyBub24tY29kZXBvaW50XG4gICAgLy8gU3VwcG9ydDogRmlyZWZveDwyNFxuICAgIC8vIFdvcmthcm91bmQgZXJyb25lb3VzIG51bWVyaWMgaW50ZXJwcmV0YXRpb24gb2YgK1wiMHhcIlxuICAgIHJldHVybiBoaWdoICE9PSBoaWdoIHx8IGVzY2FwZWRXaGl0ZXNwYWNlID9cbiAgICAgIGVzY2FwZWQgOlxuICAgICAgaGlnaCA8IDAgP1xuICAgICAgICAvLyBCTVAgY29kZXBvaW50XG4gICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggKyAweDEwMDAwICkgOlxuICAgICAgICAvLyBTdXBwbGVtZW50YWwgUGxhbmUgY29kZXBvaW50IChzdXJyb2dhdGUgcGFpcilcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCA+PiAxMCB8IDB4RDgwMCwgaGlnaCAmIDB4M0ZGIHwgMHhEQzAwICk7XG4gIH0sXG5cbiAgLy8gVXNlZCBmb3IgaWZyYW1lc1xuICAvLyBTZWUgc2V0RG9jdW1lbnQoKVxuICAvLyBSZW1vdmluZyB0aGUgZnVuY3Rpb24gd3JhcHBlciBjYXVzZXMgYSBcIlBlcm1pc3Npb24gRGVuaWVkXCJcbiAgLy8gZXJyb3IgaW4gSUVcbiAgdW5sb2FkSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHNldERvY3VtZW50KCk7XG4gIH07XG5cbi8vIE9wdGltaXplIGZvciBwdXNoLmFwcGx5KCBfLCBOb2RlTGlzdCApXG50cnkge1xuICBwdXNoLmFwcGx5KFxuICAgIChhcnIgPSBzbGljZS5jYWxsKCBwcmVmZXJyZWREb2MuY2hpbGROb2RlcyApKSxcbiAgICBwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xuICApO1xuICAvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuICAvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XG4gIGFyclsgcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMubGVuZ3RoIF0ubm9kZVR5cGU7XG59IGNhdGNoICggZSApIHtcbiAgcHVzaCA9IHsgYXBwbHk6IGFyci5sZW5ndGggP1xuXG4gICAgLy8gTGV2ZXJhZ2Ugc2xpY2UgaWYgcG9zc2libGVcbiAgICBmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG4gICAgICBwdXNoX25hdGl2ZS5hcHBseSggdGFyZ2V0LCBzbGljZS5jYWxsKGVscykgKTtcbiAgICB9IDpcblxuICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAvLyBPdGhlcndpc2UgYXBwZW5kIGRpcmVjdGx5XG4gICAgZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuICAgICAgdmFyIGogPSB0YXJnZXQubGVuZ3RoLFxuICAgICAgICBpID0gMDtcbiAgICAgIC8vIENhbid0IHRydXN0IE5vZGVMaXN0Lmxlbmd0aFxuICAgICAgd2hpbGUgKCAodGFyZ2V0W2orK10gPSBlbHNbaSsrXSkgKSB7fVxuICAgICAgdGFyZ2V0Lmxlbmd0aCA9IGogLSAxO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gU2l6emxlKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcbiAgdmFyIG1hdGNoLCBlbGVtLCBtLCBub2RlVHlwZSxcbiAgICAvLyBRU0EgdmFyc1xuICAgIGksIGdyb3Vwcywgb2xkLCBuaWQsIG5ld0NvbnRleHQsIG5ld1NlbGVjdG9yO1xuXG4gIGlmICggKCBjb250ZXh0ID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBwcmVmZXJyZWREb2MgKSAhPT0gZG9jdW1lbnQgKSB7XG4gICAgc2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcbiAgfVxuXG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcbiAgbm9kZVR5cGUgPSBjb250ZXh0Lm5vZGVUeXBlO1xuXG4gIGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiIHx8ICFzZWxlY3RvciB8fFxuICAgIG5vZGVUeXBlICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ICYmIG5vZGVUeXBlICE9PSAxMSApIHtcblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgaWYgKCAhc2VlZCAmJiBkb2N1bWVudElzSFRNTCApIHtcblxuICAgIC8vIFRyeSB0byBzaG9ydGN1dCBmaW5kIG9wZXJhdGlvbnMgd2hlbiBwb3NzaWJsZSAoZS5nLiwgbm90IHVuZGVyIERvY3VtZW50RnJhZ21lbnQpXG4gICAgaWYgKCBub2RlVHlwZSAhPT0gMTEgJiYgKG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApKSApIHtcbiAgICAgIC8vIFNwZWVkLXVwOiBTaXp6bGUoXCIjSURcIilcbiAgICAgIGlmICggKG0gPSBtYXRjaFsxXSkgKSB7XG4gICAgICAgIGlmICggbm9kZVR5cGUgPT09IDkgKSB7XG4gICAgICAgICAgZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKTtcbiAgICAgICAgICAvLyBDaGVjayBwYXJlbnROb2RlIHRvIGNhdGNoIHdoZW4gQmxhY2tiZXJyeSA0LjYgcmV0dXJuc1xuICAgICAgICAgIC8vIG5vZGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgZG9jdW1lbnQgKGpRdWVyeSAjNjk2MylcbiAgICAgICAgICBpZiAoIGVsZW0gJiYgZWxlbS5wYXJlbnROb2RlICkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIElFLCBPcGVyYSwgYW5kIFdlYmtpdCByZXR1cm4gaXRlbXNcbiAgICAgICAgICAgIC8vIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuICAgICAgICAgICAgaWYgKCBlbGVtLmlkID09PSBtICkge1xuICAgICAgICAgICAgICByZXN1bHRzLnB1c2goIGVsZW0gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBDb250ZXh0IGlzIG5vdCBhIGRvY3VtZW50XG4gICAgICAgICAgaWYgKCBjb250ZXh0Lm93bmVyRG9jdW1lbnQgJiYgKGVsZW0gPSBjb250ZXh0Lm93bmVyRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG0gKSkgJiZcbiAgICAgICAgICAgIGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICkgJiYgZWxlbS5pZCA9PT0gbSApIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCggZWxlbSApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIC8vIFNwZWVkLXVwOiBTaXp6bGUoXCJUQUdcIilcbiAgICAgIH0gZWxzZSBpZiAoIG1hdGNoWzJdICkge1xuICAgICAgICBwdXNoLmFwcGx5KCByZXN1bHRzLCBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBzZWxlY3RvciApICk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuXG4gICAgICAvLyBTcGVlZC11cDogU2l6emxlKFwiLkNMQVNTXCIpXG4gICAgICB9IGVsc2UgaWYgKCAobSA9IG1hdGNoWzNdKSAmJiBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKSB7XG4gICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggbSApICk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFFTQSBwYXRoXG4gICAgaWYgKCBzdXBwb3J0LnFzYSAmJiAoIXJidWdneVFTQSB8fCAhcmJ1Z2d5UVNBLnRlc3QoIHNlbGVjdG9yICkpICkge1xuICAgICAgbmlkID0gb2xkID0gZXhwYW5kbztcbiAgICAgIG5ld0NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgbmV3U2VsZWN0b3IgPSBub2RlVHlwZSAhPT0gMSAmJiBzZWxlY3RvcjtcblxuICAgICAgLy8gcVNBIHdvcmtzIHN0cmFuZ2VseSBvbiBFbGVtZW50LXJvb3RlZCBxdWVyaWVzXG4gICAgICAvLyBXZSBjYW4gd29yayBhcm91bmQgdGhpcyBieSBzcGVjaWZ5aW5nIGFuIGV4dHJhIElEIG9uIHRoZSByb290XG4gICAgICAvLyBhbmQgd29ya2luZyB1cCBmcm9tIHRoZXJlIChUaGFua3MgdG8gQW5kcmV3IER1cG9udCBmb3IgdGhlIHRlY2huaXF1ZSlcbiAgICAgIC8vIElFIDggZG9lc24ndCB3b3JrIG9uIG9iamVjdCBlbGVtZW50c1xuICAgICAgaWYgKCBub2RlVHlwZSA9PT0gMSAmJiBjb250ZXh0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwib2JqZWN0XCIgKSB7XG4gICAgICAgIGdyb3VwcyA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuXG4gICAgICAgIGlmICggKG9sZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKFwiaWRcIikpICkge1xuICAgICAgICAgIG5pZCA9IG9sZC5yZXBsYWNlKCByZXNjYXBlLCBcIlxcXFwkJlwiICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGV4dC5zZXRBdHRyaWJ1dGUoIFwiaWRcIiwgbmlkICk7XG4gICAgICAgIH1cbiAgICAgICAgbmlkID0gXCJbaWQ9J1wiICsgbmlkICsgXCInXSBcIjtcblxuICAgICAgICBpID0gZ3JvdXBzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgZ3JvdXBzW2ldID0gbmlkICsgdG9TZWxlY3RvciggZ3JvdXBzW2ldICk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3Q29udGV4dCA9IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHQ7XG4gICAgICAgIG5ld1NlbGVjdG9yID0gZ3JvdXBzLmpvaW4oXCIsXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIG5ld1NlbGVjdG9yICkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsXG4gICAgICAgICAgICBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIG5ld1NlbGVjdG9yIClcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9IGNhdGNoKHFzYUVycm9yKSB7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKCAhb2xkICkge1xuICAgICAgICAgICAgY29udGV4dC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBbGwgb3RoZXJzXG4gIHJldHVybiBzZWxlY3QoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApO1xufVxuXG4vKipcbiAqIENyZWF0ZSBrZXktdmFsdWUgY2FjaGVzIG9mIGxpbWl0ZWQgc2l6ZVxuICogQHJldHVybnMge0Z1bmN0aW9uKHN0cmluZywgT2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxuICogIHByb3BlcnR5IG5hbWUgdGhlIChzcGFjZS1zdWZmaXhlZCkgc3RyaW5nIGFuZCAoaWYgdGhlIGNhY2hlIGlzIGxhcmdlciB0aGFuIEV4cHIuY2FjaGVMZW5ndGgpXG4gKiAgZGVsZXRpbmcgdGhlIG9sZGVzdCBlbnRyeVxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcbiAgdmFyIGtleXMgPSBbXTtcblxuICBmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcbiAgICAvLyBVc2UgKGtleSArIFwiIFwiKSB0byBhdm9pZCBjb2xsaXNpb24gd2l0aCBuYXRpdmUgcHJvdG90eXBlIHByb3BlcnRpZXMgKHNlZSBJc3N1ZSAjMTU3KVxuICAgIGlmICgga2V5cy5wdXNoKCBrZXkgKyBcIiBcIiApID4gRXhwci5jYWNoZUxlbmd0aCApIHtcbiAgICAgIC8vIE9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZW50cmllc1xuICAgICAgZGVsZXRlIGNhY2hlWyBrZXlzLnNoaWZ0KCkgXTtcbiAgICB9XG4gICAgcmV0dXJuIChjYWNoZVsga2V5ICsgXCIgXCIgXSA9IHZhbHVlKTtcbiAgfVxuICByZXR1cm4gY2FjaGU7XG59XG5cbi8qKlxuICogTWFyayBhIGZ1bmN0aW9uIGZvciBzcGVjaWFsIHVzZSBieSBTaXp6bGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXJrXG4gKi9cbmZ1bmN0aW9uIG1hcmtGdW5jdGlvbiggZm4gKSB7XG4gIGZuWyBleHBhbmRvIF0gPSB0cnVlO1xuICByZXR1cm4gZm47XG59XG5cbi8qKlxuICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBkaXYgYW5kIGV4cGVjdHMgYSBib29sZWFuIHJlc3VsdFxuICovXG5mdW5jdGlvbiBhc3NlcnQoIGZuICkge1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICB0cnkge1xuICAgIHJldHVybiAhIWZuKCBkaXYgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBmaW5hbGx5IHtcbiAgICAvLyBSZW1vdmUgZnJvbSBpdHMgcGFyZW50IGJ5IGRlZmF1bHRcbiAgICBpZiAoIGRpdi5wYXJlbnROb2RlICkge1xuICAgICAgZGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIGRpdiApO1xuICAgIH1cbiAgICAvLyByZWxlYXNlIG1lbW9yeSBpbiBJRVxuICAgIGRpdiA9IG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBzYW1lIGhhbmRsZXIgZm9yIGFsbCBvZiB0aGUgc3BlY2lmaWVkIGF0dHJzXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cnMgUGlwZS1zZXBhcmF0ZWQgbGlzdCBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIFRoZSBtZXRob2QgdGhhdCB3aWxsIGJlIGFwcGxpZWRcbiAqL1xuZnVuY3Rpb24gYWRkSGFuZGxlKCBhdHRycywgaGFuZGxlciApIHtcbiAgdmFyIGFyciA9IGF0dHJzLnNwbGl0KFwifFwiKSxcbiAgICBpID0gYXR0cnMubGVuZ3RoO1xuXG4gIHdoaWxlICggaS0tICkge1xuICAgIEV4cHIuYXR0ckhhbmRsZVsgYXJyW2ldIF0gPSBoYW5kbGVyO1xuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIGRvY3VtZW50IG9yZGVyIG9mIHR3byBzaWJsaW5nc1xuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgbGVzcyB0aGFuIDAgaWYgYSBwcmVjZWRlcyBiLCBncmVhdGVyIHRoYW4gMCBpZiBhIGZvbGxvd3MgYlxuICovXG5mdW5jdGlvbiBzaWJsaW5nQ2hlY2soIGEsIGIgKSB7XG4gIHZhciBjdXIgPSBiICYmIGEsXG4gICAgZGlmZiA9IGN1ciAmJiBhLm5vZGVUeXBlID09PSAxICYmIGIubm9kZVR5cGUgPT09IDEgJiZcbiAgICAgICggfmIuc291cmNlSW5kZXggfHwgTUFYX05FR0FUSVZFICkgLVxuICAgICAgKCB+YS5zb3VyY2VJbmRleCB8fCBNQVhfTkVHQVRJVkUgKTtcblxuICAvLyBVc2UgSUUgc291cmNlSW5kZXggaWYgYXZhaWxhYmxlIG9uIGJvdGggbm9kZXNcbiAgaWYgKCBkaWZmICkge1xuICAgIHJldHVybiBkaWZmO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYiBmb2xsb3dzIGFcbiAgaWYgKCBjdXIgKSB7XG4gICAgd2hpbGUgKCAoY3VyID0gY3VyLm5leHRTaWJsaW5nKSApIHtcbiAgICAgIGlmICggY3VyID09PSBiICkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGEgPyAxIDogLTE7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBpbnB1dCB0eXBlc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRQc2V1ZG8oIHR5cGUgKSB7XG4gIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICB2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGJ1dHRvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvblBzZXVkbyggdHlwZSApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiAobmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCIpICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIHBvc2l0aW9uYWxzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICovXG5mdW5jdGlvbiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmbiApIHtcbiAgcmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggYXJndW1lbnQgKSB7XG4gICAgYXJndW1lbnQgPSArYXJndW1lbnQ7XG4gICAgcmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcbiAgICAgIHZhciBqLFxuICAgICAgICBtYXRjaEluZGV4ZXMgPSBmbiggW10sIHNlZWQubGVuZ3RoLCBhcmd1bWVudCApLFxuICAgICAgICBpID0gbWF0Y2hJbmRleGVzLmxlbmd0aDtcblxuICAgICAgLy8gTWF0Y2ggZWxlbWVudHMgZm91bmQgYXQgdGhlIHNwZWNpZmllZCBpbmRleGVzXG4gICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgaWYgKCBzZWVkWyAoaiA9IG1hdGNoSW5kZXhlc1tpXSkgXSApIHtcbiAgICAgICAgICBzZWVkW2pdID0gIShtYXRjaGVzW2pdID0gc2VlZFtqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGEgbm9kZSBmb3IgdmFsaWRpdHkgYXMgYSBTaXp6bGUgY29udGV4dFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdD19IGNvbnRleHRcbiAqIEByZXR1cm5zIHtFbGVtZW50fE9iamVjdHxCb29sZWFufSBUaGUgaW5wdXQgbm9kZSBpZiBhY2NlcHRhYmxlLCBvdGhlcndpc2UgYSBmYWxzeSB2YWx1ZVxuICovXG5mdW5jdGlvbiB0ZXN0Q29udGV4dCggY29udGV4dCApIHtcbiAgcmV0dXJuIGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29udGV4dDtcbn1cblxuLy8gRXhwb3NlIHN1cHBvcnQgdmFycyBmb3IgY29udmVuaWVuY2VcbnN1cHBvcnQgPSBTaXp6bGUuc3VwcG9ydCA9IHt9O1xuXG4vKipcbiAqIERldGVjdHMgWE1MIG5vZGVzXG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBlbGVtIEFuIGVsZW1lbnQgb3IgYSBkb2N1bWVudFxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWZmIGVsZW0gaXMgYSBub24tSFRNTCBYTUwgbm9kZVxuICovXG5pc1hNTCA9IFNpenpsZS5pc1hNTCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAvLyBkb2N1bWVudEVsZW1lbnQgaXMgdmVyaWZpZWQgZm9yIGNhc2VzIHdoZXJlIGl0IGRvZXNuJ3QgeWV0IGV4aXN0XG4gIC8vIChzdWNoIGFzIGxvYWRpbmcgaWZyYW1lcyBpbiBJRSAtICM0ODMzKVxuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZWxlbSAmJiAoZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0pLmRvY3VtZW50RWxlbWVudDtcbiAgcmV0dXJuIGRvY3VtZW50RWxlbWVudCA/IGRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIgOiBmYWxzZTtcbn07XG5cbi8qKlxuICogU2V0cyBkb2N1bWVudC1yZWxhdGVkIHZhcmlhYmxlcyBvbmNlIGJhc2VkIG9uIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBbZG9jXSBBbiBlbGVtZW50IG9yIGRvY3VtZW50IG9iamVjdCB0byB1c2UgdG8gc2V0IHRoZSBkb2N1bWVudFxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY3VycmVudCBkb2N1bWVudFxuICovXG5zZXREb2N1bWVudCA9IFNpenpsZS5zZXREb2N1bWVudCA9IGZ1bmN0aW9uKCBub2RlICkge1xuICB2YXIgaGFzQ29tcGFyZSwgcGFyZW50LFxuICAgIGRvYyA9IG5vZGUgPyBub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZSA6IHByZWZlcnJlZERvYztcblxuICAvLyBJZiBubyBkb2N1bWVudCBhbmQgZG9jdW1lbnRFbGVtZW50IGlzIGF2YWlsYWJsZSwgcmV0dXJuXG4gIGlmICggZG9jID09PSBkb2N1bWVudCB8fCBkb2Mubm9kZVR5cGUgIT09IDkgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQgKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50O1xuICB9XG5cbiAgLy8gU2V0IG91ciBkb2N1bWVudFxuICBkb2N1bWVudCA9IGRvYztcbiAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gIHBhcmVudCA9IGRvYy5kZWZhdWx0VmlldztcblxuICAvLyBTdXBwb3J0OiBJRT44XG4gIC8vIElmIGlmcmFtZSBkb2N1bWVudCBpcyBhc3NpZ25lZCB0byBcImRvY3VtZW50XCIgdmFyaWFibGUgYW5kIGlmIGlmcmFtZSBoYXMgYmVlbiByZWxvYWRlZCxcbiAgLy8gSUUgd2lsbCB0aHJvdyBcInBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBhY2Nlc3NpbmcgXCJkb2N1bWVudFwiIHZhcmlhYmxlLCBzZWUgalF1ZXJ5ICMxMzkzNlxuICAvLyBJRTYtOCBkbyBub3Qgc3VwcG9ydCB0aGUgZGVmYXVsdFZpZXcgcHJvcGVydHkgc28gcGFyZW50IHdpbGwgYmUgdW5kZWZpbmVkXG4gIGlmICggcGFyZW50ICYmIHBhcmVudCAhPT0gcGFyZW50LnRvcCApIHtcbiAgICAvLyBJRTExIGRvZXMgbm90IGhhdmUgYXR0YWNoRXZlbnQsIHNvIGFsbCBtdXN0IHN1ZmZlclxuICAgIGlmICggcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG4gICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJ1bmxvYWRcIiwgdW5sb2FkSGFuZGxlciwgZmFsc2UgKTtcbiAgICB9IGVsc2UgaWYgKCBwYXJlbnQuYXR0YWNoRXZlbnQgKSB7XG4gICAgICBwYXJlbnQuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgdW5sb2FkSGFuZGxlciApO1xuICAgIH1cbiAgfVxuXG4gIC8qIFN1cHBvcnQgdGVzdHNcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBkb2N1bWVudElzSFRNTCA9ICFpc1hNTCggZG9jICk7XG5cbiAgLyogQXR0cmlidXRlc1xuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgLy8gU3VwcG9ydDogSUU8OFxuICAvLyBWZXJpZnkgdGhhdCBnZXRBdHRyaWJ1dGUgcmVhbGx5IHJldHVybnMgYXR0cmlidXRlcyBhbmQgbm90IHByb3BlcnRpZXNcbiAgLy8gKGV4Y2VwdGluZyBJRTggYm9vbGVhbnMpXG4gIHN1cHBvcnQuYXR0cmlidXRlcyA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuICAgIGRpdi5jbGFzc05hbWUgPSBcImlcIjtcbiAgICByZXR1cm4gIWRpdi5nZXRBdHRyaWJ1dGUoXCJjbGFzc05hbWVcIik7XG4gIH0pO1xuXG4gIC8qIGdldEVsZW1lbnQocylCeSpcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gIC8vIENoZWNrIGlmIGdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSByZXR1cm5zIG9ubHkgZWxlbWVudHNcbiAgc3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuICAgIGRpdi5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZUNvbW1lbnQoXCJcIikgKTtcbiAgICByZXR1cm4gIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RoO1xuICB9KTtcblxuICAvLyBTdXBwb3J0OiBJRTw5XG4gIHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IHJuYXRpdmUudGVzdCggZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKTtcblxuICAvLyBTdXBwb3J0OiBJRTwxMFxuICAvLyBDaGVjayBpZiBnZXRFbGVtZW50QnlJZCByZXR1cm5zIGVsZW1lbnRzIGJ5IG5hbWVcbiAgLy8gVGhlIGJyb2tlbiBnZXRFbGVtZW50QnlJZCBtZXRob2RzIGRvbid0IHBpY2sgdXAgcHJvZ3JhbWF0aWNhbGx5LXNldCBuYW1lcyxcbiAgLy8gc28gdXNlIGEgcm91bmRhYm91dCBnZXRFbGVtZW50c0J5TmFtZSB0ZXN0XG4gIHN1cHBvcnQuZ2V0QnlJZCA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuICAgIGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGRpdiApLmlkID0gZXhwYW5kbztcbiAgICByZXR1cm4gIWRvYy5nZXRFbGVtZW50c0J5TmFtZSB8fCAhZG9jLmdldEVsZW1lbnRzQnlOYW1lKCBleHBhbmRvICkubGVuZ3RoO1xuICB9KTtcblxuICAvLyBJRCBmaW5kIGFuZCBmaWx0ZXJcbiAgaWYgKCBzdXBwb3J0LmdldEJ5SWQgKSB7XG4gICAgRXhwci5maW5kW1wiSURcIl0gPSBmdW5jdGlvbiggaWQsIGNvbnRleHQgKSB7XG4gICAgICBpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuICAgICAgICB2YXIgbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG4gICAgICAgIC8vIENoZWNrIHBhcmVudE5vZGUgdG8gY2F0Y2ggd2hlbiBCbGFja2JlcnJ5IDQuNiByZXR1cm5zXG4gICAgICAgIC8vIG5vZGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgZG9jdW1lbnQgIzY5NjNcbiAgICAgICAgcmV0dXJuIG0gJiYgbS5wYXJlbnROb2RlID8gWyBtIF0gOiBbXTtcbiAgICAgIH1cbiAgICB9O1xuICAgIEV4cHIuZmlsdGVyW1wiSURcIl0gPSBmdW5jdGlvbiggaWQgKSB7XG4gICAgICB2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IGF0dHJJZDtcbiAgICAgIH07XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdXBwb3J0OiBJRTYvN1xuICAgIC8vIGdldEVsZW1lbnRCeUlkIGlzIG5vdCByZWxpYWJsZSBhcyBhIGZpbmQgc2hvcnRjdXRcbiAgICBkZWxldGUgRXhwci5maW5kW1wiSURcIl07XG5cbiAgICBFeHByLmZpbHRlcltcIklEXCJdID0gIGZ1bmN0aW9uKCBpZCApIHtcbiAgICAgIHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICB2YXIgbm9kZSA9IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUgIT09IFwidW5kZWZpbmVkXCIgJiYgZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIik7XG4gICAgICAgIHJldHVybiBub2RlICYmIG5vZGUudmFsdWUgPT09IGF0dHJJZDtcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIC8vIFRhZ1xuICBFeHByLmZpbmRbXCJUQUdcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID9cbiAgICBmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuICAgICAgaWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xuXG4gICAgICAvLyBEb2N1bWVudEZyYWdtZW50IG5vZGVzIGRvbid0IGhhdmUgZ0VCVE5cbiAgICAgIH0gZWxzZSBpZiAoIHN1cHBvcnQucXNhICkge1xuICAgICAgICByZXR1cm4gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgKTtcbiAgICAgIH1cbiAgICB9IDpcblxuICAgIGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG4gICAgICB2YXIgZWxlbSxcbiAgICAgICAgdG1wID0gW10sXG4gICAgICAgIGkgPSAwLFxuICAgICAgICAvLyBCeSBoYXBweSBjb2luY2lkZW5jZSwgYSAoYnJva2VuKSBnRUJUTiBhcHBlYXJzIG9uIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgdG9vXG4gICAgICAgIHJlc3VsdHMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuICAgICAgLy8gRmlsdGVyIG91dCBwb3NzaWJsZSBjb21tZW50c1xuICAgICAgaWYgKCB0YWcgPT09IFwiKlwiICkge1xuICAgICAgICB3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcbiAgICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG4gICAgICAgICAgICB0bXAucHVzaCggZWxlbSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0bXA7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuXG4gIC8vIENsYXNzXG4gIEV4cHIuZmluZFtcIkNMQVNTXCJdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmIGZ1bmN0aW9uKCBjbGFzc05hbWUsIGNvbnRleHQgKSB7XG4gICAgaWYgKCBkb2N1bWVudElzSFRNTCApIHtcbiAgICAgIHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIGNsYXNzTmFtZSApO1xuICAgIH1cbiAgfTtcblxuICAvKiBRU0EvbWF0Y2hlc1NlbGVjdG9yXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAvLyBRU0EgYW5kIG1hdGNoZXNTZWxlY3RvciBzdXBwb3J0XG5cbiAgLy8gbWF0Y2hlc1NlbGVjdG9yKDphY3RpdmUpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChJRTkvT3BlcmEgMTEuNSlcbiAgcmJ1Z2d5TWF0Y2hlcyA9IFtdO1xuXG4gIC8vIHFTYSg6Zm9jdXMpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChDaHJvbWUgMjEpXG4gIC8vIFdlIGFsbG93IHRoaXMgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRTgvOSB0aGF0IHRocm93cyBhbiBlcnJvclxuICAvLyB3aGVuZXZlciBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgaXMgYWNjZXNzZWQgb24gYW4gaWZyYW1lXG4gIC8vIFNvLCB3ZSBhbGxvdyA6Zm9jdXMgdG8gcGFzcyB0aHJvdWdoIFFTQSBhbGwgdGhlIHRpbWUgdG8gYXZvaWQgdGhlIElFIGVycm9yXG4gIC8vIFNlZSBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMzM3OFxuICByYnVnZ3lRU0EgPSBbXTtcblxuICBpZiAoIChzdXBwb3J0LnFzYSA9IHJuYXRpdmUudGVzdCggZG9jLnF1ZXJ5U2VsZWN0b3JBbGwgKSkgKSB7XG4gICAgLy8gQnVpbGQgUVNBIHJlZ2V4XG4gICAgLy8gUmVnZXggc3RyYXRlZ3kgYWRvcHRlZCBmcm9tIERpZWdvIFBlcmluaVxuICAgIGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuICAgICAgLy8gU2VsZWN0IGlzIHNldCB0byBlbXB0eSBzdHJpbmcgb24gcHVycG9zZVxuICAgICAgLy8gVGhpcyBpcyB0byB0ZXN0IElFJ3MgdHJlYXRtZW50IG9mIG5vdCBleHBsaWNpdGx5XG4gICAgICAvLyBzZXR0aW5nIGEgYm9vbGVhbiBjb250ZW50IGF0dHJpYnV0ZSxcbiAgICAgIC8vIHNpbmNlIGl0cyBwcmVzZW5jZSBzaG91bGQgYmUgZW5vdWdoXG4gICAgICAvLyBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjM1OVxuICAgICAgZG9jRWxlbS5hcHBlbmRDaGlsZCggZGl2ICkuaW5uZXJIVE1MID0gXCI8YSBpZD0nXCIgKyBleHBhbmRvICsgXCInPjwvYT5cIiArXG4gICAgICAgIFwiPHNlbGVjdCBpZD0nXCIgKyBleHBhbmRvICsgXCItXFxmXScgbXNhbGxvd2NhcHR1cmU9Jyc+XCIgK1xuICAgICAgICBcIjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCI7XG5cbiAgICAgIC8vIFN1cHBvcnQ6IElFOCwgT3BlcmEgMTEtMTIuMTZcbiAgICAgIC8vIE5vdGhpbmcgc2hvdWxkIGJlIHNlbGVjdGVkIHdoZW4gZW1wdHkgc3RyaW5ncyBmb2xsb3cgXj0gb3IgJD0gb3IgKj1cbiAgICAgIC8vIFRoZSB0ZXN0IGF0dHJpYnV0ZSBtdXN0IGJlIHVua25vd24gaW4gT3BlcmEgYnV0IFwic2FmZVwiIGZvciBXaW5SVFxuICAgICAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2hoNDY1Mzg4LmFzcHgjYXR0cmlidXRlX3NlY3Rpb25cbiAgICAgIGlmICggZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbXNhbGxvd2NhcHR1cmVePScnXVwiKS5sZW5ndGggKSB7XG4gICAgICAgIHJidWdneVFTQS5wdXNoKCBcIlsqXiRdPVwiICsgd2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFN1cHBvcnQ6IElFOFxuICAgICAgLy8gQm9vbGVhbiBhdHRyaWJ1dGVzIGFuZCBcInZhbHVlXCIgYXJlIG5vdCB0cmVhdGVkIGNvcnJlY3RseVxuICAgICAgaWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aCApIHtcbiAgICAgICAgcmJ1Z2d5UVNBLnB1c2goIFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooPzp2YWx1ZXxcIiArIGJvb2xlYW5zICsgXCIpXCIgKTtcbiAgICAgIH1cblxuICAgICAgLy8gU3VwcG9ydDogQ2hyb21lPDI5LCBBbmRyb2lkPDQuMissIFNhZmFyaTw3LjArLCBpT1M8Ny4wKywgUGhhbnRvbUpTPDEuOS43K1xuICAgICAgaWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW2lkfj1cIiArIGV4cGFuZG8gKyBcIi1dXCIgKS5sZW5ndGggKSB7XG4gICAgICAgIHJidWdneVFTQS5wdXNoKFwifj1cIik7XG4gICAgICB9XG5cbiAgICAgIC8vIFdlYmtpdC9PcGVyYSAtIDpjaGVja2VkIHNob3VsZCByZXR1cm4gc2VsZWN0ZWQgb3B0aW9uIGVsZW1lbnRzXG4gICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuICAgICAgLy8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcbiAgICAgIGlmICggIWRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiOmNoZWNrZWRcIikubGVuZ3RoICkge1xuICAgICAgICByYnVnZ3lRU0EucHVzaChcIjpjaGVja2VkXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBTdXBwb3J0OiBTYWZhcmkgOCssIGlPUyA4K1xuICAgICAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNjg1MVxuICAgICAgLy8gSW4tcGFnZSBgc2VsZWN0b3IjaWQgc2liaW5nLWNvbWJpbmF0b3Igc2VsZWN0b3JgIGZhaWxzXG4gICAgICBpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbCggXCJhI1wiICsgZXhwYW5kbyArIFwiKypcIiApLmxlbmd0aCApIHtcbiAgICAgICAgcmJ1Z2d5UVNBLnB1c2goXCIuIy4rWyt+XVwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuICAgICAgLy8gU3VwcG9ydDogV2luZG93cyA4IE5hdGl2ZSBBcHBzXG4gICAgICAvLyBUaGUgdHlwZSBhbmQgbmFtZSBhdHRyaWJ1dGVzIGFyZSByZXN0cmljdGVkIGR1cmluZyAuaW5uZXJIVE1MIGFzc2lnbm1lbnRcbiAgICAgIHZhciBpbnB1dCA9IGRvYy5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcImhpZGRlblwiICk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoIGlucHV0ICkuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJEXCIgKTtcblxuICAgICAgLy8gU3VwcG9ydDogSUU4XG4gICAgICAvLyBFbmZvcmNlIGNhc2Utc2Vuc2l0aXZpdHkgb2YgbmFtZSBhdHRyaWJ1dGVcbiAgICAgIGlmICggZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmFtZT1kXVwiKS5sZW5ndGggKSB7XG4gICAgICAgIHJidWdneVFTQS5wdXNoKCBcIm5hbWVcIiArIHdoaXRlc3BhY2UgKyBcIipbKl4kfCF+XT89XCIgKTtcbiAgICAgIH1cblxuICAgICAgLy8gRkYgMy41IC0gOmVuYWJsZWQvOmRpc2FibGVkIGFuZCBoaWRkZW4gZWxlbWVudHMgKGhpZGRlbiBlbGVtZW50cyBhcmUgc3RpbGwgZW5hYmxlZClcbiAgICAgIC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG4gICAgICBpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIjplbmFibGVkXCIpLmxlbmd0aCApIHtcbiAgICAgICAgcmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuICAgICAgfVxuXG4gICAgICAvLyBPcGVyYSAxMC0xMSBkb2VzIG5vdCB0aHJvdyBvbiBwb3N0LWNvbW1hIGludmFsaWQgcHNldWRvc1xuICAgICAgZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpO1xuICAgICAgcmJ1Z2d5UVNBLnB1c2goXCIsLio6XCIpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCAoc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgPSBybmF0aXZlLnRlc3QoIChtYXRjaGVzID0gZG9jRWxlbS5tYXRjaGVzIHx8XG4gICAgZG9jRWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICBkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgIGRvY0VsZW0ub01hdGNoZXNTZWxlY3RvciB8fFxuICAgIGRvY0VsZW0ubXNNYXRjaGVzU2VsZWN0b3IpICkpICkge1xuXG4gICAgYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gICAgICAvLyBDaGVjayB0byBzZWUgaWYgaXQncyBwb3NzaWJsZSB0byBkbyBtYXRjaGVzU2VsZWN0b3JcbiAgICAgIC8vIG9uIGEgZGlzY29ubmVjdGVkIG5vZGUgKElFIDkpXG4gICAgICBzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoID0gbWF0Y2hlcy5jYWxsKCBkaXYsIFwiZGl2XCIgKTtcblxuICAgICAgLy8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxuICAgICAgLy8gR2Vja28gZG9lcyBub3QgZXJyb3IsIHJldHVybnMgZmFsc2UgaW5zdGVhZFxuICAgICAgbWF0Y2hlcy5jYWxsKCBkaXYsIFwiW3MhPScnXTp4XCIgKTtcbiAgICAgIHJidWdneU1hdGNoZXMucHVzaCggXCIhPVwiLCBwc2V1ZG9zICk7XG4gICAgfSk7XG4gIH1cblxuICByYnVnZ3lRU0EgPSByYnVnZ3lRU0EubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneVFTQS5qb2luKFwifFwiKSApO1xuICByYnVnZ3lNYXRjaGVzID0gcmJ1Z2d5TWF0Y2hlcy5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5TWF0Y2hlcy5qb2luKFwifFwiKSApO1xuXG4gIC8qIENvbnRhaW5zXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgaGFzQ29tcGFyZSA9IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiApO1xuXG4gIC8vIEVsZW1lbnQgY29udGFpbnMgYW5vdGhlclxuICAvLyBQdXJwb3NlZnVsbHkgZG9lcyBub3QgaW1wbGVtZW50IGluY2x1c2l2ZSBkZXNjZW5kZW50XG4gIC8vIEFzIGluLCBhbiBlbGVtZW50IGRvZXMgbm90IGNvbnRhaW4gaXRzZWxmXG4gIGNvbnRhaW5zID0gaGFzQ29tcGFyZSB8fCBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29udGFpbnMgKSA/XG4gICAgZnVuY3Rpb24oIGEsIGIgKSB7XG4gICAgICB2YXIgYWRvd24gPSBhLm5vZGVUeXBlID09PSA5ID8gYS5kb2N1bWVudEVsZW1lbnQgOiBhLFxuICAgICAgICBidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcbiAgICAgIHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgKFxuICAgICAgICBhZG93bi5jb250YWlucyA/XG4gICAgICAgICAgYWRvd24uY29udGFpbnMoIGJ1cCApIDpcbiAgICAgICAgICBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICYmIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGJ1cCApICYgMTZcbiAgICAgICkpO1xuICAgIH0gOlxuICAgIGZ1bmN0aW9uKCBhLCBiICkge1xuICAgICAgaWYgKCBiICkge1xuICAgICAgICB3aGlsZSAoIChiID0gYi5wYXJlbnROb2RlKSApIHtcbiAgICAgICAgICBpZiAoIGIgPT09IGEgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gIC8qIFNvcnRpbmdcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gIC8vIERvY3VtZW50IG9yZGVyIHNvcnRpbmdcbiAgc29ydE9yZGVyID0gaGFzQ29tcGFyZSA/XG4gIGZ1bmN0aW9uKCBhLCBiICkge1xuXG4gICAgLy8gRmxhZyBmb3IgZHVwbGljYXRlIHJlbW92YWxcbiAgICBpZiAoIGEgPT09IGIgKSB7XG4gICAgICBoYXNEdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLy8gU29ydCBvbiBtZXRob2QgZXhpc3RlbmNlIGlmIG9ubHkgb25lIGlucHV0IGhhcyBjb21wYXJlRG9jdW1lbnRQb3NpdGlvblxuICAgIHZhciBjb21wYXJlID0gIWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gLSAhYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbjtcbiAgICBpZiAoIGNvbXBhcmUgKSB7XG4gICAgICByZXR1cm4gY29tcGFyZTtcbiAgICB9XG5cbiAgICAvLyBDYWxjdWxhdGUgcG9zaXRpb24gaWYgYm90aCBpbnB1dHMgYmVsb25nIHRvIHRoZSBzYW1lIGRvY3VtZW50XG4gICAgY29tcGFyZSA9ICggYS5vd25lckRvY3VtZW50IHx8IGEgKSA9PT0gKCBiLm93bmVyRG9jdW1lbnQgfHwgYiApID9cbiAgICAgIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGIgKSA6XG5cbiAgICAgIC8vIE90aGVyd2lzZSB3ZSBrbm93IHRoZXkgYXJlIGRpc2Nvbm5lY3RlZFxuICAgICAgMTtcblxuICAgIC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xuICAgIGlmICggY29tcGFyZSAmIDEgfHxcbiAgICAgICghc3VwcG9ydC5zb3J0RGV0YWNoZWQgJiYgYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYSApID09PSBjb21wYXJlKSApIHtcblxuICAgICAgLy8gQ2hvb3NlIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgcmVsYXRlZCB0byBvdXIgcHJlZmVycmVkIGRvY3VtZW50XG4gICAgICBpZiAoIGEgPT09IGRvYyB8fCBhLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGEpICkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBpZiAoIGIgPT09IGRvYyB8fCBiLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGIpICkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cblxuICAgICAgLy8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcbiAgICAgIHJldHVybiBzb3J0SW5wdXQgP1xuICAgICAgICAoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG4gICAgICAgIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBhcmUgJiA0ID8gLTEgOiAxO1xuICB9IDpcbiAgZnVuY3Rpb24oIGEsIGIgKSB7XG4gICAgLy8gRXhpdCBlYXJseSBpZiB0aGUgbm9kZXMgYXJlIGlkZW50aWNhbFxuICAgIGlmICggYSA9PT0gYiApIHtcbiAgICAgIGhhc0R1cGxpY2F0ZSA9IHRydWU7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB2YXIgY3VyLFxuICAgICAgaSA9IDAsXG4gICAgICBhdXAgPSBhLnBhcmVudE5vZGUsXG4gICAgICBidXAgPSBiLnBhcmVudE5vZGUsXG4gICAgICBhcCA9IFsgYSBdLFxuICAgICAgYnAgPSBbIGIgXTtcblxuICAgIC8vIFBhcmVudGxlc3Mgbm9kZXMgYXJlIGVpdGhlciBkb2N1bWVudHMgb3IgZGlzY29ubmVjdGVkXG4gICAgaWYgKCAhYXVwIHx8ICFidXAgKSB7XG4gICAgICByZXR1cm4gYSA9PT0gZG9jID8gLTEgOlxuICAgICAgICBiID09PSBkb2MgPyAxIDpcbiAgICAgICAgYXVwID8gLTEgOlxuICAgICAgICBidXAgPyAxIDpcbiAgICAgICAgc29ydElucHV0ID9cbiAgICAgICAgKCBpbmRleE9mKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YoIHNvcnRJbnB1dCwgYiApICkgOlxuICAgICAgICAwO1xuXG4gICAgLy8gSWYgdGhlIG5vZGVzIGFyZSBzaWJsaW5ncywgd2UgY2FuIGRvIGEgcXVpY2sgY2hlY2tcbiAgICB9IGVsc2UgaWYgKCBhdXAgPT09IGJ1cCApIHtcbiAgICAgIHJldHVybiBzaWJsaW5nQ2hlY2soIGEsIGIgKTtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2Ugd2UgbmVlZCBmdWxsIGxpc3RzIG9mIHRoZWlyIGFuY2VzdG9ycyBmb3IgY29tcGFyaXNvblxuICAgIGN1ciA9IGE7XG4gICAgd2hpbGUgKCAoY3VyID0gY3VyLnBhcmVudE5vZGUpICkge1xuICAgICAgYXAudW5zaGlmdCggY3VyICk7XG4gICAgfVxuICAgIGN1ciA9IGI7XG4gICAgd2hpbGUgKCAoY3VyID0gY3VyLnBhcmVudE5vZGUpICkge1xuICAgICAgYnAudW5zaGlmdCggY3VyICk7XG4gICAgfVxuXG4gICAgLy8gV2FsayBkb3duIHRoZSB0cmVlIGxvb2tpbmcgZm9yIGEgZGlzY3JlcGFuY3lcbiAgICB3aGlsZSAoIGFwW2ldID09PSBicFtpXSApIHtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4gaSA/XG4gICAgICAvLyBEbyBhIHNpYmxpbmcgY2hlY2sgaWYgdGhlIG5vZGVzIGhhdmUgYSBjb21tb24gYW5jZXN0b3JcbiAgICAgIHNpYmxpbmdDaGVjayggYXBbaV0sIGJwW2ldICkgOlxuXG4gICAgICAvLyBPdGhlcndpc2Ugbm9kZXMgaW4gb3VyIGRvY3VtZW50IHNvcnQgZmlyc3RcbiAgICAgIGFwW2ldID09PSBwcmVmZXJyZWREb2MgPyAtMSA6XG4gICAgICBicFtpXSA9PT0gcHJlZmVycmVkRG9jID8gMSA6XG4gICAgICAwO1xuICB9O1xuXG4gIHJldHVybiBkb2M7XG59O1xuXG5TaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcbiAgcmV0dXJuIFNpenpsZSggZXhwciwgbnVsbCwgbnVsbCwgZWxlbWVudHMgKTtcbn07XG5cblNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcbiAgLy8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG4gIGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcbiAgICBzZXREb2N1bWVudCggZWxlbSApO1xuICB9XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgYXR0cmlidXRlIHNlbGVjdG9ycyBhcmUgcXVvdGVkXG4gIGV4cHIgPSBleHByLnJlcGxhY2UoIHJhdHRyaWJ1dGVRdW90ZXMsIFwiPSckMSddXCIgKTtcblxuICBpZiAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yICYmIGRvY3VtZW50SXNIVE1MICYmXG4gICAgKCAhcmJ1Z2d5TWF0Y2hlcyB8fCAhcmJ1Z2d5TWF0Y2hlcy50ZXN0KCBleHByICkgKSAmJlxuICAgICggIXJidWdneVFTQSAgICAgfHwgIXJidWdneVFTQS50ZXN0KCBleHByICkgKSApIHtcblxuICAgIHRyeSB7XG4gICAgICB2YXIgcmV0ID0gbWF0Y2hlcy5jYWxsKCBlbGVtLCBleHByICk7XG5cbiAgICAgIC8vIElFIDkncyBtYXRjaGVzU2VsZWN0b3IgcmV0dXJucyBmYWxzZSBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcbiAgICAgIGlmICggcmV0IHx8IHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggfHxcbiAgICAgICAgICAvLyBBcyB3ZWxsLCBkaXNjb25uZWN0ZWQgbm9kZXMgYXJlIHNhaWQgdG8gYmUgaW4gYSBkb2N1bWVudFxuICAgICAgICAgIC8vIGZyYWdtZW50IGluIElFIDlcbiAgICAgICAgICBlbGVtLmRvY3VtZW50ICYmIGVsZW0uZG9jdW1lbnQubm9kZVR5cGUgIT09IDExICkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICByZXR1cm4gU2l6emxlKCBleHByLCBkb2N1bWVudCwgbnVsbCwgWyBlbGVtIF0gKS5sZW5ndGggPiAwO1xufTtcblxuU2l6emxlLmNvbnRhaW5zID0gZnVuY3Rpb24oIGNvbnRleHQsIGVsZW0gKSB7XG4gIC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuICBpZiAoICggY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgKSAhPT0gZG9jdW1lbnQgKSB7XG4gICAgc2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcbiAgfVxuICByZXR1cm4gY29udGFpbnMoIGNvbnRleHQsIGVsZW0gKTtcbn07XG5cblNpenpsZS5hdHRyID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG4gIC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuICBpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPT0gZG9jdW1lbnQgKSB7XG4gICAgc2V0RG9jdW1lbnQoIGVsZW0gKTtcbiAgfVxuXG4gIHZhciBmbiA9IEV4cHIuYXR0ckhhbmRsZVsgbmFtZS50b0xvd2VyQ2FzZSgpIF0sXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXG4gICAgdmFsID0gZm4gJiYgaGFzT3duLmNhbGwoIEV4cHIuYXR0ckhhbmRsZSwgbmFtZS50b0xvd2VyQ2FzZSgpICkgP1xuICAgICAgZm4oIGVsZW0sIG5hbWUsICFkb2N1bWVudElzSFRNTCApIDpcbiAgICAgIHVuZGVmaW5lZDtcblxuICByZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgP1xuICAgIHZhbCA6XG4gICAgc3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFkb2N1bWVudElzSFRNTCA/XG4gICAgICBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApIDpcbiAgICAgICh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUobmFtZSkpICYmIHZhbC5zcGVjaWZpZWQgP1xuICAgICAgICB2YWwudmFsdWUgOlxuICAgICAgICBudWxsO1xufTtcblxuU2l6emxlLmVycm9yID0gZnVuY3Rpb24oIG1zZyApIHtcbiAgdGhyb3cgbmV3IEVycm9yKCBcIlN5bnRheCBlcnJvciwgdW5yZWNvZ25pemVkIGV4cHJlc3Npb246IFwiICsgbXNnICk7XG59O1xuXG4vKipcbiAqIERvY3VtZW50IHNvcnRpbmcgYW5kIHJlbW92aW5nIGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSB7QXJyYXlMaWtlfSByZXN1bHRzXG4gKi9cblNpenpsZS51bmlxdWVTb3J0ID0gZnVuY3Rpb24oIHJlc3VsdHMgKSB7XG4gIHZhciBlbGVtLFxuICAgIGR1cGxpY2F0ZXMgPSBbXSxcbiAgICBqID0gMCxcbiAgICBpID0gMDtcblxuICAvLyBVbmxlc3Mgd2UgKmtub3cqIHdlIGNhbiBkZXRlY3QgZHVwbGljYXRlcywgYXNzdW1lIHRoZWlyIHByZXNlbmNlXG4gIGhhc0R1cGxpY2F0ZSA9ICFzdXBwb3J0LmRldGVjdER1cGxpY2F0ZXM7XG4gIHNvcnRJbnB1dCA9ICFzdXBwb3J0LnNvcnRTdGFibGUgJiYgcmVzdWx0cy5zbGljZSggMCApO1xuICByZXN1bHRzLnNvcnQoIHNvcnRPcmRlciApO1xuXG4gIGlmICggaGFzRHVwbGljYXRlICkge1xuICAgIHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuICAgICAgaWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG4gICAgICAgIGogPSBkdXBsaWNhdGVzLnB1c2goIGkgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKCBqLS0gKSB7XG4gICAgICByZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xlYXIgaW5wdXQgYWZ0ZXIgc29ydGluZyB0byByZWxlYXNlIG9iamVjdHNcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XG4gIHNvcnRJbnB1dCA9IG51bGw7XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIHRleHQgdmFsdWUgb2YgYW4gYXJyYXkgb2YgRE9NIG5vZGVzXG4gKiBAcGFyYW0ge0FycmF5fEVsZW1lbnR9IGVsZW1cbiAqL1xuZ2V0VGV4dCA9IFNpenpsZS5nZXRUZXh0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBub2RlLFxuICAgIHJldCA9IFwiXCIsXG4gICAgaSA9IDAsXG4gICAgbm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG4gIGlmICggIW5vZGVUeXBlICkge1xuICAgIC8vIElmIG5vIG5vZGVUeXBlLCB0aGlzIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5XG4gICAgd2hpbGUgKCAobm9kZSA9IGVsZW1baSsrXSkgKSB7XG4gICAgICAvLyBEbyBub3QgdHJhdmVyc2UgY29tbWVudCBub2Rlc1xuICAgICAgcmV0ICs9IGdldFRleHQoIG5vZGUgKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAxIHx8IG5vZGVUeXBlID09PSA5IHx8IG5vZGVUeXBlID09PSAxMSApIHtcbiAgICAvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG4gICAgLy8gaW5uZXJUZXh0IHVzYWdlIHJlbW92ZWQgZm9yIGNvbnNpc3RlbmN5IG9mIG5ldyBsaW5lcyAoalF1ZXJ5ICMxMTE1MylcbiAgICBpZiAoIHR5cGVvZiBlbGVtLnRleHRDb250ZW50ID09PSBcInN0cmluZ1wiICkge1xuICAgICAgcmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRyYXZlcnNlIGl0cyBjaGlsZHJlblxuICAgICAgZm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG4gICAgICAgIHJldCArPSBnZXRUZXh0KCBlbGVtICk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcbiAgICByZXR1cm4gZWxlbS5ub2RlVmFsdWU7XG4gIH1cbiAgLy8gRG8gbm90IGluY2x1ZGUgY29tbWVudCBvciBwcm9jZXNzaW5nIGluc3RydWN0aW9uIG5vZGVzXG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbkV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzID0ge1xuXG4gIC8vIENhbiBiZSBhZGp1c3RlZCBieSB0aGUgdXNlclxuICBjYWNoZUxlbmd0aDogNTAsXG5cbiAgY3JlYXRlUHNldWRvOiBtYXJrRnVuY3Rpb24sXG5cbiAgbWF0Y2g6IG1hdGNoRXhwcixcblxuICBhdHRySGFuZGxlOiB7fSxcblxuICBmaW5kOiB7fSxcblxuICByZWxhdGl2ZToge1xuICAgIFwiPlwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIsIGZpcnN0OiB0cnVlIH0sXG4gICAgXCIgXCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiB9LFxuICAgIFwiK1wiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiwgZmlyc3Q6IHRydWUgfSxcbiAgICBcIn5cIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIgfVxuICB9LFxuXG4gIHByZUZpbHRlcjoge1xuICAgIFwiQVRUUlwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG4gICAgICBtYXRjaFsxXSA9IG1hdGNoWzFdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cbiAgICAgIC8vIE1vdmUgdGhlIGdpdmVuIHZhbHVlIHRvIG1hdGNoWzNdIHdoZXRoZXIgcXVvdGVkIG9yIHVucXVvdGVkXG4gICAgICBtYXRjaFszXSA9ICggbWF0Y2hbM10gfHwgbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIiApLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cbiAgICAgIGlmICggbWF0Y2hbMl0gPT09IFwifj1cIiApIHtcbiAgICAgICAgbWF0Y2hbM10gPSBcIiBcIiArIG1hdGNoWzNdICsgXCIgXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXRjaC5zbGljZSggMCwgNCApO1xuICAgIH0sXG5cbiAgICBcIkNISUxEXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcbiAgICAgIC8qIG1hdGNoZXMgZnJvbSBtYXRjaEV4cHJbXCJDSElMRFwiXVxuICAgICAgICAxIHR5cGUgKG9ubHl8bnRofC4uLilcbiAgICAgICAgMiB3aGF0IChjaGlsZHxvZi10eXBlKVxuICAgICAgICAzIGFyZ3VtZW50IChldmVufG9kZHxcXGQqfFxcZCpuKFsrLV1cXGQrKT98Li4uKVxuICAgICAgICA0IHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcbiAgICAgICAgNSBzaWduIG9mIHhuLWNvbXBvbmVudFxuICAgICAgICA2IHggb2YgeG4tY29tcG9uZW50XG4gICAgICAgIDcgc2lnbiBvZiB5LWNvbXBvbmVudFxuICAgICAgICA4IHkgb2YgeS1jb21wb25lbnRcbiAgICAgICovXG4gICAgICBtYXRjaFsxXSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmICggbWF0Y2hbMV0uc2xpY2UoIDAsIDMgKSA9PT0gXCJudGhcIiApIHtcbiAgICAgICAgLy8gbnRoLSogcmVxdWlyZXMgYXJndW1lbnRcbiAgICAgICAgaWYgKCAhbWF0Y2hbM10gKSB7XG4gICAgICAgICAgU2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbnVtZXJpYyB4IGFuZCB5IHBhcmFtZXRlcnMgZm9yIEV4cHIuZmlsdGVyLkNISUxEXG4gICAgICAgIC8vIHJlbWVtYmVyIHRoYXQgZmFsc2UvdHJ1ZSBjYXN0IHJlc3BlY3RpdmVseSB0byAwLzFcbiAgICAgICAgbWF0Y2hbNF0gPSArKCBtYXRjaFs0XSA/IG1hdGNoWzVdICsgKG1hdGNoWzZdIHx8IDEpIDogMiAqICggbWF0Y2hbM10gPT09IFwiZXZlblwiIHx8IG1hdGNoWzNdID09PSBcIm9kZFwiICkgKTtcbiAgICAgICAgbWF0Y2hbNV0gPSArKCAoIG1hdGNoWzddICsgbWF0Y2hbOF0gKSB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApO1xuXG4gICAgICAvLyBvdGhlciB0eXBlcyBwcm9oaWJpdCBhcmd1bWVudHNcbiAgICAgIH0gZWxzZSBpZiAoIG1hdGNoWzNdICkge1xuICAgICAgICBTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9LFxuXG4gICAgXCJQU0VVRE9cIjogZnVuY3Rpb24oIG1hdGNoICkge1xuICAgICAgdmFyIGV4Y2VzcyxcbiAgICAgICAgdW5xdW90ZWQgPSAhbWF0Y2hbNl0gJiYgbWF0Y2hbMl07XG5cbiAgICAgIGlmICggbWF0Y2hFeHByW1wiQ0hJTERcIl0udGVzdCggbWF0Y2hbMF0gKSApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIEFjY2VwdCBxdW90ZWQgYXJndW1lbnRzIGFzLWlzXG4gICAgICBpZiAoIG1hdGNoWzNdICkge1xuICAgICAgICBtYXRjaFsyXSA9IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IFwiXCI7XG5cbiAgICAgIC8vIFN0cmlwIGV4Y2VzcyBjaGFyYWN0ZXJzIGZyb20gdW5xdW90ZWQgYXJndW1lbnRzXG4gICAgICB9IGVsc2UgaWYgKCB1bnF1b3RlZCAmJiBycHNldWRvLnRlc3QoIHVucXVvdGVkICkgJiZcbiAgICAgICAgLy8gR2V0IGV4Y2VzcyBmcm9tIHRva2VuaXplIChyZWN1cnNpdmVseSlcbiAgICAgICAgKGV4Y2VzcyA9IHRva2VuaXplKCB1bnF1b3RlZCwgdHJ1ZSApKSAmJlxuICAgICAgICAvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcbiAgICAgICAgKGV4Y2VzcyA9IHVucXVvdGVkLmluZGV4T2YoIFwiKVwiLCB1bnF1b3RlZC5sZW5ndGggLSBleGNlc3MgKSAtIHVucXVvdGVkLmxlbmd0aCkgKSB7XG5cbiAgICAgICAgLy8gZXhjZXNzIGlzIGEgbmVnYXRpdmUgaW5kZXhcbiAgICAgICAgbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCwgZXhjZXNzICk7XG4gICAgICAgIG1hdGNoWzJdID0gdW5xdW90ZWQuc2xpY2UoIDAsIGV4Y2VzcyApO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gb25seSBjYXB0dXJlcyBuZWVkZWQgYnkgdGhlIHBzZXVkbyBmaWx0ZXIgbWV0aG9kICh0eXBlIGFuZCBhcmd1bWVudClcbiAgICAgIHJldHVybiBtYXRjaC5zbGljZSggMCwgMyApO1xuICAgIH1cbiAgfSxcblxuICBmaWx0ZXI6IHtcblxuICAgIFwiVEFHXCI6IGZ1bmN0aW9uKCBub2RlTmFtZVNlbGVjdG9yICkge1xuICAgICAgdmFyIG5vZGVOYW1lID0gbm9kZU5hbWVTZWxlY3Rvci5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gbm9kZU5hbWVTZWxlY3RvciA9PT0gXCIqXCIgP1xuICAgICAgICBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0gOlxuICAgICAgICBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVOYW1lO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBcIkNMQVNTXCI6IGZ1bmN0aW9uKCBjbGFzc05hbWUgKSB7XG4gICAgICB2YXIgcGF0dGVybiA9IGNsYXNzQ2FjaGVbIGNsYXNzTmFtZSArIFwiIFwiIF07XG5cbiAgICAgIHJldHVybiBwYXR0ZXJuIHx8XG4gICAgICAgIChwYXR0ZXJuID0gbmV3IFJlZ0V4cCggXCIoXnxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIGNsYXNzTmFtZSArIFwiKFwiICsgd2hpdGVzcGFjZSArIFwifCQpXCIgKSkgJiZcbiAgICAgICAgY2xhc3NDYWNoZSggY2xhc3NOYW1lLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICByZXR1cm4gcGF0dGVybi50ZXN0KCB0eXBlb2YgZWxlbS5jbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbS5jbGFzc05hbWUgfHwgdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlICE9PSBcInVuZGVmaW5lZFwiICYmIGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIiApO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgXCJBVFRSXCI6IGZ1bmN0aW9uKCBuYW1lLCBvcGVyYXRvciwgY2hlY2sgKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApO1xuXG4gICAgICAgIGlmICggcmVzdWx0ID09IG51bGwgKSB7XG4gICAgICAgICAgcmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAhb3BlcmF0b3IgKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgKz0gXCJcIjtcblxuICAgICAgICByZXR1cm4gb3BlcmF0b3IgPT09IFwiPVwiID8gcmVzdWx0ID09PSBjaGVjayA6XG4gICAgICAgICAgb3BlcmF0b3IgPT09IFwiIT1cIiA/IHJlc3VsdCAhPT0gY2hlY2sgOlxuICAgICAgICAgIG9wZXJhdG9yID09PSBcIl49XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA9PT0gMCA6XG4gICAgICAgICAgb3BlcmF0b3IgPT09IFwiKj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuICAgICAgICAgIG9wZXJhdG9yID09PSBcIiQ9XCIgPyBjaGVjayAmJiByZXN1bHQuc2xpY2UoIC1jaGVjay5sZW5ndGggKSA9PT0gY2hlY2sgOlxuICAgICAgICAgIG9wZXJhdG9yID09PSBcIn49XCIgPyAoIFwiIFwiICsgcmVzdWx0LnJlcGxhY2UoIHJ3aGl0ZXNwYWNlLCBcIiBcIiApICsgXCIgXCIgKS5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuICAgICAgICAgIG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSggMCwgY2hlY2subGVuZ3RoICsgMSApID09PSBjaGVjayArIFwiLVwiIDpcbiAgICAgICAgICBmYWxzZTtcbiAgICAgIH07XG4gICAgfSxcblxuICAgIFwiQ0hJTERcIjogZnVuY3Rpb24oIHR5cGUsIHdoYXQsIGFyZ3VtZW50LCBmaXJzdCwgbGFzdCApIHtcbiAgICAgIHZhciBzaW1wbGUgPSB0eXBlLnNsaWNlKCAwLCAzICkgIT09IFwibnRoXCIsXG4gICAgICAgIGZvcndhcmQgPSB0eXBlLnNsaWNlKCAtNCApICE9PSBcImxhc3RcIixcbiAgICAgICAgb2ZUeXBlID0gd2hhdCA9PT0gXCJvZi10eXBlXCI7XG5cbiAgICAgIHJldHVybiBmaXJzdCA9PT0gMSAmJiBsYXN0ID09PSAwID9cblxuICAgICAgICAvLyBTaG9ydGN1dCBmb3IgOm50aC0qKG4pXG4gICAgICAgIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgIHJldHVybiAhIWVsZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgfSA6XG5cbiAgICAgICAgZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcbiAgICAgICAgICB2YXIgY2FjaGUsIG91dGVyQ2FjaGUsIG5vZGUsIGRpZmYsIG5vZGVJbmRleCwgc3RhcnQsXG4gICAgICAgICAgICBkaXIgPSBzaW1wbGUgIT09IGZvcndhcmQgPyBcIm5leHRTaWJsaW5nXCIgOiBcInByZXZpb3VzU2libGluZ1wiLFxuICAgICAgICAgICAgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlLFxuICAgICAgICAgICAgbmFtZSA9IG9mVHlwZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICB1c2VDYWNoZSA9ICF4bWwgJiYgIW9mVHlwZTtcblxuICAgICAgICAgIGlmICggcGFyZW50ICkge1xuXG4gICAgICAgICAgICAvLyA6KGZpcnN0fGxhc3R8b25seSktKGNoaWxkfG9mLXR5cGUpXG4gICAgICAgICAgICBpZiAoIHNpbXBsZSApIHtcbiAgICAgICAgICAgICAgd2hpbGUgKCBkaXIgKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IGVsZW07XG4gICAgICAgICAgICAgICAgd2hpbGUgKCAobm9kZSA9IG5vZGVbIGRpciBdKSApIHtcbiAgICAgICAgICAgICAgICAgIGlmICggb2ZUeXBlID8gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDogbm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBSZXZlcnNlIGRpcmVjdGlvbiBmb3IgOm9ubHktKiAoaWYgd2UgaGF2ZW4ndCB5ZXQgZG9uZSBzbylcbiAgICAgICAgICAgICAgICBzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YXJ0ID0gWyBmb3J3YXJkID8gcGFyZW50LmZpcnN0Q2hpbGQgOiBwYXJlbnQubGFzdENoaWxkIF07XG5cbiAgICAgICAgICAgIC8vIG5vbi14bWwgOm50aC1jaGlsZCguLi4pIHN0b3JlcyBjYWNoZSBkYXRhIG9uIGBwYXJlbnRgXG4gICAgICAgICAgICBpZiAoIGZvcndhcmQgJiYgdXNlQ2FjaGUgKSB7XG4gICAgICAgICAgICAgIC8vIFNlZWsgYGVsZW1gIGZyb20gYSBwcmV2aW91c2x5LWNhY2hlZCBpbmRleFxuICAgICAgICAgICAgICBvdXRlckNhY2hlID0gcGFyZW50WyBleHBhbmRvIF0gfHwgKHBhcmVudFsgZXhwYW5kbyBdID0ge30pO1xuICAgICAgICAgICAgICBjYWNoZSA9IG91dGVyQ2FjaGVbIHR5cGUgXSB8fCBbXTtcbiAgICAgICAgICAgICAgbm9kZUluZGV4ID0gY2FjaGVbMF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbMV07XG4gICAgICAgICAgICAgIGRpZmYgPSBjYWNoZVswXSA9PT0gZGlycnVucyAmJiBjYWNoZVsyXTtcbiAgICAgICAgICAgICAgbm9kZSA9IG5vZGVJbmRleCAmJiBwYXJlbnQuY2hpbGROb2Rlc1sgbm9kZUluZGV4IF07XG5cbiAgICAgICAgICAgICAgd2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblxuICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIHNlZWtpbmcgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG4gICAgICAgICAgICAgICAgKGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBXaGVuIGZvdW5kLCBjYWNoZSBpbmRleGVzIG9uIGBwYXJlbnRgIGFuZCBicmVha1xuICAgICAgICAgICAgICAgIGlmICggbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiArK2RpZmYgJiYgbm9kZSA9PT0gZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgIG91dGVyQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgbm9kZUluZGV4LCBkaWZmIF07XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXNlIHByZXZpb3VzbHktY2FjaGVkIGVsZW1lbnQgaW5kZXggaWYgYXZhaWxhYmxlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB1c2VDYWNoZSAmJiAoY2FjaGUgPSAoZWxlbVsgZXhwYW5kbyBdIHx8IChlbGVtWyBleHBhbmRvIF0gPSB7fSkpWyB0eXBlIF0pICYmIGNhY2hlWzBdID09PSBkaXJydW5zICkge1xuICAgICAgICAgICAgICBkaWZmID0gY2FjaGVbMV07XG5cbiAgICAgICAgICAgIC8vIHhtbCA6bnRoLWNoaWxkKC4uLikgb3IgOm50aC1sYXN0LWNoaWxkKC4uLikgb3IgOm50aCgtbGFzdCk/LW9mLXR5cGUoLi4uKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gVXNlIHRoZSBzYW1lIGxvb3AgYXMgYWJvdmUgdG8gc2VlayBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcbiAgICAgICAgICAgICAgd2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcbiAgICAgICAgICAgICAgICAoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuICAgICAgICAgICAgICAgIGlmICggKCBvZlR5cGUgPyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOiBub2RlLm5vZGVUeXBlID09PSAxICkgJiYgKytkaWZmICkge1xuICAgICAgICAgICAgICAgICAgLy8gQ2FjaGUgdGhlIGluZGV4IG9mIGVhY2ggZW5jb3VudGVyZWQgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgaWYgKCB1c2VDYWNoZSApIHtcbiAgICAgICAgICAgICAgICAgICAgKG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pKVsgdHlwZSBdID0gWyBkaXJydW5zLCBkaWZmIF07XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmICggbm9kZSA9PT0gZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEluY29ycG9yYXRlIHRoZSBvZmZzZXQsIHRoZW4gY2hlY2sgYWdhaW5zdCBjeWNsZSBzaXplXG4gICAgICAgICAgICBkaWZmIC09IGxhc3Q7XG4gICAgICAgICAgICByZXR1cm4gZGlmZiA9PT0gZmlyc3QgfHwgKCBkaWZmICUgZmlyc3QgPT09IDAgJiYgZGlmZiAvIGZpcnN0ID49IDAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBwc2V1ZG8sIGFyZ3VtZW50ICkge1xuICAgICAgLy8gcHNldWRvLWNsYXNzIG5hbWVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlXG4gICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI3BzZXVkby1jbGFzc2VzXG4gICAgICAvLyBQcmlvcml0aXplIGJ5IGNhc2Ugc2Vuc2l0aXZpdHkgaW4gY2FzZSBjdXN0b20gcHNldWRvcyBhcmUgYWRkZWQgd2l0aCB1cHBlcmNhc2UgbGV0dGVyc1xuICAgICAgLy8gUmVtZW1iZXIgdGhhdCBzZXRGaWx0ZXJzIGluaGVyaXRzIGZyb20gcHNldWRvc1xuICAgICAgdmFyIGFyZ3MsXG4gICAgICAgIGZuID0gRXhwci5wc2V1ZG9zWyBwc2V1ZG8gXSB8fCBFeHByLnNldEZpbHRlcnNbIHBzZXVkby50b0xvd2VyQ2FzZSgpIF0gfHxcbiAgICAgICAgICBTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgcHNldWRvOiBcIiArIHBzZXVkbyApO1xuXG4gICAgICAvLyBUaGUgdXNlciBtYXkgdXNlIGNyZWF0ZVBzZXVkbyB0byBpbmRpY2F0ZSB0aGF0XG4gICAgICAvLyBhcmd1bWVudHMgYXJlIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpbHRlciBmdW5jdGlvblxuICAgICAgLy8ganVzdCBhcyBTaXp6bGUgZG9lc1xuICAgICAgaWYgKCBmblsgZXhwYW5kbyBdICkge1xuICAgICAgICByZXR1cm4gZm4oIGFyZ3VtZW50ICk7XG4gICAgICB9XG5cbiAgICAgIC8vIEJ1dCBtYWludGFpbiBzdXBwb3J0IGZvciBvbGQgc2lnbmF0dXJlc1xuICAgICAgaWYgKCBmbi5sZW5ndGggPiAxICkge1xuICAgICAgICBhcmdzID0gWyBwc2V1ZG8sIHBzZXVkbywgXCJcIiwgYXJndW1lbnQgXTtcbiAgICAgICAgcmV0dXJuIEV4cHIuc2V0RmlsdGVycy5oYXNPd25Qcm9wZXJ0eSggcHNldWRvLnRvTG93ZXJDYXNlKCkgKSA/XG4gICAgICAgICAgbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuICAgICAgICAgICAgdmFyIGlkeCxcbiAgICAgICAgICAgICAgbWF0Y2hlZCA9IGZuKCBzZWVkLCBhcmd1bWVudCApLFxuICAgICAgICAgICAgICBpID0gbWF0Y2hlZC5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgICAgaWR4ID0gaW5kZXhPZiggc2VlZCwgbWF0Y2hlZFtpXSApO1xuICAgICAgICAgICAgICBzZWVkWyBpZHggXSA9ICEoIG1hdGNoZXNbIGlkeCBdID0gbWF0Y2hlZFtpXSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIDpcbiAgICAgICAgICBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgIHJldHVybiBmbiggZWxlbSwgMCwgYXJncyApO1xuICAgICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbjtcbiAgICB9XG4gIH0sXG5cbiAgcHNldWRvczoge1xuICAgIC8vIFBvdGVudGlhbGx5IGNvbXBsZXggcHNldWRvc1xuICAgIFwibm90XCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgICAvLyBUcmltIHRoZSBzZWxlY3RvciBwYXNzZWQgdG8gY29tcGlsZVxuICAgICAgLy8gdG8gYXZvaWQgdHJlYXRpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmdcbiAgICAgIC8vIHNwYWNlcyBhcyBjb21iaW5hdG9yc1xuICAgICAgdmFyIGlucHV0ID0gW10sXG4gICAgICAgIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgbWF0Y2hlciA9IGNvbXBpbGUoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSApO1xuXG4gICAgICByZXR1cm4gbWF0Y2hlclsgZXhwYW5kbyBdID9cbiAgICAgICAgbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzLCBjb250ZXh0LCB4bWwgKSB7XG4gICAgICAgICAgdmFyIGVsZW0sXG4gICAgICAgICAgICB1bm1hdGNoZWQgPSBtYXRjaGVyKCBzZWVkLCBudWxsLCB4bWwsIFtdICksXG4gICAgICAgICAgICBpID0gc2VlZC5sZW5ndGg7XG5cbiAgICAgICAgICAvLyBNYXRjaCBlbGVtZW50cyB1bm1hdGNoZWQgYnkgYG1hdGNoZXJgXG4gICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgICBpZiAoIChlbGVtID0gdW5tYXRjaGVkW2ldKSApIHtcbiAgICAgICAgICAgICAgc2VlZFtpXSA9ICEobWF0Y2hlc1tpXSA9IGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkgOlxuICAgICAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgICAgIGlucHV0WzBdID0gZWxlbTtcbiAgICAgICAgICBtYXRjaGVyKCBpbnB1dCwgbnVsbCwgeG1sLCByZXN1bHRzICk7XG4gICAgICAgICAgLy8gRG9uJ3Qga2VlcCB0aGUgZWxlbWVudCAoaXNzdWUgIzI5OSlcbiAgICAgICAgICBpbnB1dFswXSA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuICFyZXN1bHRzLnBvcCgpO1xuICAgICAgICB9O1xuICAgIH0pLFxuXG4gICAgXCJoYXNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgcmV0dXJuIFNpenpsZSggc2VsZWN0b3IsIGVsZW0gKS5sZW5ndGggPiAwO1xuICAgICAgfTtcbiAgICB9KSxcblxuICAgIFwiY29udGFpbnNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCB0ZXh0ICkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgcmV0dXJuICggZWxlbS50ZXh0Q29udGVudCB8fCBlbGVtLmlubmVyVGV4dCB8fCBnZXRUZXh0KCBlbGVtICkgKS5pbmRleE9mKCB0ZXh0ICkgPiAtMTtcbiAgICAgIH07XG4gICAgfSksXG5cbiAgICAvLyBcIldoZXRoZXIgYW4gZWxlbWVudCBpcyByZXByZXNlbnRlZCBieSBhIDpsYW5nKCkgc2VsZWN0b3JcbiAgICAvLyBpcyBiYXNlZCBzb2xlbHkgb24gdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZVxuICAgIC8vIGJlaW5nIGVxdWFsIHRvIHRoZSBpZGVudGlmaWVyIEMsXG4gICAgLy8gb3IgYmVnaW5uaW5nIHdpdGggdGhlIGlkZW50aWZpZXIgQyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBcIi1cIi5cbiAgICAvLyBUaGUgbWF0Y2hpbmcgb2YgQyBhZ2FpbnN0IHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWUgaXMgcGVyZm9ybWVkIGNhc2UtaW5zZW5zaXRpdmVseS5cbiAgICAvLyBUaGUgaWRlbnRpZmllciBDIGRvZXMgbm90IGhhdmUgdG8gYmUgYSB2YWxpZCBsYW5ndWFnZSBuYW1lLlwiXG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNsYW5nLXBzZXVkb1xuICAgIFwibGFuZ1wiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBsYW5nICkge1xuICAgICAgLy8gbGFuZyB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclxuICAgICAgaWYgKCAhcmlkZW50aWZpZXIudGVzdChsYW5nIHx8IFwiXCIpICkge1xuICAgICAgICBTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgbGFuZzogXCIgKyBsYW5nICk7XG4gICAgICB9XG4gICAgICBsYW5nID0gbGFuZy5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHZhciBlbGVtTGFuZztcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGlmICggKGVsZW1MYW5nID0gZG9jdW1lbnRJc0hUTUwgP1xuICAgICAgICAgICAgZWxlbS5sYW5nIDpcbiAgICAgICAgICAgIGVsZW0uZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIikgfHwgZWxlbS5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpKSApIHtcblxuICAgICAgICAgICAgZWxlbUxhbmcgPSBlbGVtTGFuZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1MYW5nID09PSBsYW5nIHx8IGVsZW1MYW5nLmluZGV4T2YoIGxhbmcgKyBcIi1cIiApID09PSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoIChlbGVtID0gZWxlbS5wYXJlbnROb2RlKSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG4gICAgfSksXG5cbiAgICAvLyBNaXNjZWxsYW5lb3VzXG4gICAgXCJ0YXJnZXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgIHJldHVybiBoYXNoICYmIGhhc2guc2xpY2UoIDEgKSA9PT0gZWxlbS5pZDtcbiAgICB9LFxuXG4gICAgXCJyb290XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgcmV0dXJuIGVsZW0gPT09IGRvY0VsZW07XG4gICAgfSxcblxuICAgIFwiZm9jdXNcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoIWRvY3VtZW50Lmhhc0ZvY3VzIHx8IGRvY3VtZW50Lmhhc0ZvY3VzKCkpICYmICEhKGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgfHwgfmVsZW0udGFiSW5kZXgpO1xuICAgIH0sXG5cbiAgICAvLyBCb29sZWFuIHByb3BlcnRpZXNcbiAgICBcImVuYWJsZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZmFsc2U7XG4gICAgfSxcblxuICAgIFwiZGlzYWJsZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgXCJjaGVja2VkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgLy8gSW4gQ1NTMywgOmNoZWNrZWQgc2hvdWxkIHJldHVybiBib3RoIGNoZWNrZWQgYW5kIHNlbGVjdGVkIGVsZW1lbnRzXG4gICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuICAgICAgdmFyIG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIChub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmICEhZWxlbS5jaGVja2VkKSB8fCAobm9kZU5hbWUgPT09IFwib3B0aW9uXCIgJiYgISFlbGVtLnNlbGVjdGVkKTtcbiAgICB9LFxuXG4gICAgXCJzZWxlY3RlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIC8vIEFjY2Vzc2luZyB0aGlzIHByb3BlcnR5IG1ha2VzIHNlbGVjdGVkLWJ5LWRlZmF1bHRcbiAgICAgIC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcbiAgICAgIGlmICggZWxlbS5wYXJlbnROb2RlICkge1xuICAgICAgICBlbGVtLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVsZW0uc2VsZWN0ZWQgPT09IHRydWU7XG4gICAgfSxcblxuICAgIC8vIENvbnRlbnRzXG4gICAgXCJlbXB0eVwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jZW1wdHktcHNldWRvXG4gICAgICAvLyA6ZW1wdHkgaXMgbmVnYXRlZCBieSBlbGVtZW50ICgxKSBvciBjb250ZW50IG5vZGVzICh0ZXh0OiAzOyBjZGF0YTogNDsgZW50aXR5IHJlZjogNSksXG4gICAgICAvLyAgIGJ1dCBub3QgYnkgb3RoZXJzIChjb21tZW50OiA4OyBwcm9jZXNzaW5nIGluc3RydWN0aW9uOiA3OyBldGMuKVxuICAgICAgLy8gbm9kZVR5cGUgPCA2IHdvcmtzIGJlY2F1c2UgYXR0cmlidXRlcyAoMikgZG8gbm90IGFwcGVhciBhcyBjaGlsZHJlblxuICAgICAgZm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG4gICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA8IDYgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgXCJwYXJlbnRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gIUV4cHIucHNldWRvc1tcImVtcHR5XCJdKCBlbGVtICk7XG4gICAgfSxcblxuICAgIC8vIEVsZW1lbnQvaW5wdXQgdHlwZXNcbiAgICBcImhlYWRlclwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcbiAgICB9LFxuXG4gICAgXCJpbnB1dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiByaW5wdXRzLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcbiAgICB9LFxuXG4gICAgXCJidXR0b25cIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICB2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSBcImJ1dHRvblwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCI7XG4gICAgfSxcblxuICAgIFwidGV4dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHZhciBhdHRyO1xuICAgICAgcmV0dXJuIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICYmXG4gICAgICAgIGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCIgJiZcblxuICAgICAgICAvLyBTdXBwb3J0OiBJRTw4XG4gICAgICAgIC8vIE5ldyBIVE1MNSBhdHRyaWJ1dGUgdmFsdWVzIChlLmcuLCBcInNlYXJjaFwiKSBhcHBlYXIgd2l0aCBlbGVtLnR5cGUgPT09IFwidGV4dFwiXG4gICAgICAgICggKGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZShcInR5cGVcIikpID09IG51bGwgfHwgYXR0ci50b0xvd2VyQ2FzZSgpID09PSBcInRleHRcIiApO1xuICAgIH0sXG5cbiAgICAvLyBQb3NpdGlvbi1pbi1jb2xsZWN0aW9uXG4gICAgXCJmaXJzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFsgMCBdO1xuICAgIH0pLFxuXG4gICAgXCJsYXN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuICAgICAgcmV0dXJuIFsgbGVuZ3RoIC0gMSBdO1xuICAgIH0pLFxuXG4gICAgXCJlcVwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG4gICAgICByZXR1cm4gWyBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50IF07XG4gICAgfSksXG5cbiAgICBcImV2ZW5cIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcbiAgICAgICAgbWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaEluZGV4ZXM7XG4gICAgfSksXG5cbiAgICBcIm9kZFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcbiAgICAgIHZhciBpID0gMTtcbiAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuICAgICAgICBtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoSW5kZXhlcztcbiAgICB9KSxcblxuICAgIFwibHRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuICAgICAgdmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xuICAgICAgZm9yICggOyAtLWkgPj0gMDsgKSB7XG4gICAgICAgIG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xuICAgIH0pLFxuXG4gICAgXCJndFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG4gICAgICB2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG4gICAgICBmb3IgKCA7ICsraSA8IGxlbmd0aDsgKSB7XG4gICAgICAgIG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xuICAgIH0pXG4gIH1cbn07XG5cbkV4cHIucHNldWRvc1tcIm50aFwiXSA9IEV4cHIucHNldWRvc1tcImVxXCJdO1xuXG4vLyBBZGQgYnV0dG9uL2lucHV0IHR5cGUgcHNldWRvc1xuZm9yICggaSBpbiB7IHJhZGlvOiB0cnVlLCBjaGVja2JveDogdHJ1ZSwgZmlsZTogdHJ1ZSwgcGFzc3dvcmQ6IHRydWUsIGltYWdlOiB0cnVlIH0gKSB7XG4gIEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlSW5wdXRQc2V1ZG8oIGkgKTtcbn1cbmZvciAoIGkgaW4geyBzdWJtaXQ6IHRydWUsIHJlc2V0OiB0cnVlIH0gKSB7XG4gIEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlQnV0dG9uUHNldWRvKCBpICk7XG59XG5cbi8vIEVhc3kgQVBJIGZvciBjcmVhdGluZyBuZXcgc2V0RmlsdGVyc1xuZnVuY3Rpb24gc2V0RmlsdGVycygpIHt9XG5zZXRGaWx0ZXJzLnByb3RvdHlwZSA9IEV4cHIuZmlsdGVycyA9IEV4cHIucHNldWRvcztcbkV4cHIuc2V0RmlsdGVycyA9IG5ldyBzZXRGaWx0ZXJzKCk7XG5cbnRva2VuaXplID0gU2l6emxlLnRva2VuaXplID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBwYXJzZU9ubHkgKSB7XG4gIHZhciBtYXRjaGVkLCBtYXRjaCwgdG9rZW5zLCB0eXBlLFxuICAgIHNvRmFyLCBncm91cHMsIHByZUZpbHRlcnMsXG4gICAgY2FjaGVkID0gdG9rZW5DYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG4gIGlmICggY2FjaGVkICkge1xuICAgIHJldHVybiBwYXJzZU9ubHkgPyAwIDogY2FjaGVkLnNsaWNlKCAwICk7XG4gIH1cblxuICBzb0ZhciA9IHNlbGVjdG9yO1xuICBncm91cHMgPSBbXTtcbiAgcHJlRmlsdGVycyA9IEV4cHIucHJlRmlsdGVyO1xuXG4gIHdoaWxlICggc29GYXIgKSB7XG5cbiAgICAvLyBDb21tYSBhbmQgZmlyc3QgcnVuXG4gICAgaWYgKCAhbWF0Y2hlZCB8fCAobWF0Y2ggPSByY29tbWEuZXhlYyggc29GYXIgKSkgKSB7XG4gICAgICBpZiAoIG1hdGNoICkge1xuICAgICAgICAvLyBEb24ndCBjb25zdW1lIHRyYWlsaW5nIGNvbW1hcyBhcyB2YWxpZFxuICAgICAgICBzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaFswXS5sZW5ndGggKSB8fCBzb0ZhcjtcbiAgICAgIH1cbiAgICAgIGdyb3Vwcy5wdXNoKCAodG9rZW5zID0gW10pICk7XG4gICAgfVxuXG4gICAgbWF0Y2hlZCA9IGZhbHNlO1xuXG4gICAgLy8gQ29tYmluYXRvcnNcbiAgICBpZiAoIChtYXRjaCA9IHJjb21iaW5hdG9ycy5leGVjKCBzb0ZhciApKSApIHtcbiAgICAgIG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB2YWx1ZTogbWF0Y2hlZCxcbiAgICAgICAgLy8gQ2FzdCBkZXNjZW5kYW50IGNvbWJpbmF0b3JzIHRvIHNwYWNlXG4gICAgICAgIHR5cGU6IG1hdGNoWzBdLnJlcGxhY2UoIHJ0cmltLCBcIiBcIiApXG4gICAgICB9KTtcbiAgICAgIHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG4gICAgfVxuXG4gICAgLy8gRmlsdGVyc1xuICAgIGZvciAoIHR5cGUgaW4gRXhwci5maWx0ZXIgKSB7XG4gICAgICBpZiAoIChtYXRjaCA9IG1hdGNoRXhwclsgdHlwZSBdLmV4ZWMoIHNvRmFyICkpICYmICghcHJlRmlsdGVyc1sgdHlwZSBdIHx8XG4gICAgICAgIChtYXRjaCA9IHByZUZpbHRlcnNbIHR5cGUgXSggbWF0Y2ggKSkpICkge1xuICAgICAgICBtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHZhbHVlOiBtYXRjaGVkLFxuICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgbWF0Y2hlczogbWF0Y2hcbiAgICAgICAgfSk7XG4gICAgICAgIHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCAhbWF0Y2hlZCApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgbGVuZ3RoIG9mIHRoZSBpbnZhbGlkIGV4Y2Vzc1xuICAvLyBpZiB3ZSdyZSBqdXN0IHBhcnNpbmdcbiAgLy8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvciBvciByZXR1cm4gdG9rZW5zXG4gIHJldHVybiBwYXJzZU9ubHkgP1xuICAgIHNvRmFyLmxlbmd0aCA6XG4gICAgc29GYXIgP1xuICAgICAgU2l6emxlLmVycm9yKCBzZWxlY3RvciApIDpcbiAgICAgIC8vIENhY2hlIHRoZSB0b2tlbnNcbiAgICAgIHRva2VuQ2FjaGUoIHNlbGVjdG9yLCBncm91cHMgKS5zbGljZSggMCApO1xufTtcblxuZnVuY3Rpb24gdG9TZWxlY3RvciggdG9rZW5zICkge1xuICB2YXIgaSA9IDAsXG4gICAgbGVuID0gdG9rZW5zLmxlbmd0aCxcbiAgICBzZWxlY3RvciA9IFwiXCI7XG4gIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHNlbGVjdG9yICs9IHRva2Vuc1tpXS52YWx1ZTtcbiAgfVxuICByZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIGFkZENvbWJpbmF0b3IoIG1hdGNoZXIsIGNvbWJpbmF0b3IsIGJhc2UgKSB7XG4gIHZhciBkaXIgPSBjb21iaW5hdG9yLmRpcixcbiAgICBjaGVja05vbkVsZW1lbnRzID0gYmFzZSAmJiBkaXIgPT09IFwicGFyZW50Tm9kZVwiLFxuICAgIGRvbmVOYW1lID0gZG9uZSsrO1xuXG4gIHJldHVybiBjb21iaW5hdG9yLmZpcnN0ID9cbiAgICAvLyBDaGVjayBhZ2FpbnN0IGNsb3Nlc3QgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRcbiAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgd2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcbiAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSA6XG5cbiAgICAvLyBDaGVjayBhZ2FpbnN0IGFsbCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudHNcbiAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgdmFyIG9sZENhY2hlLCBvdXRlckNhY2hlLFxuICAgICAgICBuZXdDYWNoZSA9IFsgZGlycnVucywgZG9uZU5hbWUgXTtcblxuICAgICAgLy8gV2UgY2FuJ3Qgc2V0IGFyYml0cmFyeSBkYXRhIG9uIFhNTCBub2Rlcywgc28gdGhleSBkb24ndCBiZW5lZml0IGZyb20gZGlyIGNhY2hpbmdcbiAgICAgIGlmICggeG1sICkge1xuICAgICAgICB3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuICAgICAgICAgICAgaWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuICAgICAgICAgICAgb3V0ZXJDYWNoZSA9IGVsZW1bIGV4cGFuZG8gXSB8fCAoZWxlbVsgZXhwYW5kbyBdID0ge30pO1xuICAgICAgICAgICAgaWYgKCAob2xkQ2FjaGUgPSBvdXRlckNhY2hlWyBkaXIgXSkgJiZcbiAgICAgICAgICAgICAgb2xkQ2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBvbGRDYWNoZVsgMSBdID09PSBkb25lTmFtZSApIHtcblxuICAgICAgICAgICAgICAvLyBBc3NpZ24gdG8gbmV3Q2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuICAgICAgICAgICAgICByZXR1cm4gKG5ld0NhY2hlWyAyIF0gPSBvbGRDYWNoZVsgMiBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFJldXNlIG5ld2NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcbiAgICAgICAgICAgICAgb3V0ZXJDYWNoZVsgZGlyIF0gPSBuZXdDYWNoZTtcblxuICAgICAgICAgICAgICAvLyBBIG1hdGNoIG1lYW5zIHdlJ3JlIGRvbmU7IGEgZmFpbCBtZWFucyB3ZSBoYXZlIHRvIGtlZXAgY2hlY2tpbmdcbiAgICAgICAgICAgICAgaWYgKCAobmV3Q2FjaGVbIDIgXSA9IG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApIHtcbiAgcmV0dXJuIG1hdGNoZXJzLmxlbmd0aCA+IDEgP1xuICAgIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG4gICAgICB2YXIgaSA9IG1hdGNoZXJzLmxlbmd0aDtcbiAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICBpZiAoICFtYXRjaGVyc1tpXSggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IDpcbiAgICBtYXRjaGVyc1swXTtcbn1cblxuZnVuY3Rpb24gbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IsIGNvbnRleHRzLCByZXN1bHRzICkge1xuICB2YXIgaSA9IDAsXG4gICAgbGVuID0gY29udGV4dHMubGVuZ3RoO1xuICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICBTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0c1tpXSwgcmVzdWx0cyApO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBjb25kZW5zZSggdW5tYXRjaGVkLCBtYXAsIGZpbHRlciwgY29udGV4dCwgeG1sICkge1xuICB2YXIgZWxlbSxcbiAgICBuZXdVbm1hdGNoZWQgPSBbXSxcbiAgICBpID0gMCxcbiAgICBsZW4gPSB1bm1hdGNoZWQubGVuZ3RoLFxuICAgIG1hcHBlZCA9IG1hcCAhPSBudWxsO1xuXG4gIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgIGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xuICAgICAgaWYgKCAhZmlsdGVyIHx8IGZpbHRlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG4gICAgICAgIG5ld1VubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG4gICAgICAgIGlmICggbWFwcGVkICkge1xuICAgICAgICAgIG1hcC5wdXNoKCBpICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3VW5tYXRjaGVkO1xufVxuXG5mdW5jdGlvbiBzZXRNYXRjaGVyKCBwcmVGaWx0ZXIsIHNlbGVjdG9yLCBtYXRjaGVyLCBwb3N0RmlsdGVyLCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKSB7XG4gIGlmICggcG9zdEZpbHRlciAmJiAhcG9zdEZpbHRlclsgZXhwYW5kbyBdICkge1xuICAgIHBvc3RGaWx0ZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmlsdGVyICk7XG4gIH1cbiAgaWYgKCBwb3N0RmluZGVyICYmICFwb3N0RmluZGVyWyBleHBhbmRvIF0gKSB7XG4gICAgcG9zdEZpbmRlciA9IHNldE1hdGNoZXIoIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApO1xuICB9XG4gIHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIHJlc3VsdHMsIGNvbnRleHQsIHhtbCApIHtcbiAgICB2YXIgdGVtcCwgaSwgZWxlbSxcbiAgICAgIHByZU1hcCA9IFtdLFxuICAgICAgcG9zdE1hcCA9IFtdLFxuICAgICAgcHJlZXhpc3RpbmcgPSByZXN1bHRzLmxlbmd0aCxcblxuICAgICAgLy8gR2V0IGluaXRpYWwgZWxlbWVudHMgZnJvbSBzZWVkIG9yIGNvbnRleHRcbiAgICAgIGVsZW1zID0gc2VlZCB8fCBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciB8fCBcIipcIiwgY29udGV4dC5ub2RlVHlwZSA/IFsgY29udGV4dCBdIDogY29udGV4dCwgW10gKSxcblxuICAgICAgLy8gUHJlZmlsdGVyIHRvIGdldCBtYXRjaGVyIGlucHV0LCBwcmVzZXJ2aW5nIGEgbWFwIGZvciBzZWVkLXJlc3VsdHMgc3luY2hyb25pemF0aW9uXG4gICAgICBtYXRjaGVySW4gPSBwcmVGaWx0ZXIgJiYgKCBzZWVkIHx8ICFzZWxlY3RvciApID9cbiAgICAgICAgY29uZGVuc2UoIGVsZW1zLCBwcmVNYXAsIHByZUZpbHRlciwgY29udGV4dCwgeG1sICkgOlxuICAgICAgICBlbGVtcyxcblxuICAgICAgbWF0Y2hlck91dCA9IG1hdGNoZXIgP1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgcG9zdEZpbmRlciwgb3IgZmlsdGVyZWQgc2VlZCwgb3Igbm9uLXNlZWQgcG9zdEZpbHRlciBvciBwcmVleGlzdGluZyByZXN1bHRzLFxuICAgICAgICBwb3N0RmluZGVyIHx8ICggc2VlZCA/IHByZUZpbHRlciA6IHByZWV4aXN0aW5nIHx8IHBvc3RGaWx0ZXIgKSA/XG5cbiAgICAgICAgICAvLyAuLi5pbnRlcm1lZGlhdGUgcHJvY2Vzc2luZyBpcyBuZWNlc3NhcnlcbiAgICAgICAgICBbXSA6XG5cbiAgICAgICAgICAvLyAuLi5vdGhlcndpc2UgdXNlIHJlc3VsdHMgZGlyZWN0bHlcbiAgICAgICAgICByZXN1bHRzIDpcbiAgICAgICAgbWF0Y2hlckluO1xuXG4gICAgLy8gRmluZCBwcmltYXJ5IG1hdGNoZXNcbiAgICBpZiAoIG1hdGNoZXIgKSB7XG4gICAgICBtYXRjaGVyKCBtYXRjaGVySW4sIG1hdGNoZXJPdXQsIGNvbnRleHQsIHhtbCApO1xuICAgIH1cblxuICAgIC8vIEFwcGx5IHBvc3RGaWx0ZXJcbiAgICBpZiAoIHBvc3RGaWx0ZXIgKSB7XG4gICAgICB0ZW1wID0gY29uZGVuc2UoIG1hdGNoZXJPdXQsIHBvc3RNYXAgKTtcbiAgICAgIHBvc3RGaWx0ZXIoIHRlbXAsIFtdLCBjb250ZXh0LCB4bWwgKTtcblxuICAgICAgLy8gVW4tbWF0Y2ggZmFpbGluZyBlbGVtZW50cyBieSBtb3ZpbmcgdGhlbSBiYWNrIHRvIG1hdGNoZXJJblxuICAgICAgaSA9IHRlbXAubGVuZ3RoO1xuICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgIGlmICggKGVsZW0gPSB0ZW1wW2ldKSApIHtcbiAgICAgICAgICBtYXRjaGVyT3V0WyBwb3N0TWFwW2ldIF0gPSAhKG1hdGNoZXJJblsgcG9zdE1hcFtpXSBdID0gZWxlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIHNlZWQgKSB7XG4gICAgICBpZiAoIHBvc3RGaW5kZXIgfHwgcHJlRmlsdGVyICkge1xuICAgICAgICBpZiAoIHBvc3RGaW5kZXIgKSB7XG4gICAgICAgICAgLy8gR2V0IHRoZSBmaW5hbCBtYXRjaGVyT3V0IGJ5IGNvbmRlbnNpbmcgdGhpcyBpbnRlcm1lZGlhdGUgaW50byBwb3N0RmluZGVyIGNvbnRleHRzXG4gICAgICAgICAgdGVtcCA9IFtdO1xuICAgICAgICAgIGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcbiAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgIGlmICggKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSApIHtcbiAgICAgICAgICAgICAgLy8gUmVzdG9yZSBtYXRjaGVySW4gc2luY2UgZWxlbSBpcyBub3QgeWV0IGEgZmluYWwgbWF0Y2hcbiAgICAgICAgICAgICAgdGVtcC5wdXNoKCAobWF0Y2hlckluW2ldID0gZWxlbSkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcG9zdEZpbmRlciggbnVsbCwgKG1hdGNoZXJPdXQgPSBbXSksIHRlbXAsIHhtbCApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTW92ZSBtYXRjaGVkIGVsZW1lbnRzIGZyb20gc2VlZCB0byByZXN1bHRzIHRvIGtlZXAgdGhlbSBzeW5jaHJvbml6ZWRcbiAgICAgICAgaSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICBpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgJiZcbiAgICAgICAgICAgICh0ZW1wID0gcG9zdEZpbmRlciA/IGluZGV4T2YoIHNlZWQsIGVsZW0gKSA6IHByZU1hcFtpXSkgPiAtMSApIHtcblxuICAgICAgICAgICAgc2VlZFt0ZW1wXSA9ICEocmVzdWx0c1t0ZW1wXSA9IGVsZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgLy8gQWRkIGVsZW1lbnRzIHRvIHJlc3VsdHMsIHRocm91Z2ggcG9zdEZpbmRlciBpZiBkZWZpbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZXJPdXQgPSBjb25kZW5zZShcbiAgICAgICAgbWF0Y2hlck91dCA9PT0gcmVzdWx0cyA/XG4gICAgICAgICAgbWF0Y2hlck91dC5zcGxpY2UoIHByZWV4aXN0aW5nLCBtYXRjaGVyT3V0Lmxlbmd0aCApIDpcbiAgICAgICAgICBtYXRjaGVyT3V0XG4gICAgICApO1xuICAgICAgaWYgKCBwb3N0RmluZGVyICkge1xuICAgICAgICBwb3N0RmluZGVyKCBudWxsLCByZXN1bHRzLCBtYXRjaGVyT3V0LCB4bWwgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsIG1hdGNoZXJPdXQgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zICkge1xuICB2YXIgY2hlY2tDb250ZXh0LCBtYXRjaGVyLCBqLFxuICAgIGxlbiA9IHRva2Vucy5sZW5ndGgsXG4gICAgbGVhZGluZ1JlbGF0aXZlID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzBdLnR5cGUgXSxcbiAgICBpbXBsaWNpdFJlbGF0aXZlID0gbGVhZGluZ1JlbGF0aXZlIHx8IEV4cHIucmVsYXRpdmVbXCIgXCJdLFxuICAgIGkgPSBsZWFkaW5nUmVsYXRpdmUgPyAxIDogMCxcblxuICAgIC8vIFRoZSBmb3VuZGF0aW9uYWwgbWF0Y2hlciBlbnN1cmVzIHRoYXQgZWxlbWVudHMgYXJlIHJlYWNoYWJsZSBmcm9tIHRvcC1sZXZlbCBjb250ZXh0KHMpXG4gICAgbWF0Y2hDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gZWxlbSA9PT0gY2hlY2tDb250ZXh0O1xuICAgIH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcbiAgICBtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiBpbmRleE9mKCBjaGVja0NvbnRleHQsIGVsZW0gKSA+IC0xO1xuICAgIH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcbiAgICBtYXRjaGVycyA9IFsgZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcbiAgICAgIHZhciByZXQgPSAoICFsZWFkaW5nUmVsYXRpdmUgJiYgKCB4bWwgfHwgY29udGV4dCAhPT0gb3V0ZXJtb3N0Q29udGV4dCApICkgfHwgKFxuICAgICAgICAoY2hlY2tDb250ZXh0ID0gY29udGV4dCkubm9kZVR5cGUgP1xuICAgICAgICAgIG1hdGNoQ29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgOlxuICAgICAgICAgIG1hdGNoQW55Q29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgKTtcbiAgICAgIC8vIEF2b2lkIGhhbmdpbmcgb250byBlbGVtZW50IChpc3N1ZSAjMjk5KVxuICAgICAgY2hlY2tDb250ZXh0ID0gbnVsbDtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBdO1xuXG4gIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgIGlmICggKG1hdGNoZXIgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbaV0udHlwZSBdKSApIHtcbiAgICAgIG1hdGNoZXJzID0gWyBhZGRDb21iaW5hdG9yKGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLCBtYXRjaGVyKSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRjaGVyID0gRXhwci5maWx0ZXJbIHRva2Vuc1tpXS50eXBlIF0uYXBwbHkoIG51bGwsIHRva2Vuc1tpXS5tYXRjaGVzICk7XG5cbiAgICAgIC8vIFJldHVybiBzcGVjaWFsIHVwb24gc2VlaW5nIGEgcG9zaXRpb25hbCBtYXRjaGVyXG4gICAgICBpZiAoIG1hdGNoZXJbIGV4cGFuZG8gXSApIHtcbiAgICAgICAgLy8gRmluZCB0aGUgbmV4dCByZWxhdGl2ZSBvcGVyYXRvciAoaWYgYW55KSBmb3IgcHJvcGVyIGhhbmRsaW5nXG4gICAgICAgIGogPSArK2k7XG4gICAgICAgIGZvciAoIDsgaiA8IGxlbjsgaisrICkge1xuICAgICAgICAgIGlmICggRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2pdLnR5cGUgXSApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2V0TWF0Y2hlcihcbiAgICAgICAgICBpID4gMSAmJiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSxcbiAgICAgICAgICBpID4gMSAmJiB0b1NlbGVjdG9yKFxuICAgICAgICAgICAgLy8gSWYgdGhlIHByZWNlZGluZyB0b2tlbiB3YXMgYSBkZXNjZW5kYW50IGNvbWJpbmF0b3IsIGluc2VydCBhbiBpbXBsaWNpdCBhbnktZWxlbWVudCBgKmBcbiAgICAgICAgICAgIHRva2Vucy5zbGljZSggMCwgaSAtIDEgKS5jb25jYXQoeyB2YWx1ZTogdG9rZW5zWyBpIC0gMiBdLnR5cGUgPT09IFwiIFwiID8gXCIqXCIgOiBcIlwiIH0pXG4gICAgICAgICAgKS5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksXG4gICAgICAgICAgbWF0Y2hlcixcbiAgICAgICAgICBpIDwgaiAmJiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zLnNsaWNlKCBpLCBqICkgKSxcbiAgICAgICAgICBqIDwgbGVuICYmIG1hdGNoZXJGcm9tVG9rZW5zKCAodG9rZW5zID0gdG9rZW5zLnNsaWNlKCBqICkpICksXG4gICAgICAgICAgaiA8IGxlbiAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgbWF0Y2hlcnMucHVzaCggbWF0Y2hlciApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzICkge1xuICB2YXIgYnlTZXQgPSBzZXRNYXRjaGVycy5sZW5ndGggPiAwLFxuICAgIGJ5RWxlbWVudCA9IGVsZW1lbnRNYXRjaGVycy5sZW5ndGggPiAwLFxuICAgIHN1cGVyTWF0Y2hlciA9IGZ1bmN0aW9uKCBzZWVkLCBjb250ZXh0LCB4bWwsIHJlc3VsdHMsIG91dGVybW9zdCApIHtcbiAgICAgIHZhciBlbGVtLCBqLCBtYXRjaGVyLFxuICAgICAgICBtYXRjaGVkQ291bnQgPSAwLFxuICAgICAgICBpID0gXCIwXCIsXG4gICAgICAgIHVubWF0Y2hlZCA9IHNlZWQgJiYgW10sXG4gICAgICAgIHNldE1hdGNoZWQgPSBbXSxcbiAgICAgICAgY29udGV4dEJhY2t1cCA9IG91dGVybW9zdENvbnRleHQsXG4gICAgICAgIC8vIFdlIG11c3QgYWx3YXlzIGhhdmUgZWl0aGVyIHNlZWQgZWxlbWVudHMgb3Igb3V0ZXJtb3N0IGNvbnRleHRcbiAgICAgICAgZWxlbXMgPSBzZWVkIHx8IGJ5RWxlbWVudCAmJiBFeHByLmZpbmRbXCJUQUdcIl0oIFwiKlwiLCBvdXRlcm1vc3QgKSxcbiAgICAgICAgLy8gVXNlIGludGVnZXIgZGlycnVucyBpZmYgdGhpcyBpcyB0aGUgb3V0ZXJtb3N0IG1hdGNoZXJcbiAgICAgICAgZGlycnVuc1VuaXF1ZSA9IChkaXJydW5zICs9IGNvbnRleHRCYWNrdXAgPT0gbnVsbCA/IDEgOiBNYXRoLnJhbmRvbSgpIHx8IDAuMSksXG4gICAgICAgIGxlbiA9IGVsZW1zLmxlbmd0aDtcblxuICAgICAgaWYgKCBvdXRlcm1vc3QgKSB7XG4gICAgICAgIG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0ICE9PSBkb2N1bWVudCAmJiBjb250ZXh0O1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgZWxlbWVudHMgcGFzc2luZyBlbGVtZW50TWF0Y2hlcnMgZGlyZWN0bHkgdG8gcmVzdWx0c1xuICAgICAgLy8gS2VlcCBgaWAgYSBzdHJpbmcgaWYgdGhlcmUgYXJlIG5vIGVsZW1lbnRzIHNvIGBtYXRjaGVkQ291bnRgIHdpbGwgYmUgXCIwMFwiIGJlbG93XG4gICAgICAvLyBTdXBwb3J0OiBJRTw5LCBTYWZhcmlcbiAgICAgIC8vIFRvbGVyYXRlIE5vZGVMaXN0IHByb3BlcnRpZXMgKElFOiBcImxlbmd0aFwiOyBTYWZhcmk6IDxudW1iZXI+KSBtYXRjaGluZyBlbGVtZW50cyBieSBpZFxuICAgICAgZm9yICggOyBpICE9PSBsZW4gJiYgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuICAgICAgICBpZiAoIGJ5RWxlbWVudCAmJiBlbGVtICkge1xuICAgICAgICAgIGogPSAwO1xuICAgICAgICAgIHdoaWxlICggKG1hdGNoZXIgPSBlbGVtZW50TWF0Y2hlcnNbaisrXSkgKSB7XG4gICAgICAgICAgICBpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuICAgICAgICAgICAgICByZXN1bHRzLnB1c2goIGVsZW0gKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggb3V0ZXJtb3N0ICkge1xuICAgICAgICAgICAgZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHJhY2sgdW5tYXRjaGVkIGVsZW1lbnRzIGZvciBzZXQgZmlsdGVyc1xuICAgICAgICBpZiAoIGJ5U2V0ICkge1xuICAgICAgICAgIC8vIFRoZXkgd2lsbCBoYXZlIGdvbmUgdGhyb3VnaCBhbGwgcG9zc2libGUgbWF0Y2hlcnNcbiAgICAgICAgICBpZiAoIChlbGVtID0gIW1hdGNoZXIgJiYgZWxlbSkgKSB7XG4gICAgICAgICAgICBtYXRjaGVkQ291bnQtLTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBMZW5ndGhlbiB0aGUgYXJyYXkgZm9yIGV2ZXJ5IGVsZW1lbnQsIG1hdGNoZWQgb3Igbm90XG4gICAgICAgICAgaWYgKCBzZWVkICkge1xuICAgICAgICAgICAgdW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQXBwbHkgc2V0IGZpbHRlcnMgdG8gdW5tYXRjaGVkIGVsZW1lbnRzXG4gICAgICBtYXRjaGVkQ291bnQgKz0gaTtcbiAgICAgIGlmICggYnlTZXQgJiYgaSAhPT0gbWF0Y2hlZENvdW50ICkge1xuICAgICAgICBqID0gMDtcbiAgICAgICAgd2hpbGUgKCAobWF0Y2hlciA9IHNldE1hdGNoZXJzW2orK10pICkge1xuICAgICAgICAgIG1hdGNoZXIoIHVubWF0Y2hlZCwgc2V0TWF0Y2hlZCwgY29udGV4dCwgeG1sICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHNlZWQgKSB7XG4gICAgICAgICAgLy8gUmVpbnRlZ3JhdGUgZWxlbWVudCBtYXRjaGVzIHRvIGVsaW1pbmF0ZSB0aGUgbmVlZCBmb3Igc29ydGluZ1xuICAgICAgICAgIGlmICggbWF0Y2hlZENvdW50ID4gMCApIHtcbiAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgICAgICBpZiAoICEodW5tYXRjaGVkW2ldIHx8IHNldE1hdGNoZWRbaV0pICkge1xuICAgICAgICAgICAgICAgIHNldE1hdGNoZWRbaV0gPSBwb3AuY2FsbCggcmVzdWx0cyApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGlzY2FyZCBpbmRleCBwbGFjZWhvbGRlciB2YWx1ZXMgdG8gZ2V0IG9ubHkgYWN0dWFsIG1hdGNoZXNcbiAgICAgICAgICBzZXRNYXRjaGVkID0gY29uZGVuc2UoIHNldE1hdGNoZWQgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBtYXRjaGVzIHRvIHJlc3VsdHNcbiAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cywgc2V0TWF0Y2hlZCApO1xuXG4gICAgICAgIC8vIFNlZWRsZXNzIHNldCBtYXRjaGVzIHN1Y2NlZWRpbmcgbXVsdGlwbGUgc3VjY2Vzc2Z1bCBtYXRjaGVycyBzdGlwdWxhdGUgc29ydGluZ1xuICAgICAgICBpZiAoIG91dGVybW9zdCAmJiAhc2VlZCAmJiBzZXRNYXRjaGVkLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAoIG1hdGNoZWRDb3VudCArIHNldE1hdGNoZXJzLmxlbmd0aCApID4gMSApIHtcblxuICAgICAgICAgIFNpenpsZS51bmlxdWVTb3J0KCByZXN1bHRzICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gT3ZlcnJpZGUgbWFuaXB1bGF0aW9uIG9mIGdsb2JhbHMgYnkgbmVzdGVkIG1hdGNoZXJzXG4gICAgICBpZiAoIG91dGVybW9zdCApIHtcbiAgICAgICAgZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG4gICAgICAgIG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0QmFja3VwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5tYXRjaGVkO1xuICAgIH07XG5cbiAgcmV0dXJuIGJ5U2V0ID9cbiAgICBtYXJrRnVuY3Rpb24oIHN1cGVyTWF0Y2hlciApIDpcbiAgICBzdXBlck1hdGNoZXI7XG59XG5cbmNvbXBpbGUgPSBTaXp6bGUuY29tcGlsZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgbWF0Y2ggLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG4gIHZhciBpLFxuICAgIHNldE1hdGNoZXJzID0gW10sXG4gICAgZWxlbWVudE1hdGNoZXJzID0gW10sXG4gICAgY2FjaGVkID0gY29tcGlsZXJDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG4gIGlmICggIWNhY2hlZCApIHtcbiAgICAvLyBHZW5lcmF0ZSBhIGZ1bmN0aW9uIG9mIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjaGVjayBlYWNoIGVsZW1lbnRcbiAgICBpZiAoICFtYXRjaCApIHtcbiAgICAgIG1hdGNoID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG4gICAgfVxuICAgIGkgPSBtYXRjaC5sZW5ndGg7XG4gICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICBjYWNoZWQgPSBtYXRjaGVyRnJvbVRva2VucyggbWF0Y2hbaV0gKTtcbiAgICAgIGlmICggY2FjaGVkWyBleHBhbmRvIF0gKSB7XG4gICAgICAgIHNldE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhY2hlIHRoZSBjb21waWxlZCBmdW5jdGlvblxuICAgIGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGUoIHNlbGVjdG9yLCBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSApO1xuXG4gICAgLy8gU2F2ZSBzZWxlY3RvciBhbmQgdG9rZW5pemF0aW9uXG4gICAgY2FjaGVkLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gIH1cbiAgcmV0dXJuIGNhY2hlZDtcbn07XG5cbi8qKlxuICogQSBsb3ctbGV2ZWwgc2VsZWN0aW9uIGZ1bmN0aW9uIHRoYXQgd29ya3Mgd2l0aCBTaXp6bGUncyBjb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHNlbGVjdG9yIEEgc2VsZWN0b3Igb3IgYSBwcmUtY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbiBidWlsdCB3aXRoIFNpenpsZS5jb21waWxlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRleHRcbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHRzXVxuICogQHBhcmFtIHtBcnJheX0gW3NlZWRdIEEgc2V0IG9mIGVsZW1lbnRzIHRvIG1hdGNoIGFnYWluc3RcbiAqL1xuc2VsZWN0ID0gU2l6emxlLnNlbGVjdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcbiAgdmFyIGksIHRva2VucywgdG9rZW4sIHR5cGUsIGZpbmQsXG4gICAgY29tcGlsZWQgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBzZWxlY3RvcixcbiAgICBtYXRjaCA9ICFzZWVkICYmIHRva2VuaXplKCAoc2VsZWN0b3IgPSBjb21waWxlZC5zZWxlY3RvciB8fCBzZWxlY3RvcikgKTtcblxuICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuICAvLyBUcnkgdG8gbWluaW1pemUgb3BlcmF0aW9ucyBpZiB0aGVyZSBpcyBubyBzZWVkIGFuZCBvbmx5IG9uZSBncm91cFxuICBpZiAoIG1hdGNoLmxlbmd0aCA9PT0gMSApIHtcblxuICAgIC8vIFRha2UgYSBzaG9ydGN1dCBhbmQgc2V0IHRoZSBjb250ZXh0IGlmIHRoZSByb290IHNlbGVjdG9yIGlzIGFuIElEXG4gICAgdG9rZW5zID0gbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCApO1xuICAgIGlmICggdG9rZW5zLmxlbmd0aCA+IDIgJiYgKHRva2VuID0gdG9rZW5zWzBdKS50eXBlID09PSBcIklEXCIgJiZcbiAgICAgICAgc3VwcG9ydC5nZXRCeUlkICYmIGNvbnRleHQubm9kZVR5cGUgPT09IDkgJiYgZG9jdW1lbnRJc0hUTUwgJiZcbiAgICAgICAgRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzFdLnR5cGUgXSApIHtcblxuICAgICAgY29udGV4dCA9ICggRXhwci5maW5kW1wiSURcIl0oIHRva2VuLm1hdGNoZXNbMF0ucmVwbGFjZShydW5lc2NhcGUsIGZ1bmVzY2FwZSksIGNvbnRleHQgKSB8fCBbXSApWzBdO1xuICAgICAgaWYgKCAhY29udGV4dCApIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG5cbiAgICAgIC8vIFByZWNvbXBpbGVkIG1hdGNoZXJzIHdpbGwgc3RpbGwgdmVyaWZ5IGFuY2VzdHJ5LCBzbyBzdGVwIHVwIGEgbGV2ZWxcbiAgICAgIH0gZWxzZSBpZiAoIGNvbXBpbGVkICkge1xuICAgICAgICBjb250ZXh0ID0gY29udGV4dC5wYXJlbnROb2RlO1xuICAgICAgfVxuXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnNsaWNlKCB0b2tlbnMuc2hpZnQoKS52YWx1ZS5sZW5ndGggKTtcbiAgICB9XG5cbiAgICAvLyBGZXRjaCBhIHNlZWQgc2V0IGZvciByaWdodC10by1sZWZ0IG1hdGNoaW5nXG4gICAgaSA9IG1hdGNoRXhwcltcIm5lZWRzQ29udGV4dFwiXS50ZXN0KCBzZWxlY3RvciApID8gMCA6IHRva2Vucy5sZW5ndGg7XG4gICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgLy8gQWJvcnQgaWYgd2UgaGl0IGEgY29tYmluYXRvclxuICAgICAgaWYgKCBFeHByLnJlbGF0aXZlWyAodHlwZSA9IHRva2VuLnR5cGUpIF0gKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCAoZmluZCA9IEV4cHIuZmluZFsgdHlwZSBdKSApIHtcbiAgICAgICAgLy8gU2VhcmNoLCBleHBhbmRpbmcgY29udGV4dCBmb3IgbGVhZGluZyBzaWJsaW5nIGNvbWJpbmF0b3JzXG4gICAgICAgIGlmICggKHNlZWQgPSBmaW5kKFxuICAgICAgICAgIHRva2VuLm1hdGNoZXNbMF0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKSxcbiAgICAgICAgICByc2libGluZy50ZXN0KCB0b2tlbnNbMF0udHlwZSApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG4gICAgICAgICkpICkge1xuXG4gICAgICAgICAgLy8gSWYgc2VlZCBpcyBlbXB0eSBvciBubyB0b2tlbnMgcmVtYWluLCB3ZSBjYW4gcmV0dXJuIGVhcmx5XG4gICAgICAgICAgdG9rZW5zLnNwbGljZSggaSwgMSApO1xuICAgICAgICAgIHNlbGVjdG9yID0gc2VlZC5sZW5ndGggJiYgdG9TZWxlY3RvciggdG9rZW5zICk7XG4gICAgICAgICAgaWYgKCAhc2VsZWN0b3IgKSB7XG4gICAgICAgICAgICBwdXNoLmFwcGx5KCByZXN1bHRzLCBzZWVkICk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENvbXBpbGUgYW5kIGV4ZWN1dGUgYSBmaWx0ZXJpbmcgZnVuY3Rpb24gaWYgb25lIGlzIG5vdCBwcm92aWRlZFxuICAvLyBQcm92aWRlIGBtYXRjaGAgdG8gYXZvaWQgcmV0b2tlbml6YXRpb24gaWYgd2UgbW9kaWZpZWQgdGhlIHNlbGVjdG9yIGFib3ZlXG4gICggY29tcGlsZWQgfHwgY29tcGlsZSggc2VsZWN0b3IsIG1hdGNoICkgKShcbiAgICBzZWVkLFxuICAgIGNvbnRleHQsXG4gICAgIWRvY3VtZW50SXNIVE1MLFxuICAgIHJlc3VsdHMsXG4gICAgcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dFxuICApO1xuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbi8vIE9uZS10aW1lIGFzc2lnbm1lbnRzXG5cbi8vIFNvcnQgc3RhYmlsaXR5XG5zdXBwb3J0LnNvcnRTdGFibGUgPSBleHBhbmRvLnNwbGl0KFwiXCIpLnNvcnQoIHNvcnRPcmRlciApLmpvaW4oXCJcIikgPT09IGV4cGFuZG87XG5cbi8vIFN1cHBvcnQ6IENocm9tZSAxNC0zNStcbi8vIEFsd2F5cyBhc3N1bWUgZHVwbGljYXRlcyBpZiB0aGV5IGFyZW4ndCBwYXNzZWQgdG8gdGhlIGNvbXBhcmlzb24gZnVuY3Rpb25cbnN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcyA9ICEhaGFzRHVwbGljYXRlO1xuXG4vLyBJbml0aWFsaXplIGFnYWluc3QgdGhlIGRlZmF1bHQgZG9jdW1lbnRcbnNldERvY3VtZW50KCk7XG5cbi8vIFN1cHBvcnQ6IFdlYmtpdDw1MzcuMzIgLSBTYWZhcmkgNi4wLjMvQ2hyb21lIDI1IChmaXhlZCBpbiBDaHJvbWUgMjcpXG4vLyBEZXRhY2hlZCBub2RlcyBjb25mb3VuZGluZ2x5IGZvbGxvdyAqZWFjaCBvdGhlcipcbnN1cHBvcnQuc29ydERldGFjaGVkID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYxICkge1xuICAvLyBTaG91bGQgcmV0dXJuIDEsIGJ1dCByZXR1cm5zIDQgKGZvbGxvd2luZylcbiAgcmV0dXJuIGRpdjEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikgKSAmIDE7XG59KTtcblxuLy8gU3VwcG9ydDogSUU8OFxuLy8gUHJldmVudCBhdHRyaWJ1dGUvcHJvcGVydHkgXCJpbnRlcnBvbGF0aW9uXCJcbi8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNjQyOSUyOFZTLjg1JTI5LmFzcHhcbmlmICggIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuICBkaXYuaW5uZXJIVE1MID0gXCI8YSBocmVmPScjJz48L2E+XCI7XG4gIHJldHVybiBkaXYuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBcIiNcIiA7XG59KSApIHtcbiAgYWRkSGFuZGxlKCBcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuICAgIGlmICggIWlzWE1MICkge1xuICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidHlwZVwiID8gMSA6IDIgKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZGVmYXVsdFZhbHVlIGluIHBsYWNlIG9mIGdldEF0dHJpYnV0ZShcInZhbHVlXCIpXG5pZiAoICFzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuICBkaXYuaW5uZXJIVE1MID0gXCI8aW5wdXQvPlwiO1xuICBkaXYuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiwgXCJcIiApO1xuICByZXR1cm4gZGl2LmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gXCJcIjtcbn0pICkge1xuICBhZGRIYW5kbGUoIFwidmFsdWVcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuICAgIGlmICggIWlzWE1MICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICkge1xuICAgICAgcmV0dXJuIGVsZW0uZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBnZXRBdHRyaWJ1dGVOb2RlIHRvIGZldGNoIGJvb2xlYW5zIHdoZW4gZ2V0QXR0cmlidXRlIGxpZXNcbmlmICggIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuICByZXR1cm4gZGl2LmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpID09IG51bGw7XG59KSApIHtcbiAgYWRkSGFuZGxlKCBib29sZWFucywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuICAgIHZhciB2YWw7XG4gICAgaWYgKCAhaXNYTUwgKSB7XG4gICAgICByZXR1cm4gZWxlbVsgbmFtZSBdID09PSB0cnVlID8gbmFtZS50b0xvd2VyQ2FzZSgpIDpcbiAgICAgICAgICAodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkpICYmIHZhbC5zcGVjaWZpZWQgP1xuICAgICAgICAgIHZhbC52YWx1ZSA6XG4gICAgICAgIG51bGw7XG4gICAgfVxuICB9KTtcbn1cblxucmV0dXJuIFNpenpsZTtcblxufSkoIHdpbmRvdyApO1xuXG5cblxualF1ZXJ5LmZpbmQgPSBTaXp6bGU7XG5qUXVlcnkuZXhwciA9IFNpenpsZS5zZWxlY3RvcnM7XG5qUXVlcnkuZXhwcltcIjpcIl0gPSBqUXVlcnkuZXhwci5wc2V1ZG9zO1xualF1ZXJ5LnVuaXF1ZSA9IFNpenpsZS51bmlxdWVTb3J0O1xualF1ZXJ5LnRleHQgPSBTaXp6bGUuZ2V0VGV4dDtcbmpRdWVyeS5pc1hNTERvYyA9IFNpenpsZS5pc1hNTDtcbmpRdWVyeS5jb250YWlucyA9IFNpenpsZS5jb250YWlucztcblxuXG5cbnZhciBybmVlZHNDb250ZXh0ID0galF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0O1xuXG52YXIgcnNpbmdsZVRhZyA9ICgvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8pO1xuXG5cblxudmFyIHJpc1NpbXBsZSA9IC9eLlteOiNcXFtcXC4sXSokLztcblxuLy8gSW1wbGVtZW50IHRoZSBpZGVudGljYWwgZnVuY3Rpb25hbGl0eSBmb3IgZmlsdGVyIGFuZCBub3RcbmZ1bmN0aW9uIHdpbm5vdyggZWxlbWVudHMsIHF1YWxpZmllciwgbm90ICkge1xuICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBxdWFsaWZpZXIgKSApIHtcbiAgICByZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcbiAgICAgIC8qIGpzaGludCAtVzAxOCAqL1xuICAgICAgcmV0dXJuICEhcXVhbGlmaWVyLmNhbGwoIGVsZW0sIGksIGVsZW0gKSAhPT0gbm90O1xuICAgIH0pO1xuXG4gIH1cblxuICBpZiAoIHF1YWxpZmllci5ub2RlVHlwZSApIHtcbiAgICByZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiAoIGVsZW0gPT09IHF1YWxpZmllciApICE9PSBub3Q7XG4gICAgfSk7XG5cbiAgfVxuXG4gIGlmICggdHlwZW9mIHF1YWxpZmllciA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICBpZiAoIHJpc1NpbXBsZS50ZXN0KCBxdWFsaWZpZXIgKSApIHtcbiAgICAgIHJldHVybiBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzLCBub3QgKTtcbiAgICB9XG5cbiAgICBxdWFsaWZpZXIgPSBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzICk7XG4gIH1cblxuICByZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4gKCBqUXVlcnkuaW5BcnJheSggZWxlbSwgcXVhbGlmaWVyICkgPj0gMCApICE9PSBub3Q7XG4gIH0pO1xufVxuXG5qUXVlcnkuZmlsdGVyID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1zLCBub3QgKSB7XG4gIHZhciBlbGVtID0gZWxlbXNbIDAgXTtcblxuICBpZiAoIG5vdCApIHtcbiAgICBleHByID0gXCI6bm90KFwiICsgZXhwciArIFwiKVwiO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1zLmxlbmd0aCA9PT0gMSAmJiBlbGVtLm5vZGVUeXBlID09PSAxID9cbiAgICBqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGVsZW0sIGV4cHIgKSA/IFsgZWxlbSBdIDogW10gOlxuICAgIGpRdWVyeS5maW5kLm1hdGNoZXMoIGV4cHIsIGpRdWVyeS5ncmVwKCBlbGVtcywgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gZWxlbS5ub2RlVHlwZSA9PT0gMTtcbiAgICB9KSk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgZmluZDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgIHZhciBpLFxuICAgICAgcmV0ID0gW10sXG4gICAgICBzZWxmID0gdGhpcyxcbiAgICAgIGxlbiA9IHNlbGYubGVuZ3RoO1xuXG4gICAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIGpRdWVyeSggc2VsZWN0b3IgKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICAgICAgaWYgKCBqUXVlcnkuY29udGFpbnMoIHNlbGZbIGkgXSwgdGhpcyApICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSApO1xuICAgIH1cblxuICAgIGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICBqUXVlcnkuZmluZCggc2VsZWN0b3IsIHNlbGZbIGkgXSwgcmV0ICk7XG4gICAgfVxuXG4gICAgLy8gTmVlZGVkIGJlY2F1c2UgJCggc2VsZWN0b3IsIGNvbnRleHQgKSBiZWNvbWVzICQoIGNvbnRleHQgKS5maW5kKCBzZWxlY3RvciApXG4gICAgcmV0ID0gdGhpcy5wdXNoU3RhY2soIGxlbiA+IDEgPyBqUXVlcnkudW5pcXVlKCByZXQgKSA6IHJldCApO1xuICAgIHJldC5zZWxlY3RvciA9IHRoaXMuc2VsZWN0b3IgPyB0aGlzLnNlbGVjdG9yICsgXCIgXCIgKyBzZWxlY3RvciA6IHNlbGVjdG9yO1xuICAgIHJldHVybiByZXQ7XG4gIH0sXG4gIGZpbHRlcjogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KHRoaXMsIHNlbGVjdG9yIHx8IFtdLCBmYWxzZSkgKTtcbiAgfSxcbiAgbm90OiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3codGhpcywgc2VsZWN0b3IgfHwgW10sIHRydWUpICk7XG4gIH0sXG4gIGlzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuICEhd2lubm93KFxuICAgICAgdGhpcyxcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHBvc2l0aW9uYWwvcmVsYXRpdmUgc2VsZWN0b3IsIGNoZWNrIG1lbWJlcnNoaXAgaW4gdGhlIHJldHVybmVkIHNldFxuICAgICAgLy8gc28gJChcInA6Zmlyc3RcIikuaXMoXCJwOmxhc3RcIikgd29uJ3QgcmV0dXJuIHRydWUgZm9yIGEgZG9jIHdpdGggdHdvIFwicFwiLlxuICAgICAgdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICYmIHJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSA/XG4gICAgICAgIGpRdWVyeSggc2VsZWN0b3IgKSA6XG4gICAgICAgIHNlbGVjdG9yIHx8IFtdLFxuICAgICAgZmFsc2VcbiAgICApLmxlbmd0aDtcbiAgfVxufSk7XG5cblxuLy8gSW5pdGlhbGl6ZSBhIGpRdWVyeSBvYmplY3RcblxuXG4vLyBBIGNlbnRyYWwgcmVmZXJlbmNlIHRvIHRoZSByb290IGpRdWVyeShkb2N1bWVudClcbnZhciByb290alF1ZXJ5LFxuXG4gIC8vIFVzZSB0aGUgY29ycmVjdCBkb2N1bWVudCBhY2NvcmRpbmdseSB3aXRoIHdpbmRvdyBhcmd1bWVudCAoc2FuZGJveClcbiAgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQsXG5cbiAgLy8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3NcbiAgLy8gUHJpb3JpdGl6ZSAjaWQgb3ZlciA8dGFnPiB0byBhdm9pZCBYU1MgdmlhIGxvY2F0aW9uLmhhc2ggKCM5NTIxKVxuICAvLyBTdHJpY3QgSFRNTCByZWNvZ25pdGlvbiAoIzExMjkwOiBtdXN0IHN0YXJ0IHdpdGggPClcbiAgcnF1aWNrRXhwciA9IC9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKnwjKFtcXHctXSopKSQvLFxuXG4gIGluaXQgPSBqUXVlcnkuZm4uaW5pdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcbiAgICB2YXIgbWF0Y2gsIGVsZW07XG5cbiAgICAvLyBIQU5ETEU6ICQoXCJcIiksICQobnVsbCksICQodW5kZWZpbmVkKSwgJChmYWxzZSlcbiAgICBpZiAoICFzZWxlY3RvciApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBIVE1MIHN0cmluZ3NcbiAgICBpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIGlmICggc2VsZWN0b3IuY2hhckF0KDApID09PSBcIjxcIiAmJiBzZWxlY3Rvci5jaGFyQXQoIHNlbGVjdG9yLmxlbmd0aCAtIDEgKSA9PT0gXCI+XCIgJiYgc2VsZWN0b3IubGVuZ3RoID49IDMgKSB7XG4gICAgICAgIC8vIEFzc3VtZSB0aGF0IHN0cmluZ3MgdGhhdCBzdGFydCBhbmQgZW5kIHdpdGggPD4gYXJlIEhUTUwgYW5kIHNraXAgdGhlIHJlZ2V4IGNoZWNrXG4gICAgICAgIG1hdGNoID0gWyBudWxsLCBzZWxlY3RvciwgbnVsbCBdO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggaHRtbCBvciBtYWtlIHN1cmUgbm8gY29udGV4dCBpcyBzcGVjaWZpZWQgZm9yICNpZFxuICAgICAgaWYgKCBtYXRjaCAmJiAobWF0Y2hbMV0gfHwgIWNvbnRleHQpICkge1xuXG4gICAgICAgIC8vIEhBTkRMRTogJChodG1sKSAtPiAkKGFycmF5KVxuICAgICAgICBpZiAoIG1hdGNoWzFdICkge1xuICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0IGluc3RhbmNlb2YgalF1ZXJ5ID8gY29udGV4dFswXSA6IGNvbnRleHQ7XG5cbiAgICAgICAgICAvLyBzY3JpcHRzIGlzIHRydWUgZm9yIGJhY2stY29tcGF0XG4gICAgICAgICAgLy8gSW50ZW50aW9uYWxseSBsZXQgdGhlIGVycm9yIGJlIHRocm93biBpZiBwYXJzZUhUTUwgaXMgbm90IHByZXNlbnRcbiAgICAgICAgICBqUXVlcnkubWVyZ2UoIHRoaXMsIGpRdWVyeS5wYXJzZUhUTUwoXG4gICAgICAgICAgICBtYXRjaFsxXSxcbiAgICAgICAgICAgIGNvbnRleHQgJiYgY29udGV4dC5ub2RlVHlwZSA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogZG9jdW1lbnQsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKSApO1xuXG4gICAgICAgICAgLy8gSEFORExFOiAkKGh0bWwsIHByb3BzKVxuICAgICAgICAgIGlmICggcnNpbmdsZVRhZy50ZXN0KCBtYXRjaFsxXSApICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBjb250ZXh0ICkgKSB7XG4gICAgICAgICAgICBmb3IgKCBtYXRjaCBpbiBjb250ZXh0ICkge1xuICAgICAgICAgICAgICAvLyBQcm9wZXJ0aWVzIG9mIGNvbnRleHQgYXJlIGNhbGxlZCBhcyBtZXRob2RzIGlmIHBvc3NpYmxlXG4gICAgICAgICAgICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHRoaXNbIG1hdGNoIF0gKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzWyBtYXRjaCBdKCBjb250ZXh0WyBtYXRjaCBdICk7XG5cbiAgICAgICAgICAgICAgLy8gLi4uYW5kIG90aGVyd2lzZSBzZXQgYXMgYXR0cmlidXRlc1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0ciggbWF0Y2gsIGNvbnRleHRbIG1hdGNoIF0gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIC8vIEhBTkRMRTogJCgjaWQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBtYXRjaFsyXSApO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgcGFyZW50Tm9kZSB0byBjYXRjaCB3aGVuIEJsYWNrYmVycnkgNC42IHJldHVybnNcbiAgICAgICAgICAvLyBub2RlcyB0aGF0IGFyZSBubyBsb25nZXIgaW4gdGhlIGRvY3VtZW50ICM2OTYzXG4gICAgICAgICAgaWYgKCBlbGVtICYmIGVsZW0ucGFyZW50Tm9kZSApIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSBJRSBhbmQgT3BlcmEgcmV0dXJuIGl0ZW1zXG4gICAgICAgICAgICAvLyBieSBuYW1lIGluc3RlYWQgb2YgSURcbiAgICAgICAgICAgIGlmICggZWxlbS5pZCAhPT0gbWF0Y2hbMl0gKSB7XG4gICAgICAgICAgICAgIHJldHVybiByb290alF1ZXJ5LmZpbmQoIHNlbGVjdG9yICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgd2UgaW5qZWN0IHRoZSBlbGVtZW50IGRpcmVjdGx5IGludG8gdGhlIGpRdWVyeSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgICAgICAgICAgIHRoaXNbMF0gPSBlbGVtO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY29udGV4dCA9IGRvY3VtZW50O1xuICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAvLyBIQU5ETEU6ICQoZXhwciwgJCguLi4pKVxuICAgICAgfSBlbHNlIGlmICggIWNvbnRleHQgfHwgY29udGV4dC5qcXVlcnkgKSB7XG4gICAgICAgIHJldHVybiAoIGNvbnRleHQgfHwgcm9vdGpRdWVyeSApLmZpbmQoIHNlbGVjdG9yICk7XG5cbiAgICAgIC8vIEhBTkRMRTogJChleHByLCBjb250ZXh0KVxuICAgICAgLy8gKHdoaWNoIGlzIGp1c3QgZXF1aXZhbGVudCB0bzogJChjb250ZXh0KS5maW5kKGV4cHIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RvciggY29udGV4dCApLmZpbmQoIHNlbGVjdG9yICk7XG4gICAgICB9XG5cbiAgICAvLyBIQU5ETEU6ICQoRE9NRWxlbWVudClcbiAgICB9IGVsc2UgaWYgKCBzZWxlY3Rvci5ub2RlVHlwZSApIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IHRoaXNbMF0gPSBzZWxlY3RvcjtcbiAgICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgLy8gSEFORExFOiAkKGZ1bmN0aW9uKVxuICAgIC8vIFNob3J0Y3V0IGZvciBkb2N1bWVudCByZWFkeVxuICAgIH0gZWxzZSBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBzZWxlY3RvciApICkge1xuICAgICAgcmV0dXJuIHR5cGVvZiByb290alF1ZXJ5LnJlYWR5ICE9PSBcInVuZGVmaW5lZFwiID9cbiAgICAgICAgcm9vdGpRdWVyeS5yZWFkeSggc2VsZWN0b3IgKSA6XG4gICAgICAgIC8vIEV4ZWN1dGUgaW1tZWRpYXRlbHkgaWYgcmVhZHkgaXMgbm90IHByZXNlbnRcbiAgICAgICAgc2VsZWN0b3IoIGpRdWVyeSApO1xuICAgIH1cblxuICAgIGlmICggc2VsZWN0b3Iuc2VsZWN0b3IgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3Rvci5zZWxlY3RvcjtcbiAgICAgIHRoaXMuY29udGV4dCA9IHNlbGVjdG9yLmNvbnRleHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGpRdWVyeS5tYWtlQXJyYXkoIHNlbGVjdG9yLCB0aGlzICk7XG4gIH07XG5cbi8vIEdpdmUgdGhlIGluaXQgZnVuY3Rpb24gdGhlIGpRdWVyeSBwcm90b3R5cGUgZm9yIGxhdGVyIGluc3RhbnRpYXRpb25cbmluaXQucHJvdG90eXBlID0galF1ZXJ5LmZuO1xuXG4vLyBJbml0aWFsaXplIGNlbnRyYWwgcmVmZXJlbmNlXG5yb290alF1ZXJ5ID0galF1ZXJ5KCBkb2N1bWVudCApO1xuXG5cbnZhciBycGFyZW50c3ByZXYgPSAvXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxcbiAgLy8gbWV0aG9kcyBndWFyYW50ZWVkIHRvIHByb2R1Y2UgYSB1bmlxdWUgc2V0IHdoZW4gc3RhcnRpbmcgZnJvbSBhIHVuaXF1ZSBzZXRcbiAgZ3VhcmFudGVlZFVuaXF1ZSA9IHtcbiAgICBjaGlsZHJlbjogdHJ1ZSxcbiAgICBjb250ZW50czogdHJ1ZSxcbiAgICBuZXh0OiB0cnVlLFxuICAgIHByZXY6IHRydWVcbiAgfTtcblxualF1ZXJ5LmV4dGVuZCh7XG4gIGRpcjogZnVuY3Rpb24oIGVsZW0sIGRpciwgdW50aWwgKSB7XG4gICAgdmFyIG1hdGNoZWQgPSBbXSxcbiAgICAgIGN1ciA9IGVsZW1bIGRpciBdO1xuXG4gICAgd2hpbGUgKCBjdXIgJiYgY3VyLm5vZGVUeXBlICE9PSA5ICYmICh1bnRpbCA9PT0gdW5kZWZpbmVkIHx8IGN1ci5ub2RlVHlwZSAhPT0gMSB8fCAhalF1ZXJ5KCBjdXIgKS5pcyggdW50aWwgKSkgKSB7XG4gICAgICBpZiAoIGN1ci5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgbWF0Y2hlZC5wdXNoKCBjdXIgKTtcbiAgICAgIH1cbiAgICAgIGN1ciA9IGN1cltkaXJdO1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hlZDtcbiAgfSxcblxuICBzaWJsaW5nOiBmdW5jdGlvbiggbiwgZWxlbSApIHtcbiAgICB2YXIgciA9IFtdO1xuXG4gICAgZm9yICggOyBuOyBuID0gbi5uZXh0U2libGluZyApIHtcbiAgICAgIGlmICggbi5ub2RlVHlwZSA9PT0gMSAmJiBuICE9PSBlbGVtICkge1xuICAgICAgICByLnB1c2goIG4gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcjtcbiAgfVxufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBoYXM6IGZ1bmN0aW9uKCB0YXJnZXQgKSB7XG4gICAgdmFyIGksXG4gICAgICB0YXJnZXRzID0galF1ZXJ5KCB0YXJnZXQsIHRoaXMgKSxcbiAgICAgIGxlbiA9IHRhcmdldHMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgaWYgKCBqUXVlcnkuY29udGFpbnMoIHRoaXMsIHRhcmdldHNbaV0gKSApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGNsb3Nlc3Q6IGZ1bmN0aW9uKCBzZWxlY3RvcnMsIGNvbnRleHQgKSB7XG4gICAgdmFyIGN1cixcbiAgICAgIGkgPSAwLFxuICAgICAgbCA9IHRoaXMubGVuZ3RoLFxuICAgICAgbWF0Y2hlZCA9IFtdLFxuICAgICAgcG9zID0gcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvcnMgKSB8fCB0eXBlb2Ygc2VsZWN0b3JzICE9PSBcInN0cmluZ1wiID9cbiAgICAgICAgalF1ZXJ5KCBzZWxlY3RvcnMsIGNvbnRleHQgfHwgdGhpcy5jb250ZXh0ICkgOlxuICAgICAgICAwO1xuXG4gICAgZm9yICggOyBpIDwgbDsgaSsrICkge1xuICAgICAgZm9yICggY3VyID0gdGhpc1tpXTsgY3VyICYmIGN1ciAhPT0gY29udGV4dDsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XG4gICAgICAgIC8vIEFsd2F5cyBza2lwIGRvY3VtZW50IGZyYWdtZW50c1xuICAgICAgICBpZiAoIGN1ci5ub2RlVHlwZSA8IDExICYmIChwb3MgP1xuICAgICAgICAgIHBvcy5pbmRleChjdXIpID4gLTEgOlxuXG4gICAgICAgICAgLy8gRG9uJ3QgcGFzcyBub24tZWxlbWVudHMgdG8gU2l6emxlXG4gICAgICAgICAgY3VyLm5vZGVUeXBlID09PSAxICYmXG4gICAgICAgICAgICBqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoY3VyLCBzZWxlY3RvcnMpKSApIHtcblxuICAgICAgICAgIG1hdGNoZWQucHVzaCggY3VyICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQubGVuZ3RoID4gMSA/IGpRdWVyeS51bmlxdWUoIG1hdGNoZWQgKSA6IG1hdGNoZWQgKTtcbiAgfSxcblxuICAvLyBEZXRlcm1pbmUgdGhlIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgd2l0aGluXG4gIC8vIHRoZSBtYXRjaGVkIHNldCBvZiBlbGVtZW50c1xuICBpbmRleDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cbiAgICAvLyBObyBhcmd1bWVudCwgcmV0dXJuIGluZGV4IGluIHBhcmVudFxuICAgIGlmICggIWVsZW0gKSB7XG4gICAgICByZXR1cm4gKCB0aGlzWzBdICYmIHRoaXNbMF0ucGFyZW50Tm9kZSApID8gdGhpcy5maXJzdCgpLnByZXZBbGwoKS5sZW5ndGggOiAtMTtcbiAgICB9XG5cbiAgICAvLyBpbmRleCBpbiBzZWxlY3RvclxuICAgIGlmICggdHlwZW9mIGVsZW0gPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICByZXR1cm4galF1ZXJ5LmluQXJyYXkoIHRoaXNbMF0sIGpRdWVyeSggZWxlbSApICk7XG4gICAgfVxuXG4gICAgLy8gTG9jYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZGVzaXJlZCBlbGVtZW50XG4gICAgcmV0dXJuIGpRdWVyeS5pbkFycmF5KFxuICAgICAgLy8gSWYgaXQgcmVjZWl2ZXMgYSBqUXVlcnkgb2JqZWN0LCB0aGUgZmlyc3QgZWxlbWVudCBpcyB1c2VkXG4gICAgICBlbGVtLmpxdWVyeSA/IGVsZW1bMF0gOiBlbGVtLCB0aGlzICk7XG4gIH0sXG5cbiAgYWRkOiBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG4gICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKFxuICAgICAgalF1ZXJ5LnVuaXF1ZShcbiAgICAgICAgalF1ZXJ5Lm1lcmdlKCB0aGlzLmdldCgpLCBqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgKVxuICAgICAgKVxuICAgICk7XG4gIH0sXG5cbiAgYWRkQmFjazogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgIHJldHVybiB0aGlzLmFkZCggc2VsZWN0b3IgPT0gbnVsbCA/XG4gICAgICB0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKHNlbGVjdG9yKVxuICAgICk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBzaWJsaW5nKCBjdXIsIGRpciApIHtcbiAgZG8ge1xuICAgIGN1ciA9IGN1clsgZGlyIF07XG4gIH0gd2hpbGUgKCBjdXIgJiYgY3VyLm5vZGVUeXBlICE9PSAxICk7XG5cbiAgcmV0dXJuIGN1cjtcbn1cblxualF1ZXJ5LmVhY2goe1xuICBwYXJlbnQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgcmV0dXJuIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDExID8gcGFyZW50IDogbnVsbDtcbiAgfSxcbiAgcGFyZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiICk7XG4gIH0sXG4gIHBhcmVudHNVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuICAgIHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiwgdW50aWwgKTtcbiAgfSxcbiAgbmV4dDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuICB9LFxuICBwcmV2OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4gc2libGluZyggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuICB9LFxuICBuZXh0QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG4gIH0sXG4gIHByZXZBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG4gIH0sXG4gIG5leHRVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuICAgIHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIsIHVudGlsICk7XG4gIH0sXG4gIHByZXZVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuICAgIHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiLCB1bnRpbCApO1xuICB9LFxuICBzaWJsaW5nczogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5zaWJsaW5nKCAoIGVsZW0ucGFyZW50Tm9kZSB8fCB7fSApLmZpcnN0Q2hpbGQsIGVsZW0gKTtcbiAgfSxcbiAgY2hpbGRyZW46IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiBqUXVlcnkuc2libGluZyggZWxlbS5maXJzdENoaWxkICk7XG4gIH0sXG4gIGNvbnRlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImlmcmFtZVwiICkgP1xuICAgICAgZWxlbS5jb250ZW50RG9jdW1lbnQgfHwgZWxlbS5jb250ZW50V2luZG93LmRvY3VtZW50IDpcbiAgICAgIGpRdWVyeS5tZXJnZSggW10sIGVsZW0uY2hpbGROb2RlcyApO1xuICB9XG59LCBmdW5jdGlvbiggbmFtZSwgZm4gKSB7XG4gIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHVudGlsLCBzZWxlY3RvciApIHtcbiAgICB2YXIgcmV0ID0galF1ZXJ5Lm1hcCggdGhpcywgZm4sIHVudGlsICk7XG5cbiAgICBpZiAoIG5hbWUuc2xpY2UoIC01ICkgIT09IFwiVW50aWxcIiApIHtcbiAgICAgIHNlbGVjdG9yID0gdW50aWw7XG4gICAgfVxuXG4gICAgaWYgKCBzZWxlY3RvciAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICByZXQgPSBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgcmV0ICk7XG4gICAgfVxuXG4gICAgaWYgKCB0aGlzLmxlbmd0aCA+IDEgKSB7XG4gICAgICAvLyBSZW1vdmUgZHVwbGljYXRlc1xuICAgICAgaWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xuICAgICAgICByZXQgPSBqUXVlcnkudW5pcXVlKCByZXQgKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmV2ZXJzZSBvcmRlciBmb3IgcGFyZW50cyogYW5kIHByZXYtZGVyaXZhdGl2ZXNcbiAgICAgIGlmICggcnBhcmVudHNwcmV2LnRlc3QoIG5hbWUgKSApIHtcbiAgICAgICAgcmV0ID0gcmV0LnJldmVyc2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIHJldCApO1xuICB9O1xufSk7XG52YXIgcm5vdHdoaXRlID0gKC9cXFMrL2cpO1xuXG5cblxuLy8gU3RyaW5nIHRvIE9iamVjdCBvcHRpb25zIGZvcm1hdCBjYWNoZVxudmFyIG9wdGlvbnNDYWNoZSA9IHt9O1xuXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lcyBhbmQgc3RvcmUgaW4gY2FjaGVcbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSB7XG4gIHZhciBvYmplY3QgPSBvcHRpb25zQ2FjaGVbIG9wdGlvbnMgXSA9IHt9O1xuICBqUXVlcnkuZWFjaCggb3B0aW9ucy5tYXRjaCggcm5vdHdoaXRlICkgfHwgW10sIGZ1bmN0aW9uKCBfLCBmbGFnICkge1xuICAgIG9iamVjdFsgZmxhZyBdID0gdHJ1ZTtcbiAgfSk7XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qXG4gKiBDcmVhdGUgYSBjYWxsYmFjayBsaXN0IHVzaW5nIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAqXG4gKiAgb3B0aW9uczogYW4gb3B0aW9uYWwgbGlzdCBvZiBzcGFjZS1zZXBhcmF0ZWQgb3B0aW9ucyB0aGF0IHdpbGwgY2hhbmdlIGhvd1xuICogICAgICB0aGUgY2FsbGJhY2sgbGlzdCBiZWhhdmVzIG9yIGEgbW9yZSB0cmFkaXRpb25hbCBvcHRpb24gb2JqZWN0XG4gKlxuICogQnkgZGVmYXVsdCBhIGNhbGxiYWNrIGxpc3Qgd2lsbCBhY3QgbGlrZSBhbiBldmVudCBjYWxsYmFjayBsaXN0IGFuZCBjYW4gYmVcbiAqIFwiZmlyZWRcIiBtdWx0aXBsZSB0aW1lcy5cbiAqXG4gKiBQb3NzaWJsZSBvcHRpb25zOlxuICpcbiAqICBvbmNlOiAgICAgd2lsbCBlbnN1cmUgdGhlIGNhbGxiYWNrIGxpc3QgY2FuIG9ubHkgYmUgZmlyZWQgb25jZSAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqICBtZW1vcnk6ICAgICB3aWxsIGtlZXAgdHJhY2sgb2YgcHJldmlvdXMgdmFsdWVzIGFuZCB3aWxsIGNhbGwgYW55IGNhbGxiYWNrIGFkZGVkXG4gKiAgICAgICAgICBhZnRlciB0aGUgbGlzdCBoYXMgYmVlbiBmaXJlZCByaWdodCBhd2F5IHdpdGggdGhlIGxhdGVzdCBcIm1lbW9yaXplZFwiXG4gKiAgICAgICAgICB2YWx1ZXMgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKiAgdW5pcXVlOiAgICAgd2lsbCBlbnN1cmUgYSBjYWxsYmFjayBjYW4gb25seSBiZSBhZGRlZCBvbmNlIChubyBkdXBsaWNhdGUgaW4gdGhlIGxpc3QpXG4gKlxuICogIHN0b3BPbkZhbHNlOiAgaW50ZXJydXB0IGNhbGxpbmdzIHdoZW4gYSBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gKlxuICovXG5qUXVlcnkuQ2FsbGJhY2tzID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cbiAgLy8gQ29udmVydCBvcHRpb25zIGZyb20gU3RyaW5nLWZvcm1hdHRlZCB0byBPYmplY3QtZm9ybWF0dGVkIGlmIG5lZWRlZFxuICAvLyAod2UgY2hlY2sgaW4gY2FjaGUgZmlyc3QpXG4gIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIiA/XG4gICAgKCBvcHRpb25zQ2FjaGVbIG9wdGlvbnMgXSB8fCBjcmVhdGVPcHRpb25zKCBvcHRpb25zICkgKSA6XG4gICAgalF1ZXJ5LmV4dGVuZCgge30sIG9wdGlvbnMgKTtcblxuICB2YXIgLy8gRmxhZyB0byBrbm93IGlmIGxpc3QgaXMgY3VycmVudGx5IGZpcmluZ1xuICAgIGZpcmluZyxcbiAgICAvLyBMYXN0IGZpcmUgdmFsdWUgKGZvciBub24tZm9yZ2V0dGFibGUgbGlzdHMpXG4gICAgbWVtb3J5LFxuICAgIC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IHdhcyBhbHJlYWR5IGZpcmVkXG4gICAgZmlyZWQsXG4gICAgLy8gRW5kIG9mIHRoZSBsb29wIHdoZW4gZmlyaW5nXG4gICAgZmlyaW5nTGVuZ3RoLFxuICAgIC8vIEluZGV4IG9mIGN1cnJlbnRseSBmaXJpbmcgY2FsbGJhY2sgKG1vZGlmaWVkIGJ5IHJlbW92ZSBpZiBuZWVkZWQpXG4gICAgZmlyaW5nSW5kZXgsXG4gICAgLy8gRmlyc3QgY2FsbGJhY2sgdG8gZmlyZSAodXNlZCBpbnRlcm5hbGx5IGJ5IGFkZCBhbmQgZmlyZVdpdGgpXG4gICAgZmlyaW5nU3RhcnQsXG4gICAgLy8gQWN0dWFsIGNhbGxiYWNrIGxpc3RcbiAgICBsaXN0ID0gW10sXG4gICAgLy8gU3RhY2sgb2YgZmlyZSBjYWxscyBmb3IgcmVwZWF0YWJsZSBsaXN0c1xuICAgIHN0YWNrID0gIW9wdGlvbnMub25jZSAmJiBbXSxcbiAgICAvLyBGaXJlIGNhbGxiYWNrc1xuICAgIGZpcmUgPSBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgIG1lbW9yeSA9IG9wdGlvbnMubWVtb3J5ICYmIGRhdGE7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBmaXJpbmdJbmRleCA9IGZpcmluZ1N0YXJ0IHx8IDA7XG4gICAgICBmaXJpbmdTdGFydCA9IDA7XG4gICAgICBmaXJpbmdMZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgICAgIGZpcmluZyA9IHRydWU7XG4gICAgICBmb3IgKCA7IGxpc3QgJiYgZmlyaW5nSW5kZXggPCBmaXJpbmdMZW5ndGg7IGZpcmluZ0luZGV4KysgKSB7XG4gICAgICAgIGlmICggbGlzdFsgZmlyaW5nSW5kZXggXS5hcHBseSggZGF0YVsgMCBdLCBkYXRhWyAxIF0gKSA9PT0gZmFsc2UgJiYgb3B0aW9ucy5zdG9wT25GYWxzZSApIHtcbiAgICAgICAgICBtZW1vcnkgPSBmYWxzZTsgLy8gVG8gcHJldmVudCBmdXJ0aGVyIGNhbGxzIHVzaW5nIGFkZFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaXJpbmcgPSBmYWxzZTtcbiAgICAgIGlmICggbGlzdCApIHtcbiAgICAgICAgaWYgKCBzdGFjayApIHtcbiAgICAgICAgICBpZiAoIHN0YWNrLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGZpcmUoIHN0YWNrLnNoaWZ0KCkgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIG1lbW9yeSApIHtcbiAgICAgICAgICBsaXN0ID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIEFjdHVhbCBDYWxsYmFja3Mgb2JqZWN0XG4gICAgc2VsZiA9IHtcbiAgICAgIC8vIEFkZCBhIGNhbGxiYWNrIG9yIGEgY29sbGVjdGlvbiBvZiBjYWxsYmFja3MgdG8gdGhlIGxpc3RcbiAgICAgIGFkZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggbGlzdCApIHtcbiAgICAgICAgICAvLyBGaXJzdCwgd2Ugc2F2ZSB0aGUgY3VycmVudCBsZW5ndGhcbiAgICAgICAgICB2YXIgc3RhcnQgPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAoZnVuY3Rpb24gYWRkKCBhcmdzICkge1xuICAgICAgICAgICAgalF1ZXJ5LmVhY2goIGFyZ3MsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG4gICAgICAgICAgICAgIHZhciB0eXBlID0galF1ZXJ5LnR5cGUoIGFyZyApO1xuICAgICAgICAgICAgICBpZiAoIHR5cGUgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICAgICAgICAgICAgICBpZiAoICFvcHRpb25zLnVuaXF1ZSB8fCAhc2VsZi5oYXMoIGFyZyApICkge1xuICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKCBhcmcgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGFyZyAmJiBhcmcubGVuZ3RoICYmIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICAgICAgLy8gSW5zcGVjdCByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgIGFkZCggYXJnICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pKCBhcmd1bWVudHMgKTtcbiAgICAgICAgICAvLyBEbyB3ZSBuZWVkIHRvIGFkZCB0aGUgY2FsbGJhY2tzIHRvIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgZmlyaW5nIGJhdGNoP1xuICAgICAgICAgIGlmICggZmlyaW5nICkge1xuICAgICAgICAgICAgZmlyaW5nTGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgLy8gV2l0aCBtZW1vcnksIGlmIHdlJ3JlIG5vdCBmaXJpbmcgdGhlblxuICAgICAgICAgIC8vIHdlIHNob3VsZCBjYWxsIHJpZ2h0IGF3YXlcbiAgICAgICAgICB9IGVsc2UgaWYgKCBtZW1vcnkgKSB7XG4gICAgICAgICAgICBmaXJpbmdTdGFydCA9IHN0YXJ0O1xuICAgICAgICAgICAgZmlyZSggbWVtb3J5ICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIC8vIFJlbW92ZSBhIGNhbGxiYWNrIGZyb20gdGhlIGxpc3RcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggbGlzdCApIHtcbiAgICAgICAgICBqUXVlcnkuZWFjaCggYXJndW1lbnRzLCBmdW5jdGlvbiggXywgYXJnICkge1xuICAgICAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICAgICAgd2hpbGUgKCAoIGluZGV4ID0galF1ZXJ5LmluQXJyYXkoIGFyZywgbGlzdCwgaW5kZXggKSApID4gLTEgKSB7XG4gICAgICAgICAgICAgIGxpc3Quc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgICAgICAgICAvLyBIYW5kbGUgZmlyaW5nIGluZGV4ZXNcbiAgICAgICAgICAgICAgaWYgKCBmaXJpbmcgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBpbmRleCA8PSBmaXJpbmdMZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgICBmaXJpbmdMZW5ndGgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCBpbmRleCA8PSBmaXJpbmdJbmRleCApIHtcbiAgICAgICAgICAgICAgICAgIGZpcmluZ0luZGV4LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgLy8gQ2hlY2sgaWYgYSBnaXZlbiBjYWxsYmFjayBpcyBpbiB0aGUgbGlzdC5cbiAgICAgIC8vIElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCByZXR1cm4gd2hldGhlciBvciBub3QgbGlzdCBoYXMgY2FsbGJhY2tzIGF0dGFjaGVkLlxuICAgICAgaGFzOiBmdW5jdGlvbiggZm4gKSB7XG4gICAgICAgIHJldHVybiBmbiA/IGpRdWVyeS5pbkFycmF5KCBmbiwgbGlzdCApID4gLTEgOiAhISggbGlzdCAmJiBsaXN0Lmxlbmd0aCApO1xuICAgICAgfSxcbiAgICAgIC8vIFJlbW92ZSBhbGwgY2FsbGJhY2tzIGZyb20gdGhlIGxpc3RcbiAgICAgIGVtcHR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGlzdCA9IFtdO1xuICAgICAgICBmaXJpbmdMZW5ndGggPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICAvLyBIYXZlIHRoZSBsaXN0IGRvIG5vdGhpbmcgYW55bW9yZVxuICAgICAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxpc3QgPSBzdGFjayA9IG1lbW9yeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgLy8gSXMgaXQgZGlzYWJsZWQ/XG4gICAgICBkaXNhYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhbGlzdDtcbiAgICAgIH0sXG4gICAgICAvLyBMb2NrIHRoZSBsaXN0IGluIGl0cyBjdXJyZW50IHN0YXRlXG4gICAgICBsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICggIW1lbW9yeSApIHtcbiAgICAgICAgICBzZWxmLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICAvLyBJcyBpdCBsb2NrZWQ/XG4gICAgICBsb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gIXN0YWNrO1xuICAgICAgfSxcbiAgICAgIC8vIENhbGwgYWxsIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBjb250ZXh0IGFuZCBhcmd1bWVudHNcbiAgICAgIGZpcmVXaXRoOiBmdW5jdGlvbiggY29udGV4dCwgYXJncyApIHtcbiAgICAgICAgaWYgKCBsaXN0ICYmICggIWZpcmVkIHx8IHN0YWNrICkgKSB7XG4gICAgICAgICAgYXJncyA9IGFyZ3MgfHwgW107XG4gICAgICAgICAgYXJncyA9IFsgY29udGV4dCwgYXJncy5zbGljZSA/IGFyZ3Muc2xpY2UoKSA6IGFyZ3MgXTtcbiAgICAgICAgICBpZiAoIGZpcmluZyApIHtcbiAgICAgICAgICAgIHN0YWNrLnB1c2goIGFyZ3MgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmlyZSggYXJncyApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICAvLyBDYWxsIGFsbCB0aGUgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50c1xuICAgICAgZmlyZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuZmlyZVdpdGgoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICAvLyBUbyBrbm93IGlmIHRoZSBjYWxsYmFja3MgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2VcbiAgICAgIGZpcmVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhZmlyZWQ7XG4gICAgICB9XG4gICAgfTtcblxuICByZXR1cm4gc2VsZjtcbn07XG5cblxualF1ZXJ5LmV4dGVuZCh7XG5cbiAgRGVmZXJyZWQ6IGZ1bmN0aW9uKCBmdW5jICkge1xuICAgIHZhciB0dXBsZXMgPSBbXG4gICAgICAgIC8vIGFjdGlvbiwgYWRkIGxpc3RlbmVyLCBsaXN0ZW5lciBsaXN0LCBmaW5hbCBzdGF0ZVxuICAgICAgICBbIFwicmVzb2x2ZVwiLCBcImRvbmVcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBcInJlc29sdmVkXCIgXSxcbiAgICAgICAgWyBcInJlamVjdFwiLCBcImZhaWxcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBcInJlamVjdGVkXCIgXSxcbiAgICAgICAgWyBcIm5vdGlmeVwiLCBcInByb2dyZXNzXCIsIGpRdWVyeS5DYWxsYmFja3MoXCJtZW1vcnlcIikgXVxuICAgICAgXSxcbiAgICAgIHN0YXRlID0gXCJwZW5kaW5nXCIsXG4gICAgICBwcm9taXNlID0ge1xuICAgICAgICBzdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICB9LFxuICAgICAgICBhbHdheXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGRlZmVycmVkLmRvbmUoIGFyZ3VtZW50cyApLmZhaWwoIGFyZ3VtZW50cyApO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICB0aGVuOiBmdW5jdGlvbiggLyogZm5Eb25lLCBmbkZhaWwsIGZuUHJvZ3Jlc3MgKi8gKSB7XG4gICAgICAgICAgdmFyIGZucyA9IGFyZ3VtZW50cztcbiAgICAgICAgICByZXR1cm4galF1ZXJ5LkRlZmVycmVkKGZ1bmN0aW9uKCBuZXdEZWZlciApIHtcbiAgICAgICAgICAgIGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcbiAgICAgICAgICAgICAgdmFyIGZuID0galF1ZXJ5LmlzRnVuY3Rpb24oIGZuc1sgaSBdICkgJiYgZm5zWyBpIF07XG4gICAgICAgICAgICAgIC8vIGRlZmVycmVkWyBkb25lIHwgZmFpbCB8IHByb2dyZXNzIF0gZm9yIGZvcndhcmRpbmcgYWN0aW9ucyB0byBuZXdEZWZlclxuICAgICAgICAgICAgICBkZWZlcnJlZFsgdHVwbGVbMV0gXShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmV0dXJuZWQgPSBmbiAmJiBmbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgICAgICAgICAgaWYgKCByZXR1cm5lZCAmJiBqUXVlcnkuaXNGdW5jdGlvbiggcmV0dXJuZWQucHJvbWlzZSApICkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuZWQucHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKCBuZXdEZWZlci5yZXNvbHZlIClcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoIG5ld0RlZmVyLnJlamVjdCApXG4gICAgICAgICAgICAgICAgICAgIC5wcm9ncmVzcyggbmV3RGVmZXIubm90aWZ5ICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG5ld0RlZmVyWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXSggdGhpcyA9PT0gcHJvbWlzZSA/IG5ld0RlZmVyLnByb21pc2UoKSA6IHRoaXMsIGZuID8gWyByZXR1cm5lZCBdIDogYXJndW1lbnRzICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm5zID0gbnVsbDtcbiAgICAgICAgICB9KS5wcm9taXNlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIEdldCBhIHByb21pc2UgZm9yIHRoaXMgZGVmZXJyZWRcbiAgICAgICAgLy8gSWYgb2JqIGlzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSBhc3BlY3QgaXMgYWRkZWQgdG8gdGhlIG9iamVjdFxuICAgICAgICBwcm9taXNlOiBmdW5jdGlvbiggb2JqICkge1xuICAgICAgICAgIHJldHVybiBvYmogIT0gbnVsbCA/IGpRdWVyeS5leHRlbmQoIG9iaiwgcHJvbWlzZSApIDogcHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlZmVycmVkID0ge307XG5cbiAgICAvLyBLZWVwIHBpcGUgZm9yIGJhY2stY29tcGF0XG4gICAgcHJvbWlzZS5waXBlID0gcHJvbWlzZS50aGVuO1xuXG4gICAgLy8gQWRkIGxpc3Qtc3BlY2lmaWMgbWV0aG9kc1xuICAgIGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcbiAgICAgIHZhciBsaXN0ID0gdHVwbGVbIDIgXSxcbiAgICAgICAgc3RhdGVTdHJpbmcgPSB0dXBsZVsgMyBdO1xuXG4gICAgICAvLyBwcm9taXNlWyBkb25lIHwgZmFpbCB8IHByb2dyZXNzIF0gPSBsaXN0LmFkZFxuICAgICAgcHJvbWlzZVsgdHVwbGVbMV0gXSA9IGxpc3QuYWRkO1xuXG4gICAgICAvLyBIYW5kbGUgc3RhdGVcbiAgICAgIGlmICggc3RhdGVTdHJpbmcgKSB7XG4gICAgICAgIGxpc3QuYWRkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIHN0YXRlID0gWyByZXNvbHZlZCB8IHJlamVjdGVkIF1cbiAgICAgICAgICBzdGF0ZSA9IHN0YXRlU3RyaW5nO1xuXG4gICAgICAgIC8vIFsgcmVqZWN0X2xpc3QgfCByZXNvbHZlX2xpc3QgXS5kaXNhYmxlOyBwcm9ncmVzc19saXN0LmxvY2tcbiAgICAgICAgfSwgdHVwbGVzWyBpIF4gMSBdWyAyIF0uZGlzYWJsZSwgdHVwbGVzWyAyIF1bIDIgXS5sb2NrICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGRlZmVycmVkWyByZXNvbHZlIHwgcmVqZWN0IHwgbm90aWZ5IF1cbiAgICAgIGRlZmVycmVkWyB0dXBsZVswXSBdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGRlZmVycmVkWyB0dXBsZVswXSArIFwiV2l0aFwiIF0oIHRoaXMgPT09IGRlZmVycmVkID8gcHJvbWlzZSA6IHRoaXMsIGFyZ3VtZW50cyApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH07XG4gICAgICBkZWZlcnJlZFsgdHVwbGVbMF0gKyBcIldpdGhcIiBdID0gbGlzdC5maXJlV2l0aDtcbiAgICB9KTtcblxuICAgIC8vIE1ha2UgdGhlIGRlZmVycmVkIGEgcHJvbWlzZVxuICAgIHByb21pc2UucHJvbWlzZSggZGVmZXJyZWQgKTtcblxuICAgIC8vIENhbGwgZ2l2ZW4gZnVuYyBpZiBhbnlcbiAgICBpZiAoIGZ1bmMgKSB7XG4gICAgICBmdW5jLmNhbGwoIGRlZmVycmVkLCBkZWZlcnJlZCApO1xuICAgIH1cblxuICAgIC8vIEFsbCBkb25lIVxuICAgIHJldHVybiBkZWZlcnJlZDtcbiAgfSxcblxuICAvLyBEZWZlcnJlZCBoZWxwZXJcbiAgd2hlbjogZnVuY3Rpb24oIHN1Ym9yZGluYXRlIC8qICwgLi4uLCBzdWJvcmRpbmF0ZU4gKi8gKSB7XG4gICAgdmFyIGkgPSAwLFxuICAgICAgcmVzb2x2ZVZhbHVlcyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuICAgICAgbGVuZ3RoID0gcmVzb2x2ZVZhbHVlcy5sZW5ndGgsXG5cbiAgICAgIC8vIHRoZSBjb3VudCBvZiB1bmNvbXBsZXRlZCBzdWJvcmRpbmF0ZXNcbiAgICAgIHJlbWFpbmluZyA9IGxlbmd0aCAhPT0gMSB8fCAoIHN1Ym9yZGluYXRlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBzdWJvcmRpbmF0ZS5wcm9taXNlICkgKSA/IGxlbmd0aCA6IDAsXG5cbiAgICAgIC8vIHRoZSBtYXN0ZXIgRGVmZXJyZWQuIElmIHJlc29sdmVWYWx1ZXMgY29uc2lzdCBvZiBvbmx5IGEgc2luZ2xlIERlZmVycmVkLCBqdXN0IHVzZSB0aGF0LlxuICAgICAgZGVmZXJyZWQgPSByZW1haW5pbmcgPT09IDEgPyBzdWJvcmRpbmF0ZSA6IGpRdWVyeS5EZWZlcnJlZCgpLFxuXG4gICAgICAvLyBVcGRhdGUgZnVuY3Rpb24gZm9yIGJvdGggcmVzb2x2ZSBhbmQgcHJvZ3Jlc3MgdmFsdWVzXG4gICAgICB1cGRhdGVGdW5jID0gZnVuY3Rpb24oIGksIGNvbnRleHRzLCB2YWx1ZXMgKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICAgICAgY29udGV4dHNbIGkgXSA9IHRoaXM7XG4gICAgICAgICAgdmFsdWVzWyBpIF0gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApIDogdmFsdWU7XG4gICAgICAgICAgaWYgKCB2YWx1ZXMgPT09IHByb2dyZXNzVmFsdWVzICkge1xuICAgICAgICAgICAgZGVmZXJyZWQubm90aWZ5V2l0aCggY29udGV4dHMsIHZhbHVlcyApO1xuXG4gICAgICAgICAgfSBlbHNlIGlmICggISgtLXJlbWFpbmluZykgKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCggY29udGV4dHMsIHZhbHVlcyApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIHByb2dyZXNzVmFsdWVzLCBwcm9ncmVzc0NvbnRleHRzLCByZXNvbHZlQ29udGV4dHM7XG5cbiAgICAvLyBhZGQgbGlzdGVuZXJzIHRvIERlZmVycmVkIHN1Ym9yZGluYXRlczsgdHJlYXQgb3RoZXJzIGFzIHJlc29sdmVkXG4gICAgaWYgKCBsZW5ndGggPiAxICkge1xuICAgICAgcHJvZ3Jlc3NWYWx1ZXMgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xuICAgICAgcHJvZ3Jlc3NDb250ZXh0cyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG4gICAgICByZXNvbHZlQ29udGV4dHMgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xuICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGlmICggcmVzb2x2ZVZhbHVlc1sgaSBdICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXNvbHZlVmFsdWVzWyBpIF0ucHJvbWlzZSApICkge1xuICAgICAgICAgIHJlc29sdmVWYWx1ZXNbIGkgXS5wcm9taXNlKClcbiAgICAgICAgICAgIC5kb25lKCB1cGRhdGVGdW5jKCBpLCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKSApXG4gICAgICAgICAgICAuZmFpbCggZGVmZXJyZWQucmVqZWN0IClcbiAgICAgICAgICAgIC5wcm9ncmVzcyggdXBkYXRlRnVuYyggaSwgcHJvZ3Jlc3NDb250ZXh0cywgcHJvZ3Jlc3NWYWx1ZXMgKSApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC0tcmVtYWluaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgd2UncmUgbm90IHdhaXRpbmcgb24gYW55dGhpbmcsIHJlc29sdmUgdGhlIG1hc3RlclxuICAgIGlmICggIXJlbWFpbmluZyApIHtcbiAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICB9XG59KTtcblxuXG4vLyBUaGUgZGVmZXJyZWQgdXNlZCBvbiBET00gcmVhZHlcbnZhciByZWFkeUxpc3Q7XG5cbmpRdWVyeS5mbi5yZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcbiAgLy8gQWRkIHRoZSBjYWxsYmFja1xuICBqUXVlcnkucmVhZHkucHJvbWlzZSgpLmRvbmUoIGZuICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgLy8gSXMgdGhlIERPTSByZWFkeSB0byBiZSB1c2VkPyBTZXQgdG8gdHJ1ZSBvbmNlIGl0IG9jY3Vycy5cbiAgaXNSZWFkeTogZmFsc2UsXG5cbiAgLy8gQSBjb3VudGVyIHRvIHRyYWNrIGhvdyBtYW55IGl0ZW1zIHRvIHdhaXQgZm9yIGJlZm9yZVxuICAvLyB0aGUgcmVhZHkgZXZlbnQgZmlyZXMuIFNlZSAjNjc4MVxuICByZWFkeVdhaXQ6IDEsXG5cbiAgLy8gSG9sZCAob3IgcmVsZWFzZSkgdGhlIHJlYWR5IGV2ZW50XG4gIGhvbGRSZWFkeTogZnVuY3Rpb24oIGhvbGQgKSB7XG4gICAgaWYgKCBob2xkICkge1xuICAgICAgalF1ZXJ5LnJlYWR5V2FpdCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBqUXVlcnkucmVhZHkoIHRydWUgKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gSGFuZGxlIHdoZW4gdGhlIERPTSBpcyByZWFkeVxuICByZWFkeTogZnVuY3Rpb24oIHdhaXQgKSB7XG5cbiAgICAvLyBBYm9ydCBpZiB0aGVyZSBhcmUgcGVuZGluZyBob2xkcyBvciB3ZSdyZSBhbHJlYWR5IHJlYWR5XG4gICAgaWYgKCB3YWl0ID09PSB0cnVlID8gLS1qUXVlcnkucmVhZHlXYWl0IDogalF1ZXJ5LmlzUmVhZHkgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIGJvZHkgZXhpc3RzLCBhdCBsZWFzdCwgaW4gY2FzZSBJRSBnZXRzIGEgbGl0dGxlIG92ZXJ6ZWFsb3VzICh0aWNrZXQgIzU0NDMpLlxuICAgIGlmICggIWRvY3VtZW50LmJvZHkgKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dCggalF1ZXJ5LnJlYWR5ICk7XG4gICAgfVxuXG4gICAgLy8gUmVtZW1iZXIgdGhhdCB0aGUgRE9NIGlzIHJlYWR5XG4gICAgalF1ZXJ5LmlzUmVhZHkgPSB0cnVlO1xuXG4gICAgLy8gSWYgYSBub3JtYWwgRE9NIFJlYWR5IGV2ZW50IGZpcmVkLCBkZWNyZW1lbnQsIGFuZCB3YWl0IGlmIG5lZWQgYmVcbiAgICBpZiAoIHdhaXQgIT09IHRydWUgJiYgLS1qUXVlcnkucmVhZHlXYWl0ID4gMCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgZnVuY3Rpb25zIGJvdW5kLCB0byBleGVjdXRlXG4gICAgcmVhZHlMaXN0LnJlc29sdmVXaXRoKCBkb2N1bWVudCwgWyBqUXVlcnkgXSApO1xuXG4gICAgLy8gVHJpZ2dlciBhbnkgYm91bmQgcmVhZHkgZXZlbnRzXG4gICAgaWYgKCBqUXVlcnkuZm4udHJpZ2dlckhhbmRsZXIgKSB7XG4gICAgICBqUXVlcnkoIGRvY3VtZW50ICkudHJpZ2dlckhhbmRsZXIoIFwicmVhZHlcIiApO1xuICAgICAgalF1ZXJ5KCBkb2N1bWVudCApLm9mZiggXCJyZWFkeVwiICk7XG4gICAgfVxuICB9XG59KTtcblxuLyoqXG4gKiBDbGVhbi11cCBtZXRob2QgZm9yIGRvbSByZWFkeSBldmVudHNcbiAqL1xuZnVuY3Rpb24gZGV0YWNoKCkge1xuICBpZiAoIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCwgZmFsc2UgKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCwgZmFsc2UgKTtcblxuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmRldGFjaEV2ZW50KCBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLCBjb21wbGV0ZWQgKTtcbiAgICB3aW5kb3cuZGV0YWNoRXZlbnQoIFwib25sb2FkXCIsIGNvbXBsZXRlZCApO1xuICB9XG59XG5cbi8qKlxuICogVGhlIHJlYWR5IGV2ZW50IGhhbmRsZXIgYW5kIHNlbGYgY2xlYW51cCBtZXRob2RcbiAqL1xuZnVuY3Rpb24gY29tcGxldGVkKCkge1xuICAvLyByZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgaXMgZ29vZCBlbm91Z2ggZm9yIHVzIHRvIGNhbGwgdGhlIGRvbSByZWFkeSBpbiBvbGRJRVxuICBpZiAoIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgfHwgZXZlbnQudHlwZSA9PT0gXCJsb2FkXCIgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiICkge1xuICAgIGRldGFjaCgpO1xuICAgIGpRdWVyeS5yZWFkeSgpO1xuICB9XG59XG5cbmpRdWVyeS5yZWFkeS5wcm9taXNlID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgaWYgKCAhcmVhZHlMaXN0ICkge1xuXG4gICAgcmVhZHlMaXN0ID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAvLyBDYXRjaCBjYXNlcyB3aGVyZSAkKGRvY3VtZW50KS5yZWFkeSgpIGlzIGNhbGxlZCBhZnRlciB0aGUgYnJvd3NlciBldmVudCBoYXMgYWxyZWFkeSBvY2N1cnJlZC5cbiAgICAvLyB3ZSBvbmNlIHRyaWVkIHRvIHVzZSByZWFkeVN0YXRlIFwiaW50ZXJhY3RpdmVcIiBoZXJlLCBidXQgaXQgY2F1c2VkIGlzc3VlcyBsaWtlIHRoZSBvbmVcbiAgICAvLyBkaXNjb3ZlcmVkIGJ5IENocmlzUyBoZXJlOiBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjI4MiNjb21tZW50OjE1XG4gICAgaWYgKCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgKSB7XG4gICAgICAvLyBIYW5kbGUgaXQgYXN5bmNocm9ub3VzbHkgdG8gYWxsb3cgc2NyaXB0cyB0aGUgb3Bwb3J0dW5pdHkgdG8gZGVsYXkgcmVhZHlcbiAgICAgIHNldFRpbWVvdXQoIGpRdWVyeS5yZWFkeSApO1xuXG4gICAgLy8gU3RhbmRhcmRzLWJhc2VkIGJyb3dzZXJzIHN1cHBvcnQgRE9NQ29udGVudExvYWRlZFxuICAgIH0gZWxzZSBpZiAoIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG4gICAgICAvLyBVc2UgdGhlIGhhbmR5IGV2ZW50IGNhbGxiYWNrXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xuXG4gICAgICAvLyBBIGZhbGxiYWNrIHRvIHdpbmRvdy5vbmxvYWQsIHRoYXQgd2lsbCBhbHdheXMgd29ya1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBjb21wbGV0ZWQsIGZhbHNlICk7XG5cbiAgICAvLyBJZiBJRSBldmVudCBtb2RlbCBpcyB1c2VkXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVuc3VyZSBmaXJpbmcgYmVmb3JlIG9ubG9hZCwgbWF5YmUgbGF0ZSBidXQgc2FmZSBhbHNvIGZvciBpZnJhbWVzXG4gICAgICBkb2N1bWVudC5hdHRhY2hFdmVudCggXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiwgY29tcGxldGVkICk7XG5cbiAgICAgIC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXG4gICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoIFwib25sb2FkXCIsIGNvbXBsZXRlZCApO1xuXG4gICAgICAvLyBJZiBJRSBhbmQgbm90IGEgZnJhbWVcbiAgICAgIC8vIGNvbnRpbnVhbGx5IGNoZWNrIHRvIHNlZSBpZiB0aGUgZG9jdW1lbnQgaXMgcmVhZHlcbiAgICAgIHZhciB0b3AgPSBmYWxzZTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdG9wID0gd2luZG93LmZyYW1lRWxlbWVudCA9PSBudWxsICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIH0gY2F0Y2goZSkge31cblxuICAgICAgaWYgKCB0b3AgJiYgdG9wLmRvU2Nyb2xsICkge1xuICAgICAgICAoZnVuY3Rpb24gZG9TY3JvbGxDaGVjaygpIHtcbiAgICAgICAgICBpZiAoICFqUXVlcnkuaXNSZWFkeSApIHtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgLy8gVXNlIHRoZSB0cmljayBieSBEaWVnbyBQZXJpbmlcbiAgICAgICAgICAgICAgLy8gaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0lFQ29udGVudExvYWRlZC9cbiAgICAgICAgICAgICAgdG9wLmRvU2Nyb2xsKFwibGVmdFwiKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCggZG9TY3JvbGxDaGVjaywgNTAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGV0YWNoIGFsbCBkb20gcmVhZHkgZXZlbnRzXG4gICAgICAgICAgICBkZXRhY2goKTtcblxuICAgICAgICAgICAgLy8gYW5kIGV4ZWN1dGUgYW55IHdhaXRpbmcgZnVuY3Rpb25zXG4gICAgICAgICAgICBqUXVlcnkucmVhZHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZWFkeUxpc3QucHJvbWlzZSggb2JqICk7XG59O1xuXG5cbnZhciBzdHJ1bmRlZmluZWQgPSB0eXBlb2YgdW5kZWZpbmVkO1xuXG5cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gSXRlcmF0aW9uIG92ZXIgb2JqZWN0J3MgaW5oZXJpdGVkIHByb3BlcnRpZXMgYmVmb3JlIGl0cyBvd25cbnZhciBpO1xuZm9yICggaSBpbiBqUXVlcnkoIHN1cHBvcnQgKSApIHtcbiAgYnJlYWs7XG59XG5zdXBwb3J0Lm93bkxhc3QgPSBpICE9PSBcIjBcIjtcblxuLy8gTm90ZTogbW9zdCBzdXBwb3J0IHRlc3RzIGFyZSBkZWZpbmVkIGluIHRoZWlyIHJlc3BlY3RpdmUgbW9kdWxlcy5cbi8vIGZhbHNlIHVudGlsIHRoZSB0ZXN0IGlzIHJ1blxuc3VwcG9ydC5pbmxpbmVCbG9ja05lZWRzTGF5b3V0ID0gZmFsc2U7XG5cbi8vIEV4ZWN1dGUgQVNBUCBpbiBjYXNlIHdlIG5lZWQgdG8gc2V0IGJvZHkuc3R5bGUuem9vbVxualF1ZXJ5KGZ1bmN0aW9uKCkge1xuICAvLyBNaW5pZmllZDogdmFyIGEsYixjLGRcbiAgdmFyIHZhbCwgZGl2LCBib2R5LCBjb250YWluZXI7XG5cbiAgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImJvZHlcIiApWyAwIF07XG4gIGlmICggIWJvZHkgfHwgIWJvZHkuc3R5bGUgKSB7XG4gICAgLy8gUmV0dXJuIGZvciBmcmFtZXNldCBkb2NzIHRoYXQgZG9uJ3QgaGF2ZSBhIGJvZHlcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBTZXR1cFxuICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG4gIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcbiAgY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcInBvc2l0aW9uOmFic29sdXRlO2JvcmRlcjowO3dpZHRoOjA7aGVpZ2h0OjA7dG9wOjA7bGVmdDotOTk5OXB4XCI7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuICBpZiAoIHR5cGVvZiBkaXYuc3R5bGUuem9vbSAhPT0gc3RydW5kZWZpbmVkICkge1xuICAgIC8vIFN1cHBvcnQ6IElFPDhcbiAgICAvLyBDaGVjayBpZiBuYXRpdmVseSBibG9jay1sZXZlbCBlbGVtZW50cyBhY3QgbGlrZSBpbmxpbmUtYmxvY2tcbiAgICAvLyBlbGVtZW50cyB3aGVuIHNldHRpbmcgdGhlaXIgZGlzcGxheSB0byAnaW5saW5lJyBhbmQgZ2l2aW5nXG4gICAgLy8gdGhlbSBsYXlvdXRcbiAgICBkaXYuc3R5bGUuY3NzVGV4dCA9IFwiZGlzcGxheTppbmxpbmU7bWFyZ2luOjA7Ym9yZGVyOjA7cGFkZGluZzoxcHg7d2lkdGg6MXB4O3pvb206MVwiO1xuXG4gICAgc3VwcG9ydC5pbmxpbmVCbG9ja05lZWRzTGF5b3V0ID0gdmFsID0gZGl2Lm9mZnNldFdpZHRoID09PSAzO1xuICAgIGlmICggdmFsICkge1xuICAgICAgLy8gUHJldmVudCBJRSA2IGZyb20gYWZmZWN0aW5nIGxheW91dCBmb3IgcG9zaXRpb25lZCBlbGVtZW50cyAjMTEwNDhcbiAgICAgIC8vIFByZXZlbnQgSUUgZnJvbSBzaHJpbmtpbmcgdGhlIGJvZHkgaW4gSUUgNyBtb2RlICMxMjg2OVxuICAgICAgLy8gU3VwcG9ydDogSUU8OFxuICAgICAgYm9keS5zdHlsZS56b29tID0gMTtcbiAgICB9XG4gIH1cblxuICBib2R5LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcbn0pO1xuXG5cblxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG5cbiAgLy8gRXhlY3V0ZSB0aGUgdGVzdCBvbmx5IGlmIG5vdCBhbHJlYWR5IGV4ZWN1dGVkIGluIGFub3RoZXIgbW9kdWxlLlxuICBpZiAoc3VwcG9ydC5kZWxldGVFeHBhbmRvID09IG51bGwpIHtcbiAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgc3VwcG9ydC5kZWxldGVFeHBhbmRvID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIGRpdi50ZXN0O1xuICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBOdWxsIGVsZW1lbnRzIHRvIGF2b2lkIGxlYWtzIGluIElFLlxuICBkaXYgPSBudWxsO1xufSkoKTtcblxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhbiBvYmplY3QgY2FuIGhhdmUgZGF0YVxuICovXG5qUXVlcnkuYWNjZXB0RGF0YSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgbm9EYXRhID0galF1ZXJ5Lm5vRGF0YVsgKGVsZW0ubm9kZU5hbWUgKyBcIiBcIikudG9Mb3dlckNhc2UoKSBdLFxuICAgIG5vZGVUeXBlID0gK2VsZW0ubm9kZVR5cGUgfHwgMTtcblxuICAvLyBEbyBub3Qgc2V0IGRhdGEgb24gbm9uLWVsZW1lbnQgRE9NIG5vZGVzIGJlY2F1c2UgaXQgd2lsbCBub3QgYmUgY2xlYXJlZCAoIzgzMzUpLlxuICByZXR1cm4gbm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgP1xuICAgIGZhbHNlIDpcblxuICAgIC8vIE5vZGVzIGFjY2VwdCBkYXRhIHVubGVzcyBvdGhlcndpc2Ugc3BlY2lmaWVkOyByZWplY3Rpb24gY2FuIGJlIGNvbmRpdGlvbmFsXG4gICAgIW5vRGF0YSB8fCBub0RhdGEgIT09IHRydWUgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc2lkXCIpID09PSBub0RhdGE7XG59O1xuXG5cbnZhciByYnJhY2UgPSAvXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sXG4gIHJtdWx0aURhc2ggPSAvKFtBLVpdKS9nO1xuXG5mdW5jdGlvbiBkYXRhQXR0ciggZWxlbSwga2V5LCBkYXRhICkge1xuICAvLyBJZiBub3RoaW5nIHdhcyBmb3VuZCBpbnRlcm5hbGx5LCB0cnkgdG8gZmV0Y2ggYW55XG4gIC8vIGRhdGEgZnJvbSB0aGUgSFRNTDUgZGF0YS0qIGF0dHJpYnV0ZVxuICBpZiAoIGRhdGEgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXG4gICAgdmFyIG5hbWUgPSBcImRhdGEtXCIgKyBrZXkucmVwbGFjZSggcm11bHRpRGFzaCwgXCItJDFcIiApLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBkYXRhID0gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKTtcblxuICAgIGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gZGF0YSA9PT0gXCJ0cnVlXCIgPyB0cnVlIDpcbiAgICAgICAgICBkYXRhID09PSBcImZhbHNlXCIgPyBmYWxzZSA6XG4gICAgICAgICAgZGF0YSA9PT0gXCJudWxsXCIgPyBudWxsIDpcbiAgICAgICAgICAvLyBPbmx5IGNvbnZlcnQgdG8gYSBudW1iZXIgaWYgaXQgZG9lc24ndCBjaGFuZ2UgdGhlIHN0cmluZ1xuICAgICAgICAgICtkYXRhICsgXCJcIiA9PT0gZGF0YSA/ICtkYXRhIDpcbiAgICAgICAgICByYnJhY2UudGVzdCggZGF0YSApID8galF1ZXJ5LnBhcnNlSlNPTiggZGF0YSApIDpcbiAgICAgICAgICBkYXRhO1xuICAgICAgfSBjYXRjaCggZSApIHt9XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGRhdGEgc28gaXQgaXNuJ3QgY2hhbmdlZCBsYXRlclxuICAgICAgalF1ZXJ5LmRhdGEoIGVsZW0sIGtleSwgZGF0YSApO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8vIGNoZWNrcyBhIGNhY2hlIG9iamVjdCBmb3IgZW1wdGluZXNzXG5mdW5jdGlvbiBpc0VtcHR5RGF0YU9iamVjdCggb2JqICkge1xuICB2YXIgbmFtZTtcbiAgZm9yICggbmFtZSBpbiBvYmogKSB7XG5cbiAgICAvLyBpZiB0aGUgcHVibGljIGRhdGEgb2JqZWN0IGlzIGVtcHR5LCB0aGUgcHJpdmF0ZSBpcyBzdGlsbCBlbXB0eVxuICAgIGlmICggbmFtZSA9PT0gXCJkYXRhXCIgJiYgalF1ZXJ5LmlzRW1wdHlPYmplY3QoIG9ialtuYW1lXSApICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICggbmFtZSAhPT0gXCJ0b0pTT05cIiApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxEYXRhKCBlbGVtLCBuYW1lLCBkYXRhLCBwdnQgLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG4gIGlmICggIWpRdWVyeS5hY2NlcHREYXRhKCBlbGVtICkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHJldCwgdGhpc0NhY2hlLFxuICAgIGludGVybmFsS2V5ID0galF1ZXJ5LmV4cGFuZG8sXG5cbiAgICAvLyBXZSBoYXZlIHRvIGhhbmRsZSBET00gbm9kZXMgYW5kIEpTIG9iamVjdHMgZGlmZmVyZW50bHkgYmVjYXVzZSBJRTYtN1xuICAgIC8vIGNhbid0IEdDIG9iamVjdCByZWZlcmVuY2VzIHByb3Blcmx5IGFjcm9zcyB0aGUgRE9NLUpTIGJvdW5kYXJ5XG4gICAgaXNOb2RlID0gZWxlbS5ub2RlVHlwZSxcblxuICAgIC8vIE9ubHkgRE9NIG5vZGVzIG5lZWQgdGhlIGdsb2JhbCBqUXVlcnkgY2FjaGU7IEpTIG9iamVjdCBkYXRhIGlzXG4gICAgLy8gYXR0YWNoZWQgZGlyZWN0bHkgdG8gdGhlIG9iamVjdCBzbyBHQyBjYW4gb2NjdXIgYXV0b21hdGljYWxseVxuICAgIGNhY2hlID0gaXNOb2RlID8galF1ZXJ5LmNhY2hlIDogZWxlbSxcblxuICAgIC8vIE9ubHkgZGVmaW5pbmcgYW4gSUQgZm9yIEpTIG9iamVjdHMgaWYgaXRzIGNhY2hlIGFscmVhZHkgZXhpc3RzIGFsbG93c1xuICAgIC8vIHRoZSBjb2RlIHRvIHNob3J0Y3V0IG9uIHRoZSBzYW1lIHBhdGggYXMgYSBET00gbm9kZSB3aXRoIG5vIGNhY2hlXG4gICAgaWQgPSBpc05vZGUgPyBlbGVtWyBpbnRlcm5hbEtleSBdIDogZWxlbVsgaW50ZXJuYWxLZXkgXSAmJiBpbnRlcm5hbEtleTtcblxuICAvLyBBdm9pZCBkb2luZyBhbnkgbW9yZSB3b3JrIHRoYW4gd2UgbmVlZCB0byB3aGVuIHRyeWluZyB0byBnZXQgZGF0YSBvbiBhblxuICAvLyBvYmplY3QgdGhhdCBoYXMgbm8gZGF0YSBhdCBhbGxcbiAgaWYgKCAoIWlkIHx8ICFjYWNoZVtpZF0gfHwgKCFwdnQgJiYgIWNhY2hlW2lkXS5kYXRhKSkgJiYgZGF0YSA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICggIWlkICkge1xuICAgIC8vIE9ubHkgRE9NIG5vZGVzIG5lZWQgYSBuZXcgdW5pcXVlIElEIGZvciBlYWNoIGVsZW1lbnQgc2luY2UgdGhlaXIgZGF0YVxuICAgIC8vIGVuZHMgdXAgaW4gdGhlIGdsb2JhbCBjYWNoZVxuICAgIGlmICggaXNOb2RlICkge1xuICAgICAgaWQgPSBlbGVtWyBpbnRlcm5hbEtleSBdID0gZGVsZXRlZElkcy5wb3AoKSB8fCBqUXVlcnkuZ3VpZCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCA9IGludGVybmFsS2V5O1xuICAgIH1cbiAgfVxuXG4gIGlmICggIWNhY2hlWyBpZCBdICkge1xuICAgIC8vIEF2b2lkIGV4cG9zaW5nIGpRdWVyeSBtZXRhZGF0YSBvbiBwbGFpbiBKUyBvYmplY3RzIHdoZW4gdGhlIG9iamVjdFxuICAgIC8vIGlzIHNlcmlhbGl6ZWQgdXNpbmcgSlNPTi5zdHJpbmdpZnlcbiAgICBjYWNoZVsgaWQgXSA9IGlzTm9kZSA/IHt9IDogeyB0b0pTT046IGpRdWVyeS5ub29wIH07XG4gIH1cblxuICAvLyBBbiBvYmplY3QgY2FuIGJlIHBhc3NlZCB0byBqUXVlcnkuZGF0YSBpbnN0ZWFkIG9mIGEga2V5L3ZhbHVlIHBhaXI7IHRoaXMgZ2V0c1xuICAvLyBzaGFsbG93IGNvcGllZCBvdmVyIG9udG8gdGhlIGV4aXN0aW5nIGNhY2hlXG4gIGlmICggdHlwZW9mIG5hbWUgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG5hbWUgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICBpZiAoIHB2dCApIHtcbiAgICAgIGNhY2hlWyBpZCBdID0galF1ZXJ5LmV4dGVuZCggY2FjaGVbIGlkIF0sIG5hbWUgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVbIGlkIF0uZGF0YSA9IGpRdWVyeS5leHRlbmQoIGNhY2hlWyBpZCBdLmRhdGEsIG5hbWUgKTtcbiAgICB9XG4gIH1cblxuICB0aGlzQ2FjaGUgPSBjYWNoZVsgaWQgXTtcblxuICAvLyBqUXVlcnkgZGF0YSgpIGlzIHN0b3JlZCBpbiBhIHNlcGFyYXRlIG9iamVjdCBpbnNpZGUgdGhlIG9iamVjdCdzIGludGVybmFsIGRhdGFcbiAgLy8gY2FjaGUgaW4gb3JkZXIgdG8gYXZvaWQga2V5IGNvbGxpc2lvbnMgYmV0d2VlbiBpbnRlcm5hbCBkYXRhIGFuZCB1c2VyLWRlZmluZWRcbiAgLy8gZGF0YS5cbiAgaWYgKCAhcHZ0ICkge1xuICAgIGlmICggIXRoaXNDYWNoZS5kYXRhICkge1xuICAgICAgdGhpc0NhY2hlLmRhdGEgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzQ2FjaGUgPSB0aGlzQ2FjaGUuZGF0YTtcbiAgfVxuXG4gIGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuICAgIHRoaXNDYWNoZVsgalF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApIF0gPSBkYXRhO1xuICB9XG5cbiAgLy8gQ2hlY2sgZm9yIGJvdGggY29udmVydGVkLXRvLWNhbWVsIGFuZCBub24tY29udmVydGVkIGRhdGEgcHJvcGVydHkgbmFtZXNcbiAgLy8gSWYgYSBkYXRhIHByb3BlcnR5IHdhcyBzcGVjaWZpZWRcbiAgaWYgKCB0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIiApIHtcblxuICAgIC8vIEZpcnN0IFRyeSB0byBmaW5kIGFzLWlzIHByb3BlcnR5IGRhdGFcbiAgICByZXQgPSB0aGlzQ2FjaGVbIG5hbWUgXTtcblxuICAgIC8vIFRlc3QgZm9yIG51bGx8dW5kZWZpbmVkIHByb3BlcnR5IGRhdGFcbiAgICBpZiAoIHJldCA9PSBudWxsICkge1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCB0aGUgY2FtZWxDYXNlZCBwcm9wZXJ0eVxuICAgICAgcmV0ID0gdGhpc0NhY2hlWyBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICkgXTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0ID0gdGhpc0NhY2hlO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxSZW1vdmVEYXRhKCBlbGVtLCBuYW1lLCBwdnQgKSB7XG4gIGlmICggIWpRdWVyeS5hY2NlcHREYXRhKCBlbGVtICkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRoaXNDYWNoZSwgaSxcbiAgICBpc05vZGUgPSBlbGVtLm5vZGVUeXBlLFxuXG4gICAgLy8gU2VlIGpRdWVyeS5kYXRhIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgY2FjaGUgPSBpc05vZGUgPyBqUXVlcnkuY2FjaGUgOiBlbGVtLFxuICAgIGlkID0gaXNOb2RlID8gZWxlbVsgalF1ZXJ5LmV4cGFuZG8gXSA6IGpRdWVyeS5leHBhbmRvO1xuXG4gIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgbm8gY2FjaGUgZW50cnkgZm9yIHRoaXMgb2JqZWN0LCB0aGVyZSBpcyBub1xuICAvLyBwdXJwb3NlIGluIGNvbnRpbnVpbmdcbiAgaWYgKCAhY2FjaGVbIGlkIF0gKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCBuYW1lICkge1xuXG4gICAgdGhpc0NhY2hlID0gcHZ0ID8gY2FjaGVbIGlkIF0gOiBjYWNoZVsgaWQgXS5kYXRhO1xuXG4gICAgaWYgKCB0aGlzQ2FjaGUgKSB7XG5cbiAgICAgIC8vIFN1cHBvcnQgYXJyYXkgb3Igc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBuYW1lcyBmb3IgZGF0YSBrZXlzXG4gICAgICBpZiAoICFqUXVlcnkuaXNBcnJheSggbmFtZSApICkge1xuXG4gICAgICAgIC8vIHRyeSB0aGUgc3RyaW5nIGFzIGEga2V5IGJlZm9yZSBhbnkgbWFuaXB1bGF0aW9uXG4gICAgICAgIGlmICggbmFtZSBpbiB0aGlzQ2FjaGUgKSB7XG4gICAgICAgICAgbmFtZSA9IFsgbmFtZSBdO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgLy8gc3BsaXQgdGhlIGNhbWVsIGNhc2VkIHZlcnNpb24gYnkgc3BhY2VzIHVubGVzcyBhIGtleSB3aXRoIHRoZSBzcGFjZXMgZXhpc3RzXG4gICAgICAgICAgbmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKTtcbiAgICAgICAgICBpZiAoIG5hbWUgaW4gdGhpc0NhY2hlICkge1xuICAgICAgICAgICAgbmFtZSA9IFsgbmFtZSBdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiBcIm5hbWVcIiBpcyBhbiBhcnJheSBvZiBrZXlzLi4uXG4gICAgICAgIC8vIFdoZW4gZGF0YSBpcyBpbml0aWFsbHkgY3JlYXRlZCwgdmlhIChcImtleVwiLCBcInZhbFwiKSBzaWduYXR1cmUsXG4gICAgICAgIC8vIGtleXMgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gY2FtZWxDYXNlLlxuICAgICAgICAvLyBTaW5jZSB0aGVyZSBpcyBubyB3YXkgdG8gdGVsbCBfaG93XyBhIGtleSB3YXMgYWRkZWQsIHJlbW92ZVxuICAgICAgICAvLyBib3RoIHBsYWluIGtleSBhbmQgY2FtZWxDYXNlIGtleS4gIzEyNzg2XG4gICAgICAgIC8vIFRoaXMgd2lsbCBvbmx5IHBlbmFsaXplIHRoZSBhcnJheSBhcmd1bWVudCBwYXRoLlxuICAgICAgICBuYW1lID0gbmFtZS5jb25jYXQoIGpRdWVyeS5tYXAoIG5hbWUsIGpRdWVyeS5jYW1lbENhc2UgKSApO1xuICAgICAgfVxuXG4gICAgICBpID0gbmFtZS5sZW5ndGg7XG4gICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgZGVsZXRlIHRoaXNDYWNoZVsgbmFtZVtpXSBdO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBubyBkYXRhIGxlZnQgaW4gdGhlIGNhY2hlLCB3ZSB3YW50IHRvIGNvbnRpbnVlXG4gICAgICAvLyBhbmQgbGV0IHRoZSBjYWNoZSBvYmplY3QgaXRzZWxmIGdldCBkZXN0cm95ZWRcbiAgICAgIGlmICggcHZ0ID8gIWlzRW1wdHlEYXRhT2JqZWN0KHRoaXNDYWNoZSkgOiAhalF1ZXJ5LmlzRW1wdHlPYmplY3QodGhpc0NhY2hlKSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFNlZSBqUXVlcnkuZGF0YSBmb3IgbW9yZSBpbmZvcm1hdGlvblxuICBpZiAoICFwdnQgKSB7XG4gICAgZGVsZXRlIGNhY2hlWyBpZCBdLmRhdGE7XG5cbiAgICAvLyBEb24ndCBkZXN0cm95IHRoZSBwYXJlbnQgY2FjaGUgdW5sZXNzIHRoZSBpbnRlcm5hbCBkYXRhIG9iamVjdFxuICAgIC8vIGhhZCBiZWVuIHRoZSBvbmx5IHRoaW5nIGxlZnQgaW4gaXRcbiAgICBpZiAoICFpc0VtcHR5RGF0YU9iamVjdCggY2FjaGVbIGlkIF0gKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvLyBEZXN0cm95IHRoZSBjYWNoZVxuICBpZiAoIGlzTm9kZSApIHtcbiAgICBqUXVlcnkuY2xlYW5EYXRhKCBbIGVsZW0gXSwgdHJ1ZSApO1xuXG4gIC8vIFVzZSBkZWxldGUgd2hlbiBzdXBwb3J0ZWQgZm9yIGV4cGFuZG9zIG9yIGBjYWNoZWAgaXMgbm90IGEgd2luZG93IHBlciBpc1dpbmRvdyAoIzEwMDgwKVxuICAvKiBqc2hpbnQgZXFlcWVxOiBmYWxzZSAqL1xuICB9IGVsc2UgaWYgKCBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gfHwgY2FjaGUgIT0gY2FjaGUud2luZG93ICkge1xuICAgIC8qIGpzaGludCBlcWVxZXE6IHRydWUgKi9cbiAgICBkZWxldGUgY2FjaGVbIGlkIF07XG5cbiAgLy8gV2hlbiBhbGwgZWxzZSBmYWlscywgbnVsbFxuICB9IGVsc2Uge1xuICAgIGNhY2hlWyBpZCBdID0gbnVsbDtcbiAgfVxufVxuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgY2FjaGU6IHt9LFxuXG4gIC8vIFRoZSBmb2xsb3dpbmcgZWxlbWVudHMgKHNwYWNlLXN1ZmZpeGVkIHRvIGF2b2lkIE9iamVjdC5wcm90b3R5cGUgY29sbGlzaW9ucylcbiAgLy8gdGhyb3cgdW5jYXRjaGFibGUgZXhjZXB0aW9ucyBpZiB5b3UgYXR0ZW1wdCB0byBzZXQgZXhwYW5kbyBwcm9wZXJ0aWVzXG4gIG5vRGF0YToge1xuICAgIFwiYXBwbGV0IFwiOiB0cnVlLFxuICAgIFwiZW1iZWQgXCI6IHRydWUsXG4gICAgLy8gLi4uYnV0IEZsYXNoIG9iamVjdHMgKHdoaWNoIGhhdmUgdGhpcyBjbGFzc2lkKSAqY2FuKiBoYW5kbGUgZXhwYW5kb3NcbiAgICBcIm9iamVjdCBcIjogXCJjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDBcIlxuICB9LFxuXG4gIGhhc0RhdGE6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIGVsZW0gPSBlbGVtLm5vZGVUeXBlID8galF1ZXJ5LmNhY2hlWyBlbGVtW2pRdWVyeS5leHBhbmRvXSBdIDogZWxlbVsgalF1ZXJ5LmV4cGFuZG8gXTtcbiAgICByZXR1cm4gISFlbGVtICYmICFpc0VtcHR5RGF0YU9iamVjdCggZWxlbSApO1xuICB9LFxuXG4gIGRhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xuICAgIHJldHVybiBpbnRlcm5hbERhdGEoIGVsZW0sIG5hbWUsIGRhdGEgKTtcbiAgfSxcblxuICByZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcbiAgICByZXR1cm4gaW50ZXJuYWxSZW1vdmVEYXRhKCBlbGVtLCBuYW1lICk7XG4gIH0sXG5cbiAgLy8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICBfZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG4gICAgcmV0dXJuIGludGVybmFsRGF0YSggZWxlbSwgbmFtZSwgZGF0YSwgdHJ1ZSApO1xuICB9LFxuXG4gIF9yZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcbiAgICByZXR1cm4gaW50ZXJuYWxSZW1vdmVEYXRhKCBlbGVtLCBuYW1lLCB0cnVlICk7XG4gIH1cbn0pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgZGF0YTogZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG4gICAgdmFyIGksIG5hbWUsIGRhdGEsXG4gICAgICBlbGVtID0gdGhpc1swXSxcbiAgICAgIGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XG5cbiAgICAvLyBTcGVjaWFsIGV4cGVjdGlvbnMgb2YgLmRhdGEgYmFzaWNhbGx5IHRod2FydCBqUXVlcnkuYWNjZXNzLFxuICAgIC8vIHNvIGltcGxlbWVudCB0aGUgcmVsZXZhbnQgYmVoYXZpb3Igb3Vyc2VsdmVzXG5cbiAgICAvLyBHZXRzIGFsbCB2YWx1ZXNcbiAgICBpZiAoIGtleSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgaWYgKCB0aGlzLmxlbmd0aCApIHtcbiAgICAgICAgZGF0YSA9IGpRdWVyeS5kYXRhKCBlbGVtICk7XG5cbiAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICFqUXVlcnkuX2RhdGEoIGVsZW0sIFwicGFyc2VkQXR0cnNcIiApICkge1xuICAgICAgICAgIGkgPSBhdHRycy5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG5cbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFMTErXG4gICAgICAgICAgICAvLyBUaGUgYXR0cnMgZWxlbWVudHMgY2FuIGJlIG51bGwgKCMxNDg5NClcbiAgICAgICAgICAgIGlmICggYXR0cnNbIGkgXSApIHtcbiAgICAgICAgICAgICAgbmFtZSA9IGF0dHJzWyBpIF0ubmFtZTtcbiAgICAgICAgICAgICAgaWYgKCBuYW1lLmluZGV4T2YoIFwiZGF0YS1cIiApID09PSAwICkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lLnNsaWNlKDUpICk7XG4gICAgICAgICAgICAgICAgZGF0YUF0dHIoIGVsZW0sIG5hbWUsIGRhdGFbIG5hbWUgXSApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGpRdWVyeS5fZGF0YSggZWxlbSwgXCJwYXJzZWRBdHRyc1wiLCB0cnVlICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLy8gU2V0cyBtdWx0aXBsZSB2YWx1ZXNcbiAgICBpZiAoIHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkuZGF0YSggdGhpcywga2V5ICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDEgP1xuXG4gICAgICAvLyBTZXRzIG9uZSB2YWx1ZVxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkuZGF0YSggdGhpcywga2V5LCB2YWx1ZSApO1xuICAgICAgfSkgOlxuXG4gICAgICAvLyBHZXRzIG9uZSB2YWx1ZVxuICAgICAgLy8gVHJ5IHRvIGZldGNoIGFueSBpbnRlcm5hbGx5IHN0b3JlZCBkYXRhIGZpcnN0XG4gICAgICBlbGVtID8gZGF0YUF0dHIoIGVsZW0sIGtleSwgalF1ZXJ5LmRhdGEoIGVsZW0sIGtleSApICkgOiB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgcmVtb3ZlRGF0YTogZnVuY3Rpb24oIGtleSApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgalF1ZXJ5LnJlbW92ZURhdGEoIHRoaXMsIGtleSApO1xuICAgIH0pO1xuICB9XG59KTtcblxuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBkYXRhICkge1xuICAgIHZhciBxdWV1ZTtcblxuICAgIGlmICggZWxlbSApIHtcbiAgICAgIHR5cGUgPSAoIHR5cGUgfHwgXCJmeFwiICkgKyBcInF1ZXVlXCI7XG4gICAgICBxdWV1ZSA9IGpRdWVyeS5fZGF0YSggZWxlbSwgdHlwZSApO1xuXG4gICAgICAvLyBTcGVlZCB1cCBkZXF1ZXVlIGJ5IGdldHRpbmcgb3V0IHF1aWNrbHkgaWYgdGhpcyBpcyBqdXN0IGEgbG9va3VwXG4gICAgICBpZiAoIGRhdGEgKSB7XG4gICAgICAgIGlmICggIXF1ZXVlIHx8IGpRdWVyeS5pc0FycmF5KGRhdGEpICkge1xuICAgICAgICAgIHF1ZXVlID0galF1ZXJ5Ll9kYXRhKCBlbGVtLCB0eXBlLCBqUXVlcnkubWFrZUFycmF5KGRhdGEpICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcXVldWUucHVzaCggZGF0YSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcXVldWUgfHwgW107XG4gICAgfVxuICB9LFxuXG4gIGRlcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuICAgIHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuICAgIHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggZWxlbSwgdHlwZSApLFxuICAgICAgc3RhcnRMZW5ndGggPSBxdWV1ZS5sZW5ndGgsXG4gICAgICBmbiA9IHF1ZXVlLnNoaWZ0KCksXG4gICAgICBob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgdHlwZSApLFxuICAgICAgbmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkuZGVxdWV1ZSggZWxlbSwgdHlwZSApO1xuICAgICAgfTtcblxuICAgIC8vIElmIHRoZSBmeCBxdWV1ZSBpcyBkZXF1ZXVlZCwgYWx3YXlzIHJlbW92ZSB0aGUgcHJvZ3Jlc3Mgc2VudGluZWxcbiAgICBpZiAoIGZuID09PSBcImlucHJvZ3Jlc3NcIiApIHtcbiAgICAgIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgIHN0YXJ0TGVuZ3RoLS07XG4gICAgfVxuXG4gICAgaWYgKCBmbiApIHtcblxuICAgICAgLy8gQWRkIGEgcHJvZ3Jlc3Mgc2VudGluZWwgdG8gcHJldmVudCB0aGUgZnggcXVldWUgZnJvbSBiZWluZ1xuICAgICAgLy8gYXV0b21hdGljYWxseSBkZXF1ZXVlZFxuICAgICAgaWYgKCB0eXBlID09PSBcImZ4XCIgKSB7XG4gICAgICAgIHF1ZXVlLnVuc2hpZnQoIFwiaW5wcm9ncmVzc1wiICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsZWFyIHVwIHRoZSBsYXN0IHF1ZXVlIHN0b3AgZnVuY3Rpb25cbiAgICAgIGRlbGV0ZSBob29rcy5zdG9wO1xuICAgICAgZm4uY2FsbCggZWxlbSwgbmV4dCwgaG9va3MgKTtcbiAgICB9XG5cbiAgICBpZiAoICFzdGFydExlbmd0aCAmJiBob29rcyApIHtcbiAgICAgIGhvb2tzLmVtcHR5LmZpcmUoKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gbm90IGludGVuZGVkIGZvciBwdWJsaWMgY29uc3VtcHRpb24gLSBnZW5lcmF0ZXMgYSBxdWV1ZUhvb2tzIG9iamVjdCwgb3IgcmV0dXJucyB0aGUgY3VycmVudCBvbmVcbiAgX3F1ZXVlSG9va3M6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuICAgIHZhciBrZXkgPSB0eXBlICsgXCJxdWV1ZUhvb2tzXCI7XG4gICAgcmV0dXJuIGpRdWVyeS5fZGF0YSggZWxlbSwga2V5ICkgfHwgalF1ZXJ5Ll9kYXRhKCBlbGVtLCBrZXksIHtcbiAgICAgIGVtcHR5OiBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIikuYWRkKGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkuX3JlbW92ZURhdGEoIGVsZW0sIHR5cGUgKyBcInF1ZXVlXCIgKTtcbiAgICAgICAgalF1ZXJ5Ll9yZW1vdmVEYXRhKCBlbGVtLCBrZXkgKTtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgcXVldWU6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuICAgIHZhciBzZXR0ZXIgPSAyO1xuXG4gICAgaWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIGRhdGEgPSB0eXBlO1xuICAgICAgdHlwZSA9IFwiZnhcIjtcbiAgICAgIHNldHRlci0tO1xuICAgIH1cblxuICAgIGlmICggYXJndW1lbnRzLmxlbmd0aCA8IHNldHRlciApIHtcbiAgICAgIHJldHVybiBqUXVlcnkucXVldWUoIHRoaXNbMF0sIHR5cGUgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHRoaXMgOlxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcXVldWUgPSBqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIGRhdGEgKTtcblxuICAgICAgICAvLyBlbnN1cmUgYSBob29rcyBmb3IgdGhpcyBxdWV1ZVxuICAgICAgICBqUXVlcnkuX3F1ZXVlSG9va3MoIHRoaXMsIHR5cGUgKTtcblxuICAgICAgICBpZiAoIHR5cGUgPT09IFwiZnhcIiAmJiBxdWV1ZVswXSAhPT0gXCJpbnByb2dyZXNzXCIgKSB7XG4gICAgICAgICAgalF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0sXG4gIGRlcXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuICAgIH0pO1xuICB9LFxuICBjbGVhclF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG4gIH0sXG4gIC8vIEdldCBhIHByb21pc2UgcmVzb2x2ZWQgd2hlbiBxdWV1ZXMgb2YgYSBjZXJ0YWluIHR5cGVcbiAgLy8gYXJlIGVtcHRpZWQgKGZ4IGlzIHRoZSB0eXBlIGJ5IGRlZmF1bHQpXG4gIHByb21pc2U6IGZ1bmN0aW9uKCB0eXBlLCBvYmogKSB7XG4gICAgdmFyIHRtcCxcbiAgICAgIGNvdW50ID0gMSxcbiAgICAgIGRlZmVyID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICBlbGVtZW50cyA9IHRoaXMsXG4gICAgICBpID0gdGhpcy5sZW5ndGgsXG4gICAgICByZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggISggLS1jb3VudCApICkge1xuICAgICAgICAgIGRlZmVyLnJlc29sdmVXaXRoKCBlbGVtZW50cywgWyBlbGVtZW50cyBdICk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICBpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuICAgICAgb2JqID0gdHlwZTtcbiAgICAgIHR5cGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuICAgIHdoaWxlICggaS0tICkge1xuICAgICAgdG1wID0galF1ZXJ5Ll9kYXRhKCBlbGVtZW50c1sgaSBdLCB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgKTtcbiAgICAgIGlmICggdG1wICYmIHRtcC5lbXB0eSApIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgdG1wLmVtcHR5LmFkZCggcmVzb2x2ZSApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXNvbHZlKCk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoIG9iaiApO1xuICB9XG59KTtcbnZhciBwbnVtID0gKC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvKS5zb3VyY2U7XG5cbnZhciBjc3NFeHBhbmQgPSBbIFwiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCIgXTtcblxudmFyIGlzSGlkZGVuID0gZnVuY3Rpb24oIGVsZW0sIGVsICkge1xuICAgIC8vIGlzSGlkZGVuIG1pZ2h0IGJlIGNhbGxlZCBmcm9tIGpRdWVyeSNmaWx0ZXIgZnVuY3Rpb247XG4gICAgLy8gaW4gdGhhdCBjYXNlLCBlbGVtZW50IHdpbGwgYmUgc2Vjb25kIGFyZ3VtZW50XG4gICAgZWxlbSA9IGVsIHx8IGVsZW07XG4gICAgcmV0dXJuIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgPT09IFwibm9uZVwiIHx8ICFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuICB9O1xuXG5cblxuLy8gTXVsdGlmdW5jdGlvbmFsIG1ldGhvZCB0byBnZXQgYW5kIHNldCB2YWx1ZXMgb2YgYSBjb2xsZWN0aW9uXG4vLyBUaGUgdmFsdWUvcyBjYW4gb3B0aW9uYWxseSBiZSBleGVjdXRlZCBpZiBpdCdzIGEgZnVuY3Rpb25cbnZhciBhY2Nlc3MgPSBqUXVlcnkuYWNjZXNzID0gZnVuY3Rpb24oIGVsZW1zLCBmbiwga2V5LCB2YWx1ZSwgY2hhaW5hYmxlLCBlbXB0eUdldCwgcmF3ICkge1xuICB2YXIgaSA9IDAsXG4gICAgbGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxuICAgIGJ1bGsgPSBrZXkgPT0gbnVsbDtcblxuICAvLyBTZXRzIG1hbnkgdmFsdWVzXG4gIGlmICggalF1ZXJ5LnR5cGUoIGtleSApID09PSBcIm9iamVjdFwiICkge1xuICAgIGNoYWluYWJsZSA9IHRydWU7XG4gICAgZm9yICggaSBpbiBrZXkgKSB7XG4gICAgICBqUXVlcnkuYWNjZXNzKCBlbGVtcywgZm4sIGksIGtleVtpXSwgdHJ1ZSwgZW1wdHlHZXQsIHJhdyApO1xuICAgIH1cblxuICAvLyBTZXRzIG9uZSB2YWx1ZVxuICB9IGVsc2UgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuICAgIGNoYWluYWJsZSA9IHRydWU7XG5cbiAgICBpZiAoICFqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcbiAgICAgIHJhdyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCBidWxrICkge1xuICAgICAgLy8gQnVsayBvcGVyYXRpb25zIHJ1biBhZ2FpbnN0IHRoZSBlbnRpcmUgc2V0XG4gICAgICBpZiAoIHJhdyApIHtcbiAgICAgICAgZm4uY2FsbCggZWxlbXMsIHZhbHVlICk7XG4gICAgICAgIGZuID0gbnVsbDtcblxuICAgICAgLy8gLi4uZXhjZXB0IHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uIHZhbHVlc1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVsayA9IGZuO1xuICAgICAgICBmbiA9IGZ1bmN0aW9uKCBlbGVtLCBrZXksIHZhbHVlICkge1xuICAgICAgICAgIHJldHVybiBidWxrLmNhbGwoIGpRdWVyeSggZWxlbSApLCB2YWx1ZSApO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggZm4gKSB7XG4gICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgZm4oIGVsZW1zW2ldLCBrZXksIHJhdyA/IHZhbHVlIDogdmFsdWUuY2FsbCggZWxlbXNbaV0sIGksIGZuKCBlbGVtc1tpXSwga2V5ICkgKSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjaGFpbmFibGUgP1xuICAgIGVsZW1zIDpcblxuICAgIC8vIEdldHNcbiAgICBidWxrID9cbiAgICAgIGZuLmNhbGwoIGVsZW1zICkgOlxuICAgICAgbGVuZ3RoID8gZm4oIGVsZW1zWzBdLCBrZXkgKSA6IGVtcHR5R2V0O1xufTtcbnZhciByY2hlY2thYmxlVHlwZSA9ICgvXig/OmNoZWNrYm94fHJhZGlvKSQvaSk7XG5cblxuXG4oZnVuY3Rpb24oKSB7XG4gIC8vIE1pbmlmaWVkOiB2YXIgYSxiLGNcbiAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICksXG4gICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLFxuICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gIC8vIFNldHVwXG4gIGRpdi5pbm5lckhUTUwgPSBcIiAgPGxpbmsvPjx0YWJsZT48L3RhYmxlPjxhIGhyZWY9Jy9hJz5hPC9hPjxpbnB1dCB0eXBlPSdjaGVja2JveCcvPlwiO1xuXG4gIC8vIElFIHN0cmlwcyBsZWFkaW5nIHdoaXRlc3BhY2Ugd2hlbiAuaW5uZXJIVE1MIGlzIHVzZWRcbiAgc3VwcG9ydC5sZWFkaW5nV2hpdGVzcGFjZSA9IGRpdi5maXJzdENoaWxkLm5vZGVUeXBlID09PSAzO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IHRib2R5IGVsZW1lbnRzIGFyZW4ndCBhdXRvbWF0aWNhbGx5IGluc2VydGVkXG4gIC8vIElFIHdpbGwgaW5zZXJ0IHRoZW0gaW50byBlbXB0eSB0YWJsZXNcbiAgc3VwcG9ydC50Ym9keSA9ICFkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwidGJvZHlcIiApLmxlbmd0aDtcblxuICAvLyBNYWtlIHN1cmUgdGhhdCBsaW5rIGVsZW1lbnRzIGdldCBzZXJpYWxpemVkIGNvcnJlY3RseSBieSBpbm5lckhUTUxcbiAgLy8gVGhpcyByZXF1aXJlcyBhIHdyYXBwZXIgZWxlbWVudCBpbiBJRVxuICBzdXBwb3J0Lmh0bWxTZXJpYWxpemUgPSAhIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJsaW5rXCIgKS5sZW5ndGg7XG5cbiAgLy8gTWFrZXMgc3VyZSBjbG9uaW5nIGFuIGh0bWw1IGVsZW1lbnQgZG9lcyBub3QgY2F1c2UgcHJvYmxlbXNcbiAgLy8gV2hlcmUgb3V0ZXJIVE1MIGlzIHVuZGVmaW5lZCwgdGhpcyBzdGlsbCB3b3Jrc1xuICBzdXBwb3J0Lmh0bWw1Q2xvbmUgPVxuICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwibmF2XCIgKS5jbG9uZU5vZGUoIHRydWUgKS5vdXRlckhUTUwgIT09IFwiPDpuYXY+PC86bmF2PlwiO1xuXG4gIC8vIENoZWNrIGlmIGEgZGlzY29ubmVjdGVkIGNoZWNrYm94IHdpbGwgcmV0YWluIGl0cyBjaGVja2VkXG4gIC8vIHZhbHVlIG9mIHRydWUgYWZ0ZXIgYXBwZW5kZWQgdG8gdGhlIERPTSAoSUU2LzcpXG4gIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gIGlucHV0LmNoZWNrZWQgPSB0cnVlO1xuICBmcmFnbWVudC5hcHBlbmRDaGlsZCggaW5wdXQgKTtcbiAgc3VwcG9ydC5hcHBlbmRDaGVja2VkID0gaW5wdXQuY2hlY2tlZDtcblxuICAvLyBNYWtlIHN1cmUgdGV4dGFyZWEgKGFuZCBjaGVja2JveCkgZGVmYXVsdFZhbHVlIGlzIHByb3Blcmx5IGNsb25lZFxuICAvLyBTdXBwb3J0OiBJRTYtSUUxMStcbiAgZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xuICBzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkID0gISFkaXYuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcblxuICAvLyAjMTEyMTcgLSBXZWJLaXQgbG9zZXMgY2hlY2sgd2hlbiB0aGUgbmFtZSBpcyBhZnRlciB0aGUgY2hlY2tlZCBhdHRyaWJ1dGVcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRpdiApO1xuICBkaXYuaW5uZXJIVE1MID0gXCI8aW5wdXQgdHlwZT0ncmFkaW8nIGNoZWNrZWQ9J2NoZWNrZWQnIG5hbWU9J3QnLz5cIjtcblxuICAvLyBTdXBwb3J0OiBTYWZhcmkgNS4xLCBpT1MgNS4xLCBBbmRyb2lkIDQueCwgQW5kcm9pZCAyLjNcbiAgLy8gb2xkIFdlYktpdCBkb2Vzbid0IGNsb25lIGNoZWNrZWQgc3RhdGUgY29ycmVjdGx5IGluIGZyYWdtZW50c1xuICBzdXBwb3J0LmNoZWNrQ2xvbmUgPSBkaXYuY2xvbmVOb2RlKCB0cnVlICkuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmNoZWNrZWQ7XG5cbiAgLy8gU3VwcG9ydDogSUU8OVxuICAvLyBPcGVyYSBkb2VzIG5vdCBjbG9uZSBldmVudHMgKGFuZCB0eXBlb2YgZGl2LmF0dGFjaEV2ZW50ID09PSB1bmRlZmluZWQpLlxuICAvLyBJRTktMTAgY2xvbmVzIGV2ZW50cyBib3VuZCB2aWEgYXR0YWNoRXZlbnQsIGJ1dCB0aGV5IGRvbid0IHRyaWdnZXIgd2l0aCAuY2xpY2soKVxuICBzdXBwb3J0Lm5vQ2xvbmVFdmVudCA9IHRydWU7XG4gIGlmICggZGl2LmF0dGFjaEV2ZW50ICkge1xuICAgIGRpdi5hdHRhY2hFdmVudCggXCJvbmNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgc3VwcG9ydC5ub0Nsb25lRXZlbnQgPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIGRpdi5jbG9uZU5vZGUoIHRydWUgKS5jbGljaygpO1xuICB9XG5cbiAgLy8gRXhlY3V0ZSB0aGUgdGVzdCBvbmx5IGlmIG5vdCBhbHJlYWR5IGV4ZWN1dGVkIGluIGFub3RoZXIgbW9kdWxlLlxuICBpZiAoc3VwcG9ydC5kZWxldGVFeHBhbmRvID09IG51bGwpIHtcbiAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgc3VwcG9ydC5kZWxldGVFeHBhbmRvID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIGRpdi50ZXN0O1xuICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPSBmYWxzZTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cblxuKGZ1bmN0aW9uKCkge1xuICB2YXIgaSwgZXZlbnROYW1lLFxuICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcblxuICAvLyBTdXBwb3J0OiBJRTw5IChsYWNrIHN1Ym1pdC9jaGFuZ2UgYnViYmxlKSwgRmlyZWZveCAyMysgKGxhY2sgZm9jdXNpbiBldmVudClcbiAgZm9yICggaSBpbiB7IHN1Ym1pdDogdHJ1ZSwgY2hhbmdlOiB0cnVlLCBmb2N1c2luOiB0cnVlIH0pIHtcbiAgICBldmVudE5hbWUgPSBcIm9uXCIgKyBpO1xuXG4gICAgaWYgKCAhKHN1cHBvcnRbIGkgKyBcIkJ1YmJsZXNcIiBdID0gZXZlbnROYW1lIGluIHdpbmRvdykgKSB7XG4gICAgICAvLyBCZXdhcmUgb2YgQ1NQIHJlc3RyaWN0aW9ucyAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vU2VjdXJpdHkvQ1NQKVxuICAgICAgZGl2LnNldEF0dHJpYnV0ZSggZXZlbnROYW1lLCBcInRcIiApO1xuICAgICAgc3VwcG9ydFsgaSArIFwiQnViYmxlc1wiIF0gPSBkaXYuYXR0cmlidXRlc1sgZXZlbnROYW1lIF0uZXhwYW5kbyA9PT0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gTnVsbCBlbGVtZW50cyB0byBhdm9pZCBsZWFrcyBpbiBJRS5cbiAgZGl2ID0gbnVsbDtcbn0pKCk7XG5cblxudmFyIHJmb3JtRWxlbXMgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYSkkL2ksXG4gIHJrZXlFdmVudCA9IC9ea2V5LyxcbiAgcm1vdXNlRXZlbnQgPSAvXig/Om1vdXNlfHBvaW50ZXJ8Y29udGV4dG1lbnUpfGNsaWNrLyxcbiAgcmZvY3VzTW9ycGggPSAvXig/OmZvY3VzaW5mb2N1c3xmb2N1c291dGJsdXIpJC8sXG4gIHJ0eXBlbmFtZXNwYWNlID0gL14oW14uXSopKD86XFwuKC4rKXwpJC87XG5cbmZ1bmN0aW9uIHJldHVyblRydWUoKSB7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZXR1cm5GYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzYWZlQWN0aXZlRWxlbWVudCgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgfSBjYXRjaCAoIGVyciApIHsgfVxufVxuXG4vKlxuICogSGVscGVyIGZ1bmN0aW9ucyBmb3IgbWFuYWdpbmcgZXZlbnRzIC0tIG5vdCBwYXJ0IG9mIHRoZSBwdWJsaWMgaW50ZXJmYWNlLlxuICogUHJvcHMgdG8gRGVhbiBFZHdhcmRzJyBhZGRFdmVudCBsaWJyYXJ5IGZvciBtYW55IG9mIHRoZSBpZGVhcy5cbiAqL1xualF1ZXJ5LmV2ZW50ID0ge1xuXG4gIGdsb2JhbDoge30sXG5cbiAgYWRkOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIGRhdGEsIHNlbGVjdG9yICkge1xuICAgIHZhciB0bXAsIGV2ZW50cywgdCwgaGFuZGxlT2JqSW4sXG4gICAgICBzcGVjaWFsLCBldmVudEhhbmRsZSwgaGFuZGxlT2JqLFxuICAgICAgaGFuZGxlcnMsIHR5cGUsIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuICAgICAgZWxlbURhdGEgPSBqUXVlcnkuX2RhdGEoIGVsZW0gKTtcblxuICAgIC8vIERvbid0IGF0dGFjaCBldmVudHMgdG8gbm9EYXRhIG9yIHRleHQvY29tbWVudCBub2RlcyAoYnV0IGFsbG93IHBsYWluIG9iamVjdHMpXG4gICAgaWYgKCAhZWxlbURhdGEgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2FsbGVyIGNhbiBwYXNzIGluIGFuIG9iamVjdCBvZiBjdXN0b20gZGF0YSBpbiBsaWV1IG9mIHRoZSBoYW5kbGVyXG4gICAgaWYgKCBoYW5kbGVyLmhhbmRsZXIgKSB7XG4gICAgICBoYW5kbGVPYmpJbiA9IGhhbmRsZXI7XG4gICAgICBoYW5kbGVyID0gaGFuZGxlT2JqSW4uaGFuZGxlcjtcbiAgICAgIHNlbGVjdG9yID0gaGFuZGxlT2JqSW4uc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGhhbmRsZXIgaGFzIGEgdW5pcXVlIElELCB1c2VkIHRvIGZpbmQvcmVtb3ZlIGl0IGxhdGVyXG4gICAgaWYgKCAhaGFuZGxlci5ndWlkICkge1xuICAgICAgaGFuZGxlci5ndWlkID0galF1ZXJ5Lmd1aWQrKztcbiAgICB9XG5cbiAgICAvLyBJbml0IHRoZSBlbGVtZW50J3MgZXZlbnQgc3RydWN0dXJlIGFuZCBtYWluIGhhbmRsZXIsIGlmIHRoaXMgaXMgdGhlIGZpcnN0XG4gICAgaWYgKCAhKGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cykgKSB7XG4gICAgICBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgPSB7fTtcbiAgICB9XG4gICAgaWYgKCAhKGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlKSApIHtcbiAgICAgIGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlID0gZnVuY3Rpb24oIGUgKSB7XG4gICAgICAgIC8vIERpc2NhcmQgdGhlIHNlY29uZCBldmVudCBvZiBhIGpRdWVyeS5ldmVudC50cmlnZ2VyKCkgYW5kXG4gICAgICAgIC8vIHdoZW4gYW4gZXZlbnQgaXMgY2FsbGVkIGFmdGVyIGEgcGFnZSBoYXMgdW5sb2FkZWRcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBqUXVlcnkgIT09IHN0cnVuZGVmaW5lZCAmJiAoIWUgfHwgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCAhPT0gZS50eXBlKSA/XG4gICAgICAgICAgalF1ZXJ5LmV2ZW50LmRpc3BhdGNoLmFwcGx5KCBldmVudEhhbmRsZS5lbGVtLCBhcmd1bWVudHMgKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgfTtcbiAgICAgIC8vIEFkZCBlbGVtIGFzIGEgcHJvcGVydHkgb2YgdGhlIGhhbmRsZSBmbiB0byBwcmV2ZW50IGEgbWVtb3J5IGxlYWsgd2l0aCBJRSBub24tbmF0aXZlIGV2ZW50c1xuICAgICAgZXZlbnRIYW5kbGUuZWxlbSA9IGVsZW07XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG11bHRpcGxlIGV2ZW50cyBzZXBhcmF0ZWQgYnkgYSBzcGFjZVxuICAgIHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuICAgIHQgPSB0eXBlcy5sZW5ndGg7XG4gICAgd2hpbGUgKCB0LS0gKSB7XG4gICAgICB0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1t0XSApIHx8IFtdO1xuICAgICAgdHlwZSA9IG9yaWdUeXBlID0gdG1wWzFdO1xuICAgICAgbmFtZXNwYWNlcyA9ICggdG1wWzJdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cbiAgICAgIC8vIFRoZXJlICptdXN0KiBiZSBhIHR5cGUsIG5vIGF0dGFjaGluZyBuYW1lc3BhY2Utb25seSBoYW5kbGVyc1xuICAgICAgaWYgKCAhdHlwZSApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGV2ZW50IGNoYW5nZXMgaXRzIHR5cGUsIHVzZSB0aGUgc3BlY2lhbCBldmVudCBoYW5kbGVycyBmb3IgdGhlIGNoYW5nZWQgdHlwZVxuICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cbiAgICAgIC8vIElmIHNlbGVjdG9yIGRlZmluZWQsIGRldGVybWluZSBzcGVjaWFsIGV2ZW50IGFwaSB0eXBlLCBvdGhlcndpc2UgZ2l2ZW4gdHlwZVxuICAgICAgdHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXG4gICAgICAvLyBVcGRhdGUgc3BlY2lhbCBiYXNlZCBvbiBuZXdseSByZXNldCB0eXBlXG4gICAgICBzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuICAgICAgLy8gaGFuZGxlT2JqIGlzIHBhc3NlZCB0byBhbGwgZXZlbnQgaGFuZGxlcnNcbiAgICAgIGhhbmRsZU9iaiA9IGpRdWVyeS5leHRlbmQoe1xuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBvcmlnVHlwZTogb3JpZ1R5cGUsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXG4gICAgICAgIGd1aWQ6IGhhbmRsZXIuZ3VpZCxcbiAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgICBuZWVkc0NvbnRleHQ6IHNlbGVjdG9yICYmIGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApLFxuICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbihcIi5cIilcbiAgICAgIH0sIGhhbmRsZU9iakluICk7XG5cbiAgICAgIC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG4gICAgICBpZiAoICEoaGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSkgKSB7XG4gICAgICAgIGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gPSBbXTtcbiAgICAgICAgaGFuZGxlcnMuZGVsZWdhdGVDb3VudCA9IDA7XG5cbiAgICAgICAgLy8gT25seSB1c2UgYWRkRXZlbnRMaXN0ZW5lci9hdHRhY2hFdmVudCBpZiB0aGUgc3BlY2lhbCBldmVudHMgaGFuZGxlciByZXR1cm5zIGZhbHNlXG4gICAgICAgIGlmICggIXNwZWNpYWwuc2V0dXAgfHwgc3BlY2lhbC5zZXR1cC5jYWxsKCBlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApID09PSBmYWxzZSApIHtcbiAgICAgICAgICAvLyBCaW5kIHRoZSBnbG9iYWwgZXZlbnQgaGFuZGxlciB0byB0aGUgZWxlbWVudFxuICAgICAgICAgIGlmICggZWxlbS5hZGRFdmVudExpc3RlbmVyICkge1xuICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCB0eXBlLCBldmVudEhhbmRsZSwgZmFsc2UgKTtcblxuICAgICAgICAgIH0gZWxzZSBpZiAoIGVsZW0uYXR0YWNoRXZlbnQgKSB7XG4gICAgICAgICAgICBlbGVtLmF0dGFjaEV2ZW50KCBcIm9uXCIgKyB0eXBlLCBldmVudEhhbmRsZSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIHNwZWNpYWwuYWRkICkge1xuICAgICAgICBzcGVjaWFsLmFkZC5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblxuICAgICAgICBpZiAoICFoYW5kbGVPYmouaGFuZGxlci5ndWlkICkge1xuICAgICAgICAgIGhhbmRsZU9iai5oYW5kbGVyLmd1aWQgPSBoYW5kbGVyLmd1aWQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHRvIHRoZSBlbGVtZW50J3MgaGFuZGxlciBsaXN0LCBkZWxlZ2F0ZXMgaW4gZnJvbnRcbiAgICAgIGlmICggc2VsZWN0b3IgKSB7XG4gICAgICAgIGhhbmRsZXJzLnNwbGljZSggaGFuZGxlcnMuZGVsZWdhdGVDb3VudCsrLCAwLCBoYW5kbGVPYmogKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZXJzLnB1c2goIGhhbmRsZU9iaiApO1xuICAgICAgfVxuXG4gICAgICAvLyBLZWVwIHRyYWNrIG9mIHdoaWNoIGV2ZW50cyBoYXZlIGV2ZXIgYmVlbiB1c2VkLCBmb3IgZXZlbnQgb3B0aW1pemF0aW9uXG4gICAgICBqUXVlcnkuZXZlbnQuZ2xvYmFsWyB0eXBlIF0gPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIE51bGxpZnkgZWxlbSB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcyBpbiBJRVxuICAgIGVsZW0gPSBudWxsO1xuICB9LFxuXG4gIC8vIERldGFjaCBhbiBldmVudCBvciBzZXQgb2YgZXZlbnRzIGZyb20gYW4gZWxlbWVudFxuICByZW1vdmU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgc2VsZWN0b3IsIG1hcHBlZFR5cGVzICkge1xuICAgIHZhciBqLCBoYW5kbGVPYmosIHRtcCxcbiAgICAgIG9yaWdDb3VudCwgdCwgZXZlbnRzLFxuICAgICAgc3BlY2lhbCwgaGFuZGxlcnMsIHR5cGUsXG4gICAgICBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcbiAgICAgIGVsZW1EYXRhID0galF1ZXJ5Lmhhc0RhdGEoIGVsZW0gKSAmJiBqUXVlcnkuX2RhdGEoIGVsZW0gKTtcblxuICAgIGlmICggIWVsZW1EYXRhIHx8ICEoZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBPbmNlIGZvciBlYWNoIHR5cGUubmFtZXNwYWNlIGluIHR5cGVzOyB0eXBlIG1heSBiZSBvbWl0dGVkXG4gICAgdHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgWyBcIlwiIF07XG4gICAgdCA9IHR5cGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoIHQtLSApIHtcbiAgICAgIHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzW3RdICkgfHwgW107XG4gICAgICB0eXBlID0gb3JpZ1R5cGUgPSB0bXBbMV07XG4gICAgICBuYW1lc3BhY2VzID0gKCB0bXBbMl0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuICAgICAgLy8gVW5iaW5kIGFsbCBldmVudHMgKG9uIHRoaXMgbmFtZXNwYWNlLCBpZiBwcm92aWRlZCkgZm9yIHRoZSBlbGVtZW50XG4gICAgICBpZiAoICF0eXBlICkge1xuICAgICAgICBmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcbiAgICAgICAgICBqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICsgdHlwZXNbIHQgXSwgaGFuZGxlciwgc2VsZWN0b3IsIHRydWUgKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG4gICAgICB0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG4gICAgICBoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdIHx8IFtdO1xuICAgICAgdG1wID0gdG1wWzJdICYmIG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKSArIFwiKFxcXFwufCQpXCIgKTtcblxuICAgICAgLy8gUmVtb3ZlIG1hdGNoaW5nIGV2ZW50c1xuICAgICAgb3JpZ0NvdW50ID0gaiA9IGhhbmRsZXJzLmxlbmd0aDtcbiAgICAgIHdoaWxlICggai0tICkge1xuICAgICAgICBoYW5kbGVPYmogPSBoYW5kbGVyc1sgaiBdO1xuXG4gICAgICAgIGlmICggKCBtYXBwZWRUeXBlcyB8fCBvcmlnVHlwZSA9PT0gaGFuZGxlT2JqLm9yaWdUeXBlICkgJiZcbiAgICAgICAgICAoICFoYW5kbGVyIHx8IGhhbmRsZXIuZ3VpZCA9PT0gaGFuZGxlT2JqLmd1aWQgKSAmJlxuICAgICAgICAgICggIXRtcCB8fCB0bXAudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkgJiZcbiAgICAgICAgICAoICFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gaGFuZGxlT2JqLnNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBcIioqXCIgJiYgaGFuZGxlT2JqLnNlbGVjdG9yICkgKSB7XG4gICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKCBqLCAxICk7XG5cbiAgICAgICAgICBpZiAoIGhhbmRsZU9iai5zZWxlY3RvciApIHtcbiAgICAgICAgICAgIGhhbmRsZXJzLmRlbGVnYXRlQ291bnQtLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCBzcGVjaWFsLnJlbW92ZSApIHtcbiAgICAgICAgICAgIHNwZWNpYWwucmVtb3ZlLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgZ2VuZXJpYyBldmVudCBoYW5kbGVyIGlmIHdlIHJlbW92ZWQgc29tZXRoaW5nIGFuZCBubyBtb3JlIGhhbmRsZXJzIGV4aXN0XG4gICAgICAvLyAoYXZvaWRzIHBvdGVudGlhbCBmb3IgZW5kbGVzcyByZWN1cnNpb24gZHVyaW5nIHJlbW92YWwgb2Ygc3BlY2lhbCBldmVudCBoYW5kbGVycylcbiAgICAgIGlmICggb3JpZ0NvdW50ICYmICFoYW5kbGVycy5sZW5ndGggKSB7XG4gICAgICAgIGlmICggIXNwZWNpYWwudGVhcmRvd24gfHwgc3BlY2lhbC50ZWFyZG93bi5jYWxsKCBlbGVtLCBuYW1lc3BhY2VzLCBlbGVtRGF0YS5oYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgalF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBlbGVtRGF0YS5oYW5kbGUgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBldmVudHNbIHR5cGUgXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIGV4cGFuZG8gaWYgaXQncyBubyBsb25nZXIgdXNlZFxuICAgIGlmICggalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGV2ZW50cyApICkge1xuICAgICAgZGVsZXRlIGVsZW1EYXRhLmhhbmRsZTtcblxuICAgICAgLy8gcmVtb3ZlRGF0YSBhbHNvIGNoZWNrcyBmb3IgZW1wdGluZXNzIGFuZCBjbGVhcnMgdGhlIGV4cGFuZG8gaWYgZW1wdHlcbiAgICAgIC8vIHNvIHVzZSBpdCBpbnN0ZWFkIG9mIGRlbGV0ZVxuICAgICAgalF1ZXJ5Ll9yZW1vdmVEYXRhKCBlbGVtLCBcImV2ZW50c1wiICk7XG4gICAgfVxuICB9LFxuXG4gIHRyaWdnZXI6IGZ1bmN0aW9uKCBldmVudCwgZGF0YSwgZWxlbSwgb25seUhhbmRsZXJzICkge1xuICAgIHZhciBoYW5kbGUsIG9udHlwZSwgY3VyLFxuICAgICAgYnViYmxlVHlwZSwgc3BlY2lhbCwgdG1wLCBpLFxuICAgICAgZXZlbnRQYXRoID0gWyBlbGVtIHx8IGRvY3VtZW50IF0sXG4gICAgICB0eXBlID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcInR5cGVcIiApID8gZXZlbnQudHlwZSA6IGV2ZW50LFxuICAgICAgbmFtZXNwYWNlcyA9IGhhc093bi5jYWxsKCBldmVudCwgXCJuYW1lc3BhY2VcIiApID8gZXZlbnQubmFtZXNwYWNlLnNwbGl0KFwiLlwiKSA6IFtdO1xuXG4gICAgY3VyID0gdG1wID0gZWxlbSA9IGVsZW0gfHwgZG9jdW1lbnQ7XG5cbiAgICAvLyBEb24ndCBkbyBldmVudHMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4ICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGZvY3VzL2JsdXIgbW9ycGhzIHRvIGZvY3VzaW4vb3V0OyBlbnN1cmUgd2UncmUgbm90IGZpcmluZyB0aGVtIHJpZ2h0IG5vd1xuICAgIGlmICggcmZvY3VzTW9ycGgudGVzdCggdHlwZSArIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIHR5cGUuaW5kZXhPZihcIi5cIikgPj0gMCApIHtcbiAgICAgIC8vIE5hbWVzcGFjZWQgdHJpZ2dlcjsgY3JlYXRlIGEgcmVnZXhwIHRvIG1hdGNoIGV2ZW50IHR5cGUgaW4gaGFuZGxlKClcbiAgICAgIG5hbWVzcGFjZXMgPSB0eXBlLnNwbGl0KFwiLlwiKTtcbiAgICAgIHR5cGUgPSBuYW1lc3BhY2VzLnNoaWZ0KCk7XG4gICAgICBuYW1lc3BhY2VzLnNvcnQoKTtcbiAgICB9XG4gICAgb250eXBlID0gdHlwZS5pbmRleE9mKFwiOlwiKSA8IDAgJiYgXCJvblwiICsgdHlwZTtcblxuICAgIC8vIENhbGxlciBjYW4gcGFzcyBpbiBhIGpRdWVyeS5FdmVudCBvYmplY3QsIE9iamVjdCwgb3IganVzdCBhbiBldmVudCB0eXBlIHN0cmluZ1xuICAgIGV2ZW50ID0gZXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gP1xuICAgICAgZXZlbnQgOlxuICAgICAgbmV3IGpRdWVyeS5FdmVudCggdHlwZSwgdHlwZW9mIGV2ZW50ID09PSBcIm9iamVjdFwiICYmIGV2ZW50ICk7XG5cbiAgICAvLyBUcmlnZ2VyIGJpdG1hc2s6ICYgMSBmb3IgbmF0aXZlIGhhbmRsZXJzOyAmIDIgZm9yIGpRdWVyeSAoYWx3YXlzIHRydWUpXG4gICAgZXZlbnQuaXNUcmlnZ2VyID0gb25seUhhbmRsZXJzID8gMiA6IDM7XG4gICAgZXZlbnQubmFtZXNwYWNlID0gbmFtZXNwYWNlcy5qb2luKFwiLlwiKTtcbiAgICBldmVudC5uYW1lc3BhY2VfcmUgPSBldmVudC5uYW1lc3BhY2UgP1xuICAgICAgbmV3IFJlZ0V4cCggXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpICsgXCIoXFxcXC58JClcIiApIDpcbiAgICAgIG51bGw7XG5cbiAgICAvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcbiAgICBldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuICAgICAgZXZlbnQudGFyZ2V0ID0gZWxlbTtcbiAgICB9XG5cbiAgICAvLyBDbG9uZSBhbnkgaW5jb21pbmcgZGF0YSBhbmQgcHJlcGVuZCB0aGUgZXZlbnQsIGNyZWF0aW5nIHRoZSBoYW5kbGVyIGFyZyBsaXN0XG4gICAgZGF0YSA9IGRhdGEgPT0gbnVsbCA/XG4gICAgICBbIGV2ZW50IF0gOlxuICAgICAgalF1ZXJ5Lm1ha2VBcnJheSggZGF0YSwgWyBldmVudCBdICk7XG5cbiAgICAvLyBBbGxvdyBzcGVjaWFsIGV2ZW50cyB0byBkcmF3IG91dHNpZGUgdGhlIGxpbmVzXG4gICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG4gICAgaWYgKCAhb25seUhhbmRsZXJzICYmIHNwZWNpYWwudHJpZ2dlciAmJiBzcGVjaWFsLnRyaWdnZXIuYXBwbHkoIGVsZW0sIGRhdGEgKSA9PT0gZmFsc2UgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIGV2ZW50IHByb3BhZ2F0aW9uIHBhdGggaW4gYWR2YW5jZSwgcGVyIFczQyBldmVudHMgc3BlYyAoIzk5NTEpXG4gICAgLy8gQnViYmxlIHVwIHRvIGRvY3VtZW50LCB0aGVuIHRvIHdpbmRvdzsgd2F0Y2ggZm9yIGEgZ2xvYmFsIG93bmVyRG9jdW1lbnQgdmFyICgjOTcyNClcbiAgICBpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG4gICAgICBidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcbiAgICAgIGlmICggIXJmb2N1c01vcnBoLnRlc3QoIGJ1YmJsZVR5cGUgKyB0eXBlICkgKSB7XG4gICAgICAgIGN1ciA9IGN1ci5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgICAgZm9yICggOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuICAgICAgICBldmVudFBhdGgucHVzaCggY3VyICk7XG4gICAgICAgIHRtcCA9IGN1cjtcbiAgICAgIH1cblxuICAgICAgLy8gT25seSBhZGQgd2luZG93IGlmIHdlIGdvdCB0byBkb2N1bWVudCAoZS5nLiwgbm90IHBsYWluIG9iaiBvciBkZXRhY2hlZCBET00pXG4gICAgICBpZiAoIHRtcCA9PT0gKGVsZW0ub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCkgKSB7XG4gICAgICAgIGV2ZW50UGF0aC5wdXNoKCB0bXAuZGVmYXVsdFZpZXcgfHwgdG1wLnBhcmVudFdpbmRvdyB8fCB3aW5kb3cgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaXJlIGhhbmRsZXJzIG9uIHRoZSBldmVudCBwYXRoXG4gICAgaSA9IDA7XG4gICAgd2hpbGUgKCAoY3VyID0gZXZlbnRQYXRoW2krK10pICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG4gICAgICBldmVudC50eXBlID0gaSA+IDEgP1xuICAgICAgICBidWJibGVUeXBlIDpcbiAgICAgICAgc3BlY2lhbC5iaW5kVHlwZSB8fCB0eXBlO1xuXG4gICAgICAvLyBqUXVlcnkgaGFuZGxlclxuICAgICAgaGFuZGxlID0gKCBqUXVlcnkuX2RhdGEoIGN1ciwgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSAmJiBqUXVlcnkuX2RhdGEoIGN1ciwgXCJoYW5kbGVcIiApO1xuICAgICAgaWYgKCBoYW5kbGUgKSB7XG4gICAgICAgIGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5hdGl2ZSBoYW5kbGVyXG4gICAgICBoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcbiAgICAgIGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBqUXVlcnkuYWNjZXB0RGF0YSggY3VyICkgKSB7XG4gICAgICAgIGV2ZW50LnJlc3VsdCA9IGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG4gICAgICAgIGlmICggZXZlbnQucmVzdWx0ID09PSBmYWxzZSApIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGV2ZW50LnR5cGUgPSB0eXBlO1xuXG4gICAgLy8gSWYgbm9ib2R5IHByZXZlbnRlZCB0aGUgZGVmYXVsdCBhY3Rpb24sIGRvIGl0IG5vd1xuICAgIGlmICggIW9ubHlIYW5kbGVycyAmJiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG5cbiAgICAgIGlmICggKCFzcGVjaWFsLl9kZWZhdWx0IHx8IHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSkgJiZcbiAgICAgICAgalF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuICAgICAgICAvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgbmFtZSBhcyB0aGUgZXZlbnQuXG4gICAgICAgIC8vIENhbid0IHVzZSBhbiAuaXNGdW5jdGlvbigpIGNoZWNrIGhlcmUgYmVjYXVzZSBJRTYvNyBmYWlscyB0aGF0IHRlc3QuXG4gICAgICAgIC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcbiAgICAgICAgaWYgKCBvbnR5cGUgJiYgZWxlbVsgdHlwZSBdICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuICAgICAgICAgIC8vIERvbid0IHJlLXRyaWdnZXIgYW4gb25GT08gZXZlbnQgd2hlbiB3ZSBjYWxsIGl0cyBGT08oKSBtZXRob2RcbiAgICAgICAgICB0bXAgPSBlbGVtWyBvbnR5cGUgXTtcblxuICAgICAgICAgIGlmICggdG1wICkge1xuICAgICAgICAgICAgZWxlbVsgb250eXBlIF0gPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFByZXZlbnQgcmUtdHJpZ2dlcmluZyBvZiB0aGUgc2FtZSBldmVudCwgc2luY2Ugd2UgYWxyZWFkeSBidWJibGVkIGl0IGFib3ZlXG4gICAgICAgICAgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHR5cGU7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsZW1bIHR5cGUgXSgpO1xuICAgICAgICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgICAgICAgLy8gSUU8OSBkaWVzIG9uIGZvY3VzL2JsdXIgdG8gaGlkZGVuIGVsZW1lbnQgKCMxNDg2LCMxMjUxOClcbiAgICAgICAgICAgIC8vIG9ubHkgcmVwcm9kdWNpYmxlIG9uIHdpblhQIElFOCBuYXRpdmUsIG5vdCBJRTkgaW4gSUU4IG1vZGVcbiAgICAgICAgICB9XG4gICAgICAgICAgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGlmICggdG1wICkge1xuICAgICAgICAgICAgZWxlbVsgb250eXBlIF0gPSB0bXA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50LnJlc3VsdDtcbiAgfSxcblxuICBkaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG4gICAgLy8gTWFrZSBhIHdyaXRhYmxlIGpRdWVyeS5FdmVudCBmcm9tIHRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0XG4gICAgZXZlbnQgPSBqUXVlcnkuZXZlbnQuZml4KCBldmVudCApO1xuXG4gICAgdmFyIGksIHJldCwgaGFuZGxlT2JqLCBtYXRjaGVkLCBqLFxuICAgICAgaGFuZGxlclF1ZXVlID0gW10sXG4gICAgICBhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG4gICAgICBoYW5kbGVycyA9ICggalF1ZXJ5Ll9kYXRhKCB0aGlzLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdIHx8IFtdLFxuICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyBldmVudC50eXBlIF0gfHwge307XG5cbiAgICAvLyBVc2UgdGhlIGZpeC1lZCBqUXVlcnkuRXZlbnQgcmF0aGVyIHRoYW4gdGhlIChyZWFkLW9ubHkpIG5hdGl2ZSBldmVudFxuICAgIGFyZ3NbMF0gPSBldmVudDtcbiAgICBldmVudC5kZWxlZ2F0ZVRhcmdldCA9IHRoaXM7XG5cbiAgICAvLyBDYWxsIHRoZSBwcmVEaXNwYXRjaCBob29rIGZvciB0aGUgbWFwcGVkIHR5cGUsIGFuZCBsZXQgaXQgYmFpbCBpZiBkZXNpcmVkXG4gICAgaWYgKCBzcGVjaWFsLnByZURpc3BhdGNoICYmIHNwZWNpYWwucHJlRGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKSA9PT0gZmFsc2UgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIGhhbmRsZXJzXG4gICAgaGFuZGxlclF1ZXVlID0galF1ZXJ5LmV2ZW50LmhhbmRsZXJzLmNhbGwoIHRoaXMsIGV2ZW50LCBoYW5kbGVycyApO1xuXG4gICAgLy8gUnVuIGRlbGVnYXRlcyBmaXJzdDsgdGhleSBtYXkgd2FudCB0byBzdG9wIHByb3BhZ2F0aW9uIGJlbmVhdGggdXNcbiAgICBpID0gMDtcbiAgICB3aGlsZSAoIChtYXRjaGVkID0gaGFuZGxlclF1ZXVlWyBpKysgXSkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG4gICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gbWF0Y2hlZC5lbGVtO1xuXG4gICAgICBqID0gMDtcbiAgICAgIHdoaWxlICggKGhhbmRsZU9iaiA9IG1hdGNoZWQuaGFuZGxlcnNbIGorKyBdKSAmJiAhZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuICAgICAgICAvLyBUcmlnZ2VyZWQgZXZlbnQgbXVzdCBlaXRoZXIgMSkgaGF2ZSBubyBuYW1lc3BhY2UsIG9yXG4gICAgICAgIC8vIDIpIGhhdmUgbmFtZXNwYWNlKHMpIGEgc3Vic2V0IG9yIGVxdWFsIHRvIHRob3NlIGluIHRoZSBib3VuZCBldmVudCAoYm90aCBjYW4gaGF2ZSBubyBuYW1lc3BhY2UpLlxuICAgICAgICBpZiAoICFldmVudC5uYW1lc3BhY2VfcmUgfHwgZXZlbnQubmFtZXNwYWNlX3JlLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApIHtcblxuICAgICAgICAgIGV2ZW50LmhhbmRsZU9iaiA9IGhhbmRsZU9iajtcbiAgICAgICAgICBldmVudC5kYXRhID0gaGFuZGxlT2JqLmRhdGE7XG5cbiAgICAgICAgICByZXQgPSAoIChqUXVlcnkuZXZlbnQuc3BlY2lhbFsgaGFuZGxlT2JqLm9yaWdUeXBlIF0gfHwge30pLmhhbmRsZSB8fCBoYW5kbGVPYmouaGFuZGxlciApXG4gICAgICAgICAgICAgIC5hcHBseSggbWF0Y2hlZC5lbGVtLCBhcmdzICk7XG5cbiAgICAgICAgICBpZiAoIHJldCAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgaWYgKCAoZXZlbnQucmVzdWx0ID0gcmV0KSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhbGwgdGhlIHBvc3REaXNwYXRjaCBob29rIGZvciB0aGUgbWFwcGVkIHR5cGVcbiAgICBpZiAoIHNwZWNpYWwucG9zdERpc3BhdGNoICkge1xuICAgICAgc3BlY2lhbC5wb3N0RGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnQucmVzdWx0O1xuICB9LFxuXG4gIGhhbmRsZXJzOiBmdW5jdGlvbiggZXZlbnQsIGhhbmRsZXJzICkge1xuICAgIHZhciBzZWwsIGhhbmRsZU9iaiwgbWF0Y2hlcywgaSxcbiAgICAgIGhhbmRsZXJRdWV1ZSA9IFtdLFxuICAgICAgZGVsZWdhdGVDb3VudCA9IGhhbmRsZXJzLmRlbGVnYXRlQ291bnQsXG4gICAgICBjdXIgPSBldmVudC50YXJnZXQ7XG5cbiAgICAvLyBGaW5kIGRlbGVnYXRlIGhhbmRsZXJzXG4gICAgLy8gQmxhY2staG9sZSBTVkcgPHVzZT4gaW5zdGFuY2UgdHJlZXMgKCMxMzE4MClcbiAgICAvLyBBdm9pZCBub24tbGVmdC1jbGljayBidWJibGluZyBpbiBGaXJlZm94ICgjMzg2MSlcbiAgICBpZiAoIGRlbGVnYXRlQ291bnQgJiYgY3VyLm5vZGVUeXBlICYmICghZXZlbnQuYnV0dG9uIHx8IGV2ZW50LnR5cGUgIT09IFwiY2xpY2tcIikgKSB7XG5cbiAgICAgIC8qIGpzaGludCBlcWVxZXE6IGZhbHNlICovXG4gICAgICBmb3IgKCA7IGN1ciAhPSB0aGlzOyBjdXIgPSBjdXIucGFyZW50Tm9kZSB8fCB0aGlzICkge1xuICAgICAgICAvKiBqc2hpbnQgZXFlcWVxOiB0cnVlICovXG5cbiAgICAgICAgLy8gRG9uJ3QgY2hlY2sgbm9uLWVsZW1lbnRzICgjMTMyMDgpXG4gICAgICAgIC8vIERvbid0IHByb2Nlc3MgY2xpY2tzIG9uIGRpc2FibGVkIGVsZW1lbnRzICgjNjkxMSwgIzgxNjUsICMxMTM4MiwgIzExNzY0KVxuICAgICAgICBpZiAoIGN1ci5ub2RlVHlwZSA9PT0gMSAmJiAoY3VyLmRpc2FibGVkICE9PSB0cnVlIHx8IGV2ZW50LnR5cGUgIT09IFwiY2xpY2tcIikgKSB7XG4gICAgICAgICAgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgZGVsZWdhdGVDb3VudDsgaSsrICkge1xuICAgICAgICAgICAgaGFuZGxlT2JqID0gaGFuZGxlcnNbIGkgXTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgY29uZmxpY3Qgd2l0aCBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKCMxMzIwMylcbiAgICAgICAgICAgIHNlbCA9IGhhbmRsZU9iai5zZWxlY3RvciArIFwiIFwiO1xuXG4gICAgICAgICAgICBpZiAoIG1hdGNoZXNbIHNlbCBdID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgIG1hdGNoZXNbIHNlbCBdID0gaGFuZGxlT2JqLm5lZWRzQ29udGV4dCA/XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCBzZWwsIHRoaXMgKS5pbmRleCggY3VyICkgPj0gMCA6XG4gICAgICAgICAgICAgICAgalF1ZXJ5LmZpbmQoIHNlbCwgdGhpcywgbnVsbCwgWyBjdXIgXSApLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggbWF0Y2hlc1sgc2VsIF0gKSB7XG4gICAgICAgICAgICAgIG1hdGNoZXMucHVzaCggaGFuZGxlT2JqICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggbWF0Y2hlcy5sZW5ndGggKSB7XG4gICAgICAgICAgICBoYW5kbGVyUXVldWUucHVzaCh7IGVsZW06IGN1ciwgaGFuZGxlcnM6IG1hdGNoZXMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSByZW1haW5pbmcgKGRpcmVjdGx5LWJvdW5kKSBoYW5kbGVyc1xuICAgIGlmICggZGVsZWdhdGVDb3VudCA8IGhhbmRsZXJzLmxlbmd0aCApIHtcbiAgICAgIGhhbmRsZXJRdWV1ZS5wdXNoKHsgZWxlbTogdGhpcywgaGFuZGxlcnM6IGhhbmRsZXJzLnNsaWNlKCBkZWxlZ2F0ZUNvdW50ICkgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhbmRsZXJRdWV1ZTtcbiAgfSxcblxuICBmaXg6IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICBpZiAoIGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdICkge1xuICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhIHdyaXRhYmxlIGNvcHkgb2YgdGhlIGV2ZW50IG9iamVjdCBhbmQgbm9ybWFsaXplIHNvbWUgcHJvcGVydGllc1xuICAgIHZhciBpLCBwcm9wLCBjb3B5LFxuICAgICAgdHlwZSA9IGV2ZW50LnR5cGUsXG4gICAgICBvcmlnaW5hbEV2ZW50ID0gZXZlbnQsXG4gICAgICBmaXhIb29rID0gdGhpcy5maXhIb29rc1sgdHlwZSBdO1xuXG4gICAgaWYgKCAhZml4SG9vayApIHtcbiAgICAgIHRoaXMuZml4SG9va3NbIHR5cGUgXSA9IGZpeEhvb2sgPVxuICAgICAgICBybW91c2VFdmVudC50ZXN0KCB0eXBlICkgPyB0aGlzLm1vdXNlSG9va3MgOlxuICAgICAgICBya2V5RXZlbnQudGVzdCggdHlwZSApID8gdGhpcy5rZXlIb29rcyA6XG4gICAgICAgIHt9O1xuICAgIH1cbiAgICBjb3B5ID0gZml4SG9vay5wcm9wcyA/IHRoaXMucHJvcHMuY29uY2F0KCBmaXhIb29rLnByb3BzICkgOiB0aGlzLnByb3BzO1xuXG4gICAgZXZlbnQgPSBuZXcgalF1ZXJ5LkV2ZW50KCBvcmlnaW5hbEV2ZW50ICk7XG5cbiAgICBpID0gY29weS5sZW5ndGg7XG4gICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICBwcm9wID0gY29weVsgaSBdO1xuICAgICAgZXZlbnRbIHByb3AgXSA9IG9yaWdpbmFsRXZlbnRbIHByb3AgXTtcbiAgICB9XG5cbiAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgLy8gRml4IHRhcmdldCBwcm9wZXJ0eSAoIzE5MjUpXG4gICAgaWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuICAgICAgZXZlbnQudGFyZ2V0ID0gb3JpZ2luYWxFdmVudC5zcmNFbGVtZW50IHx8IGRvY3VtZW50O1xuICAgIH1cblxuICAgIC8vIFN1cHBvcnQ6IENocm9tZSAyMyssIFNhZmFyaT9cbiAgICAvLyBUYXJnZXQgc2hvdWxkIG5vdCBiZSBhIHRleHQgbm9kZSAoIzUwNCwgIzEzMTQzKVxuICAgIGlmICggZXZlbnQudGFyZ2V0Lm5vZGVUeXBlID09PSAzICkge1xuICAgICAgZXZlbnQudGFyZ2V0ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydDogSUU8OVxuICAgIC8vIEZvciBtb3VzZS9rZXkgZXZlbnRzLCBtZXRhS2V5PT1mYWxzZSBpZiBpdCdzIHVuZGVmaW5lZCAoIzMzNjgsICMxMTMyOClcbiAgICBldmVudC5tZXRhS2V5ID0gISFldmVudC5tZXRhS2V5O1xuXG4gICAgcmV0dXJuIGZpeEhvb2suZmlsdGVyID8gZml4SG9vay5maWx0ZXIoIGV2ZW50LCBvcmlnaW5hbEV2ZW50ICkgOiBldmVudDtcbiAgfSxcblxuICAvLyBJbmNsdWRlcyBzb21lIGV2ZW50IHByb3BzIHNoYXJlZCBieSBLZXlFdmVudCBhbmQgTW91c2VFdmVudFxuICBwcm9wczogXCJhbHRLZXkgYnViYmxlcyBjYW5jZWxhYmxlIGN0cmxLZXkgY3VycmVudFRhcmdldCBldmVudFBoYXNlIG1ldGFLZXkgcmVsYXRlZFRhcmdldCBzaGlmdEtleSB0YXJnZXQgdGltZVN0YW1wIHZpZXcgd2hpY2hcIi5zcGxpdChcIiBcIiksXG5cbiAgZml4SG9va3M6IHt9LFxuXG4gIGtleUhvb2tzOiB7XG4gICAgcHJvcHM6IFwiY2hhciBjaGFyQ29kZSBrZXkga2V5Q29kZVwiLnNwbGl0KFwiIFwiKSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKCBldmVudCwgb3JpZ2luYWwgKSB7XG5cbiAgICAgIC8vIEFkZCB3aGljaCBmb3Iga2V5IGV2ZW50c1xuICAgICAgaWYgKCBldmVudC53aGljaCA9PSBudWxsICkge1xuICAgICAgICBldmVudC53aGljaCA9IG9yaWdpbmFsLmNoYXJDb2RlICE9IG51bGwgPyBvcmlnaW5hbC5jaGFyQ29kZSA6IG9yaWdpbmFsLmtleUNvZGU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG4gIH0sXG5cbiAgbW91c2VIb29rczoge1xuICAgIHByb3BzOiBcImJ1dHRvbiBidXR0b25zIGNsaWVudFggY2xpZW50WSBmcm9tRWxlbWVudCBvZmZzZXRYIG9mZnNldFkgcGFnZVggcGFnZVkgc2NyZWVuWCBzY3JlZW5ZIHRvRWxlbWVudFwiLnNwbGl0KFwiIFwiKSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKCBldmVudCwgb3JpZ2luYWwgKSB7XG4gICAgICB2YXIgYm9keSwgZXZlbnREb2MsIGRvYyxcbiAgICAgICAgYnV0dG9uID0gb3JpZ2luYWwuYnV0dG9uLFxuICAgICAgICBmcm9tRWxlbWVudCA9IG9yaWdpbmFsLmZyb21FbGVtZW50O1xuXG4gICAgICAvLyBDYWxjdWxhdGUgcGFnZVgvWSBpZiBtaXNzaW5nIGFuZCBjbGllbnRYL1kgYXZhaWxhYmxlXG4gICAgICBpZiAoIGV2ZW50LnBhZ2VYID09IG51bGwgJiYgb3JpZ2luYWwuY2xpZW50WCAhPSBudWxsICkge1xuICAgICAgICBldmVudERvYyA9IGV2ZW50LnRhcmdldC5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgICBkb2MgPSBldmVudERvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIGJvZHkgPSBldmVudERvYy5ib2R5O1xuXG4gICAgICAgIGV2ZW50LnBhZ2VYID0gb3JpZ2luYWwuY2xpZW50WCArICggZG9jICYmIGRvYy5zY3JvbGxMZWZ0IHx8IGJvZHkgJiYgYm9keS5zY3JvbGxMZWZ0IHx8IDAgKSAtICggZG9jICYmIGRvYy5jbGllbnRMZWZ0IHx8IGJvZHkgJiYgYm9keS5jbGllbnRMZWZ0IHx8IDAgKTtcbiAgICAgICAgZXZlbnQucGFnZVkgPSBvcmlnaW5hbC5jbGllbnRZICsgKCBkb2MgJiYgZG9jLnNjcm9sbFRvcCAgfHwgYm9keSAmJiBib2R5LnNjcm9sbFRvcCAgfHwgMCApIC0gKCBkb2MgJiYgZG9jLmNsaWVudFRvcCAgfHwgYm9keSAmJiBib2R5LmNsaWVudFRvcCAgfHwgMCApO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgcmVsYXRlZFRhcmdldCwgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAoICFldmVudC5yZWxhdGVkVGFyZ2V0ICYmIGZyb21FbGVtZW50ICkge1xuICAgICAgICBldmVudC5yZWxhdGVkVGFyZ2V0ID0gZnJvbUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCA/IG9yaWdpbmFsLnRvRWxlbWVudCA6IGZyb21FbGVtZW50O1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgd2hpY2ggZm9yIGNsaWNrOiAxID09PSBsZWZ0OyAyID09PSBtaWRkbGU7IDMgPT09IHJpZ2h0XG4gICAgICAvLyBOb3RlOiBidXR0b24gaXMgbm90IG5vcm1hbGl6ZWQsIHNvIGRvbid0IHVzZSBpdFxuICAgICAgaWYgKCAhZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGV2ZW50LndoaWNoID0gKCBidXR0b24gJiAxID8gMSA6ICggYnV0dG9uICYgMiA/IDMgOiAoIGJ1dHRvbiAmIDQgPyAyIDogMCApICkgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cbiAgfSxcblxuICBzcGVjaWFsOiB7XG4gICAgbG9hZDoge1xuICAgICAgLy8gUHJldmVudCB0cmlnZ2VyZWQgaW1hZ2UubG9hZCBldmVudHMgZnJvbSBidWJibGluZyB0byB3aW5kb3cubG9hZFxuICAgICAgbm9CdWJibGU6IHRydWVcbiAgICB9LFxuICAgIGZvY3VzOiB7XG4gICAgICAvLyBGaXJlIG5hdGl2ZSBldmVudCBpZiBwb3NzaWJsZSBzbyBibHVyL2ZvY3VzIHNlcXVlbmNlIGlzIGNvcnJlY3RcbiAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIHRoaXMgIT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5mb2N1cyApIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxuICAgICAgICAgICAgLy8gSWYgd2UgZXJyb3Igb24gZm9jdXMgdG8gaGlkZGVuIGVsZW1lbnQgKCMxNDg2LCAjMTI1MTgpLFxuICAgICAgICAgICAgLy8gbGV0IC50cmlnZ2VyKCkgcnVuIHRoZSBoYW5kbGVyc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlbGVnYXRlVHlwZTogXCJmb2N1c2luXCJcbiAgICB9LFxuICAgIGJsdXI6IHtcbiAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIHRoaXMgPT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5ibHVyICkge1xuICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlbGVnYXRlVHlwZTogXCJmb2N1c291dFwiXG4gICAgfSxcbiAgICBjbGljazoge1xuICAgICAgLy8gRm9yIGNoZWNrYm94LCBmaXJlIG5hdGl2ZSBldmVudCBzbyBjaGVja2VkIHN0YXRlIHdpbGwgYmUgcmlnaHRcbiAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIGpRdWVyeS5ub2RlTmFtZSggdGhpcywgXCJpbnB1dFwiICkgJiYgdGhpcy50eXBlID09PSBcImNoZWNrYm94XCIgJiYgdGhpcy5jbGljayApIHtcbiAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvLyBGb3IgY3Jvc3MtYnJvd3NlciBjb25zaXN0ZW5jeSwgZG9uJ3QgZmlyZSBuYXRpdmUgLmNsaWNrKCkgb24gbGlua3NcbiAgICAgIF9kZWZhdWx0OiBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIHJldHVybiBqUXVlcnkubm9kZU5hbWUoIGV2ZW50LnRhcmdldCwgXCJhXCIgKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYmVmb3JldW5sb2FkOiB7XG4gICAgICBwb3N0RGlzcGF0Y2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblxuICAgICAgICAvLyBTdXBwb3J0OiBGaXJlZm94IDIwK1xuICAgICAgICAvLyBGaXJlZm94IGRvZXNuJ3QgYWxlcnQgaWYgdGhlIHJldHVyblZhbHVlIGZpZWxkIGlzIG5vdCBzZXQuXG4gICAgICAgIGlmICggZXZlbnQucmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgZXZlbnQub3JpZ2luYWxFdmVudCApIHtcbiAgICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlID0gZXZlbnQucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNpbXVsYXRlOiBmdW5jdGlvbiggdHlwZSwgZWxlbSwgZXZlbnQsIGJ1YmJsZSApIHtcbiAgICAvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmUuXG4gICAgLy8gRmFrZSBvcmlnaW5hbEV2ZW50IHRvIGF2b2lkIGRvbm9yJ3Mgc3RvcFByb3BhZ2F0aW9uLCBidXQgaWYgdGhlXG4gICAgLy8gc2ltdWxhdGVkIGV2ZW50IHByZXZlbnRzIGRlZmF1bHQgdGhlbiB3ZSBkbyB0aGUgc2FtZSBvbiB0aGUgZG9ub3IuXG4gICAgdmFyIGUgPSBqUXVlcnkuZXh0ZW5kKFxuICAgICAgbmV3IGpRdWVyeS5FdmVudCgpLFxuICAgICAgZXZlbnQsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGlzU2ltdWxhdGVkOiB0cnVlLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiB7fVxuICAgICAgfVxuICAgICk7XG4gICAgaWYgKCBidWJibGUgKSB7XG4gICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlciggZSwgbnVsbCwgZWxlbSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBqUXVlcnkuZXZlbnQuZGlzcGF0Y2guY2FsbCggZWxlbSwgZSApO1xuICAgIH1cbiAgICBpZiAoIGUuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxualF1ZXJ5LnJlbW92ZUV2ZW50ID0gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciA/XG4gIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBoYW5kbGUgKSB7XG4gICAgaWYgKCBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIgKSB7XG4gICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIGhhbmRsZSwgZmFsc2UgKTtcbiAgICB9XG4gIH0gOlxuICBmdW5jdGlvbiggZWxlbSwgdHlwZSwgaGFuZGxlICkge1xuICAgIHZhciBuYW1lID0gXCJvblwiICsgdHlwZTtcblxuICAgIGlmICggZWxlbS5kZXRhY2hFdmVudCApIHtcblxuICAgICAgLy8gIzg1NDUsICM3MDU0LCBwcmV2ZW50aW5nIG1lbW9yeSBsZWFrcyBmb3IgY3VzdG9tIGV2ZW50cyBpbiBJRTYtOFxuICAgICAgLy8gZGV0YWNoRXZlbnQgbmVlZGVkIHByb3BlcnR5IG9uIGVsZW1lbnQsIGJ5IG5hbWUgb2YgdGhhdCBldmVudCwgdG8gcHJvcGVybHkgZXhwb3NlIGl0IHRvIEdDXG4gICAgICBpZiAoIHR5cGVvZiBlbGVtWyBuYW1lIF0gPT09IHN0cnVuZGVmaW5lZCApIHtcbiAgICAgICAgZWxlbVsgbmFtZSBdID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgZWxlbS5kZXRhY2hFdmVudCggbmFtZSwgaGFuZGxlICk7XG4gICAgfVxuICB9O1xuXG5qUXVlcnkuRXZlbnQgPSBmdW5jdGlvbiggc3JjLCBwcm9wcyApIHtcbiAgLy8gQWxsb3cgaW5zdGFudGlhdGlvbiB3aXRob3V0IHRoZSAnbmV3JyBrZXl3b3JkXG4gIGlmICggISh0aGlzIGluc3RhbmNlb2YgalF1ZXJ5LkV2ZW50KSApIHtcbiAgICByZXR1cm4gbmV3IGpRdWVyeS5FdmVudCggc3JjLCBwcm9wcyApO1xuICB9XG5cbiAgLy8gRXZlbnQgb2JqZWN0XG4gIGlmICggc3JjICYmIHNyYy50eXBlICkge1xuICAgIHRoaXMub3JpZ2luYWxFdmVudCA9IHNyYztcbiAgICB0aGlzLnR5cGUgPSBzcmMudHlwZTtcblxuICAgIC8vIEV2ZW50cyBidWJibGluZyB1cCB0aGUgZG9jdW1lbnQgbWF5IGhhdmUgYmVlbiBtYXJrZWQgYXMgcHJldmVudGVkXG4gICAgLy8gYnkgYSBoYW5kbGVyIGxvd2VyIGRvd24gdGhlIHRyZWU7IHJlZmxlY3QgdGhlIGNvcnJlY3QgdmFsdWUuXG4gICAgdGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSBzcmMuZGVmYXVsdFByZXZlbnRlZCB8fFxuICAgICAgICBzcmMuZGVmYXVsdFByZXZlbnRlZCA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFIDwgOSwgQW5kcm9pZCA8IDQuMFxuICAgICAgICBzcmMucmV0dXJuVmFsdWUgPT09IGZhbHNlID9cbiAgICAgIHJldHVyblRydWUgOlxuICAgICAgcmV0dXJuRmFsc2U7XG5cbiAgLy8gRXZlbnQgdHlwZVxuICB9IGVsc2Uge1xuICAgIHRoaXMudHlwZSA9IHNyYztcbiAgfVxuXG4gIC8vIFB1dCBleHBsaWNpdGx5IHByb3ZpZGVkIHByb3BlcnRpZXMgb250byB0aGUgZXZlbnQgb2JqZWN0XG4gIGlmICggcHJvcHMgKSB7XG4gICAgalF1ZXJ5LmV4dGVuZCggdGhpcywgcHJvcHMgKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBhIHRpbWVzdGFtcCBpZiBpbmNvbWluZyBldmVudCBkb2Vzbid0IGhhdmUgb25lXG4gIHRoaXMudGltZVN0YW1wID0gc3JjICYmIHNyYy50aW1lU3RhbXAgfHwgalF1ZXJ5Lm5vdygpO1xuXG4gIC8vIE1hcmsgaXQgYXMgZml4ZWRcbiAgdGhpc1sgalF1ZXJ5LmV4cGFuZG8gXSA9IHRydWU7XG59O1xuXG4vLyBqUXVlcnkuRXZlbnQgaXMgYmFzZWQgb24gRE9NMyBFdmVudHMgYXMgc3BlY2lmaWVkIGJ5IHRoZSBFQ01BU2NyaXB0IExhbmd1YWdlIEJpbmRpbmdcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMDMvV0QtRE9NLUxldmVsLTMtRXZlbnRzLTIwMDMwMzMxL2VjbWEtc2NyaXB0LWJpbmRpbmcuaHRtbFxualF1ZXJ5LkV2ZW50LnByb3RvdHlwZSA9IHtcbiAgaXNEZWZhdWx0UHJldmVudGVkOiByZXR1cm5GYWxzZSxcbiAgaXNQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuICBpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cbiAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG4gICAgdGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSByZXR1cm5UcnVlO1xuICAgIGlmICggIWUgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgcHJldmVudERlZmF1bHQgZXhpc3RzLCBydW4gaXQgb24gdGhlIG9yaWdpbmFsIGV2ZW50XG4gICAgaWYgKCBlLnByZXZlbnREZWZhdWx0ICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gU3VwcG9ydDogSUVcbiAgICAvLyBPdGhlcndpc2Ugc2V0IHRoZSByZXR1cm5WYWx1ZSBwcm9wZXJ0eSBvZiB0aGUgb3JpZ2luYWwgZXZlbnQgdG8gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgc3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuICAgIHRoaXMuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xuICAgIGlmICggIWUgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIElmIHN0b3BQcm9wYWdhdGlvbiBleGlzdHMsIHJ1biBpdCBvbiB0aGUgb3JpZ2luYWwgZXZlbnRcbiAgICBpZiAoIGUuc3RvcFByb3BhZ2F0aW9uICkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvLyBTdXBwb3J0OiBJRVxuICAgIC8vIFNldCB0aGUgY2FuY2VsQnViYmxlIHByb3BlcnR5IG9mIHRoZSBvcmlnaW5hbCBldmVudCB0byB0cnVlXG4gICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICB9LFxuICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG4gICAgdGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cbiAgICBpZiAoIGUgJiYgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKSB7XG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn07XG5cbi8vIENyZWF0ZSBtb3VzZWVudGVyL2xlYXZlIGV2ZW50cyB1c2luZyBtb3VzZW92ZXIvb3V0IGFuZCBldmVudC10aW1lIGNoZWNrc1xualF1ZXJ5LmVhY2goe1xuICBtb3VzZWVudGVyOiBcIm1vdXNlb3ZlclwiLFxuICBtb3VzZWxlYXZlOiBcIm1vdXNlb3V0XCIsXG4gIHBvaW50ZXJlbnRlcjogXCJwb2ludGVyb3ZlclwiLFxuICBwb2ludGVybGVhdmU6IFwicG9pbnRlcm91dFwiXG59LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuICBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgb3JpZyBdID0ge1xuICAgIGRlbGVnYXRlVHlwZTogZml4LFxuICAgIGJpbmRUeXBlOiBmaXgsXG5cbiAgICBoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgIHZhciByZXQsXG4gICAgICAgIHRhcmdldCA9IHRoaXMsXG4gICAgICAgIHJlbGF0ZWQgPSBldmVudC5yZWxhdGVkVGFyZ2V0LFxuICAgICAgICBoYW5kbGVPYmogPSBldmVudC5oYW5kbGVPYmo7XG5cbiAgICAgIC8vIEZvciBtb3VzZW50ZXIvbGVhdmUgY2FsbCB0aGUgaGFuZGxlciBpZiByZWxhdGVkIGlzIG91dHNpZGUgdGhlIHRhcmdldC5cbiAgICAgIC8vIE5COiBObyByZWxhdGVkVGFyZ2V0IGlmIHRoZSBtb3VzZSBsZWZ0L2VudGVyZWQgdGhlIGJyb3dzZXIgd2luZG93XG4gICAgICBpZiAoICFyZWxhdGVkIHx8IChyZWxhdGVkICE9PSB0YXJnZXQgJiYgIWpRdWVyeS5jb250YWlucyggdGFyZ2V0LCByZWxhdGVkICkpICkge1xuICAgICAgICBldmVudC50eXBlID0gaGFuZGxlT2JqLm9yaWdUeXBlO1xuICAgICAgICByZXQgPSBoYW5kbGVPYmouaGFuZGxlci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBmaXg7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfTtcbn0pO1xuXG4vLyBJRSBzdWJtaXQgZGVsZWdhdGlvblxuaWYgKCAhc3VwcG9ydC5zdWJtaXRCdWJibGVzICkge1xuXG4gIGpRdWVyeS5ldmVudC5zcGVjaWFsLnN1Ym1pdCA9IHtcbiAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBPbmx5IG5lZWQgdGhpcyBmb3IgZGVsZWdhdGVkIGZvcm0gc3VibWl0IGV2ZW50c1xuICAgICAgaWYgKCBqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiZm9ybVwiICkgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gTGF6eS1hZGQgYSBzdWJtaXQgaGFuZGxlciB3aGVuIGEgZGVzY2VuZGFudCBmb3JtIG1heSBwb3RlbnRpYWxseSBiZSBzdWJtaXR0ZWRcbiAgICAgIGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIFwiY2xpY2suX3N1Ym1pdCBrZXlwcmVzcy5fc3VibWl0XCIsIGZ1bmN0aW9uKCBlICkge1xuICAgICAgICAvLyBOb2RlIG5hbWUgY2hlY2sgYXZvaWRzIGEgVk1MLXJlbGF0ZWQgY3Jhc2ggaW4gSUUgKCM5ODA3KVxuICAgICAgICB2YXIgZWxlbSA9IGUudGFyZ2V0LFxuICAgICAgICAgIGZvcm0gPSBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiaW5wdXRcIiApIHx8IGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJidXR0b25cIiApID8gZWxlbS5mb3JtIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIGZvcm0gJiYgIWpRdWVyeS5fZGF0YSggZm9ybSwgXCJzdWJtaXRCdWJibGVzXCIgKSApIHtcbiAgICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKCBmb3JtLCBcInN1Ym1pdC5fc3VibWl0XCIsIGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgICAgIGV2ZW50Ll9zdWJtaXRfYnViYmxlID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBqUXVlcnkuX2RhdGEoIGZvcm0sIFwic3VibWl0QnViYmxlc1wiLCB0cnVlICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gcmV0dXJuIHVuZGVmaW5lZCBzaW5jZSB3ZSBkb24ndCBuZWVkIGFuIGV2ZW50IGxpc3RlbmVyXG4gICAgfSxcblxuICAgIHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgLy8gSWYgZm9ybSB3YXMgc3VibWl0dGVkIGJ5IHRoZSB1c2VyLCBidWJibGUgdGhlIGV2ZW50IHVwIHRoZSB0cmVlXG4gICAgICBpZiAoIGV2ZW50Ll9zdWJtaXRfYnViYmxlICkge1xuICAgICAgICBkZWxldGUgZXZlbnQuX3N1Ym1pdF9idWJibGU7XG4gICAgICAgIGlmICggdGhpcy5wYXJlbnROb2RlICYmICFldmVudC5pc1RyaWdnZXIgKSB7XG4gICAgICAgICAgalF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBcInN1Ym1pdFwiLCB0aGlzLnBhcmVudE5vZGUsIGV2ZW50LCB0cnVlICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdGVhcmRvd246IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gT25seSBuZWVkIHRoaXMgZm9yIGRlbGVnYXRlZCBmb3JtIHN1Ym1pdCBldmVudHNcbiAgICAgIGlmICggalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImZvcm1cIiApICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZSBkZWxlZ2F0ZWQgaGFuZGxlcnM7IGNsZWFuRGF0YSBldmVudHVhbGx5IHJlYXBzIHN1Ym1pdCBoYW5kbGVycyBhdHRhY2hlZCBhYm92ZVxuICAgICAgalF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgXCIuX3N1Ym1pdFwiICk7XG4gICAgfVxuICB9O1xufVxuXG4vLyBJRSBjaGFuZ2UgZGVsZWdhdGlvbiBhbmQgY2hlY2tib3gvcmFkaW8gZml4XG5pZiAoICFzdXBwb3J0LmNoYW5nZUJ1YmJsZXMgKSB7XG5cbiAgalF1ZXJ5LmV2ZW50LnNwZWNpYWwuY2hhbmdlID0ge1xuXG4gICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoIHJmb3JtRWxlbXMudGVzdCggdGhpcy5ub2RlTmFtZSApICkge1xuICAgICAgICAvLyBJRSBkb2Vzbid0IGZpcmUgY2hhbmdlIG9uIGEgY2hlY2svcmFkaW8gdW50aWwgYmx1cjsgdHJpZ2dlciBpdCBvbiBjbGlja1xuICAgICAgICAvLyBhZnRlciBhIHByb3BlcnR5Y2hhbmdlLiBFYXQgdGhlIGJsdXItY2hhbmdlIGluIHNwZWNpYWwuY2hhbmdlLmhhbmRsZS5cbiAgICAgICAgLy8gVGhpcyBzdGlsbCBmaXJlcyBvbmNoYW5nZSBhIHNlY29uZCB0aW1lIGZvciBjaGVjay9yYWRpbyBhZnRlciBibHVyLlxuICAgICAgICBpZiAoIHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiIHx8IHRoaXMudHlwZSA9PT0gXCJyYWRpb1wiICkge1xuICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIFwicHJvcGVydHljaGFuZ2UuX2NoYW5nZVwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgICAgICBpZiAoIGV2ZW50Lm9yaWdpbmFsRXZlbnQucHJvcGVydHlOYW1lID09PSBcImNoZWNrZWRcIiApIHtcbiAgICAgICAgICAgICAgdGhpcy5fanVzdF9jaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCBcImNsaWNrLl9jaGFuZ2VcIiwgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICAgICAgaWYgKCB0aGlzLl9qdXN0X2NoYW5nZWQgJiYgIWV2ZW50LmlzVHJpZ2dlciApIHtcbiAgICAgICAgICAgICAgdGhpcy5fanVzdF9jaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBbGxvdyB0cmlnZ2VyZWQsIHNpbXVsYXRlZCBjaGFuZ2UgZXZlbnRzICgjMTE1MDApXG4gICAgICAgICAgICBqUXVlcnkuZXZlbnQuc2ltdWxhdGUoIFwiY2hhbmdlXCIsIHRoaXMsIGV2ZW50LCB0cnVlICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gRGVsZWdhdGVkIGV2ZW50OyBsYXp5LWFkZCBhIGNoYW5nZSBoYW5kbGVyIG9uIGRlc2NlbmRhbnQgaW5wdXRzXG4gICAgICBqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCBcImJlZm9yZWFjdGl2YXRlLl9jaGFuZ2VcIiwgZnVuY3Rpb24oIGUgKSB7XG4gICAgICAgIHZhciBlbGVtID0gZS50YXJnZXQ7XG5cbiAgICAgICAgaWYgKCByZm9ybUVsZW1zLnRlc3QoIGVsZW0ubm9kZU5hbWUgKSAmJiAhalF1ZXJ5Ll9kYXRhKCBlbGVtLCBcImNoYW5nZUJ1YmJsZXNcIiApICkge1xuICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQoIGVsZW0sIFwiY2hhbmdlLl9jaGFuZ2VcIiwgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICAgICAgaWYgKCB0aGlzLnBhcmVudE5vZGUgJiYgIWV2ZW50LmlzU2ltdWxhdGVkICYmICFldmVudC5pc1RyaWdnZXIgKSB7XG4gICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5zaW11bGF0ZSggXCJjaGFuZ2VcIiwgdGhpcy5wYXJlbnROb2RlLCBldmVudCwgdHJ1ZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGpRdWVyeS5fZGF0YSggZWxlbSwgXCJjaGFuZ2VCdWJibGVzXCIsIHRydWUgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGhhbmRsZTogZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgdmFyIGVsZW0gPSBldmVudC50YXJnZXQ7XG5cbiAgICAgIC8vIFN3YWxsb3cgbmF0aXZlIGNoYW5nZSBldmVudHMgZnJvbSBjaGVja2JveC9yYWRpbywgd2UgYWxyZWFkeSB0cmlnZ2VyZWQgdGhlbSBhYm92ZVxuICAgICAgaWYgKCB0aGlzICE9PSBlbGVtIHx8IGV2ZW50LmlzU2ltdWxhdGVkIHx8IGV2ZW50LmlzVHJpZ2dlciB8fCAoZWxlbS50eXBlICE9PSBcInJhZGlvXCIgJiYgZWxlbS50eXBlICE9PSBcImNoZWNrYm94XCIpICkge1xuICAgICAgICByZXR1cm4gZXZlbnQuaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCBcIi5fY2hhbmdlXCIgKTtcblxuICAgICAgcmV0dXJuICFyZm9ybUVsZW1zLnRlc3QoIHRoaXMubm9kZU5hbWUgKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIENyZWF0ZSBcImJ1YmJsaW5nXCIgZm9jdXMgYW5kIGJsdXIgZXZlbnRzXG5pZiAoICFzdXBwb3J0LmZvY3VzaW5CdWJibGVzICkge1xuICBqUXVlcnkuZWFjaCh7IGZvY3VzOiBcImZvY3VzaW5cIiwgYmx1cjogXCJmb2N1c291dFwiIH0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG5cbiAgICAvLyBBdHRhY2ggYSBzaW5nbGUgY2FwdHVyaW5nIGhhbmRsZXIgb24gdGhlIGRvY3VtZW50IHdoaWxlIHNvbWVvbmUgd2FudHMgZm9jdXNpbi9mb2N1c291dFxuICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICBqUXVlcnkuZXZlbnQuc2ltdWxhdGUoIGZpeCwgZXZlbnQudGFyZ2V0LCBqUXVlcnkuZXZlbnQuZml4KCBldmVudCApLCB0cnVlICk7XG4gICAgICB9O1xuXG4gICAgalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGZpeCBdID0ge1xuICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZG9jID0gdGhpcy5vd25lckRvY3VtZW50IHx8IHRoaXMsXG4gICAgICAgICAgYXR0YWNoZXMgPSBqUXVlcnkuX2RhdGEoIGRvYywgZml4ICk7XG5cbiAgICAgICAgaWYgKCAhYXR0YWNoZXMgKSB7XG4gICAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcbiAgICAgICAgfVxuICAgICAgICBqUXVlcnkuX2RhdGEoIGRvYywgZml4LCAoIGF0dGFjaGVzIHx8IDAgKSArIDEgKTtcbiAgICAgIH0sXG4gICAgICB0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcbiAgICAgICAgICBhdHRhY2hlcyA9IGpRdWVyeS5fZGF0YSggZG9jLCBmaXggKSAtIDE7XG5cbiAgICAgICAgaWYgKCAhYXR0YWNoZXMgKSB7XG4gICAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcbiAgICAgICAgICBqUXVlcnkuX3JlbW92ZURhdGEoIGRvYywgZml4ICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgalF1ZXJ5Ll9kYXRhKCBkb2MsIGZpeCwgYXR0YWNoZXMgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblxuICBvbjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIC8qSU5URVJOQUwqLyBvbmUgKSB7XG4gICAgdmFyIHR5cGUsIG9yaWdGbjtcblxuICAgIC8vIFR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xuICAgIGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuICAgICAgLy8gKCB0eXBlcy1PYmplY3QsIHNlbGVjdG9yLCBkYXRhIClcbiAgICAgIGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuICAgICAgICAvLyAoIHR5cGVzLU9iamVjdCwgZGF0YSApXG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHNlbGVjdG9yO1xuICAgICAgICBzZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG4gICAgICAgIHRoaXMub24oIHR5cGUsIHNlbGVjdG9yLCBkYXRhLCB0eXBlc1sgdHlwZSBdLCBvbmUgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICggZGF0YSA9PSBudWxsICYmIGZuID09IG51bGwgKSB7XG4gICAgICAvLyAoIHR5cGVzLCBmbiApXG4gICAgICBmbiA9IHNlbGVjdG9yO1xuICAgICAgZGF0YSA9IHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAoIGZuID09IG51bGwgKSB7XG4gICAgICBpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgLy8gKCB0eXBlcywgc2VsZWN0b3IsIGZuIClcbiAgICAgICAgZm4gPSBkYXRhO1xuICAgICAgICBkYXRhID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gKCB0eXBlcywgZGF0YSwgZm4gKVxuICAgICAgICBmbiA9IGRhdGE7XG4gICAgICAgIGRhdGEgPSBzZWxlY3RvcjtcbiAgICAgICAgc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICggZm4gPT09IGZhbHNlICkge1xuICAgICAgZm4gPSByZXR1cm5GYWxzZTtcbiAgICB9IGVsc2UgaWYgKCAhZm4gKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoIG9uZSA9PT0gMSApIHtcbiAgICAgIG9yaWdGbiA9IGZuO1xuICAgICAgZm4gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIC8vIENhbiB1c2UgYW4gZW1wdHkgc2V0LCBzaW5jZSBldmVudCBjb250YWlucyB0aGUgaW5mb1xuICAgICAgICBqUXVlcnkoKS5vZmYoIGV2ZW50ICk7XG4gICAgICAgIHJldHVybiBvcmlnRm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgICAgfTtcbiAgICAgIC8vIFVzZSBzYW1lIGd1aWQgc28gY2FsbGVyIGNhbiByZW1vdmUgdXNpbmcgb3JpZ0ZuXG4gICAgICBmbi5ndWlkID0gb3JpZ0ZuLmd1aWQgfHwgKCBvcmlnRm4uZ3VpZCA9IGpRdWVyeS5ndWlkKysgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCB0eXBlcywgZm4sIGRhdGEsIHNlbGVjdG9yICk7XG4gICAgfSk7XG4gIH0sXG4gIG9uZTogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG4gICAgcmV0dXJuIHRoaXMub24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIDEgKTtcbiAgfSxcbiAgb2ZmOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBmbiApIHtcbiAgICB2YXIgaGFuZGxlT2JqLCB0eXBlO1xuICAgIGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xuICAgICAgLy8gKCBldmVudCApICBkaXNwYXRjaGVkIGpRdWVyeS5FdmVudFxuICAgICAgaGFuZGxlT2JqID0gdHlwZXMuaGFuZGxlT2JqO1xuICAgICAgalF1ZXJ5KCB0eXBlcy5kZWxlZ2F0ZVRhcmdldCApLm9mZihcbiAgICAgICAgaGFuZGxlT2JqLm5hbWVzcGFjZSA/IGhhbmRsZU9iai5vcmlnVHlwZSArIFwiLlwiICsgaGFuZGxlT2JqLm5hbWVzcGFjZSA6IGhhbmRsZU9iai5vcmlnVHlwZSxcbiAgICAgICAgaGFuZGxlT2JqLnNlbGVjdG9yLFxuICAgICAgICBoYW5kbGVPYmouaGFuZGxlclxuICAgICAgKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcbiAgICAgIC8vICggdHlwZXMtb2JqZWN0IFssIHNlbGVjdG9yXSApXG4gICAgICBmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuICAgICAgICB0aGlzLm9mZiggdHlwZSwgc2VsZWN0b3IsIHR5cGVzWyB0eXBlIF0gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAoIHNlbGVjdG9yID09PSBmYWxzZSB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICAgIC8vICggdHlwZXMgWywgZm5dIClcbiAgICAgIGZuID0gc2VsZWN0b3I7XG4gICAgICBzZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKCBmbiA9PT0gZmFsc2UgKSB7XG4gICAgICBmbiA9IHJldHVybkZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgalF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgdHlwZXMsIGZuLCBzZWxlY3RvciApO1xuICAgIH0pO1xuICB9LFxuXG4gIHRyaWdnZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgdGhpcyApO1xuICAgIH0pO1xuICB9LFxuICB0cmlnZ2VySGFuZGxlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG4gICAgdmFyIGVsZW0gPSB0aGlzWzBdO1xuICAgIGlmICggZWxlbSApIHtcbiAgICAgIHJldHVybiBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgZWxlbSwgdHJ1ZSApO1xuICAgIH1cbiAgfVxufSk7XG5cblxuZnVuY3Rpb24gY3JlYXRlU2FmZUZyYWdtZW50KCBkb2N1bWVudCApIHtcbiAgdmFyIGxpc3QgPSBub2RlTmFtZXMuc3BsaXQoIFwifFwiICksXG4gICAgc2FmZUZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgaWYgKCBzYWZlRnJhZy5jcmVhdGVFbGVtZW50ICkge1xuICAgIHdoaWxlICggbGlzdC5sZW5ndGggKSB7XG4gICAgICBzYWZlRnJhZy5jcmVhdGVFbGVtZW50KFxuICAgICAgICBsaXN0LnBvcCgpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2FmZUZyYWc7XG59XG5cbnZhciBub2RlTmFtZXMgPSBcImFiYnJ8YXJ0aWNsZXxhc2lkZXxhdWRpb3xiZGl8Y2FudmFzfGRhdGF8ZGF0YWxpc3R8ZGV0YWlsc3xmaWdjYXB0aW9ufGZpZ3VyZXxmb290ZXJ8XCIgK1xuICAgIFwiaGVhZGVyfGhncm91cHxtYXJrfG1ldGVyfG5hdnxvdXRwdXR8cHJvZ3Jlc3N8c2VjdGlvbnxzdW1tYXJ5fHRpbWV8dmlkZW9cIixcbiAgcmlubGluZWpRdWVyeSA9IC8galF1ZXJ5XFxkKz1cIig/Om51bGx8XFxkKylcIi9nLFxuICBybm9zaGltY2FjaGUgPSBuZXcgUmVnRXhwKFwiPCg/OlwiICsgbm9kZU5hbWVzICsgXCIpW1xcXFxzLz5dXCIsIFwiaVwiKSxcbiAgcmxlYWRpbmdXaGl0ZXNwYWNlID0gL15cXHMrLyxcbiAgcnhodG1sVGFnID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1xcdzpdKylbXj5dKilcXC8+L2dpLFxuICBydGFnTmFtZSA9IC88KFtcXHc6XSspLyxcbiAgcnRib2R5ID0gLzx0Ym9keS9pLFxuICByaHRtbCA9IC88fCYjP1xcdys7LyxcbiAgcm5vSW5uZXJodG1sID0gLzwoPzpzY3JpcHR8c3R5bGV8bGluaykvaSxcbiAgLy8gY2hlY2tlZD1cImNoZWNrZWRcIiBvciBjaGVja2VkXG4gIHJjaGVja2VkID0gL2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxcbiAgcnNjcmlwdFR5cGUgPSAvXiR8XFwvKD86amF2YXxlY21hKXNjcmlwdC9pLFxuICByc2NyaXB0VHlwZU1hc2tlZCA9IC9edHJ1ZVxcLyguKikvLFxuICByY2xlYW5TY3JpcHQgPSAvXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2csXG5cbiAgLy8gV2UgaGF2ZSB0byBjbG9zZSB0aGVzZSB0YWdzIHRvIHN1cHBvcnQgWEhUTUwgKCMxMzIwMClcbiAgd3JhcE1hcCA9IHtcbiAgICBvcHRpb246IFsgMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCIgXSxcbiAgICBsZWdlbmQ6IFsgMSwgXCI8ZmllbGRzZXQ+XCIsIFwiPC9maWVsZHNldD5cIiBdLFxuICAgIGFyZWE6IFsgMSwgXCI8bWFwPlwiLCBcIjwvbWFwPlwiIF0sXG4gICAgcGFyYW06IFsgMSwgXCI8b2JqZWN0PlwiLCBcIjwvb2JqZWN0PlwiIF0sXG4gICAgdGhlYWQ6IFsgMSwgXCI8dGFibGU+XCIsIFwiPC90YWJsZT5cIiBdLFxuICAgIHRyOiBbIDIsIFwiPHRhYmxlPjx0Ym9keT5cIiwgXCI8L3Rib2R5PjwvdGFibGU+XCIgXSxcbiAgICBjb2w6IFsgMiwgXCI8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxuICAgIHRkOiBbIDMsIFwiPHRhYmxlPjx0Ym9keT48dHI+XCIsIFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCIgXSxcblxuICAgIC8vIElFNi04IGNhbid0IHNlcmlhbGl6ZSBsaW5rLCBzY3JpcHQsIHN0eWxlLCBvciBhbnkgaHRtbDUgKE5vU2NvcGUpIHRhZ3MsXG4gICAgLy8gdW5sZXNzIHdyYXBwZWQgaW4gYSBkaXYgd2l0aCBub24tYnJlYWtpbmcgY2hhcmFjdGVycyBpbiBmcm9udCBvZiBpdC5cbiAgICBfZGVmYXVsdDogc3VwcG9ydC5odG1sU2VyaWFsaXplID8gWyAwLCBcIlwiLCBcIlwiIF0gOiBbIDEsIFwiWDxkaXY+XCIsIFwiPC9kaXY+XCIgIF1cbiAgfSxcbiAgc2FmZUZyYWdtZW50ID0gY3JlYXRlU2FmZUZyYWdtZW50KCBkb2N1bWVudCApLFxuICBmcmFnbWVudERpdiA9IHNhZmVGcmFnbWVudC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSApO1xuXG53cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG53cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xud3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cbmZ1bmN0aW9uIGdldEFsbCggY29udGV4dCwgdGFnICkge1xuICB2YXIgZWxlbXMsIGVsZW0sXG4gICAgaSA9IDAsXG4gICAgZm91bmQgPSB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gc3RydW5kZWZpbmVkID8gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnIHx8IFwiKlwiICkgOlxuICAgICAgdHlwZW9mIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCAhPT0gc3RydW5kZWZpbmVkID8gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgfHwgXCIqXCIgKSA6XG4gICAgICB1bmRlZmluZWQ7XG5cbiAgaWYgKCAhZm91bmQgKSB7XG4gICAgZm9yICggZm91bmQgPSBbXSwgZWxlbXMgPSBjb250ZXh0LmNoaWxkTm9kZXMgfHwgY29udGV4dDsgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuICAgICAgaWYgKCAhdGFnIHx8IGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgdGFnICkgKSB7XG4gICAgICAgIGZvdW5kLnB1c2goIGVsZW0gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpRdWVyeS5tZXJnZSggZm91bmQsIGdldEFsbCggZWxlbSwgdGFnICkgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFnID09PSB1bmRlZmluZWQgfHwgdGFnICYmIGpRdWVyeS5ub2RlTmFtZSggY29udGV4dCwgdGFnICkgP1xuICAgIGpRdWVyeS5tZXJnZSggWyBjb250ZXh0IF0sIGZvdW5kICkgOlxuICAgIGZvdW5kO1xufVxuXG4vLyBVc2VkIGluIGJ1aWxkRnJhZ21lbnQsIGZpeGVzIHRoZSBkZWZhdWx0Q2hlY2tlZCBwcm9wZXJ0eVxuZnVuY3Rpb24gZml4RGVmYXVsdENoZWNrZWQoIGVsZW0gKSB7XG4gIGlmICggcmNoZWNrYWJsZVR5cGUudGVzdCggZWxlbS50eXBlICkgKSB7XG4gICAgZWxlbS5kZWZhdWx0Q2hlY2tlZCA9IGVsZW0uY2hlY2tlZDtcbiAgfVxufVxuXG4vLyBTdXBwb3J0OiBJRTw4XG4vLyBNYW5pcHVsYXRpbmcgdGFibGVzIHJlcXVpcmVzIGEgdGJvZHlcbmZ1bmN0aW9uIG1hbmlwdWxhdGlvblRhcmdldCggZWxlbSwgY29udGVudCApIHtcbiAgcmV0dXJuIGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJ0YWJsZVwiICkgJiZcbiAgICBqUXVlcnkubm9kZU5hbWUoIGNvbnRlbnQubm9kZVR5cGUgIT09IDExID8gY29udGVudCA6IGNvbnRlbnQuZmlyc3RDaGlsZCwgXCJ0clwiICkgP1xuXG4gICAgZWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRib2R5XCIpWzBdIHx8XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKCBlbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpICkgOlxuICAgIGVsZW07XG59XG5cbi8vIFJlcGxhY2UvcmVzdG9yZSB0aGUgdHlwZSBhdHRyaWJ1dGUgb2Ygc2NyaXB0IGVsZW1lbnRzIGZvciBzYWZlIERPTSBtYW5pcHVsYXRpb25cbmZ1bmN0aW9uIGRpc2FibGVTY3JpcHQoIGVsZW0gKSB7XG4gIGVsZW0udHlwZSA9IChqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInR5cGVcIiApICE9PSBudWxsKSArIFwiL1wiICsgZWxlbS50eXBlO1xuICByZXR1cm4gZWxlbTtcbn1cbmZ1bmN0aW9uIHJlc3RvcmVTY3JpcHQoIGVsZW0gKSB7XG4gIHZhciBtYXRjaCA9IHJzY3JpcHRUeXBlTWFza2VkLmV4ZWMoIGVsZW0udHlwZSApO1xuICBpZiAoIG1hdGNoICkge1xuICAgIGVsZW0udHlwZSA9IG1hdGNoWzFdO1xuICB9IGVsc2Uge1xuICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKFwidHlwZVwiKTtcbiAgfVxuICByZXR1cm4gZWxlbTtcbn1cblxuLy8gTWFyayBzY3JpcHRzIGFzIGhhdmluZyBhbHJlYWR5IGJlZW4gZXZhbHVhdGVkXG5mdW5jdGlvbiBzZXRHbG9iYWxFdmFsKCBlbGVtcywgcmVmRWxlbWVudHMgKSB7XG4gIHZhciBlbGVtLFxuICAgIGkgPSAwO1xuICBmb3IgKCA7IChlbGVtID0gZWxlbXNbaV0pICE9IG51bGw7IGkrKyApIHtcbiAgICBqUXVlcnkuX2RhdGEoIGVsZW0sIFwiZ2xvYmFsRXZhbFwiLCAhcmVmRWxlbWVudHMgfHwgalF1ZXJ5Ll9kYXRhKCByZWZFbGVtZW50c1tpXSwgXCJnbG9iYWxFdmFsXCIgKSApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb25lQ29weUV2ZW50KCBzcmMsIGRlc3QgKSB7XG5cbiAgaWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxIHx8ICFqUXVlcnkuaGFzRGF0YSggc3JjICkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHR5cGUsIGksIGwsXG4gICAgb2xkRGF0YSA9IGpRdWVyeS5fZGF0YSggc3JjICksXG4gICAgY3VyRGF0YSA9IGpRdWVyeS5fZGF0YSggZGVzdCwgb2xkRGF0YSApLFxuICAgIGV2ZW50cyA9IG9sZERhdGEuZXZlbnRzO1xuXG4gIGlmICggZXZlbnRzICkge1xuICAgIGRlbGV0ZSBjdXJEYXRhLmhhbmRsZTtcbiAgICBjdXJEYXRhLmV2ZW50cyA9IHt9O1xuXG4gICAgZm9yICggdHlwZSBpbiBldmVudHMgKSB7XG4gICAgICBmb3IgKCBpID0gMCwgbCA9IGV2ZW50c1sgdHlwZSBdLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgalF1ZXJ5LmV2ZW50LmFkZCggZGVzdCwgdHlwZSwgZXZlbnRzWyB0eXBlIF1bIGkgXSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG1ha2UgdGhlIGNsb25lZCBwdWJsaWMgZGF0YSBvYmplY3QgYSBjb3B5IGZyb20gdGhlIG9yaWdpbmFsXG4gIGlmICggY3VyRGF0YS5kYXRhICkge1xuICAgIGN1ckRhdGEuZGF0YSA9IGpRdWVyeS5leHRlbmQoIHt9LCBjdXJEYXRhLmRhdGEgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaXhDbG9uZU5vZGVJc3N1ZXMoIHNyYywgZGVzdCApIHtcbiAgdmFyIG5vZGVOYW1lLCBlLCBkYXRhO1xuXG4gIC8vIFdlIGRvIG5vdCBuZWVkIHRvIGRvIGFueXRoaW5nIGZvciBub24tRWxlbWVudHNcbiAgaWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG5vZGVOYW1lID0gZGVzdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIElFNi04IGNvcGllcyBldmVudHMgYm91bmQgdmlhIGF0dGFjaEV2ZW50IHdoZW4gdXNpbmcgY2xvbmVOb2RlLlxuICBpZiAoICFzdXBwb3J0Lm5vQ2xvbmVFdmVudCAmJiBkZXN0WyBqUXVlcnkuZXhwYW5kbyBdICkge1xuICAgIGRhdGEgPSBqUXVlcnkuX2RhdGEoIGRlc3QgKTtcblxuICAgIGZvciAoIGUgaW4gZGF0YS5ldmVudHMgKSB7XG4gICAgICBqUXVlcnkucmVtb3ZlRXZlbnQoIGRlc3QsIGUsIGRhdGEuaGFuZGxlICk7XG4gICAgfVxuXG4gICAgLy8gRXZlbnQgZGF0YSBnZXRzIHJlZmVyZW5jZWQgaW5zdGVhZCBvZiBjb3BpZWQgaWYgdGhlIGV4cGFuZG8gZ2V0cyBjb3BpZWQgdG9vXG4gICAgZGVzdC5yZW1vdmVBdHRyaWJ1dGUoIGpRdWVyeS5leHBhbmRvICk7XG4gIH1cblxuICAvLyBJRSBibGFua3MgY29udGVudHMgd2hlbiBjbG9uaW5nIHNjcmlwdHMsIGFuZCB0cmllcyB0byBldmFsdWF0ZSBuZXdseS1zZXQgdGV4dFxuICBpZiAoIG5vZGVOYW1lID09PSBcInNjcmlwdFwiICYmIGRlc3QudGV4dCAhPT0gc3JjLnRleHQgKSB7XG4gICAgZGlzYWJsZVNjcmlwdCggZGVzdCApLnRleHQgPSBzcmMudGV4dDtcbiAgICByZXN0b3JlU2NyaXB0KCBkZXN0ICk7XG5cbiAgLy8gSUU2LTEwIGltcHJvcGVybHkgY2xvbmVzIGNoaWxkcmVuIG9mIG9iamVjdCBlbGVtZW50cyB1c2luZyBjbGFzc2lkLlxuICAvLyBJRTEwIHRocm93cyBOb01vZGlmaWNhdGlvbkFsbG93ZWRFcnJvciBpZiBwYXJlbnQgaXMgbnVsbCwgIzEyMTMyLlxuICB9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJvYmplY3RcIiApIHtcbiAgICBpZiAoIGRlc3QucGFyZW50Tm9kZSApIHtcbiAgICAgIGRlc3Qub3V0ZXJIVE1MID0gc3JjLm91dGVySFRNTDtcbiAgICB9XG5cbiAgICAvLyBUaGlzIHBhdGggYXBwZWFycyB1bmF2b2lkYWJsZSBmb3IgSUU5LiBXaGVuIGNsb25pbmcgYW4gb2JqZWN0XG4gICAgLy8gZWxlbWVudCBpbiBJRTksIHRoZSBvdXRlckhUTUwgc3RyYXRlZ3kgYWJvdmUgaXMgbm90IHN1ZmZpY2llbnQuXG4gICAgLy8gSWYgdGhlIHNyYyBoYXMgaW5uZXJIVE1MIGFuZCB0aGUgZGVzdGluYXRpb24gZG9lcyBub3QsXG4gICAgLy8gY29weSB0aGUgc3JjLmlubmVySFRNTCBpbnRvIHRoZSBkZXN0LmlubmVySFRNTC4gIzEwMzI0XG4gICAgaWYgKCBzdXBwb3J0Lmh0bWw1Q2xvbmUgJiYgKCBzcmMuaW5uZXJIVE1MICYmICFqUXVlcnkudHJpbShkZXN0LmlubmVySFRNTCkgKSApIHtcbiAgICAgIGRlc3QuaW5uZXJIVE1MID0gc3JjLmlubmVySFRNTDtcbiAgICB9XG5cbiAgfSBlbHNlIGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiByY2hlY2thYmxlVHlwZS50ZXN0KCBzcmMudHlwZSApICkge1xuICAgIC8vIElFNi04IGZhaWxzIHRvIHBlcnNpc3QgdGhlIGNoZWNrZWQgc3RhdGUgb2YgYSBjbG9uZWQgY2hlY2tib3hcbiAgICAvLyBvciByYWRpbyBidXR0b24uIFdvcnNlLCBJRTYtNyBmYWlsIHRvIGdpdmUgdGhlIGNsb25lZCBlbGVtZW50XG4gICAgLy8gYSBjaGVja2VkIGFwcGVhcmFuY2UgaWYgdGhlIGRlZmF1bHRDaGVja2VkIHZhbHVlIGlzbid0IGFsc28gc2V0XG5cbiAgICBkZXN0LmRlZmF1bHRDaGVja2VkID0gZGVzdC5jaGVja2VkID0gc3JjLmNoZWNrZWQ7XG5cbiAgICAvLyBJRTYtNyBnZXQgY29uZnVzZWQgYW5kIGVuZCB1cCBzZXR0aW5nIHRoZSB2YWx1ZSBvZiBhIGNsb25lZFxuICAgIC8vIGNoZWNrYm94L3JhZGlvIGJ1dHRvbiB0byBhbiBlbXB0eSBzdHJpbmcgaW5zdGVhZCBvZiBcIm9uXCJcbiAgICBpZiAoIGRlc3QudmFsdWUgIT09IHNyYy52YWx1ZSApIHtcbiAgICAgIGRlc3QudmFsdWUgPSBzcmMudmFsdWU7XG4gICAgfVxuXG4gIC8vIElFNi04IGZhaWxzIHRvIHJldHVybiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRvIHRoZSBkZWZhdWx0IHNlbGVjdGVkXG4gIC8vIHN0YXRlIHdoZW4gY2xvbmluZyBvcHRpb25zXG4gIH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcIm9wdGlvblwiICkge1xuICAgIGRlc3QuZGVmYXVsdFNlbGVjdGVkID0gZGVzdC5zZWxlY3RlZCA9IHNyYy5kZWZhdWx0U2VsZWN0ZWQ7XG5cbiAgLy8gSUU2LTggZmFpbHMgdG8gc2V0IHRoZSBkZWZhdWx0VmFsdWUgdG8gdGhlIGNvcnJlY3QgdmFsdWUgd2hlblxuICAvLyBjbG9uaW5nIG90aGVyIHR5cGVzIG9mIGlucHV0IGZpZWxkc1xuICB9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5vZGVOYW1lID09PSBcInRleHRhcmVhXCIgKSB7XG4gICAgZGVzdC5kZWZhdWx0VmFsdWUgPSBzcmMuZGVmYXVsdFZhbHVlO1xuICB9XG59XG5cbmpRdWVyeS5leHRlbmQoe1xuICBjbG9uZTogZnVuY3Rpb24oIGVsZW0sIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuICAgIHZhciBkZXN0RWxlbWVudHMsIG5vZGUsIGNsb25lLCBpLCBzcmNFbGVtZW50cyxcbiAgICAgIGluUGFnZSA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cbiAgICBpZiAoIHN1cHBvcnQuaHRtbDVDbG9uZSB8fCBqUXVlcnkuaXNYTUxEb2MoZWxlbSkgfHwgIXJub3NoaW1jYWNoZS50ZXN0KCBcIjxcIiArIGVsZW0ubm9kZU5hbWUgKyBcIj5cIiApICkge1xuICAgICAgY2xvbmUgPSBlbGVtLmNsb25lTm9kZSggdHJ1ZSApO1xuXG4gICAgLy8gSUU8PTggZG9lcyBub3QgcHJvcGVybHkgY2xvbmUgZGV0YWNoZWQsIHVua25vd24gZWxlbWVudCBub2Rlc1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmFnbWVudERpdi5pbm5lckhUTUwgPSBlbGVtLm91dGVySFRNTDtcbiAgICAgIGZyYWdtZW50RGl2LnJlbW92ZUNoaWxkKCBjbG9uZSA9IGZyYWdtZW50RGl2LmZpcnN0Q2hpbGQgKTtcbiAgICB9XG5cbiAgICBpZiAoICghc3VwcG9ydC5ub0Nsb25lRXZlbnQgfHwgIXN1cHBvcnQubm9DbG9uZUNoZWNrZWQpICYmXG4gICAgICAgIChlbGVtLm5vZGVUeXBlID09PSAxIHx8IGVsZW0ubm9kZVR5cGUgPT09IDExKSAmJiAhalF1ZXJ5LmlzWE1MRG9jKGVsZW0pICkge1xuXG4gICAgICAvLyBXZSBlc2NoZXcgU2l6emxlIGhlcmUgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnM6IGh0dHA6Ly9qc3BlcmYuY29tL2dldGFsbC12cy1zaXp6bGUvMlxuICAgICAgZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSApO1xuICAgICAgc3JjRWxlbWVudHMgPSBnZXRBbGwoIGVsZW0gKTtcblxuICAgICAgLy8gRml4IGFsbCBJRSBjbG9uaW5nIGlzc3Vlc1xuICAgICAgZm9yICggaSA9IDA7IChub2RlID0gc3JjRWxlbWVudHNbaV0pICE9IG51bGw7ICsraSApIHtcbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGRlc3RpbmF0aW9uIG5vZGUgaXMgbm90IG51bGw7IEZpeGVzICM5NTg3XG4gICAgICAgIGlmICggZGVzdEVsZW1lbnRzW2ldICkge1xuICAgICAgICAgIGZpeENsb25lTm9kZUlzc3Vlcyggbm9kZSwgZGVzdEVsZW1lbnRzW2ldICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb3B5IHRoZSBldmVudHMgZnJvbSB0aGUgb3JpZ2luYWwgdG8gdGhlIGNsb25lXG4gICAgaWYgKCBkYXRhQW5kRXZlbnRzICkge1xuICAgICAgaWYgKCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcbiAgICAgICAgc3JjRWxlbWVudHMgPSBzcmNFbGVtZW50cyB8fCBnZXRBbGwoIGVsZW0gKTtcbiAgICAgICAgZGVzdEVsZW1lbnRzID0gZGVzdEVsZW1lbnRzIHx8IGdldEFsbCggY2xvbmUgKTtcblxuICAgICAgICBmb3IgKCBpID0gMDsgKG5vZGUgPSBzcmNFbGVtZW50c1tpXSkgIT0gbnVsbDsgaSsrICkge1xuICAgICAgICAgIGNsb25lQ29weUV2ZW50KCBub2RlLCBkZXN0RWxlbWVudHNbaV0gKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xvbmVDb3B5RXZlbnQoIGVsZW0sIGNsb25lICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuICAgIGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUsIFwic2NyaXB0XCIgKTtcbiAgICBpZiAoIGRlc3RFbGVtZW50cy5sZW5ndGggPiAwICkge1xuICAgICAgc2V0R2xvYmFsRXZhbCggZGVzdEVsZW1lbnRzLCAhaW5QYWdlICYmIGdldEFsbCggZWxlbSwgXCJzY3JpcHRcIiApICk7XG4gICAgfVxuXG4gICAgZGVzdEVsZW1lbnRzID0gc3JjRWxlbWVudHMgPSBub2RlID0gbnVsbDtcblxuICAgIC8vIFJldHVybiB0aGUgY2xvbmVkIHNldFxuICAgIHJldHVybiBjbG9uZTtcbiAgfSxcblxuICBidWlsZEZyYWdtZW50OiBmdW5jdGlvbiggZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbiApIHtcbiAgICB2YXIgaiwgZWxlbSwgY29udGFpbnMsXG4gICAgICB0bXAsIHRhZywgdGJvZHksIHdyYXAsXG4gICAgICBsID0gZWxlbXMubGVuZ3RoLFxuXG4gICAgICAvLyBFbnN1cmUgYSBzYWZlIGZyYWdtZW50XG4gICAgICBzYWZlID0gY3JlYXRlU2FmZUZyYWdtZW50KCBjb250ZXh0ICksXG5cbiAgICAgIG5vZGVzID0gW10sXG4gICAgICBpID0gMDtcblxuICAgIGZvciAoIDsgaSA8IGw7IGkrKyApIHtcbiAgICAgIGVsZW0gPSBlbGVtc1sgaSBdO1xuXG4gICAgICBpZiAoIGVsZW0gfHwgZWxlbSA9PT0gMCApIHtcblxuICAgICAgICAvLyBBZGQgbm9kZXMgZGlyZWN0bHlcbiAgICAgICAgaWYgKCBqUXVlcnkudHlwZSggZWxlbSApID09PSBcIm9iamVjdFwiICkge1xuICAgICAgICAgIGpRdWVyeS5tZXJnZSggbm9kZXMsIGVsZW0ubm9kZVR5cGUgPyBbIGVsZW0gXSA6IGVsZW0gKTtcblxuICAgICAgICAvLyBDb252ZXJ0IG5vbi1odG1sIGludG8gYSB0ZXh0IG5vZGVcbiAgICAgICAgfSBlbHNlIGlmICggIXJodG1sLnRlc3QoIGVsZW0gKSApIHtcbiAgICAgICAgICBub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBlbGVtICkgKTtcblxuICAgICAgICAvLyBDb252ZXJ0IGh0bWwgaW50byBET00gbm9kZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0bXAgPSB0bXAgfHwgc2FmZS5hcHBlbmRDaGlsZCggY29udGV4dC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpICk7XG5cbiAgICAgICAgICAvLyBEZXNlcmlhbGl6ZSBhIHN0YW5kYXJkIHJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgdGFnID0gKHJ0YWdOYW1lLmV4ZWMoIGVsZW0gKSB8fCBbIFwiXCIsIFwiXCIgXSlbIDEgXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHdyYXAgPSB3cmFwTWFwWyB0YWcgXSB8fCB3cmFwTWFwLl9kZWZhdWx0O1xuXG4gICAgICAgICAgdG1wLmlubmVySFRNTCA9IHdyYXBbMV0gKyBlbGVtLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApICsgd3JhcFsyXTtcblxuICAgICAgICAgIC8vIERlc2NlbmQgdGhyb3VnaCB3cmFwcGVycyB0byB0aGUgcmlnaHQgY29udGVudFxuICAgICAgICAgIGogPSB3cmFwWzBdO1xuICAgICAgICAgIHdoaWxlICggai0tICkge1xuICAgICAgICAgICAgdG1wID0gdG1wLmxhc3RDaGlsZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBNYW51YWxseSBhZGQgbGVhZGluZyB3aGl0ZXNwYWNlIHJlbW92ZWQgYnkgSUVcbiAgICAgICAgICBpZiAoICFzdXBwb3J0LmxlYWRpbmdXaGl0ZXNwYWNlICYmIHJsZWFkaW5nV2hpdGVzcGFjZS50ZXN0KCBlbGVtICkgKSB7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBybGVhZGluZ1doaXRlc3BhY2UuZXhlYyggZWxlbSApWzBdICkgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBSZW1vdmUgSUUncyBhdXRvaW5zZXJ0ZWQgPHRib2R5PiBmcm9tIHRhYmxlIGZyYWdtZW50c1xuICAgICAgICAgIGlmICggIXN1cHBvcnQudGJvZHkgKSB7XG5cbiAgICAgICAgICAgIC8vIFN0cmluZyB3YXMgYSA8dGFibGU+LCAqbWF5KiBoYXZlIHNwdXJpb3VzIDx0Ym9keT5cbiAgICAgICAgICAgIGVsZW0gPSB0YWcgPT09IFwidGFibGVcIiAmJiAhcnRib2R5LnRlc3QoIGVsZW0gKSA/XG4gICAgICAgICAgICAgIHRtcC5maXJzdENoaWxkIDpcblxuICAgICAgICAgICAgICAvLyBTdHJpbmcgd2FzIGEgYmFyZSA8dGhlYWQ+IG9yIDx0Zm9vdD5cbiAgICAgICAgICAgICAgd3JhcFsxXSA9PT0gXCI8dGFibGU+XCIgJiYgIXJ0Ym9keS50ZXN0KCBlbGVtICkgP1xuICAgICAgICAgICAgICAgIHRtcCA6XG4gICAgICAgICAgICAgICAgMDtcblxuICAgICAgICAgICAgaiA9IGVsZW0gJiYgZWxlbS5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggai0tICkge1xuICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5ub2RlTmFtZSggKHRib2R5ID0gZWxlbS5jaGlsZE5vZGVzW2pdKSwgXCJ0Ym9keVwiICkgJiYgIXRib2R5LmNoaWxkTm9kZXMubGVuZ3RoICkge1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQ2hpbGQoIHRib2R5ICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBqUXVlcnkubWVyZ2UoIG5vZGVzLCB0bXAuY2hpbGROb2RlcyApO1xuXG4gICAgICAgICAgLy8gRml4ICMxMjM5MiBmb3IgV2ViS2l0IGFuZCBJRSA+IDlcbiAgICAgICAgICB0bXAudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAgICAgLy8gRml4ICMxMjM5MiBmb3Igb2xkSUVcbiAgICAgICAgICB3aGlsZSAoIHRtcC5maXJzdENoaWxkICkge1xuICAgICAgICAgICAgdG1wLnJlbW92ZUNoaWxkKCB0bXAuZmlyc3RDaGlsZCApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSB0b3AtbGV2ZWwgY29udGFpbmVyIGZvciBwcm9wZXIgY2xlYW51cFxuICAgICAgICAgIHRtcCA9IHNhZmUubGFzdENoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRml4ICMxMTM1NjogQ2xlYXIgZWxlbWVudHMgZnJvbSBmcmFnbWVudFxuICAgIGlmICggdG1wICkge1xuICAgICAgc2FmZS5yZW1vdmVDaGlsZCggdG1wICk7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgZGVmYXVsdENoZWNrZWQgZm9yIGFueSByYWRpb3MgYW5kIGNoZWNrYm94ZXNcbiAgICAvLyBhYm91dCB0byBiZSBhcHBlbmRlZCB0byB0aGUgRE9NIGluIElFIDYvNyAoIzgwNjApXG4gICAgaWYgKCAhc3VwcG9ydC5hcHBlbmRDaGVja2VkICkge1xuICAgICAgalF1ZXJ5LmdyZXAoIGdldEFsbCggbm9kZXMsIFwiaW5wdXRcIiApLCBmaXhEZWZhdWx0Q2hlY2tlZCApO1xuICAgIH1cblxuICAgIGkgPSAwO1xuICAgIHdoaWxlICggKGVsZW0gPSBub2Rlc1sgaSsrIF0pICkge1xuXG4gICAgICAvLyAjNDA4NyAtIElmIG9yaWdpbiBhbmQgZGVzdGluYXRpb24gZWxlbWVudHMgYXJlIHRoZSBzYW1lLCBhbmQgdGhpcyBpc1xuICAgICAgLy8gdGhhdCBlbGVtZW50LCBkbyBub3QgZG8gYW55dGhpbmdcbiAgICAgIGlmICggc2VsZWN0aW9uICYmIGpRdWVyeS5pbkFycmF5KCBlbGVtLCBzZWxlY3Rpb24gKSAhPT0gLTEgKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb250YWlucyA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cbiAgICAgIC8vIEFwcGVuZCB0byBmcmFnbWVudFxuICAgICAgdG1wID0gZ2V0QWxsKCBzYWZlLmFwcGVuZENoaWxkKCBlbGVtICksIFwic2NyaXB0XCIgKTtcblxuICAgICAgLy8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuICAgICAgaWYgKCBjb250YWlucyApIHtcbiAgICAgICAgc2V0R2xvYmFsRXZhbCggdG1wICk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhcHR1cmUgZXhlY3V0YWJsZXNcbiAgICAgIGlmICggc2NyaXB0cyApIHtcbiAgICAgICAgaiA9IDA7XG4gICAgICAgIHdoaWxlICggKGVsZW0gPSB0bXBbIGorKyBdKSApIHtcbiAgICAgICAgICBpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIGVsZW0udHlwZSB8fCBcIlwiICkgKSB7XG4gICAgICAgICAgICBzY3JpcHRzLnB1c2goIGVsZW0gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0bXAgPSBudWxsO1xuXG4gICAgcmV0dXJuIHNhZmU7XG4gIH0sXG5cbiAgY2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMsIC8qIGludGVybmFsICovIGFjY2VwdERhdGEgKSB7XG4gICAgdmFyIGVsZW0sIHR5cGUsIGlkLCBkYXRhLFxuICAgICAgaSA9IDAsXG4gICAgICBpbnRlcm5hbEtleSA9IGpRdWVyeS5leHBhbmRvLFxuICAgICAgY2FjaGUgPSBqUXVlcnkuY2FjaGUsXG4gICAgICBkZWxldGVFeHBhbmRvID0gc3VwcG9ydC5kZWxldGVFeHBhbmRvLFxuICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsO1xuXG4gICAgZm9yICggOyAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XG4gICAgICBpZiAoIGFjY2VwdERhdGEgfHwgalF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuICAgICAgICBpZCA9IGVsZW1bIGludGVybmFsS2V5IF07XG4gICAgICAgIGRhdGEgPSBpZCAmJiBjYWNoZVsgaWQgXTtcblxuICAgICAgICBpZiAoIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKCBkYXRhLmV2ZW50cyApIHtcbiAgICAgICAgICAgIGZvciAoIHR5cGUgaW4gZGF0YS5ldmVudHMgKSB7XG4gICAgICAgICAgICAgIGlmICggc3BlY2lhbFsgdHlwZSBdICkge1xuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKTtcblxuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgc2hvcnRjdXQgdG8gYXZvaWQgalF1ZXJ5LmV2ZW50LnJlbW92ZSdzIG92ZXJoZWFkXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBkYXRhLmhhbmRsZSApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUmVtb3ZlIGNhY2hlIG9ubHkgaWYgaXQgd2FzIG5vdCBhbHJlYWR5IHJlbW92ZWQgYnkgalF1ZXJ5LmV2ZW50LnJlbW92ZVxuICAgICAgICAgIGlmICggY2FjaGVbIGlkIF0gKSB7XG5cbiAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVsgaWQgXTtcblxuICAgICAgICAgICAgLy8gSUUgZG9lcyBub3QgYWxsb3cgdXMgdG8gZGVsZXRlIGV4cGFuZG8gcHJvcGVydGllcyBmcm9tIG5vZGVzLFxuICAgICAgICAgICAgLy8gbm9yIGRvZXMgaXQgaGF2ZSBhIHJlbW92ZUF0dHJpYnV0ZSBmdW5jdGlvbiBvbiBEb2N1bWVudCBub2RlcztcbiAgICAgICAgICAgIC8vIHdlIG11c3QgaGFuZGxlIGFsbCBvZiB0aGVzZSBjYXNlc1xuICAgICAgICAgICAgaWYgKCBkZWxldGVFeHBhbmRvICkge1xuICAgICAgICAgICAgICBkZWxldGUgZWxlbVsgaW50ZXJuYWxLZXkgXTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIGVsZW0ucmVtb3ZlQXR0cmlidXRlICE9PSBzdHJ1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBpbnRlcm5hbEtleSApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtWyBpbnRlcm5hbEtleSBdID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlZElkcy5wdXNoKCBpZCApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICB0ZXh0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgcmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuICAgICAgICBqUXVlcnkudGV4dCggdGhpcyApIDpcbiAgICAgICAgdGhpcy5lbXB0eSgpLmFwcGVuZCggKCB0aGlzWzBdICYmIHRoaXNbMF0ub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCApLmNyZWF0ZVRleHROb2RlKCB2YWx1ZSApICk7XG4gICAgfSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcbiAgfSxcblxuICBhcHBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgaWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKCBlbGVtICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgcHJlcGVuZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICBpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0YXJnZXQuZmlyc3RDaGlsZCApO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGJlZm9yZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICBpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcyApO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGFmdGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kb21NYW5pcCggYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzLm5leHRTaWJsaW5nICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbiggc2VsZWN0b3IsIGtlZXBEYXRhIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuICAgIHZhciBlbGVtLFxuICAgICAgZWxlbXMgPSBzZWxlY3RvciA/IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCB0aGlzICkgOiB0aGlzLFxuICAgICAgaSA9IDA7XG5cbiAgICBmb3IgKCA7IChlbGVtID0gZWxlbXNbaV0pICE9IG51bGw7IGkrKyApIHtcblxuICAgICAgaWYgKCAha2VlcERhdGEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgalF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtICkgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCBlbGVtLnBhcmVudE5vZGUgKSB7XG4gICAgICAgIGlmICgga2VlcERhdGEgJiYgalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSApIHtcbiAgICAgICAgICBzZXRHbG9iYWxFdmFsKCBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xuICAgICAgICB9XG4gICAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWxlbSApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGVtcHR5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWxlbSxcbiAgICAgIGkgPSAwO1xuXG4gICAgZm9yICggOyAoZWxlbSA9IHRoaXNbaV0pICE9IG51bGw7IGkrKyApIHtcbiAgICAgIC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuICAgICAgICBqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIGFueSByZW1haW5pbmcgbm9kZXNcbiAgICAgIHdoaWxlICggZWxlbS5maXJzdENoaWxkICkge1xuICAgICAgICBlbGVtLnJlbW92ZUNoaWxkKCBlbGVtLmZpcnN0Q2hpbGQgKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHNlbGVjdCwgZW5zdXJlIHRoYXQgaXQgZGlzcGxheXMgZW1wdHkgKCMxMjMzNilcbiAgICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAgIGlmICggZWxlbS5vcHRpb25zICYmIGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJzZWxlY3RcIiApICkge1xuICAgICAgICBlbGVtLm9wdGlvbnMubGVuZ3RoID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBjbG9uZTogZnVuY3Rpb24oIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuICAgIGRhdGFBbmRFdmVudHMgPSBkYXRhQW5kRXZlbnRzID09IG51bGwgPyBmYWxzZSA6IGRhdGFBbmRFdmVudHM7XG4gICAgZGVlcERhdGFBbmRFdmVudHMgPSBkZWVwRGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZGF0YUFuZEV2ZW50cyA6IGRlZXBEYXRhQW5kRXZlbnRzO1xuXG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGpRdWVyeS5jbG9uZSggdGhpcywgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKTtcbiAgICB9KTtcbiAgfSxcblxuICBodG1sOiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgcmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuICAgICAgdmFyIGVsZW0gPSB0aGlzWyAwIF0gfHwge30sXG4gICAgICAgIGkgPSAwLFxuICAgICAgICBsID0gdGhpcy5sZW5ndGg7XG5cbiAgICAgIGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgcmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDEgP1xuICAgICAgICAgIGVsZW0uaW5uZXJIVE1MLnJlcGxhY2UoIHJpbmxpbmVqUXVlcnksIFwiXCIgKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICAvLyBTZWUgaWYgd2UgY2FuIHRha2UgYSBzaG9ydGN1dCBhbmQganVzdCB1c2UgaW5uZXJIVE1MXG4gICAgICBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAhcm5vSW5uZXJodG1sLnRlc3QoIHZhbHVlICkgJiZcbiAgICAgICAgKCBzdXBwb3J0Lmh0bWxTZXJpYWxpemUgfHwgIXJub3NoaW1jYWNoZS50ZXN0KCB2YWx1ZSApICApICYmXG4gICAgICAgICggc3VwcG9ydC5sZWFkaW5nV2hpdGVzcGFjZSB8fCAhcmxlYWRpbmdXaGl0ZXNwYWNlLnRlc3QoIHZhbHVlICkgKSAmJlxuICAgICAgICAhd3JhcE1hcFsgKHJ0YWdOYW1lLmV4ZWMoIHZhbHVlICkgfHwgWyBcIlwiLCBcIlwiIF0pWyAxIF0udG9Mb3dlckNhc2UoKSBdICkge1xuXG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSggcnhodG1sVGFnLCBcIjwkMT48LyQyPlwiICk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuICAgICAgICAgICAgZWxlbSA9IHRoaXNbaV0gfHwge307XG4gICAgICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG4gICAgICAgICAgICAgIGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsZW0gPSAwO1xuXG4gICAgICAgIC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxuICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICB9XG5cbiAgICAgIGlmICggZWxlbSApIHtcbiAgICAgICAgdGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcbiAgICAgIH1cbiAgICB9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuICB9LFxuXG4gIHJlcGxhY2VXaXRoOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJnID0gYXJndW1lbnRzWyAwIF07XG5cbiAgICAvLyBNYWtlIHRoZSBjaGFuZ2VzLCByZXBsYWNpbmcgZWFjaCBjb250ZXh0IGVsZW1lbnQgd2l0aCB0aGUgbmV3IGNvbnRlbnRcbiAgICB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgYXJnID0gdGhpcy5wYXJlbnROb2RlO1xuXG4gICAgICBqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIHRoaXMgKSApO1xuXG4gICAgICBpZiAoIGFyZyApIHtcbiAgICAgICAgYXJnLnJlcGxhY2VDaGlsZCggZWxlbSwgdGhpcyApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRm9yY2UgcmVtb3ZhbCBpZiB0aGVyZSB3YXMgbm8gbmV3IGNvbnRlbnQgKGUuZy4sIGZyb20gZW1wdHkgYXJndW1lbnRzKVxuICAgIHJldHVybiBhcmcgJiYgKGFyZy5sZW5ndGggfHwgYXJnLm5vZGVUeXBlKSA/IHRoaXMgOiB0aGlzLnJlbW92ZSgpO1xuICB9LFxuXG4gIGRldGFjaDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgIHJldHVybiB0aGlzLnJlbW92ZSggc2VsZWN0b3IsIHRydWUgKTtcbiAgfSxcblxuICBkb21NYW5pcDogZnVuY3Rpb24oIGFyZ3MsIGNhbGxiYWNrICkge1xuXG4gICAgLy8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuICAgIGFyZ3MgPSBjb25jYXQuYXBwbHkoIFtdLCBhcmdzICk7XG5cbiAgICB2YXIgZmlyc3QsIG5vZGUsIGhhc1NjcmlwdHMsXG4gICAgICBzY3JpcHRzLCBkb2MsIGZyYWdtZW50LFxuICAgICAgaSA9IDAsXG4gICAgICBsID0gdGhpcy5sZW5ndGgsXG4gICAgICBzZXQgPSB0aGlzLFxuICAgICAgaU5vQ2xvbmUgPSBsIC0gMSxcbiAgICAgIHZhbHVlID0gYXJnc1swXSxcbiAgICAgIGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuICAgIC8vIFdlIGNhbid0IGNsb25lTm9kZSBmcmFnbWVudHMgdGhhdCBjb250YWluIGNoZWNrZWQsIGluIFdlYktpdFxuICAgIGlmICggaXNGdW5jdGlvbiB8fFxuICAgICAgICAoIGwgPiAxICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICFzdXBwb3J0LmNoZWNrQ2xvbmUgJiYgcmNoZWNrZWQudGVzdCggdmFsdWUgKSApICkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaW5kZXggKSB7XG4gICAgICAgIHZhciBzZWxmID0gc2V0LmVxKCBpbmRleCApO1xuICAgICAgICBpZiAoIGlzRnVuY3Rpb24gKSB7XG4gICAgICAgICAgYXJnc1swXSA9IHZhbHVlLmNhbGwoIHRoaXMsIGluZGV4LCBzZWxmLmh0bWwoKSApO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZG9tTWFuaXAoIGFyZ3MsIGNhbGxiYWNrICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIGwgKSB7XG4gICAgICBmcmFnbWVudCA9IGpRdWVyeS5idWlsZEZyYWdtZW50KCBhcmdzLCB0aGlzWyAwIF0ub3duZXJEb2N1bWVudCwgZmFsc2UsIHRoaXMgKTtcbiAgICAgIGZpcnN0ID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuICAgICAgaWYgKCBmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgICAgZnJhZ21lbnQgPSBmaXJzdDtcbiAgICAgIH1cblxuICAgICAgaWYgKCBmaXJzdCApIHtcbiAgICAgICAgc2NyaXB0cyA9IGpRdWVyeS5tYXAoIGdldEFsbCggZnJhZ21lbnQsIFwic2NyaXB0XCIgKSwgZGlzYWJsZVNjcmlwdCApO1xuICAgICAgICBoYXNTY3JpcHRzID0gc2NyaXB0cy5sZW5ndGg7XG5cbiAgICAgICAgLy8gVXNlIHRoZSBvcmlnaW5hbCBmcmFnbWVudCBmb3IgdGhlIGxhc3QgaXRlbSBpbnN0ZWFkIG9mIHRoZSBmaXJzdCBiZWNhdXNlIGl0IGNhbiBlbmQgdXBcbiAgICAgICAgLy8gYmVpbmcgZW1wdGllZCBpbmNvcnJlY3RseSBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgKCM4MDcwKS5cbiAgICAgICAgZm9yICggOyBpIDwgbDsgaSsrICkge1xuICAgICAgICAgIG5vZGUgPSBmcmFnbWVudDtcblxuICAgICAgICAgIGlmICggaSAhPT0gaU5vQ2xvbmUgKSB7XG4gICAgICAgICAgICBub2RlID0galF1ZXJ5LmNsb25lKCBub2RlLCB0cnVlLCB0cnVlICk7XG5cbiAgICAgICAgICAgIC8vIEtlZXAgcmVmZXJlbmNlcyB0byBjbG9uZWQgc2NyaXB0cyBmb3IgbGF0ZXIgcmVzdG9yYXRpb25cbiAgICAgICAgICAgIGlmICggaGFzU2NyaXB0cyApIHtcbiAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKCBzY3JpcHRzLCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoIHRoaXNbaV0sIG5vZGUsIGkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaGFzU2NyaXB0cyApIHtcbiAgICAgICAgICBkb2MgPSBzY3JpcHRzWyBzY3JpcHRzLmxlbmd0aCAtIDEgXS5vd25lckRvY3VtZW50O1xuXG4gICAgICAgICAgLy8gUmVlbmFibGUgc2NyaXB0c1xuICAgICAgICAgIGpRdWVyeS5tYXAoIHNjcmlwdHMsIHJlc3RvcmVTY3JpcHQgKTtcblxuICAgICAgICAgIC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cbiAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGhhc1NjcmlwdHM7IGkrKyApIHtcbiAgICAgICAgICAgIG5vZGUgPSBzY3JpcHRzWyBpIF07XG4gICAgICAgICAgICBpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIG5vZGUudHlwZSB8fCBcIlwiICkgJiZcbiAgICAgICAgICAgICAgIWpRdWVyeS5fZGF0YSggbm9kZSwgXCJnbG9iYWxFdmFsXCIgKSAmJiBqUXVlcnkuY29udGFpbnMoIGRvYywgbm9kZSApICkge1xuXG4gICAgICAgICAgICAgIGlmICggbm9kZS5zcmMgKSB7XG4gICAgICAgICAgICAgICAgLy8gT3B0aW9uYWwgQUpBWCBkZXBlbmRlbmN5LCBidXQgd29uJ3QgcnVuIHNjcmlwdHMgaWYgbm90IHByZXNlbnRcbiAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5fZXZhbFVybCApIHtcbiAgICAgICAgICAgICAgICAgIGpRdWVyeS5fZXZhbFVybCggbm9kZS5zcmMgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5Lmdsb2JhbEV2YWwoICggbm9kZS50ZXh0IHx8IG5vZGUudGV4dENvbnRlbnQgfHwgbm9kZS5pbm5lckhUTUwgfHwgXCJcIiApLnJlcGxhY2UoIHJjbGVhblNjcmlwdCwgXCJcIiApICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaXggIzExODA5OiBBdm9pZCBsZWFraW5nIG1lbW9yeVxuICAgICAgICBmcmFnbWVudCA9IGZpcnN0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSk7XG5cbmpRdWVyeS5lYWNoKHtcbiAgYXBwZW5kVG86IFwiYXBwZW5kXCIsXG4gIHByZXBlbmRUbzogXCJwcmVwZW5kXCIsXG4gIGluc2VydEJlZm9yZTogXCJiZWZvcmVcIixcbiAgaW5zZXJ0QWZ0ZXI6IFwiYWZ0ZXJcIixcbiAgcmVwbGFjZUFsbDogXCJyZXBsYWNlV2l0aFwiXG59LCBmdW5jdGlvbiggbmFtZSwgb3JpZ2luYWwgKSB7XG4gIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgIHZhciBlbGVtcyxcbiAgICAgIGkgPSAwLFxuICAgICAgcmV0ID0gW10sXG4gICAgICBpbnNlcnQgPSBqUXVlcnkoIHNlbGVjdG9yICksXG4gICAgICBsYXN0ID0gaW5zZXJ0Lmxlbmd0aCAtIDE7XG5cbiAgICBmb3IgKCA7IGkgPD0gbGFzdDsgaSsrICkge1xuICAgICAgZWxlbXMgPSBpID09PSBsYXN0ID8gdGhpcyA6IHRoaXMuY2xvbmUodHJ1ZSk7XG4gICAgICBqUXVlcnkoIGluc2VydFtpXSApWyBvcmlnaW5hbCBdKCBlbGVtcyApO1xuXG4gICAgICAvLyBNb2Rlcm4gYnJvd3NlcnMgY2FuIGFwcGx5IGpRdWVyeSBjb2xsZWN0aW9ucyBhcyBhcnJheXMsIGJ1dCBvbGRJRSBuZWVkcyBhIC5nZXQoKVxuICAgICAgcHVzaC5hcHBseSggcmV0LCBlbGVtcy5nZXQoKSApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggcmV0ICk7XG4gIH07XG59KTtcblxuXG52YXIgaWZyYW1lLFxuICBlbGVtZGlzcGxheSA9IHt9O1xuXG4vKipcbiAqIFJldHJpZXZlIHRoZSBhY3R1YWwgZGlzcGxheSBvZiBhIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG5vZGVOYW1lIG9mIHRoZSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIERvY3VtZW50IG9iamVjdFxuICovXG4vLyBDYWxsZWQgb25seSBmcm9tIHdpdGhpbiBkZWZhdWx0RGlzcGxheVxuZnVuY3Rpb24gYWN0dWFsRGlzcGxheSggbmFtZSwgZG9jICkge1xuICB2YXIgc3R5bGUsXG4gICAgZWxlbSA9IGpRdWVyeSggZG9jLmNyZWF0ZUVsZW1lbnQoIG5hbWUgKSApLmFwcGVuZFRvKCBkb2MuYm9keSApLFxuXG4gICAgLy8gZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgbWlnaHQgYmUgcmVsaWFibHkgdXNlZCBvbmx5IG9uIGF0dGFjaGVkIGVsZW1lbnRcbiAgICBkaXNwbGF5ID0gd2luZG93LmdldERlZmF1bHRDb21wdXRlZFN0eWxlICYmICggc3R5bGUgPSB3aW5kb3cuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUoIGVsZW1bIDAgXSApICkgP1xuXG4gICAgICAvLyBVc2Ugb2YgdGhpcyBtZXRob2QgaXMgYSB0ZW1wb3JhcnkgZml4IChtb3JlIGxpa2Ugb3B0bWl6YXRpb24pIHVudGlsIHNvbWV0aGluZyBiZXR0ZXIgY29tZXMgYWxvbmcsXG4gICAgICAvLyBzaW5jZSBpdCB3YXMgcmVtb3ZlZCBmcm9tIHNwZWNpZmljYXRpb24gYW5kIHN1cHBvcnRlZCBvbmx5IGluIEZGXG4gICAgICBzdHlsZS5kaXNwbGF5IDogalF1ZXJ5LmNzcyggZWxlbVsgMCBdLCBcImRpc3BsYXlcIiApO1xuXG4gIC8vIFdlIGRvbid0IGhhdmUgYW55IGRhdGEgc3RvcmVkIG9uIHRoZSBlbGVtZW50LFxuICAvLyBzbyB1c2UgXCJkZXRhY2hcIiBtZXRob2QgYXMgZmFzdCB3YXkgdG8gZ2V0IHJpZCBvZiB0aGUgZWxlbWVudFxuICBlbGVtLmRldGFjaCgpO1xuXG4gIHJldHVybiBkaXNwbGF5O1xufVxuXG4vKipcbiAqIFRyeSB0byBkZXRlcm1pbmUgdGhlIGRlZmF1bHQgZGlzcGxheSB2YWx1ZSBvZiBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gbm9kZU5hbWVcbiAqL1xuZnVuY3Rpb24gZGVmYXVsdERpc3BsYXkoIG5vZGVOYW1lICkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgZGlzcGxheSA9IGVsZW1kaXNwbGF5WyBub2RlTmFtZSBdO1xuXG4gIGlmICggIWRpc3BsYXkgKSB7XG4gICAgZGlzcGxheSA9IGFjdHVhbERpc3BsYXkoIG5vZGVOYW1lLCBkb2MgKTtcblxuICAgIC8vIElmIHRoZSBzaW1wbGUgd2F5IGZhaWxzLCByZWFkIGZyb20gaW5zaWRlIGFuIGlmcmFtZVxuICAgIGlmICggZGlzcGxheSA9PT0gXCJub25lXCIgfHwgIWRpc3BsYXkgKSB7XG5cbiAgICAgIC8vIFVzZSB0aGUgYWxyZWFkeS1jcmVhdGVkIGlmcmFtZSBpZiBwb3NzaWJsZVxuICAgICAgaWZyYW1lID0gKGlmcmFtZSB8fCBqUXVlcnkoIFwiPGlmcmFtZSBmcmFtZWJvcmRlcj0nMCcgd2lkdGg9JzAnIGhlaWdodD0nMCcvPlwiICkpLmFwcGVuZFRvKCBkb2MuZG9jdW1lbnRFbGVtZW50ICk7XG5cbiAgICAgIC8vIEFsd2F5cyB3cml0ZSBhIG5ldyBIVE1MIHNrZWxldG9uIHNvIFdlYmtpdCBhbmQgRmlyZWZveCBkb24ndCBjaG9rZSBvbiByZXVzZVxuICAgICAgZG9jID0gKCBpZnJhbWVbIDAgXS5jb250ZW50V2luZG93IHx8IGlmcmFtZVsgMCBdLmNvbnRlbnREb2N1bWVudCApLmRvY3VtZW50O1xuXG4gICAgICAvLyBTdXBwb3J0OiBJRVxuICAgICAgZG9jLndyaXRlKCk7XG4gICAgICBkb2MuY2xvc2UoKTtcblxuICAgICAgZGlzcGxheSA9IGFjdHVhbERpc3BsYXkoIG5vZGVOYW1lLCBkb2MgKTtcbiAgICAgIGlmcmFtZS5kZXRhY2goKTtcbiAgICB9XG5cbiAgICAvLyBTdG9yZSB0aGUgY29ycmVjdCBkZWZhdWx0IGRpc3BsYXlcbiAgICBlbGVtZGlzcGxheVsgbm9kZU5hbWUgXSA9IGRpc3BsYXk7XG4gIH1cblxuICByZXR1cm4gZGlzcGxheTtcbn1cblxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBzaHJpbmtXcmFwQmxvY2tzVmFsO1xuXG4gIHN1cHBvcnQuc2hyaW5rV3JhcEJsb2NrcyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggc2hyaW5rV3JhcEJsb2Nrc1ZhbCAhPSBudWxsICkge1xuICAgICAgcmV0dXJuIHNocmlua1dyYXBCbG9ja3NWYWw7XG4gICAgfVxuXG4gICAgLy8gV2lsbCBiZSBjaGFuZ2VkIGxhdGVyIGlmIG5lZWRlZC5cbiAgICBzaHJpbmtXcmFwQmxvY2tzVmFsID0gZmFsc2U7XG5cbiAgICAvLyBNaW5pZmllZDogdmFyIGIsYyxkXG4gICAgdmFyIGRpdiwgYm9keSwgY29udGFpbmVyO1xuXG4gICAgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImJvZHlcIiApWyAwIF07XG4gICAgaWYgKCAhYm9keSB8fCAhYm9keS5zdHlsZSApIHtcbiAgICAgIC8vIFRlc3QgZmlyZWQgdG9vIGVhcmx5IG9yIGluIGFuIHVuc3VwcG9ydGVkIGVudmlyb25tZW50LCBleGl0LlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldHVwXG4gICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcbiAgICBjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyOjA7d2lkdGg6MDtoZWlnaHQ6MDt0b3A6MDtsZWZ0Oi05OTk5cHhcIjtcbiAgICBib2R5LmFwcGVuZENoaWxkKCBjb250YWluZXIgKS5hcHBlbmRDaGlsZCggZGl2ICk7XG5cbiAgICAvLyBTdXBwb3J0OiBJRTZcbiAgICAvLyBDaGVjayBpZiBlbGVtZW50cyB3aXRoIGxheW91dCBzaHJpbmstd3JhcCB0aGVpciBjaGlsZHJlblxuICAgIGlmICggdHlwZW9mIGRpdi5zdHlsZS56b29tICE9PSBzdHJ1bmRlZmluZWQgKSB7XG4gICAgICAvLyBSZXNldCBDU1M6IGJveC1zaXppbmc7IGRpc3BsYXk7IG1hcmdpbjsgYm9yZGVyXG4gICAgICBkaXYuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAgIC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjksIEFuZHJvaWQgMi4zXG4gICAgICAgIC8vIFZlbmRvci1wcmVmaXggYm94LXNpemluZ1xuICAgICAgICBcIi13ZWJraXQtYm94LXNpemluZzpjb250ZW50LWJveDstbW96LWJveC1zaXppbmc6Y29udGVudC1ib3g7XCIgK1xuICAgICAgICBcImJveC1zaXppbmc6Y29udGVudC1ib3g7ZGlzcGxheTpibG9jazttYXJnaW46MDtib3JkZXI6MDtcIiArXG4gICAgICAgIFwicGFkZGluZzoxcHg7d2lkdGg6MXB4O3pvb206MVwiO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKS5zdHlsZS53aWR0aCA9IFwiNXB4XCI7XG4gICAgICBzaHJpbmtXcmFwQmxvY2tzVmFsID0gZGl2Lm9mZnNldFdpZHRoICE9PSAzO1xuICAgIH1cblxuICAgIGJvZHkucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApO1xuXG4gICAgcmV0dXJuIHNocmlua1dyYXBCbG9ja3NWYWw7XG4gIH07XG5cbn0pKCk7XG52YXIgcm1hcmdpbiA9ICgvXm1hcmdpbi8pO1xuXG52YXIgcm51bW5vbnB4ID0gbmV3IFJlZ0V4cCggXCJeKFwiICsgcG51bSArIFwiKSg/IXB4KVthLXolXSskXCIsIFwiaVwiICk7XG5cblxuXG52YXIgZ2V0U3R5bGVzLCBjdXJDU1MsXG4gIHJwb3NpdGlvbiA9IC9eKHRvcHxyaWdodHxib3R0b218bGVmdCkkLztcblxuaWYgKCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSApIHtcbiAgZ2V0U3R5bGVzID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgLy8gU3VwcG9ydDogSUU8PTExKywgRmlyZWZveDw9MzArICgjMTUwOTgsICMxNDE1MClcbiAgICAvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcbiAgICAvLyBGRiBtZWFud2hpbGUgdGhyb3dzIG9uIGZyYW1lIGVsZW1lbnRzIHRocm91Z2ggXCJkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlXCJcbiAgICBpZiAoIGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5vcGVuZXIgKSB7XG4gICAgICByZXR1cm4gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoIGVsZW0sIG51bGwgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGVsZW0sIG51bGwgKTtcbiAgfTtcblxuICBjdXJDU1MgPSBmdW5jdGlvbiggZWxlbSwgbmFtZSwgY29tcHV0ZWQgKSB7XG4gICAgdmFyIHdpZHRoLCBtaW5XaWR0aCwgbWF4V2lkdGgsIHJldCxcbiAgICAgIHN0eWxlID0gZWxlbS5zdHlsZTtcblxuICAgIGNvbXB1dGVkID0gY29tcHV0ZWQgfHwgZ2V0U3R5bGVzKCBlbGVtICk7XG5cbiAgICAvLyBnZXRQcm9wZXJ0eVZhbHVlIGlzIG9ubHkgbmVlZGVkIGZvciAuY3NzKCdmaWx0ZXInKSBpbiBJRTksIHNlZSAjMTI1MzdcbiAgICByZXQgPSBjb21wdXRlZCA/IGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoIG5hbWUgKSB8fCBjb21wdXRlZFsgbmFtZSBdIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKCBjb21wdXRlZCApIHtcblxuICAgICAgaWYgKCByZXQgPT09IFwiXCIgJiYgIWpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgKSB7XG4gICAgICAgIHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xuICAgICAgfVxuXG4gICAgICAvLyBBIHRyaWJ1dGUgdG8gdGhlIFwiYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1wiXG4gICAgICAvLyBDaHJvbWUgPCAxNyBhbmQgU2FmYXJpIDUuMCB1c2VzIFwiY29tcHV0ZWQgdmFsdWVcIiBpbnN0ZWFkIG9mIFwidXNlZCB2YWx1ZVwiIGZvciBtYXJnaW4tcmlnaHRcbiAgICAgIC8vIFNhZmFyaSA1LjEuNyAoYXQgbGVhc3QpIHJldHVybnMgcGVyY2VudGFnZSBmb3IgYSBsYXJnZXIgc2V0IG9mIHZhbHVlcywgYnV0IHdpZHRoIHNlZW1zIHRvIGJlIHJlbGlhYmx5IHBpeGVsc1xuICAgICAgLy8gdGhpcyBpcyBhZ2FpbnN0IHRoZSBDU1NPTSBkcmFmdCBzcGVjOiBodHRwOi8vZGV2LnczLm9yZy9jc3N3Zy9jc3NvbS8jcmVzb2x2ZWQtdmFsdWVzXG4gICAgICBpZiAoIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiBybWFyZ2luLnRlc3QoIG5hbWUgKSApIHtcblxuICAgICAgICAvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXG4gICAgICAgIHdpZHRoID0gc3R5bGUud2lkdGg7XG4gICAgICAgIG1pbldpZHRoID0gc3R5bGUubWluV2lkdGg7XG4gICAgICAgIG1heFdpZHRoID0gc3R5bGUubWF4V2lkdGg7XG5cbiAgICAgICAgLy8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxuICAgICAgICBzdHlsZS5taW5XaWR0aCA9IHN0eWxlLm1heFdpZHRoID0gc3R5bGUud2lkdGggPSByZXQ7XG4gICAgICAgIHJldCA9IGNvbXB1dGVkLndpZHRoO1xuXG4gICAgICAgIC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcbiAgICAgICAgc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgc3R5bGUubWluV2lkdGggPSBtaW5XaWR0aDtcbiAgICAgICAgc3R5bGUubWF4V2lkdGggPSBtYXhXaWR0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdXBwb3J0OiBJRVxuICAgIC8vIElFIHJldHVybnMgekluZGV4IHZhbHVlIGFzIGFuIGludGVnZXIuXG4gICAgcmV0dXJuIHJldCA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHJldCA6XG4gICAgICByZXQgKyBcIlwiO1xuICB9O1xufSBlbHNlIGlmICggZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmN1cnJlbnRTdHlsZSApIHtcbiAgZ2V0U3R5bGVzID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIGVsZW0uY3VycmVudFN0eWxlO1xuICB9O1xuXG4gIGN1ckNTUyA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBjb21wdXRlZCApIHtcbiAgICB2YXIgbGVmdCwgcnMsIHJzTGVmdCwgcmV0LFxuICAgICAgc3R5bGUgPSBlbGVtLnN0eWxlO1xuXG4gICAgY29tcHV0ZWQgPSBjb21wdXRlZCB8fCBnZXRTdHlsZXMoIGVsZW0gKTtcbiAgICByZXQgPSBjb21wdXRlZCA/IGNvbXB1dGVkWyBuYW1lIF0gOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBBdm9pZCBzZXR0aW5nIHJldCB0byBlbXB0eSBzdHJpbmcgaGVyZVxuICAgIC8vIHNvIHdlIGRvbid0IGRlZmF1bHQgdG8gYXV0b1xuICAgIGlmICggcmV0ID09IG51bGwgJiYgc3R5bGUgJiYgc3R5bGVbIG5hbWUgXSApIHtcbiAgICAgIHJldCA9IHN0eWxlWyBuYW1lIF07XG4gICAgfVxuXG4gICAgLy8gRnJvbSB0aGUgYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1xuICAgIC8vIGh0dHA6Ly9lcmlrLmVhZS5uZXQvYXJjaGl2ZXMvMjAwNy8wNy8yNy8xOC41NC4xNS8jY29tbWVudC0xMDIyOTFcblxuICAgIC8vIElmIHdlJ3JlIG5vdCBkZWFsaW5nIHdpdGggYSByZWd1bGFyIHBpeGVsIG51bWJlclxuICAgIC8vIGJ1dCBhIG51bWJlciB0aGF0IGhhcyBhIHdlaXJkIGVuZGluZywgd2UgbmVlZCB0byBjb252ZXJ0IGl0IHRvIHBpeGVsc1xuICAgIC8vIGJ1dCBub3QgcG9zaXRpb24gY3NzIGF0dHJpYnV0ZXMsIGFzIHRob3NlIGFyZSBwcm9wb3J0aW9uYWwgdG8gdGhlIHBhcmVudCBlbGVtZW50IGluc3RlYWRcbiAgICAvLyBhbmQgd2UgY2FuJ3QgbWVhc3VyZSB0aGUgcGFyZW50IGluc3RlYWQgYmVjYXVzZSBpdCBtaWdodCB0cmlnZ2VyIGEgXCJzdGFja2luZyBkb2xsc1wiIHByb2JsZW1cbiAgICBpZiAoIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiAhcnBvc2l0aW9uLnRlc3QoIG5hbWUgKSApIHtcblxuICAgICAgLy8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuICAgICAgbGVmdCA9IHN0eWxlLmxlZnQ7XG4gICAgICBycyA9IGVsZW0ucnVudGltZVN0eWxlO1xuICAgICAgcnNMZWZ0ID0gcnMgJiYgcnMubGVmdDtcblxuICAgICAgLy8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxuICAgICAgaWYgKCByc0xlZnQgKSB7XG4gICAgICAgIHJzLmxlZnQgPSBlbGVtLmN1cnJlbnRTdHlsZS5sZWZ0O1xuICAgICAgfVxuICAgICAgc3R5bGUubGVmdCA9IG5hbWUgPT09IFwiZm9udFNpemVcIiA/IFwiMWVtXCIgOiByZXQ7XG4gICAgICByZXQgPSBzdHlsZS5waXhlbExlZnQgKyBcInB4XCI7XG5cbiAgICAgIC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcbiAgICAgIHN0eWxlLmxlZnQgPSBsZWZ0O1xuICAgICAgaWYgKCByc0xlZnQgKSB7XG4gICAgICAgIHJzLmxlZnQgPSByc0xlZnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydDogSUVcbiAgICAvLyBJRSByZXR1cm5zIHpJbmRleCB2YWx1ZSBhcyBhbiBpbnRlZ2VyLlxuICAgIHJldHVybiByZXQgPT09IHVuZGVmaW5lZCA/XG4gICAgICByZXQgOlxuICAgICAgcmV0ICsgXCJcIiB8fCBcImF1dG9cIjtcbiAgfTtcbn1cblxuXG5cblxuZnVuY3Rpb24gYWRkR2V0SG9va0lmKCBjb25kaXRpb25GbiwgaG9va0ZuICkge1xuICAvLyBEZWZpbmUgdGhlIGhvb2ssIHdlJ2xsIGNoZWNrIG9uIHRoZSBmaXJzdCBydW4gaWYgaXQncyByZWFsbHkgbmVlZGVkLlxuICByZXR1cm4ge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY29uZGl0aW9uID0gY29uZGl0aW9uRm4oKTtcblxuICAgICAgaWYgKCBjb25kaXRpb24gPT0gbnVsbCApIHtcbiAgICAgICAgLy8gVGhlIHRlc3Qgd2FzIG5vdCByZWFkeSBhdCB0aGlzIHBvaW50OyBzY3JldyB0aGUgaG9vayB0aGlzIHRpbWVcbiAgICAgICAgLy8gYnV0IGNoZWNrIGFnYWluIHdoZW4gbmVlZGVkIG5leHQgdGltZS5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIGNvbmRpdGlvbiApIHtcbiAgICAgICAgLy8gSG9vayBub3QgbmVlZGVkIChvciBpdCdzIG5vdCBwb3NzaWJsZSB0byB1c2UgaXQgZHVlIHRvIG1pc3NpbmcgZGVwZW5kZW5jeSksXG4gICAgICAgIC8vIHJlbW92ZSBpdC5cbiAgICAgICAgLy8gU2luY2UgdGhlcmUgYXJlIG5vIG90aGVyIGhvb2tzIGZvciBtYXJnaW5SaWdodCwgcmVtb3ZlIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgICAgIGRlbGV0ZSB0aGlzLmdldDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBIb29rIG5lZWRlZDsgcmVkZWZpbmUgaXQgc28gdGhhdCB0aGUgc3VwcG9ydCB0ZXN0IGlzIG5vdCBleGVjdXRlZCBhZ2Fpbi5cblxuICAgICAgcmV0dXJuICh0aGlzLmdldCA9IGhvb2tGbikuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgIH1cbiAgfTtcbn1cblxuXG4oZnVuY3Rpb24oKSB7XG4gIC8vIE1pbmlmaWVkOiB2YXIgYixjLGQsZSxmLGcsIGgsaVxuICB2YXIgZGl2LCBzdHlsZSwgYSwgcGl4ZWxQb3NpdGlvblZhbCwgYm94U2l6aW5nUmVsaWFibGVWYWwsXG4gICAgcmVsaWFibGVIaWRkZW5PZmZzZXRzVmFsLCByZWxpYWJsZU1hcmdpblJpZ2h0VmFsO1xuXG4gIC8vIFNldHVwXG4gIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcbiAgZGl2LmlubmVySFRNTCA9IFwiICA8bGluay8+PHRhYmxlPjwvdGFibGU+PGEgaHJlZj0nL2EnPmE8L2E+PGlucHV0IHR5cGU9J2NoZWNrYm94Jy8+XCI7XG4gIGEgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwiYVwiIClbIDAgXTtcbiAgc3R5bGUgPSBhICYmIGEuc3R5bGU7XG5cbiAgLy8gRmluaXNoIGVhcmx5IGluIGxpbWl0ZWQgKG5vbi1icm93c2VyKSBlbnZpcm9ubWVudHNcbiAgaWYgKCAhc3R5bGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3R5bGUuY3NzVGV4dCA9IFwiZmxvYXQ6bGVmdDtvcGFjaXR5Oi41XCI7XG5cbiAgLy8gU3VwcG9ydDogSUU8OVxuICAvLyBNYWtlIHN1cmUgdGhhdCBlbGVtZW50IG9wYWNpdHkgZXhpc3RzIChhcyBvcHBvc2VkIHRvIGZpbHRlcilcbiAgc3VwcG9ydC5vcGFjaXR5ID0gc3R5bGUub3BhY2l0eSA9PT0gXCIwLjVcIjtcblxuICAvLyBWZXJpZnkgc3R5bGUgZmxvYXQgZXhpc3RlbmNlXG4gIC8vIChJRSB1c2VzIHN0eWxlRmxvYXQgaW5zdGVhZCBvZiBjc3NGbG9hdClcbiAgc3VwcG9ydC5jc3NGbG9hdCA9ICEhc3R5bGUuY3NzRmxvYXQ7XG5cbiAgZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJjb250ZW50LWJveFwiO1xuICBkaXYuY2xvbmVOb2RlKCB0cnVlICkuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcIlwiO1xuICBzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSA9IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9PT0gXCJjb250ZW50LWJveFwiO1xuXG4gIC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjksIEFuZHJvaWQgMi4zXG4gIC8vIFZlbmRvci1wcmVmaXggYm94LXNpemluZ1xuICBzdXBwb3J0LmJveFNpemluZyA9IHN0eWxlLmJveFNpemluZyA9PT0gXCJcIiB8fCBzdHlsZS5Nb3pCb3hTaXppbmcgPT09IFwiXCIgfHxcbiAgICBzdHlsZS5XZWJraXRCb3hTaXppbmcgPT09IFwiXCI7XG5cbiAgalF1ZXJ5LmV4dGVuZChzdXBwb3J0LCB7XG4gICAgcmVsaWFibGVIaWRkZW5PZmZzZXRzOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICggcmVsaWFibGVIaWRkZW5PZmZzZXRzVmFsID09IG51bGwgKSB7XG4gICAgICAgIGNvbXB1dGVTdHlsZVRlc3RzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVsaWFibGVIaWRkZW5PZmZzZXRzVmFsO1xuICAgIH0sXG5cbiAgICBib3hTaXppbmdSZWxpYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIGJveFNpemluZ1JlbGlhYmxlVmFsID09IG51bGwgKSB7XG4gICAgICAgIGNvbXB1dGVTdHlsZVRlc3RzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYm94U2l6aW5nUmVsaWFibGVWYWw7XG4gICAgfSxcblxuICAgIHBpeGVsUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCBwaXhlbFBvc2l0aW9uVmFsID09IG51bGwgKSB7XG4gICAgICAgIGNvbXB1dGVTdHlsZVRlc3RzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGl4ZWxQb3NpdGlvblZhbDtcbiAgICB9LFxuXG4gICAgLy8gU3VwcG9ydDogQW5kcm9pZCAyLjNcbiAgICByZWxpYWJsZU1hcmdpblJpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICggcmVsaWFibGVNYXJnaW5SaWdodFZhbCA9PSBudWxsICkge1xuICAgICAgICBjb21wdXRlU3R5bGVUZXN0cygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbGlhYmxlTWFyZ2luUmlnaHRWYWw7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBjb21wdXRlU3R5bGVUZXN0cygpIHtcbiAgICAvLyBNaW5pZmllZDogdmFyIGIsYyxkLGpcbiAgICB2YXIgZGl2LCBib2R5LCBjb250YWluZXIsIGNvbnRlbnRzO1xuXG4gICAgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImJvZHlcIiApWyAwIF07XG4gICAgaWYgKCAhYm9keSB8fCAhYm9keS5zdHlsZSApIHtcbiAgICAgIC8vIFRlc3QgZmlyZWQgdG9vIGVhcmx5IG9yIGluIGFuIHVuc3VwcG9ydGVkIGVudmlyb25tZW50LCBleGl0LlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldHVwXG4gICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcbiAgICBjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyOjA7d2lkdGg6MDtoZWlnaHQ6MDt0b3A6MDtsZWZ0Oi05OTk5cHhcIjtcbiAgICBib2R5LmFwcGVuZENoaWxkKCBjb250YWluZXIgKS5hcHBlbmRDaGlsZCggZGl2ICk7XG5cbiAgICBkaXYuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAvLyBTdXBwb3J0OiBGaXJlZm94PDI5LCBBbmRyb2lkIDIuM1xuICAgICAgLy8gVmVuZG9yLXByZWZpeCBib3gtc2l6aW5nXG4gICAgICBcIi13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94Oy1tb3otYm94LXNpemluZzpib3JkZXItYm94O1wiICtcbiAgICAgIFwiYm94LXNpemluZzpib3JkZXItYm94O2Rpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoxJTt0b3A6MSU7XCIgK1xuICAgICAgXCJib3JkZXI6MXB4O3BhZGRpbmc6MXB4O3dpZHRoOjRweDtwb3NpdGlvbjphYnNvbHV0ZVwiO1xuXG4gICAgLy8gU3VwcG9ydDogSUU8OVxuICAgIC8vIEFzc3VtZSByZWFzb25hYmxlIHZhbHVlcyBpbiB0aGUgYWJzZW5jZSBvZiBnZXRDb21wdXRlZFN0eWxlXG4gICAgcGl4ZWxQb3NpdGlvblZhbCA9IGJveFNpemluZ1JlbGlhYmxlVmFsID0gZmFsc2U7XG4gICAgcmVsaWFibGVNYXJnaW5SaWdodFZhbCA9IHRydWU7XG5cbiAgICAvLyBDaGVjayBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzbyB0aGF0IHRoaXMgY29kZSBpcyBub3QgcnVuIGluIElFPDkuXG4gICAgaWYgKCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSApIHtcbiAgICAgIHBpeGVsUG9zaXRpb25WYWwgPSAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBkaXYsIG51bGwgKSB8fCB7fSApLnRvcCAhPT0gXCIxJVwiO1xuICAgICAgYm94U2l6aW5nUmVsaWFibGVWYWwgPVxuICAgICAgICAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBkaXYsIG51bGwgKSB8fCB7IHdpZHRoOiBcIjRweFwiIH0gKS53aWR0aCA9PT0gXCI0cHhcIjtcblxuICAgICAgLy8gU3VwcG9ydDogQW5kcm9pZCAyLjNcbiAgICAgIC8vIERpdiB3aXRoIGV4cGxpY2l0IHdpZHRoIGFuZCBubyBtYXJnaW4tcmlnaHQgaW5jb3JyZWN0bHlcbiAgICAgIC8vIGdldHMgY29tcHV0ZWQgbWFyZ2luLXJpZ2h0IGJhc2VkIG9uIHdpZHRoIG9mIGNvbnRhaW5lciAoIzMzMzMpXG4gICAgICAvLyBXZWJLaXQgQnVnIDEzMzQzIC0gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHdyb25nIHZhbHVlIGZvciBtYXJnaW4tcmlnaHRcbiAgICAgIGNvbnRlbnRzID0gZGl2LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblxuICAgICAgLy8gUmVzZXQgQ1NTOiBib3gtc2l6aW5nOyBkaXNwbGF5OyBtYXJnaW47IGJvcmRlcjsgcGFkZGluZ1xuICAgICAgY29udGVudHMuc3R5bGUuY3NzVGV4dCA9IGRpdi5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgLy8gU3VwcG9ydDogRmlyZWZveDwyOSwgQW5kcm9pZCAyLjNcbiAgICAgICAgLy8gVmVuZG9yLXByZWZpeCBib3gtc2l6aW5nXG4gICAgICAgIFwiLXdlYmtpdC1ib3gtc2l6aW5nOmNvbnRlbnQtYm94Oy1tb3otYm94LXNpemluZzpjb250ZW50LWJveDtcIiArXG4gICAgICAgIFwiYm94LXNpemluZzpjb250ZW50LWJveDtkaXNwbGF5OmJsb2NrO21hcmdpbjowO2JvcmRlcjowO3BhZGRpbmc6MFwiO1xuICAgICAgY29udGVudHMuc3R5bGUubWFyZ2luUmlnaHQgPSBjb250ZW50cy5zdHlsZS53aWR0aCA9IFwiMFwiO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gXCIxcHhcIjtcblxuICAgICAgcmVsaWFibGVNYXJnaW5SaWdodFZhbCA9XG4gICAgICAgICFwYXJzZUZsb2F0KCAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBjb250ZW50cywgbnVsbCApIHx8IHt9ICkubWFyZ2luUmlnaHQgKTtcblxuICAgICAgZGl2LnJlbW92ZUNoaWxkKCBjb250ZW50cyApO1xuICAgIH1cblxuICAgIC8vIFN1cHBvcnQ6IElFOFxuICAgIC8vIENoZWNrIGlmIHRhYmxlIGNlbGxzIHN0aWxsIGhhdmUgb2Zmc2V0V2lkdGgvSGVpZ2h0IHdoZW4gdGhleSBhcmUgc2V0XG4gICAgLy8gdG8gZGlzcGxheTpub25lIGFuZCB0aGVyZSBhcmUgc3RpbGwgb3RoZXIgdmlzaWJsZSB0YWJsZSBjZWxscyBpbiBhXG4gICAgLy8gdGFibGUgcm93OyBpZiBzbywgb2Zmc2V0V2lkdGgvSGVpZ2h0IGFyZSBub3QgcmVsaWFibGUgZm9yIHVzZSB3aGVuXG4gICAgLy8gZGV0ZXJtaW5pbmcgaWYgYW4gZWxlbWVudCBoYXMgYmVlbiBoaWRkZW4gZGlyZWN0bHkgdXNpbmdcbiAgICAvLyBkaXNwbGF5Om5vbmUgKGl0IGlzIHN0aWxsIHNhZmUgdG8gdXNlIG9mZnNldHMgaWYgYSBwYXJlbnQgZWxlbWVudCBpc1xuICAgIC8vIGhpZGRlbjsgZG9uIHNhZmV0eSBnb2dnbGVzIGFuZCBzZWUgYnVnICM0NTEyIGZvciBtb3JlIGluZm9ybWF0aW9uKS5cbiAgICBkaXYuaW5uZXJIVE1MID0gXCI8dGFibGU+PHRyPjx0ZD48L3RkPjx0ZD50PC90ZD48L3RyPjwvdGFibGU+XCI7XG4gICAgY29udGVudHMgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwidGRcIiApO1xuICAgIGNvbnRlbnRzWyAwIF0uc3R5bGUuY3NzVGV4dCA9IFwibWFyZ2luOjA7Ym9yZGVyOjA7cGFkZGluZzowO2Rpc3BsYXk6bm9uZVwiO1xuICAgIHJlbGlhYmxlSGlkZGVuT2Zmc2V0c1ZhbCA9IGNvbnRlbnRzWyAwIF0ub2Zmc2V0SGVpZ2h0ID09PSAwO1xuICAgIGlmICggcmVsaWFibGVIaWRkZW5PZmZzZXRzVmFsICkge1xuICAgICAgY29udGVudHNbIDAgXS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgIGNvbnRlbnRzWyAxIF0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgcmVsaWFibGVIaWRkZW5PZmZzZXRzVmFsID0gY29udGVudHNbIDAgXS5vZmZzZXRIZWlnaHQgPT09IDA7XG4gICAgfVxuXG4gICAgYm9keS5yZW1vdmVDaGlsZCggY29udGFpbmVyICk7XG4gIH1cblxufSkoKTtcblxuXG4vLyBBIG1ldGhvZCBmb3IgcXVpY2tseSBzd2FwcGluZyBpbi9vdXQgQ1NTIHByb3BlcnRpZXMgdG8gZ2V0IGNvcnJlY3QgY2FsY3VsYXRpb25zLlxualF1ZXJ5LnN3YXAgPSBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgY2FsbGJhY2ssIGFyZ3MgKSB7XG4gIHZhciByZXQsIG5hbWUsXG4gICAgb2xkID0ge307XG5cbiAgLy8gUmVtZW1iZXIgdGhlIG9sZCB2YWx1ZXMsIGFuZCBpbnNlcnQgdGhlIG5ldyBvbmVzXG4gIGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcbiAgICBvbGRbIG5hbWUgXSA9IGVsZW0uc3R5bGVbIG5hbWUgXTtcbiAgICBlbGVtLnN0eWxlWyBuYW1lIF0gPSBvcHRpb25zWyBuYW1lIF07XG4gIH1cblxuICByZXQgPSBjYWxsYmFjay5hcHBseSggZWxlbSwgYXJncyB8fCBbXSApO1xuXG4gIC8vIFJldmVydCB0aGUgb2xkIHZhbHVlc1xuICBmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG4gICAgZWxlbS5zdHlsZVsgbmFtZSBdID0gb2xkWyBuYW1lIF07XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuXG52YXJcbiAgICByYWxwaGEgPSAvYWxwaGFcXChbXildKlxcKS9pLFxuICByb3BhY2l0eSA9IC9vcGFjaXR5XFxzKj1cXHMqKFteKV0qKS8sXG5cbiAgLy8gc3dhcHBhYmxlIGlmIGRpc3BsYXkgaXMgbm9uZSBvciBzdGFydHMgd2l0aCB0YWJsZSBleGNlcHQgXCJ0YWJsZVwiLCBcInRhYmxlLWNlbGxcIiwgb3IgXCJ0YWJsZS1jYXB0aW9uXCJcbiAgLy8gc2VlIGhlcmUgZm9yIGRpc3BsYXkgdmFsdWVzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0NTUy9kaXNwbGF5XG4gIHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxcbiAgcm51bXNwbGl0ID0gbmV3IFJlZ0V4cCggXCJeKFwiICsgcG51bSArIFwiKSguKikkXCIsIFwiaVwiICksXG4gIHJyZWxOdW0gPSBuZXcgUmVnRXhwKCBcIl4oWystXSk9KFwiICsgcG51bSArIFwiKVwiLCBcImlcIiApLFxuXG4gIGNzc1Nob3cgPSB7IHBvc2l0aW9uOiBcImFic29sdXRlXCIsIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsIGRpc3BsYXk6IFwiYmxvY2tcIiB9LFxuICBjc3NOb3JtYWxUcmFuc2Zvcm0gPSB7XG4gICAgbGV0dGVyU3BhY2luZzogXCIwXCIsXG4gICAgZm9udFdlaWdodDogXCI0MDBcIlxuICB9LFxuXG4gIGNzc1ByZWZpeGVzID0gWyBcIldlYmtpdFwiLCBcIk9cIiwgXCJNb3pcIiwgXCJtc1wiIF07XG5cblxuLy8gcmV0dXJuIGEgY3NzIHByb3BlcnR5IG1hcHBlZCB0byBhIHBvdGVudGlhbGx5IHZlbmRvciBwcmVmaXhlZCBwcm9wZXJ0eVxuZnVuY3Rpb24gdmVuZG9yUHJvcE5hbWUoIHN0eWxlLCBuYW1lICkge1xuXG4gIC8vIHNob3J0Y3V0IGZvciBuYW1lcyB0aGF0IGFyZSBub3QgdmVuZG9yIHByZWZpeGVkXG4gIGlmICggbmFtZSBpbiBzdHlsZSApIHtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciB2ZW5kb3IgcHJlZml4ZWQgbmFtZXNcbiAgdmFyIGNhcE5hbWUgPSBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSxcbiAgICBvcmlnTmFtZSA9IG5hbWUsXG4gICAgaSA9IGNzc1ByZWZpeGVzLmxlbmd0aDtcblxuICB3aGlsZSAoIGktLSApIHtcbiAgICBuYW1lID0gY3NzUHJlZml4ZXNbIGkgXSArIGNhcE5hbWU7XG4gICAgaWYgKCBuYW1lIGluIHN0eWxlICkge1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9yaWdOYW1lO1xufVxuXG5mdW5jdGlvbiBzaG93SGlkZSggZWxlbWVudHMsIHNob3cgKSB7XG4gIHZhciBkaXNwbGF5LCBlbGVtLCBoaWRkZW4sXG4gICAgdmFsdWVzID0gW10sXG4gICAgaW5kZXggPSAwLFxuICAgIGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuICBmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuICAgIGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcbiAgICBpZiAoICFlbGVtLnN0eWxlICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFsdWVzWyBpbmRleCBdID0galF1ZXJ5Ll9kYXRhKCBlbGVtLCBcIm9sZGRpc3BsYXlcIiApO1xuICAgIGRpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXk7XG4gICAgaWYgKCBzaG93ICkge1xuICAgICAgLy8gUmVzZXQgdGhlIGlubGluZSBkaXNwbGF5IG9mIHRoaXMgZWxlbWVudCB0byBsZWFybiBpZiBpdCBpc1xuICAgICAgLy8gYmVpbmcgaGlkZGVuIGJ5IGNhc2NhZGVkIHJ1bGVzIG9yIG5vdFxuICAgICAgaWYgKCAhdmFsdWVzWyBpbmRleCBdICYmIGRpc3BsYXkgPT09IFwibm9uZVwiICkge1xuICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgZWxlbWVudHMgd2hpY2ggaGF2ZSBiZWVuIG92ZXJyaWRkZW4gd2l0aCBkaXNwbGF5OiBub25lXG4gICAgICAvLyBpbiBhIHN0eWxlc2hlZXQgdG8gd2hhdGV2ZXIgdGhlIGRlZmF1bHQgYnJvd3NlciBzdHlsZSBpc1xuICAgICAgLy8gZm9yIHN1Y2ggYW4gZWxlbWVudFxuICAgICAgaWYgKCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwiXCIgJiYgaXNIaWRkZW4oIGVsZW0gKSApIHtcbiAgICAgICAgdmFsdWVzWyBpbmRleCBdID0galF1ZXJ5Ll9kYXRhKCBlbGVtLCBcIm9sZGRpc3BsYXlcIiwgZGVmYXVsdERpc3BsYXkoZWxlbS5ub2RlTmFtZSkgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZGVuID0gaXNIaWRkZW4oIGVsZW0gKTtcblxuICAgICAgaWYgKCBkaXNwbGF5ICYmIGRpc3BsYXkgIT09IFwibm9uZVwiIHx8ICFoaWRkZW4gKSB7XG4gICAgICAgIGpRdWVyeS5fZGF0YSggZWxlbSwgXCJvbGRkaXNwbGF5XCIsIGhpZGRlbiA/IGRpc3BsYXkgOiBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IHRoZSBkaXNwbGF5IG9mIG1vc3Qgb2YgdGhlIGVsZW1lbnRzIGluIGEgc2Vjb25kIGxvb3BcbiAgLy8gdG8gYXZvaWQgdGhlIGNvbnN0YW50IHJlZmxvd1xuICBmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuICAgIGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcbiAgICBpZiAoICFlbGVtLnN0eWxlICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICggIXNob3cgfHwgZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwiXCIgKSB7XG4gICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBzaG93ID8gdmFsdWVzWyBpbmRleCBdIHx8IFwiXCIgOiBcIm5vbmVcIjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKSB7XG4gIHZhciBtYXRjaGVzID0gcm51bXNwbGl0LmV4ZWMoIHZhbHVlICk7XG4gIHJldHVybiBtYXRjaGVzID9cbiAgICAvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBcInN1YnRyYWN0XCIsIGUuZy4sIHdoZW4gdXNlZCBhcyBpbiBjc3NIb29rc1xuICAgIE1hdGgubWF4KCAwLCBtYXRjaGVzWyAxIF0gLSAoIHN1YnRyYWN0IHx8IDAgKSApICsgKCBtYXRjaGVzWyAyIF0gfHwgXCJweFwiICkgOlxuICAgIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEsIGlzQm9yZGVyQm94LCBzdHlsZXMgKSB7XG4gIHZhciBpID0gZXh0cmEgPT09ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSA/XG4gICAgLy8gSWYgd2UgYWxyZWFkeSBoYXZlIHRoZSByaWdodCBtZWFzdXJlbWVudCwgYXZvaWQgYXVnbWVudGF0aW9uXG4gICAgNCA6XG4gICAgLy8gT3RoZXJ3aXNlIGluaXRpYWxpemUgZm9yIGhvcml6b250YWwgb3IgdmVydGljYWwgcHJvcGVydGllc1xuICAgIG5hbWUgPT09IFwid2lkdGhcIiA/IDEgOiAwLFxuXG4gICAgdmFsID0gMDtcblxuICBmb3IgKCA7IGkgPCA0OyBpICs9IDIgKSB7XG4gICAgLy8gYm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luLCBzbyBhZGQgaXQgaWYgd2Ugd2FudCBpdFxuICAgIGlmICggZXh0cmEgPT09IFwibWFyZ2luXCIgKSB7XG4gICAgICB2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgZXh0cmEgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG4gICAgfVxuXG4gICAgaWYgKCBpc0JvcmRlckJveCApIHtcbiAgICAgIC8vIGJvcmRlci1ib3ggaW5jbHVkZXMgcGFkZGluZywgc28gcmVtb3ZlIGl0IGlmIHdlIHdhbnQgY29udGVudFxuICAgICAgaWYgKCBleHRyYSA9PT0gXCJjb250ZW50XCIgKSB7XG4gICAgICAgIHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcbiAgICAgIH1cblxuICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcbiAgICAgIGlmICggZXh0cmEgIT09IFwibWFyZ2luXCIgKSB7XG4gICAgICAgIHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50LCBzbyBhZGQgcGFkZGluZ1xuICAgICAgdmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXG4gICAgICAvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50IG5vciBwYWRkaW5nLCBzbyBhZGQgYm9yZGVyXG4gICAgICBpZiAoIGV4dHJhICE9PSBcInBhZGRpbmdcIiApIHtcbiAgICAgICAgdmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKSB7XG5cbiAgLy8gU3RhcnQgd2l0aCBvZmZzZXQgcHJvcGVydHksIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJvcmRlci1ib3ggdmFsdWVcbiAgdmFyIHZhbHVlSXNCb3JkZXJCb3ggPSB0cnVlLFxuICAgIHZhbCA9IG5hbWUgPT09IFwid2lkdGhcIiA/IGVsZW0ub2Zmc2V0V2lkdGggOiBlbGVtLm9mZnNldEhlaWdodCxcbiAgICBzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKSxcbiAgICBpc0JvcmRlckJveCA9IHN1cHBvcnQuYm94U2l6aW5nICYmIGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCI7XG5cbiAgLy8gc29tZSBub24taHRtbCBlbGVtZW50cyByZXR1cm4gdW5kZWZpbmVkIGZvciBvZmZzZXRXaWR0aCwgc28gY2hlY2sgZm9yIG51bGwvdW5kZWZpbmVkXG4gIC8vIHN2ZyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY0OTI4NVxuICAvLyBNYXRoTUwgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD00OTE2NjhcbiAgaWYgKCB2YWwgPD0gMCB8fCB2YWwgPT0gbnVsbCApIHtcbiAgICAvLyBGYWxsIGJhY2sgdG8gY29tcHV0ZWQgdGhlbiB1bmNvbXB1dGVkIGNzcyBpZiBuZWNlc3NhcnlcbiAgICB2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUsIHN0eWxlcyApO1xuICAgIGlmICggdmFsIDwgMCB8fCB2YWwgPT0gbnVsbCApIHtcbiAgICAgIHZhbCA9IGVsZW0uc3R5bGVbIG5hbWUgXTtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlZCB1bml0IGlzIG5vdCBwaXhlbHMuIFN0b3AgaGVyZSBhbmQgcmV0dXJuLlxuICAgIGlmICggcm51bW5vbnB4LnRlc3QodmFsKSApIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgLy8gd2UgbmVlZCB0aGUgY2hlY2sgZm9yIHN0eWxlIGluIGNhc2UgYSBicm93c2VyIHdoaWNoIHJldHVybnMgdW5yZWxpYWJsZSB2YWx1ZXNcbiAgICAvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXG4gICAgdmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94ICYmICggc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSgpIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVsgbmFtZSBdICk7XG5cbiAgICAvLyBOb3JtYWxpemUgXCJcIiwgYXV0bywgYW5kIHByZXBhcmUgZm9yIGV4dHJhXG4gICAgdmFsID0gcGFyc2VGbG9hdCggdmFsICkgfHwgMDtcbiAgfVxuXG4gIC8vIHVzZSB0aGUgYWN0aXZlIGJveC1zaXppbmcgbW9kZWwgdG8gYWRkL3N1YnRyYWN0IGlycmVsZXZhbnQgc3R5bGVzXG4gIHJldHVybiAoIHZhbCArXG4gICAgYXVnbWVudFdpZHRoT3JIZWlnaHQoXG4gICAgICBlbGVtLFxuICAgICAgbmFtZSxcbiAgICAgIGV4dHJhIHx8ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSxcbiAgICAgIHZhbHVlSXNCb3JkZXJCb3gsXG4gICAgICBzdHlsZXNcbiAgICApXG4gICkgKyBcInB4XCI7XG59XG5cbmpRdWVyeS5leHRlbmQoe1xuICAvLyBBZGQgaW4gc3R5bGUgcHJvcGVydHkgaG9va3MgZm9yIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHRcbiAgLy8gYmVoYXZpb3Igb2YgZ2V0dGluZyBhbmQgc2V0dGluZyBhIHN0eWxlIHByb3BlcnR5XG4gIGNzc0hvb2tzOiB7XG4gICAgb3BhY2l0eToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG4gICAgICAgIGlmICggY29tcHV0ZWQgKSB7XG4gICAgICAgICAgLy8gV2Ugc2hvdWxkIGFsd2F5cyBnZXQgYSBudW1iZXIgYmFjayBmcm9tIG9wYWNpdHlcbiAgICAgICAgICB2YXIgcmV0ID0gY3VyQ1NTKCBlbGVtLCBcIm9wYWNpdHlcIiApO1xuICAgICAgICAgIHJldHVybiByZXQgPT09IFwiXCIgPyBcIjFcIiA6IHJldDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBEb24ndCBhdXRvbWF0aWNhbGx5IGFkZCBcInB4XCIgdG8gdGhlc2UgcG9zc2libHktdW5pdGxlc3MgcHJvcGVydGllc1xuICBjc3NOdW1iZXI6IHtcbiAgICBcImNvbHVtbkNvdW50XCI6IHRydWUsXG4gICAgXCJmaWxsT3BhY2l0eVwiOiB0cnVlLFxuICAgIFwiZmxleEdyb3dcIjogdHJ1ZSxcbiAgICBcImZsZXhTaHJpbmtcIjogdHJ1ZSxcbiAgICBcImZvbnRXZWlnaHRcIjogdHJ1ZSxcbiAgICBcImxpbmVIZWlnaHRcIjogdHJ1ZSxcbiAgICBcIm9wYWNpdHlcIjogdHJ1ZSxcbiAgICBcIm9yZGVyXCI6IHRydWUsXG4gICAgXCJvcnBoYW5zXCI6IHRydWUsXG4gICAgXCJ3aWRvd3NcIjogdHJ1ZSxcbiAgICBcInpJbmRleFwiOiB0cnVlLFxuICAgIFwiem9vbVwiOiB0cnVlXG4gIH0sXG5cbiAgLy8gQWRkIGluIHByb3BlcnRpZXMgd2hvc2UgbmFtZXMgeW91IHdpc2ggdG8gZml4IGJlZm9yZVxuICAvLyBzZXR0aW5nIG9yIGdldHRpbmcgdGhlIHZhbHVlXG4gIGNzc1Byb3BzOiB7XG4gICAgLy8gbm9ybWFsaXplIGZsb2F0IGNzcyBwcm9wZXJ0eVxuICAgIFwiZmxvYXRcIjogc3VwcG9ydC5jc3NGbG9hdCA/IFwiY3NzRmxvYXRcIiA6IFwic3R5bGVGbG9hdFwiXG4gIH0sXG5cbiAgLy8gR2V0IGFuZCBzZXQgdGhlIHN0eWxlIHByb3BlcnR5IG9uIGEgRE9NIE5vZGVcbiAgc3R5bGU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSwgZXh0cmEgKSB7XG4gICAgLy8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG4gICAgaWYgKCAhZWxlbSB8fCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggfHwgIWVsZW0uc3R5bGUgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG4gICAgdmFyIHJldCwgdHlwZSwgaG9va3MsXG4gICAgICBvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSxcbiAgICAgIHN0eWxlID0gZWxlbS5zdHlsZTtcblxuICAgIG5hbWUgPSBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gfHwgKCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggc3R5bGUsIG9yaWdOYW1lICkgKTtcblxuICAgIC8vIGdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb25cbiAgICAvLyBmb2xsb3dlZCBieSB0aGUgdW5wcmVmaXhlZCB2ZXJzaW9uXG4gICAgaG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBzZXR0aW5nIGEgdmFsdWVcbiAgICBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG4gICAgICAvLyBjb252ZXJ0IHJlbGF0aXZlIG51bWJlciBzdHJpbmdzICgrPSBvciAtPSkgdG8gcmVsYXRpdmUgbnVtYmVycy4gIzczNDVcbiAgICAgIGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAocmV0ID0gcnJlbE51bS5leGVjKCB2YWx1ZSApKSApIHtcbiAgICAgICAgdmFsdWUgPSAoIHJldFsxXSArIDEgKSAqIHJldFsyXSArIHBhcnNlRmxvYXQoIGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKSApO1xuICAgICAgICAvLyBGaXhlcyBidWcgIzkyMzdcbiAgICAgICAgdHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IG51bGwgYW5kIE5hTiB2YWx1ZXMgYXJlbid0IHNldC4gU2VlOiAjNzExNlxuICAgICAgaWYgKCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBhIG51bWJlciB3YXMgcGFzc2VkIGluLCBhZGQgJ3B4JyB0byB0aGUgKGV4Y2VwdCBmb3IgY2VydGFpbiBDU1MgcHJvcGVydGllcylcbiAgICAgIGlmICggdHlwZSA9PT0gXCJudW1iZXJcIiAmJiAhalF1ZXJ5LmNzc051bWJlclsgb3JpZ05hbWUgXSApIHtcbiAgICAgICAgdmFsdWUgKz0gXCJweFwiO1xuICAgICAgfVxuXG4gICAgICAvLyBGaXhlcyAjODkwOCwgaXQgY2FuIGJlIGRvbmUgbW9yZSBjb3JyZWN0bHkgYnkgc3BlY2lmaW5nIHNldHRlcnMgaW4gY3NzSG9va3MsXG4gICAgICAvLyBidXQgaXQgd291bGQgbWVhbiB0byBkZWZpbmUgZWlnaHQgKGZvciBldmVyeSBwcm9ibGVtYXRpYyBwcm9wZXJ0eSkgaWRlbnRpY2FsIGZ1bmN0aW9uc1xuICAgICAgaWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKFwiYmFja2dyb3VuZFwiKSA9PT0gMCApIHtcbiAgICAgICAgc3R5bGVbIG5hbWUgXSA9IFwiaW5oZXJpdFwiO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkLCB1c2UgdGhhdCB2YWx1ZSwgb3RoZXJ3aXNlIGp1c3Qgc2V0IHRoZSBzcGVjaWZpZWQgdmFsdWVcbiAgICAgIGlmICggIWhvb2tzIHx8ICEoXCJzZXRcIiBpbiBob29rcykgfHwgKHZhbHVlID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSkgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAvLyBTdXBwb3J0OiBJRVxuICAgICAgICAvLyBTd2FsbG93IGVycm9ycyBmcm9tICdpbnZhbGlkJyBDU1MgdmFsdWVzICgjNTUwOSlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdHlsZVsgbmFtZSBdID0gdmFsdWU7XG4gICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgbm9uLWNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcbiAgICAgIGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSkgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlIGp1c3QgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdHlsZSBvYmplY3RcbiAgICAgIHJldHVybiBzdHlsZVsgbmFtZSBdO1xuICAgIH1cbiAgfSxcblxuICBjc3M6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBleHRyYSwgc3R5bGVzICkge1xuICAgIHZhciBudW0sIHZhbCwgaG9va3MsXG4gICAgICBvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuICAgIG5hbWUgPSBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gfHwgKCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggZWxlbS5zdHlsZSwgb3JpZ05hbWUgKSApO1xuXG4gICAgLy8gZ2V0cyBob29rIGZvciB0aGUgcHJlZml4ZWQgdmVyc2lvblxuICAgIC8vIGZvbGxvd2VkIGJ5IHRoZSB1bnByZWZpeGVkIHZlcnNpb25cbiAgICBob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuICAgIC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG4gICAgaWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICkge1xuICAgICAgdmFsID0gaG9va3MuZ2V0KCBlbGVtLCB0cnVlLCBleHRyYSApO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgaWYgYSB3YXkgdG8gZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBleGlzdHMsIHVzZSB0aGF0XG4gICAgaWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICk7XG4gICAgfVxuXG4gICAgLy9jb252ZXJ0IFwibm9ybWFsXCIgdG8gY29tcHV0ZWQgdmFsdWVcbiAgICBpZiAoIHZhbCA9PT0gXCJub3JtYWxcIiAmJiBuYW1lIGluIGNzc05vcm1hbFRyYW5zZm9ybSApIHtcbiAgICAgIHZhbCA9IGNzc05vcm1hbFRyYW5zZm9ybVsgbmFtZSBdO1xuICAgIH1cblxuICAgIC8vIFJldHVybiwgY29udmVydGluZyB0byBudW1iZXIgaWYgZm9yY2VkIG9yIGEgcXVhbGlmaWVyIHdhcyBwcm92aWRlZCBhbmQgdmFsIGxvb2tzIG51bWVyaWNcbiAgICBpZiAoIGV4dHJhID09PSBcIlwiIHx8IGV4dHJhICkge1xuICAgICAgbnVtID0gcGFyc2VGbG9hdCggdmFsICk7XG4gICAgICByZXR1cm4gZXh0cmEgPT09IHRydWUgfHwgalF1ZXJ5LmlzTnVtZXJpYyggbnVtICkgPyBudW0gfHwgMCA6IHZhbDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufSk7XG5cbmpRdWVyeS5lYWNoKFsgXCJoZWlnaHRcIiwgXCJ3aWR0aFwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuICBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSA9IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCwgZXh0cmEgKSB7XG4gICAgICBpZiAoIGNvbXB1dGVkICkge1xuICAgICAgICAvLyBjZXJ0YWluIGVsZW1lbnRzIGNhbiBoYXZlIGRpbWVuc2lvbiBpbmZvIGlmIHdlIGludmlzaWJseSBzaG93IHRoZW1cbiAgICAgICAgLy8gaG93ZXZlciwgaXQgbXVzdCBoYXZlIGEgY3VycmVudCBkaXNwbGF5IHN0eWxlIHRoYXQgd291bGQgYmVuZWZpdCBmcm9tIHRoaXNcbiAgICAgICAgcmV0dXJuIHJkaXNwbGF5c3dhcC50ZXN0KCBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApICkgJiYgZWxlbS5vZmZzZXRXaWR0aCA9PT0gMCA/XG4gICAgICAgICAgalF1ZXJ5LnN3YXAoIGVsZW0sIGNzc1Nob3csIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICk7XG4gICAgICAgICAgfSkgOlxuICAgICAgICAgIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBleHRyYSApIHtcbiAgICAgIHZhciBzdHlsZXMgPSBleHRyYSAmJiBnZXRTdHlsZXMoIGVsZW0gKTtcbiAgICAgIHJldHVybiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIGV4dHJhID9cbiAgICAgICAgYXVnbWVudFdpZHRoT3JIZWlnaHQoXG4gICAgICAgICAgZWxlbSxcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGV4dHJhLFxuICAgICAgICAgIHN1cHBvcnQuYm94U2l6aW5nICYmIGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCIsXG4gICAgICAgICAgc3R5bGVzXG4gICAgICAgICkgOiAwXG4gICAgICApO1xuICAgIH1cbiAgfTtcbn0pO1xuXG5pZiAoICFzdXBwb3J0Lm9wYWNpdHkgKSB7XG4gIGpRdWVyeS5jc3NIb29rcy5vcGFjaXR5ID0ge1xuICAgIGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuICAgICAgLy8gSUUgdXNlcyBmaWx0ZXJzIGZvciBvcGFjaXR5XG4gICAgICByZXR1cm4gcm9wYWNpdHkudGVzdCggKGNvbXB1dGVkICYmIGVsZW0uY3VycmVudFN0eWxlID8gZWxlbS5jdXJyZW50U3R5bGUuZmlsdGVyIDogZWxlbS5zdHlsZS5maWx0ZXIpIHx8IFwiXCIgKSA/XG4gICAgICAgICggMC4wMSAqIHBhcnNlRmxvYXQoIFJlZ0V4cC4kMSApICkgKyBcIlwiIDpcbiAgICAgICAgY29tcHV0ZWQgPyBcIjFcIiA6IFwiXCI7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuICAgICAgdmFyIHN0eWxlID0gZWxlbS5zdHlsZSxcbiAgICAgICAgY3VycmVudFN0eWxlID0gZWxlbS5jdXJyZW50U3R5bGUsXG4gICAgICAgIG9wYWNpdHkgPSBqUXVlcnkuaXNOdW1lcmljKCB2YWx1ZSApID8gXCJhbHBoYShvcGFjaXR5PVwiICsgdmFsdWUgKiAxMDAgKyBcIilcIiA6IFwiXCIsXG4gICAgICAgIGZpbHRlciA9IGN1cnJlbnRTdHlsZSAmJiBjdXJyZW50U3R5bGUuZmlsdGVyIHx8IHN0eWxlLmZpbHRlciB8fCBcIlwiO1xuXG4gICAgICAvLyBJRSBoYXMgdHJvdWJsZSB3aXRoIG9wYWNpdHkgaWYgaXQgZG9lcyBub3QgaGF2ZSBsYXlvdXRcbiAgICAgIC8vIEZvcmNlIGl0IGJ5IHNldHRpbmcgdGhlIHpvb20gbGV2ZWxcbiAgICAgIHN0eWxlLnpvb20gPSAxO1xuXG4gICAgICAvLyBpZiBzZXR0aW5nIG9wYWNpdHkgdG8gMSwgYW5kIG5vIG90aGVyIGZpbHRlcnMgZXhpc3QgLSBhdHRlbXB0IHRvIHJlbW92ZSBmaWx0ZXIgYXR0cmlidXRlICM2NjUyXG4gICAgICAvLyBpZiB2YWx1ZSA9PT0gXCJcIiwgdGhlbiByZW1vdmUgaW5saW5lIG9wYWNpdHkgIzEyNjg1XG4gICAgICBpZiAoICggdmFsdWUgPj0gMSB8fCB2YWx1ZSA9PT0gXCJcIiApICYmXG4gICAgICAgICAgalF1ZXJ5LnRyaW0oIGZpbHRlci5yZXBsYWNlKCByYWxwaGEsIFwiXCIgKSApID09PSBcIlwiICYmXG4gICAgICAgICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlICkge1xuXG4gICAgICAgIC8vIFNldHRpbmcgc3R5bGUuZmlsdGVyIHRvIG51bGwsIFwiXCIgJiBcIiBcIiBzdGlsbCBsZWF2ZSBcImZpbHRlcjpcIiBpbiB0aGUgY3NzVGV4dFxuICAgICAgICAvLyBpZiBcImZpbHRlcjpcIiBpcyBwcmVzZW50IGF0IGFsbCwgY2xlYXJUeXBlIGlzIGRpc2FibGVkLCB3ZSB3YW50IHRvIGF2b2lkIHRoaXNcbiAgICAgICAgLy8gc3R5bGUucmVtb3ZlQXR0cmlidXRlIGlzIElFIE9ubHksIGJ1dCBzbyBhcHBhcmVudGx5IGlzIHRoaXMgY29kZSBwYXRoLi4uXG4gICAgICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSggXCJmaWx0ZXJcIiApO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGZpbHRlciBzdHlsZSBhcHBsaWVkIGluIGEgY3NzIHJ1bGUgb3IgdW5zZXQgaW5saW5lIG9wYWNpdHksIHdlIGFyZSBkb25lXG4gICAgICAgIGlmICggdmFsdWUgPT09IFwiXCIgfHwgY3VycmVudFN0eWxlICYmICFjdXJyZW50U3R5bGUuZmlsdGVyICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBvdGhlcndpc2UsIHNldCBuZXcgZmlsdGVyIHZhbHVlc1xuICAgICAgc3R5bGUuZmlsdGVyID0gcmFscGhhLnRlc3QoIGZpbHRlciApID9cbiAgICAgICAgZmlsdGVyLnJlcGxhY2UoIHJhbHBoYSwgb3BhY2l0eSApIDpcbiAgICAgICAgZmlsdGVyICsgXCIgXCIgKyBvcGFjaXR5O1xuICAgIH1cbiAgfTtcbn1cblxualF1ZXJ5LmNzc0hvb2tzLm1hcmdpblJpZ2h0ID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnJlbGlhYmxlTWFyZ2luUmlnaHQsXG4gIGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcbiAgICBpZiAoIGNvbXB1dGVkICkge1xuICAgICAgLy8gV2ViS2l0IEJ1ZyAxMzM0MyAtIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyB3cm9uZyB2YWx1ZSBmb3IgbWFyZ2luLXJpZ2h0XG4gICAgICAvLyBXb3JrIGFyb3VuZCBieSB0ZW1wb3JhcmlseSBzZXR0aW5nIGVsZW1lbnQgZGlzcGxheSB0byBpbmxpbmUtYmxvY2tcbiAgICAgIHJldHVybiBqUXVlcnkuc3dhcCggZWxlbSwgeyBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIiB9LFxuICAgICAgICBjdXJDU1MsIFsgZWxlbSwgXCJtYXJnaW5SaWdodFwiIF0gKTtcbiAgICB9XG4gIH1cbik7XG5cbi8vIFRoZXNlIGhvb2tzIGFyZSB1c2VkIGJ5IGFuaW1hdGUgdG8gZXhwYW5kIHByb3BlcnRpZXNcbmpRdWVyeS5lYWNoKHtcbiAgbWFyZ2luOiBcIlwiLFxuICBwYWRkaW5nOiBcIlwiLFxuICBib3JkZXI6IFwiV2lkdGhcIlxufSwgZnVuY3Rpb24oIHByZWZpeCwgc3VmZml4ICkge1xuICBqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdID0ge1xuICAgIGV4cGFuZDogZnVuY3Rpb24oIHZhbHVlICkge1xuICAgICAgdmFyIGkgPSAwLFxuICAgICAgICBleHBhbmRlZCA9IHt9LFxuXG4gICAgICAgIC8vIGFzc3VtZXMgYSBzaW5nbGUgbnVtYmVyIGlmIG5vdCBhIHN0cmluZ1xuICAgICAgICBwYXJ0cyA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnNwbGl0KFwiIFwiKSA6IFsgdmFsdWUgXTtcblxuICAgICAgZm9yICggOyBpIDwgNDsgaSsrICkge1xuICAgICAgICBleHBhbmRlZFsgcHJlZml4ICsgY3NzRXhwYW5kWyBpIF0gKyBzdWZmaXggXSA9XG4gICAgICAgICAgcGFydHNbIGkgXSB8fCBwYXJ0c1sgaSAtIDIgXSB8fCBwYXJ0c1sgMCBdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXhwYW5kZWQ7XG4gICAgfVxuICB9O1xuXG4gIGlmICggIXJtYXJnaW4udGVzdCggcHJlZml4ICkgKSB7XG4gICAgalF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXS5zZXQgPSBzZXRQb3NpdGl2ZU51bWJlcjtcbiAgfVxufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBjc3M6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcbiAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG4gICAgICB2YXIgc3R5bGVzLCBsZW4sXG4gICAgICAgIG1hcCA9IHt9LFxuICAgICAgICBpID0gMDtcblxuICAgICAgaWYgKCBqUXVlcnkuaXNBcnJheSggbmFtZSApICkge1xuICAgICAgICBzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKTtcbiAgICAgICAgbGVuID0gbmFtZS5sZW5ndGg7XG5cbiAgICAgICAgZm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICAgICAgbWFwWyBuYW1lWyBpIF0gXSA9IGpRdWVyeS5jc3MoIGVsZW0sIG5hbWVbIGkgXSwgZmFsc2UsIHN0eWxlcyApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgP1xuICAgICAgICBqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUsIHZhbHVlICkgOlxuICAgICAgICBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICk7XG4gICAgfSwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG4gIH0sXG4gIHNob3c6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzaG93SGlkZSggdGhpcywgdHJ1ZSApO1xuICB9LFxuICBoaWRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2hvd0hpZGUoIHRoaXMgKTtcbiAgfSxcbiAgdG9nZ2xlOiBmdW5jdGlvbiggc3RhdGUgKSB7XG4gICAgaWYgKCB0eXBlb2Ygc3RhdGUgPT09IFwiYm9vbGVhblwiICkge1xuICAgICAgcmV0dXJuIHN0YXRlID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCBpc0hpZGRlbiggdGhpcyApICkge1xuICAgICAgICBqUXVlcnkoIHRoaXMgKS5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqUXVlcnkoIHRoaXMgKS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5cbmZ1bmN0aW9uIFR3ZWVuKCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApIHtcbiAgcmV0dXJuIG5ldyBUd2Vlbi5wcm90b3R5cGUuaW5pdCggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcgKTtcbn1cbmpRdWVyeS5Ud2VlbiA9IFR3ZWVuO1xuXG5Ud2Vlbi5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUd2VlbixcbiAgaW5pdDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nLCB1bml0ICkge1xuICAgIHRoaXMuZWxlbSA9IGVsZW07XG4gICAgdGhpcy5wcm9wID0gcHJvcDtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2luZyB8fCBcInN3aW5nXCI7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnN0YXJ0ID0gdGhpcy5ub3cgPSB0aGlzLmN1cigpO1xuICAgIHRoaXMuZW5kID0gZW5kO1xuICAgIHRoaXMudW5pdCA9IHVuaXQgfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICk7XG4gIH0sXG4gIGN1cjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuICAgIHJldHVybiBob29rcyAmJiBob29rcy5nZXQgP1xuICAgICAgaG9va3MuZ2V0KCB0aGlzICkgOlxuICAgICAgVHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LmdldCggdGhpcyApO1xuICB9LFxuICBydW46IGZ1bmN0aW9uKCBwZXJjZW50ICkge1xuICAgIHZhciBlYXNlZCxcbiAgICAgIGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuICAgIGlmICggdGhpcy5vcHRpb25zLmR1cmF0aW9uICkge1xuICAgICAgdGhpcy5wb3MgPSBlYXNlZCA9IGpRdWVyeS5lYXNpbmdbIHRoaXMuZWFzaW5nIF0oXG4gICAgICAgIHBlcmNlbnQsIHRoaXMub3B0aW9ucy5kdXJhdGlvbiAqIHBlcmNlbnQsIDAsIDEsIHRoaXMub3B0aW9ucy5kdXJhdGlvblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3MgPSBlYXNlZCA9IHBlcmNlbnQ7XG4gICAgfVxuICAgIHRoaXMubm93ID0gKCB0aGlzLmVuZCAtIHRoaXMuc3RhcnQgKSAqIGVhc2VkICsgdGhpcy5zdGFydDtcblxuICAgIGlmICggdGhpcy5vcHRpb25zLnN0ZXAgKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuc3RlcC5jYWxsKCB0aGlzLmVsZW0sIHRoaXMubm93LCB0aGlzICk7XG4gICAgfVxuXG4gICAgaWYgKCBob29rcyAmJiBob29rcy5zZXQgKSB7XG4gICAgICBob29rcy5zZXQoIHRoaXMgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgVHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LnNldCggdGhpcyApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcblxuVHdlZW4ucHJvdG90eXBlLmluaXQucHJvdG90eXBlID0gVHdlZW4ucHJvdG90eXBlO1xuXG5Ud2Vlbi5wcm9wSG9va3MgPSB7XG4gIF9kZWZhdWx0OiB7XG4gICAgZ2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICBpZiAoIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSAhPSBudWxsICYmXG4gICAgICAgICghdHdlZW4uZWxlbS5zdHlsZSB8fCB0d2Vlbi5lbGVtLnN0eWxlWyB0d2Vlbi5wcm9wIF0gPT0gbnVsbCkgKSB7XG4gICAgICAgIHJldHVybiB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF07XG4gICAgICB9XG5cbiAgICAgIC8vIHBhc3NpbmcgYW4gZW1wdHkgc3RyaW5nIGFzIGEgM3JkIHBhcmFtZXRlciB0byAuY3NzIHdpbGwgYXV0b21hdGljYWxseVxuICAgICAgLy8gYXR0ZW1wdCBhIHBhcnNlRmxvYXQgYW5kIGZhbGxiYWNrIHRvIGEgc3RyaW5nIGlmIHRoZSBwYXJzZSBmYWlsc1xuICAgICAgLy8gc28sIHNpbXBsZSB2YWx1ZXMgc3VjaCBhcyBcIjEwcHhcIiBhcmUgcGFyc2VkIHRvIEZsb2F0LlxuICAgICAgLy8gY29tcGxleCB2YWx1ZXMgc3VjaCBhcyBcInJvdGF0ZSgxcmFkKVwiIGFyZSByZXR1cm5lZCBhcyBpcy5cbiAgICAgIHJlc3VsdCA9IGpRdWVyeS5jc3MoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIFwiXCIgKTtcbiAgICAgIC8vIEVtcHR5IHN0cmluZ3MsIG51bGwsIHVuZGVmaW5lZCBhbmQgXCJhdXRvXCIgYXJlIGNvbnZlcnRlZCB0byAwLlxuICAgICAgcmV0dXJuICFyZXN1bHQgfHwgcmVzdWx0ID09PSBcImF1dG9cIiA/IDAgOiByZXN1bHQ7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcbiAgICAgIC8vIHVzZSBzdGVwIGhvb2sgZm9yIGJhY2sgY29tcGF0IC0gdXNlIGNzc0hvb2sgaWYgaXRzIHRoZXJlIC0gdXNlIC5zdHlsZSBpZiBpdHNcbiAgICAgIC8vIGF2YWlsYWJsZSBhbmQgdXNlIHBsYWluIHByb3BlcnRpZXMgd2hlcmUgYXZhaWxhYmxlXG4gICAgICBpZiAoIGpRdWVyeS5meC5zdGVwWyB0d2Vlbi5wcm9wIF0gKSB7XG4gICAgICAgIGpRdWVyeS5meC5zdGVwWyB0d2Vlbi5wcm9wIF0oIHR3ZWVuICk7XG4gICAgICB9IGVsc2UgaWYgKCB0d2Vlbi5lbGVtLnN0eWxlICYmICggdHdlZW4uZWxlbS5zdHlsZVsgalF1ZXJ5LmNzc1Byb3BzWyB0d2Vlbi5wcm9wIF0gXSAhPSBudWxsIHx8IGpRdWVyeS5jc3NIb29rc1sgdHdlZW4ucHJvcCBdICkgKSB7XG4gICAgICAgIGpRdWVyeS5zdHlsZSggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgdHdlZW4ubm93ICsgdHdlZW4udW5pdCApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdID0gdHdlZW4ubm93O1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLy8gU3VwcG9ydDogSUUgPD05XG4vLyBQYW5pYyBiYXNlZCBhcHByb2FjaCB0byBzZXR0aW5nIHRoaW5ncyBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblxuVHdlZW4ucHJvcEhvb2tzLnNjcm9sbFRvcCA9IFR3ZWVuLnByb3BIb29rcy5zY3JvbGxMZWZ0ID0ge1xuICBzZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcbiAgICBpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgJiYgdHdlZW4uZWxlbS5wYXJlbnROb2RlICkge1xuICAgICAgdHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdID0gdHdlZW4ubm93O1xuICAgIH1cbiAgfVxufTtcblxualF1ZXJ5LmVhc2luZyA9IHtcbiAgbGluZWFyOiBmdW5jdGlvbiggcCApIHtcbiAgICByZXR1cm4gcDtcbiAgfSxcbiAgc3dpbmc6IGZ1bmN0aW9uKCBwICkge1xuICAgIHJldHVybiAwLjUgLSBNYXRoLmNvcyggcCAqIE1hdGguUEkgKSAvIDI7XG4gIH1cbn07XG5cbmpRdWVyeS5meCA9IFR3ZWVuLnByb3RvdHlwZS5pbml0O1xuXG4vLyBCYWNrIENvbXBhdCA8MS44IGV4dGVuc2lvbiBwb2ludFxualF1ZXJ5LmZ4LnN0ZXAgPSB7fTtcblxuXG5cblxudmFyXG4gIGZ4Tm93LCB0aW1lcklkLFxuICByZnh0eXBlcyA9IC9eKD86dG9nZ2xlfHNob3d8aGlkZSkkLyxcbiAgcmZ4bnVtID0gbmV3IFJlZ0V4cCggXCJeKD86KFsrLV0pPXwpKFwiICsgcG51bSArIFwiKShbYS16JV0qKSRcIiwgXCJpXCIgKSxcbiAgcnJ1biA9IC9xdWV1ZUhvb2tzJC8sXG4gIGFuaW1hdGlvblByZWZpbHRlcnMgPSBbIGRlZmF1bHRQcmVmaWx0ZXIgXSxcbiAgdHdlZW5lcnMgPSB7XG4gICAgXCIqXCI6IFsgZnVuY3Rpb24oIHByb3AsIHZhbHVlICkge1xuICAgICAgdmFyIHR3ZWVuID0gdGhpcy5jcmVhdGVUd2VlbiggcHJvcCwgdmFsdWUgKSxcbiAgICAgICAgdGFyZ2V0ID0gdHdlZW4uY3VyKCksXG4gICAgICAgIHBhcnRzID0gcmZ4bnVtLmV4ZWMoIHZhbHVlICksXG4gICAgICAgIHVuaXQgPSBwYXJ0cyAmJiBwYXJ0c1sgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApLFxuXG4gICAgICAgIC8vIFN0YXJ0aW5nIHZhbHVlIGNvbXB1dGF0aW9uIGlzIHJlcXVpcmVkIGZvciBwb3RlbnRpYWwgdW5pdCBtaXNtYXRjaGVzXG4gICAgICAgIHN0YXJ0ID0gKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gfHwgdW5pdCAhPT0gXCJweFwiICYmICt0YXJnZXQgKSAmJlxuICAgICAgICAgIHJmeG51bS5leGVjKCBqUXVlcnkuY3NzKCB0d2Vlbi5lbGVtLCBwcm9wICkgKSxcbiAgICAgICAgc2NhbGUgPSAxLFxuICAgICAgICBtYXhJdGVyYXRpb25zID0gMjA7XG5cbiAgICAgIGlmICggc3RhcnQgJiYgc3RhcnRbIDMgXSAhPT0gdW5pdCApIHtcbiAgICAgICAgLy8gVHJ1c3QgdW5pdHMgcmVwb3J0ZWQgYnkgalF1ZXJ5LmNzc1xuICAgICAgICB1bml0ID0gdW5pdCB8fCBzdGFydFsgMyBdO1xuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSB1cGRhdGUgdGhlIHR3ZWVuIHByb3BlcnRpZXMgbGF0ZXIgb25cbiAgICAgICAgcGFydHMgPSBwYXJ0cyB8fCBbXTtcblxuICAgICAgICAvLyBJdGVyYXRpdmVseSBhcHByb3hpbWF0ZSBmcm9tIGEgbm9uemVybyBzdGFydGluZyBwb2ludFxuICAgICAgICBzdGFydCA9ICt0YXJnZXQgfHwgMTtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgLy8gSWYgcHJldmlvdXMgaXRlcmF0aW9uIHplcm9lZCBvdXQsIGRvdWJsZSB1bnRpbCB3ZSBnZXQgKnNvbWV0aGluZypcbiAgICAgICAgICAvLyBVc2UgYSBzdHJpbmcgZm9yIGRvdWJsaW5nIGZhY3RvciBzbyB3ZSBkb24ndCBhY2NpZGVudGFsbHkgc2VlIHNjYWxlIGFzIHVuY2hhbmdlZCBiZWxvd1xuICAgICAgICAgIHNjYWxlID0gc2NhbGUgfHwgXCIuNVwiO1xuXG4gICAgICAgICAgLy8gQWRqdXN0IGFuZCBhcHBseVxuICAgICAgICAgIHN0YXJ0ID0gc3RhcnQgLyBzY2FsZTtcbiAgICAgICAgICBqUXVlcnkuc3R5bGUoIHR3ZWVuLmVsZW0sIHByb3AsIHN0YXJ0ICsgdW5pdCApO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBzY2FsZSwgdG9sZXJhdGluZyB6ZXJvIG9yIE5hTiBmcm9tIHR3ZWVuLmN1cigpXG4gICAgICAgIC8vIEFuZCBicmVha2luZyB0aGUgbG9vcCBpZiBzY2FsZSBpcyB1bmNoYW5nZWQgb3IgcGVyZmVjdCwgb3IgaWYgd2UndmUganVzdCBoYWQgZW5vdWdoXG4gICAgICAgIH0gd2hpbGUgKCBzY2FsZSAhPT0gKHNjYWxlID0gdHdlZW4uY3VyKCkgLyB0YXJnZXQpICYmIHNjYWxlICE9PSAxICYmIC0tbWF4SXRlcmF0aW9ucyApO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdHdlZW4gcHJvcGVydGllc1xuICAgICAgaWYgKCBwYXJ0cyApIHtcbiAgICAgICAgc3RhcnQgPSB0d2Vlbi5zdGFydCA9ICtzdGFydCB8fCArdGFyZ2V0IHx8IDA7XG4gICAgICAgIHR3ZWVuLnVuaXQgPSB1bml0O1xuICAgICAgICAvLyBJZiBhICs9Ly09IHRva2VuIHdhcyBwcm92aWRlZCwgd2UncmUgZG9pbmcgYSByZWxhdGl2ZSBhbmltYXRpb25cbiAgICAgICAgdHdlZW4uZW5kID0gcGFydHNbIDEgXSA/XG4gICAgICAgICAgc3RhcnQgKyAoIHBhcnRzWyAxIF0gKyAxICkgKiBwYXJ0c1sgMiBdIDpcbiAgICAgICAgICArcGFydHNbIDIgXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHR3ZWVuO1xuICAgIH0gXVxuICB9O1xuXG4vLyBBbmltYXRpb25zIGNyZWF0ZWQgc3luY2hyb25vdXNseSB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XG5mdW5jdGlvbiBjcmVhdGVGeE5vdygpIHtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBmeE5vdyA9IHVuZGVmaW5lZDtcbiAgfSk7XG4gIHJldHVybiAoIGZ4Tm93ID0galF1ZXJ5Lm5vdygpICk7XG59XG5cbi8vIEdlbmVyYXRlIHBhcmFtZXRlcnMgdG8gY3JlYXRlIGEgc3RhbmRhcmQgYW5pbWF0aW9uXG5mdW5jdGlvbiBnZW5GeCggdHlwZSwgaW5jbHVkZVdpZHRoICkge1xuICB2YXIgd2hpY2gsXG4gICAgYXR0cnMgPSB7IGhlaWdodDogdHlwZSB9LFxuICAgIGkgPSAwO1xuXG4gIC8vIGlmIHdlIGluY2x1ZGUgd2lkdGgsIHN0ZXAgdmFsdWUgaXMgMSB0byBkbyBhbGwgY3NzRXhwYW5kIHZhbHVlcyxcbiAgLy8gaWYgd2UgZG9uJ3QgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAyIHRvIHNraXAgb3ZlciBMZWZ0IGFuZCBSaWdodFxuICBpbmNsdWRlV2lkdGggPSBpbmNsdWRlV2lkdGggPyAxIDogMDtcbiAgZm9yICggOyBpIDwgNCA7IGkgKz0gMiAtIGluY2x1ZGVXaWR0aCApIHtcbiAgICB3aGljaCA9IGNzc0V4cGFuZFsgaSBdO1xuICAgIGF0dHJzWyBcIm1hcmdpblwiICsgd2hpY2ggXSA9IGF0dHJzWyBcInBhZGRpbmdcIiArIHdoaWNoIF0gPSB0eXBlO1xuICB9XG5cbiAgaWYgKCBpbmNsdWRlV2lkdGggKSB7XG4gICAgYXR0cnMub3BhY2l0eSA9IGF0dHJzLndpZHRoID0gdHlwZTtcbiAgfVxuXG4gIHJldHVybiBhdHRycztcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHdlZW4oIHZhbHVlLCBwcm9wLCBhbmltYXRpb24gKSB7XG4gIHZhciB0d2VlbixcbiAgICBjb2xsZWN0aW9uID0gKCB0d2VlbmVyc1sgcHJvcCBdIHx8IFtdICkuY29uY2F0KCB0d2VlbmVyc1sgXCIqXCIgXSApLFxuICAgIGluZGV4ID0gMCxcbiAgICBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcbiAgZm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcbiAgICBpZiAoICh0d2VlbiA9IGNvbGxlY3Rpb25bIGluZGV4IF0uY2FsbCggYW5pbWF0aW9uLCBwcm9wLCB2YWx1ZSApKSApIHtcblxuICAgICAgLy8gd2UncmUgZG9uZSB3aXRoIHRoaXMgcHJvcGVydHlcbiAgICAgIHJldHVybiB0d2VlbjtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdFByZWZpbHRlciggZWxlbSwgcHJvcHMsIG9wdHMgKSB7XG4gIC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cbiAgdmFyIHByb3AsIHZhbHVlLCB0b2dnbGUsIHR3ZWVuLCBob29rcywgb2xkZmlyZSwgZGlzcGxheSwgY2hlY2tEaXNwbGF5LFxuICAgIGFuaW0gPSB0aGlzLFxuICAgIG9yaWcgPSB7fSxcbiAgICBzdHlsZSA9IGVsZW0uc3R5bGUsXG4gICAgaGlkZGVuID0gZWxlbS5ub2RlVHlwZSAmJiBpc0hpZGRlbiggZWxlbSApLFxuICAgIGRhdGFTaG93ID0galF1ZXJ5Ll9kYXRhKCBlbGVtLCBcImZ4c2hvd1wiICk7XG5cbiAgLy8gaGFuZGxlIHF1ZXVlOiBmYWxzZSBwcm9taXNlc1xuICBpZiAoICFvcHRzLnF1ZXVlICkge1xuICAgIGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCBcImZ4XCIgKTtcbiAgICBpZiAoIGhvb2tzLnVucXVldWVkID09IG51bGwgKSB7XG4gICAgICBob29rcy51bnF1ZXVlZCA9IDA7XG4gICAgICBvbGRmaXJlID0gaG9va3MuZW1wdHkuZmlyZTtcbiAgICAgIGhvb2tzLmVtcHR5LmZpcmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCAhaG9va3MudW5xdWV1ZWQgKSB7XG4gICAgICAgICAgb2xkZmlyZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICBob29rcy51bnF1ZXVlZCsrO1xuXG4gICAgYW5pbS5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBkb2luZyB0aGlzIG1ha2VzIHN1cmUgdGhhdCB0aGUgY29tcGxldGUgaGFuZGxlciB3aWxsIGJlIGNhbGxlZFxuICAgICAgLy8gYmVmb3JlIHRoaXMgY29tcGxldGVzXG4gICAgICBhbmltLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgaG9va3MudW5xdWV1ZWQtLTtcbiAgICAgICAgaWYgKCAhalF1ZXJ5LnF1ZXVlKCBlbGVtLCBcImZ4XCIgKS5sZW5ndGggKSB7XG4gICAgICAgICAgaG9va3MuZW1wdHkuZmlyZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGhlaWdodC93aWR0aCBvdmVyZmxvdyBwYXNzXG4gIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIFwiaGVpZ2h0XCIgaW4gcHJvcHMgfHwgXCJ3aWR0aFwiIGluIHByb3BzICkgKSB7XG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgbm90aGluZyBzbmVha3Mgb3V0XG4gICAgLy8gUmVjb3JkIGFsbCAzIG92ZXJmbG93IGF0dHJpYnV0ZXMgYmVjYXVzZSBJRSBkb2VzIG5vdFxuICAgIC8vIGNoYW5nZSB0aGUgb3ZlcmZsb3cgYXR0cmlidXRlIHdoZW4gb3ZlcmZsb3dYIGFuZFxuICAgIC8vIG92ZXJmbG93WSBhcmUgc2V0IHRvIHRoZSBzYW1lIHZhbHVlXG4gICAgb3B0cy5vdmVyZmxvdyA9IFsgc3R5bGUub3ZlcmZsb3csIHN0eWxlLm92ZXJmbG93WCwgc3R5bGUub3ZlcmZsb3dZIF07XG5cbiAgICAvLyBTZXQgZGlzcGxheSBwcm9wZXJ0eSB0byBpbmxpbmUtYmxvY2sgZm9yIGhlaWdodC93aWR0aFxuICAgIC8vIGFuaW1hdGlvbnMgb24gaW5saW5lIGVsZW1lbnRzIHRoYXQgYXJlIGhhdmluZyB3aWR0aC9oZWlnaHQgYW5pbWF0ZWRcbiAgICBkaXNwbGF5ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKTtcblxuICAgIC8vIFRlc3QgZGVmYXVsdCBkaXNwbGF5IGlmIGRpc3BsYXkgaXMgY3VycmVudGx5IFwibm9uZVwiXG4gICAgY2hlY2tEaXNwbGF5ID0gZGlzcGxheSA9PT0gXCJub25lXCIgP1xuICAgICAgalF1ZXJ5Ll9kYXRhKCBlbGVtLCBcIm9sZGRpc3BsYXlcIiApIHx8IGRlZmF1bHREaXNwbGF5KCBlbGVtLm5vZGVOYW1lICkgOiBkaXNwbGF5O1xuXG4gICAgaWYgKCBjaGVja0Rpc3BsYXkgPT09IFwiaW5saW5lXCIgJiYgalF1ZXJ5LmNzcyggZWxlbSwgXCJmbG9hdFwiICkgPT09IFwibm9uZVwiICkge1xuXG4gICAgICAvLyBpbmxpbmUtbGV2ZWwgZWxlbWVudHMgYWNjZXB0IGlubGluZS1ibG9jaztcbiAgICAgIC8vIGJsb2NrLWxldmVsIGVsZW1lbnRzIG5lZWQgdG8gYmUgaW5saW5lIHdpdGggbGF5b3V0XG4gICAgICBpZiAoICFzdXBwb3J0LmlubGluZUJsb2NrTmVlZHNMYXlvdXQgfHwgZGVmYXVsdERpc3BsYXkoIGVsZW0ubm9kZU5hbWUgKSA9PT0gXCJpbmxpbmVcIiApIHtcbiAgICAgICAgc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZS56b29tID0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIG9wdHMub3ZlcmZsb3cgKSB7XG4gICAgc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgIGlmICggIXN1cHBvcnQuc2hyaW5rV3JhcEJsb2NrcygpICkge1xuICAgICAgYW5pbS5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93ID0gb3B0cy5vdmVyZmxvd1sgMCBdO1xuICAgICAgICBzdHlsZS5vdmVyZmxvd1ggPSBvcHRzLm92ZXJmbG93WyAxIF07XG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9IG9wdHMub3ZlcmZsb3dbIDIgXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNob3cvaGlkZSBwYXNzXG4gIGZvciAoIHByb3AgaW4gcHJvcHMgKSB7XG4gICAgdmFsdWUgPSBwcm9wc1sgcHJvcCBdO1xuICAgIGlmICggcmZ4dHlwZXMuZXhlYyggdmFsdWUgKSApIHtcbiAgICAgIGRlbGV0ZSBwcm9wc1sgcHJvcCBdO1xuICAgICAgdG9nZ2xlID0gdG9nZ2xlIHx8IHZhbHVlID09PSBcInRvZ2dsZVwiO1xuICAgICAgaWYgKCB2YWx1ZSA9PT0gKCBoaWRkZW4gPyBcImhpZGVcIiA6IFwic2hvd1wiICkgKSB7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgZGF0YVNob3cgbGVmdCBvdmVyIGZyb20gYSBzdG9wcGVkIGhpZGUgb3Igc2hvdyBhbmQgd2UgYXJlIGdvaW5nIHRvIHByb2NlZWQgd2l0aCBzaG93LCB3ZSBzaG91bGQgcHJldGVuZCB0byBiZSBoaWRkZW5cbiAgICAgICAgaWYgKCB2YWx1ZSA9PT0gXCJzaG93XCIgJiYgZGF0YVNob3cgJiYgZGF0YVNob3dbIHByb3AgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgIGhpZGRlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9yaWdbIHByb3AgXSA9IGRhdGFTaG93ICYmIGRhdGFTaG93WyBwcm9wIF0gfHwgalF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wICk7XG5cbiAgICAvLyBBbnkgbm9uLWZ4IHZhbHVlIHN0b3BzIHVzIGZyb20gcmVzdG9yaW5nIHRoZSBvcmlnaW5hbCBkaXNwbGF5IHZhbHVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BsYXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKCAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIG9yaWcgKSApIHtcbiAgICBpZiAoIGRhdGFTaG93ICkge1xuICAgICAgaWYgKCBcImhpZGRlblwiIGluIGRhdGFTaG93ICkge1xuICAgICAgICBoaWRkZW4gPSBkYXRhU2hvdy5oaWRkZW47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFTaG93ID0galF1ZXJ5Ll9kYXRhKCBlbGVtLCBcImZ4c2hvd1wiLCB7fSApO1xuICAgIH1cblxuICAgIC8vIHN0b3JlIHN0YXRlIGlmIGl0cyB0b2dnbGUgLSBlbmFibGVzIC5zdG9wKCkudG9nZ2xlKCkgdG8gXCJyZXZlcnNlXCJcbiAgICBpZiAoIHRvZ2dsZSApIHtcbiAgICAgIGRhdGFTaG93LmhpZGRlbiA9ICFoaWRkZW47XG4gICAgfVxuICAgIGlmICggaGlkZGVuICkge1xuICAgICAgalF1ZXJ5KCBlbGVtICkuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbmltLmRvbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSggZWxlbSApLmhpZGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBhbmltLmRvbmUoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcHJvcDtcbiAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YSggZWxlbSwgXCJmeHNob3dcIiApO1xuICAgICAgZm9yICggcHJvcCBpbiBvcmlnICkge1xuICAgICAgICBqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AsIG9yaWdbIHByb3AgXSApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZvciAoIHByb3AgaW4gb3JpZyApIHtcbiAgICAgIHR3ZWVuID0gY3JlYXRlVHdlZW4oIGhpZGRlbiA/IGRhdGFTaG93WyBwcm9wIF0gOiAwLCBwcm9wLCBhbmltICk7XG5cbiAgICAgIGlmICggISggcHJvcCBpbiBkYXRhU2hvdyApICkge1xuICAgICAgICBkYXRhU2hvd1sgcHJvcCBdID0gdHdlZW4uc3RhcnQ7XG4gICAgICAgIGlmICggaGlkZGVuICkge1xuICAgICAgICAgIHR3ZWVuLmVuZCA9IHR3ZWVuLnN0YXJ0O1xuICAgICAgICAgIHR3ZWVuLnN0YXJ0ID0gcHJvcCA9PT0gXCJ3aWR0aFwiIHx8IHByb3AgPT09IFwiaGVpZ2h0XCIgPyAxIDogMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAvLyBJZiB0aGlzIGlzIGEgbm9vcCBsaWtlIC5oaWRlKCkuaGlkZSgpLCByZXN0b3JlIGFuIG92ZXJ3cml0dGVuIGRpc3BsYXkgdmFsdWVcbiAgfSBlbHNlIGlmICggKGRpc3BsYXkgPT09IFwibm9uZVwiID8gZGVmYXVsdERpc3BsYXkoIGVsZW0ubm9kZU5hbWUgKSA6IGRpc3BsYXkpID09PSBcImlubGluZVwiICkge1xuICAgIHN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuICB9XG59XG5cbmZ1bmN0aW9uIHByb3BGaWx0ZXIoIHByb3BzLCBzcGVjaWFsRWFzaW5nICkge1xuICB2YXIgaW5kZXgsIG5hbWUsIGVhc2luZywgdmFsdWUsIGhvb2tzO1xuXG4gIC8vIGNhbWVsQ2FzZSwgc3BlY2lhbEVhc2luZyBhbmQgZXhwYW5kIGNzc0hvb2sgcGFzc1xuICBmb3IgKCBpbmRleCBpbiBwcm9wcyApIHtcbiAgICBuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggaW5kZXggKTtcbiAgICBlYXNpbmcgPSBzcGVjaWFsRWFzaW5nWyBuYW1lIF07XG4gICAgdmFsdWUgPSBwcm9wc1sgaW5kZXggXTtcbiAgICBpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWx1ZSApICkge1xuICAgICAgZWFzaW5nID0gdmFsdWVbIDEgXTtcbiAgICAgIHZhbHVlID0gcHJvcHNbIGluZGV4IF0gPSB2YWx1ZVsgMCBdO1xuICAgIH1cblxuICAgIGlmICggaW5kZXggIT09IG5hbWUgKSB7XG4gICAgICBwcm9wc1sgbmFtZSBdID0gdmFsdWU7XG4gICAgICBkZWxldGUgcHJvcHNbIGluZGV4IF07XG4gICAgfVxuXG4gICAgaG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXTtcbiAgICBpZiAoIGhvb2tzICYmIFwiZXhwYW5kXCIgaW4gaG9va3MgKSB7XG4gICAgICB2YWx1ZSA9IGhvb2tzLmV4cGFuZCggdmFsdWUgKTtcbiAgICAgIGRlbGV0ZSBwcm9wc1sgbmFtZSBdO1xuXG4gICAgICAvLyBub3QgcXVpdGUgJC5leHRlbmQsIHRoaXMgd29udCBvdmVyd3JpdGUga2V5cyBhbHJlYWR5IHByZXNlbnQuXG4gICAgICAvLyBhbHNvIC0gcmV1c2luZyAnaW5kZXgnIGZyb20gYWJvdmUgYmVjYXVzZSB3ZSBoYXZlIHRoZSBjb3JyZWN0IFwibmFtZVwiXG4gICAgICBmb3IgKCBpbmRleCBpbiB2YWx1ZSApIHtcbiAgICAgICAgaWYgKCAhKCBpbmRleCBpbiBwcm9wcyApICkge1xuICAgICAgICAgIHByb3BzWyBpbmRleCBdID0gdmFsdWVbIGluZGV4IF07XG4gICAgICAgICAgc3BlY2lhbEVhc2luZ1sgaW5kZXggXSA9IGVhc2luZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzcGVjaWFsRWFzaW5nWyBuYW1lIF0gPSBlYXNpbmc7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIEFuaW1hdGlvbiggZWxlbSwgcHJvcGVydGllcywgb3B0aW9ucyApIHtcbiAgdmFyIHJlc3VsdCxcbiAgICBzdG9wcGVkLFxuICAgIGluZGV4ID0gMCxcbiAgICBsZW5ndGggPSBhbmltYXRpb25QcmVmaWx0ZXJzLmxlbmd0aCxcbiAgICBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLmFsd2F5cyggZnVuY3Rpb24oKSB7XG4gICAgICAvLyBkb24ndCBtYXRjaCBlbGVtIGluIHRoZSA6YW5pbWF0ZWQgc2VsZWN0b3JcbiAgICAgIGRlbGV0ZSB0aWNrLmVsZW07XG4gICAgfSksXG4gICAgdGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCBzdG9wcGVkICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIgY3VycmVudFRpbWUgPSBmeE5vdyB8fCBjcmVhdGVGeE5vdygpLFxuICAgICAgICByZW1haW5pbmcgPSBNYXRoLm1heCggMCwgYW5pbWF0aW9uLnN0YXJ0VGltZSArIGFuaW1hdGlvbi5kdXJhdGlvbiAtIGN1cnJlbnRUaW1lICksXG4gICAgICAgIC8vIGFyY2hhaWMgY3Jhc2ggYnVnIHdvbid0IGFsbG93IHVzIHRvIHVzZSAxIC0gKCAwLjUgfHwgMCApICgjMTI0OTcpXG4gICAgICAgIHRlbXAgPSByZW1haW5pbmcgLyBhbmltYXRpb24uZHVyYXRpb24gfHwgMCxcbiAgICAgICAgcGVyY2VudCA9IDEgLSB0ZW1wLFxuICAgICAgICBpbmRleCA9IDAsXG4gICAgICAgIGxlbmd0aCA9IGFuaW1hdGlvbi50d2VlbnMubGVuZ3RoO1xuXG4gICAgICBmb3IgKCA7IGluZGV4IDwgbGVuZ3RoIDsgaW5kZXgrKyApIHtcbiAgICAgICAgYW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIHBlcmNlbnQgKTtcbiAgICAgIH1cblxuICAgICAgZGVmZXJyZWQubm90aWZ5V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIHBlcmNlbnQsIHJlbWFpbmluZyBdKTtcblxuICAgICAgaWYgKCBwZXJjZW50IDwgMSAmJiBsZW5ndGggKSB7XG4gICAgICAgIHJldHVybiByZW1haW5pbmc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24gXSApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBhbmltYXRpb24gPSBkZWZlcnJlZC5wcm9taXNlKHtcbiAgICAgIGVsZW06IGVsZW0sXG4gICAgICBwcm9wczogalF1ZXJ5LmV4dGVuZCgge30sIHByb3BlcnRpZXMgKSxcbiAgICAgIG9wdHM6IGpRdWVyeS5leHRlbmQoIHRydWUsIHsgc3BlY2lhbEVhc2luZzoge30gfSwgb3B0aW9ucyApLFxuICAgICAgb3JpZ2luYWxQcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxuICAgICAgb3JpZ2luYWxPcHRpb25zOiBvcHRpb25zLFxuICAgICAgc3RhcnRUaW1lOiBmeE5vdyB8fCBjcmVhdGVGeE5vdygpLFxuICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXG4gICAgICB0d2VlbnM6IFtdLFxuICAgICAgY3JlYXRlVHdlZW46IGZ1bmN0aW9uKCBwcm9wLCBlbmQgKSB7XG4gICAgICAgIHZhciB0d2VlbiA9IGpRdWVyeS5Ud2VlbiggZWxlbSwgYW5pbWF0aW9uLm9wdHMsIHByb3AsIGVuZCxcbiAgICAgICAgICAgIGFuaW1hdGlvbi5vcHRzLnNwZWNpYWxFYXNpbmdbIHByb3AgXSB8fCBhbmltYXRpb24ub3B0cy5lYXNpbmcgKTtcbiAgICAgICAgYW5pbWF0aW9uLnR3ZWVucy5wdXNoKCB0d2VlbiApO1xuICAgICAgICByZXR1cm4gdHdlZW47XG4gICAgICB9LFxuICAgICAgc3RvcDogZnVuY3Rpb24oIGdvdG9FbmQgKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgLy8gaWYgd2UgYXJlIGdvaW5nIHRvIHRoZSBlbmQsIHdlIHdhbnQgdG8gcnVuIGFsbCB0aGUgdHdlZW5zXG4gICAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIHNraXAgdGhpcyBwYXJ0XG4gICAgICAgICAgbGVuZ3RoID0gZ290b0VuZCA/IGFuaW1hdGlvbi50d2VlbnMubGVuZ3RoIDogMDtcbiAgICAgICAgaWYgKCBzdG9wcGVkICkge1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHN0b3BwZWQgPSB0cnVlO1xuICAgICAgICBmb3IgKCA7IGluZGV4IDwgbGVuZ3RoIDsgaW5kZXgrKyApIHtcbiAgICAgICAgICBhbmltYXRpb24udHdlZW5zWyBpbmRleCBdLnJ1biggMSApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzb2x2ZSB3aGVuIHdlIHBsYXllZCB0aGUgbGFzdCBmcmFtZVxuICAgICAgICAvLyBvdGhlcndpc2UsIHJlamVjdFxuICAgICAgICBpZiAoIGdvdG9FbmQgKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBnb3RvRW5kIF0gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3RXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgZ290b0VuZCBdICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfSksXG4gICAgcHJvcHMgPSBhbmltYXRpb24ucHJvcHM7XG5cbiAgcHJvcEZpbHRlciggcHJvcHMsIGFuaW1hdGlvbi5vcHRzLnNwZWNpYWxFYXNpbmcgKTtcblxuICBmb3IgKCA7IGluZGV4IDwgbGVuZ3RoIDsgaW5kZXgrKyApIHtcbiAgICByZXN1bHQgPSBhbmltYXRpb25QcmVmaWx0ZXJzWyBpbmRleCBdLmNhbGwoIGFuaW1hdGlvbiwgZWxlbSwgcHJvcHMsIGFuaW1hdGlvbi5vcHRzICk7XG4gICAgaWYgKCByZXN1bHQgKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIGpRdWVyeS5tYXAoIHByb3BzLCBjcmVhdGVUd2VlbiwgYW5pbWF0aW9uICk7XG5cbiAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggYW5pbWF0aW9uLm9wdHMuc3RhcnQgKSApIHtcbiAgICBhbmltYXRpb24ub3B0cy5zdGFydC5jYWxsKCBlbGVtLCBhbmltYXRpb24gKTtcbiAgfVxuXG4gIGpRdWVyeS5meC50aW1lcihcbiAgICBqUXVlcnkuZXh0ZW5kKCB0aWNrLCB7XG4gICAgICBlbGVtOiBlbGVtLFxuICAgICAgYW5pbTogYW5pbWF0aW9uLFxuICAgICAgcXVldWU6IGFuaW1hdGlvbi5vcHRzLnF1ZXVlXG4gICAgfSlcbiAgKTtcblxuICAvLyBhdHRhY2ggY2FsbGJhY2tzIGZyb20gb3B0aW9uc1xuICByZXR1cm4gYW5pbWF0aW9uLnByb2dyZXNzKCBhbmltYXRpb24ub3B0cy5wcm9ncmVzcyApXG4gICAgLmRvbmUoIGFuaW1hdGlvbi5vcHRzLmRvbmUsIGFuaW1hdGlvbi5vcHRzLmNvbXBsZXRlIClcbiAgICAuZmFpbCggYW5pbWF0aW9uLm9wdHMuZmFpbCApXG4gICAgLmFsd2F5cyggYW5pbWF0aW9uLm9wdHMuYWx3YXlzICk7XG59XG5cbmpRdWVyeS5BbmltYXRpb24gPSBqUXVlcnkuZXh0ZW5kKCBBbmltYXRpb24sIHtcbiAgdHdlZW5lcjogZnVuY3Rpb24oIHByb3BzLCBjYWxsYmFjayApIHtcbiAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBwcm9wcyApICkge1xuICAgICAgY2FsbGJhY2sgPSBwcm9wcztcbiAgICAgIHByb3BzID0gWyBcIipcIiBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcyA9IHByb3BzLnNwbGl0KFwiIFwiKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvcCxcbiAgICAgIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuICAgICAgcHJvcCA9IHByb3BzWyBpbmRleCBdO1xuICAgICAgdHdlZW5lcnNbIHByb3AgXSA9IHR3ZWVuZXJzWyBwcm9wIF0gfHwgW107XG4gICAgICB0d2VlbmVyc1sgcHJvcCBdLnVuc2hpZnQoIGNhbGxiYWNrICk7XG4gICAgfVxuICB9LFxuXG4gIHByZWZpbHRlcjogZnVuY3Rpb24oIGNhbGxiYWNrLCBwcmVwZW5kICkge1xuICAgIGlmICggcHJlcGVuZCApIHtcbiAgICAgIGFuaW1hdGlvblByZWZpbHRlcnMudW5zaGlmdCggY2FsbGJhY2sgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYW5pbWF0aW9uUHJlZmlsdGVycy5wdXNoKCBjYWxsYmFjayApO1xuICAgIH1cbiAgfVxufSk7XG5cbmpRdWVyeS5zcGVlZCA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBmbiApIHtcbiAgdmFyIG9wdCA9IHNwZWVkICYmIHR5cGVvZiBzcGVlZCA9PT0gXCJvYmplY3RcIiA/IGpRdWVyeS5leHRlbmQoIHt9LCBzcGVlZCApIDoge1xuICAgIGNvbXBsZXRlOiBmbiB8fCAhZm4gJiYgZWFzaW5nIHx8XG4gICAgICBqUXVlcnkuaXNGdW5jdGlvbiggc3BlZWQgKSAmJiBzcGVlZCxcbiAgICBkdXJhdGlvbjogc3BlZWQsXG4gICAgZWFzaW5nOiBmbiAmJiBlYXNpbmcgfHwgZWFzaW5nICYmICFqUXVlcnkuaXNGdW5jdGlvbiggZWFzaW5nICkgJiYgZWFzaW5nXG4gIH07XG5cbiAgb3B0LmR1cmF0aW9uID0galF1ZXJ5LmZ4Lm9mZiA/IDAgOiB0eXBlb2Ygb3B0LmR1cmF0aW9uID09PSBcIm51bWJlclwiID8gb3B0LmR1cmF0aW9uIDpcbiAgICBvcHQuZHVyYXRpb24gaW4galF1ZXJ5LmZ4LnNwZWVkcyA/IGpRdWVyeS5meC5zcGVlZHNbIG9wdC5kdXJhdGlvbiBdIDogalF1ZXJ5LmZ4LnNwZWVkcy5fZGVmYXVsdDtcblxuICAvLyBub3JtYWxpemUgb3B0LnF1ZXVlIC0gdHJ1ZS91bmRlZmluZWQvbnVsbCAtPiBcImZ4XCJcbiAgaWYgKCBvcHQucXVldWUgPT0gbnVsbCB8fCBvcHQucXVldWUgPT09IHRydWUgKSB7XG4gICAgb3B0LnF1ZXVlID0gXCJmeFwiO1xuICB9XG5cbiAgLy8gUXVldWVpbmdcbiAgb3B0Lm9sZCA9IG9wdC5jb21wbGV0ZTtcblxuICBvcHQuY29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHQub2xkICkgKSB7XG4gICAgICBvcHQub2xkLmNhbGwoIHRoaXMgKTtcbiAgICB9XG5cbiAgICBpZiAoIG9wdC5xdWV1ZSApIHtcbiAgICAgIGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCBvcHQucXVldWUgKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG9wdDtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBmYWRlVG86IGZ1bmN0aW9uKCBzcGVlZCwgdG8sIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cbiAgICAvLyBzaG93IGFueSBoaWRkZW4gZWxlbWVudHMgYWZ0ZXIgc2V0dGluZyBvcGFjaXR5IHRvIDBcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoIGlzSGlkZGVuICkuY3NzKCBcIm9wYWNpdHlcIiwgMCApLnNob3coKVxuXG4gICAgICAvLyBhbmltYXRlIHRvIHRoZSB2YWx1ZSBzcGVjaWZpZWRcbiAgICAgIC5lbmQoKS5hbmltYXRlKHsgb3BhY2l0eTogdG8gfSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcbiAgfSxcbiAgYW5pbWF0ZTogZnVuY3Rpb24oIHByb3AsIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuICAgIHZhciBlbXB0eSA9IGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBwcm9wICksXG4gICAgICBvcHRhbGwgPSBqUXVlcnkuc3BlZWQoIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICksXG4gICAgICBkb0FuaW1hdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBPcGVyYXRlIG9uIGEgY29weSBvZiBwcm9wIHNvIHBlci1wcm9wZXJ0eSBlYXNpbmcgd29uJ3QgYmUgbG9zdFxuICAgICAgICB2YXIgYW5pbSA9IEFuaW1hdGlvbiggdGhpcywgalF1ZXJ5LmV4dGVuZCgge30sIHByb3AgKSwgb3B0YWxsICk7XG5cbiAgICAgICAgLy8gRW1wdHkgYW5pbWF0aW9ucywgb3IgZmluaXNoaW5nIHJlc29sdmVzIGltbWVkaWF0ZWx5XG4gICAgICAgIGlmICggZW1wdHkgfHwgalF1ZXJ5Ll9kYXRhKCB0aGlzLCBcImZpbmlzaFwiICkgKSB7XG4gICAgICAgICAgYW5pbS5zdG9wKCB0cnVlICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBkb0FuaW1hdGlvbi5maW5pc2ggPSBkb0FuaW1hdGlvbjtcblxuICAgIHJldHVybiBlbXB0eSB8fCBvcHRhbGwucXVldWUgPT09IGZhbHNlID9cbiAgICAgIHRoaXMuZWFjaCggZG9BbmltYXRpb24gKSA6XG4gICAgICB0aGlzLnF1ZXVlKCBvcHRhbGwucXVldWUsIGRvQW5pbWF0aW9uICk7XG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKCB0eXBlLCBjbGVhclF1ZXVlLCBnb3RvRW5kICkge1xuICAgIHZhciBzdG9wUXVldWUgPSBmdW5jdGlvbiggaG9va3MgKSB7XG4gICAgICB2YXIgc3RvcCA9IGhvb2tzLnN0b3A7XG4gICAgICBkZWxldGUgaG9va3Muc3RvcDtcbiAgICAgIHN0b3AoIGdvdG9FbmQgKTtcbiAgICB9O1xuXG4gICAgaWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIGdvdG9FbmQgPSBjbGVhclF1ZXVlO1xuICAgICAgY2xlYXJRdWV1ZSA9IHR5cGU7XG4gICAgICB0eXBlID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoIGNsZWFyUXVldWUgJiYgdHlwZSAhPT0gZmFsc2UgKSB7XG4gICAgICB0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRlcXVldWUgPSB0cnVlLFxuICAgICAgICBpbmRleCA9IHR5cGUgIT0gbnVsbCAmJiB0eXBlICsgXCJxdWV1ZUhvb2tzXCIsXG4gICAgICAgIHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXG4gICAgICAgIGRhdGEgPSBqUXVlcnkuX2RhdGEoIHRoaXMgKTtcblxuICAgICAgaWYgKCBpbmRleCApIHtcbiAgICAgICAgaWYgKCBkYXRhWyBpbmRleCBdICYmIGRhdGFbIGluZGV4IF0uc3RvcCApIHtcbiAgICAgICAgICBzdG9wUXVldWUoIGRhdGFbIGluZGV4IF0gKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICggaW5kZXggaW4gZGF0YSApIHtcbiAgICAgICAgICBpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICYmIHJydW4udGVzdCggaW5kZXggKSApIHtcbiAgICAgICAgICAgIHN0b3BRdWV1ZSggZGF0YVsgaW5kZXggXSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKCBpbmRleCA9IHRpbWVycy5sZW5ndGg7IGluZGV4LS07ICkge1xuICAgICAgICBpZiAoIHRpbWVyc1sgaW5kZXggXS5lbGVtID09PSB0aGlzICYmICh0eXBlID09IG51bGwgfHwgdGltZXJzWyBpbmRleCBdLnF1ZXVlID09PSB0eXBlKSApIHtcbiAgICAgICAgICB0aW1lcnNbIGluZGV4IF0uYW5pbS5zdG9wKCBnb3RvRW5kICk7XG4gICAgICAgICAgZGVxdWV1ZSA9IGZhbHNlO1xuICAgICAgICAgIHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc3RhcnQgdGhlIG5leHQgaW4gdGhlIHF1ZXVlIGlmIHRoZSBsYXN0IHN0ZXAgd2Fzbid0IGZvcmNlZFxuICAgICAgLy8gdGltZXJzIGN1cnJlbnRseSB3aWxsIGNhbGwgdGhlaXIgY29tcGxldGUgY2FsbGJhY2tzLCB3aGljaCB3aWxsIGRlcXVldWVcbiAgICAgIC8vIGJ1dCBvbmx5IGlmIHRoZXkgd2VyZSBnb3RvRW5kXG4gICAgICBpZiAoIGRlcXVldWUgfHwgIWdvdG9FbmQgKSB7XG4gICAgICAgIGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIGZpbmlzaDogZnVuY3Rpb24oIHR5cGUgKSB7XG4gICAgaWYgKCB0eXBlICE9PSBmYWxzZSApIHtcbiAgICAgIHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpbmRleCxcbiAgICAgICAgZGF0YSA9IGpRdWVyeS5fZGF0YSggdGhpcyApLFxuICAgICAgICBxdWV1ZSA9IGRhdGFbIHR5cGUgKyBcInF1ZXVlXCIgXSxcbiAgICAgICAgaG9va3MgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgXSxcbiAgICAgICAgdGltZXJzID0galF1ZXJ5LnRpbWVycyxcbiAgICAgICAgbGVuZ3RoID0gcXVldWUgPyBxdWV1ZS5sZW5ndGggOiAwO1xuXG4gICAgICAvLyBlbmFibGUgZmluaXNoaW5nIGZsYWcgb24gcHJpdmF0ZSBkYXRhXG4gICAgICBkYXRhLmZpbmlzaCA9IHRydWU7XG5cbiAgICAgIC8vIGVtcHR5IHRoZSBxdWV1ZSBmaXJzdFxuICAgICAgalF1ZXJ5LnF1ZXVlKCB0aGlzLCB0eXBlLCBbXSApO1xuXG4gICAgICBpZiAoIGhvb2tzICYmIGhvb2tzLnN0b3AgKSB7XG4gICAgICAgIGhvb2tzLnN0b3AuY2FsbCggdGhpcywgdHJ1ZSApO1xuICAgICAgfVxuXG4gICAgICAvLyBsb29rIGZvciBhbnkgYWN0aXZlIGFuaW1hdGlvbnMsIGFuZCBmaW5pc2ggdGhlbVxuICAgICAgZm9yICggaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOyApIHtcbiAgICAgICAgaWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJiB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUgKSB7XG4gICAgICAgICAgdGltZXJzWyBpbmRleCBdLmFuaW0uc3RvcCggdHJ1ZSApO1xuICAgICAgICAgIHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbG9vayBmb3IgYW55IGFuaW1hdGlvbnMgaW4gdGhlIG9sZCBxdWV1ZSBhbmQgZmluaXNoIHRoZW1cbiAgICAgIGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG4gICAgICAgIGlmICggcXVldWVbIGluZGV4IF0gJiYgcXVldWVbIGluZGV4IF0uZmluaXNoICkge1xuICAgICAgICAgIHF1ZXVlWyBpbmRleCBdLmZpbmlzaC5jYWxsKCB0aGlzICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdHVybiBvZmYgZmluaXNoaW5nIGZsYWdcbiAgICAgIGRlbGV0ZSBkYXRhLmZpbmlzaDtcbiAgICB9KTtcbiAgfVxufSk7XG5cbmpRdWVyeS5lYWNoKFsgXCJ0b2dnbGVcIiwgXCJzaG93XCIsIFwiaGlkZVwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuICB2YXIgY3NzRm4gPSBqUXVlcnkuZm5bIG5hbWUgXTtcbiAgalF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG4gICAgcmV0dXJuIHNwZWVkID09IG51bGwgfHwgdHlwZW9mIHNwZWVkID09PSBcImJvb2xlYW5cIiA/XG4gICAgICBjc3NGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICkgOlxuICAgICAgdGhpcy5hbmltYXRlKCBnZW5GeCggbmFtZSwgdHJ1ZSApLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuICB9O1xufSk7XG5cbi8vIEdlbmVyYXRlIHNob3J0Y3V0cyBmb3IgY3VzdG9tIGFuaW1hdGlvbnNcbmpRdWVyeS5lYWNoKHtcbiAgc2xpZGVEb3duOiBnZW5GeChcInNob3dcIiksXG4gIHNsaWRlVXA6IGdlbkZ4KFwiaGlkZVwiKSxcbiAgc2xpZGVUb2dnbGU6IGdlbkZ4KFwidG9nZ2xlXCIpLFxuICBmYWRlSW46IHsgb3BhY2l0eTogXCJzaG93XCIgfSxcbiAgZmFkZU91dDogeyBvcGFjaXR5OiBcImhpZGVcIiB9LFxuICBmYWRlVG9nZ2xlOiB7IG9wYWNpdHk6IFwidG9nZ2xlXCIgfVxufSwgZnVuY3Rpb24oIG5hbWUsIHByb3BzICkge1xuICBqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcbiAgICByZXR1cm4gdGhpcy5hbmltYXRlKCBwcm9wcywgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcbiAgfTtcbn0pO1xuXG5qUXVlcnkudGltZXJzID0gW107XG5qUXVlcnkuZngudGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGltZXIsXG4gICAgdGltZXJzID0galF1ZXJ5LnRpbWVycyxcbiAgICBpID0gMDtcblxuICBmeE5vdyA9IGpRdWVyeS5ub3coKTtcblxuICBmb3IgKCA7IGkgPCB0aW1lcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgdGltZXIgPSB0aW1lcnNbIGkgXTtcbiAgICAvLyBDaGVja3MgdGhlIHRpbWVyIGhhcyBub3QgYWxyZWFkeSBiZWVuIHJlbW92ZWRcbiAgICBpZiAoICF0aW1lcigpICYmIHRpbWVyc1sgaSBdID09PSB0aW1lciApIHtcbiAgICAgIHRpbWVycy5zcGxpY2UoIGktLSwgMSApO1xuICAgIH1cbiAgfVxuXG4gIGlmICggIXRpbWVycy5sZW5ndGggKSB7XG4gICAgalF1ZXJ5LmZ4LnN0b3AoKTtcbiAgfVxuICBmeE5vdyA9IHVuZGVmaW5lZDtcbn07XG5cbmpRdWVyeS5meC50aW1lciA9IGZ1bmN0aW9uKCB0aW1lciApIHtcbiAgalF1ZXJ5LnRpbWVycy5wdXNoKCB0aW1lciApO1xuICBpZiAoIHRpbWVyKCkgKSB7XG4gICAgalF1ZXJ5LmZ4LnN0YXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgalF1ZXJ5LnRpbWVycy5wb3AoKTtcbiAgfVxufTtcblxualF1ZXJ5LmZ4LmludGVydmFsID0gMTM7XG5cbmpRdWVyeS5meC5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aW1lcklkICkge1xuICAgIHRpbWVySWQgPSBzZXRJbnRlcnZhbCggalF1ZXJ5LmZ4LnRpY2ssIGpRdWVyeS5meC5pbnRlcnZhbCApO1xuICB9XG59O1xuXG5qUXVlcnkuZnguc3RvcCA9IGZ1bmN0aW9uKCkge1xuICBjbGVhckludGVydmFsKCB0aW1lcklkICk7XG4gIHRpbWVySWQgPSBudWxsO1xufTtcblxualF1ZXJ5LmZ4LnNwZWVkcyA9IHtcbiAgc2xvdzogNjAwLFxuICBmYXN0OiAyMDAsXG4gIC8vIERlZmF1bHQgc3BlZWRcbiAgX2RlZmF1bHQ6IDQwMFxufTtcblxuXG4vLyBCYXNlZCBvZmYgb2YgdGhlIHBsdWdpbiBieSBDbGludCBIZWxmZXJzLCB3aXRoIHBlcm1pc3Npb24uXG4vLyBodHRwOi8vYmxpbmRzaWduYWxzLmNvbS9pbmRleC5waHAvMjAwOS8wNy9qcXVlcnktZGVsYXkvXG5qUXVlcnkuZm4uZGVsYXkgPSBmdW5jdGlvbiggdGltZSwgdHlwZSApIHtcbiAgdGltZSA9IGpRdWVyeS5meCA/IGpRdWVyeS5meC5zcGVlZHNbIHRpbWUgXSB8fCB0aW1lIDogdGltZTtcbiAgdHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG4gIHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlLCBmdW5jdGlvbiggbmV4dCwgaG9va3MgKSB7XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCBuZXh0LCB0aW1lICk7XG4gICAgaG9va3Muc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG4gICAgfTtcbiAgfSk7XG59O1xuXG5cbihmdW5jdGlvbigpIHtcbiAgLy8gTWluaWZpZWQ6IHZhciBhLGIsYyxkLGVcbiAgdmFyIGlucHV0LCBkaXYsIHNlbGVjdCwgYSwgb3B0O1xuXG4gIC8vIFNldHVwXG4gIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcbiAgZGl2LnNldEF0dHJpYnV0ZSggXCJjbGFzc05hbWVcIiwgXCJ0XCIgKTtcbiAgZGl2LmlubmVySFRNTCA9IFwiICA8bGluay8+PHRhYmxlPjwvdGFibGU+PGEgaHJlZj0nL2EnPmE8L2E+PGlucHV0IHR5cGU9J2NoZWNrYm94Jy8+XCI7XG4gIGEgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhXCIpWyAwIF07XG5cbiAgLy8gRmlyc3QgYmF0Y2ggb2YgdGVzdHMuXG4gIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gIG9wdCA9IHNlbGVjdC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSApO1xuICBpbnB1dCA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWyAwIF07XG5cbiAgYS5zdHlsZS5jc3NUZXh0ID0gXCJ0b3A6MXB4XCI7XG5cbiAgLy8gVGVzdCBzZXRBdHRyaWJ1dGUgb24gY2FtZWxDYXNlIGNsYXNzLiBJZiBpdCB3b3Jrcywgd2UgbmVlZCBhdHRyRml4ZXMgd2hlbiBkb2luZyBnZXQvc2V0QXR0cmlidXRlIChpZTYvNylcbiAgc3VwcG9ydC5nZXRTZXRBdHRyaWJ1dGUgPSBkaXYuY2xhc3NOYW1lICE9PSBcInRcIjtcblxuICAvLyBHZXQgdGhlIHN0eWxlIGluZm9ybWF0aW9uIGZyb20gZ2V0QXR0cmlidXRlXG4gIC8vIChJRSB1c2VzIC5jc3NUZXh0IGluc3RlYWQpXG4gIHN1cHBvcnQuc3R5bGUgPSAvdG9wLy50ZXN0KCBhLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpICk7XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgVVJMcyBhcmVuJ3QgbWFuaXB1bGF0ZWRcbiAgLy8gKElFIG5vcm1hbGl6ZXMgaXQgYnkgZGVmYXVsdClcbiAgc3VwcG9ydC5ocmVmTm9ybWFsaXplZCA9IGEuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIvYVwiO1xuXG4gIC8vIENoZWNrIHRoZSBkZWZhdWx0IGNoZWNrYm94L3JhZGlvIHZhbHVlIChcIlwiIG9uIFdlYktpdDsgXCJvblwiIGVsc2V3aGVyZSlcbiAgc3VwcG9ydC5jaGVja09uID0gISFpbnB1dC52YWx1ZTtcblxuICAvLyBNYWtlIHN1cmUgdGhhdCBhIHNlbGVjdGVkLWJ5LWRlZmF1bHQgb3B0aW9uIGhhcyBhIHdvcmtpbmcgc2VsZWN0ZWQgcHJvcGVydHkuXG4gIC8vIChXZWJLaXQgZGVmYXVsdHMgdG8gZmFsc2UgaW5zdGVhZCBvZiB0cnVlLCBJRSB0b28sIGlmIGl0J3MgaW4gYW4gb3B0Z3JvdXApXG4gIHN1cHBvcnQub3B0U2VsZWN0ZWQgPSBvcHQuc2VsZWN0ZWQ7XG5cbiAgLy8gVGVzdHMgZm9yIGVuY3R5cGUgc3VwcG9ydCBvbiBhIGZvcm0gKCM2NzQzKVxuICBzdXBwb3J0LmVuY3R5cGUgPSAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpLmVuY3R5cGU7XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG9wdGlvbnMgaW5zaWRlIGRpc2FibGVkIHNlbGVjdHMgYXJlbid0IG1hcmtlZCBhcyBkaXNhYmxlZFxuICAvLyAoV2ViS2l0IG1hcmtzIHRoZW0gYXMgZGlzYWJsZWQpXG4gIHNlbGVjdC5kaXNhYmxlZCA9IHRydWU7XG4gIHN1cHBvcnQub3B0RGlzYWJsZWQgPSAhb3B0LmRpc2FibGVkO1xuXG4gIC8vIFN1cHBvcnQ6IElFOCBvbmx5XG4gIC8vIENoZWNrIGlmIHdlIGNhbiB0cnVzdCBnZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKVxuICBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiwgXCJcIiApO1xuICBzdXBwb3J0LmlucHV0ID0gaW5wdXQuZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gXCJcIjtcblxuICAvLyBDaGVjayBpZiBhbiBpbnB1dCBtYWludGFpbnMgaXRzIHZhbHVlIGFmdGVyIGJlY29taW5nIGEgcmFkaW9cbiAgaW5wdXQudmFsdWUgPSBcInRcIjtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJyYWRpb1wiICk7XG4gIHN1cHBvcnQucmFkaW9WYWx1ZSA9IGlucHV0LnZhbHVlID09PSBcInRcIjtcbn0pKCk7XG5cblxudmFyIHJyZXR1cm4gPSAvXFxyL2c7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICB2YWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICB2YXIgaG9va3MsIHJldCwgaXNGdW5jdGlvbixcbiAgICAgIGVsZW0gPSB0aGlzWzBdO1xuXG4gICAgaWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcbiAgICAgIGlmICggZWxlbSApIHtcbiAgICAgICAgaG9va3MgPSBqUXVlcnkudmFsSG9va3NbIGVsZW0udHlwZSBdIHx8IGpRdWVyeS52YWxIb29rc1sgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpIF07XG5cbiAgICAgICAgaWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmIChyZXQgPSBob29rcy5nZXQoIGVsZW0sIFwidmFsdWVcIiApKSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXQgPSBlbGVtLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0eXBlb2YgcmV0ID09PSBcInN0cmluZ1wiID9cbiAgICAgICAgICAvLyBoYW5kbGUgbW9zdCBjb21tb24gc3RyaW5nIGNhc2VzXG4gICAgICAgICAgcmV0LnJlcGxhY2UocnJldHVybiwgXCJcIikgOlxuICAgICAgICAgIC8vIGhhbmRsZSBjYXNlcyB3aGVyZSB2YWx1ZSBpcyBudWxsL3VuZGVmIG9yIG51bWJlclxuICAgICAgICAgIHJldCA9PSBudWxsID8gXCJcIiA6IHJldDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGkgKSB7XG4gICAgICB2YXIgdmFsO1xuXG4gICAgICBpZiAoIHRoaXMubm9kZVR5cGUgIT09IDEgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCBpc0Z1bmN0aW9uICkge1xuICAgICAgICB2YWwgPSB2YWx1ZS5jYWxsKCB0aGlzLCBpLCBqUXVlcnkoIHRoaXMgKS52YWwoKSApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFRyZWF0IG51bGwvdW5kZWZpbmVkIGFzIFwiXCI7IGNvbnZlcnQgbnVtYmVycyB0byBzdHJpbmdcbiAgICAgIGlmICggdmFsID09IG51bGwgKSB7XG4gICAgICAgIHZhbCA9IFwiXCI7XG4gICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICkge1xuICAgICAgICB2YWwgKz0gXCJcIjtcbiAgICAgIH0gZWxzZSBpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWwgKSApIHtcbiAgICAgICAgdmFsID0galF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKyBcIlwiO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaG9va3MgPSBqUXVlcnkudmFsSG9va3NbIHRoaXMudHlwZSBdIHx8IGpRdWVyeS52YWxIb29rc1sgdGhpcy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpIF07XG5cbiAgICAgIC8vIElmIHNldCByZXR1cm5zIHVuZGVmaW5lZCwgZmFsbCBiYWNrIHRvIG5vcm1hbCBzZXR0aW5nXG4gICAgICBpZiAoICFob29rcyB8fCAhKFwic2V0XCIgaW4gaG9va3MpIHx8IGhvb2tzLnNldCggdGhpcywgdmFsLCBcInZhbHVlXCIgKSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcblxualF1ZXJ5LmV4dGVuZCh7XG4gIHZhbEhvb2tzOiB7XG4gICAgb3B0aW9uOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICB2YXIgdmFsID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ2YWx1ZVwiICk7XG4gICAgICAgIHJldHVybiB2YWwgIT0gbnVsbCA/XG4gICAgICAgICAgdmFsIDpcbiAgICAgICAgICAvLyBTdXBwb3J0OiBJRTEwLTExK1xuICAgICAgICAgIC8vIG9wdGlvbi50ZXh0IHRocm93cyBleGNlcHRpb25zICgjMTQ2ODYsICMxNDg1OClcbiAgICAgICAgICBqUXVlcnkudHJpbSggalF1ZXJ5LnRleHQoIGVsZW0gKSApO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICB2YXIgdmFsdWUsIG9wdGlvbixcbiAgICAgICAgICBvcHRpb25zID0gZWxlbS5vcHRpb25zLFxuICAgICAgICAgIGluZGV4ID0gZWxlbS5zZWxlY3RlZEluZGV4LFxuICAgICAgICAgIG9uZSA9IGVsZW0udHlwZSA9PT0gXCJzZWxlY3Qtb25lXCIgfHwgaW5kZXggPCAwLFxuICAgICAgICAgIHZhbHVlcyA9IG9uZSA/IG51bGwgOiBbXSxcbiAgICAgICAgICBtYXggPSBvbmUgPyBpbmRleCArIDEgOiBvcHRpb25zLmxlbmd0aCxcbiAgICAgICAgICBpID0gaW5kZXggPCAwID9cbiAgICAgICAgICAgIG1heCA6XG4gICAgICAgICAgICBvbmUgPyBpbmRleCA6IDA7XG5cbiAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgc2VsZWN0ZWQgb3B0aW9uc1xuICAgICAgICBmb3IgKCA7IGkgPCBtYXg7IGkrKyApIHtcbiAgICAgICAgICBvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cbiAgICAgICAgICAvLyBvbGRJRSBkb2Vzbid0IHVwZGF0ZSBzZWxlY3RlZCBhZnRlciBmb3JtIHJlc2V0ICgjMjU1MSlcbiAgICAgICAgICBpZiAoICggb3B0aW9uLnNlbGVjdGVkIHx8IGkgPT09IGluZGV4ICkgJiZcbiAgICAgICAgICAgICAgLy8gRG9uJ3QgcmV0dXJuIG9wdGlvbnMgdGhhdCBhcmUgZGlzYWJsZWQgb3IgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxuICAgICAgICAgICAgICAoIHN1cHBvcnQub3B0RGlzYWJsZWQgPyAhb3B0aW9uLmRpc2FibGVkIDogb3B0aW9uLmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpID09PSBudWxsICkgJiZcbiAgICAgICAgICAgICAgKCAhb3B0aW9uLnBhcmVudE5vZGUuZGlzYWJsZWQgfHwgIWpRdWVyeS5ub2RlTmFtZSggb3B0aW9uLnBhcmVudE5vZGUsIFwib3B0Z3JvdXBcIiApICkgKSB7XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgc3BlY2lmaWMgdmFsdWUgZm9yIHRoZSBvcHRpb25cbiAgICAgICAgICAgIHZhbHVlID0galF1ZXJ5KCBvcHRpb24gKS52YWwoKTtcblxuICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCBhbiBhcnJheSBmb3Igb25lIHNlbGVjdHNcbiAgICAgICAgICAgIGlmICggb25lICkge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE11bHRpLVNlbGVjdHMgcmV0dXJuIGFuIGFycmF5XG4gICAgICAgICAgICB2YWx1ZXMucHVzaCggdmFsdWUgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICAgIHZhciBvcHRpb25TZXQsIG9wdGlvbixcbiAgICAgICAgICBvcHRpb25zID0gZWxlbS5vcHRpb25zLFxuICAgICAgICAgIHZhbHVlcyA9IGpRdWVyeS5tYWtlQXJyYXkoIHZhbHVlICksXG4gICAgICAgICAgaSA9IG9wdGlvbnMubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgIG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuICAgICAgICAgIGlmICggalF1ZXJ5LmluQXJyYXkoIGpRdWVyeS52YWxIb29rcy5vcHRpb24uZ2V0KCBvcHRpb24gKSwgdmFsdWVzICkgPj0gMCApIHtcblxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU2XG4gICAgICAgICAgICAvLyBXaGVuIG5ldyBvcHRpb24gZWxlbWVudCBpcyBhZGRlZCB0byBzZWxlY3QgYm94IHdlIG5lZWQgdG9cbiAgICAgICAgICAgIC8vIGZvcmNlIHJlZmxvdyBvZiBuZXdseSBhZGRlZCBub2RlIGluIG9yZGVyIHRvIHdvcmthcm91bmQgZGVsYXlcbiAgICAgICAgICAgIC8vIG9mIGluaXRpYWxpemF0aW9uIHByb3BlcnRpZXNcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IG9wdGlvblNldCA9IHRydWU7XG5cbiAgICAgICAgICAgIH0gY2F0Y2ggKCBfICkge1xuXG4gICAgICAgICAgICAgIC8vIFdpbGwgYmUgZXhlY3V0ZWQgb25seSBpbiBJRTZcbiAgICAgICAgICAgICAgb3B0aW9uLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3JjZSBicm93c2VycyB0byBiZWhhdmUgY29uc2lzdGVudGx5IHdoZW4gbm9uLW1hdGNoaW5nIHZhbHVlIGlzIHNldFxuICAgICAgICBpZiAoICFvcHRpb25TZXQgKSB7XG4gICAgICAgICAgZWxlbS5zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBSYWRpb3MgYW5kIGNoZWNrYm94ZXMgZ2V0dGVyL3NldHRlclxualF1ZXJ5LmVhY2goWyBcInJhZGlvXCIsIFwiY2hlY2tib3hcIiBdLCBmdW5jdGlvbigpIHtcbiAgalF1ZXJ5LnZhbEhvb2tzWyB0aGlzIF0gPSB7XG4gICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICBpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWx1ZSApICkge1xuICAgICAgICByZXR1cm4gKCBlbGVtLmNoZWNrZWQgPSBqUXVlcnkuaW5BcnJheSggalF1ZXJ5KGVsZW0pLnZhbCgpLCB2YWx1ZSApID49IDAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGlmICggIXN1cHBvcnQuY2hlY2tPbiApIHtcbiAgICBqUXVlcnkudmFsSG9va3NbIHRoaXMgXS5nZXQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIC8vIFN1cHBvcnQ6IFdlYmtpdFxuICAgICAgLy8gXCJcIiBpcyByZXR1cm5lZCBpbnN0ZWFkIG9mIFwib25cIiBpZiBhIHZhbHVlIGlzbid0IHNwZWNpZmllZFxuICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKFwidmFsdWVcIikgPT09IG51bGwgPyBcIm9uXCIgOiBlbGVtLnZhbHVlO1xuICAgIH07XG4gIH1cbn0pO1xuXG5cblxuXG52YXIgbm9kZUhvb2ssIGJvb2xIb29rLFxuICBhdHRySGFuZGxlID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZSxcbiAgcnVzZURlZmF1bHQgPSAvXig/OmNoZWNrZWR8c2VsZWN0ZWQpJC9pLFxuICBnZXRTZXRBdHRyaWJ1dGUgPSBzdXBwb3J0LmdldFNldEF0dHJpYnV0ZSxcbiAgZ2V0U2V0SW5wdXQgPSBzdXBwb3J0LmlucHV0O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgYXR0cjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuICAgIHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5hdHRyLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcbiAgfSxcblxuICByZW1vdmVBdHRyOiBmdW5jdGlvbiggbmFtZSApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgalF1ZXJ5LnJlbW92ZUF0dHIoIHRoaXMsIG5hbWUgKTtcbiAgICB9KTtcbiAgfVxufSk7XG5cbmpRdWVyeS5leHRlbmQoe1xuICBhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG4gICAgdmFyIGhvb2tzLCByZXQsXG4gICAgICBuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cbiAgICAvLyBkb24ndCBnZXQvc2V0IGF0dHJpYnV0ZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG4gICAgaWYgKCAhZWxlbSB8fCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayB0byBwcm9wIHdoZW4gYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZFxuICAgIGlmICggdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlID09PSBzdHJ1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4galF1ZXJ5LnByb3AoIGVsZW0sIG5hbWUsIHZhbHVlICk7XG4gICAgfVxuXG4gICAgLy8gQWxsIGF0dHJpYnV0ZXMgYXJlIGxvd2VyY2FzZVxuICAgIC8vIEdyYWIgbmVjZXNzYXJ5IGhvb2sgaWYgb25lIGlzIGRlZmluZWRcbiAgICBpZiAoIG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcbiAgICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICBob29rcyA9IGpRdWVyeS5hdHRySG9va3NbIG5hbWUgXSB8fFxuICAgICAgICAoIGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdCggbmFtZSApID8gYm9vbEhvb2sgOiBub2RlSG9vayApO1xuICAgIH1cblxuICAgIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgaWYgKCB2YWx1ZSA9PT0gbnVsbCApIHtcbiAgICAgICAgalF1ZXJ5LnJlbW92ZUF0dHIoIGVsZW0sIG5hbWUgKTtcblxuICAgICAgfSBlbHNlIGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApKSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgdmFsdWUgKyBcIlwiICk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApKSAhPT0gbnVsbCApIHtcbiAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0ID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgbmFtZSApO1xuXG4gICAgICAvLyBOb24tZXhpc3RlbnQgYXR0cmlidXRlcyByZXR1cm4gbnVsbCwgd2Ugbm9ybWFsaXplIHRvIHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIHJldCA9PSBudWxsID9cbiAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgcmV0O1xuICAgIH1cbiAgfSxcblxuICByZW1vdmVBdHRyOiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgdmFyIG5hbWUsIHByb3BOYW1lLFxuICAgICAgaSA9IDAsXG4gICAgICBhdHRyTmFtZXMgPSB2YWx1ZSAmJiB2YWx1ZS5tYXRjaCggcm5vdHdoaXRlICk7XG5cbiAgICBpZiAoIGF0dHJOYW1lcyAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuICAgICAgd2hpbGUgKCAobmFtZSA9IGF0dHJOYW1lc1tpKytdKSApIHtcbiAgICAgICAgcHJvcE5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XG5cbiAgICAgICAgLy8gQm9vbGVhbiBhdHRyaWJ1dGVzIGdldCBzcGVjaWFsIHRyZWF0bWVudCAoIzEwODcwKVxuICAgICAgICBpZiAoIGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdCggbmFtZSApICkge1xuICAgICAgICAgIC8vIFNldCBjb3JyZXNwb25kaW5nIHByb3BlcnR5IHRvIGZhbHNlXG4gICAgICAgICAgaWYgKCBnZXRTZXRJbnB1dCAmJiBnZXRTZXRBdHRyaWJ1dGUgfHwgIXJ1c2VEZWZhdWx0LnRlc3QoIG5hbWUgKSApIHtcbiAgICAgICAgICAgIGVsZW1bIHByb3BOYW1lIF0gPSBmYWxzZTtcbiAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgICAgICAgLy8gQWxzbyBjbGVhciBkZWZhdWx0Q2hlY2tlZC9kZWZhdWx0U2VsZWN0ZWQgKGlmIGFwcHJvcHJpYXRlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtWyBqUXVlcnkuY2FtZWxDYXNlKCBcImRlZmF1bHQtXCIgKyBuYW1lICkgXSA9XG4gICAgICAgICAgICAgIGVsZW1bIHByb3BOYW1lIF0gPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VlICM5Njk5IGZvciBleHBsYW5hdGlvbiBvZiB0aGlzIGFwcHJvYWNoIChzZXR0aW5nIGZpcnN0LCB0aGVuIHJlbW92YWwpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgalF1ZXJ5LmF0dHIoIGVsZW0sIG5hbWUsIFwiXCIgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBnZXRTZXRBdHRyaWJ1dGUgPyBuYW1lIDogcHJvcE5hbWUgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYXR0ckhvb2tzOiB7XG4gICAgdHlwZToge1xuICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICAgIGlmICggIXN1cHBvcnQucmFkaW9WYWx1ZSAmJiB2YWx1ZSA9PT0gXCJyYWRpb1wiICYmIGpRdWVyeS5ub2RlTmFtZShlbGVtLCBcImlucHV0XCIpICkge1xuICAgICAgICAgIC8vIFNldHRpbmcgdGhlIHR5cGUgb24gYSByYWRpbyBidXR0b24gYWZ0ZXIgdGhlIHZhbHVlIHJlc2V0cyB0aGUgdmFsdWUgaW4gSUU2LTlcbiAgICAgICAgICAvLyBSZXNldCB2YWx1ZSB0byBkZWZhdWx0IGluIGNhc2UgdHlwZSBpcyBzZXQgYWZ0ZXIgdmFsdWUgZHVyaW5nIGNyZWF0aW9uXG4gICAgICAgICAgdmFyIHZhbCA9IGVsZW0udmFsdWU7XG4gICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCB2YWx1ZSApO1xuICAgICAgICAgIGlmICggdmFsICkge1xuICAgICAgICAgICAgZWxlbS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxuLy8gSG9vayBmb3IgYm9vbGVhbiBhdHRyaWJ1dGVzXG5ib29sSG9vayA9IHtcbiAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG4gICAgaWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG4gICAgICAvLyBSZW1vdmUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdoZW4gc2V0IHRvIGZhbHNlXG4gICAgICBqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuICAgIH0gZWxzZSBpZiAoIGdldFNldElucHV0ICYmIGdldFNldEF0dHJpYnV0ZSB8fCAhcnVzZURlZmF1bHQudGVzdCggbmFtZSApICkge1xuICAgICAgLy8gSUU8OCBuZWVkcyB0aGUgKnByb3BlcnR5KiBuYW1lXG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZSggIWdldFNldEF0dHJpYnV0ZSAmJiBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWUsIG5hbWUgKTtcblxuICAgIC8vIFVzZSBkZWZhdWx0Q2hlY2tlZCBhbmQgZGVmYXVsdFNlbGVjdGVkIGZvciBvbGRJRVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtWyBqUXVlcnkuY2FtZWxDYXNlKCBcImRlZmF1bHQtXCIgKyBuYW1lICkgXSA9IGVsZW1bIG5hbWUgXSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbn07XG5cbi8vIFJldHJpZXZlIGJvb2xlYW5zIHNwZWNpYWxseVxualF1ZXJ5LmVhY2goIGpRdWVyeS5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKCAvXFx3Ky9nICksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXG4gIHZhciBnZXR0ZXIgPSBhdHRySGFuZGxlWyBuYW1lIF0gfHwgalF1ZXJ5LmZpbmQuYXR0cjtcblxuICBhdHRySGFuZGxlWyBuYW1lIF0gPSBnZXRTZXRJbnB1dCAmJiBnZXRTZXRBdHRyaWJ1dGUgfHwgIXJ1c2VEZWZhdWx0LnRlc3QoIG5hbWUgKSA/XG4gICAgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuICAgICAgdmFyIHJldCwgaGFuZGxlO1xuICAgICAgaWYgKCAhaXNYTUwgKSB7XG4gICAgICAgIC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3AgYnkgdGVtcG9yYXJpbHkgcmVtb3ZpbmcgdGhpcyBmdW5jdGlvbiBmcm9tIHRoZSBnZXR0ZXJcbiAgICAgICAgaGFuZGxlID0gYXR0ckhhbmRsZVsgbmFtZSBdO1xuICAgICAgICBhdHRySGFuZGxlWyBuYW1lIF0gPSByZXQ7XG4gICAgICAgIHJldCA9IGdldHRlciggZWxlbSwgbmFtZSwgaXNYTUwgKSAhPSBudWxsID9cbiAgICAgICAgICBuYW1lLnRvTG93ZXJDYXNlKCkgOlxuICAgICAgICAgIG51bGw7XG4gICAgICAgIGF0dHJIYW5kbGVbIG5hbWUgXSA9IGhhbmRsZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSA6XG4gICAgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuICAgICAgaWYgKCAhaXNYTUwgKSB7XG4gICAgICAgIHJldHVybiBlbGVtWyBqUXVlcnkuY2FtZWxDYXNlKCBcImRlZmF1bHQtXCIgKyBuYW1lICkgXSA/XG4gICAgICAgICAgbmFtZS50b0xvd2VyQ2FzZSgpIDpcbiAgICAgICAgICBudWxsO1xuICAgICAgfVxuICAgIH07XG59KTtcblxuLy8gZml4IG9sZElFIGF0dHJvcGVydGllc1xuaWYgKCAhZ2V0U2V0SW5wdXQgfHwgIWdldFNldEF0dHJpYnV0ZSApIHtcbiAgalF1ZXJ5LmF0dHJIb29rcy52YWx1ZSA9IHtcbiAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcbiAgICAgIGlmICggalF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImlucHV0XCIgKSApIHtcbiAgICAgICAgLy8gRG9lcyBub3QgcmV0dXJuIHNvIHRoYXQgc2V0QXR0cmlidXRlIGlzIGFsc28gdXNlZFxuICAgICAgICBlbGVtLmRlZmF1bHRWYWx1ZSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVXNlIG5vZGVIb29rIGlmIGRlZmluZWQgKCMxOTU0KTsgb3RoZXJ3aXNlIHNldEF0dHJpYnV0ZSBpcyBmaW5lXG4gICAgICAgIHJldHVybiBub2RlSG9vayAmJiBub2RlSG9vay5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG4vLyBJRTYvNyBkbyBub3Qgc3VwcG9ydCBnZXR0aW5nL3NldHRpbmcgc29tZSBhdHRyaWJ1dGVzIHdpdGggZ2V0L3NldEF0dHJpYnV0ZVxuaWYgKCAhZ2V0U2V0QXR0cmlidXRlICkge1xuXG4gIC8vIFVzZSB0aGlzIGZvciBhbnkgYXR0cmlidXRlIGluIElFNi83XG4gIC8vIFRoaXMgZml4ZXMgYWxtb3N0IGV2ZXJ5IElFNi83IGlzc3VlXG4gIG5vZGVIb29rID0ge1xuICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuICAgICAgLy8gU2V0IHRoZSBleGlzdGluZyBvciBjcmVhdGUgYSBuZXcgYXR0cmlidXRlIG5vZGVcbiAgICAgIHZhciByZXQgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKTtcbiAgICAgIGlmICggIXJldCApIHtcbiAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGVOb2RlKFxuICAgICAgICAgIChyZXQgPSBlbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlKCBuYW1lICkpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldC52YWx1ZSA9IHZhbHVlICs9IFwiXCI7XG5cbiAgICAgIC8vIEJyZWFrIGFzc29jaWF0aW9uIHdpdGggY2xvbmVkIGVsZW1lbnRzIGJ5IGFsc28gdXNpbmcgc2V0QXR0cmlidXRlICgjOTY0NilcbiAgICAgIGlmICggbmFtZSA9PT0gXCJ2YWx1ZVwiIHx8IHZhbHVlID09PSBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApICkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFNvbWUgYXR0cmlidXRlcyBhcmUgY29uc3RydWN0ZWQgd2l0aCBlbXB0eS1zdHJpbmcgdmFsdWVzIHdoZW4gbm90IGRlZmluZWRcbiAgYXR0ckhhbmRsZS5pZCA9IGF0dHJIYW5kbGUubmFtZSA9IGF0dHJIYW5kbGUuY29vcmRzID1cbiAgICBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgICB2YXIgcmV0O1xuICAgICAgaWYgKCAhaXNYTUwgKSB7XG4gICAgICAgIHJldHVybiAocmV0ID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkpICYmIHJldC52YWx1ZSAhPT0gXCJcIiA/XG4gICAgICAgICAgcmV0LnZhbHVlIDpcbiAgICAgICAgICBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgLy8gRml4aW5nIHZhbHVlIHJldHJpZXZhbCBvbiBhIGJ1dHRvbiByZXF1aXJlcyB0aGlzIG1vZHVsZVxuICBqUXVlcnkudmFsSG9va3MuYnV0dG9uID0ge1xuICAgIGdldDogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG4gICAgICB2YXIgcmV0ID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICk7XG4gICAgICBpZiAoIHJldCAmJiByZXQuc3BlY2lmaWVkICkge1xuICAgICAgICByZXR1cm4gcmV0LnZhbHVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0OiBub2RlSG9vay5zZXRcbiAgfTtcblxuICAvLyBTZXQgY29udGVudGVkaXRhYmxlIHRvIGZhbHNlIG9uIHJlbW92YWxzKCMxMDQyOSlcbiAgLy8gU2V0dGluZyB0byBlbXB0eSBzdHJpbmcgdGhyb3dzIGFuIGVycm9yIGFzIGFuIGludmFsaWQgdmFsdWVcbiAgalF1ZXJ5LmF0dHJIb29rcy5jb250ZW50ZWRpdGFibGUgPSB7XG4gICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG4gICAgICBub2RlSG9vay5zZXQoIGVsZW0sIHZhbHVlID09PSBcIlwiID8gZmFsc2UgOiB2YWx1ZSwgbmFtZSApO1xuICAgIH1cbiAgfTtcblxuICAvLyBTZXQgd2lkdGggYW5kIGhlaWdodCB0byBhdXRvIGluc3RlYWQgb2YgMCBvbiBlbXB0eSBzdHJpbmcoIEJ1ZyAjODE1MCApXG4gIC8vIFRoaXMgaXMgZm9yIHJlbW92YWxzXG4gIGpRdWVyeS5lYWNoKFsgXCJ3aWR0aFwiLCBcImhlaWdodFwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuICAgIGpRdWVyeS5hdHRySG9va3NbIG5hbWUgXSA9IHtcbiAgICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuICAgICAgICBpZiAoIHZhbHVlID09PSBcIlwiICkge1xuICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCBcImF1dG9cIiApO1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG5pZiAoICFzdXBwb3J0LnN0eWxlICkge1xuICBqUXVlcnkuYXR0ckhvb2tzLnN0eWxlID0ge1xuICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAvLyBSZXR1cm4gdW5kZWZpbmVkIGluIHRoZSBjYXNlIG9mIGVtcHR5IHN0cmluZ1xuICAgICAgLy8gTm90ZTogSUUgdXBwZXJjYXNlcyBjc3MgcHJvcGVydHkgbmFtZXMsIGJ1dCBpZiB3ZSB3ZXJlIHRvIC50b0xvd2VyQ2FzZSgpXG4gICAgICAvLyAuY3NzVGV4dCwgdGhhdCB3b3VsZCBkZXN0cm95IGNhc2Ugc2Vuc3RpdGl2aXR5IGluIFVSTCdzLCBsaWtlIGluIFwiYmFja2dyb3VuZFwiXG4gICAgICByZXR1cm4gZWxlbS5zdHlsZS5jc3NUZXh0IHx8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuICAgICAgcmV0dXJuICggZWxlbS5zdHlsZS5jc3NUZXh0ID0gdmFsdWUgKyBcIlwiICk7XG4gICAgfVxuICB9O1xufVxuXG5cblxuXG52YXIgcmZvY3VzYWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbnxvYmplY3QpJC9pLFxuICByY2xpY2thYmxlID0gL14oPzphfGFyZWEpJC9pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgcHJvcDogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuICAgIHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5wcm9wLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcbiAgfSxcblxuICByZW1vdmVQcm9wOiBmdW5jdGlvbiggbmFtZSApIHtcbiAgICBuYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAvLyB0cnkvY2F0Y2ggaGFuZGxlcyBjYXNlcyB3aGVyZSBJRSBiYWxrcyAoc3VjaCBhcyByZW1vdmluZyBhIHByb3BlcnR5IG9uIHdpbmRvdylcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXNbIG5hbWUgXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZGVsZXRlIHRoaXNbIG5hbWUgXTtcbiAgICAgIH0gY2F0Y2goIGUgKSB7fVxuICAgIH0pO1xuICB9XG59KTtcblxualF1ZXJ5LmV4dGVuZCh7XG4gIHByb3BGaXg6IHtcbiAgICBcImZvclwiOiBcImh0bWxGb3JcIixcbiAgICBcImNsYXNzXCI6IFwiY2xhc3NOYW1lXCJcbiAgfSxcblxuICBwcm9wOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG4gICAgdmFyIHJldCwgaG9va3MsIG5vdHhtbCxcbiAgICAgIG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuICAgIC8vIGRvbid0IGdldC9zZXQgcHJvcGVydGllcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcbiAgICBpZiAoICFlbGVtIHx8IG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5vdHhtbCA9IG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKTtcblxuICAgIGlmICggbm90eG1sICkge1xuICAgICAgLy8gRml4IG5hbWUgYW5kIGF0dGFjaCBob29rc1xuICAgICAgbmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcbiAgICAgIGhvb2tzID0galF1ZXJ5LnByb3BIb29rc1sgbmFtZSBdO1xuICAgIH1cblxuICAgIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmIChyZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkpICE9PSB1bmRlZmluZWQgP1xuICAgICAgICByZXQgOlxuICAgICAgICAoIGVsZW1bIG5hbWUgXSA9IHZhbHVlICk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApKSAhPT0gbnVsbCA/XG4gICAgICAgIHJldCA6XG4gICAgICAgIGVsZW1bIG5hbWUgXTtcbiAgICB9XG4gIH0sXG5cbiAgcHJvcEhvb2tzOiB7XG4gICAgdGFiSW5kZXg6IHtcbiAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIC8vIGVsZW0udGFiSW5kZXggZG9lc24ndCBhbHdheXMgcmV0dXJuIHRoZSBjb3JyZWN0IHZhbHVlIHdoZW4gaXQgaGFzbid0IGJlZW4gZXhwbGljaXRseSBzZXRcbiAgICAgICAgLy8gaHR0cDovL2ZsdWlkcHJvamVjdC5vcmcvYmxvZy8yMDA4LzAxLzA5L2dldHRpbmctc2V0dGluZy1hbmQtcmVtb3ZpbmctdGFiaW5kZXgtdmFsdWVzLXdpdGgtamF2YXNjcmlwdC9cbiAgICAgICAgLy8gVXNlIHByb3BlciBhdHRyaWJ1dGUgcmV0cmlldmFsKCMxMjA3MilcbiAgICAgICAgdmFyIHRhYmluZGV4ID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ0YWJpbmRleFwiICk7XG5cbiAgICAgICAgcmV0dXJuIHRhYmluZGV4ID9cbiAgICAgICAgICBwYXJzZUludCggdGFiaW5kZXgsIDEwICkgOlxuICAgICAgICAgIHJmb2N1c2FibGUudGVzdCggZWxlbS5ub2RlTmFtZSApIHx8IHJjbGlja2FibGUudGVzdCggZWxlbS5ub2RlTmFtZSApICYmIGVsZW0uaHJlZiA/XG4gICAgICAgICAgICAwIDpcbiAgICAgICAgICAgIC0xO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbi8vIFNvbWUgYXR0cmlidXRlcyByZXF1aXJlIGEgc3BlY2lhbCBjYWxsIG9uIElFXG4vLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzY0MjklMjhWUy44NSUyOS5hc3B4XG5pZiAoICFzdXBwb3J0LmhyZWZOb3JtYWxpemVkICkge1xuICAvLyBocmVmL3NyYyBwcm9wZXJ0eSBzaG91bGQgZ2V0IHRoZSBmdWxsIG5vcm1hbGl6ZWQgVVJMICgjMTAyOTkvIzEyOTE1KVxuICBqUXVlcnkuZWFjaChbIFwiaHJlZlwiLCBcInNyY1wiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuICAgIGpRdWVyeS5wcm9wSG9va3NbIG5hbWUgXSA9IHtcbiAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSwgNCApO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG4vLyBTdXBwb3J0OiBTYWZhcmksIElFOStcbi8vIG1pcy1yZXBvcnRzIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHByb3BlcnR5IG9mIGFuIG9wdGlvblxuLy8gQWNjZXNzaW5nIHRoZSBwYXJlbnQncyBzZWxlY3RlZEluZGV4IHByb3BlcnR5IGZpeGVzIGl0XG5pZiAoICFzdXBwb3J0Lm9wdFNlbGVjdGVkICkge1xuICBqUXVlcnkucHJvcEhvb2tzLnNlbGVjdGVkID0ge1xuICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICB2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXG4gICAgICBpZiAoIHBhcmVudCApIHtcbiAgICAgICAgcGFyZW50LnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgaXQgYWxzbyB3b3JrcyB3aXRoIG9wdGdyb3Vwcywgc2VlICM1NzAxXG4gICAgICAgIGlmICggcGFyZW50LnBhcmVudE5vZGUgKSB7XG4gICAgICAgICAgcGFyZW50LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xufVxuXG5qUXVlcnkuZWFjaChbXG4gIFwidGFiSW5kZXhcIixcbiAgXCJyZWFkT25seVwiLFxuICBcIm1heExlbmd0aFwiLFxuICBcImNlbGxTcGFjaW5nXCIsXG4gIFwiY2VsbFBhZGRpbmdcIixcbiAgXCJyb3dTcGFuXCIsXG4gIFwiY29sU3BhblwiLFxuICBcInVzZU1hcFwiLFxuICBcImZyYW1lQm9yZGVyXCIsXG4gIFwiY29udGVudEVkaXRhYmxlXCJcbl0sIGZ1bmN0aW9uKCkge1xuICBqUXVlcnkucHJvcEZpeFsgdGhpcy50b0xvd2VyQ2FzZSgpIF0gPSB0aGlzO1xufSk7XG5cbi8vIElFNi83IGNhbGwgZW5jdHlwZSBlbmNvZGluZ1xuaWYgKCAhc3VwcG9ydC5lbmN0eXBlICkge1xuICBqUXVlcnkucHJvcEZpeC5lbmN0eXBlID0gXCJlbmNvZGluZ1wiO1xufVxuXG5cblxuXG52YXIgcmNsYXNzID0gL1tcXHRcXHJcXG5cXGZdL2c7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBhZGRDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xuICAgIHZhciBjbGFzc2VzLCBlbGVtLCBjdXIsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuICAgICAgaSA9IDAsXG4gICAgICBsZW4gPSB0aGlzLmxlbmd0aCxcbiAgICAgIHByb2NlZWQgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWU7XG5cbiAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaiApIHtcbiAgICAgICAgalF1ZXJ5KCB0aGlzICkuYWRkQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIHRoaXMuY2xhc3NOYW1lICkgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICggcHJvY2VlZCApIHtcbiAgICAgIC8vIFRoZSBkaXNqdW5jdGlvbiBoZXJlIGlzIGZvciBiZXR0ZXIgY29tcHJlc3NpYmlsaXR5IChzZWUgcmVtb3ZlQ2xhc3MpXG4gICAgICBjbGFzc2VzID0gKCB2YWx1ZSB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG4gICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgZWxlbSA9IHRoaXNbIGkgXTtcbiAgICAgICAgY3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIGVsZW0uY2xhc3NOYW1lID9cbiAgICAgICAgICAoIFwiIFwiICsgZWxlbS5jbGFzc05hbWUgKyBcIiBcIiApLnJlcGxhY2UoIHJjbGFzcywgXCIgXCIgKSA6XG4gICAgICAgICAgXCIgXCJcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIGN1ciApIHtcbiAgICAgICAgICBqID0gMDtcbiAgICAgICAgICB3aGlsZSAoIChjbGF6eiA9IGNsYXNzZXNbaisrXSkgKSB7XG4gICAgICAgICAgICBpZiAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA8IDAgKSB7XG4gICAgICAgICAgICAgIGN1ciArPSBjbGF6eiArIFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG4gICAgICAgICAgZmluYWxWYWx1ZSA9IGpRdWVyeS50cmltKCBjdXIgKTtcbiAgICAgICAgICBpZiAoIGVsZW0uY2xhc3NOYW1lICE9PSBmaW5hbFZhbHVlICkge1xuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBmaW5hbFZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgdmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY2xhenosIGosIGZpbmFsVmFsdWUsXG4gICAgICBpID0gMCxcbiAgICAgIGxlbiA9IHRoaXMubGVuZ3RoLFxuICAgICAgcHJvY2VlZCA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlO1xuXG4gICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGogKSB7XG4gICAgICAgIGpRdWVyeSggdGhpcyApLnJlbW92ZUNsYXNzKCB2YWx1ZS5jYWxsKCB0aGlzLCBqLCB0aGlzLmNsYXNzTmFtZSApICk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCBwcm9jZWVkICkge1xuICAgICAgY2xhc3NlcyA9ICggdmFsdWUgfHwgXCJcIiApLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcblxuICAgICAgZm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICAgIGVsZW0gPSB0aGlzWyBpIF07XG4gICAgICAgIC8vIFRoaXMgZXhwcmVzc2lvbiBpcyBoZXJlIGZvciBiZXR0ZXIgY29tcHJlc3NpYmlsaXR5IChzZWUgYWRkQ2xhc3MpXG4gICAgICAgIGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBlbGVtLmNsYXNzTmFtZSA/XG4gICAgICAgICAgKCBcIiBcIiArIGVsZW0uY2xhc3NOYW1lICsgXCIgXCIgKS5yZXBsYWNlKCByY2xhc3MsIFwiIFwiICkgOlxuICAgICAgICAgIFwiXCJcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIGN1ciApIHtcbiAgICAgICAgICBqID0gMDtcbiAgICAgICAgICB3aGlsZSAoIChjbGF6eiA9IGNsYXNzZXNbaisrXSkgKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgKmFsbCogaW5zdGFuY2VzXG4gICAgICAgICAgICB3aGlsZSAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA+PSAwICkge1xuICAgICAgICAgICAgICBjdXIgPSBjdXIucmVwbGFjZSggXCIgXCIgKyBjbGF6eiArIFwiIFwiLCBcIiBcIiApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG4gICAgICAgICAgZmluYWxWYWx1ZSA9IHZhbHVlID8galF1ZXJ5LnRyaW0oIGN1ciApIDogXCJcIjtcbiAgICAgICAgICBpZiAoIGVsZW0uY2xhc3NOYW1lICE9PSBmaW5hbFZhbHVlICkge1xuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBmaW5hbFZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUsIHN0YXRlVmFsICkge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG4gICAgaWYgKCB0eXBlb2Ygc3RhdGVWYWwgPT09IFwiYm9vbGVhblwiICYmIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICByZXR1cm4gc3RhdGVWYWwgPyB0aGlzLmFkZENsYXNzKCB2YWx1ZSApIDogdGhpcy5yZW1vdmVDbGFzcyggdmFsdWUgKTtcbiAgICB9XG5cbiAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcbiAgICAgICAgalF1ZXJ5KCB0aGlzICkudG9nZ2xlQ2xhc3MoIHZhbHVlLmNhbGwodGhpcywgaSwgdGhpcy5jbGFzc05hbWUsIHN0YXRlVmFsKSwgc3RhdGVWYWwgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgIC8vIHRvZ2dsZSBpbmRpdmlkdWFsIGNsYXNzIG5hbWVzXG4gICAgICAgIHZhciBjbGFzc05hbWUsXG4gICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgc2VsZiA9IGpRdWVyeSggdGhpcyApLFxuICAgICAgICAgIGNsYXNzTmFtZXMgPSB2YWx1ZS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cbiAgICAgICAgd2hpbGUgKCAoY2xhc3NOYW1lID0gY2xhc3NOYW1lc1sgaSsrIF0pICkge1xuICAgICAgICAgIC8vIGNoZWNrIGVhY2ggY2xhc3NOYW1lIGdpdmVuLCBzcGFjZSBzZXBhcmF0ZWQgbGlzdFxuICAgICAgICAgIGlmICggc2VsZi5oYXNDbGFzcyggY2xhc3NOYW1lICkgKSB7XG4gICAgICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCBjbGFzc05hbWUgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5hZGRDbGFzcyggY2xhc3NOYW1lICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIC8vIFRvZ2dsZSB3aG9sZSBjbGFzcyBuYW1lXG4gICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSBzdHJ1bmRlZmluZWQgfHwgdHlwZSA9PT0gXCJib29sZWFuXCIgKSB7XG4gICAgICAgIGlmICggdGhpcy5jbGFzc05hbWUgKSB7XG4gICAgICAgICAgLy8gc3RvcmUgY2xhc3NOYW1lIGlmIHNldFxuICAgICAgICAgIGpRdWVyeS5fZGF0YSggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIsIHRoaXMuY2xhc3NOYW1lICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgZWxlbWVudCBoYXMgYSBjbGFzcyBuYW1lIG9yIGlmIHdlJ3JlIHBhc3NlZCBcImZhbHNlXCIsXG4gICAgICAgIC8vIHRoZW4gcmVtb3ZlIHRoZSB3aG9sZSBjbGFzc25hbWUgKGlmIHRoZXJlIHdhcyBvbmUsIHRoZSBhYm92ZSBzYXZlZCBpdCkuXG4gICAgICAgIC8vIE90aGVyd2lzZSBicmluZyBiYWNrIHdoYXRldmVyIHdhcyBwcmV2aW91c2x5IHNhdmVkIChpZiBhbnl0aGluZyksXG4gICAgICAgIC8vIGZhbGxpbmcgYmFjayB0byB0aGUgZW1wdHkgc3RyaW5nIGlmIG5vdGhpbmcgd2FzIHN0b3JlZC5cbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZSB8fCB2YWx1ZSA9PT0gZmFsc2UgPyBcIlwiIDogalF1ZXJ5Ll9kYXRhKCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiApIHx8IFwiXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgaGFzQ2xhc3M6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gXCIgXCIgKyBzZWxlY3RvciArIFwiIFwiLFxuICAgICAgaSA9IDAsXG4gICAgICBsID0gdGhpcy5sZW5ndGg7XG4gICAgZm9yICggOyBpIDwgbDsgaSsrICkge1xuICAgICAgaWYgKCB0aGlzW2ldLm5vZGVUeXBlID09PSAxICYmIChcIiBcIiArIHRoaXNbaV0uY2xhc3NOYW1lICsgXCIgXCIpLnJlcGxhY2UocmNsYXNzLCBcIiBcIikuaW5kZXhPZiggY2xhc3NOYW1lICkgPj0gMCApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KTtcblxuXG5cblxuLy8gUmV0dXJuIGpRdWVyeSBmb3IgYXR0cmlidXRlcy1vbmx5IGluY2x1c2lvblxuXG5cbmpRdWVyeS5lYWNoKCAoXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayBcIiArXG4gIFwibW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgXCIgK1xuICBcImNoYW5nZSBzZWxlY3Qgc3VibWl0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3IgY29udGV4dG1lbnVcIikuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblxuICAvLyBIYW5kbGUgZXZlbnQgYmluZGluZ1xuICBqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBkYXRhLCBmbiApIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgP1xuICAgICAgdGhpcy5vbiggbmFtZSwgbnVsbCwgZGF0YSwgZm4gKSA6XG4gICAgICB0aGlzLnRyaWdnZXIoIG5hbWUgKTtcbiAgfTtcbn0pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgaG92ZXI6IGZ1bmN0aW9uKCBmbk92ZXIsIGZuT3V0ICkge1xuICAgIHJldHVybiB0aGlzLm1vdXNlZW50ZXIoIGZuT3ZlciApLm1vdXNlbGVhdmUoIGZuT3V0IHx8IGZuT3ZlciApO1xuICB9LFxuXG4gIGJpbmQ6IGZ1bmN0aW9uKCB0eXBlcywgZGF0YSwgZm4gKSB7XG4gICAgcmV0dXJuIHRoaXMub24oIHR5cGVzLCBudWxsLCBkYXRhLCBmbiApO1xuICB9LFxuICB1bmJpbmQ6IGZ1bmN0aW9uKCB0eXBlcywgZm4gKSB7XG4gICAgcmV0dXJuIHRoaXMub2ZmKCB0eXBlcywgbnVsbCwgZm4gKTtcbiAgfSxcblxuICBkZWxlZ2F0ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCB0eXBlcywgZGF0YSwgZm4gKSB7XG4gICAgcmV0dXJuIHRoaXMub24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcbiAgfSxcbiAgdW5kZWxlZ2F0ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCB0eXBlcywgZm4gKSB7XG4gICAgLy8gKCBuYW1lc3BhY2UgKSBvciAoIHNlbGVjdG9yLCB0eXBlcyBbLCBmbl0gKVxuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gdGhpcy5vZmYoIHNlbGVjdG9yLCBcIioqXCIgKSA6IHRoaXMub2ZmKCB0eXBlcywgc2VsZWN0b3IgfHwgXCIqKlwiLCBmbiApO1xuICB9XG59KTtcblxuXG52YXIgbm9uY2UgPSBqUXVlcnkubm93KCk7XG5cbnZhciBycXVlcnkgPSAoL1xcPy8pO1xuXG5cblxudmFyIHJ2YWxpZHRva2VucyA9IC8oLCl8KFxcW3x7KXwofXxdKXxcIig/OlteXCJcXFxcXFxyXFxuXXxcXFxcW1wiXFxcXFxcL2JmbnJ0XXxcXFxcdVtcXGRhLWZBLUZdezR9KSpcIlxccyo6P3x0cnVlfGZhbHNlfG51bGx8LT8oPyEwXFxkKVxcZCsoPzpcXC5cXGQrfCkoPzpbZUVdWystXT9cXGQrfCkvZztcblxualF1ZXJ5LnBhcnNlSlNPTiA9IGZ1bmN0aW9uKCBkYXRhICkge1xuICAvLyBBdHRlbXB0IHRvIHBhcnNlIHVzaW5nIHRoZSBuYXRpdmUgSlNPTiBwYXJzZXIgZmlyc3RcbiAgaWYgKCB3aW5kb3cuSlNPTiAmJiB3aW5kb3cuSlNPTi5wYXJzZSApIHtcbiAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDIuM1xuICAgIC8vIFdvcmthcm91bmQgZmFpbHVyZSB0byBzdHJpbmctY2FzdCBudWxsIGlucHV0XG4gICAgcmV0dXJuIHdpbmRvdy5KU09OLnBhcnNlKCBkYXRhICsgXCJcIiApO1xuICB9XG5cbiAgdmFyIHJlcXVpcmVOb25Db21tYSxcbiAgICBkZXB0aCA9IG51bGwsXG4gICAgc3RyID0galF1ZXJ5LnRyaW0oIGRhdGEgKyBcIlwiICk7XG5cbiAgLy8gR3VhcmQgYWdhaW5zdCBpbnZhbGlkIChhbmQgcG9zc2libHkgZGFuZ2Vyb3VzKSBpbnB1dCBieSBlbnN1cmluZyB0aGF0IG5vdGhpbmcgcmVtYWluc1xuICAvLyBhZnRlciByZW1vdmluZyB2YWxpZCB0b2tlbnNcbiAgcmV0dXJuIHN0ciAmJiAhalF1ZXJ5LnRyaW0oIHN0ci5yZXBsYWNlKCBydmFsaWR0b2tlbnMsIGZ1bmN0aW9uKCB0b2tlbiwgY29tbWEsIG9wZW4sIGNsb3NlICkge1xuXG4gICAgLy8gRm9yY2UgdGVybWluYXRpb24gaWYgd2Ugc2VlIGEgbWlzcGxhY2VkIGNvbW1hXG4gICAgaWYgKCByZXF1aXJlTm9uQ29tbWEgJiYgY29tbWEgKSB7XG4gICAgICBkZXB0aCA9IDA7XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBubyBtb3JlIHJlcGxhY2VtZW50cyBhZnRlciByZXR1cm5pbmcgdG8gb3V0ZXJtb3N0IGRlcHRoXG4gICAgaWYgKCBkZXB0aCA9PT0gMCApIHtcbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG5cbiAgICAvLyBDb21tYXMgbXVzdCBub3QgZm9sbG93IFwiW1wiLCBcIntcIiwgb3IgXCIsXCJcbiAgICByZXF1aXJlTm9uQ29tbWEgPSBvcGVuIHx8IGNvbW1hO1xuXG4gICAgLy8gRGV0ZXJtaW5lIG5ldyBkZXB0aFxuICAgIC8vIGFycmF5L29iamVjdCBvcGVuIChcIltcIiBvciBcIntcIik6IGRlcHRoICs9IHRydWUgLSBmYWxzZSAoaW5jcmVtZW50KVxuICAgIC8vIGFycmF5L29iamVjdCBjbG9zZSAoXCJdXCIgb3IgXCJ9XCIpOiBkZXB0aCArPSBmYWxzZSAtIHRydWUgKGRlY3JlbWVudClcbiAgICAvLyBvdGhlciBjYXNlcyAoXCIsXCIgb3IgcHJpbWl0aXZlKTogZGVwdGggKz0gdHJ1ZSAtIHRydWUgKG51bWVyaWMgY2FzdClcbiAgICBkZXB0aCArPSAhY2xvc2UgLSAhb3BlbjtcblxuICAgIC8vIFJlbW92ZSB0aGlzIHRva2VuXG4gICAgcmV0dXJuIFwiXCI7XG4gIH0pICkgP1xuICAgICggRnVuY3Rpb24oIFwicmV0dXJuIFwiICsgc3RyICkgKSgpIDpcbiAgICBqUXVlcnkuZXJyb3IoIFwiSW52YWxpZCBKU09OOiBcIiArIGRhdGEgKTtcbn07XG5cblxuLy8gQ3Jvc3MtYnJvd3NlciB4bWwgcGFyc2luZ1xualF1ZXJ5LnBhcnNlWE1MID0gZnVuY3Rpb24oIGRhdGEgKSB7XG4gIHZhciB4bWwsIHRtcDtcbiAgaWYgKCAhZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB0cnkge1xuICAgIGlmICggd2luZG93LkRPTVBhcnNlciApIHsgLy8gU3RhbmRhcmRcbiAgICAgIHRtcCA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgIHhtbCA9IHRtcC5wYXJzZUZyb21TdHJpbmcoIGRhdGEsIFwidGV4dC94bWxcIiApO1xuICAgIH0gZWxzZSB7IC8vIElFXG4gICAgICB4bWwgPSBuZXcgQWN0aXZlWE9iamVjdCggXCJNaWNyb3NvZnQuWE1MRE9NXCIgKTtcbiAgICAgIHhtbC5hc3luYyA9IFwiZmFsc2VcIjtcbiAgICAgIHhtbC5sb2FkWE1MKCBkYXRhICk7XG4gICAgfVxuICB9IGNhdGNoKCBlICkge1xuICAgIHhtbCA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoICF4bWwgfHwgIXhtbC5kb2N1bWVudEVsZW1lbnQgfHwgeG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcInBhcnNlcmVycm9yXCIgKS5sZW5ndGggKSB7XG4gICAgalF1ZXJ5LmVycm9yKCBcIkludmFsaWQgWE1MOiBcIiArIGRhdGEgKTtcbiAgfVxuICByZXR1cm4geG1sO1xufTtcblxuXG52YXJcbiAgLy8gRG9jdW1lbnQgbG9jYXRpb25cbiAgYWpheExvY1BhcnRzLFxuICBhamF4TG9jYXRpb24sXG5cbiAgcmhhc2ggPSAvIy4qJC8sXG4gIHJ0cyA9IC8oWz8mXSlfPVteJl0qLyxcbiAgcmhlYWRlcnMgPSAvXiguKj8pOlsgXFx0XSooW15cXHJcXG5dKilcXHI/JC9tZywgLy8gSUUgbGVhdmVzIGFuIFxcciBjaGFyYWN0ZXIgYXQgRU9MXG4gIC8vICM3NjUzLCAjODEyNSwgIzgxNTI6IGxvY2FsIHByb3RvY29sIGRldGVjdGlvblxuICBybG9jYWxQcm90b2NvbCA9IC9eKD86YWJvdXR8YXBwfGFwcC1zdG9yYWdlfC4rLWV4dGVuc2lvbnxmaWxlfHJlc3x3aWRnZXQpOiQvLFxuICBybm9Db250ZW50ID0gL14oPzpHRVR8SEVBRCkkLyxcbiAgcnByb3RvY29sID0gL15cXC9cXC8vLFxuICBydXJsID0gL14oW1xcdy4rLV0rOikoPzpcXC9cXC8oPzpbXlxcLz8jXSpAfCkoW15cXC8/IzpdKikoPzo6KFxcZCspfCl8KS8sXG5cbiAgLyogUHJlZmlsdGVyc1xuICAgKiAxKSBUaGV5IGFyZSB1c2VmdWwgdG8gaW50cm9kdWNlIGN1c3RvbSBkYXRhVHlwZXMgKHNlZSBhamF4L2pzb25wLmpzIGZvciBhbiBleGFtcGxlKVxuICAgKiAyKSBUaGVzZSBhcmUgY2FsbGVkOlxuICAgKiAgICAtIEJFRk9SRSBhc2tpbmcgZm9yIGEgdHJhbnNwb3J0XG4gICAqICAgIC0gQUZURVIgcGFyYW0gc2VyaWFsaXphdGlvbiAocy5kYXRhIGlzIGEgc3RyaW5nIGlmIHMucHJvY2Vzc0RhdGEgaXMgdHJ1ZSlcbiAgICogMykga2V5IGlzIHRoZSBkYXRhVHlwZVxuICAgKiA0KSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkXG4gICAqIDUpIGV4ZWN1dGlvbiB3aWxsIHN0YXJ0IHdpdGggdHJhbnNwb3J0IGRhdGFUeXBlIGFuZCBUSEVOIGNvbnRpbnVlIGRvd24gdG8gXCIqXCIgaWYgbmVlZGVkXG4gICAqL1xuICBwcmVmaWx0ZXJzID0ge30sXG5cbiAgLyogVHJhbnNwb3J0cyBiaW5kaW5nc1xuICAgKiAxKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG4gICAqIDIpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcbiAgICogMykgc2VsZWN0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gZ28gdG8gXCIqXCIgaWYgbmVlZGVkXG4gICAqL1xuICB0cmFuc3BvcnRzID0ge30sXG5cbiAgLy8gQXZvaWQgY29tbWVudC1wcm9sb2cgY2hhciBzZXF1ZW5jZSAoIzEwMDk4KTsgbXVzdCBhcHBlYXNlIGxpbnQgYW5kIGV2YWRlIGNvbXByZXNzaW9uXG4gIGFsbFR5cGVzID0gXCIqL1wiLmNvbmNhdChcIipcIik7XG5cbi8vICM4MTM4LCBJRSBtYXkgdGhyb3cgYW4gZXhjZXB0aW9uIHdoZW4gYWNjZXNzaW5nXG4vLyBhIGZpZWxkIGZyb20gd2luZG93LmxvY2F0aW9uIGlmIGRvY3VtZW50LmRvbWFpbiBoYXMgYmVlbiBzZXRcbnRyeSB7XG4gIGFqYXhMb2NhdGlvbiA9IGxvY2F0aW9uLmhyZWY7XG59IGNhdGNoKCBlICkge1xuICAvLyBVc2UgdGhlIGhyZWYgYXR0cmlidXRlIG9mIGFuIEEgZWxlbWVudFxuICAvLyBzaW5jZSBJRSB3aWxsIG1vZGlmeSBpdCBnaXZlbiBkb2N1bWVudC5sb2NhdGlvblxuICBhamF4TG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImFcIiApO1xuICBhamF4TG9jYXRpb24uaHJlZiA9IFwiXCI7XG4gIGFqYXhMb2NhdGlvbiA9IGFqYXhMb2NhdGlvbi5ocmVmO1xufVxuXG4vLyBTZWdtZW50IGxvY2F0aW9uIGludG8gcGFydHNcbmFqYXhMb2NQYXJ0cyA9IHJ1cmwuZXhlYyggYWpheExvY2F0aW9uLnRvTG93ZXJDYXNlKCkgKSB8fCBbXTtcblxuLy8gQmFzZSBcImNvbnN0cnVjdG9yXCIgZm9yIGpRdWVyeS5hamF4UHJlZmlsdGVyIGFuZCBqUXVlcnkuYWpheFRyYW5zcG9ydFxuZnVuY3Rpb24gYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBzdHJ1Y3R1cmUgKSB7XG5cbiAgLy8gZGF0YVR5cGVFeHByZXNzaW9uIGlzIG9wdGlvbmFsIGFuZCBkZWZhdWx0cyB0byBcIipcIlxuICByZXR1cm4gZnVuY3Rpb24oIGRhdGFUeXBlRXhwcmVzc2lvbiwgZnVuYyApIHtcblxuICAgIGlmICggdHlwZW9mIGRhdGFUeXBlRXhwcmVzc2lvbiAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIGZ1bmMgPSBkYXRhVHlwZUV4cHJlc3Npb247XG4gICAgICBkYXRhVHlwZUV4cHJlc3Npb24gPSBcIipcIjtcbiAgICB9XG5cbiAgICB2YXIgZGF0YVR5cGUsXG4gICAgICBpID0gMCxcbiAgICAgIGRhdGFUeXBlcyA9IGRhdGFUeXBlRXhwcmVzc2lvbi50b0xvd2VyQ2FzZSgpLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcblxuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGZ1bmMgKSApIHtcbiAgICAgIC8vIEZvciBlYWNoIGRhdGFUeXBlIGluIHRoZSBkYXRhVHlwZUV4cHJlc3Npb25cbiAgICAgIHdoaWxlICggKGRhdGFUeXBlID0gZGF0YVR5cGVzW2krK10pICkge1xuICAgICAgICAvLyBQcmVwZW5kIGlmIHJlcXVlc3RlZFxuICAgICAgICBpZiAoIGRhdGFUeXBlLmNoYXJBdCggMCApID09PSBcIitcIiApIHtcbiAgICAgICAgICBkYXRhVHlwZSA9IGRhdGFUeXBlLnNsaWNlKCAxICkgfHwgXCIqXCI7XG4gICAgICAgICAgKHN0cnVjdHVyZVsgZGF0YVR5cGUgXSA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSkudW5zaGlmdCggZnVuYyApO1xuXG4gICAgICAgIC8vIE90aGVyd2lzZSBhcHBlbmRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAoc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdKS5wdXNoKCBmdW5jICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbi8vIEJhc2UgaW5zcGVjdGlvbiBmdW5jdGlvbiBmb3IgcHJlZmlsdGVycyBhbmQgdHJhbnNwb3J0c1xuZnVuY3Rpb24gaW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHN0cnVjdHVyZSwgb3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCBqcVhIUiApIHtcblxuICB2YXIgaW5zcGVjdGVkID0ge30sXG4gICAgc2Vla2luZ1RyYW5zcG9ydCA9ICggc3RydWN0dXJlID09PSB0cmFuc3BvcnRzICk7XG5cbiAgZnVuY3Rpb24gaW5zcGVjdCggZGF0YVR5cGUgKSB7XG4gICAgdmFyIHNlbGVjdGVkO1xuICAgIGluc3BlY3RlZFsgZGF0YVR5cGUgXSA9IHRydWU7XG4gICAgalF1ZXJ5LmVhY2goIHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSwgZnVuY3Rpb24oIF8sIHByZWZpbHRlck9yRmFjdG9yeSApIHtcbiAgICAgIHZhciBkYXRhVHlwZU9yVHJhbnNwb3J0ID0gcHJlZmlsdGVyT3JGYWN0b3J5KCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICk7XG4gICAgICBpZiAoIHR5cGVvZiBkYXRhVHlwZU9yVHJhbnNwb3J0ID09PSBcInN0cmluZ1wiICYmICFzZWVraW5nVHJhbnNwb3J0ICYmICFpbnNwZWN0ZWRbIGRhdGFUeXBlT3JUcmFuc3BvcnQgXSApIHtcbiAgICAgICAgb3B0aW9ucy5kYXRhVHlwZXMudW5zaGlmdCggZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuICAgICAgICBpbnNwZWN0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIHNlZWtpbmdUcmFuc3BvcnQgKSB7XG4gICAgICAgIHJldHVybiAhKCBzZWxlY3RlZCA9IGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gIH1cblxuICByZXR1cm4gaW5zcGVjdCggb3B0aW9ucy5kYXRhVHlwZXNbIDAgXSApIHx8ICFpbnNwZWN0ZWRbIFwiKlwiIF0gJiYgaW5zcGVjdCggXCIqXCIgKTtcbn1cblxuLy8gQSBzcGVjaWFsIGV4dGVuZCBmb3IgYWpheCBvcHRpb25zXG4vLyB0aGF0IHRha2VzIFwiZmxhdFwiIG9wdGlvbnMgKG5vdCB0byBiZSBkZWVwIGV4dGVuZGVkKVxuLy8gRml4ZXMgIzk4ODdcbmZ1bmN0aW9uIGFqYXhFeHRlbmQoIHRhcmdldCwgc3JjICkge1xuICB2YXIgZGVlcCwga2V5LFxuICAgIGZsYXRPcHRpb25zID0galF1ZXJ5LmFqYXhTZXR0aW5ncy5mbGF0T3B0aW9ucyB8fCB7fTtcblxuICBmb3IgKCBrZXkgaW4gc3JjICkge1xuICAgIGlmICggc3JjWyBrZXkgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgKCBmbGF0T3B0aW9uc1sga2V5IF0gPyB0YXJnZXQgOiAoIGRlZXAgfHwgKGRlZXAgPSB7fSkgKSApWyBrZXkgXSA9IHNyY1sga2V5IF07XG4gICAgfVxuICB9XG4gIGlmICggZGVlcCApIHtcbiAgICBqUXVlcnkuZXh0ZW5kKCB0cnVlLCB0YXJnZXQsIGRlZXAgKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbi8qIEhhbmRsZXMgcmVzcG9uc2VzIHRvIGFuIGFqYXggcmVxdWVzdDpcbiAqIC0gZmluZHMgdGhlIHJpZ2h0IGRhdGFUeXBlIChtZWRpYXRlcyBiZXR3ZWVuIGNvbnRlbnQtdHlwZSBhbmQgZXhwZWN0ZWQgZGF0YVR5cGUpXG4gKiAtIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcmVzcG9uc2VcbiAqL1xuZnVuY3Rpb24gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApIHtcbiAgdmFyIGZpcnN0RGF0YVR5cGUsIGN0LCBmaW5hbERhdGFUeXBlLCB0eXBlLFxuICAgIGNvbnRlbnRzID0gcy5jb250ZW50cyxcbiAgICBkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcztcblxuICAvLyBSZW1vdmUgYXV0byBkYXRhVHlwZSBhbmQgZ2V0IGNvbnRlbnQtdHlwZSBpbiB0aGUgcHJvY2Vzc1xuICB3aGlsZSAoIGRhdGFUeXBlc1sgMCBdID09PSBcIipcIiApIHtcbiAgICBkYXRhVHlwZXMuc2hpZnQoKTtcbiAgICBpZiAoIGN0ID09PSB1bmRlZmluZWQgKSB7XG4gICAgICBjdCA9IHMubWltZVR5cGUgfHwganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgd2UncmUgZGVhbGluZyB3aXRoIGEga25vd24gY29udGVudC10eXBlXG4gIGlmICggY3QgKSB7XG4gICAgZm9yICggdHlwZSBpbiBjb250ZW50cyApIHtcbiAgICAgIGlmICggY29udGVudHNbIHR5cGUgXSAmJiBjb250ZW50c1sgdHlwZSBdLnRlc3QoIGN0ICkgKSB7XG4gICAgICAgIGRhdGFUeXBlcy51bnNoaWZ0KCB0eXBlICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGEgcmVzcG9uc2UgZm9yIHRoZSBleHBlY3RlZCBkYXRhVHlwZVxuICBpZiAoIGRhdGFUeXBlc1sgMCBdIGluIHJlc3BvbnNlcyApIHtcbiAgICBmaW5hbERhdGFUeXBlID0gZGF0YVR5cGVzWyAwIF07XG4gIH0gZWxzZSB7XG4gICAgLy8gVHJ5IGNvbnZlcnRpYmxlIGRhdGFUeXBlc1xuICAgIGZvciAoIHR5cGUgaW4gcmVzcG9uc2VzICkge1xuICAgICAgaWYgKCAhZGF0YVR5cGVzWyAwIF0gfHwgcy5jb252ZXJ0ZXJzWyB0eXBlICsgXCIgXCIgKyBkYXRhVHlwZXNbMF0gXSApIHtcbiAgICAgICAgZmluYWxEYXRhVHlwZSA9IHR5cGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCAhZmlyc3REYXRhVHlwZSApIHtcbiAgICAgICAgZmlyc3REYXRhVHlwZSA9IHR5cGU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE9yIGp1c3QgdXNlIGZpcnN0IG9uZVxuICAgIGZpbmFsRGF0YVR5cGUgPSBmaW5hbERhdGFUeXBlIHx8IGZpcnN0RGF0YVR5cGU7XG4gIH1cblxuICAvLyBJZiB3ZSBmb3VuZCBhIGRhdGFUeXBlXG4gIC8vIFdlIGFkZCB0aGUgZGF0YVR5cGUgdG8gdGhlIGxpc3QgaWYgbmVlZGVkXG4gIC8vIGFuZCByZXR1cm4gdGhlIGNvcnJlc3BvbmRpbmcgcmVzcG9uc2VcbiAgaWYgKCBmaW5hbERhdGFUeXBlICkge1xuICAgIGlmICggZmluYWxEYXRhVHlwZSAhPT0gZGF0YVR5cGVzWyAwIF0gKSB7XG4gICAgICBkYXRhVHlwZXMudW5zaGlmdCggZmluYWxEYXRhVHlwZSApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VzWyBmaW5hbERhdGFUeXBlIF07XG4gIH1cbn1cblxuLyogQ2hhaW4gY29udmVyc2lvbnMgZ2l2ZW4gdGhlIHJlcXVlc3QgYW5kIHRoZSBvcmlnaW5hbCByZXNwb25zZVxuICogQWxzbyBzZXRzIHRoZSByZXNwb25zZVhYWCBmaWVsZHMgb24gdGhlIGpxWEhSIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApIHtcbiAgdmFyIGNvbnYyLCBjdXJyZW50LCBjb252LCB0bXAsIHByZXYsXG4gICAgY29udmVydGVycyA9IHt9LFxuICAgIC8vIFdvcmsgd2l0aCBhIGNvcHkgb2YgZGF0YVR5cGVzIGluIGNhc2Ugd2UgbmVlZCB0byBtb2RpZnkgaXQgZm9yIGNvbnZlcnNpb25cbiAgICBkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcy5zbGljZSgpO1xuXG4gIC8vIENyZWF0ZSBjb252ZXJ0ZXJzIG1hcCB3aXRoIGxvd2VyY2FzZWQga2V5c1xuICBpZiAoIGRhdGFUeXBlc1sgMSBdICkge1xuICAgIGZvciAoIGNvbnYgaW4gcy5jb252ZXJ0ZXJzICkge1xuICAgICAgY29udmVydGVyc1sgY29udi50b0xvd2VyQ2FzZSgpIF0gPSBzLmNvbnZlcnRlcnNbIGNvbnYgXTtcbiAgICB9XG4gIH1cblxuICBjdXJyZW50ID0gZGF0YVR5cGVzLnNoaWZ0KCk7XG5cbiAgLy8gQ29udmVydCB0byBlYWNoIHNlcXVlbnRpYWwgZGF0YVR5cGVcbiAgd2hpbGUgKCBjdXJyZW50ICkge1xuXG4gICAgaWYgKCBzLnJlc3BvbnNlRmllbGRzWyBjdXJyZW50IF0gKSB7XG4gICAgICBqcVhIUlsgcy5yZXNwb25zZUZpZWxkc1sgY3VycmVudCBdIF0gPSByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvLyBBcHBseSB0aGUgZGF0YUZpbHRlciBpZiBwcm92aWRlZFxuICAgIGlmICggIXByZXYgJiYgaXNTdWNjZXNzICYmIHMuZGF0YUZpbHRlciApIHtcbiAgICAgIHJlc3BvbnNlID0gcy5kYXRhRmlsdGVyKCByZXNwb25zZSwgcy5kYXRhVHlwZSApO1xuICAgIH1cblxuICAgIHByZXYgPSBjdXJyZW50O1xuICAgIGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcblxuICAgIGlmICggY3VycmVudCApIHtcblxuICAgICAgLy8gVGhlcmUncyBvbmx5IHdvcmsgdG8gZG8gaWYgY3VycmVudCBkYXRhVHlwZSBpcyBub24tYXV0b1xuICAgICAgaWYgKCBjdXJyZW50ID09PSBcIipcIiApIHtcblxuICAgICAgICBjdXJyZW50ID0gcHJldjtcblxuICAgICAgLy8gQ29udmVydCByZXNwb25zZSBpZiBwcmV2IGRhdGFUeXBlIGlzIG5vbi1hdXRvIGFuZCBkaWZmZXJzIGZyb20gY3VycmVudFxuICAgICAgfSBlbHNlIGlmICggcHJldiAhPT0gXCIqXCIgJiYgcHJldiAhPT0gY3VycmVudCApIHtcblxuICAgICAgICAvLyBTZWVrIGEgZGlyZWN0IGNvbnZlcnRlclxuICAgICAgICBjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgY3VycmVudCBdIHx8IGNvbnZlcnRlcnNbIFwiKiBcIiArIGN1cnJlbnQgXTtcblxuICAgICAgICAvLyBJZiBub25lIGZvdW5kLCBzZWVrIGEgcGFpclxuICAgICAgICBpZiAoICFjb252ICkge1xuICAgICAgICAgIGZvciAoIGNvbnYyIGluIGNvbnZlcnRlcnMgKSB7XG5cbiAgICAgICAgICAgIC8vIElmIGNvbnYyIG91dHB1dHMgY3VycmVudFxuICAgICAgICAgICAgdG1wID0gY29udjIuc3BsaXQoIFwiIFwiICk7XG4gICAgICAgICAgICBpZiAoIHRtcFsgMSBdID09PSBjdXJyZW50ICkge1xuXG4gICAgICAgICAgICAgIC8vIElmIHByZXYgY2FuIGJlIGNvbnZlcnRlZCB0byBhY2NlcHRlZCBpbnB1dFxuICAgICAgICAgICAgICBjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgdG1wWyAwIF0gXSB8fFxuICAgICAgICAgICAgICAgIGNvbnZlcnRlcnNbIFwiKiBcIiArIHRtcFsgMCBdIF07XG4gICAgICAgICAgICAgIGlmICggY29udiApIHtcbiAgICAgICAgICAgICAgICAvLyBDb25kZW5zZSBlcXVpdmFsZW5jZSBjb252ZXJ0ZXJzXG4gICAgICAgICAgICAgICAgaWYgKCBjb252ID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICAgY29udiA9IGNvbnZlcnRlcnNbIGNvbnYyIF07XG5cbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGluc2VydCB0aGUgaW50ZXJtZWRpYXRlIGRhdGFUeXBlXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggY29udmVydGVyc1sgY29udjIgXSAhPT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB0bXBbIDAgXTtcbiAgICAgICAgICAgICAgICAgIGRhdGFUeXBlcy51bnNoaWZ0KCB0bXBbIDEgXSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFwcGx5IGNvbnZlcnRlciAoaWYgbm90IGFuIGVxdWl2YWxlbmNlKVxuICAgICAgICBpZiAoIGNvbnYgIT09IHRydWUgKSB7XG5cbiAgICAgICAgICAvLyBVbmxlc3MgZXJyb3JzIGFyZSBhbGxvd2VkIHRvIGJ1YmJsZSwgY2F0Y2ggYW5kIHJldHVybiB0aGVtXG4gICAgICAgICAgaWYgKCBjb252ICYmIHNbIFwidGhyb3dzXCIgXSApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gY29udiggcmVzcG9uc2UgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuICAgICAgICAgICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IHN0YXRlOiBcInBhcnNlcmVycm9yXCIsIGVycm9yOiBjb252ID8gZSA6IFwiTm8gY29udmVyc2lvbiBmcm9tIFwiICsgcHJldiArIFwiIHRvIFwiICsgY3VycmVudCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IHN0YXRlOiBcInN1Y2Nlc3NcIiwgZGF0YTogcmVzcG9uc2UgfTtcbn1cblxualF1ZXJ5LmV4dGVuZCh7XG5cbiAgLy8gQ291bnRlciBmb3IgaG9sZGluZyB0aGUgbnVtYmVyIG9mIGFjdGl2ZSBxdWVyaWVzXG4gIGFjdGl2ZTogMCxcblxuICAvLyBMYXN0LU1vZGlmaWVkIGhlYWRlciBjYWNoZSBmb3IgbmV4dCByZXF1ZXN0XG4gIGxhc3RNb2RpZmllZDoge30sXG4gIGV0YWc6IHt9LFxuXG4gIGFqYXhTZXR0aW5nczoge1xuICAgIHVybDogYWpheExvY2F0aW9uLFxuICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgaXNMb2NhbDogcmxvY2FsUHJvdG9jb2wudGVzdCggYWpheExvY1BhcnRzWyAxIF0gKSxcbiAgICBnbG9iYWw6IHRydWUsXG4gICAgcHJvY2Vzc0RhdGE6IHRydWUsXG4gICAgYXN5bmM6IHRydWUsXG4gICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsXG4gICAgLypcbiAgICB0aW1lb3V0OiAwLFxuICAgIGRhdGE6IG51bGwsXG4gICAgZGF0YVR5cGU6IG51bGwsXG4gICAgdXNlcm5hbWU6IG51bGwsXG4gICAgcGFzc3dvcmQ6IG51bGwsXG4gICAgY2FjaGU6IG51bGwsXG4gICAgdGhyb3dzOiBmYWxzZSxcbiAgICB0cmFkaXRpb25hbDogZmFsc2UsXG4gICAgaGVhZGVyczoge30sXG4gICAgKi9cblxuICAgIGFjY2VwdHM6IHtcbiAgICAgIFwiKlwiOiBhbGxUeXBlcyxcbiAgICAgIHRleHQ6IFwidGV4dC9wbGFpblwiLFxuICAgICAgaHRtbDogXCJ0ZXh0L2h0bWxcIixcbiAgICAgIHhtbDogXCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsXG4gICAgICBqc29uOiBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdFwiXG4gICAgfSxcblxuICAgIGNvbnRlbnRzOiB7XG4gICAgICB4bWw6IC94bWwvLFxuICAgICAgaHRtbDogL2h0bWwvLFxuICAgICAganNvbjogL2pzb24vXG4gICAgfSxcblxuICAgIHJlc3BvbnNlRmllbGRzOiB7XG4gICAgICB4bWw6IFwicmVzcG9uc2VYTUxcIixcbiAgICAgIHRleHQ6IFwicmVzcG9uc2VUZXh0XCIsXG4gICAgICBqc29uOiBcInJlc3BvbnNlSlNPTlwiXG4gICAgfSxcblxuICAgIC8vIERhdGEgY29udmVydGVyc1xuICAgIC8vIEtleXMgc2VwYXJhdGUgc291cmNlIChvciBjYXRjaGFsbCBcIipcIikgYW5kIGRlc3RpbmF0aW9uIHR5cGVzIHdpdGggYSBzaW5nbGUgc3BhY2VcbiAgICBjb252ZXJ0ZXJzOiB7XG5cbiAgICAgIC8vIENvbnZlcnQgYW55dGhpbmcgdG8gdGV4dFxuICAgICAgXCIqIHRleHRcIjogU3RyaW5nLFxuXG4gICAgICAvLyBUZXh0IHRvIGh0bWwgKHRydWUgPSBubyB0cmFuc2Zvcm1hdGlvbilcbiAgICAgIFwidGV4dCBodG1sXCI6IHRydWUsXG5cbiAgICAgIC8vIEV2YWx1YXRlIHRleHQgYXMgYSBqc29uIGV4cHJlc3Npb25cbiAgICAgIFwidGV4dCBqc29uXCI6IGpRdWVyeS5wYXJzZUpTT04sXG5cbiAgICAgIC8vIFBhcnNlIHRleHQgYXMgeG1sXG4gICAgICBcInRleHQgeG1sXCI6IGpRdWVyeS5wYXJzZVhNTFxuICAgIH0sXG5cbiAgICAvLyBGb3Igb3B0aW9ucyB0aGF0IHNob3VsZG4ndCBiZSBkZWVwIGV4dGVuZGVkOlxuICAgIC8vIHlvdSBjYW4gYWRkIHlvdXIgb3duIGN1c3RvbSBvcHRpb25zIGhlcmUgaWZcbiAgICAvLyBhbmQgd2hlbiB5b3UgY3JlYXRlIG9uZSB0aGF0IHNob3VsZG4ndCBiZVxuICAgIC8vIGRlZXAgZXh0ZW5kZWQgKHNlZSBhamF4RXh0ZW5kKVxuICAgIGZsYXRPcHRpb25zOiB7XG4gICAgICB1cmw6IHRydWUsXG4gICAgICBjb250ZXh0OiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIC8vIENyZWF0ZXMgYSBmdWxsIGZsZWRnZWQgc2V0dGluZ3Mgb2JqZWN0IGludG8gdGFyZ2V0XG4gIC8vIHdpdGggYm90aCBhamF4U2V0dGluZ3MgYW5kIHNldHRpbmdzIGZpZWxkcy5cbiAgLy8gSWYgdGFyZ2V0IGlzIG9taXR0ZWQsIHdyaXRlcyBpbnRvIGFqYXhTZXR0aW5ncy5cbiAgYWpheFNldHVwOiBmdW5jdGlvbiggdGFyZ2V0LCBzZXR0aW5ncyApIHtcbiAgICByZXR1cm4gc2V0dGluZ3MgP1xuXG4gICAgICAvLyBCdWlsZGluZyBhIHNldHRpbmdzIG9iamVjdFxuICAgICAgYWpheEV4dGVuZCggYWpheEV4dGVuZCggdGFyZ2V0LCBqUXVlcnkuYWpheFNldHRpbmdzICksIHNldHRpbmdzICkgOlxuXG4gICAgICAvLyBFeHRlbmRpbmcgYWpheFNldHRpbmdzXG4gICAgICBhamF4RXh0ZW5kKCBqUXVlcnkuYWpheFNldHRpbmdzLCB0YXJnZXQgKTtcbiAgfSxcblxuICBhamF4UHJlZmlsdGVyOiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHByZWZpbHRlcnMgKSxcbiAgYWpheFRyYW5zcG9ydDogYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzICksXG5cbiAgLy8gTWFpbiBtZXRob2RcbiAgYWpheDogZnVuY3Rpb24oIHVybCwgb3B0aW9ucyApIHtcblxuICAgIC8vIElmIHVybCBpcyBhbiBvYmplY3QsIHNpbXVsYXRlIHByZS0xLjUgc2lnbmF0dXJlXG4gICAgaWYgKCB0eXBlb2YgdXJsID09PSBcIm9iamVjdFwiICkge1xuICAgICAgb3B0aW9ucyA9IHVybDtcbiAgICAgIHVybCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBGb3JjZSBvcHRpb25zIHRvIGJlIGFuIG9iamVjdFxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdmFyIC8vIENyb3NzLWRvbWFpbiBkZXRlY3Rpb24gdmFyc1xuICAgICAgcGFydHMsXG4gICAgICAvLyBMb29wIHZhcmlhYmxlXG4gICAgICBpLFxuICAgICAgLy8gVVJMIHdpdGhvdXQgYW50aS1jYWNoZSBwYXJhbVxuICAgICAgY2FjaGVVUkwsXG4gICAgICAvLyBSZXNwb25zZSBoZWFkZXJzIGFzIHN0cmluZ1xuICAgICAgcmVzcG9uc2VIZWFkZXJzU3RyaW5nLFxuICAgICAgLy8gdGltZW91dCBoYW5kbGVcbiAgICAgIHRpbWVvdXRUaW1lcixcblxuICAgICAgLy8gVG8ga25vdyBpZiBnbG9iYWwgZXZlbnRzIGFyZSB0byBiZSBkaXNwYXRjaGVkXG4gICAgICBmaXJlR2xvYmFscyxcblxuICAgICAgdHJhbnNwb3J0LFxuICAgICAgLy8gUmVzcG9uc2UgaGVhZGVyc1xuICAgICAgcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgLy8gQ3JlYXRlIHRoZSBmaW5hbCBvcHRpb25zIG9iamVjdFxuICAgICAgcyA9IGpRdWVyeS5hamF4U2V0dXAoIHt9LCBvcHRpb25zICksXG4gICAgICAvLyBDYWxsYmFja3MgY29udGV4dFxuICAgICAgY2FsbGJhY2tDb250ZXh0ID0gcy5jb250ZXh0IHx8IHMsXG4gICAgICAvLyBDb250ZXh0IGZvciBnbG9iYWwgZXZlbnRzIGlzIGNhbGxiYWNrQ29udGV4dCBpZiBpdCBpcyBhIERPTSBub2RlIG9yIGpRdWVyeSBjb2xsZWN0aW9uXG4gICAgICBnbG9iYWxFdmVudENvbnRleHQgPSBzLmNvbnRleHQgJiYgKCBjYWxsYmFja0NvbnRleHQubm9kZVR5cGUgfHwgY2FsbGJhY2tDb250ZXh0LmpxdWVyeSApID9cbiAgICAgICAgalF1ZXJ5KCBjYWxsYmFja0NvbnRleHQgKSA6XG4gICAgICAgIGpRdWVyeS5ldmVudCxcbiAgICAgIC8vIERlZmVycmVkc1xuICAgICAgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgIGNvbXBsZXRlRGVmZXJyZWQgPSBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksXG4gICAgICAvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuICAgICAgc3RhdHVzQ29kZSA9IHMuc3RhdHVzQ29kZSB8fCB7fSxcbiAgICAgIC8vIEhlYWRlcnMgKHRoZXkgYXJlIHNlbnQgYWxsIGF0IG9uY2UpXG4gICAgICByZXF1ZXN0SGVhZGVycyA9IHt9LFxuICAgICAgcmVxdWVzdEhlYWRlcnNOYW1lcyA9IHt9LFxuICAgICAgLy8gVGhlIGpxWEhSIHN0YXRlXG4gICAgICBzdGF0ZSA9IDAsXG4gICAgICAvLyBEZWZhdWx0IGFib3J0IG1lc3NhZ2VcbiAgICAgIHN0ckFib3J0ID0gXCJjYW5jZWxlZFwiLFxuICAgICAgLy8gRmFrZSB4aHJcbiAgICAgIGpxWEhSID0ge1xuICAgICAgICByZWFkeVN0YXRlOiAwLFxuXG4gICAgICAgIC8vIEJ1aWxkcyBoZWFkZXJzIGhhc2h0YWJsZSBpZiBuZWVkZWRcbiAgICAgICAgZ2V0UmVzcG9uc2VIZWFkZXI6IGZ1bmN0aW9uKCBrZXkgKSB7XG4gICAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICAgIGlmICggc3RhdGUgPT09IDIgKSB7XG4gICAgICAgICAgICBpZiAoICFyZXNwb25zZUhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlSGVhZGVycyA9IHt9O1xuICAgICAgICAgICAgICB3aGlsZSAoIChtYXRjaCA9IHJoZWFkZXJzLmV4ZWMoIHJlc3BvbnNlSGVhZGVyc1N0cmluZyApKSApIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnNbIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgXSA9IG1hdGNoWyAyIF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1hdGNoID0gcmVzcG9uc2VIZWFkZXJzWyBrZXkudG9Mb3dlckNhc2UoKSBdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWF0Y2ggPT0gbnVsbCA/IG51bGwgOiBtYXRjaDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSYXcgc3RyaW5nXG4gICAgICAgIGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlID09PSAyID8gcmVzcG9uc2VIZWFkZXJzU3RyaW5nIDogbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDYWNoZXMgdGhlIGhlYWRlclxuICAgICAgICBzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG4gICAgICAgICAgdmFyIGxuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGlmICggIXN0YXRlICkge1xuICAgICAgICAgICAgbmFtZSA9IHJlcXVlc3RIZWFkZXJzTmFtZXNbIGxuYW1lIF0gPSByZXF1ZXN0SGVhZGVyc05hbWVzWyBsbmFtZSBdIHx8IG5hbWU7XG4gICAgICAgICAgICByZXF1ZXN0SGVhZGVyc1sgbmFtZSBdID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIE92ZXJyaWRlcyByZXNwb25zZSBjb250ZW50LXR5cGUgaGVhZGVyXG4gICAgICAgIG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKCB0eXBlICkge1xuICAgICAgICAgIGlmICggIXN0YXRlICkge1xuICAgICAgICAgICAgcy5taW1lVHlwZSA9IHR5cGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG4gICAgICAgIHN0YXR1c0NvZGU6IGZ1bmN0aW9uKCBtYXAgKSB7XG4gICAgICAgICAgdmFyIGNvZGU7XG4gICAgICAgICAgaWYgKCBtYXAgKSB7XG4gICAgICAgICAgICBpZiAoIHN0YXRlIDwgMiApIHtcbiAgICAgICAgICAgICAgZm9yICggY29kZSBpbiBtYXAgKSB7XG4gICAgICAgICAgICAgICAgLy8gTGF6eS1hZGQgdGhlIG5ldyBjYWxsYmFjayBpbiBhIHdheSB0aGF0IHByZXNlcnZlcyBvbGQgb25lc1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGVbIGNvZGUgXSA9IFsgc3RhdHVzQ29kZVsgY29kZSBdLCBtYXBbIGNvZGUgXSBdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFja3NcbiAgICAgICAgICAgICAganFYSFIuYWx3YXlzKCBtYXBbIGpxWEhSLnN0YXR1cyBdICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENhbmNlbCB0aGUgcmVxdWVzdFxuICAgICAgICBhYm9ydDogZnVuY3Rpb24oIHN0YXR1c1RleHQgKSB7XG4gICAgICAgICAgdmFyIGZpbmFsVGV4dCA9IHN0YXR1c1RleHQgfHwgc3RyQWJvcnQ7XG4gICAgICAgICAgaWYgKCB0cmFuc3BvcnQgKSB7XG4gICAgICAgICAgICB0cmFuc3BvcnQuYWJvcnQoIGZpbmFsVGV4dCApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkb25lKCAwLCBmaW5hbFRleHQgKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgIC8vIEF0dGFjaCBkZWZlcnJlZHNcbiAgICBkZWZlcnJlZC5wcm9taXNlKCBqcVhIUiApLmNvbXBsZXRlID0gY29tcGxldGVEZWZlcnJlZC5hZGQ7XG4gICAganFYSFIuc3VjY2VzcyA9IGpxWEhSLmRvbmU7XG4gICAganFYSFIuZXJyb3IgPSBqcVhIUi5mYWlsO1xuXG4gICAgLy8gUmVtb3ZlIGhhc2ggY2hhcmFjdGVyICgjNzUzMTogYW5kIHN0cmluZyBwcm9tb3Rpb24pXG4gICAgLy8gQWRkIHByb3RvY29sIGlmIG5vdCBwcm92aWRlZCAoIzU4NjY6IElFNyBpc3N1ZSB3aXRoIHByb3RvY29sLWxlc3MgdXJscylcbiAgICAvLyBIYW5kbGUgZmFsc3kgdXJsIGluIHRoZSBzZXR0aW5ncyBvYmplY3QgKCMxMDA5MzogY29uc2lzdGVuY3kgd2l0aCBvbGQgc2lnbmF0dXJlKVxuICAgIC8vIFdlIGFsc28gdXNlIHRoZSB1cmwgcGFyYW1ldGVyIGlmIGF2YWlsYWJsZVxuICAgIHMudXJsID0gKCAoIHVybCB8fCBzLnVybCB8fCBhamF4TG9jYXRpb24gKSArIFwiXCIgKS5yZXBsYWNlKCByaGFzaCwgXCJcIiApLnJlcGxhY2UoIHJwcm90b2NvbCwgYWpheExvY1BhcnRzWyAxIF0gKyBcIi8vXCIgKTtcblxuICAgIC8vIEFsaWFzIG1ldGhvZCBvcHRpb24gdG8gdHlwZSBhcyBwZXIgdGlja2V0ICMxMjAwNFxuICAgIHMudHlwZSA9IG9wdGlvbnMubWV0aG9kIHx8IG9wdGlvbnMudHlwZSB8fCBzLm1ldGhvZCB8fCBzLnR5cGU7XG5cbiAgICAvLyBFeHRyYWN0IGRhdGFUeXBlcyBsaXN0XG4gICAgcy5kYXRhVHlwZXMgPSBqUXVlcnkudHJpbSggcy5kYXRhVHlwZSB8fCBcIipcIiApLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXG4gICAgLy8gQSBjcm9zcy1kb21haW4gcmVxdWVzdCBpcyBpbiBvcmRlciB3aGVuIHdlIGhhdmUgYSBwcm90b2NvbDpob3N0OnBvcnQgbWlzbWF0Y2hcbiAgICBpZiAoIHMuY3Jvc3NEb21haW4gPT0gbnVsbCApIHtcbiAgICAgIHBhcnRzID0gcnVybC5leGVjKCBzLnVybC50b0xvd2VyQ2FzZSgpICk7XG4gICAgICBzLmNyb3NzRG9tYWluID0gISEoIHBhcnRzICYmXG4gICAgICAgICggcGFydHNbIDEgXSAhPT0gYWpheExvY1BhcnRzWyAxIF0gfHwgcGFydHNbIDIgXSAhPT0gYWpheExvY1BhcnRzWyAyIF0gfHxcbiAgICAgICAgICAoIHBhcnRzWyAzIF0gfHwgKCBwYXJ0c1sgMSBdID09PSBcImh0dHA6XCIgPyBcIjgwXCIgOiBcIjQ0M1wiICkgKSAhPT1cbiAgICAgICAgICAgICggYWpheExvY1BhcnRzWyAzIF0gfHwgKCBhamF4TG9jUGFydHNbIDEgXSA9PT0gXCJodHRwOlwiID8gXCI4MFwiIDogXCI0NDNcIiApICkgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IGRhdGEgaWYgbm90IGFscmVhZHkgYSBzdHJpbmdcbiAgICBpZiAoIHMuZGF0YSAmJiBzLnByb2Nlc3NEYXRhICYmIHR5cGVvZiBzLmRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICBzLmRhdGEgPSBqUXVlcnkucGFyYW0oIHMuZGF0YSwgcy50cmFkaXRpb25hbCApO1xuICAgIH1cblxuICAgIC8vIEFwcGx5IHByZWZpbHRlcnNcbiAgICBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycywgcywgb3B0aW9ucywganFYSFIgKTtcblxuICAgIC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGEgcHJlZmlsdGVyLCBzdG9wIHRoZXJlXG4gICAgaWYgKCBzdGF0ZSA9PT0gMiApIHtcbiAgICAgIHJldHVybiBqcVhIUjtcbiAgICB9XG5cbiAgICAvLyBXZSBjYW4gZmlyZSBnbG9iYWwgZXZlbnRzIGFzIG9mIG5vdyBpZiBhc2tlZCB0b1xuICAgIC8vIERvbid0IGZpcmUgZXZlbnRzIGlmIGpRdWVyeS5ldmVudCBpcyB1bmRlZmluZWQgaW4gYW4gQU1ELXVzYWdlIHNjZW5hcmlvICgjMTUxMTgpXG4gICAgZmlyZUdsb2JhbHMgPSBqUXVlcnkuZXZlbnQgJiYgcy5nbG9iYWw7XG5cbiAgICAvLyBXYXRjaCBmb3IgYSBuZXcgc2V0IG9mIHJlcXVlc3RzXG4gICAgaWYgKCBmaXJlR2xvYmFscyAmJiBqUXVlcnkuYWN0aXZlKysgPT09IDAgKSB7XG4gICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlcihcImFqYXhTdGFydFwiKTtcbiAgICB9XG5cbiAgICAvLyBVcHBlcmNhc2UgdGhlIHR5cGVcbiAgICBzLnR5cGUgPSBzLnR5cGUudG9VcHBlckNhc2UoKTtcblxuICAgIC8vIERldGVybWluZSBpZiByZXF1ZXN0IGhhcyBjb250ZW50XG4gICAgcy5oYXNDb250ZW50ID0gIXJub0NvbnRlbnQudGVzdCggcy50eXBlICk7XG5cbiAgICAvLyBTYXZlIHRoZSBVUkwgaW4gY2FzZSB3ZSdyZSB0b3lpbmcgd2l0aCB0aGUgSWYtTW9kaWZpZWQtU2luY2VcbiAgICAvLyBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIgbGF0ZXIgb25cbiAgICBjYWNoZVVSTCA9IHMudXJsO1xuXG4gICAgLy8gTW9yZSBvcHRpb25zIGhhbmRsaW5nIGZvciByZXF1ZXN0cyB3aXRoIG5vIGNvbnRlbnRcbiAgICBpZiAoICFzLmhhc0NvbnRlbnQgKSB7XG5cbiAgICAgIC8vIElmIGRhdGEgaXMgYXZhaWxhYmxlLCBhcHBlbmQgZGF0YSB0byB1cmxcbiAgICAgIGlmICggcy5kYXRhICkge1xuICAgICAgICBjYWNoZVVSTCA9ICggcy51cmwgKz0gKCBycXVlcnkudGVzdCggY2FjaGVVUkwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuZGF0YSApO1xuICAgICAgICAvLyAjOTY4MjogcmVtb3ZlIGRhdGEgc28gdGhhdCBpdCdzIG5vdCB1c2VkIGluIGFuIGV2ZW50dWFsIHJldHJ5XG4gICAgICAgIGRlbGV0ZSBzLmRhdGE7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhbnRpLWNhY2hlIGluIHVybCBpZiBuZWVkZWRcbiAgICAgIGlmICggcy5jYWNoZSA9PT0gZmFsc2UgKSB7XG4gICAgICAgIHMudXJsID0gcnRzLnRlc3QoIGNhY2hlVVJMICkgP1xuXG4gICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhICdfJyBwYXJhbWV0ZXIsIHNldCBpdHMgdmFsdWVcbiAgICAgICAgICBjYWNoZVVSTC5yZXBsYWNlKCBydHMsIFwiJDFfPVwiICsgbm9uY2UrKyApIDpcblxuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgb25lIHRvIHRoZSBlbmRcbiAgICAgICAgICBjYWNoZVVSTCArICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBcIl89XCIgKyBub25jZSsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG4gICAgaWYgKCBzLmlmTW9kaWZpZWQgKSB7XG4gICAgICBpZiAoIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKSB7XG4gICAgICAgIGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTW9kaWZpZWQtU2luY2VcIiwgalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApO1xuICAgICAgfVxuICAgICAgaWYgKCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApIHtcbiAgICAgICAganFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Ob25lLU1hdGNoXCIsIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBjb3JyZWN0IGhlYWRlciwgaWYgZGF0YSBpcyBiZWluZyBzZW50XG4gICAgaWYgKCBzLmRhdGEgJiYgcy5oYXNDb250ZW50ICYmIHMuY29udGVudFR5cGUgIT09IGZhbHNlIHx8IG9wdGlvbnMuY29udGVudFR5cGUgKSB7XG4gICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiLCBzLmNvbnRlbnRUeXBlICk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxuICAgIGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoXG4gICAgICBcIkFjY2VwdFwiLFxuICAgICAgcy5kYXRhVHlwZXNbIDAgXSAmJiBzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWzBdIF0gP1xuICAgICAgICBzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWzBdIF0gKyAoIHMuZGF0YVR5cGVzWyAwIF0gIT09IFwiKlwiID8gXCIsIFwiICsgYWxsVHlwZXMgKyBcIjsgcT0wLjAxXCIgOiBcIlwiICkgOlxuICAgICAgICBzLmFjY2VwdHNbIFwiKlwiIF1cbiAgICApO1xuXG4gICAgLy8gQ2hlY2sgZm9yIGhlYWRlcnMgb3B0aW9uXG4gICAgZm9yICggaSBpbiBzLmhlYWRlcnMgKSB7XG4gICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBzLmhlYWRlcnNbIGkgXSApO1xuICAgIH1cblxuICAgIC8vIEFsbG93IGN1c3RvbSBoZWFkZXJzL21pbWV0eXBlcyBhbmQgZWFybHkgYWJvcnRcbiAgICBpZiAoIHMuYmVmb3JlU2VuZCAmJiAoIHMuYmVmb3JlU2VuZC5jYWxsKCBjYWxsYmFja0NvbnRleHQsIGpxWEhSLCBzICkgPT09IGZhbHNlIHx8IHN0YXRlID09PSAyICkgKSB7XG4gICAgICAvLyBBYm9ydCBpZiBub3QgZG9uZSBhbHJlYWR5IGFuZCByZXR1cm5cbiAgICAgIHJldHVybiBqcVhIUi5hYm9ydCgpO1xuICAgIH1cblxuICAgIC8vIGFib3J0aW5nIGlzIG5vIGxvbmdlciBhIGNhbmNlbGxhdGlvblxuICAgIHN0ckFib3J0ID0gXCJhYm9ydFwiO1xuXG4gICAgLy8gSW5zdGFsbCBjYWxsYmFja3Mgb24gZGVmZXJyZWRzXG4gICAgZm9yICggaSBpbiB7IHN1Y2Nlc3M6IDEsIGVycm9yOiAxLCBjb21wbGV0ZTogMSB9ICkge1xuICAgICAganFYSFJbIGkgXSggc1sgaSBdICk7XG4gICAgfVxuXG4gICAgLy8gR2V0IHRyYW5zcG9ydFxuICAgIHRyYW5zcG9ydCA9IGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG4gICAgLy8gSWYgbm8gdHJhbnNwb3J0LCB3ZSBhdXRvLWFib3J0XG4gICAgaWYgKCAhdHJhbnNwb3J0ICkge1xuICAgICAgZG9uZSggLTEsIFwiTm8gVHJhbnNwb3J0XCIgKTtcbiAgICB9IGVsc2Uge1xuICAgICAganFYSFIucmVhZHlTdGF0ZSA9IDE7XG5cbiAgICAgIC8vIFNlbmQgZ2xvYmFsIGV2ZW50XG4gICAgICBpZiAoIGZpcmVHbG9iYWxzICkge1xuICAgICAgICBnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4U2VuZFwiLCBbIGpxWEhSLCBzIF0gKTtcbiAgICAgIH1cbiAgICAgIC8vIFRpbWVvdXRcbiAgICAgIGlmICggcy5hc3luYyAmJiBzLnRpbWVvdXQgPiAwICkge1xuICAgICAgICB0aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGpxWEhSLmFib3J0KFwidGltZW91dFwiKTtcbiAgICAgICAgfSwgcy50aW1lb3V0ICk7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXRlID0gMTtcbiAgICAgICAgdHJhbnNwb3J0LnNlbmQoIHJlcXVlc3RIZWFkZXJzLCBkb25lICk7XG4gICAgICB9IGNhdGNoICggZSApIHtcbiAgICAgICAgLy8gUHJvcGFnYXRlIGV4Y2VwdGlvbiBhcyBlcnJvciBpZiBub3QgZG9uZVxuICAgICAgICBpZiAoIHN0YXRlIDwgMiApIHtcbiAgICAgICAgICBkb25lKCAtMSwgZSApO1xuICAgICAgICAvLyBTaW1wbHkgcmV0aHJvdyBvdGhlcndpc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2FsbGJhY2sgZm9yIHdoZW4gZXZlcnl0aGluZyBpcyBkb25lXG4gICAgZnVuY3Rpb24gZG9uZSggc3RhdHVzLCBuYXRpdmVTdGF0dXNUZXh0LCByZXNwb25zZXMsIGhlYWRlcnMgKSB7XG4gICAgICB2YXIgaXNTdWNjZXNzLCBzdWNjZXNzLCBlcnJvciwgcmVzcG9uc2UsIG1vZGlmaWVkLFxuICAgICAgICBzdGF0dXNUZXh0ID0gbmF0aXZlU3RhdHVzVGV4dDtcblxuICAgICAgLy8gQ2FsbGVkIG9uY2VcbiAgICAgIGlmICggc3RhdGUgPT09IDIgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gU3RhdGUgaXMgXCJkb25lXCIgbm93XG4gICAgICBzdGF0ZSA9IDI7XG5cbiAgICAgIC8vIENsZWFyIHRpbWVvdXQgaWYgaXQgZXhpc3RzXG4gICAgICBpZiAoIHRpbWVvdXRUaW1lciApIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KCB0aW1lb3V0VGltZXIgKTtcbiAgICAgIH1cblxuICAgICAgLy8gRGVyZWZlcmVuY2UgdHJhbnNwb3J0IGZvciBlYXJseSBnYXJiYWdlIGNvbGxlY3Rpb25cbiAgICAgIC8vIChubyBtYXR0ZXIgaG93IGxvbmcgdGhlIGpxWEhSIG9iamVjdCB3aWxsIGJlIHVzZWQpXG4gICAgICB0cmFuc3BvcnQgPSB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIENhY2hlIHJlc3BvbnNlIGhlYWRlcnNcbiAgICAgIHJlc3BvbnNlSGVhZGVyc1N0cmluZyA9IGhlYWRlcnMgfHwgXCJcIjtcblxuICAgICAgLy8gU2V0IHJlYWR5U3RhdGVcbiAgICAgIGpxWEhSLnJlYWR5U3RhdGUgPSBzdGF0dXMgPiAwID8gNCA6IDA7XG5cbiAgICAgIC8vIERldGVybWluZSBpZiBzdWNjZXNzZnVsXG4gICAgICBpc1N1Y2Nlc3MgPSBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNDtcblxuICAgICAgLy8gR2V0IHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmICggcmVzcG9uc2VzICkge1xuICAgICAgICByZXNwb25zZSA9IGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ29udmVydCBubyBtYXR0ZXIgd2hhdCAodGhhdCB3YXkgcmVzcG9uc2VYWFggZmllbGRzIGFyZSBhbHdheXMgc2V0KVxuICAgICAgcmVzcG9uc2UgPSBhamF4Q29udmVydCggcywgcmVzcG9uc2UsIGpxWEhSLCBpc1N1Y2Nlc3MgKTtcblxuICAgICAgLy8gSWYgc3VjY2Vzc2Z1bCwgaGFuZGxlIHR5cGUgY2hhaW5pbmdcbiAgICAgIGlmICggaXNTdWNjZXNzICkge1xuXG4gICAgICAgIC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG4gICAgICAgIGlmICggcy5pZk1vZGlmaWVkICkge1xuICAgICAgICAgIG1vZGlmaWVkID0ganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJMYXN0LU1vZGlmaWVkXCIpO1xuICAgICAgICAgIGlmICggbW9kaWZpZWQgKSB7XG4gICAgICAgICAgICBqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdID0gbW9kaWZpZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1vZGlmaWVkID0ganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJldGFnXCIpO1xuICAgICAgICAgIGlmICggbW9kaWZpZWQgKSB7XG4gICAgICAgICAgICBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG5vIGNvbnRlbnRcbiAgICAgICAgaWYgKCBzdGF0dXMgPT09IDIwNCB8fCBzLnR5cGUgPT09IFwiSEVBRFwiICkge1xuICAgICAgICAgIHN0YXR1c1RleHQgPSBcIm5vY29udGVudFwiO1xuXG4gICAgICAgIC8vIGlmIG5vdCBtb2RpZmllZFxuICAgICAgICB9IGVsc2UgaWYgKCBzdGF0dXMgPT09IDMwNCApIHtcbiAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJub3Rtb2RpZmllZFwiO1xuXG4gICAgICAgIC8vIElmIHdlIGhhdmUgZGF0YSwgbGV0J3MgY29udmVydCBpdFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0ZTtcbiAgICAgICAgICBzdWNjZXNzID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICBlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICAgIGlzU3VjY2VzcyA9ICFlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2UgZXh0cmFjdCBlcnJvciBmcm9tIHN0YXR1c1RleHRcbiAgICAgICAgLy8gdGhlbiBub3JtYWxpemUgc3RhdHVzVGV4dCBhbmQgc3RhdHVzIGZvciBub24tYWJvcnRzXG4gICAgICAgIGVycm9yID0gc3RhdHVzVGV4dDtcbiAgICAgICAgaWYgKCBzdGF0dXMgfHwgIXN0YXR1c1RleHQgKSB7XG4gICAgICAgICAgc3RhdHVzVGV4dCA9IFwiZXJyb3JcIjtcbiAgICAgICAgICBpZiAoIHN0YXR1cyA8IDAgKSB7XG4gICAgICAgICAgICBzdGF0dXMgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTZXQgZGF0YSBmb3IgdGhlIGZha2UgeGhyIG9iamVjdFxuICAgICAganFYSFIuc3RhdHVzID0gc3RhdHVzO1xuICAgICAganFYSFIuc3RhdHVzVGV4dCA9ICggbmF0aXZlU3RhdHVzVGV4dCB8fCBzdGF0dXNUZXh0ICkgKyBcIlwiO1xuXG4gICAgICAvLyBTdWNjZXNzL0Vycm9yXG4gICAgICBpZiAoIGlzU3VjY2VzcyApIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBzdWNjZXNzLCBzdGF0dXNUZXh0LCBqcVhIUiBdICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZlcnJlZC5yZWplY3RXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQsIGVycm9yIF0gKTtcbiAgICAgIH1cblxuICAgICAgLy8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3NcbiAgICAgIGpxWEhSLnN0YXR1c0NvZGUoIHN0YXR1c0NvZGUgKTtcbiAgICAgIHN0YXR1c0NvZGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICggZmlyZUdsb2JhbHMgKSB7XG4gICAgICAgIGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBpc1N1Y2Nlc3MgPyBcImFqYXhTdWNjZXNzXCIgOiBcImFqYXhFcnJvclwiLFxuICAgICAgICAgIFsganFYSFIsIHMsIGlzU3VjY2VzcyA/IHN1Y2Nlc3MgOiBlcnJvciBdICk7XG4gICAgICB9XG5cbiAgICAgIC8vIENvbXBsZXRlXG4gICAgICBjb21wbGV0ZURlZmVycmVkLmZpcmVXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQgXSApO1xuXG4gICAgICBpZiAoIGZpcmVHbG9iYWxzICkge1xuICAgICAgICBnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4Q29tcGxldGVcIiwgWyBqcVhIUiwgcyBdICk7XG4gICAgICAgIC8vIEhhbmRsZSB0aGUgZ2xvYmFsIEFKQVggY291bnRlclxuICAgICAgICBpZiAoICEoIC0talF1ZXJ5LmFjdGl2ZSApICkge1xuICAgICAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyKFwiYWpheFN0b3BcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ganFYSFI7XG4gIH0sXG5cbiAgZ2V0SlNPTjogZnVuY3Rpb24oIHVybCwgZGF0YSwgY2FsbGJhY2sgKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5nZXQoIHVybCwgZGF0YSwgY2FsbGJhY2ssIFwianNvblwiICk7XG4gIH0sXG5cbiAgZ2V0U2NyaXB0OiBmdW5jdGlvbiggdXJsLCBjYWxsYmFjayApIHtcbiAgICByZXR1cm4galF1ZXJ5LmdldCggdXJsLCB1bmRlZmluZWQsIGNhbGxiYWNrLCBcInNjcmlwdFwiICk7XG4gIH1cbn0pO1xuXG5qUXVlcnkuZWFjaCggWyBcImdldFwiLCBcInBvc3RcIiBdLCBmdW5jdGlvbiggaSwgbWV0aG9kICkge1xuICBqUXVlcnlbIG1ldGhvZCBdID0gZnVuY3Rpb24oIHVybCwgZGF0YSwgY2FsbGJhY2ssIHR5cGUgKSB7XG4gICAgLy8gc2hpZnQgYXJndW1lbnRzIGlmIGRhdGEgYXJndW1lbnQgd2FzIG9taXR0ZWRcbiAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBkYXRhICkgKSB7XG4gICAgICB0eXBlID0gdHlwZSB8fCBjYWxsYmFjaztcbiAgICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGpRdWVyeS5hamF4KHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgdHlwZTogbWV0aG9kLFxuICAgICAgZGF0YVR5cGU6IHR5cGUsXG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgc3VjY2VzczogY2FsbGJhY2tcbiAgICB9KTtcbiAgfTtcbn0pO1xuXG5cbmpRdWVyeS5fZXZhbFVybCA9IGZ1bmN0aW9uKCB1cmwgKSB7XG4gIHJldHVybiBqUXVlcnkuYWpheCh7XG4gICAgdXJsOiB1cmwsXG4gICAgdHlwZTogXCJHRVRcIixcbiAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICBhc3luYzogZmFsc2UsXG4gICAgZ2xvYmFsOiBmYWxzZSxcbiAgICBcInRocm93c1wiOiB0cnVlXG4gIH0pO1xufTtcblxuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgd3JhcEFsbDogZnVuY3Rpb24oIGh0bWwgKSB7XG4gICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApICkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIGpRdWVyeSh0aGlzKS53cmFwQWxsKCBodG1sLmNhbGwodGhpcywgaSkgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICggdGhpc1swXSApIHtcbiAgICAgIC8vIFRoZSBlbGVtZW50cyB0byB3cmFwIHRoZSB0YXJnZXQgYXJvdW5kXG4gICAgICB2YXIgd3JhcCA9IGpRdWVyeSggaHRtbCwgdGhpc1swXS5vd25lckRvY3VtZW50ICkuZXEoMCkuY2xvbmUodHJ1ZSk7XG5cbiAgICAgIGlmICggdGhpc1swXS5wYXJlbnROb2RlICkge1xuICAgICAgICB3cmFwLmluc2VydEJlZm9yZSggdGhpc1swXSApO1xuICAgICAgfVxuXG4gICAgICB3cmFwLm1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuXG4gICAgICAgIHdoaWxlICggZWxlbS5maXJzdENoaWxkICYmIGVsZW0uZmlyc3RDaGlsZC5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgICBlbGVtID0gZWxlbS5maXJzdENoaWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICB9KS5hcHBlbmQoIHRoaXMgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB3cmFwSW5uZXI6IGZ1bmN0aW9uKCBodG1sICkge1xuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKSApIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICBqUXVlcnkodGhpcykud3JhcElubmVyKCBodG1sLmNhbGwodGhpcywgaSkgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IGpRdWVyeSggdGhpcyApLFxuICAgICAgICBjb250ZW50cyA9IHNlbGYuY29udGVudHMoKTtcblxuICAgICAgaWYgKCBjb250ZW50cy5sZW5ndGggKSB7XG4gICAgICAgIGNvbnRlbnRzLndyYXBBbGwoIGh0bWwgKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5hcHBlbmQoIGh0bWwgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICB3cmFwOiBmdW5jdGlvbiggaHRtbCApIHtcbiAgICB2YXIgaXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICk7XG5cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgIGpRdWVyeSggdGhpcyApLndyYXBBbGwoIGlzRnVuY3Rpb24gPyBodG1sLmNhbGwodGhpcywgaSkgOiBodG1sICk7XG4gICAgfSk7XG4gIH0sXG5cbiAgdW53cmFwOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCAhalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImJvZHlcIiApICkge1xuICAgICAgICBqUXVlcnkoIHRoaXMgKS5yZXBsYWNlV2l0aCggdGhpcy5jaGlsZE5vZGVzICk7XG4gICAgICB9XG4gICAgfSkuZW5kKCk7XG4gIH1cbn0pO1xuXG5cbmpRdWVyeS5leHByLmZpbHRlcnMuaGlkZGVuID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIC8vIFN1cHBvcnQ6IE9wZXJhIDw9IDEyLjEyXG4gIC8vIE9wZXJhIHJlcG9ydHMgb2Zmc2V0V2lkdGhzIGFuZCBvZmZzZXRIZWlnaHRzIGxlc3MgdGhhbiB6ZXJvIG9uIHNvbWUgZWxlbWVudHNcbiAgcmV0dXJuIGVsZW0ub2Zmc2V0V2lkdGggPD0gMCAmJiBlbGVtLm9mZnNldEhlaWdodCA8PSAwIHx8XG4gICAgKCFzdXBwb3J0LnJlbGlhYmxlSGlkZGVuT2Zmc2V0cygpICYmXG4gICAgICAoKGVsZW0uc3R5bGUgJiYgZWxlbS5zdHlsZS5kaXNwbGF5KSB8fCBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApKSA9PT0gXCJub25lXCIpO1xufTtcblxualF1ZXJ5LmV4cHIuZmlsdGVycy52aXNpYmxlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHJldHVybiAhalF1ZXJ5LmV4cHIuZmlsdGVycy5oaWRkZW4oIGVsZW0gKTtcbn07XG5cblxuXG5cbnZhciByMjAgPSAvJTIwL2csXG4gIHJicmFja2V0ID0gL1xcW1xcXSQvLFxuICByQ1JMRiA9IC9cXHI/XFxuL2csXG4gIHJzdWJtaXR0ZXJUeXBlcyA9IC9eKD86c3VibWl0fGJ1dHRvbnxpbWFnZXxyZXNldHxmaWxlKSQvaSxcbiAgcnN1Ym1pdHRhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO1xuXG5mdW5jdGlvbiBidWlsZFBhcmFtcyggcHJlZml4LCBvYmosIHRyYWRpdGlvbmFsLCBhZGQgKSB7XG4gIHZhciBuYW1lO1xuXG4gIGlmICggalF1ZXJ5LmlzQXJyYXkoIG9iaiApICkge1xuICAgIC8vIFNlcmlhbGl6ZSBhcnJheSBpdGVtLlxuICAgIGpRdWVyeS5lYWNoKCBvYmosIGZ1bmN0aW9uKCBpLCB2ICkge1xuICAgICAgaWYgKCB0cmFkaXRpb25hbCB8fCByYnJhY2tldC50ZXN0KCBwcmVmaXggKSApIHtcbiAgICAgICAgLy8gVHJlYXQgZWFjaCBhcnJheSBpdGVtIGFzIGEgc2NhbGFyLlxuICAgICAgICBhZGQoIHByZWZpeCwgdiApO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJdGVtIGlzIG5vbi1zY2FsYXIgKGFycmF5IG9yIG9iamVjdCksIGVuY29kZSBpdHMgbnVtZXJpYyBpbmRleC5cbiAgICAgICAgYnVpbGRQYXJhbXMoIHByZWZpeCArIFwiW1wiICsgKCB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiA/IGkgOiBcIlwiICkgKyBcIl1cIiwgdiwgdHJhZGl0aW9uYWwsIGFkZCApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH0gZWxzZSBpZiAoICF0cmFkaXRpb25hbCAmJiBqUXVlcnkudHlwZSggb2JqICkgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgLy8gU2VyaWFsaXplIG9iamVjdCBpdGVtLlxuICAgIGZvciAoIG5hbWUgaW4gb2JqICkge1xuICAgICAgYnVpbGRQYXJhbXMoIHByZWZpeCArIFwiW1wiICsgbmFtZSArIFwiXVwiLCBvYmpbIG5hbWUgXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIC8vIFNlcmlhbGl6ZSBzY2FsYXIgaXRlbS5cbiAgICBhZGQoIHByZWZpeCwgb2JqICk7XG4gIH1cbn1cblxuLy8gU2VyaWFsaXplIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMgb3IgYSBzZXQgb2Zcbi8vIGtleS92YWx1ZXMgaW50byBhIHF1ZXJ5IHN0cmluZ1xualF1ZXJ5LnBhcmFtID0gZnVuY3Rpb24oIGEsIHRyYWRpdGlvbmFsICkge1xuICB2YXIgcHJlZml4LFxuICAgIHMgPSBbXSxcbiAgICBhZGQgPSBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcbiAgICAgIC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgcmV0dXJuIGl0cyB2YWx1ZVxuICAgICAgdmFsdWUgPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSA/IHZhbHVlKCkgOiAoIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKTtcbiAgICAgIHNbIHMubGVuZ3RoIF0gPSBlbmNvZGVVUklDb21wb25lbnQoIGtleSApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoIHZhbHVlICk7XG4gICAgfTtcblxuICAvLyBTZXQgdHJhZGl0aW9uYWwgdG8gdHJ1ZSBmb3IgalF1ZXJ5IDw9IDEuMy4yIGJlaGF2aW9yLlxuICBpZiAoIHRyYWRpdGlvbmFsID09PSB1bmRlZmluZWQgKSB7XG4gICAgdHJhZGl0aW9uYWwgPSBqUXVlcnkuYWpheFNldHRpbmdzICYmIGpRdWVyeS5hamF4U2V0dGluZ3MudHJhZGl0aW9uYWw7XG4gIH1cblxuICAvLyBJZiBhbiBhcnJheSB3YXMgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCBpdCBpcyBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzLlxuICBpZiAoIGpRdWVyeS5pc0FycmF5KCBhICkgfHwgKCBhLmpxdWVyeSAmJiAhalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGEgKSApICkge1xuICAgIC8vIFNlcmlhbGl6ZSB0aGUgZm9ybSBlbGVtZW50c1xuICAgIGpRdWVyeS5lYWNoKCBhLCBmdW5jdGlvbigpIHtcbiAgICAgIGFkZCggdGhpcy5uYW1lLCB0aGlzLnZhbHVlICk7XG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcbiAgICAvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuICAgIC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxuICAgIGZvciAoIHByZWZpeCBpbiBhICkge1xuICAgICAgYnVpbGRQYXJhbXMoIHByZWZpeCwgYVsgcHJlZml4IF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBzZXJpYWxpemF0aW9uXG4gIHJldHVybiBzLmpvaW4oIFwiJlwiICkucmVwbGFjZSggcjIwLCBcIitcIiApO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHNlcmlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5wYXJhbSggdGhpcy5zZXJpYWxpemVBcnJheSgpICk7XG4gIH0sXG4gIHNlcmlhbGl6ZUFycmF5OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBDYW4gYWRkIHByb3BIb29rIGZvciBcImVsZW1lbnRzXCIgdG8gZmlsdGVyIG9yIGFkZCBmb3JtIGVsZW1lbnRzXG4gICAgICB2YXIgZWxlbWVudHMgPSBqUXVlcnkucHJvcCggdGhpcywgXCJlbGVtZW50c1wiICk7XG4gICAgICByZXR1cm4gZWxlbWVudHMgPyBqUXVlcnkubWFrZUFycmF5KCBlbGVtZW50cyApIDogdGhpcztcbiAgICB9KVxuICAgIC5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdHlwZSA9IHRoaXMudHlwZTtcbiAgICAgIC8vIFVzZSAuaXMoXCI6ZGlzYWJsZWRcIikgc28gdGhhdCBmaWVsZHNldFtkaXNhYmxlZF0gd29ya3NcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgJiYgIWpRdWVyeSggdGhpcyApLmlzKCBcIjpkaXNhYmxlZFwiICkgJiZcbiAgICAgICAgcnN1Ym1pdHRhYmxlLnRlc3QoIHRoaXMubm9kZU5hbWUgKSAmJiAhcnN1Ym1pdHRlclR5cGVzLnRlc3QoIHR5cGUgKSAmJlxuICAgICAgICAoIHRoaXMuY2hlY2tlZCB8fCAhcmNoZWNrYWJsZVR5cGUudGVzdCggdHlwZSApICk7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uKCBpLCBlbGVtICkge1xuICAgICAgdmFyIHZhbCA9IGpRdWVyeSggdGhpcyApLnZhbCgpO1xuXG4gICAgICByZXR1cm4gdmFsID09IG51bGwgP1xuICAgICAgICBudWxsIDpcbiAgICAgICAgalF1ZXJ5LmlzQXJyYXkoIHZhbCApID9cbiAgICAgICAgICBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWwgKSB7XG4gICAgICAgICAgICByZXR1cm4geyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuICAgICAgICAgIH0pIDpcbiAgICAgICAgICB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG4gICAgfSkuZ2V0KCk7XG4gIH1cbn0pO1xuXG5cbi8vIENyZWF0ZSB0aGUgcmVxdWVzdCBvYmplY3Rcbi8vIChUaGlzIGlzIHN0aWxsIGF0dGFjaGVkIHRvIGFqYXhTZXR0aW5ncyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSlcbmpRdWVyeS5hamF4U2V0dGluZ3MueGhyID0gd2luZG93LkFjdGl2ZVhPYmplY3QgIT09IHVuZGVmaW5lZCA/XG4gIC8vIFN1cHBvcnQ6IElFNitcbiAgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBYSFIgY2Fubm90IGFjY2VzcyBsb2NhbCBmaWxlcywgYWx3YXlzIHVzZSBBY3RpdmVYIGZvciB0aGF0IGNhc2VcbiAgICByZXR1cm4gIXRoaXMuaXNMb2NhbCAmJlxuXG4gICAgICAvLyBTdXBwb3J0OiBJRTctOFxuICAgICAgLy8gb2xkSUUgWEhSIGRvZXMgbm90IHN1cHBvcnQgbm9uLVJGQzI2MTYgbWV0aG9kcyAoIzEzMjQwKVxuICAgICAgLy8gU2VlIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9tczUzNjY0OCh2PXZzLjg1KS5hc3B4XG4gICAgICAvLyBhbmQgaHR0cDovL3d3dy53My5vcmcvUHJvdG9jb2xzL3JmYzI2MTYvcmZjMjYxNi1zZWM5Lmh0bWwjc2VjOVxuICAgICAgLy8gQWx0aG91Z2ggdGhpcyBjaGVjayBmb3Igc2l4IG1ldGhvZHMgaW5zdGVhZCBvZiBlaWdodFxuICAgICAgLy8gc2luY2UgSUUgYWxzbyBkb2VzIG5vdCBzdXBwb3J0IFwidHJhY2VcIiBhbmQgXCJjb25uZWN0XCJcbiAgICAgIC9eKGdldHxwb3N0fGhlYWR8cHV0fGRlbGV0ZXxvcHRpb25zKSQvaS50ZXN0KCB0aGlzLnR5cGUgKSAmJlxuXG4gICAgICBjcmVhdGVTdGFuZGFyZFhIUigpIHx8IGNyZWF0ZUFjdGl2ZVhIUigpO1xuICB9IDpcbiAgLy8gRm9yIGFsbCBvdGhlciBicm93c2VycywgdXNlIHRoZSBzdGFuZGFyZCBYTUxIdHRwUmVxdWVzdCBvYmplY3RcbiAgY3JlYXRlU3RhbmRhcmRYSFI7XG5cbnZhciB4aHJJZCA9IDAsXG4gIHhockNhbGxiYWNrcyA9IHt9LFxuICB4aHJTdXBwb3J0ZWQgPSBqUXVlcnkuYWpheFNldHRpbmdzLnhocigpO1xuXG4vLyBTdXBwb3J0OiBJRTwxMFxuLy8gT3BlbiByZXF1ZXN0cyBtdXN0IGJlIG1hbnVhbGx5IGFib3J0ZWQgb24gdW5sb2FkICgjNTI4MClcbi8vIFNlZSBodHRwczovL3N1cHBvcnQubWljcm9zb2Z0LmNvbS9rYi8yODU2NzQ2IGZvciBtb3JlIGluZm9cbmlmICggd2luZG93LmF0dGFjaEV2ZW50ICkge1xuICB3aW5kb3cuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgZm9yICggdmFyIGtleSBpbiB4aHJDYWxsYmFja3MgKSB7XG4gICAgICB4aHJDYWxsYmFja3NbIGtleSBdKCB1bmRlZmluZWQsIHRydWUgKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEZXRlcm1pbmUgc3VwcG9ydCBwcm9wZXJ0aWVzXG5zdXBwb3J0LmNvcnMgPSAhIXhoclN1cHBvcnRlZCAmJiAoIFwid2l0aENyZWRlbnRpYWxzXCIgaW4geGhyU3VwcG9ydGVkICk7XG54aHJTdXBwb3J0ZWQgPSBzdXBwb3J0LmFqYXggPSAhIXhoclN1cHBvcnRlZDtcblxuLy8gQ3JlYXRlIHRyYW5zcG9ydCBpZiB0aGUgYnJvd3NlciBjYW4gcHJvdmlkZSBhbiB4aHJcbmlmICggeGhyU3VwcG9ydGVkICkge1xuXG4gIGpRdWVyeS5hamF4VHJhbnNwb3J0KGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgIC8vIENyb3NzIGRvbWFpbiBvbmx5IGFsbG93ZWQgaWYgc3VwcG9ydGVkIHRocm91Z2ggWE1MSHR0cFJlcXVlc3RcbiAgICBpZiAoICFvcHRpb25zLmNyb3NzRG9tYWluIHx8IHN1cHBvcnQuY29ycyApIHtcblxuICAgICAgdmFyIGNhbGxiYWNrO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZW5kOiBmdW5jdGlvbiggaGVhZGVycywgY29tcGxldGUgKSB7XG4gICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICB4aHIgPSBvcHRpb25zLnhocigpLFxuICAgICAgICAgICAgaWQgPSArK3hocklkO1xuXG4gICAgICAgICAgLy8gT3BlbiB0aGUgc29ja2V0XG4gICAgICAgICAgeGhyLm9wZW4oIG9wdGlvbnMudHlwZSwgb3B0aW9ucy51cmwsIG9wdGlvbnMuYXN5bmMsIG9wdGlvbnMudXNlcm5hbWUsIG9wdGlvbnMucGFzc3dvcmQgKTtcblxuICAgICAgICAgIC8vIEFwcGx5IGN1c3RvbSBmaWVsZHMgaWYgcHJvdmlkZWRcbiAgICAgICAgICBpZiAoIG9wdGlvbnMueGhyRmllbGRzICkge1xuICAgICAgICAgICAgZm9yICggaSBpbiBvcHRpb25zLnhockZpZWxkcyApIHtcbiAgICAgICAgICAgICAgeGhyWyBpIF0gPSBvcHRpb25zLnhockZpZWxkc1sgaSBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE92ZXJyaWRlIG1pbWUgdHlwZSBpZiBuZWVkZWRcbiAgICAgICAgICBpZiAoIG9wdGlvbnMubWltZVR5cGUgJiYgeGhyLm92ZXJyaWRlTWltZVR5cGUgKSB7XG4gICAgICAgICAgICB4aHIub3ZlcnJpZGVNaW1lVHlwZSggb3B0aW9ucy5taW1lVHlwZSApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFgtUmVxdWVzdGVkLVdpdGggaGVhZGVyXG4gICAgICAgICAgLy8gRm9yIGNyb3NzLWRvbWFpbiByZXF1ZXN0cywgc2VlaW5nIGFzIGNvbmRpdGlvbnMgZm9yIGEgcHJlZmxpZ2h0IGFyZVxuICAgICAgICAgIC8vIGFraW4gdG8gYSBqaWdzYXcgcHV6emxlLCB3ZSBzaW1wbHkgbmV2ZXIgc2V0IGl0IHRvIGJlIHN1cmUuXG4gICAgICAgICAgLy8gKGl0IGNhbiBhbHdheXMgYmUgc2V0IG9uIGEgcGVyLXJlcXVlc3QgYmFzaXMgb3IgZXZlbiB1c2luZyBhamF4U2V0dXApXG4gICAgICAgICAgLy8gRm9yIHNhbWUtZG9tYWluIHJlcXVlc3RzLCB3b24ndCBjaGFuZ2UgaGVhZGVyIGlmIGFscmVhZHkgcHJvdmlkZWQuXG4gICAgICAgICAgaWYgKCAhb3B0aW9ucy5jcm9zc0RvbWFpbiAmJiAhaGVhZGVyc1tcIlgtUmVxdWVzdGVkLVdpdGhcIl0gKSB7XG4gICAgICAgICAgICBoZWFkZXJzW1wiWC1SZXF1ZXN0ZWQtV2l0aFwiXSA9IFwiWE1MSHR0cFJlcXVlc3RcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTZXQgaGVhZGVyc1xuICAgICAgICAgIGZvciAoIGkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAgICAgICAgIC8vIElFJ3MgQWN0aXZlWE9iamVjdCB0aHJvd3MgYSAnVHlwZSBNaXNtYXRjaCcgZXhjZXB0aW9uIHdoZW4gc2V0dGluZ1xuICAgICAgICAgICAgLy8gcmVxdWVzdCBoZWFkZXIgdG8gYSBudWxsLXZhbHVlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFRvIGtlZXAgY29uc2lzdGVudCB3aXRoIG90aGVyIFhIUiBpbXBsZW1lbnRhdGlvbnMsIGNhc3QgdGhlIHZhbHVlXG4gICAgICAgICAgICAvLyB0byBzdHJpbmcgYW5kIGlnbm9yZSBgdW5kZWZpbmVkYC5cbiAgICAgICAgICAgIGlmICggaGVhZGVyc1sgaSBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBoZWFkZXJzWyBpIF0gKyBcIlwiICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRG8gc2VuZCB0aGUgcmVxdWVzdFxuICAgICAgICAgIC8vIFRoaXMgbWF5IHJhaXNlIGFuIGV4Y2VwdGlvbiB3aGljaCBpcyBhY3R1YWxseVxuICAgICAgICAgIC8vIGhhbmRsZWQgaW4galF1ZXJ5LmFqYXggKHNvIG5vIHRyeS9jYXRjaCBoZXJlKVxuICAgICAgICAgIHhoci5zZW5kKCAoIG9wdGlvbnMuaGFzQ29udGVudCAmJiBvcHRpb25zLmRhdGEgKSB8fCBudWxsICk7XG5cbiAgICAgICAgICAvLyBMaXN0ZW5lclxuICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24oIF8sIGlzQWJvcnQgKSB7XG4gICAgICAgICAgICB2YXIgc3RhdHVzLCBzdGF0dXNUZXh0LCByZXNwb25zZXM7XG5cbiAgICAgICAgICAgIC8vIFdhcyBuZXZlciBjYWxsZWQgYW5kIGlzIGFib3J0ZWQgb3IgY29tcGxldGVcbiAgICAgICAgICAgIGlmICggY2FsbGJhY2sgJiYgKCBpc0Fib3J0IHx8IHhoci5yZWFkeVN0YXRlID09PSA0ICkgKSB7XG4gICAgICAgICAgICAgIC8vIENsZWFuIHVwXG4gICAgICAgICAgICAgIGRlbGV0ZSB4aHJDYWxsYmFja3NbIGlkIF07XG4gICAgICAgICAgICAgIGNhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0galF1ZXJ5Lm5vb3A7XG5cbiAgICAgICAgICAgICAgLy8gQWJvcnQgbWFudWFsbHkgaWYgbmVlZGVkXG4gICAgICAgICAgICAgIGlmICggaXNBYm9ydCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIHhoci5yZWFkeVN0YXRlICE9PSA0ICkge1xuICAgICAgICAgICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlcyA9IHt9O1xuICAgICAgICAgICAgICAgIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTwxMFxuICAgICAgICAgICAgICAgIC8vIEFjY2Vzc2luZyBiaW5hcnktZGF0YSByZXNwb25zZVRleHQgdGhyb3dzIGFuIGV4Y2VwdGlvblxuICAgICAgICAgICAgICAgIC8vICgjMTE0MjYpXG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgeGhyLnJlc3BvbnNlVGV4dCA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy50ZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IHRocm93cyBhbiBleGNlcHRpb24gd2hlbiBhY2Nlc3NpbmdcbiAgICAgICAgICAgICAgICAvLyBzdGF0dXNUZXh0IGZvciBmYXVsdHkgY3Jvc3MtZG9tYWluIHJlcXVlc3RzXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSB4aHIuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKCBlICkge1xuICAgICAgICAgICAgICAgICAgLy8gV2Ugbm9ybWFsaXplIHdpdGggV2Via2l0IGdpdmluZyBhbiBlbXB0eSBzdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgc3RhdHVzIGZvciBub24gc3RhbmRhcmQgYmVoYXZpb3JzXG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmVxdWVzdCBpcyBsb2NhbCBhbmQgd2UgaGF2ZSBkYXRhOiBhc3N1bWUgYSBzdWNjZXNzXG4gICAgICAgICAgICAgICAgLy8gKHN1Y2Nlc3Mgd2l0aCBubyBkYXRhIHdvbid0IGdldCBub3RpZmllZCwgdGhhdCdzIHRoZSBiZXN0IHdlXG4gICAgICAgICAgICAgICAgLy8gY2FuIGRvIGdpdmVuIGN1cnJlbnQgaW1wbGVtZW50YXRpb25zKVxuICAgICAgICAgICAgICAgIGlmICggIXN0YXR1cyAmJiBvcHRpb25zLmlzTG9jYWwgJiYgIW9wdGlvbnMuY3Jvc3NEb21haW4gKSB7XG4gICAgICAgICAgICAgICAgICBzdGF0dXMgPSByZXNwb25zZXMudGV4dCA/IDIwMCA6IDQwNDtcbiAgICAgICAgICAgICAgICAvLyBJRSAtICMxNDUwOiBzb21ldGltZXMgcmV0dXJucyAxMjIzIHdoZW4gaXQgc2hvdWxkIGJlIDIwNFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHN0YXR1cyA9PT0gMTIyMyApIHtcbiAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDIwNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2FsbCBjb21wbGV0ZSBpZiBuZWVkZWRcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2VzICkge1xuICAgICAgICAgICAgICBjb21wbGV0ZSggc3RhdHVzLCBzdGF0dXNUZXh0LCByZXNwb25zZXMsIHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoICFvcHRpb25zLmFzeW5jICkge1xuICAgICAgICAgICAgLy8gaWYgd2UncmUgaW4gc3luYyBtb2RlIHdlIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIHhoci5yZWFkeVN0YXRlID09PSA0ICkge1xuICAgICAgICAgICAgLy8gKElFNiAmIElFNykgaWYgaXQncyBpbiBjYWNoZSBhbmQgaGFzIGJlZW5cbiAgICAgICAgICAgIC8vIHJldHJpZXZlZCBkaXJlY3RseSB3ZSBuZWVkIHRvIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCBjYWxsYmFjayApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBBZGQgdG8gdGhlIGxpc3Qgb2YgYWN0aXZlIHhociBjYWxsYmFja3NcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB4aHJDYWxsYmFja3NbIGlkIF0gPSBjYWxsYmFjaztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICggY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICBjYWxsYmFjayggdW5kZWZpbmVkLCB0cnVlICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIEZ1bmN0aW9ucyB0byBjcmVhdGUgeGhyc1xuZnVuY3Rpb24gY3JlYXRlU3RhbmRhcmRYSFIoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcbiAgfSBjYXRjaCggZSApIHt9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFjdGl2ZVhIUigpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCBcIk1pY3Jvc29mdC5YTUxIVFRQXCIgKTtcbiAgfSBjYXRjaCggZSApIHt9XG59XG5cblxuXG5cbi8vIEluc3RhbGwgc2NyaXB0IGRhdGFUeXBlXG5qUXVlcnkuYWpheFNldHVwKHtcbiAgYWNjZXB0czoge1xuICAgIHNjcmlwdDogXCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2VjbWFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtZWNtYXNjcmlwdFwiXG4gIH0sXG4gIGNvbnRlbnRzOiB7XG4gICAgc2NyaXB0OiAvKD86amF2YXxlY21hKXNjcmlwdC9cbiAgfSxcbiAgY29udmVydGVyczoge1xuICAgIFwidGV4dCBzY3JpcHRcIjogZnVuY3Rpb24oIHRleHQgKSB7XG4gICAgICBqUXVlcnkuZ2xvYmFsRXZhbCggdGV4dCApO1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICB9XG59KTtcblxuLy8gSGFuZGxlIGNhY2hlJ3Mgc3BlY2lhbCBjYXNlIGFuZCBnbG9iYWxcbmpRdWVyeS5hamF4UHJlZmlsdGVyKCBcInNjcmlwdFwiLCBmdW5jdGlvbiggcyApIHtcbiAgaWYgKCBzLmNhY2hlID09PSB1bmRlZmluZWQgKSB7XG4gICAgcy5jYWNoZSA9IGZhbHNlO1xuICB9XG4gIGlmICggcy5jcm9zc0RvbWFpbiApIHtcbiAgICBzLnR5cGUgPSBcIkdFVFwiO1xuICAgIHMuZ2xvYmFsID0gZmFsc2U7XG4gIH1cbn0pO1xuXG4vLyBCaW5kIHNjcmlwdCB0YWcgaGFjayB0cmFuc3BvcnRcbmpRdWVyeS5hamF4VHJhbnNwb3J0KCBcInNjcmlwdFwiLCBmdW5jdGlvbihzKSB7XG5cbiAgLy8gVGhpcyB0cmFuc3BvcnQgb25seSBkZWFscyB3aXRoIGNyb3NzIGRvbWFpbiByZXF1ZXN0c1xuICBpZiAoIHMuY3Jvc3NEb21haW4gKSB7XG5cbiAgICB2YXIgc2NyaXB0LFxuICAgICAgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgalF1ZXJ5KFwiaGVhZFwiKVswXSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICBzZW5kOiBmdW5jdGlvbiggXywgY2FsbGJhY2sgKSB7XG5cbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcblxuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuXG4gICAgICAgIGlmICggcy5zY3JpcHRDaGFyc2V0ICkge1xuICAgICAgICAgIHNjcmlwdC5jaGFyc2V0ID0gcy5zY3JpcHRDaGFyc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2NyaXB0LnNyYyA9IHMudXJsO1xuXG4gICAgICAgIC8vIEF0dGFjaCBoYW5kbGVycyBmb3IgYWxsIGJyb3dzZXJzXG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oIF8sIGlzQWJvcnQgKSB7XG5cbiAgICAgICAgICBpZiAoIGlzQWJvcnQgfHwgIXNjcmlwdC5yZWFkeVN0YXRlIHx8IC9sb2FkZWR8Y29tcGxldGUvLnRlc3QoIHNjcmlwdC5yZWFkeVN0YXRlICkgKSB7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBtZW1vcnkgbGVhayBpbiBJRVxuICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHNjcmlwdFxuICAgICAgICAgICAgaWYgKCBzY3JpcHQucGFyZW50Tm9kZSApIHtcbiAgICAgICAgICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHNjcmlwdCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEZXJlZmVyZW5jZSB0aGUgc2NyaXB0XG4gICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBpZiBub3QgYWJvcnRcbiAgICAgICAgICAgIGlmICggIWlzQWJvcnQgKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCAyMDAsIFwic3VjY2Vzc1wiICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIENpcmN1bXZlbnQgSUU2IGJ1Z3Mgd2l0aCBiYXNlIGVsZW1lbnRzICgjMjcwOSBhbmQgIzQzNzgpIGJ5IHByZXBlbmRpbmdcbiAgICAgICAgLy8gVXNlIG5hdGl2ZSBET00gbWFuaXB1bGF0aW9uIHRvIGF2b2lkIG91ciBkb21NYW5pcCBBSkFYIHRyaWNrZXJ5XG4gICAgICAgIGhlYWQuaW5zZXJ0QmVmb3JlKCBzY3JpcHQsIGhlYWQuZmlyc3RDaGlsZCApO1xuICAgICAgfSxcblxuICAgICAgYWJvcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIHNjcmlwdCApIHtcbiAgICAgICAgICBzY3JpcHQub25sb2FkKCB1bmRlZmluZWQsIHRydWUgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbn0pO1xuXG5cblxuXG52YXIgb2xkQ2FsbGJhY2tzID0gW10sXG4gIHJqc29ucCA9IC8oPSlcXD8oPz0mfCQpfFxcP1xcPy87XG5cbi8vIERlZmF1bHQganNvbnAgc2V0dGluZ3NcbmpRdWVyeS5hamF4U2V0dXAoe1xuICBqc29ucDogXCJjYWxsYmFja1wiLFxuICBqc29ucENhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBvbGRDYWxsYmFja3MucG9wKCkgfHwgKCBqUXVlcnkuZXhwYW5kbyArIFwiX1wiICsgKCBub25jZSsrICkgKTtcbiAgICB0aGlzWyBjYWxsYmFjayBdID0gdHJ1ZTtcbiAgICByZXR1cm4gY2FsbGJhY2s7XG4gIH1cbn0pO1xuXG4vLyBEZXRlY3QsIG5vcm1hbGl6ZSBvcHRpb25zIGFuZCBpbnN0YWxsIGNhbGxiYWNrcyBmb3IganNvbnAgcmVxdWVzdHNcbmpRdWVyeS5hamF4UHJlZmlsdGVyKCBcImpzb24ganNvbnBcIiwgZnVuY3Rpb24oIHMsIG9yaWdpbmFsU2V0dGluZ3MsIGpxWEhSICkge1xuXG4gIHZhciBjYWxsYmFja05hbWUsIG92ZXJ3cml0dGVuLCByZXNwb25zZUNvbnRhaW5lcixcbiAgICBqc29uUHJvcCA9IHMuanNvbnAgIT09IGZhbHNlICYmICggcmpzb25wLnRlc3QoIHMudXJsICkgP1xuICAgICAgXCJ1cmxcIiA6XG4gICAgICB0eXBlb2Ygcy5kYXRhID09PSBcInN0cmluZ1wiICYmICEoIHMuY29udGVudFR5cGUgfHwgXCJcIiApLmluZGV4T2YoXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIikgJiYgcmpzb25wLnRlc3QoIHMuZGF0YSApICYmIFwiZGF0YVwiXG4gICAgKTtcblxuICAvLyBIYW5kbGUgaWZmIHRoZSBleHBlY3RlZCBkYXRhIHR5cGUgaXMgXCJqc29ucFwiIG9yIHdlIGhhdmUgYSBwYXJhbWV0ZXIgdG8gc2V0XG4gIGlmICgganNvblByb3AgfHwgcy5kYXRhVHlwZXNbIDAgXSA9PT0gXCJqc29ucFwiICkge1xuXG4gICAgLy8gR2V0IGNhbGxiYWNrIG5hbWUsIHJlbWVtYmVyaW5nIHByZWV4aXN0aW5nIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBpdFxuICAgIGNhbGxiYWNrTmFtZSA9IHMuanNvbnBDYWxsYmFjayA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBzLmpzb25wQ2FsbGJhY2sgKSA/XG4gICAgICBzLmpzb25wQ2FsbGJhY2soKSA6XG4gICAgICBzLmpzb25wQ2FsbGJhY2s7XG5cbiAgICAvLyBJbnNlcnQgY2FsbGJhY2sgaW50byB1cmwgb3IgZm9ybSBkYXRhXG4gICAgaWYgKCBqc29uUHJvcCApIHtcbiAgICAgIHNbIGpzb25Qcm9wIF0gPSBzWyBqc29uUHJvcCBdLnJlcGxhY2UoIHJqc29ucCwgXCIkMVwiICsgY2FsbGJhY2tOYW1lICk7XG4gICAgfSBlbHNlIGlmICggcy5qc29ucCAhPT0gZmFsc2UgKSB7XG4gICAgICBzLnVybCArPSAoIHJxdWVyeS50ZXN0KCBzLnVybCApID8gXCImXCIgOiBcIj9cIiApICsgcy5qc29ucCArIFwiPVwiICsgY2FsbGJhY2tOYW1lO1xuICAgIH1cblxuICAgIC8vIFVzZSBkYXRhIGNvbnZlcnRlciB0byByZXRyaWV2ZSBqc29uIGFmdGVyIHNjcmlwdCBleGVjdXRpb25cbiAgICBzLmNvbnZlcnRlcnNbXCJzY3JpcHQganNvblwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCAhcmVzcG9uc2VDb250YWluZXIgKSB7XG4gICAgICAgIGpRdWVyeS5lcnJvciggY2FsbGJhY2tOYW1lICsgXCIgd2FzIG5vdCBjYWxsZWRcIiApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlQ29udGFpbmVyWyAwIF07XG4gICAgfTtcblxuICAgIC8vIGZvcmNlIGpzb24gZGF0YVR5cGVcbiAgICBzLmRhdGFUeXBlc1sgMCBdID0gXCJqc29uXCI7XG5cbiAgICAvLyBJbnN0YWxsIGNhbGxiYWNrXG4gICAgb3ZlcndyaXR0ZW4gPSB3aW5kb3dbIGNhbGxiYWNrTmFtZSBdO1xuICAgIHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlc3BvbnNlQ29udGFpbmVyID0gYXJndW1lbnRzO1xuICAgIH07XG5cbiAgICAvLyBDbGVhbi11cCBmdW5jdGlvbiAoZmlyZXMgYWZ0ZXIgY29udmVydGVycylcbiAgICBqcVhIUi5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBSZXN0b3JlIHByZWV4aXN0aW5nIHZhbHVlXG4gICAgICB3aW5kb3dbIGNhbGxiYWNrTmFtZSBdID0gb3ZlcndyaXR0ZW47XG5cbiAgICAgIC8vIFNhdmUgYmFjayBhcyBmcmVlXG4gICAgICBpZiAoIHNbIGNhbGxiYWNrTmFtZSBdICkge1xuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCByZS11c2luZyB0aGUgb3B0aW9ucyBkb2Vzbid0IHNjcmV3IHRoaW5ncyBhcm91bmRcbiAgICAgICAgcy5qc29ucENhbGxiYWNrID0gb3JpZ2luYWxTZXR0aW5ncy5qc29ucENhbGxiYWNrO1xuXG4gICAgICAgIC8vIHNhdmUgdGhlIGNhbGxiYWNrIG5hbWUgZm9yIGZ1dHVyZSB1c2VcbiAgICAgICAgb2xkQ2FsbGJhY2tzLnB1c2goIGNhbGxiYWNrTmFtZSApO1xuICAgICAgfVxuXG4gICAgICAvLyBDYWxsIGlmIGl0IHdhcyBhIGZ1bmN0aW9uIGFuZCB3ZSBoYXZlIGEgcmVzcG9uc2VcbiAgICAgIGlmICggcmVzcG9uc2VDb250YWluZXIgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIG92ZXJ3cml0dGVuICkgKSB7XG4gICAgICAgIG92ZXJ3cml0dGVuKCByZXNwb25zZUNvbnRhaW5lclsgMCBdICk7XG4gICAgICB9XG5cbiAgICAgIHJlc3BvbnNlQ29udGFpbmVyID0gb3ZlcndyaXR0ZW4gPSB1bmRlZmluZWQ7XG4gICAgfSk7XG5cbiAgICAvLyBEZWxlZ2F0ZSB0byBzY3JpcHRcbiAgICByZXR1cm4gXCJzY3JpcHRcIjtcbiAgfVxufSk7XG5cblxuXG5cbi8vIGRhdGE6IHN0cmluZyBvZiBodG1sXG4vLyBjb250ZXh0IChvcHRpb25hbCk6IElmIHNwZWNpZmllZCwgdGhlIGZyYWdtZW50IHdpbGwgYmUgY3JlYXRlZCBpbiB0aGlzIGNvbnRleHQsIGRlZmF1bHRzIHRvIGRvY3VtZW50XG4vLyBrZWVwU2NyaXB0cyAob3B0aW9uYWwpOiBJZiB0cnVlLCB3aWxsIGluY2x1ZGUgc2NyaXB0cyBwYXNzZWQgaW4gdGhlIGh0bWwgc3RyaW5nXG5qUXVlcnkucGFyc2VIVE1MID0gZnVuY3Rpb24oIGRhdGEsIGNvbnRleHQsIGtlZXBTY3JpcHRzICkge1xuICBpZiAoICFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwiYm9vbGVhblwiICkge1xuICAgIGtlZXBTY3JpcHRzID0gY29udGV4dDtcbiAgICBjb250ZXh0ID0gZmFsc2U7XG4gIH1cbiAgY29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cbiAgdmFyIHBhcnNlZCA9IHJzaW5nbGVUYWcuZXhlYyggZGF0YSApLFxuICAgIHNjcmlwdHMgPSAha2VlcFNjcmlwdHMgJiYgW107XG5cbiAgLy8gU2luZ2xlIHRhZ1xuICBpZiAoIHBhcnNlZCApIHtcbiAgICByZXR1cm4gWyBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIHBhcnNlZFsxXSApIF07XG4gIH1cblxuICBwYXJzZWQgPSBqUXVlcnkuYnVpbGRGcmFnbWVudCggWyBkYXRhIF0sIGNvbnRleHQsIHNjcmlwdHMgKTtcblxuICBpZiAoIHNjcmlwdHMgJiYgc2NyaXB0cy5sZW5ndGggKSB7XG4gICAgalF1ZXJ5KCBzY3JpcHRzICkucmVtb3ZlKCk7XG4gIH1cblxuICByZXR1cm4galF1ZXJ5Lm1lcmdlKCBbXSwgcGFyc2VkLmNoaWxkTm9kZXMgKTtcbn07XG5cblxuLy8gS2VlcCBhIGNvcHkgb2YgdGhlIG9sZCBsb2FkIG1ldGhvZFxudmFyIF9sb2FkID0galF1ZXJ5LmZuLmxvYWQ7XG5cbi8qKlxuICogTG9hZCBhIHVybCBpbnRvIGEgcGFnZVxuICovXG5qUXVlcnkuZm4ubG9hZCA9IGZ1bmN0aW9uKCB1cmwsIHBhcmFtcywgY2FsbGJhY2sgKSB7XG4gIGlmICggdHlwZW9mIHVybCAhPT0gXCJzdHJpbmdcIiAmJiBfbG9hZCApIHtcbiAgICByZXR1cm4gX2xvYWQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICB9XG5cbiAgdmFyIHNlbGVjdG9yLCByZXNwb25zZSwgdHlwZSxcbiAgICBzZWxmID0gdGhpcyxcbiAgICBvZmYgPSB1cmwuaW5kZXhPZihcIiBcIik7XG5cbiAgaWYgKCBvZmYgPj0gMCApIHtcbiAgICBzZWxlY3RvciA9IGpRdWVyeS50cmltKCB1cmwuc2xpY2UoIG9mZiwgdXJsLmxlbmd0aCApICk7XG4gICAgdXJsID0gdXJsLnNsaWNlKCAwLCBvZmYgKTtcbiAgfVxuXG4gIC8vIElmIGl0J3MgYSBmdW5jdGlvblxuICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBwYXJhbXMgKSApIHtcblxuICAgIC8vIFdlIGFzc3VtZSB0aGF0IGl0J3MgdGhlIGNhbGxiYWNrXG4gICAgY2FsbGJhY2sgPSBwYXJhbXM7XG4gICAgcGFyYW1zID0gdW5kZWZpbmVkO1xuXG4gIC8vIE90aGVyd2lzZSwgYnVpbGQgYSBwYXJhbSBzdHJpbmdcbiAgfSBlbHNlIGlmICggcGFyYW1zICYmIHR5cGVvZiBwYXJhbXMgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgdHlwZSA9IFwiUE9TVFwiO1xuICB9XG5cbiAgLy8gSWYgd2UgaGF2ZSBlbGVtZW50cyB0byBtb2RpZnksIG1ha2UgdGhlIHJlcXVlc3RcbiAgaWYgKCBzZWxmLmxlbmd0aCA+IDAgKSB7XG4gICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgdXJsOiB1cmwsXG5cbiAgICAgIC8vIGlmIFwidHlwZVwiIHZhcmlhYmxlIGlzIHVuZGVmaW5lZCwgdGhlbiBcIkdFVFwiIG1ldGhvZCB3aWxsIGJlIHVzZWRcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBkYXRhVHlwZTogXCJodG1sXCIsXG4gICAgICBkYXRhOiBwYXJhbXNcbiAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXNwb25zZVRleHQgKSB7XG5cbiAgICAgIC8vIFNhdmUgcmVzcG9uc2UgZm9yIHVzZSBpbiBjb21wbGV0ZSBjYWxsYmFja1xuICAgICAgcmVzcG9uc2UgPSBhcmd1bWVudHM7XG5cbiAgICAgIHNlbGYuaHRtbCggc2VsZWN0b3IgP1xuXG4gICAgICAgIC8vIElmIGEgc2VsZWN0b3Igd2FzIHNwZWNpZmllZCwgbG9jYXRlIHRoZSByaWdodCBlbGVtZW50cyBpbiBhIGR1bW15IGRpdlxuICAgICAgICAvLyBFeGNsdWRlIHNjcmlwdHMgdG8gYXZvaWQgSUUgJ1Blcm1pc3Npb24gRGVuaWVkJyBlcnJvcnNcbiAgICAgICAgalF1ZXJ5KFwiPGRpdj5cIikuYXBwZW5kKCBqUXVlcnkucGFyc2VIVE1MKCByZXNwb25zZVRleHQgKSApLmZpbmQoIHNlbGVjdG9yICkgOlxuXG4gICAgICAgIC8vIE90aGVyd2lzZSB1c2UgdGhlIGZ1bGwgcmVzdWx0XG4gICAgICAgIHJlc3BvbnNlVGV4dCApO1xuXG4gICAgfSkuY29tcGxldGUoIGNhbGxiYWNrICYmIGZ1bmN0aW9uKCBqcVhIUiwgc3RhdHVzICkge1xuICAgICAgc2VsZi5lYWNoKCBjYWxsYmFjaywgcmVzcG9uc2UgfHwgWyBqcVhIUi5yZXNwb25zZVRleHQsIHN0YXR1cywganFYSFIgXSApO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG4vLyBBdHRhY2ggYSBidW5jaCBvZiBmdW5jdGlvbnMgZm9yIGhhbmRsaW5nIGNvbW1vbiBBSkFYIGV2ZW50c1xualF1ZXJ5LmVhY2goIFsgXCJhamF4U3RhcnRcIiwgXCJhamF4U3RvcFwiLCBcImFqYXhDb21wbGV0ZVwiLCBcImFqYXhFcnJvclwiLCBcImFqYXhTdWNjZXNzXCIsIFwiYWpheFNlbmRcIiBdLCBmdW5jdGlvbiggaSwgdHlwZSApIHtcbiAgalF1ZXJ5LmZuWyB0eXBlIF0gPSBmdW5jdGlvbiggZm4gKSB7XG4gICAgcmV0dXJuIHRoaXMub24oIHR5cGUsIGZuICk7XG4gIH07XG59KTtcblxuXG5cblxualF1ZXJ5LmV4cHIuZmlsdGVycy5hbmltYXRlZCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICByZXR1cm4galF1ZXJ5LmdyZXAoalF1ZXJ5LnRpbWVycywgZnVuY3Rpb24oIGZuICkge1xuICAgIHJldHVybiBlbGVtID09PSBmbi5lbGVtO1xuICB9KS5sZW5ndGg7XG59O1xuXG5cblxuXG5cbnZhciBkb2NFbGVtID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuLyoqXG4gKiBHZXRzIGEgd2luZG93IGZyb20gYW4gZWxlbWVudFxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3coIGVsZW0gKSB7XG4gIHJldHVybiBqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSA/XG4gICAgZWxlbSA6XG4gICAgZWxlbS5ub2RlVHlwZSA9PT0gOSA/XG4gICAgICBlbGVtLmRlZmF1bHRWaWV3IHx8IGVsZW0ucGFyZW50V2luZG93IDpcbiAgICAgIGZhbHNlO1xufVxuXG5qUXVlcnkub2Zmc2V0ID0ge1xuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBpICkge1xuICAgIHZhciBjdXJQb3NpdGlvbiwgY3VyTGVmdCwgY3VyQ1NTVG9wLCBjdXJUb3AsIGN1ck9mZnNldCwgY3VyQ1NTTGVmdCwgY2FsY3VsYXRlUG9zaXRpb24sXG4gICAgICBwb3NpdGlvbiA9IGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApLFxuICAgICAgY3VyRWxlbSA9IGpRdWVyeSggZWxlbSApLFxuICAgICAgcHJvcHMgPSB7fTtcblxuICAgIC8vIHNldCBwb3NpdGlvbiBmaXJzdCwgaW4tY2FzZSB0b3AvbGVmdCBhcmUgc2V0IGV2ZW4gb24gc3RhdGljIGVsZW1cbiAgICBpZiAoIHBvc2l0aW9uID09PSBcInN0YXRpY1wiICkge1xuICAgICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICB9XG5cbiAgICBjdXJPZmZzZXQgPSBjdXJFbGVtLm9mZnNldCgpO1xuICAgIGN1ckNTU1RvcCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwidG9wXCIgKTtcbiAgICBjdXJDU1NMZWZ0ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJsZWZ0XCIgKTtcbiAgICBjYWxjdWxhdGVQb3NpdGlvbiA9ICggcG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIiB8fCBwb3NpdGlvbiA9PT0gXCJmaXhlZFwiICkgJiZcbiAgICAgIGpRdWVyeS5pbkFycmF5KFwiYXV0b1wiLCBbIGN1ckNTU1RvcCwgY3VyQ1NTTGVmdCBdICkgPiAtMTtcblxuICAgIC8vIG5lZWQgdG8gYmUgYWJsZSB0byBjYWxjdWxhdGUgcG9zaXRpb24gaWYgZWl0aGVyIHRvcCBvciBsZWZ0IGlzIGF1dG8gYW5kIHBvc2l0aW9uIGlzIGVpdGhlciBhYnNvbHV0ZSBvciBmaXhlZFxuICAgIGlmICggY2FsY3VsYXRlUG9zaXRpb24gKSB7XG4gICAgICBjdXJQb3NpdGlvbiA9IGN1ckVsZW0ucG9zaXRpb24oKTtcbiAgICAgIGN1clRvcCA9IGN1clBvc2l0aW9uLnRvcDtcbiAgICAgIGN1ckxlZnQgPSBjdXJQb3NpdGlvbi5sZWZ0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJUb3AgPSBwYXJzZUZsb2F0KCBjdXJDU1NUb3AgKSB8fCAwO1xuICAgICAgY3VyTGVmdCA9IHBhcnNlRmxvYXQoIGN1ckNTU0xlZnQgKSB8fCAwO1xuICAgIH1cblxuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIG9wdGlvbnMgKSApIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zLmNhbGwoIGVsZW0sIGksIGN1ck9mZnNldCApO1xuICAgIH1cblxuICAgIGlmICggb3B0aW9ucy50b3AgIT0gbnVsbCApIHtcbiAgICAgIHByb3BzLnRvcCA9ICggb3B0aW9ucy50b3AgLSBjdXJPZmZzZXQudG9wICkgKyBjdXJUb3A7XG4gICAgfVxuICAgIGlmICggb3B0aW9ucy5sZWZ0ICE9IG51bGwgKSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gKCBvcHRpb25zLmxlZnQgLSBjdXJPZmZzZXQubGVmdCApICsgY3VyTGVmdDtcbiAgICB9XG5cbiAgICBpZiAoIFwidXNpbmdcIiBpbiBvcHRpb25zICkge1xuICAgICAgb3B0aW9ucy51c2luZy5jYWxsKCBlbGVtLCBwcm9wcyApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJFbGVtLmNzcyggcHJvcHMgKTtcbiAgICB9XG4gIH1cbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBvZmZzZXQ6IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgIGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcbiAgICAgIHJldHVybiBvcHRpb25zID09PSB1bmRlZmluZWQgP1xuICAgICAgICB0aGlzIDpcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCBpICkge1xuICAgICAgICAgIGpRdWVyeS5vZmZzZXQuc2V0T2Zmc2V0KCB0aGlzLCBvcHRpb25zLCBpICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBkb2NFbGVtLCB3aW4sXG4gICAgICBib3ggPSB7IHRvcDogMCwgbGVmdDogMCB9LFxuICAgICAgZWxlbSA9IHRoaXNbIDAgXSxcbiAgICAgIGRvYyA9IGVsZW0gJiYgZWxlbS5vd25lckRvY3VtZW50O1xuXG4gICAgaWYgKCAhZG9jICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgLy8gTWFrZSBzdXJlIGl0J3Mgbm90IGEgZGlzY29ubmVjdGVkIERPTSBub2RlXG4gICAgaWYgKCAhalF1ZXJ5LmNvbnRhaW5zKCBkb2NFbGVtLCBlbGVtICkgKSB7XG4gICAgICByZXR1cm4gYm94O1xuICAgIH1cblxuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgZ0JDUiwganVzdCB1c2UgMCwwIHJhdGhlciB0aGFuIGVycm9yXG4gICAgLy8gQmxhY2tCZXJyeSA1LCBpT1MgMyAob3JpZ2luYWwgaVBob25lKVxuICAgIGlmICggdHlwZW9mIGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICE9PSBzdHJ1bmRlZmluZWQgKSB7XG4gICAgICBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cbiAgICB3aW4gPSBnZXRXaW5kb3coIGRvYyApO1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6IGJveC50b3AgICsgKCB3aW4ucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3AgKSAgLSAoIGRvY0VsZW0uY2xpZW50VG9wICB8fCAwICksXG4gICAgICBsZWZ0OiBib3gubGVmdCArICggd2luLnBhZ2VYT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsTGVmdCApIC0gKCBkb2NFbGVtLmNsaWVudExlZnQgfHwgMCApXG4gICAgfTtcbiAgfSxcblxuICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAhdGhpc1sgMCBdICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBvZmZzZXRQYXJlbnQsIG9mZnNldCxcbiAgICAgIHBhcmVudE9mZnNldCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH0sXG4gICAgICBlbGVtID0gdGhpc1sgMCBdO1xuXG4gICAgLy8gZml4ZWQgZWxlbWVudHMgYXJlIG9mZnNldCBmcm9tIHdpbmRvdyAocGFyZW50T2Zmc2V0ID0ge3RvcDowLCBsZWZ0OiAwfSwgYmVjYXVzZSBpdCBpcyBpdHMgb25seSBvZmZzZXQgcGFyZW50XG4gICAgaWYgKCBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSA9PT0gXCJmaXhlZFwiICkge1xuICAgICAgLy8gd2UgYXNzdW1lIHRoYXQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIGF2YWlsYWJsZSB3aGVuIGNvbXB1dGVkIHBvc2l0aW9uIGlzIGZpeGVkXG4gICAgICBvZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBHZXQgKnJlYWwqIG9mZnNldFBhcmVudFxuICAgICAgb2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQoKTtcblxuICAgICAgLy8gR2V0IGNvcnJlY3Qgb2Zmc2V0c1xuICAgICAgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcbiAgICAgIGlmICggIWpRdWVyeS5ub2RlTmFtZSggb2Zmc2V0UGFyZW50WyAwIF0sIFwiaHRtbFwiICkgKSB7XG4gICAgICAgIHBhcmVudE9mZnNldCA9IG9mZnNldFBhcmVudC5vZmZzZXQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIG9mZnNldFBhcmVudCBib3JkZXJzXG4gICAgICBwYXJlbnRPZmZzZXQudG9wICArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJUb3BXaWR0aFwiLCB0cnVlICk7XG4gICAgICBwYXJlbnRPZmZzZXQubGVmdCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJMZWZ0V2lkdGhcIiwgdHJ1ZSApO1xuICAgIH1cblxuICAgIC8vIFN1YnRyYWN0IHBhcmVudCBvZmZzZXRzIGFuZCBlbGVtZW50IG1hcmdpbnNcbiAgICAvLyBub3RlOiB3aGVuIGFuIGVsZW1lbnQgaGFzIG1hcmdpbjogYXV0byB0aGUgb2Zmc2V0TGVmdCBhbmQgbWFyZ2luTGVmdFxuICAgIC8vIGFyZSB0aGUgc2FtZSBpbiBTYWZhcmkgY2F1c2luZyBvZmZzZXQubGVmdCB0byBpbmNvcnJlY3RseSBiZSAwXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogIG9mZnNldC50b3AgIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luVG9wXCIsIHRydWUgKSxcbiAgICAgIGxlZnQ6IG9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiwgdHJ1ZSlcbiAgICB9O1xuICB9LFxuXG4gIG9mZnNldFBhcmVudDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50IHx8IGRvY0VsZW07XG5cbiAgICAgIHdoaWxlICggb2Zmc2V0UGFyZW50ICYmICggIWpRdWVyeS5ub2RlTmFtZSggb2Zmc2V0UGFyZW50LCBcImh0bWxcIiApICYmIGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJwb3NpdGlvblwiICkgPT09IFwic3RhdGljXCIgKSApIHtcbiAgICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jRWxlbTtcbiAgICB9KTtcbiAgfVxufSk7XG5cbi8vIENyZWF0ZSBzY3JvbGxMZWZ0IGFuZCBzY3JvbGxUb3AgbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgc2Nyb2xsTGVmdDogXCJwYWdlWE9mZnNldFwiLCBzY3JvbGxUb3A6IFwicGFnZVlPZmZzZXRcIiB9LCBmdW5jdGlvbiggbWV0aG9kLCBwcm9wICkge1xuICB2YXIgdG9wID0gL1kvLnRlc3QoIHByb3AgKTtcblxuICBqUXVlcnkuZm5bIG1ldGhvZCBdID0gZnVuY3Rpb24oIHZhbCApIHtcbiAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbWV0aG9kLCB2YWwgKSB7XG4gICAgICB2YXIgd2luID0gZ2V0V2luZG93KCBlbGVtICk7XG5cbiAgICAgIGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIHJldHVybiB3aW4gPyAocHJvcCBpbiB3aW4pID8gd2luWyBwcm9wIF0gOlxuICAgICAgICAgIHdpbi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIG1ldGhvZCBdIDpcbiAgICAgICAgICBlbGVtWyBtZXRob2QgXTtcbiAgICAgIH1cblxuICAgICAgaWYgKCB3aW4gKSB7XG4gICAgICAgIHdpbi5zY3JvbGxUbyhcbiAgICAgICAgICAhdG9wID8gdmFsIDogalF1ZXJ5KCB3aW4gKS5zY3JvbGxMZWZ0KCksXG4gICAgICAgICAgdG9wID8gdmFsIDogalF1ZXJ5KCB3aW4gKS5zY3JvbGxUb3AoKVxuICAgICAgICApO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtWyBtZXRob2QgXSA9IHZhbDtcbiAgICAgIH1cbiAgICB9LCBtZXRob2QsIHZhbCwgYXJndW1lbnRzLmxlbmd0aCwgbnVsbCApO1xuICB9O1xufSk7XG5cbi8vIEFkZCB0aGUgdG9wL2xlZnQgY3NzSG9va3MgdXNpbmcgalF1ZXJ5LmZuLnBvc2l0aW9uXG4vLyBXZWJraXQgYnVnOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjkwODRcbi8vIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBwZXJjZW50IHdoZW4gc3BlY2lmaWVkIGZvciB0b3AvbGVmdC9ib3R0b20vcmlnaHRcbi8vIHJhdGhlciB0aGFuIG1ha2UgdGhlIGNzcyBtb2R1bGUgZGVwZW5kIG9uIHRoZSBvZmZzZXQgbW9kdWxlLCB3ZSBqdXN0IGNoZWNrIGZvciBpdCBoZXJlXG5qUXVlcnkuZWFjaCggWyBcInRvcFwiLCBcImxlZnRcIiBdLCBmdW5jdGlvbiggaSwgcHJvcCApIHtcbiAgalF1ZXJ5LmNzc0hvb2tzWyBwcm9wIF0gPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucGl4ZWxQb3NpdGlvbixcbiAgICBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG4gICAgICBpZiAoIGNvbXB1dGVkICkge1xuICAgICAgICBjb21wdXRlZCA9IGN1ckNTUyggZWxlbSwgcHJvcCApO1xuICAgICAgICAvLyBpZiBjdXJDU1MgcmV0dXJucyBwZXJjZW50YWdlLCBmYWxsYmFjayB0byBvZmZzZXRcbiAgICAgICAgcmV0dXJuIHJudW1ub25weC50ZXN0KCBjb21wdXRlZCApID9cbiAgICAgICAgICBqUXVlcnkoIGVsZW0gKS5wb3NpdGlvbigpWyBwcm9wIF0gKyBcInB4XCIgOlxuICAgICAgICAgIGNvbXB1dGVkO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn0pO1xuXG5cbi8vIENyZWF0ZSBpbm5lckhlaWdodCwgaW5uZXJXaWR0aCwgaGVpZ2h0LCB3aWR0aCwgb3V0ZXJIZWlnaHQgYW5kIG91dGVyV2lkdGggbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgSGVpZ2h0OiBcImhlaWdodFwiLCBXaWR0aDogXCJ3aWR0aFwiIH0sIGZ1bmN0aW9uKCBuYW1lLCB0eXBlICkge1xuICBqUXVlcnkuZWFjaCggeyBwYWRkaW5nOiBcImlubmVyXCIgKyBuYW1lLCBjb250ZW50OiB0eXBlLCBcIlwiOiBcIm91dGVyXCIgKyBuYW1lIH0sIGZ1bmN0aW9uKCBkZWZhdWx0RXh0cmEsIGZ1bmNOYW1lICkge1xuICAgIC8vIG1hcmdpbiBpcyBvbmx5IGZvciBvdXRlckhlaWdodCwgb3V0ZXJXaWR0aFxuICAgIGpRdWVyeS5mblsgZnVuY05hbWUgXSA9IGZ1bmN0aW9uKCBtYXJnaW4sIHZhbHVlICkge1xuICAgICAgdmFyIGNoYWluYWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggJiYgKCBkZWZhdWx0RXh0cmEgfHwgdHlwZW9mIG1hcmdpbiAhPT0gXCJib29sZWFuXCIgKSxcbiAgICAgICAgZXh0cmEgPSBkZWZhdWx0RXh0cmEgfHwgKCBtYXJnaW4gPT09IHRydWUgfHwgdmFsdWUgPT09IHRydWUgPyBcIm1hcmdpblwiIDogXCJib3JkZXJcIiApO1xuXG4gICAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgdHlwZSwgdmFsdWUgKSB7XG4gICAgICAgIHZhciBkb2M7XG5cbiAgICAgICAgaWYgKCBqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcbiAgICAgICAgICAvLyBBcyBvZiA1LzgvMjAxMiB0aGlzIHdpbGwgeWllbGQgaW5jb3JyZWN0IHJlc3VsdHMgZm9yIE1vYmlsZSBTYWZhcmksIGJ1dCB0aGVyZVxuICAgICAgICAgIC8vIGlzbid0IGEgd2hvbGUgbG90IHdlIGNhbiBkby4gU2VlIHB1bGwgcmVxdWVzdCBhdCB0aGlzIFVSTCBmb3IgZGlzY3Vzc2lvbjpcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9wdWxsLzc2NFxuICAgICAgICAgIHJldHVybiBlbGVtLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFsgXCJjbGllbnRcIiArIG5hbWUgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBkb2N1bWVudCB3aWR0aCBvciBoZWlnaHRcbiAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSA5ICkge1xuICAgICAgICAgIGRvYyA9IGVsZW0uZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgICAgICAgLy8gRWl0aGVyIHNjcm9sbFtXaWR0aC9IZWlnaHRdIG9yIG9mZnNldFtXaWR0aC9IZWlnaHRdIG9yIGNsaWVudFtXaWR0aC9IZWlnaHRdLCB3aGljaGV2ZXIgaXMgZ3JlYXRlc3RcbiAgICAgICAgICAvLyB1bmZvcnR1bmF0ZWx5LCB0aGlzIGNhdXNlcyBidWcgIzM4MzggaW4gSUU2Lzggb25seSwgYnV0IHRoZXJlIGlzIGN1cnJlbnRseSBubyBnb29kLCBzbWFsbCB3YXkgdG8gZml4IGl0LlxuICAgICAgICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgICAgIGVsZW0uYm9keVsgXCJzY3JvbGxcIiArIG5hbWUgXSwgZG9jWyBcInNjcm9sbFwiICsgbmFtZSBdLFxuICAgICAgICAgICAgZWxlbS5ib2R5WyBcIm9mZnNldFwiICsgbmFtZSBdLCBkb2NbIFwib2Zmc2V0XCIgKyBuYW1lIF0sXG4gICAgICAgICAgICBkb2NbIFwiY2xpZW50XCIgKyBuYW1lIF1cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgIC8vIEdldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnQsIHJlcXVlc3RpbmcgYnV0IG5vdCBmb3JjaW5nIHBhcnNlRmxvYXRcbiAgICAgICAgICBqUXVlcnkuY3NzKCBlbGVtLCB0eXBlLCBleHRyYSApIDpcblxuICAgICAgICAgIC8vIFNldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnRcbiAgICAgICAgICBqUXVlcnkuc3R5bGUoIGVsZW0sIHR5cGUsIHZhbHVlLCBleHRyYSApO1xuICAgICAgfSwgdHlwZSwgY2hhaW5hYmxlID8gbWFyZ2luIDogdW5kZWZpbmVkLCBjaGFpbmFibGUsIG51bGwgKTtcbiAgICB9O1xuICB9KTtcbn0pO1xuXG5cbi8vIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgY29udGFpbmVkIGluIHRoZSBtYXRjaGVkIGVsZW1lbnQgc2V0XG5qUXVlcnkuZm4uc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5sZW5ndGg7XG59O1xuXG5qUXVlcnkuZm4uYW5kU2VsZiA9IGpRdWVyeS5mbi5hZGRCYWNrO1xuXG5cblxuXG4vLyBSZWdpc3RlciBhcyBhIG5hbWVkIEFNRCBtb2R1bGUsIHNpbmNlIGpRdWVyeSBjYW4gYmUgY29uY2F0ZW5hdGVkIHdpdGggb3RoZXJcbi8vIGZpbGVzIHRoYXQgbWF5IHVzZSBkZWZpbmUsIGJ1dCBub3QgdmlhIGEgcHJvcGVyIGNvbmNhdGVuYXRpb24gc2NyaXB0IHRoYXRcbi8vIHVuZGVyc3RhbmRzIGFub255bW91cyBBTUQgbW9kdWxlcy4gQSBuYW1lZCBBTUQgaXMgc2FmZXN0IGFuZCBtb3N0IHJvYnVzdFxuLy8gd2F5IHRvIHJlZ2lzdGVyLiBMb3dlcmNhc2UganF1ZXJ5IGlzIHVzZWQgYmVjYXVzZSBBTUQgbW9kdWxlIG5hbWVzIGFyZVxuLy8gZGVyaXZlZCBmcm9tIGZpbGUgbmFtZXMsIGFuZCBqUXVlcnkgaXMgbm9ybWFsbHkgZGVsaXZlcmVkIGluIGEgbG93ZXJjYXNlXG4vLyBmaWxlIG5hbWUuIERvIHRoaXMgYWZ0ZXIgY3JlYXRpbmcgdGhlIGdsb2JhbCBzbyB0aGF0IGlmIGFuIEFNRCBtb2R1bGUgd2FudHNcbi8vIHRvIGNhbGwgbm9Db25mbGljdCB0byBoaWRlIHRoaXMgdmVyc2lvbiBvZiBqUXVlcnksIGl0IHdpbGwgd29yay5cblxuLy8gTm90ZSB0aGF0IGZvciBtYXhpbXVtIHBvcnRhYmlsaXR5LCBsaWJyYXJpZXMgdGhhdCBhcmUgbm90IGpRdWVyeSBzaG91bGRcbi8vIGRlY2xhcmUgdGhlbXNlbHZlcyBhcyBhbm9ueW1vdXMgbW9kdWxlcywgYW5kIGF2b2lkIHNldHRpbmcgYSBnbG9iYWwgaWYgYW5cbi8vIEFNRCBsb2FkZXIgaXMgcHJlc2VudC4galF1ZXJ5IGlzIGEgc3BlY2lhbCBjYXNlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vanJidXJrZS9yZXF1aXJlanMvd2lraS9VcGRhdGluZy1leGlzdGluZy1saWJyYXJpZXMjd2lraS1hbm9uXG5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG4gIGRlZmluZSggXCJqcXVlcnlcIiwgW10sIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBqUXVlcnk7XG4gIH0pO1xufVxuXG5cblxuXG52YXJcbiAgLy8gTWFwIG92ZXIgalF1ZXJ5IGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG4gIF9qUXVlcnkgPSB3aW5kb3cualF1ZXJ5LFxuXG4gIC8vIE1hcCBvdmVyIHRoZSAkIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG4gIF8kID0gd2luZG93LiQ7XG5cbmpRdWVyeS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oIGRlZXAgKSB7XG4gIGlmICggd2luZG93LiQgPT09IGpRdWVyeSApIHtcbiAgICB3aW5kb3cuJCA9IF8kO1xuICB9XG5cbiAgaWYgKCBkZWVwICYmIHdpbmRvdy5qUXVlcnkgPT09IGpRdWVyeSApIHtcbiAgICB3aW5kb3cualF1ZXJ5ID0gX2pRdWVyeTtcbiAgfVxuXG4gIHJldHVybiBqUXVlcnk7XG59O1xuXG4vLyBFeHBvc2UgalF1ZXJ5IGFuZCAkIGlkZW50aWZpZXJzLCBldmVuIGluXG4vLyBBTUQgKCM3MTAyI2NvbW1lbnQ6MTAsIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNTU3KVxuLy8gYW5kIENvbW1vbkpTIGZvciBicm93c2VyIGVtdWxhdG9ycyAoIzEzNTY2KVxuaWYgKCB0eXBlb2Ygbm9HbG9iYWwgPT09IHN0cnVuZGVmaW5lZCApIHtcbiAgd2luZG93LmpRdWVyeSA9IHdpbmRvdy4kID0galF1ZXJ5O1xufVxuXG5cblxuXG5yZXR1cm4galF1ZXJ5O1xuXG59KSk7XG4iLCIvKiBodHRwOi8vcHJpc21qcy5jb20vZG93bmxvYWQuaHRtbD90aGVtZXM9cHJpc20mbGFuZ3VhZ2VzPW1hcmt1cCtjc3Mrc2NzcyAqL1xudmFyIF9zZWxmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHQ/IHdpbmRvdyAgIC8vIGlmIGluIGJyb3dzZXJcblx0OiAoXG5cdFx0KHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKVxuXHRcdD8gc2VsZiAvLyBpZiBpbiB3b3JrZXJcblx0XHQ6IHt9ICAgLy8gaWYgaW4gbm9kZSBqc1xuXHQpO1xuXG4vKipcbiAqIFByaXNtOiBMaWdodHdlaWdodCwgcm9idXN0LCBlbGVnYW50IHN5bnRheCBoaWdobGlnaHRpbmdcbiAqIE1JVCBsaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwL1xuICogQGF1dGhvciBMZWEgVmVyb3UgaHR0cDovL2xlYS52ZXJvdS5tZVxuICovXG5cbnZhciBQcmlzbSA9IChmdW5jdGlvbigpe1xuXG4vLyBQcml2YXRlIGhlbHBlciB2YXJzXG52YXIgbGFuZyA9IC9cXGJsYW5nKD86dWFnZSk/LSg/IVxcKikoXFx3KylcXGIvaTtcblxudmFyIF8gPSBfc2VsZi5QcmlzbSA9IHtcblx0dXRpbDoge1xuXHRcdGVuY29kZTogZnVuY3Rpb24gKHRva2Vucykge1xuXHRcdFx0aWYgKHRva2VucyBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVG9rZW4odG9rZW5zLnR5cGUsIF8udXRpbC5lbmNvZGUodG9rZW5zLmNvbnRlbnQpLCB0b2tlbnMuYWxpYXMpO1xuXHRcdFx0fSBlbHNlIGlmIChfLnV0aWwudHlwZSh0b2tlbnMpID09PSAnQXJyYXknKSB7XG5cdFx0XHRcdHJldHVybiB0b2tlbnMubWFwKF8udXRpbC5lbmNvZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRva2Vucy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHR5cGU6IGZ1bmN0aW9uIChvKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLm1hdGNoKC9cXFtvYmplY3QgKFxcdyspXFxdLylbMV07XG5cdFx0fSxcblxuXHRcdC8vIERlZXAgY2xvbmUgYSBsYW5ndWFnZSBkZWZpbml0aW9uIChlLmcuIHRvIGV4dGVuZCBpdClcblx0XHRjbG9uZTogZnVuY3Rpb24gKG8pIHtcblx0XHRcdHZhciB0eXBlID0gXy51dGlsLnR5cGUobyk7XG5cblx0XHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0XHRjYXNlICdPYmplY3QnOlxuXHRcdFx0XHRcdHZhciBjbG9uZSA9IHt9O1xuXG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG8pIHtcblx0XHRcdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmVba2V5XSA9IF8udXRpbC5jbG9uZShvW2tleV0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBjbG9uZTtcblxuXHRcdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgZm9yIGV4aXN0ZW5jZSBmb3IgSUU4XG5cdFx0XHRcdFx0cmV0dXJuIG8ubWFwICYmIG8ubWFwKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIF8udXRpbC5jbG9uZSh2KTsgfSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvO1xuXHRcdH1cblx0fSxcblxuXHRsYW5ndWFnZXM6IHtcblx0XHRleHRlbmQ6IGZ1bmN0aW9uIChpZCwgcmVkZWYpIHtcblx0XHRcdHZhciBsYW5nID0gXy51dGlsLmNsb25lKF8ubGFuZ3VhZ2VzW2lkXSk7XG5cblx0XHRcdGZvciAodmFyIGtleSBpbiByZWRlZikge1xuXHRcdFx0XHRsYW5nW2tleV0gPSByZWRlZltrZXldO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbGFuZztcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5zZXJ0IGEgdG9rZW4gYmVmb3JlIGFub3RoZXIgdG9rZW4gaW4gYSBsYW5ndWFnZSBsaXRlcmFsXG5cdFx0ICogQXMgdGhpcyBuZWVkcyB0byByZWNyZWF0ZSB0aGUgb2JqZWN0ICh3ZSBjYW5ub3QgYWN0dWFsbHkgaW5zZXJ0IGJlZm9yZSBrZXlzIGluIG9iamVjdCBsaXRlcmFscyksXG5cdFx0ICogd2UgY2Fubm90IGp1c3QgcHJvdmlkZSBhbiBvYmplY3QsIHdlIG5lZWQgYW5vYmplY3QgYW5kIGEga2V5LlxuXHRcdCAqIEBwYXJhbSBpbnNpZGUgVGhlIGtleSAob3IgbGFuZ3VhZ2UgaWQpIG9mIHRoZSBwYXJlbnRcblx0XHQgKiBAcGFyYW0gYmVmb3JlIFRoZSBrZXkgdG8gaW5zZXJ0IGJlZm9yZS4gSWYgbm90IHByb3ZpZGVkLCB0aGUgZnVuY3Rpb24gYXBwZW5kcyBpbnN0ZWFkLlxuXHRcdCAqIEBwYXJhbSBpbnNlcnQgT2JqZWN0IHdpdGggdGhlIGtleS92YWx1ZSBwYWlycyB0byBpbnNlcnRcblx0XHQgKiBAcGFyYW0gcm9vdCBUaGUgb2JqZWN0IHRoYXQgY29udGFpbnMgYGluc2lkZWAuIElmIGVxdWFsIHRvIFByaXNtLmxhbmd1YWdlcywgaXQgY2FuIGJlIG9taXR0ZWQuXG5cdFx0ICovXG5cdFx0aW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoaW5zaWRlLCBiZWZvcmUsIGluc2VydCwgcm9vdCkge1xuXHRcdFx0cm9vdCA9IHJvb3QgfHwgXy5sYW5ndWFnZXM7XG5cdFx0XHR2YXIgZ3JhbW1hciA9IHJvb3RbaW5zaWRlXTtcblxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikge1xuXHRcdFx0XHRpbnNlcnQgPSBhcmd1bWVudHNbMV07XG5cblx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdGdyYW1tYXJbbmV3VG9rZW5dID0gaW5zZXJ0W25ld1Rva2VuXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZ3JhbW1hcjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHJldCA9IHt9O1xuXG5cdFx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cblx0XHRcdFx0aWYgKGdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cblx0XHRcdFx0XHRpZiAodG9rZW4gPT0gYmVmb3JlKSB7XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIG5ld1Rva2VuIGluIGluc2VydCkge1xuXG5cdFx0XHRcdFx0XHRcdGlmIChpbnNlcnQuaGFzT3duUHJvcGVydHkobmV3VG9rZW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0W25ld1Rva2VuXSA9IGluc2VydFtuZXdUb2tlbl07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXRbdG9rZW5dID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVXBkYXRlIHJlZmVyZW5jZXMgaW4gb3RoZXIgbGFuZ3VhZ2UgZGVmaW5pdGlvbnNcblx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhfLmxhbmd1YWdlcywgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IHJvb3RbaW5zaWRlXSAmJiBrZXkgIT0gaW5zaWRlKSB7XG5cdFx0XHRcdFx0dGhpc1trZXldID0gcmV0O1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHJvb3RbaW5zaWRlXSA9IHJldDtcblx0XHR9LFxuXG5cdFx0Ly8gVHJhdmVyc2UgYSBsYW5ndWFnZSBkZWZpbml0aW9uIHdpdGggRGVwdGggRmlyc3QgU2VhcmNoXG5cdFx0REZTOiBmdW5jdGlvbihvLCBjYWxsYmFjaywgdHlwZSkge1xuXHRcdFx0Zm9yICh2YXIgaSBpbiBvKSB7XG5cdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChvLCBpLCBvW2ldLCB0eXBlIHx8IGkpO1xuXG5cdFx0XHRcdFx0aWYgKF8udXRpbC50eXBlKG9baV0pID09PSAnT2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0Xy5sYW5ndWFnZXMuREZTKG9baV0sIGNhbGxiYWNrKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoXy51dGlsLnR5cGUob1tpXSkgPT09ICdBcnJheScpIHtcblx0XHRcdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhvW2ldLCBjYWxsYmFjaywgaSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwbHVnaW5zOiB7fSxcblxuXHRoaWdobGlnaHRBbGw6IGZ1bmN0aW9uKGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdLCBbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIGNvZGUsIGNvZGVbY2xhc3MqPVwibGFuZy1cIl0sIFtjbGFzcyo9XCJsYW5nLVwiXSBjb2RlJyk7XG5cblx0XHRmb3IgKHZhciBpPTAsIGVsZW1lbnQ7IGVsZW1lbnQgPSBlbGVtZW50c1tpKytdOykge1xuXHRcdFx0Xy5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQsIGFzeW5jID09PSB0cnVlLCBjYWxsYmFjayk7XG5cdFx0fVxuXHR9LFxuXG5cdGhpZ2hsaWdodEVsZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdC8vIEZpbmQgbGFuZ3VhZ2Vcblx0XHR2YXIgbGFuZ3VhZ2UsIGdyYW1tYXIsIHBhcmVudCA9IGVsZW1lbnQ7XG5cblx0XHR3aGlsZSAocGFyZW50ICYmICFsYW5nLnRlc3QocGFyZW50LmNsYXNzTmFtZSkpIHtcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdGlmIChwYXJlbnQpIHtcblx0XHRcdGxhbmd1YWdlID0gKHBhcmVudC5jbGFzc05hbWUubWF0Y2gobGFuZykgfHwgWywnJ10pWzFdO1xuXHRcdFx0Z3JhbW1hciA9IF8ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcblx0XHR9XG5cblx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIGVsZW1lbnQsIGlmIG5vdCBwcmVzZW50XG5cdFx0ZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblxuXHRcdC8vIFNldCBsYW5ndWFnZSBvbiB0aGUgcGFyZW50LCBmb3Igc3R5bGluZ1xuXHRcdHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuXHRcdGlmICgvcHJlL2kudGVzdChwYXJlbnQubm9kZU5hbWUpKSB7XG5cdFx0XHRwYXJlbnQuY2xhc3NOYW1lID0gcGFyZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblx0XHR9XG5cblx0XHR2YXIgY29kZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG5cblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRjb2RlOiBjb2RlXG5cdFx0fTtcblxuXHRcdGlmICghY29kZSB8fCAhZ3JhbW1hcikge1xuXHRcdFx0Xy5ob29rcy5ydW4oJ2NvbXBsZXRlJywgZW52KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRpZiAoYXN5bmMgJiYgX3NlbGYuV29ya2VyKSB7XG5cdFx0XHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcihfLmZpbGVuYW1lKTtcblxuXHRcdFx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRlbnYuaGlnaGxpZ2h0ZWRDb2RlID0gZXZ0LmRhdGE7XG5cblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1pbnNlcnQnLCBlbnYpO1xuXG5cdFx0XHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbnYuZWxlbWVudCk7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdhZnRlci1oaWdobGlnaHQnLCBlbnYpO1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdFx0fTtcblxuXHRcdFx0d29ya2VyLnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0bGFuZ3VhZ2U6IGVudi5sYW5ndWFnZSxcblx0XHRcdFx0Y29kZTogZW52LmNvZGUsXG5cdFx0XHRcdGltbWVkaWF0ZUNsb3NlOiB0cnVlXG5cdFx0XHR9KSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IF8uaGlnaGxpZ2h0KGVudi5jb2RlLCBlbnYuZ3JhbW1hciwgZW52Lmxhbmd1YWdlKTtcblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1pbnNlcnQnLCBlbnYpO1xuXG5cdFx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVsZW1lbnQpO1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItaGlnaGxpZ2h0JywgZW52KTtcblx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0fVxuXHR9LFxuXG5cdGhpZ2hsaWdodDogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIsIGxhbmd1YWdlKSB7XG5cdFx0dmFyIHRva2VucyA9IF8udG9rZW5pemUodGV4dCwgZ3JhbW1hcik7XG5cdFx0cmV0dXJuIFRva2VuLnN0cmluZ2lmeShfLnV0aWwuZW5jb2RlKHRva2VucyksIGxhbmd1YWdlKTtcblx0fSxcblxuXHR0b2tlbml6ZTogZnVuY3Rpb24odGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHR2YXIgVG9rZW4gPSBfLlRva2VuO1xuXG5cdFx0dmFyIHN0cmFyciA9IFt0ZXh0XTtcblxuXHRcdHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuXG5cdFx0aWYgKHJlc3QpIHtcblx0XHRcdGZvciAodmFyIHRva2VuIGluIHJlc3QpIHtcblx0XHRcdFx0Z3JhbW1hclt0b2tlbl0gPSByZXN0W3Rva2VuXTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsZXRlIGdyYW1tYXIucmVzdDtcblx0XHR9XG5cblx0XHR0b2tlbmxvb3A6IGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblx0XHRcdGlmKCFncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSB8fCAhZ3JhbW1hclt0b2tlbl0pIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwYXR0ZXJucyA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0cGF0dGVybnMgPSAoXy51dGlsLnR5cGUocGF0dGVybnMpID09PSBcIkFycmF5XCIpID8gcGF0dGVybnMgOiBbcGF0dGVybnNdO1xuXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHBhdHRlcm5zLmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHZhciBwYXR0ZXJuID0gcGF0dGVybnNbal0sXG5cdFx0XHRcdFx0aW5zaWRlID0gcGF0dGVybi5pbnNpZGUsXG5cdFx0XHRcdFx0bG9va2JlaGluZCA9ICEhcGF0dGVybi5sb29rYmVoaW5kLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmRMZW5ndGggPSAwLFxuXHRcdFx0XHRcdGFsaWFzID0gcGF0dGVybi5hbGlhcztcblxuXHRcdFx0XHRwYXR0ZXJuID0gcGF0dGVybi5wYXR0ZXJuIHx8IHBhdHRlcm47XG5cblx0XHRcdFx0Zm9yICh2YXIgaT0wOyBpPHN0cmFyci5sZW5ndGg7IGkrKykgeyAvLyBEb27igJl0IGNhY2hlIGxlbmd0aCBhcyBpdCBjaGFuZ2VzIGR1cmluZyB0aGUgbG9vcFxuXG5cdFx0XHRcdFx0dmFyIHN0ciA9IHN0cmFycltpXTtcblxuXHRcdFx0XHRcdGlmIChzdHJhcnIubGVuZ3RoID4gdGV4dC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdC8vIFNvbWV0aGluZyB3ZW50IHRlcnJpYmx5IHdyb25nLCBBQk9SVCwgQUJPUlQhXG5cdFx0XHRcdFx0XHRicmVhayB0b2tlbmxvb3A7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHN0ciBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRwYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG5cblx0XHRcdFx0XHR2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWMoc3RyKTtcblxuXHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0aWYobG9va2JlaGluZCkge1xuXHRcdFx0XHRcdFx0XHRsb29rYmVoaW5kTGVuZ3RoID0gbWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4IC0gMSArIGxvb2tiZWhpbmRMZW5ndGgsXG5cdFx0XHRcdFx0XHRcdG1hdGNoID0gbWF0Y2hbMF0uc2xpY2UobG9va2JlaGluZExlbmd0aCksXG5cdFx0XHRcdFx0XHRcdGxlbiA9IG1hdGNoLmxlbmd0aCxcblx0XHRcdFx0XHRcdFx0dG8gPSBmcm9tICsgbGVuLFxuXHRcdFx0XHRcdFx0XHRiZWZvcmUgPSBzdHIuc2xpY2UoMCwgZnJvbSArIDEpLFxuXHRcdFx0XHRcdFx0XHRhZnRlciA9IHN0ci5zbGljZSh0byArIDEpO1xuXG5cdFx0XHRcdFx0XHR2YXIgYXJncyA9IFtpLCAxXTtcblxuXHRcdFx0XHRcdFx0aWYgKGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0XHRhcmdzLnB1c2goYmVmb3JlKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIHdyYXBwZWQgPSBuZXcgVG9rZW4odG9rZW4sIGluc2lkZT8gXy50b2tlbml6ZShtYXRjaCwgaW5zaWRlKSA6IG1hdGNoLCBhbGlhcyk7XG5cblx0XHRcdFx0XHRcdGFyZ3MucHVzaCh3cmFwcGVkKTtcblxuXHRcdFx0XHRcdFx0aWYgKGFmdGVyKSB7XG5cdFx0XHRcdFx0XHRcdGFyZ3MucHVzaChhZnRlcik7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoc3RyYXJyLCBhcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc3RyYXJyO1xuXHR9LFxuXG5cdGhvb2tzOiB7XG5cdFx0YWxsOiB7fSxcblxuXHRcdGFkZDogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaG9va3MgPSBfLmhvb2tzLmFsbDtcblxuXHRcdFx0aG9va3NbbmFtZV0gPSBob29rc1tuYW1lXSB8fCBbXTtcblxuXHRcdFx0aG9va3NbbmFtZV0ucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblxuXHRcdHJ1bjogZnVuY3Rpb24gKG5hbWUsIGVudikge1xuXHRcdFx0dmFyIGNhbGxiYWNrcyA9IF8uaG9va3MuYWxsW25hbWVdO1xuXG5cdFx0XHRpZiAoIWNhbGxiYWNrcyB8fCAhY2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGZvciAodmFyIGk9MCwgY2FsbGJhY2s7IGNhbGxiYWNrID0gY2FsbGJhY2tzW2krK107KSB7XG5cdFx0XHRcdGNhbGxiYWNrKGVudik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgVG9rZW4gPSBfLlRva2VuID0gZnVuY3Rpb24odHlwZSwgY29udGVudCwgYWxpYXMpIHtcblx0dGhpcy50eXBlID0gdHlwZTtcblx0dGhpcy5jb250ZW50ID0gY29udGVudDtcblx0dGhpcy5hbGlhcyA9IGFsaWFzO1xufTtcblxuVG9rZW4uc3RyaW5naWZ5ID0gZnVuY3Rpb24obywgbGFuZ3VhZ2UsIHBhcmVudCkge1xuXHRpZiAodHlwZW9mIG8gPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gbztcblx0fVxuXG5cdGlmIChfLnV0aWwudHlwZShvKSA9PT0gJ0FycmF5Jykge1xuXHRcdHJldHVybiBvLm1hcChmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KGVsZW1lbnQsIGxhbmd1YWdlLCBvKTtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdHZhciBlbnYgPSB7XG5cdFx0dHlwZTogby50eXBlLFxuXHRcdGNvbnRlbnQ6IFRva2VuLnN0cmluZ2lmeShvLmNvbnRlbnQsIGxhbmd1YWdlLCBwYXJlbnQpLFxuXHRcdHRhZzogJ3NwYW4nLFxuXHRcdGNsYXNzZXM6IFsndG9rZW4nLCBvLnR5cGVdLFxuXHRcdGF0dHJpYnV0ZXM6IHt9LFxuXHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRwYXJlbnQ6IHBhcmVudFxuXHR9O1xuXG5cdGlmIChlbnYudHlwZSA9PSAnY29tbWVudCcpIHtcblx0XHRlbnYuYXR0cmlidXRlc1snc3BlbGxjaGVjayddID0gJ3RydWUnO1xuXHR9XG5cblx0aWYgKG8uYWxpYXMpIHtcblx0XHR2YXIgYWxpYXNlcyA9IF8udXRpbC50eXBlKG8uYWxpYXMpID09PSAnQXJyYXknID8gby5hbGlhcyA6IFtvLmFsaWFzXTtcblx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShlbnYuY2xhc3NlcywgYWxpYXNlcyk7XG5cdH1cblxuXHRfLmhvb2tzLnJ1bignd3JhcCcsIGVudik7XG5cblx0dmFyIGF0dHJpYnV0ZXMgPSAnJztcblxuXHRmb3IgKHZhciBuYW1lIGluIGVudi5hdHRyaWJ1dGVzKSB7XG5cdFx0YXR0cmlidXRlcyArPSAoYXR0cmlidXRlcyA/ICcgJyA6ICcnKSArIG5hbWUgKyAnPVwiJyArIChlbnYuYXR0cmlidXRlc1tuYW1lXSB8fCAnJykgKyAnXCInO1xuXHR9XG5cblx0cmV0dXJuICc8JyArIGVudi50YWcgKyAnIGNsYXNzPVwiJyArIGVudi5jbGFzc2VzLmpvaW4oJyAnKSArICdcIiAnICsgYXR0cmlidXRlcyArICc+JyArIGVudi5jb250ZW50ICsgJzwvJyArIGVudi50YWcgKyAnPic7XG5cbn07XG5cbmlmICghX3NlbGYuZG9jdW1lbnQpIHtcblx0aWYgKCFfc2VsZi5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0Ly8gaW4gTm9kZS5qc1xuXHRcdHJldHVybiBfc2VsZi5QcmlzbTtcblx0fVxuIFx0Ly8gSW4gd29ya2VyXG5cdF9zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihldnQpIHtcblx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZ0LmRhdGEpLFxuXHRcdCAgICBsYW5nID0gbWVzc2FnZS5sYW5ndWFnZSxcblx0XHQgICAgY29kZSA9IG1lc3NhZ2UuY29kZSxcblx0XHQgICAgaW1tZWRpYXRlQ2xvc2UgPSBtZXNzYWdlLmltbWVkaWF0ZUNsb3NlO1xuXG5cdFx0X3NlbGYucG9zdE1lc3NhZ2UoXy5oaWdobGlnaHQoY29kZSwgXy5sYW5ndWFnZXNbbGFuZ10sIGxhbmcpKTtcblx0XHRpZiAoaW1tZWRpYXRlQ2xvc2UpIHtcblx0XHRcdF9zZWxmLmNsb3NlKCk7XG5cdFx0fVxuXHR9LCBmYWxzZSk7XG5cblx0cmV0dXJuIF9zZWxmLlByaXNtO1xufVxuXG4vLyBHZXQgY3VycmVudCBzY3JpcHQgYW5kIGhpZ2hsaWdodFxudmFyIHNjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcblxuc2NyaXB0ID0gc2NyaXB0W3NjcmlwdC5sZW5ndGggLSAxXTtcblxuaWYgKHNjcmlwdCkge1xuXHRfLmZpbGVuYW1lID0gc2NyaXB0LnNyYztcblxuXHRpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAmJiAhc2NyaXB0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1tYW51YWwnKSkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBfLmhpZ2hsaWdodEFsbCk7XG5cdH1cbn1cblxucmV0dXJuIF9zZWxmLlByaXNtO1xuXG59KSgpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBQcmlzbTtcbn1cblxuLy8gaGFjayBmb3IgY29tcG9uZW50cyB0byB3b3JrIGNvcnJlY3RseSBpbiBub2RlLmpzXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0Z2xvYmFsLlByaXNtID0gUHJpc207XG59XG47XG5QcmlzbS5sYW5ndWFnZXMubWFya3VwID0ge1xuXHQnY29tbWVudCc6IC88IS0tW1xcd1xcV10qPy0tPi8sXG5cdCdwcm9sb2cnOiAvPFxcP1tcXHdcXFddKz9cXD8+Lyxcblx0J2RvY3R5cGUnOiAvPCFET0NUWVBFW1xcd1xcV10rPz4vLFxuXHQnY2RhdGEnOiAvPCFcXFtDREFUQVxcW1tcXHdcXFddKj9dXT4vaSxcblx0J3RhZyc6IHtcblx0XHRwYXR0ZXJuOiAvPFxcLz8oPyFcXGQpW15cXHM+XFwvPS4kPF0rKD86XFxzK1teXFxzPlxcLz1dKyg/Oj0oPzooXCJ8JykoPzpcXFxcXFwxfFxcXFw/KD8hXFwxKVtcXHdcXFddKSpcXDF8W15cXHMnXCI+PV0rKSk/KSpcXHMqXFwvPz4vaSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0YWcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9ePFxcLz9bXlxccz5cXC9dKy9pLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXjxcXC8/Lyxcblx0XHRcdFx0XHQnbmFtZXNwYWNlJzogL15bXlxccz5cXC86XSs6L1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J2F0dHItdmFsdWUnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC89KD86KCd8XCIpW1xcd1xcV10qPyhcXDEpfFteXFxzPl0rKS9pLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvWz0+XCInXS9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9cXC8/Pi8sXG5cdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvW15cXHM+XFwvXSsvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQnbmFtZXNwYWNlJzogL15bXlxccz5cXC86XSs6L1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0sXG5cdCdlbnRpdHknOiAvJiM/W1xcZGEtel17MSw4fTsvaVxufTtcblxuLy8gUGx1Z2luIHRvIG1ha2UgZW50aXR5IHRpdGxlIHNob3cgdGhlIHJlYWwgZW50aXR5LCBpZGVhIGJ5IFJvbWFuIEtvbWFyb3ZcblByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uKGVudikge1xuXG5cdGlmIChlbnYudHlwZSA9PT0gJ2VudGl0eScpIHtcblx0XHRlbnYuYXR0cmlidXRlc1sndGl0bGUnXSA9IGVudi5jb250ZW50LnJlcGxhY2UoLyZhbXA7LywgJyYnKTtcblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy54bWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLmh0bWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLm1hdGhtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5QcmlzbS5sYW5ndWFnZXMuc3ZnID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuUHJpc20ubGFuZ3VhZ2VzLmNzcyA9IHtcblx0J2NvbW1lbnQnOiAvXFwvXFwqW1xcd1xcV10qP1xcKlxcLy8sXG5cdCdhdHJ1bGUnOiB7XG5cdFx0cGF0dGVybjogL0BbXFx3LV0rPy4qPyg7fCg/PVxccypcXHspKS9pLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3J1bGUnOiAvQFtcXHctXSsvXG5cdFx0XHQvLyBTZWUgcmVzdCBiZWxvd1xuXHRcdH1cblx0fSxcblx0J3VybCc6IC91cmxcXCgoPzooW1wiJ10pKFxcXFwoPzpcXHJcXG58W1xcd1xcV10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDF8Lio/KVxcKS9pLFxuXHQnc2VsZWN0b3InOiAvW15cXHtcXH1cXHNdW15cXHtcXH07XSo/KD89XFxzKlxceykvLFxuXHQnc3RyaW5nJzogLyhcInwnKShcXFxcKD86XFxyXFxufFtcXHdcXFddKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxLyxcblx0J3Byb3BlcnR5JzogLyhcXGJ8XFxCKVtcXHctXSsoPz1cXHMqOikvaSxcblx0J2ltcG9ydGFudCc6IC9cXEIhaW1wb3J0YW50XFxiL2ksXG5cdCdmdW5jdGlvbic6IC9bLWEtejAtOV0rKD89XFwoKS9pLFxuXHQncHVuY3R1YXRpb24nOiAvWygpe307Ol0vXG59O1xuXG5QcmlzbS5sYW5ndWFnZXMuY3NzWydhdHJ1bGUnXS5pbnNpZGUucmVzdCA9IFByaXNtLnV0aWwuY2xvbmUoUHJpc20ubGFuZ3VhZ2VzLmNzcyk7XG5cbmlmIChQcmlzbS5sYW5ndWFnZXMubWFya3VwKSB7XG5cdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICd0YWcnLCB7XG5cdFx0J3N0eWxlJzoge1xuXHRcdFx0cGF0dGVybjogLyg8c3R5bGVbXFx3XFxXXSo/PilbXFx3XFxXXSo/KD89PFxcL3N0eWxlPikvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5jc3MsXG5cdFx0XHRhbGlhczogJ2xhbmd1YWdlLWNzcydcblx0XHR9XG5cdH0pO1xuXG5cdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2luc2lkZScsICdhdHRyLXZhbHVlJywge1xuXHRcdCdzdHlsZS1hdHRyJzoge1xuXHRcdFx0cGF0dGVybjogL1xccypzdHlsZT0oXCJ8JykuKj9cXDEvaSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC9eXFxzKnN0eWxlL2ksXG5cdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5pbnNpZGVcblx0XHRcdFx0fSxcblx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL15cXHMqPVxccypbJ1wiXXxbJ1wiXVxccyokLyxcblx0XHRcdFx0J2F0dHItdmFsdWUnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLy4rL2ksXG5cdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuY3NzXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRhbGlhczogJ2xhbmd1YWdlLWNzcydcblx0XHR9XG5cdH0sIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnKTtcbn07XG5QcmlzbS5sYW5ndWFnZXMuc2NzcyA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NzcycsIHtcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFxcXF0pKD86XFwvXFwqW1xcd1xcV10qP1xcKlxcL3xcXC9cXC8uKikvLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0fSxcblx0J2F0cnVsZSc6IHtcblx0XHRwYXR0ZXJuOiAvQFtcXHctXSsoPzpcXChbXigpXStcXCl8W14oXSkqPyg/PVxccytbeztdKS8sXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQncnVsZSc6IC9AW1xcdy1dKy9cblx0XHRcdC8vIFNlZSByZXN0IGJlbG93XG5cdFx0fVxuXHR9LFxuXHQvLyB1cmwsIGNvbXBhc3NpZmllZFxuXHQndXJsJzogLyg/OlstYS16XSstKSp1cmwoPz1cXCgpL2ksXG5cdC8vIENTUyBzZWxlY3RvciByZWdleCBpcyBub3QgYXBwcm9wcmlhdGUgZm9yIFNhc3Ncblx0Ly8gc2luY2UgdGhlcmUgY2FuIGJlIGxvdCBtb3JlIHRoaW5ncyAodmFyLCBAIGRpcmVjdGl2ZSwgbmVzdGluZy4uKVxuXHQvLyBhIHNlbGVjdG9yIG11c3Qgc3RhcnQgYXQgdGhlIGVuZCBvZiBhIHByb3BlcnR5IG9yIGFmdGVyIGEgYnJhY2UgKGVuZCBvZiBvdGhlciBydWxlcyBvciBuZXN0aW5nKVxuXHQvLyBpdCBjYW4gY29udGFpbiBzb21lIGNoYXJhY3RlcnMgdGhhdCBhcmVuJ3QgdXNlZCBmb3IgZGVmaW5pbmcgcnVsZXMgb3IgZW5kIG9mIHNlbGVjdG9yLCAmIChwYXJlbnQgc2VsZWN0b3IpLCBvciBpbnRlcnBvbGF0ZWQgdmFyaWFibGVcblx0Ly8gdGhlIGVuZCBvZiBhIHNlbGVjdG9yIGlzIGZvdW5kIHdoZW4gdGhlcmUgaXMgbm8gcnVsZXMgaW4gaXQgKCB7fSBvciB7XFxzfSkgb3IgaWYgdGhlcmUgaXMgYSBwcm9wZXJ0eSAoYmVjYXVzZSBhbiBpbnRlcnBvbGF0ZWQgdmFyXG5cdC8vIGNhbiBcInBhc3NcIiBhcyBhIHNlbGVjdG9yLSBlLmc6IHByb3BlciN7JGVydHl9KVxuXHQvLyB0aGlzIG9uZSB3YXMgaGFyZCB0byBkbywgc28gcGxlYXNlIGJlIGNhcmVmdWwgaWYgeW91IGVkaXQgdGhpcyBvbmUgOilcblx0J3NlbGVjdG9yJzoge1xuXHRcdC8vIEluaXRpYWwgbG9vay1haGVhZCBpcyB1c2VkIHRvIHByZXZlbnQgbWF0Y2hpbmcgb2YgYmxhbmsgc2VsZWN0b3JzXG5cdFx0cGF0dGVybjogLyg/PVxcUylbXkA7XFx7XFx9XFwoXFwpXT8oW15AO1xce1xcfVxcKFxcKV18JnwjXFx7XFwkWy1fXFx3XStcXH0pKyg/PVxccypcXHsoXFx9fFxcc3xbXlxcfV0rKDp8XFx7KVteXFx9XSspKS9tLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3BsYWNlaG9sZGVyJzogLyVbLV9cXHddKy9cblx0XHR9XG5cdH1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ2F0cnVsZScsIHtcblx0J2tleXdvcmQnOiBbXG5cdFx0L0AoPzppZnxlbHNlKD86IGlmKT98Zm9yfGVhY2h8d2hpbGV8aW1wb3J0fGV4dGVuZHxkZWJ1Z3x3YXJufG1peGlufGluY2x1ZGV8ZnVuY3Rpb258cmV0dXJufGNvbnRlbnQpL2ksXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyggKykoPzpmcm9tfHRocm91Z2gpKD89ICkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH1cblx0XVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3Njc3MnLCAncHJvcGVydHknLCB7XG5cdC8vIHZhciBhbmQgaW50ZXJwb2xhdGVkIHZhcnNcblx0J3ZhcmlhYmxlJzogL1xcJFstX1xcd10rfCNcXHtcXCRbLV9cXHddK1xcfS9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ2Z1bmN0aW9uJywge1xuXHQncGxhY2Vob2xkZXInOiB7XG5cdFx0cGF0dGVybjogLyVbLV9cXHddKy8sXG5cdFx0YWxpYXM6ICdzZWxlY3Rvcidcblx0fSxcblx0J3N0YXRlbWVudCc6IC9cXEIhKD86ZGVmYXVsdHxvcHRpb25hbClcXGIvaSxcblx0J2Jvb2xlYW4nOiAvXFxiKD86dHJ1ZXxmYWxzZSlcXGIvLFxuXHQnbnVsbCc6IC9cXGJudWxsXFxiLyxcblx0J29wZXJhdG9yJzoge1xuXHRcdHBhdHRlcm46IC8oXFxzKSg/OlstKypcXC8lXXxbPSFdPXw8PT98Pj0/fGFuZHxvcnxub3QpKD89XFxzKS8sXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLnNjc3NbJ2F0cnVsZSddLmluc2lkZS5yZXN0ID0gUHJpc20udXRpbC5jbG9uZShQcmlzbS5sYW5ndWFnZXMuc2Nzcyk7XG4iLCIvKlxuXG4kd2luLm9uKCdyZXNpemUnLCB0aHJvdHRsZShmdW5jdGlvbigpIHtcblx0Y29uc29sZS5sb2coJ3Rocm90dGxlJyk7XG59LCAxMDApKTtcblxuKi9cblxuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIHRocmVzaGhvbGQsIHNjb3BlKSB7XG5cdHRocmVzaGhvbGQgfHwgKHRocmVzaGhvbGQgPSAyNTApO1xuXHR2YXIgbGFzdCxcblx0XHRcdGRlZmVyVGltZXI7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGNvbnRleHQgPSBzY29wZSB8fCB0aGlzLFxuXHRcdCAgICBub3cgPSArbmV3IERhdGUsXG5cdFx0ICAgIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0aWYgKGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaGhvbGQpIHtcblx0XHRcdGNsZWFyVGltZW91dChkZWZlclRpbWVyKTtcblx0XHRcdGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0bGFzdCA9IG5vdztcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHR9LCB0aHJlc2hob2xkKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGFzdCA9IG5vdztcblx0XHRcdGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdH1cblx0fTtcbn0iLCIvKiEgaHR0cDovL210aHMuYmUvcGxhY2Vob2xkZXIgdjIuMS4xIGJ5IEBtYXRoaWFzICovXG4oZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1EXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbigkKSB7XG5cbiAgICAvLyBPcGVyYSBNaW5pIHY3IGRvZXNuJ3Qgc3VwcG9ydCBwbGFjZWhvbGRlciBhbHRob3VnaCBpdHMgRE9NIHNlZW1zIHRvIGluZGljYXRlIHNvXG4gICAgdmFyIGlzT3BlcmFNaW5pID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHdpbmRvdy5vcGVyYW1pbmkpID09ICdbb2JqZWN0IE9wZXJhTWluaV0nO1xuICAgIHZhciBpc0lucHV0U3VwcG9ydGVkID0gJ3BsYWNlaG9sZGVyJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpICYmICFpc09wZXJhTWluaTtcbiAgICB2YXIgaXNUZXh0YXJlYVN1cHBvcnRlZCA9ICdwbGFjZWhvbGRlcicgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKSAmJiAhaXNPcGVyYU1pbmk7XG4gICAgdmFyIHZhbEhvb2tzID0gJC52YWxIb29rcztcbiAgICB2YXIgcHJvcEhvb2tzID0gJC5wcm9wSG9va3M7XG4gICAgdmFyIGhvb2tzO1xuICAgIHZhciBwbGFjZWhvbGRlcjtcblxuICAgIGlmIChpc0lucHV0U3VwcG9ydGVkICYmIGlzVGV4dGFyZWFTdXBwb3J0ZWQpIHtcblxuICAgICAgICBwbGFjZWhvbGRlciA9ICQuZm4ucGxhY2Vob2xkZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIHBsYWNlaG9sZGVyLmlucHV0ID0gcGxhY2Vob2xkZXIudGV4dGFyZWEgPSB0cnVlO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICB2YXIgc2V0dGluZ3MgPSB7fTtcblxuICAgICAgICBwbGFjZWhvbGRlciA9ICQuZm4ucGxhY2Vob2xkZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgICAgIHZhciBkZWZhdWx0cyA9IHtjdXN0b21DbGFzczogJ3BsYWNlaG9sZGVyJ307XG4gICAgICAgICAgICBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAkdGhpc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGlzSW5wdXRTdXBwb3J0ZWQgPyAndGV4dGFyZWEnIDogJzppbnB1dCcpICsgJ1twbGFjZWhvbGRlcl0nKVxuICAgICAgICAgICAgICAgIC5ub3QoJy4nK3NldHRpbmdzLmN1c3RvbUNsYXNzKVxuICAgICAgICAgICAgICAgIC5iaW5kKHtcbiAgICAgICAgICAgICAgICAgICAgJ2ZvY3VzLnBsYWNlaG9sZGVyJzogY2xlYXJQbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgJ2JsdXIucGxhY2Vob2xkZXInOiBzZXRQbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRhdGEoJ3BsYWNlaG9sZGVyLWVuYWJsZWQnLCB0cnVlKVxuICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdibHVyLnBsYWNlaG9sZGVyJyk7XG4gICAgICAgICAgICByZXR1cm4gJHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgcGxhY2Vob2xkZXIuaW5wdXQgPSBpc0lucHV0U3VwcG9ydGVkO1xuICAgICAgICBwbGFjZWhvbGRlci50ZXh0YXJlYSA9IGlzVGV4dGFyZWFTdXBwb3J0ZWQ7XG5cbiAgICAgICAgaG9va3MgPSB7XG4gICAgICAgICAgICAnZ2V0JzogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgJHBhc3N3b3JkSW5wdXQgPSAkZWxlbWVudC5kYXRhKCdwbGFjZWhvbGRlci1wYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgIGlmICgkcGFzc3dvcmRJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHBhc3N3b3JkSW5wdXRbMF0udmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmRhdGEoJ3BsYWNlaG9sZGVyLWVuYWJsZWQnKSAmJiAkZWxlbWVudC5oYXNDbGFzcyhzZXR0aW5ncy5jdXN0b21DbGFzcykgPyAnJyA6IGVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3NldCc6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHZhciAkcGFzc3dvcmRJbnB1dCA9ICRlbGVtZW50LmRhdGEoJ3BsYWNlaG9sZGVyLXBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRwYXNzd29yZElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkcGFzc3dvcmRJbnB1dFswXS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghJGVsZW1lbnQuZGF0YSgncGxhY2Vob2xkZXItZW5hYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAvLyBJc3N1ZSAjNTY6IFNldHRpbmcgdGhlIHBsYWNlaG9sZGVyIGNhdXNlcyBwcm9ibGVtcyBpZiB0aGUgZWxlbWVudCBjb250aW51ZXMgdG8gaGF2ZSBmb2N1cy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FuJ3QgdXNlIGB0cmlnZ2VySGFuZGxlcmAgaGVyZSBiZWNhdXNlIG9mIGR1bW15IHRleHQvcGFzc3dvcmQgaW5wdXRzIDooXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGFjZWhvbGRlci5jYWxsKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkZWxlbWVudC5oYXNDbGFzcyhzZXR0aW5ncy5jdXN0b21DbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJQbGFjZWhvbGRlci5jYWxsKGVsZW1lbnQsIHRydWUsIHZhbHVlKSB8fCAoZWxlbWVudC52YWx1ZSA9IHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGBzZXRgIGNhbiBub3QgcmV0dXJuIGB1bmRlZmluZWRgOyBzZWUgaHR0cDovL2pzYXBpLmluZm8vanF1ZXJ5LzEuNy4xL3ZhbCNMMjM2M1xuICAgICAgICAgICAgICAgIHJldHVybiAkZWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIWlzSW5wdXRTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgIHZhbEhvb2tzLmlucHV0ID0gaG9va3M7XG4gICAgICAgICAgICBwcm9wSG9va3MudmFsdWUgPSBob29rcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVGV4dGFyZWFTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgIHZhbEhvb2tzLnRleHRhcmVhID0gaG9va3M7XG4gICAgICAgICAgICBwcm9wSG9va3MudmFsdWUgPSBob29rcztcbiAgICAgICAgfVxuXG4gICAgICAgICQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBMb29rIGZvciBmb3Jtc1xuICAgICAgICAgICAgJChkb2N1bWVudCkuZGVsZWdhdGUoJ2Zvcm0nLCAnc3VibWl0LnBsYWNlaG9sZGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIHBsYWNlaG9sZGVyIHZhbHVlcyBzbyB0aGV5IGRvbid0IGdldCBzdWJtaXR0ZWRcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0cyA9ICQoJy4nK3NldHRpbmdzLmN1c3RvbUNsYXNzLCB0aGlzKS5lYWNoKGNsZWFyUGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dHMuZWFjaChzZXRQbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENsZWFyIHBsYWNlaG9sZGVyIHZhbHVlcyB1cG9uIHBhZ2UgcmVsb2FkXG4gICAgICAgICQod2luZG93KS5iaW5kKCdiZWZvcmV1bmxvYWQucGxhY2Vob2xkZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJy4nK3NldHRpbmdzLmN1c3RvbUNsYXNzKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFyZ3MoZWxlbSkge1xuICAgICAgICAvLyBSZXR1cm4gYW4gb2JqZWN0IG9mIGVsZW1lbnQgYXR0cmlidXRlc1xuICAgICAgICB2YXIgbmV3QXR0cnMgPSB7fTtcbiAgICAgICAgdmFyIHJpbmxpbmVqUXVlcnkgPSAvXmpRdWVyeVxcZCskLztcbiAgICAgICAgJC5lYWNoKGVsZW0uYXR0cmlidXRlcywgZnVuY3Rpb24oaSwgYXR0cikge1xuICAgICAgICAgICAgaWYgKGF0dHIuc3BlY2lmaWVkICYmICFyaW5saW5lalF1ZXJ5LnRlc3QoYXR0ci5uYW1lKSkge1xuICAgICAgICAgICAgICAgIG5ld0F0dHJzW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld0F0dHJzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFyUGxhY2Vob2xkZXIoZXZlbnQsIHZhbHVlKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XG4gICAgICAgIHZhciAkaW5wdXQgPSAkKGlucHV0KTtcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlID09ICRpbnB1dC5hdHRyKCdwbGFjZWhvbGRlcicpICYmICRpbnB1dC5oYXNDbGFzcyhzZXR0aW5ncy5jdXN0b21DbGFzcykpIHtcbiAgICAgICAgICAgIGlmICgkaW5wdXQuZGF0YSgncGxhY2Vob2xkZXItcGFzc3dvcmQnKSkge1xuICAgICAgICAgICAgICAgICRpbnB1dCA9ICRpbnB1dC5oaWRlKCkubmV4dEFsbCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdOmZpcnN0Jykuc2hvdygpLmF0dHIoJ2lkJywgJGlucHV0LnJlbW92ZUF0dHIoJ2lkJykuZGF0YSgncGxhY2Vob2xkZXItaWQnKSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgYGNsZWFyUGxhY2Vob2xkZXJgIHdhcyBjYWxsZWQgZnJvbSBgJC52YWxIb29rcy5pbnB1dC5zZXRgXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkaW5wdXRbMF0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgJGlucHV0LnJlbW92ZUNsYXNzKHNldHRpbmdzLmN1c3RvbUNsYXNzKTtcbiAgICAgICAgICAgICAgICBpbnB1dCA9PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIGlucHV0LnNlbGVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHZhciAkcmVwbGFjZW1lbnQ7XG4gICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XG4gICAgICAgIHZhciAkaW5wdXQgPSAkKGlucHV0KTtcbiAgICAgICAgdmFyIGlkID0gdGhpcy5pZDtcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09ICdwYXNzd29yZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoISRpbnB1dC5kYXRhKCdwbGFjZWhvbGRlci10ZXh0aW5wdXQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJlcGxhY2VtZW50ID0gJGlucHV0LmNsb25lKCkuYXR0cih7ICd0eXBlJzogJ3RleHQnIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXBsYWNlbWVudCA9ICQoJzxpbnB1dD4nKS5hdHRyKCQuZXh0ZW5kKGFyZ3ModGhpcyksIHsgJ3R5cGUnOiAndGV4dCcgfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRyZXBsYWNlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ25hbWUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwbGFjZWhvbGRlci1wYXNzd29yZCc6ICRpbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGxhY2Vob2xkZXItaWQnOiBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5iaW5kKCdmb2N1cy5wbGFjZWhvbGRlcicsIGNsZWFyUGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGxhY2Vob2xkZXItdGV4dGlucHV0JzogJHJlcGxhY2VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwbGFjZWhvbGRlci1pZCc6IGlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmJlZm9yZSgkcmVwbGFjZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkaW5wdXQgPSAkaW5wdXQucmVtb3ZlQXR0cignaWQnKS5oaWRlKCkucHJldkFsbCgnaW5wdXRbdHlwZT1cInRleHRcIl06Zmlyc3QnKS5hdHRyKCdpZCcsIGlkKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgLy8gTm90ZTogYCRpbnB1dFswXSAhPSBpbnB1dGAgbm93IVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGlucHV0LmFkZENsYXNzKHNldHRpbmdzLmN1c3RvbUNsYXNzKTtcbiAgICAgICAgICAgICRpbnB1dFswXS52YWx1ZSA9ICRpbnB1dC5hdHRyKCdwbGFjZWhvbGRlcicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGlucHV0LnJlbW92ZUNsYXNzKHNldHRpbmdzLmN1c3RvbUNsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhZmVBY3RpdmVFbGVtZW50KCkge1xuICAgICAgICAvLyBBdm9pZCBJRTkgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIG9mIGRlYXRoXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL2pxdWVyeS1wbGFjZWhvbGRlci9wdWxsLzk5XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgIH1cblxufSkpO1xuIiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG5cblx0Ly8gZ2xvYmFsIHZhcnNcblx0JGRvYyA9ICQoZG9jdW1lbnQpLFxuXHQkd2luID0gJCh3aW5kb3cpLFxuXHQkaHRtbCA9ICQoJ2h0bWwnKSxcblx0JGJvZHkgPSAkKCdib2R5JyksXG5cdCRodG1sQm9keSA9ICQoJ2h0bWwsIGJvZHknKSxcblx0YnJlYWtwb2ludCA9IHtcblx0XHQneC1zbWFsbCc6ICAgMzUwLFxuXHRcdCdzbWFsbCc6ICAgICA2MDAsXG5cdFx0J21lZGl1bSc6ICAgIDgwMCxcblx0XHQnbGFyZ2UnOiAgICAgMTAwMCxcblx0XHQneC1sYXJnZSc6ICAgMTQwMCxcblx0XHQneHgtbGFyZ2UnOiAgMTgwMFxuXHR9LFxuXHRpc01vYmlsZSA9IGZhbHNlO1xuXG5cdC8vIHNpbXBsZSBtb2JpbGUgZGV0ZWN0aW9uXG5cdGlmICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcblx0XHQkaHRtbC5hZGRDbGFzcygnaXMtbW9iaWxlJyk7XG5cdFx0aXNNb2JpbGUgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHRcdCRodG1sLmFkZENsYXNzKCdpcy1kZXNrdG9wJyk7XG5cdFx0aXNNb2JpbGUgPSBmYWxzZTtcblx0fVxuXG59KTsiLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQgRGVtb1xuXHQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxudmFyIERlbW8gPSAoZnVuY3Rpb24oKSB7XG5cblx0dmFyIGVsZW1lbnQgPSB7fTtcblxuXHR2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0JCgnW2RhdGEtZGVtb10nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsICdbZGF0YS1kZW1vLWJ1dHRvbl0nLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHQkZGVtbyA9ICRidXR0b24uY2xvc2VzdCgnW2RhdGEtZGVtb10nKSxcblx0XHRcdFx0XHRcdHZhbHVlID0gJGJ1dHRvbi5hdHRyKCdkYXRhLWRlbW8tYnV0dG9uJyk7XG5cblx0XHRcdFx0JGRlbW9cblx0XHRcdFx0XHQuZmluZCgnW2RhdGEtZGVtby1idXR0b25dJylcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG5cdFx0XHRcdCRidXR0b25cblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG5cdFx0XHRcdCRkZW1vXG5cdFx0XHRcdFx0LmZpbmQoJ1tkYXRhLWdyaWQtbW9kaWZpZXJdJylcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG5cdFx0XHRcdCRkZW1vXG5cdFx0XHRcdFx0LmZpbmQoJ1tkYXRhLWdyaWQtbW9kaWZpZXI9XCInICsgdmFsdWUgKyAnXCJdJylcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG5cdFx0XHR9KTtcblxuXHRcdH0pO1xuXG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG5cbn0pKCk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KERlbW8uaW5pdCk7IiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0IFRhYnNcblx0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbnZhciBUYWJzID0gKGZ1bmN0aW9uKCkge1xuXG5cdHZhciBlbGVtZW50ID0ge307XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpIHtcblxuXHRcdCQoJ1tkYXRhLXRhYnNdJykuZWFjaChmdW5jdGlvbigpIHtcblxuXHRcdFx0dmFyICRjb250YWluZXIgPSAkKHRoaXMpO1xuXG5cdFx0XHQkY29udGFpbmVyLm9uKCdjbGljaycsICdbZGF0YS10YWJzLWJ1dHRvbl0nLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0XHRcdFx0aWQgPSAkdGhpcy5hdHRyKCdkYXRhLXRhYnMtYnV0dG9uJyk7XG5cblx0XHRcdFx0JGNvbnRhaW5lci5maW5kKCdbZGF0YS10YWJzLWJ1dHRvbl0nKVxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cblx0XHRcdFx0JGNvbnRhaW5lci5maW5kKCdbZGF0YS10YWJzLWJ1dHRvbj1cIicgKyBpZCArICdcIl0nKVxuXHRcdFx0XHRcdC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cblx0XHRcdFx0JGNvbnRhaW5lci5maW5kKCdbZGF0YS10YWJzLWNvbnRlbnRdJylcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG5cdFx0XHRcdCRjb250YWluZXIuZmluZCgnW2RhdGEtdGFicy1jb250ZW50PVwiJyArIGlkICsgJ1wiXScpXG5cdFx0XHRcdFx0LmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRcdH0pO1xuXG5cdFx0fSk7XG5cblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcblxufSkoKTtcblxuJChkb2N1bWVudCkucmVhZHkoVGFicy5pbml0KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
