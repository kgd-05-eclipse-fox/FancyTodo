// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
var SERVER = 'http://localhost:3000'; // Login Alert

var Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: function didOpen(toast) {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
}); // Google Sign In

function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token);
  $.ajax({
    method: 'POST',
    url: "http://localhost:3000/loginGoogle",
    data: {
      google_access_token: google_access_token
    }
  }).done(function (response) {
    console.log(response);
    var access_token = response.access_token;
    localStorage.setItem('access_token', access_token);
    $('#allTodos').show();
    $('#content_navbar').show();
    $('#login_page').hide();
    $('#landing_navbar').hide();
    $('#nowPlayingMovie').hide(); //ngosongin isi form after login

    $('#email_login').val('');
    $('#password_login').val('');
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    }); // viewMovies()

    getAllTodo();
  }).fail(function (err) {
    Swal.fire('Error!', err.responseJSON.msg, 'ERROR');
  });
}

function logout() {
  // Logout untuk Semua!
  Toast.fire({
    icon: 'success',
    title: 'Logout in successfully'
  });
  loginPage();
  localStorage.clear(); // Google Signout di Taruh disini!

  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

$(document).ready(function () {
  var access_token = localStorage.getItem('access_token');

  if (access_token) {
    todos();
    getAllTodo();
  } else {
    loginPage();
  }
});

function loginPage() {
  $('#login_page').show();
  $('#landing_navbar').show();
  $('#register').hide();
  $('#allTodos').hide();
  $('#homepage_navbar').hide();
  $('#nowPlayingMovie').hide();
}

function login(e) {
  e.preventDefault();
  var email = $('#email').val();
  var password = $('#password').val();
  $.ajax({
    method: 'POST',
    url: "".concat(SERVER, "/login"),
    data: {
      email: email,
      password: password
    }
  }).done(function (response) {
    var access_token = response.access_token;
    localStorage.setItem('access_token', access_token);
    $('#allTodos').show();
    $('#homepage_navbar').show();
    $('#login_page').hide();
    $('#landing_navbar').hide();
    $('#tes').hide(); //ngosongin isi form after login

    $('#email_login').val('');
    $('#password_login').val('');
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    });
    todos();
  }).fail(function (err) {
    Swal.fire('Error!', err.responseJSON.msg, 'ERROR');
  });
}

function registerPage() {
  $('#login_page').hide();
  $('#landing_navbar').show();
  $('#register').show();
  $('#allTodos').hide();
  $('#homepage_navbar').hide();
  $('#nowPlayingMovie').hide();
}

function register(e) {
  e.preventDefault();
  var email = $('#email_register').val();
  var password = $('#password_register').val();
  $.ajax({
    method: 'POST',
    url: "".concat(SERVER, "/register"),
    data: {
      email: email,
      password: password
    }
  }).done(function (response) {
    Toast.fire({
      icon: 'success',
      title: 'Registered in successfully'
    });
    loginPage();
  }).fail(function (err) {
    Swal.fire('Error!', err.responseJSON.msg, 'ERROR');
  });
}

function formAdd() {
  $('#formadd').show();
  $('#login_page').hide();
  $('#register').hide();
  $('#allTodos').hide();
  $('#homepage_navbar').show();
  $('#nowPlayingMovie').hide();
  $('#getAllTodo').hide();
  $('#buttonid').hide();
  $('#filetodos').hide();
}

function addTodo() {
  var token = localStorage.getItem('access_token');
  var title = $("#title-todo").val();
  var description = $("#description-todo").val();
  var status = $("#status-todo").val();
  var date = $("#date-todo").val();
  $.ajax({
    method: "POST",
    url: SERVER + "/todos",
    headers: {
      token: token
    },
    data: {
      title: title,
      description: description,
      date: date,
      status: status
    }
  }).done(function (response) {
    todos();
    getAllTodo();
  }).fail(function (err) {
    console.log(err);
  });
}

function todos() {
  $('#login_page').hide();
  $('#landing_navbar').hide();
  $('#register').hide();
  $('#allTodos').hide();
  $('#nowPlayingMovie').hide();
  $('#formadd').hide();
  $('#buttonid').hide();
  $('#filetodos').show();
}

