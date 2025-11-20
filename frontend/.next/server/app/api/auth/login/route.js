/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/login/route.js":
/*!*************************************!*\
  !*** ./app/api/auth/login/route.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/prisma */ \"(rsc)/./lib/prisma.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"clave-secreta-temp\"; // Usa variable de entorno en producción\nasync function POST(req) {\n    try {\n        const { correo, password } = await req.json();\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].usuario.findUnique({\n            where: {\n                correo\n            }\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Usuario no encontrado.\"\n            }, {\n                status: 404\n            });\n        }\n        const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(password, user.contraseña);\n        if (!isPasswordValid) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Credenciales incorrectas\"\n            }, {\n                status: 401\n            });\n        }\n        // 🔐 Generar el token incluyendo `esAdmin`\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().sign({\n            id: user.id,\n            correo: user.correo,\n            esAdmin: user.esAdmin\n        }, JWT_SECRET, {\n            expiresIn: \"1d\"\n        });\n        // ✅ 🔹 Enviar `usuario` completo en la respuesta\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Login exitoso\",\n            token,\n            usuario: {\n                id: user.id,\n                nombre: user.nombre,\n                correo: user.correo,\n                esAdmin: user.esAdmin\n            }\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Error interno en el inicio de sesión:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Error interno del servidor.\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTJDO0FBQ0M7QUFDZDtBQUNDO0FBRS9CLE1BQU1JLGFBQWFDLFFBQVFDLEdBQUcsQ0FBQ0YsVUFBVSxJQUFJLHNCQUFzQix3Q0FBd0M7QUFFcEcsZUFBZUcsS0FBS0MsR0FBRztJQUM1QixJQUFJO1FBQ0YsTUFBTSxFQUFFQyxNQUFNLEVBQUVDLFFBQVEsRUFBRSxHQUFHLE1BQU1GLElBQUlHLElBQUk7UUFFM0MsTUFBTUMsT0FBTyxNQUFNWCxtREFBTUEsQ0FBQ1ksT0FBTyxDQUFDQyxVQUFVLENBQUM7WUFDM0NDLE9BQU87Z0JBQUVOO1lBQU87UUFDbEI7UUFFQSxJQUFJLENBQUNHLE1BQU07WUFDVCxPQUFPWixxREFBWUEsQ0FBQ1csSUFBSSxDQUN0QjtnQkFBRUssU0FBUztZQUF5QixHQUNwQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTUMsa0JBQWtCLE1BQU1oQix3REFBYyxDQUFDUSxVQUFVRSxLQUFLUSxVQUFVO1FBRXRFLElBQUksQ0FBQ0YsaUJBQWlCO1lBQ3BCLE9BQU9sQixxREFBWUEsQ0FBQ1csSUFBSSxDQUN0QjtnQkFBRUssU0FBUztZQUEyQixHQUN0QztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsMkNBQTJDO1FBQzNDLE1BQU1JLFFBQVFsQix3REFBUSxDQUNwQjtZQUNFb0IsSUFBSVgsS0FBS1csRUFBRTtZQUNYZCxRQUFRRyxLQUFLSCxNQUFNO1lBQ25CZSxTQUFTWixLQUFLWSxPQUFPO1FBQ3ZCLEdBQ0FwQixZQUNBO1lBQUVxQixXQUFXO1FBQUs7UUFHcEIsaURBQWlEO1FBQ2pELE9BQU96QixxREFBWUEsQ0FBQ1csSUFBSSxDQUN0QjtZQUNFSyxTQUFTO1lBQ1RLO1lBQ0FSLFNBQVM7Z0JBQ1BVLElBQUlYLEtBQUtXLEVBQUU7Z0JBQ1hHLFFBQVFkLEtBQUtjLE1BQU07Z0JBQ25CakIsUUFBUUcsS0FBS0gsTUFBTTtnQkFDbkJlLFNBQVNaLEtBQUtZLE9BQU87WUFDdkI7UUFDRixHQUNBO1lBQUVQLFFBQVE7UUFBSTtJQUdsQixFQUFFLE9BQU9VLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHlDQUF5Q0E7UUFDdkQsT0FBTzNCLHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO1lBQUVLLFNBQVM7UUFBOEIsR0FDekM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcdXN1YXJpb1xcT25lRHJpdmVcXERlc2t0b3BcXE5vdXNmaXRcXGZyb250ZW5kXFxhcHBcXGFwaVxcYXV0aFxcbG9naW5cXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi8uLi8uLi9saWIvcHJpc21hXCI7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XHJcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xyXG5cclxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCJjbGF2ZS1zZWNyZXRhLXRlbXBcIjsgLy8gVXNhIHZhcmlhYmxlIGRlIGVudG9ybm8gZW4gcHJvZHVjY2nDs25cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IGNvcnJlbywgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcS5qc29uKCk7XHJcblxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c3VhcmlvLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBjb3JyZW8gfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBtZXNzYWdlOiBcIlVzdWFyaW8gbm8gZW5jb250cmFkby5cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDQgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB1c2VyLmNvbnRyYXNlw7FhKTtcclxuXHJcbiAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBtZXNzYWdlOiBcIkNyZWRlbmNpYWxlcyBpbmNvcnJlY3Rhc1wiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g8J+UkCBHZW5lcmFyIGVsIHRva2VuIGluY2x1eWVuZG8gYGVzQWRtaW5gXHJcbiAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgY29ycmVvOiB1c2VyLmNvcnJlbyxcclxuICAgICAgICBlc0FkbWluOiB1c2VyLmVzQWRtaW4sXHJcbiAgICAgIH0sXHJcbiAgICAgIEpXVF9TRUNSRVQsXHJcbiAgICAgIHsgZXhwaXJlc0luOiBcIjFkXCIgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyDinIUg8J+UuSBFbnZpYXIgYHVzdWFyaW9gIGNvbXBsZXRvIGVuIGxhIHJlc3B1ZXN0YVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7XHJcbiAgICAgICAgbWVzc2FnZTogXCJMb2dpbiBleGl0b3NvXCIsXHJcbiAgICAgICAgdG9rZW4sXHJcbiAgICAgICAgdXN1YXJpbzoge1xyXG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgICBub21icmU6IHVzZXIubm9tYnJlLFxyXG4gICAgICAgICAgY29ycmVvOiB1c2VyLmNvcnJlbyxcclxuICAgICAgICAgIGVzQWRtaW46IHVzZXIuZXNBZG1pbixcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7IHN0YXR1czogMjAwIH1cclxuICAgICk7XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW50ZXJubyBlbiBlbCBpbmljaW8gZGUgc2VzacOzbjpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IG1lc3NhZ2U6IFwiRXJyb3IgaW50ZXJubyBkZWwgc2Vydmlkb3IuXCIgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsImJjcnlwdCIsImp3dCIsIkpXVF9TRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiUE9TVCIsInJlcSIsImNvcnJlbyIsInBhc3N3b3JkIiwianNvbiIsInVzZXIiLCJ1c3VhcmlvIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwibWVzc2FnZSIsInN0YXR1cyIsImlzUGFzc3dvcmRWYWxpZCIsImNvbXBhcmUiLCJjb250cmFzZcOxYSIsInRva2VuIiwic2lnbiIsImlkIiwiZXNBZG1pbiIsImV4cGlyZXNJbiIsIm5vbWJyZSIsImVycm9yIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/login/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    datasources: {\n        db: {\n            url: process.env.DATABASE_URL || \"postgresql://root:root@localhost:5432/NousFit?schema=public\" //Direccionamos la URL de la base de datos para un funcionamiento correcto\n        }\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxTQUFTLElBQUlELHdEQUFZQSxDQUFDO0lBQzVCRSxhQUFhO1FBQ2JDLElBQUk7WUFDRkMsS0FBS0MsUUFBUUMsR0FBRyxDQUFDQyxZQUFZLElBQUksOERBQThELDBFQUEwRTtRQUMzSztJQUNGO0FBQ0Y7QUFFQSxpRUFBZU4sTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c3VhcmlvXFxPbmVEcml2ZVxcRGVza3RvcFxcTm91c2ZpdFxcZnJvbnRlbmRcXGxpYlxccHJpc21hLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCh7XHJcbiAgICBkYXRhc291cmNlczoge1xyXG4gICAgZGI6IHtcclxuICAgICAgdXJsOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgfHwgXCJwb3N0Z3Jlc3FsOi8vcm9vdDpyb290QGxvY2FsaG9zdDo1NDMyL05vdXNGaXQ/c2NoZW1hPXB1YmxpY1wiIC8vRGlyZWNjaW9uYW1vcyBsYSBVUkwgZGUgbGEgYmFzZSBkZSBkYXRvcyBwYXJhIHVuIGZ1bmNpb25hbWllbnRvIGNvcnJlY3RvXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hOyJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJkYXRhc291cmNlcyIsImRiIiwidXJsIiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX1VSTCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_usuario_OneDrive_Desktop_Nousfit_frontend_app_api_auth_login_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/login/route.js */ \"(rsc)/./app/api/auth/login/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\usuario\\\\OneDrive\\\\Desktop\\\\Nousfit\\\\frontend\\\\app\\\\api\\\\auth\\\\login\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_usuario_OneDrive_Desktop_Nousfit_frontend_app_api_auth_login_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c3VhcmlvJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDTm91c2ZpdCU1Q2Zyb250ZW5kJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUN1c3VhcmlvJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDTm91c2ZpdCU1Q2Zyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5QztBQUN0SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcdXN1YXJpb1xcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXE5vdXNmaXRcXFxcZnJvbnRlbmRcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXGxvZ2luXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9sb2dpblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXHVzdWFyaW9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxOb3VzZml0XFxcXGZyb250ZW5kXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxsb2dpblxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ms","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();