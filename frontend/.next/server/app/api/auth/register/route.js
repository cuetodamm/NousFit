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
exports.id = "app/api/auth/register/route";
exports.ids = ["app/api/auth/register/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/register/route.js":
/*!****************************************!*\
  !*** ./app/api/auth/register/route.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/prisma */ \"(rsc)/./lib/prisma.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\n\nasync function POST(req) {\n    try {\n        const formData = await req.formData(); // ✅ Captura los datos enviados desde el frontend\n        // 🔹 Extraer datos personales\n        const nombre = formData.get(\"nombre\")?.trim() || null;\n        const apellidos = formData.get(\"apellidos\")?.trim() || null;\n        const correo = formData.get(\"correo\")?.trim() || null;\n        let password = formData.get(\"password\")?.trim() || null;\n        const noCuenta = formData.get(\"noCuenta\")?.trim() || null;\n        const carrera = formData.get(\"carrera\")?.trim() || null;\n        const turno = formData.get(\"turno\")?.trim() || null;\n        const genero = formData.get(\"genero\")?.trim() || null;\n        const numeroTutor = formData.get(\"numeroTutor\")?.trim() || null;\n        // 🔹 Extraer archivos y asegurarse de que `url` sea una cadena válida\n        const credencialUniversitaria = formData.get(\"credencialUniversitaria\")?.name || null;\n        const ineTutor = formData.get(\"ineTutor\")?.name || null;\n        const cartaResponsiva = formData.get(\"cartaResponsiva\")?.name || null;\n        const certificadoMedico = formData.get(\"certificadoMedico\")?.name || null;\n        // 🔹 Validar que no haya campos vacíos\n        if (!nombre || !apellidos || !correo || !password || !noCuenta || !carrera || !turno || !genero || !numeroTutor || !credencialUniversitaria || !ineTutor || !cartaResponsiva || !certificadoMedico) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                message: \"Todos los campos son obligatorios\"\n            }, {\n                status: 400\n            });\n        }\n        // Verificar si el correo ya está registrado\n        const usuarioExistente = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].usuario.findUnique({\n            where: {\n                correo\n            }\n        });\n        if (usuarioExistente) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                message: \"El correo ya está registrado, usa otro.\"\n            }, {\n                status: 400\n            });\n        }\n        // Encriptar la contraseña en la misma variable\n        password = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hash(password, 10); // ✅ Sobrescribimos `password` con la versión encriptada\n        // 🔹 Guardar usuario en la base de datos con Prisma\n        const nuevoUsuario = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].usuario.create({\n            data: {\n                nombre,\n                apellidos,\n                correo,\n                contraseña: password,\n                noCuenta,\n                carrera,\n                turno,\n                genero,\n                numeroTutor,\n                documentos: {\n                    create: [\n                        {\n                            tipo: \"CREDENCIAL_UNIVERSITARIA\",\n                            url: credencialUniversitaria\n                        },\n                        {\n                            tipo: \"INE_TUTOR\",\n                            url: ineTutor\n                        },\n                        {\n                            tipo: \"CARTA_RESPONSIVA\",\n                            url: cartaResponsiva\n                        },\n                        {\n                            tipo: \"CERTIFICADO_MEDICO\",\n                            url: certificadoMedico\n                        }\n                    ]\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            message: \"Registro exitoso\",\n            usuario: nuevoUsuario\n        });\n    } catch (error) {\n        console.error(\"Error interno en el registro:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            message: \"Error interno del servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFpQ0E7UUFDL0MsT0FBT3BDLHFEQUFZQSxDQUFDcUIsSUFBSSxDQUFDO1lBQUVDLFNBQVM7UUFBNkIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEY7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c3VhcmlvXFxPbmVEcml2ZVxcRGVza3RvcFxcTm91c2ZpdFxcTm91c0ZpdFxcZnJvbnRlbmRcXGFwcFxcYXBpXFxhdXRoXFxyZWdpc3Rlclxccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vLi4vLi4vLi4vbGliL3ByaXNtYVwiO1xyXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IGF3YWl0IHJlcS5mb3JtRGF0YSgpOyAvLyDinIUgQ2FwdHVyYSBsb3MgZGF0b3MgZW52aWFkb3MgZGVzZGUgZWwgZnJvbnRlbmRcclxuXHJcbiAgICAvLyDwn5S5IEV4dHJhZXIgZGF0b3MgcGVyc29uYWxlc1xyXG4gICAgY29uc3Qgbm9tYnJlID0gZm9ybURhdGEuZ2V0KFwibm9tYnJlXCIpPy50cmltKCkgfHwgbnVsbDtcclxuICAgIGNvbnN0IGFwZWxsaWRvcyA9IGZvcm1EYXRhLmdldChcImFwZWxsaWRvc1wiKT8udHJpbSgpIHx8IG51bGw7XHJcbiAgICBjb25zdCBjb3JyZW8gPSBmb3JtRGF0YS5nZXQoXCJjb3JyZW9cIik/LnRyaW0oKSB8fCBudWxsO1xyXG4gICAgbGV0ICAgcGFzc3dvcmQgPSBmb3JtRGF0YS5nZXQoXCJwYXNzd29yZFwiKT8udHJpbSgpIHx8IG51bGw7XHJcbiAgICBjb25zdCBub0N1ZW50YSA9IGZvcm1EYXRhLmdldChcIm5vQ3VlbnRhXCIpPy50cmltKCkgfHwgbnVsbDtcclxuICAgIGNvbnN0IGNhcnJlcmEgPSBmb3JtRGF0YS5nZXQoXCJjYXJyZXJhXCIpPy50cmltKCkgfHwgbnVsbDtcclxuICAgIGNvbnN0IHR1cm5vID0gZm9ybURhdGEuZ2V0KFwidHVybm9cIik/LnRyaW0oKSB8fCBudWxsO1xyXG4gICAgY29uc3QgZ2VuZXJvID0gZm9ybURhdGEuZ2V0KFwiZ2VuZXJvXCIpPy50cmltKCkgfHwgbnVsbDtcclxuICAgIGNvbnN0IG51bWVyb1R1dG9yID0gZm9ybURhdGEuZ2V0KFwibnVtZXJvVHV0b3JcIik/LnRyaW0oKSB8fCBudWxsO1xyXG5cclxuICAgIC8vIPCflLkgRXh0cmFlciBhcmNoaXZvcyB5IGFzZWd1cmFyc2UgZGUgcXVlIGB1cmxgIHNlYSB1bmEgY2FkZW5hIHbDoWxpZGFcclxuICAgIGNvbnN0IGNyZWRlbmNpYWxVbml2ZXJzaXRhcmlhID0gZm9ybURhdGEuZ2V0KFwiY3JlZGVuY2lhbFVuaXZlcnNpdGFyaWFcIik/Lm5hbWUgfHwgbnVsbDtcclxuICAgIGNvbnN0IGluZVR1dG9yID0gZm9ybURhdGEuZ2V0KFwiaW5lVHV0b3JcIik/Lm5hbWUgfHwgbnVsbDtcclxuICAgIGNvbnN0IGNhcnRhUmVzcG9uc2l2YSA9IGZvcm1EYXRhLmdldChcImNhcnRhUmVzcG9uc2l2YVwiKT8ubmFtZSB8fCBudWxsO1xyXG4gICAgY29uc3QgY2VydGlmaWNhZG9NZWRpY28gPSBmb3JtRGF0YS5nZXQoXCJjZXJ0aWZpY2Fkb01lZGljb1wiKT8ubmFtZSB8fCBudWxsO1xyXG5cclxuICAgIC8vIPCflLkgVmFsaWRhciBxdWUgbm8gaGF5YSBjYW1wb3MgdmFjw61vc1xyXG4gICAgaWYgKCFub21icmUgfHwgIWFwZWxsaWRvc3x8ICFjb3JyZW8gfHwgIXBhc3N3b3JkIHx8ICFub0N1ZW50YSB8fFxyXG4gICAgICAgICFjYXJyZXJhIHx8ICF0dXJubyB8fCAhZ2VuZXJvIHx8ICFudW1lcm9UdXRvciB8fCAhY3JlZGVuY2lhbFVuaXZlcnNpdGFyaWEgfHwgXHJcbiAgICAgICAgIWluZVR1dG9yIHx8ICFjYXJ0YVJlc3BvbnNpdmEgfHwgIWNlcnRpZmljYWRvTWVkaWNvKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiVG9kb3MgbG9zIGNhbXBvcyBzb24gb2JsaWdhdG9yaW9zXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWZXJpZmljYXIgc2kgZWwgY29ycmVvIHlhIGVzdMOhIHJlZ2lzdHJhZG9cclxuICAgIGNvbnN0IHVzdWFyaW9FeGlzdGVudGUgPSBhd2FpdCBwcmlzbWEudXN1YXJpby5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgY29ycmVvIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodXN1YXJpb0V4aXN0ZW50ZSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIkVsIGNvcnJlbyB5YSBlc3TDoSByZWdpc3RyYWRvLCB1c2Egb3Ryby5cIiB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gICAgfVxyXG4gICAgICAgIC8vIEVuY3JpcHRhciBsYSBjb250cmFzZcOxYSBlbiBsYSBtaXNtYSB2YXJpYWJsZVxyXG4gICAgcGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTApOyAvLyDinIUgU29icmVzY3JpYmltb3MgYHBhc3N3b3JkYCBjb24gbGEgdmVyc2nDs24gZW5jcmlwdGFkYVxyXG5cclxuICAgIC8vIPCflLkgR3VhcmRhciB1c3VhcmlvIGVuIGxhIGJhc2UgZGUgZGF0b3MgY29uIFByaXNtYVxyXG4gICAgY29uc3QgbnVldm9Vc3VhcmlvID0gYXdhaXQgcHJpc21hLnVzdWFyaW8uY3JlYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG5vbWJyZSxcclxuICAgICAgICBhcGVsbGlkb3MsXHJcbiAgICAgICAgY29ycmVvLFxyXG4gICAgICAgIGNvbnRyYXNlw7FhOiBwYXNzd29yZCxcclxuICAgICAgICBub0N1ZW50YSxcclxuICAgICAgICBjYXJyZXJhLFxyXG4gICAgICAgIHR1cm5vLFxyXG4gICAgICAgIGdlbmVybyxcclxuICAgICAgICBudW1lcm9UdXRvcixcclxuICAgICAgICBkb2N1bWVudG9zOiB7XHJcbiAgICAgICAgICBjcmVhdGU6IFtcclxuICAgICAgICAgICAgeyB0aXBvOiBcIkNSRURFTkNJQUxfVU5JVkVSU0lUQVJJQVwiLCB1cmw6IGNyZWRlbmNpYWxVbml2ZXJzaXRhcmlhIH0sXHJcbiAgICAgICAgICAgIHsgdGlwbzogXCJJTkVfVFVUT1JcIiwgdXJsOiBpbmVUdXRvciB9LFxyXG4gICAgICAgICAgICB7IHRpcG86IFwiQ0FSVEFfUkVTUE9OU0lWQVwiLCB1cmw6IGNhcnRhUmVzcG9uc2l2YSB9LFxyXG4gICAgICAgICAgICB7IHRpcG86IFwiQ0VSVElGSUNBRE9fTUVESUNPXCIsIHVybDogY2VydGlmaWNhZG9NZWRpY28gfSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiUmVnaXN0cm8gZXhpdG9zb1wiLCB1c3VhcmlvOiBudWV2b1VzdWFyaW8gfSk7XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW50ZXJubyBlbiBlbCByZWdpc3RybzpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJFcnJvciBpbnRlcm5vIGRlbCBzZXJ2aWRvclwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbInByaXNtYSIsIk5leHRSZXNwb25zZSIsImJjcnlwdCIsIlBPU1QiLCJyZXEiLCJmb3JtRGF0YSIsIm5vbWJyZSIsImdldCIsInRyaW0iLCJhcGVsbGlkb3MiLCJjb3JyZW8iLCJwYXNzd29yZCIsIm5vQ3VlbnRhIiwiY2FycmVyYSIsInR1cm5vIiwiZ2VuZXJvIiwibnVtZXJvVHV0b3IiLCJjcmVkZW5jaWFsVW5pdmVyc2l0YXJpYSIsIm5hbWUiLCJpbmVUdXRvciIsImNhcnRhUmVzcG9uc2l2YSIsImNlcnRpZmljYWRvTWVkaWNvIiwianNvbiIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJ1c3VhcmlvRXhpc3RlbnRlIiwidXN1YXJpbyIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImhhc2giLCJudWV2b1VzdWFyaW8iLCJjcmVhdGUiLCJkYXRhIiwiY29udHJhc2XDsWEiLCJkb2N1bWVudG9zIiwidGlwbyIsInVybCIsImVycm9yIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/register/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    datasources: {\n        db: {\n            url: process.env.DATABASE_URL = \"postgresql://root:root@localhost:5432/NousFit?schema=public\" //Direccionamos la URL de la base de datos para un funcionamiento correcto\n        }\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxTQUFTLElBQUlELHdEQUFZQSxDQUFDO0lBQzVCRSxhQUFhO1FBQ2JDLElBQUk7WUFDRkMsS0FBS0MsUUFBUUMsR0FBRyxDQUFDQyxZQUFZLEdBQUUsOERBQThELDBFQUEwRTtRQUN6SztJQUNGO0FBQ0Y7QUFHQSxpRUFBZU4sTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c3VhcmlvXFxPbmVEcml2ZVxcRGVza3RvcFxcTm91c2ZpdFxcTm91c0ZpdFxcZnJvbnRlbmRcXGxpYlxccHJpc21hLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCh7XHJcbiAgICBkYXRhc291cmNlczoge1xyXG4gICAgZGI6IHtcclxuICAgICAgdXJsOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkw9IFwicG9zdGdyZXNxbDovL3Jvb3Q6cm9vdEBsb2NhbGhvc3Q6NTQzMi9Ob3VzRml0P3NjaGVtYT1wdWJsaWNcIiAvL0RpcmVjY2lvbmFtb3MgbGEgVVJMIGRlIGxhIGJhc2UgZGUgZGF0b3MgcGFyYSB1biBmdW5jaW9uYW1pZW50byBjb3JyZWN0b1xyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7Il0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYSIsImRhdGFzb3VyY2VzIiwiZGIiLCJ1cmwiLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfVVJMIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.js&appDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5CNousFit%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5CNousFit%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.js&appDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5CNousFit%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5CNousFit%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_usuario_OneDrive_Desktop_Nousfit_NousFit_frontend_app_api_auth_register_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/register/route.js */ \"(rsc)/./app/api/auth/register/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/register/route\",\n        pathname: \"/api/auth/register\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/register/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\usuario\\\\OneDrive\\\\Desktop\\\\Nousfit\\\\NousFit\\\\frontend\\\\app\\\\api\\\\auth\\\\register\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_usuario_OneDrive_Desktop_Nousfit_NousFit_frontend_app_api_auth_register_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGcmVnaXN0ZXIlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c3VhcmlvJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDTm91c2ZpdCU1Q05vdXNGaXQlNUNmcm9udGVuZCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDdXN1YXJpbyU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q05vdXNmaXQlNUNOb3VzRml0JTVDZnJvbnRlbmQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3FEO0FBQ2xJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFx1c3VhcmlvXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcTm91c2ZpdFxcXFxOb3VzRml0XFxcXGZyb250ZW5kXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxyZWdpc3RlclxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9yZWdpc3Rlci9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvcmVnaXN0ZXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFx1c3VhcmlvXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcTm91c2ZpdFxcXFxOb3VzRml0XFxcXGZyb250ZW5kXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxyZWdpc3RlclxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.js&appDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5CNousFit%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5CNousFit%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.js&appDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5CNousFit%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cusuario%5COneDrive%5CDesktop%5CNousfit%5CNousFit%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();