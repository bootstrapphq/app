var dx=Object.create;var Co=Object.defineProperty;var hx=Object.getOwnPropertyDescriptor;var px=Object.getOwnPropertyNames;var fx=Object.getPrototypeOf,mx=Object.prototype.hasOwnProperty;var Eo=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var y=(e,t)=>()=>(e&&(t=e(e=0)),t);var gx=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ee=(e,t)=>{for(var n in t)Co(e,n,{get:t[n],enumerable:!0})},bx=(e,t,n,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of px(t))!mx.call(e,r)&&r!==n&&Co(e,r,{get:()=>t[r],enumerable:!(s=hx(t,r))||s.enumerable});return e};var yx=(e,t,n)=>(n=e!=null?dx(fx(e)):{},bx(t||!e||!e.__esModule?Co(n,"default",{value:e,enumerable:!0}):n,e));var mc={};Ee(mc,{default:()=>Rs,events:()=>ne,sanitizeForPostMessage:()=>Ro});function pc(e={},{getter:t=!0}={}){let n=new Map;return e.listeners=n,e.hasListeners=s=>n.has(s),e.on=(s,r)=>r?(n.has(s)||n.set(s,new Set),n.get(s).add(r),()=>e.off(s,r)):(ne?.emit?.("EVENTS:ERROR",{type:"no_callback",key:s}),()=>{}),e.set=s=>Object.entries(s).forEach(([r,i])=>e.on(r,i)),t&&(e.get=s=>[...n.get(s)??[]]),e.off=(s,r)=>{let i=n.get(s);i&&(i.delete(r),i.size===0&&n.delete(s))},e.once=(s,r)=>{let i=o=>(e.off(s,i),r(o));return e.on(s,i)},e.emit=async(s,r)=>{let i=[];return n.get(s)?.forEach(o=>{try{i.push(o(r))}catch(a){ne?.emit?.("EVENTS:ERROR",{type:"listener_error",key:s,error:a})}}),Promise.all(i)},e}var Ro,ne,fc,xx,Rs,rt=y(()=>{Ro=e=>{if(e==null)return e;if(typeof e=="function"||typeof e=="symbol")return;if(typeof e!="object")return e;if(e instanceof Error)return{__isError:!0,name:e.name,message:e.message,stack:e.stack};if(e.constructor&&!["Object","Array"].includes(e.constructor.name))return;if(Array.isArray(e))return e.map(Ro);let t={};for(let[n,s]of Object.entries(e)){let r=Ro(s);r!==void 0&&(t[n]=r)}return t},ne=pc(),fc=null;ne.connect=e=>{fc=e};xx=ne.emit;ne.emit=async(e,t)=>{await xx(e,t),fc?.(e,t)};Rs=pc});var vx,wx,gc,bc=y(()=>{vx=(e,t,n={})=>{let{operation:s}=n,r=Date.now();if(t.update===!0)return[null,r];if(s==="create"&&t.create!==!1&&(!e||e===""))return[null,r];if(e){let i;if(e instanceof Date)i=e.getTime();else if(typeof e=="string"){let o=new Date(e);if(Number.isNaN(o.getTime()))return["invalid_timestamp",null];i=o.getTime()}else if(typeof e=="number")i=e;else return["invalid_timestamp",null];return t.min&&i<t.min?["minimum",null]:t.max&&i>t.max?["maximum",null]:[null,i]}return[null,null]},wx=(e={})=>({type:"number",timestamp:!0,index:!0,persist:!0,attribute:!0,customValidator:vx,...e}),gc={types:{timestamp:wx}}});var kx,$x,yc,xc=y(()=>{kx=(e={})=>({type:"string",fieldType:"file",accept:e.accept||"image/*",maxSize:e.maxSize||5242880,maxWidth:e.maxWidth||null,maxHeight:e.maxHeight||null,quality:e.quality||null,persist:!0,attribute:!0,...e}),$x=(e={})=>({type:"array",fieldType:"files",accept:e.accept||"image/*",maxSize:e.maxSize||5242880,maxWidth:e.maxWidth||null,maxHeight:e.maxHeight||null,quality:e.quality||null,maxItems:e.maxItems||null,defaultValue:[],persist:!0,attribute:!0,...e}),yc={types:{file:kx,files:$x}}});var _c={};Ee(_c,{default:()=>u});function wc(e,t){return e.replace(/\${(.*?)}/g,(n,s)=>t[s.trim()])}var Sx,vc,Io,Is,_x,Ax,To,wr,Cx,$c,Sc,Po,Ex,Rx,Ix,Tx,kc,Px,Mo,u,V=y(()=>{bc();xc();Sx={email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/},vc=e=>{try{return e in Io?e:JSON.parse(e)}catch{return}},Io={undefined:void 0,null:null,"":null},Is={any:e=>e,function:e=>e,boolean:(e,{attribute:t=!0}={})=>t&&e===""||["true",1,"1",!0].includes(e),string:e=>e in Io?Io[e]:String(e),array:(e,t={})=>{if(Array.isArray(e))return e;let{itemType:n}=t;try{if(!e)throw e;let s=vc(e);if(!Array.isArray(s))throw s;return n?s.map(r=>typeof r!="object"?r:Object.entries(r).reduce((i,[o,a])=>(i[o]=Is[n[o]?.type]?Is[n[o].type](a,t):a,i),{})):s}catch{return[]}},number:e=>e==null||e===""?e:Number(e),date:e=>e?e instanceof Date?e:new Date(e):null,datetime:e=>e?e instanceof Date?e:new Date(e):null,object:(e,t={})=>{if(e===null)return null;let n=typeof e=="string"?vc(e):e;return t.properties&&n&&typeof n=="object"&&Object.entries(t.properties).map(([s,r])=>{r.defaultValue!==void 0&&n[s]===void 0&&(n[s]=r.defaultValue)}),n}},_x=(e,t={})=>{let{type:n}=t;return(Is[n]||(s=>s))(e,t)},Ax={datetime:(e,t={})=>{if(e===null)return t.required?["required",null]:null;if(!(e instanceof Date)||Number.isNaN(e.getTime()))return["invalid","invalid datetime"];if(t.min&&e<new Date(t.min))return["minimum",null];if(t.max&&e>new Date(t.max))return["maximum",null]},date:(e,t={})=>{if(e===null)return t.required?["required",null]:null;if(!(e instanceof Date)||Number.isNaN(e.getTime()))return["invalid","invalid date"];if(t.min&&e<new Date(t.min))return["minimum",null];if(t.max&&e>new Date(t.max))return["maximum",null]},object:(e,t={})=>{if(e===null)return t.required?["required",null]:["invalid","null is not an object"];if(typeof e!="object"||Array.isArray(e))return["invalid","not an object"]},number:(e,t={})=>{if(Number.isNaN(Number(e)))return!t.required&&(e==null||e==="")?null:["NaN",null];if("min"in t&&e<t.min)return["minimum",null];if("max"in t&&e>t.max)return["maximum",null]}},To=(e,t,n={})=>{if(e===void 0&&t.defaultValue!==void 0&&(e=t.defaultValue),t.required===!0&&(e==null||e===""))return["required",null];if(t.customValidator){let o=t.customValidator(e,t,n);if(o)return o}if(t.relationship)return t.many?[null,Array.isArray(e)?e.map(o=>t.mixed?o:o?.id??o):[]]:[null,e?.id??e];let s=Is[t.type],r=s?s(e,t):e;if((e==null||e==="")&&t.defaultValue!==void 0&&(r=t.defaultValue),t.required===!0&&(r==null||r===""))return["required",null];if(!t.required&&r==null&&!(t.type==="object"&&r===null))return[null,r];let i=Ax[t.type];if(i){let o=i(r,t);if(o)return o}if(t.format){let o=Sx[t.format]||(typeof t.format=="function"?t.format:null);if(o&&!(typeof o=="function"?o:c=>o.test(c))(r))return["invalid",`invalid format: ${t.format}`]}return[null,r]},wr={validate(e,t={}){let[n,s]=To(e,this,t);return n?{valid:!1,error:n,details:s,value:e}:{valid:!0,value:s,error:null,details:null}}};Cx=(e,{schema:t,row:n={},undefinedProps:s=!0,validateVirtual:r=!1,operation:i=null})=>{if(!t)return[null,e];let o={},a=!1,l={operation:i,row:n},c=s?t:e;for(let h in c){let f={...t[h],key:h};if("virtual"in f||f.persist===!1)continue;let m=f.customValidator||e[h]!==void 0||f.required,[g,b]=m?To(e[h],f,l):[null,f.defaultValue];g?(a=!0,o[h]=g):b!==void 0&&(e[h]=b)}let d=Object.fromEntries(Object.entries(t).filter(([h,f])=>"virtual"in f));for(let h in d)if(r){let[f,m]=To(wc(d[h].virtual,{...n,...e}),d[h],l);f?(a=!0,o[h]=f):m!==void 0&&(e[h]=m)}else e[h]=wc(d[h].virtual,{...n,...e});return a?[o,null]:[null,e]},$c=(e,t)=>{let n=typeof t=="object"&&!Array.isArray(t)&&t!==null?t:{defaultValue:t},s={type:e,persist:!0,attribute:!["array","object","function"].includes(e),...n};return Object.setPrototypeOf(s,wr),s},Sc={createType:$c,parse:_x,validateType:Cx},Po={},Ex=e=>{e.types&&Object.assign(Po,e.types)};Sc.registerExtension=Ex;Rx=e=>(...t)=>{let n=t[0],s,r=t[2];typeof t[1]=="string"?s=t[1]:r=t[1];let i=kc.includes(e),o={type:i?e==="belongs_many"?"array":"string":e==="one"?"string":"array",many:Tx.includes(e),belongs:i,persist:i,relationship:e,defaultValue:e==="belongs_many"?[]:null,polymorphic:n==="*"||Array.isArray(n),targetModel:n,targetForeignKey:s,index:kc.includes(e),...r};return Object.setPrototypeOf(o,wr),o},Ix=["one","many","belongs","belongs_many"],Tx=["many","belongs_many"],kc=["belongs","belongs_many"],Px={get(e,t){if(e[t])return e[t];if(Po[t])return Po[t];let n=t.toLowerCase();return Ix.includes(t)?Rx(t):t==="union"?(s={})=>{let r={type:"union",types:s.types||[],persist:!0,attribute:!1,...s};return Object.setPrototypeOf(r,wr),r}:t==="function"?(s={})=>{let r={type:"function",args:s.args||[],returns:s.returns||null,persist:!1,attribute:!1,...s};return Object.setPrototypeOf(r,wr),r}:(s={})=>{if(!Is[n])throw new Error(`Unknown type: ${n}`);return $c(n,s)}}},Mo=new Proxy(Sc,Px);Mo.registerExtension(gc);Mo.registerExtension(yc);u=Mo});var Ac,Cc=y(()=>{Ac=e=>!e||typeof e!="string"?"":e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").replace(/-+/g,"-")});var Ec,Rc,Ic=y(()=>{Cc();Ec=e=>{if(!e||typeof e!="string")return[];let t=/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,n=new Set;for(let s of e.matchAll(t)){let r=Ac(s[1].trim());r&&n.add(r)}return Array.from(n)},Rc=()=>({beforeAdd:async e=>(typeof e.body=="string"&&(e.links=Ec(e.body)),e),beforeEdit:async e=>(typeof e.body=="string"&&(e.links=Ec(e.body)),e)})});var Tc,kr=y(()=>{V();Ic();Tc={collections:{$adapter:"file",id:u.string({required:!0}),name:u.string({required:!0}),type:u.string({required:!0,index:!0}),icon:u.string({defaultValue:""}),color:u.string({defaultValue:""}),sortOrder:u.number({defaultValue:0}),metadata:u.object({defaultValue:{}}),entries:u.many("collections"),body:u.string({defaultValue:""}),createdAt:u.timestamp(),updatedAt:u.timestamp({update:!0})},notes:{$adapter:"file",$hooks:Rc(),id:u.string({required:!0}),title:u.string({required:!0}),type:u.string({defaultValue:"note",index:!0}),tags:u.array({defaultValue:[]}),links:u.array({defaultValue:[],index:!0}),pinned:u.boolean({defaultValue:!1}),metadata:u.object({defaultValue:{}}),body:u.string({defaultValue:""}),createdAt:u.timestamp(),updatedAt:u.timestamp({update:!0})},media:{id:u.string({required:!0}),blob:u.any(),mimeType:u.string({defaultValue:""}),fileName:u.string({defaultValue:""}),size:u.number({defaultValue:0}),createdAt:u.timestamp()}}});var Mx={};var Pc=y(()=>{kr()});var jo={};Ee(jo,{generateSchemaRegistrySource:()=>Fx,namespaceData:()=>Ox,namespaceModels:()=>Dx});function Fx(e,{kind:t="schema"}={}){let n=e?.packages||{},s=t==="seed"?"hasSeed":"hasSchema",r=t==="seed"?"hasProjectSeed":"hasProjectSchema",i=t==="seed"?"seed.js":"schema.js",o=t==="seed"?"__d_":"__s_",a=t==="seed"?"data":"models",l=[],c=[];for(let[d,h]of Object.entries(n)){if(!h?.[s])continue;let f=jx(o,d),m=h.namespace!==!1;l.push(`import ${f} from "/node_modules/@bootstrapp/${d}/models/${i}";`),c.push(`  ${JSON.stringify(d)}: { ${a}: ${f}, namespace: ${m} },`)}if(e?.[r]){let d=`${o}__project`;l.push(`import ${d} from "/models/${i}";`),c.push(`  "__project__": { ${a}: ${d}, namespace: false },`)}return c.length===0?`export default {};
`:`${l.join(`
`)}
export default {
${c.join(`
`)}
};
`}function Dx(e,t){if(!t)return e;let n={},s=Object.keys(e);for(let[r,i]of Object.entries(e)){let o=`${t}_${r}`;n[o]=Lx({...i},t,s)}return n}function Ox(e,t){if(!t)return e;let n={};for(let[s,r]of Object.entries(e)){let i=`${t}_${s}`;n[i]=r}return n}function Lx(e,t,n){let s={...e};for(let[r,i]of Object.entries(s))!i||typeof i!="object"||i.targetModel&&n.includes(i.targetModel)&&(s[r]={...i,targetModel:`${t}_${i.targetModel}`});return s}var jx,Fo=y(()=>{jx=(e,t)=>`${e}${t.replace(/[^a-zA-Z0-9_$]/g,"_")}`});var Mc,jc=y(()=>{V();Mc={sessions:{$adapter:"indexeddb",title:u.string({defaultValue:"New Session"}),agentSessionId:u.string(),agent:u.string({required:!0}),agentName:u.string(),model:u.string(),modelName:u.string(),status:u.string({defaultValue:"active",enum:["active","paused","closed"]}),contextItems:u.array({defaultValue:[]}),parentConversation:u.belongs("conversations"),messages:u.many("messages","session"),createdAt:u.timestamp(),updatedAt:u.timestamp({update:!0})},messages:{$adapter:"indexeddb",content:u.string({defaultValue:""}),role:u.string({required:!0,enum:["user","assistant","system","tool"]}),toolCalls:u.array(),toolResults:u.array(),contextSnapshot:u.object(),session:u.belongs("sessions","messages"),createdAt:u.timestamp()}}});var $r,Do=y(()=>{$r={}});var zx,Ux,Nx,Vx,Bx,Wx,qx,Fc,Dc=y(()=>{zx=(e={})=>({type:"string",cmsType:"richText",editor:e.editor||"markdown",persist:!0,attribute:!1,defaultValue:"",...e}),Ux=(e={})=>({type:"string",cmsType:"media",accept:e.accept||"image/*",maxSize:e.maxSize||5242880,persist:!0,attribute:!1,defaultValue:"",...e}),Nx=(e={})=>({type:"object",cmsType:"seo",persist:!0,attribute:!1,defaultValue:{metaTitle:"",metaDescription:"",ogImage:"",...e.defaultValue||{}},...e}),Vx=(e={})=>({type:"string",cmsType:"publishStatus",persist:!0,attribute:!0,defaultValue:e.defaultValue||"draft",enum:["draft","published","scheduled"],index:!0,...e}),Bx=(e={})=>({type:"string",cmsType:"locale",persist:!0,attribute:!0,defaultValue:e.defaultValue||"en",index:!0,immutable:!0,...e}),Wx=(e={})=>({type:"string",cmsType:"canonicalId",persist:!0,attribute:!1,defaultValue:null,index:!0,immutable:!0,...e}),qx={types:{richText:zx,media:Ux,seo:Nx,publishStatus:Vx,locale:Bx,canonicalId:Wx}},Fc=qx});var Oc,Lc=y(()=>{V();Dc();u.registerExtension(Fc);Oc={templates:{$adapter:"indexeddb",id:u.string({required:!0}),name:u.string({required:!0}),version:u.string({required:!0}),description:u.string({defaultValue:""}),icon:u.string({defaultValue:"layout-template"}),routes:u.object({attribute:!1,defaultValue:{}}),schema:u.object({attribute:!1,defaultValue:{}}),components:u.object({attribute:!1,defaultValue:{}}),files:u.array({defaultValue:[]}),installedAt:u.timestamp()},websites:{$adapter:"indexeddb",id:u.string({required:!0}),name:u.string({required:!0}),slug:u.string({required:!0,index:!0}),description:u.string({defaultValue:""}),templateId:u.string({index:!0}),config:u.object({attribute:!1,defaultValue:{theme:{},contentTypes:{},languages:{},features:{}}}),customDomain:u.string(),deployTarget:u.string({defaultValue:""}),createdAt:u.timestamp(),updatedAt:u.timestamp({update:!0})},media:{$adapter:"indexeddb",id:u.string({required:!0}),url:u.string({required:!0}),name:u.string({required:!0}),alt:u.string({defaultValue:""}),size:u.number({defaultValue:0}),type:u.string({defaultValue:"image/jpeg"}),width:u.number(),height:u.number(),folder:u.string({defaultValue:"",index:!0}),tags:u.array({defaultValue:[],index:!0}),createdAt:u.timestamp(),updatedAt:u.timestamp({update:!0})}}});var zc,Uc=y(()=>{V();zc={releases:{$adapter:"indexeddb",version:u.string({index:!0}),notes:u.string(),status:u.string({enum:["pending","success","failed"],defaultValue:"pending"}),deployType:u.string({enum:["spa","ssg","hybrid","worker"],defaultValue:"hybrid"}),deployTarget:u.string({enum:["github","cloudflare","cloudflare-pages","localhost","vps","zip","targz"],defaultValue:"localhost"}),deployedAt:u.string(),files:u.array(),result:u.object(),buildId:u.string(),buildDuration:u.number()}}});var Nc={};Ee(Nc,{default:()=>Hx});var Hx,Vc=y(()=>{jc();Do();Lc();Uc();kr();Hx={agent:{models:Mc,namespace:!0},ide:{models:$r,namespace:!1},cms:{models:Oc,namespace:!0},devops:{models:zc,namespace:!0},__project__:{models:Tc,namespace:!1}}});var Bc,Wc=y(()=>{Bc={}});var qc={};Ee(qc,{default:()=>Yx});var Yx,Hc=y(()=>{Wc();Yx={__project__:{data:Bc,namespace:!1}}});var Oo={};Ee(Oo,{loadComponentMappings:()=>Qx});async function Qx(){let e={};if(!Ts?.manifest)return console.warn("[discovery] No manifest available - component discovery disabled"),e;let t=Ts.manifest,n=t.components;if(n)for(let[r,i]of Object.entries(n))if(typeof i=="object"&&!Array.isArray(i))e[r]={base:"/",paths:i};else{let o=Array.isArray(i)?i:[i];e[r]={base:"/",folders:o.map(a=>a.endsWith("/")?a:a+"/")}}let s=t.packages||{};Ts.events?.emit?.("DISCOVERY:MANIFEST_LOADED",{packages:Object.keys(s)});for(let[r,i]of Object.entries(s)){let o=i.components;if(o){for(let[a,l]of Object.entries(o))if(!e[a])if(typeof l=="object"&&!Array.isArray(l))e[a]={base:`/node_modules/@bootstrapp/${r}/`,paths:l};else{let c=Array.isArray(l)?l:[l];e[a]={base:`/node_modules/@bootstrapp/${r}/`,folders:c.map(d=>d.endsWith("/")?d:d+"/")}}}}return Ts.events?.emit?.("DISCOVERY:MAPPINGS_READY",{prefixes:Object.keys(e)}),e}var Ts,Lo=y(async()=>{Ts=null;try{Ts=(await Promise.resolve().then(()=>(Ue(),Sr))).default}catch{}});var Sr={};Ee(Sr,{createCollection:()=>xn,default:()=>j});function xn(e={}){let t={...e},n=(i,o)=>!i||typeof i!="object"||Array.isArray(i)||!o||typeof o!="object"||Array.isArray(o)?o:{...i,...o},s={get(i,o){return o==="set"?(...a)=>{if(a.length===1&&typeof a[0]=="object"&&a[0]!==null)for(let[l,c]of Object.entries(a[0]))t[l]=n(t[l],c);else a.length===2&&typeof a[0]=="string"&&(t[a[0]]=a[1]);return r}:o==="get"?(a,l)=>l!==void 0?t[a]?.[l]:t[a]:o==="remove"?(...a)=>(a.length===2?delete t[a[0]]?.[a[1]]:delete t[a[0]],r):o==="keys"?()=>Object.keys(t):o==="values"?()=>Object.values(t):o==="entries"?()=>Object.entries(t):o==="has"?a=>a in t:o==="_isCollection"?!0:o==="_data"?t:t[o]},set(i,o,a){return t[o]=a,!0},has(i,o){return o in t||["set","get","remove","keys","values","entries","has"].includes(o)},ownKeys(){return Reflect.ownKeys(t)},getOwnPropertyDescriptor(i,o){if(o in t)return{enumerable:!0,configurable:!0,value:t[o]}}},r=new Proxy({},s);return r}var No,zo,Uo,Kx,Jn,j,Ue=y(()=>{rt();No=typeof ServiceWorkerGlobalScope<"u"&&globalThis instanceof ServiceWorkerGlobalScope?"serviceworker":typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope?"worker":"frontend";globalThis.sleep=(e=0)=>new Promise(t=>setTimeout(t,e));zo={async fetchResource(e,t,n){try{let s=await fetch(e);if(this[e]={path:e,extension:n},s.ok)return await t(s)}catch(s){Jn.events?.emit("FS:RESOURCE_NOT_FOUND",{path:e,error:s})}return null},text(e){return zo.fetchResource(e,t=>t.text(),"text")},json(e){return zo.fetchResource(e,t=>t.json(),"json")},getFilePath(e){return`${Jn.manifest?.basePath||""}${e.startsWith("/")?e:`/${e}`}`},getRequestPath(e){let t=new URL(e);return t.pathname+t.search}},Uo={events:ne,app:{},assetFiles:new Set,components:xn(),data:xn(),devFiles:new Set,fs:zo,models:xn(),modules:xn(),routes:xn()};No==="frontend"&&(Uo.icons={alias:"Icons",base:new Map(Object.entries(globalThis.__icons||{}))},Uo.theme={base:xn({icon:{family:"lucide"}}),events:({context:e})=>({moduleAdded({module:t}){t.theme&&(e[t.name]=t.theme)}})});Kx={async load(e,t=!1,n){if(globalThis.__BOOTSTRAPP_MANIFEST__){let s=globalThis.__BOOTSTRAPP_MANIFEST__;this.manifest=s,await this.bootstrap({theme:s.theme,production:e,backend:t,initFn:n});return}try{let s=await fetch("/.bootstrapp.json");if(!s.ok)throw new Error(`HTTP error! status: ${s.status}`);let r=await s.json();this.manifest=r,await this.bootstrap({theme:r.theme,production:e,backend:t,initFn:n})}catch(s){console.error("[bootstrapp] Load failed:",s),this.events.emit("APP:BOOTSTRAP_ERROR",{error:s})}},async bootstrap({backend:e=!1,production:t=!1,theme:n,initFn:s}={}){if(Object.assign(this.manifest,{backend:e,runtime:No,frontend:!e,production:t,dev:!t}),!e&&n)for(let[r,i]of Object.entries(n))this.theme.set(r,i);this.manifest?.apiUrl&&(this.apiUrl=this.manifest.apiUrl);try{console.log("[bootstrapp] bootstrap: importing /index.js..."),await Promise.resolve().then(()=>(Pc(),Mx)),console.log("[bootstrapp] bootstrap: loadModuleSchemas..."),await this.loadModuleSchemas(),s&&(console.log("[bootstrapp] bootstrap: running initFn..."),await s()),console.log("[bootstrapp] bootstrap: emitting APP:INIT..."),await this.events.emit("APP:INIT"),console.log("[bootstrapp] bootstrap: APP:INIT complete")}catch(r){console.error("[bootstrapp] Bootstrap failed:",r),this.events.emit("APP:BOOTSTRAP_ERROR",{error:r})}return this},async loadModuleSchemas(){if(!this.manifest)return;let{namespaceModels:e}=await Promise.resolve().then(()=>(Fo(),jo)),t;try{({default:t}=await Promise.resolve().then(()=>(Vc(),Nc)))}catch(n){this.events.emit("SCHEMA:LOAD_FAILED",{package:"/schemas.js",error:n});return}for(let[n,s]of Object.entries(t||{})){if(!s?.models)continue;let r=n==="__project__",i=r?"project":`@bootstrapp/${n}`;try{let o=!r&&s.namespace?n:null,a=e(s.models,o);this.models.set(a),r||(this.manifest[n]||(this.manifest[n]={}),this.manifest[n].models=Object.keys(a)),this.events.emit("SCHEMA:LOADED",{package:i,namespace:o})}catch(o){this.events.emit("SCHEMA:LOAD_FAILED",{package:i,error:o})}}},async loadModuleData(){if(!this.manifest)return;if(this.manifest.dev===!1){if(!this.manifest.seedEnabled)return;try{let n=await fetch("/models/seed.prod.json");if(n.ok){let s=await n.json();this.data.set(s),this.events.emit("SEED:LOADED",{package:"production",mode:"prod"})}}catch{}return}let{namespaceData:e}=await Promise.resolve().then(()=>(Fo(),jo)),t;try{({default:t}=await Promise.resolve().then(()=>(Hc(),qc)))}catch(n){this.events.emit("SEED:LOAD_FAILED",{package:"/seeds.js",error:n}),t={}}for(let[n,s]of Object.entries(t||{}))if(s?.data)try{let r=s.namespace?n:null,i=e(s.data,r);this.data.set(i),this.events.emit("SEED:LOADED",{package:n==="__project__"?"project":`@bootstrapp/${n}`,namespace:r})}catch(r){this.events.emit("SEED:LOAD_FAILED",{package:n==="__project__"?"project":`@bootstrapp/${n}`,error:r})}},async refreshManifest(){if(this.SW?.refreshManifest)try{let e=await this.SW.refreshManifest();if(e.success&&e.manifest){this.manifest=e.manifest;let{loadComponentMappings:t}=await Lo().then(()=>Oo),n=await t();this.Loader&&this.Loader.initMappings(n),this.events.emit("MANIFEST:REFRESHED",{manifest:e.manifest})}return e}catch(e){return this.events.emit("MANIFEST:REFRESH_ERROR",{error:e}),{success:!1,error:e.message}}try{let e=await fetch("/.bootstrapp.json");if(!e.ok)throw new Error(`HTTP ${e.status}`);let t=await e.json();return this.manifest=t,this.events.emit("MANIFEST:REFRESHED",{manifest:t}),{success:!0,manifest:t}}catch(e){return this.events.emit("MANIFEST:REFRESH_ERROR",{error:e}),{success:!1,error:e.message}}},addModule(e){if(e.dev&&!this.manifest?.dev||this.modules?.has(e.name))return;let{alias:t,name:n,events:s,base:r={}}=e;if(this.modules?.set(n,e),this[n]=r,t&&(this[t]=r),s){let o=typeof s=="function"?s({$APP:this,context:r}):s;for(let[a,l]of Object.entries(o))this.events.on(a,l)}let i=this.events.get("moduleAdded")||[];for(let o of i)o.call(r,{module:e});return this.events.emit("MODULE:ADDED",{name:e.name}),r}},Jn=Object.create(Kx);Jn.manifest={runtime:No,dev:!0,backend:!1,frontend:!0,basePath:"",trace:{stack:!1,timing:!1,source:!1}};for(let[e,t={}]of Object.entries(Uo))Jn.addModule({name:e,...t.base?t:{base:t}});globalThis.$APP=Jn;j=Jn});function nu(e,t){if(!Yo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qc!==void 0?Qc.createHTML(t):t}function $n(e,t,n=e,s){if(t===At)return t;let r=s!==void 0?n._$Co?.[s]:n._$Cl,i=js(t)?void 0:t._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(e),r._$AT(e,n,s)),s!==void 0?(n._$Co??=[])[s]=r:n._$Cl=r),r!==void 0&&(t=$n(e,r._$AS(e,t.values),r,s)),t}var Wo,Yc,_r,Qc,qo,Dt,Ho,Gx,kn,Ms,js,Yo,eu,Vo,Ps,Kc,Gc,vn,Jc,Xc,tu,Qo,p,Ko,Go,At,ae,Zc,wn,su,Bo,iu,Ar,Fs,au,lu,cu,uu,Jo,Jx,Xo,gt=y(()=>{Wo=globalThis,Yc=e=>e,_r=Wo.trustedTypes,Qc=_r?_r.createPolicy("lit-html",{createHTML:e=>e}):void 0,qo="$lit$",Dt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ho="?"+Dt,Gx=`<${Ho}>`,kn=document,Ms=()=>kn.createComment(""),js=e=>e===null||typeof e!="object"&&typeof e!="function",Yo=Array.isArray,eu=e=>Yo(e)||typeof e?.[Symbol.iterator]=="function",Vo=`[ 	
\f\r]`,Ps=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Kc=/-->/g,Gc=/>/g,vn=RegExp(`>|${Vo}(?:([^\\s"'>=/]+)(${Vo}*=${Vo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Jc=/'/g,Xc=/"/g,tu=/^(?:script|style|textarea|title)$/i,Qo=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),p=Qo(1),Ko=Qo(2),Go=Qo(3),At=Symbol.for("lit-noChange"),ae=Symbol.for("lit-nothing"),Zc=new WeakMap,wn=kn.createTreeWalker(kn,129);su=(e,t)=>{let n=e.length-1,s=[],r,i=t===2?"<svg>":t===3?"<math>":"",o=Ps;for(let a=0;a<n;a++){let l=e[a],c,d,h=-1,f=0;for(;f<l.length&&(o.lastIndex=f,d=o.exec(l),d!==null);)f=o.lastIndex,o===Ps?d[1]==="!--"?o=Kc:d[1]!==void 0?o=Gc:d[2]!==void 0?(tu.test(d[2])&&(r=RegExp("</"+d[2],"g")),o=vn):d[3]!==void 0&&(o=vn):o===vn?d[0]===">"?(o=r??Ps,h=-1):d[1]===void 0?h=-2:(h=o.lastIndex-d[2].length,c=d[1],o=d[3]===void 0?vn:d[3]==='"'?Xc:Jc):o===Xc||o===Jc?o=vn:o===Kc||o===Gc?o=Ps:(o=vn,r=void 0);let m=o===vn&&e[a+1].startsWith("/>")?" ":"";i+=o===Ps?l+Gx:h>=0?(s.push(c),l.slice(0,h)+qo+l.slice(h)+Dt+m):l+Dt+(h===-2?a:m)}return[nu(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},Bo=class ru{constructor({strings:t,_$litType$:n},s){let r;this.parts=[];let i=0,o=0,a=t.length-1,l=this.parts,[c,d]=su(t,n);if(this.el=ru.createElement(c,s),wn.currentNode=this.el.content,n===2||n===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=wn.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(qo)){let f=d[o++],m=r.getAttribute(h).split(Dt),g=/([.?@])?(.*)/.exec(f);l.push({type:1,index:i,name:g[2],strings:m,ctor:g[1]==="."?au:g[1]==="?"?lu:g[1]==="@"?cu:Fs}),r.removeAttribute(h)}else h.startsWith(Dt)&&(l.push({type:6,index:i}),r.removeAttribute(h));if(tu.test(r.tagName)){let h=r.textContent.split(Dt),f=h.length-1;if(f>0){r.textContent=_r?_r.emptyScript:"";for(let m=0;m<f;m++)r.append(h[m],Ms()),wn.nextNode(),l.push({type:2,index:++i});r.append(h[f],Ms())}}}else if(r.nodeType===8)if(r.data===Ho)l.push({type:2,index:i});else{let h=-1;for(;(h=r.data.indexOf(Dt,h+1))!==-1;)l.push({type:7,index:i}),h+=Dt.length-1}i++}}static createElement(t,n){let s=kn.createElement("template");return s.innerHTML=t,s}};iu=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,s=(e?.creationScope??kn).importNode(t,!0);wn.currentNode=s;let r=wn.nextNode(),i=0,o=0,a=n[0];for(;a!==void 0;){if(i===a.index){let l;a.type===2?l=new Ar(r,r.nextSibling,this,e):a.type===1?l=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(l=new uu(r,this,e)),this._$AV.push(l),a=n[++o]}i!==a?.index&&(r=wn.nextNode(),i++)}return wn.currentNode=kn,s}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},Ar=class ou{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,s,r){this.type=2,this._$AH=ae,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=$n(this,t,n),js(t)?t===ae||t==null||t===""?(this._$AH!==ae&&this._$AR(),this._$AH=ae):t!==this._$AH&&t!==At&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):eu(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ae&&js(this._$AH)?this._$AA.nextSibling.data=t:this.T(kn.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Bo.createElement(nu(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(n);else{let i=new iu(r,this),o=i.u(this.options);i.p(n),this.T(o),this._$AH=i}}_$AC(t){let n=Zc.get(t.strings);return n===void 0&&Zc.set(t.strings,n=new Bo(t)),n}k(t){Yo(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,s,r=0;for(let i of t)r===n.length?n.push(s=new ou(this.O(Ms()),this.O(Ms()),this,this.options)):s=n[r],s._$AI(i),r++;r<n.length&&(this._$AR(s&&s._$AB.nextSibling,r),n.length=r)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let s=Yc(t).nextSibling;Yc(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Fs=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,s,r){this.type=1,this._$AH=ae,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ae}_$AI(e,t=this,n,s){let r=this.strings,i=!1;if(r===void 0)e=$n(this,e,t,0),i=!js(e)||e!==this._$AH&&e!==At,i&&(this._$AH=e);else{let o=e,a,l;for(e=r[0],a=0;a<r.length-1;a++)l=$n(this,o[n+a],t,a),l===At&&(l=this._$AH[a]),i||=!js(l)||l!==this._$AH[a],l===ae?e=ae:e!==ae&&(e+=(l??"")+r[a+1]),this._$AH[a]=l}i&&!s&&this.j(e)}j(e){e===ae?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},au=class extends Fs{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ae?void 0:e}},lu=class extends Fs{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ae)}},cu=class extends Fs{constructor(e,t,n,s,r){super(e,t,n,s,r),this.type=5}_$AI(e,t=this){if((e=$n(this,e,t,0)??ae)===At)return;let n=this._$AH,s=e===ae&&n!==ae||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==ae&&(n===ae||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},uu=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){$n(this,e)}},Jo={M:qo,P:Dt,A:Ho,C:1,L:su,R:iu,D:eu,V:$n,I:Ar,H:Fs,N:lu,U:cu,B:au,F:uu},Jx=Wo.litHtmlPolyfillSupport;Jx?.(Bo,Ar),(Wo.litHtmlVersions??=[]).push("3.3.2");Xo=(e,t,n)=>{let s=n?.renderBefore??t,r=s._$litPart$;if(r===void 0){let i=n?.renderBefore??null;s._$litPart$=r=new Ar(t.insertBefore(Ms(),i),i,void 0,n??{})}return r._$AI(e),r};});var du={};Ee(du,{_$LH:()=>Jo,html:()=>p,mathml:()=>Go,noChange:()=>At,nothing:()=>ae,render:()=>Xo,svg:()=>Ko});var H=y(()=>{gt()});var pu={};Ee(pu,{default:()=>F,settings:()=>Xn});var hu,Xx,Xn,Zo,F,Zt=y(()=>{V();H();hu=["__proto__","constructor","prototype"],Xx=new Set(["properties","icons","static","formAssociated","dataQuery","style","css","connected","disconnected","shadow","willUpdate","firstUpdated","updated","dataLoaded","class","role","tag"]),Xn={},Zo=class e extends HTMLElement{static properties={};static components=new Map;static _attrs={};static plugins=[];static shadowStylesInjected=new WeakMap;state={};hasUpdated=!1;_ignoreAttributeChange=!1;_changedProps=new Map;_updatePromise=null;static createClass(t,n,s){if(s||=e,typeof n=="function"){let v=n;n={properties:v.properties||{},render(){return v.call(this,this)}}}let{properties:r={},icons:i,static:o,formAssociated:a=!1,dataQuery:l=!1,style:c=!1,css:d,connected:h,disconnected:f,shadow:m,willUpdate:g,firstUpdated:b,updated:_,dataLoaded:R,class:D,role:M}=n,K={};for(let v of Object.keys(n)){if(Xx.has(v)||hu.includes(v))continue;let S=Object.getOwnPropertyDescriptor(n,v);Object.defineProperty(K,v,S)}let ee=Object.keys(K).filter(v=>!Object.getOwnPropertyDescriptor(K,v).get),Y=new Map;[...e.plugins,...s.plugins].forEach(v=>{Y.set(v.name,v)});let A=[...Y.values()],C=class extends s{static icons=i;static style=c;static css=d;static dataQuery=l;static formAssociated=a;static shadow=m??s.shadow;static plugins=A;static _classTags=(()=>{let v=[],S=s;for(;S?.tag;)v.unshift(S.tag),S=Object.getPrototypeOf(S);return v.push(t),v})();constructor(){super(),ee.forEach(v=>{typeof this[v]=="function"&&(this[v]=this[v].bind(this))}),D&&this.classList.add(...D.split(" ")),M&&this.setAttribute("role",M)}static get observedAttributes(){return Object.keys(C.properties).filter(v=>C.properties[v].attribute!==!1)}static properties=(()=>{let S={...s.properties||{}};for(let w of Object.keys(r)){if(hu.includes(w))continue;let P=r[w];P.type==="object"&&P.properties&&(P.properties=S[w]?.properties?{...S[w]?.properties,...P.properties}:P.properties),S[w]=S[w]?{...S[w],...P}:{...P}}return S})()};o&&typeof o=="object"&&Object.assign(C,o),Object.defineProperty(C,"name",{value:t});for(let[v,S]of Object.entries(C.properties)){let{type:w,sync:P,attribute:B,setter:J,getter:te}=S;P||Object.hasOwn(C.prototype,v)||Object.defineProperty(C.prototype,v,{configurable:!0,enumerable:!0,get:te?function(){return te.call(this)}:function(){return this.state[v]},set:J?function(se){J.call(this,se)}:function(se){let oe=this.state[v];oe!==se&&(this.state[v]=se,B&&this.updateAttribute({key:v,value:se,skipPropUpdate:!0,type:w}),this.requestUpdate(v,oe))}})}for(let v of Object.keys(K)){if(Object.hasOwn(C.properties,v))continue;let S=Object.getOwnPropertyDescriptor(K,v);S.get||S.set?Object.defineProperty(C.prototype,v,{configurable:!0,enumerable:!0,get:S.get,set:S.set}):C.prototype[v]=S.value}return C.tag=t,C._attrs=Object.fromEntries(Object.keys(C.properties).map(v=>[v.toLowerCase(),v])),C.plugins=[...C.plugins.filter(v=>!v.test||v.test({component:C}))],C.plugins.push({events:{connected:h,disconnected:f,willUpdate:g,firstUpdated:b,updated:_,dataLoaded:R},name:"base"}),C}static define(t,n){let s,r=typeof n?.extends=="string"?n.extends:null;r&&(s=customElements.get(r)||e.components.get(r)?._constructor,s||console.warn(`[View.define] unresolved extends: ${r} for ${t}`));let i=e.createClass(t,n,s);customElements.get(t)||customElements.define(t,i);let o=e.components.get(t)||{};return o._constructor=i,o.definition=n,e.components.set(t,o),i}on(t,n){if(t.includes("#")){let[r,i]=t.split("#"),o=a=>{let l=a.target.closest(r);l&&this.contains(l)&&n(a)};return this.addEventListener(i,o),o}let s=({detail:r})=>{n(r)};return this.addEventListener(t,s),s}off(t,n){if(t.includes("#")){let[,s]=t.split("#");this.removeEventListener(s,n)}else this.removeEventListener(t,n)}emit(t,n){let s=new CustomEvent(t,{detail:n});this.dispatchEvent(s)}$=t=>this.querySelector(t);$$=t=>this.querySelectorAll(t);connectedCallback(){if(window.__HYDRATE_MODE__&&this.hasAttribute("client:render")&&(this.removeAttribute("client:render"),this.innerHTML="",this.shadowRoot&&(this.shadowRoot.innerHTML="")),this.constructor.shadow){let t=this._ensureShadowRoot();if(this.constructor.css&&!t.querySelector("style[data-component-style]")){let n=document.createElement("style");n.setAttribute("data-component-style",""),n.textContent=this.constructor.css,t.prepend(n)}}this.constructor.properties&&this.initProps(),this.constructor._classTags.length>0&&this.classList.add(...this.constructor._classTags);for(let t of this.constructor.plugins){let{events:n={}}=t;Object.entries(n).map(([s,r])=>r&&this.on(s,r.bind(this)))}this.emit("connected",{instance:this,component:this.constructor,tag:this.constructor.tag}),this.requestUpdate()}disconnectedCallback(){this.emit("disconnected",{instance:this,component:this.constructor,tag:this.constructor.tag})}initProps(){for(let t of this.attributes){let n=this.constructor._attrs[t.name],s=this.constructor.properties[n];if(s&&s.type!=="boolean"&&t.value===""){this.removeAttribute(t.name);continue}n&&(this.state[n]=s?u.parse(t.value,{...s,attribute:!0}):t.value)}for(let[t,n]of Object.entries(this.constructor.properties)){let{type:s,sync:r,defaultValue:i,attribute:o}=n;if(r)continue;if(Object.hasOwn(this,t)){let c=this[t];delete this[t],this[t]=c;continue}this.state[t]??=i;let a=this.state[t],l=["array","object","function"].includes(s);o&&a!==void 0&&!this.hasAttribute(t)&&!l&&this.updateAttribute({key:t,value:a,skipPropUpdate:!0,type:s}),this._changedProps.set(t,void 0)}}requestUpdate(t,n){return t&&this._changedProps.set(t,n),this._updatePromise?this._updatePromise:(this._updatePromise=this.enqueueUpdate(),this._updatePromise)}async enqueueUpdate(){await new Promise(n=>requestAnimationFrame(n));let t=this.performUpdate(!1);return this._updatePromise=null,t}performUpdate(t){let n=this._changedProps;this._changedProps=new Map;let s=this.shouldUpdate(n,t);if(!s)return;this.emit("willUpdate",{changedProps:s,instance:this,component:this.constructor}),this.update(s);let r=!this.hasUpdated;r&&(this.hasUpdated=!0);for(let[i,o]of s)this.emit(`${i}Changed`,{oldValue:o,value:this[i],instance:this,component:this.constructor});r&&this.emit("firstUpdated",{changedProps:s,instance:this,component:this.constructor}),this.emit("updated",{changedProps:s,instance:this,component:this.constructor})}shouldUpdate(t,n){if(!this.hasUpdated||n)return t;let s=new Map;for(let[r,i]of t){let o=this[r],a=this.constructor.properties[r];(a?.hasChanged?a.hasChanged(o,i):i!==o)&&s.set(r,i)}return s.size>0?s:null}_ensureShadowRoot(){if(!this.shadowRoot){let t={mode:"open",serializable:!0};typeof this.constructor.shadow=="object"&&Object.assign(t,this.constructor.shadow),this.attachShadow(t)}return this.shadowRoot}update(){let t=this.constructor.shadow?this._ensureShadowRoot():this;if(window.__HYDRATE_MODE__&&!this.hasUpdated&&t.children.length>0&&(window.__HYDRATE_MODE__==="full"||this.hasAttribute("client:hydrate"))){this._wasHydrated=!0,console.error("return without update");return}this._wasHydrated&&(t.innerHTML="",this._wasHydrated=!1,console.error("update for second time, removing innerHTML")),Xo(this.render(),t)}render(){return null}attributeChangedCallback(t,n,s){n!==s&&(this.emit("attributeChangedCallback",{instance:this,component:this.constructor,key:t,value:s,oldValue:n}),!this._ignoreAttributeChange&&(this.state[t]=u.parse(s,this.constructor.properties[t]),this.hasUpdated&&this.requestUpdate(t,n)))}updateAttribute({key:t,value:n,type:s,skipPropUpdate:r=!1}){this._ignoreAttributeChange=r,s&&typeof n!="function"&&(s==="boolean"?n?this.setAttribute(t,""):this.removeAttribute(t):["array","object"].includes(s)?this.setAttribute(t,JSON.stringify(n)):n===null?this.removeAttribute(t):s==="string"&&String(n).trim().length>0&&this.setAttribute(t,String(n))),r?this._ignoreAttributeChange=!1:this[t]=n}},F=Zo});var Zx,Be,ev,en,ea=y(()=>{Zt();Zx=(e,t)=>{let n=F.components.get(e)||{};return Object.assign(n,t),F.components.set(e,n),n},Be={settings:{basePath:"/",modules:{},dev:!1},componentMappings:{},ssgTag:"ce-",configure(e){Object.assign(Be.settings,e||{})},initMappings(e){Be.componentMappings=e},addModule(e){Be.settings.modules[e.name]=e},resolvePath(e){let t=F.components.get(e);if(t?.path)return t.path;let[n,...s]=e.split("-"),r=s.join("-"),i=Be.componentMappings[n];if(!i)return console.warn(`[Loader] No mapping for prefix: ${n}`),null;if(i.paths){let o=i.paths[r];return o?`${i.base}${o}`:(console.warn(`[Loader] Component not found: ${e} (prefix: ${n})`),null)}if(i.folders){let o=i.folders[0];return`${i.base}${o}${r}`}return null},async loadDefinition(e){let t=F.components.get(e);if(t?.definition)return t.definition;let n=t?.path||Be.resolvePath(e);if(!n)return console.error(`[Loader] Path not found for tag: ${e}`),null;if(!Be.settings.dev&&n.startsWith("/node_modules/"))return null;try{let s=n.endsWith(".js")?n:`${n}.js`,{default:r}=await import(s);if(r)return Zx(e,{path:n,definition:r}),r}catch(s){throw console.error(`[Loader] Import failed for ${e} at ${n}:`,s),s}return null},async get(e){if(e=e.toLowerCase(),customElements.get(e)){if(!F.components.get(e)?._constructor){let i=F.components.get(e)||{};i._constructor=customElements.get(e),F.components.set(e,i)}return F.components.get(e)._constructor}let t=F.components.get(e);if(t?._constructor&&!t?.loadPromise)return t._constructor;if(t?.loadPromise)return t.loadPromise;let n=(async()=>{try{let r=await Be.loadDefinition(e);if(!r)throw new Error(`Definition for ${e} not found.`);let i=F,o=r.extends||(r.prototype instanceof HTMLElement?null:void 0);typeof r=="function"&&r.extends&&(o=r.extends),o&&(i=await Be.get(o));let a=F.createClass(e,r,i),l=F.components.get(e)||{};if(l._constructor=a,F.components.set(e,l),i?.plugins)for(let{init:c}of i.plugins)c&&typeof c=="function"&&await c({View:F,component:a,definition:r,tag:e});return(!customElements.get(e)||F.reloadComponents)&&customElements.define(e,a),a}catch(r){console.error(`[Loader] Definition failed for ${e}:`,r);let i=F.components.get(e);return i&&(delete i.loadPromise,F.components.set(e,i)),null}})(),s=F.components.get(e)||{};return s.loadPromise=n,F.components.set(e,s),n},define(...e){if(typeof e[0]=="string"){let t=e[0].toLowerCase(),n=e[1],s=F.components.get(t)||{};s.definition=n,F.components.set(t,s),Be.settings.dev||Be.get(t).catch(r=>console.error(`[Loader] Manual definition failed for ${t}:`,r))}else typeof e[0]=="object"&&e[0]!==null&&Object.entries(e[0]).forEach(([t,n])=>Be.define(t,n))},async traverseDOM(e=document.body){if(!e||typeof e.querySelectorAll!="function")return;let t=e.querySelectorAll(":not(:defined)"),n=new Set;t.forEach(s=>{let r=s.tagName.toLowerCase();r.includes("-")&&!r.startsWith(Be.ssgTag)&&n.add(r)}),await Promise.allSettled(Array.from(n).map(s=>Be.get(s)))},observeDOMChanges(){new MutationObserver(async t=>{let n=new Set;for(let s of t)s.type!=="childList"||s.addedNodes.length===0||s.addedNodes.forEach(r=>{if(r.nodeType!==Node.ELEMENT_NODE)return;let i=o=>{let a=o.tagName.toLowerCase(),l=F.components.get(a);a.includes("-")&&!customElements.get(a)&&!l?.loadPromise&&n.add(a)};i(r),typeof r.querySelectorAll=="function"&&r.querySelectorAll(":not(:defined)").forEach(i)});n.size>0&&await Promise.allSettled(Array.from(n).map(s=>Be.get(s)))}).observe(document.body,{childList:!0,subtree:!0})},initDOM(){Be.traverseDOM(document.body),Be.observeDOMChanges()}},ev=e=>F.components.get(e)?.path||Be.resolvePath(e);F.getComponentPath=ev;en=Be});var tv,nv,fu=y(()=>{Zt();ea();Ue();tv=()=>{let e=document.getElementById("app-loader");e&&(e.classList.add("hidden"),setTimeout(()=>e.remove(),300))},nv=()=>{tv(),en.configure({basePath:j.manifest.basePath||"/",modules:j.modules||{},dev:j.manifest.dev||!1}),en.initDOM()};j.events.on("APP:READY",nv);j.events.set({moduleAdded({module:e}){en.addModule(e)}});j.define=en.define;j.View=F});function Ot(e){return new Zn(e)}function mu(e){return new Ds(e)}function Ls(e){return new Os(e)}function Er(e){Cr++;try{e()}finally{if(Cr--,Cr===0){let t=[...ta];ta.clear();for(let n of t)n._execute()}}}function gu(e){let t=Ge;Ge=null;try{return e()}finally{Ge=t}}var Ge,Cr,ta,Zn,Ds,Os,Rr=y(()=>{Ge=null,Cr=0,ta=new Set,Zn=class{constructor(t){this._value=t,this._subscribers=new Set}get value(){return Ge&&(this._subscribers.add(Ge),Ge._dependencies.add(this)),this._value}set value(t){this._value!==t&&(this._value=t,this._notify())}peek(){return this._value}_notify(){for(let t of this._subscribers)Cr>0?ta.add(t):t._execute()}subscribe(t){let n=Ls(()=>t(this.value));return()=>n._cleanup()}toJSON(){return this._value}toString(){return String(this._value)}valueOf(){return this._value}},Ds=class extends Zn{constructor(t){super(void 0),this._fn=t,this._stale=!0,this._effect=null,this._computing=!1}get value(){if(this._stale&&!this._computing){this._computing=!0;let t=Ge;Ge=this._effect||(this._effect={_execute:()=>{this._stale=!0,this._notify()},_dependencies:new Set,_cleanup:()=>{for(let n of this._effect._dependencies)n._subscribers.delete(this._effect);this._effect._dependencies.clear()}}),this._effect._dependencies.forEach(n=>n._subscribers.delete(this._effect)),this._effect._dependencies.clear();try{this._value=this._fn()}finally{Ge=t,this._stale=!1,this._computing=!1}}return Ge&&(this._subscribers.add(Ge),Ge._dependencies.add(this)),this._value}set value(t){throw new Error("Cannot set value of computed signal")}},Os=class{constructor(t){this._fn=t,this._dependencies=new Set,this._disposed=!1,this._execute()}_execute(){if(this._disposed)return;this._cleanup();let t=Ge;Ge=this;try{this._fn()}finally{Ge=t}}_cleanup(){for(let t of this._dependencies)t._subscribers.delete(this);this._dependencies.clear()}dispose(){this._disposed=!0,this._cleanup()}}});function bu(e={}){let t={};for(let[s,r]of Object.entries(e))t[s]=Ot(r);let n={get(s){return t[s]||(t[s]=Ot(void 0)),t[s].value},set(s,r){return t[s]?t[s].value=r:t[s]=Ot(r),r},update(s){Er(()=>{for(let[r,i]of Object.entries(s))this.set(r,i)})},getSignal(s){return t[s]||(t[s]=Ot(void 0)),t[s]},subscribe(s,r){return this.getSignal(s).subscribe(r)},keys(){return Object.keys(t)},toObject(){let s={};for(let r of Object.keys(t))s[r]=t[r].value;return s}};return new Proxy(n,{get(s,r){if(r in s)return s[r];if(typeof r=="string"&&r[0]!=="_")return s.get(r)},set(s,r,i){return typeof r=="string"&&r[0]!=="_"?(s.set(r,i),!0):!1}})}var yu=y(()=>{Rr()});var es,na,sa=y(()=>{Rr();es=e=>{let t=new Map,n=new Map;return e.on=(s,r)=>(t.has(s)||t.set(s,new Set),t.get(s).add(r),()=>t.get(s)?.delete(r)),e.off=(s,r)=>{t.get(s)?.delete(r)},e.emit=(s,r,i)=>{t.get(s)?.forEach(o=>o(r,i))},e.hasListeners=s=>t.has(s)&&t.get(s).size>0,e.signal=(s,r)=>{if(n.has(s))return n.get(s);let i=e.get(s)??r,o=Ot(i);return Ls(()=>{let a=o.value;a!==e.get(s)&&e.set(s,a)}),e.on(s,a=>{a!==o.peek()&&(o.value=a??r)}),n.set(s,o),o},e._listeners=t,e._signals=n,e},na=(e,t)=>{let n=["get","set","remove","has","keys","entries","on","off","emit","hasListeners","signal"],s={get name(){return e}};for(let r of n)s[r]=(...i)=>t()[r](...i);return s}});function iv(){return!ra&&typeof window<"u"&&(ra=xu(window.localStorage,"local")),ra||Ct}function ov(){return!ia&&typeof window<"u"&&(ia=xu(window.sessionStorage,"session")),ia||Ct}var sv,rv,xu,Sn,Ct,ra,ia,Ir,Tr,oa=y(()=>{sa();sv=e=>typeof e=="object"&&e!==null||Array.isArray(e)?JSON.stringify(e):e,rv=e=>{try{return JSON.parse(e)}catch{return e}},xu=(e,t)=>{let n=es({name:t,get(s){let r=e.getItem(s);return r!==null?rv(r):null},set(s,r){return e.setItem(s,sv(r)),n.emit(s,r),{key:s}},remove(s){return e.removeItem(s),n.emit(s,void 0),{key:s}},has(s){return e.getItem(s)!==null},keys(){return Object.keys(e)},entries(){return Object.keys(e).map(s=>[s,n.get(s)])}});return n},Sn=new Map,Ct=es({name:"memory",get(e){return Sn.get(e)},set(e,t){return Sn.set(e,t),Ct.emit(e,t),{key:e}},remove(e){return Sn.delete(e),Ct.emit(e,void 0),{key:e}},has(e){return Sn.has(e)},keys(){return[...Sn.keys()]},entries(){return[...Sn.entries()]},clear(){Sn.clear(),Ct._listeners.clear(),Ct._signals.clear()}}),ra=null,ia=null;Ir=na("local",iv),Tr=na("session",ov)});function Pr(){typeof window>"u"||window.addEventListener("popstate",()=>{bt.syncFromUrl(),yt.syncFromUrl()})}var bt,zs,av,yt,aa=y(()=>{sa();bt=es({name:"querystring",get(e){return typeof window>"u"?null:new URLSearchParams(window.location.search).get(e)},set(e,t){if(typeof window>"u")return{key:e};let n=new URLSearchParams(window.location.search);t==null?n.delete(e):n.set(e,t);let s=n.toString(),r=s?`${window.location.pathname}?${s}`:window.location.pathname;return window.history?.pushState?.({},"",r),bt.emit(e,t),{key:e}},remove(e){return this.set(e,null)},has(e){return typeof window>"u"?!1:new URLSearchParams(window.location.search).has(e)},keys(){return typeof window>"u"?[]:[...new URLSearchParams(window.location.search).keys()]},entries(){return typeof window>"u"?[]:[...new URLSearchParams(window.location.search).entries()]},syncFromUrl(){let e=new Map(this.entries()),t=new Set(bt._listeners.keys());e.forEach((n,s)=>{bt.emit(s,n),t.delete(s)}),t.forEach(n=>bt.emit(n,void 0))}});bt.listeners=bt._listeners;zs=()=>{if(typeof window>"u")return new URLSearchParams;let e=window.location.hash.substring(1);return new URLSearchParams(e)},av=e=>{if(typeof window>"u")return;let t=e.toString();window.location.hash=t},yt=es({name:"hash",get(e){return zs().get(e)},set(e,t){let n=zs();return t==null?n.delete(e):n.set(e,t),av(n),yt.emit(e,t),{key:e}},remove(e){return this.set(e,null)},has(e){return zs().has(e)},keys(){return[...zs().keys()]},entries(){return[...zs().entries()]},syncFromUrl(){let e=new Map(this.entries()),t=new Set(yt._listeners.keys());e.forEach((n,s)=>{yt.emit(s,n),t.delete(s)}),t.forEach(n=>yt.emit(n,void 0))}});yt.listeners=yt._listeners});function wu(e,t,n){Object.defineProperty(e,t,{get:()=>e.state[t],set:s=>{let r=e.state[t];r!==s&&(e.state[t]=s,n&&n(s),e.requestUpdate(t,r))}})}function Mr(e,t){vu.set(e,t)}function jr(e){if(typeof e=="string")return{adapter:e,syncObj:null};for(let[t,n]of vu)if(t(e))return n(e);return e?.$sync?{adapter:e.$sync.adapter,syncObj:e.$sync}:null}function Fr(e){return typeof e?.getAll=="function"}function la(e,t,n){let{scope:s}=t;if(!s)return e;if(s.includes(".")){let[r,i]=s.split(".");if(n[r]?.[i])return`${n[r][i]}:${e}`}return n[s]?`${n[s]}:${e}`:e}function Lt(e,t,n){let s=e.state[t];e.state[t]=n,e.isConnected&&e.requestUpdate(t,s)}function ku(e){let t=new Map(e.entries()),n=new Set(e.listeners.keys());t.forEach((s,r)=>{e.emit(r,s),n.delete(r)}),n.forEach(s=>e.emit(s,void 0))}function Dr({instance:e,key:t,prop:n,syncObj:s,onAsyncLoad:r}){if(e._customSyncUnsubscribers||=[],e._syncReloaders||={},wu(e,t,i=>{!n.query&&i!==s.get(t)&&s.set(t,i)}),r&&n.query)Lt(e,t,n.defaultValue),n.dependsOn&&(e._syncReloaders[t]=()=>{let i=e._customSyncUnsubscribers.findIndex(o=>o._syncKey===t);i>-1&&(e._customSyncUnsubscribers[i](),e._customSyncUnsubscribers.splice(i,1)),r({instance:e,key:t,prop:n,syncObj:s,updateState:Lt})}),r({instance:e,key:t,prop:n,syncObj:s,updateState:Lt});else{let i=s.get(t);e._customSyncUnsubscribers.push(s.subscribe(t,o=>Lt(e,t,o))),Lt(e,t,i??n.defaultValue)}}function Or(e,t,n){e._syncReloaders&&Object.entries(t.properties||{}).filter(([,s])=>s.sync&&s.dependsOn).forEach(([s,r])=>{r.dependsOn.some(o=>n.has(o))&&e._syncReloaders[s]&&e._syncReloaders[s]()})}function Lr({instance:e,key:t,prop:n,adapterName:s,Controller:r,onBroadcast:i}){let o=r[s];if(!o)return;let a=la(t,n,e);i&&s==="local"&&!o.hasListeners(a)&&o.on(a,(c,d)=>{d?.skipBroadcast||i({value:c,sync:s,key:a})});let l=c=>Lt(e,t,c);(e._listeners||={})[s]||={},e._listeners[s][a]=l,wu(e,t,c=>{c!==o.get(a)&&o.set(a,c)}),o.on(a,l),Lt(e,t,o.get(a)??n.defaultValue)}function zr(e,t){e._listeners&&Object.entries(e._listeners).forEach(([n,s])=>{let r=t[n];r&&Object.entries(s).forEach(([i,o])=>r.off(i,o))}),e._customSyncUnsubscribers&&(e._customSyncUnsubscribers.forEach(n=>n()),e._customSyncUnsubscribers=null)}function Ur(e,t,n=null){e._listeners||(e._listeners=new Map),e.subscribe||(e.subscribe=function(i,o){this._listeners.has(i)||this._listeners.set(i,new Set);let a=this._listeners.get(i);return a.add(o),()=>a.delete(o)}),e._notify||(e._notify=function(i,o){this._listeners.has(i)&&this._listeners.get(i).forEach(a=>a(o))});let s=n?new Set(n):null,r=i=>!(s&&!s.has(i));return n&&n.forEach(i=>{let o=Object.getOwnPropertyDescriptor(e,i);if(o&&typeof o.set=="function")return;let a=e[i],l=`_${i}`;e[l]=a,Object.defineProperty(e,i,{get(){return this[l]},set(c){this[l]!==c&&(this[l]=c,this._notify(i,c))},enumerable:!0,configurable:!0})}),{adapter:t,get:i=>{if(r(i))return e[i]},set:(i,o)=>{r(i)&&(e[i]=o)},subscribe:(i,o)=>r(i)?e.subscribe(i,o):()=>{}}}var vu,Us=y(()=>{vu=new Map});function _n(e={}){let t={...lv,...e},n=new Proxy({},{get(s,r){return r in s?s[r]:t[r]}});return n.add=(s,r)=>{typeof s=="object"?Object.assign(t,s):t[s]=r},n.initUrlSync=()=>{$u||($u=!0,Pr())},n}function Ns(e,t={}){let n=t.Controller||_n();return e.plugins.push({name:"syncProps",test:({component:s})=>Object.values(s.properties||{}).some(r=>r.sync),events:{disconnected:({instance:s})=>{zr(s,n)},connected:({instance:s,component:r})=>{Object.entries(r.properties).filter(([,i])=>i.sync).forEach(([i,o])=>{let a=jr(o.sync);a&&(a.syncObj?Dr({instance:s,key:i,prop:o,syncObj:a.syncObj,onAsyncLoad:t.onAsyncLoad&&Fr(a.syncObj)?t.onAsyncLoad:null}):Lr({instance:s,key:i,prop:o,adapterName:a.adapter,Controller:n,onBroadcast:t.onBroadcast}))})},willUpdate:({instance:s,component:r,changedProps:i})=>{Or(s,r,i)}}}),n.initUrlSync(),n}function Su(e,t={}){return Ns(e,t)}var lv,$u,Nr=y(()=>{Us();oa();aa();lv={local:Ir,session:Tr,memory:Ct,querystring:bt,hash:yt},$u=!1});function Vr(e){Mr(t=>t instanceof e,t=>({adapter:t.name,syncObj:t}))}function cv({instance:e,key:t,prop:n,syncObj:s,updateState:r}){(async()=>{let i=n.defaultValue;try{let a=typeof n.query=="function"?n.query(e):n.query;i=n.type==="array"?await s.getAll(a):await(a.id?s.get(a.id,a):s.get(a)),i&&i.subscribe(l=>{let c=Array.isArray(l)?[...l]:{...l};r(e,t,c),e.emit?.("dataLoaded",{instance:e,rows:Array.isArray(c)?c:void 0,row:Array.isArray(c)?void 0:c,property:t})})}catch(a){console.error(`[controller] Sync error for ${t}:`,a)}let o=i?Array.isArray(i)?[...i]:{...i}:n.defaultValue;r(e,t,o),e.emit?.("dataLoaded",{instance:e,rows:Array.isArray(o)?o:void 0,row:Array.isArray(o)?void 0:o,property:t})})()}function Br(e,t,n={}){let s,r,i;t?.plugins!==void 0?(s=t,r=n||{}):(i=t,s=n,r={});let o=i||_n(r.adapters);return e.swEvents?.set?.("SW:PROP_SYNC_UPDATE",({payload:{sync:a,key:l,value:c}})=>{let d=o[a];d&&d.emit?.(l,c,{skipBroadcast:!0})}),Ns(s,{Controller:o,onBroadcast:e.SW?a=>e.SW.postMessage("SW:BROADCAST_SYNCED_PROP",a):null,onAsyncLoad:cv}),e.Controller=o,o}var ca=y(()=>{Us();Nr()});var _u={};Ee(_u,{Computed:()=>Ds,Controller:()=>ua,Effect:()=>Os,Signal:()=>Zn,batch:()=>Er,bindAdapterSync:()=>Lr,bindCustomSync:()=>Dr,checkDependsOn:()=>Or,cleanupSyncBindings:()=>zr,computed:()=>mu,createController:()=>_n,createStore:()=>bu,createSync:()=>Ur,createSyncPlugin:()=>Su,default:()=>An,effect:()=>Ls,getScopedKey:()=>la,getSyncInfo:()=>jr,hash:()=>yt,initControllerApp:()=>Br,initUrlSync:()=>Pr,installViewPlugin:()=>Ns,localStorage:()=>Ir,memoryStorage:()=>Ct,needsAsyncLoad:()=>Fr,querystring:()=>bt,registerModelType:()=>Vr,registerSyncType:()=>Mr,sessionStorage:()=>Tr,signal:()=>Ot,syncUrl:()=>ku,untracked:()=>gu,updateState:()=>Lt});var ua,An,Wr=y(()=>{Rr();yu();oa();aa();Nr();ca();Us();Nr();Us();ua=_n();ua.createSync=Ur;An=ua});function Eu(e){nn=e,navigator.serviceWorker&&(navigator.serviceWorker.onmessage=dv),nn.addModule({name:"swEvents",base:new Map([["EVENT:FORWARD",({payload:n})=>{n?.key&&n?.data&&ne.emit(n.key,n.data)}],["SW:SYNC_PROPS",({payload:n})=>{n?.property&&n?.value!==void 0&&nn.events.emit(`SYNC:${n.property}`,n.value)}],["SW:QUERY_SYNC",({payload:n})=>{nn.events.emit("SYNC:QUERY",n)}],["MANIFEST:UPDATED",async({payload:n})=>{n?.manifest&&(console.log("[HotReload] Manifest updated:",{components:Object.keys(n.manifest.components||{}).length,packages:Object.keys(n.manifest.packages||{}).length}),nn.manifest=n.manifest,nn.events.emit("MANIFEST:UPDATED",n))}]])});let t={postMessage:hv,request:tn,setRegistration:mv,enableAutoUpdates:fv,disableAutoUpdates:Cu,checkForUpdates:Hr,applyUpdate:pv,hasUpdate:gv,getRegistration:bv,enableLocalCaching:()=>tn("SW:ENABLE_LOCAL_CACHING"),disableLocalCaching:()=>tn("SW:DISABLE_LOCAL_CACHING"),clearLocalCache:()=>tn("SW:CLEAR_LOCAL_CACHE"),refreshManifest:()=>tn("SW:REFRESH_MANIFEST"),getManifest:()=>tn("SW:GET_MANIFEST"),invalidateManifest:()=>tn("SW:INVALIDATE_MANIFEST"),cacheManifest:n=>tn("SW:CACHE_MANIFEST",{manifest:n})};return nn.addModule({name:"sw",alias:"SW",base:t,path:"/node_modules/@bootstrapp/sw/views"}),t}var nn,zt,uv,Bs,Ws,qr,Vs,da,dv,hv,tn,Hr,Au,ha,pv,fv,Cu,mv,gv,bv,Ru=y(()=>{rt();zt={},uv=1,Bs=null,Ws=null,qr=null,Vs=null,da=!1,dv=async(e={})=>{let{data:t}=e,{eventId:n,type:s,payload:r}=t;if(n&&zt[n]){try{zt[n].resolve(r)}catch(o){zt[n].reject(new Error(o))}finally{delete zt[n]}return}let i=nn.swEvents.get(s);i&&await i({payload:r})},hv=(e,t)=>{if(!navigator.serviceWorker?.controller){ne.emit("SW:WARN",{type:"no_controller"});return}navigator.serviceWorker.controller.postMessage({type:e,payload:t})},tn=(e,t,n=3e4)=>{if(!navigator.serviceWorker?.controller)return Promise.reject(new Error("No active service worker controller"));let s=`sw-request-${uv++}`;return new Promise((r,i)=>{zt[s]={resolve:r,reject:i};let o=setTimeout(()=>{zt[s]&&(delete zt[s],i(new Error(`SW request timed out after ${n}ms: ${e}`)))},n),a=zt[s].resolve;zt[s].resolve=l=>{clearTimeout(o),a(l)},navigator.serviceWorker.controller.postMessage({type:e,payload:t,eventId:s})})},Hr=async()=>{if(!Bs)return!1;try{return await Bs.update(),!0}catch(e){return ne.emit("SW:WARN",{type:"update_check_failed",error:e}),!1}},Au=e=>{Ws!==e&&(Ws=e,ne.emit("SW:UPDATE_AVAILABLE",{worker:e}))},ha=e=>{if(ne.emit("SW:LOG",{type:"new_worker",state:e.state,hasController:!!navigator.serviceWorker.controller}),e.state==="installed"&&navigator.serviceWorker.controller){Au(e);return}e.addEventListener("statechange",()=>{ne.emit("SW:LOG",{type:"worker_state_change",state:e.state}),e.state==="installed"&&navigator.serviceWorker.controller&&Au(e)},{once:!0})},pv=(e=5e3)=>{if(!Ws)return ne.emit("SW:WARN",{type:"no_waiting_worker"}),!1;if(da)return ne.emit("SW:WARN",{type:"update_in_progress"}),!1;da=!0,Ws.postMessage({type:"SKIP_WAITING"});let t=setTimeout(()=>{ne.emit("SW:ERROR",{type:"update_timeout",timeout:e}),da=!1},e);return navigator.serviceWorker.addEventListener("controllerchange",()=>{clearTimeout(t),window.location.reload()},{once:!0}),!0},fv=(e={})=>{let{onPageLoad:t=!0,pollingInterval:n=0,onVisibilityChange:s=!1}=e;if(!Bs){ne.emit("SW:WARN",{type:"no_registration"});return}Cu(),t&&Hr(),n>0&&(qr=setInterval(Hr,n)),s&&(Vs=()=>{document.visibilityState==="visible"&&Hr()},document.addEventListener("visibilitychange",Vs))},Cu=()=>{qr&&(clearInterval(qr),qr=null),Vs&&(document.removeEventListener("visibilitychange",Vs),Vs=null)},mv=e=>{Bs=e,e.addEventListener("updatefound",()=>{let t=e.installing;ne.emit("SW:LOG",{type:"update_found"}),t&&ha(t)}),e.waiting&&(ne.emit("SW:LOG",{type:"found_waiting_worker"}),ha(e.waiting)),e.installing&&(ne.emit("SW:LOG",{type:"found_installing_worker"}),ha(e.installing))},gv=()=>!!Ws,bv=()=>Bs});var Iu={};Ee(Iu,{compileRoutes:()=>Yr,createPatternString:()=>qs,flattenRoutes:()=>Hs,matchRoute:()=>Ys});function qs(e){let t=e.path;if(e.namedParams&&e.namedParams.length>0){let n=e.namedParams.map(s=>`/${s}/:${s}`).join("");t+=`(${n})?`}return t}function Hs(e,t="",n=null){let s={},r={};for(let i in e){let o=typeof e[i]=="function"?e[i]:{...e[i]},a=(t+i).replace(/\/+/g,"/");if(o.path=a||"/",o.parent=n,s[o.path]=o,o.name&&(r[o.name]&&console.warn(`[router] Duplicate route name: ${o.name}`),r[o.name]=o.path),o.routes){let{flatRoutes:l,namedRoutes:c}=Hs(o.routes,a,o);Object.assign(s,l),Object.assign(r,c)}}return{flatRoutes:s,namedRoutes:r}}function Yr(e,t){let n=[];for(let s in e){let r=e[s],i=qs(r);try{let o=new URLPattern({pathname:i});n.push({pattern:o,route:r,originalPath:s})}catch(o){t?.({type:"pattern_error",path:i,error:o})}}return n.sort((s,r)=>{let i=s.originalPath.split("/").length;return r.originalPath.split("/").length-i}),n}function Ys(e,t){for(let{pattern:n,route:s}of e){let r=n.exec({pathname:t});if(r){let o={...r.pathname.groups||{}},a=typeof s=="function"?s:typeof s.component=="function"?s.component(o):s.component,l={route:s,params:o,name:s.name,component:a,template:s.template};return s.parent&&(l.route=s.parent,l.template=s.parent.template,l.component=s.parent.component(o),l.matched={route:s,params:o,path:s.path,name:s.name,component:a,template:s.template}),l}}return null}var Qr=y(()=>{});function Tu(e,t){e.path=t.pathname,e.querystring=t.search,e.hash=t.hash,e.queryParams=Object.fromEntries(t.searchParams.entries()),e.params={...e.queryParams,...e.params}}function pa(e,t={}){let n=t.plugins||[],s=new Set,r={stack:[],routes:[],namedRoutes:{},currentRoute:{},defaultTitle:"",options:{},adapter:e,plugins:n,_createPatternString:qs,flattenRoutes(i,o="",a=null){return Hs(i,o,a)},init(i,o={}){if(!i||!Object.keys(i).length)return console.error("[router] No routes provided"),this;this.options={appName:"",basePath:"",isProduction:!1,onRouteChange:null,onTitleChange:null,...o};let{flatRoutes:a,namedRoutes:l}=this.flattenRoutes(i);this.namedRoutes=l,this.defaultTitle=this.options.appName||"",this.routes=Yr(a,d=>{console.error(`[router] Pattern error for ${d.path}:`,d.error)});let c=this.adapter.getLocation();return this.setCurrentRoute(c.href,!1),this},matchRoute(i){if(!i){let o=this.adapter.getLocation(),a=new URL(o.pathname,o.origin);return Ys(this.routes,this.normalizePath(a.pathname))}return Ys(this.routes,i)},setCurrentRoute(i,o=!0){if(!this.routes.length){console.warn("[router] setCurrentRoute called but routes not initialized yet");return}let a=this.adapter.getLocation(),l=new URL(i,a.origin),c=this.normalizePath(l.pathname),d=this.matchRoute(c);if(!d)return console.warn(`[router] Route not found: ${c}`),o?this.go("/"):null;if(d.route.ssg&&this.options.isProduction&&this.adapter.type==="browser"&&!this.adapter.isSamePath(i)){this.adapter.hardNavigate(i);return}if(Tu(d,l),d.route.action)return d.route.action(d.params);if(d.route.redirect)return this.go(d.route.redirect);this.currentRoute=d;let h=d.route.title||this.defaultTitle;typeof window<"u"&&window.__HYDRATE_MODE__||this.setTitle(h),o?(this.pushToStack(i,d.params,h),this._pushState(i,{path:i})):this.updateCurrentRoute(this.currentRoute)},handleHistoryNavigation(){this.adapter.type==="browser"&&(window.__HYDRATE_MODE__=!1);let o=this.adapter.getLocation().href,a=this.stack.findIndex(l=>this.normalizePath(l.path)===this.normalizePath(o));a!==-1&&this.truncateStack(a),this.setCurrentRoute(o,!1)},create(i,o={}){if(!i)return console.error("[router] Route name required"),null;let a=this.namedRoutes[i];if(!a)return console.error(`[router] Named route not found: ${i}`),null;let l=a,c={...o};l=l.replace(/:(\w+)/g,(f,m)=>{if(c[m]!==void 0&&c[m]!==null){let g=c[m];return delete c[m],String(g)}return console.warn(`[router] Param not provided: ${m} for route ${i}`),f});let d=new URLSearchParams(c).toString();return d?`${l}?${d}`:l},createPath(i,o={}){return this.create(i,o)},go(i,o){this.adapter.type==="browser"&&(window.__HYDRATE_MODE__=!1);let l=!!o||this.namedRoutes[i]?this.create(i,o):i;l!==null&&this.setCurrentRoute(l,!0)},navigate(i,o={}){return this.go(i,o)},replace(i,o={}){let l=!!o||this.namedRoutes[i]?this.create(i,o):i;if(l===null)return;let c=this.adapter.getLocation(),d=new URL(l,c.origin),h=this.normalizePath(d.pathname),f=this.matchRoute(h);if(!f){console.warn(`[router] Route not found: ${h}`);return}Tu(f,d),this.currentRoute=f;let m=f.route.title||this.defaultTitle;this.setTitle(m),this.adapter.replaceState({path:l},l),this.updateCurrentRoute(this.currentRoute)},forward(){let i=this.adapter.forward();this.adapter.type==="memory"&&i&&this.handleHistoryNavigation()},home(){this.stack=[],this.go("/")},back(){if(this.stack.length<=1)return this.home();this.stack=this.stack.slice(0,-1);let i=this.adapter.back();this.adapter.type==="memory"&&i&&this.handleHistoryNavigation()},_pushState(i,o={}){let a=this.adapter.getLocation(),l=this.options.basePath&&!i.startsWith(this.options.basePath)?this.options.basePath+i:i,c=new URL(l,a.origin).href;this.adapter.isSamePath(c)||this.adapter.pushState(o,l),this.updateCurrentRoute(this.currentRoute)},pushToStack(i,o={},a=this.defaultTitle){let l={path:i,params:o,title:a};this.normalizePath(i)==="/"?this.stack=[l]:this.stack=[...this.stack,l]},setTitle(i){let o=i&&this.options.appName?`${i} | ${this.options.appName}`:i||this.options.appName;if(this.adapter.setTitle(o),this.stack.length>0){let a=[...this.stack];a[a.length-1]={...a[a.length-1],title:i},this.stack=a}this.currentRoute?.route&&(this.currentRoute={...this.currentRoute,route:{...this.currentRoute.route,title:i}}),this.options.onTitleChange&&this.options.onTitleChange(o)},subscribe(i,o){let a=typeof i=="function"?i:o;return s.add(a),()=>s.delete(a)},get(i){if(i==="currentRoute")return this.currentRoute},updateCurrentRoute(i){this.currentRoute={...i,root:this.isRoot()},s.forEach(o=>{try{o(this.currentRoute)}catch(a){console.error("[router] Subscriber error:",a)}}),this.options.onRouteChange&&this.options.onRouteChange(this.currentRoute)},isRoot(){return this.stack.length<=1},truncateStack(i=0){this.stack=this.stack.slice(0,i+1)},normalizePath(i="/"){let o=i.split("?")[0].split("#")[0];return this.options.basePath&&o.startsWith(this.options.basePath)&&(o=o.slice(this.options.basePath.length)||"/"),(o||"/").replace(/\/+$/,"")||"/"},handleLinkClick(i,o={}){let{external:a=!1}=o;if(i.ctrlKey||i.metaKey||i.shiftKey||i.button===1)return!1;let l=i.currentTarget;if(!l?.href)return!1;let c=this.adapter.getLocation();if(l.origin===c.origin&&!a){i.preventDefault();let h=[l.pathname,l.search].filter(Boolean).join("");return this.go(h),!0}return!1}};for(let i of n)if(typeof i=="function"){let o=i(r);o&&typeof o=="object"&&Object.assign(r,o)}return r}var fa=y(()=>{Qr()});function Qs(){return{type:"browser",getLocation(){return{href:window.location.href,origin:window.location.origin,pathname:window.location.pathname,search:window.location.search,hash:window.location.hash}},isSamePath(e){return window.location.href===e},hardNavigate(e){window.location.href=e},pushState(e,t){new URL(t,window.location.origin).href!==window.location.href&&window.history.pushState(e,"",t)},replaceState(e,t){window.history.replaceState(e,"",t)},back(){window.history.back()},forward(){window.history.forward()},setTitle(e){document.title=e}}}var Kr=y(()=>{});function ma(e="/"){let t=new URL(e,"http://memory"),n={pathname:t.pathname,search:t.search,hash:t.hash,origin:"http://memory"},s=[],r=-1;return{type:"memory",getLocation(){return{href:`${n.origin}${n.pathname}${n.search}${n.hash}`,origin:n.origin,pathname:n.pathname,search:n.search,hash:n.hash}},isSamePath(i){let o=new URL(i,n.origin),a=`${n.pathname}${n.search}${n.hash}`,l=`${o.pathname}${o.search}${o.hash}`;return a===l},hardNavigate(i){let o=new URL(i,n.origin);n.pathname=o.pathname,n.search=o.search,n.hash=o.hash},pushState(i,o){let a=new URL(o,n.origin);n.pathname=a.pathname,n.search=a.search,n.hash=a.hash,r<s.length-1&&s.splice(r+1),s.push({pathname:n.pathname,search:n.search,hash:n.hash,state:i}),r=s.length-1},replaceState(i,o){let a=new URL(o,n.origin);n.pathname=a.pathname,n.search=a.search,n.hash=a.hash,r>=0&&(s[r]={pathname:n.pathname,search:n.search,hash:n.hash,state:i})},back(){if(r>0){r--;let i=s[r];return n.pathname=i.pathname,n.search=i.search,n.hash=i.hash,!0}return!1},forward(){if(r<s.length-1){r++;let i=s[r];return n.pathname=i.pathname,n.search=i.search,n.hash=i.hash,!0}return!1},setTitle(i){},getHistory(){return{entries:[...s],index:r}}}}var ga=y(()=>{});function Gr(e={}){let{routes:t,adapter:n,plugins:s=[],...r}=e,i=n||(typeof window<"u"?Qs():ma()),o=pa(i,{plugins:s});return t&&o.init(t,r),o}function ba(e,t={},n=null){let s,r,i=[];if(t?.adapter!==void 0)s=t,r=n;else{let a=t;r=a.Controller,i=a.plugins||[],s=Gr({plugins:i})}let o=()=>{if(e.manifest?.skipRouterInit){console.log("[router/app.js] Router init skipped due to skipRouterInit setting");return}if(console.log("[router/app.js] Initializing router with settings:",{appName:e.manifest?.name,isProduction:e.manifest?.production,routesCount:Object.keys(e.routes||{}).length,currentUrl:typeof window<"u"?window.location.href:"N/A"}),s.init(e.routes,{appName:e.manifest?.name,basePath:e.manifest?.basePath||"",isProduction:e.manifest?.production,onRouteChange:null}),console.log("[router/app.js] Router initialized, currentRoute:",{name:s.currentRoute?.name,path:s.currentRoute?.path}),r){let{registerSyncType:a,createSync:l}=r;a&&l&&(console.log("[router/app.js] Setting up router sync for currentRoute and stack"),s.$sync=l(s,"router",["currentRoute","stack"]),console.log("[router/app.js] router.$sync created, initial currentRoute:",{name:s.currentRoute?.name,path:s.currentRoute?.path}),s.currentRoute?.name&&(console.log("[router/app.js] Re-notifying subscribers with current route:",{name:s.currentRoute?.name,path:s.currentRoute?.path}),s.updateCurrentRoute(s.currentRoute)),a(c=>c===s,c=>({adapter:"router",syncObj:s.$sync})),console.log("[router/app.js] Sync type registered"))}e.Router=s,console.log("[router/app.js] Router assigned to $APP.Router")};return e.events?.on?.("APP:INIT",o),e.addModule?.({name:"Router",base:s,exports:s}),s.adapter?.type==="browser"&&typeof window<"u"&&window.addEventListener("popstate",a=>{console.log("[router/app.js] popstate event fired:",{state:a.state,href:window.location.href,pathname:window.location.pathname}),s.handleHistoryNavigation()}),s}var Jr=y(()=>{Kr();ga();fa()});var Pu=y(()=>{});var Mu=y(()=>{});function yv(){return Cn||(Cn=Gr({adapter:typeof window<"u"?Qs():null}),ya&&(Cn.$sync=ya(Cn,"router",["currentRoute","stack"]))),Cn}var Cn,ya,Fe,Ut=y(async()=>{fa();Jr();Kr();ga();Qr();Pu();Mu();Jr();Kr();Cn=null,ya=null;try{ya=(await Promise.resolve().then(()=>(Wr(),_u))).createSync}catch{}Cn=yv();Fe=Cn});var sn,Nt,Fu,xt,Du,Ou,xv,vv,Lu,ju,wv,zu,Uu,Nu=y(()=>{Zt();Ue();V();Fu=!1,xt={},Du=async(e={})=>{let{data:t}=e,{eventId:n,type:s,payload:r,connection:i}=t;if(s==="EVENT:FORWARD"){await j.events.emit(r.key,r.data);return}let o=r,a=n&&(l=>Nt.postMessage({eventId:n,payload:l,connection:i}));if(await j.events.emit(s,{respond:a,payload:r,eventId:n}),n&&xt[n])try{xt[t.eventId].resolve(o)}catch(l){xt[t.eventId].reject(new Error(l))}finally{delete xt[n]}if(a)return a(o)},Ou=async()=>{console.log("[BACKEND-FE] initBackend called");try{sn=new Worker("/db-worker.js"),sn.onerror=n=>{console.error("[BACKEND-FE] Worker error:",n.message,n)};let e=new MessageChannel;Nt=e.port1,Nt.onmessage=Du,Nt.onmessageerror=n=>{j.events.emit("WORKER:MESSAGE_ERROR",{error:n})};let t=window.__SSG_TOKEN__||new URLSearchParams(location.search).get("ssg_token")||void 0;console.log("[BACKEND-FE] posting APP:BACKEND:START to worker"),sn.postMessage({type:"APP:BACKEND:START",ssgToken:t,manifest:j.manifest},[e.port2]),j.events.on("APP:BACKEND:READY",async()=>{console.log("[BACKEND-FE] APP:BACKEND:READY received, emitting APP:READY"),Fu=!0,await j.events.emit("APP:READY")})}catch(e){throw console.error("[BACKEND-FE] initBackend failed:",e),j.events.emit("BACKEND:INIT_FAILED",{error:e}),e}},xv=async()=>{j.events.emit("WORKER:RELOADING"),sn&&(sn.terminate(),sn=null),Nt=null,Object.keys(xt).forEach(e=>{xt[e].reject(new Error("Worker reloaded")),delete xt[e]});try{sn=new Worker(`/db-worker.js?t=${Date.now()}`);let e=new MessageChannel;Nt=e.port1,Nt.onmessage=Du,Nt.onmessageerror=n=>{j.events.emit("WORKER:MESSAGE_ERROR",{error:n})};let t=window.__SSG_TOKEN__||new URLSearchParams(location.search).get("ssg_token")||void 0;sn.postMessage({type:"APP:BACKEND:START",ssgToken:t,manifest:j.manifest},[e.port2]),j.events.emit("WORKER:RELOADED")}catch(e){j.events.emit("WORKER:RELOAD_FAILED",{error:e})}};j.events.on("APP:INIT",Ou);navigator.serviceWorker&&navigator.serviceWorker.addEventListener("message",e=>{let{type:t}=e.data||{};t==="WORKER:RELOAD"&&(console.log("[Worker] Hot-reloading db-worker due to file change..."),xv())});vv=(e,t,n)=>{if(!e){setTimeout(()=>n(t),100);return}e.postMessage(t)},Lu=e=>vv(Nt,e,Lu),ju=async e=>{let t=e["data-query"];if(!t)return;let{model:n,id:s,limit:r,offset:i=0,order:o,where:a,includes:l,key:c,single:d,locale:h,ignoreLocale:f}=t;if(!n){j.events.emit("DATAQUERY:MODEL_REQUIRED");return}if(!c){j.events.emit("DATAQUERY:KEY_REQUIRED");return}if(!j.Model||!j.Model[n]){j.events.emit("DATAQUERY:MODEL_NOT_FOUND",{model:n});return}let m=a||{};if(j.models?.[n]?.$i18n&&!f&&!s){let R=h||j.i18n?.getLanguage();if(!h&&(!R||R==="en")){let D=localStorage.getItem("i18n:currentLocale");D&&(R=D)}m={...m,locale:R||"en"}}let b=t.many??(!s&&!d),_={limit:d?1:r,offset:i,includes:l,order:o,where:m};e._dataQuerySub&&e._dataQuerySubHandler&&(e._dataQuerySub.unsubscribe(e._dataQuerySubHandler),e._dataQuerySub=null),e._paginationInfo=null,e._dataQuerySubHandler=R=>{let D=e.state[c];e.state[c]=R,e.requestUpdate(c,D),e.emit("dataLoaded",{instance:e,rows:b?R:void 0,row:b?void 0:R,...e._paginationInfo||{},component:e.constructor})};try{if(b){let R=await j.Model[n].getAll(_),D=e.state[c];e.state[c]=R,e._paginationInfo=R.limit!==void 0?{total:R.total,limit:R.limit,offset:R.offset,count:R.count}:null,e.requestUpdate(c,D),R.subscribe?.(e._dataQuerySubHandler),e._dataQuerySub=R}else if(d&&a){let R=await j.Model[n].getAll(_),D=e.state[c];e.state[c]=R[0]||null,e.requestUpdate(c,D),R.subscribe?.(M=>{e._dataQuerySubHandler(M[0]||null)}),e._dataQuerySub=R}else{let R=await j.Model[n].get(s),D=e.state[c];e.state[c]=R,e.requestUpdate(c,D),R.subscribe?.(M=>{let K=Array.isArray(M)?M[0]:M;e._dataQuerySubHandler(K)}),e._dataQuerySub=R}e.emit("dataLoaded",{instance:e,rows:b?e.state[c]:void 0,row:b?void 0:e.state[c],...e._paginationInfo||{},component:e.constructor})}catch(R){j.events.emit("DATAQUERY:LOAD_FAILED",{model:n,error:R}),e.emit("dataError",{instance:e,error:R,model:n,id:s})}e.syncable=!0};F.plugins.push({name:"dataQuery",test:({component:e})=>!!e.dataQuery,init:({View:e})=>{e.properties["data-query"]=u.object({properties:{model:u.string(),id:u.string(),where:u.object(),includes:u.string(),order:u.string(),limit:u.number(),offset:u.number(),count:u.number(),key:u.string(),single:u.boolean(),locale:u.string(),ignoreLocale:u.boolean()}})},events:{connected:async({instance:e})=>{await ju(e),e._dataQueryChangeHandler=async()=>{await ju(e)},e.on("data-queryChanged",e._dataQueryChangeHandler)},disconnected:({instance:e})=>{e._dataQuerySub&&e._dataQuerySubHandler&&e._dataQuerySub.unsubscribe(e._dataQuerySubHandler),e._dataQuerySub=null,e._dataQuerySubHandler=null,e._dataQueryChangeHandler&&(e.off("data-queryChanged",e._dataQueryChangeHandler),e._dataQueryChangeHandler=null)}}});wv=(e,t={},n=null,s=5e3)=>{if(!e)return Promise.reject(new Error("backend: type parameter is required"));let r=Date.now().toString()+Math.random().toString(36).substr(2,9),i={type:e,payload:t,eventId:r};return new Promise((o,a)=>{n&&(i.connection=n);let l=setTimeout(()=>{xt[r]&&(delete xt[r],a(new Error(`Backend request timeout after ${s}ms for type: ${e} (backendReady=${Fu}, pending=${Object.keys(xt).length})`)))},s);xt[r]={resolve:c=>{clearTimeout(l),o(c)},reject:c=>{clearTimeout(l),a(c)}},Lu(i)})},zu={request:wv,init:Ou};j.addModule({name:"Backend",base:zu});Uu=zu});function $v(e,t){let n={total:0,limit:void 0,offset:0,count:0,subscribe(s){return typeof s!="function"?(t.events.emit("SUBSCRIPTION:ERROR",{type:"invalid_callback"}),this):(this.subscriptions.size===0&&this.registerListeners(),this.subscriptions.add(s),this)},unsubscribe(s){this.subscriptions.delete(s),this.subscriptions.size===0&&this.destroy()},notifySubscribers(){Xr(t,this.subscriptions,[...this],"array_callback_error")},handleQueryUpdate(s){let{action:r,record:i}=s;switch(r){case"add":case"create":this.handleRecordAdd(i);break;case"update":case"edit":this.handleRecordUpdate(i);break;case"delete":case"remove":this.handleRecordDelete(i);break}},handleRecordAdd(s){if(this.some(i=>String(i.id)===String(s.id)))return;let r=e(s,this.modelName);this.push(r),this.notifySubscribers()},handleRecordUpdate(s){let r=this.findIndex(i=>String(i.id)===String(s.id));if(r>-1)if(!this.opts.where||Vu(s,this.opts.where)){let o=e(s,this.modelName);this[r]=o,this.notifySubscribers()}else this.splice(r,1),this.notifySubscribers();else(!this.opts.where||Vu(s,this.opts.where))&&this.handleRecordAdd(s)},handleRecordDelete(s){let r=this.findIndex(i=>String(i.id)===String(s.id));r>-1&&(this.splice(r,1),this.notifySubscribers())},registerListeners(){t.SubscriptionManager.subscribe(this.modelName,this.opts.where,s=>this.handleQueryUpdate(s)).then(s=>{this.queryUnsubscribe=s}).catch(s=>{t.events.emit("SUBSCRIPTION:ERROR",{type:"query_registration_failed",error:s})})},destroy(){this.queryUnsubscribe&&typeof this.queryUnsubscribe=="function"&&(this.queryUnsubscribe(),this.queryUnsubscribe=null),this.subscriptions.clear()}};return Object.setPrototypeOf(n,Array.prototype),n}function Sv(e,t){return{get(n,s,r){return s==="remove"?()=>e.request("REMOVE",n._modelName,{id:n.id}):s==="update"?()=>{let i={...n};return delete i._modelName,e.request("EDIT",n._modelName,{row:i})}:s==="include"?async i=>{if(!n.id||!n._modelName)return t.events.emit("MODEL:ERROR",{type:"include_missing_id",message:"Cannot run .include() on an object without an ID or model name"}),r;if(!(n._modelName in t.models))throw new Error(`Model ${n._modelName} does not exist in models`);let a=t.models[n._modelName][i];if(!a)throw new Error(`Relationship '${i}' not found in ${n._modelName} model`);let l=await e.request("GET_MANY",a.targetModel,{opts:{where:a.belongs?n[i]:{[a.targetForeignKey]:n.id}}});return n[i]=e.proxifyMultipleRows(l,a.targetModel),r}:s==="subscribe"?i=>typeof i!="function"?(t.events.emit("SUBSCRIPTION:ERROR",{type:"invalid_callback"}),n):(t.SubscriptionManager?t.SubscriptionManager.subscribe(n._modelName,{id:n.id},o=>{let{action:a,record:l}=o;i(a==="delete"||a==="remove"?void 0:l)}).then(o=>{n[it]||(n[it]=new Set),n[it].add({callback:i,unsubscribe:o})}).catch(o=>{t.events.emit("SUBSCRIPTION:ERROR",{type:"row_subscription_failed",error:o})}):(n[it]||(n[it]=new Set),n[it].add(i)),n):s==="unsubscribe"?i=>{if(n[it]){for(let o of n[it])if(typeof o=="object"&&o.callback===i&&o.unsubscribe){o.unsubscribe(),n[it].delete(o);return}n[it].delete(i)}}:s==="variants"&&n._groupBy?async(i={})=>{let{field:o,value:a}=n._groupBy;return e.request("GET_MANY",n._modelName,{opts:{...i,ignoreLocale:!0,where:{...i.where,[o]:a}}}).then(l=>l?.items?e.proxifyMultipleRows(l.items,n._modelName,i):e.proxifyMultipleRows(l||[],n._modelName,i))}:s==="createVariant"&&n._groupBy?async(i={})=>{let{field:o,value:a}=n._groupBy;return e.request("ADD",n._modelName,{row:{...i,[o]:a}}).then(l=>l[0]?[l[0],null]:[null,e.proxifyRow(l[1],n._modelName)])}:n[s]},set(n,s,r){return n[s]=r,!0}}}function Bu(e){let t,n,s,r=(g,b,_)=>{if(!g||!_?.length||!e.models?.[b])return;let R=e.models[b],D=[];for(let M of _){let K=R[M];if(!K||!K.targetModel)continue;let ee=K.targetModel;if(K.belongs){let Y=g[M],A=typeof Y=="object"?Y?.id:Y;A&&i(ee,{id:A},g,M,D)}else if(K.belongs_many){let Y=g[M]||[];for(let A of Y){let C=typeof A=="object"?A?.id:A;C&&i(ee,{id:C},g,M,D)}}else if(K.many||K.one){let Y=K.targetForeignKey||`${b.toLowerCase()}Id`;i(ee,{[Y]:g.id},g,M,D)}}D.length>0&&(g[kv]=D)},i=(g,b,_,R,D)=>{e.SubscriptionManager&&e.SubscriptionManager.subscribe(g,b,M=>{let{action:K,record:ee}=M;K==="update"||K==="edit"?o(_,R,ee):(K==="delete"||K==="remove")&&a(_,R,ee)}).then(M=>{M&&D.push(M)}).catch(M=>{e.events.emit("SUBSCRIPTION:ERROR",{type:"relationship_subscription_failed",error:M})})},o=(g,b,_)=>{let R=g[b];if(Array.isArray(R)){let D=R.findIndex(M=>String(M?.id||M)===String(_.id));if(D>-1){let M=[...R];M[D]=_,g[b]=M}}else R&&typeof R=="object"&&String(R.id)===String(_.id)&&(g[b]=_)},a=(g,b,_)=>{let R=g[b];if(Array.isArray(R)){let D=R.filter(M=>String(M?.id||M)!==String(_.id));D.length!==R.length&&(g[b]=D)}else R&&typeof R=="object"&&String(R.id)===String(_.id)&&(g[b]=null)},l=async({modelName:g,action:b,payload:_})=>{let R=await t.request(b,g,_);if(b==="ADD_MANY"&&R&&Array.isArray(R.results))return R.results.forEach(M=>{M.status==="fulfilled"&&M.value&&(M.value=d(M.value,g))}),R;if(b.includes("MANY")){if(_.opts.object)return R;let M=_.opts||{};if(R?.items){let ee={total:R.total,limit:R.limit,offset:R.offset,count:R.count,groupBy:R.groupBy||M.groupBy},Y=h(R.items,g,M,ee);return M.includes?.length&&Y.forEach(A=>r(A,g,M.includes)),Y}let K=h(R,g,M);return M.includes?.length&&K.forEach(ee=>r(ee,g,M.includes)),K}if(["ADD","EDIT"].includes(b))return R[0]?[R[0],null]:[null,d(R[1],g)];let D=d(R,g);return _.opts?.includes?.length&&D&&r(D,g,_.opts.includes),D},c=g=>[{type:"static",name:"get",handler:(b,_={})=>l({modelName:g,action:"GET",payload:["string","number"].includes(typeof b)?{id:b,opts:_}:{opts:b}})},{type:"static",name:"getAll",handler:(b={})=>{let _=e.models?.[g],R=e.manifest?.i18n?.enabled!==!1;if(_?.$i18n&&R&&!b.ignoreLocale){let D=b.where?.locale||e.i18n?.getLanguage();if(!D||D==="en"){let M=localStorage.getItem("i18n:currentLocale");M&&(D=M)}b={...b,where:{...b.where,locale:D||"en"}}}return l({modelName:g,action:"GET_MANY",payload:{opts:b}})}},{type:"static",name:"add",handler:(b,_)=>l({modelName:g,action:"ADD",payload:{row:b,opts:_}})},{type:"static",name:"addMany",handler:(b,_)=>l({modelName:g,action:"ADD_MANY",payload:{rows:b,opts:_}})},{type:"static",name:"remove",handler:b=>t.request("REMOVE",g,{id:b})},{type:"static",name:"removeAll",handler:b=>t.request("REMOVE_MANY",g,{opts:{where:b}})},{type:"static",name:"edit",handler:(b,_)=>l({modelName:g,action:"EDIT",payload:{row:["string","number"].includes(typeof b)?{id:b,..._}:b}})},{type:"static",name:"editAll",handler:(b,_)=>t.request("EDIT_MANY",g,{opts:{where:b,updates:_}})},{type:"static",name:"count",handler:(b={})=>t.request("COUNT",g,{opts:b})},{type:"static",name:"upsert",handler:(b,_)=>l({modelName:g,action:b?.id?"EDIT":"ADD",payload:{row:b,opts:_}})},{type:"dynamic",prefix:"getBy",action:"GET"},{type:"dynamic",prefix:"getAllBy",action:"GET_MANY"},{type:"dynamic",prefix:"editAllBy",action:"EDIT_MANY"},{type:"dynamic",prefix:"editBy",action:"EDIT"},{type:"dynamic",prefix:"removeBy",action:"REMOVE"},{type:"dynamic",prefix:"removeAllBy",action:"REMOVE_MANY"}],d=(g,b)=>{if(!g||typeof g!="object"||g.errors)return g;if(t[b].rows[g.id]){let R=t[b].rows[g.id],D={...R,...g};D._modelName=b,t[b].rows[g.id]=D;let M=R[it];return M&&M.size>0&&(D[it]=M,Xr(e,M,D,"row_callback_error")),new Proxy(D,n)}return t[b].rows[g.id]=g,t[b].on(`get:${g.id}`,R=>{let D=t[b].rows[g.id],M=D?D[it]:void 0;if(R===void 0){delete t[b].rows[g.id],M&&M.size>0&&(Xr(e,M,void 0,"row_callback_error"),M.clear());return}let{id:K,...ee}=R;Object.assign(D,ee),M&&M.size>0&&Xr(e,M,D,"row_callback_error")}),g._modelName=b,new Proxy(t[b].rows[g.id],n)},h=(g,b,_={},R=null)=>{if(!Array.isArray(g))return g;let D=_.groupBy||R?.groupBy,M=g.map(K=>{let ee=d(K,b);return D&&K[D]&&(ee._groupBy={field:D,value:K[D]}),ee});return Object.setPrototypeOf(M,s),M.modelName=b,M.opts=_,M.subscriptions=new Set,M.queryUnsubscribe=null,R&&(M.total=R.total,M.limit=R.limit,M.offset=R.offset,M.count=R.count),M},f=g=>typeof g!="string"||!g?g:g.charAt(0).toLowerCase()+g.slice(1),m=new Map;return t=new Proxy({},{get(g,b,_){if(b in g)return Reflect.get(g,b,_);if(m.has(b))return m.get(b);let R=b;if(!(b in e.models))throw new Error(`Model ${R} does not exist in models`);let D=e.models[R],M=c(R,D),K=new Proxy(Object.assign(Object.create(ts.prototype),{name:R}),{get(ee,Y,A){if(Y in ee)return Reflect.get(ee,Y,A);for(let C of M){if(C.type==="static"&&C.name===Y)return C.handler;if(C.type==="dynamic"&&Y.startsWith(C.prefix)){let v=Y.slice(C.prefix.length);if(!v)continue;let S=f(v);if(!(S in D))throw new Error(`Property '${S}' not found in model '${R}'`);return(w,P=null)=>{let B={opts:{where:{[S]:w}}};return P&&(B.opts.row=P),l({modelName:R,action:C.action,payload:B})}}}throw new Error(`Method '${Y}' not found in model '${R}'`)}});return Rs(K,{getter:!1}),K.rows={},m.set(b,K),K}}),n=Sv(t,e),s=$v(d,e),t.proxifyRow=d,t.proxifyMultipleRows=h,t.ModelType=ts,t}var ts,it,kv,Xr,Vu,xa=y(()=>{rt();ts=class{},it=Symbol("subscriptions"),kv=Symbol("relationshipSubscriptions"),Xr=(e,t,n,s)=>{t.forEach(r=>{let i=typeof r=="function"?r:r.callback;try{i(n)}catch(o){e.events.emit("SUBSCRIPTION:ERROR",{type:s,error:o})}})},Vu=(e,t)=>!t||Object.keys(t).length===0?!0:Object.keys(t).every(n=>n==="id"?String(e[n])===String(t[n]):e[n]===t[n])});function Wu(e,t){return!t||Object.keys(t).length===0?!0:Object.entries(t).every(([n,s])=>{let r=e[n];return typeof s!="object"||s===null?n==="id"?String(r)===String(s):r===s:Object.entries(s).every(([i,o])=>{switch(i){case">":return r>o;case">=":return r>=o;case"<":return r<o;case"<=":return r<=o;case"!=":case"<>":return r!==o;case"in":return Array.isArray(o)&&o.includes(r);case"not in":return Array.isArray(o)&&!o.includes(r);case"like":return typeof r=="string"&&r.includes(o);case"ilike":return typeof r=="string"&&r.toLowerCase().includes(o.toLowerCase());case"is null":return r==null;case"is not null":return r!=null;default:return r===o}})})}var qu=y(()=>{});function _v(e,t){if(!t||Object.keys(t).length===0)return`${e}::*`;let n=Object.keys(t).sort(),s={};n.forEach(i=>{s[i]=t[i]});let r=JSON.stringify(s);return`${e}::${r}`}var va,Av,Zr,Hu=y(()=>{rt();qu();va=class{constructor(t,n,s){this.model=t,this.where=n,this.filterString=s,this.queryHash=null,this.callbacks=new Set,this.refCount=0}addCallback(t){this.callbacks.add(t),this.refCount++}removeCallback(t){this.callbacks.delete(t),this.refCount--}notify(t){this.callbacks.forEach(n=>{try{n(t)}catch(s){ne.emit("SUBSCRIPTION:ERROR",{type:"callback_error",error:s})}})}};Av=e=>!e||Object.keys(e).length===0?"":JSON.stringify(e),Zr=class{constructor(t,n={}){this.database=t,this.buildFilterString=n.buildFilterString||Av,this.subscriptions=new Map,this.modelToQueries=new Map,this.adapterUnsubscribers=new Map}setFilterBuilder(t){this.buildFilterString=t}async subscribe(t,n,s){if(typeof s!="function")return ne.emit("SUBSCRIPTION:ERROR",{type:"invalid_callback",model:t}),()=>{};let r=_v(t,n),i=this.subscriptions.get(r),o=!1;if(!i){let a=this.buildFilterString(n);i=new va(t,n,a),i.queryHash=r,o=!0}return i.addCallback(s),o&&(this.subscriptions.set(r,i),this.modelToQueries.has(t)||this.modelToQueries.set(t,new Set),this.modelToQueries.get(t).add(r),await this.createAdapterSubscription(i)),()=>this.unsubscribe(r,s)}unsubscribe(t,n){let s=this.subscriptions.get(t);s&&(s.removeCallback(n),s.refCount===0&&this.cleanupSubscription(t))}async createAdapterSubscription(t){let{model:n,filterString:s}=t;if(this.database?.realtimeManager&&typeof this.database.realtimeManager.subscribe=="function")try{let r=await this.database.realtimeManager.subscribe(n,s,i=>{t.notify(i)});this.adapterUnsubscribers.set(t.queryHash,r)}catch(r){ne.emit("SUBSCRIPTION:ERROR",{type:"realtime_setup_failed",model:n,error:r})}}cleanupSubscription(t){let n=this.subscriptions.get(t);if(!n)return;let s=this.adapterUnsubscribers.get(t);s&&typeof s=="function"&&(s(),this.adapterUnsubscribers.delete(t)),this.subscriptions.delete(t);let r=this.modelToQueries.get(n.model);r&&(r.delete(t),r.size===0&&this.modelToQueries.delete(n.model))}notifyMatchingQueries(t,n,s){let r=this.modelToQueries.get(t);if(r)for(let i of r){let o=this.subscriptions.get(i);if(!o)continue;(n==="delete"||n==="remove"||!o.where||Object.keys(o.where).length===0||Wu(s,o.where))&&o.notify({action:n,record:s,model:t})}}cleanup(){for(let t of this.subscriptions.keys())this.cleanupSubscription(t)}getStats(){let t={totalSubscriptions:this.subscriptions.size,byModel:{}};for(let[n,s]of this.modelToQueries){t.byModel[n]={queries:s.size,totalCallbacks:0};for(let r of s){let i=this.subscriptions.get(r);i&&(t.byModel[n].totalCallbacks+=i.refCount)}}return t}}});function Yu(e,t={}){let n=Bu(e),s=(r,i,o={})=>e.Backend.request(r,{model:i,...o});return n.request=s,e.addModule({name:"Model",base:n}),e.SubscriptionManager||(e.SubscriptionManager=new Zr(null)),e.events.on("QUERY_DATA_SYNC",({payload:r})=>{let{action:i,model:o,record:a}=r;e.SubscriptionManager&&e.SubscriptionManager.notifyMatchingQueries(o,i,a),e.SW&&e.SW.postMessage("SW:BROADCAST_QUERY_SYNC",r)}),n}var Qu=y(()=>{xa();Hu()});var Ku=y(()=>{Ue();j.addModule({name:"app"})});var Ju,Cv,Vt,Gu,wa,ns,nC,sC,Xu=y(()=>{gt();Ju=Symbol.for(""),Cv=e=>{if(e?.r===Ju)return e?._$litStatic$},Vt=e=>({_$litStatic$:e,r:Ju}),Gu=new Map,wa=e=>(t,...n)=>{let s=n.length,r,i,o=[],a=[],l,c=0,d=!1;for(;c<s;){for(l=t[c];c<s&&(i=n[c],(r=Cv(i))!==void 0);)l+=r+t[++c],d=!0;c!==s&&a.push(i),o.push(l),c++}if(c===s&&o.push(t[s]),d){let h=o.join("$$lit$$");(t=Gu.get(h))===void 0&&(o.raw=o,Gu.set(h,t=o)),n=a}return e(t,...n)},ns=wa(p),nC=wa(Ko),sC=wa(Go);});var ei=y(()=>{gt();Xu()});function Zu(e){let t=["id","name","version","capabilities"];for(let n of t)if(!e[n])throw new Error(`Plugin missing required field: ${n}`);if(!Array.isArray(e.capabilities))throw new Error("Plugin capabilities must be an array");return!0}function ed(e){return Zu(e),{...e,type:"activity",icon:e.icon||"box",title:e.title||e.name,position:e.position||"top",order:e.order||100,sidebarComponent:e.sidebarComponent||null,onActivate:e.onActivate||(async()=>{}),onDeactivate:e.onDeactivate||(async()=>{}),onDispose:e.onDispose||(async()=>{})}}function td(){let e=new Map;return{plugins:e,register(t){Zu(t),e.set(t.id,t)},get:t=>e.get(t),has:t=>e.has(t),getAll:()=>Array.from(e.values()),async unregister(t){let n=e.get(t);n?.onDispose&&await n.onDispose(n._api),e.delete(t)},async disposeAll(){for(let t of e.values())t.onDispose&&await t.onDispose(t._api);e.clear()}}}var We,En=y(()=>{We={onActivate:"activate",onDeactivate:"deactivate",onDispose:"dispose",onResourceOpen:"resource:open",onResourceClose:"resource:close",onResourceChange:"resource:change",onWillSaveResource:"resource:willSave",onResourceSave:"resource:save",onResourceCreate:"resource:create",onResourceDelete:"resource:delete",onResourceRename:"resource:rename",onEditorChange:"editor:change",onEditorSelection:"editor:selection",onEditorCursor:"editor:cursor",onEditorFocus:"editor:focus",onEditorBlur:"editor:blur",onActivityChange:"activity:change",onSidebarToggle:"sidebar:toggle",onPanelToggle:"panel:toggle",onThemeChange:"theme:change",onLayoutChange:"layout:change",onWorkspaceOpen:"workspace:open",onWorkspaceClose:"workspace:close",onConfigChange:"config:change",onCommandExecute:"command:execute",onCommandRegister:"command:register"}});function nd(e){return{getActivityBarItems(){let t=Array.from(e.activityBarPlugins.values()),n=t.filter(r=>r.position==="top").sort((r,i)=>r.order-i.order),s=t.filter(r=>r.position==="bottom").sort((r,i)=>r.order-i.order);return{top:n,bottom:s}},async handleActivityChange(t){if(!e.activityBarPlugins.get(t))return;let s=e.activeActivity,r=e.activityBarPlugins.get(s);if(t===e.activeActivity){e.setState("sidebarVisible",!e.sidebarVisible);return}r?.onDeactivate&&await r.onDeactivate(r._api),e.setState("activeActivity",t),e.setState("sidebarVisible",!0),e.emit(We.onActivityChange,{activityId:t,from:s})}}}var sd=y(()=>{En()});function rd(e){return{registerCommand(t,n,s){let r=`${t}.${n}`;e.commands.has(r)&&console.warn(`Command '${r}' is already registered. Overwriting.`),e.commands.set(r,{id:r,pluginId:t,...s}),s.keybinding&&e.keybindings.registerDefaultBinding(r,s.keybinding)},executeCommand(t,...n){console.log("[IDE] executeCommand:",t);let s=e.commands.get(t);if(s){console.log("[IDE] Command found, executing:",s.label);let r=s.execute(...n);return e.emit(We.onCommandExecute,{commandId:t,args:n}),r}console.warn(`Command not found: ${t}`)},getAllCommands(){return Object.fromEntries(e.commands)}}}var id=y(()=>{En()});var Ev,od,ad,ss,rn,Rv,ti,ld,ni,Ks=y(()=>{gt();({I:Ev}=Jo),od=e=>e,ad=()=>document.createComment(""),ss=(e,t,n)=>{let s=e._$AA.parentNode,r=t===void 0?e._$AB:t._$AA;if(n===void 0){let i=s.insertBefore(ad(),r),o=s.insertBefore(ad(),r);n=new Ev(i,o,e,e.options)}else{let i=n._$AB.nextSibling,o=n._$AM,a=o!==e;if(a){let l;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(l=e._$AU)!==o._$AU&&n._$AP(l)}if(i!==r||a){let l=n._$AA;for(;l!==i;){let c=od(l).nextSibling;od(s).insertBefore(l,r),l=c}}}return n},rn=(e,t,n=e)=>(e._$AI(t,n),e),Rv={},ti=(e,t=Rv)=>e._$AH=t,ld=e=>e._$AH,ni=e=>{e._$AR(),e._$AA.remove()};});var si,rs,is,Rn=y(()=>{si={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},rs=e=>(...t)=>({_$litDirective$:e,values:t}),is=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};});var cd,Iv,ud=y(()=>{gt();Rn();Ks();cd=(e,t,n)=>{let s=new Map;for(let r=t;r<=n;r++)s.set(e[r],r);return s},Iv=rs(class extends is{constructor(e){if(super(e),e.type!==si.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let s;n===void 0?n=t:t!==void 0&&(s=t);let r=[],i=[],o=0;for(let a of e)r[o]=s?s(a,o):o,i[o]=n(a,o),o++;return{values:i,keys:r}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,s]){let r=ld(e),{values:i,keys:o}=this.dt(t,n,s);if(!Array.isArray(r))return this.ut=o,i;let a=this.ut??=[],l=[],c,d,h=0,f=r.length-1,m=0,g=i.length-1;for(;h<=f&&m<=g;)if(r[h]===null)h++;else if(r[f]===null)f--;else if(a[h]===o[m])l[m]=rn(r[h],i[m]),h++,m++;else if(a[f]===o[g])l[g]=rn(r[f],i[g]),f--,g--;else if(a[h]===o[g])l[g]=rn(r[h],i[g]),ss(e,l[g+1],r[h]),h++,g--;else if(a[f]===o[m])l[m]=rn(r[f],i[m]),ss(e,r[h],r[f]),f--,m++;else if(c===void 0&&(c=cd(o,m,g),d=cd(a,h,f)),c.has(a[h]))if(c.has(a[f])){let b=d.get(o[m]),_=b!==void 0?r[b]:null;if(_===null){let R=ss(e,r[h]);rn(R,i[m]),l[m]=R}else l[m]=rn(_,i[m]),ss(e,r[h],_),r[b]=null;m++}else ni(r[f]),f--;else ni(r[h]),h++;for(;m<=g;){let b=ss(e,l[g+1]);rn(b,i[m]),l[m++]=b}for(;h<=f;){let b=r[h++];b!==null&&ni(b)}return this.ut=o,ti(e,l),At}});});var dd={};Ee(dd,{repeat:()=>Iv});var hd=y(()=>{Ks();Rn();gt();ud()});var hi={};Ee(hi,{default:()=>Tv,getAllCollectionTypes:()=>ai,getAllNoteTypes:()=>li,getAllTypes:()=>pd,getCollectionType:()=>Pn,getDefaultType:()=>$a,getNoteType:()=>oi,getTypeById:()=>ka,getTypeForRecord:()=>di,registerCollectionType:()=>ri,registerNoteType:()=>ii,unregisterCollectionType:()=>ci,unregisterNoteType:()=>ui});var In,Tn,ri,ii,Pn,oi,ai,li,ci,ui,ka,pd,$a,di,Tv,Mn=y(()=>{In=new Map,Tn=new Map,ri=e=>{if(!e.id)throw new Error("Collection type must have an id");In.set(e.id,e)},ii=e=>{if(!e.id)throw new Error("Note type must have an id");Tn.set(e.id,e)},Pn=e=>In.get(e),oi=e=>Tn.get(e),ai=()=>[...In.values()],li=()=>[...Tn.values()],ci=e=>In.delete(e),ui=e=>Tn.delete(e),ka=e=>In.get(e)||Tn.get(e),pd=()=>[...In.values(),...Tn.values()],$a=()=>{for(let e of Tn.values())if(e.default)return e;for(let e of In.values())if(e.default)return e;return null},di=e=>{let t=e?.type;if(t){let n=ka(t);if(n)return n}return $a()},Tv={registerCollectionType:ri,registerNoteType:ii,getCollectionType:Pn,getNoteType:oi,getAllCollectionTypes:ai,getAllNoteTypes:li,unregisterCollectionType:ci,unregisterNoteType:ui,getTypeById:ka,getAllTypes:pd,getDefaultType:$a,getTypeForRecord:di}});var md={};Ee(md,{default:()=>Dv,parseCollectionBody:()=>jn,parseItemLine:()=>Gs,serializeCollectionBody:()=>os,serializeItemLine:()=>Js,slugify:()=>Bt});function Gs(e,t={}){let n=e.match(Pv),s=!n&&e.match(Mv);if(!n&&!s)return null;let r=(n||s)[1].length,i=n?n[2]!==" ":null,o=n?n[3]:s[2],a={},l=[],c=0,d;fd.lastIndex=0;let h=o,f=[];for(;(d=fd.exec(h))!==null;)f.push({key:d[1],value:d[2],start:d.index,end:d.index+d[0].length});if(f.length===0)l.push(o.trim());else{let b=0;for(let _ of f)_.start>b&&l.push(h.substring(b,_.start)),a[_.key]=Fv(_.key,_.value,t),b=_.end;b<h.length&&l.push(h.substring(b))}let g={title:l.join("").trim(),...a};return i!==null&&(g.checked=i),r>0&&(g.indent=r),g}function Fv(e,t,n){let s=n[e];if(!s)return t;switch(s.type){case"number":return Number(t)||0;case"boolean":return t==="true";case"date":return t;default:return t}}function Js(e,t={}){let{itemType:n="checkbox",knownFields:s=[]}=t,r=e.indent?" ".repeat(e.indent):"",i;n==="checkbox"||e.checked!==void 0?i=e.checked?"- [x] ":"- [ ] ":i="- ";let o=[],a=new Set(["title","checked","indent","section","line","collectionId","collectionName","slug","_itemIndex"]);for(let[c,d]of Object.entries(e)){if(s.length>0){if(!s.includes(c))continue}else if(a.has(c))continue;d==null||d===""||o.push(`${c}:${d}`)}let l=o.length>0?" "+o.join(" "):"";return`${r}${i}${e.title}${l}`}function jn(e,t={}){let n=e.split(`
`),s=[],r={name:"",items:[]},i=0;for(let a of n){i++;let l=a.match(jv);if(l){(r.name||r.items.length>0)&&s.push(r),r={name:l[1].trim(),items:[]};continue}let c=Gs(a,t);c&&(c.section=r.name,c.line=i,r.items.push(c))}(r.name||r.items.length>0)&&s.push(r);let o=s.flatMap(a=>a.items);return{sections:s,allItems:o}}function os(e,t={}){let n=[];for(let s of e){s.name&&n.push(`## ${s.name}`);for(let r of s.items)n.push(Js(r,t));n.push("")}return n.join(`
`).trimEnd()+`
`}function Bt(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}var Pv,Mv,jv,fd,Dv,Xs=y(()=>{Pv=/^(\s*)- \[([ xX])\]\s+(.+)$/,Mv=/^(\s*)- (.+)$/,jv=/^##\s+(.+)$/,fd=/\s+([\w]+):(\S+)/g;Dv={parseItemLine:Gs,serializeItemLine:Js,parseCollectionBody:jn,serializeCollectionBody:os,slugify:Bt}});var _a={};Ee(_a,{createCollectionManager:()=>pi,default:()=>Lv});var Fn,Sa,Ov,pi,Lv,fi=y(()=>{Xs();Mn();rt();Fn=(e,t)=>{let n=[];for(let s=t+1;s<e.length&&(e[s].indent&&e[s].indent>0);s++)n.push(s);return n},Sa=(e,t,n)=>{for(let s of e.sections){let r=s.items.indexOf(t);if(r!==-1){let o=1+Fn(s.items,r).length,a=s.items.splice(r,o),l=e.sections.find(c=>c.name===n);l||(l={name:n,items:[]},e.sections.push(l)),l.items.push(...a);for(let c of a)c.section=n;return}}},Ov=e=>e?.type?Pn(e.type):null,pi=(e={})=>{let t=e.model,n=e.types||[],s=e.sections||[],r=e.itemType||"checkbox",i=e.itemFields||{},o=C=>{let v=Ov(C);return v?{sections:v.sections||[],itemType:v.itemType||"checkbox",itemFields:v.itemFields||{},doneSection:v.doneSection||null,defaultSection:v.defaultSection||v.sections?.[0]||"",computed:v.computed||{}}:{sections:s,itemType:r,itemFields:i,doneSection:"Done",defaultSection:s[0]||"",computed:{}}},a=C=>C.sections.length===0?"":C.sections.map(v=>`## ${v}
`).join(`
`)+`
`,l=(C,v)=>{ne.emit("collection:changed",{types:n,action:C,...v})},c=async(C,v)=>{let S=Object.keys(v.itemFields||{}),w=os(C.sections,{itemType:v.itemType,knownFields:S});await t.edit({id:C.id,body:w}),l("edit",{id:C.id})},d=async()=>{let C=await t.getAll();return n.length===0?C:C.filter(v=>n.includes(v.type))},h=async C=>{let v=await t.get(C);if(!v||n.length>0&&!n.includes(v.type))return null;let S=o(v),{sections:w,allItems:P}=jn(v.body||"",S.itemFields);return{...v,sections:w,items:P}},f=async()=>{let C=await d(),v=[];for(let S of C){let w=o(S),{sections:P,allItems:B}=jn(S.body||"",w.itemFields);v.push({...S,sections:P,items:B})}return v},m=async(C={})=>{let S=(await f()).flatMap(w=>w.items.map((P,B)=>({...P,collectionId:w.id,collectionName:w.name,_itemIndex:B})));for(let[w,P]of Object.entries(C))w==="checked"?S=S.filter(B=>B.checked===P):typeof P=="object"&&P.in?S=S.filter(B=>P.in.includes(B[w])):S=S.filter(B=>B[w]===P);return S};return{model:t,types:n,getCollections:d,getCollection:h,getAllCollections:f,getAllItems:m,countItems:async(C={})=>(await m(C)).length,createCollection:async(C={})=>{let v=C.slug||Bt(C.name||`collection-${Date.now()}`),S=o(C),w=C.body||a(S),P=await t.add({...C,id:v,slug:v,body:w});return l("add",{id:v}),P},addItem:async(C,v,S={})=>{let w=await h(C);if(!w)throw new Error(`Collection "${C}" not found`);let P=o(w),B=v.section||P.defaultSection,J={title:v.title,checked:P.itemType==="checkbox"?!1:void 0,...v,section:B},te=w.sections.find(se=>se.name===B);if(te||(te={name:B,items:[]},w.sections.push(te)),J.indent>0&&S.afterItemIndex!==void 0){let se=w.items[S.afterItemIndex],oe=se?te.items.indexOf(se):-1;if(oe!==-1){let ce=Fn(te.items,oe),le=ce.length>0?ce[ce.length-1]+1:oe+1;te.items.splice(le,0,J)}else te.items.push(J)}else te.items.push(J);return await c(w,P),J},toggleItem:async(C,v)=>{let S=await h(C);if(!S)throw new Error(`Collection "${C}" not found`);let w=o(S),P=S.items[v];if(!P)throw new Error(`Item at index ${v} not found`);P.checked=!P.checked;let B=new Date().toISOString().split("T")[0];if(!P.indent||P.indent===0)for(let J of S.sections){let te=J.items.indexOf(P);if(te!==-1){let se=Fn(J.items,te);for(let oe of se)J.items[oe].checked=P.checked,P.checked?J.items[oe].done=B:delete J.items[oe].done;break}}return!P.indent||P.indent===0?P.checked&&w.doneSection?(P.done=B,Sa(S,P,w.doneSection)):P.checked||(delete P.done,Sa(S,P,w.defaultSection||w.sections[0]||"Active")):P.checked?P.done=B:delete P.done,await c(S,w),P},editItem:async(C,v,S)=>{let w=await h(C);if(!w)throw new Error(`Collection "${C}" not found`);let P=o(w),B=w.items[v];if(!B)throw new Error(`Item at index ${v} not found`);let J=B.section;return Object.assign(B,S),S.section&&S.section!==J&&Sa(w,B,S.section),await c(w,P),B},removeItem:async(C,v)=>{let S=await h(C);if(!S)throw new Error(`Collection "${C}" not found`);let w=o(S),P=S.items[v];for(let B of S.sections){let J=B.items.indexOf(P);if(J!==-1){let se=1+Fn(B.items,J).length;B.items.splice(J,se);break}}await c(S,w)},moveItem:async(C,v,S={})=>{let{position:w,targetItemIndex:P}=S;if(v===P)return;let B=await h(C);if(!B)throw new Error(`Collection "${C}" not found`);let J=o(B),te=B.items[v],se=B.items[P];if(!te||!se)return;let oe=null;for(let ce of B.sections){let le=ce.items.indexOf(te);if(le!==-1){let ke=Fn(ce.items,le);if(w==="child"&&ke.length>0||ke.length>0&&ke.map(Ne=>ce.items[Ne]).includes(se)||w==="child"&&se.indent&&se.indent>0)return;let ue=1+ke.length;oe=ce.items.splice(le,ue);break}}if(oe){for(let ce of B.sections){let le=ce.items.indexOf(se);if(le!==-1){let ke;if(w==="before")ke=le;else if(w==="after"){let ue=Fn(ce.items,le);ke=ue.length>0?ue[ue.length-1]+1:le+1}else if(w==="child"){oe[0].indent=2;let ue=Fn(ce.items,le);ke=ue.length>0?ue[ue.length-1]+1:le+1}else ke=le+1;for(let ue of oe)ue.section=ce.name;ce.items.splice(ke,0,...oe);break}}await c(B,J),l("move",{id:B.id})}},deleteCollection:async C=>{let v=await t.remove(C);return l("delete",{id:C}),v},aggregate:async(C,v)=>{let S=await h(C);if(!S)return null;let w=o(S);return w.computed[v]?w.computed[v](S.items):null},getType:C=>Pn(C)}},Lv=pi});var gd={};Ee(gd,{createNoteManager:()=>mi,default:()=>zv});var mi,zv,Aa=y(()=>{Xs();mi=(e={})=>{let t=e.model,n=e.types||[],s=async()=>{let h=await t.getAll();return n.length===0?h:h.filter(f=>n.includes(f.type))},r=async h=>{let f=await t.get(h);return!f||n.length>0&&!n.includes(f.type)?null:f},i=async h=>{let f=await t.getAll(h);return n.length===0?f:f.filter(m=>n.includes(m.type))};return{model:t,types:n,getIndex:s,get:r,getAll:i,search:async(h={})=>(await i()).filter(m=>{for(let[g,b]of Object.entries(h))if(g==="tags"&&Array.isArray(b)){let _=m.tags||[];if(!b.some(R=>_.includes(R)))return!1}else if(g==="title"&&typeof b=="string"){if(!m.title.toLowerCase().includes(b.toLowerCase()))return!1}else if(g==="type"&&typeof b=="string"){if(m.type!==b)return!1}else if(m[g]!==b)return!1;return!0}),create:async(h={})=>{let f=h.slug||Bt(h.title||`note-${Date.now()}`);return t.add({...h,id:f,slug:f})},update:async(h,f={})=>t.edit(h,f),remove:async h=>t.remove(h),resolveLink:async h=>{let f=Bt(h);return t.get(f)}}},zv=mi});var bd={};Ee(bd,{createPlugin:()=>Zs});function Zs(e){let t=["COMMANDS"];return(e.resources||e.scheme)&&t.push("RESOURCE_PROVIDER"),e.icon&&t.push("ACTIVITY_BAR"),e.sidebarComponent&&t.push("SIDEBAR"),e.menus&&t.push("MENUS"),e.data&&t.push("DATA"),e.extraCapabilities&&t.push(...e.extraCapabilities),{id:e.id,name:e.name,description:e.description||"",version:e.version||"1.0.0",capabilities:[...new Set(t)],icon:e.icon,title:e.title||e.name,position:e.position||"top",order:e.order??100,route:e.route||`/${e.id}`,sidebarComponent:e.sidebarComponent||null,data:e.data||null,async onActivate(s){let r=s.context.getIDE();if(e.types&&await Uv(e.types),e.data&&await Nv(s,e.data),e.scheme&&e.resources&&s.resources.register(e.scheme,e.resources),e.commands)for(let[i,o]of Object.entries(e.commands)){let a=typeof o=="function"?o(s,r):o;if(a.execute){let l=a.execute;a.execute=(...c)=>l(s,r,...c)}s.commands.register(i,a)}if(e.menus)for(let[i,o]of Object.entries(e.menus))s.menus.register(i,o);if(e.contextMenus)for(let[i,o]of Object.entries(e.contextMenus))s.contextMenus.register(i,o);e.onSetup&&await e.onSetup(s,r)},onDeactivate(s){e.onTeardown&&e.onTeardown(s)}}}async function Uv(e){let{registerCollectionType:t,registerNoteType:n}=await Promise.resolve().then(()=>(Mn(),hi));if(e.collections)for(let[s,r]of Object.entries(e.collections))t({id:s,...r});if(e.notes)for(let[s,r]of Object.entries(e.notes))n({id:s,...r})}async function Nv(e,t){let n=(await Promise.resolve().then(()=>(Ue(),Sr))).default,{createCollectionManager:s}=await Promise.resolve().then(()=>(fi(),_a)),{createNoteManager:r}=await Promise.resolve().then(()=>(Aa(),gd)),i={};t.collections&&(i.collections=s({model:n.Model.collections,types:t.collections.types})),t.notes&&(i.notes=r({model:n.Model.notes,types:t.notes.types})),e.data=i}var gi=y(()=>{});var as={};Ee(as,{default:()=>xd,parseMarkdownFile:()=>Dn,parseYaml:()=>bi,sanitizeKeys:()=>Wt,serializeToMarkdown:()=>on,serializeYaml:()=>yi});var yd,Wt,Vv,Bv,Wv,bi,qv,yi,Dn,on,xd,qt=y(()=>{yd=new Set(["__proto__","constructor","prototype"]),Wt=e=>{if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Wt);let t={};for(let[n,s]of Object.entries(e))yd.has(n)||(t[n]=Wt(s));return t},Vv=e=>e.replace(/\\(.)/g,(t,n)=>n==="n"?`
`:n==="t"?"	":n==="r"?"\r":n==='"'?'"':n==="\\"?"\\":n),Bv=e=>e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r"),Wv=e=>{if(e.startsWith('"')&&e.endsWith('"')&&e.length>=2)return Vv(e.slice(1,-1));if(e.startsWith("'")&&e.endsWith("'")&&e.length>=2)return e.slice(1,-1).replace(/''/g,"'");if(e==="true")return!0;if(e==="false")return!1;if(e==="null"||e==="")return null;if(e.startsWith("[")&&e.endsWith("]"))try{return Wt(JSON.parse(e))}catch{return e.slice(1,-1).split(",").map(t=>t.trim().replace(/^["']|["']$/g,""))}if(e.startsWith("{")&&e.endsWith("}"))try{return Wt(JSON.parse(e))}catch{return console.warn(`[yaml] Failed to parse JSON object: ${e.slice(0,80)}`),e}return!isNaN(e)&&e!==""?Number(e):e},bi=e=>{let t={},n=e.split(/\r?\n/),s=0;for(;s<n.length;){let i=n[s].trim();if(!i||i.startsWith("#")){s++;continue}let o=i.indexOf(":");if(o===-1){s++;continue}let a=i.slice(0,o).trim();if(yd.has(a)){s++;continue}let l=i.slice(o+1).trim();if(l==="|"||l===">"){let d=l===">";s++;let h=[],f=null;for(;s<n.length;){let m=n[s];if(m.trim()===""){h.push(""),s++;continue}let g=m.length-m.trimStart().length;if(f===null){if(g===0)break;f=g}if(g<f)break;h.push(m.slice(f)),s++}for(;h.length&&h[h.length-1]==="";)h.pop();a in t&&console.warn(`[yaml] Duplicate frontmatter key "${a}" \u2014 last value wins`),t[a]=d?h.join(" "):h.join(`
`);continue}let c=Wv(l);a in t&&console.warn(`[yaml] Duplicate frontmatter key "${a}" \u2014 last value wins`),t[a]=c,s++}return t},qv=e=>e===""||e==="true"||e==="false"||e==="null"||e==="---"||!isNaN(e)&&e.trim()!==""||e.includes(":")||e.includes("#")||e.startsWith(" ")||e.endsWith(" ")||e.startsWith("-")||e.startsWith("?")||e.startsWith("!")||e.startsWith("&")||e.startsWith("*")||e.startsWith("@")||e.startsWith("`")||e.startsWith("{")&&e.endsWith("}")||e.startsWith("[")&&e.endsWith("]")||e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"),yi=e=>{let t=[];for(let[n,s]of Object.entries(e))if(s!==void 0)if(s===null)t.push(`${n}: null`);else if(typeof s=="boolean"||typeof s=="number")t.push(`${n}: ${s}`);else if(Array.isArray(s)||typeof s=="object")t.push(`${n}: ${JSON.stringify(s)}`);else if(s.includes(`
`)){t.push(`${n}: |`);for(let r of s.split(`
`))t.push(`  ${r}`)}else qv(s)?t.push(`${n}: "${Bv(s)}"`):t.push(`${n}: ${s}`);return t.join(`
`)},Dn=(e,t="body")=>{let n=e.split(/\r?\n/);if(n[0]!=="---")return{[t]:e};let s=-1;for(let a=1;a<n.length;a++)if(n[a]==="---"){s=a;break}if(s===-1)return{[t]:e};let r=n.slice(1,s).join(`
`),i=n.slice(s+1);for(;i.length>0&&i[0]==="";)i.shift();let o=bi(r);return o[t]=i.join(`
`),o},on=(e,t="body")=>{let{[t]:n,...s}=e;return`---
${yi(s)}
---

${n||""}`},xd={sanitizeKeys:Wt,parseYaml:bi,serializeYaml:yi,parseMarkdownFile:Dn,serializeToMarkdown:on}});var Ca=y(()=>{qt();qt()});var xi,er,Ea=y(()=>{qt();xi=e=>{try{return Wt(JSON.parse(e))}catch{return null}},er=e=>JSON.stringify(e,null,2)});var Ra,vd=y(()=>{rt();Ca();Ea();Ra={type:"file",indexCache:null,_initConfig(){this.indexCache=new Map,this.basePath=this.basePath||"content",this.bodyField=this.bodyField||"body",this.buildQueryResult=this.buildQueryResult||((e,t)=>({items:e,total:e.length})),this.matchesWhere=this.matchesWhere||(()=>!0),this.validateQueryOptions=this.validateQueryOptions||(()=>{}),this.generateId=this.generateId||(()=>`${Date.now()}${Math.random().toString(10).substr(2,2)}`),this.prepareRow=this.prepareRow||((e,t,n)=>({...n})),this.validateRow=this.validateRow||(()=>({valid:!0,errors:{}}))},async runBeforeAdd(e,t){let n=this.models?.[e];return n?.$hooks?.beforeAdd?await n.$hooks.beforeAdd(t,{model:e,adapter:this,operation:"add"}):t},async runAfterAdd(e,t){let n=this.models?.[e];return n?.$hooks?.afterAdd&&await n.$hooks.afterAdd(t,{model:e,adapter:this,operation:"add"}),t},async runBeforeEdit(e,t){let n=this.models?.[e];return n?.$hooks?.beforeEdit?await n.$hooks.beforeEdit(t,{model:e,adapter:this,operation:"edit"}):t},async runAfterEdit(e,t){let n=this.models?.[e];return n?.$hooks?.afterEdit&&await n.$hooks.afterEdit(t,{model:e,adapter:this,operation:"edit"}),t},async runBeforeRemove(e,t,n){let s=this.models?.[e];return!(s?.$hooks?.beforeRemove&&await s.$hooks.beforeRemove(n,{model:e,adapter:this,operation:"remove",id:t})===!1)},async runAfterRemove(e,t,n){let s=this.models?.[e];s?.$hooks?.afterRemove&&await s.$hooks.afterRemove(n,{model:e,adapter:this,operation:"remove",id:t})},stripImmutableFields(e,t){let n=this.models?.[e];if(!n)return t;let s={...t};for(let[r,i]of Object.entries(n))r.startsWith("$")||i?.immutable&&r in s&&r!=="id"&&delete s[r];return s},async init(){return this._initConfig(),ne.emit("FILE:LOG",{type:"initialized",basePath:this.basePath}),this.onConnected&&typeof this.onConnected=="function"&&this.onConnected(),this},_getModelPath(e){return`/${this.basePath}/${e}`},_getModelFormat(e){return this.models?.[e]?.$format||"markdown"},_getFilePath(e,t,n={}){let r=this._getModelFormat(e)==="json"?"json":"md";return n.canonicalId&&n.locale?`${this._getModelPath(e)}/${n.canonicalId}/${n.locale}.${r}`:`${this._getModelPath(e)}/${t}.${r}`},_getI18nFilePath(e,t,n){let r=this._getModelFormat(e)==="json"?"json":"md";return`${this._getModelPath(e)}/${t}/${n}.${r}`},_getAggregateFilePath(e){return`/${this.basePath}/${e}.json`},_getIndexPath(e){return`${this._getModelPath(e)}/_index.json`},async _fetchIndex(e){try{let t=await fetch(this._getIndexPath(e));if(!t.ok){if(t.status===404)return[];throw new Error(`Failed to fetch index: ${t.status}`)}return await t.json()}catch(t){return ne.emit("FILE:WARN",{type:"index_fetch_failed",model:e,error:t.message}),[]}},async _fetchFile(e,t){let n=this._getModelFormat(e),s=typeof t=="object"&&t!==null,r=s?t.slug:t,i=s?t.canonicalId:null,o=s?t.locale:null;try{let a=i&&o?this._getI18nFilePath(e,i,o):this._getFilePath(e,r),l=await fetch(a);if(!l.ok){if(l.status===404)return null;throw new Error(`Failed to fetch file: ${l.status}`)}let c=await l.text();return n==="json"?xi(c):Dn(c,this.bodyField)}catch(a){return ne.emit("FILE:ERROR",{type:"file_fetch_failed",model:e,slug:r,error:a.message}),null}},async _fetchAggregate(e){try{let t=await fetch(this._getAggregateFilePath(e));if(!t.ok){if(t.status===404)return null;throw new Error(`Failed to fetch aggregate: ${t.status}`)}return await t.json()}catch(t){return ne.emit("FILE:WARN",{type:"aggregate_fetch_failed",model:e,error:t.message}),null}},async _writeFile(e,t,n){let s=n.slug||t,r=this._getModelFormat(e),i=r==="json"?er(n):on(n,this.bodyField),o=await fetch(`/content/${e}/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({slug:s,content:i,data:n,_format:r})});if(!o.ok){let a=await o.text();throw new Error(`Failed to write file: ${a}`)}return await o.json()},async _deleteFile(e,t){let n=this._getModelFormat(e),s=await fetch(`/content/${e}/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({_format:n})});if(!s.ok){let r=await s.text();throw new Error(`Failed to delete file: ${r}`)}return await s.json()},async get(e,t,n={}){if(typeof t!="object"||t===null){let o=t,l=(await this._fetchIndex(e)).find(d=>String(d.id)===String(o)||d.slug===o);if(l)return this._fetchFile(e,l);let c=await this._fetchFile(e,o);return c||null}let r=t,i=await this.getAll(e,{where:r,limit:1});return i.length>0?i[0]:null},async getAll(e,t={}){if(this.validateQueryOptions(t),this._getModelFormat(e)==="json"){let o=await this._fetchAggregate(e);if(o){let a=this.buildQueryResult(o,t);return t.limit!==void 0?a:a.items}}let s=await this._fetchIndex(e),r=[];for(let o of s){let a=await this._fetchFile(e,o);a&&r.push(a)}let i=this.buildQueryResult(r,t);return t.limit!==void 0?i:i.items},async add(e,t){t=await this.runBeforeAdd(e,t),!t.id&&t.slug?t.id=t.slug:t.id||(t.id=this.generateId(!0));let n=await this._fetchFile(e,t.slug||t.id);if(n)return ne.emit("FILE:LOG",{type:"record_exists_skip",model:e,id:t.id}),n;let s=this.validateRow(this.models,e,t,{operation:"add"});if(!s.valid)throw new Error(`Validation failed: ${JSON.stringify(s.errors)}`);let r=this.prepareRow(this.models,e,t),i=this._getModelFormat(e),o=i==="json"?er(r):on(r,this.bodyField),a=await fetch(`/content/${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...r,content:o,_format:i})});if(!a.ok){let c=await a.text();throw new Error(`Failed to add record: ${c}`)}let l=await a.json();return ne.emit("FILE:LOG",{type:"record_added",model:e,id:r.id}),this.runAfterAdd(e,l.record||r)},async addMany(e,t){let n=[];for(let s of t)n.push(await this.add(e,s));return n},async edit(e,t,n){n=this.stripImmutableFields(e,n),n=await this.runBeforeEdit(e,{...n,id:t});let s=await this.get(e,t);if(!s)throw new Error(`Record with id ${t} not found in model "${e}"`);let r={...s,...n,id:t},i=this.prepareRow(this.models,e,r,{currentRow:s});return await this._writeFile(e,t,i),ne.emit("FILE:LOG",{type:"record_edited",model:e,id:t}),this.runAfterEdit(e,i)},async remove(e,t){let n=await this.get(e,t);return await this.runBeforeRemove(e,t,n)?(await this._deleteFile(e,t),await this.runAfterRemove(e,t,n),ne.emit("FILE:LOG",{type:"record_deleted",model:e,id:t}),!0):!1},async count(e,t={}){let n=await this.getAll(e,{where:t.where});return Array.isArray(n)?n.length:n.items?.length||0},async transaction(e){return e(this)},async close(){this.indexCache&&this.indexCache.clear(),ne.emit("FILE:LOG",{type:"connection_closed"})},async exportData(){let e={};for(let t of Object.keys(this.models))t.startsWith("$")||(e[t]=await this.getAll(t));return e},async importData(e,t={}){for(let[n,s]of Object.entries(e))this.models[n]&&await this.addMany(n,s)},getMetadata(){return{name:"FileAdapter",type:"file",version:this.version,models:Object.keys(this.models||{}),system:this.system,basePath:this.basePath}}}});var wd={};Ee(wd,{FileAdapter:()=>Ra,createCollectionManager:()=>pi,createNoteManager:()=>mi,default:()=>Ra,getAllCollectionTypes:()=>ai,getAllNoteTypes:()=>li,getCollectionType:()=>Pn,getNoteType:()=>oi,parseCollectionBody:()=>jn,parseItemLine:()=>Gs,parseJsonRecord:()=>xi,parseMarkdownFile:()=>Dn,registerCollectionType:()=>ri,registerNoteType:()=>ii,serializeCollectionBody:()=>os,serializeItemLine:()=>Js,serializeJsonRecord:()=>er,serializeToMarkdown:()=>on,slugify:()=>Bt,unregisterCollectionType:()=>ci,unregisterNoteType:()=>ui});var kd=y(()=>{vd();Ca();Ea();Xs();fi();Aa();Mn()});var $d={};Ee($d,{getIDE:()=>E,hasIDE:()=>nr,setCurrentIDE:()=>tr});function tr(e){vi=e}function E(){if(!vi)throw new Error("No IDE instance set. Call setCurrentIDE() before using IDE views.");return vi}function nr(){return vi!==null}var vi,Se=y(()=>{vi=null});var Cd={};Ee(Cd,{readContentRecord:()=>Hv,writeContentRecord:()=>Yv});var Sd,_d,Ad,Hv,Yv,Ed=y(()=>{Se();Sd=e=>{let t=e.replace(/^\//,"").replace(/\.md$/,"");return[`file:///content/${t}.md`,`file:///${t}.md`]},_d=async(e,t)=>{if(!e?.getContent)return null;try{let n=await e.getContent(t);return typeof n=="string"?n:null}catch{return null}},Ad=async e=>{let t=E();for(let n of Sd(e)){let s=t.resourceProviders.getProviderForUri(n);if(!s)continue;if(s.has)try{if(await s.has(n))return{uri:n,provider:s}}catch{}let r=await _d(s,n);if(r!==null)return{uri:n,provider:s,text:r}}return null},Hv=async e=>{let t=await Ad(e);if(!t)return null;let n=t.text??await _d(t.provider,t.uri);if(n===null)return null;let{parseMarkdownFile:s}=await Promise.resolve().then(()=>(qt(),as));return s(n,"body")},Yv=async(e,t)=>{let n=E(),s=await Ad(e),r=s?.uri||Sd(e)[0],i=s?.provider||n.resourceProviders.getProviderForUri(r);if(!i)throw new Error(`No file provider for ${r}`);let{serializeToMarkdown:o}=await Promise.resolve().then(()=>(qt(),as)),a=o(t,"body");if(!s&&i.create?await i.create(r,a):i.saveContent?await i.saveContent(r,a):i.create&&await i.create(r,a),n.typeIndex){let{body:l,...c}=t;try{let d=new URL(r).pathname;n.typeIndex.set(d,{frontmatter:c}),n.emit("typeIndex",n.typeIndex)}catch{}}}});var Rd={};Ee(Rd,{MediaResolver:()=>Qv});var Qv,Id=y(()=>{Qv={_cache:new Map,async resolve(e){if(!e||!e.startsWith("media://"))return e;let t=e.replace("media://","");if(this._cache.has(t))return this._cache.get(t);let n=await globalThis.$APP.Storage.getBlob(t);if(!n)return e;let s=URL.createObjectURL(n);return this._cache.set(t,s),s},isMediaUrl(e){return typeof e=="string"&&e.startsWith("media://")}}});var Td={};Ee(Td,{resizeImage:()=>Ia});async function Ia(e,t={}){let{maxWidth:n=1920,maxHeight:s=1920,quality:r=.85,type:i="image/webp"}=t;if(!e.type?.startsWith("image/"))return console.log("[resize] Skipping non-image file:",e.name,e.type),e;if(e.type==="image/svg+xml"||e.type==="image/gif")return console.log("[resize] Skipping SVG/GIF:",e.name),e;let o=await createImageBitmap(e),{width:a,height:l}=o,c=e.size;if(console.log(`[resize] Input: ${e.name} \u2014 ${a}x${l}, ${(c/1024).toFixed(1)}KB, ${e.type}`),console.log(`[resize] Limits: ${n}x${s}, quality=${r}, output=${i}`),a<=n&&l<=s)return o.close(),console.log("[resize] Already within bounds, skipping"),e;let d=Math.min(n/a,s/l),h=Math.round(a*d),f=Math.round(l*d),m=typeof OffscreenCanvas<"u"?new OffscreenCanvas(h,f):document.createElement("canvas");m instanceof OffscreenCanvas||(m.width=h,m.height=f),m.getContext("2d").drawImage(o,0,0,h,f),o.close();let b=i||e.type,_=m instanceof OffscreenCanvas?await m.convertToBlob({type:b,quality:r}):await new Promise(ee=>m.toBlob(ee,b,r)),R=b==="image/webp"?".webp":b==="image/jpeg"?".jpg":".png",D=e.name?.replace(/\.[^.]+$/,"")||"image",M=new File([_],`${D}${R}`,{type:b}),K=((1-M.size/c)*100).toFixed(1);return console.log(`[resize] Output: ${M.name} \u2014 ${h}x${f}, ${(M.size/1024).toFixed(1)}KB, ${b}`),console.log(`[resize] Saved ${K}% (${((c-M.size)/1024).toFixed(1)}KB)`),M}var Ta=y(()=>{});async function Pd(e,t){if(On)return t?{...On,...t}:On;let{html:n}=await Promise.resolve().then(()=>(H(),du)),{repeat:s}=await Promise.resolve().then(()=>(hd(),dd)),{default:r}=await Promise.resolve().then(()=>(V(),_c)),{default:i}=await Promise.resolve().then(()=>(Zt(),pu)),{createPlugin:o}=await Promise.resolve().then(()=>(gi(),bd)),{createCollectionManager:a}=await Promise.resolve().then(()=>(fi(),_a)),{slugify:l}=await Promise.resolve().then(()=>(kd(),wd)),{events:c}=await Promise.resolve().then(()=>(rt(),mc)),{getIDE:d}=await Promise.resolve().then(()=>(Se(),$d)),{readContentRecord:h,writeContentRecord:f}=await Promise.resolve().then(()=>(Ed(),Cd)),{parseMarkdownFile:m,serializeToMarkdown:g}=await Promise.resolve().then(()=>(qt(),as)),{parseCollectionBody:b,serializeCollectionBody:_}=await Promise.resolve().then(()=>(Xs(),md)),{getCollectionType:R}=await Promise.resolve().then(()=>(Mn(),hi)),D=null;try{({MediaResolver:D}=await Promise.resolve().then(()=>(Id(),Rd)))}catch{}let M=null;try{({resizeImage:M}=await Promise.resolve().then(()=>(Ta(),Td)))}catch{}return On={$APP:j,html:n,repeat:s,T:r,View:i,createPlugin:o,createCollectionManager:a,slugify:l,events:c,getIDE:d,injectCSS:(A,C)=>{if(!document.querySelector(`style[data-ext="${A}"]`)){let v=document.createElement("style");v.setAttribute("data-ext",A),v.textContent=C,document.head.appendChild(v)}},MediaResolver:D,registerTemplate:A=>e.templates?.register(A),registerView:A=>{let C=typeof A=="function"?A(On):A;if(!C?.tag)throw new Error("registerView: definition missing tag");let v=i.components.get(C.tag)||{};return v.definition=C,C.path&&(v.path=C.path),i.components.set(C.tag,v),C},readContentRecord:h,writeContentRecord:f,parseMarkdownFile:m,serializeToMarkdown:g,parseCollectionBody:b,serializeCollectionBody:_,getCollectionType:R,resizeImage:M},t?{...On,...t}:On}async function Md(e,t,n){let{default:s}=await import(`${e}/${t}/index.js`);if(!s)throw new Error("Plugin definition not found");return typeof s=="function"?await s(n):s}function jd(e,t,n={}){let s=new Map,r=new Map,i=n.path||"/extensions",o={installedExtensions:r,getState(){return{installed:o.getInstalledExtensions(),available:o.getAvailableExtensions()}},async initialize(){try{s.clear(),r.clear();try{let d=await fetch(`${i}/index.json`);if(d.ok){let h=await d.json();for(let f of h)s.set(f.id,f);console.log(`[ExtensionManager] loaded ${h.length} available from ${i}`)}else console.warn(`[ExtensionManager] ${i}/index.json returned ${d.status}`)}catch(d){console.error(`[ExtensionManager] could not fetch ${i}/index.json:`,d)}let a=e.configProvider,l=new Set;if(a){let d=await a.read("extensions.json");if(d.installed&&d.installed.length>0)l=new Set(d.installed);else{let h=[];for(let[f,m]of s)m.defaultInstalled===!0&&h.push(f);h.length>0&&(l=new Set(h),a.write("extensions.json",{installed:h}))}}let c=await Pd(e,n.contextExtras);for(let d of s.keys())if(l.has(d))try{let h=await Md(i,d,c);await e.registerPlugin(h),r.set(d,h)}catch(h){let f=s.get(d);console.error(`Failed to load extension "${d}":`,h),e.showMessage(`Failed to load extension: ${f?.name||d}.`,"error")}e.emit("extensionsChanged",o.getState())}catch(a){console.error("Failed to initialize ExtensionManager:",a)}},getAvailableExtensions:()=>Array.from(s.values()),getInstalledExtensions:()=>Array.from(r.values()),isInstalled:a=>r.has(a),async install(a){if(s.get(a)){if(r.has(a)){e.showMessage(`Extension ${a} is already installed.`,"warn");return}try{let c=await Pd(e,n.contextExtras),d=await Md(i,a,c),h=e.configProvider;if(h){let f=await h.read("extensions.json"),m=new Set(f.installed||[]);m.add(a),h.write("extensions.json",{installed:[...m]})}await e.registerPlugin(d),r.set(a,d),e.emit("extensionsChanged",o.getState()),e.showMessage(`Extension "${d.name}" installed successfully.`,"info")}catch(c){console.error(`Failed to install extension "${a}":`,c),e.showMessage(`Failed to install plugin: ${a}.`,"error")}}},async uninstall(a){let l=r.get(a);if(l){await e.unregisterPlugin(a),r.delete(a);let c=e.configProvider;if(c){let h=((await c.read("extensions.json")).installed||[]).filter(f=>f!==a);c.write("extensions.json",{installed:h})}e.emit("extensionsChanged",o.getState()),e.showMessage(`Extension "${l.name}" uninstalled.`,"info")}}};return o}var On,Fd=y(()=>{Ue()});function Dd(e){let t=new Map,n=new Map,s=new Map,r="default",i=[],o=null,a=1500,l=!1,c={editorFocused:!1,activeUri:null};function d(A){return A?A.split("&&").map(v=>v.trim()).every(v=>{let S=v.startsWith("!"),w=S?v.slice(1):v,P=c[w];return S?!P:!!P}):!0}function h(...A){l&&console.log("[KeybindingManager]",...A)}function f(A){return A?typeof A=="string"?A:A.key||null:null}function m(A){return!A||typeof A=="string"?null:A.when||null}function g(A){return A?A.split(/\s+/).map(v=>{let S=v.split("+");return{ctrl:S.includes("Ctrl"),shift:S.includes("Shift"),alt:S.includes("Alt"),meta:S.includes("Meta"),key:S[S.length-1].toUpperCase()}}):[]}function b(A){let C=A.ctrlKey||A.metaKey,v=A.shiftKey,S=A.altKey,w=A.key.toUpperCase();return w===" "&&(w="SPACE"),w==="ESCAPE"&&(w="ESC"),{ctrl:C,shift:v,alt:S,meta:A.metaKey,key:w}}function _(A,C){return A.ctrl===C.ctrl&&A.shift===C.shift&&A.alt===C.alt&&A.key===C.key}function R(A){let C=[];return A.ctrl&&C.push("Ctrl"),A.shift&&C.push("Shift"),A.alt&&C.push("Alt"),C.push(A.key),C.join("+")}function D(){i=[],o&&(clearTimeout(o),o=null),e.emit("keybindingSequence",null)}function M(){o&&clearTimeout(o),o=setTimeout(()=>{D()},a)}function K(A,C){if(A.length>C.length)return"none";for(let v=0;v<A.length;v++)if(!_(A[v],C[v]))return"none";return A.length===C.length?"exact":"partial"}function ee(A){let C=e.getAllCommands(),v=null,S=null,w=!1,P=[],B=A.map(te=>R(te)).join(" ");h("_findMatches: searching for sequence:",B),h("_findMatches: total commands:",Object.keys(C).length);let J=0;for(let te of Object.values(C)){let se=Y.getEffectiveBinding(te.id);if(!se)continue;let oe=f(se),ce=m(se),le=g(oe);if(le.length===0)continue;le.length>1&&J++;let ke=K(A,le);if(ke==="exact")if(d(ce)){let ue=!!ce;!S||ue&&!w?(h("_findMatches: EXACT match found:",te.id,"binding:",oe,"hasWhen:",ue),v=!0,S=te,w=ue):h("_findMatches: EXACT match skipped (lower priority):",te.id)}else h("_findMatches: EXACT match skipped (when clause failed):",te.id,"when:",ce);else ke==="partial"&&(h("_findMatches: PARTIAL match found:",te.id,"binding:",oe),P.push(te))}return h("_findMatches: multi-key bindings found:",J),{exactMatch:v,partialMatches:P,command:S}}let Y={get activeSchemeId(){return r},setContext(A,C){c[A]=C,h("setContext:",A,"=",C)},getContext:A=>c[A],registerDefaultBinding(A,C){h("registerDefaultBinding:",A,"->",C),t.set(A,C)},registerScheme(A){if(!A.id||!A.keybindings){console.warn("Invalid scheme: must have id and keybindings");return}h("registerScheme:",A.id,"with",Object.keys(A.keybindings).length,"keybindings"),s.set(A.id,{id:A.id,name:A.name||A.id,description:A.description||"",keybindings:new Map(Object.entries(A.keybindings))})},unregisterScheme(A){A!=="default"&&(s.delete(A),r===A&&(r="default"))},setActiveScheme(A){return h("setActiveScheme:",A,"available schemes:",[...s.keys()]),A!=="default"&&!s.has(A)?(console.warn(`Scheme '${A}' not found`),!1):(r=A,h("Active scheme now:",r),D(),e.emit("keybindingSchemeChanged",A),!0)},getActiveScheme:()=>r,getAvailableSchemes:()=>["default",...s.keys()],getSchemeInfo(A){return A==="default"?{id:"default",name:"Default",description:"Standard keybindings"}:s.get(A)},getEffectiveBinding(A){if(n.has(A))return n.get(A);if(r!=="default"){let C=s.get(r);if(C?.keybindings.has(A))return C.keybindings.get(A)}return t.get(A)||null},async loadUserBindings(){let A=e.configProvider;if(!A)return;let C=await A.read("keymaps.json");n.clear();for(let[v,S]of Object.entries(C))n.set(v,S)},setUserBinding(A,C){n.set(A,C);let v=e.configProvider;v&&v.write("keymaps.json",Object.fromEntries(n))},removeUserBinding(A){n.delete(A);let C=e.configProvider;C&&C.write("keymaps.json",Object.fromEntries(n))},handleKeyEvent(A){let C=b(A),v=R(C);if(["CONTROL","SHIFT","ALT","META"].includes(C.key))return;h("handleKeyEvent:",v,"| activeScheme:",r,"| currentSequence:",i.map(J=>R(J)));let S=[...i,C],{exactMatch:w,partialMatches:P,command:B}=ee(S);if(h("findMatches result:",{exactMatch:w,partialMatchCount:P.length,command:B?.id}),P.length>0){h("PARTIAL MATCH! Waiting for more keys. Partial matches:",P.map(te=>te.id)),A.preventDefault(),i=S,M();let J=S.map(te=>R(te)).join(" ");h("Notifying keybindingSequence:",J),e.emit("keybindingSequence",J);return}if(w){h("EXACT MATCH! Executing:",B.id),A.preventDefault(),D(),e.executeCommand(B.id);return}i.length>0&&(h("No match found, resetting sequence"),D())},getBindingsForCommand(A){let C=[],v=t.get(A);v&&C.push({schemeId:"default",keybinding:v});for(let[S,w]of s)w.keybindings.has(A)&&C.push({schemeId:S,keybinding:w.keybindings.get(A)});return C},getAllBindings(){let A={};for(let[C]of t)A[C]=Y.getEffectiveBinding(C);return A},dumpBindings(){if(h("=== KEYBINDING DUMP ==="),h("Active scheme:",r),h("Default bindings count:",t.size),h("Registered schemes:",[...s.keys()]),h("Current context:",c),r!=="default"){let C=s.get(r);if(C){h("Active scheme bindings:");for(let[v,S]of C.keybindings){let w=f(S),P=m(S);h(`  ${v} -> ${w}${P?` (when: ${P})`:""}`)}}}h("Effective bindings with multi-key sequences:");let A=e.getAllCommands();for(let C of Object.values(A)){let v=Y.getEffectiveBinding(C.id),S=f(v);S&&S.includes(" ")&&h(`  ${C.id} -> ${S}`)}h("=== END DUMP ===")}};return Y}var Od=y(()=>{});function Ld(e){return e.menuContexts=e.menuContexts||new Map,{registerMenuItems(t,n,s,r={}){e.menus.has(n)||e.menus.set(n,[]);let i=e.menus.get(n),o=s.map(a=>({...a,pluginId:t}));i.push(...o),r.context&&e.menuContexts.set(n,r.context),e.emit("menus",e.getMenus())},unregisterMenuItems(t,n){if(e.menus.has(n)){let s=e.menus.get(n).filter(r=>r.pluginId!==t);e.menus.set(n,s),e.emit("menus",e.getMenus())}},getMenus(){return Object.fromEntries(e.menus)},getMenuItems(t){let s=Array.from(e.menus.keys()).filter(o=>{let a=e.menuContexts.get(o);return a?t?.startsWith(a):!0}),r=s.filter(o=>o!=="Help");return s.includes("Help")?[...r,"Help"]:r},registerContextMenuItems(t,n,s){e.contextMenus.has(n)||e.contextMenus.set(n,[]);let r=e.contextMenus.get(n),i=s.map(o=>({...o,pluginId:t}));r.push(...i)},unregisterContextMenuItems(t,n){if(e.contextMenus.has(n)){let s=e.contextMenus.get(n).filter(r=>r.pluginId!==t);e.contextMenus.set(n,s)}},getContextMenuActions(t){return e.contextMenus.get(t)||[]}}}var zd=y(()=>{});function wi(e=[],t=null){return{id:`panel_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,openResources:e,activeResourceUri:t}}function Ud(e){return{_createPanel:wi,getActivePanel(){return e.panels.find(t=>t.id===e.activePanelId)},setActivePanel(t){if(e.activePanelId!==t){e.setState("activePanelId",t);let n=e.panels.find(s=>s.id===t);e.setState("activeResourceUri",n?.activeResourceUri)}},handleTabSelect(t,n){let s=e.panels.find(r=>r.id===n);s&&(s.activeResourceUri=t,e.setActivePanel(n),e.setState("panels",[...e.panels]),e.emit(We.onEditorFocus,{uri:t,panelId:n}))},handleTabClose(t,n){let s=e.panels.find(i=>i.id===n);if(!s)return;let r=s.openResources.indexOf(t);if(r!==-1){if(s.openResources.splice(r,1),s.activeResourceUri===t){let i=s.openResources[r]||s.openResources[r-1]||null;s.activeResourceUri=i}s.openResources.length===0&&e.panels.length>1&&(e.panels=e.panels.filter(i=>i.id!==n),e.activePanelId===n&&e.setActivePanel(e.panels[0]?.id||null)),e.setState("activeResourceUri",e.getActivePanel()?.activeResourceUri),e.setState("panels",[...e.panels]),e.emit(We.onResourceClose,{uri:t,panelId:n})}},closeOtherTabs(t,n){let s=e.panels.find(r=>r.id===n);s?.openResources.includes(t)&&(s.openResources=[t],s.activeResourceUri=t,e.setState("panels",[...e.panels]))},closeAllTabs(t){let n=e.panels.find(s=>s.id===t);n&&(n.openResources=[],n.activeResourceUri=null,e.panels.length>1?(e.panels=e.panels.filter(s=>s.id!==t),e.activePanelId===t&&e.setActivePanel(e.panels[0]?.id||null)):e.setState("activeResourceUri",null),e.setState("panels",[...e.panels]))},splitEditor(t,n,s){let r=wi([n],n),i=e.panels.findIndex(o=>o.id===s);e.panels.splice(i+1,0,r),e.setState("panels",[...e.panels]),e.setActivePanel(r.id)}}}var Nd=y(()=>{En()});var Vd,Pa,Bd=y(()=>{En();Vd={ACTIVITY_BAR:"activity-bar",SIDEBAR:"sidebar",PANEL:"panel",STATUS_BAR:"status-bar",EDITOR:"editor",WEBVIEW:"webview",TREE_VIEW:"tree-view",COMMANDS:"commands",KEYBINDINGS:"keybindings",MENUS:"menus",LANGUAGE_SUPPORT:"language-support",DEBUGGER:"debugger",TASK_PROVIDER:"task-provider",SCM_PROVIDER:"scm-provider",RESOURCE_PROVIDER:"resource-provider",TERMINAL:"terminal",SEARCH:"search",DIAGNOSTICS:"diagnostics",TESTING:"testing",WORKSPACE:"workspace",SETTINGS:"settings",AUTHENTICATION:"authentication",TELEMETRY:"telemetry"},Pa=(e,t)=>({fs:{readFile:n=>e.openResource(`file://${n}`),writeFile:(n,s)=>e.handleResourceContentChange(`file://${n}`,s),search:n=>window.electronAPI?.fs?.search(n),replaceAll:n=>window.electronAPI?.fs?.replaceAll(n)},resources:{register:(n,s)=>e.resourceProviders.register(n,s),unregister:n=>e.resourceProviders.unregister(n),open:n=>e.openResource(n),getContent:n=>e.resourceContents[n],setContent:(n,s)=>e.handleResourceContentChange(n,s),save:n=>e.saveResource(n),getTree:n=>e.resourceTrees.get(n),refreshTree:n=>e.refreshResourceTree(n),exists:(n,s="file")=>{let r=e.resourceProviders.getProvider(s);return r?.exists?r.exists(n):null}},editor:{getActiveEditor:()=>e.getActivePanel()?.activeResourceUri,getOpenEditors:()=>e.getActivePanel()?.openResources||[],openFile:n=>e.openResource(`file://${n}`),closeFile:n=>{let s=e.getActivePanel();s&&e.handleTabClose(`file://${n}`,s.id)},getContent:n=>e.resourceContents[`file://${n}`],setContent:(n,s)=>e.handleResourceContentChange(`file://${n}`,s),saveFile:()=>e.saveActiveResource(),insertText:n=>{let s=e.getActivePanel();s?.activeResourceUri?e.emit("editor:insertText",{text:n,panelId:s.id,uri:s.activeResourceUri}):console.warn("No active editor to insert text into.")}},commands:{register:(n,s)=>e.registerCommand(t,n,s),execute:(n,...s)=>e.executeCommand(n,...s),getAll:()=>e.getAllCommands()},keybindings:{registerScheme:n=>e.keybindings.registerScheme(n),unregisterScheme:n=>e.keybindings.unregisterScheme(n),setScheme:n=>e.keybindings.setActiveScheme(n),getActiveScheme:()=>e.keybindings.activeSchemeId,getAvailableSchemes:()=>e.keybindings.getAvailableSchemes(),getSchemeInfo:n=>e.keybindings.getSchemeInfo(n),getBinding:n=>e.keybindings.getEffectiveBinding(n),getAllBindings:()=>e.keybindings.getAllBindings()},ui:{showMessage:(n,s="info")=>e.showMessage(n,s),showInputBox:n=>e.showInputBox(n),showQuickPick:(n,s)=>e.showQuickPick(n,s),showConfirm:n=>e.showConfirm(n),setStatusBarItem:(n,s)=>e.setStatusBarItem(t,n,s),removeStatusBarItem:n=>e.removeStatusBarItem(t,n),setTabAction:(n,s)=>e.setTabAction(t,n,s),removeTabAction:n=>e.removeTabAction(t,n)},menus:{register:(n,s,r)=>e.registerMenuItems(t,n,s,r),unregister:n=>e.unregisterMenuItems(t,n)},contextMenus:{register:(n,s)=>e.registerContextMenuItems(t,n,s),unregister:n=>e.unregisterContextMenuItems(t,n)},workspace:{getFileTree:()=>e.resourceTrees.get("file"),getOpenFolders:()=>e.openFolders,getConfiguration:n=>e.getConfiguration(n),setConfiguration:(n,s)=>e.setConfiguration(n,s),openWorkspace:n=>window.electronAPI?.openWorkspace(n),getRootPath:()=>{let n=e.resourceProviders.getProvider("file");return n?.getRootPath?n.getRootPath():null}},events:{on:(n,s)=>e.subscribe(n,s),emit:(n,s)=>e.emit(n,s),once:(n,s)=>{let r=e.subscribe(n,i=>{s(i),r()});return r}},diagnostics:{set:(n,s)=>e.setDiagnostics(n,s),clear:n=>e.clearDiagnostics(n),getCount:()=>e.getDiagnosticsCount()},state:{get:n=>e.getPluginState(t,n),set:(n,s)=>e.setPluginState(t,n,s),delete:n=>e.deletePluginState(t,n),clear:()=>e.clearPluginState(t)},data:{collections:null,notes:null},context:{getPluginPath:()=>`/plugins/${t}`,getIDE:()=>e,getPluginId:()=>t}})});var ls,Ma,ja,ki,Fa,Wd,Kv,Je,cs,qd,Hd,Ln=y(()=>{ls=new Map,Ma=null,ja={},ki=async e=>{Ma=e,e&&(ja=await e.read("settings.json"))},Fa=()=>ja,Wd=e=>(ja=e,Ma?(Ma.write("settings.json",e),!0):!1),Kv=()=>{let e=globalThis.$APP?.manifest;return!e||typeof e!="object"?{}:e.settings&&typeof e.settings=="object"?e.settings:e},Je=(e,t)=>{let n=Fa();if(e in n)return n[e];let s=Kv();return e in s?s[e]:t},cs=(e,t)=>{let n={...Fa()},s=Je(e);n[e]=t,Wd(n);let r=ls.get(e);if(r)for(let i of r)try{i(t,s)}catch(o){console.error("[settings] Listener error:",o)}},qd=e=>{let t={...Fa()};if(!(e in t))return;let n=t[e];delete t[e],Wd(t);let s=Je(e),r=ls.get(e);if(r)for(let i of r)try{i(s,n)}catch(o){console.error("[settings] Listener error:",o)}},Hd=(e,t)=>(ls.has(e)||ls.set(e,new Set),ls.get(e).add(t),()=>ls.get(e)?.delete(t))});var $i,Gv,Jv,Yd,Qd,Da=y(()=>{Ln();$i=new Map,Gv=e=>e?.type==="file"&&e.path?.endsWith(".md"),Jv=async(e,t)=>{if(e.typeIndex||(e.typeIndex=new Map),e.typeIndex.has(t))return e.typeIndex.get(t);if($i.has(t))return $i.get(t);let n=(async()=>{try{let r=await e.resourceProviders.getProviderForUri(`file://${t}`)?.getContent?.(`file://${t}`);if(typeof r!="string")return null;let{parseMarkdownFile:i}=await Promise.resolve().then(()=>(qt(),as)),o=i(r,"body"),{body:a,...l}=o,c={frontmatter:l};return e.typeIndex.set(t,c),c}catch{return null}finally{$i.delete(t)}})();return $i.set(t,n),n},Yd=async(e,t)=>{if(!Je("typeDispatch")||!t)return;let n=[];for(let i of Object.values(t))Gv(i)&&!e.typeIndex?.has(i.path)&&n.push(i.path);if(n.length===0)return;let s=!1,r=8;for(let i=0;i<n.length;i+=r){let o=n.slice(i,i+r);(await Promise.all(o.map(l=>Jv(e,l)))).some(Boolean)&&(s=!0)}s&&e.emit("typeIndex",e.typeIndex)},Qd=(e,t)=>{if(!t?.endsWith(".md"))return null;let n=e.typeIndex?.get(t);return n||null}});function Kd(e){return{async _resolveTypeURI(t){if(!Je("typeDispatch")||!t.startsWith("file://"))return null;let n;try{n=new URL(t).pathname}catch{return null}if(!n.endsWith(".md"))return null;let r=e.typeIndex?.get(n)?.frontmatter;if(!r){let d=e.resourceProviders.getProviderForUri(t),h;try{h=await d?.getContent?.(t)}catch{return null}if(typeof h!="string")return null;let{parseMarkdownFile:f}=await Promise.resolve().then(()=>(qt(),as)),{body:m,...g}=f(h,"body");r=g,(e.typeIndex||=new Map).set(n,{frontmatter:r})}let{getTypeForRecord:i,getTypeById:o}=await Promise.resolve().then(()=>(Mn(),hi)),l=n.startsWith("/content/")?i(r):r?.type?o(r.type):null;if(!l?.scheme||!l.buildUri)return null;let c=n.replace(/^\/content\//,"").replace(/^\//,"").replace(/\.md$/,"");return l.buildUri({path:c,frontmatter:r})},_invalidateTypeIndex(t){if(!(!e.typeIndex||!t?.startsWith?.("file://")))try{let n=new URL(t).pathname;e.typeIndex.delete(n)}catch{}},async refreshResourceTree(t){let n=e.resourceProviders.getProvider(t);if(!n||!n.getTree){console.warn(`No tree provider for scheme: ${t}`);return}try{let s=await n.getTree(e.openFolders);e.resourceTrees.set(t,s);for(let r of e.panels)for(let i of r.openResources)i.startsWith(`${t}:`)&&!Object.hasOwn(e.resourceContents,i)&&await e._loadResourceContent(i,n);e.emit("resourceTrees",e.resourceTrees),t==="file"&&Yd(e,s)}catch(s){console.error(`Failed to refresh resource tree for ${t}:`,s)}},async _loadResourceContent(t,n){if(n||(n=e.resourceProviders.getProviderForUri(t)),!n)return console.error(`No provider to load content for: ${t}`),null;try{let s=await n.getContent(t);return e.resourceContents={...e.resourceContents,[t]:s},e.resourceModified.set(t,!1),e.emit("resourceContents",e.resourceContents),e.emit("resourceModified",e.resourceModified),s}catch(s){return console.error(`Failed to load resource: ${t}`,s),e.showMessage(`Failed to load resource: ${t}`,"error"),null}},async _handleResourceEvent(t){if(this._invalidateTypeIndex(t.uri),t.type==="modified"){let n=t.uri;!e.resourceModified.get(n)&&e.panels.some(i=>i.openResources.includes(n))&&(console.log(`[IDE] External change detected for open resource: ${n}. Reloading content.`),await e._loadResourceContent(n))}try{let n=new URL(t.uri).protocol.slice(0,-1);await e.refreshResourceTree(n)}catch(n){console.warn("[IDE] Could not parse URI for refresh:",t.uri,n)}e.emit(We.onResourceChange,{uri:t.uri,type:t.type})},async handleResourceContentChange(t,n){e.resourceContents[t]!==n&&(e.resourceContents={...e.resourceContents,[t]:n},e.resourceModified.set(t,!0),e.emit("resourceContents",e.resourceContents),e.emit("resourceModified",e.resourceModified),e.setState("panels",[...e.panels]),e.emit(We.onEditorChange,{uri:t,content:n}))},async saveActiveResource(){let t=e.getActivePanel()?.activeResourceUri;t&&await e.saveResource(t)},hasResource(t){let n=e.resourceProviders.getProviderForUri(t);return n?.has?n.has(t):null},async saveResource(t){let n=e.resourceProviders.getProviderForUri(t);if(!n){e.showMessage(`Cannot save: No provider for ${t}`,"error");return}if(!n.saveContent){e.showMessage(`Cannot save: Resource ${t} is read-only.`,"warn");return}if(!e.resourceModified.get(t))return;let s=e.resourceContents[t];if(s===void 0)return;let r=[...e.listeners.get(We.onWillSaveResource)??[]];for(let i of r)s=await i({uri:t,content:s});try{let i=await n.saveContent(t,s);this._invalidateTypeIndex(t),i?.uri&&i.uri!==t&&(await e.renameResource(t,i.uri),t=i.uri),e.resourceContents[t]!==s&&(e.resourceContents={...e.resourceContents,[t]:s}),e.resourceModified.set(t,!1),e.emit("resourceModified",e.resourceModified),e.setState("panels",[...e.panels]),e.emit(We.onResourceSave,{uri:t,content:s})}catch(i){console.error(`Failed to save resource: ${t}`,i),e.showMessage(`Failed to save: ${i.message}`,"error")}},async renameResource(t,n){let s=e.resourceProviders.getProviderForUri(t);if(!s||!s.rename){e.showMessage(`Cannot rename: Operation not supported for ${t}`,"error");return}await s.rename(t,n),e.panels.forEach(i=>{let o=i.openResources.indexOf(t);o>-1&&(i.openResources[o]=n,i.activeResourceUri===t&&(i.activeResourceUri=n))}),e.setState("panels",[...e.panels]),e.getActivePanel()?.activeResourceUri===n&&e.setState("activeResourceUri",n),Object.hasOwn(e.resourceContents,t)&&(e.resourceContents={...e.resourceContents,[n]:e.resourceContents[t]},delete e.resourceContents[t]),e.resourceModified.has(t)&&(e.resourceModified.set(n,e.resourceModified.get(t)),e.resourceModified.delete(t));let r=new URL(t).protocol.slice(0,-1);await e.refreshResourceTree(r),e.emit(We.onResourceRename,{oldUri:t,newUri:n})},async createResource(t,n=""){let s=e.resourceProviders.getProviderForUri(t);if(!s||!s.create){e.showMessage(`Cannot create: Operation not supported for ${t}`,"error");return}let r=await s.create(t,n),i=new URL(t).protocol.slice(0,-1);return await e.refreshResourceTree(i),e.emit(We.onResourceCreate,{uri:r,content:n}),r},async deleteResource(t){let n=e.resourceProviders.getProviderForUri(t);if(!n||!n.delete){e.showMessage(`Cannot delete: Operation not supported for ${t}`,"error");return}await n.delete(t),e.panels.forEach(r=>{r.openResources.includes(t)&&e.handleTabClose(t,r.id)}),delete e.resourceContents[t],e.resourceModified.delete(t);let s=new URL(t).protocol.slice(0,-1);await e.refreshResourceTree(s),e.emit(We.onResourceDelete,{uri:t})},async openResource(t){let n=e.getActivePanel();if(!n)return;let s=await this._resolveTypeURI(t);if(s&&s!==t)return this.openResource(s);let r=e.resourceProviders.getProviderForUri(t);if(!r){e.showMessage(`No resource provider found for URI: ${t}`,"error");return}Object.hasOwn(e.resourceContents,t)||await e._loadResourceContent(t,r),n.openResources.includes(t)||n.openResources.push(t),n.activeResourceUri=t,e.setState("activeResourceUri",t),e.setState("panels",[...e.panels]),e.emit(We.onResourceOpen,{uri:t,panelId:n.id})},async toggleFolder(t,n="file"){e.openFolders.indexOf(t)>-1?e.openFolders=e.openFolders.filter(r=>r!==t&&!r.startsWith(`${t}/`)):e.openFolders.push(t),e.setState("openFolders",[...e.openFolders]),await e.refreshResourceTree(n)}}}var Gd=y(()=>{En();Ln();Da()});function Jd(e){let t=new Map,n=new Map;return{register(s,r){if(t.has(s)&&(console.warn(`Resource provider for scheme "${s}" is being overwritten.`),this.unregister(s)),t.set(s,r),r.watch){let i=r.watch(o=>{e._handleResourceEvent(o)});i instanceof Promise?i.then(o=>{n.set(s,o)}):n.set(s,i)}console.log(`[IDE] Resource provider registered for scheme: ${s}`)},unregister(s){let r=n.get(s);r&&(r(),n.delete(s)),t.delete(s),console.log(`[IDE] Resource provider unregistered for scheme: ${s}`)},getProviderForUri(s){try{let r=new URL(s).protocol.slice(0,-1);return t.get(r)}catch(r){console.error(`Invalid URI: ${s}`,r);return}},getProvider:s=>t.get(s),getSearchableProviders(){let s=[];for(let[r,i]of t)typeof i.search=="function"&&s.push({scheme:r,provider:i});return s},dispose(){n.forEach(s=>s()),n.clear(),t.clear()}}}var Xd=y(()=>{});function Zd(e){let t=null;return{async _loadState(){let n=e.configProvider;if(n)try{let s=await n.read("workspace.json");s&&Object.keys(s).length>0&&(e.panels=s.panels?.length>0?s.panels:[e._createPanel()],e.panels.forEach(r=>{r.openFiles&&(r.openResources=r.openFiles,delete r.openFiles),r.activeFilePath&&(r.activeResourceUri=r.activeFilePath,delete r.activeFilePath)}),e.activePanelId=s.activePanelId||e.panels[0]?.id,e.openFolders=s.openFolders||[],e.activeActivity=s.activeActivity||"files",e.sidebarVisible=s.sidebarVisible??!0,e.recentResources=s.recentResources||[],e.activeResourceUri=e.getActivePanel()?.activeResourceUri||null,e.emit("panels",e.panels),e.emit("activePanelId",e.activePanelId),e.emit("openFolders",e.openFolders),e.emit("activeActivity",e.activeActivity),e.emit("sidebarVisible",e.sidebarVisible),e.emit("recentResources",e.recentResources),e.emit("resourceContents",e.resourceContents),e.emit("resourceModified",e.resourceModified),e.emit("activeResourceUri",e.activeResourceUri))}catch(s){console.error("Failed to load IDE state:",s)}},async _loadOpenResourceContents(){for(let n of e.panels)for(let s of n.openResources||[])try{console.log("[IDE] _loadOpenResourceContents: loading",s);let r=new URL(s).protocol.slice(0,-1),i=e.resourceProviders.getProvider(r);i&&!Object.hasOwn(e.resourceContents,s)?(await e._loadResourceContent(s,i),console.log("[IDE] _loadOpenResourceContents: loaded",s)):console.log("[IDE] _loadOpenResourceContents: skipped",s,i?"already loaded":"no provider")}catch(r){console.warn(`Failed to load resource content for ${s}:`,r)}console.log("[IDE] _loadOpenResourceContents: done")},async _saveState(){let n=e.configProvider;if(!n)return;let s={panels:e.panels,activePanelId:e.activePanelId,openFolders:e.openFolders,activeActivity:e.activeActivity,sidebarVisible:e.sidebarVisible,recentResources:e.recentResources};try{n.write("workspace.json",s)}catch(r){console.error("Failed to save IDE state:",r)}},_debouncedSaveState(){t&&clearTimeout(t),t=setTimeout(()=>e._saveState(),2e3)},_clearSaveTimeout(){t&&clearTimeout(t)}}}var eh=y(()=>{});function th(e){return{async showConfirm(t={}){let n=`modal_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,s=new Promise(r=>{e._pendingModals.set(n,{resolve:r})});return e.emit("ui:showModal",{id:n,type:"confirm",options:t}),await s||!1},resolveModal({id:t,value:n,cancelled:s=!1}){if(e._pendingModals.has(t)){let{resolve:r}=e._pendingModals.get(t);r(s?void 0:n),e._pendingModals.delete(t),e.emit("ui:hideModal",{id:t})}},showMessage(t,n="info"){console.log(`[${n.toUpperCase()}] ${t}`),e.emit("message",{message:t,type:n})},async showInputBox(t){let n=`modal_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,s=new Promise(r=>{e._pendingModals.set(n,{resolve:r})});return e.emit("ui:showModal",{id:n,type:"inputBox",options:t}),s},async showQuickPick(t,n){let s=`modal_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,r=new Promise(i=>{e._pendingModals.set(s,{resolve:i})});return e.emit("ui:showModal",{id:s,type:"quickPick",items:t,options:n}),r},setStatusBarItem(t,n,s){let r=`${t}.${n}`;e.statusBarItems.set(r,s),e.emit("statusBar",e.statusBarItems)},removeStatusBarItem(t,n){let s=`${t}.${n}`;e.statusBarItems.delete(s),e.emit("statusBar",e.statusBarItems)},setTabAction(t,n,s){let r=`${t}.${n}`;e.tabActions.set(r,s),e.emit("tabActions",e.tabActions)},removeTabAction(t,n){let s=`${t}.${n}`;e.tabActions.delete(s),e.emit("tabActions",e.tabActions)},setDiagnostics(t,n){e.diagnostics.set(t,n),e.emit("diagnosticsChanged",e.getDiagnosticsCount())},clearDiagnostics(t){e.diagnostics.delete(t),e.emit("diagnosticsChanged",e.getDiagnosticsCount())},getDiagnosticsCount(){let t=0,n=0;for(let s of e.diagnostics.values())t+=s.errors||0,n+=s.warnings||0;return{errors:t,warnings:n}},setEditorSetting(t,n){e.editorSettings={...e.editorSettings,[t]:n},e.emit("editorSettingsChanged",e.editorSettings)},getEditorSettings(){return e.editorSettings}}}var nh=y(()=>{});function sr(e={}){let t={config:{plugins:e.plugins||[],platform:e.platform||"web",basePath:e.basePath||"",...e},_initialized:!1};t.basePath=t.config.basePath,t.resourceTrees=new Map,t.resourceContents={},t.resourceModified=new Map,t.activeResourceUri=null,t.activeActivity="files",t.sidebarVisible=!0,t.activeRightActivity=null,t.contextProviders=new Map,t.openFolders=[],t.recentResources=[],t.commandPaletteOpen=!1,t.panels=[wi()],t.activePanelId=t.panels[0].id,t.activityBarPlugins=new Map,t.pluginState=new Map,t.statusBarItems=new Map,t.tabActions=new Map,t.commands=new Map,t.menus=new Map,t.contextMenus=new Map,t._pendingModals=new Map,t.diagnostics=new Map,t.editorSettings={indentStyle:"space",indentSize:2},Rs(t,{getter:!1}),t._listeners=t.listeners,t.subscribe=t.on,t.plugins=td(),t.resourceProviders=Jd(t),t.extensions=jd(t,j.Model,t.config.extensions||{}),t.keybindings=Dd(t);let n=nd(t),s=rd(t),r=Ld(t),i=Ud(t),o=Kd(t),a=Zd(t),l=th(t);Object.assign(t,n,s,r,i,o,a,l),t.$sync=An.createSync(t,"ide",["activeResourceUri","activeActivity","sidebarVisible","activeRightActivity","commandPaletteOpen","panels","activePanelId","findWidgets","resourceContents","resourceModified","openFolders","recentResources"]),t.setState=(c,d)=>{t[c]!==d&&(t[c]=d,t._debouncedSaveState())},t.init=async(c={})=>{if(t._initialized)return t;t._initialized=!0,console.log("[IDE] init: starting");let d={...t.config,...c},h=d.platform||(window.electronAPI?"electron":"web");t.platform=h;let f=d.plugins||[];for(let g of f)console.log("[IDE] init: registering plugin",g.id||g.name),await t.registerPlugin(g,{isDefault:!0});console.log("[IDE] init: default plugins registered"),t.configProvider&&(console.log("[IDE] init: initSettings..."),await ki(t.configProvider),console.log("[IDE] init: loadUserBindings..."),await t.keybindings.loadUserBindings()),console.log("[IDE] init: loadState..."),await t._loadState(),t.resourceProviders.getProvider("file")&&(console.log("[IDE] init: refreshResourceTree..."),await t.refreshResourceTree("file")),console.log("[IDE] init: extensions.initialize..."),await t.extensions.initialize();let m=j.Router;if(m?.routes?.length){let g=m.adapter.getLocation();m.setCurrentRoute(g.href,!1)}return console.log("[IDE] init: activatePlugins..."),await t.activatePlugins(),console.log("[IDE] init: loadOpenResourceContents..."),await t._loadOpenResourceContents(),console.log("[IDE] init: emitting ide:ready"),t.emit("ide:ready"),t},t.dispose=async()=>{t._initialized&&(t._initialized=!1,await t.plugins.disposeAll(),t.activityBarPlugins.clear(),t.listeners.clear(),t._clearSaveTimeout(),await t._saveState(),t.configProvider&&await t.configProvider.flush())},t.registerPlugin=async(c,d={})=>{if(c._api=Pa(t,c.id),t.plugins.register(c),d.isDefault&&t.extensions.installedExtensions.set(c.id,c),c.capabilities?.includes("ACTIVITY_BAR")){let h=ed(c);t.activityBarPlugins.set(h.id,h),t.emit("activityBarPlugins",t.getActivityBarItems()),sh(t,c)}c.onActivate&&await c.onActivate(c._api)},t.unregisterPlugin=async c=>{let d=t.plugins.get(c);if(d){if(d.capabilities.includes(Vd.RESOURCE_PROVIDER)&&d.scheme&&t.resourceProviders.unregister(d.scheme),d.onDeactivate&&await d.onDeactivate(d._api),(d.capabilities?.includes("ACTIVITY_BAR")||d.type==="activity")&&(t.activityBarPlugins.delete(c),t.emit("activityBarPlugins",t.getActivityBarItems()),d.route)){let h=t.basePath+d.route;h.endsWith("/")&&h.length>1&&(h=h.slice(0,-1)),j.routes.delete(h)}t.plugins.unregister(c)}},t.activatePlugins=async()=>{for(let c of t.plugins.getAll())c.onActivate&&!c._api&&(c._api=Pa(t,c.id),await c.onActivate(c._api))},t.getPluginState=(c,d)=>(t.pluginState.get(c)||{})[d],t.setPluginState=(c,d,h)=>{let f=t.pluginState.get(c)||{};f[d]=h,t.pluginState.set(c,f)},t.deletePluginState=(c,d)=>{let h=t.pluginState.get(c);h&&delete h[d]},t.clearPluginState=c=>{t.pluginState.delete(c)},t.getConfiguration=()=>({}),t.setConfiguration=(c,d)=>{t.emit(We.onConfigChange,{section:c,value:d})},t.toggleCommandPalette=()=>{t.setState("commandPaletteOpen",!t.commandPaletteOpen)},t.handleSystemOpenFile=async()=>{if(window.electronAPI){let c=await window.electronAPI.openFileDialog();if(c)for(let d of c){let h="/"+d.replace(/\\/g,"/");await t.openResource(`file://${h}`)}}else t.showMessage("This feature is only available in the desktop app.","warn")},t.handleSystemOpenFolder=async()=>{if(window.electronAPI){let c=await window.electronAPI.openFolderDialog();c&&window.electronAPI.openWorkspace(c)}else t.showMessage("This feature is only available in the desktop app.","warn")},t.handleSystemSaveAs=async()=>{if(window.electronAPI){let d=t.getActivePanel()?.activeResourceUri;if(!d||!d.startsWith("file://")){t.showMessage("No active file to save.","warn");return}let h=t.resourceContents[d],f=d.split("/").pop(),m=await window.electronAPI.saveFileDialog({defaultPath:f});if(m){let b=`file://${"/"+m.replace(/\\/g,"/")}`,_=t.resourceProviders.getProvider("file");_?.saveContent&&(await _.saveContent(b,h),t.showMessage(`File saved to ${b}`,"info"),await t.openResource(b))}}else t.showMessage("This feature is only available in the desktop app.","warn")};for(let c of t.config.plugins)c.capabilities?.includes("ACTIVITY_BAR")&&sh(t,c);return t}function sh(e,t){if(!t.route||!t.sidebarComponent)return;let n=e.basePath+t.route;n.endsWith("/")&&n.length>1&&(n=n.slice(0,-1));let s=`ide-${t.id}`,r=t.sidebarComponent;j.routes.set(n,{name:s,component:()=>ns`<${Vt(r)}></${Vt(r)}>`}),Xv()}async function Xv(){let e=j.Router;if(!e?.routes)return;let{compileRoutes:t}=await Promise.resolve().then(()=>(Qr(),Iu)),{flatRoutes:n,namedRoutes:s}=e.flattenRoutes(j.routes);e.routes=t(n),e.namedRoutes=s}var R2,Oa=y(()=>{Wr();rt();Ue();ei();sd();id();Fd();Od();zd();Nd();Bd();En();Gd();Xd();eh();nh();Ln();R2=sr()});var Si,La=y(()=>{Si={id:"core",name:"Core IDE Functions",description:"Provides essential IDE commands and menus.",version:"1.0.0",author:"IDE Core Team",capabilities:["COMMANDS","MENUS","CONTEXT_MENUS"],async onActivate(e){let t=e.context.getIDE();t.setState("sidebarVisible",!0),e.commands.register("workbench.refreshExplorer",{label:"Refresh Explorer",execute:async()=>{await t.refreshResourceTree("file"),e.ui.showMessage("File explorer refreshed","info")}}),e.commands.register("workbench.commandPalette",{label:"Command Palette",keybinding:"Ctrl+P",category:"Workbench",execute:()=>t.toggleCommandPalette()}),e.commands.register("project.new",{label:"New Project",category:"Project",execute:async()=>{t.openResource("newproject://create")}}),e.commands.register("project.open",{label:"Open Project...",category:"Project",execute:async()=>{if(window.electronAPI){let s=await window.electronAPI.openFolderDialog();s&&await window.electronAPI.openWorkspace(s)}else e.ui.showMessage("Open Project is only available in desktop mode","warning")}}),e.commands.register("project.close",{label:"Close Project",category:"Project",execute:async()=>{for(let s of t.panels)t.closeAllTabs(s.id);e.ui.showMessage("Project closed","info")}}),e.commands.register("project.exit",{label:"Exit",category:"Project",execute:async()=>{let s=[];for(let[r,i]of t.resourceModified)i&&s.push(r);if(s.length>0){let r=s.map(o=>o.split("/").pop()).join(", ");if(!await e.ui.showConfirm({title:"Unsaved Changes",prompt:`You have unsaved changes in: ${r}. Do you want to exit without saving?`,confirmLabel:"Exit Without Saving",isDestructive:!0}))return}window.electronAPI?window.electronAPI.closeWindow():window.close()}}),e.commands.register("project.settings",{label:"Project Settings",category:"Project",execute:()=>{t.openResource("settings://project")}}),e.commands.register("editor.openAndGoToLine",{label:"Go to Line in File",category:"Editor",execute:async({uri:s,line:r})=>{await t.openResource(s),setTimeout(()=>{e.events.emit("editor:goToLine",{uri:s,line:r})},50)}}),e.commands.register("editor.openFind",{label:"Find",keybinding:"Ctrl+F",category:"Edit",execute:({uri:s}={})=>{let r=s||t.getActivePanel()?.activeResourceUri;r&&t.emit("editor:showFindWidget",{uri:r,mode:"find"})}}),e.commands.register("editor.openReplace",{label:"Replace",keybinding:"Ctrl+H",category:"Edit",execute:({uri:s}={})=>{let r=s||t.getActivePanel()?.activeResourceUri;r&&t.emit("editor:showFindWidget",{uri:r,mode:"replace"})}}),e.commands.register("editor.closeFindWidget",{label:"Close Find Widget",category:"Edit",execute:({uri:s})=>{t.emit("editor:closeFindWidget",{uri:s})}}),e.commands.register("editor.find",{label:"Find (Internal)",category:"Edit",execute:({uri:s,query:r,options:i})=>{t.emit("editor:find",{uri:s,query:r,options:i})}}),e.commands.register("editor.findNext",{label:"Find Next",keybinding:"F3",category:"Edit",execute:({uri:s,query:r,options:i}={})=>{let o=s||t.getActivePanel()?.activeResourceUri;o&&t.emit("editor:findNext",{uri:o,query:r,options:i})}}),e.commands.register("editor.findPrevious",{label:"Find Previous",keybinding:"Shift+F3",category:"Edit",execute:({uri:s,query:r,options:i}={})=>{let o=s||t.getActivePanel()?.activeResourceUri;o&&t.emit("editor:findPrevious",{uri:o,query:r,options:i})}}),e.commands.register("editor.replaceNext",{label:"Replace Next",category:"Edit",execute:({uri:s,findQuery:r,replaceQuery:i,options:o})=>{t.emit("editor:replaceNext",{uri:s,findQuery:r,replaceQuery:i,options:o})}}),e.commands.register("editor.replaceAll",{label:"Replace All",category:"Edit",execute:({uri:s,findQuery:r,replaceQuery:i,options:o})=>{t.emit("editor:replaceAll",{uri:s,findQuery:r,replaceQuery:i,options:o})}});let n=()=>{let s=t.getActivePanel()?.activeResourceUri;return s?document.querySelector(`uix-code[data-uri="${s}"]`):null};e.commands.register("editor.beginningOfLine",{label:"Beginning of Line",category:"Editor",execute:()=>n()?.beginningOfLine()}),e.commands.register("editor.endOfLine",{label:"End of Line",category:"Editor",execute:()=>n()?.endOfLine()}),e.commands.register("editor.nextLine",{label:"Next Line",category:"Editor",execute:()=>n()?.nextLine()}),e.commands.register("editor.previousLine",{label:"Previous Line",category:"Editor",execute:()=>n()?.previousLine()}),e.commands.register("editor.forwardChar",{label:"Forward Character",category:"Editor",execute:()=>n()?.forwardChar()}),e.commands.register("editor.backwardChar",{label:"Backward Character",category:"Editor",execute:()=>n()?.backwardChar()}),e.commands.register("editor.forwardWord",{label:"Forward Word",category:"Editor",execute:()=>n()?.forwardWord()}),e.commands.register("editor.backwardWord",{label:"Backward Word",category:"Editor",execute:()=>n()?.backwardWord()}),e.commands.register("editor.killLine",{label:"Kill Line",category:"Editor",execute:()=>n()?.killLine()}),e.commands.register("editor.yank",{label:"Yank (Paste)",category:"Editor",execute:()=>n()?.yank()}),e.commands.register("editor.copyRegion",{label:"Copy Region",category:"Editor",execute:()=>n()?.copyRegion()}),e.commands.register("editor.killRegion",{label:"Kill Region (Cut)",category:"Editor",execute:()=>n()?.killRegion()}),e.commands.register("editor.setMark",{label:"Set Mark",category:"Editor",execute:()=>n()?.setMark()}),e.commands.register("editor.cancel",{label:"Cancel / Keyboard Quit",category:"Editor",execute:()=>n()?.cancel()}),e.commands.register("editor.deleteChar",{label:"Delete Character",category:"Editor",execute:()=>n()?.deleteChar()}),e.commands.register("editor.deleteWord",{label:"Delete Word Forward",category:"Editor",execute:()=>n()?.deleteWord()}),e.commands.register("editor.backwardDeleteWord",{label:"Delete Word Backward",category:"Editor",execute:()=>n()?.backwardDeleteWord()}),e.commands.register("editor.transposeChars",{label:"Transpose Characters",category:"Editor",execute:()=>n()?.transposeChars()}),e.commands.register("run.startDebugging",{label:"Start Debugging",keybinding:"F5",category:"Run",execute:()=>e.ui.showMessage("Starting debugger...","info")}),e.commands.register("run.stopDebugging",{label:"Stop Debugging",keybinding:"Shift+F5",category:"Run",execute:()=>e.ui.showMessage("Stopping debugger...","info")}),e.commands.register("keybindings.selectScheme",{label:"Preferences: Select Keybinding Scheme",category:"Preferences",execute:async()=>{let s=e.keybindings.getAvailableSchemes(),r=e.keybindings.getActiveScheme(),i=s.map(a=>{let l=e.keybindings.getSchemeInfo(a);return{label:l?.name||a,description:l?.description||"",value:a,active:a===r}}),o=await e.ui.showQuickPick(i,{title:"Select Keybinding Scheme",placeholder:"Choose a keybinding scheme..."});o&&(e.keybindings.setScheme(o.value),e.ui.showMessage(`Keybinding scheme changed to: ${o.label}`,"info"))}}),e.commands.register("keybindings.openSettings",{label:"Preferences: Keyboard Shortcuts",category:"Preferences",execute:()=>{t.openResource("settings://keybindings")}}),e.commands.register("closeTab",{label:"Close Tab",category:"Tab",execute:(s={})=>{let r=s.panelId||t.activePanelId,i=s.uri||t.getActivePanel()?.activeResourceUri;i&&r&&t.handleTabClose(i,r)}}),e.commands.register("closeOtherTabs",{label:"Close Other Tabs",category:"Tab",execute:(s={})=>{let r=s.panelId||t.activePanelId,i=s.uri||t.getActivePanel()?.activeResourceUri;i&&r&&t.closeOtherTabs(i,r)}}),e.commands.register("closeAllTabs",{label:"Close All Tabs",category:"Tab",execute:(s={})=>{let r=s.panelId||t.activePanelId;r&&t.closeAllTabs(r)}}),e.commands.register("closeEditor",{label:"Close Editor",keybinding:"Ctrl+W",category:"Tab",execute:(s={})=>{let r=s.panelId||t.activePanelId,i=s.uri||t.getActivePanel()?.activeResourceUri;i&&r&&t.handleTabClose(i,r)}}),e.commands.register("closeWindow",{label:"Close Window",keybinding:"Alt+F4",category:"Tab",execute:()=>console.log("Closing window...")}),e.commands.register("splitUp",{label:"Split Up",category:"View",execute:(s={})=>{let r=s.panelId||t.activePanelId,i=s.uri||t.getActivePanel()?.activeResourceUri;i&&r&&t.splitEditor("up",i,r)}}),e.commands.register("splitDown",{label:"Split Down",category:"View",execute:(s={})=>{let r=s.panelId||t.activePanelId,i=s.uri||t.getActivePanel()?.activeResourceUri;i&&r&&t.splitEditor("down",i,r)}}),e.commands.register("splitLeft",{label:"Split Left",category:"View",execute:(s={})=>{let r=s.panelId||t.activePanelId,i=s.uri||t.getActivePanel()?.activeResourceUri;i&&r&&t.splitEditor("left",i,r)}}),e.commands.register("splitRight",{label:"Split Right",category:"View",execute:(s={})=>{let r=s.panelId||t.activePanelId,i=s.uri||t.getActivePanel()?.activeResourceUri;i&&r&&t.splitEditor("right",i,r)}}),e.resources.register("settings",{getContent:async s=>({type:"settings",uri:s}),getTabMetadata:s=>s.replace("settings://","")==="keybindings"?{label:"Keyboard Shortcuts",icon:"keyboard",component:"ide-keybindings-settings"}:{label:"Settings",icon:"settings",component:"ide-settings"}}),e.resources.register("newproject",{getContent:async s=>({type:"newproject",uri:s}),getTabMetadata:()=>({label:"New Project",icon:"folder-plus",component:"ide-new-project"})}),e.contextMenus.register("editor/tab",[{id:"tab.close",label:"Close",command:"core.closeEditor",group:"1_close"},{id:"tab.closeOthers",label:"Close Others",command:"core.closeOtherTabs",group:"1_close"},{id:"tab.closeAll",label:"Close All",command:"core.closeAllTabs",group:"1_close"},{id:"tab.splitUp",label:"Split Up",command:"core.splitUp",group:"2_split"},{id:"tab.splitDown",label:"Split Down",command:"core.splitDown",group:"2_split"},{id:"tab.splitLeft",label:"Split Left",command:"core.splitLeft",group:"2_split"},{id:"tab.splitRight",label:"Split Right",command:"core.splitRight",group:"2_split"}])}}});function za(e={}){let t={"/":null,"/.bootstrapp/":null,"/.bootstrapp/templates/":null,"/README.md":`# Welcome
This is a virtual file system.`};function n(a){return decodeURIComponent(new URL(a).pathname)}let s={};for(let[a,l]of Object.entries(e)){let c=a.startsWith("file://")?n(a):a;s[c]=l}let r=new Map(Object.entries({...t,...s})),i="/";console.log("VirtualFileSystem initialized.");function o(a,l=[]){let c={},d=1,h=new Set(l);h.add("/"),h.add("/.bootstrapp"),h.add("/.bootstrapp/templates");let f=new Set(["/"]);a.forEach(_=>{let R="",D=_.split("/").filter(M=>M);for(let M of D.slice(0,-1))R+=`/${M}`,f.add(R);r.get(_)===null&&f.add(_.replace(/\/$/,""))}),[...new Set([...a.map(_=>_.replace(/\/$/,"")),...f])].sort((_,R)=>_.localeCompare(R)).forEach(_=>{if(_==="")return;let R=_.split("/").filter(C=>C),D=R.pop()||"/",M=R.length>0?`/${R.join("/")}`:"/";if(!h.has(M))return;let K=M==="/"?"file:///":`file://${M}/`,ee=f.has(_)||_==="/",Y=ee?`file://${_}/`:`file://${_}`;if(_==="/"&&(Y="file:///"),c[Y])return;let A={id:String(d++),path:_,uri:Y,type:ee?"folder":"file",name:D,parent:K===Y?null:K,children:ee?[]:void 0};c[Y]=A}),Object.values(c).forEach(_=>{_.parent&&c[_.parent]&&c[_.parent].children.push(_.uri)});let g=c["file:///"];g.name="Project",g.path="/";let b="file:///.bootstrapp/";if(c[b]){c[b].name=".bootstrapp",c[b].parent=null;let _=c[c[b].parent];_?.children&&(_.children=_.children.filter(R=>R!==b))}return c}return{watch:()=>()=>{},async getTree(a=[]){let l=Array.from(r.keys());return o(l,a)},async readFile(a){let l=n(a);if(!r.has(l))throw new Error(`File not found: ${l}`);return r.get(l)},async writeFile(a,l){let c=n(a);r.set(c,l)},async deleteFile(a){let l=n(a).replace(/\/$/,"");if(r.has(l))r.delete(l);else{let c=`${l}/`,d=Array.from(r.keys()).filter(h=>h.startsWith(c));r.has(c)&&d.push(c),d.length>0?d.forEach(h=>r.delete(h)):console.warn(`File or folder not found for deletion: ${l}`)}},async renameFile(a,l){let c=n(a).replace(/\/$/,""),d=n(l).replace(/\/$/,"");if(r.has(c)){let h=r.get(c);r.delete(c),r.set(d,h)}else{let h=`${c}/`,f=`${d}/`,m=Array.from(r.keys()).filter(g=>g.startsWith(h));if(r.has(h)&&m.push(h),m.length>0)m.forEach(g=>{let b=r.get(g),_=g.replace(h,f);r.delete(g),r.set(_,b)});else throw new Error(`File or folder not found: ${c}`)}},async createDirectory(a){let l=n(a);l.endsWith("/")||(l+="/"),r.set(l,null)},getRootPath:()=>i}}var rh=y(()=>{});async function _i(){return window.electronAPI?((!Ua||!Na)&&([Ua,Na]=await Promise.all([window.electronAPI.fs.getRootPath(),window.electronAPI.fs.getGlobalUserDataPath()])),{rootPath:Ua,globalUserDataPath:Na}):{rootPath:"/",globalUserDataPath:"/.bootstrapp"}}async function zn(e){let{rootPath:t,globalUserDataPath:n}=await _i(),s=new URL(e).pathname;if(s.startsWith("/.bootstrapp/")){let r=s.substring(13);return window.electronAPI.path.join(n,r)}return window.electronAPI.path.join(t,s)}async function Va(e){let{rootPath:t,globalUserDataPath:n}=await _i();return e.startsWith(n)?`file:///.bootstrapp/${window.electronAPI.path.relative(n,e).replace(/\\/g,"/")}`:`file:///${window.electronAPI.path.relative(t,e).replace(/\\/g,"/")}`}var Ua,Na,ih=y(()=>{Ua=null,Na=null});function oh(){let e=window.electronAPI;if(!e)throw new Error("createNodeFS requires electronAPI.");let t=null,n=null,s=null;async function r(){let o=await _i();t=o.rootPath,n=o.globalUserDataPath,console.log(`NodeFileSystem initialized at: ${t}`),console.log(`Global user data path: ${n}`)}async function i(o,a,l,c,d,h){let f;try{f=await e.fs.readdir(o)}catch(m){return console.warn(`Could not read directory: ${o}`,m),d}f.sort((m,g)=>m.isDirectory&&!g.isDirectory?-1:!m.isDirectory&&g.isDirectory?1:m.name.localeCompare(g.name));for(let m of f){if(m.name.startsWith(".")||m.name==="node_modules")continue;let g=String(d++),b=e.path.join(o,m.name),_=await Va(b),R=new URL(_).pathname,D={id:g,uri:_,path:R,name:m.name,type:m.isDirectory?"folder":"file",parent:c};l[_]=D,c&&l[c]?.children&&l[c].children.push(_),m.isDirectory&&(D.children=[],h.includes(R)&&(d=await i(b,R,l,D.uri,d,h)))}return d}return{init:r,get globalUserDataPath(){return n},async watch(o){s&&s();let a=async(h,f)=>{if(f){let m=e.path.join(t,f),g=await Va(m);o({type:"modified",uri:g})}},l=await e.createFileWatcher(t,a),c=e.path.join(n,"templates");try{await e.fs.createDirectory(c)}catch{}let d=await e.createFileWatcher(c,a);return s=()=>{l(),d()},s},async getTree(o=[]){let a={},l=1,c=String(l++);a["file:///"]={id:c,uri:"file:///",path:"/",name:t.split(/\/|\\/).pop()||t,type:"folder",parent:null,children:[]},l=await i(t,"/",a,"file:///",l,o);let d=String(l++),h="file:///.bootstrapp/";return a[h]={id:d,uri:h,path:"/.bootstrapp/",name:".bootstrapp",type:"folder",parent:null,children:[]},a},async readFile(o){let a=await zn(o);return e.fs.readFile(a)},async writeFile(o,a){let l=await zn(o),c=await e.path.dirname(l);return await e.fs.createDirectory(c),e.fs.writeFile(l,a)},async deleteFile(o){let a=await zn(o);return e.fs.deleteFile(a)},async renameFile(o,a){let l=await zn(o),c=await zn(a);return e.fs.renameFile(l,c)},async createDirectory(o){let a=await zn(o);return e.fs.createDirectory(a)},getRootPath:()=>t}}var ah=y(()=>{ih()});function lh(){let e="/",t=new Set;function n(o){return decodeURIComponent(new URL(o).pathname)}function s(o){for(let a of t)try{a(o)}catch(l){console.error("Watch callback error:",l)}}async function r(o,a){return window.$APP.SW.request(o,a)}async function i(o,a,l,c,d){let h;try{if(console.log("[SW-FS] FS:LIST_FILES request for:",o),h=await r("FS:LIST_FILES",{path:o,system:!1}),console.log("[SW-FS] FS:LIST_FILES response:",h),h?.error)return console.warn(`[SW-FS] Could not list directory: ${o}`,h.error),c}catch(f){return console.error(`[SW-FS] Error listing directory: ${o}`,f),c}if(!Array.isArray(h))return console.warn("[SW-FS] entries is not an array:",h),c;h.sort((f,m)=>f.isDirectory&&!m.isDirectory?-1:!f.isDirectory&&m.isDirectory?1:f.name.localeCompare(m.name));for(let f of h){if(f.name.startsWith(".")&&f.name!==".bootstrapp")continue;let m=String(c++),g=f.path.replace(/\/$/,""),b=f.isDirectory?`file://${g}/`:`file://${g}`,_={id:m,uri:b,path:g,name:f.name,type:f.isDirectory?"folder":"file",parent:l};a[b]=_,a[l]?.children&&a[l].children.push(b),f.isDirectory&&(_.children=[],(d.has(g)||d.has(g+"/"))&&(c=await i(g,a,b,c,d)))}return c}return{async init(){if(!window.$APP?.swEvents)throw new Error("createServiceWorkerFS requires $APP.swEvents");window.$APP.swEvents.set("FS:CHANGE",({payload:o})=>{s(o)});try{let o=await window.$APP.SW.enableLocalCaching();console.log("[SW-FS] Local caching enabled:",o)}catch(o){console.warn("[SW-FS] Failed to enable local caching:",o)}console.log("[SW-FS] ServiceWorkerFileSystem initialized"),console.log("[SW-FS] SW controller:",navigator.serviceWorker?.controller),console.log("[SW-FS] $APP.SW available:",!!window.$APP?.SW)},watch(o){return t.add(o),()=>{t.delete(o)}},async getTree(o=[]){console.log("[SW-FS] getTree called with openFolders:",o);let a={},l=1,c=new Set(o);c.add("/");let d=String(l++);return a["file:///"]={id:d,uri:"file:///",path:"/",name:"Project",type:"folder",parent:null,children:[]},l=await i("/",a,"file:///",l,c),a},async readFile(o){let a=n(o),l=await r("FS:READ_FILE",{path:a,system:!1});if(l?.error)throw new Error(l.error);return l.content},async writeFile(o,a){let l=n(o),c=await r("FS:WRITE_FILE",{path:l,content:a,system:!1});if(c?.error)throw new Error(c.error);return c},async deleteFile(o){let a=n(o).replace(/\/$/,""),c=o.endsWith("/")?"FS:DELETE_DIRECTORY":"FS:DELETE_FILE",d=await r(c,{path:a,system:!1});if(d?.error)throw new Error(d.error);return d},async renameFile(o,a){let l=await this.readFile(o);await this.writeFile(a,l),await this.deleteFile(o)},async createDirectory(o){let a=n(o);a.endsWith("/")||(a+="/");let l=`${a}.dir-placeholder`,c=await r("FS:WRITE_FILE",{path:l,content:"",system:!1});if(c?.error)throw new Error(c.error);return c},getRootPath:()=>e}}var ch=y(()=>{});function uh(e){let t="/",n=new Set,s=null,r=h=>decodeURIComponent(new URL(h).pathname),i=(h,f)=>{let m=h.replace(/\/+$/,"");return f?`file://${m}/`:`file://${m}`},o=h=>h.replace(/^\/+/,"").replace(/\/+$/,"").split("/").filter(Boolean),a=async(h,{create:f=!1,parent:m=!1}={})=>{let g=m?h.slice(0,-1):h,b=e;for(let _ of g)try{b=await b.getDirectoryHandle(_,{create:f})}catch(R){throw R.name==="TypeMismatchError"?new Error(`Path segment is not a directory: ${_}`):R}return b},l=async(h,{create:f=!1}={})=>{let m=o(h);if(m.length===0)throw new Error("Empty path");return(await a(m,{create:f,parent:!0})).getFileHandle(m[m.length-1],{create:f})},c=h=>{for(let f of n)try{f(h)}catch(m){console.error("[directory-fs] Watch callback error:",m)}},d=async()=>{let h={},f=1,m=()=>String(f++),g="file:///";h[g]={id:m(),uri:g,path:"/",name:e.name||"/",type:"folder",parent:null,children:[]};let b=async(R,D,M)=>{for await(let[K,ee]of R.entries()){if(K.startsWith("."))continue;let Y=`${D==="/"?"":D}/${K}`;if(ee.kind==="directory"){let A=i(Y,!0);h[A]={id:m(),uri:A,path:Y,name:K,type:"folder",parent:M,children:[]},h[M].children.push(A),await b(ee,Y,A)}else{let A=i(Y,!1);h[A]={id:m(),uri:A,path:Y,name:K,type:"file",parent:M},h[M].children.push(A)}}};await b(e,"/",g);let _=R=>{let D=h[R];if(D?.children){D.children.sort((M,K)=>{let ee=h[M],Y=h[K];return ee.type!==Y.type?ee.type==="folder"?-1:1:ee.name.localeCompare(Y.name)});for(let M of D.children)_(M)}};return _(g),h};return{async init(){if("FileSystemObserver"in globalThis)try{s=new globalThis.FileSystemObserver(h=>{for(let f of h){let m=(f.relativePathComponents||[]).join("/"),g=m?`/${m}`:"/";c({type:f.type||"modified",path:g,uri:i(g,!1)})}}),await s.observe(e,{recursive:!0})}catch(h){console.warn("[directory-fs] FileSystemObserver setup failed:",h.message),s=null}},async dispose(){if(s){try{s.disconnect()}catch{}s=null}n.clear()},async getTree(){return d()},async readFile(h){let f=r(h);return(await(await l(f)).getFile()).text()},async writeFile(h,f){let m=r(h),b=await(await l(m,{create:!0})).createWritable();await b.write(f??""),await b.close(),c({type:"modified",path:m,uri:h})},async createDirectory(h){let f=r(h),m=o(f);await a(m,{create:!0}),c({type:"created",path:f,uri:h})},async deleteFile(h){let f=r(h),m=o(f);if(m.length===0)throw new Error("Cannot delete root");await(await a(m,{parent:!0})).removeEntry(m[m.length-1],{recursive:!0}),c({type:"deleted",path:f,uri:h})},async renameFile(h,f){let m=r(f),g=o(m),b=g[g.length-1],_=await l(r(h));if(typeof _.move=="function")await _.move(b);else{let R=await this.readFile(h);await this.writeFile(f,R),await this.deleteFile(h)}c({type:"renamed",oldUri:h,newUri:f})},watch(h){return n.add(h),()=>n.delete(h)},getRootPath(){return t}}}var dh=y(()=>{});function hh(e={}){let t=new Set,n=e.roots??["content","extensions"],s=e.flatten===!0&&n.length===1,r=s?`/${n[0]}`:"/",i=d=>decodeURIComponent(new URL(d).pathname),o=(d,h)=>{let f=d.replace(/\/+$/,"");return h?`file://${f}/`:`file://${f}`},a=d=>{for(let h of t)try{h(d)}catch(f){console.error("[CLI-FS] Watch callback error:",f)}},l=async d=>{let h=await fetch(`/_api/folder-list?folder=${encodeURIComponent(d)}`);if(!h.ok)return[];let f=await h.json();return Array.isArray(f)?f:[]},c=d=>{let h={},f=1,m=()=>String(f++),g="file:///";h[g]={id:m(),uri:g,path:"/",name:"/",type:"folder",parent:null,children:[]};let b=s?`/${n[0]}`:null,_=D=>{if(D==="/"||D===""||b&&D===b)return g;let M=o(D,!0);if(h[M])return M;let K=D.split("/").filter(Boolean),ee=K[K.length-1]||"/",Y="/"+K.slice(0,-1).join("/"),A=_(Y===""?"/":Y);return h[M]={id:m(),uri:M,path:D,name:ee,type:"folder",parent:A,children:[]},h[A].children.includes(M)||h[A].children.push(M),M};for(let[D,M]of Object.entries(d)){let K=`/${D}`;s||_(K);for(let ee of M){let Y=`${K}/${ee}`,A=Y.split("/").filter(Boolean),C=A[A.length-1],v="/"+A.slice(0,-1).join("/"),S=_(v),w=o(Y,!1);h[w]={id:m(),uri:w,path:Y,name:C,type:"file",parent:S},h[S].children.includes(w)||h[S].children.push(w)}}let R=D=>{let M=h[D];if(M?.children){M.children.sort((K,ee)=>{let Y=h[K],A=h[ee];return Y.type!==A.type?Y.type==="folder"?-1:1:Y.name.localeCompare(A.name)});for(let K of M.children)R(K)}};return R(g),h};return{async init(){},async getTree(){let d={};return await Promise.all(n.map(async h=>{d[h]=await l(h)})),c(d)},async readFile(d){let h=i(d),f=await fetch(h);if(!f.ok)throw new Error(`Failed to read ${h}: ${f.status}`);return await f.text()},async writeFile(d,h){let f=i(d),m=f.replace(/^\//,""),g=await fetch(`/_api/fs/file?path=${encodeURIComponent(m)}`,{method:"PUT",headers:{"Content-Type":"text/plain"},body:h??""});if(!g.ok)throw new Error(`Failed to write ${f}: ${g.status}`);a({type:"modified",path:f,uri:d})},async createDirectory(d){let h=i(d),f=h.replace(/^\//,"").replace(/\/$/,""),m=await fetch(`/_api/fs/folder?path=${encodeURIComponent(f)}`,{method:"PUT"});if(!m.ok)throw new Error(`Failed to create folder ${h}: ${m.status}`);a({type:"created",path:h,uri:d})},async deleteFile(d){let h=i(d),f=h.replace(/^\//,"").replace(/\/$/,""),m=await fetch(`/_api/fs/file?path=${encodeURIComponent(f)}`,{method:"DELETE"});if(!m.ok)throw new Error(`Failed to delete ${h}: ${m.status}`);a({type:"deleted",path:h,uri:d})},async renameFile(d,h){let f=i(d).replace(/^\//,"").replace(/\/$/,""),m=i(h).replace(/^\//,"").replace(/\/$/,""),g=await fetch("/_api/fs/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:f,to:m})});if(!g.ok)throw new Error(`Failed to rename ${f} -> ${m}: ${g.status}`);a({type:"renamed",oldUri:d,newUri:h})},watch(d){return t.add(d),()=>t.delete(d)},getRootPath(){return r}}}var ph=y(()=>{});var Zv,an,us,Ba,Ai,e0,t0,Ht,n0,Ci,fh,mh,Ei,ln,ds,hs=y(()=>{Zv="bootstrapp-fs",an="handles",us="directory",Ba=()=>new Promise((e,t)=>{let n=indexedDB.open(Zv,1);n.onupgradeneeded=()=>{let s=n.result;s.objectStoreNames.contains(an)||s.createObjectStore(an)},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)}),Ai=async e=>{let t=await Ba();return new Promise((n,s)=>{let i=t.transaction(an,"readonly").objectStore(an).get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>s(i.error)})},e0=async(e,t)=>{let n=await Ba();return new Promise((s,r)=>{let o=n.transaction(an,"readwrite").objectStore(an).put(t,e);o.onsuccess=()=>s(),o.onerror=()=>r(o.error)})},t0=async e=>{let t=await Ba();return new Promise((n,s)=>{let i=t.transaction(an,"readwrite").objectStore(an).delete(e);i.onsuccess=()=>n(),i.onerror=()=>s(i.error)})},Ht=()=>typeof globalThis.showDirectoryPicker=="function",n0=e=>e0(us,e),Ci=()=>t0(us),fh=async()=>{try{let e=await Ai(us);return e&&await e.queryPermission({mode:"readwrite"})==="granted"?e:null}catch(e){return console.warn("[directory-handle] Failed to load handle:",e.message),null}},mh=async()=>{try{let e=await Ai(us);if(!e)return null;let t=await e.queryPermission({mode:"readwrite"});return{handle:e,permission:t}}catch(e){return console.warn("[directory-handle] Failed to load handle:",e.message),null}},Ei=async()=>{let e=await Ai(us);return!e||await e.requestPermission({mode:"readwrite"})!=="granted"?null:e},ln=async()=>{if(!Ht())throw new Error("File System Access API not supported in this browser");let e=await globalThis.showDirectoryPicker({mode:"readwrite"});if(await e.requestPermission({mode:"readwrite"})!=="granted")throw new Error("Read/write permission was not granted");return await n0(e),e},ds=async()=>(await Ai(us))?.name||null});var Ri,Wa,gh=y(()=>{Ri=".bootstrapp",Wa={"settings.json":{},"extensions.json":{installed:[]},"workspace.json":{openFolders:[],activeActivity:"files",sidebarVisible:!0,recentResources:[]},"keymaps.json":{},"favorites.json":[],"tags.json":[],"links.json":[]}});function bh(e){let t=new Map,n=new Map,s=new Map,r=new Map,i=f=>`file:///${Ri}/${f}`,o=`file:///${Ri}/`,a=f=>{let m=Wa[f];return m!==void 0?structuredClone(m):{}},l=(f,m)=>{let g=r.get(f);if(g)for(let b of g)try{b(m)}catch(_){console.error(`[ConfigProvider] listener error for ${f}:`,_)}},c=async f=>{let m=n.get(f);if(m!==void 0){n.delete(f);try{await e.writeFile(i(f),JSON.stringify(m,null,2))}catch(g){console.error(`[ConfigProvider] failed to write ${f}:`,g)}}},d=f=>{s.has(f)&&clearTimeout(s.get(f)),s.set(f,setTimeout(()=>{s.delete(f),c(f)},s0))},h={async ensureDirectory(){console.log("[ConfigProvider] ensureDirectory: creating dir",o);try{await e.createDirectory(o)}catch{}for(let f of Object.keys(Wa))try{console.log("[ConfigProvider] ensureDirectory: reading",f);let m=await e.readFile(i(f)),g=JSON.parse(m);t.set(f,g),console.log("[ConfigProvider] ensureDirectory: loaded",f)}catch{console.log("[ConfigProvider] ensureDirectory: writing default",f);let m=a(f);t.set(f,m),n.set(f,m),await c(f),console.log("[ConfigProvider] ensureDirectory: wrote default",f)}console.log("[ConfigProvider] ensureDirectory: done")},async read(f){if(t.has(f))return t.get(f);try{let m=await e.readFile(i(f)),g=JSON.parse(m);return t.set(f,g),g}catch{let m=a(f);return t.set(f,m),m}},write(f,m){t.set(f,m),n.set(f,m),l(f,m),d(f)},async flush(){for(let f of s.values())clearTimeout(f);s.clear(),await Promise.all(Array.from(n.keys()).map(f=>c(f)))},onChange(f,m){return r.has(f)||r.set(f,new Set),r.get(f).add(m),()=>r.get(f)?.delete(m)},invalidate(f){t.delete(f)}};return globalThis.addEventListener?.("beforeunload",()=>{for(let f of s.values())clearTimeout(f);s.clear();for(let[f,m]of n)try{let g=new Blob([JSON.stringify(m,null,2)],{type:"application/json"});navigator.sendBeacon?.(`/_api/fs/file?path=${encodeURIComponent(`${Ri}/${f}`)}`,g)}catch{}n.clear()}),h}var s0,yh=y(()=>{gh();s0=2e3});var Ii,qa=y(()=>{rh();ah();ch();dh();ph();hs();yh();Ii={id:"files",name:"File System",description:"Provides access to the local file system.",version:"1.0.0",author:"IDE Core Team",tags:["resource","core","files","explorer"],capabilities:["RESOURCE_PROVIDER","ACTIVITY_BAR","SIDEBAR","COMMANDS","MENUS","TREE_VIEW"],scheme:"file",icon:"files",title:"Explorer",position:"top",order:10,route:"/files",sidebarComponent:"ide-file-explorer",fsImplementation:null,_buildResourceProvider(){return{getTree:e=>this.fsImplementation.getTree(e),getContent:e=>this.fsImplementation.readFile(e),saveContent:(e,t)=>this.fsImplementation.writeFile(e,t),create:async(e,t)=>(t===void 0?await this.fsImplementation.createDirectory(e):await this.fsImplementation.writeFile(e,t),e),delete:e=>this.fsImplementation.deleteFile(e),rename:(e,t)=>this.fsImplementation.renameFile(e,t),watch:e=>this.fsImplementation.watch(e),getTabMetadata:e=>({label:new URL(e).pathname.split("/").pop()||"/",icon:"file-text",component:"ide-code-editor"}),getRootPath:()=>this.fsImplementation.getRootPath()}},async _initFs(e,t){let n=this._api.context.getIDE();try{this.fsImplementation=e(),await this.fsImplementation.init()}catch(s){this._api.ui.showMessage(`Failed to initialize ${t} file system: ${s.message}`,"error"),console.error(`${t} file system failed:`,s),this.fsImplementation=za(n.initialFiles)}},async _activateMode(e,{directoryHandle:t}={}){let n=this._api.context.getIDE();switch(e){case"node":await this._initFs(oh,"Node");break;case"directory":await this._initFs(()=>uh(t),"Directory");break;case"cli":await this._initFs(()=>hh({roots:["content","extensions",".bootstrapp"],flatten:!1}),"CLI");break;case"sw":await this._initFs(lh,"ServiceWorker");break;default:this.fsImplementation=za(n.initialFiles)}this.fsImplementation&&(n.configProvider=bh(this.fsImplementation),await n.configProvider.ensureDirectory())},async onActivate(e){this._api=e;let t=e.context.getIDE(),n=await fh();if(n)t.setState("pendingDirectoryReconnect",null);else{let r=await mh();r&&r.permission!=="denied"?t.setState("pendingDirectoryReconnect",{name:r.handle.name}):t.setState("pendingDirectoryReconnect",null)}let s=(n?"directory":null)||window.$APP?.manifest?.filesystem||(t.platform==="electron"&&window.electronAPI?"node":null)||(navigator.serviceWorker?.controller&&window.$APP?.SW?"sw":null)||"virtual";await this._activateMode(s,{directoryHandle:n}),e.resources.register(this.scheme,this._buildResourceProvider()),t.setState("sidebarVisible",!0),e.commands.register("refresh",{label:"Refresh Explorer",execute:async()=>{await e.resources.refreshTree(this.scheme),e.ui.showMessage("File explorer refreshed","info")}}),e.commands.register("setBacking",{label:"Switch File System Backing",execute:async({kind:r,handle:i}={})=>{if(this.fsImplementation?.dispose)try{await this.fsImplementation.dispose()}catch(o){console.warn("[files.setBacking] dispose failed:",o.message)}await this._activateMode(r,{directoryHandle:i});try{navigator.serviceWorker?.controller?.postMessage({type:"FS:HANDLE_CHANGED"})}catch(o){console.warn("[files.setBacking] SW notify failed:",o.message)}r==="directory"&&t.setState("pendingDirectoryReconnect",null),e.resources.register(this.scheme,this._buildResourceProvider()),await e.resources.refreshTree(this.scheme)}}),e.commands.register("reconnectDirectory",{label:"Reconnect Workspace Folder",execute:async()=>{let r=await Ei();if(!r){e.ui?.showMessage?.("Permission was not granted for the saved folder","warning");return}await t.executeCommand("files.setBacking",{kind:"directory",handle:r})}}),e.commands.register("newFile",{label:"New File",keybinding:"Ctrl+N",category:"File",execute:()=>t.executeCommand("files.newFileInFolder",{uri:`file://${this.fsImplementation.getRootPath()}`})}),e.commands.register("save",{label:"Save",keybinding:"Ctrl+S",category:"File",execute:()=>t.saveActiveResource()}),e.commands.register("saveAs",{label:"Save As...",keybinding:"Ctrl+Shift+S",category:"File",execute:()=>t.handleSystemSaveAs()}),e.commands.register("saveAll",{label:"Save All",category:"File",execute:()=>console.log("Saving all files...")}),e.commands.register("renameFile",{label:"Rename",category:"File",execute:async({uri:r,path:i})=>{let o=r||`file://${i}`,a=i||new URL(o).pathname,l=a.split("/").pop(),c=await e.ui.showInputBox({title:"Rename",value:l,prompt:`Enter a new name for "${l}".`,placeholder:"New name"});if(c&&c!==l){let h=`file://${a.substring(0,a.lastIndexOf("/")+1)+c}`;await t.renameResource(o,h)}}}),e.commands.register("deleteFile",{label:"Delete",category:"File",execute:async({uri:r,path:i,type:o="item"})=>{let a=r||`file://${i}`,c=(i||new URL(a).pathname).split("/").pop();await e.ui.showConfirm({title:`Delete ${o}`,prompt:`Are you sure you want to permanently delete "${c}"? This action cannot be undone.`,confirmLabel:"Delete",isDestructive:!0})&&await t.deleteResource(a)}}),e.commands.register("newFileInFolder",{label:"New File",category:"File",execute:async({uri:r,path:i}={})=>{let o=r||(i?`file://${i}`:`file://${this.fsImplementation.getRootPath()}`),a=new URL(o).pathname,l=await e.ui.showInputBox({title:"New File",prompt:`Enter a name for the new file in "${a}".`,placeholder:"file.js"});if(l){let d=`file://${(a.endsWith("/")?a:`${a}/`)+l}`;await t.createResource(d,""),await t.openResource(d)}}}),e.commands.register("newFolder",{label:"New Folder",category:"File",execute:async({uri:r,path:i}={})=>{let o=r||(i?`file://${i}`:`file://${this.fsImplementation.getRootPath()}`),a=new URL(o).pathname,l=await e.ui.showInputBox({title:"New Folder",prompt:`Enter a name for the new folder in "${a}".`,placeholder:"new-folder"});if(l){let d=`file://${(a.endsWith("/")?a:`${a}/`)+l+"/"}`;await t.createResource(d)}}}),e.commands.register("openFile",{label:"Open File...",keybinding:"Ctrl+O",category:"File",execute:()=>t.handleSystemOpenFile()}),e.commands.register("openFolder",{label:"Open Folder...",keybinding:"Ctrl+K+O",category:"File",execute:()=>t.handleSystemOpenFolder()}),e.commands.register("editor.cut",{label:"Cut",keybinding:"Ctrl+X",category:"Edit",execute:()=>document.execCommand("cut")}),e.commands.register("editor.copy",{label:"Copy",keybinding:"Ctrl+C",category:"Edit",execute:()=>document.execCommand("copy")}),e.commands.register("editor.paste",{label:"Paste",keybinding:"Ctrl+V",category:"Edit",preventDefault:"keybinding",execute:async()=>{try{let r=await navigator.clipboard.readText();typeof r=="string"&&r&&e.editor.insertText(r)}catch(r){console.error("Paste failed:",r),e.ui.showMessage("Failed to read from clipboard. Permission may have been denied.","error")}}}),e.commands.register("getGlobalUserDataPath",{label:"Get Global User Data Path",category:"File",execute:()=>this.fsImplementation.globalUserDataPath}),e.menus.register("Project",[{label:"New Project...",command:"core.project.new"},{label:"Open Project...",command:"core.project.open"},{separator:!0},{label:"Close Project",command:"core.project.close"},{separator:!0},{label:"Settings",command:"core.project.settings"},{label:"Refresh",command:"files.refresh"},{separator:!0},{label:"Exit",command:"core.project.exit"}]),e.menus.register("File",[{label:"New File",command:"files.newFile"},{label:"New Folder",command:"files.newFolder"},{separator:!0},{label:"Open File...",command:"files.openFile"},{label:"Open Folder...",command:"files.openFolder"},{separator:!0},{label:"Save",command:"files.save"},{label:"Save As...",command:"files.saveAs"},{label:"Save All",command:"files.saveAll"}],{context:"file://"}),e.menus.register("Editor",[{label:"Cut",command:"files.editor.cut"},{label:"Copy",command:"files.editor.copy"},{label:"Paste",command:"files.editor.paste"},{separator:!0},{label:"Find",command:"core.editor.openFind"},{label:"Replace",command:"core.editor.openReplace"},{separator:!0},{label:"Start Debugging",command:"core.run.startDebugging"},{label:"Stop Debugging",command:"core.run.stopDebugging"}],{context:"file://"}),e.contextMenus.register("explorer/file",[{id:"file.rename",label:"Rename",command:"files.renameFile",group:"1_modification"},{id:"file.delete",label:"Delete",command:"files.deleteFile",group:"2_destructive"}]),e.contextMenus.register("explorer/folder",[{id:"folder.newFile",label:"New File",command:"files.newFileInFolder",group:"1_creation"},{id:"folder.newFolder",label:"New Folder",command:"files.newFolder",group:"1_creation"},{id:"folder.rename",label:"Rename",command:"files.renameFile",group:"2_modification"},{id:"folder.delete",label:"Delete",command:"files.deleteFile",group:"3_destructive"}]),console.log("File System plugin activated")},async onDeactivate(e){if(this.fsImplementation?.dispose)try{await this.fsImplementation.dispose()}catch(t){console.warn("File System plugin dispose failed:",t.message)}console.log("File System plugin deactivated")}}});var Ti,Ha=y(async()=>{await Ut();Ti={id:"search",name:"Search",description:"Search across files in your workspace",version:"1.0.0",author:"IDE Core Team",capabilities:["ACTIVITY_BAR","SIDEBAR","SEARCH","COMMANDS"],icon:"search",title:"Search",position:"top",order:3,route:"/search",sidebarComponent:"ide-search-sidebar",async onActivate(e){let t=e.context.getIDE();function n(r,i){if(!i)return!0;if(!r)return!1;let o={};for(let l of i)o[l]=(o[l]||0)+1;let a={};for(let l of r)a[l]=(a[l]||0)+1;for(let l in o)if(!a[l]||a[l]<o[l])return!1;return!0}e.commands.register("findFilesByName",{label:"Find Files by Name",category:"Search",execute:async({term:r})=>{if(!r)return[];let i=Object.values(t.resourceTrees.get("file")).filter(l=>l.type==="file"),o=r.toLowerCase();return i.filter(l=>n(l.path.toLowerCase(),o)).slice(0,50)}});async function s({term:r,matchCase:i,wholeWord:o}){if(!r)return;e.events.emit("search:start");let a={},l=t.resourceTrees.get("file");if(l&&window.electronAPI?.fs?.search){let d=Object.values(l).filter(h=>h.type==="file");a=await window.electronAPI.fs.search({term:r,matchCase:i,wholeWord:o,files:d})}let c=t.resourceProviders.getSearchableProviders();for(let{provider:d}of c){let h=await d.search(r,{matchCase:i,wholeWord:o});h&&Object.assign(a,h)}return e.events.emit("search:done",a),a}e.commands.register("goToTile",{label:"Go to File...",keybinding:"Ctrl+P",category:"Go",execute:()=>{console.log("[Search] goToTile command executed, emitting workbench:focusFileSearch"),e.events.emit("workbench:focusFileSearch")}}),e.commands.register("findInFiles",{label:"Find in Files",keybinding:"Ctrl+Shift+F",category:"Search",execute:()=>Fe.go("/search")}),e.commands.register("doSearch",{label:"Perform Search",execute:async({term:r,options:i})=>s({term:r,...i})}),e.commands.register("replaceAll",{label:"Replace All Occurrences",category:"Search",execute:async({term:r,replaceTerm:i,options:o})=>{if(!r||i===void 0||i===null)return;e.ui.showMessage("Starting replacement...","info");let a=Object.values(t.resourceTrees.get("file")).filter(c=>c.type==="file"),l=await window.electronAPI.fs.replaceAll({term:r,replaceTerm:i,options:o,files:a});e.ui.showMessage(`Replaced occurrences in ${l.length} files.`,"success"),await s({term:r,...o})}})}}});var r0,i0,xh,Pi,Ya=y(()=>{r0=e=>{e&&window.open(e,"_blank","noopener,noreferrer")},i0=e=>({getContent(t){return{type:"extension",uri:t}},getTabMetadata(t){let n=t.replace("extensions://","");if(n.startsWith("detail/")){let s=n.replace("detail/",""),r=e.extensions.getAvailableExtensions().find(i=>i.id===s);return{label:r?.name||s,icon:r?.icon||"package",component:"ide-extension-detail"}}return{label:"Extensions",icon:"package",component:"ide-extensions-browser"}},getTabActions(t){let n=t.replace("extensions://","");if(!n.startsWith("detail/"))return[];let s=n.replace("detail/",""),r=e.extensions.getAvailableExtensions().find(o=>o.id===s);if(!r)return[];let i=[];return r.homepage&&i.push({icon:"external-link",label:"Open homepage",command:"extensions.openLink",args:{url:r.homepage}}),r.repository&&i.push({icon:"github",label:"Open repository",command:"extensions.openLink",args:{url:r.repository}}),i}}),xh={browse:{label:"Browse Extensions",category:"Extensions",execute(e,t){t.openResource("extensions://browse")}},viewDetail:{label:"View Extension Details",category:"Extensions",execute(e,t,{extensionId:n}={}){n&&t.openResource(`extensions://detail/${n}`)}},openLink:{label:"Open Extension Link",category:"Extensions",execute(e,t,{url:n}={}){r0(n)}}},Pi={id:"extensions",name:"Extensions",description:"Manage IDE extensions",version:"1.0.0",author:"IDE Core Team",tags:["extensions","marketplace"],capabilities:["ACTIVITY_BAR","SIDEBAR","RESOURCE_PROVIDER","COMMANDS"],icon:"package",title:"Extensions",position:"top",order:5,route:"/extensions",sidebarComponent:"ide-extensions-sidebar",scheme:"extensions",commands:xh,async onActivate(e){let t=e.context.getIDE();e.resources.register("extensions",i0(t));for(let[n,s]of Object.entries(xh)){let r=s.execute;e.commands.register(n,{...s,execute:(...i)=>r(e,t,...i)})}t.quickAccessItems=[...t.quickAccessItems||[],{label:"Manage Extensions",icon:"package",uri:"extensions://browse",order:80}],t.setState("sidebarVisible",!0)}}});var o0,a0,Qa,cn,Mi=y(()=>{Ue();o0=e=>Math.ceil((e?.length||0)/4),a0=`Be concise and direct. Avoid unnecessary verbosity.
Focus on actionable solutions rather than lengthy explanations.
Use bullet points for multiple items.
Be polite but efficient.`,Qa={tools:{}},cn=class{constructor(t={}){this.options=t,this.currentSession=null,this.context={items:[],maxTokens:t.maxTokens||8e3,totalTokens:0,autoInclude:{activeResource:!0,editorSelection:!1}},this.personality={enabled:!0,prompt:a0},this.mcpConfig={...Qa,tools:{...Qa.tools}},this._listeners=new Map,this._connected=!1,this._abortController=null,this._contextProvider=t.contextProvider||null,this._availableAgents=[],this._currentAgent=t.defaultAgent||"claude",this._loadSettings()}async getAvailableAgents(){try{let t=await j.AI.agent.getAgents();return this._availableAgents=t.agents||[],this._notify("agentsChange",{agents:this._availableAgents}),this._availableAgents}catch(t){return console.warn("[Agent] Failed to get agents:",t),[]}}getCurrentAgent(){return this._currentAgent}setCurrentAgent(t){this._currentAgent=t,this._saveSettings(),this._notify("agentChange",{agent:t})}async getModelsForAgent(t){try{return(await j.AI.agent.getModels(t||this._currentAgent)).models||[]}catch(n){return console.warn("[Agent] Failed to get models:",n),[]}}setContextProvider(t){this._contextProvider=t}getContextProvider(){return this._contextProvider}cancelMessage(){this._abortController&&(this._abortController.abort(),this._abortController=null)}_loadSettings(){try{let t=localStorage.getItem("agent_settings");if(t){let n=JSON.parse(t);n.personality&&(this.personality=n.personality),n.mcpConfig&&(this.mcpConfig={tools:{...Qa.tools,...n.mcpConfig.tools}}),n.currentAgent&&(this._currentAgent=n.currentAgent)}}catch(t){console.warn("[Agent] Failed to load settings:",t)}}_saveSettings(){try{let t={personality:this.personality,mcpConfig:this.mcpConfig,currentAgent:this._currentAgent};localStorage.setItem("agent_settings",JSON.stringify(t))}catch(t){console.warn("[Agent] Failed to save settings:",t)}}setPersonality(t,n=!0){this.personality={enabled:n,prompt:t},this._saveSettings(),this._notify("personalityChange",{personality:this.personality})}getPersonality(){return this.personality}getMcpConfig(){return this.mcpConfig}setMcpToolEnabled(t,n){this.mcpConfig.tools[t]=n,this._saveSettings(),this._notify("mcpConfigChange",{mcpConfig:this.mcpConfig})}getEnabledTools(){return Object.entries(this.mcpConfig.tools).filter(([t,n])=>n).map(([t])=>t)}subscribe(t,n){return this._listeners.has(t)||this._listeners.set(t,new Set),this._listeners.get(t).add(n),()=>this._listeners.get(t).delete(n)}_notify(t,n){this._listeners.has(t)&&this._listeners.get(t).forEach(s=>s(n))}async checkHealth(){try{let t=await j.AI.agent.health();return this._connected=t.status==="ok",this._notify("connectionChange",{connected:this._connected}),this._connected}catch(t){return this._connected=!1,this._notify("connectionChange",{connected:!1,error:t.message}),!1}}isConnected(){return this._connected}async createSession(t){let n=this.personality.enabled?this.personality.prompt:void 0,s=this.mcpConfig,r=t||this._currentAgent,{sessionId:i,agentId:o,agentName:a}=await j.AI.agent.createSession({agent:r,customPrompt:n,mcpConfig:s});this._currentAgent=o;let[l,c]=await j.Model.agent_sessions.add({title:"New Session",agentSessionId:i,agent:o,agentName:a||o,status:"active",contextItems:[]});if(l)throw new Error(l.message||"Failed to create session");this.currentSession=c,this._notify("sessionChange",{session:c});let d=this.options.defaultContextItems||j.manifest?.agent?.defaultContext||[];for(let h of d)try{await this.addToContext(h)}catch(f){console.warn(`[Agent] Failed to add default context ${h}:`,f.message)}return c}async resumeSession(t){let n=await j.Model.agent_sessions.get(t);if(!n)throw new Error("Session not found");let s=await j.Model.agent_messages.getAll({where:{session:t},order:"createdAt"});if(n.messages=s||[],n.agentSessionId)try{await j.AI.agent.resume(n.agentSessionId)}catch{console.log("[Agent] Could not resume agent session, will create new on send")}return this.currentSession=n,this.context.items=n.contextItems||[],this._updateTotalTokens(),this._notify("sessionChange",{session:n}),n}async closeSession(){if(this.currentSession?.agentSessionId)try{await j.AI.agent.close(this.currentSession.agentSessionId)}catch(t){console.warn("[Agent] Failed to close agent session:",t)}this.currentSession?.id&&await j.Model.agent_sessions.edit({id:this.currentSession.id,status:"closed"}),this.currentSession=null,this._notify("sessionChange",{session:null})}getCurrentSession(){return this.currentSession}async _ensureAgentSession(){if(!this.currentSession.agentSessionId){console.log("[Agent] No agent session, creating new one...");let{sessionId:t}=await j.AI.agent.createSession();this.currentSession.agentSessionId=t,await j.Model.agent_sessions.edit({id:this.currentSession.id,agentSessionId:t}),console.log("[Agent] New agent session created:",t)}return this.currentSession.agentSessionId}async*sendMessage(t,n={}){if(!this.currentSession)throw new Error("No active session");this._abortController=new AbortController;let s=this._abortController.signal,{planMode:r=!1}=n;console.log("[Agent] Sending message:",t,r?"(plan mode)":"");let i=this._buildContextSnapshot(),[o,a]=await j.Model.agent_messages.add({content:t,role:"user",session:this.currentSession.id,contextSnapshot:i});if(o)throw new Error(o.message||"Failed to save message");console.log("[Agent] User message saved:",a),this._notify("messageAdded",{message:a});let l=this._buildPromptWithContext(t,r);console.log("[Agent] Full prompt:",l);let c=this.currentSession.agentSessionId;try{await j.AI.agent.send(c,l)}catch(b){console.warn("[Agent] Send failed, creating new agent session:",b.message);let{sessionId:_}=await j.AI.agent.createSession();this.currentSession.agentSessionId=_,c=_,await j.Model.agent_sessions.edit({id:this.currentSession.id,agentSessionId:_}),console.log("[Agent] Retrying with new session:",_),await j.AI.agent.send(c,l)}console.log("[Agent] Message sent to agent, waiting for stream...");let d="",h=[],f=[],m=[];try{for await(let b of j.AI.agent.receive(c,s)){if(s.aborted)break;if(console.log("[Agent] Received from agent:",b.type,b),(b.type==="assistant"||b.type==="content")&&b.text)m.push({content:b.text,timestamp:Date.now()}),d=b.text,console.log("[Agent] Turn",m.length,":",d.substring(0,100)),yield{type:"content",content:d,turns:[...m],planMode:r,isComplete:!1};else if(b.type==="tool_use"){console.log("[Agent] TOOL_USE detected:",b.name,b.id);let _={id:b.id,type:"tool_use",name:b.name,input:b.input,status:"running",timestamp:Date.now()};f.push(_),h.push(b),yield{type:"activity",activity:_}}else if(b.type==="tool_result"){let _=f.find(R=>R.id===b.id);_&&(_.status=b.isError?"error":"completed",_.result=b.content),yield{type:"activity",activity:{id:b.id,type:"tool_result",content:b.content,isError:b.isError,status:b.isError?"error":"completed"}}}else b.type==="permission_request"?yield{type:"permission_request",toolUseID:b.toolUseID,toolName:b.toolName,input:b.input,blockedPath:b.blockedPath}:b.type==="question_request"&&(yield{type:"question_request",toolUseID:b.toolUseID,questions:b.questions})}}finally{this._abortController=null}if(s.aborted){console.log("[Agent] Message cancelled by user"),yield{type:"cancelled",content:d,turns:m,planMode:r,activities:f};return}console.log("[Agent] Stream complete. Content length:",d.length,"Turns:",m.length,"Plan mode:",r);let[,g]=await j.Model.agent_messages.add({content:d,role:"assistant",toolCalls:h.length>0?h:void 0,session:this.currentSession.id,planMode:r});g.turns=m,g.planMode=r,g.activities=f,console.log("[Agent] Assistant message saved:",g),this._notify("messageAdded",{message:g}),yield{type:"content",content:d,turns:m,planMode:r,activities:f,isComplete:!0}}_buildContextSnapshot(){return{items:this.context.items.map(t=>({id:t.id,type:t.type,source:t.source,label:t.label})),totalTokens:this.context.totalTokens}}_buildPromptWithContext(t,n=!1){let s="";if(n&&(s+=`<mode>PLAN MODE - Do NOT make any changes or execute any actions. Only analyze, explore, and create a detailed plan. Explain what you would do, which files you would modify, and what the implementation approach would be. Do not write or edit any files.</mode>

`),s+=`<mcp-tools-guidance>
`,s+=`You have access to MCP tools (prefixed with mcp__). Prioritize these tools when relevant to the task.
`,s+=`IMPORTANT: Only use tools when they are relevant to the user's request. Do not call tools just because they exist.
`,s+=`</mcp-tools-guidance>

`,this.context.items.length>0){s+=`<selected-resources>
`,s+=`The user has selected the following resources as context for this conversation.
`,s+=`These are available via the read_resource tool using their URI.
`,s+=`IMPORTANT: Only read these resources if they are relevant to the user's current request.
`,s+=`Do not read resources just because they are listed - read them when the task requires their content.

`;for(let r of this.context.items)s+=`- ${r.source}`,r.label&&r.label!==r.source&&(s+=` (${r.label})`),s+=`
`;s+=`</selected-resources>

`}return s+=t,s}async addToContext(t){let n=this.context.items.find(a=>a.source===t);if(n)return n;let s=null;this._contextProvider&&(s=await this._contextProvider.getContent(t)),s&&typeof s=="object"&&(s=JSON.parse(JSON.stringify(s)));let r=this._getLabelFromUri(t),i=o0(typeof s=="string"?s:JSON.stringify(s));if(this.context.totalTokens+i>this.context.maxTokens)throw new Error(`Adding this item would exceed token limit (${this.context.maxTokens})`);let o={id:`ctx_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,type:this._getTypeFromUri(t),source:t,label:r,content:s,tokenEstimate:i};return this.context.items.push(o),this._updateTotalTokens(),this.currentSession&&await j.Model.agent_sessions.edit({id:this.currentSession.id,contextItems:this.context.items}),this._notify("contextChange",{context:this.context}),o}async removeFromContext(t){let n=this.context.items.findIndex(s=>s.id===t);n!==-1&&(this.context.items.splice(n,1),this._updateTotalTokens(),this.currentSession&&await j.Model.agent_sessions.edit({id:this.currentSession.id,contextItems:this.context.items}),this._notify("contextChange",{context:this.context}))}clearContext(){this.context.items=[],this._updateTotalTokens(),this._notify("contextChange",{context:this.context})}getContext(){return this.context}_updateTotalTokens(){this.context.totalTokens=this.context.items.reduce((t,n)=>t+(n.tokenEstimate||0),0)}_getLabelFromUri(t){try{return new URL(t).pathname.split("/").filter(Boolean).pop()||t}catch{return t}}_getTypeFromUri(t){return t.startsWith("file://")?"file":(t.startsWith("cms://")||t.startsWith("chat://"),"resource")}async dispose(){await this.closeSession(),this._listeners.clear()}}});var ji,Ka,vh,wh,kh=y(()=>{Mi();ji={id:"agent",name:"AI Agent",description:"AI-powered agent for IDE tasks",version:"1.0.0",author:"Bootstrapp",tags:["ai","agent","claude","chat"],capabilities:["COMMANDS"],_service:null,async onActivate(e){this._service=new cn,e.commands.register("newSession",{label:"New AI Session",category:"Agent",keybinding:"Ctrl+Shift+A",execute:async()=>{try{await this._service.createSession(),e.ui.showMessage("New AI session created","info")}catch(t){e.ui.showMessage("Failed to create AI session: "+t.message,"error")}}}),e.commands.register("toggleAgent",{label:"Toggle AI Agent",category:"Agent",keybinding:"Ctrl+Alt+A",execute:()=>{let t=document.querySelector("agent-container");t&&(t.mode==="minimized"?t.setMode("sidebar"):t.setMode("minimized"))}}),e.commands.register("dockAgent",{label:"Dock AI Agent to Sidebar",category:"Agent",execute:()=>{let t=document.querySelector("agent-container");t&&t.setMode("sidebar")}}),e.commands.register("floatAgent",{label:"Float AI Agent",category:"Agent",execute:()=>{let t=document.querySelector("agent-container");t&&t.setMode("floating")}}),e.commands.register("minimizeAgent",{label:"Minimize AI Agent",category:"Agent",execute:()=>{let t=document.querySelector("agent-container");t&&t.setMode("minimized")}}),e.commands.register("addToContext",{label:"Add to AI Context",category:"Agent",execute:async({uri:t})=>{t||(t=e.context.getIDE().activeResourceUri),t&&(await this._service.addToContext(t),e.ui.showMessage("Added to AI context","info"))}}),e.contextMenus.register("file-tree/file",[{id:"agent.addToContext",label:"Add to AI Context",command:"agent.addToContext",group:"3_ai"}]),console.log("[Agent] Plugin activated")},async onDeactivate(e){this._service&&(await this._service.dispose(),this._service=null),console.log("[Agent] Plugin deactivated")},getService(){return this._service}},Ka=(e={})=>({...ji,config:e}),vh=ji,wh=Ka});var $h,Sh=y(()=>{$h=(e={})=>({getContent:e.getContent||(async()=>null),getActiveItem:e.getActiveItem||(()=>null),getAvailableItems:e.getAvailableItems||(()=>[]),subscribe:e.subscribe||(()=>()=>{}),label:e.label||"Context"})});var Fi,_h,Ga=y(()=>{Se();Sh();Fi=()=>{if(!nr())return null;let e=E();return $h({label:"Open Files",getContent:async t=>e.resourceContents?.[t]?e.resourceContents[t]:e.resourceProviders?.getProviderForUri?.(t)?.getContent?.(t)||null,getActiveItem:()=>{let t=e.activeResourceUri;return t?{uri:t,label:_h(t)}:null},getAvailableItems:()=>(e.getActivePanel?.()?.openResources||[]).map(n=>({uri:n,label:_h(n),tokens:Math.ceil((e.resourceContents?.[n]?.length||0)/4)})),subscribe:(t,n)=>t==="activeItem"?e.subscribe("activeResourceUri",n):t==="availableItems"?e.subscribe("panels",n):()=>{}})},_h=e=>{try{return new URL(e).pathname.split("/").filter(Boolean).pop()||e}catch{return e}}});function Di(e){let t=e.indexOf("://"),n=t>-1?e.slice(0,t):e.split(":")[0],s=t>-1?e.slice(t+3):e.replace(`${n}:`,""),r=s.split("/").filter(Boolean);return{scheme:n,parts:r,path:s}}var Ja=y(()=>{});function Ah(e,t,n={}){let s=t.default||{label:e,icon:"box",component:`${e}-dashboard`},r=n.parseUri||(o=>{let{parts:a}=Di(o);return{type:a[0]||"dashboard",parts:a}}),i={getTree:n.getTree||(()=>{let o={},a=1,l=`${e}://`;o[l]={id:String(a++),uri:l,type:"folder",name:e,parent:null,children:[]};for(let c of Object.keys(t)){if(c==="default")continue;let d=`${e}://${c}`,h=t[c];o[d]={id:String(a++),uri:d,type:"item",name:h.label||c,icon:h.icon,parent:l},o[l].children.push(d)}return o}),getContent:n.getContent||(async o=>{let a=r(o);return{type:a.type,uri:o,...a}}),getTabMetadata:o=>{let a=r(o);return t[a.type]||s}};return n.saveContent&&(i.saveContent=n.saveContent),n.create&&(i.create=n.create),n.delete&&(i.delete=n.delete),n.rename&&(i.rename=n.rename),n.watch&&(i.watch=n.watch),i}var Ch=y(()=>{Ja()});var Rh={};Ee(Rh,{AgentPlugin:()=>ji,AssistantPlugin:()=>vh,CorePlugin:()=>Si,ExtensionPlugin:()=>Pi,FilePlugin:()=>Ii,SearchPlugin:()=>Ti,createAgentPlugin:()=>Ka,createAssistantPlugin:()=>wh,createDefaultIDE:()=>l0,createIDE:()=>sr,createIDEContext:()=>Fi,createPlugin:()=>Zs,createResourceRoutes:()=>Ah,defaultPlugins:()=>Eh,getIDE:()=>E,getSetting:()=>Je,hasIDE:()=>nr,ideSchema:()=>$r,initSettings:()=>ki,onSettingChange:()=>Hd,parsePluginUri:()=>Di,resetSetting:()=>qd,setCurrentIDE:()=>tr,setSetting:()=>cs});function l0(e={}){let{plugins:t=[],routes:n={},setAsCurrent:s=!0}=e,r=sr({plugins:[...Eh,...t]});return s&&tr(r),r}var Eh,Ih=y(async()=>{Oa();Oa();Se();Se();La();qa();await Ha();Ya();kh();Ga();La();qa();await Ha();Ya();Do();gi();Ja();Ch();Ln();Eh=[Si,Ii,Ti,Pi]});var Th={};Ee(Th,{R2StorageAdapter:()=>Xa});var Xa,Ph=y(()=>{Xa=class{constructor(t){this.apiUrl=t.apiUrl||"",this.getAuthToken=typeof t.authToken=="function"?t.authToken:()=>t.authToken}async upload(t,n={}){let s=new FormData;s.append("file",t);let r=this.getAuthToken(),i={};r&&(i.Authorization=`Bearer ${r}`);let o=await fetch(`${this.apiUrl}/api/files`,{method:"POST",headers:i,body:s});if(!o.ok){let l=await o.json().catch(()=>({error:"Upload failed"}));throw new Error(l.error||"Upload failed")}let a=await o.json();return a.url=`${this.apiUrl}${a.url}`,a}async delete(t){let n=this.getAuthToken(),s={};n&&(s.Authorization=`Bearer ${n}`),await fetch(`${this.apiUrl}/api/files/${encodeURIComponent(t)}`,{method:"DELETE",headers:s})}getUrl(t){return`${this.apiUrl}/api/files/${encodeURIComponent(t)}`}}});var Mh={};Ee(Mh,{IDBStorageAdapter:()=>Za});var Za,jh=y(()=>{Za=class{constructor(t){this.config=t}async upload(t){let n=crypto.randomUUID();return await globalThis.$APP.Model.media.add({id:n,blob:t,mimeType:t.type||"",fileName:t.name||"",size:t.size||0}),{key:n,url:`media://${n}`}}async delete(t){try{await globalThis.$APP.Model.media.remove(t)}catch(n){console.warn("[IDBStorage] delete failed:",t,n.message)}}getUrl(t){return`media://${t}`}async getBlob(t){try{return(await globalThis.$APP.Model.media.get(t))?.blob||null}catch(n){return console.warn("[IDBStorage] getBlob failed:",t,n.message),null}}}});var Fh={};Ee(Fh,{StorageManager:()=>el});var el,Dh=y(()=>{Ta();el=class{constructor(t){this.adapter=null,this.config=t}async init(){let t=this.config.adapter||"r2";if(t==="r2"){let{R2StorageAdapter:n}=await Promise.resolve().then(()=>(Ph(),Th));this.adapter=new n(this.config)}else if(t==="indexeddb"){let{IDBStorageAdapter:n}=await Promise.resolve().then(()=>(jh(),Mh));this.adapter=new n(this.config)}}async upload(t,n={}){if(!this.adapter)throw new Error("Storage not initialized");let s=n.resize?await Ia(t,n.resize):t;return this.adapter.upload(s,n)}async delete(t){if(!this.adapter)throw new Error("Storage not initialized");return this.adapter.delete(t)}getUrl(t){if(!this.adapter)throw new Error("Storage not initialized");return this.adapter.getUrl(t)}async getBlob(t){return this.adapter?.getBlob?this.adapter.getBlob(t):null}}});var Oh={};Ee(Oh,{HomePlugin:()=>c0});var un,c0,Lh=y(()=>{Ue();H();rt();gi();un=e=>{let t=()=>e.configProvider;return{async getAll(){return await t()?.read("favorites.json")||[]},async getByUri(n){return(await this.getAll()).find(r=>r.uri===n)||null},async add(n){let s=await this.getAll();s.push(n),t()?.write("favorites.json",s)},async edit(n,s){let r=await this.getAll(),i=r.findIndex(o=>o.id===n);i>=0&&(Object.assign(r[i],s),t()?.write("favorites.json",r))},async remove(n){let s=await this.getAll();t()?.write("favorites.json",s.filter(r=>r.id!==n))}}},c0=Zs({id:"home",name:"Welcome",icon:"layout-dashboard",title:"Welcome",order:1,route:"/",sidebarComponent:"bsp-home-sidebar",scheme:"home",resources:{getContent(e){return{type:"home",uri:e}},getTabMetadata(e){return e==="home://recent"?{label:"Recent",icon:"clock",component:"bsp-recent"}:{label:"Welcome",icon:"layout-dashboard",component:"bsp-home"}}},menus:{Build:[{label:"New Note",command:"notes.newNote",keybinding:"Ctrl+N"},{label:"New Task",command:"tasks.newTask"},{label:"New Website",command:"pages.newWebsite"},{separator:!0},{label:"Browse Templates",command:"templates.browse"},{label:"Browse Extensions",command:"extensions.browse"},{separator:!0},{label:"Settings",command:"core.project.settings"},{label:"Command Palette",command:"core.workbench.commandPalette",keybinding:"Ctrl+P"}],Help:[{label:"Welcome",command:"home.home"}]},commands:{save:{label:"Save",category:"General",keybinding:"Ctrl+S",execute(e,t){t.saveActiveResource()}},home:{label:"Go to Welcome",category:"Navigation",execute(e,t){t.openResource("home://home")}},showRecent:{label:"Show Recent",category:"Navigation",execute(e,t){t.openResource("home://recent")}},viewRaw:{label:"View Raw Source",category:"Navigation",execute(e,t,{uri:n}={}){n&&t.openResource(`raw://${encodeURIComponent(n)}`)}},installTemplate:{label:"Install Template",category:"Templates",async execute(e,t,{templateId:n,variables:s}={}){if(!n)return;let r=await t.templates.loadTemplate(n);if(!r)return;let i=un(t),o={notes:d=>`notes://note/${d}`,tasks:d=>`tasks://list/${d}`,finance:d=>`finance://account/${d}`,challenges:d=>`challenges://challenge/${d}`,pages:d=>`pages://website/${d}`},a=await r.execute(s||{}),l=o[a?.plugin],c=l?l(a.slug):null;if(c&&!await i.getByUri(c))if(a?.plugin==="pages"){let h=`folder-${Date.now()}`,f=s?.siteName||s?.blogName||r.name;await i.add({id:h,label:f,icon:r.icon||"globe",isFolder:!0,sortOrder:t.favoriteUris?.size||0,createdAt:new Date().toISOString()}),await i.add({id:`fav-${Date.now()}`,uri:c,label:"Manage",icon:"settings",folder:h,sortOrder:0,createdAt:new Date().toISOString()}),t.favoriteUris?.add(c);try{let m=await fetch(`/content/collections/${a.slug}/_index.json`);if(m.ok){let g=await m.json(),b=1;for(let _ of g){if(_.slug?.startsWith("_"))continue;let R=await j.Model.collections.get(`${a.slug}/${_.slug}`);if(R&&R.type==="page"){let D=`pages://page/${a.slug}/${_.slug}`;await i.add({id:`fav-${Date.now()}-${b}`,uri:D,label:R.name||_.slug,icon:"file-text",folder:h,sortOrder:b,createdAt:new Date().toISOString()}),t.favoriteUris?.add(D),b++}}}}catch(m){console.warn("[home] Failed to add page favorites:",m)}ne.emit("favorites:changed"),t.emit("tabActions",t.tabActions)}else{let h=`fav-${Date.now()}`,f=t.favoriteUris?.size||0;await i.add({id:h,uri:c,label:r.name,icon:r.icon,sortOrder:f,createdAt:new Date().toISOString()}),t.favoriteUris?.add(c),ne.emit("favorites:changed"),t.emit("tabActions",t.tabActions)}c&&t.openResource(c)}},toggleFavorite:{label:"Toggle Favorite",category:"Home",async execute(e,t,{uri:n,label:s,icon:r}={}){if(!n)return;let i=un(t),o=await i.getByUri(n);if(o)await i.remove(o.id),t.favoriteUris.delete(n);else{let a=`fav-${Date.now()}`,l=t.favoriteUris.size;await i.add({id:a,uri:n,label:s||"",icon:r||"",sortOrder:l,createdAt:new Date().toISOString()}),t.favoriteUris.add(n)}ne.emit("favorites:changed"),t.emit("tabActions",t.tabActions)}},updateFavorite:{label:"Update Favorite",category:"Home",async execute(e,t,{id:n,...s}={}){if(!n)return;await un(t).edit(n,s),ne.emit("favorites:changed"),t.emit("tabActions",t.tabActions)}},createFolder:{label:"Create Favorites Folder",category:"Home",async execute(e,t,{name:n,icon:s}={}){if(!n)return;let r=un(t),i=`folder-${Date.now()}`,a=(await r.getAll()||[]).filter(l=>!l.folder).length;return await r.add({id:i,label:n,icon:s||"folder",isFolder:!0,sortOrder:a,createdAt:new Date().toISOString()}),ne.emit("favorites:changed"),t.emit("tabActions",t.tabActions),i}},updateFolder:{label:"Update Favorites Folder",category:"Home",async execute(e,t,{id:n,...s}={}){if(!n)return;await un(t).edit(n,s),ne.emit("favorites:changed"),t.emit("tabActions",t.tabActions)}},deleteFolder:{label:"Delete Favorites Folder",category:"Home",async execute(e,t,{id:n}={}){if(!n)return;let s=un(t),i=(await s.getAll()||[]).filter(o=>o.folder===n);for(let o of i)await s.edit(o.id,{folder:""});await s.remove(n),ne.emit("favorites:changed"),t.emit("tabActions",t.tabActions)}},reorderFavorites:{label:"Reorder Favorites",category:"Home",async execute(e,t,{updates:n}={}){if(!n?.length)return;let s=un(t);for(let{id:r,...i}of n)await s.edit(r,i);ne.emit("favorites:changed"),t.emit("tabActions",t.tabActions)}}},async onSetup(e,t){t.on("ide:ready",()=>{t.getActivePanel()?.openResources?.length||t.openResource("home://home")}),e.resources.register("raw",{getContent(r){let i=r.replace("raw://","");return{type:"raw",originalUri:decodeURIComponent(i),uri:r}},getTabMetadata(r){let i=r.replace("raw://",""),o=decodeURIComponent(i);return{label:`Raw: ${(t.resourceProviders.getProviderForUri(o)?.getTabMetadata?.(o)||{}).label||o}`,icon:"code",component:"bsp-raw-view",props:{originalUri:o}}}}),e.ui.setTabAction("viewRaw",{icon:"code",label:"View raw source",command:"home.viewRaw",getState(r,i){return r.startsWith("home://")||r.startsWith("raw://")?{hidden:!0}:i.resourceProviders.getProviderForUri(r)?.getRawContent?{args:{uri:r}}:{hidden:!0}}}),t.subscribe("template:installed",({template:r,result:i})=>{if(!i?.slug||!i?.plugin)return;let a={notes:c=>`notes://note/${c}`,tasks:c=>`tasks://list/${c}`,finance:c=>`finance://account/${c}`,challenges:c=>`challenges://challenge/${c}`,pages:c=>`pages://website/${c}`}[i.plugin],l=a?a(i.slug):null;l&&t.openResource(l)}),t.quickAccessItems=[...t.quickAccessItems||[],{label:"Overview",icon:"layout-dashboard",uri:"home://home",order:10}];let n=un(t),s=await n.getAll();t.favoriteUris=new Set((s||[]).filter(r=>!r.isFolder&&r.uri).map(r=>r.uri)),e.ui.setTabAction("favorite",{icon:"heart",label:"Add to favorites",command:"home.toggleFavorite",getState(r,i){if(r.startsWith("home://"))return{hidden:!0};let o=i.favoriteUris?.has(r)||!1,l=i.resourceProviders.getProviderForUri(r)?.getTabMetadata?.(r)||{};return{solid:o,color:o?"danger":"",label:o?"Remove from favorites":"Add to favorites",args:{uri:r,label:l.label||"",icon:l.icon||""}}}}),t.subscribe("resource:rename",async({oldUri:r,newUri:i})=>{if(!t.favoriteUris?.has(r))return;let a=(await n.getAll()||[]).find(l=>l.uri===r);if(a){let c=t.resourceProviders.getProviderForUri(i)?.getTabMetadata?.(i)||{};await n.edit(a.id,{uri:i,label:c.label||a.label}),t.favoriteUris.delete(r),t.favoriteUris.add(i),ne.emit("favorites:changed"),t.emit("tabActions",t.tabActions)}}),t.subscribe("resource:open",({uri:r})=>{if(!r||r.startsWith("home://"))return;let o=t.resourceProviders.getProviderForUri(r)?.getTabMetadata?.(r)||{},a={uri:r,label:o.label||r.split("/").pop()||r,icon:o.icon||"file",openedAt:new Date().toISOString()},l=(t.recentResources||[]).filter(c=>c.uri!==r);t.recentResources=[a,...l].slice(0,20),t.emit("recentResources",t.recentResources),t._debouncedSaveState()}),t.subscribe("resource:save",({uri:r})=>{let i=(t.recentResources||[]).findIndex(c=>c.uri===r);if(i===-1)return;let l=(t.resourceProviders.getProviderForUri(r)?.getTabMetadata?.(r)||{}).label||r.split("/").pop()||r;t.recentResources[i].label!==l&&(t.recentResources[i].label=l,t.recentResources=[...t.recentResources],t.emit("recentResources",t.recentResources),t._debouncedSaveState())}),t.subscribe("resource:rename",({oldUri:r,newUri:i})=>{let o=(t.recentResources||[]).findIndex(c=>c.uri===r);if(o===-1)return;let l=t.resourceProviders.getProviderForUri(i)?.getTabMetadata?.(i)||{};t.recentResources[o].uri=i,t.recentResources[o].label=l.label||i.split("/").pop()||i,t.recentResources=[...t.recentResources],t.emit("recentResources",t.recentResources),t._debouncedSaveState()}),e.ui.setStatusBarItem("ai-toggle",{position:"right",order:5,render:()=>p`
        <div class="flex items-center gap-1 cursor-pointer hover:bg-surface/20 px-1 rounded"
             @click=${()=>{let r=document.querySelector("ide-app");r&&(r.assistantVisible=!r.assistantVisible)}}>
          <uix-icon name="bot" class="w-3 h-3"></uix-icon>
          <span>AI</span>
        </div>
      `})}})});var zh={};var u0,d0,h0,p0,f0,m0,g0,b0,tl,nl=y(async()=>{Ue();H();kr();({createIDE:u0,setCurrentIDE:d0,CorePlugin:h0,FilePlugin:p0,SearchPlugin:f0,ExtensionPlugin:m0}=await Ih().then(()=>Rh)),{StorageManager:g0}=await Promise.resolve().then(()=>(Dh(),Fh)),{HomePlugin:b0}=await Promise.resolve().then(()=>(Lh(),Oh));j.Storage=new g0({adapter:"indexeddb"});await j.Storage.init();j.routes.set({"/":{name:"index",component:()=>p``}});tl=u0({plugins:[h0,p0,f0,m0,b0],extensions:{path:"/extensions"}});d0(tl);j.define("app-container",{async connected(){await tl.init({platform:"web"});let e=this.querySelector("ide-app");e&&(e.assistantVisible=!1)},disconnected(){tl.dispose()},render(){return p`<ide-app></ide-app>`}})});var w0={};var y0,x0,Uh,Nh,v0,Vh=y(async()=>{Ue();H();fu();Wr();Zt();ea();Ru();V();ca();await Ut();Jr();Nu();Qu();xa();Ku();console.log("[FE] loading component mappings...");({loadComponentMappings:y0}=await Lo().then(()=>Oo)),x0=await y0();en.initMappings(x0);console.log("[FE] component mappings loaded");Eu(j);console.log("[FE] initializing model/controller/router...");Yu(j);An.add("backend",Uu);Vr(ts);Br(j,An,F);ba(j,Fe,An);console.log("[FE] model/controller/router initialized");console.log("[FE] loading project frontend...");Uh=j.manifest?.frontendEntry;Uh?await import(Uh):window.location.pathname.startsWith("/admin")?await import("/admin/frontend.js"):await nl().then(()=>zh);console.log("[FE] project frontend loaded");Nh=j.theme.icon?.family||j.theme.font?.icon?.family||"lucide";Xn.iconFontFamily=`/node_modules/@bootstrapp/icon-${Nh}/${Nh}`;j.events.on("APP:INIT",()=>{F.components.has("app-container")||j.define("app-container",{tag:"app-container",class:"flex flex-grow",extends:"router-ui",properties:{routes:u.object({defaultValue:j.routes}),full:u.boolean(!0)}})});v0=e=>F.components.get(e)?.path||en.resolvePath(e);F.getComponentPath=v0;Xn.loadStyle=j.theme?.runtime??(!j.manifest.production||j.manifest.fullpackage);F.reloadComponents=!!j.manifest.preview;F.plugins.push({name:"hydrate",willUpdate:({instance:e})=>{j.manifest.production&&!e.hasUpdated&&e.hasAttribute("client:hydrate")&&(e.innerHTML="")}});j.routes["/"]||j.routes.set({"/":{name:"index",component:()=>p`<app-index></app-index>`}});console.log("[FE] framework frontend.js initialization complete")});function Yt(e=[]){return Array.isArray(e)?e:[e]}function Wh(e){return Array.from(new Set(e))}function ps(e){return typeof e=="string"}function fs(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Un(e){let t=e.length,n,s=-1,r="",i=e.charCodeAt(0);for(;++s<t;)n=e.charCodeAt(s),r+=n!==0?n!==37?n!==44?n>=1&&n<=31||n===127||s===0&&n>=48&&n<=57||s===1&&n>=48&&n<=57&&i===45?`\\${n.toString(16)} `:(s!==0||t!==1||n!==45)&&(n>=128||n===45||n===95||n>=48&&n<=57||n>=65&&n<=90||n>=97&&n<=122)?e.charAt(s):`\\${e.charAt(s)}`:"\\,":"\\%":"\uFFFD";return r}function qh(e=""){return A0.test(e)}function Hh(e){return e!=null}var k0,$0,S0,_0,ZE,Bh,A0,dn,Oi=y(()=>{k0="default",$0="preflights",S0="shortcuts",_0="imports",ZE={[_0]:-200,[$0]:-100,[S0]:-10,[k0]:0},Bh=/[\\:]?[\s'"`;{}]+/g;A0=/[\w\u00A0-\uFFFF%-?]/;dn={shortcutsNoMerge:"$$symbol-shortcut-no-merge",noMerge:"$$symbol-no-merge",variants:"$$symbol-variants",parent:"$$symbol-parent",selector:"$$symbol-selector",layer:"$$symbol-layer",sort:"$$symbol-sort"}});function C0(e){let t,n,s=2166136261;for(t=0,n=e.length;t<n;t++)s^=e.charCodeAt(t),s+=(s<<1)+(s<<4)+(s<<7)+(s<<8)+(s<<24);return`00000${(s>>>0).toString(36)}`.slice(-6)}function P0(e){let t=[];for(let r of e.matchAll(I0))(r.index===0||/^[\s'"`]/.test(e[r.index-1]??""))&&t.push(r[0]);for(let r of e.matchAll(R0))t.push(r[0]);let n=new Map,s="@unocss-skip-arbitrary-brackets";return(e=function(r,i,o,a){for(let l of Array.from(r.matchAll(o)))if(l!=null){let c=l[0],d=`${a}${C0(c)}`;i.set(d,c),r=r.replace(c,d)}return r}(e,n,/-\[(?!&.+?;)[^\]]*\]/g,s))&&e.split(Bh).forEach(r=>{r.includes(s)&&(r=function(i,o){for(let[a,l]of o.entries())i=i.replaceAll(a,l);return i}(r,n)),qh(r)&&!T0.test(r)&&t.push(r)}),t}function Yh(){return{name:"@unocss/extractor-arbitrary-variants",order:0,extract:({code:e})=>P0(function(t){return t.includes("sourceMappingURL=")?t.replace(E0,""):t}(e))}}var E0,R0,I0,T0,Qh=y(()=>{Oi();E0=/\/\/#\s*sourceMappingURL=.*\n?/g,R0=/(?:[\w&:[\]-]|\[\S{1,64}=\S{1,64}\]){1,64}\[\\?['"]?\S{1,64}?['"]\]\]?[\w:-]{0,64}/g,I0=/\[(\\\W|[\w-]){1,64}:[^\s:]{0,64}?("\S{1,64}?"|'\S{1,64}?'|`\S{1,64}?`|[^\s:]{1,64}?)[^\s:]{0,64}?\)?\]/g,T0=/^\[(?:\\\W|[\w-]){1,64}:['"]?\S{1,64}?['"]?\]$/});function sp(){il=!0;for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t=0;t<64;++t)Et[t]=e[t],ct[e.charCodeAt(t)]=t;ct[45]=62,ct[95]=63}function j0(e,t,n){for(var s,r,i=[],o=t;o<n;o+=3)s=(e[o]<<16)+(e[o+1]<<8)+e[o+2],i.push(Et[(r=s)>>18&63]+Et[r>>12&63]+Et[r>>6&63]+Et[63&r]);return i.join("")}function Gh(e){var t;il||sp();for(var n=e.length,s=n%3,r="",i=[],o=16383,a=0,l=n-s;a<l;a+=o)i.push(j0(e,a,a+o>l?l:a+o));return s===1?(t=e[n-1],r+=Et[t>>2],r+=Et[t<<4&63],r+="=="):s===2&&(t=(e[n-2]<<8)+e[n-1],r+=Et[t>>10],r+=Et[t>>4&63],r+=Et[t<<2&63],r+="="),i.push(r),i.join("")}function Li(e,t,n,s,r){var i,o,a=8*r-s-1,l=(1<<a)-1,c=l>>1,d=-7,h=n?r-1:0,f=n?-1:1,m=e[t+h];for(h+=f,i=m&(1<<-d)-1,m>>=-d,d+=a;d>0;i=256*i+e[t+h],h+=f,d-=8);for(o=i&(1<<-d)-1,i>>=-d,d+=s;d>0;o=256*o+e[t+h],h+=f,d-=8);if(i===0)i=1-c;else{if(i===l)return o?NaN:1/0*(m?-1:1);o+=Math.pow(2,s),i-=c}return(m?-1:1)*o*Math.pow(2,i-s)}function rp(e,t,n,s,r,i){var o,a,l,c=8*i-r-1,d=(1<<c)-1,h=d>>1,f=r===23?Math.pow(2,-24)-Math.pow(2,-77):0,m=s?0:i-1,g=s?1:-1,b=t<0||t===0&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,o=d):(o=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-o))<1&&(o--,l*=2),(t+=o+h>=1?f/l:f*Math.pow(2,1-h))*l>=2&&(o++,l/=2),o+h>=d?(a=0,o=d):o+h>=1?(a=(t*l-1)*Math.pow(2,r),o+=h):(a=t*Math.pow(2,h-1)*Math.pow(2,r),o=0));r>=8;e[n+m]=255&a,m+=g,a/=256,r-=8);for(o=o<<r|a,c+=r;c>0;e[n+m]=255&o,m+=g,o/=256,c-=8);e[n+m-g]|=128*b}function Ni(){return L.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function Qt(e,t){if(Ni()<t)throw new RangeError("Invalid typed array length");return L.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t)).__proto__=L.prototype:(e===null&&(e=new L(t)),e.length=t),e}function L(e,t,n){if(!(L.TYPED_ARRAY_SUPPORT||this instanceof L))return new L(e,t,n);if(typeof e=="number"){if(typeof t=="string")throw new Error("If encoding is specified then the first argument must be a string");return rl(this,e)}return op(this,e,t,n)}function op(e,t,n,s){if(typeof t=="number")throw new TypeError('"value" argument must not be a number');return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer?function(r,i,o,a){if(i.byteLength,o<0||i.byteLength<o)throw new RangeError("'offset' is out of bounds");if(i.byteLength<o+(a||0))throw new RangeError("'length' is out of bounds");return i=o===void 0&&a===void 0?new Uint8Array(i):a===void 0?new Uint8Array(i,o):new Uint8Array(i,o,a),L.TYPED_ARRAY_SUPPORT?(r=i).__proto__=L.prototype:r=sl(r,i),r}(e,t,n,s):typeof t=="string"?function(r,i,o){if(typeof o=="string"&&o!==""||(o="utf8"),!L.isEncoding(o))throw new TypeError('"encoding" must be a valid string encoding');var a=0|lp(i,o);r=Qt(r,a);var l=r.write(i,o);return l!==a&&(r=r.slice(0,l)),r}(e,t,n):function(r,i){if(Rt(i)){var o=0|ol(i.length);return(r=Qt(r,o)).length===0||i.copy(r,0,0,o),r}if(i){if(typeof ArrayBuffer<"u"&&i.buffer instanceof ArrayBuffer||"length"in i)return typeof i.length!="number"||(a=i.length)!=a?Qt(r,0):sl(r,i);if(i.type==="Buffer"&&ip(i.data))return sl(r,i.data)}var a;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function ap(e){if(typeof e!="number")throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function rl(e,t){if(ap(t),e=Qt(e,t<0?0:0|ol(t)),!L.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function sl(e,t){var n=t.length<0?0:0|ol(t.length);e=Qt(e,n);for(var s=0;s<n;s+=1)e[s]=255&t[s];return e}function ol(e){if(e>=Ni())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Ni().toString(16)+" bytes");return 0|e}function Rt(e){return!(e==null||!e._isBuffer)}function lp(e,t){if(Rt(e))return e.length;if(typeof ArrayBuffer<"u"&&typeof ArrayBuffer.isView=="function"&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;typeof e!="string"&&(e=""+e);var n=e.length;if(n===0)return 0;for(var s=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return Vi(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return hp(e).length;default:if(s)return Vi(e).length;t=(""+t).toLowerCase(),s=!0}}function D0(e,t,n){var s=!1;if((t===void 0||t<0)&&(t=0),t>this.length||((n===void 0||n>this.length)&&(n=this.length),n<=0)||(n>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return q0(this,t,n);case"utf8":case"utf-8":return up(this,t,n);case"ascii":return B0(this,t,n);case"latin1":case"binary":return W0(this,t,n);case"base64":return V0(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return H0(this,t,n);default:if(s)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),s=!0}}function Nn(e,t,n){var s=e[t];e[t]=e[n],e[n]=s}function Jh(e,t,n,s,r){if(e.length===0)return-1;if(typeof n=="string"?(s=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=r?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(r)return-1;n=e.length-1}else if(n<0){if(!r)return-1;n=0}if(typeof t=="string"&&(t=L.from(t,s)),Rt(t))return t.length===0?-1:Xh(e,t,n,s,r);if(typeof t=="number")return t&=255,L.TYPED_ARRAY_SUPPORT&&typeof Uint8Array.prototype.indexOf=="function"?r?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):Xh(e,[t],n,s,r);throw new TypeError("val must be string, number or Buffer")}function Xh(e,t,n,s,r){var i,o=1,a=e.length,l=t.length;if(s!==void 0&&((s=String(s).toLowerCase())==="ucs2"||s==="ucs-2"||s==="utf16le"||s==="utf-16le")){if(e.length<2||t.length<2)return-1;o=2,a/=2,l/=2,n/=2}function c(m,g){return o===1?m[g]:m.readUInt16BE(g*o)}if(r){var d=-1;for(i=n;i<a;i++)if(c(e,i)===c(t,d===-1?0:i-d)){if(d===-1&&(d=i),i-d+1===l)return d*o}else d!==-1&&(i-=i-d),d=-1}else for(n+l>a&&(n=a-l),i=n;i>=0;i--){for(var h=!0,f=0;f<l;f++)if(c(e,i+f)!==c(t,f)){h=!1;break}if(h)return i}return-1}function O0(e,t,n,s){n=Number(n)||0;var r=e.length-n;s?(s=Number(s))>r&&(s=r):s=r;var i=t.length;if(i%2!=0)throw new TypeError("Invalid hex string");s>i/2&&(s=i/2);for(var o=0;o<s;++o){var a=parseInt(t.substr(2*o,2),16);if(isNaN(a))return o;e[n+o]=a}return o}function L0(e,t,n,s){return Bi(Vi(t,e.length-n),e,n,s)}function cp(e,t,n,s){return Bi(function(r){for(var i=[],o=0;o<r.length;++o)i.push(255&r.charCodeAt(o));return i}(t),e,n,s)}function z0(e,t,n,s){return cp(e,t,n,s)}function U0(e,t,n,s){return Bi(hp(t),e,n,s)}function N0(e,t,n,s){return Bi(function(r,i){for(var o,a,l,c=[],d=0;d<r.length&&!((i-=2)<0);++d)a=(o=r.charCodeAt(d))>>8,l=o%256,c.push(l),c.push(a);return c}(t,e.length-n),e,n,s)}function V0(e,t,n){return t===0&&n===e.length?Gh(e):Gh(e.slice(t,n))}function up(e,t,n){n=Math.min(e.length,n);for(var s=[],r=t;r<n;){var i,o,a,l,c=e[r],d=null,h=c>239?4:c>223?3:c>191?2:1;if(r+h<=n)switch(h){case 1:c<128&&(d=c);break;case 2:(192&(i=e[r+1]))==128&&(l=(31&c)<<6|63&i)>127&&(d=l);break;case 3:i=e[r+1],o=e[r+2],(192&i)==128&&(192&o)==128&&(l=(15&c)<<12|(63&i)<<6|63&o)>2047&&(l<55296||l>57343)&&(d=l);break;case 4:i=e[r+1],o=e[r+2],a=e[r+3],(192&i)==128&&(192&o)==128&&(192&a)==128&&(l=(15&c)<<18|(63&i)<<12|(63&o)<<6|63&a)>65535&&l<1114112&&(d=l)}d===null?(d=65533,h=1):d>65535&&(d-=65536,s.push(d>>>10&1023|55296),d=56320|1023&d),s.push(d),r+=h}return function(f){var m=f.length;if(m<=Zh)return String.fromCharCode.apply(String,f);for(var g="",b=0;b<m;)g+=String.fromCharCode.apply(String,f.slice(b,b+=Zh));return g}(s)}function B0(e,t,n){var s="";n=Math.min(e.length,n);for(var r=t;r<n;++r)s+=String.fromCharCode(127&e[r]);return s}function W0(e,t,n){var s="";n=Math.min(e.length,n);for(var r=t;r<n;++r)s+=String.fromCharCode(e[r]);return s}function q0(e,t,n){var s=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>s)&&(n=s);for(var r="",i=t;i<n;++i)r+=Q0(e[i]);return r}function H0(e,t,n){for(var s=e.slice(t,n),r="",i=0;i<s.length;i+=2)r+=String.fromCharCode(s[i]+256*s[i+1]);return r}function qe(e,t,n){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function tt(e,t,n,s,r,i){if(!Rt(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>r||t<i)throw new RangeError('"value" argument is out of bounds');if(n+s>e.length)throw new RangeError("Index out of range")}function zi(e,t,n,s){t<0&&(t=65535+t+1);for(var r=0,i=Math.min(e.length-n,2);r<i;++r)e[n+r]=(t&255<<8*(s?r:1-r))>>>8*(s?r:1-r)}function Ui(e,t,n,s){t<0&&(t=4294967295+t+1);for(var r=0,i=Math.min(e.length-n,4);r<i;++r)e[n+r]=t>>>8*(s?r:3-r)&255}function dp(e,t,n,s,r,i){if(n+s>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function ep(e,t,n,s,r){return r||dp(e,0,n,4),rp(e,t,n,s,23,4),n+4}function tp(e,t,n,s,r){return r||dp(e,0,n,8),rp(e,t,n,s,52,8),n+8}function Q0(e){return e<16?"0"+e.toString(16):e.toString(16)}function Vi(e,t){var n;t=t||1/0;for(var s=e.length,r=null,i=[],o=0;o<s;++o){if((n=e.charCodeAt(o))>55295&&n<57344){if(!r){if(n>56319){(t-=3)>-1&&i.push(239,191,189);continue}if(o+1===s){(t-=3)>-1&&i.push(239,191,189);continue}r=n;continue}if(n<56320){(t-=3)>-1&&i.push(239,191,189),r=n;continue}n=65536+(r-55296<<10|n-56320)}else r&&(t-=3)>-1&&i.push(239,191,189);if(r=null,n<128){if((t-=1)<0)break;i.push(n)}else if(n<2048){if((t-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return i}function hp(e){return function(t){var n,s,r,i,o,a;il||sp();var l=t.length;if(l%4>0)throw new Error("Invalid string. Length must be a multiple of 4");o=t[l-2]==="="?2:t[l-1]==="="?1:0,a=new M0(3*l/4-o),r=o>0?l-4:l;var c=0;for(n=0,s=0;n<r;n+=4,s+=3)i=ct[t.charCodeAt(n)]<<18|ct[t.charCodeAt(n+1)]<<12|ct[t.charCodeAt(n+2)]<<6|ct[t.charCodeAt(n+3)],a[c++]=i>>16&255,a[c++]=i>>8&255,a[c++]=255&i;return o===2?(i=ct[t.charCodeAt(n)]<<2|ct[t.charCodeAt(n+1)]>>4,a[c++]=255&i):o===1&&(i=ct[t.charCodeAt(n)]<<10|ct[t.charCodeAt(n+1)]<<4|ct[t.charCodeAt(n+2)]>>2,a[c++]=i>>8&255,a[c++]=255&i),a}(function(t){if((t=function(n){return n.trim?n.trim():n.replace(/^\s+|\s+$/g,"")}(t).replace(Y0,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(e))}function Bi(e,t,n,s){for(var r=0;r<s&&!(r+n>=t.length||r>=e.length);++r)t[r+n]=e[r];return r}function np(e){return!!e.constructor&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)}var Kh,Et,ct,M0,il,F0,ip,Zh,Y0,Kt,sR,rR,iR,oR,aR,pp,lR,cR,fp=y(()=>{Kh=typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{},Et=[],ct=[],M0=typeof Uint8Array<"u"?Uint8Array:Array,il=!1;F0={}.toString,ip=Array.isArray||function(e){return F0.call(e)=="[object Array]"};L.TYPED_ARRAY_SUPPORT=Kh.TYPED_ARRAY_SUPPORT===void 0||Kh.TYPED_ARRAY_SUPPORT,Ni(),L.poolSize=8192,L._augment=function(e){return e.__proto__=L.prototype,e},L.from=function(e,t,n){return op(null,e,t,n)},L.TYPED_ARRAY_SUPPORT&&(L.prototype.__proto__=Uint8Array.prototype,L.__proto__=Uint8Array,typeof Symbol<"u"&&Symbol.species&&L[Symbol.species]),L.alloc=function(e,t,n){return function(s,r,i,o){return ap(r),r<=0?Qt(s,r):i!==void 0?typeof o=="string"?Qt(s,r).fill(i,o):Qt(s,r).fill(i):Qt(s,r)}(null,e,t,n)},L.allocUnsafe=function(e){return rl(null,e)},L.allocUnsafeSlow=function(e){return rl(null,e)},L.isBuffer=function(e){return e!=null&&(!!e._isBuffer||np(e)||function(t){return typeof t.readFloatLE=="function"&&typeof t.slice=="function"&&np(t.slice(0,0))}(e))},L.compare=function(e,t){if(!Rt(e)||!Rt(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,s=t.length,r=0,i=Math.min(n,s);r<i;++r)if(e[r]!==t[r]){n=e[r],s=t[r];break}return n<s?-1:s<n?1:0},L.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},L.concat=function(e,t){if(!ip(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return L.alloc(0);var n;if(t===void 0)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var s=L.allocUnsafe(t),r=0;for(n=0;n<e.length;++n){var i=e[n];if(!Rt(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(s,r),r+=i.length}return s},L.byteLength=lp,L.prototype._isBuffer=!0,L.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)Nn(this,t,t+1);return this},L.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)Nn(this,t,t+3),Nn(this,t+1,t+2);return this},L.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)Nn(this,t,t+7),Nn(this,t+1,t+6),Nn(this,t+2,t+5),Nn(this,t+3,t+4);return this},L.prototype.toString=function(){var e=0|this.length;return e===0?"":arguments.length===0?up(this,0,e):D0.apply(this,arguments)},L.prototype.equals=function(e){if(!Rt(e))throw new TypeError("Argument must be a Buffer");return this===e||L.compare(this,e)===0},L.prototype.inspect=function(){var e="";return this.length>0&&(e=this.toString("hex",0,50).match(/.{2}/g).join(" "),this.length>50&&(e+=" ... ")),"<Buffer "+e+">"},L.prototype.compare=function(e,t,n,s,r){if(!Rt(e))throw new TypeError("Argument must be a Buffer");if(t===void 0&&(t=0),n===void 0&&(n=e?e.length:0),s===void 0&&(s=0),r===void 0&&(r=this.length),t<0||n>e.length||s<0||r>this.length)throw new RangeError("out of range index");if(s>=r&&t>=n)return 0;if(s>=r)return-1;if(t>=n)return 1;if(this===e)return 0;for(var i=(r>>>=0)-(s>>>=0),o=(n>>>=0)-(t>>>=0),a=Math.min(i,o),l=this.slice(s,r),c=e.slice(t,n),d=0;d<a;++d)if(l[d]!==c[d]){i=l[d],o=c[d];break}return i<o?-1:o<i?1:0},L.prototype.includes=function(e,t,n){return this.indexOf(e,t,n)!==-1},L.prototype.indexOf=function(e,t,n){return Jh(this,e,t,n,!0)},L.prototype.lastIndexOf=function(e,t,n){return Jh(this,e,t,n,!1)},L.prototype.write=function(e,t,n,s){if(t===void 0)s="utf8",n=this.length,t=0;else if(n===void 0&&typeof t=="string")s=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(n)?(n|=0,s===void 0&&(s="utf8")):(s=n,n=void 0)}var r=this.length-t;if((n===void 0||n>r)&&(n=r),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");s||(s="utf8");for(var i=!1;;)switch(s){case"hex":return O0(this,e,t,n);case"utf8":case"utf-8":return L0(this,e,t,n);case"ascii":return cp(this,e,t,n);case"latin1":case"binary":return z0(this,e,t,n);case"base64":return U0(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return N0(this,e,t,n);default:if(i)throw new TypeError("Unknown encoding: "+s);s=(""+s).toLowerCase(),i=!0}},L.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};Zh=4096;L.prototype.slice=function(e,t){var n,s=this.length;if((e=~~e)<0?(e+=s)<0&&(e=0):e>s&&(e=s),(t=t===void 0?s:~~t)<0?(t+=s)<0&&(t=0):t>s&&(t=s),t<e&&(t=e),L.TYPED_ARRAY_SUPPORT)(n=this.subarray(e,t)).__proto__=L.prototype;else{var r=t-e;n=new L(r,void 0);for(var i=0;i<r;++i)n[i]=this[i+e]}return n},L.prototype.readUIntLE=function(e,t,n){e|=0,t|=0,n||qe(e,t,this.length);for(var s=this[e],r=1,i=0;++i<t&&(r*=256);)s+=this[e+i]*r;return s},L.prototype.readUIntBE=function(e,t,n){e|=0,t|=0,n||qe(e,t,this.length);for(var s=this[e+--t],r=1;t>0&&(r*=256);)s+=this[e+--t]*r;return s},L.prototype.readUInt8=function(e,t){return t||qe(e,1,this.length),this[e]},L.prototype.readUInt16LE=function(e,t){return t||qe(e,2,this.length),this[e]|this[e+1]<<8},L.prototype.readUInt16BE=function(e,t){return t||qe(e,2,this.length),this[e]<<8|this[e+1]},L.prototype.readUInt32LE=function(e,t){return t||qe(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},L.prototype.readUInt32BE=function(e,t){return t||qe(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},L.prototype.readIntLE=function(e,t,n){e|=0,t|=0,n||qe(e,t,this.length);for(var s=this[e],r=1,i=0;++i<t&&(r*=256);)s+=this[e+i]*r;return s>=(r*=128)&&(s-=Math.pow(2,8*t)),s},L.prototype.readIntBE=function(e,t,n){e|=0,t|=0,n||qe(e,t,this.length);for(var s=t,r=1,i=this[e+--s];s>0&&(r*=256);)i+=this[e+--s]*r;return i>=(r*=128)&&(i-=Math.pow(2,8*t)),i},L.prototype.readInt8=function(e,t){return t||qe(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},L.prototype.readInt16LE=function(e,t){t||qe(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},L.prototype.readInt16BE=function(e,t){t||qe(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},L.prototype.readInt32LE=function(e,t){return t||qe(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},L.prototype.readInt32BE=function(e,t){return t||qe(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},L.prototype.readFloatLE=function(e,t){return t||qe(e,4,this.length),Li(this,e,!0,23,4)},L.prototype.readFloatBE=function(e,t){return t||qe(e,4,this.length),Li(this,e,!1,23,4)},L.prototype.readDoubleLE=function(e,t){return t||qe(e,8,this.length),Li(this,e,!0,52,8)},L.prototype.readDoubleBE=function(e,t){return t||qe(e,8,this.length),Li(this,e,!1,52,8)},L.prototype.writeUIntLE=function(e,t,n,s){e=+e,t|=0,n|=0,s||tt(this,e,t,n,Math.pow(2,8*n)-1,0);var r=1,i=0;for(this[t]=255&e;++i<n&&(r*=256);)this[t+i]=e/r&255;return t+n},L.prototype.writeUIntBE=function(e,t,n,s){e=+e,t|=0,n|=0,s||tt(this,e,t,n,Math.pow(2,8*n)-1,0);var r=n-1,i=1;for(this[t+r]=255&e;--r>=0&&(i*=256);)this[t+r]=e/i&255;return t+n},L.prototype.writeUInt8=function(e,t,n){return e=+e,t|=0,n||tt(this,e,t,1,255,0),L.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},L.prototype.writeUInt16LE=function(e,t,n){return e=+e,t|=0,n||tt(this,e,t,2,65535,0),L.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):zi(this,e,t,!0),t+2},L.prototype.writeUInt16BE=function(e,t,n){return e=+e,t|=0,n||tt(this,e,t,2,65535,0),L.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):zi(this,e,t,!1),t+2},L.prototype.writeUInt32LE=function(e,t,n){return e=+e,t|=0,n||tt(this,e,t,4,4294967295,0),L.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):Ui(this,e,t,!0),t+4},L.prototype.writeUInt32BE=function(e,t,n){return e=+e,t|=0,n||tt(this,e,t,4,4294967295,0),L.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):Ui(this,e,t,!1),t+4},L.prototype.writeIntLE=function(e,t,n,s){if(e=+e,t|=0,!s){var r=Math.pow(2,8*n-1);tt(this,e,t,n,r-1,-r)}var i=0,o=1,a=0;for(this[t]=255&e;++i<n&&(o*=256);)e<0&&a===0&&this[t+i-1]!==0&&(a=1),this[t+i]=(e/o|0)-a&255;return t+n},L.prototype.writeIntBE=function(e,t,n,s){if(e=+e,t|=0,!s){var r=Math.pow(2,8*n-1);tt(this,e,t,n,r-1,-r)}var i=n-1,o=1,a=0;for(this[t+i]=255&e;--i>=0&&(o*=256);)e<0&&a===0&&this[t+i+1]!==0&&(a=1),this[t+i]=(e/o|0)-a&255;return t+n},L.prototype.writeInt8=function(e,t,n){return e=+e,t|=0,n||tt(this,e,t,1,127,-128),L.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},L.prototype.writeInt16LE=function(e,t,n){return e=+e,t|=0,n||tt(this,e,t,2,32767,-32768),L.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):zi(this,e,t,!0),t+2},L.prototype.writeInt16BE=function(e,t,n){return e=+e,t|=0,n||tt(this,e,t,2,32767,-32768),L.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):zi(this,e,t,!1),t+2},L.prototype.writeInt32LE=function(e,t,n){return e=+e,t|=0,n||tt(this,e,t,4,2147483647,-2147483648),L.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):Ui(this,e,t,!0),t+4},L.prototype.writeInt32BE=function(e,t,n){return e=+e,t|=0,n||tt(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),L.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):Ui(this,e,t,!1),t+4},L.prototype.writeFloatLE=function(e,t,n){return ep(this,e,t,!0,n)},L.prototype.writeFloatBE=function(e,t,n){return ep(this,e,t,!1,n)},L.prototype.writeDoubleLE=function(e,t,n){return tp(this,e,t,!0,n)},L.prototype.writeDoubleBE=function(e,t,n){return tp(this,e,t,!1,n)},L.prototype.copy=function(e,t,n,s){if(n||(n=0),s||s===0||(s=this.length),t>=e.length&&(t=e.length),t||(t=0),s>0&&s<n&&(s=n),s===n||e.length===0||this.length===0)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(s<0)throw new RangeError("sourceEnd out of bounds");s>this.length&&(s=this.length),e.length-t<s-n&&(s=e.length-t+n);var r,i=s-n;if(this===e&&n<t&&t<s)for(r=i-1;r>=0;--r)e[r+t]=this[r+n];else if(i<1e3||!L.TYPED_ARRAY_SUPPORT)for(r=0;r<i;++r)e[r+t]=this[r+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+i),t);return i},L.prototype.fill=function(e,t,n,s){if(typeof e=="string"){if(typeof t=="string"?(s=t,t=0,n=this.length):typeof n=="string"&&(s=n,n=this.length),e.length===1){var r=e.charCodeAt(0);r<256&&(e=r)}if(s!==void 0&&typeof s!="string")throw new TypeError("encoding must be a string");if(typeof s=="string"&&!L.isEncoding(s))throw new TypeError("Unknown encoding: "+s)}else typeof e=="number"&&(e&=255);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;var i;if(t>>>=0,n=n===void 0?this.length:n>>>0,e||(e=0),typeof e=="number")for(i=t;i<n;++i)this[i]=e;else{var o=Rt(e)?e:Vi(new L(e,s).toString()),a=o.length;for(i=0;i<n-t;++i)this[i+t]=o[i%a]}return this};Y0=/[^+\/0-9A-Za-z-_]/g;Kt={exports:{}};(function(e){let s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=new Uint8Array(64),i=new Uint8Array(128);for(let v=0;v<s.length;v++){let S=s.charCodeAt(v);r[v]=S,i[S]=v}function o(v,S){let w=0,P=0,B=0;do{let te=v.next();B=i[te],w|=(31&B)<<P,P+=5}while(32&B);let J=1&w;return w>>>=1,J&&(w=-2147483648|-w),S+w}function a(v,S,w){let P=S-w;P=P<0?-P<<1|1:P<<1;do{let B=31&P;P>>>=5,P>0&&(B|=32),v.write(r[B])}while(P>0);return S}function l(v,S){return!(v.pos>=S)&&v.peek()!==44}let c=16384,d=typeof TextDecoder<"u"?new TextDecoder:L!==void 0?{decode:v=>L.from(v.buffer,v.byteOffset,v.byteLength).toString()}:{decode(v){let S="";for(let w=0;w<v.length;w++)S+=String.fromCharCode(v[w]);return S}};class h{constructor(){this.pos=0,this.out="",this.buffer=new Uint8Array(c)}write(S){let{buffer:w}=this;w[this.pos++]=S,this.pos===c&&(this.out+=d.decode(w),this.pos=0)}flush(){let{buffer:S,out:w,pos:P}=this;return P>0?w+d.decode(S.subarray(0,P)):w}}class f{constructor(S){this.pos=0,this.buffer=S}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(S){let{buffer:w,pos:P}=this,B=w.indexOf(S,P);return B===-1?w.length:B}}let m=[];function g(v){let{length:S}=v,w=new f(v),P=[],B=[],J=0;for(;w.pos<S;w.pos++){J=o(w,J);let te=o(w,0);if(!l(w,S)){let le=B.pop();le[2]=J,le[3]=te;continue}let se=o(w,0),oe=1&o(w,0)?[J,te,0,0,se,o(w,0)]:[J,te,0,0,se],ce=m;if(l(w,S)){ce=[];do{let le=o(w,0);ce.push(le)}while(l(w,S))}oe.vars=ce,P.push(oe),B.push(oe)}return P}function b(v){let S=new h;for(let w=0;w<v.length;)w=_(v,w,S,[0]);return S.flush()}function _(v,S,w,P){let B=v[S],{0:J,1:te,2:se,3:oe,4:ce,vars:le}=B;S>0&&w.write(44),P[0]=a(w,J,P[0]),a(w,te,0),a(w,ce,0),a(w,B.length===6?1:0,0),B.length===6&&a(w,B[5],0);for(let ke of le)a(w,ke,0);for(S++;S<v.length;){let ke=v[S],{0:ue,1:Te}=ke;if(ue>se||ue===se&&Te>=oe)break;S=_(v,S,w,P)}return w.write(44),P[0]=a(w,se,P[0]),a(w,oe,0),S}function R(v){let{length:S}=v,w=new f(v),P=[],B=[],J=0,te=0,se=0,oe=0,ce=0,le=0,ke=0,ue=0;do{let Te=w.indexOf(";"),Ne=0;for(;w.pos<Te;w.pos++){if(Ne=o(w,Ne),!l(w,Te)){let Ze=B.pop();Ze[2]=J,Ze[3]=Ne;continue}let St=o(w,0),gn=2&St,vr=4&St,jt,As=null,Cs=m;if(1&St){let Ze=o(w,te);se=o(w,te===Ze?se:0),te=Ze,jt=[J,Ne,0,0,Ze,se]}else jt=[J,Ne,0,0];if(jt.isScope=!!vr,gn){let Ze=oe,Ft=ce;oe=o(w,oe);let bn=Ze===oe;ce=o(w,bn?ce:0),le=o(w,bn&&Ft===ce?le:0),As=[oe,ce,le]}if(jt.callsite=As,l(w,Te)){Cs=[];do{ke=J,ue=Ne;let Ze=o(w,0),Ft;if(Ze<-1){Ft=[[o(w,0)]];for(let bn=-1;bn>Ze;bn--){let _o=ke;ke=o(w,ke),ue=o(w,ke===_o?ue:0);let et=o(w,0);Ft.push([et,ke,ue])}}else Ft=[[Ze]];Cs.push(Ft)}while(l(w,Te))}jt.bindings=Cs,P.push(jt),B.push(jt)}J++,w.pos=Te+1}while(w.pos<S);return P}function D(v){if(v.length===0)return"";let S=new h;for(let w=0;w<v.length;)w=M(v,w,S,[0,0,0,0,0,0,0]);return S.flush()}function M(v,S,w,P){let B=v[S],{0:J,1:te,2:se,3:oe,isScope:ce,callsite:le,bindings:ke}=B;if(P[0]<J?(K(w,P[0],J),P[0]=J,P[1]=0):S>0&&w.write(44),P[1]=a(w,B[1],P[1]),a(w,(B.length===6?1:0)|(le?2:0)|(ce?4:0),0),B.length===6){let{4:ue,5:Te}=B;ue!==P[2]&&(P[3]=0),P[2]=a(w,ue,P[2]),P[3]=a(w,Te,P[3])}if(le){let{0:ue,1:Te,2:Ne}=B.callsite;ue!==P[4]?(P[5]=0,P[6]=0):Te!==P[5]&&(P[6]=0),P[4]=a(w,ue,P[4]),P[5]=a(w,Te,P[5]),P[6]=a(w,Ne,P[6])}if(ke)for(let ue of ke){ue.length>1&&a(w,-ue.length,0),a(w,ue[0][0],0);let Te=J,Ne=te;for(let St=1;St<ue.length;St++){let gn=ue[St];Te=a(w,gn[1],Te),Ne=a(w,gn[2],Ne),a(w,gn[0],0)}}for(S++;S<v.length;){let ue=v[S],{0:Te,1:Ne}=ue;if(Te>se||Te===se&&Ne>=oe)break;S=M(v,S,w,P)}return P[0]<se?(K(w,P[0],se),P[0]=se,P[1]=0):w.write(44),P[1]=a(w,oe,P[1]),S}function K(v,S,w){do v.write(59);while(++S<w)}function ee(v){let{length:S}=v,w=new f(v),P=[],B=0,J=0,te=0,se=0,oe=0;do{let ce=w.indexOf(";"),le=[],ke=!0,ue=0;for(B=0;w.pos<ce;){let Te;B=o(w,B),B<ue&&(ke=!1),ue=B,l(w,ce)?(J=o(w,J),te=o(w,te),se=o(w,se),l(w,ce)?(oe=o(w,oe),Te=[B,J,te,se,oe]):Te=[B,J,te,se]):Te=[B],le.push(Te),w.pos++}ke||Y(le),P.push(le),w.pos=ce+1}while(w.pos<=S);return P}function Y(v){v.sort(A)}function A(v,S){return v[0]-S[0]}function C(v){let S=new h,w=0,P=0,B=0,J=0;for(let te=0;te<v.length;te++){let se=v[te];if(te>0&&S.write(59),se.length===0)continue;let oe=0;for(let ce=0;ce<se.length;ce++){let le=se[ce];ce>0&&S.write(44),oe=a(S,le[0],oe),le.length!==1&&(w=a(S,le[1],w),P=a(S,le[2],P),B=a(S,le[3],B),le.length!==4&&(J=a(S,le[4],J)))}}return S.flush()}e.decode=ee,e.decodeGeneratedRanges=R,e.decodeOriginalScopes=g,e.encode=C,e.encodeGeneratedRanges=D,e.encodeOriginalScopes=b,Object.defineProperty(e,"__esModule",{value:!0})})(Kt.exports);sR=Kt.exports,rR=Kt.exports.__esModule,iR=Kt.exports.decode,oR=Kt.exports.decodeGeneratedRanges,aR=Kt.exports.decodeOriginalScopes,pp=Kt.exports.encode,lR=Kt.exports.encodeGeneratedRanges,cR=Kt.exports.encodeOriginalScopes});function Sp(){dl=!0;for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t=0;t<64;++t)It[t]=e[t],ut[e.charCodeAt(t)]=t;ut[45]=62,ut[95]=63}function G0(e,t,n){for(var s,r,i=[],o=t;o<n;o+=3)s=(e[o]<<16)+(e[o+1]<<8)+e[o+2],i.push(It[(r=s)>>18&63]+It[r>>12&63]+It[r>>6&63]+It[63&r]);return i.join("")}function gp(e){var t;dl||Sp();for(var n=e.length,s=n%3,r="",i=[],o=16383,a=0,l=n-s;a<l;a+=o)i.push(G0(e,a,a+o>l?l:a+o));return s===1?(t=e[n-1],r+=It[t>>2],r+=It[t<<4&63],r+="=="):s===2&&(t=(e[n-2]<<8)+e[n-1],r+=It[t>>10],r+=It[t>>4&63],r+=It[t<<2&63],r+="="),i.push(r),i.join("")}function Wi(e,t,n,s,r){var i,o,a=8*r-s-1,l=(1<<a)-1,c=l>>1,d=-7,h=n?r-1:0,f=n?-1:1,m=e[t+h];for(h+=f,i=m&(1<<-d)-1,m>>=-d,d+=a;d>0;i=256*i+e[t+h],h+=f,d-=8);for(o=i&(1<<-d)-1,i>>=-d,d+=s;d>0;o=256*o+e[t+h],h+=f,d-=8);if(i===0)i=1-c;else{if(i===l)return o?NaN:1/0*(m?-1:1);o+=Math.pow(2,s),i-=c}return(m?-1:1)*o*Math.pow(2,i-s)}function _p(e,t,n,s,r,i){var o,a,l,c=8*i-r-1,d=(1<<c)-1,h=d>>1,f=r===23?Math.pow(2,-24)-Math.pow(2,-77):0,m=s?0:i-1,g=s?1:-1,b=t<0||t===0&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,o=d):(o=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-o))<1&&(o--,l*=2),(t+=o+h>=1?f/l:f*Math.pow(2,1-h))*l>=2&&(o++,l/=2),o+h>=d?(a=0,o=d):o+h>=1?(a=(t*l-1)*Math.pow(2,r),o+=h):(a=t*Math.pow(2,h-1)*Math.pow(2,r),o=0));r>=8;e[n+m]=255&a,m+=g,a/=256,r-=8);for(o=o<<r|a,c+=r;c>0;e[n+m]=255&o,m+=g,o/=256,c-=8);e[n+m-g]|=128*b}function Yi(){return z.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function Gt(e,t){if(Yi()<t)throw new RangeError("Invalid typed array length");return z.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t)).__proto__=z.prototype:(e===null&&(e=new z(t)),e.length=t),e}function z(e,t,n){if(!(z.TYPED_ARRAY_SUPPORT||this instanceof z))return new z(e,t,n);if(typeof e=="number"){if(typeof t=="string")throw new Error("If encoding is specified then the first argument must be a string");return ll(this,e)}return Cp(this,e,t,n)}function Cp(e,t,n,s){if(typeof t=="number")throw new TypeError('"value" argument must not be a number');return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer?function(r,i,o,a){if(i.byteLength,o<0||i.byteLength<o)throw new RangeError("'offset' is out of bounds");if(i.byteLength<o+(a||0))throw new RangeError("'length' is out of bounds");return i=o===void 0&&a===void 0?new Uint8Array(i):a===void 0?new Uint8Array(i,o):new Uint8Array(i,o,a),z.TYPED_ARRAY_SUPPORT?(r=i).__proto__=z.prototype:r=al(r,i),r}(e,t,n,s):typeof t=="string"?function(r,i,o){if(typeof o=="string"&&o!==""||(o="utf8"),!z.isEncoding(o))throw new TypeError('"encoding" must be a valid string encoding');var a=0|Rp(i,o);r=Gt(r,a);var l=r.write(i,o);return l!==a&&(r=r.slice(0,l)),r}(e,t,n):function(r,i){if(Tt(i)){var o=0|hl(i.length);return(r=Gt(r,o)).length===0||i.copy(r,0,0,o),r}if(i){if(typeof ArrayBuffer<"u"&&i.buffer instanceof ArrayBuffer||"length"in i)return typeof i.length!="number"||(a=i.length)!=a?Gt(r,0):al(r,i);if(i.type==="Buffer"&&Ap(i.data))return al(r,i.data)}var a;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function Ep(e){if(typeof e!="number")throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function ll(e,t){if(Ep(t),e=Gt(e,t<0?0:0|hl(t)),!z.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function al(e,t){var n=t.length<0?0:0|hl(t.length);e=Gt(e,n);for(var s=0;s<n;s+=1)e[s]=255&t[s];return e}function hl(e){if(e>=Yi())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Yi().toString(16)+" bytes");return 0|e}function Tt(e){return!(e==null||!e._isBuffer)}function Rp(e,t){if(Tt(e))return e.length;if(typeof ArrayBuffer<"u"&&typeof ArrayBuffer.isView=="function"&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;typeof e!="string"&&(e=""+e);var n=e.length;if(n===0)return 0;for(var s=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return Qi(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return Mp(e).length;default:if(s)return Qi(e).length;t=(""+t).toLowerCase(),s=!0}}function X0(e,t,n){var s=!1;if((t===void 0||t<0)&&(t=0),t>this.length||((n===void 0||n>this.length)&&(n=this.length),n<=0)||(n>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return aw(this,t,n);case"utf8":case"utf-8":return Tp(this,t,n);case"ascii":return iw(this,t,n);case"latin1":case"binary":return ow(this,t,n);case"base64":return rw(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return lw(this,t,n);default:if(s)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),s=!0}}function Vn(e,t,n){var s=e[t];e[t]=e[n],e[n]=s}function bp(e,t,n,s,r){if(e.length===0)return-1;if(typeof n=="string"?(s=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=r?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(r)return-1;n=e.length-1}else if(n<0){if(!r)return-1;n=0}if(typeof t=="string"&&(t=z.from(t,s)),Tt(t))return t.length===0?-1:yp(e,t,n,s,r);if(typeof t=="number")return t&=255,z.TYPED_ARRAY_SUPPORT&&typeof Uint8Array.prototype.indexOf=="function"?r?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):yp(e,[t],n,s,r);throw new TypeError("val must be string, number or Buffer")}function yp(e,t,n,s,r){var i,o=1,a=e.length,l=t.length;if(s!==void 0&&((s=String(s).toLowerCase())==="ucs2"||s==="ucs-2"||s==="utf16le"||s==="utf-16le")){if(e.length<2||t.length<2)return-1;o=2,a/=2,l/=2,n/=2}function c(m,g){return o===1?m[g]:m.readUInt16BE(g*o)}if(r){var d=-1;for(i=n;i<a;i++)if(c(e,i)===c(t,d===-1?0:i-d)){if(d===-1&&(d=i),i-d+1===l)return d*o}else d!==-1&&(i-=i-d),d=-1}else for(n+l>a&&(n=a-l),i=n;i>=0;i--){for(var h=!0,f=0;f<l;f++)if(c(e,i+f)!==c(t,f)){h=!1;break}if(h)return i}return-1}function Z0(e,t,n,s){n=Number(n)||0;var r=e.length-n;s?(s=Number(s))>r&&(s=r):s=r;var i=t.length;if(i%2!=0)throw new TypeError("Invalid hex string");s>i/2&&(s=i/2);for(var o=0;o<s;++o){var a=parseInt(t.substr(2*o,2),16);if(isNaN(a))return o;e[n+o]=a}return o}function ew(e,t,n,s){return Xi(Qi(t,e.length-n),e,n,s)}function Ip(e,t,n,s){return Xi(function(r){for(var i=[],o=0;o<r.length;++o)i.push(255&r.charCodeAt(o));return i}(t),e,n,s)}function tw(e,t,n,s){return Ip(e,t,n,s)}function nw(e,t,n,s){return Xi(Mp(t),e,n,s)}function sw(e,t,n,s){return Xi(function(r,i){for(var o,a,l,c=[],d=0;d<r.length&&!((i-=2)<0);++d)a=(o=r.charCodeAt(d))>>8,l=o%256,c.push(l),c.push(a);return c}(t,e.length-n),e,n,s)}function rw(e,t,n){return t===0&&n===e.length?gp(e):gp(e.slice(t,n))}function Tp(e,t,n){n=Math.min(e.length,n);for(var s=[],r=t;r<n;){var i,o,a,l,c=e[r],d=null,h=c>239?4:c>223?3:c>191?2:1;if(r+h<=n)switch(h){case 1:c<128&&(d=c);break;case 2:(192&(i=e[r+1]))==128&&(l=(31&c)<<6|63&i)>127&&(d=l);break;case 3:i=e[r+1],o=e[r+2],(192&i)==128&&(192&o)==128&&(l=(15&c)<<12|(63&i)<<6|63&o)>2047&&(l<55296||l>57343)&&(d=l);break;case 4:i=e[r+1],o=e[r+2],a=e[r+3],(192&i)==128&&(192&o)==128&&(192&a)==128&&(l=(15&c)<<18|(63&i)<<12|(63&o)<<6|63&a)>65535&&l<1114112&&(d=l)}d===null?(d=65533,h=1):d>65535&&(d-=65536,s.push(d>>>10&1023|55296),d=56320|1023&d),s.push(d),r+=h}return function(f){var m=f.length;if(m<=xp)return String.fromCharCode.apply(String,f);for(var g="",b=0;b<m;)g+=String.fromCharCode.apply(String,f.slice(b,b+=xp));return g}(s)}function iw(e,t,n){var s="";n=Math.min(e.length,n);for(var r=t;r<n;++r)s+=String.fromCharCode(127&e[r]);return s}function ow(e,t,n){var s="";n=Math.min(e.length,n);for(var r=t;r<n;++r)s+=String.fromCharCode(e[r]);return s}function aw(e,t,n){var s=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>s)&&(n=s);for(var r="",i=t;i<n;++i)r+=uw(e[i]);return r}function lw(e,t,n){for(var s=e.slice(t,n),r="",i=0;i<s.length;i+=2)r+=String.fromCharCode(s[i]+256*s[i+1]);return r}function He(e,t,n){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function nt(e,t,n,s,r,i){if(!Tt(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>r||t<i)throw new RangeError('"value" argument is out of bounds');if(n+s>e.length)throw new RangeError("Index out of range")}function qi(e,t,n,s){t<0&&(t=65535+t+1);for(var r=0,i=Math.min(e.length-n,2);r<i;++r)e[n+r]=(t&255<<8*(s?r:1-r))>>>8*(s?r:1-r)}function Hi(e,t,n,s){t<0&&(t=4294967295+t+1);for(var r=0,i=Math.min(e.length-n,4);r<i;++r)e[n+r]=t>>>8*(s?r:3-r)&255}function Pp(e,t,n,s,r,i){if(n+s>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function vp(e,t,n,s,r){return r||Pp(e,0,n,4),_p(e,t,n,s,23,4),n+4}function wp(e,t,n,s,r){return r||Pp(e,0,n,8),_p(e,t,n,s,52,8),n+8}function uw(e){return e<16?"0"+e.toString(16):e.toString(16)}function Qi(e,t){var n;t=t||1/0;for(var s=e.length,r=null,i=[],o=0;o<s;++o){if((n=e.charCodeAt(o))>55295&&n<57344){if(!r){if(n>56319){(t-=3)>-1&&i.push(239,191,189);continue}if(o+1===s){(t-=3)>-1&&i.push(239,191,189);continue}r=n;continue}if(n<56320){(t-=3)>-1&&i.push(239,191,189),r=n;continue}n=65536+(r-55296<<10|n-56320)}else r&&(t-=3)>-1&&i.push(239,191,189);if(r=null,n<128){if((t-=1)<0)break;i.push(n)}else if(n<2048){if((t-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return i}function Mp(e){return function(t){var n,s,r,i,o,a;dl||Sp();var l=t.length;if(l%4>0)throw new Error("Invalid string. Length must be a multiple of 4");o=t[l-2]==="="?2:t[l-1]==="="?1:0,a=new K0(3*l/4-o),r=o>0?l-4:l;var c=0;for(n=0,s=0;n<r;n+=4,s+=3)i=ut[t.charCodeAt(n)]<<18|ut[t.charCodeAt(n+1)]<<12|ut[t.charCodeAt(n+2)]<<6|ut[t.charCodeAt(n+3)],a[c++]=i>>16&255,a[c++]=i>>8&255,a[c++]=255&i;return o===2?(i=ut[t.charCodeAt(n)]<<2|ut[t.charCodeAt(n+1)]>>4,a[c++]=255&i):o===1&&(i=ut[t.charCodeAt(n)]<<10|ut[t.charCodeAt(n+1)]<<4|ut[t.charCodeAt(n+2)]>>2,a[c++]=i>>8&255,a[c++]=255&i),a}(function(t){if((t=function(n){return n.trim?n.trim():n.replace(/^\s+|\s+$/g,"")}(t).replace(cw,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(e))}function Xi(e,t,n,s){for(var r=0;r<s&&!(r+n>=t.length||r>=e.length);++r)t[r+n]=e[r];return r}function kp(e){return!!e.constructor&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)}function dw(){return typeof globalThis<"u"&&typeof globalThis.btoa=="function"?e=>globalThis.btoa(unescape(encodeURIComponent(e))):e=>z.from(e,"utf-8").toString("base64")}function pw(e,t){let n=e.split(/[/\\]/),s=t.split(/[/\\]/);for(n.pop();n[0]===s[0];)n.shift(),s.shift();if(n.length){let r=n.length;for(;r--;)n[r]=".."}return n.concat(s).join("/")}function mw(e){return fw.call(e)==="[object Object]"}function $p(e){let t=e.split(`
`),n=[];for(let s=0,r=0;s<t.length;s++)n.push(r),r+=t[s].length+1;return function(s){let r=0,i=n.length;for(;r<i;){let a=r+i>>1;s<n[a]?i=a:r=a+1}let o=r-1;return{line:o,column:s-n[o]}}}var mp,It,ut,K0,dl,J0,Ap,xp,cw,Ki,Gi,hw,cl,fw,gw,ul,rr,ms,Ji,jp=y(()=>{fp();mp=typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{},It=[],ut=[],K0=typeof Uint8Array<"u"?Uint8Array:Array,dl=!1;J0={}.toString,Ap=Array.isArray||function(e){return J0.call(e)=="[object Array]"};z.TYPED_ARRAY_SUPPORT=mp.TYPED_ARRAY_SUPPORT===void 0||mp.TYPED_ARRAY_SUPPORT,Yi(),z.poolSize=8192,z._augment=function(e){return e.__proto__=z.prototype,e},z.from=function(e,t,n){return Cp(null,e,t,n)},z.TYPED_ARRAY_SUPPORT&&(z.prototype.__proto__=Uint8Array.prototype,z.__proto__=Uint8Array,typeof Symbol<"u"&&Symbol.species&&z[Symbol.species]),z.alloc=function(e,t,n){return function(s,r,i,o){return Ep(r),r<=0?Gt(s,r):i!==void 0?typeof o=="string"?Gt(s,r).fill(i,o):Gt(s,r).fill(i):Gt(s,r)}(null,e,t,n)},z.allocUnsafe=function(e){return ll(null,e)},z.allocUnsafeSlow=function(e){return ll(null,e)},z.isBuffer=function(e){return e!=null&&(!!e._isBuffer||kp(e)||function(t){return typeof t.readFloatLE=="function"&&typeof t.slice=="function"&&kp(t.slice(0,0))}(e))},z.compare=function(e,t){if(!Tt(e)||!Tt(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,s=t.length,r=0,i=Math.min(n,s);r<i;++r)if(e[r]!==t[r]){n=e[r],s=t[r];break}return n<s?-1:s<n?1:0},z.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},z.concat=function(e,t){if(!Ap(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return z.alloc(0);var n;if(t===void 0)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var s=z.allocUnsafe(t),r=0;for(n=0;n<e.length;++n){var i=e[n];if(!Tt(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(s,r),r+=i.length}return s},z.byteLength=Rp,z.prototype._isBuffer=!0,z.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)Vn(this,t,t+1);return this},z.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)Vn(this,t,t+3),Vn(this,t+1,t+2);return this},z.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)Vn(this,t,t+7),Vn(this,t+1,t+6),Vn(this,t+2,t+5),Vn(this,t+3,t+4);return this},z.prototype.toString=function(){var e=0|this.length;return e===0?"":arguments.length===0?Tp(this,0,e):X0.apply(this,arguments)},z.prototype.equals=function(e){if(!Tt(e))throw new TypeError("Argument must be a Buffer");return this===e||z.compare(this,e)===0},z.prototype.inspect=function(){var e="";return this.length>0&&(e=this.toString("hex",0,50).match(/.{2}/g).join(" "),this.length>50&&(e+=" ... ")),"<Buffer "+e+">"},z.prototype.compare=function(e,t,n,s,r){if(!Tt(e))throw new TypeError("Argument must be a Buffer");if(t===void 0&&(t=0),n===void 0&&(n=e?e.length:0),s===void 0&&(s=0),r===void 0&&(r=this.length),t<0||n>e.length||s<0||r>this.length)throw new RangeError("out of range index");if(s>=r&&t>=n)return 0;if(s>=r)return-1;if(t>=n)return 1;if(this===e)return 0;for(var i=(r>>>=0)-(s>>>=0),o=(n>>>=0)-(t>>>=0),a=Math.min(i,o),l=this.slice(s,r),c=e.slice(t,n),d=0;d<a;++d)if(l[d]!==c[d]){i=l[d],o=c[d];break}return i<o?-1:o<i?1:0},z.prototype.includes=function(e,t,n){return this.indexOf(e,t,n)!==-1},z.prototype.indexOf=function(e,t,n){return bp(this,e,t,n,!0)},z.prototype.lastIndexOf=function(e,t,n){return bp(this,e,t,n,!1)},z.prototype.write=function(e,t,n,s){if(t===void 0)s="utf8",n=this.length,t=0;else if(n===void 0&&typeof t=="string")s=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(n)?(n|=0,s===void 0&&(s="utf8")):(s=n,n=void 0)}var r=this.length-t;if((n===void 0||n>r)&&(n=r),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");s||(s="utf8");for(var i=!1;;)switch(s){case"hex":return Z0(this,e,t,n);case"utf8":case"utf-8":return ew(this,e,t,n);case"ascii":return Ip(this,e,t,n);case"latin1":case"binary":return tw(this,e,t,n);case"base64":return nw(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return sw(this,e,t,n);default:if(i)throw new TypeError("Unknown encoding: "+s);s=(""+s).toLowerCase(),i=!0}},z.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};xp=4096;z.prototype.slice=function(e,t){var n,s=this.length;if((e=~~e)<0?(e+=s)<0&&(e=0):e>s&&(e=s),(t=t===void 0?s:~~t)<0?(t+=s)<0&&(t=0):t>s&&(t=s),t<e&&(t=e),z.TYPED_ARRAY_SUPPORT)(n=this.subarray(e,t)).__proto__=z.prototype;else{var r=t-e;n=new z(r,void 0);for(var i=0;i<r;++i)n[i]=this[i+e]}return n},z.prototype.readUIntLE=function(e,t,n){e|=0,t|=0,n||He(e,t,this.length);for(var s=this[e],r=1,i=0;++i<t&&(r*=256);)s+=this[e+i]*r;return s},z.prototype.readUIntBE=function(e,t,n){e|=0,t|=0,n||He(e,t,this.length);for(var s=this[e+--t],r=1;t>0&&(r*=256);)s+=this[e+--t]*r;return s},z.prototype.readUInt8=function(e,t){return t||He(e,1,this.length),this[e]},z.prototype.readUInt16LE=function(e,t){return t||He(e,2,this.length),this[e]|this[e+1]<<8},z.prototype.readUInt16BE=function(e,t){return t||He(e,2,this.length),this[e]<<8|this[e+1]},z.prototype.readUInt32LE=function(e,t){return t||He(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},z.prototype.readUInt32BE=function(e,t){return t||He(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},z.prototype.readIntLE=function(e,t,n){e|=0,t|=0,n||He(e,t,this.length);for(var s=this[e],r=1,i=0;++i<t&&(r*=256);)s+=this[e+i]*r;return s>=(r*=128)&&(s-=Math.pow(2,8*t)),s},z.prototype.readIntBE=function(e,t,n){e|=0,t|=0,n||He(e,t,this.length);for(var s=t,r=1,i=this[e+--s];s>0&&(r*=256);)i+=this[e+--s]*r;return i>=(r*=128)&&(i-=Math.pow(2,8*t)),i},z.prototype.readInt8=function(e,t){return t||He(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},z.prototype.readInt16LE=function(e,t){t||He(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},z.prototype.readInt16BE=function(e,t){t||He(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},z.prototype.readInt32LE=function(e,t){return t||He(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},z.prototype.readInt32BE=function(e,t){return t||He(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},z.prototype.readFloatLE=function(e,t){return t||He(e,4,this.length),Wi(this,e,!0,23,4)},z.prototype.readFloatBE=function(e,t){return t||He(e,4,this.length),Wi(this,e,!1,23,4)},z.prototype.readDoubleLE=function(e,t){return t||He(e,8,this.length),Wi(this,e,!0,52,8)},z.prototype.readDoubleBE=function(e,t){return t||He(e,8,this.length),Wi(this,e,!1,52,8)},z.prototype.writeUIntLE=function(e,t,n,s){e=+e,t|=0,n|=0,s||nt(this,e,t,n,Math.pow(2,8*n)-1,0);var r=1,i=0;for(this[t]=255&e;++i<n&&(r*=256);)this[t+i]=e/r&255;return t+n},z.prototype.writeUIntBE=function(e,t,n,s){e=+e,t|=0,n|=0,s||nt(this,e,t,n,Math.pow(2,8*n)-1,0);var r=n-1,i=1;for(this[t+r]=255&e;--r>=0&&(i*=256);)this[t+r]=e/i&255;return t+n},z.prototype.writeUInt8=function(e,t,n){return e=+e,t|=0,n||nt(this,e,t,1,255,0),z.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},z.prototype.writeUInt16LE=function(e,t,n){return e=+e,t|=0,n||nt(this,e,t,2,65535,0),z.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):qi(this,e,t,!0),t+2},z.prototype.writeUInt16BE=function(e,t,n){return e=+e,t|=0,n||nt(this,e,t,2,65535,0),z.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):qi(this,e,t,!1),t+2},z.prototype.writeUInt32LE=function(e,t,n){return e=+e,t|=0,n||nt(this,e,t,4,4294967295,0),z.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):Hi(this,e,t,!0),t+4},z.prototype.writeUInt32BE=function(e,t,n){return e=+e,t|=0,n||nt(this,e,t,4,4294967295,0),z.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):Hi(this,e,t,!1),t+4},z.prototype.writeIntLE=function(e,t,n,s){if(e=+e,t|=0,!s){var r=Math.pow(2,8*n-1);nt(this,e,t,n,r-1,-r)}var i=0,o=1,a=0;for(this[t]=255&e;++i<n&&(o*=256);)e<0&&a===0&&this[t+i-1]!==0&&(a=1),this[t+i]=(e/o|0)-a&255;return t+n},z.prototype.writeIntBE=function(e,t,n,s){if(e=+e,t|=0,!s){var r=Math.pow(2,8*n-1);nt(this,e,t,n,r-1,-r)}var i=n-1,o=1,a=0;for(this[t+i]=255&e;--i>=0&&(o*=256);)e<0&&a===0&&this[t+i+1]!==0&&(a=1),this[t+i]=(e/o|0)-a&255;return t+n},z.prototype.writeInt8=function(e,t,n){return e=+e,t|=0,n||nt(this,e,t,1,127,-128),z.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},z.prototype.writeInt16LE=function(e,t,n){return e=+e,t|=0,n||nt(this,e,t,2,32767,-32768),z.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):qi(this,e,t,!0),t+2},z.prototype.writeInt16BE=function(e,t,n){return e=+e,t|=0,n||nt(this,e,t,2,32767,-32768),z.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):qi(this,e,t,!1),t+2},z.prototype.writeInt32LE=function(e,t,n){return e=+e,t|=0,n||nt(this,e,t,4,2147483647,-2147483648),z.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):Hi(this,e,t,!0),t+4},z.prototype.writeInt32BE=function(e,t,n){return e=+e,t|=0,n||nt(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),z.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):Hi(this,e,t,!1),t+4},z.prototype.writeFloatLE=function(e,t,n){return vp(this,e,t,!0,n)},z.prototype.writeFloatBE=function(e,t,n){return vp(this,e,t,!1,n)},z.prototype.writeDoubleLE=function(e,t,n){return wp(this,e,t,!0,n)},z.prototype.writeDoubleBE=function(e,t,n){return wp(this,e,t,!1,n)},z.prototype.copy=function(e,t,n,s){if(n||(n=0),s||s===0||(s=this.length),t>=e.length&&(t=e.length),t||(t=0),s>0&&s<n&&(s=n),s===n||e.length===0||this.length===0)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(s<0)throw new RangeError("sourceEnd out of bounds");s>this.length&&(s=this.length),e.length-t<s-n&&(s=e.length-t+n);var r,i=s-n;if(this===e&&n<t&&t<s)for(r=i-1;r>=0;--r)e[r+t]=this[r+n];else if(i<1e3||!z.TYPED_ARRAY_SUPPORT)for(r=0;r<i;++r)e[r+t]=this[r+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+i),t);return i},z.prototype.fill=function(e,t,n,s){if(typeof e=="string"){if(typeof t=="string"?(s=t,t=0,n=this.length):typeof n=="string"&&(s=n,n=this.length),e.length===1){var r=e.charCodeAt(0);r<256&&(e=r)}if(s!==void 0&&typeof s!="string")throw new TypeError("encoding must be a string");if(typeof s=="string"&&!z.isEncoding(s))throw new TypeError("Unknown encoding: "+s)}else typeof e=="number"&&(e&=255);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;var i;if(t>>>=0,n=n===void 0?this.length:n>>>0,e||(e=0),typeof e=="number")for(i=t;i<n;++i)this[i]=e;else{var o=Tt(e)?e:Qi(new z(e,s).toString()),a=o.length;for(i=0;i<n-t;++i)this[i+t]=o[i%a]}return this};cw=/[^+\/0-9A-Za-z-_]/g;Ki=class e{constructor(t){this.bits=t instanceof e?t.bits.slice():[]}add(t){this.bits[t>>5]|=1<<(31&t)}has(t){return!!(this.bits[t>>5]&1<<(31&t))}},Gi=class e{constructor(t,n,s){this.start=t,this.end=n,this.original=s,this.intro="",this.outro="",this.content=s,this.storeName=!1,this.edited=!1,this.previous=null,this.next=null}appendLeft(t){this.outro+=t}appendRight(t){this.intro=this.intro+t}clone(){let t=new e(this.start,this.end,this.original);return t.intro=this.intro,t.outro=this.outro,t.content=this.content,t.storeName=this.storeName,t.edited=this.edited,t}contains(t){return this.start<t&&t<this.end}eachNext(t){let n=this;for(;n;)t(n),n=n.next}eachPrevious(t){let n=this;for(;n;)t(n),n=n.previous}edit(t,n,s){return this.content=t,s||(this.intro="",this.outro=""),this.storeName=n,this.edited=!0,this}prependLeft(t){this.outro=t+this.outro}prependRight(t){this.intro=t+this.intro}reset(){this.intro="",this.outro="",this.edited&&(this.content=this.original,this.storeName=!1,this.edited=!1)}split(t){let n=t-this.start,s=this.original.slice(0,n),r=this.original.slice(n);this.original=s;let i=new e(t,this.end,r);return i.outro=this.outro,this.outro="",this.end=t,this.edited?(i.edit("",!1),this.content=""):this.content=s,i.next=this.next,i.next&&(i.next.previous=i),i.previous=this,this.next=i,i}toString(){return this.intro+this.content+this.outro}trimEnd(t){if(this.outro=this.outro.replace(t,""),this.outro.length)return!0;let n=this.content.replace(t,"");return n.length?(n!==this.content&&(this.split(this.start+n.length).edit("",void 0,!0),this.edited&&this.edit(n,this.storeName,!0)),!0):(this.edit("",void 0,!0),this.intro=this.intro.replace(t,""),!!this.intro.length||void 0)}trimStart(t){if(this.intro=this.intro.replace(t,""),this.intro.length)return!0;let n=this.content.replace(t,"");if(n.length){if(n!==this.content){let s=this.split(this.end-n.length);this.edited&&s.edit(n,this.storeName,!0),this.edit("",void 0,!0)}return!0}return this.edit("",void 0,!0),this.outro=this.outro.replace(t,""),!!this.outro.length||void 0}};hw=dw(),cl=class{constructor(t){this.version=3,this.file=t.file,this.sources=t.sources,this.sourcesContent=t.sourcesContent,this.names=t.names,this.mappings=pp(t.mappings),t.x_google_ignoreList!==void 0&&(this.x_google_ignoreList=t.x_google_ignoreList),t.debugId!==void 0&&(this.debugId=t.debugId)}toString(){return JSON.stringify(this)}toUrl(){return"data:application/json;charset=utf-8;base64,"+hw(this.toString())}};fw=Object.prototype.toString;gw=/\w/,ul=class{constructor(t){this.hires=t,this.generatedCodeLine=0,this.generatedCodeColumn=0,this.raw=[],this.rawSegments=this.raw[this.generatedCodeLine]=[],this.pending=null}addEdit(t,n,s,r){if(n.length){let i=n.length-1,o=n.indexOf(`
`,0),a=-1;for(;o>=0&&i>o;){let c=[this.generatedCodeColumn,t,s.line,s.column];r>=0&&c.push(r),this.rawSegments.push(c),this.generatedCodeLine+=1,this.raw[this.generatedCodeLine]=this.rawSegments=[],this.generatedCodeColumn=0,a=o,o=n.indexOf(`
`,o+1)}let l=[this.generatedCodeColumn,t,s.line,s.column];r>=0&&l.push(r),this.rawSegments.push(l),this.advance(n.slice(a+1))}else this.pending&&(this.rawSegments.push(this.pending),this.advance(n));this.pending=null}addUneditedChunk(t,n,s,r,i){let o=n.start,a=!0,l=!1;for(;o<n.end;){if(s[o]===`
`)r.line+=1,r.column=0,this.generatedCodeLine+=1,this.raw[this.generatedCodeLine]=this.rawSegments=[],this.generatedCodeColumn=0,a=!0,l=!1;else{if(this.hires||a||i.has(o)){let c=[this.generatedCodeColumn,t,r.line,r.column];this.hires==="boundary"?gw.test(s[o])?l||(this.rawSegments.push(c),l=!0):(this.rawSegments.push(c),l=!1):this.rawSegments.push(c)}r.column+=1,this.generatedCodeColumn+=1,a=!1}o+=1}this.pending=null}advance(t){if(!t)return;let n=t.split(`
`);if(n.length>1){for(let s=0;s<n.length-1;s++)this.generatedCodeLine++,this.raw[this.generatedCodeLine]=this.rawSegments=[];this.generatedCodeColumn=0}this.generatedCodeColumn+=n[n.length-1].length}},rr=`
`,ms={insertLeft:!1,insertRight:!1,storeName:!1},Ji=class e{constructor(t,n={}){let s=new Gi(0,t.length,t);Object.defineProperties(this,{original:{writable:!0,value:t},outro:{writable:!0,value:""},intro:{writable:!0,value:""},firstChunk:{writable:!0,value:s},lastChunk:{writable:!0,value:s},lastSearchedChunk:{writable:!0,value:s},byStart:{writable:!0,value:{}},byEnd:{writable:!0,value:{}},filename:{writable:!0,value:n.filename},indentExclusionRanges:{writable:!0,value:n.indentExclusionRanges},sourcemapLocations:{writable:!0,value:new Ki},storedNames:{writable:!0,value:{}},indentStr:{writable:!0,value:void 0},ignoreList:{writable:!0,value:n.ignoreList},offset:{writable:!0,value:n.offset||0}}),this.byStart[0]=s,this.byEnd[t.length]=s}addSourcemapLocation(t){this.sourcemapLocations.add(t)}append(t){if(typeof t!="string")throw new TypeError("outro content must be a string");return this.outro+=t,this}appendLeft(t,n){if(t+=this.offset,typeof n!="string")throw new TypeError("inserted content must be a string");this._split(t);let s=this.byEnd[t];return s?s.appendLeft(n):this.intro+=n,this}appendRight(t,n){if(t+=this.offset,typeof n!="string")throw new TypeError("inserted content must be a string");this._split(t);let s=this.byStart[t];return s?s.appendRight(n):this.outro+=n,this}clone(){let t=new e(this.original,{filename:this.filename,offset:this.offset}),n=this.firstChunk,s=t.firstChunk=t.lastSearchedChunk=n.clone();for(;n;){t.byStart[s.start]=s,t.byEnd[s.end]=s;let r=n.next,i=r&&r.clone();i&&(s.next=i,i.previous=s,s=i),n=r}return t.lastChunk=s,this.indentExclusionRanges&&(t.indentExclusionRanges=this.indentExclusionRanges.slice()),t.sourcemapLocations=new Ki(this.sourcemapLocations),t.intro=this.intro,t.outro=this.outro,t}generateDecodedMap(t){t=t||{};let n=Object.keys(this.storedNames),s=new ul(t.hires),r=$p(this.original);return this.intro&&s.advance(this.intro),this.firstChunk.eachNext(i=>{let o=r(i.start);i.intro.length&&s.advance(i.intro),i.edited?s.addEdit(0,i.content,o,i.storeName?n.indexOf(i.original):-1):s.addUneditedChunk(0,i,this.original,o,this.sourcemapLocations),i.outro.length&&s.advance(i.outro)}),{file:t.file?t.file.split(/[/\\]/).pop():void 0,sources:[t.source?pw(t.file||"",t.source):t.file||""],sourcesContent:t.includeContent?[this.original]:void 0,names:n,mappings:s.raw,x_google_ignoreList:this.ignoreList?[0]:void 0}}generateMap(t){return new cl(this.generateDecodedMap(t))}_ensureindentStr(){this.indentStr===void 0&&(this.indentStr=function(t){let n=t.split(`
`),s=n.filter(o=>/^\t+/.test(o)),r=n.filter(o=>/^ {2,}/.test(o));if(s.length===0&&r.length===0)return null;if(s.length>=r.length)return"	";let i=r.reduce((o,a)=>{let l=/^ +/.exec(a)[0].length;return Math.min(l,o)},1/0);return new Array(i+1).join(" ")}(this.original))}_getRawIndentString(){return this._ensureindentStr(),this.indentStr}getIndentString(){return this._ensureindentStr(),this.indentStr===null?"	":this.indentStr}indent(t,n){let s=/^[^\r\n]/gm;if(mw(t)&&(n=t,t=void 0),t===void 0&&(this._ensureindentStr(),t=this.indentStr||"	"),t==="")return this;let r={};(n=n||{}).exclude&&(typeof n.exclude[0]=="number"?[n.exclude]:n.exclude).forEach(c=>{for(let d=c[0];d<c[1];d+=1)r[d]=!0});let i=n.indentStart!==!1,o=c=>i?`${t}${c}`:(i=!0,c);this.intro=this.intro.replace(s,o);let a=0,l=this.firstChunk;for(;l;){let c=l.end;if(l.edited)r[a]||(l.content=l.content.replace(s,o),l.content.length&&(i=l.content[l.content.length-1]===`
`));else for(a=l.start;a<c;){if(!r[a]){let d=this.original[a];d===`
`?i=!0:d!=="\r"&&i&&(i=!1,a===l.start||(this._splitChunk(l,a),l=l.next),l.prependRight(t))}a+=1}a=l.end,l=l.next}return this.outro=this.outro.replace(s,o),this}insert(){throw new Error("magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)")}insertLeft(t,n){return ms.insertLeft||(console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"),ms.insertLeft=!0),this.appendLeft(t,n)}insertRight(t,n){return ms.insertRight||(console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"),ms.insertRight=!0),this.prependRight(t,n)}move(t,n,s){if(t+=this.offset,n+=this.offset,(s+=this.offset)>=t&&s<=n)throw new Error("Cannot move a selection inside itself");this._split(t),this._split(n),this._split(s);let r=this.byStart[t],i=this.byEnd[n],o=r.previous,a=i.next,l=this.byStart[s];if(!l&&i===this.lastChunk)return this;let c=l?l.previous:this.lastChunk;return o&&(o.next=a),a&&(a.previous=o),c&&(c.next=r),l&&(l.previous=i),r.previous||(this.firstChunk=i.next),i.next||(this.lastChunk=r.previous,this.lastChunk.next=null),r.previous=c,i.next=l||null,c||(this.firstChunk=r),l||(this.lastChunk=i),this}overwrite(t,n,s,r){return r=r||{},this.update(t,n,s,{...r,overwrite:!r.contentOnly})}update(t,n,s,r){if(t+=this.offset,n+=this.offset,typeof s!="string")throw new TypeError("replacement content must be a string");if(this.original.length!==0){for(;t<0;)t+=this.original.length;for(;n<0;)n+=this.original.length}if(n>this.original.length)throw new Error("end is out of bounds");if(t===n)throw new Error("Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead");this._split(t),this._split(n),r===!0&&(ms.storeName||(console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"),ms.storeName=!0),r={storeName:!0});let i=r!==void 0&&r.storeName,o=r!==void 0&&r.overwrite;if(i){let c=this.original.slice(t,n);Object.defineProperty(this.storedNames,c,{writable:!0,value:!0,enumerable:!0})}let a=this.byStart[t],l=this.byEnd[n];if(a){let c=a;for(;c!==l;){if(c.next!==this.byStart[c.end])throw new Error("Cannot overwrite across a split point");c=c.next,c.edit("",!1)}a.edit(s,i,!o)}else{let c=new Gi(t,n,"").edit(s,i);l.next=c,c.previous=l}return this}prepend(t){if(typeof t!="string")throw new TypeError("outro content must be a string");return this.intro=t+this.intro,this}prependLeft(t,n){if(t+=this.offset,typeof n!="string")throw new TypeError("inserted content must be a string");this._split(t);let s=this.byEnd[t];return s?s.prependLeft(n):this.intro=n+this.intro,this}prependRight(t,n){if(t+=this.offset,typeof n!="string")throw new TypeError("inserted content must be a string");this._split(t);let s=this.byStart[t];return s?s.prependRight(n):this.outro=n+this.outro,this}remove(t,n){if(t+=this.offset,n+=this.offset,this.original.length!==0){for(;t<0;)t+=this.original.length;for(;n<0;)n+=this.original.length}if(t===n)return this;if(t<0||n>this.original.length)throw new Error("Character is out of bounds");if(t>n)throw new Error("end must be greater than start");this._split(t),this._split(n);let s=this.byStart[t];for(;s;)s.intro="",s.outro="",s.edit(""),s=n>s.end?this.byStart[s.end]:null;return this}reset(t,n){if(t+=this.offset,n+=this.offset,this.original.length!==0){for(;t<0;)t+=this.original.length;for(;n<0;)n+=this.original.length}if(t===n)return this;if(t<0||n>this.original.length)throw new Error("Character is out of bounds");if(t>n)throw new Error("end must be greater than start");this._split(t),this._split(n);let s=this.byStart[t];for(;s;)s.reset(),s=n>s.end?this.byStart[s.end]:null;return this}lastChar(){if(this.outro.length)return this.outro[this.outro.length-1];let t=this.lastChunk;do{if(t.outro.length)return t.outro[t.outro.length-1];if(t.content.length)return t.content[t.content.length-1];if(t.intro.length)return t.intro[t.intro.length-1]}while(t=t.previous);return this.intro.length?this.intro[this.intro.length-1]:""}lastLine(){let t=this.outro.lastIndexOf(rr);if(t!==-1)return this.outro.substr(t+1);let n=this.outro,s=this.lastChunk;do{if(s.outro.length>0){if(t=s.outro.lastIndexOf(rr),t!==-1)return s.outro.substr(t+1)+n;n=s.outro+n}if(s.content.length>0){if(t=s.content.lastIndexOf(rr),t!==-1)return s.content.substr(t+1)+n;n=s.content+n}if(s.intro.length>0){if(t=s.intro.lastIndexOf(rr),t!==-1)return s.intro.substr(t+1)+n;n=s.intro+n}}while(s=s.previous);return t=this.intro.lastIndexOf(rr),t!==-1?this.intro.substr(t+1)+n:this.intro+n}slice(t=0,n=this.original.length-this.offset){if(t+=this.offset,n+=this.offset,this.original.length!==0){for(;t<0;)t+=this.original.length;for(;n<0;)n+=this.original.length}let s="",r=this.firstChunk;for(;r&&(r.start>t||r.end<=t);){if(r.start<n&&r.end>=n)return s;r=r.next}if(r&&r.edited&&r.start!==t)throw new Error(`Cannot use replaced character ${t} as slice start anchor.`);let i=r;for(;r;){!r.intro||i===r&&r.start!==t||(s+=r.intro);let o=r.start<n&&r.end>=n;if(o&&r.edited&&r.end!==n)throw new Error(`Cannot use replaced character ${n} as slice end anchor.`);let a=i===r?t-r.start:0,l=o?r.content.length+n-r.end:r.content.length;if(s+=r.content.slice(a,l),!r.outro||o&&r.end!==n||(s+=r.outro),o)break;r=r.next}return s}snip(t,n){let s=this.clone();return s.remove(0,t),s.remove(n,s.original.length),s}_split(t){if(this.byStart[t]||this.byEnd[t])return;let n=this.lastSearchedChunk,s=t>n.end;for(;n;){if(n.contains(t))return this._splitChunk(n,t);n=s?this.byStart[n.end]:this.byEnd[n.start]}}_splitChunk(t,n){if(t.edited&&t.content.length){let r=$p(this.original)(n);throw new Error(`Cannot split a chunk that has already been edited (${r.line}:${r.column} \u2013 "${t.original}")`)}let s=t.split(n);return this.byEnd[n]=t,this.byStart[n]=s,this.byEnd[s.end]=s,t===this.lastChunk&&(this.lastChunk=s),this.lastSearchedChunk=t,!0}toString(){let t=this.intro,n=this.firstChunk;for(;n;)t+=n.toString(),n=n.next;return t+this.outro}isEmpty(){let t=this.firstChunk;do if(t.intro.length&&t.intro.trim()||t.content.length&&t.content.trim()||t.outro.length&&t.outro.trim())return!1;while(t=t.next);return!0}length(){let t=this.firstChunk,n=0;do n+=t.intro.length+t.content.length+t.outro.length;while(t=t.next);return n}trimLines(){return this.trim("[\\r\\n]")}trim(t){return this.trimStart(t).trimEnd(t)}trimEndAborted(t){let n=new RegExp((t||"\\s")+"+$");if(this.outro=this.outro.replace(n,""),this.outro.length)return!0;let s=this.lastChunk;do{let r=s.end,i=s.trimEnd(n);if(s.end!==r&&(this.lastChunk===s&&(this.lastChunk=s.next),this.byEnd[s.end]=s,this.byStart[s.next.start]=s.next,this.byEnd[s.next.end]=s.next),i)return!0;s=s.previous}while(s);return!1}trimEnd(t){return this.trimEndAborted(t),this}trimStartAborted(t){let n=new RegExp("^"+(t||"\\s")+"+");if(this.intro=this.intro.replace(n,""),this.intro.length)return!0;let s=this.firstChunk;do{let r=s.end,i=s.trimStart(n);if(s.end!==r&&(s===this.lastChunk&&(this.lastChunk=s.next),this.byEnd[s.end]=s,this.byStart[s.next.start]=s.next,this.byEnd[s.next.end]=s.next),i)return!0;s=s.next}while(s);return!1}trimStart(t){return this.trimStartAborted(t),this}hasChanged(){return this.original!==this.toString()}_replaceRegexp(t,n){function s(r,i){return typeof n=="string"?n.replace(/\$(\$|&|\d+)/g,(o,a)=>a==="$"?"$":a==="&"?r[0]:+a<r.length?r[+a]:`$${a}`):n(...r,r.index,i,r.groups)}if(t.global)(function(r,i){let o,a=[];for(;o=r.exec(i);)a.push(o);return a})(t,this.original).forEach(r=>{if(r.index!=null){let i=s(r,this.original);i!==r[0]&&this.overwrite(r.index,r.index+r[0].length,i)}});else{let r=this.original.match(t);if(r&&r.index!=null){let i=s(r,this.original);i!==r[0]&&this.overwrite(r.index,r.index+r[0].length,i)}}return this}_replaceString(t,n){let{original:s}=this,r=s.indexOf(t);return r!==-1&&this.overwrite(r,r+t.length,n),this}replace(t,n){return typeof t=="string"?this._replaceString(t,n):this._replaceRegexp(t,n)}_replaceAllString(t,n){let{original:s}=this,r=t.length;for(let i=s.indexOf(t);i!==-1;i=s.indexOf(t,i+r))s.slice(i,i+r)!==n&&this.overwrite(i,i+r,n);return this}replaceAll(t,n){if(typeof t=="string")return this._replaceAllString(t,n);if(!t.global)throw new TypeError("MagicString.prototype.replaceAll called with a non-global RegExp argument");return this._replaceRegexp(t,n)}}});function bs(e,t,n){if(e==="")return;let s=e.length,r=0,i=!1,o=0;for(let a=0;a<s;a++)switch(e[a]){case t:i||(i=!0,o=a),r++;break;case n:if(--r,r<0)return;if(r===0)return[e.slice(o,a+1),e.slice(a+1),e.slice(0,o)]}}function ir(e,t,n,s){if(e===""||(ps(s)&&(s=[s]),s.length===0))return;let r=e.length,i=0;for(let o=0;o<r;o++)switch(e[o]){case t:i++;break;case n:if(--i<0)return;break;default:for(let a of s){let l=a.length;if(l&&a===e.slice(o,o+l)&&i===0)return o===0||o===r-l?void 0:[e.slice(0,o),e.slice(o+l)]}}return[e,""]}function gs(e,t,n,s="(",r=")"){n=n??10;let i=[],o=0;for(;e!=="";){if(++o>n)return;let a=ir(e,s,r,t);if(!a)return;let[l,c]=a;i.push(l),e=c}if(i.length>0)return i}function bl(e){return!!e&&(bw.some(t=>e.includes(t))||yw.some(t=>e.includes(t))||xw.some(t=>e.includes(t)))}function Wn(e=""){let t=function(o){if(!o)return;let a=ww(o);if(a!=null||(a=function(l){let c={rebeccapurple:[102,51,153,1]}[l];if(c!=null)return{type:"rgb",components:c.slice(0,3),alpha:c[3]}}(o),a!=null)||(a=function(l){let c=l.match(/^(rgb|rgba|hsl|hsla)\((.+)\)$/i);if(!c)return;let[,d,h]=c,f=gs(h,",",5);if(f){if([3,4].includes(f.length))return{type:d,components:f.slice(0,3),alpha:f[3]};if(f.length!==1)return!1}}(o),a!=null)||(a=function(l){let c=l.match(kw);if(!c)return;let[,d,h]=c,f=Fp(`${d} ${h}`);if(f){let{alpha:m,components:[g,...b]}=f;return{type:g,components:b,alpha:m}}}(o),a!=null)||(a=function(l){let c=l.match(/^color\((.+)\)$/);if(!c)return;let d=Fp(c[1]);if(d){let{alpha:h,components:[f,...m]}=d;return{type:f,components:m,alpha:h}}}(o),a!=null))return a}(e);if(t==null||t===!1)return;let{type:n,components:s,alpha:r}=t,i=n.toLowerCase();return s.length===0||ml.includes(i)&&![1,3].includes(s.length)?void 0:{type:i,components:s.map(o=>typeof o=="string"?o.trim():o),alpha:typeof r=="string"?r.trim():r}}function Zi(e,t){if(typeof e=="string")return e.replace(gl,`${t??1}`);let{components:n}=e,{alpha:s,type:r}=e;return s=t??s,r=r.toLowerCase(),["hsla","rgba"].includes(r)?`${r}(${n.join(", ")}${s==null?"":`, ${s}`})`:(s=s==null?"":` / ${s}`,ml.includes(r)?`${r}(${n.join(" ")}${s})`:`color(${r} ${n.join(" ")}${s})`)}function ww(e){let[,t]=e.match(/^#([\da-f]+)$/i)||[];if(t)switch(t.length){case 3:case 4:{let n=Array.from(t,s=>Number.parseInt(s,16)).map(s=>s<<4|s);return{type:"rgb",components:n.slice(0,3),alpha:t.length===3?void 0:Math.round(n[3]/255*100)/100}}case 6:case 8:{let n=Number.parseInt(t,16);return{type:"rgb",components:t.length===6?[n>>16&255,n>>8&255,255&n]:[n>>24&255,n>>16&255,n>>8&255],alpha:t.length===6?void 0:Math.round((255&n)/255*100)/100}}}}function Fp(e){let t=gs(e," ");if(!t)return;let n=t.length;if(t[n-2]==="/")return{components:t.slice(0,n-2),alpha:t[n-1]};if(t[n-2]!=null&&(t[n-2].endsWith("/")||t[n-1].startsWith("/"))){let i=t.splice(n-2);t.push(i.join(" ")),--n}let s=gs(t[n-1],"/",2);if(!s)return;if(s.length===1||s[s.length-1]==="")return{components:t};let r=s.pop();return t[n-1]=s.join("/"),{components:t,alpha:r}}function zp(e){return e.includes("theme(")&&e.includes(")")}function Up(e,t,n=!0){let s=Array.from(e.toString().matchAll($w));if(!s.length)return e;let r=new Ji(e);for(let i of s){let o=i[2];if(!o)throw new Error("theme() expect exact one argument, but got 0");let a=Sw(o,t,n);a&&r.overwrite(i.index,i.index+i[0].length,a)}return r.toString()}function Sw(e,t,n=!0){let[s,r]=e.split("/"),i=s.trim().split(".").reduce((o,a)=>o?.[a],t);if(typeof i=="object"&&(i=i.DEFAULT),typeof i=="string"){if(r){let o=Wn(i);o&&(i=Zi(o,r))}return i}if(n)throw new Error(`theme of "${e}" did not found`)}function yl(e){let t=e.match(/^-?\d+\.?\d*/)?.[0]||"",n=e.slice(t.length);if(n==="px"){let s=Number.parseFloat(t)-.1;return Number.isNaN(s)?e:`${s}${n}`}return`calc(${e} - 0.1px)`}function Np(e){let t=function(s){let r=this.__options?.sequence||[];this.__options.sequence=[];for(let i of r){let o=e[i](s);if(o!=null)return o}};function n(s,r){return s.__options||(s.__options={sequence:[]}),s.__options.sequence.push(r),s}for(let s of Object.keys(e))Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get(){return n(this,s)}});return t}function Cw(e,t,n,s){let{h:r,variantGetBracket:i}=s,o=new RegExp(`^(${fs(t)}:)(\\S+)${fs(n)}\\1`),a,l,c,d;return{name:`pseudo:${e}`,match(h,f){if(a&&l&&c||(a=new RegExp(`(?:${f.generator.config.separators.join("|")})`),l=new RegExp(`^${e}-(?:(?:(${Bn})-)?(${pl}))(?:(/[\\w-]+))?(?:${f.generator.config.separators.join("|")})`),c=new RegExp(`^${e}-(?:(?:(${Bn})-)?(${fl}))(?:(/[\\w-]+))?(?:${f.generator.config.separators.filter(D=>D!=="-").join("|")})`),d=new RegExp(`^${e}-(?:(${Bn})-)?\\[(.+)\\](?:(/[\\w-]+))?(?:${f.generator.config.separators.filter(D=>D!=="-").join("|")})`)),!h.startsWith(e))return;let m=(D=>{let M=i(`${e}-`,D,[]);if(!M)return;let[K,ee]=M,Y=r.bracket(K);if(Y==null)return;let A=ee.split(a,1)?.[0]??"",C=`${t}${Un(A)}`;return[A,D.slice(D.length-(ee.length-A.length-1)),Y.includes("&")?Y.replace(/&/g,C):`${C}${Y}`]})(h)||(D=>{let M=D.match(l)||D.match(c);if(!M)return;let[K,ee,Y]=M,A=M[3]??"",C=ys[Y]||xs[Y]||`:${Y}`;return ee&&(C=`:${ee}(${C})`),[A,D.slice(K.length),`${t}${Un(A)}${C}`,Y]})(h)||(D=>{let M=D.match(d);if(!M)return;let[K,ee,Y]=M,A=M[3]??"",C=`:${ee}(${Y})`;return[A,D.slice(K.length),`${t}${Un(A)}${C}`]})(h);if(!m)return;let[g,b,_,R=""]=m;return{matcher:b,handle:(D,M)=>M({...D,prefix:`${_}${n}${D.prefix}`.replace(o,"$1$2:"),sort:Bp.indexOf(R)??Wp.indexOf(R)})}},multiPass:!0}}function Hp(e){let{h:t}=e,n,s,r;return[{name:"pseudo",match(i,o){n&&s||(n=new RegExp(`^(${Op})(?:-(\\d+|\\[\\w+\\]))?(?:${o.generator.config.separators.join("|")})`),s=new RegExp(`^(${Lp})(?:${o.generator.config.separators.filter(l=>l!=="-").join("|")})`));let a=i.match(n)||i.match(s);if(a){let l=ys[a[1]]||xs[a[1]]||`:${a[1]}`;if(a[2]){let d;d=a[2].startsWith("[")&&a[2].endsWith("]")?t.bracket(a[2]):a[2],d&&(l=l.replace(Vp,d))}let c=Bp.indexOf(a[1]);return c===-1&&(c=Wp.indexOf(a[1])),c===-1&&(c=void 0),{matcher:i.slice(a[0].length),handle:(d,h)=>{let f=l.includes("::")&&!Aw.includes(l)?{pseudo:`${d.pseudo}${l}`}:{selector:`${d.selector}${l}`};return h({...d,...f,sort:c,noMerge:!0})}}}},multiPass:!0,autocomplete:`(${Op}|${Lp}):`},{name:"pseudo:multi",match(i,o){r||(r=new RegExp(`^(${Dp})(?:${o.generator.config.separators.join("|")})`));let a=i.match(r);if(a)return qp[a[1]].map(l=>({matcher:i.slice(a[0].length),handle:(c,d)=>d({...c,pseudo:`${c.pseudo}${l}`})}))},multiPass:!1,autocomplete:`(${Dp}):`}]}function Yp(e){let{getBracket:t,h:n}=e,s,r,i;return{match(o,a){s&&r||(s=new RegExp(`^(${Bn})-(${pl})(?:${a.generator.config.separators.join("|")})`),r=new RegExp(`^(${Bn})-(${fl})(?:${a.generator.config.separators.filter(c=>c!=="-").join("|")})`),i=new RegExp(`^(${Bn})-(\\[.+\\])(?:${a.generator.config.separators.filter(c=>c!=="-").join("|")})`));let l=o.match(s)||o.match(r)||o.match(i);if(l){let c=l[1],d=t(l[2],"[","]")?n.bracket(l[2]):ys[l[2]]||xs[l[2]]||`:${l[2]}`;return{matcher:o.slice(l[0].length),selector:h=>`${h}:${c}(${d})`}}},multiPass:!0,autocomplete:`(${Bn})-(${pl}|${fl}):`}}function Qp(e,t){let n=!!e?.attributifyPseudo,s=e?.prefix??"";s=(Array.isArray(s)?s:[s]).filter(Boolean)[0]??"";let r=(i,o)=>Cw(i,n?`[${s}${i}=""]`:`.${s}${i}`,o,t);return[r("group"," "),r("peer","~"),r("parent",">"),r("previous","+")]}function Kp(){return{match(e){let t=e.match(Ew);if(t){let n=`part(${t[2]})`;return{matcher:e.slice(t[1].length),selector:s=>`${s}::${n}`}}},multiPass:!0}}function dt(e,t,n={}){let s;return{name:e,match(r,i){s||(s=new RegExp(`^${fs(e)}(?:${i.generator.config.separators.join("|")})`));let o=r.match(s);if(o){let a=r.slice(o[0].length),l=Yt(t).map(c=>({matcher:a,handle:(d,h)=>h({...d,...c(d)}),...n}));return l.length===1?l[0]:l}},autocomplete:`${e}:`}}function Xe(e,t){let n;return{name:e,match(s,r){n||(n=new RegExp(`^${fs(e)}(?:${r.generator.config.separators.join("|")})`));let i=s.match(n);if(i)return{matcher:s.slice(i[0].length),handle:(o,a)=>a({...o,parent:`${o.parent?`${o.parent} $$ `:""}${t}`})}},autocomplete:`${e}:`}}function hn(e,t,n){if(t.startsWith(`${e}[`)){let[s,r]=bs(t.slice(e.length),"[","]")??[];if(s&&r){for(let i of n)if(r.startsWith(i))return[s,r.slice(i.length),i];return[s,r,""]}}}function ot(e,t,n){for(let s of Yt(e))if(t.startsWith(s)){let r=hn(s,t,n);if(r){let[i="",o=r[1]]=ot("/",r[1],n)??[];return[r[0],o,i]}for(let i of n.filter(o=>o!=="/")){let o=t.indexOf(i,s.length);if(o!==-1){let a=t.indexOf("/",s.length),l=a===-1||o<=a;return[t.slice(s.length,l?o:a),t.slice(o+i.length),l?"":t.slice(a+1,o)]}}}}var ml,bw,yw,xw,vw,gl,kw,$w,Vp,ys,Bp,xs,Wp,_w,qp,pl,fl,Bn,Dp,Aw,Op,Lp,Ew,Gp=y(()=>{Oi();jp();ml=["hsl","hsla","hwb","lab","lch","oklab","oklch","rgb","rgba"],bw=["srgb","srgb-linear","display-p3","a98-rgb","prophoto-rgb","rec2020","lab","oklab","xyz","xyz-d50","xyz-d65"],yw=["hsl","hwb","lch","oklch"],xw=["shorter","longer","increasing","decreasing"],vw=["%alpha","<alpha-value>"],gl=new RegExp(vw.map(e=>fs(e)).join("|"),"g");kw=new RegExp(`^(${ml.join("|")})\\((.+)\\)$`,"i");$w=/theme\(\s*(['"])?(.*?)\1?\s*\)/g;Vp="__pseudo_placeholder__",ys=Object.fromEntries([["first-letter","::first-letter"],["first-line","::first-line"],"any-link","link","visited","target",["open","[open]"],"default","checked","indeterminate","placeholder-shown","autofill","optional","required","valid","invalid","user-valid","user-invalid","in-range","out-of-range","read-only","read-write","empty","focus-within","hover","focus","focus-visible","active","enabled","disabled","popover-open","root","empty",["even-of-type",":nth-of-type(even)"],["even",":nth-child(even)"],["odd-of-type",":nth-of-type(odd)"],["odd",":nth-child(odd)"],["nth",`:nth-child(${Vp})`],"first-of-type",["first",":first-child"],"last-of-type",["last",":last-child"],"only-child","only-of-type",["backdrop-element","::backdrop"],["placeholder","::placeholder"],["before","::before"],["after","::after"],["file","::file-selector-button"]].map(e=>Array.isArray(e)?e:[e,`:${e}`])),Bp=Object.keys(ys),xs=Object.fromEntries([["backdrop","::backdrop"]].map(e=>Array.isArray(e)?e:[e,`:${e}`])),Wp=Object.keys(xs),_w=["not","is","where","has"],qp=Object.fromEntries([["selection",["::selection"," *::selection"]],["marker",["::marker"," *::marker"]]]),pl=Object.entries(ys).filter(([,e])=>!e.startsWith("::")).map(([e])=>e).sort((e,t)=>t.length-e.length).join("|"),fl=Object.entries(xs).filter(([,e])=>!e.startsWith("::")).map(([e])=>e).sort((e,t)=>t.length-e.length).join("|"),Bn=_w.join("|"),Dp=Object.keys(qp).sort((e,t)=>t.length-e.length).join("|"),Aw=["::-webkit-resizer","::-webkit-scrollbar","::-webkit-scrollbar-button","::-webkit-scrollbar-corner","::-webkit-scrollbar-thumb","::-webkit-scrollbar-track","::-webkit-scrollbar-track-piece","::file-selector-button"],Op=Object.entries(ys).map(([e])=>e).sort((e,t)=>t.length-e.length).join("|"),Lp=Object.entries(xs).map(([e])=>e).sort((e,t)=>t.length-e.length).join("|");Ew=/(part-\[(.+)\]:)(.+)/});function vt(e){return+e.toFixed(10)}function tf(e){if(!Iw.test(e))return;let t=Number.parseFloat(e);return Number.isNaN(t)?void 0:vt(t)}function qn(e,t){if(e&&e.startsWith("[")&&e.endsWith("]")){let n,s,r=e.match(jl);if(r){if(t){if(r[1]!==t)return}else s=r[1];n=e.slice(r[0].length,-1)}else n=e.slice(1,-1);if(!n||n==='=""')return;if(n.startsWith("--")){let[o,a]=n.slice(2).split(",");n=`var(--${Un(o)}${a?`, ${a}`:""})`}let i=0;for(let o of n)if(o==="[")i+=1;else if(o==="]"&&(i-=1,i<0))return;if(i)return;switch(s){case"string":return n.replace(/(^|[^\\])_/g,"$1 ").replace(/\\_/g,"_");case"quoted":return n.replace(/(^|[^\\])_/g,"$1 ").replace(/\\_/g,"_").replace(/(["\\])/g,"\\$1").replace(/^(.+)$/,'"$1"')}return n.replace(/(url\(.*?\))/g,o=>o.replace(/_/g,"\\_")).replace(/(^|[^\\])_/g,"$1 ").replace(/\\_/g,"_").replace(/(?:calc|clamp|max|min)\((.*)/g,o=>{let a=[];return o.replace(/var\((--.+?)[,)]/g,(l,c)=>(a.push(c),l.replace(c,"--un-calc"))).replace(/(-?\d*\.?\d(?!-\d.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g,"$1 $2 ").replace(/--un-calc/g,()=>a.shift())})}}function lt(e,t){let n=k.number(e)??t;if(n!=null){let s=Number(n);return String(n).endsWith("%")&&(s=Number(String(n).slice(0,-1))/100),s}}function De(e){function t(n){let s=n.match(hr);if(s){let[,r,i]=s,o=Number.parseFloat(r);if(!Number.isNaN(o))return[o,i]}return[void 0,void 0]}return([n,s,r],{theme:i})=>{if(r!=null&&s!=null){let o=function(c){let d,h;if(c.spacing?.DEFAULT){let[f,m]=t(c.spacing.DEFAULT);f!=null&&m!=null&&(d=f,h=m)}return Object.entries(c.spacing??{}).reduce((f,[m,g])=>{let[b,_]=t(g);return f[m]=b!=null&&_!=null&&_===h?b/d:g,f},{})}(i),a,l=r.startsWith("-");if(l&&(r=r.slice(1)),a=lt(r,o[r]),a!=null)return Number.isNaN(a)?(fe("spacing",r),at[s].map(c=>[`${e}${c}`,l?`calc(var(--spacing-${r} * -1)`:`var(--spacing-${r})`])):(fe("spacing"),at[s].map(c=>[`${e}${c}`,`calc(var(--spacing) * ${l?"-":""}${a})`]));if(a=k.bracket.cssvar.global.auto.fraction.rem(l?`-${r}`:r),a!=null)return at[s].map(c=>[`${e}${c}`,a])}}}function lo(e,t){let n,[s,...r]=gs(e,["/",":"],3)??[];if(s!=null){let b=(s.match(jl)??[])[1];b!=null&&b!=="color"||(n=[s,...r])}if(!n)return;let i,[o,a,l]=n;bl(a)||bl(k.bracket(a??""))?l=a:i=a;let c=o.replace(/([a-z])(\d)(?![-_a-z])/g,"$1-$2").split(/-/g),[d]=c;if(!d)return;let h=nf(t,c);if(!h&&c.length>=2){let b=c.at(-1),_=c.at(-2);/^\d+$/.test(b)&&(h=nf(t,c.slice(0,-2).concat([`${_}${b}`])))}let{no:f,keys:m,color:g}=h??{};if(!g){let b=k.bracketOfColor(o),_=b||o;if(k.numberWithUnit(_))return;/^#[\da-f]+$/i.test(_)?g=_:/^hex-[\da-fA-F]+$/.test(_)?g=`#${_.slice(4)}`:o.startsWith("$")&&(g=k.cssvar(o)),g=g||b}return{opacity:i,modifier:l&&k.bracket.cssvar(l)||l,name:d,no:f,color:g??ao[d],alpha:k.bracket.cssvar.percent(i??""),keys:m,get cssColor(){return Wn(this.color)}}}function nf(e,t){let n,s,r,i=io(e,"colors",t);if(typeof i=="object"?"DEFAULT"in i&&(n=i.DEFAULT,s="DEFAULT",r=[...t,s]):typeof i=="string"&&(n=i,r=t,s=t.at(-1)),n)return{color:n,no:s,keys:r}}function io(e,t,n){return function s(r,i){if(r&&typeof r=="object"){if(i.length===0)return r;for(let o=i.length;o>0;o--){let a=i.slice(0,o).join("-");if(a in r){let l=r[a];return o===i.length?l:s(l,i.slice(o))}}}}(e[t],n)}function Ff(e,t,n,s){if(!e)return;let{color:r,keys:i,alpha:o,modifier:a}=e,l=s?.generator.config.envMode==="dev"&&r?` /* ${r} */`:"",c={};if(r){let d=[c];if(Object.values(ao).includes(r))c[t]=r;else{let h=`--un-${n}-opacity`,f=i?Oe("colors",i):r,m=a??(i?"in srgb":"in oklab");m.startsWith("in ")||m.startsWith("var(")||(m=`in ${m}`),c[t]=`color-mix(${m}, ${f} ${o??`var(${h})`}, transparent)${l}`,d.push(Z(h,{syntax:"<percentage>",initialValue:"100%"})),i&&(fe("colors",i),a||d.push({[dn.parent]:"@supports (color: color-mix(in lab, red, red))",[dn.noMerge]:!0,[dn.shortcutsNoMerge]:!0,[t]:`color-mix(in oklab, ${f} ${o??`var(${h})`}, transparent)${l}`})),s?.theme&&uo(r,s.theme)}return d}}function ze(e,t){return([,n],s)=>{let r=lo(n??"",s.theme);if(r)return Ff(r,e,t,s)}}function Fl(e,t){let n=[];e=Yt(e);for(let s=0;s<e.length;s++){let r=gs(e[s]," ",6);if(!r||r.length<3)return e;let i=!1,o=r.indexOf("inset");o!==-1&&(r.splice(o,1),i=!0);let a="",l=r.at(-1);if(Wn(r.at(0))){let c=Wn(r.shift());c&&(a=`, ${Zi(c)}`)}else if(Wn(l)){let c=Wn(r.pop());c&&(a=`, ${Zi(c)}`)}else l&&jf.test(l)&&(a=`, ${r.pop()}`);n.push(`${i?"inset ":""}${r.join(" ")} var(${t}${a})`)}return n}function pr(e,t){return e!=null&&!!lo(e,t)?.color}function co({theme:e,generator:t},n="breakpoint"){let s=t?.userConfig?.theme?.[n]||e[n];if(!s)return;if(xl.has(e))return xl.get(e);let r=Object.entries(s).sort((i,o)=>Number.parseInt(i[1].replace(sf,""))-Number.parseInt(o[1].replace(sf,""))).map(([i,o])=>({point:i,size:o}));return xl.set(e,r),r}function ge(e,t){return Le.map(n=>[`${e}-${n}`,{[t??e]:n}])}function Z(e,t={}){let{syntax:n="*",inherits:s=!1,initialValue:r}=t,i={[dn.shortcutsNoMerge]:!0,[dn.noMerge]:!0,[dn.variants]:()=>[{parent:"",layer:"properties",selector:()=>`@property ${e}`}],syntax:JSON.stringify(n),inherits:s?"true":"false"};return r!=null&&(i["initial-value"]=r),function(o,a){Ss.has(o)||Ss.set(o,a)}(e,r?String(r):"initial"),i}function fr(e){return e!=null&&Ml.test(e)}function El(e){return e.replace(/(?:^|\B)([A-Z])/g,"-$1").toLowerCase()}function Df(e,t=!1){return t?e.trim():e.trim().replace(/\s+/g," ").replace(/\/\*[\s\S]*?\*\//g,"")}function fe(e,t="DEFAULT"){let n=`${e}:${Yt(t).join("-")}`;$s.has(n)||$s.add(n)}function Oe(e,t){return`var(--${e}-${Yt(t).join("-")})`}function uo(e,t){if(e.startsWith("var(")){let n=e.match(/var\(--([\w-]+)(?:,.*)?\)/)?.[1];if(n){let[s,...r]=n.split("-"),i=io(t,s,r);typeof i=="string"&&(fe(s,r),uo(i,t))}}}function Mw({important:e}){return e==null||e===!1?[]:[e===!0?t=>{t.layer!=="properties"&&t.entries.forEach(n=>{n[1]==null||String(n[1]).endsWith("!important")||(n[1]+=" !important")})}:t=>{var n;t.selector.startsWith(e)||(t.selector=`${e} ${n=t.selector,n.startsWith(":is(")&&n.endsWith(")")?n:n.includes("::")?n.replace(/(.*?)((?:\s\*)?::.*)/,":is($1)$2"):`:is(${n})`}`)}]}function jw({variablePrefix:e}){return e!=="un-"?[t=>{t.entries.forEach(n=>{n[0]=n[0].replace(/^--un-/,`--${e}`),typeof n[1]=="string"&&(n[1]=n[1].replace(/var\(--un-/g,`var(--${e}`))})}]:[]}function Fw(e){return[Mw,jw].flatMap(t=>t(e))}function vs(e){return{name:`${e}-aria`,match(t,n){let s=ot(`${e}-aria-`,t,n.generator.config.separators);if(s){let[r,i,o]=s,a=k.bracket(r)??n.theme.aria?.[r]??"";if(a){let l={group:`&:is(:where(.group${o?`\\/${o}`:""})[aria-${a}] *)`,peer:`&:is(:where(.peer${o?`\\/${o}`:""})[aria-${a}] ~ *)`,previous:`:where(*[aria-${a}] + &)`,parent:`:where(*[aria-${a}] > &)`,has:`&:has(*[aria-${a}])`,in:`:where(*[aria-${a}]) &`};return{matcher:i,handle:(c,d)=>d({...c,parent:`${c.parent?`${c.parent} $$ `:""}${c.selector}`,selector:l[e]})}}}},multiPass:!0}}function Lw(){let e={};return{name:"breakpoints",match(t,n){if(rf.test(t)){let r=t.match(rf);return{matcher:t.replace(r[0],""),handle:(i,o)=>o({...i,parent:`${i.parent?`${i.parent} $$ `:""}@media (${r[1]}-width: ${r[2]})`})}}let s=(co(n)??[]).map(({point:r,size:i},o)=>[r,i,o]);for(let[r,i,o]of s){e[r]||(e[r]=new RegExp(`^((?:([al]t-|[<~]|max-))?${r}(?:${n.generator.config.separators.join("|")}))`));let a=t.match(e[r]);if(!a)continue;let[,l]=a,c=t.slice(l.length);if(c==="container")continue;let d=l.startsWith("lt-")||l.startsWith("<")||l.startsWith("max-"),h=l.startsWith("at-")||l.startsWith("~"),f=3e3;return d?(f-=o+1,{matcher:c,handle:(m,g)=>g({...m,parent:`${m.parent?`${m.parent} $$ `:""}@media (max-width: ${yl(i)})`,parentOrder:f})}):(f+=o+1,h&&o<s.length-1?{matcher:c,handle:(m,g)=>g({...m,parent:`${m.parent?`${m.parent} $$ `:""}@media (min-width: ${i}) and (max-width: ${yl(s[o+1][1])})`,parentOrder:f})}:{matcher:c,handle:(m,g)=>g({...m,parent:`${m.parent?`${m.parent} $$ `:""}@media (min-width: ${i})`,parentOrder:f})})}},multiPass:!0,autocomplete:"(at-|lt-|max-|)$breakpoint:"}}function or(e,t){return{name:`combinator:${e}`,match(n,s){if(!n.startsWith(e))return;let r=s.generator.config.separators,i=hn(`${e}-`,n,r);if(!i){for(let a of r)if(n.startsWith(`${e}${a}`)){i=["",n.slice(e.length+a.length)];break}if(!i)return}let o=k.bracket(i[0])??"";return o===""&&(o="*"),{matcher:i[1],selector:a=>`${a}${t}${o}`}},multiPass:!0}}function Bw(e={}){if(e?.dark==="class"||typeof e.dark=="object"){let{dark:t=".dark",light:n=".light"}=typeof e.dark=="string"?{}:e.dark;return[dt("dark",s=>({prefix:`${t} $$ ${s.prefix}`})),dt("light",s=>({prefix:`${n} $$ ${s.prefix}`}))]}return[Xe("dark","@media (prefers-color-scheme: dark)"),Xe("light","@media (prefers-color-scheme: light)")]}function ws(e){return{name:`${e}-data`,match(t,n){let s=ot(`${e}-data-`,t,n.generator.config.separators);if(s){let[r,i,o]=s,a=k.bracket(r)??n.theme.data?.[r]??"";if(a){let l={group:`&:is(:where(.group${o?`\\/${o}`:""})[data-${a}] *)`,peer:`&:is(:where(.peer${o?`\\/${o}`:""})[data-${a}] ~ *)`,previous:`:where(*[data-${a}] + &)`,parent:`:where(*[data-${a}] > &)`,has:`&:has(*[data-${a}])`,in:`:where(*[data-${a}]) &`};return{matcher:i,handle:(c,d)=>d({...c,parent:`${c.parent?`${c.parent} $$ `:""}${c.selector}`,selector:l[e]})}}}},multiPass:!0}}function Qw(){let e;return{name:"important",match(t,n){let s;e||(e=new RegExp(`^(important(?:${n.generator.config.separators.join("|")})|!)`));let r=t.match(e);if(r?s=t.slice(r[0].length):t.endsWith("!")&&(s=t.slice(0,-1)),s)return{matcher:s,body:i=>(i.forEach(o=>{o[1]!=null&&(o[1]+=" !important")}),i)}}}}function gk(e={}){return Qp(e,{getBracket:bs,h:k,variantGetBracket:hn})}function vk(e){return[Dw,qw,ik,rk,ok,fk,yk,Qw(),xk,Gw,Jw,Xw,Zw,...ek,...tk,...nk,...sk,Lw(),...Uw,...Nw,mk,...Hp({getBracket:bs,h:k,variantGetBracket:hn}),Yp({getBracket:bs,h:k,variantGetBracket:hn}),...gk(e),bk,...Bw(e),...Ww,...Yw,ak,...zw,Kw,Vw,lk,...Hw,...Ow,ck,...uk,dk].flat()}function hf(e){let t="in oklab";if(e)if(e.startsWith("[")&&e.endsWith("]"))t=e.slice(1,-1);else switch(e){case"longer":case"shorter":case"increasing":case"decreasing":t=`in oklch ${e} hue`;break;default:t=`in ${e}`}return t}function*ff([,e]){let t=k.bracket.cssvar.global.px(e);t!=null&&(yield{"outline-style":"var(--un-outline-style)","outline-width":t},yield Z("--un-outline-style",{initialValue:"solid"}))}function Tk(e){let t=k.bracket(e);return t&&k.properties(t)?t:k.properties.auto.cssvar.global(e)??{contents:"contents",scroll:"scroll-position"}[e]}function wt([,e="",t="1"]){let n=k.bracket.cssvar.global.px(t);if(e in at&&n!=null)return at[e].map(s=>[`border${s}-width`,n])}function ar([,e="",t],n){if(e in at){if(fr(k.bracket(t)))return wt(["",e,t]);if(pr(t,n.theme)){let s=at[e].map(r=>{return(i=r,([,o],a)=>{let l=lo(o,a.theme),c=Ff(l,`border${i}-color`,`border${i}`,a);if(c){let d=c[0];return l?.color&&!Object.values(ao).includes(l.color)&&!l.alpha&&i&&i!==""&&(d[`--un-border${i}-opacity`]="var(--un-border-opacity)"),c}})(["",t],n);var i}).filter(Hh);return[s.map(r=>r[0]).reduce((r,i)=>(Object.assign(r,i),r),{}),...s.flatMap(r=>r.slice(1))]}}}function lr([,e="",t]){let n=k.bracket.percent.cssvar(t);if(e in at&&n!=null)return at[e].map(s=>[`--un-border${s}-opacity`,n])}function cr([,e="",t="DEFAULT"],{theme:n}){if(e in so){if(t==="full")return so[e].map(r=>[`border${r}-radius`,"calc(infinity * 1px)"]);let s=n.radius?.[t]??k.bracket.cssvar.global.fraction.rem(t);if(s!=null){let r=n.radius&&t in n.radius;return r&&fe("radius",t),so[e].map(i=>[`border${i}-radius`,r?Oe("radius",t):s])}}}function ur([,e="",t]){if(Hn.includes(t)&&e in at)return[["--un-border-style",t],...at[e].map(n=>[`border${n}-style`,t])]}function bf([,e]){return{"text-decoration-thickness":k.bracket.cssvar.global.px(e)}}function Yn(e){let t=">:not(:last-child)";return e.includes(t)?e:`${e}${t}`}function*yf([,e,t],{symbols:n}){let s=k.bracket.cssvar.px(t||"1");if(s!=null){s==="0"&&(s="0px");let r={x:["-left","-right"],y:["-top","-bottom"]}[e].map(i=>{let o=i.endsWith("left")||i.endsWith("top")?`calc(${s} * var(--un-divide-${e}-reverse))`:`calc(${s} * calc(1 - var(--un-divide-${e}-reverse)))`;return[[`border${i}-width`,o],[`border${i}-style`,"var(--un-border-style)"]]});r&&(yield{[n.selector]:Yn,[`--un-divide-${e}-reverse`]:0,...Object.fromEntries(r.flat())},yield Z(`--un-divide-${e}-reverse`,{initialValue:0}),yield Z("--un-border-style",{initialValue:"solid"}))}}function wl(e){let t=k.bracket.cssvar(e||"");return t??(t=e?k.percent(e):"100%",t!=null&&Number.parseFloat(t.slice(0,-1))<=100?t:void 0)}function Jt(e,t){return([,n,s],{theme:r})=>{let i=t(s,r)??(s==="none"?"0":"");if(i!=="")return n?[{[`--un-${n}${e}`]:`${e}(${i})`,"-webkit-backdrop-filter":oo,"backdrop-filter":oo},...Jk]:[{[`--un-${e}`]:`${e}(${i})`,filter:ro},...Rl]}}function kl([,e="",t]){let n=lt(t);return n!=null?(fe("spacing"),{[`${xf[e]}gap`]:`calc(var(--spacing) * ${n})`}):{[`${xf[e]}gap`]:k.bracket.cssvar.global.rem(t)}}function Pt(e){return e.replace("col","column")}function t$(e){switch(e){case"min":return"min-content";case"max":return"max-content";case"fr":return"minmax(0,1fr)"}return k.bracket.cssvar.auto.rem(e)}function wf([,e=""]){if(e in so)return{"mask-position":e.split("").flatMap(n=>Il[n]).join(" ")};let t=k.bracket.cssvar.global.position(e);if(t!==null)return{"mask-position":t}}function $l([e,t="",n,s],r){let i={...r$},o=[];if(o.push(...["linear","radial","conic"].map(a=>Z(`--un-mask-${a}`,{initialValue:vf}))),t in Il){i["--un-mask-linear"]="var(--un-mask-left), var(--un-mask-right), var(--un-mask-bottom), var(--un-mask-top)";for(let a of Il[t]){if(i[`--un-mask-${a}`]=`linear-gradient(to ${a}, var(--un-mask-${a}-from-color) var(--un-mask-${a}-from-position), var(--un-mask-${a}-to-color) var(--un-mask-${a}-to-position))`,lt(s)!=null?(fe("spacing"),i[`--un-mask-${a}-${n}-position`]=`calc(var(--spacing) * ${k.bracket.cssvar.fraction.number(s)})`):i[`--un-mask-${a}-${n}-position`]=k.bracket.cssvar.fraction.rem(s),pr(s,r.theme)){let l=ze(`--un-mask-${a}-${n}-color`,El("colors"))([e,s],r);if(l){let[c,...d]=l;Object.assign(i,c),o.push(...d)}}o.push(...["from","to"].flatMap(l=>[Z(`--un-mask-${a}-${l}-position`,{syntax:"<length-percentage>",initialValue:l==="from"?"0%":"100%"}),Z(`--un-mask-${a}-${l}-color`,{syntax:"<color>",initialValue:l==="from"?"black":"transparent"})]))}o.push(...["top","right","bottom","left"].map(a=>Z(`--un-mask-${a}`,{initialValue:vf})))}else{if(n==null)t==="radial"?(i["--un-mask-radial"]="radial-gradient(var(--un-mask-radial-stops, var(--un-mask-radial-size)))",i["--un-mask-radial-size"]=k.bracket.cssvar.rem(s)):(i[`--un-mask-${t}`]=`${t}-gradient(var(--un-mask-${t}-stops, var(--un-mask-${t}-position)))`,i[`--un-mask-${t}-position`]=lt(s)?`calc(1deg * ${k.bracket.cssvar.number(s)})`:k.bracket.cssvar.fraction(s));else{let a={linear:"",radial:"var(--un-mask-radial-shape) var(--un-mask-radial-size) at ",conic:"from "};if(i[`--un-mask-${t}-stops`]=`${a[t]}var(--un-mask-${t}-position), var(--un-mask-${t}-from-color) var(--un-mask-${t}-from-position), var(--un-mask-${t}-to-color) var(--un-mask-${t}-to-position)`,i[`--un-mask-${t}`]=`${t}-gradient(var(--un-mask-${t}-stops))`,pr(s,r.theme)){let l=ze(`--un-mask-${t}-${n}-color`,El("colors"))([e,s],r);if(l){let[c,...d]=l;Object.assign(i,c),o.push(...d)}}else lt(s)!=null?(fe("spacing"),i[`--un-mask-${t}-${n}-position`]=`calc(var(--spacing) * ${k.bracket.cssvar.fraction.number(s)})`):i[`--un-mask-${t}-${n}-position`]=k.bracket.cssvar.fraction.rem(s)}t==="radial"&&o.push(Z("--un-mask-radial-shape",{initialValue:"ellipse"}),Z("--un-mask-radial-size",{initialValue:"farthest-corner"})),o.push(...["from","to"].flatMap(a=>[Z(`--un-mask-${t}-position`,{initialValue:t==="radial"?"center":"0deg"}),Z(`--un-mask-${t}-${a}-position`,{syntax:"<length-percentage>",initialValue:a==="from"?"0%":"100%"}),Z(`--un-mask-${t}-${a}-color`,{syntax:"<color>",initialValue:a==="from"?"black":"transparent"})]))}return[i,...o]}function Tl(e){let t=lt(e);return t!=null?(fe("spacing"),`calc(var(--spacing) * ${t})`):k.bracket.cssvar.global.auto.fraction.rem(e)}function dr([,e,t]){let n=Tl(t);if(n!=null&&e in Jp)return Jp[e].map(s=>[s.slice(1),n])}function kf(e){return(t,n)=>{let[,s]=t,{theme:r}=n,i=r[e]?.[s||"DEFAULT"],o=s?k.bracket.cssvar(s):void 0,a=El(e);return i==null&&o==null||pr(o,r)?ze(`--un-${a}-color`,a)(t,n):[{[`--un-${a}`]:Fl(i||o,`--un-${a}-color`).join(","),"box-shadow":"var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"},...Object.values(Pl)]}}function ks(e,t){return`${e||""}${b$[t]}`}function to(e,t,n){let s,r=["container","spacing"];for(let i of r)if(e[i]?.[n]){fe(i,n),s=Oe(i,n);break}if(!s)switch(n){case"fit":case"max":case"min":s=`${n}-content`;break;case"screen":s=t==="w"?"100vw":"100vh"}return s||k.number(n)==null||(fe("spacing"),s=`calc(var(--spacing) * ${k.number(n)})`),s??k.bracket.cssvar.global.auto.none.fraction.rem(n)}function $f(e,t,n="breakpoint"){let s=co(e,n);if(s)return s.find(r=>r.point===t)?.size}function x$(e){if(/^\d+\/\d+$/.test(e))return e;switch(e){case"square":return"1/1";case"video":return"16/9"}return k.bracket.cssvar.global.auto.number(e)}function Sf([,e]){return{"stroke-width":k.bracket.cssvar.fraction.px.number(e)}}function _f(e,t){let n=t.spacing?.[e];if(!n){let s=lt(e);s!=null?(fe("spacing"),n=`calc(var(--spacing) * ${s})`):n=k.bracket.cssvar.global.auto.fraction.rem(e)}return n}function Af([,e,t]){let n=lt(t)??k.bracket.cssvar.none.fraction.rem(t);if(n!=null)return n==="none"?{translate:"none"}:(fe("spacing"),[[...Ll(e,typeof n=="number"?`calc(var(--spacing) * ${n})`:n,"translate"),["translate","var(--un-translate-x) var(--un-translate-y)"+(e==="z"?" var(--un-translate-z)":""),Cl]],...["x","y","z"].map(s=>Z(`--un-translate-${s}`,{initialValue:0}))])}function Cf([,e,t]){let n=k.bracket.cssvar.none.fraction.percent(t);if(n!=null)return n==="none"?{scale:"none"}:[[...Ll(e,n,"scale"),["scale","var(--un-scale-x) var(--un-scale-y)"+(e==="z"?" var(--un-scale-z)":"")]],...["x","y","z"].map(s=>Z(`--un-scale-${s}`,{initialValue:1}))]}function Ef([,e="",t]){let n=k.bracket.cssvar.none.degree(t);if(n!=null)return n==="none"?{rotate:"none"}:e?[[...Ll(e,n.endsWith("deg")?`rotate${e.toUpperCase()}(${n})`:n,"rotate"),["transform",Ol]],...["x","y","z"].map(s=>Z(`--un-rotate-${s}`,{initialValue:`rotate${s.toUpperCase()}(0)`})),...["x","y"].map(s=>Z(`--un-skew-${s}`,{initialValue:`skew${s.toUpperCase()}(0)`}))]:{rotate:k.bracket.cssvar.degree(t)}}function Rf([,e,t]){let n=k.bracket.cssvar.degree(t),s=Mf[e];if(n!=null&&s)return[[...s.map(r=>[`--un-skew${r}`,n.endsWith("deg")?`skew${r.slice(1).toUpperCase()}(${n})`:n]),["transform",Ol]],...["x","y","z"].map(r=>Z(`--un-rotate-${r}`,{initialValue:`rotate${r.toUpperCase()}(0)`})),...["x","y"].map(r=>Z(`--un-skew-${r}`,{initialValue:`skew${r.toUpperCase()}(0)`}))]}function Ll(e,t,n){let s=t.split(Tw);return e||!e&&s.length===1?Mf[e].map(r=>[`--un-${n}${r}`,t]):s.map((r,i)=>[`--un-${n}-${Rw[i]}`,r])}function If(e,t){let n;if(k.cssvar(e)!=null)n=k.cssvar(e);else{e.startsWith("[")&&e.endsWith("]")&&(e=e.slice(1,-1));let s=e.split(",").map(r=>t.property?.[r]??k.properties(r));s.every(Boolean)&&(n=s.join(","))}return n}function Pf([,e],{theme:t}){if(t.text?.[e]!=null)return fe("text",[e,"fontSize"]),fe("text",[e,"lineHeight"]),{"font-size":Oe("text",[e,"fontSize"]),"line-height":`var(--un-leading, ${Oe("text",[e,"lineHeight"])})`};{let n=k.bracket.cssvar.global.rem(e);if(n)return{"font-size":n}}}function X$(e){if(e.preflights?.reset!==!1)return{getCSS:({generator:t})=>(fe("font","sans"),fe("font","mono"),fe("default",["font","family"]),fe("default",["monoFont","family"]),Df(`
/*
  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
  2. Remove default margins and padding
  3. Reset all borders.
*/

*,
::after,
::before,
::backdrop,
::file-selector-button {
  box-sizing: border-box; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 2 */
  border: 0 solid; /* 3 */
}

/*
  1. Use a consistent sensible line-height in all browsers.
  2. Prevent adjustments of font size after orientation changes in iOS.
  3. Use a more readable tab size.
  4. Use the user's configured \`sans\` font-family by default.
  5. Use the user's configured \`sans\` font-feature-settings by default.
  6. Use the user's configured \`sans\` font-variation-settings by default.
  7. Disable tap highlights on iOS.
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  tab-size: 4; /* 3 */
  font-family: var(
    --default-font-family,
    ui-sans-serif,
    system-ui,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji'
  ); /* 4 */
  font-feature-settings: var(--default-font-featureSettings, normal); /* 5 */
  font-variation-settings: var(--default-font-variationSettings, normal); /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
  1. Add the correct height in Firefox.
  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
  3. Reset the default border style to a 1px solid border.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
  Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}

/*
  Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
  Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  -webkit-text-decoration: inherit;
  text-decoration: inherit;
}

/*
  Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
  1. Use the user's configured \`mono\` font-family by default.
  2. Use the user's configured \`mono\` font-feature-settings by default.
  3. Use the user's configured \`mono\` font-variation-settings by default.
  4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: var(
    --default-monoFont-family,
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    'Liberation Mono',
    'Courier New',
    monospace
  ); /* 1 */
  font-feature-settings: var(--default-monoFont-featureSettings, normal); /* 2 */
  font-variation-settings: var(--default-monoFont-variationSettings, normal); /* 3 */
  font-size: 1em; /* 4 */
}

/*
  Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
  Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
  3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
  Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
  Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
  Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
  Make lists unstyled by default.
*/

ol,
ul,
menu {
  list-style: none;
}

/*
  1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
  2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
      This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/*
  1. Inherit font styles in all browsers.
  2. Remove border radius in all browsers.
  3. Remove background color in all browsers.
  4. Ensure consistent opacity for disabled states in all browsers.
*/

button,
input,
select,
optgroup,
textarea,
::file-selector-button {
  font: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  border-radius: 0; /* 2 */
  background-color: transparent; /* 3 */
  opacity: 1; /* 4 */
}

/*
  Restore default font weight.
*/

:where(select:is([multiple], [size])) optgroup {
  font-weight: bolder;
}

/*
  Restore indentation.
*/

:where(select:is([multiple], [size])) optgroup option {
  padding-inline-start: 20px;
}

/*
  Restore space after button.
*/

::file-selector-button {
  margin-inline-end: 4px;
}

/*
  Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
*/

::placeholder {
  opacity: 1;
}

/*
  Set the default placeholder color to a semi-transparent version of the current text color in browsers that do not
  crash when using \`color-mix(\u2026)\` with \`currentcolor\`. (https://github.com/tailwindlabs/tailwindcss/issues/17194)
*/

@supports (not (-webkit-appearance: -apple-pay-button)) /* Not Safari */ or
  (contain-intrinsic-size: 1px) /* Safari 17+ */ {
  ::placeholder {
    color: color-mix(in oklab, currentcolor 50%, transparent);
  }
}

/*
  Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
  Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
  1. Ensure date/time inputs have the same height when empty in iOS Safari.
  2. Ensure text alignment can be changed on date/time inputs in iOS Safari.
*/

::-webkit-date-and-time-value {
  min-height: 1lh; /* 1 */
  text-align: inherit; /* 2 */
}

/*
  Prevent height from changing on date/time inputs in macOS Safari when the input is set to \`display: block\`.
*/

::-webkit-datetime-edit {
  display: inline-flex;
}

/*
  Remove excess padding from pseudo-elements in date/time inputs to ensure consistent height across browsers.
*/

::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

::-webkit-datetime-edit,
::-webkit-datetime-edit-year-field,
::-webkit-datetime-edit-month-field,
::-webkit-datetime-edit-day-field,
::-webkit-datetime-edit-hour-field,
::-webkit-datetime-edit-minute-field,
::-webkit-datetime-edit-second-field,
::-webkit-datetime-edit-millisecond-field,
::-webkit-datetime-edit-meridiem-field {
  padding-block: 0;
}

/*
  Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
  Correct the inability to style the border radius in iOS Safari.
*/

button,
input:where([type='button'], [type='reset'], [type='submit']),
::file-selector-button {
  appearance: button;
}

/*
  Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
  Make elements with the HTML hidden attribute stay hidden by default.
*/

[hidden]:where(:not([hidden='until-found'])) {
  display: none !important;
}
`,t.config.envMode==="dev")),layer:"base"}}function e1(e){return{layer:"theme",getCSS(t){let{theme:n,generator:s}=t,r=Wh(s.config.safelist.flatMap(l=>typeof l=="function"?l(t):l)),{mode:i,process:o}=e.preflights.theme;if(i===!1)return;if(r.length>0)for(let l of r){let[c,...d]=l.trim().split(":");if(c in n&&d.length<=1){let h=d.length===0?["DEFAULT"]:d[0].split("-"),f=io(n,c,h);typeof f=="string"&&(fe(c,h),uo(f,n))}}let a;if(i==="on-demand"){if($s.size===0)return;a=Array.from($s).map(l=>{let[c,d]=l.split(":"),h=io(n,c,d.split("-"));if(typeof h=="string")return[`--${c}${c==="spacing"&&d==="DEFAULT"?"":`-${d}`}`,h]}).filter(Boolean)}else{let l=Object.keys(n).filter(c=>!Z$.includes(c));a=Array.from(function(c,d){let h=new Map([["--spacing",c.spacing.DEFAULT]]),f=g=>g.replace(gl,"1");function m(g,b){for(let _ in g)Array.isArray(g[_])?h.set(`--${b}-${_}`,f(g[_].join(","))):typeof g[_]=="object"?m(g[_],`${b}-${_}`):h.set(`--${b}-${_}`,f(g[_]))}for(let g in c)d.includes(g)&&m(c[g],g);return h}(n,l))}return(l=>{if(o)for(let d of l)for(let h of Yt(o))h(d,t);let c=l.map(([d,h])=>d&&h?`${d}: ${h};`:void 0).filter(Boolean);if(c.length!==0)return Df(`
:root, :host {
${c.join(`
`)}
}`,s.config.envMode==="dev")})(a)}}}var Cl,ao,at,Jp,so,Mf,Rw,Xp,st,Le,Ml,jf,hr,Iw,Zp,ef,jl,Tw,Pw,k,sf,xl,$s,Ss,Dw,Ow,rf,zw,Uw,Nw,Vw,Ww,qw,Hw,Yw,Kw,Gw,Jw,Xw,Zw,ek,tk,nk,sk,rk,ik,ok,ak,lk,ck,uk,dk,of,af,hk,pk,fk,mk,bk,yk,xk,Of,wk,lf,kk,$k,Sk,_k,Ak,cf,Ck,uf,Ek,Rk,df,Ik,pf,mf,vl,Pk,Mk,jk,Fk,Dk,Hn,Ok,Lk,zk,Uk,Nk,Vk,Bk,Wk,qk,gf,Hk,Yk,Qk,Kk,Gk,Lf,Rl,ro,zf,Jk,oo,Xk,Zk,xf,e$,n$,eo,s$,Il,vf,r$,i$,o$,a$,Uf,l$,Nf,Vf,c$,u$,d$,h$,p$,Pl,f$,m$,g$,b$,y$,v$,Sl,w$,k$,$$,S$,_$,A$,C$,E$,R$,I$,T$,P$,M$,j$,F$,D$,O$,L$,z$,_l,Al,U$,no,Dl,Ol,N$,V$,B$,W$,q$,H$,Y$,Tf,Q$,pn,fn,K$,G$,J$,Z$,t1,n1,Bf,Wf=y(()=>{Oi();Qh();Gp();Cl="$$mini-no-negative",ao={transparent:"transparent",current:"currentColor",inherit:"inherit"},at={l:["-left"],r:["-right"],t:["-top"],b:["-bottom"],s:["-inline-start"],e:["-inline-end"],x:["-inline"],y:["-block"],"":[""],bs:["-block-start"],be:["-block-end"],is:["-inline-start"],ie:["-inline-end"],block:["-block-start","-block-end"],inline:["-inline-start","-inline-end"]},Jp={...at,x:["-inset-inline"],y:["-inset-block"],s:["-inset-inline-start"],start:["-inset-inline-start"],e:["-inset-inline-end"],end:["-inset-inline-end"],bs:["-inset-block-start"],be:["-inset-block-end"],is:["-inset-inline-start"],ie:["-inset-inline-end"],block:["-inset-block-start","-inset-block-end"],inline:["-inset-inline-start","-inset-inline-end"]},so={l:["-top-left","-bottom-left"],r:["-top-right","-bottom-right"],t:["-top-left","-top-right"],b:["-bottom-left","-bottom-right"],tl:["-top-left"],lt:["-top-left"],tr:["-top-right"],rt:["-top-right"],bl:["-bottom-left"],lb:["-bottom-left"],br:["-bottom-right"],rb:["-bottom-right"],"":[""],bs:["-start-start","-start-end"],be:["-end-start","-end-end"],s:["-end-start","-start-start"],is:["-end-start","-start-start"],e:["-start-end","-end-end"],ie:["-start-end","-end-end"],ss:["-start-start"],"bs-is":["-start-start"],"is-bs":["-start-start"],se:["-start-end"],"bs-ie":["-start-end"],"ie-bs":["-start-end"],es:["-end-start"],"be-is":["-end-start"],"is-be":["-end-start"],ee:["-end-end"],"be-ie":["-end-end"],"ie-be":["-end-end"]},Mf={x:["-x"],y:["-y"],z:["-z"],"":["-x","-y"]},Rw=["x","y","z"],Xp=["top","top center","top left","top right","bottom","bottom center","bottom left","bottom right","left","left center","left top","left bottom","right","right center","right top","right bottom","center","center top","center bottom","center left","center right","center center"],st=Object.assign({},...Xp.map(e=>({[e.replace(/ /,"-")]:e})),...Xp.map(e=>({[e.replace(/\b(\w)\w+/g,"$1").replace(/ /,"")]:e}))),Le=["inherit","initial","revert","revert-layer","unset"],Ml=/^(calc|clamp|min|max)\s*\((.+)\)(.*)/,jf=/^(var)\s*\((.+)\)(.*)/,hr=/^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i,Iw=/^(-?\d*(?:\.\d+)?)$/,Zp=/^(px|[sld]?v[wh])$/i,ef={px:1,vw:100,vh:100,svw:100,svh:100,dvw:100,dvh:100,lvh:100,lvw:100},jl=/^\[(color|image|length|size|position|quoted|string|number|family):/i,Tw=/,(?![^()]*\))/g,Pw=["color","border-color","background-color","outline-color","text-decoration-color","flex-grow","flex","flex-shrink","caret-color","font","gap","opacity","visibility","z-index","font-weight","zoom","text-shadow","transform","box-shadow","border","background-position","left","right","top","bottom","object-position","max-height","min-height","max-width","min-width","height","width","border-width","margin","padding","outline-width","outline-offset","font-size","line-height","text-indent","vertical-align","border-spacing","letter-spacing","word-spacing","stroke","filter","backdrop-filter","fill","mask","mask-size","mask-border","clip-path","clip","border-radius"];k=Np({__proto__:null,auto:function(e){if(e==="auto"||e==="a")return"auto"},bracket:function(e){return qn(e)},bracketOfColor:function(e){return qn(e,"color")},bracketOfFamily:function(e){return qn(e,"family")},bracketOfLength:function(e){return qn(e,"length")||qn(e,"size")},bracketOfNumber:function(e){return qn(e,"number")},bracketOfPosition:function(e){return qn(e,"position")},cssvar:function(e){if(e.startsWith("var("))return e;let t=e.match(/^(?:\$|--)([^\s'"`;{}]+)$/);if(t){let[n,s]=t[1].split(",");return`var(--${Un(n)}${s?`, ${s}`:""})`}},degree:function(e){let t=e.match(/^(-?[0-9.]+)(deg|rad|grad|turn)?$/i);if(!t)return;let[,n,s]=t,r=Number.parseFloat(n);return Number.isNaN(r)?void 0:r===0?"0":s?`${vt(r)}${s}`:`${vt(r)}deg`},fraction:function(e){if(!e)return;if(e==="full")return"100%";let[t,n]=e.split("/"),s=Number.parseFloat(t)/Number.parseFloat(n);return Number.isNaN(s)?void 0:s===0?"0":`${vt(100*s)}%`},global:function(e){if(Le.includes(e))return e},none:function(e){if(e==="none")return"none"},number:tf,numberWithUnit:function(e){let t=e.match(hr);if(!t)return;let[,n,s]=t,r=Number.parseFloat(n);return s&&!Number.isNaN(r)?`${vt(r)}${s}`:void 0},percent:function(e){e.endsWith("%")&&(e=e.slice(0,-1));let t=tf(e);if(t!=null)return`${t}%`},position:function(e){if(["top","left","right","bottom","center"].includes(e))return e},properties:function(e){if(e.split(",").every(t=>Pw.includes(t)))return e},px:function(e){if(Zp.test(e))return`${ef[e]}${e}`;let t=e.match(hr);if(!t)return;let[,n,s]=t,r=Number.parseFloat(n);return Number.isNaN(r)?void 0:s?`${vt(r)}${s}`:`${vt(r)}px`},rem:function(e){if(!e)return;if(Zp.test(e))return`${ef[e]}${e}`;let t=e.match(hr);if(!t)return;let[,n,s]=t,r=Number.parseFloat(n);return Number.isNaN(r)?void 0:r===0?"0":s?`${vt(r)}${s}`:`${vt(r/4)}rem`},time:function(e){let t=e.match(/^(-?[0-9.]+)(s|ms)?$/i);if(!t)return;let[,n,s]=t,r=Number.parseFloat(n);return Number.isNaN(r)?void 0:r!==0||s?s?`${vt(r)}${s}`:`${vt(r)}ms`:"0s"}});sf=/[a-z]+/gi,xl=new WeakMap;$s=new Set([]);Ss=new Map;Dw={name:"aria",match(e,t){let n=ot("aria-",e,t.generator.config.separators);if(n){let[s,r]=n,i=k.bracket(s)??t.theme.aria?.[s]??"";if(i)return{matcher:r,selector:o=>`${o}[aria-${i}]`}}},multiPass:!0,autocomplete:"aria-$aria"};Ow=[vs("group"),vs("peer"),vs("parent"),vs("previous"),vs("has"),vs("in")],rf=/(max|min)-\[([^\]]*)\]:/;zw=[dt("*",e=>({selector:`${e.selector} > *`}),{order:-1}),dt("**",e=>({selector:`${e.selector} *`}),{order:-1})];Uw=[or("all"," "),or("children",">"),or("next","+"),or("sibling","+"),or("siblings","~")],Nw=[dt("svg",e=>({selector:`${e.selector} svg`}))],Vw={name:"@",match(e,t){if(e.startsWith("@container"))return;let n=ot("@",e,t.generator.config.separators);if(n){let[s,r,i]=n,o=k.bracket(s),a;if(a=o?k.numberWithUnit(o):t.theme.container?.[s]??"",a){let l=1e3+Object.keys(t.theme.container??{}).indexOf(s);return i&&(l+=1e3),{matcher:r,handle:(c,d)=>d({...c,parent:`${c.parent?`${c.parent} $$ `:""}@container${i?` ${i} `:" "}(min-width: ${a})`,parentOrder:l})}}}},multiPass:!0};Ww=[dt(".dark",e=>({prefix:`.dark $$ ${e.prefix}`})),dt(".light",e=>({prefix:`.light $$ ${e.prefix}`})),Xe("@dark","@media (prefers-color-scheme: dark)"),Xe("@light","@media (prefers-color-scheme: light)"),Xe("not-dark","@media not (prefers-color-scheme: dark)")],qw={name:"data",match(e,t){let n=ot("data-",e,t.generator.config.separators);if(n){let[s,r]=n,i=k.bracket(s)??t.theme.data?.[s]??"";if(i)return{matcher:r,selector:o=>`${o}[data-${i}]`}}},multiPass:!0};Hw=[ws("group"),ws("peer"),ws("parent"),ws("previous"),ws("has"),ws("in")],Yw=[dt("rtl",e=>({prefix:`[dir="rtl"] $$ ${e.prefix}`})),dt("ltr",e=>({prefix:`[dir="ltr"] $$ ${e.prefix}`}))];Kw=dt("inert",e=>({parent:`${e.parent?`${e.parent} $$ `:""}${e.selector}`,selector:"&:is([inert],[inert] *)"})),Gw=Xe("noscript","@media (scripting: none)"),Jw={name:"scripting",match(e,t){let n=ot(["script-","scripting-"],e,t.generator.config.separators);if(n){let[s,r]=n;if(["none","initial-only","enabled"].includes(s))return{matcher:r,handle:(i,o)=>o({...i,parent:`${i.parent?`${i.parent} $$ `:""}@media (scripting: ${s})`})}}},multiPass:!0,autocomplete:["(scripting|script)-(none|initial-only|enabled)"]},Xw=Xe("print","@media print"),Zw={name:"media",match(e,t){let n=ot("media-",e,t.generator.config.separators);if(n){let[s,r]=n,i=k.bracket(s)??"";if(i===""&&(i=t.theme.media?.[s]??""),i)return{matcher:r,handle:(o,a)=>a({...o,parent:`${o.parent?`${o.parent} $$ `:""}@media ${i}`})}}},multiPass:!0,autocomplete:"media-$media"},ek=[Xe("contrast-more","@media (prefers-contrast: more)"),Xe("contrast-less","@media (prefers-contrast: less)")],tk=[Xe("motion-reduce","@media (prefers-reduced-motion: reduce)"),Xe("motion-safe","@media (prefers-reduced-motion: no-preference)")],nk=[Xe("landscape","@media (orientation: landscape)"),Xe("portrait","@media (orientation: portrait)")],sk=[Xe("forced-colors","@media (forced-colors: active)")],rk={name:"selector",match(e,t){let n=hn("selector-",e,t.generator.config.separators);if(n){let[s,r]=n,i=k.bracket(s);if(i)return{matcher:r,selector:()=>i}}}},ik={name:"layer",match(e,t){let n=ot("layer-",e,t.generator.config.separators);if(n){let[s,r]=n,i=k.bracket(s)??s;if(i)return{matcher:r,handle:(o,a)=>a({...o,parent:`${o.parent?`${o.parent} $$ `:""}@layer ${i}`})}}}},ok={name:"uno-layer",match(e,t){let n=ot("uno-layer-",e,t.generator.config.separators);if(n){let[s,r]=n,i=k.bracket(s)??s;if(i)return{matcher:r,layer:i}}}},ak={name:"scope",match(e,t){let n=hn("scope-",e,t.generator.config.separators);if(n){let[s,r]=n,i=k.bracket(s);if(i)return{matcher:r,selector:o=>`${i} $$ ${o}`}}}},lk={name:"variables",match(e,t){if(!e.startsWith("["))return;let[n,s]=bs(e,"[","]")??[];if(!n||!s)return;let r;for(let a of t.generator.config.separators)if(s.startsWith(a)){r=s.slice(a.length);break}if(r==null)return;let i=k.bracket(n)??"",o=i.startsWith("@");return o||i.includes("&")?{matcher:r,handle(a,l){let c=o?{parent:`${a.parent?`${a.parent} $$ `:""}${i}`}:{selector:i.replace(/&/g,a.selector)};return l({...a,...c})}}:void 0},multiPass:!0},ck={name:"theme-variables",match(e,t){if(zp(e))return{matcher:e,handle:(n,s)=>s({...n,entries:JSON.parse(Up(JSON.stringify(n.entries),t.theme))})}}},uk=[dt("@hover",e=>({parent:(e.parent?`${e.parent} $$ `:"")+"@media (hover: hover) and (pointer: fine)",selector:`${e.selector||""}:hover`}))],dk={name:"implicit-group",match(e,t){let n=ot("in-",e,t.generator.config.separators);if(n){let[s,r]=n,i=k.bracket(s)??s;if(i)return{matcher:r,handle:(o,a)=>a({...o,parent:`${o.parent?`${o.parent} $$ `:""}${o.selector}`,selector:`:where(*:is(${i})) &`})}}}},of=/^-?[0-9.]+(?:[a-z]+|%)?$/,af=/-?[0-9.]+(?:[a-z]+|%)?/,hk=[/\b(opacity|color|flex|backdrop-filter|^filter|transform|mask-image)\b/],pk=/\b(hue-rotate)\s*(\(.*)/,fk={name:"negative",match(e){if(e.startsWith("-"))return{matcher:e.slice(1),body:t=>{if(t.find(s=>s[0]===Cl))return;let n=!1;return t.forEach(s=>{if(Yt(s[2]).includes(Cl))return;let r=s[1]?.toString();if(!r||r==="0"||hk.some(a=>a.test(s[0])))return;let i=function(a){let l=a.match(Ml)||a.match(jf);if(l){let[c,d]=ir(`(${l[2]})${l[3]}`,"(",")"," ")??[];if(c)return`calc(${l[1]}${c} * -1)${d?` ${d}`:""}`}}(r);if(i)return s[1]=i,void(n=!0);let o=function(a){let l=a.match(pk);if(l){let[c,d]=ir(l[2],"(",")"," ")??[];if(c){let h=of.test(c.slice(1,-1))?c.replace(af,f=>f.startsWith("-")?f.slice(1):`-${f}`):`(calc(${c} * -1))`;return`${l[1]}${h}${d?` ${d}`:""}`}}}(r);if(o)return s[1]=o,void(n=!0);of.test(r)&&(s[1]=r.replace(af,a=>a.startsWith("-")?a.slice(1):`-${a}`),n=!0)}),n?t:[]}}}},mk=(e,{theme:t})=>{let n=e.match(/^(.*)\b(placeholder-)(.+)$/);if(n){let[,s="",r,i]=n;if(pr(i,t)||function(o){let a=o.match(/^op(?:acity)?-?(.+)$/);return!(!a||a[1]==null)&&k.bracket.percent(a[1])!=null}(i))return{matcher:`${s}placeholder-$ ${r}${i}`}}};bk=Kp(),yk={name:"starting",match(e){if(e.startsWith("starting:"))return{matcher:e.slice(9),handle:(t,n)=>n({...t,parent:"@starting-style"})}}},xk={name:"supports",match(e,t){let n=ot("supports-",e,t.generator.config.separators);if(n){let[s,r]=n,i=k.bracket(s)??"";if(i===""&&(i=t.theme.supports?.[s]??""),i)return i.startsWith("(")&&i.endsWith(")")||(i=`(${i})`),{matcher:r,handle:(o,a)=>a({...o,parent:`${o.parent?`${o.parent} $$ `:""}@supports ${i}`})}}},multiPass:!0};Of={black:"#000",white:"#fff",slate:{50:"oklch(98.4% 0.003 247.858)",100:"oklch(96.8% 0.007 247.896)",200:"oklch(92.9% 0.013 255.508)",300:"oklch(86.9% 0.022 252.894)",400:"oklch(70.4% 0.04 256.788)",500:"oklch(55.4% 0.046 257.417)",600:"oklch(44.6% 0.043 257.281)",700:"oklch(37.2% 0.044 257.287)",800:"oklch(27.9% 0.041 260.031)",900:"oklch(20.8% 0.042 265.755)",950:"oklch(12.9% 0.042 264.695)"},gray:{50:"oklch(98.5% 0.002 247.839)",100:"oklch(96.7% 0.003 264.542)",200:"oklch(92.8% 0.006 264.531)",300:"oklch(87.2% 0.01 258.338)",400:"oklch(70.7% 0.022 261.325)",500:"oklch(55.1% 0.027 264.364)",600:"oklch(44.6% 0.03 256.802)",700:"oklch(37.3% 0.034 259.733)",800:"oklch(27.8% 0.033 256.848)",900:"oklch(21% 0.034 264.665)",950:"oklch(13% 0.028 261.692)"},zinc:{50:"oklch(98.5% 0 0)",100:"oklch(96.7% 0.001 286.375)",200:"oklch(92% 0.004 286.32)",300:"oklch(87.1% 0.006 286.286)",400:"oklch(70.5% 0.015 286.067)",500:"oklch(55.2% 0.016 285.938)",600:"oklch(44.2% 0.017 285.786)",700:"oklch(37% 0.013 285.805)",800:"oklch(27.4% 0.006 286.033)",900:"oklch(21% 0.006 285.885)",950:"oklch(14.1% 0.005 285.823)"},neutral:{50:"oklch(98.5% 0 0)",100:"oklch(97% 0 0)",200:"oklch(92.2% 0 0)",300:"oklch(87% 0 0)",400:"oklch(70.8% 0 0)",500:"oklch(55.6% 0 0)",600:"oklch(43.9% 0 0)",700:"oklch(37.1% 0 0)",800:"oklch(26.9% 0 0)",900:"oklch(20.5% 0 0)",950:"oklch(14.5% 0 0)"},stone:{50:"oklch(98.5% 0.001 106.423)",100:"oklch(97% 0.001 106.424)",200:"oklch(92.3% 0.003 48.717)",300:"oklch(86.9% 0.005 56.366)",400:"oklch(70.9% 0.01 56.259)",500:"oklch(55.3% 0.013 58.071)",600:"oklch(44.4% 0.011 73.639)",700:"oklch(37.4% 0.01 67.558)",800:"oklch(26.8% 0.007 34.298)",900:"oklch(21.6% 0.006 56.043)",950:"oklch(14.7% 0.004 49.25)"},red:{50:"oklch(97.1% 0.013 17.38)",100:"oklch(93.6% 0.032 17.717)",200:"oklch(88.5% 0.062 18.334)",300:"oklch(80.8% 0.114 19.571)",400:"oklch(70.4% 0.191 22.216)",500:"oklch(63.7% 0.237 25.331)",600:"oklch(57.7% 0.245 27.325)",700:"oklch(50.5% 0.213 27.518)",800:"oklch(44.4% 0.177 26.899)",900:"oklch(39.6% 0.141 25.723)",950:"oklch(25.8% 0.092 26.042)"},orange:{50:"oklch(98% 0.016 73.684)",100:"oklch(95.4% 0.038 75.164)",200:"oklch(90.1% 0.076 70.697)",300:"oklch(83.7% 0.128 66.29)",400:"oklch(75% 0.183 55.934)",500:"oklch(70.5% 0.213 47.604)",600:"oklch(64.6% 0.222 41.116)",700:"oklch(55.3% 0.195 38.402)",800:"oklch(47% 0.157 37.304)",900:"oklch(40.8% 0.123 38.172)",950:"oklch(26.6% 0.079 36.259)"},amber:{50:"oklch(98.7% 0.022 95.277)",100:"oklch(96.2% 0.059 95.617)",200:"oklch(92.4% 0.12 95.746)",300:"oklch(87.9% 0.169 91.605)",400:"oklch(82.8% 0.189 84.429)",500:"oklch(76.9% 0.188 70.08)",600:"oklch(66.6% 0.179 58.318)",700:"oklch(55.5% 0.163 48.998)",800:"oklch(47.3% 0.137 46.201)",900:"oklch(41.4% 0.112 45.904)",950:"oklch(27.9% 0.077 45.635)"},yellow:{50:"oklch(98.7% 0.026 102.212)",100:"oklch(97.3% 0.071 103.193)",200:"oklch(94.5% 0.129 101.54)",300:"oklch(90.5% 0.182 98.111)",400:"oklch(85.2% 0.199 91.936)",500:"oklch(79.5% 0.184 86.047)",600:"oklch(68.1% 0.162 75.834)",700:"oklch(55.4% 0.135 66.442)",800:"oklch(47.6% 0.114 61.907)",900:"oklch(42.1% 0.095 57.708)",950:"oklch(28.6% 0.066 53.813)"},lime:{50:"oklch(98.6% 0.031 120.757)",100:"oklch(96.7% 0.067 122.328)",200:"oklch(93.8% 0.127 124.321)",300:"oklch(89.7% 0.196 126.665)",400:"oklch(84.1% 0.238 128.85)",500:"oklch(76.8% 0.233 130.85)",600:"oklch(64.8% 0.2 131.684)",700:"oklch(53.2% 0.157 131.589)",800:"oklch(45.3% 0.124 130.933)",900:"oklch(40.5% 0.101 131.063)",950:"oklch(27.4% 0.072 132.109)"},green:{50:"oklch(98.2% 0.018 155.826)",100:"oklch(96.2% 0.044 156.743)",200:"oklch(92.5% 0.084 155.995)",300:"oklch(87.1% 0.15 154.449)",400:"oklch(79.2% 0.209 151.711)",500:"oklch(72.3% 0.219 149.579)",600:"oklch(62.7% 0.194 149.214)",700:"oklch(52.7% 0.154 150.069)",800:"oklch(44.8% 0.119 151.328)",900:"oklch(39.3% 0.095 152.535)",950:"oklch(26.6% 0.065 152.934)"},emerald:{50:"oklch(97.9% 0.021 166.113)",100:"oklch(95% 0.052 163.051)",200:"oklch(90.5% 0.093 164.15)",300:"oklch(84.5% 0.143 164.978)",400:"oklch(76.5% 0.177 163.223)",500:"oklch(69.6% 0.17 162.48)",600:"oklch(59.6% 0.145 163.225)",700:"oklch(50.8% 0.118 165.612)",800:"oklch(43.2% 0.095 166.913)",900:"oklch(37.8% 0.077 168.94)",950:"oklch(26.2% 0.051 172.552)"},teal:{50:"oklch(98.4% 0.014 180.72)",100:"oklch(95.3% 0.051 180.801)",200:"oklch(91% 0.096 180.426)",300:"oklch(85.5% 0.138 181.071)",400:"oklch(77.7% 0.152 181.912)",500:"oklch(70.4% 0.14 182.503)",600:"oklch(60% 0.118 184.704)",700:"oklch(51.1% 0.096 186.391)",800:"oklch(43.7% 0.078 188.216)",900:"oklch(38.6% 0.063 188.416)",950:"oklch(27.7% 0.046 192.524)"},cyan:{50:"oklch(98.4% 0.019 200.873)",100:"oklch(95.6% 0.045 203.388)",200:"oklch(91.7% 0.08 205.041)",300:"oklch(86.5% 0.127 207.078)",400:"oklch(78.9% 0.154 211.53)",500:"oklch(71.5% 0.143 215.221)",600:"oklch(60.9% 0.126 221.723)",700:"oklch(52% 0.105 223.128)",800:"oklch(45% 0.085 224.283)",900:"oklch(39.8% 0.07 227.392)",950:"oklch(30.2% 0.056 229.695)"},sky:{50:"oklch(97.7% 0.013 236.62)",100:"oklch(95.1% 0.026 236.824)",200:"oklch(90.1% 0.058 230.902)",300:"oklch(82.8% 0.111 230.318)",400:"oklch(74.6% 0.16 232.661)",500:"oklch(68.5% 0.169 237.323)",600:"oklch(58.8% 0.158 241.966)",700:"oklch(50% 0.134 242.749)",800:"oklch(44.3% 0.11 240.79)",900:"oklch(39.1% 0.09 240.876)",950:"oklch(29.3% 0.066 243.157)"},blue:{50:"oklch(97% 0.014 254.604)",100:"oklch(93.2% 0.032 255.585)",200:"oklch(88.2% 0.059 254.128)",300:"oklch(80.9% 0.105 251.813)",400:"oklch(70.7% 0.165 254.624)",500:"oklch(62.3% 0.214 259.815)",600:"oklch(54.6% 0.245 262.881)",700:"oklch(48.8% 0.243 264.376)",800:"oklch(42.4% 0.199 265.638)",900:"oklch(37.9% 0.146 265.522)",950:"oklch(28.2% 0.091 267.935)"},indigo:{50:"oklch(96.2% 0.018 272.314)",100:"oklch(93% 0.034 272.788)",200:"oklch(87% 0.065 274.039)",300:"oklch(78.5% 0.115 274.713)",400:"oklch(67.3% 0.182 276.935)",500:"oklch(58.5% 0.233 277.117)",600:"oklch(51.1% 0.262 276.966)",700:"oklch(45.7% 0.24 277.023)",800:"oklch(39.8% 0.195 277.366)",900:"oklch(35.9% 0.144 278.697)",950:"oklch(25.7% 0.09 281.288)"},violet:{50:"oklch(96.9% 0.016 293.756)",100:"oklch(94.3% 0.029 294.588)",200:"oklch(89.4% 0.057 293.283)",300:"oklch(81.1% 0.111 293.571)",400:"oklch(70.2% 0.183 293.541)",500:"oklch(60.6% 0.25 292.717)",600:"oklch(54.1% 0.281 293.009)",700:"oklch(49.1% 0.27 292.581)",800:"oklch(43.2% 0.232 292.759)",900:"oklch(38% 0.189 293.745)",950:"oklch(28.3% 0.141 291.089)"},purple:{50:"oklch(97.7% 0.014 308.299)",100:"oklch(94.6% 0.033 307.174)",200:"oklch(90.2% 0.063 306.703)",300:"oklch(82.7% 0.119 306.383)",400:"oklch(71.4% 0.203 305.504)",500:"oklch(62.7% 0.265 303.9)",600:"oklch(55.8% 0.288 302.321)",700:"oklch(49.6% 0.265 301.924)",800:"oklch(43.8% 0.218 303.724)",900:"oklch(38.1% 0.176 304.987)",950:"oklch(29.1% 0.149 302.717)"},fuchsia:{50:"oklch(97.7% 0.017 320.058)",100:"oklch(95.2% 0.037 318.852)",200:"oklch(90.3% 0.076 319.62)",300:"oklch(83.3% 0.145 321.434)",400:"oklch(74% 0.238 322.16)",500:"oklch(66.7% 0.295 322.15)",600:"oklch(59.1% 0.293 322.896)",700:"oklch(51.8% 0.253 323.949)",800:"oklch(45.2% 0.211 324.591)",900:"oklch(40.1% 0.17 325.612)",950:"oklch(29.3% 0.136 325.661)"},pink:{50:"oklch(97.1% 0.014 343.198)",100:"oklch(94.8% 0.028 342.258)",200:"oklch(89.9% 0.061 343.231)",300:"oklch(82.3% 0.12 346.018)",400:"oklch(71.8% 0.202 349.761)",500:"oklch(65.6% 0.241 354.308)",600:"oklch(59.2% 0.249 0.584)",700:"oklch(52.5% 0.223 3.958)",800:"oklch(45.9% 0.187 3.815)",900:"oklch(40.8% 0.153 2.432)",950:"oklch(28.4% 0.109 3.907)"},rose:{50:"oklch(96.9% 0.015 12.422)",100:"oklch(94.1% 0.03 12.58)",200:"oklch(89.2% 0.058 10.001)",300:"oklch(81% 0.117 11.638)",400:"oklch(71.2% 0.194 13.428)",500:"oklch(64.5% 0.246 16.439)",600:"oklch(58.6% 0.253 17.585)",700:"oklch(51.4% 0.222 16.935)",800:"oklch(45.5% 0.188 13.697)",900:"oklch(41% 0.159 10.272)",950:"oklch(27.1% 0.105 12.094)"},light:{50:"oklch(99.4% 0 0)",100:"oklch(99.11% 0 0)",200:"oklch(98.51% 0 0)",300:"oklch(98.16% 0.0017 247.84)",400:"oklch(97.31% 0 0)",500:"oklch(96.12% 0 0)",600:"oklch(96.32% 0.0034 247.86)",700:"oklch(94.17% 0.0052 247.88)",800:"oklch(91.09% 0.007 247.9)",900:"oklch(90.72% 0.0051 228.82)",950:"oklch(89.23% 0.006 239.83)"},dark:{50:"oklch(40.91% 0 0)",100:"oklch(35.62% 0 0)",200:"oklch(31.71% 0 0)",300:"oklch(29.72% 0 0)",400:"oklch(25.2% 0 0)",500:"oklch(23.93% 0 0)",600:"oklch(22.73% 0.0038 286.09)",700:"oklch(22.21% 0 0)",800:"oklch(20.9% 0 0)",900:"oklch(16.84% 0 0)",950:"oklch(13.44% 0 0)"}};Object.values(Of).forEach(e=>{typeof e!="string"&&e!==void 0&&(e.DEFAULT=e.DEFAULT||e[400])});wk={DEFAULT:["0 1px 3px 0 rgb(0 0 0 / 0.1)","0 1px 2px -1px rgb(0 0 0 / 0.1)"],"2xs":"0 1px rgb(0 0 0 / 0.05)",xs:"0 1px 2px 0 rgb(0 0 0 / 0.05)",sm:["0 1px 3px 0 rgb(0 0 0 / 0.1)","0 1px 2px -1px rgb(0 0 0 / 0.1)"],md:["0 4px 6px -1px rgb(0 0 0 / 0.1)","0 2px 4px -2px rgb(0 0 0 / 0.1)"],lg:["0 10px 15px -3px rgb(0 0 0 / 0.1)","0 4px 6px -4px rgb(0 0 0 / 0.1)"],xl:["0 20px 25px -5px rgb(0 0 0 / 0.1)","0 8px 10px -6px rgb(0 0 0 / 0.1)"],"2xl":"0 25px 50px -12px rgb(0 0 0 / 0.25)",none:"0 0 rgb(0 0 0 / 0)",inner:"inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"},lf={sm:"40rem",md:"48rem",lg:"64rem",xl:"80rem","2xl":"96rem"},kk={font:{sans:["ui-sans-serif","system-ui","-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial",'"Noto Sans"',"sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"','"Noto Color Emoji"'].join(","),serif:["ui-serif","Georgia","Cambria",'"Times New Roman"',"Times","serif"].join(","),mono:["ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas",'"Liberation Mono"','"Courier New"',"monospace"].join(",")},colors:Of,spacing:{DEFAULT:"0.25rem",xs:"0.75rem",sm:"0.875rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem","5xl":"3rem","6xl":"3.75rem","7xl":"4.5rem","8xl":"6rem","9xl":"8rem"},breakpoint:lf,verticalBreakpoint:{...lf},text:{xs:{fontSize:"0.75rem",lineHeight:"1rem"},sm:{fontSize:"0.875rem",lineHeight:"1.25rem"},base:{fontSize:"1rem",lineHeight:"1.5rem"},lg:{fontSize:"1.125rem",lineHeight:"1.75rem"},xl:{fontSize:"1.25rem",lineHeight:"1.75rem"},"2xl":{fontSize:"1.5rem",lineHeight:"2rem"},"3xl":{fontSize:"1.875rem",lineHeight:"2.25rem"},"4xl":{fontSize:"2.25rem",lineHeight:"2.5rem"},"5xl":{fontSize:"3rem",lineHeight:"1"},"6xl":{fontSize:"3.75rem",lineHeight:"1"},"7xl":{fontSize:"4.5rem",lineHeight:"1"},"8xl":{fontSize:"6rem",lineHeight:"1"},"9xl":{fontSize:"8rem",lineHeight:"1"}},fontWeight:{thin:"100",extralight:"200",light:"300",normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},tracking:{tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},leading:{none:"1",tight:"1.25",snug:"1.375",normal:"1.5",relaxed:"1.625",loose:"2"},textStrokeWidth:{DEFAULT:"1.5rem",none:"0",sm:"thin",md:"medium",lg:"thick"},radius:{DEFAULT:"0.25rem",none:"0",xs:"0.125rem",sm:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem","3xl":"1.5rem","4xl":"2rem"},shadow:wk,insetShadow:{"2xs":"inset 0 1px rgb(0 0 0 / 0.05)",xs:"inset 0 1px 1px rgb(0 0 0 / 0.05)",sm:"inset 0 2px 4px rgb(0 0 0 / 0.05)",none:"0 0 rgb(0 0 0 / 0)"},dropShadow:{DEFAULT:["0 1px 2px rgb(0 0 0 / 0.1)","0 1px 1px rgb(0 0 0 / 0.06)"],xs:"0 1px 1px rgb(0 0 0 / 0.05)",sm:"0 1px 2px rgb(0 0 0 / 0.15)",md:"0 3px 3px rgb(0 0 0 / 0.12)",lg:"0 4px 4px rgb(0 0 0 / 0.15)",xl:"0 9px 7px rgb(0 0 0 / 0.1)","2xl":"0 25px 25px rgb(0 0 0 / 0.15)"},textShadow:{none:"0 0 rgb(0 0 0 / 0)","2xs":"0 1px 0 rgb(0 0 0 / 0.15)",xs:"0 1px 1px rgb(0 0 0 / 0.2)",sm:["0 1px 0 rgb(0 0 0 / 0.075)","0 1px 1px rgb(0 0 0 / 0.075)","0 2px 2px rgb(0 0 0 / 0.075)"],md:["0 1px 1px rgb(0 0 0 / 0.1)","0 1px 2px rgb(0 0 0 / 0.1)","0 2px 4px rgb(0 0 0 / 0.1)"],lg:["0 1px 2px rgb(0 0 0 / 0.1)","0 3px 2px rgb(0 0 0 / 0.1)","0 4px 8px rgb(0 0 0 / 0.1)"]},ease:{linear:"linear",in:"cubic-bezier(0.4, 0, 1, 1)",out:"cubic-bezier(0, 0, 0.2, 1)","in-out":"cubic-bezier(0.4, 0, 0.2, 1)",DEFAULT:"cubic-bezier(0.4, 0, 0.2, 1)"},animation:{keyframes:{pulse:"{0%, 100% {opacity:1} 50% {opacity:.5}}",bounce:"{0%, 100% {transform:translateY(-25%);animation-timing-function:cubic-bezier(0.8,0,1,1)} 50% {transform:translateY(0);animation-timing-function:cubic-bezier(0,0,0.2,1)}}",spin:"{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",ping:"{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}","bounce-alt":"{from,20%,53%,80%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);transform:translate3d(0,0,0)}40%,43%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-30px,0)}70%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-15px,0)}90%{transform:translate3d(0,-4px,0)}}",flash:"{from,50%,to{opacity:1}25%,75%{opacity:0}}","pulse-alt":"{from{transform:scale3d(1,1,1)}50%{transform:scale3d(1.05,1.05,1.05)}to{transform:scale3d(1,1,1)}}","rubber-band":"{from{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,0.75,1)}40%{transform:scale3d(0.75,1.25,1)}50%{transform:scale3d(1.15,0.85,1)}65%{transform:scale3d(0.95,1.05,1)}75%{transform:scale3d(1.05,0.95,1)}to{transform:scale3d(1,1,1)}}","shake-x":"{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}","shake-y":"{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(0,-10px,0)}20%,40%,60%,80%{transform:translate3d(0,10px,0)}}","head-shake":"{0%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}50%{transform:translateX(0)}}",swing:"{20%{transform:rotate3d(0,0,1,15deg)}40%{transform:rotate3d(0,0,1,-10deg)}60%{transform:rotate3d(0,0,1,5deg)}80%{transform:rotate3d(0,0,1,-5deg)}to{transform:rotate3d(0,0,1,0deg)}}",tada:"{from{transform:scale3d(1,1,1)}10%,20%{transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scale3d(1,1,1)}}",wobble:"{from{transform:translate3d(0,0,0)}15%{transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{transform:translate3d(0,0,0)}}",jello:"{from,11.1%,to{transform:translate3d(0,0,0)}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg)skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}","heart-beat":"{0%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}",hinge:"{0%{transform-origin:top left;animation-timing-function:ease-in-out}20%,60%{transform:rotate3d(0,0,1,80deg);transform-origin:top left;animation-timing-function:ease-in-out}40%,80%{transform:rotate3d(0,0,1,60deg);transform-origin:top left;animation-timing-function:ease-in-out}to{transform:translate3d(0,700px,0);opacity:0}}","jack-in-the-box":"{from{opacity:0;transform-origin:center bottom;transform:scale(0.1) rotate(30deg)}50%{transform:rotate(-10deg)}70%{transform:rotate(3deg)}to{transform:scale(1)}}","light-speed-in-left":"{from{opacity:0;transform:translate3d(-100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}","light-speed-in-right":"{from{opacity:0;transform:translate3d(100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}","light-speed-out-left":"{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0) skewX(30deg)}}","light-speed-out-right":"{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) skewX(30deg)}}",flip:"{from{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,-360deg);animation-timing-function:ease-out}40%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);animation-timing-function:ease-out}50%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);animation-timing-function:ease-in}80%{transform:perspective(400px) scale3d(0.95,0.95,0.95) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}to{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}}","flip-in-x":"{from{transform:perspective(400px) rotate3d(1,0,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1,0,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{transform:perspective(400px)}}","flip-in-y":"{from{transform:perspective(400px) rotate3d(0,1,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(0,1,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{transform:perspective(400px)}}","flip-out-x":"{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}","flip-out-y":"{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}","rotate-in":"{from{transform-origin:center;transform:rotate3d(0,0,1,-200deg);opacity:0}to{transform-origin:center;transform:translate3d(0,0,0);opacity:1}}","rotate-in-down-left":"{from{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}to{transform-origin:left bottom;transform:translate3d(0,0,0);opacity:1}}","rotate-in-down-right":"{from{transform-origin:right bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}","rotate-in-up-left":"{from{transform-origin:left top;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:left top;transform:translate3d(0,0,0);opacity:1}}","rotate-in-up-right":"{from{transform-origin:right bottom;transform:rotate3d(0,0,1,-90deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}","rotate-out":"{from{transform-origin:center;opacity:1}to{transform-origin:center;transform:rotate3d(0,0,1,200deg);opacity:0}}","rotate-out-down-left":"{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,45deg);opacity:0}}","rotate-out-down-right":"{from{transform-origin:right bottom;opacity:1}to{transform-origin:right bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}","rotate-out-up-left":"{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}","rotate-out-up-right":"{from{transform-origin:right bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,90deg);opacity:0}}","roll-in":"{from{opacity:0;transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;transform:translate3d(0,0,0)}}","roll-out":"{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}","zoom-in":"{from{opacity:0;transform:scale3d(0.3,0.3,0.3)}50%{opacity:1}}","zoom-in-down":"{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}","zoom-in-left":"{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}","zoom-in-right":"{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}","zoom-in-up":"{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}","zoom-out":"{from{opacity:1}50%{opacity:0;transform:scale3d(0.3,0.3,0.3)}to{opacity:0}}","zoom-out-down":"{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}","zoom-out-left":"{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(-2000px,0,0);transform-origin:left center}}","zoom-out-right":"{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(2000px,0,0);transform-origin:right center}}","zoom-out-up":"{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}","bounce-in":"{from,20%,40%,60%,80%,to{animation-timing-function:ease-in-out}0%{opacity:0;transform:scale3d(0.3,0.3,0.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(0.9,0.9,0.9)}60%{transform:scale3d(1.03,1.03,1.03);opacity:1}80%{transform:scale3d(0.97,0.97,0.97)}to{opacity:1;transform:scale3d(1,1,1)}}","bounce-in-down":"{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:translate3d(0,0,0)}}","bounce-in-left":"{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:translate3d(0,0,0)}}","bounce-in-right":"{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:translate3d(0,0,0)}}","bounce-in-up":"{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translate3d(0,0,0)}}","bounce-out":"{20%{transform:scale3d(0.9,0.9,0.9)}50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}to{opacity:0;transform:scale3d(0.3,0.3,0.3)}}","bounce-out-down":"{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}","bounce-out-left":"{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}","bounce-out-right":"{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}","bounce-out-up":"{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}","slide-in-down":"{from{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}","slide-in-left":"{from{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}","slide-in-right":"{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}","slide-in-up":"{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}","slide-out-down":"{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}","slide-out-left":"{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}","slide-out-right":"{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}","slide-out-up":"{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}","fade-in":"{from{opacity:0}to{opacity:1}}","fade-in-down":"{from{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-down-big":"{from{opacity:0;transform:translate3d(0,-2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-left":"{from{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-left-big":"{from{opacity:0;transform:translate3d(-2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-right":"{from{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-right-big":"{from{opacity:0;transform:translate3d(2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-up":"{from{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-up-big":"{from{opacity:0;transform:translate3d(0,2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-top-left":"{from{opacity:0;transform:translate3d(-100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-top-right":"{from{opacity:0;transform:translate3d(100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-bottom-left":"{from{opacity:0;transform:translate3d(-100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-in-bottom-right":"{from{opacity:0;transform:translate3d(100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}","fade-out":"{from{opacity:1}to{opacity:0}}","fade-out-down":"{from{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}","fade-out-down-big":"{from{opacity:1}to{opacity:0;transform:translate3d(0,2000px,0)}}","fade-out-left":"{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}","fade-out-left-big":"{from{opacity:1}to{opacity:0;transform:translate3d(-2000px,0,0)}}","fade-out-right":"{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}","fade-out-right-big":"{from{opacity:1}to{opacity:0;transform:translate3d(2000px,0,0)}}","fade-out-up":"{from{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}","fade-out-up-big":"{from{opacity:1}to{opacity:0;transform:translate3d(0,-2000px,0)}}","fade-out-top-left":"{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,-100%,0)}}","fade-out-top-right":"{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,-100%,0)}}","fade-out-bottom-left":"{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,100%,0)}}","fade-out-bottom-right":"{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,100%,0)}}","back-in-up":"{0%{opacity:0.7;transform:translateY(1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}","back-in-down":"{0%{opacity:0.7;transform:translateY(-1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}","back-in-right":"{0%{opacity:0.7;transform:translateX(2000px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}","back-in-left":"{0%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}80%{opacity:0.7;transform:translateX(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}","back-out-up":"{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}","back-out-down":"{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(700px) scale(0.7)}}","back-out-right":"{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateX(2000px) scale(0.7)}}","back-out-left":"{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}"},durations:{pulse:"2s","heart-beat":"1.3s","bounce-in":"0.75s","bounce-out":"0.75s","flip-out-x":"0.75s","flip-out-y":"0.75s",hinge:"2s"},timingFns:{pulse:"cubic-bezier(0.4,0,.6,1)",ping:"cubic-bezier(0,0,.2,1)","head-shake":"ease-in-out","heart-beat":"ease-in-out","pulse-alt":"ease-in-out","light-speed-in-left":"ease-out","light-speed-in-right":"ease-out","light-speed-out-left":"ease-in","light-speed-out-right":"ease-in"},properties:{"bounce-alt":{"transform-origin":"center bottom"},jello:{"transform-origin":"center"},swing:{"transform-origin":"top center"},flip:{"backface-visibility":"visible"},"flip-in-x":{"backface-visibility":"visible !important"},"flip-in-y":{"backface-visibility":"visible !important"},"flip-out-x":{"backface-visibility":"visible !important"},"flip-out-y":{"backface-visibility":"visible !important"},"rotate-in":{"transform-origin":"center"},"rotate-in-down-left":{"transform-origin":"left bottom"},"rotate-in-down-right":{"transform-origin":"right bottom"},"rotate-in-up-left":{"transform-origin":"left bottom"},"rotate-in-up-right":{"transform-origin":"right bottom"},"rotate-out":{"transform-origin":"center"},"rotate-out-down-left":{"transform-origin":"left bottom"},"rotate-out-down-right":{"transform-origin":"right bottom"},"rotate-out-up-left":{"transform-origin":"left bottom"},"rotate-out-up-right":{"transform-origin":"right bottom"},hinge:{"transform-origin":"top left"},"zoom-out-down":{"transform-origin":"center bottom"},"zoom-out-left":{"transform-origin":"left center"},"zoom-out-right":{"transform-origin":"right center"},"zoom-out-up":{"transform-origin":"center bottom"}},counts:{spin:"infinite",ping:"infinite",pulse:"infinite","pulse-alt":"infinite",bounce:"infinite","bounce-alt":"infinite"},category:{pulse:"Attention Seekers",bounce:"Attention Seekers",spin:"Attention Seekers",ping:"Attention Seekers","bounce-alt":"Attention Seekers",flash:"Attention Seekers","pulse-alt":"Attention Seekers","rubber-band":"Attention Seekers","shake-x":"Attention Seekers","shake-y":"Attention Seekers","head-shake":"Attention Seekers",swing:"Attention Seekers",tada:"Attention Seekers",wobble:"Attention Seekers",jello:"Attention Seekers","heart-beat":"Attention Seekers",hinge:"Specials","jack-in-the-box":"Specials","light-speed-in-left":"Lightspeed","light-speed-in-right":"Lightspeed","light-speed-out-left":"Lightspeed","light-speed-out-right":"Lightspeed",flip:"Flippers","flip-in-x":"Flippers","flip-in-y":"Flippers","flip-out-x":"Flippers","flip-out-y":"Flippers","rotate-in":"Rotating Entrances","rotate-in-down-left":"Rotating Entrances","rotate-in-down-right":"Rotating Entrances","rotate-in-up-left":"Rotating Entrances","rotate-in-up-right":"Rotating Entrances","rotate-out":"Rotating Exits","rotate-out-down-left":"Rotating Exits","rotate-out-down-right":"Rotating Exits","rotate-out-up-left":"Rotating Exits","rotate-out-up-right":"Rotating Exits","roll-in":"Specials","roll-out":"Specials","zoom-in":"Zooming Entrances","zoom-in-down":"Zooming Entrances","zoom-in-left":"Zooming Entrances","zoom-in-right":"Zooming Entrances","zoom-in-up":"Zooming Entrances","zoom-out":"Zooming Exits","zoom-out-down":"Zooming Exits","zoom-out-left":"Zooming Exits","zoom-out-right":"Zooming Exits","zoom-out-up":"Zooming Exits","bounce-in":"Bouncing Entrances","bounce-in-down":"Bouncing Entrances","bounce-in-left":"Bouncing Entrances","bounce-in-right":"Bouncing Entrances","bounce-in-up":"Bouncing Entrances","bounce-out":"Bouncing Exits","bounce-out-down":"Bouncing Exits","bounce-out-left":"Bouncing Exits","bounce-out-right":"Bouncing Exits","bounce-out-up":"Bouncing Exits","slide-in-down":"Sliding Entrances","slide-in-left":"Sliding Entrances","slide-in-right":"Sliding Entrances","slide-in-up":"Sliding Entrances","slide-out-down":"Sliding Exits","slide-out-left":"Sliding Exits","slide-out-right":"Sliding Exits","slide-out-up":"Sliding Exits","fade-in":"Fading Entrances","fade-in-down":"Fading Entrances","fade-in-down-big":"Fading Entrances","fade-in-left":"Fading Entrances","fade-in-left-big":"Fading Entrances","fade-in-right":"Fading Entrances","fade-in-right-big":"Fading Entrances","fade-in-up":"Fading Entrances","fade-in-up-big":"Fading Entrances","fade-in-top-left":"Fading Entrances","fade-in-top-right":"Fading Entrances","fade-in-bottom-left":"Fading Entrances","fade-in-bottom-right":"Fading Entrances","fade-out":"Fading Exits","fade-out-down":"Fading Exits","fade-out-down-big":"Fading Exits","fade-out-left":"Fading Exits","fade-out-left-big":"Fading Exits","fade-out-right":"Fading Exits","fade-out-right-big":"Fading Exits","fade-out-up":"Fading Exits","fade-out-up-big":"Fading Exits","fade-out-top-left":"Fading Exits","fade-out-top-right":"Fading Exits","fade-out-bottom-left":"Fading Exits","fade-out-bottom-right":"Fading Exits","back-in-up":"Back Entrances","back-in-down":"Back Entrances","back-in-right":"Back Entrances","back-in-left":"Back Entrances","back-out-up":"Back Exits","back-out-down":"Back Exits","back-out-right":"Back Exits","back-out-left":"Back Exits"}},blur:{DEFAULT:"8px",xs:"4px",sm:"8px",md:"12px",lg:"16px",xl:"24px","2xl":"40px","3xl":"64px"},perspective:{dramatic:"100px",near:"300px",normal:"500px",midrange:"800px",distant:"1200px"},property:{none:"none",all:"all",colors:["color","background-color","border-color","text-decoration-color","fill","stroke","--un-gradient-from","--un-gradient-via","--un-gradient-to"].join(","),opacity:"opacity",shadow:"box-shadow",transform:["transform","translate","scale","rotate"].join(","),get DEFAULT(){return[this.colors,this.opacity,this.shadow,this.transform,"filter","-webkit-backdrop-filter","backdrop-filter"].join(",")}},default:{transition:{duration:"150ms",timingFunction:"cubic-bezier(0.4, 0, 0.2, 1)"},font:{family:"var(--font-sans)",featureSettings:"var(--font-sans--font-feature-settings)",variationSettings:"var(--font-sans--font-variation-settings)"},monoFont:{family:"var(--font-mono)",featureSettings:"var(--font-mono--font-feature-settings)",variationSettings:"var(--font-mono--font-variation-settings)"}},container:{"3xs":"16rem","2xs":"18rem",xs:"20rem",sm:"24rem",md:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem",prose:"65ch"},aria:{busy:'busy="true"',checked:'checked="true"',disabled:'disabled="true"',expanded:'expanded="true"',hidden:'hidden="true"',pressed:'pressed="true"',readonly:'readonly="true"',required:'required="true"',selected:'selected="true"'},media:{portrait:"(orientation: portrait)",landscape:"(orientation: landscape)",os_dark:"(prefers-color-scheme: dark)",os_light:"(prefers-color-scheme: light)",motion_ok:"(prefers-reduced-motion: no-preference)",motion_not_ok:"(prefers-reduced-motion: reduce)",high_contrast:"(prefers-contrast: high)",low_contrast:"(prefers-contrast: low)",opacity_ok:"(prefers-reduced-transparency: no-preference)",opacity_not_ok:"(prefers-reduced-transparency: reduce)",use_data_ok:"(prefers-reduced-data: no-preference)",use_data_not_ok:"(prefers-reduced-data: reduce)",touch:"(hover: none) and (pointer: coarse)",stylus:"(hover: none) and (pointer: fine)",pointer:"(hover) and (pointer: coarse)",mouse:"(hover) and (pointer: fine)",hd_color:"(dynamic-range: high)"},supports:{grid:"(display: grid)"}},$k=/@media \(min-width: (.+)\)/,Sk=[[/^__container$/,(e,t)=>{let{theme:n,variantHandlers:s}=t,r=n.containers?.padding,i;i=ps(r)?r:r?.DEFAULT;let o=n.containers?.maxWidth,a;for(let c of s){let d=c.handle?.({},h=>h)?.parent;if(ps(d)){let h=d.match($k)?.[1];if(h){let f=co(t)??[],m=f.find(g=>g.size===h)?.point;o?m&&(a=o?.[m]):a=h,m&&!ps(r)&&(i=r?.[m]??i)}}}let l={"max-width":a};return s.length||(l.width="100%"),n.containers?.center&&(l["margin-left"]="auto",l["margin-right"]="auto"),r&&(l["padding-left"]=i,l["padding-right"]=i),l},{internal:!0}]],_k=[[/^(?:(\w+)[:-])?container$/,([,e],t)=>{let n=(co(t)??[]).map(r=>r.point);if(e){if(!n.includes(e))return;n=n.slice(n.indexOf(e))}let s=n.map(r=>`${r}:__container`);return e||s.unshift("__container"),s}]],Ak=[..._k],cf={mid:"middle",base:"baseline",btm:"bottom",baseline:"baseline",top:"top",start:"top",middle:"middle",bottom:"bottom",end:"bottom","text-top":"text-top","text-bottom":"text-bottom",sub:"sub",super:"super",...Object.fromEntries(Le.map(e=>[e,e]))},Ck=[[/^(?:vertical|align|v)-(.+)$/,([,e])=>({"vertical-align":cf[e]??k.bracket.cssvar.numberWithUnit(e)}),{autocomplete:[`(vertical|align|v)-(${Object.keys(cf).join("|")})`,"(vertical|align|v)-<percentage>"]}]],uf=["center","left","right","justify","start","end"],Ek=[...uf.map(e=>[`text-${e}`,{"text-align":e}]),...[...Le,...uf].map(e=>[`text-align-${e}`,{"text-align":e}])],Rk=[[/^(?:animate-)?keyframes-(.+)$/,([,e],{theme:t})=>{let n=t.animation?.keyframes?.[e];if(n)return[`@keyframes ${e}${n}`,{animation:e}]},{autocomplete:["animate-keyframes-$animation.keyframes","keyframes-$animation.keyframes"]}],[/^animate-(.+)$/,([,e],{theme:t})=>{let n=t.animation?.keyframes?.[e];if(n){let s=t.animation?.durations?.[e]??"1s",r=t.animation?.timingFns?.[e]??"linear",i=t.animation?.counts?.[e]??1,o=t.animation?.properties?.[e];return[`@keyframes ${e}${n}`,{animation:`${e} ${s} ${r} ${i}`,...o}]}return{animation:k.bracket.cssvar(e)}},{autocomplete:"animate-$animation.keyframes"}],[/^animate-name-(.+)/,([,e])=>({"animation-name":k.bracket.cssvar(e)??e})],[/^animate-duration-(.+)$/,([,e],{theme:t})=>({"animation-duration":t.duration?.[e||"DEFAULT"]??k.bracket.cssvar.time(e)}),{autocomplete:["animate-duration"]}],[/^animate-delay-(.+)$/,([,e],{theme:t})=>({"animation-delay":t.duration?.[e||"DEFAULT"]??k.bracket.cssvar.time(e)}),{autocomplete:["animate-delay"]}],[/^animate-ease(?:-(.+))?$/,([,e],{theme:t})=>({"animation-timing-function":t.ease?.[e||"DEFAULT"]??k.bracket.cssvar(e)}),{autocomplete:["animate-ease","animate-ease-$ease"]}],[/^animate-(fill-mode-|fill-|mode-)?(.+)$/,([,e,t])=>["none","forwards","backwards","both",e?Le:[]].includes(t)?{"animation-fill-mode":t}:void 0,{autocomplete:["animate-(fill|mode|fill-mode)","animate-(fill|mode|fill-mode)-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)","animate-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)"]}],[/^animate-(direction-)?(.+)$/,([,e,t])=>["normal","reverse","alternate","alternate-reverse",e?Le:[]].includes(t)?{"animation-direction":t}:void 0,{autocomplete:["animate-direction","animate-direction-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)","animate-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)"]}],[/^animate-(?:iteration-count-|iteration-|count-)(.+)$/,([,e])=>({"animation-iteration-count":k.bracket.cssvar(e)??e.replace(/-/g,",")}),{autocomplete:["animate-(iteration|count|iteration-count)","animate-(iteration|count|iteration-count)-<num>"]}],[/^animate-(play-state-|play-|state-)?(.+)$/,([,e,t])=>["paused","running",e?Le:[]].includes(t)?{"animation-play-state":t}:void 0,{autocomplete:["animate-(play|state|play-state)","animate-(play|state|play-state)-(paused|running|inherit|initial|revert|revert-layer|unset)","animate-(paused|running|inherit|initial|revert|revert-layer|unset)"]}],["animate-none",{animation:"none"}],...ge("animate","animation")],df={"gradient-position":Z("--un-gradient-position"),"gradient-from":Z("--un-gradient-from",{syntax:"<color>",initialValue:"#0000"}),"gradient-via":Z("--un-gradient-via",{syntax:"<color>",initialValue:"#0000"}),"gradient-to":Z("--un-gradient-to",{syntax:"<color>",initialValue:"#0000"}),"gradient-stops":Z("--un-gradient-stops"),"gradient-via-stops":Z("--un-gradient-via-stops"),"gradient-from-position":Z("--un-gradient-from-position",{syntax:"<length-percentage>",initialValue:"0%"}),"gradient-via-position":Z("--un-gradient-via-position",{syntax:"<length-percentage>",initialValue:"50%"}),"gradient-to-position":Z("--un-gradient-to-position",{syntax:"<length-percentage>",initialValue:"100%"})};Ik=[[/^bg-(linear|radial|conic)-([^/]+)(?:\/(.+))?$/,([,e,t,n])=>{let s;if(s=k.number(t)!=null?`from ${k.number(t)}deg ${hf(n)};`:k.bracket(t),s)return{"--un-gradient-position":s,"background-image":`${e}-gradient(var(--un-gradient-stops))`}},{autocomplete:["bg-(linear|radial|conic)","(from|to|via)-$colors","(from|to|via)-(op|opacity)","(from|to|via)-(op|opacity)-<percent>"]}],[/^(from|via|to|stops)-(.+)$/,function*([,e,t],{theme:n}){let s={},r=lo(t,n);if(r){let{color:i,keys:o,alpha:a}=r;if(i){if(Object.values(ao).includes(i))s[`--un-gradient-${e}`]=i;else{s[`--un-${e}-opacity`]=a;let l=o?Oe("colors",o):i;s[`--un-gradient-${e}`]=`color-mix(in oklab, ${l} var(--un-${e}-opacity), transparent)`,yield Z(`--un-${e}-opacity`,{syntax:"<percentage>",initialValue:"100%"})}o&&fe("colors",o),n&&uo(i,n)}}else s[`--un-gradient-${e}`]=k.bracket.cssvar(t);if(s[`--un-gradient-${e}`]){switch(e){case"from":case"to":yield{...s,"--un-gradient-stops":"var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))"};break;case"via":yield{...s,"--un-gradient-via-stops":"var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-via) var(--un-gradient-via-position), var(--un-gradient-to) var(--un-gradient-to-position)","--un-gradient-stops":"var(--un-gradient-via-stops)"};break;case"stops":yield{...s}}for(let i of Object.values(df))yield i}}],[/^(from|via|to)-op(?:acity)?-?(.+)$/,([,e,t])=>({[`--un-${e}-opacity`]:k.bracket.percent(t)})],[/^(from|via|to)-([\d.]+%)$/,function*([,e,t]){yield{[`--un-gradient-${e}-position`]:`${k.bracket.cssvar.percent(t)}`};for(let n of Object.values(df))yield n}],[/^bg-((?:repeating-)?(?:linear|radial|conic))$/,([,e])=>({"background-image":`${e}-gradient(var(--un-gradient, var(--un-gradient-stops, rgb(255 255 255 / 0))))`}),{autocomplete:["bg-gradient-repeating","bg-gradient-(linear|radial|conic)","bg-gradient-repeating-(linear|radial|conic)"]}],[/^bg-(linear|radial|conic)(?:-to-([rltb]{1,2}))?(?:\/(.+))?$/,([,e,t,n])=>({"--un-gradient-position":`${t in st?`to ${st[t]} `:" "}${hf(n)}`,"background-image":`${e}-gradient(var(--un-gradient-stops))`}),{autocomplete:`bg-gradient-to-(${Object.keys(st).filter(e=>e.length<=2&&Array.from(e).every(t=>"rltb".includes(t))).join("|")})`}],["bg-none",{"background-image":"none"}],["box-decoration-slice",{"box-decoration-break":"slice"}],["box-decoration-clone",{"box-decoration-break":"clone"}],...ge("box-decoration","box-decoration-break"),["bg-auto",{"background-size":"auto"}],["bg-cover",{"background-size":"cover"}],["bg-contain",{"background-size":"contain"}],[/^bg-size-(.+)$/,([,e])=>({"background-size":k.bracket.cssvar(e)})],["bg-fixed",{"background-attachment":"fixed"}],["bg-local",{"background-attachment":"local"}],["bg-scroll",{"background-attachment":"scroll"}],["bg-clip-border",{"-webkit-background-clip":"border-box","background-clip":"border-box"}],["bg-clip-content",{"-webkit-background-clip":"content-box","background-clip":"content-box"}],["bg-clip-padding",{"-webkit-background-clip":"padding-box","background-clip":"padding-box"}],["bg-clip-text",{"-webkit-background-clip":"text","background-clip":"text"}],...Le.map(e=>[`bg-clip-${e}`,{"-webkit-background-clip":e,"background-clip":e}]),[/^bg-([-\w]{3,})$/,([,e])=>({"background-position":st[e]})],["bg-repeat",{"background-repeat":"repeat"}],["bg-no-repeat",{"background-repeat":"no-repeat"}],["bg-repeat-x",{"background-repeat":"repeat-x"}],["bg-repeat-y",{"background-repeat":"repeat-y"}],["bg-repeat-round",{"background-repeat":"round"}],["bg-repeat-space",{"background-repeat":"space"}],...ge("bg-repeat","background-repeat"),["bg-origin-border",{"background-origin":"border-box"}],["bg-origin-padding",{"background-origin":"padding-box"}],["bg-origin-content",{"background-origin":"content-box"}],...ge("bg-origin","background-origin")],pf=[[/^outline-(?:width-|size-)?(.+)$/,ff,{autocomplete:"outline-(width|size)-<num>"}],[/^outline-(?:color-)?(.+)$/,function*(e,t){if(fr(k.bracket(e[1])))yield*ff(e);else{let n=ze("outline-color","outline")(e,t);if(n)for(let s of n)yield s}},{autocomplete:"outline-$colors"}],[/^outline-op(?:acity)?-?(.+)$/,([,e])=>({"--un-outline-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"outline-(op|opacity)-<percent>"}],[/^outline-offset-(.+)$/,([,e])=>({"outline-offset":k.bracket.cssvar.global.px(e)}),{autocomplete:"outline-(offset)-<num>"}],["outline-offset-none",{"outline-offset":"0"}],["outline",[{"outline-style":"var(--un-outline-style)","outline-width":"1px"},Z("--un-outline-style",{initialValue:"solid"})]],["outline-hidden",[{"outline-style":"none"},{[dn.parent]:"@media (forced-colors: active)",outline:"2px solid transparent","outline-offset":"2px"}]],["outline-none",{"--un-outline-style":"none","outline-style":"none"}],...["auto","dashed","dotted","double","solid","groove","ridge","inset","outset",...Le].map(e=>[`outline-${e}`,{"--un-outline-style":e,"outline-style":e}])];mf=[[/^will-change-(.+)/,([,e])=>({"will-change":Tk(e)})]],vl={disc:"disc",circle:"circle",square:"square",decimal:"decimal","zero-decimal":"decimal-leading-zero",greek:"lower-greek",roman:"lower-roman","upper-roman":"upper-roman",alpha:"lower-alpha","upper-alpha":"upper-alpha",latin:"lower-latin","upper-latin":"upper-latin"},Pk=[[/^list-(.+?)(?:-(outside|inside))?$/,([,e,t])=>{let n=vl[e];if(n)return t?{"list-style-position":t,"list-style-type":n}:{"list-style-type":n}},{autocomplete:[`list-(${Object.keys(vl).join("|")})`,`list-(${Object.keys(vl).join("|")})-(outside|inside)`]}],["list-outside",{"list-style-position":"outside"}],["list-inside",{"list-style-position":"inside"}],["list-none",{"list-style-type":"none"}],[/^list-image-(.+)$/,([,e])=>{if(/^\[url\(.+\)\]$/.test(e))return{"list-style-image":k.bracket(e)}}],["list-image-none",{"list-style-image":"none"}],...ge("list","list-style-type")],Mk=[[/^accent-(.+)$/,ze("accent-color","accent"),{autocomplete:"accent-$colors"}],[/^accent-op(?:acity)?-?(.+)$/,([,e])=>({"--un-accent-opacity":k.bracket.percent(e)}),{autocomplete:["accent-(op|opacity)","accent-(op|opacity)-<percent>"]}]],jk=[[/^caret-(.+)$/,ze("caret-color","caret"),{autocomplete:"caret-$colors"}],[/^caret-op(?:acity)?-?(.+)$/,([,e])=>({"--un-caret-opacity":k.bracket.percent(e)}),{autocomplete:["caret-(op|opacity)","caret-(op|opacity)-<percent>"]}]],Fk=[["overscroll-auto",{"overscroll-behavior":"auto"}],["overscroll-contain",{"overscroll-behavior":"contain"}],["overscroll-none",{"overscroll-behavior":"none"}],...ge("overscroll","overscroll-behavior"),["overscroll-x-auto",{"overscroll-behavior-x":"auto"}],["overscroll-x-contain",{"overscroll-behavior-x":"contain"}],["overscroll-x-none",{"overscroll-behavior-x":"none"}],...ge("overscroll-x","overscroll-behavior-x"),["overscroll-y-auto",{"overscroll-behavior-y":"auto"}],["overscroll-y-contain",{"overscroll-behavior-y":"contain"}],["overscroll-y-none",{"overscroll-behavior-y":"none"}],...ge("overscroll-y","overscroll-behavior-y")],Dk=[["scroll-auto",{"scroll-behavior":"auto"}],["scroll-smooth",{"scroll-behavior":"smooth"}],...ge("scroll","scroll-behavior")],Hn=["solid","dashed","dotted","double","hidden","none","groove","ridge","inset","outset",...Le],Ok=[[/^(?:border|b)()(?:-(.+))?$/,wt,{autocomplete:"(border|b)-<directions>"}],[/^(?:border|b)-([xy])(?:-(.+))?$/,wt],[/^(?:border|b)-([rltbse])(?:-(.+))?$/,wt],[/^(?:border|b)-(block|inline)(?:-(.+))?$/,wt],[/^(?:border|b)-([bi][se])(?:-(.+))?$/,wt],[/^(?:border|b)-()(?:width|size)-(.+)$/,wt,{autocomplete:["(border|b)-<num>","(border|b)-<directions>-<num>"]}],[/^(?:border|b)-([xy])-(?:width|size)-(.+)$/,wt],[/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/,wt],[/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/,wt],[/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/,wt],[/^(?:border|b)-()(?:color-)?(.+)$/,ar,{autocomplete:["(border|b)-$colors","(border|b)-<directions>-$colors"]}],[/^(?:border|b)-([xy])-(?:color-)?(.+)$/,ar],[/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/,ar],[/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/,ar],[/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/,ar],[/^(?:border|b)-()op(?:acity)?-?(.+)$/,lr,{autocomplete:"(border|b)-(op|opacity)-<percent>"}],[/^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/,lr],[/^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/,lr],[/^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/,lr],[/^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/,lr],[/^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/,cr,{autocomplete:["(border|b)-(rounded|rd)","(border|b)-(rounded|rd)-$radius","(rounded|rd)","(rounded|rd)-$radius"]}],[/^(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(.+))?$/,cr],[/^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/,cr],[/^(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(.+))?$/,cr],[/^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/,cr],[/^(?:border|b)-(?:style-)?()(.+)$/,ur,{autocomplete:["(border|b)-style",`(border|b)-(${Hn.join("|")})`,"(border|b)-<directions>-style",`(border|b)-<directions>-(${Hn.join("|")})`,`(border|b)-<directions>-style-(${Hn.join("|")})`,`(border|b)-style-(${Hn.join("|")})`]}],[/^(?:border|b)-([xy])-(?:style-)?(.+)$/,ur],[/^(?:border|b)-([rltbse])-(?:style-)?(.+)$/,ur],[/^(?:border|b)-(block|inline)-(?:style-)?(.+)$/,ur],[/^(?:border|b)-([bi][se])-(?:style-)?(.+)$/,ur]];Lk=[[/^op(?:acity)?-?(.+)$/,([,e])=>({opacity:k.bracket.percent.cssvar(e)})]],zk=/^\[url\(.+\)\]$/,Uk=/^\[(?:length|size):.+\]$/,Nk=/^\[position:.+\]$/,Vk=/^\[(?:linear|conic|radial)-gradient\(.+\)\]$/,Bk=/^\[image:.+\]$/,Wk=[[/^bg-(.+)$/,(...e)=>{let t=e[0][1];if(zk.test(t))return{"--un-url":k.bracket(t),"background-image":"var(--un-url)"};if(Uk.test(t)&&k.bracketOfLength(t)!=null)return{"background-size":k.bracketOfLength(t).split(" ").map(s=>k.fraction.auto.px.cssvar(s)??s).join(" ")};if((n=t)[0]==="["&&n.slice(-1)==="]"&&(n=n.slice(1,-1)),(Ml.test(n)||hr.test(n)||Nk.test(t))&&k.bracketOfPosition(t)!=null)return{"background-position":k.bracketOfPosition(t).split(" ").map(s=>k.position.fraction.auto.px.cssvar(s)??s).join(" ")};var n;if(Vk.test(t)||Bk.test(t)){let s=k.bracket(t);if(s)return{"background-image":(s.startsWith("http")?`url(${s})`:k.cssvar(s))??s}}return ze("background-color","bg")(...e)},{autocomplete:"bg-$colors"}],[/^bg-op(?:acity)?-?(.+)$/,([,e])=>({"--un-bg-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"bg-(op|opacity)-<percent>"}]],qk=[[/^columns-(.+)$/,([,e])=>({columns:k.bracket.global.number.auto.numberWithUnit(e)}),{autocomplete:"columns-<num>"}],["break-before-auto",{"break-before":"auto"}],["break-before-avoid",{"break-before":"avoid"}],["break-before-all",{"break-before":"all"}],["break-before-avoid-page",{"break-before":"avoid-page"}],["break-before-page",{"break-before":"page"}],["break-before-left",{"break-before":"left"}],["break-before-right",{"break-before":"right"}],["break-before-column",{"break-before":"column"}],...ge("break-before"),["break-inside-auto",{"break-inside":"auto"}],["break-inside-avoid",{"break-inside":"avoid"}],["break-inside-avoid-page",{"break-inside":"avoid-page"}],["break-inside-avoid-column",{"break-inside":"avoid-column"}],...ge("break-inside"),["break-after-auto",{"break-after":"auto"}],["break-after-avoid",{"break-after":"avoid"}],["break-after-all",{"break-after":"all"}],["break-after-avoid-page",{"break-after":"avoid-page"}],["break-after-page",{"break-after":"page"}],["break-after-left",{"break-after":"left"}],["break-after-right",{"break-after":"right"}],["break-after-column",{"break-after":"column"}],...ge("break-after")],gf=["solid","double","dotted","dashed","wavy",...Le],Hk=[[/^(?:decoration-)?(underline|overline|line-through)$/,([,e])=>({"text-decoration-line":e}),{autocomplete:"decoration-(underline|overline|line-through)"}],[/^(?:underline|decoration)-(?:size-)?(.+)$/,bf,{autocomplete:"(underline|decoration)-<num>"}],[/^(?:underline|decoration)-(auto|from-font)$/,([,e])=>({"text-decoration-thickness":e}),{autocomplete:"(underline|decoration)-(auto|from-font)"}],[/^(?:underline|decoration)-(.+)$/,function(e,t){if(fr(k.bracket(e[1])))return bf(e);let n=ze("text-decoration-color","line")(e,t);if(n){let s=n[0];return s["-webkit-text-decoration-color"]=s["text-decoration-color"],n}},{autocomplete:"(underline|decoration)-$colors"}],[/^(?:underline|decoration)-op(?:acity)?-?(.+)$/,([,e])=>({"--un-line-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"(underline|decoration)-(op|opacity)-<percent>"}],[/^(?:underline|decoration)-offset-(.+)$/,([,e])=>({"text-underline-offset":k.auto.bracket.cssvar.global.px(e)}),{autocomplete:"(underline|decoration)-(offset)-<num>"}],...gf.map(e=>[`underline-${e}`,{"text-decoration-style":e}]),...gf.map(e=>[`decoration-${e}`,{"text-decoration-style":e}]),["no-underline",{"text-decoration":"none"}],["decoration-none",{"text-decoration":"none"}]];Yk=[[/^pa?()-?(.+)$/,De("padding"),{autocomplete:["(m|p)<num>","(m|p)-<num>"]}],[/^p-?xy()()$/,De("padding"),{autocomplete:"(m|p)-(xy)"}],[/^p-?([xy])(?:-?(.+))?$/,De("padding")],[/^p-?([rltbse])(?:-?(.+))?$/,De("padding"),{autocomplete:"(m|p)<directions>-<num>"}],[/^p-(block|inline)(?:-(.+))?$/,De("padding"),{autocomplete:"(m|p)-(block|inline)-<num>"}],[/^p-?([bi][se])(?:-?(.+))?$/,De("padding"),{autocomplete:"(m|p)-(bs|be|is|ie)-<num>"}]],Qk=[[/^ma?()-?(.+)$/,De("margin")],[/^m-?xy()()$/,De("margin")],[/^m-?([xy])(?:-?(.+))?$/,De("margin")],[/^m-?([rltbse])(?:-?(.+))?$/,De("margin")],[/^m-(block|inline)(?:-(.+))?$/,De("margin")],[/^m-?([bi][se])(?:-?(.+))?$/,De("margin")]],Kk=[[/^space-([xy])-(.+)$/,function*([,e,t],{theme:n,symbols:s}){let r,i=lt(t);if(i!=null?(fe("spacing"),r=`calc(var(--spacing) * ${i})`):r=n.spacing?.[t]??k.bracket.cssvar.auto.fraction.rem(t||"1"),r!=null){let o=at[e==="x"?"inline":"block"].map((a,l)=>[`margin${a}`,` calc(${r} * ${l===0?`var(--un-space-${e}-reverse)`:`calc(1 - var(--un-space-${e}-reverse))`})`]);o&&(yield{[s.selector]:Yn,[`--un-space-${e}-reverse`]:"0",...Object.fromEntries(o)},yield Z(`--un-space-${e}-reverse`,{initialValue:0}))}},{autocomplete:["space-(x|y)","space-(x|y)-reverse","space-(x|y)-$spacing"]}],[/^space-([xy])-reverse$/,function*([,e],{symbols:t}){yield{[t.selector]:Yn,[`--un-space-${e}-reverse`]:"1"},yield Z(`--un-space-${e}-reverse`,{initialValue:0})}]];Gk=[[/^divide-(.+)$/,function*(e,t){let n=ze("border-color","divide")(e,t);n&&(yield{[t.symbols.selector]:Yn,...n[0]},yield n[1])},{autocomplete:"divide-$colors"}],[/^divide-op(?:acity)?-?(.+)$/,function*([,e],{symbols:t}){yield{[t.selector]:Yn,"--un-divide-opacity":k.bracket.percent(e)}},{autocomplete:["divide-(op|opacity)","divide-(op|opacity)-<percent>"]}],[/^divide-?([xy])$/,yf,{autocomplete:["divide-(x|y)","divide-(x|y)-reverse"]}],[/^divide-?([xy])-?(.+)$/,yf],[/^divide-?([xy])-reverse$/,function*([,e],{symbols:t}){yield{[t.selector]:Yn,[`--un-divide-${e}-reverse`]:"1"},yield Z(`--un-divide-${e}-reverse`,{initialValue:0})}],[new RegExp(`^divide-(${Hn.join("|")})$`),function*([,e],{symbols:t}){yield{[t.selector]:Yn,"border-style":e}},{autocomplete:Hn.map(e=>`divide-${e}`)}]];Lf=["blur","brightness","contrast","grayscale","hue-rotate","invert","saturate","sepia","drop-shadow"],Rl=Lf.map(e=>Z(`--un-${e}`)),ro=Lf.map(e=>`var(--un-${e},)`).join(" "),zf=["backdrop-blur","backdrop-brightness","backdrop-contrast","backdrop-grayscale","backdrop-hue-rotate","backdrop-invert","backdrop-opacity","backdrop-saturate","backdrop-sepia"],Jk=zf.map(e=>Z(`--un-${e}`)),oo=zf.map(e=>`var(--un-${e},)`).join(" ");Xk=[[/^(?:(backdrop-)|filter-)?blur(?:-(.+))?$/,Jt("blur",(e,t)=>t.blur?.[e||"DEFAULT"]||k.bracket.cssvar.px(e)),{autocomplete:["(backdrop|filter)-blur-$blur","blur-$blur","filter-blur"]}],[/^(?:(backdrop-)|filter-)?brightness-(.+)$/,Jt("brightness",e=>k.bracket.cssvar.percent(e)),{autocomplete:["(backdrop|filter)-brightness-<percent>","brightness-<percent>"]}],[/^(?:(backdrop-)|filter-)?contrast-(.+)$/,Jt("contrast",e=>k.bracket.cssvar.percent(e)),{autocomplete:["(backdrop|filter)-contrast-<percent>","contrast-<percent>"]}],[/^(?:filter-)?drop-shadow(?:-(.+))?$/,function([,e],{theme:t}){let n=t.dropShadow?.[e||"DEFAULT"];if(n!=null)return[{"--un-drop-shadow":`drop-shadow(${Fl(n,"--un-drop-shadow-color").join(") drop-shadow(")})`,filter:ro},...Rl];if(n=k.bracket.cssvar(e)??(e==="none"?"":void 0),n!=null)return[{"--un-drop-shadow":n&&`drop-shadow(${n})`,filter:ro},...Rl]},{autocomplete:["filter-drop","filter-drop-shadow","filter-drop-shadow-color","drop-shadow","drop-shadow-color","filter-drop-shadow-$dropShadow","drop-shadow-$dropShadow","filter-drop-shadow-color-$colors","drop-shadow-color-$colors","filter-drop-shadow-color-(op|opacity)","drop-shadow-color-(op|opacity)","filter-drop-shadow-color-(op|opacity)-<percent>","drop-shadow-color-(op|opacity)-<percent>"]}],[/^(?:filter-)?drop-shadow-color-(.+)$/,ze("--un-drop-shadow-color","drop-shadow")],[/^(?:filter-)?drop-shadow-color-op(?:acity)?-?(.+)$/,([,e])=>({"--un-drop-shadow-opacity":k.bracket.percent(e)})],[/^(?:(backdrop-)|filter-)?grayscale(?:-(.+))?$/,Jt("grayscale",wl),{autocomplete:["(backdrop|filter)-grayscale","(backdrop|filter)-grayscale-<percent>","grayscale-<percent>"]}],[/^(?:(backdrop-)|filter-)?hue-rotate-(.+)$/,Jt("hue-rotate",e=>k.bracket.cssvar.degree(e))],[/^(?:(backdrop-)|filter-)?invert(?:-(.+))?$/,Jt("invert",wl),{autocomplete:["(backdrop|filter)-invert","(backdrop|filter)-invert-<percent>","invert-<percent>"]}],[/^(backdrop-)op(?:acity)?-(.+)$/,Jt("opacity",e=>k.bracket.cssvar.percent(e)),{autocomplete:["backdrop-(op|opacity)","backdrop-(op|opacity)-<percent>"]}],[/^(?:(backdrop-)|filter-)?saturate-(.+)$/,Jt("saturate",e=>k.bracket.cssvar.percent(e)),{autocomplete:["(backdrop|filter)-saturate","(backdrop|filter)-saturate-<percent>","saturate-<percent>"]}],[/^(?:(backdrop-)|filter-)?sepia(?:-(.+))?$/,Jt("sepia",wl),{autocomplete:["(backdrop|filter)-sepia","(backdrop|filter)-sepia-<percent>","sepia-<percent>"]}],["filter",{filter:ro}],["backdrop-filter",{"-webkit-backdrop-filter":oo,"backdrop-filter":oo}],["filter-none",{filter:"none"}],["backdrop-filter-none",{"-webkit-backdrop-filter":"none","backdrop-filter":"none"}],...Le.map(e=>[`filter-${e}`,{filter:e}]),...Le.map(e=>[`backdrop-filter-${e}`,{"-webkit-backdrop-filter":e,"backdrop-filter":e}])],Zk=[["flex",{display:"flex"}],["inline-flex",{display:"inline-flex"}],["flex-inline",{display:"inline-flex"}],[/^flex-(.*)$/,([,e])=>({flex:k.bracket(e)!=null?k.bracket(e).split(" ").map(t=>k.cssvar.fraction(t)??t).join(" "):k.cssvar.fraction(e)})],["flex-1",{flex:"1 1 0%"}],["flex-auto",{flex:"1 1 auto"}],["flex-initial",{flex:"0 1 auto"}],["flex-none",{flex:"none"}],[/^(?:flex-)?shrink(?:-(.*))?$/,([,e=""])=>({"flex-shrink":k.bracket.cssvar.number(e)??1}),{autocomplete:["flex-shrink-<num>","shrink-<num>"]}],[/^(?:flex-)?grow(?:-(.*))?$/,([,e=""])=>({"flex-grow":k.bracket.cssvar.number(e)??1}),{autocomplete:["flex-grow-<num>","grow-<num>"]}],[/^(?:flex-)?basis-(.+)$/,([,e])=>{let t=lt(e);return t!=null?(fe("spacing"),{"flex-basis":`calc(var(--spacing) * ${t})`}):{"flex-basis":k.bracket.cssvar.auto.fraction.rem(e)}},{autocomplete:["flex-basis-$spacing","basis-$spacing"]}],["flex-row",{"flex-direction":"row"}],["flex-row-reverse",{"flex-direction":"row-reverse"}],["flex-col",{"flex-direction":"column"}],["flex-col-reverse",{"flex-direction":"column-reverse"}],["flex-wrap",{"flex-wrap":"wrap"}],["flex-wrap-reverse",{"flex-wrap":"wrap-reverse"}],["flex-nowrap",{"flex-wrap":"nowrap"}]],xf={"":"",x:"column-",y:"row-",col:"column-",row:"row-"};e$=[[/^(?:flex-|grid-)?gap-?()(.+)$/,kl,{autocomplete:["gap-$spacing","gap-<num>"]}],[/^(?:flex-|grid-)?gap-([xy])-?(.+)$/,kl,{autocomplete:["gap-(x|y)-$spacing","gap-(x|y)-<num>"]}],[/^(?:flex-|grid-)?gap-(col|row)-?(.+)$/,kl,{autocomplete:["gap-(col|row)-$spacing","gap-(col|row)-<num>"]}]];n$=[["grid",{display:"grid"}],["inline-grid",{display:"inline-grid"}],[/^(?:grid-)?(row|col)-(.+)$/,([,e,t])=>({[`grid-${Pt(e)}`]:k.bracket.number.cssvar.auto(t)})],[/^(?:grid-)?(row|col)-span-(.+)$/,([,e,t])=>{if(t==="full")return{[`grid-${Pt(e)}`]:"1/-1"};let n=k.bracket.number.cssvar(t);return n!=null?{[`grid-${Pt(e)}`]:`span ${n}/span ${n}`}:void 0},{autocomplete:"(grid-row|grid-col|row|col)-span-<num>"}],[/^(?:grid-)?(row|col)-start-(.+)$/,([,e,t])=>({[`grid-${Pt(e)}-start`]:k.bracket.cssvar(t)??t})],[/^(?:grid-)?(row|col)-end-(.+)$/,([,e,t])=>({[`grid-${Pt(e)}-end`]:k.bracket.cssvar(t)??t}),{autocomplete:"(grid-row|grid-col|row|col)-(start|end)-<num>"}],[/^(?:grid-)?auto-(rows|cols)-(.+)$/,([,e,t])=>({[`grid-auto-${Pt(e)}`]:t$(t)}),{autocomplete:"(grid-auto|auto)-(rows|cols)-<num>"}],[/^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/,([,e])=>({"grid-auto-flow":k.bracket.cssvar(e)})],[/^(?:grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)$/,([,e])=>({"grid-auto-flow":Pt(e).replace("-"," ")}),{autocomplete:["(grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)"]}],[/^(?:grid-)?(rows|cols)-(.+)$/,([,e,t])=>({[`grid-template-${Pt(e)}`]:k.bracket.cssvar(t)})],[/^(?:grid-)?(rows|cols)-minmax-([\w.-]+)$/,([,e,t])=>({[`grid-template-${Pt(e)}`]:`repeat(auto-fill,minmax(${t},1fr))`})],[/^(?:grid-)?(rows|cols)-(\d+)$/,([,e,t])=>({[`grid-template-${Pt(e)}`]:`repeat(${t},minmax(0,1fr))`}),{autocomplete:"(grid-rows|grid-cols|rows|cols)-<num>"}],[/^grid-area(s)?-(.+)$/,([,e,t])=>e!=null?{"grid-template-areas":k.cssvar(t)??t.split("-").map(n=>`"${k.bracket(n)}"`).join(" ")}:{"grid-area":k.bracket.cssvar(t)}],["grid-rows-none",{"grid-template-rows":"none"}],["grid-cols-none",{"grid-template-columns":"none"}],["grid-rows-subgrid",{"grid-template-rows":"subgrid"}],["grid-cols-subgrid",{"grid-template-columns":"subgrid"}]],eo=["auto","hidden","clip","visible","scroll","overlay",...Le],s$=[[/^(?:overflow|of)-(.+)$/,([,e])=>eo.includes(e)?{overflow:e}:void 0,{autocomplete:[`(overflow|of)-(${eo.join("|")})`,`(overflow|of)-(x|y)-(${eo.join("|")})`]}],[/^(?:overflow|of)-([xy])-(.+)$/,([,e,t])=>eo.includes(t)?{[`overflow-${e}`]:t}:void 0]],Il={t:["top"],b:["bottom"],l:["left"],r:["right"],x:["left","right"],y:["top","bottom"]},vf="linear-gradient(#fff, #fff)",r$={"mask-image":"var(--un-mask-linear), var(--un-mask-radial), var(--un-mask-conic)","mask-composite":"intersect"};i$=[["mask-clip-border",{"mask-clip":"border-box"}],["mask-clip-padding",{"mask-clip":"padding-box"}],["mask-clip-content",{"mask-clip":"content-box"}],["mask-clip-fill",{"mask-clip":"fill-box"}],["mask-clip-stroke",{"mask-clip":"stroke-box"}],["mask-clip-view",{"mask-clip":"view-box"}],["mask-no-clip",{"mask-clip":"no-clip"}],["mask-add",{"mask-composite":"add"}],["mask-subtract",{"mask-composite":"subtract"}],["mask-intersect",{"mask-composite":"intersect"}],["mask-exclude",{"mask-composite":"exclude"}],[/^mask-(.+)$/,([,e])=>({"mask-image":k.bracket.cssvar(e)})],[/^mask-(linear|radial|conic|[xytblr])-(from|to)()(?:-(.+))?$/,$l,{autocomplete:["mask-(linear|radial|conic)-(from|to)-$colors","mask-(linear|radial|conic)-(from|to)-<percentage>","mask-(linear|radial|conic)-(from|to)","mask-(linear|radial|conic)-<percent>","mask-(x|y|t|b|l|r)-(from|to)-$colors","mask-(x|y|t|b|l|r)-(from|to)-<percentage>","mask-(x|y|t|b|l|r)-(from|to)","mask-(x|y|t|b|l|r)-<percent>"]}],[/^mask-(linear|radial|conic)-(from|to)?-?(.*)$/,$l],[/^mask-([trblxy])-(from|to)-(.*)$/,$l],["mask-none",{"mask-image":"none"}],["mask-radial-circle",{"--un-mask-radial-shape":"circle"}],["mask-radial-ellipse",{"--un-mask-radial-shape":"ellipse"}],["mask-radial-closest-side",{"--un-mask-radial-size":"closest-side"}],["mask-radial-closest-corner",{"--un-mask-radial-size":"closest-corner"}],["mask-radial-farthest-side",{"--un-mask-radial-size":"farthest-side"}],["mask-radial-farthest-corner",{"--un-mask-radial-size":"farthest-corner"}],[/^mask-radial-at-([-\w]{3,})$/,([,e])=>({"--un-mask-radial-position":st[e]}),{autocomplete:[`mask-radial-at-(${Object.keys(st).filter(e=>e.length>2).join("|")})`]}],["mask-alpha",{"mask-mode":"alpha"}],["mask-luminance",{"mask-mode":"luminance"}],["mask-match",{"mask-mode":"match-source"}],["mask-origin-border",{"mask-origin":"border-box"}],["mask-origin-padding",{"mask-origin":"padding-box"}],["mask-origin-content",{"mask-origin":"content-box"}],["mask-origin-fill",{"mask-origin":"fill-box"}],["mask-origin-stroke",{"mask-origin":"stroke-box"}],["mask-origin-view",{"mask-origin":"view-box"}],[/^mask-([rltb]{1,2})$/,wf],[/^mask-([-\w]{3,})$/,([,e])=>({"mask-position":st[e]})],[/^mask-(?:position-|pos-)(.+)$/,wf],["mask-repeat",{"mask-repeat":"repeat"}],["mask-no-repeat",{"mask-repeat":"no-repeat"}],["mask-repeat-x",{"mask-repeat":"repeat-x"}],["mask-repeat-y",{"mask-repeat":"repeat-y"}],["mask-repeat-space",{"mask-repeat":"space"}],["mask-repeat-round",{"mask-repeat":"round"}],["mask-auto",{"mask-size":"auto"}],["mask-cover",{"mask-size":"cover"}],["mask-contain",{"mask-size":"contain"}],[/^mask-size-(.+)$/,function([,e=""]){let t=k.bracket.cssvar.global.fraction.rem(e);if(t!==null)return{"mask-size":t}}],["mask-type-luminance",{"mask-type":"luminance"}],["mask-type-alpha",{"mask-type":"alpha"}]],o$=[[/^\$ placeholder-(.+)$/,ze("color","placeholder"),{autocomplete:"placeholder-$colors"}],[/^\$ placeholder-op(?:acity)?-?(.+)$/,([,e])=>({"--un-placeholder-opacity":k.bracket.percent(e)}),{autocomplete:["placeholder-(op|opacity)","placeholder-(op|opacity)-<percent>"]}]],a$=[[/^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/,([,e])=>({position:e}),{autocomplete:["(position|pos)-<position>","(position|pos)-<globalKeyword>","<position>"]}],[/^(?:position-|pos-)([-\w]+)$/,([,e])=>Le.includes(e)?{position:e}:void 0],[/^(?:position-|pos-)?(static)$/,([,e])=>({position:e})]],Uf=[["justify-start",{"justify-content":"flex-start"}],["justify-end",{"justify-content":"flex-end"}],["justify-center",{"justify-content":"center"}],["justify-between",{"justify-content":"space-between"}],["justify-around",{"justify-content":"space-around"}],["justify-evenly",{"justify-content":"space-evenly"}],["justify-stretch",{"justify-content":"stretch"}],["justify-left",{"justify-content":"left"}],["justify-right",{"justify-content":"right"}],["justify-center-safe",{"justify-content":"safe center"}],["justify-end-safe",{"justify-content":"safe flex-end"}],["justify-normal",{"justify-content":"normal"}],...ge("justify","justify-content"),["justify-items-start",{"justify-items":"start"}],["justify-items-end",{"justify-items":"end"}],["justify-items-center",{"justify-items":"center"}],["justify-items-stretch",{"justify-items":"stretch"}],["justify-items-center-safe",{"justify-items":"safe center"}],["justify-items-end-safe",{"justify-items":"safe flex-end"}],...ge("justify-items"),["justify-self-auto",{"justify-self":"auto"}],["justify-self-start",{"justify-self":"start"}],["justify-self-end",{"justify-self":"end"}],["justify-self-center",{"justify-self":"center"}],["justify-self-stretch",{"justify-self":"stretch"}],["justify-self-baseline",{"justify-self":"baseline"}],["justify-self-center-safe",{"justify-self":"safe center"}],["justify-self-end-safe",{"justify-self":"safe flex-end"}],...ge("justify-self")],l$=[[/^order-(.+)$/,([,e])=>({order:k.bracket.cssvar.number(e)})],["order-first",{order:"calc(-infinity)"}],["order-last",{order:"calc(infinity)"}],["order-none",{order:"0"}]],Nf=[["content-center",{"align-content":"center"}],["content-start",{"align-content":"flex-start"}],["content-end",{"align-content":"flex-end"}],["content-between",{"align-content":"space-between"}],["content-around",{"align-content":"space-around"}],["content-evenly",{"align-content":"space-evenly"}],["content-baseline",{"align-content":"baseline"}],["content-center-safe",{"align-content":"safe center"}],["content-end-safe",{"align-content":"safe flex-end"}],["content-stretch",{"align-content":"stretch"}],["content-normal",{"align-content":"normal"}],...ge("content","align-content"),["items-start",{"align-items":"flex-start"}],["items-end",{"align-items":"flex-end"}],["items-center",{"align-items":"center"}],["items-baseline",{"align-items":"baseline"}],["items-stretch",{"align-items":"stretch"}],["items-baseline-last",{"align-items":"last baseline"}],["items-center-safe",{"align-items":"safe center"}],["items-end-safe",{"align-items":"safe flex-end"}],...ge("items","align-items"),["self-auto",{"align-self":"auto"}],["self-start",{"align-self":"flex-start"}],["self-end",{"align-self":"flex-end"}],["self-center",{"align-self":"center"}],["self-stretch",{"align-self":"stretch"}],["self-baseline",{"align-self":"baseline"}],["self-baseline-last",{"align-self":"last baseline"}],["self-center-safe",{"align-self":"safe center"}],["self-end-safe",{"align-self":"safe flex-end"}],...ge("self","align-self")],Vf=[["place-content-center",{"place-content":"center"}],["place-content-start",{"place-content":"start"}],["place-content-end",{"place-content":"end"}],["place-content-between",{"place-content":"space-between"}],["place-content-around",{"place-content":"space-around"}],["place-content-evenly",{"place-content":"space-evenly"}],["place-content-stretch",{"place-content":"stretch"}],["place-content-baseline",{"place-content":"baseline"}],["place-content-center-safe",{"place-content":"safe center"}],["place-content-end-safe",{"place-content":"safe flex-end"}],...ge("place-content"),["place-items-start",{"place-items":"start"}],["place-items-end",{"place-items":"end"}],["place-items-center",{"place-items":"center"}],["place-items-stretch",{"place-items":"stretch"}],["place-items-baseline",{"place-items":"baseline"}],["place-items-center-safe",{"place-items":"safe center"}],["place-items-end-safe",{"place-items":"safe flex-end"}],...ge("place-items"),["place-self-auto",{"place-self":"auto"}],["place-self-start",{"place-self":"start"}],["place-self-end",{"place-self":"end"}],["place-self-center",{"place-self":"center"}],["place-self-stretch",{"place-self":"stretch"}],["place-self-center-safe",{"place-self":"safe center"}],["place-self-end-safe",{"place-self":"safe flex-end"}],...ge("place-self")],c$=[...Uf,...Nf,...Vf].flatMap(([e,t])=>[[`flex-${e}`,t],[`grid-${e}`,t]]);u$=[[/^(?:position-|pos-)?inset-(.+)$/,([,e])=>({inset:Tl(e)}),{autocomplete:["(position|pos)-inset-<directions>-$spacing","(position|pos)-inset-(block|inline)-$spacing","(position|pos)-inset-(bs|be|is|ie)-$spacing","(position|pos)-(top|left|right|bottom)-$spacing"]}],[/^(?:position-|pos-)?(start|end)-(.+)$/,dr],[/^(?:position-|pos-)?inset-([xy])-(.+)$/,dr],[/^(?:position-|pos-)?inset-([rltbse])-(.+)$/,dr],[/^(?:position-|pos-)?inset-(block|inline)-(.+)$/,dr],[/^(?:position-|pos-)?inset-([bi][se])-(.+)$/,dr],[/^(?:position-|pos-)?(top|left|right|bottom)-(.+)$/,([,e,t])=>({[e]:Tl(t)})]],d$=[["float-left",{float:"left"}],["float-right",{float:"right"}],["float-start",{float:"inline-start"}],["float-end",{float:"inline-end"}],["float-none",{float:"none"}],...ge("float"),["clear-left",{clear:"left"}],["clear-right",{clear:"right"}],["clear-both",{clear:"both"}],["clear-start",{clear:"inline-start"}],["clear-end",{clear:"inline-end"}],["clear-none",{clear:"none"}],...ge("clear")],h$=[[/^(?:position-|pos-)?z([\d.]+)$/,([,e])=>({"z-index":k.number(e)})],[/^(?:position-|pos-)?z-(.+)$/,([,e])=>({"z-index":k.bracket.cssvar.global.auto.number(e)}),{autocomplete:"z-<num>"}]],p$=[["box-border",{"box-sizing":"border-box"}],["box-content",{"box-sizing":"content-box"}],...ge("box","box-sizing")],Pl={shadow:Z("--un-shadow",{initialValue:"0 0 #0000"}),shadowColor:Z("--un-shadow-color"),insetShadow:Z("--un-inset-shadow",{initialValue:"0 0 #0000"}),insetShadowColor:Z("--un-inset-shadow-color"),ringColor:Z("--un-ring-color"),ringShadow:Z("--un-ring-shadow",{initialValue:"0 0 #0000"}),insetRingColor:Z("--un-inset-ring-color"),insetRingShadow:Z("--un-inset-ring-shadow",{initialValue:"0 0 #0000"}),ringInset:Z("--un-ring-inset"),ringOffsetWidth:Z("--un-ring-offset-width",{syntax:"<length>",initialValue:"0px"}),ringOffsetColor:Z("--un-ring-offset-color"),ringOffsetShadow:Z("--un-ring-offset-shadow",{initialValue:"0 0 #0000"})},f$=[[/^shadow(?:-(.+))?$/,kf("shadow"),{autocomplete:["shadow-$colors","shadow-$shadow"]}],[/^shadow-op(?:acity)?-?(.+)$/,([,e])=>({"--un-shadow-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"shadow-(op|opacity)-<percent>"}],[/^inset-shadow(?:-(.+))?$/,kf("insetShadow"),{autocomplete:["inset-shadow-$colors","inset-shadow-$insetShadow"]}],[/^inset-shadow-op(?:acity)?-?(.+)$/,([,e])=>({"--un-inset-shadow-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"shadow-(op|opacity)-<percent>"}]];m$=[[/^ring(?:-(.+))?$/,([,e])=>{let t=k.bracket.px(e||"1");if(t!=null)return[{"--un-ring-shadow":`var(--un-ring-inset,) 0 0 0 calc(${t} + var(--un-ring-offset-width)) var(--un-ring-color, currentColor)`,"box-shadow":"var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"},...Object.values(Pl)]}],[/^ring-(.+)$/,ze("--un-ring-color","ring"),{autocomplete:"ring-$colors"}],[/^ring-op(?:acity)?-?(.+)$/,([,e])=>({"--un-ring-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"ring-(op|opacity)-<percent>"}],[/^inset-ring(?:-(.+))?$/,([,e])=>{let t=k.bracket.px(e||"1");if(t!=null)return[{"--un-inset-ring-shadow":`inset 0 0 0 ${t} var(--un-inset-ring-color, currentColor)`,"box-shadow":"var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"},...Object.values(Pl)]}],[/^inset-ring-(.+)$/,ze("--un-inset-ring-color","inset-ring"),{autocomplete:"inset-ring-$colors"}],[/^inset-ring-op(?:acity)?-?(.+)$/,([,e])=>({"--un-inset-ring-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"inset-ring-(op|opacity)-<percent>"}],[/^ring-offset(?:-(?:width-|size-)?(.+))?$/,([,e])=>{let t=k.bracket.cssvar.px(e||"1");if(t!=null)return{"--un-ring-offset-width":t,"--un-ring-offset-shadow":"var(--un-ring-inset,) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)"}},{autocomplete:"ring-offset-$colors"}],[/^ring-offset-(.+)$/,ze("--un-ring-offset-color","ring-offset"),{autocomplete:"ring-offset-$colors"}],[/^ring-offset-op(?:acity)?-?(.+)$/,([,e])=>({"--un-ring-offset-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"ring-offset-(op|opacity)-<percent>"}],["ring-inset",{"--un-ring-inset":"inset"}]],g$=[...["x","y","both"].map(e=>[`snap-${e}`,[{"scroll-snap-type":`${e} var(--un-scroll-snap-strictness)`},Z("--un-scroll-snap-strictness",{initialValue:"proximity"})]]),...["mandatory","proximity"].map(e=>[`snap-${e}`,[{"--un-scroll-snap-strictness":e},Z("--un-scroll-snap-strictness",{initialValue:"proximity"})]]),["snap-none",{"scroll-snap-type":"none"}],["snap-start",{"scroll-snap-align":"start"}],["snap-end",{"scroll-snap-align":"end"}],["snap-center",{"scroll-snap-align":"center"}],["snap-align-none",{"scroll-snap-align":"none"}],["snap-normal",{"scroll-snap-stop":"normal"}],["snap-always",{"scroll-snap-stop":"always"}],[/^scroll-ma?()-?(.+)$/,De("scroll-margin"),{autocomplete:["scroll-(m|p|ma|pa|block|inline)","scroll-(m|p|ma|pa|block|inline)-$spacing","scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)","scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)-$spacing"]}],[/^scroll-m-?([xy])-?(.+)$/,De("scroll-margin")],[/^scroll-m-?([rltb])-?(.+)$/,De("scroll-margin")],[/^scroll-m-(block|inline)-(.+)$/,De("scroll-margin")],[/^scroll-m-?([bi][se])-?(.+)$/,De("scroll-margin")],[/^scroll-pa?()-?(.+)$/,De("scroll-padding")],[/^scroll-p-?([xy])-?(.+)$/,De("scroll-padding")],[/^scroll-p-?([rltb])-?(.+)$/,De("scroll-padding")],[/^scroll-p-(block|inline)-(.+)$/,De("scroll-padding")],[/^scroll-p-?([bi][se])-?(.+)$/,De("scroll-padding")]],b$={h:"height",w:"width",inline:"inline-size",block:"block-size"};y$=[[/^size-(min-|max-)?(.+)$/,([,e,t],{theme:n})=>({[ks(e,"w")]:to(n,"w",t),[ks(e,"h")]:to(n,"h",t)})],[/^(?:size-)?(min-|max-)?([wh])-?(.+)$/,([,e,t,n],{theme:s})=>({[ks(e,t)]:to(s,t,n)})],[/^(?:size-)?(min-|max-)?(block|inline)-(.+)$/,([,e,t,n],{theme:s})=>({[ks(e,t)]:to(s,t,n)}),{autocomplete:["(w|h)-<num>","(w|h)-(full|screen|fit|max|min)","(max|min)-(w|h)-<num>","(max|min)-(w|h)-(full|screen|fit|max|min)","(block|inline)-<num>","(block|inline)-(full|screen|fit|max|min)","(max|min)-(w|h|block|inline)","(max|min)-(w|h|block|inline)-<num>","(max|min)-(w|h|block|inline)-(full|screen|fit|max|min)"]}],[/^(?:size-)?(min-|max-)?(h)-screen-(.+)$/,([,e,t,n],s)=>({[ks(e,t)]:$f(s,n,"verticalBreakpoint")})],[/^(?:size-)?(min-|max-)?(w)-screen-(.+)$/,([,e,t,n],s)=>({[ks(e,t)]:$f(s,n)}),{autocomplete:["(w|h)-screen","(min|max)-(w|h)-screen","h-screen-$breakpoint","(min|max)-h-screen-$breakpoint","w-screen-$breakpoint","(min|max)-w-screen-$breakpoint"]}]];v$=[[/^(?:size-)?aspect-(?:ratio-)?(.+)$/,([,e])=>({"aspect-ratio":x$(e)}),{autocomplete:["aspect-(square|video|ratio)","aspect-ratio-(square|video)"]}]],Sl=["size","layout","paint","style"],w$=[["inline",{display:"inline"}],["block",{display:"block"}],["inline-block",{display:"inline-block"}],["contents",{display:"contents"}],["flow-root",{display:"flow-root"}],["list-item",{display:"list-item"}],["hidden",{display:"none"}],[/^display-(.+)$/,([,e])=>({display:k.bracket.cssvar.global(e)})]],k$=[["visible",{visibility:"visible"}],["invisible",{visibility:"hidden"}],["collapse",{visibility:"collapse"}],["backface-visible",{"backface-visibility":"visible"}],["backface-hidden",{"backface-visibility":"hidden"}],...ge("backface","backface-visibility")],$$=[[/^cursor-(.+)$/,([,e])=>({cursor:k.bracket.cssvar.global(e)})],...["auto","default","none","context-menu","help","pointer","progress","wait","cell","crosshair","text","vertical-text","alias","copy","move","no-drop","not-allowed","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out"].map(e=>[`cursor-${e}`,{cursor:e}])],S$=[[/^contain-(.*)$/,([,e])=>k.bracket(e)!=null?{contain:k.bracket(e).split(" ").map(t=>k.cssvar.fraction(t)??t).join(" ")}:Sl.includes(e)?[{"--un-contain-size":e,contain:Sl.map(t=>`var(--un-contain-${t})`).join(" ")},...Sl.map(t=>Z(`--un-contain-${t}`))]:void 0],["contain-strict",{contain:"strict"}],["contain-content",{contain:"content"}],["contain-none",{contain:"none"}]],_$=[["pointer-events-auto",{"pointer-events":"auto"}],["pointer-events-none",{"pointer-events":"none"}],...ge("pointer-events")],A$=[["resize-x",{resize:"horizontal"}],["resize-y",{resize:"vertical"}],["resize",{resize:"both"}],["resize-none",{resize:"none"}],...ge("resize")],C$=[["select-auto",{"-webkit-user-select":"auto","user-select":"auto"}],["select-all",{"-webkit-user-select":"all","user-select":"all"}],["select-text",{"-webkit-user-select":"text","user-select":"text"}],["select-none",{"-webkit-user-select":"none","user-select":"none"}],...ge("select","user-select")],E$=[[/^(?:whitespace-|ws-)([-\w]+)$/,([,e])=>["normal","nowrap","pre","pre-line","pre-wrap","break-spaces",...Le].includes(e)?{"white-space":e}:void 0,{autocomplete:"(whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)"}]],R$=[[/^intrinsic-size-(.+)$/,([,e])=>({"contain-intrinsic-size":k.bracket.cssvar.global.fraction.rem(e)}),{autocomplete:"intrinsic-size-<num>"}],["content-visibility-visible",{"content-visibility":"visible"}],["content-visibility-hidden",{"content-visibility":"hidden"}],["content-visibility-auto",{"content-visibility":"auto"}],...ge("content-visibility")],I$=[[/^content-(.+)$/,([,e])=>{if(k.bracket.cssvar(e)!=null)return[{"--un-content":k.bracket.cssvar(e),content:"var(--un-content)"},Z("--un-content",{initialValue:'""'})]}],["content-empty",{content:'""'}],["content-none",{content:"none"}]],T$=[["case-upper",{"text-transform":"uppercase"}],["case-lower",{"text-transform":"lowercase"}],["case-capital",{"text-transform":"capitalize"}],["case-normal",{"text-transform":"none"}],["uppercase",{"text-transform":"uppercase"}],["lowercase",{"text-transform":"lowercase"}],["capitalize",{"text-transform":"capitalize"}],["normal-case",{"text-transform":"none"}],...ge("case","text-transform")],P$=[...["manual","auto","none",...Le].map(e=>[`hyphens-${e}`,{"-webkit-hyphens":e,"-ms-hyphens":e,hyphens:e}])],M$=[["write-vertical-right",{"writing-mode":"vertical-rl"}],["write-vertical-left",{"writing-mode":"vertical-lr"}],["write-normal",{"writing-mode":"horizontal-tb"}],...ge("write","writing-mode")],j$=[["write-orient-mixed",{"text-orientation":"mixed"}],["write-orient-sideways",{"text-orientation":"sideways"}],["write-orient-upright",{"text-orientation":"upright"}],...ge("write-orient","text-orientation")],F$=[["object-cover",{"object-fit":"cover"}],["object-contain",{"object-fit":"contain"}],["object-fill",{"object-fit":"fill"}],["object-scale-down",{"object-fit":"scale-down"}],["object-none",{"object-fit":"none"}],[/^object-(.+)$/,([,e])=>st[e]?{"object-position":st[e]}:k.bracketOfPosition(e)!=null?{"object-position":k.bracketOfPosition(e).split(" ").map(t=>k.position.fraction.auto.px.cssvar(t)??t).join(" ")}:void 0,{autocomplete:`object-(${Object.keys(st).join("|")})`}]],D$=[["bg-blend-multiply",{"background-blend-mode":"multiply"}],["bg-blend-screen",{"background-blend-mode":"screen"}],["bg-blend-overlay",{"background-blend-mode":"overlay"}],["bg-blend-darken",{"background-blend-mode":"darken"}],["bg-blend-lighten",{"background-blend-mode":"lighten"}],["bg-blend-color-dodge",{"background-blend-mode":"color-dodge"}],["bg-blend-color-burn",{"background-blend-mode":"color-burn"}],["bg-blend-hard-light",{"background-blend-mode":"hard-light"}],["bg-blend-soft-light",{"background-blend-mode":"soft-light"}],["bg-blend-difference",{"background-blend-mode":"difference"}],["bg-blend-exclusion",{"background-blend-mode":"exclusion"}],["bg-blend-hue",{"background-blend-mode":"hue"}],["bg-blend-saturation",{"background-blend-mode":"saturation"}],["bg-blend-color",{"background-blend-mode":"color"}],["bg-blend-luminosity",{"background-blend-mode":"luminosity"}],["bg-blend-normal",{"background-blend-mode":"normal"}],...ge("bg-blend","background-blend")],O$=[["mix-blend-multiply",{"mix-blend-mode":"multiply"}],["mix-blend-screen",{"mix-blend-mode":"screen"}],["mix-blend-overlay",{"mix-blend-mode":"overlay"}],["mix-blend-darken",{"mix-blend-mode":"darken"}],["mix-blend-lighten",{"mix-blend-mode":"lighten"}],["mix-blend-color-dodge",{"mix-blend-mode":"color-dodge"}],["mix-blend-color-burn",{"mix-blend-mode":"color-burn"}],["mix-blend-hard-light",{"mix-blend-mode":"hard-light"}],["mix-blend-soft-light",{"mix-blend-mode":"soft-light"}],["mix-blend-difference",{"mix-blend-mode":"difference"}],["mix-blend-exclusion",{"mix-blend-mode":"exclusion"}],["mix-blend-hue",{"mix-blend-mode":"hue"}],["mix-blend-saturation",{"mix-blend-mode":"saturation"}],["mix-blend-color",{"mix-blend-mode":"color"}],["mix-blend-luminosity",{"mix-blend-mode":"luminosity"}],["mix-blend-plus-lighter",{"mix-blend-mode":"plus-lighter"}],["mix-blend-normal",{"mix-blend-mode":"normal"}],...ge("mix-blend")],L$=[[/^fill-(.+)$/,ze("fill","fill"),{autocomplete:"fill-$colors"}],[/^fill-op(?:acity)?-?(.+)$/,([,e])=>({"--un-fill-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"fill-(op|opacity)-<percent>"}],["fill-none",{fill:"none"}],[/^stroke-(?:width-|size-)?(.+)$/,Sf],[/^stroke-dash-(.+)$/,([,e])=>({"stroke-dasharray":k.bracket.cssvar.number(e)}),{autocomplete:"stroke-dash-<num>"}],[/^stroke-offset-(.+)$/,([,e])=>({"stroke-dashoffset":k.bracket.cssvar.px.numberWithUnit(e)})],[/^stroke-(.+)$/,function(e,t){return fr(k.bracket(e[1]))?Sf(e):ze("stroke","stroke")(e,t)},{autocomplete:"stroke-$colors"}],[/^stroke-op(?:acity)?-?(.+)$/,([,e])=>({"--un-stroke-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"stroke-(op|opacity)-<percent>"}],["stroke-cap-square",{"stroke-linecap":"square"}],["stroke-cap-round",{"stroke-linecap":"round"}],["stroke-cap-auto",{"stroke-linecap":"butt"}],["stroke-join-arcs",{"stroke-linejoin":"arcs"}],["stroke-join-bevel",{"stroke-linejoin":"bevel"}],["stroke-join-clip",{"stroke-linejoin":"miter-clip"}],["stroke-join-round",{"stroke-linejoin":"round"}],["stroke-join-auto",{"stroke-linejoin":"miter"}],["stroke-none",{stroke:"none"}]];z$=[["inline-table",{display:"inline-table"}],["table",{display:"table"}],["table-caption",{display:"table-caption"}],["table-cell",{display:"table-cell"}],["table-column",{display:"table-column"}],["table-column-group",{display:"table-column-group"}],["table-footer-group",{display:"table-footer-group"}],["table-header-group",{display:"table-header-group"}],["table-row",{display:"table-row"}],["table-row-group",{display:"table-row-group"}],["border-collapse",{"border-collapse":"collapse"}],["border-separate",{"border-collapse":"separate"}],[/^border-spacing-(.+)$/,function*([,e],{theme:t}){let n=_f(e,t);if(n!=null){yield{"--un-border-spacing-x":n,"--un-border-spacing-y":n,"border-spacing":"var(--un-border-spacing-x) var(--un-border-spacing-y)"};for(let s of["x","y"])yield Z(`--un-border-spacing-${s}`,{syntax:"<length>",initialValue:"0"})}},{autocomplete:["border-spacing","border-spacing-$spacing"]}],[/^border-spacing-([xy])-(.+)$/,function*([,e,t],{theme:n}){let s=_f(t,n);if(s!=null){yield{[`--un-border-spacing-${e}`]:s,"border-spacing":"var(--un-border-spacing-x) var(--un-border-spacing-y)"};for(let r of["x","y"])yield Z(`--un-border-spacing-${r}`,{syntax:"<length>",initialValue:"0"})}},{autocomplete:["border-spacing-(x|y)","border-spacing-(x|y)-$spacing"]}],["caption-top",{"caption-side":"top"}],["caption-bottom",{"caption-side":"bottom"}],["table-auto",{"table-layout":"auto"}],["table-fixed",{"table-layout":"fixed"}],["table-empty-cells-visible",{"empty-cells":"show"}],["table-empty-cells-hidden",{"empty-cells":"hide"}]];_l="var(--un-pan-x) var(--un-pan-y) var(--un-pinch-zoom)",Al=["pan-x","pan-y","pinch-zoom"].map(e=>Z(`--un-${e}`)),U$=[[/^touch-pan-(x|left|right)$/,function*([,e]){yield{"--un-pan-x":`pan-${e}`,"touch-action":_l};for(let t of Al)yield t},{autocomplete:["touch-pan","touch-pan-(x|left|right|y|up|down)"]}],[/^touch-pan-(y|up|down)$/,function*([,e]){yield{"--un-pan-y":`pan-${e}`,"touch-action":_l};for(let t of Al)yield t}],[/^touch-pinch-zoom$/,function*(){yield{"--un-pinch-zoom":"pinch-zoom","touch-action":_l};for(let e of Al)yield e}],["touch-auto",{"touch-action":"auto"}],["touch-manipulation",{"touch-action":"manipulation"}],["touch-none",{"touch-action":"none"}],...ge("touch","touch-action")],no=["translate","rotate","scale"],Dl=["var(--un-rotate-x)","var(--un-rotate-y)","var(--un-rotate-z)","var(--un-skew-x)","var(--un-skew-y)"].join(" "),Ol=Dl,N$=["translateZ(0)",Dl].join(" "),V$=[[/^(?:transform-)?origin-(.+)$/,([,e])=>({"transform-origin":st[e]??k.bracket.cssvar(e)}),{autocomplete:[`transform-origin-(${Object.keys(st).join("|")})`,`origin-(${Object.keys(st).join("|")})`]}],[/^(?:transform-)?perspect(?:ive)?-(.+)$/,([,e],{theme:t})=>{let n;if(t.perspective?.[e]?(fe("perspective",e),n=Oe("perspective",e)):n=k.bracket.cssvar.px.numberWithUnit(e),n!=null)return{perspective:n}},{autocomplete:["transform-perspective-<num>","perspective-<num>","perspective-$perspective"]}],[/^(?:transform-)?perspect(?:ive)?-origin-(.+)$/,([,e])=>{let t=k.bracket.cssvar(e)??(e.length>=3?st[e]:void 0);if(t!=null)return{"perspective-origin":t}}],[/^(?:transform-)?translate-()(.+)$/,Af],[/^(?:transform-)?translate-([xyz])-(.+)$/,Af],[/^(?:transform-)?rotate-()(.+)$/,Ef],[/^(?:transform-)?rotate-([xyz])-(.+)$/,Ef],[/^(?:transform-)?skew-()(.+)$/,Rf],[/^(?:transform-)?skew-([xy])-(.+)$/,Rf,{autocomplete:["transform-skew-(x|y)-<percent>","skew-(x|y)-<percent>"]}],[/^(?:transform-)?scale-()(.+)$/,Cf],[/^(?:transform-)?scale-([xyz])-(.+)$/,Cf,{autocomplete:[`transform-(${no.join("|")})-<percent>`,`transform-(${no.join("|")})-(x|y|z)-<percent>`,`(${no.join("|")})-<percent>`,`(${no.join("|")})-(x|y|z)-<percent>`]}],["transform-3d",{"transform-style":"preserve-3d"}],["transform-flat",{"transform-style":"flat"}],[/^transform-(border|content|fill|stroke|view)$/,([,e])=>({"transform-box":`${e}-box`})],["transform",{transform:Ol}],["transform-cpu",{transform:Dl}],["transform-gpu",{transform:N$}],["transform-none",{transform:"none"}],...ge("transform")];B$=[[/^transition(?:-(\D+?))?(?:-(\d+))?$/,([,e,t],{theme:n})=>{fe("default",["transition","timingFunction"]),fe("default",["transition","duration"]);let s={"transition-property":n.property?.DEFAULT,"transition-timing-function":`var(--un-ease, ${Oe("default",["transition","timingFunction"])})`,"transition-duration":`var(--un-duration, ${Oe("default",["transition","duration"])})`};if(!e&&!t)return{...s};if(e!=null){let r=If(e,n);if(r)return{"--un-duration":t&&k.time(t),...s,"transition-property":r}}else if(t!=null)return{"--un-duration":k.time(t),...s}}],[/^(?:transition-)?duration-(.+)$/,([,e])=>({"--un-duration":k.bracket.cssvar.time(e),"transition-duration":k.bracket.cssvar.time(e)})],[/^(?:transition-)?delay-(.+)$/,([,e])=>({"transition-delay":k.bracket.cssvar.time(e)})],[/^(?:transition-)?ease(?:-(.+))?$/,([,e="DEFAULT"],{theme:t})=>{let n;return t.ease?.[e]?(fe("ease",e),n=Oe("ease",e)):n=k.bracket.cssvar(e),[{"--un-ease":n,"transition-timing-function":n},Z("--un-ease")]},{autocomplete:["transition-ease-(linear|in|out|in-out)","ease-(linear|in|out|in-out)"]}],[/^(?:transition-)?property-(.+)$/,([,e],{theme:t})=>{let n=k.global(e)||If(e,t);if(n)return{"transition-property":n}},{autocomplete:[`transition-property-(${[...Le].join("|")})`]}],["transition-none",{transition:"none"}],...ge("transition"),["transition-discrete",{"transition-behavior":"allow-discrete"}],["transition-normal",{"transition-behavior":"normal"}]],W$=[[/^text-(.+)$/,function([,e="base"],{theme:t}){let n=function(l,c){let[d,h]=ir(l,"[","]",["/",":"])??[];if(d!=null){let f=(d.match(jl)??[])[1];if(f==null||f===c)return[d,h]}}(e,"length");if(!n)return;let[s,r]=n,i=t.text?.[s],o;if(r&&(t.leading?.[r]?(fe("leading",r),o=Oe("leading",r)):o=k.bracket.cssvar.global.rem(r)),i)return fe("text",[s,"fontSize"]),fe("text",[s,"lineHeight"]),i.letterSpacing&&fe("text",[s,"letterSpacing"]),{"font-size":Oe("text",[s,"fontSize"]),"line-height":o??`var(--un-leading, ${Oe("text",[s,"lineHeight"])})`,"letter-spacing":i.letterSpacing?Oe("text",[s,"letterSpacing"]):void 0};let a=k.bracketOfLength.rem(s);return o&&a?{"font-size":a,"line-height":o}:{"font-size":k.bracketOfLength.rem(e)}},{autocomplete:"text-$text"}],[/^(?:text|font)-size-(.+)$/,Pf,{autocomplete:"text-size-$text"}],[/^text-(?:color-)?(.+)$/,function(e,t){return fr(k.bracket(e[1]))?Pf(e,t):ze("color","text")(e,t)},{autocomplete:"text-$colors"}],[/^(?:color|c)-(.+)$/,ze("color","text")],[/^(?:text|color|c)-(.+)$/,([,e])=>Le.includes(e)?{color:e}:void 0,{autocomplete:`(text|color|c)-(${Le.join("|")})`}],[/^(?:text|color|c)-op(?:acity)?-?(.+)$/,([,e])=>({"--un-text-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"(text|color|c)-(op|opacity)-<percent>"}],[/^fw-?([^-]+)$/,([,e],{theme:t})=>{let n;return t.fontWeight?.[e]?(fe("fontWeight",e),n=Oe("fontWeight",e)):n=k.bracket.cssvar.global.number(e),{"--un-font-weight":n,"font-weight":n}},{autocomplete:["(font|fw)-(100|200|300|400|500|600|700|800|900)","(font|fw)-$fontWeight"]}],[/^(?:font-)?(?:leading|lh|line-height)-(.+)$/,([,e],{theme:t})=>{let n;if(t.leading?.[e]?(fe("leading",e),n=Oe("leading",e)):lt(e)?(fe("spacing"),n=`calc(var(--spacing) * ${lt(e)})`):n=k.bracket.cssvar.global.rem(e),n!=null)return[{"--un-leading":n,"line-height":n},Z("--un-leading")]},{autocomplete:"(leading|lh|line-height)-$leading"}],["font-synthesis-weight",{"font-synthesis":"weight"}],["font-synthesis-style",{"font-synthesis":"style"}],["font-synthesis-small-caps",{"font-synthesis":"small-caps"}],["font-synthesis-none",{"font-synthesis":"none"}],[/^font-synthesis-(.+)$/,([,e])=>({"font-synthesis":k.bracket.cssvar.global(e)})],[/^(?:font-)?tracking-(.+)$/,([,e],{theme:t})=>{let n;return t.tracking?.[e]?(fe("tracking",e),n=Oe("tracking",e)):n=k.bracket.cssvar.global.rem(e),{"--un-tracking":n,"letter-spacing":n}},{autocomplete:"tracking-$tracking"}],[/^(?:font-)?word-spacing-(.+)$/,([,e],{theme:t})=>{let n=t.tracking?.[e]?Oe("tracking",e):k.bracket.cssvar.global.rem(e);return{"--un-word-spacing":n,"word-spacing":n}},{autocomplete:"word-spacing-$spacing"}],["font-stretch-normal",{"font-stretch":"normal"}],["font-stretch-ultra-condensed",{"font-stretch":"ultra-condensed"}],["font-stretch-extra-condensed",{"font-stretch":"extra-condensed"}],["font-stretch-condensed",{"font-stretch":"condensed"}],["font-stretch-semi-condensed",{"font-stretch":"semi-condensed"}],["font-stretch-semi-expanded",{"font-stretch":"semi-expanded"}],["font-stretch-expanded",{"font-stretch":"expanded"}],["font-stretch-extra-expanded",{"font-stretch":"extra-expanded"}],["font-stretch-ultra-expanded",{"font-stretch":"ultra-expanded"}],[/^font-stretch-(.+)$/,([,e])=>({"font-stretch":k.bracket.cssvar.fraction.global(e)}),{autocomplete:"font-stretch-<percentage>"}],[/^font-(.+)$/,([,e],{theme:t})=>{let n;if(t.font?.[e])return fe("font",e),n=Oe("font",e),{"font-family":n};if(t.fontWeight?.[e])return fe("fontWeight",e),n=Oe("fontWeight",e),{"--un-font-weight":n,"font-weight":n};if(n=k.number(e),n!=null)return{"--un-font-weight":n,"font-weight":n};if(n=k.bracketOfFamily(e),n!=null&&k.number(n)==null)return n=k.cssvar(n)??n,{"font-family":n};if(n=k.bracketOfNumber(e),n!=null)return n=k.cssvar.number(n),{"--un-font-weight":n,"font-weight":n};if(n=k.bracket(e),n!=null&&k.number(n)!=null){let s=k.number(n);return{"--un-font-weight":s,"font-weight":s}}return n=k.bracket.cssvar.global(e),n!=null?{"font-family":n}:void 0},{autocomplete:["font-$font","font-$fontWeight"]}]],q$=[[/^tab(?:-(.+))?$/,([,e])=>{let t=k.bracket.cssvar.global.number(e||"4");if(t!=null)return{"-moz-tab-size":t,"-o-tab-size":t,"tab-size":t}}]],H$=[[/^indent-(.+)$/,([,e])=>{let t=lt(e);return t!=null?(fe("spacing"),{"text-indent":`calc(var(--spacing) * ${t})`}):(t=k.bracket.cssvar.auto.global.rem(e),t!=null?{"text-indent":t}:void 0)}]],Y$=[[/^text-stroke(?:-(.+))?$/,([,e="DEFAULT"],{theme:t})=>(t.textStrokeWidth?.[e]&&fe("textStrokeWidth",e),{"-webkit-text-stroke-width":t.textStrokeWidth?.[e]?Oe("textStrokeWidth",e):k.bracket.cssvar.px(e)}),{autocomplete:"text-stroke-$textStrokeWidth"}],[/^text-stroke-(.+)$/,ze("-webkit-text-stroke-color","text-stroke"),{autocomplete:"text-stroke-$colors"}],[/^text-stroke-op(?:acity)?-?(.+)$/,([,e])=>({"--un-text-stroke-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"text-stroke-(op|opacity)-<percent>"}]],Tf=/op(?:acity)?-/,Q$=[[/^text-shadow(?:-(.+))?$/,(e,t)=>{let[n,s="DEFAULT"]=e,r=t.theme.textShadow?.[s];return r!=null?{"--un-text-shadow":Fl(r,"--un-text-shadow-color").join(","),"text-shadow":"var(--un-text-shadow)"}:Tf.test(s)?{"--un-text-shadow-opacity":k.bracket.percent.cssvar(s.replace(Tf,""))}:ze("--un-text-shadow-color","text-shadow")(e,t)??{"text-shadow":k.bracket.cssvar.global(s)}},{autocomplete:["text-shadow-$textShadow","text-shadow(-color)?-$colors","text-shadow(-color)?-(op|opacity)-<percent>"]}],[/^text-shadow-color-(.+)$/,ze("--un-text-shadow-color","text-shadow"),{autocomplete:"text-shadow-color-$colors"}],[/^text-shadow-color-op(?:acity)?-?(.+)$/,([,e])=>({"--un-text-shadow-opacity":k.bracket.percent.cssvar(e)}),{autocomplete:"text-shadow-color-(op|opacity)-<percent>"}]],pn=[Z("--un-ordinal"),Z("--un-slashed-zero"),Z("--un-numeric-figure"),Z("--un-numeric-spacing"),Z("--un-numeric-fraction")],fn={"font-variant-numeric":"var(--un-ordinal,) var(--un-slashed-zero,) var(--un-numeric-figure,) var(--un-numeric-spacing,) var(--un-numeric-fraction,)"},K$=[["ordinal",[{"--un-ordinal":"ordinal",...fn},...pn]],["slashed-zero",[{"--un-slashed-zero":"slashed-zero",...fn},...pn]],["lining-nums",[{"--un-numeric-figure":"lining-nums",...fn},...pn]],["oldstyle-nums",[{"--un-numeric-figure":"oldstyle-nums",...fn},...pn]],["proportional-nums",[{"--un-numeric-spacing":"proportional-nums",...fn},...pn]],["tabular-nums",[{"--un-numeric-spacing":"tabular-nums",...fn},...pn]],["diagonal-fractions",[{"--un-numeric-fraction":"diagonal-fractions",...fn},...pn]],["stacked-fractions",[{"--un-numeric-fraction":"stacked-fractions",...fn},...pn]],["normal-nums",[{"font-variant-numeric":"normal"}]]];G$={backface:"backface-visibility",break:"word-break",case:"text-transform",content:"align-content",fw:"font-weight",items:"align-items",justify:"justify-content",select:"user-select",self:"align-self",vertical:"vertical-align",visible:"visibility",whitespace:"white-space",ws:"white-space","bg-blend":"background-blend-mode","bg-clip":"-webkit-background-clip","bg-image":"background-image","bg-origin":"background-origin","bg-position":"background-position","bg-repeat":"background-repeat","bg-size":"background-size","mix-blend":"mix-blend-mode",object:"object-fit","object-position":"object-position",write:"writing-mode","write-orient":"text-orientation"},J$=[W$,q$,H$,Y$,Q$,Qk,Yk,Ek,Ck,[["appearance-auto",{"-webkit-appearance":"auto",appearance:"auto"}],["appearance-none",{"-webkit-appearance":"none",appearance:"none"}]],pf,mf,Pk,Mk,jk,[["image-render-auto",{"image-rendering":"auto"}],["image-render-edge",{"image-rendering":"crisp-edges"}],["image-render-pixel",[["-ms-interpolation-mode","nearest-neighbor"],["image-rendering","-webkit-optimize-contrast"],["image-rendering","-moz-crisp-edges"],["image-rendering","-o-pixelated"],["image-rendering","pixelated"]]]],Fk,pf,Dk,mf,Ok,Wk,Lk,[[/^(?:color-)?scheme-(.+)$/,([,e])=>({"color-scheme":e.split("-").join(" ")})]],Sk,[[/^@container(?:\/(\w+))?(?:-(normal))?$/,([,e,t])=>({"container-type":t??"inline-size","container-name":e})]],Hk,Zk,e$,n$,y$,v$,w$,k$,$$,S$,_$,A$,C$,E$,R$,I$,[["break-normal",{"overflow-wrap":"normal","word-break":"normal"}],["break-words",{"overflow-wrap":"break-word"}],["break-all",{"word-break":"break-all"}],["break-keep",{"word-break":"keep-all"}],["break-anywhere",{"overflow-wrap":"anywhere"}],["wrap-break-word",{"overflow-wrap":"break-word"}],["wrap-anywhere",{"overflow-wrap":"anywhere"}],["wrap-normal",{"overflow-wrap":"normal"}]],[["text-wrap",{"text-wrap":"wrap"}],["text-nowrap",{"text-wrap":"nowrap"}],["text-balance",{"text-wrap":"balance"}],["text-pretty",{"text-wrap":"pretty"}]],[["truncate",{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}],["text-truncate",{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}],["text-ellipsis",{"text-overflow":"ellipsis"}],["text-clip",{"text-overflow":"clip"}]],T$,[["italic",{"font-style":"italic"}],["not-italic",{"font-style":"normal"}],["font-italic",{"font-style":"italic"}],["font-not-italic",{"font-style":"normal"}],["oblique",{"font-style":"oblique"}],["not-oblique",{"font-style":"normal"}],["font-oblique",{"font-style":"oblique"}],["font-not-oblique",{"font-style":"normal"}]],[["antialiased",{"-webkit-font-smoothing":"antialiased","-moz-osx-font-smoothing":"grayscale"}],["subpixel-antialiased",{"-webkit-font-smoothing":"auto","-moz-osx-font-smoothing":"auto"}]],m$,f$,V$,B$,[[/^(.+?)-(\$.+)$/,([,e,t])=>{let n=G$[e];if(n)return{[n]:k.cssvar(t)}}]],[[/^\[(.*)\]$/,([e,t])=>{if(!t.includes(":"))return;let[n,...s]=t.split(":"),r=s.join(":");if(!function(i){if(!i.includes("://"))return!1;try{return new URL(i).host!==""}catch{return!1}}(t)&&/^[\w-]+$/.test(n)&&function(i){let o=0;function a(l){for(;o<i.length;)if(o+=1,i[o]===l)return!0;return!1}for(o=0;o<i.length;o++){let l=i[o];if("\"`'".includes(l)){if(!a(l))return!1}else if(l==="("){if(!a(")"))return!1}else if("[]{}:".includes(l))return!1}return!0}(r)){let i=k.bracket(`[${r}]`);if(i)return{[n]:i}}}]],Nf,p$,c$,d$,u$,Uf,l$,Vf,a$,h$,s$,L$,Rk,Ik,P$,M$,j$,[["forced-color-adjust-auto",{"forced-color-adjust":"auto"}],["forced-color-adjust-none",{"forced-color-adjust":"none"}]],[["sr-only",{position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0,0,0,0)","white-space":"nowrap","border-width":0}],["not-sr-only",{position:"static",width:"auto",height:"auto",padding:"0",margin:"0",overflow:"visible",clip:"auto","white-space":"normal"}]],[["isolate",{isolation:"isolate"}],["isolate-auto",{isolation:"auto"}],["isolation-auto",{isolation:"auto"}]],F$,D$,O$,[["min-h-dvh",{"min-height":"100dvh"}],["min-h-svh",{"min-height":"100svh"}],["min-h-lvh",{"min-height":"100lvh"}],["h-dvh",{height:"100dvh"}],["h-svh",{height:"100svh"}],["h-lvh",{height:"100lvh"}],["max-h-dvh",{"max-height":"100dvh"}],["max-h-svh",{"max-height":"100svh"}],["max-h-lvh",{"max-height":"100lvh"}]],i$,qk,Xk,[[/^line-clamp-(\d+)$/,([,e])=>({overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":e}),{autocomplete:["line-clamp","line-clamp-(1|2|3|4|5|6|none)"]}],["line-clamp-none",{overflow:"visible",display:"block","-webkit-box-orient":"horizontal","-webkit-line-clamp":"unset"}]],o$,g$,z$,U$,K$,[[/^view-transition-([\w-]+)$/,([,e])=>({"view-transition-name":e})]],Kk,Gk,[["field-sizing-fixed",{"field-sizing":"fixed"}],["field-sizing-content",{"field-sizing":"content"}]],[[/^(where|\?)$/,(e,{constructCSS:t,generator:n})=>{if(n.userConfig.envMode==="dev")return`@keyframes __un_qm{0%{box-shadow:inset 4px 4px #ff1e90, inset -4px -4px #ff1e90}100%{box-shadow:inset 8px 8px #3399ff, inset -8px -8px #3399ff}} ${t({animation:"__un_qm 0.5s ease-in-out alternate infinite"})}`}]]].flat();Z$=["spacing","breakpoint","verticalBreakpoint","shadow","insetShadow","dropShadow","textShadow","animation","property","aria","media","supports"];t1=e=>[X$(e),e1(e),{getCSS:()=>{if(Ss.size>0){let t="@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))",n="*, ::before, ::after, ::backdrop",s=Array.from(Ss.entries()).map(([r,i])=>`${r}:${i};`).join("");return`${t}{${n}{${s}}}`}},layer:"properties"}].filter(Boolean),n1={position:["relative","absolute","fixed","sticky","static"],globalKeyword:Le},Bf=(e={})=>{e.dark=e.dark??"class",e.attributifyPseudo=e.attributifyPseudo??!1,e.variablePrefix=e.variablePrefix??"un-",e.important=e.important??!1;let t=typeof e.preflights?.theme=="boolean"||typeof e.preflights?.theme=="string"?{mode:e.preflights.theme??"on-demand"}:{mode:e.preflights?.theme?.mode??"on-demand",...e.preflights?.theme};return e.preflights={reset:e.preflights?.reset??!0,theme:t},{name:"@unocss/preset-wind4",rules:J$,shortcuts:Ak,theme:kk,layers:{properties:-200,theme:-150,base:-100},preflights:t1(e),variants:vk(e),prefix:e.prefix,postprocess:Fw(e),extractorDefault:e.arbitraryVariants===!1?void 0:Yh(),autocomplete:{shorthands:n1},options:e,configResolved(){$s.clear(),Ss.clear()},meta:{themeDeps:$s,propertyDeps:Ss}}}});var Hf=gx(()=>{"use strict";(()=>{var e="default",t="preflights",n="shortcuts",s="imports",r={[s]:-200,[t]:-100,[n]:-10,[e]:0},i=/[\\:]?[\s'"`;{}]+/g;function o($){return $.split(i)}var a={name:"@unocss/core/extractor-split",order:0,extract({code:$}){return o($)}};function l($=[]){return Array.isArray($)?$:[$]}function c($){return Array.from(new Set($))}function d($,x){return $.reduce((I,T)=>(I.findIndex(O=>x(T,O))===-1&&I.push(T),I),[])}function h($){return typeof $=="string"}var f=class extends Set{constructor($){if(super(),this._map=new Map,$)for(let x of $)this.add(x)}add($){return this._map.set($,(this._map.get($)??0)+1),super.add($)}delete($){return this._map.has($)?(this._map.delete($),super.delete($)):!1}clear(){this._map.clear(),super.clear()}getCount($){return this._map.get($)??0}setCount($,x){return this._map.set($,x),super.add($)}};function m($){return $ instanceof f}function g($){let x=$.length,I=-1,T,O="",W=$.charCodeAt(0);for(;++I<x;){if(T=$.charCodeAt(I),T===0){O+="\uFFFD";continue}if(T===37){O+="\\%";continue}if(T===44){O+="\\,";continue}if(T>=1&&T<=31||T===127||I===0&&T>=48&&T<=57||I===1&&T>=48&&T<=57&&W===45){O+=`\\${T.toString(16)} `;continue}if(I===0&&x===1&&T===45){O+=`\\${$.charAt(I)}`;continue}if(T>=128||T===45||T===95||T>=48&&T<=57||T>=65&&T<=90||T>=97&&T<=122){O+=$.charAt(I);continue}O+=`\\${$.charAt(I)}`}return O}var b=g;function _(){return{events:{},emit($,...x){(this.events[$]||[]).forEach(I=>I(...x))},on($,x){return(this.events[$]=this.events[$]||[]).push(x),()=>this.events[$]=(this.events[$]||[]).filter(I=>I!==x)}}}function R($){return typeof $=="function"?{match:$}:$}function D($){return $.length===3}function M($){return $!=null}function K(){}var ee=class{constructor(){this._map=new Map}get($,x){let I=this._map.get($);if(I)return I.get(x)}getFallback($,x,I){let T=this._map.get($);return T||(T=new Map,this._map.set($,T)),T.has(x)||T.set(x,I),T.get(x)}set($,x,I){let T=this._map.get($);return T||(T=new Map,this._map.set($,T)),T.set(x,I),this}has($,x){return this._map.get($)?.has(x)}delete($,x){return this._map.get($)?.delete(x)||!1}deleteTop($){return this._map.delete($)}map($){return Array.from(this._map.entries()).flatMap(([x,I])=>Array.from(I.entries()).map(([T,O])=>$(O,x,T)))}},Y=class extends Map{getFallback($,x){let I=this.get($);return I===void 0?(this.set($,x),x):I}map($){let x=[];return this.forEach((I,T)=>{x.push($(I,T))}),x}flatMap($){let x=[];return this.forEach((I,T)=>{x.push(...$(I,T))}),x}};function A($){return h($)?$:(Array.isArray($)?$:Object.entries($)).filter(x=>x[1]!=null)}function C($){return Array.isArray($)?$.some(x=>!Array.isArray(x)||Array.isArray(x[0]))?$.map(x=>A(x)):[$]:[A($)]}function v($){return $.filter(([x,I],T)=>{if(x.startsWith("$$"))return!1;for(let O=T-1;O>=0;O--)if($[O][0]===x&&$[O][1]===I)return!1;return!0})}var S="__virtual_key__";function w($){return $==null?"":v($).map(([x,I])=>I!=null&&typeof I!="function"?x!=="__virtual_key__"?`${x}:${I};`:I:void 0).filter(Boolean).join("")}function P($){return $&&typeof $=="object"&&!Array.isArray($)}function B($,x,I=!1){let T=$,O=x;if(Array.isArray(O))return I&&Array.isArray(O)?[...T,...O]:[...O];let W={...T};return P(T)&&P(O)&&Object.keys(O).forEach(G=>{P(T[G])&&P(O[G])||Array.isArray(T[G])&&Array.isArray(O[G])?W[G]=B(T[G],O[G],I):Object.assign(W,{[G]:O[G]})}),W}function J($){let x,I,T;if(Array.isArray($)){for(I=Array.from({length:x=$.length});x--;)I[x]=(T=$[x])&&typeof T=="object"?J(T):T;return I}if(Object.prototype.toString.call($)==="[object Object]"){I={};for(x in $)x==="__proto__"?Object.defineProperty(I,x,{value:J($[x]),configurable:!0,enumerable:!0,writable:!0}):I[x]=(T=$[x])&&typeof T=="object"?J(T):T;return I}return $}function te($){return h($[0])}function se($){return h($[0])}var oe={};function ce($=["-",":"]){let x=$.join("|");return oe[x]||(oe[x]=new RegExp(`((?:[!@*<~\\w+:_-]|\\[&?>?:?\\S*\\])+?)(${x})\\(((?:[~!<>\\w\\s:/\\\\,%#.$?-]|\\[[^\\]]*?\\])+?)\\)(?!\\s*?=>)`,"gm")),oe[x].lastIndex=0,oe[x]}function le($,x=["-",":"],I=5){let T=ce(x),O,W=$.toString(),G=new Set,X=new Map;do O=!1,W=W.replace(T,(N,U,Q,ie,pe)=>{if(!x.includes(Q))return N;O=!0,G.add(U+Q);let de=pe+U.length+Q.length+1,Pe={length:N.length,items:[]};X.set(pe,Pe);for(let Re of[...ie.matchAll(/\S+/g)]){let Ie=de+Re.index,xe=X.get(Ie)?.items;xe?X.delete(Ie):xe=[{offset:Ie,length:Re[0].length,className:Re[0]}];for(let ve of xe)ve.className=ve.className==="~"?Q===":"?`${U}${Q}~`:U:ve.className.replace(/^(!?)(.*)/,`$1${U}${Q}$2`),Pe.items.push(ve)}return"$".repeat(N.length)}),I-=1;while(O&&I);let q;if(typeof $=="string"){q="";let N=0;for(let[U,Q]of X)q+=$.slice(N,U),q+=Q.items.map(ie=>ie.className).join(" "),N=U+Q.length;q+=$.slice(N)}else{q=$;for(let[N,U]of X)q.overwrite(N,N+U.length,U.items.map(Q=>Q.className).join(" "))}return{prefixes:Array.from(G),hasChanged:O,groupsByOffset:X,get expanded(){return q.toString()}}}function ke($,x=["-",":"],I=5){let T=le($,x,I);return typeof $=="string"?T.expanded:$}var ue=new Set;function Te($){ue.has($)||(console.warn("[unocss]",$),ue.add($))}function Ne($){return l($).flatMap(x=>Array.isArray(x)?[x]:Object.entries(x))}var St="_uno_resolved";async function gn($){let x=typeof $=="function"?await $():await $;if(St in x)return x;x={...x},Object.defineProperty(x,St,{value:!0,enumerable:!1});let I=x.shortcuts?Ne(x.shortcuts):void 0;if(x.shortcuts=I,x.prefix||x.layer){let T=O=>{O[2]||(O[2]={});let W=O[2];W.prefix==null&&x.prefix&&(W.prefix=l(x.prefix)),W.layer==null&&x.layer&&(W.layer=x.layer)};I?.forEach(T),x.rules?.forEach(T)}return x}async function vr($){let x=await gn($);return x.presets?[x,...(await Promise.all((x.presets||[]).flatMap(l).flatMap(vr))).flat()]:[x]}function jt($){if($.length===0)return{};let x=[],I=[],T=!1,O=[],W=[];for(let X of $){if(X.pipeline===!1){T=!0;break}else X.pipeline?.include&&x.push(X.pipeline.include),X.pipeline?.exclude&&I.push(X.pipeline.exclude);X.filesystem&&O.push(X.filesystem),X.inline&&W.push(X.inline)}let G={pipeline:T?!1:{include:c(Ft(...x)),exclude:c(Ft(...I))}};return O.length&&(G.filesystem=c(O.flat())),W.length&&(G.inline=c(W.flat())),G}async function As($={},x={}){let I=Object.assign({},x,$),T=d((await Promise.all((I.presets||[]).flatMap(l).flatMap(vr))).flat(),(re,be)=>re.name===be.name),O=[...T.filter(re=>re.enforce==="pre"),...T.filter(re=>!re.enforce),...T.filter(re=>re.enforce==="post")],W=[...O,I],G=[...W].reverse(),X=Object.assign({},r,...W.map(re=>re.layers));function q(re){return c(W.flatMap(be=>l(be[re]||[])))}let N=q("extractors"),U=G.find(re=>re.extractorDefault!==void 0)?.extractorDefault;U===void 0&&(U=a),U&&!N.includes(U)&&N.unshift(U),N.sort((re,be)=>(re.order||0)-(be.order||0));let Q=q("rules"),ie=Q.length,pe={},de=[];for(let[re,be]of Q.entries()){let je=be[2]??(be[2]={});je.__index=re,te(be)?l(je.prefix??"").forEach(he=>{pe[he+be[0]]=be}):de.unshift(be)}let Pe={templates:c(W.flatMap(re=>l(re.autocomplete?.templates))),extractors:W.flatMap(re=>l(re.autocomplete?.extractors)).sort((re,be)=>(re.order||0)-(be.order||0)),shorthands:Ze(W.map(re=>re.autocomplete?.shorthands||{}))},Re=q("separators");Re.length||(Re=[":","-"]);let Ie=jt(q("content")),xe={mergeSelectors:!0,warn:!0,sortLayers:re=>re,...I,blocklist:q("blocklist"),presets:O,envMode:I.envMode||"build",shortcutsLayer:I.shortcutsLayer||"shortcuts",layers:X,theme:Cs(W.map(re=>re.theme)),rules:Q,rulesSize:ie,rulesDynamic:de,rulesStaticMap:pe,preprocess:q("preprocess"),postprocess:q("postprocess"),preflights:q("preflights"),autocomplete:Pe,variants:q("variants").map(R).sort((re,be)=>(re.order||0)-(be.order||0)),shortcuts:Ne(q("shortcuts")).reverse(),extractors:N,safelist:q("safelist"),separators:Re,details:I.details??I.envMode==="dev",content:Ie,transformers:d(q("transformers"),(re,be)=>re.name===be.name)},ve=q("extendTheme");for(let re of ve)xe.theme=re(xe.theme,xe)||xe.theme;for(let re of W)re?.configResolved?.(xe);return xe}function Cs($){return $.map(x=>x?J(x):{}).reduce((x,I)=>B(x,I),{})}function Ze($){return $.reduce((x,I)=>{let T={};for(let O in I){let W=I[O];Array.isArray(W)?T[O]=`(${W.join("|")})`:T[O]=W}return{...x,...T}},{})}function Ft(...$){return $.flatMap(bn)}function bn($){return Array.isArray($)?$:$?[$]:[]}var _o="66.6.8",et={shortcutsNoMerge:"$$symbol-shortcut-no-merge",noMerge:"$$symbol-no-merge",noScope:"$$symbol-no-scope",variants:"$$symbol-variants",parent:"$$symbol-parent",selector:"$$symbol-selector",layer:"$$symbol-layer",sort:"$$symbol-sort",body:"$$symbol-body"},ex=class qf{constructor(x={},I={}){this.userConfig=x,this.defaults=I,this.version=_o,this.events=_(),this.config=void 0,this.cache=new Map,this.blocked=new Set,this.parentOrders=new Map,this.activatedRules=new Set,this.resolveCSSResult=(T,O,W,G)=>{let X=C(O).filter(q=>q.length);if(X.length){this.config.details&&G.rules.push(W),G.generator.activatedRules.add(W);let q=W[2];return X.map(N=>{if(h(N))return[q.__index,N,q];let U=G.variantHandlers,Q=q,ie=de=>{U=[de,...U]},pe=de=>{Q={...Q,...de}};for(let de of N)switch(de[0]){case et.variants:typeof de[1]=="function"?U=de[1](U)||U:U=[...l(de[1]),...U];break;case et.parent:ie({parent:de[1]});break;case et.selector:ie({selector:de[1]});break;case et.layer:ie({layer:de[1]});break;case et.sort:pe({sort:de[1]});break;case et.noMerge:pe({noMerge:de[1]});break;case et.noScope:pe({noScope:de[1]});break;case et.body:de[0]=S;break}return[q.__index,T,N,Q,U]})}}}static async create(x={},I={}){let T=new qf(x,I);return T.config=await As(T.userConfig,T.defaults),T.events.emit("config",T.config),T}async setConfig(x,I){x&&(I&&(this.defaults=I),this.userConfig=x,this.blocked.clear(),this.parentOrders.clear(),this.activatedRules.clear(),this.cache.clear(),this.config=await As(x,this.defaults),this.events.emit("config",this.config))}async applyExtractors(x,I,T=new Set){let O={original:x,code:x,id:I,extracted:T,envMode:this.config.envMode};for(let W of this.config.extractors){let G=await W.extract?.(O);if(G)if(m(G)&&m(T))for(let X of G)T.setCount(X,T.getCount(X)+G.getCount(X));else for(let X of G)T.add(X)}return T}makeContext(x,I){let T={rawSelector:x,currentSelector:I[1],theme:this.config.theme,generator:this,symbols:et,variantHandlers:I[2],constructCSS:(...O)=>this.constructCustomCSS(T,...O),variantMatch:I};return T}async parseToken(x,I){if(this.blocked.has(x))return;let T=`${x}${I?` ${I}`:""}`;if(this.cache.has(T))return this.cache.get(T);let O=this.config.preprocess.reduce((q,N)=>N(q)??q,x);if(this.isBlocked(O)){this.blocked.add(x),this.cache.set(T,null);return}let W=await this.matchVariants(x,O);if(W.every(q=>!q||this.isBlocked(q[1]))){this.blocked.add(x),this.cache.set(T,null);return}let G=async q=>{let N=this.makeContext(x,[I||q[0],q[1],q[2],q[3]]);this.config.details&&(N.variants=[...q[3]]);let U=await this.expandShortcut(N.currentSelector,N);return U?await this.stringifyShortcuts(N.variantMatch,N,U[0],U[1]):(await this.parseUtil(N.variantMatch,N))?.flatMap(Q=>this.stringifyUtil(Q,N)).filter(M)},X=(await Promise.all(W.map(q=>G(q)))).flat().filter(q=>!!q);if(X?.length)return this.cache.set(T,X),X;this.cache.set(T,null)}async generate(x,I={}){let{id:T,scope:O,preflights:W=!0,safelist:G=!0,minify:X=!1,extendedInfo:q=!1}=I,N=h(x)?await this.applyExtractors(x,T,q?new f:new Set):Array.isArray(x)?new Set(x):x;if(G){let he={generator:this,theme:this.config.theme};this.config.safelist.flatMap(ye=>typeof ye=="function"?ye(he):ye).forEach(ye=>{let _e=ye.trim();_e&&!N.has(_e)&&N.add(_e)})}let U=X?"":`
`,Q=new Set([e]),ie=q?new Map:new Set,pe=new Map,de={},Pe=Array.from(N).map(async he=>{if(ie.has(he))return;let ye=await this.parseToken(he);if(ye!=null){ie instanceof Map?ie.set(he,{data:ye,count:m(N)?N.getCount(he):-1}):ie.add(he);for(let _e of ye){let Ke=_e[3]||"",Ye=_e[4]?.layer;pe.has(Ke)||pe.set(Ke,[]),pe.get(Ke).push(_e),Ye&&Q.add(Ye)}}});await Promise.all(Pe),await(async()=>{if(!W)return;let he={generator:this,theme:this.config.theme},ye=new Set([]);this.config.preflights.forEach(({layer:_e=t})=>{Q.add(_e),ye.add(_e)}),de=Object.fromEntries(await Promise.all(Array.from(ye).map(async _e=>[_e,(await Promise.all(this.config.preflights.filter(Ke=>(Ke.layer||"preflights")===_e).map(async Ke=>await Ke.getCSS(he)))).filter(Boolean).join(U)])))})();let Re=he=>this.config.sortLayers(he.sort((ye,_e)=>(this.config.layers[ye]??0)-(this.config.layers[_e]??0)||ye.localeCompare(_e))),Ie=Re(Array.from(Q)),xe={},ve=this.config.outputToCssLayers,re=he=>{let ye=he;return typeof ve=="object"&&(ye=ve.cssLayerName?.(he)),ye===null?null:ye??he},be=(he=e)=>{if(xe[he])return xe[he];let ye=Array.from(pe).sort((Ye,yn)=>(this.parentOrders.get(Ye[0])??0)-(this.parentOrders.get(yn[0])??0)||Ye[0]?.localeCompare(yn[0]||"")||0).map(([Ye,yn])=>{let me=yn.length,$e=yn.filter(Me=>(Me[4]?.layer||"default")===he).sort((Me,mt)=>Me[0]-mt[0]||(Me[4]?.sort||0)-(mt[4]?.sort||0)||Me[5]?.currentSelector?.localeCompare(mt[5]?.currentSelector??"")||Me[1]?.localeCompare(mt[1]||"")||Me[2]?.localeCompare(mt[2]||"")||0).map(([,Me,mt,,Es,,Ao])=>[[[(Me&&!Es?.noScope?sx(Me,O):Me)??"",Es?.sort??0]],mt,!!(Ao??Es?.noMerge)]);if(!$e.length)return;let Ce=$e.reverse().map(([Me,mt,Es],Ao)=>{if(!Es&&this.config.mergeSelectors)for(let Xt=Ao+1;Xt<me;Xt++){let _t=$e[Xt];if(_t&&!_t[2]&&(Me&&_t[0]||Me==null&&_t[0]==null)&&_t[1]===mt)return Me&&_t[0]&&_t[0].push(...Me),null}let hc=Me?c(Me.sort((Xt,_t)=>Xt[1]-_t[1]||Xt[0]?.localeCompare(_t[0]||"")||0).map(Xt=>Xt[0]).filter(Boolean)):[];return hc.length?`${hc.join(`,${U}`)}{${mt}}`:mt}).filter(Boolean),Ve=Array.from(new Set(Ce)).reverse().join(U);if(!Ye)return Ve;let ft=Ye.split(" $$ ");return`${ft.join("{")}{${U}${Ve}${U}${"}".repeat(ft.length)}`}).filter(Boolean).join(U);W&&(ye=[de[he],ye].filter(Boolean).join(U));let _e;ve&&ye&&(_e=re(he),_e!==null&&(ye=`@layer ${_e}{${U}${ye}${U}}`));let Ke=X?"":`/* layer: ${he}${_e&&_e!==he?`, alias: ${_e}`:""} */${U}`;return xe[he]=ye?Ke+ye:""},je=(he=Ie,ye)=>{let _e=he.filter(Ye=>!ye?.includes(Ye)),Ke=_e.map(be).filter(Boolean);if(ve){let Ye=_e;typeof ve=="object"&&ve.allLayers&&(Ye=Re(Object.keys(this.config.layers))),Ye.length>0&&Ke.unshift(`@layer ${Ye.map(re).filter(M).join(", ")};`)}return Ke.join(U)};return{get css(){return je()},layers:Ie,matched:ie,getLayers:je,getLayer:be,setLayer:async(he,ye)=>{let _e=await ye(be(he));return xe[he]=_e,_e}}}async matchVariants(x,I){let T={rawSelector:x,theme:this.config.theme,generator:this},O=async W=>{let G=!0,[,,X,q]=W;for(;G;){G=!1;let N=W[1];for(let U of this.config.variants){if(!U.multiPass&&q.has(U))continue;let Q=await U.match(N,T);if(Q){if(h(Q)){if(Q===N)continue;Q={matcher:Q}}if(Array.isArray(Q)){if(!Q.length)continue;if(Q.length===1)Q=Q[0];else{if(U.multiPass)throw new Error("multiPass can not be used together with array return variants");let ie=Q.map(pe=>{let de=pe.matcher??N,Pe=[pe,...X],Re=new Set(q);return Re.add(U),[W[0],de,Pe,Re]});return(await Promise.all(ie.map(pe=>O(pe)))).flat()}}W[1]=Q.matcher??N,X.unshift(Q),q.add(U),G=!0;break}}if(!G)break;if(X.length>500)throw new Error(`Too many variants applied to "${x}"`)}return[W]};return await O([x,I||x,[],new Set])}applyVariants(x,I=x[4],T=x[1]){let O=I.slice().sort((q,N)=>(q.order||0)-(N.order||0)).reduceRight((q,N)=>U=>{let Q=N.body?.(U.entries)||U.entries,ie=Array.isArray(N.parent)?N.parent:[N.parent,void 0],pe=N.selector?.(U.selector,Q);return(N.handle??ix)({...U,entries:Q,selector:pe||U.selector,parent:ie[0]||U.parent,parentOrder:ie[1]||U.parentOrder,layer:N.layer||U.layer,sort:N.sort||U.sort},q)},q=>q)({prefix:"",selector:rx(T),pseudo:"",entries:x[2]}),{parent:W,parentOrder:G}=O;W!=null&&G!=null&&this.parentOrders.set(W,G);let X={selector:[O.prefix,O.selector,O.pseudo].join(""),entries:O.entries,parent:W,layer:O.layer,sort:O.sort,noMerge:O.noMerge};return this.config.postprocess.reduce((q,N)=>{let U=[];for(let Q of q){let ie=N(Q);Array.isArray(ie)?U.push(...ie.filter(M)):U.push(ie||Q)}return U},[X])}constructCustomCSS(x,I,T){let O=A(I);return h(O)?O:this.applyVariants([0,T||x.rawSelector,O,void 0,x.variantHandlers]).map(({selector:W,entries:G,parent:X})=>{let q=`${W}{${w(G)}}`;return X?`${X}{${q}}`:q}).join("")}async parseUtil(x,I,T=!1,O){let W=h(x)?await this.matchVariants(x):[x],G=async([q,N,U])=>{this.config.details&&(I.rules=I.rules??[]);let Q={...I,variantHandlers:U},ie=this.config.rulesStaticMap[N];if(ie&&ie[1]&&(T||!ie[2]?.internal))return this.resolveCSSResult(q,ie[1],ie,Q);for(let pe of this.config.rulesDynamic){let[de,Pe,Re]=pe;if(Re?.internal&&!T)continue;let Ie=N;if(Re?.prefix){let be=l(Re.prefix);if(O){let je=l(O);if(!be.some(he=>je.includes(he)))continue}else{let je=be.find(he=>N.startsWith(he));if(je==null)continue;Ie=N.slice(je.length)}}let xe=Ie.match(de);if(!xe)continue;let ve=await Pe(xe,Q);if(!ve)continue;if(typeof ve!="string")if(Symbol.asyncIterator in ve){let be=[];for await(let je of ve)je&&be.push(je);ve=be}else Symbol.iterator in ve&&!Array.isArray(ve)&&(ve=Array.from(ve).filter(M));let re=this.resolveCSSResult(q,ve,pe,Q);if(re)return re}},X=(await Promise.all(W.map(q=>G(q)))).flat().filter(q=>!!q);if(X.length)return X}stringifyUtil(x,I){if(!x)return;if(D(x))return[[x[0],void 0,x[1],void 0,x[2],this.config.details?I:void 0,void 0]];let T=this.applyVariants(x),O=[];for(let W of T){let{selector:G,entries:X,parent:q,layer:N,sort:U,noMerge:Q}=W,ie=w(X);if(!ie)continue;let{layer:pe,sort:de,...Pe}=x[3]??{},Re={...Pe,layer:N??pe,sort:U??de};O.push([x[0],G,ie,q,Re,this.config.details?I:void 0,Q])}return O}async expandShortcut(x,I,T=5){if(T===0)return;let O=this.config.details?N=>{I.shortcuts=I.shortcuts??[],I.shortcuts.push(N)}:K,W,G,X,q;for(let N of this.config.shortcuts){let U=x;if(N[2]?.prefix){let Q=l(N[2].prefix).find(ie=>x.startsWith(ie));if(Q==null)continue;U=x.slice(Q.length)}if(se(N)){if(N[0]===U){W=W||N[2],G=N[1],O(N);break}}else{let Q=U.match(N[0]);if(Q&&(G=N[1](Q,I)),G){W=W||N[2],O(N);break}}}if(G&&(X=c(l(G).filter(h).map(N=>ke(N.trim()).split(/\s+/g)).flat()),q=l(G).filter(N=>!h(N)).map(N=>({handles:[],value:N}))),!G){let N=h(x)?await this.matchVariants(x):[x];for(let U of N){let[Q,ie,pe]=U;if(Q!==ie){let de=await this.expandShortcut(ie,I,T-1);de&&(X=de[0].filter(h).map(Pe=>Q.replace(ie,Pe)),q=de[0].filter(Pe=>!h(Pe)).map(Pe=>({handles:[...Pe.handles,...pe],value:Pe.value})))}}}if(!(!X?.length&&!q?.length))return[[await Promise.all(l(X).map(async N=>(await this.expandShortcut(N,I,T-1))?.[0]||[N])),q].flat(2).filter(N=>!!N),W]}async stringifyShortcuts(x,I,T,O={layer:this.config.shortcutsLayer}){let W=new Y,G=(await Promise.all(c(T).map(async U=>{let Q=h(U)?await this.parseUtil(U,I,!0,O.prefix):[[Number.POSITIVE_INFINITY,"{inline}",A(U.value),void 0,U.handles]];return!Q&&this.config.warn&&Te(`unmatched utility "${U}" in shortcut "${x[1]}"`),Q||[]}))).flat(1).filter(Boolean).sort((U,Q)=>U[0]-Q[0]),[X,,q]=x,N=[];for(let U of G){if(D(U)){N.push([U[0],void 0,U[1],void 0,U[2],I,void 0]);continue}let Q=Object.fromEntries(U[2])[et.shortcutsNoMerge],ie=[...U[4],...Q?[]:q];for(let{selector:pe,entries:de,parent:Pe,sort:Re,noMerge:Ie,layer:xe}of this.applyVariants(U,ie,X))W.getFallback(xe??O.layer,new ee).getFallback(pe,Pe,[[],U[0]])[0].push([de,!!(Ie??U[3]?.noMerge),Re??0])}return N.concat(W.flatMap((U,Q)=>U.map(([ie,pe],de,Pe)=>{let Re=(Ie,xe,ve)=>{let re=Math.max(...ve.map(je=>je[1])),be=ve.map(je=>je[0]);return(Ie?[be.flat(1)]:be).map(je=>{let he=w(je);if(he)return[pe,de,he,Pe,{...O,noMerge:xe,sort:re,layer:Q},I,void 0]})};return[[ie.filter(([,Ie])=>Ie).map(([Ie,,xe])=>[Ie,xe]),!0],[ie.filter(([,Ie])=>!Ie).map(([Ie,,xe])=>[Ie,xe]),!1]].map(([Ie,xe])=>[...Re(!1,xe,Ie.filter(([ve])=>ve.some(re=>re[0]===et.shortcutsNoMerge))),...Re(!0,xe,Ie.filter(([ve])=>ve.every(re=>re[0]!==et.shortcutsNoMerge)))])}).flat(2).filter(Boolean)))}isBlocked(x){return!x||this.config.blocklist.map(I=>Array.isArray(I)?I[0]:I).some(I=>typeof I=="function"?I(x):h(I)?I===x:I.test(x))}getBlocked(x){let I=this.config.blocklist.find(T=>{let O=Array.isArray(T)?T[0]:T;return typeof O=="function"?O(x):h(O)?O===x:O.test(x)});return I?Array.isArray(I)?I:[I,void 0]:void 0}};async function tx($,x){return await ex.create($,x)}var ac=/\s\$\$\s+/g;function nx($){return ac.test($)}function sx($,x){return nx($)?$.replace(ac,x?` ${x} `:" "):x?`${x} ${$}`:$}var lc=/^\[(.+?)(~?=)"(.*)"\]$/;function rx($){return lc.test($)?$.replace(lc,(x,I,T,O)=>`[${b(I)}${T}"${b(O)}"]`):`.${b($)}`}function ix($,x){return x($)}function ox($){return $.replace(/-(\w)/g,(x,I)=>I?I.toUpperCase():"")}function cc($){return $.charAt(0).toUpperCase()+$.slice(1)}function uc($){return $.replace(/(?:^|\B)([A-Z])/g,"-$1").toLowerCase()}var dc=["Webkit","Moz","ms"];function ax($){let x={};function I(T){let O=x[T];if(O)return O;let W=ox(T);if(W!=="filter"&&W in $)return x[T]=uc(W);W=cc(W);for(let G=0;G<dc.length;G++){let X=`${dc[G]}${W}`;if(X in $)return x[T]=uc(cc(X))}return T}return({entries:T})=>T.forEach(O=>{O[0].startsWith("--")||(O[0]=I(O[0]))})}function lx($){return $.replace(/&amp;/g,"&").replace(/&gt;/g,">").replace(/&lt;/g,"<")}async function cx($={}){if(typeof window>"u"){console.warn("@unocss/runtime been used in non-browser environment, skipped.");return}let x=window,I=window.document,T=()=>I.documentElement,O=x.__unocss||{},W=Object.assign({},$,O.runtime),G=W.defaults||{},X=W.cloakAttribute??"un-cloak";W.autoPrefix&&(G.postprocess=l(G.postprocess)).unshift(ax(I.createElement("div").style)),W.configResolved?.(O,G);let q=await tx(O,G),N=me=>{let $e=$.rootElement?.();if($e){$e.appendChild(me);return}W.inject?W.inject(me):T().prepend(me)},U=()=>W.rootElement?W.rootElement():I.body,Q=new Map,ie=!0,pe=new Set,de,Pe,Re=[],Ie=()=>new Promise(me=>{Re.push(me),Pe!=null&&clearTimeout(Pe),Pe=setTimeout(()=>re().then(()=>{let $e=Re;Re=[],$e.forEach(Ce=>Ce())}),0)});function xe(me,$e=!1){if(me.nodeType!==1)return;let Ce=me;Ce.hasAttribute(X)&&Ce.removeAttribute(X),$e&&Ce.querySelectorAll(`[${X}]`).forEach(Ve=>{Ve.removeAttribute(X)})}function ve(me,$e){let Ce=Q.get(me);if(!Ce)if(Ce=I.createElement("style"),Ce.setAttribute("data-unocss-runtime-layer",me),Q.set(me,Ce),$e==null)N(Ce);else{let Ve=ve($e),ft=Ve.parentNode;ft?ft.insertBefore(Ce,Ve.nextSibling):N(Ce)}return Ce}async function re(){let me=[...pe],$e=await q.generate(me);return $e.layers.reduce((Ce,Ve)=>(ve(Ve,Ce).innerHTML=$e.getLayer(Ve)??"",Ve),void 0),me.filter(Ce=>!$e.matched.has(Ce)).forEach(Ce=>pe.delete(Ce)),{...$e,getStyleElement:Ce=>Q.get(Ce),getStyleElements:()=>Q}}async function be(me){let $e=pe.size;await q.applyExtractors(me,void 0,pe),$e!==pe.size&&await Ie()}async function je(me=U()){let $e=me&&me.outerHTML;$e&&(await be(`${$e} ${lx($e)}`),xe(T()),xe(me,!0))}let he=new MutationObserver(me=>{ie||me.forEach(async $e=>{if($e.target.nodeType!==1)return;let Ce=$e.target;for(let Ve of Q)if(Ce===Ve[1])return;if($e.type==="childList")$e.addedNodes.forEach(async Ve=>{if(Ve.nodeType!==1)return;let ft=Ve;de&&!de(ft)||(await be(ft.outerHTML),xe(ft))});else{if(de&&!de(Ce))return;if($e.attributeName!==X){let Ve=Array.from(Ce.attributes).map(Me=>Me.value?`${Me.name}="${Me.value}"`:Me.name).join(" "),ft=`<${Ce.tagName.toLowerCase()} ${Ve}>`;await be(ft)}xe(Ce)}})}),ye=!1;function _e(){if(ye)return;let me=W.observer?.target?W.observer.target():U();me&&(he.observe(me,{childList:!0,subtree:!0,attributes:!0,attributeFilter:W.observer?.attributeFilter}),ye=!0)}function Ke(){W.bypassDefined&&ux(q.blocked),je(),_e()}function Ye(){I.readyState==="loading"?x.addEventListener("DOMContentLoaded",Ke):Ke()}let yn=x.__unocss_runtime=x.__unocss_runtime={version:q.version,uno:q,async extract(me){h(me)||(me.forEach($e=>pe.add($e)),me=""),await be(me)},extractAll:je,inspect(me){de=me},toggleObserver(me){me===void 0?ie=!ie:ie=!!me,!ye&&!ie&&Ye()},update:re,presets:x.__unocss_runtime?.presets??{}};W.ready?.(yn)!==!1&&(ie=!1,Ye())}function ux($=new Set){for(let x=0;x<document.styleSheets.length;x++){let I=document.styleSheets[x],T;try{if(T=I.cssRules||I.rules,!T)continue;Array.from(T).flatMap(O=>O.selectorText?.split(/,/g)||[]).forEach(O=>{O&&(O=O.trim(),O.startsWith(".")&&(O=O.slice(1)),$.add(O))})}catch{continue}}return $}cx()})()});var i1={};var s1,Qf,Yf,r1,Kf=y(async()=>{Wf();Ue();console.log("[TAILWIND] starting import...");console.log("[TAILWIND] presetWind4 imported");j.manifest.tailwind?.runtime||j.devFiles.add(new URL(import.meta.url).pathname);s1="Manrope";window.__unocss={theme:{font:{family:s1,icon:{family:"lucide"}}},extendTheme:e=>j.theme.set({...e,...j.theme,colors:{...e.colors,default:"var(--text-color)",muted:"var(--text-muted)",inverted:"var(--color-inverse)",surface:{DEFAULT:"var(--color-surface)",lighter:"var(--color-surface-lighter)",light:"var(--color-surface-light)",dark:"var(--color-surface-dark)",darker:"var(--color-surface-darker)"},accent:{DEFAULT:"var(--color-accent)",lighter:"var(--color-accent-lighter)",light:"var(--color-accent-light)",dark:"var(--color-accent-dark)",darker:"var(--color-accent-darker)"},inverse:{DEFAULT:"var(--color-inverse)",lighter:"var(--color-inverse-lighter)",light:"var(--color-inverse-light)",dark:"var(--color-inverse-dark)",darker:"var(--color-inverse-darker)"},primary:{DEFAULT:"var(--color-primary)",lighter:"var(--color-primary-lighter)",light:"var(--color-primary-light)",dark:"var(--color-primary-dark)",darker:"var(--color-primary-darker)"},secondary:{DEFAULT:"var(--color-secondary)",lighter:"var(--color-secondary-lighter)",light:"var(--color-secondary-light)",dark:"var(--color-secondary-dark)",darker:"var(--color-secondary-darker)"},success:{DEFAULT:"var(--color-success)",lighter:"var(--color-success-lighter)",light:"var(--color-success-light)",dark:"var(--color-success-dark)",darker:"var(--color-success-darker)"},danger:{DEFAULT:"var(--color-danger)",lighter:"var(--color-danger-lighter)",light:"var(--color-danger-light)",dark:"var(--color-danger-dark)",darker:"var(--color-danger-darker)"},warning:{DEFAULT:"var(--color-warning)",lighter:"var(--color-warning-lighter)",light:"var(--color-warning-light)",dark:"var(--color-warning-dark)",darker:"var(--color-warning-darker)"},info:{DEFAULT:"var(--color-info)",lighter:"var(--color-info-lighter)",light:"var(--color-info-light)",dark:"var(--color-info-dark)",darker:"var(--color-info-darker)"},hover:"var(--color-hover)",focus:"var(--color-focus)",dim:"var(--border-color)"},textColor:{DEFAULT:"var(--text-color)",bg:"var(--background-color)"},backgroundColor:{DEFAULT:"var(--background-color)"},borderColor:{DEFAULT:"var(--border-color)",bg:"var(--background-color)"}}),presets:[Bf({preflights:{theme:!0}})]};console.log("[TAILWIND] importing UnoCSS runtime...");await Promise.resolve().then(()=>yx(Hf()));console.log("[TAILWIND] UnoCSS runtime loaded");Qf=()=>{let e=Array.from(document.querySelectorAll("style[data-unocss-runtime-layer]")).map(t=>t.textContent).join(`
`);j.SW?.postMessage("SW:STORE_UNOCSS",{css:e})},r1=new MutationObserver(()=>{clearTimeout(Yf),Yf=setTimeout(Qf,100)});r1.observe(document.head,{childList:!0,subtree:!0,characterData:!0});Qf()});var Gf,o1,a1,Jf,Xf=y(()=>{V();H();Gf={Read:"file-text",Write:"file-plus",Edit:"file-pen-line",Bash:"terminal",Glob:"folder-search",Grep:"search",WebFetch:"globe",WebSearch:"search",database_query:"database",database_get:"database",database_create:"plus-circle",database_update:"edit",database_delete:"trash-2",file_read:"file-text",file_write:"file-plus",file_edit:"file-pen-line",take_screenshot:"camera",default:"wrench"},o1=e=>Gf[e]||Gf.default,a1=(e,t)=>{if(e==="Read"&&t?.file_path||e==="Write"&&t?.file_path)return t.file_path.split("/").pop();if(e==="Bash"&&t?.command){let n=t.command.split(" ")[0];return n.length>20?n.substring(0,20)+"...":n}return e==="Grep"&&t?.pattern?`"${t.pattern.substring(0,15)}${t.pattern.length>15?"...":""}"`:e==="Glob"&&t?.pattern?t.pattern:e.replace(/_/g," ")},Jf={tag:"agent-activity-list",properties:{activities:u.array({defaultValue:[]}),expandedIds:u.array({defaultValue:[]})},toggleExpand(e){this.expandedIds.includes(e)?this.expandedIds=this.expandedIds.filter(t=>t!==e):this.expandedIds=[...this.expandedIds,e]},renderActivity(e){let t=this.expandedIds.includes(e.id),n=o1(e.name),s=a1(e.name,e.input),r=e.status==="running"?"loader":e.status==="error"?"circle-x":"circle-check",i=e.status==="running"?"text-primary animate-spin":e.status==="error"?"text-danger":"text-success";return p`
      <div class="border-b border-surface-light last:border-b-0">
        <button
          type="button"
          class="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-surface-light transition-colors text-left"
          @click=${()=>this.toggleExpand(e.id)}
        >
          <uix-icon name=${n} size="12" class="text-muted flex-shrink-0"></uix-icon>
          <span class="flex-1 text-xs truncate">${e.name}</span>
          <span class="text-xs text-muted truncate max-w-24">${s}</span>
          <uix-icon name=${r} size="12" class="${i} flex-shrink-0"></uix-icon>
          <uix-icon
            name=${t?"chevron-up":"chevron-down"}
            size="10"
            class="text-muted flex-shrink-0"
          ></uix-icon>
        </button>
        ${t?p`
              <div class="px-2 pb-2 text-xs">
                ${e.input?p`
                      <div class="mb-1">
                        <span class="text-muted">Input:</span>
                        <pre class="bg-surface rounded p-1.5 mt-0.5 overflow-x-auto text-xs max-h-32 overflow-y-auto">${JSON.stringify(e.input,null,2)}</pre>
                      </div>
                    `:""}
                ${e.result?p`
                      <div>
                        <span class="text-muted">Result:</span>
                        <pre class="bg-surface rounded p-1.5 mt-0.5 overflow-x-auto text-xs max-h-32 overflow-y-auto">${typeof e.result=="string"?e.result.substring(0,500)+(e.result.length>500?"...":""):JSON.stringify(e.result,null,2)}</pre>
                      </div>
                    `:""}
              </div>
            `:""}
      </div>
    `},render(){return!this.activities||this.activities.length===0?p``:p`
      <div class="bg-surface-dark rounded border border-surface mb-2">
        <div class="flex items-center gap-1.5 px-2 py-1 border-b border-surface">
          <uix-icon name="activity" size="12" class="text-muted"></uix-icon>
          <span class="text-xs text-muted font-medium">Activity</span>
          <span class="text-xs text-muted">(${this.activities.length})</span>
        </div>
        <div class="max-h-48 overflow-y-auto">
          ${this.activities.map(e=>this.renderActivity(e))}
        </div>
      </div>
    `}}});var Zf,em=y(()=>{V();H();Zf={tag:"agent-chat-panel",properties:{messages:u.array({defaultValue:[]}),isLoading:u.boolean({defaultValue:!1}),pendingPermission:u.object({attribute:!1}),pendingQuestion:u.object({attribute:!1}),customEmptyState:u.any({attribute:!1}),availableAgents:u.array({defaultValue:[]}),currentAgent:u.string({defaultValue:"claude"}),hasActiveSession:u.boolean({defaultValue:!1})},scrollToBottom(){requestAnimationFrame(()=>{let e=this.querySelector(".messages-container");e&&(e.scrollTop=e.scrollHeight)})},updated(){this.scrollToBottom()},getSelectedOption(e){if(this.messages[e]?.role!=="assistant")return null;let n=this.messages[e+1];if(!n||n.role!=="user")return null;let s=n.content?.trim().match(/^(\d+)\.\s/);return s?s[1]:null},renderDefaultEmptyState(){return p`
      <div class="flex flex-col items-center justify-center h-full text-muted text-sm">
        <uix-icon name="message-square" size="24" class="mb-2 opacity-50"></uix-icon>
        <span>Start a conversation</span>
      </div>
    `},render(){return p`
      <div class="flex flex-col h-full min-h-0 overflow-hidden">
        <!-- Messages -->
        <div class="messages-container flex-1 min-h-0 overflow-y-auto px-2 py-2 space-y-2">
          ${this.messages.length===0?this.customEmptyState||this.renderDefaultEmptyState():this.messages.map((e,t)=>p`
                  <agent-message
                    .message=${e}
                    .isStreaming=${this.isLoading&&e===this.messages[this.messages.length-1]&&e.role==="assistant"}
                    .selectedOption=${this.getSelectedOption(t)}
                    @select-option=${n=>this.dispatchEvent(new CustomEvent("select-option",{detail:n.detail,bubbles:!0}))}
                  ></agent-message>
                `)}
          ${this.isLoading&&(!this.messages.length||this.messages[this.messages.length-1]?.role!=="assistant")?p`
              <div class="mt-2 flex items-center gap-2 text-muted text-sm">
                <uix-icon name="loader" size="14" class="animate-spin"></uix-icon>
                <span>Thinking...</span>
              </div>
            `:""}

          ${this.pendingPermission?p`
              <agent-permission-inline
                .permission=${this.pendingPermission}
                @decide=${e=>this.dispatchEvent(new CustomEvent("permission-decide",{detail:e.detail,bubbles:!0}))}
              ></agent-permission-inline>
            `:""}

          ${this.pendingQuestion?p`
              <agent-question-inline
                .questions=${this.pendingQuestion.questions}
                .toolUseID=${this.pendingQuestion.toolUseID}
                @answer=${e=>this.dispatchEvent(new CustomEvent("question-answer",{detail:e.detail,bubbles:!0}))}
              ></agent-question-inline>
            `:""}
        </div>

        <!-- Input -->
        <agent-input
          .isLoading=${this.isLoading||!!this.pendingPermission||!!this.pendingQuestion}
          .availableAgents=${this.availableAgents}
          .currentAgent=${this.currentAgent}
          .hasActiveSession=${this.hasActiveSession}
          @send-message=${e=>this.dispatchEvent(new CustomEvent("send-message",{detail:e.detail,bubbles:!0}))}
          @agent-change=${e=>this.dispatchEvent(new CustomEvent("agent-change",{detail:e.detail,bubbles:!0}))}
        ></agent-input>
      </div>
    `}}});var tm,nm=y(()=>{Ue();V();H();Mi();tm={tag:"agent-container",properties:{mode:u.string({defaultValue:"sidebar"}),service:u.object({attribute:!1}),resourceUri:u.string(),leftActivity:u.string(),currentSession:u.object({attribute:!1}),sessions:u.array({defaultValue:[]}),messages:u.array({defaultValue:[]}),activities:u.array({defaultValue:[]}),context:u.object({attribute:!1}),contextProvider:u.object({attribute:!1}),agentConnected:u.boolean({defaultValue:!1}),isLoading:u.boolean({defaultValue:!1}),expandedSections:u.array({defaultValue:["chat"]}),floatingWidth:u.number({defaultValue:380}),floatingHeight:u.number({defaultValue:500}),showSessionsList:u.boolean({defaultValue:!1}),showPlanModal:u.boolean({defaultValue:!1}),planMessage:u.object({attribute:!1}),pendingPermission:u.object({attribute:!1}),pendingQuestion:u.object({attribute:!1}),availableItems:u.array({defaultValue:[]}),mcpTools:u.array({defaultValue:[]}),standalone:u.boolean({defaultValue:!1}),defaultMode:u.string({defaultValue:"minimized"}),position:u.string({defaultValue:"right"}),shortcutEnabled:u.boolean({defaultValue:!0}),customActions:u.array({defaultValue:[]}),availableAgents:u.array({defaultValue:[]}),currentAgent:u.string({defaultValue:"claude"}),showAgentSelector:u.boolean({defaultValue:!1})},async loadAvailableAgents(){try{this.availableAgents=await this.service.getAvailableAgents(),this.currentAgent=this.service.getCurrentAgent()}catch(e){console.warn("[Agent] Failed to load agents:",e)}},async handleSelectAgent(e){this.service.setCurrentAgent(e),this.currentAgent=e},async getMcpTools(){try{let e=j.AI?.agent?.serverUrl||"http://localhost:8765",t=this.currentSession?.agentSessionId,n=t?`${e}/mcp/tools?session=${t}`:`${e}/mcp/tools`,i=(await(await fetch(n)).json()).tools||[],o=this.service?.getMcpConfig()?.tools||{};return i.map(a=>({...a,enabled:o[a.name]!==void 0?o[a.name]:a.enabled}))}catch(e){return console.warn("[Agent] Failed to get MCP tools:",e),[]}},async handleToggleTool(e){let{toolName:t,enabled:n}=e.detail;try{this.service.setMcpToolEnabled(t,n),this.currentSession?.agentSessionId&&await j.AI.agent.setMcpToolEnabled(this.currentSession.agentSessionId,t,n),this.mcpTools=await this.getMcpTools()}catch(s){console.error("[Agent] Failed to toggle MCP tool:",s)}},async handleInvokeTool(e){let{tool:t,mode:n,prompt:s}=e.detail;if(n==="ai"&&s){let r=`Use the ${t.name} tool to: ${s}`;await this.handleSendMessage(r)}},async handleActionSelected(e){this.service.setPersonality(e.prompt),this.currentSession||await this.service.createSession();let t=e.initialMessage||"Let's get started.";await this.handleSendMessage(t)},renderActionsEmptyState(){return!this.customActions||this.customActions.length===0?null:p`
      <div class="flex flex-col items-center justify-center h-full p-4">
        <div class="text-center mb-4">
          <uix-icon name="sparkles" size="32" class="text-primary mb-2"></uix-icon>
          <h3 class="text-sm font-medium text-default">How can I help?</h3>
          <p class="text-xs text-muted mt-1">Choose an action to get started</p>
        </div>
        <div class="grid grid-cols-2 gap-2 w-full max-w-xs">
          ${this.customActions.map(e=>p`
              <button
                type="button"
                class="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-surface hover:border-primary hover:bg-surface-light transition-all text-center group"
                @click=${()=>this.handleActionSelected(e)}
              >
                <div class="w-8 h-8 rounded-full bg-surface-light group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <uix-icon name=${e.icon} size="16" class="text-muted group-hover:text-primary transition-colors"></uix-icon>
                </div>
                <span class="text-xs font-medium text-default leading-tight">${e.label}</span>
                <span class="text-[10px] text-muted leading-tight line-clamp-2">${e.description}</span>
              </button>
            `)}
        </div>
      </div>
    `},async getAvailableItems(){if(!this.contextProvider)return[];let e=await this.contextProvider.getAvailableItems();return!e||e.length===0?[]:e.map(t=>({uri:t.uri,label:t.label||this._getLabelFromUri(t.uri),tokens:t.tokens||0}))},_getLabelFromUri(e){try{return new URL(e).pathname.split("/").filter(Boolean).pop()||e}catch{return e}},async handleToggleItem(e){let{uri:t,add:n}=e.detail;if(n)try{await this.service.addToContext(t)}catch(s){console.error("[Agent] Failed to add item to context:",s)}else{let s=this.service.context.items.find(r=>r.source===t);s&&await this.service.removeFromContext(s.id)}this.availableItems=await this.getAvailableItems()},async connected(){if(this.service||(this.service=new cn),this.contextProvider&&this.service.setContextProvider(this.contextProvider),this.standalone){let e=localStorage.getItem("agent_mode");this.mode=e||this.defaultMode,this._registerKeyboardShortcut()}if(this._unsubSession=this.service.subscribe("sessionChange",async({session:e})=>{this.currentSession=e,this.messages=e?.messages||[],e?.agentSessionId&&(this.mcpTools=await this.getMcpTools())}),this._unsubContext=this.service.subscribe("contextChange",async({context:e})=>{this.context=e,this.availableItems=await this.getAvailableItems()}),this._unsubMessage=this.service.subscribe("messageAdded",({message:e})=>{e.role==="user"&&!this.isLoading&&(this.messages=[...this.messages,e])}),this._unsubConnection=this.service.subscribe("connectionChange",({connected:e})=>{this.agentConnected=e,e&&this.loadAvailableAgents()}),this._unsubAgentChange=this.service.subscribe("agentChange",({agent:e})=>{this.currentAgent=e}),this.contextProvider){this._unsubAvailableItems=this.contextProvider.subscribe("availableItems",async()=>{this.availableItems=await this.getAvailableItems()}),this._unsubActiveItem=this.contextProvider.subscribe("activeItem",async()=>{let t=this.contextProvider.getActiveItem();this.resourceUri=t?.uri||null,this.resourceUri&&await this._autoAddActiveResource(this.resourceUri)});let e=this.contextProvider.getActiveItem();this.resourceUri=e?.uri||null}this.context=this.service.getContext(),this.availableItems=await this.getAvailableItems()},disconnected(){this._unsubSession?.(),this._unsubContext?.(),this._unsubMessage?.(),this._unsubConnection?.(),this._unsubAgentChange?.(),this._unsubAvailableItems?.(),this._unsubActiveItem?.(),this._keydownHandler&&document.removeEventListener("keydown",this._keydownHandler)},_registerKeyboardShortcut(){!this.standalone||!this.shortcutEnabled||(this._keydownHandler=e=>{(e.ctrlKey||e.metaKey)&&e.altKey&&e.key.toUpperCase()==="A"&&(e.preventDefault(),this.toggleAssistant())},document.addEventListener("keydown",this._keydownHandler))},toggleAssistant(){this.mode==="minimized"?this.setMode("floating"):this.mode==="floating"?this.setMode("sidebar"):this.setMode("minimized")},async _autoAddActiveResource(e){if(!e||!this.service)return;if(!this.service.context.items.some(n=>n.source===e))try{await this.service.addToContext(e),this.availableItems=await this.getAvailableItems()}catch(n){console.warn("[Agent] Failed to auto-add active resource:",n)}},setMode(e){this.mode=e,this.standalone&&localStorage.setItem("agent_mode",e),this.dispatchEvent(new CustomEvent("mode-change",{detail:{mode:e},bubbles:!0}))},async toggleSection(e){this.expandedSections.includes(e)?this.expandedSections=this.expandedSections.filter(t=>t!==e):(this.expandedSections=[...this.expandedSections,e],e==="context"&&(this.availableItems=await this.getAvailableItems(),this.mcpTools=await this.getMcpTools()))},async handleNewSession(){this.showSessionsList=!1,this.isLoading=!0;try{await this.service.createSession()}catch(e){console.error("[Agent] Failed to create session:",e)}finally{this.isLoading=!1}},async handleLoadSessions(){let e=await j.Model.agent_sessions?.getAll({order:"-updatedAt",limit:20});this.sessions=e||[]},async handleSelectSession(e){this.showSessionsList=!1,this.isLoading=!0;try{await this.service.resumeSession(e)}catch(t){console.error("[Agent] Failed to select session:",t)}finally{this.isLoading=!1}},toggleSessionsList(){this.showAgentSelector=!1,this.showSessionsList=!this.showSessionsList,this.showSessionsList&&this.handleLoadSessions()},async handleSendMessage(e,t=!1){if(!(!e?.trim()||this.isLoading)){this.isLoading=!0,this.activities=[];try{this.currentSession||await this.service.createSession();let n={role:"user",content:e,id:`temp_${Date.now()}`,originalPrompt:e},s={role:"assistant",content:"",turns:[],activities:[],planMode:t};this.messages=[...this.messages,n,s];for await(let r of this.service.sendMessage(e,{planMode:t}))if(r.type==="content")s.content=r.content,s.turns=r.turns||[],s.planMode=r.planMode,r.isComplete&&r.activities&&(s.activities=r.activities),this.messages=[...this.messages.slice(0,-1),{...s}],r.isComplete&&r.planMode&&(this.planMessage={...s,originalPrompt:e},this.showPlanModal=!0);else if(r.type==="activity"){console.log("[Container] Activity received:",r.activity);let{activity:i}=r;i.type==="tool_use"?(this.activities=[...this.activities,i],s.activities=[...this.activities]):i.type==="tool_result"&&(this.activities=this.activities.map(o=>o.id===i.id?{...o,...i}:o),s.activities=[...this.activities]),this.messages=[...this.messages.slice(0,-1),{...s}]}else r.type==="permission_request"?this.pendingPermission=r:r.type==="question_request"?this.pendingQuestion=r:r.type==="cancelled"&&(s.content=r.content||"",s.cancelled=!0,this.messages=[...this.messages.slice(0,-1),{...s}])}catch(n){console.error("[Agent] Failed to send message:",n)}finally{this.isLoading=!1}}},async handlePermissionDecision({approved:e,alwaysAllow:t}){if(!this.pendingPermission)return;let n=j.AI?.agent?.serverUrl||"http://localhost:8765";try{await fetch(`${n}/permission`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({toolUseID:this.pendingPermission.toolUseID,approved:e,alwaysAllow:t})})}catch(s){console.error("[Container] Failed to send permission decision:",s)}this.pendingPermission=null},async handleQuestionAnswer({answers:e}){if(!this.pendingQuestion)return;let t=j.AI?.agent?.serverUrl||"http://localhost:8765";try{await fetch(`${t}/question`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({toolUseID:this.pendingQuestion.toolUseID,answers:e})})}catch(n){console.error("[Container] Failed to send question answer:",n)}this.pendingQuestion=null},handleSelectOption({option:e,text:t}){this.handleSendMessage(`${e}. ${t}`,!1)},handleExecutePlan(){this.planMessage?.originalPrompt&&(this.showPlanModal=!1,this.handleSendMessage(`Execute the plan you just created for: ${this.planMessage.originalPrompt}`,!1))},handleClosePlanModal(){this.showPlanModal=!1,this.planMessage=null},handleCancelMessage(){this.service.cancelMessage()},async handleConnectAgent(){j.events.emit("CLAUDE:startMonitor"),await this.service.checkHealth()&&(this.mcpTools=await this.getMcpTools(),this.resourceUri&&await this._autoAddActiveResource(this.resourceUri))},async handleAddContext(){let e=this.contextProvider?.getActiveItem();if(e?.uri)try{await this.service.addToContext(e.uri)}catch(t){console.error("[Agent] Failed to add context:",t)}},async handleRemoveContext(e){await this.service.removeFromContext(e)},getAgentIcon(e){return{claude:"brain",gemini:"sparkles",goose:"bird",codex:"code"}[e]||"bot"},getAgentName(){return this.availableAgents.find(t=>t.id===this.currentAgent)?.name||this.currentAgent||"Agent"},renderHeader(){let e=this.agentConnected?"bg-success":"bg-danger";return p`
      <div class="relative flex-shrink-0">
        <div class="flex items-center justify-between px-2 py-1.5 border-b border-surface bg-surface">
          <div class="flex items-center gap-1">
            <button
              type="button"
              class="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-surface-light transition-colors"
              title="Change agent"
              @click=${()=>this.toggleAgentSelector()}
            >
              <uix-icon name=${this.getAgentIcon(this.currentAgent)} size="14" class="text-primary"></uix-icon>
              <span class="font-medium text-xs">${this.getAgentName()}</span>
              <uix-icon name="chevron-down" size="10" class="text-muted"></uix-icon>
            </button>
            <div class="w-1.5 h-1.5 rounded-full ${e}"></div>
          </div>

          <div class="flex items-center gap-0.5">
            ${this.mode==="floating"?p`
                <button type="button" class="p-1 rounded hover:bg-surface-light" title="Dock" @click=${()=>this.setMode("sidebar")}>
                  <uix-icon name="panel-right" size="12"></uix-icon>
                </button>
              `:p`
                <button type="button" class="p-1 rounded hover:bg-surface-light" title="Float" @click=${()=>this.setMode("floating")}>
                  <uix-icon name="picture-in-picture-2" size="12"></uix-icon>
                </button>
              `}
            <button type="button" class="p-1 rounded hover:bg-surface-light" title="Minimize" @click=${()=>this.setMode("minimized")}>
              <uix-icon name="minus" size="12"></uix-icon>
            </button>
            <button type="button" class="p-1 rounded hover:bg-surface-light" title="Conversations" @click=${()=>this.toggleSessionsList()}>
              <uix-icon name="messages-square" size="12"></uix-icon>
            </button>
            <button type="button" class="p-1 rounded hover:bg-surface-light" title="New" ?disabled=${this.isLoading} @click=${()=>this.handleNewSession()}>
              <uix-icon name="plus" size="12"></uix-icon>
            </button>
          </div>
        </div>
        ${this.showAgentSelector?this.renderAgentSelector():""}
        ${this.showSessionsList?this.renderSessionsList():""}
      </div>
    `},toggleAgentSelector(){this.showSessionsList=!1,this.showAgentSelector=!this.showAgentSelector,this.showAgentSelector&&this.availableAgents.length===0&&this.loadAvailableAgents()},renderAgentSelector(){return p`
      <div class="absolute top-full left-0 right-0 bg-surface-dark border border-surface rounded-b shadow-lg z-50 max-h-48 overflow-y-auto">
        <div class="p-1.5 border-b border-surface">
          <span class="text-[10px] text-muted px-2">Select Agent</span>
        </div>
        ${this.availableAgents.length>0?p`
            <div class="py-0.5">
              ${this.availableAgents.map(e=>p`
                <button
                  type="button"
                  class="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-surface-light transition-colors text-left ${this.currentAgent===e.id?"bg-surface-light":""}"
                  @click=${()=>{this.handleSelectAgent(e.id),this.showAgentSelector=!1}}
                >
                  <uix-icon name=${this.getAgentIcon(e.id)} size="12" class="${this.currentAgent===e.id?"text-primary":"text-muted"} flex-shrink-0"></uix-icon>
                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-medium">${e.name}</div>
                  </div>
                  ${this.currentAgent===e.id?p`<uix-icon name="check" size="12" class="text-primary"></uix-icon>`:""}
                </button>
              `)}
            </div>
          `:p`
            <div class="px-2 py-3 text-center text-xs text-muted">
              Loading agents...
            </div>
          `}
      </div>
    `},renderSessionsList(){return p`
      <div class="absolute top-full left-0 right-0 bg-surface-dark border border-surface rounded-b shadow-lg z-50 max-h-48 overflow-y-auto">
        <div class="p-1.5 border-b border-surface">
          <button
            type="button"
            class="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface-light transition-colors text-primary"
            @click=${()=>this.handleNewSession()}
          >
            <uix-icon name="plus" size="12"></uix-icon>
            <span class="text-xs font-medium">New Conversation</span>
          </button>
        </div>
        ${this.sessions.length>0?p`
            <div class="py-0.5">
              ${this.sessions.map(e=>p`
                <button
                  type="button"
                  class="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-surface-light transition-colors text-left ${this.currentSession?.id===e.id?"bg-surface-light":""}"
                  @click=${()=>this.handleSelectSession(e.id)}
                >
                  <uix-icon name="message-circle" size="12" class="text-muted flex-shrink-0"></uix-icon>
                  <div class="flex-1 min-w-0">
                    <div class="text-xs truncate">${e.title||"Untitled"}</div>
                  </div>
                </button>
              `)}
            </div>
          `:p`
            <div class="px-2 py-3 text-center text-xs text-muted">
              No conversations yet
            </div>
          `}
      </div>
    `},renderConnectionInstructions(){return this.agentConnected?"":p`
      <div class="px-3 py-3 border-b border-surface flex-shrink-0">
        <div class="bg-surface rounded border border-surface-light p-3">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 rounded-full bg-danger"></div>
            <span class="text-xs font-medium">Claude Bridge</span>
          </div>
          <p class="text-xs text-muted mb-2">
            Run the bridge locally for AI capabilities:
          </p>
          <div class="bg-inverse rounded px-2 py-1.5 font-mono text-xs text-default select-all mb-3">
            bootstrapp agent:bridge
          </div>
          <button
            type="button"
            class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary text-inverse rounded text-xs font-medium hover:opacity-90 transition-opacity"
            @click=${()=>this.handleConnectAgent()}
          >
            <uix-icon name="plug" size="14"></uix-icon>
            Connect
          </button>
        </div>
      </div>
    `},renderContent(){let e=this.expandedSections.includes("context");return p`
      <div class="flex flex-col flex-1 min-h-0 overflow-hidden">
        <!-- Connection Instructions (when disconnected) -->
        ${this.renderConnectionInstructions()}

        <!-- Context Section (collapsible, at top) -->
        <div class="border-b border-surface flex-shrink-0">
          <button
            type="button"
            class="w-full flex items-center justify-between px-3 py-1.5 hover:bg-surface-light transition-colors"
            @click=${()=>this.toggleSection("context")}
          >
            <span class="flex items-center gap-2 text-xs text-muted">
              <uix-icon name=${e?"chevron-down":"chevron-right"} size="12"></uix-icon>
              Context
            </span>
            <span class="text-xs text-muted">
              ${this.context?.totalTokens||0} / ${this.context?.maxTokens||8e3}
            </span>
          </button>
          ${e?p`
              <agent-context-panel
                .context=${this.context}
                .availableItems=${this.availableItems}
                .itemsLabel=${this.contextProvider?.label||"Available Items"}
                .mcpTools=${this.mcpTools}
                .resourceUri=${this.resourceUri}
                @add-context=${()=>this.handleAddContext()}
                @remove-context=${t=>this.handleRemoveContext(t.detail.itemId)}
                @toggle-item=${t=>this.handleToggleItem(t)}
                @toggle-tool=${t=>this.handleToggleTool(t)}
                @invoke-tool=${t=>this.handleInvokeTool(t)}
              ></agent-context-panel>
            `:""}
        </div>

        <!-- Chat Section (fills remaining space) -->
        <div class="flex-1 flex flex-col min-h-0 overflow-hidden">
          <agent-chat-panel
            class="flex-1 min-h-0 overflow-hidden"
            .messages=${this.messages}
            .isLoading=${this.isLoading}
            .pendingPermission=${this.pendingPermission}
            .pendingQuestion=${this.pendingQuestion}
            .customEmptyState=${this.renderActionsEmptyState()}
            .availableAgents=${this.availableAgents}
            .currentAgent=${this.currentAgent}
            .hasActiveSession=${!!this.currentSession?.agentSessionId}
            @send-message=${t=>this.handleSendMessage(t.detail.content,t.detail.planMode)}
            @select-option=${t=>this.handleSelectOption(t.detail)}
            @permission-decide=${t=>this.handlePermissionDecision(t.detail)}
            @question-answer=${t=>this.handleQuestionAnswer(t.detail)}
            @cancel-message=${()=>this.handleCancelMessage()}
            @agent-change=${t=>this.handleSelectAgent(t.detail.agentId)}
          ></agent-chat-panel>
        </div>

      </div>
    `},renderMinimized(){let e=this.position==="left"?"left-4":"right-4";return p`
      <button
        type="button"
        class="fixed bottom-4 ${e} w-12 h-12 rounded-full bg-primary text-inverse shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50"
        title="Open AI Assistant (Ctrl+Alt+A)"
        @click=${()=>this.setMode("floating")}
      >
        <uix-icon name="brain" size="24"></uix-icon>
        ${this.messages.length>0&&!this.agentConnected?p`<span class="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full"></span>`:""}
      </button>
    `},renderFloating(){let e=this.position==="left"?"left-4":"right-4";return p`
      <div
        class="fixed bottom-4 ${e} bg-surface-dark text-default rounded-lg shadow-2xl border border-surface overflow-hidden z-40 flex flex-col"
        style="width: ${this.floatingWidth}px; height: ${this.floatingHeight}px;"
      >
        ${this.renderHeader()}
        ${this.renderContent()}
      </div>
    `},renderSidebar(){return p`
      <div class="flex flex-col h-full bg-surface-dark text-default">
        ${this.renderHeader()}
        ${this.renderContent()}
      </div>
    `},renderStandaloneSidebar(){let e=this.position==="left"?"left-0":"right-0";return p`
      <div class="fixed top-0 ${e} h-screen w-96 z-40 shadow-lg bg-surface-dark border-l border-surface flex flex-col">
        ${this.renderHeader()}
        ${this.renderContent()}
      </div>
    `},render(){if(this.standalone)return p`
        ${this.mode==="minimized"?this.renderMinimized():""}
        ${this.mode==="floating"?this.renderFloating():""}
        ${this.mode==="sidebar"?this.renderStandaloneSidebar():""}
        ${this.showPlanModal&&this.planMessage?p`
            <agent-plan-modal
              .message=${this.planMessage}
              @close=${()=>this.handleClosePlanModal()}
              @execute=${()=>this.handleExecutePlan()}
            ></agent-plan-modal>
          `:""}
      `;let e;return this.mode==="minimized"?e=this.renderMinimized():this.mode==="floating"?e=this.renderFloating():e=this.renderSidebar(),p`
      ${e}
      ${this.showPlanModal&&this.planMessage?p`
          <agent-plan-modal
            .message=${this.planMessage}
            @close=${()=>this.handleClosePlanModal()}
            @execute=${()=>this.handleExecutePlan()}
          ></agent-plan-modal>
        `:""}
    `}}});var sm,rm=y(()=>{V();H();sm={tag:"agent-context-item",properties:{item:u.object({attribute:!1})},handleRemove(){this.dispatchEvent(new CustomEvent("remove",{bubbles:!0}))},getIconName(){let{type:e,source:t}=this.item||{};return e==="file"?"file-text":t?.startsWith("cms://")?"edit-3":t?.startsWith("chat://")?"message-square":"box"},render(){let{label:e,tokenEstimate:t=0,type:n}=this.item||{},s=this.getIconName();return p`
      <div class="flex items-center gap-2 px-2 py-1.5 bg-surface rounded border border-surface-light group">
        <uix-icon name=${s} size="14" class="text-muted flex-shrink-0"></uix-icon>
        <div class="flex-1 min-w-0">
          <div class="text-xs truncate" title=${e}>${e}</div>
          <div class="text-xs text-muted">${t.toLocaleString()} tokens</div>
        </div>
        <button
          type="button"
          class="p-0.5 text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
          title="Remove"
          @click=${()=>this.handleRemove()}
        >
          <uix-icon name="x" size="12"></uix-icon>
        </button>
      </div>
    `}}});var im,om=y(()=>{V();H();im={tag:"agent-context-panel",properties:{context:u.object({attribute:!1}),availableItems:u.array({attribute:!1}),itemsLabel:u.string({defaultValue:"Available Items"}),mcpTools:u.array({attribute:!1}),mcpServers:u.array({attribute:!1}),mcpResources:u.array({attribute:!1}),mcpLoading:u.boolean({defaultValue:!1}),mcpServersCollapsed:u.boolean({defaultValue:!0}),agentServerUrl:u.string({defaultValue:"http://localhost:8765"}),resourceUri:u.string(),selectedTool:u.object({attribute:!1}),invokeMode:u.string({defaultValue:"ai"}),invokePrompt:u.string({defaultValue:""})},async connected(){await this.loadMcpData()},async loadMcpData(){this.mcpLoading=!0;try{let[e,t,n]=await Promise.all([fetch(`${this.agentServerUrl}/mcp/servers`),fetch(`${this.agentServerUrl}/mcp/resources`),fetch(`${this.agentServerUrl}/mcp/tools`)]);if(e.ok){let s=await e.json();this.mcpServers=s.servers||[]}if(t.ok){let s=await t.json();this.mcpResources=s.resources||[]}if(n.ok){let s=await n.json();this.mcpTools=s.tools||[]}}catch(e){console.error("[Context] Failed to load MCP data:",e)}this.mcpLoading=!1},handleAddMcpResource(e){this.dispatchEvent(new CustomEvent("add-context",{detail:{uri:e.uri,label:e.name||e.uri},bubbles:!0}))},handleToggleTool(e,t){this.dispatchEvent(new CustomEvent("toggle-tool",{detail:{toolName:e,enabled:t},bubbles:!0}))},handleInvokeTool(e){this.selectedTool=e,this.invokeMode="ai",this.invokePrompt=""},handleCloseInvoke(){this.selectedTool=null},handleExecuteTool(){this.invokeMode==="ai"&&this.invokePrompt&&this.dispatchEvent(new CustomEvent("invoke-tool",{detail:{tool:this.selectedTool,mode:"ai",prompt:this.invokePrompt},bubbles:!0})),this.handleCloseInvoke()},getToolIcon(e){return e.startsWith("editor_")?"pen":e.startsWith("db_")?"database":"wrench"},getTabIcon(e){return e.startsWith("file://")?"file-code":e.startsWith("cms://")?"database":e.startsWith("chat://")?"message-circle":"file"},getTabLabel(e){try{return new URL(e).pathname.split("/").filter(Boolean).pop()||e}catch{return e}},getResourceLabel(e){if(e.includes("{"))return e.split("://")[1]||e;try{let t=new URL(e);return(t.pathname||t.host).replace(/^\//,"")||e.split("://")[1]||e}catch{return e.split("://")[1]||e}},isTabInContext(e){return this.context?.items?.some(t=>t.source===e)},handleToggleItem(e,t){this.dispatchEvent(new CustomEvent("toggle-item",{detail:{uri:e,add:t},bubbles:!0}))},handleAddContext(){this.dispatchEvent(new CustomEvent("add-context",{bubbles:!0}))},handleRemoveContext(e){this.dispatchEvent(new CustomEvent("remove-context",{detail:{itemId:e},bubbles:!0}))},renderContextItem(e){return p`
      <div class="flex items-center gap-2 py-1.5 px-2 bg-surface rounded group">
        <uix-icon name="${this.getTabIcon(e.source)}" size="14" class="text-muted flex-shrink-0"></uix-icon>
        <span class="text-xs truncate flex-1" title="${e.source}">${e.label}</span>
        <button
          type="button"
          class="opacity-0 group-hover:opacity-100 text-muted hover:text-danger transition-opacity"
          @click=${()=>this.handleRemoveContext(e.id)}
        >
          <uix-icon name="x" size="12"></uix-icon>
        </button>
      </div>
    `},renderInvokeModal(){return this.selectedTool?p`
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click=${()=>this.handleCloseInvoke()}>
        <div class="bg-surface-dark border border-border rounded-lg p-4 w-80 max-w-[90vw]" @click=${e=>e.stopPropagation()}>
          <div class="flex items-center gap-2 mb-3">
            <uix-icon name="${this.getToolIcon(this.selectedTool.name)}" size="16"></uix-icon>
            <span class="font-medium text-sm">${this.selectedTool.name}</span>
          </div>
          <p class="text-xs text-muted mb-4">${this.selectedTool.description}</p>

          <div class="space-y-3">
            <label class="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="invokeMode"
                value="ai"
                .checked=${this.invokeMode==="ai"}
                @change=${()=>this.invokeMode="ai"}
                class="mt-1"
              />
              <div class="flex-1">
                <div class="text-xs font-medium">Describe what you want</div>
                <textarea
                  class="w-full mt-1 px-2 py-1.5 bg-surface border border-border rounded text-xs resize-none"
                  rows="3"
                  placeholder="e.g., Translate to Spanish..."
                  .value=${this.invokePrompt}
                  @input=${e=>this.invokePrompt=e.target.value}
                  @focus=${()=>this.invokeMode="ai"}
                ></textarea>
              </div>
            </label>
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <button
              type="button"
              class="px-3 py-1.5 text-xs rounded hover:bg-surface transition-colors"
              @click=${()=>this.handleCloseInvoke()}
            >Cancel</button>
            <button
              type="button"
              class="px-3 py-1.5 text-xs bg-primary text-inverse rounded hover:opacity-90 transition-opacity"
              ?disabled=${!this.invokePrompt}
              @click=${()=>this.handleExecuteTool()}
            >Execute</button>
          </div>
        </div>
      </div>
    `:""},render(){let{items:e=[]}=this.context||{},t=this.availableItems||[];return p`
      <div class="px-3 py-2 space-y-2">
        <!-- Selection meter -->
        <div class="space-y-1">
          <div class="flex items-center justify-between text-xs">
            <span class="text-muted">Selected resources</span>
            <span class="text-muted">${e.length} item${e.length!==1?"s":""}</span>
          </div>
        </div>

        <!-- Available Items Section -->
        ${t.length>0?p`
            <div class="border-b border-border pb-2">
              <div class="text-xs text-muted mb-1.5">${this.itemsLabel}</div>
              <div class="space-y-0.5">
                ${t.map(n=>{let s=this.isTabInContext(n.uri);return p`
                    <label class="flex items-center gap-2 py-1 px-2 hover:bg-surface rounded cursor-pointer text-xs">
                      <uix-checkbox
                        size="sm"
                        .checked=${s}
                        @change=${()=>this.handleToggleItem(n.uri,!s)}
                      ></uix-checkbox>
                      <uix-icon name="${this.getTabIcon(n.uri)}" size="12" class="text-muted flex-shrink-0"></uix-icon>
                      <span class="truncate flex-1">${n.label}</span>
                      <span class="text-muted">${n.tokens}</span>
                    </label>
                  `})}
              </div>
            </div>
          `:""}

        <!-- MCP Resources Section -->
        ${this.mcpResources?.filter(n=>!n.uri.includes("{")).length>0?p`
            <div class="border-b border-border pb-2">
              <div class="flex items-center justify-between text-xs text-muted mb-1.5">
                <span>Resources</span>
                <button
                  type="button"
                  class="p-1 hover:bg-surface rounded"
                  title="Refresh"
                  @click=${()=>this.loadMcpData()}
                >
                  <uix-icon name="refresh-cw" size="12"></uix-icon>
                </button>
              </div>
              <div class="space-y-0.5">
                ${this.mcpResources.filter(n=>!n.uri.includes("{")).map(n=>p`
                  <button
                    type="button"
                    class="flex items-center gap-2 w-full py-1.5 px-2 text-left text-xs hover:bg-surface rounded transition-colors ${this.isTabInContext(n.uri)?"bg-surface":""}"
                    title="${n.description||n.uri}"
                    @click=${()=>this.handleAddMcpResource(n)}
                  >
                    <uix-icon name="database" size="12" class="text-muted flex-shrink-0"></uix-icon>
                    <span class="truncate flex-1">${this.getResourceLabel(n.uri)}</span>
                    ${this.isTabInContext(n.uri)?p`<uix-icon name="check" size="12" class="text-primary"></uix-icon>`:p`<uix-icon name="plus" size="12" class="text-muted"></uix-icon>`}
                  </button>
                `)}
              </div>
            </div>
          `:this.mcpLoading?p`<div class="text-xs text-muted py-2">Loading...</div>`:""}

        <!-- Selected resources -->
        ${e.length>0?p`
            <div class="space-y-1">
              <div class="text-xs text-muted mb-1">Agent will access via MCP</div>
              ${e.map(n=>this.renderContextItem(n))}
            </div>
          `:p`
            <div class="text-xs text-muted text-center py-2">
              No resources selected
            </div>
          `}

        <!-- Add context button -->
        <button
          type="button"
          class="w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-surface border border-surface-light rounded text-xs hover:bg-surface-light transition-colors"
          @click=${()=>this.handleAddContext()}
        >
          <uix-icon name="plus" size="12"></uix-icon>
          Add current resource
        </button>
      </div>

      ${this.renderInvokeModal()}
    `}}});var am,lm=y(()=>{V();H();am={tag:"agent-header",properties:{agentConnected:u.boolean({defaultValue:!1}),session:u.object({attribute:!1}),sessions:u.array({defaultValue:[]}),availableAgents:u.array({defaultValue:[]}),currentAgent:u.string({defaultValue:"claude"}),isLoading:u.boolean({defaultValue:!1}),showSessionsList:u.boolean({defaultValue:!1}),showAgentSelector:u.boolean({defaultValue:!1})},handleNewSession(){this.showSessionsList=!1,this.dispatchEvent(new CustomEvent("new-session",{bubbles:!0}))},handleSelectSession(e){this.showSessionsList=!1,this.dispatchEvent(new CustomEvent("select-session",{detail:{sessionId:e},bubbles:!0}))},handleSelectAgent(e){this.showAgentSelector=!1,this.dispatchEvent(new CustomEvent("select-agent",{detail:{agentId:e},bubbles:!0}))},toggleSessionsList(){this.showAgentSelector=!1,this.showSessionsList=!this.showSessionsList,this.showSessionsList&&this.dispatchEvent(new CustomEvent("load-sessions",{bubbles:!0}))},toggleAgentSelector(){this.showSessionsList=!1,this.showAgentSelector=!this.showAgentSelector,this.showAgentSelector&&this.dispatchEvent(new CustomEvent("load-agents",{bubbles:!0}))},getAgentIcon(e){return{claude:"brain",gemini:"sparkles",goose:"bird",codex:"code"}[e]||"bot"},getAgentName(){return this.availableAgents.find(t=>t.id===this.currentAgent)?.name||this.currentAgent||"Agent"},render(){let e=this.agentConnected?"bg-success":"bg-danger",t=this.agentConnected?"Connected":"Disconnected";return p`
      <div class="relative">
        <div class="flex items-center justify-between px-3 py-2 border-b border-surface bg-surface">
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-surface-light transition-colors"
              title="Change agent"
              @click=${()=>this.toggleAgentSelector()}
            >
              <uix-icon name=${this.getAgentIcon(this.currentAgent)} size="16" class="text-primary"></uix-icon>
              <span class="font-medium text-sm">${this.getAgentName()}</span>
              <uix-icon name="chevron-down" size="12" class="text-muted"></uix-icon>
            </button>
            <div class="flex items-center gap-1" title=${t}>
              <div class="w-2 h-2 rounded-full ${e}"></div>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <button
              type="button"
              class="p-1.5 rounded hover:bg-surface-light transition-colors flex items-center gap-1"
              title="Conversations"
              @click=${()=>this.toggleSessionsList()}
            >
              <uix-icon name="messages-square" size="16"></uix-icon>
            </button>
            <button
              type="button"
              class="p-1.5 rounded hover:bg-surface-light transition-colors"
              title="New Conversation"
              ?disabled=${this.isLoading}
              @click=${()=>this.handleNewSession()}
            >
              <uix-icon name="plus" size="16"></uix-icon>
            </button>
          </div>
        </div>

        ${this.showAgentSelector?this.renderAgentSelector():""}
        ${this.showSessionsList?this.renderSessionsList():""}
      </div>
    `},renderAgentSelector(){return p`
      <div class="absolute top-full left-0 right-0 bg-surface-dark border border-surface rounded-b shadow-lg z-50 max-h-64 overflow-y-auto">
        <div class="p-2 border-b border-surface">
          <span class="text-xs text-muted px-2">Select Agent</span>
        </div>
        ${this.availableAgents.length>0?p`
            <div class="py-1">
              ${this.availableAgents.map(e=>p`
                <button
                  type="button"
                  class="w-full flex items-center gap-2 px-3 py-2 hover:bg-surface-light transition-colors text-left ${this.currentAgent===e.id?"bg-surface-light":""}"
                  @click=${()=>this.handleSelectAgent(e.id)}
                >
                  <uix-icon name=${this.getAgentIcon(e.id)} size="16" class="${this.currentAgent===e.id?"text-primary":"text-muted"} flex-shrink-0"></uix-icon>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium">${e.name}</div>
                    <div class="text-xs text-muted">${e.models?.length||0} model${e.models?.length!==1?"s":""}</div>
                  </div>
                  ${this.currentAgent===e.id?p`<uix-icon name="check" size="14" class="text-primary"></uix-icon>`:""}
                </button>
              `)}
            </div>
          `:p`
            <div class="px-3 py-4 text-center text-sm text-muted">
              No agents available
            </div>
          `}
      </div>
    `},renderSessionsList(){return p`
      <div class="absolute top-full left-0 right-0 bg-surface-dark border border-surface rounded-b shadow-lg z-50 max-h-64 overflow-y-auto">
        <div class="p-2 border-b border-surface">
          <button
            type="button"
            class="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-surface-light transition-colors text-primary"
            @click=${()=>this.handleNewSession()}
          >
            <uix-icon name="plus" size="14"></uix-icon>
            <span class="text-sm font-medium">New Conversation</span>
          </button>
        </div>
        ${this.sessions.length>0?p`
            <div class="py-1">
              ${this.sessions.map(e=>p`
                <button
                  type="button"
                  class="w-full flex items-center gap-2 px-3 py-2 hover:bg-surface-light transition-colors text-left ${this.session?.id===e.id?"bg-surface-light":""}"
                  @click=${()=>this.handleSelectSession(e.id)}
                >
                  <uix-icon name=${this.getAgentIcon(e.agentId)} size="14" class="text-muted flex-shrink-0"></uix-icon>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm truncate">${e.title||"Untitled"}</div>
                    <div class="text-xs text-muted">${e.agentName||e.agentId||"Agent"} · ${e.messages?.length||0} messages</div>
                  </div>
                </button>
              `)}
            </div>
          `:p`
            <div class="px-3 py-4 text-center text-sm text-muted">
              No conversations yet
            </div>
          `}
      </div>
    `}}});var l1,cm,um=y(()=>{V();H();l1=[{command:"/plan",description:"Create implementation plan",icon:"clipboard-list"},{command:"/review",description:"Review code changes",icon:"eye"},{command:"/refactor",description:"Suggest refactoring",icon:"wrench"},{command:"/test",description:"Generate tests",icon:"flask-conical"},{command:"/explain",description:"Explain selected code",icon:"book-open"},{command:"/fix",description:"Fix bugs or errors",icon:"bug"},{command:"/docs",description:"Generate documentation",icon:"file-text"}],cm={tag:"agent-input",style:!0,properties:{isLoading:u.boolean({defaultValue:!1}),planMode:u.boolean({defaultValue:!1}),contextItems:u.array({defaultValue:[]}),projectFiles:u.array({defaultValue:[]}),availableAgents:u.array({defaultValue:[]}),currentAgent:u.string({defaultValue:"claude",sync:"local"}),currentModel:u.string({sync:"local"}),hasActiveSession:u.boolean({defaultValue:!1}),_inputValue:u.string({defaultValue:""}),_showMentionMenu:u.boolean({defaultValue:!1}),_mentionQuery:u.string({defaultValue:""}),_mentionStartPos:u.number({defaultValue:-1}),_selectedMentionIndex:u.number({defaultValue:0}),_showAgentMenu:u.boolean({defaultValue:!1}),_showCommandMenu:u.boolean({defaultValue:!1}),_commandQuery:u.string({defaultValue:""}),_commandStartPos:u.number({defaultValue:-1}),_selectedCommandIndex:u.number({defaultValue:0}),customCommands:u.array({defaultValue:[]})},get filteredMentionItems(){let{_mentionQuery:e=""}=this,t=e.toLowerCase(),n=[];return this.contextItems.forEach(s=>{let r=s.name||s.path||s.url||"Context";r.toLowerCase().includes(t)&&n.push({type:"context",name:r,icon:"file-text",data:s})}),this.projectFiles.forEach(s=>{if(s.toLowerCase().includes(t)){let r=s.split("/").pop();n.push({type:"file",name:r,path:s,icon:"file",data:{path:s}})}}),n.slice(0,8)},get selectedAgentInfo(){return this.availableAgents.find(e=>e.id===this.currentAgent)||{name:this.currentAgent||"Agent",id:this.currentAgent}},get filteredCommands(){let e=this._commandQuery.toLowerCase();return[...l1,...this.customCommands].filter(n=>n.command.toLowerCase().includes(e)||n.description.toLowerCase().includes(e)).slice(0,8)},handleSubmit(e){e?.preventDefault();let t=this._inputValue.trim();if(!t||this.isLoading)return;this.dispatchEvent(new CustomEvent("send-message",{detail:{content:t,planMode:this.planMode,agent:this.currentAgent},bubbles:!0})),this._inputValue="",this._showMentionMenu=!1,this._showCommandMenu=!1;let n=this.querySelector("textarea");n&&(n.style.height="auto")},togglePlanMode(){this.planMode=!this.planMode},toggleAgentMenu(){this.hasActiveSession||(this._showAgentMenu=!this._showAgentMenu)},selectAgent(e){this.currentAgent=e,this._showAgentMenu=!1,this.dispatchEvent(new CustomEvent("agent-change",{detail:{agentId:e},bubbles:!0}))},getAgentIcon(e){return{claude:"brain",codex:"code",gemini:"sparkles",goose:"bird"}[e]||"bot"},handleKeyDown(e){if(this._showMentionMenu){let t=this.filteredMentionItems;if(e.key==="ArrowDown"){e.preventDefault(),this._selectedMentionIndex=Math.min(this._selectedMentionIndex+1,t.length-1);return}if(e.key==="ArrowUp"){e.preventDefault(),this._selectedMentionIndex=Math.max(this._selectedMentionIndex-1,0);return}if(e.key==="Enter"||e.key==="Tab"){e.preventDefault(),t[this._selectedMentionIndex]&&this.insertMention(t[this._selectedMentionIndex]);return}if(e.key==="Escape"){e.preventDefault(),this._showMentionMenu=!1;return}}if(this._showCommandMenu){let t=this.filteredCommands;if(e.key==="ArrowDown"){e.preventDefault(),this._selectedCommandIndex=Math.min(this._selectedCommandIndex+1,t.length-1);return}if(e.key==="ArrowUp"){e.preventDefault(),this._selectedCommandIndex=Math.max(this._selectedCommandIndex-1,0);return}if(e.key==="Enter"||e.key==="Tab"){e.preventDefault(),t[this._selectedCommandIndex]&&this.insertCommand(t[this._selectedCommandIndex]);return}if(e.key==="Escape"){e.preventDefault(),this._showCommandMenu=!1;return}}e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.handleSubmit())},handleInput(e){let t=e.target;this._inputValue=t.value,this.autoResize(t),this.detectMention(t),this.detectCommand(t)},detectMention(e){let t=e.value,n=e.selectionStart,s=t.slice(0,n),r=s.lastIndexOf("@");if(r!==-1){let i=s.slice(r+1);if(!/\s/.test(i)){this._showMentionMenu=!0,this._mentionQuery=i,this._mentionStartPos=r,this._selectedMentionIndex=0;return}}this._showMentionMenu=!1,this._mentionQuery="",this._mentionStartPos=-1},insertMention(e){let t=this.querySelector("textarea");if(!t)return;let n=this._inputValue,s=n.slice(0,this._mentionStartPos),r=n.slice(t.selectionStart),i=`@${e.name} `;this._inputValue=s+i+r,this._showMentionMenu=!1,this._mentionQuery="",this._mentionStartPos=-1,this.dispatchEvent(new CustomEvent("mention-added",{detail:{item:e},bubbles:!0})),requestAnimationFrame(()=>{let o=s.length+i.length;t.setSelectionRange(o,o),t.focus()})},detectCommand(e){if(this._showMentionMenu)return;let t=e.value,n=e.selectionStart,s=t.slice(0,n),r=s.match(/(^|\s)\/(\S*)$/);if(r){let i=s.lastIndexOf("/");this._showCommandMenu=!0,this._commandQuery=r[2],this._commandStartPos=i,this._selectedCommandIndex=0;return}this._showCommandMenu=!1,this._commandQuery="",this._commandStartPos=-1},insertCommand(e){let t=this.querySelector("textarea");if(!t)return;let n=this._inputValue,s=n.slice(0,this._commandStartPos),r=n.slice(t.selectionStart),i=`${e.command} `;this._inputValue=s+i+r,this._showCommandMenu=!1,this._commandQuery="",this._commandStartPos=-1,this.dispatchEvent(new CustomEvent("command-selected",{detail:{command:e},bubbles:!0})),requestAnimationFrame(()=>{let o=s.length+i.length;t.setSelectionRange(o,o),t.focus()})},autoResize(e){e.style.height="auto";let t=200;e.style.height=Math.min(e.scrollHeight,t)+"px",e.style.overflowY=e.scrollHeight>t?"auto":"hidden"},renderMentionMenu(){if(!this._showMentionMenu)return null;let e=this.filteredMentionItems;return e.length===0?null:p`
      <div class="mention-menu">
        ${e.map((t,n)=>p`
            <button
              type="button"
              class="mention-item ${n===this._selectedMentionIndex?"selected":""}"
              @click=${()=>this.insertMention(t)}
              @mouseenter=${()=>this._selectedMentionIndex=n}
            >
              <uix-icon name=${t.icon} size="14"></uix-icon>
              <span class="mention-name">${t.name}</span>
              ${t.path?p`<span class="mention-path">${t.path}</span>`:null}
            </button>
          `)}
      </div>
    `},renderAgentMenu(){return!this._showAgentMenu||this.hasActiveSession?null:p`
      <div class="agent-menu">
        ${this.availableAgents.map(e=>p`
            <button
              type="button"
              class="agent-item ${e.id===this.currentAgent?"selected":""}"
              @click=${()=>this.selectAgent(e.id)}
            >
              <uix-icon name=${this.getAgentIcon(e.id)} size="14"></uix-icon>
              <div class="flex-1">
                <span>${e.name}</span>
                <span class="text-xs text-muted ml-1">${e.models?.length||0} models</span>
              </div>
              ${e.id===this.currentAgent?p`<uix-icon name="check" size="14" class="ml-auto"></uix-icon>`:null}
            </button>
          `)}
      </div>
    `},renderCommandMenu(){if(!this._showCommandMenu)return null;let e=this.filteredCommands;return e.length===0?null:p`
      <div class="command-menu">
        ${e.map((t,n)=>p`
            <button
              type="button"
              class="command-item ${n===this._selectedCommandIndex?"selected":""}"
              @click=${()=>this.insertCommand(t)}
              @mouseenter=${()=>this._selectedCommandIndex=n}
            >
              <uix-icon name=${t.icon} size="14"></uix-icon>
              <span class="command-name">${t.command}</span>
              <span class="command-desc">${t.description}</span>
            </button>
          `)}
      </div>
    `},render(){let e=this.selectedAgentInfo;return p`
      <form
        class="px-3 py-3 relative"
        @submit=${t=>this.handleSubmit(t)}
      >
        <div class="bg-surface-light border border-surface rounded-xl overflow-hidden relative">
          <textarea
            class="w-full bg-transparent px-4 pt-3 pb-2 text-sm resize-none focus:outline-none overflow-hidden placeholder:text-muted"
            placeholder="Ask anything, @ to mention, / for workflows"
            rows="2"
            .value=${this._inputValue}
            @input=${t=>this.handleInput(t)}
            @keydown=${t=>this.handleKeyDown(t)}
            ?disabled=${this.isLoading}
          ></textarea>
          ${this.renderMentionMenu()}
          ${this.renderCommandMenu()}
          <div class="flex items-center justify-between px-3 pb-3">
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="p-1.5 rounded-md text-muted hover:text-default hover:bg-surface transition-colors"
                title="Quick actions"
              >
                <uix-icon name="plus" size="16"></uix-icon>
              </button>
              <button
                type="button"
                class="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted hover:text-default hover:bg-surface transition-colors"
                @click=${()=>this.togglePlanMode()}
                title="${this.planMode?"Plan mode: Agent will only plan, not execute":"Execute mode: Agent will make changes"}"
              >
                <uix-icon name="chevron-up" size="12"></uix-icon>
                <span>${this.planMode?"Planning":"Execute"}</span>
              </button>
              <div class="relative">
                <button
                  type="button"
                  class="flex items-center gap-1 px-2 py-1 rounded-md text-xs ${this.hasActiveSession?"text-muted cursor-default":"text-muted hover:text-default hover:bg-surface"} transition-colors"
                  @click=${()=>this.toggleAgentMenu()}
                  ?disabled=${this.hasActiveSession}
                  title="${this.hasActiveSession?"Agent locked for this session":"Select AI agent"}"
                >
                  <uix-icon name="chevron-up" size="12"></uix-icon>
                  <span>${e.name}</span>
                  ${this.hasActiveSession?p`<uix-icon name="lock" size="10" class="ml-1"></uix-icon>`:null}
                </button>
                ${this.renderAgentMenu()}
              </div>
            </div>
            ${this.isLoading?p`
                <button
                  type="button"
                  class="p-2 rounded-lg text-danger hover:bg-danger/10 transition-colors"
                  title="Stop generating"
                  @click=${()=>this.dispatchEvent(new CustomEvent("cancel-message",{bubbles:!0}))}
                >
                  <uix-icon name="square" size="18"></uix-icon>
                </button>
              `:p`
                <button
                  type="submit"
                  class="p-2 rounded-lg text-muted hover:text-default hover:bg-surface transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  ?disabled=${!this._inputValue.trim()}
                >
                  <uix-icon name="arrow-right" size="18"></uix-icon>
                </button>
              `}
          </div>
        </div>
      </form>
    `}}});var dm,hm=y(()=>{V();H();dm={tag:"agent-message",properties:{message:u.object({attribute:!1}),isStreaming:u.boolean({defaultValue:!1}),currentTurn:u.number({defaultValue:0}),showTurnContent:u.boolean({defaultValue:!1}),selectedOption:u.string({defaultValue:null})},prevTurn(){this.currentTurn>0&&this.currentTurn--},nextTurn(){let e=this.message?.turns||[],t=this.isStreaming?e.length-1:e.length-2;this.currentTurn<t&&this.currentTurn++},toggleTurnContent(){this.showTurnContent=!this.showTurnContent},parseOptions(){let e=this.message?.content||"";if(this.isStreaming||this.message?.role==="user")return[];let t=e.split(`
`),n=[],s=/^(\d+)\.\s+(.+)$/;for(let r of t){let i=r.trim().match(s);i&&n.push({number:i[1],text:i[2]})}return n.length>=2&&n.length<=6?n:[]},selectOption(e){this.dispatchEvent(new CustomEvent("select-option",{detail:{option:e.number,text:e.text},bubbles:!0}))},renderOptions(){let e=this.parseOptions();if(e.length===0)return"";let t=!!this.selectedOption;return p`
      <div class="mt-3 space-y-2">
        ${e.map(n=>{let s=this.selectedOption===n.number;return p`
            <button
              type="button"
              class="${"w-full text-left px-3 py-2 rounded border transition-colors text-sm"} ${s?"border-primary bg-primary/10":t?"border-surface-light opacity-50":"border-surface-light hover:border-primary hover:bg-primary/10"}"
              ?disabled=${t}
              @click=${()=>this.selectOption(n)}
            >
              <span class="font-medium text-primary mr-2">${n.number}.</span>
              <span>${n.text}</span>
              ${s?p`<uix-icon name="check" size="14" class="float-right text-primary mt-0.5"></uix-icon>`:""}
            </button>
          `})}
      </div>
    `},renderTurns(){let{turns:e}=this.message||{};if(!e||e.length===0)return"";let t=this.isStreaming?e:e.slice(0,-1);if(t.length===0)return"";let n=Math.min(this.currentTurn,t.length-1),s=t[n];if(!s)return"";let r=s.content?.substring(0,60)?.replace(/\n/g," ")||"";return p`
      <div class="bg-surface rounded mb-2 text-xs border border-surface-light">
        <div
          class="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-surface-light"
          @click=${()=>this.toggleTurnContent()}
        >
          <uix-icon name="layers" size="12" class="text-muted flex-shrink-0"></uix-icon>
          <button
            type="button"
            class="p-0.5 rounded hover:bg-surface disabled:opacity-30"
            ?disabled=${n===0}
            @click=${i=>{i.stopPropagation(),this.prevTurn()}}
          >
            <uix-icon name="chevron-left" size="12"></uix-icon>
          </button>
          <span class="text-muted whitespace-nowrap">${n+1}/${t.length}</span>
          <button
            type="button"
            class="p-0.5 rounded hover:bg-surface disabled:opacity-30"
            ?disabled=${n===t.length-1}
            @click=${i=>{i.stopPropagation(),this.nextTurn()}}
          >
            <uix-icon name="chevron-right" size="12"></uix-icon>
          </button>
          <span class="truncate flex-1 text-muted ml-1">${r}...</span>
          <uix-icon
            name=${this.showTurnContent?"chevron-up":"chevron-down"}
            size="12"
            class="text-muted flex-shrink-0"
          ></uix-icon>
        </div>
        ${this.showTurnContent?p`
            <div class="px-2 pb-2 pt-1 border-t border-surface-light max-h-48 overflow-y-auto">
              <uix-markdown
                class="prose prose-sm max-w-none text-xs break-words"
                .content=${s.content}
              ></uix-markdown>
            </div>
          `:""}
      </div>
    `},render(){let{role:e,content:t,toolCalls:n}=this.message||{},s=e==="user";return p`
      <div class="flex gap-2 ${s?"flex-row-reverse py-2":""} text-sm">
        <div class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${s?"bg-primary":"bg-surface-light"}">
          <uix-icon
            name=${s?"user":"brain"}
            size="12"
            class="${s?"text-inverse":"text-muted"}"
          ></uix-icon>
        </div>

        <div class="flex-1 min-w-0 ${s?"text-right":""}">
          ${!s&&this.message?.planMode?p`
              <div class="inline-flex items-center gap-1 px-2 py-0.5 mb-2 rounded text-xs bg-warning/20 text-warning border border-warning/30">
                <uix-icon name="clipboard-list" size="10"></uix-icon>
                Plan
              </div>
            `:""}

          ${s?"":this.renderTurns()}

          ${!s&&this.message?.activities?.length>0?p`<agent-activity-list .activities=${this.message.activities} class="mb-2"></agent-activity-list>`:""}

          <div class="${s?"text-muted":"text-default"} break-words overflow-hidden">
            ${t?p`<uix-markdown
                  class="prose prose-sm max-w-none text-sm break-words [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_code]:break-all [&_pre]:text-xs"
                  .content=${t}
                ></uix-markdown>`:""}
            ${this.isStreaming?p`<span class="inline-block w-1 h-4 bg-current animate-pulse ml-0.5"></span>`:""}
          </div>

          ${this.renderOptions()}

          ${n?.length>0?p`
              <div class="mt-1 space-y-1">
                ${n.map(r=>p`
                    <div class="text-xs bg-surface rounded p-1.5 border border-surface-light overflow-hidden">
                      <div class="flex items-center gap-1 text-muted">
                        <uix-icon name="wrench" size="10"></uix-icon>
                        <span class="font-mono">${r.name||r.function?.name}</span>
                      </div>
                      ${r.result?p`<pre class="text-xs overflow-x-auto mt-1 max-h-32">${JSON.stringify(r.result,null,2)}</pre>`:""}
                    </div>
                  `)}
              </div>
            `:""}
        </div>
      </div>
    `}}});var pm,fm=y(()=>{V();H();pm={tag:"agent-permission-inline",properties:{permission:u.object({attribute:!1}),alwaysAllow:u.boolean({defaultValue:!1})},handleAllow(){this.dispatchEvent(new CustomEvent("decide",{detail:{approved:!0,alwaysAllow:this.alwaysAllow},bubbles:!0}))},handleDeny(){this.dispatchEvent(new CustomEvent("decide",{detail:{approved:!1,alwaysAllow:!1},bubbles:!0}))},getFilePath(){let e=this.permission?.input||{};return e.file_path||e.path||e.command||"Unknown"},getPreview(){let e=this.permission?.input||{};return e.old_string&&e.new_string?{type:"edit",old:e.old_string,new:e.new_string}:e.content?{type:"write",content:e.content}:e.command?{type:"bash",command:e.command}:null},render(){let{toolName:e}=this.permission||{},t=this.getFilePath(),n=this.getPreview();return p`
      <div class="my-2 rounded-lg border border-warning/50 bg-warning/5 overflow-hidden">
        <div class="flex items-center gap-2 px-3 py-2 bg-warning/10 border-b border-warning/30">
          <uix-icon name="shield-alert" size="16" class="text-warning"></uix-icon>
          <span class="text-sm font-medium">Permission Required</span>
          <span class="text-xs text-muted ml-auto">${e}</span>
        </div>

        <div class="p-3 space-y-3">
          <div class="flex items-center gap-2 text-xs">
            <uix-icon name="file" size="12" class="text-muted"></uix-icon>
            <span class="font-mono text-muted truncate">${t}</span>
          </div>

          ${n?.type==="edit"?p`
              <div class="text-xs space-y-1">
                <div class="flex items-start gap-2">
                  <span class="text-danger font-mono">-</span>
                  <pre class="flex-1 bg-danger/10 text-danger p-1.5 rounded overflow-x-auto whitespace-pre-wrap break-all">${n.old.substring(0,200)}${n.old.length>200?"...":""}</pre>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-success font-mono">+</span>
                  <pre class="flex-1 bg-success/10 text-success p-1.5 rounded overflow-x-auto whitespace-pre-wrap break-all">${n.new.substring(0,200)}${n.new.length>200?"...":""}</pre>
                </div>
              </div>
            `:n?.type==="write"?p`
              <div class="text-xs">
                <pre class="bg-surface p-1.5 rounded overflow-x-auto max-h-24 whitespace-pre-wrap break-all">${(()=>{let s=n.content,r=typeof s=="string"?s:JSON.stringify(s,null,2);return r.substring(0,300)+(r.length>300?"...":"")})()}</pre>
              </div>
            `:n?.type==="bash"?p`
              <div class="text-xs">
                <pre class="bg-surface p-1.5 rounded font-mono overflow-x-auto">${n.command}</pre>
              </div>
            `:""}

          <div class="flex items-center justify-between pt-1">
            <label class="flex items-center gap-1.5 text-xs cursor-pointer">
              <input
                type="checkbox"
                class="rounded w-3 h-3"
                .checked=${this.alwaysAllow}
                @change=${s=>this.alwaysAllow=s.target.checked}
              />
              <span class="text-muted">Always allow</span>
            </label>

            <div class="flex items-center gap-2">
              <button
                type="button"
                class="px-3 py-1 rounded text-xs hover:bg-surface-light transition-colors"
                @click=${()=>this.handleDeny()}
              >
                Deny
              </button>
              <button
                type="button"
                class="px-3 py-1 rounded text-xs bg-primary text-inverse hover:opacity-90 transition-opacity"
                @click=${()=>this.handleAllow()}
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      </div>
    `}}});var mm,gm=y(()=>{V();H();mm={tag:"agent-plan-modal",properties:{message:u.object({attribute:!1})},handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0}))},handleExecute(){this.dispatchEvent(new CustomEvent("execute",{bubbles:!0}))},handleKeyDown(e){e.key==="Escape"&&this.handleClose()},connected(){document.addEventListener("keydown",this._keyHandler=e=>this.handleKeyDown(e))},disconnected(){document.removeEventListener("keydown",this._keyHandler)},getToolsSummary(){let e=this.message?.activities||[],t={};for(let n of e)n.type==="tool_use"&&(t[n.name]=(t[n.name]||0)+1);return Object.entries(t).map(([n,s])=>({name:n,count:s}))},getFilesAnalyzed(){let e=this.message?.activities||[],t=new Set;for(let n of e){let s=n.input?.file_path||n.input?.path;s&&["Read","Glob","Grep"].includes(n.name)&&t.add(s)}return[...t]},render(){let{content:e,originalPrompt:t}=this.message||{},n=this.getToolsSummary(),s=this.getFilesAnalyzed();return p`
      <div
        class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        @click=${r=>r.target===r.currentTarget&&this.handleClose()}
      >
        <div class="bg-surface-dark rounded-lg shadow-2xl border border-surface w-full max-w-5xl h-[90vh] flex flex-col">
          <div class="flex items-center justify-between px-4 py-3 border-b border-surface">
            <div class="flex items-center gap-2">
              <uix-icon name="clipboard-list" size="20" class="text-warning"></uix-icon>
              <span class="font-semibold">Plan</span>
              <span class="text-sm text-muted truncate max-w-md">${t}</span>
            </div>
            <button
              type="button"
              class="p-1.5 rounded hover:bg-surface-light transition-colors"
              @click=${()=>this.handleClose()}
            >
              <uix-icon name="x" size="18"></uix-icon>
            </button>
          </div>

          <div class="flex-1 flex min-h-0 overflow-hidden">
            <div class="w-64 border-r border-surface flex-shrink-0 overflow-y-auto p-3 space-y-4">
              ${n.length>0?p`
                  <div>
                    <div class="text-xs font-medium text-muted mb-2 flex items-center gap-1.5">
                      <uix-icon name="wrench" size="12"></uix-icon>
                      Tools Used
                    </div>
                    <div class="space-y-1">
                      ${n.map(r=>p`
                          <div class="flex items-center justify-between text-sm px-2 py-1 bg-surface rounded">
                            <span>${r.name}</span>
                            <span class="text-muted">${r.count}</span>
                          </div>
                        `)}
                    </div>
                  </div>
                `:""}

              ${s.length>0?p`
                  <div>
                    <div class="text-xs font-medium text-muted mb-2 flex items-center gap-1.5">
                      <uix-icon name="file-search" size="12"></uix-icon>
                      Files Analyzed (${s.length})
                    </div>
                    <div class="space-y-1 max-h-64 overflow-y-auto">
                      ${s.map(r=>p`
                          <div class="text-xs px-2 py-1 bg-surface rounded truncate" title=${r}>
                            ${r.split("/").pop()}
                          </div>
                        `)}
                    </div>
                  </div>
                `:""}
            </div>

            <div class="flex-1 overflow-y-auto p-4">
              <uix-markdown
                class="prose prose-sm max-w-none"
                .content=${e||""}
              ></uix-markdown>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 px-4 py-3 border-t border-surface">
            <button
              type="button"
              class="px-4 py-2 rounded text-sm hover:bg-surface-light transition-colors"
              @click=${()=>this.handleClose()}
            >
              Close
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded text-sm bg-primary text-inverse hover:opacity-90 transition-opacity flex items-center gap-2"
              @click=${()=>this.handleExecute()}
            >
              <uix-icon name="play" size="14"></uix-icon>
              Execute Plan
            </button>
          </div>
        </div>
      </div>
    `}}});var bm,ym=y(()=>{V();H();bm={tag:"agent-question-inline",properties:{questions:u.array({defaultValue:[]}),toolUseID:u.string(),selectedAnswers:u.object({defaultValue:{}}),customInputs:u.object({defaultValue:{}}),showCustomInput:u.object({defaultValue:{}})},handleSelectOption(e,t){let n=this.questions[e],s=n.header||`q${e}`;if(n.multiSelect){let r=this.selectedAnswers[s]||[],i=r.includes(t)?r.filter(o=>o!==t):[...r,t];this.selectedAnswers={...this.selectedAnswers,[s]:i}}else this.selectedAnswers={...this.selectedAnswers,[s]:t},this.showCustomInput={...this.showCustomInput,[s]:!1}},handleToggleCustom(e){let t=this.questions[e],n=t.header||`q${e}`;this.showCustomInput={...this.showCustomInput,[n]:!this.showCustomInput[n]},t.multiSelect||(this.selectedAnswers={...this.selectedAnswers,[n]:null})},handleCustomInput(e,t){let s=this.questions[e].header||`q${e}`;this.customInputs={...this.customInputs,[s]:t}},handleSubmit(){let e={};this.questions.forEach((t,n)=>{let s=t.header||`q${n}`,r=this.customInputs[s];this.showCustomInput[s]&&r?e[s]=r:this.selectedAnswers[s]&&(e[s]=this.selectedAnswers[s])}),this.dispatchEvent(new CustomEvent("answer",{detail:{answers:e},bubbles:!0}))},handleSkip(){this.dispatchEvent(new CustomEvent("answer",{detail:{answers:{}},bubbles:!0}))},isOptionSelected(e,t){let n=this.questions[e],s=n.header||`q${e}`,r=this.selectedAnswers[s];return n.multiSelect?(r||[]).includes(t):r===t},hasValidAnswer(){return this.questions.every((e,t)=>{let n=e.header||`q${t}`,s=this.showCustomInput[n],r=this.customInputs[n],i=this.selectedAnswers[n];return s?r&&r.trim().length>0:e.multiSelect?i&&i.length>0:!!i})},renderQuestion(e,t){let n=e.header||`q${t}`,s=this.showCustomInput[n];return p`
      <div class="space-y-2">
        ${e.header?p`<div class="text-xs font-medium text-muted uppercase tracking-wide">${e.header}</div>`:""}
        <div class="text-sm">${e.question}</div>

        <div class="space-y-1.5">
          ${(e.options||[]).map(r=>p`
              <button
                type="button"
                class="w-full text-left px-3 py-2 rounded border text-sm transition-colors ${this.isOptionSelected(t,r.label)?"border-primary bg-primary/10":"border-surface-light hover:border-primary/50 hover:bg-surface-light"}"
                @click=${()=>this.handleSelectOption(t,r.label)}
              >
                <div class="flex items-start gap-2">
                  <div class="flex-shrink-0 mt-0.5">
                    ${e.multiSelect?p`
                          <div
                            class="w-3.5 h-3.5 rounded border flex items-center justify-center ${this.isOptionSelected(t,r.label)?"border-primary bg-primary":"border-muted"}"
                          >
                            ${this.isOptionSelected(t,r.label)?p`<uix-icon name="check" size="8" class="text-inverse"></uix-icon>`:""}
                          </div>
                        `:p`
                          <div
                            class="w-3.5 h-3.5 rounded-full border flex items-center justify-center ${this.isOptionSelected(t,r.label)?"border-primary":"border-muted"}"
                          >
                            ${this.isOptionSelected(t,r.label)?p`<div class="w-1.5 h-1.5 rounded-full bg-primary"></div>`:""}
                          </div>
                        `}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium">${r.label}</div>
                    ${r.description?p`<div class="text-xs text-muted mt-0.5">${r.description}</div>`:""}
                  </div>
                </div>
              </button>
            `)}

          <button
            type="button"
            class="w-full text-left px-3 py-2 rounded border text-sm transition-colors ${s?"border-primary bg-primary/10":"border-surface-light hover:border-primary/50 hover:bg-surface-light"}"
            @click=${()=>this.handleToggleCustom(t)}
          >
            <div class="flex items-center gap-2">
              <div class="flex-shrink-0">
                ${e.multiSelect?p`
                      <div
                        class="w-3.5 h-3.5 rounded border flex items-center justify-center ${s?"border-primary bg-primary":"border-muted"}"
                      >
                        ${s?p`<uix-icon name="check" size="8" class="text-inverse"></uix-icon>`:""}
                      </div>
                    `:p`
                      <div
                        class="w-3.5 h-3.5 rounded-full border flex items-center justify-center ${s?"border-primary":"border-muted"}"
                      >
                        ${s?p`<div class="w-1.5 h-1.5 rounded-full bg-primary"></div>`:""}
                      </div>
                    `}
              </div>
              <span class="text-muted">Other...</span>
            </div>
          </button>

          ${s?p`
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded border border-surface-light bg-surface text-sm focus:outline-none focus:border-primary"
                  placeholder="Enter your answer..."
                  .value=${this.customInputs[n]||""}
                  @input=${r=>this.handleCustomInput(t,r.target.value)}
                  @keydown=${r=>r.key==="Enter"&&this.hasValidAnswer()&&this.handleSubmit()}
                />
              `:""}
        </div>
      </div>
    `},render(){return p`
      <div class="my-2 rounded-lg border border-primary/30 bg-primary/5 overflow-hidden">
        <div class="flex items-center gap-2 px-3 py-2 bg-primary/10 border-b border-primary/20">
          <uix-icon name="message-circle" size="16" class="text-primary"></uix-icon>
          <span class="text-sm font-medium">Claude has a question</span>
        </div>

        <div class="p-3 space-y-4">
          ${this.questions.map((e,t)=>this.renderQuestion(e,t))}

          <div class="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              class="px-3 py-1 rounded text-xs hover:bg-surface-light transition-colors"
              @click=${()=>this.handleSkip()}
            >
              Skip
            </button>
            <button
              type="button"
              class="px-3 py-1 rounded text-xs bg-primary text-inverse hover:opacity-90 transition-opacity disabled:opacity-50"
              ?disabled=${!this.hasValidAnswer()}
              @click=${()=>this.handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    `}}});var xm,vm=y(()=>{Ue();V();H();Se();Mi();xm={tag:"agent-right-sidebar",properties:{service:u.object({attribute:!1}),resourceUri:u.string(),leftActivity:u.string(),currentSession:u.object({attribute:!1}),sessions:u.array({defaultValue:[]}),messages:u.array({defaultValue:[]}),context:u.object({attribute:!1}),agentConnected:u.boolean({defaultValue:!1}),isLoading:u.boolean({defaultValue:!1}),expandedSections:u.array({defaultValue:["chat","context"]})},async connected(){this.service||(this.service=new cn),this._unsubSession=this.service.subscribe("sessionChange",({session:e})=>{this.currentSession=e,this.messages=e?.messages||[]}),this._unsubContext=this.service.subscribe("contextChange",({context:e})=>{this.context=e}),this._unsubMessage=this.service.subscribe("messageAdded",({message:e})=>{this.messages=[...this.messages,e]}),this._unsubConnection=this.service.subscribe("connectionChange",({connected:e})=>{this.agentConnected=e}),this.context=this.service.getContext(),await this.service.checkHealth()},disconnected(){this._unsubSession?.(),this._unsubContext?.(),this._unsubMessage?.(),this._unsubConnection?.()},toggleSection(e){this.expandedSections.includes(e)?this.expandedSections=this.expandedSections.filter(t=>t!==e):this.expandedSections=[...this.expandedSections,e]},async handleNewSession(){this.isLoading=!0;try{await this.service.createSession()}catch(e){console.error("[Agent] Failed to create session:",e)}finally{this.isLoading=!1}},async handleLoadSessions(){let e=await j.Model.agent_sessions?.getAll({order:"-updatedAt",limit:20});this.sessions=e||[]},async handleSelectSession(e){this.isLoading=!0;try{await this.service.resumeSession(e)}catch(t){console.error("[Agent] Failed to select session:",t)}finally{this.isLoading=!1}},async handleSendMessage(e){if(!(!e?.trim()||this.isLoading)){this.isLoading=!0;try{this.currentSession||await this.service.createSession();for await(let t of this.service.sendMessage(e))if(t.type==="content"){let n=this.messages[this.messages.length-1];n?.role==="assistant"&&!t.isComplete&&(n.content=t.content,this.messages=[...this.messages])}}catch(t){console.error("[Agent] Failed to send message:",t)}finally{this.isLoading=!1}}},async handleAddContext(){let e=E();if(e.activeResourceUri)try{await this.service.addToContext(e.activeResourceUri)}catch(t){console.error("[Agent] Failed to add context:",t)}},async handleRemoveContext(e){await this.service.removeFromContext(e)},async handleInvokeTool(e){let{tool:t,mode:n,prompt:s}=e.detail;if(n==="ai"&&s){let r=`Use the ${t.name} tool to: ${s}`;await this.handleSendMessage(r)}},render(){let e=this.expandedSections.includes("chat"),t=this.expandedSections.includes("context");return p`
      <div class="flex flex-col h-full bg-surface-dark text-default">
        <!-- Header -->
        <agent-header
          .agentConnected=${this.agentConnected}
          .session=${this.currentSession}
          .sessions=${this.sessions}
          .isLoading=${this.isLoading}
          @new-session=${()=>this.handleNewSession()}
          @load-sessions=${()=>this.handleLoadSessions()}
          @select-session=${n=>this.handleSelectSession(n.detail.sessionId)}
        ></agent-header>

        <!-- Accordion Sections -->
        <div class="flex-1 overflow-y-auto">
          <!-- Chat Section -->
          <div class="border-b border-surface">
            <button
              type="button"
              class="w-full flex items-center justify-between px-3 py-2 hover:bg-surface-light transition-colors"
              @click=${()=>this.toggleSection("chat")}
            >
              <span class="flex items-center gap-2 font-medium text-sm">
                <uix-icon name=${e?"chevron-down":"chevron-right"} size="14"></uix-icon>
                Chat
              </span>
              ${this.messages.length>0?p`<span class="text-xs text-muted">${this.messages.length}</span>`:""}
            </button>
            ${e?p`
                <div class="flex flex-col" style="height: 400px;">
                  <agent-chat-panel
                    .messages=${this.messages}
                    .isLoading=${this.isLoading}
                    @send-message=${n=>this.handleSendMessage(n.detail.content)}
                  ></agent-chat-panel>
                </div>
              `:""}
          </div>

          <!-- Context Section -->
          <div class="border-b border-surface">
            <button
              type="button"
              class="w-full flex items-center justify-between px-3 py-2 hover:bg-surface-light transition-colors"
              @click=${()=>this.toggleSection("context")}
            >
              <span class="flex items-center gap-2 font-medium text-sm">
                <uix-icon name=${t?"chevron-down":"chevron-right"} size="14"></uix-icon>
                Context
              </span>
              <span class="text-xs text-muted">
                ${this.context?.totalTokens||0} / ${this.context?.maxTokens||8e3} tokens
              </span>
            </button>
            ${t?p`
                <agent-context-panel
                  .context=${this.context}
                  .resourceUri=${this.resourceUri}
                  @add-context=${()=>this.handleAddContext()}
                  @remove-context=${n=>this.handleRemoveContext(n.detail.itemId)}
                  @invoke-tool=${n=>this.handleInvokeTool(n)}
                ></agent-context-panel>
              `:""}
          </div>

        </div>
      </div>
    `}}});var wm,km=y(async()=>{await Ut();H();Se();V();wm={tag:"ide-activity-bar",class:"h-full flex-shrink-0",properties:{currentRoute:u.object({sync:Fe}),activityBarItems:u.object(),collapsed:u.boolean({defaultValue:!0}),isDark:u.boolean({defaultValue:!1})},connected(){let e=E();this.activityBarItems=e.getActivityBarItems();let t=e.subscribe("activityBarPlugins",n=>{this.activityBarItems=n});this._unsubscribers=this._unsubscribers||[],this._unsubscribers.push(t),this.isDark=document.documentElement.classList.contains("dark")},disconnected(){this._unsubscribers&&(this._unsubscribers.forEach(e=>e()),this._unsubscribers=[])},_isActive(e){let t=this.currentRoute?.path||"/",s=E().basePath||"";return t===s+e.route},_handleClick(e){if(e.route){let n=E().basePath||"";Fe.go(n+e.route)}},_toggleDarkMode(){this.isDark=!this.isDark,document.documentElement.classList.toggle("dark");try{localStorage.setItem("uix-darkmode-darkmode",JSON.stringify(this.isDark))}catch{}},_renderNavItem({icon:e,label:t,active:n,size:s,iconOnly:r,indicatorPosition:i,onClick:o,extraClass:a}){return p`
      <uix-nav-item
        icon=${e}
        label=${t}
        .iconOnly=${r}
        ?active=${n||!1}
        size=${s||"md"}
        tooltip
        tooltipPosition="right"
        tooltipSize="lg"
        indicatorPosition=${i||"none"}
        @nav-item-click=${o}
        class=${a||""}
      ></uix-nav-item>
    `},render(){let{top:e=[],bottom:t=[]}=this.activityBarItems||{},n=this.collapsed;return p`
      <uix-navbar
        collapsible
        ?collapsed=${this.collapsed}
        direction="vertical"
        transparent
        class="h-full bg-surface-light border-r border-surface-lighter"
        style="--uix-navbar-width: 160px; --uix-navbar-collapsed-width: 48px; --uix-navbar-padding: 0"
      >
        <div slot="start" class="activity-bar-section w-full">
          ${e.map(s=>this._renderNavItem({icon:s.icon,label:s.title,active:this._isActive(s),iconOnly:n,indicatorPosition:"left",onClick:()=>this._handleClick(s)}))}
        </div>
        <div slot="end" class="activity-bar-section w-full">
          ${t.map(s=>this._renderNavItem({icon:s.icon,label:s.title,active:this._isActive(s),iconOnly:n,indicatorPosition:"left",onClick:()=>this._handleClick(s)}))}
          ${this._renderNavItem({icon:"settings",label:"Settings",iconOnly:n,onClick:()=>E().openResource("settings://project")})}
          ${this._renderNavItem({icon:this.isDark?"moon":"sun",label:this.isDark?"Dark Mode":"Light Mode",iconOnly:n,onClick:()=>this._toggleDarkMode()})}
          ${this._renderNavItem({icon:this.collapsed?"panel-left-open":"panel-left-close",label:this.collapsed?"Expand":"Collapse",iconOnly:n,onClick:()=>{this.collapsed=!this.collapsed},extraClass:"opacity-50 hover:opacity-100"})}
        </div>
      </uix-navbar>
    `}}});var mr,zl,ho,$m,Ul=y(()=>{mr={xs:0,sm:576,md:768,lg:992,xl:1200,xxl:1400},zl=()=>{let e=window.innerWidth;return e>=mr.xxl?"xxl":e>=mr.xl?"xl":e>=mr.lg?"lg":e>=mr.md?"md":e>=mr.sm?"sm":"xs"},ho=e=>{let t=zl(),n=()=>{let i=zl();i!==t&&(t=i,e?.(t))},s,r=()=>{clearTimeout(s),s=setTimeout(n,100)};return window.addEventListener("resize",r),{current:t,cleanup:()=>{window.removeEventListener("resize",r),clearTimeout(s)}}},$m=(e,t,n=["xs","sm","md","lg","xl","xxl"])=>{let s=zl(),r=n.indexOf(s);for(let i=r;i>=0;i--){let o=n[i],a=o==="xs"?t:`${t}-${o}`;if(e.hasAttribute(a))return e.getAttribute(a);if(e[a]!==void 0&&e[a]!==null)return e[a]}return null}});var Sm,_m=y(()=>{H();Se();V();Ul();Ga();Sm={tag:"ide-app",properties:{standalone:u.boolean({sync:"querystring"}),sidebarVisible:u.boolean({defaultValue:!0}),commandPaletteOpen:u.boolean({defaultValue:!1}),assistantVisible:u.boolean({defaultValue:!0}),assistantMode:u.string({defaultValue:"sidebar"}),modalRequest:u.object(),ideContext:u.object({attribute:!1}),isMobile:u.boolean({defaultValue:!1}),sidebarDrawerOpen:u.boolean({defaultValue:!1}),assistantDrawerOpen:u.boolean({defaultValue:!1})},async connected(){let e=E();window.electronAPI&&document.body.classList.add("electron"),this._bp=ho(t=>{this.isMobile=["xs","sm"].includes(t)}),this.isMobile=["xs","sm"].includes(this._bp.current),this.ideContext=Fi(),this.sidebarVisible=e.sidebarVisible??!0,this.commandPaletteOpen=e.commandPaletteOpen??!1,this._unsubSidebar=e.subscribe("sidebarVisible",t=>{this.sidebarVisible=t}),this._unsubCommandPalette=e.subscribe("commandPaletteOpen",t=>{this.commandPaletteOpen=t}),this._unsubShow=e.subscribe("ui:showModal",t=>{this.modalRequest=t}),this._unsubHide=e.subscribe("ui:hideModal",()=>{this.modalRequest=null}),this.setupKeybindings()},setupKeybindings(){let e=E(),t=n=>{e.keybindings.handleKeyEvent(n)};document.addEventListener("keydown",t),this._keydownHandler=t},toggleAssistant(){this.assistantMode==="minimized"?(this.assistantMode="sidebar",this.assistantVisible=!0):(this.assistantMode="minimized",this.assistantVisible=!1)},handleAssistantModeChange(e){this.assistantMode=e.detail.mode,this.assistantVisible=e.detail.mode!=="minimized"},disconnected(){this._bp?.cleanup(),this._keydownHandler&&document.removeEventListener("keydown",this._keydownHandler),this._unsubSidebar&&this._unsubSidebar(),this._unsubCommandPalette&&this._unsubCommandPalette(),this._unsubRightSidebar&&this._unsubRightSidebar(),this._unsubShow&&this._unsubShow(),this._unsubHide&&this._unsubHide()},_renderDesktop(){return p`
      <div class="flex flex-col w-full h-screen font-sans text-sm overflow-hidden bg-inverse text-default">
        <ide-menu-bar draggable ?standalone=${this.standalone}></ide-menu-bar>
        <div class="flex flex-grow min-h-0">
          <ide-activity-bar></ide-activity-bar>
          ${this.sidebarVisible?p`
              <ide-sidebar class="w-80 flex-shrink-0"></ide-sidebar>
              <uix-divider resizable vertical class="cursor-col-resize"></uix-divider>
            `:""}

          <div class="flex flex-col flex-grow min-w-0">
            <ide-main-content class="flex flex-1 overflow-auto"></ide-main-content>
          </div>

          ${this.assistantVisible&&this.assistantMode==="sidebar"?p`
              <uix-divider resizable vertical class="cursor-col-resize"></uix-divider>
              <agent-container
                class="w-96 flex-shrink-0"
                .mode=${this.assistantMode}
                .contextProvider=${this.ideContext}
                @mode-change=${e=>this.handleAssistantModeChange(e)}
              ></agent-container>
            `:""}
        </div>
        <ide-status-bar class="flex-shrink-0"></ide-status-bar>
        ${this.commandPaletteOpen?p`<ide-command-palette></ide-command-palette>`:""}
        ${this.modalRequest?p`<ide-modal-dialog .request=${this.modalRequest}></ide-modal-dialog>`:""}
        ${this.assistantMode==="floating"?p`<agent-container
              .mode="floating"
              .contextProvider=${this.ideContext}
              @mode-change=${e=>this.handleAssistantModeChange(e)}
            ></agent-container>`:""}
        ${this.assistantMode==="minimized"?p`<agent-container
              .mode="minimized"
              .contextProvider=${this.ideContext}
              @mode-change=${e=>this.handleAssistantModeChange(e)}
            ></agent-container>`:""}
      </div>
    `},_renderMobile(){return p`
      <div class="flex flex-col w-full h-screen font-sans text-sm overflow-hidden bg-inverse text-default">
        <ide-menu-bar
          ?mobile=${!0}
          ?standalone=${this.standalone}
          @toggle-assistant=${()=>{this.assistantDrawerOpen=!this.assistantDrawerOpen}}
        ></ide-menu-bar>

        <div class="flex flex-col flex-grow min-h-0">
          <ide-main-content class="flex flex-1 overflow-auto" style="padding-bottom: 84px;"></ide-main-content>
        </div>

        <!-- Bottom sheet: nav always visible, swipe up for sidebar -->
        <uix-bottom-sheet
          ?open=${this.sidebarDrawerOpen}
          @sheet-closed=${()=>{this.sidebarDrawerOpen=!1}}
          @sheet-opened=${()=>{this.sidebarDrawerOpen=!0}}
        >
          <ide-sidebar slot="sheet" class="w-full h-full"></ide-sidebar>
          <ide-mobile-nav slot="nav" @toggle-sheet=${()=>{this.sidebarDrawerOpen=!this.sidebarDrawerOpen}}></ide-mobile-nav>
        </uix-bottom-sheet>

        <!-- Assistant drawer (right) -->
        <uix-drawer
          position="right"
          ?open=${this.assistantDrawerOpen}
          @drawer-closed=${()=>{this.assistantDrawerOpen=!1}}
          style="--uix-drawer-width: 90vw; --uix-drawer-max-width: 90vw;"
        >
          <agent-container
            class="w-full h-full"
            .mode=${"sidebar"}
            .contextProvider=${this.ideContext}
          ></agent-container>
        </uix-drawer>

        ${this.commandPaletteOpen?p`<ide-command-palette></ide-command-palette>`:""}
        ${this.modalRequest?p`<ide-modal-dialog .request=${this.modalRequest}></ide-modal-dialog>`:""}
      </div>
    `},render(){return this.isMobile?this._renderMobile():this._renderDesktop()}}});var Am,Cm=y(()=>{H();V();Se();Am={properties:{searchQuery:u.string()},connected(){this.searchQuery="",this.selectedIndex=0},handleSearch(e){this.searchQuery=e.target.value,this.selectedIndex=0},handleKeyDown(e){let t=E(),n=this.getFilteredCommands();e.key==="Escape"?t.toggleCommandPalette():e.key==="ArrowDown"?(e.preventDefault(),this.selectedIndex=Math.min(this.selectedIndex+1,n.length-1)):e.key==="ArrowUp"?(e.preventDefault(),this.selectedIndex=Math.max(this.selectedIndex-1,0)):e.key==="Enter"&&(e.preventDefault(),n[this.selectedIndex]&&this.executeCommand(n[this.selectedIndex].id))},executeCommand(e){let t=E();t.executeCommand(e),t.toggleCommandPalette()},getFilteredCommands(){let e=E(),t=this.searchQuery.toLowerCase();return Object.values(e.getAllCommands()).filter(n=>n.label?.toLowerCase().includes(t)||n.category?.toLowerCase().includes(t))},render(){let e=E(),t=this.getFilteredCommands();return p`
                <div
                    class="fixed inset-0 bg-surface-darker/50 flex items-start justify-center pt-20 z-50"
                    @click=${()=>e.toggleCommandPalette()}
                >
                    <div
                        class="bg-surface-dark border border-surface rounded-lg shadow-2xl w-[600px] overflow-hidden"
                        @click=${n=>n.stopPropagation()}
                    >
                        <div class="flex items-center border-b border-surface px-4 py-3">
                            <uix-icon name="chevron-right" class="w-4 h-4 text-default/50 mr-2"></uix-icon>
                            <input
                                type="text"
                                placeholder="Type a command..."
                                class="bg-transparent outline-none flex-grow text-sm text-default placeholder-default/30"
                                .value=${this.searchQuery}
                                @input=${this.handleSearch.bind(this)}
                                @keydown=${this.handleKeyDown.bind(this)}
                                autofocus
                            />
                        </div>
                        <div class="max-h-96 overflow-y-auto">
                            ${t.length===0?p`<div class="px-4 py-3 text-default/50 text-sm">No commands found</div>`:t.map((n,s)=>p`
                                <div
                                    @click=${()=>this.executeCommand(n.id)}
                                    class="flex items-center justify-between px-4 py-2 cursor-pointer ${s===this.selectedIndex?"bg-primary text-inverse":"hover:bg-surface-light text-default"}"
                                >
                                    <div class="flex items-center gap-3">
                                        <span class="text-sm font-medium ${s===this.selectedIndex?"text-inverse":"text-default"}">${n.label}</span>
                                        <span class="text-xs ${s===this.selectedIndex?"text-inverse/80":"text-default/50"}">${n.category}</span>
                                    </div>
                                    ${n.keybinding?p`<span class="text-xs ${s===this.selectedIndex?"text-inverse/80":"text-default/50"}">${n.keybinding}</span>`:""}
                                </div>
                            `)}
                        </div>
                    </div>
                </div>
            `}}});var Em,Rm=y(()=>{H();V();Se();Em={properties:{items:u.array([]),position:u.object({x:0,y:0}),target:u.any(null)},_openSubmenu:null,_closeTimer:null,connected(){this._handleEvents=this.close.bind(this),setTimeout(()=>{document.addEventListener("click",this._handleEvents),document.addEventListener("contextmenu",this._handleEvents)},0)},disconnected(){document.removeEventListener("click",this._handleEvents),document.removeEventListener("contextmenu",this._handleEvents),clearTimeout(this._closeTimer)},close(){this.remove()},handleItemClick(e){e.children||(e.action?e.action(this.target):e.command&&E().executeCommand(e.command,this.target),this.close())},_showSubmenu(e,t){clearTimeout(this._closeTimer),this._openSubmenu=e,this.querySelectorAll(".submenu-panel").forEach(s=>{s.style.display="none"});let n=t.querySelector(".submenu-panel");n&&(n.style.display="block",requestAnimationFrame(()=>{let s=n.getBoundingClientRect();s.right>window.innerWidth&&(n.style.left="auto",n.style.right="100%"),s.bottom>window.innerHeight&&(n.style.top="auto",n.style.bottom="0")}))},_hideSubmenu(e){this._closeTimer=setTimeout(()=>{this._openSubmenu=null;let t=e.querySelector(".submenu-panel");t&&(t.style.display="none")},150)},_renderLeafItem(e){return p`
      <li role="menuitem">
        <a
          @click=${t=>{t.preventDefault(),this.handleItemClick(e)}}
          class="flex items-center no-underline text-default hover:text-default hover:bg-surface-light px-4 py-1 cursor-pointer whitespace-nowrap"
        >
          ${e.icon?p`<uix-icon name=${e.icon} size="14" class="opacity-60 mr-2 flex-shrink-0"></uix-icon>`:""}
          <span class="flex-1">${e.label}</span>
          ${e.keybinding?p`<span class="text-xs ml-8 text-default/50">${e.keybinding}</span>`:""}
        </a>
      </li>
    `},_renderSubmenuParent(e){return p`
      <li role="menuitem" style="position: relative;"
        @mouseenter=${t=>this._showSubmenu(e.label,t.currentTarget)}
        @mouseleave=${t=>this._hideSubmenu(t.currentTarget)}
      >
        <a class="flex justify-between items-center no-underline text-default hover:text-default hover:bg-surface-light px-4 py-1 cursor-pointer whitespace-nowrap">
          <span class="flex items-center">
            ${e.icon?p`<uix-icon name=${e.icon} size="14" class="opacity-60 mr-2 flex-shrink-0"></uix-icon>`:""}
            <span>${e.label}</span>
          </span>
          <uix-icon name="chevron-right" size="12" class="ml-8 opacity-50 flex-shrink-0"></uix-icon>
        </a>
        <div class="submenu-panel fixed z-50 rounded-md shadow-lg text-sm bg-surface-dark border border-surface"
          style="display: none; position: absolute; left: 100%; top: 0;"
        >
          <uix-menu size="sm">
            ${e.children.map(t=>t.separator?p`<li role="separator" class="h-px bg-surface my-1"></li>`:this._renderLeafItem(t))}
          </uix-menu>
        </div>
      </li>
    `},_renderItem(e){return e.children?this._renderSubmenuParent(e):this._renderLeafItem(e)},render(){let e=this.items.reduce((n,s)=>{let r=s.group||"default";return n[r]||(n[r]=[]),n[r].push(s),n},{}),t=Object.keys(e).sort();return p`
      <div
        class="fixed z-50 rounded-md shadow-lg text-sm bg-surface-dark border border-surface"
        style="left: ${this.position.x}px; top: ${this.position.y}px;"
        @click=${n=>n.stopPropagation()}
      >
        <uix-menu size="sm">
          ${t.map((n,s)=>p`
              ${s>0?p`<li role="separator" class="h-px bg-surface my-1"></li>`:""}
              ${e[n].map(r=>this._renderItem(r))}
            `)}
        </uix-menu>
      </div>
    `}}});var Im,Tm=y(()=>{H();Se();V();Im={tag:"ide-extension-detail",style:!0,properties:{uri:u.string({defaultValue:""}),extensionId:u.string({defaultValue:""}),installed:u.boolean({defaultValue:!1}),activeTab:u.number({defaultValue:0}),pluginDef:u.object({attribute:!1,defaultValue:null})},connected(){if(!this.extensionId&&this.uri){let e=this.uri.replace("extensions://","");e.startsWith("detail/")&&(this.extensionId=e.replace("detail/",""))}this._refresh(),this._unsub=E().subscribe("extensionsChanged",()=>this._refresh())},disconnected(){this._unsub?.()},_refresh(){let e=E();this.installed=e.extensions.isInstalled(this.extensionId),this.pluginDef=e.extensions.installedExtensions?.get?.(this.extensionId)||null},_getExtension(){return E().extensions.getAvailableExtensions().find(e=>e.id===this.extensionId)},_install(e){E().extensions.install(e)},_uninstall(e){E().extensions.uninstall(e)},_openLink(e){e&&window.open(e,"_blank","noopener,noreferrer")},render(){let e=E(),t=this._getExtension();return t?p`
      <div class="detail-shell">
        <a class="back-link" @click=${()=>e.openResource("extensions://browse")}>
          <uix-icon name="arrow-left" size="14"></uix-icon>
          Back to Extensions
        </a>

        <header class="hero">
          <div class="hero-icon">
            <uix-icon name=${t.icon||"box"} size="36" class="hero-icon-svg"></uix-icon>
          </div>
          <div class="hero-info">
            <div class="hero-top">
              <h1 class="hero-name">${t.name}</h1>
              <uix-badge variant=${this.installed?"success":"default"} size="sm">
                ${this.installed?"Installed":"Available"}
              </uix-badge>
            </div>
            <div class="hero-meta">
              ${t.author?p`<span class="meta-item"><uix-icon name="user" size="12"></uix-icon>${t.author}</span>`:""}
              ${t.version?p`<span class="meta-item"><uix-icon name="tag" size="12"></uix-icon>v${t.version}</span>`:""}
              ${t.category?p`<uix-tag size="sm" variant="primary">${t.category}</uix-tag>`:""}
            </div>
            ${t.description?p`<p class="hero-tagline">${t.description}</p>`:""}
            <div class="hero-actions">
              ${this.installed?p`<uix-button variant="danger" @click=${()=>this._uninstall(t.id)}>
                    <uix-icon name="trash-2" size="14"></uix-icon> Uninstall
                  </uix-button>`:p`<uix-button variant="primary" @click=${()=>this._install(t.id)}>
                    <uix-icon name="download" size="14"></uix-icon> Install
                  </uix-button>`}
              ${t.homepage?p`
                <uix-button variant="ghost" @click=${()=>this._openLink(t.homepage)}>
                  <uix-icon name="external-link" size="14"></uix-icon> Homepage
                </uix-button>
              `:""}
              ${t.repository?p`
                <uix-button variant="ghost" @click=${()=>this._openLink(t.repository)}>
                  <uix-icon name="github" size="14"></uix-icon> Repository
                </uix-button>
              `:""}
            </div>
          </div>
        </header>

        <div class="layout">
          <div class="main">
            <uix-tabs
              variant="underline"
              .activeTab=${this.activeTab}
              @tab-change=${n=>{this.activeTab=n.detail}}
            >
              <button slot="tab">Overview</button>
              <button slot="tab">Contributions</button>
              <div slot="panel" class="tab-panel">
                ${this.activeTab===0?this._renderOverview(t):this._renderContributions(t)}
              </div>
            </uix-tabs>
          </div>

          <aside class="rail">
            ${this._renderRail(t)}
          </aside>
        </div>
      </div>
    `:p`
        <div class="detail-shell">
          <a class="back-link" @click=${()=>e.openResource("extensions://browse")}>
            <uix-icon name="arrow-left" size="14"></uix-icon>
            Back to Extensions
          </a>
          <div class="missing">
            <uix-icon name="package-x" size="32" class="missing-icon"></uix-icon>
            <p class="missing-text">Extension <strong>${this.extensionId}</strong> not found in the catalog.</p>
          </div>
        </div>
      `},_renderOverview(e){let t=[{label:"Status",value:this.installed?"Installed":"Available"},e.category?{label:"Category",value:e.category}:null,e.version?{label:"Version",value:`v${e.version}`}:null,e.author?{label:"Author",value:e.author}:null].filter(Boolean),n=e.longDescription||e.description||"No description provided.";return p`
      <section class="section">
        <h2 class="section-title">About</h2>
        <p class="section-copy">${n}</p>
      </section>

      <section class="section">
        <h2 class="section-title">At a glance</h2>
        <div class="facts-grid">
          ${t.map(s=>p`
            <div class="fact">
              <span class="fact-label">${s.label}</span>
              <span class="fact-value">${s.value}</span>
            </div>
          `)}
        </div>
      </section>
    `},_renderContributions(e){if(!this.installed||!this.pluginDef)return p`
        <div class="contrib-empty">
          <uix-icon name="plug" size="28" class="contrib-empty-icon"></uix-icon>
          <p class="contrib-empty-title">Install to see contributions</p>
          <p class="contrib-empty-text">
            Install this extension to inspect the commands, URI schemes, menus, and data models it contributes to the IDE.
          </p>
        </div>
      `;let t=this.pluginDef,n=t.commands?Object.entries(t.commands):[],s=t.menus?Object.entries(t.menus):[],r=t.types?.collections?Object.entries(t.types.collections):[],i=t.types?.notes?Object.entries(t.types.notes):[],o=t.data?.collections?.types||[],a=t.data?.notes?.types||[],l=[];return(t.sidebarComponent||t.route)&&l.push(p`
        <section class="section">
          <h2 class="section-title">Activity bar</h2>
          <div class="kv-list">
            ${t.title?p`<div class="kv"><span class="kv-k">Title</span><span class="kv-v">${t.title}</span></div>`:""}
            ${t.route?p`<div class="kv"><span class="kv-k">Route</span><code class="kv-code">${t.route}</code></div>`:""}
            ${t.sidebarComponent?p`<div class="kv"><span class="kv-k">Sidebar</span><code class="kv-code">${t.sidebarComponent}</code></div>`:""}
            ${t.position?p`<div class="kv"><span class="kv-k">Position</span><span class="kv-v">${t.position}</span></div>`:""}
            ${t.order!=null?p`<div class="kv"><span class="kv-k">Order</span><span class="kv-v">${t.order}</span></div>`:""}
          </div>
        </section>
      `),t.scheme&&l.push(p`
        <section class="section">
          <h2 class="section-title">URI scheme</h2>
          <code class="block-code">${t.scheme}://…</code>
          <p class="section-copy subtle">Other plugins can open resources under this scheme via <code>ide.openResource()</code>.</p>
        </section>
      `),n.length&&l.push(p`
        <section class="section">
          <h2 class="section-title">Commands <span class="section-count">${n.length}</span></h2>
          <div class="contrib-table">
            ${n.map(([c,d])=>p`
              <div class="contrib-row">
                <code class="contrib-id">${t.id}.${c}</code>
                <span class="contrib-label">${d.label||c}</span>
                ${d.category?p`<uix-tag size="sm">${d.category}</uix-tag>`:""}
                ${d.keybinding?p`<kbd class="contrib-kbd">${d.keybinding}</kbd>`:""}
              </div>
            `)}
          </div>
        </section>
      `),s.length&&l.push(p`
        <section class="section">
          <h2 class="section-title">Menus <span class="section-count">${s.length}</span></h2>
          <div class="menu-list">
            ${s.map(([c,d])=>p`
              <div class="menu-block">
                <div class="menu-name">${c}</div>
                <div class="menu-items">
                  ${(d||[]).map(h=>h.separator?p`<div class="menu-sep"></div>`:p`<div class="menu-item">
                        ${h.label||""}
                        ${h.command?p`<code class="menu-cmd">${h.command}</code>`:""}
                        ${h.keybinding?p`<kbd class="contrib-kbd">${h.keybinding}</kbd>`:""}
                      </div>`)}
                </div>
              </div>
            `)}
          </div>
        </section>
      `),(r.length||i.length)&&l.push(p`
        <section class="section">
          <h2 class="section-title">Types</h2>
          ${r.length?p`
            <div class="sub-section">
              <div class="sub-title">Collections <span class="section-count">${r.length}</span></div>
              <div class="tag-row">
                ${r.map(([c])=>p`<uix-tag size="sm">${c}</uix-tag>`)}
              </div>
            </div>
          `:""}
          ${i.length?p`
            <div class="sub-section">
              <div class="sub-title">Notes <span class="section-count">${i.length}</span></div>
              <div class="tag-row">
                ${i.map(([c])=>p`<uix-tag size="sm">${c}</uix-tag>`)}
              </div>
            </div>
          `:""}
        </section>
      `),(o.length||a.length)&&l.push(p`
        <section class="section">
          <h2 class="section-title">Data managers</h2>
          ${o.length?p`
            <div class="sub-section">
              <div class="sub-title">Collections</div>
              <div class="tag-row">
                ${o.map(c=>p`<uix-tag size="sm">${c}</uix-tag>`)}
              </div>
            </div>
          `:""}
          ${a.length?p`
            <div class="sub-section">
              <div class="sub-title">Notes</div>
              <div class="tag-row">
                ${a.map(c=>p`<uix-tag size="sm">${c}</uix-tag>`)}
              </div>
            </div>
          `:""}
        </section>
      `),t.capabilities?.length&&l.push(p`
        <section class="section">
          <h2 class="section-title">Capabilities</h2>
          <div class="tag-row">
            ${t.capabilities.map(c=>p`<uix-tag size="sm" outlined>${c}</uix-tag>`)}
          </div>
        </section>
      `),l.length?p`${l}`:p`
        <div class="contrib-empty">
          <uix-icon name="info" size="28" class="contrib-empty-icon"></uix-icon>
          <p class="contrib-empty-title">No introspectable contributions</p>
          <p class="contrib-empty-text">This extension doesn't declare commands, menus, types, or activity-bar entries.</p>
        </div>
      `},_renderRail(e){return p`
      <uix-card class="rail-card" gap="md">
        <div slot="header" class="rail-header">Details</div>
        <div class="rail-section">
          <div class="rail-label">Status</div>
          <uix-badge variant=${this.installed?"success":"default"} size="sm">
            ${this.installed?"Installed":"Available"}
          </uix-badge>
        </div>
        ${e.category?p`
          <div class="rail-section">
            <div class="rail-label">Category</div>
            <div class="rail-value">${e.category}</div>
          </div>
        `:""}
        ${e.version?p`
          <div class="rail-section">
            <div class="rail-label">Version</div>
            <div class="rail-value">v${e.version}</div>
          </div>
        `:""}
        ${e.author?p`
          <div class="rail-section">
            <div class="rail-label">Author</div>
            <div class="rail-value">${e.author}</div>
          </div>
        `:""}
        ${e.tags?.length?p`
          <div class="rail-section">
            <div class="rail-label">Tags</div>
            <div class="tag-row">
              ${e.tags.map(t=>p`<uix-tag size="sm">${t}</uix-tag>`)}
            </div>
          </div>
        `:""}
        ${e.homepage||e.repository?p`
          <div class="rail-section">
            <div class="rail-label">Resources</div>
            <div class="link-list">
              ${e.homepage?p`
                <a class="link-row" @click=${()=>this._openLink(e.homepage)}>
                  <uix-icon name="external-link" size="12"></uix-icon>
                  Homepage
                </a>
              `:""}
              ${e.repository?p`
                <a class="link-row" @click=${()=>this._openLink(e.repository)}>
                  <uix-icon name="github" size="12"></uix-icon>
                  Repository
                </a>
              `:""}
            </div>
          </div>
        `:""}
      </uix-card>
    `}}});var c1,u1,d1,Pm,Mm=y(()=>{H();Se();V();c1=[{label:"Name (A \u2192 Z)",value:"name"},{label:"Recently Added",value:"recent"},{label:"Installed First",value:"status"}],u1=[{id:"all",label:"All"},{id:"installed",label:"Installed"},{id:"available",label:"Available"}],d1=14,Pm={tag:"ide-extensions-browser",style:!0,properties:{uri:u.string({defaultValue:""}),search:u.string({defaultValue:""}),sortBy:u.string({defaultValue:"name"}),statusFilter:u.string({defaultValue:"all"}),categoryFilters:u.object({attribute:!1,defaultValue:{}}),tagFilters:u.object({attribute:!1,defaultValue:{}}),extensions:u.array({defaultValue:[]}),installedIds:u.object({attribute:!1,defaultValue:new Set})},connected(){this._refresh(),this._unsub=E().subscribe("extensionsChanged",()=>this._refresh())},disconnected(){this._unsub?.()},_refresh(){let e=E().extensions;this.extensions=[...e.getAvailableExtensions()],this.installedIds=new Set(e.getInstalledExtensions().map(t=>t.id))},_toggleCategory(e){this.categoryFilters={...this.categoryFilters,[e]:!this.categoryFilters[e]}},_toggleTag(e){this.tagFilters={...this.tagFilters,[e]:!this.tagFilters[e]}},_clearFilters(){this.search="",this.statusFilter="all",this.categoryFilters={},this.tagFilters={}},_hasActiveFilters(){let e=Object.values(this.categoryFilters).some(Boolean),t=Object.values(this.tagFilters).some(Boolean);return!!(this.search||this.statusFilter!=="all"||e||t)},_matches(e){let t=this.search.trim().toLowerCase();if(t&&!((e.name||"").toLowerCase().includes(t)||(e.description||"").toLowerCase().includes(t)||(e.longDescription||"").toLowerCase().includes(t)||(e.author||"").toLowerCase().includes(t)||(e.category||"").toLowerCase().includes(t)||e.tags?.some(o=>o.toLowerCase().includes(t))))return!1;let n=this.installedIds.has(e.id);if(this.statusFilter==="installed"&&!n||this.statusFilter==="available"&&n)return!1;let s=Object.entries(this.categoryFilters).filter(([,i])=>i).map(([i])=>i);if(s.length&&!s.includes(e.category))return!1;let r=Object.entries(this.tagFilters).filter(([,i])=>i).map(([i])=>i);return!(r.length&&!(e.tags||[]).some(i=>r.includes(i)))},_sort(e){let t=[...e];return this.sortBy==="name"?t.sort((n,s)=>(n.name||"").localeCompare(s.name||"")):this.sortBy==="status"&&t.sort((n,s)=>{let r=this.installedIds.has(n.id)?0:1,i=this.installedIds.has(s.id)?0:1;return r!==i?r-i:(n.name||"").localeCompare(s.name||"")}),t},_getCategories(){let e=new Map;for(let t of this.extensions){let n=t.category||"Other";e.set(n,(e.get(n)||0)+1)}return[...e.entries()].sort((t,n)=>t[0].localeCompare(n[0]))},_getTopTags(){let e=new Map;for(let t of this.extensions)for(let n of t.tags||[])e.set(n,(e.get(n)||0)+1);return[...e.entries()].sort((t,n)=>n[1]-t[1]||t[0].localeCompare(n[0])).slice(0,d1)},render(){let e=E(),t=this._sort(this.extensions.filter(o=>this._matches(o))),s=!this._hasActiveFilters()?this.extensions.filter(o=>o.featured).slice(0,3):[],r=this._getCategories(),i=this._getTopTags();return p`
      <div class="browser-shell">
        <header class="browser-head">
          <div class="browser-head-text">
            <h1 class="browser-title">Extensions</h1>
            <p class="browser-subtitle">Extend your workspace with tools, integrations, and data models.</p>
          </div>
        </header>

        <div class="browser-layout">
          <aside class="filter-rail">
            <uix-card gap="md">
              <div class="filter-group">
                <div class="filter-label">Status</div>
                <uix-radio-group
                  name="ext-status"
                  .value=${this.statusFilter}
                  size="sm"
                  @change=${o=>{this.statusFilter=o.detail.value}}
                >
                  ${u1.map(o=>p`
                    <uix-radio value=${o.id} label=${o.label}></uix-radio>
                  `)}
                </uix-radio-group>
              </div>

              ${r.length?p`
                <div class="filter-group">
                  <div class="filter-label">Categories</div>
                  <div class="checkbox-list">
                    ${r.map(([o,a])=>p`
                      <div class="checkbox-row">
                        <uix-checkbox
                          size="sm"
                          label=${o}
                          .checked=${!!this.categoryFilters[o]}
                          @change=${()=>this._toggleCategory(o)}
                        ></uix-checkbox>
                        <span class="cb-count">${a}</span>
                      </div>
                    `)}
                  </div>
                </div>
              `:""}

              ${i.length?p`
                <div class="filter-group">
                  <div class="filter-label">Popular tags</div>
                  <div class="tag-cloud">
                    ${i.map(([o,a])=>p`
                      <uix-tag
                        size="sm"
                        outlined
                        variant=${this.tagFilters[o]?"primary":"default"}
                        style="cursor:pointer"
                        @click=${()=>this._toggleTag(o)}
                      >${o} <span class="tag-count">${a}</span></uix-tag>
                    `)}
                  </div>
                </div>
              `:""}

              ${this._hasActiveFilters()?p`
                <uix-button size="sm" variant="ghost" @click=${()=>this._clearFilters()}>
                  <uix-icon name="x" size="12"></uix-icon> Clear filters
                </uix-button>
              `:""}
            </uix-card>
          </aside>

          <div class="browser-main">
            <div class="browser-toolbar">
              <div class="search-wrap">
                <uix-input
                  type="search"
                  size="sm"
                  fullWidth
                  placeholder="Search by name, tag, author…"
                  .value=${this.search}
                  @input=${o=>{this.search=o.detail.value}}
                ></uix-input>
              </div>
              <div class="toolbar-right">
                <span class="result-count">
                  ${t.length} ${t.length===1?"result":"results"}
                </span>
                <uix-select
                  size="sm"
                  .value=${this.sortBy}
                  .options=${c1}
                  @change=${o=>{this.sortBy=o.detail.value}}
                ></uix-select>
              </div>
            </div>

            ${s.length?p`
              <section class="featured-section">
                <h2 class="featured-title">
                  <uix-icon name="sparkles" size="14"></uix-icon>
                  Featured
                </h2>
                <div class="featured-row">
                  ${s.map(o=>this._renderCard(o,e,!0))}
                </div>
              </section>
            `:""}

            ${t.length?p`
              <div class="card-grid">
                ${t.map(o=>this._renderCard(o,e,!1))}
              </div>
            `:p`
              <div class="empty-state">
                <uix-icon name="search-x" size="36" class="empty-icon"></uix-icon>
                <p class="empty-title">No extensions match your filters</p>
                <uix-button size="sm" variant="ghost" @click=${()=>this._clearFilters()}>Clear filters</uix-button>
              </div>
            `}
          </div>
        </div>
      </div>
    `},_renderCard(e,t,n){let s=this.installedIds.has(e.id);return p`
      <uix-card
        class="ext-card"
        hover
        gap="sm"
        @click=${()=>t.openResource(`extensions://detail/${e.id}`)}
      >
        <div slot="header" class="card-head">
          <div class="card-icon">
            <uix-icon name=${e.icon||"box"} size=${n?"20":"22"}></uix-icon>
          </div>
          <div class="card-head-text">
            <div class="card-name-row">
              ${s?p`<uix-circle solid class="installed-dot" title="Installed"></uix-circle>`:""}
              <span class="card-name">${e.name}</span>
            </div>
            ${e.author?p`<span class="card-author">${e.author}</span>`:""}
          </div>
          ${e.category?p`<uix-tag size="sm" outlined>${e.category}</uix-tag>`:""}
        </div>

        <p class="card-desc">${e.description||""}</p>
        <div class="card-tags">
          ${(e.tags||[]).slice(0,4).map(r=>p`<uix-tag size="sm">${r}</uix-tag>`)}
        </div>

        <div slot="footer" class="card-foot" style="--uix-card-footer-justify: space-between">
          <uix-button
            variant=${s?"danger":"primary"}
            size="sm"
            @click=${r=>{r.stopPropagation(),s?t.extensions.uninstall(e.id):t.extensions.install(e.id)}}
          >${s?"Uninstall":"Install"}</uix-button>
          <a
            class="card-details"
            @click=${r=>{r.stopPropagation(),t.openResource(`extensions://detail/${e.id}`)}}
          >Details →</a>
        </div>
      </uix-card>
    `}}});var jm,Fm=y(()=>{H();Se();V();jm={properties:{installed:u.array([]),available:u.array([]),searchQuery:u.string("")},connected(){this._refresh(),this.unsub=E().subscribe("extensionsChanged",()=>this._refresh())},disconnected(){this.unsub?.()},_refresh(){let e=E().extensions;this.installed=e.getInstalledExtensions();let t=new Set(this.installed.map(n=>n.id));this.available=e.getAvailableExtensions().filter(n=>!t.has(n.id))},render(){let e=E(),t=this.searchQuery.toLowerCase(),n=o=>!t||(o.name||"").toLowerCase().includes(t)||(o.author||"").toLowerCase().includes(t)||(o.description||"").toLowerCase().includes(t)||o.tags?.some(a=>a.toLowerCase().includes(t)),s=this.installed.filter(n),r=this.available.filter(n),i=(o,a)=>p`
      <div
        class="group p-2 flex gap-3 hover:bg-surface-light rounded-md cursor-pointer"
        @click=${()=>e.openResource(`extensions://detail/${o.id}`)}
      >
        <div class="w-9 h-9 rounded flex items-center justify-center flex-shrink-0 bg-surface">
          <uix-icon name=${o.icon||"box"} class="w-5 h-5 text-primary"></uix-icon>
        </div>
        <div class="flex-grow overflow-hidden min-w-0">
          <div class="flex items-center gap-2">
            <div class="font-semibold text-sm truncate text-default">${o.name}</div>
            ${a?p`<span class="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" title="Installed"></span>`:""}
          </div>
          <div class="text-xs truncate text-default/50">${o.description||o.author||""}</div>
        </div>
        <uix-button
          variant="${a?"danger":"primary"}"
          size="sm"
          class="self-start opacity-0 group-hover:opacity-100 transition-opacity"
          @click=${l=>{l.stopPropagation(),a?e.extensions.uninstall(o.id):e.extensions.install(o.id)}}
        >
          ${a?"Uninstall":"Install"}
        </uix-button>
      </div>
    `;return p`
      <div class="flex flex-col h-full text-sm bg-surface-dark text-default">
        <div class="p-2">
          <div class="p-2 flex items-center gap-2">
            <div class="font-semibold uppercase text-xs tracking-wider text-default/50 flex-1">Extensions</div>
            <button
              class="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
              @click=${()=>e.openResource("extensions://browse")}
              title="Browse all extensions"
            >
              <uix-icon name="layout-grid" class="w-3 h-3"></uix-icon>
              Browse
            </button>
          </div>
          <div class="px-2">
            <uix-input
              w-full
              type="search"
              size="sm"
              placeholder="Search Extensions"
              .value=${this.searchQuery}
              @input=${o=>{this.searchQuery=o.target.value}}
            ></uix-input>
          </div>
        </div>
        <div class="overflow-y-auto px-2 flex-1 space-y-3 py-2">
          ${s.length>0?p`
            <div>
              <div class="text-xs font-semibold text-default/50 uppercase my-2 px-2">Installed · ${s.length}</div>
              <div class="space-y-1">${s.map(o=>i(o,!0))}</div>
            </div>
          `:""}

          ${r.length>0?p`
            <div>
              <div class="text-xs font-semibold text-default/50 uppercase my-2 pt-2 px-2">Available · ${r.length}</div>
              <div class="space-y-1">${r.map(o=>i(o,!1))}</div>
            </div>
          `:""}

          ${s.length===0&&r.length===0?p`
            <div class="text-center text-xs text-default/50 pt-4">No extensions found.</div>
          `:""}
        </div>
      </div>
    `}}});var Vl={};Ee(Vl,{WebsiteProvider:()=>Dm,default:()=>p1});function Nl(e){let n=e.replace("website://","").replace("website:","").split("/").filter(Boolean);if(!n[0]||n[0]==="dashboard")return{type:"dashboard"};if(n[0]==="websites")return{type:"websites"};if(n[0]==="new-project")return{type:"new-project"};if(n[0]==="templates")return{type:"templates"};if(n[0]==="settings"&&n[1])return{type:"website-settings",websiteId:n[1]};if(n[0]==="file")return{type:"file",path:"/"+n.slice(1).join("/")};let s=n[n.length-1];return s&&s.includes(".")?{type:"file",path:"/"+n.join("/")}:{type:"dashboard"}}function h1(e){if(!e)return"file";let t=e.split(".").pop()?.toLowerCase();return{js:"file-code",ts:"file-code",jsx:"file-code",tsx:"file-code",css:"file-type",scss:"file-type",html:"file-code",json:"file-json",md:"file-text",svg:"file-image",png:"file-image",jpg:"file-image",jpeg:"file-image",gif:"file-image",webp:"file-image"}[t]||"file"}var ht,Dm,p1,Bl=y(()=>{Ue();rt();ht=null,Dm={get currentWebsiteId(){return ht},setCurrentWebsite(e){ht=e,ne.emit("CMS:LOG",{type:"website_selected",websiteId:e}),ne.emit("CMS:WEBSITE_CHANGED",{websiteId:e})},async getTree(e=[]){if(!ht)return{};try{let t={},n=1,s=new Set(e);return s.add("/"),t["website:///"]={id:String(n++),uri:"website:///",path:"/",name:"Website",type:"folder",parent:null,children:[]},n=await this._buildFlatTree("/",t,"website:///",n,s),t}catch(t){return console.error("[WebsiteProvider] getTree error:",t),ne.emit("CMS:ERROR",{type:"website_tree_failed",error:t}),{}}},async _buildFlatTree(e,t,n,s,r){let i;try{i=await j.SW?.request("FS:WEBSITE_LIST_FILES",{websiteId:ht,path:e})}catch(o){return console.error("[WebsiteProvider] Error listing",e,":",o),s}if(!Array.isArray(i))return s;i.sort((o,a)=>o.isDirectory&&!a.isDirectory?-1:!o.isDirectory&&a.isDirectory?1:o.name.localeCompare(a.name));for(let o of i){let a=String(s++),l=o.path.replace(/\/$/,""),c=o.isDirectory?`website://${l}/`:`website://${l}`,d={id:a,uri:c,path:l,name:o.name,type:o.isDirectory?"folder":"file",parent:n,isOverride:o.isOverride};t[c]=d,t[n]?.children&&t[n].children.push(c),o.isDirectory&&(d.children=[],(r.has(l)||r.has(l+"/"))&&(s=await this._buildFlatTree(l,t,c,s,r)))}return s},async getContent(e){let t=Nl(e);if(t.type==="websites")return{type:"websites",items:await j.Model.cms_websites?.getAll()||[]};if(t.type==="website-settings")return{type:"website-settings",website:await j.Model.cms_websites?.get(t.websiteId)};if(t.type==="new-project")return{type:"new-project"};if(t.type==="templates")return{type:"templates",items:await j.Model.cms_templates?.getAll()||[]};if(t.type==="file"){if(!ht)return"";try{return(await j.SW?.request("FS:WEBSITE_READ_FILE",{websiteId:ht,path:t.path})).content||""}catch(n){return console.error("[WebsiteProvider] Error reading file:",t.path,n),""}}return{type:"dashboard"}},getTabMetadata(e){let t=Nl(e),n={websites:{label:"Websites",icon:"globe",component:"cms-websites-list"},"website-settings":{label:"Settings",icon:"settings",component:"cms-website-settings"},"new-project":{label:"New Website",icon:"plus",component:"cms-project-wizard"},templates:{label:"Templates",icon:"layout-template",component:"cms-template-browser"},file:{label:t.path?.split("/").pop()||"File",icon:h1(t.path),component:"ide-code-editor"},dashboard:{label:"Website",icon:"globe",component:"cms-website-dashboard"}},s=n[t.type]||n.dashboard;return t.type==="file"&&t.isOverride&&(s.label=`${s.label} (modified)`,s.icon="file-pen"),s},async saveContent(e,t){let n=Nl(e);if(n.type==="file"&&ht)try{return await j.SW?.request("FS:WEBSITE_WRITE_FILE",{websiteId:ht,path:n.path,content:t}),!0}catch(s){return console.error("[WebsiteProvider] Save error:",s),ne.emit("CMS:ERROR",{type:"website_save_failed",path:n.path,error:s}),!1}return!1},async hasOverride(e){if(!ht)return!1;try{return await j.SW?.request("FS:WEBSITE_HAS_OVERRIDE",{websiteId:ht,path:e})}catch{return!1}},async revertToTemplate(e){if(!ht)return!1;try{return await j.SW?.request("FS:WEBSITE_DELETE_FILE",{websiteId:ht,path:e}),!0}catch(t){return ne.emit("CMS:ERROR",{type:"website_revert_failed",path:e,error:t}),!1}},getPreviewUrl(e){return`/preview/${e}/`}};p1=Dm});var Om,Lm=y(()=>{Ue();H();Se();V();hs();Da();Ln();Mn();Om={class:"block h-full",properties:{scheme:u.string({attribute:!1}),expertMode:u.boolean({defaultValue:!1,sync:"local"}),fileTree:u.object(),openFolders:u.array(),activeResourceUri:u.string(),websites:u.array({defaultValue:[]}),selectedWebsiteId:u.string({attribute:!1}),directoryName:u.string({attribute:!1}),directorySupported:u.boolean({attribute:!1,defaultValue:!1}),pendingReconnect:u.object({attribute:!1})},async connected(){let e=E();j.manifest||await new Promise(t=>{let n=()=>{j.events?.off("MANIFEST:REFRESHED",n),t()};j.events?.on("MANIFEST:REFRESHED",n),setTimeout(t,2e3)}),this.scheme="file",this.openFolders=e.openFolders||[],this.activeResourceUri=e.activeResourceUri,this.fileTree=e.resourceTrees?e.resourceTrees.get(this.scheme):{},this._unsubTree=e.subscribe("resourceTrees",t=>{this.fileTree=t?.get(this.scheme)??{}}),this._unsubTypeIndex=e.subscribe("typeIndex",()=>{Je("typeDispatchEnrich")&&this.requestUpdate()}),this._unsubFolders=e.subscribe("openFolders",t=>{this.openFolders=t||[]}),this._unsubActive=e.subscribe("activeResourceUri",t=>{this.activeResourceUri=t}),this.directorySupported=Ht(),this.pendingReconnect=e.pendingDirectoryReconnect||null,this.directorySupported&&!this.pendingReconnect?this.directoryName=await ds()||"":this.directoryName="",this._unsubReconnect=e.subscribe("pendingDirectoryReconnect",async t=>{this.pendingReconnect=t||null,this.directorySupported&&!this.pendingReconnect?this.directoryName=await ds()||"":this.directoryName=""}),this.scheme==="website"&&(this.loadWebsites().then(async()=>{if(this.selectedWebsiteId){let t=E();console.log("[ide-file-explorer] Initial refresh for selected website:",this.selectedWebsiteId),await t.refreshResourceTree("website")}}),this._websiteHandler=async()=>{await this.loadWebsites(),await E().refreshResourceTree("website")},j.events?.on("CMS:WEBSITE_CHANGED",this._websiteHandler))},disconnected(){this._unsubTree&&this._unsubTree(),this._unsubTypeIndex&&this._unsubTypeIndex(),this._unsubFolders&&this._unsubFolders(),this._unsubActive&&this._unsubActive(),this._unsubReconnect&&this._unsubReconnect(),this._websiteHandler&&j.events?.off("CMS:WEBSITE_CHANGED",this._websiteHandler);let e=document.querySelector("ide-context-menu");e&&e.remove()},async connectFolder(){try{let e=await ln();this.directoryName=e.name,await E().executeCommand("files.setBacking",{kind:"directory",handle:e})}catch(e){e.name!=="AbortError"&&console.error("[ide-file-explorer] Connect folder failed:",e)}},async disconnectFolder(){await Ci(),this.directoryName="",await E().executeCommand("files.setBacking",{kind:"sw"})},async loadWebsites(){if(j.Model?.cms_websites){let e=await j.Model.cms_websites.getAll();this.websites=Array.isArray(e)?e:[];let{WebsiteProvider:t}=await Promise.resolve().then(()=>(Bl(),Vl));this.selectedWebsiteId=t.currentWebsiteId}},async selectWebsite(e){console.log("[ide-file-explorer] selectWebsite called with:",e);let{WebsiteProvider:t}=await Promise.resolve().then(()=>(Bl(),Vl));t.setCurrentWebsite(e),this.selectedWebsiteId=e;let n=E();console.log("[ide-file-explorer] Refreshing resource tree for scheme: website"),await n.refreshResourceTree("website"),console.log("[ide-file-explorer] After refresh, fileTree:",this.fileTree)},showContextMenu(e,t){e.preventDefault(),e.stopPropagation();let n=E(),s=document.querySelector("ide-context-menu");s&&s.remove();let r=`explorer/${t.type}`,i=n.getContextMenuActions(r,{uri:t.uri,path:t.path,type:t.type});if(i.length===0)return;let o=document.createElement("ide-context-menu");o.items=i,o.position={x:e.clientX,y:e.clientY},o.target={uri:t.uri,path:t.path,type:t.type},document.body.appendChild(o)},renderFolder(e){let t=E(),n=this.openFolders.includes(e.path);return p`
      <uix-tree-item
        label=${e.name}
        icon=${n?"folder-open":"folder"}
        ?expanded=${n}
        @click=${s=>{s.stopPropagation(),console.log("[ide-file-explorer] Toggle folder:",e.path,"scheme:",this.scheme),t.toggleFolder(e.path,this.scheme)}}
        @contextmenu=${s=>this.showContextMenu(s,e)}
      >
        ${e?.children?.map(s=>{let r=this.fileTree[s];return r?r.type==="folder"?this.renderFolder(r):this.renderFile(r):""})}
      </uix-tree-item>
    `},renderFile(e){let t=E(),n=this.activeResourceUri===e.uri,s=t.resourceModified.get(e.uri),r=e.name,i="file";if(Je("typeDispatchEnrich")&&e.path?.endsWith(".md")){let o=Qd(t,e.path);if(o){let a=di(o.frontmatter);if(a){a.icon&&(i=a.icon);let l=o.frontmatter?.title||o.frontmatter?.name;l&&(r=l)}}}return p`
      <uix-tree-item
        label=${r}
        icon=${i}
        ?active=${n}
        ?modified=${s}
        @click=${o=>{o.stopPropagation(),t.openResource(e.uri)}}
        @contextmenu=${o=>this.showContextMenu(o,e)}
      ></uix-tree-item>
    `},renderWebsiteEmptyState(){let e=E();return p`
      <div class="flex flex-col h-full bg-surface-darker text-default">
        <div class="p-2 font-semibold uppercase text-xs tracking-wider text-default/50">
          Explorer
        </div>
        <div class="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <uix-icon name="globe" size="48" class="text-muted mb-4"></uix-icon>
          <p class="text-sm text-muted mb-4">No websites yet</p>
          <uix-button
            variant="primary"
            size="sm"
            @click=${()=>e.openResource("website://new-project")}
          >
            <uix-icon name="plus" size="14" class="mr-1"></uix-icon>
            Create Website
          </uix-button>
        </div>
      </div>
    `},renderWebsiteSelector(){let e=E();return p`
      <div class="flex flex-col h-full bg-surface-darker text-default">
        <div class="p-2 font-semibold uppercase text-xs tracking-wider text-default/50">
          Explorer
        </div>
        <div class="flex-1 flex flex-col p-4">
          <p class="text-sm text-muted mb-4">Select a website to browse files</p>
          <div class="space-y-2">
            ${this.websites.map(t=>p`
                <div
                  class="p-3 bg-surface rounded cursor-pointer hover:bg-surface-lighter border border-transparent hover:border-primary transition-colors"
                  @click=${()=>this.selectWebsite(t.id)}
                >
                  <div class="flex items-center gap-2">
                    <uix-icon name="globe" size="16"></uix-icon>
                    <span class="font-medium">${t.name}</span>
                  </div>
                  ${t.template?p`<span class="text-xs text-muted">${t.template}</span>`:""}
                </div>
              `)}
          </div>
          <div class="mt-4 pt-4 border-t border-surface">
            <uix-button
              ghost
              size="sm"
              class="w-full"
              @click=${()=>e.openResource("website://new-project")}
            >
              <uix-icon name="plus" size="14" class="mr-1"></uix-icon>
              Create New Website
            </uix-button>
          </div>
        </div>
      </div>
    `},renderFileExplorer(){let e=E(),t=Object.fromEntries(Object.entries(this.fileTree||{}).filter(([c,d])=>!c.startsWith(`${this.scheme}:///.bootstrapp`)&&d.path!=="/")),n=Object.keys(t).filter(c=>{let d=t[c];return d?d.parent===`${this.scheme}:///`||d.parent==="1":!1}),s=Object.values(t).find(c=>c.path==="/"),r=s?s.uri:`${this.scheme}:///`,i=this.scheme==="website"&&this.selectedWebsiteId?p`
            <div class="px-2 py-1 text-xs text-muted flex items-center justify-between border-b border-surface">
              <span class="flex items-center gap-1">
                <uix-icon name="globe" size="12"></uix-icon>
                ${this.websites.find(c=>c.id===this.selectedWebsiteId)?.name||"Website"}
              </span>
              <uix-icon
                name="chevron-down"
                size="12"
                class="cursor-pointer hover:text-default"
                @click=${()=>{this.selectedWebsiteId=null}}
              ></uix-icon>
            </div>
          `:"",o=this.pendingReconnect?.name,a=this.scheme==="file"&&o?p`
            <div
              class="px-2 py-1 text-xs flex items-center justify-between border-b border-surface bg-warning/10 cursor-pointer hover:bg-warning/20"
              title="Click to reconnect"
              @click=${()=>e.executeCommand("files.reconnectDirectory")}
            >
              <span class="flex items-center gap-1 truncate">
                <uix-icon name="folder-open" size="12"></uix-icon>
                <span class="truncate">Reconnect to ${o}</span>
              </span>
              <uix-icon name="rotate-cw" size="12"></uix-icon>
            </div>
          `:this.scheme==="file"&&this.directoryName?p`
              <div class="px-2 py-1 text-xs text-muted flex items-center justify-between border-b border-surface">
                <span class="flex items-center gap-1 truncate" title=${this.directoryName}>
                  <uix-icon name="folder-open" size="12"></uix-icon>
                  <span class="truncate">${this.directoryName}</span>
                </span>
                <uix-icon
                  name="x"
                  size="12"
                  class="cursor-pointer hover:text-default"
                  title="Disconnect folder"
                  @click=${()=>this.disconnectFolder()}
                ></uix-icon>
              </div>
            `:"",l=this.scheme==="file"&&this.directorySupported&&!this.directoryName&&!o?p`
            <uix-icon
              name="folder-open"
              class="w-4 h-4 cursor-pointer hover:text-default"
              title="Connect Folder"
              @click=${()=>this.connectFolder()}
            ></uix-icon>
          `:"";return p`
      <div class="flex flex-col h-full bg-surface-darker text-default">
        <div class="p-2 font-semibold uppercase text-xs tracking-wider text-default/50 flex items-center justify-between">
          <span>Explorer</span>
          <div class="flex gap-2 text-default/50">
            ${l}
            <uix-icon
              name="file-plus"
              class="w-4 h-4 cursor-pointer hover:text-default"
              @click=${()=>e.executeCommand("files.newFileInFolder",{uri:r})}
            ></uix-icon>
            <uix-icon
              name="folder-plus"
              class="w-4 h-4 cursor-pointer hover:text-default"
              @click=${()=>e.executeCommand("files.newFolder",{uri:r})}
            ></uix-icon>
            <uix-icon
              name="refresh-cw"
              class="w-4 h-4 cursor-pointer hover:text-default"
              @click=${async()=>await e.refreshResourceTree(this.scheme)}
            ></uix-icon>
          </div>
        </div>
        ${a}
        ${i}
        <div class="overflow-y-auto px-2 flex-1 relative">
          <uix-tree>
            ${n.map(c=>{let d=t[c];return d?d.type==="folder"?this.renderFolder(d):this.renderFile(d):""})}
          </uix-tree>
        </div>
      </div>
    `},render(){if(this.scheme==="website"){if(!this.websites.length)return this.renderWebsiteEmptyState();if(!this.selectedWebsiteId)return this.renderWebsiteSelector()}return this.renderFileExplorer()}}});var zm,Um=y(()=>{V();H();Se();zm={properties:{mode:u.string("find"),findQuery:u.string(""),replaceQuery:u.string(""),matchCase:u.boolean(!1),wholeWord:u.boolean(!1),useRegex:u.boolean(!1),currentMatch:u.number(0),totalMatches:u.number(0),uri:u.string()},connected(){setTimeout(()=>{let e=this.querySelector('input[name="find"]');e&&(e.focus(),e.select())},50),this._handleKeydown=this.handleKeydown.bind(this),this.addEventListener("keydown",this._handleKeydown)},disconnected(){this.removeEventListener("keydown",this._handleKeydown)},handleKeydown(e){e.key==="Escape"?(e.preventDefault(),this.close()):e.key==="Enter"&&(e.preventDefault(),e.shiftKey?this.findPrevious():this.findNext())},close(){E().executeCommand("core.editor.closeFindWidget",{uri:this.uri})},findNext(){E().executeCommand("core.editor.findNext",{uri:this.uri,query:this.findQuery,options:{matchCase:this.matchCase,wholeWord:this.wholeWord,useRegex:this.useRegex}})},findPrevious(){E().executeCommand("core.editor.findPrevious",{uri:this.uri,query:this.findQuery,options:{matchCase:this.matchCase,wholeWord:this.wholeWord,useRegex:this.useRegex}})},replaceNext(){E().executeCommand("core.editor.replaceNext",{uri:this.uri,findQuery:this.findQuery,replaceQuery:this.replaceQuery,options:{matchCase:this.matchCase,wholeWord:this.wholeWord,useRegex:this.useRegex}})},replaceAll(){E().executeCommand("core.editor.replaceAll",{uri:this.uri,findQuery:this.findQuery,replaceQuery:this.replaceQuery,options:{matchCase:this.matchCase,wholeWord:this.wholeWord,useRegex:this.useRegex}})},toggleMode(){this.mode=this.mode==="find"?"replace":"find"},handleFindInput(e){this.findQuery=e.target.value,this.findQuery&&E().executeCommand("core.editor.find",{uri:this.uri,query:this.findQuery,options:{matchCase:this.matchCase,wholeWord:this.wholeWord,useRegex:this.useRegex}})},render(){return p`
      <div
        class="absolute top-2 right-4 z-50 bg-surface-dark border border-surface rounded-md shadow-xl p-2 min-w-[400px]"
      >
        <div class="flex items-center gap-1 mb-1">
          <button
            type="button"
            class="p-1 hover:bg-surface-light rounded-md text-default/50 hover:text-default transition-colors"
            @click=${this.toggleMode.bind(this)}
            title="Toggle Replace"
          >
            <uix-icon name="chevron-${this.mode==="replace"?"down":"right"}" size="12"></uix-icon>
          </button>

          <div class="relative flex-1">
            <input
              type="text"
              name="find"
              placeholder="Find"
              .value=${this.findQuery}
              @input=${this.handleFindInput.bind(this)}
              class="w-full bg-surface border border-default/20 focus:border-primary rounded-md pl-2 pr-20 py-1 text-sm outline-none text-default placeholder-default/50"
            />
            <div class="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
              <button
                type="button"
                @click=${()=>{this.matchCase=!this.matchCase,this.handleFindInput({target:{value:this.findQuery}})}}
                class="p-0.5 text-xs rounded-md transition-colors ${this.matchCase?"bg-primary-lighter text-primary-darker":"bg-transparent text-default/30 hover:text-default"}"
                title="Match Case"
              >Aa</button>
              <button
                type="button"
                @click=${()=>{this.wholeWord=!this.wholeWord,this.handleFindInput({target:{value:this.findQuery}})}}
                class="p-0.5 text-xs rounded-md transition-colors ${this.wholeWord?"bg-primary-lighter text-primary-darker":"bg-transparent text-default/30 hover:text-default"}"
                title="Match Whole Word"
              >ab</button>
              <button
                type="button"
                @click=${()=>{this.useRegex=!this.useRegex,this.handleFindInput({target:{value:this.findQuery}})}}
                class="p-0.5 text-xs rounded-md transition-colors ${this.useRegex?"bg-primary-lighter text-primary-darker":"bg-transparent text-default/30 hover:text-default"}"
                title="Use Regular Expression"
              >.*</button>
            </div>
          </div>

          <span class="text-xs text-default/30 min-w-[40px] text-center">
            ${this.totalMatches>0?`${this.currentMatch}/${this.totalMatches}`:"No results"}
          </span>

          <button
            type="button"
            class="p-1 hover:bg-surface-light rounded-md text-default/50 hover:text-default transition-colors"
            @click=${this.findPrevious.bind(this)}
            title="Previous Match (Shift+Enter)"
          >
            <uix-icon name="chevron-up" size="12"></uix-icon>
          </button>

          <button
            type="button"
            class="p-1 hover:bg-surface-light rounded-md text-default/50 hover:text-default transition-colors"
            @click=${this.findNext.bind(this)}
            title="Next Match (Enter)"
          >
            <uix-icon name="chevron-down" size="12"></uix-icon>
          </button>

          <button
            type="button"
            class="p-1 hover:bg-surface-light rounded-md text-default/50 hover:text-default transition-colors"
            @click=${this.close.bind(this)}
            title="Close (Esc)"
          >
            <uix-icon name="x" size="12"></uix-icon>
          </button>
        </div>

        ${this.mode==="replace"?p`
          <div class="flex items-center gap-1">
            <div class="w-[26px]"></div>

            <div class="relative flex-1">
              <input
                type="text"
                name="replace"
                placeholder="Replace"
                .value=${this.replaceQuery}
                @input=${e=>{this.replaceQuery=e.target.value}}
                class="w-full bg-surface border border-default/20 focus:border-primary rounded-md px-2 py-1 text-sm outline-none text-default placeholder-default/50"
              />
            </div>

            <button
              type="button"
              class="p-1 hover:bg-surface-light rounded-md text-default/50 hover:text-default transition-colors"
              @click=${this.replaceNext.bind(this)}
              title="Replace"
            >
              <uix-icon name="replace" size="12"></uix-icon>
            </button>

            <button
              type="button"
              class="p-1 hover:bg-surface-light rounded-md text-default/50 hover:text-default transition-colors"
              @click=${this.replaceAll.bind(this)}
              title="Replace All"
            >
              <uix-icon name="replace-all" size="12"></uix-icon>
            </button>

            <div class="w-[26px]"></div>
            <div class="w-[26px]"></div>
            <div class="w-[26px]"></div>
          </div>
        `:""}
      </div>
    `}}});var Nm,Vm=y(()=>{H();V();Se();Nm={tag:"ide-keybindings-settings",class:"flex flex-col h-full overflow-hidden",properties:{schemes:u.array({defaultValue:[]}),activeScheme:u.string({defaultValue:"default"}),commands:u.object({defaultValue:{}}),filterText:u.string({defaultValue:""})},connected(){let e=E();this.loadData(),this._unsub=e.subscribe("keybindingSchemeChanged",()=>this.loadData())},disconnected(){this._unsub&&this._unsub()},loadData(){let e=E();this.schemes=e.keybindings.getAvailableSchemes().map(t=>({id:t,...e.keybindings.getSchemeInfo(t)})),this.activeScheme=e.keybindings.getActiveScheme(),this.commands=e.getAllCommands()},setScheme(e){E().keybindings.setActiveScheme(e)},handleFilterInput(e){this.filterText=e.target.value.toLowerCase()},getBindingDisplay(e){return e?typeof e=="string"?e:e.key||"":""},getBindingWhen(e){return!e||typeof e=="string"?"":e.when||""},getSchemeKeybindings(){let e=E(),t=this.filterText,n=this.activeScheme;if(n==="default")return Object.values(this.commands).map(o=>{let a=e.keybindings.getEffectiveBinding(o.id);return a?{...o,binding:this.getBindingDisplay(a),when:this.getBindingWhen(a)}:null}).filter(o=>o?t?`${o.id} ${o.label||""} ${o.binding}`.toLowerCase().includes(t):!0:!1).sort((o,a)=>(o.label||o.id).localeCompare(a.label||a.id));let s=e.keybindings.schemes.get(n);if(!s)return[];let r=[];for(let[i,o]of s.keybindings){let a=this.commands[i],l={id:i,label:a?.label||i,category:a?.category||"",binding:this.getBindingDisplay(o),when:this.getBindingWhen(o)};t?`${l.id} ${l.label} ${l.binding}`.toLowerCase().includes(t)&&r.push(l):r.push(l)}return r.sort((i,o)=>(i.label||i.id).localeCompare(o.label||o.id))},render(){let e=this.getSchemeKeybindings(),t=this.activeScheme==="default";return p`
      <div class="p-6 overflow-auto flex-1">
        <h1 class="text-2xl font-bold mb-6">Keyboard Shortcuts</h1>

        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-3">Keybinding Scheme</h2>
          <div class="flex gap-2 flex-wrap">
            ${this.schemes.map(n=>p`
                <button
                  class="px-4 py-2 rounded-lg border transition-all ${this.activeScheme===n.id?"bg-primary text-inverse border-primary":"bg-surface hover:bg-surface-dark border-default/20"}"
                  @click=${()=>this.setScheme(n.id)}
                >
                  <div class="font-medium">${n.name}</div>
                  ${n.description?p`<div class="text-xs opacity-70">${n.description}</div>`:""}
                </button>
              `)}
          </div>
        </div>

        <div class="mb-4">
          <input
            type="text"
            class="w-full px-3 py-2 bg-surface border border-default/20 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Search keybindings..."
            .value=${this.filterText}
            @input=${n=>this.handleFilterInput(n)}
          />
        </div>

        ${t?"":p`<p class="mb-4 text-sm text-default/60">
              Showing ${e.length} keybindings defined by this scheme.
            </p>`}

        <div class="border border-default/20 rounded-lg overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-surface-dark">
              <tr>
                <th class="text-left px-4 py-3 font-semibold">Command</th>
                <th class="text-left px-4 py-3 font-semibold w-56">Keybinding</th>
                <th class="text-left px-4 py-3 font-semibold w-48">When</th>
              </tr>
            </thead>
            <tbody>
              ${e.map((n,s)=>p`
                  <tr class="${s%2===0?"bg-surface":"bg-surface-dark/30"} hover:bg-primary/10">
                    <td class="px-4 py-3">
                      <div class="font-medium">${n.label||n.id}</div>
                      <div class="text-xs text-default/50 font-mono">${n.id}</div>
                    </td>
                    <td class="px-4 py-3">
                      <kbd class="px-2 py-1 bg-surface-dark border border-default/20 rounded text-sm font-mono">${n.binding}</kbd>
                    </td>
                    <td class="px-4 py-3 text-sm text-default/60">
                      ${n.when||"\u2014"}
                    </td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>

        ${e.length===0?p`<div class="text-center py-8 text-default/50">
              ${this.filterText?`No keybindings found matching "${this.filterText}"`:t?"No keybindings defined":"This scheme has no keybindings defined"}
            </div>`:""}
      </div>
    `}}});var po,Bm=y(()=>{gt();Rn();Ks();po=rs(class extends is{constructor(){super(...arguments),this.key=ae}render(e,t){return this.key=e,t}update(e,[t,n]){return t!==this.key&&(ti(e),this.key=t),n}});});var Wl=y(()=>{Ks();Rn();gt();Bm()});var Wm,qm=y(()=>{H();Wl();Se();V();Wm={class:"flex flex-1",properties:{panels:u.array(),activePanelId:u.string(),resourceContents:u.object(),resourceModified:u.object(),activeResourceUri:u.string(),findWidgets:u.object({defaultValue:{}}),_tabActionsVersion:u.number({defaultValue:0})},connected(){let e=E();this.panels=e.panels||[],this.activePanelId=e.activePanelId,this.resourceContents=e.resourceContents||{},this.resourceModified=e.resourceModified||new Map,this.activeResourceUri=e.activeResourceUri,this.findWidgets=e.findWidgets||{},this._unsubs=[],this._unsubs.push(e.subscribe("panels",n=>{this.panels=n||[]})),this._unsubs.push(e.subscribe("activePanelId",n=>{this.activePanelId=n})),this._unsubs.push(e.subscribe("resourceContents",n=>{this.resourceContents=n||{}})),this._unsubs.push(e.subscribe("resourceModified",n=>{this.resourceModified=n||new Map})),this._unsubs.push(e.subscribe("activeResourceUri",n=>{this.activeResourceUri=n})),this._unsubs.push(e.subscribe("findWidgets",n=>{this.findWidgets=n||{}})),this._unsubs.push(e.subscribe("tabActions",()=>{this._tabActionsVersion++}));let t=document.querySelector("ide-context-menu");t&&t.remove()},disconnected(){this._unsubs?.forEach(t=>t());let e=document.querySelector("ide-context-menu");e&&e.remove()},showContextMenu(e,t,n={}){e.preventDefault(),e.stopPropagation();let s=E(),r=document.querySelector("ide-context-menu");r&&r.remove();let i=s.getContextMenuActions(t,n);if(i.length===0)return;let o=document.createElement("ide-context-menu");o.items=i,o.position={x:e.clientX,y:e.clientY},o.target=n,document.body.appendChild(o)},_onTabDrop({draggedId:e,index:t},n){let s=n.openResources.indexOf(e);if(s===-1||t===void 0||t===s)return;n.openResources.splice(s,1);let r=t>s?t-1:t;n.openResources.splice(Math.min(r,n.openResources.length),0,e);let i=E();i.setState("panels",[...i.panels])},_renderTabActions(e){let t=e.activeResourceUri;if(!t)return"";let n=E(),r=n.resourceProviders.getProviderForUri(t)?.getTabActions?.(t)||[],i=[];for(let[,a]of n.tabActions){let l=a.getState?a.getState(t,n):{};l.hidden||i.push({icon:l.icon||a.icon,label:l.label||a.label,command:a.command,args:l.args||a.args,solid:l.solid||!1,color:l.color||""})}let o=[...r,...i];return o.length?p`
      <div class="flex items-center gap-1 px-2 flex-shrink-0">
        ${o.map(a=>{let l=a.getState?a.getState(t,n):{};if(l.hidden)return"";let c=l.icon||a.icon,d=l.label||a.label,h=l.solid||a.solid||!1,f=l.color||a.color||"",m=l.args||a.args;return p`
            <uix-button ghost size="xs" title=${d}
              @click=${()=>n.executeCommand(a.command,m)}>
              <uix-icon name=${c} size="14" ?solid=${h} color=${f}></uix-icon>
            </uix-button>
          `})}
      </div>
    `:""},render(){let e=E();if(!this.panels||this.panels.length===0){let t=e.resourceTrees?.get("file");return t&&Object.keys(t).length>1?p`<div class="flex flex-1 items-center justify-center h-full text-default/30">
                <div class="text-center">
                    <div class="text-6xl mb-4">📝</div>
                    <div class="text-lg">Select a file to begin</div>
                </div>
            </div>`:p`<ide-welcome class="flex flex-1"></ide-welcome>`}return p`
            <div class="flex flex-grow w-full">
                ${this.panels.map((t,n)=>{let s=t.id===this.activePanelId;return p`
                        <div
                            class="flex flex-col flex-grow min-w-0 transition-all duration-150 ${s?"border-l-2 border-primary":"border-l-2 border-transparent"}"
                            style="flex-basis: ${100/this.panels.length}%"
                            @click=${()=>e.setActivePanel(t.id)}
                        >
                            <div class="flex items-center border-b bg-surface-dark border-surface flex-shrink-0">
                              <uix-droparea
                                  droparea-id="tab-bar:${t.id}"
                                  orderable
                                  direction="horizontal"
                                  .onDropped=${r=>this._onTabDrop(r,t)}
                                  class="flex overflow-x-auto flex-1 min-w-0"
                                  @contextmenu=${r=>this.showContextMenu(r,"editor/tab-bar",{panelId:t.id})}
                              >
                                  ${t.openResources.map(r=>{let i=e.resourceProviders.getProviderForUri(r);if(!i)return console.warn(`No provider for URI ${r} in tab bar.`),p`<div class="px-3 py-2 text-xs text-danger">Error</div>`;let o=i.getTabMetadata(r),a=this.resourceModified.get(r),l=r===t.activeResourceUri;return p`
                                      <uix-draggable dragged-id=${r}>
                                      <div
                                          @click=${c=>{c.stopPropagation(),e.handleTabSelect(r,t.id)}}
                                          @contextmenu=${c=>this.showContextMenu(c,"editor/tab",{uri:r,panelId:t.id})}
                                          class="flex items-center gap-2 px-3 py-2 cursor-pointer border-r min-w-max border-surface transition-colors duration-150 ease-in-out ${l?"bg-surface-dark text-default":"bg-surface-dark text-default/60 hover:bg-surface-light"}"
                                      >
                                          <uix-icon name=${o.icon||"file-text"} class="w-4 h-4"></uix-icon>
                                          <span class="text-sm">${o.label}</span>
                                          ${a?p`<div class="w-2 h-2 rounded-full ml-1 bg-primary"></div>`:""}
                                          <span
                                              @click=${c=>{c.stopPropagation(),e.handleTabClose(r,t.id)}}
                                              class="p-0.5 ml-1 rounded hover:bg-surface-light cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                                          >
                                              <uix-icon name="x" class="w-3 h-3"></uix-icon>
                                          </span>
                                      </div>
                                      </uix-draggable>
                                  `})}
                              </uix-droparea>
                              ${this._renderTabActions(t)}
                            </div>

                            ${t.openResources.map(r=>po(`${t.id}-${r}`,p`<ide-tab-content
                                    .activeUri=${r}
                                    .panelId=${t.id}
                                    style="display: ${r===t.activeResourceUri?"":"none"}"
                                ></ide-tab-content>`))}
                        </div>
                        ${n<this.panels.length-1?p`<uix-divider resizable vertical class="cursor-col-resize"></uix-divider>`:""}
                    `})}
            </div>
        `}}});var Hm,Ym=y(()=>{H();Se();V();Hm={properties:{standalone:u.boolean(),mobile:u.boolean({defaultValue:!1}),openMenuId:u.string(null),fileSearchQuery:u.string(""),fileSearchResults:u.array([]),selectedFileIndex:u.number(0),isFileSearchActive:u.boolean(!1),recentFiles:u.array([]),activeResourceUri:u.string(),menuItems:u.array({defaultValue:[],attribute:!1})},getQuickActions(){let e=E(),t=[{type:"action",icon:"file-plus",label:"New File",command:"files.newFile",hint:"Ctrl+N"},{type:"action",icon:"folder-open",label:"Open File...",command:"files.openFile",hint:"Ctrl+O"},{type:"action",icon:"folder",label:"Open Folder...",command:"files.openFolder"},{type:"action",icon:"terminal",label:"New Terminal",command:"core.terminal.new",hint:"Ctrl+`"},{type:"separator"},{type:"action",icon:"search",label:"Find in Files",command:"search.findInFiles",hint:"Ctrl+Shift+F"},{type:"action",icon:"settings",label:"Command Palette",command:"core.keybindings.selectScheme",hint:"Ctrl+Shift+P"}],n=this.getRecentFiles();return n.length>0&&(t.push({type:"separator"}),t.push({type:"header",label:"Recent Files"}),n.slice(0,5).forEach(s=>{t.push({type:"file",...s})})),t},getRecentFiles(){let t=E().panels||[],n=new Set,s=[];for(let r of t)for(let i of r.openResources||[])if(!n.has(i)&&i.startsWith("file://")){n.add(i);let o=i.replace("file://",""),a=o.split("/").pop(),l=o.substring(0,o.lastIndexOf("/"));s.push({uri:i,path:o,name:a,parent:l})}return s},renderQuickActions(){let e=this.getQuickActions(),t=0;return e.map(n=>{if(n.type==="separator")return p`<hr class="my-1 border-surface" />`;if(n.type==="header")return p`
          <div class="px-3 py-1.5 text-xs font-semibold text-default/50 uppercase">
            ${n.label}
          </div>
        `;let s=t++,r=this.selectedFileIndex===s;return n.type==="action"?p`
          <div
            @click=${()=>this.executeQuickAction(n)}
            class="flex items-center gap-2 px-3 py-1.5 cursor-pointer ${r?"bg-primary text-inverse":"text-default hover:bg-surface-light"}"
          >
            <uix-icon name=${n.icon} size="14" class="flex-shrink-0 ${r?"text-inverse":"text-secondary"}"></uix-icon>
            <div class="overflow-hidden text-ellipsis whitespace-nowrap text-sm">${n.label}</div>
            ${n.hint?p`
              <div class="ml-auto text-xs ${r?"text-inverse/70":"text-default/50"}">
                ${n.hint}
              </div>
            `:""}
          </div>
        `:n.type==="file"?p`
          <div
            @click=${()=>this.executeQuickAction(n)}
            class="flex items-center gap-2 px-3 py-1.5 cursor-pointer ${r?"bg-primary text-inverse":"text-default hover:bg-surface-light"}"
          >
            <uix-icon name="file-text" size="14" class="flex-shrink-0 ${r?"text-inverse":"text-secondary"}"></uix-icon>
            <div class="overflow-hidden text-ellipsis whitespace-nowrap text-sm">${n.name}</div>
            <div class="overflow-hidden text-ellipsis whitespace-nowrap ml-auto text-xs ${r?"text-inverse/70":"text-default/50"}">
              ${n.parent?n.parent.slice(1):""}
            </div>
          </div>
        `:""})},connected(){let e=E();if(this.openMenuId=null,this.activeResourceUri=e.activeResourceUri,this.menuItems=e.getMenuItems(e.activeResourceUri)||[],this._unsubUri=e.subscribe("activeResourceUri",t=>{this.activeResourceUri=t,this.menuItems=[...e.getMenuItems(t)||[]]}),this._unsubMenus=e.subscribe("menus",()=>{this.menuItems=[...e.getMenuItems(this.activeResourceUri)||[]]}),this._unsubReady=e.subscribe("ide:ready",()=>{this.menuItems=[...e.getMenuItems(this.activeResourceUri)||[]]}),this._handleClickOutside=t=>{this.contains(t.target)||this.closeOpenMenu()},setTimeout(()=>{document.addEventListener("click",this._handleClickOutside)},0),this.standalone&&typeof Eo<"u")try{window.electronAPI=Eo("electron").ipcRenderer}catch{console.warn("Not running in Electron environment")}this._unsubFocus=e.subscribe("workbench:focusFileSearch",()=>{console.log("[MenuBar] Received workbench:focusFileSearch event"),this.isFileSearchActive=!0,this.selectedFileIndex=0,this.closeOpenMenu(),console.log("[MenuBar] isFileSearchActive set to:",this.isFileSearchActive),queueMicrotask(()=>{let t=this.querySelector("#file-search-input");console.log("[MenuBar] Trying to focus input:",t),t?.focus()})})},disconnected(){this._unsubFocus&&this._unsubFocus(),this._unsubUri&&this._unsubUri(),this._unsubMenus&&this._unsubMenus(),this._unsubReady&&this._unsubReady(),document.removeEventListener("click",this._handleClickOutside)},toggleMenu(e){this.openMenuId===e?this.closeOpenMenu():(this.closeFileSearch(),this.openMenuId=e)},handleMenuHover(e){this.openMenuId&&this.openMenuId!==e&&(this.openMenuId=e)},closeOpenMenu(){this.openMenuId=null},handleCommand(e){this.closeOpenMenu(),E().executeCommand(e)},async handleFileSearch(e){let t=E();if(this.closeOpenMenu(),this.fileSearchQuery=e.target.value,this.fileSearchQuery){let n=await t.executeCommand("search.findFilesByName",{term:this.fileSearchQuery});this.fileSearchResults=n,this.selectedFileIndex=0}else this.fileSearchResults=[]},handleFileSearchKeyDown(e){let t=this.fileSearchQuery.length>0,n=t?this.fileSearchResults:this.getQuickActions().filter(r=>r.type!=="separator"&&r.type!=="header"),s=n.length;if(e.key==="Escape"){this.closeFileSearch();return}if(s){if(e.key==="ArrowDown")e.preventDefault(),this.selectedFileIndex=(this.selectedFileIndex+1)%s;else if(e.key==="ArrowUp")e.preventDefault(),this.selectedFileIndex=(this.selectedFileIndex-1+s)%s;else if(e.key==="Enter"){e.preventDefault();let r=n[this.selectedFileIndex];r&&(t?this.openSearchResult(r):this.executeQuickAction(r))}}},executeQuickAction(e){let t=E();e.type==="action"&&e.command?(t.executeCommand(e.command),this.closeFileSearch()):e.type==="file"&&e.uri&&(t.openResource(e.uri),this.closeFileSearch())},openSearchResult(e){E().openResource(`file://${e.path}`),this.closeFileSearch()},closeFileSearch(){this.fileSearchQuery="",this.fileSearchResults=[],this.selectedFileIndex=0,this.isFileSearchActive=!1,this.querySelector("#file-search-input")?.blur()},blurFileSearch(){setTimeout(()=>{this.isFileSearchActive=!1,this.openMenuId},200)},focusFileSearch(){this.isFileSearchActive=!0,this.selectedFileIndex=0,this.closeOpenMenu(),setTimeout(()=>this.querySelector("#file-search-input")?.focus(),0)},handleMinimize(){window.electronAPI&&window.electronAPI.minimizeWindow()},handleMaximize(){window.electronAPI&&window.electronAPI.maximizeWindow()},handleClose(){window.electronAPI&&window.electronAPI.closeWindow()},_renderMobile(){let e=globalThis.$APP?.manifest?.name||"App";return p`
      <div
        class="flex items-center justify-between w-full h-12 bg-surface-light border-b border-surface px-3 text-default"
        @click=${t=>t.stopPropagation()}
      >
        <button
          class="flex items-center justify-center w-10 h-10 rounded-md bg-transparent border-none cursor-pointer text-default hover:bg-surface-lighter"
          @click=${()=>{let t=E();t.commandPaletteOpen=!0,t.publish("commandPaletteOpen",!0)}}
        >
          <uix-icon name="search" size="18"></uix-icon>
        </button>

        <div class="flex items-center gap-2">
          <uix-icon name="rocket" size="16" class="text-primary"></uix-icon>
          <span class="font-medium text-sm">${e}</span>
        </div>

        <button
          class="flex items-center justify-center w-10 h-10 rounded-md bg-transparent border-none cursor-pointer text-default hover:bg-surface-lighter"
          @click=${()=>this.emit("toggle-assistant")}
        >
          <uix-icon name="bot" size="18"></uix-icon>
        </button>
      </div>
    `},render(){if(this.mobile)return this._renderMobile();let e=E();return p`
        <div
          class="flex items-center justify-between w-full h-10 bg-surface-light border-b border-surface px-2 text-default ${this.standalone?"select-none":""}"
          @click=${t=>t.stopPropagation()}
        >
          <div class="flex items-center gap-2 pl-1">
            <!-- Brand: Rocket Icon -->
            <div class="flex items-center justify-center text-primary">
              <uix-icon name="rocket" size="md"></uix-icon>
            </div>

            <!-- Start: Menu Items -->
            <div class="flex items-center gap-1">
              ${this.menuItems.map(t=>p`
                  <div class="relative">
                      <button
                        class="px-3 py-1 text-sm rounded-md hover:bg-surface-light text-default transition-colors ${this.openMenuId===t?"bg-surface-light":""}"
                        @click=${()=>this.toggleMenu(t)}
                        @mouseenter=${()=>this.handleMenuHover(t)}
                      >
                        ${t}
                      </button>

                      ${this.openMenuId===t?p`
                          <div class="absolute top-full left-0 mt-1 min-w-[240px] bg-surface-dark border border-surface rounded-md shadow-xl z-50 py-1">
                            ${(e.getMenus()[t]||[]).map(n=>n.separator?p`<hr class="my-1 border-surface" />`:p`
                                  <div
                                    @click=${s=>{s.preventDefault(),this.handleCommand(n.command)}}
                                    class="flex items-center justify-between w-full px-4 py-1.5 text-sm text-left hover:bg-surface-light text-default transition-colors cursor-pointer"
                                  >
                                    <span>${n.label}</span>
                                    ${n.keybinding?p`<span class="text-xs text-default/50 ml-4">${n.keybinding}</span>`:""}
                                  </div>
                                `)}
                          </div>
                      `:""}
                  </div>
                `)}
            </div>
          </div>

          <!-- Center: File Search -->
          <div class="flex justify-center flex-1 relative px-4">
            <div class="relative w-96">
              <div
                class="flex items-center w-full h-8 rounded-md px-3 transition-all duration-200 border ${this.isFileSearchActive?"bg-surface-light border-primary justify-start cursor-text":"bg-surface-lighter border-surface justify-center cursor-pointer hover:border-primary/50"}"
                @click=${()=>!this.isFileSearchActive&&this.focusFileSearch()}
              >
                <div class="transition-all duration-200 flex items-center w-full ${this.isFileSearchActive?"opacity-100":"opacity-0 w-0 overflow-hidden"}">
                  <uix-icon name="search" size="14" class="text-default/50 mr-2 flex-shrink-0"></uix-icon>
                  <input
                    id="file-search-input"
                    type="text"
                    placeholder="Go to File..."
                    class="bg-transparent outline-none flex-grow text-sm text-default placeholder-default/30 border-none h-full w-full"
                    .value=${this.fileSearchQuery}
                    @input=${this.handleFileSearch.bind(this)}
                    @keydown=${this.handleFileSearchKeyDown.bind(this)}
                    @blur=${this.blurFileSearch.bind(this)}
                  />
                </div>

                ${this.isFileSearchActive?"":p`
                    <div class="text-sm tracking-wide text-default/50 absolute pointer-events-none flex items-center gap-2">
                        <uix-icon name="search" size="14"></uix-icon>
                        <span>${globalThis.$APP?.manifest?.name||"Search"}</span>
                    </div>
                `}
              </div>

              <!-- Search Results / Quick Actions Dropdown -->
              ${this.isFileSearchActive?p`
                    <div class="absolute top-full left-0 right-0 mt-1 rounded-md shadow-xl max-h-96 overflow-y-auto py-1 bg-surface-dark border border-surface z-50">
                      ${this.fileSearchQuery?this.fileSearchResults.map((t,n)=>p`
                              <div
                                @click=${()=>this.openSearchResult(t)}
                                class="flex items-center gap-2 px-3 py-1.5 cursor-pointer ${this.selectedFileIndex===n?"bg-primary text-inverse":"text-default hover:bg-surface-light"}"
                              >
                                <uix-icon name="file-text" size="14" class="flex-shrink-0 ${this.selectedFileIndex===n?"text-inverse":"text-secondary"}"></uix-icon>
                                <div class="overflow-hidden text-ellipsis whitespace-nowrap text-sm">${t.name}</div>
                                <div
                                  class="overflow-hidden text-ellipsis whitespace-nowrap ml-auto text-xs ${this.selectedFileIndex===n?"text-inverse/70":"text-default/50"}"
                                >
                                  ${t.parent?t.parent.slice(1):""}
                                </div>
                              </div>
                            `):this.renderQuickActions()}
                    </div>
                  `:""}
            </div>
          </div>

          <!-- End: Drag Region and Window Controls -->
          <div class="flex items-center gap-2 justify-end">
            ${this.standalone?p`<div style="-webkit-app-region: drag;" class="flex-1 w-8 pointer-events-none"></div>`:""}
            ${this.standalone?p`
                <div class="flex items-center gap-1 flex-shrink-0 pl-2 border-l border-surface">
                  <button
                    @click=${this.handleMinimize.bind(this)}
                    class="w-8 h-8 pb-1 flex items-end justify-center rounded-md cursor-pointer bg-transparent transition-colors duration-150 border-none text-default hover:bg-surface-light"
                    title="Minimize"
                  >
                    <uix-icon name="minus" size="16"></uix-icon>
                  </button>
                  <button
                    @click=${this.handleMaximize.bind(this)}
                    class="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer bg-transparent transition-colors duration-150 border-none text-default hover:bg-surface-light"
                    title="Maximize"
                  >
                    <uix-icon name="square" size="12"></uix-icon>
                  </button>
                  <button
                    @click=${this.handleClose.bind(this)}
                    class="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer bg-transparent transition-colors duration-150 border-none text-default hover:bg-danger hover:text-white"
                    title="Close"
                  >
                    <uix-icon name="x" size="16"></uix-icon>
                  </button>
                </div>
              `:null}
          </div>
        </div>
    `}}});var Qm,Km=y(async()=>{Se();await Ut();V();H();Qm={tag:"ide-mobile-nav",properties:{currentRoute:u.object({sync:Fe}),activityBarItems:u.object()},connected(){let e=E();this.activityBarItems=e.getActivityBarItems();let t=e.subscribe("activityBarPlugins",n=>{this.activityBarItems=n});this._unsub=t},disconnected(){this._unsub?.()},_isActive(e){let t=this.currentRoute?.path||"/",s=E().basePath||"";return t===s+e.route},_handleClick(e){if(e.route)if(this._isActive(e))this.emit("toggle-sheet");else{let n=E().basePath||"";Fe.go(n+e.route)}},render(){let{top:e=[],bottom:t=[]}=this.activityBarItems||{},n=[...e,...t];return p`
      <div class="flex items-center justify-around w-full bg-surface-light flex-shrink-0"
           style="min-height: 52px;">
        ${n.map(s=>p`
            <button
              class="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 border-none bg-transparent cursor-pointer transition-colors ${this._isActive(s)?"text-primary border-t-2 border-primary":"text-default opacity-60 border-t-2 border-transparent"}"
              @click=${()=>this._handleClick(s)}
            >
              <uix-icon name=${s.icon} size="20"></uix-icon>
              <span class="text-[10px] leading-tight">${s.title}</span>
            </button>
          `)}
      </div>
    `}}});var Gm,Jm=y(()=>{V();H();Se();Gm={properties:{request:u.object(),inputValue:u.string("")},connected(){this.inputValue=this.request?.options?.value||"",setTimeout(()=>this.querySelector("input")?.focus(),50),this._handleKeydown=this.handleKeydown.bind(this),window.addEventListener("keydown",this._handleKeydown)},disconnected(){window.removeEventListener("keydown",this._handleKeydown)},handleKeydown(e){let t=E();e.key==="Escape"?(e.preventDefault(),this.handleCancel()):e.key==="Enter"&&(e.preventDefault(),this.request.type==="confirm"?t.resolveModal({id:this.request.id,value:!0}):this.handleConfirm())},handleConfirm(){E().resolveModal({id:this.request.id,value:this.inputValue})},handleCancel(){E().resolveModal({id:this.request.id,cancelled:!0})},render(){let{options:e,type:t}=this.request,n=E();return t==="confirm"?p`
            <uix-modal open size="sm">
                <div slot="header">${e.title||"Confirm"}</div>
                <uix-text size="sm" class="text-default/70">${e.prompt}</uix-text>
                <div slot="footer">
                    <uix-button variant="secondary" @click=${()=>n.resolveModal({id:this.request.id,value:!1})}>
                        Cancel
                    </uix-button>
                    <uix-button variant="${e.isDestructive?"danger":"success"}" @click=${()=>n.resolveModal({id:this.request.id,value:!0})}>
                        ${e.confirmLabel||"OK"}
                    </uix-button>
                </div>
            </uix-modal>
        `:t==="inputBox"?p`
            <uix-modal open size="sm">
                <div slot="header">${e.title||"Input"}</div>
                <uix-flex direction="column" gap="lg">
                    <uix-text size="sm" class="text-default/70">${e.prompt||"Enter a value:"}</uix-text>
                    <uix-input
                        type="text"
                        size="sm"
                        placeholder=${e.placeholder||""}
                        .value=${this.inputValue}
                        @input=${s=>{this.inputValue=s.target.value}}
                    ></uix-input>
                </uix-flex>
                <div slot="footer">
                    <uix-button variant="secondary" @click=${this.handleCancel.bind(this)}>
                        Cancel
                    </uix-button>
                    <uix-button variant="success" @click=${this.handleConfirm.bind(this)}>
                        OK
                    </uix-button>
                </div>
            </uix-modal>
        `:""}}});var Xm,Zm=y(()=>{H();Se();V();Xm={tag:"ide-new-project",properties:{uri:u.string(),content:u.object(),projectName:u.string("my-new-project"),projectDescription:u.string(""),projectPath:u.string(""),selectedStarters:u.array([]),isLoading:u.boolean(!1)},availableStarters:[{id:"mobile",name:"Mobile App",icon:"smartphone",description:"A native-like mobile application."},{id:"website",name:"Website",icon:"globe",description:"A static or dynamic website."},{id:"webapp",name:"Web App",icon:"layout-grid",description:"A single-page application (SPA)."},{id:"desktop",name:"Desktop App",icon:"monitor",description:"A cross-platform desktop app."},{id:"tasks",name:"Task Manager",icon:"square-check",description:"A simple productivity tool."}],async connected(){try{this.projectPath=await E().executeCommand("project.getDefaultPath")||"/users/me/projects/"}catch(e){console.warn("Could not get default project path.",e),this.projectPath="/users/me/projects/"}},handleStarterClick(e){let t=this.selectedStarters.indexOf(e);t>-1?this.selectedStarters.splice(t,1):this.selectedStarters.push(e),this.selectedStarters=[...this.selectedStarters]},async handleBrowsePath(){try{let e=await E().executeCommand("ui.showOpenDialog",{title:"Select Project Location",properties:["openDirectory","createDirectory"]});e&&(this.projectPath=e)}catch(e){console.error("Failed to show open dialog:",e),E().showMessage("Failed to open path selector.","error")}},async handleCreateProject(){if(!this.projectName){E().showMessage("Please enter a project name.","error");return}this.isLoading=!0;try{await E().executeCommand("project.create",{name:this.projectName,path:this.projectPath,starters:this.selectedStarters}),E().showMessage(`Project "${this.projectName}" created successfully!`,"success"),E().executeCommand("core.editor.closeActiveEditor")}catch(e){console.error("Failed to create project:",e),E().showMessage(`Failed to create project: ${e.message||"Unknown error"}`,"error")}finally{this.isLoading=!1}},render(){return p`
            <div class="h-full p-6 sm:p-8 overflow-y-auto font-sans bg-inverse-dark text-default">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-3xl font-bold mb-2 text-default">Create New Project</h1>
                    <p class="text-base mb-6 text-default/70">Start a new project from scratch or by selecting one or more starters.</p>

                    <div class="mb-6 p-4 rounded-lg border space-y-4 bg-inverse border-surface">
                        <div>
                            <label class="block text-sm font-medium mb-1 text-default/70">Project Name</label>
                            <uix-input
                                type="text"
                                size="sm"
                                .value=${this.projectName}
                                @input=${e=>{this.projectName=e.target.value}}
                                placeholder="my-awesome-project"
                            ></uix-input>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1 text-default/70">Location</label>
                            <div class="flex gap-2">
                                <uix-input
                                    type="text"
                                    size="sm"
                                    readonly
                                    .value=${this.projectPath+this.projectName}
                                    class="flex-1"
                                ></uix-input>
                                <uix-button
                                    variant="secondary"
                                    size="sm"
                                    @click=${this.handleBrowsePath.bind(this)}
                                >
                                    Browse...
                                </uix-button>
                            </div>
                        </div>
                                                <div>
                            <label class="block text-sm font-medium mb-1 text-default/70">Project Description</label>
                            <uix-input
                                type="text"
                                size="sm"
                                .value=${this.projectDescription}
                                @input=${e=>{this.projectDescription=e.target.value}}
                                placeholder="Describe your project..."
                            ></uix-input>
                        </div>
                    </div>

                    <div class="mb-6">
                        <h2 class="text-xl font-semibold pb-2 mb-4 text-default">
                            Select Starters
                            <span class="text-sm font-normal text-default/50">(Optional, select one or more)</span>
                        </h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${this.availableStarters.map(e=>{let t=this.selectedStarters.includes(e.id);return p`
                                    <div
                                        @click=${()=>this.handleStarterClick(e.id)}
                                        class="p-4 rounded-lg border-2 transition-colors cursor-pointer ${t?"bg-primary/10 border-primary":"bg-inverse border-surface hover:border-inverse-lighter"}"
                                    >
                                        <div class="flex items-center gap-3 mb-2">
                                            <uix-icon name=${e.icon} class="w-6 h-6 ${t?"text-primary":"text-secondary"}"></uix-icon>
                                            <span class="font-semibold ${t?"text-default":"text-default/80"}">${e.name}</span>
                                        </div>
                                        <p class="text-xs text-default/60">${e.description}</p>
                                    </div>
                                `})}
                            <div class="p-4 rounded-lg border-2 border-dashed flex items-center justify-center opacity-70 cursor-not-allowed bg-inverse border-surface text-default/50">
                                <div class="text-center">
                                    <uix-icon name="plus" class="w-6 h-6 mx-auto mb-1"></uix-icon>
                                    <span class="text-xs">Add your own...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 pt-4 border-t border-surface">
                        <uix-button
                            variant="secondary"
                            @click=${()=>E().executeCommand("core.editor.closeActiveEditor")}
                        >
                            Cancel
                        </uix-button>
                        <uix-button
                            variant="primary"
                            ?disabled=${this.isLoading||!this.projectName}
                            @click=${this.handleCreateProject.bind(this)}
                        >
                            ${this.isLoading?p`<uix-icon name="loader" class="w-4 h-4 animate-spin"></uix-icon>`:"Create Project"}
                        </uix-button>
                    </div>

                </div>
            </div>
        `}}});var eg,tg=y(()=>{H();V();Se();eg={properties:{activeRightActivity:u.string(),rightActivityBarItems:u.array([])},connected(){let e=E();this.updateItems(),this.activeRightActivity=e.activeRightActivity,this._unsub=e.subscribe("rightActivityBarPlugins",()=>{this.updateItems()}),this._unsubActive=e.subscribe("activeRightActivity",t=>{this.activeRightActivity=t})},disconnected(){this._unsub&&this._unsub(),this._unsubActive&&this._unsubActive()},updateItems(){this.rightActivityBarItems=E().getRightActivityBarItems()},render(){let e=E();return p`
            <div class="flex flex-col items-center w-12 py-2 h-full border-l bg-surface-dark border-surface" style="--nav-item-color: var(--color-inverse-lighter); --nav-item-hover-color: var(--text-color); --nav-item-indicator-color: var(--color-primary);">
                ${this.rightActivityBarItems.map(t=>{let n=this.activeRightActivity===t.id;return p`
                        <uix-nav-item
                            icon=${t.icon}
                            label=${t.title}
                            ?active=${n}
                            iconOnly
                            indicatorPosition="right"
                            @nav-item-click=${()=>e.handleRightActivityChange(t.id)}
                            class="${n?"text-primary":"text-inverse-lighter"}"
                        ></uix-nav-item>
                    `})}
            </div>
        `}}});var ng,sg=y(()=>{H();ng={render(){return p`
      <div class="flex flex-col w-full h-full border-l overflow-y-auto bg-surface-dark text-default border-surface">
        <div class="flex flex-col items-center justify-center h-full text-default/30">
          <div class="text-center">
            <div class="text-4xl mb-2">📋</div>
            <div class="text-sm">No context available</div>
          </div>
        </div>
      </div>
    `}}});var rg,ig=y(()=>{V();H();Se();rg={properties:{searchQuery:u.string(""),replaceQuery:u.string(""),searchResults:u.object(null),isSearching:u.boolean(!1),showReplace:u.boolean(!1),matchCase:u.boolean(!1),wholeWord:u.boolean(!1)},connected(){let e=E();this.unsubSetQuery=e.subscribe("search:setQuery",t=>{this.searchQuery=t}),this.unsubStart=e.subscribe("search:start",()=>{this.isSearching=!0,this.searchResults=null}),this.unsubDone=e.subscribe("search:done",t=>{this.isSearching=!1,this.searchResults=t})},disconnected(){this.unsubSetQuery&&this.unsubSetQuery(),this.unsubStart&&this.unsubStart(),this.unsubDone&&this.unsubDone()},runSearch(){this.searchQuery&&E().executeCommand("search.doSearch",{term:this.searchQuery,options:{matchCase:this.matchCase,wholeWord:this.wholeWord}})},runReplaceAll(){E().executeCommand("search.replaceAll",{term:this.searchQuery,replaceTerm:this.replaceQuery,options:{matchCase:this.matchCase,wholeWord:this.wholeWord}})},render(){let e=E(),t=this.searchResults&&Object.keys(this.searchResults).length>0;return p`
      <div class="flex flex-col h-full text-sm bg-surface-dark text-default">
        <div
          class="flex items-center justify-between p-2 font-semibold uppercase text-xs tracking-wider text-default/50 border-b border-surface"
        >
          <span>Search</span>
        </div>
        <div class="px-2 py-2 flex flex-col gap-2">
          <div class="relative">
            <input
              type="text"
              placeholder="Search"
              .value=${this.searchQuery}
              @input=${n=>{this.searchQuery=n.target.value}}
              @keydown=${n=>n.key==="Enter"&&this.runSearch()}
              class="w-full bg-surface border border-default/20 rounded-md pl-2 pr-24 py-1 text-sm outline-none text-default placeholder-default/50 focus:border-primary"
            />
            <div
              class="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5"
            >
              <button
                type="button"
                @click=${()=>{this.matchCase=!this.matchCase,this.runSearch()}}
                class="p-0.5 text-xs rounded-md transition-colors ${this.matchCase?"bg-primary-lighter text-primary-darker":"bg-transparent text-default/30 hover:text-default"}"
                title="Match Case"
              >
                Aa
              </button>
              <button
                type="button"
                @click=${()=>{this.wholeWord=!this.wholeWord,this.runSearch()}}
                class="p-0.5 text-xs rounded-md transition-colors ${this.wholeWord?"bg-primary-lighter text-primary-darker":"bg-transparent text-default/30 hover:text-default"}"
                title="Match Whole Word"
              >
                ab
              </button>
              <button
                type="button"
                class="p-0.5 text-xs rounded-md opacity-50 cursor-not-allowed text-default/30"
                title="Use Regular Expression (coming soon)"
              >
                .*
              </button>
            </div>
          </div>

          <div class="relative">
            <input
              type="text"
              placeholder="Replace"
              .value=${this.replaceQuery}
              @input=${n=>{this.replaceQuery=n.target.value}}
              class="w-full bg-surface border border-default/20 rounded-md pl-2 pr-8 py-1 text-sm outline-none text-default placeholder-default/50 focus:border-primary"
            />
            <button
              type="button"
              @click=${this.runReplaceAll.bind(this)}
              class="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-default/50 hover:text-default rounded-md transition-colors"
              title="Replace All"
            >
              <uix-icon name="replace-all" size="16"></uix-icon>
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-2 mt-2">
          ${this.isSearching?p`<div class="text-xs text-default/50 pl-2">Searching...</div>`:""}
          ${this.searchResults?t?Object.entries(this.searchResults).map(([n,s])=>{let r=n.includes("://")?n:`file://${n}`,i=n.includes("://")?e.resourceProviders.getProviderForUri(n)?.getTabMetadata(n)?.label||n:n.slice(1);return p`
                    <div class="mb-4">
                      <span
                        class="block text-xs font-semibold text-primary mb-0.5 cursor-pointer hover:underline"
                        @click=${()=>e.openResource(r)}
                      >
                        ${i}
                      </span>
                      ${s.map(o=>p`
                          <div
                            @click=${()=>e.executeCommand("core.editor.openAndGoToLine",{uri:r,line:o.line})}
                            class="cursor-pointer rounded-md p-0.5 text-xs text-default/70 hover:text-default hover:bg-surface-light"
                          >
                            <span class="text-default/30 mr-2">${o.line}:</span>
                            <span>${o.content}</span>
                          </div>
                        `)}
                    </div>
                  `}):p`<div class="text-xs text-default/50 pl-2">No results found for "${this.searchQuery}".</div>`:""}
        </div>
      </div>
    `}}});var og,ag=y(()=>{H();Se();Ln();hs();V();og={tag:"ide-settings",class:"flex flex-col h-full overflow-y-auto",properties:{appName:u.string({defaultValue:""}),devMode:u.boolean({defaultValue:!1}),typeDispatch:u.boolean({defaultValue:!1}),typeDispatchEnrich:u.boolean({defaultValue:!1}),reloadRequired:u.boolean({defaultValue:!1}),directorySupported:u.boolean({defaultValue:!1}),directoryName:u.string({defaultValue:""}),pendingReconnect:u.object({attribute:!1})},async connected(){this.appName=globalThis.$APP?.manifest?.name||"IDE",this.devMode=!!Je("devMode"),this.typeDispatch=!!Je("typeDispatch"),this.typeDispatchEnrich=!!Je("typeDispatchEnrich"),this.directorySupported=Ht();let e=E();this.pendingReconnect=e.pendingDirectoryReconnect||null,this.directorySupported&&!this.pendingReconnect?this.directoryName=await ds()||"":this.directoryName="",this._unsubReconnect=e.subscribe("pendingDirectoryReconnect",async t=>{this.pendingReconnect=t||null,this.directorySupported&&!this.pendingReconnect?this.directoryName=await ds()||"":this.directoryName=""})},disconnected(){this._unsubReconnect&&this._unsubReconnect()},async reconnectFolder(){await E().executeCommand("files.reconnectDirectory")},toggleDevMode(e){cs("devMode",e),this.devMode=e,this.reloadRequired=!0},toggleTypeDispatch(e){cs("typeDispatch",e),this.typeDispatch=e},toggleTypeDispatchEnrich(e){cs("typeDispatchEnrich",e),this.typeDispatchEnrich=e},async connectFolder(){try{let e=await ln();this.directoryName=e.name,await E().executeCommand("files.setBacking",{kind:"directory",handle:e})}catch(e){e.name!=="AbortError"&&console.error("[ide-settings] Connect folder failed:",e)}},async disconnectFolder(){await Ci(),this.directoryName="",await E().executeCommand("files.setBacking",{kind:"sw"})},render(){let e=E();return p`
      <div class="p-6 max-w-3xl mx-auto w-full">
        <uix-heading level="2" class="mb-6">Settings</uix-heading>

        <!-- General -->
        <uix-card class="mb-4">
          <div slot="header">
            <uix-flex align="center" gap="sm">
              <uix-icon name="info" size="14"></uix-icon>
              <uix-text weight="medium">About</uix-text>
            </uix-flex>
          </div>
          <div class="p-4">
            <uix-flex direction="column" gap="sm">
              <uix-flex align="center" justify="between">
                <uix-text muted>Application</uix-text>
                <uix-text>${this.appName}</uix-text>
              </uix-flex>
              <uix-flex align="center" justify="between">
                <uix-text muted>Platform</uix-text>
                <uix-text>${window.electronAPI?"Desktop":"Web"}</uix-text>
              </uix-flex>
            </uix-flex>
          </div>
        </uix-card>

        <!-- Keyboard Shortcuts -->
        <uix-card class="mb-4">
          <div slot="header">
            <uix-flex align="center" justify="between">
              <uix-flex align="center" gap="sm">
                <uix-icon name="keyboard" size="14"></uix-icon>
                <uix-text weight="medium">Keyboard Shortcuts</uix-text>
              </uix-flex>
              <uix-button size="xs" ghost @click=${()=>e.openResource("settings://keybindings")}>
                Configure
              </uix-button>
            </uix-flex>
          </div>
          <div class="p-4">
            <uix-text size="sm" muted>Customize keyboard shortcuts and keybinding schemes.</uix-text>
          </div>
        </uix-card>

        <!-- Appearance -->
        <uix-card class="mb-4">
          <div slot="header">
            <uix-flex align="center" gap="sm">
              <uix-icon name="palette" size="14"></uix-icon>
              <uix-text weight="medium">Appearance</uix-text>
            </uix-flex>
          </div>
          <div class="p-4">
            <uix-flex align="center" justify="between">
              <uix-text size="sm">Dark Mode</uix-text>
              <uix-darkmode></uix-darkmode>
            </uix-flex>
          </div>
        </uix-card>

        <!-- Developer -->
        <uix-card class="mb-4">
          <div slot="header">
            <uix-flex align="center" gap="sm">
              <uix-icon name="code" size="14"></uix-icon>
              <uix-text weight="medium">Developer</uix-text>
            </uix-flex>
          </div>
          <div class="p-4">
            <uix-flex direction="column" gap="sm">
              <uix-flex align="center" justify="between">
                <uix-flex direction="column" gap="xs">
                  <uix-text size="sm">Developer Mode</uix-text>
                  <uix-text size="xs" muted>
                    Enables the Files explorer and other developer tools.
                  </uix-text>
                </uix-flex>
                <uix-switch
                  ?checked=${this.devMode}
                  @change=${t=>this.toggleDevMode(t.target.checked)}
                ></uix-switch>
              </uix-flex>
              <uix-flex align="center" justify="between" class="mt-2">
                <uix-flex direction="column" gap="xs">
                  <uix-text size="sm">Open markdown by frontmatter type</uix-text>
                  <uix-text size="xs" muted>
                    When on, .md files in content/ open in the matching extension view (notes, tasks, …).
                  </uix-text>
                </uix-flex>
                <uix-switch
                  ?checked=${this.typeDispatch}
                  @change=${t=>this.toggleTypeDispatch(t.target.checked)}
                ></uix-switch>
              </uix-flex>
              ${this.typeDispatch?p`
                    <uix-flex align="center" justify="between" class="mt-2 pl-4">
                      <uix-flex direction="column" gap="xs">
                        <uix-text size="sm">Enrich explorer with type info</uix-text>
                        <uix-text size="xs" muted>
                          Show type icons and frontmatter titles for .md files in the file tree.
                        </uix-text>
                      </uix-flex>
                      <uix-switch
                        ?checked=${this.typeDispatchEnrich}
                        @change=${t=>this.toggleTypeDispatchEnrich(t.target.checked)}
                      ></uix-switch>
                    </uix-flex>
                  `:""}
              ${this.directorySupported?p`
                      <uix-flex align="center" justify="between" class="mt-2">
                        <uix-flex direction="column" gap="xs">
                          <uix-text size="sm">Workspace Folder</uix-text>
                          <uix-text size="xs" muted>
                            ${this.pendingReconnect?.name?p`Permission lost on reload — reconnect to restore <span class="text-default">${this.pendingReconnect.name}</span>.`:this.directoryName?p`Connected to <span class="text-default">${this.directoryName}</span>`:"Connect a local folder to read and write files on disk."}
                          </uix-text>
                        </uix-flex>
                        ${this.pendingReconnect?.name?p`
                                <uix-button
                                  size="xs"
                                  variant="primary"
                                  @click=${()=>this.reconnectFolder()}
                                >
                                  Reconnect to ${this.pendingReconnect.name}
                                </uix-button>
                              `:this.directoryName?p`
                                  <uix-button
                                    size="xs"
                                    ghost
                                    @click=${()=>this.disconnectFolder()}
                                  >
                                    Disconnect
                                  </uix-button>
                                `:p`
                                  <uix-button
                                    size="xs"
                                    variant="primary"
                                    @click=${()=>this.connectFolder()}
                                  >
                                    Connect Folder
                                  </uix-button>
                                `}
                      </uix-flex>
                    `:""}
              ${this.reloadRequired?p`
                      <uix-flex
                        align="center"
                        justify="between"
                        class="mt-2 p-3 bg-warning/10 rounded border border-warning/30"
                      >
                        <uix-text size="xs">
                          Reload required for this change to take effect.
                        </uix-text>
                        <uix-button
                          size="xs"
                          variant="primary"
                          @click=${()=>location.reload()}
                        >
                          Reload
                        </uix-button>
                      </uix-flex>
                    `:""}
            </uix-flex>
          </div>
        </uix-card>
      </div>
    `}}});var lg,cg=y(()=>{H();lg={tag:"ide-sidebar",render(){return p`
      <div class="flex flex-col w-full h-full border-r overflow-y-auto text-default border-surface">
        <router-ui></router-ui>
      </div>
    `}}});var ug,dg=y(()=>{H();Se();V();ug={properties:{activeResourceUri:u.string(),cursorLine:u.number({defaultValue:1}),cursorColumn:u.number({defaultValue:1}),gitBranch:u.string({defaultValue:""}),gitHasChanges:u.boolean({defaultValue:!1}),isGitRepo:u.boolean({defaultValue:!1}),errorCount:u.number({defaultValue:0}),warningCount:u.number({defaultValue:0}),indentStyle:u.string({defaultValue:"space"}),indentSize:u.number({defaultValue:2}),keybindingSequence:u.string({defaultValue:null}),activeKeybindingScheme:u.string({defaultValue:"default"}),pluginItems:u.object({attribute:!1,defaultValue:new Map})},async fetchGitInfo(){if(!window.electronAPI?.git){this.isGitRepo=!1;return}let e=await window.electronAPI.git.getBranch();if(e){this.gitBranch=e,this.isGitRepo=!0;let t=await window.electronAPI.git.getStatus();this.gitHasChanges=t?.hasChanges??!1}else this.isGitRepo=!1,this.gitBranch="",this.gitHasChanges=!1},connected(){let e=E();this.activeResourceUri=e.activeResourceUri,this._unsubs=[],this._unsubs.push(e.subscribe("activeResourceUri",n=>{this.activeResourceUri=n,this.cursorLine=1,this.cursorColumn=1})),this._unsubs.push(e.subscribe("editor:cursor",({uri:n,line:s,column:r})=>{n===this.activeResourceUri&&(this.cursorLine=s,this.cursorColumn=r)})),this._unsubs.push(e.subscribe("resource:save",()=>{this.fetchGitInfo()})),this._unsubs.push(e.subscribe("diagnosticsChanged",({errors:n,warnings:s})=>{this.errorCount=n,this.warningCount=s})),this._unsubs.push(e.subscribe("editorSettingsChanged",({indentStyle:n,indentSize:s})=>{this.indentStyle=n,this.indentSize=s})),this._unsubs.push(e.subscribe("keybindingSequence",n=>{this.keybindingSequence=n})),this._unsubs.push(e.subscribe("keybindingSchemeChanged",n=>{this.activeKeybindingScheme=n})),this.activeKeybindingScheme=e.keybindings.getActiveScheme();let t=e.getEditorSettings();this.indentStyle=t.indentStyle,this.indentSize=t.indentSize,this.fetchGitInfo(),this._gitPollInterval=setInterval(()=>this.fetchGitInfo(),5e3),this._unsubs.push(e.subscribe("statusBar",n=>{this.pluginItems=new Map(n)})),this.pluginItems=new Map(e.statusBarItems)},async handleIndentClick(){let e=E(),t=[{label:"Spaces: 2",value:{style:"space",size:2}},{label:"Spaces: 4",value:{style:"space",size:4}},{label:"Tabs",value:{style:"tab",size:4}}],n=await e.showQuickPick(t,{title:"Select Indentation",placeholder:"Choose indent style..."});n&&(e.setEditorSetting("indentStyle",n.style),e.setEditorSetting("indentSize",n.size))},disconnected(){this._unsubs?.forEach(e=>e()),this._gitPollInterval&&clearInterval(this._gitPollInterval)},getPluginItemsForPosition(e){let t=[];for(let[n,s]of this.pluginItems)s.position===e&&t.push({key:n,...s});return t.sort((n,s)=>(n.order||100)-(s.order||100))},getSchemeDisplayName(){return E().keybindings.getSchemeInfo(this.activeKeybindingScheme)?.name||this.activeKeybindingScheme},handleKeybindingClick(){E().executeCommand("core.keybindings.openSettings")},render(){let e=E(),t=this.activeResourceUri,n="",s="",r=`Ln ${this.cursorLine}, Col ${this.cursorColumn}`,i="";if(t){let d=e.resourceProviders.getProviderForUri(t),h=d?d.getTabMetadata(t):null;if(n=h?h.label:t.split("/").pop()||"",t.startsWith("file://")){let f=n.split(".");f.length>1&&(s=f.pop().toUpperCase(),i=s)}}let o=this.isGitRepo?`${this.gitBranch}${this.gitHasChanges?"*":""}`:"No Git",a=this.isGitRepo?"":"opacity-50",l=this.indentStyle==="tab"?"Tabs":`Spaces: ${this.indentSize}`,c=t?.startsWith("file://");return p`
                <div class="relative z-10000 h-6 bg-primary text-surface-darker font-bold flex items-center justify-between px-3 text-xs flex-shrink-0">
                    <div class="flex items-center gap-3">
                        ${c?p`
                        <div class="flex items-center gap-1 cursor-pointer hover:bg-surface/20 px-1 rounded ${a}">
                            <uix-icon name="git-branch" class="w-3 h-3"></uix-icon>
                            <span>${o}</span>
                        </div>
                         <div class="flex items-center gap-1 cursor-pointer hover:bg-surface/20 px-1 rounded">
                            <uix-icon name="circle-alert" class="w-4 h-4"></uix-icon>
                            <span>${this.errorCount}</span>
                            <uix-icon name="triangle-alert" class="w-4 h-4 ml-1"></uix-icon>
                            <span>${this.warningCount}</span>
                         </div>
                         `:""}
                         ${this.keybindingSequence?p`
                           <div class="flex items-center gap-1 bg-surface/30 px-2 py-0.5 rounded animate-pulse">
                             <uix-icon name="keyboard" class="w-3 h-3"></uix-icon>
                             <span>${this.keybindingSequence} ...</span>
                           </div>
                         `:""}
                         ${this.getPluginItemsForPosition("left").map(d=>d.render?d.render():"")}
                    </div>
                    <div class="flex items-center gap-4">
                        ${c?p`
                        <span class="cursor-pointer hover:bg-surface/20 px-1 rounded">${r}</span>
                        <span class="cursor-pointer hover:bg-surface/20 px-1 rounded" @click=${()=>this.handleIndentClick()}>${l}</span>
                        `:""}
                        <span class="flex items-center gap-1 cursor-pointer hover:bg-surface/20 px-1 rounded" @click=${()=>this.handleKeybindingClick()}>
                            <uix-icon name="keyboard" class="w-3 h-3"></uix-icon>
                            ${this.getSchemeDisplayName()}
                        </span>
                        ${i?p`<span class="cursor-pointer hover:bg-surface/20 px-1 rounded">{ } ${i}</span>`:""}
                        ${this.getPluginItemsForPosition("right").map(d=>d.render?d.render():"")}
                        <uix-icon name="bell" class="w-4 h-4 cursor-pointer hover:bg-surface/20 p-0.5 rounded"></uix-icon>
                    </div>
                </div>
            `}}});var hg,pg=y(()=>{Se();V();H();ei();hg={class:"flex flex-grow bg-surface-dark overflow-auto min-h-0 relative",properties:{activeUri:u.string(),panelId:u.string(),resourceContents:u.object(),findWidgets:u.object({defaultValue:{}}),content:u.string()},connected(){let e=E();this.resourceContents=e.resourceContents||{},this.findWidgets=e.findWidgets||{},this._unsubs=[],this._unsubs.push(e.subscribe("resourceContents",t=>{this.resourceContents=t||{}})),this._unsubs.push(e.subscribe("findWidgets",t=>{this.findWidgets=t||{}})),this._unsubInsert=e.subscribe("editor:insertText",this.handleInsertText.bind(this)),this._unsubShowFind=e.subscribe("editor:showFindWidget",this.handleShowFindWidget.bind(this)),this._unsubCloseFind=e.subscribe("editor:closeFindWidget",this.handleCloseFindWidget.bind(this)),this._unsubFind=e.subscribe("editor:find",this.handleFind.bind(this)),this._unsubFindNext=e.subscribe("editor:findNext",this.handleFindNext.bind(this)),this._unsubFindPrev=e.subscribe("editor:findPrevious",this.handleFindPrevious.bind(this)),this._unsubReplaceNext=e.subscribe("editor:replaceNext",this.handleReplaceNext.bind(this)),this._unsubReplaceAll=e.subscribe("editor:replaceAll",this.handleReplaceAll.bind(this)),this._unsubEditorFocus=e.subscribe("editor:focus",({uri:t})=>{if(t!==this.activeUri)return;let n=this.querySelector("uix-code");if(!n?.view)return;let s=n.view;s.contentDOM.blur(),requestAnimationFrame(()=>{s.focus(),n.cursor!=null&&n.setCursorPosition(n.cursor)})})},disconnected(){this._unsubs?.forEach(e=>e()),this._unsubInsert&&this._unsubInsert(),this._unsubShowFind&&this._unsubShowFind(),this._unsubCloseFind&&this._unsubCloseFind(),this._unsubFind&&this._unsubFind(),this._unsubFindNext&&this._unsubFindNext(),this._unsubFindPrev&&this._unsubFindPrev(),this._unsubReplaceNext&&this._unsubReplaceNext(),this._unsubReplaceAll&&this._unsubReplaceAll(),this._unsubEditorFocus&&this._unsubEditorFocus()},handleShowFindWidget({uri:e,mode:t}){e===this.activeUri&&(this.findWidgets={...this.findWidgets,[e]:{visible:!0,mode:t||"find",findQuery:this.findWidgets[e]?.findQuery||"",replaceQuery:this.findWidgets[e]?.replaceQuery||"",matchCase:this.findWidgets[e]?.matchCase||!1,wholeWord:this.findWidgets[e]?.wholeWord||!1,useRegex:this.findWidgets[e]?.useRegex||!1,currentMatch:0,totalMatches:0}})},handleCloseFindWidget({uri:e}){if(e!==this.activeUri)return;let t={...this.findWidgets};t[e]&&(t[e]={...t[e],visible:!1}),this.findWidgets=t;let n=this.querySelector(`[data-uri="${e}"]`);n&&typeof n.clearFindDecorations=="function"&&n.clearFindDecorations()},handleFind({uri:e,query:t,options:n}){if(e!==this.activeUri)return;let s=this.querySelector(`[data-uri="${e}"]`);if(s&&typeof s.find=="function"){let r=s.find(t,n);this.findWidgets[e]&&(this.findWidgets={...this.findWidgets,[e]:{...this.findWidgets[e],currentMatch:r.currentMatch,totalMatches:r.totalMatches,findQuery:t}})}},handleFindNext({uri:e,query:t,options:n}){if(e!==this.activeUri)return;let s=this.querySelector(`[data-uri="${e}"]`);if(s&&typeof s.findNext=="function"){let r=s.findNext(t,n);this.findWidgets[e]&&(this.findWidgets={...this.findWidgets,[e]:{...this.findWidgets[e],currentMatch:r.currentMatch}})}},handleFindPrevious({uri:e,query:t,options:n}){if(e!==this.activeUri)return;let s=this.querySelector(`[data-uri="${e}"]`);if(s&&typeof s.findPrevious=="function"){let r=s.findPrevious(t,n);this.findWidgets[e]&&(this.findWidgets={...this.findWidgets,[e]:{...this.findWidgets[e],currentMatch:r.currentMatch}})}},handleReplaceNext({uri:e,findQuery:t,replaceQuery:n,options:s}){if(e!==this.activeUri)return;let r=this.querySelector(`[data-uri="${e}"]`);if(r&&typeof r.replaceNext=="function"){let i=r.replaceNext(t,n,s);this.findWidgets[e]&&(this.findWidgets={...this.findWidgets,[e]:{...this.findWidgets[e],currentMatch:i.currentMatch,totalMatches:i.totalMatches}})}},handleReplaceAll({uri:e,findQuery:t,replaceQuery:n,options:s}){if(e!==this.activeUri)return;let r=E(),i=this.querySelector(`[data-uri="${e}"]`);if(i&&typeof i.replaceAll=="function"){let o=i.replaceAll(t,n,s);r.showMessage(`Replaced ${o} occurrence${o!==1?"s":""}`,"info"),this.handleCloseFindWidget({uri:e})}},handleInsertText({text:e,panelId:t,uri:n}){if(n!==this.activeUri||t!==this.panelId)return;let s=this.querySelector(`[data-uri="${n}"]`);s&&typeof s.insertTextAtCursor=="function"?s.insertTextAtCursor(e):console.warn("Active editor component not found or 'insertTextAtCursor' method is missing.",s)},render(){let e=E(),t=this.activeUri,n=t?this.resourceContents[t]:void 0,s=t?e.resourceProviders.getProviderForUri(t):null,r=s&&t?s.getTabMetadata(t):null,i=t?this.findWidgets[t]:null;return!t||n===void 0||!r?p`<div class="flex flex-1 items-center justify-center h-full text-default/30">
                <div class="text-center">
                    <uix-icon name="rocket" class="w-72 h-72 text-primary"></uix-icon>
                </div>
            </div>`:p`
            ${r.component==="ide-code-editor"?p`<uix-code
                    class="flex-1"
                    data-uri=${t}
                    path=${decodeURIComponent(new URL(t).pathname)}
                    content=${n||""}
                    .onUpdate=${o=>e.handleResourceContentChange(t,o)}
                    .onCursorChange=${({line:o,column:a})=>e.emit("editor:cursor",{uri:t,line:o,column:a})}
                    .onFocus=${()=>{e.keybindings.setContext("editorFocused",!0),e.keybindings.setContext("activeUri",t)}}
                    .onBlur=${()=>{e.keybindings.setContext("editorFocused",!1)}}
                    .indentStyle=${e.editorSettings.indentStyle}
                    .indentSize=${e.editorSettings.indentSize}
                    .lineNumber=${!0}
                ></uix-code>`:r.component?ns`<${Vt(r.component)} class="flex-1" .uri=${t} .content=${n}></${Vt(r.component)}>`:p`<div class="text-danger p-4">Error: Unknown component '${r.component}' for ${t}</div>`}

            ${i?.visible?p`
                    <ide-find-replace-widget
                        .mode=${i.mode}
                        .findQuery=${i.findQuery}
                        .replaceQuery=${i.replaceQuery}
                        .matchCase=${i.matchCase}
                        .wholeWord=${i.wholeWord}
                        .useRegex=${i.useRegex}
                        .currentMatch=${i.currentMatch}
                        .totalMatches=${i.totalMatches}
                        .uri=${t}
                    ></ide-find-replace-widget>
                `:""}
        `}}});var fg,mg=y(()=>{H();Se();V();hs();fg={tag:"ide-welcome",properties:{directorySupported:u.boolean({defaultValue:!1}),pendingReconnect:u.object({attribute:!1}),isLoading:u.boolean({defaultValue:!1})},connected(){this.directorySupported=Ht();let e=E();this.pendingReconnect=e.pendingDirectoryReconnect||null,this._unsub=e.subscribe("pendingDirectoryReconnect",t=>{this.pendingReconnect=t||null})},disconnected(){this._unsub?.()},async openWorkspace(){if(!this.isLoading){this.isLoading=!0;try{let e=await ln();await E().executeCommand("files.setBacking",{kind:"directory",handle:e})}catch(e){e.name!=="AbortError"&&console.error("[welcome] Open workspace failed:",e)}finally{this.isLoading=!1}}},async reconnectWorkspace(){if(!this.isLoading){this.isLoading=!0;try{let e=await Ei();e&&await E().executeCommand("files.setBacking",{kind:"directory",handle:e})}catch(e){console.error("[welcome] Reconnect failed:",e)}finally{this.isLoading=!1}}},render(){return p`
      <div class="flex items-center justify-center h-full w-full bg-inverse-dark text-default p-8">
        <div class="max-w-md text-center space-y-6">
          <div class="space-y-2">
            <h1 class="text-2xl font-bold">Welcome to Bootstrapp</h1>
            <p class="text-sm text-default/60">
              Open a folder to start your workspace. Your settings, extensions,
              and layout are stored in a <code class="text-xs bg-surface px-1 py-0.5 rounded">.bootstrapp</code> folder
              inside your project.
            </p>
          </div>

          ${this.pendingReconnect?p`
            <div class="p-4 rounded-lg border border-primary/30 bg-primary/5 space-y-3">
              <div class="flex items-center gap-2 justify-center text-sm">
                <uix-icon name="folder" size="16"></uix-icon>
                <span>Reconnect to <strong>${this.pendingReconnect.name}</strong></span>
              </div>
              <uix-button
                variant="primary"
                size="sm"
                ?disabled=${this.isLoading}
                @click=${()=>this.reconnectWorkspace()}
              >
                ${this.isLoading?"Connecting...":"Reconnect Workspace"}
              </uix-button>
            </div>
          `:""}

          <div class="flex flex-col gap-3 items-center">
            ${this.directorySupported?p`
              <uix-button
                variant="primary"
                @click=${()=>this.openWorkspace()}
                ?disabled=${this.isLoading}
              >
                <uix-icon name="folder-open" size="16" class="mr-2"></uix-icon>
                Open Workspace
              </uix-button>
            `:p`
              <p class="text-xs text-default/40">
                File System Access API is not supported in this browser.
                Use the CLI to serve a project folder.
              </p>
            `}
          </div>

          <div class="text-xs text-default/30 space-y-1">
            <p>Opening a folder creates a workspace with your config, notes, and extensions.</p>
            <p>Everything lives in your project folder — portable and version-controllable.</p>
          </div>
        </div>
      </div>
    `}}});var gg,bg=y(async()=>{await Ut();V();H();Wl();ei();gg={tag:"router-ui",properties:{currentRoute:u.object({sync:Fe})},renderRoute(e,t){let n=typeof e.component=="function"?e.component(t):e.component;return e.template?ns`<${Vt(e.template)} .component=${n}>
			</${Vt(e.template)}>`:n},render(){let{route:e,params:t}=this.currentRoute||Fe.currentRoute||{};return e?po(e.name??e.path,this.renderRoute(typeof e=="function"?{component:e}:e,t)):p`404: Page not found`}}});var yg,xg=y(()=>{V();H();yg={i18n:{},properties:{variant:u.string("default"),size:u.string("md"),outline:u.boolean()},style:!0,shadow:!0,render(){return p`
        <slot></slot>
    `}}});var vg,wg=y(()=>{V();vg={tag:"uix-button",properties:{variant:u.string(),primary:u.boolean(),secondary:u.boolean(),danger:u.boolean(),success:u.boolean(),ghost:u.boolean(),outline:u.boolean(),border:u.boolean(),flat:u.boolean(),size:u.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),wFull:u.boolean(!1)},extends:"uix-link",style:!0}});var f1,kg,m1,g1,b1,y1,x1,v1,$g,Sg=y(()=>{V();H();f1=(e,t,n)=>{if(!e.isRecurring)return[];let s=[],r=new Date(t),i=new Date(n),o=e.recurrenceEndDate?new Date(e.recurrenceEndDate):new Date(r.getTime()+31536e6),a=new Date(e.date),l=(d,h,f)=>{switch(h.recurrencePattern){case"daily":return!0;case"weekly":return d.getDay()===f.getDay();case"monthly":return d.getDate()===f.getDate();case"custom":return h.recurrenceDays?.includes(d.getDay());default:return!1}},c=(d,h)=>{switch(h){case"daily":d.setDate(d.getDate()+1);break;case"weekly":d.setDate(d.getDate()+7);break;case"monthly":d.setMonth(d.getMonth()+1);break;case"custom":d.setDate(d.getDate()+1);break}};for(;r<=i&&r<=o;)l(r,e,a)&&s.push({...e,id:`${e.id}-${r.toISOString().split("T")[0]}`,date:r.toISOString().split("T")[0],recurrenceParentId:e.id,isRecurring:!1}),c(r,e.recurrencePattern);return s},kg=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),m1=e=>{let t=new Date,n=new Date(t.getTime()+6048e5);return e>=t&&e<=n},g1=(e,t)=>{let n=new Date(e),s=new Date;s.setHours(0,0,0,0);let r=new Date(s);return r.setDate(r.getDate()+1),kg(n,s)?"TODAY":kg(n,r)?"TOMORROW":m1(n)?n.toLocaleDateString(t,{weekday:"long"}).toUpperCase():n.toLocaleDateString(t,{month:"short",day:"numeric"}).toUpperCase()},b1=e=>e.reduce((t,n)=>({...t,[n.date]:[...t[n.date]||[],n]}),{}),y1=(e,t,n)=>{let s=[];return n.forEach(r=>{if(r.isRecurring)s.push(...f1(r,e,t));else{let i=new Date(r.date);i>=e&&i<=t&&s.push(r)}}),s.sort((r,i)=>new Date(r.date)-new Date(i.date))},x1=(e,t,n)=>new Date(t,e,1).toLocaleDateString(n,{month:"long",year:"numeric"}).toUpperCase(),v1=(e,t,n)=>{let s=[],r=new Date(e,t,1),i=new Date(e,t+1,0),o=r.getDay(),a=i.getDate(),l=new Date;l.setHours(0,0,0,0);let c=n.reduce((h,f)=>({...h,[f.date]:[...h[f.date]||[],f]}),{});for(let h=o-1;h>=0;h--){let f=new Date(e,t,-h),m=f.toISOString().split("T")[0];s.push({date:f,day:f.getDate(),isCurrentMonth:!1,isToday:!1,events:c[m]||[]})}for(let h=1;h<=a;h++){let f=new Date(e,t,h),m=f.toISOString().split("T")[0];f.setHours(0,0,0,0),s.push({date:f,day:h,isCurrentMonth:!0,isToday:f.getTime()===l.getTime(),events:c[m]||[]})}let d=42-s.length;for(let h=1;h<=d;h++){let f=new Date(e,t+1,h),m=f.toISOString().split("T")[0];s.push({date:f,day:f.getDate(),isCurrentMonth:!1,isToday:!1,events:c[m]||[]})}return s},$g={tag:"uix-calendar",style:!0,shadow:!0,properties:{events:u.array({defaultValue:[]}),viewMode:u.string({defaultValue:"month",enum:["list","month"]}),currentMonth:u.number(new Date().getMonth()),currentYear:u.number(new Date().getFullYear()),selectedDate:u.string(""),showDayPanel:u.boolean(!1),showViewToggle:u.boolean(!0),showNavigation:u.boolean(!0),showTodayButton:u.boolean(!0),locale:u.string("en"),monthsAhead:u.number(3)},getEventsForCalendar(){let e=new Date,t=new Date(e);return t.setMonth(t.getMonth()+this.monthsAhead),y1(e,t,this.events||[])},handleNav(e){e===-1?this.currentMonth===0?(this.currentMonth=11,this.currentYear--):this.currentMonth--:this.currentMonth===11?(this.currentMonth=0,this.currentYear++):this.currentMonth++,this.showDayPanel=!1,this.emit("month-change",{month:this.currentMonth,year:this.currentYear})},handleTodayClick(){let e=new Date;this.currentMonth=e.getMonth(),this.currentYear=e.getFullYear(),this.showDayPanel=!1},handleViewToggle(e){this.viewMode=e},handleDayClick(e){let t=e.date.toISOString().split("T")[0],n=e.events.length>0;this.selectedDate===t?this.showDayPanel=!this.showDayPanel&&n:(this.selectedDate=t,this.showDayPanel=n),this.emit("day-click",{date:t,events:e.events})},handleClosePanel(){this.showDayPanel=!1},handleEventClick(e,t){t?.stopPropagation(),this.emit("event-click",{event:e})},getEventsForSelectedDay(){return this.selectedDate?this.getEventsForCalendar().filter(e=>e.date===this.selectedDate):[]},render(){let e=this.getEventsForCalendar(),t=b1(e);return p`
      <style>
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      </style>

      <div class="calendar-container" part="container">
        ${this.showViewToggle?this.renderViewToggle():null}
        ${this.viewMode==="list"?this.renderListView(t):this.renderGridView(e)}
      </div>
    `},renderViewToggle(){return p`
      <div class="view-toggle" part="view-toggle">
        <button
          @click=${()=>this.handleViewToggle("list")}
          class="toggle-btn ${this.viewMode==="list"?"active":""}"
          part="toggle-btn ${this.viewMode==="list"?"toggle-btn-active":""}"
        >
          List
        </button>
        <button
          @click=${()=>this.handleViewToggle("month")}
          class="toggle-btn ${this.viewMode==="month"?"active":""}"
          part="toggle-btn ${this.viewMode==="month"?"toggle-btn-active":""}"
        >
          Month
        </button>
      </div>
    `},renderListView(e){let t=Object.keys(e).sort();return t.length===0?p`
        <div class="empty-state" part="empty">
          <div class="empty-icon">📅</div>
          <p class="empty-text">No events scheduled</p>
        </div>
      `:p`
      <div class="list-view" part="list">
        ${t.map(n=>{let s=e[n],r=g1(n,this.locale);return p`
            <div class="list-section" part="list-section">
              <h2 class="list-section-title" part="list-section-title">${r}</h2>
              <div class="list-items">
                ${s.map(i=>p`
                    <div
                      @click=${o=>this.handleEventClick(i,o)}
                      class="list-item"
                      part="list-item"
                      data-category="${i.category||""}"
                    >
                      ${i.image?p`<img
                            src="${i.image}"
                            alt="${i.title}"
                            class="list-item-image"
                            part="list-item-image"
                          />`:null}
                      <div class="list-item-content" part="list-item-content">
                        <div class="list-item-header">
                          <h3 class="list-item-title" part="list-item-title">${i.title}</h3>
                          ${i.recurrenceParentId?p`<span class="recurring-badge" part="recurring-badge">🔁</span>`:null}
                        </div>
                        <p class="list-item-meta" part="list-item-meta">
                          ${i.time||""} ${i.venue||i.address?`\u2022 ${i.venue||i.address}`:""}
                        </p>
                        <slot name="list-item-extra" .event=${i}></slot>
                      </div>
                    </div>
                  `)}
              </div>
            </div>
          `})}
      </div>
    `},renderGridView(e){let t=v1(this.currentYear,this.currentMonth,e),n=x1(this.currentMonth,this.currentYear,this.locale),s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return p`
      <div class="grid-view" part="grid-view">
        ${this.showNavigation?p`
          <div class="grid-header" part="header">
            <button
              @click=${()=>this.handleNav(-1)}
              class="nav-btn"
              part="nav-btn nav-btn-prev"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h2 class="month-label" part="month-label">${n}</h2>
            <button
              @click=${()=>this.handleNav(1)}
              class="nav-btn"
              part="nav-btn nav-btn-next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        `:null}

        ${this.showTodayButton?p`
          <button
            @click=${this.handleTodayClick.bind(this)}
            class="today-btn"
            part="today-btn"
          >
            Jump to Today
          </button>
        `:null}

        <div class="grid-container" part="grid">
          <div class="weekday-header" part="weekday-header">
            ${s.map(r=>p`<div class="weekday" part="weekday">${r}</div>`)}
          </div>
          <div class="days-grid" part="days-grid">
            ${t.map(r=>{let i=this.selectedDate===r.date.toISOString().split("T")[0],o=r.events.length>0;return p`
                <div
                  @click=${()=>this.handleDayClick(r)}
                  class="day-cell ${r.isToday?"today":""} ${i?"selected":""} ${r.isCurrentMonth?"":"other-month"} ${o?"has-events":""}"
                  part="day ${r.isToday?"day-today":""} ${i?"day-selected":""} ${r.isCurrentMonth?"":"day-other-month"}"
                >
                  <span class="day-number" part="day-number">${r.day}</span>
                  ${o?p`
                        <div class="day-events" part="day-events">
                          ${r.events.slice(0,2).map(a=>p`
                              <div
                                class="event-indicator"
                                part="event"
                                data-category="${a.category||""}"
                              >
                                ${a.title.length>12?a.title.substring(0,12)+"...":a.title}
                              </div>
                            `)}
                          ${r.events.length>2?p`<div class="more-events" part="more-events">+${r.events.length-2} more</div>`:null}
                        </div>
                      `:null}
                </div>
              `})}
          </div>
        </div>

        ${this.showDayPanel?this.renderDayDetailPanel():null}
      </div>
    `},renderDayDetailPanel(){let e=this.getEventsForSelectedDay(),n=new Date(this.selectedDate).toLocaleDateString(this.locale,{weekday:"long",month:"short",day:"numeric"}).toUpperCase();return p`
      <div
        @click=${this.handleClosePanel.bind(this)}
        class="panel-overlay"
        part="panel-overlay"
        style="animation: fadeIn 0.2s ease-out;"
      ></div>
      <div class="day-panel" part="panel" style="animation: slideUp 0.3s ease-out;">
        <div class="panel-header" part="panel-header">
          <h3 class="panel-title" part="panel-title">${n}</h3>
          <button
            @click=${this.handleClosePanel.bind(this)}
            class="panel-close"
            part="panel-close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="panel-content" part="panel-content">
          ${e.length===0?p`<p class="panel-empty" part="panel-empty">No events on this day</p>`:e.map(s=>p`
                  <div
                    @click=${r=>this.handleEventClick(s,r)}
                    class="panel-item"
                    part="panel-item"
                    data-category="${s.category||""}"
                  >
                    ${s.image?p`<img
                          src="${s.image}"
                          alt="${s.title}"
                          class="panel-item-image"
                          part="panel-item-image"
                        />`:null}
                    <div class="panel-item-content" part="panel-item-content">
                      <div class="panel-item-header">
                        <h4 class="panel-item-title" part="panel-item-title">${s.title}</h4>
                        ${s.recurrenceParentId?p`<span class="recurring-badge" part="recurring-badge">🔁</span>`:null}
                      </div>
                      <p class="panel-item-meta" part="panel-item-meta">
                        ${s.time||""} ${s.venue||s.address?`\u2022 ${s.venue||s.address}`:""}
                      </p>
                    </div>
                  </div>
                `)}
        </div>
      </div>
    `}}});var w1,_g,Ag=y(()=>{V();H();w1={table:"table",kanban:"kanban",calendar:"calendar"},_g={tag:"uix-collection",style:!0,dataQuery:!0,properties:{rows:u.array({defaultValue:[]}),views:u.array({defaultValue:["table","kanban","calendar"]}),currentView:u.string({defaultValue:"table"}),columns:u.array({defaultValue:[]}),groupByField:u.string({defaultValue:""}),kanbanColumns:u.array({defaultValue:[]}),dateField:u.string({defaultValue:"date"}),titleField:u.string({defaultValue:"title"}),timeField:u.string({defaultValue:""}),categoryField:u.string({defaultValue:""}),renderItem:u.function(),onRowClick:u.function(),onKanbanMove:u.function(),onKanbanAdd:u.function()},_mapRowsToEvents(){return(this.rows||[]).filter(t=>t?.[this.dateField]).map(t=>({id:t.id,date:t[this.dateField],title:t[this.titleField]||t.name||"",time:this.timeField?t[this.timeField]:"",category:this.categoryField?t[this.categoryField]:""}))},_renderSwitcher(){return!this.views||this.views.length<2?"":p`
      <div class="uix-collection-switcher">
        ${this.views.map(e=>p`
            <button
              class=${this.currentView===e?"active":""}
              @click=${()=>this.currentView=e}
            >
              <uix-icon name=${w1[e]||"layout-grid"} size="16"></uix-icon>
              <span>${e}</span>
            </button>
          `)}
      </div>
    `},_renderView(){switch(this.currentView){case"kanban":return p`
          <uix-kanban
            .rows=${this.rows}
            .columns=${this.kanbanColumns}
            .groupByField=${this.groupByField}
            .renderItem=${this.renderItem}
            .onMove=${this.onKanbanMove}
            .onAdd=${this.onKanbanAdd}
            .onSelect=${this.onRowClick}
            .addable=${!!this.onKanbanAdd}
          ></uix-kanban>
        `;case"calendar":return p`
          <uix-calendar .events=${this._mapRowsToEvents()}></uix-calendar>
        `;default:return p`
          <uix-table
            .rows=${this.rows}
            .columns=${this.columns}
            .selectRow=${this.onRowClick}
          ></uix-table>
        `}},render(){return p`
      <div class="uix-collection">
        ${this._renderSwitcher()}
        <div class="uix-collection-body">${this._renderView()}</div>
      </div>
    `}}});var Cg,Eg=y(()=>{V();H();Cg={properties:{level:u.number({defaultValue:2,min:1,max:6}),size:u.string({enum:["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl"]}),transform:u.string({enum:["uppercase"]}),weight:u.string({enum:["bold","black"]})},render(){switch(this.level){case 1:return p`<h1><slot></slot></h1>`;case 2:return p`<h2><slot></slot></h2>`;case 3:return p`<h3><slot></slot></h3>`;case 4:return p`<h4><slot></slot></h4>`;case 5:return p`<h5><slot></slot></h5>`;case 6:return p`<h6><slot></slot></h6>`;default:return p`<h2><slot></slot></h2>`}}}});var ql,fo,Rg=y(()=>{gt();Rn();ql=class extends is{constructor(e){if(super(e),this.it=ae,e.type!==si.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ae||e==null)return this._t=void 0,this.it=e;if(e===At)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};ql.directiveName="unsafeHTML",ql.resultType=1;fo=rs(ql);});var Hl=y(()=>{Rn();gt();Rg()});var mo,k1,Ig,Tg,Pg,Mg=y(()=>{Zt();Ue();Hl();V();mo=new Map,k1=/^[a-z][a-z0-9-]*$/,Ig=e=>typeof e=="string"&&k1.test(e),Tg=new Set,Pg={tag:"uix-icon",style:!0,static:{Icons:mo},properties:{name:u.string(),svg:u.string(),solid:u.boolean(),size:u.string(),color:u.string({enum:["primary","secondary","success","danger","warning","info","inverse"]})},async getIcon(e){if(!Ig(e)){this.svg="";return}if(mo.has(e)){this.svg=mo.get(e);return}let n=!!j.manifest?.dev?`${Xn.iconFontFamily}/${e}.svg`:`/icons/${e}.svg`;try{let s=await fetch(n);if(!s.ok){Tg.has(e)||(Tg.add(e),console.warn(`Icon not bundled: ${e} (${n})`)),this.svg="";return}let r=s.headers.get("content-type")||"",i=await s.text();r.includes("svg")||i.trim().startsWith("<svg")?(mo.set(e,i),this.svg=i):(console.error(`Icon ${e} from ${n}: expected SVG but got ${r}`),this.svg="")}catch(s){console.error(`Error fetching icon: ${e}`,s),this.svg=""}},willUpdate({changedProps:e}){e.has("name")&&this.getIcon(this.name),e.has("size")&&this.applyNumericSize()},connected(){this.getIcon(this.name),this.applyNumericSize()},applyNumericSize(){this.size&&/^\d+$/.test(this.size)?this.style.setProperty("--icon-size",`${this.size}px`):this.style.removeProperty("--icon-size")},render(){if(this.name&&!Ig(this.name))return this.name;if(!this.svg)return null;let e=this.solid?this.svg.replaceAll('fill="none"','fill="currentColor"'):this.svg;return fo(e)}}});var jg,Fg=y(()=>{V();H();jg={tag:"uix-kanban",style:!0,properties:{rows:u.array({defaultValue:[]}),columns:u.array({defaultValue:[]}),groupByField:u.string({defaultValue:"section"}),addable:u.boolean({defaultValue:!1}),onMove:u.function(),onAdd:u.function(),onSelect:u.function(),renderItem:u.function(),newTitles:u.object({defaultValue:{}})},_resolvedColumns(){if(this.columns?.length)return this.columns;let e=new Set;for(let t of this.rows||[]){let n=t?.[this.groupByField];n!=null&&e.add(String(n))}return[...e].map(t=>({name:t}))},_rowsForColumn(e){return(this.rows||[]).filter(t=>String(t?.[this.groupByField]??"")===e)},_handleDrop(e,t){let n=e.dataTransfer?.getData("text/plain");n&&this.onMove?.(n,t)},_submitAdd(e){let t=(this.newTitles[e]||"").trim();t&&(this.onAdd?.(e,t),this.newTitles={...this.newTitles,[e]:""})},_defaultCard(e){let t=e.title||e.name||`#${e.id}`;return p`
      <uix-card class="uix-kanban-card" hover @click=${()=>this.onSelect?.(e)}>
        <span>${t}</span>
      </uix-card>
    `},render(){let e=this._resolvedColumns();return p`
      <div class="uix-kanban">
        ${e.map(t=>{let n=this._rowsForColumn(t.name);return p`
            <div class="uix-kanban-column" style=${t.color?`--column-accent: ${t.color}`:""}>
              <div class="uix-kanban-header">
                ${t.icon?p`<uix-icon name=${t.icon} size="14"></uix-icon>`:""}
                <span>${t.label||t.name}</span>
                <span class="uix-kanban-count">${n.length}</span>
              </div>
              <uix-droparea
                droparea-id=${t.name}
                class="uix-kanban-body"
                .ondrop=${s=>this._handleDrop(s,t.name)}
              >
                ${n.map(s=>p`
                    <uix-draggable dragged-id=${s.id}>
                      ${this.renderItem?this.renderItem(s):this._defaultCard(s)}
                    </uix-draggable>
                  `)}
              </uix-droparea>
              ${this.addable?p`
                    <div class="uix-kanban-footer">
                      <input
                        placeholder="Add…"
                        .value=${this.newTitles[t.name]||""}
                        @input=${s=>{this.newTitles={...this.newTitles,[t.name]:s.target.value}}}
                        @keydown=${s=>{s.key==="Enter"&&this._submitAdd(t.name)}}
                      />
                    </div>
                  `:""}
            </div>
          `})}
      </div>
    `}}});var Dg,Og=y(async()=>{await Ut();Ue();H();V();Dg={tag:"uix-link",style:!0,shadow:!0,properties:{content:u.object(),external:u.boolean(),skipRoute:u.boolean(),hideLabel:u.boolean(),disabled:u.boolean(),name:u.string(),alt:u.string(),label:u.string(),type:u.string(),href:u.string(),related:u.string(),icon:u.string(),iconSize:u.string({defaultValue:"md"}),click:u.function(),confirmation:u.string(),popovertarget:u.string(),popovertargetaction:u.string(),tabindex:u.string(),ariaLabel:u.string({attribute:"aria-label"})},_handlePopoverTarget(e){if(!this.popovertarget)return!1;let t=document.getElementById(this.popovertarget);if(!t||typeof t.toggle!="function")return!1;e.preventDefault(),e.stopPropagation();let n=this.shadowRoot.querySelector("button, a"),s=this.popovertargetaction||"toggle";return s==="toggle"?t.toggle(n):s==="show"?t._open(n):s==="hide"&&t._close(),!0},_defaultOnClick(e){if(!(j.manifest.production===!0&&Fe.matchRoute().route?.ssg===!0)){if(this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}this._handlePopoverTarget(e)||this.href&&!this.skipRoute&&Fe.handleLinkClick(e,{external:this.external})||(this.href||e.preventDefault(),this.click&&this.type!=="submit"&&(this.confirmation?window.confirm(this.confirmation)&&this.click(e):this.click(e),e.stopImmediatePropagation()))}},_getHref(){if(!this.href||this.external)return this.href;let e=Fe.options?.basePath||"";return e&&this.href.startsWith("/")&&!this.href.startsWith(e)?e+this.href:this.href},firstUpdated(){this.shadowRoot.querySelector("[part=anchor]").addEventListener("click",this._defaultOnClick)},render(){let e=p`
      ${this.icon?p`<uix-icon name=${this.icon} size=${this.iconSize} part="icon"></uix-icon>`:null}
      <slot></slot>
      ${this.hideLabel?null:this.label}
    `,t=!this.href&&this.popovertarget,n=this.tabindex!=null?"-1":ae,s=this.ariaLabel||this.alt||this.label||ae;if(t)return p`
        <button
          part="anchor"
          name=${this.name||this.label||this.alt}
          aria-label=${s}
          aria-disabled=${this.disabled?"true":"false"}
          ?disabled=${this.disabled}
          type="button"
          tabindex=${n}
        >
          ${e}
        </button>
      `;let r=this._getHref();return p`
      <a
        part="anchor"
        href=${this.disabled?ae:r||"#"}
        related=${this.related}
        name=${this.name||this.label||this.alt}
        alt=${this.alt||this.label||this.name}
        aria-label=${s}
        aria-disabled=${this.disabled?"true":"false"}
        ?disabled=${this.disabled}
        tabindex=${n}
      >
        ${e}
      </a>
    `}}});function Gl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}function qg(e){Gn=e}function we(e,t=""){let n=typeof e=="string"?e:e.source,s={replace:(r,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(Qe.caret,"$1"),n=n.replace(r,o),s},getRegex:()=>new RegExp(n,t)};return s}function Mt(e,t){if(t){if(Qe.escapeTest.test(e))return e.replace(Qe.escapeReplace,Ug)}else if(Qe.escapeTestNoEncode.test(e))return e.replace(Qe.escapeReplaceNoEncode,Ug);return e}function Ng(e){try{e=encodeURI(e).replace(Qe.percentDecode,"%")}catch{return null}return e}function Vg(e,t){let n=e.replace(Qe.findPipe,(i,o,a)=>{let l=!1,c=o;for(;--c>=0&&a[c]==="\\";)l=!l;return l?"|":" |"}),s=n.split(Qe.splitPipe),r=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;r<s.length;r++)s[r]=s[r].trim().replace(Qe.slashPipe,"|");return s}function mn(e,t,n){let s=e.length;if(s===0)return"";let r=0;for(;r<s;){let i=e.charAt(s-r-1);if(i===t&&!n)r++;else if(i!==t&&n)r++;else break}return e.slice(0,s-r)}function Bg(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&Qe.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function oS(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function aS(e,t=0){let n=t,s="";for(let r of e)if(r==="	"){let i=4-n%4;s+=" ".repeat(i),n+=i}else s+=r,n++;return s}function Wg(e,t,n,s,r){let i=t.href,o=t.title||null,a=e[1].replace(r.other.outputLinkReplace,"$1");s.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:o,text:a,tokens:s.inlineTokens(a)};return s.state.inLink=!1,l}function lS(e,t,n){let s=e.match(n.other.indentCodeCompensation);if(s===null)return t;let r=s[1];return t.split(`
`).map(i=>{let o=i.match(n.other.beginningSpace);if(o===null)return i;let[a]=o;return a.length>=r.length?i.slice(r.length):i}).join(`
`)}function Ae(e,t){return Kn.parse(e,t)}var Gn,Qn,$1,Qe,S1,_1,A1,yr,C1,Jl,Hg,Yg,E1,Xl,R1,Zl,I1,T1,vo,ec,P1,Qg,M1,tc,Lg,j1,F1,D1,O1,Kg,L1,_s,wo,nc,z1,Gg,U1,N1,V1,Jg,B1,W1,Xg,q1,H1,Y1,Q1,K1,G1,J1,X1,Z1,eS,bo,tS,Zg,eb,nS,zg,sc,sS,Yl,rS,go,gr,iS,Ug,yo,kt,xo,rc,$t,br,cS,Kn,uM,dM,hM,pM,fM,mM,gM,tb=y(()=>{Gn=Gl();Qn={exec:()=>null};$1=((e="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+e)}catch{return!1}})(),Qe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},S1=/^(?:[ \t]*(?:\n|$))+/,_1=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,A1=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,yr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,C1=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Jl=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Hg=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Yg=we(Hg).replace(/bull/g,Jl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),E1=we(Hg).replace(/bull/g,Jl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Xl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,R1=/^[^\n]+/,Zl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,I1=we(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Zl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),T1=we(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Jl).getRegex(),vo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ec=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,P1=we("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ec).replace("tag",vo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qg=we(Xl).replace("hr",yr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",vo).getRegex(),M1=we(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qg).getRegex(),tc={blockquote:M1,code:_1,def:I1,fences:A1,heading:C1,hr:yr,html:P1,lheading:Yg,list:T1,newline:S1,paragraph:Qg,table:Qn,text:R1},Lg=we("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",yr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",vo).getRegex(),j1={...tc,lheading:E1,table:Lg,paragraph:we(Xl).replace("hr",yr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Lg).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",vo).getRegex()},F1={...tc,html:we(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ec).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:we(Xl).replace("hr",yr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Yg).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},D1=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,O1=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Kg=/^( {2,}|\\)\n(?!\s*$)/,L1=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,_s=/[\p{P}\p{S}]/u,wo=/[\s\p{P}\p{S}]/u,nc=/[^\s\p{P}\p{S}]/u,z1=we(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,wo).getRegex(),Gg=/(?!~)[\p{P}\p{S}]/u,U1=/(?!~)[\s\p{P}\p{S}]/u,N1=/(?:[^\s\p{P}\p{S}]|~)/u,V1=we(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",$1?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Jg=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,B1=we(Jg,"u").replace(/punct/g,_s).getRegex(),W1=we(Jg,"u").replace(/punct/g,Gg).getRegex(),Xg="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",q1=we(Xg,"gu").replace(/notPunctSpace/g,nc).replace(/punctSpace/g,wo).replace(/punct/g,_s).getRegex(),H1=we(Xg,"gu").replace(/notPunctSpace/g,N1).replace(/punctSpace/g,U1).replace(/punct/g,Gg).getRegex(),Y1=we("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,nc).replace(/punctSpace/g,wo).replace(/punct/g,_s).getRegex(),Q1=we(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,_s).getRegex(),K1="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",G1=we(K1,"gu").replace(/notPunctSpace/g,nc).replace(/punctSpace/g,wo).replace(/punct/g,_s).getRegex(),J1=we(/\\(punct)/,"gu").replace(/punct/g,_s).getRegex(),X1=we(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Z1=we(ec).replace("(?:-->|$)","-->").getRegex(),eS=we("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Z1).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),bo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,tS=we(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",bo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Zg=we(/^!?\[(label)\]\[(ref)\]/).replace("label",bo).replace("ref",Zl).getRegex(),eb=we(/^!?\[(ref)\](?:\[\])?/).replace("ref",Zl).getRegex(),nS=we("reflink|nolink(?!\\()","g").replace("reflink",Zg).replace("nolink",eb).getRegex(),zg=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,sc={_backpedal:Qn,anyPunctuation:J1,autolink:X1,blockSkip:V1,br:Kg,code:O1,del:Qn,delLDelim:Qn,delRDelim:Qn,emStrongLDelim:B1,emStrongRDelimAst:q1,emStrongRDelimUnd:Y1,escape:D1,link:tS,nolink:eb,punctuation:z1,reflink:Zg,reflinkSearch:nS,tag:eS,text:L1,url:Qn},sS={...sc,link:we(/^!?\[(label)\]\((.*?)\)/).replace("label",bo).getRegex(),reflink:we(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",bo).getRegex()},Yl={...sc,emStrongRDelimAst:H1,emStrongLDelim:W1,delLDelim:Q1,delRDelim:G1,url:we(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",zg).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:we(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",zg).getRegex()},rS={...Yl,br:we(Kg).replace("{2,}","*").getRegex(),text:we(Yl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},go={normal:tc,gfm:j1,pedantic:F1},gr={normal:sc,gfm:Yl,breaks:rS,pedantic:sS},iS={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ug=e=>iS[e];yo=class{options;rules;lexer;constructor(e){this.options=e||Gn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=this.options.pedantic?t[0]:Bg(t[0]),s=n.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:n,codeBlockStyle:"indented",text:s}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],s=lS(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let s=mn(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:mn(t[0],`
`),depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:mn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=mn(t[0],`
`).split(`
`),s="",r="",i=[];for(;n.length>0;){let o=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),o=!0;else if(!o)a.push(n[l]);else break;n=n.slice(l);let c=a.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${c}`:c,r=r?`${r}
${d}`:d;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=h,n.length===0)break;let f=i.at(-1);if(f?.type==="code")break;if(f?.type==="blockquote"){let m=f,g=m.raw+`
`+n.join(`
`),b=this.blockquote(g);i[i.length-1]=b,s=s.substring(0,s.length-m.raw.length)+b.raw,r=r.substring(0,r.length-m.text.length)+b.text;break}else if(f?.type==="list"){let m=f,g=m.raw+`
`+n.join(`
`),b=this.list(g);i[i.length-1]=b,s=s.substring(0,s.length-f.raw.length)+b.raw,r=r.substring(0,r.length-m.raw.length)+b.raw,n=g.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),s=n.length>1,r={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");let i=this.rules.other.listItemRegex(n),o=!1;for(;e;){let l=!1,c="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let h=aS(t[2].split(`
`,1)[0],t[1].length),f=e.split(`
`,1)[0],m=!h.trim(),g=0;if(this.options.pedantic?(g=2,d=h.trimStart()):m?g=t[1].length+1:(g=h.search(this.rules.other.nonSpaceChar),g=g>4?1:g,d=h.slice(g),g+=t[1].length),m&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){let b=this.rules.other.nextBulletRegex(g),_=this.rules.other.hrRegex(g),R=this.rules.other.fencesBeginRegex(g),D=this.rules.other.headingBeginRegex(g),M=this.rules.other.htmlBeginRegex(g),K=this.rules.other.blockquoteBeginRegex(g);for(;e;){let ee=e.split(`
`,1)[0],Y;if(f=ee,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),Y=f):Y=f.replace(this.rules.other.tabCharGlobal,"    "),R.test(f)||D.test(f)||M.test(f)||K.test(f)||b.test(f)||_.test(f))break;if(Y.search(this.rules.other.nonSpaceChar)>=g||!f.trim())d+=`
`+Y.slice(g);else{if(m||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||R.test(h)||D.test(h)||_.test(h))break;d+=`
`+f}m=!f.trim(),c+=ee+`
`,e=e.substring(ee.length+1),h=Y.slice(g)}}r.loose||(o?r.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0)),r.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),r.raw+=c}let a=r.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let l of r.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(l.raw);if(c){let d={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};l.checked=d.checked,r.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!r.loose){let c=l.tokens.filter(h=>h.type==="space"),d=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));r.loose=d}}if(r.loose)for(let l of r.items){l.loose=!0;for(let c of l.tokens)c.type==="text"&&(c.type="paragraph")}return r}}html(e){let t=this.rules.block.html.exec(e);if(t){let n=Bg(t[0]);return{type:"html",block:!0,raw:n,pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:n}}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:mn(t[0],`
`),href:s,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Vg(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:mn(t[0],`
`),header:[],align:[],rows:[]};if(n.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<n.length;o++)i.header.push({text:n[o],tokens:this.lexer.inline(n[o]),header:!0,align:i.align[o]});for(let o of r)i.rows.push(Vg(o,i.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:i.align[l]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let n=t[1].trim();return{type:"heading",raw:mn(t[0],`
`),depth:t[2].charAt(0)==="="?1:2,text:n,tokens:this.lexer.inline(n)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=mn(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=oS(t[2],"()");if(i===-2)return;if(i>-1){let o=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,o).trim(),t[3]=""}}let s=t[2],r="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],r=i[3])}else r=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Wg(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=t[s.toLowerCase()];if(!r){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Wg(n,r,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!(!s||!s[1]&&!s[2]&&!s[3]&&!s[4]||s[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[3])||!n||this.rules.inline.punctuation.exec(n))){let r=[...s[0]].length-1,i,o,a=r,l=0,c=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+r);(s=c.exec(t))!==null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(o=[...i].length,s[3]||s[4]){a+=o;continue}else if((s[5]||s[6])&&r%3&&!((r+o)%3)){l+=o;continue}if(a-=o,a>0)continue;o=Math.min(o,o+a+l);let d=[...s[0]][0].length,h=e.slice(0,r+s.index+d+o);if(Math.min(r,o)%2){let m=h.slice(1,-1);return{type:"em",raw:h,text:m,tokens:this.lexer.inlineTokens(m)}}let f=h.slice(2,-2);return{type:"strong",raw:h,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(n),r=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&r&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let s=this.rules.inline.delLDelim.exec(e);if(s&&(!s[1]||!n||this.rules.inline.punctuation.exec(n))){let r=[...s[0]].length-1,i,o,a=r,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+r);(s=l.exec(t))!==null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i||(o=[...i].length,o!==r))continue;if(s[3]||s[4]){a+=o;continue}if(a-=o,a>0)continue;o=Math.min(o,o+a);let c=[...s[0]][0].length,d=e.slice(0,r+s.index+c+o),h=d.slice(r,-r);return{type:"del",raw:d,text:h,tokens:this.lexer.inlineTokens(h)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,s;if(t[2]==="@")n=t[0],s="mailto:"+n;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(r!==t[0]);n=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},kt=class Ql{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Gn,this.options.tokenizer=this.options.tokenizer||new yo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Qe,block:go.normal,inline:gr.normal};this.options.pedantic?(n.block=go.pedantic,n.inline=gr.pedantic):this.options.gfm&&(n.block=go.gfm,this.options.breaks?n.inline=gr.breaks:n.inline=gr.gfm),this.tokenizer.rules=n}static get rules(){return{block:go,inline:gr}}static lex(t,n){return new Ql(n).lex(t)}static lexInline(t,n){return new Ql(n).inlineTokens(t)}lex(t){t=t.replace(Qe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){this.tokenizer.lexer=this,this.options.pedantic&&(t=t.replace(Qe.tabCharGlobal,"    ").replace(Qe.spaceLine,""));let r=1/0;for(;t;){if(t.length<r)r=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(a=>(i=a.call({lexer:this},t,n))?(t=t.substring(i.raw.length),n.push(i),!0):!1))continue;if(i=this.tokenizer.space(t)){t=t.substring(i.raw.length);let a=n.at(-1);i.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(i);continue}if(i=this.tokenizer.code(t)){t=t.substring(i.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+i.raw,a.text+=`
`+i.text,this.inlineQueue.at(-1).src=a.text):n.push(i);continue}if(i=this.tokenizer.fences(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.heading(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.hr(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.blockquote(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.list(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.html(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.def(t)){t=t.substring(i.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+i.raw,a.text+=`
`+i.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},n.push(i));continue}if(i=this.tokenizer.table(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.lheading(t)){t=t.substring(i.raw.length),n.push(i);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),c;this.options.extensions.startBlock.forEach(d=>{c=d.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(i=this.tokenizer.paragraph(o))){let a=n.at(-1);s&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+i.raw,a.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(i),s=o.length!==t.length,t=t.substring(i.raw.length);continue}if(i=this.tokenizer.text(t)){t=t.substring(i.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+i.raw,a.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(i);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){this.tokenizer.lexer=this;let s=t,r=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(s))!==null;)c.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(s))!==null;)s=s.slice(0,r.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(s))!==null;)i=r[2]?r[2].length:0,s=s.slice(0,r.index+i)+"["+"a".repeat(r[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let o=!1,a="",l=1/0;for(;t;){if(t.length<l)l=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}o||(a=""),o=!1;let c;if(this.options.extensions?.inline?.some(h=>(c=h.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let h=n.at(-1);c.type==="text"&&h?.type==="text"?(h.raw+=c.raw,h.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,s,a)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t,s,a)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let d=t;if(this.options.extensions?.startInline){let h=1/0,f=t.slice(1),m;this.options.extensions.startInline.forEach(g=>{m=g.call({lexer:this},f),typeof m=="number"&&m>=0&&(h=Math.min(h,m))}),h<1/0&&h>=0&&(d=t.substring(0,h+1))}if(c=this.tokenizer.inlineText(d)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(a=c.raw.slice(-1)),o=!0;let h=n.at(-1);h?.type==="text"?(h.raw+=c.raw,h.text+=c.text):n.push(c);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return n}infiniteLoopError(t){let n="Infinite loop on byte: "+t;if(this.options.silent)console.error(n);else throw new Error(n)}},xo=class{options;parser;constructor(e){this.options=e||Gn}space(e){return""}code({text:e,lang:t,escaped:n}){let s=(t||"").match(Qe.notSpaceStart)?.[0],r=e.replace(Qe.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Mt(s)+'">'+(n?r:Mt(r,!0))+`</code></pre>
`:"<pre><code>"+(n?r:Mt(r,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,s="";for(let o=0;o<e.items.length;o++){let a=e.items[o];s+=this.listitem(a)}let r=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+r+i+`>
`+s+"</"+r+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let r=0;r<e.header.length;r++)n+=this.tablecell(e.header[r]);t+=this.tablerow({text:n});let s="";for(let r=0;r<e.rows.length;r++){let i=e.rows[r];n="";for(let o=0;o<i.length;o++)n+=this.tablecell(i[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Mt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let s=this.parser.parseInline(n),r=Ng(e);if(r===null)return s;e=r;let i='<a href="'+e+'"';return t&&(i+=' title="'+Mt(t)+'"'),i+=">"+s+"</a>",i}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));let r=Ng(e);if(r===null)return Mt(n);e=r;let i=`<img src="${e}" alt="${Mt(n)}"`;return t&&(i+=` title="${Mt(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Mt(e.text)}},rc=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},$t=class Kl{options;renderer;textRenderer;constructor(t){this.options=t||Gn,this.options.renderer=this.options.renderer||new xo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new rc}static parse(t,n){return new Kl(n).parse(t)}static parseInline(t,n){return new Kl(n).parseInline(t)}parse(t){this.renderer.parser=this;let n="";for(let s=0;s<t.length;s++){let r=t[s];if(this.options.extensions?.renderers?.[r.type]){let o=r,a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){n+=a||"";continue}}let i=r;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return n}parseInline(t,n=this.renderer){this.renderer.parser=this;let s="";for(let r=0;r<t.length;r++){let i=t[r];if(this.options.extensions?.renderers?.[i.type]){let a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=a||"";continue}}let o=i;switch(o.type){case"escape":{s+=n.text(o);break}case"html":{s+=n.html(o);break}case"link":{s+=n.link(o);break}case"image":{s+=n.image(o);break}case"checkbox":{s+=n.checkbox(o);break}case"strong":{s+=n.strong(o);break}case"em":{s+=n.em(o);break}case"codespan":{s+=n.codespan(o);break}case"br":{s+=n.br(o);break}case"del":{s+=n.del(o);break}case"text":{s+=n.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return s}},br=class{options;block;constructor(e){this.options=e||Gn}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?kt.lex:kt.lexInline}provideParser(e=this.block){return e?$t.parse:$t.parseInline}},cS=class{defaults=Gl();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=$t;Renderer=xo;TextRenderer=rc;Lexer=kt;Tokenizer=yo;Hooks=br;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{let r=s;for(let i of r.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of r.rows)for(let o of i)n=n.concat(this.walkTokens(o.tokens,t));break}case"list":{let r=s;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=s;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(i=>{let o=r[i].flat(1/0);n=n.concat(this.walkTokens(o,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let i=t.renderers[r.name];i?t.renderers[r.name]=function(...o){let a=r.renderer.apply(this,o);return a===!1&&(a=i.apply(this,o)),a}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[r.level];i?i.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),s.extensions=t),n.renderer){let r=this.defaults.renderer||new xo(this.defaults);for(let i in n.renderer){if(!(i in r))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,a=n.renderer[o],l=r[o];r[o]=(...c)=>{let d=a.apply(r,c);return d===!1&&(d=l.apply(r,c)),d||""}}s.renderer=r}if(n.tokenizer){let r=this.defaults.tokenizer||new yo(this.defaults);for(let i in n.tokenizer){if(!(i in r))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,a=n.tokenizer[o],l=r[o];r[o]=(...c)=>{let d=a.apply(r,c);return d===!1&&(d=l.apply(r,c)),d}}s.tokenizer=r}if(n.hooks){let r=this.defaults.hooks||new br;for(let i in n.hooks){if(!(i in r))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,a=n.hooks[o],l=r[o];br.passThroughHooks.has(i)?r[o]=c=>{if(this.defaults.async&&br.passThroughHooksRespectAsync.has(i))return(async()=>{let h=await a.call(r,c);return l.call(r,h)})();let d=a.call(r,c);return l.call(r,d)}:r[o]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await a.apply(r,c);return h===!1&&(h=await l.apply(r,c)),h})();let d=a.apply(r,c);return d===!1&&(d=l.apply(r,c)),d}}s.hooks=r}if(n.walkTokens){let r=this.defaults.walkTokens,i=n.walkTokens;s.walkTokens=function(o){let a=[];return a.push(i.call(this,o)),r&&(a=a.concat(r.call(this,o))),a}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return kt.lex(e,t??this.defaults)}parser(e,t){return $t.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let s={...n},r={...this.defaults,...s},i=this.onError(!!r.silent,!!r.async);if(this.defaults.async===!0&&s.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=e),r.async)return(async()=>{let o=r.hooks?await r.hooks.preprocess(t):t,a=await(r.hooks?await r.hooks.provideLexer(e):e?kt.lex:kt.lexInline)(o,r),l=r.hooks?await r.hooks.processAllTokens(a):a;r.walkTokens&&await Promise.all(this.walkTokens(l,r.walkTokens));let c=await(r.hooks?await r.hooks.provideParser(e):e?$t.parse:$t.parseInline)(l,r);return r.hooks?await r.hooks.postprocess(c):c})().catch(i);try{r.hooks&&(t=r.hooks.preprocess(t));let o=(r.hooks?r.hooks.provideLexer(e):e?kt.lex:kt.lexInline)(t,r);r.hooks&&(o=r.hooks.processAllTokens(o)),r.walkTokens&&this.walkTokens(o,r.walkTokens);let a=(r.hooks?r.hooks.provideParser(e):e?$t.parse:$t.parseInline)(o,r);return r.hooks&&(a=r.hooks.postprocess(a)),a}catch(o){return i(o)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let s="<p>An error occurred:</p><pre>"+Mt(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},Kn=new cS;Ae.options=Ae.setOptions=function(e){return Kn.setOptions(e),Ae.defaults=Kn.defaults,qg(Ae.defaults),Ae};Ae.getDefaults=Gl;Ae.defaults=Gn;Ae.use=function(...e){return Kn.use(...e),Ae.defaults=Kn.defaults,qg(Ae.defaults),Ae};Ae.walkTokens=function(e,t){return Kn.walkTokens(e,t)};Ae.parseInline=Kn.parseInline;Ae.Parser=$t;Ae.parser=$t.parse;Ae.Renderer=xo;Ae.TextRenderer=rc;Ae.Lexer=kt;Ae.lexer=kt.lex;Ae.Tokenizer=yo;Ae.Hooks=br;Ae.parse=Ae;uM=Ae.options,dM=Ae.setOptions,hM=Ae.use,pM=Ae.walkTokens,fM=Ae.parseInline,mM=$t.parse,gM=kt.lex});var nb,sb=y(()=>{tb();Hl();V();Ae.use({extensions:[{name:"wikiLink",level:"inline",start(e){return e.match(/\[\[/)?.index},tokenizer(e){let t=e.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);if(t)return{type:"wikiLink",raw:t[0],name:t[1].trim(),display:(t[2]||t[1]).trim()}},renderer(e){return`<a class="wiki-link" data-name="${e.name.replace(/"/g,"&quot;")}">${e.display}</a>`}}]});nb={tag:"uix-markdown",style:!0,class:"prose",properties:{content:u.string(),onWikiLink:u.function()},connected(){this._wikiClickHandler=e=>{let t=e.target.closest(".wiki-link");t&&this.onWikiLink&&(e.preventDefault(),this.onWikiLink(t.dataset.name))},this.addEventListener("click",this._wikiClickHandler)},disconnected(){this._wikiClickHandler&&(this.removeEventListener("click",this._wikiClickHandler),this._wikiClickHandler=null)},render(){return fo(Ae.parse(this.content||""))}}});var uS,rb,ib=y(()=>{V();H();uS={[String]:e=>e,[Boolean]:e=>e?p`<uix-icon name="check"></uix-icon>`:null},rb={tag:"uix-table",style:!0,dataQuery:!0,properties:{columns:u.array({defaultValue:[]}),rows:u.array({defaultValue:[]}),selectRow:u.function()},render(){return p`
      <table>
        <thead>
          <tr>
            ${this.columns.map(e=>p`
                <th>${e.name||e.label||e}</th>
              `)}
          </tr>
        </thead>
        <tbody>
          ${this.rows?.map(e=>p`
              <tr
                class=${this.selectRow?"clickable":""}
                @click=${this.selectRow?t=>this.selectRow(e,t):null}
              >
                ${this.columns.map(t=>{let n=typeof t=="string"?t:t.name,s=typeof t=="string"?"string":t.type;return p`
                    <td>
                      ${uS[s]?.call(null,e[n])??e[n]}
                    </td>
                  `})}
              </tr>
            `)}
        </tbody>
      </table>
    `}}});var ob,ab=y(()=>{H();V();ob={tag:"uix-tag",properties:{variant:u.string({defaultValue:"default",enum:["default","primary","secondary","success","warning","error","info"]}),size:u.string({defaultValue:"md",enum:["sm","md","lg"]}),outlined:u.boolean(!1),rounded:u.boolean(!0),closable:u.boolean(!1),disabled:u.boolean(!1)},style:!0,shadow:!0,handleClose(e){e.stopPropagation(),this.disabled||this.emit("close")},handleClick(e){this.disabled||this.emit("click",e)},render(){return p`
      <span
        part="container"
        class="tag ${this.outlined?"outlined":""} ${this.rounded?"rounded":""}"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot name="icon"></slot>
        <span part="label" class="tag-label">
          <slot></slot>
        </span>
        ${this.closable?p`
              <button
                part="close"
                class="tag-close"
                @click=${this.handleClose}
                ?disabled=${this.disabled}
                aria-label="Remove tag"
              >
                <uix-icon name="x" size="xs"></uix-icon>
              </button>
            `:""}
      </span>
    `}}});var lb,cb=y(()=>{V();H();lb={style:!0,properties:{size:u.string({defaultValue:"base",enum:["xs","sm","base","lg","xl","2xl","3xl"]}),weight:u.string({defaultValue:"normal",enum:["normal","medium","semibold","bold","black"]}),tracking:u.string({enum:["wide","wider"]}),color:u.string({enum:["primary","secondary","success","danger","warning","info","muted","inverse"]}),muted:u.boolean(!1),mono:u.boolean(!1),align:u.string({defaultValue:"left",enum:["left","center","right"]}),transform:u.string({enum:["capitalize","uppercase","lowercase","none"]}),as:u.string({defaultValue:"span",enum:["span","p","div"]})}}});var ub,db=y(()=>{V();H();ub={tag:"uix-alert",style:!0,shadow:!0,properties:{variant:u.string({defaultValue:"default",enum:["default","success","warning","error","info"]}),icon:u.string("")},_getIcon(e){let t={success:"circle-check",error:"circle-x",warning:"triangle-alert",info:"info",default:"info"};return this.icon||t[e]||t.default},render(){return p`
			<div part="alert" class="alert alert-${this.variant}" role="alert">
				<div part="icon" class="alert-icon">
					<uix-icon name=${this._getIcon(this.variant)}></uix-icon>
				</div>
				<div part="content" class="alert-content">
					<slot></slot>
				</div>
			</div>
		`}}});var hb,pb=y(()=>{V();H();hb={tag:"uix-progress-bar",properties:{value:u.number(0),max:u.number(100),variant:u.string({defaultValue:"default",enum:["default","success","danger","warning","info"]}),size:u.string({defaultValue:"md",enum:["sm","md","lg"]}),showLabel:u.boolean(!1),striped:u.boolean(!1),animated:u.boolean(!1)},style:!0,getPercentage(){return Math.min(100,Math.max(0,this.value/this.max*100))},render(){let e=this.getPercentage();return p`
      <div part="container" class="progress-container">
        <div
          part="bar"
          class="progress-bar"
          role="progressbar"
          aria-valuenow="${this.value}"
          aria-valuemin="0"
          aria-valuemax="${this.max}"
        >
          <div
            part="fill"
            class="progress-fill"
            style="width: ${e}%"
          >
            ${this.showLabel?p`<span part="label" class="progress-label"
                  >${Math.round(e)}%</span
                >`:""}
          </div>
        </div>
      </div>
    `}}});var fb,mb=y(()=>{V();H();fb={tag:"uix-spinner",properties:{variant:u.string({defaultValue:"circular",enum:["circular","dots","bars"]}),size:u.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),primary:u.boolean(),secondary:u.boolean(),success:u.boolean(),danger:u.boolean(),warning:u.boolean(),info:u.boolean()},style:!0,render(){return this.variant==="circular"?p``:this.variant==="dots"?p`
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      `:this.variant==="bars"?p`
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      `:p``}}});var gb,bb,yb=y(()=>{H();V();gb=()=>`uix-checkbox-${Math.random().toString(36).slice(2,9)}`,bb={tag:"uix-checkbox",properties:{id:u.string(),label:u.string(),checked:u.boolean(!1),value:u.string(""),name:u.string(""),disabled:u.boolean(!1),required:u.boolean(!1),indeterminate:u.boolean(!1),size:u.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),variant:u.string({defaultValue:"primary",enum:["primary","secondary","success","warning","error"]})},style:!0,formAssociated:!0,connected(){this._internals||(this._internals=this.attachInternals()),this._updateFormValue(),!this.id&&!this._checkboxId&&(this._checkboxId=gb())},get checkboxId(){return this.id||this._checkboxId||(this._checkboxId=gb())},updated({changedProps:e}){if(e.has("checked")&&this._updateFormValue(),e.has("indeterminate")){let t=this.querySelector("input");t&&(t.indeterminate=this.indeterminate)}},_updateFormValue(){this._internals&&this._internals.setFormValue(this.checked?this.value||"on":null)},handleChange(e){e.stopPropagation(),this.checked=e.target.checked,this.indeterminate=!1,this._updateFormValue(),this.emit("change",{checked:this.checked,value:this.value})},render(){let e=this.checkboxId;return p`
      <input
        type="checkbox"
        id=${e}
        class="checkbox"
        ?checked=${this.checked}
        .indeterminate=${this.indeterminate}
        value=${this.value}
        name=${this.name}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @change=${this.handleChange.bind(this)}
      />
      ${this.label?p`<uix-label inline for=${e} text=${this.label} ?required=${this.required}></uix-label>`:""}
    `}}});import{Compartment as dS,Decoration as xr,EditorState as ko,EditorView as pt,SearchCursor as xb,SearchQuery as vb,StateEffect as $o,StateField as hS,Table as pS,css as fS,cursorCharLeft as mS,cursorCharRight as gS,cursorGroupBackward as bS,cursorGroupForward as yS,cursorLineDown as xS,cursorLineEnd as vS,cursorLineStart as wS,cursorLineUp as kS,defaultKeymap as $S,deleteCharBackward as SS,deleteCharForward as _S,deleteGroupBackward as AS,deleteGroupForward as CS,gruvboxDark as ES,highlightSpecialChars as RS,history as IS,historyKeymap as TS,html as PS,indentUnit as MS,indentWithTab as jS,javascript as FS,keymap as DS,lineNumbers as OS,markdown as LS,selectAll as zS,transposeChars as US}from"/node_modules/@bootstrapp/uix/form/codemirror.js";var wb,kb,$b=y(()=>{V();wb={javascript:FS,css:fS,html:PS,markdown:LS},kb={tag:"textarea",class:"flex flex-grow",style:!0,properties:{content:u.string(),language:u.string(),onUpdate:u.function(),onCursorChange:u.function(),onFocus:u.function(),onBlur:u.function(),path:u.string(),cursor:u.number({sync:"local",scope:"path"}),readonly:u.boolean(!1),lineNumber:u.boolean(!0),findMatches:u.array([]),currentFindIndex:u.number(-1),findDecorations:u.array([]),extraExtensions:u.array({defaultValue:[]}),indentStyle:u.string({defaultValue:"space"}),indentSize:u.number({defaultValue:2})},isUpdatingFromOutside:!1,setCursorPosition(e){if(this.view&&e!=null){let t=this.view.state.doc.length,n=Math.min(Math.max(0,e),t);this.view.dispatch({selection:{anchor:n},scrollIntoView:!0})}},goToLine(e){if(this.view)try{let t=this.view.state.doc.line(e);this.view.dispatch({selection:{anchor:t.from},effects:pt.scrollIntoView(t.from,{y:"center"})}),this.view.focus()}catch(t){console.warn(`Could not go to line ${e}`,t)}},insertTextAtCursor(e){if(!this.view){console.warn("Editor view not available. Cannot insert text.");return}this.view.dispatch({changes:{from:this.view.state.selection.main.from,to:this.view.state.selection.main.to,insert:e},selection:{anchor:this.view.state.selection.main.from+e.length}}),this.view.focus()},createSearchQuery(e,t={}){if(!e)return null;this.SearchQuery||(this.SearchQuery=vb);try{return new this.SearchQuery({search:e,caseSensitive:t.matchCase||!1,regexp:t.useRegex||!1,wholeWord:t.wholeWord||!1})}catch(n){return console.error("Invalid search query:",n),null}},find(e,t={}){if(!this.view||!e)return{currentMatch:0,totalMatches:0};this.SearchCursor||(this.SearchCursor=xb);let n=this.createSearchQuery(e,t);if(console.log({searchQuery:n}),!n)return{currentMatch:0,totalMatches:0};this.clearFindDecorations();let s=this.view.state.doc,r=[],i=new this.SearchCursor(s,e,0,s.length);for(;!i.done;){let c=i.next();c.done||r.push({from:c.value.from,to:c.value.to})}if(this.findMatches=r,r.length===0)return this.currentFindIndex=-1,{currentMatch:0,totalMatches:0};let o=this.view.state.selection.main.head,a=0,l=Number.POSITIVE_INFINITY;if(r.forEach((c,d)=>{let h=Math.abs(c.from-o);h<l&&(l=h,a=d)}),this.currentFindIndex=a,this.addFindDecorations(),r[this.currentFindIndex]){let c=r[this.currentFindIndex];this.view.dispatch({selection:{anchor:c.from,head:c.to},effects:pt.scrollIntoView(c.from,{y:"center"})})}return{currentMatch:this.currentFindIndex+1,totalMatches:r.length}},addFindDecorations(){if(!this.view)return;this.Decoration||(this.Decoration=xr),this.StateEffect||(this.StateEffect=$o);let e=this.findMatches.map((t,n)=>{let s=n===this.currentFindIndex;return this.Decoration.mark({class:s?"cm-searchMatch-current":"cm-searchMatch"}).range(t.from,t.to)});e.length>0&&this.view.dispatch({effects:this.addDecorations.of(e)})},findNext(e,t={}){if(!this.view||this.findMatches.length===0)return this.find(e,t);this.currentFindIndex=(this.currentFindIndex+1)%this.findMatches.length;let n=this.findMatches[this.currentFindIndex];return this.view.dispatch({selection:{anchor:n.from,head:n.to},effects:pt.scrollIntoView(n.from,{y:"center"})}),{currentMatch:this.currentFindIndex+1,totalMatches:this.findMatches.length}},findPrevious(e,t={}){if(!this.view||this.findMatches.length===0)return this.find(e,t);this.currentFindIndex=this.currentFindIndex-1,this.currentFindIndex<0&&(this.currentFindIndex=this.findMatches.length-1);let n=this.findMatches[this.currentFindIndex];return this.view.dispatch({selection:{anchor:n.from,head:n.to},effects:pt.scrollIntoView(n.from,{y:"center"})}),{currentMatch:this.currentFindIndex+1,totalMatches:this.findMatches.length}},replaceNext(e,t,n={}){if(!this.view||this.findMatches.length===0||this.currentFindIndex<0)return this.find(e,n);let s=this.findMatches[this.currentFindIndex];this.view.dispatch({changes:{from:s.from,to:s.to,insert:t}});let r=this.find(e,n);return r.totalMatches>0?this.findNext(e,n):r},replaceAll(e,t,n={}){if(!this.view||(this.find(e,n),this.findMatches.length===0))return 0;let s=this.findMatches.length,r=[...this.findMatches].reverse().map(i=>({from:i.from,to:i.to,insert:t}));return this.view.dispatch({changes:r}),this.clearFindDecorations(),s},clearFindDecorations(){this.view&&this.clearDecorations&&this.view.dispatch({effects:this.clearDecorations.of(null)}),this.findMatches=[],this.currentFindIndex=-1},beginningOfLine(){this.view&&wS(this.view)},endOfLine(){this.view&&vS(this.view)},nextLine(){this.view&&xS(this.view)},previousLine(){this.view&&kS(this.view)},forwardChar(){this.view&&gS(this.view)},backwardChar(){this.view&&mS(this.view)},forwardWord(){this.view&&yS(this.view)},backwardWord(){this.view&&bS(this.view)},deleteChar(){this.view&&_S(this.view)},deleteCharBack(){this.view&&SS(this.view)},deleteWord(){this.view&&CS(this.view)},backwardDeleteWord(){this.view&&AS(this.view)},transposeChars(){this.view&&US(this.view)},selectAllText(){this.view&&zS(this.view)},async killLine(){if(!this.view)return;let e=this.view.state,t=e.selection.main,n=e.doc.lineAt(t.head),s=t.head,r=n.to;if(s===r&&n.number<e.doc.lines){let i=e.doc.sliceString(s,r+1);await navigator.clipboard.writeText(i),this.view.dispatch({changes:{from:s,to:r+1}})}else{let i=e.doc.sliceString(s,r);await navigator.clipboard.writeText(i),this.view.dispatch({changes:{from:s,to:r}})}},async yank(){if(this.view)try{let e=await navigator.clipboard.readText();this.insertTextAtCursor(e)}catch(e){console.warn("Failed to read clipboard:",e)}},async copyRegion(){if(!this.view)return;let e=this.view.state.selection.main;if(e.empty)return;let t=this.view.state.doc.sliceString(e.from,e.to);await navigator.clipboard.writeText(t)},async killRegion(){if(!this.view)return;let e=this.view.state.selection.main;if(e.empty)return;let t=this.view.state.doc.sliceString(e.from,e.to);await navigator.clipboard.writeText(t),this.view.dispatch({changes:{from:e.from,to:e.to}})},setMark(){if(!this.view)return;let e=this.view.state.selection.main.head;this._markPosition=e,this.view.dispatch({selection:{anchor:e,head:e}})},cancel(){if(!this.view)return;this._markPosition=null;let e=this.view.state.selection.main.head;this.view.dispatch({selection:{anchor:e,head:e}})},getLanguageFromPath(e){if(!e)return null;let t=e.split(".").pop()?.toLowerCase();return{js:"javascript",jsx:"javascript",mjs:"javascript",cjs:"javascript",css:"css",html:"html",htm:"html",md:"markdown",mdx:"markdown",json:"javascript"}[t]||null},connected(){let e=this;if(!e||this.view)return;this.EditorView=pt,this.EditorState=ko,this.Decoration=xr,this.StateEffect=$o,this.SearchQuery=vb,this.SearchCursor=xb,this.addDecorations=$o.define(),this.clearDecorations=$o.define();let t=hS.define({create(){return xr.none},update(h,f){for(let m of f.effects)m.is(this.addDecorations)&&(h=xr.set(m.value)),m.is(this.clearDecorations)&&(h=xr.none);return h},provide:h=>pt.decorations.from(h)}),n=this.language||this.getLanguageFromPath(this.path),s=[];if(n&&wb[n]){let h=wb[n];typeof h=="function"?n==="markdown"?s.push(h({extensions:[pS]})):s.push(h()):console.warn(`CodeMirror language function for "${n}" not found.`)}let r=pt.updateListener.of(h=>{if(h.docChanged&&this.onUpdate){let f=h.state.doc.toString();this.isUpdatingFromOutside=!0,this.onUpdate(f),queueMicrotask(()=>{this.isUpdatingFromOutside=!1})}if(h.selectionSet){let f=h.state.selection.main.head;if(f!==this.cursor&&(this.cursor=f),this.onCursorChange){let g=h.state.doc.lineAt(f);this.onCursorChange({line:g.number,column:f-g.from+1,position:f})}}}),i=pt.theme({".cm-editor":{fontSize:"12px"}}),o=pt.theme({".cm-searchMatch":{backgroundColor:"rgba(234, 92, 0, 0.3)"},".cm-searchMatch-current":{backgroundColor:"rgba(250, 189, 47, 0.5)",outline:"1px solid rgba(250, 189, 47, 0.8)"}}),a=pt.domEventHandlers({focus:()=>{this.cursor!=null&&this.setCursorPosition(this.cursor),this.onFocus&&this.onFocus()},blur:()=>{this.onBlur&&this.onBlur()}});this._extraCompartment=new dS;let l=[...this.lineNumber?[OS()]:[],RS(),IS(),DS.of([...$S,...TS,jS]),ES,i,o,pt.lineWrapping,...s,r,t,a,MS.of(this.indentStyle==="tab"?"	":" ".repeat(this.indentSize)),ko.tabSize.of(this.indentSize),ko.readOnly.of(this.readonly),this._extraCompartment.of(this.extraExtensions||[])],d={state:ko.create({doc:this.content||"",extensions:l}),parent:e,root:this.getRootNode()};this.view=new pt(d),this.readonly||this.view.focus(),this.setCursorPosition(this.cursor)},updated({changedProps:e}){if(this.view&&e.has("content")&&!this.isUpdatingFromOutside){let t=this.view.state.doc.toString();if(t!==this.content){let n=this.view.state.selection.main.head;this.view.dispatch({changes:{from:0,to:t.length,insert:this.content||""},selection:{anchor:Math.min(n,(this.content||"").length)}})}}if(this.view&&e.has("extraExtensions")&&this._extraCompartment&&this.view.dispatch({effects:this._extraCompartment.reconfigure(this.extraExtensions||[])}),this.view&&e.has("cursor")&&!this.isUpdatingFromOutside){let t=this.view.state.selection.main.head;this.cursor!=null&&this.cursor!==t&&this.setCursorPosition(this.cursor)}},disconnected(){this.view&&(this.view.destroy(),this.view=null),this.EditorView=null,this.EditorState=null,this.Decoration=null,this.StateEffect=null,this.SearchQuery=null,this.SearchCursor=null,this.addDecorations=null,this.clearDecorations=null,this._extraCompartment=null}}});var Sb,_b=y(()=>{V();H();Sb={tag:"uix-form-control",properties:{label:u.string(""),hint:u.string(""),error:u.string(""),required:u.boolean(!1),disabled:u.boolean(!1),orientation:u.string({defaultValue:"vertical",enum:["vertical","horizontal"]}),controlId:u.string("")},shadow:!0,connected(){this.controlId=`form-control-${Math.random().toString(36).substr(2,9)}`,this._associateLabel()},updated(){this._associateLabel()},_associateLabel(){let e=this.querySelector("input, textarea, select, uix-input, uix-textarea, uix-select, uix-number-input, uix-slider");e&&(e.id=this.controlId,this.disabled&&(e.disabled=!0),this.required&&(e.required=!0))},render(){return p`
      <div part="container" class="form-control ${this.error?"has-error":""}">
        ${this.label?p`
              <label part="label" class="form-control-label" for=${this.controlId}>
                ${this.label}
                ${this.required?p`<span part="required" class="form-control-required">*</span>`:""}
              </label>
            `:""}

        <div part="input" class="form-control-input">
          <slot></slot>
        </div>

        ${this.hint&&!this.error?p`<div part="hint" class="form-control-hint">${this.hint}</div>`:""}

        ${this.error?p`<div part="error" class="form-control-error">${this.error}</div>`:""}
      </div>
    `}}});var So,Ab,NS,Cb,Eb=y(()=>{H();V();So={common:["star","heart","house","settings","search","plus","minus","check","x","eye","bell","bookmark","flag","pin","zap","flame","sparkles","crown","gem","trophy","target","crosshair","compass","map","navigation","globe","sun","moon","cloud"],files:["file","file-text","file-code","file-image","file-audio","file-video","folder","folder-open","folder-plus","archive","clipboard","copy","scissors","save","download","upload","paperclip","link","external-link"],communication:["mail","inbox","send","circle-message","message-square","phone","video","at-sign","hash","share","rss","radio","podcast","megaphone"],media:["image","camera","film","music","headphones","mic","volume-2","play","pause","square","circle","tv","monitor","smartphone","tablet"],people:["user","users","user-plus","user-check","contact","smile","frown","thumbs-up","thumbs-down","hand","brain","graduation-cap"],development:["code","terminal","bug","git-branch","git-commit","git-merge","database","server","cpu","hard-drive","wifi","bluetooth","key","lock","unlock","shield"],business:["briefcase","building","store","wallet","credit-card","banknote","receipt","chart-bar","chart-line","chart-pie","trending-up","trending-down","calendar","clock","timer","alarm-clock"],objects:["book","book-open","notebook","pen","pencil","highlighter","lamp","lightbulb","wrench","hammer","paint-bucket","palette","ruler","package","gift","shopping-bag","shopping-cart","tag","tags"],health:["heart-pulse","activity","dumbbell","apple","bike","footprints","pill","stethoscope","thermometer","bed","baby","dog","cat","fish"],arrows:["arrow-up","arrow-down","arrow-left","arrow-right","chevron-up","chevron-down","chevron-left","chevron-right","move","maximize","minimize","refresh-cw","rotate-cw","repeat"],layout:["layout-dashboard","layout-grid","layout-list","kanban","columns","rows","table","list","list-todo","list-checks","square-check","circle-check","circle-dot","filter","sliders","menu","sidebar"]},Ab=[{char:"\u{1F600}",name:"grinning"},{char:"\u{1F602}",name:"joy"},{char:"\u{1F60D}",name:"heart eyes"},{char:"\u{1F973}",name:"party"},{char:"\u{1F60E}",name:"cool"},{char:"\u{1F914}",name:"thinking"},{char:"\u{1F44D}",name:"thumbs up"},{char:"\u{1F44E}",name:"thumbs down"},{char:"\u{1F44B}",name:"wave"},{char:"\u270C\uFE0F",name:"peace"},{char:"\u{1F64C}",name:"raised hands"},{char:"\u{1F4AA}",name:"muscle"},{char:"\u2764\uFE0F",name:"red heart"},{char:"\u{1F49B}",name:"yellow heart"},{char:"\u{1F499}",name:"blue heart"},{char:"\u{1F49A}",name:"green heart"},{char:"\u{1F49C}",name:"purple heart"},{char:"\u{1F5A4}",name:"black heart"},{char:"\u2B50",name:"star"},{char:"\u{1F31F}",name:"glowing star"},{char:"\u2728",name:"sparkles"},{char:"\u{1F525}",name:"fire"},{char:"\u{1F4A1}",name:"light bulb"},{char:"\u26A1",name:"lightning"},{char:"\u{1F3AF}",name:"target"},{char:"\u{1F3C6}",name:"trophy"},{char:"\u{1F947}",name:"gold medal"},{char:"\u{1F389}",name:"party popper"},{char:"\u{1F38A}",name:"confetti"},{char:"\u{1F381}",name:"gift"},{char:"\u{1F4CC}",name:"pin"},{char:"\u{1F4CE}",name:"paperclip"},{char:"\u270F\uFE0F",name:"pencil"},{char:"\u{1F4DD}",name:"memo"},{char:"\u{1F4C4}",name:"document"},{char:"\u{1F4C2}",name:"folder"},{char:"\u{1F4DA}",name:"books"},{char:"\u{1F4D6}",name:"open book"},{char:"\u{1F4D5}",name:"red book"},{char:"\u{1F4BB}",name:"laptop"},{char:"\u{1F5A5}\uFE0F",name:"desktop"},{char:"\u{1F4F1}",name:"phone"},{char:"\u2328\uFE0F",name:"keyboard"},{char:"\u{1F5B1}\uFE0F",name:"mouse"},{char:"\u{1F512}",name:"locked"},{char:"\u{1F511}",name:"key"},{char:"\u{1F514}",name:"bell"},{char:"\u{1F4E3}",name:"megaphone"},{char:"\u{1F4AC}",name:"speech"},{char:"\u{1F4AD}",name:"thought"},{char:"\u{1F4E7}",name:"email"},{char:"\u{1F3E0}",name:"house"},{char:"\u{1F3E2}",name:"office"},{char:"\u{1F3EB}",name:"school"},{char:"\u{1F3E6}",name:"bank"},{char:"\u{1F3E5}",name:"hospital"},{char:"\u{1F3EA}",name:"store"},{char:"\u{1F680}",name:"rocket"},{char:"\u2708\uFE0F",name:"airplane"},{char:"\u{1F697}",name:"car"},{char:"\u{1F6B2}",name:"bicycle"},{char:"\u{1F3C3}",name:"runner"},{char:"\u{1F9D8}",name:"yoga"},{char:"\u{1F3CB}\uFE0F",name:"weightlifting"},{char:"\u26BD",name:"soccer"},{char:"\u{1F3AE}",name:"gaming"},{char:"\u{1F3B5}",name:"music"},{char:"\u{1F3AC}",name:"cinema"},{char:"\u{1F3A8}",name:"art"},{char:"\u{1F4F8}",name:"camera"},{char:"\u{1F3A4}",name:"microphone"},{char:"\u{1F3A7}",name:"headphones"},{char:"\u{1F4B0}",name:"money bag"},{char:"\u{1F4B5}",name:"dollar"},{char:"\u{1F4B3}",name:"credit card"},{char:"\u{1F4CA}",name:"chart"},{char:"\u{1F4C8}",name:"chart up"},{char:"\u{1F4C9}",name:"chart down"},{char:"\u23F0",name:"alarm clock"},{char:"\u{1F4C5}",name:"calendar"},{char:"\u23F3",name:"hourglass"},{char:"\u{1F30D}",name:"earth"},{char:"\u{1F308}",name:"rainbow"},{char:"\u2600\uFE0F",name:"sun"},{char:"\u{1F319}",name:"moon"},{char:"\u2601\uFE0F",name:"cloud"},{char:"\u{1F30A}",name:"wave water"},{char:"\u{1F331}",name:"seedling"},{char:"\u{1F333}",name:"tree"},{char:"\u{1F338}",name:"blossom"},{char:"\u{1F34E}",name:"apple"},{char:"\u{1F355}",name:"pizza"},{char:"\u2615",name:"coffee"},{char:"\u{1F37A}",name:"beer"},{char:"\u{1F9EA}",name:"test tube"},{char:"\u{1F52C}",name:"microscope"},{char:"\u{1F9E0}",name:"brain"},{char:"\u{1F441}\uFE0F",name:"eye"},{char:"\u{1F9BE}",name:"robot arm"},{char:"\u{1F436}",name:"dog"},{char:"\u{1F431}",name:"cat"},{char:"\u{1F426}",name:"bird"},{char:"\u{1F98B}",name:"butterfly"},{char:"\u{1F420}",name:"fish"},{char:"\u{1F98A}",name:"fox"},{char:"\u2705",name:"check mark"},{char:"\u274C",name:"cross mark"},{char:"\u26A0\uFE0F",name:"warning"},{char:"\u2139\uFE0F",name:"info"},{char:"\u2753",name:"question"},{char:"\u{1F48E}",name:"gem"},{char:"\u{1F527}",name:"wrench"},{char:"\u2699\uFE0F",name:"gear"},{char:"\u{1F6E1}\uFE0F",name:"shield"},{char:"\u{1F5C2}\uFE0F",name:"dividers"},{char:"\u{1F5C3}\uFE0F",name:"card box"},{char:"\u{1F5D1}\uFE0F",name:"trash"},{char:"\u{1F4CB}",name:"clipboard"},{char:"\u{1F4E6}",name:"package"},{char:"\u{1F3F7}\uFE0F",name:"label"},{char:"\u{1F517}",name:"link"},{char:"\u{1F50D}",name:"magnifier"},{char:"\u{1F4A4}",name:"sleep"}],NS={common:"Common",files:"Files",communication:"Chat",media:"Media",people:"People",development:"Dev",business:"Business",objects:"Objects",health:"Health",arrows:"Arrows",layout:"Layout"},Cb={tag:"uix-icon-picker",style:!0,extends:"uix-popover-controller",properties:{value:u.string({defaultValue:""}),tab:u.string({defaultValue:"icon"}),search:u.string({defaultValue:""}),category:u.string({defaultValue:"common"})},render(){let e=Object.keys(So),t=this._getFilteredIcons(),n=this._getFilteredEmoji();return p`
      <div class="picker-container">
        <!-- Tabs -->
        <div class="picker-tabs">
          <button
            class="picker-tab ${this.tab==="icon"?"active":""}"
            @click=${()=>{this.tab="icon"}}
          >Icons</button>
          <button
            class="picker-tab ${this.tab==="emoji"?"active":""}"
            @click=${()=>{this.tab="emoji"}}
          >Emoji</button>
        </div>

        <!-- Search -->
        <div class="picker-search">
          <input
            type="text"
            placeholder=${this.tab==="icon"?"Search icons...":"Search emoji..."}
            .value=${this.search}
            @input=${s=>{this.search=s.target.value}}
          />
        </div>

        ${this.tab==="icon"?p`
          <!-- Category pills -->
          ${this.search?"":p`
            <div class="picker-categories">
              ${e.map(s=>p`
                <button
                  class="category-pill ${this.category===s?"active":""}"
                  @click=${()=>{this.category=s}}
                >${NS[s]||s}</button>
              `)}
            </div>
          `}

          <!-- Icon grid -->
          <div class="picker-grid">
            ${t.map(s=>p`
              <button
                class="picker-cell ${this.value===s?"selected":""}"
                title=${s}
                @click=${()=>this._select(s)}
              >
                <uix-icon name=${s} size="18"></uix-icon>
              </button>
            `)}
            ${t.length===0?p`<div class="picker-empty">No icons found</div>`:""}
          </div>
        `:p`
          <!-- Emoji grid -->
          <div class="picker-grid emoji-grid">
            ${n.map(s=>p`
              <button
                class="picker-cell emoji-cell ${this.value===s.char?"selected":""}"
                title=${s.name}
                @click=${()=>this._select(s.char)}
              >${s.char}</button>
            `)}
            ${n.length===0?p`<div class="picker-empty">No emoji found</div>`:""}
          </div>
        `}
      </div>
    `},_getFilteredIcons(){if(this.search){let e=this.search.toLowerCase();return Object.values(So).flat().filter(n=>n.includes(e))}return So[this.category]||So.common},_getFilteredEmoji(){if(!this.search)return Ab;let e=this.search.toLowerCase();return Ab.filter(t=>t.name.includes(e)||t.char===e)},_select(e){this.value=e,this.dispatchEvent(new CustomEvent("change",{detail:{value:e},bubbles:!0})),this.search="",this._close()}}});var Rb,Ib,Tb=y(()=>{V();H();Rb=()=>`uix-input-${Math.random().toString(36).slice(2,9)}`,Ib={tag:"uix-input",properties:{label:u.string(),name:u.string(),id:u.string(),value:u.string(""),placeholder:u.string(""),type:u.string({defaultValue:"text",enum:["text","email","tel","url","search","password"]}),size:u.string({enum:["xs","sm","md","lg","xl"]}),disabled:u.boolean(!1),readonly:u.boolean(!1),required:u.boolean(!1),error:u.boolean(!1),fullWidth:u.boolean(!1),variant:u.string({defaultValue:"default",enum:["default","primary","secondary","success","warning","error"]})},style:!0,shadow:!1,connected(){!this.id&&!this._inputId&&(this._inputId=Rb())},getInputId(){return this.id||this._inputId||(this._inputId=Rb())},handleInput(e){e.stopPropagation(),this.value=e.target.value,this.emit("input",{value:this.value})},handleChange(e){e.stopPropagation(),this.value=e.target.value,this.emit("change",{value:this.value})},render(){let e=this.getInputId();return p`
      ${this.label?p`<uix-label for=${e} text=${this.label} ?required=${this.required}></uix-label>`:""}
      <input
        id=${e}
        name=${this.name??e}
        class="input"
        type=${this.type}
        value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        @input=${this.handleInput.bind(this)}
        @change=${this.handleChange.bind(this)}
      />
    `}}});var Pb,Mb=y(()=>{V();Pb={tag:"uix-join",properties:{orientation:u.string({defaultValue:"horizontal",enum:["horizontal","vertical"]})},style:!0}});var jb,Fb=y(()=>{V();H();jb={tag:"uix-label",properties:{for:u.string(),text:u.string(),required:u.boolean(!1),inline:u.boolean(!1)},style:!0,shadow:!1,render(){return p`
      <label class="label" for=${this.for||""}>${this.text}${this.required?p`<span class="label-required">*</span>`:""}</label>
    `}}});var Db,Ob=y(()=>{V();H();Db={tag:"uix-number-input",properties:{value:u.number({defaultValue:0}),min:u.number({defaultValue:null}),max:u.number({defaultValue:null}),step:u.number({defaultValue:1}),placeholder:u.string(""),size:u.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),disabled:u.boolean(!1),readonly:u.boolean(!1),required:u.boolean(!1),showButtons:u.boolean(!0)},style:!0,shadow:!1,formAssociated:!0,connected(){this._internals||(this._internals=this.attachInternals()),this._updateFormValue()},_updateFormValue(){this._internals&&this._internals.setFormValue(this.value?.toString()||"")},handleInput(e){e.stopPropagation();let t=e.target.value;this.value=t===""?null:parseFloat(t),this._updateFormValue(),this.emit("input",{value:this.value})},handleChange(e){e.stopPropagation();let t=e.target.value;this.value=t===""?null:parseFloat(t),this._updateFormValue(),this.emit("change",{value:this.value})},increment(){if(this.disabled||this.readonly)return;let e=(this.value||0)+this.step;(this.max===null||e<=this.max)&&(this.value=e,this._updateFormValue(),this.emit("change",{value:this.value}))},decrement(){if(this.disabled||this.readonly)return;let e=(this.value||0)-this.step;(this.min===null||e>=this.min)&&(this.value=e,this._updateFormValue(),this.emit("change",{value:this.value}))},render(){let e={};return this.min!==null&&(e.min=this.min),this.max!==null&&(e.max=this.max),p`
      <div class="number-input-wrapper">
        <input
          type="number"
          class="number-input"
          .value=${this.value?.toString()||""}
          placeholder=${this.placeholder}
          step=${this.step}
          ...${e}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          @input=${this.handleInput.bind(this)}
          @change=${this.handleChange.bind(this)}
        />
        ${this.showButtons?p`
              <div class="number-input-buttons">
                <button
                  type="button"
                  class="number-input-button increment"
                  ?disabled=${this.disabled||this.readonly}
                  @click=${this.increment}
                  tabindex="-1"
                >
                  <uix-icon name="chevron-up"></uix-icon>
                </button>
                <button
                  type="button"
                  class="number-input-button decrement"
                  ?disabled=${this.disabled||this.readonly}
                  @click=${this.decrement}
                  tabindex="-1"
                >
                  <uix-icon name="chevron-down"></uix-icon>
                </button>
              </div>
            `:""}
      </div>
    `}}});var Lb,zb=y(()=>{V();H();Lb={tag:"uix-radio",properties:{checked:u.boolean(!1),value:u.string(""),name:u.string(""),label:u.string(""),disabled:u.boolean(!1),required:u.boolean(!1),size:u.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),variant:u.string({defaultValue:"primary",enum:["primary","secondary","success","warning","error"]})},style:!0,shadow:!1,handleChange(e){this.checked=e.target.checked,this.emit("change",{checked:this.checked,value:this.value}),this.checked&&this.name&&document.querySelectorAll(`uix-radio[name="${this.name}"]`).forEach(n=>{n!==this&&n.checked&&(n.checked=!1)})},render(){return p`
      <label class="radio-wrapper">
        <input
          type="radio"
          class="radio"
          .checked=${this.checked}
          .value=${this.value}
          name=${this.name}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @change=${this.handleChange.bind(this)}
        />
        ${this.label?p`<span class="radio-label">${this.label}</span>`:""}
      </label>
    `}}});var Ub,Nb=y(()=>{V();H();Ub={tag:"uix-radio-group",properties:{value:u.string(""),name:u.string(""),disabled:u.boolean(!1),required:u.boolean(!1),orientation:u.string({defaultValue:"vertical",enum:["vertical","horizontal"]}),size:u.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),variant:u.string({defaultValue:"primary",enum:["primary","secondary","success","warning","error"]})},style:!0,shadow:!0,formAssociated:!0,connected(){this._internals||(this._internals=this.attachInternals()),this._updateFormValue(),this._syncRadios()},updated({changedProps:e}){(e.has("value")||e.has("name"))&&(this._syncRadios(),this._updateFormValue()),(e.has("size")||e.has("variant")||e.has("disabled"))&&this._syncRadios()},_updateFormValue(){this._internals&&this._internals.setFormValue(this.value||null)},_syncRadios(){this.querySelectorAll("uix-radio").forEach(t=>{this.name&&(t.name=this.name),this.size&&(t.size=this.size),this.variant&&(t.variant=this.variant),t.disabled=this.disabled||t.hasAttribute("disabled"),t.checked=t.value===this.value})},handleSlotChange(){this._syncRadios(),this.querySelectorAll("uix-radio").forEach(t=>{t.addEventListener("change",n=>{n.detail.checked&&(this.value=n.detail.value,this._updateFormValue(),this.emit("change",{value:this.value}))})})},render(){return p`
      <div part="container" class="radio-group" role="radiogroup">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}}});var Vb,Bb,Wb=y(()=>{H();V();Vb=()=>`uix-select-${Math.random().toString(36).slice(2,9)}`,Bb={tag:"uix-select",style:!0,formAssociated:!0,properties:{id:u.string(),value:u.string(),disabled:u.boolean(),required:u.boolean(),placeholder:u.string(),name:u.string(),label:u.string(),options:u.array({defaultValue:[]}),searchable:u.boolean(),open:u.boolean({attribute:!1}),search:u.string({attribute:!1,defaultValue:""}),highlightIndex:u.number({attribute:!1,defaultValue:-1}),variant:u.string({defaultValue:"default",enum:["default","primary","secondary","success","warning","error"]})},formResetCallback(){let e=this.querySelector("select");e&&(e.value=this._defaultValue||"",this.value=e.value)},formDisabledCallback(e){let t=this.querySelector("select");t&&(t.disabled=e)},formStateRestoreCallback(e){let t=this.querySelector("select");t&&(t.value=e),this.value=e},reportValidity(){let e=this.querySelector("select");if(!e)return!0;let t=e.reportValidity()!==!1;return e?.classList.toggle("input-error",!t),t},connected(){this._internals||(this._internals=this.attachInternals()),this._defaultValue=this.value,!this.id&&!this._selectId&&(this._selectId=Vb()),this._onDocClick=e=>{this.open&&!this.contains(e.target)&&(this.open=!1,this.search="")},document.addEventListener("click",this._onDocClick)},disconnected(){document.removeEventListener("click",this._onDocClick)},get selectId(){return this.id||this._selectId||(this._selectId=Vb())},_getLabel(e){return e?.label??e},_getValue(e){return e?.value??e},_getSelectedLabel(){if(!this.value)return"";let e=this.options.find(t=>this._getValue(t)===this.value);return e?this._getLabel(e):this.value},_getFilteredOptions(){if(!this.search)return this.options;let e=this.search.toLowerCase();return this.options.filter(t=>this._getLabel(t).toLowerCase().includes(e))},_onSearchInput(e){e.stopPropagation(),this.search=e.target.value,this.highlightIndex=0,this.open||(this.open=!0),!this.search&&!this.value&&(this.open=!1)},_onSearchFocus(){this.open=!0,this.search=""},_onSearchKeydown(e){let t=this._getFilteredOptions();e.key==="ArrowDown"?(e.preventDefault(),this.highlightIndex=Math.min(this.highlightIndex+1,t.length-1)):e.key==="ArrowUp"?(e.preventDefault(),this.highlightIndex=Math.max(this.highlightIndex-1,0)):e.key==="Enter"&&this.highlightIndex>=0&&t[this.highlightIndex]?(e.preventDefault(),this._selectOption(t[this.highlightIndex])):e.key==="Escape"&&(this.open=!1,this.search="")},_selectOption(e){this.value=this._getValue(e),this.open=!1,this.search="",this._internals?.setFormValue(this.value),this.emit("input",{value:this.value}),this.emit("change",{value:this.value})},_onInput(e){e.stopPropagation(),this.value=e.target.value,this._internals?.setFormValue(this.value),this.emit("input",{value:this.value})},_onChange(e){e.stopPropagation(),this.value=e.target.value,this._internals?.setFormValue(this.value),this.emit("change",{value:this.value})},_toggleDropdown(e){if(e.preventDefault(),e.stopPropagation(),this.open)this.open=!1,this.search="";else{this.open=!0,this.search="";let t=this.querySelector(".select-search-input");t&&t.focus()}},renderSearchable(){let{disabled:e,required:t,placeholder:n,label:s}=this,r=this.selectId,i=this._getFilteredOptions(),o=this.open?this.search:this._getSelectedLabel();return p`
      ${s?p`<uix-label for=${r} text=${s} ?required=${t}></uix-label>`:""}
      <div class="select-wrapper">
        <input
          type="text"
          id=${r}
          .value=${o}
          ?disabled=${e}
          placeholder=${n||"Search..."}
          autocomplete="off"
          @focus=${this._onSearchFocus}
          @input=${this._onSearchInput}
          @change=${a=>a.stopPropagation()}
          @keydown=${this._onSearchKeydown}
          class="select-search-input"
        />
        <uix-icon name="chevron-down" class="select-arrow select-arrow-toggle"
          @mousedown=${this._toggleDropdown}></uix-icon>
        ${this.open?p`
          <div class="select-dropdown">
            ${i.length===0?p`<div class="select-option select-no-results">No results</div>`:i.map((a,l)=>p`
                <div
                  class="select-option ${l===this.highlightIndex?"highlighted":""}"
                  @mousedown=${c=>{c.preventDefault(),this._selectOption(a)}}
                  @mouseenter=${()=>{this.highlightIndex=l}}
                >
                  ${this._getLabel(a)}
                </div>
              `)}
          </div>
        `:ae}
      </div>
    `},render(){if(this.searchable)return this.renderSearchable();let{value:e,disabled:t,required:n,placeholder:s,name:r,label:i,options:o}=this,a=this.selectId;return p`
        ${i?p`<uix-label for=${a} text=${i} ?required=${n}></uix-label>`:""}
        <div class="select-wrapper">
          <select
            id=${a}
            name=${r||""}
            value=${e||""}
            ?disabled=${t}
            ?required=${n}
            @input=${this._onInput.bind(this)}
            @change=${this._onChange.bind(this)}
          >
            ${s&&!e?p`<option value="" disabled selected hidden>
                  ${s}
                </option>`:""}
            ${o.map(l=>p`
                <option
                  value=${l.value??l}
                  ?selected=${(l.value??l)===this.value}
                >
                  ${l.label??l}
                </option>
              `)}
          </select>
          <uix-icon name="chevron-down" class="select-arrow"></uix-icon>
        </div>
    `}}});var qb,Hb=y(()=>{V();H();qb={tag:"uix-switch",properties:{checked:u.boolean({defaultValue:!1}),disabled:u.boolean({defaultValue:!1}),name:u.string(""),value:u.string({defaultValue:"on"}),label:u.string(""),size:u.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),variant:u.string({defaultValue:"primary",enum:["primary","secondary","success","warning","error"]})},style:!0,shadow:!1,formAssociated:!0,connected(){this._internals||(this._internals=this.attachInternals()),this._internals.setFormValue(this.checked?this.value:null)},handleChange(e){e.stopPropagation(),this.checked=e.target.checked,this._internals?.setFormValue(this.checked?this.value:null),this.emit("change",{checked:this.checked}),this.emit("input",{checked:this.checked})},render(){return p`
      <label class="switch-wrapper">
        <input
          type="checkbox"
          class="switch-native"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name}
          value=${this.value}
          @change=${this.handleChange.bind(this)}
        />
        <div class="switch-control">
          <div class="switch-thumb"></div>
        </div>
        ${this.label?p`<span class="switch-label">${this.label}</span>`:""}
      </label>
    `}}});var Yb,Qb,Kb=y(()=>{V();H();Yb=()=>`uix-textarea-${Math.random().toString(36).slice(2,9)}`,Qb={tag:"uix-textarea",properties:{label:u.string(),id:u.string(),value:u.string(""),placeholder:u.string(""),rows:u.number({defaultValue:4}),cols:u.number({defaultValue:50}),size:u.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),disabled:u.boolean(!1),readonly:u.boolean(!1),required:u.boolean(!1),maxlength:u.number({defaultValue:null}),minlength:u.number({defaultValue:null}),resize:u.string({defaultValue:"vertical",enum:["none","both","horizontal","vertical"]}),error:u.boolean(!1),fullWidth:u.boolean(!1),variant:u.string({defaultValue:"default",enum:["default","primary","secondary","success","warning","error"]}),name:u.string()},style:!0,shadow:!1,formAssociated:!0,connected(){this._internals||(this._internals=this.attachInternals()),this._internals.setFormValue(this.value),!this.id&&!this._textareaId&&(this._textareaId=Yb())},get textareaId(){return this.id||this._textareaId||(this._textareaId=Yb())},handleInput(e){e.stopPropagation(),this.value=e.target.value,this._internals?.setFormValue(this.value),this.emit("input",{value:this.value})},handleChange(e){e.stopPropagation(),this.value=e.target.value,this._internals?.setFormValue(this.value),this.emit("change",{value:this.value})},render(){let e=this.textareaId,t={};return this.maxlength!==null&&(t.maxlength=this.maxlength),this.minlength!==null&&(t.minlength=this.minlength),p`
      ${this.label?p`<uix-label for=${e} text=${this.label} ?required=${this.required}></uix-label>`:""}
      <textarea
        id=${e}
        class="textarea"
        name=${this.name}
        value=${this.value}
        placeholder=${this.placeholder}
        rows=${this.rows}
        cols=${this.cols}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        @input=${this.handleInput.bind(this)}
        @change=${this.handleChange.bind(this)}
      ></textarea>
    `}}});var Gb,Jb=y(()=>{V();H();Gb={extends:"uix-container",i18n:{},style:!0,shadow:!0,properties:{padding:u.string({defaultValue:"sm",enum:["none","xs","sm","md","lg"]}),borderWidth:u.string({defaultValue:"1",enum:["none","1","2","3"]}),borderStyle:u.string({defaultValue:"solid",enum:["solid","dashed","dotted"]}),shadow:u.string({defaultValue:"none",enum:["none","sm","md","lg"]}),hover:u.boolean({defaultValue:!1}),gap:u.string({defaultValue:"md",enum:["none","xs","sm","md","lg","xl"]})},render(){return p`
      <slot name="header" part="header"></slot>
      <slot part="body"><slot></slot></slot>

      <slot part="footer" name="footer"></slot>
    `}}});var Xb,Zb=y(()=>{V();Xb={style:!0,properties:{padding:u.string({defaultValue:"md",enum:["none","sm","md","lg"]}),overflow:u.string({enum:["visible","hidden","auto","scroll"]}),variant:u.string({enum:["default","filled","outlined","elevated"]})}}});var ic,ey,ty,ny=y(()=>{V();H();ic=null,ey=null,ty={tag:"uix-divider",style:!0,properties:{label:u.string(),vertical:u.boolean(),resizable:u.boolean({defaultValue:!1})},firstUpdated(){this.resizable&&window.addEventListener("pointerdown",this.pointerDown.bind(this))},pointerDown(e){e.target===this&&(e.preventDefault(),this.setPointerCapture(e.pointerId),this._startX=e.clientX,this._startY=e.clientY,this._prevElem=this.previousElementSibling,this._nextElem=this.nextElementSibling,this._prevElemStartWidth=this._prevElem?this._prevElem.offsetWidth:0,this._nextElemStartWidth=this._nextElem?this._nextElem.offsetWidth:0,this._prevElemStartHeight=this._prevElem?this._prevElem.offsetHeight:0,this._nextElemStartHeight=this._nextElem?this._nextElem.offsetHeight:0,window.addEventListener("pointermove",this.pointerMove.bind(this)),window.addEventListener("pointerup",this.pointerUp.bind(this)))},pointerMove(e){ey=e,!ic&&(ic=setTimeout(()=>{ic=null,this.handleMouseMove(ey)},15))},handleMouseMove(e){if(!(!this._prevElem||!this._nextElem))if(this.vertical){let t=e.clientX-this._startX;t>0&&(t+=20);let n=this._prevElemStartWidth+t,s=this._nextElemStartWidth-t;n>0&&s>0&&(this._prevElem.style.flexBasis=`${n}px`,this._nextElem.style.flexBasis=`${s}px`)}else{let t=e.clientY-this._startY,n=this._prevElemStartHeight+t,s=this._nextElemStartHeight-t;n>0&&s>0&&(this._prevElem.style.flexBasis=`${n}px`,this._nextElem.style.flexBasis=`${s}px`)}},pointerUp(e){this.releasePointerCapture(e.pointerId),this._startX=null,this._startY=null,this._prevElem=null,this._nextElem=null,this._prevElemStartWidth=null,this._nextElemStartWidth=null,this._prevElemStartHeight=null,this._nextElemStartHeight=null,window.removeEventListener("pointermove",this.pointerMove.bind(this)),window.removeEventListener("pointerup",this.pointerUp.bind(this))},render(){return this.label?p`<span>${this.label}</span>`:null}}});var sy,ry=y(()=>{V();sy={style:!0,properties:{direction:u.string({defaultValue:"row",enum:["row","column","row-reverse","column-reverse"]}),gap:u.string({enum:["none","xs","sm","md","lg","xl","2xl","3xl"]}),align:u.string({defaultValue:"stretch",enum:["start","center","end","stretch","baseline"]}),justify:u.string({defaultValue:"start",enum:["start","center","end","space-between","space-around","space-evenly"]}),wrap:u.string({defaultValue:"nowrap",enum:["wrap","nowrap","wrap-reverse"]})}}});var iy,oy=y(()=>{V();H();Ul();iy={tag:"uix-grid",properties:{columns:u.string({defaultValue:"auto-fit"}),minColumnWidth:u.string({defaultValue:"250px"}),cols:u.string(),rows:u.string(),gap:u.string({defaultValue:"md",enum:["none","xs","sm","md","lg","xl","2xl","3xl"]}),align:u.string({defaultValue:"stretch",enum:["start","center","end","stretch"]}),justify:u.string({defaultValue:"start",enum:["start","center","end","stretch"]}),_effectiveCols:u.string({attribute:!1})},style:!0,shadow:!0,connected(){this._bp=ho(()=>this._updateResponsiveCols()),this._updateResponsiveCols()},disconnected(){this._bp?.cleanup()},_updateResponsiveCols(){let e=$m(this,"columns");this._effectiveCols=e||this.columns},render(){let e=this._effectiveCols||this.columns,t=[],n=/^\d+$/.test(e);this.cols?t.push(`--uix-grid-cols: repeat(${this.cols}, 1fr)`):n&&t.push(`--uix-grid-cols: repeat(${e}, 1fr)`),this.rows&&t.push(`--uix-grid-rows: ${this.rows}`),this.minColumnWidth&&t.push(`--uix-grid-min-column-width: ${this.minColumnWidth}`);let s=t.length>0?t.join("; "):"";return p`
      <div part="container" class="grid" style=${s}>
        <slot></slot>
      </div>
    `}}});var ay,ly=y(()=>{V();H();ay={tag:"uix-accordion",style:!0,shadow:!0,properties:{variant:u.string({defaultValue:"default",enum:["default","bordered","filled","flush","separated"]}),single:u.boolean(!1),rounded:u.boolean(!0),openItems:u.array({defaultValue:[]})},connected(){this._initialized=!1},updated(){this._initialized||(this._initItems(),this._initialized=!0),this._syncPanels()},_initItems(){let e=Array.from(this.children),t=[];e.forEach((n,s)=>{s%2===0&&n.hasAttribute("open")&&t.push(Math.floor(s/2))}),t.length>0&&(this.openItems=t)},_syncPanels(){Array.from(this.children).forEach((t,n)=>{let s=Math.floor(n/2),r=this.openItems.includes(s);n%2===0?t.toggleAttribute("active",r):t.toggleAttribute("hide",!r)})},_handleClick(e){let t=Array.from(this.children),n=t.find((i,o)=>o%2===0&&(i===e.target||i.contains(e.target)));if(!n||n.hasAttribute("prevent-collapse"))return;let s=t.indexOf(n),r=Math.floor(s/2);this.single?this.openItems=this.openItems.includes(r)?[]:[r]:this.openItems=this.openItems.includes(r)?this.openItems.filter(i=>i!==r):[...this.openItems,r],this.emit("accordion-toggle",{index:r,open:this.openItems.includes(r)})},render(){return p`
      <div part="container" class="accordion-container">
        <slot @click=${this._handleClick.bind(this)}></slot>
      </div>
    `}}});var cy,uy=y(()=>{V();cy={tag:"uix-menu",properties:{size:u.string({defaultValue:"md",enum:["sm","md","lg"]}),variant:u.string({defaultValue:"default",enum:["default","bordered","compact","flush","sidebar"]}),rounded:u.boolean(!0),bordered:u.boolean(!0)},style:!0}});var dy,hy=y(async()=>{await Ut();H();V();dy={tag:"uix-nav-item",properties:{icon:u.string({defaultValue:""}),label:u.string({defaultValue:""}),badge:u.string({defaultValue:""}),active:u.boolean(!1),href:u.string({defaultValue:""}),disabled:u.boolean(!1),activeBg:u.boolean(),iconOnly:u.boolean(!1),tooltip:u.boolean(!1),tooltipPosition:u.string({defaultValue:"right"}),tooltipDelay:u.number(200),tooltipVariant:u.string({defaultValue:"default",enum:["default","primary","secondary","success","warning","danger","info"]}),tooltipSize:u.string({defaultValue:"md",enum:["sm","md","lg"]}),indicatorPosition:u.string({defaultValue:"none",enum:["none","left","right","top","bottom"]}),size:u.string({defaultValue:"md",enum:["sm","md","lg"]})},style:!0,_handleClick(e){if(this.disabled){e.preventDefault();return}Fe.handleLinkClick(e),this.emit("nav-item-click",{href:this.href,active:this.active,disabled:this.disabled})},render(){let e=this.tooltip&&this.iconOnly&&this.label,t=e?p`<uix-tooltip
          position=${this.tooltipPosition}
          delay=${this.tooltipDelay}
          variant=${this.tooltipVariant}
          size=${this.tooltipSize}
        >${this.label}</uix-tooltip>`:null,n=this.iconOnly?p`
          ${t}
          ${this.icon?p`
                <span part="icon" class="nav-item-icon">
                  <uix-icon name=${this.icon} size=${this.size}></uix-icon>
                </span>
              `:null}
        `:p`
          <span part="label" class="nav-item-label label">
          ${this.icon?p`
                <span part="icon" class="nav-item-icon">
                  <uix-icon name=${this.icon} size=${this.size}></uix-icon>
                </span>
              `:null}
            ${this.label}
          </span>
          ${this.badge?p`
                <span part="badge" class="nav-item-badge badge">${this.badge}</span>
              `:null}
        `,s=!e&&this.iconOnly?this.label:"";return this.href&&!this.disabled?p`
        <a
          part="container"
          class="nav-item"
          href=${this.href}
          title=${s}
          @click=${this._handleClick.bind(this)}
        >
          ${n}
        </a>
      `:p`
      <button
        part="container"
        class="nav-item"
        title=${s}
        ?disabled=${this.disabled}
        @click=${this._handleClick.bind(this)}
      >
        ${n}
      </button>
    `}}});var py,fy=y(()=>{V();H();py={tag:"uix-navbar",properties:{fixed:u.string({defaultValue:"none",enum:["none","top","bottom"]}),variant:u.string({defaultValue:"default",enum:["default","bordered","floating"]}),transparent:u.boolean(!1),mobileMenuOpen:u.boolean(!1),collapsed:u.boolean(!1),collapsible:u.boolean(!1),direction:u.string({enum:["vertical","horizontal"],defaultValue:"horizontal"})},style:!0,shadow:!0,toggleMobileMenu(){this.mobileMenuOpen=!this.mobileMenuOpen,this.emit("menu-toggle",{open:this.mobileMenuOpen})},toggle(){this.collapsible&&(this.collapsed=!this.collapsed,this.emit("navbar-toggle",{collapsed:this.collapsed}))},render(){return p`
      <nav part="container" class="navbar ${this.mobileMenuOpen?"menu-open":""}" role="navigation" direction=${this.direction}>
        <div part="inner" class="navbar-container" direction=${this.direction}>
          <div part="brand" class="navbar-brand">
            <slot name="brand"></slot>
          </div>

          <button
            part="toggle"
            class="navbar-toggle"
            @click=${this.toggleMobileMenu}
            aria-label="Toggle navigation"
            aria-expanded=${this.mobileMenuOpen}
          >
            <uix-icon name=${this.mobileMenuOpen?"x":"menu"}></uix-icon>
          </button>
          <div part="menu" class="navbar-menu ${this.mobileMenuOpen?"active":""}" direction=${this.direction} justify="space-between">
            <div part="start" class="navbar-start">
              <slot name="start"></slot>
            </div>
            <div part="center" class="navbar-center">
              <slot name="center"></slot>
            </div>
            <div part="end" class="navbar-end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
      </nav>
    `}}});var my,gy=y(()=>{V();H();my={tag:"uix-tabs",properties:{activeTab:u.number(0),variant:u.string({defaultValue:"default",enum:["default","pills","underline"]}),vertical:u.boolean(),responsive:u.boolean(),fullWidth:u.boolean(!1)},style:!0,shadow:!0,firstUpdated(){let e=this.shadowRoot.querySelector("slot[name=panel]"),t=this.shadowRoot.querySelector("slot[name=tab]");e?.addEventListener("slotchange",()=>{this.updateActivePanels()}),t?.addEventListener("slotchange",()=>{this.updateActivePanels(),this.equalizeTabWidths()}),this.updateActivePanels(),this.equalizeTabWidths(),this.shadowRoot.addEventListener("keydown",n=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(n.key))return;let r=this.shadowRoot.querySelector("slot[name=tab]")?.assignedElements()||[];if(!r.length)return;let o=n.composedPath()[0].matches?.("input, textarea, select, [contenteditable]"),a=n.composedPath(),l=r.some(h=>a.includes(h));if(o||!l)return;n.preventDefault();let c=this.activeTab,d=this.vertical;n.key==="ArrowRight"&&!d||n.key==="ArrowDown"&&d?c=(this.activeTab+1)%r.length:n.key==="ArrowLeft"&&!d||n.key==="ArrowUp"&&d?c=(this.activeTab-1+r.length)%r.length:n.key==="Home"?c=0:n.key==="End"&&(c=r.length-1),c!==this.activeTab&&(this.activeTab=c,this.updateActivePanels(),r[c].focus(),this.emit("tab-change",c))})},equalizeTabWidths(){let t=this.shadowRoot.querySelector("slot[name=tab]")?.assignedElements()||[];t.length&&(t.forEach(n=>{n.style.minWidth=""}),!this.fullWidth&&requestAnimationFrame(()=>{let n=0;t.forEach(s=>{let r=s.getBoundingClientRect().width;r>n&&(n=r)}),!(n<=0)&&t.forEach(s=>{s.style.minWidth=`${n}px`})}))},updateActivePanels(){let e=this.shadowRoot.querySelector("slot[name=panel]"),t=this.shadowRoot.querySelector("slot[name=tab]");if(!e)return;let n=e.assignedNodes({flatten:!0}).filter(i=>i.nodeType===Node.ELEMENT_NODE),s=t?.assignedElements()||[];this._tabsBaseId||(this._tabsBaseId=this.id||`tabs-${Math.random().toString(36).substr(2,9)}`);let r=this._tabsBaseId;s.forEach((i,o)=>{let a=`${r}-tab-${o}`,l=`${r}-panel-${o}`;i.setAttribute("role","tab"),i.setAttribute("id",a),i.setAttribute("aria-selected",o===this.activeTab?"true":"false"),i.setAttribute("tabindex",o===this.activeTab?"0":"-1"),n[o]&&i.setAttribute("aria-controls",l),o===this.activeTab?i.setAttribute("active",""):i.removeAttribute("active")}),n.forEach((i,o)=>{let a=`${r}-panel-${o}`,l=`${r}-tab-${o}`;i.setAttribute("role","tabpanel"),i.setAttribute("id",a),s[o]&&i.setAttribute("aria-labelledby",l),n.length>1&&(o===this.activeTab?i.removeAttribute("hide"):i.setAttribute("hide",""))})},selectTab(e){let t=e.target,n=t.assignedSlot;if(n&&n.name==="tab"){let r=n.assignedElements().indexOf(t);this.activeTab=r,this.updateActivePanels(),this.emit("tab-change",r)}},render(){return p`
        <div
          part="tab-list"
          role="tablist"
          aria-orientation=${this.vertical?"vertical":"horizontal"}
        >
          <slot name="tab" part="tab" @click=${this.selectTab.bind(this)}></slot>
        </div>
        <slot part="tab-panel" name="panel" part="panel"></slot>

    `}}});var by,yy=y(()=>{by={tag:"uix-tree",style:!0}});var xy,vy=y(()=>{V();H();xy={tag:"uix-tree-item",properties:{label:u.string(""),icon:u.string(""),expanded:u.boolean(),active:u.boolean(!1),modified:u.boolean(!1)},style:!0,shadow:!0,render(){let e=this.icon||(this.expanded?"folder-open":"folder");return p`
      <div part="item-content" class="item-content">
        ${e?p`<uix-icon name="${e}"></uix-icon>`:""}
        <span class="label">${this.label}</span>
        ${this.modified?p`<span class="modified"></span>`:""}
      </div>
      <div part="children" class="children">
        <slot></slot>
      </div>
    `}}});var wy,ky=y(()=>{V();H();wy={tag:"uix-bottom-sheet",style:!0,shadow:!0,properties:{open:u.boolean(!1)},connected(){this._boundEscape=e=>{e.key==="Escape"&&this.open&&this.close()},document.addEventListener("keydown",this._boundEscape),this.addEventListener("pointerdown",e=>{let t=this.shadowRoot?.querySelector("[part=nav]");if(!t)return;let n=t.getBoundingClientRect();if(e.clientY<n.top||e.clientY>n.bottom)return;let s=this.shadowRoot.querySelector("[part=panel]");if(!s)return;let r=n.height,i=s.offsetHeight-r,o=e.clientY,l=this.open?0:i;s.style.transition="none";let c=this.shadowRoot.querySelector("[part=backdrop]"),d=f=>{let m=f.clientY-o,g=Math.max(0,Math.min(l+m,i));if(s.style.transform=`translateY(${g}px)`,c){let b=1-g/i;c.style.opacity=Math.max(0,Math.min(b,1)),c.style.pointerEvents=b>.1?"auto":"none"}},h=f=>{document.removeEventListener("pointermove",d),document.removeEventListener("pointerup",h),s.style.transition="",s.style.transform="",c&&(c.style.opacity="",c.style.pointerEvents="");let m=f.clientY-o;Math.max(0,Math.min(l+m,i))<i/2?(this.open=!0,this.emit("sheet-opened")):(this.open=!1,this.emit("sheet-closed"))};document.addEventListener("pointermove",d),document.addEventListener("pointerup",h)})},disconnected(){document.removeEventListener("keydown",this._boundEscape)},toggle(){this.open?this.close():this.openSheet()},openSheet(){this.open=!0,this.emit("sheet-opened")},close(){this.open=!1,this.emit("sheet-closed")},render(){return p`
      <div part="backdrop" @click=${()=>this.close()}></div>
      <div part="panel">
        <div part="nav">
          <slot name="nav"></slot>
        </div>
        <div part="content">
          <slot name="sheet"></slot>
        </div>
      </div>
    `}}});var $y,Sy=y(()=>{V();H();$y={tag:"uix-drawer",style:!0,shadow:!0,properties:{open:u.boolean(!1),position:u.string({defaultValue:"right",enum:["left","right","top","bottom"]}),width:u.string({defaultValue:"280px"}),height:u.string({defaultValue:"50vh"}),backdrop:u.boolean(!0),persistent:u.boolean(!1)},_handleBackdropClick(e){e.target===e.currentTarget&&!this.persistent&&this.closeDrawer()},_handleEscapeKey(e){e.key==="Escape"&&this.open&&!this.persistent&&this.closeDrawer()},connected(){this._boundHandleEscape=this._handleEscapeKey.bind(this),document.addEventListener("keydown",this._boundHandleEscape)},disconnected(){this._boundHandleEscape&&document.removeEventListener("keydown",this._boundHandleEscape)},openDrawer(){this.open=!0,this.emit("drawer-opened")},closeDrawer(){this.open=!1,this.emit("drawer-closed")},toggleDrawer(){this.open?this.closeDrawer():this.openDrawer()},render(){return p`
    <style>

      .panel {
          transition:
            transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity 0.3s ease;
          will-change: transform;
      }
    </style>
      <!-- Backdrop -->
      ${this.backdrop&&this.open?p`<div
            part="backdrop"
            class="backdrop"
            @click=${this._handleBackdropClick.bind(this)}
          ></div>`:""}

      <!-- Drawer Panel -->
      <div part="panel" class="drawer-panel">
        <slot></slot>
      </div>
    `}}});var _y,Ay=y(()=>{V();H();_y={tag:"uix-modal",properties:{open:u.boolean(!1),closeOnEscape:u.boolean(!0),closeOnBackdropClick:u.boolean(!0),size:u.string({defaultValue:"md",enum:["sm","md","lg","xl"]})},style:!0,shadow:!0,firstUpdated(){this.dialog=this.shadowRoot.querySelector("dialog"),this.dialog.addEventListener("close",()=>{this.open=!1,this.emit("modal-close",{returnValue:this.dialog.returnValue})}),this.dialog.addEventListener("cancel",t=>{this.closeOnEscape?this.emit("modal-cancel"):t.preventDefault()}),this.dialog.addEventListener("click",t=>{if(this.closeOnBackdropClick&&t.target===this.dialog){let n=this.dialog.getBoundingClientRect();n.top<=t.clientY&&t.clientY<=n.top+n.height&&n.left<=t.clientX&&t.clientX<=n.left+n.width||this.close()}}),this.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",this.close.bind(this))})},updated({changedProps:e}){e.has("open")&&this.dialog&&(this.open&&!this.dialog.open?this.showModal():!this.open&&this.dialog.open&&this.dialog.close())},showModal(){this.dialog&&!this.dialog.open&&(this.dialog.showModal(),this.open=!0,this.emit("modal-open"))},show(){this.dialog&&!this.dialog.open&&(this.dialog.show(),this.open=!0,this.emit("modal-open"))},close(e){this.dialog?.open&&(this.dialog.close(e),this.open=!1)},render(){return p`
      <slot name="trigger" @click=${this.showModal.bind(this)}></slot>
      <dialog part="dialog">
        <div part="header" class="modal-header">
          <slot name="header"></slot>
          <button
            part="close-button"
            class="modal-close-button"
            @click=${()=>this.close()}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div part="body" class="modal-body">
          <slot></slot>
        </div>
        <slot part="footer" class="modal-footer" name="footer"></slot>
      </dialog>
    `}}});var Cy,Ey=y(()=>{V();Cy={tag:"uix-popover-controller",i18n:{},properties:{position:u.string("bottom-left"),open:u.boolean(!1),offset:u.number(4)},style:!0,connected(){this._triggerElement=null,this._boundDocumentClick=this._handleDocumentClick.bind(this),this.open||(this.style.display="none")},disconnected(){this._removeDocumentListener(),this._stopPositionTracking()},_calculatePosition(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect(),n=this.getBoundingClientRect(),s=this.offset||4,r=0,i=0,o=this.position||"bottom-left";o.includes("bottom")?r=t.bottom+s:o.includes("top")?r=t.top-n.height-s:r=t.bottom+s,o.includes("left")||o==="bottom"||o==="top"?i=t.left:o.includes("right")?i=t.right-n.width:o==="left"?i=t.left-n.width-s:o==="right"?i=t.right+s:i=t.left;let a=window.innerWidth,l=window.innerHeight;return i+n.width>a&&(i=a-n.width-8),i<8&&(i=8),r+n.height>l&&(r=l-n.height-8),r<8&&(r=8),{top:r,left:i}},_updatePosition(){if(!this._triggerElement)return;let e=this._calculatePosition(this._triggerElement);this.style.top=`${e.top}px`,this.style.left=`${e.left}px`},_open(e){this.open||(this._triggerElement=e,this.open=!0,this.style.display="",this.setAttribute("data-open",""),this._startPositionTracking(),this._addDocumentListener(),this.dispatchEvent(new CustomEvent("popover-open",{bubbles:!0})))},_close(){this.open&&(this.open=!1,this.style.display="none",this.removeAttribute("data-open"),this._removeDocumentListener(),this._stopPositionTracking(),this._triggerElement=null,this.dispatchEvent(new CustomEvent("popover-close",{bubbles:!0})))},toggle(e){this.open?this._close():this._open(e)},_addDocumentListener(){document.addEventListener("click",this._boundDocumentClick,!0)},_removeDocumentListener(){document.removeEventListener("click",this._boundDocumentClick,!0)},_startPositionTracking(){this._trackingFrame=null;let e=()=>{this.open&&this._triggerElement&&(this._updatePosition(),this._trackingFrame=requestAnimationFrame(e))};this._trackingFrame=requestAnimationFrame(e)},_stopPositionTracking(){this._trackingFrame&&(cancelAnimationFrame(this._trackingFrame),this._trackingFrame=null)},_handleDocumentClick(e){if(!this.contains(e.target)){if(this._triggerElement){if(this._triggerElement.contains(e.target))return;let t=this._triggerElement.getRootNode()?.host;if(t&&(t===e.target||t.contains(e.target)))return}this._close()}}}});var Ry,Iy=y(()=>{V();Ry={tag:"uix-tooltip",style:!0,properties:{position:u.string({defaultValue:"top",enum:["top","bottom","left","right"]}),variant:u.string({defaultValue:"default",enum:["default","primary","secondary","success","warning","danger","info"]}),size:u.string({defaultValue:"md",enum:["sm","md","lg"]}),delay:u.number({defaultValue:100})},positionAt(e){let n=0,s=0,r="";switch(this.position){case"bottom":n=e.bottom+6,s=e.left+e.width/2,r="translateX(-50%)";break;case"left":n=e.top+e.height/2,s=e.left-6,r="translate(-100%, -50%)";break;case"right":n=e.top+e.height/2,s=e.right+6,r="translateY(-50%)";break;case"top":default:n=e.top-6,s=e.left+e.width/2,r="translate(-50%, -100%)";break}this.style.top=`${n}px`,this.style.left=`${s}px`,this.style.transform=r},show(){this._showTimer=setTimeout(()=>{if(this._parent){this.positionAt(this._parent.getBoundingClientRect());try{this.showPopover()}catch{}}},this.delay)},hide(){clearTimeout(this._showTimer);try{this.hidePopover()}catch{}},connected(){this.setAttribute("popover","manual");let e=this.parentElement;e&&(this._parent=e,this._onEnter=this.show.bind(this),this._onLeave=this.hide.bind(this),e.addEventListener("mouseenter",this._onEnter),e.addEventListener("mouseleave",this._onLeave),e.addEventListener("focusin",this._onEnter),e.addEventListener("focusout",this._onLeave))},disconnected(){clearTimeout(this._showTimer),this._parent&&(this._parent.removeEventListener("mouseenter",this._onEnter),this._parent.removeEventListener("mouseleave",this._onLeave),this._parent.removeEventListener("focusin",this._onEnter),this._parent.removeEventListener("focusout",this._onLeave),this._parent=null)}}});var Ty=y(()=>{});async function Py(){if(oc)return oc;try{let e=await fetch("/.bootstrapp.json").then(s=>s.json()),t=e.packages?.["@bootstrapp/uix"]||e.packages?.uix;if(!t?.components)return console.warn("UIX components not found in manifest"),{};let n={};for(let[s,r]of Object.entries(t.components.uix||{})){let i=r.split("/")[0];n[i]||(n[i]=[]),n[i].push(s)}return oc=n,n}catch(e){return console.error("Failed to fetch component manifest:",e),{}}}var oc,My=y(()=>{Ty();oc=null});var jy,Fy,Dy,Oy,Ly=y(()=>{V();H();My();jy={text:{color:"#ebdbb2",xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem"},font:{family:"",heading:"",normal:"400",medium:"500",semibold:"600",bold:"700"},leading:{tight:"1.2",normal:"1.5",relaxed:"1.75"},color:{primary:"#fabd2f",secondary:"#83a598",success:"#b8bb26",danger:"#fb4934",warning:"#fe8019",info:"#83a598",surface:"#504945",inverse:"#282828"},spacing:{xs:"0.25rem",sm:"0.5rem",md:"0.75rem",lg:"1rem",xl:"1.5rem","2xl":"2rem","3xl":"3rem"},radius:{none:"0",sm:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem",full:"9999px"},border:{width:"1px",color:"#e5e7eb"},shadow:{none:"none",sm:"0 1px 3px 0 rgb(0 0 0 / 0.1)",md:"0 4px 6px -1px rgb(0 0 0 / 0.1)",lg:"0 10px 15px -3px rgb(0 0 0 / 0.1)",xl:"0 20px 25px -5px rgb(0 0 0 / 0.1)","2xl":"0 25px 50px -12px rgb(0 0 0 / 0.25)"}},Fy=new Set(["family","heading"]),Dy=e=>{if(typeof e!="string")return!1;let t=e.trim().toLowerCase();return t.startsWith("#")||t.startsWith("rgb(")||t.startsWith("rgba(")||t.startsWith("hsl(")||t.startsWith("hsla(")},Oy={tag:"uix-theme-editor",style:!0,properties:{theme:u.object({attribute:!1,defaultValue:null}),baseTheme:u.object({attribute:!1,defaultValue:null}),themeTokens:u.object({attribute:!1,defaultValue:null}),showSections:u.array({attribute:!1,defaultValue:["typography","colors","spacing","edges"]}),values:u.object({attribute:!1,defaultValue:{}}),touched:u.object({attribute:!1,defaultValue:{}}),componentList:u.object({attribute:!1,defaultValue:null}),selectedCSSComponent:u.string({attribute:!1,defaultValue:""}),componentOverrides:u.object({attribute:!1,defaultValue:{}})},async connected(){this._initValues(),(this.showSections||[]).includes("component-css")&&(this.componentList=await Py())},updated({changedProps:e}){(e.has("theme")||e.has("baseTheme")||e.has("themeTokens"))&&this._initValues()},_base(){return this.baseTheme||jy},_editableKeys(e){let t=this.themeTokens;if(t&&Array.isArray(t[e]))return t[e];if(t)return[];let n=this._base();return Object.keys(n[e]||{})},_hasCategory(e){return this._editableKeys(e).length>0},_resolveValue(e,t){let n=this.theme?.[e]?.[t];if(n!=null)return n;let s=this._base()?.[e]?.[t];return s??jy[e]?.[t]??""},_initValues(){let e=["font","text","color","spacing","radius","border","shadow","leading"],t={};for(let n of e){let s=this._editableKeys(n);if(s.length!==0){t[n]={};for(let r of s)t[n][r]=this._resolveValue(n,r)}}this.values=t,this.touched={}},_updateValue(e,t,n){this.values={...this.values,[e]:{...this.values[e]||{},[t]:n}},this.touched={...this.touched,[e]:{...this.touched[e]||{},[t]:!0}},this._emit()},_emit(){this.dispatchEvent(new CustomEvent("change",{detail:{theme:this.generateThemeObject()},bubbles:!0,composed:!0}))},_handleComponentCSSChange({detail:e}){let{group:t,component:n,property:s,value:r}=e;this.componentOverrides={...this.componentOverrides,[t]:{...this.componentOverrides?.[t]||{},[n]:{...this.componentOverrides?.[t]?.[n]||{},[s]:r}}},this._emit()},_handleComponentCSSReset({detail:e}){let{group:t,component:n}=e,s={...this.componentOverrides};if(s[t]){let{[n]:r,...i}=s[t];Object.keys(i).length===0?delete s[t]:s[t]=i}this.componentOverrides=s,this._emit()},generateThemeObject(){let e={};for(let[t,n]of Object.entries(this.touched||{})){let s={},r=!1;for(let i of Object.keys(n)){let o=this.values?.[t]?.[i];o==null||o===""||(s[i]=o,r=!0)}r&&(e[t]=s)}if(this.componentOverrides&&Object.keys(this.componentOverrides).length>0)for(let[t,n]of Object.entries(this.componentOverrides)){e[t]||(e[t]={});for(let[s,r]of Object.entries(n))e[t][s]={...e[t][s]||{},...r}}return e},_getComponentOptions(){if(!this.componentList)return[];let e=[];for(let[t,n]of Object.entries(this.componentList))for(let s of n){let r=`uix-${s}`;e.push({value:r,label:`${r} (${t})`})}return e.sort((t,n)=>t.value.localeCompare(n.value))},_renderTextInput(e,t){let n=this.values?.[e]?.[t]??"";return p`<div class="flex items-center gap-2">
      <span class="text-xs font-medium min-w-[60px]">${t}</span>
      <uix-input
        type="text"
        .value=${n}
        @input=${s=>this._updateValue(e,t,s.detail?.value??s.target.value)}
        size="xs"
        mono
        class="flex-1"
      ></uix-input>
    </div>`},_renderColorInput(e,t){let n=this.values?.[e]?.[t]??"",s=Dy(n)&&n.startsWith("#")?n:"#000000";return p`<div class="flex items-center gap-2 px-2 py-1.5 border-b border-surface-dark">
      <input
        type="color"
        .value=${s}
        @input=${r=>this._updateValue(e,t,r.target.value)}
        class="w-6 h-6 rounded cursor-pointer flex-shrink-0"
      />
      <span class="text-xs font-medium min-w-[90px]">${t}</span>
      <uix-input
        type="text"
        .value=${n}
        @input=${r=>this._updateValue(e,t,r.detail?.value??r.target.value)}
        size="xs"
        mono
        class="flex-1"
      ></uix-input>
    </div>`},_renderColorsSection(){let e=this._editableKeys("color");return e.length===0?ae:p`<div class="py-2">
      ${e.map(t=>this._renderColorInput("color",t))}
    </div>`},_renderSpacingSection(){let e=this._editableKeys("spacing");return e.length===0?ae:p`<div class="grid grid-cols-2 gap-1.5 px-3 py-2">
      ${e.map(t=>this._renderTextInput("spacing",t))}
    </div>`},_renderEdgesSection(){let e=this._editableKeys("border"),t=this._editableKeys("radius"),n=this._editableKeys("shadow");return e.length===0&&t.length===0&&n.length===0?ae:p`<div class="px-3 py-2">
      ${e.length>0?p`
            <span class="text-[10px] font-semibold uppercase text-muted mb-1 block">Border</span>
            <div class="grid grid-cols-2 gap-1.5 mb-3">
              ${e.map(s=>{let r=this.values?.border?.[s]??"";if(s==="color"){let i=Dy(r)&&r.startsWith("#")?r:"#e5e7eb";return p`<div class="flex items-center gap-2">
                    <span class="text-xs font-medium min-w-[30px]">${s}</span>
                    <div class="flex items-center gap-1 flex-1">
                      <input
                        type="color"
                        .value=${i}
                        @input=${o=>this._updateValue("border",s,o.target.value)}
                        class="w-5 h-5 rounded cursor-pointer flex-shrink-0"
                      />
                      <uix-input
                        type="text"
                        .value=${r}
                        @input=${o=>this._updateValue("border",s,o.detail?.value??o.target.value)}
                        size="xs"
                        mono
                        class="flex-1"
                      ></uix-input>
                    </div>
                  </div>`}return this._renderTextInput("border",s)})}
            </div>
          `:ae}
      ${t.length>0?p`
            <span class="text-[10px] font-semibold uppercase text-muted mb-1 block">Border Radius</span>
            <div class="grid grid-cols-2 gap-1.5 mb-3">
              ${t.map(s=>this._renderTextInput("radius",s))}
            </div>
          `:ae}
      ${n.length>0?p`
            <span class="text-[10px] font-semibold uppercase text-muted mb-1 block">Shadows</span>
            <div class="flex flex-col gap-1.5">
              ${n.map(s=>this._renderTextInput("shadow",s))}
            </div>
          `:ae}
    </div>`},_renderTypographySection(){let e=this.themeTokens,t=this._editableKeys("font"),n=this._editableKeys("text"),s=this._editableKeys("leading"),r=!e||t.includes("family")||t.includes("heading"),i=e?t.filter(c=>Fy.has(c)):["family","heading"],o=t.filter(c=>!Fy.has(c)),a=n.filter(c=>c!=="color"),l=n.includes("color");return t.length===0&&n.length===0&&s.length===0?ae:p`<div class="px-3 py-2">
      ${r&&i.length>0?p`
            <span class="text-[10px] font-semibold uppercase text-muted mb-1 block">Font Family</span>
            <div class="flex flex-col gap-1.5 mb-3">
              ${i.map(c=>{let d=this.values?.font?.[c]??"";return p`<div class="flex items-center gap-2">
                  <span class="text-xs font-medium min-w-[60px] capitalize">
                    ${c==="family"?"Body":c}
                  </span>
                  <uix-input
                    type="text"
                    .value=${d}
                    @input=${h=>this._updateValue("font",c,h.detail?.value??h.target.value)}
                    placeholder=${c==="heading"?"Defaults to body font":"e.g. Inter, Manrope..."}
                    size="xs"
                    class="flex-1"
                  ></uix-input>
                </div>`})}
            </div>
          `:ae}
      ${l?p`
            <span class="text-[10px] font-semibold uppercase text-muted mb-1 block">Text Color</span>
            <div class="mb-3">${this._renderColorInput("text","color")}</div>
          `:ae}
      ${a.length>0?p`
            <span class="text-[10px] font-semibold uppercase text-muted mb-1 block">Font Sizes</span>
            <div class="grid grid-cols-2 gap-1.5 mb-3">
              ${a.map(c=>this._renderTextInput("text",c))}
            </div>
          `:ae}
      ${o.length>0||s.length>0?p`
            <details class="mt-2">
              <summary
                class="text-[10px] font-semibold uppercase text-muted cursor-pointer mb-1"
              >
                Advanced
              </summary>
              ${o.length>0?p`
                    <span class="text-[10px] font-semibold uppercase text-muted mb-1 mt-2 block">
                      Font Weights
                    </span>
                    <div class="grid grid-cols-2 gap-1.5 mb-3">
                      ${o.map(c=>this._renderTextInput("font",c))}
                    </div>
                  `:ae}
              ${s.length>0?p`
                    <span class="text-[10px] font-semibold uppercase text-muted mb-1 block">
                      Line Heights
                    </span>
                    <div class="grid grid-cols-2 gap-1.5">
                      ${s.map(c=>this._renderTextInput("leading",c))}
                    </div>
                  `:ae}
            </details>
          `:ae}
    </div>`},_renderComponentCSSSection(){let e=this._getComponentOptions();return p`<div class="p-2">
      <uix-select
        searchable
        size="xs"
        placeholder="Search component..."
        .options=${e}
        .value=${this.selectedCSSComponent||""}
        @change=${t=>{this.selectedCSSComponent=t.detail?.value??t.target?.value}}
        class="w-full mb-2"
      ></uix-select>
      ${this.selectedCSSComponent?p`
            <uix-showcase-css-editor
              .componentTag=${this.selectedCSSComponent}
              .themeOverrides=${this.componentOverrides}
              @css-change=${this._handleComponentCSSChange}
              @css-reset-component=${this._handleComponentCSSReset}
            ></uix-showcase-css-editor>
          `:p`<uix-text size="xs" muted class="text-center block py-3">
            Select a component to edit its CSS variables
          </uix-text>`}
    </div>`},render(){let e=this.showSections||[],t=[];if(e.includes("typography")){let n=this._renderTypographySection();n!==ae&&t.push(p`
          <button open>
            <uix-icon name="type" size="14" class="mr-2"></uix-icon>Typography
          </button>
          <div>${n}</div>
        `)}if(e.includes("colors")){let n=this._renderColorsSection();n!==ae&&t.push(p`
          <button open>
            <uix-icon name="palette" size="14" class="mr-2"></uix-icon>Colors
          </button>
          <div>${n}</div>
        `)}if(e.includes("component-css")&&t.push(p`
        <button>
          <uix-icon name="paintbrush" size="14" class="mr-2"></uix-icon>Component CSS
        </button>
        <div>${this._renderComponentCSSSection()}</div>
      `),e.includes("spacing")){let n=this._renderSpacingSection();n!==ae&&t.push(p`
          <button>
            <uix-icon name="move" size="14" class="mr-2"></uix-icon>Spacing
          </button>
          <div>${n}</div>
        `)}if(e.includes("edges")){let n=this._renderEdgesSection();n!==ae&&t.push(p`
          <button>
            <uix-icon name="square" size="14" class="mr-2"></uix-icon>Edges
          </button>
          <div>${n}</div>
        `)}return t.length===0?p`<div class="p-4 text-xs text-muted text-center">
        No editable tokens for this configuration.
      </div>`:p`<uix-accordion variant="flush">${t}</uix-accordion>`}}});var zy,Uy=y(()=>{H();V();zy={tag:"uix-darkmode",icons:["moon","sun"],properties:{width:u.string({defaultValue:"fit"}),compact:u.boolean(),inverted:u.boolean(),darkmode:u.boolean({sync:"local"}),icon:u.string()},getIcon(){return this.inverted?this.darkmode?"moon":"sun":this.darkmode?"sun":"moon"},getLabel(){return this.inverted?this.darkmode?"Dark Mode":"Light Mode":this.darkmode?"Light Mode":"Dark Mode"},click(e){e.stopPropagation(),this.darkmode=!this.darkmode,this.icon=this.getIcon(),document.documentElement.classList.toggle("dark")},connected(){this.icon=this.getIcon(),this.darkmode&&document.documentElement.classList.add("dark"),this.on("button#click",this.click.bind(this))},render(){return this.compact?p`<button aria-label="darkmode toggle">
        <uix-icon ghost name=${this.icon} class="w-7 h-7 cursor-pointer shrink-0"></uix-icon>
        </button>
        `:p`<button class="cursor-pointer w-full flex items-center p-2 rounded-md hover:bg-surface-lighter text-left text-sm gap-2">
              <uix-icon name=${this.icon} class="w-5 h-5 mr-3 shrink-0"></uix-icon>
              <span>${this.getLabel()}</span>
              <div class="ml-auto w-10 h-5 ${this.darkmode?"bg-red-700":"bg-gray-600"} rounded-full flex items-center p-1 transition-colors">
                  <div class="w-4 h-4 bg-white rounded-full transform transition-transform ${this.darkmode?"translate-x-4":""}"></div>
              </div>
          </button>`}}});var Ny,Vy=y(()=>{V();Ny={tag:"uix-draggable",style:!0,properties:{draggable:u.string(),"dragged-id":u.string(),target:u.string(),onDragged:u.function()},connected(){this.draggable=!0,this.addEventListener("dragstart",this.handleDragStart.bind(this)),this.addEventListener("dragend",this.handleDragEnd.bind(this))},handleDragStart(e){e.stopPropagation(),this.classList.add("dragging"),e.dataTransfer.setData("text/plain",this["dragged-id"]||""),e.dataTransfer.effectAllowed="move"},handleDragEnd(e){this.classList.remove("dragging")}}});var By,Wy=y(()=>{V();By={tag:"uix-droparea",style:!0,properties:{onDropped:u.function(),"droparea-id":u.string(),orderable:u.boolean(!1),direction:u.string({defaultValue:"vertical"})},connected(){this._dropIndex=-1,this.addEventListener("dragover",this.handleDragOver.bind(this)),this.addEventListener("drop",this.handleDrop.bind(this)),this.addEventListener("dragenter",this.handleDragEnter.bind(this)),this.addEventListener("dragleave",this.handleDragLeave.bind(this))},handleDragOver(e){e.preventDefault(),e.dataTransfer.dropEffect="move",this.classList.add("over"),this.orderable&&!e._handledByOrderable?(e._handledByOrderable=!0,this._updateDropIndex(this.direction==="horizontal"?e.clientX:e.clientY)):this.orderable&&this._hideIndicator()},handleDrop(e){e.preventDefault(),e.stopPropagation(),this.classList.remove("over"),this._hideIndicator();let t=e.dataTransfer.getData("text/plain"),n=this["droparea-id"],s={draggedId:t,targetId:n,event:e,droparea:this};this.orderable&&(s.index=this._dropIndex),this.onDropped&&this.onDropped(s),this._dropIndex=-1},handleDragEnter(e){e.preventDefault(),this.classList.add("over")},handleDragLeave(e){e.relatedTarget&&this.contains(e.relatedTarget)||(this.classList.remove("over"),this._hideIndicator())},_getOrderableChildren(){return[...this.children].filter(e=>e.tagName!=="STYLE"&&!e.classList.contains("drop-indicator-line"))},_updateDropIndex(e){let t=this._getOrderableChildren(),n=this.direction==="horizontal",s=t.length;for(let a=0;a<t.length;a++){let l=t[a].getBoundingClientRect();if(n){let c=l.left+l.width/2;if(e<c){s=a;break}}else{let c=l.top+l.height/2;if(e<c){s=a;break}}}this._dropIndex=s;let r=this.getBoundingClientRect(),i;if(t.length===0)i=4;else if(s<t.length){let a=t[s].getBoundingClientRect();i=n?a.left-r.left:a.top-r.top}else{let l=t[t.length-1].getBoundingClientRect();i=n?l.right-r.left:l.bottom-r.top}let o=n?"--drop-indicator-x":"--drop-indicator-y";this.style.setProperty(o,`${i}px`),this.setAttribute("data-dropping","")},_hideIndicator(){this.removeAttribute("data-dropping"),this.style.removeProperty("--drop-indicator-y"),this.style.removeProperty("--drop-indicator-x")}}});var VS,qy,Hy=y(async()=>{await Ut();H();Se();hs();V();VS=[{label:"New Note...",icon:"file-plus",action:()=>E().executeCommand("notes.newNote")},{label:"New Task...",icon:"square-check",action:()=>E().executeCommand("tasks.newTask")},{label:"New Website...",icon:"globe",action:()=>E().openResource("pages://new")},{label:"Command Palette",icon:"terminal",action:()=>E().executeCommand("core.workbench.commandPalette")}],qy={tag:"bsp-home",style:!0,properties:{recentResources:u.array({defaultValue:[]}),templates:u.array({defaultValue:[],attribute:!1}),extensions:u.array({defaultValue:[],attribute:!1}),directorySupported:u.boolean({defaultValue:!1,attribute:!1}),pendingReconnect:u.object({attribute:!1})},connected(){let e=E();this.recentResources=e.recentResources||[],this.directorySupported=Ht(),this.pendingReconnect=e.pendingDirectoryReconnect||null,this._refresh(),this._unsubs=[],this._unsubs.push(e.subscribe("recentResources",t=>{this.recentResources=t||[]})),this._unsubs.push(e.subscribe("templatesChanged",()=>this._refresh())),this._unsubs.push(e.subscribe("extensionsChanged",()=>this._refresh())),this._unsubs.push(e.subscribe("ide:ready",()=>this._refresh())),this._unsubs.push(e.subscribe("pendingDirectoryReconnect",t=>{this.pendingReconnect=t||null}))},disconnected(){this._unsubs?.forEach(e=>e())},async _openFolder(){try{let e=await ln(),t=E();await t.executeCommand("files.setBacking",{kind:"directory",handle:e}),Fe.go((t.basePath||"")+"/files")}catch(e){e.name!=="AbortError"&&console.error("[bsp-home] Open folder failed:",e)}},async _reconnectFolder(){let e=E();await e.executeCommand("files.reconnectDirectory"),e.pendingDirectoryReconnect||Fe.go((e.basePath||"")+"/files")},_refresh(){let e=E();this.templates=e.templates?.getAllTemplates?.()??[];let t=e.extensions?.getInstalledExtensions,n=e.extensions?.getAvailableExtensions;if(t&&n){let s=new Set(t.call(e.extensions).map(r=>r.id));this.extensions=n.call(e.extensions).filter(r=>!s.has(r.id))}else this.extensions=[]},render(){let e=E(),t=this.templates.slice(0,5),n=this.extensions.slice(0,5),s=this.recentResources.length>8;return p`
      <div class="welcome">
        <div class="brand">
          <h1 class="brand-name">Bootstrapp</h1>
          <p class="brand-tagline">The workspace for solo builders</p>
        </div>

        <div class="welcome-grid">
          <div class="section section-start">
            <h2 class="section-title">Start</h2>
            ${this.pendingReconnect?.name?p`
              <a class="action-link" @click=${()=>this._reconnectFolder()}>
                <uix-icon name="rotate-cw" size="14"></uix-icon>
                Reconnect to ${this.pendingReconnect.name}
              </a>
            `:""}
            ${this.directorySupported?p`
              <a class="action-link" @click=${()=>this._openFolder()}>
                <uix-icon name="folder-open" size="14"></uix-icon>
                Open Folder...
              </a>
            `:""}
            ${VS.map(r=>p`
              <a class="action-link" @click=${r.action}>
                <uix-icon name=${r.icon} size="14"></uix-icon>
                ${r.label}
              </a>
            `)}
          </div>

          <div class="section section-quickstart">
            ${t.length?p`
              <h2 class="section-title">Quick Start</h2>
              ${t.map(r=>p`
                <a class="template-link" @click=${()=>e.openResource(`templates://detail/${r.id}`)}>
                  <uix-icon name=${r.icon} size="16" class="template-link-icon"></uix-icon>
                  <div class="template-link-text">
                    <span class="template-link-name">${r.name}</span>
                    <span class="template-link-desc">${r.description}</span>
                  </div>
                </a>
              `)}
              <a class="action-link more" @click=${()=>e.openResource("templates://browse")}>
                Browse all templates...
              </a>
            `:""}
          </div>

          <div class="section section-recent">
            ${this.recentResources.length?p`
              <h2 class="section-title">Recent</h2>
              ${this.recentResources.slice(0,8).map(r=>p`
                <a class="recent-link" @click=${()=>e.openResource(r.uri)}>
                  <span class="recent-label">${r.label}</span>
                  <span class="recent-path">${this._schemeName(r.uri)}</span>
                </a>
              `)}
              ${s?p`
                <a class="action-link more" @click=${()=>e.executeCommand("home.showRecent")}>
                  See all recent...
                </a>
              `:""}
            `:""}
          </div>

          <div class="section section-extensions">
            ${n.length?p`
              <h2 class="section-title">Extensions</h2>
              ${n.map(r=>p`
                <a class="template-link" @click=${()=>e.openResource(`extensions://detail/${r.id}`)}>
                  <uix-icon name=${r.icon||"box"} size="16" class="template-link-icon"></uix-icon>
                  <div class="template-link-text">
                    <span class="template-link-name">${r.name}</span>
                    <span class="template-link-desc">${r.description}</span>
                  </div>
                </a>
              `)}
              <a class="action-link more" @click=${()=>e.openResource("extensions://browse")}>
                Browse all extensions...
              </a>
            `:""}
          </div>
        </div>
      </div>
    `},_schemeName(e){try{return new URL(e).protocol.slice(0,-1)}catch{return""}}}});var BS,Yy,Qy=y(()=>{H();rt();Se();V();BS=e=>e&&/[^\x00-\x7F]/.test(e),Yy={tag:"bsp-home-sidebar",style:!0,properties:{favorites:u.array({defaultValue:[]}),collapsedFolders:u.object({defaultValue:{}}),editingIconId:u.string({defaultValue:""}),quickAccessItems:u.array({defaultValue:[],attribute:!1}),recentResources:u.array({defaultValue:[]})},async connected(){let e=E();this.quickAccessItems=[...e.quickAccessItems||[]],this.recentResources=[...e.recentResources||[]],await this.loadData(),this._unsubs=[],this._unsubs.push(ne.on("favorites:changed",()=>this.loadData())),this._unsubs.push(e.subscribe("recentResources",n=>{this.recentResources=[...n||[]]}));let t=()=>{this.quickAccessItems=[...E().quickAccessItems||[]]};this._unsubs.push(e.subscribe("ide:ready",t)),this._unsubs.push(e.subscribe("extensionsChanged",t))},_isFav(e){return E().favoriteUris?.has(e)||!1},_toggleFav(e,t){e.stopPropagation(),E().executeCommand("home.toggleFavorite",{uri:t.uri,label:t.label,icon:t.icon})},disconnected(){this._unsubs?.forEach(e=>e())},async loadData(){let t=await E().configProvider?.read("favorites.json")||[];this.favorites=[...t||[]].sort((n,s)=>(n.sortOrder||0)-(s.sortOrder||0))},_itemsInFolder(e){return this.favorites.filter(t=>(t.folder||"")===e).sort((t,n)=>(t.sortOrder||0)-(n.sortOrder||0))},_toggleFolder(e){this.collapsedFolders={...this.collapsedFolders,[e]:!this.collapsedFolders[e]}},_renderIcon(e,t="14"){return BS(e)?p`<span class="emoji-icon" style="font-size: ${t}px; line-height: 1; width: ${t}px; text-align: center;">${e}</span>`:p`<uix-icon name=${e||"star"} size=${t}></uix-icon>`},_onIconClick(e,t){e.stopPropagation(),this.editingIconId=t;let n=this.querySelector("uix-icon-picker");n&&n.toggle(e.currentTarget)},_onIconChange(e){let t=E(),n=e.detail?.value;!n||!this.editingIconId||(t.executeCommand("home.updateFavorite",{id:this.editingIconId,icon:n}),this.editingIconId="")},_showCreateMenu(e){let t=E(),n=(this.quickAccessItems||[]).filter(i=>i.section==="create").sort((i,o)=>(i.order||99)-(o.order||99)).map(i=>({label:i.label,icon:i.icon,action:()=>i.command?t.executeCommand(i.command):i.uri?t.openResource(i.uri):null}));n.push({label:"New Folder",icon:"folder",action:()=>this._createFolder()});let s=document.createElement("ide-context-menu");s.items=n;let r=e.currentTarget.getBoundingClientRect();s.position={x:r.left,y:r.bottom+4},document.body.appendChild(s)},async _createFolder(){let e=E(),t=await e.showInputBox({prompt:"Folder name",placeholder:"My Folder"});t?.trim()&&e.executeCommand("home.createFolder",{name:t.trim()})},_isDescendant(e,t){let n=e,s=new Set;for(;n;){if(n===t)return!0;if(s.has(n))return!1;s.add(n),n=this.favorites.find(i=>i.id===n)?.folder||""}return!1},_onDrop({draggedId:e,targetId:t,index:n}){if(!e)return;let s=E(),r=e.replace(/^fav:/,""),i=this.favorites.find(d=>d.id===r);if(!i)return;let o="";if(t==="root"?o="":t.startsWith("folder:")?o=t.slice(7):t.startsWith("folder-content:")&&(o=t.slice(15)),i.isFolder&&(o===r||this._isDescendant(o,r)))return;let a=this._itemsInFolder(o).filter(d=>d.id!==r),l=n!==void 0&&n>=0?Math.min(n,a.length):a.length;a.splice(l,0,i);let c=a.map((d,h)=>({id:d.id,sortOrder:h,...d.id===r?{folder:o}:{}}));s.executeCommand("home.reorderFavorites",{updates:c})},render(){let e=E(),t=this._itemsInFolder(""),n=this.favorites.filter(a=>!a.isFolder).length,s=this.quickAccessItems||[],r=s.filter(a=>a.section!=="create").sort((a,l)=>(a.order||99)-(l.order||99)),i=s.filter(a=>a.section==="create").sort((a,l)=>(a.order||99)-(l.order||99)),o=a=>p`
      <div
        class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light"
        @click=${()=>a.uri?e.openResource(a.uri):a.command?e.executeCommand(a.command):null}
      >
        <uix-icon name=${a.icon} size="14" class="opacity-50"></uix-icon>
        <span>${a.label}</span>
      </div>
    `;return p`
      <div class="p-3 flex flex-col h-full text-sm">
        <div class="flex items-center gap-1 px-2 mb-2">
          <uix-text size="xs" muted weight="medium" class="uppercase tracking-wide flex-1">Favorites</uix-text>
          <uix-badge size="xs">${n}</uix-badge>
          <div
            class="cursor-pointer opacity-40 hover:opacity-80 ml-1"
            title="New..."
            @click=${a=>this._showCreateMenu(a)}
          >
            <uix-icon name="plus" size="14"></uix-icon>
          </div>
        </div>

        <uix-droparea
          droparea-id="root"
          orderable
          .onDropped=${a=>this._onDrop(a)}
        >
          ${t.map(a=>a.isFolder?this._renderFolder(a,0):this._renderFavoriteItem(a,0))}
        </uix-droparea>

        ${this.favorites.length===0?p`
          <uix-text size="xs" muted class="px-2 py-2 block">No favorites yet. Favorite items to add them here.</uix-text>
        `:""}

        ${this.recentResources.length?p`
          <div class="mt-4"></div>
          <uix-text size="xs" muted weight="medium" class="mb-1 block px-2 uppercase tracking-wide">Recent</uix-text>
          ${this.recentResources.slice(0,5).map(a=>p`
            <div
              class="recent-item flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light group"
              @click=${()=>e.openResource(a.uri)}
            >
              <uix-icon name=${a.icon||"file"} size="14" class="opacity-50 flex-shrink-0"></uix-icon>
              <span class="truncate flex-1">${a.label}</span>
              <uix-icon
                name="heart"
                size="12"
                ?solid=${this._isFav(a.uri)}
                class="recent-fav ${this._isFav(a.uri)?"opacity-80 text-danger":"opacity-0 group-hover:opacity-40 hover:opacity-80"} cursor-pointer flex-shrink-0"
                @click=${l=>this._toggleFav(l,a)}
              ></uix-icon>
            </div>
          `)}
          ${this.recentResources.length>5?p`
            <div
              class="flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-xs opacity-60 hover:opacity-100"
              @click=${()=>e.executeCommand("home.showRecent")}
            >
              <span>See all recent...</span>
            </div>
          `:""}
        `:""}

        <div class="mt-4"></div>

        <uix-text size="xs" muted weight="medium" class="mb-1 block px-2 uppercase tracking-wide">Quick Access</uix-text>
        ${r.map(o)}
        ${i.length?p`
          <div class="quick-access-divider"></div>
          ${i.map(o)}
        `:""}

        <uix-icon-picker
          @change=${a=>this._onIconChange(a)}
        ></uix-icon-picker>
      </div>
    `},_renderFavoriteItem(e,t=0){let n=E(),s=t*16;return p`
      <uix-draggable dragged-id="fav:${e.id}">
        <div
          class="fav-item flex items-center gap-2 py-1.5 rounded cursor-pointer hover:bg-surface-light group"
          style="padding-left: ${8+s}px; padding-right: 8px;"
          @click=${()=>n.openResource(e.uri)}
        >
          <span
            class="fav-icon flex-shrink-0 cursor-pointer hover:opacity-80"
            @click=${r=>this._onIconClick(r,e.id)}
            title="Change icon"
          >${this._renderIcon(e.icon)}</span>
          <span class="truncate flex-1">${e.label||e.uri}</span>
          <uix-icon
            name="x"
            size="12"
            class="fav-remove opacity-0 group-hover:opacity-40 hover:opacity-80 cursor-pointer flex-shrink-0"
            @click=${r=>{r.stopPropagation(),n.executeCommand("home.toggleFavorite",{uri:e.uri})}}
          ></uix-icon>
        </div>
      </uix-draggable>
    `},_renderFolder(e,t=0){let n=E(),s=this.collapsedFolders[e.id],r=this._itemsInFolder(e.id),i=t*16,o=t+1;return p`
      <uix-draggable dragged-id="fav:${e.id}">
        <uix-droparea
          droparea-id="folder:${e.id}"
          .onDropped=${a=>this._onDrop(a)}
          class="folder-drop-target"
        >
          <div
            class="fav-folder flex items-center gap-1.5 py-1.5 rounded cursor-pointer hover:bg-surface-light group"
            style="padding-left: ${8+i}px; padding-right: 8px;"
            @click=${()=>this._toggleFolder(e.id)}
          >
            <uix-icon name=${s?"chevron-right":"chevron-down"} size="10" class="opacity-40 flex-shrink-0"></uix-icon>
            <span
              class="flex-shrink-0 cursor-pointer hover:opacity-80"
              @click=${a=>this._onIconClick(a,e.id)}
              title="Change icon"
            >${this._renderIcon(e.icon)}</span>
            <span class="flex-1 font-medium opacity-70">${e.label}</span>
            <uix-badge size="xs" class="opacity-50">${r.length}</uix-badge>
            <uix-icon
              name="trash-2"
              size="11"
              class="opacity-0 group-hover:opacity-40 hover:opacity-80 cursor-pointer flex-shrink-0"
              @click=${a=>{a.stopPropagation(),n.executeCommand("home.deleteFolder",{id:e.id})}}
            ></uix-icon>
          </div>
        </uix-droparea>

        ${s?"":p`
          <uix-droparea
            droparea-id="folder-content:${e.id}"
            orderable
            .onDropped=${a=>this._onDrop(a)}
            class="folder-content-drop"
          >
            ${r.map(a=>a.isFolder?this._renderFolder(a,o):this._renderFavoriteItem(a,o))}
            ${r.length===0?p`<div style="padding-left: ${8+o*16}px;" class="py-1 text-xs opacity-30">Empty</div>`:""}
          </uix-droparea>
        `}
      </uix-draggable>
    `}}});var Ky,Gy=y(()=>{H();Se();V();Ky={tag:"bsp-raw-view",style:!0,properties:{uri:u.string({defaultValue:""}),content:u.object({defaultValue:null,attribute:!1}),rawContent:u.string({defaultValue:""}),loading:u.boolean({defaultValue:!0}),error:u.string({defaultValue:""})},_originalUri(){return this.content?.originalUri?this.content.originalUri:this.uri?.startsWith("raw://")?decodeURIComponent(this.uri.replace("raw://","")):""},async connected(){await this._load()},async updated({changedProps:e}){(e?.has?.("uri")||e?.has?.("content"))&&await this._load()},async _load(){let e=E(),t=this._originalUri();if(!t){this.loading=!1,this.error="No source URI provided";return}try{let n=e.resourceProviders.getProviderForUri(t);n?.getRawContent?(this.rawContent=await n.getRawContent(t),this.error=""):(this.error="This resource does not expose raw source.",this.rawContent="")}catch(n){this.error=n?.message||String(n),this.rawContent=""}this.loading=!1},render(){if(this.loading)return p`<div class="raw-state"><uix-text muted>Loading…</uix-text></div>`;if(this.error)return p`<div class="raw-state"><uix-text muted>${this.error}</uix-text></div>`;let e=this._originalUri();return p`
      <div class="raw-view">
        <uix-code
          language="markdown"
          ?lineNumber=${!0}
          .content=${this.rawContent}
          path=${e+".md"}
        ></uix-code>
      </div>
    `}}});var Jy,Xy=y(()=>{H();rt();Se();V();Jy={tag:"bsp-recent",style:!0,properties:{recentResources:u.array({defaultValue:[]}),favTick:u.number({defaultValue:0})},connected(){let e=E();this.recentResources=[...e.recentResources||[]],this._unsubs=[],this._unsubs.push(e.subscribe("recentResources",t=>{this.recentResources=[...t||[]]})),this._unsubs.push(ne.on("favorites:changed",()=>{this.favTick++}))},disconnected(){this._unsubs?.forEach(e=>e())},_isFav(e){return E().favoriteUris?.has(e)||!1},_toggleFav(e,t){e.stopPropagation(),E().executeCommand("home.toggleFavorite",{uri:t.uri,label:t.label,icon:t.icon})},_schemeName(e){try{return new URL(e).protocol.slice(0,-1)}catch{return""}},render(){let e=E();return this.recentResources.length?p`
      <div class="recent-page">
        <h1 class="recent-heading">Recent</h1>
        <ul class="recent-list">
          ${this.recentResources.map(t=>p`
            <li
              class="recent-row group"
              @click=${()=>e.openResource(t.uri)}
            >
              <uix-icon name=${t.icon||"file"} size="14" class="recent-row-icon"></uix-icon>
              <div class="recent-row-body">
                <span class="recent-row-label">${t.label}</span>
                <span class="recent-row-scheme">${this._schemeName(t.uri)}</span>
              </div>
              <uix-icon
                name="heart"
                size="14"
                ?solid=${this._isFav(t.uri)}
                class="recent-row-fav ${this._isFav(t.uri)?"is-fav":""}"
                @click=${n=>this._toggleFav(n,t)}
              ></uix-icon>
            </li>
          `)}
        </ul>
      </div>
    `:p`
        <div class="recent-page">
          <h1 class="recent-heading">Recent</h1>
          <p class="recent-empty">No recent resources yet.</p>
        </div>
      `}}});var WS={};var Zy=y(async()=>{Zt();Xf();em();nm();rm();om();lm();um();hm();fm();gm();ym();vm();await km();_m();Cm();Rm();Tm();Mm();Fm();Lm();Um();Vm();qm();Ym();await Km();Jm();Zm();tg();sg();ig();ag();cg();dg();pg();mg();await bg();xg();wg();Sg();Ag();Eg();Mg();Fg();await Og();sb();ib();ab();cb();db();pb();mb();yb();$b();_b();Eb();Tb();Mb();Fb();Ob();zb();Nb();Wb();Hb();Kb();Jb();Zb();ny();ry();oy();ly();uy();await hy();fy();gy();yy();vy();ky();Sy();Ay();Ey();Iy();Ly();Uy();Vy();Wy();await Hy();Qy();Gy();Xy();F.define("agent-activity-list",Jf);F.define("agent-chat-panel",Zf);F.define("agent-container",tm);F.define("agent-context-item",sm);F.define("agent-context-panel",im);F.define("agent-header",am);F.define("agent-input",cm);F.define("agent-message",dm);F.define("agent-permission-inline",pm);F.define("agent-plan-modal",mm);F.define("agent-question-inline",bm);F.define("agent-right-sidebar",xm);F.define("bsp-home",qy);F.define("bsp-home-sidebar",Yy);F.define("bsp-raw-view",Ky);F.define("bsp-recent",Jy);F.define("ide-activity-bar",wm);F.define("ide-app",Sm);F.define("ide-command-palette",Am);F.define("ide-context-menu",Em);F.define("ide-extension-detail",Im);F.define("ide-extensions-browser",Pm);F.define("ide-extensions-sidebar",jm);F.define("ide-file-explorer",Om);F.define("ide-find-replace-widget",zm);F.define("ide-keybindings-settings",Nm);F.define("ide-main-content",Wm);F.define("ide-menu-bar",Hm);F.define("ide-mobile-nav",Qm);F.define("ide-modal-dialog",Gm);F.define("ide-new-project",Xm);F.define("ide-right-activity-bar",eg);F.define("ide-right-sidebar",ng);F.define("ide-search-sidebar",rg);F.define("ide-settings",og);F.define("ide-sidebar",lg);F.define("ide-status-bar",ug);F.define("ide-tab-content",hg);F.define("ide-welcome",fg);F.define("router-ui",gg);F.define("uix-accordion",ay);F.define("uix-alert",ub);F.define("uix-badge",yg);F.define("uix-bottom-sheet",wy);F.define("uix-calendar",$g);F.define("uix-checkbox",bb);F.define("uix-code",kb);F.define("uix-collection",_g);F.define("uix-container",Xb);F.define("uix-card",Gb);F.define("uix-darkmode",zy);F.define("uix-divider",ty);F.define("uix-draggable",Ny);F.define("uix-drawer",$y);F.define("uix-droparea",By);F.define("uix-flex",sy);F.define("uix-form-control",Sb);F.define("uix-grid",iy);F.define("uix-heading",Cg);F.define("uix-icon",Pg);F.define("uix-input",Ib);F.define("uix-join",Pb);F.define("uix-kanban",jg);F.define("uix-label",jb);F.define("uix-link",Dg);F.define("uix-button",vg);F.define("uix-markdown",nb);F.define("uix-menu",cy);F.define("uix-modal",_y);F.define("uix-nav-item",dy);F.define("uix-navbar",py);F.define("uix-number-input",Db);F.define("uix-popover-controller",Cy);F.define("uix-icon-picker",Cb);F.define("uix-progress-bar",hb);F.define("uix-radio",Lb);F.define("uix-radio-group",Ub);F.define("uix-select",Bb);F.define("uix-spinner",fb);F.define("uix-switch",qb);F.define("uix-table",rb);F.define("uix-tabs",my);F.define("uix-tag",ob);F.define("uix-text",lb);F.define("uix-textarea",Qb);F.define("uix-theme-editor",Oy);F.define("uix-tooltip",Ry);F.define("uix-tree",by);F.define("uix-tree-item",xy)});window.__BOOTSTRAPP_MANIFEST__={packages:{agent:{components:{agent:"views/"},hasSchema:!0},base:{components:{app:"app/"}},github:{components:{github:"views/"}},ide:{components:{ide:"views/"},hasSchema:!0,namespace:!1},router:{components:{router:"./"}},sw:{components:{sw:"views/"}},uix:{components:{uix:{accordion:"navigation/accordion",breadcrumbs:"navigation/breadcrumbs",menu:"navigation/menu",navbar:"navigation/navbar","nav-item":"navigation/nav-item",pagination:"navigation/pagination",sidebar:"navigation/sidebar",tabs:"navigation/tabs",tree:"navigation/tree","tree-item":"navigation/tree-item",wizard:"navigation/wizard","alert-dialog":"overlay/alert-dialog","bottom-sheet":"overlay/bottom-sheet",drawer:"overlay/drawer",dropdown:"overlay/dropdown",modal:"overlay/modal",overlay:"overlay/overlay",popover:"overlay/popover",tooltip:"overlay/tooltip","popover-controller":"overlay/popover-controller",avatar:"display/avatar",badge:"display/badge",button:"display/button",calendar:"display/calendar",circle:"display/circle",editable:"display/editable",heading:"display/heading",icon:"display/icon","icon-picker":"form/icon-picker",image:"display/image",link:"display/link",list:"display/list","list-item":"display/list-item",markdown:"display/markdown",media:"display/media",pattern:"display/pattern",stat:"display/stat",table:"display/table","data-table":"display/data-table",tag:"display/tag",text:"display/text","bar-chart":"display/bar-chart","line-chart":"display/line-chart",sparkline:"display/sparkline","pie-chart":"display/pie-chart",card:"layout/card",container:"layout/container",divider:"layout/divider",flex:"layout/flex",grid:"layout/grid",panel:"layout/panel",section:"layout/section","split-pane":"layout/split-pane","app-container":"app/app-container","app-shell":"app/app-shell","app-header":"app/app-header","bottom-nav":"app/bottom-nav","title-bar":"app/title-bar","progress-bar":"feedback/progress-bar",skeleton:"feedback/skeleton",spinner:"feedback/spinner",toast:"feedback/toast",alert:"feedback/alert",device:"utility/device",clipboard:"utility/clipboard",darkmode:"utility/darkmode",draggable:"utility/draggable",droparea:"utility/droparea","indexeddb-explorer":"utility/indexeddb-explorer",seo:"utility/seo","theme-toggle":"utility/theme-toggle","auth-form":"form/auth-form",checkbox:"form/checkbox",code:"form/code","file-upload":"form/file-upload",form:"form/form","form-control":"form/form-control",label:"form/label",input:"form/input",join:"form/join","number-input":"form/number-input",radio:"form/radio","radio-group":"form/radio-group",rating:"form/rating",select:"form/select",slider:"form/slider",switch:"form/switch",textarea:"form/textarea",time:"form/time",showcase:"docs/showcase","showcase-preview":"docs/showcase-preview","showcase-code-viewer":"docs/showcase-code-viewer","showcase-property-editor":"docs/showcase-property-editor","theme-generator":"docs/theme-generator","theme-editor":"theme/editor","ide-sidebar":"views/ide-sidebar",page:"layout/page","float-card":"page/float-card","site-header":"page/site-header","hero-section":"page/hero-section","feature-grid":"page/feature-grid","testimonial-section":"page/testimonial-section","faq-section":"page/faq-section","cta-section":"page/cta-section",footer:"page/footer","steps-section":"page/steps-section","about-section":"page/about-section","showcase-section":"page/showcase-section","pricing-card":"page/pricing-card","pricing-table":"page/pricing-table","stats-section":"page/stats-section"}}},admin:{components:{admin:"views/"}},cms:{components:{cms:"views/"},hasSchema:!0},devops:{components:{devops:"views/"},hasSchema:!0},theme:{components:{theme:"views/"}}},vpsServices:["/node_modules/@bootstrapp/github/vps/service.js"],importmaps:{base:{"html-to-image":"https://esm.sh/html-to-image",bootstrapp:"/node_modules/@bootstrapp/base/app.js","lit-html":"https://esm.sh/lit-html","lit-html/":"https://esm.sh/lit-html/","@bootstrapp/view":"/node_modules/@bootstrapp/view/index.js","@bootstrapp/view/loader":"/node_modules/@bootstrapp/view/loader.js","@bootstrapp/view/discovery":"/node_modules/@bootstrapp/view/discovery.js","@bootstrapp/events":"/node_modules/@bootstrapp/events/index.js","@unocss/core":"https://esm.sh/@unocss/core","@unocss/preset-uno":"https://esm.sh/@unocss/preset-uno","@unocss/preset-wind":"https://esm.sh/@unocss/preset-wind","@bootstrapp/controller":"/node_modules/@bootstrapp/controller/index.js","@bootstrapp/controller/signal":"/node_modules/@bootstrapp/controller/signal.js","@bootstrapp/controller/store":"/node_modules/@bootstrapp/controller/store.js","@bootstrapp/controller/sync":"/node_modules/@bootstrapp/controller/sync.js","@bootstrapp/controller/view":"/node_modules/@bootstrapp/controller/view.js","@bootstrapp/controller/app":"/node_modules/@bootstrapp/controller/app.js","@bootstrapp/controller/adapters/storage":"/node_modules/@bootstrapp/controller/adapters/storage.js","@bootstrapp/controller/adapters/url":"/node_modules/@bootstrapp/controller/adapters/url.js",pocketbase:"https://esm.sh/pocketbase","@bootstrapp/model":"/node_modules/@bootstrapp/model/index.js","@bootstrapp/model/frontend":"/node_modules/@bootstrapp/model/frontend.js","@bootstrapp/model/backend":"/node_modules/@bootstrapp/model/backend.js","@bootstrapp/model/subscription-manager":"/node_modules/@bootstrapp/model/subscription-manager.js","@bootstrapp/model/query-builder":"/node_modules/@bootstrapp/model/query-builder.js","@bootstrapp/model/row-utils":"/node_modules/@bootstrapp/model/row-utils.js","@bootstrapp/model/factory":"/node_modules/@bootstrapp/model/factory.js","@bootstrapp/model/adapter-base":"/node_modules/@bootstrapp/model/adapter-base.js","@bootstrapp/model/slug":"/node_modules/@bootstrapp/model/slug.js","@bootstrapp/model/schema-loader":"/node_modules/@bootstrapp/model/schema-loader.js","@bootstrapp/model-indexeddb":"/node_modules/@bootstrapp/model-indexeddb/index.js","@bootstrapp/model-indexeddb/adapter":"/node_modules/@bootstrapp/model-indexeddb/adapter.js","@bootstrapp/model-indexeddb/system-model-manager":"/node_modules/@bootstrapp/model-indexeddb/system-model-manager.js","@bootstrapp/router":"/node_modules/@bootstrapp/router/index.js","@bootstrapp/router/core":"/node_modules/@bootstrapp/router/core.js","@bootstrapp/router/app":"/node_modules/@bootstrapp/router/app.js","@bootstrapp/router/matcher":"/node_modules/@bootstrapp/router/matcher.js","@bootstrapp/router/i18n":"/node_modules/@bootstrapp/router/i18n.js","@bootstrapp/router/adapters/browser":"/node_modules/@bootstrapp/router/adapters/browser.js","@bootstrapp/router/adapters/memory":"/node_modules/@bootstrapp/router/adapters/memory.js","@bootstrapp/router/plugins/signal":"/node_modules/@bootstrapp/router/plugins/signal.js","@bootstrapp/types":"/node_modules/@bootstrapp/types/index.js","node_modules/@bootstrapp":"/node_modules/@bootstrapp/base/app.js",fflate:"https://cdn.jsdelivr.net/npm/fflate@0.8.2/+esm"},admin:{"html-to-image":"https://esm.sh/html-to-image",bootstrapp:"/node_modules/@bootstrapp/base/app.js","lit-html":"https://esm.sh/lit-html","lit-html/":"https://esm.sh/lit-html/","@bootstrapp/view":"/node_modules/@bootstrapp/view/index.js","@bootstrapp/view/loader":"/node_modules/@bootstrapp/view/loader.js","@bootstrapp/view/discovery":"/node_modules/@bootstrapp/view/discovery.js","@bootstrapp/events":"/node_modules/@bootstrapp/events/index.js","@unocss/core":"https://esm.sh/@unocss/core","@unocss/preset-uno":"https://esm.sh/@unocss/preset-uno","@unocss/preset-wind":"https://esm.sh/@unocss/preset-wind","@bootstrapp/controller":"/node_modules/@bootstrapp/controller/index.js","@bootstrapp/controller/signal":"/node_modules/@bootstrapp/controller/signal.js","@bootstrapp/controller/store":"/node_modules/@bootstrapp/controller/store.js","@bootstrapp/controller/sync":"/node_modules/@bootstrapp/controller/sync.js","@bootstrapp/controller/view":"/node_modules/@bootstrapp/controller/view.js","@bootstrapp/controller/app":"/node_modules/@bootstrapp/controller/app.js","@bootstrapp/controller/adapters/storage":"/node_modules/@bootstrapp/controller/adapters/storage.js","@bootstrapp/controller/adapters/url":"/node_modules/@bootstrapp/controller/adapters/url.js",pocketbase:"https://esm.sh/pocketbase","@bootstrapp/model":"/node_modules/@bootstrapp/model/index.js","@bootstrapp/model/frontend":"/node_modules/@bootstrapp/model/frontend.js","@bootstrapp/model/backend":"/node_modules/@bootstrapp/model/backend.js","@bootstrapp/model/subscription-manager":"/node_modules/@bootstrapp/model/subscription-manager.js","@bootstrapp/model/query-builder":"/node_modules/@bootstrapp/model/query-builder.js","@bootstrapp/model/row-utils":"/node_modules/@bootstrapp/model/row-utils.js","@bootstrapp/model/factory":"/node_modules/@bootstrapp/model/factory.js","@bootstrapp/model/adapter-base":"/node_modules/@bootstrapp/model/adapter-base.js","@bootstrapp/model/slug":"/node_modules/@bootstrapp/model/slug.js","@bootstrapp/model/schema-loader":"/node_modules/@bootstrapp/model/schema-loader.js","@bootstrapp/model-indexeddb":"/node_modules/@bootstrapp/model-indexeddb/index.js","@bootstrapp/model-indexeddb/adapter":"/node_modules/@bootstrapp/model-indexeddb/adapter.js","@bootstrapp/model-indexeddb/system-model-manager":"/node_modules/@bootstrapp/model-indexeddb/system-model-manager.js","@bootstrapp/router":"/node_modules/@bootstrapp/router/index.js","@bootstrapp/router/core":"/node_modules/@bootstrapp/router/core.js","@bootstrapp/router/app":"/node_modules/@bootstrapp/router/app.js","@bootstrapp/router/matcher":"/node_modules/@bootstrapp/router/matcher.js","@bootstrapp/router/i18n":"/node_modules/@bootstrapp/router/i18n.js","@bootstrapp/router/adapters/browser":"/node_modules/@bootstrapp/router/adapters/browser.js","@bootstrapp/router/adapters/memory":"/node_modules/@bootstrapp/router/adapters/memory.js","@bootstrapp/router/plugins/signal":"/node_modules/@bootstrapp/router/plugins/signal.js","@bootstrapp/types":"/node_modules/@bootstrapp/types/index.js","node_modules/@bootstrapp":"/node_modules/@bootstrapp/base/app.js",fflate:"https://cdn.jsdelivr.net/npm/fflate@0.8.2/+esm"}},swHandlers:["/node_modules/@bootstrapp/cms/sw/handlers.js"],components:{bsp:{home:"views/home.js","home-sidebar":"views/home-sidebar.js",recent:"views/recent.js","raw-view":"views/raw-view.js"}},devMode:!1,typeDispatch:!0,typeDispatchEnrich:!0,github:{clientId:"Ov23liZNYqwtAbYuy0eN",serverUrl:"http://localhost:3500"},database:{adapter:"indexeddb",adapters:{indexeddb:{name:"bootstrapp",version:1}}},name:"Bootstrapp",short_name:"Bootstrapp",description:"Personal life management system",url:"http://localhost:3500/",theme_color:"#e0a526",favicon:"/favicon.svg",faviconType:"image/svg+xml",icons:[{src:"/favicon.svg",sizes:"192x192",type:"image/svg+xml",purpose:"any"},{src:"/favicon.svg",sizes:"512x512",type:"image/svg+xml",purpose:"any"},{src:"/favicon.svg",sizes:"512x512",type:"image/svg+xml",purpose:"maskable"}],screenshots:[{src:"/assets/screenshot.png",sizes:"1650x917",type:"image/png",form_factor:"wide",label:"Bootstrapp desktop view"},{src:"/assets/screenshot.png",sizes:"1650x917",type:"image/png",label:"Bootstrapp"}],bodyClasses:"min-h-screen",theme:{path:"/theme.js",admin:"gruvbox-dark",font:{family:"system-ui, 'Manrope', 'Inter'",google:["Manrope"]},icon:{family:"lucide"},runtime:!0},tailwind:{runtime:!0},bundle:{"router-ui":"/node_modules/@bootstrapp/router/ui.js","uix-alert":"/node_modules/@bootstrapp/uix/feedback/alert.js","uix-tooltip":"/node_modules/@bootstrapp/uix/overlay/tooltip.js","uix-badge":"/node_modules/@bootstrapp/uix/display/badge.js","uix-bottom-sheet":"/node_modules/@bootstrapp/uix/overlay/bottom-sheet.js","uix-button":"/node_modules/@bootstrapp/uix/display/button.js","uix-calendar":"/node_modules/@bootstrapp/uix/display/calendar.js","uix-card":"/node_modules/@bootstrapp/uix/layout/card.js","uix-checkbox":"/node_modules/@bootstrapp/uix/form/checkbox.js","uix-collection":"/node_modules/@bootstrapp/uix/display/collection.js","uix-code":"/node_modules/@bootstrapp/uix/form/code.js","uix-darkmode":"/node_modules/@bootstrapp/uix/utility/darkmode.js","uix-divider":"/node_modules/@bootstrapp/uix/layout/divider.js","uix-draggable":"/node_modules/@bootstrapp/uix/utility/draggable.js","uix-drawer":"/node_modules/@bootstrapp/uix/overlay/drawer.js","uix-droparea":"/node_modules/@bootstrapp/uix/utility/droparea.js","uix-flex":"/node_modules/@bootstrapp/uix/layout/flex.js","uix-grid":"/node_modules/@bootstrapp/uix/layout/grid.js","uix-heading":"/node_modules/@bootstrapp/uix/display/heading.js","uix-icon":"/node_modules/@bootstrapp/uix/display/icon.js","uix-icon-picker":"/node_modules/@bootstrapp/uix/form/icon-picker.js","uix-input":"/node_modules/@bootstrapp/uix/form/input.js","uix-join":"/node_modules/@bootstrapp/uix/form/join.js","uix-kanban":"/node_modules/@bootstrapp/uix/display/kanban.js","uix-table":"/node_modules/@bootstrapp/uix/display/table.js","uix-label":"/node_modules/@bootstrapp/uix/form/label.js","uix-form-control":"/node_modules/@bootstrapp/uix/form/form-control.js","uix-number-input":"/node_modules/@bootstrapp/uix/form/number-input.js","uix-switch":"/node_modules/@bootstrapp/uix/form/switch.js","uix-textarea":"/node_modules/@bootstrapp/uix/form/textarea.js","uix-markdown":"/node_modules/@bootstrapp/uix/display/markdown.js","uix-menu":"/node_modules/@bootstrapp/uix/navigation/menu.js","uix-modal":"/node_modules/@bootstrapp/uix/overlay/modal.js","uix-nav-item":"/node_modules/@bootstrapp/uix/navigation/nav-item.js","uix-navbar":"/node_modules/@bootstrapp/uix/navigation/navbar.js","uix-progress-bar":"/node_modules/@bootstrapp/uix/feedback/progress-bar.js","uix-radio":"/node_modules/@bootstrapp/uix/form/radio.js","uix-radio-group":"/node_modules/@bootstrapp/uix/form/radio-group.js","uix-select":"/node_modules/@bootstrapp/uix/form/select.js","uix-spinner":"/node_modules/@bootstrapp/uix/feedback/spinner.js","uix-tabs":"/node_modules/@bootstrapp/uix/navigation/tabs.js","uix-tag":"/node_modules/@bootstrapp/uix/display/tag.js","uix-text":"/node_modules/@bootstrapp/uix/display/text.js","uix-theme-editor":"/node_modules/@bootstrapp/uix/theme/editor.js","uix-accordion":"/node_modules/@bootstrapp/uix/navigation/accordion.js","uix-tree":"/node_modules/@bootstrapp/uix/navigation/tree.js","uix-tree-item":"/node_modules/@bootstrapp/uix/navigation/tree-item.js","ide-app":"/node_modules/@bootstrapp/ide/views/app.js","ide-activity-bar":"/node_modules/@bootstrapp/ide/views/activity-bar.js","ide-command-palette":"/node_modules/@bootstrapp/ide/views/command-palette.js","ide-context-menu":"/node_modules/@bootstrapp/ide/views/context-menu.js","ide-extension-detail":"/node_modules/@bootstrapp/ide/views/extension-detail.js","ide-extensions-browser":"/node_modules/@bootstrapp/ide/views/extensions-browser.js","ide-extensions-sidebar":"/node_modules/@bootstrapp/ide/views/extensions-sidebar.js","ide-file-explorer":"/node_modules/@bootstrapp/ide/views/file-explorer.js","ide-find-replace-widget":"/node_modules/@bootstrapp/ide/views/find-replace-widget.js","ide-keybindings-settings":"/node_modules/@bootstrapp/ide/views/keybindings-settings.js","ide-main-content":"/node_modules/@bootstrapp/ide/views/main-content.js","ide-menu-bar":"/node_modules/@bootstrapp/ide/views/menu-bar.js","ide-mobile-nav":"/node_modules/@bootstrapp/ide/views/mobile-nav.js","ide-modal-dialog":"/node_modules/@bootstrapp/ide/views/modal-dialog.js","ide-new-project":"/node_modules/@bootstrapp/ide/views/new-project.js","ide-welcome":"/node_modules/@bootstrapp/ide/views/welcome.js","ide-right-activity-bar":"/node_modules/@bootstrapp/ide/views/right-activity-bar.js","ide-right-sidebar":"/node_modules/@bootstrapp/ide/views/right-sidebar.js","ide-search-sidebar":"/node_modules/@bootstrapp/ide/views/search-sidebar.js","ide-settings":"/node_modules/@bootstrapp/ide/views/settings.js","ide-sidebar":"/node_modules/@bootstrapp/ide/views/sidebar.js","ide-status-bar":"/node_modules/@bootstrapp/ide/views/status-bar.js","ide-tab-content":"/node_modules/@bootstrapp/ide/views/tab-content.js","agent-activity-list":"/node_modules/@bootstrapp/agent/views/activity-list.js","agent-chat-panel":"/node_modules/@bootstrapp/agent/views/chat-panel.js","agent-container":"/node_modules/@bootstrapp/agent/views/container.js","agent-context-item":"/node_modules/@bootstrapp/agent/views/context-item.js","agent-context-panel":"/node_modules/@bootstrapp/agent/views/context-panel.js","agent-header":"/node_modules/@bootstrapp/agent/views/header.js","agent-input":"/node_modules/@bootstrapp/agent/views/input.js","agent-message":"/node_modules/@bootstrapp/agent/views/message.js","agent-permission-inline":"/node_modules/@bootstrapp/agent/views/permission-inline.js","agent-plan-modal":"/node_modules/@bootstrapp/agent/views/plan-modal.js","agent-question-inline":"/node_modules/@bootstrapp/agent/views/question-inline.js","agent-right-sidebar":"/node_modules/@bootstrapp/agent/views/right-sidebar.js","bsp-home":"/views/home.js","bsp-home-sidebar":"/views/home-sidebar.js","bsp-recent":"/views/recent.js","bsp-raw-view":"/views/raw-view.js"},bundleConfig:{icons:"selective",folders:["extensions"],assets:["/node_modules/@bootstrapp/uix/form/codemirror.js"]},hasProjectSchema:!0,hasProjectSeed:!0,apiUrl:"",backend:!1,runtime:"frontend",frontend:!0,dev:!1,agent:{models:["agent_sessions","agent_messages"]},ide:{models:[]},cms:{models:["cms_templates","cms_websites","cms_media"]},devops:{models:["devops_releases"]},seedEnabled:!1};(async function(){let{default:e}=await Promise.resolve().then(()=>(Ue(),Sr));await e.load(!0,!1,async()=>{await Vh().then(()=>w0),await nl().then(()=>zh);try{await Kf().then(()=>i1)}catch(t){console.warn("[tailwind] runtime load failed:",t.message)}await Zy().then(()=>WS)})})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
/*! Bundled license information:

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
/*! Bundled license information:

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
/*! Bundled license information:

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
/*! Bundled license information:

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
/*! Bundled license information:

lit-html/directives/keyed.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
/*! Bundled license information:

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
