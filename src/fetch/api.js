import axios from './axiosconfig';

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  /**
   * 用户登录
   */
  GetLoginIn(params) {
    return fetch('/LoginIn.ashx', params)
  },
  //获取供应商
  GetSupplierInfo(params) {
    return fetch('/GetSupplierInfo.ashx', params)
  },
  /**
   * 供应商信息详情
   */
  GetSupplierInfoDetails(params) {
    return fetch('/GetSupplierInfoDetails.ashx', params)
  },
  /**
   * 供应商信息前10
   */
  GetSuppWeightInfoTopTen(params) {
    return fetch('/GetSuppWeightInfoTopTen.ashx', params)
  },
  /**
   * 磅单前十
   */
  GetWeightInfoTopTen(params) {
    return fetch('/GetWeightInfoTopTen.ashx', params)
  },
  GetWeightInfo(params) {
    return fetch('/GetWeightInfo.ashx', params)
  },
  //前十详情
  GetWeightInfoTopTenDetails(params) {
    return fetch('/GetWeightInfoTopTenDetails.ashx', params)
  },
  GetWeightPlanHZ(params) {
    return fetch('/GetWeightPlanHZ.ashx', params)
  },
  GetDepartmentByUserCode(params) {
    return fetch('/GetDepartmentByUserCode.ashx', params)
  },
  /**
   *  原材料汇总
   */
  GetConcreteMaterialHZ(params) {
    return fetch('/GetConcreteMaterialHZ.ashx', params)
  },
  /**
   * 混凝土汇总
   */
  GetConcreteHZ(params) {
    return fetch('/GetConcreteHZ.ashx', params)
  },
  /**
   * 混凝土实时库存
   */
  ConcreteMaterialStore(params) {
    return fetch('/ConcreteMaterialStore.ashx', params)
  },
  /**
   * 成品收料汇总
   */
  RebarGeHZ(params) {
    return fetch('/RebarGeHZ.ashx', params)
  },
  /**
   * 成品发料汇总
   */
  RebarGeOutHZ(params) {
    return fetch('/RebarGeOutHZ.ashx', params)
  },
  /**
   * 钢筋加工中心原材料汇总
   */
  RebarMaterialHZ(params) {
    return fetch('/RebarMaterialHZ.ashx', params)
  },
  /**
   * 钢筋加工中心实时库存汇总
   */
  RebarMaterialStore(params) {
    return fetch('/RebarMaterialStore.ashx', params)
  },
}
