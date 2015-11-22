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
/*!
 * viewport-units-buggyfill.hacks v0.5.5
 * @web: https://github.com/rodneyrehm/viewport-units-buggyfill/
 * @author: Zoltan Hawryluk - http://www.useragentman.com/
 */

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.viewportUnitsBuggyfillHacks = factory();
  }
}(this, function () {
  'use strict';

  var options;
  var calcExpression = /calc\(/g;
  var quoteExpression = /[\"\']/g;
  var urlExpression = /url\([^\)]*\)/g;
  var userAgent = window.navigator.userAgent;
  var isBuggyIE = /MSIE [0-9]\./i.test(userAgent);
  var isOldIE = /MSIE [0-8]\./i.test(userAgent);
  var supportsVminmax = true;
  var supportsVminmaxCalc = true;

  if (isBuggyIE === true) {
    supportsVminmaxCalc = false;
    supportsVminmax = false;
  }

  // iOS SAFARI, IE9, or Stock Android: abuse "content" if "viewport-units-buggyfill" specified
  function checkHacks(declarations, rule, name, value) {
    var needsHack = name === 'content' && value.indexOf('viewport-units-buggyfill') > -1;
    if (!needsHack) {
      return;
    }

    var fakeRules = value.replace(quoteExpression, '');
    fakeRules.split(';').forEach(function(fakeRuleElement) {
      var fakeRule = fakeRuleElement.split(':');
      if (fakeRule.length !== 2) {
        return;
      }

      var name = fakeRule[0].trim();
      if (name === 'viewport-units-buggyfill') {
        return;
      }

      var value = fakeRule[1].trim();
      declarations.push([rule, name, value]);
      if (calcExpression.test(value)) {
        var webkitValue = value.replace(calcExpression, '-webkit-calc(');
        declarations.push([rule, name, webkitValue]);
      }
    });
  }

  return {
    required: function(options) {
      return options.isMobileSafari || isBuggyIE;
    },

    initialize: function(initOptions) {
      options = initOptions;

      // Test viewport units support in calc() expressions
      var div = document.createElement('div');
      div.style.width = '1vmax';
      supportsVminmax = div.style.width !== '';

      // there is no accurate way to detect this programmatically.
      if (options.isMobileSafari || options.isBadStockAndroid) {
        supportsVminmaxCalc = false;
      }

    },

    initializeEvents: function(options, refresh, _refresh) {
      if (options.force) {
        return;
      }

      if (isBuggyIE && !options._listeningToResize) {
        window.addEventListener('resize', _refresh, true);
        options._listeningToResize = true;
      }
    },

    findDeclarations: function(declarations, rule, name, value) {
      if (name === null) {
        // KeyframesRule does not have a CSS-PropertyName
        return;
      }

      checkHacks(declarations, rule, name, value);
    },

    overwriteDeclaration: function(rule, name, _value) {
      if (isBuggyIE && name === 'filter') {
        // remove unit "px" from complex value, e.g.:
        // filter: progid:DXImageTransform.Microsoft.DropShadow(OffX=5.4px, OffY=3.9px, Color=#000000);
        _value = _value.replace(/px/g, '');
      }

      return _value;
    }
  };

}));

/*!
 * viewport-units-buggyfill v0.5.5
 * @web: https://github.com/rodneyrehm/viewport-units-buggyfill/
 * @author: Rodney Rehm - http://rodneyrehm.de/en/
 */

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.viewportUnitsBuggyfill = factory();
  }
}(this, function () {
  'use strict';
  /*global document, window, navigator, location, XMLHttpRequest, XDomainRequest*/

  var initialized = false;
  var options;
  var userAgent = window.navigator.userAgent;
  var viewportUnitExpression = /([+-]?[0-9.]+)(vh|vw|vmin|vmax)/g;
  var forEach = [].forEach;
  var dimensions;
  var declarations;
  var styleNode;
  var isBuggyIE = /MSIE [0-9]\./i.test(userAgent);
  var isOldIE = /MSIE [0-8]\./i.test(userAgent);
  var isOperaMini = userAgent.indexOf('Opera Mini') > -1;

  var isMobileSafari = /(iPhone|iPod|iPad).+AppleWebKit/i.test(userAgent) && (function() {
    // Regexp for iOS-version tested against the following userAgent strings:
    // Example WebView UserAgents:
    // * iOS Chrome on iOS8: "Mozilla/5.0 (iPad; CPU OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/39.0.2171.50 Mobile/12B410 Safari/600.1.4"
    // * iOS Facebook on iOS7: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D201 [FBAN/FBIOS;FBAV/12.1.0.24.20; FBBV/3214247; FBDV/iPhone6,1;FBMD/iPhone; FBSN/iPhone OS;FBSV/7.1.1; FBSS/2; FBCR/AT&T;FBID/phone;FBLC/en_US;FBOP/5]"
    // Example Safari UserAgents:
    // * Safari iOS8: "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4"
    // * Safari iOS7: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A4449d Safari/9537.53"
    var iOSversion = userAgent.match(/OS (\d)/);
    // viewport units work fine in mobile Safari and webView on iOS 8+
    return iOSversion && iOSversion.length>1 && parseInt(iOSversion[1]) < 8;
  })();

  var isBadStockAndroid = (function() {
    // Android stock browser test derived from
    // http://stackoverflow.com/questions/24926221/distinguish-android-chrome-from-stock-browser-stock-browsers-user-agent-contai
    var isAndroid = userAgent.indexOf(' Android ') > -1;
    if (!isAndroid) {
      return false;
    }

    var isStockAndroid = userAgent.indexOf('Version/') > -1;
    if (!isStockAndroid) {
      return false;
    }

    var versionNumber = parseFloat((userAgent.match('Android ([0-9.]+)') || [])[1]);
    // anything below 4.4 uses WebKit without *any* viewport support,
    // 4.4 has issues with viewport units within calc()
    return versionNumber <= 4.4;
  })();

  // added check for IE11, since it *still* doesn't understand vmax!!!
  if (!isBuggyIE) {
    isBuggyIE = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
  }

  // Polyfill for creating CustomEvents on IE9/10/11
  // from https://github.com/krambuhl/custom-event-polyfill
  try {
    new CustomEvent('test');
  } catch(e) {
    var CustomEvent = function(event, params) {
      var evt;
      params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
          };

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent; // expose definition to window
  }

  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      var callback = function() {
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(callback, wait);
    };
  }

  // from http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  function initialize(initOptions) {
    if (initialized) {
      return;
    }

    if (initOptions === true) {
      initOptions = {
        force: true
      };
    }

    options = initOptions || {};
    options.isMobileSafari = isMobileSafari;
    options.isBadStockAndroid = isBadStockAndroid;

    if (isOldIE || (!options.force && !isMobileSafari && !isBuggyIE && !isBadStockAndroid && !isOperaMini && (!options.hacks || !options.hacks.required(options)))) {
      // this buggyfill only applies to mobile safari, IE9-10 and the Stock Android Browser.
      if (window.console && isOldIE) {
        console.info('viewport-units-buggyfill requires a proper CSSOM and basic viewport unit support, which are not available in IE8 and below');
      }

      return {
        init: function () {}
      };
    }

    // fire a custom event that buggyfill was initialize
    window.dispatchEvent(new CustomEvent('viewport-units-buggyfill-init'));

    options.hacks && options.hacks.initialize(options);

    initialized = true;
    styleNode = document.createElement('style');
    styleNode.id = 'patched-viewport';
    document.head.appendChild(styleNode);

    // Issue #6: Cross Origin Stylesheets are not accessible through CSSOM,
    // therefore download and inject them as <style> to circumvent SOP.
    importCrossOriginLinks(function() {
      var _refresh = debounce(refresh, options.refreshDebounceWait || 100);
      // doing a full refresh rather than updateStyles because an orientationchange
      // could activate different stylesheets
      window.addEventListener('orientationchange', _refresh, true);
      // orientationchange might have happened while in a different window
      window.addEventListener('pageshow', _refresh, true);

      if (options.force || isBuggyIE || inIframe()) {
        window.addEventListener('resize', _refresh, true);
        options._listeningToResize = true;
      }

      options.hacks && options.hacks.initializeEvents(options, refresh, _refresh);

      refresh();
    });
  }

  function updateStyles() {
    styleNode.textContent = getReplacedViewportUnits();
    // move to the end in case inline <style>s were added dynamically
    styleNode.parentNode.appendChild(styleNode);
    // fire a custom event that styles were updated
    window.dispatchEvent(new CustomEvent('viewport-units-buggyfill-style'));
  }

  function refresh() {
    if (!initialized) {
      return;
    }

    findProperties();

    // iOS Safari will report window.innerWidth and .innerHeight as 0 unless a timeout is used here.
    // TODO: figure out WHY innerWidth === 0
    setTimeout(function() {
      updateStyles();
    }, 1);
  }

  function findProperties() {
    declarations = [];
    forEach.call(document.styleSheets, function(sheet) {
      if (sheet.ownerNode.id === 'patched-viewport' || !sheet.cssRules || sheet.ownerNode.getAttribute('data-viewport-units-buggyfill') === 'ignore') {
        // skip entire sheet because no rules are present, it's supposed to be ignored or it's the target-element of the buggyfill
        return;
      }

      if (sheet.media && sheet.media.mediaText && window.matchMedia && !window.matchMedia(sheet.media.mediaText).matches) {
        // skip entire sheet because media attribute doesn't match
        return;
      }

      forEach.call(sheet.cssRules, findDeclarations);
    });

    return declarations;
  }

  function findDeclarations(rule) {
    if (rule.type === 7) {
      var value;

      // there may be a case where accessing cssText throws an error.
      // I could not reproduce this issue, but the worst that can happen
      // this way is an animation not running properly.
      // not awesome, but probably better than a script error
      // see https://github.com/rodneyrehm/viewport-units-buggyfill/issues/21
      try {
        value = rule.cssText;
      } catch(e) {
        return;
      }

      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        // KeyframesRule does not have a CSS-PropertyName
        declarations.push([rule, null, value]);
        options.hacks && options.hacks.findDeclarations(declarations, rule, null, value);
      }

      return;
    }

    if (!rule.style) {
      if (!rule.cssRules) {
        return;
      }

      forEach.call(rule.cssRules, function(_rule) {
        findDeclarations(_rule);
      });

      return;
    }

    forEach.call(rule.style, function(name) {
      var value = rule.style.getPropertyValue(name);
      // preserve those !important rules
      if (rule.style.getPropertyPriority(name)) {
        value += ' !important';
      }

      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        declarations.push([rule, name, value]);
        options.hacks && options.hacks.findDeclarations(declarations, rule, name, value);
      }
    });
  }

  function getReplacedViewportUnits() {
    dimensions = getViewport();

    var css = [];
    var buffer = [];
    var open;
    var close;

    declarations.forEach(function(item) {
      var _item = overwriteDeclaration.apply(null, item);
      var _open = _item.selector.length ? (_item.selector.join(' {\n') + ' {\n') : '';
      var _close = new Array(_item.selector.length + 1).join('\n}');

      if (!_open || _open !== open) {
        if (buffer.length) {
          css.push(open + buffer.join('\n') + close);
          buffer.length = 0;
        }

        if (_open) {
          open = _open;
          close = _close;
          buffer.push(_item.content);
        } else {
          css.push(_item.content);
          open = null;
          close = null;
        }

        return;
      }

      if (_open && !open) {
        open = _open;
        close = _close;
      }

      buffer.push(_item.content);
    });

    if (buffer.length) {
      css.push(open + buffer.join('\n') + close);
    }

    // Opera Mini messes up on the content hack (it replaces the DOM node's innerHTML with the value).
    // This fixes it. We test for Opera Mini only since it is the most expensive CSS selector
    // see https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors
    if (isOperaMini) {
      css.push('* { content: normal !important; }');
    }

    return css.join('\n\n');
  }

  function overwriteDeclaration(rule, name, value) {
    var _value;
    var _selectors = [];

    _value = value.replace(viewportUnitExpression, replaceValues);

    if (options.hacks) {
      _value = options.hacks.overwriteDeclaration(rule, name, _value);
    }

    if (name) {
      // skipping KeyframesRule
      _selectors.push(rule.selectorText);
      _value = name + ': ' + _value + ';';
    }

    var _rule = rule.parentRule;
    while (_rule) {
      _selectors.unshift('@media ' + _rule.media.mediaText);
      _rule = _rule.parentRule;
    }

    return {
      selector: _selectors,
      content: _value
    };
  }

  function replaceValues(match, number, unit) {
    var _base = dimensions[unit];
    var _number = parseFloat(number) / 100;
    return (_number * _base) + 'px';
  }

  function getViewport() {
    var vh = window.innerHeight;
    var vw = window.innerWidth;

    return {
      vh: vh,
      vw: vw,
      vmax: Math.max(vw, vh),
      vmin: Math.min(vw, vh)
    };
  }

  function importCrossOriginLinks(next) {
    var _waiting = 0;
    var decrease = function() {
      _waiting--;
      if (!_waiting) {
        next();
      }
    };

    forEach.call(document.styleSheets, function(sheet) {
      if (!sheet.href || origin(sheet.href) === origin(location.href) || sheet.ownerNode.getAttribute('data-viewport-units-buggyfill') === 'ignore') {
        // skip <style> and <link> from same origin or explicitly declared to ignore
        return;
      }

      _waiting++;
      convertLinkToStyle(sheet.ownerNode, decrease);
    });

    if (!_waiting) {
      next();
    }
  }

  function origin(url) {
    return url.slice(0, url.indexOf('/', url.indexOf('://') + 3));
  }

  function convertLinkToStyle(link, next) {
    getCors(link.href, function() {
      var style = document.createElement('style');
      style.media = link.media;
      style.setAttribute('data-href', link.href);
      style.textContent = this.responseText;
      link.parentNode.replaceChild(style, link);
      next();
    }, next);
  }

  function getCors(url, success, error) {
    var xhr = new XMLHttpRequest();
    if ('withCredentials' in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open('GET', url, true);
    } else if (typeof XDomainRequest !== 'undefined') {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open('GET', url);
    } else {
      throw new Error('cross-domain XHR not supported');
    }

    xhr.onload = success;
    xhr.onerror = error;
    xhr.send();
    return xhr;
  }

  return {
    version: '0.5.5',
    findProperties: findProperties,
    getCss: getReplacedViewportUnits,
    init: initialize,
    refresh: refresh
  };

}));

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

	// viewportunit polyfill
	viewportUnitsBuggyfill.init({
		hacks: window.viewportUnitsBuggyfillHacks
	});

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
   Module
   ========================================================================== */

var Module = (function() {

	var element = {};

	var init = function() {

	};

	return {
		init: init
	};

})();

$(document).ready(Module.init);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlYm91bmNlLmpzIiwiZHVtcC1lcnJvci5qcyIsImpxdWVyeS5qcyIsInRocm90dGxlLmpzIiwidmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsLmhhY2tzLmpzIiwidmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsLmpzIiwianF1ZXJ5LnBsYWNlaG9sZGVyLmpzIiwibWFpbi5qcyIsIm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9tVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuXG4kd2luLm9uKCdyZXNpemUnLCBkZWJvdW5jZShmdW5jdGlvbigpIHtcblx0Y29uc29sZS5sb2coJ2RlYm91bmNlJyk7XG59LCAxMDApKTtcblxuKi9cblxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG5cdHZhciB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHR9O1xuXHRcdHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdFx0aWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdH07XG59IiwiLypcblxudHJ5IHtcbiAgLy8gc3R1ZmZcbn0gY2F0Y2ggKGVycikge1xuICBkdW1wRXJyb3IoZXJyKTtcbn1cblxuKi9cblxuZnVuY3Rpb24gZHVtcEVycm9yKGVycikge1xuXHRpZiAodHlwZW9mIGVyciA9PT0gJ29iamVjdCcpIHtcblx0XHRpZiAoZXJyLm1lc3NhZ2UpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdcXG5NZXNzYWdlOiAnICsgZXJyLm1lc3NhZ2UpXG5cdFx0fVxuXHRcdGlmIChlcnIuc3RhY2spIHtcblx0XHRcdGNvbnNvbGUubG9nKCdcXG5TdGFja3RyYWNlOicpXG5cdFx0XHRjb25zb2xlLmxvZygnPT09PT09PT09PT09PT09PT09PT0nKVxuXHRcdFx0Y29uc29sZS5sb2coZXJyLnN0YWNrKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS5sb2coJ2R1bXBFcnJvciA6OiBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0Jyk7XG5cdH1cbn0iLCIvKiFcbiAqIGpRdWVyeSBKYXZhU2NyaXB0IExpYnJhcnkgdjEuMTEuM1xuICogaHR0cDovL2pxdWVyeS5jb20vXG4gKlxuICogSW5jbHVkZXMgU2l6emxlLmpzXG4gKiBodHRwOi8vc2l6emxlanMuY29tL1xuICpcbiAqIENvcHlyaWdodCAyMDA1LCAyMDE0IGpRdWVyeSBGb3VuZGF0aW9uLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTUtMDQtMjhUMTY6MTlaXG4gKi9cblxuKGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG5cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIiApIHtcbiAgICAvLyBGb3IgQ29tbW9uSlMgYW5kIENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHdoZXJlIGEgcHJvcGVyIHdpbmRvdyBpcyBwcmVzZW50LFxuICAgIC8vIGV4ZWN1dGUgdGhlIGZhY3RvcnkgYW5kIGdldCBqUXVlcnlcbiAgICAvLyBGb3IgZW52aXJvbm1lbnRzIHRoYXQgZG8gbm90IGluaGVyZW50bHkgcG9zc2VzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFxuICAgIC8vIChzdWNoIGFzIE5vZGUuanMpLCBleHBvc2UgYSBqUXVlcnktbWFraW5nIGZhY3RvcnkgYXMgbW9kdWxlLmV4cG9ydHNcbiAgICAvLyBUaGlzIGFjY2VudHVhdGVzIHRoZSBuZWVkIGZvciB0aGUgY3JlYXRpb24gb2YgYSByZWFsIHdpbmRvd1xuICAgIC8vIGUuZy4gdmFyIGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIikod2luZG93KTtcbiAgICAvLyBTZWUgdGlja2V0ICMxNDU0OSBmb3IgbW9yZSBpbmZvXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuZG9jdW1lbnQgP1xuICAgICAgZmFjdG9yeSggZ2xvYmFsLCB0cnVlICkgOlxuICAgICAgZnVuY3Rpb24oIHcgKSB7XG4gICAgICAgIGlmICggIXcuZG9jdW1lbnQgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBcImpRdWVyeSByZXF1aXJlcyBhIHdpbmRvdyB3aXRoIGEgZG9jdW1lbnRcIiApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWN0b3J5KCB3ICk7XG4gICAgICB9O1xuICB9IGVsc2Uge1xuICAgIGZhY3RvcnkoIGdsb2JhbCApO1xuICB9XG5cbi8vIFBhc3MgdGhpcyBpZiB3aW5kb3cgaXMgbm90IGRlZmluZWQgeWV0XG59KHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbiggd2luZG93LCBub0dsb2JhbCApIHtcblxuLy8gQ2FuJ3QgZG8gdGhpcyBiZWNhdXNlIHNldmVyYWwgYXBwcyBpbmNsdWRpbmcgQVNQLk5FVCB0cmFjZVxuLy8gdGhlIHN0YWNrIHZpYSBhcmd1bWVudHMuY2FsbGVyLmNhbGxlZSBhbmQgRmlyZWZveCBkaWVzIGlmXG4vLyB5b3UgdHJ5IHRvIHRyYWNlIHRocm91Z2ggXCJ1c2Ugc3RyaWN0XCIgY2FsbCBjaGFpbnMuICgjMTMzMzUpXG4vLyBTdXBwb3J0OiBGaXJlZm94IDE4K1xuLy9cblxudmFyIGRlbGV0ZWRJZHMgPSBbXTtcblxudmFyIHNsaWNlID0gZGVsZXRlZElkcy5zbGljZTtcblxudmFyIGNvbmNhdCA9IGRlbGV0ZWRJZHMuY29uY2F0O1xuXG52YXIgcHVzaCA9IGRlbGV0ZWRJZHMucHVzaDtcblxudmFyIGluZGV4T2YgPSBkZWxldGVkSWRzLmluZGV4T2Y7XG5cbnZhciBjbGFzczJ0eXBlID0ge307XG5cbnZhciB0b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmc7XG5cbnZhciBoYXNPd24gPSBjbGFzczJ0eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgc3VwcG9ydCA9IHt9O1xuXG5cblxudmFyXG4gIHZlcnNpb24gPSBcIjEuMTEuM1wiLFxuXG4gIC8vIERlZmluZSBhIGxvY2FsIGNvcHkgb2YgalF1ZXJ5XG4gIGpRdWVyeSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcbiAgICAvLyBUaGUgalF1ZXJ5IG9iamVjdCBpcyBhY3R1YWxseSBqdXN0IHRoZSBpbml0IGNvbnN0cnVjdG9yICdlbmhhbmNlZCdcbiAgICAvLyBOZWVkIGluaXQgaWYgalF1ZXJ5IGlzIGNhbGxlZCAoanVzdCBhbGxvdyBlcnJvciB0byBiZSB0aHJvd24gaWYgbm90IGluY2x1ZGVkKVxuICAgIHJldHVybiBuZXcgalF1ZXJ5LmZuLmluaXQoIHNlbGVjdG9yLCBjb250ZXh0ICk7XG4gIH0sXG5cbiAgLy8gU3VwcG9ydDogQW5kcm9pZDw0LjEsIElFPDlcbiAgLy8gTWFrZSBzdXJlIHdlIHRyaW0gQk9NIGFuZCBOQlNQXG4gIHJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLFxuXG4gIC8vIE1hdGNoZXMgZGFzaGVkIHN0cmluZyBmb3IgY2FtZWxpemluZ1xuICBybXNQcmVmaXggPSAvXi1tcy0vLFxuICByZGFzaEFscGhhID0gLy0oW1xcZGEtel0pL2dpLFxuXG4gIC8vIFVzZWQgYnkgalF1ZXJ5LmNhbWVsQ2FzZSBhcyBjYWxsYmFjayB0byByZXBsYWNlKClcbiAgZmNhbWVsQ2FzZSA9IGZ1bmN0aW9uKCBhbGwsIGxldHRlciApIHtcbiAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG4gIH07XG5cbmpRdWVyeS5mbiA9IGpRdWVyeS5wcm90b3R5cGUgPSB7XG4gIC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgalF1ZXJ5IGJlaW5nIHVzZWRcbiAganF1ZXJ5OiB2ZXJzaW9uLFxuXG4gIGNvbnN0cnVjdG9yOiBqUXVlcnksXG5cbiAgLy8gU3RhcnQgd2l0aCBhbiBlbXB0eSBzZWxlY3RvclxuICBzZWxlY3RvcjogXCJcIixcblxuICAvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcbiAgbGVuZ3RoOiAwLFxuXG4gIHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG4gIH0sXG5cbiAgLy8gR2V0IHRoZSBOdGggZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldCBPUlxuICAvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxuICBnZXQ6IGZ1bmN0aW9uKCBudW0gKSB7XG4gICAgcmV0dXJuIG51bSAhPSBudWxsID9cblxuICAgICAgLy8gUmV0dXJuIGp1c3QgdGhlIG9uZSBlbGVtZW50IGZyb20gdGhlIHNldFxuICAgICAgKCBudW0gPCAwID8gdGhpc1sgbnVtICsgdGhpcy5sZW5ndGggXSA6IHRoaXNbIG51bSBdICkgOlxuXG4gICAgICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBpbiBhIGNsZWFuIGFycmF5XG4gICAgICBzbGljZS5jYWxsKCB0aGlzICk7XG4gIH0sXG5cbiAgLy8gVGFrZSBhbiBhcnJheSBvZiBlbGVtZW50cyBhbmQgcHVzaCBpdCBvbnRvIHRoZSBzdGFja1xuICAvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcbiAgcHVzaFN0YWNrOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cbiAgICAvLyBCdWlsZCBhIG5ldyBqUXVlcnkgbWF0Y2hlZCBlbGVtZW50IHNldFxuICAgIHZhciByZXQgPSBqUXVlcnkubWVyZ2UoIHRoaXMuY29uc3RydWN0b3IoKSwgZWxlbXMgKTtcblxuICAgIC8vIEFkZCB0aGUgb2xkIG9iamVjdCBvbnRvIHRoZSBzdGFjayAoYXMgYSByZWZlcmVuY2UpXG4gICAgcmV0LnByZXZPYmplY3QgPSB0aGlzO1xuICAgIHJldC5jb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgLy8gUmV0dXJuIHRoZSBuZXdseS1mb3JtZWQgZWxlbWVudCBzZXRcbiAgICByZXR1cm4gcmV0O1xuICB9LFxuXG4gIC8vIEV4ZWN1dGUgYSBjYWxsYmFjayBmb3IgZXZlcnkgZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBzZXQuXG4gIC8vIChZb3UgY2FuIHNlZWQgdGhlIGFyZ3VtZW50cyB3aXRoIGFuIGFycmF5IG9mIGFyZ3MsIGJ1dCB0aGlzIGlzXG4gIC8vIG9ubHkgdXNlZCBpbnRlcm5hbGx5LilcbiAgZWFjaDogZnVuY3Rpb24oIGNhbGxiYWNrLCBhcmdzICkge1xuICAgIHJldHVybiBqUXVlcnkuZWFjaCggdGhpcywgY2FsbGJhY2ssIGFyZ3MgKTtcbiAgfSxcblxuICBtYXA6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcbiAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIGpRdWVyeS5tYXAodGhpcywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2suY2FsbCggZWxlbSwgaSwgZWxlbSApO1xuICAgIH0pKTtcbiAgfSxcblxuICBzbGljZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCBzbGljZS5hcHBseSggdGhpcywgYXJndW1lbnRzICkgKTtcbiAgfSxcblxuICBmaXJzdDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXEoIDAgKTtcbiAgfSxcblxuICBsYXN0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lcSggLTEgKTtcbiAgfSxcblxuICBlcTogZnVuY3Rpb24oIGkgKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoLFxuICAgICAgaiA9ICtpICsgKCBpIDwgMCA/IGxlbiA6IDAgKTtcbiAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIGogPj0gMCAmJiBqIDwgbGVuID8gWyB0aGlzW2pdIF0gOiBbXSApO1xuICB9LFxuXG4gIGVuZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJldk9iamVjdCB8fCB0aGlzLmNvbnN0cnVjdG9yKG51bGwpO1xuICB9LFxuXG4gIC8vIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgLy8gQmVoYXZlcyBsaWtlIGFuIEFycmF5J3MgbWV0aG9kLCBub3QgbGlrZSBhIGpRdWVyeSBtZXRob2QuXG4gIHB1c2g6IHB1c2gsXG4gIHNvcnQ6IGRlbGV0ZWRJZHMuc29ydCxcbiAgc3BsaWNlOiBkZWxldGVkSWRzLnNwbGljZVxufTtcblxualF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNyYywgY29weUlzQXJyYXksIGNvcHksIG5hbWUsIG9wdGlvbnMsIGNsb25lLFxuICAgIHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSxcbiAgICBpID0gMSxcbiAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgIGRlZXAgPSBmYWxzZTtcblxuICAvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG4gIGlmICggdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgKSB7XG4gICAgZGVlcCA9IHRhcmdldDtcblxuICAgIC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcbiAgICB0YXJnZXQgPSBhcmd1bWVudHNbIGkgXSB8fCB7fTtcbiAgICBpKys7XG4gIH1cblxuICAvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcbiAgaWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFqUXVlcnkuaXNGdW5jdGlvbih0YXJnZXQpICkge1xuICAgIHRhcmdldCA9IHt9O1xuICB9XG5cbiAgLy8gZXh0ZW5kIGpRdWVyeSBpdHNlbGYgaWYgb25seSBvbmUgYXJndW1lbnQgaXMgcGFzc2VkXG4gIGlmICggaSA9PT0gbGVuZ3RoICkge1xuICAgIHRhcmdldCA9IHRoaXM7XG4gICAgaS0tO1xuICB9XG5cbiAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgLy8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuICAgIGlmICggKG9wdGlvbnMgPSBhcmd1bWVudHNbIGkgXSkgIT0gbnVsbCApIHtcbiAgICAgIC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3RcbiAgICAgIGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcbiAgICAgICAgc3JjID0gdGFyZ2V0WyBuYW1lIF07XG4gICAgICAgIGNvcHkgPSBvcHRpb25zWyBuYW1lIF07XG5cbiAgICAgICAgLy8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuICAgICAgICBpZiAoIHRhcmdldCA9PT0gY29weSApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuICAgICAgICBpZiAoIGRlZXAgJiYgY29weSAmJiAoIGpRdWVyeS5pc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGpRdWVyeS5pc0FycmF5KGNvcHkpKSApICkge1xuICAgICAgICAgIGlmICggY29weUlzQXJyYXkgKSB7XG4gICAgICAgICAgICBjb3B5SXNBcnJheSA9IGZhbHNlO1xuICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsb25lID0gc3JjICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cbiAgICAgICAgICB0YXJnZXRbIG5hbWUgXSA9IGpRdWVyeS5leHRlbmQoIGRlZXAsIGNsb25lLCBjb3B5ICk7XG5cbiAgICAgICAgLy8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuICAgICAgICB9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgdGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3RcbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbmpRdWVyeS5leHRlbmQoe1xuICAvLyBVbmlxdWUgZm9yIGVhY2ggY29weSBvZiBqUXVlcnkgb24gdGhlIHBhZ2VcbiAgZXhwYW5kbzogXCJqUXVlcnlcIiArICggdmVyc2lvbiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCAvXFxEL2csIFwiXCIgKSxcblxuICAvLyBBc3N1bWUgalF1ZXJ5IGlzIHJlYWR5IHdpdGhvdXQgdGhlIHJlYWR5IG1vZHVsZVxuICBpc1JlYWR5OiB0cnVlLFxuXG4gIGVycm9yOiBmdW5jdGlvbiggbXNnICkge1xuICAgIHRocm93IG5ldyBFcnJvciggbXNnICk7XG4gIH0sXG5cbiAgbm9vcDogZnVuY3Rpb24oKSB7fSxcblxuICAvLyBTZWUgdGVzdC91bml0L2NvcmUuanMgZm9yIGRldGFpbHMgY29uY2VybmluZyBpc0Z1bmN0aW9uLlxuICAvLyBTaW5jZSB2ZXJzaW9uIDEuMywgRE9NIG1ldGhvZHMgYW5kIGZ1bmN0aW9ucyBsaWtlIGFsZXJ0XG4gIC8vIGFyZW4ndCBzdXBwb3J0ZWQuIFRoZXkgcmV0dXJuIGZhbHNlIG9uIElFICgjMjk2OCkuXG4gIGlzRnVuY3Rpb246IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgcmV0dXJuIGpRdWVyeS50eXBlKG9iaikgPT09IFwiZnVuY3Rpb25cIjtcbiAgfSxcblxuICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgcmV0dXJuIGpRdWVyeS50eXBlKG9iaikgPT09IFwiYXJyYXlcIjtcbiAgfSxcblxuICBpc1dpbmRvdzogZnVuY3Rpb24oIG9iaiApIHtcbiAgICAvKiBqc2hpbnQgZXFlcWVxOiBmYWxzZSAqL1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT0gb2JqLndpbmRvdztcbiAgfSxcblxuICBpc051bWVyaWM6IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgLy8gcGFyc2VGbG9hdCBOYU5zIG51bWVyaWMtY2FzdCBmYWxzZSBwb3NpdGl2ZXMgKG51bGx8dHJ1ZXxmYWxzZXxcIlwiKVxuICAgIC8vIC4uLmJ1dCBtaXNpbnRlcnByZXRzIGxlYWRpbmctbnVtYmVyIHN0cmluZ3MsIHBhcnRpY3VsYXJseSBoZXggbGl0ZXJhbHMgKFwiMHguLi5cIilcbiAgICAvLyBzdWJ0cmFjdGlvbiBmb3JjZXMgaW5maW5pdGllcyB0byBOYU5cbiAgICAvLyBhZGRpbmcgMSBjb3JyZWN0cyBsb3NzIG9mIHByZWNpc2lvbiBmcm9tIHBhcnNlRmxvYXQgKCMxNTEwMClcbiAgICByZXR1cm4gIWpRdWVyeS5pc0FycmF5KCBvYmogKSAmJiAob2JqIC0gcGFyc2VGbG9hdCggb2JqICkgKyAxKSA+PSAwO1xuICB9LFxuXG4gIGlzRW1wdHlPYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgdmFyIG5hbWU7XG4gICAgZm9yICggbmFtZSBpbiBvYmogKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgdmFyIGtleTtcblxuICAgIC8vIE11c3QgYmUgYW4gT2JqZWN0LlxuICAgIC8vIEJlY2F1c2Ugb2YgSUUsIHdlIGFsc28gaGF2ZSB0byBjaGVjayB0aGUgcHJlc2VuY2Ugb2YgdGhlIGNvbnN0cnVjdG9yIHByb3BlcnR5LlxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IERPTSBub2RlcyBhbmQgd2luZG93IG9iamVjdHMgZG9uJ3QgcGFzcyB0aHJvdWdoLCBhcyB3ZWxsXG4gICAgaWYgKCAhb2JqIHx8IGpRdWVyeS50eXBlKG9iaikgIT09IFwib2JqZWN0XCIgfHwgb2JqLm5vZGVUeXBlIHx8IGpRdWVyeS5pc1dpbmRvdyggb2JqICkgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3RcbiAgICAgIGlmICggb2JqLmNvbnN0cnVjdG9yICYmXG4gICAgICAgICFoYXNPd24uY2FsbChvYmosIFwiY29uc3RydWN0b3JcIikgJiZcbiAgICAgICAgIWhhc093bi5jYWxsKG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIFwiaXNQcm90b3R5cGVPZlwiKSApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgLy8gSUU4LDkgV2lsbCB0aHJvdyBleGNlcHRpb25zIG9uIGNlcnRhaW4gaG9zdCBvYmplY3RzICM5ODk3XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydDogSUU8OVxuICAgIC8vIEhhbmRsZSBpdGVyYXRpb24gb3ZlciBpbmhlcml0ZWQgcHJvcGVydGllcyBiZWZvcmUgb3duIHByb3BlcnRpZXMuXG4gICAgaWYgKCBzdXBwb3J0Lm93bkxhc3QgKSB7XG4gICAgICBmb3IgKCBrZXkgaW4gb2JqICkge1xuICAgICAgICByZXR1cm4gaGFzT3duLmNhbGwoIG9iaiwga2V5ICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gT3duIHByb3BlcnRpZXMgYXJlIGVudW1lcmF0ZWQgZmlyc3RseSwgc28gdG8gc3BlZWQgdXAsXG4gICAgLy8gaWYgbGFzdCBvbmUgaXMgb3duLCB0aGVuIGFsbCBwcm9wZXJ0aWVzIGFyZSBvd24uXG4gICAgZm9yICgga2V5IGluIG9iaiApIHt9XG5cbiAgICByZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgfHwgaGFzT3duLmNhbGwoIG9iaiwga2V5ICk7XG4gIH0sXG5cbiAgdHlwZTogZnVuY3Rpb24oIG9iaiApIHtcbiAgICBpZiAoIG9iaiA9PSBudWxsICkge1xuICAgICAgcmV0dXJuIG9iaiArIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/XG4gICAgICBjbGFzczJ0eXBlWyB0b1N0cmluZy5jYWxsKG9iaikgXSB8fCBcIm9iamVjdFwiIDpcbiAgICAgIHR5cGVvZiBvYmo7XG4gIH0sXG5cbiAgLy8gRXZhbHVhdGVzIGEgc2NyaXB0IGluIGEgZ2xvYmFsIGNvbnRleHRcbiAgLy8gV29ya2Fyb3VuZHMgYmFzZWQgb24gZmluZGluZ3MgYnkgSmltIERyaXNjb2xsXG4gIC8vIGh0dHA6Ly93ZWJsb2dzLmphdmEubmV0L2Jsb2cvZHJpc2NvbGwvYXJjaGl2ZS8yMDA5LzA5LzA4L2V2YWwtamF2YXNjcmlwdC1nbG9iYWwtY29udGV4dFxuICBnbG9iYWxFdmFsOiBmdW5jdGlvbiggZGF0YSApIHtcbiAgICBpZiAoIGRhdGEgJiYgalF1ZXJ5LnRyaW0oIGRhdGEgKSApIHtcbiAgICAgIC8vIFdlIHVzZSBleGVjU2NyaXB0IG9uIEludGVybmV0IEV4cGxvcmVyXG4gICAgICAvLyBXZSB1c2UgYW4gYW5vbnltb3VzIGZ1bmN0aW9uIHNvIHRoYXQgY29udGV4dCBpcyB3aW5kb3dcbiAgICAgIC8vIHJhdGhlciB0aGFuIGpRdWVyeSBpbiBGaXJlZm94XG4gICAgICAoIHdpbmRvdy5leGVjU2NyaXB0IHx8IGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICB3aW5kb3dbIFwiZXZhbFwiIF0uY2FsbCggd2luZG93LCBkYXRhICk7XG4gICAgICB9ICkoIGRhdGEgKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQ29udmVydCBkYXNoZWQgdG8gY2FtZWxDYXNlOyB1c2VkIGJ5IHRoZSBjc3MgYW5kIGRhdGEgbW9kdWxlc1xuICAvLyBNaWNyb3NvZnQgZm9yZ290IHRvIGh1bXAgdGhlaXIgdmVuZG9yIHByZWZpeCAoIzk1NzIpXG4gIGNhbWVsQ2FzZTogZnVuY3Rpb24oIHN0cmluZyApIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoIHJtc1ByZWZpeCwgXCJtcy1cIiApLnJlcGxhY2UoIHJkYXNoQWxwaGEsIGZjYW1lbENhc2UgKTtcbiAgfSxcblxuICBub2RlTmFtZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG4gICAgcmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gIH0sXG5cbiAgLy8gYXJncyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuICBlYWNoOiBmdW5jdGlvbiggb2JqLCBjYWxsYmFjaywgYXJncyApIHtcbiAgICB2YXIgdmFsdWUsXG4gICAgICBpID0gMCxcbiAgICAgIGxlbmd0aCA9IG9iai5sZW5ndGgsXG4gICAgICBpc0FycmF5ID0gaXNBcnJheWxpa2UoIG9iaiApO1xuXG4gICAgaWYgKCBhcmdzICkge1xuICAgICAgaWYgKCBpc0FycmF5ICkge1xuICAgICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmFwcGx5KCBvYmpbIGkgXSwgYXJncyApO1xuXG4gICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoIGkgaW4gb2JqICkge1xuICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suYXBwbHkoIG9ialsgaSBdLCBhcmdzICk7XG5cbiAgICAgICAgICBpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgLy8gQSBzcGVjaWFsLCBmYXN0LCBjYXNlIGZvciB0aGUgbW9zdCBjb21tb24gdXNlIG9mIGVhY2hcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCBpc0FycmF5ICkge1xuICAgICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApO1xuXG4gICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoIGkgaW4gb2JqICkge1xuICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICk7XG5cbiAgICAgICAgICBpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH0sXG5cbiAgLy8gU3VwcG9ydDogQW5kcm9pZDw0LjEsIElFPDlcbiAgdHJpbTogZnVuY3Rpb24oIHRleHQgKSB7XG4gICAgcmV0dXJuIHRleHQgPT0gbnVsbCA/XG4gICAgICBcIlwiIDpcbiAgICAgICggdGV4dCArIFwiXCIgKS5yZXBsYWNlKCBydHJpbSwgXCJcIiApO1xuICB9LFxuXG4gIC8vIHJlc3VsdHMgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcbiAgbWFrZUFycmF5OiBmdW5jdGlvbiggYXJyLCByZXN1bHRzICkge1xuICAgIHZhciByZXQgPSByZXN1bHRzIHx8IFtdO1xuXG4gICAgaWYgKCBhcnIgIT0gbnVsbCApIHtcbiAgICAgIGlmICggaXNBcnJheWxpa2UoIE9iamVjdChhcnIpICkgKSB7XG4gICAgICAgIGpRdWVyeS5tZXJnZSggcmV0LFxuICAgICAgICAgIHR5cGVvZiBhcnIgPT09IFwic3RyaW5nXCIgP1xuICAgICAgICAgIFsgYXJyIF0gOiBhcnJcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHB1c2guY2FsbCggcmV0LCBhcnIgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9LFxuXG4gIGluQXJyYXk6IGZ1bmN0aW9uKCBlbGVtLCBhcnIsIGkgKSB7XG4gICAgdmFyIGxlbjtcblxuICAgIGlmICggYXJyICkge1xuICAgICAgaWYgKCBpbmRleE9mICkge1xuICAgICAgICByZXR1cm4gaW5kZXhPZi5jYWxsKCBhcnIsIGVsZW0sIGkgKTtcbiAgICAgIH1cblxuICAgICAgbGVuID0gYXJyLmxlbmd0aDtcbiAgICAgIGkgPSBpID8gaSA8IDAgPyBNYXRoLm1heCggMCwgbGVuICsgaSApIDogaSA6IDA7XG5cbiAgICAgIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgICAvLyBTa2lwIGFjY2Vzc2luZyBpbiBzcGFyc2UgYXJyYXlzXG4gICAgICAgIGlmICggaSBpbiBhcnIgJiYgYXJyWyBpIF0gPT09IGVsZW0gKSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gLTE7XG4gIH0sXG5cbiAgbWVyZ2U6IGZ1bmN0aW9uKCBmaXJzdCwgc2Vjb25kICkge1xuICAgIHZhciBsZW4gPSArc2Vjb25kLmxlbmd0aCxcbiAgICAgIGogPSAwLFxuICAgICAgaSA9IGZpcnN0Lmxlbmd0aDtcblxuICAgIHdoaWxlICggaiA8IGxlbiApIHtcbiAgICAgIGZpcnN0WyBpKysgXSA9IHNlY29uZFsgaisrIF07XG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydDogSUU8OVxuICAgIC8vIFdvcmthcm91bmQgY2FzdGluZyBvZiAubGVuZ3RoIHRvIE5hTiBvbiBvdGhlcndpc2UgYXJyYXlsaWtlIG9iamVjdHMgKGUuZy4sIE5vZGVMaXN0cylcbiAgICBpZiAoIGxlbiAhPT0gbGVuICkge1xuICAgICAgd2hpbGUgKCBzZWNvbmRbal0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgZmlyc3RbIGkrKyBdID0gc2Vjb25kWyBqKysgXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmaXJzdC5sZW5ndGggPSBpO1xuXG4gICAgcmV0dXJuIGZpcnN0O1xuICB9LFxuXG4gIGdyZXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGludmVydCApIHtcbiAgICB2YXIgY2FsbGJhY2tJbnZlcnNlLFxuICAgICAgbWF0Y2hlcyA9IFtdLFxuICAgICAgaSA9IDAsXG4gICAgICBsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG4gICAgICBjYWxsYmFja0V4cGVjdCA9ICFpbnZlcnQ7XG5cbiAgICAvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXG4gICAgLy8gdGhhdCBwYXNzIHRoZSB2YWxpZGF0b3IgZnVuY3Rpb25cbiAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgIGNhbGxiYWNrSW52ZXJzZSA9ICFjYWxsYmFjayggZWxlbXNbIGkgXSwgaSApO1xuICAgICAgaWYgKCBjYWxsYmFja0ludmVyc2UgIT09IGNhbGxiYWNrRXhwZWN0ICkge1xuICAgICAgICBtYXRjaGVzLnB1c2goIGVsZW1zWyBpIF0gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfSxcblxuICAvLyBhcmcgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcbiAgbWFwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBhcmcgKSB7XG4gICAgdmFyIHZhbHVlLFxuICAgICAgaSA9IDAsXG4gICAgICBsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG4gICAgICBpc0FycmF5ID0gaXNBcnJheWxpa2UoIGVsZW1zICksXG4gICAgICByZXQgPSBbXTtcblxuICAgIC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCB0cmFuc2xhdGluZyBlYWNoIG9mIHRoZSBpdGVtcyB0byB0aGVpciBuZXcgdmFsdWVzXG4gICAgaWYgKCBpc0FycmF5ICkge1xuICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG4gICAgICAgIGlmICggdmFsdWUgIT0gbnVsbCApIHtcbiAgICAgICAgICByZXQucHVzaCggdmFsdWUgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgLy8gR28gdGhyb3VnaCBldmVyeSBrZXkgb24gdGhlIG9iamVjdCxcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICggaSBpbiBlbGVtcyApIHtcbiAgICAgICAgdmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cbiAgICAgICAgaWYgKCB2YWx1ZSAhPSBudWxsICkge1xuICAgICAgICAgIHJldC5wdXNoKCB2YWx1ZSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuICAgIHJldHVybiBjb25jYXQuYXBwbHkoIFtdLCByZXQgKTtcbiAgfSxcblxuICAvLyBBIGdsb2JhbCBHVUlEIGNvdW50ZXIgZm9yIG9iamVjdHNcbiAgZ3VpZDogMSxcblxuICAvLyBCaW5kIGEgZnVuY3Rpb24gdG8gYSBjb250ZXh0LCBvcHRpb25hbGx5IHBhcnRpYWxseSBhcHBseWluZyBhbnlcbiAgLy8gYXJndW1lbnRzLlxuICBwcm94eTogZnVuY3Rpb24oIGZuLCBjb250ZXh0ICkge1xuICAgIHZhciBhcmdzLCBwcm94eSwgdG1wO1xuXG4gICAgaWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHRtcCA9IGZuWyBjb250ZXh0IF07XG4gICAgICBjb250ZXh0ID0gZm47XG4gICAgICBmbiA9IHRtcDtcbiAgICB9XG5cbiAgICAvLyBRdWljayBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGFyZ2V0IGlzIGNhbGxhYmxlLCBpbiB0aGUgc3BlY1xuICAgIC8vIHRoaXMgdGhyb3dzIGEgVHlwZUVycm9yLCBidXQgd2Ugd2lsbCBqdXN0IHJldHVybiB1bmRlZmluZWQuXG4gICAgaWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIGZuICkgKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIFNpbXVsYXRlZCBiaW5kXG4gICAgYXJncyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuICAgIHByb3h5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoIGNvbnRleHQgfHwgdGhpcywgYXJncy5jb25jYXQoIHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApICkgKTtcbiAgICB9O1xuXG4gICAgLy8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXG4gICAgcHJveHkuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IGpRdWVyeS5ndWlkKys7XG5cbiAgICByZXR1cm4gcHJveHk7XG4gIH0sXG5cbiAgbm93OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKyggbmV3IERhdGUoKSApO1xuICB9LFxuXG4gIC8vIGpRdWVyeS5zdXBwb3J0IGlzIG5vdCB1c2VkIGluIENvcmUgYnV0IG90aGVyIHByb2plY3RzIGF0dGFjaCB0aGVpclxuICAvLyBwcm9wZXJ0aWVzIHRvIGl0IHNvIGl0IG5lZWRzIHRvIGV4aXN0LlxuICBzdXBwb3J0OiBzdXBwb3J0XG59KTtcblxuLy8gUG9wdWxhdGUgdGhlIGNsYXNzMnR5cGUgbWFwXG5qUXVlcnkuZWFjaChcIkJvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QgRXJyb3JcIi5zcGxpdChcIiBcIiksIGZ1bmN0aW9uKGksIG5hbWUpIHtcbiAgY2xhc3MydHlwZVsgXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiIF0gPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG59KTtcblxuZnVuY3Rpb24gaXNBcnJheWxpa2UoIG9iaiApIHtcblxuICAvLyBTdXBwb3J0OiBpT1MgOC4yIChub3QgcmVwcm9kdWNpYmxlIGluIHNpbXVsYXRvcilcbiAgLy8gYGluYCBjaGVjayB1c2VkIHRvIHByZXZlbnQgSklUIGVycm9yIChnaC0yMTQ1KVxuICAvLyBoYXNPd24gaXNuJ3QgdXNlZCBoZXJlIGR1ZSB0byBmYWxzZSBuZWdhdGl2ZXNcbiAgLy8gcmVnYXJkaW5nIE5vZGVsaXN0IGxlbmd0aCBpbiBJRVxuICB2YXIgbGVuZ3RoID0gXCJsZW5ndGhcIiBpbiBvYmogJiYgb2JqLmxlbmd0aCxcbiAgICB0eXBlID0galF1ZXJ5LnR5cGUoIG9iaiApO1xuXG4gIGlmICggdHlwZSA9PT0gXCJmdW5jdGlvblwiIHx8IGpRdWVyeS5pc1dpbmRvdyggb2JqICkgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCBvYmoubm9kZVR5cGUgPT09IDEgJiYgbGVuZ3RoICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGUgPT09IFwiYXJyYXlcIiB8fCBsZW5ndGggPT09IDAgfHxcbiAgICB0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiICYmIGxlbmd0aCA+IDAgJiYgKCBsZW5ndGggLSAxICkgaW4gb2JqO1xufVxudmFyIFNpenpsZSA9XG4vKiFcbiAqIFNpenpsZSBDU1MgU2VsZWN0b3IgRW5naW5lIHYyLjIuMC1wcmVcbiAqIGh0dHA6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IDIwMDgsIDIwMTQgalF1ZXJ5IEZvdW5kYXRpb24sIEluYy4gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNC0xMi0xNlxuICovXG4oZnVuY3Rpb24oIHdpbmRvdyApIHtcblxudmFyIGksXG4gIHN1cHBvcnQsXG4gIEV4cHIsXG4gIGdldFRleHQsXG4gIGlzWE1MLFxuICB0b2tlbml6ZSxcbiAgY29tcGlsZSxcbiAgc2VsZWN0LFxuICBvdXRlcm1vc3RDb250ZXh0LFxuICBzb3J0SW5wdXQsXG4gIGhhc0R1cGxpY2F0ZSxcblxuICAvLyBMb2NhbCBkb2N1bWVudCB2YXJzXG4gIHNldERvY3VtZW50LFxuICBkb2N1bWVudCxcbiAgZG9jRWxlbSxcbiAgZG9jdW1lbnRJc0hUTUwsXG4gIHJidWdneVFTQSxcbiAgcmJ1Z2d5TWF0Y2hlcyxcbiAgbWF0Y2hlcyxcbiAgY29udGFpbnMsXG5cbiAgLy8gSW5zdGFuY2Utc3BlY2lmaWMgZGF0YVxuICBleHBhbmRvID0gXCJzaXp6bGVcIiArIDEgKiBuZXcgRGF0ZSgpLFxuICBwcmVmZXJyZWREb2MgPSB3aW5kb3cuZG9jdW1lbnQsXG4gIGRpcnJ1bnMgPSAwLFxuICBkb25lID0gMCxcbiAgY2xhc3NDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG4gIHRva2VuQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuICBjb21waWxlckNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcbiAgc29ydE9yZGVyID0gZnVuY3Rpb24oIGEsIGIgKSB7XG4gICAgaWYgKCBhID09PSBiICkge1xuICAgICAgaGFzRHVwbGljYXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH0sXG5cbiAgLy8gR2VuZXJhbC1wdXJwb3NlIGNvbnN0YW50c1xuICBNQVhfTkVHQVRJVkUgPSAxIDw8IDMxLFxuXG4gIC8vIEluc3RhbmNlIG1ldGhvZHNcbiAgaGFzT3duID0gKHt9KS5oYXNPd25Qcm9wZXJ0eSxcbiAgYXJyID0gW10sXG4gIHBvcCA9IGFyci5wb3AsXG4gIHB1c2hfbmF0aXZlID0gYXJyLnB1c2gsXG4gIHB1c2ggPSBhcnIucHVzaCxcbiAgc2xpY2UgPSBhcnIuc2xpY2UsXG4gIC8vIFVzZSBhIHN0cmlwcGVkLWRvd24gaW5kZXhPZiBhcyBpdCdzIGZhc3RlciB0aGFuIG5hdGl2ZVxuICAvLyBodHRwOi8vanNwZXJmLmNvbS90aG9yLWluZGV4b2YtdnMtZm9yLzVcbiAgaW5kZXhPZiA9IGZ1bmN0aW9uKCBsaXN0LCBlbGVtICkge1xuICAgIHZhciBpID0gMCxcbiAgICAgIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgaWYgKCBsaXN0W2ldID09PSBlbGVtICkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9LFxuXG4gIGJvb2xlYW5zID0gXCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFwiLFxuXG4gIC8vIFJlZ3VsYXIgZXhwcmVzc2lvbnNcblxuICAvLyBXaGl0ZXNwYWNlIGNoYXJhY3RlcnMgaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zZWxlY3RvcnMvI3doaXRlc3BhY2VcbiAgd2hpdGVzcGFjZSA9IFwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixcbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zeW50YXgvI2NoYXJhY3RlcnNcbiAgY2hhcmFjdGVyRW5jb2RpbmcgPSBcIig/OlxcXFxcXFxcLnxbXFxcXHctXXxbXlxcXFx4MDAtXFxcXHhhMF0pK1wiLFxuXG4gIC8vIExvb3NlbHkgbW9kZWxlZCBvbiBDU1MgaWRlbnRpZmllciBjaGFyYWN0ZXJzXG4gIC8vIEFuIHVucXVvdGVkIHZhbHVlIHNob3VsZCBiZSBhIENTUyBpZGVudGlmaWVyIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyNhdHRyaWJ1dGUtc2VsZWN0b3JzXG4gIC8vIFByb3BlciBzeW50YXg6IGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCN2YWx1ZS1kZWYtaWRlbnRpZmllclxuICBpZGVudGlmaWVyID0gY2hhcmFjdGVyRW5jb2RpbmcucmVwbGFjZSggXCJ3XCIsIFwidyNcIiApLFxuXG4gIC8vIEF0dHJpYnV0ZSBzZWxlY3RvcnM6IGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuICBhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpKD86XCIgKyB3aGl0ZXNwYWNlICtcbiAgICAvLyBPcGVyYXRvciAoY2FwdHVyZSAyKVxuICAgIFwiKihbKl4kfCF+XT89KVwiICsgd2hpdGVzcGFjZSArXG4gICAgLy8gXCJBdHRyaWJ1dGUgdmFsdWVzIG11c3QgYmUgQ1NTIGlkZW50aWZpZXJzIFtjYXB0dXJlIDVdIG9yIHN0cmluZ3MgW2NhcHR1cmUgMyBvciBjYXB0dXJlIDRdXCJcbiAgICBcIiooPzonKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCJ8KFwiICsgaWRlbnRpZmllciArIFwiKSl8KVwiICsgd2hpdGVzcGFjZSArXG4gICAgXCIqXFxcXF1cIixcblxuICBwc2V1ZG9zID0gXCI6KFwiICsgY2hhcmFjdGVyRW5jb2RpbmcgKyBcIikoPzpcXFxcKChcIiArXG4gICAgLy8gVG8gcmVkdWNlIHRoZSBudW1iZXIgb2Ygc2VsZWN0b3JzIG5lZWRpbmcgdG9rZW5pemUgaW4gdGhlIHByZUZpbHRlciwgcHJlZmVyIGFyZ3VtZW50czpcbiAgICAvLyAxLiBxdW90ZWQgKGNhcHR1cmUgMzsgY2FwdHVyZSA0IG9yIGNhcHR1cmUgNSlcbiAgICBcIignKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCIpfFwiICtcbiAgICAvLyAyLiBzaW1wbGUgKGNhcHR1cmUgNilcbiAgICBcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIiArIGF0dHJpYnV0ZXMgKyBcIikqKXxcIiArXG4gICAgLy8gMy4gYW55dGhpbmcgZWxzZSAoY2FwdHVyZSAyKVxuICAgIFwiLipcIiArXG4gICAgXCIpXFxcXCl8KVwiLFxuXG4gIC8vIExlYWRpbmcgYW5kIG5vbi1lc2NhcGVkIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGNhcHR1cmluZyBzb21lIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlcnMgcHJlY2VkaW5nIHRoZSBsYXR0ZXJcbiAgcndoaXRlc3BhY2UgPSBuZXcgUmVnRXhwKCB3aGl0ZXNwYWNlICsgXCIrXCIsIFwiZ1wiICksXG4gIHJ0cmltID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIrfCgoPzpefFteXFxcXFxcXFxdKSg/OlxcXFxcXFxcLikqKVwiICsgd2hpdGVzcGFjZSArIFwiKyRcIiwgXCJnXCIgKSxcblxuICByY29tbWEgPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIiosXCIgKyB3aGl0ZXNwYWNlICsgXCIqXCIgKSxcbiAgcmNvbWJpbmF0b3JzID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFs+K35dfFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG5cbiAgcmF0dHJpYnV0ZVF1b3RlcyA9IG5ldyBSZWdFeHAoIFwiPVwiICsgd2hpdGVzcGFjZSArIFwiKihbXlxcXFxdJ1xcXCJdKj8pXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXF1cIiwgXCJnXCIgKSxcblxuICBycHNldWRvID0gbmV3IFJlZ0V4cCggcHNldWRvcyApLFxuICByaWRlbnRpZmllciA9IG5ldyBSZWdFeHAoIFwiXlwiICsgaWRlbnRpZmllciArIFwiJFwiICksXG5cbiAgbWF0Y2hFeHByID0ge1xuICAgIFwiSURcIjogbmV3IFJlZ0V4cCggXCJeIyhcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIgKSxcbiAgICBcIkNMQVNTXCI6IG5ldyBSZWdFeHAoIFwiXlxcXFwuKFwiICsgY2hhcmFjdGVyRW5jb2RpbmcgKyBcIilcIiApLFxuICAgIFwiVEFHXCI6IG5ldyBSZWdFeHAoIFwiXihcIiArIGNoYXJhY3RlckVuY29kaW5nLnJlcGxhY2UoIFwid1wiLCBcIncqXCIgKSArIFwiKVwiICksXG4gICAgXCJBVFRSXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgYXR0cmlidXRlcyApLFxuICAgIFwiUFNFVURPXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgcHNldWRvcyApLFxuICAgIFwiQ0hJTERcIjogbmV3IFJlZ0V4cCggXCJeOihvbmx5fGZpcnN0fGxhc3R8bnRofG50aC1sYXN0KS0oY2hpbGR8b2YtdHlwZSkoPzpcXFxcKFwiICsgd2hpdGVzcGFjZSArXG4gICAgICBcIiooZXZlbnxvZGR8KChbKy1dfCkoXFxcXGQqKW58KVwiICsgd2hpdGVzcGFjZSArIFwiKig/OihbKy1dfClcIiArIHdoaXRlc3BhY2UgK1xuICAgICAgXCIqKFxcXFxkKyl8KSlcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpXCIsIFwiaVwiICksXG4gICAgXCJib29sXCI6IG5ldyBSZWdFeHAoIFwiXig/OlwiICsgYm9vbGVhbnMgKyBcIikkXCIsIFwiaVwiICksXG4gICAgLy8gRm9yIHVzZSBpbiBsaWJyYXJpZXMgaW1wbGVtZW50aW5nIC5pcygpXG4gICAgLy8gV2UgdXNlIHRoaXMgZm9yIFBPUyBtYXRjaGluZyBpbiBgc2VsZWN0YFxuICAgIFwibmVlZHNDb250ZXh0XCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXChcIiArXG4gICAgICB3aGl0ZXNwYWNlICsgXCIqKCg/Oi1cXFxcZCk/XFxcXGQqKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfCkoPz1bXi1dfCQpXCIsIFwiaVwiIClcbiAgfSxcblxuICByaW5wdXRzID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxcbiAgcmhlYWRlciA9IC9eaFxcZCQvaSxcblxuICBybmF0aXZlID0gL15bXntdK1xce1xccypcXFtuYXRpdmUgXFx3LyxcblxuICAvLyBFYXNpbHktcGFyc2VhYmxlL3JldHJpZXZhYmxlIElEIG9yIFRBRyBvciBDTEFTUyBzZWxlY3RvcnNcbiAgcnF1aWNrRXhwciA9IC9eKD86IyhbXFx3LV0rKXwoXFx3Kyl8XFwuKFtcXHctXSspKSQvLFxuXG4gIHJzaWJsaW5nID0gL1srfl0vLFxuICByZXNjYXBlID0gLyd8XFxcXC9nLFxuXG4gIC8vIENTUyBlc2NhcGVzIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCNlc2NhcGVkLWNoYXJhY3RlcnNcbiAgcnVuZXNjYXBlID0gbmV3IFJlZ0V4cCggXCJcXFxcXFxcXChbXFxcXGRhLWZdezEsNn1cIiArIHdoaXRlc3BhY2UgKyBcIj98KFwiICsgd2hpdGVzcGFjZSArIFwiKXwuKVwiLCBcImlnXCIgKSxcbiAgZnVuZXNjYXBlID0gZnVuY3Rpb24oIF8sIGVzY2FwZWQsIGVzY2FwZWRXaGl0ZXNwYWNlICkge1xuICAgIHZhciBoaWdoID0gXCIweFwiICsgZXNjYXBlZCAtIDB4MTAwMDA7XG4gICAgLy8gTmFOIG1lYW5zIG5vbi1jb2RlcG9pbnRcbiAgICAvLyBTdXBwb3J0OiBGaXJlZm94PDI0XG4gICAgLy8gV29ya2Fyb3VuZCBlcnJvbmVvdXMgbnVtZXJpYyBpbnRlcnByZXRhdGlvbiBvZiArXCIweFwiXG4gICAgcmV0dXJuIGhpZ2ggIT09IGhpZ2ggfHwgZXNjYXBlZFdoaXRlc3BhY2UgP1xuICAgICAgZXNjYXBlZCA6XG4gICAgICBoaWdoIDwgMCA/XG4gICAgICAgIC8vIEJNUCBjb2RlcG9pbnRcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCArIDB4MTAwMDAgKSA6XG4gICAgICAgIC8vIFN1cHBsZW1lbnRhbCBQbGFuZSBjb2RlcG9pbnQgKHN1cnJvZ2F0ZSBwYWlyKVxuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoID4+IDEwIHwgMHhEODAwLCBoaWdoICYgMHgzRkYgfCAweERDMDAgKTtcbiAgfSxcblxuICAvLyBVc2VkIGZvciBpZnJhbWVzXG4gIC8vIFNlZSBzZXREb2N1bWVudCgpXG4gIC8vIFJlbW92aW5nIHRoZSBmdW5jdGlvbiB3cmFwcGVyIGNhdXNlcyBhIFwiUGVybWlzc2lvbiBEZW5pZWRcIlxuICAvLyBlcnJvciBpbiBJRVxuICB1bmxvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgc2V0RG9jdW1lbnQoKTtcbiAgfTtcblxuLy8gT3B0aW1pemUgZm9yIHB1c2guYXBwbHkoIF8sIE5vZGVMaXN0IClcbnRyeSB7XG4gIHB1c2guYXBwbHkoXG4gICAgKGFyciA9IHNsaWNlLmNhbGwoIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzICkpLFxuICAgIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzXG4gICk7XG4gIC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4wXG4gIC8vIERldGVjdCBzaWxlbnRseSBmYWlsaW5nIHB1c2guYXBwbHlcbiAgYXJyWyBwcmVmZXJyZWREb2MuY2hpbGROb2Rlcy5sZW5ndGggXS5ub2RlVHlwZTtcbn0gY2F0Y2ggKCBlICkge1xuICBwdXNoID0geyBhcHBseTogYXJyLmxlbmd0aCA/XG5cbiAgICAvLyBMZXZlcmFnZSBzbGljZSBpZiBwb3NzaWJsZVxuICAgIGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcbiAgICAgIHB1c2hfbmF0aXZlLmFwcGx5KCB0YXJnZXQsIHNsaWNlLmNhbGwoZWxzKSApO1xuICAgIH0gOlxuXG4gICAgLy8gU3VwcG9ydDogSUU8OVxuICAgIC8vIE90aGVyd2lzZSBhcHBlbmQgZGlyZWN0bHlcbiAgICBmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG4gICAgICB2YXIgaiA9IHRhcmdldC5sZW5ndGgsXG4gICAgICAgIGkgPSAwO1xuICAgICAgLy8gQ2FuJ3QgdHJ1c3QgTm9kZUxpc3QubGVuZ3RoXG4gICAgICB3aGlsZSAoICh0YXJnZXRbaisrXSA9IGVsc1tpKytdKSApIHt9XG4gICAgICB0YXJnZXQubGVuZ3RoID0gaiAtIDE7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuICB2YXIgbWF0Y2gsIGVsZW0sIG0sIG5vZGVUeXBlLFxuICAgIC8vIFFTQSB2YXJzXG4gICAgaSwgZ3JvdXBzLCBvbGQsIG5pZCwgbmV3Q29udGV4dCwgbmV3U2VsZWN0b3I7XG5cbiAgaWYgKCAoIGNvbnRleHQgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IHByZWZlcnJlZERvYyApICE9PSBkb2N1bWVudCApIHtcbiAgICBzZXREb2N1bWVudCggY29udGV4dCApO1xuICB9XG5cbiAgY29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG4gIHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuICBub2RlVHlwZSA9IGNvbnRleHQubm9kZVR5cGU7XG5cbiAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgfHwgIXNlbGVjdG9yIHx8XG4gICAgbm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgJiYgbm9kZVR5cGUgIT09IDExICkge1xuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBpZiAoICFzZWVkICYmIGRvY3VtZW50SXNIVE1MICkge1xuXG4gICAgLy8gVHJ5IHRvIHNob3J0Y3V0IGZpbmQgb3BlcmF0aW9ucyB3aGVuIHBvc3NpYmxlIChlLmcuLCBub3QgdW5kZXIgRG9jdW1lbnRGcmFnbWVudClcbiAgICBpZiAoIG5vZGVUeXBlICE9PSAxMSAmJiAobWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoIHNlbGVjdG9yICkpICkge1xuICAgICAgLy8gU3BlZWQtdXA6IFNpenpsZShcIiNJRFwiKVxuICAgICAgaWYgKCAobSA9IG1hdGNoWzFdKSApIHtcbiAgICAgICAgaWYgKCBub2RlVHlwZSA9PT0gOSApIHtcbiAgICAgICAgICBlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApO1xuICAgICAgICAgIC8vIENoZWNrIHBhcmVudE5vZGUgdG8gY2F0Y2ggd2hlbiBCbGFja2JlcnJ5IDQuNiByZXR1cm5zXG4gICAgICAgICAgLy8gbm9kZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIGluIHRoZSBkb2N1bWVudCAoalF1ZXJ5ICM2OTYzKVxuICAgICAgICAgIGlmICggZWxlbSAmJiBlbGVtLnBhcmVudE5vZGUgKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgSUUsIE9wZXJhLCBhbmQgV2Via2l0IHJldHVybiBpdGVtc1xuICAgICAgICAgICAgLy8gYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG4gICAgICAgICAgICBpZiAoIGVsZW0uaWQgPT09IG0gKSB7XG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCggZWxlbSApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIENvbnRleHQgaXMgbm90IGEgZG9jdW1lbnRcbiAgICAgICAgICBpZiAoIGNvbnRleHQub3duZXJEb2N1bWVudCAmJiAoZWxlbSA9IGNvbnRleHQub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZCggbSApKSAmJlxuICAgICAgICAgICAgY29udGFpbnMoIGNvbnRleHQsIGVsZW0gKSAmJiBlbGVtLmlkID09PSBtICkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKCBlbGVtICk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgLy8gU3BlZWQtdXA6IFNpenpsZShcIlRBR1wiKVxuICAgICAgfSBlbHNlIGlmICggbWF0Y2hbMl0gKSB7XG4gICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHNlbGVjdG9yICkgKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG5cbiAgICAgIC8vIFNwZWVkLXVwOiBTaXp6bGUoXCIuQ0xBU1NcIilcbiAgICAgIH0gZWxzZSBpZiAoIChtID0gbWF0Y2hbM10pICYmIHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApIHtcbiAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBtICkgKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUVNBIHBhdGhcbiAgICBpZiAoIHN1cHBvcnQucXNhICYmICghcmJ1Z2d5UVNBIHx8ICFyYnVnZ3lRU0EudGVzdCggc2VsZWN0b3IgKSkgKSB7XG4gICAgICBuaWQgPSBvbGQgPSBleHBhbmRvO1xuICAgICAgbmV3Q29udGV4dCA9IGNvbnRleHQ7XG4gICAgICBuZXdTZWxlY3RvciA9IG5vZGVUeXBlICE9PSAxICYmIHNlbGVjdG9yO1xuXG4gICAgICAvLyBxU0Egd29ya3Mgc3RyYW5nZWx5IG9uIEVsZW1lbnQtcm9vdGVkIHF1ZXJpZXNcbiAgICAgIC8vIFdlIGNhbiB3b3JrIGFyb3VuZCB0aGlzIGJ5IHNwZWNpZnlpbmcgYW4gZXh0cmEgSUQgb24gdGhlIHJvb3RcbiAgICAgIC8vIGFuZCB3b3JraW5nIHVwIGZyb20gdGhlcmUgKFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGUgdGVjaG5pcXVlKVxuICAgICAgLy8gSUUgOCBkb2Vzbid0IHdvcmsgb24gb2JqZWN0IGVsZW1lbnRzXG4gICAgICBpZiAoIG5vZGVUeXBlID09PSAxICYmIGNvbnRleHQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJvYmplY3RcIiApIHtcbiAgICAgICAgZ3JvdXBzID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cbiAgICAgICAgaWYgKCAob2xkID0gY29udGV4dC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSkgKSB7XG4gICAgICAgICAgbmlkID0gb2xkLnJlcGxhY2UoIHJlc2NhcGUsIFwiXFxcXCQmXCIgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250ZXh0LnNldEF0dHJpYnV0ZSggXCJpZFwiLCBuaWQgKTtcbiAgICAgICAgfVxuICAgICAgICBuaWQgPSBcIltpZD0nXCIgKyBuaWQgKyBcIiddIFwiO1xuXG4gICAgICAgIGkgPSBncm91cHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICBncm91cHNbaV0gPSBuaWQgKyB0b1NlbGVjdG9yKCBncm91cHNbaV0gKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdDb250ZXh0ID0gcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dDtcbiAgICAgICAgbmV3U2VsZWN0b3IgPSBncm91cHMuam9pbihcIixcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICggbmV3U2VsZWN0b3IgKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cyxcbiAgICAgICAgICAgIG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbCggbmV3U2VsZWN0b3IgKVxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2gocXNhRXJyb3IpIHtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoICFvbGQgKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEFsbCBvdGhlcnNcbiAgcmV0dXJuIHNlbGVjdCggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGtleS12YWx1ZSBjYWNoZXMgb2YgbGltaXRlZCBzaXplXG4gKiBAcmV0dXJucyB7RnVuY3Rpb24oc3RyaW5nLCBPYmplY3QpfSBSZXR1cm5zIHRoZSBPYmplY3QgZGF0YSBhZnRlciBzdG9yaW5nIGl0IG9uIGl0c2VsZiB3aXRoXG4gKiAgcHJvcGVydHkgbmFtZSB0aGUgKHNwYWNlLXN1ZmZpeGVkKSBzdHJpbmcgYW5kIChpZiB0aGUgY2FjaGUgaXMgbGFyZ2VyIHRoYW4gRXhwci5jYWNoZUxlbmd0aClcbiAqICBkZWxldGluZyB0aGUgb2xkZXN0IGVudHJ5XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNhY2hlKCkge1xuICB2YXIga2V5cyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGNhY2hlKCBrZXksIHZhbHVlICkge1xuICAgIC8vIFVzZSAoa2V5ICsgXCIgXCIpIHRvIGF2b2lkIGNvbGxpc2lvbiB3aXRoIG5hdGl2ZSBwcm90b3R5cGUgcHJvcGVydGllcyAoc2VlIElzc3VlICMxNTcpXG4gICAgaWYgKCBrZXlzLnB1c2goIGtleSArIFwiIFwiICkgPiBFeHByLmNhY2hlTGVuZ3RoICkge1xuICAgICAgLy8gT25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBlbnRyaWVzXG4gICAgICBkZWxldGUgY2FjaGVbIGtleXMuc2hpZnQoKSBdO1xuICAgIH1cbiAgICByZXR1cm4gKGNhY2hlWyBrZXkgKyBcIiBcIiBdID0gdmFsdWUpO1xuICB9XG4gIHJldHVybiBjYWNoZTtcbn1cblxuLyoqXG4gKiBNYXJrIGEgZnVuY3Rpb24gZm9yIHNwZWNpYWwgdXNlIGJ5IFNpenpsZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1hcmtcbiAqL1xuZnVuY3Rpb24gbWFya0Z1bmN0aW9uKCBmbiApIHtcbiAgZm5bIGV4cGFuZG8gXSA9IHRydWU7XG4gIHJldHVybiBmbjtcbn1cblxuLyoqXG4gKiBTdXBwb3J0IHRlc3RpbmcgdXNpbmcgYW4gZWxlbWVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gUGFzc2VkIHRoZSBjcmVhdGVkIGRpdiBhbmQgZXhwZWN0cyBhIGJvb2xlYW4gcmVzdWx0XG4gKi9cbmZ1bmN0aW9uIGFzc2VydCggZm4gKSB7XG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oIGRpdiApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGZpbmFsbHkge1xuICAgIC8vIFJlbW92ZSBmcm9tIGl0cyBwYXJlbnQgYnkgZGVmYXVsdFxuICAgIGlmICggZGl2LnBhcmVudE5vZGUgKSB7XG4gICAgICBkaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZGl2ICk7XG4gICAgfVxuICAgIC8vIHJlbGVhc2UgbWVtb3J5IGluIElFXG4gICAgZGl2ID0gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgdGhlIHNhbWUgaGFuZGxlciBmb3IgYWxsIG9mIHRoZSBzcGVjaWZpZWQgYXR0cnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRycyBQaXBlLXNlcGFyYXRlZCBsaXN0IG9mIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgVGhlIG1ldGhvZCB0aGF0IHdpbGwgYmUgYXBwbGllZFxuICovXG5mdW5jdGlvbiBhZGRIYW5kbGUoIGF0dHJzLCBoYW5kbGVyICkge1xuICB2YXIgYXJyID0gYXR0cnMuc3BsaXQoXCJ8XCIpLFxuICAgIGkgPSBhdHRycy5sZW5ndGg7XG5cbiAgd2hpbGUgKCBpLS0gKSB7XG4gICAgRXhwci5hdHRySGFuZGxlWyBhcnJbaV0gXSA9IGhhbmRsZXI7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3MgZG9jdW1lbnQgb3JkZXIgb2YgdHdvIHNpYmxpbmdzXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYlxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyBsZXNzIHRoYW4gMCBpZiBhIHByZWNlZGVzIGIsIGdyZWF0ZXIgdGhhbiAwIGlmIGEgZm9sbG93cyBiXG4gKi9cbmZ1bmN0aW9uIHNpYmxpbmdDaGVjayggYSwgYiApIHtcbiAgdmFyIGN1ciA9IGIgJiYgYSxcbiAgICBkaWZmID0gY3VyICYmIGEubm9kZVR5cGUgPT09IDEgJiYgYi5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgKCB+Yi5zb3VyY2VJbmRleCB8fCBNQVhfTkVHQVRJVkUgKSAtXG4gICAgICAoIH5hLnNvdXJjZUluZGV4IHx8IE1BWF9ORUdBVElWRSApO1xuXG4gIC8vIFVzZSBJRSBzb3VyY2VJbmRleCBpZiBhdmFpbGFibGUgb24gYm90aCBub2Rlc1xuICBpZiAoIGRpZmYgKSB7XG4gICAgcmV0dXJuIGRpZmY7XG4gIH1cblxuICAvLyBDaGVjayBpZiBiIGZvbGxvd3MgYVxuICBpZiAoIGN1ciApIHtcbiAgICB3aGlsZSAoIChjdXIgPSBjdXIubmV4dFNpYmxpbmcpICkge1xuICAgICAgaWYgKCBjdXIgPT09IGIgKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYSA/IDEgOiAtMTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGlucHV0IHR5cGVzXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dFBzZXVkbyggdHlwZSApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuICB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgYnV0dG9uc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQnV0dG9uUHNldWRvKCB0eXBlICkge1xuICByZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgdmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIChuYW1lID09PSBcImlucHV0XCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIikgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuICB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgcG9zaXRpb25hbHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZuICkge1xuICByZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBhcmd1bWVudCApIHtcbiAgICBhcmd1bWVudCA9ICthcmd1bWVudDtcbiAgICByZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuICAgICAgdmFyIGosXG4gICAgICAgIG1hdGNoSW5kZXhlcyA9IGZuKCBbXSwgc2VlZC5sZW5ndGgsIGFyZ3VtZW50ICksXG4gICAgICAgIGkgPSBtYXRjaEluZGV4ZXMubGVuZ3RoO1xuXG4gICAgICAvLyBNYXRjaCBlbGVtZW50cyBmb3VuZCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4ZXNcbiAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICBpZiAoIHNlZWRbIChqID0gbWF0Y2hJbmRleGVzW2ldKSBdICkge1xuICAgICAgICAgIHNlZWRbal0gPSAhKG1hdGNoZXNbal0gPSBzZWVkW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgYSBub2RlIGZvciB2YWxpZGl0eSBhcyBhIFNpenpsZSBjb250ZXh0XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0PX0gY29udGV4dFxuICogQHJldHVybnMge0VsZW1lbnR8T2JqZWN0fEJvb2xlYW59IFRoZSBpbnB1dCBub2RlIGlmIGFjY2VwdGFibGUsIG90aGVyd2lzZSBhIGZhbHN5IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHRlc3RDb250ZXh0KCBjb250ZXh0ICkge1xuICByZXR1cm4gY29udGV4dCAmJiB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb250ZXh0O1xufVxuXG4vLyBFeHBvc2Ugc3VwcG9ydCB2YXJzIGZvciBjb252ZW5pZW5jZVxuc3VwcG9ydCA9IFNpenpsZS5zdXBwb3J0ID0ge307XG5cbi8qKlxuICogRGV0ZWN0cyBYTUwgbm9kZXNcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsZW0gQW4gZWxlbWVudCBvciBhIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZmYgZWxlbSBpcyBhIG5vbi1IVE1MIFhNTCBub2RlXG4gKi9cbmlzWE1MID0gU2l6emxlLmlzWE1MID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIC8vIGRvY3VtZW50RWxlbWVudCBpcyB2ZXJpZmllZCBmb3IgY2FzZXMgd2hlcmUgaXQgZG9lc24ndCB5ZXQgZXhpc3RcbiAgLy8gKHN1Y2ggYXMgbG9hZGluZyBpZnJhbWVzIGluIElFIC0gIzQ4MzMpXG4gIHZhciBkb2N1bWVudEVsZW1lbnQgPSBlbGVtICYmIChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSkuZG9jdW1lbnRFbGVtZW50O1xuICByZXR1cm4gZG9jdW1lbnRFbGVtZW50ID8gZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIiA6IGZhbHNlO1xufTtcblxuLyoqXG4gKiBTZXRzIGRvY3VtZW50LXJlbGF0ZWQgdmFyaWFibGVzIG9uY2UgYmFzZWQgb24gdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IFtkb2NdIEFuIGVsZW1lbnQgb3IgZG9jdW1lbnQgb2JqZWN0IHRvIHVzZSB0byBzZXQgdGhlIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKi9cbnNldERvY3VtZW50ID0gU2l6emxlLnNldERvY3VtZW50ID0gZnVuY3Rpb24oIG5vZGUgKSB7XG4gIHZhciBoYXNDb21wYXJlLCBwYXJlbnQsXG4gICAgZG9jID0gbm9kZSA/IG5vZGUub3duZXJEb2N1bWVudCB8fCBub2RlIDogcHJlZmVycmVkRG9jO1xuXG4gIC8vIElmIG5vIGRvY3VtZW50IGFuZCBkb2N1bWVudEVsZW1lbnQgaXMgYXZhaWxhYmxlLCByZXR1cm5cbiAgaWYgKCBkb2MgPT09IGRvY3VtZW50IHx8IGRvYy5ub2RlVHlwZSAhPT0gOSB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCApIHtcbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cblxuICAvLyBTZXQgb3VyIGRvY3VtZW50XG4gIGRvY3VtZW50ID0gZG9jO1xuICBkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgcGFyZW50ID0gZG9jLmRlZmF1bHRWaWV3O1xuXG4gIC8vIFN1cHBvcnQ6IElFPjhcbiAgLy8gSWYgaWZyYW1lIGRvY3VtZW50IGlzIGFzc2lnbmVkIHRvIFwiZG9jdW1lbnRcIiB2YXJpYWJsZSBhbmQgaWYgaWZyYW1lIGhhcyBiZWVuIHJlbG9hZGVkLFxuICAvLyBJRSB3aWxsIHRocm93IFwicGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIGFjY2Vzc2luZyBcImRvY3VtZW50XCIgdmFyaWFibGUsIHNlZSBqUXVlcnkgIzEzOTM2XG4gIC8vIElFNi04IGRvIG5vdCBzdXBwb3J0IHRoZSBkZWZhdWx0VmlldyBwcm9wZXJ0eSBzbyBwYXJlbnQgd2lsbCBiZSB1bmRlZmluZWRcbiAgaWYgKCBwYXJlbnQgJiYgcGFyZW50ICE9PSBwYXJlbnQudG9wICkge1xuICAgIC8vIElFMTEgZG9lcyBub3QgaGF2ZSBhdHRhY2hFdmVudCwgc28gYWxsIG11c3Qgc3VmZmVyXG4gICAgaWYgKCBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKCBcInVubG9hZFwiLCB1bmxvYWRIYW5kbGVyLCBmYWxzZSApO1xuICAgIH0gZWxzZSBpZiAoIHBhcmVudC5hdHRhY2hFdmVudCApIHtcbiAgICAgIHBhcmVudC5hdHRhY2hFdmVudCggXCJvbnVubG9hZFwiLCB1bmxvYWRIYW5kbGVyICk7XG4gICAgfVxuICB9XG5cbiAgLyogU3VwcG9ydCB0ZXN0c1xuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGRvY3VtZW50SXNIVE1MID0gIWlzWE1MKCBkb2MgKTtcblxuICAvKiBBdHRyaWJ1dGVzXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAvLyBTdXBwb3J0OiBJRTw4XG4gIC8vIFZlcmlmeSB0aGF0IGdldEF0dHJpYnV0ZSByZWFsbHkgcmV0dXJucyBhdHRyaWJ1dGVzIGFuZCBub3QgcHJvcGVydGllc1xuICAvLyAoZXhjZXB0aW5nIElFOCBib29sZWFucylcbiAgc3VwcG9ydC5hdHRyaWJ1dGVzID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gICAgZGl2LmNsYXNzTmFtZSA9IFwiaVwiO1xuICAgIHJldHVybiAhZGl2LmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiKTtcbiAgfSk7XG5cbiAgLyogZ2V0RWxlbWVudChzKUJ5KlxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgLy8gQ2hlY2sgaWYgZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpIHJldHVybnMgb25seSBlbGVtZW50c1xuICBzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gICAgZGl2LmFwcGVuZENoaWxkKCBkb2MuY3JlYXRlQ29tbWVudChcIlwiKSApO1xuICAgIHJldHVybiAhZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKS5sZW5ndGg7XG4gIH0pO1xuXG4gIC8vIFN1cHBvcnQ6IElFPDlcbiAgc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gcm5hdGl2ZS50ZXN0KCBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApO1xuXG4gIC8vIFN1cHBvcnQ6IElFPDEwXG4gIC8vIENoZWNrIGlmIGdldEVsZW1lbnRCeUlkIHJldHVybnMgZWxlbWVudHMgYnkgbmFtZVxuICAvLyBUaGUgYnJva2VuIGdldEVsZW1lbnRCeUlkIG1ldGhvZHMgZG9uJ3QgcGljayB1cCBwcm9ncmFtYXRpY2FsbHktc2V0IG5hbWVzLFxuICAvLyBzbyB1c2UgYSByb3VuZGFib3V0IGdldEVsZW1lbnRzQnlOYW1lIHRlc3RcbiAgc3VwcG9ydC5nZXRCeUlkID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gICAgZG9jRWxlbS5hcHBlbmRDaGlsZCggZGl2ICkuaWQgPSBleHBhbmRvO1xuICAgIHJldHVybiAhZG9jLmdldEVsZW1lbnRzQnlOYW1lIHx8ICFkb2MuZ2V0RWxlbWVudHNCeU5hbWUoIGV4cGFuZG8gKS5sZW5ndGg7XG4gIH0pO1xuXG4gIC8vIElEIGZpbmQgYW5kIGZpbHRlclxuICBpZiAoIHN1cHBvcnQuZ2V0QnlJZCApIHtcbiAgICBFeHByLmZpbmRbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcbiAgICAgIGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG4gICAgICAgIHZhciBtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcbiAgICAgICAgLy8gQ2hlY2sgcGFyZW50Tm9kZSB0byBjYXRjaCB3aGVuIEJsYWNrYmVycnkgNC42IHJldHVybnNcbiAgICAgICAgLy8gbm9kZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIGluIHRoZSBkb2N1bWVudCAjNjk2M1xuICAgICAgICByZXR1cm4gbSAmJiBtLnBhcmVudE5vZGUgPyBbIG0gXSA6IFtdO1xuICAgICAgfVxuICAgIH07XG4gICAgRXhwci5maWx0ZXJbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCApIHtcbiAgICAgIHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gYXR0cklkO1xuICAgICAgfTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIFN1cHBvcnQ6IElFNi83XG4gICAgLy8gZ2V0RWxlbWVudEJ5SWQgaXMgbm90IHJlbGlhYmxlIGFzIGEgZmluZCBzaG9ydGN1dFxuICAgIGRlbGV0ZSBFeHByLmZpbmRbXCJJRFwiXTtcblxuICAgIEV4cHIuZmlsdGVyW1wiSURcIl0gPSAgZnVuY3Rpb24oIGlkICkge1xuICAgICAgdmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHZhciBub2RlID0gdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlTm9kZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcbiAgICAgICAgcmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gYXR0cklkO1xuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgLy8gVGFnXG4gIEV4cHIuZmluZFtcIlRBR1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgP1xuICAgIGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG4gICAgICBpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuICAgICAgICByZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cbiAgICAgIC8vIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgZG9uJ3QgaGF2ZSBnRUJUTlxuICAgICAgfSBlbHNlIGlmICggc3VwcG9ydC5xc2EgKSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyApO1xuICAgICAgfVxuICAgIH0gOlxuXG4gICAgZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcbiAgICAgIHZhciBlbGVtLFxuICAgICAgICB0bXAgPSBbXSxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIC8vIEJ5IGhhcHB5IGNvaW5jaWRlbmNlLCBhIChicm9rZW4pIGdFQlROIGFwcGVhcnMgb24gRG9jdW1lbnRGcmFnbWVudCBub2RlcyB0b29cbiAgICAgICAgcmVzdWx0cyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xuXG4gICAgICAvLyBGaWx0ZXIgb3V0IHBvc3NpYmxlIGNvbW1lbnRzXG4gICAgICBpZiAoIHRhZyA9PT0gXCIqXCIgKSB7XG4gICAgICAgIHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgICAgIHRtcC5wdXNoKCBlbGVtICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG5cbiAgLy8gQ2xhc3NcbiAgRXhwci5maW5kW1wiQ0xBU1NcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiYgZnVuY3Rpb24oIGNsYXNzTmFtZSwgY29udGV4dCApIHtcbiAgICBpZiAoIGRvY3VtZW50SXNIVE1MICkge1xuICAgICAgcmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggY2xhc3NOYW1lICk7XG4gICAgfVxuICB9O1xuXG4gIC8qIFFTQS9tYXRjaGVzU2VsZWN0b3JcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gIC8vIFFTQSBhbmQgbWF0Y2hlc1NlbGVjdG9yIHN1cHBvcnRcblxuICAvLyBtYXRjaGVzU2VsZWN0b3IoOmFjdGl2ZSkgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKElFOS9PcGVyYSAxMS41KVxuICByYnVnZ3lNYXRjaGVzID0gW107XG5cbiAgLy8gcVNhKDpmb2N1cykgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKENocm9tZSAyMSlcbiAgLy8gV2UgYWxsb3cgdGhpcyBiZWNhdXNlIG9mIGEgYnVnIGluIElFOC85IHRoYXQgdGhyb3dzIGFuIGVycm9yXG4gIC8vIHdoZW5ldmVyIGBkb2N1bWVudC5hY3RpdmVFbGVtZW50YCBpcyBhY2Nlc3NlZCBvbiBhbiBpZnJhbWVcbiAgLy8gU28sIHdlIGFsbG93IDpmb2N1cyB0byBwYXNzIHRocm91Z2ggUVNBIGFsbCB0aGUgdGltZSB0byBhdm9pZCB0aGUgSUUgZXJyb3JcbiAgLy8gU2VlIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEzMzc4XG4gIHJidWdneVFTQSA9IFtdO1xuXG4gIGlmICggKHN1cHBvcnQucXNhID0gcm5hdGl2ZS50ZXN0KCBkb2MucXVlcnlTZWxlY3RvckFsbCApKSApIHtcbiAgICAvLyBCdWlsZCBRU0EgcmVnZXhcbiAgICAvLyBSZWdleCBzdHJhdGVneSBhZG9wdGVkIGZyb20gRGllZ28gUGVyaW5pXG4gICAgYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gICAgICAvLyBTZWxlY3QgaXMgc2V0IHRvIGVtcHR5IHN0cmluZyBvbiBwdXJwb3NlXG4gICAgICAvLyBUaGlzIGlzIHRvIHRlc3QgSUUncyB0cmVhdG1lbnQgb2Ygbm90IGV4cGxpY2l0bHlcbiAgICAgIC8vIHNldHRpbmcgYSBib29sZWFuIGNvbnRlbnQgYXR0cmlidXRlLFxuICAgICAgLy8gc2luY2UgaXRzIHByZXNlbmNlIHNob3VsZCBiZSBlbm91Z2hcbiAgICAgIC8vIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMzU5XG4gICAgICBkb2NFbGVtLmFwcGVuZENoaWxkKCBkaXYgKS5pbm5lckhUTUwgPSBcIjxhIGlkPSdcIiArIGV4cGFuZG8gKyBcIic+PC9hPlwiICtcbiAgICAgICAgXCI8c2VsZWN0IGlkPSdcIiArIGV4cGFuZG8gKyBcIi1cXGZdJyBtc2FsbG93Y2FwdHVyZT0nJz5cIiArXG4gICAgICAgIFwiPG9wdGlvbiBzZWxlY3RlZD0nJz48L29wdGlvbj48L3NlbGVjdD5cIjtcblxuICAgICAgLy8gU3VwcG9ydDogSUU4LCBPcGVyYSAxMS0xMi4xNlxuICAgICAgLy8gTm90aGluZyBzaG91bGQgYmUgc2VsZWN0ZWQgd2hlbiBlbXB0eSBzdHJpbmdzIGZvbGxvdyBePSBvciAkPSBvciAqPVxuICAgICAgLy8gVGhlIHRlc3QgYXR0cmlidXRlIG11c3QgYmUgdW5rbm93biBpbiBPcGVyYSBidXQgXCJzYWZlXCIgZm9yIFdpblJUXG4gICAgICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvaGg0NjUzODguYXNweCNhdHRyaWJ1dGVfc2VjdGlvblxuICAgICAgaWYgKCBkaXYucXVlcnlTZWxlY3RvckFsbChcIlttc2FsbG93Y2FwdHVyZV49JyddXCIpLmxlbmd0aCApIHtcbiAgICAgICAgcmJ1Z2d5UVNBLnB1c2goIFwiWypeJF09XCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86Jyd8XFxcIlxcXCIpXCIgKTtcbiAgICAgIH1cblxuICAgICAgLy8gU3VwcG9ydDogSUU4XG4gICAgICAvLyBCb29sZWFuIGF0dHJpYnV0ZXMgYW5kIFwidmFsdWVcIiBhcmUgbm90IHRyZWF0ZWQgY29ycmVjdGx5XG4gICAgICBpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIltzZWxlY3RlZF1cIikubGVuZ3RoICkge1xuICAgICAgICByYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKig/OnZhbHVlfFwiICsgYm9vbGVhbnMgKyBcIilcIiApO1xuICAgICAgfVxuXG4gICAgICAvLyBTdXBwb3J0OiBDaHJvbWU8MjksIEFuZHJvaWQ8NC4yKywgU2FmYXJpPDcuMCssIGlPUzw3LjArLCBQaGFudG9tSlM8MS45LjcrXG4gICAgICBpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbCggXCJbaWR+PVwiICsgZXhwYW5kbyArIFwiLV1cIiApLmxlbmd0aCApIHtcbiAgICAgICAgcmJ1Z2d5UVNBLnB1c2goXCJ+PVwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gV2Via2l0L09wZXJhIC0gOmNoZWNrZWQgc2hvdWxkIHJldHVybiBzZWxlY3RlZCBvcHRpb24gZWxlbWVudHNcbiAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG4gICAgICAvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuICAgICAgaWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6Y2hlY2tlZFwiKS5sZW5ndGggKSB7XG4gICAgICAgIHJidWdneVFTQS5wdXNoKFwiOmNoZWNrZWRcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIFN1cHBvcnQ6IFNhZmFyaSA4KywgaU9TIDgrXG4gICAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM2ODUxXG4gICAgICAvLyBJbi1wYWdlIGBzZWxlY3RvciNpZCBzaWJpbmctY29tYmluYXRvciBzZWxlY3RvcmAgZmFpbHNcbiAgICAgIGlmICggIWRpdi5xdWVyeVNlbGVjdG9yQWxsKCBcImEjXCIgKyBleHBhbmRvICsgXCIrKlwiICkubGVuZ3RoICkge1xuICAgICAgICByYnVnZ3lRU0EucHVzaChcIi4jLitbK35dXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gICAgICAvLyBTdXBwb3J0OiBXaW5kb3dzIDggTmF0aXZlIEFwcHNcbiAgICAgIC8vIFRoZSB0eXBlIGFuZCBuYW1lIGF0dHJpYnV0ZXMgYXJlIHJlc3RyaWN0ZWQgZHVyaW5nIC5pbm5lckhUTUwgYXNzaWdubWVudFxuICAgICAgdmFyIGlucHV0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIFwiaGlkZGVuXCIgKTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZCggaW5wdXQgKS5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcIkRcIiApO1xuXG4gICAgICAvLyBTdXBwb3J0OiBJRThcbiAgICAgIC8vIEVuZm9yY2UgY2FzZS1zZW5zaXRpdml0eSBvZiBuYW1lIGF0dHJpYnV0ZVxuICAgICAgaWYgKCBkaXYucXVlcnlTZWxlY3RvckFsbChcIltuYW1lPWRdXCIpLmxlbmd0aCApIHtcbiAgICAgICAgcmJ1Z2d5UVNBLnB1c2goIFwibmFtZVwiICsgd2hpdGVzcGFjZSArIFwiKlsqXiR8IX5dPz1cIiApO1xuICAgICAgfVxuXG4gICAgICAvLyBGRiAzLjUgLSA6ZW5hYmxlZC86ZGlzYWJsZWQgYW5kIGhpZGRlbiBlbGVtZW50cyAoaGlkZGVuIGVsZW1lbnRzIGFyZSBzdGlsbCBlbmFibGVkKVxuICAgICAgLy8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcbiAgICAgIGlmICggIWRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiOmVuYWJsZWRcIikubGVuZ3RoICkge1xuICAgICAgICByYnVnZ3lRU0EucHVzaCggXCI6ZW5hYmxlZFwiLCBcIjpkaXNhYmxlZFwiICk7XG4gICAgICB9XG5cbiAgICAgIC8vIE9wZXJhIDEwLTExIGRvZXMgbm90IHRocm93IG9uIHBvc3QtY29tbWEgaW52YWxpZCBwc2V1ZG9zXG4gICAgICBkaXYucXVlcnlTZWxlY3RvckFsbChcIiosOnhcIik7XG4gICAgICByYnVnZ3lRU0EucHVzaChcIiwuKjpcIik7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIChzdXBwb3J0Lm1hdGNoZXNTZWxlY3RvciA9IHJuYXRpdmUudGVzdCggKG1hdGNoZXMgPSBkb2NFbGVtLm1hdGNoZXMgfHxcbiAgICBkb2NFbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuICAgIGRvY0VsZW0ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgZG9jRWxlbS5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgZG9jRWxlbS5tc01hdGNoZXNTZWxlY3RvcikgKSkgKSB7XG5cbiAgICBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcbiAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBpdCdzIHBvc3NpYmxlIHRvIGRvIG1hdGNoZXNTZWxlY3RvclxuICAgICAgLy8gb24gYSBkaXNjb25uZWN0ZWQgbm9kZSAoSUUgOSlcbiAgICAgIHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggPSBtYXRjaGVzLmNhbGwoIGRpdiwgXCJkaXZcIiApO1xuXG4gICAgICAvLyBUaGlzIHNob3VsZCBmYWlsIHdpdGggYW4gZXhjZXB0aW9uXG4gICAgICAvLyBHZWNrbyBkb2VzIG5vdCBlcnJvciwgcmV0dXJucyBmYWxzZSBpbnN0ZWFkXG4gICAgICBtYXRjaGVzLmNhbGwoIGRpdiwgXCJbcyE9JyddOnhcIiApO1xuICAgICAgcmJ1Z2d5TWF0Y2hlcy5wdXNoKCBcIiE9XCIsIHBzZXVkb3MgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJidWdneVFTQSA9IHJidWdneVFTQS5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5UVNBLmpvaW4oXCJ8XCIpICk7XG4gIHJidWdneU1hdGNoZXMgPSByYnVnZ3lNYXRjaGVzLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lNYXRjaGVzLmpvaW4oXCJ8XCIpICk7XG5cbiAgLyogQ29udGFpbnNcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBoYXNDb21wYXJlID0gcm5hdGl2ZS50ZXN0KCBkb2NFbGVtLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICk7XG5cbiAgLy8gRWxlbWVudCBjb250YWlucyBhbm90aGVyXG4gIC8vIFB1cnBvc2VmdWxseSBkb2VzIG5vdCBpbXBsZW1lbnQgaW5jbHVzaXZlIGRlc2NlbmRlbnRcbiAgLy8gQXMgaW4sIGFuIGVsZW1lbnQgZG9lcyBub3QgY29udGFpbiBpdHNlbGZcbiAgY29udGFpbnMgPSBoYXNDb21wYXJlIHx8IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb250YWlucyApID9cbiAgICBmdW5jdGlvbiggYSwgYiApIHtcbiAgICAgIHZhciBhZG93biA9IGEubm9kZVR5cGUgPT09IDkgPyBhLmRvY3VtZW50RWxlbWVudCA6IGEsXG4gICAgICAgIGJ1cCA9IGIgJiYgYi5wYXJlbnROb2RlO1xuICAgICAgcmV0dXJuIGEgPT09IGJ1cCB8fCAhISggYnVwICYmIGJ1cC5ub2RlVHlwZSA9PT0gMSAmJiAoXG4gICAgICAgIGFkb3duLmNvbnRhaW5zID9cbiAgICAgICAgICBhZG93bi5jb250YWlucyggYnVwICkgOlxuICAgICAgICAgIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gJiYgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYnVwICkgJiAxNlxuICAgICAgKSk7XG4gICAgfSA6XG4gICAgZnVuY3Rpb24oIGEsIGIgKSB7XG4gICAgICBpZiAoIGIgKSB7XG4gICAgICAgIHdoaWxlICggKGIgPSBiLnBhcmVudE5vZGUpICkge1xuICAgICAgICAgIGlmICggYiA9PT0gYSApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgLyogU29ydGluZ1xuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgLy8gRG9jdW1lbnQgb3JkZXIgc29ydGluZ1xuICBzb3J0T3JkZXIgPSBoYXNDb21wYXJlID9cbiAgZnVuY3Rpb24oIGEsIGIgKSB7XG5cbiAgICAvLyBGbGFnIGZvciBkdXBsaWNhdGUgcmVtb3ZhbFxuICAgIGlmICggYSA9PT0gYiApIHtcbiAgICAgIGhhc0R1cGxpY2F0ZSA9IHRydWU7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBTb3J0IG9uIG1ldGhvZCBleGlzdGVuY2UgaWYgb25seSBvbmUgaW5wdXQgaGFzIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG4gICAgdmFyIGNvbXBhcmUgPSAhYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAtICFiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uO1xuICAgIGlmICggY29tcGFyZSApIHtcbiAgICAgIHJldHVybiBjb21wYXJlO1xuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcbiAgICBjb21wYXJlID0gKCBhLm93bmVyRG9jdW1lbnQgfHwgYSApID09PSAoIGIub3duZXJEb2N1bWVudCB8fCBiICkgP1xuICAgICAgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYiApIDpcblxuICAgICAgLy8gT3RoZXJ3aXNlIHdlIGtub3cgdGhleSBhcmUgZGlzY29ubmVjdGVkXG4gICAgICAxO1xuXG4gICAgLy8gRGlzY29ubmVjdGVkIG5vZGVzXG4gICAgaWYgKCBjb21wYXJlICYgMSB8fFxuICAgICAgKCFzdXBwb3J0LnNvcnREZXRhY2hlZCAmJiBiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBhICkgPT09IGNvbXBhcmUpICkge1xuXG4gICAgICAvLyBDaG9vc2UgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyByZWxhdGVkIHRvIG91ciBwcmVmZXJyZWQgZG9jdW1lbnRcbiAgICAgIGlmICggYSA9PT0gZG9jIHx8IGEub3duZXJEb2N1bWVudCA9PT0gcHJlZmVycmVkRG9jICYmIGNvbnRhaW5zKHByZWZlcnJlZERvYywgYSkgKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIGlmICggYiA9PT0gZG9jIHx8IGIub3duZXJEb2N1bWVudCA9PT0gcHJlZmVycmVkRG9jICYmIGNvbnRhaW5zKHByZWZlcnJlZERvYywgYikgKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuXG4gICAgICAvLyBNYWludGFpbiBvcmlnaW5hbCBvcmRlclxuICAgICAgcmV0dXJuIHNvcnRJbnB1dCA/XG4gICAgICAgICggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcbiAgICAgICAgMDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcGFyZSAmIDQgPyAtMSA6IDE7XG4gIH0gOlxuICBmdW5jdGlvbiggYSwgYiApIHtcbiAgICAvLyBFeGl0IGVhcmx5IGlmIHRoZSBub2RlcyBhcmUgaWRlbnRpY2FsXG4gICAgaWYgKCBhID09PSBiICkge1xuICAgICAgaGFzRHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHZhciBjdXIsXG4gICAgICBpID0gMCxcbiAgICAgIGF1cCA9IGEucGFyZW50Tm9kZSxcbiAgICAgIGJ1cCA9IGIucGFyZW50Tm9kZSxcbiAgICAgIGFwID0gWyBhIF0sXG4gICAgICBicCA9IFsgYiBdO1xuXG4gICAgLy8gUGFyZW50bGVzcyBub2RlcyBhcmUgZWl0aGVyIGRvY3VtZW50cyBvciBkaXNjb25uZWN0ZWRcbiAgICBpZiAoICFhdXAgfHwgIWJ1cCApIHtcbiAgICAgIHJldHVybiBhID09PSBkb2MgPyAtMSA6XG4gICAgICAgIGIgPT09IGRvYyA/IDEgOlxuICAgICAgICBhdXAgPyAtMSA6XG4gICAgICAgIGJ1cCA/IDEgOlxuICAgICAgICBzb3J0SW5wdXQgP1xuICAgICAgICAoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG4gICAgICAgIDA7XG5cbiAgICAvLyBJZiB0aGUgbm9kZXMgYXJlIHNpYmxpbmdzLCB3ZSBjYW4gZG8gYSBxdWljayBjaGVja1xuICAgIH0gZWxzZSBpZiAoIGF1cCA9PT0gYnVwICkge1xuICAgICAgcmV0dXJuIHNpYmxpbmdDaGVjayggYSwgYiApO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSB3ZSBuZWVkIGZ1bGwgbGlzdHMgb2YgdGhlaXIgYW5jZXN0b3JzIGZvciBjb21wYXJpc29uXG4gICAgY3VyID0gYTtcbiAgICB3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XG4gICAgICBhcC51bnNoaWZ0KCBjdXIgKTtcbiAgICB9XG4gICAgY3VyID0gYjtcbiAgICB3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XG4gICAgICBicC51bnNoaWZ0KCBjdXIgKTtcbiAgICB9XG5cbiAgICAvLyBXYWxrIGRvd24gdGhlIHRyZWUgbG9va2luZyBmb3IgYSBkaXNjcmVwYW5jeVxuICAgIHdoaWxlICggYXBbaV0gPT09IGJwW2ldICkge1xuICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiBpID9cbiAgICAgIC8vIERvIGEgc2libGluZyBjaGVjayBpZiB0aGUgbm9kZXMgaGF2ZSBhIGNvbW1vbiBhbmNlc3RvclxuICAgICAgc2libGluZ0NoZWNrKCBhcFtpXSwgYnBbaV0gKSA6XG5cbiAgICAgIC8vIE90aGVyd2lzZSBub2RlcyBpbiBvdXIgZG9jdW1lbnQgc29ydCBmaXJzdFxuICAgICAgYXBbaV0gPT09IHByZWZlcnJlZERvYyA/IC0xIDpcbiAgICAgIGJwW2ldID09PSBwcmVmZXJyZWREb2MgPyAxIDpcbiAgICAgIDA7XG4gIH07XG5cbiAgcmV0dXJuIGRvYztcbn07XG5cblNpenpsZS5tYXRjaGVzID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1lbnRzICkge1xuICByZXR1cm4gU2l6emxlKCBleHByLCBudWxsLCBudWxsLCBlbGVtZW50cyApO1xufTtcblxuU2l6emxlLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKCBlbGVtLCBleHByICkge1xuICAvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcbiAgaWYgKCAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkgIT09IGRvY3VtZW50ICkge1xuICAgIHNldERvY3VtZW50KCBlbGVtICk7XG4gIH1cblxuICAvLyBNYWtlIHN1cmUgdGhhdCBhdHRyaWJ1dGUgc2VsZWN0b3JzIGFyZSBxdW90ZWRcbiAgZXhwciA9IGV4cHIucmVwbGFjZSggcmF0dHJpYnV0ZVF1b3RlcywgXCI9JyQxJ11cIiApO1xuXG4gIGlmICggc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgJiYgZG9jdW1lbnRJc0hUTUwgJiZcbiAgICAoICFyYnVnZ3lNYXRjaGVzIHx8ICFyYnVnZ3lNYXRjaGVzLnRlc3QoIGV4cHIgKSApICYmXG4gICAgKCAhcmJ1Z2d5UVNBICAgICB8fCAhcmJ1Z2d5UVNBLnRlc3QoIGV4cHIgKSApICkge1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciByZXQgPSBtYXRjaGVzLmNhbGwoIGVsZW0sIGV4cHIgKTtcblxuICAgICAgLy8gSUUgOSdzIG1hdGNoZXNTZWxlY3RvciByZXR1cm5zIGZhbHNlIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xuICAgICAgaWYgKCByZXQgfHwgc3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCB8fFxuICAgICAgICAgIC8vIEFzIHdlbGwsIGRpc2Nvbm5lY3RlZCBub2RlcyBhcmUgc2FpZCB0byBiZSBpbiBhIGRvY3VtZW50XG4gICAgICAgICAgLy8gZnJhZ21lbnQgaW4gSUUgOVxuICAgICAgICAgIGVsZW0uZG9jdW1lbnQgJiYgZWxlbS5kb2N1bWVudC5ub2RlVHlwZSAhPT0gMTEgKSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIHJldHVybiBTaXp6bGUoIGV4cHIsIGRvY3VtZW50LCBudWxsLCBbIGVsZW0gXSApLmxlbmd0aCA+IDA7XG59O1xuXG5TaXp6bGUuY29udGFpbnMgPSBmdW5jdGlvbiggY29udGV4dCwgZWxlbSApIHtcbiAgLy8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG4gIGlmICggKCBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCApICE9PSBkb2N1bWVudCApIHtcbiAgICBzZXREb2N1bWVudCggY29udGV4dCApO1xuICB9XG4gIHJldHVybiBjb250YWlucyggY29udGV4dCwgZWxlbSApO1xufTtcblxuU2l6emxlLmF0dHIgPSBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcbiAgLy8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG4gIGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcbiAgICBzZXREb2N1bWVudCggZWxlbSApO1xuICB9XG5cbiAgdmFyIGZuID0gRXhwci5hdHRySGFuZGxlWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSxcbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoalF1ZXJ5ICMxMzgwNylcbiAgICB2YWwgPSBmbiAmJiBoYXNPd24uY2FsbCggRXhwci5hdHRySGFuZGxlLCBuYW1lLnRvTG93ZXJDYXNlKCkgKSA/XG4gICAgICBmbiggZWxlbSwgbmFtZSwgIWRvY3VtZW50SXNIVE1MICkgOlxuICAgICAgdW5kZWZpbmVkO1xuXG4gIHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/XG4gICAgdmFsIDpcbiAgICBzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWRvY3VtZW50SXNIVE1MID9cbiAgICAgIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICkgOlxuICAgICAgKHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShuYW1lKSkgJiYgdmFsLnNwZWNpZmllZCA/XG4gICAgICAgIHZhbC52YWx1ZSA6XG4gICAgICAgIG51bGw7XG59O1xuXG5TaXp6bGUuZXJyb3IgPSBmdW5jdGlvbiggbXNnICkge1xuICB0aHJvdyBuZXcgRXJyb3IoIFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIgKyBtc2cgKTtcbn07XG5cbi8qKlxuICogRG9jdW1lbnQgc29ydGluZyBhbmQgcmVtb3ZpbmcgZHVwbGljYXRlc1xuICogQHBhcmFtIHtBcnJheUxpa2V9IHJlc3VsdHNcbiAqL1xuU2l6emxlLnVuaXF1ZVNvcnQgPSBmdW5jdGlvbiggcmVzdWx0cyApIHtcbiAgdmFyIGVsZW0sXG4gICAgZHVwbGljYXRlcyA9IFtdLFxuICAgIGogPSAwLFxuICAgIGkgPSAwO1xuXG4gIC8vIFVubGVzcyB3ZSAqa25vdyogd2UgY2FuIGRldGVjdCBkdXBsaWNhdGVzLCBhc3N1bWUgdGhlaXIgcHJlc2VuY2VcbiAgaGFzRHVwbGljYXRlID0gIXN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcztcbiAgc29ydElucHV0ID0gIXN1cHBvcnQuc29ydFN0YWJsZSAmJiByZXN1bHRzLnNsaWNlKCAwICk7XG4gIHJlc3VsdHMuc29ydCggc29ydE9yZGVyICk7XG5cbiAgaWYgKCBoYXNEdXBsaWNhdGUgKSB7XG4gICAgd2hpbGUgKCAoZWxlbSA9IHJlc3VsdHNbaSsrXSkgKSB7XG4gICAgICBpZiAoIGVsZW0gPT09IHJlc3VsdHNbIGkgXSApIHtcbiAgICAgICAgaiA9IGR1cGxpY2F0ZXMucHVzaCggaSApO1xuICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAoIGotLSApIHtcbiAgICAgIHJlc3VsdHMuc3BsaWNlKCBkdXBsaWNhdGVzWyBqIF0sIDEgKTtcbiAgICB9XG4gIH1cblxuICAvLyBDbGVhciBpbnB1dCBhZnRlciBzb3J0aW5nIHRvIHJlbGVhc2Ugb2JqZWN0c1xuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9zaXp6bGUvcHVsbC8yMjVcbiAgc29ydElucHV0ID0gbnVsbDtcblxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiBmb3IgcmV0cmlldmluZyB0aGUgdGV4dCB2YWx1ZSBvZiBhbiBhcnJheSBvZiBET00gbm9kZXNcbiAqIEBwYXJhbSB7QXJyYXl8RWxlbWVudH0gZWxlbVxuICovXG5nZXRUZXh0ID0gU2l6emxlLmdldFRleHQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdmFyIG5vZGUsXG4gICAgcmV0ID0gXCJcIixcbiAgICBpID0gMCxcbiAgICBub2RlVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cbiAgaWYgKCAhbm9kZVR5cGUgKSB7XG4gICAgLy8gSWYgbm8gbm9kZVR5cGUsIHRoaXMgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gYXJyYXlcbiAgICB3aGlsZSAoIChub2RlID0gZWxlbVtpKytdKSApIHtcbiAgICAgIC8vIERvIG5vdCB0cmF2ZXJzZSBjb21tZW50IG5vZGVzXG4gICAgICByZXQgKz0gZ2V0VGV4dCggbm9kZSApO1xuICAgIH1cbiAgfSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDEgfHwgbm9kZVR5cGUgPT09IDkgfHwgbm9kZVR5cGUgPT09IDExICkge1xuICAgIC8vIFVzZSB0ZXh0Q29udGVudCBmb3IgZWxlbWVudHNcbiAgICAvLyBpbm5lclRleHQgdXNhZ2UgcmVtb3ZlZCBmb3IgY29uc2lzdGVuY3kgb2YgbmV3IGxpbmVzIChqUXVlcnkgIzExMTUzKVxuICAgIGlmICggdHlwZW9mIGVsZW0udGV4dENvbnRlbnQgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICByZXR1cm4gZWxlbS50ZXh0Q29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJhdmVyc2UgaXRzIGNoaWxkcmVuXG4gICAgICBmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcbiAgICAgICAgcmV0ICs9IGdldFRleHQoIGVsZW0gKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAzIHx8IG5vZGVUeXBlID09PSA0ICkge1xuICAgIHJldHVybiBlbGVtLm5vZGVWYWx1ZTtcbiAgfVxuICAvLyBEbyBub3QgaW5jbHVkZSBjb21tZW50IG9yIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gbm9kZXNcblxuICByZXR1cm4gcmV0O1xufTtcblxuRXhwciA9IFNpenpsZS5zZWxlY3RvcnMgPSB7XG5cbiAgLy8gQ2FuIGJlIGFkanVzdGVkIGJ5IHRoZSB1c2VyXG4gIGNhY2hlTGVuZ3RoOiA1MCxcblxuICBjcmVhdGVQc2V1ZG86IG1hcmtGdW5jdGlvbixcblxuICBtYXRjaDogbWF0Y2hFeHByLFxuXG4gIGF0dHJIYW5kbGU6IHt9LFxuXG4gIGZpbmQ6IHt9LFxuXG4gIHJlbGF0aXZlOiB7XG4gICAgXCI+XCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiwgZmlyc3Q6IHRydWUgfSxcbiAgICBcIiBcIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiIH0sXG4gICAgXCIrXCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiLCBmaXJzdDogdHJ1ZSB9LFxuICAgIFwiflwiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiB9XG4gIH0sXG5cbiAgcHJlRmlsdGVyOiB7XG4gICAgXCJBVFRSXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcbiAgICAgIG1hdGNoWzFdID0gbWF0Y2hbMV0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuICAgICAgLy8gTW92ZSB0aGUgZ2l2ZW4gdmFsdWUgdG8gbWF0Y2hbM10gd2hldGhlciBxdW90ZWQgb3IgdW5xdW90ZWRcbiAgICAgIG1hdGNoWzNdID0gKCBtYXRjaFszXSB8fCBtYXRjaFs0XSB8fCBtYXRjaFs1XSB8fCBcIlwiICkucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuICAgICAgaWYgKCBtYXRjaFsyXSA9PT0gXCJ+PVwiICkge1xuICAgICAgICBtYXRjaFszXSA9IFwiIFwiICsgbWF0Y2hbM10gKyBcIiBcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hdGNoLnNsaWNlKCAwLCA0ICk7XG4gICAgfSxcblxuICAgIFwiQ0hJTERcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuICAgICAgLyogbWF0Y2hlcyBmcm9tIG1hdGNoRXhwcltcIkNISUxEXCJdXG4gICAgICAgIDEgdHlwZSAob25seXxudGh8Li4uKVxuICAgICAgICAyIHdoYXQgKGNoaWxkfG9mLXR5cGUpXG4gICAgICAgIDMgYXJndW1lbnQgKGV2ZW58b2RkfFxcZCp8XFxkKm4oWystXVxcZCspP3wuLi4pXG4gICAgICAgIDQgeG4tY29tcG9uZW50IG9mIHhuK3kgYXJndW1lbnQgKFsrLV0/XFxkKm58KVxuICAgICAgICA1IHNpZ24gb2YgeG4tY29tcG9uZW50XG4gICAgICAgIDYgeCBvZiB4bi1jb21wb25lbnRcbiAgICAgICAgNyBzaWduIG9mIHktY29tcG9uZW50XG4gICAgICAgIDggeSBvZiB5LWNvbXBvbmVudFxuICAgICAgKi9cbiAgICAgIG1hdGNoWzFdID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKCBtYXRjaFsxXS5zbGljZSggMCwgMyApID09PSBcIm50aFwiICkge1xuICAgICAgICAvLyBudGgtKiByZXF1aXJlcyBhcmd1bWVudFxuICAgICAgICBpZiAoICFtYXRjaFszXSApIHtcbiAgICAgICAgICBTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBudW1lcmljIHggYW5kIHkgcGFyYW1ldGVycyBmb3IgRXhwci5maWx0ZXIuQ0hJTERcbiAgICAgICAgLy8gcmVtZW1iZXIgdGhhdCBmYWxzZS90cnVlIGNhc3QgcmVzcGVjdGl2ZWx5IHRvIDAvMVxuICAgICAgICBtYXRjaFs0XSA9ICsoIG1hdGNoWzRdID8gbWF0Y2hbNV0gKyAobWF0Y2hbNl0gfHwgMSkgOiAyICogKCBtYXRjaFszXSA9PT0gXCJldmVuXCIgfHwgbWF0Y2hbM10gPT09IFwib2RkXCIgKSApO1xuICAgICAgICBtYXRjaFs1XSA9ICsoICggbWF0Y2hbN10gKyBtYXRjaFs4XSApIHx8IG1hdGNoWzNdID09PSBcIm9kZFwiICk7XG5cbiAgICAgIC8vIG90aGVyIHR5cGVzIHByb2hpYml0IGFyZ3VtZW50c1xuICAgICAgfSBlbHNlIGlmICggbWF0Y2hbM10gKSB7XG4gICAgICAgIFNpenpsZS5lcnJvciggbWF0Y2hbMF0gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0sXG5cbiAgICBcIlBTRVVET1wiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG4gICAgICB2YXIgZXhjZXNzLFxuICAgICAgICB1bnF1b3RlZCA9ICFtYXRjaFs2XSAmJiBtYXRjaFsyXTtcblxuICAgICAgaWYgKCBtYXRjaEV4cHJbXCJDSElMRFwiXS50ZXN0KCBtYXRjaFswXSApICkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gQWNjZXB0IHF1b3RlZCBhcmd1bWVudHMgYXMtaXNcbiAgICAgIGlmICggbWF0Y2hbM10gKSB7XG4gICAgICAgIG1hdGNoWzJdID0gbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIjtcblxuICAgICAgLy8gU3RyaXAgZXhjZXNzIGNoYXJhY3RlcnMgZnJvbSB1bnF1b3RlZCBhcmd1bWVudHNcbiAgICAgIH0gZWxzZSBpZiAoIHVucXVvdGVkICYmIHJwc2V1ZG8udGVzdCggdW5xdW90ZWQgKSAmJlxuICAgICAgICAvLyBHZXQgZXhjZXNzIGZyb20gdG9rZW5pemUgKHJlY3Vyc2l2ZWx5KVxuICAgICAgICAoZXhjZXNzID0gdG9rZW5pemUoIHVucXVvdGVkLCB0cnVlICkpICYmXG4gICAgICAgIC8vIGFkdmFuY2UgdG8gdGhlIG5leHQgY2xvc2luZyBwYXJlbnRoZXNpc1xuICAgICAgICAoZXhjZXNzID0gdW5xdW90ZWQuaW5kZXhPZiggXCIpXCIsIHVucXVvdGVkLmxlbmd0aCAtIGV4Y2VzcyApIC0gdW5xdW90ZWQubGVuZ3RoKSApIHtcblxuICAgICAgICAvLyBleGNlc3MgaXMgYSBuZWdhdGl2ZSBpbmRleFxuICAgICAgICBtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKCAwLCBleGNlc3MgKTtcbiAgICAgICAgbWF0Y2hbMl0gPSB1bnF1b3RlZC5zbGljZSggMCwgZXhjZXNzICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJldHVybiBvbmx5IGNhcHR1cmVzIG5lZWRlZCBieSB0aGUgcHNldWRvIGZpbHRlciBtZXRob2QgKHR5cGUgYW5kIGFyZ3VtZW50KVxuICAgICAgcmV0dXJuIG1hdGNoLnNsaWNlKCAwLCAzICk7XG4gICAgfVxuICB9LFxuXG4gIGZpbHRlcjoge1xuXG4gICAgXCJUQUdcIjogZnVuY3Rpb24oIG5vZGVOYW1lU2VsZWN0b3IgKSB7XG4gICAgICB2YXIgbm9kZU5hbWUgPSBub2RlTmFtZVNlbGVjdG9yLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiBub2RlTmFtZVNlbGVjdG9yID09PSBcIipcIiA/XG4gICAgICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSA6XG4gICAgICAgIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgIHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbm9kZU5hbWU7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIFwiQ0xBU1NcIjogZnVuY3Rpb24oIGNsYXNzTmFtZSApIHtcbiAgICAgIHZhciBwYXR0ZXJuID0gY2xhc3NDYWNoZVsgY2xhc3NOYW1lICsgXCIgXCIgXTtcblxuICAgICAgcmV0dXJuIHBhdHRlcm4gfHxcbiAgICAgICAgKHBhdHRlcm4gPSBuZXcgUmVnRXhwKCBcIihefFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgY2xhc3NOYW1lICsgXCIoXCIgKyB3aGl0ZXNwYWNlICsgXCJ8JClcIiApKSAmJlxuICAgICAgICBjbGFzc0NhY2hlKCBjbGFzc05hbWUsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3QoIHR5cGVvZiBlbGVtLmNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtLmNsYXNzTmFtZSB8fCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgIT09IFwidW5kZWZpbmVkXCIgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiICk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBcIkFUVFJcIjogZnVuY3Rpb24oIG5hbWUsIG9wZXJhdG9yLCBjaGVjayApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFNpenpsZS5hdHRyKCBlbGVtLCBuYW1lICk7XG5cbiAgICAgICAgaWYgKCByZXN1bHQgPT0gbnVsbCApIHtcbiAgICAgICAgICByZXR1cm4gb3BlcmF0b3IgPT09IFwiIT1cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoICFvcGVyYXRvciApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCArPSBcIlwiO1xuXG4gICAgICAgIHJldHVybiBvcGVyYXRvciA9PT0gXCI9XCIgPyByZXN1bHQgPT09IGNoZWNrIDpcbiAgICAgICAgICBvcGVyYXRvciA9PT0gXCIhPVwiID8gcmVzdWx0ICE9PSBjaGVjayA6XG4gICAgICAgICAgb3BlcmF0b3IgPT09IFwiXj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID09PSAwIDpcbiAgICAgICAgICBvcGVyYXRvciA9PT0gXCIqPVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPiAtMSA6XG4gICAgICAgICAgb3BlcmF0b3IgPT09IFwiJD1cIiA/IGNoZWNrICYmIHJlc3VsdC5zbGljZSggLWNoZWNrLmxlbmd0aCApID09PSBjaGVjayA6XG4gICAgICAgICAgb3BlcmF0b3IgPT09IFwifj1cIiA/ICggXCIgXCIgKyByZXN1bHQucmVwbGFjZSggcndoaXRlc3BhY2UsIFwiIFwiICkgKyBcIiBcIiApLmluZGV4T2YoIGNoZWNrICkgPiAtMSA6XG4gICAgICAgICAgb3BlcmF0b3IgPT09IFwifD1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgfHwgcmVzdWx0LnNsaWNlKCAwLCBjaGVjay5sZW5ndGggKyAxICkgPT09IGNoZWNrICsgXCItXCIgOlxuICAgICAgICAgIGZhbHNlO1xuICAgICAgfTtcbiAgICB9LFxuXG4gICAgXCJDSElMRFwiOiBmdW5jdGlvbiggdHlwZSwgd2hhdCwgYXJndW1lbnQsIGZpcnN0LCBsYXN0ICkge1xuICAgICAgdmFyIHNpbXBsZSA9IHR5cGUuc2xpY2UoIDAsIDMgKSAhPT0gXCJudGhcIixcbiAgICAgICAgZm9yd2FyZCA9IHR5cGUuc2xpY2UoIC00ICkgIT09IFwibGFzdFwiLFxuICAgICAgICBvZlR5cGUgPSB3aGF0ID09PSBcIm9mLXR5cGVcIjtcblxuICAgICAgcmV0dXJuIGZpcnN0ID09PSAxICYmIGxhc3QgPT09IDAgP1xuXG4gICAgICAgIC8vIFNob3J0Y3V0IGZvciA6bnRoLSoobilcbiAgICAgICAgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgcmV0dXJuICEhZWxlbS5wYXJlbnROb2RlO1xuICAgICAgICB9IDpcblxuICAgICAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgICAgIHZhciBjYWNoZSwgb3V0ZXJDYWNoZSwgbm9kZSwgZGlmZiwgbm9kZUluZGV4LCBzdGFydCxcbiAgICAgICAgICAgIGRpciA9IHNpbXBsZSAhPT0gZm9yd2FyZCA/IFwibmV4dFNpYmxpbmdcIiA6IFwicHJldmlvdXNTaWJsaW5nXCIsXG4gICAgICAgICAgICBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGUsXG4gICAgICAgICAgICBuYW1lID0gb2ZUeXBlICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgIHVzZUNhY2hlID0gIXhtbCAmJiAhb2ZUeXBlO1xuXG4gICAgICAgICAgaWYgKCBwYXJlbnQgKSB7XG5cbiAgICAgICAgICAgIC8vIDooZmlyc3R8bGFzdHxvbmx5KS0oY2hpbGR8b2YtdHlwZSlcbiAgICAgICAgICAgIGlmICggc2ltcGxlICkge1xuICAgICAgICAgICAgICB3aGlsZSAoIGRpciApIHtcbiAgICAgICAgICAgICAgICBub2RlID0gZWxlbTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoIChub2RlID0gbm9kZVsgZGlyIF0pICkge1xuICAgICAgICAgICAgICAgICAgaWYgKCBvZlR5cGUgPyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOiBub2RlLm5vZGVUeXBlID09PSAxICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFJldmVyc2UgZGlyZWN0aW9uIGZvciA6b25seS0qIChpZiB3ZSBoYXZlbid0IHlldCBkb25lIHNvKVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZGlyID0gdHlwZSA9PT0gXCJvbmx5XCIgJiYgIXN0YXJ0ICYmIFwibmV4dFNpYmxpbmdcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhcnQgPSBbIGZvcndhcmQgPyBwYXJlbnQuZmlyc3RDaGlsZCA6IHBhcmVudC5sYXN0Q2hpbGQgXTtcblxuICAgICAgICAgICAgLy8gbm9uLXhtbCA6bnRoLWNoaWxkKC4uLikgc3RvcmVzIGNhY2hlIGRhdGEgb24gYHBhcmVudGBcbiAgICAgICAgICAgIGlmICggZm9yd2FyZCAmJiB1c2VDYWNoZSApIHtcbiAgICAgICAgICAgICAgLy8gU2VlayBgZWxlbWAgZnJvbSBhIHByZXZpb3VzbHktY2FjaGVkIGluZGV4XG4gICAgICAgICAgICAgIG91dGVyQ2FjaGUgPSBwYXJlbnRbIGV4cGFuZG8gXSB8fCAocGFyZW50WyBleHBhbmRvIF0gPSB7fSk7XG4gICAgICAgICAgICAgIGNhY2hlID0gb3V0ZXJDYWNoZVsgdHlwZSBdIHx8IFtdO1xuICAgICAgICAgICAgICBub2RlSW5kZXggPSBjYWNoZVswXSA9PT0gZGlycnVucyAmJiBjYWNoZVsxXTtcbiAgICAgICAgICAgICAgZGlmZiA9IGNhY2hlWzBdID09PSBkaXJydW5zICYmIGNhY2hlWzJdO1xuICAgICAgICAgICAgICBub2RlID0gbm9kZUluZGV4ICYmIHBhcmVudC5jaGlsZE5vZGVzWyBub2RlSW5kZXggXTtcblxuICAgICAgICAgICAgICB3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuXG4gICAgICAgICAgICAgICAgLy8gRmFsbGJhY2sgdG8gc2Vla2luZyBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcbiAgICAgICAgICAgICAgICAoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gZm91bmQsIGNhY2hlIGluZGV4ZXMgb24gYHBhcmVudGAgYW5kIGJyZWFrXG4gICAgICAgICAgICAgICAgaWYgKCBub2RlLm5vZGVUeXBlID09PSAxICYmICsrZGlmZiAmJiBub2RlID09PSBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgb3V0ZXJDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBub2RlSW5kZXgsIGRpZmYgXTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVc2UgcHJldmlvdXNseS1jYWNoZWQgZWxlbWVudCBpbmRleCBpZiBhdmFpbGFibGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHVzZUNhY2hlICYmIChjYWNoZSA9IChlbGVtWyBleHBhbmRvIF0gfHwgKGVsZW1bIGV4cGFuZG8gXSA9IHt9KSlbIHR5cGUgXSkgJiYgY2FjaGVbMF0gPT09IGRpcnJ1bnMgKSB7XG4gICAgICAgICAgICAgIGRpZmYgPSBjYWNoZVsxXTtcblxuICAgICAgICAgICAgLy8geG1sIDpudGgtY2hpbGQoLi4uKSBvciA6bnRoLWxhc3QtY2hpbGQoLi4uKSBvciA6bnRoKC1sYXN0KT8tb2YtdHlwZSguLi4pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBVc2UgdGhlIHNhbWUgbG9vcCBhcyBhYm92ZSB0byBzZWVrIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuICAgICAgICAgICAgICB3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuICAgICAgICAgICAgICAgIChkaWZmID0gbm9kZUluZGV4ID0gMCkgfHwgc3RhcnQucG9wKCkpICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCAoIG9mVHlwZSA/IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6IG5vZGUubm9kZVR5cGUgPT09IDEgKSAmJiArK2RpZmYgKSB7XG4gICAgICAgICAgICAgICAgICAvLyBDYWNoZSB0aGUgaW5kZXggb2YgZWFjaCBlbmNvdW50ZXJlZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICBpZiAoIHVzZUNhY2hlICkge1xuICAgICAgICAgICAgICAgICAgICAobm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSkpWyB0eXBlIF0gPSBbIGRpcnJ1bnMsIGRpZmYgXTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKCBub2RlID09PSBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSW5jb3Jwb3JhdGUgdGhlIG9mZnNldCwgdGhlbiBjaGVjayBhZ2FpbnN0IGN5Y2xlIHNpemVcbiAgICAgICAgICAgIGRpZmYgLT0gbGFzdDtcbiAgICAgICAgICAgIHJldHVybiBkaWZmID09PSBmaXJzdCB8fCAoIGRpZmYgJSBmaXJzdCA9PT0gMCAmJiBkaWZmIC8gZmlyc3QgPj0gMCApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgXCJQU0VVRE9cIjogZnVuY3Rpb24oIHBzZXVkbywgYXJndW1lbnQgKSB7XG4gICAgICAvLyBwc2V1ZG8tY2xhc3MgbmFtZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmVcbiAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jcHNldWRvLWNsYXNzZXNcbiAgICAgIC8vIFByaW9yaXRpemUgYnkgY2FzZSBzZW5zaXRpdml0eSBpbiBjYXNlIGN1c3RvbSBwc2V1ZG9zIGFyZSBhZGRlZCB3aXRoIHVwcGVyY2FzZSBsZXR0ZXJzXG4gICAgICAvLyBSZW1lbWJlciB0aGF0IHNldEZpbHRlcnMgaW5oZXJpdHMgZnJvbSBwc2V1ZG9zXG4gICAgICB2YXIgYXJncyxcbiAgICAgICAgZm4gPSBFeHByLnBzZXVkb3NbIHBzZXVkbyBdIHx8IEV4cHIuc2V0RmlsdGVyc1sgcHNldWRvLnRvTG93ZXJDYXNlKCkgXSB8fFxuICAgICAgICAgIFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBwc2V1ZG86IFwiICsgcHNldWRvICk7XG5cbiAgICAgIC8vIFRoZSB1c2VyIG1heSB1c2UgY3JlYXRlUHNldWRvIHRvIGluZGljYXRlIHRoYXRcbiAgICAgIC8vIGFyZ3VtZW50cyBhcmUgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgZmlsdGVyIGZ1bmN0aW9uXG4gICAgICAvLyBqdXN0IGFzIFNpenpsZSBkb2VzXG4gICAgICBpZiAoIGZuWyBleHBhbmRvIF0gKSB7XG4gICAgICAgIHJldHVybiBmbiggYXJndW1lbnQgKTtcbiAgICAgIH1cblxuICAgICAgLy8gQnV0IG1haW50YWluIHN1cHBvcnQgZm9yIG9sZCBzaWduYXR1cmVzXG4gICAgICBpZiAoIGZuLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgIGFyZ3MgPSBbIHBzZXVkbywgcHNldWRvLCBcIlwiLCBhcmd1bWVudCBdO1xuICAgICAgICByZXR1cm4gRXhwci5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KCBwc2V1ZG8udG9Mb3dlckNhc2UoKSApID9cbiAgICAgICAgICBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG4gICAgICAgICAgICB2YXIgaWR4LFxuICAgICAgICAgICAgICBtYXRjaGVkID0gZm4oIHNlZWQsIGFyZ3VtZW50ICksXG4gICAgICAgICAgICAgIGkgPSBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgICAgICBpZHggPSBpbmRleE9mKCBzZWVkLCBtYXRjaGVkW2ldICk7XG4gICAgICAgICAgICAgIHNlZWRbIGlkeCBdID0gISggbWF0Y2hlc1sgaWR4IF0gPSBtYXRjaGVkW2ldICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgOlxuICAgICAgICAgIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgcmV0dXJuIGZuKCBlbGVtLCAwLCBhcmdzICk7XG4gICAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuO1xuICAgIH1cbiAgfSxcblxuICBwc2V1ZG9zOiB7XG4gICAgLy8gUG90ZW50aWFsbHkgY29tcGxleCBwc2V1ZG9zXG4gICAgXCJub3RcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgICAgIC8vIFRyaW0gdGhlIHNlbGVjdG9yIHBhc3NlZCB0byBjb21waWxlXG4gICAgICAvLyB0byBhdm9pZCB0cmVhdGluZyBsZWFkaW5nIGFuZCB0cmFpbGluZ1xuICAgICAgLy8gc3BhY2VzIGFzIGNvbWJpbmF0b3JzXG4gICAgICB2YXIgaW5wdXQgPSBbXSxcbiAgICAgICAgcmVzdWx0cyA9IFtdLFxuICAgICAgICBtYXRjaGVyID0gY29tcGlsZSggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApICk7XG5cbiAgICAgIHJldHVybiBtYXRjaGVyWyBleHBhbmRvIF0gP1xuICAgICAgICBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMsIGNvbnRleHQsIHhtbCApIHtcbiAgICAgICAgICB2YXIgZWxlbSxcbiAgICAgICAgICAgIHVubWF0Y2hlZCA9IG1hdGNoZXIoIHNlZWQsIG51bGwsIHhtbCwgW10gKSxcbiAgICAgICAgICAgIGkgPSBzZWVkLmxlbmd0aDtcblxuICAgICAgICAgIC8vIE1hdGNoIGVsZW1lbnRzIHVubWF0Y2hlZCBieSBgbWF0Y2hlcmBcbiAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgIGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xuICAgICAgICAgICAgICBzZWVkW2ldID0gIShtYXRjaGVzW2ldID0gZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSA6XG4gICAgICAgIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG4gICAgICAgICAgaW5wdXRbMF0gPSBlbGVtO1xuICAgICAgICAgIG1hdGNoZXIoIGlucHV0LCBudWxsLCB4bWwsIHJlc3VsdHMgKTtcbiAgICAgICAgICAvLyBEb24ndCBrZWVwIHRoZSBlbGVtZW50IChpc3N1ZSAjMjk5KVxuICAgICAgICAgIGlucHV0WzBdID0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gIXJlc3VsdHMucG9wKCk7XG4gICAgICAgIH07XG4gICAgfSksXG5cbiAgICBcImhhc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICByZXR1cm4gU2l6emxlKCBzZWxlY3RvciwgZWxlbSApLmxlbmd0aCA+IDA7XG4gICAgICB9O1xuICAgIH0pLFxuXG4gICAgXCJjb250YWluc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHRleHQgKSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICByZXR1cm4gKCBlbGVtLnRleHRDb250ZW50IHx8IGVsZW0uaW5uZXJUZXh0IHx8IGdldFRleHQoIGVsZW0gKSApLmluZGV4T2YoIHRleHQgKSA+IC0xO1xuICAgICAgfTtcbiAgICB9KSxcblxuICAgIC8vIFwiV2hldGhlciBhbiBlbGVtZW50IGlzIHJlcHJlc2VudGVkIGJ5IGEgOmxhbmcoKSBzZWxlY3RvclxuICAgIC8vIGlzIGJhc2VkIHNvbGVseSBvbiB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlXG4gICAgLy8gYmVpbmcgZXF1YWwgdG8gdGhlIGlkZW50aWZpZXIgQyxcbiAgICAvLyBvciBiZWdpbm5pbmcgd2l0aCB0aGUgaWRlbnRpZmllciBDIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IFwiLVwiLlxuICAgIC8vIFRoZSBtYXRjaGluZyBvZiBDIGFnYWluc3QgdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZSBpcyBwZXJmb3JtZWQgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuICAgIC8vIFRoZSBpZGVudGlmaWVyIEMgZG9lcyBub3QgaGF2ZSB0byBiZSBhIHZhbGlkIGxhbmd1YWdlIG5hbWUuXCJcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2xhbmctcHNldWRvXG4gICAgXCJsYW5nXCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIGxhbmcgKSB7XG4gICAgICAvLyBsYW5nIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBpZGVudGlmaWVyXG4gICAgICBpZiAoICFyaWRlbnRpZmllci50ZXN0KGxhbmcgfHwgXCJcIikgKSB7XG4gICAgICAgIFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBsYW5nOiBcIiArIGxhbmcgKTtcbiAgICAgIH1cbiAgICAgIGxhbmcgPSBsYW5nLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgdmFyIGVsZW1MYW5nO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgaWYgKCAoZWxlbUxhbmcgPSBkb2N1bWVudElzSFRNTCA/XG4gICAgICAgICAgICBlbGVtLmxhbmcgOlxuICAgICAgICAgICAgZWxlbS5nZXRBdHRyaWJ1dGUoXCJ4bWw6bGFuZ1wiKSB8fCBlbGVtLmdldEF0dHJpYnV0ZShcImxhbmdcIikpICkge1xuXG4gICAgICAgICAgICBlbGVtTGFuZyA9IGVsZW1MYW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbUxhbmcgPT09IGxhbmcgfHwgZWxlbUxhbmcuaW5kZXhPZiggbGFuZyArIFwiLVwiICkgPT09IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICggKGVsZW0gPSBlbGVtLnBhcmVudE5vZGUpICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcbiAgICB9KSxcblxuICAgIC8vIE1pc2NlbGxhbmVvdXNcbiAgICBcInRhcmdldFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgcmV0dXJuIGhhc2ggJiYgaGFzaC5zbGljZSggMSApID09PSBlbGVtLmlkO1xuICAgIH0sXG5cbiAgICBcInJvb3RcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gZWxlbSA9PT0gZG9jRWxlbTtcbiAgICB9LFxuXG4gICAgXCJmb2N1c1wiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICghZG9jdW1lbnQuaGFzRm9jdXMgfHwgZG9jdW1lbnQuaGFzRm9jdXMoKSkgJiYgISEoZWxlbS50eXBlIHx8IGVsZW0uaHJlZiB8fCB+ZWxlbS50YWJJbmRleCk7XG4gICAgfSxcblxuICAgIC8vIEJvb2xlYW4gcHJvcGVydGllc1xuICAgIFwiZW5hYmxlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiBlbGVtLmRpc2FibGVkID09PSBmYWxzZTtcbiAgICB9LFxuXG4gICAgXCJkaXNhYmxlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiBlbGVtLmRpc2FibGVkID09PSB0cnVlO1xuICAgIH0sXG5cbiAgICBcImNoZWNrZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAvLyBJbiBDU1MzLCA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIGJvdGggY2hlY2tlZCBhbmQgc2VsZWN0ZWQgZWxlbWVudHNcbiAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG4gICAgICB2YXIgbm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gKG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgISFlbGVtLmNoZWNrZWQpIHx8IChub2RlTmFtZSA9PT0gXCJvcHRpb25cIiAmJiAhIWVsZW0uc2VsZWN0ZWQpO1xuICAgIH0sXG5cbiAgICBcInNlbGVjdGVkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgLy8gQWNjZXNzaW5nIHRoaXMgcHJvcGVydHkgbWFrZXMgc2VsZWN0ZWQtYnktZGVmYXVsdFxuICAgICAgLy8gb3B0aW9ucyBpbiBTYWZhcmkgd29yayBwcm9wZXJseVxuICAgICAgaWYgKCBlbGVtLnBhcmVudE5vZGUgKSB7XG4gICAgICAgIGVsZW0ucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWxlbS5zZWxlY3RlZCA9PT0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLy8gQ29udGVudHNcbiAgICBcImVtcHR5XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNlbXB0eS1wc2V1ZG9cbiAgICAgIC8vIDplbXB0eSBpcyBuZWdhdGVkIGJ5IGVsZW1lbnQgKDEpIG9yIGNvbnRlbnQgbm9kZXMgKHRleHQ6IDM7IGNkYXRhOiA0OyBlbnRpdHkgcmVmOiA1KSxcbiAgICAgIC8vICAgYnV0IG5vdCBieSBvdGhlcnMgKGNvbW1lbnQ6IDg7IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb246IDc7IGV0Yy4pXG4gICAgICAvLyBub2RlVHlwZSA8IDYgd29ya3MgYmVjYXVzZSBhdHRyaWJ1dGVzICgyKSBkbyBub3QgYXBwZWFyIGFzIGNoaWxkcmVuXG4gICAgICBmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcbiAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlIDwgNiApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBcInBhcmVudFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiAhRXhwci5wc2V1ZG9zW1wiZW1wdHlcIl0oIGVsZW0gKTtcbiAgICB9LFxuXG4gICAgLy8gRWxlbWVudC9pbnB1dCB0eXBlc1xuICAgIFwiaGVhZGVyXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgcmV0dXJuIHJoZWFkZXIudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuICAgIH0sXG5cbiAgICBcImlucHV0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgcmV0dXJuIHJpbnB1dHMudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuICAgIH0sXG5cbiAgICBcImJ1dHRvblwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IFwiYnV0dG9uXCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIjtcbiAgICB9LFxuXG4gICAgXCJ0ZXh0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgdmFyIGF0dHI7XG4gICAgICByZXR1cm4gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgJiZcbiAgICAgICAgZWxlbS50eXBlID09PSBcInRleHRcIiAmJlxuXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFPDhcbiAgICAgICAgLy8gTmV3IEhUTUw1IGF0dHJpYnV0ZSB2YWx1ZXMgKGUuZy4sIFwic2VhcmNoXCIpIGFwcGVhciB3aXRoIGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCJcbiAgICAgICAgKCAoYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkgPT0gbnVsbCB8fCBhdHRyLnRvTG93ZXJDYXNlKCkgPT09IFwidGV4dFwiICk7XG4gICAgfSxcblxuICAgIC8vIFBvc2l0aW9uLWluLWNvbGxlY3Rpb25cbiAgICBcImZpcnN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gWyAwIF07XG4gICAgfSksXG5cbiAgICBcImxhc3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG4gICAgICByZXR1cm4gWyBsZW5ndGggLSAxIF07XG4gICAgfSksXG5cbiAgICBcImVxXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcbiAgICAgIHJldHVybiBbIGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQgXTtcbiAgICB9KSxcblxuICAgIFwiZXZlblwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuICAgICAgICBtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoSW5kZXhlcztcbiAgICB9KSxcblxuICAgIFwib2RkXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuICAgICAgdmFyIGkgPSAxO1xuICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XG4gICAgICAgIG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xuICAgIH0pLFxuXG4gICAgXCJsdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG4gICAgICB2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG4gICAgICBmb3IgKCA7IC0taSA+PSAwOyApIHtcbiAgICAgICAgbWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaEluZGV4ZXM7XG4gICAgfSksXG5cbiAgICBcImd0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcbiAgICAgIHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcbiAgICAgIGZvciAoIDsgKytpIDwgbGVuZ3RoOyApIHtcbiAgICAgICAgbWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaEluZGV4ZXM7XG4gICAgfSlcbiAgfVxufTtcblxuRXhwci5wc2V1ZG9zW1wibnRoXCJdID0gRXhwci5wc2V1ZG9zW1wiZXFcIl07XG5cbi8vIEFkZCBidXR0b24vaW5wdXQgdHlwZSBwc2V1ZG9zXG5mb3IgKCBpIGluIHsgcmFkaW86IHRydWUsIGNoZWNrYm94OiB0cnVlLCBmaWxlOiB0cnVlLCBwYXNzd29yZDogdHJ1ZSwgaW1hZ2U6IHRydWUgfSApIHtcbiAgRXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVJbnB1dFBzZXVkbyggaSApO1xufVxuZm9yICggaSBpbiB7IHN1Ym1pdDogdHJ1ZSwgcmVzZXQ6IHRydWUgfSApIHtcbiAgRXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVCdXR0b25Qc2V1ZG8oIGkgKTtcbn1cblxuLy8gRWFzeSBBUEkgZm9yIGNyZWF0aW5nIG5ldyBzZXRGaWx0ZXJzXG5mdW5jdGlvbiBzZXRGaWx0ZXJzKCkge31cbnNldEZpbHRlcnMucHJvdG90eXBlID0gRXhwci5maWx0ZXJzID0gRXhwci5wc2V1ZG9zO1xuRXhwci5zZXRGaWx0ZXJzID0gbmV3IHNldEZpbHRlcnMoKTtcblxudG9rZW5pemUgPSBTaXp6bGUudG9rZW5pemUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIHBhcnNlT25seSApIHtcbiAgdmFyIG1hdGNoZWQsIG1hdGNoLCB0b2tlbnMsIHR5cGUsXG4gICAgc29GYXIsIGdyb3VwcywgcHJlRmlsdGVycyxcbiAgICBjYWNoZWQgPSB0b2tlbkNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cbiAgaWYgKCBjYWNoZWQgKSB7XG4gICAgcmV0dXJuIHBhcnNlT25seSA/IDAgOiBjYWNoZWQuc2xpY2UoIDAgKTtcbiAgfVxuXG4gIHNvRmFyID0gc2VsZWN0b3I7XG4gIGdyb3VwcyA9IFtdO1xuICBwcmVGaWx0ZXJzID0gRXhwci5wcmVGaWx0ZXI7XG5cbiAgd2hpbGUgKCBzb0ZhciApIHtcblxuICAgIC8vIENvbW1hIGFuZCBmaXJzdCBydW5cbiAgICBpZiAoICFtYXRjaGVkIHx8IChtYXRjaCA9IHJjb21tYS5leGVjKCBzb0ZhciApKSApIHtcbiAgICAgIGlmICggbWF0Y2ggKSB7XG4gICAgICAgIC8vIERvbid0IGNvbnN1bWUgdHJhaWxpbmcgY29tbWFzIGFzIHZhbGlkXG4gICAgICAgIHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoWzBdLmxlbmd0aCApIHx8IHNvRmFyO1xuICAgICAgfVxuICAgICAgZ3JvdXBzLnB1c2goICh0b2tlbnMgPSBbXSkgKTtcbiAgICB9XG5cbiAgICBtYXRjaGVkID0gZmFsc2U7XG5cbiAgICAvLyBDb21iaW5hdG9yc1xuICAgIGlmICggKG1hdGNoID0gcmNvbWJpbmF0b3JzLmV4ZWMoIHNvRmFyICkpICkge1xuICAgICAgbWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHZhbHVlOiBtYXRjaGVkLFxuICAgICAgICAvLyBDYXN0IGRlc2NlbmRhbnQgY29tYmluYXRvcnMgdG8gc3BhY2VcbiAgICAgICAgdHlwZTogbWF0Y2hbMF0ucmVwbGFjZSggcnRyaW0sIFwiIFwiIClcbiAgICAgIH0pO1xuICAgICAgc29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcbiAgICB9XG5cbiAgICAvLyBGaWx0ZXJzXG4gICAgZm9yICggdHlwZSBpbiBFeHByLmZpbHRlciApIHtcbiAgICAgIGlmICggKG1hdGNoID0gbWF0Y2hFeHByWyB0eXBlIF0uZXhlYyggc29GYXIgKSkgJiYgKCFwcmVGaWx0ZXJzWyB0eXBlIF0gfHxcbiAgICAgICAgKG1hdGNoID0gcHJlRmlsdGVyc1sgdHlwZSBdKCBtYXRjaCApKSkgKSB7XG4gICAgICAgIG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdmFsdWU6IG1hdGNoZWQsXG4gICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICBtYXRjaGVzOiBtYXRjaFxuICAgICAgICB9KTtcbiAgICAgICAgc29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoICFtYXRjaGVkICkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGludmFsaWQgZXhjZXNzXG4gIC8vIGlmIHdlJ3JlIGp1c3QgcGFyc2luZ1xuICAvLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yIG9yIHJldHVybiB0b2tlbnNcbiAgcmV0dXJuIHBhcnNlT25seSA/XG4gICAgc29GYXIubGVuZ3RoIDpcbiAgICBzb0ZhciA/XG4gICAgICBTaXp6bGUuZXJyb3IoIHNlbGVjdG9yICkgOlxuICAgICAgLy8gQ2FjaGUgdGhlIHRva2Vuc1xuICAgICAgdG9rZW5DYWNoZSggc2VsZWN0b3IsIGdyb3VwcyApLnNsaWNlKCAwICk7XG59O1xuXG5mdW5jdGlvbiB0b1NlbGVjdG9yKCB0b2tlbnMgKSB7XG4gIHZhciBpID0gMCxcbiAgICBsZW4gPSB0b2tlbnMubGVuZ3RoLFxuICAgIHNlbGVjdG9yID0gXCJcIjtcbiAgZm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgc2VsZWN0b3IgKz0gdG9rZW5zW2ldLnZhbHVlO1xuICB9XG4gIHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZnVuY3Rpb24gYWRkQ29tYmluYXRvciggbWF0Y2hlciwgY29tYmluYXRvciwgYmFzZSApIHtcbiAgdmFyIGRpciA9IGNvbWJpbmF0b3IuZGlyLFxuICAgIGNoZWNrTm9uRWxlbWVudHMgPSBiYXNlICYmIGRpciA9PT0gXCJwYXJlbnROb2RlXCIsXG4gICAgZG9uZU5hbWUgPSBkb25lKys7XG5cbiAgcmV0dXJuIGNvbWJpbmF0b3IuZmlyc3QgP1xuICAgIC8vIENoZWNrIGFnYWluc3QgY2xvc2VzdCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudFxuICAgIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG4gICAgICB3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcbiAgICAgICAgICByZXR1cm4gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IDpcblxuICAgIC8vIENoZWNrIGFnYWluc3QgYWxsIGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50c1xuICAgIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG4gICAgICB2YXIgb2xkQ2FjaGUsIG91dGVyQ2FjaGUsXG4gICAgICAgIG5ld0NhY2hlID0gWyBkaXJydW5zLCBkb25lTmFtZSBdO1xuXG4gICAgICAvLyBXZSBjYW4ndCBzZXQgYXJiaXRyYXJ5IGRhdGEgb24gWE1MIG5vZGVzLCBzbyB0aGV5IGRvbid0IGJlbmVmaXQgZnJvbSBkaXIgY2FjaGluZ1xuICAgICAgaWYgKCB4bWwgKSB7XG4gICAgICAgIHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG4gICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG4gICAgICAgICAgICBpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG4gICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG4gICAgICAgICAgICBvdXRlckNhY2hlID0gZWxlbVsgZXhwYW5kbyBdIHx8IChlbGVtWyBleHBhbmRvIF0gPSB7fSk7XG4gICAgICAgICAgICBpZiAoIChvbGRDYWNoZSA9IG91dGVyQ2FjaGVbIGRpciBdKSAmJlxuICAgICAgICAgICAgICBvbGRDYWNoZVsgMCBdID09PSBkaXJydW5zICYmIG9sZENhY2hlWyAxIF0gPT09IGRvbmVOYW1lICkge1xuXG4gICAgICAgICAgICAgIC8vIEFzc2lnbiB0byBuZXdDYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXG4gICAgICAgICAgICAgIHJldHVybiAobmV3Q2FjaGVbIDIgXSA9IG9sZENhY2hlWyAyIF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gUmV1c2UgbmV3Y2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuICAgICAgICAgICAgICBvdXRlckNhY2hlWyBkaXIgXSA9IG5ld0NhY2hlO1xuXG4gICAgICAgICAgICAgIC8vIEEgbWF0Y2ggbWVhbnMgd2UncmUgZG9uZTsgYSBmYWlsIG1lYW5zIHdlIGhhdmUgdG8ga2VlcCBjaGVja2luZ1xuICAgICAgICAgICAgICBpZiAoIChuZXdDYWNoZVsgMiBdID0gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICkge1xuICByZXR1cm4gbWF0Y2hlcnMubGVuZ3RoID4gMSA/XG4gICAgZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcbiAgICAgIHZhciBpID0gbWF0Y2hlcnMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgIGlmICggIW1hdGNoZXJzW2ldKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gOlxuICAgIG1hdGNoZXJzWzBdO1xufVxuXG5mdW5jdGlvbiBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciwgY29udGV4dHMsIHJlc3VsdHMgKSB7XG4gIHZhciBpID0gMCxcbiAgICBsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG4gIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgIFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHRzW2ldLCByZXN1bHRzICk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIGNvbmRlbnNlKCB1bm1hdGNoZWQsIG1hcCwgZmlsdGVyLCBjb250ZXh0LCB4bWwgKSB7XG4gIHZhciBlbGVtLFxuICAgIG5ld1VubWF0Y2hlZCA9IFtdLFxuICAgIGkgPSAwLFxuICAgIGxlbiA9IHVubWF0Y2hlZC5sZW5ndGgsXG4gICAgbWFwcGVkID0gbWFwICE9IG51bGw7XG5cbiAgZm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgaWYgKCAoZWxlbSA9IHVubWF0Y2hlZFtpXSkgKSB7XG4gICAgICBpZiAoICFmaWx0ZXIgfHwgZmlsdGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcbiAgICAgICAgbmV3VW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcbiAgICAgICAgaWYgKCBtYXBwZWQgKSB7XG4gICAgICAgICAgbWFwLnB1c2goIGkgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdVbm1hdGNoZWQ7XG59XG5cbmZ1bmN0aW9uIHNldE1hdGNoZXIoIHByZUZpbHRlciwgc2VsZWN0b3IsIG1hdGNoZXIsIHBvc3RGaWx0ZXIsIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApIHtcbiAgaWYgKCBwb3N0RmlsdGVyICYmICFwb3N0RmlsdGVyWyBleHBhbmRvIF0gKSB7XG4gICAgcG9zdEZpbHRlciA9IHNldE1hdGNoZXIoIHBvc3RGaWx0ZXIgKTtcbiAgfVxuICBpZiAoIHBvc3RGaW5kZXIgJiYgIXBvc3RGaW5kZXJbIGV4cGFuZG8gXSApIHtcbiAgICBwb3N0RmluZGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICk7XG4gIH1cbiAgcmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgcmVzdWx0cywgY29udGV4dCwgeG1sICkge1xuICAgIHZhciB0ZW1wLCBpLCBlbGVtLFxuICAgICAgcHJlTWFwID0gW10sXG4gICAgICBwb3N0TWFwID0gW10sXG4gICAgICBwcmVleGlzdGluZyA9IHJlc3VsdHMubGVuZ3RoLFxuXG4gICAgICAvLyBHZXQgaW5pdGlhbCBlbGVtZW50cyBmcm9tIHNlZWQgb3IgY29udGV4dFxuICAgICAgZWxlbXMgPSBzZWVkIHx8IG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yIHx8IFwiKlwiLCBjb250ZXh0Lm5vZGVUeXBlID8gWyBjb250ZXh0IF0gOiBjb250ZXh0LCBbXSApLFxuXG4gICAgICAvLyBQcmVmaWx0ZXIgdG8gZ2V0IG1hdGNoZXIgaW5wdXQsIHByZXNlcnZpbmcgYSBtYXAgZm9yIHNlZWQtcmVzdWx0cyBzeW5jaHJvbml6YXRpb25cbiAgICAgIG1hdGNoZXJJbiA9IHByZUZpbHRlciAmJiAoIHNlZWQgfHwgIXNlbGVjdG9yICkgP1xuICAgICAgICBjb25kZW5zZSggZWxlbXMsIHByZU1hcCwgcHJlRmlsdGVyLCBjb250ZXh0LCB4bWwgKSA6XG4gICAgICAgIGVsZW1zLFxuXG4gICAgICBtYXRjaGVyT3V0ID0gbWF0Y2hlciA/XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYSBwb3N0RmluZGVyLCBvciBmaWx0ZXJlZCBzZWVkLCBvciBub24tc2VlZCBwb3N0RmlsdGVyIG9yIHByZWV4aXN0aW5nIHJlc3VsdHMsXG4gICAgICAgIHBvc3RGaW5kZXIgfHwgKCBzZWVkID8gcHJlRmlsdGVyIDogcHJlZXhpc3RpbmcgfHwgcG9zdEZpbHRlciApID9cblxuICAgICAgICAgIC8vIC4uLmludGVybWVkaWF0ZSBwcm9jZXNzaW5nIGlzIG5lY2Vzc2FyeVxuICAgICAgICAgIFtdIDpcblxuICAgICAgICAgIC8vIC4uLm90aGVyd2lzZSB1c2UgcmVzdWx0cyBkaXJlY3RseVxuICAgICAgICAgIHJlc3VsdHMgOlxuICAgICAgICBtYXRjaGVySW47XG5cbiAgICAvLyBGaW5kIHByaW1hcnkgbWF0Y2hlc1xuICAgIGlmICggbWF0Y2hlciApIHtcbiAgICAgIG1hdGNoZXIoIG1hdGNoZXJJbiwgbWF0Y2hlck91dCwgY29udGV4dCwgeG1sICk7XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgcG9zdEZpbHRlclxuICAgIGlmICggcG9zdEZpbHRlciApIHtcbiAgICAgIHRlbXAgPSBjb25kZW5zZSggbWF0Y2hlck91dCwgcG9zdE1hcCApO1xuICAgICAgcG9zdEZpbHRlciggdGVtcCwgW10sIGNvbnRleHQsIHhtbCApO1xuXG4gICAgICAvLyBVbi1tYXRjaCBmYWlsaW5nIGVsZW1lbnRzIGJ5IG1vdmluZyB0aGVtIGJhY2sgdG8gbWF0Y2hlckluXG4gICAgICBpID0gdGVtcC5sZW5ndGg7XG4gICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgaWYgKCAoZWxlbSA9IHRlbXBbaV0pICkge1xuICAgICAgICAgIG1hdGNoZXJPdXRbIHBvc3RNYXBbaV0gXSA9ICEobWF0Y2hlckluWyBwb3N0TWFwW2ldIF0gPSBlbGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggc2VlZCApIHtcbiAgICAgIGlmICggcG9zdEZpbmRlciB8fCBwcmVGaWx0ZXIgKSB7XG4gICAgICAgIGlmICggcG9zdEZpbmRlciApIHtcbiAgICAgICAgICAvLyBHZXQgdGhlIGZpbmFsIG1hdGNoZXJPdXQgYnkgY29uZGVuc2luZyB0aGlzIGludGVybWVkaWF0ZSBpbnRvIHBvc3RGaW5kZXIgY29udGV4dHNcbiAgICAgICAgICB0ZW1wID0gW107XG4gICAgICAgICAgaSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgICAgaWYgKCAoZWxlbSA9IG1hdGNoZXJPdXRbaV0pICkge1xuICAgICAgICAgICAgICAvLyBSZXN0b3JlIG1hdGNoZXJJbiBzaW5jZSBlbGVtIGlzIG5vdCB5ZXQgYSBmaW5hbCBtYXRjaFxuICAgICAgICAgICAgICB0ZW1wLnB1c2goIChtYXRjaGVySW5baV0gPSBlbGVtKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBwb3N0RmluZGVyKCBudWxsLCAobWF0Y2hlck91dCA9IFtdKSwgdGVtcCwgeG1sICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNb3ZlIG1hdGNoZWQgZWxlbWVudHMgZnJvbSBzZWVkIHRvIHJlc3VsdHMgdG8ga2VlcCB0aGVtIHN5bmNocm9uaXplZFxuICAgICAgICBpID0gbWF0Y2hlck91dC5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgIGlmICggKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSAmJlxuICAgICAgICAgICAgKHRlbXAgPSBwb3N0RmluZGVyID8gaW5kZXhPZiggc2VlZCwgZWxlbSApIDogcHJlTWFwW2ldKSA+IC0xICkge1xuXG4gICAgICAgICAgICBzZWVkW3RlbXBdID0gIShyZXN1bHRzW3RlbXBdID0gZWxlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAvLyBBZGQgZWxlbWVudHMgdG8gcmVzdWx0cywgdGhyb3VnaCBwb3N0RmluZGVyIGlmIGRlZmluZWRcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2hlck91dCA9IGNvbmRlbnNlKFxuICAgICAgICBtYXRjaGVyT3V0ID09PSByZXN1bHRzID9cbiAgICAgICAgICBtYXRjaGVyT3V0LnNwbGljZSggcHJlZXhpc3RpbmcsIG1hdGNoZXJPdXQubGVuZ3RoICkgOlxuICAgICAgICAgIG1hdGNoZXJPdXRcbiAgICAgICk7XG4gICAgICBpZiAoIHBvc3RGaW5kZXIgKSB7XG4gICAgICAgIHBvc3RGaW5kZXIoIG51bGwsIHJlc3VsdHMsIG1hdGNoZXJPdXQsIHhtbCApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cywgbWF0Y2hlck91dCApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMgKSB7XG4gIHZhciBjaGVja0NvbnRleHQsIG1hdGNoZXIsIGosXG4gICAgbGVuID0gdG9rZW5zLmxlbmd0aCxcbiAgICBsZWFkaW5nUmVsYXRpdmUgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbMF0udHlwZSBdLFxuICAgIGltcGxpY2l0UmVsYXRpdmUgPSBsZWFkaW5nUmVsYXRpdmUgfHwgRXhwci5yZWxhdGl2ZVtcIiBcIl0sXG4gICAgaSA9IGxlYWRpbmdSZWxhdGl2ZSA/IDEgOiAwLFxuXG4gICAgLy8gVGhlIGZvdW5kYXRpb25hbCBtYXRjaGVyIGVuc3VyZXMgdGhhdCBlbGVtZW50cyBhcmUgcmVhY2hhYmxlIGZyb20gdG9wLWxldmVsIGNvbnRleHQocylcbiAgICBtYXRjaENvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiBlbGVtID09PSBjaGVja0NvbnRleHQ7XG4gICAgfSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuICAgIG1hdGNoQW55Q29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgcmV0dXJuIGluZGV4T2YoIGNoZWNrQ29udGV4dCwgZWxlbSApID4gLTE7XG4gICAgfSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuICAgIG1hdGNoZXJzID0gWyBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgdmFyIHJldCA9ICggIWxlYWRpbmdSZWxhdGl2ZSAmJiAoIHhtbCB8fCBjb250ZXh0ICE9PSBvdXRlcm1vc3RDb250ZXh0ICkgKSB8fCAoXG4gICAgICAgIChjaGVja0NvbnRleHQgPSBjb250ZXh0KS5ub2RlVHlwZSA/XG4gICAgICAgICAgbWF0Y2hDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSA6XG4gICAgICAgICAgbWF0Y2hBbnlDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSApO1xuICAgICAgLy8gQXZvaWQgaGFuZ2luZyBvbnRvIGVsZW1lbnQgKGlzc3VlICMyOTkpXG4gICAgICBjaGVja0NvbnRleHQgPSBudWxsO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9IF07XG5cbiAgZm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgaWYgKCAobWF0Y2hlciA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1tpXS50eXBlIF0pICkge1xuICAgICAgbWF0Y2hlcnMgPSBbIGFkZENvbWJpbmF0b3IoZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksIG1hdGNoZXIpIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZXIgPSBFeHByLmZpbHRlclsgdG9rZW5zW2ldLnR5cGUgXS5hcHBseSggbnVsbCwgdG9rZW5zW2ldLm1hdGNoZXMgKTtcblxuICAgICAgLy8gUmV0dXJuIHNwZWNpYWwgdXBvbiBzZWVpbmcgYSBwb3NpdGlvbmFsIG1hdGNoZXJcbiAgICAgIGlmICggbWF0Y2hlclsgZXhwYW5kbyBdICkge1xuICAgICAgICAvLyBGaW5kIHRoZSBuZXh0IHJlbGF0aXZlIG9wZXJhdG9yIChpZiBhbnkpIGZvciBwcm9wZXIgaGFuZGxpbmdcbiAgICAgICAgaiA9ICsraTtcbiAgICAgICAgZm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG4gICAgICAgICAgaWYgKCBFeHByLnJlbGF0aXZlWyB0b2tlbnNbal0udHlwZSBdICkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXRNYXRjaGVyKFxuICAgICAgICAgIGkgPiAxICYmIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLFxuICAgICAgICAgIGkgPiAxICYmIHRvU2VsZWN0b3IoXG4gICAgICAgICAgICAvLyBJZiB0aGUgcHJlY2VkaW5nIHRva2VuIHdhcyBhIGRlc2NlbmRhbnQgY29tYmluYXRvciwgaW5zZXJ0IGFuIGltcGxpY2l0IGFueS1lbGVtZW50IGAqYFxuICAgICAgICAgICAgdG9rZW5zLnNsaWNlKCAwLCBpIC0gMSApLmNvbmNhdCh7IHZhbHVlOiB0b2tlbnNbIGkgLSAyIF0udHlwZSA9PT0gXCIgXCIgPyBcIipcIiA6IFwiXCIgfSlcbiAgICAgICAgICApLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSxcbiAgICAgICAgICBtYXRjaGVyLFxuICAgICAgICAgIGkgPCBqICYmIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMuc2xpY2UoIGksIGogKSApLFxuICAgICAgICAgIGogPCBsZW4gJiYgbWF0Y2hlckZyb21Ub2tlbnMoICh0b2tlbnMgPSB0b2tlbnMuc2xpY2UoIGogKSkgKSxcbiAgICAgICAgICBqIDwgbGVuICYmIHRvU2VsZWN0b3IoIHRva2VucyApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBtYXRjaGVycy5wdXNoKCBtYXRjaGVyICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSB7XG4gIHZhciBieVNldCA9IHNldE1hdGNoZXJzLmxlbmd0aCA+IDAsXG4gICAgYnlFbGVtZW50ID0gZWxlbWVudE1hdGNoZXJzLmxlbmd0aCA+IDAsXG4gICAgc3VwZXJNYXRjaGVyID0gZnVuY3Rpb24oIHNlZWQsIGNvbnRleHQsIHhtbCwgcmVzdWx0cywgb3V0ZXJtb3N0ICkge1xuICAgICAgdmFyIGVsZW0sIGosIG1hdGNoZXIsXG4gICAgICAgIG1hdGNoZWRDb3VudCA9IDAsXG4gICAgICAgIGkgPSBcIjBcIixcbiAgICAgICAgdW5tYXRjaGVkID0gc2VlZCAmJiBbXSxcbiAgICAgICAgc2V0TWF0Y2hlZCA9IFtdLFxuICAgICAgICBjb250ZXh0QmFja3VwID0gb3V0ZXJtb3N0Q29udGV4dCxcbiAgICAgICAgLy8gV2UgbXVzdCBhbHdheXMgaGF2ZSBlaXRoZXIgc2VlZCBlbGVtZW50cyBvciBvdXRlcm1vc3QgY29udGV4dFxuICAgICAgICBlbGVtcyA9IHNlZWQgfHwgYnlFbGVtZW50ICYmIEV4cHIuZmluZFtcIlRBR1wiXSggXCIqXCIsIG91dGVybW9zdCApLFxuICAgICAgICAvLyBVc2UgaW50ZWdlciBkaXJydW5zIGlmZiB0aGlzIGlzIHRoZSBvdXRlcm1vc3QgbWF0Y2hlclxuICAgICAgICBkaXJydW5zVW5pcXVlID0gKGRpcnJ1bnMgKz0gY29udGV4dEJhY2t1cCA9PSBudWxsID8gMSA6IE1hdGgucmFuZG9tKCkgfHwgMC4xKSxcbiAgICAgICAgbGVuID0gZWxlbXMubGVuZ3RoO1xuXG4gICAgICBpZiAoIG91dGVybW9zdCApIHtcbiAgICAgICAgb3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHQgIT09IGRvY3VtZW50ICYmIGNvbnRleHQ7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBlbGVtZW50cyBwYXNzaW5nIGVsZW1lbnRNYXRjaGVycyBkaXJlY3RseSB0byByZXN1bHRzXG4gICAgICAvLyBLZWVwIGBpYCBhIHN0cmluZyBpZiB0aGVyZSBhcmUgbm8gZWxlbWVudHMgc28gYG1hdGNoZWRDb3VudGAgd2lsbCBiZSBcIjAwXCIgYmVsb3dcbiAgICAgIC8vIFN1cHBvcnQ6IElFPDksIFNhZmFyaVxuICAgICAgLy8gVG9sZXJhdGUgTm9kZUxpc3QgcHJvcGVydGllcyAoSUU6IFwibGVuZ3RoXCI7IFNhZmFyaTogPG51bWJlcj4pIG1hdGNoaW5nIGVsZW1lbnRzIGJ5IGlkXG4gICAgICBmb3IgKCA7IGkgIT09IGxlbiAmJiAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XG4gICAgICAgIGlmICggYnlFbGVtZW50ICYmIGVsZW0gKSB7XG4gICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgd2hpbGUgKCAobWF0Y2hlciA9IGVsZW1lbnRNYXRjaGVyc1tqKytdKSApIHtcbiAgICAgICAgICAgIGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCggZWxlbSApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCBvdXRlcm1vc3QgKSB7XG4gICAgICAgICAgICBkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcmFjayB1bm1hdGNoZWQgZWxlbWVudHMgZm9yIHNldCBmaWx0ZXJzXG4gICAgICAgIGlmICggYnlTZXQgKSB7XG4gICAgICAgICAgLy8gVGhleSB3aWxsIGhhdmUgZ29uZSB0aHJvdWdoIGFsbCBwb3NzaWJsZSBtYXRjaGVyc1xuICAgICAgICAgIGlmICggKGVsZW0gPSAhbWF0Y2hlciAmJiBlbGVtKSApIHtcbiAgICAgICAgICAgIG1hdGNoZWRDb3VudC0tO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIExlbmd0aGVuIHRoZSBhcnJheSBmb3IgZXZlcnkgZWxlbWVudCwgbWF0Y2hlZCBvciBub3RcbiAgICAgICAgICBpZiAoIHNlZWQgKSB7XG4gICAgICAgICAgICB1bm1hdGNoZWQucHVzaCggZWxlbSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBcHBseSBzZXQgZmlsdGVycyB0byB1bm1hdGNoZWQgZWxlbWVudHNcbiAgICAgIG1hdGNoZWRDb3VudCArPSBpO1xuICAgICAgaWYgKCBieVNldCAmJiBpICE9PSBtYXRjaGVkQ291bnQgKSB7XG4gICAgICAgIGogPSAwO1xuICAgICAgICB3aGlsZSAoIChtYXRjaGVyID0gc2V0TWF0Y2hlcnNbaisrXSkgKSB7XG4gICAgICAgICAgbWF0Y2hlciggdW5tYXRjaGVkLCBzZXRNYXRjaGVkLCBjb250ZXh0LCB4bWwgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggc2VlZCApIHtcbiAgICAgICAgICAvLyBSZWludGVncmF0ZSBlbGVtZW50IG1hdGNoZXMgdG8gZWxpbWluYXRlIHRoZSBuZWVkIGZvciBzb3J0aW5nXG4gICAgICAgICAgaWYgKCBtYXRjaGVkQ291bnQgPiAwICkge1xuICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgICAgIGlmICggISh1bm1hdGNoZWRbaV0gfHwgc2V0TWF0Y2hlZFtpXSkgKSB7XG4gICAgICAgICAgICAgICAgc2V0TWF0Y2hlZFtpXSA9IHBvcC5jYWxsKCByZXN1bHRzICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBEaXNjYXJkIGluZGV4IHBsYWNlaG9sZGVyIHZhbHVlcyB0byBnZXQgb25seSBhY3R1YWwgbWF0Y2hlc1xuICAgICAgICAgIHNldE1hdGNoZWQgPSBjb25kZW5zZSggc2V0TWF0Y2hlZCApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIG1hdGNoZXMgdG8gcmVzdWx0c1xuICAgICAgICBwdXNoLmFwcGx5KCByZXN1bHRzLCBzZXRNYXRjaGVkICk7XG5cbiAgICAgICAgLy8gU2VlZGxlc3Mgc2V0IG1hdGNoZXMgc3VjY2VlZGluZyBtdWx0aXBsZSBzdWNjZXNzZnVsIG1hdGNoZXJzIHN0aXB1bGF0ZSBzb3J0aW5nXG4gICAgICAgIGlmICggb3V0ZXJtb3N0ICYmICFzZWVkICYmIHNldE1hdGNoZWQubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICggbWF0Y2hlZENvdW50ICsgc2V0TWF0Y2hlcnMubGVuZ3RoICkgPiAxICkge1xuXG4gICAgICAgICAgU2l6emxlLnVuaXF1ZVNvcnQoIHJlc3VsdHMgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBPdmVycmlkZSBtYW5pcHVsYXRpb24gb2YgZ2xvYmFscyBieSBuZXN0ZWQgbWF0Y2hlcnNcbiAgICAgIGlmICggb3V0ZXJtb3N0ICkge1xuICAgICAgICBkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcbiAgICAgICAgb3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHRCYWNrdXA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bm1hdGNoZWQ7XG4gICAgfTtcblxuICByZXR1cm4gYnlTZXQgP1xuICAgIG1hcmtGdW5jdGlvbiggc3VwZXJNYXRjaGVyICkgOlxuICAgIHN1cGVyTWF0Y2hlcjtcbn1cblxuY29tcGlsZSA9IFNpenpsZS5jb21waWxlID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBtYXRjaCAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcbiAgdmFyIGksXG4gICAgc2V0TWF0Y2hlcnMgPSBbXSxcbiAgICBlbGVtZW50TWF0Y2hlcnMgPSBbXSxcbiAgICBjYWNoZWQgPSBjb21waWxlckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cbiAgaWYgKCAhY2FjaGVkICkge1xuICAgIC8vIEdlbmVyYXRlIGEgZnVuY3Rpb24gb2YgcmVjdXJzaXZlIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIHRvIGNoZWNrIGVhY2ggZWxlbWVudFxuICAgIGlmICggIW1hdGNoICkge1xuICAgICAgbWF0Y2ggPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcbiAgICB9XG4gICAgaSA9IG1hdGNoLmxlbmd0aDtcbiAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgIGNhY2hlZCA9IG1hdGNoZXJGcm9tVG9rZW5zKCBtYXRjaFtpXSApO1xuICAgICAgaWYgKCBjYWNoZWRbIGV4cGFuZG8gXSApIHtcbiAgICAgICAgc2V0TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2FjaGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uXG4gICAgY2FjaGVkID0gY29tcGlsZXJDYWNoZSggc2VsZWN0b3IsIG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApICk7XG5cbiAgICAvLyBTYXZlIHNlbGVjdG9yIGFuZCB0b2tlbml6YXRpb25cbiAgICBjYWNoZWQuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgfVxuICByZXR1cm4gY2FjaGVkO1xufTtcblxuLyoqXG4gKiBBIGxvdy1sZXZlbCBzZWxlY3Rpb24gZnVuY3Rpb24gdGhhdCB3b3JrcyB3aXRoIFNpenpsZSdzIGNvbXBpbGVkXG4gKiAgc2VsZWN0b3IgZnVuY3Rpb25zXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gc2VsZWN0b3IgQSBzZWxlY3RvciBvciBhIHByZS1jb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uIGJ1aWx0IHdpdGggU2l6emxlLmNvbXBpbGVcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGV4dFxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdHNdXG4gKiBAcGFyYW0ge0FycmF5fSBbc2VlZF0gQSBzZXQgb2YgZWxlbWVudHMgdG8gbWF0Y2ggYWdhaW5zdFxuICovXG5zZWxlY3QgPSBTaXp6bGUuc2VsZWN0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuICB2YXIgaSwgdG9rZW5zLCB0b2tlbiwgdHlwZSwgZmluZCxcbiAgICBjb21waWxlZCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICYmIHNlbGVjdG9yLFxuICAgIG1hdGNoID0gIXNlZWQgJiYgdG9rZW5pemUoIChzZWxlY3RvciA9IGNvbXBpbGVkLnNlbGVjdG9yIHx8IHNlbGVjdG9yKSApO1xuXG4gIHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG4gIC8vIFRyeSB0byBtaW5pbWl6ZSBvcGVyYXRpb25zIGlmIHRoZXJlIGlzIG5vIHNlZWQgYW5kIG9ubHkgb25lIGdyb3VwXG4gIGlmICggbWF0Y2gubGVuZ3RoID09PSAxICkge1xuXG4gICAgLy8gVGFrZSBhIHNob3J0Y3V0IGFuZCBzZXQgdGhlIGNvbnRleHQgaWYgdGhlIHJvb3Qgc2VsZWN0b3IgaXMgYW4gSURcbiAgICB0b2tlbnMgPSBtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKCAwICk7XG4gICAgaWYgKCB0b2tlbnMubGVuZ3RoID4gMiAmJiAodG9rZW4gPSB0b2tlbnNbMF0pLnR5cGUgPT09IFwiSURcIiAmJlxuICAgICAgICBzdXBwb3J0LmdldEJ5SWQgJiYgY29udGV4dC5ub2RlVHlwZSA9PT0gOSAmJiBkb2N1bWVudElzSFRNTCAmJlxuICAgICAgICBFeHByLnJlbGF0aXZlWyB0b2tlbnNbMV0udHlwZSBdICkge1xuXG4gICAgICBjb250ZXh0ID0gKCBFeHByLmZpbmRbXCJJRFwiXSggdG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKHJ1bmVzY2FwZSwgZnVuZXNjYXBlKSwgY29udGV4dCApIHx8IFtdIClbMF07XG4gICAgICBpZiAoICFjb250ZXh0ICkge1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcblxuICAgICAgLy8gUHJlY29tcGlsZWQgbWF0Y2hlcnMgd2lsbCBzdGlsbCB2ZXJpZnkgYW5jZXN0cnksIHNvIHN0ZXAgdXAgYSBsZXZlbFxuICAgICAgfSBlbHNlIGlmICggY29tcGlsZWQgKSB7XG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudE5vZGU7XG4gICAgICB9XG5cbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3Iuc2xpY2UoIHRva2Vucy5zaGlmdCgpLnZhbHVlLmxlbmd0aCApO1xuICAgIH1cblxuICAgIC8vIEZldGNoIGEgc2VlZCBzZXQgZm9yIHJpZ2h0LXRvLWxlZnQgbWF0Y2hpbmdcbiAgICBpID0gbWF0Y2hFeHByW1wibmVlZHNDb250ZXh0XCJdLnRlc3QoIHNlbGVjdG9yICkgPyAwIDogdG9rZW5zLmxlbmd0aDtcbiAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICAvLyBBYm9ydCBpZiB3ZSBoaXQgYSBjb21iaW5hdG9yXG4gICAgICBpZiAoIEV4cHIucmVsYXRpdmVbICh0eXBlID0gdG9rZW4udHlwZSkgXSApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoIChmaW5kID0gRXhwci5maW5kWyB0eXBlIF0pICkge1xuICAgICAgICAvLyBTZWFyY2gsIGV4cGFuZGluZyBjb250ZXh0IGZvciBsZWFkaW5nIHNpYmxpbmcgY29tYmluYXRvcnNcbiAgICAgICAgaWYgKCAoc2VlZCA9IGZpbmQoXG4gICAgICAgICAgdG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLFxuICAgICAgICAgIHJzaWJsaW5nLnRlc3QoIHRva2Vuc1swXS50eXBlICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcbiAgICAgICAgKSkgKSB7XG5cbiAgICAgICAgICAvLyBJZiBzZWVkIGlzIGVtcHR5IG9yIG5vIHRva2VucyByZW1haW4sIHdlIGNhbiByZXR1cm4gZWFybHlcbiAgICAgICAgICB0b2tlbnMuc3BsaWNlKCBpLCAxICk7XG4gICAgICAgICAgc2VsZWN0b3IgPSBzZWVkLmxlbmd0aCAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKTtcbiAgICAgICAgICBpZiAoICFzZWxlY3RvciApIHtcbiAgICAgICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsIHNlZWQgKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ29tcGlsZSBhbmQgZXhlY3V0ZSBhIGZpbHRlcmluZyBmdW5jdGlvbiBpZiBvbmUgaXMgbm90IHByb3ZpZGVkXG4gIC8vIFByb3ZpZGUgYG1hdGNoYCB0byBhdm9pZCByZXRva2VuaXphdGlvbiBpZiB3ZSBtb2RpZmllZCB0aGUgc2VsZWN0b3IgYWJvdmVcbiAgKCBjb21waWxlZCB8fCBjb21waWxlKCBzZWxlY3RvciwgbWF0Y2ggKSApKFxuICAgIHNlZWQsXG4gICAgY29udGV4dCxcbiAgICAhZG9jdW1lbnRJc0hUTUwsXG4gICAgcmVzdWx0cyxcbiAgICByc2libGluZy50ZXN0KCBzZWxlY3RvciApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG4gICk7XG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuLy8gT25lLXRpbWUgYXNzaWdubWVudHNcblxuLy8gU29ydCBzdGFiaWxpdHlcbnN1cHBvcnQuc29ydFN0YWJsZSA9IGV4cGFuZG8uc3BsaXQoXCJcIikuc29ydCggc29ydE9yZGVyICkuam9pbihcIlwiKSA9PT0gZXhwYW5kbztcblxuLy8gU3VwcG9ydDogQ2hyb21lIDE0LTM1K1xuLy8gQWx3YXlzIGFzc3VtZSBkdXBsaWNhdGVzIGlmIHRoZXkgYXJlbid0IHBhc3NlZCB0byB0aGUgY29tcGFyaXNvbiBmdW5jdGlvblxuc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzID0gISFoYXNEdXBsaWNhdGU7XG5cbi8vIEluaXRpYWxpemUgYWdhaW5zdCB0aGUgZGVmYXVsdCBkb2N1bWVudFxuc2V0RG9jdW1lbnQoKTtcblxuLy8gU3VwcG9ydDogV2Via2l0PDUzNy4zMiAtIFNhZmFyaSA2LjAuMy9DaHJvbWUgMjUgKGZpeGVkIGluIENocm9tZSAyNylcbi8vIERldGFjaGVkIG5vZGVzIGNvbmZvdW5kaW5nbHkgZm9sbG93ICplYWNoIG90aGVyKlxuc3VwcG9ydC5zb3J0RGV0YWNoZWQgPSBhc3NlcnQoZnVuY3Rpb24oIGRpdjEgKSB7XG4gIC8vIFNob3VsZCByZXR1cm4gMSwgYnV0IHJldHVybnMgNCAoZm9sbG93aW5nKVxuICByZXR1cm4gZGl2MS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSApICYgMTtcbn0pO1xuXG4vLyBTdXBwb3J0OiBJRTw4XG4vLyBQcmV2ZW50IGF0dHJpYnV0ZS9wcm9wZXJ0eSBcImludGVycG9sYXRpb25cIlxuLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTM2NDI5JTI4VlMuODUlMjkuYXNweFxuaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gIGRpdi5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JyMnPjwvYT5cIjtcbiAgcmV0dXJuIGRpdi5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiI1wiIDtcbn0pICkge1xuICBhZGRIYW5kbGUoIFwidHlwZXxocmVmfGhlaWdodHx3aWR0aFwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgaWYgKCAhaXNYTUwgKSB7XG4gICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ0eXBlXCIgPyAxIDogMiApO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBkZWZhdWx0VmFsdWUgaW4gcGxhY2Ugb2YgZ2V0QXR0cmlidXRlKFwidmFsdWVcIilcbmlmICggIXN1cHBvcnQuYXR0cmlidXRlcyB8fCAhYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gIGRpdi5pbm5lckhUTUwgPSBcIjxpbnB1dC8+XCI7XG4gIGRpdi5maXJzdENoaWxkLnNldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiLCBcIlwiICk7XG4gIHJldHVybiBkaXYuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBcIlwiO1xufSkgKSB7XG4gIGFkZEhhbmRsZSggXCJ2YWx1ZVwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgaWYgKCAhaXNYTUwgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgKSB7XG4gICAgICByZXR1cm4gZWxlbS5kZWZhdWx0VmFsdWU7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGdldEF0dHJpYnV0ZU5vZGUgdG8gZmV0Y2ggYm9vbGVhbnMgd2hlbiBnZXRBdHRyaWJ1dGUgbGllc1xuaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gIHJldHVybiBkaXYuZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIikgPT0gbnVsbDtcbn0pICkge1xuICBhZGRIYW5kbGUoIGJvb2xlYW5zLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgdmFyIHZhbDtcbiAgICBpZiAoICFpc1hNTCApIHtcbiAgICAgIHJldHVybiBlbGVtWyBuYW1lIF0gPT09IHRydWUgPyBuYW1lLnRvTG93ZXJDYXNlKCkgOlxuICAgICAgICAgICh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSkgJiYgdmFsLnNwZWNpZmllZCA/XG4gICAgICAgICAgdmFsLnZhbHVlIDpcbiAgICAgICAgbnVsbDtcbiAgICB9XG4gIH0pO1xufVxuXG5yZXR1cm4gU2l6emxlO1xuXG59KSggd2luZG93ICk7XG5cblxuXG5qUXVlcnkuZmluZCA9IFNpenpsZTtcbmpRdWVyeS5leHByID0gU2l6emxlLnNlbGVjdG9ycztcbmpRdWVyeS5leHByW1wiOlwiXSA9IGpRdWVyeS5leHByLnBzZXVkb3M7XG5qUXVlcnkudW5pcXVlID0gU2l6emxlLnVuaXF1ZVNvcnQ7XG5qUXVlcnkudGV4dCA9IFNpenpsZS5nZXRUZXh0O1xualF1ZXJ5LmlzWE1MRG9jID0gU2l6emxlLmlzWE1MO1xualF1ZXJ5LmNvbnRhaW5zID0gU2l6emxlLmNvbnRhaW5zO1xuXG5cblxudmFyIHJuZWVkc0NvbnRleHQgPSBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQ7XG5cbnZhciByc2luZ2xlVGFnID0gKC9ePChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+fCkkLyk7XG5cblxuXG52YXIgcmlzU2ltcGxlID0gL14uW146I1xcW1xcLixdKiQvO1xuXG4vLyBJbXBsZW1lbnQgdGhlIGlkZW50aWNhbCBmdW5jdGlvbmFsaXR5IGZvciBmaWx0ZXIgYW5kIG5vdFxuZnVuY3Rpb24gd2lubm93KCBlbGVtZW50cywgcXVhbGlmaWVyLCBub3QgKSB7XG4gIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHF1YWxpZmllciApICkge1xuICAgIHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtLCBpICkge1xuICAgICAgLyoganNoaW50IC1XMDE4ICovXG4gICAgICByZXR1cm4gISFxdWFsaWZpZXIuY2FsbCggZWxlbSwgaSwgZWxlbSApICE9PSBub3Q7XG4gICAgfSk7XG5cbiAgfVxuXG4gIGlmICggcXVhbGlmaWVyLm5vZGVUeXBlICkge1xuICAgIHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgcmV0dXJuICggZWxlbSA9PT0gcXVhbGlmaWVyICkgIT09IG5vdDtcbiAgICB9KTtcblxuICB9XG5cbiAgaWYgKCB0eXBlb2YgcXVhbGlmaWVyID09PSBcInN0cmluZ1wiICkge1xuICAgIGlmICggcmlzU2ltcGxlLnRlc3QoIHF1YWxpZmllciApICkge1xuICAgICAgcmV0dXJuIGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMsIG5vdCApO1xuICAgIH1cblxuICAgIHF1YWxpZmllciA9IGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMgKTtcbiAgfVxuXG4gIHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiAoIGpRdWVyeS5pbkFycmF5KCBlbGVtLCBxdWFsaWZpZXIgKSA+PSAwICkgIT09IG5vdDtcbiAgfSk7XG59XG5cbmpRdWVyeS5maWx0ZXIgPSBmdW5jdGlvbiggZXhwciwgZWxlbXMsIG5vdCApIHtcbiAgdmFyIGVsZW0gPSBlbGVtc1sgMCBdO1xuXG4gIGlmICggbm90ICkge1xuICAgIGV4cHIgPSBcIjpub3QoXCIgKyBleHByICsgXCIpXCI7XG4gIH1cblxuICByZXR1cm4gZWxlbXMubGVuZ3RoID09PSAxICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgP1xuICAgIGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZWxlbSwgZXhwciApID8gWyBlbGVtIF0gOiBbXSA6XG4gICAgalF1ZXJ5LmZpbmQubWF0Y2hlcyggZXhwciwgalF1ZXJ5LmdyZXAoIGVsZW1zLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiBlbGVtLm5vZGVUeXBlID09PSAxO1xuICAgIH0pKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBmaW5kOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgdmFyIGksXG4gICAgICByZXQgPSBbXSxcbiAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgbGVuID0gc2VsZi5sZW5ndGg7XG5cbiAgICBpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5KCBzZWxlY3RvciApLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgICBpZiAoIGpRdWVyeS5jb250YWlucyggc2VsZlsgaSBdLCB0aGlzICkgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pICk7XG4gICAgfVxuXG4gICAgZm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgIGpRdWVyeS5maW5kKCBzZWxlY3Rvciwgc2VsZlsgaSBdLCByZXQgKTtcbiAgICB9XG5cbiAgICAvLyBOZWVkZWQgYmVjYXVzZSAkKCBzZWxlY3RvciwgY29udGV4dCApIGJlY29tZXMgJCggY29udGV4dCApLmZpbmQoIHNlbGVjdG9yIClcbiAgICByZXQgPSB0aGlzLnB1c2hTdGFjayggbGVuID4gMSA/IGpRdWVyeS51bmlxdWUoIHJldCApIDogcmV0ICk7XG4gICAgcmV0LnNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciA/IHRoaXMuc2VsZWN0b3IgKyBcIiBcIiArIHNlbGVjdG9yIDogc2VsZWN0b3I7XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcbiAgZmlsdGVyOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3codGhpcywgc2VsZWN0b3IgfHwgW10sIGZhbHNlKSApO1xuICB9LFxuICBub3Q6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyh0aGlzLCBzZWxlY3RvciB8fCBbXSwgdHJ1ZSkgKTtcbiAgfSxcbiAgaXM6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgICByZXR1cm4gISF3aW5ub3coXG4gICAgICB0aGlzLFxuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcG9zaXRpb25hbC9yZWxhdGl2ZSBzZWxlY3RvciwgY2hlY2sgbWVtYmVyc2hpcCBpbiB0aGUgcmV0dXJuZWQgc2V0XG4gICAgICAvLyBzbyAkKFwicDpmaXJzdFwiKS5pcyhcInA6bGFzdFwiKSB3b24ndCByZXR1cm4gdHJ1ZSBmb3IgYSBkb2Mgd2l0aCB0d28gXCJwXCIuXG4gICAgICB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgJiYgcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApID9cbiAgICAgICAgalF1ZXJ5KCBzZWxlY3RvciApIDpcbiAgICAgICAgc2VsZWN0b3IgfHwgW10sXG4gICAgICBmYWxzZVxuICAgICkubGVuZ3RoO1xuICB9XG59KTtcblxuXG4vLyBJbml0aWFsaXplIGEgalF1ZXJ5IG9iamVjdFxuXG5cbi8vIEEgY2VudHJhbCByZWZlcmVuY2UgdG8gdGhlIHJvb3QgalF1ZXJ5KGRvY3VtZW50KVxudmFyIHJvb3RqUXVlcnksXG5cbiAgLy8gVXNlIHRoZSBjb3JyZWN0IGRvY3VtZW50IGFjY29yZGluZ2x5IHdpdGggd2luZG93IGFyZ3VtZW50IChzYW5kYm94KVxuICBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcblxuICAvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xuICAvLyBQcmlvcml0aXplICNpZCBvdmVyIDx0YWc+IHRvIGF2b2lkIFhTUyB2aWEgbG9jYXRpb24uaGFzaCAoIzk1MjEpXG4gIC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uICgjMTEyOTA6IG11c3Qgc3RhcnQgd2l0aCA8KVxuICBycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKikpJC8sXG5cbiAgaW5pdCA9IGpRdWVyeS5mbi5pbml0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuICAgIHZhciBtYXRjaCwgZWxlbTtcblxuICAgIC8vIEhBTkRMRTogJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxuICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIEhUTUwgc3RyaW5nc1xuICAgIGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuICAgICAgaWYgKCBzZWxlY3Rvci5jaGFyQXQoMCkgPT09IFwiPFwiICYmIHNlbGVjdG9yLmNoYXJBdCggc2VsZWN0b3IubGVuZ3RoIC0gMSApID09PSBcIj5cIiAmJiBzZWxlY3Rvci5sZW5ndGggPj0gMyApIHtcbiAgICAgICAgLy8gQXNzdW1lIHRoYXQgc3RyaW5ncyB0aGF0IHN0YXJ0IGFuZCBlbmQgd2l0aCA8PiBhcmUgSFRNTCBhbmQgc2tpcCB0aGUgcmVnZXggY2hlY2tcbiAgICAgICAgbWF0Y2ggPSBbIG51bGwsIHNlbGVjdG9yLCBudWxsIF07XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCBodG1sIG9yIG1ha2Ugc3VyZSBubyBjb250ZXh0IGlzIHNwZWNpZmllZCBmb3IgI2lkXG4gICAgICBpZiAoIG1hdGNoICYmIChtYXRjaFsxXSB8fCAhY29udGV4dCkgKSB7XG5cbiAgICAgICAgLy8gSEFORExFOiAkKGh0bWwpIC0+ICQoYXJyYXkpXG4gICAgICAgIGlmICggbWF0Y2hbMV0gKSB7XG4gICAgICAgICAgY29udGV4dCA9IGNvbnRleHQgaW5zdGFuY2VvZiBqUXVlcnkgPyBjb250ZXh0WzBdIDogY29udGV4dDtcblxuICAgICAgICAgIC8vIHNjcmlwdHMgaXMgdHJ1ZSBmb3IgYmFjay1jb21wYXRcbiAgICAgICAgICAvLyBJbnRlbnRpb25hbGx5IGxldCB0aGUgZXJyb3IgYmUgdGhyb3duIGlmIHBhcnNlSFRNTCBpcyBub3QgcHJlc2VudFxuICAgICAgICAgIGpRdWVyeS5tZXJnZSggdGhpcywgalF1ZXJ5LnBhcnNlSFRNTChcbiAgICAgICAgICAgIG1hdGNoWzFdLFxuICAgICAgICAgICAgY29udGV4dCAmJiBjb250ZXh0Lm5vZGVUeXBlID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBkb2N1bWVudCxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApICk7XG5cbiAgICAgICAgICAvLyBIQU5ETEU6ICQoaHRtbCwgcHJvcHMpXG4gICAgICAgICAgaWYgKCByc2luZ2xlVGFnLnRlc3QoIG1hdGNoWzFdICkgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvbnRleHQgKSApIHtcbiAgICAgICAgICAgIGZvciAoIG1hdGNoIGluIGNvbnRleHQgKSB7XG4gICAgICAgICAgICAgIC8vIFByb3BlcnRpZXMgb2YgY29udGV4dCBhcmUgY2FsbGVkIGFzIG1ldGhvZHMgaWYgcG9zc2libGVcbiAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdGhpc1sgbWF0Y2ggXSApICkge1xuICAgICAgICAgICAgICAgIHRoaXNbIG1hdGNoIF0oIGNvbnRleHRbIG1hdGNoIF0gKTtcblxuICAgICAgICAgICAgICAvLyAuLi5hbmQgb3RoZXJ3aXNlIHNldCBhcyBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyKCBtYXRjaCwgY29udGV4dFsgbWF0Y2ggXSApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgLy8gSEFORExFOiAkKCNpZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG1hdGNoWzJdICk7XG5cbiAgICAgICAgICAvLyBDaGVjayBwYXJlbnROb2RlIHRvIGNhdGNoIHdoZW4gQmxhY2tiZXJyeSA0LjYgcmV0dXJuc1xuICAgICAgICAgIC8vIG5vZGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgZG9jdW1lbnQgIzY5NjNcbiAgICAgICAgICBpZiAoIGVsZW0gJiYgZWxlbS5wYXJlbnROb2RlICkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIElFIGFuZCBPcGVyYSByZXR1cm4gaXRlbXNcbiAgICAgICAgICAgIC8vIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuICAgICAgICAgICAgaWYgKCBlbGVtLmlkICE9PSBtYXRjaFsyXSApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJvb3RqUXVlcnkuZmluZCggc2VsZWN0b3IgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBpbmplY3QgdGhlIGVsZW1lbnQgZGlyZWN0bHkgaW50byB0aGUgalF1ZXJ5IG9iamVjdFxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAxO1xuICAgICAgICAgICAgdGhpc1swXSA9IGVsZW07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jb250ZXh0ID0gZG9jdW1lbnQ7XG4gICAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgIC8vIEhBTkRMRTogJChleHByLCAkKC4uLikpXG4gICAgICB9IGVsc2UgaWYgKCAhY29udGV4dCB8fCBjb250ZXh0LmpxdWVyeSApIHtcbiAgICAgICAgcmV0dXJuICggY29udGV4dCB8fCByb290alF1ZXJ5ICkuZmluZCggc2VsZWN0b3IgKTtcblxuICAgICAgLy8gSEFORExFOiAkKGV4cHIsIGNvbnRleHQpXG4gICAgICAvLyAod2hpY2ggaXMganVzdCBlcXVpdmFsZW50IHRvOiAkKGNvbnRleHQpLmZpbmQoZXhwcilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKTtcbiAgICAgIH1cblxuICAgIC8vIEhBTkRMRTogJChET01FbGVtZW50KVxuICAgIH0gZWxzZSBpZiAoIHNlbGVjdG9yLm5vZGVUeXBlICkge1xuICAgICAgdGhpcy5jb250ZXh0ID0gdGhpc1swXSA9IHNlbGVjdG9yO1xuICAgICAgdGhpcy5sZW5ndGggPSAxO1xuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAvLyBIQU5ETEU6ICQoZnVuY3Rpb24pXG4gICAgLy8gU2hvcnRjdXQgZm9yIGRvY3VtZW50IHJlYWR5XG4gICAgfSBlbHNlIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHNlbGVjdG9yICkgKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHJvb3RqUXVlcnkucmVhZHkgIT09IFwidW5kZWZpbmVkXCIgP1xuICAgICAgICByb290alF1ZXJ5LnJlYWR5KCBzZWxlY3RvciApIDpcbiAgICAgICAgLy8gRXhlY3V0ZSBpbW1lZGlhdGVseSBpZiByZWFkeSBpcyBub3QgcHJlc2VudFxuICAgICAgICBzZWxlY3RvciggalF1ZXJ5ICk7XG4gICAgfVxuXG4gICAgaWYgKCBzZWxlY3Rvci5zZWxlY3RvciAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yLnNlbGVjdG9yO1xuICAgICAgdGhpcy5jb250ZXh0ID0gc2VsZWN0b3IuY29udGV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4galF1ZXJ5Lm1ha2VBcnJheSggc2VsZWN0b3IsIHRoaXMgKTtcbiAgfTtcblxuLy8gR2l2ZSB0aGUgaW5pdCBmdW5jdGlvbiB0aGUgalF1ZXJ5IHByb3RvdHlwZSBmb3IgbGF0ZXIgaW5zdGFudGlhdGlvblxuaW5pdC5wcm90b3R5cGUgPSBqUXVlcnkuZm47XG5cbi8vIEluaXRpYWxpemUgY2VudHJhbCByZWZlcmVuY2VcbnJvb3RqUXVlcnkgPSBqUXVlcnkoIGRvY3VtZW50ICk7XG5cblxudmFyIHJwYXJlbnRzcHJldiA9IC9eKD86cGFyZW50c3xwcmV2KD86VW50aWx8QWxsKSkvLFxuICAvLyBtZXRob2RzIGd1YXJhbnRlZWQgdG8gcHJvZHVjZSBhIHVuaXF1ZSBzZXQgd2hlbiBzdGFydGluZyBmcm9tIGEgdW5pcXVlIHNldFxuICBndWFyYW50ZWVkVW5pcXVlID0ge1xuICAgIGNoaWxkcmVuOiB0cnVlLFxuICAgIGNvbnRlbnRzOiB0cnVlLFxuICAgIG5leHQ6IHRydWUsXG4gICAgcHJldjogdHJ1ZVxuICB9O1xuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgZGlyOiBmdW5jdGlvbiggZWxlbSwgZGlyLCB1bnRpbCApIHtcbiAgICB2YXIgbWF0Y2hlZCA9IFtdLFxuICAgICAgY3VyID0gZWxlbVsgZGlyIF07XG5cbiAgICB3aGlsZSAoIGN1ciAmJiBjdXIubm9kZVR5cGUgIT09IDkgJiYgKHVudGlsID09PSB1bmRlZmluZWQgfHwgY3VyLm5vZGVUeXBlICE9PSAxIHx8ICFqUXVlcnkoIGN1ciApLmlzKCB1bnRpbCApKSApIHtcbiAgICAgIGlmICggY3VyLm5vZGVUeXBlID09PSAxICkge1xuICAgICAgICBtYXRjaGVkLnB1c2goIGN1ciApO1xuICAgICAgfVxuICAgICAgY3VyID0gY3VyW2Rpcl07XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVkO1xuICB9LFxuXG4gIHNpYmxpbmc6IGZ1bmN0aW9uKCBuLCBlbGVtICkge1xuICAgIHZhciByID0gW107XG5cbiAgICBmb3IgKCA7IG47IG4gPSBuLm5leHRTaWJsaW5nICkge1xuICAgICAgaWYgKCBuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IGVsZW0gKSB7XG4gICAgICAgIHIucHVzaCggbiApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByO1xuICB9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIGhhczogZnVuY3Rpb24oIHRhcmdldCApIHtcbiAgICB2YXIgaSxcbiAgICAgIHRhcmdldHMgPSBqUXVlcnkoIHRhcmdldCwgdGhpcyApLFxuICAgICAgbGVuID0gdGFyZ2V0cy5sZW5ndGg7XG5cbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgICBpZiAoIGpRdWVyeS5jb250YWlucyggdGhpcywgdGFyZ2V0c1tpXSApICkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgY2xvc2VzdDogZnVuY3Rpb24oIHNlbGVjdG9ycywgY29udGV4dCApIHtcbiAgICB2YXIgY3VyLFxuICAgICAgaSA9IDAsXG4gICAgICBsID0gdGhpcy5sZW5ndGgsXG4gICAgICBtYXRjaGVkID0gW10sXG4gICAgICBwb3MgPSBybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9ycyApIHx8IHR5cGVvZiBzZWxlY3RvcnMgIT09IFwic3RyaW5nXCIgP1xuICAgICAgICBqUXVlcnkoIHNlbGVjdG9ycywgY29udGV4dCB8fCB0aGlzLmNvbnRleHQgKSA6XG4gICAgICAgIDA7XG5cbiAgICBmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG4gICAgICBmb3IgKCBjdXIgPSB0aGlzW2ldOyBjdXIgJiYgY3VyICE9PSBjb250ZXh0OyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcbiAgICAgICAgLy8gQWx3YXlzIHNraXAgZG9jdW1lbnQgZnJhZ21lbnRzXG4gICAgICAgIGlmICggY3VyLm5vZGVUeXBlIDwgMTEgJiYgKHBvcyA/XG4gICAgICAgICAgcG9zLmluZGV4KGN1cikgPiAtMSA6XG5cbiAgICAgICAgICAvLyBEb24ndCBwYXNzIG5vbi1lbGVtZW50cyB0byBTaXp6bGVcbiAgICAgICAgICBjdXIubm9kZVR5cGUgPT09IDEgJiZcbiAgICAgICAgICAgIGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvcihjdXIsIHNlbGVjdG9ycykpICkge1xuXG4gICAgICAgICAgbWF0Y2hlZC5wdXNoKCBjdXIgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggbWF0Y2hlZC5sZW5ndGggPiAxID8galF1ZXJ5LnVuaXF1ZSggbWF0Y2hlZCApIDogbWF0Y2hlZCApO1xuICB9LFxuXG4gIC8vIERldGVybWluZSB0aGUgcG9zaXRpb24gb2YgYW4gZWxlbWVudCB3aXRoaW5cbiAgLy8gdGhlIG1hdGNoZWQgc2V0IG9mIGVsZW1lbnRzXG4gIGluZGV4OiBmdW5jdGlvbiggZWxlbSApIHtcblxuICAgIC8vIE5vIGFyZ3VtZW50LCByZXR1cm4gaW5kZXggaW4gcGFyZW50XG4gICAgaWYgKCAhZWxlbSApIHtcbiAgICAgIHJldHVybiAoIHRoaXNbMF0gJiYgdGhpc1swXS5wYXJlbnROb2RlICkgPyB0aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aCA6IC0xO1xuICAgIH1cblxuICAgIC8vIGluZGV4IGluIHNlbGVjdG9yXG4gICAgaWYgKCB0eXBlb2YgZWxlbSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHJldHVybiBqUXVlcnkuaW5BcnJheSggdGhpc1swXSwgalF1ZXJ5KCBlbGVtICkgKTtcbiAgICB9XG5cbiAgICAvLyBMb2NhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkZXNpcmVkIGVsZW1lbnRcbiAgICByZXR1cm4galF1ZXJ5LmluQXJyYXkoXG4gICAgICAvLyBJZiBpdCByZWNlaXZlcyBhIGpRdWVyeSBvYmplY3QsIHRoZSBmaXJzdCBlbGVtZW50IGlzIHVzZWRcbiAgICAgIGVsZW0uanF1ZXJ5ID8gZWxlbVswXSA6IGVsZW0sIHRoaXMgKTtcbiAgfSxcblxuICBhZGQ6IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcbiAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soXG4gICAgICBqUXVlcnkudW5pcXVlKFxuICAgICAgICBqUXVlcnkubWVyZ2UoIHRoaXMuZ2V0KCksIGpRdWVyeSggc2VsZWN0b3IsIGNvbnRleHQgKSApXG4gICAgICApXG4gICAgKTtcbiAgfSxcblxuICBhZGRCYWNrOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKCBzZWxlY3RvciA9PSBudWxsID9cbiAgICAgIHRoaXMucHJldk9iamVjdCA6IHRoaXMucHJldk9iamVjdC5maWx0ZXIoc2VsZWN0b3IpXG4gICAgKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHNpYmxpbmcoIGN1ciwgZGlyICkge1xuICBkbyB7XG4gICAgY3VyID0gY3VyWyBkaXIgXTtcbiAgfSB3aGlsZSAoIGN1ciAmJiBjdXIubm9kZVR5cGUgIT09IDEgKTtcblxuICByZXR1cm4gY3VyO1xufVxuXG5qUXVlcnkuZWFjaCh7XG4gIHBhcmVudDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgdmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICByZXR1cm4gcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMTEgPyBwYXJlbnQgOiBudWxsO1xuICB9LFxuICBwYXJlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIgKTtcbiAgfSxcbiAgcGFyZW50c1VudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiLCB1bnRpbCApO1xuICB9LFxuICBuZXh0OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4gc2libGluZyggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG4gIH0sXG4gIHByZXY6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiBzaWJsaW5nKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG4gIH0sXG4gIG5leHRBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcbiAgfSxcbiAgcHJldkFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcbiAgfSxcbiAgbmV4dFVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiwgdW50aWwgKTtcbiAgfSxcbiAgcHJldlVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIsIHVudGlsICk7XG4gIH0sXG4gIHNpYmxpbmdzOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4galF1ZXJ5LnNpYmxpbmcoICggZWxlbS5wYXJlbnROb2RlIHx8IHt9ICkuZmlyc3RDaGlsZCwgZWxlbSApO1xuICB9LFxuICBjaGlsZHJlbjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5zaWJsaW5nKCBlbGVtLmZpcnN0Q2hpbGQgKTtcbiAgfSxcbiAgY29udGVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiaWZyYW1lXCIgKSA/XG4gICAgICBlbGVtLmNvbnRlbnREb2N1bWVudCB8fCBlbGVtLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQgOlxuICAgICAgalF1ZXJ5Lm1lcmdlKCBbXSwgZWxlbS5jaGlsZE5vZGVzICk7XG4gIH1cbn0sIGZ1bmN0aW9uKCBuYW1lLCBmbiApIHtcbiAgalF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggdW50aWwsIHNlbGVjdG9yICkge1xuICAgIHZhciByZXQgPSBqUXVlcnkubWFwKCB0aGlzLCBmbiwgdW50aWwgKTtcblxuICAgIGlmICggbmFtZS5zbGljZSggLTUgKSAhPT0gXCJVbnRpbFwiICkge1xuICAgICAgc2VsZWN0b3IgPSB1bnRpbDtcbiAgICB9XG5cbiAgICBpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHJldCA9IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCByZXQgKTtcbiAgICB9XG5cbiAgICBpZiAoIHRoaXMubGVuZ3RoID4gMSApIHtcbiAgICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzXG4gICAgICBpZiAoICFndWFyYW50ZWVkVW5pcXVlWyBuYW1lIF0gKSB7XG4gICAgICAgIHJldCA9IGpRdWVyeS51bmlxdWUoIHJldCApO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXZlcnNlIG9yZGVyIGZvciBwYXJlbnRzKiBhbmQgcHJldi1kZXJpdmF0aXZlc1xuICAgICAgaWYgKCBycGFyZW50c3ByZXYudGVzdCggbmFtZSApICkge1xuICAgICAgICByZXQgPSByZXQucmV2ZXJzZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggcmV0ICk7XG4gIH07XG59KTtcbnZhciBybm90d2hpdGUgPSAoL1xcUysvZyk7XG5cblxuXG4vLyBTdHJpbmcgdG8gT2JqZWN0IG9wdGlvbnMgZm9ybWF0IGNhY2hlXG52YXIgb3B0aW9uc0NhY2hlID0ge307XG5cbi8vIENvbnZlcnQgU3RyaW5nLWZvcm1hdHRlZCBvcHRpb25zIGludG8gT2JqZWN0LWZvcm1hdHRlZCBvbmVzIGFuZCBzdG9yZSBpbiBjYWNoZVxuZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIHtcbiAgdmFyIG9iamVjdCA9IG9wdGlvbnNDYWNoZVsgb3B0aW9ucyBdID0ge307XG4gIGpRdWVyeS5lYWNoKCBvcHRpb25zLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXSwgZnVuY3Rpb24oIF8sIGZsYWcgKSB7XG4gICAgb2JqZWN0WyBmbGFnIF0gPSB0cnVlO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLypcbiAqIENyZWF0ZSBhIGNhbGxiYWNrIGxpc3QgdXNpbmcgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICpcbiAqICBvcHRpb25zOiBhbiBvcHRpb25hbCBsaXN0IG9mIHNwYWNlLXNlcGFyYXRlZCBvcHRpb25zIHRoYXQgd2lsbCBjaGFuZ2UgaG93XG4gKiAgICAgIHRoZSBjYWxsYmFjayBsaXN0IGJlaGF2ZXMgb3IgYSBtb3JlIHRyYWRpdGlvbmFsIG9wdGlvbiBvYmplY3RcbiAqXG4gKiBCeSBkZWZhdWx0IGEgY2FsbGJhY2sgbGlzdCB3aWxsIGFjdCBsaWtlIGFuIGV2ZW50IGNhbGxiYWNrIGxpc3QgYW5kIGNhbiBiZVxuICogXCJmaXJlZFwiIG11bHRpcGxlIHRpbWVzLlxuICpcbiAqIFBvc3NpYmxlIG9wdGlvbnM6XG4gKlxuICogIG9uY2U6ICAgICB3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICogIG1lbW9yeTogICAgIHdpbGwga2VlcCB0cmFjayBvZiBwcmV2aW91cyB2YWx1ZXMgYW5kIHdpbGwgY2FsbCBhbnkgY2FsbGJhY2sgYWRkZWRcbiAqICAgICAgICAgIGFmdGVyIHRoZSBsaXN0IGhhcyBiZWVuIGZpcmVkIHJpZ2h0IGF3YXkgd2l0aCB0aGUgbGF0ZXN0IFwibWVtb3JpemVkXCJcbiAqICAgICAgICAgIHZhbHVlcyAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqICB1bmlxdWU6ICAgICB3aWxsIGVuc3VyZSBhIGNhbGxiYWNrIGNhbiBvbmx5IGJlIGFkZGVkIG9uY2UgKG5vIGR1cGxpY2F0ZSBpbiB0aGUgbGlzdClcbiAqXG4gKiAgc3RvcE9uRmFsc2U6ICBpbnRlcnJ1cHQgY2FsbGluZ3Mgd2hlbiBhIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAqXG4gKi9cbmpRdWVyeS5DYWxsYmFja3MgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuICAvLyBDb252ZXJ0IG9wdGlvbnMgZnJvbSBTdHJpbmctZm9ybWF0dGVkIHRvIE9iamVjdC1mb3JtYXR0ZWQgaWYgbmVlZGVkXG4gIC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcbiAgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiID9cbiAgICAoIG9wdGlvbnNDYWNoZVsgb3B0aW9ucyBdIHx8IGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSApIDpcbiAgICBqUXVlcnkuZXh0ZW5kKCB7fSwgb3B0aW9ucyApO1xuXG4gIHZhciAvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCBpcyBjdXJyZW50bHkgZmlyaW5nXG4gICAgZmlyaW5nLFxuICAgIC8vIExhc3QgZmlyZSB2YWx1ZSAoZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0cylcbiAgICBtZW1vcnksXG4gICAgLy8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcbiAgICBmaXJlZCxcbiAgICAvLyBFbmQgb2YgdGhlIGxvb3Agd2hlbiBmaXJpbmdcbiAgICBmaXJpbmdMZW5ndGgsXG4gICAgLy8gSW5kZXggb2YgY3VycmVudGx5IGZpcmluZyBjYWxsYmFjayAobW9kaWZpZWQgYnkgcmVtb3ZlIGlmIG5lZWRlZClcbiAgICBmaXJpbmdJbmRleCxcbiAgICAvLyBGaXJzdCBjYWxsYmFjayB0byBmaXJlICh1c2VkIGludGVybmFsbHkgYnkgYWRkIGFuZCBmaXJlV2l0aClcbiAgICBmaXJpbmdTdGFydCxcbiAgICAvLyBBY3R1YWwgY2FsbGJhY2sgbGlzdFxuICAgIGxpc3QgPSBbXSxcbiAgICAvLyBTdGFjayBvZiBmaXJlIGNhbGxzIGZvciByZXBlYXRhYmxlIGxpc3RzXG4gICAgc3RhY2sgPSAhb3B0aW9ucy5vbmNlICYmIFtdLFxuICAgIC8vIEZpcmUgY2FsbGJhY2tzXG4gICAgZmlyZSA9IGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgbWVtb3J5ID0gb3B0aW9ucy5tZW1vcnkgJiYgZGF0YTtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGZpcmluZ0luZGV4ID0gZmlyaW5nU3RhcnQgfHwgMDtcbiAgICAgIGZpcmluZ1N0YXJ0ID0gMDtcbiAgICAgIGZpcmluZ0xlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICAgICAgZmlyaW5nID0gdHJ1ZTtcbiAgICAgIGZvciAoIDsgbGlzdCAmJiBmaXJpbmdJbmRleCA8IGZpcmluZ0xlbmd0aDsgZmlyaW5nSW5kZXgrKyApIHtcbiAgICAgICAgaWYgKCBsaXN0WyBmaXJpbmdJbmRleCBdLmFwcGx5KCBkYXRhWyAwIF0sIGRhdGFbIDEgXSApID09PSBmYWxzZSAmJiBvcHRpb25zLnN0b3BPbkZhbHNlICkge1xuICAgICAgICAgIG1lbW9yeSA9IGZhbHNlOyAvLyBUbyBwcmV2ZW50IGZ1cnRoZXIgY2FsbHMgdXNpbmcgYWRkXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpcmluZyA9IGZhbHNlO1xuICAgICAgaWYgKCBsaXN0ICkge1xuICAgICAgICBpZiAoIHN0YWNrICkge1xuICAgICAgICAgIGlmICggc3RhY2subGVuZ3RoICkge1xuICAgICAgICAgICAgZmlyZSggc3RhY2suc2hpZnQoKSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggbWVtb3J5ICkge1xuICAgICAgICAgIGxpc3QgPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gQWN0dWFsIENhbGxiYWNrcyBvYmplY3RcbiAgICBzZWxmID0ge1xuICAgICAgLy8gQWRkIGEgY2FsbGJhY2sgb3IgYSBjb2xsZWN0aW9uIG9mIGNhbGxiYWNrcyB0byB0aGUgbGlzdFxuICAgICAgYWRkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBsaXN0ICkge1xuICAgICAgICAgIC8vIEZpcnN0LCB3ZSBzYXZlIHRoZSBjdXJyZW50IGxlbmd0aFxuICAgICAgICAgIHZhciBzdGFydCA9IGxpc3QubGVuZ3RoO1xuICAgICAgICAgIChmdW5jdGlvbiBhZGQoIGFyZ3MgKSB7XG4gICAgICAgICAgICBqUXVlcnkuZWFjaCggYXJncywgZnVuY3Rpb24oIF8sIGFyZyApIHtcbiAgICAgICAgICAgICAgdmFyIHR5cGUgPSBqUXVlcnkudHlwZSggYXJnICk7XG4gICAgICAgICAgICAgIGlmICggdHlwZSA9PT0gXCJmdW5jdGlvblwiICkge1xuICAgICAgICAgICAgICAgIGlmICggIW9wdGlvbnMudW5pcXVlIHx8ICFzZWxmLmhhcyggYXJnICkgKSB7XG4gICAgICAgICAgICAgICAgICBsaXN0LnB1c2goIGFyZyApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmICggYXJnICYmIGFyZy5sZW5ndGggJiYgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgICAgICAvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgYWRkKCBhcmcgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkoIGFyZ3VtZW50cyApO1xuICAgICAgICAgIC8vIERvIHdlIG5lZWQgdG8gYWRkIHRoZSBjYWxsYmFja3MgdG8gdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBmaXJpbmcgYmF0Y2g/XG4gICAgICAgICAgaWYgKCBmaXJpbmcgKSB7XG4gICAgICAgICAgICBmaXJpbmdMZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAvLyBXaXRoIG1lbW9yeSwgaWYgd2UncmUgbm90IGZpcmluZyB0aGVuXG4gICAgICAgICAgLy8gd2Ugc2hvdWxkIGNhbGwgcmlnaHQgYXdheVxuICAgICAgICAgIH0gZWxzZSBpZiAoIG1lbW9yeSApIHtcbiAgICAgICAgICAgIGZpcmluZ1N0YXJ0ID0gc3RhcnQ7XG4gICAgICAgICAgICBmaXJlKCBtZW1vcnkgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgLy8gUmVtb3ZlIGEgY2FsbGJhY2sgZnJvbSB0aGUgbGlzdFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBsaXN0ICkge1xuICAgICAgICAgIGpRdWVyeS5lYWNoKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoICggaW5kZXggPSBqUXVlcnkuaW5BcnJheSggYXJnLCBsaXN0LCBpbmRleCApICkgPiAtMSApIHtcbiAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xuICAgICAgICAgICAgICBpZiAoIGZpcmluZyApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGluZGV4IDw9IGZpcmluZ0xlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgIGZpcmluZ0xlbmd0aC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIGluZGV4IDw9IGZpcmluZ0luZGV4ICkge1xuICAgICAgICAgICAgICAgICAgZmlyaW5nSW5kZXgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICAvLyBDaGVjayBpZiBhIGdpdmVuIGNhbGxiYWNrIGlzIGluIHRoZSBsaXN0LlxuICAgICAgLy8gSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHJldHVybiB3aGV0aGVyIG9yIG5vdCBsaXN0IGhhcyBjYWxsYmFja3MgYXR0YWNoZWQuXG4gICAgICBoYXM6IGZ1bmN0aW9uKCBmbiApIHtcbiAgICAgICAgcmV0dXJuIGZuID8galF1ZXJ5LmluQXJyYXkoIGZuLCBsaXN0ICkgPiAtMSA6ICEhKCBsaXN0ICYmIGxpc3QubGVuZ3RoICk7XG4gICAgICB9LFxuICAgICAgLy8gUmVtb3ZlIGFsbCBjYWxsYmFja3MgZnJvbSB0aGUgbGlzdFxuICAgICAgZW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsaXN0ID0gW107XG4gICAgICAgIGZpcmluZ0xlbmd0aCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIC8vIEhhdmUgdGhlIGxpc3QgZG8gbm90aGluZyBhbnltb3JlXG4gICAgICBkaXNhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGlzdCA9IHN0YWNrID0gbWVtb3J5ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICAvLyBJcyBpdCBkaXNhYmxlZD9cbiAgICAgIGRpc2FibGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICFsaXN0O1xuICAgICAgfSxcbiAgICAgIC8vIExvY2sgdGhlIGxpc3QgaW4gaXRzIGN1cnJlbnQgc3RhdGVcbiAgICAgIGxvY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCAhbWVtb3J5ICkge1xuICAgICAgICAgIHNlbGYuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIC8vIElzIGl0IGxvY2tlZD9cbiAgICAgIGxvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhc3RhY2s7XG4gICAgICB9LFxuICAgICAgLy8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xuICAgICAgZmlyZVdpdGg6IGZ1bmN0aW9uKCBjb250ZXh0LCBhcmdzICkge1xuICAgICAgICBpZiAoIGxpc3QgJiYgKCAhZmlyZWQgfHwgc3RhY2sgKSApIHtcbiAgICAgICAgICBhcmdzID0gYXJncyB8fCBbXTtcbiAgICAgICAgICBhcmdzID0gWyBjb250ZXh0LCBhcmdzLnNsaWNlID8gYXJncy5zbGljZSgpIDogYXJncyBdO1xuICAgICAgICAgIGlmICggZmlyaW5nICkge1xuICAgICAgICAgICAgc3RhY2sucHVzaCggYXJncyApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaXJlKCBhcmdzICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIC8vIENhbGwgYWxsIHRoZSBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzXG4gICAgICBmaXJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5maXJlV2l0aCggdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIC8vIFRvIGtub3cgaWYgdGhlIGNhbGxiYWNrcyBoYXZlIGFscmVhZHkgYmVlbiBjYWxsZWQgYXQgbGVhc3Qgb25jZVxuICAgICAgZmlyZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISFmaXJlZDtcbiAgICAgIH1cbiAgICB9O1xuXG4gIHJldHVybiBzZWxmO1xufTtcblxuXG5qUXVlcnkuZXh0ZW5kKHtcblxuICBEZWZlcnJlZDogZnVuY3Rpb24oIGZ1bmMgKSB7XG4gICAgdmFyIHR1cGxlcyA9IFtcbiAgICAgICAgLy8gYWN0aW9uLCBhZGQgbGlzdGVuZXIsIGxpc3RlbmVyIGxpc3QsIGZpbmFsIHN0YXRlXG4gICAgICAgIFsgXCJyZXNvbHZlXCIsIFwiZG9uZVwiLCBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksIFwicmVzb2x2ZWRcIiBdLFxuICAgICAgICBbIFwicmVqZWN0XCIsIFwiZmFpbFwiLCBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksIFwicmVqZWN0ZWRcIiBdLFxuICAgICAgICBbIFwibm90aWZ5XCIsIFwicHJvZ3Jlc3NcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm1lbW9yeVwiKSBdXG4gICAgICBdLFxuICAgICAgc3RhdGUgPSBcInBlbmRpbmdcIixcbiAgICAgIHByb21pc2UgPSB7XG4gICAgICAgIHN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIGFsd2F5czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZGVmZXJyZWQuZG9uZSggYXJndW1lbnRzICkuZmFpbCggYXJndW1lbnRzICk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIHRoZW46IGZ1bmN0aW9uKCAvKiBmbkRvbmUsIGZuRmFpbCwgZm5Qcm9ncmVzcyAqLyApIHtcbiAgICAgICAgICB2YXIgZm5zID0gYXJndW1lbnRzO1xuICAgICAgICAgIHJldHVybiBqUXVlcnkuRGVmZXJyZWQoZnVuY3Rpb24oIG5ld0RlZmVyICkge1xuICAgICAgICAgICAgalF1ZXJ5LmVhY2goIHR1cGxlcywgZnVuY3Rpb24oIGksIHR1cGxlICkge1xuICAgICAgICAgICAgICB2YXIgZm4gPSBqUXVlcnkuaXNGdW5jdGlvbiggZm5zWyBpIF0gKSAmJiBmbnNbIGkgXTtcbiAgICAgICAgICAgICAgLy8gZGVmZXJyZWRbIGRvbmUgfCBmYWlsIHwgcHJvZ3Jlc3MgXSBmb3IgZm9yd2FyZGluZyBhY3Rpb25zIHRvIG5ld0RlZmVyXG4gICAgICAgICAgICAgIGRlZmVycmVkWyB0dXBsZVsxXSBdKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXR1cm5lZCA9IGZuICYmIGZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgICAgICAgICAgICAgICBpZiAoIHJldHVybmVkICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXR1cm5lZC5wcm9taXNlICkgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm5lZC5wcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoIG5ld0RlZmVyLnJlc29sdmUgKVxuICAgICAgICAgICAgICAgICAgICAuZmFpbCggbmV3RGVmZXIucmVqZWN0IClcbiAgICAgICAgICAgICAgICAgICAgLnByb2dyZXNzKCBuZXdEZWZlci5ub3RpZnkgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbmV3RGVmZXJbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdKCB0aGlzID09PSBwcm9taXNlID8gbmV3RGVmZXIucHJvbWlzZSgpIDogdGhpcywgZm4gPyBbIHJldHVybmVkIF0gOiBhcmd1bWVudHMgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmbnMgPSBudWxsO1xuICAgICAgICAgIH0pLnByb21pc2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gR2V0IGEgcHJvbWlzZSBmb3IgdGhpcyBkZWZlcnJlZFxuICAgICAgICAvLyBJZiBvYmogaXMgcHJvdmlkZWQsIHRoZSBwcm9taXNlIGFzcGVjdCBpcyBhZGRlZCB0byB0aGUgb2JqZWN0XG4gICAgICAgIHByb21pc2U6IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgICAgICAgcmV0dXJuIG9iaiAhPSBudWxsID8galF1ZXJ5LmV4dGVuZCggb2JqLCBwcm9taXNlICkgOiBwcm9taXNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVmZXJyZWQgPSB7fTtcblxuICAgIC8vIEtlZXAgcGlwZSBmb3IgYmFjay1jb21wYXRcbiAgICBwcm9taXNlLnBpcGUgPSBwcm9taXNlLnRoZW47XG5cbiAgICAvLyBBZGQgbGlzdC1zcGVjaWZpYyBtZXRob2RzXG4gICAgalF1ZXJ5LmVhY2goIHR1cGxlcywgZnVuY3Rpb24oIGksIHR1cGxlICkge1xuICAgICAgdmFyIGxpc3QgPSB0dXBsZVsgMiBdLFxuICAgICAgICBzdGF0ZVN0cmluZyA9IHR1cGxlWyAzIF07XG5cbiAgICAgIC8vIHByb21pc2VbIGRvbmUgfCBmYWlsIHwgcHJvZ3Jlc3MgXSA9IGxpc3QuYWRkXG4gICAgICBwcm9taXNlWyB0dXBsZVsxXSBdID0gbGlzdC5hZGQ7XG5cbiAgICAgIC8vIEhhbmRsZSBzdGF0ZVxuICAgICAgaWYgKCBzdGF0ZVN0cmluZyApIHtcbiAgICAgICAgbGlzdC5hZGQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gc3RhdGUgPSBbIHJlc29sdmVkIHwgcmVqZWN0ZWQgXVxuICAgICAgICAgIHN0YXRlID0gc3RhdGVTdHJpbmc7XG5cbiAgICAgICAgLy8gWyByZWplY3RfbGlzdCB8IHJlc29sdmVfbGlzdCBdLmRpc2FibGU7IHByb2dyZXNzX2xpc3QubG9ja1xuICAgICAgICB9LCB0dXBsZXNbIGkgXiAxIF1bIDIgXS5kaXNhYmxlLCB0dXBsZXNbIDIgXVsgMiBdLmxvY2sgKTtcbiAgICAgIH1cblxuICAgICAgLy8gZGVmZXJyZWRbIHJlc29sdmUgfCByZWplY3QgfCBub3RpZnkgXVxuICAgICAgZGVmZXJyZWRbIHR1cGxlWzBdIF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZGVmZXJyZWRbIHR1cGxlWzBdICsgXCJXaXRoXCIgXSggdGhpcyA9PT0gZGVmZXJyZWQgPyBwcm9taXNlIDogdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfTtcbiAgICAgIGRlZmVycmVkWyB0dXBsZVswXSArIFwiV2l0aFwiIF0gPSBsaXN0LmZpcmVXaXRoO1xuICAgIH0pO1xuXG4gICAgLy8gTWFrZSB0aGUgZGVmZXJyZWQgYSBwcm9taXNlXG4gICAgcHJvbWlzZS5wcm9taXNlKCBkZWZlcnJlZCApO1xuXG4gICAgLy8gQ2FsbCBnaXZlbiBmdW5jIGlmIGFueVxuICAgIGlmICggZnVuYyApIHtcbiAgICAgIGZ1bmMuY2FsbCggZGVmZXJyZWQsIGRlZmVycmVkICk7XG4gICAgfVxuXG4gICAgLy8gQWxsIGRvbmUhXG4gICAgcmV0dXJuIGRlZmVycmVkO1xuICB9LFxuXG4gIC8vIERlZmVycmVkIGhlbHBlclxuICB3aGVuOiBmdW5jdGlvbiggc3Vib3JkaW5hdGUgLyogLCAuLi4sIHN1Ym9yZGluYXRlTiAqLyApIHtcbiAgICB2YXIgaSA9IDAsXG4gICAgICByZXNvbHZlVmFsdWVzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG4gICAgICBsZW5ndGggPSByZXNvbHZlVmFsdWVzLmxlbmd0aCxcblxuICAgICAgLy8gdGhlIGNvdW50IG9mIHVuY29tcGxldGVkIHN1Ym9yZGluYXRlc1xuICAgICAgcmVtYWluaW5nID0gbGVuZ3RoICE9PSAxIHx8ICggc3Vib3JkaW5hdGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHN1Ym9yZGluYXRlLnByb21pc2UgKSApID8gbGVuZ3RoIDogMCxcblxuICAgICAgLy8gdGhlIG1hc3RlciBEZWZlcnJlZC4gSWYgcmVzb2x2ZVZhbHVlcyBjb25zaXN0IG9mIG9ubHkgYSBzaW5nbGUgRGVmZXJyZWQsIGp1c3QgdXNlIHRoYXQuXG4gICAgICBkZWZlcnJlZCA9IHJlbWFpbmluZyA9PT0gMSA/IHN1Ym9yZGluYXRlIDogalF1ZXJ5LkRlZmVycmVkKCksXG5cbiAgICAgIC8vIFVwZGF0ZSBmdW5jdGlvbiBmb3IgYm90aCByZXNvbHZlIGFuZCBwcm9ncmVzcyB2YWx1ZXNcbiAgICAgIHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbiggaSwgY29udGV4dHMsIHZhbHVlcyApIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICAgICAgICBjb250ZXh0c1sgaSBdID0gdGhpcztcbiAgICAgICAgICB2YWx1ZXNbIGkgXSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gc2xpY2UuY2FsbCggYXJndW1lbnRzICkgOiB2YWx1ZTtcbiAgICAgICAgICBpZiAoIHZhbHVlcyA9PT0gcHJvZ3Jlc3NWYWx1ZXMgKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5ub3RpZnlXaXRoKCBjb250ZXh0cywgdmFsdWVzICk7XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKCAhKC0tcmVtYWluaW5nKSApIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKCBjb250ZXh0cywgdmFsdWVzICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgcHJvZ3Jlc3NWYWx1ZXMsIHByb2dyZXNzQ29udGV4dHMsIHJlc29sdmVDb250ZXh0cztcblxuICAgIC8vIGFkZCBsaXN0ZW5lcnMgdG8gRGVmZXJyZWQgc3Vib3JkaW5hdGVzOyB0cmVhdCBvdGhlcnMgYXMgcmVzb2x2ZWRcbiAgICBpZiAoIGxlbmd0aCA+IDEgKSB7XG4gICAgICBwcm9ncmVzc1ZhbHVlcyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG4gICAgICBwcm9ncmVzc0NvbnRleHRzID0gbmV3IEFycmF5KCBsZW5ndGggKTtcbiAgICAgIHJlc29sdmVDb250ZXh0cyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG4gICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgaWYgKCByZXNvbHZlVmFsdWVzWyBpIF0gJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJlc29sdmVWYWx1ZXNbIGkgXS5wcm9taXNlICkgKSB7XG4gICAgICAgICAgcmVzb2x2ZVZhbHVlc1sgaSBdLnByb21pc2UoKVxuICAgICAgICAgICAgLmRvbmUoIHVwZGF0ZUZ1bmMoIGksIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApIClcbiAgICAgICAgICAgIC5mYWlsKCBkZWZlcnJlZC5yZWplY3QgKVxuICAgICAgICAgICAgLnByb2dyZXNzKCB1cGRhdGVGdW5jKCBpLCBwcm9ncmVzc0NvbnRleHRzLCBwcm9ncmVzc1ZhbHVlcyApICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLS1yZW1haW5pbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB3ZSdyZSBub3Qgd2FpdGluZyBvbiBhbnl0aGluZywgcmVzb2x2ZSB0aGUgbWFzdGVyXG4gICAgaWYgKCAhcmVtYWluaW5nICkge1xuICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgoIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gIH1cbn0pO1xuXG5cbi8vIFRoZSBkZWZlcnJlZCB1c2VkIG9uIERPTSByZWFkeVxudmFyIHJlYWR5TGlzdDtcblxualF1ZXJ5LmZuLnJlYWR5ID0gZnVuY3Rpb24oIGZuICkge1xuICAvLyBBZGQgdGhlIGNhbGxiYWNrXG4gIGpRdWVyeS5yZWFkeS5wcm9taXNlKCkuZG9uZSggZm4gKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbmpRdWVyeS5leHRlbmQoe1xuICAvLyBJcyB0aGUgRE9NIHJlYWR5IHRvIGJlIHVzZWQ/IFNldCB0byB0cnVlIG9uY2UgaXQgb2NjdXJzLlxuICBpc1JlYWR5OiBmYWxzZSxcblxuICAvLyBBIGNvdW50ZXIgdG8gdHJhY2sgaG93IG1hbnkgaXRlbXMgdG8gd2FpdCBmb3IgYmVmb3JlXG4gIC8vIHRoZSByZWFkeSBldmVudCBmaXJlcy4gU2VlICM2NzgxXG4gIHJlYWR5V2FpdDogMSxcblxuICAvLyBIb2xkIChvciByZWxlYXNlKSB0aGUgcmVhZHkgZXZlbnRcbiAgaG9sZFJlYWR5OiBmdW5jdGlvbiggaG9sZCApIHtcbiAgICBpZiAoIGhvbGQgKSB7XG4gICAgICBqUXVlcnkucmVhZHlXYWl0Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGpRdWVyeS5yZWFkeSggdHJ1ZSApO1xuICAgIH1cbiAgfSxcblxuICAvLyBIYW5kbGUgd2hlbiB0aGUgRE9NIGlzIHJlYWR5XG4gIHJlYWR5OiBmdW5jdGlvbiggd2FpdCApIHtcblxuICAgIC8vIEFib3J0IGlmIHRoZXJlIGFyZSBwZW5kaW5nIGhvbGRzIG9yIHdlJ3JlIGFscmVhZHkgcmVhZHlcbiAgICBpZiAoIHdhaXQgPT09IHRydWUgPyAtLWpRdWVyeS5yZWFkeVdhaXQgOiBqUXVlcnkuaXNSZWFkeSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgYm9keSBleGlzdHMsIGF0IGxlYXN0LCBpbiBjYXNlIElFIGdldHMgYSBsaXR0bGUgb3ZlcnplYWxvdXMgKHRpY2tldCAjNTQ0MykuXG4gICAgaWYgKCAhZG9jdW1lbnQuYm9keSApIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KCBqUXVlcnkucmVhZHkgKTtcbiAgICB9XG5cbiAgICAvLyBSZW1lbWJlciB0aGF0IHRoZSBET00gaXMgcmVhZHlcbiAgICBqUXVlcnkuaXNSZWFkeSA9IHRydWU7XG5cbiAgICAvLyBJZiBhIG5vcm1hbCBET00gUmVhZHkgZXZlbnQgZmlyZWQsIGRlY3JlbWVudCwgYW5kIHdhaXQgaWYgbmVlZCBiZVxuICAgIGlmICggd2FpdCAhPT0gdHJ1ZSAmJiAtLWpRdWVyeS5yZWFkeVdhaXQgPiAwICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGFyZSBmdW5jdGlvbnMgYm91bmQsIHRvIGV4ZWN1dGVcbiAgICByZWFkeUxpc3QucmVzb2x2ZVdpdGgoIGRvY3VtZW50LCBbIGpRdWVyeSBdICk7XG5cbiAgICAvLyBUcmlnZ2VyIGFueSBib3VuZCByZWFkeSBldmVudHNcbiAgICBpZiAoIGpRdWVyeS5mbi50cmlnZ2VySGFuZGxlciApIHtcbiAgICAgIGpRdWVyeSggZG9jdW1lbnQgKS50cmlnZ2VySGFuZGxlciggXCJyZWFkeVwiICk7XG4gICAgICBqUXVlcnkoIGRvY3VtZW50ICkub2ZmKCBcInJlYWR5XCIgKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vKipcbiAqIENsZWFuLXVwIG1ldGhvZCBmb3IgZG9tIHJlYWR5IGV2ZW50c1xuICovXG5mdW5jdGlvbiBkZXRhY2goKSB7XG4gIGlmICggZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciApIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xuXG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuZGV0YWNoRXZlbnQoIFwib25yZWFkeXN0YXRlY2hhbmdlXCIsIGNvbXBsZXRlZCApO1xuICAgIHdpbmRvdy5kZXRhY2hFdmVudCggXCJvbmxvYWRcIiwgY29tcGxldGVkICk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgcmVhZHkgZXZlbnQgaGFuZGxlciBhbmQgc2VsZiBjbGVhbnVwIG1ldGhvZFxuICovXG5mdW5jdGlvbiBjb21wbGV0ZWQoKSB7XG4gIC8vIHJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiBpcyBnb29kIGVub3VnaCBmb3IgdXMgdG8gY2FsbCB0aGUgZG9tIHJlYWR5IGluIG9sZElFXG4gIGlmICggZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciB8fCBldmVudC50eXBlID09PSBcImxvYWRcIiB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgKSB7XG4gICAgZGV0YWNoKCk7XG4gICAgalF1ZXJ5LnJlYWR5KCk7XG4gIH1cbn1cblxualF1ZXJ5LnJlYWR5LnByb21pc2UgPSBmdW5jdGlvbiggb2JqICkge1xuICBpZiAoICFyZWFkeUxpc3QgKSB7XG5cbiAgICByZWFkeUxpc3QgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgIC8vIENhdGNoIGNhc2VzIHdoZXJlICQoZG9jdW1lbnQpLnJlYWR5KCkgaXMgY2FsbGVkIGFmdGVyIHRoZSBicm93c2VyIGV2ZW50IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxuICAgIC8vIHdlIG9uY2UgdHJpZWQgdG8gdXNlIHJlYWR5U3RhdGUgXCJpbnRlcmFjdGl2ZVwiIGhlcmUsIGJ1dCBpdCBjYXVzZWQgaXNzdWVzIGxpa2UgdGhlIG9uZVxuICAgIC8vIGRpc2NvdmVyZWQgYnkgQ2hyaXNTIGhlcmU6IGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMjgyI2NvbW1lbnQ6MTVcbiAgICBpZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiApIHtcbiAgICAgIC8vIEhhbmRsZSBpdCBhc3luY2hyb25vdXNseSB0byBhbGxvdyBzY3JpcHRzIHRoZSBvcHBvcnR1bml0eSB0byBkZWxheSByZWFkeVxuICAgICAgc2V0VGltZW91dCggalF1ZXJ5LnJlYWR5ICk7XG5cbiAgICAvLyBTdGFuZGFyZHMtYmFzZWQgYnJvd3NlcnMgc3VwcG9ydCBET01Db250ZW50TG9hZGVkXG4gICAgfSBlbHNlIGlmICggZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgIC8vIFVzZSB0aGUgaGFuZHkgZXZlbnQgY2FsbGJhY2tcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQsIGZhbHNlICk7XG5cbiAgICAgIC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCwgZmFsc2UgKTtcblxuICAgIC8vIElmIElFIGV2ZW50IG1vZGVsIGlzIHVzZWRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRW5zdXJlIGZpcmluZyBiZWZvcmUgb25sb2FkLCBtYXliZSBsYXRlIGJ1dCBzYWZlIGFsc28gZm9yIGlmcmFtZXNcbiAgICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KCBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLCBjb21wbGV0ZWQgKTtcblxuICAgICAgLy8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcbiAgICAgIHdpbmRvdy5hdHRhY2hFdmVudCggXCJvbmxvYWRcIiwgY29tcGxldGVkICk7XG5cbiAgICAgIC8vIElmIElFIGFuZCBub3QgYSBmcmFtZVxuICAgICAgLy8gY29udGludWFsbHkgY2hlY2sgdG8gc2VlIGlmIHRoZSBkb2N1bWVudCBpcyByZWFkeVxuICAgICAgdmFyIHRvcCA9IGZhbHNlO1xuXG4gICAgICB0cnkge1xuICAgICAgICB0b3AgPSB3aW5kb3cuZnJhbWVFbGVtZW50ID09IG51bGwgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgfSBjYXRjaChlKSB7fVxuXG4gICAgICBpZiAoIHRvcCAmJiB0b3AuZG9TY3JvbGwgKSB7XG4gICAgICAgIChmdW5jdGlvbiBkb1Njcm9sbENoZWNrKCkge1xuICAgICAgICAgIGlmICggIWpRdWVyeS5pc1JlYWR5ICkge1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvLyBVc2UgdGhlIHRyaWNrIGJ5IERpZWdvIFBlcmluaVxuICAgICAgICAgICAgICAvLyBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vSUVDb250ZW50TG9hZGVkL1xuICAgICAgICAgICAgICB0b3AuZG9TY3JvbGwoXCJsZWZ0XCIpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCBkb1Njcm9sbENoZWNrLCA1MCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZXRhY2ggYWxsIGRvbSByZWFkeSBldmVudHNcbiAgICAgICAgICAgIGRldGFjaCgpO1xuXG4gICAgICAgICAgICAvLyBhbmQgZXhlY3V0ZSBhbnkgd2FpdGluZyBmdW5jdGlvbnNcbiAgICAgICAgICAgIGpRdWVyeS5yZWFkeSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlYWR5TGlzdC5wcm9taXNlKCBvYmogKTtcbn07XG5cblxudmFyIHN0cnVuZGVmaW5lZCA9IHR5cGVvZiB1bmRlZmluZWQ7XG5cblxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBJdGVyYXRpb24gb3ZlciBvYmplY3QncyBpbmhlcml0ZWQgcHJvcGVydGllcyBiZWZvcmUgaXRzIG93blxudmFyIGk7XG5mb3IgKCBpIGluIGpRdWVyeSggc3VwcG9ydCApICkge1xuICBicmVhaztcbn1cbnN1cHBvcnQub3duTGFzdCA9IGkgIT09IFwiMFwiO1xuXG4vLyBOb3RlOiBtb3N0IHN1cHBvcnQgdGVzdHMgYXJlIGRlZmluZWQgaW4gdGhlaXIgcmVzcGVjdGl2ZSBtb2R1bGVzLlxuLy8gZmFsc2UgdW50aWwgdGhlIHRlc3QgaXMgcnVuXG5zdXBwb3J0LmlubGluZUJsb2NrTmVlZHNMYXlvdXQgPSBmYWxzZTtcblxuLy8gRXhlY3V0ZSBBU0FQIGluIGNhc2Ugd2UgbmVlZCB0byBzZXQgYm9keS5zdHlsZS56b29tXG5qUXVlcnkoZnVuY3Rpb24oKSB7XG4gIC8vIE1pbmlmaWVkOiB2YXIgYSxiLGMsZFxuICB2YXIgdmFsLCBkaXYsIGJvZHksIGNvbnRhaW5lcjtcblxuICBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwiYm9keVwiIClbIDAgXTtcbiAgaWYgKCAhYm9keSB8fCAhYm9keS5zdHlsZSApIHtcbiAgICAvLyBSZXR1cm4gZm9yIGZyYW1lc2V0IGRvY3MgdGhhdCBkb24ndCBoYXZlIGEgYm9keVxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFNldHVwXG4gIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcbiAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuICBjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyOjA7d2lkdGg6MDtoZWlnaHQ6MDt0b3A6MDtsZWZ0Oi05OTk5cHhcIjtcbiAgYm9keS5hcHBlbmRDaGlsZCggY29udGFpbmVyICkuYXBwZW5kQ2hpbGQoIGRpdiApO1xuXG4gIGlmICggdHlwZW9mIGRpdi5zdHlsZS56b29tICE9PSBzdHJ1bmRlZmluZWQgKSB7XG4gICAgLy8gU3VwcG9ydDogSUU8OFxuICAgIC8vIENoZWNrIGlmIG5hdGl2ZWx5IGJsb2NrLWxldmVsIGVsZW1lbnRzIGFjdCBsaWtlIGlubGluZS1ibG9ja1xuICAgIC8vIGVsZW1lbnRzIHdoZW4gc2V0dGluZyB0aGVpciBkaXNwbGF5IHRvICdpbmxpbmUnIGFuZCBnaXZpbmdcbiAgICAvLyB0aGVtIGxheW91dFxuICAgIGRpdi5zdHlsZS5jc3NUZXh0ID0gXCJkaXNwbGF5OmlubGluZTttYXJnaW46MDtib3JkZXI6MDtwYWRkaW5nOjFweDt3aWR0aDoxcHg7em9vbToxXCI7XG5cbiAgICBzdXBwb3J0LmlubGluZUJsb2NrTmVlZHNMYXlvdXQgPSB2YWwgPSBkaXYub2Zmc2V0V2lkdGggPT09IDM7XG4gICAgaWYgKCB2YWwgKSB7XG4gICAgICAvLyBQcmV2ZW50IElFIDYgZnJvbSBhZmZlY3RpbmcgbGF5b3V0IGZvciBwb3NpdGlvbmVkIGVsZW1lbnRzICMxMTA0OFxuICAgICAgLy8gUHJldmVudCBJRSBmcm9tIHNocmlua2luZyB0aGUgYm9keSBpbiBJRSA3IG1vZGUgIzEyODY5XG4gICAgICAvLyBTdXBwb3J0OiBJRTw4XG4gICAgICBib2R5LnN0eWxlLnpvb20gPSAxO1xuICAgIH1cbiAgfVxuXG4gIGJvZHkucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApO1xufSk7XG5cblxuXG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcblxuICAvLyBFeGVjdXRlIHRoZSB0ZXN0IG9ubHkgaWYgbm90IGFscmVhZHkgZXhlY3V0ZWQgaW4gYW5vdGhlciBtb2R1bGUuXG4gIGlmIChzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPT0gbnVsbCkge1xuICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBkZWxldGUgZGl2LnRlc3Q7XG4gICAgfSBjYXRjaCggZSApIHtcbiAgICAgIHN1cHBvcnQuZGVsZXRlRXhwYW5kbyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXG4gIGRpdiA9IG51bGw7XG59KSgpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGFuIG9iamVjdCBjYW4gaGF2ZSBkYXRhXG4gKi9cbmpRdWVyeS5hY2NlcHREYXRhID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBub0RhdGEgPSBqUXVlcnkubm9EYXRhWyAoZWxlbS5ub2RlTmFtZSArIFwiIFwiKS50b0xvd2VyQ2FzZSgpIF0sXG4gICAgbm9kZVR5cGUgPSArZWxlbS5ub2RlVHlwZSB8fCAxO1xuXG4gIC8vIERvIG5vdCBzZXQgZGF0YSBvbiBub24tZWxlbWVudCBET00gbm9kZXMgYmVjYXVzZSBpdCB3aWxsIG5vdCBiZSBjbGVhcmVkICgjODMzNSkuXG4gIHJldHVybiBub2RlVHlwZSAhPT0gMSAmJiBub2RlVHlwZSAhPT0gOSA/XG4gICAgZmFsc2UgOlxuXG4gICAgLy8gTm9kZXMgYWNjZXB0IGRhdGEgdW5sZXNzIG90aGVyd2lzZSBzcGVjaWZpZWQ7IHJlamVjdGlvbiBjYW4gYmUgY29uZGl0aW9uYWxcbiAgICAhbm9EYXRhIHx8IG5vRGF0YSAhPT0gdHJ1ZSAmJiBlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzaWRcIikgPT09IG5vRGF0YTtcbn07XG5cblxudmFyIHJicmFjZSA9IC9eKD86XFx7W1xcd1xcV10qXFx9fFxcW1tcXHdcXFddKlxcXSkkLyxcbiAgcm11bHRpRGFzaCA9IC8oW0EtWl0pL2c7XG5cbmZ1bmN0aW9uIGRhdGFBdHRyKCBlbGVtLCBrZXksIGRhdGEgKSB7XG4gIC8vIElmIG5vdGhpbmcgd2FzIGZvdW5kIGludGVybmFsbHksIHRyeSB0byBmZXRjaCBhbnlcbiAgLy8gZGF0YSBmcm9tIHRoZSBIVE1MNSBkYXRhLSogYXR0cmlidXRlXG4gIGlmICggZGF0YSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cbiAgICB2YXIgbmFtZSA9IFwiZGF0YS1cIiArIGtleS5yZXBsYWNlKCBybXVsdGlEYXNoLCBcIi0kMVwiICkudG9Mb3dlckNhc2UoKTtcblxuICAgIGRhdGEgPSBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApO1xuXG4gICAgaWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBkYXRhID09PSBcInRydWVcIiA/IHRydWUgOlxuICAgICAgICAgIGRhdGEgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDpcbiAgICAgICAgICBkYXRhID09PSBcIm51bGxcIiA/IG51bGwgOlxuICAgICAgICAgIC8vIE9ubHkgY29udmVydCB0byBhIG51bWJlciBpZiBpdCBkb2Vzbid0IGNoYW5nZSB0aGUgc3RyaW5nXG4gICAgICAgICAgK2RhdGEgKyBcIlwiID09PSBkYXRhID8gK2RhdGEgOlxuICAgICAgICAgIHJicmFjZS50ZXN0KCBkYXRhICkgPyBqUXVlcnkucGFyc2VKU09OKCBkYXRhICkgOlxuICAgICAgICAgIGRhdGE7XG4gICAgICB9IGNhdGNoKCBlICkge31cblxuICAgICAgLy8gTWFrZSBzdXJlIHdlIHNldCB0aGUgZGF0YSBzbyBpdCBpc24ndCBjaGFuZ2VkIGxhdGVyXG4gICAgICBqUXVlcnkuZGF0YSggZWxlbSwga2V5LCBkYXRhICk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLy8gY2hlY2tzIGEgY2FjaGUgb2JqZWN0IGZvciBlbXB0aW5lc3NcbmZ1bmN0aW9uIGlzRW1wdHlEYXRhT2JqZWN0KCBvYmogKSB7XG4gIHZhciBuYW1lO1xuICBmb3IgKCBuYW1lIGluIG9iaiApIHtcblxuICAgIC8vIGlmIHRoZSBwdWJsaWMgZGF0YSBvYmplY3QgaXMgZW1wdHksIHRoZSBwcml2YXRlIGlzIHN0aWxsIGVtcHR5XG4gICAgaWYgKCBuYW1lID09PSBcImRhdGFcIiAmJiBqUXVlcnkuaXNFbXB0eU9iamVjdCggb2JqW25hbWVdICkgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKCBuYW1lICE9PSBcInRvSlNPTlwiICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbERhdGEoIGVsZW0sIG5hbWUsIGRhdGEsIHB2dCAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcbiAgaWYgKCAhalF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcmV0LCB0aGlzQ2FjaGUsXG4gICAgaW50ZXJuYWxLZXkgPSBqUXVlcnkuZXhwYW5kbyxcblxuICAgIC8vIFdlIGhhdmUgdG8gaGFuZGxlIERPTSBub2RlcyBhbmQgSlMgb2JqZWN0cyBkaWZmZXJlbnRseSBiZWNhdXNlIElFNi03XG4gICAgLy8gY2FuJ3QgR0Mgb2JqZWN0IHJlZmVyZW5jZXMgcHJvcGVybHkgYWNyb3NzIHRoZSBET00tSlMgYm91bmRhcnlcbiAgICBpc05vZGUgPSBlbGVtLm5vZGVUeXBlLFxuXG4gICAgLy8gT25seSBET00gbm9kZXMgbmVlZCB0aGUgZ2xvYmFsIGpRdWVyeSBjYWNoZTsgSlMgb2JqZWN0IGRhdGEgaXNcbiAgICAvLyBhdHRhY2hlZCBkaXJlY3RseSB0byB0aGUgb2JqZWN0IHNvIEdDIGNhbiBvY2N1ciBhdXRvbWF0aWNhbGx5XG4gICAgY2FjaGUgPSBpc05vZGUgPyBqUXVlcnkuY2FjaGUgOiBlbGVtLFxuXG4gICAgLy8gT25seSBkZWZpbmluZyBhbiBJRCBmb3IgSlMgb2JqZWN0cyBpZiBpdHMgY2FjaGUgYWxyZWFkeSBleGlzdHMgYWxsb3dzXG4gICAgLy8gdGhlIGNvZGUgdG8gc2hvcnRjdXQgb24gdGhlIHNhbWUgcGF0aCBhcyBhIERPTSBub2RlIHdpdGggbm8gY2FjaGVcbiAgICBpZCA9IGlzTm9kZSA/IGVsZW1bIGludGVybmFsS2V5IF0gOiBlbGVtWyBpbnRlcm5hbEtleSBdICYmIGludGVybmFsS2V5O1xuXG4gIC8vIEF2b2lkIGRvaW5nIGFueSBtb3JlIHdvcmsgdGhhbiB3ZSBuZWVkIHRvIHdoZW4gdHJ5aW5nIHRvIGdldCBkYXRhIG9uIGFuXG4gIC8vIG9iamVjdCB0aGF0IGhhcyBubyBkYXRhIGF0IGFsbFxuICBpZiAoICghaWQgfHwgIWNhY2hlW2lkXSB8fCAoIXB2dCAmJiAhY2FjaGVbaWRdLmRhdGEpKSAmJiBkYXRhID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCAhaWQgKSB7XG4gICAgLy8gT25seSBET00gbm9kZXMgbmVlZCBhIG5ldyB1bmlxdWUgSUQgZm9yIGVhY2ggZWxlbWVudCBzaW5jZSB0aGVpciBkYXRhXG4gICAgLy8gZW5kcyB1cCBpbiB0aGUgZ2xvYmFsIGNhY2hlXG4gICAgaWYgKCBpc05vZGUgKSB7XG4gICAgICBpZCA9IGVsZW1bIGludGVybmFsS2V5IF0gPSBkZWxldGVkSWRzLnBvcCgpIHx8IGpRdWVyeS5ndWlkKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkID0gaW50ZXJuYWxLZXk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCAhY2FjaGVbIGlkIF0gKSB7XG4gICAgLy8gQXZvaWQgZXhwb3NpbmcgalF1ZXJ5IG1ldGFkYXRhIG9uIHBsYWluIEpTIG9iamVjdHMgd2hlbiB0aGUgb2JqZWN0XG4gICAgLy8gaXMgc2VyaWFsaXplZCB1c2luZyBKU09OLnN0cmluZ2lmeVxuICAgIGNhY2hlWyBpZCBdID0gaXNOb2RlID8ge30gOiB7IHRvSlNPTjogalF1ZXJ5Lm5vb3AgfTtcbiAgfVxuXG4gIC8vIEFuIG9iamVjdCBjYW4gYmUgcGFzc2VkIHRvIGpRdWVyeS5kYXRhIGluc3RlYWQgb2YgYSBrZXkvdmFsdWUgcGFpcjsgdGhpcyBnZXRzXG4gIC8vIHNoYWxsb3cgY29waWVkIG92ZXIgb250byB0aGUgZXhpc3RpbmcgY2FjaGVcbiAgaWYgKCB0eXBlb2YgbmFtZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiICkge1xuICAgIGlmICggcHZ0ICkge1xuICAgICAgY2FjaGVbIGlkIF0gPSBqUXVlcnkuZXh0ZW5kKCBjYWNoZVsgaWQgXSwgbmFtZSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZVsgaWQgXS5kYXRhID0galF1ZXJ5LmV4dGVuZCggY2FjaGVbIGlkIF0uZGF0YSwgbmFtZSApO1xuICAgIH1cbiAgfVxuXG4gIHRoaXNDYWNoZSA9IGNhY2hlWyBpZCBdO1xuXG4gIC8vIGpRdWVyeSBkYXRhKCkgaXMgc3RvcmVkIGluIGEgc2VwYXJhdGUgb2JqZWN0IGluc2lkZSB0aGUgb2JqZWN0J3MgaW50ZXJuYWwgZGF0YVxuICAvLyBjYWNoZSBpbiBvcmRlciB0byBhdm9pZCBrZXkgY29sbGlzaW9ucyBiZXR3ZWVuIGludGVybmFsIGRhdGEgYW5kIHVzZXItZGVmaW5lZFxuICAvLyBkYXRhLlxuICBpZiAoICFwdnQgKSB7XG4gICAgaWYgKCAhdGhpc0NhY2hlLmRhdGEgKSB7XG4gICAgICB0aGlzQ2FjaGUuZGF0YSA9IHt9O1xuICAgIH1cblxuICAgIHRoaXNDYWNoZSA9IHRoaXNDYWNoZS5kYXRhO1xuICB9XG5cbiAgaWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG4gICAgdGhpc0NhY2hlWyBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICkgXSA9IGRhdGE7XG4gIH1cblxuICAvLyBDaGVjayBmb3IgYm90aCBjb252ZXJ0ZWQtdG8tY2FtZWwgYW5kIG5vbi1jb252ZXJ0ZWQgZGF0YSBwcm9wZXJ0eSBuYW1lc1xuICAvLyBJZiBhIGRhdGEgcHJvcGVydHkgd2FzIHNwZWNpZmllZFxuICBpZiAoIHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiICkge1xuXG4gICAgLy8gRmlyc3QgVHJ5IHRvIGZpbmQgYXMtaXMgcHJvcGVydHkgZGF0YVxuICAgIHJldCA9IHRoaXNDYWNoZVsgbmFtZSBdO1xuXG4gICAgLy8gVGVzdCBmb3IgbnVsbHx1bmRlZmluZWQgcHJvcGVydHkgZGF0YVxuICAgIGlmICggcmV0ID09IG51bGwgKSB7XG5cbiAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBjYW1lbENhc2VkIHByb3BlcnR5XG4gICAgICByZXQgPSB0aGlzQ2FjaGVbIGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSBdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXQgPSB0aGlzQ2FjaGU7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbFJlbW92ZURhdGEoIGVsZW0sIG5hbWUsIHB2dCApIHtcbiAgaWYgKCAhalF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdGhpc0NhY2hlLCBpLFxuICAgIGlzTm9kZSA9IGVsZW0ubm9kZVR5cGUsXG5cbiAgICAvLyBTZWUgalF1ZXJ5LmRhdGEgZm9yIG1vcmUgaW5mb3JtYXRpb25cbiAgICBjYWNoZSA9IGlzTm9kZSA/IGpRdWVyeS5jYWNoZSA6IGVsZW0sXG4gICAgaWQgPSBpc05vZGUgPyBlbGVtWyBqUXVlcnkuZXhwYW5kbyBdIDogalF1ZXJ5LmV4cGFuZG87XG5cbiAgLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBubyBjYWNoZSBlbnRyeSBmb3IgdGhpcyBvYmplY3QsIHRoZXJlIGlzIG5vXG4gIC8vIHB1cnBvc2UgaW4gY29udGludWluZ1xuICBpZiAoICFjYWNoZVsgaWQgXSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIG5hbWUgKSB7XG5cbiAgICB0aGlzQ2FjaGUgPSBwdnQgPyBjYWNoZVsgaWQgXSA6IGNhY2hlWyBpZCBdLmRhdGE7XG5cbiAgICBpZiAoIHRoaXNDYWNoZSApIHtcblxuICAgICAgLy8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG5hbWVzIGZvciBkYXRhIGtleXNcbiAgICAgIGlmICggIWpRdWVyeS5pc0FycmF5KCBuYW1lICkgKSB7XG5cbiAgICAgICAgLy8gdHJ5IHRoZSBzdHJpbmcgYXMgYSBrZXkgYmVmb3JlIGFueSBtYW5pcHVsYXRpb25cbiAgICAgICAgaWYgKCBuYW1lIGluIHRoaXNDYWNoZSApIHtcbiAgICAgICAgICBuYW1lID0gWyBuYW1lIF07XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAvLyBzcGxpdCB0aGUgY2FtZWwgY2FzZWQgdmVyc2lvbiBieSBzcGFjZXMgdW5sZXNzIGEga2V5IHdpdGggdGhlIHNwYWNlcyBleGlzdHNcbiAgICAgICAgICBuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApO1xuICAgICAgICAgIGlmICggbmFtZSBpbiB0aGlzQ2FjaGUgKSB7XG4gICAgICAgICAgICBuYW1lID0gWyBuYW1lIF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIFwibmFtZVwiIGlzIGFuIGFycmF5IG9mIGtleXMuLi5cbiAgICAgICAgLy8gV2hlbiBkYXRhIGlzIGluaXRpYWxseSBjcmVhdGVkLCB2aWEgKFwia2V5XCIsIFwidmFsXCIpIHNpZ25hdHVyZSxcbiAgICAgICAgLy8ga2V5cyB3aWxsIGJlIGNvbnZlcnRlZCB0byBjYW1lbENhc2UuXG4gICAgICAgIC8vIFNpbmNlIHRoZXJlIGlzIG5vIHdheSB0byB0ZWxsIF9ob3dfIGEga2V5IHdhcyBhZGRlZCwgcmVtb3ZlXG4gICAgICAgIC8vIGJvdGggcGxhaW4ga2V5IGFuZCBjYW1lbENhc2Uga2V5LiAjMTI3ODZcbiAgICAgICAgLy8gVGhpcyB3aWxsIG9ubHkgcGVuYWxpemUgdGhlIGFycmF5IGFyZ3VtZW50IHBhdGguXG4gICAgICAgIG5hbWUgPSBuYW1lLmNvbmNhdCggalF1ZXJ5Lm1hcCggbmFtZSwgalF1ZXJ5LmNhbWVsQ2FzZSApICk7XG4gICAgICB9XG5cbiAgICAgIGkgPSBuYW1lLmxlbmd0aDtcbiAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICBkZWxldGUgdGhpc0NhY2hlWyBuYW1lW2ldIF07XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGRhdGEgbGVmdCBpbiB0aGUgY2FjaGUsIHdlIHdhbnQgdG8gY29udGludWVcbiAgICAgIC8vIGFuZCBsZXQgdGhlIGNhY2hlIG9iamVjdCBpdHNlbGYgZ2V0IGRlc3Ryb3llZFxuICAgICAgaWYgKCBwdnQgPyAhaXNFbXB0eURhdGFPYmplY3QodGhpc0NhY2hlKSA6ICFqUXVlcnkuaXNFbXB0eU9iamVjdCh0aGlzQ2FjaGUpICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU2VlIGpRdWVyeS5kYXRhIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gIGlmICggIXB2dCApIHtcbiAgICBkZWxldGUgY2FjaGVbIGlkIF0uZGF0YTtcblxuICAgIC8vIERvbid0IGRlc3Ryb3kgdGhlIHBhcmVudCBjYWNoZSB1bmxlc3MgdGhlIGludGVybmFsIGRhdGEgb2JqZWN0XG4gICAgLy8gaGFkIGJlZW4gdGhlIG9ubHkgdGhpbmcgbGVmdCBpbiBpdFxuICAgIGlmICggIWlzRW1wdHlEYXRhT2JqZWN0KCBjYWNoZVsgaWQgXSApICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8vIERlc3Ryb3kgdGhlIGNhY2hlXG4gIGlmICggaXNOb2RlICkge1xuICAgIGpRdWVyeS5jbGVhbkRhdGEoIFsgZWxlbSBdLCB0cnVlICk7XG5cbiAgLy8gVXNlIGRlbGV0ZSB3aGVuIHN1cHBvcnRlZCBmb3IgZXhwYW5kb3Mgb3IgYGNhY2hlYCBpcyBub3QgYSB3aW5kb3cgcGVyIGlzV2luZG93ICgjMTAwODApXG4gIC8qIGpzaGludCBlcWVxZXE6IGZhbHNlICovXG4gIH0gZWxzZSBpZiAoIHN1cHBvcnQuZGVsZXRlRXhwYW5kbyB8fCBjYWNoZSAhPSBjYWNoZS53aW5kb3cgKSB7XG4gICAgLyoganNoaW50IGVxZXFlcTogdHJ1ZSAqL1xuICAgIGRlbGV0ZSBjYWNoZVsgaWQgXTtcblxuICAvLyBXaGVuIGFsbCBlbHNlIGZhaWxzLCBudWxsXG4gIH0gZWxzZSB7XG4gICAgY2FjaGVbIGlkIF0gPSBudWxsO1xuICB9XG59XG5cbmpRdWVyeS5leHRlbmQoe1xuICBjYWNoZToge30sXG5cbiAgLy8gVGhlIGZvbGxvd2luZyBlbGVtZW50cyAoc3BhY2Utc3VmZml4ZWQgdG8gYXZvaWQgT2JqZWN0LnByb3RvdHlwZSBjb2xsaXNpb25zKVxuICAvLyB0aHJvdyB1bmNhdGNoYWJsZSBleGNlcHRpb25zIGlmIHlvdSBhdHRlbXB0IHRvIHNldCBleHBhbmRvIHByb3BlcnRpZXNcbiAgbm9EYXRhOiB7XG4gICAgXCJhcHBsZXQgXCI6IHRydWUsXG4gICAgXCJlbWJlZCBcIjogdHJ1ZSxcbiAgICAvLyAuLi5idXQgRmxhc2ggb2JqZWN0cyAod2hpY2ggaGF2ZSB0aGlzIGNsYXNzaWQpICpjYW4qIGhhbmRsZSBleHBhbmRvc1xuICAgIFwib2JqZWN0IFwiOiBcImNsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMFwiXG4gIH0sXG5cbiAgaGFzRGF0YTogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgZWxlbSA9IGVsZW0ubm9kZVR5cGUgPyBqUXVlcnkuY2FjaGVbIGVsZW1balF1ZXJ5LmV4cGFuZG9dIF0gOiBlbGVtWyBqUXVlcnkuZXhwYW5kbyBdO1xuICAgIHJldHVybiAhIWVsZW0gJiYgIWlzRW1wdHlEYXRhT2JqZWN0KCBlbGVtICk7XG4gIH0sXG5cbiAgZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG4gICAgcmV0dXJuIGludGVybmFsRGF0YSggZWxlbSwgbmFtZSwgZGF0YSApO1xuICB9LFxuXG4gIHJlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuICAgIHJldHVybiBpbnRlcm5hbFJlbW92ZURhdGEoIGVsZW0sIG5hbWUgKTtcbiAgfSxcblxuICAvLyBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gIF9kYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZGF0YSApIHtcbiAgICByZXR1cm4gaW50ZXJuYWxEYXRhKCBlbGVtLCBuYW1lLCBkYXRhLCB0cnVlICk7XG4gIH0sXG5cbiAgX3JlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuICAgIHJldHVybiBpbnRlcm5hbFJlbW92ZURhdGEoIGVsZW0sIG5hbWUsIHRydWUgKTtcbiAgfVxufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBkYXRhOiBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcbiAgICB2YXIgaSwgbmFtZSwgZGF0YSxcbiAgICAgIGVsZW0gPSB0aGlzWzBdLFxuICAgICAgYXR0cnMgPSBlbGVtICYmIGVsZW0uYXR0cmlidXRlcztcblxuICAgIC8vIFNwZWNpYWwgZXhwZWN0aW9ucyBvZiAuZGF0YSBiYXNpY2FsbHkgdGh3YXJ0IGpRdWVyeS5hY2Nlc3MsXG4gICAgLy8gc28gaW1wbGVtZW50IHRoZSByZWxldmFudCBiZWhhdmlvciBvdXJzZWx2ZXNcblxuICAgIC8vIEdldHMgYWxsIHZhbHVlc1xuICAgIGlmICgga2V5ID09PSB1bmRlZmluZWQgKSB7XG4gICAgICBpZiAoIHRoaXMubGVuZ3RoICkge1xuICAgICAgICBkYXRhID0galF1ZXJ5LmRhdGEoIGVsZW0gKTtcblxuICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgIWpRdWVyeS5fZGF0YSggZWxlbSwgXCJwYXJzZWRBdHRyc1wiICkgKSB7XG4gICAgICAgICAgaSA9IGF0dHJzLmxlbmd0aDtcbiAgICAgICAgICB3aGlsZSAoIGktLSApIHtcblxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUUxMStcbiAgICAgICAgICAgIC8vIFRoZSBhdHRycyBlbGVtZW50cyBjYW4gYmUgbnVsbCAoIzE0ODk0KVxuICAgICAgICAgICAgaWYgKCBhdHRyc1sgaSBdICkge1xuICAgICAgICAgICAgICBuYW1lID0gYXR0cnNbIGkgXS5uYW1lO1xuICAgICAgICAgICAgICBpZiAoIG5hbWUuaW5kZXhPZiggXCJkYXRhLVwiICkgPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUuc2xpY2UoNSkgKTtcbiAgICAgICAgICAgICAgICBkYXRhQXR0ciggZWxlbSwgbmFtZSwgZGF0YVsgbmFtZSBdICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgalF1ZXJ5Ll9kYXRhKCBlbGVtLCBcInBhcnNlZEF0dHJzXCIsIHRydWUgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICAvLyBTZXRzIG11bHRpcGxlIHZhbHVlc1xuICAgIGlmICggdHlwZW9mIGtleSA9PT0gXCJvYmplY3RcIiApIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeS5kYXRhKCB0aGlzLCBrZXkgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMSA/XG5cbiAgICAgIC8vIFNldHMgb25lIHZhbHVlXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeS5kYXRhKCB0aGlzLCBrZXksIHZhbHVlICk7XG4gICAgICB9KSA6XG5cbiAgICAgIC8vIEdldHMgb25lIHZhbHVlXG4gICAgICAvLyBUcnkgdG8gZmV0Y2ggYW55IGludGVybmFsbHkgc3RvcmVkIGRhdGEgZmlyc3RcbiAgICAgIGVsZW0gPyBkYXRhQXR0ciggZWxlbSwga2V5LCBqUXVlcnkuZGF0YSggZWxlbSwga2V5ICkgKSA6IHVuZGVmaW5lZDtcbiAgfSxcblxuICByZW1vdmVEYXRhOiBmdW5jdGlvbigga2V5ICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkucmVtb3ZlRGF0YSggdGhpcywga2V5ICk7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5cbmpRdWVyeS5leHRlbmQoe1xuICBxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGRhdGEgKSB7XG4gICAgdmFyIHF1ZXVlO1xuXG4gICAgaWYgKCBlbGVtICkge1xuICAgICAgdHlwZSA9ICggdHlwZSB8fCBcImZ4XCIgKSArIFwicXVldWVcIjtcbiAgICAgIHF1ZXVlID0galF1ZXJ5Ll9kYXRhKCBlbGVtLCB0eXBlICk7XG5cbiAgICAgIC8vIFNwZWVkIHVwIGRlcXVldWUgYnkgZ2V0dGluZyBvdXQgcXVpY2tseSBpZiB0aGlzIGlzIGp1c3QgYSBsb29rdXBcbiAgICAgIGlmICggZGF0YSApIHtcbiAgICAgICAgaWYgKCAhcXVldWUgfHwgalF1ZXJ5LmlzQXJyYXkoZGF0YSkgKSB7XG4gICAgICAgICAgcXVldWUgPSBqUXVlcnkuX2RhdGEoIGVsZW0sIHR5cGUsIGpRdWVyeS5tYWtlQXJyYXkoZGF0YSkgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBxdWV1ZS5wdXNoKCBkYXRhICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBxdWV1ZSB8fCBbXTtcbiAgICB9XG4gIH0sXG5cbiAgZGVxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG4gICAgdHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG4gICAgdmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCBlbGVtLCB0eXBlICksXG4gICAgICBzdGFydExlbmd0aCA9IHF1ZXVlLmxlbmd0aCxcbiAgICAgIGZuID0gcXVldWUuc2hpZnQoKSxcbiAgICAgIGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCB0eXBlICksXG4gICAgICBuZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeS5kZXF1ZXVlKCBlbGVtLCB0eXBlICk7XG4gICAgICB9O1xuXG4gICAgLy8gSWYgdGhlIGZ4IHF1ZXVlIGlzIGRlcXVldWVkLCBhbHdheXMgcmVtb3ZlIHRoZSBwcm9ncmVzcyBzZW50aW5lbFxuICAgIGlmICggZm4gPT09IFwiaW5wcm9ncmVzc1wiICkge1xuICAgICAgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgc3RhcnRMZW5ndGgtLTtcbiAgICB9XG5cbiAgICBpZiAoIGZuICkge1xuXG4gICAgICAvLyBBZGQgYSBwcm9ncmVzcyBzZW50aW5lbCB0byBwcmV2ZW50IHRoZSBmeCBxdWV1ZSBmcm9tIGJlaW5nXG4gICAgICAvLyBhdXRvbWF0aWNhbGx5IGRlcXVldWVkXG4gICAgICBpZiAoIHR5cGUgPT09IFwiZnhcIiApIHtcbiAgICAgICAgcXVldWUudW5zaGlmdCggXCJpbnByb2dyZXNzXCIgKTtcbiAgICAgIH1cblxuICAgICAgLy8gY2xlYXIgdXAgdGhlIGxhc3QgcXVldWUgc3RvcCBmdW5jdGlvblxuICAgICAgZGVsZXRlIGhvb2tzLnN0b3A7XG4gICAgICBmbi5jYWxsKCBlbGVtLCBuZXh0LCBob29rcyApO1xuICAgIH1cblxuICAgIGlmICggIXN0YXJ0TGVuZ3RoICYmIGhvb2tzICkge1xuICAgICAgaG9va3MuZW1wdHkuZmlyZSgpO1xuICAgIH1cbiAgfSxcblxuICAvLyBub3QgaW50ZW5kZWQgZm9yIHB1YmxpYyBjb25zdW1wdGlvbiAtIGdlbmVyYXRlcyBhIHF1ZXVlSG9va3Mgb2JqZWN0LCBvciByZXR1cm5zIHRoZSBjdXJyZW50IG9uZVxuICBfcXVldWVIb29rczogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG4gICAgdmFyIGtleSA9IHR5cGUgKyBcInF1ZXVlSG9va3NcIjtcbiAgICByZXR1cm4galF1ZXJ5Ll9kYXRhKCBlbGVtLCBrZXkgKSB8fCBqUXVlcnkuX2RhdGEoIGVsZW0sIGtleSwge1xuICAgICAgZW1wdHk6IGpRdWVyeS5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKS5hZGQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YSggZWxlbSwgdHlwZSArIFwicXVldWVcIiApO1xuICAgICAgICBqUXVlcnkuX3JlbW92ZURhdGEoIGVsZW0sIGtleSApO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfVxufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBxdWV1ZTogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG4gICAgdmFyIHNldHRlciA9IDI7XG5cbiAgICBpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuICAgICAgZGF0YSA9IHR5cGU7XG4gICAgICB0eXBlID0gXCJmeFwiO1xuICAgICAgc2V0dGVyLS07XG4gICAgfVxuXG4gICAgaWYgKCBhcmd1bWVudHMubGVuZ3RoIDwgc2V0dGVyICkge1xuICAgICAgcmV0dXJuIGpRdWVyeS5xdWV1ZSggdGhpc1swXSwgdHlwZSApO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhID09PSB1bmRlZmluZWQgP1xuICAgICAgdGhpcyA6XG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggdGhpcywgdHlwZSwgZGF0YSApO1xuXG4gICAgICAgIC8vIGVuc3VyZSBhIGhvb2tzIGZvciB0aGlzIHF1ZXVlXG4gICAgICAgIGpRdWVyeS5fcXVldWVIb29rcyggdGhpcywgdHlwZSApO1xuXG4gICAgICAgIGlmICggdHlwZSA9PT0gXCJmeFwiICYmIHF1ZXVlWzBdICE9PSBcImlucHJvZ3Jlc3NcIiApIHtcbiAgICAgICAgICBqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSxcbiAgZGVxdWV1ZTogZnVuY3Rpb24oIHR5cGUgKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG4gICAgfSk7XG4gIH0sXG4gIGNsZWFyUXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcbiAgfSxcbiAgLy8gR2V0IGEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHF1ZXVlcyBvZiBhIGNlcnRhaW4gdHlwZVxuICAvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcbiAgcHJvbWlzZTogZnVuY3Rpb24oIHR5cGUsIG9iaiApIHtcbiAgICB2YXIgdG1wLFxuICAgICAgY291bnQgPSAxLFxuICAgICAgZGVmZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgIGVsZW1lbnRzID0gdGhpcyxcbiAgICAgIGkgPSB0aGlzLmxlbmd0aCxcbiAgICAgIHJlc29sdmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCAhKCAtLWNvdW50ICkgKSB7XG4gICAgICAgICAgZGVmZXIucmVzb2x2ZVdpdGgoIGVsZW1lbnRzLCBbIGVsZW1lbnRzIF0gKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgIGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICBvYmogPSB0eXBlO1xuICAgICAgdHlwZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG4gICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICB0bXAgPSBqUXVlcnkuX2RhdGEoIGVsZW1lbnRzWyBpIF0sIHR5cGUgKyBcInF1ZXVlSG9va3NcIiApO1xuICAgICAgaWYgKCB0bXAgJiYgdG1wLmVtcHR5ICkge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgICB0bXAuZW1wdHkuYWRkKCByZXNvbHZlICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc29sdmUoKTtcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSggb2JqICk7XG4gIH1cbn0pO1xudmFyIHBudW0gPSAoL1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8pLnNvdXJjZTtcblxudmFyIGNzc0V4cGFuZCA9IFsgXCJUb3BcIiwgXCJSaWdodFwiLCBcIkJvdHRvbVwiLCBcIkxlZnRcIiBdO1xuXG52YXIgaXNIaWRkZW4gPSBmdW5jdGlvbiggZWxlbSwgZWwgKSB7XG4gICAgLy8gaXNIaWRkZW4gbWlnaHQgYmUgY2FsbGVkIGZyb20galF1ZXJ5I2ZpbHRlciBmdW5jdGlvbjtcbiAgICAvLyBpbiB0aGF0IGNhc2UsIGVsZW1lbnQgd2lsbCBiZSBzZWNvbmQgYXJndW1lbnRcbiAgICBlbGVtID0gZWwgfHwgZWxlbTtcbiAgICByZXR1cm4galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSA9PT0gXCJub25lXCIgfHwgIWpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG4gIH07XG5cblxuXG4vLyBNdWx0aWZ1bmN0aW9uYWwgbWV0aG9kIHRvIGdldCBhbmQgc2V0IHZhbHVlcyBvZiBhIGNvbGxlY3Rpb25cbi8vIFRoZSB2YWx1ZS9zIGNhbiBvcHRpb25hbGx5IGJlIGV4ZWN1dGVkIGlmIGl0J3MgYSBmdW5jdGlvblxudmFyIGFjY2VzcyA9IGpRdWVyeS5hY2Nlc3MgPSBmdW5jdGlvbiggZWxlbXMsIGZuLCBrZXksIHZhbHVlLCBjaGFpbmFibGUsIGVtcHR5R2V0LCByYXcgKSB7XG4gIHZhciBpID0gMCxcbiAgICBsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG4gICAgYnVsayA9IGtleSA9PSBudWxsO1xuXG4gIC8vIFNldHMgbWFueSB2YWx1ZXNcbiAgaWYgKCBqUXVlcnkudHlwZSgga2V5ICkgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgY2hhaW5hYmxlID0gdHJ1ZTtcbiAgICBmb3IgKCBpIGluIGtleSApIHtcbiAgICAgIGpRdWVyeS5hY2Nlc3MoIGVsZW1zLCBmbiwgaSwga2V5W2ldLCB0cnVlLCBlbXB0eUdldCwgcmF3ICk7XG4gICAgfVxuXG4gIC8vIFNldHMgb25lIHZhbHVlXG4gIH0gZWxzZSBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgY2hhaW5hYmxlID0gdHJ1ZTtcblxuICAgIGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuICAgICAgcmF3ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGJ1bGsgKSB7XG4gICAgICAvLyBCdWxrIG9wZXJhdGlvbnMgcnVuIGFnYWluc3QgdGhlIGVudGlyZSBzZXRcbiAgICAgIGlmICggcmF3ICkge1xuICAgICAgICBmbi5jYWxsKCBlbGVtcywgdmFsdWUgKTtcbiAgICAgICAgZm4gPSBudWxsO1xuXG4gICAgICAvLyAuLi5leGNlcHQgd2hlbiBleGVjdXRpbmcgZnVuY3Rpb24gdmFsdWVzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWxrID0gZm47XG4gICAgICAgIGZuID0gZnVuY3Rpb24oIGVsZW0sIGtleSwgdmFsdWUgKSB7XG4gICAgICAgICAgcmV0dXJuIGJ1bGsuY2FsbCggalF1ZXJ5KCBlbGVtICksIHZhbHVlICk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCBmbiApIHtcbiAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgICBmbiggZWxlbXNbaV0sIGtleSwgcmF3ID8gdmFsdWUgOiB2YWx1ZS5jYWxsKCBlbGVtc1tpXSwgaSwgZm4oIGVsZW1zW2ldLCBrZXkgKSApICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNoYWluYWJsZSA/XG4gICAgZWxlbXMgOlxuXG4gICAgLy8gR2V0c1xuICAgIGJ1bGsgP1xuICAgICAgZm4uY2FsbCggZWxlbXMgKSA6XG4gICAgICBsZW5ndGggPyBmbiggZWxlbXNbMF0sIGtleSApIDogZW1wdHlHZXQ7XG59O1xudmFyIHJjaGVja2FibGVUeXBlID0gKC9eKD86Y2hlY2tib3h8cmFkaW8pJC9pKTtcblxuXG5cbihmdW5jdGlvbigpIHtcbiAgLy8gTWluaWZpZWQ6IHZhciBhLGIsY1xuICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKSxcbiAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICksXG4gICAgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgLy8gU2V0dXBcbiAgZGl2LmlubmVySFRNTCA9IFwiICA8bGluay8+PHRhYmxlPjwvdGFibGU+PGEgaHJlZj0nL2EnPmE8L2E+PGlucHV0IHR5cGU9J2NoZWNrYm94Jy8+XCI7XG5cbiAgLy8gSUUgc3RyaXBzIGxlYWRpbmcgd2hpdGVzcGFjZSB3aGVuIC5pbm5lckhUTUwgaXMgdXNlZFxuICBzdXBwb3J0LmxlYWRpbmdXaGl0ZXNwYWNlID0gZGl2LmZpcnN0Q2hpbGQubm9kZVR5cGUgPT09IDM7XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGJvZHkgZWxlbWVudHMgYXJlbid0IGF1dG9tYXRpY2FsbHkgaW5zZXJ0ZWRcbiAgLy8gSUUgd2lsbCBpbnNlcnQgdGhlbSBpbnRvIGVtcHR5IHRhYmxlc1xuICBzdXBwb3J0LnRib2R5ID0gIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJ0Ym9keVwiICkubGVuZ3RoO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IGxpbmsgZWxlbWVudHMgZ2V0IHNlcmlhbGl6ZWQgY29ycmVjdGx5IGJ5IGlubmVySFRNTFxuICAvLyBUaGlzIHJlcXVpcmVzIGEgd3JhcHBlciBlbGVtZW50IGluIElFXG4gIHN1cHBvcnQuaHRtbFNlcmlhbGl6ZSA9ICEhZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImxpbmtcIiApLmxlbmd0aDtcblxuICAvLyBNYWtlcyBzdXJlIGNsb25pbmcgYW4gaHRtbDUgZWxlbWVudCBkb2VzIG5vdCBjYXVzZSBwcm9ibGVtc1xuICAvLyBXaGVyZSBvdXRlckhUTUwgaXMgdW5kZWZpbmVkLCB0aGlzIHN0aWxsIHdvcmtzXG4gIHN1cHBvcnQuaHRtbDVDbG9uZSA9XG4gICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJuYXZcIiApLmNsb25lTm9kZSggdHJ1ZSApLm91dGVySFRNTCAhPT0gXCI8Om5hdj48LzpuYXY+XCI7XG5cbiAgLy8gQ2hlY2sgaWYgYSBkaXNjb25uZWN0ZWQgY2hlY2tib3ggd2lsbCByZXRhaW4gaXRzIGNoZWNrZWRcbiAgLy8gdmFsdWUgb2YgdHJ1ZSBhZnRlciBhcHBlbmRlZCB0byB0aGUgRE9NIChJRTYvNylcbiAgaW5wdXQudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgaW5wdXQuY2hlY2tlZCA9IHRydWU7XG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKCBpbnB1dCApO1xuICBzdXBwb3J0LmFwcGVuZENoZWNrZWQgPSBpbnB1dC5jaGVja2VkO1xuXG4gIC8vIE1ha2Ugc3VyZSB0ZXh0YXJlYSAoYW5kIGNoZWNrYm94KSBkZWZhdWx0VmFsdWUgaXMgcHJvcGVybHkgY2xvbmVkXG4gIC8vIFN1cHBvcnQ6IElFNi1JRTExK1xuICBkaXYuaW5uZXJIVE1MID0gXCI8dGV4dGFyZWE+eDwvdGV4dGFyZWE+XCI7XG4gIHN1cHBvcnQubm9DbG9uZUNoZWNrZWQgPSAhIWRpdi5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuZGVmYXVsdFZhbHVlO1xuXG4gIC8vICMxMTIxNyAtIFdlYktpdCBsb3NlcyBjaGVjayB3aGVuIHRoZSBuYW1lIGlzIGFmdGVyIHRoZSBjaGVja2VkIGF0dHJpYnV0ZVxuICBmcmFnbWVudC5hcHBlbmRDaGlsZCggZGl2ICk7XG4gIGRpdi5pbm5lckhUTUwgPSBcIjxpbnB1dCB0eXBlPSdyYWRpbycgY2hlY2tlZD0nY2hlY2tlZCcgbmFtZT0ndCcvPlwiO1xuXG4gIC8vIFN1cHBvcnQ6IFNhZmFyaSA1LjEsIGlPUyA1LjEsIEFuZHJvaWQgNC54LCBBbmRyb2lkIDIuM1xuICAvLyBvbGQgV2ViS2l0IGRvZXNuJ3QgY2xvbmUgY2hlY2tlZCBzdGF0ZSBjb3JyZWN0bHkgaW4gZnJhZ21lbnRzXG4gIHN1cHBvcnQuY2hlY2tDbG9uZSA9IGRpdi5jbG9uZU5vZGUoIHRydWUgKS5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuY2hlY2tlZDtcblxuICAvLyBTdXBwb3J0OiBJRTw5XG4gIC8vIE9wZXJhIGRvZXMgbm90IGNsb25lIGV2ZW50cyAoYW5kIHR5cGVvZiBkaXYuYXR0YWNoRXZlbnQgPT09IHVuZGVmaW5lZCkuXG4gIC8vIElFOS0xMCBjbG9uZXMgZXZlbnRzIGJvdW5kIHZpYSBhdHRhY2hFdmVudCwgYnV0IHRoZXkgZG9uJ3QgdHJpZ2dlciB3aXRoIC5jbGljaygpXG4gIHN1cHBvcnQubm9DbG9uZUV2ZW50ID0gdHJ1ZTtcbiAgaWYgKCBkaXYuYXR0YWNoRXZlbnQgKSB7XG4gICAgZGl2LmF0dGFjaEV2ZW50KCBcIm9uY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBzdXBwb3J0Lm5vQ2xvbmVFdmVudCA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgZGl2LmNsb25lTm9kZSggdHJ1ZSApLmNsaWNrKCk7XG4gIH1cblxuICAvLyBFeGVjdXRlIHRoZSB0ZXN0IG9ubHkgaWYgbm90IGFscmVhZHkgZXhlY3V0ZWQgaW4gYW5vdGhlciBtb2R1bGUuXG4gIGlmIChzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPT0gbnVsbCkge1xuICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBkZWxldGUgZGl2LnRlc3Q7XG4gICAgfSBjYXRjaCggZSApIHtcbiAgICAgIHN1cHBvcnQuZGVsZXRlRXhwYW5kbyA9IGZhbHNlO1xuICAgIH1cbiAgfVxufSkoKTtcblxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBpLCBldmVudE5hbWUsXG4gICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuXG4gIC8vIFN1cHBvcnQ6IElFPDkgKGxhY2sgc3VibWl0L2NoYW5nZSBidWJibGUpLCBGaXJlZm94IDIzKyAobGFjayBmb2N1c2luIGV2ZW50KVxuICBmb3IgKCBpIGluIHsgc3VibWl0OiB0cnVlLCBjaGFuZ2U6IHRydWUsIGZvY3VzaW46IHRydWUgfSkge1xuICAgIGV2ZW50TmFtZSA9IFwib25cIiArIGk7XG5cbiAgICBpZiAoICEoc3VwcG9ydFsgaSArIFwiQnViYmxlc1wiIF0gPSBldmVudE5hbWUgaW4gd2luZG93KSApIHtcbiAgICAgIC8vIEJld2FyZSBvZiBDU1AgcmVzdHJpY3Rpb25zIChodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9TZWN1cml0eS9DU1ApXG4gICAgICBkaXYuc2V0QXR0cmlidXRlKCBldmVudE5hbWUsIFwidFwiICk7XG4gICAgICBzdXBwb3J0WyBpICsgXCJCdWJibGVzXCIgXSA9IGRpdi5hdHRyaWJ1dGVzWyBldmVudE5hbWUgXS5leHBhbmRvID09PSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBOdWxsIGVsZW1lbnRzIHRvIGF2b2lkIGxlYWtzIGluIElFLlxuICBkaXYgPSBudWxsO1xufSkoKTtcblxuXG52YXIgcmZvcm1FbGVtcyA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhKSQvaSxcbiAgcmtleUV2ZW50ID0gL15rZXkvLFxuICBybW91c2VFdmVudCA9IC9eKD86bW91c2V8cG9pbnRlcnxjb250ZXh0bWVudSl8Y2xpY2svLFxuICByZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLyxcbiAgcnR5cGVuYW1lc3BhY2UgPSAvXihbXi5dKikoPzpcXC4oLispfCkkLztcblxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJldHVybkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNhZmVBY3RpdmVFbGVtZW50KCkge1xuICB0cnkge1xuICAgIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICB9IGNhdGNoICggZXJyICkgeyB9XG59XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBtYW5hZ2luZyBldmVudHMgLS0gbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG4gKiBQcm9wcyB0byBEZWFuIEVkd2FyZHMnIGFkZEV2ZW50IGxpYnJhcnkgZm9yIG1hbnkgb2YgdGhlIGlkZWFzLlxuICovXG5qUXVlcnkuZXZlbnQgPSB7XG5cbiAgZ2xvYmFsOiB7fSxcblxuICBhZGQ6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IgKSB7XG4gICAgdmFyIHRtcCwgZXZlbnRzLCB0LCBoYW5kbGVPYmpJbixcbiAgICAgIHNwZWNpYWwsIGV2ZW50SGFuZGxlLCBoYW5kbGVPYmosXG4gICAgICBoYW5kbGVycywgdHlwZSwgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXG4gICAgICBlbGVtRGF0YSA9IGpRdWVyeS5fZGF0YSggZWxlbSApO1xuXG4gICAgLy8gRG9uJ3QgYXR0YWNoIGV2ZW50cyB0byBub0RhdGEgb3IgdGV4dC9jb21tZW50IG5vZGVzIChidXQgYWxsb3cgcGxhaW4gb2JqZWN0cylcbiAgICBpZiAoICFlbGVtRGF0YSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYW4gb2JqZWN0IG9mIGN1c3RvbSBkYXRhIGluIGxpZXUgb2YgdGhlIGhhbmRsZXJcbiAgICBpZiAoIGhhbmRsZXIuaGFuZGxlciApIHtcbiAgICAgIGhhbmRsZU9iakluID0gaGFuZGxlcjtcbiAgICAgIGhhbmRsZXIgPSBoYW5kbGVPYmpJbi5oYW5kbGVyO1xuICAgICAgc2VsZWN0b3IgPSBoYW5kbGVPYmpJbi5zZWxlY3RvcjtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgaGFuZGxlciBoYXMgYSB1bmlxdWUgSUQsIHVzZWQgdG8gZmluZC9yZW1vdmUgaXQgbGF0ZXJcbiAgICBpZiAoICFoYW5kbGVyLmd1aWQgKSB7XG4gICAgICBoYW5kbGVyLmd1aWQgPSBqUXVlcnkuZ3VpZCsrO1xuICAgIH1cblxuICAgIC8vIEluaXQgdGhlIGVsZW1lbnQncyBldmVudCBzdHJ1Y3R1cmUgYW5kIG1haW4gaGFuZGxlciwgaWYgdGhpcyBpcyB0aGUgZmlyc3RcbiAgICBpZiAoICEoZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzKSApIHtcbiAgICAgIGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyA9IHt9O1xuICAgIH1cbiAgICBpZiAoICEoZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUpICkge1xuICAgICAgZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiggZSApIHtcbiAgICAgICAgLy8gRGlzY2FyZCB0aGUgc2Vjb25kIGV2ZW50IG9mIGEgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoKSBhbmRcbiAgICAgICAgLy8gd2hlbiBhbiBldmVudCBpcyBjYWxsZWQgYWZ0ZXIgYSBwYWdlIGhhcyB1bmxvYWRlZFxuICAgICAgICByZXR1cm4gdHlwZW9mIGpRdWVyeSAhPT0gc3RydW5kZWZpbmVkICYmICghZSB8fCBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICE9PSBlLnR5cGUpID9cbiAgICAgICAgICBqUXVlcnkuZXZlbnQuZGlzcGF0Y2guYXBwbHkoIGV2ZW50SGFuZGxlLmVsZW0sIGFyZ3VtZW50cyApIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICB9O1xuICAgICAgLy8gQWRkIGVsZW0gYXMgYSBwcm9wZXJ0eSBvZiB0aGUgaGFuZGxlIGZuIHRvIHByZXZlbnQgYSBtZW1vcnkgbGVhayB3aXRoIElFIG5vbi1uYXRpdmUgZXZlbnRzXG4gICAgICBldmVudEhhbmRsZS5lbGVtID0gZWxlbTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbXVsdGlwbGUgZXZlbnRzIHNlcGFyYXRlZCBieSBhIHNwYWNlXG4gICAgdHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgWyBcIlwiIF07XG4gICAgdCA9IHR5cGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoIHQtLSApIHtcbiAgICAgIHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzW3RdICkgfHwgW107XG4gICAgICB0eXBlID0gb3JpZ1R5cGUgPSB0bXBbMV07XG4gICAgICBuYW1lc3BhY2VzID0gKCB0bXBbMl0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuICAgICAgLy8gVGhlcmUgKm11c3QqIGJlIGEgdHlwZSwgbm8gYXR0YWNoaW5nIG5hbWVzcGFjZS1vbmx5IGhhbmRsZXJzXG4gICAgICBpZiAoICF0eXBlICkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgZXZlbnQgY2hhbmdlcyBpdHMgdHlwZSwgdXNlIHRoZSBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgY2hhbmdlZCB0eXBlXG4gICAgICBzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuICAgICAgLy8gSWYgc2VsZWN0b3IgZGVmaW5lZCwgZGV0ZXJtaW5lIHNwZWNpYWwgZXZlbnQgYXBpIHR5cGUsIG90aGVyd2lzZSBnaXZlbiB0eXBlXG4gICAgICB0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG5cbiAgICAgIC8vIFVwZGF0ZSBzcGVjaWFsIGJhc2VkIG9uIG5ld2x5IHJlc2V0IHR5cGVcbiAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG4gICAgICAvLyBoYW5kbGVPYmogaXMgcGFzc2VkIHRvIGFsbCBldmVudCBoYW5kbGVyc1xuICAgICAgaGFuZGxlT2JqID0galF1ZXJ5LmV4dGVuZCh7XG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIG9yaWdUeXBlOiBvcmlnVHlwZSxcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgZ3VpZDogaGFuZGxlci5ndWlkLFxuICAgICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICAgIG5lZWRzQ29udGV4dDogc2VsZWN0b3IgJiYgalF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICksXG4gICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlcy5qb2luKFwiLlwiKVxuICAgICAgfSwgaGFuZGxlT2JqSW4gKTtcblxuICAgICAgLy8gSW5pdCB0aGUgZXZlbnQgaGFuZGxlciBxdWV1ZSBpZiB3ZSdyZSB0aGUgZmlyc3RcbiAgICAgIGlmICggIShoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdKSApIHtcbiAgICAgICAgaGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSA9IFtdO1xuICAgICAgICBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50ID0gMDtcblxuICAgICAgICAvLyBPbmx5IHVzZSBhZGRFdmVudExpc3RlbmVyL2F0dGFjaEV2ZW50IGlmIHRoZSBzcGVjaWFsIGV2ZW50cyBoYW5kbGVyIHJldHVybnMgZmFsc2VcbiAgICAgICAgaWYgKCAhc3BlY2lhbC5zZXR1cCB8fCBzcGVjaWFsLnNldHVwLmNhbGwoIGVsZW0sIGRhdGEsIG5hbWVzcGFjZXMsIGV2ZW50SGFuZGxlICkgPT09IGZhbHNlICkge1xuICAgICAgICAgIC8vIEJpbmQgdGhlIGdsb2JhbCBldmVudCBoYW5kbGVyIHRvIHRoZSBlbGVtZW50XG4gICAgICAgICAgaWYgKCBlbGVtLmFkZEV2ZW50TGlzdGVuZXIgKSB7XG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoIHR5cGUsIGV2ZW50SGFuZGxlLCBmYWxzZSApO1xuXG4gICAgICAgICAgfSBlbHNlIGlmICggZWxlbS5hdHRhY2hFdmVudCApIHtcbiAgICAgICAgICAgIGVsZW0uYXR0YWNoRXZlbnQoIFwib25cIiArIHR5cGUsIGV2ZW50SGFuZGxlICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICggc3BlY2lhbC5hZGQgKSB7XG4gICAgICAgIHNwZWNpYWwuYWRkLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXG4gICAgICAgIGlmICggIWhhbmRsZU9iai5oYW5kbGVyLmd1aWQgKSB7XG4gICAgICAgICAgaGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCA9IGhhbmRsZXIuZ3VpZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBZGQgdG8gdGhlIGVsZW1lbnQncyBoYW5kbGVyIGxpc3QsIGRlbGVnYXRlcyBpbiBmcm9udFxuICAgICAgaWYgKCBzZWxlY3RvciApIHtcbiAgICAgICAgaGFuZGxlcnMuc3BsaWNlKCBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50KyssIDAsIGhhbmRsZU9iaiApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG4gICAgICB9XG5cbiAgICAgIC8vIEtlZXAgdHJhY2sgb2Ygd2hpY2ggZXZlbnRzIGhhdmUgZXZlciBiZWVuIHVzZWQsIGZvciBldmVudCBvcHRpbWl6YXRpb25cbiAgICAgIGpRdWVyeS5ldmVudC5nbG9iYWxbIHR5cGUgXSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gTnVsbGlmeSBlbGVtIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzIGluIElFXG4gICAgZWxlbSA9IG51bGw7XG4gIH0sXG5cbiAgLy8gRGV0YWNoIGFuIGV2ZW50IG9yIHNldCBvZiBldmVudHMgZnJvbSBhbiBlbGVtZW50XG4gIHJlbW92ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBzZWxlY3RvciwgbWFwcGVkVHlwZXMgKSB7XG4gICAgdmFyIGosIGhhbmRsZU9iaiwgdG1wLFxuICAgICAgb3JpZ0NvdW50LCB0LCBldmVudHMsXG4gICAgICBzcGVjaWFsLCBoYW5kbGVycywgdHlwZSxcbiAgICAgIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuICAgICAgZWxlbURhdGEgPSBqUXVlcnkuaGFzRGF0YSggZWxlbSApICYmIGpRdWVyeS5fZGF0YSggZWxlbSApO1xuXG4gICAgaWYgKCAhZWxlbURhdGEgfHwgIShldmVudHMgPSBlbGVtRGF0YS5ldmVudHMpICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE9uY2UgZm9yIGVhY2ggdHlwZS5uYW1lc3BhY2UgaW4gdHlwZXM7IHR5cGUgbWF5IGJlIG9taXR0ZWRcbiAgICB0eXBlcyA9ICggdHlwZXMgfHwgXCJcIiApLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbIFwiXCIgXTtcbiAgICB0ID0gdHlwZXMubGVuZ3RoO1xuICAgIHdoaWxlICggdC0tICkge1xuICAgICAgdG1wID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbdF0gKSB8fCBbXTtcbiAgICAgIHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsxXTtcbiAgICAgIG5hbWVzcGFjZXMgPSAoIHRtcFsyXSB8fCBcIlwiICkuc3BsaXQoIFwiLlwiICkuc29ydCgpO1xuXG4gICAgICAvLyBVbmJpbmQgYWxsIGV2ZW50cyAob24gdGhpcyBuYW1lc3BhY2UsIGlmIHByb3ZpZGVkKSBmb3IgdGhlIGVsZW1lbnRcbiAgICAgIGlmICggIXR5cGUgKSB7XG4gICAgICAgIGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuICAgICAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKyB0eXBlc1sgdCBdLCBoYW5kbGVyLCBzZWxlY3RvciwgdHJ1ZSApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcbiAgICAgIHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcbiAgICAgIGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gfHwgW107XG4gICAgICB0bXAgPSB0bXBbMl0gJiYgbmV3IFJlZ0V4cCggXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpICsgXCIoXFxcXC58JClcIiApO1xuXG4gICAgICAvLyBSZW1vdmUgbWF0Y2hpbmcgZXZlbnRzXG4gICAgICBvcmlnQ291bnQgPSBqID0gaGFuZGxlcnMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCBqLS0gKSB7XG4gICAgICAgIGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBqIF07XG5cbiAgICAgICAgaWYgKCAoIG1hcHBlZFR5cGVzIHx8IG9yaWdUeXBlID09PSBoYW5kbGVPYmoub3JpZ1R5cGUgKSAmJlxuICAgICAgICAgICggIWhhbmRsZXIgfHwgaGFuZGxlci5ndWlkID09PSBoYW5kbGVPYmouZ3VpZCApICYmXG4gICAgICAgICAgKCAhdG1wIHx8IHRtcC50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSAmJlxuICAgICAgICAgICggIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBoYW5kbGVPYmouc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IFwiKipcIiAmJiBoYW5kbGVPYmouc2VsZWN0b3IgKSApIHtcbiAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoIGosIDEgKTtcblxuICAgICAgICAgIGlmICggaGFuZGxlT2JqLnNlbGVjdG9yICkge1xuICAgICAgICAgICAgaGFuZGxlcnMuZGVsZWdhdGVDb3VudC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHNwZWNpYWwucmVtb3ZlICkge1xuICAgICAgICAgICAgc3BlY2lhbC5yZW1vdmUuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZSBnZW5lcmljIGV2ZW50IGhhbmRsZXIgaWYgd2UgcmVtb3ZlZCBzb21ldGhpbmcgYW5kIG5vIG1vcmUgaGFuZGxlcnMgZXhpc3RcbiAgICAgIC8vIChhdm9pZHMgcG90ZW50aWFsIGZvciBlbmRsZXNzIHJlY3Vyc2lvbiBkdXJpbmcgcmVtb3ZhbCBvZiBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzKVxuICAgICAgaWYgKCBvcmlnQ291bnQgJiYgIWhhbmRsZXJzLmxlbmd0aCApIHtcbiAgICAgICAgaWYgKCAhc3BlY2lhbC50ZWFyZG93biB8fCBzcGVjaWFsLnRlYXJkb3duLmNhbGwoIGVsZW0sIG5hbWVzcGFjZXMsIGVsZW1EYXRhLmhhbmRsZSApID09PSBmYWxzZSApIHtcbiAgICAgICAgICBqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGVsZW1EYXRhLmhhbmRsZSApO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGV2ZW50c1sgdHlwZSBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0aGUgZXhwYW5kbyBpZiBpdCdzIG5vIGxvbmdlciB1c2VkXG4gICAgaWYgKCBqUXVlcnkuaXNFbXB0eU9iamVjdCggZXZlbnRzICkgKSB7XG4gICAgICBkZWxldGUgZWxlbURhdGEuaGFuZGxlO1xuXG4gICAgICAvLyByZW1vdmVEYXRhIGFsc28gY2hlY2tzIGZvciBlbXB0aW5lc3MgYW5kIGNsZWFycyB0aGUgZXhwYW5kbyBpZiBlbXB0eVxuICAgICAgLy8gc28gdXNlIGl0IGluc3RlYWQgb2YgZGVsZXRlXG4gICAgICBqUXVlcnkuX3JlbW92ZURhdGEoIGVsZW0sIFwiZXZlbnRzXCIgKTtcbiAgICB9XG4gIH0sXG5cbiAgdHJpZ2dlcjogZnVuY3Rpb24oIGV2ZW50LCBkYXRhLCBlbGVtLCBvbmx5SGFuZGxlcnMgKSB7XG4gICAgdmFyIGhhbmRsZSwgb250eXBlLCBjdXIsXG4gICAgICBidWJibGVUeXBlLCBzcGVjaWFsLCB0bXAsIGksXG4gICAgICBldmVudFBhdGggPSBbIGVsZW0gfHwgZG9jdW1lbnQgXSxcbiAgICAgIHR5cGUgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwidHlwZVwiICkgPyBldmVudC50eXBlIDogZXZlbnQsXG4gICAgICBuYW1lc3BhY2VzID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcIm5hbWVzcGFjZVwiICkgPyBldmVudC5uYW1lc3BhY2Uuc3BsaXQoXCIuXCIpIDogW107XG5cbiAgICBjdXIgPSB0bXAgPSBlbGVtID0gZWxlbSB8fCBkb2N1bWVudDtcblxuICAgIC8vIERvbid0IGRvIGV2ZW50cyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG4gICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XG4gICAgaWYgKCByZm9jdXNNb3JwaC50ZXN0KCB0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCApICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICggdHlwZS5pbmRleE9mKFwiLlwiKSA+PSAwICkge1xuICAgICAgLy8gTmFtZXNwYWNlZCB0cmlnZ2VyOyBjcmVhdGUgYSByZWdleHAgdG8gbWF0Y2ggZXZlbnQgdHlwZSBpbiBoYW5kbGUoKVxuICAgICAgbmFtZXNwYWNlcyA9IHR5cGUuc3BsaXQoXCIuXCIpO1xuICAgICAgdHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcbiAgICAgIG5hbWVzcGFjZXMuc29ydCgpO1xuICAgIH1cbiAgICBvbnR5cGUgPSB0eXBlLmluZGV4T2YoXCI6XCIpIDwgMCAmJiBcIm9uXCIgKyB0eXBlO1xuXG4gICAgLy8gQ2FsbGVyIGNhbiBwYXNzIGluIGEgalF1ZXJ5LkV2ZW50IG9iamVjdCwgT2JqZWN0LCBvciBqdXN0IGFuIGV2ZW50IHR5cGUgc3RyaW5nXG4gICAgZXZlbnQgPSBldmVudFsgalF1ZXJ5LmV4cGFuZG8gXSA/XG4gICAgICBldmVudCA6XG4gICAgICBuZXcgalF1ZXJ5LkV2ZW50KCB0eXBlLCB0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIgJiYgZXZlbnQgKTtcblxuICAgIC8vIFRyaWdnZXIgYml0bWFzazogJiAxIGZvciBuYXRpdmUgaGFuZGxlcnM7ICYgMiBmb3IgalF1ZXJ5IChhbHdheXMgdHJ1ZSlcbiAgICBldmVudC5pc1RyaWdnZXIgPSBvbmx5SGFuZGxlcnMgPyAyIDogMztcbiAgICBldmVudC5uYW1lc3BhY2UgPSBuYW1lc3BhY2VzLmpvaW4oXCIuXCIpO1xuICAgIGV2ZW50Lm5hbWVzcGFjZV9yZSA9IGV2ZW50Lm5hbWVzcGFjZSA/XG4gICAgICBuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKFwiXFxcXC4oPzouKlxcXFwufClcIikgKyBcIihcXFxcLnwkKVwiICkgOlxuICAgICAgbnVsbDtcblxuICAgIC8vIENsZWFuIHVwIHRoZSBldmVudCBpbiBjYXNlIGl0IGlzIGJlaW5nIHJldXNlZFxuICAgIGV2ZW50LnJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoICFldmVudC50YXJnZXQgKSB7XG4gICAgICBldmVudC50YXJnZXQgPSBlbGVtO1xuICAgIH1cblxuICAgIC8vIENsb25lIGFueSBpbmNvbWluZyBkYXRhIGFuZCBwcmVwZW5kIHRoZSBldmVudCwgY3JlYXRpbmcgdGhlIGhhbmRsZXIgYXJnIGxpc3RcbiAgICBkYXRhID0gZGF0YSA9PSBudWxsID9cbiAgICAgIFsgZXZlbnQgXSA6XG4gICAgICBqUXVlcnkubWFrZUFycmF5KCBkYXRhLCBbIGV2ZW50IF0gKTtcblxuICAgIC8vIEFsbG93IHNwZWNpYWwgZXZlbnRzIHRvIGRyYXcgb3V0c2lkZSB0aGUgbGluZXNcbiAgICBzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcbiAgICBpZiAoICFvbmx5SGFuZGxlcnMgJiYgc3BlY2lhbC50cmlnZ2VyICYmIHNwZWNpYWwudHJpZ2dlci5hcHBseSggZWxlbSwgZGF0YSApID09PSBmYWxzZSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgZXZlbnQgcHJvcGFnYXRpb24gcGF0aCBpbiBhZHZhbmNlLCBwZXIgVzNDIGV2ZW50cyBzcGVjICgjOTk1MSlcbiAgICAvLyBCdWJibGUgdXAgdG8gZG9jdW1lbnQsIHRoZW4gdG8gd2luZG93OyB3YXRjaCBmb3IgYSBnbG9iYWwgb3duZXJEb2N1bWVudCB2YXIgKCM5NzI0KVxuICAgIGlmICggIW9ubHlIYW5kbGVycyAmJiAhc3BlY2lhbC5ub0J1YmJsZSAmJiAhalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cbiAgICAgIGJ1YmJsZVR5cGUgPSBzcGVjaWFsLmRlbGVnYXRlVHlwZSB8fCB0eXBlO1xuICAgICAgaWYgKCAhcmZvY3VzTW9ycGgudGVzdCggYnViYmxlVHlwZSArIHR5cGUgKSApIHtcbiAgICAgICAgY3VyID0gY3VyLnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgICBmb3IgKCA7IGN1cjsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XG4gICAgICAgIGV2ZW50UGF0aC5wdXNoKCBjdXIgKTtcbiAgICAgICAgdG1wID0gY3VyO1xuICAgICAgfVxuXG4gICAgICAvLyBPbmx5IGFkZCB3aW5kb3cgaWYgd2UgZ290IHRvIGRvY3VtZW50IChlLmcuLCBub3QgcGxhaW4gb2JqIG9yIGRldGFjaGVkIERPTSlcbiAgICAgIGlmICggdG1wID09PSAoZWxlbS5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50KSApIHtcbiAgICAgICAgZXZlbnRQYXRoLnB1c2goIHRtcC5kZWZhdWx0VmlldyB8fCB0bXAucGFyZW50V2luZG93IHx8IHdpbmRvdyApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZpcmUgaGFuZGxlcnMgb24gdGhlIGV2ZW50IHBhdGhcbiAgICBpID0gMDtcbiAgICB3aGlsZSAoIChjdXIgPSBldmVudFBhdGhbaSsrXSkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cbiAgICAgIGV2ZW50LnR5cGUgPSBpID4gMSA/XG4gICAgICAgIGJ1YmJsZVR5cGUgOlxuICAgICAgICBzcGVjaWFsLmJpbmRUeXBlIHx8IHR5cGU7XG5cbiAgICAgIC8vIGpRdWVyeSBoYW5kbGVyXG4gICAgICBoYW5kbGUgPSAoIGpRdWVyeS5fZGF0YSggY3VyLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdICYmIGpRdWVyeS5fZGF0YSggY3VyLCBcImhhbmRsZVwiICk7XG4gICAgICBpZiAoIGhhbmRsZSApIHtcbiAgICAgICAgaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcbiAgICAgIH1cblxuICAgICAgLy8gTmF0aXZlIGhhbmRsZXJcbiAgICAgIGhhbmRsZSA9IG9udHlwZSAmJiBjdXJbIG9udHlwZSBdO1xuICAgICAgaWYgKCBoYW5kbGUgJiYgaGFuZGxlLmFwcGx5ICYmIGpRdWVyeS5hY2NlcHREYXRhKCBjdXIgKSApIHtcbiAgICAgICAgZXZlbnQucmVzdWx0ID0gaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcbiAgICAgICAgaWYgKCBldmVudC5yZXN1bHQgPT09IGZhbHNlICkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZXZlbnQudHlwZSA9IHR5cGU7XG5cbiAgICAvLyBJZiBub2JvZHkgcHJldmVudGVkIHRoZSBkZWZhdWx0IGFjdGlvbiwgZG8gaXQgbm93XG4gICAgaWYgKCAhb25seUhhbmRsZXJzICYmICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblxuICAgICAgaWYgKCAoIXNwZWNpYWwuX2RlZmF1bHQgfHwgc3BlY2lhbC5fZGVmYXVsdC5hcHBseSggZXZlbnRQYXRoLnBvcCgpLCBkYXRhICkgPT09IGZhbHNlKSAmJlxuICAgICAgICBqUXVlcnkuYWNjZXB0RGF0YSggZWxlbSApICkge1xuXG4gICAgICAgIC8vIENhbGwgYSBuYXRpdmUgRE9NIG1ldGhvZCBvbiB0aGUgdGFyZ2V0IHdpdGggdGhlIHNhbWUgbmFtZSBuYW1lIGFzIHRoZSBldmVudC5cbiAgICAgICAgLy8gQ2FuJ3QgdXNlIGFuIC5pc0Z1bmN0aW9uKCkgY2hlY2sgaGVyZSBiZWNhdXNlIElFNi83IGZhaWxzIHRoYXQgdGVzdC5cbiAgICAgICAgLy8gRG9uJ3QgZG8gZGVmYXVsdCBhY3Rpb25zIG9uIHdpbmRvdywgdGhhdCdzIHdoZXJlIGdsb2JhbCB2YXJpYWJsZXMgYmUgKCM2MTcwKVxuICAgICAgICBpZiAoIG9udHlwZSAmJiBlbGVtWyB0eXBlIF0gJiYgIWpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG4gICAgICAgICAgLy8gRG9uJ3QgcmUtdHJpZ2dlciBhbiBvbkZPTyBldmVudCB3aGVuIHdlIGNhbGwgaXRzIEZPTygpIG1ldGhvZFxuICAgICAgICAgIHRtcCA9IGVsZW1bIG9udHlwZSBdO1xuXG4gICAgICAgICAgaWYgKCB0bXAgKSB7XG4gICAgICAgICAgICBlbGVtWyBvbnR5cGUgXSA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUHJldmVudCByZS10cmlnZ2VyaW5nIG9mIHRoZSBzYW1lIGV2ZW50LCBzaW5jZSB3ZSBhbHJlYWR5IGJ1YmJsZWQgaXQgYWJvdmVcbiAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkID0gdHlwZTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWxlbVsgdHlwZSBdKCk7XG4gICAgICAgICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICAgICAgICAvLyBJRTw5IGRpZXMgb24gZm9jdXMvYmx1ciB0byBoaWRkZW4gZWxlbWVudCAoIzE0ODYsIzEyNTE4KVxuICAgICAgICAgICAgLy8gb25seSByZXByb2R1Y2libGUgb24gd2luWFAgSUU4IG5hdGl2ZSwgbm90IElFOSBpbiBJRTggbW9kZVxuICAgICAgICAgIH1cbiAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgaWYgKCB0bXAgKSB7XG4gICAgICAgICAgICBlbGVtWyBvbnR5cGUgXSA9IHRtcDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnQucmVzdWx0O1xuICB9LFxuXG4gIGRpc3BhdGNoOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cbiAgICAvLyBNYWtlIGEgd3JpdGFibGUgalF1ZXJ5LkV2ZW50IGZyb20gdGhlIG5hdGl2ZSBldmVudCBvYmplY3RcbiAgICBldmVudCA9IGpRdWVyeS5ldmVudC5maXgoIGV2ZW50ICk7XG5cbiAgICB2YXIgaSwgcmV0LCBoYW5kbGVPYmosIG1hdGNoZWQsIGosXG4gICAgICBoYW5kbGVyUXVldWUgPSBbXSxcbiAgICAgIGFyZ3MgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcbiAgICAgIGhhbmRsZXJzID0gKCBqUXVlcnkuX2RhdGEoIHRoaXMsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gfHwgW10sXG4gICAgICBzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGV2ZW50LnR5cGUgXSB8fCB7fTtcblxuICAgIC8vIFVzZSB0aGUgZml4LWVkIGpRdWVyeS5FdmVudCByYXRoZXIgdGhhbiB0aGUgKHJlYWQtb25seSkgbmF0aXZlIGV2ZW50XG4gICAgYXJnc1swXSA9IGV2ZW50O1xuICAgIGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gdGhpcztcblxuICAgIC8vIENhbGwgdGhlIHByZURpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZSwgYW5kIGxldCBpdCBiYWlsIGlmIGRlc2lyZWRcbiAgICBpZiAoIHNwZWNpYWwucHJlRGlzcGF0Y2ggJiYgc3BlY2lhbC5wcmVEaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApID09PSBmYWxzZSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgaGFuZGxlcnNcbiAgICBoYW5kbGVyUXVldWUgPSBqUXVlcnkuZXZlbnQuaGFuZGxlcnMuY2FsbCggdGhpcywgZXZlbnQsIGhhbmRsZXJzICk7XG5cbiAgICAvLyBSdW4gZGVsZWdhdGVzIGZpcnN0OyB0aGV5IG1heSB3YW50IHRvIHN0b3AgcHJvcGFnYXRpb24gYmVuZWF0aCB1c1xuICAgIGkgPSAwO1xuICAgIHdoaWxlICggKG1hdGNoZWQgPSBoYW5kbGVyUXVldWVbIGkrKyBdKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcbiAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBtYXRjaGVkLmVsZW07XG5cbiAgICAgIGogPSAwO1xuICAgICAgd2hpbGUgKCAoaGFuZGxlT2JqID0gbWF0Y2hlZC5oYW5kbGVyc1sgaisrIF0pICYmICFldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG4gICAgICAgIC8vIFRyaWdnZXJlZCBldmVudCBtdXN0IGVpdGhlciAxKSBoYXZlIG5vIG5hbWVzcGFjZSwgb3JcbiAgICAgICAgLy8gMikgaGF2ZSBuYW1lc3BhY2UocykgYSBzdWJzZXQgb3IgZXF1YWwgdG8gdGhvc2UgaW4gdGhlIGJvdW5kIGV2ZW50IChib3RoIGNhbiBoYXZlIG5vIG5hbWVzcGFjZSkuXG4gICAgICAgIGlmICggIWV2ZW50Lm5hbWVzcGFjZV9yZSB8fCBldmVudC5uYW1lc3BhY2VfcmUudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkge1xuXG4gICAgICAgICAgZXZlbnQuaGFuZGxlT2JqID0gaGFuZGxlT2JqO1xuICAgICAgICAgIGV2ZW50LmRhdGEgPSBoYW5kbGVPYmouZGF0YTtcblxuICAgICAgICAgIHJldCA9ICggKGpRdWVyeS5ldmVudC5zcGVjaWFsWyBoYW5kbGVPYmoub3JpZ1R5cGUgXSB8fCB7fSkuaGFuZGxlIHx8IGhhbmRsZU9iai5oYW5kbGVyIClcbiAgICAgICAgICAgICAgLmFwcGx5KCBtYXRjaGVkLmVsZW0sIGFyZ3MgKTtcblxuICAgICAgICAgIGlmICggcmV0ICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICBpZiAoIChldmVudC5yZXN1bHQgPSByZXQpID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2FsbCB0aGUgcG9zdERpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZVxuICAgIGlmICggc3BlY2lhbC5wb3N0RGlzcGF0Y2ggKSB7XG4gICAgICBzcGVjaWFsLnBvc3REaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApO1xuICAgIH1cblxuICAgIHJldHVybiBldmVudC5yZXN1bHQ7XG4gIH0sXG5cbiAgaGFuZGxlcnM6IGZ1bmN0aW9uKCBldmVudCwgaGFuZGxlcnMgKSB7XG4gICAgdmFyIHNlbCwgaGFuZGxlT2JqLCBtYXRjaGVzLCBpLFxuICAgICAgaGFuZGxlclF1ZXVlID0gW10sXG4gICAgICBkZWxlZ2F0ZUNvdW50ID0gaGFuZGxlcnMuZGVsZWdhdGVDb3VudCxcbiAgICAgIGN1ciA9IGV2ZW50LnRhcmdldDtcblxuICAgIC8vIEZpbmQgZGVsZWdhdGUgaGFuZGxlcnNcbiAgICAvLyBCbGFjay1ob2xlIFNWRyA8dXNlPiBpbnN0YW5jZSB0cmVlcyAoIzEzMTgwKVxuICAgIC8vIEF2b2lkIG5vbi1sZWZ0LWNsaWNrIGJ1YmJsaW5nIGluIEZpcmVmb3ggKCMzODYxKVxuICAgIGlmICggZGVsZWdhdGVDb3VudCAmJiBjdXIubm9kZVR5cGUgJiYgKCFldmVudC5idXR0b24gfHwgZXZlbnQudHlwZSAhPT0gXCJjbGlja1wiKSApIHtcblxuICAgICAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cbiAgICAgIGZvciAoIDsgY3VyICE9IHRoaXM7IGN1ciA9IGN1ci5wYXJlbnROb2RlIHx8IHRoaXMgKSB7XG4gICAgICAgIC8qIGpzaGludCBlcWVxZXE6IHRydWUgKi9cblxuICAgICAgICAvLyBEb24ndCBjaGVjayBub24tZWxlbWVudHMgKCMxMzIwOClcbiAgICAgICAgLy8gRG9uJ3QgcHJvY2VzcyBjbGlja3Mgb24gZGlzYWJsZWQgZWxlbWVudHMgKCM2OTExLCAjODE2NSwgIzExMzgyLCAjMTE3NjQpXG4gICAgICAgIGlmICggY3VyLm5vZGVUeXBlID09PSAxICYmIChjdXIuZGlzYWJsZWQgIT09IHRydWUgfHwgZXZlbnQudHlwZSAhPT0gXCJjbGlja1wiKSApIHtcbiAgICAgICAgICBtYXRjaGVzID0gW107XG4gICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBkZWxlZ2F0ZUNvdW50OyBpKysgKSB7XG4gICAgICAgICAgICBoYW5kbGVPYmogPSBoYW5kbGVyc1sgaSBdO1xuXG4gICAgICAgICAgICAvLyBEb24ndCBjb25mbGljdCB3aXRoIE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoIzEzMjAzKVxuICAgICAgICAgICAgc2VsID0gaGFuZGxlT2JqLnNlbGVjdG9yICsgXCIgXCI7XG5cbiAgICAgICAgICAgIGlmICggbWF0Y2hlc1sgc2VsIF0gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgbWF0Y2hlc1sgc2VsIF0gPSBoYW5kbGVPYmoubmVlZHNDb250ZXh0ID9cbiAgICAgICAgICAgICAgICBqUXVlcnkoIHNlbCwgdGhpcyApLmluZGV4KCBjdXIgKSA+PSAwIDpcbiAgICAgICAgICAgICAgICBqUXVlcnkuZmluZCggc2VsLCB0aGlzLCBudWxsLCBbIGN1ciBdICkubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCBtYXRjaGVzWyBzZWwgXSApIHtcbiAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKCBoYW5kbGVPYmogKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCBtYXRjaGVzLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGhhbmRsZXJRdWV1ZS5wdXNoKHsgZWxlbTogY3VyLCBoYW5kbGVyczogbWF0Y2hlcyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIHJlbWFpbmluZyAoZGlyZWN0bHktYm91bmQpIGhhbmRsZXJzXG4gICAgaWYgKCBkZWxlZ2F0ZUNvdW50IDwgaGFuZGxlcnMubGVuZ3RoICkge1xuICAgICAgaGFuZGxlclF1ZXVlLnB1c2goeyBlbGVtOiB0aGlzLCBoYW5kbGVyczogaGFuZGxlcnMuc2xpY2UoIGRlbGVnYXRlQ291bnQgKSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFuZGxlclF1ZXVlO1xuICB9LFxuXG4gIGZpeDogZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgIGlmICggZXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gKSB7XG4gICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGEgd3JpdGFibGUgY29weSBvZiB0aGUgZXZlbnQgb2JqZWN0IGFuZCBub3JtYWxpemUgc29tZSBwcm9wZXJ0aWVzXG4gICAgdmFyIGksIHByb3AsIGNvcHksXG4gICAgICB0eXBlID0gZXZlbnQudHlwZSxcbiAgICAgIG9yaWdpbmFsRXZlbnQgPSBldmVudCxcbiAgICAgIGZpeEhvb2sgPSB0aGlzLmZpeEhvb2tzWyB0eXBlIF07XG5cbiAgICBpZiAoICFmaXhIb29rICkge1xuICAgICAgdGhpcy5maXhIb29rc1sgdHlwZSBdID0gZml4SG9vayA9XG4gICAgICAgIHJtb3VzZUV2ZW50LnRlc3QoIHR5cGUgKSA/IHRoaXMubW91c2VIb29rcyA6XG4gICAgICAgIHJrZXlFdmVudC50ZXN0KCB0eXBlICkgPyB0aGlzLmtleUhvb2tzIDpcbiAgICAgICAge307XG4gICAgfVxuICAgIGNvcHkgPSBmaXhIb29rLnByb3BzID8gdGhpcy5wcm9wcy5jb25jYXQoIGZpeEhvb2sucHJvcHMgKSA6IHRoaXMucHJvcHM7XG5cbiAgICBldmVudCA9IG5ldyBqUXVlcnkuRXZlbnQoIG9yaWdpbmFsRXZlbnQgKTtcblxuICAgIGkgPSBjb3B5Lmxlbmd0aDtcbiAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgIHByb3AgPSBjb3B5WyBpIF07XG4gICAgICBldmVudFsgcHJvcCBdID0gb3JpZ2luYWxFdmVudFsgcHJvcCBdO1xuICAgIH1cblxuICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAvLyBGaXggdGFyZ2V0IHByb3BlcnR5ICgjMTkyNSlcbiAgICBpZiAoICFldmVudC50YXJnZXQgKSB7XG4gICAgICBldmVudC50YXJnZXQgPSBvcmlnaW5hbEV2ZW50LnNyY0VsZW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydDogQ2hyb21lIDIzKywgU2FmYXJpP1xuICAgIC8vIFRhcmdldCBzaG91bGQgbm90IGJlIGEgdGV4dCBub2RlICgjNTA0LCAjMTMxNDMpXG4gICAgaWYgKCBldmVudC50YXJnZXQubm9kZVR5cGUgPT09IDMgKSB7XG4gICAgICBldmVudC50YXJnZXQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgLy8gRm9yIG1vdXNlL2tleSBldmVudHMsIG1ldGFLZXk9PWZhbHNlIGlmIGl0J3MgdW5kZWZpbmVkICgjMzM2OCwgIzExMzI4KVxuICAgIGV2ZW50Lm1ldGFLZXkgPSAhIWV2ZW50Lm1ldGFLZXk7XG5cbiAgICByZXR1cm4gZml4SG9vay5maWx0ZXIgPyBmaXhIb29rLmZpbHRlciggZXZlbnQsIG9yaWdpbmFsRXZlbnQgKSA6IGV2ZW50O1xuICB9LFxuXG4gIC8vIEluY2x1ZGVzIHNvbWUgZXZlbnQgcHJvcHMgc2hhcmVkIGJ5IEtleUV2ZW50IGFuZCBNb3VzZUV2ZW50XG4gIHByb3BzOiBcImFsdEtleSBidWJibGVzIGNhbmNlbGFibGUgY3RybEtleSBjdXJyZW50VGFyZ2V0IGV2ZW50UGhhc2UgbWV0YUtleSByZWxhdGVkVGFyZ2V0IHNoaWZ0S2V5IHRhcmdldCB0aW1lU3RhbXAgdmlldyB3aGljaFwiLnNwbGl0KFwiIFwiKSxcblxuICBmaXhIb29rczoge30sXG5cbiAga2V5SG9va3M6IHtcbiAgICBwcm9wczogXCJjaGFyIGNoYXJDb2RlIGtleSBrZXlDb2RlXCIuc3BsaXQoXCIgXCIpLFxuICAgIGZpbHRlcjogZnVuY3Rpb24oIGV2ZW50LCBvcmlnaW5hbCApIHtcblxuICAgICAgLy8gQWRkIHdoaWNoIGZvciBrZXkgZXZlbnRzXG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09IG51bGwgKSB7XG4gICAgICAgIGV2ZW50LndoaWNoID0gb3JpZ2luYWwuY2hhckNvZGUgIT0gbnVsbCA/IG9yaWdpbmFsLmNoYXJDb2RlIDogb3JpZ2luYWwua2V5Q29kZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cbiAgfSxcblxuICBtb3VzZUhvb2tzOiB7XG4gICAgcHJvcHM6IFwiYnV0dG9uIGJ1dHRvbnMgY2xpZW50WCBjbGllbnRZIGZyb21FbGVtZW50IG9mZnNldFggb2Zmc2V0WSBwYWdlWCBwYWdlWSBzY3JlZW5YIHNjcmVlblkgdG9FbGVtZW50XCIuc3BsaXQoXCIgXCIpLFxuICAgIGZpbHRlcjogZnVuY3Rpb24oIGV2ZW50LCBvcmlnaW5hbCApIHtcbiAgICAgIHZhciBib2R5LCBldmVudERvYywgZG9jLFxuICAgICAgICBidXR0b24gPSBvcmlnaW5hbC5idXR0b24sXG4gICAgICAgIGZyb21FbGVtZW50ID0gb3JpZ2luYWwuZnJvbUVsZW1lbnQ7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBwYWdlWC9ZIGlmIG1pc3NpbmcgYW5kIGNsaWVudFgvWSBhdmFpbGFibGVcbiAgICAgIGlmICggZXZlbnQucGFnZVggPT0gbnVsbCAmJiBvcmlnaW5hbC5jbGllbnRYICE9IG51bGwgKSB7XG4gICAgICAgIGV2ZW50RG9jID0gZXZlbnQudGFyZ2V0Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIGRvYyA9IGV2ZW50RG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgYm9keSA9IGV2ZW50RG9jLmJvZHk7XG5cbiAgICAgICAgZXZlbnQucGFnZVggPSBvcmlnaW5hbC5jbGllbnRYICsgKCBkb2MgJiYgZG9jLnNjcm9sbExlZnQgfHwgYm9keSAmJiBib2R5LnNjcm9sbExlZnQgfHwgMCApIC0gKCBkb2MgJiYgZG9jLmNsaWVudExlZnQgfHwgYm9keSAmJiBib2R5LmNsaWVudExlZnQgfHwgMCApO1xuICAgICAgICBldmVudC5wYWdlWSA9IG9yaWdpbmFsLmNsaWVudFkgKyAoIGRvYyAmJiBkb2Muc2Nyb2xsVG9wICB8fCBib2R5ICYmIGJvZHkuc2Nyb2xsVG9wICB8fCAwICkgLSAoIGRvYyAmJiBkb2MuY2xpZW50VG9wICB8fCBib2R5ICYmIGJvZHkuY2xpZW50VG9wICB8fCAwICk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCByZWxhdGVkVGFyZ2V0LCBpZiBuZWNlc3NhcnlcbiAgICAgIGlmICggIWV2ZW50LnJlbGF0ZWRUYXJnZXQgJiYgZnJvbUVsZW1lbnQgKSB7XG4gICAgICAgIGV2ZW50LnJlbGF0ZWRUYXJnZXQgPSBmcm9tRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0ID8gb3JpZ2luYWwudG9FbGVtZW50IDogZnJvbUVsZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB3aGljaCBmb3IgY2xpY2s6IDEgPT09IGxlZnQ7IDIgPT09IG1pZGRsZTsgMyA9PT0gcmlnaHRcbiAgICAgIC8vIE5vdGU6IGJ1dHRvbiBpcyBub3Qgbm9ybWFsaXplZCwgc28gZG9uJ3QgdXNlIGl0XG4gICAgICBpZiAoICFldmVudC53aGljaCAmJiBidXR0b24gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgZXZlbnQud2hpY2ggPSAoIGJ1dHRvbiAmIDEgPyAxIDogKCBidXR0b24gJiAyID8gMyA6ICggYnV0dG9uICYgNCA/IDIgOiAwICkgKSApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuICB9LFxuXG4gIHNwZWNpYWw6IHtcbiAgICBsb2FkOiB7XG4gICAgICAvLyBQcmV2ZW50IHRyaWdnZXJlZCBpbWFnZS5sb2FkIGV2ZW50cyBmcm9tIGJ1YmJsaW5nIHRvIHdpbmRvdy5sb2FkXG4gICAgICBub0J1YmJsZTogdHJ1ZVxuICAgIH0sXG4gICAgZm9jdXM6IHtcbiAgICAgIC8vIEZpcmUgbmF0aXZlIGV2ZW50IGlmIHBvc3NpYmxlIHNvIGJsdXIvZm9jdXMgc2VxdWVuY2UgaXMgY29ycmVjdFxuICAgICAgdHJpZ2dlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggdGhpcyAhPT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSAmJiB0aGlzLmZvY3VzICkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgICAgICAgICAvLyBJZiB3ZSBlcnJvciBvbiBmb2N1cyB0byBoaWRkZW4gZWxlbWVudCAoIzE0ODYsICMxMjUxOCksXG4gICAgICAgICAgICAvLyBsZXQgLnRyaWdnZXIoKSBydW4gdGhlIGhhbmRsZXJzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVsZWdhdGVUeXBlOiBcImZvY3VzaW5cIlxuICAgIH0sXG4gICAgYmx1cjoge1xuICAgICAgdHJpZ2dlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggdGhpcyA9PT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSAmJiB0aGlzLmJsdXIgKSB7XG4gICAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVsZWdhdGVUeXBlOiBcImZvY3Vzb3V0XCJcbiAgICB9LFxuICAgIGNsaWNrOiB7XG4gICAgICAvLyBGb3IgY2hlY2tib3gsIGZpcmUgbmF0aXZlIGV2ZW50IHNvIGNoZWNrZWQgc3RhdGUgd2lsbCBiZSByaWdodFxuICAgICAgdHJpZ2dlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImlucHV0XCIgKSAmJiB0aGlzLnR5cGUgPT09IFwiY2hlY2tib3hcIiAmJiB0aGlzLmNsaWNrICkge1xuICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIEZvciBjcm9zcy1icm93c2VyIGNvbnNpc3RlbmN5LCBkb24ndCBmaXJlIG5hdGl2ZSAuY2xpY2soKSBvbiBsaW5rc1xuICAgICAgX2RlZmF1bHQ6IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgcmV0dXJuIGpRdWVyeS5ub2RlTmFtZSggZXZlbnQudGFyZ2V0LCBcImFcIiApO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBiZWZvcmV1bmxvYWQ6IHtcbiAgICAgIHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG4gICAgICAgIC8vIFN1cHBvcnQ6IEZpcmVmb3ggMjArXG4gICAgICAgIC8vIEZpcmVmb3ggZG9lc24ndCBhbGVydCBpZiB0aGUgcmV0dXJuVmFsdWUgZmllbGQgaXMgbm90IHNldC5cbiAgICAgICAgaWYgKCBldmVudC5yZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50ICkge1xuICAgICAgICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQucmV0dXJuVmFsdWUgPSBldmVudC5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2ltdWxhdGU6IGZ1bmN0aW9uKCB0eXBlLCBlbGVtLCBldmVudCwgYnViYmxlICkge1xuICAgIC8vIFBpZ2d5YmFjayBvbiBhIGRvbm9yIGV2ZW50IHRvIHNpbXVsYXRlIGEgZGlmZmVyZW50IG9uZS5cbiAgICAvLyBGYWtlIG9yaWdpbmFsRXZlbnQgdG8gYXZvaWQgZG9ub3IncyBzdG9wUHJvcGFnYXRpb24sIGJ1dCBpZiB0aGVcbiAgICAvLyBzaW11bGF0ZWQgZXZlbnQgcHJldmVudHMgZGVmYXVsdCB0aGVuIHdlIGRvIHRoZSBzYW1lIG9uIHRoZSBkb25vci5cbiAgICB2YXIgZSA9IGpRdWVyeS5leHRlbmQoXG4gICAgICBuZXcgalF1ZXJ5LkV2ZW50KCksXG4gICAgICBldmVudCxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgaXNTaW11bGF0ZWQ6IHRydWUsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IHt9XG4gICAgICB9XG4gICAgKTtcbiAgICBpZiAoIGJ1YmJsZSApIHtcbiAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyKCBlLCBudWxsLCBlbGVtICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGpRdWVyeS5ldmVudC5kaXNwYXRjaC5jYWxsKCBlbGVtLCBlICk7XG4gICAgfVxuICAgIGlmICggZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59O1xuXG5qUXVlcnkucmVtb3ZlRXZlbnQgPSBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyID9cbiAgZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGhhbmRsZSApIHtcbiAgICBpZiAoIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgaGFuZGxlLCBmYWxzZSApO1xuICAgIH1cbiAgfSA6XG4gIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBoYW5kbGUgKSB7XG4gICAgdmFyIG5hbWUgPSBcIm9uXCIgKyB0eXBlO1xuXG4gICAgaWYgKCBlbGVtLmRldGFjaEV2ZW50ICkge1xuXG4gICAgICAvLyAjODU0NSwgIzcwNTQsIHByZXZlbnRpbmcgbWVtb3J5IGxlYWtzIGZvciBjdXN0b20gZXZlbnRzIGluIElFNi04XG4gICAgICAvLyBkZXRhY2hFdmVudCBuZWVkZWQgcHJvcGVydHkgb24gZWxlbWVudCwgYnkgbmFtZSBvZiB0aGF0IGV2ZW50LCB0byBwcm9wZXJseSBleHBvc2UgaXQgdG8gR0NcbiAgICAgIGlmICggdHlwZW9mIGVsZW1bIG5hbWUgXSA9PT0gc3RydW5kZWZpbmVkICkge1xuICAgICAgICBlbGVtWyBuYW1lIF0gPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBlbGVtLmRldGFjaEV2ZW50KCBuYW1lLCBoYW5kbGUgKTtcbiAgICB9XG4gIH07XG5cbmpRdWVyeS5FdmVudCA9IGZ1bmN0aW9uKCBzcmMsIHByb3BzICkge1xuICAvLyBBbGxvdyBpbnN0YW50aWF0aW9uIHdpdGhvdXQgdGhlICduZXcnIGtleXdvcmRcbiAgaWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBqUXVlcnkuRXZlbnQpICkge1xuICAgIHJldHVybiBuZXcgalF1ZXJ5LkV2ZW50KCBzcmMsIHByb3BzICk7XG4gIH1cblxuICAvLyBFdmVudCBvYmplY3RcbiAgaWYgKCBzcmMgJiYgc3JjLnR5cGUgKSB7XG4gICAgdGhpcy5vcmlnaW5hbEV2ZW50ID0gc3JjO1xuICAgIHRoaXMudHlwZSA9IHNyYy50eXBlO1xuXG4gICAgLy8gRXZlbnRzIGJ1YmJsaW5nIHVwIHRoZSBkb2N1bWVudCBtYXkgaGF2ZSBiZWVuIG1hcmtlZCBhcyBwcmV2ZW50ZWRcbiAgICAvLyBieSBhIGhhbmRsZXIgbG93ZXIgZG93biB0aGUgdHJlZTsgcmVmbGVjdCB0aGUgY29ycmVjdCB2YWx1ZS5cbiAgICB0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHNyYy5kZWZhdWx0UHJldmVudGVkIHx8XG4gICAgICAgIHNyYy5kZWZhdWx0UHJldmVudGVkID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgLy8gU3VwcG9ydDogSUUgPCA5LCBBbmRyb2lkIDwgNC4wXG4gICAgICAgIHNyYy5yZXR1cm5WYWx1ZSA9PT0gZmFsc2UgP1xuICAgICAgcmV0dXJuVHJ1ZSA6XG4gICAgICByZXR1cm5GYWxzZTtcblxuICAvLyBFdmVudCB0eXBlXG4gIH0gZWxzZSB7XG4gICAgdGhpcy50eXBlID0gc3JjO1xuICB9XG5cbiAgLy8gUHV0IGV4cGxpY2l0bHkgcHJvdmlkZWQgcHJvcGVydGllcyBvbnRvIHRoZSBldmVudCBvYmplY3RcbiAgaWYgKCBwcm9wcyApIHtcbiAgICBqUXVlcnkuZXh0ZW5kKCB0aGlzLCBwcm9wcyApO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgdGltZXN0YW1wIGlmIGluY29taW5nIGV2ZW50IGRvZXNuJ3QgaGF2ZSBvbmVcbiAgdGhpcy50aW1lU3RhbXAgPSBzcmMgJiYgc3JjLnRpbWVTdGFtcCB8fCBqUXVlcnkubm93KCk7XG5cbiAgLy8gTWFyayBpdCBhcyBmaXhlZFxuICB0aGlzWyBqUXVlcnkuZXhwYW5kbyBdID0gdHJ1ZTtcbn07XG5cbi8vIGpRdWVyeS5FdmVudCBpcyBiYXNlZCBvbiBET00zIEV2ZW50cyBhcyBzcGVjaWZpZWQgYnkgdGhlIEVDTUFTY3JpcHQgTGFuZ3VhZ2UgQmluZGluZ1xuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwMzAzMzEvZWNtYS1zY3JpcHQtYmluZGluZy5odG1sXG5qUXVlcnkuRXZlbnQucHJvdG90eXBlID0ge1xuICBpc0RlZmF1bHRQcmV2ZW50ZWQ6IHJldHVybkZhbHNlLFxuICBpc1Byb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG4gIGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcblxuICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cbiAgICB0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWU7XG4gICAgaWYgKCAhZSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiBwcmV2ZW50RGVmYXVsdCBleGlzdHMsIHJ1biBpdCBvbiB0aGUgb3JpZ2luYWwgZXZlbnRcbiAgICBpZiAoIGUucHJldmVudERlZmF1bHQgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBTdXBwb3J0OiBJRVxuICAgIC8vIE90aGVyd2lzZSBzZXQgdGhlIHJldHVyblZhbHVlIHByb3BlcnR5IG9mIHRoZSBvcmlnaW5hbCBldmVudCB0byBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgfVxuICB9LFxuICBzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG4gICAgdGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG4gICAgaWYgKCAhZSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSWYgc3RvcFByb3BhZ2F0aW9uIGV4aXN0cywgcnVuIGl0IG9uIHRoZSBvcmlnaW5hbCBldmVudFxuICAgIGlmICggZS5zdG9wUHJvcGFnYXRpb24gKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8vIFN1cHBvcnQ6IElFXG4gICAgLy8gU2V0IHRoZSBjYW5jZWxCdWJibGUgcHJvcGVydHkgb2YgdGhlIG9yaWdpbmFsIGV2ZW50IHRvIHRydWVcbiAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gIH0sXG4gIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cbiAgICB0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuICAgIGlmICggZSAmJiBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiApIHtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufTtcblxuLy8gQ3JlYXRlIG1vdXNlZW50ZXIvbGVhdmUgZXZlbnRzIHVzaW5nIG1vdXNlb3Zlci9vdXQgYW5kIGV2ZW50LXRpbWUgY2hlY2tzXG5qUXVlcnkuZWFjaCh7XG4gIG1vdXNlZW50ZXI6IFwibW91c2VvdmVyXCIsXG4gIG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIixcbiAgcG9pbnRlcmVudGVyOiBcInBvaW50ZXJvdmVyXCIsXG4gIHBvaW50ZXJsZWF2ZTogXCJwb2ludGVyb3V0XCJcbn0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG4gIGpRdWVyeS5ldmVudC5zcGVjaWFsWyBvcmlnIF0gPSB7XG4gICAgZGVsZWdhdGVUeXBlOiBmaXgsXG4gICAgYmluZFR5cGU6IGZpeCxcblxuICAgIGhhbmRsZTogZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgdmFyIHJldCxcbiAgICAgICAgdGFyZ2V0ID0gdGhpcyxcbiAgICAgICAgcmVsYXRlZCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQsXG4gICAgICAgIGhhbmRsZU9iaiA9IGV2ZW50LmhhbmRsZU9iajtcblxuICAgICAgLy8gRm9yIG1vdXNlbnRlci9sZWF2ZSBjYWxsIHRoZSBoYW5kbGVyIGlmIHJlbGF0ZWQgaXMgb3V0c2lkZSB0aGUgdGFyZ2V0LlxuICAgICAgLy8gTkI6IE5vIHJlbGF0ZWRUYXJnZXQgaWYgdGhlIG1vdXNlIGxlZnQvZW50ZXJlZCB0aGUgYnJvd3NlciB3aW5kb3dcbiAgICAgIGlmICggIXJlbGF0ZWQgfHwgKHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKCB0YXJnZXQsIHJlbGF0ZWQgKSkgKSB7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBoYW5kbGVPYmoub3JpZ1R5cGU7XG4gICAgICAgIHJldCA9IGhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgICAgICAgZXZlbnQudHlwZSA9IGZpeDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9O1xufSk7XG5cbi8vIElFIHN1Ym1pdCBkZWxlZ2F0aW9uXG5pZiAoICFzdXBwb3J0LnN1Ym1pdEJ1YmJsZXMgKSB7XG5cbiAgalF1ZXJ5LmV2ZW50LnNwZWNpYWwuc3VibWl0ID0ge1xuICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIE9ubHkgbmVlZCB0aGlzIGZvciBkZWxlZ2F0ZWQgZm9ybSBzdWJtaXQgZXZlbnRzXG4gICAgICBpZiAoIGpRdWVyeS5ub2RlTmFtZSggdGhpcywgXCJmb3JtXCIgKSApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBMYXp5LWFkZCBhIHN1Ym1pdCBoYW5kbGVyIHdoZW4gYSBkZXNjZW5kYW50IGZvcm0gbWF5IHBvdGVudGlhbGx5IGJlIHN1Ym1pdHRlZFxuICAgICAgalF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgXCJjbGljay5fc3VibWl0IGtleXByZXNzLl9zdWJtaXRcIiwgZnVuY3Rpb24oIGUgKSB7XG4gICAgICAgIC8vIE5vZGUgbmFtZSBjaGVjayBhdm9pZHMgYSBWTUwtcmVsYXRlZCBjcmFzaCBpbiBJRSAoIzk4MDcpXG4gICAgICAgIHZhciBlbGVtID0gZS50YXJnZXQsXG4gICAgICAgICAgZm9ybSA9IGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJpbnB1dFwiICkgfHwgalF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImJ1dHRvblwiICkgPyBlbGVtLmZvcm0gOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmICggZm9ybSAmJiAhalF1ZXJ5Ll9kYXRhKCBmb3JtLCBcInN1Ym1pdEJ1YmJsZXNcIiApICkge1xuICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQoIGZvcm0sIFwic3VibWl0Ll9zdWJtaXRcIiwgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICAgICAgZXZlbnQuX3N1Ym1pdF9idWJibGUgPSB0cnVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGpRdWVyeS5fZGF0YSggZm9ybSwgXCJzdWJtaXRCdWJibGVzXCIsIHRydWUgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyByZXR1cm4gdW5kZWZpbmVkIHNpbmNlIHdlIGRvbid0IG5lZWQgYW4gZXZlbnQgbGlzdGVuZXJcbiAgICB9LFxuXG4gICAgcG9zdERpc3BhdGNoOiBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAvLyBJZiBmb3JtIHdhcyBzdWJtaXR0ZWQgYnkgdGhlIHVzZXIsIGJ1YmJsZSB0aGUgZXZlbnQgdXAgdGhlIHRyZWVcbiAgICAgIGlmICggZXZlbnQuX3N1Ym1pdF9idWJibGUgKSB7XG4gICAgICAgIGRlbGV0ZSBldmVudC5fc3VibWl0X2J1YmJsZTtcbiAgICAgICAgaWYgKCB0aGlzLnBhcmVudE5vZGUgJiYgIWV2ZW50LmlzVHJpZ2dlciApIHtcbiAgICAgICAgICBqUXVlcnkuZXZlbnQuc2ltdWxhdGUoIFwic3VibWl0XCIsIHRoaXMucGFyZW50Tm9kZSwgZXZlbnQsIHRydWUgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBPbmx5IG5lZWQgdGhpcyBmb3IgZGVsZWdhdGVkIGZvcm0gc3VibWl0IGV2ZW50c1xuICAgICAgaWYgKCBqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiZm9ybVwiICkgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIGRlbGVnYXRlZCBoYW5kbGVyczsgY2xlYW5EYXRhIGV2ZW50dWFsbHkgcmVhcHMgc3VibWl0IGhhbmRsZXJzIGF0dGFjaGVkIGFib3ZlXG4gICAgICBqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCBcIi5fc3VibWl0XCIgKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIElFIGNoYW5nZSBkZWxlZ2F0aW9uIGFuZCBjaGVja2JveC9yYWRpbyBmaXhcbmlmICggIXN1cHBvcnQuY2hhbmdlQnViYmxlcyApIHtcblxuICBqUXVlcnkuZXZlbnQuc3BlY2lhbC5jaGFuZ2UgPSB7XG5cbiAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmICggcmZvcm1FbGVtcy50ZXN0KCB0aGlzLm5vZGVOYW1lICkgKSB7XG4gICAgICAgIC8vIElFIGRvZXNuJ3QgZmlyZSBjaGFuZ2Ugb24gYSBjaGVjay9yYWRpbyB1bnRpbCBibHVyOyB0cmlnZ2VyIGl0IG9uIGNsaWNrXG4gICAgICAgIC8vIGFmdGVyIGEgcHJvcGVydHljaGFuZ2UuIEVhdCB0aGUgYmx1ci1jaGFuZ2UgaW4gc3BlY2lhbC5jaGFuZ2UuaGFuZGxlLlxuICAgICAgICAvLyBUaGlzIHN0aWxsIGZpcmVzIG9uY2hhbmdlIGEgc2Vjb25kIHRpbWUgZm9yIGNoZWNrL3JhZGlvIGFmdGVyIGJsdXIuXG4gICAgICAgIGlmICggdGhpcy50eXBlID09PSBcImNoZWNrYm94XCIgfHwgdGhpcy50eXBlID09PSBcInJhZGlvXCIgKSB7XG4gICAgICAgICAgalF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgXCJwcm9wZXJ0eWNoYW5nZS5fY2hhbmdlXCIsIGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgICAgIGlmICggZXZlbnQub3JpZ2luYWxFdmVudC5wcm9wZXJ0eU5hbWUgPT09IFwiY2hlY2tlZFwiICkge1xuICAgICAgICAgICAgICB0aGlzLl9qdXN0X2NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIFwiY2xpY2suX2NoYW5nZVwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMuX2p1c3RfY2hhbmdlZCAmJiAhZXZlbnQuaXNUcmlnZ2VyICkge1xuICAgICAgICAgICAgICB0aGlzLl9qdXN0X2NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFsbG93IHRyaWdnZXJlZCwgc2ltdWxhdGVkIGNoYW5nZSBldmVudHMgKCMxMTUwMClcbiAgICAgICAgICAgIGpRdWVyeS5ldmVudC5zaW11bGF0ZSggXCJjaGFuZ2VcIiwgdGhpcywgZXZlbnQsIHRydWUgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBEZWxlZ2F0ZWQgZXZlbnQ7IGxhenktYWRkIGEgY2hhbmdlIGhhbmRsZXIgb24gZGVzY2VuZGFudCBpbnB1dHNcbiAgICAgIGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIFwiYmVmb3JlYWN0aXZhdGUuX2NoYW5nZVwiLCBmdW5jdGlvbiggZSApIHtcbiAgICAgICAgdmFyIGVsZW0gPSBlLnRhcmdldDtcblxuICAgICAgICBpZiAoIHJmb3JtRWxlbXMudGVzdCggZWxlbS5ub2RlTmFtZSApICYmICFqUXVlcnkuX2RhdGEoIGVsZW0sIFwiY2hhbmdlQnViYmxlc1wiICkgKSB7XG4gICAgICAgICAgalF1ZXJ5LmV2ZW50LmFkZCggZWxlbSwgXCJjaGFuZ2UuX2NoYW5nZVwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMucGFyZW50Tm9kZSAmJiAhZXZlbnQuaXNTaW11bGF0ZWQgJiYgIWV2ZW50LmlzVHJpZ2dlciApIHtcbiAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBcImNoYW5nZVwiLCB0aGlzLnBhcmVudE5vZGUsIGV2ZW50LCB0cnVlICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgalF1ZXJ5Ll9kYXRhKCBlbGVtLCBcImNoYW5nZUJ1YmJsZXNcIiwgdHJ1ZSApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlOiBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICB2YXIgZWxlbSA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgLy8gU3dhbGxvdyBuYXRpdmUgY2hhbmdlIGV2ZW50cyBmcm9tIGNoZWNrYm94L3JhZGlvLCB3ZSBhbHJlYWR5IHRyaWdnZXJlZCB0aGVtIGFib3ZlXG4gICAgICBpZiAoIHRoaXMgIT09IGVsZW0gfHwgZXZlbnQuaXNTaW11bGF0ZWQgfHwgZXZlbnQuaXNUcmlnZ2VyIHx8IChlbGVtLnR5cGUgIT09IFwicmFkaW9cIiAmJiBlbGVtLnR5cGUgIT09IFwiY2hlY2tib3hcIikgKSB7XG4gICAgICAgIHJldHVybiBldmVudC5oYW5kbGVPYmouaGFuZGxlci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRlYXJkb3duOiBmdW5jdGlvbigpIHtcbiAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUoIHRoaXMsIFwiLl9jaGFuZ2VcIiApO1xuXG4gICAgICByZXR1cm4gIXJmb3JtRWxlbXMudGVzdCggdGhpcy5ub2RlTmFtZSApO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gQ3JlYXRlIFwiYnViYmxpbmdcIiBmb2N1cyBhbmQgYmx1ciBldmVudHNcbmlmICggIXN1cHBvcnQuZm9jdXNpbkJ1YmJsZXMgKSB7XG4gIGpRdWVyeS5lYWNoKHsgZm9jdXM6IFwiZm9jdXNpblwiLCBibHVyOiBcImZvY3Vzb3V0XCIgfSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblxuICAgIC8vIEF0dGFjaCBhIHNpbmdsZSBjYXB0dXJpbmcgaGFuZGxlciBvbiB0aGUgZG9jdW1lbnQgd2hpbGUgc29tZW9uZSB3YW50cyBmb2N1c2luL2ZvY3Vzb3V0XG4gICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIGpRdWVyeS5ldmVudC5zaW11bGF0ZSggZml4LCBldmVudC50YXJnZXQsIGpRdWVyeS5ldmVudC5maXgoIGV2ZW50ICksIHRydWUgKTtcbiAgICAgIH07XG5cbiAgICBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZml4IF0gPSB7XG4gICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcbiAgICAgICAgICBhdHRhY2hlcyA9IGpRdWVyeS5fZGF0YSggZG9jLCBmaXggKTtcblxuICAgICAgICBpZiAoICFhdHRhY2hlcyApIHtcbiAgICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuICAgICAgICB9XG4gICAgICAgIGpRdWVyeS5fZGF0YSggZG9jLCBmaXgsICggYXR0YWNoZXMgfHwgMCApICsgMSApO1xuICAgICAgfSxcbiAgICAgIHRlYXJkb3duOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxuICAgICAgICAgIGF0dGFjaGVzID0galF1ZXJ5Ll9kYXRhKCBkb2MsIGZpeCApIC0gMTtcblxuICAgICAgICBpZiAoICFhdHRhY2hlcyApIHtcbiAgICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuICAgICAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YSggZG9jLCBmaXggKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBqUXVlcnkuX2RhdGEoIGRvYywgZml4LCBhdHRhY2hlcyApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXG4gIG9uOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgLypJTlRFUk5BTCovIG9uZSApIHtcbiAgICB2YXIgdHlwZSwgb3JpZ0ZuO1xuXG4gICAgLy8gVHlwZXMgY2FuIGJlIGEgbWFwIG9mIHR5cGVzL2hhbmRsZXJzXG4gICAgaWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgICAvLyAoIHR5cGVzLU9iamVjdCwgc2VsZWN0b3IsIGRhdGEgKVxuICAgICAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgIC8vICggdHlwZXMtT2JqZWN0LCBkYXRhIClcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwgc2VsZWN0b3I7XG4gICAgICAgIHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgZm9yICggdHlwZSBpbiB0eXBlcyApIHtcbiAgICAgICAgdGhpcy5vbiggdHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzWyB0eXBlIF0sIG9uZSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKCBkYXRhID09IG51bGwgJiYgZm4gPT0gbnVsbCApIHtcbiAgICAgIC8vICggdHlwZXMsIGZuIClcbiAgICAgIGZuID0gc2VsZWN0b3I7XG4gICAgICBkYXRhID0gc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmICggZm4gPT0gbnVsbCApIHtcbiAgICAgIGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuICAgICAgICAvLyAoIHR5cGVzLCBzZWxlY3RvciwgZm4gKVxuICAgICAgICBmbiA9IGRhdGE7XG4gICAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAoIHR5cGVzLCBkYXRhLCBmbiApXG4gICAgICAgIGZuID0gZGF0YTtcbiAgICAgICAgZGF0YSA9IHNlbGVjdG9yO1xuICAgICAgICBzZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCBmbiA9PT0gZmFsc2UgKSB7XG4gICAgICBmbiA9IHJldHVybkZhbHNlO1xuICAgIH0gZWxzZSBpZiAoICFmbiApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICggb25lID09PSAxICkge1xuICAgICAgb3JpZ0ZuID0gZm47XG4gICAgICBmbiA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgLy8gQ2FuIHVzZSBhbiBlbXB0eSBzZXQsIHNpbmNlIGV2ZW50IGNvbnRhaW5zIHRoZSBpbmZvXG4gICAgICAgIGpRdWVyeSgpLm9mZiggZXZlbnQgKTtcbiAgICAgICAgcmV0dXJuIG9yaWdGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgICB9O1xuICAgICAgLy8gVXNlIHNhbWUgZ3VpZCBzbyBjYWxsZXIgY2FuIHJlbW92ZSB1c2luZyBvcmlnRm5cbiAgICAgIGZuLmd1aWQgPSBvcmlnRm4uZ3VpZCB8fCAoIG9yaWdGbi5ndWlkID0galF1ZXJ5Lmd1aWQrKyApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgIGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIHR5cGVzLCBmbiwgZGF0YSwgc2VsZWN0b3IgKTtcbiAgICB9KTtcbiAgfSxcbiAgb25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcbiAgICByZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgMSApO1xuICB9LFxuICBvZmY6IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGZuICkge1xuICAgIHZhciBoYW5kbGVPYmosIHR5cGU7XG4gICAgaWYgKCB0eXBlcyAmJiB0eXBlcy5wcmV2ZW50RGVmYXVsdCAmJiB0eXBlcy5oYW5kbGVPYmogKSB7XG4gICAgICAvLyAoIGV2ZW50ICkgIGRpc3BhdGNoZWQgalF1ZXJ5LkV2ZW50XG4gICAgICBoYW5kbGVPYmogPSB0eXBlcy5oYW5kbGVPYmo7XG4gICAgICBqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuICAgICAgICBoYW5kbGVPYmoubmFtZXNwYWNlID8gaGFuZGxlT2JqLm9yaWdUeXBlICsgXCIuXCIgKyBoYW5kbGVPYmoubmFtZXNwYWNlIDogaGFuZGxlT2JqLm9yaWdUeXBlLFxuICAgICAgICBoYW5kbGVPYmouc2VsZWN0b3IsXG4gICAgICAgIGhhbmRsZU9iai5oYW5kbGVyXG4gICAgICApO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuICAgICAgLy8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcbiAgICAgIGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG4gICAgICAgIHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuICAgICAgLy8gKCB0eXBlcyBbLCBmbl0gKVxuICAgICAgZm4gPSBzZWxlY3RvcjtcbiAgICAgIHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoIGZuID09PSBmYWxzZSApIHtcbiAgICAgIGZuID0gcmV0dXJuRmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yICk7XG4gICAgfSk7XG4gIH0sXG5cbiAgdHJpZ2dlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCB0aGlzICk7XG4gICAgfSk7XG4gIH0sXG4gIHRyaWdnZXJIYW5kbGVyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcbiAgICB2YXIgZWxlbSA9IHRoaXNbMF07XG4gICAgaWYgKCBlbGVtICkge1xuICAgICAgcmV0dXJuIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCBlbGVtLCB0cnVlICk7XG4gICAgfVxuICB9XG59KTtcblxuXG5mdW5jdGlvbiBjcmVhdGVTYWZlRnJhZ21lbnQoIGRvY3VtZW50ICkge1xuICB2YXIgbGlzdCA9IG5vZGVOYW1lcy5zcGxpdCggXCJ8XCIgKSxcbiAgICBzYWZlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICBpZiAoIHNhZmVGcmFnLmNyZWF0ZUVsZW1lbnQgKSB7XG4gICAgd2hpbGUgKCBsaXN0Lmxlbmd0aCApIHtcbiAgICAgIHNhZmVGcmFnLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIGxpc3QucG9wKClcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzYWZlRnJhZztcbn1cblxudmFyIG5vZGVOYW1lcyA9IFwiYWJicnxhcnRpY2xlfGFzaWRlfGF1ZGlvfGJkaXxjYW52YXN8ZGF0YXxkYXRhbGlzdHxkZXRhaWxzfGZpZ2NhcHRpb258ZmlndXJlfGZvb3RlcnxcIiArXG4gICAgXCJoZWFkZXJ8aGdyb3VwfG1hcmt8bWV0ZXJ8bmF2fG91dHB1dHxwcm9ncmVzc3xzZWN0aW9ufHN1bW1hcnl8dGltZXx2aWRlb1wiLFxuICByaW5saW5lalF1ZXJ5ID0gLyBqUXVlcnlcXGQrPVwiKD86bnVsbHxcXGQrKVwiL2csXG4gIHJub3NoaW1jYWNoZSA9IG5ldyBSZWdFeHAoXCI8KD86XCIgKyBub2RlTmFtZXMgKyBcIilbXFxcXHMvPl1cIiwgXCJpXCIpLFxuICBybGVhZGluZ1doaXRlc3BhY2UgPSAvXlxccysvLFxuICByeGh0bWxUYWcgPSAvPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbXFx3Ol0rKVtePl0qKVxcLz4vZ2ksXG4gIHJ0YWdOYW1lID0gLzwoW1xcdzpdKykvLFxuICBydGJvZHkgPSAvPHRib2R5L2ksXG4gIHJodG1sID0gLzx8JiM/XFx3KzsvLFxuICBybm9Jbm5lcmh0bWwgPSAvPCg/OnNjcmlwdHxzdHlsZXxsaW5rKS9pLFxuICAvLyBjaGVja2VkPVwiY2hlY2tlZFwiIG9yIGNoZWNrZWRcbiAgcmNoZWNrZWQgPSAvY2hlY2tlZFxccyooPzpbXj1dfD1cXHMqLmNoZWNrZWQuKS9pLFxuICByc2NyaXB0VHlwZSA9IC9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2ksXG4gIHJzY3JpcHRUeXBlTWFza2VkID0gL150cnVlXFwvKC4qKS8sXG4gIHJjbGVhblNjcmlwdCA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZyxcblxuICAvLyBXZSBoYXZlIHRvIGNsb3NlIHRoZXNlIHRhZ3MgdG8gc3VwcG9ydCBYSFRNTCAoIzEzMjAwKVxuICB3cmFwTWFwID0ge1xuICAgIG9wdGlvbjogWyAxLCBcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cIiwgXCI8L3NlbGVjdD5cIiBdLFxuICAgIGxlZ2VuZDogWyAxLCBcIjxmaWVsZHNldD5cIiwgXCI8L2ZpZWxkc2V0PlwiIF0sXG4gICAgYXJlYTogWyAxLCBcIjxtYXA+XCIsIFwiPC9tYXA+XCIgXSxcbiAgICBwYXJhbTogWyAxLCBcIjxvYmplY3Q+XCIsIFwiPC9vYmplY3Q+XCIgXSxcbiAgICB0aGVhZDogWyAxLCBcIjx0YWJsZT5cIiwgXCI8L3RhYmxlPlwiIF0sXG4gICAgdHI6IFsgMiwgXCI8dGFibGU+PHRib2R5PlwiLCBcIjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuICAgIGNvbDogWyAyLCBcIjx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+XCIsIFwiPC9jb2xncm91cD48L3RhYmxlPlwiIF0sXG4gICAgdGQ6IFsgMywgXCI8dGFibGU+PHRib2R5Pjx0cj5cIiwgXCI8L3RyPjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuXG4gICAgLy8gSUU2LTggY2FuJ3Qgc2VyaWFsaXplIGxpbmssIHNjcmlwdCwgc3R5bGUsIG9yIGFueSBodG1sNSAoTm9TY29wZSkgdGFncyxcbiAgICAvLyB1bmxlc3Mgd3JhcHBlZCBpbiBhIGRpdiB3aXRoIG5vbi1icmVha2luZyBjaGFyYWN0ZXJzIGluIGZyb250IG9mIGl0LlxuICAgIF9kZWZhdWx0OiBzdXBwb3J0Lmh0bWxTZXJpYWxpemUgPyBbIDAsIFwiXCIsIFwiXCIgXSA6IFsgMSwgXCJYPGRpdj5cIiwgXCI8L2Rpdj5cIiAgXVxuICB9LFxuICBzYWZlRnJhZ21lbnQgPSBjcmVhdGVTYWZlRnJhZ21lbnQoIGRvY3VtZW50ICksXG4gIGZyYWdtZW50RGl2ID0gc2FmZUZyYWdtZW50LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpICk7XG5cbndyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcbndyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG53cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuZnVuY3Rpb24gZ2V0QWxsKCBjb250ZXh0LCB0YWcgKSB7XG4gIHZhciBlbGVtcywgZWxlbSxcbiAgICBpID0gMCxcbiAgICBmb3VuZCA9IHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBzdHJ1bmRlZmluZWQgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgfHwgXCIqXCIgKSA6XG4gICAgICB0eXBlb2YgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsICE9PSBzdHJ1bmRlZmluZWQgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyB8fCBcIipcIiApIDpcbiAgICAgIHVuZGVmaW5lZDtcblxuICBpZiAoICFmb3VuZCApIHtcbiAgICBmb3IgKCBmb3VuZCA9IFtdLCBlbGVtcyA9IGNvbnRleHQuY2hpbGROb2RlcyB8fCBjb250ZXh0OyAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XG4gICAgICBpZiAoICF0YWcgfHwgalF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCB0YWcgKSApIHtcbiAgICAgICAgZm91bmQucHVzaCggZWxlbSApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgalF1ZXJ5Lm1lcmdlKCBmb3VuZCwgZ2V0QWxsKCBlbGVtLCB0YWcgKSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YWcgPT09IHVuZGVmaW5lZCB8fCB0YWcgJiYgalF1ZXJ5Lm5vZGVOYW1lKCBjb250ZXh0LCB0YWcgKSA/XG4gICAgalF1ZXJ5Lm1lcmdlKCBbIGNvbnRleHQgXSwgZm91bmQgKSA6XG4gICAgZm91bmQ7XG59XG5cbi8vIFVzZWQgaW4gYnVpbGRGcmFnbWVudCwgZml4ZXMgdGhlIGRlZmF1bHRDaGVja2VkIHByb3BlcnR5XG5mdW5jdGlvbiBmaXhEZWZhdWx0Q2hlY2tlZCggZWxlbSApIHtcbiAgaWYgKCByY2hlY2thYmxlVHlwZS50ZXN0KCBlbGVtLnR5cGUgKSApIHtcbiAgICBlbGVtLmRlZmF1bHRDaGVja2VkID0gZWxlbS5jaGVja2VkO1xuICB9XG59XG5cbi8vIFN1cHBvcnQ6IElFPDhcbi8vIE1hbmlwdWxhdGluZyB0YWJsZXMgcmVxdWlyZXMgYSB0Ym9keVxuZnVuY3Rpb24gbWFuaXB1bGF0aW9uVGFyZ2V0KCBlbGVtLCBjb250ZW50ICkge1xuICByZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcInRhYmxlXCIgKSAmJlxuICAgIGpRdWVyeS5ub2RlTmFtZSggY29udGVudC5ub2RlVHlwZSAhPT0gMTEgPyBjb250ZW50IDogY29udGVudC5maXJzdENoaWxkLCBcInRyXCIgKSA/XG5cbiAgICBlbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGJvZHlcIilbMF0gfHxcbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoIGVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIikgKSA6XG4gICAgZWxlbTtcbn1cblxuLy8gUmVwbGFjZS9yZXN0b3JlIHRoZSB0eXBlIGF0dHJpYnV0ZSBvZiBzY3JpcHQgZWxlbWVudHMgZm9yIHNhZmUgRE9NIG1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZGlzYWJsZVNjcmlwdCggZWxlbSApIHtcbiAgZWxlbS50eXBlID0gKGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIFwidHlwZVwiICkgIT09IG51bGwpICsgXCIvXCIgKyBlbGVtLnR5cGU7XG4gIHJldHVybiBlbGVtO1xufVxuZnVuY3Rpb24gcmVzdG9yZVNjcmlwdCggZWxlbSApIHtcbiAgdmFyIG1hdGNoID0gcnNjcmlwdFR5cGVNYXNrZWQuZXhlYyggZWxlbS50eXBlICk7XG4gIGlmICggbWF0Y2ggKSB7XG4gICAgZWxlbS50eXBlID0gbWF0Y2hbMV07XG4gIH0gZWxzZSB7XG4gICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoXCJ0eXBlXCIpO1xuICB9XG4gIHJldHVybiBlbGVtO1xufVxuXG4vLyBNYXJrIHNjcmlwdHMgYXMgaGF2aW5nIGFscmVhZHkgYmVlbiBldmFsdWF0ZWRcbmZ1bmN0aW9uIHNldEdsb2JhbEV2YWwoIGVsZW1zLCByZWZFbGVtZW50cyApIHtcbiAgdmFyIGVsZW0sXG4gICAgaSA9IDA7XG4gIGZvciAoIDsgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuICAgIGpRdWVyeS5fZGF0YSggZWxlbSwgXCJnbG9iYWxFdmFsXCIsICFyZWZFbGVtZW50cyB8fCBqUXVlcnkuX2RhdGEoIHJlZkVsZW1lbnRzW2ldLCBcImdsb2JhbEV2YWxcIiApICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvbmVDb3B5RXZlbnQoIHNyYywgZGVzdCApIHtcblxuICBpZiAoIGRlc3Qubm9kZVR5cGUgIT09IDEgfHwgIWpRdWVyeS5oYXNEYXRhKCBzcmMgKSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdHlwZSwgaSwgbCxcbiAgICBvbGREYXRhID0galF1ZXJ5Ll9kYXRhKCBzcmMgKSxcbiAgICBjdXJEYXRhID0galF1ZXJ5Ll9kYXRhKCBkZXN0LCBvbGREYXRhICksXG4gICAgZXZlbnRzID0gb2xkRGF0YS5ldmVudHM7XG5cbiAgaWYgKCBldmVudHMgKSB7XG4gICAgZGVsZXRlIGN1ckRhdGEuaGFuZGxlO1xuICAgIGN1ckRhdGEuZXZlbnRzID0ge307XG5cbiAgICBmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcbiAgICAgIGZvciAoIGkgPSAwLCBsID0gZXZlbnRzWyB0eXBlIF0ubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKCBkZXN0LCB0eXBlLCBldmVudHNbIHR5cGUgXVsgaSBdICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gbWFrZSB0aGUgY2xvbmVkIHB1YmxpYyBkYXRhIG9iamVjdCBhIGNvcHkgZnJvbSB0aGUgb3JpZ2luYWxcbiAgaWYgKCBjdXJEYXRhLmRhdGEgKSB7XG4gICAgY3VyRGF0YS5kYXRhID0galF1ZXJ5LmV4dGVuZCgge30sIGN1ckRhdGEuZGF0YSApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpeENsb25lTm9kZUlzc3Vlcyggc3JjLCBkZXN0ICkge1xuICB2YXIgbm9kZU5hbWUsIGUsIGRhdGE7XG5cbiAgLy8gV2UgZG8gbm90IG5lZWQgdG8gZG8gYW55dGhpbmcgZm9yIG5vbi1FbGVtZW50c1xuICBpZiAoIGRlc3Qubm9kZVR5cGUgIT09IDEgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbm9kZU5hbWUgPSBkZXN0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gSUU2LTggY29waWVzIGV2ZW50cyBib3VuZCB2aWEgYXR0YWNoRXZlbnQgd2hlbiB1c2luZyBjbG9uZU5vZGUuXG4gIGlmICggIXN1cHBvcnQubm9DbG9uZUV2ZW50ICYmIGRlc3RbIGpRdWVyeS5leHBhbmRvIF0gKSB7XG4gICAgZGF0YSA9IGpRdWVyeS5fZGF0YSggZGVzdCApO1xuXG4gICAgZm9yICggZSBpbiBkYXRhLmV2ZW50cyApIHtcbiAgICAgIGpRdWVyeS5yZW1vdmVFdmVudCggZGVzdCwgZSwgZGF0YS5oYW5kbGUgKTtcbiAgICB9XG5cbiAgICAvLyBFdmVudCBkYXRhIGdldHMgcmVmZXJlbmNlZCBpbnN0ZWFkIG9mIGNvcGllZCBpZiB0aGUgZXhwYW5kbyBnZXRzIGNvcGllZCB0b29cbiAgICBkZXN0LnJlbW92ZUF0dHJpYnV0ZSggalF1ZXJ5LmV4cGFuZG8gKTtcbiAgfVxuXG4gIC8vIElFIGJsYW5rcyBjb250ZW50cyB3aGVuIGNsb25pbmcgc2NyaXB0cywgYW5kIHRyaWVzIHRvIGV2YWx1YXRlIG5ld2x5LXNldCB0ZXh0XG4gIGlmICggbm9kZU5hbWUgPT09IFwic2NyaXB0XCIgJiYgZGVzdC50ZXh0ICE9PSBzcmMudGV4dCApIHtcbiAgICBkaXNhYmxlU2NyaXB0KCBkZXN0ICkudGV4dCA9IHNyYy50ZXh0O1xuICAgIHJlc3RvcmVTY3JpcHQoIGRlc3QgKTtcblxuICAvLyBJRTYtMTAgaW1wcm9wZXJseSBjbG9uZXMgY2hpbGRyZW4gb2Ygb2JqZWN0IGVsZW1lbnRzIHVzaW5nIGNsYXNzaWQuXG4gIC8vIElFMTAgdGhyb3dzIE5vTW9kaWZpY2F0aW9uQWxsb3dlZEVycm9yIGlmIHBhcmVudCBpcyBudWxsLCAjMTIxMzIuXG4gIH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcIm9iamVjdFwiICkge1xuICAgIGlmICggZGVzdC5wYXJlbnROb2RlICkge1xuICAgICAgZGVzdC5vdXRlckhUTUwgPSBzcmMub3V0ZXJIVE1MO1xuICAgIH1cblxuICAgIC8vIFRoaXMgcGF0aCBhcHBlYXJzIHVuYXZvaWRhYmxlIGZvciBJRTkuIFdoZW4gY2xvbmluZyBhbiBvYmplY3RcbiAgICAvLyBlbGVtZW50IGluIElFOSwgdGhlIG91dGVySFRNTCBzdHJhdGVneSBhYm92ZSBpcyBub3Qgc3VmZmljaWVudC5cbiAgICAvLyBJZiB0aGUgc3JjIGhhcyBpbm5lckhUTUwgYW5kIHRoZSBkZXN0aW5hdGlvbiBkb2VzIG5vdCxcbiAgICAvLyBjb3B5IHRoZSBzcmMuaW5uZXJIVE1MIGludG8gdGhlIGRlc3QuaW5uZXJIVE1MLiAjMTAzMjRcbiAgICBpZiAoIHN1cHBvcnQuaHRtbDVDbG9uZSAmJiAoIHNyYy5pbm5lckhUTUwgJiYgIWpRdWVyeS50cmltKGRlc3QuaW5uZXJIVE1MKSApICkge1xuICAgICAgZGVzdC5pbm5lckhUTUwgPSBzcmMuaW5uZXJIVE1MO1xuICAgIH1cblxuICB9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmIHJjaGVja2FibGVUeXBlLnRlc3QoIHNyYy50eXBlICkgKSB7XG4gICAgLy8gSUU2LTggZmFpbHMgdG8gcGVyc2lzdCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiBhIGNsb25lZCBjaGVja2JveFxuICAgIC8vIG9yIHJhZGlvIGJ1dHRvbi4gV29yc2UsIElFNi03IGZhaWwgdG8gZ2l2ZSB0aGUgY2xvbmVkIGVsZW1lbnRcbiAgICAvLyBhIGNoZWNrZWQgYXBwZWFyYW5jZSBpZiB0aGUgZGVmYXVsdENoZWNrZWQgdmFsdWUgaXNuJ3QgYWxzbyBzZXRcblxuICAgIGRlc3QuZGVmYXVsdENoZWNrZWQgPSBkZXN0LmNoZWNrZWQgPSBzcmMuY2hlY2tlZDtcblxuICAgIC8vIElFNi03IGdldCBjb25mdXNlZCBhbmQgZW5kIHVwIHNldHRpbmcgdGhlIHZhbHVlIG9mIGEgY2xvbmVkXG4gICAgLy8gY2hlY2tib3gvcmFkaW8gYnV0dG9uIHRvIGFuIGVtcHR5IHN0cmluZyBpbnN0ZWFkIG9mIFwib25cIlxuICAgIGlmICggZGVzdC52YWx1ZSAhPT0gc3JjLnZhbHVlICkge1xuICAgICAgZGVzdC52YWx1ZSA9IHNyYy52YWx1ZTtcbiAgICB9XG5cbiAgLy8gSUU2LTggZmFpbHMgdG8gcmV0dXJuIHRoZSBzZWxlY3RlZCBvcHRpb24gdG8gdGhlIGRlZmF1bHQgc2VsZWN0ZWRcbiAgLy8gc3RhdGUgd2hlbiBjbG9uaW5nIG9wdGlvbnNcbiAgfSBlbHNlIGlmICggbm9kZU5hbWUgPT09IFwib3B0aW9uXCIgKSB7XG4gICAgZGVzdC5kZWZhdWx0U2VsZWN0ZWQgPSBkZXN0LnNlbGVjdGVkID0gc3JjLmRlZmF1bHRTZWxlY3RlZDtcblxuICAvLyBJRTYtOCBmYWlscyB0byBzZXQgdGhlIGRlZmF1bHRWYWx1ZSB0byB0aGUgY29ycmVjdCB2YWx1ZSB3aGVuXG4gIC8vIGNsb25pbmcgb3RoZXIgdHlwZXMgb2YgaW5wdXQgZmllbGRzXG4gIH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgfHwgbm9kZU5hbWUgPT09IFwidGV4dGFyZWFcIiApIHtcbiAgICBkZXN0LmRlZmF1bHRWYWx1ZSA9IHNyYy5kZWZhdWx0VmFsdWU7XG4gIH1cbn1cblxualF1ZXJ5LmV4dGVuZCh7XG4gIGNsb25lOiBmdW5jdGlvbiggZWxlbSwgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG4gICAgdmFyIGRlc3RFbGVtZW50cywgbm9kZSwgY2xvbmUsIGksIHNyY0VsZW1lbnRzLFxuICAgICAgaW5QYWdlID0galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblxuICAgIGlmICggc3VwcG9ydC5odG1sNUNsb25lIHx8IGpRdWVyeS5pc1hNTERvYyhlbGVtKSB8fCAhcm5vc2hpbWNhY2hlLnRlc3QoIFwiPFwiICsgZWxlbS5ub2RlTmFtZSArIFwiPlwiICkgKSB7XG4gICAgICBjbG9uZSA9IGVsZW0uY2xvbmVOb2RlKCB0cnVlICk7XG5cbiAgICAvLyBJRTw9OCBkb2VzIG5vdCBwcm9wZXJseSBjbG9uZSBkZXRhY2hlZCwgdW5rbm93biBlbGVtZW50IG5vZGVzXG4gICAgfSBlbHNlIHtcbiAgICAgIGZyYWdtZW50RGl2LmlubmVySFRNTCA9IGVsZW0ub3V0ZXJIVE1MO1xuICAgICAgZnJhZ21lbnREaXYucmVtb3ZlQ2hpbGQoIGNsb25lID0gZnJhZ21lbnREaXYuZmlyc3RDaGlsZCApO1xuICAgIH1cblxuICAgIGlmICggKCFzdXBwb3J0Lm5vQ2xvbmVFdmVudCB8fCAhc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCkgJiZcbiAgICAgICAgKGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgZWxlbS5ub2RlVHlwZSA9PT0gMTEpICYmICFqUXVlcnkuaXNYTUxEb2MoZWxlbSkgKSB7XG5cbiAgICAgIC8vIFdlIGVzY2hldyBTaXp6bGUgaGVyZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uczogaHR0cDovL2pzcGVyZi5jb20vZ2V0YWxsLXZzLXNpenpsZS8yXG4gICAgICBkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lICk7XG4gICAgICBzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXG4gICAgICAvLyBGaXggYWxsIElFIGNsb25pbmcgaXNzdWVzXG4gICAgICBmb3IgKCBpID0gMDsgKG5vZGUgPSBzcmNFbGVtZW50c1tpXSkgIT0gbnVsbDsgKytpICkge1xuICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgZGVzdGluYXRpb24gbm9kZSBpcyBub3QgbnVsbDsgRml4ZXMgIzk1ODdcbiAgICAgICAgaWYgKCBkZXN0RWxlbWVudHNbaV0gKSB7XG4gICAgICAgICAgZml4Q2xvbmVOb2RlSXNzdWVzKCBub2RlLCBkZXN0RWxlbWVudHNbaV0gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvcHkgdGhlIGV2ZW50cyBmcm9tIHRoZSBvcmlnaW5hbCB0byB0aGUgY2xvbmVcbiAgICBpZiAoIGRhdGFBbmRFdmVudHMgKSB7XG4gICAgICBpZiAoIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuICAgICAgICBzcmNFbGVtZW50cyA9IHNyY0VsZW1lbnRzIHx8IGdldEFsbCggZWxlbSApO1xuICAgICAgICBkZXN0RWxlbWVudHMgPSBkZXN0RWxlbWVudHMgfHwgZ2V0QWxsKCBjbG9uZSApO1xuXG4gICAgICAgIGZvciAoIGkgPSAwOyAobm9kZSA9IHNyY0VsZW1lbnRzW2ldKSAhPSBudWxsOyBpKysgKSB7XG4gICAgICAgICAgY2xvbmVDb3B5RXZlbnQoIG5vZGUsIGRlc3RFbGVtZW50c1tpXSApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbG9uZUNvcHlFdmVudCggZWxlbSwgY2xvbmUgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG4gICAgZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSwgXCJzY3JpcHRcIiApO1xuICAgIGlmICggZGVzdEVsZW1lbnRzLmxlbmd0aCA+IDAgKSB7XG4gICAgICBzZXRHbG9iYWxFdmFsKCBkZXN0RWxlbWVudHMsICFpblBhZ2UgJiYgZ2V0QWxsKCBlbGVtLCBcInNjcmlwdFwiICkgKTtcbiAgICB9XG5cbiAgICBkZXN0RWxlbWVudHMgPSBzcmNFbGVtZW50cyA9IG5vZGUgPSBudWxsO1xuXG4gICAgLy8gUmV0dXJuIHRoZSBjbG9uZWQgc2V0XG4gICAgcmV0dXJuIGNsb25lO1xuICB9LFxuXG4gIGJ1aWxkRnJhZ21lbnQ6IGZ1bmN0aW9uKCBlbGVtcywgY29udGV4dCwgc2NyaXB0cywgc2VsZWN0aW9uICkge1xuICAgIHZhciBqLCBlbGVtLCBjb250YWlucyxcbiAgICAgIHRtcCwgdGFnLCB0Ym9keSwgd3JhcCxcbiAgICAgIGwgPSBlbGVtcy5sZW5ndGgsXG5cbiAgICAgIC8vIEVuc3VyZSBhIHNhZmUgZnJhZ21lbnRcbiAgICAgIHNhZmUgPSBjcmVhdGVTYWZlRnJhZ21lbnQoIGNvbnRleHQgKSxcblxuICAgICAgbm9kZXMgPSBbXSxcbiAgICAgIGkgPSAwO1xuXG4gICAgZm9yICggOyBpIDwgbDsgaSsrICkge1xuICAgICAgZWxlbSA9IGVsZW1zWyBpIF07XG5cbiAgICAgIGlmICggZWxlbSB8fCBlbGVtID09PSAwICkge1xuXG4gICAgICAgIC8vIEFkZCBub2RlcyBkaXJlY3RseVxuICAgICAgICBpZiAoIGpRdWVyeS50eXBlKCBlbGVtICkgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgICAgICAgalF1ZXJ5Lm1lcmdlKCBub2RlcywgZWxlbS5ub2RlVHlwZSA/IFsgZWxlbSBdIDogZWxlbSApO1xuXG4gICAgICAgIC8vIENvbnZlcnQgbm9uLWh0bWwgaW50byBhIHRleHQgbm9kZVxuICAgICAgICB9IGVsc2UgaWYgKCAhcmh0bWwudGVzdCggZWxlbSApICkge1xuICAgICAgICAgIG5vZGVzLnB1c2goIGNvbnRleHQuY3JlYXRlVGV4dE5vZGUoIGVsZW0gKSApO1xuXG4gICAgICAgIC8vIENvbnZlcnQgaHRtbCBpbnRvIERPTSBub2Rlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRtcCA9IHRtcCB8fCBzYWZlLmFwcGVuZENoaWxkKCBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikgKTtcblxuICAgICAgICAgIC8vIERlc2VyaWFsaXplIGEgc3RhbmRhcmQgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICB0YWcgPSAocnRhZ05hbWUuZXhlYyggZWxlbSApIHx8IFsgXCJcIiwgXCJcIiBdKVsgMSBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgd3JhcCA9IHdyYXBNYXBbIHRhZyBdIHx8IHdyYXBNYXAuX2RlZmF1bHQ7XG5cbiAgICAgICAgICB0bXAuaW5uZXJIVE1MID0gd3JhcFsxXSArIGVsZW0ucmVwbGFjZSggcnhodG1sVGFnLCBcIjwkMT48LyQyPlwiICkgKyB3cmFwWzJdO1xuXG4gICAgICAgICAgLy8gRGVzY2VuZCB0aHJvdWdoIHdyYXBwZXJzIHRvIHRoZSByaWdodCBjb250ZW50XG4gICAgICAgICAgaiA9IHdyYXBbMF07XG4gICAgICAgICAgd2hpbGUgKCBqLS0gKSB7XG4gICAgICAgICAgICB0bXAgPSB0bXAubGFzdENoaWxkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE1hbnVhbGx5IGFkZCBsZWFkaW5nIHdoaXRlc3BhY2UgcmVtb3ZlZCBieSBJRVxuICAgICAgICAgIGlmICggIXN1cHBvcnQubGVhZGluZ1doaXRlc3BhY2UgJiYgcmxlYWRpbmdXaGl0ZXNwYWNlLnRlc3QoIGVsZW0gKSApIHtcbiAgICAgICAgICAgIG5vZGVzLnB1c2goIGNvbnRleHQuY3JlYXRlVGV4dE5vZGUoIHJsZWFkaW5nV2hpdGVzcGFjZS5leGVjKCBlbGVtIClbMF0gKSApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFJlbW92ZSBJRSdzIGF1dG9pbnNlcnRlZCA8dGJvZHk+IGZyb20gdGFibGUgZnJhZ21lbnRzXG4gICAgICAgICAgaWYgKCAhc3VwcG9ydC50Ym9keSApIHtcblxuICAgICAgICAgICAgLy8gU3RyaW5nIHdhcyBhIDx0YWJsZT4sICptYXkqIGhhdmUgc3B1cmlvdXMgPHRib2R5PlxuICAgICAgICAgICAgZWxlbSA9IHRhZyA9PT0gXCJ0YWJsZVwiICYmICFydGJvZHkudGVzdCggZWxlbSApID9cbiAgICAgICAgICAgICAgdG1wLmZpcnN0Q2hpbGQgOlxuXG4gICAgICAgICAgICAgIC8vIFN0cmluZyB3YXMgYSBiYXJlIDx0aGVhZD4gb3IgPHRmb290PlxuICAgICAgICAgICAgICB3cmFwWzFdID09PSBcIjx0YWJsZT5cIiAmJiAhcnRib2R5LnRlc3QoIGVsZW0gKSA/XG4gICAgICAgICAgICAgICAgdG1wIDpcbiAgICAgICAgICAgICAgICAwO1xuXG4gICAgICAgICAgICBqID0gZWxlbSAmJiBlbGVtLmNoaWxkTm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCBqLS0gKSB7XG4gICAgICAgICAgICAgIGlmICggalF1ZXJ5Lm5vZGVOYW1lKCAodGJvZHkgPSBlbGVtLmNoaWxkTm9kZXNbal0pLCBcInRib2R5XCIgKSAmJiAhdGJvZHkuY2hpbGROb2Rlcy5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVDaGlsZCggdGJvZHkgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGpRdWVyeS5tZXJnZSggbm9kZXMsIHRtcC5jaGlsZE5vZGVzICk7XG5cbiAgICAgICAgICAvLyBGaXggIzEyMzkyIGZvciBXZWJLaXQgYW5kIElFID4gOVxuICAgICAgICAgIHRtcC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgICAvLyBGaXggIzEyMzkyIGZvciBvbGRJRVxuICAgICAgICAgIHdoaWxlICggdG1wLmZpcnN0Q2hpbGQgKSB7XG4gICAgICAgICAgICB0bXAucmVtb3ZlQ2hpbGQoIHRtcC5maXJzdENoaWxkICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIHRvcC1sZXZlbCBjb250YWluZXIgZm9yIHByb3BlciBjbGVhbnVwXG4gICAgICAgICAgdG1wID0gc2FmZS5sYXN0Q2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaXggIzExMzU2OiBDbGVhciBlbGVtZW50cyBmcm9tIGZyYWdtZW50XG4gICAgaWYgKCB0bXAgKSB7XG4gICAgICBzYWZlLnJlbW92ZUNoaWxkKCB0bXAgKTtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBkZWZhdWx0Q2hlY2tlZCBmb3IgYW55IHJhZGlvcyBhbmQgY2hlY2tib3hlc1xuICAgIC8vIGFib3V0IHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBET00gaW4gSUUgNi83ICgjODA2MClcbiAgICBpZiAoICFzdXBwb3J0LmFwcGVuZENoZWNrZWQgKSB7XG4gICAgICBqUXVlcnkuZ3JlcCggZ2V0QWxsKCBub2RlcywgXCJpbnB1dFwiICksIGZpeERlZmF1bHRDaGVja2VkICk7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgd2hpbGUgKCAoZWxlbSA9IG5vZGVzWyBpKysgXSkgKSB7XG5cbiAgICAgIC8vICM0MDg3IC0gSWYgb3JpZ2luIGFuZCBkZXN0aW5hdGlvbiBlbGVtZW50cyBhcmUgdGhlIHNhbWUsIGFuZCB0aGlzIGlzXG4gICAgICAvLyB0aGF0IGVsZW1lbnQsIGRvIG5vdCBkbyBhbnl0aGluZ1xuICAgICAgaWYgKCBzZWxlY3Rpb24gJiYgalF1ZXJ5LmluQXJyYXkoIGVsZW0sIHNlbGVjdGlvbiApICE9PSAtMSApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnRhaW5zID0galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblxuICAgICAgLy8gQXBwZW5kIHRvIGZyYWdtZW50XG4gICAgICB0bXAgPSBnZXRBbGwoIHNhZmUuYXBwZW5kQ2hpbGQoIGVsZW0gKSwgXCJzY3JpcHRcIiApO1xuXG4gICAgICAvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG4gICAgICBpZiAoIGNvbnRhaW5zICkge1xuICAgICAgICBzZXRHbG9iYWxFdmFsKCB0bXAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FwdHVyZSBleGVjdXRhYmxlc1xuICAgICAgaWYgKCBzY3JpcHRzICkge1xuICAgICAgICBqID0gMDtcbiAgICAgICAgd2hpbGUgKCAoZWxlbSA9IHRtcFsgaisrIF0pICkge1xuICAgICAgICAgIGlmICggcnNjcmlwdFR5cGUudGVzdCggZWxlbS50eXBlIHx8IFwiXCIgKSApIHtcbiAgICAgICAgICAgIHNjcmlwdHMucHVzaCggZWxlbSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRtcCA9IG51bGw7XG5cbiAgICByZXR1cm4gc2FmZTtcbiAgfSxcblxuICBjbGVhbkRhdGE6IGZ1bmN0aW9uKCBlbGVtcywgLyogaW50ZXJuYWwgKi8gYWNjZXB0RGF0YSApIHtcbiAgICB2YXIgZWxlbSwgdHlwZSwgaWQsIGRhdGEsXG4gICAgICBpID0gMCxcbiAgICAgIGludGVybmFsS2V5ID0galF1ZXJ5LmV4cGFuZG8sXG4gICAgICBjYWNoZSA9IGpRdWVyeS5jYWNoZSxcbiAgICAgIGRlbGV0ZUV4cGFuZG8gPSBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8sXG4gICAgICBzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWw7XG5cbiAgICBmb3IgKCA7IChlbGVtID0gZWxlbXNbaV0pICE9IG51bGw7IGkrKyApIHtcbiAgICAgIGlmICggYWNjZXB0RGF0YSB8fCBqUXVlcnkuYWNjZXB0RGF0YSggZWxlbSApICkge1xuXG4gICAgICAgIGlkID0gZWxlbVsgaW50ZXJuYWxLZXkgXTtcbiAgICAgICAgZGF0YSA9IGlkICYmIGNhY2hlWyBpZCBdO1xuXG4gICAgICAgIGlmICggZGF0YSApIHtcbiAgICAgICAgICBpZiAoIGRhdGEuZXZlbnRzICkge1xuICAgICAgICAgICAgZm9yICggdHlwZSBpbiBkYXRhLmV2ZW50cyApIHtcbiAgICAgICAgICAgICAgaWYgKCBzcGVjaWFsWyB0eXBlIF0gKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSApO1xuXG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBzaG9ydGN1dCB0byBhdm9pZCBqUXVlcnkuZXZlbnQucmVtb3ZlJ3Mgb3ZlcmhlYWRcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGRhdGEuaGFuZGxlICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBSZW1vdmUgY2FjaGUgb25seSBpZiBpdCB3YXMgbm90IGFscmVhZHkgcmVtb3ZlZCBieSBqUXVlcnkuZXZlbnQucmVtb3ZlXG4gICAgICAgICAgaWYgKCBjYWNoZVsgaWQgXSApIHtcblxuICAgICAgICAgICAgZGVsZXRlIGNhY2hlWyBpZCBdO1xuXG4gICAgICAgICAgICAvLyBJRSBkb2VzIG5vdCBhbGxvdyB1cyB0byBkZWxldGUgZXhwYW5kbyBwcm9wZXJ0aWVzIGZyb20gbm9kZXMsXG4gICAgICAgICAgICAvLyBub3IgZG9lcyBpdCBoYXZlIGEgcmVtb3ZlQXR0cmlidXRlIGZ1bmN0aW9uIG9uIERvY3VtZW50IG5vZGVzO1xuICAgICAgICAgICAgLy8gd2UgbXVzdCBoYW5kbGUgYWxsIG9mIHRoZXNlIGNhc2VzXG4gICAgICAgICAgICBpZiAoIGRlbGV0ZUV4cGFuZG8gKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSBlbGVtWyBpbnRlcm5hbEtleSBdO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgZWxlbS5yZW1vdmVBdHRyaWJ1dGUgIT09IHN0cnVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIGludGVybmFsS2V5ICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsZW1bIGludGVybmFsS2V5IF0gPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGVkSWRzLnB1c2goIGlkICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHRleHQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgIGpRdWVyeS50ZXh0KCB0aGlzICkgOlxuICAgICAgICB0aGlzLmVtcHR5KCkuYXBwZW5kKCAoIHRoaXNbMF0gJiYgdGhpc1swXS5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50ICkuY3JlYXRlVGV4dE5vZGUoIHZhbHVlICkgKTtcbiAgICB9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuICB9LFxuXG4gIGFwcGVuZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICBpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoIGVsZW0gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBwcmVwZW5kOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kb21NYW5pcCggYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG4gICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoIGVsZW0sIHRhcmdldC5maXJzdENoaWxkICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgYmVmb3JlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kb21NYW5pcCggYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgYWZ0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgaWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMubmV4dFNpYmxpbmcgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICByZW1vdmU6IGZ1bmN0aW9uKCBzZWxlY3Rvciwga2VlcERhdGEgLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG4gICAgdmFyIGVsZW0sXG4gICAgICBlbGVtcyA9IHNlbGVjdG9yID8galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIHRoaXMgKSA6IHRoaXMsXG4gICAgICBpID0gMDtcblxuICAgIGZvciAoIDsgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXG4gICAgICBpZiAoICFrZWVwRGF0YSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuICAgICAgICBqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0gKSApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcbiAgICAgICAgaWYgKCBrZWVwRGF0YSAmJiBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApICkge1xuICAgICAgICAgIHNldEdsb2JhbEV2YWwoIGdldEFsbCggZWxlbSwgXCJzY3JpcHRcIiApICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlbGVtICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbGVtLFxuICAgICAgaSA9IDA7XG5cbiAgICBmb3IgKCA7IChlbGVtID0gdGhpc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuICAgICAgLy8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG4gICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG4gICAgICAgIGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgYW55IHJlbWFpbmluZyBub2Rlc1xuICAgICAgd2hpbGUgKCBlbGVtLmZpcnN0Q2hpbGQgKSB7XG4gICAgICAgIGVsZW0ucmVtb3ZlQ2hpbGQoIGVsZW0uZmlyc3RDaGlsZCApO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgc2VsZWN0LCBlbnN1cmUgdGhhdCBpdCBkaXNwbGF5cyBlbXB0eSAoIzEyMzM2KVxuICAgICAgLy8gU3VwcG9ydDogSUU8OVxuICAgICAgaWYgKCBlbGVtLm9wdGlvbnMgJiYgalF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcInNlbGVjdFwiICkgKSB7XG4gICAgICAgIGVsZW0ub3B0aW9ucy5sZW5ndGggPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGNsb25lOiBmdW5jdGlvbiggZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG4gICAgZGF0YUFuZEV2ZW50cyA9IGRhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGZhbHNlIDogZGF0YUFuZEV2ZW50cztcbiAgICBkZWVwRGF0YUFuZEV2ZW50cyA9IGRlZXBEYXRhQW5kRXZlbnRzID09IG51bGwgPyBkYXRhQW5kRXZlbnRzIDogZGVlcERhdGFBbmRFdmVudHM7XG5cbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4galF1ZXJ5LmNsb25lKCB0aGlzLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApO1xuICAgIH0pO1xuICB9LFxuXG4gIGh0bWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICB2YXIgZWxlbSA9IHRoaXNbIDAgXSB8fCB7fSxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIGwgPSB0aGlzLmxlbmd0aDtcblxuICAgICAgaWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICByZXR1cm4gZWxlbS5ub2RlVHlwZSA9PT0gMSA/XG4gICAgICAgICAgZWxlbS5pbm5lckhUTUwucmVwbGFjZSggcmlubGluZWpRdWVyeSwgXCJcIiApIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcbiAgICAgIGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICFybm9Jbm5lcmh0bWwudGVzdCggdmFsdWUgKSAmJlxuICAgICAgICAoIHN1cHBvcnQuaHRtbFNlcmlhbGl6ZSB8fCAhcm5vc2hpbWNhY2hlLnRlc3QoIHZhbHVlICkgICkgJiZcbiAgICAgICAgKCBzdXBwb3J0LmxlYWRpbmdXaGl0ZXNwYWNlIHx8ICFybGVhZGluZ1doaXRlc3BhY2UudGVzdCggdmFsdWUgKSApICYmXG4gICAgICAgICF3cmFwTWFwWyAocnRhZ05hbWUuZXhlYyggdmFsdWUgKSB8fCBbIFwiXCIsIFwiXCIgXSlbIDEgXS50b0xvd2VyQ2FzZSgpIF0gKSB7XG5cbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCByeGh0bWxUYWcsIFwiPCQxPjwvJDI+XCIgKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAoOyBpIDwgbDsgaSsrICkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG4gICAgICAgICAgICBlbGVtID0gdGhpc1tpXSB8fCB7fTtcbiAgICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgICAgICAgalF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtLCBmYWxzZSApICk7XG4gICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbSA9IDA7XG5cbiAgICAgICAgLy8gSWYgdXNpbmcgaW5uZXJIVE1MIHRocm93cyBhbiBleGNlcHRpb24sIHVzZSB0aGUgZmFsbGJhY2sgbWV0aG9kXG4gICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgIH1cblxuICAgICAgaWYgKCBlbGVtICkge1xuICAgICAgICB0aGlzLmVtcHR5KCkuYXBwZW5kKCB2YWx1ZSApO1xuICAgICAgfVxuICAgIH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG4gIH0sXG5cbiAgcmVwbGFjZVdpdGg6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmcgPSBhcmd1bWVudHNbIDAgXTtcblxuICAgIC8vIE1ha2UgdGhlIGNoYW5nZXMsIHJlcGxhY2luZyBlYWNoIGNvbnRleHQgZWxlbWVudCB3aXRoIHRoZSBuZXcgY29udGVudFxuICAgIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICBhcmcgPSB0aGlzLnBhcmVudE5vZGU7XG5cbiAgICAgIGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggdGhpcyApICk7XG5cbiAgICAgIGlmICggYXJnICkge1xuICAgICAgICBhcmcucmVwbGFjZUNoaWxkKCBlbGVtLCB0aGlzICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBGb3JjZSByZW1vdmFsIGlmIHRoZXJlIHdhcyBubyBuZXcgY29udGVudCAoZS5nLiwgZnJvbSBlbXB0eSBhcmd1bWVudHMpXG4gICAgcmV0dXJuIGFyZyAmJiAoYXJnLmxlbmd0aCB8fCBhcmcubm9kZVR5cGUpID8gdGhpcyA6IHRoaXMucmVtb3ZlKCk7XG4gIH0sXG5cbiAgZGV0YWNoOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlKCBzZWxlY3RvciwgdHJ1ZSApO1xuICB9LFxuXG4gIGRvbU1hbmlwOiBmdW5jdGlvbiggYXJncywgY2FsbGJhY2sgKSB7XG5cbiAgICAvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG4gICAgYXJncyA9IGNvbmNhdC5hcHBseSggW10sIGFyZ3MgKTtcblxuICAgIHZhciBmaXJzdCwgbm9kZSwgaGFzU2NyaXB0cyxcbiAgICAgIHNjcmlwdHMsIGRvYywgZnJhZ21lbnQsXG4gICAgICBpID0gMCxcbiAgICAgIGwgPSB0aGlzLmxlbmd0aCxcbiAgICAgIHNldCA9IHRoaXMsXG4gICAgICBpTm9DbG9uZSA9IGwgLSAxLFxuICAgICAgdmFsdWUgPSBhcmdzWzBdLFxuICAgICAgaXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG4gICAgLy8gV2UgY2FuJ3QgY2xvbmVOb2RlIGZyYWdtZW50cyB0aGF0IGNvbnRhaW4gY2hlY2tlZCwgaW4gV2ViS2l0XG4gICAgaWYgKCBpc0Z1bmN0aW9uIHx8XG4gICAgICAgICggbCA+IDEgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgIXN1cHBvcnQuY2hlY2tDbG9uZSAmJiByY2hlY2tlZC50ZXN0KCB2YWx1ZSApICkgKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBpbmRleCApIHtcbiAgICAgICAgdmFyIHNlbGYgPSBzZXQuZXEoIGluZGV4ICk7XG4gICAgICAgIGlmICggaXNGdW5jdGlvbiApIHtcbiAgICAgICAgICBhcmdzWzBdID0gdmFsdWUuY2FsbCggdGhpcywgaW5kZXgsIHNlbGYuaHRtbCgpICk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5kb21NYW5pcCggYXJncywgY2FsbGJhY2sgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICggbCApIHtcbiAgICAgIGZyYWdtZW50ID0galF1ZXJ5LmJ1aWxkRnJhZ21lbnQoIGFyZ3MsIHRoaXNbIDAgXS5vd25lckRvY3VtZW50LCBmYWxzZSwgdGhpcyApO1xuICAgICAgZmlyc3QgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG4gICAgICBpZiAoIGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICkge1xuICAgICAgICBmcmFnbWVudCA9IGZpcnN0O1xuICAgICAgfVxuXG4gICAgICBpZiAoIGZpcnN0ICkge1xuICAgICAgICBzY3JpcHRzID0galF1ZXJ5Lm1hcCggZ2V0QWxsKCBmcmFnbWVudCwgXCJzY3JpcHRcIiApLCBkaXNhYmxlU2NyaXB0ICk7XG4gICAgICAgIGhhc1NjcmlwdHMgPSBzY3JpcHRzLmxlbmd0aDtcblxuICAgICAgICAvLyBVc2UgdGhlIG9yaWdpbmFsIGZyYWdtZW50IGZvciB0aGUgbGFzdCBpdGVtIGluc3RlYWQgb2YgdGhlIGZpcnN0IGJlY2F1c2UgaXQgY2FuIGVuZCB1cFxuICAgICAgICAvLyBiZWluZyBlbXB0aWVkIGluY29ycmVjdGx5IGluIGNlcnRhaW4gc2l0dWF0aW9ucyAoIzgwNzApLlxuICAgICAgICBmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG4gICAgICAgICAgbm9kZSA9IGZyYWdtZW50O1xuXG4gICAgICAgICAgaWYgKCBpICE9PSBpTm9DbG9uZSApIHtcbiAgICAgICAgICAgIG5vZGUgPSBqUXVlcnkuY2xvbmUoIG5vZGUsIHRydWUsIHRydWUgKTtcblxuICAgICAgICAgICAgLy8gS2VlcCByZWZlcmVuY2VzIHRvIGNsb25lZCBzY3JpcHRzIGZvciBsYXRlciByZXN0b3JhdGlvblxuICAgICAgICAgICAgaWYgKCBoYXNTY3JpcHRzICkge1xuICAgICAgICAgICAgICBqUXVlcnkubWVyZ2UoIHNjcmlwdHMsIGdldEFsbCggbm9kZSwgXCJzY3JpcHRcIiApICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FsbGJhY2suY2FsbCggdGhpc1tpXSwgbm9kZSwgaSApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBoYXNTY3JpcHRzICkge1xuICAgICAgICAgIGRvYyA9IHNjcmlwdHNbIHNjcmlwdHMubGVuZ3RoIC0gMSBdLm93bmVyRG9jdW1lbnQ7XG5cbiAgICAgICAgICAvLyBSZWVuYWJsZSBzY3JpcHRzXG4gICAgICAgICAgalF1ZXJ5Lm1hcCggc2NyaXB0cywgcmVzdG9yZVNjcmlwdCApO1xuXG4gICAgICAgICAgLy8gRXZhbHVhdGUgZXhlY3V0YWJsZSBzY3JpcHRzIG9uIGZpcnN0IGRvY3VtZW50IGluc2VydGlvblxuICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgaGFzU2NyaXB0czsgaSsrICkge1xuICAgICAgICAgICAgbm9kZSA9IHNjcmlwdHNbIGkgXTtcbiAgICAgICAgICAgIGlmICggcnNjcmlwdFR5cGUudGVzdCggbm9kZS50eXBlIHx8IFwiXCIgKSAmJlxuICAgICAgICAgICAgICAhalF1ZXJ5Ll9kYXRhKCBub2RlLCBcImdsb2JhbEV2YWxcIiApICYmIGpRdWVyeS5jb250YWlucyggZG9jLCBub2RlICkgKSB7XG5cbiAgICAgICAgICAgICAgaWYgKCBub2RlLnNyYyApIHtcbiAgICAgICAgICAgICAgICAvLyBPcHRpb25hbCBBSkFYIGRlcGVuZGVuY3ksIGJ1dCB3b24ndCBydW4gc2NyaXB0cyBpZiBub3QgcHJlc2VudFxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5Ll9ldmFsVXJsICkge1xuICAgICAgICAgICAgICAgICAgalF1ZXJ5Ll9ldmFsVXJsKCBub2RlLnNyYyApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkuZ2xvYmFsRXZhbCggKCBub2RlLnRleHQgfHwgbm9kZS50ZXh0Q29udGVudCB8fCBub2RlLmlubmVySFRNTCB8fCBcIlwiICkucmVwbGFjZSggcmNsZWFuU2NyaXB0LCBcIlwiICkgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpeCAjMTE4MDk6IEF2b2lkIGxlYWtpbmcgbWVtb3J5XG4gICAgICAgIGZyYWdtZW50ID0gZmlyc3QgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59KTtcblxualF1ZXJ5LmVhY2goe1xuICBhcHBlbmRUbzogXCJhcHBlbmRcIixcbiAgcHJlcGVuZFRvOiBcInByZXBlbmRcIixcbiAgaW5zZXJ0QmVmb3JlOiBcImJlZm9yZVwiLFxuICBpbnNlcnRBZnRlcjogXCJhZnRlclwiLFxuICByZXBsYWNlQWxsOiBcInJlcGxhY2VXaXRoXCJcbn0sIGZ1bmN0aW9uKCBuYW1lLCBvcmlnaW5hbCApIHtcbiAgalF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgdmFyIGVsZW1zLFxuICAgICAgaSA9IDAsXG4gICAgICByZXQgPSBbXSxcbiAgICAgIGluc2VydCA9IGpRdWVyeSggc2VsZWN0b3IgKSxcbiAgICAgIGxhc3QgPSBpbnNlcnQubGVuZ3RoIC0gMTtcblxuICAgIGZvciAoIDsgaSA8PSBsYXN0OyBpKysgKSB7XG4gICAgICBlbGVtcyA9IGkgPT09IGxhc3QgPyB0aGlzIDogdGhpcy5jbG9uZSh0cnVlKTtcbiAgICAgIGpRdWVyeSggaW5zZXJ0W2ldIClbIG9yaWdpbmFsIF0oIGVsZW1zICk7XG5cbiAgICAgIC8vIE1vZGVybiBicm93c2VycyBjYW4gYXBwbHkgalF1ZXJ5IGNvbGxlY3Rpb25zIGFzIGFycmF5cywgYnV0IG9sZElFIG5lZWRzIGEgLmdldCgpXG4gICAgICBwdXNoLmFwcGx5KCByZXQsIGVsZW1zLmdldCgpICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCByZXQgKTtcbiAgfTtcbn0pO1xuXG5cbnZhciBpZnJhbWUsXG4gIGVsZW1kaXNwbGF5ID0ge307XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGFjdHVhbCBkaXNwbGF5IG9mIGEgZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgbm9kZU5hbWUgb2YgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgRG9jdW1lbnQgb2JqZWN0XG4gKi9cbi8vIENhbGxlZCBvbmx5IGZyb20gd2l0aGluIGRlZmF1bHREaXNwbGF5XG5mdW5jdGlvbiBhY3R1YWxEaXNwbGF5KCBuYW1lLCBkb2MgKSB7XG4gIHZhciBzdHlsZSxcbiAgICBlbGVtID0galF1ZXJ5KCBkb2MuY3JlYXRlRWxlbWVudCggbmFtZSApICkuYXBwZW5kVG8oIGRvYy5ib2R5ICksXG5cbiAgICAvLyBnZXREZWZhdWx0Q29tcHV0ZWRTdHlsZSBtaWdodCBiZSByZWxpYWJseSB1c2VkIG9ubHkgb24gYXR0YWNoZWQgZWxlbWVudFxuICAgIGRpc3BsYXkgPSB3aW5kb3cuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgJiYgKCBzdHlsZSA9IHdpbmRvdy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZSggZWxlbVsgMCBdICkgKSA/XG5cbiAgICAgIC8vIFVzZSBvZiB0aGlzIG1ldGhvZCBpcyBhIHRlbXBvcmFyeSBmaXggKG1vcmUgbGlrZSBvcHRtaXphdGlvbikgdW50aWwgc29tZXRoaW5nIGJldHRlciBjb21lcyBhbG9uZyxcbiAgICAgIC8vIHNpbmNlIGl0IHdhcyByZW1vdmVkIGZyb20gc3BlY2lmaWNhdGlvbiBhbmQgc3VwcG9ydGVkIG9ubHkgaW4gRkZcbiAgICAgIHN0eWxlLmRpc3BsYXkgOiBqUXVlcnkuY3NzKCBlbGVtWyAwIF0sIFwiZGlzcGxheVwiICk7XG5cbiAgLy8gV2UgZG9uJ3QgaGF2ZSBhbnkgZGF0YSBzdG9yZWQgb24gdGhlIGVsZW1lbnQsXG4gIC8vIHNvIHVzZSBcImRldGFjaFwiIG1ldGhvZCBhcyBmYXN0IHdheSB0byBnZXQgcmlkIG9mIHRoZSBlbGVtZW50XG4gIGVsZW0uZGV0YWNoKCk7XG5cbiAgcmV0dXJuIGRpc3BsYXk7XG59XG5cbi8qKlxuICogVHJ5IHRvIGRldGVybWluZSB0aGUgZGVmYXVsdCBkaXNwbGF5IHZhbHVlIG9mIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBub2RlTmFtZVxuICovXG5mdW5jdGlvbiBkZWZhdWx0RGlzcGxheSggbm9kZU5hbWUgKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudCxcbiAgICBkaXNwbGF5ID0gZWxlbWRpc3BsYXlbIG5vZGVOYW1lIF07XG5cbiAgaWYgKCAhZGlzcGxheSApIHtcbiAgICBkaXNwbGF5ID0gYWN0dWFsRGlzcGxheSggbm9kZU5hbWUsIGRvYyApO1xuXG4gICAgLy8gSWYgdGhlIHNpbXBsZSB3YXkgZmFpbHMsIHJlYWQgZnJvbSBpbnNpZGUgYW4gaWZyYW1lXG4gICAgaWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiB8fCAhZGlzcGxheSApIHtcblxuICAgICAgLy8gVXNlIHRoZSBhbHJlYWR5LWNyZWF0ZWQgaWZyYW1lIGlmIHBvc3NpYmxlXG4gICAgICBpZnJhbWUgPSAoaWZyYW1lIHx8IGpRdWVyeSggXCI8aWZyYW1lIGZyYW1lYm9yZGVyPScwJyB3aWR0aD0nMCcgaGVpZ2h0PScwJy8+XCIgKSkuYXBwZW5kVG8oIGRvYy5kb2N1bWVudEVsZW1lbnQgKTtcblxuICAgICAgLy8gQWx3YXlzIHdyaXRlIGEgbmV3IEhUTUwgc2tlbGV0b24gc28gV2Via2l0IGFuZCBGaXJlZm94IGRvbid0IGNob2tlIG9uIHJldXNlXG4gICAgICBkb2MgPSAoIGlmcmFtZVsgMCBdLmNvbnRlbnRXaW5kb3cgfHwgaWZyYW1lWyAwIF0uY29udGVudERvY3VtZW50ICkuZG9jdW1lbnQ7XG5cbiAgICAgIC8vIFN1cHBvcnQ6IElFXG4gICAgICBkb2Mud3JpdGUoKTtcbiAgICAgIGRvYy5jbG9zZSgpO1xuXG4gICAgICBkaXNwbGF5ID0gYWN0dWFsRGlzcGxheSggbm9kZU5hbWUsIGRvYyApO1xuICAgICAgaWZyYW1lLmRldGFjaCgpO1xuICAgIH1cblxuICAgIC8vIFN0b3JlIHRoZSBjb3JyZWN0IGRlZmF1bHQgZGlzcGxheVxuICAgIGVsZW1kaXNwbGF5WyBub2RlTmFtZSBdID0gZGlzcGxheTtcbiAgfVxuXG4gIHJldHVybiBkaXNwbGF5O1xufVxuXG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIHNocmlua1dyYXBCbG9ja3NWYWw7XG5cbiAgc3VwcG9ydC5zaHJpbmtXcmFwQmxvY2tzID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCBzaHJpbmtXcmFwQmxvY2tzVmFsICE9IG51bGwgKSB7XG4gICAgICByZXR1cm4gc2hyaW5rV3JhcEJsb2Nrc1ZhbDtcbiAgICB9XG5cbiAgICAvLyBXaWxsIGJlIGNoYW5nZWQgbGF0ZXIgaWYgbmVlZGVkLlxuICAgIHNocmlua1dyYXBCbG9ja3NWYWwgPSBmYWxzZTtcblxuICAgIC8vIE1pbmlmaWVkOiB2YXIgYixjLGRcbiAgICB2YXIgZGl2LCBib2R5LCBjb250YWluZXI7XG5cbiAgICBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwiYm9keVwiIClbIDAgXTtcbiAgICBpZiAoICFib2R5IHx8ICFib2R5LnN0eWxlICkge1xuICAgICAgLy8gVGVzdCBmaXJlZCB0b28gZWFybHkgb3IgaW4gYW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnQsIGV4aXQuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2V0dXBcbiAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG4gICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXI6MDt3aWR0aDowO2hlaWdodDowO3RvcDowO2xlZnQ6LTk5OTlweFwiO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuICAgIC8vIFN1cHBvcnQ6IElFNlxuICAgIC8vIENoZWNrIGlmIGVsZW1lbnRzIHdpdGggbGF5b3V0IHNocmluay13cmFwIHRoZWlyIGNoaWxkcmVuXG4gICAgaWYgKCB0eXBlb2YgZGl2LnN0eWxlLnpvb20gIT09IHN0cnVuZGVmaW5lZCApIHtcbiAgICAgIC8vIFJlc2V0IENTUzogYm94LXNpemluZzsgZGlzcGxheTsgbWFyZ2luOyBib3JkZXJcbiAgICAgIGRpdi5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgLy8gU3VwcG9ydDogRmlyZWZveDwyOSwgQW5kcm9pZCAyLjNcbiAgICAgICAgLy8gVmVuZG9yLXByZWZpeCBib3gtc2l6aW5nXG4gICAgICAgIFwiLXdlYmtpdC1ib3gtc2l6aW5nOmNvbnRlbnQtYm94Oy1tb3otYm94LXNpemluZzpjb250ZW50LWJveDtcIiArXG4gICAgICAgIFwiYm94LXNpemluZzpjb250ZW50LWJveDtkaXNwbGF5OmJsb2NrO21hcmdpbjowO2JvcmRlcjowO1wiICtcbiAgICAgICAgXCJwYWRkaW5nOjFweDt3aWR0aDoxcHg7em9vbToxXCI7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApLnN0eWxlLndpZHRoID0gXCI1cHhcIjtcbiAgICAgIHNocmlua1dyYXBCbG9ja3NWYWwgPSBkaXYub2Zmc2V0V2lkdGggIT09IDM7XG4gICAgfVxuXG4gICAgYm9keS5yZW1vdmVDaGlsZCggY29udGFpbmVyICk7XG5cbiAgICByZXR1cm4gc2hyaW5rV3JhcEJsb2Nrc1ZhbDtcbiAgfTtcblxufSkoKTtcbnZhciBybWFyZ2luID0gKC9ebWFyZ2luLyk7XG5cbnZhciBybnVtbm9ucHggPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKD8hcHgpW2EteiVdKyRcIiwgXCJpXCIgKTtcblxuXG5cbnZhciBnZXRTdHlsZXMsIGN1ckNTUyxcbiAgcnBvc2l0aW9uID0gL14odG9wfHJpZ2h0fGJvdHRvbXxsZWZ0KSQvO1xuXG5pZiAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlICkge1xuICBnZXRTdHlsZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAvLyBTdXBwb3J0OiBJRTw9MTErLCBGaXJlZm94PD0zMCsgKCMxNTA5OCwgIzE0MTUwKVxuICAgIC8vIElFIHRocm93cyBvbiBlbGVtZW50cyBjcmVhdGVkIGluIHBvcHVwc1xuICAgIC8vIEZGIG1lYW53aGlsZSB0aHJvd3Mgb24gZnJhbWUgZWxlbWVudHMgdGhyb3VnaCBcImRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGVcIlxuICAgIGlmICggZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3Lm9wZW5lciApIHtcbiAgICAgIHJldHVybiBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSwgbnVsbCApO1xuICAgIH1cblxuICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSwgbnVsbCApO1xuICB9O1xuXG4gIGN1ckNTUyA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBjb21wdXRlZCApIHtcbiAgICB2YXIgd2lkdGgsIG1pbldpZHRoLCBtYXhXaWR0aCwgcmV0LFxuICAgICAgc3R5bGUgPSBlbGVtLnN0eWxlO1xuXG4gICAgY29tcHV0ZWQgPSBjb21wdXRlZCB8fCBnZXRTdHlsZXMoIGVsZW0gKTtcblxuICAgIC8vIGdldFByb3BlcnR5VmFsdWUgaXMgb25seSBuZWVkZWQgZm9yIC5jc3MoJ2ZpbHRlcicpIGluIElFOSwgc2VlICMxMjUzN1xuICAgIHJldCA9IGNvbXB1dGVkID8gY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSggbmFtZSApIHx8IGNvbXB1dGVkWyBuYW1lIF0gOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoIGNvbXB1dGVkICkge1xuXG4gICAgICBpZiAoIHJldCA9PT0gXCJcIiAmJiAhalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSApIHtcbiAgICAgICAgcmV0ID0galF1ZXJ5LnN0eWxlKCBlbGVtLCBuYW1lICk7XG4gICAgICB9XG5cbiAgICAgIC8vIEEgdHJpYnV0ZSB0byB0aGUgXCJhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXCJcbiAgICAgIC8vIENocm9tZSA8IDE3IGFuZCBTYWZhcmkgNS4wIHVzZXMgXCJjb21wdXRlZCB2YWx1ZVwiIGluc3RlYWQgb2YgXCJ1c2VkIHZhbHVlXCIgZm9yIG1hcmdpbi1yaWdodFxuICAgICAgLy8gU2FmYXJpIDUuMS43IChhdCBsZWFzdCkgcmV0dXJucyBwZXJjZW50YWdlIGZvciBhIGxhcmdlciBzZXQgb2YgdmFsdWVzLCBidXQgd2lkdGggc2VlbXMgdG8gYmUgcmVsaWFibHkgcGl4ZWxzXG4gICAgICAvLyB0aGlzIGlzIGFnYWluc3QgdGhlIENTU09NIGRyYWZ0IHNwZWM6IGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzc29tLyNyZXNvbHZlZC12YWx1ZXNcbiAgICAgIGlmICggcm51bW5vbnB4LnRlc3QoIHJldCApICYmIHJtYXJnaW4udGVzdCggbmFtZSApICkge1xuXG4gICAgICAgIC8vIFJlbWVtYmVyIHRoZSBvcmlnaW5hbCB2YWx1ZXNcbiAgICAgICAgd2lkdGggPSBzdHlsZS53aWR0aDtcbiAgICAgICAgbWluV2lkdGggPSBzdHlsZS5taW5XaWR0aDtcbiAgICAgICAgbWF4V2lkdGggPSBzdHlsZS5tYXhXaWR0aDtcblxuICAgICAgICAvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG4gICAgICAgIHN0eWxlLm1pbldpZHRoID0gc3R5bGUubWF4V2lkdGggPSBzdHlsZS53aWR0aCA9IHJldDtcbiAgICAgICAgcmV0ID0gY29tcHV0ZWQud2lkdGg7XG5cbiAgICAgICAgLy8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuICAgICAgICBzdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBzdHlsZS5taW5XaWR0aCA9IG1pbldpZHRoO1xuICAgICAgICBzdHlsZS5tYXhXaWR0aCA9IG1heFdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN1cHBvcnQ6IElFXG4gICAgLy8gSUUgcmV0dXJucyB6SW5kZXggdmFsdWUgYXMgYW4gaW50ZWdlci5cbiAgICByZXR1cm4gcmV0ID09PSB1bmRlZmluZWQgP1xuICAgICAgcmV0IDpcbiAgICAgIHJldCArIFwiXCI7XG4gIH07XG59IGVsc2UgaWYgKCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY3VycmVudFN0eWxlICkge1xuICBnZXRTdHlsZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4gZWxlbS5jdXJyZW50U3R5bGU7XG4gIH07XG5cbiAgY3VyQ1NTID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGNvbXB1dGVkICkge1xuICAgIHZhciBsZWZ0LCBycywgcnNMZWZ0LCByZXQsXG4gICAgICBzdHlsZSA9IGVsZW0uc3R5bGU7XG5cbiAgICBjb21wdXRlZCA9IGNvbXB1dGVkIHx8IGdldFN0eWxlcyggZWxlbSApO1xuICAgIHJldCA9IGNvbXB1dGVkID8gY29tcHV0ZWRbIG5hbWUgXSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIEF2b2lkIHNldHRpbmcgcmV0IHRvIGVtcHR5IHN0cmluZyBoZXJlXG4gICAgLy8gc28gd2UgZG9uJ3QgZGVmYXVsdCB0byBhdXRvXG4gICAgaWYgKCByZXQgPT0gbnVsbCAmJiBzdHlsZSAmJiBzdHlsZVsgbmFtZSBdICkge1xuICAgICAgcmV0ID0gc3R5bGVbIG5hbWUgXTtcbiAgICB9XG5cbiAgICAvLyBGcm9tIHRoZSBhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXG4gICAgLy8gaHR0cDovL2VyaWsuZWFlLm5ldC9hcmNoaXZlcy8yMDA3LzA3LzI3LzE4LjU0LjE1LyNjb21tZW50LTEwMjI5MVxuXG4gICAgLy8gSWYgd2UncmUgbm90IGRlYWxpbmcgd2l0aCBhIHJlZ3VsYXIgcGl4ZWwgbnVtYmVyXG4gICAgLy8gYnV0IGEgbnVtYmVyIHRoYXQgaGFzIGEgd2VpcmQgZW5kaW5nLCB3ZSBuZWVkIHRvIGNvbnZlcnQgaXQgdG8gcGl4ZWxzXG4gICAgLy8gYnV0IG5vdCBwb3NpdGlvbiBjc3MgYXR0cmlidXRlcywgYXMgdGhvc2UgYXJlIHByb3BvcnRpb25hbCB0byB0aGUgcGFyZW50IGVsZW1lbnQgaW5zdGVhZFxuICAgIC8vIGFuZCB3ZSBjYW4ndCBtZWFzdXJlIHRoZSBwYXJlbnQgaW5zdGVhZCBiZWNhdXNlIGl0IG1pZ2h0IHRyaWdnZXIgYSBcInN0YWNraW5nIGRvbGxzXCIgcHJvYmxlbVxuICAgIGlmICggcm51bW5vbnB4LnRlc3QoIHJldCApICYmICFycG9zaXRpb24udGVzdCggbmFtZSApICkge1xuXG4gICAgICAvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXG4gICAgICBsZWZ0ID0gc3R5bGUubGVmdDtcbiAgICAgIHJzID0gZWxlbS5ydW50aW1lU3R5bGU7XG4gICAgICByc0xlZnQgPSBycyAmJiBycy5sZWZ0O1xuXG4gICAgICAvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG4gICAgICBpZiAoIHJzTGVmdCApIHtcbiAgICAgICAgcnMubGVmdCA9IGVsZW0uY3VycmVudFN0eWxlLmxlZnQ7XG4gICAgICB9XG4gICAgICBzdHlsZS5sZWZ0ID0gbmFtZSA9PT0gXCJmb250U2l6ZVwiID8gXCIxZW1cIiA6IHJldDtcbiAgICAgIHJldCA9IHN0eWxlLnBpeGVsTGVmdCArIFwicHhcIjtcblxuICAgICAgLy8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuICAgICAgc3R5bGUubGVmdCA9IGxlZnQ7XG4gICAgICBpZiAoIHJzTGVmdCApIHtcbiAgICAgICAgcnMubGVmdCA9IHJzTGVmdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdXBwb3J0OiBJRVxuICAgIC8vIElFIHJldHVybnMgekluZGV4IHZhbHVlIGFzIGFuIGludGVnZXIuXG4gICAgcmV0dXJuIHJldCA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHJldCA6XG4gICAgICByZXQgKyBcIlwiIHx8IFwiYXV0b1wiO1xuICB9O1xufVxuXG5cblxuXG5mdW5jdGlvbiBhZGRHZXRIb29rSWYoIGNvbmRpdGlvbkZuLCBob29rRm4gKSB7XG4gIC8vIERlZmluZSB0aGUgaG9vaywgd2UnbGwgY2hlY2sgb24gdGhlIGZpcnN0IHJ1biBpZiBpdCdzIHJlYWxseSBuZWVkZWQuXG4gIHJldHVybiB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjb25kaXRpb24gPSBjb25kaXRpb25GbigpO1xuXG4gICAgICBpZiAoIGNvbmRpdGlvbiA9PSBudWxsICkge1xuICAgICAgICAvLyBUaGUgdGVzdCB3YXMgbm90IHJlYWR5IGF0IHRoaXMgcG9pbnQ7IHNjcmV3IHRoZSBob29rIHRoaXMgdGltZVxuICAgICAgICAvLyBidXQgY2hlY2sgYWdhaW4gd2hlbiBuZWVkZWQgbmV4dCB0aW1lLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICggY29uZGl0aW9uICkge1xuICAgICAgICAvLyBIb29rIG5vdCBuZWVkZWQgKG9yIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBpdCBkdWUgdG8gbWlzc2luZyBkZXBlbmRlbmN5KSxcbiAgICAgICAgLy8gcmVtb3ZlIGl0LlxuICAgICAgICAvLyBTaW5jZSB0aGVyZSBhcmUgbm8gb3RoZXIgaG9va3MgZm9yIG1hcmdpblJpZ2h0LCByZW1vdmUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAgICAgZGVsZXRlIHRoaXMuZ2V0O1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEhvb2sgbmVlZGVkOyByZWRlZmluZSBpdCBzbyB0aGF0IHRoZSBzdXBwb3J0IHRlc3QgaXMgbm90IGV4ZWN1dGVkIGFnYWluLlxuXG4gICAgICByZXR1cm4gKHRoaXMuZ2V0ID0gaG9va0ZuKS5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgfVxuICB9O1xufVxuXG5cbihmdW5jdGlvbigpIHtcbiAgLy8gTWluaWZpZWQ6IHZhciBiLGMsZCxlLGYsZywgaCxpXG4gIHZhciBkaXYsIHN0eWxlLCBhLCBwaXhlbFBvc2l0aW9uVmFsLCBib3hTaXppbmdSZWxpYWJsZVZhbCxcbiAgICByZWxpYWJsZUhpZGRlbk9mZnNldHNWYWwsIHJlbGlhYmxlTWFyZ2luUmlnaHRWYWw7XG5cbiAgLy8gU2V0dXBcbiAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuICBkaXYuaW5uZXJIVE1MID0gXCIgIDxsaW5rLz48dGFibGU+PC90YWJsZT48YSBocmVmPScvYSc+YTwvYT48aW5wdXQgdHlwZT0nY2hlY2tib3gnLz5cIjtcbiAgYSA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJhXCIgKVsgMCBdO1xuICBzdHlsZSA9IGEgJiYgYS5zdHlsZTtcblxuICAvLyBGaW5pc2ggZWFybHkgaW4gbGltaXRlZCAobm9uLWJyb3dzZXIpIGVudmlyb25tZW50c1xuICBpZiAoICFzdHlsZSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdHlsZS5jc3NUZXh0ID0gXCJmbG9hdDpsZWZ0O29wYWNpdHk6LjVcIjtcblxuICAvLyBTdXBwb3J0OiBJRTw5XG4gIC8vIE1ha2Ugc3VyZSB0aGF0IGVsZW1lbnQgb3BhY2l0eSBleGlzdHMgKGFzIG9wcG9zZWQgdG8gZmlsdGVyKVxuICBzdXBwb3J0Lm9wYWNpdHkgPSBzdHlsZS5vcGFjaXR5ID09PSBcIjAuNVwiO1xuXG4gIC8vIFZlcmlmeSBzdHlsZSBmbG9hdCBleGlzdGVuY2VcbiAgLy8gKElFIHVzZXMgc3R5bGVGbG9hdCBpbnN0ZWFkIG9mIGNzc0Zsb2F0KVxuICBzdXBwb3J0LmNzc0Zsb2F0ID0gISFzdHlsZS5jc3NGbG9hdDtcblxuICBkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcImNvbnRlbnQtYm94XCI7XG4gIGRpdi5jbG9uZU5vZGUoIHRydWUgKS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiXCI7XG4gIHN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlID0gZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID09PSBcImNvbnRlbnQtYm94XCI7XG5cbiAgLy8gU3VwcG9ydDogRmlyZWZveDwyOSwgQW5kcm9pZCAyLjNcbiAgLy8gVmVuZG9yLXByZWZpeCBib3gtc2l6aW5nXG4gIHN1cHBvcnQuYm94U2l6aW5nID0gc3R5bGUuYm94U2l6aW5nID09PSBcIlwiIHx8IHN0eWxlLk1vekJveFNpemluZyA9PT0gXCJcIiB8fFxuICAgIHN0eWxlLldlYmtpdEJveFNpemluZyA9PT0gXCJcIjtcblxuICBqUXVlcnkuZXh0ZW5kKHN1cHBvcnQsIHtcbiAgICByZWxpYWJsZUhpZGRlbk9mZnNldHM6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCByZWxpYWJsZUhpZGRlbk9mZnNldHNWYWwgPT0gbnVsbCApIHtcbiAgICAgICAgY29tcHV0ZVN0eWxlVGVzdHMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZWxpYWJsZUhpZGRlbk9mZnNldHNWYWw7XG4gICAgfSxcblxuICAgIGJveFNpemluZ1JlbGlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICggYm94U2l6aW5nUmVsaWFibGVWYWwgPT0gbnVsbCApIHtcbiAgICAgICAgY29tcHV0ZVN0eWxlVGVzdHMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBib3hTaXppbmdSZWxpYWJsZVZhbDtcbiAgICB9LFxuXG4gICAgcGl4ZWxQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIHBpeGVsUG9zaXRpb25WYWwgPT0gbnVsbCApIHtcbiAgICAgICAgY29tcHV0ZVN0eWxlVGVzdHMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwaXhlbFBvc2l0aW9uVmFsO1xuICAgIH0sXG5cbiAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDIuM1xuICAgIHJlbGlhYmxlTWFyZ2luUmlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCByZWxpYWJsZU1hcmdpblJpZ2h0VmFsID09IG51bGwgKSB7XG4gICAgICAgIGNvbXB1dGVTdHlsZVRlc3RzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVsaWFibGVNYXJnaW5SaWdodFZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNvbXB1dGVTdHlsZVRlc3RzKCkge1xuICAgIC8vIE1pbmlmaWVkOiB2YXIgYixjLGQsalxuICAgIHZhciBkaXYsIGJvZHksIGNvbnRhaW5lciwgY29udGVudHM7XG5cbiAgICBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwiYm9keVwiIClbIDAgXTtcbiAgICBpZiAoICFib2R5IHx8ICFib2R5LnN0eWxlICkge1xuICAgICAgLy8gVGVzdCBmaXJlZCB0b28gZWFybHkgb3IgaW4gYW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnQsIGV4aXQuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2V0dXBcbiAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG4gICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXI6MDt3aWR0aDowO2hlaWdodDowO3RvcDowO2xlZnQ6LTk5OTlweFwiO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuICAgIGRpdi5zdHlsZS5jc3NUZXh0ID1cbiAgICAgIC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjksIEFuZHJvaWQgMi4zXG4gICAgICAvLyBWZW5kb3ItcHJlZml4IGJveC1zaXppbmdcbiAgICAgIFwiLXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7XCIgK1xuICAgICAgXCJib3gtc2l6aW5nOmJvcmRlci1ib3g7ZGlzcGxheTpibG9jazttYXJnaW4tdG9wOjElO3RvcDoxJTtcIiArXG4gICAgICBcImJvcmRlcjoxcHg7cGFkZGluZzoxcHg7d2lkdGg6NHB4O3Bvc2l0aW9uOmFic29sdXRlXCI7XG5cbiAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgLy8gQXNzdW1lIHJlYXNvbmFibGUgdmFsdWVzIGluIHRoZSBhYnNlbmNlIG9mIGdldENvbXB1dGVkU3R5bGVcbiAgICBwaXhlbFBvc2l0aW9uVmFsID0gYm94U2l6aW5nUmVsaWFibGVWYWwgPSBmYWxzZTtcbiAgICByZWxpYWJsZU1hcmdpblJpZ2h0VmFsID0gdHJ1ZTtcblxuICAgIC8vIENoZWNrIGZvciBnZXRDb21wdXRlZFN0eWxlIHNvIHRoYXQgdGhpcyBjb2RlIGlzIG5vdCBydW4gaW4gSUU8OS5cbiAgICBpZiAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlICkge1xuICAgICAgcGl4ZWxQb3NpdGlvblZhbCA9ICggd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRpdiwgbnVsbCApIHx8IHt9ICkudG9wICE9PSBcIjElXCI7XG4gICAgICBib3hTaXppbmdSZWxpYWJsZVZhbCA9XG4gICAgICAgICggd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRpdiwgbnVsbCApIHx8IHsgd2lkdGg6IFwiNHB4XCIgfSApLndpZHRoID09PSBcIjRweFwiO1xuXG4gICAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDIuM1xuICAgICAgLy8gRGl2IHdpdGggZXhwbGljaXQgd2lkdGggYW5kIG5vIG1hcmdpbi1yaWdodCBpbmNvcnJlY3RseVxuICAgICAgLy8gZ2V0cyBjb21wdXRlZCBtYXJnaW4tcmlnaHQgYmFzZWQgb24gd2lkdGggb2YgY29udGFpbmVyICgjMzMzMylcbiAgICAgIC8vIFdlYktpdCBCdWcgMTMzNDMgLSBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgd3JvbmcgdmFsdWUgZm9yIG1hcmdpbi1yaWdodFxuICAgICAgY29udGVudHMgPSBkaXYuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApO1xuXG4gICAgICAvLyBSZXNldCBDU1M6IGJveC1zaXppbmc7IGRpc3BsYXk7IG1hcmdpbjsgYm9yZGVyOyBwYWRkaW5nXG4gICAgICBjb250ZW50cy5zdHlsZS5jc3NUZXh0ID0gZGl2LnN0eWxlLmNzc1RleHQgPVxuICAgICAgICAvLyBTdXBwb3J0OiBGaXJlZm94PDI5LCBBbmRyb2lkIDIuM1xuICAgICAgICAvLyBWZW5kb3ItcHJlZml4IGJveC1zaXppbmdcbiAgICAgICAgXCItd2Via2l0LWJveC1zaXppbmc6Y29udGVudC1ib3g7LW1vei1ib3gtc2l6aW5nOmNvbnRlbnQtYm94O1wiICtcbiAgICAgICAgXCJib3gtc2l6aW5nOmNvbnRlbnQtYm94O2Rpc3BsYXk6YmxvY2s7bWFyZ2luOjA7Ym9yZGVyOjA7cGFkZGluZzowXCI7XG4gICAgICBjb250ZW50cy5zdHlsZS5tYXJnaW5SaWdodCA9IGNvbnRlbnRzLnN0eWxlLndpZHRoID0gXCIwXCI7XG4gICAgICBkaXYuc3R5bGUud2lkdGggPSBcIjFweFwiO1xuXG4gICAgICByZWxpYWJsZU1hcmdpblJpZ2h0VmFsID1cbiAgICAgICAgIXBhcnNlRmxvYXQoICggd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGNvbnRlbnRzLCBudWxsICkgfHwge30gKS5tYXJnaW5SaWdodCApO1xuXG4gICAgICBkaXYucmVtb3ZlQ2hpbGQoIGNvbnRlbnRzICk7XG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydDogSUU4XG4gICAgLy8gQ2hlY2sgaWYgdGFibGUgY2VsbHMgc3RpbGwgaGF2ZSBvZmZzZXRXaWR0aC9IZWlnaHQgd2hlbiB0aGV5IGFyZSBzZXRcbiAgICAvLyB0byBkaXNwbGF5Om5vbmUgYW5kIHRoZXJlIGFyZSBzdGlsbCBvdGhlciB2aXNpYmxlIHRhYmxlIGNlbGxzIGluIGFcbiAgICAvLyB0YWJsZSByb3c7IGlmIHNvLCBvZmZzZXRXaWR0aC9IZWlnaHQgYXJlIG5vdCByZWxpYWJsZSBmb3IgdXNlIHdoZW5cbiAgICAvLyBkZXRlcm1pbmluZyBpZiBhbiBlbGVtZW50IGhhcyBiZWVuIGhpZGRlbiBkaXJlY3RseSB1c2luZ1xuICAgIC8vIGRpc3BsYXk6bm9uZSAoaXQgaXMgc3RpbGwgc2FmZSB0byB1c2Ugb2Zmc2V0cyBpZiBhIHBhcmVudCBlbGVtZW50IGlzXG4gICAgLy8gaGlkZGVuOyBkb24gc2FmZXR5IGdvZ2dsZXMgYW5kIHNlZSBidWcgIzQ1MTIgZm9yIG1vcmUgaW5mb3JtYXRpb24pLlxuICAgIGRpdi5pbm5lckhUTUwgPSBcIjx0YWJsZT48dHI+PHRkPjwvdGQ+PHRkPnQ8L3RkPjwvdHI+PC90YWJsZT5cIjtcbiAgICBjb250ZW50cyA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJ0ZFwiICk7XG4gICAgY29udGVudHNbIDAgXS5zdHlsZS5jc3NUZXh0ID0gXCJtYXJnaW46MDtib3JkZXI6MDtwYWRkaW5nOjA7ZGlzcGxheTpub25lXCI7XG4gICAgcmVsaWFibGVIaWRkZW5PZmZzZXRzVmFsID0gY29udGVudHNbIDAgXS5vZmZzZXRIZWlnaHQgPT09IDA7XG4gICAgaWYgKCByZWxpYWJsZUhpZGRlbk9mZnNldHNWYWwgKSB7XG4gICAgICBjb250ZW50c1sgMCBdLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgY29udGVudHNbIDEgXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICByZWxpYWJsZUhpZGRlbk9mZnNldHNWYWwgPSBjb250ZW50c1sgMCBdLm9mZnNldEhlaWdodCA9PT0gMDtcbiAgICB9XG5cbiAgICBib2R5LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcbiAgfVxuXG59KSgpO1xuXG5cbi8vIEEgbWV0aG9kIGZvciBxdWlja2x5IHN3YXBwaW5nIGluL291dCBDU1MgcHJvcGVydGllcyB0byBnZXQgY29ycmVjdCBjYWxjdWxhdGlvbnMuXG5qUXVlcnkuc3dhcCA9IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBjYWxsYmFjaywgYXJncyApIHtcbiAgdmFyIHJldCwgbmFtZSxcbiAgICBvbGQgPSB7fTtcblxuICAvLyBSZW1lbWJlciB0aGUgb2xkIHZhbHVlcywgYW5kIGluc2VydCB0aGUgbmV3IG9uZXNcbiAgZm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuICAgIG9sZFsgbmFtZSBdID0gZWxlbS5zdHlsZVsgbmFtZSBdO1xuICAgIGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9wdGlvbnNbIG5hbWUgXTtcbiAgfVxuXG4gIHJldCA9IGNhbGxiYWNrLmFwcGx5KCBlbGVtLCBhcmdzIHx8IFtdICk7XG5cbiAgLy8gUmV2ZXJ0IHRoZSBvbGQgdmFsdWVzXG4gIGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcbiAgICBlbGVtLnN0eWxlWyBuYW1lIF0gPSBvbGRbIG5hbWUgXTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuXG5cbnZhclxuICAgIHJhbHBoYSA9IC9hbHBoYVxcKFteKV0qXFwpL2ksXG4gIHJvcGFjaXR5ID0gL29wYWNpdHlcXHMqPVxccyooW14pXSopLyxcblxuICAvLyBzd2FwcGFibGUgaWYgZGlzcGxheSBpcyBub25lIG9yIHN0YXJ0cyB3aXRoIHRhYmxlIGV4Y2VwdCBcInRhYmxlXCIsIFwidGFibGUtY2VsbFwiLCBvciBcInRhYmxlLWNhcHRpb25cIlxuICAvLyBzZWUgaGVyZSBmb3IgZGlzcGxheSB2YWx1ZXM6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvQ1NTL2Rpc3BsYXlcbiAgcmRpc3BsYXlzd2FwID0gL14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFxuICBybnVtc3BsaXQgPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKC4qKSRcIiwgXCJpXCIgKSxcbiAgcnJlbE51bSA9IG5ldyBSZWdFeHAoIFwiXihbKy1dKT0oXCIgKyBwbnVtICsgXCIpXCIsIFwiaVwiICksXG5cbiAgY3NzU2hvdyA9IHsgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiwgZGlzcGxheTogXCJibG9ja1wiIH0sXG4gIGNzc05vcm1hbFRyYW5zZm9ybSA9IHtcbiAgICBsZXR0ZXJTcGFjaW5nOiBcIjBcIixcbiAgICBmb250V2VpZ2h0OiBcIjQwMFwiXG4gIH0sXG5cbiAgY3NzUHJlZml4ZXMgPSBbIFwiV2Via2l0XCIsIFwiT1wiLCBcIk1velwiLCBcIm1zXCIgXTtcblxuXG4vLyByZXR1cm4gYSBjc3MgcHJvcGVydHkgbWFwcGVkIHRvIGEgcG90ZW50aWFsbHkgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5XG5mdW5jdGlvbiB2ZW5kb3JQcm9wTmFtZSggc3R5bGUsIG5hbWUgKSB7XG5cbiAgLy8gc2hvcnRjdXQgZm9yIG5hbWVzIHRoYXQgYXJlIG5vdCB2ZW5kb3IgcHJlZml4ZWRcbiAgaWYgKCBuYW1lIGluIHN0eWxlICkge1xuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgLy8gY2hlY2sgZm9yIHZlbmRvciBwcmVmaXhlZCBuYW1lc1xuICB2YXIgY2FwTmFtZSA9IG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpLFxuICAgIG9yaWdOYW1lID0gbmFtZSxcbiAgICBpID0gY3NzUHJlZml4ZXMubGVuZ3RoO1xuXG4gIHdoaWxlICggaS0tICkge1xuICAgIG5hbWUgPSBjc3NQcmVmaXhlc1sgaSBdICsgY2FwTmFtZTtcbiAgICBpZiAoIG5hbWUgaW4gc3R5bGUgKSB7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3JpZ05hbWU7XG59XG5cbmZ1bmN0aW9uIHNob3dIaWRlKCBlbGVtZW50cywgc2hvdyApIHtcbiAgdmFyIGRpc3BsYXksIGVsZW0sIGhpZGRlbixcbiAgICB2YWx1ZXMgPSBbXSxcbiAgICBpbmRleCA9IDAsXG4gICAgbGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xuXG4gIGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG4gICAgZWxlbSA9IGVsZW1lbnRzWyBpbmRleCBdO1xuICAgIGlmICggIWVsZW0uc3R5bGUgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YWx1ZXNbIGluZGV4IF0gPSBqUXVlcnkuX2RhdGEoIGVsZW0sIFwib2xkZGlzcGxheVwiICk7XG4gICAgZGlzcGxheSA9IGVsZW0uc3R5bGUuZGlzcGxheTtcbiAgICBpZiAoIHNob3cgKSB7XG4gICAgICAvLyBSZXNldCB0aGUgaW5saW5lIGRpc3BsYXkgb2YgdGhpcyBlbGVtZW50IHRvIGxlYXJuIGlmIGl0IGlzXG4gICAgICAvLyBiZWluZyBoaWRkZW4gYnkgY2FzY2FkZWQgcnVsZXMgb3Igbm90XG4gICAgICBpZiAoICF2YWx1ZXNbIGluZGV4IF0gJiYgZGlzcGxheSA9PT0gXCJub25lXCIgKSB7XG4gICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBlbGVtZW50cyB3aGljaCBoYXZlIGJlZW4gb3ZlcnJpZGRlbiB3aXRoIGRpc3BsYXk6IG5vbmVcbiAgICAgIC8vIGluIGEgc3R5bGVzaGVldCB0byB3aGF0ZXZlciB0aGUgZGVmYXVsdCBicm93c2VyIHN0eWxlIGlzXG4gICAgICAvLyBmb3Igc3VjaCBhbiBlbGVtZW50XG4gICAgICBpZiAoIGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiAmJiBpc0hpZGRlbiggZWxlbSApICkge1xuICAgICAgICB2YWx1ZXNbIGluZGV4IF0gPSBqUXVlcnkuX2RhdGEoIGVsZW0sIFwib2xkZGlzcGxheVwiLCBkZWZhdWx0RGlzcGxheShlbGVtLm5vZGVOYW1lKSApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBoaWRkZW4gPSBpc0hpZGRlbiggZWxlbSApO1xuXG4gICAgICBpZiAoIGRpc3BsYXkgJiYgZGlzcGxheSAhPT0gXCJub25lXCIgfHwgIWhpZGRlbiApIHtcbiAgICAgICAgalF1ZXJ5Ll9kYXRhKCBlbGVtLCBcIm9sZGRpc3BsYXlcIiwgaGlkZGVuID8gZGlzcGxheSA6IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTZXQgdGhlIGRpc3BsYXkgb2YgbW9zdCBvZiB0aGUgZWxlbWVudHMgaW4gYSBzZWNvbmQgbG9vcFxuICAvLyB0byBhdm9pZCB0aGUgY29uc3RhbnQgcmVmbG93XG4gIGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG4gICAgZWxlbSA9IGVsZW1lbnRzWyBpbmRleCBdO1xuICAgIGlmICggIWVsZW0uc3R5bGUgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKCAhc2hvdyB8fCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiIHx8IGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiApIHtcbiAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IHNob3cgPyB2YWx1ZXNbIGluZGV4IF0gfHwgXCJcIiA6IFwibm9uZVwiO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50cztcbn1cblxuZnVuY3Rpb24gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApIHtcbiAgdmFyIG1hdGNoZXMgPSBybnVtc3BsaXQuZXhlYyggdmFsdWUgKTtcbiAgcmV0dXJuIG1hdGNoZXMgP1xuICAgIC8vIEd1YXJkIGFnYWluc3QgdW5kZWZpbmVkIFwic3VidHJhY3RcIiwgZS5nLiwgd2hlbiB1c2VkIGFzIGluIGNzc0hvb2tzXG4gICAgTWF0aC5tYXgoIDAsIG1hdGNoZXNbIDEgXSAtICggc3VidHJhY3QgfHwgMCApICkgKyAoIG1hdGNoZXNbIDIgXSB8fCBcInB4XCIgKSA6XG4gICAgdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSwgaXNCb3JkZXJCb3gsIHN0eWxlcyApIHtcbiAgdmFyIGkgPSBleHRyYSA9PT0gKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApID9cbiAgICAvLyBJZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIHJpZ2h0IG1lYXN1cmVtZW50LCBhdm9pZCBhdWdtZW50YXRpb25cbiAgICA0IDpcbiAgICAvLyBPdGhlcndpc2UgaW5pdGlhbGl6ZSBmb3IgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBwcm9wZXJ0aWVzXG4gICAgbmFtZSA9PT0gXCJ3aWR0aFwiID8gMSA6IDAsXG5cbiAgICB2YWwgPSAwO1xuXG4gIGZvciAoIDsgaSA8IDQ7IGkgKz0gMiApIHtcbiAgICAvLyBib3RoIGJveCBtb2RlbHMgZXhjbHVkZSBtYXJnaW4sIHNvIGFkZCBpdCBpZiB3ZSB3YW50IGl0XG4gICAgaWYgKCBleHRyYSA9PT0gXCJtYXJnaW5cIiApIHtcbiAgICAgIHZhbCArPSBqUXVlcnkuY3NzKCBlbGVtLCBleHRyYSArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcbiAgICB9XG5cbiAgICBpZiAoIGlzQm9yZGVyQm94ICkge1xuICAgICAgLy8gYm9yZGVyLWJveCBpbmNsdWRlcyBwYWRkaW5nLCBzbyByZW1vdmUgaXQgaWYgd2Ugd2FudCBjb250ZW50XG4gICAgICBpZiAoIGV4dHJhID09PSBcImNvbnRlbnRcIiApIHtcbiAgICAgICAgdmFsIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuICAgICAgfVxuXG4gICAgICAvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBib3JkZXIgbm9yIG1hcmdpbiwgc28gcmVtb3ZlIGJvcmRlclxuICAgICAgaWYgKCBleHRyYSAhPT0gXCJtYXJnaW5cIiApIHtcbiAgICAgICAgdmFsIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQsIHNvIGFkZCBwYWRkaW5nXG4gICAgICB2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQgbm9yIHBhZGRpbmcsIHNvIGFkZCBib3JkZXJcbiAgICAgIGlmICggZXh0cmEgIT09IFwicGFkZGluZ1wiICkge1xuICAgICAgICB2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApIHtcblxuICAvLyBTdGFydCB3aXRoIG9mZnNldCBwcm9wZXJ0eSwgd2hpY2ggaXMgZXF1aXZhbGVudCB0byB0aGUgYm9yZGVyLWJveCB2YWx1ZVxuICB2YXIgdmFsdWVJc0JvcmRlckJveCA9IHRydWUsXG4gICAgdmFsID0gbmFtZSA9PT0gXCJ3aWR0aFwiID8gZWxlbS5vZmZzZXRXaWR0aCA6IGVsZW0ub2Zmc2V0SGVpZ2h0LFxuICAgIHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApLFxuICAgIGlzQm9yZGVyQm94ID0gc3VwcG9ydC5ib3hTaXppbmcgJiYgalF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIjtcblxuICAvLyBzb21lIG5vbi1odG1sIGVsZW1lbnRzIHJldHVybiB1bmRlZmluZWQgZm9yIG9mZnNldFdpZHRoLCBzbyBjaGVjayBmb3IgbnVsbC91bmRlZmluZWRcbiAgLy8gc3ZnIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjQ5Mjg1XG4gIC8vIE1hdGhNTCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTQ5MTY2OFxuICBpZiAoIHZhbCA8PSAwIHx8IHZhbCA9PSBudWxsICkge1xuICAgIC8vIEZhbGwgYmFjayB0byBjb21wdXRlZCB0aGVuIHVuY29tcHV0ZWQgY3NzIGlmIG5lY2Vzc2FyeVxuICAgIHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICk7XG4gICAgaWYgKCB2YWwgPCAwIHx8IHZhbCA9PSBudWxsICkge1xuICAgICAgdmFsID0gZWxlbS5zdHlsZVsgbmFtZSBdO1xuICAgIH1cblxuICAgIC8vIENvbXB1dGVkIHVuaXQgaXMgbm90IHBpeGVscy4gU3RvcCBoZXJlIGFuZCByZXR1cm4uXG4gICAgaWYgKCBybnVtbm9ucHgudGVzdCh2YWwpICkge1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICAvLyB3ZSBuZWVkIHRoZSBjaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xuICAgIC8vIGZvciBnZXRDb21wdXRlZFN0eWxlIHNpbGVudGx5IGZhbGxzIGJhY2sgdG8gdGhlIHJlbGlhYmxlIGVsZW0uc3R5bGVcbiAgICB2YWx1ZUlzQm9yZGVyQm94ID0gaXNCb3JkZXJCb3ggJiYgKCBzdXBwb3J0LmJveFNpemluZ1JlbGlhYmxlKCkgfHwgdmFsID09PSBlbGVtLnN0eWxlWyBuYW1lIF0gKTtcblxuICAgIC8vIE5vcm1hbGl6ZSBcIlwiLCBhdXRvLCBhbmQgcHJlcGFyZSBmb3IgZXh0cmFcbiAgICB2YWwgPSBwYXJzZUZsb2F0KCB2YWwgKSB8fCAwO1xuICB9XG5cbiAgLy8gdXNlIHRoZSBhY3RpdmUgYm94LXNpemluZyBtb2RlbCB0byBhZGQvc3VidHJhY3QgaXJyZWxldmFudCBzdHlsZXNcbiAgcmV0dXJuICggdmFsICtcbiAgICBhdWdtZW50V2lkdGhPckhlaWdodChcbiAgICAgIGVsZW0sXG4gICAgICBuYW1lLFxuICAgICAgZXh0cmEgfHwgKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApLFxuICAgICAgdmFsdWVJc0JvcmRlckJveCxcbiAgICAgIHN0eWxlc1xuICAgIClcbiAgKSArIFwicHhcIjtcbn1cblxualF1ZXJ5LmV4dGVuZCh7XG4gIC8vIEFkZCBpbiBzdHlsZSBwcm9wZXJ0eSBob29rcyBmb3Igb3ZlcnJpZGluZyB0aGUgZGVmYXVsdFxuICAvLyBiZWhhdmlvciBvZiBnZXR0aW5nIGFuZCBzZXR0aW5nIGEgc3R5bGUgcHJvcGVydHlcbiAgY3NzSG9va3M6IHtcbiAgICBvcGFjaXR5OiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcbiAgICAgICAgaWYgKCBjb21wdXRlZCApIHtcbiAgICAgICAgICAvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxuICAgICAgICAgIHZhciByZXQgPSBjdXJDU1MoIGVsZW0sIFwib3BhY2l0eVwiICk7XG4gICAgICAgICAgcmV0dXJuIHJldCA9PT0gXCJcIiA/IFwiMVwiIDogcmV0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIERvbid0IGF1dG9tYXRpY2FsbHkgYWRkIFwicHhcIiB0byB0aGVzZSBwb3NzaWJseS11bml0bGVzcyBwcm9wZXJ0aWVzXG4gIGNzc051bWJlcjoge1xuICAgIFwiY29sdW1uQ291bnRcIjogdHJ1ZSxcbiAgICBcImZpbGxPcGFjaXR5XCI6IHRydWUsXG4gICAgXCJmbGV4R3Jvd1wiOiB0cnVlLFxuICAgIFwiZmxleFNocmlua1wiOiB0cnVlLFxuICAgIFwiZm9udFdlaWdodFwiOiB0cnVlLFxuICAgIFwibGluZUhlaWdodFwiOiB0cnVlLFxuICAgIFwib3BhY2l0eVwiOiB0cnVlLFxuICAgIFwib3JkZXJcIjogdHJ1ZSxcbiAgICBcIm9ycGhhbnNcIjogdHJ1ZSxcbiAgICBcIndpZG93c1wiOiB0cnVlLFxuICAgIFwiekluZGV4XCI6IHRydWUsXG4gICAgXCJ6b29tXCI6IHRydWVcbiAgfSxcblxuICAvLyBBZGQgaW4gcHJvcGVydGllcyB3aG9zZSBuYW1lcyB5b3Ugd2lzaCB0byBmaXggYmVmb3JlXG4gIC8vIHNldHRpbmcgb3IgZ2V0dGluZyB0aGUgdmFsdWVcbiAgY3NzUHJvcHM6IHtcbiAgICAvLyBub3JtYWxpemUgZmxvYXQgY3NzIHByb3BlcnR5XG4gICAgXCJmbG9hdFwiOiBzdXBwb3J0LmNzc0Zsb2F0ID8gXCJjc3NGbG9hdFwiIDogXCJzdHlsZUZsb2F0XCJcbiAgfSxcblxuICAvLyBHZXQgYW5kIHNldCB0aGUgc3R5bGUgcHJvcGVydHkgb24gYSBET00gTm9kZVxuICBzdHlsZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlLCBleHRyYSApIHtcbiAgICAvLyBEb24ndCBzZXQgc3R5bGVzIG9uIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcbiAgICBpZiAoICFlbGVtIHx8IGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCB8fCAhZWxlbS5zdHlsZSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWVcbiAgICB2YXIgcmV0LCB0eXBlLCBob29rcyxcbiAgICAgIG9yaWdOYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApLFxuICAgICAgc3R5bGUgPSBlbGVtLnN0eWxlO1xuXG4gICAgbmFtZSA9IGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSB8fCAoIGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSA9IHZlbmRvclByb3BOYW1lKCBzdHlsZSwgb3JpZ05hbWUgKSApO1xuXG4gICAgLy8gZ2V0cyBob29rIGZvciB0aGUgcHJlZml4ZWQgdmVyc2lvblxuICAgIC8vIGZvbGxvd2VkIGJ5IHRoZSB1bnByZWZpeGVkIHZlcnNpb25cbiAgICBob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuICAgIC8vIENoZWNrIGlmIHdlJ3JlIHNldHRpbmcgYSB2YWx1ZVxuICAgIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cbiAgICAgIC8vIGNvbnZlcnQgcmVsYXRpdmUgbnVtYmVyIHN0cmluZ3MgKCs9IG9yIC09KSB0byByZWxhdGl2ZSBudW1iZXJzLiAjNzM0NVxuICAgICAgaWYgKCB0eXBlID09PSBcInN0cmluZ1wiICYmIChyZXQgPSBycmVsTnVtLmV4ZWMoIHZhbHVlICkpICkge1xuICAgICAgICB2YWx1ZSA9ICggcmV0WzFdICsgMSApICogcmV0WzJdICsgcGFyc2VGbG9hdCggalF1ZXJ5LmNzcyggZWxlbSwgbmFtZSApICk7XG4gICAgICAgIC8vIEZpeGVzIGJ1ZyAjOTIzN1xuICAgICAgICB0eXBlID0gXCJudW1iZXJcIjtcbiAgICAgIH1cblxuICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgbnVsbCBhbmQgTmFOIHZhbHVlcyBhcmVuJ3Qgc2V0LiBTZWU6ICM3MTE2XG4gICAgICBpZiAoIHZhbHVlID09IG51bGwgfHwgdmFsdWUgIT09IHZhbHVlICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGEgbnVtYmVyIHdhcyBwYXNzZWQgaW4sIGFkZCAncHgnIHRvIHRoZSAoZXhjZXB0IGZvciBjZXJ0YWluIENTUyBwcm9wZXJ0aWVzKVxuICAgICAgaWYgKCB0eXBlID09PSBcIm51bWJlclwiICYmICFqUXVlcnkuY3NzTnVtYmVyWyBvcmlnTmFtZSBdICkge1xuICAgICAgICB2YWx1ZSArPSBcInB4XCI7XG4gICAgICB9XG5cbiAgICAgIC8vIEZpeGVzICM4OTA4LCBpdCBjYW4gYmUgZG9uZSBtb3JlIGNvcnJlY3RseSBieSBzcGVjaWZpbmcgc2V0dGVycyBpbiBjc3NIb29rcyxcbiAgICAgIC8vIGJ1dCBpdCB3b3VsZCBtZWFuIHRvIGRlZmluZSBlaWdodCAoZm9yIGV2ZXJ5IHByb2JsZW1hdGljIHByb3BlcnR5KSBpZGVudGljYWwgZnVuY3Rpb25zXG4gICAgICBpZiAoICFzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSAmJiB2YWx1ZSA9PT0gXCJcIiAmJiBuYW1lLmluZGV4T2YoXCJiYWNrZ3JvdW5kXCIpID09PSAwICkge1xuICAgICAgICBzdHlsZVsgbmFtZSBdID0gXCJpbmhlcml0XCI7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQsIHVzZSB0aGF0IHZhbHVlLCBvdGhlcndpc2UganVzdCBzZXQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuICAgICAgaWYgKCAhaG9va3MgfHwgIShcInNldFwiIGluIGhvb2tzKSB8fCAodmFsdWUgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBleHRyYSApKSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFXG4gICAgICAgIC8vIFN3YWxsb3cgZXJyb3JzIGZyb20gJ2ludmFsaWQnIENTUyB2YWx1ZXMgKCM1NTA5KVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHN0eWxlWyBuYW1lIF0gPSB2YWx1ZTtcbiAgICAgICAgfSBjYXRjaChlKSB7fVxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBub24tY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuICAgICAgaWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmIChyZXQgPSBob29rcy5nZXQoIGVsZW0sIGZhbHNlLCBleHRyYSApKSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuXG4gICAgICAvLyBPdGhlcndpc2UganVzdCBnZXQgdGhlIHZhbHVlIGZyb20gdGhlIHN0eWxlIG9iamVjdFxuICAgICAgcmV0dXJuIHN0eWxlWyBuYW1lIF07XG4gICAgfVxuICB9LFxuXG4gIGNzczogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGV4dHJhLCBzdHlsZXMgKSB7XG4gICAgdmFyIG51bSwgdmFsLCBob29rcyxcbiAgICAgIG9yaWdOYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG4gICAgbmFtZSA9IGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSB8fCAoIGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSA9IHZlbmRvclByb3BOYW1lKCBlbGVtLnN0eWxlLCBvcmlnTmFtZSApICk7XG5cbiAgICAvLyBnZXRzIGhvb2sgZm9yIHRoZSBwcmVmaXhlZCB2ZXJzaW9uXG4gICAgLy8gZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgdmVyc2lvblxuICAgIGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG4gICAgLy8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcbiAgICBpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgKSB7XG4gICAgICB2YWwgPSBob29rcy5nZXQoIGVsZW0sIHRydWUsIGV4dHJhICk7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlLCBpZiBhIHdheSB0byBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGV4aXN0cywgdXNlIHRoYXRcbiAgICBpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKTtcbiAgICB9XG5cbiAgICAvL2NvbnZlcnQgXCJub3JtYWxcIiB0byBjb21wdXRlZCB2YWx1ZVxuICAgIGlmICggdmFsID09PSBcIm5vcm1hbFwiICYmIG5hbWUgaW4gY3NzTm9ybWFsVHJhbnNmb3JtICkge1xuICAgICAgdmFsID0gY3NzTm9ybWFsVHJhbnNmb3JtWyBuYW1lIF07XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuLCBjb252ZXJ0aW5nIHRvIG51bWJlciBpZiBmb3JjZWQgb3IgYSBxdWFsaWZpZXIgd2FzIHByb3ZpZGVkIGFuZCB2YWwgbG9va3MgbnVtZXJpY1xuICAgIGlmICggZXh0cmEgPT09IFwiXCIgfHwgZXh0cmEgKSB7XG4gICAgICBudW0gPSBwYXJzZUZsb2F0KCB2YWwgKTtcbiAgICAgIHJldHVybiBleHRyYSA9PT0gdHJ1ZSB8fCBqUXVlcnkuaXNOdW1lcmljKCBudW0gKSA/IG51bSB8fCAwIDogdmFsO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG59KTtcblxualF1ZXJ5LmVhY2goWyBcImhlaWdodFwiLCBcIndpZHRoXCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG4gIGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdID0ge1xuICAgIGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkLCBleHRyYSApIHtcbiAgICAgIGlmICggY29tcHV0ZWQgKSB7XG4gICAgICAgIC8vIGNlcnRhaW4gZWxlbWVudHMgY2FuIGhhdmUgZGltZW5zaW9uIGluZm8gaWYgd2UgaW52aXNpYmx5IHNob3cgdGhlbVxuICAgICAgICAvLyBob3dldmVyLCBpdCBtdXN0IGhhdmUgYSBjdXJyZW50IGRpc3BsYXkgc3R5bGUgdGhhdCB3b3VsZCBiZW5lZml0IGZyb20gdGhpc1xuICAgICAgICByZXR1cm4gcmRpc3BsYXlzd2FwLnRlc3QoIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgKSAmJiBlbGVtLm9mZnNldFdpZHRoID09PSAwID9cbiAgICAgICAgICBqUXVlcnkuc3dhcCggZWxlbSwgY3NzU2hvdywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKTtcbiAgICAgICAgICB9KSA6XG4gICAgICAgICAgZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIGV4dHJhICkge1xuICAgICAgdmFyIHN0eWxlcyA9IGV4dHJhICYmIGdldFN0eWxlcyggZWxlbSApO1xuICAgICAgcmV0dXJuIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgZXh0cmEgP1xuICAgICAgICBhdWdtZW50V2lkdGhPckhlaWdodChcbiAgICAgICAgICBlbGVtLFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgZXh0cmEsXG4gICAgICAgICAgc3VwcG9ydC5ib3hTaXppbmcgJiYgalF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcbiAgICAgICAgICBzdHlsZXNcbiAgICAgICAgKSA6IDBcbiAgICAgICk7XG4gICAgfVxuICB9O1xufSk7XG5cbmlmICggIXN1cHBvcnQub3BhY2l0eSApIHtcbiAgalF1ZXJ5LmNzc0hvb2tzLm9wYWNpdHkgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG4gICAgICAvLyBJRSB1c2VzIGZpbHRlcnMgZm9yIG9wYWNpdHlcbiAgICAgIHJldHVybiByb3BhY2l0eS50ZXN0KCAoY29tcHV0ZWQgJiYgZWxlbS5jdXJyZW50U3R5bGUgPyBlbGVtLmN1cnJlbnRTdHlsZS5maWx0ZXIgOiBlbGVtLnN0eWxlLmZpbHRlcikgfHwgXCJcIiApID9cbiAgICAgICAgKCAwLjAxICogcGFyc2VGbG9hdCggUmVnRXhwLiQxICkgKSArIFwiXCIgOlxuICAgICAgICBjb21wdXRlZCA/IFwiMVwiIDogXCJcIjtcbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICB2YXIgc3R5bGUgPSBlbGVtLnN0eWxlLFxuICAgICAgICBjdXJyZW50U3R5bGUgPSBlbGVtLmN1cnJlbnRTdHlsZSxcbiAgICAgICAgb3BhY2l0eSA9IGpRdWVyeS5pc051bWVyaWMoIHZhbHVlICkgPyBcImFscGhhKG9wYWNpdHk9XCIgKyB2YWx1ZSAqIDEwMCArIFwiKVwiIDogXCJcIixcbiAgICAgICAgZmlsdGVyID0gY3VycmVudFN0eWxlICYmIGN1cnJlbnRTdHlsZS5maWx0ZXIgfHwgc3R5bGUuZmlsdGVyIHx8IFwiXCI7XG5cbiAgICAgIC8vIElFIGhhcyB0cm91YmxlIHdpdGggb3BhY2l0eSBpZiBpdCBkb2VzIG5vdCBoYXZlIGxheW91dFxuICAgICAgLy8gRm9yY2UgaXQgYnkgc2V0dGluZyB0aGUgem9vbSBsZXZlbFxuICAgICAgc3R5bGUuem9vbSA9IDE7XG5cbiAgICAgIC8vIGlmIHNldHRpbmcgb3BhY2l0eSB0byAxLCBhbmQgbm8gb3RoZXIgZmlsdGVycyBleGlzdCAtIGF0dGVtcHQgdG8gcmVtb3ZlIGZpbHRlciBhdHRyaWJ1dGUgIzY2NTJcbiAgICAgIC8vIGlmIHZhbHVlID09PSBcIlwiLCB0aGVuIHJlbW92ZSBpbmxpbmUgb3BhY2l0eSAjMTI2ODVcbiAgICAgIGlmICggKCB2YWx1ZSA+PSAxIHx8IHZhbHVlID09PSBcIlwiICkgJiZcbiAgICAgICAgICBqUXVlcnkudHJpbSggZmlsdGVyLnJlcGxhY2UoIHJhbHBoYSwgXCJcIiApICkgPT09IFwiXCIgJiZcbiAgICAgICAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUgKSB7XG5cbiAgICAgICAgLy8gU2V0dGluZyBzdHlsZS5maWx0ZXIgdG8gbnVsbCwgXCJcIiAmIFwiIFwiIHN0aWxsIGxlYXZlIFwiZmlsdGVyOlwiIGluIHRoZSBjc3NUZXh0XG4gICAgICAgIC8vIGlmIFwiZmlsdGVyOlwiIGlzIHByZXNlbnQgYXQgYWxsLCBjbGVhclR5cGUgaXMgZGlzYWJsZWQsIHdlIHdhbnQgdG8gYXZvaWQgdGhpc1xuICAgICAgICAvLyBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUgaXMgSUUgT25seSwgYnV0IHNvIGFwcGFyZW50bHkgaXMgdGhpcyBjb2RlIHBhdGguLi5cbiAgICAgICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCBcImZpbHRlclwiICk7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gZmlsdGVyIHN0eWxlIGFwcGxpZWQgaW4gYSBjc3MgcnVsZSBvciB1bnNldCBpbmxpbmUgb3BhY2l0eSwgd2UgYXJlIGRvbmVcbiAgICAgICAgaWYgKCB2YWx1ZSA9PT0gXCJcIiB8fCBjdXJyZW50U3R5bGUgJiYgIWN1cnJlbnRTdHlsZS5maWx0ZXIgKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG90aGVyd2lzZSwgc2V0IG5ldyBmaWx0ZXIgdmFsdWVzXG4gICAgICBzdHlsZS5maWx0ZXIgPSByYWxwaGEudGVzdCggZmlsdGVyICkgP1xuICAgICAgICBmaWx0ZXIucmVwbGFjZSggcmFscGhhLCBvcGFjaXR5ICkgOlxuICAgICAgICBmaWx0ZXIgKyBcIiBcIiArIG9wYWNpdHk7XG4gICAgfVxuICB9O1xufVxuXG5qUXVlcnkuY3NzSG9va3MubWFyZ2luUmlnaHQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5SaWdodCxcbiAgZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuICAgIGlmICggY29tcHV0ZWQgKSB7XG4gICAgICAvLyBXZWJLaXQgQnVnIDEzMzQzIC0gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHdyb25nIHZhbHVlIGZvciBtYXJnaW4tcmlnaHRcbiAgICAgIC8vIFdvcmsgYXJvdW5kIGJ5IHRlbXBvcmFyaWx5IHNldHRpbmcgZWxlbWVudCBkaXNwbGF5IHRvIGlubGluZS1ibG9ja1xuICAgICAgcmV0dXJuIGpRdWVyeS5zd2FwKCBlbGVtLCB7IFwiZGlzcGxheVwiOiBcImlubGluZS1ibG9ja1wiIH0sXG4gICAgICAgIGN1ckNTUywgWyBlbGVtLCBcIm1hcmdpblJpZ2h0XCIgXSApO1xuICAgIH1cbiAgfVxuKTtcblxuLy8gVGhlc2UgaG9va3MgYXJlIHVzZWQgYnkgYW5pbWF0ZSB0byBleHBhbmQgcHJvcGVydGllc1xualF1ZXJ5LmVhY2goe1xuICBtYXJnaW46IFwiXCIsXG4gIHBhZGRpbmc6IFwiXCIsXG4gIGJvcmRlcjogXCJXaWR0aFwiXG59LCBmdW5jdGlvbiggcHJlZml4LCBzdWZmaXggKSB7XG4gIGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0gPSB7XG4gICAgZXhwYW5kOiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICB2YXIgaSA9IDAsXG4gICAgICAgIGV4cGFuZGVkID0ge30sXG5cbiAgICAgICAgLy8gYXNzdW1lcyBhIHNpbmdsZSBudW1iZXIgaWYgbm90IGEgc3RyaW5nXG4gICAgICAgIHBhcnRzID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUuc3BsaXQoXCIgXCIpIDogWyB2YWx1ZSBdO1xuXG4gICAgICBmb3IgKCA7IGkgPCA0OyBpKysgKSB7XG4gICAgICAgIGV4cGFuZGVkWyBwcmVmaXggKyBjc3NFeHBhbmRbIGkgXSArIHN1ZmZpeCBdID1cbiAgICAgICAgICBwYXJ0c1sgaSBdIHx8IHBhcnRzWyBpIC0gMiBdIHx8IHBhcnRzWyAwIF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBleHBhbmRlZDtcbiAgICB9XG4gIH07XG5cbiAgaWYgKCAhcm1hcmdpbi50ZXN0KCBwcmVmaXggKSApIHtcbiAgICBqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdLnNldCA9IHNldFBvc2l0aXZlTnVtYmVyO1xuICB9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIGNzczogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuICAgIHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcbiAgICAgIHZhciBzdHlsZXMsIGxlbixcbiAgICAgICAgbWFwID0ge30sXG4gICAgICAgIGkgPSAwO1xuXG4gICAgICBpZiAoIGpRdWVyeS5pc0FycmF5KCBuYW1lICkgKSB7XG4gICAgICAgIHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApO1xuICAgICAgICBsZW4gPSBuYW1lLmxlbmd0aDtcblxuICAgICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgICBtYXBbIG5hbWVbIGkgXSBdID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZVsgaSBdLCBmYWxzZSwgc3R5bGVzICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgIGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSwgdmFsdWUgKSA6XG4gICAgICAgIGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcbiAgICB9LCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcbiAgfSxcbiAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHNob3dIaWRlKCB0aGlzLCB0cnVlICk7XG4gIH0sXG4gIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzaG93SGlkZSggdGhpcyApO1xuICB9LFxuICB0b2dnbGU6IGZ1bmN0aW9uKCBzdGF0ZSApIHtcbiAgICBpZiAoIHR5cGVvZiBzdGF0ZSA9PT0gXCJib29sZWFuXCIgKSB7XG4gICAgICByZXR1cm4gc3RhdGUgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIGlzSGlkZGVuKCB0aGlzICkgKSB7XG4gICAgICAgIGpRdWVyeSggdGhpcyApLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpRdWVyeSggdGhpcyApLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG5cblxuZnVuY3Rpb24gVHdlZW4oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nICkge1xuICByZXR1cm4gbmV3IFR3ZWVuLnByb3RvdHlwZS5pbml0KCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApO1xufVxualF1ZXJ5LlR3ZWVuID0gVHdlZW47XG5cblR3ZWVuLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFR3ZWVuLFxuICBpbml0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcsIHVuaXQgKSB7XG4gICAgdGhpcy5lbGVtID0gZWxlbTtcbiAgICB0aGlzLnByb3AgPSBwcm9wO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzaW5nIHx8IFwic3dpbmdcIjtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuc3RhcnQgPSB0aGlzLm5vdyA9IHRoaXMuY3VyKCk7XG4gICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgdGhpcy51bml0ID0gdW5pdCB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSA/IFwiXCIgOiBcInB4XCIgKTtcbiAgfSxcbiAgY3VyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaG9va3MgPSBUd2Vlbi5wcm9wSG9va3NbIHRoaXMucHJvcCBdO1xuXG4gICAgcmV0dXJuIGhvb2tzICYmIGhvb2tzLmdldCA/XG4gICAgICBob29rcy5nZXQoIHRoaXMgKSA6XG4gICAgICBUd2Vlbi5wcm9wSG9va3MuX2RlZmF1bHQuZ2V0KCB0aGlzICk7XG4gIH0sXG4gIHJ1bjogZnVuY3Rpb24oIHBlcmNlbnQgKSB7XG4gICAgdmFyIGVhc2VkLFxuICAgICAgaG9va3MgPSBUd2Vlbi5wcm9wSG9va3NbIHRoaXMucHJvcCBdO1xuXG4gICAgaWYgKCB0aGlzLm9wdGlvbnMuZHVyYXRpb24gKSB7XG4gICAgICB0aGlzLnBvcyA9IGVhc2VkID0galF1ZXJ5LmVhc2luZ1sgdGhpcy5lYXNpbmcgXShcbiAgICAgICAgcGVyY2VudCwgdGhpcy5vcHRpb25zLmR1cmF0aW9uICogcGVyY2VudCwgMCwgMSwgdGhpcy5vcHRpb25zLmR1cmF0aW9uXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBvcyA9IGVhc2VkID0gcGVyY2VudDtcbiAgICB9XG4gICAgdGhpcy5ub3cgPSAoIHRoaXMuZW5kIC0gdGhpcy5zdGFydCApICogZWFzZWQgKyB0aGlzLnN0YXJ0O1xuXG4gICAgaWYgKCB0aGlzLm9wdGlvbnMuc3RlcCApIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zdGVwLmNhbGwoIHRoaXMuZWxlbSwgdGhpcy5ub3csIHRoaXMgKTtcbiAgICB9XG5cbiAgICBpZiAoIGhvb2tzICYmIGhvb2tzLnNldCApIHtcbiAgICAgIGhvb2tzLnNldCggdGhpcyApO1xuICAgIH0gZWxzZSB7XG4gICAgICBUd2Vlbi5wcm9wSG9va3MuX2RlZmF1bHQuc2V0KCB0aGlzICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5Ud2Vlbi5wcm90b3R5cGUuaW5pdC5wcm90b3R5cGUgPSBUd2Vlbi5wcm90b3R5cGU7XG5cblR3ZWVuLnByb3BIb29rcyA9IHtcbiAgX2RlZmF1bHQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcbiAgICAgIHZhciByZXN1bHQ7XG5cbiAgICAgIGlmICggdHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdICE9IG51bGwgJiZcbiAgICAgICAgKCF0d2Vlbi5lbGVtLnN0eWxlIHx8IHR3ZWVuLmVsZW0uc3R5bGVbIHR3ZWVuLnByb3AgXSA9PSBudWxsKSApIHtcbiAgICAgICAgcmV0dXJuIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXTtcbiAgICAgIH1cblxuICAgICAgLy8gcGFzc2luZyBhbiBlbXB0eSBzdHJpbmcgYXMgYSAzcmQgcGFyYW1ldGVyIHRvIC5jc3Mgd2lsbCBhdXRvbWF0aWNhbGx5XG4gICAgICAvLyBhdHRlbXB0IGEgcGFyc2VGbG9hdCBhbmQgZmFsbGJhY2sgdG8gYSBzdHJpbmcgaWYgdGhlIHBhcnNlIGZhaWxzXG4gICAgICAvLyBzbywgc2ltcGxlIHZhbHVlcyBzdWNoIGFzIFwiMTBweFwiIGFyZSBwYXJzZWQgdG8gRmxvYXQuXG4gICAgICAvLyBjb21wbGV4IHZhbHVlcyBzdWNoIGFzIFwicm90YXRlKDFyYWQpXCIgYXJlIHJldHVybmVkIGFzIGlzLlxuICAgICAgcmVzdWx0ID0galF1ZXJ5LmNzcyggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgXCJcIiApO1xuICAgICAgLy8gRW1wdHkgc3RyaW5ncywgbnVsbCwgdW5kZWZpbmVkIGFuZCBcImF1dG9cIiBhcmUgY29udmVydGVkIHRvIDAuXG4gICAgICByZXR1cm4gIXJlc3VsdCB8fCByZXN1bHQgPT09IFwiYXV0b1wiID8gMCA6IHJlc3VsdDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuICAgICAgLy8gdXNlIHN0ZXAgaG9vayBmb3IgYmFjayBjb21wYXQgLSB1c2UgY3NzSG9vayBpZiBpdHMgdGhlcmUgLSB1c2UgLnN0eWxlIGlmIGl0c1xuICAgICAgLy8gYXZhaWxhYmxlIGFuZCB1c2UgcGxhaW4gcHJvcGVydGllcyB3aGVyZSBhdmFpbGFibGVcbiAgICAgIGlmICggalF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSApIHtcbiAgICAgICAgalF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSggdHdlZW4gKTtcbiAgICAgIH0gZWxzZSBpZiAoIHR3ZWVuLmVsZW0uc3R5bGUgJiYgKCB0d2Vlbi5lbGVtLnN0eWxlWyBqUXVlcnkuY3NzUHJvcHNbIHR3ZWVuLnByb3AgXSBdICE9IG51bGwgfHwgalF1ZXJ5LmNzc0hvb2tzWyB0d2Vlbi5wcm9wIF0gKSApIHtcbiAgICAgICAgalF1ZXJ5LnN0eWxlKCB0d2Vlbi5lbGVtLCB0d2Vlbi5wcm9wLCB0d2Vlbi5ub3cgKyB0d2Vlbi51bml0ICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gPSB0d2Vlbi5ub3c7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vLyBTdXBwb3J0OiBJRSA8PTlcbi8vIFBhbmljIGJhc2VkIGFwcHJvYWNoIHRvIHNldHRpbmcgdGhpbmdzIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xuXG5Ud2Vlbi5wcm9wSG9va3Muc2Nyb2xsVG9wID0gVHdlZW4ucHJvcEhvb2tzLnNjcm9sbExlZnQgPSB7XG4gIHNldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuICAgIGlmICggdHdlZW4uZWxlbS5ub2RlVHlwZSAmJiB0d2Vlbi5lbGVtLnBhcmVudE5vZGUgKSB7XG4gICAgICB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gPSB0d2Vlbi5ub3c7XG4gICAgfVxuICB9XG59O1xuXG5qUXVlcnkuZWFzaW5nID0ge1xuICBsaW5lYXI6IGZ1bmN0aW9uKCBwICkge1xuICAgIHJldHVybiBwO1xuICB9LFxuICBzd2luZzogZnVuY3Rpb24oIHAgKSB7XG4gICAgcmV0dXJuIDAuNSAtIE1hdGguY29zKCBwICogTWF0aC5QSSApIC8gMjtcbiAgfVxufTtcblxualF1ZXJ5LmZ4ID0gVHdlZW4ucHJvdG90eXBlLmluaXQ7XG5cbi8vIEJhY2sgQ29tcGF0IDwxLjggZXh0ZW5zaW9uIHBvaW50XG5qUXVlcnkuZnguc3RlcCA9IHt9O1xuXG5cblxuXG52YXJcbiAgZnhOb3csIHRpbWVySWQsXG4gIHJmeHR5cGVzID0gL14oPzp0b2dnbGV8c2hvd3xoaWRlKSQvLFxuICByZnhudW0gPSBuZXcgUmVnRXhwKCBcIl4oPzooWystXSk9fCkoXCIgKyBwbnVtICsgXCIpKFthLXolXSopJFwiLCBcImlcIiApLFxuICBycnVuID0gL3F1ZXVlSG9va3MkLyxcbiAgYW5pbWF0aW9uUHJlZmlsdGVycyA9IFsgZGVmYXVsdFByZWZpbHRlciBdLFxuICB0d2VlbmVycyA9IHtcbiAgICBcIipcIjogWyBmdW5jdGlvbiggcHJvcCwgdmFsdWUgKSB7XG4gICAgICB2YXIgdHdlZW4gPSB0aGlzLmNyZWF0ZVR3ZWVuKCBwcm9wLCB2YWx1ZSApLFxuICAgICAgICB0YXJnZXQgPSB0d2Vlbi5jdXIoKSxcbiAgICAgICAgcGFydHMgPSByZnhudW0uZXhlYyggdmFsdWUgKSxcbiAgICAgICAgdW5pdCA9IHBhcnRzICYmIHBhcnRzWyAzIF0gfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICksXG5cbiAgICAgICAgLy8gU3RhcnRpbmcgdmFsdWUgY29tcHV0YXRpb24gaXMgcmVxdWlyZWQgZm9yIHBvdGVudGlhbCB1bml0IG1pc21hdGNoZXNcbiAgICAgICAgc3RhcnQgPSAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSB8fCB1bml0ICE9PSBcInB4XCIgJiYgK3RhcmdldCApICYmXG4gICAgICAgICAgcmZ4bnVtLmV4ZWMoIGpRdWVyeS5jc3MoIHR3ZWVuLmVsZW0sIHByb3AgKSApLFxuICAgICAgICBzY2FsZSA9IDEsXG4gICAgICAgIG1heEl0ZXJhdGlvbnMgPSAyMDtcblxuICAgICAgaWYgKCBzdGFydCAmJiBzdGFydFsgMyBdICE9PSB1bml0ICkge1xuICAgICAgICAvLyBUcnVzdCB1bml0cyByZXBvcnRlZCBieSBqUXVlcnkuY3NzXG4gICAgICAgIHVuaXQgPSB1bml0IHx8IHN0YXJ0WyAzIF07XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIHVwZGF0ZSB0aGUgdHdlZW4gcHJvcGVydGllcyBsYXRlciBvblxuICAgICAgICBwYXJ0cyA9IHBhcnRzIHx8IFtdO1xuXG4gICAgICAgIC8vIEl0ZXJhdGl2ZWx5IGFwcHJveGltYXRlIGZyb20gYSBub256ZXJvIHN0YXJ0aW5nIHBvaW50XG4gICAgICAgIHN0YXJ0ID0gK3RhcmdldCB8fCAxO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAvLyBJZiBwcmV2aW91cyBpdGVyYXRpb24gemVyb2VkIG91dCwgZG91YmxlIHVudGlsIHdlIGdldCAqc29tZXRoaW5nKlxuICAgICAgICAgIC8vIFVzZSBhIHN0cmluZyBmb3IgZG91YmxpbmcgZmFjdG9yIHNvIHdlIGRvbid0IGFjY2lkZW50YWxseSBzZWUgc2NhbGUgYXMgdW5jaGFuZ2VkIGJlbG93XG4gICAgICAgICAgc2NhbGUgPSBzY2FsZSB8fCBcIi41XCI7XG5cbiAgICAgICAgICAvLyBBZGp1c3QgYW5kIGFwcGx5XG4gICAgICAgICAgc3RhcnQgPSBzdGFydCAvIHNjYWxlO1xuICAgICAgICAgIGpRdWVyeS5zdHlsZSggdHdlZW4uZWxlbSwgcHJvcCwgc3RhcnQgKyB1bml0ICk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHNjYWxlLCB0b2xlcmF0aW5nIHplcm8gb3IgTmFOIGZyb20gdHdlZW4uY3VyKClcbiAgICAgICAgLy8gQW5kIGJyZWFraW5nIHRoZSBsb29wIGlmIHNjYWxlIGlzIHVuY2hhbmdlZCBvciBwZXJmZWN0LCBvciBpZiB3ZSd2ZSBqdXN0IGhhZCBlbm91Z2hcbiAgICAgICAgfSB3aGlsZSAoIHNjYWxlICE9PSAoc2NhbGUgPSB0d2Vlbi5jdXIoKSAvIHRhcmdldCkgJiYgc2NhbGUgIT09IDEgJiYgLS1tYXhJdGVyYXRpb25zICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0d2VlbiBwcm9wZXJ0aWVzXG4gICAgICBpZiAoIHBhcnRzICkge1xuICAgICAgICBzdGFydCA9IHR3ZWVuLnN0YXJ0ID0gK3N0YXJ0IHx8ICt0YXJnZXQgfHwgMDtcbiAgICAgICAgdHdlZW4udW5pdCA9IHVuaXQ7XG4gICAgICAgIC8vIElmIGEgKz0vLT0gdG9rZW4gd2FzIHByb3ZpZGVkLCB3ZSdyZSBkb2luZyBhIHJlbGF0aXZlIGFuaW1hdGlvblxuICAgICAgICB0d2Vlbi5lbmQgPSBwYXJ0c1sgMSBdID9cbiAgICAgICAgICBzdGFydCArICggcGFydHNbIDEgXSArIDEgKSAqIHBhcnRzWyAyIF0gOlxuICAgICAgICAgICtwYXJ0c1sgMiBdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHdlZW47XG4gICAgfSBdXG4gIH07XG5cbi8vIEFuaW1hdGlvbnMgY3JlYXRlZCBzeW5jaHJvbm91c2x5IHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcbmZ1bmN0aW9uIGNyZWF0ZUZ4Tm93KCkge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGZ4Tm93ID0gdW5kZWZpbmVkO1xuICB9KTtcbiAgcmV0dXJuICggZnhOb3cgPSBqUXVlcnkubm93KCkgKTtcbn1cblxuLy8gR2VuZXJhdGUgcGFyYW1ldGVycyB0byBjcmVhdGUgYSBzdGFuZGFyZCBhbmltYXRpb25cbmZ1bmN0aW9uIGdlbkZ4KCB0eXBlLCBpbmNsdWRlV2lkdGggKSB7XG4gIHZhciB3aGljaCxcbiAgICBhdHRycyA9IHsgaGVpZ2h0OiB0eXBlIH0sXG4gICAgaSA9IDA7XG5cbiAgLy8gaWYgd2UgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAxIHRvIGRvIGFsbCBjc3NFeHBhbmQgdmFsdWVzLFxuICAvLyBpZiB3ZSBkb24ndCBpbmNsdWRlIHdpZHRoLCBzdGVwIHZhbHVlIGlzIDIgdG8gc2tpcCBvdmVyIExlZnQgYW5kIFJpZ2h0XG4gIGluY2x1ZGVXaWR0aCA9IGluY2x1ZGVXaWR0aCA/IDEgOiAwO1xuICBmb3IgKCA7IGkgPCA0IDsgaSArPSAyIC0gaW5jbHVkZVdpZHRoICkge1xuICAgIHdoaWNoID0gY3NzRXhwYW5kWyBpIF07XG4gICAgYXR0cnNbIFwibWFyZ2luXCIgKyB3aGljaCBdID0gYXR0cnNbIFwicGFkZGluZ1wiICsgd2hpY2ggXSA9IHR5cGU7XG4gIH1cblxuICBpZiAoIGluY2x1ZGVXaWR0aCApIHtcbiAgICBhdHRycy5vcGFjaXR5ID0gYXR0cnMud2lkdGggPSB0eXBlO1xuICB9XG5cbiAgcmV0dXJuIGF0dHJzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUd2VlbiggdmFsdWUsIHByb3AsIGFuaW1hdGlvbiApIHtcbiAgdmFyIHR3ZWVuLFxuICAgIGNvbGxlY3Rpb24gPSAoIHR3ZWVuZXJzWyBwcm9wIF0gfHwgW10gKS5jb25jYXQoIHR3ZWVuZXJzWyBcIipcIiBdICksXG4gICAgaW5kZXggPSAwLFxuICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuICBmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuICAgIGlmICggKHR3ZWVuID0gY29sbGVjdGlvblsgaW5kZXggXS5jYWxsKCBhbmltYXRpb24sIHByb3AsIHZhbHVlICkpICkge1xuXG4gICAgICAvLyB3ZSdyZSBkb25lIHdpdGggdGhpcyBwcm9wZXJ0eVxuICAgICAgcmV0dXJuIHR3ZWVuO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0UHJlZmlsdGVyKCBlbGVtLCBwcm9wcywgb3B0cyApIHtcbiAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICB2YXIgcHJvcCwgdmFsdWUsIHRvZ2dsZSwgdHdlZW4sIGhvb2tzLCBvbGRmaXJlLCBkaXNwbGF5LCBjaGVja0Rpc3BsYXksXG4gICAgYW5pbSA9IHRoaXMsXG4gICAgb3JpZyA9IHt9LFxuICAgIHN0eWxlID0gZWxlbS5zdHlsZSxcbiAgICBoaWRkZW4gPSBlbGVtLm5vZGVUeXBlICYmIGlzSGlkZGVuKCBlbGVtICksXG4gICAgZGF0YVNob3cgPSBqUXVlcnkuX2RhdGEoIGVsZW0sIFwiZnhzaG93XCIgKTtcblxuICAvLyBoYW5kbGUgcXVldWU6IGZhbHNlIHByb21pc2VzXG4gIGlmICggIW9wdHMucXVldWUgKSB7XG4gICAgaG9va3MgPSBqUXVlcnkuX3F1ZXVlSG9va3MoIGVsZW0sIFwiZnhcIiApO1xuICAgIGlmICggaG9va3MudW5xdWV1ZWQgPT0gbnVsbCApIHtcbiAgICAgIGhvb2tzLnVucXVldWVkID0gMDtcbiAgICAgIG9sZGZpcmUgPSBob29rcy5lbXB0eS5maXJlO1xuICAgICAgaG9va3MuZW1wdHkuZmlyZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoICFob29rcy51bnF1ZXVlZCApIHtcbiAgICAgICAgICBvbGRmaXJlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGhvb2tzLnVucXVldWVkKys7XG5cbiAgICBhbmltLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgIC8vIGRvaW5nIHRoaXMgbWFrZXMgc3VyZSB0aGF0IHRoZSBjb21wbGV0ZSBoYW5kbGVyIHdpbGwgYmUgY2FsbGVkXG4gICAgICAvLyBiZWZvcmUgdGhpcyBjb21wbGV0ZXNcbiAgICAgIGFuaW0uYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICBob29rcy51bnF1ZXVlZC0tO1xuICAgICAgICBpZiAoICFqUXVlcnkucXVldWUoIGVsZW0sIFwiZnhcIiApLmxlbmd0aCApIHtcbiAgICAgICAgICBob29rcy5lbXB0eS5maXJlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gaGVpZ2h0L3dpZHRoIG92ZXJmbG93IHBhc3NcbiAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCJoZWlnaHRcIiBpbiBwcm9wcyB8fCBcIndpZHRoXCIgaW4gcHJvcHMgKSApIHtcbiAgICAvLyBNYWtlIHN1cmUgdGhhdCBub3RoaW5nIHNuZWFrcyBvdXRcbiAgICAvLyBSZWNvcmQgYWxsIDMgb3ZlcmZsb3cgYXR0cmlidXRlcyBiZWNhdXNlIElFIGRvZXMgbm90XG4gICAgLy8gY2hhbmdlIHRoZSBvdmVyZmxvdyBhdHRyaWJ1dGUgd2hlbiBvdmVyZmxvd1ggYW5kXG4gICAgLy8gb3ZlcmZsb3dZIGFyZSBzZXQgdG8gdGhlIHNhbWUgdmFsdWVcbiAgICBvcHRzLm92ZXJmbG93ID0gWyBzdHlsZS5vdmVyZmxvdywgc3R5bGUub3ZlcmZsb3dYLCBzdHlsZS5vdmVyZmxvd1kgXTtcblxuICAgIC8vIFNldCBkaXNwbGF5IHByb3BlcnR5IHRvIGlubGluZS1ibG9jayBmb3IgaGVpZ2h0L3dpZHRoXG4gICAgLy8gYW5pbWF0aW9ucyBvbiBpbmxpbmUgZWxlbWVudHMgdGhhdCBhcmUgaGF2aW5nIHdpZHRoL2hlaWdodCBhbmltYXRlZFxuICAgIGRpc3BsYXkgPSBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApO1xuXG4gICAgLy8gVGVzdCBkZWZhdWx0IGRpc3BsYXkgaWYgZGlzcGxheSBpcyBjdXJyZW50bHkgXCJub25lXCJcbiAgICBjaGVja0Rpc3BsYXkgPSBkaXNwbGF5ID09PSBcIm5vbmVcIiA/XG4gICAgICBqUXVlcnkuX2RhdGEoIGVsZW0sIFwib2xkZGlzcGxheVwiICkgfHwgZGVmYXVsdERpc3BsYXkoIGVsZW0ubm9kZU5hbWUgKSA6IGRpc3BsYXk7XG5cbiAgICBpZiAoIGNoZWNrRGlzcGxheSA9PT0gXCJpbmxpbmVcIiAmJiBqUXVlcnkuY3NzKCBlbGVtLCBcImZsb2F0XCIgKSA9PT0gXCJub25lXCIgKSB7XG5cbiAgICAgIC8vIGlubGluZS1sZXZlbCBlbGVtZW50cyBhY2NlcHQgaW5saW5lLWJsb2NrO1xuICAgICAgLy8gYmxvY2stbGV2ZWwgZWxlbWVudHMgbmVlZCB0byBiZSBpbmxpbmUgd2l0aCBsYXlvdXRcbiAgICAgIGlmICggIXN1cHBvcnQuaW5saW5lQmxvY2tOZWVkc0xheW91dCB8fCBkZWZhdWx0RGlzcGxheSggZWxlbS5ub2RlTmFtZSApID09PSBcImlubGluZVwiICkge1xuICAgICAgICBzdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlLnpvb20gPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICggb3B0cy5vdmVyZmxvdyApIHtcbiAgICBzdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgaWYgKCAhc3VwcG9ydC5zaHJpbmtXcmFwQmxvY2tzKCkgKSB7XG4gICAgICBhbmltLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgc3R5bGUub3ZlcmZsb3cgPSBvcHRzLm92ZXJmbG93WyAwIF07XG4gICAgICAgIHN0eWxlLm92ZXJmbG93WCA9IG9wdHMub3ZlcmZsb3dbIDEgXTtcbiAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gb3B0cy5vdmVyZmxvd1sgMiBdO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gc2hvdy9oaWRlIHBhc3NcbiAgZm9yICggcHJvcCBpbiBwcm9wcyApIHtcbiAgICB2YWx1ZSA9IHByb3BzWyBwcm9wIF07XG4gICAgaWYgKCByZnh0eXBlcy5leGVjKCB2YWx1ZSApICkge1xuICAgICAgZGVsZXRlIHByb3BzWyBwcm9wIF07XG4gICAgICB0b2dnbGUgPSB0b2dnbGUgfHwgdmFsdWUgPT09IFwidG9nZ2xlXCI7XG4gICAgICBpZiAoIHZhbHVlID09PSAoIGhpZGRlbiA/IFwiaGlkZVwiIDogXCJzaG93XCIgKSApIHtcblxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBkYXRhU2hvdyBsZWZ0IG92ZXIgZnJvbSBhIHN0b3BwZWQgaGlkZSBvciBzaG93IGFuZCB3ZSBhcmUgZ29pbmcgdG8gcHJvY2VlZCB3aXRoIHNob3csIHdlIHNob3VsZCBwcmV0ZW5kIHRvIGJlIGhpZGRlblxuICAgICAgICBpZiAoIHZhbHVlID09PSBcInNob3dcIiAmJiBkYXRhU2hvdyAmJiBkYXRhU2hvd1sgcHJvcCBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb3JpZ1sgcHJvcCBdID0gZGF0YVNob3cgJiYgZGF0YVNob3dbIHByb3AgXSB8fCBqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AgKTtcblxuICAgIC8vIEFueSBub24tZnggdmFsdWUgc3RvcHMgdXMgZnJvbSByZXN0b3JpbmcgdGhlIG9yaWdpbmFsIGRpc3BsYXkgdmFsdWVcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGxheSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBpZiAoICFqUXVlcnkuaXNFbXB0eU9iamVjdCggb3JpZyApICkge1xuICAgIGlmICggZGF0YVNob3cgKSB7XG4gICAgICBpZiAoIFwiaGlkZGVuXCIgaW4gZGF0YVNob3cgKSB7XG4gICAgICAgIGhpZGRlbiA9IGRhdGFTaG93LmhpZGRlbjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVNob3cgPSBqUXVlcnkuX2RhdGEoIGVsZW0sIFwiZnhzaG93XCIsIHt9ICk7XG4gICAgfVxuXG4gICAgLy8gc3RvcmUgc3RhdGUgaWYgaXRzIHRvZ2dsZSAtIGVuYWJsZXMgLnN0b3AoKS50b2dnbGUoKSB0byBcInJldmVyc2VcIlxuICAgIGlmICggdG9nZ2xlICkge1xuICAgICAgZGF0YVNob3cuaGlkZGVuID0gIWhpZGRlbjtcbiAgICB9XG4gICAgaWYgKCBoaWRkZW4gKSB7XG4gICAgICBqUXVlcnkoIGVsZW0gKS5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFuaW0uZG9uZShmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KCBlbGVtICkuaGlkZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGFuaW0uZG9uZShmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwcm9wO1xuICAgICAgalF1ZXJ5Ll9yZW1vdmVEYXRhKCBlbGVtLCBcImZ4c2hvd1wiICk7XG4gICAgICBmb3IgKCBwcm9wIGluIG9yaWcgKSB7XG4gICAgICAgIGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCwgb3JpZ1sgcHJvcCBdICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZm9yICggcHJvcCBpbiBvcmlnICkge1xuICAgICAgdHdlZW4gPSBjcmVhdGVUd2VlbiggaGlkZGVuID8gZGF0YVNob3dbIHByb3AgXSA6IDAsIHByb3AsIGFuaW0gKTtcblxuICAgICAgaWYgKCAhKCBwcm9wIGluIGRhdGFTaG93ICkgKSB7XG4gICAgICAgIGRhdGFTaG93WyBwcm9wIF0gPSB0d2Vlbi5zdGFydDtcbiAgICAgICAgaWYgKCBoaWRkZW4gKSB7XG4gICAgICAgICAgdHdlZW4uZW5kID0gdHdlZW4uc3RhcnQ7XG4gICAgICAgICAgdHdlZW4uc3RhcnQgPSBwcm9wID09PSBcIndpZHRoXCIgfHwgcHJvcCA9PT0gXCJoZWlnaHRcIiA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIC8vIElmIHRoaXMgaXMgYSBub29wIGxpa2UgLmhpZGUoKS5oaWRlKCksIHJlc3RvcmUgYW4gb3ZlcndyaXR0ZW4gZGlzcGxheSB2YWx1ZVxuICB9IGVsc2UgaWYgKCAoZGlzcGxheSA9PT0gXCJub25lXCIgPyBkZWZhdWx0RGlzcGxheSggZWxlbS5ub2RlTmFtZSApIDogZGlzcGxheSkgPT09IFwiaW5saW5lXCIgKSB7XG4gICAgc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvcEZpbHRlciggcHJvcHMsIHNwZWNpYWxFYXNpbmcgKSB7XG4gIHZhciBpbmRleCwgbmFtZSwgZWFzaW5nLCB2YWx1ZSwgaG9va3M7XG5cbiAgLy8gY2FtZWxDYXNlLCBzcGVjaWFsRWFzaW5nIGFuZCBleHBhbmQgY3NzSG9vayBwYXNzXG4gIGZvciAoIGluZGV4IGluIHByb3BzICkge1xuICAgIG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBpbmRleCApO1xuICAgIGVhc2luZyA9IHNwZWNpYWxFYXNpbmdbIG5hbWUgXTtcbiAgICB2YWx1ZSA9IHByb3BzWyBpbmRleCBdO1xuICAgIGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG4gICAgICBlYXNpbmcgPSB2YWx1ZVsgMSBdO1xuICAgICAgdmFsdWUgPSBwcm9wc1sgaW5kZXggXSA9IHZhbHVlWyAwIF07XG4gICAgfVxuXG4gICAgaWYgKCBpbmRleCAhPT0gbmFtZSApIHtcbiAgICAgIHByb3BzWyBuYW1lIF0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBwcm9wc1sgaW5kZXggXTtcbiAgICB9XG5cbiAgICBob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdO1xuICAgIGlmICggaG9va3MgJiYgXCJleHBhbmRcIiBpbiBob29rcyApIHtcbiAgICAgIHZhbHVlID0gaG9va3MuZXhwYW5kKCB2YWx1ZSApO1xuICAgICAgZGVsZXRlIHByb3BzWyBuYW1lIF07XG5cbiAgICAgIC8vIG5vdCBxdWl0ZSAkLmV4dGVuZCwgdGhpcyB3b250IG92ZXJ3cml0ZSBrZXlzIGFscmVhZHkgcHJlc2VudC5cbiAgICAgIC8vIGFsc28gLSByZXVzaW5nICdpbmRleCcgZnJvbSBhYm92ZSBiZWNhdXNlIHdlIGhhdmUgdGhlIGNvcnJlY3QgXCJuYW1lXCJcbiAgICAgIGZvciAoIGluZGV4IGluIHZhbHVlICkge1xuICAgICAgICBpZiAoICEoIGluZGV4IGluIHByb3BzICkgKSB7XG4gICAgICAgICAgcHJvcHNbIGluZGV4IF0gPSB2YWx1ZVsgaW5kZXggXTtcbiAgICAgICAgICBzcGVjaWFsRWFzaW5nWyBpbmRleCBdID0gZWFzaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwZWNpYWxFYXNpbmdbIG5hbWUgXSA9IGVhc2luZztcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gQW5pbWF0aW9uKCBlbGVtLCBwcm9wZXJ0aWVzLCBvcHRpb25zICkge1xuICB2YXIgcmVzdWx0LFxuICAgIHN0b3BwZWQsXG4gICAgaW5kZXggPSAwLFxuICAgIGxlbmd0aCA9IGFuaW1hdGlvblByZWZpbHRlcnMubGVuZ3RoLFxuICAgIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCkuYWx3YXlzKCBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGRvbid0IG1hdGNoIGVsZW0gaW4gdGhlIDphbmltYXRlZCBzZWxlY3RvclxuICAgICAgZGVsZXRlIHRpY2suZWxlbTtcbiAgICB9KSxcbiAgICB0aWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIHN0b3BwZWQgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBjdXJyZW50VGltZSA9IGZ4Tm93IHx8IGNyZWF0ZUZ4Tm93KCksXG4gICAgICAgIHJlbWFpbmluZyA9IE1hdGgubWF4KCAwLCBhbmltYXRpb24uc3RhcnRUaW1lICsgYW5pbWF0aW9uLmR1cmF0aW9uIC0gY3VycmVudFRpbWUgKSxcbiAgICAgICAgLy8gYXJjaGFpYyBjcmFzaCBidWcgd29uJ3QgYWxsb3cgdXMgdG8gdXNlIDEgLSAoIDAuNSB8fCAwICkgKCMxMjQ5NylcbiAgICAgICAgdGVtcCA9IHJlbWFpbmluZyAvIGFuaW1hdGlvbi5kdXJhdGlvbiB8fCAwLFxuICAgICAgICBwZXJjZW50ID0gMSAtIHRlbXAsXG4gICAgICAgIGluZGV4ID0gMCxcbiAgICAgICAgbGVuZ3RoID0gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGg7XG5cbiAgICAgIGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuICAgICAgICBhbmltYXRpb24udHdlZW5zWyBpbmRleCBdLnJ1biggcGVyY2VudCApO1xuICAgICAgfVxuXG4gICAgICBkZWZlcnJlZC5ub3RpZnlXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgcGVyY2VudCwgcmVtYWluaW5nIF0pO1xuXG4gICAgICBpZiAoIHBlcmNlbnQgPCAxICYmIGxlbmd0aCApIHtcbiAgICAgICAgcmV0dXJuIHJlbWFpbmluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiBdICk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFuaW1hdGlvbiA9IGRlZmVycmVkLnByb21pc2Uoe1xuICAgICAgZWxlbTogZWxlbSxcbiAgICAgIHByb3BzOiBqUXVlcnkuZXh0ZW5kKCB7fSwgcHJvcGVydGllcyApLFxuICAgICAgb3B0czogalF1ZXJ5LmV4dGVuZCggdHJ1ZSwgeyBzcGVjaWFsRWFzaW5nOiB7fSB9LCBvcHRpb25zICksXG4gICAgICBvcmlnaW5hbFByb3BlcnRpZXM6IHByb3BlcnRpZXMsXG4gICAgICBvcmlnaW5hbE9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICBzdGFydFRpbWU6IGZ4Tm93IHx8IGNyZWF0ZUZ4Tm93KCksXG4gICAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcbiAgICAgIHR3ZWVuczogW10sXG4gICAgICBjcmVhdGVUd2VlbjogZnVuY3Rpb24oIHByb3AsIGVuZCApIHtcbiAgICAgICAgdmFyIHR3ZWVuID0galF1ZXJ5LlR3ZWVuKCBlbGVtLCBhbmltYXRpb24ub3B0cywgcHJvcCwgZW5kLFxuICAgICAgICAgICAgYW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZ1sgcHJvcCBdIHx8IGFuaW1hdGlvbi5vcHRzLmVhc2luZyApO1xuICAgICAgICBhbmltYXRpb24udHdlZW5zLnB1c2goIHR3ZWVuICk7XG4gICAgICAgIHJldHVybiB0d2VlbjtcbiAgICAgIH0sXG4gICAgICBzdG9wOiBmdW5jdGlvbiggZ290b0VuZCApIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMCxcbiAgICAgICAgICAvLyBpZiB3ZSBhcmUgZ29pbmcgdG8gdGhlIGVuZCwgd2Ugd2FudCB0byBydW4gYWxsIHRoZSB0d2VlbnNcbiAgICAgICAgICAvLyBvdGhlcndpc2Ugd2Ugc2tpcCB0aGlzIHBhcnRcbiAgICAgICAgICBsZW5ndGggPSBnb3RvRW5kID8gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGggOiAwO1xuICAgICAgICBpZiAoIHN0b3BwZWQgKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcHBlZCA9IHRydWU7XG4gICAgICAgIGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuICAgICAgICAgIGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCAxICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNvbHZlIHdoZW4gd2UgcGxheWVkIHRoZSBsYXN0IGZyYW1lXG4gICAgICAgIC8vIG90aGVyd2lzZSwgcmVqZWN0XG4gICAgICAgIGlmICggZ290b0VuZCApIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlZmVycmVkLnJlamVjdFdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBnb3RvRW5kIF0gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9KSxcbiAgICBwcm9wcyA9IGFuaW1hdGlvbi5wcm9wcztcblxuICBwcm9wRmlsdGVyKCBwcm9wcywgYW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZyApO1xuXG4gIGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuICAgIHJlc3VsdCA9IGFuaW1hdGlvblByZWZpbHRlcnNbIGluZGV4IF0uY2FsbCggYW5pbWF0aW9uLCBlbGVtLCBwcm9wcywgYW5pbWF0aW9uLm9wdHMgKTtcbiAgICBpZiAoIHJlc3VsdCApIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgalF1ZXJ5Lm1hcCggcHJvcHMsIGNyZWF0ZVR3ZWVuLCBhbmltYXRpb24gKTtcblxuICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBhbmltYXRpb24ub3B0cy5zdGFydCApICkge1xuICAgIGFuaW1hdGlvbi5vcHRzLnN0YXJ0LmNhbGwoIGVsZW0sIGFuaW1hdGlvbiApO1xuICB9XG5cbiAgalF1ZXJ5LmZ4LnRpbWVyKFxuICAgIGpRdWVyeS5leHRlbmQoIHRpY2ssIHtcbiAgICAgIGVsZW06IGVsZW0sXG4gICAgICBhbmltOiBhbmltYXRpb24sXG4gICAgICBxdWV1ZTogYW5pbWF0aW9uLm9wdHMucXVldWVcbiAgICB9KVxuICApO1xuXG4gIC8vIGF0dGFjaCBjYWxsYmFja3MgZnJvbSBvcHRpb25zXG4gIHJldHVybiBhbmltYXRpb24ucHJvZ3Jlc3MoIGFuaW1hdGlvbi5vcHRzLnByb2dyZXNzIClcbiAgICAuZG9uZSggYW5pbWF0aW9uLm9wdHMuZG9uZSwgYW5pbWF0aW9uLm9wdHMuY29tcGxldGUgKVxuICAgIC5mYWlsKCBhbmltYXRpb24ub3B0cy5mYWlsIClcbiAgICAuYWx3YXlzKCBhbmltYXRpb24ub3B0cy5hbHdheXMgKTtcbn1cblxualF1ZXJ5LkFuaW1hdGlvbiA9IGpRdWVyeS5leHRlbmQoIEFuaW1hdGlvbiwge1xuICB0d2VlbmVyOiBmdW5jdGlvbiggcHJvcHMsIGNhbGxiYWNrICkge1xuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHByb3BzICkgKSB7XG4gICAgICBjYWxsYmFjayA9IHByb3BzO1xuICAgICAgcHJvcHMgPSBbIFwiKlwiIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb3BzID0gcHJvcHMuc3BsaXQoXCIgXCIpO1xuICAgIH1cblxuICAgIHZhciBwcm9wLFxuICAgICAgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgZm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG4gICAgICBwcm9wID0gcHJvcHNbIGluZGV4IF07XG4gICAgICB0d2VlbmVyc1sgcHJvcCBdID0gdHdlZW5lcnNbIHByb3AgXSB8fCBbXTtcbiAgICAgIHR3ZWVuZXJzWyBwcm9wIF0udW5zaGlmdCggY2FsbGJhY2sgKTtcbiAgICB9XG4gIH0sXG5cbiAgcHJlZmlsdGVyOiBmdW5jdGlvbiggY2FsbGJhY2ssIHByZXBlbmQgKSB7XG4gICAgaWYgKCBwcmVwZW5kICkge1xuICAgICAgYW5pbWF0aW9uUHJlZmlsdGVycy51bnNoaWZ0KCBjYWxsYmFjayApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbmltYXRpb25QcmVmaWx0ZXJzLnB1c2goIGNhbGxiYWNrICk7XG4gICAgfVxuICB9XG59KTtcblxualF1ZXJ5LnNwZWVkID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGZuICkge1xuICB2YXIgb3B0ID0gc3BlZWQgJiYgdHlwZW9mIHNwZWVkID09PSBcIm9iamVjdFwiID8galF1ZXJ5LmV4dGVuZCgge30sIHNwZWVkICkgOiB7XG4gICAgY29tcGxldGU6IGZuIHx8ICFmbiAmJiBlYXNpbmcgfHxcbiAgICAgIGpRdWVyeS5pc0Z1bmN0aW9uKCBzcGVlZCApICYmIHNwZWVkLFxuICAgIGR1cmF0aW9uOiBzcGVlZCxcbiAgICBlYXNpbmc6IGZuICYmIGVhc2luZyB8fCBlYXNpbmcgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKCBlYXNpbmcgKSAmJiBlYXNpbmdcbiAgfTtcblxuICBvcHQuZHVyYXRpb24gPSBqUXVlcnkuZngub2ZmID8gMCA6IHR5cGVvZiBvcHQuZHVyYXRpb24gPT09IFwibnVtYmVyXCIgPyBvcHQuZHVyYXRpb24gOlxuICAgIG9wdC5kdXJhdGlvbiBpbiBqUXVlcnkuZnguc3BlZWRzID8galF1ZXJ5LmZ4LnNwZWVkc1sgb3B0LmR1cmF0aW9uIF0gOiBqUXVlcnkuZnguc3BlZWRzLl9kZWZhdWx0O1xuXG4gIC8vIG5vcm1hbGl6ZSBvcHQucXVldWUgLSB0cnVlL3VuZGVmaW5lZC9udWxsIC0+IFwiZnhcIlxuICBpZiAoIG9wdC5xdWV1ZSA9PSBudWxsIHx8IG9wdC5xdWV1ZSA9PT0gdHJ1ZSApIHtcbiAgICBvcHQucXVldWUgPSBcImZ4XCI7XG4gIH1cblxuICAvLyBRdWV1ZWluZ1xuICBvcHQub2xkID0gb3B0LmNvbXBsZXRlO1xuXG4gIG9wdC5jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIG9wdC5vbGQgKSApIHtcbiAgICAgIG9wdC5vbGQuY2FsbCggdGhpcyApO1xuICAgIH1cblxuICAgIGlmICggb3B0LnF1ZXVlICkge1xuICAgICAgalF1ZXJ5LmRlcXVldWUoIHRoaXMsIG9wdC5xdWV1ZSApO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gb3B0O1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIGZhZGVUbzogZnVuY3Rpb24oIHNwZWVkLCB0bywgZWFzaW5nLCBjYWxsYmFjayApIHtcblxuICAgIC8vIHNob3cgYW55IGhpZGRlbiBlbGVtZW50cyBhZnRlciBzZXR0aW5nIG9wYWNpdHkgdG8gMFxuICAgIHJldHVybiB0aGlzLmZpbHRlciggaXNIaWRkZW4gKS5jc3MoIFwib3BhY2l0eVwiLCAwICkuc2hvdygpXG5cbiAgICAgIC8vIGFuaW1hdGUgdG8gdGhlIHZhbHVlIHNwZWNpZmllZFxuICAgICAgLmVuZCgpLmFuaW1hdGUoeyBvcGFjaXR5OiB0byB9LCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuICB9LFxuICBhbmltYXRlOiBmdW5jdGlvbiggcHJvcCwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG4gICAgdmFyIGVtcHR5ID0galF1ZXJ5LmlzRW1wdHlPYmplY3QoIHByb3AgKSxcbiAgICAgIG9wdGFsbCA9IGpRdWVyeS5zcGVlZCggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSxcbiAgICAgIGRvQW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIE9wZXJhdGUgb24gYSBjb3B5IG9mIHByb3Agc28gcGVyLXByb3BlcnR5IGVhc2luZyB3b24ndCBiZSBsb3N0XG4gICAgICAgIHZhciBhbmltID0gQW5pbWF0aW9uKCB0aGlzLCBqUXVlcnkuZXh0ZW5kKCB7fSwgcHJvcCApLCBvcHRhbGwgKTtcblxuICAgICAgICAvLyBFbXB0eSBhbmltYXRpb25zLCBvciBmaW5pc2hpbmcgcmVzb2x2ZXMgaW1tZWRpYXRlbHlcbiAgICAgICAgaWYgKCBlbXB0eSB8fCBqUXVlcnkuX2RhdGEoIHRoaXMsIFwiZmluaXNoXCIgKSApIHtcbiAgICAgICAgICBhbmltLnN0b3AoIHRydWUgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGRvQW5pbWF0aW9uLmZpbmlzaCA9IGRvQW5pbWF0aW9uO1xuXG4gICAgcmV0dXJuIGVtcHR5IHx8IG9wdGFsbC5xdWV1ZSA9PT0gZmFsc2UgP1xuICAgICAgdGhpcy5lYWNoKCBkb0FuaW1hdGlvbiApIDpcbiAgICAgIHRoaXMucXVldWUoIG9wdGFsbC5xdWV1ZSwgZG9BbmltYXRpb24gKTtcbiAgfSxcbiAgc3RvcDogZnVuY3Rpb24oIHR5cGUsIGNsZWFyUXVldWUsIGdvdG9FbmQgKSB7XG4gICAgdmFyIHN0b3BRdWV1ZSA9IGZ1bmN0aW9uKCBob29rcyApIHtcbiAgICAgIHZhciBzdG9wID0gaG9va3Muc3RvcDtcbiAgICAgIGRlbGV0ZSBob29rcy5zdG9wO1xuICAgICAgc3RvcCggZ290b0VuZCApO1xuICAgIH07XG5cbiAgICBpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuICAgICAgZ290b0VuZCA9IGNsZWFyUXVldWU7XG4gICAgICBjbGVhclF1ZXVlID0gdHlwZTtcbiAgICAgIHR5cGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICggY2xlYXJRdWV1ZSAmJiB0eXBlICE9PSBmYWxzZSApIHtcbiAgICAgIHRoaXMucXVldWUoIHR5cGUgfHwgXCJmeFwiLCBbXSApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVxdWV1ZSA9IHRydWUsXG4gICAgICAgIGluZGV4ID0gdHlwZSAhPSBudWxsICYmIHR5cGUgKyBcInF1ZXVlSG9va3NcIixcbiAgICAgICAgdGltZXJzID0galF1ZXJ5LnRpbWVycyxcbiAgICAgICAgZGF0YSA9IGpRdWVyeS5fZGF0YSggdGhpcyApO1xuXG4gICAgICBpZiAoIGluZGV4ICkge1xuICAgICAgICBpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICkge1xuICAgICAgICAgIHN0b3BRdWV1ZSggZGF0YVsgaW5kZXggXSApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKCBpbmRleCBpbiBkYXRhICkge1xuICAgICAgICAgIGlmICggZGF0YVsgaW5kZXggXSAmJiBkYXRhWyBpbmRleCBdLnN0b3AgJiYgcnJ1bi50ZXN0KCBpbmRleCApICkge1xuICAgICAgICAgICAgc3RvcFF1ZXVlKCBkYXRhWyBpbmRleCBdICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoIGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG4gICAgICAgIGlmICggdGltZXJzWyBpbmRleCBdLmVsZW0gPT09IHRoaXMgJiYgKHR5cGUgPT0gbnVsbCB8fCB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUpICkge1xuICAgICAgICAgIHRpbWVyc1sgaW5kZXggXS5hbmltLnN0b3AoIGdvdG9FbmQgKTtcbiAgICAgICAgICBkZXF1ZXVlID0gZmFsc2U7XG4gICAgICAgICAgdGltZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzdGFydCB0aGUgbmV4dCBpbiB0aGUgcXVldWUgaWYgdGhlIGxhc3Qgc3RlcCB3YXNuJ3QgZm9yY2VkXG4gICAgICAvLyB0aW1lcnMgY3VycmVudGx5IHdpbGwgY2FsbCB0aGVpciBjb21wbGV0ZSBjYWxsYmFja3MsIHdoaWNoIHdpbGwgZGVxdWV1ZVxuICAgICAgLy8gYnV0IG9ubHkgaWYgdGhleSB3ZXJlIGdvdG9FbmRcbiAgICAgIGlmICggZGVxdWV1ZSB8fCAhZ290b0VuZCApIHtcbiAgICAgICAgalF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgZmluaXNoOiBmdW5jdGlvbiggdHlwZSApIHtcbiAgICBpZiAoIHR5cGUgIT09IGZhbHNlICkge1xuICAgICAgdHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGluZGV4LFxuICAgICAgICBkYXRhID0galF1ZXJ5Ll9kYXRhKCB0aGlzICksXG4gICAgICAgIHF1ZXVlID0gZGF0YVsgdHlwZSArIFwicXVldWVcIiBdLFxuICAgICAgICBob29rcyA9IGRhdGFbIHR5cGUgKyBcInF1ZXVlSG9va3NcIiBdLFxuICAgICAgICB0aW1lcnMgPSBqUXVlcnkudGltZXJzLFxuICAgICAgICBsZW5ndGggPSBxdWV1ZSA/IHF1ZXVlLmxlbmd0aCA6IDA7XG5cbiAgICAgIC8vIGVuYWJsZSBmaW5pc2hpbmcgZmxhZyBvbiBwcml2YXRlIGRhdGFcbiAgICAgIGRhdGEuZmluaXNoID0gdHJ1ZTtcblxuICAgICAgLy8gZW1wdHkgdGhlIHF1ZXVlIGZpcnN0XG4gICAgICBqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIFtdICk7XG5cbiAgICAgIGlmICggaG9va3MgJiYgaG9va3Muc3RvcCApIHtcbiAgICAgICAgaG9va3Muc3RvcC5jYWxsKCB0aGlzLCB0cnVlICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxvb2sgZm9yIGFueSBhY3RpdmUgYW5pbWF0aW9ucywgYW5kIGZpbmlzaCB0aGVtXG4gICAgICBmb3IgKCBpbmRleCA9IHRpbWVycy5sZW5ndGg7IGluZGV4LS07ICkge1xuICAgICAgICBpZiAoIHRpbWVyc1sgaW5kZXggXS5lbGVtID09PSB0aGlzICYmIHRpbWVyc1sgaW5kZXggXS5xdWV1ZSA9PT0gdHlwZSApIHtcbiAgICAgICAgICB0aW1lcnNbIGluZGV4IF0uYW5pbS5zdG9wKCB0cnVlICk7XG4gICAgICAgICAgdGltZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBsb29rIGZvciBhbnkgYW5pbWF0aW9ucyBpbiB0aGUgb2xkIHF1ZXVlIGFuZCBmaW5pc2ggdGhlbVxuICAgICAgZm9yICggaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcbiAgICAgICAgaWYgKCBxdWV1ZVsgaW5kZXggXSAmJiBxdWV1ZVsgaW5kZXggXS5maW5pc2ggKSB7XG4gICAgICAgICAgcXVldWVbIGluZGV4IF0uZmluaXNoLmNhbGwoIHRoaXMgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0dXJuIG9mZiBmaW5pc2hpbmcgZmxhZ1xuICAgICAgZGVsZXRlIGRhdGEuZmluaXNoO1xuICAgIH0pO1xuICB9XG59KTtcblxualF1ZXJ5LmVhY2goWyBcInRvZ2dsZVwiLCBcInNob3dcIiwgXCJoaWRlXCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG4gIHZhciBjc3NGbiA9IGpRdWVyeS5mblsgbmFtZSBdO1xuICBqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcbiAgICByZXR1cm4gc3BlZWQgPT0gbnVsbCB8fCB0eXBlb2Ygc3BlZWQgPT09IFwiYm9vbGVhblwiID9cbiAgICAgIGNzc0ZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSA6XG4gICAgICB0aGlzLmFuaW1hdGUoIGdlbkZ4KCBuYW1lLCB0cnVlICksIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICk7XG4gIH07XG59KTtcblxuLy8gR2VuZXJhdGUgc2hvcnRjdXRzIGZvciBjdXN0b20gYW5pbWF0aW9uc1xualF1ZXJ5LmVhY2goe1xuICBzbGlkZURvd246IGdlbkZ4KFwic2hvd1wiKSxcbiAgc2xpZGVVcDogZ2VuRngoXCJoaWRlXCIpLFxuICBzbGlkZVRvZ2dsZTogZ2VuRngoXCJ0b2dnbGVcIiksXG4gIGZhZGVJbjogeyBvcGFjaXR5OiBcInNob3dcIiB9LFxuICBmYWRlT3V0OiB7IG9wYWNpdHk6IFwiaGlkZVwiIH0sXG4gIGZhZGVUb2dnbGU6IHsgb3BhY2l0eTogXCJ0b2dnbGVcIiB9XG59LCBmdW5jdGlvbiggbmFtZSwgcHJvcHMgKSB7XG4gIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuICAgIHJldHVybiB0aGlzLmFuaW1hdGUoIHByb3BzLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuICB9O1xufSk7XG5cbmpRdWVyeS50aW1lcnMgPSBbXTtcbmpRdWVyeS5meC50aWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aW1lcixcbiAgICB0aW1lcnMgPSBqUXVlcnkudGltZXJzLFxuICAgIGkgPSAwO1xuXG4gIGZ4Tm93ID0galF1ZXJ5Lm5vdygpO1xuXG4gIGZvciAoIDsgaSA8IHRpbWVycy5sZW5ndGg7IGkrKyApIHtcbiAgICB0aW1lciA9IHRpbWVyc1sgaSBdO1xuICAgIC8vIENoZWNrcyB0aGUgdGltZXIgaGFzIG5vdCBhbHJlYWR5IGJlZW4gcmVtb3ZlZFxuICAgIGlmICggIXRpbWVyKCkgJiYgdGltZXJzWyBpIF0gPT09IHRpbWVyICkge1xuICAgICAgdGltZXJzLnNwbGljZSggaS0tLCAxICk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCAhdGltZXJzLmxlbmd0aCApIHtcbiAgICBqUXVlcnkuZnguc3RvcCgpO1xuICB9XG4gIGZ4Tm93ID0gdW5kZWZpbmVkO1xufTtcblxualF1ZXJ5LmZ4LnRpbWVyID0gZnVuY3Rpb24oIHRpbWVyICkge1xuICBqUXVlcnkudGltZXJzLnB1c2goIHRpbWVyICk7XG4gIGlmICggdGltZXIoKSApIHtcbiAgICBqUXVlcnkuZnguc3RhcnQoKTtcbiAgfSBlbHNlIHtcbiAgICBqUXVlcnkudGltZXJzLnBvcCgpO1xuICB9XG59O1xuXG5qUXVlcnkuZnguaW50ZXJ2YWwgPSAxMztcblxualF1ZXJ5LmZ4LnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRpbWVySWQgKSB7XG4gICAgdGltZXJJZCA9IHNldEludGVydmFsKCBqUXVlcnkuZngudGljaywgalF1ZXJ5LmZ4LmludGVydmFsICk7XG4gIH1cbn07XG5cbmpRdWVyeS5meC5zdG9wID0gZnVuY3Rpb24oKSB7XG4gIGNsZWFySW50ZXJ2YWwoIHRpbWVySWQgKTtcbiAgdGltZXJJZCA9IG51bGw7XG59O1xuXG5qUXVlcnkuZnguc3BlZWRzID0ge1xuICBzbG93OiA2MDAsXG4gIGZhc3Q6IDIwMCxcbiAgLy8gRGVmYXVsdCBzcGVlZFxuICBfZGVmYXVsdDogNDAwXG59O1xuXG5cbi8vIEJhc2VkIG9mZiBvZiB0aGUgcGx1Z2luIGJ5IENsaW50IEhlbGZlcnMsIHdpdGggcGVybWlzc2lvbi5cbi8vIGh0dHA6Ly9ibGluZHNpZ25hbHMuY29tL2luZGV4LnBocC8yMDA5LzA3L2pxdWVyeS1kZWxheS9cbmpRdWVyeS5mbi5kZWxheSA9IGZ1bmN0aW9uKCB0aW1lLCB0eXBlICkge1xuICB0aW1lID0galF1ZXJ5LmZ4ID8galF1ZXJ5LmZ4LnNwZWVkc1sgdGltZSBdIHx8IHRpbWUgOiB0aW1lO1xuICB0eXBlID0gdHlwZSB8fCBcImZ4XCI7XG5cbiAgcmV0dXJuIHRoaXMucXVldWUoIHR5cGUsIGZ1bmN0aW9uKCBuZXh0LCBob29rcyApIHtcbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoIG5leHQsIHRpbWUgKTtcbiAgICBob29rcy5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICBjbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcbiAgICB9O1xuICB9KTtcbn07XG5cblxuKGZ1bmN0aW9uKCkge1xuICAvLyBNaW5pZmllZDogdmFyIGEsYixjLGQsZVxuICB2YXIgaW5wdXQsIGRpdiwgc2VsZWN0LCBhLCBvcHQ7XG5cbiAgLy8gU2V0dXBcbiAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuICBkaXYuc2V0QXR0cmlidXRlKCBcImNsYXNzTmFtZVwiLCBcInRcIiApO1xuICBkaXYuaW5uZXJIVE1MID0gXCIgIDxsaW5rLz48dGFibGU+PC90YWJsZT48YSBocmVmPScvYSc+YTwvYT48aW5wdXQgdHlwZT0nY2hlY2tib3gnLz5cIjtcbiAgYSA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFcIilbIDAgXTtcblxuICAvLyBGaXJzdCBiYXRjaCBvZiB0ZXN0cy5cbiAgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgb3B0ID0gc2VsZWN0LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpICk7XG4gIGlucHV0ID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIilbIDAgXTtcblxuICBhLnN0eWxlLmNzc1RleHQgPSBcInRvcDoxcHhcIjtcblxuICAvLyBUZXN0IHNldEF0dHJpYnV0ZSBvbiBjYW1lbENhc2UgY2xhc3MuIElmIGl0IHdvcmtzLCB3ZSBuZWVkIGF0dHJGaXhlcyB3aGVuIGRvaW5nIGdldC9zZXRBdHRyaWJ1dGUgKGllNi83KVxuICBzdXBwb3J0LmdldFNldEF0dHJpYnV0ZSA9IGRpdi5jbGFzc05hbWUgIT09IFwidFwiO1xuXG4gIC8vIEdldCB0aGUgc3R5bGUgaW5mb3JtYXRpb24gZnJvbSBnZXRBdHRyaWJ1dGVcbiAgLy8gKElFIHVzZXMgLmNzc1RleHQgaW5zdGVhZClcbiAgc3VwcG9ydC5zdHlsZSA9IC90b3AvLnRlc3QoIGEuZ2V0QXR0cmlidXRlKFwic3R5bGVcIikgKTtcblxuICAvLyBNYWtlIHN1cmUgdGhhdCBVUkxzIGFyZW4ndCBtYW5pcHVsYXRlZFxuICAvLyAoSUUgbm9ybWFsaXplcyBpdCBieSBkZWZhdWx0KVxuICBzdXBwb3J0LmhyZWZOb3JtYWxpemVkID0gYS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBcIi9hXCI7XG5cbiAgLy8gQ2hlY2sgdGhlIGRlZmF1bHQgY2hlY2tib3gvcmFkaW8gdmFsdWUgKFwiXCIgb24gV2ViS2l0OyBcIm9uXCIgZWxzZXdoZXJlKVxuICBzdXBwb3J0LmNoZWNrT24gPSAhIWlucHV0LnZhbHVlO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IGEgc2VsZWN0ZWQtYnktZGVmYXVsdCBvcHRpb24gaGFzIGEgd29ya2luZyBzZWxlY3RlZCBwcm9wZXJ0eS5cbiAgLy8gKFdlYktpdCBkZWZhdWx0cyB0byBmYWxzZSBpbnN0ZWFkIG9mIHRydWUsIElFIHRvbywgaWYgaXQncyBpbiBhbiBvcHRncm91cClcbiAgc3VwcG9ydC5vcHRTZWxlY3RlZCA9IG9wdC5zZWxlY3RlZDtcblxuICAvLyBUZXN0cyBmb3IgZW5jdHlwZSBzdXBwb3J0IG9uIGEgZm9ybSAoIzY3NDMpXG4gIHN1cHBvcnQuZW5jdHlwZSA9ICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIikuZW5jdHlwZTtcblxuICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgb3B0aW9ucyBpbnNpZGUgZGlzYWJsZWQgc2VsZWN0cyBhcmVuJ3QgbWFya2VkIGFzIGRpc2FibGVkXG4gIC8vIChXZWJLaXQgbWFya3MgdGhlbSBhcyBkaXNhYmxlZClcbiAgc2VsZWN0LmRpc2FibGVkID0gdHJ1ZTtcbiAgc3VwcG9ydC5vcHREaXNhYmxlZCA9ICFvcHQuZGlzYWJsZWQ7XG5cbiAgLy8gU3VwcG9ydDogSUU4IG9ubHlcbiAgLy8gQ2hlY2sgaWYgd2UgY2FuIHRydXN0IGdldEF0dHJpYnV0ZShcInZhbHVlXCIpXG4gIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG4gIGlucHV0LnNldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiLCBcIlwiICk7XG4gIHN1cHBvcnQuaW5wdXQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBcIlwiO1xuXG4gIC8vIENoZWNrIGlmIGFuIGlucHV0IG1haW50YWlucyBpdHMgdmFsdWUgYWZ0ZXIgYmVjb21pbmcgYSByYWRpb1xuICBpbnB1dC52YWx1ZSA9IFwidFwiO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcInJhZGlvXCIgKTtcbiAgc3VwcG9ydC5yYWRpb1ZhbHVlID0gaW5wdXQudmFsdWUgPT09IFwidFwiO1xufSkoKTtcblxuXG52YXIgcnJldHVybiA9IC9cXHIvZztcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHZhbDogZnVuY3Rpb24oIHZhbHVlICkge1xuICAgIHZhciBob29rcywgcmV0LCBpc0Z1bmN0aW9uLFxuICAgICAgZWxlbSA9IHRoaXNbMF07XG5cbiAgICBpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuICAgICAgaWYgKCBlbGVtICkge1xuICAgICAgICBob29rcyA9IGpRdWVyeS52YWxIb29rc1sgZWxlbS50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuICAgICAgICBpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgXCJ2YWx1ZVwiICkpICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldCA9IGVsZW0udmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIgP1xuICAgICAgICAgIC8vIGhhbmRsZSBtb3N0IGNvbW1vbiBzdHJpbmcgY2FzZXNcbiAgICAgICAgICByZXQucmVwbGFjZShycmV0dXJuLCBcIlwiKSA6XG4gICAgICAgICAgLy8gaGFuZGxlIGNhc2VzIHdoZXJlIHZhbHVlIGlzIG51bGwvdW5kZWYgb3IgbnVtYmVyXG4gICAgICAgICAgcmV0ID09IG51bGwgPyBcIlwiIDogcmV0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcbiAgICAgIHZhciB2YWw7XG5cbiAgICAgIGlmICggdGhpcy5ub2RlVHlwZSAhPT0gMSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIGlzRnVuY3Rpb24gKSB7XG4gICAgICAgIHZhbCA9IHZhbHVlLmNhbGwoIHRoaXMsIGksIGpRdWVyeSggdGhpcyApLnZhbCgpICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gVHJlYXQgbnVsbC91bmRlZmluZWQgYXMgXCJcIjsgY29udmVydCBudW1iZXJzIHRvIHN0cmluZ1xuICAgICAgaWYgKCB2YWwgPT0gbnVsbCApIHtcbiAgICAgICAgdmFsID0gXCJcIjtcbiAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIgKSB7XG4gICAgICAgIHZhbCArPSBcIlwiO1xuICAgICAgfSBlbHNlIGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbCApICkge1xuICAgICAgICB2YWwgPSBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCI7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBob29rcyA9IGpRdWVyeS52YWxIb29rc1sgdGhpcy50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyB0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuICAgICAgLy8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcbiAgICAgIGlmICggIWhvb2tzIHx8ICEoXCJzZXRcIiBpbiBob29rcykgfHwgaG9va3Muc2V0KCB0aGlzLCB2YWwsIFwidmFsdWVcIiApID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgdmFsSG9va3M6IHtcbiAgICBvcHRpb246IHtcbiAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHZhciB2YWwgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInZhbHVlXCIgKTtcbiAgICAgICAgcmV0dXJuIHZhbCAhPSBudWxsID9cbiAgICAgICAgICB2YWwgOlxuICAgICAgICAgIC8vIFN1cHBvcnQ6IElFMTAtMTErXG4gICAgICAgICAgLy8gb3B0aW9uLnRleHQgdGhyb3dzIGV4Y2VwdGlvbnMgKCMxNDY4NiwgIzE0ODU4KVxuICAgICAgICAgIGpRdWVyeS50cmltKCBqUXVlcnkudGV4dCggZWxlbSApICk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHZhciB2YWx1ZSwgb3B0aW9uLFxuICAgICAgICAgIG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG4gICAgICAgICAgaW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXgsXG4gICAgICAgICAgb25lID0gZWxlbS50eXBlID09PSBcInNlbGVjdC1vbmVcIiB8fCBpbmRleCA8IDAsXG4gICAgICAgICAgdmFsdWVzID0gb25lID8gbnVsbCA6IFtdLFxuICAgICAgICAgIG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoLFxuICAgICAgICAgIGkgPSBpbmRleCA8IDAgP1xuICAgICAgICAgICAgbWF4IDpcbiAgICAgICAgICAgIG9uZSA/IGluZGV4IDogMDtcblxuICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG4gICAgICAgIGZvciAoIDsgaSA8IG1heDsgaSsrICkge1xuICAgICAgICAgIG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuICAgICAgICAgIC8vIG9sZElFIGRvZXNuJ3QgdXBkYXRlIHNlbGVjdGVkIGFmdGVyIGZvcm0gcmVzZXQgKCMyNTUxKVxuICAgICAgICAgIGlmICggKCBvcHRpb24uc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXggKSAmJlxuICAgICAgICAgICAgICAvLyBEb24ndCByZXR1cm4gb3B0aW9ucyB0aGF0IGFyZSBkaXNhYmxlZCBvciBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG4gICAgICAgICAgICAgICggc3VwcG9ydC5vcHREaXNhYmxlZCA/ICFvcHRpb24uZGlzYWJsZWQgOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIikgPT09IG51bGwgKSAmJlxuICAgICAgICAgICAgICAoICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCB8fCAhalF1ZXJ5Lm5vZGVOYW1lKCBvcHRpb24ucGFyZW50Tm9kZSwgXCJvcHRncm91cFwiICkgKSApIHtcblxuICAgICAgICAgICAgLy8gR2V0IHRoZSBzcGVjaWZpYyB2YWx1ZSBmb3IgdGhlIG9wdGlvblxuICAgICAgICAgICAgdmFsdWUgPSBqUXVlcnkoIG9wdGlvbiApLnZhbCgpO1xuXG4gICAgICAgICAgICAvLyBXZSBkb24ndCBuZWVkIGFuIGFycmF5IGZvciBvbmUgc2VsZWN0c1xuICAgICAgICAgICAgaWYgKCBvbmUgKSB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTXVsdGktU2VsZWN0cyByZXR1cm4gYW4gYXJyYXlcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKCB2YWx1ZSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcbiAgICAgICAgdmFyIG9wdGlvblNldCwgb3B0aW9uLFxuICAgICAgICAgIG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG4gICAgICAgICAgdmFsdWVzID0galF1ZXJ5Lm1ha2VBcnJheSggdmFsdWUgKSxcbiAgICAgICAgICBpID0gb3B0aW9ucy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgb3B0aW9uID0gb3B0aW9uc1sgaSBdO1xuXG4gICAgICAgICAgaWYgKCBqUXVlcnkuaW5BcnJheSggalF1ZXJ5LnZhbEhvb2tzLm9wdGlvbi5nZXQoIG9wdGlvbiApLCB2YWx1ZXMgKSA+PSAwICkge1xuXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTZcbiAgICAgICAgICAgIC8vIFdoZW4gbmV3IG9wdGlvbiBlbGVtZW50IGlzIGFkZGVkIHRvIHNlbGVjdCBib3ggd2UgbmVlZCB0b1xuICAgICAgICAgICAgLy8gZm9yY2UgcmVmbG93IG9mIG5ld2x5IGFkZGVkIG5vZGUgaW4gb3JkZXIgdG8gd29ya2Fyb3VuZCBkZWxheVxuICAgICAgICAgICAgLy8gb2YgaW5pdGlhbGl6YXRpb24gcHJvcGVydGllc1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gb3B0aW9uU2V0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgfSBjYXRjaCAoIF8gKSB7XG5cbiAgICAgICAgICAgICAgLy8gV2lsbCBiZSBleGVjdXRlZCBvbmx5IGluIElFNlxuICAgICAgICAgICAgICBvcHRpb24uc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XG4gICAgICAgIGlmICggIW9wdGlvblNldCApIHtcbiAgICAgICAgICBlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbi8vIFJhZGlvcyBhbmQgY2hlY2tib3hlcyBnZXR0ZXIvc2V0dGVyXG5qUXVlcnkuZWFjaChbIFwicmFkaW9cIiwgXCJjaGVja2JveFwiIF0sIGZ1bmN0aW9uKCkge1xuICBqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IHtcbiAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcbiAgICAgIGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG4gICAgICAgIHJldHVybiAoIGVsZW0uY2hlY2tlZCA9IGpRdWVyeS5pbkFycmF5KCBqUXVlcnkoZWxlbSkudmFsKCksIHZhbHVlICkgPj0gMCApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgaWYgKCAhc3VwcG9ydC5jaGVja09uICkge1xuICAgIGpRdWVyeS52YWxIb29rc1sgdGhpcyBdLmdldCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgLy8gU3VwcG9ydDogV2Via2l0XG4gICAgICAvLyBcIlwiIGlzIHJldHVybmVkIGluc3RlYWQgb2YgXCJvblwiIGlmIGEgdmFsdWUgaXNuJ3Qgc3BlY2lmaWVkXG4gICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA9PT0gbnVsbCA/IFwib25cIiA6IGVsZW0udmFsdWU7XG4gICAgfTtcbiAgfVxufSk7XG5cblxuXG5cbnZhciBub2RlSG9vaywgYm9vbEhvb2ssXG4gIGF0dHJIYW5kbGUgPSBqUXVlcnkuZXhwci5hdHRySGFuZGxlLFxuICBydXNlRGVmYXVsdCA9IC9eKD86Y2hlY2tlZHxzZWxlY3RlZCkkL2ksXG4gIGdldFNldEF0dHJpYnV0ZSA9IHN1cHBvcnQuZ2V0U2V0QXR0cmlidXRlLFxuICBnZXRTZXRJbnB1dCA9IHN1cHBvcnQuaW5wdXQ7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBhdHRyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG4gICAgcmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuICB9LFxuXG4gIHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkucmVtb3ZlQXR0ciggdGhpcywgbmFtZSApO1xuICAgIH0pO1xuICB9XG59KTtcblxualF1ZXJ5LmV4dGVuZCh7XG4gIGF0dHI6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcbiAgICB2YXIgaG9va3MsIHJldCxcbiAgICAgIG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuICAgIC8vIGRvbid0IGdldC9zZXQgYXR0cmlidXRlcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcbiAgICBpZiAoICFlbGVtIHx8IG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIHRvIHByb3Agd2hlbiBhdHRyaWJ1dGVzIGFyZSBub3Qgc3VwcG9ydGVkXG4gICAgaWYgKCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgPT09IHN0cnVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBqUXVlcnkucHJvcCggZWxlbSwgbmFtZSwgdmFsdWUgKTtcbiAgICB9XG5cbiAgICAvLyBBbGwgYXR0cmlidXRlcyBhcmUgbG93ZXJjYXNlXG4gICAgLy8gR3JhYiBuZWNlc3NhcnkgaG9vayBpZiBvbmUgaXMgZGVmaW5lZFxuICAgIGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGhvb2tzID0galF1ZXJ5LmF0dHJIb29rc1sgbmFtZSBdIHx8XG4gICAgICAgICggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgPyBib29sSG9vayA6IG5vZGVIb29rICk7XG4gICAgfVxuXG4gICAgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICBpZiAoIHZhbHVlID09PSBudWxsICkge1xuICAgICAgICBqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXG4gICAgICB9IGVsc2UgaWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmIChyZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkpICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCB2YWx1ZSArIFwiXCIgKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkpICE9PSBudWxsICkge1xuICAgICAgcmV0dXJuIHJldDtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXQgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBuYW1lICk7XG5cbiAgICAgIC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG4gICAgICByZXR1cm4gcmV0ID09IG51bGwgP1xuICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICByZXQ7XG4gICAgfVxuICB9LFxuXG4gIHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcbiAgICB2YXIgbmFtZSwgcHJvcE5hbWUsXG4gICAgICBpID0gMCxcbiAgICAgIGF0dHJOYW1lcyA9IHZhbHVlICYmIHZhbHVlLm1hdGNoKCBybm90d2hpdGUgKTtcblxuICAgIGlmICggYXR0ck5hbWVzICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG4gICAgICB3aGlsZSAoIChuYW1lID0gYXR0ck5hbWVzW2krK10pICkge1xuICAgICAgICBwcm9wTmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcblxuICAgICAgICAvLyBCb29sZWFuIGF0dHJpYnV0ZXMgZ2V0IHNwZWNpYWwgdHJlYXRtZW50ICgjMTA4NzApXG4gICAgICAgIGlmICggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgKSB7XG4gICAgICAgICAgLy8gU2V0IGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgdG8gZmFsc2VcbiAgICAgICAgICBpZiAoIGdldFNldElucHV0ICYmIGdldFNldEF0dHJpYnV0ZSB8fCAhcnVzZURlZmF1bHQudGVzdCggbmFtZSApICkge1xuICAgICAgICAgICAgZWxlbVsgcHJvcE5hbWUgXSA9IGZhbHNlO1xuICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAgICAgICAvLyBBbHNvIGNsZWFyIGRlZmF1bHRDaGVja2VkL2RlZmF1bHRTZWxlY3RlZCAoaWYgYXBwcm9wcmlhdGUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1bIGpRdWVyeS5jYW1lbENhc2UoIFwiZGVmYXVsdC1cIiArIG5hbWUgKSBdID1cbiAgICAgICAgICAgICAgZWxlbVsgcHJvcE5hbWUgXSA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAvLyBTZWUgIzk2OTkgZm9yIGV4cGxhbmF0aW9uIG9mIHRoaXMgYXBwcm9hY2ggKHNldHRpbmcgZmlyc3QsIHRoZW4gcmVtb3ZhbClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBqUXVlcnkuYXR0ciggZWxlbSwgbmFtZSwgXCJcIiApO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIGdldFNldEF0dHJpYnV0ZSA/IG5hbWUgOiBwcm9wTmFtZSApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBhdHRySG9va3M6IHtcbiAgICB0eXBlOiB7XG4gICAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcbiAgICAgICAgaWYgKCAhc3VwcG9ydC5yYWRpb1ZhbHVlICYmIHZhbHVlID09PSBcInJhZGlvXCIgJiYgalF1ZXJ5Lm5vZGVOYW1lKGVsZW0sIFwiaW5wdXRcIikgKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyB0aGUgdHlwZSBvbiBhIHJhZGlvIGJ1dHRvbiBhZnRlciB0aGUgdmFsdWUgcmVzZXRzIHRoZSB2YWx1ZSBpbiBJRTYtOVxuICAgICAgICAgIC8vIFJlc2V0IHZhbHVlIHRvIGRlZmF1bHQgaW4gY2FzZSB0eXBlIGlzIHNldCBhZnRlciB2YWx1ZSBkdXJpbmcgY3JlYXRpb25cbiAgICAgICAgICB2YXIgdmFsID0gZWxlbS52YWx1ZTtcbiAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIHZhbHVlICk7XG4gICAgICAgICAgaWYgKCB2YWwgKSB7XG4gICAgICAgICAgICBlbGVtLnZhbHVlID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBIb29rIGZvciBib29sZWFuIGF0dHJpYnV0ZXNcbmJvb2xIb29rID0ge1xuICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcbiAgICBpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcbiAgICAgIC8vIFJlbW92ZSBib29sZWFuIGF0dHJpYnV0ZXMgd2hlbiBzZXQgdG8gZmFsc2VcbiAgICAgIGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG4gICAgfSBlbHNlIGlmICggZ2V0U2V0SW5wdXQgJiYgZ2V0U2V0QXR0cmlidXRlIHx8ICFydXNlRGVmYXVsdC50ZXN0KCBuYW1lICkgKSB7XG4gICAgICAvLyBJRTw4IG5lZWRzIHRoZSAqcHJvcGVydHkqIG5hbWVcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCAhZ2V0U2V0QXR0cmlidXRlICYmIGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZSwgbmFtZSApO1xuXG4gICAgLy8gVXNlIGRlZmF1bHRDaGVja2VkIGFuZCBkZWZhdWx0U2VsZWN0ZWQgZm9yIG9sZElFXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1bIGpRdWVyeS5jYW1lbENhc2UoIFwiZGVmYXVsdC1cIiArIG5hbWUgKSBdID0gZWxlbVsgbmFtZSBdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxufTtcblxuLy8gUmV0cmlldmUgYm9vbGVhbnMgc3BlY2lhbGx5XG5qUXVlcnkuZWFjaCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC5zb3VyY2UubWF0Y2goIC9cXHcrL2cgKSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cbiAgdmFyIGdldHRlciA9IGF0dHJIYW5kbGVbIG5hbWUgXSB8fCBqUXVlcnkuZmluZC5hdHRyO1xuXG4gIGF0dHJIYW5kbGVbIG5hbWUgXSA9IGdldFNldElucHV0ICYmIGdldFNldEF0dHJpYnV0ZSB8fCAhcnVzZURlZmF1bHQudGVzdCggbmFtZSApID9cbiAgICBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgICB2YXIgcmV0LCBoYW5kbGU7XG4gICAgICBpZiAoICFpc1hNTCApIHtcbiAgICAgICAgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcCBieSB0ZW1wb3JhcmlseSByZW1vdmluZyB0aGlzIGZ1bmN0aW9uIGZyb20gdGhlIGdldHRlclxuICAgICAgICBoYW5kbGUgPSBhdHRySGFuZGxlWyBuYW1lIF07XG4gICAgICAgIGF0dHJIYW5kbGVbIG5hbWUgXSA9IHJldDtcbiAgICAgICAgcmV0ID0gZ2V0dGVyKCBlbGVtLCBuYW1lLCBpc1hNTCApICE9IG51bGwgP1xuICAgICAgICAgIG5hbWUudG9Mb3dlckNhc2UoKSA6XG4gICAgICAgICAgbnVsbDtcbiAgICAgICAgYXR0ckhhbmRsZVsgbmFtZSBdID0gaGFuZGxlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9IDpcbiAgICBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgICBpZiAoICFpc1hNTCApIHtcbiAgICAgICAgcmV0dXJuIGVsZW1bIGpRdWVyeS5jYW1lbENhc2UoIFwiZGVmYXVsdC1cIiArIG5hbWUgKSBdID9cbiAgICAgICAgICBuYW1lLnRvTG93ZXJDYXNlKCkgOlxuICAgICAgICAgIG51bGw7XG4gICAgICB9XG4gICAgfTtcbn0pO1xuXG4vLyBmaXggb2xkSUUgYXR0cm9wZXJ0aWVzXG5pZiAoICFnZXRTZXRJbnB1dCB8fCAhZ2V0U2V0QXR0cmlidXRlICkge1xuICBqUXVlcnkuYXR0ckhvb2tzLnZhbHVlID0ge1xuICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuICAgICAgaWYgKCBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiaW5wdXRcIiApICkge1xuICAgICAgICAvLyBEb2VzIG5vdCByZXR1cm4gc28gdGhhdCBzZXRBdHRyaWJ1dGUgaXMgYWxzbyB1c2VkXG4gICAgICAgIGVsZW0uZGVmYXVsdFZhbHVlID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVc2Ugbm9kZUhvb2sgaWYgZGVmaW5lZCAoIzE5NTQpOyBvdGhlcndpc2Ugc2V0QXR0cmlidXRlIGlzIGZpbmVcbiAgICAgICAgcmV0dXJuIG5vZGVIb29rICYmIG5vZGVIb29rLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbi8vIElFNi83IGRvIG5vdCBzdXBwb3J0IGdldHRpbmcvc2V0dGluZyBzb21lIGF0dHJpYnV0ZXMgd2l0aCBnZXQvc2V0QXR0cmlidXRlXG5pZiAoICFnZXRTZXRBdHRyaWJ1dGUgKSB7XG5cbiAgLy8gVXNlIHRoaXMgZm9yIGFueSBhdHRyaWJ1dGUgaW4gSUU2LzdcbiAgLy8gVGhpcyBmaXhlcyBhbG1vc3QgZXZlcnkgSUU2LzcgaXNzdWVcbiAgbm9kZUhvb2sgPSB7XG4gICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG4gICAgICAvLyBTZXQgdGhlIGV4aXN0aW5nIG9yIGNyZWF0ZSBhIG5ldyBhdHRyaWJ1dGUgbm9kZVxuICAgICAgdmFyIHJldCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggbmFtZSApO1xuICAgICAgaWYgKCAhcmV0ICkge1xuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZU5vZGUoXG4gICAgICAgICAgKHJldCA9IGVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVBdHRyaWJ1dGUoIG5hbWUgKSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0LnZhbHVlID0gdmFsdWUgKz0gXCJcIjtcblxuICAgICAgLy8gQnJlYWsgYXNzb2NpYXRpb24gd2l0aCBjbG9uZWQgZWxlbWVudHMgYnkgYWxzbyB1c2luZyBzZXRBdHRyaWJ1dGUgKCM5NjQ2KVxuICAgICAgaWYgKCBuYW1lID09PSBcInZhbHVlXCIgfHwgdmFsdWUgPT09IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICkgKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gU29tZSBhdHRyaWJ1dGVzIGFyZSBjb25zdHJ1Y3RlZCB3aXRoIGVtcHR5LXN0cmluZyB2YWx1ZXMgd2hlbiBub3QgZGVmaW5lZFxuICBhdHRySGFuZGxlLmlkID0gYXR0ckhhbmRsZS5uYW1lID0gYXR0ckhhbmRsZS5jb29yZHMgPVxuICAgIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcbiAgICAgIHZhciByZXQ7XG4gICAgICBpZiAoICFpc1hNTCApIHtcbiAgICAgICAgcmV0dXJuIChyZXQgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSkgJiYgcmV0LnZhbHVlICE9PSBcIlwiID9cbiAgICAgICAgICByZXQudmFsdWUgOlxuICAgICAgICAgIG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAvLyBGaXhpbmcgdmFsdWUgcmV0cmlldmFsIG9uIGEgYnV0dG9uIHJlcXVpcmVzIHRoaXMgbW9kdWxlXG4gIGpRdWVyeS52YWxIb29rcy5idXR0b24gPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcbiAgICAgIHZhciByZXQgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKTtcbiAgICAgIGlmICggcmV0ICYmIHJldC5zcGVjaWZpZWQgKSB7XG4gICAgICAgIHJldHVybiByZXQudmFsdWU7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXQ6IG5vZGVIb29rLnNldFxuICB9O1xuXG4gIC8vIFNldCBjb250ZW50ZWRpdGFibGUgdG8gZmFsc2Ugb24gcmVtb3ZhbHMoIzEwNDI5KVxuICAvLyBTZXR0aW5nIHRvIGVtcHR5IHN0cmluZyB0aHJvd3MgYW4gZXJyb3IgYXMgYW4gaW52YWxpZCB2YWx1ZVxuICBqUXVlcnkuYXR0ckhvb2tzLmNvbnRlbnRlZGl0YWJsZSA9IHtcbiAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcbiAgICAgIG5vZGVIb29rLnNldCggZWxlbSwgdmFsdWUgPT09IFwiXCIgPyBmYWxzZSA6IHZhbHVlLCBuYW1lICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFNldCB3aWR0aCBhbmQgaGVpZ2h0IHRvIGF1dG8gaW5zdGVhZCBvZiAwIG9uIGVtcHR5IHN0cmluZyggQnVnICM4MTUwIClcbiAgLy8gVGhpcyBpcyBmb3IgcmVtb3ZhbHNcbiAgalF1ZXJ5LmVhY2goWyBcIndpZHRoXCIsIFwiaGVpZ2h0XCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG4gICAgalF1ZXJ5LmF0dHJIb29rc1sgbmFtZSBdID0ge1xuICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICAgIGlmICggdmFsdWUgPT09IFwiXCIgKSB7XG4gICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIFwiYXV0b1wiICk7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmlmICggIXN1cHBvcnQuc3R5bGUgKSB7XG4gIGpRdWVyeS5hdHRySG9va3Muc3R5bGUgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIC8vIFJldHVybiB1bmRlZmluZWQgaW4gdGhlIGNhc2Ugb2YgZW1wdHkgc3RyaW5nXG4gICAgICAvLyBOb3RlOiBJRSB1cHBlcmNhc2VzIGNzcyBwcm9wZXJ0eSBuYW1lcywgYnV0IGlmIHdlIHdlcmUgdG8gLnRvTG93ZXJDYXNlKClcbiAgICAgIC8vIC5jc3NUZXh0LCB0aGF0IHdvdWxkIGRlc3Ryb3kgY2FzZSBzZW5zdGl0aXZpdHkgaW4gVVJMJ3MsIGxpa2UgaW4gXCJiYWNrZ3JvdW5kXCJcbiAgICAgIHJldHVybiBlbGVtLnN0eWxlLmNzc1RleHQgfHwgdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICByZXR1cm4gKCBlbGVtLnN0eWxlLmNzc1RleHQgPSB2YWx1ZSArIFwiXCIgKTtcbiAgICB9XG4gIH07XG59XG5cblxuXG5cbnZhciByZm9jdXNhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9ufG9iamVjdCkkL2ksXG4gIHJjbGlja2FibGUgPSAvXig/OmF8YXJlYSkkL2k7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBwcm9wOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG4gICAgcmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LnByb3AsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuICB9LFxuXG4gIHJlbW92ZVByb3A6IGZ1bmN0aW9uKCBuYW1lICkge1xuICAgIG5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIC8vIHRyeS9jYXRjaCBoYW5kbGVzIGNhc2VzIHdoZXJlIElFIGJhbGtzIChzdWNoIGFzIHJlbW92aW5nIGEgcHJvcGVydHkgb24gd2luZG93KVxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpc1sgbmFtZSBdID0gdW5kZWZpbmVkO1xuICAgICAgICBkZWxldGUgdGhpc1sgbmFtZSBdO1xuICAgICAgfSBjYXRjaCggZSApIHt9XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgcHJvcEZpeDoge1xuICAgIFwiZm9yXCI6IFwiaHRtbEZvclwiLFxuICAgIFwiY2xhc3NcIjogXCJjbGFzc05hbWVcIlxuICB9LFxuXG4gIHByb3A6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcbiAgICB2YXIgcmV0LCBob29rcywgbm90eG1sLFxuICAgICAgblR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG4gICAgLy8gZG9uJ3QgZ2V0L3NldCBwcm9wZXJ0aWVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xuICAgIGlmICggIWVsZW0gfHwgblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbm90eG1sID0gblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApO1xuXG4gICAgaWYgKCBub3R4bWwgKSB7XG4gICAgICAvLyBGaXggbmFtZSBhbmQgYXR0YWNoIGhvb2tzXG4gICAgICBuYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xuICAgICAgaG9va3MgPSBqUXVlcnkucHJvcEhvb2tzWyBuYW1lIF07XG4gICAgfVxuXG4gICAgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSkgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgIHJldCA6XG4gICAgICAgICggZWxlbVsgbmFtZSBdID0gdmFsdWUgKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkpICE9PSBudWxsID9cbiAgICAgICAgcmV0IDpcbiAgICAgICAgZWxlbVsgbmFtZSBdO1xuICAgIH1cbiAgfSxcblxuICBwcm9wSG9va3M6IHtcbiAgICB0YWJJbmRleDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgLy8gZWxlbS50YWJJbmRleCBkb2Vzbid0IGFsd2F5cyByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWUgd2hlbiBpdCBoYXNuJ3QgYmVlbiBleHBsaWNpdGx5IHNldFxuICAgICAgICAvLyBodHRwOi8vZmx1aWRwcm9qZWN0Lm9yZy9ibG9nLzIwMDgvMDEvMDkvZ2V0dGluZy1zZXR0aW5nLWFuZC1yZW1vdmluZy10YWJpbmRleC12YWx1ZXMtd2l0aC1qYXZhc2NyaXB0L1xuICAgICAgICAvLyBVc2UgcHJvcGVyIGF0dHJpYnV0ZSByZXRyaWV2YWwoIzEyMDcyKVxuICAgICAgICB2YXIgdGFiaW5kZXggPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInRhYmluZGV4XCIgKTtcblxuICAgICAgICByZXR1cm4gdGFiaW5kZXggP1xuICAgICAgICAgIHBhcnNlSW50KCB0YWJpbmRleCwgMTAgKSA6XG4gICAgICAgICAgcmZvY3VzYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgfHwgcmNsaWNrYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgJiYgZWxlbS5ocmVmID9cbiAgICAgICAgICAgIDAgOlxuICAgICAgICAgICAgLTE7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxuLy8gU29tZSBhdHRyaWJ1dGVzIHJlcXVpcmUgYSBzcGVjaWFsIGNhbGwgb24gSUVcbi8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNjQyOSUyOFZTLjg1JTI5LmFzcHhcbmlmICggIXN1cHBvcnQuaHJlZk5vcm1hbGl6ZWQgKSB7XG4gIC8vIGhyZWYvc3JjIHByb3BlcnR5IHNob3VsZCBnZXQgdGhlIGZ1bGwgbm9ybWFsaXplZCBVUkwgKCMxMDI5OS8jMTI5MTUpXG4gIGpRdWVyeS5lYWNoKFsgXCJocmVmXCIsIFwic3JjXCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG4gICAgalF1ZXJ5LnByb3BIb29rc1sgbmFtZSBdID0ge1xuICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lLCA0ICk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbi8vIFN1cHBvcnQ6IFNhZmFyaSwgSUU5K1xuLy8gbWlzLXJlcG9ydHMgdGhlIGRlZmF1bHQgc2VsZWN0ZWQgcHJvcGVydHkgb2YgYW4gb3B0aW9uXG4vLyBBY2Nlc3NpbmcgdGhlIHBhcmVudCdzIHNlbGVjdGVkSW5kZXggcHJvcGVydHkgZml4ZXMgaXRcbmlmICggIXN1cHBvcnQub3B0U2VsZWN0ZWQgKSB7XG4gIGpRdWVyeS5wcm9wSG9va3Muc2VsZWN0ZWQgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cbiAgICAgIGlmICggcGFyZW50ICkge1xuICAgICAgICBwYXJlbnQuc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBpdCBhbHNvIHdvcmtzIHdpdGggb3B0Z3JvdXBzLCBzZWUgIzU3MDFcbiAgICAgICAgaWYgKCBwYXJlbnQucGFyZW50Tm9kZSApIHtcbiAgICAgICAgICBwYXJlbnQucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG59XG5cbmpRdWVyeS5lYWNoKFtcbiAgXCJ0YWJJbmRleFwiLFxuICBcInJlYWRPbmx5XCIsXG4gIFwibWF4TGVuZ3RoXCIsXG4gIFwiY2VsbFNwYWNpbmdcIixcbiAgXCJjZWxsUGFkZGluZ1wiLFxuICBcInJvd1NwYW5cIixcbiAgXCJjb2xTcGFuXCIsXG4gIFwidXNlTWFwXCIsXG4gIFwiZnJhbWVCb3JkZXJcIixcbiAgXCJjb250ZW50RWRpdGFibGVcIlxuXSwgZnVuY3Rpb24oKSB7XG4gIGpRdWVyeS5wcm9wRml4WyB0aGlzLnRvTG93ZXJDYXNlKCkgXSA9IHRoaXM7XG59KTtcblxuLy8gSUU2LzcgY2FsbCBlbmN0eXBlIGVuY29kaW5nXG5pZiAoICFzdXBwb3J0LmVuY3R5cGUgKSB7XG4gIGpRdWVyeS5wcm9wRml4LmVuY3R5cGUgPSBcImVuY29kaW5nXCI7XG59XG5cblxuXG5cbnZhciByY2xhc3MgPSAvW1xcdFxcclxcblxcZl0vZztcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIGFkZENsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgdmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY2xhenosIGosIGZpbmFsVmFsdWUsXG4gICAgICBpID0gMCxcbiAgICAgIGxlbiA9IHRoaXMubGVuZ3RoLFxuICAgICAgcHJvY2VlZCA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZTtcblxuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBqICkge1xuICAgICAgICBqUXVlcnkoIHRoaXMgKS5hZGRDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgdGhpcy5jbGFzc05hbWUgKSApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCBwcm9jZWVkICkge1xuICAgICAgLy8gVGhlIGRpc2p1bmN0aW9uIGhlcmUgaXMgZm9yIGJldHRlciBjb21wcmVzc2liaWxpdHkgKHNlZSByZW1vdmVDbGFzcylcbiAgICAgIGNsYXNzZXMgPSAoIHZhbHVlIHx8IFwiXCIgKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cbiAgICAgIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgICBlbGVtID0gdGhpc1sgaSBdO1xuICAgICAgICBjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggZWxlbS5jbGFzc05hbWUgP1xuICAgICAgICAgICggXCIgXCIgKyBlbGVtLmNsYXNzTmFtZSArIFwiIFwiICkucmVwbGFjZSggcmNsYXNzLCBcIiBcIiApIDpcbiAgICAgICAgICBcIiBcIlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICggY3VyICkge1xuICAgICAgICAgIGogPSAwO1xuICAgICAgICAgIHdoaWxlICggKGNsYXp6ID0gY2xhc3Nlc1tqKytdKSApIHtcbiAgICAgICAgICAgIGlmICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApIDwgMCApIHtcbiAgICAgICAgICAgICAgY3VyICs9IGNsYXp6ICsgXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gb25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cbiAgICAgICAgICBmaW5hbFZhbHVlID0galF1ZXJ5LnRyaW0oIGN1ciApO1xuICAgICAgICAgIGlmICggZWxlbS5jbGFzc05hbWUgIT09IGZpbmFsVmFsdWUgKSB7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGZpbmFsVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICB2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcbiAgICAgIGkgPSAwLFxuICAgICAgbGVuID0gdGhpcy5sZW5ndGgsXG4gICAgICBwcm9jZWVkID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWU7XG5cbiAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaiApIHtcbiAgICAgICAgalF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIHRoaXMuY2xhc3NOYW1lICkgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIHByb2NlZWQgKSB7XG4gICAgICBjbGFzc2VzID0gKCB2YWx1ZSB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG4gICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgZWxlbSA9IHRoaXNbIGkgXTtcbiAgICAgICAgLy8gVGhpcyBleHByZXNzaW9uIGlzIGhlcmUgZm9yIGJldHRlciBjb21wcmVzc2liaWxpdHkgKHNlZSBhZGRDbGFzcylcbiAgICAgICAgY3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIGVsZW0uY2xhc3NOYW1lID9cbiAgICAgICAgICAoIFwiIFwiICsgZWxlbS5jbGFzc05hbWUgKyBcIiBcIiApLnJlcGxhY2UoIHJjbGFzcywgXCIgXCIgKSA6XG4gICAgICAgICAgXCJcIlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICggY3VyICkge1xuICAgICAgICAgIGogPSAwO1xuICAgICAgICAgIHdoaWxlICggKGNsYXp6ID0gY2xhc3Nlc1tqKytdKSApIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSAqYWxsKiBpbnN0YW5jZXNcbiAgICAgICAgICAgIHdoaWxlICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApID49IDAgKSB7XG4gICAgICAgICAgICAgIGN1ciA9IGN1ci5yZXBsYWNlKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIsIFwiIFwiICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gb25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cbiAgICAgICAgICBmaW5hbFZhbHVlID0gdmFsdWUgPyBqUXVlcnkudHJpbSggY3VyICkgOiBcIlwiO1xuICAgICAgICAgIGlmICggZWxlbS5jbGFzc05hbWUgIT09IGZpbmFsVmFsdWUgKSB7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGZpbmFsVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSwgc3RhdGVWYWwgKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cbiAgICBpZiAoIHR5cGVvZiBzdGF0ZVZhbCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHJldHVybiBzdGF0ZVZhbCA/IHRoaXMuYWRkQ2xhc3MoIHZhbHVlICkgOiB0aGlzLnJlbW92ZUNsYXNzKCB2YWx1ZSApO1xuICAgIH1cblxuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBpICkge1xuICAgICAgICBqUXVlcnkoIHRoaXMgKS50b2dnbGVDbGFzcyggdmFsdWUuY2FsbCh0aGlzLCBpLCB0aGlzLmNsYXNzTmFtZSwgc3RhdGVWYWwpLCBzdGF0ZVZhbCApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgLy8gdG9nZ2xlIGluZGl2aWR1YWwgY2xhc3MgbmFtZXNcbiAgICAgICAgdmFyIGNsYXNzTmFtZSxcbiAgICAgICAgICBpID0gMCxcbiAgICAgICAgICBzZWxmID0galF1ZXJ5KCB0aGlzICksXG4gICAgICAgICAgY2xhc3NOYW1lcyA9IHZhbHVlLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcblxuICAgICAgICB3aGlsZSAoIChjbGFzc05hbWUgPSBjbGFzc05hbWVzWyBpKysgXSkgKSB7XG4gICAgICAgICAgLy8gY2hlY2sgZWFjaCBjbGFzc05hbWUgZ2l2ZW4sIHNwYWNlIHNlcGFyYXRlZCBsaXN0XG4gICAgICAgICAgaWYgKCBzZWxmLmhhc0NsYXNzKCBjbGFzc05hbWUgKSApIHtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoIGNsYXNzTmFtZSApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmFkZENsYXNzKCBjbGFzc05hbWUgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgLy8gVG9nZ2xlIHdob2xlIGNsYXNzIG5hbWVcbiAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09IHN0cnVuZGVmaW5lZCB8fCB0eXBlID09PSBcImJvb2xlYW5cIiApIHtcbiAgICAgICAgaWYgKCB0aGlzLmNsYXNzTmFtZSApIHtcbiAgICAgICAgICAvLyBzdG9yZSBjbGFzc05hbWUgaWYgc2V0XG4gICAgICAgICAgalF1ZXJ5Ll9kYXRhKCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiwgdGhpcy5jbGFzc05hbWUgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBlbGVtZW50IGhhcyBhIGNsYXNzIG5hbWUgb3IgaWYgd2UncmUgcGFzc2VkIFwiZmFsc2VcIixcbiAgICAgICAgLy8gdGhlbiByZW1vdmUgdGhlIHdob2xlIGNsYXNzbmFtZSAoaWYgdGhlcmUgd2FzIG9uZSwgdGhlIGFib3ZlIHNhdmVkIGl0KS5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGJyaW5nIGJhY2sgd2hhdGV2ZXIgd2FzIHByZXZpb3VzbHkgc2F2ZWQgKGlmIGFueXRoaW5nKSxcbiAgICAgICAgLy8gZmFsbGluZyBiYWNrIHRvIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lIHx8IHZhbHVlID09PSBmYWxzZSA/IFwiXCIgOiBqUXVlcnkuX2RhdGEoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiICkgfHwgXCJcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBoYXNDbGFzczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgIHZhciBjbGFzc05hbWUgPSBcIiBcIiArIHNlbGVjdG9yICsgXCIgXCIsXG4gICAgICBpID0gMCxcbiAgICAgIGwgPSB0aGlzLmxlbmd0aDtcbiAgICBmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG4gICAgICBpZiAoIHRoaXNbaV0ubm9kZVR5cGUgPT09IDEgJiYgKFwiIFwiICsgdGhpc1tpXS5jbGFzc05hbWUgKyBcIiBcIikucmVwbGFjZShyY2xhc3MsIFwiIFwiKS5pbmRleE9mKCBjbGFzc05hbWUgKSA+PSAwICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pO1xuXG5cblxuXG4vLyBSZXR1cm4galF1ZXJ5IGZvciBhdHRyaWJ1dGVzLW9ubHkgaW5jbHVzaW9uXG5cblxualF1ZXJ5LmVhY2goIChcImJsdXIgZm9jdXMgZm9jdXNpbiBmb2N1c291dCBsb2FkIHJlc2l6ZSBzY3JvbGwgdW5sb2FkIGNsaWNrIGRibGNsaWNrIFwiICtcbiAgXCJtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBcIiArXG4gIFwiY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBlcnJvciBjb250ZXh0bWVudVwiKS5zcGxpdChcIiBcIiksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXG4gIC8vIEhhbmRsZSBldmVudCBiaW5kaW5nXG4gIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIGRhdGEsIGZuICkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMCA/XG4gICAgICB0aGlzLm9uKCBuYW1lLCBudWxsLCBkYXRhLCBmbiApIDpcbiAgICAgIHRoaXMudHJpZ2dlciggbmFtZSApO1xuICB9O1xufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBob3ZlcjogZnVuY3Rpb24oIGZuT3ZlciwgZm5PdXQgKSB7XG4gICAgcmV0dXJuIHRoaXMubW91c2VlbnRlciggZm5PdmVyICkubW91c2VsZWF2ZSggZm5PdXQgfHwgZm5PdmVyICk7XG4gIH0sXG5cbiAgYmluZDogZnVuY3Rpb24oIHR5cGVzLCBkYXRhLCBmbiApIHtcbiAgICByZXR1cm4gdGhpcy5vbiggdHlwZXMsIG51bGwsIGRhdGEsIGZuICk7XG4gIH0sXG4gIHVuYmluZDogZnVuY3Rpb24oIHR5cGVzLCBmbiApIHtcbiAgICByZXR1cm4gdGhpcy5vZmYoIHR5cGVzLCBudWxsLCBmbiApO1xuICB9LFxuXG4gIGRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBkYXRhLCBmbiApIHtcbiAgICByZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApO1xuICB9LFxuICB1bmRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBmbiApIHtcbiAgICAvLyAoIG5hbWVzcGFjZSApIG9yICggc2VsZWN0b3IsIHR5cGVzIFssIGZuXSApXG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyB0aGlzLm9mZiggc2VsZWN0b3IsIFwiKipcIiApIDogdGhpcy5vZmYoIHR5cGVzLCBzZWxlY3RvciB8fCBcIioqXCIsIGZuICk7XG4gIH1cbn0pO1xuXG5cbnZhciBub25jZSA9IGpRdWVyeS5ub3coKTtcblxudmFyIHJxdWVyeSA9ICgvXFw/Lyk7XG5cblxuXG52YXIgcnZhbGlkdG9rZW5zID0gLygsKXwoXFxbfHspfCh9fF0pfFwiKD86W15cIlxcXFxcXHJcXG5dfFxcXFxbXCJcXFxcXFwvYmZucnRdfFxcXFx1W1xcZGEtZkEtRl17NH0pKlwiXFxzKjo/fHRydWV8ZmFsc2V8bnVsbHwtPyg/ITBcXGQpXFxkKyg/OlxcLlxcZCt8KSg/OltlRV1bKy1dP1xcZCt8KS9nO1xuXG5qUXVlcnkucGFyc2VKU09OID0gZnVuY3Rpb24oIGRhdGEgKSB7XG4gIC8vIEF0dGVtcHQgdG8gcGFyc2UgdXNpbmcgdGhlIG5hdGl2ZSBKU09OIHBhcnNlciBmaXJzdFxuICBpZiAoIHdpbmRvdy5KU09OICYmIHdpbmRvdy5KU09OLnBhcnNlICkge1xuICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXG4gICAgLy8gV29ya2Fyb3VuZCBmYWlsdXJlIHRvIHN0cmluZy1jYXN0IG51bGwgaW5wdXRcbiAgICByZXR1cm4gd2luZG93LkpTT04ucGFyc2UoIGRhdGEgKyBcIlwiICk7XG4gIH1cblxuICB2YXIgcmVxdWlyZU5vbkNvbW1hLFxuICAgIGRlcHRoID0gbnVsbCxcbiAgICBzdHIgPSBqUXVlcnkudHJpbSggZGF0YSArIFwiXCIgKTtcblxuICAvLyBHdWFyZCBhZ2FpbnN0IGludmFsaWQgKGFuZCBwb3NzaWJseSBkYW5nZXJvdXMpIGlucHV0IGJ5IGVuc3VyaW5nIHRoYXQgbm90aGluZyByZW1haW5zXG4gIC8vIGFmdGVyIHJlbW92aW5nIHZhbGlkIHRva2Vuc1xuICByZXR1cm4gc3RyICYmICFqUXVlcnkudHJpbSggc3RyLnJlcGxhY2UoIHJ2YWxpZHRva2VucywgZnVuY3Rpb24oIHRva2VuLCBjb21tYSwgb3BlbiwgY2xvc2UgKSB7XG5cbiAgICAvLyBGb3JjZSB0ZXJtaW5hdGlvbiBpZiB3ZSBzZWUgYSBtaXNwbGFjZWQgY29tbWFcbiAgICBpZiAoIHJlcXVpcmVOb25Db21tYSAmJiBjb21tYSApIHtcbiAgICAgIGRlcHRoID0gMDtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIG5vIG1vcmUgcmVwbGFjZW1lbnRzIGFmdGVyIHJldHVybmluZyB0byBvdXRlcm1vc3QgZGVwdGhcbiAgICBpZiAoIGRlcHRoID09PSAwICkge1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cblxuICAgIC8vIENvbW1hcyBtdXN0IG5vdCBmb2xsb3cgXCJbXCIsIFwie1wiLCBvciBcIixcIlxuICAgIHJlcXVpcmVOb25Db21tYSA9IG9wZW4gfHwgY29tbWE7XG5cbiAgICAvLyBEZXRlcm1pbmUgbmV3IGRlcHRoXG4gICAgLy8gYXJyYXkvb2JqZWN0IG9wZW4gKFwiW1wiIG9yIFwie1wiKTogZGVwdGggKz0gdHJ1ZSAtIGZhbHNlIChpbmNyZW1lbnQpXG4gICAgLy8gYXJyYXkvb2JqZWN0IGNsb3NlIChcIl1cIiBvciBcIn1cIik6IGRlcHRoICs9IGZhbHNlIC0gdHJ1ZSAoZGVjcmVtZW50KVxuICAgIC8vIG90aGVyIGNhc2VzIChcIixcIiBvciBwcmltaXRpdmUpOiBkZXB0aCArPSB0cnVlIC0gdHJ1ZSAobnVtZXJpYyBjYXN0KVxuICAgIGRlcHRoICs9ICFjbG9zZSAtICFvcGVuO1xuXG4gICAgLy8gUmVtb3ZlIHRoaXMgdG9rZW5cbiAgICByZXR1cm4gXCJcIjtcbiAgfSkgKSA/XG4gICAgKCBGdW5jdGlvbiggXCJyZXR1cm4gXCIgKyBzdHIgKSApKCkgOlxuICAgIGpRdWVyeS5lcnJvciggXCJJbnZhbGlkIEpTT046IFwiICsgZGF0YSApO1xufTtcblxuXG4vLyBDcm9zcy1icm93c2VyIHhtbCBwYXJzaW5nXG5qUXVlcnkucGFyc2VYTUwgPSBmdW5jdGlvbiggZGF0YSApIHtcbiAgdmFyIHhtbCwgdG1wO1xuICBpZiAoICFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKCB3aW5kb3cuRE9NUGFyc2VyICkgeyAvLyBTdGFuZGFyZFxuICAgICAgdG1wID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgeG1sID0gdG1wLnBhcnNlRnJvbVN0cmluZyggZGF0YSwgXCJ0ZXh0L3htbFwiICk7XG4gICAgfSBlbHNlIHsgLy8gSUVcbiAgICAgIHhtbCA9IG5ldyBBY3RpdmVYT2JqZWN0KCBcIk1pY3Jvc29mdC5YTUxET01cIiApO1xuICAgICAgeG1sLmFzeW5jID0gXCJmYWxzZVwiO1xuICAgICAgeG1sLmxvYWRYTUwoIGRhdGEgKTtcbiAgICB9XG4gIH0gY2F0Y2goIGUgKSB7XG4gICAgeG1sID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmICggIXhtbCB8fCAheG1sLmRvY3VtZW50RWxlbWVudCB8fCB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwicGFyc2VyZXJyb3JcIiApLmxlbmd0aCApIHtcbiAgICBqUXVlcnkuZXJyb3IoIFwiSW52YWxpZCBYTUw6IFwiICsgZGF0YSApO1xuICB9XG4gIHJldHVybiB4bWw7XG59O1xuXG5cbnZhclxuICAvLyBEb2N1bWVudCBsb2NhdGlvblxuICBhamF4TG9jUGFydHMsXG4gIGFqYXhMb2NhdGlvbixcblxuICByaGFzaCA9IC8jLiokLyxcbiAgcnRzID0gLyhbPyZdKV89W14mXSovLFxuICByaGVhZGVycyA9IC9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKVxccj8kL21nLCAvLyBJRSBsZWF2ZXMgYW4gXFxyIGNoYXJhY3RlciBhdCBFT0xcbiAgLy8gIzc2NTMsICM4MTI1LCAjODE1MjogbG9jYWwgcHJvdG9jb2wgZGV0ZWN0aW9uXG4gIHJsb2NhbFByb3RvY29sID0gL14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC8sXG4gIHJub0NvbnRlbnQgPSAvXig/OkdFVHxIRUFEKSQvLFxuICBycHJvdG9jb2wgPSAvXlxcL1xcLy8sXG4gIHJ1cmwgPSAvXihbXFx3ListXSs6KSg/OlxcL1xcLyg/OlteXFwvPyNdKkB8KShbXlxcLz8jOl0qKSg/OjooXFxkKyl8KXwpLyxcblxuICAvKiBQcmVmaWx0ZXJzXG4gICAqIDEpIFRoZXkgYXJlIHVzZWZ1bCB0byBpbnRyb2R1Y2UgY3VzdG9tIGRhdGFUeXBlcyAoc2VlIGFqYXgvanNvbnAuanMgZm9yIGFuIGV4YW1wbGUpXG4gICAqIDIpIFRoZXNlIGFyZSBjYWxsZWQ6XG4gICAqICAgIC0gQkVGT1JFIGFza2luZyBmb3IgYSB0cmFuc3BvcnRcbiAgICogICAgLSBBRlRFUiBwYXJhbSBzZXJpYWxpemF0aW9uIChzLmRhdGEgaXMgYSBzdHJpbmcgaWYgcy5wcm9jZXNzRGF0YSBpcyB0cnVlKVxuICAgKiAzKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG4gICAqIDQpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcbiAgICogNSkgZXhlY3V0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gY29udGludWUgZG93biB0byBcIipcIiBpZiBuZWVkZWRcbiAgICovXG4gIHByZWZpbHRlcnMgPSB7fSxcblxuICAvKiBUcmFuc3BvcnRzIGJpbmRpbmdzXG4gICAqIDEpIGtleSBpcyB0aGUgZGF0YVR5cGVcbiAgICogMikgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuICAgKiAzKSBzZWxlY3Rpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBnbyB0byBcIipcIiBpZiBuZWVkZWRcbiAgICovXG4gIHRyYW5zcG9ydHMgPSB7fSxcblxuICAvLyBBdm9pZCBjb21tZW50LXByb2xvZyBjaGFyIHNlcXVlbmNlICgjMTAwOTgpOyBtdXN0IGFwcGVhc2UgbGludCBhbmQgZXZhZGUgY29tcHJlc3Npb25cbiAgYWxsVHlwZXMgPSBcIiovXCIuY29uY2F0KFwiKlwiKTtcblxuLy8gIzgxMzgsIElFIG1heSB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiBhY2Nlc3Npbmdcbi8vIGEgZmllbGQgZnJvbSB3aW5kb3cubG9jYXRpb24gaWYgZG9jdW1lbnQuZG9tYWluIGhhcyBiZWVuIHNldFxudHJ5IHtcbiAgYWpheExvY2F0aW9uID0gbG9jYXRpb24uaHJlZjtcbn0gY2F0Y2goIGUgKSB7XG4gIC8vIFVzZSB0aGUgaHJlZiBhdHRyaWJ1dGUgb2YgYW4gQSBlbGVtZW50XG4gIC8vIHNpbmNlIElFIHdpbGwgbW9kaWZ5IGl0IGdpdmVuIGRvY3VtZW50LmxvY2F0aW9uXG4gIGFqYXhMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XG4gIGFqYXhMb2NhdGlvbi5ocmVmID0gXCJcIjtcbiAgYWpheExvY2F0aW9uID0gYWpheExvY2F0aW9uLmhyZWY7XG59XG5cbi8vIFNlZ21lbnQgbG9jYXRpb24gaW50byBwYXJ0c1xuYWpheExvY1BhcnRzID0gcnVybC5leGVjKCBhamF4TG9jYXRpb24udG9Mb3dlckNhc2UoKSApIHx8IFtdO1xuXG4vLyBCYXNlIFwiY29uc3RydWN0b3JcIiBmb3IgalF1ZXJ5LmFqYXhQcmVmaWx0ZXIgYW5kIGpRdWVyeS5hamF4VHJhbnNwb3J0XG5mdW5jdGlvbiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHN0cnVjdHVyZSApIHtcblxuICAvLyBkYXRhVHlwZUV4cHJlc3Npb24gaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvIFwiKlwiXG4gIHJldHVybiBmdW5jdGlvbiggZGF0YVR5cGVFeHByZXNzaW9uLCBmdW5jICkge1xuXG4gICAgaWYgKCB0eXBlb2YgZGF0YVR5cGVFeHByZXNzaW9uICE9PSBcInN0cmluZ1wiICkge1xuICAgICAgZnVuYyA9IGRhdGFUeXBlRXhwcmVzc2lvbjtcbiAgICAgIGRhdGFUeXBlRXhwcmVzc2lvbiA9IFwiKlwiO1xuICAgIH1cblxuICAgIHZhciBkYXRhVHlwZSxcbiAgICAgIGkgPSAwLFxuICAgICAgZGF0YVR5cGVzID0gZGF0YVR5cGVFeHByZXNzaW9uLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG4gICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZnVuYyApICkge1xuICAgICAgLy8gRm9yIGVhY2ggZGF0YVR5cGUgaW4gdGhlIGRhdGFUeXBlRXhwcmVzc2lvblxuICAgICAgd2hpbGUgKCAoZGF0YVR5cGUgPSBkYXRhVHlwZXNbaSsrXSkgKSB7XG4gICAgICAgIC8vIFByZXBlbmQgaWYgcmVxdWVzdGVkXG4gICAgICAgIGlmICggZGF0YVR5cGUuY2hhckF0KCAwICkgPT09IFwiK1wiICkge1xuICAgICAgICAgIGRhdGFUeXBlID0gZGF0YVR5cGUuc2xpY2UoIDEgKSB8fCBcIipcIjtcbiAgICAgICAgICAoc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdKS51bnNoaWZ0KCBmdW5jICk7XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGFwcGVuZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIChzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10pLnB1c2goIGZ1bmMgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLy8gQmFzZSBpbnNwZWN0aW9uIGZ1bmN0aW9uIGZvciBwcmVmaWx0ZXJzIGFuZCB0cmFuc3BvcnRzXG5mdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICkge1xuXG4gIHZhciBpbnNwZWN0ZWQgPSB7fSxcbiAgICBzZWVraW5nVHJhbnNwb3J0ID0gKCBzdHJ1Y3R1cmUgPT09IHRyYW5zcG9ydHMgKTtcblxuICBmdW5jdGlvbiBpbnNwZWN0KCBkYXRhVHlwZSApIHtcbiAgICB2YXIgc2VsZWN0ZWQ7XG4gICAgaW5zcGVjdGVkWyBkYXRhVHlwZSBdID0gdHJ1ZTtcbiAgICBqUXVlcnkuZWFjaCggc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdLCBmdW5jdGlvbiggXywgcHJlZmlsdGVyT3JGYWN0b3J5ICkge1xuICAgICAgdmFyIGRhdGFUeXBlT3JUcmFuc3BvcnQgPSBwcmVmaWx0ZXJPckZhY3RvcnkoIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKTtcbiAgICAgIGlmICggdHlwZW9mIGRhdGFUeXBlT3JUcmFuc3BvcnQgPT09IFwic3RyaW5nXCIgJiYgIXNlZWtpbmdUcmFuc3BvcnQgJiYgIWluc3BlY3RlZFsgZGF0YVR5cGVPclRyYW5zcG9ydCBdICkge1xuICAgICAgICBvcHRpb25zLmRhdGFUeXBlcy51bnNoaWZ0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG4gICAgICAgIGluc3BlY3QoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICggc2Vla2luZ1RyYW5zcG9ydCApIHtcbiAgICAgICAgcmV0dXJuICEoIHNlbGVjdGVkID0gZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzZWxlY3RlZDtcbiAgfVxuXG4gIHJldHVybiBpbnNwZWN0KCBvcHRpb25zLmRhdGFUeXBlc1sgMCBdICkgfHwgIWluc3BlY3RlZFsgXCIqXCIgXSAmJiBpbnNwZWN0KCBcIipcIiApO1xufVxuXG4vLyBBIHNwZWNpYWwgZXh0ZW5kIGZvciBhamF4IG9wdGlvbnNcbi8vIHRoYXQgdGFrZXMgXCJmbGF0XCIgb3B0aW9ucyAobm90IHRvIGJlIGRlZXAgZXh0ZW5kZWQpXG4vLyBGaXhlcyAjOTg4N1xuZnVuY3Rpb24gYWpheEV4dGVuZCggdGFyZ2V0LCBzcmMgKSB7XG4gIHZhciBkZWVwLCBrZXksXG4gICAgZmxhdE9wdGlvbnMgPSBqUXVlcnkuYWpheFNldHRpbmdzLmZsYXRPcHRpb25zIHx8IHt9O1xuXG4gIGZvciAoIGtleSBpbiBzcmMgKSB7XG4gICAgaWYgKCBzcmNbIGtleSBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAoIGZsYXRPcHRpb25zWyBrZXkgXSA/IHRhcmdldCA6ICggZGVlcCB8fCAoZGVlcCA9IHt9KSApIClbIGtleSBdID0gc3JjWyBrZXkgXTtcbiAgICB9XG4gIH1cbiAgaWYgKCBkZWVwICkge1xuICAgIGpRdWVyeS5leHRlbmQoIHRydWUsIHRhcmdldCwgZGVlcCApO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLyogSGFuZGxlcyByZXNwb25zZXMgdG8gYW4gYWpheCByZXF1ZXN0OlxuICogLSBmaW5kcyB0aGUgcmlnaHQgZGF0YVR5cGUgKG1lZGlhdGVzIGJldHdlZW4gY29udGVudC10eXBlIGFuZCBleHBlY3RlZCBkYXRhVHlwZSlcbiAqIC0gcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuICovXG5mdW5jdGlvbiBhamF4SGFuZGxlUmVzcG9uc2VzKCBzLCBqcVhIUiwgcmVzcG9uc2VzICkge1xuICB2YXIgZmlyc3REYXRhVHlwZSwgY3QsIGZpbmFsRGF0YVR5cGUsIHR5cGUsXG4gICAgY29udGVudHMgPSBzLmNvbnRlbnRzLFxuICAgIGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzO1xuXG4gIC8vIFJlbW92ZSBhdXRvIGRhdGFUeXBlIGFuZCBnZXQgY29udGVudC10eXBlIGluIHRoZSBwcm9jZXNzXG4gIHdoaWxlICggZGF0YVR5cGVzWyAwIF0gPT09IFwiKlwiICkge1xuICAgIGRhdGFUeXBlcy5zaGlmdCgpO1xuICAgIGlmICggY3QgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIGN0ID0gcy5taW1lVHlwZSB8fCBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYSBrbm93biBjb250ZW50LXR5cGVcbiAgaWYgKCBjdCApIHtcbiAgICBmb3IgKCB0eXBlIGluIGNvbnRlbnRzICkge1xuICAgICAgaWYgKCBjb250ZW50c1sgdHlwZSBdICYmIGNvbnRlbnRzWyB0eXBlIF0udGVzdCggY3QgKSApIHtcbiAgICAgICAgZGF0YVR5cGVzLnVuc2hpZnQoIHR5cGUgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSByZXNwb25zZSBmb3IgdGhlIGV4cGVjdGVkIGRhdGFUeXBlXG4gIGlmICggZGF0YVR5cGVzWyAwIF0gaW4gcmVzcG9uc2VzICkge1xuICAgIGZpbmFsRGF0YVR5cGUgPSBkYXRhVHlwZXNbIDAgXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUcnkgY29udmVydGlibGUgZGF0YVR5cGVzXG4gICAgZm9yICggdHlwZSBpbiByZXNwb25zZXMgKSB7XG4gICAgICBpZiAoICFkYXRhVHlwZXNbIDAgXSB8fCBzLmNvbnZlcnRlcnNbIHR5cGUgKyBcIiBcIiArIGRhdGFUeXBlc1swXSBdICkge1xuICAgICAgICBmaW5hbERhdGFUeXBlID0gdHlwZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoICFmaXJzdERhdGFUeXBlICkge1xuICAgICAgICBmaXJzdERhdGFUeXBlID0gdHlwZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gT3IganVzdCB1c2UgZmlyc3Qgb25lXG4gICAgZmluYWxEYXRhVHlwZSA9IGZpbmFsRGF0YVR5cGUgfHwgZmlyc3REYXRhVHlwZTtcbiAgfVxuXG4gIC8vIElmIHdlIGZvdW5kIGEgZGF0YVR5cGVcbiAgLy8gV2UgYWRkIHRoZSBkYXRhVHlwZSB0byB0aGUgbGlzdCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJldHVybiB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuICBpZiAoIGZpbmFsRGF0YVR5cGUgKSB7XG4gICAgaWYgKCBmaW5hbERhdGFUeXBlICE9PSBkYXRhVHlwZXNbIDAgXSApIHtcbiAgICAgIGRhdGFUeXBlcy51bnNoaWZ0KCBmaW5hbERhdGFUeXBlICk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZXNbIGZpbmFsRGF0YVR5cGUgXTtcbiAgfVxufVxuXG4vKiBDaGFpbiBjb252ZXJzaW9ucyBnaXZlbiB0aGUgcmVxdWVzdCBhbmQgdGhlIG9yaWdpbmFsIHJlc3BvbnNlXG4gKiBBbHNvIHNldHMgdGhlIHJlc3BvbnNlWFhYIGZpZWxkcyBvbiB0aGUganFYSFIgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gYWpheENvbnZlcnQoIHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzICkge1xuICB2YXIgY29udjIsIGN1cnJlbnQsIGNvbnYsIHRtcCwgcHJldixcbiAgICBjb252ZXJ0ZXJzID0ge30sXG4gICAgLy8gV29yayB3aXRoIGEgY29weSBvZiBkYXRhVHlwZXMgaW4gY2FzZSB3ZSBuZWVkIHRvIG1vZGlmeSBpdCBmb3IgY29udmVyc2lvblxuICAgIGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzLnNsaWNlKCk7XG5cbiAgLy8gQ3JlYXRlIGNvbnZlcnRlcnMgbWFwIHdpdGggbG93ZXJjYXNlZCBrZXlzXG4gIGlmICggZGF0YVR5cGVzWyAxIF0gKSB7XG4gICAgZm9yICggY29udiBpbiBzLmNvbnZlcnRlcnMgKSB7XG4gICAgICBjb252ZXJ0ZXJzWyBjb252LnRvTG93ZXJDYXNlKCkgXSA9IHMuY29udmVydGVyc1sgY29udiBdO1xuICAgIH1cbiAgfVxuXG4gIGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcblxuICAvLyBDb252ZXJ0IHRvIGVhY2ggc2VxdWVudGlhbCBkYXRhVHlwZVxuICB3aGlsZSAoIGN1cnJlbnQgKSB7XG5cbiAgICBpZiAoIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSApIHtcbiAgICAgIGpxWEhSWyBzLnJlc3BvbnNlRmllbGRzWyBjdXJyZW50IF0gXSA9IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIEFwcGx5IHRoZSBkYXRhRmlsdGVyIGlmIHByb3ZpZGVkXG4gICAgaWYgKCAhcHJldiAmJiBpc1N1Y2Nlc3MgJiYgcy5kYXRhRmlsdGVyICkge1xuICAgICAgcmVzcG9uc2UgPSBzLmRhdGFGaWx0ZXIoIHJlc3BvbnNlLCBzLmRhdGFUeXBlICk7XG4gICAgfVxuXG4gICAgcHJldiA9IGN1cnJlbnQ7XG4gICAgY3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG4gICAgaWYgKCBjdXJyZW50ICkge1xuXG4gICAgICAvLyBUaGVyZSdzIG9ubHkgd29yayB0byBkbyBpZiBjdXJyZW50IGRhdGFUeXBlIGlzIG5vbi1hdXRvXG4gICAgICBpZiAoIGN1cnJlbnQgPT09IFwiKlwiICkge1xuXG4gICAgICAgIGN1cnJlbnQgPSBwcmV2O1xuXG4gICAgICAvLyBDb252ZXJ0IHJlc3BvbnNlIGlmIHByZXYgZGF0YVR5cGUgaXMgbm9uLWF1dG8gYW5kIGRpZmZlcnMgZnJvbSBjdXJyZW50XG4gICAgICB9IGVsc2UgaWYgKCBwcmV2ICE9PSBcIipcIiAmJiBwcmV2ICE9PSBjdXJyZW50ICkge1xuXG4gICAgICAgIC8vIFNlZWsgYSBkaXJlY3QgY29udmVydGVyXG4gICAgICAgIGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyBjdXJyZW50IF0gfHwgY29udmVydGVyc1sgXCIqIFwiICsgY3VycmVudCBdO1xuXG4gICAgICAgIC8vIElmIG5vbmUgZm91bmQsIHNlZWsgYSBwYWlyXG4gICAgICAgIGlmICggIWNvbnYgKSB7XG4gICAgICAgICAgZm9yICggY29udjIgaW4gY29udmVydGVycyApIHtcblxuICAgICAgICAgICAgLy8gSWYgY29udjIgb3V0cHV0cyBjdXJyZW50XG4gICAgICAgICAgICB0bXAgPSBjb252Mi5zcGxpdCggXCIgXCIgKTtcbiAgICAgICAgICAgIGlmICggdG1wWyAxIF0gPT09IGN1cnJlbnQgKSB7XG5cbiAgICAgICAgICAgICAgLy8gSWYgcHJldiBjYW4gYmUgY29udmVydGVkIHRvIGFjY2VwdGVkIGlucHV0XG4gICAgICAgICAgICAgIGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyB0bXBbIDAgXSBdIHx8XG4gICAgICAgICAgICAgICAgY29udmVydGVyc1sgXCIqIFwiICsgdG1wWyAwIF0gXTtcbiAgICAgICAgICAgICAgaWYgKCBjb252ICkge1xuICAgICAgICAgICAgICAgIC8vIENvbmRlbnNlIGVxdWl2YWxlbmNlIGNvbnZlcnRlcnNcbiAgICAgICAgICAgICAgICBpZiAoIGNvbnYgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgICBjb252ID0gY29udmVydGVyc1sgY29udjIgXTtcblxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaW5zZXJ0IHRoZSBpbnRlcm1lZGlhdGUgZGF0YVR5cGVcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBjb252ZXJ0ZXJzWyBjb252MiBdICE9PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHRtcFsgMCBdO1xuICAgICAgICAgICAgICAgICAgZGF0YVR5cGVzLnVuc2hpZnQoIHRtcFsgMSBdICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXBwbHkgY29udmVydGVyIChpZiBub3QgYW4gZXF1aXZhbGVuY2UpXG4gICAgICAgIGlmICggY29udiAhPT0gdHJ1ZSApIHtcblxuICAgICAgICAgIC8vIFVubGVzcyBlcnJvcnMgYXJlIGFsbG93ZWQgdG8gYnViYmxlLCBjYXRjaCBhbmQgcmV0dXJuIHRoZW1cbiAgICAgICAgICBpZiAoIGNvbnYgJiYgc1sgXCJ0aHJvd3NcIiBdICkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICByZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG4gICAgICAgICAgICB9IGNhdGNoICggZSApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgc3RhdGU6IFwicGFyc2VyZXJyb3JcIiwgZXJyb3I6IGNvbnYgPyBlIDogXCJObyBjb252ZXJzaW9uIGZyb20gXCIgKyBwcmV2ICsgXCIgdG8gXCIgKyBjdXJyZW50IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgc3RhdGU6IFwic3VjY2Vzc1wiLCBkYXRhOiByZXNwb25zZSB9O1xufVxuXG5qUXVlcnkuZXh0ZW5kKHtcblxuICAvLyBDb3VudGVyIGZvciBob2xkaW5nIHRoZSBudW1iZXIgb2YgYWN0aXZlIHF1ZXJpZXNcbiAgYWN0aXZlOiAwLFxuXG4gIC8vIExhc3QtTW9kaWZpZWQgaGVhZGVyIGNhY2hlIGZvciBuZXh0IHJlcXVlc3RcbiAgbGFzdE1vZGlmaWVkOiB7fSxcbiAgZXRhZzoge30sXG5cbiAgYWpheFNldHRpbmdzOiB7XG4gICAgdXJsOiBhamF4TG9jYXRpb24sXG4gICAgdHlwZTogXCJHRVRcIixcbiAgICBpc0xvY2FsOiBybG9jYWxQcm90b2NvbC50ZXN0KCBhamF4TG9jUGFydHNbIDEgXSApLFxuICAgIGdsb2JhbDogdHJ1ZSxcbiAgICBwcm9jZXNzRGF0YTogdHJ1ZSxcbiAgICBhc3luYzogdHJ1ZSxcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcbiAgICAvKlxuICAgIHRpbWVvdXQ6IDAsXG4gICAgZGF0YTogbnVsbCxcbiAgICBkYXRhVHlwZTogbnVsbCxcbiAgICB1c2VybmFtZTogbnVsbCxcbiAgICBwYXNzd29yZDogbnVsbCxcbiAgICBjYWNoZTogbnVsbCxcbiAgICB0aHJvd3M6IGZhbHNlLFxuICAgIHRyYWRpdGlvbmFsOiBmYWxzZSxcbiAgICBoZWFkZXJzOiB7fSxcbiAgICAqL1xuXG4gICAgYWNjZXB0czoge1xuICAgICAgXCIqXCI6IGFsbFR5cGVzLFxuICAgICAgdGV4dDogXCJ0ZXh0L3BsYWluXCIsXG4gICAgICBodG1sOiBcInRleHQvaHRtbFwiLFxuICAgICAgeG1sOiBcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixcbiAgICAgIGpzb246IFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0XCJcbiAgICB9LFxuXG4gICAgY29udGVudHM6IHtcbiAgICAgIHhtbDogL3htbC8sXG4gICAgICBodG1sOiAvaHRtbC8sXG4gICAgICBqc29uOiAvanNvbi9cbiAgICB9LFxuXG4gICAgcmVzcG9uc2VGaWVsZHM6IHtcbiAgICAgIHhtbDogXCJyZXNwb25zZVhNTFwiLFxuICAgICAgdGV4dDogXCJyZXNwb25zZVRleHRcIixcbiAgICAgIGpzb246IFwicmVzcG9uc2VKU09OXCJcbiAgICB9LFxuXG4gICAgLy8gRGF0YSBjb252ZXJ0ZXJzXG4gICAgLy8gS2V5cyBzZXBhcmF0ZSBzb3VyY2UgKG9yIGNhdGNoYWxsIFwiKlwiKSBhbmQgZGVzdGluYXRpb24gdHlwZXMgd2l0aCBhIHNpbmdsZSBzcGFjZVxuICAgIGNvbnZlcnRlcnM6IHtcblxuICAgICAgLy8gQ29udmVydCBhbnl0aGluZyB0byB0ZXh0XG4gICAgICBcIiogdGV4dFwiOiBTdHJpbmcsXG5cbiAgICAgIC8vIFRleHQgdG8gaHRtbCAodHJ1ZSA9IG5vIHRyYW5zZm9ybWF0aW9uKVxuICAgICAgXCJ0ZXh0IGh0bWxcIjogdHJ1ZSxcblxuICAgICAgLy8gRXZhbHVhdGUgdGV4dCBhcyBhIGpzb24gZXhwcmVzc2lvblxuICAgICAgXCJ0ZXh0IGpzb25cIjogalF1ZXJ5LnBhcnNlSlNPTixcblxuICAgICAgLy8gUGFyc2UgdGV4dCBhcyB4bWxcbiAgICAgIFwidGV4dCB4bWxcIjogalF1ZXJ5LnBhcnNlWE1MXG4gICAgfSxcblxuICAgIC8vIEZvciBvcHRpb25zIHRoYXQgc2hvdWxkbid0IGJlIGRlZXAgZXh0ZW5kZWQ6XG4gICAgLy8geW91IGNhbiBhZGQgeW91ciBvd24gY3VzdG9tIG9wdGlvbnMgaGVyZSBpZlxuICAgIC8vIGFuZCB3aGVuIHlvdSBjcmVhdGUgb25lIHRoYXQgc2hvdWxkbid0IGJlXG4gICAgLy8gZGVlcCBleHRlbmRlZCAoc2VlIGFqYXhFeHRlbmQpXG4gICAgZmxhdE9wdGlvbnM6IHtcbiAgICAgIHVybDogdHJ1ZSxcbiAgICAgIGNvbnRleHQ6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgLy8gQ3JlYXRlcyBhIGZ1bGwgZmxlZGdlZCBzZXR0aW5ncyBvYmplY3QgaW50byB0YXJnZXRcbiAgLy8gd2l0aCBib3RoIGFqYXhTZXR0aW5ncyBhbmQgc2V0dGluZ3MgZmllbGRzLlxuICAvLyBJZiB0YXJnZXQgaXMgb21pdHRlZCwgd3JpdGVzIGludG8gYWpheFNldHRpbmdzLlxuICBhamF4U2V0dXA6IGZ1bmN0aW9uKCB0YXJnZXQsIHNldHRpbmdzICkge1xuICAgIHJldHVybiBzZXR0aW5ncyA/XG5cbiAgICAgIC8vIEJ1aWxkaW5nIGEgc2V0dGluZ3Mgb2JqZWN0XG4gICAgICBhamF4RXh0ZW5kKCBhamF4RXh0ZW5kKCB0YXJnZXQsIGpRdWVyeS5hamF4U2V0dGluZ3MgKSwgc2V0dGluZ3MgKSA6XG5cbiAgICAgIC8vIEV4dGVuZGluZyBhamF4U2V0dGluZ3NcbiAgICAgIGFqYXhFeHRlbmQoIGpRdWVyeS5hamF4U2V0dGluZ3MsIHRhcmdldCApO1xuICB9LFxuXG4gIGFqYXhQcmVmaWx0ZXI6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycyApLFxuICBhamF4VHJhbnNwb3J0OiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHRyYW5zcG9ydHMgKSxcblxuICAvLyBNYWluIG1ldGhvZFxuICBhamF4OiBmdW5jdGlvbiggdXJsLCBvcHRpb25zICkge1xuXG4gICAgLy8gSWYgdXJsIGlzIGFuIG9iamVjdCwgc2ltdWxhdGUgcHJlLTEuNSBzaWduYXR1cmVcbiAgICBpZiAoIHR5cGVvZiB1cmwgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgICBvcHRpb25zID0gdXJsO1xuICAgICAgdXJsID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIG9wdGlvbnMgdG8gYmUgYW4gb2JqZWN0XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgLy8gQ3Jvc3MtZG9tYWluIGRldGVjdGlvbiB2YXJzXG4gICAgICBwYXJ0cyxcbiAgICAgIC8vIExvb3AgdmFyaWFibGVcbiAgICAgIGksXG4gICAgICAvLyBVUkwgd2l0aG91dCBhbnRpLWNhY2hlIHBhcmFtXG4gICAgICBjYWNoZVVSTCxcbiAgICAgIC8vIFJlc3BvbnNlIGhlYWRlcnMgYXMgc3RyaW5nXG4gICAgICByZXNwb25zZUhlYWRlcnNTdHJpbmcsXG4gICAgICAvLyB0aW1lb3V0IGhhbmRsZVxuICAgICAgdGltZW91dFRpbWVyLFxuXG4gICAgICAvLyBUbyBrbm93IGlmIGdsb2JhbCBldmVudHMgYXJlIHRvIGJlIGRpc3BhdGNoZWRcbiAgICAgIGZpcmVHbG9iYWxzLFxuXG4gICAgICB0cmFuc3BvcnQsXG4gICAgICAvLyBSZXNwb25zZSBoZWFkZXJzXG4gICAgICByZXNwb25zZUhlYWRlcnMsXG4gICAgICAvLyBDcmVhdGUgdGhlIGZpbmFsIG9wdGlvbnMgb2JqZWN0XG4gICAgICBzID0galF1ZXJ5LmFqYXhTZXR1cCgge30sIG9wdGlvbnMgKSxcbiAgICAgIC8vIENhbGxiYWNrcyBjb250ZXh0XG4gICAgICBjYWxsYmFja0NvbnRleHQgPSBzLmNvbnRleHQgfHwgcyxcbiAgICAgIC8vIENvbnRleHQgZm9yIGdsb2JhbCBldmVudHMgaXMgY2FsbGJhY2tDb250ZXh0IGlmIGl0IGlzIGEgRE9NIG5vZGUgb3IgalF1ZXJ5IGNvbGxlY3Rpb25cbiAgICAgIGdsb2JhbEV2ZW50Q29udGV4dCA9IHMuY29udGV4dCAmJiAoIGNhbGxiYWNrQ29udGV4dC5ub2RlVHlwZSB8fCBjYWxsYmFja0NvbnRleHQuanF1ZXJ5ICkgP1xuICAgICAgICBqUXVlcnkoIGNhbGxiYWNrQ29udGV4dCApIDpcbiAgICAgICAgalF1ZXJ5LmV2ZW50LFxuICAgICAgLy8gRGVmZXJyZWRzXG4gICAgICBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgY29tcGxldGVEZWZlcnJlZCA9IGpRdWVyeS5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSxcbiAgICAgIC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG4gICAgICBzdGF0dXNDb2RlID0gcy5zdGF0dXNDb2RlIHx8IHt9LFxuICAgICAgLy8gSGVhZGVycyAodGhleSBhcmUgc2VudCBhbGwgYXQgb25jZSlcbiAgICAgIHJlcXVlc3RIZWFkZXJzID0ge30sXG4gICAgICByZXF1ZXN0SGVhZGVyc05hbWVzID0ge30sXG4gICAgICAvLyBUaGUganFYSFIgc3RhdGVcbiAgICAgIHN0YXRlID0gMCxcbiAgICAgIC8vIERlZmF1bHQgYWJvcnQgbWVzc2FnZVxuICAgICAgc3RyQWJvcnQgPSBcImNhbmNlbGVkXCIsXG4gICAgICAvLyBGYWtlIHhoclxuICAgICAganFYSFIgPSB7XG4gICAgICAgIHJlYWR5U3RhdGU6IDAsXG5cbiAgICAgICAgLy8gQnVpbGRzIGhlYWRlcnMgaGFzaHRhYmxlIGlmIG5lZWRlZFxuICAgICAgICBnZXRSZXNwb25zZUhlYWRlcjogZnVuY3Rpb24oIGtleSApIHtcbiAgICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgICAgaWYgKCBzdGF0ZSA9PT0gMiApIHtcbiAgICAgICAgICAgIGlmICggIXJlc3BvbnNlSGVhZGVycyApIHtcbiAgICAgICAgICAgICAgcmVzcG9uc2VIZWFkZXJzID0ge307XG4gICAgICAgICAgICAgIHdoaWxlICggKG1hdGNoID0gcmhlYWRlcnMuZXhlYyggcmVzcG9uc2VIZWFkZXJzU3RyaW5nICkpICkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlSGVhZGVyc1sgbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSBdID0gbWF0Y2hbIDIgXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2ggPSByZXNwb25zZUhlYWRlcnNbIGtleS50b0xvd2VyQ2FzZSgpIF07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXRjaCA9PSBudWxsID8gbnVsbCA6IG1hdGNoO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJhdyBzdHJpbmdcbiAgICAgICAgZ2V0QWxsUmVzcG9uc2VIZWFkZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUgPT09IDIgPyByZXNwb25zZUhlYWRlcnNTdHJpbmcgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENhY2hlcyB0aGUgaGVhZGVyXG4gICAgICAgIHNldFJlcXVlc3RIZWFkZXI6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcbiAgICAgICAgICB2YXIgbG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgaWYgKCAhc3RhdGUgKSB7XG4gICAgICAgICAgICBuYW1lID0gcmVxdWVzdEhlYWRlcnNOYW1lc1sgbG5hbWUgXSA9IHJlcXVlc3RIZWFkZXJzTmFtZXNbIGxuYW1lIF0gfHwgbmFtZTtcbiAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzWyBuYW1lIF0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gT3ZlcnJpZGVzIHJlc3BvbnNlIGNvbnRlbnQtdHlwZSBoZWFkZXJcbiAgICAgICAgb3ZlcnJpZGVNaW1lVHlwZTogZnVuY3Rpb24oIHR5cGUgKSB7XG4gICAgICAgICAgaWYgKCAhc3RhdGUgKSB7XG4gICAgICAgICAgICBzLm1pbWVUeXBlID0gdHlwZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3NcbiAgICAgICAgc3RhdHVzQ29kZTogZnVuY3Rpb24oIG1hcCApIHtcbiAgICAgICAgICB2YXIgY29kZTtcbiAgICAgICAgICBpZiAoIG1hcCApIHtcbiAgICAgICAgICAgIGlmICggc3RhdGUgPCAyICkge1xuICAgICAgICAgICAgICBmb3IgKCBjb2RlIGluIG1hcCApIHtcbiAgICAgICAgICAgICAgICAvLyBMYXp5LWFkZCB0aGUgbmV3IGNhbGxiYWNrIGluIGEgd2F5IHRoYXQgcHJlc2VydmVzIG9sZCBvbmVzXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZVsgY29kZSBdID0gWyBzdGF0dXNDb2RlWyBjb2RlIF0sIG1hcFsgY29kZSBdIF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGFwcHJvcHJpYXRlIGNhbGxiYWNrc1xuICAgICAgICAgICAgICBqcVhIUi5hbHdheXMoIG1hcFsganFYSFIuc3RhdHVzIF0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2FuY2VsIHRoZSByZXF1ZXN0XG4gICAgICAgIGFib3J0OiBmdW5jdGlvbiggc3RhdHVzVGV4dCApIHtcbiAgICAgICAgICB2YXIgZmluYWxUZXh0ID0gc3RhdHVzVGV4dCB8fCBzdHJBYm9ydDtcbiAgICAgICAgICBpZiAoIHRyYW5zcG9ydCApIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5hYm9ydCggZmluYWxUZXh0ICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvbmUoIDAsIGZpbmFsVGV4dCApO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgLy8gQXR0YWNoIGRlZmVycmVkc1xuICAgIGRlZmVycmVkLnByb21pc2UoIGpxWEhSICkuY29tcGxldGUgPSBjb21wbGV0ZURlZmVycmVkLmFkZDtcbiAgICBqcVhIUi5zdWNjZXNzID0ganFYSFIuZG9uZTtcbiAgICBqcVhIUi5lcnJvciA9IGpxWEhSLmZhaWw7XG5cbiAgICAvLyBSZW1vdmUgaGFzaCBjaGFyYWN0ZXIgKCM3NTMxOiBhbmQgc3RyaW5nIHByb21vdGlvbilcbiAgICAvLyBBZGQgcHJvdG9jb2wgaWYgbm90IHByb3ZpZGVkICgjNTg2NjogSUU3IGlzc3VlIHdpdGggcHJvdG9jb2wtbGVzcyB1cmxzKVxuICAgIC8vIEhhbmRsZSBmYWxzeSB1cmwgaW4gdGhlIHNldHRpbmdzIG9iamVjdCAoIzEwMDkzOiBjb25zaXN0ZW5jeSB3aXRoIG9sZCBzaWduYXR1cmUpXG4gICAgLy8gV2UgYWxzbyB1c2UgdGhlIHVybCBwYXJhbWV0ZXIgaWYgYXZhaWxhYmxlXG4gICAgcy51cmwgPSAoICggdXJsIHx8IHMudXJsIHx8IGFqYXhMb2NhdGlvbiApICsgXCJcIiApLnJlcGxhY2UoIHJoYXNoLCBcIlwiICkucmVwbGFjZSggcnByb3RvY29sLCBhamF4TG9jUGFydHNbIDEgXSArIFwiLy9cIiApO1xuXG4gICAgLy8gQWxpYXMgbWV0aG9kIG9wdGlvbiB0byB0eXBlIGFzIHBlciB0aWNrZXQgIzEyMDA0XG4gICAgcy50eXBlID0gb3B0aW9ucy5tZXRob2QgfHwgb3B0aW9ucy50eXBlIHx8IHMubWV0aG9kIHx8IHMudHlwZTtcblxuICAgIC8vIEV4dHJhY3QgZGF0YVR5cGVzIGxpc3RcbiAgICBzLmRhdGFUeXBlcyA9IGpRdWVyeS50cmltKCBzLmRhdGFUeXBlIHx8IFwiKlwiICkudG9Mb3dlckNhc2UoKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgWyBcIlwiIF07XG5cbiAgICAvLyBBIGNyb3NzLWRvbWFpbiByZXF1ZXN0IGlzIGluIG9yZGVyIHdoZW4gd2UgaGF2ZSBhIHByb3RvY29sOmhvc3Q6cG9ydCBtaXNtYXRjaFxuICAgIGlmICggcy5jcm9zc0RvbWFpbiA9PSBudWxsICkge1xuICAgICAgcGFydHMgPSBydXJsLmV4ZWMoIHMudXJsLnRvTG93ZXJDYXNlKCkgKTtcbiAgICAgIHMuY3Jvc3NEb21haW4gPSAhISggcGFydHMgJiZcbiAgICAgICAgKCBwYXJ0c1sgMSBdICE9PSBhamF4TG9jUGFydHNbIDEgXSB8fCBwYXJ0c1sgMiBdICE9PSBhamF4TG9jUGFydHNbIDIgXSB8fFxuICAgICAgICAgICggcGFydHNbIDMgXSB8fCAoIHBhcnRzWyAxIF0gPT09IFwiaHR0cDpcIiA/IFwiODBcIiA6IFwiNDQzXCIgKSApICE9PVxuICAgICAgICAgICAgKCBhamF4TG9jUGFydHNbIDMgXSB8fCAoIGFqYXhMb2NQYXJ0c1sgMSBdID09PSBcImh0dHA6XCIgPyBcIjgwXCIgOiBcIjQ0M1wiICkgKSApXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgZGF0YSBpZiBub3QgYWxyZWFkeSBhIHN0cmluZ1xuICAgIGlmICggcy5kYXRhICYmIHMucHJvY2Vzc0RhdGEgJiYgdHlwZW9mIHMuZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHMuZGF0YSA9IGpRdWVyeS5wYXJhbSggcy5kYXRhLCBzLnRyYWRpdGlvbmFsICk7XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgcHJlZmlsdGVyc1xuICAgIGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBwcmVmaWx0ZXJzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG4gICAgLy8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYSBwcmVmaWx0ZXIsIHN0b3AgdGhlcmVcbiAgICBpZiAoIHN0YXRlID09PSAyICkge1xuICAgICAgcmV0dXJuIGpxWEhSO1xuICAgIH1cblxuICAgIC8vIFdlIGNhbiBmaXJlIGdsb2JhbCBldmVudHMgYXMgb2Ygbm93IGlmIGFza2VkIHRvXG4gICAgLy8gRG9uJ3QgZmlyZSBldmVudHMgaWYgalF1ZXJ5LmV2ZW50IGlzIHVuZGVmaW5lZCBpbiBhbiBBTUQtdXNhZ2Ugc2NlbmFyaW8gKCMxNTExOClcbiAgICBmaXJlR2xvYmFscyA9IGpRdWVyeS5ldmVudCAmJiBzLmdsb2JhbDtcblxuICAgIC8vIFdhdGNoIGZvciBhIG5ldyBzZXQgb2YgcmVxdWVzdHNcbiAgICBpZiAoIGZpcmVHbG9iYWxzICYmIGpRdWVyeS5hY3RpdmUrKyA9PT0gMCApIHtcbiAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyKFwiYWpheFN0YXJ0XCIpO1xuICAgIH1cblxuICAgIC8vIFVwcGVyY2FzZSB0aGUgdHlwZVxuICAgIHMudHlwZSA9IHMudHlwZS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHJlcXVlc3QgaGFzIGNvbnRlbnRcbiAgICBzLmhhc0NvbnRlbnQgPSAhcm5vQ29udGVudC50ZXN0KCBzLnR5cGUgKTtcblxuICAgIC8vIFNhdmUgdGhlIFVSTCBpbiBjYXNlIHdlJ3JlIHRveWluZyB3aXRoIHRoZSBJZi1Nb2RpZmllZC1TaW5jZVxuICAgIC8vIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciBsYXRlciBvblxuICAgIGNhY2hlVVJMID0gcy51cmw7XG5cbiAgICAvLyBNb3JlIG9wdGlvbnMgaGFuZGxpbmcgZm9yIHJlcXVlc3RzIHdpdGggbm8gY29udGVudFxuICAgIGlmICggIXMuaGFzQ29udGVudCApIHtcblxuICAgICAgLy8gSWYgZGF0YSBpcyBhdmFpbGFibGUsIGFwcGVuZCBkYXRhIHRvIHVybFxuICAgICAgaWYgKCBzLmRhdGEgKSB7XG4gICAgICAgIGNhY2hlVVJMID0gKCBzLnVybCArPSAoIHJxdWVyeS50ZXN0KCBjYWNoZVVSTCApID8gXCImXCIgOiBcIj9cIiApICsgcy5kYXRhICk7XG4gICAgICAgIC8vICM5NjgyOiByZW1vdmUgZGF0YSBzbyB0aGF0IGl0J3Mgbm90IHVzZWQgaW4gYW4gZXZlbnR1YWwgcmV0cnlcbiAgICAgICAgZGVsZXRlIHMuZGF0YTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFudGktY2FjaGUgaW4gdXJsIGlmIG5lZWRlZFxuICAgICAgaWYgKCBzLmNhY2hlID09PSBmYWxzZSApIHtcbiAgICAgICAgcy51cmwgPSBydHMudGVzdCggY2FjaGVVUkwgKSA/XG5cbiAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgJ18nIHBhcmFtZXRlciwgc2V0IGl0cyB2YWx1ZVxuICAgICAgICAgIGNhY2hlVVJMLnJlcGxhY2UoIHJ0cywgXCIkMV89XCIgKyBub25jZSsrICkgOlxuXG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBvbmUgdG8gdGhlIGVuZFxuICAgICAgICAgIGNhY2hlVVJMICsgKCBycXVlcnkudGVzdCggY2FjaGVVUkwgKSA/IFwiJlwiIDogXCI/XCIgKSArIFwiXz1cIiArIG5vbmNlKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cbiAgICBpZiAoIHMuaWZNb2RpZmllZCApIHtcbiAgICAgIGlmICggalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApIHtcbiAgICAgICAganFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Nb2RpZmllZC1TaW5jZVwiLCBqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdICk7XG4gICAgICB9XG4gICAgICBpZiAoIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICkge1xuICAgICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIklmLU5vbmUtTWF0Y2hcIiwgalF1ZXJ5LmV0YWdbIGNhY2hlVVJMIF0gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIGNvcnJlY3QgaGVhZGVyLCBpZiBkYXRhIGlzIGJlaW5nIHNlbnRcbiAgICBpZiAoIHMuZGF0YSAmJiBzLmhhc0NvbnRlbnQgJiYgcy5jb250ZW50VHlwZSAhPT0gZmFsc2UgfHwgb3B0aW9ucy5jb250ZW50VHlwZSApIHtcbiAgICAgIGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIsIHMuY29udGVudFR5cGUgKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIEFjY2VwdHMgaGVhZGVyIGZvciB0aGUgc2VydmVyLCBkZXBlbmRpbmcgb24gdGhlIGRhdGFUeXBlXG4gICAganFYSFIuc2V0UmVxdWVzdEhlYWRlcihcbiAgICAgIFwiQWNjZXB0XCIsXG4gICAgICBzLmRhdGFUeXBlc1sgMCBdICYmIHMuYWNjZXB0c1sgcy5kYXRhVHlwZXNbMF0gXSA/XG4gICAgICAgIHMuYWNjZXB0c1sgcy5kYXRhVHlwZXNbMF0gXSArICggcy5kYXRhVHlwZXNbIDAgXSAhPT0gXCIqXCIgPyBcIiwgXCIgKyBhbGxUeXBlcyArIFwiOyBxPTAuMDFcIiA6IFwiXCIgKSA6XG4gICAgICAgIHMuYWNjZXB0c1sgXCIqXCIgXVxuICAgICk7XG5cbiAgICAvLyBDaGVjayBmb3IgaGVhZGVycyBvcHRpb25cbiAgICBmb3IgKCBpIGluIHMuaGVhZGVycyApIHtcbiAgICAgIGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIGksIHMuaGVhZGVyc1sgaSBdICk7XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgY3VzdG9tIGhlYWRlcnMvbWltZXR5cGVzIGFuZCBlYXJseSBhYm9ydFxuICAgIGlmICggcy5iZWZvcmVTZW5kICYmICggcy5iZWZvcmVTZW5kLmNhbGwoIGNhbGxiYWNrQ29udGV4dCwganFYSFIsIHMgKSA9PT0gZmFsc2UgfHwgc3RhdGUgPT09IDIgKSApIHtcbiAgICAgIC8vIEFib3J0IGlmIG5vdCBkb25lIGFscmVhZHkgYW5kIHJldHVyblxuICAgICAgcmV0dXJuIGpxWEhSLmFib3J0KCk7XG4gICAgfVxuXG4gICAgLy8gYWJvcnRpbmcgaXMgbm8gbG9uZ2VyIGEgY2FuY2VsbGF0aW9uXG4gICAgc3RyQWJvcnQgPSBcImFib3J0XCI7XG5cbiAgICAvLyBJbnN0YWxsIGNhbGxiYWNrcyBvbiBkZWZlcnJlZHNcbiAgICBmb3IgKCBpIGluIHsgc3VjY2VzczogMSwgZXJyb3I6IDEsIGNvbXBsZXRlOiAxIH0gKSB7XG4gICAgICBqcVhIUlsgaSBdKCBzWyBpIF0gKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgdHJhbnNwb3J0XG4gICAgdHJhbnNwb3J0ID0gaW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHRyYW5zcG9ydHMsIHMsIG9wdGlvbnMsIGpxWEhSICk7XG5cbiAgICAvLyBJZiBubyB0cmFuc3BvcnQsIHdlIGF1dG8tYWJvcnRcbiAgICBpZiAoICF0cmFuc3BvcnQgKSB7XG4gICAgICBkb25lKCAtMSwgXCJObyBUcmFuc3BvcnRcIiApO1xuICAgIH0gZWxzZSB7XG4gICAgICBqcVhIUi5yZWFkeVN0YXRlID0gMTtcblxuICAgICAgLy8gU2VuZCBnbG9iYWwgZXZlbnRcbiAgICAgIGlmICggZmlyZUdsb2JhbHMgKSB7XG4gICAgICAgIGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBcImFqYXhTZW5kXCIsIFsganFYSFIsIHMgXSApO1xuICAgICAgfVxuICAgICAgLy8gVGltZW91dFxuICAgICAgaWYgKCBzLmFzeW5jICYmIHMudGltZW91dCA+IDAgKSB7XG4gICAgICAgIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAganFYSFIuYWJvcnQoXCJ0aW1lb3V0XCIpO1xuICAgICAgICB9LCBzLnRpbWVvdXQgKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhdGUgPSAxO1xuICAgICAgICB0cmFuc3BvcnQuc2VuZCggcmVxdWVzdEhlYWRlcnMsIGRvbmUgKTtcbiAgICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgICAvLyBQcm9wYWdhdGUgZXhjZXB0aW9uIGFzIGVycm9yIGlmIG5vdCBkb25lXG4gICAgICAgIGlmICggc3RhdGUgPCAyICkge1xuICAgICAgICAgIGRvbmUoIC0xLCBlICk7XG4gICAgICAgIC8vIFNpbXBseSByZXRocm93IG90aGVyd2lzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYWxsYmFjayBmb3Igd2hlbiBldmVyeXRoaW5nIGlzIGRvbmVcbiAgICBmdW5jdGlvbiBkb25lKCBzdGF0dXMsIG5hdGl2ZVN0YXR1c1RleHQsIHJlc3BvbnNlcywgaGVhZGVycyApIHtcbiAgICAgIHZhciBpc1N1Y2Nlc3MsIHN1Y2Nlc3MsIGVycm9yLCByZXNwb25zZSwgbW9kaWZpZWQsXG4gICAgICAgIHN0YXR1c1RleHQgPSBuYXRpdmVTdGF0dXNUZXh0O1xuXG4gICAgICAvLyBDYWxsZWQgb25jZVxuICAgICAgaWYgKCBzdGF0ZSA9PT0gMiApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBTdGF0ZSBpcyBcImRvbmVcIiBub3dcbiAgICAgIHN0YXRlID0gMjtcblxuICAgICAgLy8gQ2xlYXIgdGltZW91dCBpZiBpdCBleGlzdHNcbiAgICAgIGlmICggdGltZW91dFRpbWVyICkge1xuICAgICAgICBjbGVhclRpbWVvdXQoIHRpbWVvdXRUaW1lciApO1xuICAgICAgfVxuXG4gICAgICAvLyBEZXJlZmVyZW5jZSB0cmFuc3BvcnQgZm9yIGVhcmx5IGdhcmJhZ2UgY29sbGVjdGlvblxuICAgICAgLy8gKG5vIG1hdHRlciBob3cgbG9uZyB0aGUganFYSFIgb2JqZWN0IHdpbGwgYmUgdXNlZClcbiAgICAgIHRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcblxuICAgICAgLy8gQ2FjaGUgcmVzcG9uc2UgaGVhZGVyc1xuICAgICAgcmVzcG9uc2VIZWFkZXJzU3RyaW5nID0gaGVhZGVycyB8fCBcIlwiO1xuXG4gICAgICAvLyBTZXQgcmVhZHlTdGF0ZVxuICAgICAganFYSFIucmVhZHlTdGF0ZSA9IHN0YXR1cyA+IDAgPyA0IDogMDtcblxuICAgICAgLy8gRGV0ZXJtaW5lIGlmIHN1Y2Nlc3NmdWxcbiAgICAgIGlzU3VjY2VzcyA9IHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwIHx8IHN0YXR1cyA9PT0gMzA0O1xuXG4gICAgICAvLyBHZXQgcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKCByZXNwb25zZXMgKSB7XG4gICAgICAgIHJlc3BvbnNlID0gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApO1xuICAgICAgfVxuXG4gICAgICAvLyBDb252ZXJ0IG5vIG1hdHRlciB3aGF0ICh0aGF0IHdheSByZXNwb25zZVhYWCBmaWVsZHMgYXJlIGFsd2F5cyBzZXQpXG4gICAgICByZXNwb25zZSA9IGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApO1xuXG4gICAgICAvLyBJZiBzdWNjZXNzZnVsLCBoYW5kbGUgdHlwZSBjaGFpbmluZ1xuICAgICAgaWYgKCBpc1N1Y2Nlc3MgKSB7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cbiAgICAgICAgaWYgKCBzLmlmTW9kaWZpZWQgKSB7XG4gICAgICAgICAgbW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcIkxhc3QtTW9kaWZpZWRcIik7XG4gICAgICAgICAgaWYgKCBtb2RpZmllZCApIHtcbiAgICAgICAgICAgIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gPSBtb2RpZmllZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcImV0YWdcIik7XG4gICAgICAgICAgaWYgKCBtb2RpZmllZCApIHtcbiAgICAgICAgICAgIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdID0gbW9kaWZpZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbm8gY29udGVudFxuICAgICAgICBpZiAoIHN0YXR1cyA9PT0gMjA0IHx8IHMudHlwZSA9PT0gXCJIRUFEXCIgKSB7XG4gICAgICAgICAgc3RhdHVzVGV4dCA9IFwibm9jb250ZW50XCI7XG5cbiAgICAgICAgLy8gaWYgbm90IG1vZGlmaWVkXG4gICAgICAgIH0gZWxzZSBpZiAoIHN0YXR1cyA9PT0gMzA0ICkge1xuICAgICAgICAgIHN0YXR1c1RleHQgPSBcIm5vdG1vZGlmaWVkXCI7XG5cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBkYXRhLCBsZXQncyBjb252ZXJ0IGl0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXRlO1xuICAgICAgICAgIHN1Y2Nlc3MgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgIGVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgICAgaXNTdWNjZXNzID0gIWVycm9yO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBleHRyYWN0IGVycm9yIGZyb20gc3RhdHVzVGV4dFxuICAgICAgICAvLyB0aGVuIG5vcm1hbGl6ZSBzdGF0dXNUZXh0IGFuZCBzdGF0dXMgZm9yIG5vbi1hYm9ydHNcbiAgICAgICAgZXJyb3IgPSBzdGF0dXNUZXh0O1xuICAgICAgICBpZiAoIHN0YXR1cyB8fCAhc3RhdHVzVGV4dCApIHtcbiAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJlcnJvclwiO1xuICAgICAgICAgIGlmICggc3RhdHVzIDwgMCApIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBkYXRhIGZvciB0aGUgZmFrZSB4aHIgb2JqZWN0XG4gICAgICBqcVhIUi5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICBqcVhIUi5zdGF0dXNUZXh0ID0gKCBuYXRpdmVTdGF0dXNUZXh0IHx8IHN0YXR1c1RleHQgKSArIFwiXCI7XG5cbiAgICAgIC8vIFN1Y2Nlc3MvRXJyb3JcbiAgICAgIGlmICggaXNTdWNjZXNzICkge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIHN1Y2Nlc3MsIHN0YXR1c1RleHQsIGpxWEhSIF0gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdFdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBqcVhIUiwgc3RhdHVzVGV4dCwgZXJyb3IgXSApO1xuICAgICAgfVxuXG4gICAgICAvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuICAgICAganFYSFIuc3RhdHVzQ29kZSggc3RhdHVzQ29kZSApO1xuICAgICAgc3RhdHVzQ29kZSA9IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKCBmaXJlR2xvYmFscyApIHtcbiAgICAgICAgZ2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIGlzU3VjY2VzcyA/IFwiYWpheFN1Y2Nlc3NcIiA6IFwiYWpheEVycm9yXCIsXG4gICAgICAgICAgWyBqcVhIUiwgcywgaXNTdWNjZXNzID8gc3VjY2VzcyA6IGVycm9yIF0gKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ29tcGxldGVcbiAgICAgIGNvbXBsZXRlRGVmZXJyZWQuZmlyZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBqcVhIUiwgc3RhdHVzVGV4dCBdICk7XG5cbiAgICAgIGlmICggZmlyZUdsb2JhbHMgKSB7XG4gICAgICAgIGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBcImFqYXhDb21wbGV0ZVwiLCBbIGpxWEhSLCBzIF0gKTtcbiAgICAgICAgLy8gSGFuZGxlIHRoZSBnbG9iYWwgQUpBWCBjb3VudGVyXG4gICAgICAgIGlmICggISggLS1qUXVlcnkuYWN0aXZlICkgKSB7XG4gICAgICAgICAgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoXCJhamF4U3RvcFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBqcVhIUjtcbiAgfSxcblxuICBnZXRKU09OOiBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjayApIHtcbiAgICByZXR1cm4galF1ZXJ5LmdldCggdXJsLCBkYXRhLCBjYWxsYmFjaywgXCJqc29uXCIgKTtcbiAgfSxcblxuICBnZXRTY3JpcHQ6IGZ1bmN0aW9uKCB1cmwsIGNhbGxiYWNrICkge1xuICAgIHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIHVuZGVmaW5lZCwgY2FsbGJhY2ssIFwic2NyaXB0XCIgKTtcbiAgfVxufSk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiZ2V0XCIsIFwicG9zdFwiIF0sIGZ1bmN0aW9uKCBpLCBtZXRob2QgKSB7XG4gIGpRdWVyeVsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjaywgdHlwZSApIHtcbiAgICAvLyBzaGlmdCBhcmd1bWVudHMgaWYgZGF0YSBhcmd1bWVudCB3YXMgb21pdHRlZFxuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGRhdGEgKSApIHtcbiAgICAgIHR5cGUgPSB0eXBlIHx8IGNhbGxiYWNrO1xuICAgICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4galF1ZXJ5LmFqYXgoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICB0eXBlOiBtZXRob2QsXG4gICAgICBkYXRhVHlwZTogdHlwZSxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBzdWNjZXNzOiBjYWxsYmFja1xuICAgIH0pO1xuICB9O1xufSk7XG5cblxualF1ZXJ5Ll9ldmFsVXJsID0gZnVuY3Rpb24oIHVybCApIHtcbiAgcmV0dXJuIGpRdWVyeS5hamF4KHtcbiAgICB1cmw6IHVybCxcbiAgICB0eXBlOiBcIkdFVFwiLFxuICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgIGFzeW5jOiBmYWxzZSxcbiAgICBnbG9iYWw6IGZhbHNlLFxuICAgIFwidGhyb3dzXCI6IHRydWVcbiAgfSk7XG59O1xuXG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICB3cmFwQWxsOiBmdW5jdGlvbiggaHRtbCApIHtcbiAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICkgKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLndyYXBBbGwoIGh0bWwuY2FsbCh0aGlzLCBpKSApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCB0aGlzWzBdICkge1xuICAgICAgLy8gVGhlIGVsZW1lbnRzIHRvIHdyYXAgdGhlIHRhcmdldCBhcm91bmRcbiAgICAgIHZhciB3cmFwID0galF1ZXJ5KCBodG1sLCB0aGlzWzBdLm93bmVyRG9jdW1lbnQgKS5lcSgwKS5jbG9uZSh0cnVlKTtcblxuICAgICAgaWYgKCB0aGlzWzBdLnBhcmVudE5vZGUgKSB7XG4gICAgICAgIHdyYXAuaW5zZXJ0QmVmb3JlKCB0aGlzWzBdICk7XG4gICAgICB9XG5cbiAgICAgIHdyYXAubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG5cbiAgICAgICAgd2hpbGUgKCBlbGVtLmZpcnN0Q2hpbGQgJiYgZWxlbS5maXJzdENoaWxkLm5vZGVUeXBlID09PSAxICkge1xuICAgICAgICAgIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbTtcbiAgICAgIH0pLmFwcGVuZCggdGhpcyApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHdyYXBJbm5lcjogZnVuY3Rpb24oIGh0bWwgKSB7XG4gICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApICkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIGpRdWVyeSh0aGlzKS53cmFwSW5uZXIoIGh0bWwuY2FsbCh0aGlzLCBpKSApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0galF1ZXJ5KCB0aGlzICksXG4gICAgICAgIGNvbnRlbnRzID0gc2VsZi5jb250ZW50cygpO1xuXG4gICAgICBpZiAoIGNvbnRlbnRzLmxlbmd0aCApIHtcbiAgICAgICAgY29udGVudHMud3JhcEFsbCggaHRtbCApO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmFwcGVuZCggaHRtbCApO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIHdyYXA6IGZ1bmN0aW9uKCBodG1sICkge1xuICAgIHZhciBpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKTtcblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgalF1ZXJ5KCB0aGlzICkud3JhcEFsbCggaXNGdW5jdGlvbiA/IGh0bWwuY2FsbCh0aGlzLCBpKSA6IGh0bWwgKTtcbiAgICB9KTtcbiAgfSxcblxuICB1bndyYXA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoICFqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiYm9keVwiICkgKSB7XG4gICAgICAgIGpRdWVyeSggdGhpcyApLnJlcGxhY2VXaXRoKCB0aGlzLmNoaWxkTm9kZXMgKTtcbiAgICAgIH1cbiAgICB9KS5lbmQoKTtcbiAgfVxufSk7XG5cblxualF1ZXJ5LmV4cHIuZmlsdGVycy5oaWRkZW4gPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgLy8gU3VwcG9ydDogT3BlcmEgPD0gMTIuMTJcbiAgLy8gT3BlcmEgcmVwb3J0cyBvZmZzZXRXaWR0aHMgYW5kIG9mZnNldEhlaWdodHMgbGVzcyB0aGFuIHplcm8gb24gc29tZSBlbGVtZW50c1xuICByZXR1cm4gZWxlbS5vZmZzZXRXaWR0aCA8PSAwICYmIGVsZW0ub2Zmc2V0SGVpZ2h0IDw9IDAgfHxcbiAgICAoIXN1cHBvcnQucmVsaWFibGVIaWRkZW5PZmZzZXRzKCkgJiZcbiAgICAgICgoZWxlbS5zdHlsZSAmJiBlbGVtLnN0eWxlLmRpc3BsYXkpIHx8IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkpID09PSBcIm5vbmVcIik7XG59O1xuXG5qUXVlcnkuZXhwci5maWx0ZXJzLnZpc2libGUgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgcmV0dXJuICFqUXVlcnkuZXhwci5maWx0ZXJzLmhpZGRlbiggZWxlbSApO1xufTtcblxuXG5cblxudmFyIHIyMCA9IC8lMjAvZyxcbiAgcmJyYWNrZXQgPSAvXFxbXFxdJC8sXG4gIHJDUkxGID0gL1xccj9cXG4vZyxcbiAgcnN1Ym1pdHRlclR5cGVzID0gL14oPzpzdWJtaXR8YnV0dG9ufGltYWdlfHJlc2V0fGZpbGUpJC9pLFxuICByc3VibWl0dGFibGUgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxrZXlnZW4pL2k7XG5cbmZ1bmN0aW9uIGJ1aWxkUGFyYW1zKCBwcmVmaXgsIG9iaiwgdHJhZGl0aW9uYWwsIGFkZCApIHtcbiAgdmFyIG5hbWU7XG5cbiAgaWYgKCBqUXVlcnkuaXNBcnJheSggb2JqICkgKSB7XG4gICAgLy8gU2VyaWFsaXplIGFycmF5IGl0ZW0uXG4gICAgalF1ZXJ5LmVhY2goIG9iaiwgZnVuY3Rpb24oIGksIHYgKSB7XG4gICAgICBpZiAoIHRyYWRpdGlvbmFsIHx8IHJicmFja2V0LnRlc3QoIHByZWZpeCApICkge1xuICAgICAgICAvLyBUcmVhdCBlYWNoIGFycmF5IGl0ZW0gYXMgYSBzY2FsYXIuXG4gICAgICAgIGFkZCggcHJlZml4LCB2ICk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0ZW0gaXMgbm9uLXNjYWxhciAoYXJyYXkgb3Igb2JqZWN0KSwgZW5jb2RlIGl0cyBudW1lcmljIGluZGV4LlxuICAgICAgICBidWlsZFBhcmFtcyggcHJlZml4ICsgXCJbXCIgKyAoIHR5cGVvZiB2ID09PSBcIm9iamVjdFwiID8gaSA6IFwiXCIgKSArIFwiXVwiLCB2LCB0cmFkaXRpb25hbCwgYWRkICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSBlbHNlIGlmICggIXRyYWRpdGlvbmFsICYmIGpRdWVyeS50eXBlKCBvYmogKSA9PT0gXCJvYmplY3RcIiApIHtcbiAgICAvLyBTZXJpYWxpemUgb2JqZWN0IGl0ZW0uXG4gICAgZm9yICggbmFtZSBpbiBvYmogKSB7XG4gICAgICBidWlsZFBhcmFtcyggcHJlZml4ICsgXCJbXCIgKyBuYW1lICsgXCJdXCIsIG9ialsgbmFtZSBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgLy8gU2VyaWFsaXplIHNjYWxhciBpdGVtLlxuICAgIGFkZCggcHJlZml4LCBvYmogKTtcbiAgfVxufVxuXG4vLyBTZXJpYWxpemUgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cyBvciBhIHNldCBvZlxuLy8ga2V5L3ZhbHVlcyBpbnRvIGEgcXVlcnkgc3RyaW5nXG5qUXVlcnkucGFyYW0gPSBmdW5jdGlvbiggYSwgdHJhZGl0aW9uYWwgKSB7XG4gIHZhciBwcmVmaXgsXG4gICAgcyA9IFtdLFxuICAgIGFkZCA9IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuICAgICAgLy8gSWYgdmFsdWUgaXMgYSBmdW5jdGlvbiwgaW52b2tlIGl0IGFuZCByZXR1cm4gaXRzIHZhbHVlXG4gICAgICB2YWx1ZSA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApID8gdmFsdWUoKSA6ICggdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSApO1xuICAgICAgc1sgcy5sZW5ndGggXSA9IGVuY29kZVVSSUNvbXBvbmVudCgga2V5ICkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCggdmFsdWUgKTtcbiAgICB9O1xuXG4gIC8vIFNldCB0cmFkaXRpb25hbCB0byB0cnVlIGZvciBqUXVlcnkgPD0gMS4zLjIgYmVoYXZpb3IuXG4gIGlmICggdHJhZGl0aW9uYWwgPT09IHVuZGVmaW5lZCApIHtcbiAgICB0cmFkaXRpb25hbCA9IGpRdWVyeS5hamF4U2V0dGluZ3MgJiYgalF1ZXJ5LmFqYXhTZXR0aW5ncy50cmFkaXRpb25hbDtcbiAgfVxuXG4gIC8vIElmIGFuIGFycmF5IHdhcyBwYXNzZWQgaW4sIGFzc3VtZSB0aGF0IGl0IGlzIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMuXG4gIGlmICggalF1ZXJ5LmlzQXJyYXkoIGEgKSB8fCAoIGEuanF1ZXJ5ICYmICFqUXVlcnkuaXNQbGFpbk9iamVjdCggYSApICkgKSB7XG4gICAgLy8gU2VyaWFsaXplIHRoZSBmb3JtIGVsZW1lbnRzXG4gICAgalF1ZXJ5LmVhY2goIGEsIGZ1bmN0aW9uKCkge1xuICAgICAgYWRkKCB0aGlzLm5hbWUsIHRoaXMudmFsdWUgKTtcbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIC8vIElmIHRyYWRpdGlvbmFsLCBlbmNvZGUgdGhlIFwib2xkXCIgd2F5ICh0aGUgd2F5IDEuMy4yIG9yIG9sZGVyXG4gICAgLy8gZGlkIGl0KSwgb3RoZXJ3aXNlIGVuY29kZSBwYXJhbXMgcmVjdXJzaXZlbHkuXG4gICAgZm9yICggcHJlZml4IGluIGEgKSB7XG4gICAgICBidWlsZFBhcmFtcyggcHJlZml4LCBhWyBwcmVmaXggXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIHNlcmlhbGl6YXRpb25cbiAgcmV0dXJuIHMuam9pbiggXCImXCIgKS5yZXBsYWNlKCByMjAsIFwiK1wiICk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgc2VyaWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4galF1ZXJ5LnBhcmFtKCB0aGlzLnNlcmlhbGl6ZUFycmF5KCkgKTtcbiAgfSxcbiAgc2VyaWFsaXplQXJyYXk6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbigpIHtcbiAgICAgIC8vIENhbiBhZGQgcHJvcEhvb2sgZm9yIFwiZWxlbWVudHNcIiB0byBmaWx0ZXIgb3IgYWRkIGZvcm0gZWxlbWVudHNcbiAgICAgIHZhciBlbGVtZW50cyA9IGpRdWVyeS5wcm9wKCB0aGlzLCBcImVsZW1lbnRzXCIgKTtcbiAgICAgIHJldHVybiBlbGVtZW50cyA/IGpRdWVyeS5tYWtlQXJyYXkoIGVsZW1lbnRzICkgOiB0aGlzO1xuICAgIH0pXG4gICAgLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0eXBlID0gdGhpcy50eXBlO1xuICAgICAgLy8gVXNlIC5pcyhcIjpkaXNhYmxlZFwiKSBzbyB0aGF0IGZpZWxkc2V0W2Rpc2FibGVkXSB3b3Jrc1xuICAgICAgcmV0dXJuIHRoaXMubmFtZSAmJiAhalF1ZXJ5KCB0aGlzICkuaXMoIFwiOmRpc2FibGVkXCIgKSAmJlxuICAgICAgICByc3VibWl0dGFibGUudGVzdCggdGhpcy5ub2RlTmFtZSApICYmICFyc3VibWl0dGVyVHlwZXMudGVzdCggdHlwZSApICYmXG4gICAgICAgICggdGhpcy5jaGVja2VkIHx8ICFyY2hlY2thYmxlVHlwZS50ZXN0KCB0eXBlICkgKTtcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24oIGksIGVsZW0gKSB7XG4gICAgICB2YXIgdmFsID0galF1ZXJ5KCB0aGlzICkudmFsKCk7XG5cbiAgICAgIHJldHVybiB2YWwgPT0gbnVsbCA/XG4gICAgICAgIG51bGwgOlxuICAgICAgICBqUXVlcnkuaXNBcnJheSggdmFsICkgP1xuICAgICAgICAgIGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbCApIHtcbiAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG4gICAgICAgICAgfSkgOlxuICAgICAgICAgIHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcbiAgICB9KS5nZXQoKTtcbiAgfVxufSk7XG5cblxuLy8gQ3JlYXRlIHRoZSByZXF1ZXN0IG9iamVjdFxuLy8gKFRoaXMgaXMgc3RpbGwgYXR0YWNoZWQgdG8gYWpheFNldHRpbmdzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5KVxualF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIgPSB3aW5kb3cuQWN0aXZlWE9iamVjdCAhPT0gdW5kZWZpbmVkID9cbiAgLy8gU3VwcG9ydDogSUU2K1xuICBmdW5jdGlvbigpIHtcblxuICAgIC8vIFhIUiBjYW5ub3QgYWNjZXNzIGxvY2FsIGZpbGVzLCBhbHdheXMgdXNlIEFjdGl2ZVggZm9yIHRoYXQgY2FzZVxuICAgIHJldHVybiAhdGhpcy5pc0xvY2FsICYmXG5cbiAgICAgIC8vIFN1cHBvcnQ6IElFNy04XG4gICAgICAvLyBvbGRJRSBYSFIgZG9lcyBub3Qgc3VwcG9ydCBub24tUkZDMjYxNiBtZXRob2RzICgjMTMyNDApXG4gICAgICAvLyBTZWUgaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL21zNTM2NjQ4KHY9dnMuODUpLmFzcHhcbiAgICAgIC8vIGFuZCBodHRwOi8vd3d3LnczLm9yZy9Qcm90b2NvbHMvcmZjMjYxNi9yZmMyNjE2LXNlYzkuaHRtbCNzZWM5XG4gICAgICAvLyBBbHRob3VnaCB0aGlzIGNoZWNrIGZvciBzaXggbWV0aG9kcyBpbnN0ZWFkIG9mIGVpZ2h0XG4gICAgICAvLyBzaW5jZSBJRSBhbHNvIGRvZXMgbm90IHN1cHBvcnQgXCJ0cmFjZVwiIGFuZCBcImNvbm5lY3RcIlxuICAgICAgL14oZ2V0fHBvc3R8aGVhZHxwdXR8ZGVsZXRlfG9wdGlvbnMpJC9pLnRlc3QoIHRoaXMudHlwZSApICYmXG5cbiAgICAgIGNyZWF0ZVN0YW5kYXJkWEhSKCkgfHwgY3JlYXRlQWN0aXZlWEhSKCk7XG4gIH0gOlxuICAvLyBGb3IgYWxsIG90aGVyIGJyb3dzZXJzLCB1c2UgdGhlIHN0YW5kYXJkIFhNTEh0dHBSZXF1ZXN0IG9iamVjdFxuICBjcmVhdGVTdGFuZGFyZFhIUjtcblxudmFyIHhocklkID0gMCxcbiAgeGhyQ2FsbGJhY2tzID0ge30sXG4gIHhoclN1cHBvcnRlZCA9IGpRdWVyeS5hamF4U2V0dGluZ3MueGhyKCk7XG5cbi8vIFN1cHBvcnQ6IElFPDEwXG4vLyBPcGVuIHJlcXVlc3RzIG11c3QgYmUgbWFudWFsbHkgYWJvcnRlZCBvbiB1bmxvYWQgKCM1MjgwKVxuLy8gU2VlIGh0dHBzOi8vc3VwcG9ydC5taWNyb3NvZnQuY29tL2tiLzI4NTY3NDYgZm9yIG1vcmUgaW5mb1xuaWYgKCB3aW5kb3cuYXR0YWNoRXZlbnQgKSB7XG4gIHdpbmRvdy5hdHRhY2hFdmVudCggXCJvbnVubG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICBmb3IgKCB2YXIga2V5IGluIHhockNhbGxiYWNrcyApIHtcbiAgICAgIHhockNhbGxiYWNrc1sga2V5IF0oIHVuZGVmaW5lZCwgdHJ1ZSApO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIERldGVybWluZSBzdXBwb3J0IHByb3BlcnRpZXNcbnN1cHBvcnQuY29ycyA9ICEheGhyU3VwcG9ydGVkICYmICggXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHJTdXBwb3J0ZWQgKTtcbnhoclN1cHBvcnRlZCA9IHN1cHBvcnQuYWpheCA9ICEheGhyU3VwcG9ydGVkO1xuXG4vLyBDcmVhdGUgdHJhbnNwb3J0IGlmIHRoZSBicm93c2VyIGNhbiBwcm92aWRlIGFuIHhoclxuaWYgKCB4aHJTdXBwb3J0ZWQgKSB7XG5cbiAgalF1ZXJ5LmFqYXhUcmFuc3BvcnQoZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG4gICAgLy8gQ3Jvc3MgZG9tYWluIG9ubHkgYWxsb3dlZCBpZiBzdXBwb3J0ZWQgdGhyb3VnaCBYTUxIdHRwUmVxdWVzdFxuICAgIGlmICggIW9wdGlvbnMuY3Jvc3NEb21haW4gfHwgc3VwcG9ydC5jb3JzICkge1xuXG4gICAgICB2YXIgY2FsbGJhY2s7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNlbmQ6IGZ1bmN0aW9uKCBoZWFkZXJzLCBjb21wbGV0ZSApIHtcbiAgICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIHhociA9IG9wdGlvbnMueGhyKCksXG4gICAgICAgICAgICBpZCA9ICsreGhySWQ7XG5cbiAgICAgICAgICAvLyBPcGVuIHRoZSBzb2NrZXRcbiAgICAgICAgICB4aHIub3Blbiggb3B0aW9ucy50eXBlLCBvcHRpb25zLnVybCwgb3B0aW9ucy5hc3luYywgb3B0aW9ucy51c2VybmFtZSwgb3B0aW9ucy5wYXNzd29yZCApO1xuXG4gICAgICAgICAgLy8gQXBwbHkgY3VzdG9tIGZpZWxkcyBpZiBwcm92aWRlZFxuICAgICAgICAgIGlmICggb3B0aW9ucy54aHJGaWVsZHMgKSB7XG4gICAgICAgICAgICBmb3IgKCBpIGluIG9wdGlvbnMueGhyRmllbGRzICkge1xuICAgICAgICAgICAgICB4aHJbIGkgXSA9IG9wdGlvbnMueGhyRmllbGRzWyBpIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gT3ZlcnJpZGUgbWltZSB0eXBlIGlmIG5lZWRlZFxuICAgICAgICAgIGlmICggb3B0aW9ucy5taW1lVHlwZSAmJiB4aHIub3ZlcnJpZGVNaW1lVHlwZSApIHtcbiAgICAgICAgICAgIHhoci5vdmVycmlkZU1pbWVUeXBlKCBvcHRpb25zLm1pbWVUeXBlICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gWC1SZXF1ZXN0ZWQtV2l0aCBoZWFkZXJcbiAgICAgICAgICAvLyBGb3IgY3Jvc3MtZG9tYWluIHJlcXVlc3RzLCBzZWVpbmcgYXMgY29uZGl0aW9ucyBmb3IgYSBwcmVmbGlnaHQgYXJlXG4gICAgICAgICAgLy8gYWtpbiB0byBhIGppZ3NhdyBwdXp6bGUsIHdlIHNpbXBseSBuZXZlciBzZXQgaXQgdG8gYmUgc3VyZS5cbiAgICAgICAgICAvLyAoaXQgY2FuIGFsd2F5cyBiZSBzZXQgb24gYSBwZXItcmVxdWVzdCBiYXNpcyBvciBldmVuIHVzaW5nIGFqYXhTZXR1cClcbiAgICAgICAgICAvLyBGb3Igc2FtZS1kb21haW4gcmVxdWVzdHMsIHdvbid0IGNoYW5nZSBoZWFkZXIgaWYgYWxyZWFkeSBwcm92aWRlZC5cbiAgICAgICAgICBpZiAoICFvcHRpb25zLmNyb3NzRG9tYWluICYmICFoZWFkZXJzW1wiWC1SZXF1ZXN0ZWQtV2l0aFwiXSApIHtcbiAgICAgICAgICAgIGhlYWRlcnNbXCJYLVJlcXVlc3RlZC1XaXRoXCJdID0gXCJYTUxIdHRwUmVxdWVzdFwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFNldCBoZWFkZXJzXG4gICAgICAgICAgZm9yICggaSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxuICAgICAgICAgICAgLy8gSUUncyBBY3RpdmVYT2JqZWN0IHRocm93cyBhICdUeXBlIE1pc21hdGNoJyBleGNlcHRpb24gd2hlbiBzZXR0aW5nXG4gICAgICAgICAgICAvLyByZXF1ZXN0IGhlYWRlciB0byBhIG51bGwtdmFsdWUuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVG8ga2VlcCBjb25zaXN0ZW50IHdpdGggb3RoZXIgWEhSIGltcGxlbWVudGF0aW9ucywgY2FzdCB0aGUgdmFsdWVcbiAgICAgICAgICAgIC8vIHRvIHN0cmluZyBhbmQgaWdub3JlIGB1bmRlZmluZWRgLlxuICAgICAgICAgICAgaWYgKCBoZWFkZXJzWyBpIF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoIGksIGhlYWRlcnNbIGkgXSArIFwiXCIgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBEbyBzZW5kIHRoZSByZXF1ZXN0XG4gICAgICAgICAgLy8gVGhpcyBtYXkgcmFpc2UgYW4gZXhjZXB0aW9uIHdoaWNoIGlzIGFjdHVhbGx5XG4gICAgICAgICAgLy8gaGFuZGxlZCBpbiBqUXVlcnkuYWpheCAoc28gbm8gdHJ5L2NhdGNoIGhlcmUpXG4gICAgICAgICAgeGhyLnNlbmQoICggb3B0aW9ucy5oYXNDb250ZW50ICYmIG9wdGlvbnMuZGF0YSApIHx8IG51bGwgKTtcblxuICAgICAgICAgIC8vIExpc3RlbmVyXG4gICAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiggXywgaXNBYm9ydCApIHtcbiAgICAgICAgICAgIHZhciBzdGF0dXMsIHN0YXR1c1RleHQsIHJlc3BvbnNlcztcblxuICAgICAgICAgICAgLy8gV2FzIG5ldmVyIGNhbGxlZCBhbmQgaXMgYWJvcnRlZCBvciBjb21wbGV0ZVxuICAgICAgICAgICAgaWYgKCBjYWxsYmFjayAmJiAoIGlzQWJvcnQgfHwgeGhyLnJlYWR5U3RhdGUgPT09IDQgKSApIHtcbiAgICAgICAgICAgICAgLy8gQ2xlYW4gdXBcbiAgICAgICAgICAgICAgZGVsZXRlIHhockNhbGxiYWNrc1sgaWQgXTtcbiAgICAgICAgICAgICAgY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBqUXVlcnkubm9vcDtcblxuICAgICAgICAgICAgICAvLyBBYm9ydCBtYW51YWxseSBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgaWYgKCBpc0Fib3J0ICkge1xuICAgICAgICAgICAgICAgIGlmICggeGhyLnJlYWR5U3RhdGUgIT09IDQgKSB7XG4gICAgICAgICAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VzID0ge307XG4gICAgICAgICAgICAgICAgc3RhdHVzID0geGhyLnN0YXR1cztcblxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDEwXG4gICAgICAgICAgICAgICAgLy8gQWNjZXNzaW5nIGJpbmFyeS1kYXRhIHJlc3BvbnNlVGV4dCB0aHJvd3MgYW4gZXhjZXB0aW9uXG4gICAgICAgICAgICAgICAgLy8gKCMxMTQyNilcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiB4aHIucmVzcG9uc2VUZXh0ID09PSBcInN0cmluZ1wiICkge1xuICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzLnRleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggdGhyb3dzIGFuIGV4Y2VwdGlvbiB3aGVuIGFjY2Vzc2luZ1xuICAgICAgICAgICAgICAgIC8vIHN0YXR1c1RleHQgZm9yIGZhdWx0eSBjcm9zcy1kb21haW4gcmVxdWVzdHNcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9IHhoci5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICAgICAgICAgICAgICAvLyBXZSBub3JtYWxpemUgd2l0aCBXZWJraXQgZ2l2aW5nIGFuIGVtcHR5IHN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEZpbHRlciBzdGF0dXMgZm9yIG5vbiBzdGFuZGFyZCBiZWhhdmlvcnNcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IGlzIGxvY2FsIGFuZCB3ZSBoYXZlIGRhdGE6IGFzc3VtZSBhIHN1Y2Nlc3NcbiAgICAgICAgICAgICAgICAvLyAoc3VjY2VzcyB3aXRoIG5vIGRhdGEgd29uJ3QgZ2V0IG5vdGlmaWVkLCB0aGF0J3MgdGhlIGJlc3Qgd2VcbiAgICAgICAgICAgICAgICAvLyBjYW4gZG8gZ2l2ZW4gY3VycmVudCBpbXBsZW1lbnRhdGlvbnMpXG4gICAgICAgICAgICAgICAgaWYgKCAhc3RhdHVzICYmIG9wdGlvbnMuaXNMb2NhbCAmJiAhb3B0aW9ucy5jcm9zc0RvbWFpbiApIHtcbiAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHJlc3BvbnNlcy50ZXh0ID8gMjAwIDogNDA0O1xuICAgICAgICAgICAgICAgIC8vIElFIC0gIzE0NTA6IHNvbWV0aW1lcyByZXR1cm5zIDEyMjMgd2hlbiBpdCBzaG91bGQgYmUgMjA0XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggc3RhdHVzID09PSAxMjIzICkge1xuICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMjA0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDYWxsIGNvbXBsZXRlIGlmIG5lZWRlZFxuICAgICAgICAgICAgaWYgKCByZXNwb25zZXMgKSB7XG4gICAgICAgICAgICAgIGNvbXBsZXRlKCBzdGF0dXMsIHN0YXR1c1RleHQsIHJlc3BvbnNlcywgeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICggIW9wdGlvbnMuYXN5bmMgKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSdyZSBpbiBzeW5jIG1vZGUgd2UgZmlyZSB0aGUgY2FsbGJhY2tcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfSBlbHNlIGlmICggeGhyLnJlYWR5U3RhdGUgPT09IDQgKSB7XG4gICAgICAgICAgICAvLyAoSUU2ICYgSUU3KSBpZiBpdCdzIGluIGNhY2hlIGFuZCBoYXMgYmVlblxuICAgICAgICAgICAgLy8gcmV0cmlldmVkIGRpcmVjdGx5IHdlIG5lZWQgdG8gZmlyZSB0aGUgY2FsbGJhY2tcbiAgICAgICAgICAgIHNldFRpbWVvdXQoIGNhbGxiYWNrICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEFkZCB0byB0aGUgbGlzdCBvZiBhY3RpdmUgeGhyIGNhbGxiYWNrc1xuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHhockNhbGxiYWNrc1sgaWQgXSA9IGNhbGxiYWNrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCBjYWxsYmFjayApIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCB1bmRlZmluZWQsIHRydWUgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn1cblxuLy8gRnVuY3Rpb25zIHRvIGNyZWF0ZSB4aHJzXG5mdW5jdGlvbiBjcmVhdGVTdGFuZGFyZFhIUigpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuICB9IGNhdGNoKCBlICkge31cbn1cblxuZnVuY3Rpb24gY3JlYXRlQWN0aXZlWEhSKCkge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoIFwiTWljcm9zb2Z0LlhNTEhUVFBcIiApO1xuICB9IGNhdGNoKCBlICkge31cbn1cblxuXG5cblxuLy8gSW5zdGFsbCBzY3JpcHQgZGF0YVR5cGVcbmpRdWVyeS5hamF4U2V0dXAoe1xuICBhY2NlcHRzOiB7XG4gICAgc2NyaXB0OiBcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdCwgYXBwbGljYXRpb24vZWNtYXNjcmlwdCwgYXBwbGljYXRpb24veC1lY21hc2NyaXB0XCJcbiAgfSxcbiAgY29udGVudHM6IHtcbiAgICBzY3JpcHQ6IC8oPzpqYXZhfGVjbWEpc2NyaXB0L1xuICB9LFxuICBjb252ZXJ0ZXJzOiB7XG4gICAgXCJ0ZXh0IHNjcmlwdFwiOiBmdW5jdGlvbiggdGV4dCApIHtcbiAgICAgIGpRdWVyeS5nbG9iYWxFdmFsKCB0ZXh0ICk7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBIYW5kbGUgY2FjaGUncyBzcGVjaWFsIGNhc2UgYW5kIGdsb2JhbFxualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoIFwic2NyaXB0XCIsIGZ1bmN0aW9uKCBzICkge1xuICBpZiAoIHMuY2FjaGUgPT09IHVuZGVmaW5lZCApIHtcbiAgICBzLmNhY2hlID0gZmFsc2U7XG4gIH1cbiAgaWYgKCBzLmNyb3NzRG9tYWluICkge1xuICAgIHMudHlwZSA9IFwiR0VUXCI7XG4gICAgcy5nbG9iYWwgPSBmYWxzZTtcbiAgfVxufSk7XG5cbi8vIEJpbmQgc2NyaXB0IHRhZyBoYWNrIHRyYW5zcG9ydFxualF1ZXJ5LmFqYXhUcmFuc3BvcnQoIFwic2NyaXB0XCIsIGZ1bmN0aW9uKHMpIHtcblxuICAvLyBUaGlzIHRyYW5zcG9ydCBvbmx5IGRlYWxzIHdpdGggY3Jvc3MgZG9tYWluIHJlcXVlc3RzXG4gIGlmICggcy5jcm9zc0RvbWFpbiApIHtcblxuICAgIHZhciBzY3JpcHQsXG4gICAgICBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBqUXVlcnkoXCJoZWFkXCIpWzBdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIHJldHVybiB7XG5cbiAgICAgIHNlbmQ6IGZ1bmN0aW9uKCBfLCBjYWxsYmFjayApIHtcblxuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXG4gICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG5cbiAgICAgICAgaWYgKCBzLnNjcmlwdENoYXJzZXQgKSB7XG4gICAgICAgICAgc2NyaXB0LmNoYXJzZXQgPSBzLnNjcmlwdENoYXJzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBzY3JpcHQuc3JjID0gcy51cmw7XG5cbiAgICAgICAgLy8gQXR0YWNoIGhhbmRsZXJzIGZvciBhbGwgYnJvd3NlcnNcbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiggXywgaXNBYm9ydCApIHtcblxuICAgICAgICAgIGlmICggaXNBYm9ydCB8fCAhc2NyaXB0LnJlYWR5U3RhdGUgfHwgL2xvYWRlZHxjb21wbGV0ZS8udGVzdCggc2NyaXB0LnJlYWR5U3RhdGUgKSApIHtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIG1lbW9yeSBsZWFrIGluIElFXG4gICAgICAgICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgc2NyaXB0XG4gICAgICAgICAgICBpZiAoIHNjcmlwdC5wYXJlbnROb2RlICkge1xuICAgICAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggc2NyaXB0ICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERlcmVmZXJlbmNlIHRoZSBzY3JpcHRcbiAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGlmIG5vdCBhYm9ydFxuICAgICAgICAgICAgaWYgKCAhaXNBYm9ydCApIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soIDIwMCwgXCJzdWNjZXNzXCIgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQ2lyY3VtdmVudCBJRTYgYnVncyB3aXRoIGJhc2UgZWxlbWVudHMgKCMyNzA5IGFuZCAjNDM3OCkgYnkgcHJlcGVuZGluZ1xuICAgICAgICAvLyBVc2UgbmF0aXZlIERPTSBtYW5pcHVsYXRpb24gdG8gYXZvaWQgb3VyIGRvbU1hbmlwIEFKQVggdHJpY2tlcnlcbiAgICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoIHNjcmlwdCwgaGVhZC5maXJzdENoaWxkICk7XG4gICAgICB9LFxuXG4gICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggc2NyaXB0ICkge1xuICAgICAgICAgIHNjcmlwdC5vbmxvYWQoIHVuZGVmaW5lZCwgdHJ1ZSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSk7XG5cblxuXG5cbnZhciBvbGRDYWxsYmFja3MgPSBbXSxcbiAgcmpzb25wID0gLyg9KVxcPyg/PSZ8JCl8XFw/XFw/LztcblxuLy8gRGVmYXVsdCBqc29ucCBzZXR0aW5nc1xualF1ZXJ5LmFqYXhTZXR1cCh7XG4gIGpzb25wOiBcImNhbGxiYWNrXCIsXG4gIGpzb25wQ2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYWxsYmFjayA9IG9sZENhbGxiYWNrcy5wb3AoKSB8fCAoIGpRdWVyeS5leHBhbmRvICsgXCJfXCIgKyAoIG5vbmNlKysgKSApO1xuICAgIHRoaXNbIGNhbGxiYWNrIF0gPSB0cnVlO1xuICAgIHJldHVybiBjYWxsYmFjaztcbiAgfVxufSk7XG5cbi8vIERldGVjdCwgbm9ybWFsaXplIG9wdGlvbnMgYW5kIGluc3RhbGwgY2FsbGJhY2tzIGZvciBqc29ucCByZXF1ZXN0c1xualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoIFwianNvbiBqc29ucFwiLCBmdW5jdGlvbiggcywgb3JpZ2luYWxTZXR0aW5ncywganFYSFIgKSB7XG5cbiAgdmFyIGNhbGxiYWNrTmFtZSwgb3ZlcndyaXR0ZW4sIHJlc3BvbnNlQ29udGFpbmVyLFxuICAgIGpzb25Qcm9wID0gcy5qc29ucCAhPT0gZmFsc2UgJiYgKCByanNvbnAudGVzdCggcy51cmwgKSA/XG4gICAgICBcInVybFwiIDpcbiAgICAgIHR5cGVvZiBzLmRhdGEgPT09IFwic3RyaW5nXCIgJiYgISggcy5jb250ZW50VHlwZSB8fCBcIlwiICkuaW5kZXhPZihcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKSAmJiByanNvbnAudGVzdCggcy5kYXRhICkgJiYgXCJkYXRhXCJcbiAgICApO1xuXG4gIC8vIEhhbmRsZSBpZmYgdGhlIGV4cGVjdGVkIGRhdGEgdHlwZSBpcyBcImpzb25wXCIgb3Igd2UgaGF2ZSBhIHBhcmFtZXRlciB0byBzZXRcbiAgaWYgKCBqc29uUHJvcCB8fCBzLmRhdGFUeXBlc1sgMCBdID09PSBcImpzb25wXCIgKSB7XG5cbiAgICAvLyBHZXQgY2FsbGJhY2sgbmFtZSwgcmVtZW1iZXJpbmcgcHJlZXhpc3RpbmcgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGl0XG4gICAgY2FsbGJhY2tOYW1lID0gcy5qc29ucENhbGxiYWNrID0galF1ZXJ5LmlzRnVuY3Rpb24oIHMuanNvbnBDYWxsYmFjayApID9cbiAgICAgIHMuanNvbnBDYWxsYmFjaygpIDpcbiAgICAgIHMuanNvbnBDYWxsYmFjaztcblxuICAgIC8vIEluc2VydCBjYWxsYmFjayBpbnRvIHVybCBvciBmb3JtIGRhdGFcbiAgICBpZiAoIGpzb25Qcm9wICkge1xuICAgICAgc1sganNvblByb3AgXSA9IHNbIGpzb25Qcm9wIF0ucmVwbGFjZSggcmpzb25wLCBcIiQxXCIgKyBjYWxsYmFja05hbWUgKTtcbiAgICB9IGVsc2UgaWYgKCBzLmpzb25wICE9PSBmYWxzZSApIHtcbiAgICAgIHMudXJsICs9ICggcnF1ZXJ5LnRlc3QoIHMudXJsICkgPyBcIiZcIiA6IFwiP1wiICkgKyBzLmpzb25wICsgXCI9XCIgKyBjYWxsYmFja05hbWU7XG4gICAgfVxuXG4gICAgLy8gVXNlIGRhdGEgY29udmVydGVyIHRvIHJldHJpZXZlIGpzb24gYWZ0ZXIgc2NyaXB0IGV4ZWN1dGlvblxuICAgIHMuY29udmVydGVyc1tcInNjcmlwdCBqc29uXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoICFyZXNwb25zZUNvbnRhaW5lciApIHtcbiAgICAgICAgalF1ZXJ5LmVycm9yKCBjYWxsYmFja05hbWUgKyBcIiB3YXMgbm90IGNhbGxlZFwiICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2VDb250YWluZXJbIDAgXTtcbiAgICB9O1xuXG4gICAgLy8gZm9yY2UganNvbiBkYXRhVHlwZVxuICAgIHMuZGF0YVR5cGVzWyAwIF0gPSBcImpzb25cIjtcblxuICAgIC8vIEluc3RhbGwgY2FsbGJhY2tcbiAgICBvdmVyd3JpdHRlbiA9IHdpbmRvd1sgY2FsbGJhY2tOYW1lIF07XG4gICAgd2luZG93WyBjYWxsYmFja05hbWUgXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVzcG9uc2VDb250YWluZXIgPSBhcmd1bWVudHM7XG4gICAgfTtcblxuICAgIC8vIENsZWFuLXVwIGZ1bmN0aW9uIChmaXJlcyBhZnRlciBjb252ZXJ0ZXJzKVxuICAgIGpxWEhSLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgIC8vIFJlc3RvcmUgcHJlZXhpc3RpbmcgdmFsdWVcbiAgICAgIHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBvdmVyd3JpdHRlbjtcblxuICAgICAgLy8gU2F2ZSBiYWNrIGFzIGZyZWVcbiAgICAgIGlmICggc1sgY2FsbGJhY2tOYW1lIF0gKSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHJlLXVzaW5nIHRoZSBvcHRpb25zIGRvZXNuJ3Qgc2NyZXcgdGhpbmdzIGFyb3VuZFxuICAgICAgICBzLmpzb25wQ2FsbGJhY2sgPSBvcmlnaW5hbFNldHRpbmdzLmpzb25wQ2FsbGJhY2s7XG5cbiAgICAgICAgLy8gc2F2ZSB0aGUgY2FsbGJhY2sgbmFtZSBmb3IgZnV0dXJlIHVzZVxuICAgICAgICBvbGRDYWxsYmFja3MucHVzaCggY2FsbGJhY2tOYW1lICk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhbGwgaWYgaXQgd2FzIGEgZnVuY3Rpb24gYW5kIHdlIGhhdmUgYSByZXNwb25zZVxuICAgICAgaWYgKCByZXNwb25zZUNvbnRhaW5lciAmJiBqUXVlcnkuaXNGdW5jdGlvbiggb3ZlcndyaXR0ZW4gKSApIHtcbiAgICAgICAgb3ZlcndyaXR0ZW4oIHJlc3BvbnNlQ29udGFpbmVyWyAwIF0gKTtcbiAgICAgIH1cblxuICAgICAgcmVzcG9uc2VDb250YWluZXIgPSBvdmVyd3JpdHRlbiA9IHVuZGVmaW5lZDtcbiAgICB9KTtcblxuICAgIC8vIERlbGVnYXRlIHRvIHNjcmlwdFxuICAgIHJldHVybiBcInNjcmlwdFwiO1xuICB9XG59KTtcblxuXG5cblxuLy8gZGF0YTogc3RyaW5nIG9mIGh0bWxcbi8vIGNvbnRleHQgKG9wdGlvbmFsKTogSWYgc3BlY2lmaWVkLCB0aGUgZnJhZ21lbnQgd2lsbCBiZSBjcmVhdGVkIGluIHRoaXMgY29udGV4dCwgZGVmYXVsdHMgdG8gZG9jdW1lbnRcbi8vIGtlZXBTY3JpcHRzIChvcHRpb25hbCk6IElmIHRydWUsIHdpbGwgaW5jbHVkZSBzY3JpcHRzIHBhc3NlZCBpbiB0aGUgaHRtbCBzdHJpbmdcbmpRdWVyeS5wYXJzZUhUTUwgPSBmdW5jdGlvbiggZGF0YSwgY29udGV4dCwga2VlcFNjcmlwdHMgKSB7XG4gIGlmICggIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJib29sZWFuXCIgKSB7XG4gICAga2VlcFNjcmlwdHMgPSBjb250ZXh0O1xuICAgIGNvbnRleHQgPSBmYWxzZTtcbiAgfVxuICBjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblxuICB2YXIgcGFyc2VkID0gcnNpbmdsZVRhZy5leGVjKCBkYXRhICksXG4gICAgc2NyaXB0cyA9ICFrZWVwU2NyaXB0cyAmJiBbXTtcblxuICAvLyBTaW5nbGUgdGFnXG4gIGlmICggcGFyc2VkICkge1xuICAgIHJldHVybiBbIGNvbnRleHQuY3JlYXRlRWxlbWVudCggcGFyc2VkWzFdICkgXTtcbiAgfVxuXG4gIHBhcnNlZCA9IGpRdWVyeS5idWlsZEZyYWdtZW50KCBbIGRhdGEgXSwgY29udGV4dCwgc2NyaXB0cyApO1xuXG4gIGlmICggc2NyaXB0cyAmJiBzY3JpcHRzLmxlbmd0aCApIHtcbiAgICBqUXVlcnkoIHNjcmlwdHMgKS5yZW1vdmUoKTtcbiAgfVxuXG4gIHJldHVybiBqUXVlcnkubWVyZ2UoIFtdLCBwYXJzZWQuY2hpbGROb2RlcyApO1xufTtcblxuXG4vLyBLZWVwIGEgY29weSBvZiB0aGUgb2xkIGxvYWQgbWV0aG9kXG52YXIgX2xvYWQgPSBqUXVlcnkuZm4ubG9hZDtcblxuLyoqXG4gKiBMb2FkIGEgdXJsIGludG8gYSBwYWdlXG4gKi9cbmpRdWVyeS5mbi5sb2FkID0gZnVuY3Rpb24oIHVybCwgcGFyYW1zLCBjYWxsYmFjayApIHtcbiAgaWYgKCB0eXBlb2YgdXJsICE9PSBcInN0cmluZ1wiICYmIF9sb2FkICkge1xuICAgIHJldHVybiBfbG9hZC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gIH1cblxuICB2YXIgc2VsZWN0b3IsIHJlc3BvbnNlLCB0eXBlLFxuICAgIHNlbGYgPSB0aGlzLFxuICAgIG9mZiA9IHVybC5pbmRleE9mKFwiIFwiKTtcblxuICBpZiAoIG9mZiA+PSAwICkge1xuICAgIHNlbGVjdG9yID0galF1ZXJ5LnRyaW0oIHVybC5zbGljZSggb2ZmLCB1cmwubGVuZ3RoICkgKTtcbiAgICB1cmwgPSB1cmwuc2xpY2UoIDAsIG9mZiApO1xuICB9XG5cbiAgLy8gSWYgaXQncyBhIGZ1bmN0aW9uXG4gIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHBhcmFtcyApICkge1xuXG4gICAgLy8gV2UgYXNzdW1lIHRoYXQgaXQncyB0aGUgY2FsbGJhY2tcbiAgICBjYWxsYmFjayA9IHBhcmFtcztcbiAgICBwYXJhbXMgPSB1bmRlZmluZWQ7XG5cbiAgLy8gT3RoZXJ3aXNlLCBidWlsZCBhIHBhcmFtIHN0cmluZ1xuICB9IGVsc2UgaWYgKCBwYXJhbXMgJiYgdHlwZW9mIHBhcmFtcyA9PT0gXCJvYmplY3RcIiApIHtcbiAgICB0eXBlID0gXCJQT1NUXCI7XG4gIH1cblxuICAvLyBJZiB3ZSBoYXZlIGVsZW1lbnRzIHRvIG1vZGlmeSwgbWFrZSB0aGUgcmVxdWVzdFxuICBpZiAoIHNlbGYubGVuZ3RoID4gMCApIHtcbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICB1cmw6IHVybCxcblxuICAgICAgLy8gaWYgXCJ0eXBlXCIgdmFyaWFibGUgaXMgdW5kZWZpbmVkLCB0aGVuIFwiR0VUXCIgbWV0aG9kIHdpbGwgYmUgdXNlZFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGRhdGFUeXBlOiBcImh0bWxcIixcbiAgICAgIGRhdGE6IHBhcmFtc1xuICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlVGV4dCApIHtcblxuICAgICAgLy8gU2F2ZSByZXNwb25zZSBmb3IgdXNlIGluIGNvbXBsZXRlIGNhbGxiYWNrXG4gICAgICByZXNwb25zZSA9IGFyZ3VtZW50cztcblxuICAgICAgc2VsZi5odG1sKCBzZWxlY3RvciA/XG5cbiAgICAgICAgLy8gSWYgYSBzZWxlY3RvciB3YXMgc3BlY2lmaWVkLCBsb2NhdGUgdGhlIHJpZ2h0IGVsZW1lbnRzIGluIGEgZHVtbXkgZGl2XG4gICAgICAgIC8vIEV4Y2x1ZGUgc2NyaXB0cyB0byBhdm9pZCBJRSAnUGVybWlzc2lvbiBEZW5pZWQnIGVycm9yc1xuICAgICAgICBqUXVlcnkoXCI8ZGl2PlwiKS5hcHBlbmQoIGpRdWVyeS5wYXJzZUhUTUwoIHJlc3BvbnNlVGV4dCApICkuZmluZCggc2VsZWN0b3IgKSA6XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgZnVsbCByZXN1bHRcbiAgICAgICAgcmVzcG9uc2VUZXh0ICk7XG5cbiAgICB9KS5jb21wbGV0ZSggY2FsbGJhY2sgJiYgZnVuY3Rpb24oIGpxWEhSLCBzdGF0dXMgKSB7XG4gICAgICBzZWxmLmVhY2goIGNhbGxiYWNrLCByZXNwb25zZSB8fCBbIGpxWEhSLnJlc3BvbnNlVGV4dCwgc3RhdHVzLCBqcVhIUiBdICk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG5cbi8vIEF0dGFjaCBhIGJ1bmNoIG9mIGZ1bmN0aW9ucyBmb3IgaGFuZGxpbmcgY29tbW9uIEFKQVggZXZlbnRzXG5qUXVlcnkuZWFjaCggWyBcImFqYXhTdGFydFwiLCBcImFqYXhTdG9wXCIsIFwiYWpheENvbXBsZXRlXCIsIFwiYWpheEVycm9yXCIsIFwiYWpheFN1Y2Nlc3NcIiwgXCJhamF4U2VuZFwiIF0sIGZ1bmN0aW9uKCBpLCB0eXBlICkge1xuICBqUXVlcnkuZm5bIHR5cGUgXSA9IGZ1bmN0aW9uKCBmbiApIHtcbiAgICByZXR1cm4gdGhpcy5vbiggdHlwZSwgZm4gKTtcbiAgfTtcbn0pO1xuXG5cblxuXG5qUXVlcnkuZXhwci5maWx0ZXJzLmFuaW1hdGVkID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHJldHVybiBqUXVlcnkuZ3JlcChqUXVlcnkudGltZXJzLCBmdW5jdGlvbiggZm4gKSB7XG4gICAgcmV0dXJuIGVsZW0gPT09IGZuLmVsZW07XG4gIH0pLmxlbmd0aDtcbn07XG5cblxuXG5cblxudmFyIGRvY0VsZW0gPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4vKipcbiAqIEdldHMgYSB3aW5kb3cgZnJvbSBhbiBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvdyggZWxlbSApIHtcbiAgcmV0dXJuIGpRdWVyeS5pc1dpbmRvdyggZWxlbSApID9cbiAgICBlbGVtIDpcbiAgICBlbGVtLm5vZGVUeXBlID09PSA5ID9cbiAgICAgIGVsZW0uZGVmYXVsdFZpZXcgfHwgZWxlbS5wYXJlbnRXaW5kb3cgOlxuICAgICAgZmFsc2U7XG59XG5cbmpRdWVyeS5vZmZzZXQgPSB7XG4gIHNldE9mZnNldDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGkgKSB7XG4gICAgdmFyIGN1clBvc2l0aW9uLCBjdXJMZWZ0LCBjdXJDU1NUb3AsIGN1clRvcCwgY3VyT2Zmc2V0LCBjdXJDU1NMZWZ0LCBjYWxjdWxhdGVQb3NpdGlvbixcbiAgICAgIHBvc2l0aW9uID0galF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICksXG4gICAgICBjdXJFbGVtID0galF1ZXJ5KCBlbGVtICksXG4gICAgICBwcm9wcyA9IHt9O1xuXG4gICAgLy8gc2V0IHBvc2l0aW9uIGZpcnN0LCBpbi1jYXNlIHRvcC9sZWZ0IGFyZSBzZXQgZXZlbiBvbiBzdGF0aWMgZWxlbVxuICAgIGlmICggcG9zaXRpb24gPT09IFwic3RhdGljXCIgKSB7XG4gICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgIH1cblxuICAgIGN1ck9mZnNldCA9IGN1ckVsZW0ub2Zmc2V0KCk7XG4gICAgY3VyQ1NTVG9wID0galF1ZXJ5LmNzcyggZWxlbSwgXCJ0b3BcIiApO1xuICAgIGN1ckNTU0xlZnQgPSBqUXVlcnkuY3NzKCBlbGVtLCBcImxlZnRcIiApO1xuICAgIGNhbGN1bGF0ZVBvc2l0aW9uID0gKCBwb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiIHx8IHBvc2l0aW9uID09PSBcImZpeGVkXCIgKSAmJlxuICAgICAgalF1ZXJ5LmluQXJyYXkoXCJhdXRvXCIsIFsgY3VyQ1NTVG9wLCBjdXJDU1NMZWZ0IF0gKSA+IC0xO1xuXG4gICAgLy8gbmVlZCB0byBiZSBhYmxlIHRvIGNhbGN1bGF0ZSBwb3NpdGlvbiBpZiBlaXRoZXIgdG9wIG9yIGxlZnQgaXMgYXV0byBhbmQgcG9zaXRpb24gaXMgZWl0aGVyIGFic29sdXRlIG9yIGZpeGVkXG4gICAgaWYgKCBjYWxjdWxhdGVQb3NpdGlvbiApIHtcbiAgICAgIGN1clBvc2l0aW9uID0gY3VyRWxlbS5wb3NpdGlvbigpO1xuICAgICAgY3VyVG9wID0gY3VyUG9zaXRpb24udG9wO1xuICAgICAgY3VyTGVmdCA9IGN1clBvc2l0aW9uLmxlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1clRvcCA9IHBhcnNlRmxvYXQoIGN1ckNTU1RvcCApIHx8IDA7XG4gICAgICBjdXJMZWZ0ID0gcGFyc2VGbG9hdCggY3VyQ1NTTGVmdCApIHx8IDA7XG4gICAgfVxuXG4gICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggb3B0aW9ucyApICkge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMuY2FsbCggZWxlbSwgaSwgY3VyT2Zmc2V0ICk7XG4gICAgfVxuXG4gICAgaWYgKCBvcHRpb25zLnRvcCAhPSBudWxsICkge1xuICAgICAgcHJvcHMudG9wID0gKCBvcHRpb25zLnRvcCAtIGN1ck9mZnNldC50b3AgKSArIGN1clRvcDtcbiAgICB9XG4gICAgaWYgKCBvcHRpb25zLmxlZnQgIT0gbnVsbCApIHtcbiAgICAgIHByb3BzLmxlZnQgPSAoIG9wdGlvbnMubGVmdCAtIGN1ck9mZnNldC5sZWZ0ICkgKyBjdXJMZWZ0O1xuICAgIH1cblxuICAgIGlmICggXCJ1c2luZ1wiIGluIG9wdGlvbnMgKSB7XG4gICAgICBvcHRpb25zLnVzaW5nLmNhbGwoIGVsZW0sIHByb3BzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1ckVsZW0uY3NzKCBwcm9wcyApO1xuICAgIH1cbiAgfVxufTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIG9mZnNldDogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG4gICAgaWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgIHRoaXMgOlxuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oIGkgKSB7XG4gICAgICAgICAgalF1ZXJ5Lm9mZnNldC5zZXRPZmZzZXQoIHRoaXMsIG9wdGlvbnMsIGkgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGRvY0VsZW0sIHdpbixcbiAgICAgIGJveCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH0sXG4gICAgICBlbGVtID0gdGhpc1sgMCBdLFxuICAgICAgZG9jID0gZWxlbSAmJiBlbGVtLm93bmVyRG9jdW1lbnQ7XG5cbiAgICBpZiAoICFkb2MgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAvLyBNYWtlIHN1cmUgaXQncyBub3QgYSBkaXNjb25uZWN0ZWQgRE9NIG5vZGVcbiAgICBpZiAoICFqUXVlcnkuY29udGFpbnMoIGRvY0VsZW0sIGVsZW0gKSApIHtcbiAgICAgIHJldHVybiBib3g7XG4gICAgfVxuXG4gICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBnQkNSLCBqdXN0IHVzZSAwLDAgcmF0aGVyIHRoYW4gZXJyb3JcbiAgICAvLyBCbGFja0JlcnJ5IDUsIGlPUyAzIChvcmlnaW5hbCBpUGhvbmUpXG4gICAgaWYgKCB0eXBlb2YgZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09IHN0cnVuZGVmaW5lZCApIHtcbiAgICAgIGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuICAgIHdpbiA9IGdldFdpbmRvdyggZG9jICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogYm94LnRvcCAgKyAoIHdpbi5wYWdlWU9mZnNldCB8fCBkb2NFbGVtLnNjcm9sbFRvcCApICAtICggZG9jRWxlbS5jbGllbnRUb3AgIHx8IDAgKSxcbiAgICAgIGxlZnQ6IGJveC5sZWZ0ICsgKCB3aW4ucGFnZVhPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxMZWZ0ICkgLSAoIGRvY0VsZW0uY2xpZW50TGVmdCB8fCAwIClcbiAgICB9O1xuICB9LFxuXG4gIHBvc2l0aW9uOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoICF0aGlzWyAwIF0gKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG9mZnNldFBhcmVudCwgb2Zmc2V0LFxuICAgICAgcGFyZW50T2Zmc2V0ID0geyB0b3A6IDAsIGxlZnQ6IDAgfSxcbiAgICAgIGVsZW0gPSB0aGlzWyAwIF07XG5cbiAgICAvLyBmaXhlZCBlbGVtZW50cyBhcmUgb2Zmc2V0IGZyb20gd2luZG93IChwYXJlbnRPZmZzZXQgPSB7dG9wOjAsIGxlZnQ6IDB9LCBiZWNhdXNlIGl0IGlzIGl0cyBvbmx5IG9mZnNldCBwYXJlbnRcbiAgICBpZiAoIGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApID09PSBcImZpeGVkXCIgKSB7XG4gICAgICAvLyB3ZSBhc3N1bWUgdGhhdCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaXMgYXZhaWxhYmxlIHdoZW4gY29tcHV0ZWQgcG9zaXRpb24gaXMgZml4ZWRcbiAgICAgIG9mZnNldCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEdldCAqcmVhbCogb2Zmc2V0UGFyZW50XG4gICAgICBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCgpO1xuXG4gICAgICAvLyBHZXQgY29ycmVjdCBvZmZzZXRzXG4gICAgICBvZmZzZXQgPSB0aGlzLm9mZnNldCgpO1xuICAgICAgaWYgKCAhalF1ZXJ5Lm5vZGVOYW1lKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJodG1sXCIgKSApIHtcbiAgICAgICAgcGFyZW50T2Zmc2V0ID0gb2Zmc2V0UGFyZW50Lm9mZnNldCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgb2Zmc2V0UGFyZW50IGJvcmRlcnNcbiAgICAgIHBhcmVudE9mZnNldC50b3AgICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudFsgMCBdLCBcImJvcmRlclRvcFdpZHRoXCIsIHRydWUgKTtcbiAgICAgIHBhcmVudE9mZnNldC5sZWZ0ICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudFsgMCBdLCBcImJvcmRlckxlZnRXaWR0aFwiLCB0cnVlICk7XG4gICAgfVxuXG4gICAgLy8gU3VidHJhY3QgcGFyZW50IG9mZnNldHMgYW5kIGVsZW1lbnQgbWFyZ2luc1xuICAgIC8vIG5vdGU6IHdoZW4gYW4gZWxlbWVudCBoYXMgbWFyZ2luOiBhdXRvIHRoZSBvZmZzZXRMZWZ0IGFuZCBtYXJnaW5MZWZ0XG4gICAgLy8gYXJlIHRoZSBzYW1lIGluIFNhZmFyaSBjYXVzaW5nIG9mZnNldC5sZWZ0IHRvIGluY29ycmVjdGx5IGJlIDBcbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiAgb2Zmc2V0LnRvcCAgLSBwYXJlbnRPZmZzZXQudG9wIC0galF1ZXJ5LmNzcyggZWxlbSwgXCJtYXJnaW5Ub3BcIiwgdHJ1ZSApLFxuICAgICAgbGVmdDogb2Zmc2V0LmxlZnQgLSBwYXJlbnRPZmZzZXQubGVmdCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luTGVmdFwiLCB0cnVlKVxuICAgIH07XG4gIH0sXG5cbiAgb2Zmc2V0UGFyZW50OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQgfHwgZG9jRWxlbTtcblxuICAgICAgd2hpbGUgKCBvZmZzZXRQYXJlbnQgJiYgKCAhalF1ZXJ5Lm5vZGVOYW1lKCBvZmZzZXRQYXJlbnQsIFwiaHRtbFwiICkgJiYgalF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50LCBcInBvc2l0aW9uXCIgKSA9PT0gXCJzdGF0aWNcIiApICkge1xuICAgICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBkb2NFbGVtO1xuICAgIH0pO1xuICB9XG59KTtcblxuLy8gQ3JlYXRlIHNjcm9sbExlZnQgYW5kIHNjcm9sbFRvcCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBzY3JvbGxMZWZ0OiBcInBhZ2VYT2Zmc2V0XCIsIHNjcm9sbFRvcDogXCJwYWdlWU9mZnNldFwiIH0sIGZ1bmN0aW9uKCBtZXRob2QsIHByb3AgKSB7XG4gIHZhciB0b3AgPSAvWS8udGVzdCggcHJvcCApO1xuXG4gIGpRdWVyeS5mblsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdmFsICkge1xuICAgIHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBtZXRob2QsIHZhbCApIHtcbiAgICAgIHZhciB3aW4gPSBnZXRXaW5kb3coIGVsZW0gKTtcblxuICAgICAgaWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgcmV0dXJuIHdpbiA/IChwcm9wIGluIHdpbikgPyB3aW5bIHByb3AgXSA6XG4gICAgICAgICAgd2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFsgbWV0aG9kIF0gOlxuICAgICAgICAgIGVsZW1bIG1ldGhvZCBdO1xuICAgICAgfVxuXG4gICAgICBpZiAoIHdpbiApIHtcbiAgICAgICAgd2luLnNjcm9sbFRvKFxuICAgICAgICAgICF0b3AgPyB2YWwgOiBqUXVlcnkoIHdpbiApLnNjcm9sbExlZnQoKSxcbiAgICAgICAgICB0b3AgPyB2YWwgOiBqUXVlcnkoIHdpbiApLnNjcm9sbFRvcCgpXG4gICAgICAgICk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1bIG1ldGhvZCBdID0gdmFsO1xuICAgICAgfVxuICAgIH0sIG1ldGhvZCwgdmFsLCBhcmd1bWVudHMubGVuZ3RoLCBudWxsICk7XG4gIH07XG59KTtcblxuLy8gQWRkIHRoZSB0b3AvbGVmdCBjc3NIb29rcyB1c2luZyBqUXVlcnkuZm4ucG9zaXRpb25cbi8vIFdlYmtpdCBidWc6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yOTA4NFxuLy8gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHBlcmNlbnQgd2hlbiBzcGVjaWZpZWQgZm9yIHRvcC9sZWZ0L2JvdHRvbS9yaWdodFxuLy8gcmF0aGVyIHRoYW4gbWFrZSB0aGUgY3NzIG1vZHVsZSBkZXBlbmQgb24gdGhlIG9mZnNldCBtb2R1bGUsIHdlIGp1c3QgY2hlY2sgZm9yIGl0IGhlcmVcbmpRdWVyeS5lYWNoKCBbIFwidG9wXCIsIFwibGVmdFwiIF0sIGZ1bmN0aW9uKCBpLCBwcm9wICkge1xuICBqUXVlcnkuY3NzSG9va3NbIHByb3AgXSA9IGFkZEdldEhvb2tJZiggc3VwcG9ydC5waXhlbFBvc2l0aW9uLFxuICAgIGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcbiAgICAgIGlmICggY29tcHV0ZWQgKSB7XG4gICAgICAgIGNvbXB1dGVkID0gY3VyQ1NTKCBlbGVtLCBwcm9wICk7XG4gICAgICAgIC8vIGlmIGN1ckNTUyByZXR1cm5zIHBlcmNlbnRhZ2UsIGZhbGxiYWNrIHRvIG9mZnNldFxuICAgICAgICByZXR1cm4gcm51bW5vbnB4LnRlc3QoIGNvbXB1dGVkICkgP1xuICAgICAgICAgIGpRdWVyeSggZWxlbSApLnBvc2l0aW9uKClbIHByb3AgXSArIFwicHhcIiA6XG4gICAgICAgICAgY29tcHV0ZWQ7XG4gICAgICB9XG4gICAgfVxuICApO1xufSk7XG5cblxuLy8gQ3JlYXRlIGlubmVySGVpZ2h0LCBpbm5lcldpZHRoLCBoZWlnaHQsIHdpZHRoLCBvdXRlckhlaWdodCBhbmQgb3V0ZXJXaWR0aCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBIZWlnaHQ6IFwiaGVpZ2h0XCIsIFdpZHRoOiBcIndpZHRoXCIgfSwgZnVuY3Rpb24oIG5hbWUsIHR5cGUgKSB7XG4gIGpRdWVyeS5lYWNoKCB7IHBhZGRpbmc6IFwiaW5uZXJcIiArIG5hbWUsIGNvbnRlbnQ6IHR5cGUsIFwiXCI6IFwib3V0ZXJcIiArIG5hbWUgfSwgZnVuY3Rpb24oIGRlZmF1bHRFeHRyYSwgZnVuY05hbWUgKSB7XG4gICAgLy8gbWFyZ2luIGlzIG9ubHkgZm9yIG91dGVySGVpZ2h0LCBvdXRlcldpZHRoXG4gICAgalF1ZXJ5LmZuWyBmdW5jTmFtZSBdID0gZnVuY3Rpb24oIG1hcmdpbiwgdmFsdWUgKSB7XG4gICAgICB2YXIgY2hhaW5hYmxlID0gYXJndW1lbnRzLmxlbmd0aCAmJiAoIGRlZmF1bHRFeHRyYSB8fCB0eXBlb2YgbWFyZ2luICE9PSBcImJvb2xlYW5cIiApLFxuICAgICAgICBleHRyYSA9IGRlZmF1bHRFeHRyYSB8fCAoIG1hcmdpbiA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdHJ1ZSA/IFwibWFyZ2luXCIgOiBcImJvcmRlclwiICk7XG5cbiAgICAgIHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCB2YWx1ZSApIHtcbiAgICAgICAgdmFyIGRvYztcblxuICAgICAgICBpZiAoIGpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuICAgICAgICAgIC8vIEFzIG9mIDUvOC8yMDEyIHRoaXMgd2lsbCB5aWVsZCBpbmNvcnJlY3QgcmVzdWx0cyBmb3IgTW9iaWxlIFNhZmFyaSwgYnV0IHRoZXJlXG4gICAgICAgICAgLy8gaXNuJ3QgYSB3aG9sZSBsb3Qgd2UgY2FuIGRvLiBTZWUgcHVsbCByZXF1ZXN0IGF0IHRoaXMgVVJMIGZvciBkaXNjdXNzaW9uOlxuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNzY0XG4gICAgICAgICAgcmV0dXJuIGVsZW0uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50WyBcImNsaWVudFwiICsgbmFtZSBdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGRvY3VtZW50IHdpZHRoIG9yIGhlaWdodFxuICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDkgKSB7XG4gICAgICAgICAgZG9jID0gZWxlbS5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgICAgICAvLyBFaXRoZXIgc2Nyb2xsW1dpZHRoL0hlaWdodF0gb3Igb2Zmc2V0W1dpZHRoL0hlaWdodF0gb3IgY2xpZW50W1dpZHRoL0hlaWdodF0sIHdoaWNoZXZlciBpcyBncmVhdGVzdFxuICAgICAgICAgIC8vIHVuZm9ydHVuYXRlbHksIHRoaXMgY2F1c2VzIGJ1ZyAjMzgzOCBpbiBJRTYvOCBvbmx5LCBidXQgdGhlcmUgaXMgY3VycmVudGx5IG5vIGdvb2QsIHNtYWxsIHdheSB0byBmaXggaXQuXG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICAgICAgZWxlbS5ib2R5WyBcInNjcm9sbFwiICsgbmFtZSBdLCBkb2NbIFwic2Nyb2xsXCIgKyBuYW1lIF0sXG4gICAgICAgICAgICBlbGVtLmJvZHlbIFwib2Zmc2V0XCIgKyBuYW1lIF0sIGRvY1sgXCJvZmZzZXRcIiArIG5hbWUgXSxcbiAgICAgICAgICAgIGRvY1sgXCJjbGllbnRcIiArIG5hbWUgXVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgLy8gR2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudCwgcmVxdWVzdGluZyBidXQgbm90IGZvcmNpbmcgcGFyc2VGbG9hdFxuICAgICAgICAgIGpRdWVyeS5jc3MoIGVsZW0sIHR5cGUsIGV4dHJhICkgOlxuXG4gICAgICAgICAgLy8gU2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudFxuICAgICAgICAgIGpRdWVyeS5zdHlsZSggZWxlbSwgdHlwZSwgdmFsdWUsIGV4dHJhICk7XG4gICAgICB9LCB0eXBlLCBjaGFpbmFibGUgPyBtYXJnaW4gOiB1bmRlZmluZWQsIGNoYWluYWJsZSwgbnVsbCApO1xuICAgIH07XG4gIH0pO1xufSk7XG5cblxuLy8gVGhlIG51bWJlciBvZiBlbGVtZW50cyBjb250YWluZWQgaW4gdGhlIG1hdGNoZWQgZWxlbWVudCBzZXRcbmpRdWVyeS5mbi5zaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmxlbmd0aDtcbn07XG5cbmpRdWVyeS5mbi5hbmRTZWxmID0galF1ZXJ5LmZuLmFkZEJhY2s7XG5cblxuXG5cbi8vIFJlZ2lzdGVyIGFzIGEgbmFtZWQgQU1EIG1vZHVsZSwgc2luY2UgalF1ZXJ5IGNhbiBiZSBjb25jYXRlbmF0ZWQgd2l0aCBvdGhlclxuLy8gZmlsZXMgdGhhdCBtYXkgdXNlIGRlZmluZSwgYnV0IG5vdCB2aWEgYSBwcm9wZXIgY29uY2F0ZW5hdGlvbiBzY3JpcHQgdGhhdFxuLy8gdW5kZXJzdGFuZHMgYW5vbnltb3VzIEFNRCBtb2R1bGVzLiBBIG5hbWVkIEFNRCBpcyBzYWZlc3QgYW5kIG1vc3Qgcm9idXN0XG4vLyB3YXkgdG8gcmVnaXN0ZXIuIExvd2VyY2FzZSBqcXVlcnkgaXMgdXNlZCBiZWNhdXNlIEFNRCBtb2R1bGUgbmFtZXMgYXJlXG4vLyBkZXJpdmVkIGZyb20gZmlsZSBuYW1lcywgYW5kIGpRdWVyeSBpcyBub3JtYWxseSBkZWxpdmVyZWQgaW4gYSBsb3dlcmNhc2Vcbi8vIGZpbGUgbmFtZS4gRG8gdGhpcyBhZnRlciBjcmVhdGluZyB0aGUgZ2xvYmFsIHNvIHRoYXQgaWYgYW4gQU1EIG1vZHVsZSB3YW50c1xuLy8gdG8gY2FsbCBub0NvbmZsaWN0IHRvIGhpZGUgdGhpcyB2ZXJzaW9uIG9mIGpRdWVyeSwgaXQgd2lsbCB3b3JrLlxuXG4vLyBOb3RlIHRoYXQgZm9yIG1heGltdW0gcG9ydGFiaWxpdHksIGxpYnJhcmllcyB0aGF0IGFyZSBub3QgalF1ZXJ5IHNob3VsZFxuLy8gZGVjbGFyZSB0aGVtc2VsdmVzIGFzIGFub255bW91cyBtb2R1bGVzLCBhbmQgYXZvaWQgc2V0dGluZyBhIGdsb2JhbCBpZiBhblxuLy8gQU1EIGxvYWRlciBpcyBwcmVzZW50LiBqUXVlcnkgaXMgYSBzcGVjaWFsIGNhc2UuIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmJ1cmtlL3JlcXVpcmVqcy93aWtpL1VwZGF0aW5nLWV4aXN0aW5nLWxpYnJhcmllcyN3aWtpLWFub25cblxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcbiAgZGVmaW5lKCBcImpxdWVyeVwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGpRdWVyeTtcbiAgfSk7XG59XG5cblxuXG5cbnZhclxuICAvLyBNYXAgb3ZlciBqUXVlcnkgaW4gY2FzZSBvZiBvdmVyd3JpdGVcbiAgX2pRdWVyeSA9IHdpbmRvdy5qUXVlcnksXG5cbiAgLy8gTWFwIG92ZXIgdGhlICQgaW4gY2FzZSBvZiBvdmVyd3JpdGVcbiAgXyQgPSB3aW5kb3cuJDtcblxualF1ZXJ5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiggZGVlcCApIHtcbiAgaWYgKCB3aW5kb3cuJCA9PT0galF1ZXJ5ICkge1xuICAgIHdpbmRvdy4kID0gXyQ7XG4gIH1cblxuICBpZiAoIGRlZXAgJiYgd2luZG93LmpRdWVyeSA9PT0galF1ZXJ5ICkge1xuICAgIHdpbmRvdy5qUXVlcnkgPSBfalF1ZXJ5O1xuICB9XG5cbiAgcmV0dXJuIGpRdWVyeTtcbn07XG5cbi8vIEV4cG9zZSBqUXVlcnkgYW5kICQgaWRlbnRpZmllcnMsIGV2ZW4gaW5cbi8vIEFNRCAoIzcxMDIjY29tbWVudDoxMCwgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvcHVsbC81NTcpXG4vLyBhbmQgQ29tbW9uSlMgZm9yIGJyb3dzZXIgZW11bGF0b3JzICgjMTM1NjYpXG5pZiAoIHR5cGVvZiBub0dsb2JhbCA9PT0gc3RydW5kZWZpbmVkICkge1xuICB3aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSBqUXVlcnk7XG59XG5cblxuXG5cbnJldHVybiBqUXVlcnk7XG5cbn0pKTtcbiIsIi8qXG5cbiR3aW4ub24oJ3Jlc2l6ZScsIHRocm90dGxlKGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZygndGhyb3R0bGUnKTtcbn0sIDEwMCkpO1xuXG4qL1xuXG5mdW5jdGlvbiB0aHJvdHRsZShmbiwgdGhyZXNoaG9sZCwgc2NvcGUpIHtcblx0dGhyZXNoaG9sZCB8fCAodGhyZXNoaG9sZCA9IDI1MCk7XG5cdHZhciBsYXN0LFxuXHRcdFx0ZGVmZXJUaW1lcjtcblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgY29udGV4dCA9IHNjb3BlIHx8IHRoaXMsXG5cdFx0ICAgIG5vdyA9ICtuZXcgRGF0ZSxcblx0XHQgICAgYXJncyA9IGFyZ3VtZW50cztcblx0XHRpZiAobGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNoaG9sZCkge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KGRlZmVyVGltZXIpO1xuXHRcdFx0ZGVmZXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRsYXN0ID0gbm93O1xuXHRcdFx0XHRmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdH0sIHRocmVzaGhvbGQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsYXN0ID0gbm93O1xuXHRcdFx0Zm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0fVxuXHR9O1xufSIsIi8qIVxuICogdmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsLmhhY2tzIHYwLjUuNVxuICogQHdlYjogaHR0cHM6Ly9naXRodWIuY29tL3JvZG5leXJlaG0vdmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsL1xuICogQGF1dGhvcjogWm9sdGFuIEhhd3J5bHVrIC0gaHR0cDovL3d3dy51c2VyYWdlbnRtYW4uY29tL1xuICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgIC8vIGxpa2UgTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgIHJvb3Qudmlld3BvcnRVbml0c0J1Z2d5ZmlsbEhhY2tzID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBvcHRpb25zO1xuICB2YXIgY2FsY0V4cHJlc3Npb24gPSAvY2FsY1xcKC9nO1xuICB2YXIgcXVvdGVFeHByZXNzaW9uID0gL1tcXFwiXFwnXS9nO1xuICB2YXIgdXJsRXhwcmVzc2lvbiA9IC91cmxcXChbXlxcKV0qXFwpL2c7XG4gIHZhciB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgdmFyIGlzQnVnZ3lJRSA9IC9NU0lFIFswLTldXFwuL2kudGVzdCh1c2VyQWdlbnQpO1xuICB2YXIgaXNPbGRJRSA9IC9NU0lFIFswLThdXFwuL2kudGVzdCh1c2VyQWdlbnQpO1xuICB2YXIgc3VwcG9ydHNWbWlubWF4ID0gdHJ1ZTtcbiAgdmFyIHN1cHBvcnRzVm1pbm1heENhbGMgPSB0cnVlO1xuXG4gIGlmIChpc0J1Z2d5SUUgPT09IHRydWUpIHtcbiAgICBzdXBwb3J0c1ZtaW5tYXhDYWxjID0gZmFsc2U7XG4gICAgc3VwcG9ydHNWbWlubWF4ID0gZmFsc2U7XG4gIH1cblxuICAvLyBpT1MgU0FGQVJJLCBJRTksIG9yIFN0b2NrIEFuZHJvaWQ6IGFidXNlIFwiY29udGVudFwiIGlmIFwidmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsXCIgc3BlY2lmaWVkXG4gIGZ1bmN0aW9uIGNoZWNrSGFja3MoZGVjbGFyYXRpb25zLCBydWxlLCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBuZWVkc0hhY2sgPSBuYW1lID09PSAnY29udGVudCcgJiYgdmFsdWUuaW5kZXhPZigndmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsJykgPiAtMTtcbiAgICBpZiAoIW5lZWRzSGFjaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBmYWtlUnVsZXMgPSB2YWx1ZS5yZXBsYWNlKHF1b3RlRXhwcmVzc2lvbiwgJycpO1xuICAgIGZha2VSdWxlcy5zcGxpdCgnOycpLmZvckVhY2goZnVuY3Rpb24oZmFrZVJ1bGVFbGVtZW50KSB7XG4gICAgICB2YXIgZmFrZVJ1bGUgPSBmYWtlUnVsZUVsZW1lbnQuc3BsaXQoJzonKTtcbiAgICAgIGlmIChmYWtlUnVsZS5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbmFtZSA9IGZha2VSdWxlWzBdLnRyaW0oKTtcbiAgICAgIGlmIChuYW1lID09PSAndmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSA9IGZha2VSdWxlWzFdLnRyaW0oKTtcbiAgICAgIGRlY2xhcmF0aW9ucy5wdXNoKFtydWxlLCBuYW1lLCB2YWx1ZV0pO1xuICAgICAgaWYgKGNhbGNFeHByZXNzaW9uLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHZhciB3ZWJraXRWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoY2FsY0V4cHJlc3Npb24sICctd2Via2l0LWNhbGMoJyk7XG4gICAgICAgIGRlY2xhcmF0aW9ucy5wdXNoKFtydWxlLCBuYW1lLCB3ZWJraXRWYWx1ZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXF1aXJlZDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaXNNb2JpbGVTYWZhcmkgfHwgaXNCdWdneUlFO1xuICAgIH0sXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihpbml0T3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IGluaXRPcHRpb25zO1xuXG4gICAgICAvLyBUZXN0IHZpZXdwb3J0IHVuaXRzIHN1cHBvcnQgaW4gY2FsYygpIGV4cHJlc3Npb25zXG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuc3R5bGUud2lkdGggPSAnMXZtYXgnO1xuICAgICAgc3VwcG9ydHNWbWlubWF4ID0gZGl2LnN0eWxlLndpZHRoICE9PSAnJztcblxuICAgICAgLy8gdGhlcmUgaXMgbm8gYWNjdXJhdGUgd2F5IHRvIGRldGVjdCB0aGlzIHByb2dyYW1tYXRpY2FsbHkuXG4gICAgICBpZiAob3B0aW9ucy5pc01vYmlsZVNhZmFyaSB8fCBvcHRpb25zLmlzQmFkU3RvY2tBbmRyb2lkKSB7XG4gICAgICAgIHN1cHBvcnRzVm1pbm1heENhbGMgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBpbml0aWFsaXplRXZlbnRzOiBmdW5jdGlvbihvcHRpb25zLCByZWZyZXNoLCBfcmVmcmVzaCkge1xuICAgICAgaWYgKG9wdGlvbnMuZm9yY2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNCdWdneUlFICYmICFvcHRpb25zLl9saXN0ZW5pbmdUb1Jlc2l6ZSkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX3JlZnJlc2gsIHRydWUpO1xuICAgICAgICBvcHRpb25zLl9saXN0ZW5pbmdUb1Jlc2l6ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmREZWNsYXJhdGlvbnM6IGZ1bmN0aW9uKGRlY2xhcmF0aW9ucywgcnVsZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChuYW1lID09PSBudWxsKSB7XG4gICAgICAgIC8vIEtleWZyYW1lc1J1bGUgZG9lcyBub3QgaGF2ZSBhIENTUy1Qcm9wZXJ0eU5hbWVcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjaGVja0hhY2tzKGRlY2xhcmF0aW9ucywgcnVsZSwgbmFtZSwgdmFsdWUpO1xuICAgIH0sXG5cbiAgICBvdmVyd3JpdGVEZWNsYXJhdGlvbjogZnVuY3Rpb24ocnVsZSwgbmFtZSwgX3ZhbHVlKSB7XG4gICAgICBpZiAoaXNCdWdneUlFICYmIG5hbWUgPT09ICdmaWx0ZXInKSB7XG4gICAgICAgIC8vIHJlbW92ZSB1bml0IFwicHhcIiBmcm9tIGNvbXBsZXggdmFsdWUsIGUuZy46XG4gICAgICAgIC8vIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkRyb3BTaGFkb3coT2ZmWD01LjRweCwgT2ZmWT0zLjlweCwgQ29sb3I9IzAwMDAwMCk7XG4gICAgICAgIF92YWx1ZSA9IF92YWx1ZS5yZXBsYWNlKC9weC9nLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdmFsdWU7XG4gICAgfVxuICB9O1xuXG59KSk7XG4iLCIvKiFcbiAqIHZpZXdwb3J0LXVuaXRzLWJ1Z2d5ZmlsbCB2MC41LjVcbiAqIEB3ZWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9yb2RuZXlyZWhtL3ZpZXdwb3J0LXVuaXRzLWJ1Z2d5ZmlsbC9cbiAqIEBhdXRob3I6IFJvZG5leSBSZWhtIC0gaHR0cDovL3JvZG5leXJlaG0uZGUvZW4vXG4gKi9cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgLy8gbGlrZSBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG4gICAgcm9vdC52aWV3cG9ydFVuaXRzQnVnZ3lmaWxsID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvKmdsb2JhbCBkb2N1bWVudCwgd2luZG93LCBuYXZpZ2F0b3IsIGxvY2F0aW9uLCBYTUxIdHRwUmVxdWVzdCwgWERvbWFpblJlcXVlc3QqL1xuXG4gIHZhciBpbml0aWFsaXplZCA9IGZhbHNlO1xuICB2YXIgb3B0aW9ucztcbiAgdmFyIHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICB2YXIgdmlld3BvcnRVbml0RXhwcmVzc2lvbiA9IC8oWystXT9bMC05Ll0rKSh2aHx2d3x2bWlufHZtYXgpL2c7XG4gIHZhciBmb3JFYWNoID0gW10uZm9yRWFjaDtcbiAgdmFyIGRpbWVuc2lvbnM7XG4gIHZhciBkZWNsYXJhdGlvbnM7XG4gIHZhciBzdHlsZU5vZGU7XG4gIHZhciBpc0J1Z2d5SUUgPSAvTVNJRSBbMC05XVxcLi9pLnRlc3QodXNlckFnZW50KTtcbiAgdmFyIGlzT2xkSUUgPSAvTVNJRSBbMC04XVxcLi9pLnRlc3QodXNlckFnZW50KTtcbiAgdmFyIGlzT3BlcmFNaW5pID0gdXNlckFnZW50LmluZGV4T2YoJ09wZXJhIE1pbmknKSA+IC0xO1xuXG4gIHZhciBpc01vYmlsZVNhZmFyaSA9IC8oaVBob25lfGlQb2R8aVBhZCkuK0FwcGxlV2ViS2l0L2kudGVzdCh1c2VyQWdlbnQpICYmIChmdW5jdGlvbigpIHtcbiAgICAvLyBSZWdleHAgZm9yIGlPUy12ZXJzaW9uIHRlc3RlZCBhZ2FpbnN0IHRoZSBmb2xsb3dpbmcgdXNlckFnZW50IHN0cmluZ3M6XG4gICAgLy8gRXhhbXBsZSBXZWJWaWV3IFVzZXJBZ2VudHM6XG4gICAgLy8gKiBpT1MgQ2hyb21lIG9uIGlPUzg6IFwiTW96aWxsYS81LjAgKGlQYWQ7IENQVSBPUyA4XzEgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNjAwLjEuNCAoS0hUTUwsIGxpa2UgR2Vja28pIENyaU9TLzM5LjAuMjE3MS41MCBNb2JpbGUvMTJCNDEwIFNhZmFyaS82MDAuMS40XCJcbiAgICAvLyAqIGlPUyBGYWNlYm9vayBvbiBpT1M3OiBcIk1vemlsbGEvNS4wIChpUGhvbmU7IENQVSBpUGhvbmUgT1MgN18xXzEgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNTM3LjUxLjIgKEtIVE1MLCBsaWtlIEdlY2tvKSBNb2JpbGUvMTFEMjAxIFtGQkFOL0ZCSU9TO0ZCQVYvMTIuMS4wLjI0LjIwOyBGQkJWLzMyMTQyNDc7IEZCRFYvaVBob25lNiwxO0ZCTUQvaVBob25lOyBGQlNOL2lQaG9uZSBPUztGQlNWLzcuMS4xOyBGQlNTLzI7IEZCQ1IvQVQmVDtGQklEL3Bob25lO0ZCTEMvZW5fVVM7RkJPUC81XVwiXG4gICAgLy8gRXhhbXBsZSBTYWZhcmkgVXNlckFnZW50czpcbiAgICAvLyAqIFNhZmFyaSBpT1M4OiBcIk1vemlsbGEvNS4wIChpUGhvbmU7IENQVSBpUGhvbmUgT1MgOF8wIGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzYwMC4xLjMgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzguMCBNb2JpbGUvMTJBNDM0NWQgU2FmYXJpLzYwMC4xLjRcIlxuICAgIC8vICogU2FmYXJpIGlPUzc6IFwiTW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyA3XzAgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNTM3LjUxLjEgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzcuMCBNb2JpbGUvMTFBNDQ0OWQgU2FmYXJpLzk1MzcuNTNcIlxuICAgIHZhciBpT1N2ZXJzaW9uID0gdXNlckFnZW50Lm1hdGNoKC9PUyAoXFxkKS8pO1xuICAgIC8vIHZpZXdwb3J0IHVuaXRzIHdvcmsgZmluZSBpbiBtb2JpbGUgU2FmYXJpIGFuZCB3ZWJWaWV3IG9uIGlPUyA4K1xuICAgIHJldHVybiBpT1N2ZXJzaW9uICYmIGlPU3ZlcnNpb24ubGVuZ3RoPjEgJiYgcGFyc2VJbnQoaU9TdmVyc2lvblsxXSkgPCA4O1xuICB9KSgpO1xuXG4gIHZhciBpc0JhZFN0b2NrQW5kcm9pZCA9IChmdW5jdGlvbigpIHtcbiAgICAvLyBBbmRyb2lkIHN0b2NrIGJyb3dzZXIgdGVzdCBkZXJpdmVkIGZyb21cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0OTI2MjIxL2Rpc3Rpbmd1aXNoLWFuZHJvaWQtY2hyb21lLWZyb20tc3RvY2stYnJvd3Nlci1zdG9jay1icm93c2Vycy11c2VyLWFnZW50LWNvbnRhaVxuICAgIHZhciBpc0FuZHJvaWQgPSB1c2VyQWdlbnQuaW5kZXhPZignIEFuZHJvaWQgJykgPiAtMTtcbiAgICBpZiAoIWlzQW5kcm9pZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBpc1N0b2NrQW5kcm9pZCA9IHVzZXJBZ2VudC5pbmRleE9mKCdWZXJzaW9uLycpID4gLTE7XG4gICAgaWYgKCFpc1N0b2NrQW5kcm9pZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB2ZXJzaW9uTnVtYmVyID0gcGFyc2VGbG9hdCgodXNlckFnZW50Lm1hdGNoKCdBbmRyb2lkIChbMC05Ll0rKScpIHx8IFtdKVsxXSk7XG4gICAgLy8gYW55dGhpbmcgYmVsb3cgNC40IHVzZXMgV2ViS2l0IHdpdGhvdXQgKmFueSogdmlld3BvcnQgc3VwcG9ydCxcbiAgICAvLyA0LjQgaGFzIGlzc3VlcyB3aXRoIHZpZXdwb3J0IHVuaXRzIHdpdGhpbiBjYWxjKClcbiAgICByZXR1cm4gdmVyc2lvbk51bWJlciA8PSA0LjQ7XG4gIH0pKCk7XG5cbiAgLy8gYWRkZWQgY2hlY2sgZm9yIElFMTEsIHNpbmNlIGl0ICpzdGlsbCogZG9lc24ndCB1bmRlcnN0YW5kIHZtYXghISFcbiAgaWYgKCFpc0J1Z2d5SUUpIHtcbiAgICBpc0J1Z2d5SUUgPSAhIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1RyaWRlbnQuKnJ2WyA6XSoxMVxcLi8pO1xuICB9XG5cbiAgLy8gUG9seWZpbGwgZm9yIGNyZWF0aW5nIEN1c3RvbUV2ZW50cyBvbiBJRTkvMTAvMTFcbiAgLy8gZnJvbSBodHRwczovL2dpdGh1Yi5jb20va3JhbWJ1aGwvY3VzdG9tLWV2ZW50LXBvbHlmaWxsXG4gIHRyeSB7XG4gICAgbmV3IEN1c3RvbUV2ZW50KCd0ZXN0Jyk7XG4gIH0gY2F0Y2goZSkge1xuICAgIHZhciBDdXN0b21FdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXMpIHtcbiAgICAgIHZhciBldnQ7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge1xuICAgICAgICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGRldGFpbDogdW5kZWZpbmVkXG4gICAgICAgICAgfTtcblxuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgcmV0dXJuIGV2dDtcbiAgICB9O1xuICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gICAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7IC8vIGV4cG9zZSBkZWZpbml0aW9uIHRvIHdpbmRvd1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xuICAgIHZhciB0aW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9O1xuXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChjYWxsYmFjaywgd2FpdCk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMjYwNjkvaG93LXRvLWlkZW50aWZ5LWlmLWEtd2VicGFnZS1pcy1iZWluZy1sb2FkZWQtaW5zaWRlLWFuLWlmcmFtZS1vci1kaXJlY3RseS1pbnRvLXRcbiAgZnVuY3Rpb24gaW5JZnJhbWUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB3aW5kb3cuc2VsZiAhPT0gd2luZG93LnRvcDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0aWFsaXplKGluaXRPcHRpb25zKSB7XG4gICAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGluaXRPcHRpb25zID09PSB0cnVlKSB7XG4gICAgICBpbml0T3B0aW9ucyA9IHtcbiAgICAgICAgZm9yY2U6IHRydWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3B0aW9ucyA9IGluaXRPcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuaXNNb2JpbGVTYWZhcmkgPSBpc01vYmlsZVNhZmFyaTtcbiAgICBvcHRpb25zLmlzQmFkU3RvY2tBbmRyb2lkID0gaXNCYWRTdG9ja0FuZHJvaWQ7XG5cbiAgICBpZiAoaXNPbGRJRSB8fCAoIW9wdGlvbnMuZm9yY2UgJiYgIWlzTW9iaWxlU2FmYXJpICYmICFpc0J1Z2d5SUUgJiYgIWlzQmFkU3RvY2tBbmRyb2lkICYmICFpc09wZXJhTWluaSAmJiAoIW9wdGlvbnMuaGFja3MgfHwgIW9wdGlvbnMuaGFja3MucmVxdWlyZWQob3B0aW9ucykpKSkge1xuICAgICAgLy8gdGhpcyBidWdneWZpbGwgb25seSBhcHBsaWVzIHRvIG1vYmlsZSBzYWZhcmksIElFOS0xMCBhbmQgdGhlIFN0b2NrIEFuZHJvaWQgQnJvd3Nlci5cbiAgICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiBpc09sZElFKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbygndmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsIHJlcXVpcmVzIGEgcHJvcGVyIENTU09NIGFuZCBiYXNpYyB2aWV3cG9ydCB1bml0IHN1cHBvcnQsIHdoaWNoIGFyZSBub3QgYXZhaWxhYmxlIGluIElFOCBhbmQgYmVsb3cnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge31cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gZmlyZSBhIGN1c3RvbSBldmVudCB0aGF0IGJ1Z2d5ZmlsbCB3YXMgaW5pdGlhbGl6ZVxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgndmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsLWluaXQnKSk7XG5cbiAgICBvcHRpb25zLmhhY2tzICYmIG9wdGlvbnMuaGFja3MuaW5pdGlhbGl6ZShvcHRpb25zKTtcblxuICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBzdHlsZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlTm9kZS5pZCA9ICdwYXRjaGVkLXZpZXdwb3J0JztcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlTm9kZSk7XG5cbiAgICAvLyBJc3N1ZSAjNjogQ3Jvc3MgT3JpZ2luIFN0eWxlc2hlZXRzIGFyZSBub3QgYWNjZXNzaWJsZSB0aHJvdWdoIENTU09NLFxuICAgIC8vIHRoZXJlZm9yZSBkb3dubG9hZCBhbmQgaW5qZWN0IHRoZW0gYXMgPHN0eWxlPiB0byBjaXJjdW12ZW50IFNPUC5cbiAgICBpbXBvcnRDcm9zc09yaWdpbkxpbmtzKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF9yZWZyZXNoID0gZGVib3VuY2UocmVmcmVzaCwgb3B0aW9ucy5yZWZyZXNoRGVib3VuY2VXYWl0IHx8IDEwMCk7XG4gICAgICAvLyBkb2luZyBhIGZ1bGwgcmVmcmVzaCByYXRoZXIgdGhhbiB1cGRhdGVTdHlsZXMgYmVjYXVzZSBhbiBvcmllbnRhdGlvbmNoYW5nZVxuICAgICAgLy8gY291bGQgYWN0aXZhdGUgZGlmZmVyZW50IHN0eWxlc2hlZXRzXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBfcmVmcmVzaCwgdHJ1ZSk7XG4gICAgICAvLyBvcmllbnRhdGlvbmNoYW5nZSBtaWdodCBoYXZlIGhhcHBlbmVkIHdoaWxlIGluIGEgZGlmZmVyZW50IHdpbmRvd1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgX3JlZnJlc2gsIHRydWUpO1xuXG4gICAgICBpZiAob3B0aW9ucy5mb3JjZSB8fCBpc0J1Z2d5SUUgfHwgaW5JZnJhbWUoKSkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX3JlZnJlc2gsIHRydWUpO1xuICAgICAgICBvcHRpb25zLl9saXN0ZW5pbmdUb1Jlc2l6ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMuaGFja3MgJiYgb3B0aW9ucy5oYWNrcy5pbml0aWFsaXplRXZlbnRzKG9wdGlvbnMsIHJlZnJlc2gsIF9yZWZyZXNoKTtcblxuICAgICAgcmVmcmVzaCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU3R5bGVzKCkge1xuICAgIHN0eWxlTm9kZS50ZXh0Q29udGVudCA9IGdldFJlcGxhY2VkVmlld3BvcnRVbml0cygpO1xuICAgIC8vIG1vdmUgdG8gdGhlIGVuZCBpbiBjYXNlIGlubGluZSA8c3R5bGU+cyB3ZXJlIGFkZGVkIGR5bmFtaWNhbGx5XG4gICAgc3R5bGVOb2RlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoc3R5bGVOb2RlKTtcbiAgICAvLyBmaXJlIGEgY3VzdG9tIGV2ZW50IHRoYXQgc3R5bGVzIHdlcmUgdXBkYXRlZFxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgndmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsLXN0eWxlJykpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICBpZiAoIWluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZmluZFByb3BlcnRpZXMoKTtcblxuICAgIC8vIGlPUyBTYWZhcmkgd2lsbCByZXBvcnQgd2luZG93LmlubmVyV2lkdGggYW5kIC5pbm5lckhlaWdodCBhcyAwIHVubGVzcyBhIHRpbWVvdXQgaXMgdXNlZCBoZXJlLlxuICAgIC8vIFRPRE86IGZpZ3VyZSBvdXQgV0hZIGlubmVyV2lkdGggPT09IDBcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgdXBkYXRlU3R5bGVzKCk7XG4gICAgfSwgMSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kUHJvcGVydGllcygpIHtcbiAgICBkZWNsYXJhdGlvbnMgPSBbXTtcbiAgICBmb3JFYWNoLmNhbGwoZG9jdW1lbnQuc3R5bGVTaGVldHMsIGZ1bmN0aW9uKHNoZWV0KSB7XG4gICAgICBpZiAoc2hlZXQub3duZXJOb2RlLmlkID09PSAncGF0Y2hlZC12aWV3cG9ydCcgfHwgIXNoZWV0LmNzc1J1bGVzIHx8IHNoZWV0Lm93bmVyTm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsJykgPT09ICdpZ25vcmUnKSB7XG4gICAgICAgIC8vIHNraXAgZW50aXJlIHNoZWV0IGJlY2F1c2Ugbm8gcnVsZXMgYXJlIHByZXNlbnQsIGl0J3Mgc3VwcG9zZWQgdG8gYmUgaWdub3JlZCBvciBpdCdzIHRoZSB0YXJnZXQtZWxlbWVudCBvZiB0aGUgYnVnZ3lmaWxsXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoZWV0Lm1lZGlhICYmIHNoZWV0Lm1lZGlhLm1lZGlhVGV4dCAmJiB3aW5kb3cubWF0Y2hNZWRpYSAmJiAhd2luZG93Lm1hdGNoTWVkaWEoc2hlZXQubWVkaWEubWVkaWFUZXh0KS5tYXRjaGVzKSB7XG4gICAgICAgIC8vIHNraXAgZW50aXJlIHNoZWV0IGJlY2F1c2UgbWVkaWEgYXR0cmlidXRlIGRvZXNuJ3QgbWF0Y2hcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmb3JFYWNoLmNhbGwoc2hlZXQuY3NzUnVsZXMsIGZpbmREZWNsYXJhdGlvbnMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRlY2xhcmF0aW9ucztcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmREZWNsYXJhdGlvbnMocnVsZSkge1xuICAgIGlmIChydWxlLnR5cGUgPT09IDcpIHtcbiAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgLy8gdGhlcmUgbWF5IGJlIGEgY2FzZSB3aGVyZSBhY2Nlc3NpbmcgY3NzVGV4dCB0aHJvd3MgYW4gZXJyb3IuXG4gICAgICAvLyBJIGNvdWxkIG5vdCByZXByb2R1Y2UgdGhpcyBpc3N1ZSwgYnV0IHRoZSB3b3JzdCB0aGF0IGNhbiBoYXBwZW5cbiAgICAgIC8vIHRoaXMgd2F5IGlzIGFuIGFuaW1hdGlvbiBub3QgcnVubmluZyBwcm9wZXJseS5cbiAgICAgIC8vIG5vdCBhd2Vzb21lLCBidXQgcHJvYmFibHkgYmV0dGVyIHRoYW4gYSBzY3JpcHQgZXJyb3JcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcm9kbmV5cmVobS92aWV3cG9ydC11bml0cy1idWdneWZpbGwvaXNzdWVzLzIxXG4gICAgICB0cnkge1xuICAgICAgICB2YWx1ZSA9IHJ1bGUuY3NzVGV4dDtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZpZXdwb3J0VW5pdEV4cHJlc3Npb24ubGFzdEluZGV4ID0gMDtcbiAgICAgIGlmICh2aWV3cG9ydFVuaXRFeHByZXNzaW9uLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIC8vIEtleWZyYW1lc1J1bGUgZG9lcyBub3QgaGF2ZSBhIENTUy1Qcm9wZXJ0eU5hbWVcbiAgICAgICAgZGVjbGFyYXRpb25zLnB1c2goW3J1bGUsIG51bGwsIHZhbHVlXSk7XG4gICAgICAgIG9wdGlvbnMuaGFja3MgJiYgb3B0aW9ucy5oYWNrcy5maW5kRGVjbGFyYXRpb25zKGRlY2xhcmF0aW9ucywgcnVsZSwgbnVsbCwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFydWxlLnN0eWxlKSB7XG4gICAgICBpZiAoIXJ1bGUuY3NzUnVsZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmb3JFYWNoLmNhbGwocnVsZS5jc3NSdWxlcywgZnVuY3Rpb24oX3J1bGUpIHtcbiAgICAgICAgZmluZERlY2xhcmF0aW9ucyhfcnVsZSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvckVhY2guY2FsbChydWxlLnN0eWxlLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgdmFsdWUgPSBydWxlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUobmFtZSk7XG4gICAgICAvLyBwcmVzZXJ2ZSB0aG9zZSAhaW1wb3J0YW50IHJ1bGVzXG4gICAgICBpZiAocnVsZS5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KG5hbWUpKSB7XG4gICAgICAgIHZhbHVlICs9ICcgIWltcG9ydGFudCc7XG4gICAgICB9XG5cbiAgICAgIHZpZXdwb3J0VW5pdEV4cHJlc3Npb24ubGFzdEluZGV4ID0gMDtcbiAgICAgIGlmICh2aWV3cG9ydFVuaXRFeHByZXNzaW9uLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIGRlY2xhcmF0aW9ucy5wdXNoKFtydWxlLCBuYW1lLCB2YWx1ZV0pO1xuICAgICAgICBvcHRpb25zLmhhY2tzICYmIG9wdGlvbnMuaGFja3MuZmluZERlY2xhcmF0aW9ucyhkZWNsYXJhdGlvbnMsIHJ1bGUsIG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJlcGxhY2VkVmlld3BvcnRVbml0cygpIHtcbiAgICBkaW1lbnNpb25zID0gZ2V0Vmlld3BvcnQoKTtcblxuICAgIHZhciBjc3MgPSBbXTtcbiAgICB2YXIgYnVmZmVyID0gW107XG4gICAgdmFyIG9wZW47XG4gICAgdmFyIGNsb3NlO1xuXG4gICAgZGVjbGFyYXRpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgdmFyIF9pdGVtID0gb3ZlcndyaXRlRGVjbGFyYXRpb24uYXBwbHkobnVsbCwgaXRlbSk7XG4gICAgICB2YXIgX29wZW4gPSBfaXRlbS5zZWxlY3Rvci5sZW5ndGggPyAoX2l0ZW0uc2VsZWN0b3Iuam9pbignIHtcXG4nKSArICcge1xcbicpIDogJyc7XG4gICAgICB2YXIgX2Nsb3NlID0gbmV3IEFycmF5KF9pdGVtLnNlbGVjdG9yLmxlbmd0aCArIDEpLmpvaW4oJ1xcbn0nKTtcblxuICAgICAgaWYgKCFfb3BlbiB8fCBfb3BlbiAhPT0gb3Blbikge1xuICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgIGNzcy5wdXNoKG9wZW4gKyBidWZmZXIuam9pbignXFxuJykgKyBjbG9zZSk7XG4gICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX29wZW4pIHtcbiAgICAgICAgICBvcGVuID0gX29wZW47XG4gICAgICAgICAgY2xvc2UgPSBfY2xvc2U7XG4gICAgICAgICAgYnVmZmVyLnB1c2goX2l0ZW0uY29udGVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3NzLnB1c2goX2l0ZW0uY29udGVudCk7XG4gICAgICAgICAgb3BlbiA9IG51bGw7XG4gICAgICAgICAgY2xvc2UgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoX29wZW4gJiYgIW9wZW4pIHtcbiAgICAgICAgb3BlbiA9IF9vcGVuO1xuICAgICAgICBjbG9zZSA9IF9jbG9zZTtcbiAgICAgIH1cblxuICAgICAgYnVmZmVyLnB1c2goX2l0ZW0uY29udGVudCk7XG4gICAgfSk7XG5cbiAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgY3NzLnB1c2gob3BlbiArIGJ1ZmZlci5qb2luKCdcXG4nKSArIGNsb3NlKTtcbiAgICB9XG5cbiAgICAvLyBPcGVyYSBNaW5pIG1lc3NlcyB1cCBvbiB0aGUgY29udGVudCBoYWNrIChpdCByZXBsYWNlcyB0aGUgRE9NIG5vZGUncyBpbm5lckhUTUwgd2l0aCB0aGUgdmFsdWUpLlxuICAgIC8vIFRoaXMgZml4ZXMgaXQuIFdlIHRlc3QgZm9yIE9wZXJhIE1pbmkgb25seSBzaW5jZSBpdCBpcyB0aGUgbW9zdCBleHBlbnNpdmUgQ1NTIHNlbGVjdG9yXG4gICAgLy8gc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9Vbml2ZXJzYWxfc2VsZWN0b3JzXG4gICAgaWYgKGlzT3BlcmFNaW5pKSB7XG4gICAgICBjc3MucHVzaCgnKiB7IGNvbnRlbnQ6IG5vcm1hbCAhaW1wb3J0YW50OyB9Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNzcy5qb2luKCdcXG5cXG4nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG92ZXJ3cml0ZURlY2xhcmF0aW9uKHJ1bGUsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIF92YWx1ZTtcbiAgICB2YXIgX3NlbGVjdG9ycyA9IFtdO1xuXG4gICAgX3ZhbHVlID0gdmFsdWUucmVwbGFjZSh2aWV3cG9ydFVuaXRFeHByZXNzaW9uLCByZXBsYWNlVmFsdWVzKTtcblxuICAgIGlmIChvcHRpb25zLmhhY2tzKSB7XG4gICAgICBfdmFsdWUgPSBvcHRpb25zLmhhY2tzLm92ZXJ3cml0ZURlY2xhcmF0aW9uKHJ1bGUsIG5hbWUsIF92YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIC8vIHNraXBwaW5nIEtleWZyYW1lc1J1bGVcbiAgICAgIF9zZWxlY3RvcnMucHVzaChydWxlLnNlbGVjdG9yVGV4dCk7XG4gICAgICBfdmFsdWUgPSBuYW1lICsgJzogJyArIF92YWx1ZSArICc7JztcbiAgICB9XG5cbiAgICB2YXIgX3J1bGUgPSBydWxlLnBhcmVudFJ1bGU7XG4gICAgd2hpbGUgKF9ydWxlKSB7XG4gICAgICBfc2VsZWN0b3JzLnVuc2hpZnQoJ0BtZWRpYSAnICsgX3J1bGUubWVkaWEubWVkaWFUZXh0KTtcbiAgICAgIF9ydWxlID0gX3J1bGUucGFyZW50UnVsZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0b3I6IF9zZWxlY3RvcnMsXG4gICAgICBjb250ZW50OiBfdmFsdWVcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZVZhbHVlcyhtYXRjaCwgbnVtYmVyLCB1bml0KSB7XG4gICAgdmFyIF9iYXNlID0gZGltZW5zaW9uc1t1bml0XTtcbiAgICB2YXIgX251bWJlciA9IHBhcnNlRmxvYXQobnVtYmVyKSAvIDEwMDtcbiAgICByZXR1cm4gKF9udW1iZXIgKiBfYmFzZSkgKyAncHgnO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Vmlld3BvcnQoKSB7XG4gICAgdmFyIHZoID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHZhciB2dyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZoOiB2aCxcbiAgICAgIHZ3OiB2dyxcbiAgICAgIHZtYXg6IE1hdGgubWF4KHZ3LCB2aCksXG4gICAgICB2bWluOiBNYXRoLm1pbih2dywgdmgpXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGltcG9ydENyb3NzT3JpZ2luTGlua3MobmV4dCkge1xuICAgIHZhciBfd2FpdGluZyA9IDA7XG4gICAgdmFyIGRlY3JlYXNlID0gZnVuY3Rpb24oKSB7XG4gICAgICBfd2FpdGluZy0tO1xuICAgICAgaWYgKCFfd2FpdGluZykge1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZvckVhY2guY2FsbChkb2N1bWVudC5zdHlsZVNoZWV0cywgZnVuY3Rpb24oc2hlZXQpIHtcbiAgICAgIGlmICghc2hlZXQuaHJlZiB8fCBvcmlnaW4oc2hlZXQuaHJlZikgPT09IG9yaWdpbihsb2NhdGlvbi5ocmVmKSB8fCBzaGVldC5vd25lck5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXZpZXdwb3J0LXVuaXRzLWJ1Z2d5ZmlsbCcpID09PSAnaWdub3JlJykge1xuICAgICAgICAvLyBza2lwIDxzdHlsZT4gYW5kIDxsaW5rPiBmcm9tIHNhbWUgb3JpZ2luIG9yIGV4cGxpY2l0bHkgZGVjbGFyZWQgdG8gaWdub3JlXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgX3dhaXRpbmcrKztcbiAgICAgIGNvbnZlcnRMaW5rVG9TdHlsZShzaGVldC5vd25lck5vZGUsIGRlY3JlYXNlKTtcbiAgICB9KTtcblxuICAgIGlmICghX3dhaXRpbmcpIHtcbiAgICAgIG5leHQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvcmlnaW4odXJsKSB7XG4gICAgcmV0dXJuIHVybC5zbGljZSgwLCB1cmwuaW5kZXhPZignLycsIHVybC5pbmRleE9mKCc6Ly8nKSArIDMpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRMaW5rVG9TdHlsZShsaW5rLCBuZXh0KSB7XG4gICAgZ2V0Q29ycyhsaW5rLmhyZWYsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlLm1lZGlhID0gbGluay5tZWRpYTtcbiAgICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnZGF0YS1ocmVmJywgbGluay5ocmVmKTtcbiAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gdGhpcy5yZXNwb25zZVRleHQ7XG4gICAgICBsaW5rLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHN0eWxlLCBsaW5rKTtcbiAgICAgIG5leHQoKTtcbiAgICB9LCBuZXh0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvcnModXJsLCBzdWNjZXNzLCBlcnJvcikge1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAvLyBYSFIgZm9yIENocm9tZS9GaXJlZm94L09wZXJhL1NhZmFyaS5cbiAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gWERvbWFpblJlcXVlc3QgZm9yIElFLlxuICAgICAgeGhyID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcm9zcy1kb21haW4gWEhSIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG5cbiAgICB4aHIub25sb2FkID0gc3VjY2VzcztcbiAgICB4aHIub25lcnJvciA9IGVycm9yO1xuICAgIHhoci5zZW5kKCk7XG4gICAgcmV0dXJuIHhocjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJzAuNS41JyxcbiAgICBmaW5kUHJvcGVydGllczogZmluZFByb3BlcnRpZXMsXG4gICAgZ2V0Q3NzOiBnZXRSZXBsYWNlZFZpZXdwb3J0VW5pdHMsXG4gICAgaW5pdDogaW5pdGlhbGl6ZSxcbiAgICByZWZyZXNoOiByZWZyZXNoXG4gIH07XG5cbn0pKTtcbiIsIi8qISBodHRwOi8vbXRocy5iZS9wbGFjZWhvbGRlciB2Mi4xLjEgYnkgQG1hdGhpYXMgKi9cbihmdW5jdGlvbihmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTURcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KGZ1bmN0aW9uKCQpIHtcblxuICAgIC8vIE9wZXJhIE1pbmkgdjcgZG9lc24ndCBzdXBwb3J0IHBsYWNlaG9sZGVyIGFsdGhvdWdoIGl0cyBET00gc2VlbXMgdG8gaW5kaWNhdGUgc29cbiAgICB2YXIgaXNPcGVyYU1pbmkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2luZG93Lm9wZXJhbWluaSkgPT0gJ1tvYmplY3QgT3BlcmFNaW5pXSc7XG4gICAgdmFyIGlzSW5wdXRTdXBwb3J0ZWQgPSAncGxhY2Vob2xkZXInIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykgJiYgIWlzT3BlcmFNaW5pO1xuICAgIHZhciBpc1RleHRhcmVhU3VwcG9ydGVkID0gJ3BsYWNlaG9sZGVyJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpICYmICFpc09wZXJhTWluaTtcbiAgICB2YXIgdmFsSG9va3MgPSAkLnZhbEhvb2tzO1xuICAgIHZhciBwcm9wSG9va3MgPSAkLnByb3BIb29rcztcbiAgICB2YXIgaG9va3M7XG4gICAgdmFyIHBsYWNlaG9sZGVyO1xuXG4gICAgaWYgKGlzSW5wdXRTdXBwb3J0ZWQgJiYgaXNUZXh0YXJlYVN1cHBvcnRlZCkge1xuXG4gICAgICAgIHBsYWNlaG9sZGVyID0gJC5mbi5wbGFjZWhvbGRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgcGxhY2Vob2xkZXIuaW5wdXQgPSBwbGFjZWhvbGRlci50ZXh0YXJlYSA9IHRydWU7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHZhciBzZXR0aW5ncyA9IHt9O1xuXG4gICAgICAgIHBsYWNlaG9sZGVyID0gJC5mbi5wbGFjZWhvbGRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgICAgICAgICAgdmFyIGRlZmF1bHRzID0ge2N1c3RvbUNsYXNzOiAncGxhY2Vob2xkZXInfTtcbiAgICAgICAgICAgIHNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgICAgICR0aGlzXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoaXNJbnB1dFN1cHBvcnRlZCA/ICd0ZXh0YXJlYScgOiAnOmlucHV0JykgKyAnW3BsYWNlaG9sZGVyXScpXG4gICAgICAgICAgICAgICAgLm5vdCgnLicrc2V0dGluZ3MuY3VzdG9tQ2xhc3MpXG4gICAgICAgICAgICAgICAgLmJpbmQoe1xuICAgICAgICAgICAgICAgICAgICAnZm9jdXMucGxhY2Vob2xkZXInOiBjbGVhclBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAnYmx1ci5wbGFjZWhvbGRlcic6IHNldFBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGF0YSgncGxhY2Vob2xkZXItZW5hYmxlZCcsIHRydWUpXG4gICAgICAgICAgICAgICAgLnRyaWdnZXIoJ2JsdXIucGxhY2Vob2xkZXInKTtcbiAgICAgICAgICAgIHJldHVybiAkdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICBwbGFjZWhvbGRlci5pbnB1dCA9IGlzSW5wdXRTdXBwb3J0ZWQ7XG4gICAgICAgIHBsYWNlaG9sZGVyLnRleHRhcmVhID0gaXNUZXh0YXJlYVN1cHBvcnRlZDtcblxuICAgICAgICBob29rcyA9IHtcbiAgICAgICAgICAgICdnZXQnOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHZhciAkcGFzc3dvcmRJbnB1dCA9ICRlbGVtZW50LmRhdGEoJ3BsYWNlaG9sZGVyLXBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRwYXNzd29yZElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkcGFzc3dvcmRJbnB1dFswXS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuZGF0YSgncGxhY2Vob2xkZXItZW5hYmxlZCcpICYmICRlbGVtZW50Lmhhc0NsYXNzKHNldHRpbmdzLmN1c3RvbUNsYXNzKSA/ICcnIDogZWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnc2V0JzogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgdmFyICRwYXNzd29yZElucHV0ID0gJGVsZW1lbnQuZGF0YSgncGxhY2Vob2xkZXItcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJHBhc3N3b3JkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRwYXNzd29yZElucHV0WzBdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCEkZWxlbWVudC5kYXRhKCdwbGFjZWhvbGRlci1lbmFibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIElzc3VlICM1NjogU2V0dGluZyB0aGUgcGxhY2Vob2xkZXIgY2F1c2VzIHByb2JsZW1zIGlmIHRoZSBlbGVtZW50IGNvbnRpbnVlcyB0byBoYXZlIGZvY3VzLlxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPSBzYWZlQWN0aXZlRWxlbWVudCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCB1c2UgYHRyaWdnZXJIYW5kbGVyYCBoZXJlIGJlY2F1c2Ugb2YgZHVtbXkgdGV4dC9wYXNzd29yZCBpbnB1dHMgOihcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFBsYWNlaG9sZGVyLmNhbGwoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRlbGVtZW50Lmhhc0NsYXNzKHNldHRpbmdzLmN1c3RvbUNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclBsYWNlaG9sZGVyLmNhbGwoZWxlbWVudCwgdHJ1ZSwgdmFsdWUpIHx8IChlbGVtZW50LnZhbHVlID0gdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gYHNldGAgY2FuIG5vdCByZXR1cm4gYHVuZGVmaW5lZGA7IHNlZSBodHRwOi8vanNhcGkuaW5mby9qcXVlcnkvMS43LjEvdmFsI0wyMzYzXG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghaXNJbnB1dFN1cHBvcnRlZCkge1xuICAgICAgICAgICAgdmFsSG9va3MuaW5wdXQgPSBob29rcztcbiAgICAgICAgICAgIHByb3BIb29rcy52YWx1ZSA9IGhvb2tzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNUZXh0YXJlYVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgdmFsSG9va3MudGV4dGFyZWEgPSBob29rcztcbiAgICAgICAgICAgIHByb3BIb29rcy52YWx1ZSA9IGhvb2tzO1xuICAgICAgICB9XG5cbiAgICAgICAgJChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIExvb2sgZm9yIGZvcm1zXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5kZWxlZ2F0ZSgnZm9ybScsICdzdWJtaXQucGxhY2Vob2xkZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBDbGVhciB0aGUgcGxhY2Vob2xkZXIgdmFsdWVzIHNvIHRoZXkgZG9uJ3QgZ2V0IHN1Ym1pdHRlZFxuICAgICAgICAgICAgICAgIHZhciAkaW5wdXRzID0gJCgnLicrc2V0dGluZ3MuY3VzdG9tQ2xhc3MsIHRoaXMpLmVhY2goY2xlYXJQbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0cy5lYWNoKHNldFBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ2xlYXIgcGxhY2Vob2xkZXIgdmFsdWVzIHVwb24gcGFnZSByZWxvYWRcbiAgICAgICAgJCh3aW5kb3cpLmJpbmQoJ2JlZm9yZXVubG9hZC5wbGFjZWhvbGRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnLicrc2V0dGluZ3MuY3VzdG9tQ2xhc3MpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXJncyhlbGVtKSB7XG4gICAgICAgIC8vIFJldHVybiBhbiBvYmplY3Qgb2YgZWxlbWVudCBhdHRyaWJ1dGVzXG4gICAgICAgIHZhciBuZXdBdHRycyA9IHt9O1xuICAgICAgICB2YXIgcmlubGluZWpRdWVyeSA9IC9ealF1ZXJ5XFxkKyQvO1xuICAgICAgICAkLmVhY2goZWxlbS5hdHRyaWJ1dGVzLCBmdW5jdGlvbihpLCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAoYXR0ci5zcGVjaWZpZWQgJiYgIXJpbmxpbmVqUXVlcnkudGVzdChhdHRyLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbmV3QXR0cnNbYXR0ci5uYW1lXSA9IGF0dHIudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3QXR0cnM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJQbGFjZWhvbGRlcihldmVudCwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gdGhpcztcbiAgICAgICAgdmFyICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgICAgICBpZiAoaW5wdXQudmFsdWUgPT0gJGlucHV0LmF0dHIoJ3BsYWNlaG9sZGVyJykgJiYgJGlucHV0Lmhhc0NsYXNzKHNldHRpbmdzLmN1c3RvbUNsYXNzKSkge1xuICAgICAgICAgICAgaWYgKCRpbnB1dC5kYXRhKCdwbGFjZWhvbGRlci1wYXNzd29yZCcpKSB7XG4gICAgICAgICAgICAgICAgJGlucHV0ID0gJGlucHV0LmhpZGUoKS5uZXh0QWxsKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl06Zmlyc3QnKS5zaG93KCkuYXR0cignaWQnLCAkaW5wdXQucmVtb3ZlQXR0cignaWQnKS5kYXRhKCdwbGFjZWhvbGRlci1pZCcpKTtcbiAgICAgICAgICAgICAgICAvLyBJZiBgY2xlYXJQbGFjZWhvbGRlcmAgd2FzIGNhbGxlZCBmcm9tIGAkLnZhbEhvb2tzLmlucHV0LnNldGBcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRpbnB1dFswXS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAkaW5wdXQucmVtb3ZlQ2xhc3Moc2V0dGluZ3MuY3VzdG9tQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGlucHV0ID09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgaW5wdXQuc2VsZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgdmFyICRyZXBsYWNlbWVudDtcbiAgICAgICAgdmFyIGlucHV0ID0gdGhpcztcbiAgICAgICAgdmFyICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgICAgICB2YXIgaWQgPSB0aGlzLmlkO1xuICAgICAgICBpZiAoaW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ3Bhc3N3b3JkJykge1xuICAgICAgICAgICAgICAgIGlmICghJGlucHV0LmRhdGEoJ3BsYWNlaG9sZGVyLXRleHRpbnB1dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVwbGFjZW1lbnQgPSAkaW5wdXQuY2xvbmUoKS5hdHRyKHsgJ3R5cGUnOiAndGV4dCcgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJlcGxhY2VtZW50ID0gJCgnPGlucHV0PicpLmF0dHIoJC5leHRlbmQoYXJncyh0aGlzKSwgeyAndHlwZSc6ICd0ZXh0JyB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJHJlcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignbmFtZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BsYWNlaG9sZGVyLXBhc3N3b3JkJzogJGlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwbGFjZWhvbGRlci1pZCc6IGlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmJpbmQoJ2ZvY3VzLnBsYWNlaG9sZGVyJywgY2xlYXJQbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwbGFjZWhvbGRlci10ZXh0aW5wdXQnOiAkcmVwbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BsYWNlaG9sZGVyLWlkJzogaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuYmVmb3JlKCRyZXBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRpbnB1dCA9ICRpbnB1dC5yZW1vdmVBdHRyKCdpZCcpLmhpZGUoKS5wcmV2QWxsKCdpbnB1dFt0eXBlPVwidGV4dFwiXTpmaXJzdCcpLmF0dHIoJ2lkJywgaWQpLnNob3coKTtcbiAgICAgICAgICAgICAgICAvLyBOb3RlOiBgJGlucHV0WzBdICE9IGlucHV0YCBub3chXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkaW5wdXQuYWRkQ2xhc3Moc2V0dGluZ3MuY3VzdG9tQ2xhc3MpO1xuICAgICAgICAgICAgJGlucHV0WzBdLnZhbHVlID0gJGlucHV0LmF0dHIoJ3BsYWNlaG9sZGVyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaW5wdXQucmVtb3ZlQ2xhc3Moc2V0dGluZ3MuY3VzdG9tQ2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2FmZUFjdGl2ZUVsZW1lbnQoKSB7XG4gICAgICAgIC8vIEF2b2lkIElFOSBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgb2YgZGVhdGhcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvanF1ZXJ5LXBsYWNlaG9sZGVyL3B1bGwvOTlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgfVxuXG59KSk7XG4iLCJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcblxuXHQvLyB2aWV3cG9ydHVuaXQgcG9seWZpbGxcblx0dmlld3BvcnRVbml0c0J1Z2d5ZmlsbC5pbml0KHtcblx0XHRoYWNrczogd2luZG93LnZpZXdwb3J0VW5pdHNCdWdneWZpbGxIYWNrc1xuXHR9KTtcblxuXHQvLyBnbG9iYWwgdmFyc1xuXHQkZG9jID0gJChkb2N1bWVudCksXG5cdCR3aW4gPSAkKHdpbmRvdyksXG5cdCRodG1sID0gJCgnaHRtbCcpLFxuXHQkYm9keSA9ICQoJ2JvZHknKSxcblx0JGh0bWxCb2R5ID0gJCgnaHRtbCwgYm9keScpLFxuXHRicmVha3BvaW50ID0ge1xuXHRcdCd4LXNtYWxsJzogICAzNTAsXG5cdFx0J3NtYWxsJzogICAgIDYwMCxcblx0XHQnbWVkaXVtJzogICAgODAwLFxuXHRcdCdsYXJnZSc6ICAgICAxMDAwLFxuXHRcdCd4LWxhcmdlJzogICAxNDAwLFxuXHRcdCd4eC1sYXJnZSc6ICAxODAwXG5cdH0sXG5cdGlzTW9iaWxlID0gZmFsc2U7XG5cblx0Ly8gc2ltcGxlIG1vYmlsZSBkZXRlY3Rpb25cblx0aWYgKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuXHRcdCRodG1sLmFkZENsYXNzKCdpcy1tb2JpbGUnKTtcblx0XHRpc01vYmlsZSA9IHRydWU7XG5cdH0gZWxzZSB7XG5cdFx0JGh0bWwuYWRkQ2xhc3MoJ2lzLWRlc2t0b3AnKTtcblx0XHRpc01vYmlsZSA9IGZhbHNlO1xuXHR9XG5cbn0pOyIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBNb2R1bGVcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbnZhciBNb2R1bGUgPSAoZnVuY3Rpb24oKSB7XG5cblx0dmFyIGVsZW1lbnQgPSB7fTtcblxuXHR2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG5cbn0pKCk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KE1vZHVsZS5pbml0KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
