/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/LoginController.js":
/*!************************************!*\
  !*** ./src/api/LoginController.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const send = __webpack_require__(/*! ../config/MailConfig.js */ \"./src/config/MailConfig.js\");\n\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nconst moment = __webpack_require__(/*! moment */ \"moment\");\n\nconst jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nconst config = __webpack_require__(/*! ../config/index */ \"./src/config/index.js\");\n\nconst checkCode = __webpack_require__(/*! ../common/Utils */ \"./src/common/Utils.js\");\n\nconst User = __webpack_require__(/*! ../model/User */ \"./src/model/User.js\");\n\nconst forget = function (ctx) {\n  const {\n    body\n  } = ctx.request;\n  console.log(body);\n\n  try {\n    let result = send({\n      code: '1234',\n      expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),\n      email: body.username,\n      user: 'echo'\n    });\n    ctx.body = {\n      code: 200,\n      data: result,\n      msg: '邮件发送成功'\n    };\n  } catch (e) {\n    console.log(e);\n  }\n};\n\nasync function login(ctx) {\n  const {\n    body\n  } = ctx.request;\n  let sid = body.sid;\n  let code = body.code;\n  let result = await checkCode(sid, code);\n  console.log(result);\n\n  if (result) {\n    let checkUserPasswd = false;\n    let user = await User.findOne({\n      username: body.username\n    });\n\n    if (await bcrypt.compare(body.password, user.password)) {\n      checkUserPasswd = true;\n    }\n\n    if (checkUserPasswd) {\n      console.log('Hello login');\n      let token = jsonwebtoken.sign({\n        _id: 'echo',\n        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24\n      }, config.JWT_SECRET);\n      ctx.body = {\n        code: 200,\n        token: token\n      };\n    } else {\n      ctx.body = {\n        code: 404,\n        msg: '用户名或密码错误'\n      };\n    }\n  } else {\n    ctx.body = {\n      code: 401,\n      msg: '图片验证码不正确，请检查！'\n    };\n  }\n}\n\nasync function reg(ctx) {\n  const {\n    body\n  } = ctx.request;\n  let sid = body.sid;\n  let code = body.code;\n  let msg = {};\n  let result = await checkCode(sid, code);\n  console.log(\"result:\" + result);\n  let check = true;\n\n  if (result) {\n    let user1 = await User.findOne({\n      username: body.username\n    });\n\n    if (user1 !== null && typeof user1.username !== 'undefined') {\n      console.log(\"user1\" + user1);\n      msg.username = ['此邮箱已经被注册，可以通过邮箱找回密码'];\n      check = false;\n    }\n\n    let user2 = await User.findOne({\n      name: body.name\n    });\n\n    if (user2 !== null && typeof user2.name !== 'undefined') {\n      msg.name = ['此昵称已经被注册，请修改'];\n      check = false;\n    }\n\n    if (check) {\n      body.password = await bcrypt.hash(body.password, 5);\n      let user = new User({\n        username: body.username,\n        name: body.name,\n        password: body.password,\n        created: moment().format('YYYY-MM-DD HH:mm:ss')\n      });\n      let result = await user.save();\n      ctx.body = {\n        code: 200,\n        data: result,\n        msg: '注册成功'\n      };\n      return;\n    }\n  } else {\n    msg.code = ['验证码已经失效，请重新获取！'];\n  }\n\n  ctx.body = {\n    code: 500,\n    msg: msg\n  };\n}\n\nmodule.exports = {\n  forget,\n  login,\n  reg\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBpL0xvZ2luQ29udHJvbGxlci5qcz85NTA3Il0sIm5hbWVzIjpbInNlbmQiLCJyZXF1aXJlIiwiYmNyeXB0IiwibW9tZW50IiwianNvbndlYnRva2VuIiwiY29uZmlnIiwiY2hlY2tDb2RlIiwiVXNlciIsImZvcmdldCIsImN0eCIsImJvZHkiLCJyZXF1ZXN0IiwiY29uc29sZSIsImxvZyIsInJlc3VsdCIsImNvZGUiLCJleHBpcmUiLCJhZGQiLCJmb3JtYXQiLCJlbWFpbCIsInVzZXJuYW1lIiwidXNlciIsImRhdGEiLCJtc2ciLCJlIiwibG9naW4iLCJzaWQiLCJjaGVja1VzZXJQYXNzd2QiLCJmaW5kT25lIiwiY29tcGFyZSIsInBhc3N3b3JkIiwidG9rZW4iLCJzaWduIiwiX2lkIiwiZXhwIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsIm5vdyIsIkpXVF9TRUNSRVQiLCJyZWciLCJjaGVjayIsInVzZXIxIiwidXNlcjIiLCJuYW1lIiwiaGFzaCIsImNyZWF0ZWQiLCJzYXZlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsSUFBSSxHQUFDQyxtQkFBTyxDQUFDLDJEQUFELENBQWxCOztBQUNBLE1BQU1DLE1BQU0sR0FBQ0QsbUJBQU8sQ0FBQyxzQkFBRCxDQUFwQjs7QUFDQSxNQUFNRSxNQUFNLEdBQUNGLG1CQUFPLENBQUMsc0JBQUQsQ0FBcEI7O0FBQ0EsTUFBTUcsWUFBWSxHQUFDSCxtQkFBTyxDQUFDLGtDQUFELENBQTFCOztBQUNBLE1BQU1JLE1BQU0sR0FBQ0osbUJBQU8sQ0FBQyw4Q0FBRCxDQUFwQjs7QUFDQSxNQUFNSyxTQUFTLEdBQUNMLG1CQUFPLENBQUMsOENBQUQsQ0FBdkI7O0FBQ0EsTUFBTU0sSUFBSSxHQUFDTixtQkFBTyxDQUFDLDBDQUFELENBQWxCOztBQUVBLE1BQU1PLE1BQU0sR0FBQyxVQUFTQyxHQUFULEVBQWE7QUFDdEIsUUFBTTtBQUFDQztBQUFELE1BQU9E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TUFBTU8sSUFBSSxDQUFDMEIsSUFBTCxFQUFuQjtBQUNBdEMsU0FBRyxDQUFDQyxJQUFKLEdBQVc7QUFDUEssWUFBSSxFQUFFLEdBREM7QUFFUE8sWUFBSSxFQUFFUixNQUZDO0FBR1BTLFdBQUcsRUFBRTtBQUhFLE9BQVg7QUFLQTtBQUNIO0FBQ0osR0E1QkQsTUE0Qk87QUFDRkEsT0FBRyxDQUFDUixJQUFKLEdBQVMsQ0FBQyxnQkFBRCxDQUFUO0FBQ0o7O0FBQ0ROLEtBQUcsQ0FBQ0MsSUFBSixHQUFXO0FBQ1BLLFFBQUksRUFBRSxHQURDO0FBRVBRLE9BQUcsRUFBRUE7QUFGRSxHQUFYO0FBSUg7O0FBRUR5QixNQUFNLENBQUNDLE9BQVAsR0FBZ0I7QUFBQ3pDLFFBQUQ7QUFBUWlCLE9BQVI7QUFBZWU7QUFBZixDQUFoQiIsImZpbGUiOiIuL3NyYy9hcGkvTG9naW5Db250cm9sbGVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2VuZD1yZXF1aXJlKCcuLi9jb25maWcvTWFpbENvbmZpZy5qcycpXG5jb25zdCBiY3J5cHQ9cmVxdWlyZSgnYmNyeXB0JylcbmNvbnN0IG1vbWVudD1yZXF1aXJlKCdtb21lbnQnKVxuY29uc3QganNvbndlYnRva2VuPXJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpXG5jb25zdCBjb25maWc9cmVxdWlyZSgnLi4vY29uZmlnL2luZGV4JylcbmNvbnN0IGNoZWNrQ29kZT1yZXF1aXJlKCcuLi9jb21tb24vVXRpbHMnKVxuY29uc3QgVXNlcj1yZXF1aXJlKCcuLi9tb2RlbC9Vc2VyJylcblxuY29uc3QgZm9yZ2V0PWZ1bmN0aW9uKGN0eCl7XG4gICAgY29uc3Qge2JvZHl9PWN0eC5yZXF1ZXN0XG4gICAgY29uc29sZS5sb2coYm9keSlcbiAgICB0cnl7XG4gICAgICAgIGxldCByZXN1bHQ9c2VuZCh7XG4gICAgICAgICAgICBjb2RlOicxMjM0JyxcbiAgICAgICAgICAgIGV4cGlyZTptb21lbnQoKS5hZGQoMzAsJ21pbnV0ZXMnKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbiAgICAgICAgICAgIGVtYWlsOmJvZHkudXNlcm5hbWUsXG4gICAgICAgICAgICB1c2VyOidlY2hvJyxcbiAgICAgICAgfSlcbiAgICAgICAgY3R4LmJvZHk9e1xuICAgICAgICAgICAgY29kZToyMDAsXG4gICAgICAgICAgICBkYXRhOnJlc3VsdCxcbiAgICAgICAgICAgIG1zZzon6YKu5Lu25Y+R6YCB5oiQ5YqfJ1xuICAgICAgICB9XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICB9XG59XG5hc3luYyBmdW5jdGlvbiBsb2dpbiAoY3R4KSB7XG4gICAgY29uc3Qge2JvZHl9ID1jdHgucmVxdWVzdFxuICAgIGxldCBzaWQ9Ym9keS5zaWRcbiAgICBsZXQgY29kZT1ib2R5LmNvZGVcbiAgICBsZXQgcmVzdWx0PWF3YWl0IGNoZWNrQ29kZShzaWQsY29kZSlcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgaWYocmVzdWx0KSB7XG4gICAgICAgIGxldCBjaGVja1VzZXJQYXNzd2Q9ZmFsc2VcbiAgICAgICAgbGV0IHVzZXI9YXdhaXQgVXNlci5maW5kT25lKHt1c2VybmFtZTpib2R5LnVzZXJuYW1lfSlcbiAgICAgICAgaWYoYXdhaXQgYmNyeXB0LmNvbXBhcmUoYm9keS5wYXNzd29yZCx1c2VyLnBhc3N3b3JkKSl7XG4gICAgICAgICAgICBjaGVja1VzZXJQYXNzd2Q9dHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja1VzZXJQYXNzd2QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWxsbyBsb2dpbicpXG4gICAgICAgICAgICBsZXQgdG9rZW49anNvbndlYnRva2VuLnNpZ24oe19pZDonZWNobycsZXhwOk1hdGguZmxvb3IoRGF0ZS5ub3coKS8xMDAwKSs2MCo2MCoyNH0sY29uZmlnLkpXVF9TRUNSRVQpXG4gICAgICAgICAgICBjdHguYm9keT17XG4gICAgICAgICAgICAgICAgY29kZToyMDAsXG4gICAgICAgICAgICAgICAgdG9rZW46dG9rZW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICAgICAgICAgIGNvZGU6IDQwNCxcbiAgICAgICAgICAgICAgICBtc2c6ICfnlKjmiLflkI3miJblr4bnoIHplJnor68nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICAgICAgY29kZTogNDAxLFxuICAgICAgICAgICAgbXNnOiAn5Zu+54mH6aqM6K+B56CB5LiN5q2j56Gu77yM6K+35qOA5p+l77yBJ1xuICAgICAgICB9XG4gICAgfSAgXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZyhjdHgpIHtcbiAgICBjb25zdCB7IGJvZHkgfSA9IGN0eC5yZXF1ZXN0XG4gICAgbGV0IHNpZCA9IGJvZHkuc2lkXG4gICAgbGV0IGNvZGUgPSBib2R5LmNvZGVcbiAgICBsZXQgbXNnID0ge31cbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY2hlY2tDb2RlKHNpZCxjb2RlKVxuICAgIGNvbnNvbGUubG9nKFwicmVzdWx0OlwiK3Jlc3VsdClcbiAgICBsZXQgY2hlY2sgPSB0cnVlXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBsZXQgdXNlcjEgPSBhd2FpdCBVc2VyLmZpbmRPbmUoe3VzZXJuYW1lOmJvZHkudXNlcm5hbWV9KVxuICAgICAgICBpZiAodXNlcjEhPT1udWxsICYmIHR5cGVvZiB1c2VyMS51c2VybmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlcjFcIit1c2VyMSlcbiAgICAgICAgICAgIG1zZy51c2VybmFtZSA9IFsn5q2k6YKu566x5bey57uP6KKr5rOo5YaM77yM5Y+v5Lul6YCa6L+H6YKu566x5om+5Zue5a+G56CBJ11cbiAgICAgICAgICAgIGNoZWNrID0gZmFsc2VcbiAgICAgICAgfSBcbiAgICAgICAgbGV0IHVzZXIyID0gYXdhaXQgVXNlci5maW5kT25lKHtuYW1lOmJvZHkubmFtZX0pXG4gICAgICAgIGlmKHVzZXIyIT09bnVsbCAmJiB0eXBlb2YgdXNlcjIubmFtZSE9PSd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBtc2cubmFtZSA9IFsn5q2k5pi156ew5bey57uP6KKr5rOo5YaM77yM6K+35L+u5pS5J11cbiAgICAgICAgICAgIGNoZWNrID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgIGJvZHkucGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChib2R5LnBhc3N3b3JkLCA1KVxuICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcih7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IGJvZHkudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgbmFtZTogYm9keS5uYW1lLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBib2R5LnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHVzZXIuc2F2ZSgpXG4gICAgICAgICAgICBjdHguYm9keSA9IHtcbiAgICAgICAgICAgICAgICBjb2RlOiAyMDAsXG4gICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICAgICAgICAgIG1zZzogJ+azqOWGjOaIkOWKnydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgIG1zZy5jb2RlPVsn6aqM6K+B56CB5bey57uP5aSx5pWI77yM6K+36YeN5paw6I635Y+W77yBJ11cbiAgICB9XG4gICAgY3R4LmJvZHkgPSB7XG4gICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgbXNnOiBtc2dcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzPSB7Zm9yZ2V0LGxvZ2luLCByZWd9Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/api/LoginController.js\n");

