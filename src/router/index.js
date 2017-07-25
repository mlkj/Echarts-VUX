import Login from '../pages/Login.vue'
// 异步加载组件
const Main = resolve => require([ '../pages/Main.vue'], resolve);
const Home = resolve => require([ '../pages/Home.vue'], resolve);
const Homepage = resolve => require([ '../pages/baseinfo/Homepage.vue'], resolve);
const SystemConfig = resolve => require([ '../pages/systeminfo/SystemConfig.vue'], resolve);
const NewsList = resolve => require([ '../pages/systeminfo/NewsList.vue'], resolve);

const GetWeightPlanHZ = resolve => require([ '../pages/baseinfo/weightcollect/GetWeightPlanHZ.vue'], resolve);
const WeightDetialSeach = resolve => require([ '../pages/baseinfo/weightcollect/WeightDetialSeach.vue'], resolve);
//磅单
const SupplierWeightDay = resolve => require([ '../pages/baseinfo/SupplierWeightDay.vue'], resolve);
const GetWeightTopYear = resolve => require([ '../pages/baseinfo/wightinfo/GetWeightTopYear.vue'], resolve);
const SupplierWeightMonth = resolve => require([ '../pages/baseinfo/SupplierWeightMonth.vue'], resolve);
//原材料
const ConcreteMaterial = resolve => require([ '../pages/ConcreteMaterial/ConcreteMaterialYear.vue'], resolve);
const ConcreteMaterialMonth = resolve => require([ '../pages/ConcreteMaterial/ConcreteMaterialMonth.vue'], resolve);
const ConcreteMaterialDay = resolve => require([ '../pages/ConcreteMaterial/ConcreteMaterialDay.vue'], resolve);
//混凝土
const HomeConcreteHZ = resolve => require([ '../pages/ConcreteHZ/HomeConcreteHZ.vue'], resolve);
const ConcreteYear = resolve => require([ '../pages/ConcreteHZ/ConcreteYear.vue'], resolve);
const ConcreteMonth = resolve => require([ '../pages/ConcreteHZ/ConcreteMonth.vue'], resolve);
const ConcreteDay = resolve => require([ '../pages/ConcreteHZ/ConcreteDay.vue'], resolve);
const ConcreteStore = resolve => require([ '../pages/ConcreteHZ/ConcreteStore.vue'], resolve);
//钢筋加工中心
const HomeRebarMaterial = resolve => require([ '../pages/RebarMaterial/HomeRebarMaterial.vue'], resolve);
const RebarMaterialStore = resolve => require([ '../pages/RebarMaterial/RebarMaterialStore.vue'], resolve);
const RebarGeHZYear = resolve => require([ '../pages/RebarMaterial/RebarGeHZ/RebarGeHZYear.vue'], resolve);
const RebarGeHZMonth = resolve => require([ '../pages/RebarMaterial/RebarGeHZ/RebarGeHZMonth.vue'], resolve);
const RebarGeHZDay = resolve => require([ '../pages/RebarMaterial/RebarGeHZ/RebarGeHZDay.vue'], resolve);

const RebarGeOutHZYear = resolve => require([ '../pages/RebarMaterial/RebarGeOutHZ/RebarGeOutHZYear.vue'], resolve);
const RebarGeOutHZMonth = resolve => require([ '../pages/RebarMaterial/RebarGeOutHZ/RebarGeOutHZMonth.vue'], resolve);
const RebarGeOutHZDay = resolve => require([ '../pages/RebarMaterial/RebarGeOutHZ/RebarGeOutHZDay.vue'], resolve);

const RebarMaterialHZYear = resolve => require([ '../pages/RebarMaterial/RebarMaterialHZ/RebarMaterialHZYear.vue'], resolve);
const RebarMaterialHZMonth = resolve => require([ '../pages/RebarMaterial/RebarMaterialHZ/RebarMaterialHZMonth.vue'], resolve);
const RebarMaterialHZDay = resolve => require([ '../pages/RebarMaterial/RebarMaterialHZ/RebarMaterialHZDay.vue'], resolve);

