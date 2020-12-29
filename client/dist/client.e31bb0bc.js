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
// const server = 'https://heroku-fancy-todo.herokuapp.com'
var server = 'http://localhost:3000';
$('#btn-home').on('click', function () {
  return home();
});
$('#btn-list').on('click', function () {
  return getAllTodo();
});
$(document).ready(function () {
  var token = localStorage.getItem("token"); // console.log(token)

  if (token) {
    $("#home-page").show();
    $("#add-todo").show();
    $("#sign-in-page").hide();
    $("#sign-up-page").hide();
    $("#edit-todo").hide();
    $("#show-todo").hide();
  } else {
    $("#home-page").hide();
    $("#sign-in-page").show();
    $("#sign-up-page").hide();
  }
});

function showSignUpForm() {
  $('#sign-up-page').show();
  $('#sign-in-page').hide();
}

function showSignInForm(e) {
  e.preventDefault();
  $("#sign-in-page").show();
  $("#sign-up-page").hide();
}

function saveFormSignUp(e) {
  e.preventDefault();
  var email = $('#sign-up-email').val();
  var password = $('#sign-up-password').val(); // console.log(email, password)

  $.ajax({
    method: "POST",
    url: server + "/register",
    data: {
      email: email,
      password: password
    }
  }).done(function (response) {
    $('#sign-up-page').hide();
    $('#sign-in-page').show();
  }).fail(function (err) {
    var responseJSON = err.responseJSON;
    Swal.fire({
      icon: 'error',
      title: "".concat(responseJSON.errMsg),
      showConfirmButton: false,
      timer: 2000
    });
  });
}

function saveFormSignIn(e) {
  e.preventDefault();
  var email = $('#sign-in-email').val();
  var password = $('#sign-in-password').val();
  $.ajax({
    method: "POST",
    url: server + "/login",
    data: {
      email: email,
      password: password
    }
  }).done(function (response) {
    Swal.fire({
      icon: 'success',
      title: 'Login successfully',
      showConfirmButton: false,
      timer: 1500
    });
    var token = response.access_token;
    localStorage.setItem("token", token);
    $('#home-page').show();
    $("#add-todo").show();
    $('#sign-up-page').hide();
    $('#sign-in-page').hide();
    $("#edit-todo").hide();
    $("#show-todo").hide();
  }).fail(function (err) {
    var responseJSON = err.responseJSON;
    Swal.fire({
      icon: 'error',
      title: "".concat(responseJSON.errMsg),
      showConfirmButton: false,
      timer: 2000
    });
  });
}

function saveFormTodo(e) {
  e.preventDefault();
  var title = $('#title').val();
  var description = $('#description').val();
  var due_date = $('#due_date').val();
  var token = localStorage.getItem("token");
  $.ajax({
    method: "POST",
    url: server + "/todos",
    headers: {
      token: token
    },
    data: {
      title: title,
      description: description,
      due_date: due_date
    }
  }).done(function (response) {
    Swal.fire({
      icon: 'success',
      title: 'Success add to your list',
      showConfirmButton: false,
      timer: 2000
    });
    getAllTodo();
  }).fail(function (err) {
    var responseJSON = err.responseJSON;
    Swal.fire({
      icon: 'error',
      title: "".concat(responseJSON.errMsg),
      showConfirmButton: false,
      timer: 2000
    });
  });
}

function signOutUser(e) {
  e.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  $('#home-page').hide();
  $('#sign-in-page').show();
  $('#login-form').trigger("reset");
}

function home() {
  $('#home-page').show();
  $('#add-todo').show();
  $('#add-form').trigger("reset");
  $('#edit-todo').hide();
  $('#show-todo').hide();
}

function convertDueDate(date) {
  var result = moment(new Date(date)).format("DD/MM/YYYY");
  return result;
}