/***/ }),

/***/ "./src/api/PublicController.js":
/*!*************************************!*\
  !*** ./src/api/PublicController.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const svgCaptcha = __webpack_require__(/*! svg-captcha */ \"svg-captcha\");\n\nconst redisConfig = __webpack_require__(/*! ../config/RedisConfig */ \"./src/config/RedisConfig.js\"); // const redisConfig=require('@/config/RedisConfig')\n// import svgCaptcha from 'svg-captcha'     es6\n// class PublicController{\n//     constructor() {}\n//     async getCaptcha(ctx) {\n//         const body = ctx.request.query\n//         console.log(body.sid)\n//         const newCaptcha=svgCaptcha.create({\n//             size: 4,\n//             ignoreChars: '0olil',\n//             color: true,\n//             noise: Math.floor(Math.random() * 5),\n//             width: 150,\n//             height: 50\n//         })\n//         // console.log(newCaptcha)\n//         ctx.body={\n//             code: 200,\n//             data: newCaptcha.data,\n//         }\n//     }\n// }\n\n\nmodule.exports = function (ctx) {\n  const body = ctx.request.query;\n  console.log(body.sid);\n  const newCaptcha = svgCaptcha.create({\n    size: 4,\n    ignoreChars: '0olil',\n    color: true,\n    noise: Math.floor(Math.random() * 5),\n    width: 150,\n    height: 50\n  }); // console.log(newCaptcha)\n\n  redisConfig.setValue(body.sid, newCaptcha.text, 10 * 60); //save for 10m\n  // redisConfig.getValue(body.sid).then((res) => {\n  //     console.log(res)\n  // })\n\n  ctx.body = {\n    code: 200,\n    data: newCaptcha.data\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBpL1B1YmxpY0NvbnRyb2xsZXIuanM/NjhhZSJdLCJuYW1lcyI6WyJzdmdDYXB0Y2hhIiwicmVxdWlyZSIsInJlZGlzQ29uZmlnIiwibW9kdWxlIiwiZXhwb3J0cyIsImN0eCIsImJvZHkiLCJyZXF1ZXN0IiwicXVlcnkiLCJjb25zb2xlIiwibG9nIiwic2lkIiwibmV3Q2FwdGNoYSIsImNyZWF0ZSIsInNpemUiLCJpZ25vcmVDaGFycyIsImNvbG9yIiwibm9pc2UiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ3aWR0aCIsImhlaWdodCIsInNldFZhbHVlIiwidGV4dCIsImNvZGUiLCJkYXRhIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxVQUFVLEdBQUNDLG1CQUFPLENBQUMsZ0NBQUQsQ0FBeEI7O0FBQ0EsTUFBTUMsV0FBVyxHQUFDRCxtQkFBTyxDQUFDLDBEQUFELENBQXpCLEMsQ0FDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFlLFVBQVNDLEdBQVQsRUFBYTtBQUN4QixRQUFNQyxJQUFJLEdBQUdELEdBQUcsQ0FBQ0UsT0FBSixDQUFZQyxLQUF6QjtBQUNBQyxTQUFPLENBQUNDLEdBQVIsQ0FBWUosSUFBSSxDQUFDSyxHQUFqQjtBQUNBLFFBQU1DLFVBQVUsR0FBQ1osVUFBVSxDQUFDYSxNQUFYLENBQWtCO0FBQy9CQyxRQUFJLEVBQUUsQ0FEeUI7QUFFL0JDLGVBQVcsRUFBRSxPQUZrQjtBQUcvQkMsU0FBSyxFQUFFLElBSHdCO0FBSS9CQyxTQUFLLEVBQUVDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsQ0FBM0IsQ0FKd0I7QUFLL0JDLFNBQUssRUFBRSxHQUx3QjtBQU0vQkMsVUFBTSxFQUFFO0FBTnVCLEdBQWxCLENBQWpCLENBSHdCLENBV3hCOztBQUNBcEIsYUFBVyxDQUFDcUIsUUFBWixDQUFxQmpCLElBQUksQ0FBQ0ssR0FBMUIsRUFBK0JDLFVBQVUsQ0FBQ1ksSUFBMUMsRUFBK0MsS0FBSyxFQUFwRCxFQVp3QixDQVlnQztBQUN4RDtBQUNBO0FBQ0E7O0FBQ0FuQixLQUFHLENBQUNDLElBQUosR0FBUztBQUNMbUIsUUFBSSxFQUFDLEdBREE7QUFFTEMsUUFBSSxFQUFDZCxVQUFVLENBQUNjO0FBRlgsR0FBVDtBQUlILENBcEJEIiwiZmlsZSI6Ii4vc3JjL2FwaS9QdWJsaWNDb250cm9sbGVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3ZnQ2FwdGNoYT1yZXF1aXJlKCdzdmctY2FwdGNoYScpXG5jb25zdCByZWRpc0NvbmZpZz1yZXF1aXJlKCcuLi9jb25maWcvUmVkaXNDb25maWcnKVxuLy8gY29uc3QgcmVkaXNDb25maWc9cmVxdWlyZSgnQC9jb25maWcvUmVkaXNDb25maWcnKVxuLy8gaW1wb3J0IHN2Z0NhcHRjaGEgZnJvbSAnc3ZnLWNhcHRjaGEnICAgICBlczZcblxuXG4vLyBjbGFzcyBQdWJsaWNDb250cm9sbGVye1xuLy8gICAgIGNvbnN0cnVjdG9yKCkge31cbi8vICAgICBhc3luYyBnZXRDYXB0Y2hhKGN0eCkge1xuLy8gICAgICAgICBjb25zdCBib2R5ID0gY3R4LnJlcXVlc3QucXVlcnlcbi8vICAgICAgICAgY29uc29sZS5sb2coYm9keS5zaWQpXG4vLyAgICAgICAgIGNvbnN0IG5ld0NhcHRjaGE9c3ZnQ2FwdGNoYS5jcmVhdGUoe1xuLy8gICAgICAgICAgICAgc2l6ZTogNCxcbi8vICAgICAgICAgICAgIGlnbm9yZUNoYXJzOiAnMG9saWwnLFxuLy8gICAgICAgICAgICAgY29sb3I6IHRydWUsXG4vLyAgICAgICAgICAgICBub2lzZTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSksXG4vLyAgICAgICAgICAgICB3aWR0aDogMTUwLFxuLy8gICAgICAgICAgICAgaGVpZ2h0OiA1MFxuLy8gICAgICAgICB9KVxuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdDYXB0Y2hhKVxuLy8gICAgICAgICBjdHguYm9keT17XG4vLyAgICAgICAgICAgICBjb2RlOiAyMDAsXG4vLyAgICAgICAgICAgICBkYXRhOiBuZXdDYXB0Y2hhLmRhdGEsXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5tb2R1bGUuZXhwb3J0cz1mdW5jdGlvbihjdHgpe1xuICAgIGNvbnN0IGJvZHkgPSBjdHgucmVxdWVzdC5xdWVyeVxuICAgIGNvbnNvbGUubG9nKGJvZHkuc2lkKVxuICAgIGNvbnN0IG5ld0NhcHRjaGE9c3ZnQ2FwdGNoYS5jcmVhdGUoe1xuICAgICAgICBzaXplOiA0LFxuICAgICAgICBpZ25vcmVDaGFyczogJzBvbGlsJyxcbiAgICAgICAgY29sb3I6IHRydWUsXG4gICAgICAgIG5vaXNlOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSxcbiAgICAgICAgd2lkdGg6IDE1MCxcbiAgICAgICAgaGVpZ2h0OiA1MFxuICAgIH0pXG4gICAgLy8gY29uc29sZS5sb2cobmV3Q2FwdGNoYSlcbiAgICByZWRpc0NvbmZpZy5zZXRWYWx1ZShib2R5LnNpZCwgbmV3Q2FwdGNoYS50ZXh0LDEwICogNjApIC8vc2F2ZSBmb3IgMTBtXG4gICAgLy8gcmVkaXNDb25maWcuZ2V0VmFsdWUoYm9keS5zaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgLy8gfSlcbiAgICBjdHguYm9keT17XG4gICAgICAgIGNvZGU6MjAwLFxuICAgICAgICBkYXRhOm5ld0NhcHRjaGEuZGF0YSxcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/api/PublicController.js\n");