const routes=[
      {path: '/login', component: Login }, 
      { path: '/', redirect: "/login" },//重定向
      {
      path: '/',
      component: Main,
      name: '系统管理',
      children: [       
            {path: '/home', component: Home, name: '工作台', meta: {requireMenue: true}},
            {path: '/homepage', component: Homepage, name: '地磅称重统计报表', meta: {requireMenue: false}},
            {path: '/newsList', component: NewsList , name: '微应用', meta: {requireMenue: true}},
            {path: '/systemConfig', component: SystemConfig , name: '个人中心', meta: {requireMenue: false}}, 
            {path: '/getWeightPlanHZ', component: GetWeightPlanHZ , name: '汇总统计', meta: {requireMenue: false}}, 
            {path: '/weightDetialSeach', component: WeightDetialSeach , name: '地磅称重入库明细', meta: {requireMenue: false}}, 
            {path: '/supplierWeightInfo', component: SupplierWeightDay , name: '地磅称重日收料统计', meta: {requireMenue: false}}, 
            {path: '/supplierWeightMonth', component: SupplierWeightMonth , name: '地磅称重月收料统计', meta: {requireMenue: false}}, 
            {path: '/getWeightTopYear', component: GetWeightTopYear , name: '地磅称重开累统计', meta: {requireMenue: false}}, 

            {path: '/concreteMaterial', component: ConcreteMaterial , name: '原材料开累统计', meta: {requireMenue: false}}, 
            {path: '/concreteMaterialMonth', component: ConcreteMaterialMonth , name: '原材料月统计', meta: {requireMenue: false}}, 
            {path: '/concreteMaterialDay', component: ConcreteMaterialDay , name: '原材料日统计', meta: {requireMenue: false}}, 

            {path: '/homeConcreteHZ', component: HomeConcreteHZ , name: '混凝土统计报表', meta: {requireMenue: false}}, 
            {path: '/concreteYear', component: ConcreteYear , name: '混凝土开累统计', meta: {requireMenue: false}}, 
            {path: '/concreteMonth', component: ConcreteMonth , name: '混凝土月统计', meta: {requireMenue: false}}, 
            {path: '/concreteDay', component: ConcreteDay , name: '混凝土日统计', meta: {requireMenue: false}}, 
            {path: '/concreteStore', component: ConcreteStore , name: '混凝土实时库存统计', meta: {requireMenue: false}}, 

            {path: '/homeRebarMaterial', component: HomeRebarMaterial , name: '钢筋加工中心管理', meta: {requireMenue: false}}, 
            {path: '/rebarMaterialStore', component: RebarMaterialStore , name: '加工中心实时库存统计', meta: {requireMenue: false}}, 
            {path: '/rebarGeHZYear', component: RebarGeHZYear , name: '成品收料年度汇总', meta: {requireMenue: false}}, 
            {path: '/rebarGeHZMonth', component: RebarGeHZMonth , name: '成品收料月度汇总', meta: {requireMenue: false}}, 
            {path: '/rebarGeHZDay', component: RebarGeHZDay , name: '成品收料日汇总', meta: {requireMenue: false}}, 

            {path: '/rebarGeOutHZDay', component: RebarGeOutHZDay , name: '成品发料日汇总', meta: {requireMenue: false}}, 
            {path: '/rebarGeOutHZMonth', component: RebarGeOutHZMonth , name: '成品发料月汇总', meta: {requireMenue: false}}, 
            {path: '/rebarGeOutHZYear', component: RebarGeOutHZYear , name: '成品发料年度汇总', meta: {requireMenue: false}}, 

            {path: '/rebarMaterialHZYear', component: RebarMaterialHZYear , name: '原材料年度汇总报表', meta: {requireMenue: false}}, 
            {path: '/rebarMaterialHZMonth', component: RebarMaterialHZMonth , name: '原材料月汇总报表', meta: {requireMenue: false}}, 
            {path: '/rebarMaterialHZDay', component: RebarMaterialHZDay , name: '原材料日汇总报表', meta: {requireMenue: false}}, 
            
            {path: '/*',redirect: "/home"}  
            ]
  }    
];

export default routes;