function getAllTodo() {
  var token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: server + "/todos",
    headers: {
      token: token
    }
  }).done(function (response) {
    $('#show-todo').show();
    $('#add-todo').hide();
    $('#edit-todo').hide();
    $('#table-list').empty(); // $('#edit-todo').empty()

    response.forEach(function (element) {
      $('#table-list').append("\n            <tr>\n                <td>".concat(element.title, "</td>\n                <td>").concat(element.description, "</td>\n                <td>").concat(convertDueDate(element.due_date), "</td>\n                <td>").concat(element.status, "</td>\n                <td>\n                    <button class=\"btn btn-primary text-white mr-3\" onclick=\"showFormEdit(").concat(element.id, ")\"> Edit</button>\n                    <button class=\"btn btn-danger text-white mr-3\" onclick=\"deleteTodo(").concat(element.id, ")\"> Delete</button>\n                    <button class=\"btn btn-success text-white\" onclick=\"updateStatusTodo(").concat(element.id, ")\"> End Task</button>\n                </td>\n            </tr>"));
    });
  }).fail(function (err) {
    console.log(err);
  });
}

function showFormEdit(id) {
  $('#edit-form').empty();
  var token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: server + "/todos/".concat(id),
    headers: {
      token: token
    }
  }).done(function (response) {
    function convertDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }

    var newDate = convertDate(response.due_date);
    $('#edit-todo').show();
    $('#add-todo').hide();
    $('#show-todo').hide();
    $('#edit-form').append("<label for=\"title\">Title</label>\n        <input class=\"form-control\" type=\"text\" id=\"edit_title\" value=\"".concat(response.title, "\"><br>\n        <label for=\"description\">Description</label>\n        <input class=\"form-control\" type=\"text\" id=\"edit_description\" value=\"").concat(response.description, "\"><br>\n        <label for=\"due_date\">Due Date</label><br>\n        <input type=\"date\" id=\"edit_due_date\" value=\"").concat(newDate, "\"><br><br>\n        <button class=\"btn btn-primary btn-block\" type=\"submit\">Update</button>"));
    localStorage.setItem("id", response.id);
  }).fail(function (err) {
    console.log(err);
  });
}

function saveFormEdit(e) {
  e.preventDefault();
  var token = localStorage.getItem("token");
  var id = localStorage.getItem("id");
  var title = $('#edit_title').val();
  var description = $('#edit_description').val();
  var due_date = $('#edit_due_date').val();
  $.ajax({
    method: "PUT",
    url: server + "/todos/".concat(id),
    headers: {
      token: token
    },
    data: {
      title: title,
      description: description,
      due_date: due_date
    }
  }).done(function (response) {
    $('#edit-todo').hide();
    getAllTodo();
    var Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000
    });
    Toast.fire({
      icon: 'success',
      title: 'Edit success'
    });
  }).fail(function (err) {
    var responseJSON = err.responseJSON;
    Swal.fire({
      icon: 'error',
      title: "".concat(responseJSON.errMsg),
      showConfirmButton: false,
      timer: 2000
    });
  });
}

function updateStatusTodo(id) {
  var token = localStorage.getItem("token");
  $.ajax({
    method: "PATCH",
    url: server + "/todos/".concat(id),
    headers: {
      token: token
    },
    data: {
      status: "Done"
    }
  }).done(function (response) {
    getAllTodo();
    var Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000
    });
    Toast.fire({
      icon: 'success',
      title: 'Task status is updated'
    });
  }).fail(function (err) {
    console.log(err);
  });
}

function deleteTodo(id) {
  Swal.fire({
    title: 'Are you sure to delete this task ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(function (result) {
    if (result.isConfirmed) {
      var token = localStorage.getItem("token");
      $.ajax({
        method: "DELETE",
        url: server + "/todos/".concat(id),
        headers: {
          token: token
        }
      }).done(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Delete success',
          showConfirmButton: false,
          timer: 1500
        });
        getAllTodo();
      }).fail(function (err) {
        console.log(err);
      });
    }
  });
}

function onSignIn(googleUser) {
  var token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: server + '/login/google',
    data: {
      token: token
    }
  }).done(function (response) {
    var token = response.access_token;
    localStorage.setItem("token", token);
    $('#home-page').show();
    $("#add-todo").show();
    $('#sign-up-page').hide();
    $('#sign-in-page').hide();
    $("#edit-todo").hide();
    $("#show-todo").hide();
  }).fail(function (err) {
    console.log(err);
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function backToList() {
  $("edit-todo").hide();
  getAllTodo();
}
},{}],"../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36069" + '/');

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
},{}]},{},["../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/client.e31bb0bc.js.map