/***/ }),

/***/ "./src/common/ErrorHandle.js":
/*!***********************************!*\
  !*** ./src/common/ErrorHandle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (ctx, next) => {\n  return next().catch(err => {\n    if (401 == err.status) {\n      ctx.status = 401;\n      ctx.body = {\n        code: 401,\n        msg: 'Protected resource,use Authorization header to get access\\n'\n      };\n    } else {\n      ctx.status = err.status || 500;\n      ctx.body = Object.assign({\n        code: 500,\n        msg: err.message\n      },  true ? {\n        stack: err.statck\n      } : undefined);\n    }\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL0Vycm9ySGFuZGxlLmpzPzQxZWIiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImN0eCIsIm5leHQiLCJjYXRjaCIsImVyciIsInN0YXR1cyIsImJvZHkiLCJjb2RlIiwibXNnIiwiT2JqZWN0IiwiYXNzaWduIiwibWVzc2FnZSIsInByb2Nlc3MiLCJzdGFjayIsInN0YXRjayJdLCJtYXBwaW5ncyI6IkFBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFnQixDQUFDQyxHQUFELEVBQUtDLElBQUwsS0FBYztBQUMxQixTQUFPQSxJQUFJLEdBQUdDLEtBQVAsQ0FBY0MsR0FBRCxJQUFPO0FBQ3ZCLFFBQUcsT0FBS0EsR0FBRyxDQUFDQyxNQUFaLEVBQW9CO0FBQ2hCSixTQUFHLENBQUNJLE1BQUosR0FBVyxHQUFYO0FBQ0FKLFNBQUcsQ0FBQ0ssSUFBSixHQUFTO0FBQ0xDLFlBQUksRUFBQyxHQURBO0FBRUxDLFdBQUcsRUFBQztBQUZDLE9BQVQ7QUFJSCxLQU5ELE1BTU87QUFDSFAsU0FBRyxDQUFDSSxNQUFKLEdBQWFELEdBQUcsQ0FBQ0MsTUFBSixJQUFjLEdBQTNCO0FBQ0FKLFNBQUcsQ0FBQ0ssSUFBSixHQUFXRyxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUNyQkgsWUFBSSxFQUFFLEdBRGU7QUFFckJDLFdBQUcsRUFBRUosR0FBRyxDQUFDTztBQUZZLE9BQWQsRUFHVEMsS0FBQSxHQUFxQztBQUFDQyxhQUFLLEVBQUNULEdBQUcsQ0FBQ1U7QUFBWCxPQUFyQyxHQUF3RCxTQUgvQyxDQUFYO0FBSUg7QUFDSixHQWRNLENBQVA7QUFlSCxDQWhCRCIsImZpbGUiOiIuL3NyYy9jb21tb24vRXJyb3JIYW5kbGUuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cz0gKGN0eCxuZXh0KSA9PiB7XG4gICAgcmV0dXJuIG5leHQoKS5jYXRjaCgoZXJyKT0+e1xuICAgICAgICBpZig0MDE9PWVyci5zdGF0dXMpIHtcbiAgICAgICAgICAgIGN0eC5zdGF0dXM9NDAxO1xuICAgICAgICAgICAgY3R4LmJvZHk9e1xuICAgICAgICAgICAgICAgIGNvZGU6NDAxLFxuICAgICAgICAgICAgICAgIG1zZzonUHJvdGVjdGVkIHJlc291cmNlLHVzZSBBdXRob3JpemF0aW9uIGhlYWRlciB0byBnZXQgYWNjZXNzXFxuJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LnN0YXR1cyA9IGVyci5zdGF0dXMgfHwgNTAwXG4gICAgICAgICAgICBjdHguYm9keSA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgICAgICAgICBtc2c6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICB9LHByb2Nlc3MuZW52Lk5PREVfRU5WPT09J2RldmVsb3BtZW50Jz97c3RhY2s6ZXJyLnN0YXRja306e30pXG4gICAgICAgIH1cbiAgICB9KTtcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/common/ErrorHandle.js\n");

/***/ }),

/***/ "./src/common/Utils.js":
/*!*****************************!*\
  !*** ./src/common/Utils.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const redisConfig = __webpack_require__(/*! ../config/RedisConfig */ \"./src/config/RedisConfig.js\");\n\nconst checkCode = async (key, value) => {\n  const redisData = await redisConfig.getValue(key);\n\n  if (redisData != null) {\n    debugger;\n\n    if (redisData.toLowerCase() === value.toLowerCase()) {\n      return true;\n    } else {\n      return false;\n    }\n  } else {\n    return false;\n  }\n};\n\nmodule.exports = checkCode;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL1V0aWxzLmpzP2I0ZGYiXSwibmFtZXMiOlsicmVkaXNDb25maWciLCJyZXF1aXJlIiwiY2hlY2tDb2RlIiwia2V5IiwidmFsdWUiLCJyZWRpc0RhdGEiLCJnZXRWYWx1ZSIsInRvTG93ZXJDYXNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsV0FBVyxHQUFDQyxtQkFBTyxDQUFDLDBEQUFELENBQXpCOztBQUVBLE1BQU1DLFNBQVMsR0FBQyxPQUFNQyxHQUFOLEVBQVVDLEtBQVYsS0FBb0I7QUFDaEMsUUFBTUMsU0FBUyxHQUFFLE1BQU1MLFdBQVcsQ0FBQ00sUUFBWixDQUFxQkgsR0FBckIsQ0FBdkI7O0FBQ0EsTUFBR0UsU0FBUyxJQUFFLElBQWQsRUFBbUI7QUFDZjs7QUFDQSxRQUFHQSxTQUFTLENBQUNFLFdBQVYsT0FBNEJILEtBQUssQ0FBQ0csV0FBTixFQUEvQixFQUFtRDtBQUMvQyxhQUFPLElBQVA7QUFDSCxLQUZELE1BRU87QUFDSCxhQUFPLEtBQVA7QUFDSDtBQUNKLEdBUEQsTUFPTztBQUNILFdBQU8sS0FBUDtBQUNIO0FBQ0osQ0FaRDs7QUFjQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWVQLFNBQWYiLCJmaWxlIjoiLi9zcmMvY29tbW9uL1V0aWxzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmVkaXNDb25maWc9cmVxdWlyZSgnLi4vY29uZmlnL1JlZGlzQ29uZmlnJylcblxuY29uc3QgY2hlY2tDb2RlPWFzeW5jKGtleSx2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHJlZGlzRGF0YT0gYXdhaXQgcmVkaXNDb25maWcuZ2V0VmFsdWUoa2V5KVxuICAgIGlmKHJlZGlzRGF0YSE9bnVsbCl7XG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGlmKHJlZGlzRGF0YS50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZS50b0xvd2VyQ2FzZSgpKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzPWNoZWNrQ29kZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/common/Utils.js\n");

/***/ }),

/***/ "./src/config/DBHelper.js":
/*!********************************!*\
  !*** ./src/config/DBHelper.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\"); // const config = require('./index')\n\n\nconst DB_URL = 'mongodb://echo:123456@47.99.202.255:27018/testdb';\nconst REDIS = {\n  host: '47.99.202.255',\n  port: 27017,\n  password: '123456'\n};\nmongoose.connect(DB_URL, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n});\nmongoose.connection.on('connected', () => {\n  console.log('Mongoose connection open to ' + DB_URL);\n});\nmongoose.connection.on('error', err => {\n  console.log('Mongoose connection error: ' + err);\n});\nmongoose.connection.on('disconnected', () => {\n  console.log('Mongoose connection disconnected');\n});\nmodule.exports = mongoose;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL0RCSGVscGVyLmpzPzJhNGIiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJyZXF1aXJlIiwiREJfVVJMIiwiUkVESVMiLCJob3N0IiwicG9ydCIsInBhc3N3b3JkIiwiY29ubmVjdCIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsImNvbm5lY3Rpb24iLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxRQUFRLEdBQUdDLG1CQUFPLENBQUMsMEJBQUQsQ0FBeEIsQyxDQUNBOzs7QUFHQSxNQUFNQyxNQUFNLEdBQUMsa0RBQWI7QUFDQSxNQUFNQyxLQUFLLEdBQUc7QUFDVkMsTUFBSSxFQUFFLGVBREk7QUFFVkMsTUFBSSxFQUFFLEtBRkk7QUFHVkMsVUFBUSxFQUFFO0FBSEEsQ0FBZDtBQU1BTixRQUFRLENBQUNPLE9BQVQsQ0FBaUJMLE1BQWpCLEVBQXdCO0FBQ3BCTSxpQkFBZSxFQUFFLElBREc7QUFFcEJDLG9CQUFrQixFQUFFO0FBRkEsQ0FBeEI7QUFLQVQsUUFBUSxDQUFDVSxVQUFULENBQW9CQyxFQUFwQixDQUF1QixXQUF2QixFQUFvQyxNQUFNO0FBQ3RDQyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxpQ0FBK0JYLE1BQTNDO0FBQ0gsQ0FGRDtBQUlBRixRQUFRLENBQUNVLFVBQVQsQ0FBb0JDLEVBQXBCLENBQXVCLE9BQXZCLEVBQWlDRyxHQUFELElBQVM7QUFDckNGLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGdDQUE4QkMsR0FBMUM7QUFDSCxDQUZEO0FBSUFkLFFBQVEsQ0FBQ1UsVUFBVCxDQUFvQkMsRUFBcEIsQ0FBdUIsY0FBdkIsRUFBdUMsTUFBTTtBQUN6Q0MsU0FBTyxDQUFDQyxHQUFSLENBQVksa0NBQVo7QUFDSCxDQUZEO0FBSUFFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFlaEIsUUFBZiIsImZpbGUiOiIuL3NyYy9jb25maWcvREJIZWxwZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJylcbi8vIGNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4vaW5kZXgnKVxuXG5cbmNvbnN0IERCX1VSTD0nbW9uZ29kYjovL2VjaG86MTIzNDU2QDQ3Ljk5LjIwMi4yNTU6MjcwMTgvdGVzdGRiJ1xuY29uc3QgUkVESVMgPSB7XG4gICAgaG9zdDogJzQ3Ljk5LjIwMi4yNTUnLFxuICAgIHBvcnQ6IDI3MDE3LFxuICAgIHBhc3N3b3JkOiAnMTIzNDU2J1xufVxuXG5tb25nb29zZS5jb25uZWN0KERCX1VSTCx7XG4gICAgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLFxuICAgIHVzZVVuaWZpZWRUb3BvbG9neTogdHJ1ZVxufSlcblxubW9uZ29vc2UuY29ubmVjdGlvbi5vbignY29ubmVjdGVkJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdNb25nb29zZSBjb25uZWN0aW9uIG9wZW4gdG8gJytEQl9VUkwpO1xufSlcblxubW9uZ29vc2UuY29ubmVjdGlvbi5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ01vbmdvb3NlIGNvbm5lY3Rpb24gZXJyb3I6ICcrZXJyKTtcbn0pXG5cbm1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Rpc2Nvbm5lY3RlZCcsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnTW9uZ29vc2UgY29ubmVjdGlvbiBkaXNjb25uZWN0ZWQnKVxufSlcblxubW9kdWxlLmV4cG9ydHM9bW9uZ29vc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/config/DBHelper.js\n");

/***/ }),