function getAllTodo() {
  var token = localStorage.getItem('access_token');
  $.ajax({
    method: 'GET',
    url: "".concat(SERVER, "/todos"),
    headers: {
      token: token
    }
  }).done(function (response) {
    $('#filetodos').empty();
    response.forEach(function (element) {
      $("#filetodos").append("\n          <div class = \"row justify-content-center\"><br><br>\n          <div class=\"card\" style =\"width : 80rem; margin = 20 20\">\n            <div class=\"card-header\">\n            TODO\n            </div>\n            <div class=\"card-body style =\"width : 100rem\">\n            <h5 class=\"card-title\">".concat(element.title, "</h5>\n                <p class=\"card-text\">").concat(element.description, ".</p>\n                <a href=\"#\" class=\"btn btn-primary\">Detail</a>\n                <a href=\"#\" onclick = \"formAdd()\" class=\"btn btn-danger\">Delete</a>\n\n            </div>\n            </div>"));
    });
  }).fail(function (err) {
    console.log(err);
  });
}

function detail(id) {
  $("#tanggal".concat(id)).show();
}

function selectTodo(id, e) {
  e.preventDefault();
  oneTodo(id, e);
  $('#login_page').hide();
  $('#landing_navbar').hide();
  $('#register').hide();
  $('#allTodos').hide();
  $('#homepage_navbar').show();
  $('#nowPlayingMovie').hide();
}

function movies() {
  $('#login_page').hide();
  $('#landing_navbar').hide();
  $('#register').hide();
  $('#allMovies').show();
  $('#homepage_navbar').show();
}

function listPlaying() {
  $('#login_page').hide();
  $('#landing_navbar').hide();
  $('#register').hide();
  $('#allTodos').hide();
  $('#homepage_navbar').show();
  $('#nowPlayingMovie').show();
  $('#buttonid').hide();
  $('#formadd').hide();
  $('#buttonid').hide();
  $('#filetodos').hide();
}

function viewAllMovies() {
  $("#listmovie").html("");
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "GET",
    datatype: "json",
    data: {
      "apikey": "16c6c427",
      "s": $("#carijudul").val()
    },
    success: function success(result) {
      var movie = result.Search;

      if (result.Response === "True") {
        $.each(movie, function (i, data) {
          $("#listmovie").append("\n            <div class = \"col col-md-4 mb-3\">\n              <div class=\"card\">\n                <img src=\"" + data.Poster + "\" class=\"card-img-top\"  alt=\"...\">\n                <div class=\"card-body\">\n                  <h5 class=\"card-title\">" + data.Title + "</h5>\n                  <h6 class=\"card-subtitle mb-2 text-muted\">" + data.Year + "</h6>\n                  <a href=\"#\" class=\"btn btn-primary lihatdetail\" data-toggle=\"modal\" \n                  data-target=\"#exampleModal\" data-id=\"" + data.imdbID + "\">detail</a>\n                </div>\n              </div>\n            </div>\n          ");
        });
      } else {
        $("#listmovie").html("\n        <div class=\"col\">\n          <h3 class = \"text-center\">" + result.Error + "</h3>");
      }
    }
  });
}

$("#tombolcari").on("click", function () {
  viewAllMovies();
});
$("#carijudul").on("keyup", function (e) {
  if (e.keyCode == 13) {
    viewAllMovies();
  }
});
$("#listmovie").on("click", ".lihatdetail", function () {
  var idmovie = $(this).data('id');
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "GET",
    datatype: "json",
    data: {
      "apikey": "16c6c427",
      "i": idmovie
    },
    success: function success(result) {
      if (result.Response === "True") {
        $(".modal-title").html("");
        $(".modal-title").html(result.Title);
        $(".modal-body").html("\n          <div class =\"container-fluid\">\n            <div class=\"row\">\n            <div class=\"col-md-4\">\n              <img src=\"" + result.Poster + "\" class =\"img-fluid\">\n            </div>\n            <div class =\"col-md-8>\n              <ul class=\"list-group\">\n                <li class=\"list-group-item\">Year : " + result.Year + "</li>\n                <li class=\"list-group-item\">Released : " + result.Released + "</li>\n                <li class=\"list-group-item\">Genre : " + result.Genre + "</li>\n                <li class=\"list-group-item\">Actors : " + result.Actors + "</li>\n                <li class=\"list-group-item\">Plot : " + result.Plot + "</li>\n            </ul>\n            </div>\n          </div>\n        </div>\n        ");
      }
    }
  });
});
},{}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53723" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map