/***/ "./src/config/MailConfig.js":
/*!**********************************!*\
  !*** ./src/config/MailConfig.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n\nconst config = __webpack_require__(/*! ./index */ \"./src/config/index.js\");\n\nconst qs = __webpack_require__(/*! qs */ \"qs\"); // async..await is not allowed in global scope, must use a wrapper\n\n\nasync function send(sendInfo) {\n  // Generate test SMTP service account from ethereal.email\n  // Only needed if you don't have a real mail account for testing\n  // let testAccount = await nodemailer.createTestAccount()\n  // create reusable transporter object using the default SMTP transport\n  const transporter = nodemailer.createTransport({\n    host: 'smtp.163.com',\n    port: 465,\n    secure: true,\n    // true for 465, false for other ports\n    auth: {\n      user: 'leedawnm@163.com',\n      // generated ethereal user\n      pass: '93thing51' // generated ethereal password\n\n    }\n  }); // let sendInfo = {\n  //   code: '1234',\n  //   expire: '2019-10-01',\n  //   email: 'imoocbrian@qq.com',\n  //   user: 'Brian',\n  // }\n\n  const baseUrl = config.baseUrl;\n  const route = sendInfo.type === 'email' ? '/confirm' : '/reset';\n  const url = `${baseUrl}/#${route}?` + qs.stringify(sendInfo.data); // send mail with defined transport object\n\n  const info = await transporter.sendMail({\n    from: '\"认证邮件\" <leedawnm@163.com>',\n    // sender address\n    to: sendInfo.email,\n    // list of receivers\n    subject: sendInfo.user !== '' && sendInfo.type !== 'email' ? `你好开发者，${sendInfo.user}！《慕课网前端全栈实践》注册码` : '《慕课网前端全栈实践》确认修改邮件链接',\n    // Subject line\n    text: `您在《慕课网前端全栈实践》课程中注册，您的邀请码是${sendInfo.code},邀请码的过期时间: ${sendInfo.expire}`,\n    // plain text body\n    html: `\n  \n        <div style=\"border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;\">\n        <div style=\"height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;\">Imooc社区——欢迎来到官方社区</div>\n        <div style=\"padding: 25px\">\n          <div>您好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${sendInfo.expire}之前${sendInfo.code ? '重置您的密码' : '修改您的邮箱为：' + sendInfo.data.username}：</div>\n          <a href=\"${url}\" style=\"padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;\">${sendInfo.code ? '立即重置密码' : '确认设置邮箱'}</a>\n          <div style=\"padding: 5px; background: #f2f2f2;\">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>\n        </div>\n        <div style=\"background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;\">系统邮件，请勿直接回复</div>\n    </div>\n    ` // html body\n\n  });\n  return `Message sent: %s, ${info.messageId}`; // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>\n  // Preview only available when sending through an Ethereal account\n  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))\n  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...\n} // main().catch(console.error)\n\n\nmodule.exports = send;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL01haWxDb25maWcuanM/MmRiMSJdLCJuYW1lcyI6WyJub2RlbWFpbGVyIiwicmVxdWlyZSIsImNvbmZpZyIsInFzIiwic2VuZCIsInNlbmRJbmZvIiwidHJhbnNwb3J0ZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJob3N0IiwicG9ydCIsInNlY3VyZSIsImF1dGgiLCJ1c2VyIiwicGFzcyIsImJhc2VVcmwiLCJyb3V0ZSIsInR5cGUiLCJ1cmwiLCJzdHJpbmdpZnkiLCJkYXRhIiwiaW5mbyIsInNlbmRNYWlsIiwiZnJvbSIsInRvIiwiZW1haWwiLCJzdWJqZWN0IiwidGV4dCIsImNvZGUiLCJleHBpcmUiLCJodG1sIiwidXNlcm5hbWUiLCJtZXNzYWdlSWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxVQUFVLEdBQUNDLG1CQUFPLENBQUMsOEJBQUQsQ0FBeEI7O0FBQ0EsTUFBTUMsTUFBTSxHQUFDRCxtQkFBTyxDQUFDLHNDQUFELENBQXBCOztBQUNBLE1BQU1FLEVBQUUsR0FBQ0YsbUJBQU8sQ0FBQyxjQUFELENBQWhCLEMsQ0FFQTs7O0FBQ0EsZUFBZUcsSUFBZixDQUFxQkMsUUFBckIsRUFBK0I7QUFDN0I7QUFDQTtBQUNBO0FBRUE7QUFDQSxRQUFNQyxXQUFXLEdBQUdOLFVBQVUsQ0FBQ08sZUFBWCxDQUEyQjtBQUM3Q0MsUUFBSSxFQUFFLGNBRHVDO0FBRTdDQyxRQUFJLEVBQUUsR0FGdUM7QUFHN0NDLFVBQU0sRUFBRSxJQUhxQztBQUcvQjtBQUNkQyxRQUFJLEVBQUU7QUFDSkMsVUFBSSxFQUFFLGtCQURGO0FBQ3NCO0FBQzFCQyxVQUFJLEVBQUUsV0FGRixDQUVjOztBQUZkO0FBSnVDLEdBQTNCLENBQXBCLENBTjZCLENBZ0I3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsUUFBTUMsT0FBTyxHQUFHWixNQUFNLENBQUNZLE9BQXZCO0FBQ0EsUUFBTUMsS0FBSyxHQUFHVixRQUFRLENBQUNXLElBQVQsS0FBa0IsT0FBbEIsR0FBNEIsVUFBNUIsR0FBeUMsUUFBdkQ7QUFDQSxRQUFNQyxHQUFHLEdBQUksR0FBRUgsT0FBUSxLQUFJQyxLQUFNLEdBQXJCLEdBQTBCWixFQUFFLENBQUNlLFNBQUgsQ0FBYWIsUUFBUSxDQUFDYyxJQUF0QixDQUF0QyxDQXhCNkIsQ0EwQjdCOztBQUNBLFFBQU1DLElBQUksR0FBRyxNQUFNZCxXQUFXLENBQUNlLFFBQVosQ0FBcUI7QUFDdENDLFFBQUksRUFBRSwyQkFEZ0M7QUFDSDtBQUNuQ0MsTUFBRSxFQUFFbEIsUUFBUSxDQUFDbUIsS0FGeUI7QUFFbEI7QUFDcEJDLFdBQU8sRUFDTHBCLFFBQVEsQ0FBQ08sSUFBVCxLQUFrQixFQUFsQixJQUF3QlAsUUFBUSxDQUFDVyxJQUFULEtBQWlCLE9BQXpDLEdBQ0ssU0FBUVgsUUFBUSxDQUFDTyxJQUFLLGlCQUQzQixHQUVJLHFCQU5nQztBQU1UO0FBQzdCYyxRQUFJLEVBQUcsNEJBQ0xyQixRQUFRLENBQUNzQixJQUNSLGNBQWF0QixRQUFRLENBQUN1QixNQUFPLEVBVE07QUFTSDtBQUNuQ0MsUUFBSSxFQUFHOzs7OztvQkFLU3hCLFFBQVEsQ0FBQ08sSUFBSyxxQkFDNUJQLFFBQVEsQ0FBQ3VCLE1BQ1IsS0FBSXZCLFFBQVEsQ0FBQ3NCLElBQVQsR0FBZ0IsUUFBaEIsR0FBMkIsYUFBYXRCLFFBQVEsQ0FBQ2MsSUFBVCxDQUFjVyxRQUFTO3FCQUNyRGIsR0FBSSx5R0FBd0daLFFBQVEsQ0FBQ3NCLElBQVQsR0FBZ0IsUUFBaEIsR0FBMkIsUUFBUzs7Ozs7S0FsQjNILENBdUJwQzs7QUF2Qm9DLEdBQXJCLENBQW5CO0FBMEJBLFNBQVEscUJBQW9CUCxJQUFJLENBQUNXLFNBQVUsRUFBM0MsQ0FyRDZCLENBc0Q3QjtBQUVBO0FBQ0E7QUFDQTtBQUNELEMsQ0FFRDs7O0FBRUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFnQjdCLElBQWhCIiwiZmlsZSI6Ii4vc3JjL2NvbmZpZy9NYWlsQ29uZmlnLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgbm9kZW1haWxlcj1yZXF1aXJlKCdub2RlbWFpbGVyJylcbmNvbnN0IGNvbmZpZz1yZXF1aXJlKCcuL2luZGV4JylcbmNvbnN0IHFzPXJlcXVpcmUoJ3FzJylcblxuLy8gYXN5bmMuLmF3YWl0IGlzIG5vdCBhbGxvd2VkIGluIGdsb2JhbCBzY29wZSwgbXVzdCB1c2UgYSB3cmFwcGVyXG5hc3luYyBmdW5jdGlvbiBzZW5kIChzZW5kSW5mbykge1xuICAvLyBHZW5lcmF0ZSB0ZXN0IFNNVFAgc2VydmljZSBhY2NvdW50IGZyb20gZXRoZXJlYWwuZW1haWxcbiAgLy8gT25seSBuZWVkZWQgaWYgeW91IGRvbid0IGhhdmUgYSByZWFsIG1haWwgYWNjb3VudCBmb3IgdGVzdGluZ1xuICAvLyBsZXQgdGVzdEFjY291bnQgPSBhd2FpdCBub2RlbWFpbGVyLmNyZWF0ZVRlc3RBY2NvdW50KClcblxuICAvLyBjcmVhdGUgcmV1c2FibGUgdHJhbnNwb3J0ZXIgb2JqZWN0IHVzaW5nIHRoZSBkZWZhdWx0IFNNVFAgdHJhbnNwb3J0XG4gIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgIGhvc3Q6ICdzbXRwLjE2My5jb20nLFxuICAgIHBvcnQ6IDQ2NSxcbiAgICBzZWN1cmU6IHRydWUsIC8vIHRydWUgZm9yIDQ2NSwgZmFsc2UgZm9yIG90aGVyIHBvcnRzXG4gICAgYXV0aDoge1xuICAgICAgdXNlcjogJ2xlZWRhd25tQDE2My5jb20nLCAvLyBnZW5lcmF0ZWQgZXRoZXJlYWwgdXNlclxuICAgICAgcGFzczogJzkzdGhpbmc1MScgLy8gZ2VuZXJhdGVkIGV0aGVyZWFsIHBhc3N3b3JkXG4gICAgfVxuICB9KVxuXG4gIC8vIGxldCBzZW5kSW5mbyA9IHtcbiAgLy8gICBjb2RlOiAnMTIzNCcsXG4gIC8vICAgZXhwaXJlOiAnMjAxOS0xMC0wMScsXG4gIC8vICAgZW1haWw6ICdpbW9vY2JyaWFuQHFxLmNvbScsXG4gIC8vICAgdXNlcjogJ0JyaWFuJyxcbiAgLy8gfVxuICBjb25zdCBiYXNlVXJsID0gY29uZmlnLmJhc2VVcmxcbiAgY29uc3Qgcm91dGUgPSBzZW5kSW5mby50eXBlID09PSAnZW1haWwnID8gJy9jb25maXJtJyA6ICcvcmVzZXQnXG4gIGNvbnN0IHVybCA9IGAke2Jhc2VVcmx9LyMke3JvdXRlfT9gICsgcXMuc3RyaW5naWZ5KHNlbmRJbmZvLmRhdGEpXG5cbiAgLy8gc2VuZCBtYWlsIHdpdGggZGVmaW5lZCB0cmFuc3BvcnQgb2JqZWN0XG4gIGNvbnN0IGluZm8gPSBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbCh7XG4gICAgZnJvbTogJ1wi6K6k6K+B6YKu5Lu2XCIgPGxlZWRhd25tQDE2My5jb20+JywgLy8gc2VuZGVyIGFkZHJlc3NcbiAgICB0bzogc2VuZEluZm8uZW1haWwsIC8vIGxpc3Qgb2YgcmVjZWl2ZXJzXG4gICAgc3ViamVjdDpcbiAgICAgIHNlbmRJbmZvLnVzZXIgIT09ICcnICYmIHNlbmRJbmZvLnR5cGUgIT09J2VtYWlsJ1xuICAgICAgICA/IGDkvaDlpb3lvIDlj5HogIXvvIwke3NlbmRJbmZvLnVzZXJ977yB44CK5oWV6K++572R5YmN56uv5YWo5qCI5a6e6Le144CL5rOo5YaM56CBYFxuICAgICAgICA6ICfjgIrmhZXor77nvZHliY3nq6/lhajmoIjlrp7ot7XjgIvnoa7orqTkv67mlLnpgq7ku7bpk77mjqUnLCAvLyBTdWJqZWN0IGxpbmVcbiAgICB0ZXh0OiBg5oKo5Zyo44CK5oWV6K++572R5YmN56uv5YWo5qCI5a6e6Le144CL6K++56iL5Lit5rOo5YaM77yM5oKo55qE6YKA6K+356CB5pivJHtcbiAgICAgIHNlbmRJbmZvLmNvZGVcbiAgICAgIH0s6YKA6K+356CB55qE6L+H5pyf5pe26Ze0OiAke3NlbmRJbmZvLmV4cGlyZX1gLCAvLyBwbGFpbiB0ZXh0IGJvZHlcbiAgICBodG1sOiBgXG4gIFxuICAgICAgICA8ZGl2IHN0eWxlPVwiYm9yZGVyOiAxcHggc29saWQgI2RjZGNkYztjb2xvcjogIzY3Njc2Nzt3aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvOyBwYWRkaW5nLWJvdHRvbTogNTBweDtwb3NpdGlvbjogcmVsYXRpdmU7XCI+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDYwcHg7IGJhY2tncm91bmQ6ICMzOTNkNDk7IGxpbmUtaGVpZ2h0OiA2MHB4OyBjb2xvcjogIzU4YTM2ZjsgZm9udC1zaXplOiAxOHB4O3BhZGRpbmctbGVmdDogMTBweDtcIj5JbW9vY+ekvuWMuuKAlOKAlOasoui/juadpeWIsOWumOaWueekvuWMujwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZzogMjVweFwiPlxuICAgICAgICAgIDxkaXY+5oKo5aW977yMJHtzZW5kSW5mby51c2Vyfeerpemei++8jOmHjee9rumTvuaOpeacieaViOaXtumXtDMw5YiG6ZKf77yM6K+35ZyoJHtcbiAgICAgIHNlbmRJbmZvLmV4cGlyZVxuICAgICAgfeS5i+WJjSR7c2VuZEluZm8uY29kZSA/ICfph43nva7mgqjnmoTlr4bnoIEnIDogJ+S/ruaUueaCqOeahOmCrueuseS4uu+8micgKyBzZW5kSW5mby5kYXRhLnVzZXJuYW1lfe+8mjwvZGl2PlxuICAgICAgICAgIDxhIGhyZWY9XCIke3VybH1cIiBzdHlsZT1cInBhZGRpbmc6IDEwcHggMjBweDsgY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6ICMwMDllOTQ7IGRpc3BsYXk6IGlubGluZS1ibG9jazttYXJnaW46IDE1cHggMDtcIj4ke3NlbmRJbmZvLmNvZGUgPyAn56uL5Y2z6YeN572u5a+G56CBJyA6ICfnoa7orqTorr7nva7pgq7nrrEnfTwvYT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZzogNXB4OyBiYWNrZ3JvdW5kOiAjZjJmMmYyO1wiPuWmguaenOivpemCruS7tuS4jeaYr+eUseS9oOacrOS6uuaTjeS9nO+8jOivt+WLv+i/m+ihjOa/gOa0u++8geWQpuWImeS9oOeahOmCrueuseWwhuS8muiiq+S7luS6uue7keWumuOAgjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6ICNmYWZhZmE7IGNvbG9yOiAjYjRiNGI0O3RleHQtYWxpZ246IGNlbnRlcjsgbGluZS1oZWlnaHQ6IDQ1cHg7IGhlaWdodDogNDVweDsgcG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAwOyBib3R0b206IDA7d2lkdGg6IDEwMCU7XCI+57O757uf6YKu5Lu277yM6K+35Yu/55u05o6l5Zue5aSNPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYCAvLyBodG1sIGJvZHlcbiAgfSlcblxuICByZXR1cm4gYE1lc3NhZ2Ugc2VudDogJXMsICR7aW5mby5tZXNzYWdlSWR9YFxuICAvLyBNZXNzYWdlIHNlbnQ6IDxiNjU4ZjhjYS02Mjk2LWNjZjQtODMwNi04N2Q1N2EwYjQzMjFAZXhhbXBsZS5jb20+XG5cbiAgLy8gUHJldmlldyBvbmx5IGF2YWlsYWJsZSB3aGVuIHNlbmRpbmcgdGhyb3VnaCBhbiBFdGhlcmVhbCBhY2NvdW50XG4gIC8vIGNvbnNvbGUubG9nKCdQcmV2aWV3IFVSTDogJXMnLCBub2RlbWFpbGVyLmdldFRlc3RNZXNzYWdlVXJsKGluZm8pKVxuICAvLyBQcmV2aWV3IFVSTDogaHR0cHM6Ly9ldGhlcmVhbC5lbWFpbC9tZXNzYWdlL1dhUUtNZ0tkZHhRRG9vdS4uLlxufVxuXG4vLyBtYWluKCkuY2F0Y2goY29uc29sZS5lcnJvcilcblxubW9kdWxlLmV4cG9ydHM9IHNlbmRcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/MailConfig.js\n");

/***/ }),

/***/ "./src/config/RedisConfig.js":
/*!***********************************!*\
  !*** ./src/config/RedisConfig.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// for es5: const => var\nconst redis = __webpack_require__(/*! redis */ \"redis\"); // import redis from 'redis'\n// const config = require(\"./index\")\n\n\nvar Promise = __webpack_require__(/*! bluebird */ \"bluebird\");\n\nvar DB_URL = 'mongodb://test:123456@47.99.202.255:15001/testdb';\nvar REDIS = {\n  host: '47.99.202.255',\n  port: 15001,\n  password: '123456'\n};\nvar options = {\n  host: REDIS.host,\n  port: REDIS.port,\n  password: REDIS.password,\n  detect_buffers: true,\n  retry_strategy: function (options) {\n    if (options.error && options.error.code === 'ECONNREFUSED') {\n      return new Error('The server refused the connection');\n    }\n\n    if (options.total_retry_time > 1000 * 60 * 60) {\n      return new Error('Retry time exhausted');\n    }\n\n    if (options.attempt > 10) {\n      return undefined;\n    }\n\n    return Math.min(options.attempt * 100, 3000);\n  }\n};\nconst client = Promise.promisifyAll(redis.createClient(options)); // const client = redis.createClient(options)\n\nclient.on('error', function (err) {\n  console.log('Redis Client Error:' + err);\n});\n\nfunction setValue(key, value, time) {\n  if (typeof value === 'undefined' || value == null || value === '') {\n    return;\n  }\n\n  if (typeof value === 'string') {\n    if (typeof time !== 'undefined') {\n      client.set(key, value, 'EX', time);\n    } else {\n      client.set(key, value);\n    }\n  } else if (typeof value === 'object') {\n    Object.keys(value).forEach(item => {\n      client.hset(key, item, value[item], redis.print);\n    });\n  }\n} // setValue('id','24')\n\n\nfunction getValue(key) {\n  return client.getAsync(key);\n}\n\nvar getHValue = key => {\n  return client.hgetallAsync(key);\n};\n\nvar delValue = key => {\n  client.del(key, (err, res) => {\n    if (res === 1) {\n      console.log('delete successfully');\n    } else {\n      console.log('delete redis key error:' + err);\n    }\n  });\n}; // export {\n//     client,\n//     setValue,\n//     getValue,\n//     getHValue,\n//     delValue\n// }\n\n\nmodule.exports = {\n  client,\n  setValue,\n  getValue,\n  getHValue,\n  delValue\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL1JlZGlzQ29uZmlnLmpzP2I3ODkiXSwibmFtZXMiOlsicmVkaXMiLCJyZXF1aXJlIiwiUHJvbWlzZSIsIkRCX1VSTCIsIlJFRElTIiwiaG9zdCIsInBvcnQiLCJwYXNzd29yZCIsIm9wdGlvbnMiLCJkZXRlY3RfYnVmZmVycyIsInJldHJ5X3N0cmF0ZWd5IiwiZXJyb3IiLCJjb2RlIiwiRXJyb3IiLCJ0b3RhbF9yZXRyeV90aW1lIiwiYXR0ZW1wdCIsInVuZGVmaW5lZCIsIk1hdGgiLCJtaW4iLCJjbGllbnQiLCJwcm9taXNpZnlBbGwiLCJjcmVhdGVDbGllbnQiLCJvbiIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJzZXRWYWx1ZSIsImtleSIsInZhbHVlIiwidGltZSIsInNldCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiaXRlbSIsImhzZXQiLCJwcmludCIsImdldFZhbHVlIiwiZ2V0QXN5bmMiLCJnZXRIVmFsdWUiLCJoZ2V0YWxsQXN5bmMiLCJkZWxWYWx1ZSIsImRlbCIsInJlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBO0FBRUEsTUFBTUEsS0FBSyxHQUFHQyxtQkFBTyxDQUFDLG9CQUFELENBQXJCLEMsQ0FDQTtBQUNBOzs7QUFDQSxJQUFJQyxPQUFPLEdBQUdELG1CQUFPLENBQUMsMEJBQUQsQ0FBckI7O0FBRUEsSUFBSUUsTUFBTSxHQUFDLGtEQUFYO0FBQ0EsSUFBSUMsS0FBSyxHQUFHO0FBQ1JDLE1BQUksRUFBRSxlQURFO0FBRVJDLE1BQUksRUFBRSxLQUZFO0FBR1JDLFVBQVEsRUFBRTtBQUhGLENBQVo7QUFNQSxJQUFJQyxPQUFPLEdBQUc7QUFDVkgsTUFBSSxFQUFFRCxLQUFLLENBQUNDLElBREY7QUFFVkMsTUFBSSxFQUFFRixLQUFLLENBQUNFLElBRkY7QUFHVkMsVUFBUSxFQUFFSCxLQUFLLENBQUNHLFFBSE47QUFJVkUsZ0JBQWMsRUFBRSxJQUpOO0FBS1ZD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ZiIsImZpbGUiOiIuL3NyYy9jb25maWcvUmVkaXNDb25maWcuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBmb3IgZXM1OiBjb25zdCA9PiB2YXJcblxuY29uc3QgcmVkaXMgPSByZXF1aXJlKFwicmVkaXNcIilcbi8vIGltcG9ydCByZWRpcyBmcm9tICdyZWRpcydcbi8vIGNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoXCIuL2luZGV4XCIpXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJylcblxudmFyIERCX1VSTD0nbW9uZ29kYjovL3Rlc3Q6MTIzNDU2QDQ3Ljk5LjIwMi4yNTU6MTUwMDEvdGVzdGRiJ1xudmFyIFJFRElTID0ge1xuICAgIGhvc3Q6ICc0Ny45OS4yMDIuMjU1JyxcbiAgICBwb3J0OiAxNTAwMSxcbiAgICBwYXNzd29yZDogJzEyMzQ1Nidcbn1cblxudmFyIG9wdGlvbnMgPSB7XG4gICAgaG9zdDogUkVESVMuaG9zdCxcbiAgICBwb3J0OiBSRURJUy5wb3J0LFxuICAgIHBhc3N3b3JkOiBSRURJUy5wYXNzd29yZCxcbiAgICBkZXRlY3RfYnVmZmVyczogdHJ1ZSxcbiAgICByZXRyeV9zdHJhdGVneTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZXJyb3IgJiYgb3B0aW9ucy5lcnJvci5jb2RlID09PSAnRUNPTk5SRUZVU0VEJykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignVGhlIHNlcnZlciByZWZ1c2VkIHRoZSBjb25uZWN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMudG90YWxfcmV0cnlfdGltZSA+IDEwMDAgKiA2MCAqIDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdSZXRyeSB0aW1lIGV4aGF1c3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmF0dGVtcHQgPiAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0aC5taW4ob3B0aW9ucy5hdHRlbXB0ICogMTAwLCAzMDAwKTtcbiAgICB9XG59XG5cbmNvbnN0IGNsaWVudCA9IFByb21pc2UucHJvbWlzaWZ5QWxsKHJlZGlzLmNyZWF0ZUNsaWVudChvcHRpb25zKSlcbi8vIGNvbnN0IGNsaWVudCA9IHJlZGlzLmNyZWF0ZUNsaWVudChvcHRpb25zKVxuXG5jbGllbnQub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUubG9nKCdSZWRpcyBDbGllbnQgRXJyb3I6JyArIGVycilcbn0pXG5cbmZ1bmN0aW9uIHNldFZhbHVlIChrZXksIHZhbHVlLCB0aW1lKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpe1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYodHlwZW9mIHRpbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjbGllbnQuc2V0KGtleSx2YWx1ZSwnRVgnLHRpbWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGllbnQuc2V0KGtleSx2YWx1ZSlcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jyl7XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjbGllbnQuaHNldChrZXksIGl0ZW0sIHZhbHVlW2l0ZW1dLCByZWRpcy5wcmludClcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbi8vIHNldFZhbHVlKCdpZCcsJzI0JylcblxuZnVuY3Rpb24gZ2V0VmFsdWUgKGtleSkge1xuICAgIHJldHVybiBjbGllbnQuZ2V0QXN5bmMoa2V5KVxufVxuXG52YXIgZ2V0SFZhbHVlID0gKGtleSkgPT4ge1xuICAgIHJldHVybiBjbGllbnQuaGdldGFsbEFzeW5jKGtleSlcbn1cblxudmFyIGRlbFZhbHVlID0gKGtleSkgPT4ge1xuICAgIGNsaWVudC5kZWwoa2V5LCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcz09PTEpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZSBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWxldGUgcmVkaXMga2V5IGVycm9yOicgKyBlcnIpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vLyBleHBvcnQge1xuLy8gICAgIGNsaWVudCxcbi8vICAgICBzZXRWYWx1ZSxcbi8vICAgICBnZXRWYWx1ZSxcbi8vICAgICBnZXRIVmFsdWUsXG4vLyAgICAgZGVsVmFsdWVcbi8vIH1cbm1vZHVsZS5leHBvcnRzPXtjbGllbnQsc2V0VmFsdWUsZ2V0VmFsdWUsZ2V0SFZhbHVlLGRlbFZhbHVlfSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/RedisConfig.js\n");

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DB_URL = 'mongodb://test:123456@47.99.202.255:15001/testdb';\nconst REDIS = {\n  host: '47.99.202.255',\n  port: 15001,\n  password: '123456'\n};\nconst baseUrl =  false ? undefined : 'http://localhost:8080';\nconst JWT_SECRET = 'onedaythisismyfuture'; // 本来是一个编码后的值，这里使用了随机写的字母\n// export default {\n//     DB_URL,\n//     REDIS\n// }\n\nmodule.exports = {\n  DB_URL,\n  REDIS,\n  JWT_SECRET,\n  baseUrl\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2luZGV4LmpzP2YxMjEiXSwibmFtZXMiOlsiREJfVVJMIiwiUkVESVMiLCJob3N0IiwicG9ydCIsInBhc3N3b3JkIiwiYmFzZVVybCIsInByb2Nlc3MiLCJKV1RfU0VDUkVUIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsTUFBTSxHQUFDLGtEQUFiO0FBQ0EsTUFBTUMsS0FBSyxHQUFHO0FBQ1ZDLE1BQUksRUFBRSxlQURJO0FBRVZDLE1BQUksRUFBRSxLQUZJO0FBR1ZDLFVBQVEsRUFBRTtBQUhBLENBQWQ7QUFLQSxNQUFNQyxPQUFPLEdBQUdDLE1BQUEsR0FBd0MsU0FBeEMsR0FBaUQsdUJBQWpFO0FBQ0EsTUFBTUMsVUFBVSxHQUFHLHNCQUFuQixDLENBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBQyxNQUFNLENBQUNDLE9BQVAsR0FBZTtBQUFDVCxRQUFEO0FBQVFDLE9BQVI7QUFBZU0sWUFBZjtBQUEwQkY7QUFBMUIsQ0FBZiIsImZpbGUiOiIuL3NyYy9jb25maWcvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBEQl9VUkw9J21vbmdvZGI6Ly90ZXN0OjEyMzQ1NkA0Ny45OS4yMDIuMjU1OjE1MDAxL3Rlc3RkYidcbmNvbnN0IFJFRElTID0ge1xuICAgIGhvc3Q6ICc0Ny45OS4yMDIuMjU1JyxcbiAgICBwb3J0OiAxNTAwMSxcbiAgICBwYXNzd29yZDogJzEyMzQ1Nidcbn1cbmNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nID8gJ25vbmUnIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCdcbmNvbnN0IEpXVF9TRUNSRVQgPSAnb25lZGF5dGhpc2lzbXlmdXR1cmUnICAvLyDmnKzmnaXmmK/kuIDkuKrnvJbnoIHlkI7nmoTlgLzvvIzov5nph4zkvb/nlKjkuobpmo/mnLrlhpnnmoTlrZfmr41cbi8vIGV4cG9ydCBkZWZhdWx0IHtcbi8vICAgICBEQl9VUkwsXG4vLyAgICAgUkVESVNcbi8vIH1cblxubW9kdWxlLmV4cG9ydHM9e0RCX1VSTCxSRURJUywgSldUX1NFQ1JFVCxiYXNlVXJsfSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/index.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {const koa = __webpack_require__(/*! koa */ \"koa\");\n\nconst helmet = __webpack_require__(/*! koa-helmet */ \"koa-helmet\");\n\nconst statics = __webpack_require__(/*! koa-static */ \"koa-static\");\n\nconst cors = __webpack_require__(/*! @koa/cors */ \"@koa/cors\");\n\nconst JWT = __webpack_require__(/*! koa-jwt */ \"koa-jwt\");\n\nconst compress = __webpack_require__(/*! koa-compress */ \"koa-compress\");\n\nconst router = __webpack_require__(/*! ./routes/routes */ \"./src/routes/routes.js\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst koaBody = __webpack_require__(/*! koa-body */ \"koa-body\");\n\nconst jsonutil = __webpack_require__(/*! koa-json */ \"koa-json\");\n\nconst compose = __webpack_require__(/*! koa-compose */ \"koa-compose\");\n\nconst config = __webpack_require__(/*! ./config/index */ \"./src/config/index.js\");\n\nconst errorHandle = __webpack_require__(/*! ./common/ErrorHandle */ \"./src/common/ErrorHandle.js\");\n\nconst app = new koa();\nconst isDevMode =  false ? undefined : true;\nconst jwt = JWT({\n  secret: config.JWT_SECRET\n}).unless({\n  path: [/^\\/public/]\n});\nconst middleware = compose([koaBody(), statics(path.join(__dirname, '../public')), cors(), jsonutil({\n  pretty: false,\n  param: 'pretty'\n}), helmet(), errorHandle, jwt]);\n\nif (!isDevMode) {\n  app.use(compress());\n}\n\napp.use(middleware); // app.use(statics(path.join(__dirname,'../public')))\n\napp.use(router());\napp.listen(3000);\n/* WEBPACK VAR INJECTION */}.call(this, \"src\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6WyJrb2EiLCJyZXF1aXJlIiwiaGVsbWV0Iiwic3RhdGljcyIsImNvcnMiLCJKV1QiLCJjb21wcmVzcyIsInJvdXRlciIsInBhdGgiLCJrb2FCb2R5IiwianNvbnV0aWwiLCJjb21wb3NlIiwiY29uZmlnIiwiZXJyb3JIYW5kbGUiLCJhcHAiLCJpc0Rldk1vZGUiLCJwcm9jZXNzIiwiand0Iiwic2VjcmV0IiwiSldUX1NFQ1JFVCIsInVubGVzcyIsIm1pZGRsZXdhcmUiLCJqb2luIiwiX19kaXJuYW1lIiwicHJldHR5IiwicGFyYW0iLCJ1c2UiLCJsaXN0ZW4iXSwibWFwcGluZ3MiOiJBQUFBLHVEQUFNQSxHQUFHLEdBQUNDLG1CQUFPLENBQUMsZ0JBQUQsQ0FBakI7O0FBQ0EsTUFBTUMsTUFBTSxHQUFDRCxtQkFBTyxDQUFDLDhCQUFELENBQXBCOztBQUNBLE1BQU1FLE9BQU8sR0FBQ0YsbUJBQU8sQ0FBQyw4QkFBRCxDQUFyQjs7QUFDQSxNQUFNRyxJQUFJLEdBQUNILG1CQUFPLENBQUMsNEJBQUQsQ0FBbEI7O0FBQ0EsTUFBTUksR0FBRyxHQUFDSixtQkFBTyxDQUFDLHdCQUFELENBQWpCOztBQUNBLE1BQU1LLFFBQVEsR0FBQ0wsbUJBQU8sQ0FBQyxrQ0FBRCxDQUF0Qjs7QUFDQSxNQUFNTSxNQUFNLEdBQUNOLG1CQUFPLENBQUMsK0NBQUQsQ0FBcEI7O0FBQ0EsTUFBTU8sSUFBSSxHQUFDUCxtQkFBTyxDQUFDLGtCQUFELENBQWxCOztBQUNBLE1BQU1RLE9BQU8sR0FBQ1IsbUJBQU8sQ0FBQywwQkFBRCxDQUFyQjs7QUFDQSxNQUFNUyxRQUFRLEdBQUNULG1CQUFPLENBQUMsMEJBQUQsQ0FBdEI7O0FBQ0EsTUFBTVUsT0FBTyxHQUFDVixtQkFBTyxDQUFDLGdDQUFELENBQXJCOztBQUNBLE1BQU1XLE1BQU0sR0FBQ1gsbUJBQU8sQ0FBQyw2Q0FBRCxDQUFwQjs7QUFDQSxNQUFNWSxXQUFXLEdBQUNaLG1CQUFPLENBQUMseURBQUQsQ0FBekI7O0FBRUEsTUFBTWEsR0FBRyxHQUFDLElBQUlkLEdBQUosRUFBVjtBQUlBLE1BQU1lLFNBQVMsR0FBQ0MsTUFBQSxHQUFvQyxTQUFwQyxHQUEwQyxJQUExRDtBQUNBLE1BQU1DLEdBQUcsR0FBQ1osR0FBRyxDQUFDO0FBQUNhLFFBQU0sRUFBQ04sTUFBTSxDQUFDTztBQUFmLENBQUQsQ0FBSCxDQUFnQ0MsTUFBaEMsQ0FBdUM7QUFBQ1osTUFBSSxFQUFDLENBQUMsV0FBRDtBQUFOLENBQXZDLENBQVY7QUFFQSxNQUFNYSxVQUFVLEdBQUNWLE9BQU8sQ0FBQyxDQUNyQkYsT0FBTyxFQURjLEVBRXJCTixPQUFPLENBQUNLLElBQUksQ0FBQ2MsSUFBTCxDQUFVQyxTQUFWLEVBQW9CLFdBQXBCLENBQUQsQ0FGYyxFQUdyQm5CLElBQUksRUFIaUIsRUFJckJNLFFBQVEsQ0FBQztBQUFDYyxRQUFNLEVBQUMsS0FBUjtBQUFjQyxPQUFLLEVBQUM7QUFBcEIsQ0FBRCxDQUphLEVBS3JCdkIsTUFBTSxFQUxlLEVBTXJCVyxXQU5xQixFQU9yQkksR0FQcUIsQ0FBRCxDQUF4Qjs7QUFVQSxJQUFJLENBQUNGLFNBQUwsRUFBZ0I7QUFDWkQsS0FBRyxDQUFDWSxHQUFKLENBQVFwQixRQUFRLEVBQWhCO0FBQ0g7O0FBQ0RRLEdBQUcsQ0FBQ1ksR0FBSixDQUFRTCxVQUFSLEUsQ0FDQTs7QUFDQVAsR0FBRyxDQUFDWSxHQUFKLENBQVFuQixNQUFNLEVBQWQ7QUFFQU8sR0FBRyxDQUFDYSxNQUFKLENBQVcsSUFBWCxFIiwiZmlsZSI6Ii4vc3JjL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qga29hPXJlcXVpcmUoJ2tvYScpXG5jb25zdCBoZWxtZXQ9cmVxdWlyZSgna29hLWhlbG1ldCcpXG5jb25zdCBzdGF0aWNzPXJlcXVpcmUoJ2tvYS1zdGF0aWMnKVxuY29uc3QgY29ycz1yZXF1aXJlKCdAa29hL2NvcnMnKVxuY29uc3QgSldUPXJlcXVpcmUoJ2tvYS1qd3QnKVxuY29uc3QgY29tcHJlc3M9cmVxdWlyZSgna29hLWNvbXByZXNzJylcbmNvbnN0IHJvdXRlcj1yZXF1aXJlKCcuL3JvdXRlcy9yb3V0ZXMnKVxuY29uc3QgcGF0aD1yZXF1aXJlKCdwYXRoJylcbmNvbnN0IGtvYUJvZHk9cmVxdWlyZSgna29hLWJvZHknKVxuY29uc3QganNvbnV0aWw9cmVxdWlyZSgna29hLWpzb24nKVxuY29uc3QgY29tcG9zZT1yZXF1aXJlKCdrb2EtY29tcG9zZScpXG5jb25zdCBjb25maWc9cmVxdWlyZSgnLi9jb25maWcvaW5kZXgnKVxuY29uc3QgZXJyb3JIYW5kbGU9cmVxdWlyZSgnLi9jb21tb24vRXJyb3JIYW5kbGUnKVxuXG5jb25zdCBhcHA9bmV3IGtvYSgpXG5cblxuXG5jb25zdCBpc0Rldk1vZGU9cHJvY2Vzcy5lbnYuTk9ERV9FTlY9PT0ncHJvZHVjdGlvbic/ZmFsc2U6dHJ1ZVxuY29uc3Qgand0PUpXVCh7c2VjcmV0OmNvbmZpZy5KV1RfU0VDUkVUfSkudW5sZXNzKHtwYXRoOlsvXlxcL3B1YmxpYy9dfSlcblxuY29uc3QgbWlkZGxld2FyZT1jb21wb3NlKFtcbiAgICBrb2FCb2R5KCksXG4gICAgc3RhdGljcyhwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi9wdWJsaWMnKSksXG4gICAgY29ycygpLFxuICAgIGpzb251dGlsKHtwcmV0dHk6ZmFsc2UscGFyYW06J3ByZXR0eSd9KSxcbiAgICBoZWxtZXQoKSxcbiAgICBlcnJvckhhbmRsZSxcbiAgICBqd3Rcbl0pXG5cbmlmICghaXNEZXZNb2RlKSB7XG4gICAgYXBwLnVzZShjb21wcmVzcygpKVxufVxuYXBwLnVzZShtaWRkbGV3YXJlKVxuLy8gYXBwLnVzZShzdGF0aWNzKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uL3B1YmxpYycpKSlcbmFwcC51c2Uocm91dGVyKCkpXG5cbmFwcC5saXN0ZW4oMzAwMCkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/model/User.js":
/*!***************************!*\
  !*** ./src/model/User.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! ../config/DBHelper */ \"./src/config/DBHelper.js\");\n\nconst Schema = mongoose.Schema;\nconst UserSchema = new Schema({\n  'username': {\n    type: String\n  },\n  'name': {\n    type: String\n  },\n  'password': {\n    type: String\n  },\n  'created': {\n    type: Date\n  }\n});\nconst UserModel = mongoose.model('users', UserSchema);\nmodule.exports = UserModel;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvVXNlci5qcz83NmZlIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicmVxdWlyZSIsIlNjaGVtYSIsIlVzZXJTY2hlbWEiLCJ0eXBlIiwiU3RyaW5nIiwiRGF0ZSIsIlVzZXJNb2RlbCIsIm1vZGVsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsUUFBUSxHQUFHQyxtQkFBTyxDQUFDLG9EQUFELENBQXhCOztBQUNBLE1BQU1DLE1BQU0sR0FBQ0YsUUFBUSxDQUFDRSxNQUF0QjtBQUVBLE1BQU1DLFVBQVUsR0FBRyxJQUFJRCxNQUFKLENBQVc7QUFDMUIsY0FBVztBQUFDRSxRQUFJLEVBQUNDO0FBQU4sR0FEZTtBQUUxQixVQUFPO0FBQUNELFFBQUksRUFBQ0M7QUFBTixHQUZtQjtBQUcxQixjQUFXO0FBQUNELFFBQUksRUFBQ0M7QUFBTixHQUhlO0FBSTFCLGFBQVc7QUFBRUQsUUFBSSxFQUFFRTtBQUFSO0FBSmUsQ0FBWCxDQUFuQjtBQU9BLE1BQU1DLFNBQVMsR0FBQ1AsUUFBUSxDQUFDUSxLQUFULENBQWUsT0FBZixFQUF1QkwsVUFBdkIsQ0FBaEI7QUFDQU0sTUFBTSxDQUFDQyxPQUFQLEdBQWVILFNBQWYiLCJmaWxlIjoiLi9zcmMvbW9kZWwvVXNlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnLi4vY29uZmlnL0RCSGVscGVyJylcbmNvbnN0IFNjaGVtYT1tb25nb29zZS5TY2hlbWFcblxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgICd1c2VybmFtZSc6e3R5cGU6U3RyaW5nfSxcbiAgICAnbmFtZSc6e3R5cGU6U3RyaW5nfSxcbiAgICAncGFzc3dvcmQnOnt0eXBlOlN0cmluZ30sXG4gICAgJ2NyZWF0ZWQnOiB7IHR5cGU6IERhdGUgfVxufSlcblxuY29uc3QgVXNlck1vZGVsPW1vbmdvb3NlLm1vZGVsKCd1c2VycycsVXNlclNjaGVtYSlcbm1vZHVsZS5leHBvcnRzPVVzZXJNb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/model/User.js\n");

/***/ }),

/***/ "./src/routes/modules/loginRouter.js":
/*!*******************************************!*\
  !*** ./src/routes/modules/loginRouter.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Router = __webpack_require__(/*! koa-router */ \"koa-router\");\n\nconst loginController = __webpack_require__(/*! ../../api/LoginController */ \"./src/api/LoginController.js\");\n\nconst router = new Router();\nrouter.prefix('/login'); // router.post('/forget',loginController.forget)\n\nrouter.post('/login', loginController.login);\nrouter.post('/reg', loginController.reg);\nmodule.exports = router;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL21vZHVsZXMvbG9naW5Sb3V0ZXIuanM/MmRkYSJdLCJuYW1lcyI6WyJSb3V0ZXIiLCJyZXF1aXJlIiwibG9naW5Db250cm9sbGVyIiwicm91dGVyIiwicHJlZml4IiwicG9zdCIsImxvZ2luIiwicmVnIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsTUFBTSxHQUFDQyxtQkFBTyxDQUFDLDhCQUFELENBQXBCOztBQUNBLE1BQU1DLGVBQWUsR0FBQ0QsbUJBQU8sQ0FBQywrREFBRCxDQUE3Qjs7QUFFQSxNQUFNRSxNQUFNLEdBQUMsSUFBSUgsTUFBSixFQUFiO0FBRUFHLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLFFBQWQsRSxDQUNBOztBQUNBRCxNQUFNLENBQUNFLElBQVAsQ0FBWSxRQUFaLEVBQXFCSCxlQUFlLENBQUNJLEtBQXJDO0FBQ0FILE1BQU0sQ0FBQ0UsSUFBUCxDQUFZLE1BQVosRUFBbUJILGVBQWUsQ0FBQ0ssR0FBbkM7QUFFQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWdCTixNQUFoQiIsImZpbGUiOiIuL3NyYy9yb3V0ZXMvbW9kdWxlcy9sb2dpblJvdXRlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJvdXRlcj1yZXF1aXJlKCdrb2Etcm91dGVyJylcbmNvbnN0IGxvZ2luQ29udHJvbGxlcj1yZXF1aXJlKCcuLi8uLi9hcGkvTG9naW5Db250cm9sbGVyJylcblxuY29uc3Qgcm91dGVyPW5ldyBSb3V0ZXIoKVxuXG5yb3V0ZXIucHJlZml4KCcvbG9naW4nKVxuLy8gcm91dGVyLnBvc3QoJy9mb3JnZXQnLGxvZ2luQ29udHJvbGxlci5mb3JnZXQpXG5yb3V0ZXIucG9zdCgnL2xvZ2luJyxsb2dpbkNvbnRyb2xsZXIubG9naW4pXG5yb3V0ZXIucG9zdCgnL3JlZycsbG9naW5Db250cm9sbGVyLnJlZylcblxubW9kdWxlLmV4cG9ydHM9IHJvdXRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/routes/modules/loginRouter.js\n");

/***/ }),

/***/ "./src/routes/modules/publicRouter.js":
/*!********************************************!*\
  !*** ./src/routes/modules/publicRouter.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Router = __webpack_require__(/*! koa-router */ \"koa-router\");\n\nconst publicController = __webpack_require__(/*! ../../api/PublicController */ \"./src/api/PublicController.js\"); // const contentController=require('../../api/ContentController')\n\n\nconst router = new Router();\nrouter.prefix('/public');\nrouter.get('/getCaptcha', publicController); // router.get('/list', contentController)\n\nmodule.exports = router;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL21vZHVsZXMvcHVibGljUm91dGVyLmpzP2NmYzUiXSwibmFtZXMiOlsiUm91dGVyIiwicmVxdWlyZSIsInB1YmxpY0NvbnRyb2xsZXIiLCJyb3V0ZXIiLCJwcmVmaXgiLCJnZXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxNQUFNLEdBQUNDLG1CQUFPLENBQUMsOEJBQUQsQ0FBcEI7O0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUNELG1CQUFPLENBQUMsaUVBQUQsQ0FBOUIsQyxDQUNBOzs7QUFFQSxNQUFNRSxNQUFNLEdBQUMsSUFBSUgsTUFBSixFQUFiO0FBRUFHLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLFNBQWQ7QUFDQUQsTUFBTSxDQUFDRSxHQUFQLENBQVcsYUFBWCxFQUF5QkgsZ0JBQXpCLEUsQ0FFQTs7QUFFQUksTUFBTSxDQUFDQyxPQUFQLEdBQWVKLE1BQWYiLCJmaWxlIjoiLi9zcmMvcm91dGVzL21vZHVsZXMvcHVibGljUm91dGVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUm91dGVyPXJlcXVpcmUoJ2tvYS1yb3V0ZXInKVxuY29uc3QgcHVibGljQ29udHJvbGxlcj1yZXF1aXJlKCcuLi8uLi9hcGkvUHVibGljQ29udHJvbGxlcicpXG4vLyBjb25zdCBjb250ZW50Q29udHJvbGxlcj1yZXF1aXJlKCcuLi8uLi9hcGkvQ29udGVudENvbnRyb2xsZXInKVxuXG5jb25zdCByb3V0ZXI9bmV3IFJvdXRlcigpXG5cbnJvdXRlci5wcmVmaXgoJy9wdWJsaWMnKVxucm91dGVyLmdldCgnL2dldENhcHRjaGEnLHB1YmxpY0NvbnRyb2xsZXIpXG5cbi8vIHJvdXRlci5nZXQoJy9saXN0JywgY29udGVudENvbnRyb2xsZXIpXG5cbm1vZHVsZS5leHBvcnRzPXJvdXRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/routes/modules/publicRouter.js\n");

/***/ }),

/***/ "./src/routes/routes.js":
/*!******************************!*\
  !*** ./src/routes/routes.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// import combineRoutes from 'koa-combine-routers'\n// const moduleFiles = require.context('./modules', true, /\\.js$/)\n// const modules = moduleFiles.keys().reduce((items, path) => {\n//     const value = moduleFiles(path)\n//     items.push(value.default)\n//     return items\n// }, [])\n// export default combineRoutes(modules)\nconst combineRoutes = __webpack_require__(/*! koa-combine-routers */ \"koa-combine-routers\");\n\nconst aroutes = __webpack_require__(/*! ./modules/publicRouter */ \"./src/routes/modules/publicRouter.js\"); // const broutes=require('./bRouter')\n\n\nconst broutes = __webpack_require__(/*! ./modules/loginRouter */ \"./src/routes/modules/loginRouter.js\");\n\nmodule.exports = combineRoutes(aroutes, broutes);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL3JvdXRlcy5qcz82NDFiIl0sIm5hbWVzIjpbImNvbWJpbmVSb3V0ZXMiLCJyZXF1aXJlIiwiYXJvdXRlcyIsImJyb3V0ZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0EsTUFBTUEsYUFBYSxHQUFDQyxtQkFBTyxDQUFDLGdEQUFELENBQTNCOztBQUNBLE1BQU1DLE9BQU8sR0FBQ0QsbUJBQU8sQ0FBQyxvRUFBRCxDQUFyQixDLENBQ0E7OztBQUNBLE1BQU1FLE9BQU8sR0FBQ0YsbUJBQU8sQ0FBQyxrRUFBRCxDQUFyQjs7QUFFQUcsTUFBTSxDQUFDQyxPQUFQLEdBQWVMLGFBQWEsQ0FDeEJFLE9BRHdCLEVBRXhCQyxPQUZ3QixDQUE1QiIsImZpbGUiOiIuL3NyYy9yb3V0ZXMvcm91dGVzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IGNvbWJpbmVSb3V0ZXMgZnJvbSAna29hLWNvbWJpbmUtcm91dGVycydcblxuLy8gY29uc3QgbW9kdWxlRmlsZXMgPSByZXF1aXJlLmNvbnRleHQoJy4vbW9kdWxlcycsIHRydWUsIC9cXC5qcyQvKVxuXG4vLyBjb25zdCBtb2R1bGVzID0gbW9kdWxlRmlsZXMua2V5cygpLnJlZHVjZSgoaXRlbXMsIHBhdGgpID0+IHtcbi8vICAgICBjb25zdCB2YWx1ZSA9IG1vZHVsZUZpbGVzKHBhdGgpXG4vLyAgICAgaXRlbXMucHVzaCh2YWx1ZS5kZWZhdWx0KVxuLy8gICAgIHJldHVybiBpdGVtc1xuLy8gfSwgW10pXG5cbi8vIGV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSb3V0ZXMobW9kdWxlcylcblxuXG5jb25zdCBjb21iaW5lUm91dGVzPXJlcXVpcmUoJ2tvYS1jb21iaW5lLXJvdXRlcnMnKVxuY29uc3QgYXJvdXRlcz1yZXF1aXJlKCcuL21vZHVsZXMvcHVibGljUm91dGVyJylcbi8vIGNvbnN0IGJyb3V0ZXM9cmVxdWlyZSgnLi9iUm91dGVyJylcbmNvbnN0IGJyb3V0ZXM9cmVxdWlyZSgnLi9tb2R1bGVzL2xvZ2luUm91dGVyJylcblxubW9kdWxlLmV4cG9ydHM9Y29tYmluZVJvdXRlcyhcbiAgICBhcm91dGVzLFxuICAgIGJyb3V0ZXNcbikiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/routes/routes.js\n");

/***/ }),

/***/ "@koa/cors":
/*!****************************!*\
  !*** external "@koa/cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@koa/cors\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAa29hL2NvcnNcIj9hNjk1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IkBrb2EvY29ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBrb2EvY29yc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@koa/cors\n");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIj9jZjljIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImJjcnlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///bcrypt\n");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bluebird\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJibHVlYmlyZFwiPzJjNmIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYmx1ZWJpcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///bluebird\n");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIj82NDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Impzb253ZWJ0b2tlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///jsonwebtoken\n");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2FcIj9lZWI5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImtvYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa\n");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-body\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtYm9keVwiPzNmNjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoia29hLWJvZHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtYm9keVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-body\n");

/***/ }),

/***/ "koa-combine-routers":
/*!**************************************!*\
  !*** external "koa-combine-routers" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-combine-routers\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtY29tYmluZS1yb3V0ZXJzXCI/MmM3NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2EtY29tYmluZS1yb3V0ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWNvbWJpbmUtcm91dGVyc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-combine-routers\n");

/***/ }),

/***/ "koa-compose":
/*!******************************!*\
  !*** external "koa-compose" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-compose\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtY29tcG9zZVwiPzczMTciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoia29hLWNvbXBvc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtY29tcG9zZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-compose\n");

/***/ }),

/***/ "koa-compress":
/*!*******************************!*\
  !*** external "koa-compress" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-compress\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtY29tcHJlc3NcIj9hNmY2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImtvYS1jb21wcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYS1jb21wcmVzc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-compress\n");

/***/ }),

/***/ "koa-helmet":
/*!*****************************!*\
  !*** external "koa-helmet" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-helmet\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtaGVsbWV0XCI/NDJkMSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2EtaGVsbWV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWhlbG1ldFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-helmet\n");

/***/ }),

/***/ "koa-json":
/*!***************************!*\
  !*** external "koa-json" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-json\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtanNvblwiPzY1MjgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoia29hLWpzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtanNvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-json\n");

/***/ }),

/***/ "koa-jwt":
/*!**************************!*\
  !*** external "koa-jwt" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-jwt\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2Etand0XCI/ZWIwZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2Etand0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWp3dFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-jwt\n");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2Etcm91dGVyXCI/MDM1ZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2Etcm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLXJvdXRlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-router\n");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2Etc3RhdGljXCI/OWE0YyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJrb2Etc3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLXN0YXRpY1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///koa-static\n");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIj9iZDc2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im1vbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///moment\n");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiP2ZmZDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoibW9uZ29vc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///mongoose\n");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemailer\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlbWFpbGVyXCI/M2Q1NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJub2RlbWFpbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZW1haWxlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///nodemailer\n");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCI/NzRiYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJwYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///path\n");

/***/ }),

/***/ "qs":
/*!*********************!*\
  !*** external "qs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"qs\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJxc1wiP2E1YjAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJxc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///qs\n");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redis\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWRpc1wiPzcwNmMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWRpc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///redis\n");

/***/ }),

/***/ "svg-captcha":
/*!******************************!*\
  !*** external "svg-captcha" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"svg-captcha\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdmctY2FwdGNoYVwiP2NjNjAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic3ZnLWNhcHRjaGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdmctY2FwdGNoYVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///svg-captcha\n");

/***/ })

/******/ });